import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiImage, FiLoader, FiZoomIn } from 'react-icons/fi';
import { transparentPixel } from '../utils/placeholder';
import { ImageWithFallback } from '../utils/imageUtils.jsx';
import { getImagePath } from '../utils/imagePath';

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
  const [currentImagePath, setCurrentImagePath] = useState('');
  
  // Fallback transparent pixel for broken images
  const fallbackImage = transparentPixel;
  
  // Get the correct image path using the utility
  const getImageSource = (projectId, imgName) => {
    if (!imgName) return '';
    // If it's a full URL, return as is
    if (imgName.startsWith('http')) return imgName;
    // If it's a path to a project image
    if (projectId) {
      return getImagePath(`/images/projects/${projectFolders[projectId] || projectId}/${imgName}`);
    }
    // For other images, just use the path as is
    return getImagePath(imgName);
  };
  
  // Get the final image source
  const finalImagePath = getImageSource(projectId, imageName);

  // Set the image path when component mounts or dependencies change
  useEffect(() => {
    if (imageName) {
      try {
        const cleanImageName = imageName.trim().replace(/^[\/\\]+|[\.\/\\]+$/g, '');
        // Check if the path already has an image extension
        const hasExtension = /\.(avif|webp|png|jpg|jpeg|gif|svg)$/i.test(cleanImageName);
        const path = hasExtension ? cleanImageName : `${cleanImageName}.avif`;
        setCurrentImagePath(path);
        setError(false);
        setIsLoading(true);
      } catch (error) {
        console.error('Error constructing image path:', error);
        setError(true);
        setIsLoading(false);
      }
    }
  }, [projectId, imageName]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    console.error('Failed to load image:', e.target.src);
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

  // Get the final image source with proper path handling
  const imageSrc = projectId && currentImagePath 
    ? getImagePath(`/images/projects/${projectFolders[projectId] || projectId}/${currentImagePath}`)
    : getImagePath(currentImagePath);

  return (
    <figure 
      className={`relative ${fullWidth ? 'w-full' : 'max-w-full'} ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading state */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl">
          <FiLoader className="w-8 h-8 text-gray-400 dark:text-gray-600 animate-spin" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
          <FiImage className="w-12 h-12 text-gray-300 dark:text-gray-600" />
        </div>
      )}

      {/* Image */}
      <div className={`relative w-full transition-all duration-300 ${
        isLoading || error ? 'opacity-0' : 'opacity-100'
      } ${zoomOnHover ? 'hover:scale-105' : ''}`}>
        <div className={`relative w-full h-full ${objectFit === 'cover' ? 'overflow-hidden' : ''} ${
          bordered ? 'border border-gray-200 dark:border-gray-700' : ''
        } ${shadow ? 'shadow-lg' : ''} rounded-${rounded}`}>
          <ImageWithFallback
            src={imageSrc}
            alt={alt}
            className={`w-full h-full ${
              objectFit === 'cover' ? 'object-cover' : 
              objectFit === 'contain' ? 'object-contain' : 'object-scale-down'
            } ${className}`}
            style={{ aspectRatio }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fallbackSrc={fallbackImage}
          />
        </div>
        
        {/* Hover overlay with action buttons */}
        {lightbox && (
          <div className={`absolute inset-0 bg-black/0 transition-all duration-300 flex items-center justify-center gap-4 ${
            isHovered ? 'bg-black/30 opacity-100' : 'opacity-0'
          }`}>
            <button 
              className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-800 dark:text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
              onClick={() => window.open(imageSrc, '_blank')}
              aria-label="View full size"
            >
              <FiZoomIn className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <h3 className="text-lg font-semibold">{alt}</h3>
              {caption && <p className="text-sm opacity-90">{caption}</p>}
            </div>
          </div>
        )}
      </div>
      
      {/* Caption */}
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
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
