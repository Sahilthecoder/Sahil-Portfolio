const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to wait for a short time
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to safely remove a file with retries
async function safeUnlink(filePath, maxRetries = 5, retryDelay = 100) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (fs.existsSync(filePath)) {
        console.log(`[Attempt ${attempt}/${maxRetries}] Removing: ${filePath}`);
        fs.unlinkSync(filePath);
      }
      
      // Verify the file was actually removed
      if (!fs.existsSync(filePath)) {
        return true;
      }
      
      console.log(`File still exists, retrying in ${retryDelay}ms...`);
      await sleep(retryDelay);
    } catch (error) {
      console.error(`Error removing file (attempt ${attempt}):`, error.message);
      if (attempt === maxRetries) throw error;
      await sleep(retryDelay);
    }
  }
  throw new Error(`Failed to remove file after ${maxRetries} attempts: ${filePath}`);
}

async function setupServiceWorker() {
  const source = path.resolve(__dirname, '../public/sw.js');
  const target = path.resolve(__dirname, '../dist/service-worker.js');
  
  console.log(`=== Service Worker Setup ===`);
  console.log(`Source: ${source}`);
  console.log(`Target: ${target}`);
  
  try {
    // Ensure source exists
    if (!fs.existsSync(source)) {
      throw new Error(`Source file does not exist: ${source}`);
    }
    
    // Ensure dist directory exists
    const distDir = path.dirname(target);
    if (!fs.existsSync(distDir)) {
      console.log(`Creating directory: ${distDir}`);
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Remove target if it exists (file or symlink)
    if (fs.existsSync(target)) {
      console.log('Removing existing target file/link...');
      await safeUnlink(target);
    }
    
    // Create symlink with retry logic
    let success = false;
    const maxRetries = 3;
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Attempt ${attempt}/${maxRetries}] Creating symlink...`);
        const relativePath = path.relative(path.dirname(target), source);
        
        // Use native symlink creation
        fs.symlinkSync(relativePath, target);
        
        // Verify the symlink
        await sleep(100); // Give the filesystem a moment
        
        const stats = fs.lstatSync(target);
        if (!stats.isSymbolicLink()) {
          throw new Error('Target exists but is not a symlink');
        }
        
        const targetPath = fs.readlinkSync(target);
        if (path.resolve(path.dirname(target), targetPath) !== source) {
          throw new Error(`Symlink points to wrong location: ${targetPath}`);
        }
        
        console.log('✓ Successfully created service worker symlink');
        console.log(`Symlink points to: ${targetPath}`);
        success = true;
        break;
        
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);
        
        // Clean up failed attempt
        try { fs.unlinkSync(target); } catch (e) {}
        
        if (attempt < maxRetries) {
          console.log(`Retrying in 500ms...`);
          await sleep(500);
        }
      }
    }
    
    if (!success) {
      throw lastError || new Error('Failed to create symlink');
    }
    
  } catch (error) {
    console.error('\n❌ Error setting up service worker:');
    console.error(error.message);
    console.error('\nCurrent directory:', process.cwd());
    console.error('Directory contents:');
    try { console.log(execSync('ls -la').toString()); } catch (e) {}
    if (fs.existsSync(path.dirname(target))) {
      console.error(`\nContents of ${path.dirname(target)}:`);
      try { console.log(execSync(`ls -la "${path.dirname(target)}"`).toString()); } catch (e) {}
    }
    process.exit(1);
  }
}

// Run the setup
setupServiceWorker().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
