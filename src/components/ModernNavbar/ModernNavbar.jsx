import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const { theme, toggleTheme, autoTheme, toggleAutoTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    toggleTheme();
  }, [toggleTheme]);
  
  const handleAutoThemeToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAutoTheme();
  }, [toggleAutoTheme]);
  
  // Theme configurations
  const themes = {
    light: {
      icon: <FiSun className="w-4 h-4" />,
      label: 'Light',
      color: 'text-yellow-500',
      bg: 'bg-yellow-100',
      hoverBg: 'hover:bg-yellow-100/80',
    },
    dark: {
      icon: <FiMoon className="w-4 h-4" />,
      label: 'Dark',
      color: 'text-indigo-500',
      bg: 'bg-indigo-100',
      hoverBg: 'hover:bg-indigo-100/80',
    }
  };

  const currentTheme = themes[theme] || themes.light;
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <div className="relative flex items-center">
      <motion.button
        onClick={handleToggle}
        onContextMenu={handleAutoThemeToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        aria-label={`Switch to ${nextTheme} theme${autoTheme ? ' (Auto)' : ''}`}
        className={`relative flex items-center justify-center h-9 px-3 rounded-full ${currentTheme.bg} ${currentTheme.hoverBg} ${currentTheme.color} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900`}
      >
        <motion.span 
          className="flex items-center space-x-2 text-sm font-medium"
          initial={false}
          animate={{ width: isHovered ? 'auto' : 'auto' }}
        >
          <motion.span
            animate={{ rotate: isHovered ? 30 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {currentTheme.icon}
          </motion.span>
          <motion.span 
            className="whitespace-nowrap"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              width: isHovered ? 'auto' : 0,
              marginLeft: isHovered ? 8 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {currentTheme.label}
          </motion.span>
        </motion.span>
        
        {autoTheme && (
          <motion.span 
            className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </motion.button>
      
      {/* Auto theme tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 z-50"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            <button
              onClick={handleAutoThemeToggle}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                autoTheme 
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <span>Auto Theme</span>
              {autoTheme && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
  const activeSection = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

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

  // Smooth scroll to section
  const scrollTo = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
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
                      loading="lazy"
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
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path || 
                              (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      if (item.path === '/') {
                        scrollTo('home');
                        navigate(item.path);
                      } else {
                        navigate(item.path);
                        // Small delay to ensure the component has mounted
                        setTimeout(() => {
                          scrollTo(item.section);
                        }, 50);
                      }
                    }}
                    className={`flex-shrink-0 flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20 dark:from-indigo-500 dark:to-purple-500'
                        : 'text-gray-600 hover:text-indigo-700 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/40'
                    }`}
                    style={{ minWidth: 'fit-content' }}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    <span className="whitespace-nowrap">{item.name}</span>
                  </button>
                );
              })}
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
                    {NAV_ITEMS.map((item) => {
                      const isActive = location.pathname === item.path || 
                                    (item.path !== '/' && location.pathname.startsWith(item.path));
                      return (
                        <button
                          key={item.name}
                          onClick={(e) => {
                            e.preventDefault();
                            closeMenu();
                            if (item.path === '/') {
                              scrollTo('home');
                              navigate(item.path);
                            } else {
                              navigate(item.path);
                              // Small delay to ensure the component has mounted
                              setTimeout(() => {
                                scrollTo(item.section);
                              }, 50);
                            }
                          }}
                          className={`w-full text-left flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-300 ${
                            isActive
                              ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20 dark:from-indigo-500 dark:to-purple-500'
                              : 'text-gray-600 hover:text-indigo-700 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/40'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </button>
                      );
                    })}
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
