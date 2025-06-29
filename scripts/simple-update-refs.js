#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const chalk = require('chalk');

// Configuration
const SOURCE_DIRS = ['src', 'public'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
const OPTIMIZED_DIR = 'public/optimized-images';
const LOG_FILE = 'image-update-simple.log';

// Track changes
const stats = {
  filesProcessed: 0,
  imagesUpdated: 0,
  imagesSkipped: 0,
  errors: 0
};

// Simple logging function
async function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  
  try {
    await fs.appendFile(LOG_FILE, logLine);
  } catch (error) {
    console.error(`❌ Failed to write to log file: ${error.message}`);
  }
  
  console.log(logLine.trim());
}

// Find all optimized images
async function findOptimizedImages() {
  const optimizedImages = new Map();
  
  try {
    await logToFile(`Looking for optimized images in: ${path.resolve(OPTIMIZED_DIR)}`);
    
    // Check if directory exists
    try {
      await fs.access(OPTIMIZED_DIR);
    } catch (error) {
      await logToFile(`❌ Optimized images directory not found: ${path.resolve(OPTIMIZED_DIR)}`);
      await logToFile('Please run the optimization script first.');
      process.exit(1);
    }
    
    // Find all image files
    const patterns = [
      `${OPTIMIZED_DIR}/**/*.{${IMAGE_EXTENSIONS.join(',')}}`
    ];
    
    for (const pattern of patterns) {
      try {
        const files = await glob(pattern, { nodir: true });
        await logToFile(`Found ${files.length} files matching: ${pattern}`);
        
        for (const file of files) {
          const relativePath = path.relative(OPTIMIZED_DIR, file);
          const originalPath = relativePath.replace(/\.(webp|avif)$/, path.extname(relativePath));
          
          if (!optimizedImages.has(originalPath)) {
            optimizedImages.set(originalPath, []);
          }
          
          const webPath = '/' + file.replace(/^public[\\/]?/, '').replace(/\\/g, '/');
          const ext = path.extname(file).slice(1).toLowerCase();
          
          optimizedImages.get(originalPath).push({
            path: file,
            ext,
            webPath,
            exists: true
          });
          
          await logToFile(`  Found: ${relativePath} -> ${webPath} (${ext})`);
        }
      } catch (error) {
        await logToFile(`❌ Error processing pattern ${pattern}: ${error.message}`);
      }
    }
    
    await logToFile(`Found ${optimizedImages.size} unique original images with optimized versions`);
    return optimizedImages;
    
  } catch (error) {
    await logToFile(`❌ Error finding optimized images: ${error.message}`);
    throw error;
  }
}

