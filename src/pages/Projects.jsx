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
  FaTimes, 
  FaArrowUp, 
  FaSearch, 
  FaFilePdf, 
  FaLaptopCode, 
  FaArrowRight, 
  FaDatabase, 
  FaChartLine,
  FaMicrosoft 
} from 'react-icons/fa';

import { 
  FiArrowRight,
  FiFigma,
  FiArrowDown,
  FiTrendingUp
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
  SiNextdotjs 
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
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${project.image}`);
                  e.target.src = project.previewImage || project.image;
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onLoad={(e) => {
                    console.log(`✅ Successfully loaded image: ${e.target.src}`);
                  }}
                  onError={(e) => {
                    const imgSrc = e.target.src;
                    console.error(`❌ Failed to load image:`, {
                      projectId: project.id,
                      imagePath: project.image,
                      resolvedPath: imgSrc,
                      error: 'Image load failed'
                    });
                    
                    // Try to load a placeholder if available
                    const placeholderPath = project.previewImage || project.image;
                    if (placeholderPath && placeholderPath !== imgSrc) {
                      console.log(`🔄 Attempting to load placeholder: ${placeholderPath}`);
                      e.target.src = placeholderPath;
                    } else {
                      // Fallback to a solid color if no placeholder
                      e.target.style.backgroundColor = '#f0f0f0';
                      e.target.style.display = 'flex';
                      e.target.style.alignItems = 'center';
                      e.target.style.justifyContent = 'center';
                      e.target.innerHTML = '<span class="text-gray-500">Image not found</span>';
                    }
                  }}
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
                              onLoad={(e) => {
                                console.log(`✅ Successfully loaded gallery image: ${e.target.src}`);
                              }}
                              onError={(e) => {
                                const imgSrc = e.target.src;
                                console.error(`❌ Failed to load gallery image:`, {
                                  projectId: project.id,
                                  imagePath: img,
                                  resolvedPath: imgSrc,
                                  error: 'Gallery image load failed'
                                });
                                
                                // Try to load a placeholder if available
                                const placeholderPath = project.previewImage || project.image;
                                if (placeholderPath && placeholderPath !== imgSrc) {
                                  console.log(`🔄 Attempting to load placeholder: ${placeholderPath}`);
                                  e.target.src = placeholderPath;
                                } else {
                                  // Fallback to a solid color if no placeholder
                                  e.target.style.backgroundColor = '#f0f0f0';
                                  e.target.style.display = 'flex';
                                  e.target.style.alignItems = 'center';
                                  e.target.style.justifyContent = 'center';
                                  e.target.innerHTML = '<span class="text-xs text-gray-500">Image not found</span>';
                                }
                              }}
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

const projects = [
  {
    id: 'zomato-expansion',
    title: 'Zomato Restaurant Expansion Analysis',
    shortDescription: 'Market Strategy Dashboard in Excel',
    description: 'Built an interactive Excel dashboard to analyze Zomato\'s city-wise expansion strategy across India, uncovering performance trends and market insights. Helped identify high-performing regions and new expansion opportunities.',
    techStack: ['Excel', 'Data Analysis', 'Market Strategy'],
    icon: 'Excel',
    image: '/images/projects/Project1 excel/Project1 Cover.avif',
    previewImage: '/images/projects/Project1 excel/Project1 Cover.avif',
    link: 'project1.html',
    githubLink: '',
    featured: true
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
    link: 'project2.html',
    githubLink: '',
    featured: true
  },
  {
    id: 'ekam-attendance',
    title: 'Ekam Attendance Tracker',
    shortDescription: 'HR & Finance Automation with SQL + Sheets',
    description: 'Automated attendance and payroll data reporting using SQL queries and Google Sheets for Ekam Indian Groceries, Australia. Reduced manual reporting time by 80% monthly for HR and accounts.',
    techStack: ['SQL', 'Google Sheets', 'Automation'],
    icon: 'SQL',
    image: '/images/projects/Project3 Sql+Sheets/Project3 Cover.avif',
    previewImage: '/images/projects/Project3 Sql+Sheets/Project3 Cover.avif',
    link: 'project3.html',
    githubLink: '',
    featured: true
  },
  {
    id: 'cash-flow-dashboard',
    title: 'Daily Cash Flow Dashboard',
    shortDescription: 'Retail Finance Tracker in Power BI',
    description: 'Created a multi-store Power BI dashboard to track daily cash flow and flag discrepancies across Ekam locations in real time. Improved financial visibility and reduced cash errors significantly.',
    techStack: ['Power BI', 'Finance', 'Data Visualization'],
    icon: 'Power BI',
    image: '/images/projects/Project4 Power BI/Project4 Cover.avif',
    previewImage: '/images/projects/Project4 Power BI/Project4 Cover.avif',
    additionalImages: [
      '/images/projects/Project4 Power BI/CashFlow1.avif',
      '/images/projects/Project4 Power BI/CashFlow2.avif'
    ],
    link: 'project4.html',
    githubLink: '',
    featured: true
  },
  {
    id: 'ai-daily-planner',
    title: 'AI Daily Decision System',
    shortDescription: 'AI-Powered Planning with GPT + Notion',
    description: 'Built an AI-based planner using GPT, Notion, and Google Sheets—automating journaling, routines, and task tracking. Saved 2+ hours daily by automating decisions and personal workflows.',
    techStack: ['GPT', 'Notion', 'Automation'],
    icon: 'Notion',
    image: '/images/projects/Project5 Gpt+Notion/Project5 Cover.avif',
    previewImage: '/images/projects/Project5 Gpt+Notion/Project5 Cover.avif',
    link: 'project5.html',
    githubLink: '',
    featured: true
  },
  {
    id: 'smart-automation',
    title: 'Smart Automation Suite',
    shortDescription: 'Business Workflow Automation with GPT + Zapier',
    description: 'Designed AI + Zapier automations for Excel and emails—auto-generating reports, syncing data, and streamlining ops for daily business use. Saved 15+ hours/month by eliminating repetitive manual work.',
    techStack: ['Zapier', 'GPT', 'Automation'],
    icon: 'Zapier',
    image: '/images/projects/Project6 Gpt+Zapier/Project6 Cover.avif',
    previewImage: '/images/projects/Project6 Gpt+Zapier/Project6 Cover.avif',
    link: 'project6.html',
    githubLink: '',
    featured: true
  },
  {
    id: 'mahira-portfolio',
    title: 'Mahira\'s GitHub Portfolio',
    shortDescription: 'AI-Enhanced Personal Website',
    description: 'Designed and hosted a professional AI-integrated portfolio for Mahira Chaudhry on GitHub with responsive UI and project showcases. Attracted international clients and improved creative visibility.',
    techStack: ['Web Development', 'AI Integration', 'UI/UX Design'],
    icon: 'GitHub',
    image: '/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif',
    previewImage: '/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif',
    link: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    githubLink: '',
    featured: true,
    external: true
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Filter projects based on search term and active filter
  const filteredProjects = useMemo(() => {
    let result = [...projects];
    
    // Apply search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.techStack.some(tech => tech.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(project => 
        project.categories?.includes(activeFilter) ||
        project.techStack?.some(tech => 
          tech.toLowerCase() === activeFilter.toLowerCase()
        )
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO 
        title="Projects | Sahil Ali"
        description="Explore my portfolio of data analysis, visualization, and automation projects."
      />
      
      <ModernNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Data-themed background pattern */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-[0.03]" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%233b82f6\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '150px',
            zIndex: 0
          }}
        ></div>
        
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-900/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-900/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

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
              A collection of my work showcasing data analysis, visualization, and automation projects.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search and Filter */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <select
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  variants={item}
                  className="h-full"
                >
                  <ProjectCard 
                    project={project} 
                    index={index}
                    onClick={(project) => setSelectedProject(project)}
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
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">No projects found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
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
