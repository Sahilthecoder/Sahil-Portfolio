const fs = require('fs');
const path = require('path');

// List of all HTML files to update
const htmlFiles = [
  'index.html',
  'about.html',
  'experience.html',
  'projects.html',
  'contact.html',
  'projects/zomato-analysis.html'
];

// Function to update navigation links in a file
function updateNavigation(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get the base name of the current file
    const currentFile = path.basename(filePath);
    
    // Function to determine if a link should be active
    const isActive = (linkHref, current) => {
      if (current === 'index.html') {
        return linkHref === 'index.html' || linkHref === './' || linkHref === '/';
      }
      return linkHref === current;
    };
    
    // Update desktop navigation
    content = content.replace(
      /<div class="hidden md:flex items-center space-x-1">[\s\S]*?<\/div>/,
      `<div class="hidden md:flex items-center space-x-1">
        <a href="index.html" class="px-3 py-2 text-sm font-medium ${isActive('index.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors">Home</a>
        <a href="about.html" class="px-3 py-2 text-sm font-medium ${isActive('about.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors">About</a>
        <a href="experience.html" class="px-3 py-2 text-sm font-medium ${isActive('experience.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors">Experience</a>
        <a href="projects.html" class="px-3 py-2 text-sm font-medium ${isActive('projects.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors">Projects</a>
        <a href="contact.html" class="px-3 py-2 text-sm font-medium ${isActive('contact.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors">Contact</a>
      </div>`
    );
    
    // Update mobile navigation
    content = content.replace(
      /<div id="mobile-menu"[\s\S]*?<\/div>/,
      `<div id="mobile-menu" class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
        <a href="index.html" class="block px-4 py-2 text-sm ${isActive('index.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">Home</a>
        <a href="about.html" class="block px-4 py-2 text-sm ${isActive('about.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">About</a>
        <a href="experience.html" class="block px-4 py-2 text-sm ${isActive('experience.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">Experience</a>
        <a href="projects.html" class="block px-4 py-2 text-sm ${isActive('projects.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">Projects</a>
        <a href="contact.html" class="block px-4 py-2 text-sm ${isActive('contact.html', currentFile) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}">Contact</a>
      </div>`
    );
    
    // Update the current page title in the mobile menu button
    const pageTitles = {
      'index.html': 'Home',
      'about.html': 'About',
      'experience.html': 'Experience',
      'projects.html': 'Projects',
      'contact.html': 'Contact',
      'projects/zomato-analysis.html': 'Zomato Analysis'
    };
    
    content = content.replace(
      /<button id="mobile-menu-button"[\s\S]*?<\/button>/,
      `<button id="mobile-menu-button" class="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none">
        <span class="mr-2">${pageTitles[currentFile] || 'Menu'}</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated navigation in ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
}

// Process all HTML files
let successCount = 0;
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    if (updateNavigation(file)) {
      successCount++;
    }
  } else {
    console.warn(`File not found: ${file}`);
  }
});

console.log(`\nNavigation updated in ${successCount} of ${htmlFiles.length} files.`);
