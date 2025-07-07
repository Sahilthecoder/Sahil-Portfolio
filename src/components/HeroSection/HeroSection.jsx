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
  profileImage = getImagePath('profile'),
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
    { icon: <FiGithub />, url: 'https://github.com/sahilthecoder' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/sahilthecoder' },
    { icon: <FiTwitter />, url: 'https://twitter.com/sahilthecoder' },
    { icon: <FiMail />, url: 'mailto:contact@sahilthecoder.me' },
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

              {/* Social Links */}
              <motion.div
                className="flex justify-center lg:justify-start items-center gap-4 mt-8"
                variants={{
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
                }}
              >
                {socialLinks.map((social, index) => {
                  const platform = social.url.includes('github')
                    ? 'GitHub'
                    : social.url.includes('linkedin')
                      ? 'LinkedIn'
                      : social.url.includes('twitter')
                        ? 'Twitter'
                        : 'Link';

                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${platform} profile`}
                    >
                      {social.icon}
                    </motion.a>
                  );
                })}
              </motion.div>
              
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
                      fallbackSrc={getImagePath('profile', '', 'placeholder-profile.jpg')}
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
