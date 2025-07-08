/**
 * Utility function to get the correct image path for both development and production
 * @param {string} type - The type of image (e.g., 'projects', 'profile')
 * @param {string} subfolder - Optional subfolder
 * @param {string} filename - The image filename
 * @returns {string} The correct image path
 */
export const getImagePath = (type = '', subfolder = '', filename) => {
  // In development, use relative paths
  if (import.meta.env.DEV) {
    return `/images/${type}${subfolder ? `/${subfolder}` : ''}/${filename}`;
  }
  // In production, use absolute paths with the base URL
  return `${import.meta.env.BASE_URL || '/Sahil-Portfolio/'}images/${type}${subfolder ? `/${subfolder}` : ''}/${filename}`;
};

/**
 * Preloads an image to ensure it's cached
 * @param {string} src - The image source URL
 * @returns {Promise<boolean>} - Resolves to true when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
