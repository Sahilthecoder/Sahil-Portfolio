import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitch.css';

export default function ThemeSwitch({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
        theme === 'light' 
          ? 'text-yellow-500 hover:bg-yellow-50' 
          : 'text-blue-400 hover:bg-gray-800'
      } ${className}`}
      aria-label="Toggle light / dark mode"
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </button>
  );
}
