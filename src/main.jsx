import React from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Import CSS files - ensure these paths are correct
import './index.css';  // Main CSS file with Tailwind imports
import './styles/animations.css'; // Global animations and transitions

// Log environment for debugging
console.log('Environment:', import.meta.env.MODE);

// Set base URL from environment, window, or default to '/'
const envBaseUrl = typeof window !== 'undefined'
  ? import.meta.env.BASE_URL || window.basePath || ''
  : import.meta.env.BASE_URL || '';
const baseUrl = envBaseUrl.endsWith('/') ? envBaseUrl : `${envBaseUrl}/`;

// Create emotion cache with specific settings to avoid initialization issues
const emotionCache = createCache({
  key: 'css',
  prepend: false, // Changed to false to prevent potential conflicts with Tailwind
  stylisPlugins: []
});

// Ensure the cache is created before any React code runs
emotionCache.compat = true;

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
    
    // Persist error to localStorage for debugging
    try {
      localStorage.setItem('lastAppError', JSON.stringify({
        message: error.toString(),
        stack: errorInfo?.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }));
    } catch (e) {
      console.warn('Could not save error to localStorage:', e);
    }
    
    // Log error to Sentry if configured
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo?.componentStack,
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
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

// Get the root element
const container = document.getElementById('root');

// Error handling for missing root element
if (!container) {
  const errorMsg = 'Critical Error: Failed to find the root element. Please check if public/index.html has a div with id="root"';
  console.error(errorMsg);
  
  // Create a visible error message in the DOM if root element is missing
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.padding = '1rem';
  errorDiv.style.backgroundColor = '#fef2f2';
  errorDiv.style.color = '#b91c1c';
  errorDiv.style.borderBottom = '1px solid #fecaca';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.fontFamily = 'monospace';
  errorDiv.style.whiteSpace = 'pre';
  errorDiv.style.overflow = 'auto';
  errorDiv.style.maxHeight = '50vh';
  errorDiv.textContent = errorMsg;
  
  document.body.prepend(errorDiv);
  
  throw new Error(errorMsg);
}

// Create a root and render the app
const root = createRoot(container);

// Log the application base URL for debugging
console.log('Base URL:', baseUrl);

// Set the base URL in a global variable for debugging
window.__BASE_URL__ = baseUrl;

// Render the application
function renderApp() {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <CacheProvider value={emotionCache}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </CacheProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

// Initial render
renderApp();

// Enable hot module replacement if available
if (import.meta.hot) {
  import.meta.hot.accept('./App', () => {
    renderApp();
  });
}
