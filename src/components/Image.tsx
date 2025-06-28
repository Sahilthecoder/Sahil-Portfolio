import React from 'react';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { getCloudinaryUrl } from '../utils/cloudinary';

interface ImageProps extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'sizes'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className = '', loading = 'lazy', sizes = '100vw', ...props }) => {
  if (!src) {
    return null;
  }

  const isWebP = src.toLowerCase().endsWith('.webp');
  const isSVG = src.toLowerCase().endsWith('.svg');

  if (isSVG) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        {...props}
      />
    );
  }

  const cloudinarySrc = getCloudinaryUrl(src);

  // Generate srcSet for different resolutions
  const getSrcSet = (ext: string) => {
    const srcSet = [];
    // For local development, we don't need multiple resolutions
    if (import.meta.env.DEV) {
      return undefined;
    }
    
    // For production, generate responsive image sources
    const baseUrl = cloudinarySrc.replace(/\.[^/.]+$/, '');
    const resolutions = [
      { width: 400, dpr: 1 },
      { width: 800, dpr: 1 },
      { width: 1200, dpr: 1 },
      { width: 400, dpr: 2 },
      { width: 800, dpr: 2 },
      { width: 1200, dpr: 2 },
    ];

    for (const { width, dpr } of resolutions) {
      const dprSuffix = dpr > 1 ? `@${dpr}x` : '';
      const transform = `c_scale,w_${width},dpr_${dpr}`;
      srcSet.push(`${baseUrl}${dprSuffix}.${ext} ${width}w`);
    }

    return srcSet.join(', ');
  };

  // Get file extension
  const getFileExtension = (path: string) => {
    return path.split('.').pop()?.toLowerCase() || '';
  };

  const ext = getFileExtension(cloudinarySrc);
  const srcSetValue = getSrcSet(ext);
  
  // Default sizes if not provided
  const imageSizes = sizes || '(max-width: 768px) 100vw, 50vw';

  return (
    <picture>
      {isWebP && (
        <source
          type="image/webp"
          srcSet={getSrcSet('webp')}
          sizes={imageSizes}
        />
      )}
      <source
        srcSet={srcSetValue}
        type={ext === 'jpg' ? 'image/jpeg' : `image/${ext}`}
        sizes={imageSizes}
      />
      <img
        src={cloudinarySrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          ...(props.style || {})
        }}
        {...props}
      />
    </picture>
  );
};

export default Image;
