import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/react';
import { Replay } from '@sentry/replay';
import React, { Fragment, ReactNode, ReactElement } from 'react';
import type { ComponentType, Component, ErrorInfo } from 'react';
import { createElement } from 'react';

// Define JSX types
import type { JSX } from 'react/jsx-runtime';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    }
  }
}

declare global {
  interface Window {
    Sentry: typeof Sentry;
  }
}

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new BrowserTracing(),
    new Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracesSampler: (samplingContext: any) => {
    const environment = import.meta.env.MODE;
    if (environment === 'development') {
      return 1.0;
    }
    return 0.1;
  },
  replaysSampler: (samplingContext: any) => {
    const environment = import.meta.env.MODE;
    if (environment === 'development') {
      return 1.0;
    }
    return 0.1;
  },
});

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

export class SentryErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  state: any;
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
      user: {
        id: window.location.pathname,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      const container = createElement('div', {
        className: 'min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg'
      });
      const content = createElement('div', {
        className: 'text-center p-8'
      }, [
        createElement('h2', {
          className: 'text-2xl font-bold mb-4'
        }, 'Something went wrong'),
        createElement('p', {
          className: 'mb-4'
        }, 'Please try refreshing the page or contact support if the problem persists.'),
        createElement('button', {
          onClick: () => window.location.reload(),
          className: 'px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors'
        }, 'Refresh Page')
      ]);
      return createElement(Fragment, null, container, content);
    }

    return this.props.children;
  }
}

// HOC: Add error boundary with proper typing
export const withSentry = <P extends object>(Component: ComponentType<P>) => {
  return class SentryBoundary extends React.Component<P> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo.componentStack,
        },
        contexts: {
          react: {
            component: Component.name || 'AnonymousComponent',
            props: this.props as P,
          },
        },
      });
    }

    render() {
      const props = this.props as P;
      return React.createElement(SentryErrorBoundary, null, React.createElement(Component, props));
    }
  };
};
