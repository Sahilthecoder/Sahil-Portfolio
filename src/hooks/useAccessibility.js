import { useEffect, useRef } from 'react';
import { trapFocus, setupKeyboardNavigation } from '../utils/accessibility';

/**
 * Hook to manage focus for better accessibility
 * @param {boolean} isActive - Whether the focus management should be active
 * @param {Object} options - Options for focus management
 * @param {React.RefObject} options.containerRef - Ref to the container element
 * @param {boolean} options.trapFocus - Whether to trap focus within the container
 * @param {string} options.selector - Selector for focusable elements
 */
export function useFocusManagement(
  isActive = true,
  { containerRef, trapFocus: shouldTrapFocus = false, selector } = {}
) {
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef?.current) return;

    if (shouldTrapFocus) {
      // Trap focus within the container
      cleanupRef.current = trapFocus(containerRef.current);
    } else if (selector) {
      // Setup keyboard navigation for the container
      setupKeyboardNavigation(containerRef.current, selector);
    }

    // Set initial focus if needed
    const focusableElements = containerRef.current.querySelectorAll(
      selector || 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0 && document.activeElement === document.body) {
      focusableElements[0].focus();
    }

    // Cleanup function
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isActive, containerRef, shouldTrapFocus, selector]);
}

/**
 * Hook to manage focus on mount
 * @param {React.RefObject} ref - Ref to the element to focus
 * @param {boolean} [shouldFocus=true] - Whether to focus the element
 */
export function useFocusOnMount(ref, shouldFocus = true) {
  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
    }
  }, [ref, shouldFocus]);
}

/**
 * Hook to manage keyboard events
 * @param {Object} keyHandlers - Object mapping key names to handler functions
 * @param {boolean} [isActive=true] - Whether the keyboard listener should be active
 * @param {React.RefObject} [ref] - Optional ref to attach the event listener to (defaults to document)
 */
export function useKeyboardEvents(keyHandlers, isActive = true, ref) {
  useEffect(() => {
    if (!isActive) return;

    const target = ref?.current || document;
    
    const handleKeyDown = (event) => {
      const handler = keyHandlers[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    target.addEventListener('keydown', handleKeyDown);
    return () => {
      target.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyHandlers, isActive, ref]);
}

/**
 * Hook to handle click outside of an element
 * @param {React.RefObject} ref - Ref to the element to detect clicks outside of
 * @param {Function} handler - Handler function to call when a click outside is detected
 * @param {boolean} [isActive=true] - Whether the click outside listener should be active
 */
export function useClickOutside(ref, handler, isActive = true) {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, isActive]);
}
