const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// Configuration
const QUALITY = 80;
const SIZES = [1, 2, 3]; // For responsive images
const SOURCE_DIRS = ['public', 'public/images']; // Check both root and images directory
const DEST_DIR = 'public/optimized-images';
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const IGNORED_FILES = ['favicon.ico', 'favicon.svg'];
const IGNORED_PATTERNS = [/\/node_modules\//, /\/optimized-images\//]; // Ignore node_modules and optimized-images

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
  
  // Find which source directory this file is in
  const sourceDir = SOURCE_DIRS.find(dir => 
    path.resolve(filePath).startsWith(path.resolve(dir))
  ) || path.dirname(filePath);
  
  const relativePath = path.relative(sourceDir, parsedPath.dir);
  const destDir = path.join(DEST_DIR, relativePath);
  
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
  } catch (error) {
    logger.error(`Error optimizing ${filePath}: ${error.message}`);
    return { success: false, error: error.message, filePath };
  }
}

async function optimizeAllImages() {
  logger.info('🚀 Starting image optimization...');
  
  try {
    // Get all image files from all source directories
    const files = [];
    
    for (const sourceDir of SOURCE_DIRS) {
      const patterns = SUPPORTED_EXTENSIONS.map(ext => `${sourceDir}/**/*${ext}`);
      
      for (const pattern of patterns) {
        try {
          const matches = await glob(pattern, { 
            nodir: true,
            ignore: ['**/node_modules/**', '**/optimized-images/**']
          });
          
          // Filter out ignored files and patterns
          const filteredMatches = matches.filter(file => {
            const fileName = path.basename(file);
            const shouldIgnore = 
              IGNORED_FILES.includes(fileName) ||
              IGNORED_PATTERNS.some(pattern => pattern.test(file));
              
            if (shouldIgnore) {
              logger.warn(`Skipping ignored file: ${file}`);
              return false;
            }
            return true;
          });
          
          files.push(...filteredMatches);
        } catch (error) {
          logger.warn(`Error processing pattern ${pattern}: ${error.message}`);
        }
      }
    }
    
    // Remove duplicates (in case files exist in multiple source dirs)
    const uniqueFiles = [...new Set(files)];
    
    logger.info(`📁 Found ${uniqueFiles.length} potential images to optimize`);
    
    if (uniqueFiles.length === 0) {
      logger.warn('No images found to optimize. Please check your source directories.');
      return { success: true, optimized: 0, skipped: 0, errors: 0 };
    }
    
    // Log where we found the images
    logger.info('Searching in directories: ' + SOURCE_DIRS.join(', '));
    logger.info('Supported extensions: ' + SUPPORTED_EXTENSIONS.join(', '));
    
    // Process all images in parallel with limited concurrency
    const BATCH_SIZE = 3; // Reduced concurrency to prevent memory issues
    let processed = 0;
    let successCount = 0;
    let skippedCount = 0;
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
