import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  FiArrowRight, 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiDownload, 
  FiMapPin,
  FiFileText,
  FiClock 
} from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { H1, H2, H3, H4, P, Lead, Small } from '../components/Typography';
import { getProject } from '../utils/projectData';

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

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Skills data
  const skills = [
    { name: 'React', icon: <FaReact className="w-6 h-6" />, category: 'Frontend' },
    { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6" />, category: 'Backend' },
    { name: 'Python', icon: <FaPython className="w-6 h-6" />, category: 'Backend' },
    { name: 'JavaScript', icon: <SiJavascript className="w-6 h-6" />, category: 'Frontend' },
    { name: 'TypeScript', icon: <SiTypescript className="w-6 h-6" />, category: 'Frontend' },
    { name: 'MongoDB', icon: <SiMongodb className="w-6 h-6" />, category: 'Database' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-6 h-6" />, category: 'Database' },
  ];

  // Filter skills based on active category
  const filteredSkills = activeSkill === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeSkill);

  const featuredProjects = [
    {
      ...getProject('zomato'),
      image: '/images/projects/Project1 excel/Project1 Cover.avif',
      path: '/projects/zomato'
    },
    {
      ...getProject('bansal'),
      image: '/images/projects/Project2 tableau/Project2 Cover.avif',
      path: '/projects/bansal-supermarket'
    },
    {
      ...getProject('retail'),
      image: '/images/projects/Project4 Power BI/Project4 Cover.avif',
      path: '/projects/retail-cash-flow'
    }
  ].filter(Boolean); // Filter out any undefined projects

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            variants={container}
            initial="hidden"
            animate={controls}
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div variants={item} className="md:w-1/2 mb-10 md:mb-0 text-white">
              <motion.div className="mb-6">
                <motion.div 
                  className="mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <H1 className="inline-block text-gray-900 dark:text-white">
                    Hello, I'm{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                      Sahil Ali
                    </span>
                  </H1>
                </motion.div>
              </motion.div>
              <Lead className="text-xl text-gray-800 dark:text-gray-200 mb-6">
                Data-Driven Inventory Specialist & Business Intelligence Analyst
              </Lead>
              <P className="text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
                Transforming complex data into strategic insights and operational excellence through advanced analytics and process optimization.
              </P>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/about"
                  className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg text-center shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Let's Explore More!</span>
                    <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                </Link>
                <Link
                  to="/projects"
                  className="group relative bg-white hover:bg-gray-50 text-indigo-700 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">View Projects</span>
                    <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                  <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                </Link>
                <a
                  href="#contact"
                  className="group relative bg-transparent hover:bg-gray-100 text-indigo-700 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700/50"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Contact Me</span>
                    <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                  <span className="absolute inset-0 bg-indigo-50/80 dark:bg-indigo-900/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                </a>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2 mt-10 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-800 p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src="/images/profile.avif"
                      alt="Sahil Ali"
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x400?text=Sahil+Ali';
                      }}
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-bl from-purple-100/60 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-full filter blur-3xl -mr-40 -mt-40"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <H2 className="flex items-center">
              <span className="mr-3">🙋‍♂️</span> About Me
            </H2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <H3 className="dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Professional Profile</H3>
            <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
              I am <span className="font-semibold text-indigo-700 dark:text-indigo-400">Sahil Ali</span>, 
              a results-driven professional with 4+ years of expertise in inventory management and data analysis. 
              My career has been dedicated to optimizing supply chain operations, enhancing data accuracy, 
              and implementing automation solutions that drive business efficiency.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
              Specializing in transforming complex datasets into actionable business intelligence, 
              I leverage cutting-edge tools and methodologies to deliver data-driven insights. 
              My approach combines technical proficiency with operational knowledge to create 
              sustainable improvements in business processes and decision-making.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="group relative bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-md overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">Learn More About Me</span>
                  <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-indigo-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              </Link>
              <Link
                to="/experience"
                className="group relative border-2 border-indigo-700 text-indigo-700 font-medium py-2 px-6 rounded-lg shadow-sm overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">See My Experience</span>
                  <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-indigo-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 left-0 w-1/3 h-64 bg-gradient-to-br from-blue-100/60 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-full filter blur-3xl -ml-40 -mt-40"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <H2 className="flex items-center">
              <span className="mr-3">👨‍💼</span> Experience
            </H2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
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
      <section 
        ref={projectsRef} 
        id="projects" 
        className="relative py-20 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-bl from-indigo-100/60 to-transparent dark:from-indigo-900/30 dark:to-transparent rounded-full filter blur-3xl -mr-40 -mt-40"></div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <H2 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">
                  Portfolio Showcase
                </H2>
              </motion.div>
              <motion.p 
                className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Explore my collection of data-driven solutions and business intelligence projects
              </motion.p>
            </div>
            <Link
              to="/projects"
              className="group relative bg-white hover:bg-gray-50 text-indigo-700 font-medium py-2 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="transition-transform duration-300 group-hover:translate-x-1">View All Projects</span>
                <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
              </span>
              <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={item}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 flex flex-col h-full transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image || '/images/placeholder.svg'}
                        alt={project.title}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    <span className="text-white text-sm font-medium bg-black/70 px-3 py-1.5 rounded-md backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <h3 
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700"
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">{project.description}</p>
                  {project.impact && (
                    <div className="mt-auto p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <span className="font-semibold">Impact:</span> {project.impact}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech?.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={project.path}
                  className="block w-full text-center py-3 bg-gray-50 dark:bg-gray-700/50 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-100 dark:border-gray-700"
                >
                  View Project
                  <svg
                    className="w-4 h-4 ml-2 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-64 bg-gradient-to-tr from-green-100/60 to-transparent dark:from-emerald-900/20 dark:to-transparent rounded-full filter blur-3xl -mr-40 -mb-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <H2 className="flex items-center justify-center">
              <span className="mr-3 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Get In Touch</span>
              <span className="text-2xl ml-2">📬</span>
            </H2>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mt-4">
              Let's collaborate on transforming data into strategic business solutions
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <H3>Professional Contact</H3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Connect with me through these professional channels:
                </p>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                      <FiMapPin className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Location</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Rajasthan, India <span className="text-indigo-600 dark:text-indigo-400 font-medium">(Open to Relocation)</span>
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href="mailto:sahilkhan36985@gmail.com"
                    className="flex items-start hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                      <FiMail className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Email Address</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 break-all">
                        sahilkhan36985@gmail.com
                      </p>
                    </div>
                  </a>
                  
                  <a
                    href="https://github.com/SahilTheCoder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                      <FiGithub className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">GitHub</h4>
                      <p className="text-indigo-600 dark:text-indigo-400">
                        @SahilTheCoder
                      </p>
                    </div>
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/sahil-ali-714867242/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                      <FiLinkedin className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">LinkedIn</h4>
                      <p className="text-indigo-600 dark:text-indigo-400">
                        in/sahil-ali-714867242
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-indigo-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <FiFileText className="text-indigo-600 dark:text-indigo-400 text-2xl" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Professional Resume
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  Access my comprehensive CV to review my professional journey, technical expertise, and career achievements in detail.
                </p>
                <div className="space-y-4">
                  <a
                    href="/assets/Sahil_Ali_Cv.pdf"
                    download="Sahil_Ali_Resume.pdf"
                    className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                  >
                    <FiDownload className="mr-2" />
                    Download CV (PDF)
                  </a>
                  <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="mr-1.5" />
                    <span>Last updated: June 2024</span>
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
