const fs = require('fs');
const path = require('path');

// Check if a file exists
const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};

// Check if a directory exists
const dirExists = (dirPath) => {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
};

// Create directory if it doesn't exist
const ensureDirExists = (dirPath) => {
  if (!dirExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
};

// Copy file if it doesn't exist
const copyFileIfNotExists = (source, target) => {
  if (!fileExists(target)) {
    ensureDirExists(path.dirname(target));
    fs.copyFileSync(source, target);
    console.log(`✅ Copied ${source} to ${target}`);
  }
};

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

// Ensure images directory exists
ensureDirExists(imagesDir);

// Check profile image
const profileImageSource = path.join(publicDir, 'profile.webp');
const profileImageTarget = path.join(imagesDir, 'profile.webp');

if (fileExists(profileImageSource)) {
  copyFileIfNotExists(profileImageSource, profileImageTarget);
} else {
  console.log('ℹ️ Profile image not found at source location');
}

// Check fallback image
const fallbackSource = path.join(publicDir, 'images', 'placeholder-profile.jpg');
const fallbackTarget = path.join(imagesDir, 'fallback-profile.jpg');

if (fileExists(fallbackSource)) {
  copyFileIfNotExists(fallbackSource, fallbackTarget);
} else {
  console.log('ℹ️ Fallback image not found at source location');
}

console.log('\n✅ Image verification complete!');
