#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const chalk = require('chalk');
const { promisify } = require('util');
const readline = require('readline');

// Promisify readline for async/await
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = promisify(rl.question).bind(rl);

// Configuration
const SOURCE_DIRS = ['src', 'public'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
const TARGET_FORMATS = ['webp', 'avif']; // Preferred order of formats (most compatible first)
const OPTIMIZED_IMAGES_DIR = 'public/optimized-images';
const PUBLIC_DIR = 'public';
const DEBUG = process.env.DEBUG === 'true';

// Performance metrics
const performance = {
  startTime: Date.now(),
  filesProcessed: 0,
  imagesProcessed: 0,
  bytesSaved: 0,
  cacheHits: 0,
  cacheMisses: 0
};

// Cache for optimized images and their variants
const optimizedImagesCache = new Map();

// Cache for source files to avoid re-reading
const sourceFileCache = new Map();

// Track processed files to avoid duplicates
const processedFiles = new Set();

// Track changes
const changes = {
  filesProcessed: 0,
  imagesUpdated: 0,
  imagesSkipped: 0,
  errors: 0
};

/**
 * Initialize the cache with optimized images
 */
async function initCache() {
  console.log(chalk.blue('🔍 Scanning for optimized images...'));
  
  try {
    const files = await glob(`**/*.{${TARGET_FORMATS.join(',')}}`, {
      cwd: OPTIMIZED_IMAGES_DIR,
      absolute: false,
      nodir: true,
      ignore: ['**/node_modules/**', '**/.git/**']
    });
    
    files.forEach(file => {
      const relativePath = path.relative(OPTIMIZED_IMAGES_DIR, file);
      const originalExt = path.extname(relativePath).slice(1);
      const baseName = path.basename(relativePath, `.${originalExt}`);
      const dirName = path.dirname(relativePath);
      
      // Handle @2x, @3x suffixes
      const sizeMatch = baseName.match(/@(\d+)x$/);
      const baseNameWithoutSize = sizeMatch ? baseName.replace(/@\d+x$/, '') : baseName;
      const size = sizeMatch ? parseInt(sizeMatch[1], 10) : 1;
      
      const key = path.join(dirName, `${baseNameWithoutSize}${path.extname(relativePath).replace(originalExt, '')}`);
      
      if (!optimizedImagesCache.has(key)) {
        optimizedImagesCache.set(key, []);
      }
      
      optimizedImagesCache.get(key).push({
        path: path.relative(process.cwd(), file),
        format: originalExt,
        size,
        fullPath: file
      });
    });
    
    console.log(chalk.green(`✅ Found ${files.length} optimized images in cache`));
  } catch (error) {
    console.error(chalk.red('❌ Error initializing image cache:'), error);
    process.exit(1);
  }
}

/**
 * Find optimized versions of an image
 * @param {string} originalPath - Path to the original image
 * @returns {Promise<Object>} Object containing optimized versions by format
 */
async function findOptimizedVersions(originalPath) {
  performance.imagesProcessed++;
  
  try {
    // Normalize path for consistent comparison
    const normalizedPath = path.normalize(originalPath).replace(/\\/g, '/');
    
    // Check if we've already processed this file
    if (optimizedImagesCache.has(normalizedPath)) {
      performance.cacheHits++;
      return optimizedImagesCache.get(normalizedPath);
    }
    performance.cacheMisses++;
    
    // Skip if not an image
    const parsedPath = path.parse(originalPath);
    const originalExt = parsedPath.ext.slice(1); // Remove the dot
    const dirName = parsedPath.dir;
    
    if (!IMAGE_EXTENSIONS.includes(originalExt.toLowerCase())) {
      return [];
    }
    
    // Check if optimized versions exist
    const optimizedVersions = [];
    
    for (const format of TARGET_FORMATS) {
      if (format === originalExt) continue; // Skip if same as original
      
      // Try both with and without the 'images' prefix
      const possiblePaths = [
        path.join(OPTIMIZED_IMAGES_DIR, dirName, `${parsedPath.name}.${format}`),
        path.join(OPTIMIZED_IMAGES_DIR, 'images', dirName, `${parsedPath.name}.${format}`),
        path.join(OPTIMIZED_IMAGES_DIR, path.basename(dirName), `${parsedPath.name}.${format}`)
      ];
      
      for (const optimizedPath of possiblePaths) {
        if (fs.existsSync(optimizedPath)) {
          // Convert to web-accessible path (relative to public)
          let webPath = optimizedPath.replace(/^public[\\/]?/, '').replace(/\\/g, '/');
          if (!webPath.startsWith('/')) {
            webPath = `/${webPath}`;
          }
          
          optimizedVersions.push({
            format,
            path: optimizedPath,
            webPath,
            relativePath: path.relative(PUBLIC_DIR, optimizedPath)
          });
          break;
        }
      }
    }
    
    processedFiles.add(originalPath);
    return optimizedVersions;
  } catch (error) {
    console.error(chalk.red(`Error finding optimized versions for ${originalPath}:`), error);
    return [];
  }
}

/**
 * Generate the best image source set for a given format
 * @param {Object} optimizedVersions - Object containing optimized versions by format
 * @param {string} format - Target format (webp, avif, etc.)
 * @returns {Object|null} Source set information or null if no versions available
 */
function generateSourceSet(optimizedVersions, format) {
  if (!optimizedVersions[format] || optimizedVersions[format].length === 0) {
    return null;
  }
  
  // Sort by width (ascending)
  const sortedVersions = [...optimizedVersions[format]].sort((a, b) => a.width - b.width);
  
  // Generate srcset string
  const srcset = sortedVersions
    .map(version => {
      const url = version.path.startsWith('http') 
        ? version.path 
        : `/${version.path.replace(/\\/g, '/')}`; // Ensure forward slashes for URLs
      return `${url} ${version.width}w`;
    })
    .join(',\n      ');
    
  // Get the largest version for the src attribute
  const largestVersion = sortedVersions[sortedVersions.length - 1];
  const src = largestVersion.path.startsWith('http')
    ? largestVersion.path
    : `/${largestVersion.path.replace(/\\/g, '/')}`;
  
  return {
    srcset,
    src,
    type: `image/${format}`,
    sizes: '(max-width: 100%) 100vw, 100vw',
    width: largestVersion.width,
    height: largestVersion.height
  };
}

/**
 * Generate a picture element with source sets for modern formats
 * @param {string} originalSrc - Original image source
 * @param {Array} sourceSets - Array of source set objects
 * @param {string} originalTag - Original img tag for fallback
 * @returns {string} Picture element HTML
 */
function generatePictureElement(originalSrc, sourceSets, originalTag) {
  // Extract attributes from original img tag
  const imgTagMatch = originalTag.match(/<img\s+([^>]*)>/);
  const originalAttributes = imgTagMatch ? imgTagMatch[1] : '';
  
  // Remove src and srcset from original attributes
  const cleanAttributes = originalAttributes
    .replace(/\bsrc\s*=\s*['"][^'"]*['"]/g, '')
    .replace(/\bsrcset\s*=\s*['"][^'"]*['"]/g, '')
    .replace(/\bsizes\s*=\s*['"][^'"]*['"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Sort source sets by format preference (webp first, then avif, etc.)
  const sortedSourceSets = [...sourceSets].sort((a, b) => {
    const aIndex = TARGET_FORMATS.indexOf(a.type.split('/')[1]);
    const bIndex = TARGET_FORMATS.indexOf(b.type.split('/')[1]);
    return aIndex - bIndex;
  });
  
  // Generate source elements
  const sourceElements = sortedSourceSets
    .map(sourceSet => `    <source
      srcset="${sourceSet.srcset}"
      type="${sourceSet.type}"
      sizes="${sourceSet.sizes}"
    >`)
    .join('\n');
  
  // Use the first source set as the default src for the img tag
  const fallbackSrc = sortedSourceSets[0].src;
  
  // Generate the final picture element
  return `
<picture>
${sourceElements}
  <img
    src="${fallbackSrc}"
    ${cleanAttributes}
    loading="lazy"
    decoding="async"
  >
</picture>`.trim();
}

/**
 * Update image references in a file
 * @param {string} filePath - Path to the file to update
 * @returns {Promise<Object>} Result of the update operation
 */
async function updateFile(filePath) {
  if (processedFiles.has(filePath)) {
    return { updated: false, reason: 'already processed' };
  }
  
  processedFiles.add(filePath);
  changes.filesProcessed++;
  
  debugLog(`Processing file: ${filePath}`);
  
  try {
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      debugLog(`File not found: ${filePath}`);
      return { updated: false, reason: 'file not found' };
    }
    
    // Read file content with cache
    let content;
    if (sourceFileCache.has(filePath)) {
      content = sourceFileCache.get(filePath);
    } else {
      content = await fs.readFile(filePath, 'utf8');
      sourceFileCache.set(filePath, content);
    }
    
    let updated = false;
    let newContent = content;
    
    // Match image tags with src attribute
    const imgTagRegex = /<img\s+([^>]*?\bsrc\s*=\s*['"]([^'"]+)['"][^>]*)>/gis;
    let match;
    
    while ((match = imgTagRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const imgSrc = match[2];
      const imgAttributes = match[1];
      
      // Skip data URLs and external URLs
      if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) {
        debugLog(`Skipping external image: ${imgSrc}`);
        continue;
      }
      
      // Find optimized versions
      const optimizedVersions = await findOptimizedVersions(imgSrc);
      if (!optimizedVersions) {
        debugLog(`No optimized versions found for: ${imgSrc}`);
        changes.imagesSkipped++;
        continue;
      }
      
      // Generate the best source set for each format
      const sourceSets = [];
      for (const format of TARGET_FORMATS) {
        const sourceSet = generateSourceSet(optimizedVersions, format);
        if (sourceSet) {
          sourceSets.push(sourceSet);
        }
      }
      
      if (sourceSets.length === 0) {
        debugLog(`No valid source sets for: ${imgSrc}`);
        changes.imagesSkipped++;
        continue;
      }
      
      // Generate the new picture element
      const pictureElement = generatePictureElement(imgSrc, sourceSets, fullMatch);
      
      // Replace the original img tag with the new picture element
      newContent = newContent.replace(fullMatch, pictureElement);
      updated = true;
      changes.imagesUpdated++;
      
      // Calculate potential savings
      const originalSize = 0; // We don't have this info easily available
      const optimizedSize = sourceSets.reduce((sum, set) => sum + (set.size || 0), 0);
      performance.bytesSaved += Math.max(0, (originalSize - optimizedSize));
      
      debugLog(`Updated image: ${imgSrc}`);
    }
    
    if (updated) {
      await fs.writeFile(filePath, newContent, 'utf8');
      return { updated: true };
    }
    
    return { updated: false, reason: 'no updates needed' };
    
  } catch (error) {
    console.error(chalk.red(`Error processing file ${filePath}:`), error);
    changes.errors++;
    return { updated: false, error: error.message };
  }
}

// Debug log function
function debugLog(message, data = '') {
  if (DEBUG) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;
    if (data && typeof data === 'object') {
      console.log(chalk.gray(formattedMessage), JSON.stringify(data, null, 2));
    } else if (data) {
      console.log(chalk.gray(`${formattedMessage} ${data}`));
    } else {
      console.log(chalk.gray(formattedMessage));
    }
  }
}

// Main function
async function main() {
  console.log(chalk.blue('🔄 Starting image reference update...'));
  
  try {
    // Initialize the cache with optimized images
    await initCache();
    
    console.log(chalk.blue('\n🔍 Searching for files with image references...'));
    
    // Find all files that might contain image references
    const files = [];
    for (const dir of SOURCE_DIRS) {
      try {
        const dirFiles = await glob(`**/*.{js,jsx,ts,tsx,html,md,mdx,css,scss,json}`, {
          cwd: dir,
          absolute: true,
          nodir: true,
          ignore: [
            '**/node_modules/**',
            '**/.next/**',
            '**/dist/**',
            '**/build/**',
            '**/coverage/**',
            '**/public/optimized-images/**'
          ]
        });
        files.push(...dirFiles);
      } catch (error) {
        console.error(chalk.yellow(`Warning: Error reading directory ${dir}:`), error.message);
      }
    }
    console.log(chalk.blue(`\nFound ${files.length} files to process\n`));
    
    if (files.length === 0) {
      console.log(chalk.yellow('No files found to process. Check your SOURCE_DIRS configuration.'));
      return;
    }
    
    // Process files in parallel with limited concurrency
    const BATCH_SIZE = 3; // Reduced batch size for better error handling
    const batches = [];
    
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      batches.push(files.slice(i, i + BATCH_SIZE));
    }
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\nProcessing batch ${i + 1}/${batches.length}...`);
      
      try {
        // Process each file in the batch sequentially for better error tracking
        for (const file of batch) {
          try {
            console.log(`  Processing ${path.relative(process.cwd(), file)}`);
            await updateFile(file);
          } catch (fileError) {
            console.error(chalk.red(`❌ Error processing ${file}:`), fileError);
            changes.errors++;
          }
        }
        
        const processed = Math.min((i + 1) * BATCH_SIZE, files.length);
        const progress = ((i + 1) / batches.length * 100).toFixed(1);
        console.log(chalk.blue(`\nProcessed ${processed}/${files.length} files (${progress}%)`));
      } catch (batchError) {
        console.error(chalk.red(`❌ Error in batch ${i + 1}:`), batchError);
        changes.errors += batch.length; // Count all files in the batch as errors
      }
    }
    
    // Calculate performance metrics
    const endTime = Date.now();
    const totalTime = (endTime - performance.startTime) / 1000; // in seconds
    const filesPerSecond = (changes.filesProcessed / totalTime).toFixed(2);
    const cacheHitRate = performance.cacheHits / (performance.cacheHits + performance.cacheMisses) * 100 || 0;
    
    // Print summary
    console.log('\n' + chalk.green('✅ Update complete!\n'));
    
    console.log(chalk.cyan('📊 Summary:'));
    console.log(`  Files processed: ${changes.filesProcessed}`);
    console.log(`  Images updated: ${changes.imagesUpdated}`);
    console.log(`  Images skipped: ${changes.imagesSkipped}`);
    console.log(`  Errors: ${changes.errors}`);
    
    console.log(chalk.cyan('\n⚡ Performance:'));
    console.log(`  Total time: ${totalTime.toFixed(2)}s`);
    console.log(`  Files/second: ${filesPerSecond}`);
    console.log(`  Cache hit rate: ${cacheHitRate.toFixed(1)}%`);
    
    if (performance.bytesSaved > 0) {
      console.log(`  Estimated bandwidth savings: ${formatBytes(performance.bytesSaved)}`);
    }
    
    if (changes.errors > 0) {
      console.log(chalk.yellow('\n⚠️  Some errors occurred during processing. Check the logs for details.'));
    }
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the main function
if (require.main === module) {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
  
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  updateFile,
  findOptimizedVersions,
  generateSourceSet,
  generatePictureElement
};
