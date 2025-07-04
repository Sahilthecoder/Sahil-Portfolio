// Base URL for Google Drive images
const GOOGLE_DRIVE_BASE_URL = 'https://drive.google.com/uc?export=view&id=';

// To get the file ID from a Google Drive shareable link:
// 1. Upload your image to Google Drive
// 2. Right-click the file and select "Share"
// 3. Set sharing to "Anyone with the link"
// 4. Copy the shareable link (it will look like: https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
// 5. Extract the FILE_ID and paste it below

// Image IDs from Google Drive (replace these with your actual file IDs)
const IMAGE_IDS = {
    CONTACT_HERO: 'YOUR_CONTACT_HERO_IMAGE_ID', // Replace with your contact hero image ID
  
  // Project covers
  PROJECT1_COVER: 'YOUR_PROJECT1_COVER_ID', // Zomato Analysis cover
  PROJECT2_COVER: 'YOUR_PROJECT2_COVER_ID', // Retail Sales Dashboard cover
  PROJECT3_COVER: 'YOUR_PROJECT3_COVER_ID', // Ekam Attendance System cover
  PROJECT4_COVER: 'YOUR_PROJECT4_COVER_ID', // Retail Cash Flow Analysis cover
  PROJECT5_COVER: 'YOUR_PROJECT5_COVER_ID', // AI-Powered Notion Assistant cover
  PROJECT6_COVER: 'YOUR_PROJECT6_COVER_ID', // Project 6 cover
  PROJECT7_COVER: 'YOUR_PROJECT7_COVER_ID', // Mahira Portfolio cover
  
  // Project 1 - Zomato Analysis images
  PROJECT1_ZT1: 'YOUR_PROJECT1_ZT1_ID', // Zomato Analysis image 1
  PROJECT1_ZT2: 'YOUR_PROJECT1_ZT2_ID', // Zomato Analysis image 2
  
  // Project 2 - Bansal Supermarket images
  PROJECT2_BS2: 'YOUR_PROJECT2_BS2_ID', // Bansal Supermarket image 1
  PROJECT2_BS3: 'YOUR_PROJECT2_BS3_ID', // Bansal Supermarket image 2
  PROJECT2_BS_TOP10: 'YOUR_PROJECT2_BS_TOP10_ID', // Bansal Supermarket top 10
  PROJECT2_BS_STOCK: 'YOUR_PROJECT2_BS_STOCK_ID', // Bansal Supermarket stock
  
  // Project 3 - Ekam Attendance images
  PROJECT3_ATTENDANCE_BEFORE: 'YOUR_PROJECT3_ATTENDANCE_BEFORE_ID', // Before automation
  PROJECT3_ATTENDANCE_AFTER: 'YOUR_PROJECT3_ATTENDANCE_AFTER_ID', // After automation
  
  // Project 4 - Retail Cash Flow images
  PROJECT4_CASHFLOW1: 'YOUR_PROJECT4_CASHFLOW1_ID', // Cash Flow image 1
  PROJECT4_CASHFLOW2: 'YOUR_PROJECT4_CASHFLOW2_ID', // Cash Flow image 2
  
  // Open Graph images
  OG_PROJECTS: 'YOUR_OG_PROJECTS_IMAGE_ID' // Open Graph image for projects page
};

// Helper function to get full image URL
export const getImageUrl = (imageKey) => {
  if (!IMAGE_IDS[imageKey]) {
    console.warn(`No image ID found for key: ${imageKey}`);
    return '';
  }
  return `${GOOGLE_DRIVE_BASE_URL}${IMAGE_IDS[imageKey]}`;
};

export default {
  getImageUrl,
  IMAGE_IDS,
};
