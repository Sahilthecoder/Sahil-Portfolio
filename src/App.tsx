import React, { Suspense, lazy, useEffect, useState, useCallback, ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { AIAssistantProvider } from './context/AIAssistantContext';
import LoadingScreen from './components/LoadingScreen';
import ThemeProvider from './context/ThemeContext';
import ModernNavbar from './components/ModernNavbar';
import AIAssistant from './components/AIAssistant/AIAssistant';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { FullPageSpinner, LoadingSpinner } from './components/ui/LoadingSpinner';
import Footer from './components/Footer';
import { preloadCriticalResources } from './utils/lazyLoad';
import './App.css';
import './styles/globals.css';

// Preload critical resources when this module loads
if (typeof window !== 'undefined') {
  preloadCriticalResources();
}

// Define a type for components with preload capability
type PreloadableComponent = ComponentType<any> & {
  preload: () => Promise<any>;
};

// Lazy load pages with preloading
const lazyWithPreload = (factory: () => Promise<{ default: React.ComponentType<any> }>): PreloadableComponent => {
  let LoadedComponent: React.ComponentType<any> | null = null;
  let factoryPromise: Promise<any> | null = null;

  const loadComponent = () => {
    if (!factoryPromise) {
      factoryPromise = factory().then(module => {
        LoadedComponent = module.default;
        return LoadedComponent;
      });
    }
    return factoryPromise;
  };

  const LazyComponent = (props: any) => {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      let isMounted = true;
      
      loadComponent().then(component => {
        if (isMounted) {
          setComponent(() => component);
          setIsLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    }, []);

    if (isLoading) {
      return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
    }

    return Component ? <Component {...props} /> : null;
  };

  // Add preload method to the component
  const ComponentWithPreload = LazyComponent as PreloadableComponent;
  ComponentWithPreload.preload = loadComponent;
  
  return ComponentWithPreload;
};

// Lazy load pages with preloading support
const Home = lazyWithPreload(() => import('./pages/Home'));
const About = lazyWithPreload(() => import('./pages/About'));
const Experience = lazyWithPreload(() => import('./pages/Experience'));
const Projects = lazyWithPreload(() => import('./pages/Projects'));
const Contact = lazyWithPreload(() => import('./pages/Contact'));
const NotFound = lazyWithPreload(() => import('./pages/NotFound'));
const TestRoute = lazyWithPreload(() => import('./pages/TestRoute'));

// Lazy load project sub-pages with preloading
const ZomatoAnalysis = lazyWithPreload(() => import('./pages/projects/ZomatoAnalysis'));
const BansalSupermarket = lazyWithPreload(() => import('./pages/projects/BansalSupermarket'));
const EkamAttendance = lazyWithPreload(() => import('./pages/projects/EkamAttendance'));
const RetailCashFlow = lazyWithPreload(() => import('./pages/projects/RetailCashFlow'));
const ProductSalesDashboard = lazyWithPreload(() => import('./pages/projects/ProductSalesDashboard'));
const SnapeSentimentAnalysis = lazyWithPreload(() => import('./pages/projects/SnapeSentimentAnalysis'));

// Preload routes when hovering over navigation links
const RoutePreloader = () => {
  const location = useLocation();
  const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());

  // Preload all routes when the app loads
  useEffect(() => {
    const routesToPreload = [
      'home', 'about', 'experience', 'projects', 'contact'
    ];
    
    routesToPreload.forEach(route => {
      if (!preloadedRoutes.has(route)) {
        switch (route) {
          case 'home': Home.preload(); break;
          case 'about': About.preload(); break;
          case 'experience': Experience.preload(); break;
          case 'projects': Projects.preload(); break;
          case 'contact': Contact.preload(); break;
        }
        setPreloadedRoutes(prev => new Set([...prev, route]));
      }
    });
  }, [preloadedRoutes]);

  // Preload project pages when on the projects page
  useEffect(() => {
    if (location.pathname === '/projects' && !preloadedRoutes.has('project-pages')) {
      [
        ZomatoAnalysis,
        BansalSupermarket,
        EkamAttendance,
        RetailCashFlow,
        ProductSalesDashboard,
        SnapeSentimentAnalysis
      ].forEach(component => component.preload());
      
      setPreloadedRoutes(prev => new Set([...prev, 'project-pages']));
    }
  }, [location.pathname, preloadedRoutes]);

  return null;
};

const App = () => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts with font-display: swap and better error handling
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Check if the browser supports the Font Loading API
        if (!('fonts' in document)) {
          console.warn('Font Loading API not supported, using system fonts');
          setFontLoaded(true);
          return;
        }

        // Use system fonts as fallback
        const systemFonts = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        
        // Set system fonts as default
        document.documentElement.style.setProperty('--font-sans', systemFonts);
        
        // Try to load the custom font, but don't block rendering if it fails
        try {
          // Use Google Fonts for better reliability
          const link = document.createElement('link');
          link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
          link.rel = 'stylesheet';
          
          // Set up font loading
          const fontFace = new FontFace(
            'Inter',
            'local("Inter"), local("Inter-Regular")',
            { 
              weight: '400',
              style: 'normal',
              display: 'swap',
            }
          );
          
          // Add the link to the document
          document.head.appendChild(link);
          
          // Wait for the font to load or timeout after 3 seconds
          await Promise.race([
            fontFace.load(),
            new Promise(resolve => setTimeout(resolve, 3000))
          ]);
          
          // If we got here, the font loaded successfully
          document.fonts.add(fontFace);
          document.documentElement.style.setProperty('--font-sans', '"Inter", ' + systemFonts);
          
          console.log('Custom fonts loaded successfully');
        } catch (error) {
          console.warn('Error loading custom fonts, using system fonts', error);
          // Already using system fonts by default
        }
        
        setFontLoaded(true);
      } catch (error) {
        console.warn('Error in font loading process:', error);
        // Ensure the app continues to render
        setFontLoaded(true);
      }
    };

    // Don't block the initial render for fonts
    const timer = setTimeout(() => {
      if (!fontLoaded) {
        console.warn('Font loading taking too long, proceeding without custom fonts');
        setFontLoaded(true);
      }
    }, 1000); // 1 second timeout

    loadFonts();
    
    return () => clearTimeout(timer);
  }, [fontLoaded]);

  // Suppress specific React Router warnings
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (message) => {
      if (!message.includes('React Router Future Flag Warning')) {
        originalWarn(message);
      }
    };
    
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  // Add body classes on mount and clean up on unmount
  useEffect(() => {
    const classes = [
      'min-h-screen',
      'bg-light-bg',
      'dark:bg-dark-bg',
      'text-light-text-body',
      'dark:text-dark-text-body',
      'antialiased',
      'font-sans',
    ];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);

  // Set up loading timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen until fonts and initial data are loaded
  if (loading || !fontLoaded) {
    return (
      <>
        <Helmet>
          <title>Loading...</title>
          <meta name="description" content="Loading portfolio..." />
        </Helmet>
        <LoadingScreen />
      </>
    );
  }

  // Error boundary will handle errors in the app
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h1>
          <p className="mb-6">
            We're having trouble loading the application. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            aria-label="Refresh page"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

    return (
      <ThemeProvider>
        <div className="app">
          <AIAssistantProvider>
            <>
              <RoutePreloader />
              <div className="min-h-screen flex flex-col">
                <ModernNavbar />
                <main className="flex-grow" id="main-content" tabIndex={-1}>
                  <ErrorBoundary 
                    fallback={
                      <div className="container mx-auto p-6">
                        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                        <p className="mb-4">An error occurred while loading this page. Please try again later.</p>
                        <button 
                          onClick={() => window.location.reload()} 
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Reload Page
                        </button>
                      </div>
                    }
                  >
                    <Suspense 
                      fallback={
                        <div className="flex items-center justify-center min-h-[60vh]">
                          <LoadingSpinner size="lg" />
                        </div>
                      }
                    >
                      <Routes>
                        <Route 
                          path="/" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <Home />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/about" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <About />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/experience" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <Experience />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/projects" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <Projects />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/projects/zomato-analysis" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <ZomatoAnalysis />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/projects/bansal-supermarket" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <BansalSupermarket />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/projects/ekam-attendance" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <EkamAttendance />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/projects/retail-cash-flow" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <RetailCashFlow />
                            </Suspense>
                          } 
                        />
                        <Route
                          path="/projects/product-sales-dashboard"
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <ProductSalesDashboard />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/projects/snape-sentiment-analysis"
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <SnapeSentimentAnalysis />
                            </Suspense>
                          }
                        />
                        <Route 
                          path="/contact" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <Contact />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="/test" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <TestRoute />
                            </Suspense>
                          } 
                        />
                        <Route 
                          path="*" 
                          element={
                            <Suspense fallback={<FullPageSpinner />}>
                              <NotFound />
                            </Suspense>
                          } 
                        />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                  <AIAssistant />
                  <Toaster 
                    position="bottom-right" 
                    toastOptions={{
                      duration: 5000,
                      style: {
                        background: 'var(--bg-color)',
                        color: 'var(--text-color)',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)'
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
                    }}
                  />
                </main>
                <Footer />
              </div>
            </>
          </AIAssistantProvider>
        </div>
      </ThemeProvider>
    );
};

export default App;
