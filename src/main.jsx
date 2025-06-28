import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n'; // Initialize i18n for internationalization
import './index.css'; // Import the CSS file
import './utils/registerServiceWorker'; // Register service worker for PWA

// Create a basic error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '32rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ marginBottom: '1rem' }}>We're working on fixing this issue. Please try again later.</p>
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
  useEffect(() => {
    // This will be shown when the beforeinstallprompt event fires
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <button
      id="install-button"
      className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg z-50 hidden"
      aria-label="Install app"
      title="Install this app on your device"
    >
      Install App
    </button>
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
