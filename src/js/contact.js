// src/js/contact.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[action="#"]');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = form.querySelector('#full-name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const projectDesc = form.querySelector('#project-description').value.trim();

    if (!fullName || !email || !service || !projectDesc) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // TODO: Implement actual form submission (e.g., fetch API to backend)
    alert('Thank you for your message! We will get back to you soon.');

    form.reset();
  });
});
