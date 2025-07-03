import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin, FiFileText, FiClock } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaUserFriends } from 'react-icons/fa';
import { getImagePath, handleImageError } from '../utils/imagePath';
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';
import { ImageWithFallback } from '../utils/imageUtils.jsx';
import { Link } from 'react-router-dom';
import { H1, H2, H3, P, Lead } from '../components/Typography';
import { getProject } from '../utils/projectData';
import HeroSection from '../components/HeroSection/HeroSection';
import '../components/HeroSection/HeroSection.css';


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
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const controls = useScrollAnimation(heroRef);
  const [isMounted, setIsMounted] = useState(false);

  // Hero section content
  const heroContent = {
    title: "Hi, I'm Sahil Ali",
    subtitle: 'AI Expert | Data Analyst | Inventory Specialist',
    description: 'I leverage cutting-edge AI tools and data analytics to optimize inventory systems and drive business intelligence.',
    primaryButton: { 
      text: 'View My Work', 
      link: '/projects', 
      showArrow: true 
    },
    secondaryButton: { 
      text: 'Contact Me', 
      link: '/contact', 
      showArrow: true 
    },
    isHome: true,
    showProfileImage: true,
    profileImage: {
      src: getImagePath('images/profile.avif'),
      alt: 'Sahil Ali',
      fallbackSrc: getImagePath('images/placeholder-profile.jpg')
    }
  };

  // Featured projects to display in the Home page
  const featuredIds = [
    'zomato-analysis',
    'bansal-supermarket',
    'retail-cash-flow',
    'ai-planner',
    'automation-suite'
  ];
  const featuredProjects = featuredIds
    .map((id) => getProject(id))
    .filter(Boolean);


  // Handle scroll effect for navbar and animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Set mounted state for animations
    const timer = setTimeout(() => setIsMounted(true), 100);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Skills data with proficiency levels (0-100)
  const skills = [
    { 
      name: 'React', 
      icon: <FaReact className="w-6 h-6" />, 
      category: 'Frontend',
      level: 90,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      name: 'Node.js', 
      icon: <FaNodeJs className="w-6 h-6" />, 
      category: 'Backend',
      level: 85,
      color: 'from-green-500 to-emerald-400',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    { 
      name: 'Python', 
      icon: <FaPython className="w-6 h-6" />, 
      category: 'Backend',
      level: 88,
      color: 'from-blue-600 to-indigo-400',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      name: 'JavaScript', 
      icon: <SiJavascript className="w-6 h-6" />, 
      category: 'Frontend',
      level: 92,
      color: 'from-yellow-400 to-yellow-600',
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    { 
      name: 'TypeScript', 
      icon: <SiTypescript className="w-6 h-6" />, 
      category: 'Frontend',
      level: 85,
      color: 'from-blue-600 to-blue-400',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    { 
      name: 'MongoDB', 
      icon: <SiMongodb className="w-6 h-6" />, 
      category: 'Database',
      level: 80,
      color: 'from-green-600 to-emerald-400',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    { 
      name: 'PostgreSQL', 
      icon: <SiPostgresql className="w-6 h-6" />, 
      category: 'Database',
      level: 78,
      color: 'from-blue-700 to-blue-400',
      iconColor: 'text-blue-700',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
  ];

  // Filter skills based on active category
  const filteredSkills = activeSkill === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeSkill);
    
  // Skill categories for filtering
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  // Animation variants for project cards
  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern" style={{ zIndex: 1 }}></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div 
                className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Welcome to my portfolio
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {heroContent.title}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 font-semibold">
                  {heroContent.subtitle}
                </span>
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {heroContent.description}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link
                  to={heroContent.primaryButton.link}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {heroContent.primaryButton.text}
                  {heroContent.primaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
                <Link
                  to={heroContent.secondaryButton.link}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {heroContent.secondaryButton.text}
                  {heroContent.secondaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div 
              className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 dark:border-gray-800/50 shadow-2xl">
                    <ImageWithFallback 
                      src={getImagePath('images/profile.avif')}
                      alt="Sahil Ali"
                      className="w-full h-full object-cover object-top"
                      fallbackSrc={getImagePath('images/placeholder-profile.jpg')}
                      loading="lazy"
                    />
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -top-4 -right-4 w-20 h-20 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 1
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
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

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-transparent dark:from-indigo-900/20 dark:to-transparent rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={headerVariants}
          >
            <span className="inline-block px-4 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              My Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="group relative"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300 group-hover:duration-200"></div>
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImagePath(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => handleImageError(e, '/images/fallback-image.jpg')}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-3">{project.techLabel || project.category}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech?.slice(0, 4).map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/40 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <FiGithub className="w-4 h-4 mr-1" />\n            GitHub
                        </a>
                      )}
                      <a 
                        href={project.path || project.demo || project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-indigo-500/20"
                      >
                        {project.demo ? 'Live Demo' : project.path ? 'Details' : 'Source Code'}
                        <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
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
            <a 
              href="/projects" 
              className="group inline-flex items-center px-6 py-3.5 text-base font-medium rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md"
            >
              View All Projects
              <FiArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
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
              <form className="space-y-4">
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
