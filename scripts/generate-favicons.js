const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

// Favicon configurations
const faviconSizes = [
  // Standard favicon
  { name: 'favicon.ico', size: 32 },
  
  // Standard favicon sizes
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'favicon-48x48.png', width: 48, height: 48 },
  
  // Apple touch icons
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'apple-touch-icon-57x57.png', width: 57, height: 57 },
  { name: 'apple-touch-icon-60x60.png', width: 60, height: 60 },
  { name: 'apple-touch-icon-72x72.png', width: 72, height: 72 },
  { name: 'apple-touch-icon-76x76.png', width: 76, height: 76 },
  { name: 'apple-touch-icon-114x114.png', width: 114, height: 114 },
  { name: 'apple-touch-icon-120x120.png', width: 120, height: 120 },
  { name: 'apple-touch-icon-144x144.png', width: 144, height: 144 },
  { name: 'apple-touch-icon-152x152.png', width: 152, height: 152 },
  
  // Android Chrome icons
  { name: 'android-chrome-192x192.png', width: 192, height: 192 },
  { name: 'android-chrome-512x512.png', width: 512, height: 512 },
  
  // Microsoft Tiles
  { name: 'mstile-70x70.png', width: 70, height: 70 },
  { name: 'mstile-144x144.png', width: 144, height: 144 },
  { name: 'mstile-150x150.png', width: 150, height: 150 },
  { name: 'mstile-310x310.png', width: 310, height: 310 },
  
  // Safari Pinned Tab
  { name: 'safari-pinned-tab.svg', width: 16, height: 16 } // Note: This will be a placeholder, SVG needs special handling
];

async function ensureDirectoryExists(dir) {
  if (!await exists(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function generateFavicons() {
  try {
    // Define paths
    const sourceLogo = path.join(__dirname, '../public/logo/logo.png'); // Source high-res logo
    const faviconsDir = path.join(__dirname, '../public/favicons');
    
    // Ensure directories exist
    await ensureDirectoryExists(faviconsDir);
    
    // Check if source logo exists
    if (!await exists(sourceLogo)) {
      throw new Error(`Source logo not found at: ${sourceLogo}\nPlease place your high-resolution logo (at least 512x512px) at this location.`);
    }
    
    console.log('🚀 Starting favicon generation...');
    console.log(`📁 Source logo: ${sourceLogo}`);
    console.log(`📁 Output directory: ${faviconsDir}\n`);
    
    // Generate each favicon size
    for (const { name, width, height, size } of faviconSizes) {
      const outputPath = path.join(faviconsDir, name);
      
      // Special handling for .ico files
      if (name.endsWith('.ico')) {
        await sharp(sourceLogo)
          .resize(size || 32, size || 32)
          .toFile(outputPath);
      } 
      // Special handling for SVG (just copy a placeholder for now)
      else if (name.endsWith('.svg')) {
        const svgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#3b82f6"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${width / 4}" text-anchor="middle" dy=".3em" fill="white">S</text>
</svg>`;
        fs.writeFileSync(outputPath, svgContent);
      }
      // Generate PNGs
      else {
        await sharp(sourceLogo)
          .resize(width, height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .toFile(outputPath);
      }
      
      console.log(`✅ Generated: ${name} (${width || size}x${height || size}px)`);
    }
    
    // Create browserconfig.xml
    const browserConfigPath = path.join(faviconsDir, 'browserconfig.xml');
    const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <TileColor>#3b82f6</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
    
    fs.writeFileSync(browserConfigPath, browserConfig);
    console.log('✅ Generated: browserconfig.xml');
    
    // Create site.webmanifest
    const manifestPath = path.join(faviconsDir, 'site.webmanifest');
    const manifest = {
      name: "Sahil's Portfolio",
      short_name: "Sahil",
      description: "Personal portfolio of Sahil Ali - Full Stack Developer",
      start_url: "/Sahil-Portfolio/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#3b82f6",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png"
        },
        {
          src: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png"
        }
      ]
    };
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Generated: site.webmanifest');
    
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
