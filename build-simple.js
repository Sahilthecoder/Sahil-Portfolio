const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Cleaning previous build...');
try {
  fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
} catch (err) {
  console.log('No previous build to clean');
}

console.log('Running build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
