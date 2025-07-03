import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FiImage, FiLoader, FiZoomIn, FiAlertCircle } from 'react-icons/fi';
import { ImageWithFallback } from '../utils/imageUtils.jsx';
import { getImagePath, preloadImage } from '../utils/imagePath';

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
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  
  // Fallback image for broken images
  const fallbackImage = useMemo(() => getImagePath('images/placeholder-project.jpg'), []);
  
  // Preload the fallback image on component mount
  useEffect(() => {
    preloadImage('images/placeholder-project.jpg').catch(() => {
      console.warn('Failed to preload fallback image');
    });
  }, []);
  
  // Get the correct image path using the utility
  const getImageSource = useCallback(() => {
    if (!imageName) return { path: '', isProjectImage: false };
    
    // If it's already a full URL or data URI, return as is
    if (typeof imageName === 'string' && (imageName.startsWith('http') || imageName.startsWith('data:'))) {
      return { path: imageName, isProjectImage: false };
    }
    
    // If it's a path to a project image
    if (projectId && projectFolders[projectId]) {
      const projectFolder = projectFolders[projectId];
      const cleanImageName = imageName.trim().replace(/^[\/\\]+|[\.\/\\]+$/g, '');
      return { 
        path: `images/projects/${projectFolder}/${cleanImageName}`,
        isProjectImage: true
      };
    }
    
    // For other images, ensure they're in the images directory
    if (typeof imageName === 'string') {
      const path = imageName.startsWith('images/') ? imageName : `images/${imageName}`;
      return { path, isProjectImage: false };
    }
    
    return { path: '', isProjectImage: false };
  }, [projectId, imageName]);
  
  // Set the image path when component mounts or dependencies change
  useEffect(() => {
    const { path: source, isProjectImage } = getImageSource();
    
    if (source) {
      // Reset states
      setError(false);
      setIsLoading(true);
      setHasTriedFallback(false);
      
      // Preload the image before setting it as the source
      const loadImage = async () => {
        try {
          // For project images, we'll let the ImageWithFallback handle the loading
          if (!isProjectImage) {
            await preloadImage(source);
          }
          setCurrentImagePath(getImagePath(source));
        } catch (err) {
          console.error('Failed to load image:', source, err);
          handleImageError({ target: { src: source } });
        }
      };
      
      loadImage();
    } else {
      setError(true);
      setIsLoading(false);
    }
  }, [getImageSource]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = useCallback((e) => {
    console.error('Failed to load image:', e.target.src);
    
    // If we haven't tried the fallback yet, try it
    if (!hasTriedFallback && fallbackImage) {
      console.log('Attempting to load fallback image...');
      setHasTriedFallback(true);
      setError(false);
      setIsLoading(true);
      
      // Small delay to allow state updates before setting the fallback
      setTimeout(() => {
        setCurrentImagePath(fallbackImage);
      }, 0);
    } else {
      // If we've already tried the fallback or don't have one, show error state
      console.error('Fallback image also failed to load or not available');
      setError(true);
      setIsLoading(false);
    }
  }, [fallbackImage, hasTriedFallback]);

  const handleImageError = useCallback((e) => {
    if (!error) {
      handleError(e);
    }
  }, [error, handleError]);

  const roundedClass = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  }[rounded] || 'rounded-xl';

  // Use the current image path directly as it's already processed
  const imageSrc = currentImagePath;

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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
          <FiAlertCircle className="w-12 h-12 text-red-400 dark:text-red-500 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
          {!hasTriedFallback && fallbackImage && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Loading fallback...</p>
          )}
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

ProjectImage.defaultProps = {
  className: '',
  caption: '',
  containerClassName: '',
  aspectRatio: '16/9',
  showOverlay: false,
  zoomOnHover: true,
  priority: false,
  fullWidth: false,
  bordered: true,
  shadow: true,
  rounded: 'xl',
  objectFit: 'cover',
  lightbox: false
};

// Add display name for better debugging
ProjectImage.displayName = 'ProjectImage';

ProjectImage.propTypes = {
  /** Unique identifier for the project to determine the correct image folder */
  projectId: PropTypes.string.isRequired,
  
  /** Name of the image file (including extension) */
  imageName: PropTypes.string.isRequired,
  
  /** Alternative text for the image (required for accessibility) */
  alt: PropTypes.string.isRequired,
  
  /** Additional CSS classes for the image element */
  className: PropTypes.string,
  
  /** Optional caption text displayed below the image */
  caption: PropTypes.string,
  
  /** Additional CSS classes for the container element */
  containerClassName: PropTypes.string,
  
  /** Aspect ratio of the image (e.g., '16/9', '4/3', '1/1') */
  aspectRatio: PropTypes.string,
  
  /** Whether to show an overlay with the image title and caption on hover */
  showOverlay: PropTypes.bool,
  
  /** Whether to apply a zoom effect on hover */
  zoomOnHover: PropTypes.bool,
  
  /** Whether to prioritize loading of this image */
  priority: PropTypes.bool,
  
  /** Whether the image should take up the full width of its container */
  fullWidth: PropTypes.bool,
  
  /** Whether to show a border around the image */
  bordered: PropTypes.bool,
  
  /** Whether to apply a shadow effect */
  shadow: PropTypes.bool,
  
  /** Border radius size */
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  
  /** How the image should be resized to fit its container */
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  
  /** Whether to show a lightbox button that opens the image in a new tab */
  lightbox: PropTypes.bool
};

export default ProjectImage;
