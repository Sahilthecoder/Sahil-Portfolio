import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowUp, FaSearch, FaFilePdf, FaLaptopCode, FaArrowRight, FaDatabase, FaChartLine } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { SiTableau, SiPython, SiReact, SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub, SiNotion, SiZapier, SiOpenai, SiDocker, SiStreamlit, SiD3Dotjs, SiTensorflow, SiNextdotjs } from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';
import { FiFigma } from 'react-icons/fi';
import { BsFileEarmarkExcel } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

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
  'Tableau': <SiTableau />,
  'Power BI': <FaChartLine />,
  'Python': <SiPython />,
  'React': <SiReact />,
  'JavaScript': <SiJavascript />,
  'HTML5': <SiHtml5 />,
  'CSS3': <SiCss3 />,
  'Git': <SiGit />,
  'GitHub': <SiGithub />,
  'Notion': <SiNotion />,
  'Zapier': <SiZapier />,
  'OpenAI': <SiOpenai />,
  'Figma': <FiFigma />,
  'Excel': <BsFileEarmarkExcel />,
  'Data Analysis': <FaChartLine />,
  'Market Strategy': <FaChartLine />,
  'Scikit-learn': <SiPython />,
  'Pandas': <SiPython />,
  'XGBoost': <SiPython />,
  'TensorFlow': <SiPython />,
  'Prophet': <SiPython />,
  'SQL': <FaDatabase />,
  'PyTorch': <SiPython />,
  'Azure ML': <FaMicrosoft />,
  'OpenCV': <SiPython />,
  'FastAPI': <SiPython />,
  'Docker': <SiDocker />,
  'Streamlit': <SiStreamlit />,
  'D3.js': <SiD3Dotjs />,
  'TensorFlow.js': <SiTensorflow />,
  'Next.js': <SiNextdotjs />
};

