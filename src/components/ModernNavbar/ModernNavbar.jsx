import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ImageWithFallback } from '../../utils/imageUtils';
import getImagePath from '../../utils/imagePaths';
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiMail,
  FiChevronRight,
  FiX,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon, FaTimes, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { withBasePath } from '../../utils/paths';
import { isHomePage, getNavigationPath, scrollToSection } from '../../utils/navigation';
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
    },
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
    path: withBasePath('/'),
    section: 'home',
    ref: 'homeRef',
    icon: <FiHome className="w-5 h-5" />,
    description: 'Back to the homepage',
    exact: true,
  },
  {
    name: 'About',
    path: withBasePath('/about'),
    section: 'about',
    ref: 'aboutRef',
    icon: <FiUser className="w-5 h-5" />,
    description: 'Learn about me and my skills',
    exact: false,
  },
  {
    name: 'Experience',
    path: withBasePath('/experience'),
    section: 'experience',
    ref: 'experienceRef',
    icon: <FiBriefcase className="w-5 h-5" />,
    description: 'View my professional experience',
    exact: false,
  },
  {
    name: 'Projects',
    path: withBasePath('/projects'),
    section: 'projects',
    ref: 'projectsRef',
    icon: <FiCode className="w-5 h-5" />,
    description: 'Explore my portfolio projects',
    exact: false,
  },
  {
    name: 'Contact',
    path: withBasePath('/contact'),
    section: 'contact',
    ref: 'contactRef',
    icon: <FiMail className="w-5 h-5" />,
    description: 'Get in touch with me',
    exact: false,
  },
];

// Theme Toggle Component
const ThemeToggle = React.memo(({ onThemeChange, className = '' }) => {
  const { theme, toggleTheme, autoTheme, toggleAutoTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleToggle = useCallback(
    (e) => {
      e.stopPropagation();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 200);
      toggleTheme();
      if (onThemeChange) onThemeChange();
    },
    [toggleTheme, onThemeChange]
  );

  const handleAutoThemeToggle = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAutoTheme();
    },
    [toggleAutoTheme]
  );

  // Theme configurations with CSS classes
  const themes = useMemo(
    () => ({
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
      },
    }),
    []
  );

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
            scale: isPressed ? 0.9 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 15,
            mass: 0.5,
          }}
        >
          <span className="theme-icon">{currentTheme.icon}</span>
          <span className="theme-ripple"></span>
        </motion.div>

        {autoTheme && (
          <motion.span
            className="theme-auto-indicator"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              opacity: [0, 1, 1],
              y: [10, -2, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              times: [0, 0.8, 1],
              ease: 'easeOut',
            }}
          />
        )}
      </motion.button>

      <motion.div
        className="theme-tooltip"
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 5,
        }}
        transition={{ duration: 0.2 }}
      >
        {currentTheme.tooltip}
        {autoTheme && ' (Auto)'}
      </motion.div>
    </div>
  );
});

