import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button 
        aria-label="Toggle theme"
        className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ${className}`}
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const nextTheme = {
    light: 'dark',
    dark: 'system',
    system: 'light',
  }[theme];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5" />;
      case 'system':
        return <ComputerDesktopIcon className="w-5 h-5" />;
      default:
        return <SunIcon className="w-5 h-5" />;
    }
  };

  return (
    <button
      type="button"
      aria-label={`Toggle theme, current: ${theme}`}
      onClick={() => setTheme(nextTheme)}
      className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
    >
      {getThemeIcon()}
    </button>
  );
};

export default ThemeToggle;
