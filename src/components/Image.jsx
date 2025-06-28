import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  ...props
}) => {
  const isExternal = src.startsWith('http');
  const imagePath = isExternal ? src : src.replace(/\.[^/.]+$/, '');
  
  // Generate srcSet for different resolutions
  const getSrcSet = (ext) => {
    if (isExternal) return null;
    const densities = [1, 2, 3];
    return densities
      .map(density => `${imagePath}@${density}x${ext} ${density}x`)
      .join(', ');
  };

  return (
    <picture className={className}>
      {/* WebP format */}
      {!isExternal && (
        <source
          type="image/webp"
          srcSet={`${imagePath}.webp, ${getSrcSet('.webp')}`}
          sizes={sizes}
        />
      )}
      
      {/* Fallback to original format */}
      <source
        srcSet={`${src}${!isExternal ? `, ${getSrcSet('')}` : ''}`}
        sizes={sizes}
      />
      
      <img
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
        {...props}
      />
    </picture>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  sizes: PropTypes.string,
};

export default Image;
