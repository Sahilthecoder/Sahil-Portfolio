import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './App.css';
import './styles/globals.css';
import './pwa.jsx'; // Import PWA handler

// Enhanced Error Boundary with better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught by boundary:', error, errorInfo);
    // Log error to Sentry if configured
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
          <div className="text-center p-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="mb-4">
              Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            >
              Refresh Page
            </button>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

// Initialize the application
const container = document.getElementById('root');
const root = createRoot(container);

// Add install button to the DOM
const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleInstall = async (e) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      // Hide the install prompt
      moveToCorner();
    }
  };

  // Close handler that moves to corner
  const handleClose = (e) => {
    if (e) {
      e.stopPropagation();
    }
    moveToCorner();
  };

  // Function to move prompt to corner
  const moveToCorner = () => {
    const screen = document.getElementById('install-screen');
    if (screen) {
      // Remove show class to trigger exit animation
      screen.classList.remove('show');
      
      // After exit animation completes, add move-to-corner class and show again
      setTimeout(() => {
        screen.classList.add('move-to-corner');
        // Force reflow
        void screen.offsetHeight;
        screen.classList.add('show');
        
        // After corner animation completes, hide the prompt
        setTimeout(() => {
          screen.style.display = 'none';
          // Reset classes for next time
          screen.classList.remove('move-to-corner', 'show');
        }, 500);
      }, 300); // Wait for exit animation to complete
      
      // Save that we've shown the prompt
      localStorage.setItem('installPromptShown', 'true');
    }
  };

  // Set up the beforeinstallprompt event listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsVisible(true);
      
      // Show the install screen
      const installScreen = document.getElementById('install-screen');
      if (installScreen) {
        // Reset any previous styles and classes
        installScreen.style.display = 'flex';
        installScreen.classList.remove('move-to-corner');
        installScreen.classList.add('install-prompt-center');
        
        // Force reflow before adding show class to trigger animation
        void installScreen.offsetHeight;
        
        // Add show class to trigger enter animation
        installScreen.classList.add('show');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Auto-close after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="install-screen"
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-all duration-300"
      style={{ display: 'none', pointerEvents: 'none' }}
      data-inert="true"
      aria-hidden="true"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 ease-out shadow-2xl border border-gray-200 dark:border-gray-700"
        role="dialog"
        aria-modal="true"
        aria-label="Install App"
        tabIndex="-1"
        style={{ pointerEvents: 'auto' }}
        ref={(el) => {
          if (el) {
            // Focus the dialog when it appears
            const screen = document.getElementById('install-screen');
            if (screen && screen.style.display === 'flex') {
              setTimeout(() => el.focus(), 100);
            }
          }
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Install Portfolio App</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Add to your home screen for a better experience
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 p-1 -mt-2 -mr-2"
            onClick={handleClose}
            aria-label="Close"
            data-close-button="true"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
            onClick={handleClose}
            data-close-button="true"
          >
            Not Now
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={handleInstall}
            data-install-button="true"
          >
            Install App
          </button>
        </div>
      </div>
    </div>
  );
};

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <InstallButton />
    </ErrorBoundary>
  </StrictMode>
);

// Track page views for analytics
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
    page_title: document.title,
    page_path: window.location.pathname,
  });
}

// Track performance metrics
if ('performance' in window) {
  // Report on page load time
  window.addEventListener('load', () => {
    setTimeout(() => {
      const timing = window.performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page loaded in ${pageLoadTime}ms`);
      
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'Page Load',
          value: pageLoadTime,
          event_category: 'Performance',
        });
      }
    }, 0);
  });
}
