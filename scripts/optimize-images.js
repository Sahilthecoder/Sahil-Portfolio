const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

async function optimizeImage(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;

    // Define target sizes
    const targetSizes = [
      { width: 1200, quality: 70 }, // Large
      { width: 600, quality: 60 },  // Medium
      { width: 300, quality: 50 }   // Small
    ];

    // Create optimized versions
    for (const size of targetSizes) {
      if (width > size.width) {
        const optimizedPath = `${filePath.replace(/\.[^/.]+$/, '')}-${size.width}w.webp`;
        await sharp(filePath)
          .resize(size.width, null, { fit: 'inside' })
          .webp({ quality: size.quality })
          .toFile(optimizedPath);
        console.log(`Optimized: ${optimizedPath}`);
      }
    }

    // Convert to WebP if not already
    if (!filePath.endsWith('.webp')) {
      const webpPath = `${filePath.replace(/\.[^/.]+$/, '')}.webp`;
      await sharp(filePath)
        .webp({ quality: 70 })
        .toFile(webpPath);
      console.log(`Converted to WebP: ${webpPath}`);
    }

  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function processDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await processDirectory(filePath);
      } else if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          await optimizeImage(filePath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Start optimization
processDirectory(imagesDir)
  .then(() => console.log('Image optimization complete'))
  .catch(error => console.error('Error:', error));
