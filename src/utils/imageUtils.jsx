import { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl } from './imageOptimization';

export const getImagePath = (type = '', subfolder = '', filename) => {
  if (!filename) return '';
  if (import.meta.env.DEV) {
    return `/images/${type}${subfolder ? `/${subfolder}` : ''}/${filename}`;
  }
  return `${import.meta.env.BASE_URL || '/Sahil-Portfolio/'}images/${type}${subfolder ? `/${subfolder}` : ''}/${filename}`;
};

export const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const ImageWithFallback = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = '/images/fallback-image.jpg',
  loading: loadingProp = 'lazy',
  decoding = 'async',
  width,
  height,
  priority = false,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setImgSrc(fallbackSrc);
      setIsError(true);
      return;
    }

    const optimized = getOptimizedImageUrl(src, width, height, priority);
    setImgSrc(optimized);
    setIsLoading(true);
    setIsError(false);

    const img = new Image();
    img.src = optimized;

    let isMounted = true;

    img.onload = () => {
      if (isMounted) {
        setIsLoading(false);
        setIsError(false);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        setIsLoading(false);
        setIsError(true);
        setImgSrc(fallbackSrc);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc, width, height, priority]);

  const handleRetry = () => {
    if (src) {
      const retrySrc = getOptimizedImageUrl(src, width, height, priority);
      setImgSrc(retrySrc);
      setIsLoading(true);
      setIsError(false);
    }
  };

  const loading = priority ? 'eager' : loadingProp;
  const fetchPriority = priority ? 'high' : 'auto';

  return (
    <div
      className={`relative ${className}`}
      style={width || height ? { width, height } : undefined}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        fetchpriority={fetchPriority}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
            setIsError(true);
          }
        }}
        {...rest}
      />

      {isError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4 text-center"
          onClick={handleRetry}
        >
          <span className="text-red-500 mb-2">⚠️ Failed to load image</span>
          <button
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleRetry();
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
