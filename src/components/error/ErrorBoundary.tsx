import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../../components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnChange?: any[];
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree.
 * Logs those errors and displays a fallback UI when an error occurs.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error,
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset the error boundary when resetOnChange dependencies change
    if (
      this.state.hasError &&
      this.props.resetOnChange &&
      JSON.stringify(prevProps.resetOnChange) !== JSON.stringify(this.props.resetOnChange)
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                We're sorry, but an unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
              </p>
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md text-left">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  Error Details
                </h3>
                <div className="mt-2 text-xs text-red-600 dark:text-red-400 font-mono overflow-auto max-h-40">
                  {this.state.error?.toString()}
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                      Show component stack
                    </summary>
                    <pre className="mt-2 text-xs text-gray-500 dark:text-gray-400 overflow-auto p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <Button
                  onClick={this.resetErrorBoundary}
                  variant="primary"
                  className="inline-flex items-center"
                >
                  Try again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="secondary"
                  className="inline-flex items-center"
                >
                  Refresh page
                </Button>
                <Button
                  as="a"
                  href="/"
                  variant="ghost"
                  className="inline-flex items-center"
                >
                  Go to home
                </Button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  If the problem persists, please contact support at{' '}
                  <a 
                    href="mailto:support@example.com" 
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    support@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for error boundaries
export function withErrorBoundary<T>(
  WrappedComponent: React.ComponentType<T>,
  errorBoundaryProps?: Partial<Props>
) {
  return (props: T) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...(props as any)} />
    </ErrorBoundary>
  );
}

// Error boundary context for functional components
export const ErrorBoundaryContext = React.createContext<{
  didCatch: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
}>({
  didCatch: false,
  error: null,
  errorInfo: null,
  resetErrorBoundary: () => {},
});

// Error boundary provider for functional components
export const ErrorBoundaryProvider: React.FC<{
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo, reset: () => void) => ReactNode;
}> = ({ children, fallback }) => {
  const [errorState, setErrorState] = React.useState<{
    error: Error | null;
    errorInfo: ErrorInfo | null;
  }>({ error: null, errorInfo: null });

  const resetErrorBoundary = () => {
    setErrorState({ error: null, errorInfo: null });
  };

  if (errorState.error) {
    if (fallback) {
      return (
        <ErrorBoundaryContext.Provider
          value={{
            didCatch: true,
            error: errorState.error,
            errorInfo: errorState.errorInfo,
            resetErrorBoundary,
          }}
        >
          {fallback(errorState.error, errorState.errorInfo!, resetErrorBoundary)}
        </ErrorBoundaryContext.Provider>
      );
    }
    
    return (
      <ErrorBoundaryContext.Provider
        value={{
          didCatch: true,
          error: errorState.error,
          errorInfo: errorState.errorInfo,
          resetErrorBoundary,
        }}
      >
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h3 className="text-red-800 dark:text-red-200 font-medium">
            Something went wrong
          </h3>
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">
            {errorState.error.message}
          </p>
          <button
            onClick={resetErrorBoundary}
            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </ErrorBoundaryContext.Provider>
    );
  }

  return (
    <ErrorBoundaryContext.Provider
      value={{
        didCatch: false,
        error: null,
        errorInfo: null,
        resetErrorBoundary,
      }}
    >
      {children}
    </ErrorBoundaryContext.Provider>
  );
};

// Hook to use the error boundary context
export const useErrorBoundary = () => {
  return React.useContext(ErrorBoundaryContext);
};
