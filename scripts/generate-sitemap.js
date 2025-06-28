const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

/**
 * Sitemap Generator for Sahil's Portfolio
 * 
 * This script generates a sitemap.xml file by scanning the pages directory
 * and including all relevant routes in the sitemap.
 * 
 * Repository: https://github.com/Sahilthecoder/Sahil-Portfolio
 */

// Configuration
const SITE_URL = 'https://sahil-ali.vercel.app'; // Production URL
const PAGES_DIR = 'src/pages';
const OUTPUT_FILE = 'public/sitemap.xml';
const REPO_URL = 'https://github.com/Sahilthecoder/Sahil-Portfolio';

// List of pages to include in sitemap
const staticPages = [
  '/',
  '/about',
  '/projects',
  '/experience',
  '/contact',
];

// Get all dynamic project pages
async function getProjectPages() {
  const projectFiles = await glob('src/pages/projects/*.jsx');
  return projectFiles.map(file => {
    const slug = path.basename(file, '.jsx').toLowerCase();
    return `/projects/${slug}`;
  });
}

// Generate sitemap XML
/**
 * Generate the sitemap XML content
 */
async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap...');
    console.log(`🌐 Site URL: ${SITE_URL}`);
    console.log(`📁 Pages directory: ${PAGES_DIR}`);
    
    const projectPages = await getProjectPages();
    const pages = [...staticPages, ...projectPages];
    
    console.log(`✅ Found ${pages.length} pages to include in sitemap`);
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Sitemap generated on: ${new Date().toISOString()}
  Repository: ${REPO_URL}
  Generator: scripts/generate-sitemap.js
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    page => `  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, sitemap);
    console.log(`✅ Sitemap generated at ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
