import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AIAssistantProvider } from './context/AIAssistantContext';
import ThemeProvider from './context/ThemeContext';
import ModernNavbar from './components/ModernNavbar';
import AIAssistant from './components/AIAssistant/AIAssistant';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import './App.css';
import './styles/globals.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const TestRoute = lazy(() => import('./pages/TestRoute'));

// Lazy load project sub-pages
const ZomatoAnalysis = lazy(() => import('./pages/projects/ZomatoAnalysis'));
const BansalSupermarket = lazy(() => import('./pages/projects/BansalSupermarket'));
const EkamAttendance = lazy(() => import('./pages/projects/EkamAttendance'));
const RetailCashFlow = lazy(() => import('./pages/projects/RetailCashFlow'));
const ProductSalesDashboard = lazy(() => import('./pages/projects/ProductSalesDashboard'));
const SnapeSentimentAnalysis = lazy(() => import('./pages/projects/SnapeSentimentAnalysis'));

const App = () => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Suppress specific React Router warnings
  const originalWarn = console.warn;
  console.warn = (message) => {
    if (!message.includes('React Router Future Flag Warning')) {
      originalWarn(message);
    }
  };

  // Set global theme-related classes on body
  useEffect(() => {
    const classes = [
      'min-h-screen',
      'bg-light-bg',
      'dark:bg-dark-bg',
      'text-light-text-body',
      'dark:text-dark-text-body',
    ];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="text-center p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="mb-4">Please try refreshing the page or contact support if the problem persists.</p>
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

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider>
      <AIAssistantProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
            {/* Toast Notifications */}
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: 'white',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: '#3B82F6',
                    secondary: 'white',
                  },
                },
              }}
            />
            <ModernNavbar />
            <AIAssistant />
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <ErrorBoundary>
                  <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route 
                        path="/projects/zomato-analysis" 
                        element={
                          <ErrorBoundary>
                            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Zomato Analysis...</div>}>
                              <ZomatoAnalysis />
                            </Suspense>
                          </ErrorBoundary>
                        } 
                      />
                      <Route path="/projects/bansal-supermarket" element={<BansalSupermarket />} />
                      <Route path="/projects/ekam-attendance" element={<EkamAttendance />} />
                      <Route path="/projects/retail-cash-flow" element={<RetailCashFlow />} />
                      <Route path="/projects/product-sales" element={<ProductSalesDashboard />} />
                      <Route path="/projects/snape-sentiment-analysis" element={<SnapeSentimentAnalysis />} />
                      <Route path="/contact" element={
                        <Suspense fallback={<LoadingScreen />}>
                          <Contact />
                        </Suspense>
                      } />
                      <Route path="/test" element={<TestRoute />} />
                      <Route path="*" element={
                        <Suspense fallback={<LoadingScreen />}>
                          <NotFound />
                        </Suspense>
                      } />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </AIAssistantProvider>
    </ThemeProvider>
  );
};

export default App;
