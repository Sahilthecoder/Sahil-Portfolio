const fs = require('fs');
const path = require('path');

// List of favicon files that should exist in the dist directory
const requiredFavicons = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
  'browserconfig.xml',
  'favicon-192x192.png',
  'favicon-512x512.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'mstile-150x150.png'
];

// Directory paths
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');
const faviconsDir = path.resolve(publicDir, 'favicons');

console.log('\n🔍 Verifying favicon files...\n');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory does not exist. Run `npm run build` first.');
  process.exit(1);
}

let allFilesExist = true;

// Check each required favicon file
requiredFavicons.forEach(file => {
  const distPath = path.join(distDir, file);
  const exists = fs.existsSync(distPath);
  
  if (exists) {
    console.log(`✅ ${file} exists in dist directory`);
  } else {
    console.error(`❌ ${file} is missing from dist directory`);
    allFilesExist = false;
    
    // Try to find the source file
    let sourcePath = path.join(faviconsDir, file);
    if (!fs.existsSync(sourcePath)) {
      sourcePath = path.join(publicDir, file);
    }
    
    if (fs.existsSync(sourcePath)) {
      console.log(`   ℹ️  Source found at: ${sourcePath}`);
      console.log('   💡 Run `npm run copy-favicons` to copy missing files');
    } else {
      console.log('   ❗ Source file not found. Run `npm run generate-favicons` to create it.');
    }
  }
});

// Check webmanifest and browserconfig.xml content
const checkFileContent = (filename, checkString) => {
  const filePath = path.join(distDir, filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(checkString)) {
      console.error(`⚠️  Warning: ${filename} may need to be updated`);
      return false;
    }
    return true;
  }
  return false;
};

// Check site.webmanifest for correct paths
checkFileContent('site.webmanifest', '/Sahil-Portfolio/');

// Check browserconfig.xml for correct paths
checkFileContent('browserconfig.xml', '/Sahil-Portfolio/');

console.log('\n🔍 Verification complete!\n');

if (!allFilesExist) {
  console.log('❌ Some favicon files are missing from the dist directory.');
  console.log('   Run `npm run generate-favicons` to create missing favicon files.');
  console.log('   Then run `npm run copy-favicons` to copy them to the dist directory.\n');
  process.exit(1);
} else {
  console.log('✅ All favicon files are present and accounted for!\n');
}

// Verify favicon references in index.html
const indexPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const missingReferences = [];
  
  requiredFavicons.forEach(file => {
    // Skip .ico as it's referenced differently
    if (file === 'favicon.ico') {
      if (!indexContent.includes('link rel="icon" href="favicon.ico"')) {
        missingReferences.push('favicon.ico reference');
      }
    } 
    // Check for apple-touch-icon
    else if (file === 'apple-touch-icon.png') {
      if (!indexContent.includes('link rel="apple-touch-icon"')) {
        missingReferences.push('apple-touch-icon reference');
      }
    }
    // Check for manifest
    else if (file === 'site.webmanifest') {
      if (!indexContent.includes('link rel="manifest"')) {
        missingReferences.push('web app manifest reference');
      }
    }
    // Check for browserconfig
    else if (file === 'browserconfig.xml') {
      if (!indexContent.includes('name="msapplication-config"')) {
        missingReferences.push('browserconfig.xml reference');
      }
    }
  });
  
  if (missingReferences.length > 0) {
    console.log('⚠️  The following favicon references are missing from index.html:');
    missingReferences.forEach(ref => console.log(`   - ${ref}`));
    console.log('\n   Update your index.html head section to include these references.');
  } else {
    console.log('✅ All favicon references are correctly set in index.html');
  }
}

console.log('');
