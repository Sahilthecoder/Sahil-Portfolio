import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavbar } from './NavbarContext';
import { FiMenu, FiX, FiSun, FiMoon, FiMic, FiMicOff, FiAward, FiUser, FiCode, FiLayers, FiMail, FiHome, FiZap } from 'react-icons/fi';

// Simple Logo Component
const Logo = () => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center bg-indigo-500 rounded-lg text-white font-bold text-xl">
      SA
      <div className="absolute inset-0 rounded-lg border-2 border-indigo-400 opacity-50 animate-pulse"></div>
    </div>
  );
};

// Navbar Item Component
const NavItem = ({ to, icon: Icon, label, isActive, onClick }) => {
  return (
    <motion.li 
      className="relative group"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <a
        href={to}
        onClick={onClick}
        className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive 
            ? 'bg-black text-white shadow-md shadow-black/20 hover:bg-gray-900'
            : 'text-gray-800 hover:text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/90 dark:hover:text-white'
        }`}
      >
        <Icon className={`w-5 h-5 mr-2 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-black dark:group-hover:text-white'}`} />
        <span className="font-medium">{label}</span>
        {isActive && (
          <motion.span 
            className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white rounded-full"
            layoutId="activeNav"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </a>
      
      {/* Analytics tooltip */}
      <div className="absolute z-50 hidden group-hover:block w-48 p-2 mt-2 text-xs bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-100 dark:border-gray-700/50">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {label} • 1.2k views this week
        </div>
        <div className="h-1 mt-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
            style={{ width: `${Math.min(100, Math.floor(Math.random() * 30) + 70)}%` }}
          />
        </div>
      </div>
    </motion.li>
  );
};

// Voice Command Button
const VoiceCommandButton = () => {
  const { isListening, startVoiceCommand, stopVoiceCommand } = useNavbar();
  
  const toggleVoiceCommand = () => {
    if (isListening) {
      stopVoiceCommand();
    } else {
      startVoiceCommand();
    }
  };

  return (
    <motion.button
      onClick={toggleVoiceCommand}
      className={`p-3 rounded-full relative overflow-hidden transition-all duration-200 ${
        isListening 
          ? 'bg-red-500/20 text-red-600 shadow-inner' 
          : 'bg-white/10 text-gray-700 hover:bg-gray-200 hover:text-black dark:text-gray-200 dark:hover:bg-gray-800/90 dark:hover:text-white'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isListening ? 'Listening...' : 'Voice Command'}
    >
      {isListening ? (
        <div className="flex items-center justify-center">
          <FiMicOff className="w-5 h-5" />
          <span className="absolute flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      ) : (
        <FiMic className="w-5 h-5" />
      )}
    </motion.button>
  );
};

// Theme Toggle Button
const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useNavbar();
  
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative p-2.5 rounded-full bg-white/5 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/80 transition-all duration-200 group"
      whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.span
          className="absolute flex items-center justify-center"
          initial={false}
          animate={{ 
            rotate: darkMode ? 0 : 90,
            opacity: darkMode ? 1 : 0,
            y: darkMode ? 0 : 20
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <FiSun className="w-4 h-4 text-yellow-400" />
        </motion.span>
        <motion.span
          className="absolute flex items-center justify-center"
          initial={false}
          animate={{
            rotate: darkMode ? -90 : 0,
            opacity: darkMode ? 0 : 1,
            y: darkMode ? -20 : 0
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <FiMoon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </motion.span>
      </div>
      <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </motion.button>
  );
};

// AI Assistant Button
const AIAssistantButton = () => {
  const { aiAssistantOpen, toggleAiAssistant } = useNavbar();
  const buttonRef = useRef(null);
  
  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        onClick={toggleAiAssistant}
        className={`relative p-2.5 rounded-full transition-all duration-200 ${
          aiAssistantOpen 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
            : 'bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="AI Assistant"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <FiZap className={`w-4 h-4 transition-transform duration-200 ${aiAssistantOpen ? 'rotate-12' : ''}`} />
          {aiAssistantOpen && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          )}
        </div>
        <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </motion.button>
      
      {/* AI Assistant Panel */}
      <AnimatePresence>
        {aiAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700/50"
            style={{
              transformOrigin: 'top right',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about my work</p>
            </div>
            <div className="h-64 p-4 overflow-y-auto">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>How can I help you today?</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-700/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask me something..."
                  className="w-full px-4 py-2.5 pr-12 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                  autoFocus
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-indigo-400 rounded-full">
                  <FiMic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const { 
    isMenuOpen, 
    toggleMenu, 
    closeOverlays,
    activeTab,
    userMood,
    isListening
  } = useNavbar();
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navbarRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    navbarRef.current?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      navbarRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'home', label: 'Home', icon: FiHome },
    { name: 'about', label: 'About', icon: FiUser },
    { name: 'experience', label: 'Experience', icon: FiAward },
    { name: 'projects', label: 'Projects', icon: FiLayers },
    { name: 'contact', label: 'Contact', icon: FiMail },
  ];

  // Glow effect style based on mouse position
  const glowStyle = {
    '--glow-x': `${(mousePosition.x * 100) + 50}%`,
    '--glow-y': `${(mousePosition.y * 100) + 50}%`,
    '--glow-color': isListening 
      ? 'rgba(239, 68, 68, 0.2)' // Red glow when listening
      : 'rgba(99, 102, 241, 0.1)', // Indigo glow otherwise
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
        ref={navbarRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/30 shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-500/10 py-2'
            : 'bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/30 py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="/"
              className="relative group flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <Logo />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                Sahil Ali
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                {userMood || '...'}
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <ul className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    to={`/${item.name === 'home' ? '' : item.name}`}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeTab === item.name}
                    onClick={closeOverlays}
                  />
                ))}
              </ul>
              
              <div className="flex items-center space-x-1 ml-2 border-l border-white/10 dark:border-gray-800/30 pl-3">
                <VoiceCommandButton />
                <AIAssistantButton />
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-2">
              <VoiceCommandButton />
              <AIAssistantButton />
              <ThemeToggle />
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </motion.button>
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
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    to={`/${item.name === 'home' ? '' : item.name}`}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeTab === item.name}
                    onClick={closeOverlays}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Overlay when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40"
            onClick={closeOverlays}
          />
        )}
      </AnimatePresence>

      {/* AI Assistant Panel has been moved to be a dropdown from the button */}
    </>
  );
};

export default Navbar;
