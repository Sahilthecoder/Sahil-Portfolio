// src/js/project-slider.js

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.project-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  };

  // Initial display
  showSlide(currentIndex);

  // Attach event listeners if you have next/prev buttons
  const nextBtn = document.querySelector('.slider-next');
  const prevBtn = document.querySelector('.slider-prev');

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
});
