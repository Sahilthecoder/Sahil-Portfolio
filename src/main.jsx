import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import './App.css';
import './styles/globals.css';
import ClientOnly from './components/ClientOnly';
import { AIAssistantProvider } from './context/AIAssistantContext';

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

// Ensure the container exists before creating the root
if (container) {
  const root = createRoot(container);
  
  // Wrap the app with necessary providers
  const AppWithProviders = () => (
    <ClientOnly>
      <ErrorBoundary>
        <StrictMode>
          <HelmetProvider>
            <BrowserRouter>
              <AIAssistantProvider>
                <App />
              </AIAssistantProvider>
            </BrowserRouter>
          </HelmetProvider>
        </StrictMode>
      </ErrorBoundary>
    </ClientOnly>
  );

  // Render the app
  root.render(<AppWithProviders />);
} else {
  console.error('Failed to find the root element');
}

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
