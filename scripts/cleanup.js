const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));

// Directories to clean
const DIRS_TO_CLEAN = [
  'dist',
  '.cache',
  'node_modules/.vite',
  'public/optimized-images'
];

// Files to remove
const FILES_TO_REMOVE = [
  'yarn.lock',
  'package-lock.json',
  'pnpm-lock.yaml'
];

// Clean directories
async function cleanDirectories() {
  console.log('Cleaning directories...');
  for (const dir of DIRS_TO_CLEAN) {
    try {
      await rimraf(dir);
      console.log(`✓ Removed directory: ${dir}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error cleaning directory ${dir}:`, error);
      }
    }
  }
}

// Remove files
async function removeFiles() {
  console.log('\nRemoving files...');
  for (const file of FILES_TO_REMOVE) {
    try {
      await fs.unlink(file);
      console.log(`✓ Removed file: ${file}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error removing file ${file}:`, error);
      }
    }
  }
}

// Main function
async function main() {
  console.log('🚀 Starting project cleanup...\n');
  
  try {
    await cleanDirectories();
    await removeFiles();
    
    console.log('\n✨ Project cleanup completed successfully!');
    console.log('Run `npm install` to reinstall dependencies.');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

// Run cleanup
main();
