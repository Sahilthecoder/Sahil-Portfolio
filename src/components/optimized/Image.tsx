import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(blurDataURL || src);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleLoad = () => {
    if (isMounted) {
      setIsLoading(false);
      if (onLoad) onLoad();
    }
  };

  const handleError = () => {
    if (isMounted) {
      if (onError) onError();
      // Fallback to original src if WebP fails
      if (imageSrc.endsWith('.webp')) {
        const fallbackSrc = src.replace(/\.webp$/, '.jpg');
        setImageSrc(fallbackSrc);
      }
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string): string => {
    if (!baseSrc) return '';
    
    const extension = baseSrc.split('.').pop();
    const basePath = baseSrc.replace(`.${extension}`, '');
    
    if (extension === 'svg') return ''; // Skip srcset for SVGs
    
    const densities = [1, 2, 3];
    return densities
      .map(density => {
        const densitySrc = `${basePath}${density > 1 ? `@${density}x` : ''}.${extension}`;
        return `${densitySrc} ${density}x`;
      })
      .join(', ');
  };

  const srcSet = generateSrcSet(src);
  const webpSrc = src.replace(/\.(jpg|jpeg|png)/, '.webp');
  const webpSrcSet = generateSrcSet(webpSrc);

  const imageClasses = clsx(
    'transition-opacity duration-300',
    {
      'opacity-0': isLoading,
      'opacity-100': !isLoading,
    },
    className
  );

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        backgroundColor: isLoading ? '#f3f4f6' : 'transparent',
      }}
    >
      {placeholder === 'blur' && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={clsx(
            'absolute inset-0 w-full h-full object-cover',
            { 'opacity-100': isLoading, 'opacity-0': !isLoading }
          )}
        />
      )}
      
      <picture>
        {webpSrcSet && (
          <source
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={sizes}
          />
        )}
        <img
          src={imageSrc}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          loading={loading}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          {...props}
        />
      </picture>
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  sizes: PropTypes.string,
  priority: PropTypes.bool,
  placeholder: PropTypes.oneOf(['blur', 'empty']),
  blurDataURL: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default OptimizedImage;
