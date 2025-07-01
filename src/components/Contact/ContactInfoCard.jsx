import React from 'react';
import { FaHome, FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const ContactInfoCard = ({ icon, title, subtitle, href, isLink = false, className = '' }) => {
  const content = (
    <div className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group ${className}`}>
      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      {isLink && <FiArrowRight className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />}
    </div>
  );

  if (isLink && href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

export const ContactInfo = () => (
  <div className="space-y-4">
    <div className="flex items-start">
      <FaHome className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
      <div>
        <p className="text-gray-700 dark:text-gray-300">Rajasthan, India (Open for Relocation)</p>
      </div>
    </div>
    
    <ContactInfoCard
      icon={<FaEnvelope className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />}
      title="Email"
      subtitle="sahilkhan36985@gmail.com"
      href="mailto:sahilkhan36985@gmail.com"
      isLink
    />

    <ContactInfoCard
      icon={<FaGithub className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />}
      title="GitHub"
      subtitle="SahilTheCoder"
      href="https://github.com/SahilTheCoder"
      isLink
    />

    <ContactInfoCard
      icon={<FaLinkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />}
      title="LinkedIn"
      subtitle="sahil-ali-714867242"
      href="https://www.linkedin.com/in/sahil-ali-714867242/"
      isLink
    />

    <ContactInfoCard
      icon={<FaWhatsapp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />}
      title="WhatsApp"
      subtitle="+91 98757 71550"
      href="https://wa.me/919875771550"
      isLink
    />
  </div>
);

export default ContactInfoCard;
