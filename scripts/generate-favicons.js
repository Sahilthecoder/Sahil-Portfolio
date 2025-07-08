const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

// Configuration
const config = {
  input: 'public/images/logo-hd.png', // Path to your HD logo
  outputDir: 'public/images/favicons',
  sizes: [
    // Standard favicon
    { name: 'favicon.ico', size: 32 },
    
    // Apple touch icons
    { name: 'apple-touch-icon.png', size: 180 },
    
    // Android/Google
    { name: 'icon-192x192.png', size: 192 },
    { name: 'icon-256x256.png', size: 256 },
    { name: 'icon-384x384.png', size: 384 },
    { name: 'icon-512x512.png', size: 512 },
    
    // Microsoft Tiles
    { name: 'mstile-70x70.png', size: 70 },
    { name: 'mstile-144x144.png', size: 144 },
    { name: 'mstile-150x150.png', size: 150 },
    { name: 'mstile-310x150.png', width: 310, height: 150 },
    { name: 'mstile-310x310.png', size: 310 },
  ],
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Generate favicons
async function generateFavicons() {
  console.log('Generating favicons...');
  
  // Generate all sizes
  for (const icon of config.sizes) {
    const outputPath = path.join(config.outputDir, icon.name);
    const size = icon.size || { width: icon.width, height: icon.height };
    
    try {
      await sharp(config.input)
        .resize(size)
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error generating ${outputPath}:`, error);
    }
  }
  
  // Generate ICO file (special handling for .ico)
  try {
    const icoPath = path.join(config.outputDir, 'favicon.ico');
    await sharp(config.input)
      .resize(32)
      .toFile(icoPath);
    
    console.log(`✅ Generated: ${icoPath}`);
  } catch (error) {
    console.error('❌ Error generating favicon.ico:', error);
  }
  
  // Generate Safari Pinned Tab SVG
  try {
    const svgPath = path.join(config.outputDir, 'safari-pinned-tab.svg');
    const svgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#5bbad5"/>
  <text x="16" y="22" font-family="Arial" font-size="24" text-anchor="middle" fill="white">SA</text>
</svg>`;
    
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ Generated: ${svgPath}`);
  } catch (error) {
    console.error('❌ Error generating Safari pinned tab icon:', error);
  }
  
  // Generate browserconfig.xml
  try {
    const browserConfigPath = path.join('public', 'browserconfig.xml');
    const browserConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/images/favicons/mstile-70x70.png"/>
      <square150x150logo src="/images/favicons/mstile-150x150.png"/>
      <square310x310logo src="/images/favicons/mstile-310x310.png"/>
      <TileColor>#2d89ef</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    
    fs.writeFileSync(browserConfigPath, browserConfigContent);
    console.log(`✅ Generated: ${browserConfigPath}`);
  } catch (error) {
    console.error('❌ Error generating browserconfig.xml:', error);
  }
  
  // Generate site.webmanifest
  try {
    const manifestPath = path.join('public', 'site.webmanifest');
    const manifestContent = `{
  "name": "Sahil Ali - Portfolio",
  "short_name": "Sahil Ali",
  "icons": [
    {
      "src": "/images/favicons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/favicons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`;
    
    fs.writeFileSync(manifestPath, manifestContent);
    console.log(`✅ Generated: ${manifestPath}`);
  } catch (error) {
    console.error('❌ Error generating site.webmanifest:', error);
  }
  
  console.log('\n🎉 Favicon generation complete!');
}

// Run the generator
generateFavicons().catch(console.error);
