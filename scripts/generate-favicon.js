const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { createCanvas } = require('canvas');

// Configuration
const OUTPUT_DIR = 'public';
const ICON_SIZES = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];
const FAVICON_SIZES = [16, 32, 48, 64];
const APPLE_ICON_SIZES = [60, 76, 120, 152, 167, 180, 192];
const MS_TILE_SIZES = [70, 144, 150, 310];

// Primary color for the icon background
const PRIMARY_COLOR = '#2563eb';

// Create output directory if it doesn't exist
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

// Generate a simple icon with a letter
async function generateIcon(letter, size, backgroundColor, textColor = '#ffffff') {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);
  
  // Draw letter
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Calculate font size (60% of icon size)
  const fontSize = Math.floor(size * 0.6);
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
  
  // Draw the first letter of the name
  ctx.fillText(letter, size / 2, size / 2);
  
  // Convert to buffer
  return canvas.toBuffer('image/png');
}

// Generate all icons
async function generateIcons() {
  try {
    await ensureDir(OUTPUT_DIR);
    
    console.log('Generating favicon and app icons...');
    
    // Generate standard favicon.ico with multiple sizes
    const faviconBuffers = [];
    for (const size of FAVICON_SIZES) {
      const buffer = await generateIcon('S', size, PRIMARY_COLOR);
      faviconBuffers.push({ size, buffer });
    }
    
    // Save favicon.ico
    const favicon = await sharp(faviconBuffers[0].buffer, { density: 1000 })
      .toFormat('ico')
      .toBuffer();
    await fs.writeFile(path.join(OUTPUT_DIR, 'favicon.ico'), favicon);
    console.log('✅ Generated favicon.ico');
    
    // Generate standard PNG icons
    for (const size of ICON_SIZES) {
      const buffer = await generateIcon('S', size, PRIMARY_COLOR);
      const filename = size <= 32 
        ? `favicon-${size}x${size}.png`
        : `android-chrome-${size}x${size}.png`;
      
      await sharp(buffer).toFile(path.join(OUTPUT_DIR, filename));
      console.log(`✅ Generated ${filename}`);
    }
    
    // Generate Apple Touch Icons
    for (const size of APPLE_ICON_SIZES) {
      const buffer = await generateIcon('S', size, PRIMARY_COLOR);
      const filename = size === 180 
        ? 'apple-touch-icon.png' 
        : `apple-touch-icon-${size}x${size}.png`;
      
      await sharp(buffer).toFile(path.join(OUTPUT_DIR, filename));
      console.log(`✅ Generated ${filename}`);
    }
    
    // Generate Microsoft Tile Icons
    for (const size of MS_TILE_SIZES) {
      const buffer = await generateIcon('S', size, PRIMARY_COLOR);
      const filename = `mstile-${size}x${size}.png`;
      
      await sharp(buffer).toFile(path.join(OUTPUT_DIR, filename));
      console.log(`✅ Generated ${filename}`);
    }
    
    // Generate Safari Pinned Tab SVG
    const svgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <rect width="16" height="16" fill="${PRIMARY_COLOR}" />
  <text x="8" y="12" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-weight="bold" font-size="12">S</text>
</svg>`;
    
    await fs.writeFile(path.join(OUTPUT_DIR, 'safari-pinned-tab.svg'), svgContent);
    console.log('✅ Generated safari-pinned-tab.svg');
    
    console.log('\n🎉 All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the generator
generateIcons();
