const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

async function copyFavicons() {
  try {
    const faviconFiles = [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'safari-pinned-tab.svg',
      'site.webmanifest',
      'browserconfig.xml'
    ];

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Copy each file to the public directory
    for (const file of faviconFiles) {
      const sourcePath = path.join(process.cwd(), 'public', 'favicons', file);
      const destPath = path.join(publicDir, file);
      
      try {
        await copyFile(sourcePath, destPath);
        console.log(`Copied ${file} to public directory`);
      } catch (err) {
        console.warn(`Could not copy ${file}: ${err.message}`);
      }
    }

    console.log('Favicon copy process completed');
  } catch (err) {
    console.error('Error copying favicon files:', err);
    process.exit(1);
  }
}

// Run the copy function
copyFavicons();
