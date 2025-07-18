const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { gzip } = require('zlib');
const { promisify: p } = require('util');
const gzipPromise = p(gzip);

// Configuration
const CONFIG = {
  // Base path for GitHub Pages
  basePath: '/Sahil-Portfolio',
  // Input directory for original images
  inputDir: path.join(__dirname, '../public/images'),
  // Output directory for optimized images
  outputDir: path.join(__dirname, '../public/optimized-images'),
  // Public path where images will be served from
  publicPath: '/Sahil-Portfolio/optimized-images',
  // Image optimization settings
  targetSizes: [
    { width: 1920, quality: 80, suffix: '-xl' },  // Extra large
    { width: 1280, quality: 75, suffix: '-lg' },  // Large
    { width: 800, quality: 70, suffix: '-md' },   // Medium
    { width: 400, quality: 65, suffix: '-sm' }    // Small
  ],
  // Output formats
  formats: ['webp', 'avif'],
  // Skip existing files
  skipExisting: true,
  // Number of parallel processes
  parallel: 4
};

// Create optimized versions of an image
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, ext);
    const dirName = path.dirname(filePath);
    const relativePath = path.relative(CONFIG.inputDir, dirName);
    const outputDir = path.join(CONFIG.outputDir, relativePath);
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    const metadata = await sharp(filePath).metadata();
    
    // Process each target size and format
    const processQueue = [];
    
    for (const format of CONFIG.formats) {
      for (const size of CONFIG.targetSizes) {
        if (metadata.width > size.width) {
          const outputPath = path.join(
            outputDir,
            `${baseName}${size.suffix}.${format}`
          );
          
          // Skip if file exists and skipExisting is true
          if (CONFIG.skipExisting) {
            try {
              await fs.access(outputPath);
              console.log(`Skipping (exists): ${outputPath}`);
              continue;
            } catch (e) {
              // File doesn't exist, proceed with optimization
            }
          }
          
          processQueue.push(
            sharp(filePath)
              .resize(size.width, null, { 
                fit: 'inside',
                withoutEnlargement: true 
              })
              [format]({ 
                quality: size.quality,
                effort: 6 // Higher effort = better compression but slower
              })
              .toFile(outputPath)
              .then(() => {
                console.log(`Created: ${outputPath}`);
                return outputPath;
              })
          );
        }
      }
    }
    
    // Process all optimizations in parallel
    return Promise.all(processQueue);
    
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
    throw error;
  }
}

// Process all images in directory
async function processImages() {
  try {
    console.log('Starting image optimization...');
    
    // Find all image files
    const files = await glob(`${CONFIG.inputDir}/**/*.{jpg,jpeg,png,webp}`, { 
      nodir: true,
      ignore: '**/optimized-images/**'
    });
    
    console.log(`Found ${files.length} images to process`);
    
    // Process images in chunks to avoid memory issues
    const chunkSize = CONFIG.parallel;
    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize);
      await Promise.all(chunk.map(file => optimizeImage(file)));
    }
    
    console.log('Image optimization complete!');
    
  } catch (error) {
    console.error('Error during image processing:', error);
    process.exit(1);
  }
}

// Process a directory recursively
async function processDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await processDirectory(filePath);
      } else if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          console.log(`Processing: ${filePath}`);
          await optimizeImage(filePath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
    throw error;
  }
}

// Generate a manifest file with all optimized images and their paths
async function generateManifest() {
  try {
    const manifest = {
      basePath: CONFIG.basePath,
      publicPath: CONFIG.publicPath,
      images: []
    };
    
    // Find all optimized images
    const files = await glob(`${CONFIG.outputDir}/**/*.{webp,avif}`, { nodir: true });
    
    // Add each image to the manifest with its public URL
    for (const file of files) {
      const relativePath = path.relative(CONFIG.outputDir, file);
      const publicUrl = `${CONFIG.publicPath}/${relativePath.replace(/\\/g, '/')}`;
      manifest.images.push({
        original: path.relative(CONFIG.inputDir, file.replace(/-\w+\.[a-z]+$/, path.extname(file))),
        optimized: relativePath,
        url: publicUrl
      });
    }
    
    // Write manifest file
    const manifestPath = path.join(__dirname, '../src/utils/image-manifest.json');
    await fs.mkdir(path.dirname(manifestPath), { recursive: true });
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Generated image manifest at: ${manifestPath}`);
    
    return manifest;
  } catch (error) {
    console.error('Error generating image manifest:', error);
    throw error;
  }
}

// Run the optimization
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Main function to run the optimization
async function main() {
  try {
    console.log('Starting image optimization...');
    console.log(`Input directory: ${CONFIG.inputDir}`);
    console.log(`Output directory: ${CONFIG.outputDir}`);
    
    // Process all images
    await processDirectory(CONFIG.inputDir);
    
    // Generate manifest file
    await generateManifest();
    
    console.log('Image optimization complete!');
    console.log(`Optimized images are available at: ${CONFIG.publicPath}`);
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the optimization process
main();
