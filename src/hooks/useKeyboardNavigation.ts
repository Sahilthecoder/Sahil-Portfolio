import { useEffect, useRef, MutableRefObject } from 'react';

interface UseKeyboardNavigationOptions {
  /**
   * Whether to trap focus within the container
   * @default true
   */
  trapFocus?: boolean;
  
  /**
   * Whether to restore focus to the previously focused element when unmounting
   * @default true
   */
  restoreFocus?: boolean;
  
  /**
   * Array of selectors for focusable elements within the container
   * @default ['a[href]', 'button:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex^="-"])']
   */
  focusableSelectors?: string[];
}

/**
 * Hook to manage keyboard navigation and focus within a component
 */
const useKeyboardNavigation = <T extends HTMLElement>(
  isActive: boolean = true,
  options: UseKeyboardNavigationOptions = {}
): MutableRefObject<T | null> => {
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);
  
  const {
    trapFocus = true,
    restoreFocus = true,
    focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex^="-"])',
    ],
  } = options;

  // Get all focusable elements within the container
  const getFocusableElements = (): HTMLElement[] => {
    if (!containerRef.current) return [];
    
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))
    ).filter(
      (el) => 
        el.offsetParent !== null && // Check if element is visible
        window.getComputedStyle(el).visibility !== 'hidden' &&
        window.getComputedStyle(el).display !== 'none' &&
        (el as any).disabled !== true
    );
  };

  // Set up focus trap
  useEffect(() => {
    if (!isActive || !trapFocus) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;
      
      firstFocusableElement.current = focusableElements[0];
      lastFocusableElement.current = focusableElements[focusableElements.length - 1];
      
      // If only one focusable element, prevent tabbing out
      if (focusableElements.length === 1) {
        event.preventDefault();
        focusableElements[0].focus();
        return;
      }
      
      // If shifting + tab from first focusable element, move to last
      if (event.shiftKey && document.activeElement === firstFocusableElement.current) {
        event.preventDefault();
        lastFocusableElement.current?.focus();
      } 
      // If tabbing from last focusable element, move to first
      else if (!event.shiftKey && document.activeElement === lastFocusableElement.current) {
        event.preventDefault();
        firstFocusableElement.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, trapFocus]);
  
  // Manage focus when component mounts/unmounts
  useEffect(() => {
    if (!isActive) return;
    
    // Store the currently focused element
    previousActiveElement.current = document.activeElement;
    
    // Focus the first focusable element when the component mounts
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const firstFocusable = focusableElements[0];
      // Use requestAnimationFrame to ensure the DOM is updated
      requestAnimationFrame(() => {
        firstFocusable.focus();
      });
    }
    
    // Restore focus when the component unmounts
    return () => {
      if (restoreFocus && previousActiveElement.current instanceof HTMLElement) {
        // Use requestAnimationFrame to ensure the DOM is updated
        requestAnimationFrame(() => {
          (previousActiveElement.current as HTMLElement).focus();
        });
      }
    };
  }, [isActive, restoreFocus]);
  
  // Handle focus management when the component is active
  useEffect(() => {
    if (!isActive) return;
    
    const handleFocusIn = (event: FocusEvent) => {
      if (!containerRef.current || !(event.target instanceof Node)) return;
      
      // If the focused element is not within our container, move focus to the first focusable element
      if (!containerRef.current.contains(event.target)) {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          event.preventDefault();
          focusableElements[0].focus();
        }
      }
    };
    
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isActive]);
  
  return containerRef;
};

export default useKeyboardNavigation;
