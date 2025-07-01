import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const HeroSection = ({
  title,
  subtitle,
  description,
  primaryButton = { text: 'Get Started', link: '/', showArrow: true },
  secondaryButton = { text: 'Learn More', link: '/about', showArrow: true },
  showImage = true,
  imageProps = {
    src: `${import.meta.env.BASE_URL}profile.avif`,
    alt: 'Sahil Ali',
    className: 'w-full h-full object-cover',
  },
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className={`${showImage ? 'md:w-1/2' : 'w-full text-center'} mb-10 md:mb-0`}
            variants={item}
          >
            <motion.h1 
              className={`${isHome ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-bold text-gray-900 dark:text-white mb-4`}
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
                className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed"
                variants={item}
              >
                {description}
              </motion.p>
            )}

            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4"
              variants={item}
            >
              {primaryButton && (
                <Link
                  to={primaryButton.link}
                  className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg text-center shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
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
                  className="group relative bg-white hover:bg-gray-50 text-indigo-700 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
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

          {showImage && (
            <motion.div
              className={`${isHome ? 'md:w-1/2' : 'md:w-2/5'} mt-10 md:mt-0`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-800 p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      {...imageProps}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${import.meta.env.BASE_URL}optimized-images/placeholder.svg`;
                      }}
                      loading="eager"
                      className={imageProps.className || 'w-full h-full object-cover'}
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
