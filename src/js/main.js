// Main JavaScript for Sahil's Portfolio
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Sahil Ali Portfolio - main.js loaded');
  
  // Initialize all components
  initNavbar();
  initSmoothScroll();
  initScrollReveal();
  initProjectCards();
  initContactForm();
  initScrollToTop();
  initAOS();
  initTypewriter();
  initTestimonialSlider();
  initSkillsAnimation();
  initThemeSwitcher();
});

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  // Toggle mobile menu
  if (navbarToggler) {
    navbarToggler.addEventListener('click', () => {
      navbarToggler.classList.toggle('open');
      navbarMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  // Close mobile menu when clicking on a link
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('open');
      navbarToggler.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Add scroll effect to navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Initialize navbar state
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll reveal animations
function initScrollReveal() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// Project cards hover effect
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
      card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(0, 0, 0, 0.1)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
  });
}

// Contact form submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitBtnText = submitBtn.innerHTML;
    
    try {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Simulate form submission (replace with actual fetch/axios call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      showToast('Message sent successfully!', 'success');
      contactForm.reset();
    } catch (error) {
      // Show error message
      showToast('Failed to send message. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitBtnText;
    }
  });
}

// Scroll to top button
function initScrollToTop() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
  // This would be replaced with the actual AOS initialization
  // if you choose to use the AOS library
  // AOS.init({
  //   duration: 800,
  //   easing: 'ease-in-out',
  //   once: true
  // });
}

// Typewriter effect for hero section
function initTypewriter() {
  const typewriterElements = document.querySelectorAll('.typewriter');
  
  if (!typewriterElements.length) return;
  
  // Simple typewriter effect implementation
  typewriterElements.forEach(element => {
    const text = element.getAttribute('data-text');
    if (!text) return;
    
    let i = 0;
    const speed = 100; // typing speed in milliseconds
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
  });
}

// Testimonial slider
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.testimonial-slide');
  const prevBtn = slider.querySelector('.testimonial-prev');
  const nextBtn = slider.querySelector('.testimonial-next');
  const dots = slider.querySelectorAll('.testimonial-dot');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }
  
  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Show first slide initially
  showSlide(0);
}

// Skills animation
function initSkillsAnimation() {
  const skills = document.querySelectorAll('.skill-progress');
  
  if (!skills.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar');
        const percent = entry.target.getAttribute('data-percent');
        
        if (progressBar) {
          progressBar.style.width = percent + '%';
          progressBar.setAttribute('aria-valuenow', percent);
        }
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skills.forEach(skill => observer.observe(skill));
}

// Theme switcher
function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (!themeToggle) return;
  
  // Check for saved user preference, if any, on load
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply the current theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update the toggle state
  if (currentTheme === 'dark') {
    themeToggle.checked = true;
  }
  
  // Listen for toggle changes
  themeToggle.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Listen for system theme changes
  prefersDarkScheme.addListener((e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.checked = (newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  });
}

// Toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide and remove toast after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Add ripple effect to buttons
function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Initialize ripple effect on all buttons
document.querySelectorAll('.btn, .card, .navbar-link').forEach(button => {
  addRippleEffect(button);
});
