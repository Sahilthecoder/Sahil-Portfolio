import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProjectCard from './shared/ProjectCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProjectSwiper = ({ 
  projects, 
  className = '', 
  breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 1.5,
      spaceBetween: 24
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 32
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 32
    }
  },
  navigation = true,
  pagination = { clickable: true },
  autoplay = {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  loop = true,
  centeredSlides = true,
  grabCursor = true,
  ...props 
}) => {
  const swiperRef = useRef(null);

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

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No projects to display</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={loop}
        autoplay={autoplay}
        speed={800}
        grabCursor={grabCursor}
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
        {...props}
      >
        {projects.map((project, index) => (
          <SwiperSlide 
            key={project.id || index} 
            className="h-auto transition-transform duration-300 ease-in-out"
          >
            <ProjectCard 
              project={project}
              index={index}
              className="h-full"
              isInSwiper={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="swiper-pagination !relative mt-8 !bottom-0" />

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
          height: auto;
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
        
        /* Pagination styles */
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
