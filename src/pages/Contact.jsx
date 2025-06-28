import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaFileUpload, FaGithub, FaLinkedin, FaHome, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
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
    // Form submission is handled by Formspree
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Work Together</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and collaborations.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-8 rounded-full"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form 
                id="contactForm" 
                method="POST" 
                action="https://formspree.io/f/xpwrjjqj" 
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Let's Collaborate!</h2>
                  <p className="text-gray-600 mt-2">Have a project, automation idea, or analysis in mind? Tell me how I can help.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="e.g. Sahil Ali"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="_replyto"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="e.g. sahil@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="+91 98757 71550"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Service You Need <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyMCAyMCcgZmlsbD0nbm9uZSc+PHBhdGggc3Ryb2tlPScjNmI3MjgwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMS41JyBkPSdNNiA4bDQgNCA0LTQnLz48L3N2Zz4=')] bg-right-0.5 bg-no-repeat pr-10"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Dashboard Design">Dashboard Design</option>
                    <option value="Data Cleaning & Analysis">Data Cleaning & Analysis</option>
                    <option value="Inventory Automation">Inventory Automation</option>
                    <option value="Excel/Google Sheets System">Excel/Google Sheets System</option>
                    <option value="Custom Request">Custom Request</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Describe Your Project <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="E.g. Need a sales dashboard for Q3, timeline 2 weeks, budget $500"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Attach File <span className="text-gray-500">(optional)</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input 
                            id="file-upload" 
                            name="attachment" 
                            type="file" 
                            className="sr-only"
                            accept=".csv, .xls, .xlsx"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">CSV, XLS, XLSX up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center px-8 py-4 bg-indigo-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full justify-center"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="transition-transform duration-300 group-hover:translate-x-1">Send Request</span>
                      <FaPaperPlane className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    <span className="absolute inset-0 bg-indigo-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">Let's connect! Your data and my expertise can create impactful solutions.</p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaHome className="w-5 h-5 text-indigo-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">Rajasthan, India (Open for Relocation)</p>
                  </div>
                </div>
                
                <a
                  href="mailto:sahilkhan36985@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <FaEnvelope className="w-5 h-5 text-indigo-600 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p>sahilkhan36985@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/SahilTheCoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <FaGithub className="w-5 h-5 text-indigo-600 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p>github.com/SahilTheCoder</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/sahil-ali-714867242/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <FaLinkedin className="w-5 h-5 text-indigo-600 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p>linkedin.com/in/sahil-ali-714867242</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919875771550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-gray-600 hover:text-indigo-600 transition-colors group"
                >
                  <FaWhatsapp className="w-5 h-5 text-indigo-600 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p>Chat on WhatsApp</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
