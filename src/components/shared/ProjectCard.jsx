import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ 
  project, 
  className = '', 
  onClick, 
  isInSwiper = false,
  index = 0,
  showViewButton = true
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  // Handle image load and error states
  useEffect(() => {
    if (!project) return;
    
    const img = new Image();
    const imageUrl = project.previewImage || project.image;
    
    // Skip if no image URL
    if (!imageUrl) {
      setIsImageError(true);
      return;
    }
    
    img.src = imageUrl;
    
    img.onload = () => {
      setIsImageLoaded(true);
      if (imageRef.current) {
        imageRef.current.src = img.src;
      }
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${imageUrl}`);
      setIsImageError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [project]);

  // Handle card click
  const handleCardClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button, a')) {
      return;
    }
    
    if (onClick) {
      onClick(project, e);
      return;
    }

    if (project.link) {
      if (project.link.startsWith('http') || project.link.startsWith('//') || project.isExternal) {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      } else {
        const path = project.link.startsWith('/') ? project.link : `/${project.link}`;
        navigate(path);
      }
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }),
    hover: {
      y: -5,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  // If no project data, return null
  if (!project) return null;

  return (
    <motion.div
      className={`relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col ${className}`}
      onClick={handleCardClick}
      variants={!isInSwiper ? cardVariants : undefined}
      initial="hidden"
      animate="visible"
      whileHover={!isInSwiper ? "hover" : undefined}
      custom={index}
    >
      {/* Image Container */}
      <div className="relative pt-[56.25%] overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!isImageError && (
          <img
            ref={imageRef}
            src={project.previewImage || project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}
        
        {/* Fallback if image fails to load */}
        {isImageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-400 dark:text-gray-500">No preview available</span>
          </div>
        )}
        
        {/* Tags */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>
        
        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          {showViewButton && (
            <button 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(e);
              }}
            >
              View Project
              <FaExternalLinkAlt className="ml-1.5" size={12} />
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={18} />
              </a>
            )}
            
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
