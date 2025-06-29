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
const TARGET_FORMATS = ['webp', 'avif'];
const OPTIMIZED_IMAGES_DIR = 'public/optimized-images';
const PUBLIC_DIR = 'public';

// Track processed files to avoid duplicates
const processedFiles = new Set();

// Track changes
const changes = {
  filesProcessed: 0,
  imagesUpdated: 0,
  imagesSkipped: 0,
  errors: 0
};

// Cache for optimized images
const optimizedImagesCache = new Map();

// Initialize the cache with optimized images
async function initCache() {
  console.log(chalk.blue('🔍 Scanning for optimized images...'));
  
  try {
    const files = await glob(`${OPTIMIZED_IMAGES_DIR}/**/*.{${TARGET_FORMATS.join(',')}}`);
    
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

// Find optimized versions of an image
function findOptimizedVersions(originalPath) {
  // Skip if already processed
  if (processedFiles.has(originalPath)) {
    return [];
  }
  
  const parsedPath = path.parse(originalPath);
  const baseName = parsedPath.name;
  const originalExt = parsedPath.ext.slice(1); // Remove the dot
  const dirName = parsedPath.dir;
  
  // Skip if not an image
  if (!IMAGE_EXTENSIONS.includes(originalExt.toLowerCase())) {
    return [];
  }
  
  // Check if optimized versions exist
  const optimizedVersions = [];
  
  for (const format of TARGET_FORMATS) {
    if (format === originalExt) continue; // Skip if same as original
    
    // Try both with and without the 'images' prefix
    const possiblePaths = [
      path.join(OPTIMIZED_IMAGES_DIR, dirName, `${baseName}.${format}`),
      path.join(OPTIMIZED_IMAGES_DIR, 'images', dirName, `${baseName}.${format}`),
      path.join(OPTIMIZED_IMAGES_DIR, path.basename(dirName), `${baseName}.${format}`)
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
}

// Generate the best image source set
function generateSourceSet(optimizedVersions, format) {
  const sources = [];
  
  // Group by size
  const bySize = {};
  optimizedVersions
    .filter(img => img.format === format)
    .forEach(img => {
      if (!bySize[img.size]) bySize[img.size] = [];
      bySize[img.size].push(img);
    });
  
  // For each size, get the highest quality version
  Object.entries(bySize).forEach(([size, imgs]) => {
    // Prefer the smallest file size for the same dimensions
    const bestImg = imgs.reduce((best, current) => 
      current.size < best.size ? current : best
    );
    
    sources.push({
      size: parseInt(size, 10),
      path: bestImg.path,
      format: bestImg.format
    });
  });
  
  // Sort by size
  sources.sort((a, b) => a.size - b.size);
  
  // Generate srcset string
  if (sources.length > 0) {
    return {
      srcset: sources.map(s => `${s.path} ${s.size}x`).join(',\n      '),
      type: `image/${format}`
    };
  }
  
  return null;
}

// Log a debug message with a timestamp
function debugLog(message, data = '') {
  const timestamp = new Date().toISOString();
  console.log(chalk.blue(`[${timestamp}] DEBUG: ${message}`), data || '');
}

// Update image references in a file
async function updateFile(filePath) {
  try {
    debugLog(`Processing file: ${filePath}`);
    let content = await fs.readFile(filePath, 'utf-8');
    let updated = false;
    
    // Find all image references in the file using multiple patterns
    const patterns = [
      // Match quoted strings that look like image paths
      /['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]/gi,
      // Match src="..." attributes
      /src=["']([^"'\s]+\.(?:jpg|jpeg|png|gif|webp|avif))["']/gi,
      // Match require() calls
      /require\(['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]\)/gi,
      // Match import statements
      /import\s+.*?['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]/gi
    ];
    
    // Collect all matches
    let imageRefs = [];
    for (const pattern of patterns) {
      const matches = content.match(pattern) || [];
      imageRefs = [...imageRefs, ...matches];
    }
    
    // Clean up the references
    imageRefs = imageRefs.map(ref => {
      // Remove src=, quotes, and other non-path parts
      return ref
        .replace(/^src=/, '')
        .replace(/^['"]|['"]$/g, '')
        .replace(/^require\(|["')]/g, '')
        .replace(/^import\s+.*?\s+from\s+['"]|['"]/g, '');
    });
    
    // Remove duplicates and empty strings
    const uniqueRefs = [...new Set(imageRefs)].filter(Boolean);
    
    debugLog(`Found ${uniqueRefs.length} unique image references in ${filePath}`, uniqueRefs);
    
    for (const ref of uniqueRefs) {
      const imagePath = ref.replace(/^['"]|['"]$/g, ''); // Remove quotes
      
      // Skip data URLs and absolute URLs
      if (imagePath.startsWith('data:') || imagePath.startsWith('http')) {
        debugLog(`Skipping URL: ${imagePath}`);
        continue;
      }
      
      // Handle both absolute and relative paths
      let searchPath = imagePath;
      if (imagePath.startsWith('/')) {
        searchPath = path.join('public', imagePath);
      } else {
        // For relative paths, make them relative to the current file
        const fileDir = path.dirname(filePath);
        searchPath = path.resolve(fileDir, searchPath);
      }
      
      debugLog(`Processing image: ${imagePath}`, {
        originalPath: imagePath,
        searchPath,
        exists: fs.existsSync(searchPath) ? 'Yes' : 'No',
        isFile: fs.existsSync(searchPath) ? (fs.statSync(searchPath).isFile() ? 'Yes' : 'No') : 'N/A'
      });
      
      let optimizedVersions = [];
      try {
        optimizedVersions = findOptimizedVersions(searchPath);
        debugLog(`Found ${optimizedVersions.length} optimized versions for ${searchPath}`, optimizedVersions);
      } catch (error) {
        console.error(chalk.yellow(`⚠️  Error finding optimized versions for ${searchPath}:`), error.message);
        continue;
      }
      
      if (optimizedVersions && optimizedVersions.length > 0) {
        // Get the original extension for fallback
        const originalExt = path.extname(imagePath).toLowerCase().slice(1);
        const isJSX = filePath.endsWith('.jsx') || filePath.endsWith('.tsx');
        
        // Generate the new reference
        let newRef = '';
        
        if (isJSX) {
          // For JSX files, use picture/source elements
          const webpVersion = optimizedVersions.find(v => v.format === 'webp');
          const avifVersion = optimizedVersions.find(v => v.format === 'avif');
          
          newRef = `{\`<picture>
            ${avifVersion ? `<source srcSet="${avifVersion.webPath}" type="image/avif" />` : ''}
            ${webpVersion ? `<source srcSet="${webpVersion.webPath}" type="image/webp" />` : ''}
            <img src="${imagePath}" alt="" loading="lazy" />
          </picture>\`}`;
          updated = true;
          changes.imagesUpdated++;
        } else {
          changes.imagesSkipped++;
        }
      } else {
        changes.imagesSkipped++;
      }
    }
    
    // Save the file if it was updated
    if (updated) {
      await fs.writeFile(filePath, content, 'utf8');
      changes.filesProcessed++;
      console.log(chalk.green(`✅ Updated ${filePath}`));
    }
    
    return updated;
  } catch (error) {
    console.error(chalk.red(`❌ Error processing ${filePath}:`), error);
    changes.errors++;
    return false;
  }
}

// Main function
async function main() {
  try {
    // Initialize the cache with optimized images
    await initCache();

    if (optimizedImagesCache.size === 0) {
      console.log(chalk.yellow('⚠️  No optimized images found. Run the optimization script first.'));

  console.log(chalk.blue('\n🔍 Searching for image references in source files...'));

  // Get all source files with more specific patterns
  const sourceFiles = [];
  const patterns = [
    '**/*.{js,jsx,ts,tsx}',
    '**/*.json',
    '**/*.html',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/.next/**',
    '!**/out/**'
  ];

  for (const dir of SOURCE_DIRS) {
    try {
      const files = await glob(patterns, { cwd: dir, absolute: true });
      debugLog(`Found ${files.length} files in ${dir}`, files.slice(0, 5).concat(files.length > 5 ? ['...'] : []));
      sourceFiles.push(...files);
    } catch (error) {
      console.error(chalk.red(`❌ Error reading directory ${dir}:`), error.message);
    }
  }

  console.log(`Found ${sourceFiles.length} source files to process.`);

  if (sourceFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No source files found to process.'));
    process.exit(0);
  }

    // Auto-confirm update
    console.log('\n🔄 Proceeding with automatic update of image references...');
    
    try {
      // Process files sequentially to avoid overwhelming the system
      for (const file of sourceFiles) {
        try {
          await updateFile(file);
        } catch (error) {
          console.error(chalk.red(`❌ Error processing ${file}:`), error);
          changes.errors++;
        }
      }
      
      // Print summary
      console.log(chalk.green('\n✅ Update complete!'));
      console.log(`📊 ${chalk.bold('Summary:')}`);
      console.log(`   📄 Files processed: ${changes.filesProcessed}`);
      console.log(`   🖼️  Images updated: ${changes.imagesUpdated}`);
      console.log(`   ⏭️  Images skipped: ${changes.imagesSkipped}`);
      if (changes.errors > 0) {
        console.log(chalk.red(`   ❌ Errors: ${changes.errors}`));
      }
    } catch (error) {
      console.error(chalk.red('❌ Fatal error in main process:'), error);
      process.exit(1);
    }
    
    // Close readline if it's still open
    if (rl && typeof rl.close === 'function') {
      rl.close();
    }
    if (changes.filesProcessed > 0) {
      console.log('\n' + chalk.green.bold('🎉 Image references updated successfully!'));
      console.log('\nNext steps:');
      console.log('1. Review the changes in your source files');
      console.log('2. Test the updated images in different browsers');
      console.log('3. Run a Lighthouse audit to measure performance improvements');
    } else {
      console.log(chalk.yellow('\n⚠️  No image references were updated.'));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ An error occurred:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
main();
