/**
 * Generates a Cloudinary URL for the given image path
 * @param {string} imagePath - The path to the image
 * @param {Object} options - Cloudinary transformation options
 * @returns {string} Formatted Cloudinary URL or local path
 */
/**
 * Generates a proper image URL, handling both local development and production with Cloudinary
 * @param {string} imagePath - The path to the image (relative to public folder in development)
 * @param {Object} options - Cloudinary transformation options (used in production)
 * @returns {string} Formatted image URL
 */
export const getCloudinaryUrl = (imagePath: string, options: Record<string, any> = {}) => {
  if (!imagePath) return '';

  // Handle local development - prepend /images if not already a full path
  if (import.meta.env.DEV) {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Ensure the path starts with a slash
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    // If the path already includes /images, return as is
    if (normalizedPath.startsWith('/images/')) {
      return normalizedPath;
    }
    
    // Otherwise, prepend /images/projects/ for local development
    return `/images/projects${normalizedPath}`;
  }

  // Production: Handle Cloudinary URLs
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Remove leading slash if present and ensure proper path for Cloudinary
  let cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // If the path already includes images/, use it as is, otherwise prepend images/projects/
  if (!cleanPath.startsWith('images/')) {
    cleanPath = `images/projects/${cleanPath}`;
  }
  
  // Default Cloudinary transformations
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    dpr: 'auto',
    ...options
  };

  // Convert options to Cloudinary transformation string
  const transformOptions = Object.entries(defaultOptions)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  // Get cloud name from environment variables
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformOptions ? transformOptions + '/' : ''}${cleanPath}`;
};