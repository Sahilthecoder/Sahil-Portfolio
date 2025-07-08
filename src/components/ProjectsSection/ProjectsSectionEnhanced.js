import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Import real projects data
import projects from '../../data/projects';

// Initialize Swiper modules
const swiperModules = [Navigation, Pagination, EffectCoverflow];

const ProjectCard = ({ project, isMobile = false }) => {
  const isExternalLink = project.link && (project.link.startsWith('http') || project.link.startsWith('//'));
  
  const handleClick = (e) => {
    if (isExternalLink) {
      e.preventDefault();
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative h-full group">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700 hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5"
        whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Project Image */}
        <div className="h-48 sm:h-52 md:h-56 overflow-hidden relative">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={!isMobile ? { scale: 1.1 } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/fallback-image.jpg';
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity duration-300">
            <button 
              className="inline-flex items-center text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isExternalLink) {
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                } else if (project.link) {
                  window.location.href = project.link;
                }
              }}
            >
              {isExternalLink ? 'Visit Project' : 'View Details'}
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Clickable overlay - must be the last element to be on top */}
      <a 
        href={project.link}
        onClick={handleClick}
        target={isExternalLink ? "_blank" : "_self"}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-10"
        aria-label={`View ${project.title} project`}
      />
    </div>
  );
};

const ProjectsSectionEnhanced = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Handle window resize with debounce
  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isMobileView = window.innerWidth < 1024;
        // Only update state if the breakpoint is crossed
        if ((isMobileView && !isMobile) || (!isMobileView && isMobile)) {
          setIsMobile(isMobileView);
        }
      }, 100);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  
  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(project => {
      if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => tags.add(tag));
      }
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);
  
  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (!activeFilter || activeFilter === 'All') {
      return projects;
    }
    return projects.filter(project => 
      project.tags && 
      project.tags.some(tag => 
        String(tag).toLowerCase() === activeFilter.toLowerCase()
      )
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-800 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects. Click on any project to learn more.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        {allTags.length > 1 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-10 px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === tag
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
                aria-label={`Filter projects by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isMobile ? (
            // Mobile & Tablet - Swiper Slider
            <div className="relative px-2">
              <Swiper
                modules={swiperModules}
                effect={window.innerWidth < 768 ? 'slide' : 'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={window.innerWidth < 768 ? 1.15 : 1.5}
                spaceBetween={24}
                coverflowEffect={{
                  rotate: 5,
                  stretch: 0,
                  depth: 100,
                  modifier: 1.5,
                  slideShadows: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 4,
                }}
                navigation={window.innerWidth >= 768}
                className="pb-14 px-1"
                breakpoints={{
                  480: {
                    slidesPerView: 1.25,
                    spaceBetween: 24,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 32,
                  },
                  768: {
                    slidesPerView: 1.8,
                    spaceBetween: 32,
                  },
                }}
                speed={600}
                loop={filteredProjects.length > 1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <SwiperSlide key={project.id} className="pb-12">
                      <ProjectCard project={project} isMobile={true} />
                    </SwiperSlide>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      No projects found matching the selected filter.
                    </p>
                  </div>
                )}
              </Swiper>
            </div>
          ) : (
            // Desktop - Grid Layout
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.08,
                    staggerDirection: 1,
                    when: "beforeChildren",
                  },
                },
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">
                    No projects found matching the selected filter.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSectionEnhanced;
