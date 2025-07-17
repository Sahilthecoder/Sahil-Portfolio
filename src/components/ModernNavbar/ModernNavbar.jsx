import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FiHome, FiUser, FiCode, FiMail, FiX, FiChevronUp } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaBars } from 'react-icons/fa';
// Inline implementation of ThemeSwitch
const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

// Inline implementation of ImageWithFallback
const ImageWithFallback = ({
  src,
  fallback = '/images/fallback-image.jpg',
  alt = '',
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc || fallback}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallback)}
    />
  );
};
import { getImagePath } from '../../utils/imageUtils';

// Add smooth theme transitions
const ThemeTransition = () => (
  <style jsx global>{`n    html {n      scroll-behavior: smooth;n    }n    .theme-transition *:not(.no-transition):not(.no-transition *) {n      transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;n      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);n      transition-duration: 150ms;n    }n  `}</style>
);

// Navigation items configuration
const NAV_ITEMS = [
  { 
    name: 'Home', 
    path: '/', 
    section: 'home',
    icon: <FiHome className="w-5 h-5" />,
    exact: true
  },
  { 
    name: 'About', 
    path: '/about',
    section: 'about',
    icon: <FiUser className="w-5 h-5" />
  },
  { 
    name: 'Projects', 
    path: '/projects',
    section: 'projects',
    icon: <FiCode className="w-5 h-5" />
  },
  { 
    name: 'Contact', 
    path: '/contact',
    section: 'contact',
    icon: <FiMail className="w-5 h-5" />
  }
];

// Animation variants
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      damping: 25, 
      stiffness: 500,
      mass: 0.5
    }
  }
};

const menuVariants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: {
      type: 'tween',
      ease: [0.22, 1, 0.36, 1],
      duration: 0.3
    }
  },
  exit: { 
    x: '100%',
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.2
    }
  }
};

// Skip to main content link component
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 focus:bg-white dark:focus:bg-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:outline-none transition-all duration-200 transform focus:scale-105"
  >
    Skip to content
  </a>
);

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollTop = useRef(0);
  const ticking = useRef(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  // Handle theme toggle with smooth transition
  const handleThemeToggle = useCallback(() => {
    setIsTransitioning(true);
    // Add a small delay to allow the transition to complete
    setTimeout(() => {
      toggleTheme();
      setIsTransitioning(false);
    }, 150);
  }, [toggleTheme]);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handle scroll events for navbar visibility, progress, and background
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.pageYOffset;
          const windowHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight - windowHeight;
          
          // Update scroll progress (0-100%)
          setScrollProgress(Math.min((currentScrollPos / docHeight) * 100, 100));
          
          // Show back to top button when scrolled past 50% of viewport height
          setShowBackToTop(currentScrollPos > windowHeight * 0.5);
          
          // Update navbar background on scroll
          setIsScrolled(currentScrollPos > 10);
          
          lastScrollTop.current = currentScrollPos;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
  }, [reducedMotion]);
  
  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  // Close mobile menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  
  // Check if nav item is active
  const isActive = useCallback((item) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(item.path);
  }, [location.pathname]);
  
  // Handle nav click with smooth scroll
  const handleNavClick = useCallback((e, item) => {
    e.preventDefault();
    closeMenu();
    
    // Always scroll to top first
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    
    // Small delay to ensure scroll completes before navigation
    setTimeout(() => {
      if (location.pathname === item.path) {
        // If already on the same page, just scroll to section if not home
        if (item.section !== 'home') {
          const element = document.getElementById(item.section);
          if (element) {
            element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
          }
        }
      } else {
        // Navigate to new page
        navigate(item.path);
      }
    }, 100);
  }, [location.pathname, navigate, closeMenu]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <>
      {/* Theme Transition */}
      <ThemeTransition />
      
      {/* Skip to content link */}
      <SkipToContent />
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 right-0 h-0.5 z-[60]"
        style={{
          background: `linear-gradient(90deg, ${theme === 'dark' ? '#3b82f6' : '#2563eb'} ${scrollProgress}%, transparent ${scrollProgress}%)`,
          opacity: isScrolled ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        aria-hidden="true"
      />
      
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Subtle divider that appears on scroll */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 theme-transition">
          <div className="flex justify-between h-16 md:h-20 items-center">
            {/* Logo / Brand */}
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
              <div className="relative flex items-center group active:scale-95 transition-transform duration-100">
                {/* Logo Container with Smooth Transitions */}
                <div className="relative z-10 bg-white/90 dark:bg-gray-900/90 rounded-full p-1.5 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-blue-500/30 group-hover:shadow-lg transform-gpu will-change-transform">
                  {/* Logo Image */}
                  <div className={`relative w-8 h-8 md:w-9 md:h-9 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <picture>
                      {/* WebP with responsive sources */}
                      <source 
                        srcSet={`/images/logo/logo192.webp 192w, /images/logo/logo512-300w.webp 300w`} 
                        type="image/webp"
                        sizes="(max-width: 768px) 32px, 36px"
                      />
                      {/* Fallback to PNG */}
                      <ImageWithFallback
                        src="/images/logo/logo192.png"
                        srcSet={"/images/logo/logo192.png 192w, /images/logo/logo512.png 300w"}
                        sizes="(max-width: 768px) 32px, 36px"
                        fallbackText="SA"
                        className="w-full h-full object-contain"
                        alt="Sahil's Logo"
                        onLoad={handleImageLoad}
                        loading="eager"
                        width={36}
                        height={36}
                      />
                    </picture>
                  </div>
                  
                  {/* Loading State */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full animate-pulse">
                      <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        SA
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Name and Title with Gradient Text */}
                <div className="ml-3 flex flex-col leading-tight -space-y-0.5">
                  <motion.span 
                    className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
                    whileHover={!reducedMotion ? { x: 2 } : {}}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    Sahil Ali
                  </motion.span>
                  <motion.span 
                    className="text-[11px] xs:text-xs font-medium text-gray-500 dark:text-gray-400 tracking-widest transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                    whileHover={!reducedMotion ? { letterSpacing: '0.15em' } : {}}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    DATA ANALYST
                  </motion.span>
                </div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-md text-sm font-medium transition-colors
                    flex items-center space-x-2
                    ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800/50' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/30'
                    }
                  `}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <a
                  href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/sahil-ali-12345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <ThemeSwitch 
              onChange={handleThemeToggle} 
              />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                className="lg:hidden p-3 -mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all active:bg-gray-100 dark:active:bg-gray-800"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                whileTap={!reducedMotion ? { scale: 0.9 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              ref={menuRef}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <ImageWithFallback
                        src="/images/logo/logo192.png"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/images/logo/logo192.png';
                        }}
                      />
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
                  </div>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item);
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          active
                            ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={(e) => handleNavClick(e, item)}
                      >
                        {React.cloneElement(item.icon, {
                          className: `w-5 h-5 mr-3 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`
                        })}
                        {item.name}
                      </NavLink>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex justify-center items-center space-x-4">
                    <a
                      href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="GitHub"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/sahil-ali-12345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <button
                      onClick={handleThemeToggle}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Toggle theme"
                    >
                      <ThemeSwitch />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      {/* Theme Transition Wrapper */}
      <style jsx global>{`
        .theme-transition * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-300 hover:scale-105 active:scale-95 group"
            aria-label="Back to top"
            data-testid="back-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: reducedMotion ? 'tween' : 'spring',
                stiffness: 500,
                damping: 30,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={!reducedMotion ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!reducedMotion ? { scale: 0.95 } : {}}
            
          >
            <FiChevronUp className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavbar;
