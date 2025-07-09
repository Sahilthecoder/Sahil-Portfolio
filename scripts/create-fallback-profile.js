const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');
const profileImagePath = path.join(imagesDir, 'profile.webp');

// Create directories if they don't exist
[publicDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Create a simple profile image if it doesn't exist
if (!fs.existsSync(profileImagePath)) {
  try {
    // Create a canvas
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#4f46e5');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SA', 200, 200);
    
    // Save as WebP
    const buffer = canvas.toBuffer('image/webp');
    fs.writeFileSync(profileImagePath, buffer);
    console.log(`✅ Created fallback profile image at ${profileImagePath}`);
  } catch (err) {
    console.error('❌ Error creating profile image:', err);
  }
} else {
  console.log(`ℹ️ Profile image already exists at ${profileImagePath}`);
}
