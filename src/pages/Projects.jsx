import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import EnhancedProjectModal from '../components/ProjectModal/EnhancedProjectModal';

// Icons
// React Icons from Font Awesome
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearch, 
  FaTimesCircle, 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaRobot,
  FaCode,
  FaDatabase,
  FaNodeJs,
  FaMicrosoft,
  FaImage,
  FaEnvelope,
  FaFileAlt,
  FaCheck
} from 'react-icons/fa';

// Simple Icons
import { 
  SiTableau, 
  SiPython, 
  SiGooglesheets, 
  SiGoogleanalytics, 
  SiGoogledatastudio, 
  SiZapier, 
  SiNotion, 
  SiOpenai, 
  SiReact, 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiMongodb, 
  SiPostgresql, 
  SiDocker, 
  SiFirebase, 
  SiBootstrap, 
  SiTailwindcss, 
  SiSass, 
  SiGit, 
  SiGithub, 
  SiNextdotjs, 
  SiD3Dotjs, 
  SiTensorflow, 
  SiStreamlit,
  SiAmazonaws
} from 'react-icons/si';

// Feather Icons
import { FiExternalLink, FiFigma, FiTrendingUp, FiMaximize2 } from 'react-icons/fi';
// Bootstrap Icons
import { BsFileEarmarkExcel } from 'react-icons/bs';
// Font Awesome Icons
import { FaPalette } from 'react-icons/fa';

// Components
import SEO from '../components/SEO';

// Utils
import { scrollToSection } from '../utils/scrollUtils';

// Tilt Effect
import Tilt from 'react-parallax-tilt';

// Glitch text component
const GlitchText = ({ children }) => {
  return (
    <span className="glitch" data-text={children}>
      {children}
    </span>
  );
};

