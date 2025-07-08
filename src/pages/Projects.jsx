import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar/ModernNavbar';
import Footer from '../components/Footer';

// Icons
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowUp,
  FaSearch,
  FaFilePdf,
  FaLaptopCode,
  FaArrowRight,
  FaDatabase,
  FaChartLine,
  FaMicrosoft,
  FaTimes,
} from 'react-icons/fa';

import {
  FiArrowRight,
  FiFigma,
  FiArrowDown,
  FiTrendingUp,
  FiExternalLink,
  FiGithub,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiMaximize2,
  FiMinimize as FiMinimizeIcon,
} from 'react-icons/fi';

import {
  SiTableau,
  SiPython,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiNotion,
  SiZapier,
  SiOpenai,
  SiDocker,
  SiStreamlit,
  SiD3Dotjs,
  SiTensorflow,
  SiNextdotjs,
} from 'react-icons/si';

import { BsFileEarmarkExcel } from 'react-icons/bs';

// Components
import ProjectImage from '../components/ProjectImage';
import SEO from '../components/SEO';

// Utils
import { scrollToSection } from '../utils/scrollUtils';

// Glitch text component
const GlitchText = ({ children }) => {
  return (
    <span className="glitch" data-text={children}>
      {children}
    </span>
  );
};

// Tech stack icons mapping
const techIcons = {
  Tableau: <SiTableau />,
  'Power BI': <FaChartLine />,
  Python: <SiPython />,
  React: <SiReact />,
  JavaScript: <SiJavascript />,
  HTML5: <SiHtml5 />,
  CSS3: <SiCss3 />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  Notion: <SiNotion />,
  Zapier: <SiZapier />,
  OpenAI: <SiOpenai />,
  Figma: <FiFigma />,
  Excel: <BsFileEarmarkExcel />,
  'Data Analysis': <FaChartLine />,
  'Market Strategy': <FaChartLine />,
  'Scikit-learn': <SiPython />,
  Pandas: <SiPython />,
  XGBoost: <SiPython />,
  TensorFlow: <SiPython />,
  Prophet: <SiPython />,
  SQL: <FaDatabase />,
  PyTorch: <SiPython />,
  'Azure ML': <FaMicrosoft />,
  OpenCV: <SiPython />,
  FastAPI: <SiPython />,
  Docker: <SiDocker />,
  Streamlit: <SiStreamlit />,
  'D3.js': <SiD3Dotjs />,
  'TensorFlow.js': <SiTensorflow />,
  'Next.js': <SiNextdotjs />,
};

