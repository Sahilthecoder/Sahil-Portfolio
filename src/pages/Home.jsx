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
  FaTwitter
} from 'react-icons/fa';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiBriefcase } from 'react-icons/fi';
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
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-3 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <span className="relative z-10">View Resume</span>
                  <FaExternalLinkAlt className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <span className="relative z-10">Preview Resume</span>
                  <FaFileAlt className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
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
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What I Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaBox className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Data Analysis",
                  description: "Transforming raw data into actionable insights to drive business decisions."
                },
                {
                  icon: <FaLayerGroup className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Business Intelligence",
                  description: "Creating dashboards and reports to visualize key metrics and trends."
                },
                {
                  icon: <FaChartLine className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Process Optimization",
                  description: "Identifying inefficiencies and implementing data-driven improvements."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 flex items-center">
                        <FiBriefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
                        Inventory Specialist
                      </span>
                      <span className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 flex items-center">
                        <FiBriefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
                        Warehouse Supervisor
                      </span>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="/about"
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300 mt-3 sm:mt-0 w-full sm:w-auto justify-center"
                    >
                      View Full Profile
                      <FaArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              
              {/* Image Section - Left side */}
              <motion.div variants={item} className="relative order-1">
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
          <motion.div
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Professional Experience</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My journey through various roles in inventory and warehouse management
            </p>
          </motion.div>

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
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="/experience"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300"
                  >
                    View Full Work History
                    <FaArrowRight className="ml-1 sm:ml-2" />
                  </motion.a>
                </div>
              </motion.div>
              
              {/* Image Section - Moved to left side */}
              <motion.div variants={item} className="relative order-1 md:order-1">
                <div className="bg-white dark:bg-gray-700 p-2 rounded-2xl shadow-xl overflow-hidden">
                <img
  src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  alt="Warehouse and Inventory Management"
  className="rounded-xl w-full h-auto transition-transform duration-500 hover:scale-105"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
  }}
/>
                </div>
                <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl opacity-20 blur-xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-12 sm:py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-gray-900/90 dark:to-gray-900" style={{
            backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }} />
          <div className="absolute top-1/4 -left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
          <div className="absolute top-1/2 -right-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Smart Solutions | Real Impact | My Work
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transforming complex business challenges into efficient, data-driven solutions
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
          >
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects by technology or skill..."
                  value={selectedCategory === 'All' ? '' : selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value || 'All');
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-4 py-3 pl-12 pr-10 text-sm sm:text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Suggestions Dropdown */}
              <div className={`absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-200 transform origin-top ${
                showSuggestions ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
              }`}>
                <div className="max-h-60 overflow-y-auto">
                  {['All', ...new Set(processedProjects.flatMap(project => project.tags))]
                    .filter(tag => 
                      tag.toLowerCase().includes(selectedCategory.toLowerCase()) || 
                      selectedCategory === 'All' ||
                      selectedCategory === ''
                    )
                    .slice(0, 8) // Limit to 8 suggestions
                    .map((tag, index) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedCategory(tag === 'All' ? 'All' : tag);
                          setShowSuggestions(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm sm:text-base hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors ${
                          selectedCategory === tag ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['All', 'React', 'Node.js', 'Python', 'AI/ML'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedCategory(tag === 'All' ? 'All' : tag)}
                  className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                    selectedCategory === tag || (selectedCategory === 'All' && tag === 'All')
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {processedProjects
              .filter(project => 
                selectedCategory === 'All' || 
                project.tags.includes(selectedCategory)
              )
              .map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative overflow-hidden h-40 sm:h-48 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://unsplash.com/photos/magic-keyboard-beside-mug-and-click-pen-VieM9BdZKFo';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs sm:text-sm font-medium bg-black/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                    {project.impact}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link.startsWith('http') ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                    >
                      View Project
                      <FaExternalLinkAlt className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3 sm:w-3" />
                    </a>
                  ) : (
                    <Link
                      to={project.link}
                      className="inline-flex items-center text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                    >
                      View Project
                      <FaArrowRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              View All Projects
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="relative py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-pattern"></div>
        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/4 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <motion.div variants={item} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to
                    be part of your vision.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                        <FiMail size={20} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Email Me</h4>
                        <a
                          href="mailto:sahilkhan36985@gmail.com"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          sahilkhan36985@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                        <FiLinkedin size={20} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">LinkedIn</h4>
                        <a
                          href="https://www.linkedin.com/in/sahil-ali-714867242/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          linkedin.com/in/sahil-ali-714867242
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                        <FiGithub size={20} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">GitHub</h4>
                        <a
                          href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          github.com/Sahilthecoder/Sahil-Portfolio
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-3">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FiGithub size={20} />, url: 'https://github.com/Sahilthecoder/Sahil-Portfolio' },
                      { icon: <FiLinkedin size={20} />, url: 'https://www.linkedin.com/in/sahil-ali-714867242/' },
                      { icon: <FiTwitter size={20} />, url: 'https://twitter.com/SahilTheCoder' },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
                {submitStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
                      placeholder="sahilkhan36985@gmail.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="How can I help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
                      placeholder="Hi there, I'd like to talk about..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
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
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ready to Start Project Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>
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
