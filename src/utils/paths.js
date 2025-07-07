/**
 * Path utilities for handling GitHub Pages deployment
 */

// Base path for GitHub Pages
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Sahil-Portfolio' : '';

/**
 * Prefixes a path with the base path if in production
 * @param {string} path - The path to prefix
 * @returns {string} The prefixed path
 */
export const withBasePath = (path) => {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
};

/**
 * Gets the correct path for assets in public folder
 * @param {string} assetPath - The path to the asset in the public folder
 * @returns {string} The correct path to the asset
 */
export const getAssetPath = (assetPath) => {
  // Remove leading slash if present
  const normalizedPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return withBasePath(`/${normalizedPath}`);
};
