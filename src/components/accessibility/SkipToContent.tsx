import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface SkipToContentProps {
  targetId?: string;
  children?: React.ReactNode;
  className?: string;
}

const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = 'main-content',
  children = 'Skip to content',
  className = '',
}) => {
  const location = useLocation();
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);

  // Focus the skip link on route change
  useEffect(() => {
    if (skipLinkRef.current) {
      skipLinkRef.current.focus();
    }
  }, [location.pathname]);

  // Handle click on the skip link
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If main content ref is not set, find the element by ID
    if (!mainContentRef.current) {
      mainContentRef.current = document.getElementById(targetId);
    }
    
    const mainContent = mainContentRef.current;
    
    if (mainContent) {
      // Make the main content focusable
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      
      // Scroll to the main content with smooth behavior
      mainContent.scrollIntoView({ behavior: 'smooth' });
      
      // Remove the tabindex after focus is complete
      setTimeout(() => {
        mainContent.removeAttribute('tabindex');
      }, 1000);
    }
  };

  return (
    <a
      ref={skipLinkRef}
      href={`#${targetId}`}
      onClick={handleClick}
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-900 focus:border-2 focus:border-blue-600 focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </a>
  );
};

export default SkipToContent;