// Tech stack icons mapping with categories
const techIcons = {
  // Core Technologies
  'React': <SiReact className="text-blue-500" />,
  'JavaScript': <SiJavascript className="text-yellow-400" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'HTML5': <SiHtml5 className="text-orange-500" />,
  'CSS3': <SiCss3 />,
  'Node.js': <FaNodeJs className="text-green-500" />,
  'Python': <SiPython className="text-blue-600" />,
  'Git': <SiGit />,
  'GitHub': <SiGithub />,
  
  // Data & Analytics
  'Tableau': <SiTableau className="text-blue-600" />,
  'Power BI': <FaChartLine className="text-yellow-500" />,
  'Excel': <BsFileEarmarkExcel />,
  'Google Sheets': <SiGooglesheets className="text-green-500" />,
  'Google Analytics': <SiGoogleanalytics className="text-orange-500" />,
  'Google Data Studio': <SiGoogledatastudio className="text-blue-400" />,
  'Data Analysis': <FaChartLine className="text-blue-500" />,
  'Business Intelligence': <FaChartPie className="text-orange-500" />,
  'Data Visualization': <FaChartBar className="text-blue-400" />,
  'SQL': <FaDatabase className="text-blue-700" />,
  'MongoDB': <SiMongodb className="text-green-600" />,
  'PostgreSQL': <SiPostgresql className="text-blue-700" />,
  
  // AI & Automation
  'OpenAI': <SiOpenai className="text-green-600" />,
  'Automation': <FaRobot className="text-blue-500" />,
  'Zapier': <SiZapier className="text-blue-500" />,
  'Notion': <SiNotion />,
  
  // Web & Cloud
  'Docker': <SiDocker className="text-blue-500" />,
  'AWS': <SiAmazonaws className="text-yellow-500" />,
  'Firebase': <SiFirebase className="text-yellow-500" />,
  'Next.js': <SiNextdotjs />,
  
  // UI/UX
  'Material-UI': <FaPalette className="text-blue-500" />,
  'Bootstrap': <SiBootstrap className="text-purple-500" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'Sass': <SiSass className="text-pink-500" />,
  'Figma': <FiFigma className="text-pink-500" />,
  
  // Data Science & ML
  'TensorFlow': <SiTensorflow className="text-orange-500" />,
  'D3.js': <SiD3Dotjs className="text-orange-600" />,
  'Streamlit': <SiStreamlit className="text-red-500" />,
  'Prophet': <SiPython className="text-blue-600" />,
  'PyTorch': <SiPython className="text-orange-500" />,
  'Azure ML': <FaMicrosoft className="text-blue-600" />,
  'OpenCV': <SiPython className="text-blue-600" />,
  'FastAPI': <SiPython className="text-green-600" />,
  
  // Default fallback for any technology not listed above
  'default': <FaCode className="text-gray-500" />,
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
                    <FaImage className="w-8 h-8 mx-auto text-gray-400 mb-2" aria-label="Image placeholder" role="img" />
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
                      <span className="text-blue-500 mr-1 sm:mr-1.5 text-xs sm:text-sm" aria-hidden="true">
                        <span aria-hidden="true">{techIcons[tech] || tech.charAt(0)}</span>
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
              <div>
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

const projects = [
  {
    id: 'zomato-expansion',
    title: 'Zomato Restaurant Expansion Analysis',
    shortDescription: 'Market Strategy Dashboard in Excel',
    description:
      "Built an interactive Excel dashboard to analyze Zomato's city-wise expansion strategy across India, uncovering performance trends and market insights. Helped identify high-performing regions and new expansion opportunities.",
    techStack: ['Excel', 'Data Analysis', 'Business Intelligence'],
    icon: 'Excel',
    image: '/images/projects/Project1_excel/Project1_Cover.webp',
    previewImage: '/images/projects/Project1_excel/Project1_Cover-300w.webp',
    images: [
      '/images/projects/Project1_excel/Project1_Cover-1200w.webp',
      '/images/projects/Project1_excel/Project1_Cover-600w.webp',
      '/images/projects/Project1_excel/Project1_Cover-300w.webp',
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
    techStack: ['Tableau', 'Data Analysis', 'Business Intelligence', 'Data Visualization'],
    icon: 'Tableau',
    image: '/images/projects/Project2_tableau/Project2_Cover.webp',
    previewImage: '/images/projects/Project2_tableau/Project2_Cover-300w.webp',
    images: [
      '/images/projects/Project2_tableau/Project2_Cover-1200w.webp',
      '/images/projects/Project2_tableau/Project2_Cover-600w.webp',
      '/images/projects/Project2_tableau/Project2_Cover-300w.webp',
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
    techStack: ['SQL', 'Google Sheets', 'Automation', 'Data Analysis'],
    icon: 'SQL',
    image: '/images/projects/Project3_Sql+Sheets/Project3_Cover.webp',
    previewImage: '/images/projects/Project3_Sql+Sheets/Project3_Cover-300w.webp',
    images: [
      '/images/projects/Project3_Sql+Sheets/Project3_Cover-1200w.webp',
      '/images/projects/Project3_Sql+Sheets/Project3_Cover-600w.webp',
      '/images/projects/Project3_Sql+Sheets/Project3_Cover-300w.webp',
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
    techStack: ['Power BI', 'Data Analysis', 'Business Intelligence', 'Data Visualization'],
    icon: 'Power BI',
    image: '/images/projects/Project4_Power_BI/Project4_Cover.webp',
    previewImage: '/images/projects/Project4_Power_BI/Project4_Cover-300w.webp',
    images: [
      '/images/projects/Project4_Power_BI/Project4_Cover-1200w.webp',
      '/images/projects/Project4_Power_BI/Project4_Cover-600w.webp',
      '/images/projects/Project4_Power_BI/Project4_Cover-300w.webp',
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
    techStack: ['OpenAI', 'Notion', 'Automation', 'Google Sheets', 'JavaScript'],
    icon: 'Notion',
    image: '/images/projects/Project5_Gpt+Notion/Project5_Cover.webp',
    previewImage: '/images/projects/Project5_Gpt+Notion/Project5_Cover-300w.webp',
    images: [
      '/images/projects/Project5_Gpt+Notion/Project5_Cover-1200w.webp',
      '/images/projects/Project5_Gpt+Notion/Project5_Cover-600w.webp',
      '/images/projects/Project5_Gpt+Notion/Project5_Cover-300w.webp'
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
    techStack: ['Zapier', 'OpenAI', 'Automation', 'Excel', 'Google Sheets'],
    icon: 'Zapier',
    image: '/images/projects/Project6_Gpt+Zapier/Project6_Cover.webp',
    previewImage: '/images/projects/Project6_Gpt+Zapier/Project6_Cover-300w.webp',
    images: [
      '/images/projects/Project6_Gpt+Zapier/Project6_Cover-1200w.webp',
      '/images/projects/Project6_Gpt+Zapier/Project6_Cover-600w.webp',
      '/images/projects/Project6_Gpt+Zapier/Project6_Cover-300w.webp'
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
    techStack: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'GitHub'],
    icon: 'GitHub',
    image: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover.webp',
    previewImage: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp',
    images: [
      '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-1200w.webp',
      '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp',
      '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp'
    ],
    link: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    githubLink: 'https://github.com/mahiradesignhub/mahira-portfolio',
    featured: true,
    external: true,
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);

  // Handle project selection for modal
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
    // Reset selected project after animation completes
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    
    return projects.filter(project => {
      // Search term matching
      return searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [projects, searchTerm]);







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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <SEO
        title="Projects | Sahil Ali"
        description="Explore my portfolio of data analysis, visualization, and automation projects."
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden px-4 sm:px-6 min-h-[80vh] flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            {/* Animated grid pattern with subtle movement */}
            <motion.div 
              className="absolute inset-0 opacity-30 dark:opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #6366f1 1px, transparent 1px),
                  linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e, #f59e0b)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Floating elements with staggered animation */}
            <motion.div 
              className="absolute top-1/4 -left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div 
              className="absolute top-1/2 -right-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                y: [0, 30, 0],
                x: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                delay: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
              animate={{
                y: [0, -20, 0],
                x: [0, 15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25,
                delay: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
            {/* Hero Content */}
            <motion.div 
              className="w-full lg:w-1/2 text-center lg:text-left px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <FaCode className="mr-1.5" />
                <span>Portfolio Showcase</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Projects</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Solutions</span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Explore my portfolio of <span className="font-medium text-indigo-600 dark:text-indigo-400">inventory management</span>, <span className="font-medium text-blue-600 dark:text-blue-400">data analysis</span>, and <span className="font-medium text-purple-600 dark:text-purple-400">AI automation</span> projects. Each project demonstrates my ability to solve complex business challenges with innovative technical solutions.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a
                  href="#projects-grid"
                  onClick={(e) => {
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects-grid');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaSearch className="w-4 h-4" />
                  Explore Projects
                </a>
                <a
                  href="https://github.com/Sahilthecoder/Sahil-Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaGithub className="w-4 h-4" />
                  View on GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Image/Illustration - Hidden on mobile, visible on lg screens and up */}
            <motion.div 
              className="hidden lg:block lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative max-w-md mx-auto lg:mr-0">
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Data Analysis and Project Showcase"
                    className="w-full h-auto object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/fallback-image.jpg';
                    }}
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full -z-10"></div>
                
                {/* Floating badges */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                      <FaCode className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                      <p className="font-semibold text-gray-900 dark:text-white">10+ Completed</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                      <FaCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Technologies</p>
                      <p className="font-semibold text-gray-900 dark:text-white">20+ Used</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white dark:bg-gray-900" id="projects-grid">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search */}
          <div className="mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimesCircle className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                </button>
              )}
            </motion.div>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <FaSearch className="h-12 w-12 text-indigo-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search to find what you're looking for.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EnhancedProjectModal
              project={selectedProject}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
