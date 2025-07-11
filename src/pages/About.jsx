import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
  FaExternalLinkAlt,
  FaBriefcase,
  FaLaptopCode,
  FaChartLine,
  FaTools,
  FaCheck,
  FaUserTie,
  FaWarehouse,
  FaChartBar,
  FaClipboardCheck,
  FaTruck,
  FaBoxOpen,
  FaSearchDollar,
  FaMicrosoft,
  FaBrain,
  FaRobot,
  FaCogs,
  FaShieldAlt,
  FaDatabase,
  FaFileAlt,
  FaGraduationCap,
  FaCheckCircle,
} from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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

  const expertise = [
    {
      title: 'Inventory Mastery',
      icon: <FaClipboardCheck className="text-3xl text-indigo-600" />,
      items: [
        'Stock Reconciliation',
        'Vendor Relations',
        'Demand Forecasting',
        'Inventory Auditing',
      ],
    },
    {
      title: 'Warehouse Management',
      icon: <FaWarehouse className="text-3xl text-blue-600" />,
      items: ['SOPs Implementation', 'Team Supervision', 'Logistics', 'Space Optimization'],
    },
    {
      title: 'AI Automation',
      icon: <FaRobot className="text-3xl text-purple-600" />,
      items: ['GPT-4 Workflows', 'Notion AI', 'Python Scripting', 'Process Automation'],
    },
  ];

  const tools = [
    { name: 'Excel', icon: <FaMicrosoft className="text-2xl" /> },
    { name: 'Power BI', icon: <FaMicrosoft className="text-2xl" /> },
    { name: 'Python', icon: <FaLaptopCode className="text-2xl" /> },
    { name: 'SQL', icon: <FaDatabase className="text-2xl" /> },
    { name: 'ChatGPT', icon: <FaBrain className="text-2xl" /> },
    { name: 'Notion AI', icon: <FaFileAlt className="text-2xl" /> },
  ];

  const values = [
    { 
      text: 'Accuracy Over Assumptions', 
      description: 'I prioritize data-driven decisions and thorough verification over assumptions, ensuring reliable and precise results in all my work.',
      icon: <FaShieldAlt className="text-indigo-500" /> 
    },
    { 
      text: 'Systematic & Organized', 
      description: 'My approach is methodical and structured, creating efficient systems that enhance productivity and reduce errors in complex projects.',
      icon: <FaCogs className="text-blue-500" /> 
    },
    { 
      text: 'Obsessed with Optimization', 
      description: "Continuously seeking ways to improve processes and workflows, I'm dedicated to finding the most effective solutions.",
      icon: <FaChartLine className="text-purple-500" /> 
    },
    { 
      text: 'Always Learning New Tools', 
      description: 'Committed to staying current with the latest technologies and methodologies to deliver innovative solutions.',
      icon: <FaTools className="text-green-500" /> 
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-12 px-4 sm:px-6 overflow-hidden" id="about-hero">
          {/* Animated Background - Simplified for mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
              <div 
                className="absolute inset-0 opacity-20 dark:opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #6366f1 1px, transparent 1px),
                    linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />
              {/* Smaller blobs for mobile */}
              <div className="absolute top-1/4 -left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
              <div className="absolute top-1/2 -right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center pt-8 sm:pt-12 md:pt-16 lg:pt-20">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center px-3 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <FiTrendingUp className="mr-1.5" />
                  <span>Data Analyst & Business Intelligence</span>
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Me</span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Transforming complex data into actionable insights and driving business growth through analytics and visualization.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <a
                    href="/assets/Sahil_Ali_Cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <FaFilePdf className="w-4 h-4" />
                    Download CV
                  </a>
                  <NavLink
                    to="/contact"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 text-sm sm:text-base font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaEnvelope className="w-4 h-4" />
                    Contact Me
                  </NavLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 max-w-7xl">
          {/* About Me Section */}
          <section className="mb-16 sm:mb-20 md:mb-24 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-3 sm:mb-4">
                Professional Profile
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Inventory & Data Analytics Expert
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
              
              <div className="bg-white dark:bg-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md border border-gray-100 dark:border-gray-700">
                <div className="space-y-6">
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        I'm a detail-oriented professional with over 4 years of experience in inventory management and data analysis. My journey in optimizing supply chains and transforming data into actionable insights has equipped me with a unique skill set that bridges technical expertise with business acumen.
                      </p>
                      
                      <div className="mt-6 p-6 bg-indigo-50/50 dark:bg-gray-700/30 rounded-xl border-l-4 border-indigo-500">
                        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                          "I believe in the power of data-driven decisions and efficient systems to drive business growth and operational excellence in today's competitive landscape."
                        </p>
                      </div>
                      
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">4+ Years Experience</span>
                        </div>
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">ERP Specialist</span>
                        </div>
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Data Analysis</span>
                        </div>
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">Process Automation</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Expertise Section */}
          <section className="mb-16 sm:mb-20 md:mb-24 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
            <motion.div 
              className="text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-3 sm:mb-4">
                What I Do
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                My Expertise
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 text-2xl mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.items.map((skill, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaCheck className="text-green-500 mr-2 text-sm flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tools & Technologies */}
          <section className="mb-16 sm:mb-20 md:mb-24 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
            <motion.div 
              className="text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-3 sm:mb-4">
                My Toolbox
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Tools & Technologies
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center text-3xl text-gray-700 dark:text-gray-200 mb-3">
                    {tool.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16 sm:mb-20 md:mb-24 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
            <motion.div 
              className="text-center mb-8 sm:mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-3 sm:mb-4">
                My Principles
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Core Values
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 text-2xl mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">{value.text}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
