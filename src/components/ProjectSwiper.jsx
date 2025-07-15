import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProjectSwiper = ({ projects }) => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  // Handle card click with better touch support
  const handleCardClick = (project, e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button, a, .swiper-button-prev, .swiper-button-next')) {
      return;
    }
    
    if (project.link) {
      if (project.link.startsWith('http') || project.link.startsWith('//') || project.isExternal) {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      } else {
        const path = project.link.startsWith('/') ? project.link : `/${project.link}`;
        navigate(path);
      }
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!swiperRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        swiperRef.current.swiper.slidePrev();
      } else if (e.key === 'ArrowRight') {
        swiperRef.current.swiper.slideNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        grabCursor={true}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="max-w-sm w-full sm:w-auto">
            <div 
              className="relative h-full min-h-[420px] bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group flex flex-col cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10"
              onClick={(e) => handleCardClick(project, e)}
            >
              {/* Image container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
                  }}
                />
                
                {/* GitHub button */}
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="View on GitHub"
                    title="View on GitHub"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              
              {/* Content section */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-1">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 min-h-[3.5rem]">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i}
                          className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full border border-gray-200 dark:border-gray-600/50"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span 
                          className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-500/30"
                          title={project.tags.slice(3).join(', ')}
                        >
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination */}
        <div className="swiper-pagination !relative mt-8 !bottom-0" />
      </Swiper>
      
      {/* Custom styles */}
      <style jsx global>{`
        .swiper {
          width: 100%;
          padding: 1rem 0 2.5rem;
        }
        
        .swiper-slide {
          width: 100%;
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.6;
          transform: scale(0.95);
        }
        
        .swiper-slide-active, .swiper-slide-duplicate-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(79, 70, 229, 0.3);
          opacity: 1;
          transition: all 0.2s ease;
        }
        .dark .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
        }
        .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 5px;
          background: #4f46e5;
        }
        .dark .swiper-pagination-bullet-active {
          background: #818cf8;
        }
        
        .swiper-button-disabled {
          opacity: 0.3;
          pointer-events: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectSwiper;
