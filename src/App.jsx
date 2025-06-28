import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AIAssistantProvider } from './context/AIAssistantContext';
import ThemeProvider from './context/ThemeContext';
import ModernNavbar from './components/ModernNavbar';
import AIAssistant from './components/AIAssistant/AIAssistant';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import './styles/globals.css'; // Import global styles

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load project pages
const ZomatoAnalysis = lazy(() => import('./pages/projects/ZomatoAnalysis'));
const BansalSupermarket = lazy(() => import('./pages/projects/BansalSupermarket'));
const EkamAttendance = lazy(() => import('./pages/projects/EkamAttendance'));
const RetailCashFlow = lazy(() => import('./pages/projects/RetailCashFlow'));
const ProductSalesDashboard = lazy(() => import('./pages/projects/ProductSalesDashboard'));
const SnapeSentimentAnalysis = lazy(() => import('./pages/projects/SnapeSentimentAnalysisNew'));
const TestRoute = lazy(() => import('./pages/TestRoute'));

// Main App component with routing
function App() {
  // Debug: Log when App component renders
  console.log('App rendering...');
  
  useEffect(() => {
    console.log('App mounted or updated');
    
    return () => {
      console.log('App unmounting...');
    };
  }, []);
  
  // Add theme class to body
  useEffect(() => {
    document.body.classList.add('min-h-screen', 'bg-light-bg', 'dark:bg-dark-bg', 'text-light-text-body', 'dark:text-dark-text-body');
    return () => {
      document.body.classList.remove('min-h-screen', 'bg-light-bg', 'dark:bg-dark-bg', 'text-light-text-body', 'dark:text-dark-text-body');
    };
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <AIAssistantProvider>
          <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
            <ModernNavbar />
            <AIAssistant />
            <main className="page-content flex-grow container mx-auto px-4 sm:px-6 py-8 bg-light-bg dark:bg-dark-bg">
              <ErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/zomato" element={<ZomatoAnalysis />} />
                    <Route path="/projects/bansal-supermarket" element={<BansalSupermarket />} />
                    <Route path="/projects/ekam-attendance" element={<EkamAttendance />} />
                    <Route path="/projects/retail-cash-flow" element={<RetailCashFlow />} />
                    <Route path="/projects/product-sales" element={<ProductSalesDashboard />} />
                    <Route path="/projects/snape-sentiment" element={<SnapeSentimentAnalysis />} />
                    <Route path="/test-route" element={<TestRoute />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <footer className="bg-dark-bg border-t border-dark-glass-border p-6 text-center">
              <p className="text-dark-text-muted">
                © {new Date().getFullYear()} Sahil's Portfolio. All rights reserved.
              </p>
            </footer>
          </div>
        </AIAssistantProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
