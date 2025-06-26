// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <main>
      <h1>Get in Touch</h1>
      <p>Interested in working together or need a tailored data solution? Let's build something impactful.</p>

      <form action="#" method="post" aria-label="Contact form">
        <label htmlFor="full-name">Full Name *</label>
        <input type="text" id="full-name" name="full-name" required />

        <label htmlFor="email">Email Address *</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="phone">Phone Number (optional)</label>
        <input type="tel" id="phone" name="phone" />

        <label htmlFor="service">Service You Need *</label>
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          <option value="dashboard-design">Dashboard Design</option>
          <option value="data-cleaning">Data Cleaning & Analysis</option>
          <option value="inventory-automation">Inventory Automation</option>
          <option value="excel-google-sheets">Excel/Google Sheets System</option>
          <option value="custom-request">Custom Request</option>
        </select>

        <label htmlFor="project-description">Describe Your Project *</label>
        <textarea id="project-description" name="project-description" rows="5" required></textarea>

        <label htmlFor="file-attachment">Attach File (optional)</label>
        <input
          type="file"
          id="file-attachment"
          name="file-attachment"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip"
        />

        <button type="submit" className="btn-primary">
          Send Request
        </button>
      </form>

      <section aria-labelledby="contact-info-title">
        <h2 id="contact-info-title">Find more About Me on these platforms:</h2>
        <ul>
          <li>Location: Rajasthan, India (Open for Relocation)</li>
          <li>
            Email: <a href="mailto:sahilkhan36985@gmail.com">sahilkhan36985@gmail.com</a>
          </li>
          <li>
            GitHub:{' '}
            <a href="https://github.com/SahilTheCoder" target="_blank" rel="noopener noreferrer">
              github.com/SahilTheCoder
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a href="https://linkedin.com/in/sahil-ali-714867242/" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/sahil-ali-714867242/
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Contact;
