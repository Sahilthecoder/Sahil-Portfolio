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
    { text: 'Accuracy Over Assumptions', icon: <FaShieldAlt className="text-indigo-500" /> },
    { text: 'Systematic & Organized', icon: <FaCogs className="text-blue-500" /> },
    { text: 'Obsessed with Optimization', icon: <FaChartLine className="text-purple-500" /> },
    { text: 'Always Learning New Tools', icon: <FaTools className="text-green-500" /> },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden px-4 md:px-6" id="about-hero">
          {/* Graph Paper Background */}
          <div 
            className="absolute inset-0 bg-white dark:bg-gray-900"
            style={{
              backgroundImage: `
                linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
              backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
              zIndex: 0,
            }}
          >
            {/* Animated grid lines */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 98%, rgba(79, 70, 229, 0.15) 100%),
                  linear-gradient(transparent 98%, rgba(79, 70, 229, 0.15) 100%)
                `,
                backgroundSize: '40px 40px',
                animation: 'pan 30s linear infinite',
                zIndex: 1,
              }}
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-50 dark:opacity-10" />
          </div>

          {/* Add the animation keyframes to the document */}
          <style>
            {`
              @keyframes pan {
                0% {
                  background-position: 0% 0%;
                }
                100% {
                  background-position: 100% 100%;
                }
              }
            `}
          </style>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <FiTrendingUp className="mr-2" />
                  Data Analyst & Business Intelligence
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Me</span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Transforming complex data into actionable insights and driving business growth through analytics and visualization.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <a
                    href="/assets/Sahil_Ali_Cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <FaFilePdf className="w-4 h-4" />
                    Download CV
                  </a>
                  <NavLink
                    to="/contact"
                    className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2"
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
       
        {/* Career Summary */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                My Journey
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                I began my career optimizing inventory systems in fast-paced retail environments. Over
                the past 4+ years, I've supervised warehouse operations, streamlined vendor
                coordination, and processed thousands of purchase invoices with precision. Today, I
                combine that practical experience with the power of AI tools like ChatGPT, Python, and
                Notion AI to build automated workflows that save time and reduce errors.
              </motion.p>
            </div>
          </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What I Bring to the Table
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center mb-4">
                  {item.icon}
                  <h3 className="text-xl font-bold mt-4">{item.title}</h3>
                </div>
                <ul className="space-y-2">
                  {item.items.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tools & Technologies I Love</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex flex-col items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <span className="text-sm font-medium text-center">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">My Work Ethic</h2>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
              "Every problem has a pattern. I find it, fix it, and automate it."
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-2xl">{value.icon}</div>
                  <span className="text-lg">{value.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Work With Me?
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              I understand how real-world operations work — and I build digital tools that make
              those systems smarter. Whether it's reconciling stock across multiple vendors or
              setting up an AI assistant to plan your daily tasks, I can bridge manual effort with
              modern automation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Let's Work Together Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let's Work Together
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Open to freelance projects, remote jobs, or automation consulting
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/contact"
                className="group relative px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Contact Me</span>
                <FaEnvelope className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </NavLink>
              <a
                href="/assets/Sahil_Ali_Cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>View Resume</span>
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default About;
