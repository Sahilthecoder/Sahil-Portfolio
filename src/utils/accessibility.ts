/**
 * Generates a unique ID for accessibility attributes
 * @param prefix - Prefix for the ID (default: 'a11y')
 * @returns A unique ID string
 */
export const generateA11yId = (prefix: string = 'a11y'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Determines if an element is focusable
 * @param element - The element to check
 * @returns Boolean indicating if the element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  if (!element) return false;
  
  // Check for natively focusable elements
  if (
    element.tabIndex >= 0 ||
    element.hasAttribute('tabindex') ||
    element.hasAttribute('contenteditable')
  ) {
    return true;
  }
  
  // Check for natively focusable elements with disabled state
  if (
    (element instanceof HTMLAnchorElement && element.href) ||
    (element instanceof HTMLButtonElement && !element.disabled) ||
    (element instanceof HTMLInputElement && element.type !== 'hidden' && !element.disabled) ||
    (element instanceof HTMLSelectElement && !element.disabled) ||
    (element instanceof HTMLTextAreaElement && !element.disabled) ||
    (element instanceof HTMLIFrameElement) ||
    (element instanceof HTMLObjectElement) ||
    (element instanceof HTMLEmbedElement) ||
    (element.hasAttribute('tabindex') && element.getAttribute('tabindex') !== '-1')
  ) {
    return true;
  }
  
  return false;
};

/**
 * Gets all focusable elements within a container
 * @param container - The container element to search within
 * @returns Array of focusable elements
 */
export const getFocusableElements = (
  container: HTMLElement | Document = document
): HTMLElement[] => {
  if (!container) return [];
  
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex^="-"])',
    '[contenteditable]',
    'iframe',
    'object',
    'embed',
    'area[href]',
    'audio[controls]',
    'video[controls]',
    '[tabindex]:not([disabled])',
  ];
  
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))).filter(
    (el) => {
      // Filter out elements that are not visible
      if (el.offsetParent === null) return false;
      
      // Filter out elements with display: none or visibility: hidden
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      
      // Filter out elements with aria-hidden="true"
      if (el.getAttribute('aria-hidden') === 'true') return false;
      
      return true;
    }
  );
};

/**
 * Traps focus within a container element
 * @param container - The container element to trap focus within
 * @param event - The keyboard event
 */
export const trapTabKey = (container: HTMLElement, event: KeyboardEvent): void => {
  if (event.key !== 'Tab') return;
  
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return;
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  // If only one focusable element, prevent tabbing out
  if (focusableElements.length === 1) {
    event.preventDefault();
    firstFocusable.focus();
    return;
  }
  
  // If shifting + tab from first focusable element, move to last
  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
  } 
  // If tabbing from last focusable element, move to first
  else if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
};

/**
 * Adds keyboard event listeners to an element
 * @param element - The element to add event listeners to
 * @param eventHandlers - Object mapping event types to handler functions
 * @returns A function to remove the event listeners
 */
export const addKeyboardEvents = (
  element: HTMLElement,
  eventHandlers: Record<string, (event: KeyboardEvent) => void>
): (() => void) => {
  const eventTypes = Object.keys(eventHandlers);
  
  eventTypes.forEach((eventType) => {
    element.addEventListener(eventType, eventHandlers[eventType] as EventListener);
  });
  
  return () => {
    eventTypes.forEach((eventType) => {
      element.removeEventListener(eventType, eventHandlers[eventType] as EventListener);
    });
  };
};

/**
 * Gets the next focusable element in the DOM
 * @param currentElement - The current focused element
 * @param direction - The direction to search ('forward' or 'backward')
 * @returns The next focusable element or null if none found
 */
export const getNextFocusableElement = (
  currentElement: HTMLElement,
  direction: 'forward' | 'backward' = 'forward'
): HTMLElement | null => {
  if (!currentElement || !currentElement.ownerDocument) return null;
  
  const allFocusable = getFocusableElements(currentElement.ownerDocument.body);
  if (allFocusable.length === 0) return null;
  
  const currentIndex = allFocusable.indexOf(currentElement);
  
  if (direction === 'forward') {
    // Return the next focusable element or loop to the first
    return currentIndex < allFocusable.length - 1 
      ? allFocusable[currentIndex + 1] 
      : allFocusable[0];
  } else {
    // Return the previous focusable element or loop to the last
    return currentIndex > 0 
      ? allFocusable[currentIndex - 1] 
      : allFocusable[allFocusable.length - 1];
  }
};

