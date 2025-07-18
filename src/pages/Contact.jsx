import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPaperPlane,
  FaFileUpload,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCheck,
  FaHandshake,
  FaBoxes,
  FaChartLine,
  FaSync,
  FaTools,
  FaArrowRight,
  FaInstagram
} from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { FiTrendingUp } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      const isValidType = validTypes.some(type => file.type === type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        alert(`File type not supported: ${file.name}`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`File too large (max 10MB): ${file.name}`);
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle scroll for header effects only
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'inventory',
      title: 'Inventory Management',
      description: 'Stock optimization, FIFO, vendor coordination, auditing',
      icon: <FaBoxes className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis & Reporting',
      description: 'Dashboards, reports, trend analysis, KPI metrics',
      icon: <FaChartLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'automation',
      title: 'Process Automation',
      description: 'Workflow automation, email triggers, data entry bots',
      icon: <FaSync className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'erp',
      title: 'ERP Implementation',
      description: 'System selection, migration, user training, support',
      icon: <FaTools className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'excel',
      title: 'Excel/Sheets Solutions',
      description: 'Advanced formulas, macros, pivot tables, visual reports',
      icon: <SiMinutemailer className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'optimization',
      title: 'Business Process Optimization',
      description: 'Bottleneck detection, SOP creation, efficiency improvement',
      icon: <FaCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || 'Not provided');
      formDataToSend.append('service', formData.service || 'Not specified');
      formDataToSend.append('message', formData.message);

      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await fetch('https://formspree.io/f/xpwrjjqj', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          file: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (e) => {
    if (e) e.preventDefault();
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      // Add focus to the form for better accessibility
      const firstInput = formSection.querySelector('input, textarea, button');
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 500);
      }
    }
  };

  return (
    <div id="main-content" className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden" tabIndex="-1">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden px-4 md:px-6 min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <motion.div 
              className="absolute inset-0 opacity-30 dark:opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #6366f1 1px, transparent 1px),
                  linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e, #f59e0b)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Floating elements with staggered animation */}
            <motion.div 
              className="absolute top-1/4 -left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div 
              className="absolute top-1/2 -right-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                y: [0, 30, 0],
                x: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                delay: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Unsplash Images Grid Background */}
            <div className="absolute inset-0 overflow-hidden opacity-15 dark:opacity-[0.03] pointer-events-none">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 md:gap-3 h-full w-full p-2 sm:p-4">
                {[
                  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Office meeting
                  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Handshake
                  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Team discussion
                  'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Business meeting
                  'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Video call
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Team collaboration
                ].map((src, index) => (
                  <motion.div
                    key={index}
                    className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                y: [0, -20, 0],
                x: [0, 15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25,
                delay: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center px-3 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FaPaperPlane className="mr-1.5" />
              <span>Get In Touch</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Work</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Together</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I'm excited to discuss how my expertise in <span className="font-medium text-indigo-600 dark:text-indigo-400">inventory management</span>, <span className="font-medium text-blue-600 dark:text-blue-400">data analysis</span>, and <span className="font-medium text-purple-600 dark:text-purple-400">AI automation</span> can help solve your business challenges. Let's connect and explore opportunities for collaboration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href="mailto:sahilkhan36985@gmail.com"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaEnvelope className="w-4 h-4" />
                Email for Opportunities
              </a>
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FaPaperPlane className="w-4 h-4" />
                Send a Message
              </button>
            </motion.div>

            <motion.div 
              className="mt-10 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a 
                href="https://www.linkedin.com/in/sahil-ali-714867242/" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/Sahilthecoder" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="View GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://wa.me/919875771550" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <motion.div 
              className="absolute inset-0 opacity-30 dark:opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #6366f1 1px, transparent 1px),
                  linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Form */}
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100/50 dark:border-gray-700/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center px-4 py-1.5 mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                  <FaPaperPlane className="mr-1.5" />
                  <span>Contact Form</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Send Me a <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Message</span>
                </h2>

                {submitSuccess ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                      }}
                    >
                      <FaCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                    </motion.p>
                    <motion.button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-full transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl hover:scale-105 transform"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaPaperPlane className="mr-2" />
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
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
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                        }}
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 pl-12 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 focus:border-indigo-500'} bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 backdrop-blur-sm`}
                            placeholder="John Doe"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        {errors.name && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </motion.div>
                      
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { 
                            opacity: 1, 
                            y: 0, 
                            transition: { 
                              duration: 0.4,
                              delay: 0.1
                            } 
                          },
                        }}
                      >
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 pl-12 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 focus:border-indigo-500'} bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 backdrop-blur-sm`}
                            placeholder="sahil@example.com"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        {errors.email && (
                          <p className="mt-1.5 text-sm text-red-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { 
                            duration: 0.4,
                            delay: 0.2
                          } 
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 focus:border-indigo-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 backdrop-blur-sm"
                          placeholder="+1 (555) 123-4567"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { 
                            duration: 0.4,
                            delay: 0.3
                          } 
                        },
                      }}
                    >
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        How can I help you? (Optional)
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="appearance-none w-full px-4 pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 focus:border-indigo-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.title}>
                              {service.title}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                          </svg>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { 
                            duration: 0.4,
                            delay: 0.4
                          } 
                        },
                      }}
                    >
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full px-4 pl-12 py-3 rounded-xl border-2 ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 focus:border-indigo-500'} bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 backdrop-blur-sm`}
                          placeholder="Tell me about your project..."
                        />
                        <div className="absolute top-3 left-3">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                      </div>
                      {errors.message && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { 
                            duration: 0.4,
                            delay: 0.5
                          } 
                        },
                      }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attachments (Optional)
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                      />
                      <div 
                        className={`mt-1 relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${isDragging ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <div className="space-y-3">
                          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                            <svg
                              className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none"
                              >
                                <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                                  Click to upload
                                </span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                  multiple
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              PDF, DOC, JPG, PNG up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {selectedFiles.length > 0 && (
                        <motion.div 
                          className="mt-3 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: 'auto',
                            transition: { duration: 0.3 }
                          }}
                        >
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Selected files:
                          </p>
                          <ul className="space-y-1.5">
                            {selectedFiles.map((file, index) => (
                              <motion.li
                                key={index}
                                className="flex items-center justify-between text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: 1, 
                                  x: 0,
                                  transition: { 
                                    delay: 0.1 * index,
                                    duration: 0.2 
                                  } 
                                }}
                              >
                                <div className="flex items-center min-w-0">
                                  <svg className="flex-shrink-0 h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span className="truncate flex-1">{file.name}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(index);
                                  }}
                                  className="ml-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                  aria-label="Remove file"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div 
                      className="pt-2"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { 
                            duration: 0.4,
                            delay: 0.6
                          } 
                        },
                      }}
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center px-8 py-4 rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-size-200 hover:bg-right-bottom focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-500 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-0.5'}`}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"
                            />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white bg-200% animate-shimmer">
                              Send Message
                            </span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>


                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Feel free to reach out to me through any of these channels. I'm always open to
                    discussing new projects, creative ideas, or opportunities to be part of your
                    visions.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-2 sm:p-3">
                      <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </h3>
                      <a
                        href="mailto:sahilkhan36985@gmail.com"
                        className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 break-words"
                      >
                        sahilkhan36985@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-2 sm:p-3">
                      <FaPhoneAlt className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        Phone
                      </h3>
                      <a
                        href="https://wa.me/919875771550"
                        className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-2 sm:p-3">
                      <FaMapMarkerAlt className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        Location
                      </h3>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-white">City, Country</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Connect with me
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <a
                      href="https://www.linkedin.com/in/sahil-ali-714867242/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                    <a
                      href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <FaGithub className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                    <a
                      href="https://wa.me/919875771550"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                  </div>
                </div>

                {/* Services Section */}
                <div className="pt-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    My Services
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-start p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex-shrink-0">{service.icon}</div>
                        <div className="ml-4">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
