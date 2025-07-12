import { useState, useEffect } from 'react';

/**
 * Gets the correct image path based on the environment
 * @param {string} type - The type of image (e.g., 'projects', 'profile')
 * @param {string} subfolder - Optional subfolder
 * @param {string} filename - The image filename
 * @returns {string} The correct image path
 */
export const getImagePath = (type = '', subfolder = '', filename) => {
  if (!filename) return '';
  
  // In development, use relative paths
  if (import.meta.env.DEV) {
    return `/images/${type}${subfolder ? `/${subfolder}` : ''}/${filename}`;
  }
  // In production, use absolute paths with the base URL
  return `${import.meta.env.BASE_URL || '/Sahil-Portfolio/'}images/${type}${subfolder ? `/${subfolder}` : ''}/${filename}`;
};

/**
 * Preloads an image to ensure it's cached
 * @param {string} src - The image source URL
 * @returns {Promise<boolean>} - Resolves to true when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

/**
 * Creates an image with error handling and lazy loading
 * @param {Object} props - Component props
 * @param {string} props.src - The image source path
 * @param {string} [props.alt=''] - Alternative text for the image (required for accessibility)
 * @param {string} [props.className=''] - CSS class names
 * @param {string} [props.fallbackSrc='/images/fallback-image.jpg'] - Fallback image source
 * @param {('eager'|'lazy')} [props.loading='lazy'] - Loading strategy
 * @param {string} [props.decoding='async'] - Decoding hint
 * @param {number} [props.width] - Image width in pixels (for layout stability)
 * @param {number} [props.height] - Image height in pixels (for layout stability)
 * @param {boolean} [props.priority=false] - Whether to prioritize loading
 * @param {Object} [rest] - Additional props to pass to the img element
 * @returns {JSX.Element} Image component with error handling
 */
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
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  // Handle image loading and errors
  useEffect(() => {
    if (!src) {
      setImgSrc(fallbackSrc);
      return;
    }

    const img = new Image();
    let isMounted = true;

    const handleLoad = () => {
      if (isMounted) {
        setIsLoading(false);
        setIsError(false);
      }
    };

    const handleError = () => {
      if (isMounted) {
        setIsLoading(false);
        setIsError(true);
        setImgSrc(fallbackSrc);
      }
    };

    img.src = src;
    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  // Handle retry loading the image
  const handleRetry = () => {
    if (src && src !== imgSrc) {
      setIsLoading(true);
      setImgSrc(src);
    }
  };

  // Determine loading strategy
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
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        fetchpriority={fetchPriority}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
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
