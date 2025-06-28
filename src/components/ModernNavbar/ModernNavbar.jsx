import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiHome, 
  FiUser, 
  FiCode, 
  FiBriefcase, 
  FiMail, 
  FiGlobe,
  FiChevronDown,
  FiStar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Navigation items with static text
const NAV_ITEMS = [
  { name: 'Home', path: '/', section: 'home', icon: <FiHome className="w-5 h-5" /> },
  { name: 'About', path: '/about', section: 'about', icon: <FiUser className="w-5 h-5" /> },
  { name: 'Projects', path: '/projects', section: 'projects', icon: <FiCode className="w-5 h-5" /> },
  { name: 'Experience', path: '/experience', section: 'experience', icon: <FiBriefcase className="w-5 h-5" /> },
  { name: 'Contact', path: '/contact', section: 'contact', icon: <FiMail className="w-5 h-5" /> },
];

// Theme Toggle Component
const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme, autoTheme, toggleAutoTheme, isDark } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 200);
  }, [toggleTheme]);
  
  const handleAutoThemeToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAutoTheme();
  }, [toggleAutoTheme]);
  
  // Get the appropriate icon based on theme
  const getThemeIcon = () => {
    switch(theme) {
      case 'dark':
        return <FiMoon className="w-5 h-5 text-light-text-body dark:text-dark-text-body" />;
      case 'futuristic':
        return <FiStar className="w-5 h-5 text-purple-400" />;
      case 'light':
      default:
        return <FiSun className="w-5 h-5 text-yellow-500" />;
    }
  };
  
  // Get the next theme name for screen readers
  const getNextThemeName = () => {
    switch(theme) {
      case 'light': return 'dark';
      case 'dark': return 'futuristic';
      case 'futuristic': return 'light';
      default: return 'light';
    }
  };

  return (
    <div className="relative group">
      <motion.button
        onClick={handleToggle}
        onContextMenu={handleAutoThemeToggle}
        aria-label={`Toggle theme to ${getNextThemeName()}${autoTheme ? ` (Auto)` : ''}`}
        className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 hover:bg-light-glass dark:hover:bg-dark-glass/20 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: isAnimating ? 180 : 0,
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
        >
          {getThemeIcon()}
        </motion.div>
        
        {autoTheme && (
          <motion.span 
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-dark-bg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </motion.button>
      
      <div className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border z-50">
        <div className="p-2">
          <button
            onClick={handleAutoThemeToggle}
            className={`w-full text-left px-4 py-2 text-sm rounded-md flex items-center justify-between ${
              autoTheme 
                ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary' 
                : 'text-light-text-body dark:text-dark-text-body hover:bg-light-hover dark:hover:bg-dark-hover'
            }`}
          >
            <span>Auto Theme</span>
            {autoTheme && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
          </button>
        </div>
      </div>
    </div>
  );
});

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navbarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  // Get active section from path
  const activeSection = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  // Close mobile menu when clicking outside
  const handleClickOutsideMobile = useCallback((event) => {
    if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMobile);
    return () => document.removeEventListener('mousedown', handleClickOutsideMobile);
  }, [handleClickOutsideMobile]);

  // Handle scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Add shadow when scrolled
      setIsScrolled(currentScrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div ref={navbarRef} className="mobile-menu-container">
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-transparent'
        } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="group flex items-center space-x-3"
                onClick={closeMenu}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300 group-hover:duration-200"></div>
                  <div className="relative p-1 bg-white dark:bg-gray-900 rounded-full ring-1 ring-gray-900/5 dark:ring-white/10">
                    <img 
                      src="/logo192.png" 
                      alt="Sahil Ali" 
                      className="h-9 w-9 md:h-10 md:w-10 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex flex-col leading-tight">
                  <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                    Sahil Ali
                  </h2>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wide mt-0.5">
                    DATA ANALYST
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex-shrink-0 flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === item.section
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20 dark:from-indigo-500 dark:to-purple-500'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                  style={{ minWidth: 'fit-content' }}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </a>
              ))}
            </nav>

            {/* Desktop Right Side */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Menu'}
              >
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            >
              <motion.div
                className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-light-bg dark:bg-dark-bg shadow-xl"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full flex flex-col py-6 px-4">
                  <div className="flex items-center justify-between px-4 mb-8">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Menu
                    </span>
                    <button
                      onClick={closeMenu}
                      className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="flex-1 space-y-2 px-4">
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.name}
                        href={item.path}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                          activeSection === item.section
                            ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20 dark:from-indigo-500 dark:to-purple-500'
                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={closeMenu}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </a>
                    ))}
                  </nav>
                  <div className="px-4 pt-4 border-t border-light-glass-border dark:border-dark-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                    {/* Language selector removed as per user request */}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default ModernNavbar;
