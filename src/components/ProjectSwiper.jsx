import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import ProjectCard from './shared/ProjectCard';

import 'swiper/css';
import 'swiper/css/pagination';

const MIN_SLIDES_FOR_LOOP = 3;

const ProjectSwiper = ({
  projects = [],
  className = '',
  pagination = {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
    renderBullet: (index, className) =>
      `<span class="${className} hover:opacity-100 transition-opacity"></span>`,
  },
  autoplay = {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    waitForTransition: true,
  },
  loop = true,
  centeredSlides = true,
  grabCursor = true,
  ...props
}) => {
  const hasEnoughSlides = projects.length >= MIN_SLIDES_FOR_LOOP;
  const shouldLoop = loop && hasEnoughSlides;
  const shouldAutoplay = shouldLoop ? autoplay : false;

  if (!projects.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No projects to display</p>
      </div>
    );
  }

  const getSlides = (base) => Math.min(base, projects.length);
  const getSpace = (base) => (projects.length <= 2 ? base * 0.75 : base);

  const breakpoints = {
    320: {
      slidesPerView: projects.length === 1 ? 1 : getSlides(1.2),
      spaceBetween: getSpace(20),
      centeredSlides: projects.length > 1,
    },
    640: {
      slidesPerView: getSlides(1.5),
      spaceBetween: getSpace(24),
      centeredSlides: projects.length > 1,
    },
    768: {
      slidesPerView: getSlides(2),
      spaceBetween: getSpace(24),
      centeredSlides: false,
    },
    1024: {
      slidesPerView: getSlides(2.5),
      spaceBetween: getSpace(32),
      centeredSlides: false,
    },
    1280: {
      slidesPerView: getSlides(3),
      spaceBetween: getSpace(32),
      centeredSlides: false,
    },
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <Swiper
        modules={[Pagination, ...(shouldAutoplay ? [Autoplay] : [])]}
        loop={shouldLoop}
        loopAdditionalSlides={shouldLoop ? 2 : 0}
        autoplay={shouldAutoplay}
        centeredSlides={centeredSlides && projects.length > 1}
        grabCursor={grabCursor}
        pagination={pagination}
        watchOverflow={true}
        updateOnWindowResize={true}
        watchSlidesProgress={shouldLoop}
        preventClicks={false}
        preventClicksPropagation={false}
        breakpoints={breakpoints}
        style={{
          '--swiper-pagination-color': 'rgba(99, 102, 241, 0.8)',
          '--swiper-pagination-bullet-border-radius': '100%',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
          '--swiper-pagination-bullet-size': '10px',
          '--swiper-pagination-bullet-inactive-color': '#9ca3af',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
        }}
        {...props}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <ProjectCard project={project} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(ProjectSwiper);
