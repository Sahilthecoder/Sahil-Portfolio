const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// Configuration
const QUALITY = 80; // Default quality for WebP/AVIF
const SIZES = [1, 1.5, 2, 3]; // For responsive images (1x, 1.5x, 2x, 3x)
const MAX_WIDTH = 2560; // Maximum width for any image
const SOURCE_DIRS = ['public/images']; // Source directories to search for images
const DEST_DIR = 'public/optimized-images';
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const IGNORED_FILES = ['favicon.ico', 'favicon.svg', 'logo192.png', 'logo512.png'];
const IGNORED_PATTERNS = [/\/node_modules\//, /\/optimized-images\//, /\/icons?\//];

// Format specific settings
const FORMAT_SETTINGS = {
  webp: {
    quality: 80,
    effort: 6, // CPU effort (0-6, 6 is slowest but smallest)
    lossless: false,
  },
  avif: {
    quality: 60, // AVIF can be more aggressive with quality
    effort: 5,   // CPU effort (0-9, 9 is slowest but smallest)
    lossless: false,
  },
  jpg: {
    quality: 80,
    mozjpeg: true,
  },
  png: {
    quality: 80,
    compressionLevel: 9, // 0-9
  },
};

// Simple logger
const logger = {
  success: (message) => console.log(`✅ ${message}`),
  info: (message) => console.log(`ℹ️  ${message}`),
  error: (message) => console.error(`❌ ${message}`),
  warn: (message) => console.warn(`⚠️  ${message}`)
};

async function isSupportedImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  if (IGNORED_FILES.includes(fileName)) {
    logger.warn(`Skipping ignored file: ${filePath}`);
    return false;
  }
  
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    logger.warn(`Skipping unsupported file format: ${filePath}`);
    return false;
  }
  
  return true;
}

