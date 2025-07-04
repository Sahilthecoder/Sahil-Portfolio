import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Base URL for images
const baseUrl = 'https://sahilthecoder.github.io/Sahil-Portfolio';
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
  FaArrowRight,
  FaRocket,
  FaLightbulb,
  FaProjectDiagram,
  FaUsers,
  FaChartPie,
  FaRobot,
  FaBars,
  FaUserFriends,
  FaTruck
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { FaMicrosoft } from 'react-icons/fa';
import { SiTensorflow, SiPython, SiReact, SiJavascript } from 'react-icons/si';
import '../components/HeroSection/HeroSection.css';

// Skills data organized by category
const skillsByCategory = [
  {
    category: 'Data & Analysis',
    icon: <FaChartLine className="text-blue-500" />,
    skills: [
      { name: 'Data Analysis', level: 90, icon: <FaChartLine className="text-blue-500" /> },
      { name: 'Data Visualization', level: 88, icon: <FaChartBar className="text-purple-500" /> },
      { name: 'Statistical Modeling', level: 85, icon: <FaChartPie className="text-green-500" /> },
      { name: 'Excel & VBA', level: 92, icon: <FaMicrosoft className="text-yellow-500" /> }
    ]
  },
  {
    category: 'Inventory & Systems',
    icon: <FaDatabase className="text-purple-500" />,
    skills: [
      { name: 'Inventory Management', level: 95, icon: <FaDatabase className="text-purple-500" /> },
      { name: 'ERP Systems', level: 90, icon: <FaServer className="text-green-500" /> },
      { name: 'Process Optimization', level: 88, icon: <FaProjectDiagram className="text-blue-500" /> },
      { name: 'Supply Chain', level: 85, icon: <FaTruck className="text-indigo-500" /> }
    ]
  },
  {
    category: 'AI & Development',
    icon: <FaRobot className="text-pink-500" />,
    skills: [
      { name: 'AI & ML', level: 80, icon: <FaRobot className="text-pink-500" /> },
      { name: 'Python', level: 88, icon: <SiPython className="text-blue-400" /> },
      { name: 'JavaScript/React', level: 75, icon: <SiReact className="text-blue-300" /> },
      { name: 'SQL & NoSQL', level: 85, icon: <FaDatabase className="text-yellow-500" /> }
    ]
  },
  {
    category: 'Tools & Platforms',
    icon: <FaTools className="text-yellow-500" />,
    skills: [
      { name: 'Power BI', level: 85, icon: <FaMicrosoft className="text-yellow-400" /> },
      { name: 'Tableau', level: 80, icon: <FaChartBar className="text-blue-500" /> },
      { name: 'Jupyter Notebooks', level: 85, icon: <FaCode className="text-orange-500" /> },
      { name: 'Git & GitHub', level: 78, icon: <FaGithub className="text-gray-800 dark:text-gray-200" /> }
    ]
  }
];

// Timeline data
const timeline = [
  {
    id: 1,
    role: 'Inventory Specialist',
    company: 'Ekam Indian Groceries, Australia',
    duration: '2021 - Present',
    description: 'Optimized inventory management, reduced stock discrepancies, and implemented data-driven purchasing strategies.',
    icon: <FaBriefcase className="text-blue-500" />
  },
  {
    id: 2,
    role: 'Data Analyst',
    company: 'Bansal Supermarket',
    duration: '2019 - 2021',
    description: 'Developed automated reporting systems and improved data accuracy for inventory management.',
    icon: <FaChartLine className="text-purple-500" />
  },
  {
    id: 3,
    role: 'B.Sc. Computer Science',
    company: 'MDSU University',
    duration: '2018 - 2021',
    description: 'Graduated with focus on data structures, algorithms, and database management.',
    icon: <FaGraduationCap className="text-green-500" />
  }
];

