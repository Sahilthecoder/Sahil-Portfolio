import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaCode, FaSpinner, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Floating animation for particles
const floatingAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { theme } = useTheme();

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const isScrollingUp = prevScrollPos > currentScrollPos;
    
    // Update scroll state for shadow effect
    setScrolled(currentScrollPos > 10);
    
    // Skip animation-heavy operations if reduced motion is preferred
    if (reducedMotion) {
      setIsVisible(currentScrollPos > 300);
      return;
    }
    
    setPrevScrollPos(currentScrollPos);
    
    if (currentScrollPos > 300) {
      setIsVisible(true);
    } else if (isScrollingUp && currentScrollPos < 300) {
      setIsVisible(false);
    }
  }, [prevScrollPos, reducedMotion]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Copy email to clipboard
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('Sahilkhan36985@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  // Memoize scrollToTop function
  const scrollToTop = useCallback(async () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    try {
      // Focus management for better accessibility
      const mainContent = document.querySelector('main') || document.querySelector('body');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      }

      await new Promise(resolve => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Adjust delay based on scroll position for better UX
        const scrollDuration = Math.min(1000, window.pageYOffset * 0.5);
        setTimeout(() => {
          if (mainContent) {
            mainContent.removeAttribute('tabindex');
          }
          resolve();
        }, scrollDuration);
      });
    } catch (error) {
      console.error('Error during scroll:', error);
    } finally {
      setIsScrolling(false);
    }
  }, [isScrolling]);
  
  // Memoize brand animation variants
  const brandVariants = useMemo(() => ({
    hover: { 
      scale: 1.02, 
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { 
      scale: 0.98 
    }
  }), []);

  // Newsletter signup state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('newsletterSubscribed') === 'true';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);

  useEffect(() => {
    if (email.trim() !== '') {
      setShowSubscribeButton(true);
    } else {
      setShowSubscribeButton(false);
    }
  }, [email]);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Starting subscription process...');
      
      // Check if environment variables are set (using Vite's import.meta.env)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      
      console.log('EmailJS Config:', { 
        serviceId: serviceId ? '✅ Set' : '❌ Missing',
        templateId: templateId ? '✅ Set' : '❌ Missing',
        publicKey: publicKey ? '✅ Set' : '❌ Missing',
        adminTemplateId: adminTemplateId ? '✅ Set' : '❌ Missing',
        adminEmail: adminEmail ? '✅ Set' : '❌ Missing'
      });
      
      if (!serviceId || !templateId || !publicKey) {
        const missing = [];
        if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
        
        throw new Error(`Missing required EmailJS configuration: ${missing.join(', ')}`);
      }
      
      console.log('Environment variables loaded');
      
      // Dynamically import EmailJS only on the client side
      console.log('Importing EmailJS...');
      const emailjs = (await import('@emailjs/browser')).default;
      
      // Ensure email is properly formatted
      const recipientEmail = email.trim();
      if (!recipientEmail) {
        throw new Error('Recipient email is required');
      }

      // EmailJS template parameters - these must match your EmailJS template variables exactly
      const recipientName = (name || '').trim() || 'there';
      const todayDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      const currentYear = new Date().getFullYear();
      
      const templateParams = {
        to_email: recipientEmail,
        to_name: recipientName,
        from_name: 'Sahil Ali',
        reply_to: 'sahilali.dev@gmail.com',
        subject: '🎉 Welcome to My Newsletter!',
        message: 'Thank you for subscribing to my newsletter!',
        email: recipientEmail,
        user_email: recipientEmail,
        user_name: recipientName,
        current_year: currentYear,
        year: currentYear,
        date: todayDate // 👈 This is the key for your dynamic date
      };
      
      
      console.log('Sending email with params:', JSON.stringify(templateParams, null, 2));
      
      try {
        // Initialize EmailJS with your public key
        emailjs.init(publicKey);
        
        // Send the email with a timeout to prevent hanging
        const result = await Promise.race([
          emailjs.send(serviceId, templateId, templateParams, publicKey),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Email sending timed out')), 10000)
          )
        ]);
        
        console.log('Email sent successfully:', result);
        
        // Send notification to yourself (optional)
        if (adminTemplateId) {
          try {
            await emailjs.send(
              serviceId,
              adminTemplateId,
              {
                to_email: adminEmail || 'your-email@example.com',
                from_name: 'Portfolio Contact Form',
                subject: 'New Newsletter Subscriber',
                message: `New subscriber: ${name || 'No name'} (${email})`
              },
              publicKey
            );
            console.log('Admin notification sent');
          } catch (adminError) {
            console.warn('Failed to send admin notification:', adminError);
            // Don't fail the whole subscription if admin notification fails
          }
        }
        
        setIsSubscribed(true);
        setEmail('');
        setName('');
        localStorage.setItem('newsletterSubscribed', 'true');
        
        // Track successful subscription
        if (window.gtag) {
          window.gtag('event', 'subscribe', {
            'event_category': 'Newsletter',
            'event_label': 'Footer Subscription'
          });
        }
        
        return result;
      } catch (sendError) {
        console.error('Error sending email:', sendError);
        throw sendError; // Re-throw to be caught by the outer catch
      }
      
    } catch (err) {
      console.error('Subscription error details:', {
        error: err,
        message: err.text || err.message,
        status: err.status,
        response: err.response,
        stack: err.stack
      });
      
      let errorMessage = 'Failed to subscribe. Please try again later.';
      const errorText = err.text || err.message || '';
      
      // More specific error messages based on EmailJS response
      if (err.status === 403 || errorText.includes('Invalid')) {
        errorMessage = 'Email service authentication failed. Please check your EmailJS credentials.';
      } else if (errorText.includes('template not found') || errorText.includes('Template is empty')) {
        errorMessage = 'Email template not found or empty. Please check your template ID and content.';
      } else if (errorText.includes('Service not found')) {
        errorMessage = 'Email service not found. Please check your service ID.';
      } else if (err.status === 422) {
        errorMessage = 'Invalid request. Please check your template parameters match the template.';
      } else if (errorText.includes('limit')) {
        errorMessage = 'Email sending limit reached. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    setIsSubscribed(false);
  };

  // Smooth scroll reveal effect
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for background elements
  const parallaxOffset = scrollY * 0.1;

  return (
    <motion.footer 
      className={`relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 pt-16 pb-10 overflow-hidden transition-all duration-300 ${
        scrolled ? 'shadow-2xl' : 'shadow-none'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
    {/* Enhanced animated background elements */}
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
      <motion.div 
        className="absolute inset-0 bg-grid-gray-400 dark:bg-grid-gray-600"
        style={{ y: -parallaxOffset * 0.5 }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent dark:via-black/10"
        style={{ y: -parallaxOffset * 0.3 }}
      />
      
      {/* Optimized floating particles */}
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const offsetX = Math.random() * 20 - 10;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-blue-300 dark:bg-blue-900/30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${posX}%`,
              top: `${posY}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, offsetX, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        );
      })}
    </div>
      
      {/* Enhanced floating particles with reduced motion support */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {!reducedMotion && 
          [...Array(window.innerWidth < 768 ? 12 : 20)].map((_, i) => {
            const size = Math.random() * (window.innerWidth < 768 ? 4 : 6) + 2;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const offsetY = Math.random() * 30 + 10;
            
            return (
              <motion.div 
                key={`floating-${i}`}
                className="absolute rounded-full bg-blue-300 dark:bg-blue-900/30"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  opacity: Math.random() * 0.4 + 0.1,
                }}
                initial={{ y: 0 }}
                animate={{
                  y: [-offsetY, offsetY, -offsetY],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            );
          })
        }
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="space-y-5 md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-3 cursor-pointer group"
              variants={brandVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div 
                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300"
                whileHover={{ rotate: 10, transition: { type: 'spring', stiffness: 500 } }}
              >
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Sahil Ali
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data Analyst</p>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Transforming data into actionable insights. Let's collaborate on your next data-driven project.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { icon: FaGithub, url: 'https://github.com/Sahilthecoder', label: 'GitHub' },
                    { icon: FaLinkedin, url: 'https://linkedin.com/in/sahil-ali', label: 'LinkedIn' },
                    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
                    { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' }
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="md:pl-4 lg:pl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5 flex items-center">
              <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={item.path}
                      className={`group relative flex items-center text-sm transition-all duration-200 ${
                        location.pathname === item.path 
                          ? 'text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:translate-x-1'
                      }`}
                    >
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
    
                      {item.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 bg-white/50 dark:bg-gray-800/30 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700/50"
          >
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2 flex items-center">
              <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
              {isSubscribed ? 'Success!' : 'Newsletter'}
            </h3>
            
            {isSubscribed ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 rounded-lg flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      You're all set! 🎉
                    </h3>
                    <div className="mt-1 text-sm text-green-700 dark:text-green-300">
                      <p>Thanks for subscribing to my newsletter. Check your inbox for a confirmation email.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="w-full px-4 py-2 text-sm font-medium text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Dismiss this message
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get the latest updates, articles and resources delivered to your inbox. No spam, ever.
                </p>
                
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="sr-only">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="block w-full px-4 py-2 mt-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-5 py-2.5 text-sm font-medium text-white ${
                      isSubmitting 
                        ? 'bg-blue-400 dark:bg-blue-700' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    } rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-80 relative overflow-hidden group`}
                  >
                    {isSubmitting && (
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/20"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    whileHover={isSubmitting ? {} : { y: -1 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    aria-busy={isSubmitting}
                    aria-live="polite"
                    
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin h-4 w-4" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Subscribe to Newsletter</span>
                      </>
                    )}
                  </motion.button>
                </form>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Unsubscribe anytime. I respect your privacy.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Enhanced footer bottom section with wave divider */}
      <div className="relative overflow-hidden mt-12">
        <div className="absolute -top-1 left-0 right-0 h-12 overflow-hidden">
          <svg 
            className="w-full h-full text-white dark:text-gray-900" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512,54.67,583,72c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity="1" 
              className="fill-current"
            ></path>
          </svg>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <motion.p 
                  className="text-xs text-center sm:text-left text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  &copy; {currentYear} Sahil Ali. All rights reserved.
                </motion.p>
                <motion.div 
                  className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700"
                  whileHover={{ scaleY: 1.5 }}
                />
                <div className="flex items-center space-x-1 group">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Made with</span>
                  <span 
                    className="text-red-500 mx-1 group-hover:scale-110 transition-transform duration-200 cursor-help"
                    title="Proudly made with love in India!"
                  >
                    ❤️
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                    in India
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                {[
                  { name: 'Privacy Policy', path: '/privacy' },
                  { name: 'Terms', path: '/terms' },
                  { name: 'Sitemap', path: '/sitemap' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.name}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      to={item.path}
                      className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
      </div>

      {/* Enhanced back to top button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-900 z-50 touch-manipulation hover:shadow-2xl transition-all duration-300 will-change-transform group ${
              isScrolling ? 'cursor-wait' : 'cursor-pointer'
            }`}
            aria-label="Back to top"
            aria-busy={isScrolling}
            disabled={isScrolling}
            style={{
              '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width, 0px) var(--tw-ring-offset-color, #fff)',
              '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width, 0px)) var(--tw-ring-color, rgb(59 130 246 / 0.5))'
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20, 
                scale: 0.9,
                transition: { duration: 0.2 }
              },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  type: 'spring',
                  stiffness: 500,
                  damping: 25
                }
              },
              exit: { 
                opacity: 0, 
                y: 20, 
                scale: 0.9,
                transition: { duration: 0.2 }
              }
            }}
            whileHover={!reducedMotion && !isScrolling ? { 
              scale: 1.1,
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            } : undefined}
            whileTap={!reducedMotion && !isScrolling ? { 
              scale: 0.95,
              backgroundColor: 'rgba(59, 130, 246, 0.2)'
            } : undefined}
          >
            {isScrolling ? (
              <motion.div
                key="spinner"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: 'linear'
                }}
                aria-hidden="true"
              >
                <FaSpinner className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="arrow"
                className="flex items-center justify-center"
                initial={{ y: 0 }}
                animate={{
                  y: [-2, 2],
                }}
                transition={{
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                  opacity: { duration: 0.2 }
                }}
                aria-hidden="true"
              >
                <FaArrowUp className="h-5 w-5" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
      </div>
      
      {/* Performance optimization */}
      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .motion-element {
            will-change: transform, opacity;
          }
        }
        
        /* Back to top tooltip */
        [data-tooltip-content] {
          position: relative;
        }
        
        [data-tooltip-content]:hover::after {
          content: attr(data-tooltip-content);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        
        [data-tooltip-content]:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(-12px);
        }
        
        @media (max-width: 640px) {
          [data-tooltip-content]:hover::after {
            display: none;
          }
        }
      `}</style>
      </div>
    </motion.footer>
    
  );
};

export default Footer;
