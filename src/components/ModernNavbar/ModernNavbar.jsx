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
  FiFileText,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Glass morphism styles
const glassStyle = 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80';
const glassHover = 'hover:bg-white/90 dark:hover:bg-gray-800/90';
const glassBorder = 'border border-white/20 dark:border-gray-700/50';

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

// Navigation items with static text - Streamlined for better focus
const NAV_ITEMS = [
  { 
    name: 'Home', 
    path: '/', 
    section: 'home', 
    icon: <FiHome className="w-5 h-5" />,
    description: 'Back to the homepage'
  },
  { 
    name: 'About', 
    path: '/about', 
    section: 'about', 
    icon: <FiUser className="w-5 h-5" />,
    description: 'Learn about me and my skills'
  },
  { 
    name: 'Work', 
    path: '/experience', 
    section: 'experience', 
    icon: <FiBriefcase className="w-5 h-5" />,
    description: 'View my professional experience'
  },
  { 
    name: 'Projects', 
    path: '/projects', 
    section: 'projects', 
    icon: <FiCode className="w-5 h-5" />,
    description: 'Explore my portfolio projects'
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    section: 'contact', 
    icon: <FiMail className="w-5 h-5" />,
    description: 'Get in touch with me'
  },
  // Resume is now a call-to-action button in the navigation
];

