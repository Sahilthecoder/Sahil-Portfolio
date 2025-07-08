import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail, FiCode, FiDatabase, FiPieChart, FiBarChart2, FiCpu } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { ImageWithFallback } from '../../utils/imageUtils.jsx';
import getImagePath from '../../utils/imagePaths';
import './HeroSection.css';

// Utility function for smooth scrolling with offset
const scrollToSection = (path) => {
  // If it's a hash link (like #about)
  if (path.startsWith('#')) {
    const sectionId = path.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      return true;
    }
  }
  return false;
};

const HeroSection = ({
  title = "Hi, I'm Sahil Ali",
  subtitle = 'AI Expert | Data Analyst | Inventory Specialist',
  description = 'I leverage cutting-edge AI tools and data analytics to optimize inventory systems and drive business intelligence.',
  primaryButton = { text: 'View My Work', link: '/projects', showArrow: true },
  secondaryButton = { text: 'Contact Me', link: '/contact', showArrow: true },
  isHome = true,
  showProfileImage = false,
  profileImage = '/Sahil-Portfolio/images/profile/profile.avif',
  children,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  // Icons for floating elements
  const icons = [
    { icon: <FiDatabase size={24} />, className: 'top-1/4 left-1/6' },
    { icon: <FiPieChart size={28} />, className: 'top-1/3 right-1/5' },
    { icon: <FiBarChart2 size={22} />, className: 'bottom-1/4 left-1/4' },
    { icon: <FiCpu size={26} />, className: 'bottom-1/3 right-1/6' },
    { icon: <FiCode size={24} />, className: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' },
  ];

  // Handle button click with smooth scroll or navigation
  const handleButtonClick = (e, button) => {
    // If it's an external link or has a custom click handler, let it behave normally
    if (button.link.startsWith('http') || button.onClick) {
      if (button.onClick) button.onClick(e);
      return;
    }

    // Check if it's a hash link and handle smooth scrolling
    if (button.link.startsWith('#')) {
      e.preventDefault();
      const scrolled = scrollToSection(button.link);
      if (scrolled) return;
    }

    // For regular internal links
    if (button.link && !button.link.startsWith('http')) {
      e.preventDefault();
      navigate(button.link);
    }
  };

  const socialLinks = [
    { 
      icon: <FiGithub className="w-5 h-5" />, 
      url: 'https://github.com/SahilTheCoder',
      text: 'github.com/SahilTheCoder',
      label: 'GitHub'
    },
    { 
      icon: <FiLinkedin className="w-5 h-5" />, 
      url: 'https://www.linkedin.com/in/sahil-ali-714867242/',
      text: 'linkedin.com/in/sahil-ali-714867242/',
      label: 'LinkedIn'
    },
    { 
      icon: <FiMail className="w-5 h-5" />, 
      url: 'mailto:sahilkhan36985@gmail.com',
      text: 'sahilkhan36985@gmail.com',
      label: 'Email'
    },
  ];
  
  // Add keyframe animation for gradient background
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }
  }, []);

  return (
    <section className={`hero-section data-pattern-bg relative overflow-hidden ${isHome ? 'min-h-screen flex items-center' : 'py-20'}`} ref={containerRef}>
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10" 
        style={{
          background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-color))',
          backgroundSize: '200% 200%',
          animation: 'gradientBG 15s ease infinite',
        }} 
      />

      {/* Floating data elements */}
      {isHome && icons.map((icon, index) => {
        const animationX = Math.random() * 40 - 20;
        return (
          <motion.div
            key={index}
            className={`floating-element absolute ${
              index % 2 === 0 ? 'text-primary' : 'text-secondary'
            } ${icon.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0],
              y: [20, 0, -20, -40],
              x: [0, animationX, 0, -animationX]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'loop',
              delay: index * 2,
              ease: 'linear'
            }}
          >
            {icon.icon}
          </motion.div>
        );
      })}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            <motion.div className="mb-8">
              <h1 className="hero-title">{title}</h1>
              <p className="hero-subtitle">{subtitle}</p>
              <p className="hero-description">{description}</p>
              
              {/* Buttons */}
              <div className="hero-buttons">
                {primaryButton && (
                  <Link
                    to={primaryButton.link}
                    className="primary-btn"
                    onClick={(e) => handleButtonClick(e, primaryButton)}
                  >
                    {primaryButton.text}
                    {primaryButton.showArrow && <FiArrowRight className="w-5 h-5" />}
                  </Link>
                )}
                
                {secondaryButton && (
                  <Link
                    to={secondaryButton.link}
                    className="secondary-btn"
                    onClick={(e) => handleButtonClick(e, secondaryButton)}
                  >
                    {secondaryButton.text}
                    {secondaryButton.showArrow && <FiArrowRight className="w-5 h-5" />}
                  </Link>
                )}
              </div>

              {/* Contact Section */}
              <div className="mt-12">
                <motion.div 
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get in touch with Me</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Let's connect! Your data and my expertise can create impactful solutions.<br />
                    Find more <strong>About Me</strong> on these platforms:
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <span>Rajasthan, India (Open for Relocation)</span>
                    </li>
                    
                    {socialLinks.map((link, index) => (
                      <motion.li 
                        key={index}
                        className="group flex items-center space-x-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-full"
                          aria-label={link.label}
                        >
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                            {link.icon}
                          </span>
                          <span className="truncate">{link.text}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      &copy; {new Date().getFullYear()} sahilthecoder (Sahil Ali) Portfolio. All rights reserved.
                      <span className="block mt-1">
                        Design: <a href="http://html5up.net" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">HTML5 UP</a>
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {children}
            </motion.div>
          </motion.div>

          {/* Right Column - Image - Only shown when explicitly requested */}
          {showProfileImage && (
            <motion.div
              className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="hero-image-container">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover object-top"
                      fallbackSrc="/Sahil-Portfolio/images/profile-fallback.png"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full shadow-xl z-10"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
