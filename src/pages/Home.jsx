import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../styles/responsive.css';
import { FiArrowRight, FiExternalLink, FiPackage, FiLayers, FiTrendingUp, FiMail, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import { FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import ProjectsSection from '../components/ProjectsSection/ProjectsSectionEnhanced';
import { Link } from 'react-router-dom';

// Using placeholder images from a public CDN
const HeroImage = 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&auto=format&fit=crop';
const Project1 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop';
const Project2 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop';
const Project3 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking on a link or button inside the card
    if (e.target.closest('a, button, .no-navigate')) {
      return;
    }
    
    if (project.link) {
      // Use React Router's navigate for SPA navigation
      navigate(project.link);
    } else if (project.githubLink) {
      window.open(project.githubLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle view project button click
  const handleViewProject = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.link) {
      // Use React Router's navigate for SPA navigation
      navigate(project.link);
    }
  };

  // Handle image error with fallback to preview image
  const handleImageError = (e) => {
    const target = e.target;
    if (target.src !== (project.previewImage || '')) {
      target.src = project.previewImage || '/images/project-placeholder.jpg';
      target.onerror = null; // Prevent infinite loop if fallback also fails
    } else if (target.src !== '/images/project-placeholder.jpg') {
      target.src = '/images/project-placeholder.jpg';
    }
  };

  // Handle external link clicks
  const handleExternalLink = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full">
      <motion.div
        className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Thumbnail Container with Fixed Aspect Ratio (16:9) */}
        <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
              style={{
                position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          <span className="text-white font-medium flex items-center">
            View Project <FiArrowRight className="ml-1" />
          </span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
            {project.title}
          </h3>
          
          {/* Project Links */}
          <div className="flex space-x-2 ml-2 flex-shrink-0">
            {project.githubLink && (
              <button 
                onClick={(e) => handleExternalLink(e, project.githubLink)}
                className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors no-navigate"
                aria-label="View on GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </button>
            )}
            {project.link && (
              <button
                onClick={handleViewProject}
                className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors no-navigate"
                aria-label="View Project Details"
              >
                <FiExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <FiCalendar className="mr-1.5 flex-shrink-0" />
          <span className="truncate">{project.date}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <span
              key={`${project.id}-tech-${index}`}
              className="px-2.5 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 rounded-full whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  </div>
  );
};

const Home = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Success message display
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwrjjqj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'No subject',
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Refs for all sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  // Simple scroll to next section
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle scroll to show/hide floating nav and set active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Determine active section
      const scrollPosition = window.scrollY + 200;

      const sectionOffsets = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'experience', ref: experienceRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
      ];

      for (const section of sectionOffsets) {
        const element = section.ref.current;
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade in effect for scroll button
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  // Sample projects data with proper links matching App.jsx routes
  const featuredProjects = [
    {
      id: 'zomato-expansion',
      title: 'Zomato Restaurant Expansion Analysis',
      shortDescription: 'Market Strategy Dashboard in Excel',
      description: "Built an interactive Excel dashboard to analyze Zomato's city-wise expansion strategy across India, uncovering performance trends and market insights. Helped identify high-performing regions and new expansion opportunities.",
      techStack: ['Excel', 'Data Analysis', 'Market Strategy'],
      icon: 'Excel',
      image: '/Sahil-Portfolio/images/projects/Project1_excel/Project1_Cover.webp',
      previewImage: '/Sahil-Portfolio/images/projects/Project1_excel/Project1_Cover.webp',
      link: '/projects/zomato-expansion',
      githubLink: '',
      featured: true,
      date: 'June 2024',
      categories: ['data-analysis', 'excel'],
      component: 'ZomatoAnalysis'
    },
    {
      id: 'bansal-supermarket',
      title: 'Bansal Supermarket Sales Analysis',
      shortDescription: 'Sales Performance Insights in Tableau',
      description: 'Created a dynamic Tableau dashboard revealing daily/weekly sales trends, customer behavior, and category performance for better decision-making. Boosted revenue by 12% through optimized inventory and promotions.',
      techStack: ['Tableau', 'Data Analysis', 'Sales Analytics'],
      icon: 'Tableau',
      image: '/Sahil-Portfolio/images/projects/Project2_tableau/Project2_Cover.webp',
      previewImage: '/Sahil-Portfolio/images/projects/Project2_tableau/Project2_Cover.webp',
      link: '/projects/bansal-supermarket',
      githubLink: '',
      featured: true,
      date: 'May 2024',
      categories: ['data-visualization', 'tableau'],
      component: 'BansalSupermarket'
    },
    {
      id: 'cash-flow-dashboard',
      title: 'Daily Cash Flow Dashboard',
      shortDescription: 'Retail Finance Tracker in Power BI',
      description: 'Created a multi-store Power BI dashboard to track daily cash flow and flag discrepancies across Ekam locations in real time. Improved financial visibility and reduced cash errors significantly.',
      techStack: ['Power BI', 'Finance', 'Data Visualization'],
      icon: 'Power BI',
      image: '/Sahil-Portfolio/images/projects/Project4_Power_BI/Project4_Cover.webp',
      previewImage: '/Sahil-Portfolio/images/projects/Project4_Power_BI/Project4_Cover.webp',
      additionalImages: [
        '/Sahil-Portfolio/images/projects/Project4_Power_BI/CashFlow1.webp',
        '/Sahil-Portfolio/images/projects/Project4_Power_BI/CashFlow2.webp',
      ],
      link: '/projects/cash-flow-dashboard',
      githubLink: '',
      featured: true,
      date: 'April 2024',
      categories: ['finance', 'powerbi'],
      component: 'RetailCashFlow'
    },
  ];

  // Scroll to section with offset
  const scrollToSection = (ref) => {
    if (ref.current) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">

      {/* Hero Section */}
      <section ref={homeRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-4 md:px-6">
        {/* Graph Paper Background */}
        <div 
          className="absolute inset-0 bg-white dark:bg-gray-900"
          style={{
            backgroundImage: `
              linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
            backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
            zIndex: 0,
          }}
        >
          {/* Animated grid lines */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 98%, rgba(79, 70, 229, 0.15) 100%),
                linear-gradient(transparent 98%, rgba(79, 70, 229, 0.15) 100%)
              `,
              backgroundSize: '40px 40px',
              animation: 'pan 30s linear infinite',
              zIndex: 1,
            }}
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-50 dark:opacity-10" />
        </div>

        {/* Add the animation keyframes to the document */}
        <style>
          {`
            @keyframes pan {
              0% {
                background-position: 0% 0%;
              }
              100% {
                background-position: 100% 100%;
              }
            }
          `}
        </style>

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
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I'm <span className="block">Sahil Ali</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                A Data-Driven Inventory Specialist, Warehouse Operations Pro, and AI Automation
                Enthusiast.
              </motion.p>

              <motion.p
                className="text-base sm:text-lg italic text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                "I simplify chaos, optimize systems, and use AI to make work smarter."
              </motion.p>

              {/* CTA Buttons */}
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
                  className="group relative px-8 py-3 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <span className="relative z-10">View Resume</span>
                  <FaExternalLinkAlt className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/assets/Sahil_Ali_Cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
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
                        src="/Sahil-Portfolio/images/profile/profile.webp"
                        alt="Sahil Ali - Professional Photo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/Sahil-Portfolio/images/profile-fallback.png';
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

      {/* Next Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What I Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FiPackage className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Data Analysis",
                  description: "Transforming raw data into actionable insights to drive business decisions."
                },
                {
                  icon: <FiLayers className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Business Intelligence",
                  description: "Creating dashboards and reports to visualize key metrics and trends."
                },
                {
                  icon: <FiTrendingUp className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />,
                  title: "Process Optimization",
                  description: "Identifying inefficiencies and implementing data-driven improvements."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 md:py-24 bg-white dark:bg-gray-800 px-4 md:px-6">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-pattern"></div>
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Image Section */}
              <motion.div variants={item} className="relative order-2 md:order-1">
                <div className="bg-white dark:bg-gray-700 p-2 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src={HeroImage}
                    alt="Professional Headshot"
                    className="rounded-xl w-full h-auto transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl opacity-20 blur-xl"></div>
              </motion.div>

              {/* Content Section */}
              <motion.div variants={item} className="space-y-6 order-1 md:order-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Professional Profile
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    As a{' '}
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      Certified Inventory Specialist
                    </span>{' '}
                    with extensive experience in warehouse operations, I specialize in optimizing
                    inventory management systems and streamlining supply chain processes. My
                    expertise lies in implementing efficient stock control measures and reducing
                    operational costs through data-driven strategies.
                  </p>

                  <div className="bg-indigo-50 dark:bg-gray-700/50 p-4 rounded-lg border-l-4 border-indigo-500 mt-6">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "Transforming inventory challenges into efficient, cost-effective solutions
                      through systematic controls and process optimization."
                    </p>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      Core Competencies:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-gray-700 dark:text-gray-300">
                          Inventory Management & Optimization
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-gray-700 dark:text-gray-300">
                          Warehouse Operations & Process Improvement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Inventory Specialist
                      </span>
                      <span className="px-4 py-2 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Warehouse Supervisor
                      </span>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href="/about"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300 whitespace-nowrap self-center sm:self-auto mt-4 sm:mt-0"
                    >
                      View Full Profile
                      <FiArrowRight className="ml-2" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 px-4 md:px-6">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-pattern"></div>
        {/* Decorative elements */}
        <div className="absolute -right-20 top-1/3 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute -left-20 bottom-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Journey
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Content Section - Moved to left side */}
              <motion.div variants={item} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Industry Experience
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    With a career spanning multiple sectors, I've brought operational excellence to
                    diverse environments including retail, supermarket chains, and warehouse
                    operations. My journey includes impactful roles at{' '}
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      Ekam Indian Groceries (Australia)
                    </span>
                    ,{' '}
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Bansal Supermarket
                    </span>
                    , and{' '}
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      Arzt Health
                    </span>
                    .
                  </p>

                  <div className="bg-indigo-50 dark:bg-gray-700/50 p-4 rounded-lg border-l-4 border-indigo-500 mt-6">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "From GRNs and invoice accuracy to inventory audits and AI-powered reporting
                      tools, my focus has always been on driving efficiency, reducing errors, and
                      delivering measurable business value."
                    </p>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      Key Achievements:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-gray-700 dark:text-gray-300">
                          Developed and implemented inventory management systems that reduced stock
                          discrepancies by 37%
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="ml-3 text-gray-700 dark:text-gray-300">
                          Automated reporting processes using AI tools, saving 15+ hours per week in
                          manual work
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="/experience"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300"
                  >
                    View Full Work History
                    <FiArrowRight className="ml-2" />
                  </motion.a>
                </div>
              </motion.div>
              
              {/* Image Section - Moved to right side */}
              <motion.div variants={item} className="relative">
                <div className="bg-white dark:bg-gray-700 p-2 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Warehouse and Inventory Management"
                    className="rounded-xl w-full h-auto transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                </div>
                <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl opacity-20 blur-xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {/* Projects Section - Moved all styling to the ProjectsSection component */}
      <div ref={projectsRef}>
        <ProjectsSection />
      </div>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-pattern"></div>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>  
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Ready to Start a Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision. Let's create something amazing together!
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Get In Touch
              </Link>
              <a
                href="#work"
                className="px-6 sm:px-8 py-3.5 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
              >
                View My Work
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="relative py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-pattern"></div>
        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/4 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate={controls}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <motion.div variants={item} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to
                    be part of your vision.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                        <FiMail size={20} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">Email Me</h4>
                        <a
                          href="mailto:sahilkhan36985@gmail.com"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          sahilkhan36985@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                        <FiLinkedin size={20} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">LinkedIn</h4>
                        <a
                          href="https://www.linkedin.com/in/sahil-ali-714867242/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          linkedin.com/in/sahil-ali-714867242
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                        <FiGithub size={20} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium">GitHub</h4>
                        <a
                          href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          github.com/Sahilthecoder/Sahil-Portfolio
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-3">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FiGithub size={20} />, url: 'https://github.com/Sahilthecoder/Sahil-Portfolio' },
                      {
                        icon: <FiLinkedin size={20} />,
                        url: 'https://www.linkedin.com/in/sahil-ali-714867242/',
                      },
                      { icon: <FiTwitter size={20} />, url: 'https://twitter.com/SahilTheCoder' },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
                      placeholder="sahilkhan36985@gmail.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="How can I help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white`}
                      placeholder="Hi there, I'd like to talk about..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
