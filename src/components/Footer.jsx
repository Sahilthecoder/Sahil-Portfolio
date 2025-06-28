import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHome, FaEnvelope, FaCode, FaHeart } from 'react-icons/fa';

// Repository information
const REPOSITORY = {
  url: 'https://github.com/Sahilthecoder/Sahil-Portfolio',
  name: 'Sahil-Portfolio',
  author: 'Sahil Ali',
  license: 'MIT'
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactDetails = [
    {
      icon: <FaHome className="w-5 h-5" />,
      text: 'Rajasthan, India (Open for Relocation)'
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      text: 'sahilkhan36985@gmail.com',
      url: 'mailto:sahilkhan36985@gmail.com'
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      text: 'github.com/SahilTheCoder',
      url: 'https://github.com/SahilTheCoder'
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      text: 'linkedin.com/in/sahil-ali-714867242',
      url: 'https://www.linkedin.com/in/sahil-ali-714867242/'
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      text: 'Chat on WhatsApp',
      url: 'https://wa.me/919875771550'
    }
  ];

  return (
    <footer 
      className="bg-dark-bg border-t border-dark-glass-border p-6 text-center"
      role="contentinfo"
      aria-label="Page footer"
    >
      <div className="flex justify-center space-x-6 mb-4">
        {contactDetails.filter(item => item.url).map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-text hover:text-indigo-400 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={item.text}
          >
            {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
          </motion.a>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm text-dark-text/70 mb-2">
          &copy; {currentYear} {REPOSITORY.author}. All rights reserved.
        </p>
        <p className="text-xs text-dark-text/50">
          Made with <FaHeart className="inline text-red-500 mx-1" /> by {REPOSITORY.author}
          <span className="mx-2">•</span>
          <a 
            href={REPOSITORY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline inline-flex items-center"
            aria-label="View source code on GitHub"
          >
            <FaCode className="mr-1" /> View Source
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
