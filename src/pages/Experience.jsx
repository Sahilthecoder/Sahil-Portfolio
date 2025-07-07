import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaBriefcase,
  FaGraduationCap,
  FaChartLine,
  FaTools,
  FaUserTie,
  FaDownload,
  FaExternalLinkAlt,
  FaEnvelope,
  FaArrowDown,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar/ModernNavbar';
import Footer from '../components/Footer';
import { FiTrendingUp } from 'react-icons/fi';

const Experience = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    { value: '3+', label: 'Years Experience' },
    { value: '95%', label: 'Billing Accuracy' },
    { value: '30%', label: 'Cost Reduction' },
    { value: '99.5%', label: 'Inventory Accuracy' },
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

  const education = {
    degree: 'Bachelor of Science (B.Sc.) in Computer Science',
    institution: 'MDSU University, Rajasthan',
    duration: 'Jan 2018 – Jan 2021',
    details: [
      'Specialized in Data Structures and Database Management',
      'Developed strong analytical and problem-solving skills',
      'Graduated with Distinction',
    ],
  };

  const languages = [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Native' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <ModernNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Data-themed background pattern from Hero Patterns */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233b82f6' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: '150px',
            zIndex: 0,
          }}
        ></div>

        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-900/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-900/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm shadow-sm mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <FiTrendingUp className="w-4 h-4" />
                <span>Professional Journey</span>
              </motion.div>

              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Work Experience
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                A timeline of my professional journey, highlighting key roles, achievements, and the
                skills I've developed along the way.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <a
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FaDownload className="w-4 h-4" />
                  Download Resume
                </a>
                <NavLink
                  to="/contact"
                  className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Contact Me
                </NavLink>
              </motion.div>

              <motion.button
                onClick={scrollToContent}
                className="mt-12 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex flex-col items-center mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                aria-label="Scroll down"
              >
                <span className="text-sm mb-1">Explore My Journey</span>
                <FaArrowDown className="w-5 h-5 animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content starts here with an ID for smooth scrolling */}
      <div id="content-start" className="pt-4"></div>

      <main className="flex-grow">
        {/* Timeline Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
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
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`relative mb-12 ${index % 2 === 0 ? 'pr-8 sm:pr-0 sm:pl-8' : 'pl-8 sm:pl-0 sm:pr-8'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${index % 2 === 0 ? 'sm:mr-auto sm:ml-0' : 'sm:ml-auto sm:mr-0'}`}
                    style={{ maxWidth: 'calc(50% - 2rem)' }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-3">
                        <FaBriefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
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

        {/* Core Competencies */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Core Competencies
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {Object.entries(coreCompetencies).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Languages */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Education</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-4 flex-shrink-0">
                        <FaGraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{education.degree}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{education.institution}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {education.duration}
                        </p>
                        <ul className="space-y-2">
                          {education.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-indigo-500 mr-2">•</span>
                              <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Languages */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Languages</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <div className="space-y-4">
                      {languages.map((lang, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {lang.level}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: lang.level === 'Native' ? '100%' : '85%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
              <p className="text-xl text-indigo-100 mb-8">
                Have a project in mind or want to discuss potential opportunities? Let's connect!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FaDownload className="w-4 h-4" />
                  Download Resume
                </a>
                <NavLink
                  to="/contact"
                  className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Contact Me
                </NavLink>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Experience;