// Project card component
const ProjectCard = ({ project, index, onClick }) => {
  // Use React Router's useNavigate for client-side navigation
  const navigate = useNavigate();
  
  // Handle click to show project preview
  const handleClick = (e) => {
    // Prevent default action and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Only proceed if the click is not on a link or button
    if (!e.target.closest('a, button, h3')) {
      // Call the onClick handler from parent to show the modal
      if (onClick && typeof onClick === 'function') {
        onClick(project);
      }
    }
  };
  
  // Handle direct navigation for title and other interactive elements
  const handleDirectNavigation = (e, path) => {
    e.stopPropagation();
    if (!path) return;
    
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="w-full h-full"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="12px"
        className="h-full"
      >
        <motion.div 
          className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/10 hover:border-indigo-400/70 dark:hover:border-blue-400/50 transition-all duration-300 group relative shadow-sm hover:shadow-lg cursor-pointer"
          whileHover={{ 
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 15px 20px -8px rgba(0, 0, 0, 0.08)',
            y: -5,
            scale: 1.01,
            backgroundColor: 'rgba(255, 255, 255, 0.98)'
          }}
          onClick={handleClick}
        >
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 dark:ring-white/5 opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Project image */}
          <div className="relative pt-[56.25%] sm:pt-[60%] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width="100%"
              height="auto"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
              <div className="w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.techStack?.slice(0, 4).map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-white/90 dark:bg-black/70 text-gray-800 dark:text-gray-100 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 shadow-sm cursor-default"
                    >
                      {techIcons[tech] || tech}
                      <span className="ml-1.5">{tech}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Project info */}
          <div 
            className="p-4 sm:p-6 bg-white dark:bg-gray-800 cursor-pointer"
            onClick={handleClick}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {techIcons[project.icon] || <BsFileEarmarkExcel className="text-emerald-600 dark:text-emerald-400" />}
                <span className="text-sm font-medium text-indigo-600 dark:text-blue-400">
                  {project.category}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">{project.year}</span>
            </div>
            
            <h3 
              className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-indigo-700 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
              onClick={(e) => handleDirectNavigation(e, project.id ? `/projects/${project.id}` : project.projectUrl)}
            >
              <GlitchText>{project.title}</GlitchText>
            </h3>
            
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
            
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 relative z-10">
              <div className="flex justify-end">
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onClick && typeof onClick === 'function') {
                        onClick(project);
                      }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-lg border border-gray-600/30 shadow-md transition-all duration-200 flex items-center group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center">
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </span>
                  </motion.button>
                  
                  {project.path && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(project.path);
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        boxShadow: '0 4px 16px rgba(79, 70, 229, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg border border-indigo-500/30 shadow-md transition-all duration-200 flex items-center group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center">
                        <FiArrowRight className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:translate-x-0.5" />
                        View Project
                      </span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

// Project modal component
const ProjectModal = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen p-2 sm:p-4 text-center">
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <motion.div
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-full max-w-full sm:max-w-4xl sm:my-8 sm:align-middle"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="relative flex-shrink-0">
            {/* Close button in top right */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:scale-110"
                aria-label="Close"
              >
                <FaTimes className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            
            {/* View Project button in bottom right */}
            {project.path && (
              <div className="absolute bottom-6 right-6 z-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur-sm opacity-0 group-hover:opacity-75 transition duration-300 group-hover:duration-200"></div>
                  <Link
                    to={project.path}
                    className="relative flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-medium rounded-lg leading-none overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl border border-indigo-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="mr-3">View Project</span>
                      <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
              </div>
            )}
            
            <div className="h-[180px] sm:h-[20rem] md:h-[28rem] w-full bg-gray-100 dark:bg-gray-900 relative overflow-hidden group">
              <div className="w-full h-full flex items-center justify-center p-0">
                <img
                  src={project.image || '/project-placeholder.jpg'}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Tech stack overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="w-full">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techStack?.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-white/90 dark:bg-black/70 text-gray-800 dark:text-gray-100 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 shadow-sm select-none"
                      >
                        <span className="text-xs sm:text-sm">{techIcons[tech] || techIcons['Data Analysis']}</span>
                        <span className="ml-1 sm:ml-1.5">{tech}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 custom-scrollbar">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:space-x-6 space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <Link
                    to={project.path}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="group inline-block"
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 inline-flex items-center">
                      {project.title}
                      <FiArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </h2>
                  </Link>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                    {project.description}
                  </p>
                  
                  {/* Gallery Section */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-4 sm:mt-6">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">Project Gallery</h3>
                      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {project.gallery.map((img, index) => (
                          <motion.div 
                            key={index} 
                            className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 aspect-square cursor-pointer touch-pan-y"
                            onClick={() => openImage(img)}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <img
                              src={img}
                              alt={`${project.title} - ${index + 1}`}
                              className="w-full h-full object-contain p-2 bg-white dark:bg-gray-800 transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              width="100%"
                              height="100%"
                            />
                            <div className="absolute inset-0 bg-black/20 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-1 sm:space-y-2">
                              <FaExternalLinkAlt className="text-white text-lg sm:text-xl" />
                              <span className="text-white text-xs sm:text-sm font-medium text-center px-1">View Full Size</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 md:mt-0 flex space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FaExternalLinkAlt className="mr-2 h-3 w-3" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

{project.features && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button 
                onClick={closeImage}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <FaTimes className="h-6 w-6" />
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="mt-2 text-center text-white text-sm opacity-75">
                Click anywhere to close
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Single project data
// Helper function to prepend base URL to image paths
const withBaseUrl = (path) => {
  // If path is an array, process each item
  if (Array.isArray(path)) {
    return path.map(p => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`);
  }
  // If path is a string, process it directly
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};

const projects = [
  {
    id: 'zomato-analysis',
    title: 'AI-Powered Market Expansion Analytics',
    shortDescription: 'ML-driven market analysis platform predicting optimal city expansion with 92% accuracy',
    description: 'Developed a sophisticated machine learning model that analyzes 50+ demographic, economic, and competitive factors to predict city viability for Zomato expansion. The AI system processes real-time market data, customer behavior patterns, and competitive landscapes to generate actionable expansion recommendations, reducing market entry risks by 40%.',
    icon: 'Python',
    tags: ['Machine Learning', 'Predictive Analytics', 'Market Intelligence', 'AI Modeling'],
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'Tableau'],
    path: '/projects/zomato-analysis',
    image: withBaseUrl('/images/projects/Project1 excel/Project1 Cover.avif'),
    previewImage: withBaseUrl('/images/projects/Project1 excel/zometo-ds.avif'),
    category: 'Data Analytics',
    impact: 'Identified key growth opportunities and optimized expansion strategy',
    featured: true,
    role: 'Data Analyst',
    year: '2024',
    github: '#',
    liveDemo: 'https://sahilthecoder.github.io/projects/#/projects/zomato-analysis',
    caseStudy: '#',
    projectUrl: 'https://sahilthecoder.github.io/projects/#/projects/zomato-analysis',
    gallery: [
      withBaseUrl('/images/projects/Project1 excel/zometo-ds.avif'),
      withBaseUrl('/images/projects/Project1 excel/zt1.avif'),
      withBaseUrl('/images/projects/Project1 excel/zt2.avif')
    ]
  },
  {
    id: 'bansal-supermarket',
    title: 'AI-Powered Retail Intelligence Platform',
    shortDescription: 'ML-driven inventory optimization and sales forecasting system reducing stockouts by 35%',
    description: 'Engineered an end-to-end retail intelligence solution that leverages machine learning to predict demand, optimize inventory levels, and automate replenishment. The system processes millions of data points to deliver 94% forecast accuracy, reducing carrying costs by 28% while maintaining 99% service levels. Integrated with existing ERP systems to provide real-time, actionable insights for store managers.',
    icon: 'Python',
    tags: ['Machine Learning', 'Inventory Optimization', 'Time Series Forecasting', 'Retail AI'],
    techStack: ['Python', 'TensorFlow', 'Prophet', 'Tableau', 'SQL'],
    path: '/projects/bansal-supermarket',
    image: withBaseUrl('/images/projects/Project2 tableau/Project2 Cover.avif'),
    previewImage: withBaseUrl('/images/projects/Project2 tableau/Project2 Cover.avif'),
    category: 'Data Visualization',
    impact: 'Drove 12% revenue growth through data-informed decisions',
    featured: true,
    role: 'BI Developer',
    year: '2023',
    github: '#',
    liveDemo: 'https://sahilthecoder.github.io/projects/#/projects/bansal-supermarket',
    caseStudy: '#',
    projectUrl: 'https://sahilthecoder.github.io/projects/#/projects/bansal-supermarket',
    gallery: [
      withBaseUrl('/images/projects/Project2 tableau/bs2.avif'),
      withBaseUrl('/images/projects/Project2 tableau/bs3.avif'),
      withBaseUrl('/images/projects/Project2 tableau/bs-top10.avif')
    ]
  },
  {
    id: 'retail-cash-flow',
    title: 'AI-Powered Financial Intelligence System',
    shortDescription: 'Real-time cash flow forecasting and anomaly detection with 96% accuracy',
    description: 'Designed and implemented an AI-driven financial intelligence platform that processes transactional data from 50+ retail locations to predict cash flow trends and detect anomalies in real-time. The system employs advanced machine learning algorithms to identify potential financial risks 14 days in advance, reducing financial discrepancies by 80%. Features include automated alerts, predictive analytics, and scenario modeling for strategic financial planning.',
    icon: 'Python',
    tags: ['AI Forecasting', 'Financial Analytics', 'Anomaly Detection', 'Risk Management'],
    techStack: ['Python', 'PyTorch', 'Power BI', 'Azure ML', 'SQL'],
    path: '/projects/retail-cash-flow',
    image: withBaseUrl('/images/projects/Project4 Power BI/Project4 Cover.avif'),
    previewImage: withBaseUrl('/images/projects/Project4 Power BI/Project4 Cover.avif'),
    category: 'Business Intelligence',
    impact: 'Reduced financial discrepancies by 80% through real-time monitoring and automated alerts',
    featured: true,
    role: 'Data Analyst',
    year: '2023',
    github: '#',
    liveDemo: 'https://sahilthecoder.github.io/projects/#/projects/retail-cash-flow',
    caseStudy: '#',
    projectUrl: 'https://sahilthecoder.github.io/projects/#/projects/retail-cash-flow',
    gallery: [
      withBaseUrl('/images/projects/Project4 Power BI/CashFlow1.avif'),
      withBaseUrl('/images/projects/Project4 Power BI/CashFlow2.avif')
    ]
  },
  {
    id: 'ekam-attendance',
    title: 'AI-Driven Workforce Intelligence Platform',
    shortDescription: 'Computer vision and ML system reducing payroll processing time by 70%',
    description: 'Architected an advanced workforce management system that combines computer vision for attendance tracking with machine learning for workforce optimization. The platform processes facial recognition data, analyzes work patterns, and predicts staffing needs with 92% accuracy. Automated payroll processing and compliance reporting reduced administrative workload by 65% while improving accuracy to 99.9%. The system also provides real-time analytics on workforce productivity and engagement.',
    icon: 'Python',
    tags: ['Computer Vision', 'ML Automation', 'HR Analytics', 'Process Optimization'],
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'FastAPI', 'React'],
    path: '/projects/ekam-attendance',
    image: withBaseUrl('/images/projects/Project3 Sql+Sheets/Project3 Cover.avif'),
    previewImage: withBaseUrl('/images/projects/Project3 Sql+Sheets/Project3 Cover.avif'),
    category: 'Data Automation',
    impact: 'Reduced payroll processing time by 70% and improved compliance with labor regulations',
    featured: true,
    role: 'Data Analyst',
    year: '2024',
    github: '#',
    liveDemo: 'https://sahilthecoder.github.io/projects/#/projects/ekam-attendance',
    caseStudy: '#',
    projectUrl: 'https://sahilthecoder.github.io/projects/#/projects/ekam-attendance',
    gallery: [
      withBaseUrl('/images/projects/Project3 Sql+Sheets/Attendance_before.avif'),
      withBaseUrl('/images/projects/Project3 Sql+Sheets/Attendance_after.avif')
    ]
  },
  {
    id: 'product-sales-dashboard',
    title: 'AI-Powered Sales Forecasting Engine',
    shortDescription: 'Deep learning model achieving 94% accuracy in sales predictions',
    description: 'Developed a state-of-the-art sales forecasting engine using deep learning to analyze historical sales data, market trends, and external factors. The system processes 5+ million daily transactions across multiple sales channels, providing 4-week demand forecasts with 94% accuracy. Integrated with inventory management to automate reorder points and optimize stock levels, resulting in a 28% reduction in carrying costs and 35% fewer stockouts. Features include anomaly detection, automated reporting, and scenario planning.',
    icon: 'Python',
    tags: ['Deep Learning', 'Time Series', 'Inventory AI', 'Predictive Analytics'],
    techStack: ['Python', 'TensorFlow', 'Prophet', 'Streamlit', 'Docker'],
    path: '/projects/product-sales',
    image: withBaseUrl('/images/projects/Project5 Gpt+Notion/Project5 Cover.avif'),
    previewImage: withBaseUrl('/images/projects/Project5 Gpt+Notion/Project5 Cover.avif'),
    category: 'Data Analytics',
    impact: 'Improved decision-making with real-time insights and predictive analytics',
    featured: true,
    role: 'Data Engineer',
    year: '2023',
    github: '#',
    liveDemo: 'https://sahilthecoder.github.io/projects/#/projects/product-sales',
    caseStudy: '#',
    projectUrl: 'https://sahilthecoder.github.io/projects/#/projects/product-sales',
    gallery: [
      withBaseUrl('/images/projects/Project5 Gpt+Notion/Project5 Cover.avif'),
      withBaseUrl('/images/projects/Project5 Gpt+Notion/Project5 Cover.avif'),
      withBaseUrl('/images/projects/Project5 Gpt+Notion/Project5 Cover.avif')
    ]
  },
  {
    id: 'mahira-portfolio',
    title: 'AI-Powered Data Science Portfolio',
    shortDescription: 'Interactive showcase of AI/ML projects and data analytics expertise',
    description: 'A technically sophisticated portfolio platform that demonstrates expertise in AI, machine learning, and data analytics. Built with modern web technologies and enhanced with AI-powered features including natural language processing for project search, interactive data visualizations, and automated content optimization. The portfolio highlights complex data science projects with detailed case studies, code samples, and interactive demos that showcase the full data analysis pipeline from problem definition to model deployment.',
    icon: 'AI',
    tags: ['AI/ML Showcase', 'Data Visualization', 'Interactive Demos', 'Technical Portfolio'],
    techStack: ['React', 'D3.js', 'Python', 'TensorFlow.js', 'Next.js'],
    path: '/projects/mahira-portfolio',
    image: withBaseUrl('/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif'),
    previewImage: withBaseUrl('/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif'),
    category: 'Web Development',
    impact: 'Enhanced professional visibility and client acquisition through an engaging digital presence',
    featured: true,
    role: 'Full-stack Developer',
    year: '2024',
    github: '#',
    liveDemo: 'https://sahilthecoder.github.io/projects/#/projects/mahira-portfolio',
    caseStudy: '#',
    projectUrl: 'https://sahilthecoder.github.io/projects/#/projects/mahira-portfolio',
    gallery: [
      withBaseUrl('/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif'),
      withBaseUrl('/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif'),
      withBaseUrl('/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif')
    ]
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showScroll, setShowScroll] = useState(false);
  const projectsRef = useRef(null);
  
  // Handle project selection for preview
  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);
  
  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    // Small delay to allow the modal close animation to complete
    setTimeout(() => setSelectedProject(null), 300);
  }, []);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);
  
  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) return projects;
    const term = searchTerm.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.techStack.some(tech => tech.toLowerCase().includes(term))
    );
  }, [searchTerm]);
  
  // Download CV function
  const handleDownloadCV = () => {
    const cvUrl = `${import.meta.env.BASE_URL}Sahil_Resume.pdf`;
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Sahil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open project modal (alias for handleProjectSelect for backward compatibility)
  const openModal = useCallback((project) => {
    handleProjectSelect(project);
  }, [handleProjectSelect]);
  
  // Scroll to top function
  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* SEO */}
      <SEO 
        title="My Projects | Data Analysis & Visualization" 
        description="Explore my portfolio of data analysis and visualization projects. See how I turn complex data into actionable insights."
      />
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '24px 24px',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.8) 50%,rgba(0,0,0,0.2) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.8) 50%,rgba(0,0,0,0.2) 100%)'
      }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 pointer-events-none"></div>

      <div className="relative z-10">
        {/* CV Download Button */}
        <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50">
          <button
            onClick={handleDownloadCV}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors duration-300 group"
            aria-label="Download CV"
            title="Download CV"
          >
            <FaFilePdf className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Main Content */}
        <main className="w-full">
          {/* Hero Section - Compact Height */}
          <section className="relative w-full py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Grid background - Full width */}
            <div className="absolute inset-0 w-full h-full bg-grid-gray-200/40 dark:bg-grid-gray-800/40 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
            
            {/* Animated background elements - Full width */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob"></div>
              <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            
            {/* Content container */}
            <div className="container mx-auto px-6 relative z-10">
              <motion.div 
                className="flex flex-col lg:flex-row items-start gap-12 py-12 md:py-20"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {/* Left Content */}
                <div className="w-full lg:w-1/2">
                  <motion.div 
                    className="w-full max-w-4xl mx-auto"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                      My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Projects</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-6 sm:mb-8">
                      Explore my portfolio of data analysis and visualization projects that bring data to life
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
                    }}
                  >
                    <a
                      href="#featured-projects"
                      className="group relative bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-3 px-6 rounded-lg text-center shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Explore Projects</span>
                        <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                    </a>
                    <a
                      href="#contact"
                      className="group relative bg-transparent hover:bg-gray-100 text-indigo-700 font-medium py-3 px-6 rounded-lg text-center border-2 border-indigo-700 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-indigo-600 dark:text-white dark:hover:bg-gray-700/50"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="transition-transform duration-300 group-hover:translate-x-1">Get In Touch</span>
                        <FiArrowRight className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100" />
                      </span>
                      <span className="absolute inset-0 bg-indigo-50/80 dark:bg-indigo-900/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                    </a>
                  </motion.div>
                </div>
                
                {/* Right Side - Search Bar with Image */}
                <motion.div 
                  className="w-full lg:w-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700/50"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } }
                  }}
                >
                  {/* Search Bar */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-9 pr-4 sm:pl-12 sm:pr-5 py-3 sm:py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 text-sm sm:text-base"
                      aria-label="Search projects by technologies, role, or keywords"
                    />
                    {searchTerm && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <button
                          onClick={() => setSearchTerm('')}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                          aria-label="Clear search"
                        >
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Filter Chips */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {['SQL', 'Tableau', 'Power BI', 'Python', 'Automation'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchTerm(term.toLowerCase())}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 flex items-center ${
                          searchTerm.toLowerCase() === term.toLowerCase() 
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500'
                            : 'bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600/90 shadow-sm hover:shadow-md border border-gray-200/80 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        {term}
                        {searchTerm.toLowerCase() === term.toLowerCase() && (
                          <FaTimes className="ml-1.5 h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {searchTerm && (
                    <motion.p 
                      className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {filteredProjects.length > 0 
                        ? `Found ${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'}`
                        : 'No projects match your search. Try different keywords.'}
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Projects Section */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {searchTerm ? 'Search Results' : 'Featured Projects'}
            </motion.h2>
            
            {/* Projects Grid */}
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {filteredProjects.length > 0 ? (
                <div 
                  ref={projectsRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onClick={() => handleProjectSelect(project)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-block p-8 bg-white/70 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg">
                    <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Scroll to top button */}
          <AnimatePresence>
            {showScroll && (
              <motion.button
                onClick={scrollTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 z-50 p-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Scroll to top"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <FaArrowUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Project Modal */}
          <AnimatePresence>
            {isModalOpen && selectedProject && (
              <ProjectModal 
                project={selectedProject} 
                onClose={closeModal} 
              />
            )}
          </AnimatePresence>
        </main>
        
        {/* Resume Download Section */}
        <div className="mt-24 py-16 bg-gradient-to-r from-indigo-700 to-blue-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Looking for more details?
            </motion.h2>
            <motion.p 
              className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Check out my resume for a comprehensive overview of my experience, skills, and achievements.
            </motion.p>
            <motion.a
              href="/Sahil_Resume.pdf"
              download="Sahil_Resume.pdf"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaFilePdf className="mr-2 -ml-1 h-5 w-5" />
              Download My Resume
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
