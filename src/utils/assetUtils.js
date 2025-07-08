/**
 * Utility functions for handling static assets in the application
 */

/**
 * Gets the correct path for an asset in both development and production
 * @param {string} path - The relative path to the asset
 * @returns {string} The correct asset path
 */
export const getAssetPath = (path) => {
  // In development, use relative paths
  if (import.meta.env.DEV) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // In production, use absolute paths with the base URL
  const base = import.meta.env.BASE_URL || '/Sahil-Portfolio/';
  return `${base}${path.replace(/^\//, '')}`;
};

/**
 * Gets the correct path for an image
 * @param {string} type - The type of image (e.g., 'projects', 'profile')
 * @param {string} subfolder - Optional subfolder
 * @param {string} filename - The image filename
 * @returns {string} The correct image path
 */
export const getImagePath = (type = '', subfolder = '', filename) => {
  if (!filename) return '';
  
  // Handle external URLs
  if (filename.startsWith('http') || filename.startsWith('data:')) {
    return filename;
  }
  
  // Handle absolute paths
  if (filename.startsWith('/')) {
    return getAssetPath(`images${filename}`);
  }
  
  // Handle relative paths
  const path = ['images', type, subfolder, filename]
    .filter(Boolean)
    .join('/')
    .replace(/\/+$/, '');
    
  return getAssetPath(path);
};

/**
 * Preloads an image to ensure it's cached
 * @param {string} src - The image source URL
 * @returns {Promise<boolean>} - Resolves to true when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.src = src;
    
    if (img.complete) {
      resolve(true);
    } else {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    }
  });
};
