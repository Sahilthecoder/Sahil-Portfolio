import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaAngleUp, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Footer.module.css'; // Import the CSS module

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: 'https://github.com/Sahilthecoder/Sahil-Portfolio',
      label: 'GitHub',
      color: 'from-gray-800 to-gray-700',
    },
    {
      icon: <FaLinkedin className="w-5 h-5" aria-label="LinkedIn" role="img" />,
      href: 'https://www.linkedin.com/in/sahil-ali-714867242/',
      label: 'LinkedIn',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: 'https://wa.me/919875771550',
      label: 'WhatsApp',
      color: 'from-green-500 to-green-400',
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: 'mailto:sahilkhan36985@gmail.com',
      label: 'Email',
      color: 'from-red-500 to-red-400',
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-8 px-6 md:py-12 md:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Sahil Ali
            </h3>
            <p className="text-sm md:text-sm text-gray-400 leading-relaxed">
              Crafting digital experiences with cutting-edge technology and innovative solutions.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-sm font-semibold text-cyan-400 mb-4">Connect</h4>
            <div className="flex justify-center space-x-4 md:space-x-6">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/5 hover:border-cyan-400/30`}
                  aria-label={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`text-white`}>{item.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">Location</h4>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="w-4 h-4 text-white/80" />
              <p className="text-sm text-gray-400">
                Based in Rajasthan, India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Sahil Ali. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/80 via-blue-600/80 to-blue-700/80 backdrop-blur-sm border border-blue-300 hover:bg-gradient-to-br hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 z-50 shadow-sm hover:shadow-lg"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{
                rotate: isHovered ? 180 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <FaAngleUp className="w-5 h-5 text-white" />
              <span className="text-xs font-medium text-white/80">↑</span>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gradient-to-br from-blue-500/80 via-blue-600/80 to-blue-700/80 backdrop-blur-sm border border-blue-300 rounded-full text-xs font-medium text-white shadow-sm whitespace-nowrap"
            >
              Back to Top
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;