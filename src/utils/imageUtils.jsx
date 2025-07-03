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
  
  // Get base URL from Vite config (fallback to '/' if not set)
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  
  // Remove leading slashes to prevent double slashes
  const cleanPath = path.replace(/^[\/\\]+/, '');
  
  // In development, use the path as is
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, prepend the base URL
  return `${baseUrl}/${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
};

import { useState, useEffect, useCallback, useMemo } from 'react';

// Import the optimized image manifest (use empty object if not available)
let optimizedImages = {};
try {
  optimizedImages = import.meta.env.DEV 
    ? {}
    : (await import('../../public/optimized/manifest.json')).default || {};
} catch (error) {
  console.warn('Could not load optimized image manifest. Using fallback image paths.');
  optimizedImages = {};
}

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
  fallbackSrc = '/images/placeholder.svg',
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  sizes = [],
  priority = false,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Ensure sizes is an array
  const safeSizes = Array.isArray(sizes) ? sizes : [];
  
  // Get optimized image sources with error handling
  const optimizedImage = useMemo(() => {
    try {
      return getOptimizedImage(imgSrc, { sizes: safeSizes });
    } catch (error) {
      console.warn('Error optimizing image:', error);
      return { 
        src: getImagePath(imgSrc), 
        srcSet: '', 
        sizes: safeSizes.join(', ') 
      };
    }
  }, [imgSrc, safeSizes]);

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = useCallback(() => {
    if (!hasError && fallbackSrc && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  }, [fallbackSrc, hasError, imgSrc]);

  // Ensure we have a valid alt text
  const safeAlt = alt || 'Image';
  
  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : loading;
  
  // Add fetchpriority for critical images
  const fetchPriority = priority ? 'high' : 'auto';

  return (
    <img
      src={optimizedImage.src}
      srcSet={optimizedImage.srcSet || undefined}
      sizes={optimizedImage.sizes}
      alt={safeAlt}
      className={className}
      onError={handleError}
      loading={loadingStrategy}
      decoding={decoding}
      width={width}
      height={height}
      fetchpriority={fetchPriority}
      {...rest}
      // Add role and aria-label if alt is provided
      {...(alt && { 'aria-label': alt })}
      // Add role if it's a decorative image
      {...(alt === '' && { 'aria-hidden': 'true', role: 'presentation' })}
    />
  );
};

// Export components as named exports
export { ImageWithFallback, getImagePath };
