import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getImagePath } from '../../utils/imageUtils.jsx';
import ImageWithFallback from '../ImageWithFallback';
import ThemeSwitch from '../ThemeSwitch';
import { 
  FiHome, 
  FiUser, 
  FiCode, 
  FiBriefcase, 
  FiMail,
  FiX,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon, FaTimes, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

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
    ref: 'homeRef',
    icon: <FiHome className="w-5 h-5" />,
    description: 'Back to the homepage',
    exact: true
  },
  { 
    name: 'About', 
    path: '/about', 
    section: 'about',
    ref: 'aboutRef',
    icon: <FiUser className="w-5 h-5" />,
    description: 'Learn about me and my skills',
    exact: false
  },
  { 
    name: 'Experience', 
    path: '/experience', 
    section: 'experience',
    ref: 'experienceRef',
    icon: <FiBriefcase className="w-5 h-5" />,
    description: 'View my professional experience',
    exact: false
  },
  { 
    name: 'Projects', 
    path: '/projects', 
    section: 'projects',
    ref: 'projectsRef',
    icon: <FiCode className="w-5 h-5" />,
    description: 'Explore my portfolio projects',
    exact: false
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    section: 'contact',
    ref: 'contactRef',
    icon: <FiMail className="w-5 h-5" />,
    description: 'Get in touch with me',
    exact: false
  }
];


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
      const focusableElements = Array.from(menuElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.disabled && !el.hidden && el.offsetParent !== null);
      
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

  const toggleMenu = useCallback((e) => {
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
  }, [isMenuOpen]);

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

  // Handle navigation with support for both page navigation and section scrolling
  const handleNavClick = useCallback((e, path, section) => {
    // If it's the home page link
    if (path === '/') {
      if (location.pathname === '/') {
        // If already on home page, scroll to top
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home page
        navigate('/');
      }
      return;
    }
    
    // If it's a different page
    if (path.startsWith('/')) {
      navigate(path);
      // Scroll to top when navigating to a new page
      window.scrollTo(0, 0);
      return;
    }
    
    // If it's a hash link and we're on the home page
    if (path.startsWith('#') && location.pathname === '/') {
      const element = document.getElementById(path.substring(1));
      if (element) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      return;
    }
    
    // If we're not on the home page and it's a section link
    if (path.startsWith('#')) {
      navigate('/' + path);
    }
  }, [navigate, location.pathname]);

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
            <div className="logo-container relative flex items-center group-hover:scale-105 transition-transform">
              <div className="logo relative z-10 bg-white dark:bg-gray-900 rounded-full p-1.5 shadow-sm">
                <ImageWithFallback 
                  src="/Sahil-Portfolio/images/logo/logo192.png"
                  fallbackSrc="/Sahil-Portfolio/images/logo/logo192.png"
                  alt="Sahil Ali - Portfolio Logo"
                  className="logo-img h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-110"
                  width={36}
                  height={36}
                  loading="eager"
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

          <div className="hidden lg:flex items-center space-x-2 ml-4">
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <ThemeSwitch className="mr-1" />
            <a
              href="https://github.com/Sahilthecoder/Sahil-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sahil-ali-714867242/"
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
                      <div className="hidden lg:flex items-center space-x-4">
                        <ThemeSwitch />
                        <a
                          href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                          aria-label="GitHub"
                        >
                          <FaGithub className="h-5 w-5" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/sahil-ali-714867242/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin className="h-5 w-5" aria-label="LinkedIn" role="img" />
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
                        <ThemeSwitch />
                      </div>
                      
                      <div className="flex justify-center space-x-4 mt-4">
                        <a
                          href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label="GitHub"
                          onClick={closeMenu}
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/sahil-ali-714867242/"
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
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;
