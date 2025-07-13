import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeSwitch({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const handleRef = useRef(null);

  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.style.transform = theme === 'dark' 
        ? 'translateX(100%)' 
        : 'translateX(0)';
    }
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <div
        className={`relative w-16 h-8 rounded-full transition-all duration-300 ease-in-out ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
            : 'bg-gradient-to-r from-gray-200 to-gray-300'
        }`}
      >
        <div
          ref={handleRef}
          className={`absolute left-0 w-8 h-8 rounded-full transition-transform duration-300 ease-in-out ${
            theme === 'dark' 
              ? 'transform translate-x-8 bg-white shadow-lg text-blue-600' 
              : 'transform translate-x-0 bg-white shadow-md text-gray-600'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="z-10">
              {theme === 'dark' ? (
                <FaSun size={16} className="text-blue-600" />
              ) : (
                <FaMoon size={16} className="text-gray-600" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleToggle}
        className="absolute inset-0 rounded-full cursor-pointer"
      />
    </div>
  );
}
