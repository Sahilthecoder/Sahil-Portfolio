import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  FiHome, 
  FiUser, 
  FiCode, 
  FiBriefcase, 
  FiMail, 
  FiChevronRight,
  FiX,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon, FaTimes, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './ModernNavbar.css';

// CSS classes for glass morphism effect
const glassStyle = 'glass-morph';
const glassHover = 'glass-hover';
const glassBorder = 'glass-border';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
};

// Floating background pattern
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.02]" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-gray-900/50" />
  </div>
);

// Navigation items with static text and routing configuration
const NAV_ITEMS = [
  { 
    name: 'Home', 
    path: '/', 
    section: 'home',
    icon: <FiHome className="w-5 h-5" />,
    description: 'Back to the homepage',
    exact: true
  },
  { 
    name: 'About', 
    path: '/about', 
    section: 'about',
    icon: <FiUser className="w-5 h-5" />,
    description: 'Learn about me and my skills',
    exact: false
  },
  { 
    name: 'Experience', 
    path: '/experience', 
    section: 'experience',
    icon: <FiBriefcase className="w-5 h-5" />,
    description: 'View my professional experience',
    exact: false
  },
  { 
    name: 'Projects', 
    path: '/projects', 
    section: 'projects',
    icon: <FiCode className="w-5 h-5" />,
    description: 'Explore my portfolio projects',
    exact: false
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    section: 'contact',
    icon: <FiMail className="w-5 h-5" />,
    description: 'Get in touch with me',
    exact: false
  }
];

