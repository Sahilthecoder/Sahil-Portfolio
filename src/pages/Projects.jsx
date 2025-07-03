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
import ProjectImage from '../components/ProjectImage';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection/HeroSection';
import '../components/HeroSection/HeroSection.css';

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
    <div className="w-full h-full">
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        scale={1.02}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="16px"
        className="h-full"
        transitionSpeed={1000}
      >
        <motion.div 
          className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-400/70 dark:hover:border-blue-400/40 transition-all duration-300 group relative shadow-sm hover:shadow-xl"
          whileHover={{ 
            y: -8,
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)'
          }}
          onClick={handleClick}
        >
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 ring-1 ring-inset ring-gray-100/50 dark:ring-white/5 opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Project image */}
          <div className="relative pt-[56.25%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <ProjectImage
                projectId={project.id}
                imageName={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                containerClassName="absolute inset-0 w-full h-full"
                objectFit="cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
              <div className="w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.techStack?.slice(0, 5).map((tech, idx) => (
                    <motion.span
                      key={`${tech}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-100 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200 shadow-sm cursor-default"
                    >
                      <span className="text-blue-500 mr-1.5">{techIcons[tech] || tech.charAt(0)}</span>
                      <span>{tech}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Project info */}
          <div className="p-5 sm:p-6 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {techIcons[project.icon] || <BsFileEarmarkExcel className="w-4 h-4" />}
                </span>
                <span className="text-sm font-medium text-indigo-600 dark:text-blue-400">
                  {project.category}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2.5 py-1 rounded-full">
                {project.year}
              </span>
            </div>
            
            <h3 
              className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2"
              onClick={(e) => handleDirectNavigation(e, project.id ? `/projects/${project.id}` : project.projectUrl)}
            >
              {project.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick && typeof onClick === 'function') {
                    onClick(project);
                  }
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -2,
                  boxShadow: '0 4px 16px rgba(79, 70, 229, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 group/button"
              >
                <span>View Project</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 group-hover/button:bg-blue-50 dark:group-hover/button:bg-blue-900/30 transition-colors duration-200">
                  <FiArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </div>
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
                <ProjectImage
                  projectId={project.id}
                  imageName={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                  containerClassName="w-full h-full"
                  objectFit="contain"
                  sm={{ objectFit: 'cover' }}
                  fallbackImage="placeholder.jpg"
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
                            <ProjectImage
                              projectId={project.id}
                              imageName={img}
                              alt={`${project.title} - ${index + 1}`}
                              className="w-full h-full object-contain p-2 bg-white dark:bg-gray-800 transition-transform duration-300 group-hover:scale-105"
                              containerClassName="w-full h-full"
                              objectFit="contain"
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
              <ProjectImage
                projectId={project.id}
                imageName={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[80vh] object-contain"
                containerClassName="w-full h-full"
                objectFit="contain"
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
// Project folder mapping for ProjectImage component
const projectFolders = {
  'zomato-analysis': 'Project1 excel',
  'bansal-supermarket': 'Project2 tableau',
  'ekam-attendance': 'Project3 Sql+Sheets',
  'retail-cash-flow': 'Project4 Power BI',
  'ai-planner': 'Project5 Gpt+Notion',
  'automation-suite': 'Project6 Gpt+Zapier',
  'mahira-portfolio': 'Mahira Portfolio Web+AI',
  'product-sales': 'Project7 Product Sales',
  'snape-sentiment-analysis': 'Project8 Snape Analysis'
};

// Helper function to get image path for ProjectImage component
const getProjectImage = (projectId, imagePath) => {
  if (!imagePath) return '';
  // Extract just the filename from the path
  return imagePath.split('/').pop();
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
    image: 'Project1 Cover.avif',
    previewImage: 'zometo-ds.avif',
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
      'zometo-ds.avif',
      'zt1.avif',
      'zt2.avif'
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
    image: 'Project2 Cover.avif',
    previewImage: 'Project2 Cover.avif',
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
      'bs2.avif',
      'bs3.avif',
      'bs-top10.avif'
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
    image: 'Project4 Cover.avif',
    previewImage: 'Project4 Cover.avif',
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
      'CashFlow1.avif',
      'CashFlow2.avif'
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
    image: 'Project3 Cover.avif',
    previewImage: 'Project3 Cover.avif',
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
      'Attendance_before.avif',
      'Attendance_after.avif'
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
    image: 'Project5 Cover.avif',
    previewImage: 'Project5 Cover.avif',
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
      'Project5 Cover.avif',
      'Project5 Cover.avif',
      'Project5 Cover.avif'
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
    image: 'Project7 Cover.avif',
    previewImage: 'Project7 Cover.avif',
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
      'Project7-1.avif',
      'Project7-2.avif',
      'Project7-3.avif'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <SEO 
        title="My Projects | Data Analysis & Visualization" 
        description="Explore my portfolio of data analysis, visualization, and machine learning projects showcasing my skills in turning data into insights."
        keywords="data analysis, data visualization, machine learning, portfolio, projects, data science, AI"
      />

      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-gray-200/40 dark:bg-grid-gray-800/20 [mask-image:linear-gradient(0deg,transparent,white,darkgray,transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.2),rgba(0,0,0,0.8),transparent)]"></div>
        <div className="absolute top-0 right-0 w-full sm:w-2/3 h-64 bg-gradient-to-br from-indigo-100/60 to-transparent dark:from-indigo-900/20 dark:to-transparent rounded-full filter blur-3xl -mr-40 -mt-40"></div>
        
        <HeroSection
          title={
            <>
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Projects</span>
            </>
          }
          subtitle="Data Analysis | Visualization | Machine Learning"
          description="Explore my portfolio of data analysis, visualization, and machine learning projects. Each project demonstrates my ability to extract insights from data and present them effectively."
          containerClass="pt-28 pb-16 md:pt-36 lg:pt-40 relative z-10"
          showImage={false}
        >
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search projects"
            />
          </div>
        </HeroSection>
      </div>

      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-900/30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {searchTerm ? 'Search Results' : 'Featured Projects'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            {!searchTerm && (
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A curated collection of my best work. Click on any project to learn more about the process and technologies used.
              </p>
            )}
          </motion.div>
          
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredProjects.length > 0 ? (
              <div 
                ref={projectsRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
              >
                <AnimatePresence>
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <ProjectCard
                        project={project}
                        onClick={() => handleProjectSelect(project)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-block p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                    <FaSearch className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear search
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

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
  );
};

export default Projects;
