const fs = require('fs-extra');
const path = require('path');

// Source and destination directories
const srcDir = path.join(__dirname, '../public');
const destDir = path.join(__dirname, '../dist');

// Files to copy
const filesToCopy = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'mstile-70x70.png',
  'mstile-144x144.png',
  'mstile-150x150.png',
  'mstile-310x150.png',
  'mstile-310x310.png',
  'safari-pinned-tab.svg',
  'browserconfig.xml',
  'site.webmanifest',
  'manifest.json',
  'logo192.png',
  'logo512.png',
  'screenshot-desktop.png',
  'screenshot-mobile.png'
];

// Ensure destination directory exists
fs.ensureDirSync(destDir);

// Copy each file
filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to dist/`);
  } else {
    console.warn(`Warning: ${file} not found in public/ directory`);
  }
});

console.log('Asset copy complete!');
