const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
fs.ensureDirSync(assetsDir);

// Compile SCSS to CSS
try {
  const cssOutput = sass.compile(path.join(__dirname, 'src/styles/main.scss'), {
    loadPaths: [path.join(__dirname, 'src/styles')],
    style: 'compressed'
  });
  
  fs.writeFileSync(path.join(assetsDir, 'main.css'), cssOutput.css);
  console.log('✅ CSS compiled successfully!');
} catch (error) {
  console.error('❌ Error compiling SCSS:');
  console.error(error.formatted || error.message);
  process.exit(1);
}
