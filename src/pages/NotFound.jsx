import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaArrowLeft, FaHome, FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { withBasePath } from '../utils/paths';

const NotFound = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Set document title
  useEffect(() => {
    document.title = 'Page Not Found | Sahil Ali';
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-2xl w-full p-8 rounded-2xl shadow-2xl"
        style={{
          background: isDarkMode
            ? 'linear-gradient(145deg, #1f2937, #111827)'
            : 'linear-gradient(145deg, #ffffff, #f3f4f6)',
          border: isDarkMode
            ? '1px solid rgba(75, 85, 99, 0.3)'
            : '1px solid rgba(209, 213, 219, 0.5)',
        }}
      >
        {/* 404 Text */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            404
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mt-2">
            Oops! Page not found
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto"
        >
          The page you're looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search the site..."
              className={`w-full px-4 py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} border`}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FaArrowLeft />
            Go Back
          </motion.button>

          <Link to={withBasePath('/')}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
            >
              <FaHome />
              Return Home
            </motion.div>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Need help?</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:contact@sahilali.dev" className="text-blue-500 hover:underline text-sm">
              Contact Support
            </a>
            <span className="text-gray-400">|</span>
            <Link to={withBasePath('/sitemap')} className="text-blue-500 hover:underline text-sm">
              View Sitemap
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
