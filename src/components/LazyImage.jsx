import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LazyImage = ({
  src,
  webpSrc,
  fallbackSrc,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  decoding = 'async',
  sizes = '100vw',
  onError,
  onLoad,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle image loading and error states
  useEffect(() => {
    let isMounted = true;
    
    const loadImage = async () => {
      if (!src) return;
      
      const image = new Image();
      
      const handleLoad = () => {
        if (!isMounted) return;
        setIsLoaded(true);
        onLoad?.();
      };
      
      const handleError = () => {
        if (!isMounted) return;
        console.warn(`Failed to load image: ${src}`);
        setImgError(true);
        onError?.();
      };
      
      image.onload = handleLoad;
      image.onerror = handleError;
      
      // Start loading the image
      image.src = src;
      
      return () => {
        isMounted = false;
        image.onload = null;
        image.onerror = null;
      };
    };
    
    loadImage();
  }, [src, onLoad, onError]);

  // Determine which source to use
  const source = imgError ? (fallbackSrc || src) : src;
  
  // Only show the image when it's loaded
  if (!isLoaded && !imgError) {
    return null;
  }

  return (
    <picture>
      {/* WebP format with fallback to original if not supported */}
      {webpSrc && !imgError && (
        <source 
          srcSet={webpSrc} 
          type="image/webp"
          sizes={sizes}
        />
      )}
      
      {/* Fallback image */}
      <img
        src={source}
        alt={alt || ''}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        style={style}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        onError={(e) => {
          if (!imgError) {
            setImgError(true);
            onError?.();
          }
        }}
        onLoad={() => {
          if (!isLoaded) {
            setIsLoaded(true);
            onLoad?.();
          }
        }}
        {...props}
      />
    </picture>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
    webpSrc: PropTypes.string,
  fallbackSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  decoding: PropTypes.oneOf(['async', 'sync', 'auto']),
  sizes: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
};

export default LazyImage;
