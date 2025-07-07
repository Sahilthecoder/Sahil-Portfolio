import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: 'https://github.com/SahilTheCoder',
      label: 'GitHub',
      gradient: 'from-gray-800 via-gray-700 to-gray-800',
      hoverGradient: 'from-gray-700 via-gray-600 to-gray-700',
      darkGradient: 'from-gray-700 via-gray-600 to-gray-700',
      darkHoverGradient: 'from-gray-600 via-gray-500 to-gray-600',
      size: 'w-9 h-9',
      iconClass: 'text-gray-100 dark:text-gray-200',
    },
    {
      icon: <FaLinkedin />,
      href: 'https://www.linkedin.com/in/sahil-ali-714867242/',
      label: 'LinkedIn',
      gradient: 'from-blue-600 via-blue-500 to-blue-600',
      hoverGradient: 'from-blue-500 via-blue-400 to-blue-500',
      darkGradient: 'from-blue-700 via-blue-600 to-blue-700',
      darkHoverGradient: 'from-blue-600 via-blue-500 to-blue-600',
      size: 'w-9 h-9',
      iconClass: 'text-white',
    },
    {
      icon: <FaWhatsapp />,
      href: 'https://wa.me/919875771550',
      label: 'WhatsApp',
      gradient: 'from-green-500 via-green-400 to-green-500',
      hoverGradient: 'from-green-400 via-green-300 to-green-400',
      darkGradient: 'from-green-600 via-green-500 to-green-600',
      darkHoverGradient: 'from-green-500 via-green-400 to-green-500',
      size: 'w-9 h-9',
      iconClass: 'text-white',
    },
    {
      icon: <FaEnvelope />,
      href: 'mailto:sahilkhan36985@gmail.com',
      label: 'Email',
      gradient: 'from-red-500 via-red-400 to-red-500',
      hoverGradient: 'from-red-400 via-red-300 to-red-400',
      darkGradient: 'from-red-600 via-red-500 to-red-600',
      darkHoverGradient: 'from-red-500 via-red-400 to-red-500',
      size: 'w-9 h-9',
      iconClass: 'text-white',
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 py-6 px-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">
              © {currentYear} Sahil&apos;s Portfolio. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 transform hover:-translate-y-0.5 
                  shadow-md hover:shadow-lg 
                  bg-gradient-to-br ${item.gradient} hover:${item.hoverGradient}
                  dark:${item.darkGradient} dark:hover:${item.darkHoverGradient}
                  transition-all duration-300`}
                aria-label={item.label}
              >
                {React.cloneElement(item.icon, {
                  className: `${item.size} ${item.iconClass} transition-colors duration-200`,
                })}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-3 text-center md:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Based in Rajasthan, India • Open to remote opportunities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