// Theme Toggle Component
const ThemeToggle = React.memo(({ onThemeChange, className = '' }) => {
  const { theme, toggleTheme, autoTheme, toggleAutoTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    toggleTheme();
    if (onThemeChange) onThemeChange();
  }, [toggleTheme, onThemeChange]);
  
  const handleAutoThemeToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAutoTheme();
  }, [toggleAutoTheme]);
  
  // Theme configurations with CSS classes
  const themes = useMemo(() => ({
    light: {
      icon: <FiSun className="theme-icon" />,
      label: 'Light Mode',
      className: 'theme-light',
      tooltip: 'Switch to dark mode',
    },
    dark: {
      icon: <FiMoon className="theme-icon" />,
      label: 'Dark Mode',
      className: 'theme-dark',
      tooltip: 'Switch to light mode',
    }
  }), []);

  const currentTheme = themes[theme] || themes.light;

  return (
    <div className="theme-toggle-container">
      <motion.button
        type="button"
        className={`theme-toggle ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''} ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle(e);
        }}
        onContextMenu={handleAutoThemeToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        aria-label={`${currentTheme.tooltip}${autoTheme ? ' (Auto theme enabled)' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="theme-toggle-inner"
          animate={{
            rotate: isHovered ? (theme === 'light' ? 15 : -15) : 0,
            scale: isPressed ? 0.9 : 1
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 15,
            mass: 0.5
          }}
        >
          <span className="theme-icon">
            {currentTheme.icon}
          </span>
          <span className="theme-ripple"></span>
        </motion.div>

        {autoTheme && (
          <motion.span 
            className="theme-auto-indicator"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              opacity: [0, 1, 1],
              y: [10, -2, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              times: [0, 0.8, 1],
              ease: "easeOut"
            }}
          />
        )}
      </motion.button>
      
      <motion.div 
        className="theme-tooltip"
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 5
        }}
        transition={{ duration: 0.2 }}
      >
        {currentTheme.tooltip}
        {autoTheme && ' (Auto)'}
      </motion.div>
    </div>
  );
});

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  // Handle scroll effect with debounce
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 10);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
    // Scroll to top when path changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle body scroll and focus trap when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      // Focus trap for accessibility
      const menuElement = menuRef.current;
      if (!menuElement) return;
      
      const focusableElements = menuElement.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeMenu();
          return;
        }
        
        // Only handle tab key when menu is open
        if (e.key !== 'Tab') return;
        
        // Handle shift + tab
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } 
        // Handle tab
        else if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };
      
      // Focus first element when menu opens
      firstElement.focus();
      
      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback((e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen(prev => {
      const newState = !prev;
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return newState;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  }, [isMenuOpen]);
  
  // Add click outside listener
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen, handleClickOutside]);

  // Improved scroll to section with navigation support
  const scrollTo = useCallback((id, path) => {
    // If we're not on the home page, navigate first
    if (location.pathname !== '/') {
      navigate(path || '/');
      // Small delay to ensure the component has mounted
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      // We're already on the home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [location.pathname, navigate]);

  // Improved navigation with smooth scrolling to top for all page changes
  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();
    
    // Close mobile menu if open
    closeMenu();
    
    // If it's the same page, just scroll to top
    if (location.pathname === item.path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // For different page, navigate first then scroll to top
    navigate(item.path, { state: { fromNavigation: true } });
  }, [closeMenu, location.pathname, navigate]);

  // Handle body class and scroll position when menu is open or path changes
  useEffect(() => {
    // Handle menu open/close
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  // Close menu on outside click, Escape key, or navigation
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-button')) {
        closeMenu();
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    
    const handleNavigation = () => {
      closeMenu();
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="Home"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative flex items-center group-hover:scale-105 transition-transform">
              <img 
                src="/images/logo.png" 
                alt="Sahil Ali - Data Analyst" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/logo192.png';
                }}
              />
              <span className="ml-2 hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sahil Ali
                <span className="block text-xs text-gray-500 dark:text-gray-400">Data Analyst</span>
              </span>
            </div>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              
              return (
                <div key={item.name} className="relative group">
                  <button
                    onClick={(e) => handleNavClick(e, item)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.description}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="nav-item-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="nav-item-text">{item.name}</span>
                    </span>
                  </button>
                  {isActive && (
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                      layoutId="activeNavItem"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>


            
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  <motion.div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={closeMenu}
                    aria-hidden="true"
                  />
                  
                  <motion.div 
                    ref={menuRef}
                    className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col overflow-hidden"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1] }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile menu"
                  >
                    <div className="p-6 pb-4">
                    <div className="flex justify-between items-center">
                      <div className="hidden lg:flex items-center space-x-4">
                        <ThemeToggle onThemeChange={closeMenu} />
                        <a
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                          aria-label="GitHub"
                        >
                          <FaGithub className="h-5 w-5" />
                        </a>
                        <a
                          href="https://linkedin.com/in/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin className="h-5 w-5" />
                        </a>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menu</h2>
                      <button 
                        onClick={closeMenu}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close menu"
                      >
                        <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                    
                    <nav className="flex-1 overflow-y-auto py-4 -mx-4 px-4">
                      <ul className="space-y-2">
                        {NAV_ITEMS.map((item) => {
                          const isActive = item.exact 
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);
                            
                          return (
                            <li key={item.name}>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  closeMenu();
                                  
                                  if (location.pathname === item.path) {
                                    // If already on the same page, just scroll to section
                                    if (item.path === '/') {
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else if (item.section) {
                                      const element = document.getElementById(item.section);
                                      if (element) {
                                        const headerOffset = 100;
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                        window.scrollTo({
                                          top: offsetPosition,
                                          behavior: 'smooth',
                                        });
                                      }
                                    }
                                  } else {
                                    // Navigate to new page
                                    navigate(item.path);
                                    
                                    // Small delay to ensure the page has loaded
                                    setTimeout(() => {
                                      if (item.section) {
                                        const element = document.getElementById(item.section);
                                        if (element) {
                                          const headerOffset = 100;
                                          const elementPosition = element.getBoundingClientRect().top;
                                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                          window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth',
                                          });
                                        }
                                      } else if (item.path === '/') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }
                                    }, 100);
                                  }
                                }}
                                className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors ${
                                  isActive 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                                aria-current={isActive ? 'page' : undefined}
                              >
                                <span className={`flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                                  {item.icon}
                                </span>
                                <span className="font-medium">{item.name}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                    
                    <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                        <ThemeToggle onThemeChange={closeMenu} />
                      </div>
                      
                      <div className="flex justify-center space-x-4 mt-4">
                        <a
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="GitHub"
                          onClick={closeMenu}
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                        <a
                          href="https://linkedin.com/in/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="LinkedIn"
                          onClick={closeMenu}
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
  );
};

export default ModernNavbar;
