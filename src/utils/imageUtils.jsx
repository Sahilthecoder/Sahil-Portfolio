/**
 * Utility functions for handling image paths in the application
 */

/**
 * Gets the correct image path based on the environment
 * @param {string} path - The image path (can be relative or absolute)
 * @returns {string} The formatted image path
 */
const getImagePath = (path) => {
  if (!path) return '';
  
  // Handle absolute URLs and data URIs
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Remove any query parameters from the path
  const cleanPath = path.split('?')[0];
  
  // In development, use the path as is
  if (import.meta.env.DEV) {
    return `/${cleanPath.replace(/^[\/\\]+/, '')}`;
  }
  
  // In production, use the base URL from Vite config
  // For GitHub Pages, ensure the path is correct by removing any duplicate slashes
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const cleanBase = baseUrl.endsWith('/Sahil-Portfolio') ? baseUrl : `${baseUrl}/Sahil-Portfolio`;
  
  // Construct the final URL, ensuring no double slashes
  const finalPath = `/${cleanPath.replace(/^[\/\\]+/, '')}`;
  return `${cleanBase}${finalPath}`.replace(/([^:]\/)\/+/g, '$1');
};

import { useState, useEffect, useCallback, useMemo } from 'react';

// Import the optimized image manifest (use empty object if not available)
let optimizedImages = {};
let isImagesLoaded = false;

async function loadOptimizedImages() {
  if (isImagesLoaded) return optimizedImages;
  
  try {
    optimizedImages = import.meta.env.DEV 
      ? {}
      : (await import('../../public/optimized/manifest.json')).default || {};
  } catch (error) {
    console.warn('Could not load optimized image manifest. Using fallback image paths.');
    optimizedImages = {};
  }
  
  isImagesLoaded = true;
  return optimizedImages;
}

// Start loading images immediately
loadOptimizedImages();

/**
 * Gets the optimized image path with responsive variants
 * @param {string} src - Original image path
 * @param {Object} options - Options for responsive images
 * @returns {Object} Object containing srcSet and sizes attributes
 */
const getOptimizedImage = (src, { maxWidth = 1920, sizes } = {}) => {
  // Ensure sizes is an array
  const safeSizes = Array.isArray(sizes) ? sizes : [];
  if (!src) return { src: '', srcSet: '', sizes: '' };
  
  // Skip if it's an external URL or data URI
  if (src.startsWith('http') || src.startsWith('data:')) {
    return { src, srcSet: '', sizes: safeSizes.join(', ') };
  }

  // In development, just return the original source with the correct path
  if (import.meta.env.DEV || !Object.keys(optimizedImages).length) {
    return { 
      src: getImagePath(src),
      srcSet: '',
      sizes: safeSizes.join(', ')
    };
  }

  // Get the base path without query parameters or hashes
  const cleanSrc = src.split('?')[0].split('#')[0];
  const imageName = cleanSrc.split('/').pop().split('.')[0];
  
  // Check if the image exists in the optimized manifest
  const optimizedVersions = optimizedImages.images?.find(img => 
    img.original.includes(imageName)
  );
  
  if (!optimizedVersions) {
    return { 
      src: getImagePath(src),
      srcSet: '',
      sizes: safeSizes.join(', ')
    };
  }

  // In production, try to use the optimized versions
  try {
    // Generate srcSet for responsive images if available
    const srcSet = optimizedVersions.sources
      ?.map(source => `${getImagePath(source.src)} ${source.width}w`)
      .filter(Boolean)
      .join(', ');

    return {
      src: getImagePath(optimizedVersions.optimized || src),
      srcSet: srcSet || '',
      sizes: safeSizes.length ? safeSizes.join(', ') : '(max-width: 1920px) 100vw, 1920px'
    };
  } catch (error) {
    console.warn('Error generating optimized image:', error);
    return { 
      src: getImagePath(src),
      srcSet: '',
      sizes: safeSizes.join(', ')
    };
  }
};

/**
 * Creates an image with error handling, lazy loading, and responsive support
 * @param {string} src - The image source path
 * @param {string} alt - Alternative text for the image (required for accessibility)
 * @param {string} className - CSS class names
 * @param {string} fallbackSrc - Fallback image source
 * @param {string} loading - Loading strategy ('eager'|'lazy')
 * @param {string} decoding - Decoding hint ('async'|'sync'|'auto')
 * @param {number} width - Image width in pixels (for layout stability)
 * @param {number} height - Image height in pixels (for layout stability)
 * @param {Array} sizes - Array of size definitions for responsive images
 * @param {boolean} priority - Whether to prioritize loading (sets loading=eager and fetchpriority=high)
 * @param {Object} rest - Additional props to pass to the img element
 * @returns {JSX.Element} Image component with error handling and optimizations
 */
const ImageWithFallback = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = '/images/fallback-image.jpg',
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  sizes = [],
  priority = false,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Process the image source
  const processedSrc = useMemo(() => {
    if (!src) return '';
    // If src is already a full URL or data URI, use it as is
    if (src.startsWith('http') || src.startsWith('data:')) {
      return src;
    }
    // Otherwise, process it with getImagePath
    return getImagePath(src);
  }, [src]);
  
  // Process the fallback source
  const processedFallback = useMemo(() => {
    if (!fallbackSrc) return '';
    // If fallbackSrc is already a full URL or data URI, use it as is
    if (fallbackSrc.startsWith('http') || fallbackSrc.startsWith('data:')) {
      return fallbackSrc;
    }
    // Otherwise, process it with getImagePath
    return getImagePath(fallbackSrc);
  }, [fallbackSrc]);
  
  // Handle image loading errors
  const handleError = useCallback((e) => {
    console.warn(`Failed to load image: ${processedSrc}`);
    setError('Failed to load image');
    if (processedFallback && processedFallback !== processedSrc) {
      setImgSrc(processedFallback);
      // Reset error state when fallback is set
      setError(null);
    } else {
      // If no fallback, set a default image
      setImgSrc('/images/fallback-image.jpg');
    }
    setIsLoading(false);
  }, [processedSrc, processedFallback]);
  
  // Handle successful image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);
  
  // Reset loading state when src changes
  useEffect(() => {
    if (processedSrc) {
      setImgSrc(processedSrc);
      setIsLoading(true);
      setError(null);
    } else if (processedFallback) {
      setImgSrc(processedFallback);
      setIsLoading(true);
    }
  }, [processedSrc, processedFallback]);
  
  // If no source is provided, return null
  if (!src && !fallbackSrc) {
    console.warn('ImageWithFallback: No image source provided');
    return null;
  }
  
  // If we have an error and no fallback, return a placeholder
  if (error && !processedFallback) {
    return (
      <div 
        className={`image-placeholder ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '200px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          ...(rest.style || {})
        }}
        aria-hidden={!alt}
      >
        {alt || 'Image not available'}
      </div>
    );
  }
  
  // Get responsive image attributes if sizes are provided
  const responsiveAttrs = sizes.length > 0 
    ? getOptimizedImage(processedSrc || processedFallback, { sizes })
    : {};
  
  // If we have no source to display, return null
  if (!imgSrc) {
    return null;
  }
  
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'loading' : ''}`}
      loading={priority ? 'eager' : loading}
      decoding={decoding}
      width={width}
      height={height}
      onError={handleError}
      onLoad={handleLoad}
      style={{
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
        ...(rest.style || {})
      }}
      {...responsiveAttrs}
      {...rest}
    />
  );
};

// Export components as named exports
export { ImageWithFallback, getImagePath };
