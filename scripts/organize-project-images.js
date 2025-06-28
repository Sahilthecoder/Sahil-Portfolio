const fs = require('fs');
const path = require('path');

// Project directories
const projects = {
  zomato: ['zometo-ds.avif', 'zt1.avif', 'zt2.avif'],
  bansal: ['bs2.avif', 'bs3.avif', 'bs-top10.avif', 'bs-saleVSpft.avif', 'bs-stockTO.avif'],
  ekam: ['Ekam_SQL.avif', 'Attendance.avif', 'Attendance_after.avif'],
  retail: ['CashFlow1.avif', 'CashFlow2.avif', 'Store_POWERBI.avif', 'Store_POWERBI1.avif'],
  sentiment: ['github_portfolio.avif', 'gpt5.avif', 'gpt6.avif']
};

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Create project directories and move files
Object.entries(projects).forEach(([project, files]) => {
  const projectDir = path.join(imagesDir, 'projects', project);
  
  // Create project directory if it doesn't exist
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Move each file to the project directory
  files.forEach(file => {
    const sourcePath = path.join(imagesDir, file);
    const destPath = path.join(projectDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destPath);
      console.log(`Moved ${file} to ${project}/`);
    } else {
      console.warn(`Warning: ${file} not found in images directory`);
    }
  });
});

console.log('Finished organizing project images!');
