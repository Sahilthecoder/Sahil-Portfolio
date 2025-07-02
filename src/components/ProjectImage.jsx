import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiImage, FiLoader, FiZoomIn } from 'react-icons/fi';
import { transparentPixel } from '../utils/placeholder';

const ProjectImage = ({
  projectId,
  imageName,
  alt,
  className = '',
  caption = '',
  containerClassName = '',
  aspectRatio = '16/9',
  showOverlay = false,
  zoomOnHover = true,
  priority = false,
  fullWidth = false,
  bordered = true,
  shadow = true,
  rounded = 'xl',
  objectFit = 'cover',
  lightbox = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Map project IDs to their corresponding folder names
  const projectFolders = {
    'zomato': 'Project1 excel',
    'bansal': 'Project2 tableau',
    'bansal-supermarket': 'Project2 tableau',
    'ekam': 'Project3 Sql+Sheets',
    'retail': 'Project4 Power BI',
    'ai-planner': 'Project5 Gpt+Notion',
    'automation-suite': 'Project6 Gpt+Zapier',
    'mahira-portfolio': 'Mahira Portfolio Web+AI',
    'product-sales': 'Project5 Gpt+Notion',
    'snape-sentiment-analysis': 'Project6 Gpt+Zapier',
    'ekam-attendance': 'Project3 Sql+Sheets',
    'retail-cash-flow': 'Project4 Power BI',
    'zomato-analysis': 'Project1 excel'
  };

  // Get the correct folder name from the mapping or use the projectId as fallback
  const folderName = projectFolders[projectId] || projectId;
  
  // Clean up the image name by removing leading/trailing slashes and spaces
  const cleanImageName = imageName ? imageName.trim().replace(/^[\/\\]+|[\.\/\\]+$/g, '') : '';
  
  // Construct the image path with the correct base path for production
  const basePath = import.meta.env.BASE_URL || '/';
  const imagePath = `${import.meta.env.BASE_URL}optimized-images/projects/${folderName}/${cleanImageName}`.replace(/\\/g, '/').replace(/([^:])\/+/g, '$1/');
  
  // Debug: Log the constructed image path
  console.log(`Loading image: ${imagePath}`);
  
  // Fallback to transparent pixel instead of placeholder.svg
  const fallbackImage = transparentPixel;
  
  // Calculate padding based on aspect ratio
  const [width, height] = aspectRatio.split('/').map(Number);
  const paddingBottom = `${(height / width) * 100}%`;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    console.error(`Failed to load image: ${imagePath}`, e);
    setError(true);
    setIsLoading(false);
    
    // If there's a fallback image and we haven't already tried it
    if (e.target.src !== fallbackImage) {
      e.target.src = fallbackImage;
      setError(false);
      setIsLoading(true);
    }
  };

  const handleImageError = (e) => {
    if (!error) {
      handleError(e);
    }
  };

  const roundedClass = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  }[rounded] || 'rounded-xl';

  return (
    <figure className={`relative ${fullWidth ? 'w-full' : 'max-w-full'} ${containerClassName}`}>
      <div 
        className={`relative w-full overflow-hidden transition-all duration-300 ${
          bordered ? 'border border-gray-200 dark:border-gray-700' : ''
        } ${shadow ? 'shadow-md hover:shadow-lg' : ''} ${roundedClass} ${
          zoomOnHover ? 'hover:scale-[1.01]' : ''
        } bg-gray-50 dark:bg-gray-800/50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative w-full" 
          style={{ paddingBottom: paddingBottom }}
        >
          {/* Loading state */}
          {isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <FiLoader className="w-8 h-8 text-gray-400 dark:text-gray-600 animate-spin" />
            </div>
          )}

          {/* Error state - use transparent pixel to avoid layout shifts */}
          {error && (
            <img 
              src={transparentPixel} 
              alt="" 
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            />
          )}

          {/* Image */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isLoading || error ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className={`relative w-full h-full ${objectFit === 'cover' ? 'overflow-hidden' : ''}`}>
              <img
                src={imagePath}
                alt={alt}
                className={`w-full h-full transition-all duration-300 ${
                  zoomOnHover ? 'group-hover:scale-105' : ''
                } ${className}`}
                style={{
                  objectFit: objectFit,
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
            
            {/* Hover overlay with action buttons */}
            <div className={`absolute inset-0 bg-black/0 transition-all duration-300 flex items-center justify-center gap-4 ${
              isHovered && lightbox ? 'bg-black/30 opacity-100' : 'opacity-0'
            }`}>
              {lightbox && (
                <button 
                  className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-800 dark:text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
                  onClick={() => window.open(imagePath, '_blank')}
                  aria-label="View full size"
                >
                  <FiZoomIn className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Gradient overlay */}
            {showOverlay && (
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 ${
                isHovered ? 'opacity-100' : 'opacity-80'
              } transition-opacity duration-300`} />
            )}
          </div>
        </div>
        
        {/* Caption */}
        {caption && (
          <figcaption className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
};

ProjectImage.propTypes = {
  projectId: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  caption: PropTypes.string,
  containerClassName: PropTypes.string,
  aspectRatio: PropTypes.string,
  showOverlay: PropTypes.bool,
  zoomOnHover: PropTypes.bool,
  priority: PropTypes.bool,
  fullWidth: PropTypes.bool,
  bordered: PropTypes.bool,
  shadow: PropTypes.bool,
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  objectFit: PropTypes.oneOf(['cover', 'contain']),
  lightbox: PropTypes.bool
};

export default ProjectImage;
