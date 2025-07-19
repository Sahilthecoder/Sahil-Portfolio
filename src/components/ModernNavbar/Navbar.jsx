import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiCode, FiMail, FiX, FiSun, FiMoon, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

// Scroll to top utility function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Scroll progress hook
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

// Animation variants
const menuVariants = {
  hidden: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const navItems = [
  { name: 'Home', path: '/', icon: <FiHome className="w-5 h-5" /> },
  { name: 'About', path: '/about', icon: <FiUser className="w-5 h-5" /> },
  { name: 'Projects', path: '/projects', icon: <FiCode className="w-5 h-5" /> },
  { name: 'UI Playground', path: '/ui-playground', icon: <FiCode className="w-5 h-5" /> },
  { name: 'Contact', path: '/contact', icon: <FiMail className="w-5 h-5" /> },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Sahilthecoder', icon: <FiGithub className="w-5 h-5" /> },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/sahil-ali', icon: <FiLinkedin className="w-5 h-5" /> },
  { name: 'WhatsApp', url: 'https://wa.me/919875771550', icon: <FaWhatsapp className="w-5 h-5" /> },
  { name: 'Email', url: 'mailto:sahilkhan36985@gmail.com', icon: <FiMail className="w-5 h-5" /> }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = useCallback((path) => {
    setIsMenuOpen(false);
    if (location.pathname === path) {
      scrollToTop();
    } else {
      navigate(path);
      setTimeout(scrollToTop, 0);
    }
  }, [location.pathname, navigate]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-[1000] m-0 p-0
    transition-all duration-300 ease-out
    ${isScrolled 
      ? 'bg-white dark:bg-gray-900 shadow-md' 
      : 'bg-white dark:bg-gray-900'}
    border-b border-gray-100 dark:border-gray-800
  `;

  const scrollProgress = useScrollProgress();

  return (
    <>
      <header className={navbarClasses}>
        {/* Scroll Progress Bar */}
        <div 
          className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="flex items-center space-x-2 group"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Home"
              >
                <img
                  src="/Sahil-Portfolio/images/logo/logo192.png"
                  alt="Sahil's Logo"
                  className="w-8 h-8"
                  width="32"
                  height="32"
                  loading="eager"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Sahil Ali
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 -mt-1">
                    Data Analyst
                  </span>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-md
                    transition-colors duration-200
                    ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Social Icons - Desktop */}
              <div className="hidden md:flex items-center space-x-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              className="md:hidden fixed inset-0 z-[9999] bg-white dark:bg-gray-900 overflow-y-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Logo and Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/Sahil-Portfolio/images/logo/logo192.png" 
                    alt="Sahil's Logo" 
                    className="w-10 h-10 rounded-full mr-3"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                      Sahil Ali
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 -mt-1">
                      Data Analyst
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <motion.div 
                className="px-4 py-6 space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={itemVariants}>
                    <button
                      onClick={() => {
                        handleNavigation(item.path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-colors duration-200
                        ${
                          location.pathname === item.path
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      {React.cloneElement(item.icon, {
                        className: `w-6 h-6 ${
                          location.pathname === item.path
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`,
                      })}
                      <span className="text-lg font-medium">{item.name}</span>
                    </button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="px-6 py-4 border-t border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 px-2">Connect with me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={link.name}
                    >
                      <span className="mr-3">{link.icon}</span>
                      <span className="text-sm font-medium">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="px-6 py-4 border-t border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2">Get in touch</h3>
                <a
                  href="mailto:sahilkhan36985@gmail.com"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
                >
                  <FiMail className="mr-3 w-5 h-5" />
                  <span>sahilkhan36985@gmail.com</span>
                </a>
                <a
                  href="tel:+919875771550"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiPhone className="mr-3 w-5 h-5" />
                  <span>+91 9875771550</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Add padding to account for fixed navbar */}
      <div className="h-16 md:h-0" />
    </>
  );
};

export default React.memo(Navbar);
