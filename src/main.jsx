import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { BASE_PATH } from './utils/paths';
import './reset.css';
import './App.css';
import './styles/globals.css';

// Set the base URL for GitHub Pages
const baseUrl = import.meta.env.VITE_IS_GITHUB_PAGES === 'true' ? '/Sahil-Portfolio' : '';

// Get the root element
const container = document.getElementById('root');

// Error handling for missing root element
if (!container) {
  const errorMsg =
    'Critical Error: Failed to find the root element. Please check if public/index.html has a div with id="root"';
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
  document.body.appendChild(errorDiv);
  throw new Error(errorMsg);
}

// Function to get the correct service worker URL and scope
const getSwConfig = () => {
  if (import.meta.env.DEV) {
    // In development, don't register service worker by default
    return null;
  }

  // In production, use the full URL with the correct base path
  const base = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
  const swUrl = `${window.location.origin}${base}sw.js`;

  return {
    url: swUrl,
    scope: base,
  };
};

// Register service worker in production
if ('serviceWorker' in navigator) {
  const swConfig = getSwConfig();

  if (swConfig) {
    const { url: swUrl, scope } = swConfig;

    console.log('Service Worker URL:', swUrl);
    console.log('Service Worker Scope:', scope);

    const registerServiceWorker = () => {
      if (!swUrl) return;

      navigator.serviceWorker
        .register(swUrl, { scope })
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);

          // Check for updates every hour
          setInterval(
            () => {
              registration.update().catch((err) => {
                console.log('ServiceWorker update check failed:', err);
              });
            },
            60 * 60 * 1000
          );
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed: ', error);
        });
    };

    // Unregister any existing service workers first
    const unregisterServiceWorkers = () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          console.log('ServiceWorker unregistered:', registration);
        }
      });
    };

    // Start with a clean slate
    window.addEventListener('load', () => {
      if (import.meta.env.PROD) {
        unregisterServiceWorkers();
        registerServiceWorker();
      } else {
        // In development, unregister any existing service workers
        unregisterServiceWorkers();
      }
    });
  } else if (import.meta.env.DEV) {
    // In development, ensure no service workers are registered
    window.addEventListener('load', () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          console.log('Development: ServiceWorker unregistered:', registration);
        }
      });
    });
  }
}

// Enhanced Error Boundary with better error handling
export class ErrorBoundary extends React.Component {
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
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We're sorry, but an unexpected error occurred. The team has been notified.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
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

// Set the base URL in a global variable for debugging
window.__BASE_URL__ = baseUrl || '/';
console.log('Application base URL:', window.__BASE_URL__);

// Import ErrorBoundary from Sentry service
import { ErrorBoundary } from './services/sentry';

// Create a root and render the app
const root = createRoot(container);

try {
  root.render(
    <React.StrictMode>
      <HashRouter basename={baseUrl}>
        <ErrorBoundary 
          fallback={({ error, componentStack }) => {
            console.error('Error in App:', error, componentStack);
            return (
              <div style={{
                padding: '20px', 
                color: 'red',
                maxWidth: '800px',
                margin: '0 auto',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap'
              }}>
                <h1>⚠️ Something went wrong</h1>
                <p>{error?.toString()}</p>
                <details style={{ marginTop: '20px' }}>
                  <summary>Component Stack</summary>
                  <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '4px',
                    overflowX: 'auto'
                  }}>
                    {componentStack}
                  </pre>
                </details>
              </div>
            );
          }}
        >
          <App />
        </ErrorBoundary>
      </HashRouter>
    </React.StrictMode>
  );
  console.log('React application mounted successfully');
} catch (error) {
  console.error('Fatal error rendering app:', error);
  root.render(
    <div style={{
      padding: '40px', 
      color: 'white',
      backgroundColor: '#dc2626',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      lineHeight: '1.6'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>🚨 Critical Error</h1>
      <p style={{ 
        padding: '15px', 
        backgroundColor: 'rgba(0,0,0,0.2)', 
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        {error?.toString()}
      </p>
      <p>Please check the browser console for more details.</p>
    </div>
  );
}