// Project card component
const ProjectCard = ({ project, index, onClick }) => {
  // Use React Router's useNavigate for client-side navigation
  const navigate = useNavigate();

  // Handle card clicks - only for the card itself, not its children
  const handleCardClick = (e) => {
    // Prevent default to avoid any unwanted behavior
    e.preventDefault();
    
    // Don't handle click if it came from a button or link
    if (e.target.closest('button, a, [role="button"]')) {
      return;
    }
    
    // Only handle click if the target is the card itself or its direct children
    if (e.target === e.currentTarget || e.target.closest('.project-card')) {
      // If it's an external link, open in new tab
      if (project.external) {
        window.open(project.link, '_blank', 'noopener,noreferrer');
        return;
      }

      // For internal links, use the full URL with base path
      const fullUrl = getProjectUrl(project.id);
      window.location.href = fullUrl;
    }
  };

  // Handle direct navigation for title and other interactive elements
  const handleDirectNavigation = (e, path) => {
    e.stopPropagation();
    if (!path) return;
    
    // For internal project links, use the full URL with base path
    if (path.startsWith('/projects/')) {
      const projectId = path.split('/').pop();
      window.location.href = getProjectUrl(projectId);
      return;
    }

    if (path.startsWith('http') || path.startsWith('mailto:')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      // Ensure the path is treated as relative to the base URL
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      navigate(normalizedPath);
    }
  };

  return (
    <div className="w-full h-full">
      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        scale={1.01}
        glareEnable={true}
        glareMaxOpacity={0.05}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="12px"
        className="h-full"
        transitionSpeed={800}
      >
        <motion.div
          className="h-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-400/70 dark:hover:border-blue-400/40 transition-all duration-300 group relative shadow-sm hover:shadow-md sm:hover:shadow-xl"
          whileHover={{
            y: -4,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleCardClick}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 dark:ring-white/5 opacity-100 group-hover:opacity-100 transition-opacity duration-200" />

          {/* Project image */}
          <div className="relative pt-[56.25%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${project.image}`);
                  e.target.src = project.previewImage || project.image;
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 md:p-6">
              <div className="w-full">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  {project.techStack?.slice(0, 5).map((tech, idx) => (
                    <motion.span
                      key={`${tech}-${idx}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                      className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-150 shadow-sm cursor-default"
                    >
                      <span className="text-blue-500 mr-1 sm:mr-1.5 text-xs sm:text-sm">
                        {techIcons[tech] || tech.charAt(0)}
                      </span>
                      <span className="hidden xs:inline">{tech}</span>
                      <span className="xs:hidden">{tech.split(' ')[0]}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project info */}
          <div 
            className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 relative z-10"
            onClick={handleCardClick}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                  {techIcons[project.icon] || <BsFileEarmarkExcel className="w-3 h-3 sm:w-4 sm:h-4" />}
                </span>
                <span className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-blue-400">
                  {project.category}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                {project.year}
              </span>
            </div>

            <div
              className="project-card group cursor-pointer"
              onClick={handleCardClick}
            >
              <h3
                className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-indigo-700 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2"
              >
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                {project.shortDescription}
              </p>
            </div>

            <div 
              className="pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700/50 flex flex-col xs:flex-row gap-2 sm:gap-3 relative z-20"
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  console.log('Preview button clicked', project.id);
                  if (onClick && typeof onClick === 'function') {
                    onClick(project);
                  }
                  return false;
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-label="Quick Preview"
                whileHover={{
                  scale: 1.03,
                  y: -1,
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.1)',
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 group/button"
              >
                <span>Preview</span>
              </motion.button>
              
              {project.link && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDirectNavigation(e, project.link);
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -1,
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-all duration-200 group/button"
                >
                  <span>View Details</span>
                  <span className="ml-1.5 sm:ml-2 inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 group-hover/button:bg-white/30 transition-colors duration-200">
                    <FiArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
};

  // Project modal component
const ProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state to handle animations
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
    return () => {
      setIsMounted(false);
    };
  }, [isOpen]);
  
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  if (!project || !isOpen || !isMounted) {
    return null;
  }
  
  // Initialize images array from project.images or use project.image as single image
  const images = project.images ? 
    project.images.map(img => img.startsWith('/') ? img : `/${img}`) : 
    [project.image ? (project.image.startsWith('/') ? project.image : `/${project.image}`) : ''];
  
  const currentImage = images[selectedImageIndex] || (project.image ? 
    (project.image.startsWith('/') ? project.image : `/${project.image}`) : 
    '');
    
  // Function to ensure correct image path
  const getImagePath = (imgPath) => {
    if (!imgPath) return '';
    // If it's already an absolute path, return as is
    if (imgPath.startsWith('http') || imgPath.startsWith('//') || imgPath.startsWith('data:')) {
      return imgPath;
    }
    // If it's a relative path, ensure it starts with a slash
    return imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
  };
  
  console.log('Project images:', { images, currentImage, selectedImageIndex });
  
  // Navigation functions
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6">
            <motion.div
              className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              layoutId={`project-${project.id}`}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close modal"
              >
                <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Project Image Gallery */}
              <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <img
                      src={getImagePath(currentImage)}
                      alt={`${project.title} - ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      onDoubleClick={toggleFullscreen}
                      onError={(e) => {
                        console.error('Failed to load image:', currentImage);
                        e.target.src = '/images/placeholder-project.png'; // Fallback image
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 sm:space-x-2 z-10">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(index);
                        }}
                        className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${
                          index === selectedImageIndex
                            ? 'bg-white scale-125 w-4 sm:w-6'
                            : 'bg-white/50 hover:bg-white/75 w-1.5 sm:w-2'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}


              </div>

              {/* Project Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      About {project.title}
                    </h3>
                    <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none">
                      {project.description}
                    </div>

                      {project.features && project.features.length > 0 && (
                        <div className="mt-6 sm:mt-8">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {project.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 mr-1.5 sm:mr-2" />
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  {feature}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="mt-6 sm:mt-8">
                          <h5 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-1.5">
                            Technologies Used
                          </h5>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                              >
                                {techIcons[tech] && (
                                  <span className="mr-1.5">{techIcons[tech]}</span>
                                )}
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                  <div className="pt-6">
                    <div className="flex flex-wrap gap-3">
                      {project.link && (
                        <a
                          href={getProjectUrl(project.id)}
                          target={project.external ? "_blank" : "_self"}
                          rel={project.external ? "noopener noreferrer" : undefined}
                          onClick={(e) => {
                            if (project.external) {
                              e.preventDefault();
                              window.open(project.link, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                          <FiExternalLink className="h-4 w-4 mr-2" />
                          {project.external ? 'View Live' : 'View Details'}
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
const projects = [
  {
    id: 'zomato-expansion',
    title: 'Zomato Restaurant Expansion Analysis',
    shortDescription: 'Market Strategy Dashboard in Excel',
    description:
      "Built an interactive Excel dashboard to analyze Zomato's city-wise expansion strategy across India, uncovering performance trends and market insights. Helped identify high-performing regions and new expansion opportunities.",
    techStack: ['Excel', 'Data Analysis', 'Market Strategy'],
    icon: 'Excel',
    image: '/Sahil-Portfolio/images/projects/Project1_excel/Project1_Cover.webp',
    previewImage: '/Sahil-Portfolio/images/projects/Project1_excel/Project1_Cover.webp',
    link: '/projects/zomato-expansion',
    githubLink: '',
    featured: true,
  },
  {
    id: 'bansal-supermarket',
    title: 'Bansal Supermarket Sales Analysis',
    shortDescription: 'Sales Performance Insights in Tableau',
    description:
      'Created a dynamic Tableau dashboard revealing daily/weekly sales trends, customer behavior, and category performance for better decision-making. Boosted revenue by 12% through optimized inventory and promotions.',
    techStack: ['Tableau', 'Data Analysis', 'Sales Analytics'],
    icon: 'Tableau',
    image: '/Sahil-Portfolio/images/projects/Project2_tableau/Project2_Cover.webp',
    previewImage: '/Sahil-Portfolio/images/projects/Project2_tableau/Project2_Cover.webp',
    link: '/projects/bansal-supermarket',
    githubLink: '',
    featured: true,
  },
  {
    id: 'ekam-attendance',
    title: 'Ekam Attendance Tracker',
    shortDescription: 'HR & Finance Automation with SQL + Sheets',
    description:
      'Automated attendance and payroll data reporting using SQL queries and Google Sheets for Ekam Indian Groceries, Australia. Reduced manual reporting time by 80% monthly for HR and accounts.',
    techStack: ['SQL', 'Google Sheets', 'Automation'],
    icon: 'SQL',
    image: '/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover.webp',
    previewImage: '/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover.webp',
    link: '/projects/ekam-attendance',
    githubLink: '',
    featured: true,
  },
  {
    id: 'cash-flow-dashboard',
    title: 'Daily Cash Flow Dashboard',
    shortDescription: 'Retail Finance Tracker in Power BI',
    description:
      'Created a multi-store Power BI dashboard to track daily cash flow and flag discrepancies across Ekam locations in real time. Improved financial visibility and reduced cash errors significantly.',
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
  },
  {
    id: 'ai-daily-planner',
    title: 'AI Daily Decision System',
    shortDescription: 'AI-Powered Planning with GPT + Notion',
    description:
      'Built an AI-based planner using GPT, Notion, and Google Sheets—automating journaling, routines, and task tracking. Saved 2+ hours daily by automating decisions and personal workflows.',
    techStack: ['GPT', 'Notion', 'Automation'],
    icon: 'Notion',
    image: '/Sahil-Portfolio/images/projects/Project5_Gpt+Notion/Project5_Cover.webp',
    previewImage: '/Sahil-Portfolio/images/projects/Project5_Gpt+Notion/Project5_Cover.webp',
    link: '/projects/ai-daily-planner',
    githubLink: '',
    featured: true,
  },
  {
    id: 'smart-automation',
    title: 'Smart Automation Suite',
    shortDescription: 'Business Workflow Automation with GPT + Zapier',
    description:
      'Designed AI + Zapier automations for Excel and emails—auto-generating reports, syncing data, and streamlining ops for daily business use. Saved 15+ hours/month by eliminating repetitive manual work.',
    techStack: ['Zapier', 'GPT', 'Automation'],
    icon: 'Zapier',
    image: '/Sahil-Portfolio/images/projects/Project6_Gpt+Zapier/Project6_Cover.webp',
    previewImage: '/Sahil-Portfolio/images/projects/Project6_Gpt+Zapier/Project6_Cover.webp',
    link: '/projects/smart-automation',
    githubLink: '',
    featured: true,
  },
  {
    id: 'mahira-portfolio',
    title: "Mahira's GitHub Portfolio",
    shortDescription: 'AI-Enhanced Personal Website',
    description:
      'Designed and hosted a professional AI-integrated portfolio for Mahira Chaudhry on GitHub with responsive UI and project showcases. Attracted international clients and improved creative visibility.',
    techStack: ['Web Development', 'AI Integration', 'UI/UX Design'],
    icon: 'GitHub',
    image: 'Sahil-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover.webp',
    previewImage: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover.webp',
    link: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    githubLink: '',
    featured: true,
    external: true,
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get base URL for GitHub Pages
  const baseUrl = import.meta.env.BASE_URL || '/Sahil-Portfolio/';
  
  // Function to get project URL with base path
  const getProjectUrl = (projectId) => {
    return `${baseUrl}#/projects/${projectId}`;
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter projects based on search term and active filter
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.techStack.some((tech) => tech.toLowerCase().includes(term))
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(
        (project) =>
          project.categories?.includes(activeFilter) ||
          project.techStack?.some((tech) => tech.toLowerCase() === activeFilter.toLowerCase())
      );
    }

    return result;
  }, [searchTerm, activeFilter]);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
      setShowScrollToTop(window.scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle project selection for modal
  const handleProjectSelect = useCallback((project) => {
    console.log('Setting selected project:', project?.id);
    // Create a deep copy of the project to avoid potential reference issues
    const projectCopy = JSON.parse(JSON.stringify(project));
    setSelectedProject(projectCopy);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    return false; // Prevent any default behavior
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    return false;
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Add data pattern background and animations
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
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative overflow-x-hidden">
      <SEO
        title="Projects | Sahil Ali"
        description="Explore my portfolio of data analysis, visualization, and automation projects."
      />

      <ModernNavbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden px-4 md:px-6" id="content-start">
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-6 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FiTrendingUp className="w-4 h-4" />
              <span>Portfolio Showcase</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Projects
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              A collection of my work showcasing data analysis, visualization, and automation
              projects.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search and Filter */}
          <motion.div
            className="max-w-4xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-auto">
                <select
                  className="block w-full pl-3 pr-10 py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">All Projects</option>
                  <option value="data-analysis">Data Analysis</option>
                  <option value="visualization">Visualization</option>
                  <option value="automation">Automation</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  variants={item} 
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onClick={handleProjectSelect}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredProjects.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No projects found
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50">
            <ProjectModal 
              project={selectedProject} 
              isOpen={isModalOpen}
              onClose={handleCloseModal} 
              key={selectedProject.id}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Projects;
