import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp,FaTwitter,FaYoutube, FaCode, FaSpinner, FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // Use theme from context with a default value
  const { theme = 'light' } = useTheme ? useTheme() : {};

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

  // Show/hide back-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip animation-heavy operations if reduced motion is preferred
      if (reducedMotion) {
        setIsVisible(window.pageYOffset > 300);
        return;
      }
      
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      setPrevScrollPos(currentScrollPos);
      
      if (currentScrollPos > 300) {
        setIsVisible(true);
      } else if (isScrollingUp && currentScrollPos < 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

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

  // Smooth scroll to top with loading state
  const scrollToTop = async () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    try {
      await new Promise(resolve => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Small delay to ensure smooth animation completes
        setTimeout(resolve, 1000);
      });
    } finally {
      setIsScrolling(false);
    }
  };
  
  // Brand animation variants
  const brandVariants = {
    hover: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    tap: { scale: 0.98 }
  };

  // Social media links with icons
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/Sahilthecoder' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com/in/sahil-ali' },
    { name: 'WhatsApp', icon: <FaWhatsapp />, url: 'https://wa.me/919719369855' },
    { name: 'Email', icon: <FaEnvelope />, url: 'mailto:sahilkhan36985@gmail.com' },
  ];

  // Newsletter signup state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('newsletterSubscribed') === 'true';
  });
  const [error, setError] = useState('');
  
  // Debug: Log environment variables in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Environment Variables:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing',
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? '✅ Set' : '❌ Missing',
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Missing',
        adminTemplateId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID ? '✅ Set' : '❌ Missing',
        adminEmail: import.meta.env.VITE_ADMIN_EMAIL ? '✅ Set' : '❌ Missing',
        nodeEnv: process.env.NODE_ENV,
        envKeys: Object.keys(import.meta.env)
      });
    }
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async (e) => {
    // Don't prevent default here since we're handling the button click directly
    
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
      console.log('=== Starting subscription process ===');
      console.log('Environment:', process.env.NODE_ENV);
      
      // Check if environment variables are set (using Vite's import.meta.env)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      
      // Log environment variables for debugging
      const envStatus = { 
        serviceId: serviceId ? '✅ Set' : '❌ Missing',
        templateId: templateId ? '✅ Set' : '❌ Missing',
        publicKey: publicKey ? '✅ Set' : '❌ Missing',
        adminTemplateId: adminTemplateId ? '✅ Set' : '❌ Missing',
        adminEmail: adminEmail ? '✅ Set' : '❌ Missing',
        allEnvKeys: Object.keys(import.meta.env)
      };
      
      console.log('EmailJS Configuration Status:', envStatus);
      
      if (!serviceId || !templateId || !publicKey) {
        const missing = [];
        if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
        if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
        
        const errorMsg = `Missing required EmailJS configuration: ${missing.join(', ')}`;
        console.error('Configuration Error:', errorMsg);
        throw new Error('Service configuration error. Please try again later.');
      }
      
      // Dynamically import EmailJS only on the client side
      console.log('Importing EmailJS...');
      let emailjs;
      try {
        emailjs = (await import('@emailjs/browser')).default;
        console.log('EmailJS imported successfully');
      } catch (importError) {
        console.error('Failed to import EmailJS:', importError);
        throw new Error('Failed to load email service. Please try again later.');
      }
      
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
        date: todayDate
      };
      
      console.log('=== Email Parameters ===');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Template Params:', JSON.stringify(templateParams, null, 2));
      
      try {
        console.log('Initializing EmailJS with public key:', publicKey ? '✅ Set' : '❌ Missing');
        emailjs.init(publicKey);
        
        console.log('Sending email...');
        // Send the email with a timeout to prevent hanging
        const result = await Promise.race([
          emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(result => {
              console.log('EmailJS Response:', result);
              return result;
            }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Email sending timed out after 10 seconds')), 10000)
          )
        ]);
        
        if (result.status === 200) {
          console.log('✅ Email sent successfully!', result);
          
          // Send notification to yourself (optional)
          if (adminTemplateId && adminEmail) {
            console.log('Sending admin notification...');
            try {
              const adminResult = await emailjs.send(
                serviceId,
                adminTemplateId,
                {
                  to_email: adminEmail,
                  from_name: 'Portfolio Contact Form',
                  subject: 'New Newsletter Subscriber',
                  message: `New subscriber: ${name || 'No name'} (${email})`,
                  subscriber_email: email,
                  subscriber_name: name || 'No name',
                  date: todayDate
                },
                publicKey
              );
              console.log('✅ Admin notification sent:', adminResult);
            } catch (adminError) {
              console.warn('⚠️ Failed to send admin notification:', adminError);
              // Don't fail the whole subscription if admin notification fails
            }
          }
          
          // Update UI state
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
        } else {
          console.error('❌ Email sending failed with status:', result.status, result);
          throw new Error('Failed to send email. Please try again later.');
        }
      } catch (sendError) {
        console.error('Error sending email:', sendError);
        throw sendError; // Re-throw to be caught by the outer catch
      }
      
    } catch (err) {
      // Log detailed error information
      const errorDetails = {
        name: err.name,
        message: err.message,
        status: err.status,
        text: err.text,
        response: err.response,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      };
      
      console.error('❌ Subscription Error Details:', JSON.stringify(errorDetails, null, 2));
      
      // Default error message
      let errorMessage = 'Failed to subscribe. Please try again later.';
      const errorText = (err.text || err.message || '').toLowerCase();
      
      // More specific error messages based on common issues
      if (err.status === 403 || errorText.includes('invalid')) {
        errorMessage = 'Email service authentication failed. Please check your EmailJS credentials.';
      } else if (errorText.includes('template') && (errorText.includes('not found') || errorText.includes('empty'))) {
        errorMessage = 'Email template not found. Please check your template ID.';
      } else if (errorText.includes('service not found')) {
        errorMessage = 'Email service not found. Please check your service ID.';
      } else if (err.status === 422) {
        errorMessage = 'Invalid request. Please check your template parameters.';
      } else if (errorText.includes('limit') || errorText.includes('quota')) {
        errorMessage = 'Email sending limit reached. Please try again later or contact support.';
      } else if (errorText.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (errorText.includes('timed out')) {
        errorMessage = 'Request timed out. Please try again in a moment.';
      }
      
      console.error('User-friendly error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDismiss = () => {
    setIsSubscribed(false);
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 pt-16 pb-10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-grid-gray-400 dark:bg-grid-gray-600" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent dark:via-black/10" />
      </div>
      
      {/* Floating particles - conditionally rendered based on motion preference */}
      {!reducedMotion && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(window.innerWidth < 768 ? 12 : 20)].map((_, i) => {
            const size = Math.random() * (window.innerWidth < 768 ? 4 : 6) + 2;
            return (
              <motion.div 
                key={i}
                className="absolute rounded-full bg-blue-300 dark:bg-blue-900/30"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.4 + 0.1
                }}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={floatingAnimation}
              />
            );
          })}
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="space-y-5"
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
                <h3 className="text-xl font-bold dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Sahil Ali
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data Analyst</p>
              </div>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Transforming data into actionable insights. Let's collaborate on your next data-driven project.
            </p>
            <div className="flex space-x-3 pt-1">
              {[
                { icon: FaGithub, url: 'https://github.com/Sahilthecoder', label: 'GitHub' },
                { icon: FaLinkedin, url: 'https://linkedin.com/in/sahil-ali', label: 'LinkedIn' },
                { icon: FaWhatsapp, url: 'https://wa.me/919719369855', label: 'WhatsApp' },
                { icon: FaEnvelope, url: 'mailto:sahilkhan36985@gmail.com', label: 'Email' }
              ].filter(Boolean).map((item, index) => (
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
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="md:pl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5 flex items-center">
              <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/', section: 'home' },
                { name: 'About', path: '/about', section: 'about' },
                { name: 'Projects', path: '/projects', section: 'projects' },
                { name: 'Contact', path: '/contact', section: 'contact' }
              ].map((item) => {
                // Handle navigation with scroll to top
                const handleClick = (e) => {
                  e.preventDefault();
                  // Always scroll to top first
                  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
                  
                  // Small delay to ensure scroll completes before navigation
                  setTimeout(() => {
                    if (location.pathname === item.path) {
                      // If already on the same page, just scroll to section if not home
                      if (item.section !== 'home') {
                        const element = document.getElementById(item.section);
                        if (element) {
                          element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
                        }
                      }
                    } else {
                      // Navigate to new page
                      navigate(item.path);
                    }
                  }, 100);
                };
                
                return (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Link
                      to={item.path}
                      onClick={handleClick}
                      className={`flex items-center text-sm transition-colors duration-200 ${
                        location.pathname === item.path 
                          ? 'text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 bg-white/50 dark:bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700/50"
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="sr-only">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-2.5 text-sm bg-white dark:bg-gray-800 border ${
                          error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                        } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                        aria-invalid={!!error}
                        aria-describedby={error ? 'email-error' : undefined}
                        disabled={isSubmitting}
                        required
                      />
                    </div>

                    {error && (
                      <p
                        id="email-error"
                        className="text-xs text-red-500 dark:text-red-400 flex items-start"
                        role="alert"
                      >
                        <svg className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="button"
                      disabled={isSubmitting || !email}
                      onClick={handleSubscribe}
                      className={`w-full px-5 py-2.5 text-sm font-medium text-white ${
                        isSubmitting
                          ? 'bg-blue-400 dark:bg-blue-700'
                          : !email
                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-size-200 hover:bg-right transition-all duration-500'
                      } rounded-xl flex items-center justify-center space-x-2 relative overflow-hidden group`}
                      whileHover={!isSubmitting && email ? {
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 500, damping: 15 }
                      } : {}}
                      whileTap={!isSubmitting && email ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated background shine effect */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></span>

                      {/* Button content */}
                      <span className="relative z-10 flex items-center space-x-2">
                        {isSubmitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <FaSpinner className="h-4 w-4" />
                            </motion.span>
                            <span>Subscribing...</span>
                          </>
                        ) : (
                          <>
                            <motion.span
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </motion.span>
                            <motion.span
                              className="relative"
                              whileHover={{ x: 2 }}
                              transition={{ type: 'spring', stiffness: 500 }}
                            >
                              Subscribe to Newsletter
                            </motion.span>
                          </>
                        )}
                      </span>

                      {/* Success checkmark (hidden by default) */}
                      <motion.span
                        className="absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isSubscribed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.span>
                    </motion.button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Unsubscribe anytime. I respect your privacy.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Sahil Ali. All rights reserved.
              </p>
              <div className="hidden sm:block w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Made with</span>
                <span className="text-red-500 mx-1">❤️</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">in India</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/terms');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button 
                onClick={copyEmail}
                className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                aria-label={emailCopied ? 'Email copied!' : 'Copy email to clipboard'}
              >
                {emailCopied ? 'Email copied!' : 'Copy Email'}
                {emailCopied && (
                  <svg className="w-3.5 h-3.5 ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced back to top button with better mobile touch targets */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-900 z-50 touch-manipulation"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                type: 'spring',
                stiffness: 500,
                damping: 25
              }
            }}
            exit={{ 
              opacity: 0, 
              y: 20, 
              scale: 0.9,
              transition: { duration: 0.2 }
            }}
            whileHover={!reducedMotion ? { 
              scale: 1.1,
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            } : {}}
            whileTap={!reducedMotion ? { 
              scale: 0.95,
              backgroundColor: 'rgba(59, 130, 246, 0.2)'
            } : {}}
            aria-label="Back to top"
          >
            {isScrolling ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <FaSpinner className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: 'easeInOut'
                }}
              >
                <FaArrowUp className="h-5 w-5" />
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
