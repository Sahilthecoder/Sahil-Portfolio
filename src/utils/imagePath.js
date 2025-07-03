/**
 * Utility function to generate correct image paths for both development and production
 * @param {string} path - The image path (can be relative, absolute, or URL)
 * @returns {string} The correct image path with base URL if needed
 */
export const getImagePath = (path) => {
  // If path is falsy, return empty string
  if (!path) return '';
  
  // If it's already a full URL or data URL, return as is
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if we're running on GitHub Pages
  const isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === 'true' || 
                       window.location.hostname.includes('github.io');
  
  // Get base path from environment or use default
  const basePath = import.meta.env.VITE_BASE_PATH || 
                  (isGitHubPages ? '/Sahil-Portfolio/' : '/');
  
  // In development or when running locally, use the path as is
  if (import.meta.env.DEV || window.location.hostname === 'localhost') {
    return `/${cleanPath}`;
  }
  
  // In production, ensure the base path is included
  const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  return `${normalizedBasePath}${cleanPath}`;
};

/**
 * Handles image loading errors by setting a fallback image
 * @param {Event} e - The error event
 * @param {string} fallback - The fallback image path (defaults to fallback-image.jpg)
 * @returns {boolean} Returns false to prevent default error handling
 */
export const handleImageError = (e, fallback = '/images/fallback-image.jpg') => {
  const target = e.target;
  if (target && target.tagName === 'IMG') {
    // Prevent infinite loop if fallback also fails
    target.onerror = null;
    
    // Only set fallback if the current src is different from the fallback
    if (target.src !== getImagePath(fallback)) {
      target.src = getImagePath(fallback);
    } else {
      console.error('Fallback image failed to load:', fallback);
    }
  }
  return false; // Prevent default error handling
};

/**
 * Creates an image preloader that returns a promise
 * @param {string} src - The image source URL
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = getImagePath(src);
    
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Error preloading image:', src, error);
      reject(error);
    };
  });
};
