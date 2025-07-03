/**
 * Utility function to generate correct image paths for both development and production
 * @param {string} path - The image path (should start with '/')
 * @returns {string} The correct image path with base URL if needed
 */
export const getImagePath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development or when running locally, use the path as is
  if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
    return `/${cleanPath}`;
  }
  
  // In production, prepend the repository name
  return `/Sahil-Portfolio/${cleanPath}`;
};

/**
 * Handles image loading errors by setting a fallback image
 * @param {Event} e - The error event
 * @param {string} fallback - The fallback image path (defaults to fallback-image.jpg)
 */
export const handleImageError = (e, fallback = '/images/fallback-image.jpg') => {
  if (e.target) {
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
    e.target.src = getImagePath(fallback);
  }
};
