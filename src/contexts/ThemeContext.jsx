import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [mounted, setMounted] = useState(false);
  const [autoTheme, setAutoTheme] = useState(true);

  // After mounting, we have access to the theme
  useEffect(() => {
    // Check system preference first
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Get saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedAutoTheme = localStorage.getItem('autoTheme');
    
    // Set theme based on saved preference or system preference
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
    
    // If no autoTheme preference is saved, default to true to follow system
    setAutoTheme(savedAutoTheme === null ? true : savedAutoTheme === 'true');
    setMounted(true);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (autoTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [autoTheme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      // When manually toggling, disable auto-theme to respect user's choice
      setAutoTheme(false);
      localStorage.setItem('autoTheme', 'false');
      return newTheme;
    });
  }, []);

  // Toggle auto theme
  const toggleAutoTheme = useCallback(() => {
    setAutoTheme((prev) => {
      const newValue = !prev;
      localStorage.setItem('autoTheme', newValue);
      // If enabling auto-theme, update to match system preference
      if (newValue) {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
      }
      return newValue;
    });
  }, []);

  // Update the theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Reset all theme attributes
    root.removeAttribute('data-theme');
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', systemTheme);
      root.classList.add(systemTheme);
    } else {
      root.setAttribute('data-theme', theme);
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Update theme based on time of day when autoTheme is enabled
  useEffect(() => {
    if (!autoTheme) return;

    const updateThemeBasedOnTime = () => {
      const hours = new Date().getHours();
      const isNightTime = hours < 6 || hours >= 18; // 6 PM to 6 AM
      const newTheme = isNightTime ? 'dark' : 'light';

      if (theme !== newTheme) {
        setTheme(newTheme);
      }
    };

    updateThemeBasedOnTime();
    const interval = setInterval(updateThemeBasedOnTime, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [autoTheme, theme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    autoTheme,
    toggleAutoTheme,
    mounted,
    isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
