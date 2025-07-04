const fs = require('fs');
const path = require('path');

function setupServiceWorker() {
  // Define paths
  const source = path.resolve(__dirname, '../public/sw.js');
  const target = path.resolve(__dirname, '../dist/service-worker.js');
  
  console.log('=== Setting up service worker symlink ===');
  console.log(`Source: ${source}`);
  console.log(`Target: ${target}`);
  
  try {
    // Ensure source file exists
    if (!fs.existsSync(source)) {
      throw new Error(`Source file does not exist: ${source}`);
    }
    
    // Ensure target directory exists
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      console.log(`Creating directory: ${targetDir}`);
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Remove existing target if it exists (file or symlink)
    if (fs.existsSync(target)) {
      console.log('Removing existing target...');
      fs.unlinkSync(target);
    }
    
    // Create relative path for symlink
    const relativeSource = path.relative(path.dirname(target), source);
    
    // Create the symlink
    console.log('Creating symlink...');
    fs.symlinkSync(relativeSource, target);
    
    // Verify the symlink
    if (!fs.existsSync(target)) {
      throw new Error('Failed to verify symlink creation');
    }
    
    console.log('✓ Service worker symlink created successfully');
    console.log(`Symlink points to: ${fs.readlinkSync(target)}`);
    
  } catch (error) {
    console.error('\n❌ Error setting up service worker:');
    console.error(error.message);
    
    // Additional debug info
    console.error('\nCurrent directory:', process.cwd());
    console.error('Directory contents:');
    try {
      console.log(require('child_process').execSync('ls -la').toString());
    } catch (e) {}
    
    process.exit(1);
  }
}

// Run the setup
setupServiceWorker();
