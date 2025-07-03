const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

// Function to process HTML files and fix asset paths
function processHtmlFiles() {
  const htmlFiles = ['index.html'];
  
  // Get the base URL from environment variable or use default
  const baseUrl = process.env.BASE_URL || '/Sahil-Portfolio/';
  const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  console.log(`Using base path: ${basePath}`);
  
  htmlFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Function to update paths in HTML attributes
      const updatePath = (match, p1, p2, p3, p4) => {
        // Skip if it's already a full URL or data URL
        if (p3.startsWith('http') || p3.startsWith('data:')) {
          return match;
        }
        // Ensure path starts with base path
        return `${p1}${p2}${basePath}${p3.startsWith('/') ? p3.substring(1) : p3}${p4}`;
      };
      
      // Update all asset paths
      content = content
        // Handle src and href attributes
        .replace(/(href|src)=(["'])([^"'#?]+)(["'])/g, updatePath)
        // Handle CSS url() paths
        .replace(/url\(\s*['"]?([^'"#?)]+?)['"]?\s*\)/g, (match, p1) => {
          if (p1.startsWith('http') || p1.startsWith('data:')) {
            return match;
          }
          // Ensure path starts with base path
          const cleanPath = p1.startsWith('/') ? p1.substring(1) : p1;
          return `url("${basePath}${cleanPath}")`;
        })
        // Fix any remaining absolute paths that don't include the base
        .replace(/(href|src)="\/([^/][^"]*\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot))(?="|\?|#)/g, `$1="${basePath}$2"`);
      
      // Ensure service worker is registered with correct scope
      content = content.replace(
        /navigator\.serviceWorker\.register\(['"]\/([^'"]+)/g, 
        `navigator.serviceWorker.register("${basePath}$1`
      );
      
      // Ensure manifest links are correct
      content = content.replace(
        /(<link[^>]+rel=["']manifest["'][^>]+href=)["']\/([^"']+)["']/g,
        `$1"${basePath}$2"`
      );
      
      // Update base href if it exists
      if (!content.includes('<base href')) {
        const headEnd = content.indexOf('</head>');
        if (headEnd !== -1) {
          content = content.slice(0, headEnd) + 
                   `\n    <base href="${basePath}">` + 
                   content.slice(headEnd);
        }
      }
      
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
