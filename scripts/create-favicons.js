const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const config = {
  input: path.join('public', 'images', 'logo512.png'),
  outputDir: path.join('public', 'favicons'),
  sizes: [16, 32, 48, 64, 96, 128, 192, 256, 384, 512],
  appleIconSizes: [57, 60, 72, 76, 114, 120, 144, 152, 180],
  msTileSizes: [70, 144, 150, 310],
  safariPinnedTab: { width: 160, height: 160 },
  faviconIcoSizes: [16, 24, 32, 48, 64],
  background: { r: 255, g: 255, b: 255, alpha: 0 },
  themeColor: '#2563eb',
  appName: 'Sahil Ali - Portfolio',
  appShortName: 'Sahil Ali',
  appDescription: 'Data Analyst and Inventory Specialist',
  developerName: 'Sahil Ali',
  developerURL: 'https://sahilthecoder.github.io/Sahil-Portfolio',
  dir: 'auto',
  lang: 'en-US',
  background_color: '#ffffff',
  theme_color: '#2563eb',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/Sahil-Portfolio/',
  start_url: '/Sahil-Portfolio/',
  version: '1.0',
};

// Ensure output directory exists
fs.ensureDirSync(config.outputDir);

// Generate favicon.ico with a single size (32x32) since Sharp doesn't support multi-size ICO
async function generateFaviconIco() {
  try {
    const icoPath = path.join(config.outputDir, 'favicon.ico');
    
    // Create a simple 32x32 favicon.ico
    await sharp(config.input)
      .resize(32, 32)
      .toFile(icoPath);
    
    console.log(`✅ Generated: ${icoPath}`);
  } catch (error) {
    console.warn('⚠️ Could not generate favicon.ico. Using a fallback approach.');
    // Copy a pre-generated favicon.ico if available
    const fallbackFavicon = path.join('public', 'favicon.ico');
    if (fs.existsSync(fallbackFavicon)) {
      fs.copyFileSync(fallbackFavicon, path.join(config.outputDir, 'favicon.ico'));
      console.log('✅ Copied fallback favicon.ico');
    } else {
      console.warn('⚠️ No fallback favicon.ico found. Some browsers may show a 404 for favicon.ico');
    }
  }
}

// Generate PNG icons
async function generatePngIcons() {
  const sizes = [...new Set([...config.sizes, ...config.appleIconSizes, ...config.msTileSizes])];
  
  await Promise.all(sizes.map(async size => {
    const outputPath = path.join(config.outputDir, `favicon-${size}x${size}.png`);
    await sharp(config.input)
      .resize(size, size)
      .toFile(outputPath);
    console.log(`✅ Generated: ${outputPath}`);
  }));
}

// Generate Apple touch icons
async function generateAppleTouchIcons() {
  await Promise.all(config.appleIconSizes.map(async size => {
    const outputPath = path.join(config.outputDir, `apple-touch-icon-${size}x${size}.png`);
    await sharp(config.input)
      .resize(size, size)
      .toFile(outputPath);
    console.log(`✅ Generated: ${outputPath}`);
  }));
  
  // Default apple-touch-icon.png (180x180)
  const defaultAppleIcon = path.join(config.outputDir, 'apple-touch-icon.png');
  await sharp(config.input)
    .resize(180, 180)
    .toFile(defaultAppleIcon);
  console.log(`✅ Generated: ${defaultAppleIcon}`);
}

// Generate Microsoft tiles
async function generateMSTiles() {
  await Promise.all(config.msTileSizes.map(async size => {
    const outputPath = path.join(config.outputDir, `mstile-${size}x${size}.png`);
    await sharp(config.input)
      .resize(size, size)
      .toFile(outputPath);
    console.log(`✅ Generated: ${outputPath}`);
  }));
}

// Generate Safari pinned tab SVG
async function generateSafariPinnedTab() {
  const svgContent = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
     width="${config.safariPinnedTab.width}" height="${config.safariPinnedTab.height}" 
     viewBox="0 0 ${config.safariPinnedTab.width} ${config.safariPinnedTab.height}">
  <rect width="100%" height="100%" fill="${config.themeColor}" />
  <text x="50%" y="50%" 
        font-family="Arial, sans-serif" 
        font-size="80" 
        font-weight="bold" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="#ffffff">
    SA
  </text>
</svg>`;
  
  const outputPath = path.join(config.outputDir, 'safari-pinned-tab.svg');
  await fs.writeFile(outputPath, svgContent);
  console.log(`✅ Generated: ${outputPath}`);
}

// Generate browserconfig.xml
async function generateBrowserConfig() {
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/Sahil-Portfolio/favicons/mstile-70x70.png"/>
      <square150x150logo src="/Sahil-Portfolio/favicons/mstile-150x150.png"/>
      <square310x310logo src="/Sahil-Portfolio/favicons/mstile-310x310.png"/>
      <TileColor>${config.themeColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  
  const outputPath = path.join('public', 'browserconfig.xml');
  await fs.writeFile(outputPath, browserConfig);
  console.log(`✅ Generated: ${outputPath}`);
}

// Generate site.webmanifest
async function generateWebManifest() {
  const manifest = {
    name: config.appName,
    short_name: config.appShortName,
    description: config.appDescription,
    start_url: config.start_url,
    display: config.display,
    orientation: config.orientation,
    background_color: config.background_color,
    theme_color: config.theme_color,
    icons: [
      {
        src: "/Sahil-Portfolio/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/Sahil-Portfolio/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  
  const outputPath = path.join('public', 'site.webmanifest');
  await fs.writeJson(outputPath, manifest, { spaces: 2 });
  console.log(`✅ Generated: ${outputPath}`);
}

// Main function
async function generateFavicons() {
  try {
    console.log('🚀 Starting favicon generation...');
    
    await Promise.all([
      generateFaviconIco(),
      generatePngIcons(),
      generateAppleTouchIcons(),
      generateMSTiles(),
      generateSafariPinnedTab(),
      generateBrowserConfig(),
      generateWebManifest()
    ]);
    
    console.log('\n🎉 All favicons generated successfully!');
    console.log('📁 Output directory:', path.resolve(config.outputDir));
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

// Run the generator
generateFavicons();
