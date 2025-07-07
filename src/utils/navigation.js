import { withBasePath } from './paths';

/**
 * Checks if the current path is the home page
 * @param {string} currentPath - The current path from useLocation().pathname
 * @returns {boolean} True if the current path is the home page
 */
export const isHomePage = (currentPath) => {
  const basePath = withBasePath('/');
  return currentPath === basePath || currentPath === `${basePath}/`;
};

/**
 * Gets the correct path for navigation, considering the base path
 * @param {string} path - The path to navigate to
 * @returns {string} The full path including the base path if needed
 */
export const getNavigationPath = (path) => {
  // If it's already a full URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // If it's an anchor link, return as is (handled by the browser)
  if (path.startsWith('#')) {
    return path;
  }
  
  // Otherwise, ensure it has the base path
  return path.startsWith('/') 
    ? withBasePath(path) 
    : withBasePath(`/${path}`);
};

/**
 * Handles navigation to a section, scrolling smoothly if on the home page
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Function} navigate - The navigate function from useNavigate()
 * @param {string} currentPath - The current path from useLocation().pathname
 */
export const scrollToSection = (sectionId, navigate, currentPath) => {
  if (isHomePage(currentPath)) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  } else {
    // Navigate to home page with hash
    navigate(`${withBasePath('/')}#${sectionId}`);
  }
};
