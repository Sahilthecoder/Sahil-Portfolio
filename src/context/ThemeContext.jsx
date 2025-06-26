import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // 'dark', 'light', or 'futuristic'
  const [isMounted, setIsMounted] = useState(false);

  // Load theme from localStorage or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    setIsMounted(true);
  }, []);

  // Save theme preference and apply classes
  useEffect(() => {
    if (!isMounted) return;
    
    // Remove all theme classes
    document.documentElement.classList.remove('dark-theme', 'light-theme', 'futuristic-theme');
    
    // Add current theme class
    document.documentElement.classList.add(`${theme}-theme`);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update CSS variables based on theme
    updateCSSVariables(theme);
  }, [theme, isMounted]);

  const updateCSSVariables = (theme) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#0a0a0f');
      root.style.setProperty('--bg-secondary', '#111118');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a0a0b0');
      root.style.setProperty('--accent', '#00f7ff');
      root.style.setProperty('--accent-hover', '#00d8df');
    } else if (theme === 'light') {
      root.style.setProperty('--bg-primary', '#f5f7fa');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--text-primary', '#1a202c');
      root.style.setProperty('--text-secondary', '#4a5568');
      root.style.setProperty('--accent', '#4f46e5');
      root.style.setProperty('--accent-hover', '#4338ca');
    } else { // futuristic
      root.style.setProperty('--bg-primary', '#0a0a12');
      root.style.setProperty('--bg-secondary', '#12121a');
      root.style.setProperty('--text-primary', '#e0e0ff');
      root.style.setProperty('--text-secondary', '#b0b0ff');
      root.style.setProperty('--accent', '#b700ff');
      root.style.setProperty('--accent-hover', '#ff00ff');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'futuristic';
      return 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {isMounted ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