// Theme Toggle Component
const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme, autoTheme, toggleAutoTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    toggleTheme();
  }, [toggleTheme]);
  
  const handleAutoThemeToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAutoTheme();
  }, [toggleAutoTheme]);
  
  // Theme configurations with improved contrast and modern design
  const themes = {
    light: {
      icon: <FiSun className="w-4 h-4 md:w-5 md:h-5" />,
      label: 'Light Mode',
      bg: 'bg-white dark:bg-gray-800',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
      hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-700',
      activeBg: 'active:bg-gray-100 dark:active:bg-gray-600',
      text: 'text-yellow-500 dark:text-yellow-400',
      shadow: 'shadow-sm hover:shadow-md',
      tooltip: 'Switch to dark mode',
    },
    dark: {
      icon: <FiMoon className="w-4 h-4 md:w-5 md:h-5" />,
      label: 'Dark Mode',
      bg: 'bg-gray-900 dark:bg-gray-100',
      ring: 'ring-1 ring-gray-800 dark:ring-gray-300',
      hoverBg: 'hover:bg-gray-800 dark:hover:bg-gray-50',
      activeBg: 'active:bg-gray-700 dark:active:bg-gray-100',
      text: 'text-indigo-300 dark:text-indigo-600',
      shadow: 'shadow-sm hover:shadow-md shadow-gray-900/20 dark:shadow-gray-100/20',
      tooltip: 'Switch to light mode',
    }
  };

  const currentTheme = themes[theme] || themes.light;
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <div className="relative group">
      <motion.button
        onClick={handleToggle}
        onContextMenu={handleAutoThemeToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        aria-label={`${currentTheme.tooltip}${autoTheme ? ' (Auto theme enabled)' : ''}`}
        className={`relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 ${currentTheme.bg} ${currentTheme.ring} ${currentTheme.hoverBg} ${currentTheme.activeBg} ${currentTheme.shadow} ${isPressed ? 'scale-95' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="relative flex items-center justify-center w-full h-full"
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
          <motion.span
            className={`${currentTheme.text} transition-colors duration-300`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: 1
            }}
          >
            {currentTheme.icon}
          </motion.span>
          
          {/* Ripple effect on click */}
          <motion.span 
            className="absolute inset-0 rounded-full bg-current opacity-0"
            initial={false}
            animate={{
              scale: isPressed ? 1.5 : 1,
              opacity: isPressed ? 0.1 : 0
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Auto theme indicator */}
        {autoTheme && (
          <motion.span 
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"
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
      
      {/* Tooltip */}
      <motion.div 
        className="absolute right-0 top-full mt-2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg whitespace-nowrap pointer-events-none z-50"
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
  }, [location.pathname]);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap for accessibility
      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeMenu();
        }
        
        // Trap focus inside menu when open
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close mobile menu when clicking outside or pressing Escape
  const handleClickOutsideMobile = useCallback((event) => {
    if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  // Smooth scroll to section
  const scrollTo = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Add padding to the body when menu is open to prevent scrolling
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      return () => document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? `py-2 ${glassStyle} ${glassBorder} shadow-xl` 
            : 'py-4 bg-transparent'
        }`}
        style={{
          // Ensure navbar stays above other content
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <BackgroundPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <NavLink
                to="/"
                className={({ isActive }) => `flex items-center space-x-2 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
                onClick={closeMenu}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300 group-hover:duration-200"></div>
                  <div className="relative p-1 bg-white dark:bg-gray-900 rounded-full ring-1 ring-gray-900/5 dark:ring-white/10">
                    <img 
                      src={`${import.meta.env.BASE_URL}logo192.png`}
                      alt="Sahil Ali"
                      loading="lazy"
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex flex-col leading-tight">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                    Sahil Ali
                  </h2>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 tracking-wide mt-0.5">
                    DATA ANALYST
                  </span>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 flex-wrap">
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
                    className={`flex-shrink-0 flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
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
            <div className="hidden md:flex items-center space-x-3">
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
              <ThemeToggle />
            </div>

            {/* Mobile menu button - Theme toggle removed from header */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={toggleMenu}
                className={`p-2.5 rounded-xl ${glassStyle} ${glassHover} ${glassBorder} shadow-sm hover:shadow-md transition-all duration-300`}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-6 h-5">
                  <motion.span 
                    className="absolute h-0.5 w-6 bg-current block rounded-full"
                    animate={isMenuOpen ? 'open' : 'closed'}
                    variants={{
                      closed: { top: '0.25rem', rotate: 0 },
                      open: { top: '0.75rem', rotate: 45 }
                    }}
                  />
                  <motion.span 
                    className="absolute h-0.5 w-6 bg-current block rounded-full top-1/2 -translate-y-1/2"
                    animate={isMenuOpen ? 'open' : 'closed'}
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                  />
                  <motion.span 
                    className="absolute h-0.5 w-6 bg-current block rounded-full"
                    animate={isMenuOpen ? 'open' : 'closed'}
                    variants={{
                      closed: { bottom: '0.25rem', rotate: 0 },
                      open: { bottom: '0.75rem', rotate: -45 }
                    }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu with modern design */}
        <AnimatePresence>
          {isMenuOpen && (
            <div className="mobile-menu-container">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={closeMenu}
                aria-hidden="true"
              />
              <motion.div
                ref={menuRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ 
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                  mass: 0.5
                }}
                className={`fixed top-0 right-0 h-screen w-80 max-w-full ${glassStyle} ${glassBorder} shadow-2xl z-50 overflow-y-auto`}
                style={{
                  maxHeight: '100vh',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
              >
                <BackgroundPattern />
                <div className="flex flex-col min-h-full">
                  <div className="px-6 py-5 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <motion.h2 
                        className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        Navigation
                      </motion.h2>
                      <motion.button
                        onClick={closeMenu}
                        className={`p-2 rounded-xl ${glassHover} text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors`}
                        aria-label="Close menu"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiX className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <motion.nav 
                    className="flex-1 px-4 py-6 space-y-2 overflow-y-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {NAV_ITEMS.map((item) => (
                      <motion.div
                        key={item.path}
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <NavLink
                          to={item.path}
                          className={({ isActive }) => `
                            flex items-center justify-between p-4 rounded-xl transition-all duration-300
                            ${isActive 
                              ? `${glassStyle} ${glassHover} shadow-md text-indigo-600 dark:text-indigo-300` 
                              : `${glassHover} text-gray-700 dark:text-gray-300`
                            }
                          `}
                          onClick={closeMenu}
                        >
                          <div className="flex items-center">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mr-3">
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <FiChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </NavLink>
                      </motion.div>
                    ))}
                  </motion.nav>
                  
                  <div className={`p-5 border-t border-white/10 ${glassStyle}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default ModernNavbar;