/**
 * Makes an element focusable and manages its tabindex
 * @param element - The element to make focusable
 * @param isFocusable - Whether the element should be focusable
 * @param tabIndex - The tabindex value to set (default: 0)
 */
export const setFocusable = (
  element: HTMLElement,
  isFocusable: boolean,
  tabIndex: number = 0
): void => {
  if (!element) return;
  
  if (isFocusable) {
    element.setAttribute('tabindex', tabIndex.toString());
  } else {
    element.setAttribute('tabindex', '-1');
  }
};

/**
 * Focuses the first focusable element within a container
 * @param container - The container element to search within
 * @returns The focused element or null if none found
 */
export const focusFirstFocusable = (container: HTMLElement): HTMLElement | null => {
  const focusable = getFocusableElements(container);
  if (focusable.length > 0) {
    focusable[0].focus();
    return focusable[0];
  }
  return null;
};

/**
 * Focuses the last focusable element within a container
 * @param container - The container element to search within
 * @returns The focused element or null if none found
 */
export const focusLastFocusable = (container: HTMLElement): HTMLElement | null => {
  const focusable = getFocusableElements(container);
  if (focusable.length > 0) {
    const last = focusable[focusable.length - 1];
    last.focus();
    return last;
  }
  return null;
};

/**
 * Checks if an element is currently visible in the viewport
 * @param element - The element to check
 * @param threshold - The percentage of the element that must be visible (0-1)
 * @returns Boolean indicating if the element is in the viewport
 */
export const isInViewport = (element: HTMLElement, threshold: number = 0.5): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  // Calculate the visible area of the element
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  
  // Calculate the visible area percentage
  const visibleArea = visibleHeight * visibleWidth;
  const elementArea = rect.width * rect.height;
  const visibleRatio = elementArea > 0 ? visibleArea / elementArea : 0;
  
  return visibleRatio >= threshold;
};

/**
 * Scrolls an element into view if it's not already visible
 * @param element - The element to scroll into view
 * @param options - ScrollIntoView options
 */
export const scrollIntoViewIfNeeded = (
  element: HTMLElement,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'nearest', inline: 'nearest' }
): void => {
  if (!element || isInViewport(element)) return;
  element.scrollIntoView(options);
};

/**
 * Adds a visually hidden class to an element
 * @param element - The element to hide visually
 * @param hide - Whether to hide the element (default: true)
 */
export const setVisuallyHidden = (element: HTMLElement, hide: boolean = true): void => {
  if (!element) return;
  
  if (hide) {
    element.classList.add('sr-only');
  } else {
    element.classList.remove('sr-only');
  }
};

/**
 * Toggles the visibility of an element for screen readers
 * @param element - The element to toggle
 * @param isVisible - Whether the element should be visible to screen readers
 */
export const setAriaHidden = (element: HTMLElement, isVisible: boolean): void => {
  if (!element) return;
  
  if (isVisible) {
    element.removeAttribute('aria-hidden');
  } else {
    element.setAttribute('aria-hidden', 'true');
  }
};

/**
 * Sets the ARIA live region attributes on an element
 * @param element - The element to set as a live region
 * @param options - Live region options
 */
export const setLiveRegion = (
  element: HTMLElement,
  options: {
    atomic?: boolean;
    busy?: boolean;
    relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';
    live?: 'assertive' | 'polite' | 'off';
  } = {}
): void => {
  if (!element) return;
  
  const {
    atomic = false,
    busy = false,
    relevant = 'additions text',
    live = 'polite',
  } = options;
  
  element.setAttribute('aria-atomic', atomic.toString());
  element.setAttribute('aria-busy', busy.toString());
  element.setAttribute('aria-relevant', relevant);
  element.setAttribute('aria-live', live);
};

/**
 * Announces a message to screen readers
 * @param message - The message to announce
 * @param priority - The priority of the announcement ('polite' or 'assertive')
 */
export const announce = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.className = 'sr-only';
  
  // Force a reflow to ensure the element is in the DOM
  announcement.textContent = '';
  document.body.appendChild(announcement);
  
  // Set the message and remove it after a short delay
  setTimeout(() => {
    announcement.textContent = message;
    
    // Remove the announcement after it's been read
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }, 100);
};
