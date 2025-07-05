const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a canvas
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

// Draw gradient background
const gradient = ctx.createLinearGradient(0, 0, 400, 400);
gradient.addColorStop(0, '#4f46e5');
gradient.addColorStop(1, '#7c3aed');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 400);

// Draw text
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 120px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('SA', 200, 200);

// Save as PNG
const out = fs.createWriteStream(path.join(__dirname, '..', 'public', 'images', 'profile-fallback.png'));
const stream = canvas.createPNGStream();
stream.pipe(out);

out.on('finish', () => {
  console.log('✅ Generated fallback profile image at:', out.path);
});

// Also save as SVG
const svgContent = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#gradient)" />
  <text x="50%" y="50%" 
        font-family="Arial, sans-serif" 
        font-size="120" 
        font-weight="bold" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="white">
    SA
  </text>
</svg>`;

fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'images', 'profile.svg'),
  svgContent.trim()
);

console.log('✅ Generated SVG profile image');
