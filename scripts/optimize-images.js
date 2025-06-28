const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

const QUALITY = 80;
const SIZES = [1, 2, 3]; // For responsive images
const SOURCE_DIR = 'public/images';
const DEST_DIR = 'public/optimized-images';

async function optimizeImage(filePath) {
  try {
    const parsedPath = path.parse(filePath);
    const relativePath = path.relative(SOURCE_DIR, parsedPath.dir);
    const destDir = path.join(DEST_DIR, relativePath);
    
    await fs.mkdir(destDir, { recursive: true });
    
    // Process original size with different formats
    await Promise.all([
      // WebP
      sharp(filePath)
        .webp({ quality: QUALITY })
        .toFile(path.join(destDir, `${parsedPath.name}.webp`)),
      
      // AVIF
      sharp(filePath)
        .avif({ quality: QUALITY })
        .toFile(path.join(destDir, `${parsedPath.name}.avif`)),
      
      // Original format (optimized)
      sharp(filePath)
        .jpeg({ quality: QUALITY })
        .toFile(path.join(destDir, `${parsedPath.name}${parsedPath.ext}`))
    ]);
    
    // Process responsive sizes
    for (const size of SIZES) {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      const width = Math.round(metadata.width * size);
      
      await Promise.all([
        // WebP
        image
          .clone()
          .resize({ width })
          .webp({ quality: QUALITY })
          .toFile(path.join(destDir, `${parsedPath.name}@${size}x.webp`)),
        
        // AVIF
        image
          .clone()
          .resize({ width })
          .avif({ quality: QUALITY })
          .toFile(path.join(destDir, `${parsedPath.name}@${size}x.avif`)),
        
        // Original format
        image
          .clone()
          .resize({ width })
          .jpeg({ quality: QUALITY })
          .toFile(path.join(destDir, `${parsedPath.name}@${size}x${parsedPath.ext}`))
      ]);
    }
    
    console.log(`✅ Optimized: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error);
  }
}

async function optimizeAllImages() {
  try {
    console.log('🚀 Starting image optimization...');
    
    // Get all image files
    const files = await glob(`${SOURCE_DIR}/**/*.{jpg,jpeg,png,webp}`);
    console.log(`📁 Found ${files.length} images to optimize`);
    
    // Process all images in parallel with limited concurrency
    const BATCH_SIZE = 5;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(optimizeImage));
    }
    
    console.log('🎉 Image optimization completed!');
  } catch (error) {
    console.error('❌ Error during image optimization:', error);
    process.exit(1);
  }
}

optimizeAllImages();
