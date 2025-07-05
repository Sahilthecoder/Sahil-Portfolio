import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaBriefcase, FaGraduationCap, FaTools, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../components/HeroSection/HeroSection.css';

// Base URL for images
const baseUrl = 'https://sahilthecoder.github.io/Sahil-Portfolio';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [expandedItems, setExpandedItems] = useState({});

  // Hero content for Experience page
  const heroContent = {
    title: 'My Journey',
    subtitle: 'Professional Experience & Education',
    description: 'A detailed look at my professional journey, including work experience, education, and key achievements throughout my career.',
    primaryButton: { 
      text: 'View Work History', 
      showArrow: true,
      onClick: (e) => {
        e.preventDefault();
        const workSection = document.getElementById('work-experience');
        if (workSection) {
          workSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    secondaryButton: { 
      text: 'Download Resume', 
      link: `${baseUrl}/resume.pdf`,
      showArrow: true
    }
  };

  // Work Experience Data
  const workExperience = [
    {
      id: 1,
      role: 'Inventory Specialist & Cash Flow',
      company: 'Ekam Indian Groceries',
      duration: 'Dec 2023 - June 2025',
      location: 'Adelaide, Australia',
      companyUrl: 'https://www.facebook.com/ekamindiangroceries/',
      description: 'Managed daily purchase entries, invoice verification, attendance tracking, and supplier coordination across dual store locations. Automated reporting processes and supported cash flow documentation.',
      highlights: [
        'Handled purchase data and fruit/vegetable invoices using ERP software and advanced Excel functions',
        'Cross-checked supplier invoices and reconciled statements to prevent overbilling, ensuring financial accuracy',
        'Maintained staff attendance and created daily cash reports',
        'Collaborated with the team to support inventory accuracy and operational flow',
        'Reduced billing errors and improved invoice match accuracy by 95%',
        'Saved over 4 hours per week through structured Excel logs and automation'
      ],
      skills: ['Inventory Management', 'Excel', 'Invoice Verification', 'Cash Flow Analysis', 'ERP Systems']
    },
    {
      id: 2,
      role: 'GRN Officer',
      company: 'Bansal Supermarket',
      duration: 'Dec 2022 - Nov 2023',
      location: 'Surat, India',
      companyUrl: 'https://www.bansalsupermarket.com/',
      description: 'Responsible for goods receipt entries, invoice cross-checking, offer updates, and FIFO-based inventory flow. Maintained operational registers including Top 100/200 item reports.',
      highlights: [
        'Managed GRNs, MRP/offer changes, and 10-item register maintenance with precision',
        'Conducted regular floor walks and enforced FIFO practices across departments to reduce waste',
        'Handled PI management, rate updates, and price accuracy for fast-moving items',
        'Reduced stock discrepancies by 30% through enhanced GRN practices',
        'Improved offer accuracy and register organization across 500+ SKUs'
      ],
      skills: ['Goods Receipt', 'Inventory Control', 'FIFO', 'Vendor Management', 'Stock Reconciliation']
    },
    {
      id: 3,
      role: 'Warehouse Supervisor',
      company: 'Arzt Health & Private Limited',
      duration: 'June 2022 - Nov 2022',
      location: 'Jaipur, India',
      companyUrl: 'https://www.indiamart.com/arzt-and-health-private-limited/',
      description: 'Oversaw stock control, warehouse documentation, and physical inventory across training material storage. Ensured FIFO handling, audits, and timely replenishment.',
      highlights: [
        'Led day-to-day warehouse operations and staff coordination with a strong focus on efficiency',
        'Maintained accurate bin cards, stock logs, and conducted warehouse audits',
        'Implemented FIFO principles and organized material flow for training batches',
        'Achieved 100% stock availability across training cycles',
        'Streamlined warehouse layout and improved stock handling speed'
      ],
      skills: ['Warehouse Management', 'Stock Control', 'FIFO', 'Inventory Auditing', 'Team Leadership']
    },
    {
      id: 4,
      role: 'Data Analyst & Automation Specialist',
      company: 'Personal Portfolio & Projects',
      duration: '2024 - Present',
      location: 'Self-Employed',
      description: 'Designed and developed a professional portfolio website to showcase data analytics, automation, and inventory management expertise. Utilized cutting-edge AI and creative tools to enhance productivity.',
      highlights: [
        'Leveraged ChatGPT for code generation, SQL query optimization, and automating routine analysis tasks',
        'Incorporated Perplexity AI for real-time data insights and refining data narratives',
        'Used advanced Google Sheets formulas and Apps Script to automate dashboards and KPI tracking',
        'Implemented dynamic data visualizations and streamlined reporting',
        'Created a fully automated portfolio site and project dashboards',
        'Enhanced productivity through AI-driven research and process automation'
      ],
      skills: ['Data Analysis', 'Automation', 'Google Sheets', 'AI Tools', 'Data Visualization']
    }
  ];

  // Education Data
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science (B.Sc.) in Computer Science',
      institution: 'MDSU University',
      duration: 'Jan 2018 - Jan 2021',
      location: 'Rajasthan, India',
      achievements: [
        'Specialized in Computer Applications',
        'Developed strong foundation in programming and data structures',
        'Completed coursework in database management and software development'
      ]
    },
    {
      id: 2,
      degree: 'Higher Secondary Education (XII)',
      institution: 'Kendriya Vidyalaya',
      duration: '2014 - 2016',
      location: 'New Delhi, India',
      achievements: [
        'Scored 92% in Computer Science',
        'Participated in National Science Exhibition',
        'Member of School Tech Club'
      ]
    }
  ];

  // Toggle expanded state for items
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get icon based on role
  const getRoleIcon = (role) => {
    if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('machine learning')) {
      return <FaTools className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
    return <FaBriefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg dark:to-dark-bg/90 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" style={{ zIndex: 1 }}></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div 
                className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {heroContent.subtitle}
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
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {heroContent.description}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <button
                  onClick={heroContent.primaryButton.onClick}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {heroContent.primaryButton.text}
                  {heroContent.primaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
                <a
                  href={heroContent.secondaryButton.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {heroContent.secondaryButton.text}
                  {heroContent.secondaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </a>
              </motion.div>
            </div>

            {/* Experience Highlights */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Career Highlights</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Key achievements and milestones throughout my professional journey
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4+</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">10+</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">5+</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Technologies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">100%</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        {/* Work Experience Section */}
        <section id="work-experience" className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
            <FaBriefcase className="mr-3 text-indigo-600 dark:text-indigo-400" />
            Work Experience
          </h2>
          
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400">{exp.company}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="mr-2" />
                        {exp.duration}
                        <span className="mx-2">•</span>
                        <FaMapMarkerAlt className="mr-2" />
                        {exp.location}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2"
                      >
                        {expandedItems[exp.id] ? 'Show Less' : 'Show More'}
                        {expandedItems[exp.id] ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {expandedItems[exp.id] && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {exp.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-indigo-500 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
            <FaGraduationCap className="mr-3 text-indigo-600 dark:text-indigo-400" />
            Education
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 mt-1">{edu.institution}</p>
                <div className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <FaCalendarAlt className="mr-2" />
                  {edu.duration}
                  <span className="mx-2">•</span>
                  <FaMapMarkerAlt className="mr-2" />
                  {edu.location}
                  {edu.companyUrl && (
                    <>
                      <span className="mx-2">•</span>
                      <a 
                        href={edu.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Visit Website
                      </a>
                    </>
                  )}
                </div>
                {edu.achievements && (
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    <h4 className="font-medium text-gray-700 dark:text-gray-200">Achievements:</h4>
                    <div className="mt-3">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Key Achievements:</h4>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        {edu.highlights?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        )) || <li>No highlights available</li>}
                      </ul>
                    </div>
                    {edu.skills && (
                      <div className="mt-3">
                        <h4 className="font-medium text-gray-700 dark:text-gray-200">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {edu.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
