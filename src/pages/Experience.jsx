import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
  FaExternalLinkAlt,
  FaArrowRight,
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
  FaCalendarAlt,
  FaDownload,
  FaArrowDown,
  FaBoxes
} from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Experience = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('experience');

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
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

  const scrollToContent = () => {
    const content = document.getElementById('content-start');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const experiences = [
    {
      id: 1,
      role: 'Inventory Specialist & Cash Flow',
      company: 'Ekam Indian Groceries',
      duration: 'Dec 2023 – June 2025',
      achievements: [
        'Reduced billing errors by 95% through meticulous invoice verification',
        'Saved 4+ hours weekly with automated reporting systems',
        'Enhanced inventory accuracy across dual store locations',
      ],
      tags: ['Inventory Management', 'Excel Automation', 'Financial Reporting'],
    },
    {
      id: 2,
      role: 'GRN Officer',
      company: 'Bansal Supermarket',
      duration: 'Jan 2022 – Nov 2023',
      achievements: [
        'Managed goods receipt and quality control processes',
        'Implemented vendor performance tracking system',
        'Reduced stock discrepancies by 30%',
      ],
      tags: ['Vendor Management', 'Quality Control', 'Process Optimization'],
    },
    {
      id: 3,
      role: 'Warehouse Supervisor',
      company: 'Arzt Health & Pvt Ltd',
      duration: 'Mar 2020 – Dec 2021',
      achievements: [
        'Led a team of 15+ warehouse staff',
        'Optimized storage layout, increasing capacity by 25%',
        'Implemented safety protocols reducing workplace incidents by 40%',
      ],
      tags: ['Team Leadership', 'Warehouse Operations', 'Safety Compliance'],
    },
  ];

  const stats = [
    { value: '4+', label: 'Years Experience' },
    { value: '95%', label: 'Billing Accuracy' },
    { value: '30%', label: 'Cost Reduction' },
    { value: '99.5%', label: 'Inventory Accuracy' },
  ];

  const professionalExpertise = [
    {
      title: 'AI & Automation Expert',
      duration: '2022 - Present',
      description: 'Specialized in implementing AI solutions for inventory optimization and process automation',
      icon: <FaRobot className="w-5 h-5" />
    },
    {
      title: 'Inventory Specialist',
      duration: '2021 - 2022',
      description: 'Expert in inventory control, demand forecasting, and supply chain optimization',
      icon: <FaBoxes className="w-5 h-5" />
    },
    {
      title: 'Warehouse Supervisor',
      duration: '2019 - 2021',
      description: 'Led warehouse operations and implemented efficiency improvements',
      icon: <FaWarehouse className="w-5 h-5" />
    }
  ];

  const coreCompetencies = {
    'Inventory & Supply Chain': [
      'Inventory Management',
      'Demand Forecasting',
      'Vendor Management',
      'Warehouse Operations',
    ],
    'Analytics & Tools': ['Excel (Advanced)', 'Data Analysis', 'Process Automation', 'ERP Systems'],
    'Soft Skills': [
      'Problem Solving',
      'Team Leadership',
      'Attention to Detail',
      'Process Improvement',
    ],
  };



  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden px-4 md:px-6" id="content-start">
          {/* Animated Background - Matching About page */}
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
              {/* Animated blobs */}
              <div className="absolute top-1/4 -left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
              <div className="absolute top-1/2 -right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="inline-flex items-center px-3 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FaBriefcase className="mr-1.5" />
                <span>Professional Journey</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Experience</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Expertise</span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                With a proven track record in <span className="font-medium text-indigo-600 dark:text-indigo-400">inventory optimization</span>, <span className="font-medium text-blue-600 dark:text-blue-400">data-driven decision making</span>, and <span className="font-medium text-purple-600 dark:text-purple-400">process automation</span>, I bring a unique blend of technical and operational expertise to every project.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 min-w-[120px]">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a
                  href="/Sahil-Portfolio/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaFilePdf className="w-4 h-4" />
                  Download Full CV
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 text-sm sm:text-base font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Contact for Reference
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Content starts here with an ID for smooth scrolling */}
      <div id="content-start" className="pt-4"></div>

      <main className="flex-grow pt-16 md:pt-20">
        {/* Timeline Section */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Professional Timeline
            </motion.h2>
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 transform -translate-x-1/2"></div>

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`relative mb-8 sm:mb-12 pl-10 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 sm:left-1/2 w-5 h-5 -ml-2.5 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 ring-4 ring-white dark:ring-gray-900"></div>
                  </div>
                  
                  <div 
                    className={`p-5 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${
                      index % 2 === 0 ? 'sm:mr-auto sm:ml-0' : 'sm:ml-auto sm:mr-0'
                    }`}
                    style={{ maxWidth: '100%', '@sm': { maxWidth: 'calc(50% - 2.5rem)' } }}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/30 text-indigo-600 dark:text-indigo-300 mr-4 flex-shrink-0">
                        {exp.icon || <FaBriefcase className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span className="inline-flex items-center">
                            <FaCalendarAlt className="mr-1.5 w-3 h-3" />
                            {exp.duration}
                          </span>
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start group"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-indigo-500 mr-3 group-hover:scale-125 transition-transform"></span>
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                    {exp.tags && exp.tags.length > 0 && (
                      <motion.div 
                        className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-800/50 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              {[
                {
                  icon: <FaTools className="w-8 h-8 mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: 'Process Automation',
                  description: 'Saved 15+ hours weekly',
                },
                {
                  icon: (
                    <FaChartLine className="w-8 h-8 mb-4 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: 'Cost Reduction',
                  description: 'Cut costs by 30% via optimization',
                },
                {
                  icon: <FaUserTie className="w-8 h-8 mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: 'Accuracy Boost',
                  description: 'Achieved 99.5% inventory accuracy',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Expertise */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Expertise</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Specialized knowledge and skills I've developed throughout my professional journey
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {professionalExpertise.map((item, index) => (
                <motion.div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:-translate-y-1"
                  variants={item}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-300 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-4">
                    <FaCalendarAlt className="mr-2" />
                    {item.duration}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>



      </main>
    </div>
  );
};

export default Experience;
