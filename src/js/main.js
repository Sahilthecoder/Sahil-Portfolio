// src/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('Sahil Ali Portfolio - main.js loaded');
  // Initialize any vanilla JS functionality here if needed
});

// Function to handle the navigation menu toggle
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');
}

// Add click event listener to the menu icon
const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', toggleMenu);

// Function to handle smooth scrolling to anchor links
function scrollToAnchor(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const offsetTop = targetElement.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
}

// Add click event listener to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', scrollToAnchor);
});

// Function to handle the close button click
function closeMenu() {
  const nav = document.querySelector('nav');
  nav.classList.remove('active');
}

// Add click event listener to the close button
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', closeMenu);

// Function to handle the navigation menu close when a link is clicked
function closeMenuOnLinkClick() {
  const nav = document.querySelector('nav');
  nav.classList.remove('active');
}

// Add click event listener to navigation links
const menuNavLinks = document.querySelectorAll('nav a');
menuNavLinks.forEach(link => {
  link.addEventListener('click', closeMenuOnLinkClick);
});
