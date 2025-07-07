/**
 * Utility function for smooth scrolling with offset
 * @param {string} selector - CSS selector of the target element
 * @param {number} offset - Additional offset in pixels (default: 80)
 * @returns {boolean} - Returns true if scrolling was successful, false otherwise
 */
export const scrollToSection = (selector, offset = 80) => {
  const element = document.querySelector(selector);
  if (element) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : offset;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
    return true;
  }
  console.warn(`Element not found with selector: ${selector}`);
  return false;
};

/**
 * Scrolls to the top of the page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
