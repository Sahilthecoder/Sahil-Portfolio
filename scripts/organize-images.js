const fs = require('fs');
const path = require('path');

// Define image mappings to projects
const projectImages = {
  'zomato': ['Zomato.avif', 'zometo-ds.avif', 'zt1.avif', 'zt2.avif'],
  'bansal': ['Bansal Supermarket.avif', 'bs-saleVSpft.avif', 'bs-stockTO.avif', 'bs-top10.avif', 'bs2.avif', 'bs3.avif'],
  'retail': ['CashFlow1.avif', 'CashFlow2.avif', 'Store_POWERBI.avif', 'Store_POWERBI1.avif'],
  'ekam': ['Ekam_SQL.avif', 'Attendance.avif', 'Attendance_after.avif']
};

const publicPath = path.join(__dirname, '..', 'public', 'images');

// Create project directories and move images
Object.entries(projectImages).forEach(([project, images]) => {
  const projectDir = path.join(publicPath, 'projects', project);
  
  // Create project directory if it doesn't exist
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
  
  // Move each image to the project directory
  images.forEach(image => {
    const sourcePath = path.join(publicPath, image);
    const destPath = path.join(projectDir, image);
    
    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destPath);
      console.log(`Moved ${image} to ${projectDir}`);
    } else {
      console.log(`Source file not found: ${sourcePath}`);
    }
  });
});

console.log('Image organization complete!');
