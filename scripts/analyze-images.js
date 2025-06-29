#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const imageSize = require('image-size');
const chalk = require('chalk');
const filesize = require('filesize');
const Table = require('cli-table3');

// Simple spinner implementation since we're having issues with ora
class SimpleSpinner {
  constructor(text = '') {
    this.text = text;
    this.spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.interval = null;
    this.i = 0;
  }

  start() {
    process.stdout.write(`\r${this.spinner[this.i]} ${this.text}`);
    this.interval = setInterval(() => {
      this.i = (this.i + 1) % this.spinner.length;
      process.stdout.write(`\r${this.spinner[this.i]} ${this.text}`);
    }, 100);
    return this;
  }

  succeed(text) {
    this.stop();
    console.log(`\r✅ ${text || this.text}`);
  }

  fail(text) {
    this.stop();
    console.error(`\r❌ ${text || this.text}`);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    process.stdout.write('\r' + ' '.repeat(process.stdout.columns) + '\r');
  }
}

// Use SimpleSpinner instead of ora
const spinner = new SimpleSpinner('Analyzing images...').start();

// Configuration
const IMAGE_DIRS = ['public', 'public/images']; // Check both root and images directory
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
const MAX_IMAGE_SIZE = 1024 * 200; // 200KB
const OPTIMAL_WIDTH = 1920; // Max recommended width for full-width images
const IGNORED_FILES = ['favicon.ico', 'favicon.svg'];
const IGNORED_PATTERNS = [/\/node_modules\//, /\/optimized-images\//]; // Ignore node_modules and optimized-images

// Initialize spinner (using our SimpleSpinner)

// Results storage
const results = {
  totalImages: 0,
  totalSize: 0,
  oversizedImages: [],
  unoptimizedImages: [],
  missingAltText: [],
  legacyFormats: [],
  potentialWebP: [],
  potentialAVIF: [],
  allImages: []
};

// Format bytes to human-readable string
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Check if an image is in a legacy format
function isLegacyFormat(filename) {
  const ext = path.extname(filename).toLowerCase().slice(1);
  return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
}

// Check if an image could be converted to WebP
function canConvertToWebP(filename) {
  const ext = path.extname(filename).toLowerCase().slice(1);
  return ['jpg', 'jpeg', 'png'].includes(ext);
}

// Check if an image could be converted to AVIF
function canConvertToAVIF(filename) {
  const ext = path.extname(filename).toLowerCase().slice(1);
  return ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
}

// Analyze a single image file
async function analyzeImage(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const relativePath = path.relative(process.cwd(), filePath);
    const ext = path.extname(filePath).toLowerCase().slice(1);
    const size = stats.size;
    
    // Get image dimensions
    const dimensions = imageSize(filePath);
    const { width, height } = dimensions;
    
    // Create image info object
    const imageInfo = {
      path: relativePath,
      size,
      formattedSize: formatBytes(size),
      width,
      height,
      ext,
      isOversized: size > MAX_IMAGE_SIZE,
      isWider: width > OPTIMAL_WIDTH,
      isLegacy: isLegacyFormat(filePath),
      canConvertToWebP: canConvertToWebP(filePath),
      canConvertToAVIF: canConvertToAVIF(filePath),
      altText: null, // This would require parsing HTML/JSX to determine
      potentialSavings: 0,
      potentialFormat: null
    };
    
    // Calculate potential savings
    if (imageInfo.isLegacy) {
      // Estimate 30% savings for WebP, 50% for AVIF
      imageInfo.potentialSavings = Math.round(size * 0.5);
      imageInfo.potentialFormat = 'AVIF';
    }
    
    // Update results
    results.totalImages++;
    results.totalSize += size;
    results.allImages.push(imageInfo);
    
    if (imageInfo.isOversized) {
      results.oversizedImages.push(imageInfo);
    }
    
    if (imageInfo.isLegacy) {
      results.legacyFormats.push(imageInfo);
    }
    
    if (imageInfo.canConvertToWebP) {
      results.potentialWebP.push(imageInfo);
    }
    
    if (imageInfo.canConvertToAVIF) {
      results.potentialAVIF.push(imageInfo);
    }
    
    return imageInfo;
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error);
    return null;
  }
}

// Generate a summary table
function generateSummaryTable() {
  const table = new Table({
    head: ['Metric', 'Count', 'Details'],
    style: { head: ['cyan'], border: ['gray'] }
  });
  
  table.push(
    ['Total Images', results.totalImages, formatBytes(results.totalSize)],
    ['Oversized (>200KB)', results.oversizedImages.length, formatBytes(results.oversizedImages.reduce((sum, img) => sum + img.size, 0))],
    ['Legacy Formats', results.legacyFormats.length, 'JPG, PNG, GIF'],
    ['Potentially Convertible to WebP', results.potentialWebP.length, formatBytes(results.potentialWebP.reduce((sum, img) => sum + img.size, 0))],
    ['Potentially Convertible to AVIF', results.potentialAVIF.length, formatBytes(results.potentialAVIF.reduce((sum, img) => sum + img.size, 0))],
    ['Potential Total Savings', '', formatBytes(results.allImages.reduce((sum, img) => sum + img.potentialSavings, 0))]
  );
  
  return table.toString();
}

