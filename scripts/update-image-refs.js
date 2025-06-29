#!/usr/bin/env node

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { glob } = require('glob');
const chalk = require('chalk');

// Set up logging to file in the current directory (where the script is run from)
const logFilePath = path.resolve(process.cwd(), 'image-update-debug.log');
let logStream;

// Simple logging function that works even if file logging fails
function safeLog(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  
  try {
    if (!logStream) {
      // Try to create log file if it doesn't exist
      logStream = fsSync.createWriteStream(logFilePath, { flags: 'w' });
      logStream.write(`# Image Update Debug Log - ${timestamp}\n\n`);
      console.log(chalk.yellow(`Logging to: ${logFilePath}`));
    }
    logStream.write(logLine);
  } catch (error) {
    // If file logging fails, at least log to console
    console.error(chalk.red(`❌ Failed to write to log file: ${error.message}`));
    console.log(logLine.trim());
  }
}

// Override console.log to also write to our log file
const originalConsoleLog = console.log;
console.log = (...args) => {
  safeLog(args.map(arg => 
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' '));
  originalConsoleLog(...args);
};

// Override console.error to also write to our log file
const originalConsoleError = console.error;
console.error = (...args) => {
  const errorMsg = args.map(arg => 
    arg instanceof Error ? `${arg.message}\n${arg.stack}` : 
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : 
    String(arg)
  ).join(' ');
  safeLog(`[ERROR] ${errorMsg}`);
  originalConsoleError(...args);
};

// Function to ensure directory exists
async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error(chalk.red(`❌ Failed to create directory ${dir}: ${error.message}`));
      throw error;
    }
  }
}

