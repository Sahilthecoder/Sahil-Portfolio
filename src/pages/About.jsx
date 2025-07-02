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
import HeroSection from '../components/HeroSection/HeroSection';
import '../components/HeroSection/HeroSection.css';
// Image paths are now directly referenced from the public directory

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
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg">
      <HeroSection
        title={
          <>
            About{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Me
            </span>
          </>
        }
        subtitle="AI & Data Analytics Expert | Inventory Management Specialist"
        description="I combine expertise in AI, data analytics, and inventory management to create efficient, data-driven solutions. This portfolio, built with AI assistance, demonstrates my ability to leverage technology for practical business applications. My approach focuses on using data to optimize inventory systems, automate processes, and drive operational excellence."
        primaryButton={{
          text: 'View Resume',
          link: '/resume',
          showArrow: true
        }}
        secondaryButton={{
          text: 'Explore Projects',
          link: '/projects',
          showArrow: true
        }}
        imageProps={{
          src: `${import.meta.env.BASE_URL}profile.avif`,
          alt: 'Sahil Ali',
          className: 'w-full h-full object-cover',
          srcSet: `${import.meta.env.BASE_URL}optimized-images/profile@200w.avif 200w, ${import.meta.env.BASE_URL}optimized-images/profile@400w.avif 400w, ${import.meta.env.BASE_URL}optimized-images/profile@600w.avif 600w`,
          sizes: '(max-width: 640px) 200px, (max-width: 1024px) 400px, 600px',
          containerClass: 'w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/20 p-1 bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm',
          innerClass: 'w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl'
        }}
      />

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
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link 
                    to="/resume"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <FaFilePdf className="mr-3" />
                    <span className="text-sm">View My Resume</span>
                  </Link>
                  <Link 
                    to="/projects"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <FaCode className="mr-3" />
                    <span className="text-sm">Explore My Projects</span>
                  </Link>
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
