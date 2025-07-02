import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaUserFriends
} from 'react-icons/fa';
import { FaMicrosoft } from 'react-icons/fa';
import { SiTensorflow, SiPython, SiReact, SiJavascript } from 'react-icons/si';
import HeroSection from '../components/HeroSection/HeroSection';
import '../components/HeroSection/HeroSection.css';

// Skills data
const skills = [
  { name: 'Data Analysis', level: 90, icon: <FaChartLine className="text-blue-500" /> },
  { name: 'Inventory Management', level: 95, icon: <FaDatabase className="text-purple-500" /> },
  { name: 'ERP Systems', level: 90, icon: <FaServer className="text-green-500" /> },
  { name: 'Excel & VBA', level: 92, icon: <FaChartBar className="text-yellow-500" /> },
  { name: 'AI & ML', level: 80, icon: <FaRobot className="text-pink-500" /> },
  { name: 'Power BI', level: 85, icon: <FaMicrosoft className="text-yellow-400" /> },
  { name: 'Python', level: 88, icon: <SiPython className="text-blue-400" /> },
  { name: 'JavaScript/React', level: 75, icon: <SiReact className="text-blue-300" /> },
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
    // Set up scroll event listener
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setIsMounted(false);
    };
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
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
    { id: 'about', label: 'About Me', icon: <FaLaptopCode className="mr-2" /> },
    { id: 'skills', label: 'Skills', icon: <FaTools className="mr-2" /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase className="mr-2" /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap className="mr-2" /> },
  ];
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg dark:to-dark-bg/90 overflow-x-hidden">
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-blue-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-100/80 dark:from-gray-900/90 dark:to-gray-800/90"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Text content */}
            <motion.div 
              className="text-center lg:text-left lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                About{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                  Me
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Get to know the person behind the code and data
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
                I'm a passionate professional with expertise in data analysis, AI, and inventory management, dedicated to transforming complex data into actionable insights.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a 
                  href="#skills" 
                  className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <FaTools className="w-5 h-5" />
                  View Skills
                </a>
                <a 
                  href="#experience" 
                  className="px-8 py-3.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <FaBriefcase className="w-5 h-5" />
                  My Experience
                </a>
              </div>
            </motion.div>
            
            {/* Right side - Profile Image */}
            <motion.div 
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-indigo-200 dark:border-indigo-800 p-1">
                <img 
                  src="/images/profile.avif" 
                  alt="Sahil Ali"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-profile.jpg';
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-full shadow-xl">
                <FaUserFriends className="w-6 h-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Fun Facts Section */}
      <section className="py-16 md:py-20 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              By The Numbers
            </h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Quantifying my professional journey and achievements
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {funFacts.map((fact, index) => (
              <motion.div 
                key={fact.id}
                className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 dark:border-gray-700/50 hover:-translate-y-1 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg mr-4">
                    {fact.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{fact.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{fact.title}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{fact.description}</p>
              </motion.div>
            ))}
          </div>
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