async function optimizeImage(filePath) {
  const parsedPath = path.parse(filePath);
  const fileName = parsedPath.name;
  
  try {
    // Skip if already optimized (starts with _)
    if (fileName.startsWith('_')) {
      logger.info(`Skipping already optimized file: ${filePath}`);
      return { success: true, skipped: true };
    }

    // Find which source directory this file is in
    const sourceDir = SOURCE_DIRS.find(dir => 
      path.resolve(filePath).startsWith(path.resolve(dir))
    ) || path.dirname(filePath);
    
    const relativePath = path.relative(sourceDir, parsedPath.dir);
    const destDir = path.join(DEST_DIR, relativePath);
    
    // Create destination directory if it doesn't exist
    await fs.mkdir(destDir, { recursive: true });
    
    // Get image metadata
    const metadata = await sharp(filePath).metadata();
    const { width: originalWidth, height: originalHeight, format } = metadata;
    
    if (!originalWidth || !originalHeight) {
      logger.warn(`Could not get dimensions for ${filePath}, skipping`);
      return { success: false, error: 'Invalid image dimensions' };
    }
    
    // Generate optimized versions for each size and format
    const results = [];
    
    // Calculate target widths (don't upscale)
    const targetWidths = Array.from(new Set([
      Math.min(originalWidth, MAX_WIDTH), // Original size (capped at MAX_WIDTH)
      Math.min(Math.ceil(originalWidth * 0.75), MAX_WIDTH), // 75% of original
      Math.min(Math.ceil(originalWidth * 0.5), MAX_WIDTH),  // 50% of original
      Math.min(Math.ceil(originalWidth * 0.25), MAX_WIDTH), // 25% of original
    ])).sort((a, b) => a - b);
    
    // Generate WebP and AVIF versions for each size
    for (const format of ['webp', 'avif']) {
      for (const width of targetWidths) {
        const height = Math.round((width / originalWidth) * originalHeight);
        const outputFileName = `${fileName}${width !== originalWidth ? `@${width}w` : ''}.${format}`;
        const outputPath = path.join(destDir, outputFileName);
        
        // Skip if file already exists and is newer than source
        try {
          const outputStat = await fs.stat(outputPath);
          const sourceStat = await fs.stat(filePath);
          
          if (outputStat.mtime > sourceStat.mtime) {
            logger.info(`Skipping existing optimized file: ${outputPath}`);
            results.push({ format, width, path: outputPath, skipped: true });
            continue;
          }
        } catch (e) {
          // File doesn't exist, proceed with optimization
        }
        
        // Create sharp instance with format-specific settings
        let pipeline = sharp(filePath)
          .resize(width, height, {
            fit: 'inside',
            withoutEnlargement: true,
          });
        
        // Apply format-specific optimization
        switch (format) {
          case 'webp':
            pipeline = pipeline.webp(FORMAT_SETTINGS.webp);
            break;
          case 'avif':
            pipeline = pipeline.avif(FORMAT_SETTINGS.avif);
            break;
          default:
            pipeline = pipeline.toFormat(format, FORMAT_SETTINGS[format] || {});
        }
        
        // Write the optimized image
        await pipeline.toFile(outputPath);
        
        const stats = await fs.stat(outputPath);
        results.push({
          format,
          width,
          path: outputPath,
          size: stats.size,
          saved: true
        });
        
        logger.success(`Created ${format.toUpperCase()} (${width}px): ${outputPath}`);
      }
    }
    
    return { success: true, results };
    
  } catch (error) {
    logger.error(`Error optimizing ${filePath}: ${error.message}`);
    return { success: false, error: error.message };
  }
  
  try {
    // Skip unsupported images
    if (!(await isSupportedImage(filePath))) {
      return { success: false, skipped: true, filePath };
    }
    
    // Create destination directory if it doesn't exist
    await fs.mkdir(destDir, { recursive: true });
    
    // Get image metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Skip if we can't get image dimensions
    if (!metadata.width || !metadata.height) {
      logger.warn(`Skipping invalid image (can't read dimensions): ${filePath}`);
      return { success: false, skipped: true, filePath };
    }
    
    logger.info(`Processing: ${filePath} (${metadata.width}x${metadata.height})`);
    
    // Process original size with different formats
    const optimizedFiles = [];
    
    // Skip if the image is already small enough
    const stats = await fs.stat(filePath);
    const isSmallImage = stats.size < 1024 * 50; // Less than 50KB
    
    if (!isSmallImage) {
      // WebP
      const webpPath = path.join(destDir, `${parsedPath.name}.webp`);
      await image
        .clone()
        .webp({ quality: QUALITY })
        .toFile(webpPath);
      optimizedFiles.push(webpPath);
      
      // AVIF (if supported)
      try {
        const avifPath = path.join(destDir, `${parsedPath.name}.avif`);
        await image
          .clone()
          .avif({ quality: QUALITY })
          .toFile(avifPath);
        optimizedFiles.push(avifPath);
      } catch (avifError) {
        logger.warn(`AVIF conversion failed for ${filePath}: ${avifError.message}`);
      }
      
      // Original format (optimized)
      const optimizedPath = path.join(destDir, `${parsedPath.name}${parsedPath.ext}`);
      await image
        .clone()
        .jpeg({ quality: QUALITY })
        .toFile(optimizedPath);
      optimizedFiles.push(optimizedPath);
      
      // Process responsive sizes for large images
      if (metadata.width > 800) {
        for (const size of SIZES) {
          const width = Math.round(metadata.width * size);
          
          // Skip if the scaled width is larger than original
          if (width >= metadata.width) continue;
          
          // WebP
          const webpResizedPath = path.join(destDir, `${parsedPath.name}@${size}x.webp`);
          await image
            .clone()
            .resize({ width })
            .webp({ quality: QUALITY })
            .toFile(webpResizedPath);
          optimizedFiles.push(webpResizedPath);
          
          // AVIF (if supported)
          try {
            const avifResizedPath = path.join(destDir, `${parsedPath.name}@${size}x.avif`);
            await image
              .clone()
              .resize({ width })
              .avif({ quality: QUALITY })
              .toFile(avifResizedPath);
            optimizedFiles.push(avifResizedPath);
          } catch (avifError) {
            logger.warn(`AVIF conversion failed for ${filePath} @${size}x: ${avifError.message}`);
          }
        }
      }
    } else {
      logger.info(`Skipping responsive versions for small image: ${filePath}`);
    }
    
    logger.success(`Optimized: ${filePath} (${optimizedFiles.length} variants created)`);
    return { success: true, filePath, optimizedFiles };
    logger.success(`Optimized: ${filePath} (${optimizedFiles.length} variants created)`);
    return { success: true, filePath, optimizedFiles };
  } catch (error) {
    logger.error(`Error optimizing ${filePath}: ${error.message}`);
    return { success: false, error: error.message, filePath };
  }

/**
 * Scans source directories for images and optimizes them
 */
async function optimizeAllImages() {
  logger.info('🚀 Starting image optimization...');
  
  try {
    // Find all image files in source directories
    const imageFiles = [];
    
    for (const sourceDir of SOURCE_DIRS) {
      try {
        const dirExists = await fs.access(sourceDir).then(() => true).catch(() => false);
        if (!dirExists) {
          logger.warn(`Source directory does not exist: ${sourceDir}`);
          continue;
        }
        
        logger.info(`Scanning directory: ${sourceDir}`);
        
        // Find all image files (case insensitive)
        const files = await glob(`${sourceDir}/**/*.{jpg,jpeg,png,webp,avif}`, { 
          ignore: IGNORED_PATTERNS.map(pattern => `**/${pattern}/**`),
          nocase: true,
          absolute: true
        });
        
        // Filter out ignored files and directories
        const validFiles = [];
        for (const file of files) {
          const fileName = path.basename(file);
          const relativePath = path.relative(process.cwd(), file);
          
          if (IGNORED_FILES.includes(fileName.toLowerCase())) {
            logger.info(`Skipping ignored file: ${relativePath}`);
            continue;
          }
          
          if (IGNORED_PATTERNS.some(pattern => pattern.test(file))) {
            logger.info(`Skipping ignored pattern: ${relativePath}`);
            continue;
          }
          
          validFiles.push(file);
        }
        
        imageFiles.push(...validFiles);
        
      } catch (error) {
        logger.warn(`Error reading directory ${sourceDir}: ${error.message}`);
      }
    }
    
    if (imageFiles.length === 0) {
      logger.warn('❌ No images found to optimize');
      return { success: true, optimized: 0, skipped: 0 };
    }
    
    logger.info(`📸 Found ${imageFiles.length} images to process`);
    
    let successCount = 0;
    let skipCount = 0;
    const errors = [];
    let errorCount = 0;
    
    // Ensure destination directory exists
    try {
      await fs.mkdir(DEST_DIR, { recursive: true });
    } catch (error) {
      logger.error(`Failed to create destination directory ${DEST_DIR}: ${error.message}`);
      return { success: false, error: error.message };
    }
    
    // Log first few files for debugging
    const sampleFiles = uniqueFiles.slice(0, 5);
    logger.info(`Sample files to process: ${sampleFiles.join('\n - ')}${uniqueFiles.length > 5 ? '\n...' : ''}`);
    
    for (let i = 0; i < uniqueFiles.length; i += BATCH_SIZE) {
      const batch = uniqueFiles.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(batch.map(file => {
        logger.info(`Processing: ${file}`);
        return optimizeImage(file).catch(error => {
          logger.error(`Error processing ${file}: ${error.message}`);
          return { success: false, error: error.message, filePath: file };
        });
      }));
      
      // Update counters
      results.forEach(result => {
        if (result.skipped) {
          skippedCount++;
        } else if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      });
      
      processed += batch.length;
      logger.info(`Progress: ${processed}/${files.length} (${Math.round((processed / files.length) * 100)}%)`);
    }
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    logger.success(`🎉 Image optimization completed!`);
    console.log('='.repeat(50));
    logger.success(`✅ Successfully optimized: ${successCount} images`);
    if (skippedCount > 0) logger.info(`⏭️  Skipped: ${skippedCount} files`);
    if (errorCount > 0) logger.error(`❌ Errors: ${errorCount} files`);
    logger.info(`📂 Optimized images saved to: ${DEST_DIR}`);
    
    return {
      success: errorCount === 0,
      optimized: successCount,
      skipped: skippedCount,
      errors: errorCount
    };
  } catch (error) {
    logger.error(`❌ Error during image optimization: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Run the optimization
if (require.main === module) {
  optimizeAllImages()
    .then(({ success }) => process.exit(success ? 0 : 1))
    .catch(error => {
      logger.error(`Unhandled error: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { optimizeAllImages, optimizeImage };
