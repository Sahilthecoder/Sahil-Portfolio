import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const HeroSection = ({
  title,
  subtitle,
  description,
  primaryButton = { text: 'View My Work', link: '/experience', showArrow: true },
  secondaryButton = { text: 'Contact Me', link: '/contact', showArrow: true },
  isHome = false,
  children,
}) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className={`relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden`}>
      {/* Grid background - moved to a lower z-index */}
      <div 
        className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"
        style={{ zIndex: 1 }}
      ></div>
      
      {/* Animated background elements - moved to a lower z-index */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="w-full text-center mb-10 md:mb-0"
            variants={item}
          >
            <motion.h1 
              className={`${isHome ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-4xl md:text-5xl'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300 mb-6`}
              variants={item}
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.div 
                className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6"
                variants={item}
              >
                {subtitle}
              </motion.div>
            )}
            
            {description && (
              <motion.p 
                className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mb-10 leading-relaxed mx-auto"
                variants={item}
              >
                {description}
              </motion.p>
            )}

            <motion.div 
              className="flex flex-wrap justify-center gap-4 w-full md:w-auto"
              variants={item}
            >
              {primaryButton && (
                <Link
                  to={primaryButton.link}
                  className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg text-center shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">
                      {primaryButton.text}
                    </span>
                    {primaryButton.showArrow && (
                      <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                </Link>
              )}

              {secondaryButton && (
                <Link
                  to={secondaryButton.link}
                  className="group relative bg-white hover:bg-gray-50 text-indigo-700 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700 flex-shrink-0"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1 whitespace-nowrap">
                      {secondaryButton.text}
                    </span>
                    {secondaryButton.showArrow && (
                      <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                    )}
                  </span>
                  <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                </Link>
              )}
            </motion.div>

            {children}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
