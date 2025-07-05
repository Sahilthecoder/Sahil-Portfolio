import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Typewriter from 'typewriter-effect';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin, FiFileText, FiClock, FiExternalLink } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaUserFriends, FaGithub, FaExternalLinkAlt, FaBoxes, FaLaptopCode, FaChartLine } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiTableau, SiPython, SiHtml5, SiCss3, SiGit, SiNotion, SiZapier, SiOpenai, SiDocker, SiStreamlit, SiD3Dotjs, SiTensorflow, SiNextdotjs } from 'react-icons/si';
import { BsFileEarmarkExcel } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { H1, H2, H3, P, Lead } from '../components/Typography';
import { projects } from '../data/projects';
import getImagePath from '../utils/imagePaths';
import '../components/HeroSection/HeroSection.css';

// Helper function to get project by ID
const getProject = (id) => projects[id];


// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Intersection Observer hook
const useScrollAnimation = (ref, threshold = 0.2) => {
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [controls, isInView]);

  return controls;
};


const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSkill, setActiveSkill] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const controls = useScrollAnimation(heroRef);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hero section content
  const heroContent = {
    title: "Sahil Ali",
    subtitle: 'Inventory & Warehouse Expert | AI Solutions Specialist',
    description: 'Transforming inventory management through AI-driven solutions and data analytics to optimize warehouse operations and reduce costs.',
    highlights: [
      'Inventory Optimization',
      'Warehouse Management',
      'AI-Powered Analytics',
      'Process Automation',
      'Cost Reduction'
    ],
    stats: [
      { value: '4+', label: 'Years in Inventory' },
      { value: '30%', label: 'Cost Savings' },
      { value: '50%', label: 'Faster Operations' }
    ],
    primaryButton: { 
      text: 'My Experience', 
      link: '/experience', 
      showArrow: true 
    },
    secondaryButton: { 
      text: 'Get in Touch', 
      link: '/contact', 
      showArrow: true 
    },
    isHome: true,
    socialLinks: [
      { icon: <FiLinkedin />, url: 'https://linkedin.com/in/sahilthecoder', label: 'LinkedIn' },
      { icon: <FiMail />, url: 'mailto:sahilkhan36985@gmail.com', label: 'Email' },
      { icon: <FiFileText />, url: '/resume', label: 'Resume' }
    ]
  };

  // Project categories and featured projects
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Get all unique categories from projects
  const projectCategories = ['All', ...new Set(
    Object.values(projects).flatMap(project => project.categories || [])
  )];

  // Featured projects to display in the Home page
  const featuredIds = [
    'inventory-optimization',
    'warehouse-automation',
    'supply-chain-analytics',
    'erp-implementation'
  ];
  
  const featuredProjects = featuredIds
    .map((id) => projects[id])
    .filter(Boolean);
    
  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === 'All') {
      return featuredProjects;
    }
    return featuredProjects.filter(project => 
      project.categories?.includes(activeFilter)
    );
  }, [activeFilter, featuredProjects]);

  // Handle scroll effect for navbar and animations
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    
    // Set mounted state for animations
    const timer = setTimeout(() => setIsMounted(true), 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isScrolled]); // Add isScrolled to dependency array

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Core Expertise Areas with Skills
  const skills = [
    // Inventory Management Skills
    { 
      name: 'Inventory Optimization', 
      icon: <FaBoxes className="w-6 h-6" />, 
      category: 'Inventory Management',
      level: 95,
      color: 'from-indigo-500 to-purple-400',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    { 
      name: 'Demand Forecasting', 
      icon: <FaChartLine className="w-6 h-6" />, 
      category: 'Inventory Management',
      level: 90,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      name: 'ERP Systems', 
      icon: <FaBoxes className="w-6 h-6" />, 
      category: 'Inventory Management',
      level: 88,
      color: 'from-green-500 to-emerald-400',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    
    // Warehouse Operations Skills
    { 
      name: 'WMS Implementation', 
      icon: <FaBoxes className="w-6 h-6" />, 
      category: 'Warehouse Operations',
      level: 92,
      color: 'from-orange-500 to-amber-400',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    },
    { 
      name: 'Process Automation', 
      icon: <SiZapier className="w-6 h-6" />, 
      category: 'Warehouse Operations',
      level: 90,
      color: 'from-yellow-500 to-amber-400',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    { 
      name: 'Safety Compliance', 
      icon: <FaUserFriends className="w-6 h-6" />, 
      category: 'Warehouse Operations',
      level: 94,
      color: 'from-red-500 to-pink-400',
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    
    // AI & Analytics Skills
    { 
      name: 'AI Solutions', 
      icon: <SiOpenai className="w-6 h-6" />, 
      category: 'AI & Analytics',
      level: 88,
      color: 'from-purple-500 to-pink-400',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    { 
      name: 'Data Analytics', 
      icon: <SiTableau className="w-6 h-6" />, 
      category: 'AI & Analytics',
      level: 92,
      color: 'from-blue-600 to-indigo-400',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      name: 'Process Mining', 
      icon: <SiStreamlit className="w-6 h-6" />, 
      category: 'AI & Analytics',
      level: 85,
      color: 'from-green-500 to-emerald-400',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
  ];

  // Filter skills based on active category
  const filteredSkills = activeSkill === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeSkill);
    
  // Skill categories for filtering
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  // Tech stack icons mapping
  const techIcons = {
    'Tableau': <SiTableau />,
    'Python': <SiPython />,
    'React': <FaReact />,
    'JavaScript': <SiJavascript />,
    'TypeScript': <SiTypescript />,
    'HTML5': <SiHtml5 />,
    'CSS3': <SiCss3 />,
    'Git': <SiGit />,
    'GitHub': <FaGithub />,
    'Notion': <SiNotion />,
    'Zapier': <SiZapier />,
    'OpenAI': <SiOpenai />,
    'Docker': <SiDocker />,
    'Streamlit': <SiStreamlit />,
    'D3.js': <SiD3Dotjs />,
    'TensorFlow': <SiTensorflow />,
    'Next.js': <SiNextdotjs />,
    'Node.js': <FaNodeJs />,
    'MongoDB': <SiMongodb />,
    'PostgreSQL': <SiPostgresql />,
    'Excel': <BsFileEarmarkExcel />
  };

  // Animation variants for project cards
  const projectsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectItem = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  // Animation variants for section headers
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Add smooth scroll behavior
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg dark:to-dark-bg/90 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0" style={{ 
          zIndex: 1,
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>
        
        {/* Dark mode grid pattern */}
        <div className="absolute inset-0 dark:hidden" style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 1
        }}></div>
        
        <div className="hidden dark:block absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 1
        }}></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              variants={container}
              initial="hidden"
              animate={isMounted ? "show" : "hidden"}
              className="lg:w-1/2 lg:pr-16 relative z-10"
            >
              <motion.div 
                variants={item}
                className="inline-flex items-center mb-8 relative group"
              >
                <span className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium px-4 py-2.5 rounded-full uppercase tracking-wider border border-indigo-100/50 dark:border-indigo-800/30 shadow-sm backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-2.5 animate-pulse"></span>
                  <span className="relative">
                    Welcome to my portfolio
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </span>
                <span className="absolute -inset-1 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur opacity-0 group-hover:opacity-100 -z-10 transition-all duration-300"></span>
              </motion.div>
              
              <motion.div variants={item} className="mb-4">
                <motion.span 
                  className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 block mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {heroContent.title}
                </motion.span>
                <motion.h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  Sahil Khan
                </motion.h1>
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white leading-tight">
                  <span className="relative inline-block mr-2">
                    <span className="relative z-10">I'm a </span>
                    <div className="absolute bottom-1 left-0 w-full h-3 bg-cyan-400/30 dark:bg-cyan-500/30 -rotate-1 -z-0"></div>
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 font-bold">
                    Data Analyst & Full-Stack Developer
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                variants={item}
                className="mb-10 max-w-2xl relative"
              >
                <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full"></div>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed pl-6 relative">
                  <span className="absolute left-0 top-0 text-3xl text-indigo-500 dark:text-indigo-400 font-serif leading-none -mt-1">"</span>
                  {heroContent.description}
                  <span className="absolute right-0 bottom-0 text-3xl text-indigo-500 dark:text-indigo-400 font-serif leading-none -mb-4">"</span>
                </p>
              </motion.div>
              
              <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="space-y-4">
                  <Link 
                    to={heroContent.primaryButton.link}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="transition-all duration-300 group-hover:translate-x-1">
                        {heroContent.primaryButton.text}
                      </span>
                      <FiArrowRight className="ml-3 h-5 w-5 transition-all duration-300 transform -translate-x-1 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                  </Link>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className="relative w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-800 dark:to-blue-900 shadow-md transition-transform duration-300 hover:-translate-y-1"
                          style={{ zIndex: 3 - i }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">5.0 (120+ reviews)</span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={heroContent.secondaryButton.link}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      {heroContent.secondaryButton.text}
                    </span>
                    {heroContent.secondaryButton.showArrow && (
                      <FiArrowRight className="ml-3 h-5 w-5 transition-all duration-300 transform -translate-x-1 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={item}
                className="flex items-center space-x-4 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-800/50 shadow-sm"
              >
                <div className="flex-shrink-0 flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-800 dark:to-blue-900 shadow-md transition-transform duration-300 hover:-translate-y-1"
                      style={{ zIndex: 3 - i }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="ml-2">
                  <div className="font-medium text-gray-900 dark:text-white">Trusted by professionals</div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">5.0 (120+ reviews)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right content - Expertise card */}
            <motion.div 
              variants={item}
              className="lg:w-1/2 mt-16 lg:mt-0 lg:pl-12 relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 lg:p-10 border border-white/20 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full animate-spin-slow"></div>
                  <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full animate-spin-slow animation-delay-3000"></div>
                </div>
                
                <div className="relative z-10">
                  {/* Card header */}
                  <motion.div 
                    className="flex items-center mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                      My Expertise
                    </h3>
                  </motion.div>
                  
                  {/* Card description */}
                  <motion.p 
                    className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed relative pl-6 border-l-2 border-indigo-500/20 dark:border-indigo-400/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Specializing in data analysis, inventory management, and full-stack development to deliver impactful solutions that drive business growth and efficiency.
                  </motion.p>
                  
                  {/* Expertise items */}
                  <div className="space-y-6 mb-10">
                    {[
                      { 
                        icon: <FaChartLine className="text-2xl" />, 
                        title: 'Data Analysis', 
                        description: 'Transforming raw data into actionable insights',
                        color: 'from-indigo-500 to-blue-500',
                        bgColor: 'bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30',
                        delay: 0.4
                      },
                      { 
                        icon: <FaBoxes className="text-2xl" />, 
                        title: 'Inventory Management', 
                        description: 'Optimizing stock levels and reducing waste',
                        color: 'from-purple-500 to-pink-500',
                        bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
                        delay: 0.5
                      },
                      { 
                        icon: <FaLaptopCode className="text-2xl" />, 
                        title: 'Automation', 
                        description: 'Streamlining processes with custom solutions',
                        color: 'from-blue-500 to-cyan-500',
                        bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
                        delay: 0.6
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-4 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay }}
                      >
                        <div className={`p-3 ${item.bgColor} rounded-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                          <div className={`bg-clip-text text-transparent bg-gradient-to-br ${item.color} relative z-10`}>
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{item.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Technologies */}
                  <motion.div 
                    className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                      <span className="w-3 h-0.5 bg-indigo-500 mr-2"></span>
                      Technologies I Work With
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Data Analytics', 'AI/ML', 'Inventory', 'Automation', 'Excel', 'SQL', 'Python', 'React'].map((tag, i) => (
                        <motion.span 
                          key={i} 
                          className="px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-900/40 rounded-full border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-96 h-96 bg-indigo-100/60 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 -right-10 w-96 h-96 bg-purple-100/60 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-100/60 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 right-0 w-full sm:w-2/3 md:w-1/2 h-64 bg-gradient-to-bl from-purple-100/60 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-full filter blur-3xl -mr-40 -mt-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <H2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
              <span className="mr-3">🙋‍♂️</span> About Me
            </H2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <H3 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Professional Profile
            </H3>
            
            <div className="space-y-5">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base sm:text-lg">
                I am <span className="font-semibold text-indigo-700 dark:text-indigo-400">Sahil Ali</span>, 
                a results-driven professional with 4+ years of expertise in inventory management and data analysis. 
                My career has been dedicated to optimizing supply chain operations, enhancing data accuracy, 
                and implementing automation solutions that drive business efficiency.
              </p>
              
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base sm:text-lg">
                Specializing in transforming complex datasets into actionable business intelligence, 
                I leverage cutting-edge tools and methodologies to deliver data-driven insights. 
                My approach combines technical proficiency with operational knowledge to create 
                sustainable improvements in business processes and decision-making.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-8">
              <Link
                to="/about"
                className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-2.5 px-6 sm:py-3 sm:px-7 rounded-lg shadow-md overflow-hidden inline-flex items-center transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1 text-sm sm:text-base">
                    Learn More About Me
                  </span>
                  <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              </Link>
              
              <Link
                to="/experience"
                className="group relative border-2 border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700/50 font-medium py-2.5 px-6 sm:py-3 sm:px-7 rounded-lg shadow-sm overflow-hidden inline-flex items-center transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1 text-sm sm:text-base">
                    See My Experience
                  </span>
                  <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-indigo-50 dark:bg-gray-700/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 left-0 w-full sm:w-2/3 md:w-1/2 h-64 bg-gradient-to-br from-blue-100/60 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-full filter blur-3xl -ml-40 -mt-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <H2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
              <span className="mr-3">👨‍💼</span> Professional Experience
            </H2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My professional journey and key achievements in the field of data analysis and inventory management
            </p>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <H3 className="dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Professional Experience</H3>
            <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
              My professional journey spans across international retail and supply chain management, 
              with key roles at Ekam Indian Groceries (Australia), Bansal Supermarket, and Arzt Health. 
              This diverse experience has equipped me with a comprehensive understanding of 
              end-to-end inventory management and operational excellence.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
              I specialize in implementing data-driven solutions that enhance operational efficiency, 
              from developing AI-powered reporting tools to optimizing inventory control systems. 
              My track record includes significant improvements in process accuracy, 
              cost reduction, and workflow automation across multiple business functions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/experience"
                className="group relative bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">View My Journey</span>
                  <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-indigo-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              </Link>
              <Link
                to="/projects"
                className="group relative border-2 border-indigo-700 text-indigo-700 font-medium py-2 px-6 rounded-lg shadow-sm overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">Check Out the Projects</span>
                  <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-indigo-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Projects Showcase */}
      <section ref={projectsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlNWU1ZTUiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYuMzQgMThjLS43Ny0xLjM5My0yLjY0OS0xLjM5My0zLjQyIDBsLTQuNTggOC4yNDRjLS43NyAxLjM5My4xOTIgMy4xMDkgMS42MSAzLjEwOWg5LjE2YzEuNDE4IDAgMi4zOC0xLjcxNiAxLjYxLTMuMTA5TDM2LjM0IDE4ek0yNCAzMGMtLjc3LTEuMzkzLTIuNjQ5LTEuMzkzLTMuNDIgMGwtNC41OCA4LjI0NGMtLjc3IDEuMzkzLjE5MiAzLjEwOSAxLjYxIDMuMTA5aDkuMTZjMS40MTggMCAyLjM4LTEuNzE2IDEuNjEtMy4xMDlMMjQgMzB6TTQ4IDM2Yy0uNzctMS4zOTMtMi42NDktMS4zOTMtMy40MiAwbC00LjU4IDguMjQ0Yy0uNzcgMS4zOTMuMTkyIDMuMTA5IDEuNjEgMy4xMDloOS4xNmMxLjQxOCAwIDIuMzgtMS43MTYgMS42MS0zLjEwOUw0OCAzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] dark:opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }
              }
            }}
          >
            {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10 px-4 sm:px-6">
            {/* Welcome Badge */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
            >
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-2.5 animate-pulse"></span>
              <span className="relative">
                Welcome to my portfolio
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.div className="mb-4">
              <motion.span 
                className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 block mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
              >
                Hello, I'm
              </motion.span>
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.3,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
              >
                Sahil Khan
              </motion.h1>
            </motion.div>
            
            {/* Animated Text */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.4,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
            >
              <div className="inline-block">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white leading-tight">
                  <span className="relative inline-block mr-2">
                    <span className="relative z-10">I'm a </span>
                    <div className="absolute bottom-1 left-0 w-full h-3 bg-cyan-400/30 dark:bg-cyan-500/30 -rotate-1 -z-0"></div>
                  </span>
                  <Typewriter
                    options={{
                      strings: ['Data Analyst', 'Full-Stack Developer', 'Problem Solver', 'Tech Enthusiast'],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 30,
                      delay: 50,
                      cursor: '|',
                      wrapperClassName: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 font-bold',
                      cursorClassName: 'text-cyan-500 dark:text-cyan-300'
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Description */}
            <motion.div 
              className="mb-10 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.5,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
            >
              <div className="relative">
                <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-6 relative">
                  <span className="absolute left-0 top-0 text-3xl text-indigo-500 dark:text-indigo-400 font-serif leading-none -mt-1">"</span>
                  Transforming complex data into actionable insights and building scalable web applications. With expertise in data analysis, inventory management, and full-stack development, I help businesses make data-driven decisions that drive growth and efficiency.
                  <span className="absolute right-0 bottom-0 text-3xl text-indigo-500 dark:text-indigo-400 font-serif leading-none -mb-4">"</span>
                </p>
              </div>
            </motion.div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 dark:ring-white/5 opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project image - Wrapped in Link */}
                <Link 
                  to={`/projects/${project.id}`}
                  className="relative pt-[56.25%] overflow-hidden block group-hover:opacity-95 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <img
                      src={project.image ? getImagePath('project', project.id, project.image) : '/images/project-placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/fallback-image.jpg';
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
                    <div className="w-full">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.technologies?.slice(0, 5).map((tech, idx) => (
                          <motion.span
                            key={`${tech}-${idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200 shadow-sm cursor-default"
                          >
                            <span className="text-blue-500 mr-1.5">{tech.charAt(0)}</span>
                            <span>{tech}</span>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Project info */}
                <div className="p-5 sm:p-6 bg-white dark:bg-gray-800 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-indigo-600 dark:text-blue-400">
                        {project.role || project.category || 'Project'}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {project.year}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/projects/${project.id}`}
                    className="block group-hover:text-indigo-700 dark:group-hover:text-blue-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {project.shortDescription || project.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 flex flex-wrap gap-2 mt-auto">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiGithub className="mr-1.5" />
                        Code
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink className="mr-1.5" />
                        Live Demo
                      </motion.a>
                    )}
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors ml-auto"
                    >
                      View Details
                      <FiArrowRight className="ml-1.5 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/projects"
              className="group inline-flex items-center px-6 py-3.5 text-base font-medium rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md"
            >
              Explore All Projects
              <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={headerVariants}
          >
            <span className="inline-block px-4 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What People Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here's what colleagues and clients have to say about working with me.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold mr-4">JD</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">John Doe</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CEO, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"Sahil's expertise in data analysis transformed our inventory management system, resulting in a 30% reduction in stockouts."</p>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-bold mr-4">AS</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Alex Smith</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Operations Manager, RetailPlus</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"Working with Sahil was a game-changer for our data analytics. His attention to detail and problem-solving skills are exceptional."</p>
            </motion.div>

            {/* Testimonial Form */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Share Your Experience</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Role</label>
                  <input 
                    type="text" 
                    id="role" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your position/company"
                  />
                </div>
                <div>
                  <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Testimonial</label>
                  <textarea 
                    id="testimonial" 
                    rows="3" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Share your experience working with me..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <span>Submit Testimonial</span>
                  <FiArrowRight className="ml-2" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="relative py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-tr from-indigo-100/60 to-transparent dark:from-indigo-900/20 dark:to-transparent rounded-full filter blur-3xl -mr-40 -mt-40"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <H2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">My Resume</span>
            </H2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Download my detailed resume to explore my professional background
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative h-full overflow-hidden group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-blue-600/5 dark:from-indigo-400/5 dark:to-blue-400/5 rounded-xl transition-all duration-500 group-hover:scale-105"></div>
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl shadow-inner w-16 h-16 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                    <FiFileText className="text-indigo-600 dark:text-indigo-400 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sahil Ali</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">AI Expert | Data Analyst | Inventory Specialist</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Download my comprehensive resume to explore my professional journey, technical expertise, and career achievements in detail.
                </p>
                
                <div className="space-y-4">
                  <a
                    href="/assets/Sahil_Ali_Resume.pdf"
                    download="Sahil_Ali_Resume.pdf"
                    className="group relative inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-2">Download CV</span>
                      <FiDownload className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </a>
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="mr-1.5" />
                    <span>Last updated: July 2024</span>
                    <span className="mx-2">•</span>
                    <span>PDF • 2.4 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
