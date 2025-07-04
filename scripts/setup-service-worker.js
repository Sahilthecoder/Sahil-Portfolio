const fs = require('fs');
const path = require('path');

function setupServiceWorker() {
  const source = path.resolve(__dirname, '../public/sw.js');
  const target = path.resolve(__dirname, '../dist/service-worker.js');
  
  console.log(`Setting up service worker symlink from ${source} to ${target}`);
  
  // Ensure source exists
  if (!fs.existsSync(source)) {
    console.error(`Error: Source file ${source} does not exist`);
    process.exit(1);
  }
  
  // Ensure dist directory exists
  const distDir = path.dirname(target);
  if (!fs.existsSync(distDir)) {
    console.log(`Creating directory: ${distDir}`);
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Remove target if it exists (file or symlink)
  try {
    if (fs.existsSync(target)) {
      console.log(`Removing existing: ${target}`);
      fs.unlinkSync(target);
    }
  } catch (error) {
    console.error(`Error removing ${target}:`, error.message);
    process.exit(1);
  }
  
  // Create symlink
  try {
    console.log(`Creating symlink from ${source} to ${target}`);
    fs.symlinkSync(path.relative(path.dirname(target), source), target);
    
    // Verify the symlink
    const stats = fs.lstatSync(target);
    if (!stats.isSymbolicLink()) {
      throw new Error('Failed to create symlink - target is not a symlink');
    }
    
    console.log('✓ Successfully created service worker symlink');
    console.log(`Symlink points to: ${fs.readlinkSync(target)}`);
  } catch (error) {
    console.error('Error creating symlink:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupServiceWorker();
