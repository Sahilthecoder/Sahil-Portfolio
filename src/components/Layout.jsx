import React from 'react';
import { Outlet } from 'react-router-dom';
import ModernNavbar from './ModernNavbar/ModernNavbar';
import Footer from './Footer.tsx';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ModernNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
