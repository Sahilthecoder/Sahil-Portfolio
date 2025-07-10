const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const readdir = promisify(fs.readdir);

async function copyFavicons() {
  try {
    const faviconFiles = [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'safari-pinned-tab.svg',
      'browserconfig.xml',
      'favicon-192x192.png', // Changed from android-chrome-192x192.png
      'favicon-512x512.png', // Changed from android-chrome-512x512.png
      'mstile-150x150.png',
      'site.webmanifest'
    ];

    // Define source and target directories
    const rootDir = process.cwd();
    const faviconSourceDir = path.join(rootDir, 'public', 'favicons');
    const publicDir = path.join(rootDir, 'public');
    const distDir = path.join(rootDir, 'dist');

    // Ensure target directories exist
    for (const dir of [publicDir, distDir]) {
      if (!await exists(dir)) {
        await mkdir(dir, { recursive: true });
      }
    }

    // Copy each file to both public and dist directories
    for (const file of faviconFiles) {
      const sourcePath = path.join(faviconSourceDir, file);
      const publicDestPath = path.join(publicDir, file);
      const distDestPath = path.join(distDir, file);
      
      try {
        if (await exists(sourcePath)) {
          // Copy to public directory
          await copyFile(sourcePath, publicDestPath);
          console.log(`✅ Copied ${file} to public directory`);
          
          // Copy to dist directory
          await copyFile(sourcePath, distDestPath);
          console.log(`✅ Copied ${file} to dist directory`);
        } else {
          console.warn(`⚠️  Source file not found: ${sourcePath}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    }

    // Create or update site.webmanifest if it doesn't exist
    const manifestPath = path.join(publicDir, 'site.webmanifest');
    if (!await exists(manifestPath)) {
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
      
      // Write to both public and dist directories
      for (const dir of [publicDir, distDir]) {
        const targetPath = path.join(dir, 'site.webmanifest');
        fs.writeFileSync(targetPath, JSON.stringify(manifest, null, 2));
      }
      console.log('✅ Created/updated site.webmanifest');
    }

    // Create browserconfig.xml if it doesn't exist
    const browserConfigPath = path.join(publicDir, 'browserconfig.xml');
    if (!await exists(browserConfigPath)) {
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

      // Write to both public and dist directories
      for (const dir of [publicDir, distDir]) {
        const targetPath = path.join(dir, 'browserconfig.xml');
        fs.writeFileSync(targetPath, browserConfig);
      }
      console.log('✅ Created/updated browserconfig.xml');
    }

    console.log('\n🎉 Favicon copy process completed successfully!');
  } catch (err) {
    console.error('\n❌ Error in favicon copy process:', err);
    process.exit(1);
  }
}

// Run the copy function
copyFavicons().catch(console.error);