// Fun facts data

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const aboutRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['about', 'skills', 'experience', 'education'];
          const scrollPosition = window.scrollY + 100;
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setIsMounted(false);
    };
  }, []);

  // Enhanced scroll to section handler with mobile support
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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

  // Navigation items with smooth scrolling
  const navItems = [
    { 
      id: 'about', 
      label: 'About Me', 
      icon: <FaLaptopCode className="mr-2" />,
      onClick: (e) => {
        e.preventDefault();
        scrollToSection('about');
      }
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: <FaTools className="mr-2" />,
      onClick: (e) => {
        e.preventDefault();
        scrollToSection('skills');
      }
    },
    { 
      id: 'experience', 
      label: 'Experience', 
      icon: <FaBriefcase className="mr-2" />,
      onClick: (e) => {
        e.preventDefault();
        scrollToSection('experience');
      }
    },
    { 
      id: 'education', 
      label: 'Education', 
      icon: <FaGraduationCap className="mr-2" />,
      onClick: (e) => {
        e.preventDefault();
        scrollToSection('education');
      }
    },
  ];

  const renderNavItems = () => (
    <div className="flex flex-col space-y-2">
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={item.onClick}
          className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
            activeSection === item.id
              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 font-medium'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
          } touch-manipulation`}
          whileTap={{ scale: 0.98 }}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {item.icon}
          {item.label}
        </motion.button>
      ))}
    </div>
  );

  // Fun facts data
  const funFacts = [
    {
      id: 1,
      icon: <FaRocket className="text-indigo-600 dark:text-indigo-400 text-xl" />,
      value: '4+',
      title: 'Years Experience',
      description: 'Delivering data-driven solutions'
    },
    {
      id: 2,
      icon: <FaLightbulb className="text-yellow-500 dark:text-yellow-400 text-xl" />,
      value: '50+',
      title: 'Projects Completed',
      description: 'Across various industries'
    },
    {
      id: 3,
      icon: <FaChartLine className="text-green-500 dark:text-green-400 text-xl" />,
      value: '90%',
      title: 'Success Rate',
      description: 'Project delivery success'
    },
    {
      id: 4,
      icon: <FaUsers className="text-blue-500 dark:text-blue-400 text-xl" />,
      value: '30+',
      title: 'Happy Clients',
      description: 'Satisfied with my work'
    }
  ];

  if (!isMounted) return null;

  // Hero content for About page with enhanced mobile support
  const heroContent = {
    title: 'About Me',
    subtitle: 'Get to know me better',
    description: 'I am a passionate developer with expertise in web development and data analysis. I love creating beautiful, functional applications that solve real-world problems.',
    primaryButton: { 
      text: 'View Skills', 
      link: '#skills',
      showArrow: true,
      onClick: (e) => {
        e.preventDefault();
        scrollToSection('skills');
      }
    },
    secondaryButton: { 
      text: 'My Experience', 
      link: `${import.meta.env.BASE_URL || '/'}experience`,
      showArrow: true
    }
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
                <Link
                  to={heroContent.secondaryButton.link}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {heroContent.secondaryButton.text}
                  {heroContent.secondaryButton.showArrow && (
                    <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
              </motion.div>
            </div>

            {/* Content placeholder - Removed profile image */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">My Expertise</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Specializing in data analysis, inventory management, and full-stack development to deliver impactful solutions.
                  </p>
                  <div className="flex justify-center gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4+</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Years Exp</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">50+</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">30+</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
              My Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">Skills</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive collection of my technical skills and areas of expertise
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillsByCategory.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700/80 px-6 py-4 border-b border-gray-100/50 dark:border-gray-700/50">
                  <div className="flex items-center">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm mr-4">
                      {React.cloneElement(category.icon, { className: 'text-xl' })}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                              {React.cloneElement(skill.icon, { className: 'text-sm' })}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 + (skillIndex * 0.05) }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Continuously learning and expanding my skill set to stay current with the latest technologies and industry trends.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaEnvelope className="mr-2" />
              Let's Work Together
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
            {/* About Section */}
            <motion.section 
              id="about"
              ref={aboutRef}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-10 transition-all duration-300 border border-gray-100/50 dark:border-gray-700/50 hover:shadow-3xl hover:-translate-y-1.5"
            >
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div variants={item} className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white mb-4">
                    <FaLaptopCode className="text-2xl" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-4 rounded-full"></div>

                </motion.div>
              
              <motion.div variants={item} className="prose prose-sm sm:prose-base prose-indigo dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Hello! I am <strong className="text-indigo-700 dark:text-indigo-400 font-semibold">Sahil Ali</strong>, an Inventory Specialist, Data Analyst, and System Optimizer based in Rajasthan, India. With over 4 years of hands-on experience, I specialize in managing stock levels, streamlining purchasing processes, and ensuring data accuracy for operational excellence.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  My expertise lies in leveraging ERP systems like Erply, advanced Excel functions such as VLOOKUP and Pivot Tables, and data-driven decision-making to optimize inventory and reporting processes. I am passionate about turning raw data into actionable insights that drive business success.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Beyond my technical skills, I am a detail-oriented team player who thrives on collaboration and continuous improvement. I believe that accuracy and efficiency are the backbone of any successful supply chain.
                </p>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10 rounded-2xl p-6 sm:p-8 my-8 sm:my-12 border-l-4 border-indigo-500 shadow-inner">
                  <div className="flex">
                    <FaLightbulb className="text-yellow-500 text-2xl mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Did You Know?</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        I've helped businesses reduce inventory costs by up to 30% through data-driven optimization strategies and process improvements.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Throughout my career, I have successfully implemented automation techniques that reduce manual work and improve data integrity. I have experience in creating dashboards and reports that provide real-time insights to stakeholders, helping guide strategic decisions and improve inventory turnover rates.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  My passion for learning keeps me updated with the latest tools and technologies in data analytics, including AI-driven platforms such as ChatGPT and Perplexity, which I use to enhance data processing and problem-solving capabilities.
                </p>

                <div className="bg-white/95 dark:bg-gray-800/95 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white mb-4">
                      <FaGraduationCap className="text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                        <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">Bachelor of Science (B.Sc.) in Computer Science</h4>
                        <p className="text-gray-600 dark:text-gray-300">MDSU University, Rajasthan</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2018 – 2021</p>
                      </div>
                    </div>
                  </div>
                </div>
                </motion.div>
              </motion.div>
            </motion.section>
        </div>
      </div>
    </div>
  );
};

export default About;
