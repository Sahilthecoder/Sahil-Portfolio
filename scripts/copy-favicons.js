const fs = require('fs-extra');
const path = require('path');

const faviconFiles = [
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
  'site.webmanifest',
  'browserconfig.xml'
];

const srcDir = path.join(__dirname, '..', 'public');
const destDir = path.join(__dirname, '..', 'dist');

// Ensure dist directory exists
fs.ensureDirSync(destDir);

// Copy each favicon file to the root of the dist directory
faviconFiles.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} to dist directory`);
  } else {
    console.warn(`Warning: ${file} not found in public directory`);
  }
});

console.log('Favicon files copied successfully!');
