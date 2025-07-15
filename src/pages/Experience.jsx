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
      company: 'Ekam Indian Groceries, Adelaide, Australia',
      duration: 'Dec 2023 – June 2025',
      achievements: [
        'Managed daily purchase entries, invoice verification, attendance tracking, and supplier coordination across dual store locations',
        'Automated reporting processes and supported cash flow documentation during manager absence',
        'Handled purchase data and invoices using ERP software and advanced Excel functions',
        'Cross-checked supplier invoices and reconciled statements to prevent overbilling',
        'Maintained staff attendance and created daily cash reports',
        'Collaborated with the team to support inventory accuracy and operational flow'
      ],
      highlights: [
        'Reduced billing errors and improved invoice match accuracy by 95%',
        'Saved over 4 hours per week through structured Excel logs and automation'
      ],
      tags: ['Inventory Management', 'Excel Automation', 'Financial Reporting', 'ERP Systems'],
      icon: <FaClipboardCheck className="text-indigo-500" />,
      projectLink: '/projects/attendance-tracker'
    },
    {
      id: 2,
      role: 'GRN Officer',
      company: 'Bansal Supermarket, Surat, India',
      duration: 'Dec 2022 – Nov 2023',
      achievements: [
        'Managed goods receipt entries, invoice cross-checking, and offer updates',
        'Maintained operational registers including Top 100/200 item reports',
        'Conducted regular floor walks and enforced FIFO practices across departments',
        'Handled PI management, rate updates, and price accuracy for fast-moving items',
        'Ensured FIFO-based inventory flow and waste reduction'
      ],
      highlights: [
        'Reduced stock discrepancies by 30% through enhanced GRN practices',
        'Improved offer accuracy and register organization across 500+ SKUs'
      ],
      tags: ['GRN Management', 'Vendor Coordination', 'Inventory Control', 'FIFO Implementation'],
      icon: <FaBoxOpen className="text-blue-500" />,
      projectLink: '/projects/sales-analysis'
    },
    {
      id: 3,
      role: 'Warehouse Supervisor',
      company: 'Arzt Health & Private Limited, Jaipur, India',
      duration: 'June 2022 – Nov 2022',
      achievements: [
        'Oversaw stock control, warehouse documentation, and physical inventory management',
        'Led day-to-day warehouse operations and staff coordination',
        'Maintained accurate bin cards, stock logs, and conducted warehouse audits',
        'Implemented FIFO principles and organized material flow for training batches',
        'Ensured timely replenishment and stock availability'
      ],
      highlights: [
        'Achieved 100% stock availability across training cycles',
        'Streamlined warehouse layout and improved stock handling speed'
      ],
      tags: ['Warehouse Operations', 'Inventory Control', 'Team Leadership', 'Process Improvement'],
      icon: <FaWarehouse className="text-green-500" />,
      projectLink: '/projects/automation-system'
    },
    {
      id: 4,
      role: 'Data Analyst & Automation Specialist',
      company: 'Self-Driven Projects & Automation',
      duration: '2024 – Present',
      achievements: [
        'Designed and developed a professional portfolio website showcasing data analytics and automation expertise',
        'Leveraged ChatGPT for code generation and SQL query optimization',
        'Utilized Perplexity AI for real-time data insights and research',
        'Created dynamic dashboards and automated reports using Google Sheets and Apps Script',
        'Implemented data visualizations for personal and client projects'
      ],
      highlights: [
        'Developed fully automated portfolio site and project dashboards',
        'Enhanced productivity through AI-driven research and process automation'
      ],
      tags: ['Data Analysis', 'Automation', 'AI Integration', 'Dashboard Development'],
      icon: <FaRobot className="text-purple-500" />
    }
  ];

  const stats = [
    { 
      value: '4+', 
      label: 'Years Experience',
      description: 'Progressive experience in inventory management and operations'
    },
    { 
      value: '95%', 
      label: 'Process Efficiency',
      description: 'Average improvement in operational processes implemented'
    },
    { 
      value: '30%', 
      label: 'Cost Reduction',
      description: 'Average reduction in operational costs through optimization'
    },
    { 
      value: '99.5%', 
      label: 'Inventory Accuracy',
      description: 'Consistent accuracy rate in inventory management'
    },
  ];

  const professionalExpertise = [
    {
      title: 'AI & Process Automation',
      duration: '2022 - Present',
      description: 'Specialized in implementing AI-powered solutions for inventory optimization, workflow automation, and data analysis',
      icon: <FaRobot className="w-5 h-5 text-indigo-500" />,
      keyPoints: [
        'Developed custom Excel macros and Python scripts',
        'Implemented AI tools for demand forecasting',
        'Automated routine reporting processes',
        'Integrated AI solutions into inventory management'
      ]
    },
    {
      title: 'Inventory & Supply Chain Management',
      duration: '2021 - 2022',
      description: 'Expert in end-to-end inventory control, demand planning, and supply chain optimization',
      icon: <FaBoxes className="w-5 h-5 text-blue-500" />,
      keyPoints: [
        'Reduced carrying costs by 25%',
        'Improved stock turnover ratio',
        'Optimized reorder points and safety stock',
        'Enhanced vendor performance tracking'
      ]
    },
    {
      title: 'Warehouse & Operations',
      duration: '2019 - 2021',
      description: 'Proven track record in warehouse optimization and team leadership',
      icon: <FaWarehouse className="w-5 h-5 text-green-500" />,
      keyPoints: [
        'Led teams of 15+ staff members',
        'Reduced order processing time by 30%',
        'Improved workplace safety metrics',
        'Optimized space utilization'
      ]
    }
  ];

  const skills = [
    {
      category: 'Inventory Management',
      items: [
        'Stock Reconciliation',
        'GRN Processing',
        'FIFO Implementation',
        'Inventory Auditing'
      ]
    },
    {
      category: 'Data Analysis & Tools',
      items: [
        'Excel (VLOOKUP, Pivot Tables)',
        'Data Visualization',
        'ERP Software',
        'Reporting & Documentation'
      ]
    },
    {
      category: 'Soft Skills',
      items: [
        'Attention to Detail',
        'Team Collaboration',
        'Process Optimization',
        'Vendor Coordination'
      ]
    }
  ];

  const languages = [
    {
      name: 'English',
      level: 'Intermediate',
      description: 'Can communicate fluently, write clearly & understand native speakers'
    },
    {
      name: 'Hindi',
      level: 'Fluent',
      description: 'Native speaker — read, write, speak effortlessly'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science (B.Sc.)',
      major: 'Computer Science',
      institution: 'MDSU University, Rajasthan',
      year: 'Jan 2018 – Jan 2021',
      highlights: [
        'Focus on software development and data structures',
        'Coursework in database management and algorithms',
        'Project work in system analysis and design'
      ]
    },
    {
      degree: 'Professional Development',
      institution: 'Self-Study & Online Courses',
      year: '2020 – Present',
      highlights: [
        'Advanced Excel & Data Analysis',
        'Inventory Management Systems',
        'Process Automation',
        'Data Visualization Techniques'
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
      <div className="w-full">
        <main className="relative">
          {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 overflow-hidden" id="content-start">
        {/* Animated Background */}
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

          <div className="w-full relative z-10">
            <div className="text-center">
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

      <main className="flex-grow pt-12 md:pt-16">
        {/* Timeline Section */}
        <section className="py-12 bg-white dark:bg-gray-900 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <motion.span 
                className="inline-block mb-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Work History
              </motion.span>
              <motion.h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Timeline</span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                My professional journey and key experiences
              </motion.p>
            </div>
            
            <div className="relative max-w-5xl mx-auto pt-4">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-200 to-pink-200 dark:from-indigo-900/50 dark:to-pink-900/50 transform -translate-x-1/2"></div>

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
                    className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-100 dark:hover:border-indigo-900/50 ${
                      index % 2 === 0 ? 'sm:mr-auto sm:ml-0' : 'sm:ml-auto sm:mr-0'
                    }`}
                    style={{ 
                      maxWidth: '100%',
                      '@screen sm': { maxWidth: 'calc(50% - 2rem)' }
                    }}
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

        
        {/* Professional Expertise */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 relative z-0">
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
    </div>
  );
};

export default Experience;
