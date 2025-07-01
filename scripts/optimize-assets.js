const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { optimize } = require('svgo');
const chalk = require('chalk');
const glob = require('glob').glob;

// Configuration
const CONFIG = {
  // Source directories
  srcDirs: [
    'src/assets/images',
    'public/images',
    'public/static/media'
  ],
  
  // Output directory for optimized images
  outputDir: 'public/optimized',
  
  // Image optimization settings
  imageSettings: {
    // WebP settings
    webp: {
      quality: 80,
      effort: 6,
      lossless: false,
      alphaQuality: 80,
    },
    
    // AVIF settings
    avif: {
      quality: 60,
      effort: 8,
      chromaSubsampling: '4:4:4',
    },
    
    // Resize settings for responsive images
    sizes: [
      { suffix: '@1x', width: 480 },
      { suffix: '@2x', width: 960 },
      { suffix: '@3x', width: 1440 },
    ],
    
    // File types to process
    formats: ['jpg', 'jpeg', 'png', 'webp'],
    
    // Skip files matching these patterns
    skipPatterns: [
      '**/sprite.svg',
      '**/*.min.*',
      '**/optimized/**',
    ],
  },
};

// Create optimized versions of an image
async function optimizeImage(filePath, outputDir) {
  const ext = path.extname(filePath).toLowerCase().slice(1);
  const fileName = path.basename(filePath, `.${ext}`);
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Skip unsupported formats
  if (!CONFIG.imageSettings.formats.includes(ext)) {
    console.log(chalk.gray(`Skipping unsupported format: ${relativePath}`));
    return [];
  }
  
  // Skip files that match skip patterns
  const shouldSkip = CONFIG.imageSettings.skipPatterns.some(pattern => 
    filePath.includes(pattern.replace(/\*\*/g, '').replace(/\*/g, ''))
  );
  
  if (shouldSkip) {
    console.log(chalk.gray(`Skipping (matches skip pattern): ${relativePath}`));
    return [];
  }
  
  const results = [];
  const originalStats = await fs.stat(filePath);
  
  // Process each size variant
  for (const size of CONFIG.imageSettings.sizes) {
    const outputFileName = `${fileName}${size.suffix}.webp`;
    const outputPath = path.join(outputDir, outputFileName);
    
    try {
      // Skip if output file already exists and is newer than source
      try {
        const outputStats = await fs.stat(outputPath);
        if (outputStats.mtimeMs > originalStats.mtimeMs) {
          console.log(chalk.blue(`Skipping (up to date): ${outputFileName}`));
          results.push({
            original: relativePath,
            optimized: path.relative(process.cwd(), outputPath),
            format: 'webp',
            size: size,
            skipped: true,
          });
          continue;
        }
      } catch (e) {
        // Output file doesn't exist, continue with optimization
      }
      
      // Create output directory if it doesn't exist
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      // Process image with sharp
      await sharp(filePath)
        .resize({
          width: size.width,
          withoutEnlargement: true,
        })
        .webp(CONFIG.imageSettings.webp)
        .toFile(outputPath);
      
      // Get optimized file stats
      const optimizedStats = await fs.stat(outputPath);
      const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
      
      console.log(chalk.green(`Created: ${outputFileName} (${(optimizedStats.size / 1024).toFixed(1)}KB, ${savings}% savings)`));
      
      results.push({
        original: relativePath,
        optimized: path.relative(process.cwd(), outputPath),
        format: 'webp',
        size: size,
        originalSize: originalStats.size,
        optimizedSize: optimizedStats.size,
        savings: parseFloat(savings),
      });
    } catch (error) {
      console.error(chalk.red(`Error processing ${relativePath}:`), error);
    }
  }
  
  return results;
}

