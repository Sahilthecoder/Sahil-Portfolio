import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [autoTheme, setAutoTheme] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isDark = theme === 'dark';

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedAutoTheme = localStorage.getItem('autoTheme') === 'true';

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    setAutoTheme(savedAutoTheme);
    setIsMounted(true);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  // Toggle auto theme
  const toggleAutoTheme = useCallback(() => {
    setAutoTheme((prev) => {
      const newValue = !prev;
      localStorage.setItem('autoTheme', newValue);
      return newValue;
    });
  }, []);

  // Apply theme classes to document
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('light', 'dark');

    // Add current theme class
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);

    // Update CSS variables
    updateCSSVariables(theme);
  }, [theme, isMounted]);

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

    // Initial update
    updateThemeBasedOnTime();

    // Set up interval for auto theme updates
    const intervalId = setInterval(updateThemeBasedOnTime, 300000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, [autoTheme, theme]);

  // Listen for system theme changes when autoTheme is enabled
  useEffect(() => {
    if (!autoTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [autoTheme]);

  // Update CSS variables based on theme
  const updateCSSVariables = (currentTheme) => {
    const root = document.documentElement;

    if (currentTheme === 'dark') {
      // Dark theme variables
      root.style.setProperty('--bg-primary', '#0f172a'); // Slate 900
      root.style.setProperty('--bg-secondary', '#1e293b'); // Slate 800
      root.style.setProperty('--text-primary', '#f8fafc'); // Slate 50
      root.style.setProperty('--text-secondary', '#94a3b8'); // Slate 400
      root.style.setProperty('--accent', '#60a5fa'); // Blue 400
      root.style.setProperty('--accent-hover', '#3b82f6'); // Blue 500
      root.style.setProperty('--border-color', '#334155'); // Slate 700
    } else if (theme === 'light') {
      // Light theme with better contrast
      root.style.setProperty('--bg-primary', '#f8fafc'); // Slate 50
      root.style.setProperty('--bg-secondary', '#ffffff'); // White
      root.style.setProperty('--text-primary', '#1e293b'); // Slate 800
      root.style.setProperty('--text-secondary', '#64748b'); // Slate 500
      root.style.setProperty('--accent', '#3b82f6'); // Blue 500
      root.style.setProperty('--accent-hover', '#2563eb'); // Blue 600
      root.style.setProperty('--border-color', '#e2e8f0'); // Slate 200
    } else {
      // futuristic
      // Futuristic theme with better contrast
      root.style.setProperty('--bg-primary', '#0f172a'); // Slate 900
      root.style.setProperty('--bg-secondary', '#1e1b4b'); // Indigo 950
      root.style.setProperty('--text-primary', '#e0e7ff'); // Indigo 100
      root.style.setProperty('--text-secondary', '#a5b4fc'); // Indigo 300
      root.style.setProperty('--accent', '#818cf8'); // Indigo 400
      root.style.setProperty('--accent-hover', '#6366f1'); // Indigo 500
      root.style.setProperty('--border-color', '#3730a3'); // Indigo 800
    }
  };

  // Add dark mode class to html element if dark theme is active
  useEffect(() => {
    if (theme === 'dark' || theme === 'futuristic') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Create the context value
  const contextValue = {
    theme,
    setTheme,
    toggleTheme,
    autoTheme,
    toggleAutoTheme,
    isDark: theme === 'dark' || theme === 'futuristic',
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export the ThemeProvider as default
export default ThemeProvider;
