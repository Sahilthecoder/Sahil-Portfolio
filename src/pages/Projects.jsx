import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link, useNavigate, NavLink } from 'react-router-dom';


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
  FaImage,
  FaEnvelope
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
  FiMinimize as FiMinimizeIcon
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  // Handle image load and error states
  useEffect(() => {
    if (!project) return;
    
    const img = new Image();
    const imageUrl = project.previewImage || project.image;
    
    // Skip if no image URL
    if (!imageUrl) {
      setIsImageError(true);
      return;
    }
    
    img.src = imageUrl;
    
    img.onload = () => {
      setIsImageLoaded(true);
      if (imageRef.current) {
        imageRef.current.src = img.src;
      }
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${imageUrl}`);
      setIsImageError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [project]);

  // Handle card clicks - only for the card itself, not its children
  const handleCardClick = (e) => {
    // Prevent default to avoid any unwanted behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Don't handle click if it came from a button or link
    if (e.target.closest('button, a, [role="button"]')) {
      return;
    }
    
    // Only handle click if the target is the card itself or its direct children
    if (e.target === cardRef.current || e.target.closest('.project-card')) {
      // If there's a direct link, handle it appropriately
      if (project.link) {
        // For external links, open in the same tab
        if (project.isExternal || project.link.startsWith('http') || project.link.startsWith('//')) {
          window.open(project.link, '_self');
        } else {
          // For internal links, use React Router's navigate with hash-based routing
          navigate(project.link.startsWith('/') ? project.link : `/${project.link}`);
        }
        return;
      }

      // If there's an onClick handler (for modal), call it
      if (onClick && typeof onClick === 'function') {
        onClick(project);
      }
    }
  };
  
  // Handle preview button click
  const handlePreviewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick && typeof onClick === 'function') {
      onClick(project);
    }
  };
  
  // Handle direct navigation to project link
  const handleDirectNavigation = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!link) return;
    
    // Check if this is an external link (has isExternal flag or starts with http)
    const isExternalLink = project.isExternal || link.startsWith('http') || link.startsWith('//');
    
    // For external links, open in the same tab
    const path = link.startsWith('/') ? link : `/${link}`;
    navigate(path);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // Handle Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e);
    }
  };
  
  // Add hover state for better interaction feedback
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (!project) return null;

  return (
    <div 
      className="w-full h-full"
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label={`View ${project.title} project`}
    >
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
          className={`h-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 group relative shadow-sm hover:shadow-md sm:hover:shadow-xl ${
            isHovered 
              ? 'border-indigo-400/70 dark:border-blue-400/40 shadow-lg' 
              : 'border-gray-200/80 dark:border-gray-700/50'
          }`}
          initial={false}
          animate={{
            y: isHovered ? -4 : 0,
            boxShadow: isHovered 
              ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Enhanced glow effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 dark:ring-white/5" />

          {/* Project image */}
          <div className="relative pt-[56.25%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <img
                ref={imageRef}
                src={project.previewImage || project.image}
                alt={project.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'} ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${project.previewImage || project.image}`);
                  setIsImageError(true);
                  e.target.style.display = 'none';
                }}
                onLoad={() => setIsImageLoaded(true)}
                decoding="async"
              />
              {!isImageLoaded && !isImageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
              )}
              {isImageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="text-center p-4">
                    <FaImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">Image not available</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Tech stack overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 flex items-end p-3 sm:p-4 md:p-6"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="w-full">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  {project.techStack?.slice(0, 5).map((tech, idx) => (
                    <motion.span
                      key={`${tech}-${idx}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0, 
                        y: isHovered ? 0 : 5 
                      }}
                      transition={{ 
                        delay: isHovered ? idx * 0.03 : 0,
                        duration: 0.2 
                      }}
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
            className="p-4 sm:p-5 md:p-6 bg-white dark:bg-gray-800 relative z-10 transition-colors duration-300 group-hover:bg-white/95 dark:group-hover:bg-gray-800/95"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm sm:text-base shadow-sm">
                  {techIcons[project.icon] || <BsFileEarmarkExcel className="w-4 h-4 sm:w-5 sm:h-5" />}
                </span>
                <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                  {project.title}
                </h3>
              </div>
              
              {/* Project links */}
              <div className="flex items-center space-x-1.5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transform hover:-translate-y-0.5"
                    aria-label="View on GitHub"
                  >
                    <FiGithub className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </a>
                )}
                
                {project.link && (
                  <a
                    href={project.link}
                    target={project.external ? "_blank" : "_self"}
                    rel={project.external ? "noopener noreferrer" : "noopener"}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transform hover:-translate-y-0.5"
                    aria-label="View live project"
                  >
                    <FiExternalLink className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
              {project.shortDescription}
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <motion.button
                onClick={handlePreviewClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500/50"
              >
                <span>Preview</span>
                <FiMaximize2 className="ml-1.5 w-3.5 h-3.5" />
              </motion.button>
              
              {project.link && (project.isExternal || project.link.startsWith('http') || project.link.startsWith('//') ? (
                <motion.a
                  href={project.link}
                  target="_self"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  <span>View Project</span>
                  <FiExternalLink className="ml-1.5 w-3.5 h-3.5" />
                </motion.a>
              ) : (
                <Link
                  to={project.link.startsWith('/') ? project.link : `/${project.link}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center w-full"
                  >
                    <span>View Project</span>
                    <FiExternalLink className="ml-1.5 w-3.5 h-3.5" />
                  </motion.span>
                </Link>
              ))}
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
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const modalRef = useRef(null);
  
  // Set mounted state to handle animations and initialize images
  useEffect(() => {
    if (isOpen && project) {
      setIsMounted(true);
      setIsImageLoaded(false);
      setIsImageError(false);
      
      // Initialize images array from project.images or use project.image as single image
      const projectImages = project.images 
        ? [...project.images] 
        : project.image 
          ? [project.image]
          : [];
      
      // If previewImage exists and is not included, add it
      if (project.previewImage && !projectImages.includes(project.previewImage)) {
        projectImages.unshift(project.previewImage);
      }
      
      setImages(projectImages);
      setSelectedImageIndex(0);
      setCurrentImage(projectImages[0] || '');
      
      // Focus the modal when it opens for better keyboard navigation
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }
    
    return () => {
      setIsMounted(false);
    };
  }, [isOpen, project]);
  
  // Close modal on Escape key or click outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setSelectedImageIndex(prev => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setSelectedImageIndex(prev => (prev + 1) % images.length);
      }
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, images.length]);
  
  // Update current image when selected index changes
  useEffect(() => {
    if (images.length > 0 && selectedImageIndex >= 0 && selectedImageIndex < images.length) {
      setIsImageLoaded(false);
      setIsImageError(false);
      setCurrentImage(images[selectedImageIndex]);
    }
  }, [selectedImageIndex, images]);
  
  // Handle image load and error states
  useEffect(() => {
    if (!currentImage) return;
    
    const img = new Image();
    img.src = currentImage;
    
    img.onload = () => {
      setIsImageLoaded(true);
      setIsImageError(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${currentImage}`);
      setIsImageError(true);
      setIsImageLoaded(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentImage]);
  
  // Navigation functions
  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex(prev => (prev - 1 + images.length) % images.length);
  };
  
  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    setIsFullscreen(!isFullscreen);
  };
  
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div 
            ref={modalRef}
            className="relative bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[100vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="flex-1 overflow-auto p-0">
              {/* Main Thumbnail - Full Width */}
              <div className="relative w-full overflow-hidden bg-gray-800 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[80vh] object-cover"
                />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-5 h-5" />
                </button>

                {/* Tech Stack on Image Hover */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/90 text-gray-200 border border-gray-700"
                      >
                        {techIcons[tech] && (
                          <span className="mr-1.5">{techIcons[tech]}</span>
                        )}
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Project Details */}
              <div className="max-w-4xl mx-auto px-6 py-6">
                {/* Project Title and Description */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
                  <p className="text-gray-300 text-lg leading-relaxed font-light tracking-wide">
                    {project.description}
                  </p>
                </div>

               
                {/* Gallery Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      PROJECT GALLERY
                    </h4>
                    {project.isExternal || project.link.startsWith('http') || project.link.startsWith('//') ? (
                      <a
                        href={project.link}
                        target="_self"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative flex items-center">
                          <FaExternalLinkAlt className="mr-2.5 transition-transform duration-300 group-hover:scale-110" />
                          <span className="tracking-wide">View Project</span>
                          <FiArrowRight className="ml-2 transition-all duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={project.link}
                        className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative flex items-center">
                          <FaExternalLinkAlt className="mr-2.5 transition-transform duration-300 group-hover:scale-110" />
                          <span className="tracking-wide">View Project</span>
                          <FiArrowRight className="ml-2 transition-all duration-300 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                        </span>
                      </Link>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {project.images.slice(1).map((img, index) => (
                      <div key={index} className="relative group aspect-square">
                        <div className="w-full h-full rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-blue-500 transition-colors">
                          <img
                            src={img}
                            alt={`${project.title} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            onClick={() => {
                              setSelectedImageIndex(index + 1);
                              setCurrentImage(img);
                              setIsImageLoaded(false);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transform transition-transform hover:scale-110"
                            aria-label={`View image ${index + 2}`}
                          >
                            <FiMaximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
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
    images: [
      '/Sahil-Portfolio/images/projects/Project1_excel/Project1_Cover.webp',
      '/Sahil-Portfolio/images/projects/Project1_excel/zometo-ds.webp',
      '/Sahil-Portfolio/images/projects/Project1_excel/zt1.webp',
      '/Sahil-Portfolio/images/projects/Project1_excel/zt2.webp'
    ],
    link: '/projects/zomato-analysis',
    githubLink: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/ZomatoAnalysis',
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
    images: [
      '/Sahil-Portfolio/images/projects/Project2_tableau/Project2_Cover.webp',
      '/Sahil-Portfolio/images/projects/Project2_tableau/bs3.webp',
      '/Sahil-Portfolio/images/projects/Project2_tableau/bs-top10.webp',
      '/Sahil-Portfolio/images/projects/Project2_tableau/bs-saleVSpft.webp',
      '/Sahil-Portfolio/images/projects/Project2_tableau/bs-stockTO.webp',
      '/Sahil-Portfolio/images/projects/Project2_tableau/bs2.webp'
    ],
    link: '/projects/bansal-supermarket',
    githubLink: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/BansalSupermarket',
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
    images: [
      '/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover.webp',
      '/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Attendance_before.webp',
      '/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Attendance_after.webp'
    ],
    link: '/projects/ekam-attendance',
    githubLink: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/EkamAttendance',
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
    images: [
      '/Sahil-Portfolio/images/projects/Project4_Power_BI/Project4_Cover.webp',
      '/Sahil-Portfolio/images/projects/Project4_Power_BI/CashFlow1.webp',
      '/Sahil-Portfolio/images/projects/Project4_Power_BI/CashFlow2.webp'
    ],
    link: '/projects/retail-cash-flow',
    githubLink: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/RetailCashFlow',
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
    images: [
      '/Sahil-Portfolio/images/projects/Project5_Gpt+Notion/Project5_Cover.webp'
    ],
    link: '/projects/ai-daily-decision-system',
    githubLink: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/ai-daily-decision-system',
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
    images: [
      '/Sahil-Portfolio/images/projects/Project6_Gpt+Zapier/Project6_Cover.webp'
    ],
    link: '/projects/smart-automation',
    githubLink: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/ProductSalesDashboard',
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
    image: '/Sahil-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover.webp',
    previewImage: '/Sahil-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover.webp',
    images: [
      '/Sahil-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover.webp'
    ],
    link: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    githubLink: 'https://github.com/mahiradesignhub/mahira-portfolio',
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle project selection for modal
  const handleProjectSelect = useCallback((project) => {
    if (!project) return false;
    
    console.log('Setting selected project:', project.id);
    
    // Create a deep copy of the project to avoid potential reference issues
    const projectCopy = JSON.parse(JSON.stringify(project));
    
    // Update URL with project ID
    const newUrl = `${window.location.pathname}#project-${project.id}`;
    
    // Only push state if the URL is different to avoid duplicate history entries
    if (window.location.hash !== `#project-${project.id}`) {
      window.history.pushState({ projectId: project.id }, '', newUrl);
    }
    
    setSelectedProject(projectCopy);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    document.documentElement.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
    
    return false; // Prevent any default behavior
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('Closing modal');
    
    // Only update URL if we have a project hash
    if (window.location.hash.startsWith('#project-')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    document.documentElement.style.paddingRight = '';
    
    return false;
  }, []);
  
  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      const hash = window.location.hash;
      
      // If we have a project hash in the URL
      if (hash && hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          // Only update if we're not already showing this project
          if (!selectedProject || selectedProject.id !== projectId) {
            const projectCopy = JSON.parse(JSON.stringify(project));
            setSelectedProject(projectCopy);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
          }
        } else {
          // Project not found, close modal if open
          if (isModalOpen) {
            setIsModalOpen(false);
            setSelectedProject(null);
            document.body.style.overflow = 'auto';
            document.documentElement.style.paddingRight = '';
          }
        }
      } else if (isModalOpen) {
        // No project hash but modal is open, close it
        handleCloseModal();
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen, selectedProject, projects, handleCloseModal]);
  
  // Initialize from URL on first load
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      
      const hash = window.location.hash;
      if (hash && hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          // Use setTimeout to ensure the modal opens after the component is mounted
          setTimeout(() => {
            const projectCopy = JSON.parse(JSON.stringify(project));
            setSelectedProject(projectCopy);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
          }, 100);
        }
      }
    }
  }, [projects]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <SEO
        title="Projects | Sahil Ali"
        description="Explore my portfolio of data analysis, visualization, and automation projects."
      />

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

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a
                href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaGithub className="w-5 h-5" />
                View on GitHub
              </a>
              <Link
                to="/#contact"
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaEnvelope className="w-4 h-4" />
                Contact for Work
              </Link>
            </motion.div>
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
                  className="block w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-auto">
                <select
                  className="block w-full pl-3 pr-10 py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500"
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
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
