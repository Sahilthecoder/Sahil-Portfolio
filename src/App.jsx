import React from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';

// Import components
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import NotFound from './pages/NotFound';

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-xl font-medium text-gray-900 dark:text-white">Loading...</h2>
    </div>
  </div>
);

// Router wrapper component for handling page transitions
function RouterWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        {/* Redirect any unmatched paths to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return <RouterWrapper />;
}

function App() {
  console.log('App component rendering...');

  // Test function to trigger an error
  const triggerError = () => {
    // This will be caught by the ErrorBoundary and reported to Sentry
    throw new Error('Test error from button click');
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        {/* Add test button in development only */}
        {import.meta.env.DEV && (
          <button 
            onClick={triggerError}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '10px 20px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 9999,
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
            title="Test Error Boundary (Dev only)"
          >
            Test Error
          </button>
        )}
        <AppRoutes />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
