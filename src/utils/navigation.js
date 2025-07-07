import { withBasePath, isGitHubPages, BASE_PATH } from './paths';

// Debug logging
console.log('Navigation Configuration:');
console.log('- isGitHubPages:', isGitHubPages);
console.log('- BASE_PATH:', BASE_PATH);

/**
 * Checks if the current page is the home page
 * @param {string} [pathname] - Optional pathname to check (defaults to current path)
 * @returns {boolean} True if the current page is the home page
 */
export const isHomePage = (pathname = window.location.pathname) => {
  // Normalize the pathname
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const base = BASE_PATH || '/';
  const baseWithoutTrailingSlash = base.endsWith('/') ? base.slice(0, -1) : base;

  return (
    normalizedPath === baseWithoutTrailingSlash || normalizedPath === '' || normalizedPath === '/'
  );
};

/**
 * Gets the navigation path with the base path included
 * @param {string} path - The path to navigate to
 * @returns {string} The full navigation path
 */
export const getNavigationPath = (path = '') => {
  // If it's an external URL, return as is
  if (!path || path.startsWith('http') || path.startsWith('//') || path.startsWith('mailto:')) {
    return path;
  }

  // Handle hash links
  if (path.startsWith('#')) {
    // If we're on the home page, just return the hash
    if (isHomePage()) {
      return path;
    }
    // Otherwise, navigate to home page with hash
    return withBasePath(`/${path}`);
  }

  // Handle relative paths
  if (!path.startsWith('/')) {
    const currentPath = window.location.pathname;
    const base = BASE_PATH || '';
    const basePath = currentPath.startsWith(base) ? base : '';
    return `${basePath}/${path}`.replace(/\/+/g, '/');
  }

  // Handle absolute paths
  return withBasePath(path);
};

/**
 * Gets the current path without the base path
 * @returns {string} The current path without the base path
 */
export const getCurrentPath = () => {
  const { pathname } = window.location;
  if (!isGitHubPages) return pathname;

  // Remove the base path from the current path
  const base = BASE_PATH.startsWith('/') ? BASE_PATH : `/${BASE_PATH}`;
  return pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
};

/**
 * Smooth scrolls to a section on the page
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Object} [options] - Additional options for scrolling
 * @param {number} [options.offset=80] - The offset from the top of the section
 * @param {string} [options.behavior='smooth'] - The scroll behavior
 * @param {boolean} [options.updateUrl=true] - Whether to update the URL hash
 */
export const scrollToSection = (
  sectionId,
  { offset = 80, behavior = 'smooth', updateUrl = true } = {}
) => {
  if (!sectionId) return;

  // If we're not on the home page, navigate to the home page with the hash
  if (!isHomePage() && updateUrl) {
    window.location.href = withBasePath(`/#${sectionId}`);
    return;
  }

  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  // Update URL hash without scrolling if we're already on the home page
  if (updateUrl) {
    const newHash = `#${sectionId}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
  }

  // Only scroll if the element is not in view
  if (Math.abs(window.scrollY - offsetPosition) > 10) {
    window.scrollTo({
      top: offsetPosition,
      behavior,
    });
  }
};
