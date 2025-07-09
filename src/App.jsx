import React, { Suspense, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import './styles/backgrounds.css';
import FaviconManager from './components/FaviconManager';
import ModernNavbar from './components/ModernNavbar/ModernNavbar';
import Footer from './components/Footer';

// Import components
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import AIDailyDecisionSystem from './pages/projects/AIDailyDecisionSystem';
import SmartAutomation from './pages/projects/SmartAutomation';
import NotFound from './pages/NotFound';
import ZomatoAnalysis from './pages/projects/ZomatoAnalysis';
import BansalSupermarket from './pages/projects/BansalSupermarket';
import EkamAttendance from './pages/projects/EkamAttendance';
import RetailCashFlow from './pages/projects/RetailCashFlow';

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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We're having trouble loading this page. Please try refreshing the page or come back later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

function App() {
  // Get the base URL from environment variables or use an empty string for development
  const basename = import.meta.env.BASE_URL || '';
  
  // Handle initial page load with hash-based routing
  useEffect(() => {
    const handleInitialLoad = () => {
      const path = window.location.hash.replace(/^#\/?/, '/');
      if (path && path !== '/') {
        window.location.href = `${basename}${path}`;
      }
    };
    
    handleInitialLoad();
  }, [basename]);
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <FaviconManager />
          <Router basename={basename} hashType="noslash">
            <ModernNavbar />
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingFallback />}>
                <main>
                  <Routes>
                  <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                  <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                  <Route path="/experience" element={<ErrorBoundary><Experience /></ErrorBoundary>} />
                  <Route path="/projects" element={<ErrorBoundary><Projects /></ErrorBoundary>} />
                  {/* Project routes */}
                  <Route path="/projects/zomato-expansion" element={<ErrorBoundary><ZomatoAnalysis /></ErrorBoundary>} />
                  <Route path="/projects/bansal-supermarket" element={<ErrorBoundary><BansalSupermarket /></ErrorBoundary>} />
                  <Route path="/projects/ekam-attendance" element={<ErrorBoundary><EkamAttendance /></ErrorBoundary>} />
                  <Route path="/projects/cash-flow-dashboard" element={<ErrorBoundary><RetailCashFlow /></ErrorBoundary>} />
                  <Route path="/projects/ai-daily-decision-system" element={<ErrorBoundary><AIDailyDecisionSystem /></ErrorBoundary>} />
                  <Route path="/projects/smart-automation" element={<ErrorBoundary><SmartAutomation /></ErrorBoundary>} />
                  
                  {/* Catch-all route for any other project paths */}
                  <Route path="/projects/*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
                  <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
                  <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
                </Routes>
                </main>
                <Footer />
              </Suspense>
            </AnimatePresence>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
