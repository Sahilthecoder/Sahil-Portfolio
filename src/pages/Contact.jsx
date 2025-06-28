import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <HeroSection 
          heroRef={heroRef} 
          controls={controls} 
          container={container} 
          item={item} 
        />

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
  <section ref={heroRef} className="relative pt-32 pb-28 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]" />
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob" />
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div 
        variants={container}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row items-center"
      >
        {/* Hero Content */}
        <motion.div variants={item} className="md:w-1/2 mb-10 md:mb-0">
          <motion.div className="mb-6">
            <motion.div 
              className="mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Let's{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                  Connect
                </span>
              </h1>
            </motion.div>
          </motion.div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#contact-form"
              className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg text-center shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="transition-transform duration-300 group-hover:translate-x-1">Get In Touch</span>
                <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
            </a>
            <a
              href="#services"
              className="group relative bg-white hover:bg-gray-50 text-indigo-700 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="transition-transform duration-300 group-hover:translate-x-1">View Services</span>
                <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
              </span>
              <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
            </a>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 p-1 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                <img
                  src="/images/contact-hero.avif"
                  alt="Contact Sahil Ali"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-600 rounded-full opacity-20 animate-pulse" />
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
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g. Sahil Ali"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="_replyto"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g. sahil@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number <span className="text-gray-500 dark:text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="+91 98757 71550"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service You Need <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white pr-10 appearance-none"
              >
                <option value="" disabled>Select a service</option>
                <option value="Dashboard Design">Dashboard Design</option>
                <option value="Data Cleaning & Analysis">Data Cleaning & Analysis</option>
                <option value="Inventory Automation">Inventory Automation</option>
                <option value="Excel/Google Sheets System">Excel/Google Sheets System</option>
                <option value="Custom Request">Custom Request</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Describe Your Project <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="E.g. Need a sales dashboard for Q3, timeline 2 weeks, budget $500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Attach File <span className="text-gray-500 dark:text-gray-400">(optional)</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg bg-white/30 dark:bg-gray-700/30">
                <div className="space-y-1 text-center">
                  <FaFileUpload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="attachment" 
                        type="file" 
                        className="sr-only"
                        accept=".csv, .xls, .xlsx"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, XLSX up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="group relative inline-flex items-center px-8 py-4 bg-indigo-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
              >
                <span className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">Send Request</span>
                  <FaPaperPlane className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="absolute inset-0 bg-indigo-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
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
