import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormInput, FileUpload, SubmitButton, ContactInfo } from './';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formspree will handle the submission via the form's action
  };

  return (
    <section id="contact-form" className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Let's Collaborate!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Have a project, automation idea, or analysis in mind? Tell me how I can help.
              </p>
            </div>
            
            <form 
              id="contactForm" 
              method="POST" 
              action="https://formspree.io/f/xpwrjjqj"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sahil Ali"
                />

                <FormInput
                  id="email"
                  name="_replyto"
                  type="email"
                  label="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. sahil@example.com"
                />
              </div>

              <FormInput
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98757 71550"
              />

              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service You Need <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 dark:text-white pr-10 appearance-none"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Dashboard Design">Dashboard Design</option>
                  <option value="Data Cleaning & Analysis">Data Cleaning & Analysis</option>
                  <option value="Inventory Automation">Inventory Automation</option>
                  <option value="Excel/Google Sheets System">Excel/Google Sheets System</option>
                  <option value="Custom Request">Custom Request</option>
                </select>
              </div>

              <FormInput
                id="message"
                name="message"
                type="textarea"
                label="Describe Your Project"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="E.g. Need a sales dashboard for Q3, timeline 2 weeks, budget $500"
                rows={6}
              />

              <FileUpload 
                id="file-upload"
                name="attachment"
                label="Attach File"
                accept=".csv, .xls, .xlsx"
                maxSizeMB={10}
              />

              <SubmitButton>Send Request</SubmitButton>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 h-fit"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Let's connect! Your data and my expertise can create impactful solutions.
            </p>
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
