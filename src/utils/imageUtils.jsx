/**
 * Utility functions for handling image paths in the application
 */

// Import the enhanced getImagePath utility
import { getImagePath as getImagePathUtil } from './imagePath';

/**
 * Gets the correct image path based on the environment
 * @param {string} path - The image path (can be relative or absolute)
 * @returns {string} The formatted image path
 */
const getImagePath = (path) => {
  return getImagePathUtil(path);
};

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// Import the optimized image manifest (use empty object if not available)
let optimizedImages = {};
let isImagesLoaded = false;
let loadPromise = null;

async function loadOptimizedImages() {
  if (isImagesLoaded) return optimizedImages;
  
  // If a load is already in progress, return the promise
  if (loadPromise) return loadPromise;
  
  loadPromise = (async () => {
    try {
      // In development, use an empty manifest to avoid unnecessary requests
      if (import.meta.env.DEV) {
        optimizedImages = {};
      } else {
        // In production, try to load the manifest
        const manifest = await import('../../public/optimized/manifest.json');
        optimizedImages = manifest.default || {};
      }
      isImagesLoaded = true;
      return optimizedImages;
    } catch (error) {
      console.warn('Could not load optimized image manifest. Using fallback image paths.');
      optimizedImages = {};
      isImagesLoaded = true;
      return optimizedImages;
    }
  })();
  
  return loadPromise;
}

// Start loading images immediately in production
if (!import.meta.env.DEV) {
  loadOptimizedImages().catch(error => {
    console.error('Error loading optimized images:', error);
  });
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
 * @param {boolean} preload - Whether to preload the image
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
  preload = false,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(() => getImagePath(src));
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  
  // Handle preloading if enabled
  useEffect(() => {
    if (preload && src) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = getImagePath(src);
      
      // Add the preload link to the document head
      document.head.appendChild(preloadLink);
      
      // Clean up the preload link when the component unmounts
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [src, preload]);
  
  // Handle image source changes
  useEffect(() => {
    if (src) {
      setImageSrc(getImagePath(src));
      setHasError(false);
    }
    
    // Clean up function to prevent memory leaks
    return () => {
      // Any cleanup if needed
    };
  }, [src]);

  // Ensure sizes is an array
  const safeSizes = Array.isArray(sizes) ? sizes : [];
  
  // Get optimized image sources with error handling
  const optimizedImage = useMemo(() => {
    try {
      return getOptimizedImage(imageSrc, { sizes: safeSizes });
    } catch (error) {
      console.warn('Error optimizing image:', error);
      return { 
        src: getImagePath(imageSrc), 
        srcSet: '', 
        sizes: safeSizes.join(', ') 
      };
    }
  }, [imageSrc, safeSizes]);

  const handleError = useCallback((e) => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      const fallback = getImagePath(fallbackSrc);
      
      // Only update if the fallback is different from the current src
      if (fallback !== imageSrc) {
        setImageSrc(fallback);
      }
      
      // If the error persists with the fallback, log it
      if (imgRef.current) {
        const originalOnError = imgRef.current.onerror;
        imgRef.current.onerror = (errorEvent) => {
          console.error('Fallback image failed to load:', fallback, errorEvent);
          
          // Restore original onerror handler if it exists
          if (typeof originalOnError === 'function') {
            return originalOnError.call(imgRef.current, errorEvent);
          }
          
          return false;
        };
      }
    }
  }, [fallbackSrc, hasError, imageSrc]);

  // Ensure we have a valid alt text
  const safeAlt = alt || 'Image';
  
  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : loading;
  
  // Add fetchpriority for critical images
  const fetchPriority = priority ? 'high' : 'auto';

  // Combine all props with proper precedence
  const imgProps = {
    ref: imgRef,
    src: optimizedImage.src,
    srcSet: optimizedImage.srcSet || undefined,
    sizes: optimizedImage.sizes,
    alt: safeAlt,
    className,
    loading: loadingStrategy,
    decoding,
    width,
    height,
    onError: handleError,
    ...(priority && { fetchPriority: 'high' }),
    ...rest
  };
  
  // Add ARIA attributes if alt is provided
  if (alt) {
    imgProps['aria-label'] = alt;
    imgProps.role = 'img';
  } else {
    imgProps['aria-hidden'] = 'true';
    imgProps.role = 'presentation';
  }
  
  return <img {...imgProps} />;
};

// Export components as named exports
export { ImageWithFallback, getImagePath };
