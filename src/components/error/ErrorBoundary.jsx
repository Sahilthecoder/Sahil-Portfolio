import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

/**
 * Error boundary component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null,
      lastLocation: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true,
      error: error,
      lastLocation: window.location.pathname
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  componentDidUpdate(prevProps, prevState) {
    // Reset error state when location changes
    if (this.state.hasError && this.state.lastLocation !== window.location.pathname) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        lastLocation: null
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      lastLocation: null
    });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div 
          className="error-boundary"
          style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1.6,
            color: '#1f2937'
          }}
        >
          <div 
            style={{
              backgroundColor: '#fee2e2',
              borderLeft: '4px solid #ef4444',
              padding: '1.5rem',
              borderRadius: '0.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <h2 
              style={{
                marginTop: 0,
                marginBottom: '0.5rem',
                color: '#991b1b',
                fontSize: '1.25rem',
                fontWeight: 600
              }}
            >
              Something went wrong
            </h2>
            <p style={{ margin: '0.5rem 0' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            
            {this.props.showDebugInfo && (
              <details 
                style={{ 
                  marginTop: '1rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}
              >
                <summary>View error details</summary>
                <div 
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    borderRadius: '0.25rem',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    overflowX: 'auto'
                  }}
                >
                  {this.state.error?.stack || 'No stack trace available'}
                  
                  {this.state.errorInfo?.componentStack && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Component Stack:</div>
                      <div>{this.state.errorInfo.componentStack}</div>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>

          <div>
            <p style={{ marginBottom: '1rem' }}>
              The application encountered an unexpected error. You can try to:
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d1d5db'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  /** Whether to show debug information when an error occurs */
  showDebugInfo: PropTypes.bool,
  /** Optional callback when an error is caught */
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  showDebugInfo: process.env.NODE_ENV !== 'production',
  onError: null,
};

/**
 * A component that resets the error boundary when the location changes
 */
const ErrorBoundaryWithRouter = (props) => {
  const location = useLocation();
  
  // This will cause the error boundary to reset when the location changes
  return <ErrorBoundary key={location.pathname} {...props} />;
};

export { ErrorBoundary as default, ErrorBoundaryWithRouter };

// Usage example:
/*
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary 
      showDebugInfo={process.env.NODE_ENV !== 'production'}
      onError={(error, errorInfo) => {
        // Log to error reporting service
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
*/
