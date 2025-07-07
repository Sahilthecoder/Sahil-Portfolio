import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowDown,
  FiChevronUp,
  FiChevronDown,
  FiPackage,
  FiLayers,
  FiTrendingUp,
  FiCpu,
  FiExternalLink,
  FiCalendar,
} from 'react-icons/fi';
import ModernNavbar from '../components/ModernNavbar/ModernNavbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// Using placeholder images from a public CDN
const HeroImage =
  'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&auto=format&fit=crop';
const Project1 =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop';
const Project2 =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop';
const Project3 =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop';

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
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
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
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(project.link);
                }}
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
      image: '/images/projects/Project1 excel/Project1 Cover.avif',
      previewImage: '/images/projects/Project1 excel/Project1 Cover.avif',
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
      image: '/images/projects/Project2 tableau/Project2 Cover.avif',
      previewImage: '/images/projects/Project2 tableau/Project2 Cover.avif',
      link: '/projects/bansal-supermarket',
      githubLink: '',
      featured: true,
      date: 'May 2024',
      categories: ['data-visualization', 'tableau'],
      component: 'BansalSupermarket'
    },
    {
      id: 'ekam-attendance',
      title: 'Ekam Attendance Tracker',
      shortDescription: 'HR & Finance Automation with SQL + Sheets',
      description: 'Developed an automated attendance tracking system using SQL and Google Sheets that streamlined HR processes and reduced manual work by 80%. Integrated with existing payroll systems for seamless operations.',
      techStack: ['SQL', 'Google Sheets', 'Automation'],
      icon: 'SQL',
      image: '/images/projects/Project3 Sql+Sheets/Project3 Cover.avif',
      previewImage: '/images/projects/Project3 Sql+Sheets/Project3 Cover.avif',
      link: '/projects/ekam-attendance',
      githubLink: '',
      featured: true,
      date: 'April 2024',
      categories: ['automation', 'sql'],
      component: 'EkamAttendance'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative">
      {/* Scroll Down Button (Only in Hero Section) */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center group"
          aria-label="Scroll down to next section"
        >
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            Scroll Down
          </span>
          <div className="w-8 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center items-start p-1 group-hover:border-indigo-500 transition-colors">
            <motion.div
              className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
          </div>
        </button>
      </motion.div>
      <ModernNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
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
        <style jsx global>{`
          @keyframes pan {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 100% 100%;
            }
          }
        `}</style>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* Role Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FiTrendingUp className="w-4 h-4" />
              <span>Data Analyst & Business Intelligence</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Sahil Ali
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Transforming complex data into actionable insights and building intelligent solutions
              that drive operational excellence and business growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a
                href="#contact"
                className="group relative px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:shadow-indigo-500/20 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>

              <div className="relative group w-full sm:w-auto">
                <button className="px-6 sm:px-8 py-3 bg-white dark:bg-gray-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group-hover:bg-indigo-50 dark:group-hover:bg-gray-700/50 w-full">
                  <span className="relative z-10">View Resume</span>
                  <FiChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
                <div className="absolute right-0 mt-2 w-full sm:w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <div className="py-1">
                    <a
                      href="/assets/Sahil_Ali_Cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group-hover/item:translate-x-1"
                    >
                      <FiExternalLink className="mr-3 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-300 transition-colors" />
                      <span>View in New Tab</span>
                    </a>
                    <a
                      href="/assets/Sahil_Ali_Cv.pdf"
                      download="Sahil_Ali_Resume.pdf"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group-hover/item:translate-x-1"
                    >
                      <FiDownload className="mr-3 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-300 transition-colors" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[
                {
                  icon: <FiGithub className="w-5 h-5" />,
                  href: 'https://github.com/yourusername',
                  label: 'GitHub',
                },
                {
                  icon: <FiLinkedin className="w-5 h-5" />,
                  href: 'https://linkedin.com/in/yourusername',
                  label: 'LinkedIn',
                },
                {
                  icon: <FiTwitter className="w-5 h-5" />,
                  href: 'https://twitter.com/yourusername',
                  label: 'Twitter',
                },
                {
                  icon: <FiMail className="w-5 h-5" />,
                  href: 'mailto:your.email@example.com',
                  label: 'Email',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center group"
            aria-label="Scroll down to next section"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              Explore More
            </span>
            <div className="w-10 h-14 rounded-full border-2 border-gray-200 dark:border-gray-700 flex justify-center p-1 group-hover:border-indigo-500 transition-colors">
              <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-cyan-400 rounded-full animate-bounce"></div>
            </div>
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative py-16 sm:py-20 bg-white dark:bg-gray-900">
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

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="/about"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors duration-300"
                  >
                    View Full Profile
                    <FiArrowRight className="ml-2" />
                  </motion.a>
                  <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                    <span className="px-4 py-2 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
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
                        className="w-4 h-4 mr-2"
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
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="relative py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
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
              {/* Image Section */}
              <motion.div variants={item} className="relative order-2 md:order-1">
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

              {/* Content Section */}
              <motion.div variants={item} className="space-y-6 order-1 md:order-2">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="relative py-16 sm:py-20 bg-white dark:bg-gray-900">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-pattern"></div>
        {/* Decorative elements */}
        <div className="absolute left-1/4 -top-20 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute right-1/4 -bottom-20 w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-4">
              My Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my expertise in data analysis, visualization, and automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x500?text=Project+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium bg-indigo-100/90 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-200 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex space-x-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Live Demo"
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View Code"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiCalendar className="mr-1.5 h-4 w-4" />
                      {project.date || 'Recent'}
                    </span>
                    <button
                      onClick={() => window.open(project.liveLink || project.githubLink, '_blank')}
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors group"
                    >
                      View Project
                      <FiArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

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
                          href="mailto:your.email@example.com"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          your.email@example.com
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
                          href="https://linkedin.com/in/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          linkedin.com/in/yourprofile
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
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          github.com/yourusername
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-3">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FiGithub size={20} />, url: 'https://github.com/yourusername' },
                      {
                        icon: <FiLinkedin size={20} />,
                        url: 'https://linkedin.com/in/yourprofile',
                      },
                      { icon: <FiTwitter size={20} />, url: 'https://twitter.com/yourhandle' },
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
                      placeholder="you@example.com"
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

      <Footer />
    </div>
  );
};

export default Home;