// Update image references in a file
async function updateFile(filePath, optimizedImages) {
  try {
    await logToFile(`\nProcessing file: ${filePath}`);
    
    // Skip if file doesn't exist
    try {
      await fs.access(filePath);
    } catch {
      await logToFile(`❌ File does not exist, skipping: ${filePath}`);
      return;
    }
    
    let content = await fs.readFile(filePath, 'utf-8');
    let updated = false;
    
    // Find all image references
    const patterns = [
      // HTML img src
      /<img[^>]*src=["']([^"'\s]+\.(?:jpg|jpeg|png|gif|webp|avif))[^>]*>/gi,
      // CSS url()
      /url\(['"]?([^'"\s)]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]?\)/gi,
      // JS imports/requires
      /(?:import|require)\(?['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]\)?/gi,
      // Background images in style attributes
      /style=["'][^"']*background(?:-image)?:[^;]*url\(['"]?([^'"\s)]+\.(?:jpg|jpeg|png|gif|webp|avif))[^'"\s)]*['"]?[^;]*\)/gi,
      // Any quoted image path
      /['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]/gi,
      // Next.js Image component
      /<Image[^>]*src=["']([^"'\s]+\.(?:jpg|jpeg|png|gif|webp|avif))[^>]*>/gi
    ];
    
    // Collect all matches
    let imageRefs = [];
    for (const pattern of patterns) {
      const matches = content.match(pattern) || [];
      imageRefs = [...imageRefs, ...matches];
    }
    
    // Clean up the references
    imageRefs = imageRefs.map(ref => {
      // Extract just the path from the full match
      const pathMatch = ref.match(/['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]/i);
      if (pathMatch && pathMatch[1]) {
        return pathMatch[1];
      }
      
      // Clean up common patterns
      return ref
        .replace(/^[^'"=]*=["']?/, '')  // Remove attribute name and equals
        .replace(/^url\(['"]?|['"]?\)$/g, '')  // Remove url()
        .replace(/^['"]|['"]$/g, '')  // Remove surrounding quotes
        .replace(/^require\(|["')]/g, '')  // Remove require()
        .replace(/^import\s+.*?\s+from\s+['"]|['"]/g, '')  // Remove import statements
        .replace(/^<[^>]+>/, '')  // Remove HTML tags
        .trim();
    });
    
    // Remove duplicates and empty strings, and filter out non-image paths
    const uniqueRefs = [...new Set(imageRefs)]
      .filter(Boolean)
      .filter(ref => {
        // Only keep paths that look like image files
        return /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(ref) && 
               !ref.includes('data:') && 
               !ref.startsWith('http');
      });
    
    if (uniqueRefs.length === 0) {
      await logToFile(`No valid image references found in: ${filePath}`);
      return;
    }
    
    await logToFile(`Found ${uniqueRefs.length} valid image references in ${filePath}:`);
    for (const ref of uniqueRefs) {
      await logToFile(`  - ${ref}`);
    }
    
    await logToFile(`Found ${uniqueRefs.length} unique image references`);
    
    for (const ref of uniqueRefs) {
      // Skip data URLs and absolute URLs
      if (ref.startsWith('data:') || ref.startsWith('http')) {
        await logToFile(`Skipping URL: ${ref}`);
        stats.imagesSkipped++;
        continue;
      }
      
      // Try to find optimized versions
      const refPath = ref.startsWith('/') ? ref.slice(1) : ref;
      await logToFile(`Looking for optimized versions of: ${refPath}`);
      
      // Try different variations of the path
      const pathVariations = [
        refPath,
        path.basename(refPath),
        path.join('images', path.basename(refPath)),
        path.join('images/projects', path.basename(refPath)),
        refPath.replace(/^\//, ''),
        refPath.replace(/^public\//, ''),
        path.basename(refPath).replace(/^[^.]+./, '')
      ];
      
      let optimizedVersions = [];
      
      // Check each variation
      for (const pathVar of pathVariations) {
        if (optimizedImages.has(pathVar)) {
          optimizedVersions = optimizedImages.get(pathVar);
          await logToFile(`Found ${optimizedVersions.length} optimized versions using path variation: ${pathVar}`);
          break;
        }
      }
      
      if (optimizedVersions.length > 0) {
        await logToFile(`Found ${optimizedVersions.length} optimized versions for ${ref}`);
        
        // Create picture element with sources
        const webpVersion = optimizedVersions.find(v => v.ext === 'webp');
        const avifVersion = optimizedVersions.find(v => v.ext === 'avif');
        
        const pictureElement = `{\`<picture>
          ${avifVersion ? `<source srcSet="${avifVersion.webPath}" type="image/avif" />` : ''}
          ${webpVersion ? `<source srcSet="${webpVersion.webPath}" type="image/webp" />` : ''}
          <img src="${ref}" alt="" loading="lazy" />
        </picture>\`}`;
        
        // Replace the reference
        const escapedRef = ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(`['"]${escapedRef}['"]`, 'g'), pictureElement);
        
        updated = true;
        stats.imagesUpdated++;
      } else {
        await logToFile(`No optimized versions found for: ${ref}`);
        stats.imagesSkipped++;
      }
    }
    
    if (updated) {
      try {
        // Create backup of original file
        const backupPath = `${filePath}.bak`;
        await fs.copyFile(filePath, backupPath);
        
        // Write the updated content
        await fs.writeFile(filePath, content, 'utf-8');
        
        await logToFile(`✅ Updated: ${filePath} (backup saved to ${backupPath})`);
        stats.filesProcessed++;
      } catch (error) {
        await logToFile(`❌ Failed to update file ${filePath}: ${error.message}`);
        stats.errors++;
      }
    } else {
      await logToFile(`No updates needed for: ${filePath}`);
    }
  } catch (error) {
    await logToFile(`❌ Error processing ${filePath}: ${error.message}`);
    stats.errors++;
  }
}

// Main function
async function main() {
  // Clear the log file
  try {
    await fs.writeFile(LOG_FILE, `# Image Update Log - ${new Date().toISOString()}\n\n`, 'utf-8');
  } catch (error) {
    console.error(`❌ Failed to initialize log file: ${error.message}`);
    process.exit(1);
  }
  
  await logToFile('🔍 Starting image reference update...');
  await logToFile(`Current working directory: ${process.cwd()}`);
  await logToFile(`Looking for optimized images in: ${path.resolve(OPTIMIZED_DIR)}`);
  
  try {
    // Find all optimized images
    const optimizedImages = await findOptimizedImages();
    
    if (optimizedImages.size === 0) {
      await logToFile('⚠️  No optimized images found. Run the optimization script first.');
      return;
    }
    
    // Find all source files
    const sourceFiles = [];
    const patterns = [
      '**/*.{js,jsx,ts,tsx,json,html}',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/build/**',
      '!**/.next/**',
      '!**/out/**',
      '!**/*.bak'
    ];
    
    for (const dir of SOURCE_DIRS) {
      try {
        const files = await glob(patterns, { cwd: dir, absolute: true });
        sourceFiles.push(...files);
      } catch (error) {
        await logToFile(`❌ Error reading directory ${dir}: ${error.message}`);
      }
    }
    
    await logToFile(`Found ${sourceFiles.length} source files to process`);
    
    if (sourceFiles.length === 0) {
      await logToFile('⚠️  No source files found to process.');
      return;
    }
    
    // Process files
    for (const file of sourceFiles) {
      await updateFile(file, optimizedImages);
    }
    
    // Print summary
    await logToFile('\n✅ Update complete!');
    await logToFile('📊 Summary:');
    await logToFile(`   📄 Files processed: ${stats.filesProcessed}`);
    await logToFile(`   🖼️  Images updated: ${stats.imagesUpdated}`);
    await logToFile(`   ⏭️  Images skipped: ${stats.imagesSkipped}`);
    
    if (stats.errors > 0) {
      await logToFile(`   ❌ Errors: ${stats.errors}`);
    }
    
    await logToFile('\n💡 Check the log file for details: ' + path.resolve(LOG_FILE));
    
  } catch (error) {
    await logToFile(`❌ Fatal error: ${error.message}\n${error.stack}`);
    process.exit(1);
  }
}

// Run the script
main();
