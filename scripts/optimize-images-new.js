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

/**
 * Check if a file should be processed
 */
async function isSupportedImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  if (IGNORED_FILES.includes(fileName.toLowerCase())) {
    logger.warn(`Skipping ignored file: ${filePath}`);
    return false;
  }
  
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    logger.warn(`Skipping unsupported file format: ${filePath}`);
    return false;
  }
  
  if (IGNORED_PATTERNS.some(pattern => pattern.test(filePath))) {
    logger.warn(`Skipping file matching ignore pattern: ${filePath}`);
    return false;
  }
  
  return true;
}

/**
 * Optimize a single image file
 */
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
    
    // Process images in parallel with limited concurrency
    const CONCURRENCY = 3; // Number of images to process in parallel
    const batches = [];
    
    for (let i = 0; i < imageFiles.length; i += CONCURRENCY) {
      batches.push(imageFiles.slice(i, i + CONCURRENCY));
    }
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      logger.info(`\n🔄 Processing batch ${i + 1}/${batches.length} (${batch.length} images)`);
      
      const results = await Promise.allSettled(
        batch.map(file => optimizeImage(file))
      );
      
      for (const result of results) {
        if (result.status === 'fulfilled' && result.value) {
          const { success, skipped } = result.value;
          if (success) {
            if (skipped) {
              skipCount++;
            } else {
              successCount++;
            }
          } else {
            errors.push(result.value?.error || 'Unknown error');
          }
        } else if (result.status === 'rejected') {
          errors.push(result.reason?.message || 'Unknown error');
        }
      }
      
      // Log progress
      const processed = Math.min((i + 1) * CONCURRENCY, imageFiles.length);
      const progress = ((processed / imageFiles.length) * 100).toFixed(1);
      logger.info(`📊 Progress: ${processed}/${imageFiles.length} (${progress}%)`);
    }
    
    // Log summary
    const totalProcessed = successCount + skipCount;
    const totalErrors = errors.length;
    
    logger.info('\n🎉 --- Optimization Complete ---');
    logger.info(`✅ Successfully optimized: ${successCount} images`);
    logger.info(`⏭️  Skipped (already optimized): ${skipCount} images`);
    
    if (totalErrors > 0) {
      logger.warn(`❌ Failed to optimize ${totalErrors} images`);
      // Only show the first few errors to avoid cluttering the output
      const maxErrorsToShow = 5;
      const errorsToShow = errors.slice(0, maxErrorsToShow);
      errorsToShow.forEach((error, index) => {
        logger.error(`Error ${index + 1}: ${error}`);
      });
      if (totalErrors > maxErrorsToShow) {
        logger.warn(`... and ${totalErrors - maxErrorsToShow} more errors`);
      }
    }
    
    logger.info(`\n📊 Summary: ${totalProcessed} processed, ${totalErrors} failed`);
    
    return { 
      success: totalErrors === 0, 
      optimized: successCount, 
      skipped: skipCount, 
      errors: totalErrors 
    };
    
  } catch (error) {
    const errorMsg = `❌ Fatal error during optimization: ${error.message}`;
    logger.error(errorMsg);
    console.error(error); // Log full error stack
    return { 
      success: false, 
      error: errorMsg,
      stack: error.stack 
    };
  }
}

// Run the optimization if this file is executed directly
if (require.main === module) {
  optimizeAllImages()
    .then(({ success }) => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Unhandled error:', error);
      process.exit(1);
    });
}

module.exports = {
  optimizeImage,
  optimizeAllImages,
  isSupportedImage
};