// Configuration
const SOURCE_DIRS = ['src', 'public'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
const OPTIMIZED_DIR = 'public/optimized-images';

// Track changes
const stats = {
  filesProcessed: 0,
  imagesUpdated: 0,
  imagesSkipped: 0,
  errors: 0
};

// Debug logging with different log levels
function debug(message, data = '', level = 'info') {
  const timestamp = new Date().toISOString();
  const logLevel = level.toUpperCase();
  
  // Format the log entry
  let logEntry = `[${timestamp}] ${logLevel}: ${message}`;
  if (data) {
    logEntry += '\n' + (typeof data === 'string' ? data : JSON.stringify(data, null, 2));
  }
  
  // Always write to log file
  safeLog(logEntry);
  
  // Only show debug messages if DEBUG env var is set
  if (logLevel === 'DEBUG' && !process.env.DEBUG) {
    return;
  }
  
  // Use different colors based on log level
  const colors = {
    DEBUG: chalk.blue,
    INFO: chalk.cyan,
    WARN: chalk.yellow,
    ERROR: chalk.red,
    SUCCESS: chalk.green
  };
  
  const color = colors[logLevel] || chalk.white;
  
  // Log to console with color
  const logFn = logLevel === 'ERROR' ? console.error : console.log;
  logFn(color(`[${timestamp}] ${logLevel}: ${message}`), data ? '\n' + (typeof data === 'string' ? data : JSON.stringify(data, null, 2)) : '');
}

// Helper to check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Find all optimized images
async function findOptimizedImages() {
  const optimizedImages = new Map();
  
  try {
    debug(`Looking for optimized images in: ${OPTIMIZED_DIR}`);
    
    // First, check if the directory exists
    try {
      await fs.access(OPTIMIZED_DIR);
    } catch (error) {
      console.error(chalk.red(`❌ Optimized images directory not found: ${OPTIMIZED_DIR}`));
      console.error(chalk.yellow('Please run the optimization script first.'));
      process.exit(1);
    }
    
    // Define search patterns for different directory structures
    const searchPatterns = [
      // Root level images (e.g., apple-touch-icon.*)
      `${OPTIMIZED_DIR}/*.{${IMAGE_EXTENSIONS.join(',')}}`,
      // Images in /images directory (e.g., logo192.*)
      `${OPTIMIZED_DIR}/images/*.{${IMAGE_EXTENSIONS.join(',')}}`,
      // Project images in /images/projects/**
      `${OPTIMIZED_DIR}/images/projects/**/*.{${IMAGE_EXTENSIONS.join(',')}}`
    ];
    
    // Process each search pattern
    for (const pattern of searchPatterns) {
      try {
        const files = await glob(pattern, { nodir: true });
        debug(`Found ${files.length} files matching pattern: ${pattern}`);
        
        for (const file of files) {
          // Calculate the relative path from OPTIMIZED_DIR
          const relativePath = path.relative(OPTIMIZED_DIR, file);
          // Remove the optimized extension to get the original path
          const originalPath = relativePath.replace(/\.(webp|avif)$/, path.extname(relativePath));
          
          debug(`Processing optimized file: ${file}`, {
            relativePath,
            originalPath
          });
          
          if (!optimizedImages.has(originalPath)) {
            optimizedImages.set(originalPath, []);
          }
          
          const webPath = '/' + file.replace(/^public[\\/]?/, '').replace(/\\/g, '/');
          const imageInfo = {
            path: file,
            ext: path.extname(file).slice(1).toLowerCase(),
            webPath: webPath,
            exists: await fileExists(file)
          };
          
          debug(`Adding optimized version: ${JSON.stringify(imageInfo)}`);
          optimizedImages.get(originalPath).push(imageInfo);
        }
      } catch (error) {
        console.error(chalk.yellow(`⚠️  Error processing pattern ${pattern}:`), error);
      }
    }
    
    // After processing all patterns, log a summary
    debug(`Found ${optimizedImages.size} unique original images with optimized versions`);
    
    // Log some examples for debugging
    const exampleCount = Math.min(5, optimizedImages.size);
    if (exampleCount > 0) {
      debug(`Example optimized images (${exampleCount} of ${optimizedImages.size}):`);
      let count = 0;
      for (const [original, versions] of optimizedImages.entries()) {
        if (count++ >= exampleCount) break;
        debug(`  ${original} -> ${versions.length} versions:`, 
          versions.map(v => v.ext).join(', '));
      }
    }
    
    debug(`Found ${optimizedImages.size} optimized images`);
    return optimizedImages;
  } catch (error) {
    console.error(chalk.red('❌ Error finding optimized images:'), error);
    throw error;
  }
}

// Update image references in a file
async function updateFile(filePath, optimizedImages) {
  try {
    debug(`\n=== Processing file: ${filePath} ===`, 'INFO');
    
    // Skip if file doesn't exist
    if (!await fileExists(filePath)) {
      debug(`File does not exist, skipping: ${filePath}`, null, 'WARN');
      return;
    }
    
    let content = await fs.readFile(filePath, 'utf-8');
    let updated = false;
    
    // Find all image references using multiple patterns
    const patterns = [
      // Match src="..." attributes
      /src=["']([^"'\s]+\.(?:jpg|jpeg|png|gif|webp|avif))["']/gi,
      // Match url('...') in CSS
      /url\(['"]?([^'"\s)]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]?\)/gi,
      // Match import/require statements
      /(?:import|require)\(?['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]\)?/gi,
      // Match any quoted string that looks like an image path
      /['"]([^'"\s]+\.(?:jpg|jpeg|png|gif|webp|avif))['"]/gi
    ];
    
    // Collect all matches
    let imageRefs = [];
    for (const pattern of patterns) {
      const matches = content.match(pattern) || [];
      imageRefs = [...imageRefs, ...matches];
    }
    
    // Clean up the references
    imageRefs = imageRefs.map(ref => {
      // Remove src=, url(), quotes, and other non-path parts
      return ref
        .replace(/^src=/, '')
        .replace(/^url\(['"]?|['"]?\)$/g, '')
        .replace(/^['"]|['"]$/g, '')
        .replace(/^require\(|["')]/g, '')
        .replace(/^import\s+.*?\s+from\s+['"]|['"]/g, '');
    });
    
    // Remove duplicates and empty strings
    const uniqueRefs = [...new Set(imageRefs)].filter(Boolean);
    
    debug(`Found ${uniqueRefs.length} unique image references in ${filePath}`, uniqueRefs, 'INFO');
    
    for (const ref of uniqueRefs) {
      // Skip data URLs and absolute URLs
      if (ref.startsWith('data:') || ref.startsWith('http')) {
        debug(`Skipping URL: ${ref}`);
        continue;
      }
      
            // Try to find optimized versions
      const refPath = ref.startsWith('/') ? ref.slice(1) : ref;
      debug(`Looking for optimized versions of: ${refPath}`, 'DEBUG');
      
      // Try different variations of the path
      const pathVariations = [
        refPath,  // Original path
        path.basename(refPath),  // Just the filename
        path.join('images', path.basename(refPath)),  // In images/
        path.join('images/projects', path.basename(refPath)),  // In images/projects/
        refPath.replace(/^\//, ''),  // Remove leading slash
        refPath.replace(/^public\//, ''),  // Remove public/ prefix if present
        path.basename(refPath).replace(/^[^.]+\./, '')  // Just the base name without extension
      ];
      
      // Also try with different path separators
      pathVariations.push(...pathVariations.map(p => p.replace(/\//g, '\\')));
      
      // Add the original reference as a variation
      pathVariations.push(ref);
      
      // Remove duplicates
      const uniqueVariations = [...new Set(pathVariations)];
      
      let optimizedVersions = [];
      
      // Check each variation
      for (const pathVar of uniqueVariations) {
        if (optimizedImages.has(pathVar)) {
          const versions = optimizedImages.get(pathVar);
          if (versions && versions.length > 0) {
            optimizedVersions = versions;
            debug(`Found ${versions.length} optimized versions using path variation: ${pathVar}`, 
              versions.map(v => v.ext), 'SUCCESS');
            break;
          }
        }
      }
      
      if (optimizedVersions.length > 0) {
        debug(`Found ${optimizedVersions.length} optimized versions for ${ref}`, 
          optimizedVersions.map(v => ({
            ext: v.ext,
            exists: v.exists,
            path: v.path
          })), 'SUCCESS');
        
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
        debug(`No optimized versions found for: ${ref}`);
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
        
        debug(`✅ Updated: ${filePath} (backup saved to ${backupPath})`, null, 'SUCCESS');
        stats.filesProcessed++;
      } catch (error) {
        debug(`❌ Failed to update file ${filePath}: ${error.message}`, null, 'ERROR');
        stats.errors++;
      }
    } else {
      debug(`No updates needed for: ${filePath}`, null, 'INFO');
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error processing ${filePath}:`), error);
    stats.errors++;
  }
}

// Main function
async function main() {
  console.log(chalk.blue('🔍 Starting image reference update...'));
  console.log(chalk.yellow(`Logging to: ${logFilePath}`));
  
  try {
    // Ensure the log file is writable
    await fs.access(path.dirname(logFilePath), fs.constants.W_OK);
  } catch (error) {
    console.error(chalk.red(`❌ Cannot write to log file directory: ${error.message}`));
    process.exit(1);
  }
  
  // Log environment info
  debug('Environment Info', {
    cwd: process.cwd(),
    node: process.version,
    platform: process.platform,
    optimizedDir: OPTIMIZED_DIR,
    absOptimizedDir: path.resolve(OPTIMIZED_DIR),
    env: {
      DEBUG: process.env.DEBUG,
      NODE_ENV: process.env.NODE_ENV
    }
  }, 'INFO');
  
  // Log current working directory
  const cwd = process.cwd();
  console.log(`Current working directory: ${cwd}`);
  
  // Log absolute path to optimized images
  const absPath = path.resolve(OPTIMIZED_DIR);
  console.log(`Looking for optimized images in: ${absPath}`);
  
  // Log directory contents for debugging
  try {
    const dirContents = await fs.readdir(absPath, { withFileTypes: true });
    debug('Optimized images directory contents:', dirContents.map(d => ({
      name: d.name,
      isDirectory: d.isDirectory(),
      isFile: d.isFile()
    })), 'DEBUG');
  } catch (error) {
    debug(`Failed to read optimized images directory: ${error.message}`, null, 'ERROR');
  }
  
  try {
    // Find all optimized images
    const optimizedImages = await findOptimizedImages();
    
    if (optimizedImages.size === 0) {
      console.log(chalk.yellow('⚠️  No optimized images found. Run the optimization script first.'));
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
      '!**/out/**'
    ];
    
    for (const dir of SOURCE_DIRS) {
      try {
        const files = await glob(patterns, { cwd: dir, absolute: true });
        sourceFiles.push(...files);
      } catch (error) {
        console.error(chalk.red(`❌ Error reading directory ${dir}:`), error);
      }
    }
    
    console.log(`Found ${sourceFiles.length} source files to process`);
    
    if (sourceFiles.length === 0) {
      console.log(chalk.yellow('⚠️  No source files found to process.'));
      return;
    }
    
    // Process files
    for (const file of sourceFiles) {
      await updateFile(file, optimizedImages);
    }
    
    // Print summary
    const summary = {
      '✅ Update complete!': '',
      '📊 Summary': {
        '📄 Files processed': stats.filesProcessed,
        '🖼️ Images updated': stats.imagesUpdated,
        '⏭️ Images skipped': stats.imagesSkipped,
        '❌ Errors': stats.errors
      }
    };
    
    console.log(chalk.green('\n✅ Update complete!'));
    console.log(`📊 ${chalk.bold('Summary:')}`);
    console.log(`   📄 Files processed: ${stats.filesProcessed}`);
    console.log(`   🖼️  Images updated: ${stats.imagesUpdated}`);
    console.log(`   ⏭️  Images skipped: ${stats.imagesSkipped}`);
    
    if (stats.errors > 0) {
      console.log(chalk.red(`   ❌ Errors: ${stats.errors}`));
    }
    
    try {
      // Log summary to file
      debug('Final Summary', summary, 'INFO');
      
      // Also log to console in a more readable format
      console.log('\n' + chalk.cyan('=== Detailed Summary ==='));
      console.log(JSON.stringify(summary, null, 2));
      console.log(chalk.yellow(`\n💡 Check the full debug log at: ${logFilePath}`));
    } catch (logError) {
      console.error(chalk.red('❌ Error writing final log entries:'), logError);
    } finally {
      // Ensure log file is properly closed
      if (logStream) {
        try {
          logStream.end('\n--- End of log ---\n');
        } catch (e) {
          console.error('Error closing log file:', e);
        }
      }
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Fatal error:'), error);
    process.exit(1);
  }
}

// Run the script
main();
