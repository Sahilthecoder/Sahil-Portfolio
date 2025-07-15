import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const ProjectSwiper = ({ projects }) => {
  // Prevent body scroll when swiping on mobile
  React.useEffect(() => {
    const handleTouchMove = (e) => {
      // Only prevent default if the touch is on the swiper
      if (e.target.closest('.swiper-container')) {
        e.preventDefault();
      }
    };

    // Add touch event listener to prevent body scroll
    document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.body.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4">
      <Swiper
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        preventInteractionOnTransition={true}
        touchStartPreventDefault={false}
        touchMoveStopPropagation={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-2.5 h-2.5 bg-gray-400 opacity-40 mx-1 rounded-full transition-all duration-300"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 40,
          },
        }}
        className="w-full py-8 px-2"
      >
        {projects.map((project, index) => (
          <SwiperSlide 
            key={index} 
            className="h-auto w-full max-w-md mx-auto"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl h-full flex flex-col border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-transparent"
              whileHover={{ 
                y: -8,
                transition: { 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                } 
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: index * 0.1 
                }
              }}
              viewport={{ once: true }}
            >
              <div className="relative h-56 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                {/* Stack tags - clean and minimal below description */}
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-medium rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span 
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-medium rounded-full"
                        title={project.tags.slice(4).join(', ')}
                      >
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group"
                      aria-label="View on GitHub"
                    >
                      <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30"
                  >
                    <span className="relative z-10 flex items-center">
                      View Project
                      <FaExternalLinkAlt className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute right-0 w-8 h-8 -mr-2 opacity-10 rotate-12 bg-white group-hover:translate-x-8 ease-out duration-500 transition-all"></span>
                  </a>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Pagination */}
        <div className="swiper-pagination !relative !mt-6" />
      </Swiper>
    </div>
  );
};

export default ProjectSwiper;
