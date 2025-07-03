import React, { useEffect, Suspense, lazy, startTransition } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Lazy load all page components with prefetching
const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home'));
const About = lazy(() => import(/* webpackPrefetch: true */ './pages/About'));
const Experience = lazy(() => import(/* webpackPrefetch: true */ './pages/Experience'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './pages/Contact'));
const Projects = lazy(() => import(/* webpackPrefetch: true */ './pages/Projects'));
const NotFound = lazy(() => import(/* webpackPrefetch: true */ './pages/NotFound'));

// Lazy load layout with a loading state and error boundary
const Layout = lazy(() => 
  import('./components/Layout').catch(() => ({
    default: () => (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400">
          Failed to load the layout. Please refresh the page.
        </div>
      </div>
    )
  }))
);

// Create a loading component with smooth transitions
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
      <div className="text-gray-500 dark:text-gray-400">Loading...</div>
    </div>
  </div>
);

// Handle GitHub Pages 404 on direct navigation
const RedirectToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (window.location.hash) {
      const path = window.location.hash.replace('#', '');
      if (path) {
        window.location.href = `/${path}`;
      }
    }
  }, [location]);

  return <Navigate to="/" replace />;
};

// Lazy load project components with prefetching and error boundaries
const withLazyLoad = (importFunc) => {
  // Start preloading the component
  const loadComponent = () => {
    // Use startTransition to allow React to handle the loading state
    startTransition(() => {
      importFunc().catch(() => {
        // Handle import errors gracefully
        console.error('Failed to load component');
      });
    });
    return importFunc();
  };
  
  return lazy(loadComponent);
};

// Lazy load project components with better error handling
const BansalSupermarket = withLazyLoad(() => 
  import(/* webpackPrefetch: true */ './pages/projects/BansalSupermarket')
);

const ZomatoAnalysis = withLazyLoad(() => 
  import(/* webpackPrefetch: true */ './pages/projects/ZomatoAnalysis')
);

const EkamAttendance = withLazyLoad(() => 
  import(/* webpackPrefetch: true */ './pages/projects/EkamAttendance')
);

const RetailCashFlow = withLazyLoad(() => 
  import(/* webpackPrefetch: true */ './pages/projects/RetailCashFlow')
);

const ProductSalesDashboard = withLazyLoad(() => 
  import(/* webpackPrefetch: true */ './pages/projects/ProductSalesDashboard')
);

const SnapeSentimentAnalysis = withLazyLoad(() => 
  import(/* webpackPrefetch: true */ './pages/projects/SnapeSentimentAnalysis')
);

// This component handles scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait">
        <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Suspense fallback={<LoadingFallback />}>
              <Layout />
            </Suspense>
          }>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            
            {/* Project Detail Routes with individual Suspense boundaries */}
            <Route path="projects/bansal-supermarket" element={
              <Suspense fallback={<LoadingFallback />}>
                <BansalSupermarket />
              </Suspense>
            } />
            <Route path="projects/zomato-analysis" element={
              <Suspense fallback={<LoadingFallback />}>
                <ZomatoAnalysis />
              </Suspense>
            } />
            <Route path="projects/ekam-attendance" element={
              <Suspense fallback={<LoadingFallback />}>
                <EkamAttendance />
              </Suspense>
            } />
            <Route path="projects/retail-cash-flow" element={
              <Suspense fallback={<LoadingFallback />}>
                <RetailCashFlow />
              </Suspense>
            } />
            <Route path="projects/product-sales-dashboard" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProductSalesDashboard />
              </Suspense>
            } />
            <Route path="projects/snape-sentiment-analysis" element={
              <Suspense fallback={<LoadingFallback />}>
                <SnapeSentimentAnalysis />
              </Suspense>
            } />
            
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
          
          {/* Handle GitHub Pages 404 on direct navigation */}
          <Route path="/Sahil-Portfolio" element={<RedirectToHash />} />
          <Route path="/Sahil-Portfolio/*" element={<RedirectToHash />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
