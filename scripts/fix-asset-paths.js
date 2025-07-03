const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

// Function to process HTML files and fix asset paths
function processHtmlFiles() {
  const htmlFiles = ['index.html'];
  
  htmlFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Make sure all asset paths are relative to the base URL
      content = content
        // Handle src and href attributes
        .replace(/(href|src)="\/([^"#?]+)"/g, '$1="./$2"')
        // Handle CSS url() paths
        .replace(/url\(\s*['"]?\/([^'"#?)]+?)['"]?\s*\)/g, 'url("./$1")')
        // Handle manifest and other links
        .replace(/(href|src)="\/(manifest\.json|site\.webmanifest)"/g, '$1="./$2"');
      
      // Ensure service worker is registered with correct scope
      content = content.replace(
        /navigator\.serviceWorker\.register\(['"]\/([^'"]+)/g, 
        'navigator.serviceWorker.register("./$1'
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Processed ${file}`);
    }
  });
}

// Function to ensure manifest.json exists and is valid
function ensureManifest() {
  const manifestPath = path.join(distPath, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    const defaultManifest = {
      "name": "Sahil's Portfolio",
      "short_name": "Portfolio",
      "start_url": "./",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#000000",
      "icons": [
        {
          "src": "./favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        }
      ]
    };
    fs.writeFileSync(manifestPath, JSON.stringify(defaultManifest, null, 2));
    console.log('Created default manifest.json');
  }
}

// Main function
function main() {
  try {
    console.log('Fixing asset paths...');
    processHtmlFiles();
    ensureManifest();
    console.log('Asset paths fixed successfully!');
  } catch (error) {
    console.error('Error fixing asset paths:', error);
    process.exit(1);
  }
}

main();
