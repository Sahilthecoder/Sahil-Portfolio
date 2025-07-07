
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Get the last commit date for a file
const getLastModifiedDate = (filePath) => {
  // Check if file exists before trying to get Git history
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return getCurrentDate();
  }

  try {
    // Try to get Git history
    const output = execSync(`git log -1 --pretty=format:%cd --date=short "${filePath}"`, 
      { cwd: process.cwd(), timeout: 5000 }).toString().trim();
    return output || getCurrentDate();
  } catch (error) {
    // Log error but don't fail
    console.log(`Skipping Git history check for ${filePath}: ${error.message}`);
    return getCurrentDate();
  }
};

// Configuration
const SITE_URL = 'https://sahilthecoder.github.io/Sahil-Portfolio';
const PAGES = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/experience', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
];

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${PAGES.map(page => {
    // For React apps, we don't need to check for individual HTML files
    // since all routes are handled by index.html
    const lastmod = getLastModifiedDate(path.join(process.cwd(), 'dist', 'index.html'));
    return `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('')}
</urlset>`;

  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap to public directory
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated at: ${sitemapPath}`);
  
  return sitemapPath;
};

// Generate robots.txt
const generateRobotsTxt = () => {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

  // Write robots.txt to public directory
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log(`robots.txt generated at: ${robotsPath}`);
  
  return robotsPath;
};

// Main function
const main = () => {
  try {
    console.log('Generating sitemap and robots.txt...');
    
    // Generate sitemap and robots.txt
    const sitemapPath = generateSitemap();
    const robotsPath = generateRobotsTxt();
    
    console.log('\n✅ Sitemap and robots.txt generated successfully!');
    console.log(`- Sitemap: ${sitemapPath}`);
    console.log(`- robots.txt: ${robotsPath}`);
    
    return 0;
  } catch (error) {
    console.error('❌ Error generating sitemap or robots.txt:', error);
    return 1;
  }
};

// Run the script
if (require.main === module) {
  process.exit(main());
}

module.exports = { generateSitemap, generateRobotsTxt };
