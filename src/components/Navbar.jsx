import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useVoice } from '../context/VoiceContext';

const navLinks = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'About', path: '/about', icon: '👤' },
  { name: 'Projects', path: '/projects', icon: '💻' },
  { name: 'Contact', path: '/contact', icon: '✉️' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isListening, toggleListening, isSupported: isVoiceSupported } = useVoice();
  const location = useLocation();
  const navbarRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle command palette with CMD/CTRL + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      // Toggle voice commands with CMD/CTRL + Space
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        if (isVoiceSupported) {
          toggleListening();
        }
      }
      // Close command palette with Escape
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceSupported, toggleListening]);

  // Theme toggle with animation
  const handleThemeToggle = () => {
    toggleTheme();
    // Add a subtle animation
    document.documentElement.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  };

  // Get theme icon based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return '🌙';
      case 'light':
        return '☀️';
      case 'futuristic':
        return '🚀';
      default:
        return '🌓';
    }
  };

  // Command palette items
  const commands = [
    { name: 'Toggle Dark Mode', action: handleThemeToggle, icon: '🌓', shortcut: 'T' },
    { name: 'Search', action: () => document.getElementById('search-input')?.focus(), icon: '🔍', shortcut: 'S' },
    { name: 'Home', action: () => window.location.href = '/', icon: '🏠', shortcut: 'H' },
    { name: 'Projects', action: () => window.location.href = '/projects', icon: '💻', shortcut: 'P' },
    { name: 'Contact', action: () => window.location.href = '/contact', icon: '✉️', shortcut: 'C' },
  ];

  return (
    <>
      <motion.header
        ref={navbarRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-2 bg-opacity-90 backdrop-blur-md' : 'py-4 bg-opacity-50'
        }`}
        style={{
          background: theme === 'futuristic' 
            ? 'linear-gradient(90deg, rgba(11, 11, 25, 0.9), rgba(17, 17, 40, 0.9))' 
            : theme === 'dark' 
              ? 'rgba(10, 10, 15, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
          borderBottom: isScrolled 
            ? `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}` 
            : 'none',
          boxShadow: isScrolled 
            ? `0 4px 6px -1px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}` 
            : 'none',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              aria-label="Home"
            >
              <motion.div 
                className="text-2xl font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="gradient-text">SA</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                    location.pathname === link.path
                      ? 'text-blue-500 bg-blue-500 bg-opacity-10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:bg-opacity-50'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Voice Command Button */}
              {isVoiceSupported && (
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isListening
                      ? 'text-red-500 bg-red-500 bg-opacity-20 animate-pulse'
                      : 'text-gray-400 hover:text-blue-500 hover:bg-gray-800 hover:bg-opacity-50'
                  }`}
                  aria-label={isListening ? 'Listening...' : 'Start voice command'}
                  title={isListening ? 'Listening...' : 'Start voice command (Ctrl+Space)'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              )}

              {/* Command Palette Button */}
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden md:flex items-center px-3 py-2 text-sm rounded-lg bg-gray-800 bg-opacity-50 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Open command palette"
                title="Command Palette (Ctrl+K)"
              >
                <span className="mr-2">⌘K</span>
                <span>Quick Actions</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-full text-gray-300 hover:text-yellow-400 hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                <span className="text-xl">{getThemeIcon()}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 hover:bg-opacity-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              style={{
                background: theme === 'dark' ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                borderTop: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
              }}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium ${
                      location.pathname === link.path
                        ? 'text-blue-500 bg-blue-500 bg-opacity-10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-3">{link.icon}</span>
                      {link.name}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                >
                  <span className="mr-3">⌘</span>
                  Command Palette
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
              onClick={() => setIsCommandPaletteOpen(false)}
            />
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl"
                style={{
                  background: theme === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  border: theme === 'futuristic' ? '1px solid rgba(183, 0, 255, 0.3)' : 'none',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="command-palette-input"
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Type a command or search..."
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          e.preventDefault();
                          setIsCommandPaletteOpen(false);
                        }
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <kbd className="inline-flex items-center px-2 py-1 border rounded text-xs font-mono text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                        ESC
                      </kbd>
                    </div>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {commands.map((command, index) => (
                    <button
                      key={command.name}
                      className={`w-full text-left px-6 py-4 flex items-center justify-between ${
                        index < commands.length - 1 ? 'border-b' : ''
                      } ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}
                      onClick={() => {
                        command.action();
                        setIsCommandPaletteOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{command.icon}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {command.name}
                        </span>
                      </div>
                      {command.shortcut && (
                        <kbd className="inline-flex items-center px-2 py-1 text-xs font-mono text-gray-500 dark:text-gray-400">
                          {command.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
