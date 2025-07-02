import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaChevronUp
} from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';
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
      icon: <FaBriefcase className="mr-2 text-indigo-500" />,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10'
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: <FaTools className="mr-2 text-emerald-500" />,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10'
    },
    { 
      id: 'education', 
      label: 'Education', 
      icon: <FaGraduationCap className="mr-2 text-amber-500" />,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10'
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
      category: 'AI & Data Expertise',
      icon: <FaChartBar className="text-xl" />,
      skills: [
        { name: 'AI Implementation', level: 90 },
        { name: 'Predictive Analytics', level: 88 },
        { name: 'Data Visualization', level: 92 },
        { name: 'Machine Learning', level: 85 },
      ]
    },
    {
      category: 'Technical Proficiencies',
      icon: <FaLaptopCode className="text-xl" />,
      skills: [
        { name: 'AI/ML Tools', level: 90 },
        { name: 'Data Analysis', level: 95 },
        { name: 'Process Automation', level: 92 },
        { name: 'Business Intelligence', level: 88 },
      ]
    },
    {
      category: 'Inventory & Operations',
      icon: <FaBoxes className="text-xl" />,
      skills: [
        { name: 'Inventory Optimization', level: 95 },
        { name: 'Supply Chain Analytics', level: 90 },
        { name: 'Operations Management', level: 92 },
        { name: 'Process Improvement', level: 90 },
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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {workExperience.map((exp) => (
        <motion.div 
          key={exp.id}
          variants={item}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 border-l-4 border-indigo-500"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-4">
                  {getRoleIcon(exp.role)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline inline-flex items-center"
                  >
                    <FaLink className="mr-1 text-xs" />
                    {exp.company}
                  </a>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                <FaCalendarAlt className="mr-2" />
                <span>{exp.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <FaBuilding className="mr-2" />
              <span>{exp.location}</span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg flex items-center">
                <FaChartLine className="mr-2 text-indigo-500" />
                Key Achievements & Responsibilities:
              </h4>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start bg-gray-50 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-indigo-500 mr-3 mt-0.5">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg flex items-center">
                <FaTools className="mr-2 text-indigo-500" />
                Skills Applied:
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <motion.span 
                    key={i}
                    className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <HeroSection 
        title="My Experience & Skills"
        subtitle="Professional journey and expertise"
        backgroundImage="url('/images/experience-bg.jpg')"
      />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Animated Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
          variants={container}
        >
          {navItems.map((navItem) => {
            const isActive = activeTab === navItem.id;
            return (
              <motion.button
                key={navItem.id}
                onClick={() => setActiveTab(navItem.id)}
                className={`group relative px-6 py-3 rounded-xl font-medium flex items-center transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? `text-white shadow-lg ${navItem.bgColor}`
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700/90 backdrop-blur-sm'
                }`}
                whileHover={!isActive ? { y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
                whileTap={{ scale: 0.98 }}
                variants={item}
              >
                <span className="relative z-10 flex items-center">
                  <span className={`${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                    {React.cloneElement(navItem.icon, { className: navItem.icon.props.className + ' transition-opacity' })}
                  </span>
                  <span className="ml-2">{navItem.label}</span>
                </span>
                {isActive && (
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r rounded-xl z-0"
                    layoutId="activeTab"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </motion.button>
            );
          })}
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
      </motion.div>
    </div>
  );
};

export default Experience;
