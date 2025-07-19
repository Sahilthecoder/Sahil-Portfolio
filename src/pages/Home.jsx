import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { 
  FaExternalLinkAlt, 
  FaFileAlt, 
  FaArrowRight, 
  FaBox, 
  FaLayerGroup, 
  FaChartLine,
  FaLinkedin,
  FaClipboardCheck,
  FaWarehouse,
  FaRobot,
  FaCheck,
  FaWhatsapp,
  FaGithub
} from 'react-icons/fa';
import { FiMail, FiLinkedin, FiMessageSquare, FiBriefcase, FiBarChart2, FiPackage, FiCode, FiTrendingUp, FiSettings, FiUsers } from 'react-icons/fi';
import ProjectSwiper from '../components/ProjectSwiper';
import HomeProjectCard from '../components/HomeProjectCard';
import { projects } from '../data/projects';

// Using a fallback image from the public directory
const HeroImage = '/images/fallback-image.jpg';

const Home = () => {
  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const experienceRef = useRef(null);
  
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // State for active section
  const [activeSection, setActiveSection] = useState('home');
  
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
        duration: 0.5,
      },
    },
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
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

  // Handle form submission with loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll for navigation links
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation (kept for potential future use)
  const handleNavigation = (e) => {
    e.preventDefault();
    // This function can be used for any custom navigation logic if needed
  };

  return (
    <div id="main-content" className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200" tabIndex="-1">
      {/* Enhanced Hero Section */}
      <section ref={homeRef} className="relative pt-20 pb-16 md:pt-32 md:pb-28 overflow-hidden px-4 sm:px-6 min-h-screen flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            {/* Animated grid pattern with subtle movement */}
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

        {/* Animation keyframes */}
        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 8s ease infinite;
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }`}
        </style>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center px-3 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FiTrendingUp className="mr-1.5" />
                <span>Inventory & Data Analytics Specialist</span>
              </motion.div>

              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="mb-2">
                  <TypeAnimation
                    sequence={[
                      'Transforming',
                      1000,
                      'Analyzing',
                      1000,
                      'Optimizing',
                      1000
                    ]}
                    wrapper="span"
                    speed={50}
                    className="inline-block min-w-[180px]"
                    repeat={Infinity}
                  />
                  {' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                    Data
                  </span>
                </div>
                <div>
                  into Actionable{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    Business Insights
                  </span>
                </div>
              </motion.div>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                I help businesses optimize inventory, analyze data, and implement AI solutions to drive efficiency and growth. With expertise in inventory management, data analytics, and process automation, I transform complex challenges into strategic advantages.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.a
                  href="/Sahil-Portfolio/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View my resume"
                  className="group relative px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-medium rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaFileAlt className="w-4 h-4" />
                    </motion.span>
                    <span>View My Resume</span>
                    <motion.span 
                      className="inline-block transform -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </motion.span>
                  </span>
                  
                  {/* Button shine effect */}
                  <span className="absolute inset-0 overflow-hidden">
                    <span className="absolute top-0 left-0 w-8 h-full bg-white/20 -skew-x-12 -translate-x-16 group-hover:translate-x-64 transition-transform duration-700 ease-in-out" />
                  </span>
                </motion.a>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    aria-label="Contact me"
                    className="group relative px-4 sm:px-6 py-3 sm:py-3.5 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-xl hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 overflow-hidden text-sm sm:text-base"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Contact Me</span>
                      <motion.span 
                        className="inline-block transition-transform duration-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                      >
                        <FiMail className="w-4 h-4" />
                      </motion.span>
                    </span>
                    
                    {/* Button hover effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Profile Image - Hidden on mobile, visible on lg screens and up */}
            <motion.div 
              className="block w-full sm:w-3/4 md:w-1/2 lg:w-1/2 mx-auto mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div 
                className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* 3D Card Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-2xl transform rotate-6 scale-95 opacity-20 dark:opacity-30"
                  whileHover={{
                    rotate: 8,
                    scale: 0.98,
                    transition: { duration: 0.3 }
                  }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500 to-pink-600 shadow-2xl transform -rotate-6 scale-95 opacity-20 dark:opacity-30"
                  whileHover={{
                    rotate: -8,
                    scale: 0.98,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Main Image Container */}
                <motion.div 
                  className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src="/Sahil-Portfolio/images/profile/profile.webp" 
                    alt="Sahil Ali" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Sahil-Portfolio/images/fallback-image.jpg';
                    }}
                    loading="eager"
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                
                {/* Animated decorative elements */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-indigo-500 rounded-full opacity-20 dark:opacity-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div 
                  className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full opacity-20 dark:opacity-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    delay: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section 
        ref={aboutRef} 
        className="bg-white dark:bg-gray-900 relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden transition-colors duration-300"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTkgMCAxOCAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMjcgMTFjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0zLTEzYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00eiIvPjwvZz48L2c+PC9zdmc+')]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase rounded-full bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
                Get To Know Me
              </span>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">Me</span>
              </motion.h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-8 rounded-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Inventory Mastery',
                icon: <FaClipboardCheck className="w-6 h-6" />,
                description: 'Expert in stock reconciliation, vendor relations, and demand forecasting with a track record of reducing discrepancies by 37%',
                progress: 95,
                color: 'from-indigo-500 to-blue-500'
              },
              {
                title: 'Warehouse Management',
                icon: <FaWarehouse className="w-6 h-6" />,
                description: 'Specialized in SOPs implementation, team supervision, and logistics optimization',
                progress: 90,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'AI Automation',
                icon: <FaRobot className="w-6 h-6" />,
                description: 'Skilled in GPT-4 workflows, Notion AI, and process automation for maximum efficiency',
                progress: 85,
                color: 'from-emerald-500 to-teal-500'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 relative z-10">{item.description}</p>
                
                {/* Animated progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2 relative z-10">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 relative z-10">
                  <span>Proficiency</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-900/50 p-8 md:p-10 rounded-2xl shadow-xl border border-indigo-100/50 dark:border-gray-700/50 mb-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 dark:bg-indigo-900/30 rounded-full opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-900/30 rounded-full opacity-20" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
                <span className="mx-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">MY JOURNEY</span>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
              
              <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                As a <span className="font-semibold text-indigo-600 dark:text-indigo-400">Certified Inventory Specialist</span> with <span className="font-semibold">4+ years</span> of experience, I've helped organizations optimize their supply chains, reduce costs, and improve operational efficiency through innovative, data-driven strategies and process improvements.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Data-Driven Decisions', 'Process Optimization', 'Team Leadership', 'AI Integration'].map((tag, i) => (
                  <motion.span 
                    key={i}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white/80 dark:bg-gray-800/80 text-indigo-700 dark:text-indigo-200 backdrop-blur-sm border border-indigo-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <FaCheck className="w-3 h-3 mr-1.5 text-green-500" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link 
              to="/about" 
              className="group relative inline-flex items-center px-8 py-3.5 overflow-hidden text-white font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative flex items-center">
                <span className="mr-2">Explore My Journey</span>
                <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience Preview Section */}
      <section 
        ref={experienceRef} 
        className="bg-gray-50 dark:bg-gray-900 relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Professional Journey</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              With experience across retail, supermarket chains, and healthcare supply chains, I've helped 
              organizations optimize their inventory management and warehouse operations for maximum efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Inventory Management",
                icon: <FiPackage className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                description: "Reduced inventory discrepancies by 37% through strategic system implementations"
              },
              {
                title: "Process Optimization",
                icon: <FiTrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                description: "Improved operational efficiency by 30% through process improvements"
              },
              {
                title: "Team Leadership",
                icon: <FiUsers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                description: "Led and mentored teams of up to 15+ staff members"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/experience" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              View Full Experience
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      
      {/* Projects Section */}
      <section 
        id="projects" 
        className="bg-white dark:bg-gray-900 relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          </motion.div>

          {/* Mobile Swiper - Hidden on md screens and up */}
          <div className="md:hidden mb-12">
            <ProjectSwiper projects={projects} />
          </div>

          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HomeProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </div>
          </div>

          {projects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4">
                <FiPackage className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any projects matching your selected category.
                Try selecting a different category or check back later for updates.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      
      {/* Ready to Start Project Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-blue-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to Start a Project?
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision. Let's create something amazing together!
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
                aria-label="Get in touch"
              >
                {isLoading ? 'Sending...' : 'Get In Touch'}
                {isLoading && (
                  <svg className="animate-spin -mr-1 ml-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </Link>
              <Link
                to="/projects"
                className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                aria-label="View my work"
              >
                View My Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Process projects to ensure they have all required fields
const processedProjects = projects.map(project => ({
  ...project,
  // Use description as impact for the card
  impact: project.description,
  // Extract category from tags or use first tag as category
  category: project.tags[0] || 'Project',
  // Ensure image has a fallback
  image: project.image || 'https://unsplash.com/photos/magic-keyboard-beside-mug-and-click-pen-VieM9BdZKFo',
  // Ensure link is properly formatted
  link: project.link || `#${project.id}`
}));

export default Home;
