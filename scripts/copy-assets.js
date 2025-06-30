const fs = require('fs-extra');
const path = require('path');

const copyAssets = async () => {
  try {
    const srcDir = path.join(__dirname, '../public');
    const destDir = path.join(__dirname, '../dist');
    
    // Ensure destination directory exists
    await fs.ensureDir(destDir);
    
    // Copy all files from public to dist
    await fs.copy(srcDir, destDir, {
      overwrite: true,
      errorOnExist: false,
      preserveTimestamps: true,
    });
    
    console.log('Assets copied successfully!');
  } catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
  }
};

copyAssets();
