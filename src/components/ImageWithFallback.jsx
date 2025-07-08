import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { preloadImage } from '../utils/imageUtils';

const ImageWithFallback = ({
  src,
  fallbackSrc = '/images/fallback-image.jpg',
  alt = '',
  className = '',
  width,
  height,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const success = await preloadImage(src);
        if (isMounted) {
          if (!success && fallbackSrc) {
            setImgSrc(fallbackSrc);
          } else {
            setImgSrc(src);
          }
        }
      } catch (error) {
        console.error('Error loading image:', error);
        if (isMounted && fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      width={width}
      height={height}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ImageWithFallback;
