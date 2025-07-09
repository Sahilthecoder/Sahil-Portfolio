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
  FaArrowUp,
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
      setShowScrollToTop(window.scrollY > 1000);
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

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden px-4 md:px-6" id="content-start">
        {/* Graph Paper Background */}
        <div 
          className="absolute inset-0 bg-white dark:bg-gray-900"
          style={{
            backgroundImage: `
              linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
            backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
            zIndex: 0,
          }}
        >
          {/* Animated grid lines */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 98%, rgba(79, 70, 229, 0.15) 100%),
                linear-gradient(transparent 98%, rgba(79, 70, 229, 0.15) 100%)
              `,
              backgroundSize: '40px 40px',
              animation: 'pan 30s linear infinite',
              zIndex: 1,
            }}
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-50 dark:opacity-10" />
        </div>

        {/* Add the animation keyframes to the document */}
        <style>
          {`
            @keyframes pan {
              0% {
                background-position: 0% 0%;
              }
              100% {
                background-position: 100% 100%;
              }
            }
          `}
        </style>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <SiMinutemailer className="mr-2" />
                Get In Touch
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Talk</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <a
                  href="mailto:sahilkhan36985@gmail.com"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Email Me
                </a>
                <a
                  href="https://wa.me/919875771550"
                  className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaPhoneAlt className="w-4 h-4" />
                  Call Me
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Form */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Send Me a Message
                </h2>

                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center mx-auto"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                          placeholder="Your name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                          placeholder="sahilkhan36985@gmail.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Service (Optional)
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="How can I help you?"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <span>Attachment (Optional)</span>
                        <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 pb-5 sm:pt-5 sm:pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                          <div className="space-y-1 text-center">
                            <FaFileUpload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                            <div className="flex flex-col sm:flex-row items-center text-sm text-gray-600 dark:text-gray-400">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  ref={fileInputRef}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      file: e.target.files[0],
                                    }));
                                  }}
                                />
                              </label>
                              <span className="hidden sm:inline px-1">or</span>
                              <p className="text-center sm:text-left">drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, DOC, XLS up to 10MB
                            </p>
                          </div>
                        </div>
                        {formData.file && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">
                            Selected: {formData.file.name}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2 -ml-1 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
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

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
