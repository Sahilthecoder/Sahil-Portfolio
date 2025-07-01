const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { optimize } = require('svgo');

const IMG_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/optimized-images');

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to WebP`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
}

async function optimizeSvg(inputPath) {
  try {
    const svgContent = await fs.readFile(inputPath, 'utf8');
    const result = optimize(svgContent, {
      path: inputPath,
      multipass: true,
    });
    
    const outputPath = path.join(
      OUTPUT_DIR,
      path.basename(inputPath)
    );
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, result.data);
    console.log(`Optimized ${inputPath}`);
  } catch (error) {
    console.error(`Error optimizing SVG ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      const relativePath = path.relative(IMG_DIR, fullPath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const webpPath = outputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        await convertToWebP(fullPath, webpPath);
      } else if (entry.name.endsWith('.svg')) {
        await optimizeSvg(fullPath);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

// Create a manifest file for optimized images
async function createManifest() {
  const manifest = {
    generated: new Date().toISOString(),
    images: []
  };
  
  // This would be populated with actual image references
  // to be used in the application
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Created image manifest');
}

// Run the conversion
(async () => {
  await processDirectory(IMG_DIR);
  await createManifest();
  console.log('Image optimization complete!');
})();
