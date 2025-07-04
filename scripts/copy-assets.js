const fs = require('fs-extra');
const path = require('path');

// Source and destination directories
const srcDir = path.join(__dirname, '../public');
const destDir = path.join(__dirname, '../dist');

// Files to exclude from copying
const EXCLUDED_FILES = ['sw.js'];

// Ensure destination directory exists
fs.ensureDirSync(destDir);

// Function to filter out excluded files
const filterFunc = (src) => {
  const fileName = path.basename(src);
  return !EXCLUDED_FILES.includes(fileName);
};

// Copy files from public to dist, excluding service worker
fs.copySync(srcDir, destDir, { 
  overwrite: true,
  filter: filterFunc
});

console.log('Static assets copied successfully! (Excluded service worker)');
