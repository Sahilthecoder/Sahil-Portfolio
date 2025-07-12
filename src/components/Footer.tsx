import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaRocket } from 'react-icons/fa';
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
      icon: <FaLinkedin className="w-5 h-5" />,
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
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-12 pb-8 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Sahil Ali
            </h3>
            <p className="text-sm text-gray-400">
              Crafting digital experiences with cutting-edge technology and innovative solutions.
            </p>
            <p className="text-xs text-gray-500">
              Built with 💙 and lots of caffeine.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-cyan-400">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/5 hover:border-cyan-400/30`}
                  aria-label={item.label}
                >
                  <span className={`text-white`}>
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-cyan-400">Location</h4>
            <p className="text-sm text-gray-400">
              Based in Rajasthan, India
              <span className="block text-xs text-gray-500 mt-1">Open to remote opportunities</span>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Sahil Ali. All rights reserved.
            <span className="block mt-1 text-cyan-400/70">Made with 💙 by a curious data soul</span>
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
            className="fixed bottom-6 right-6 p-3.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: isHovered ? -3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaRocket className="w-5 h-5" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
