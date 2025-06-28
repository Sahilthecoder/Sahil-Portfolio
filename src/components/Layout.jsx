import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import AIProjectAssistant from './AIProjectAssistant';

const Layout = ({ children }) => {
  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <AIProjectAssistant />
    </div>
  );
};

export default Layout;
