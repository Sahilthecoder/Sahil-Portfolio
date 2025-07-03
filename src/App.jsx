import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

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

// Lazy load project components for better performance
const BansalSupermarket = lazy(() => import('./pages/projects/BansalSupermarket'));
const ZomatoAnalysis = lazy(() => import('./pages/projects/ZomatoAnalysis'));
const EkamAttendance = lazy(() => import('./pages/projects/EkamAttendance'));
const RetailCashFlow = lazy(() => import('./pages/projects/RetailCashFlow'));
const ProductSalesDashboard = lazy(() => import('./pages/projects/ProductSalesDashboard'));
const SnapeSentimentAnalysis = lazy(() => import('./pages/projects/SnapeSentimentAnalysis'));

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
    <AnimatePresence mode="wait" key={location.pathname}>
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Handle GitHub Pages 404 redirect */}
        <Route path="/404.html" element={<RedirectToHash />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
          
          {/* Project routes with Suspense for lazy loading */}
          <Route path="projects/bansal-supermarket" element={
            <Suspense fallback={<LoadingScreen />}>
              <BansalSupermarket />
            </Suspense>
          } />
          <Route path="projects/zomato-analysis" element={
            <Suspense fallback={<LoadingScreen />}>
              <ZomatoAnalysis />
            </Suspense>
          } />
          <Route path="projects/ekam-attendance" element={
            <Suspense fallback={<LoadingScreen />}>
              <EkamAttendance />
            </Suspense>
          } />
          <Route path="projects/retail-cash-flow" element={
            <Suspense fallback={<LoadingScreen />}>
              <RetailCashFlow />
            </Suspense>
          } />
          <Route path="projects/product-sales" element={
            <Suspense fallback={<LoadingScreen />}>
              <ProductSalesDashboard />
            </Suspense>
          } />
          <Route path="projects/snape-sentiment-analysis" element={
            <Suspense fallback={<LoadingScreen />}>
              <SnapeSentimentAnalysis />
            </Suspense>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
