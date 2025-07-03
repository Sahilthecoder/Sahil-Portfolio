import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './reset.css'; // CSS reset
import './App.css';
import './styles/globals.css';
import ClientOnly from './components/ClientOnly';
import { AIAssistantProvider } from './context/AIAssistantContext';
import { ThemeProvider } from './context/ThemeContext';
import baseUrl from './config/baseUrl';

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
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

// Initialize the application
const container = document.getElementById('root');

// Set the base URL in a global variable for debugging
window.__BASE_URL__ = baseUrl;
console.log('Application base URL:', baseUrl);

// Ensure the container exists before creating the root
if (container) {
  const root = createRoot(container);
  
  // Wrap the app with necessary providers
  const AppWithProviders = () => (
    <StrictMode>
      <ErrorBoundary>
        <ClientOnly>
          <ThemeProvider>
            <HelmetProvider>
              <BrowserRouter basename={baseUrl.replace(/\/$/, '')}>
                <AIAssistantProvider>
                  <App />
                </AIAssistantProvider>
              </BrowserRouter>
            </HelmetProvider>
          </ThemeProvider>
        </ClientOnly>
      </ErrorBoundary>
    </StrictMode>
  );

  // Render the app
  root.render(<AppWithProviders />);
} else {
  const errorMsg = 'Critical Error: Failed to find the root element. Please check if public/index.html has a div with id="root"';
  console.error(errorMsg);
  document.body.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 2rem; color: #dc2626; max-width: 800px; margin: 0 auto;">
      <h1>Application Error</h1>
      <p>${errorMsg}</p>
      <p>If you're the site owner, please check the browser console for more details.</p>
    </div>
  `;
}

// Analytics and performance tracking can be added here when needed
