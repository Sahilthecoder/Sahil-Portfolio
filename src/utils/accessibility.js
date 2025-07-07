/**
 * Accessibility Utilities
 *
 * This file contains helper functions to improve accessibility,
 * including focus management and ARIA attributes.
 */

/**
 * Injects focus-visible polyfill for better focus styles
 */
export function initializeFocusVisible() {
  // This will be handled by the focus-visible polyfill loaded via CDN
  // We're just providing a clean API for it
  if (typeof window !== 'undefined') {
    // The polyfill is loaded via CDN in index.html
    // This just ensures the script has loaded
    if (window.applyFocusVisiblePolyfill) {
      window.applyFocusVisiblePolyfill();
    }
  }
}

/**
 * Sets up keyboard navigation for a component
 * @param {HTMLElement} container - The container element
 * @param {string} selector - Selector for focusable elements
 */
export function setupKeyboardNavigation(
  container,
  selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
) {
  if (!container) return;

  const focusableElements = container.querySelectorAll(selector);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

/**
 * Adds ARIA attributes to an element
 * @param {HTMLElement} element - The element to add ARIA attributes to
 * @param {Object} attributes - Object of ARIA attributes to set
 */
export function setAriaAttributes(element, attributes) {
  if (!element || !attributes) return;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      element.removeAttribute(`aria-${key}`);
    } else {
      element.setAttribute(`aria-${key}`, value);
    }
  });
}

/**
 * Makes an element focusable and adds appropriate ARIA attributes
 * @param {HTMLElement} element - The element to make focusable
 * @param {Object} options - Options for the focusable element
 * @param {boolean} options.tabbable - Whether the element should be tabbable
 * @param {string} options.role - The ARIA role for the element
 * @param {string} options.label - The ARIA label for the element
 */
export function makeFocusable(element, { tabbable = true, role, label } = {}) {
  if (!element) return;

  if (role) {
    element.setAttribute('role', role);
  }

  if (label) {
    element.setAttribute('aria-label', label);
  }

  if (tabbable) {
    element.setAttribute('tabindex', '0');
  } else {
    element.setAttribute('tabindex', '-1');
  }

  return element;
}

/**
 * Traps focus within a container for modal dialogs
 * @param {HTMLElement} container - The container to trap focus within
 */
export function trapFocus(container) {
  if (!container) return () => {};

  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}
