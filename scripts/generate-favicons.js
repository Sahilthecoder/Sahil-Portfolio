const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { toPng } = require('svg-to-img');

// Directories
const publicDir = path.join(__dirname, '../public');
const logoPath = path.join(publicDir, 'logo512.png');

// Sizes for different favicon types
const sizes = {
  favicon: [16, 32, 48],
  apple: [57, 60, 72, 76, 114, 120, 144, 152, 180],
  android: [192, 512],
  mstile: [70, 144, 150, 310]
};

// Ensure public directory exists
fs.ensureDirSync(publicDir);

// Create favicon.ico from logo512.png
async function generateFavicon() {
  try {
    // Create favicon.ico with multiple sizes
    const sharpIcon = sharp(logoPath);
    const png16 = await sharpIcon.resize(16, 16).toBuffer();
    const png32 = await sharpIcon.resize(32, 32).toBuffer();
    const png48 = await sharpIcon.resize(48, 48).toBuffer();
    
    // Save individual favicon sizes
    await sharp(png16).toFile(path.join(publicDir, 'favicon-16x16.png'));
    await sharp(png32).toFile(path.join(publicDir, 'favicon-32x32.png'));
    
    // Create favicon.ico with multiple sizes
    await sharp(logoPath, { density: 100 })
      .resize(16, 16)
      .toFile(path.join(publicDir, 'favicon.ico'));
      
    console.log('Generated favicon.ico and related files');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

// Generate Apple touch icons
async function generateAppleIcons() {
  try {
    for (const size of sizes.apple) {
      const outputPath = path.join(publicDir, `apple-touch-icon${size === 180 ? '' : `-${size}x${size}`}.png`);
      await sharp(logoPath)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated ${outputPath}`);
    }
  } catch (error) {
    console.error('Error generating Apple icons:', error);
  }
}

// Generate Android Chrome icons
async function generateAndroidIcons() {
  try {
    for (const size of sizes.android) {
      const outputPath = path.join(publicDir, `android-chrome-${size}x${size}.png`);
      await sharp(logoPath)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated ${outputPath}`);
    }
  } catch (error) {
    console.error('Error generating Android icons:', error);
  }
}

// Generate Microsoft Tile icons
async function generateMSTiles() {
  try {
    for (const size of sizes.mstile) {
      const outputPath = path.join(publicDir, `mstile-${size}x${size}.png`);
      await sharp(logoPath)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated ${outputPath}`);
    }
  } catch (error) {
    console.error('Error generating MS Tiles:', error);
  }
}

// Generate Safari Pinned Tab SVG
async function generateSafariPinnedTab() {
  try {
    const svgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path fill="#2563eb" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z"/>
</svg>`;
    
    await fs.writeFile(path.join(publicDir, 'safari-pinned-tab.svg'), svgContent);
    console.log('Generated safari-pinned-tab.svg');
  } catch (error) {
    console.error('Error generating Safari Pinned Tab SVG:', error);
  }
}

// Generate all favicon files
async function generateAll() {
  console.log('Starting favicon generation...');
  
  await generateFavicon();
  await generateAppleIcons();
  await generateAndroidIcons();
  await generateMSTiles();
  await generateSafariPinnedTab();
  
  console.log('Favicon generation complete!');
}

// Run the generation
if (require.main === module) {
  generateAll().catch(console.error);
}

module.exports = generateAll;
