import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomeProjectCard = ({ project, index }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
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
    
    if (project.link) {
      if (project.link.startsWith('http') || project.link.startsWith('//') || project.isExternal) {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      } else {
        const path = project.link.startsWith('/') ? project.link : `/${project.link}`;
        navigate(path);
      }
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative h-full min-h-[420px] rounded-2xl overflow-hidden group flex flex-col cursor-pointer"
      style={{
        transform: 'perspective(1500px)',
        transformStyle: 'preserve-3d',
        transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.1, 1.1)',
        boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.1)',
        willChange: 'transform, box-shadow',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased',
        border: '2px solid transparent',
        '--neon-color': 'rgba(99, 102, 241, 0.8)'
      }}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / 15) * 1.5;
        const rotateX = ((centerY - y) / 15) * 1.5;
        
        card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale3d(1.02, 1.02, 1.02)`;
        card.style.borderImage = 'linear-gradient(45deg, rgba(99, 102, 241, 0.8), #9333ea, rgba(99, 102, 241, 0.8)) 1';
        card.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.4)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = '0 15px 35px -10px rgba(0, 0, 0, 0.1)';
        card.style.borderImage = 'none';
      }}
      onClick={handleCardClick}
    >
      {/* Image container with hover effect */}
      <div className="relative aspect-video overflow-hidden">
        {!isImageError ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: 'translateZ(30px)',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s cubic-bezier(0.2, 0.9, 0.1, 1.1)'
              }}
              onError={() => setIsImageError(true)}
            />
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">Image not available</span>
          </div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-5 flex-1 flex flex-col bg-white dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 min-h-[3.5rem]">
          {project.description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {project.tags?.slice(0, 3).map((tag, i) => (
                <span 
                  key={i}
                  className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 rounded-full border border-gray-200 dark:border-gray-600/50"
                >
                  {tag}
                </span>
              ))}
              {project.tags?.length > 3 && (
                <span 
                  className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-500/30"
                  title={project.tags.slice(3).join(', ')}
                >
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProjectCard;
