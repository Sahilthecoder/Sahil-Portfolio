import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { getImagePath } from '../../utils/imagePath';
import './HeroSection.css';

const HeroSection = ({
  title = "Hi, I'm Sahil Ali",
  subtitle = 'AI Expert | Data Analyst | Inventory Specialist',
  description = 'I leverage cutting-edge AI tools and data analytics to optimize inventory systems and drive business intelligence.',
  primaryButton = { text: 'View My Work', link: '/projects', showArrow: true },
  secondaryButton = { text: 'Contact Me', link: '/contact', showArrow: true },
  isHome = true,
  showProfileImage = false,
  profileImage = {
    src: getImagePath('images/profile.avif'),
    alt: 'Profile',
    badge: null,
    fallbackSrc: getImagePath('images/placeholder-profile.jpg')
  },
  children,
}) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/sahilthecoder' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/sahilthecoder' },
    { icon: <FiTwitter />, url: 'https://twitter.com/sahilthecoder' },
    { icon: <FiMail />, url: 'mailto:contact@sahilthecoder.me' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern" style={{ zIndex: 1 }}></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            variants={item}
          >
            <motion.div 
              className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to my portfolio
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300"
              variants={item}
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-medium"
                variants={item}
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 font-semibold">
                  {subtitle}
                </span>
              </motion.p>
            )}
            
            {description && (
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                variants={item}
              >
                {description}
              </motion.p>
            )}

            <motion.div 
              className="hero-buttons"
              variants={item}
            >
              {/* Primary CTA Button */}
              {primaryButton && (
                <Link
                  to={primaryButton.link}
                  className="hero-button primary"
                  onClick={primaryButton.onClick || (() => {})}
                >
                  <span className="flex items-center gap-2">
                    {primaryButton.text}
                    {primaryButton.showArrow && (
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </span>
                </Link>
              )}

              {/* Secondary CTA Button */}
              {secondaryButton && (
                <Link
                  to={secondaryButton.link}
                  className="hero-button secondary"
                  onClick={secondaryButton.onClick || (() => {})}
                >
                  <span className="flex items-center gap-2">
                    {secondaryButton.text}
                    {secondaryButton.showArrow && (
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </span>
                </Link>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start items-center gap-4 mt-8"
              variants={item}
            >
              {socialLinks.map((social, index) => {
                const platform = social.url.includes('github') ? 'GitHub' : 
                                social.url.includes('linkedin') ? 'LinkedIn' :
                                social.url.includes('twitter') ? 'Twitter' : 'Link';
                
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`${platform} profile`}
                  >
                    {React.cloneElement(social.icon, { className: 'w-5 h-5' })}
                  </motion.a>
                );
              })}
            </motion.div>

            {children}
          </motion.div>

          {/* Right Column - Image */}
          {(isHome || showProfileImage) && (
            <motion.div 
              className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 dark:border-gray-800/50 shadow-2xl">
                    {profileImage.customImage ? (
                      profileImage.customImage({
                        src: profileImage.src,
                        alt: profileImage.alt || 'Profile',
                        className: 'w-full h-full object-cover object-top',
                        fallbackSrc: profileImage.fallbackSrc || '/images/placeholder-profile.jpg',
                        loading: 'lazy'
                      })
                    ) : (
                      <img 
                        src={getImagePath(profileImage.src, 'images')}
                        alt={profileImage.alt || 'Profile'}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getImagePath(profileImage.fallbackSrc || 'placeholder-profile.jpg', 'images');
                        }}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-full shadow-xl z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
                >
                  <FaUserFriends className="w-6 h-6" />
                </motion.div>
                
                <motion.div 
                  className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 rounded-full opacity-20 dark:opacity-10"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
