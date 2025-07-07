import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaFilePdf, FaExternalLinkAlt, FaArrowRight,
  FaBriefcase, FaLaptopCode, FaChartLine, FaTools, FaCheck, FaUserTie, FaWarehouse,
  FaChartBar, FaClipboardCheck, FaTruck, FaBoxOpen, FaSearchDollar, FaMicrosoft,
  FaBrain, FaRobot, FaCogs, FaShieldAlt, FaDatabase, FaFileAlt
} from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar/ModernNavbar';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const expertise = [
    {
      title: 'Inventory Mastery',
      icon: <FaClipboardCheck className="text-3xl text-indigo-600" />,
      items: ['Stock Reconciliation', 'Vendor Relations', 'Demand Forecasting', 'Inventory Auditing']
    },
    {
      title: 'Warehouse Management',
      icon: <FaWarehouse className="text-3xl text-blue-600" />,
      items: ['SOPs Implementation', 'Team Supervision', 'Logistics', 'Space Optimization']
    },
    {
      title: 'AI Automation',
      icon: <FaRobot className="text-3xl text-purple-600" />,
      items: ['GPT-4 Workflows', 'Notion AI', 'Python Scripting', 'Process Automation']
    }
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
    { text: 'Always Learning New Tools', icon: <FaTools className="text-green-500" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <ModernNavbar activeSection={activeSection} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Data-themed background pattern from Hero Patterns */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-[0.03]" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm63 31c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM34 90c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm56-76c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%233b82f6\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '150px',
            zIndex: 0
          }}
        ></div>
        
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-900/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-900/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div 
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FiTrendingUp className="w-4 h-4" />
                <span>Data Analyst & Business Intelligence</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I'm <span className="block">Sahil Ali</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                A Data-Driven Inventory Specialist, Warehouse Operations Pro, and AI Automation Enthusiast.
              </motion.p>
              
              <motion.p 
                className="text-lg italic text-gray-500 dark:text-gray-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                "I simplify chaos, optimize systems, and use AI to make work smarter."
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-3 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full"
                >
                  <span className="relative z-10">View Resume</span>
                  <FaExternalLinkAlt className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full"
                >
                  <span className="relative z-10">Preview Resume</span>
                  <FaFileAlt className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <motion.div 
                className="relative w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 transform rotate-6"></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                      <img 
                        src="/images/profile/profile.avif" 
                        alt="Sahil Ali - Professional Photo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/profile-fallback.png";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Summary */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My Journey
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              I began my career optimizing inventory systems in fast-paced retail environments. 
              Over the past 4+ years, I've supervised warehouse operations, streamlined vendor coordination, 
              and processed thousands of purchase invoices with precision. Today, I combine that practical 
              experience with the power of AI tools like ChatGPT, Python, and Notion AI to build automated 
              workflows that save time and reduce errors.
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
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
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
                  className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
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
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Work With Me?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              I understand how real-world operations work — and I build digital tools that make those systems smarter. 
              Whether it's reconciling stock across multiple vendors or setting up an AI assistant to plan your daily tasks, 
              I can bridge manual effort with modern automation.
            </p>
            <div className="mt-8">
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Based in Rajasthan, India</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Passionate about clean systems & smart tech | Currently working on a full body transformation 💪
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Work Together Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Open to freelance projects, remote jobs, or automation consulting
            </p>
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
      
      <Footer />
    </div>
  );
};

export default About;
