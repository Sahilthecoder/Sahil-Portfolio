import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../utils/imageUtils';

// Base URL for images
const baseUrl = 'https://sahilthecoder.github.io/Sahil-Portfolio';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaTools,
  FaCalendarAlt,
  FaBuilding,
  FaUserFriends,
  FaChartBar,
  FaLaptopCode,
  FaFileExcel,
  FaSync,
  FaEye,
  FaUsers,
  FaLanguage,
  FaBoxes,
  FaChartLine,
  FaLink,
  FaBookOpen,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaStar,
  FaTruck,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaPhone,
  FaGlobe,
  FaDatabase,
  FaCode,
  FaServer,
  FaAward,
  FaRocket,
  FaLightbulb,
  FaProjectDiagram
} from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';
import HeroSection from '../components/HeroSection/HeroSection';
import '../components/HeroSection/HeroSection.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 0.5
      }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' 
      }
    }
  };

  // Navigation items with animation variants
  const navItems = [
    { 
      id: 'work', 
      label: 'Work Experience', 
      icon: <FaBriefcase className="text-indigo-500" />,
      color: 'from-indigo-600 to-blue-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      hoverColor: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
      textColor: 'text-indigo-700 dark:text-indigo-300',
      activeTextColor: 'text-white'
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: <FaTools className="text-emerald-500" />,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      hoverColor: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      activeTextColor: 'text-white'
    },
    { 
      id: 'education', 
      label: 'Education', 
      icon: <FaGraduationCap className="text-amber-500" />,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      hoverColor: 'hover:bg-amber-50 dark:hover:bg-amber-900/20',
      textColor: 'text-amber-700 dark:text-amber-300',
      activeTextColor: 'text-white'
    },
  ];

  // Get role icon based on role name
  const getRoleIcon = (role) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('inventory') || roleLower.includes('specialist')) 
      return <FaBoxes className="text-blue-500" />;
    if (roleLower.includes('officer') || roleLower.includes('supervisor')) 
      return <FaShieldAlt className="text-green-500" />;
    if (roleLower.includes('analyst') || roleLower.includes('data'))
      return <FaChartLine className="text-purple-500" />;
    if (roleLower.includes('automation') || roleLower.includes('developer'))
      return <FaLaptopCode className="text-indigo-500" />;
    return <FaBriefcase className="text-yellow-500" />;
  };

  // Work Experience Data
  const workExperience = [
    {
      id: 1,
      role: 'AI & Inventory Optimization Specialist',
      company: 'Ekam Indian Groceries',
      duration: 'Dec 2023 - Present',
      location: 'Adelaide, Australia',
      companyUrl: 'https://www.facebook.com/ekamindiangroceries/',
      description: 'Pioneered AI-driven inventory and financial analytics for a high-volume retail operation, implementing data-driven strategies that transformed operational efficiency and decision-making.',
      highlights: [
        'Architected AI-powered inventory forecasting models that reduced stockouts by 40% and optimized stock levels across two locations',
        'Developed automated financial tracking systems with AI-driven anomaly detection, reducing billing discrepancies by 95%',
        'Engineered custom data pipelines that transformed raw sales data into actionable insights, saving 10+ hours weekly on manual reporting',
        'Spearheaded digital transformation initiatives, replacing manual processes with AI-enhanced tools for inventory and financial management',
        'Mentored team members in data literacy and AI tool adoption, fostering a culture of data-driven decision making'
      ],
      skills: ['AI Implementation', 'Inventory Analytics', 'Data Visualization', 'Process Automation', 'Financial Intelligence']
    },
    {
      id: 2,
      role: 'Data-Driven Inventory Analyst',
      company: 'Bansal Supermarket',
      duration: 'Dec 2022 - Nov 2023',
      location: 'Surat, India',
      companyUrl: 'https://www.bansalsupermarket.com/',
      description: 'Revolutionized inventory management through advanced data analytics and process optimization for a leading supermarket chain, achieving unprecedented accuracy and efficiency.',
      highlights: [
        'Pioneered data-driven inventory tracking system that achieved 99.9% record accuracy and reduced discrepancies by 30%',
        'Developed predictive analytics models for 500+ SKUs, optimizing stock levels and reducing carrying costs by 22%',
        'Automated pricing and promotion updates using custom scripts, ensuring 100% accuracy during high-volume sales events',
        'Created dynamic inventory dashboards that provided real-time visibility into stock movement and turnover rates',
        'Implemented machine learning techniques to forecast demand patterns, improving inventory turnover by 18%'
      ],
      skills: ['Predictive Analytics', 'Inventory Optimization', 'Data Visualization', 'Process Automation', 'Supply Chain Analytics']
    },
    {
      id: 3,
      role: 'Operations & Analytics Lead',
      company: 'Arzt Health & Private Limited',
      duration: 'June 2022 - Nov 2022',
      location: 'Jaipur, India',
      companyUrl: 'https://www.indiamart.com/arzt-and-health-private-limited/',
      description: 'Transformed warehouse operations through data analytics and process optimization for a healthcare training organization, ensuring seamless material flow and training support.',
      highlights: [
        'Orchestrated data-driven warehouse optimization that improved operational efficiency by 35% and reduced fulfillment times',
        'Developed predictive inventory models that maintained 100% stock availability for critical training programs',
        'Implemented AI-powered demand forecasting that reduced excess inventory by 28% while preventing stockouts',
        'Created automated reporting dashboards that provided real-time visibility into warehouse KPIs and performance metrics',
        'Led digital transformation initiatives that modernized inventory tracking and reporting processes'
      ],
      skills: ['Operations Analytics', 'Process Optimization', 'Inventory Forecasting', 'Data-Driven Decision Making', 'Team Leadership']
    },
    {
      id: 4,
      role: 'AI & Data Solutions Architect',
      company: 'AI-Powered Portfolio & Projects',
      duration: '2024 - Present',
      location: 'Self-Employed',
      description: 'Designed and implemented cutting-edge AI and data analytics solutions through a portfolio of projects demonstrating expertise in transforming business operations through technology.',
      highlights: [
        'Architected an AI-enhanced portfolio that showcases practical applications of machine learning in business intelligence and operations',
        'Developed custom AI agents that automate 80% of routine data processing tasks, increasing analysis efficiency by 5x',
        'Created advanced analytics dashboards that provide actionable insights through interactive data visualizations',
        'Pioneered the use of generative AI for business process documentation and technical content creation',
        'Established a knowledge base of reusable AI tools and templates for rapid deployment in business scenarios'
      ],
      skills: ['AI Implementation', 'Data Architecture', 'Machine Learning', 'Business Intelligence', 'Technical Innovation']
    }
  ];

  // Skills Data
  const skillsData = [
    {
      category: 'AI & Machine Learning',
      icon: <FaChartBar className="text-xl" />,
      skills: [
        { name: 'AI Implementation', level: 92 },
        { name: 'Predictive Analytics', level: 95 },
        { name: 'Computer Vision', level: 88 },
        { name: 'Natural Language Processing', level: 85 },
        { name: 'ML Model Deployment', level: 90 },
      ]
    },
    {
      category: 'Inventory & Warehouse',
      icon: <FaBoxes className="text-xl" />,
      skills: [
        { name: 'Inventory Optimization', level: 98 },
        { name: 'Warehouse Management', level: 95 },
        { name: 'Supply Chain Analytics', level: 94 },
        { name: 'Demand Forecasting', level: 96 },
        { name: 'Stock Control', level: 97 },
      ]
    },
    {
      category: 'Data Analysis & BI',
      icon: <FaLaptopCode className="text-xl" />,
      skills: [
        { name: 'Data Visualization', level: 94 },
        { name: 'SQL & NoSQL', level: 93 },
        { name: 'Python for Data Science', level: 95 },
        { name: 'Business Intelligence', level: 92 },
        { name: 'ETL Processes', level: 90 },
      ]
    },
    {
      category: 'Operations & Leadership',
      icon: <FaUserFriends className="text-xl" />,
      skills: [
        { name: 'Team Management', level: 93 },
        { name: 'Process Optimization', level: 96 },
        { name: 'KPI Development', level: 94 },
        { name: 'Cost Reduction', level: 95 },
        { name: 'Quality Control', level: 94 },
      ]
    }
  ];

  // Education Data
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science (B.Sc.)',
      major: 'Computer Science',
      institution: 'MDSU University, Rajasthan',
      year: 'Jan 2018 - Jan 2021',
      description: 'Specialized in software development, data structures, and database management',
      icon: <FaGraduationCap className="text-2xl" />,
      courses: [
        'Data Structures & Algorithms',
        'Database Management',
        'Software Engineering',
        'Web Technologies',
        'Operating Systems'
      ]
    },
    {
      id: 2,
      degree: 'Self-Taught Professional Development',
      major: 'Data Analysis & Automation',
      institution: 'Online Learning & Practical Experience',
      year: '2022 - Present',
      description: 'Focused on mastering Excel, Google Sheets, data analysis techniques, and automation tools',
      icon: <FaLaptopCode className="text-2xl" />,
      courses: [
        'Advanced Excel & Google Sheets',
        'Data Analysis & Visualization',
        'Process Automation',
        'AI Tools for Productivity',
        'Business Intelligence'
      ]
    }
  ];

  // Languages Data
  const languages = [
    {
      name: 'English',
      level: 60,
      description: 'Intermediate (Can communicate fluently, write clearly & understand native speakers)'
    },
    {
      name: 'Hindi',
      level: 100,
      description: 'Native speaker — read, write, speak effortlessly'
    }
  ];

  // Render work experience section
  const renderWorkExperience = () => (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 sm:space-y-8">
      {workExperience.map((exp) => (
        <motion.div 
          key={exp.id}
          variants={item}
          className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100/50 dark:border-gray-700/50"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {exp.role}
                </h3>
                <div className="flex items-center mt-2">
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group/company"
                  >
                    <FaBuilding className="mr-2 group-hover/company:scale-110 transition-transform" />
                    <span className="font-medium border-b border-transparent hover:border-current">
                      {exp.company}
                    </span>
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center">
                    <FaCalendarAlt className="mr-1.5 flex-shrink-0" />
                    {exp.duration}
                  </span>
                  <span className="hidden sm:inline-block text-gray-300 dark:text-gray-600">•</span>
                  <span className="inline-flex items-center">
                    <FaMapMarkerAlt className="mr-1.5 flex-shrink-0" />
                    {exp.location}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-100/70 dark:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                {getRoleIcon(exp.role)}
              </div>
            </div>

            <p className="mt-5 text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
            
            <div className="mt-8 space-y-5">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center text-lg">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3">
                  <FaStar className="text-indigo-500 dark:text-indigo-400 text-xs" />
                </span>
                Key Achievements
              </h4>
              <ul className="space-y-3.5">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex group">
                    <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mr-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 group-hover:scale-125 transition-transform"></span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700/50">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Technologies & Skills</h5>
              <div className="flex flex-wrap gap-2.5">
                {exp.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-lg bg-indigo-50/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-100 dark:border-indigo-900/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  // Render skills section
  const renderSkills = () => (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
      {/* Core Skills */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <FaTools className="mr-2 text-indigo-500" />
          Professional Skills
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100 dark:border-gray-700"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-5">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-5">
                {category.skills.map((skill, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 rounded-full">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + i * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-6 mt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <FaLanguage className="mr-2 text-indigo-500" />
          Languages
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  {lang.name}
                </h4>
                <span className="text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full">
                  {lang.level === 100 ? 'Native' : 'Professional'}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.level}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {lang.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Render education section
  const renderEducation = () => (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
      {/* Education */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <FaGraduationCap className="mr-2 text-indigo-500" />
          Education
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  {edu.degree}
                </h4>
                <span className="text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full">
                  {edu.year}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-3">
                  {edu.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.major}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {edu.description}
              </p>
              <ul className="space-y-2">
                {edu.courses.map((course, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-indigo-500 mr-3 mt-0.5">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{course}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expanded state for work experience items
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get active tab data
  const activeTabData = navItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Text Content */}
            <motion.div 
              className="w-full lg:w-1/2 text-center lg:text-left"
              variants={item}
            >
              <motion.div 
                className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Professional Experience
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300"
                variants={item}
              >
                My Professional Journey
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                variants={item}
              >
                With years of experience in AI, inventory management, and data analysis, I bring a unique blend of technical expertise and business acumen to every project.
              </motion.p>
              
              <motion.div className="flex flex-wrap gap-4" variants={item}>
                <motion.a
                  href="#experience"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore My Experience</span>
                  <FiArrowRight className="ml-2" />
                </motion.a>
                
                <motion.a
                  href="https://drive.google.com/file/d/1065536789670284800/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Resume</span>
                  <FiArrowRight className="ml-2" />
                </motion.a>
              </motion.div>
            </motion.div>
            
            {/* Profile Image - Centered below text on mobile, to the right on larger screens */}
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0"
              variants={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-indigo-100 dark:border-indigo-900/50 p-1 shadow-2xl">
                <ImageWithFallback 
                  src="/images/profile.avif"
                  alt="Sahil Ali"
                  className="w-full h-full object-cover rounded-2xl"
                  fallbackSrc="/images/placeholder-profile.jpg"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-full shadow-xl z-10">
                <FaUserFriends className="w-6 h-6" />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Navigation Tabs - Enhanced */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16 max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-1.5 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {navItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="relative"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActiveTab(item.id)}
                className={`relative z-10 flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? 'text-white'
                    : `${item.textColor} hover:bg-gray-100/60 dark:hover:bg-gray-700/40`
                }`}
              >
                <span className={`p-1.5 rounded-lg transition-colors duration-300 ${
                  activeTab === item.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-100/60 dark:bg-gray-700/40'
                }`}>
                  {React.cloneElement(item.icon, {
                    className: `transition-colors duration-300 ${
                      activeTab === item.id 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-300'
                    } text-base sm:text-lg`
                  })}
                </span>
                <span className="ml-2.5 font-medium">{item.label}</span>
              </button>
              
              {activeTab === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md z-0"
                  layoutId="activeTab"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
          >
            {/* Animated Tab Indicator */}
            <div className={`h-1 bg-gradient-to-r ${activeTabData?.color || 'from-indigo-500 to-blue-500'} w-full`}></div>
            
            <div className="p-6 md:p-8">
              {activeTab === 'work' && renderWorkExperience()}
              {activeTab === 'skills' && renderSkills()}
              {activeTab === 'education' && renderEducation()}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <motion.div 
          className="text-center py-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Thank you for reviewing my professional journey and expertise.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
