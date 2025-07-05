const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
};

// Copy file if it doesn't exist
const copyIfNotExists = (source, target) => {
  if (!fs.existsSync(target)) {
    ensureDir(path.dirname(target));
    try {
      fs.copyFileSync(source, target);
      console.log(`✅ Copied ${path.basename(source)} to ${target}`);
    } catch (err) {
      console.error(`❌ Error copying ${source} to ${target}:`, err.message);
    }
  }
};

// Create directories
ensureDir(publicDir);
ensureDir(imagesDir);

// Define required files and their default paths
const requiredFiles = [
  { source: path.join(publicDir, 'profile.avif'), target: path.join(imagesDir, 'profile.avif') },
  { source: path.join(publicDir, 'logo192.png'), target: path.join(imagesDir, 'logo192.png') },
  { source: path.join(publicDir, 'logo512.png'), target: path.join(imagesDir, 'logo512.png') },
  { source: path.join(publicDir, 'favicon.ico'), target: path.join(publicDir, 'favicon.ico') },
  { source: path.join(publicDir, 'favicon-16x16.png'), target: path.join(imagesDir, 'favicon-16x16.png') },
  { source: path.join(publicDir, 'favicon-32x32.png'), target: path.join(imagesDir, 'favicon-32x32.png') },
  { source: path.join(publicDir, 'apple-touch-icon.png'), target: path.join(imagesDir, 'apple-touch-icon.png') },
  { source: path.join(publicDir, 'images', 'placeholder-profile.jpg'), target: path.join(imagesDir, 'fallback-profile.jpg') }
];

// Process required files
console.log('\n🔍 Setting up image files...');
requiredFiles.forEach(({ source, target }) => {
  if (fs.existsSync(source)) {
    copyIfNotExists(source, target);
  } else {
    console.warn(`⚠️  Source file not found: ${source}`);
  }
});

// Create a simple fallback image if it doesn't exist
const fallbackImage = path.join(imagesDir, 'fallback-profile.jpg');
if (!fs.existsSync(fallbackImage)) {
  try {
    // Create a simple colored rectangle as fallback
    const { createCanvas } = require('canvas');
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw text
    ctx.fillStyle = '#6b7280';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Profile Image', 200, 200);
    
    // Save as JPEG
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(fallbackImage, buffer);
    console.log(`✅ Created fallback profile image at ${fallbackImage}`);
  } catch (err) {
    console.error('❌ Error creating fallback image:', err.message);
  }
}

console.log('\n✅ Image setup complete!');