// Generate detailed table for a specific category
function generateDetailTable(images, title, columns = []) {
  if (!images.length) return '';
  
  const table = new Table({
    head: ['Path', 'Size', 'Dimensions', 'Details'],
    style: { head: ['cyan'], border: ['gray'] },
    colWidths: [40, 12, 15, 30]
  });
  
  images.forEach(img => {
    const details = [];
    
    if (img.isOversized) details.push('Oversized');
    if (img.isWider) details.push(`Wide (${img.width}px)`);
    if (img.isLegacy) details.push('Legacy Format');
    if (img.potentialSavings > 0) details.push(`Save ${formatBytes(img.potentialSavings)}`);
    
    table.push([
      img.path.length > 35 ? '...' + img.path.slice(-35) : img.path,
      img.formattedSize,
      `${img.width}×${img.height}`,
      details.join(', ')
    ]);
  });
  
  return `\n${chalk.bold.underline(title)} (${images.length} images)\n${table.toString()}`;
}

// Main function
async function main() {
  try {
    // Find all image files in all directories
    const imageFiles = [];
    
    for (const dir of IMAGE_DIRS) {
      for (const ext of IMAGE_EXTENSIONS) {
        try {
          const pattern = `${dir}/**/*${ext}`;
          const files = await glob(pattern, { 
            nodir: true,
            ignore: ['**/node_modules/**', '**/optimized-images/**']
          });
          
          // Filter out ignored files and patterns
          const filteredFiles = files.filter(file => {
            const fileName = path.basename(file);
            const shouldIgnore = 
              IGNORED_FILES.includes(fileName) ||
              IGNORED_PATTERNS.some(pattern => pattern.test(file));
              
            if (shouldIgnore) {
              console.warn(`⚠️  Skipping ignored file: ${file}`);
              return false;
            }
            return true;
          });
          
          imageFiles.push(...filteredFiles);
        } catch (error) {
          console.warn(`⚠️  Error processing pattern ${dir}/**/*${ext}: ${error.message}`);
        }
      }
    }
    
    // Remove duplicates (in case files exist in multiple source dirs)
    const uniqueFiles = [...new Set(imageFiles)];
    
    if (uniqueFiles.length === 0) {
      console.warn('⚠️  No images found to analyze. Please check your IMAGE_DIRS configuration.');
      return { success: true, analyzed: 0, errors: 0 };
    }
    
    console.log(`🔍 Found ${uniqueFiles.length} images to analyze`);
    console.log('Searching in directories: ' + IMAGE_DIRS.join(', '));
    console.log('Supported extensions: ' + IMAGE_EXTENSIONS.join(', '));
    
    // Analyze all images
    for (const file of uniqueFiles) {
      await analyzeImage(file);
      spinner.text = `Analyzing images (${results.totalImages}/${uniqueFiles.length})`;
    }
    
    const successful = results.totalImages;
    const failed = uniqueFiles.length - successful;
    
    if (successful > 0) {
      spinner.succeed(`Analyzed ${successful} images${failed > 0 ? `, ${failed} failed` : ''}`);
    } else {
      spinner.fail('No images were successfully analyzed');
    }
    
    // Generate and display reports
    console.log('\n' + chalk.bold.cyan('📊 Image Analysis Report'));
    console.log('='.repeat(80));
    
    // Summary
    console.log('\n' + chalk.bold('📋 Summary'));
    console.log(generateSummaryTable());
    
    // Detailed reports
    if (results.oversizedImages.length > 0) {
      console.log(generateDetailTable(
        results.oversizedImages,
        '⚠️  Oversized Images (larger than 200KB)'
      ));
    }
    
    if (results.legacyFormats.length > 0) {
      console.log(generateDetailTable(
        results.legacyFormats,
        '🔄 Legacy Format Images (consider WebP/AVIF)'
      ));
    }
    
    // Recommendations
    console.log('\n' + chalk.bold.green('💡 Recommendations'));
    
    if (results.oversizedImages.length > 0) {
      console.log(`- Resize and compress ${results.oversizedImages.length} oversized images`);
    }
    
    if (results.legacyFormats.length > 0) {
      console.log(`- Convert ${results.legacyFormats.length} legacy format images to WebP/AVIF`);
      console.log(`  Potential savings: ${formatBytes(results.allImages.reduce((sum, img) => sum + img.potentialSavings, 0))}`);
    }
    
    if (results.potentialAVIF.length > 0) {
      console.log(`- Consider using AVIF format for ${results.potentialAVIF.length} images for better compression`);
    }
    
    console.log('\n' + chalk.bold.blue('🔧 Next Steps'));
    console.log('- Run the optimization script: npm run optimize-images');
    console.log('- Update image formats in your components to use .webp or .avif');
    console.log('- Use responsive images with srcset for different screen sizes');
    console.log('- Add appropriate width/height attributes to prevent layout shifts');
    console.log('- Consider using a CDN for image delivery');
    
  } catch (error) {
    spinner.fail('Error during image analysis');
    console.error(error);
    process.exit(1);
  }
}

// Run the analysis
main();
