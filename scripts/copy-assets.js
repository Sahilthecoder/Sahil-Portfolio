const fs = require('fs-extra');
const path = require('path');

// Source and destination directories
const srcDir = path.join(__dirname, '../public');
const destDir = path.join(__dirname, '../dist');

// Ensure destination directory exists
fs.ensureDirSync(destDir);

// Copy all files from public to dist
fs.copySync(srcDir, destDir, { overwrite: true });

console.log('Static assets copied successfully!');
