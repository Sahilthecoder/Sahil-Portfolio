import React, { Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/ModernNavbar/Navbar';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Lazy load components with Suspense fallback
const Home = React.lazy(() => import('./pages/Home.jsx'));
const AboutExperience = React.lazy(() => import('./pages/AboutExperience.jsx'));
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
        <div id="main-content" className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200" tabIndex="0">
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
  const pageRef = useRef(null);
  const isInitialLoad = useRef(true);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300" ref={pageRef}>
      <Navbar />
      <ErrorBoundary>
        <div className="pt-16 m-0">
          <AnimatePresence mode="wait" initial={false}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutExperience initialSection="about" />} />
                <Route path="/experience" element={<AboutExperience initialSection="experience" />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects/ai-daily-decision-system" element={<AIDailyDecisionSystem />} />
                <Route path="/projects/smart-automation" element={<SmartAutomation />} />
                <Route path="/projects/zomato-analysis" element={<ZomatoAnalysis />} />
                <Route path="/projects/bansal-supermarket" element={<BansalSupermarket />} />
                <Route path="/projects/ekam-attendance" element={<EkamAttendance />} />
                <Route path="/projects/retail-cash-flow" element={<RetailCashFlow />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
          <Footer />
        </div>
      </ErrorBoundary>
    </div>
  );
}

// Create a custom history with future flags for React Router v7
const history = createHashHistory();

// Set future flags for React Router v7
const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
  v7_throwAbortReason: true
};

// Wrapper component to provide router context
const AppWrapper = () => {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <HistoryRouter 
          history={history}
          future={routerFuture}
        >
          <ScrollToTop />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </HistoryRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default AppWrapper;
