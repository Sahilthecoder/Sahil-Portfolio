import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { getImageUrl } from '../config/images';
import { 
  FaPaperPlane, 
  FaFileUpload, 
  FaGithub, 
  FaLinkedin, 
  FaHome, 
  FaEnvelope, 
  FaWhatsapp, 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaBoxes, 
  FaSync, 
  FaTools, 
  FaCheck,
  FaChartLine
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql, 
  SiTableau, 
  SiNodedotjs, 
  SiGooglesheets 
} from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';

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

// Custom hook for scroll animations
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

const Contact = () => {
  const heroRef = useRef(null);
  const controls = useScrollAnimation(heroRef);
  const [activeService, setActiveService] = useState('All');
  
  // Services data
  const services = [
    {
      id: 1,
      title: 'Inventory Management',
      description: 'Comprehensive inventory tracking, stock reconciliation, and optimization strategies to reduce costs and improve efficiency.',
      icon: <FaBoxes className="text-2xl text-indigo-600 dark:text-indigo-400" />,
      category: 'Inventory',
      highlights: [
        'Stock level optimization',
        'FIFO implementation',
        'Vendor coordination',
        'Inventory auditing'
      ]
    },
    {
      id: 2,
      title: 'Data Analysis & Reporting',
      description: 'Transform raw data into actionable insights with custom dashboards and comprehensive reports.',
      icon: <FaChartLine className="text-2xl text-indigo-600 dark:text-indigo-400" />,
      category: 'Data',
      highlights: [
        'KPI dashboards',
        'Sales & inventory reports',
        'Trend analysis',
        'Performance metrics'
      ]
    },
    {
      id: 3,
      title: 'Process Automation',
      description: 'Automate repetitive tasks and workflows to boost productivity and reduce manual errors.',
      icon: <FaSync className="text-2xl text-indigo-600 dark:text-indigo-400" />,
      category: 'Automation',
      highlights: [
        'Workflow automation',
        'Data entry automation',
        'Report generation',
        'Email automation'
      ]
    },
    {
      id: 4,
      title: 'ERP Implementation',
      description: 'Expert guidance on selecting and implementing the right ERP system for your business needs.',
      icon: <FaDatabase className="text-2xl text-indigo-600 dark:text-indigo-400" />,
      category: 'Business',
      highlights: [
        'System selection',
        'Data migration',
        'User training',
        'Ongoing support'
      ]
    },
    {
      id: 5,
      title: 'Excel/Sheets Solutions',
      description: 'Custom Excel and Google Sheets solutions for data management, analysis, and reporting.',
      icon: <SiGooglesheets className="text-2xl text-indigo-600 dark:text-indigo-400" />,
      category: 'Data',
      highlights: [
        'Advanced formulas',
        'Pivot tables',
        'Macro creation',
        'Data visualization'
      ]
    },
    {
      id: 6,
      title: 'Business Process Optimization',
      description: 'Streamline operations and eliminate inefficiencies in your business processes.',
      icon: <FaTools className="text-2xl text-indigo-600 dark:text-indigo-400" />,
      category: 'Business',
      highlights: [
        'Process mapping',
        'Bottleneck identification',
        'Efficiency improvement',
        'Cost reduction'
      ]
    },
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Filter services based on active category
  const filteredServices = activeService === 'All' 
    ? services 
    : services.filter(service => service.category === activeService);

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission is handled by Formspree
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <HeroSection 
        heroRef={heroRef} 
        controls={controls} 
        container={container} 
        item={item} 
      />

      <div className="container mx-auto px-4">
        {/* Services Section */}
        <ServicesSection 
          activeService={activeService}
          setActiveService={setActiveService}
          filteredServices={filteredServices}
        />

        {/* Contact Form Section */}
        <ContactFormSection 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

// Extracted Components
const HeroSection = ({ heroRef, controls, container, item }) => (
  <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    {/* Grid background */}
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
        animate={controls}
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
            Let's Connect
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300"
            variants={item}
          >
            Get In Touch
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            variants={item}
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 font-medium">
              Have a project in mind or want to discuss potential opportunities?
            </span>
            <span className="block mt-2 text-gray-600 dark:text-gray-400 text-lg">
              I'm excited to hear about your ideas and how we can work together to bring them to life.
            </span>
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={item}
          >
            <motion.a
              href="#contact-form"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3 transition-all duration-300 group-hover:mr-4">Send a Message</span>
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            
            <motion.a
              href="#services"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-indigo-700 bg-white border-2 border-indigo-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3 transition-all duration-300 group-hover:mr-4">View Services</span>
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-indigo-50 dark:bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="relative w-full max-w-xl mx-auto mt-16 lg:mt-0 lg:max-w-none lg:w-1/2"
          variants={item}
        >
          <div className="relative">
            <div className="relative z-10 w-full max-w-md mx-auto aspect-[4/5] sm:aspect-square bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-3xl p-1.5 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                <motion.img 
                  src={getImageUrl('CONTACT_HERO')} 
                  alt="Contact Sahil Ali" 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'; 
                  }} 
                />
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-xl dark:mix-blend-normal"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                />
                
                <motion.div 
                  className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl dark:mix-blend-normal"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: 'easeInOut', 
                    delay: 1 
                  }}
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 md:w-24 md:h-24 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl dark:mix-blend-normal"></div>
            <div className="absolute -top-10 -left-10 w-16 h-16 md:w-20 md:h-20 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl dark:mix-blend-normal"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ServicesSection = ({ activeService, setActiveService, filteredServices }) => (
  <section id="services" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Services</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here are some of the services I offer to help you achieve your business goals.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Service Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All', 'Inventory', 'Data', 'Automation', 'Business'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveService(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeService === category
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            <ul className="list-none mt-4">
              {service.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start mb-2">
                  <FaCheck className="text-indigo-600 dark:text-indigo-400 w-4 h-4 mr-2 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactFormSection = ({ formData, handleChange, handleSubmit }) => (
  <section id="contact-form" className="py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Let's Collaborate!</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Have a project, automation idea, or analysis in mind? Tell me how I can help.</p>
          </div>
          <form 
            id="contactForm" 
            method="POST" 
            action="https://formspree.io/f/xpwrjjqj" 
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group space-y-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-transparent"
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-3 -top-2.5 px-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white/80 dark:peer-focus:bg-gray-800/80"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative group space-y-1">
                <input
                  type="email"
                  id="email"
                  name="_replyto"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-transparent"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-3 -top-2.5 px-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white/80 dark:peer-focus:bg-gray-800/80"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="relative group space-y-1">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="peer w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-transparent"
                placeholder=" "
              />
              <label 
                htmlFor="phone" 
                className="absolute left-3 -top-2.5 px-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white/80 dark:peer-focus:bg-gray-800/80"
              >
                Phone Number <span className="text-gray-500 dark:text-gray-400 text-xs">(optional)</span>
              </label>
            </div>

            <div className="relative group space-y-1">
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="peer w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white pr-10 appearance-none"
              >
                <option value="" disabled hidden> </option>
                <option value="Dashboard Design">Dashboard Design</option>
                <option value="Data Cleaning & Analysis">Data Cleaning & Analysis</option>
                <option value="Inventory Automation">Inventory Automation</option>
                <option value="Excel/Google Sheets System">Excel/Google Sheets System</option>
                <option value="Custom Request">Custom Request</option>
              </select>
              <label 
                htmlFor="service" 
                className="absolute left-3 -top-2.5 px-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white/80 dark:peer-focus:bg-gray-800/80"
              >
                Service You Need <span className="text-red-500">*</span>
              </label>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative group space-y-1">
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                className="peer w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-transparent"
                placeholder=" "
              />
              <label 
                htmlFor="message" 
                className="absolute left-3 -top-2.5 px-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white/80 dark:peer-focus:bg-gray-800/80"
              >
                Describe Your Project <span className="text-red-500">*</span>
              </label>
              <div className="absolute bottom-3 left-4 text-xs text-gray-500 dark:text-gray-400 pointer-events-none peer-placeholder-shown:block hidden">
                E.g. Need a sales dashboard for Q3, timeline 2 weeks, budget $500
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <FaFileUpload className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, XLSX (MAX. 10MB)</p>
                    </div>
                    <input 
                      id="file-upload" 
                      name="attachment" 
                      type="file" 
                      className="hidden"
                      accept=".csv, .xls, .xlsx"
                    />
                  </label>
                </div>
                <div className="absolute -top-2 left-3 px-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-1">
                    Attach File <span className="text-gray-500 dark:text-gray-400">(optional)</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <span className="flex items-center transition-all duration-300 group-hover:translate-x-1 group-active:translate-y-0.5">
                    Send Message
                    <FaPaperPlane className="ml-2 transition-all duration-300 transform -translate-x-1 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 h-fit"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Let's connect! Your data and my expertise can create impactful solutions.</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <FaHome className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
              <div>
                <p className="text-gray-700 dark:text-gray-300">Rajasthan, India (Open for Relocation)</p>
              </div>
            </div>
            
            <a
              href="mailto:sahilkhan36985@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
            >
              <FaEnvelope className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p>sahilkhan36985@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/SahilTheCoder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-colors">
                <FaGithub className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">SahilTheCoder</p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/sahil-ali-714867242/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-colors">
                <FaLinkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">sahil-ali-714867242</p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </a>

            <a
              href="https://wa.me/919875771550"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-colors">
                <FaWhatsapp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">WhatsApp</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">+91 98757 71550</p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Contact;
