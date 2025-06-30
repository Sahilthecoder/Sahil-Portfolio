const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../public');
const destDir = path.join(__dirname, '../dist');

// Copy public directory to dist
fs.copySync(sourceDir, destDir, {
  dereference: true,
  filter: (src) => {
    // Don't copy index.html as it's handled by Vite
    return !src.endsWith('index.html');
  }
});

console.log('Copied public files to dist directory');
