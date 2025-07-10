const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const logoPath = path.join(__dirname, '../public/logo/apple-touch-icon.png');
  const outputDir = path.join(__dirname, '../public/logo');
  
  try {
    // Create mstile-144x144.png
    await sharp(logoPath)
      .resize(144, 144)
      .toFile(path.join(outputDir, 'mstile-144x144.png'));
    
    console.log('Successfully generated favicon files');
  } catch (error) {
    console.error('Error generating favicon files:', error);
  }
}

generateFavicons();
