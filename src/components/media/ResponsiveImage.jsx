import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { generateSrcSet, generateSizes, lazyLoadImages } from '../../utils/imageUtils';

/**
 * ResponsiveImage component that handles responsive images with lazy loading
 */
const ResponsiveImage = ({
  src,
  srcSet,
  sizes,
  alt = '',
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  onError,
  placeholder,
  showLoading = true,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(loading !== 'eager');
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  // Process image source - add repository name for local paths
  const processImagePath = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return `/Sahil-Portfolio${path.startsWith('/') ? '' : '/'}${path}`;
  };

  // Handle image error
  const handleError = (e) => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (loading !== 'lazy' || !imgRef.current) {
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '200px',
          threshold: 0.01,
        }
      );

      observer.observe(imgRef.current);
      observerRef.current = observer;

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsInView(true);
    }
  }, [loading]);

  // Process srcSet if provided
  const processSrcSet = (srcSetStr) => {
    if (!srcSetStr) return '';
    return srcSetStr.split(',').map(src => {
      const [url, descriptor] = src.trim().split(' ');
      return `${processImagePath(url)}${descriptor ? ' ' + descriptor : ''}`;
    }).join(',');
  };

  // Generate srcSet if not provided
  const finalSrcSet = srcSet ? processSrcSet(srcSet) : (src ? `${processImagePath(src)} 1x` : '');

  // Generate sizes if not provided
  const finalSizes = sizes || '100vw';

  // Determine the source to use
  const shouldLoadImage = loading !== 'lazy' || isInView;
  const imgSrc = shouldLoadImage ? processImagePath(src) : undefined;
  const imgSrcSet = shouldLoadImage ? finalSrcSet : undefined;

  // Generate placeholder if needed
  const placeholderStyle = {
    backgroundColor: placeholder?.backgroundColor || '#f3f4f6',
    backgroundImage: placeholder?.backgroundImage 
      ? `url("${placeholder.backgroundImage}")` 
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: placeholder?.textColor || '#9ca3af',
    fontSize: '0.875rem',
  };

  return (
    <div 
      className={`responsive-image-container ${className}`}
      style={{ 
        position: 'relative',
        width: '100%',
        paddingBottom: width && height ? `${(height / width) * 100}%` : '0',
        overflow: 'hidden',
      }}
    >
      {/* Loading/placeholder state */}
      {(isLoading || !shouldLoadImage) && showLoading && (
        <div 
          className="image-placeholder" 
          style={{
            ...placeholderStyle,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          aria-hidden="true"
        >
          {placeholder?.text && <span>{placeholder.text}</span>}
        </div>
      )}

      {/* Error state */}
      {hasError ? (
        <div 
          className="image-error"
          style={{
            ...placeholderStyle,
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          role="alert"
          aria-label="Error loading image"
        >
          <span>Error loading image</span>
        </div>
      ) : (
        /* Actual image */
        <img
          ref={imgRef}
          src={imgSrc}
          srcSet={imgSrcSet}
          sizes={finalSizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
          {...props}
        />
      )}
    </div>
  );
};

ResponsiveImage.propTypes = {
  /** Image source URL */
  src: PropTypes.string.isRequired,
  /** Image source set for responsive images */
  srcSet: PropTypes.string,
  /** Sizes attribute for responsive images */
  sizes: PropTypes.string,
  /** Alt text for the image (required for accessibility) */
  alt: PropTypes.string.isRequired,
  /** Image width */
  width: PropTypes.number,
  /** Image height */
  height: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Loading behavior (lazy, eager) */
  loading: PropTypes.oneOf(['lazy', 'eager']),
  /** Decoding behavior (async, sync, auto) */
  decoding: PropTypes.oneOf(['async', 'sync', 'auto']),
  /** Callback when image loads */
  onLoad: PropTypes.func,
  /** Callback when image fails to load */
  onError: PropTypes.func,
  /** Placeholder configuration */
  placeholder: PropTypes.shape({
    /** Background color for the placeholder */
    backgroundColor: PropTypes.string,
    /** Background image for the placeholder */
    backgroundImage: PropTypes.string,
    /** Text to display on the placeholder */
    text: PropTypes.string,
    /** Text color for the placeholder */
    textColor: PropTypes.string,
  }),
  /** Whether to show loading state */
  showLoading: PropTypes.bool,
};

export default ResponsiveImage;
