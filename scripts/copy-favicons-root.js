const fs = require('fs');
const path = require('path');

// List of favicon files to copy from favicons directory to root
const faviconFiles = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'safari-pinned-tab.svg',
  'browserconfig.xml',
  'site.webmanifest',
  'mstile-70x70.png',
  'mstile-144x144.png',
  'mstile-150x150.png',
  'mstile-310x310.png'
];

const srcDir = path.join(__dirname, '../public/favicons');
const destDir = path.join(__dirname, '../public');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy each file from favicons directory to root
faviconFiles.forEach(file => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to public directory`);
  } else {
    console.warn(`Warning: ${file} not found in favicons directory`);
  }
});

console.log('Favicon copy process completed!');
