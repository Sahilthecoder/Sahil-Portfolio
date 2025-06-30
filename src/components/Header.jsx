// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon, FiCode, FiLayers, FiUser, FiMail, FiHome } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);
  const location = useLocation();

  // Set dark mode based on system preference or saved preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }

    // Handle scroll effect
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Mouse move effect for the glow
    const handleMouseMove = (e) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setGlowPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    headerRef.current?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      headerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrolled]);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <FiUser className="w-4 h-4" /> },
    { name: 'Experience', path: '/experience', icon: <FiCode className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <FiLayers className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <FiMail className="w-4 h-4" /> },
  ];

  // Glow effect style
  const glowStyle = {
    '--glow-x': `${glowPosition.x}px`,
    '--glow-y': `${glowPosition.y}px`,
    '--glow-color': darkMode ? 'rgba(108, 159, 246, 0.15)' : 'rgba(99, 102, 241, 0.1)',
  };

  return (
    <>
      {/* Glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at var(--glow-x) var(--glow-y), var(--glow-color), transparent 70%)`,
          opacity: isMenuOpen ? 0 : 1,
          ...glowStyle
        }}
      />
      
      <motion.header 
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/70 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/30 shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-500/10 py-2'
            : 'bg-white/30 dark:bg-dark-bg/30 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/30 py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Modern Logo with Animation */}
            <Link 
              to="/" 
              className="group flex items-center space-x-3 relative"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 w-12 h-12 -z-10" />
                <motion.img 
                  src={`${import.meta.env.BASE_URL}logo512.png`} 
                  alt="Sahil Ali"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shadow-lg group-hover:border-indigo-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 whitespace-nowrap">
                  Sahil Ali
                </span>
                <motion.div 
                  className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 mt-0.5"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: location.pathname === '/' ? 1 : 0 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2.5 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-white bg-indigo-600 shadow-md shadow-indigo-500/20 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100 dark:text-dark-text-body dark:hover:bg-dark-glass/50 dark:hover:text-dark-text-heading'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-gray-600 group-hover:text-black dark:group-hover:text-white'}>
                      {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                    </span>
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.span 
                        className="absolute -bottom-2 left-1/2 w-1/2 h-0.5 bg-white rounded-full"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2.5 rounded-full hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800/90 dark:hover:text-white transition-colors duration-200"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800/90 dark:hover:text-white transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2.5 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors relative group"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <FiX className="w-5 h-5 text-white" />
                ) : (
                  <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-indigo-500 rounded-full transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-t border-white/10 dark:border-gray-800/30"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20 dark:from-indigo-500 dark:to-purple-500'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <span className={`mr-3 ${isActive ? 'text-white' : 'text-indigo-500'}`}>
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Add some space when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;