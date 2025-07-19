/**
 * Utility function to ensure all asset paths use the correct base URL
 * @param {string} path - The asset path (e.g., '/images/example.jpg')
 * @returns {string} The full path with base URL (e.g., '/Sahil-Portfolio/images/example.jpg')
 */
const getAssetPath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/Sahil-Portfolio/${cleanPath}`;
};

export default getAssetPath;
