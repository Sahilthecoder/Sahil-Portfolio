import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaDownload,
  FaPhone,
  FaGlobe,
  FaDatabase,
  FaChartLine,
  FaCode,
  FaServer,
  FaTools,
  FaGraduationCap,
  FaAward,
  FaBriefcase,
  FaLaptopCode,
  FaFilePdf,
  FaChartBar,
  FaDesktop,
  FaArrowRight
} from 'react-icons/fa';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const aboutRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
  };

  // Navigation items
  const navItems = [
    { id: 'about', label: 'About Me', icon: <FaLaptopCode className="mr-2" /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap className="mr-2" /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope className="mr-2" /> },
  ];

  // Contact Information
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-indigo-500" />,
      text: 'sahilkhan36985@gmail.com',
      link: 'mailto:sahilkhan36985@gmail.com',
    },
    {
      icon: <FaPhone className="text-green-500" />,
      text: '+91 6377XXXXXX',
      link: 'tel:+916377XXXXXX',
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      text: 'Jaipur, Rajasthan, India',
      link: 'https://goo.gl/maps/your-location',
    },
    {
      icon: <FaGithub className="text-gray-700 dark:text-gray-300" />,
      text: 'github.com/SahilTheCoder',
      link: 'https://github.com/SahilTheCoder',
    },
    {
      icon: <FaLinkedin className="text-blue-600" />,
      text: 'linkedin.com/in/sahil-ali-714867242',
      link: 'https://linkedin.com/in/sahil-ali-714867242',
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="mb-10 md:mb-0 md:mr-12"
              variants={item}
              initial="hidden"
              animate="show"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/20 p-1 bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                  <img
                    src="/images/profile.avif"
                    alt="Sahil Ali"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Sahil+Ali&background=4f46e5&color=fff&size=512';
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center md:text-left"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                variants={item}
              >
                About{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-400 dark:to-blue-500">
                  Me
                </span>
              </motion.h1>
              <motion.div 
                className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6"
                variants={item}
              >
                Data-Driven Inventory Specialist & Business Intelligence Analyst
              </motion.div>
              <motion.p 
                className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed"
                variants={item}
              >
                Transforming complex data into strategic insights and operational excellence through advanced analytics and process optimization.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center md:justify-start gap-4"
                variants={item}
              >
                <a 
                  href="#contact" 
                  className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg text-center shadow-lg overflow-hidden transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Contact Me</span>
                    <FaArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="absolute inset-0 bg-indigo-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </a>
                <a 
                  href="/resume.pdf" 
                  download
                  className="group relative bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 dark:border-indigo-500 shadow-md overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Download CV</span>
                    <FaDownload className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.section 
              id="about"
              ref={aboutRef}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 border border-gray-100/50 dark:border-gray-700/50"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item} className="flex items-center mb-8">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                  <FaLaptopCode className="text-indigo-600 dark:text-indigo-400 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Who am I?</h2>
              </motion.div>
              
              <motion.div variants={item} className="space-y-6 text-gray-700 dark:text-dark-text-body leading-relaxed">
                <p className="text-gray-800 dark:text-dark-text-heading">Hello! I am <strong className="text-indigo-700 dark:text-indigo-400">Sahil Ali</strong>, an Inventory Specialist, Data Analyst, and System Optimizer based in Rajasthan, India. With over 4 years of hands-on experience, I specialize in managing stock levels, streamlining purchasing processes, and ensuring data accuracy for operational excellence.</p>

                <p className="text-gray-800 dark:text-dark-text-heading">My expertise lies in leveraging ERP systems like Erply, advanced Excel functions such as VLOOKUP and Pivot Tables, and data-driven decision-making to optimize inventory and reporting processes. I am passionate about turning raw data into actionable insights that drive business success.</p>

                <p className="text-gray-800 dark:text-dark-text-heading">Beyond my technical skills, I am a detail-oriented team player who thrives on collaboration and continuous improvement. I believe that accuracy and efficiency are the backbone of any successful supply chain.</p>

                <p className="text-gray-800 dark:text-dark-text-heading">Throughout my career, I have successfully implemented automation techniques that reduce manual work and improve data integrity. I have experience in creating dashboards and reports that provide real-time insights to stakeholders, helping guide strategic decisions and improve inventory turnover rates.</p>

                <p className="text-gray-800 dark:text-dark-text-heading">My passion for learning keeps me updated with the latest tools and technologies in data analytics, including AI-driven platforms such as ChatGPT and Perplexity, which I use to enhance data processing and problem-solving capabilities.</p>

                <p className="text-gray-800 dark:text-dark-text-heading">I am committed to delivering solutions that not only meet operational needs but also empower businesses to grow sustainably and efficiently.</p>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Education</h3>
                  <div className="bg-gray-50/80 dark:bg-gray-700/80 p-6 rounded-lg backdrop-blur-sm border border-gray-100/50 dark:border-gray-600/30">
                    <h4 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">Bachelor of Science (B.Sc.) in Computer Science</h4>
                    <p className="text-gray-600 dark:text-gray-300">MDSU University, Rajasthan (2018 – 2021)</p>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            {/* Contact Section */}
            <motion.section 
              id="contact"
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 border border-gray-100/50 dark:border-gray-700/50"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item} className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Feel free to reach out to me for any questions or opportunities. I'll get back to you as soon as possible!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-lg border border-gray-200/70 dark:border-gray-700/50 hover:bg-gray-50/70 dark:hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
                    >
                      <div className="text-2xl text-indigo-600 mr-4">
                        {contact.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-200">{contact.text}</h3>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-6 transition-colors duration-300 border border-gray-100/50 dark:border-gray-700/50">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sahil Ali</h2>
                <div className="w-16 h-1 bg-indigo-500 mx-auto my-3 rounded-full"></div>
                <p className="text-gray-600 dark:text-gray-300">Inventory Specialist & Data Analyst</p>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      const element = document.getElementById(item.id);
                      if (element) {
                        window.scrollTo({
                          top: element.offsetTop - 100,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                      activeSection === item.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Info</h3>
                <div className="space-y-3">
                  {contactInfo.slice(0, 3).map((item, index) => (
                    <a 
                      key={index} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </a>
                  ))}
                </div>
                <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {contactInfo.slice(3).map((item, index) => (
                    <a 
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      aria-label={item.text}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
