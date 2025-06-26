const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
  'about.html',
  'contact.html',
  'projects.html',
  'resume.html',
  'index.html'  // This one should already be updated
];

// The CSS link to add
const cssLink = '  <link rel="stylesheet" href="/src/styles/main.scss">\n';

// The manifest link to find and replace
const manifestLink = '  <link rel="manifest" href="meta/site.webmanifest" />';

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  // Skip if file doesn't exist
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - file not found`);
    return;
  }

  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if CSS link already exists
  if (content.includes('href="/src/styles/main.scss"')) {
    console.log(`Skipping ${file} - already has CSS link`);
    return;
  }
  
  // Add CSS link after the manifest link
  content = content.replace(
    new RegExp(manifestLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
    `${manifestLink}\n${cssLink}`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('All HTML files have been updated!');
