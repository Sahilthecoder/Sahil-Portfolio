import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProjectSwiper = ({ projects, className = '', breakpoints }) => {
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
    <div className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
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
        style={{
          '--swiper-pagination-bullet-horizontal-gap': '6px',
          '--swiper-pagination-bullet-size': '10px',
          '--swiper-pagination-bullet-inactive-color': '#9ca3af',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
          '--swiper-pagination-color': '#6366f1',
          '--swiper-pagination-bullet-border-radius': '100%',
        }}
        breakpoints={{
          // Default breakpoints can be overridden by props
          480: {
            slidesPerView: 1.1,
            spaceBetween: 20,
            centeredSlides: true,
            ...(breakpoints?.[480] || {})
          },
          640: {
            slidesPerView: 1.3,
            spaceBetween: 25,
            centeredSlides: true,
            ...(breakpoints?.[640] || {})
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: true,
            ...(breakpoints?.[768] || {})
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            ...(breakpoints?.[1024] || {})
          },
          1280: {
            slidesPerView: 3.5,
            spaceBetween: 30,
            ...(breakpoints?.[1280] || {})
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 30,
            ...(breakpoints?.[1536] || {})
          },
          ...(breakpoints || {}) // Allow complete override of breakpoints
        }}
        className="w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide 
            key={index} 
            className="max-w-sm w-full sm:w-auto transition-transform duration-300 ease-in-out"
            style={{
              transition: 'transform 0.3s ease-in-out, z-index 0.3s ease-in-out',
            }}
            onTransitionEnd={(e) => {
              // Force reflow to ensure smooth transitions
              e.target.style.willChange = 'auto';
            }}
          >
              <div 
                className="relative h-full min-h-[420px] bg-white dark:bg-gray-800/50 rounded-3xl overflow-hidden border-2 border-gray-200/80 dark:border-gray-700/50 hover:border-indigo-400/30 transition-all duration-300 group flex flex-col cursor-pointer transform-style-preserve-3d"
                style={{
                  '--card-radius': '0.5rem',
                  '--card-padding': '0.5rem',
                  '--card-border': '2px solid rgba(209, 213, 219, 0.5)',
                  '--card-hover-border': '2px solid rgba(99, 102, 241, 0.3)',
                  '--card-shadow': '0 15px 35px -10px rgba(0, 0, 0, 0.1)',
                  '--card-hover-shadow': '0 20px 50px -10px rgba(99, 102, 241, 0.2)',
                  transform: 'perspective(1500px)',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.1, 1.1)',
                  boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.1)',
                  willChange: 'transform, box-shadow, z-index',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'subpixel-antialiased',
                  zIndex: 1,
                  borderRadius: '0.5rem'
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  
                  // Calculate rotation based on mouse position with more pronounced effect
                  const rotateY = ((x - centerX) / 10) * 1.5;
                  const rotateX = ((centerY - y) / 10) * 1.5;
                  
                  // Calculate shadow and highlight based on rotation
                  const shadowX = -rotateY * 0.5;
                  const shadowY = rotateX * 0.5;
                  const shadowBlur = 40;
                  const shadowSpread = 5;
                  
                  // Apply transformations with more pronounced effect
                  card.style.transform = `
                    perspective(1500px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(40px) 
                    scale3d(1.03, 1.03, 1.03)
                  `;
                  
                  // Enhanced shadow with direction based on rotation
                  card.style.boxShadow = `
                    ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(99, 102, 241, 0.25),
                    0 25px 60px -15px rgba(0, 0, 0, 0.15)
                  `;
                  
                  // Add subtle brightness change
                  card.style.filter = 'brightness(1.03)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateZ(0)';
                  card.style.boxShadow = '0 15px 35px -10px rgba(0, 0, 0, 0.1)';
                  card.style.filter = 'brightness(1)';
                }}
                onClick={(e) => handleCardClick(project, e)}
              >
              {/* Image container with subtle hover effect */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{
                    opacity: 1,
                    willChange: 'transform',
                    transform: 'translateZ(30px)',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.9, 0.1, 1.1)'
                  }}
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
      
      <style jsx global>{`
        .swiper {
          width: 100%;
          padding: 1.5rem 0 3rem;
        }
        
        .swiper-slide {
          width: 100%;
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.1, 1.1);
          opacity: 0.7;
          transform: scale(0.95);
          border-radius: 0.5rem;
          overflow: hidden;
          padding: 0.5rem;
        }
        
        .swiper-slide-active, 
        .swiper-slide-duplicate-active {
          opacity: 1;
          transform: scale(1.02);
          z-index: 10;
        }
        
        /* Card styles */
        .swiper-slide > div {
          border-radius: 1.5rem;
          overflow: hidden;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        /* Active slide styles */
        .swiper-slide-active > div,
        .swiper-slide-duplicate-active > div {
          border: 2px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.3) !important;
          transform: translateZ(0);
        }
        
        /* Mobile specific styles */
        @media (max-width: 768px) {
          .swiper {
            padding: 1rem 0 2.5rem;
          }
          
          .swiper-slide {
            border-radius: 0.5rem;
            padding: 0.5rem;
          }
          
          .swiper-slide > div {
            border-radius: 0.5rem;
          }
          
          .swiper-slide-active > div,
          .swiper-slide-duplicate-active > div {
            border: 2px solid rgba(99, 102, 241, 0.4);
            box-shadow: 0 8px 25px -5px rgba(99, 102, 241, 0.4) !important;
          }
        }
      `}</style>
      
      <style jsx global>{`
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
