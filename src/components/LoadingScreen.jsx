import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Get theme-specific colors
  const getThemeColors = () => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'rgba(10, 10, 15, 0.95)',
          primary: '#00f7ff',
          secondary: '#b700ff'
        };
      case 'light':
        return {
          bg: 'rgba(245, 247, 250, 0.95)',
          primary: '#4f46e5',
          secondary: '#7c3aed'
        };
      case 'futuristic':
      default:
        return {
          bg: 'rgba(10, 10, 25, 0.95)',
          primary: '#00f7ff',
          secondary: '#b700ff'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ 
        backgroundColor: colors.bg,
        backdropFilter: 'blur(10px)'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative w-48 h-48 mb-8">
        {/* Animated circles */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-opacity-20"
          style={{ borderColor: colors.primary }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop'
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-opacity-20"
          style={{ borderColor: colors.secondary }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            delay: 0.5
          }}
        />
        <div className="absolute inset-8 flex items-center justify-center">
          <motion.div
            className="text-4xl font-bold"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}
          >
            SA
          </motion.div>
        </div>
      </div>

      {/* Loading text */}
      <motion.div 
        className="text-lg font-medium mb-4"
        style={{ color: theme === 'light' ? '#1a202c' : '#e0e0ff' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading Portfolio...
      </motion.div>

      {/* Progress bar */}
      <div 
        className="w-64 h-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            boxShadow: `0 0 10px ${colors.primary}80`
          }}
        />
      </div>

      {/* Loading tips */}
      <motion.div 
        className="mt-6 text-sm text-center max-w-md px-4"
        style={{ color: theme === 'light' ? '#4a5568' : '#a0a0b0' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>Tip: Try saying "Go to projects" or "Switch to dark mode"</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
