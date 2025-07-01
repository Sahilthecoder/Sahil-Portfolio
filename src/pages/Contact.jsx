import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../config/images';
import { 
  FaPaperPlane, 
  FaFileUpload, 
  FaGithub, 
  FaLinkedin, 
  FaHome, 
  FaEnvelope, 
  FaWhatsapp, 
  FaBoxes, 
  FaSync, 
  FaTools, 
  FaCheck,
  FaChartLine
} from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';

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

const Contact = () => {
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
      {/* Hero Section */}
      <HeroSection
        title={
          <>
            Let's{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Connect
            </span>
          </>
        }
        subtitle="Have a project in mind or want to discuss potential opportunities?"
        description="I'd love to hear from you! Get in touch and let's create something amazing together."
        containerClass="pt-32 pb-20 md:pt-40"
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

// Service Card Component
const ServiceCard = ({ service, index }) => (
  <motion.div
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
);

// Category Button Component
const CategoryButton = ({ category, activeCategory, onClick }) => (
  <button
    onClick={() => onClick(category)}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      activeCategory === category
        ? 'bg-indigo-600 text-white shadow-md'
        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
    }`}
  >
    {category}
  </button>
);

// Services Section Component
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
          <CategoryButton 
            key={category}
            category={category}
            activeCategory={activeService}
            onClick={setActiveService}
          />
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
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
