import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTimes, 
  FaExternalLinkAlt, 
  FaExpand,
  FaCompress,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaPalette
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiDjango, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiGraphql, 
  SiRedux, 
  SiTailwindcss, 
  SiBootstrap, 
  SiSass, 
  SiFirebase,
  SiAmazonaws
} from 'react-icons/si';
import { FiImage } from 'react-icons/fi';

// Tech stack icons mapping with proper icons
const techIcons = {
  'React': <FaReact className="text-blue-400" />,
  'JavaScript': <SiJavascript className="text-yellow-400" />,
  'TypeScript': <SiTypescript className="text-blue-500" />,
  'Node.js': <FaNodeJs className="text-green-500" />,
  'Python': <SiPython className="text-blue-600" />,
  'Django': <SiDjango className="text-emerald-800 dark:text-emerald-600" />,
  'Express': <SiExpress className="text-gray-800 dark:text-gray-200" />,
  'MongoDB': <SiMongodb className="text-green-600" />,
  'PostgreSQL': <SiPostgresql className="text-blue-700" />,
  'GraphQL': <SiGraphql className="text-pink-600" />,
  'Redux': <SiRedux className="text-purple-500" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'Material-UI': <FaPalette className="text-blue-600" />,
  'Bootstrap': <SiBootstrap className="text-purple-600" />,
  'Sass': <SiSass className="text-pink-500" />,
  'Docker': <FaDocker className="text-blue-400" />,
  'AWS': <SiAmazonaws className="text-yellow-500" />,
  'Firebase': <SiFirebase className="text-yellow-500" />,
  'Git': <FaGitAlt className="text-orange-500" />
};

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }
};

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400,
      mass: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

const EnhancedProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  
  // Memoize the images array and current image
  const images = project?.images || [];
  const currentImage = images[selectedImageIndex] || '';
  
  // Calculate dynamic max height for the modal content
  const calculateMaxHeight = () => {
    if (typeof window === 'undefined') return '90vh';
    return `min(90vh, ${window.innerHeight - 40}px)`;
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index) => {
    if (index !== selectedImageIndex) {
      setIsImageLoaded(false);
      setSelectedImageIndex(index);
    }
  }, [selectedImageIndex]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Error attempting to enable fullscreen:', err));
    } else {
      document.exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error('Error attempting to exit fullscreen:', err));
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    switch(e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        setSelectedImageIndex(prev => (prev - 1 + images.length) % images.length);
        break;
      case 'ArrowRight':
        setSelectedImageIndex(prev => (prev + 1) % images.length);
        break;
      default:
        break;
    }
  }, [isOpen, onClose, images.length]);

  // Set up event listeners
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Handle image loading state
  useEffect(() => {
    if (!currentImage) return;
    
    setIsImageLoaded(false);
    setImageError(false);
    
    const img = new Image();
    img.src = currentImage;
    
    img.onload = () => {
      setIsImageLoaded(true);
      setImageError(false);
    };
    
    img.onerror = () => {
      setImageError(true);
      setIsImageLoaded(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentImage]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center p-0 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        style={{
          padding: 'env(safe-area-inset-top, 0) env(safe-area-inset-right, 0) env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0)'
        }}
      >
        {/* Backdrop with better touch target */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />
        
        {/* Modal Container */}
        <div className="relative w-full max-w-5xl my-2 sm:my-4 mx-auto px-2 sm:px-4">
          <motion.div
            ref={modalRef}
            className="relative bg-white dark:bg-gray-900/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl w-full flex flex-col"
            style={{
              maxHeight: calculateMaxHeight(),
              height: 'auto',
              overflowY: 'auto',
              margin: '0.5rem',
              padding: 0,
              borderRadius: '0.75rem',
              maxWidth: 'calc(100vw - 1rem)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              backgroundColor: 'white',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              WebkitOverflowScrolling: 'touch'
            }}  
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
            tabIndex="-1"
          >
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Image Gallery Section */}
              <div className="relative w-full bg-gray-100 dark:bg-gray-800" style={{
                width: '100%',
                maxWidth: '100%',
                margin: 0,
                padding: 0,
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: '16/9',
                maxHeight: '60vh',
                minHeight: '200px'
              }}>
                {/* Main Image Container */}
                <div 
                  className="relative w-full h-full flex items-center justify-center"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Loading State */}
                  {!isImageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="sr-only">Loading image...</span>
                    </div>
                  )}

                  {/* Error State */}
                  {imageError && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-4 text-center">
                      <FiImage className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 opacity-50" />
                      <p className="text-sm sm:text-base mb-3 sm:mb-4">Unable to load image</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageError(false);
                          setIsImageLoaded(false);
                        }}
                        className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Retry loading image"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Image Wrapper */}
                  <div 
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#f3f4f6',
                      overflow: 'hidden',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  >
                    <motion.img
                      src={currentImage}
                      alt={`${project.title} - Featured`}
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                      style={{
                        opacity: isImageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        filter: isHovering ? 'brightness(0.7)' : 'brightness(1)'
                      }}
                      onLoad={() => setIsImageLoaded(true)}
                      onError={() => setImageError(true)}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    
                    {/* Tech Stack Tags on Hover - Bottom Left */}
                    {isHovering && project.techStack && project.techStack.length > 0 && (
                      <motion.div 
                        className="absolute bottom-0 left-0 p-3 flex flex-wrap gap-2 z-10 max-w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, staggerChildren: 0.03 }}
                      >
                        {project.techStack.map((tech, index) => (
                          <motion.span 
                            key={index}
                            className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] xs:text-xs sm:text-sm font-medium bg-black/90 text-white rounded-full backdrop-blur-sm flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/10 hover:scale-105 transition-transform"
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 10 }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 300, 
                              damping: 20,
                              delay: index * 0.03
                            }}
                          >
                            <span className="flex-shrink-0">
                              {techIcons[tech] || null}
                            </span>
                            <span className="whitespace-nowrap">{tech}</span>
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Fullscreen Toggle */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 z-10 transition-all backdrop-blur-sm"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'View in fullscreen'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFullscreen ? (
                      <FaCompress className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <FaExpand className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </motion.button>
                </div>

                {/* Close Button - Larger touch target for mobile */}
                <motion.button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 sm:p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all z-20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
              
              {/* Project Details */}
              <div 
                className="p-4 sm:p-6 project-modal-content overflow-y-auto custom-scrollbar" 
                style={{
                  position: 'relative',
                  flex: '1 1 auto',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
                }}
              >
                <div className="space-y-4">
                  {/* Title and Live Link */}
                  <header className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h1 
                        id="project-modal-title"
                        className="text-2xl xs:text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight break-words"
                      >
                        {project.title}
                      </h1>
                      {project.link && (
                        <motion.div
                          className="inline-flex"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to={project.link}
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow hover:shadow-md transition-all duration-300 whitespace-nowrap active:scale-95"
                            onClick={(e) => {
                              // Close the modal when clicking the link
                              onClose();
                              // Prevent default to let React Router handle the navigation
                              e.stopPropagation();
                            }}
                          >
                            <FaExternalLinkAlt className="mr-1.5 sm:mr-2 flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="text-xs sm:text-sm">View Project</span>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </header>

                  {/* Description */}
                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                    <p 
                      id="project-modal-description" 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: '1.6',
                        marginTop: '0.5rem',
                        marginBottom: '1rem'
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Thumbnail Gallery */}
                  {images.length > 1 && (
                    <div className="pt-4">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Project Gallery
                        </h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                          {images.length} {images.length === 1 ? 'Image' : 'Images'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 gap-2 mt-3">
                        {images.map((img, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index 
                                ? 'border-blue-500 scale-105 z-10 ring-2 ring-blue-400' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                            aria-label={`View image ${index + 1} of ${images.length}`}
                            aria-current={selectedImageIndex === index ? 'true' : 'false'}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {selectedImageIndex === index && (
                              <div className="absolute inset-0 bg-blue-500/20"></div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>


              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default EnhancedProjectModal;
