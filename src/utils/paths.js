/**
 * Path utilities for handling GitHub Pages deployment
 */

// Determine if we're running on GitHub Pages
export const isGitHubPages = import.meta.env.VITE_IS_GITHUB_PAGES === 'true';

// Base path for GitHub Pages (empty string for local development)
export const BASE_PATH = isGitHubPages ? '/Sahil-Portfolio' : '';

// Debug logging
console.log('Path Configuration:');
console.log('- isGitHubPages:', isGitHubPages);
console.log('- BASE_PATH:', BASE_PATH);

/**
 * Prefixes a path with the base path if needed
 * @param {string} path - The path to prefix
 * @returns {string} The prefixed path
 */
export const withBasePath = (path) => {
  if (!path) return BASE_PATH || '/';

  // Normalize the path to handle multiple slashes
  const normalizedPath = `/${path}`.replace(/\/+/g, '/');

  // If no base path, return the normalized path
  if (!BASE_PATH) return normalizedPath;

  // Ensure the base path has a leading slash and no trailing slash
  const cleanBase = `/${BASE_PATH}`.replace(/^\/+|\/+$/g, '');

  // Combine and normalize the full path
  return `/${cleanBase}${normalizedPath}`.replace(/\/+/g, '/');
};

/**
 * Gets the asset path, ensuring it works with the base path
 * @param {string} assetPath - The asset path
 * @returns {string} The full asset path
 */
export const getAssetPath = (assetPath) => {
  // If it's an absolute URL, return as is
  if (
    !assetPath ||
    assetPath.startsWith('http') ||
    assetPath.startsWith('//') ||
    assetPath.startsWith('data:')
  ) {
    return assetPath;
  }

  // For relative paths, ensure they work with the base path
  return withBasePath(assetPath);
};

/**
 * Gets the current base URL
 * @returns {string} The base URL
 */
export const getBaseUrl = () => {
  if (typeof window === 'undefined') return ''; // SSR
  return window.location.origin + (BASE_PATH || '');
};
