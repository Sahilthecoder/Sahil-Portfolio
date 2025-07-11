const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Source and output directories
const sourceImage = path.join(__dirname, '../public/favicon-512x512.png');
const outputDir = path.join(__dirname, '../public');

// Create favicons directory if it doesn't exist
const faviconsDir = path.join(outputDir, 'favicons');
if (!fs.existsSync(faviconsDir)) {
  fs.mkdirSync(faviconsDir, { recursive: true });
}

// Simple favicon generation
async function generateFavicons() {
  try {
    console.log('🚀 Starting favicon generation...');
    
    // Check if source image exists
    if (!fs.existsSync(sourceImage)) {
      throw new Error(`Source favicon not found at: ${sourceImage}`);
    }

    // Generate favicon.ico (32x32) - place in root public directory
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log('✅ Generated favicon.ico (32x32)');

    // Generate favicon-16x16.png - place in favicons directory
    await sharp(sourceImage)
      .resize(16, 16)
      .toFile(path.join(faviconsDir, 'favicon-16x16.png'));
    console.log('✅ Generated favicon-16x16.png');

    // Generate favicon-32x32.png - place in favicons directory
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(faviconsDir, 'favicon-32x32.png'));
    console.log('✅ Generated favicon-32x32.png');

    // Generate apple-touch-icon.png - place in root public directory
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ Generated apple-touch-icon.png');

    // Generate android-chrome-192x192.png - place in favicons directory
    await sharp(sourceImage)
      .resize(192, 192)
      .toFile(path.join(faviconsDir, 'android-chrome-192x192.png'));
    console.log('✅ Generated android-chrome-192x192.png');

    // Generate android-chrome-512x512.png (copy the source) - place in favicons directory
    fs.copyFileSync(sourceImage, path.join(faviconsDir, 'android-chrome-512x512.png'));
    console.log('✅ Copied android-chrome-512x512.png');

    // Generate mstile-150x150.png - place in favicons directory
    await sharp(sourceImage)
      .resize(150, 150)
      .toFile(path.join(faviconsDir, 'mstile-150x150.png'));
    console.log('✅ Generated mstile-150x150.png');

    // Create a simple browserconfig.xml - place in root public directory
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/favicons/mstile-150x150.png"/>
      <TileColor>#ffffff</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    
    fs.writeFileSync(path.join(outputDir, 'browserconfig.xml'), browserConfig);
    console.log('✅ Generated browserconfig.xml');
    
    // Create a simple site.webmanifest - place in root public directory
    const manifest = {
      name: 'Sahil Portfolio',
      short_name: 'Sahil',
      start_url: '/Sahil-Portfolio/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#3b82f6',
      icons: [
        {
          src: '/favicons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/favicons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    };
    
    fs.writeFileSync(path.join(outputDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
    console.log('✅ Generated site.webmanifest');
    
    console.log('\n🎉 Successfully generated all favicon files!');
    console.log('📁 Files saved to:', faviconsDir);
    console.log('\nNext steps:');
    console.log('1. Run `npm run copy-favicons` to copy favicons to the public directory');
    console.log('2. Update your HTML with the appropriate favicon references');
    
  } catch (error) {
    console.error('\n❌ Error generating favicon files:', error.message);
    if (error.message.includes('Source logo not found')) {
      console.log('\n💡 Please ensure you have a high-resolution logo (at least 512x512px) at:');
      console.log('   public/logo/logo.png');
      console.log('\nYou can replace this file with your own logo and run the script again.');
    }
    process.exit(1);
  }
}

// Run the generator
generateFavicons();
