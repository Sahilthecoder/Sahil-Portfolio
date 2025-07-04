import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin, FiFileText, FiClock, FiExternalLink } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaUserFriends, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiTableau, SiPython, SiHtml5, SiCss3, SiGit, SiNotion, SiZapier, SiOpenai, SiDocker, SiStreamlit, SiD3Dotjs, SiTensorflow, SiNextdotjs } from 'react-icons/si';
import { BsFileEarmarkExcel } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { H1, H2, H3, P, Lead } from '../components/Typography';
import { projects } from '../data/projects';
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

  // Hero section content
  const heroContent = {
    title: "Hi, I'm Sahil Ali",
    subtitle: 'AI Expert | Data Analyst | Inventory Specialist',
    description: 'I leverage cutting-edge AI tools and data analytics to optimize inventory systems and drive business intelligence.',
    highlights: [
      'Inventory Optimization',
      'Data Analytics',
      'AI Solutions',
      'Process Automation'
    ],
    stats: [
      { value: '4+', label: 'Years Experience' },
      { value: '50+', label: 'Projects Completed' },
      { value: '30%', label: 'Efficiency Boost' }
    ],
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
    profileImage: '/images/profile.avif',
    socialLinks: [
      { icon: <FiGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
      { icon: <FiLinkedin />, url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
      { icon: <FiMail />, url: 'mailto:your.email@example.com', label: 'Email' }
    ]
  };

  // Project categories and featured projects
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Get all unique categories from projects
  const projectCategories = ['All', ...new Set(
    Object.values(projects).flatMap(project => project.categories || [])
  )];

  // Featured projects to display in the Home page
  const featuredIds = [
    'zomato-analysis',
    'retail-sales-dashboard',
    'retail-cash-flow',
    'notion-assistant'
  ];
  
  const featuredProjects = featuredIds
    .map((id) => projects[id])
    .filter(Boolean);
    
  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(featuredProjects);
    } else {
      setFilteredProjects(
        featuredProjects.filter(project => 
          project.categories?.includes(activeFilter)
        )
      );
    }
  }, [activeFilter, featuredProjects]);


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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern" style={{ zIndex: 1 }} />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000" />
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

              {/* Highlights */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, staggerChildren: 0.1 }}
              >
                {heroContent.highlights.map((highlight, index) => (
                  <motion.span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {heroContent.stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link
                  to={heroContent.primaryButton.link}
                  className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {heroContent.primaryButton.text}
                  {heroContent.primaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
                <Link
                  to={heroContent.secondaryButton.link}
                  className="px-8 py-3.5 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
                >
                  {heroContent.secondaryButton.text}
                  {heroContent.secondaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex items-center justify-center lg:justify-start gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                {heroContent.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/50"
                    aria-label={link.label}
                  >
                    {React.cloneElement(link.icon, { className: 'w-5 h-5' })}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div 
              className="relative w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
            >
              <div className="relative w-full max-w-md">
                {/* Main Image Container */}
                <div className="relative z-10 w-full h-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 bg-white dark:bg-gray-800">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={heroContent.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl z-10"
                      onLoad={() => setIsLoading(false)}
                      onError={(e) => {
                        e.target.src = '/images/fallback-profile.jpg';
                        setIsLoading(false);
                      }}
                    />
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, 15, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: 0.5
                    }}
                  />
                  <motion.div 
                    className="absolute -top-4 -right-4 w-20 h-20 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: 1
                    }}
                  />
                
                  {/* Floating Tech Icons */}
                  {['React', 'Node', 'Python', 'MongoDB'].map((tech, i) => {
                    const positions = [
                      { top: '10%', left: '10%' },
                      { top: '15%', right: '10%' },
                      { bottom: '15%', left: '5%' },
                      { bottom: '10%', right: '15%' }
                    ];
                    
                    const techIcons = {
                      'React': <FaReact className="w-6 h-6 text-blue-500" />,
                      'Node': <FaNodeJs className="w-6 h-6 text-green-500" />,
                      'Python': <FaPython className="w-6 h-6 text-blue-600" />,
                      'MongoDB': <SiMongodb className="w-6 h-6 text-green-600" />
                    };
                    
                    return (
                      <motion.div
                        key={tech}
                        className="absolute flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700/50 z-20"
                        style={positions[i]}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.8 + (i * 0.2),
                          type: 'spring',
                          stiffness: 300,
                          damping: 20
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {techIcons[tech]}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll down</span>
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center p-1">
              <motion.div
                className="w-1 h-2 bg-indigo-500 rounded-full"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              />
            </div>
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

      {/* Futuristic Projects Showcase */}
      <section ref={projectsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Futuristic animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent dark:from-indigo-900/10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiN4MDA3YmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTM2LjM0IDE4Yy0uNzctMS4zOTMtMi42NDktMS4zOTMtMy40MiAwbC00LjU4IDguMjQ0Yy0uNzcgMS4zOTMuMTkyIDMuMTA5IDEuNjEgMy4xMDloOS4xNmMxLjQxOCAwIDIuMzgtMS43MTYgMS42MS0zLjEwOUwzNi4zNCAxOHpNMjQgMzBjLS43Ny0xLjM5My0yLjY0OS0xLjM5My0zLjQyIDBsLTQuNTggOC4yNDRjLS43NyAxLjM5My4xOTIgMy4xMDkgMS42MSAzLjEwOWg5LjE2YzEuNDE4IDAgMi4zOC0xLjcxNiAxLjYxLTMuMTA5TDI0IDMwek00OCAzNmMtLjc3LTEuMzkzLTIuNjQ5LTEuMzkzLTMuNDIgMGwtNC41OCA4LjI0NGMtLjc3IDEuMzkzLjE5MiAzLjEwOSAxLjYxIDMuMTA5aDkuMTZjMS40MTggMCAyLjM4LTEuNzE2IDEuNjEtMy4xMDlMNDggMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] dark:opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            <motion.span 
              className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              PORTFOLIO SHOWCASE
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 mb-4"
              variants={item}
            >
              My Digital Creations
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={item}
            >
              Exploring the intersection of design, technology, and innovation
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:gap-12">
            {projects.filter(p => p.featured).map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={project.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${isEven ? 'from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900' : 'from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'} shadow-2xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800/50`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className={`flex flex-col lg:flex-row ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      {/* Project Image with 3D Tilt Effect */}
                      <Tilt 
                        tiltMaxAngleX={5} 
                        tiltMaxAngleY={5} 
                        scale={1.02}
                        transitionSpeed={800}
                        className="lg:w-1/2 relative overflow-hidden"
                      >
                        <div className="relative aspect-video w-full h-full">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech, i) => (
                                <motion.span 
                                  key={i}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Tilt>

                      {/* Project Details */}
                      <div className="lg:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
                        <div className="mb-4 flex items-center space-x-4">
                          <motion.span 
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {project.year}
                          </motion.span>
                          <motion.span 
                            className="text-sm text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {project.type}
                          </motion.span>
                        </div>
                        
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {project.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-gray-600 dark:text-gray-300 mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          {project.description}
                        </motion.p>
                        
                        <motion.div 
                          className="flex flex-wrap gap-3 mt-auto pt-4"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiGithub className="mr-2" />
                              View Code
                            </motion.a>
                          )}
                          {project.demo && (
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white/80 hover:bg-gray-50 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 backdrop-blur-sm"
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FiExternalLink className="mr-2" />
                              Live Demo
                            </motion.a>
                          )}
                          <motion.div
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              to={`/projects/${project.id}`}
                              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                            >
                              View Case Study
                              <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
