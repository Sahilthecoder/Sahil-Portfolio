import React, { Suspense, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import FaviconManager from './components/FaviconManager';
import ModernNavbar from './components/ModernNavbar/ModernNavbar';
import Footer from './components/Footer';

// Lazy load components with Suspense fallback
const Home = React.lazy(() => import('./pages/Home.jsx'));
const About = React.lazy(() => import('./pages/About.jsx'));
const Experience = React.lazy(() => import('./pages/Experience.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));
const Projects = React.lazy(() => import('./pages/Projects.jsx'));
const AIDailyDecisionSystem = React.lazy(() => import('./pages/projects/AIDailyDecisionSystem.jsx'));
const SmartAutomation = React.lazy(() => import('./pages/projects/SmartAutomation.jsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'));
const ZomatoAnalysis = React.lazy(() => import('./pages/projects/ZomatoAnalysis.jsx'));
const BansalSupermarket = React.lazy(() => import('./pages/projects/BansalSupermarket.jsx'));
const EkamAttendance = React.lazy(() => import('./pages/projects/EkamAttendance.jsx'));
const RetailCashFlow = React.lazy(() => import('./pages/projects/RetailCashFlow.jsx'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-xl font-medium text-gray-900 dark:text-white">Loading...</h2>
    </div>
  </div>
);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We're sorry, but an unexpected error occurred. Please try refreshing the page.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-left">
                <h3 className="font-medium text-red-800 dark:text-red-200">Error Details:</h3>
                <pre className="mt-2 text-sm text-red-700 dark:text-red-300 overflow-auto">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo?.componentStack && (
                  <details className="mt-3">
                    <summary className="text-sm font-medium text-red-700 dark:text-red-300 cursor-pointer">
                      Component Stack
                    </summary>
                    <pre className="mt-1 p-2 bg-black/10 dark:bg-white/10 rounded text-xs overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're not in the middle of a hash navigation
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

// Main App component
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  // Handle initial load with hash routing
  useEffect(() => {
    // Only run this on the client side and only once
    if (typeof window !== 'undefined' && !hasRedirected.current) {
      const { pathname, search, hash } = window.location;
      
      // If the URL has a hash, we need to handle it
      if (hash) {
        // Extract the path from the hash (remove the #)
        const path = hash.startsWith('#/') ? hash.substring(2) : hash.substring(1);
        
        // Only navigate if the path is not empty and doesn't match the current path
        if (path && path !== pathname + search) {
          navigate(path + search, { replace: true });
        }
      }
      
      // Mark that we've handled the redirect
      hasRedirected.current = true;
    }
  }, [navigate]);

  // Debug: Log the current location and path
  console.log('Current location:', location);
  console.log('Current path:', location.pathname);

  // Base path for GitHub Pages
  const basePath = import.meta.env.PROD ? '/Sahil-Portfolio' : '';
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <ModernNavbar />
      <ErrorBoundary>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path={`${basePath}/`} element={<Home />} />
              <Route path={`${basePath}/about`} element={<About />} />
              <Route path={`${basePath}/experience`} element={<Experience />} />
              <Route path={`${basePath}/projects`} element={<Projects />} />
              <Route path={`${basePath}/contact`} element={<Contact />} />
              <Route path={`${basePath}/projects/ai-daily-decision-system`} element={<AIDailyDecisionSystem />} />
              <Route path={`${basePath}/projects/smart-automation`} element={<SmartAutomation />} />
              <Route path={`${basePath}/projects/zomato-analysis`} element={<ZomatoAnalysis />} />
              <Route path={`${basePath}/projects/bansal-supermarket`} element={<BansalSupermarket />} />
              <Route path={`${basePath}/projects/ekam-attendance`} element={<EkamAttendance />} />
              <Route path={`${basePath}/projects/retail-cash-flow`} element={<RetailCashFlow />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

// Wrapper component to provide router context with future flags
const AppWrapper = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router
          basename="/Sahil-Portfolio"
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_throwAbortReason: true,
          }}
        >
          <ScrollToTop />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <FaviconManager />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default AppWrapper;
