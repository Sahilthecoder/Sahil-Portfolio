/**
 * Utility functions for handling image paths in the application
 */

import { useState, useEffect, useRef, useCallback } from 'react';

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

/**
 * Simple wrapper for getImagePath to maintain compatibility
 * @param {string} src - Image source path
 * @param {Object} options - Options object (ignored in this implementation)
 * @returns {Object} Object with src and empty srcSet and sizes
 */
const getOptimizedImage = (src, options = {}) => {
  return {
    src: getImagePath(src),
    srcSet: '',
    sizes: '',
  };
};

/**
 * Creates an image with error handling and lazy loading
 * @param {string} src - The image source path
 * @param {string} alt - Alternative text for the image (required for accessibility)
 * @param {string} className - CSS class names
 * @param {string} fallbackSrc - Fallback image source
 * @param {string} loading - Loading strategy ('eager'|'lazy')
 * @param {string} decoding - Decoding hint ('async'|'sync'|'auto')
 * @param {number} width - Image width in pixels (for layout stability)
 * @param {number} height - Image height in pixels (for layout stability)
 * @param {boolean} priority - Whether to prioritize loading (sets loading=eager and fetchpriority=high)
 * @param {Object} rest - Additional props to pass to the img element
 * @returns {JSX.Element} Image component with error handling
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
  priority = false,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  // Handle image loading state
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle image errors
  const handleError = useCallback(() => {
    console.error(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoading(false);
  }, [src]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Get the image URL
  const imageUrl = hasError ? getImagePath(fallbackSrc) : getImagePath(src);

  // Calculate aspect ratio for placeholder
  const aspectRatio = width && height ? (height / width) * 100 : 0;
  const paddingBottom = aspectRatio ? `${aspectRatio}%` : '0';

  return (
    <div
      ref={imageRef}
      className={`image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: isLoading ? '#f5f5f5' : 'transparent',
        ...(width && { width: `${width}px` }),
        ...(height && { height: `${height}px` }),
      }}
    >
      {/* Placeholder with aspect ratio */}
      {isLoading && aspectRatio > 0 && (
        <div
          style={{
            paddingBottom,
            backgroundColor: '#f5f5f5',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoading ? 1 : 0,
          }}
        />
      )}

      {/* Actual image - only render when in view or eager loading */}
      {(isInView || loading === 'eager') && (
        <img
          src={imageUrl}
          alt={alt}
          className={`image-content ${isLoading ? 'image-loading' : 'image-loaded'}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            ...(priority && { fetchPriority: 'high' }),
          }}
          loading={loading}
          decoding={decoding}
          onError={handleError}
          onLoad={handleLoad}
          {...rest}
        />
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div
          className="image-loading-indicator"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#999',
            fontSize: '0.8rem',
          }}
        >
          Loading...
        </div>
      )}

      {/* Fallback for failed images */}
      {hasError && (
        <div
          className="image-fallback"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666',
            fontSize: '0.8rem',
          }}
        >
          {alt || 'Image not available'}
        </div>
      )}
    </div>
  );
};

// Export components as named exports
export { ImageWithFallback, getImagePath };
