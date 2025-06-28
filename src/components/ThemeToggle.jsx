// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If no saved theme, use system preference
    if (!savedTheme) {
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = (e) => {
    e.preventDefault();
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIsDark = !isDark;
    
    // Add transition class for smooth theme change
    document.documentElement.classList.add('theme-transition');
    
    // Toggle dark class with a small delay to ensure transition works
    setTimeout(() => {
      setIsDark(newIsDark);
      document.documentElement.classList.toggle('dark', newIsDark);
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
        setIsAnimating(false);
      }, 200);
    }, 10);
  };

  if (!mounted) {
    return (
      <button 
        className="w-10 h-10 rounded-full flex items-center justify-center
                 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Loading theme"
      >
        <FiSun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center 
                bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                text-gray-700 dark:text-yellow-300
                transition-all duration-200 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                dark:focus:ring-offset-gray-900
                ${isAnimating ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}
      disabled={isAnimating}
    >
      {isDark ? (
        <FiSun className="w-5 h-5 transition-transform duration-200" />
      ) : (
        <FiMoon className="w-5 h-5 transition-transform duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
