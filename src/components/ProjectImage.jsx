import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiZoomIn } from 'react-icons/fi';
import { ImageWithFallback } from '../utils/imageUtils.jsx';
import getImagePath from '../utils/imagePaths';

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
  'ekam-attendance': 'Project3 Sql+Sheets',
  'retail-cash-flow': 'Project4 Power BI',
  'zomato-analysis': 'Project1 excel'
};

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
  const [isHovered, setIsHovered] = useState(false);

  // Get the project folder based on projectId
  const projectFolder = projectFolders[projectId] || projectId;

  // Use the getImagePath utility for consistent path handling
  const imagePath = getImagePath('project', projectId, imageName);

  // Handle different rounded corner classes
  const roundedClass = {
    none: 'rounded-none',
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
        style={{
          aspectRatio: aspectRatio.includes('/') 
            ? aspectRatio 
            : '16/9' // Default to 16:9 if invalid format
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Image */}
        <div className={`w-full h-full transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className={`relative w-full h-full ${objectFit === 'cover' ? 'overflow-hidden' : ''}`}>
            <ImageWithFallback
              src={imagePath}
              alt={alt}
              className={`w-full h-full ${
                objectFit === 'cover' ? 'object-cover' : 
                objectFit === 'contain' ? 'object-contain' : 'object-scale-down'
              } ${className}`}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fallbackSrc="/images/fallback-image.jpg"
            />
            
            {/* Hover overlay */}
            {(showOverlay || lightbox) && (
              <div 
                className={`absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : ''
                } flex items-center justify-center`}
              >
                <button 
                  className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-800 dark:text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
                  onClick={() => window.open(imagePath, '_blank')}
                  aria-label="View full size"
                >
                  <FiZoomIn className="w-5 h-5" />
                </button>
              </div>
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
