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
  FaGithub,
  FaLinkedin,
  FaWhatsapp
} from 'react-icons/fa';
import { FiMail, FiGithub, FiLinkedin, FiMessageSquare, FiBriefcase, FiBarChart2, FiPackage, FiCode, FiTrendingUp, FiSettings } from 'react-icons/fi';
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
  
  // State for project category filter
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
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
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      // Clean up event listeners
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Enhanced Hero Section */}
      <section ref={homeRef} className="relative pt-20 pb-16 md:pt-32 md:pb-28 overflow-hidden px-4 sm:px-6 min-h-screen flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            {/* Animated grid pattern */}
            <div 
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
            />
            
            {/* Floating elements */}
            <div className="absolute top-1/4 -left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
            <div className="absolute top-1/2 -right-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Animation keyframes */}
        <style jsx global>{`
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
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}</style>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
                Welcome to my portfolio! 👋
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                  Hi, I'm Sahil Ali
                </span>
                <br />
                <TypeAnimation
                  sequence={[
                    'Data Analyst',
                    1000,
                    'Business Intelligence',
                    1000,
                    'Data Visualization',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-700 dark:text-gray-300"
                />
              </h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                A Data-Driven Inventory Specialist, Warehouse Operations Pro, and AI Automation Enthusiast.
              </motion.p>

              <motion.p
                className="text-base sm:text-lg italic text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                "I simplify chaos, optimize systems, and use AI to make work smarter."
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="/Sahil-Portfolio/assets/Sahil_Ali_Cv.pdf"
                  target=""
                  rel="noopener noreferrer"
                  className="group relative px-8 py-3.5 bg-transparent border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50/20 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                      Explore My Resume
                    </span>
                    <FaExternalLinkAlt className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
                <a
                  href="#contact"
                  className="group relative px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Let's Collaborate</span>
                    <span className="inline-flex items-center justify-center">
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        <FiMail className="w-4 h-4" />
                      </span>
                    </span>
                  </span>
                </a>
              </motion.div>


            </motion.div>

            {/* Profile Image */}
            <motion.div 
              className="w-full lg:w-1/2 mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-2xl transform rotate-6 scale-95 opacity-20 dark:opacity-30"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500 to-pink-600 shadow-2xl transform -rotate-6 scale-95 opacity-20 dark:opacity-30"></div>
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <img 
                    src="/Sahil-Portfolio/images/profile/profile.webp" 
                    alt="Sahil Ali" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Sahil-Portfolio/images/fallback-image.jpg';
                    }}
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-indigo-500 rounded-full opacity-20 dark:opacity-10 animate-pulse"></div>
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full opacity-20 dark:opacity-10 animate-pulse animation-delay-2000"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section ref={aboutRef} className="py-12 sm:py-16 bg-white dark:bg-gray-800 px-4 md:px-6">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">About Me</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get to know more about my professional journey and expertise
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Content Section - Right side */}
              <motion.div variants={item} className="space-y-6 order-2 md:order-2">
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Professional Profile
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    As a{' '}
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      Certified Inventory Specialist
                    </span>{' '}
                    with extensive experience in warehouse operations, I specialize in optimizing
                    inventory management systems and streamlining supply chain processes. My
                    expertise lies in implementing efficient stock control measures and reducing
                    operational costs through data-driven strategies.
                  </p>

                  <div className="bg-indigo-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-500 mt-4 sm:mt-6">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
                      "Transforming inventory challenges into efficient, cost-effective solutions
                      through systematic controls and process optimization."
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">
                      Core Competencies:
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        "Inventory Management & Optimization",
                        "Warehouse Operations & Process Improvement",
                        "Data Analysis & Reporting",
                        "Supply Chain Management",
                        "Team Leadership & Training"
                      ].map((competency, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                              <svg className="h-2 w-2 sm:h-3 sm:w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            {competency}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300 w-full sm:w-auto justify-center"
                  >
                    View Full Profile
                    <FaArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </motion.div>
              
              {/* Image Section - Left side */}
              <motion.div variants={item} className="relative order-1 hidden md:block">
                <div className="bg-white dark:bg-gray-700 p-2 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Professional Headshot"
                    className="rounded-xl w-full h-auto transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                    }}
                  />
                </div>
                <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl opacity-20 blur-xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Professional Experience</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My journey through various roles in inventory and warehouse management
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row-reverse gap-8 sm:gap-12 items-center"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Content Section - Right side */}
              <motion.div variants={item} className="space-y-6 order-2">
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Inventory & Warehouse Management Specialist
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    With over 5 years of hands-on experience, I've specialized in inventory control,
                    warehouse operations, and data-driven decision making across diverse environments including retail, supermarket chains, and warehouse
                    operations. My journey includes impactful roles at{' '}
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      Ekam Indian Groceries (Australia)
                    </span>
                    ,{' '}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Bansal Supermarket
                    </span>
                    , and{' '}
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      Arzt Health
                    </span>
                    .
                  </p>

                  <div className="bg-indigo-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-500 mt-4 sm:mt-6">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
                      "From GRNs and invoice accuracy to inventory audits and AI-powered reporting
                      tools, my focus has always been on driving efficiency, reducing errors, and
                      delivering measurable business value."
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">
                      Key Achievements:
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            <svg className="h-2 w-2 sm:h-3 sm:w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Developed and implemented inventory management systems that reduced stock
                          discrepancies by 37%
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-gray-700 dark:text-gray-300">
                          Automated reporting processes using AI tools, saving 15+ hours per week in
                          manual work
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <Link to="/experience">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300 cursor-pointer"
                    >
                      View Full Work History
                      <FaArrowRight className="ml-1 sm:ml-2" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
              

            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight 1 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data-Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">Actionable insights from complex data</p>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiSettings className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Efficient</h3>
              <p className="text-gray-600 dark:text-gray-300">Streamlined processes, better results</p>
            </motion.div>

            {/* Highlight 3 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiTrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Results</h3>
              <p className="text-gray-600 dark:text-gray-300">Proven track record of success</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300">A selection of my recent work and case studies</p>
          </motion.div>

          {/* Project Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {['All', 'Data Analysis', 'Automation', 'Dashboard', 'Inventory', 'Web App'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(tag === 'All' ? 'All' : tag)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedCategory === tag
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter(project => 
                selectedCategory === 'All' || 
                project.tags.includes(selectedCategory)
              )
              .map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Sahil-Portfolio/images/fallback-project.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-600/90 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    {project.isExternal || project.link.startsWith('http') || project.link.startsWith('//') ? (
                      <a
                        href={project.link}
                        target="_self"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                      >
                        View Project
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        to={project.link}
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                      >
                        View Project
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="GitHub repository"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Ready to Start a Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision. Let's create something amazing together!
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Get In Touch
              </Link>
              <Link
                to="/projects"
                className="px-6 sm:px-8 py-3.5 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
                onClick={(e) => {
                  // Only prevent default if already on the home page
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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
