const fs = require('fs');
const path = require('path');

// Read the main index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Define the pages to create
const pages = [
  { name: 'about', title: 'About Me | Sahil Ali - Data Analyst & Inventory Specialist' },
  { name: 'experience', title: 'Experience | Sahil Ali - Data Analyst & Inventory Specialist' },
  { name: 'projects', title: 'Projects | Sahil Ali - Data Analyst & Inventory Specialist' },
  { name: 'contact', title: 'Contact | Sahil Ali - Data Analyst & Inventory Specialist' },
  { 
    name: 'projects/zomato-analysis', 
    title: 'Zomato Analysis Dashboard | Sahil Ali - Data Analyst & Inventory Specialist',
    description: 'Interactive dashboard analyzing Zomato restaurant data with visualizations and insights.'
  }
];

// Create the projects directory if it doesn't exist
if (!fs.existsSync('projects')) {
  fs.mkdirSync('projects', { recursive: true });
}

// Create each HTML file
pages.forEach(page => {
  // Update the title and content
  let html = indexHtml
    .replace(/<title>.*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description"[^>]*>/, 
             `<meta name="description" content="${page.description || page.title}" />`);
  
  // Update the Open Graph tags
  html = html
    .replace(/<meta property="og:title"[^>]*>/, 
             `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:url"[^>]*>/, 
             `<meta property="og:url" content="https://sahilthecoder.github.io/Sahil-Portfolio/${page.name}.html" />`);
  
  // Update the Twitter card
  html = html
    .replace(/<meta name="twitter:title"[^>]*>/, 
             `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta name="twitter:url"[^>]*>/, 
             `<meta name="twitter:url" content="https://sahilthecoder.github.io/Sahil-Portfolio/${page.name}.html" />`);
  
  // Write the file
  const filePath = `${page.name}.html`;
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Created: ${filePath}`);
});

console.log('\nAll HTML files have been created successfully!');