// Process all images in a directory
async function processDirectory(dir) {
  console.log(chalk.yellow(`\n=== Processing directory: ${dir} ===`));
  
  // Check if directory exists
  try {
    const dirExists = await fs.access(dir).then(() => true).catch(() => false);
    if (!dirExists) {
      console.log(chalk.red(`❌ Directory does not exist: ${dir}`));
      return [];
    }
    
    console.log(chalk.green(`✅ Directory exists: ${dir}`));
    
    // List directory contents for debugging
    try {
      const dirContents = await fs.readdir(dir, { withFileTypes: true });
      console.log(chalk.blue('📂 Directory contents:'));
      dirContents.forEach(dirent => {
        console.log(`  ${dirent.isDirectory() ? '📁' : '📄'} ${dirent.name}`);
      });
    } catch (error) {
      console.log(chalk.yellow(`⚠ Could not list directory contents: ${error.message}`));
    }
    
    // Use forward slashes for glob patterns, even on Windows
    const normalizedDir = dir.replace(/\\/g, '/');
    const pattern = `${normalizedDir}/**/*.{jpg,jpeg,png,webp,svg}`;
    
    console.log(chalk.cyan(`\n🔍 Search pattern: "${pattern}"`));
    console.log(chalk.blue('Glob pattern details:'));
    console.log(`- Base directory: ${path.resolve(dir)}`);
    console.log(`- Pattern: ${pattern}`);
    console.log(`- Skip patterns: ${JSON.stringify(CONFIG.imageSettings.skipPatterns)}`);
    
    // Use a try-catch to get more detailed error information
    let files = [];
    try {
      console.log(chalk.cyan('\n🔎 Running glob search...'));
      
      // Try with the default options first
      files = await glob.glob(pattern, {
        nodir: true,
        ignore: CONFIG.imageSettings.skipPatterns,
        absolute: true,
        cwd: path.resolve('.'), // Use project root as cwd
        windowsPathsNoEscape: true, // Handle Windows paths correctly
      });
      
      console.log(chalk.cyan('Glob search completed. Checking results...'));
      
      console.log(chalk.green(`✅ Found ${files.length} images in ${dir}`));
      if (files.length > 0) {
        console.log(chalk.cyan('📄 Files found:'));
        files.forEach((file, index) => console.log(`  ${index + 1}. ${file}`));
      } else {
        console.log(chalk.yellow('ℹ No image files found matching the pattern'));
      }
    } catch (error) {
      console.error(chalk.red('❌ Error during glob search:'), error);
      console.log(chalk.yellow('Trying alternative glob pattern...'));
      
      // Try a simpler pattern as fallback
      try {
        const altPattern = path.join(dir, '**/*.svg'); // Just look for SVGs
        files = await glob.glob(altPattern, {
          nodir: true,
          absolute: true,
          cwd: path.resolve(dir),
        });
        console.log(chalk.yellow(`Found ${files.length} files with alternative pattern`));
      } catch (e) {
        console.error(chalk.red('❌ Alternative pattern also failed:'), e);
      }
    }
    
    const results = [];
  
    for (const file of files) {
      const fileResults = await optimizeImage(file, CONFIG.outputDir);
      results.push(...fileResults);
    }
    
    return results;
  } catch (error) {
    console.error(chalk.red(`Error processing directory ${dir}:`), error);
    return [];
  }
}

// Generate a manifest file with all optimized images
async function generateManifest(results) {
  const manifest = {
    generated: new Date().toISOString(),
    images: results.map(result => ({
      original: result.original,
      optimized: result.optimized,
      format: result.format,
      size: result.size,
      originalSize: result.originalSize,
      optimizedSize: result.optimizedSize,
      savings: result.savings,
    })),
  };
  
  const manifestPath = path.join(CONFIG.outputDir, 'manifest.json');
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(chalk.green(`\nGenerated manifest: ${path.relative(process.cwd(), manifestPath)}`));
  
  return manifestPath;
}

// Main function
async function main() {
  console.log(chalk.cyan('Starting image optimization...\n'));
  
  // Process each source directory
  const allResults = [];
  
  for (const dir of CONFIG.srcDirs) {
    try {
      console.log(chalk.cyan(`\nProcessing directory: ${dir}`));
      const stats = await fs.stat(dir);
      
      if (!stats.isDirectory()) {
        console.log(chalk.yellow(`Skipping (not a directory): ${dir}`));
        continue;
      }
      
      const results = await processDirectory(dir);
      allResults.push(...results);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(chalk.yellow(`Directory not found: ${dir}`));
      } else {
        console.error(chalk.red(`Error processing directory ${dir}:`), error);
      }
    }
  }
  
  // Generate manifest file
  if (allResults.length > 0) {
    await generateManifest(allResults);
    
    // Print summary
    const totalOriginalSize = allResults.reduce((sum, r) => sum + (r.originalSize || 0), 0);
    const totalOptimizedSize = allResults.reduce((sum, r) => sum + (r.optimizedSize || 0), 0);
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log(chalk.cyan('\nOptimization complete!'));
    console.log(chalk.cyan(`Total images processed: ${allResults.length}`));
    console.log(chalk.cyan(`Total original size: ${(totalOriginalSize / 1024).toFixed(1)}KB`));
    console.log(chalk.cyan(`Total optimized size: ${(totalOptimizedSize / 1024).toFixed(1)}KB`));
    console.log(chalk.green(`Total savings: ${totalSavings}%`));
  } else {
    console.log(chalk.yellow('No images were processed.'));
  }
}

// Run the script
main().catch(error => {
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});
