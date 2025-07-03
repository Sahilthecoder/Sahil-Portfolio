/**
 * Utility functions for handling image paths in the application
 */

/**
 * Gets the correct image path based on the environment
 * @param {string} path - The image path (can be relative or absolute)
 * @returns {string} The formatted image path
 */
export const getImagePath = (path) => {
  if (!path) return '';
  
  // Handle absolute URLs and data URIs
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Get base URL from environment
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  
  // Remove leading slashes to prevent double slashes
  const cleanPath = path.replace(/^[\/\\]+/, '');
  
  // Return the full path
  return `${baseUrl}${cleanPath}`;
};

/**
 * Creates an image with error handling
 * @param {string} src - The image source path
 * @param {string} alt - The alt text for the image
 * @param {Object} props - Additional props for the img element
 * @returns {JSX.Element} An img element with error handling
 */
export const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.svg',
  ...props 
}) => {
  const handleError = (e) => {
    if (e.target.src !== fallbackSrc) {
      e.target.src = getImagePath(fallbackSrc);
    }
  };

  return (
    <img
      src={getImagePath(src)}
      alt={alt || ''}
      onError={handleError}
      {...props}
    />
  );
};

export default {
  getImagePath,
  ImageWithFallback
};
