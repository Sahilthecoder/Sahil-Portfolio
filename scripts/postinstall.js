#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Ensures a directory exists, creating it if necessary
 * @param {string} dirPath - Path to the directory
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Copies a file if it doesn't exist at the destination
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 */
const copyFileIfNotExists = (source, destination) => {
  if (!fs.existsSync(destination)) {
    console.log(`Copying ${path.basename(source)} to ${destination}`);
    fs.copyFileSync(source, destination);
  }
};

/**
 * Main function to run post-install tasks
 */
const main = () => {
  try {
    console.log('Running post-install setup...');
    
    // Ensure necessary directories exist
    const directories = [
      'public',
      'public/assets',
      'public/assets/images',
      'public/assets/fonts',
      'public/assets/js',
      'src/utils',
      'src/hooks',
      'src/context',
      'src/components',
      'src/pages',
      'scripts'
    ];
    
    directories.forEach(dir => {
      ensureDirectoryExists(path.join(process.cwd(), dir));
    });
    
    // Copy default files if they don't exist
    const defaultFiles = [
      { source: 'public/index.html', template: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Sahil Ali - Portfolio</title>\n    <meta name="description" content="Personal portfolio of Sahil Ali - Full Stack Developer and Data Analyst" />\n    <link rel="icon" href="/favicon.ico" />\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>' },
      { source: 'src/utils/constants.js', template: '// Application constants\n\nexport const APP_NAME = \'Sahil Ali - Portfolio\';\nexport const APP_DESCRIPTION = \'Personal portfolio of Sahil Ali - Full Stack Developer and Data Analyst\';\nexport const APP_URL = \'https://sahilthecoder.github.io/Sahil-Portfolio\';' },
      { source: '.env.local', template: '# Local environment variables\nVITE_BASE_URL=/\nVITE_API_URL=http://localhost:3000/api\n# Uncomment for production\n# VITE_API_URL=https://api.yourdomain.com' },
      { source: '.env.production', template: '# Production environment variables\nVITE_BASE_URL=/Sahil-Portfolio/\nVITE_API_URL=https://api.yourdomain.com' }
    ];
    
    defaultFiles.forEach(({ source, template }) => {
      const destPath = path.join(process.cwd(), source);
      if (!fs.existsSync(destPath)) {
        console.log(`Creating default file: ${source}`);
        fs.writeFileSync(destPath, template, 'utf8');
      }
    });
    
    // Generate sitemap and robots.txt if they don't exist
    try {
      const { generateSitemap, generateRobotsTxt } = require('./generate-sitemap');
      generateSitemap();
      generateRobotsTxt();
    } catch (error) {
      console.warn('Could not generate sitemap/robots.txt:', error.message);
    }
    
    console.log('✅ Post-install setup completed successfully!');
    return 0;
  } catch (error) {
    console.error('❌ Error during post-install setup:', error);
    return 1;
  }
};

// Run the script
if (require.main === module) {
  process.exit(main());
}

module.exports = { ensureDirectoryExists, copyFileIfNotExists };