const ModernNavbar = ({ activeSection, onNavigate, sectionRefs = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Use activeSection from props if available, otherwise default to 'home'
  const [activeItem, setActiveItem] = useState(activeSection || 'home');
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
        setIsScrolled(window.scrollY > 10);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update active item when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      setActiveItem(activeSection);
    }
  }, [activeSection]);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
    // Scroll to top when path changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle body scroll and focus trap when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scroll when menu is open
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      // Focus trap for accessibility
      const menuElement = menuRef.current;
      if (!menuElement) return;

      // Get all focusable elements in the menu
      const focusableElements = Array.from(
        menuElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.disabled && !el.hidden && el.offsetParent !== null);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e) => {
        // Close menu on Escape
        if (e.key === 'Escape') {
          closeMenu();
          // Return focus to menu button
          const menuButton = document.querySelector('[aria-label*="menu"]');
          if (menuButton) menuButton.focus();
          return;
        }

        // Only handle tab key when menu is open
        if (e.key !== 'Tab') return;

        // Handle shift + tab (backwards tab)
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        }
        // Handle tab (forwards tab)
        else if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };

      // Focus first element when menu opens
      requestAnimationFrame(() => {
        firstElement.focus();
      });

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);

      // Cleanup function
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback(
    (e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      const newIsMenuOpen = !isMenuOpen;
      setIsMenuOpen(newIsMenuOpen);

      // Update aria-expanded for screen readers
      const menuButton = document.querySelector('[aria-label*="menu"]');
      if (menuButton) {
        menuButton.setAttribute('aria-expanded', String(newIsMenuOpen));
      }
    },
    [isMenuOpen]
  );

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback(
    (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    },
    [isMenuOpen]
  );

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
  const scrollTo = useCallback(
    (id, path) => {
      const currentPath = location.pathname;

      // If we have a section ID, use the scrollToSection utility
      if (id) {
        scrollToSection(id, navigate, currentPath);
        setIsMenuOpen(false);
        return;
      }

      // If we have a path, navigate to it
      if (path) {
        const navPath = getNavigationPath(path);
        navigate(navPath);
      }

      // Close mobile menu if open
      setIsMenuOpen(false);
    },
    [location.pathname, navigate]
  );

  // Handle navigation with support for both page navigation and section scrolling
  const handleNavClick = useCallback(
    (e, path, section) => {
      const currentPath = location.pathname;

      // If it's a section link (starts with #)
      if (path.startsWith('#')) {
        e.preventDefault();
        const sectionId = path.substring(1);
        scrollToSection(sectionId, navigate, currentPath);
        return;
      }

      // Get the full navigation path
      const navPath = getNavigationPath(path);

      // If it's the home page link
      if (navPath === withBasePath('/') || navPath === `${withBasePath('/')}/`) {
        if (isHomePage(currentPath)) {
          // If already on home page, scroll to top
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Navigate to home page
          navigate(navPath);
        }
        return;
      }

      // For all other navigation
      navigate(navPath);

      // If it's not a section link, scroll to top
      if (!path.includes('#')) {
        window.scrollTo(0, 0);
      }
    },
    [navigate, location.pathname]
  );

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

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <NavLink
            to={withBasePath('/')}
            className="flex items-center space-x-2 group"
            aria-label="Home"
            onClick={(e) => {
              const currentPath = location.pathname;
              const basePath = withBasePath('/');
              if (currentPath === basePath || currentPath === `${basePath}/`) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="logo-container relative flex items-center group-hover:scale-105 transition-transform">
              <div className="logo relative z-10 bg-white dark:bg-gray-900 rounded-full p-1.5 shadow-sm">
                <ImageWithFallback
                  src={getImagePath('logo', '', 'logo192.png')}
                  fallbackSrc="/logo192.png"
                  alt="Sahil Ali - Portfolio Logo"
                  className="logo-img h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-110"
                  width={36}
                  height={36}
                  priority={true}
                  sizes="(max-width: 768px) 36px, 40px"
                />
              </div>
              <span className="ml-3 hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sahil Ali
                <span className="block text-xs text-gray-500 dark:text-gray-400">Data Analyst</span>
              </span>
            </div>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path, item.section)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`
                }
                end={item.exact}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </div>
              </NavLink>
            ))}
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
              <div
                ref={menuContainerRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } lg:hidden`}
              >
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
                      <div className="flex justify-center space-x-4 mt-4">
                        <a
                          href="https://github.com/Sahilthecoder"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          aria-label="GitHub"
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                        <a
                          href="https://linkedin.com/in/sahil-ali-4b2b3b1b0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                        <a
                          href="https://twitter.com/SahilAli_Dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                          aria-label="Twitter"
                        >
                          <FaTwitter className="w-5 h-5" />
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

                                  // Use our navigation utilities for consistent behavior
                                  if (item.path.startsWith('#')) {
                                    // Handle section links
                                    const sectionId = item.path.substring(1);
                                    scrollToSection(sectionId, navigate, location.pathname);
                                  } else {
                                    // Handle page navigation
                                    const navPath = getNavigationPath(item.path);
                                    navigate(navPath);

                                    // If it's a link to the current page, scroll to top
                                    if (location.pathname === navPath) {
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                  }
                                }}
                                className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-left transition-colors ${
                                  isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                                aria-current={isActive ? 'page' : undefined}
                              >
                                <span
                                  className={`flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
                                >
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
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Dark Mode
                        </span>
                        <ThemeToggle onThemeChange={closeMenu} />
                      </div>

                      <div className="flex justify-center space-x-4 mt-4">
                        <a
                          href="https://github.com/Sahilthecoder"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="GitHub"
                          onClick={closeMenu}
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                        <a
                          href="https://linkedin.com/in/sahil-ali-4b2b3b1b0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="LinkedIn"
                          onClick={closeMenu}
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                        <a
                          href="https://twitter.com/SahilAli_Dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="Twitter"
                          onClick={closeMenu}
                        >
                          <FaTwitter className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;
