/**
 * Image utilities for handling responsive images, lazy loading, and path management
 */

/**
 * Gets the optimized image path with proper base URL handling
 * @param {string} path - The image path (can be relative or absolute)
 * @returns {string} - The optimized image path with correct base URL
 */
export const getOptimizedImagePath = (path) => {
  if (!path) return '';
  
  // Remove leading slash if present
  let processedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Handle different environments
  if (import.meta.env.PROD) {
    // In production, use the GitHub Pages base URL
    return `/Sahil-Portfolio/${processedPath}`.replace(/\/+$/, '');
  }
  
  // In development, use relative path with leading slash
  return `/${processedPath}`.replace(/\/+$/, '');
};

/**
 * Gets the optimized image URL with error handling
 * @param {string} path - The image path
 * @param {string} fallback - Fallback image path (optional)
 * @returns {Object} - { src: string, onError: function }
 */
export const getImageProps = (path, fallback = '') => ({
  src: getOptimizedImagePath(path),
  onError: (e) => {
    if (fallback) {
      e.target.src = getOptimizedImagePath(fallback);
    } else {
      e.target.style.display = 'none';
    }
  }
});

/**
 * Generates a srcSet string for responsive images with optimized paths
 * @param {string} baseUrl - The base URL of the image
 * @param {string} extension - The file extension (without dot)
 * @param {Object} sizes - Object with width as key and size descriptor as value
 * @returns {string} - The srcSet string with optimized paths
 */
export function generateSrcSet(baseUrl, extension, sizes) {
  return Object.entries(sizes)
    .map(([width, descriptor]) => {
      const sizeDescriptor = typeof descriptor === 'string' ? descriptor : `${width}w`;
      return `${baseUrl}-${width}w.${extension} ${sizeDescriptor}`;
    })
    .join(', ');
}

/**
 * Generates sizes attribute for responsive images
 * @param {Object} breakpoints - Object with media queries as keys and sizes as values
 * @returns {string} - The sizes attribute value
 */
export function generateSizes(breakpoints) {
  return Object.entries(breakpoints)
    .map(([query, size]) => {
      return query === 'default' 
        ? size 
        : `(min-width: ${query}) ${size}`;
    })
    .join(', ');
}

/**
 * Generates a blurry placeholder image as a data URL
 * @param {number} width - Width of the placeholder
 * @param {number} height - Height of the placeholder
 * @param {string} backgroundColor - Background color in hex or rgb
 * @param {string} textColor - Text color in hex or rgb
 * @param {string} text - Text to display on the placeholder
 * @returns {string} - Data URL of the placeholder image
 */
export function generatePlaceholder({ 
  width = 100, 
  height = 100, 
  backgroundColor = '#e5e7eb', 
  textColor = '#9ca3af',
  text = ''
} = {}) {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  canvas.width = width;
  canvas.height = height;
  
  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add text if provided
  if (text) {
    ctx.fillStyle = textColor;
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  // Return data URL
  return canvas.toDataURL('image/png');
}

/**
 * Preloads images for better performance
 * @param {Array} images - Array of image URLs to preload
 * @returns {Promise<Array>} - Array of loaded images
 */
export function preloadImages(images) {
  return Promise.all(
    images.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
        })
    )
  );
}

/**
 * Lazy loads images with Intersection Observer
 * @param {string} selector - CSS selector for images to lazy load
 * @param {Object} options - Intersection Observer options
 */
export function lazyLoadImages(selector = 'img[data-src]', options = {}) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    const images = document.querySelectorAll(selector);
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        if (img.dataset.sizes) {
          img.sizes = img.dataset.sizes;
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        img.removeAttribute('data-sizes');
        observer.unobserve(img);
      }
    });
  }, options);

  // Observe all matching images
  document.querySelectorAll(selector).forEach((img) => observer.observe(img));

  // Return cleanup function
  return () => observer.disconnect();
}

/**
 * Gets the dominant color from an image
 * @param {string} imageUrl - URL of the image
 * @returns {Promise<string>} - Dominant color in hex format
 */
export async function getDominantColor(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Calculate average color
        let r = 0, g = 0, b = 0;
        const count = data.length / 4;
        
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        
        // Calculate average
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        
        // Convert to hex
        const toHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
        
        resolve(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
      } catch (error) {
        console.error('Error getting dominant color:', error);
        resolve('#cccccc'); // Default fallback color
      }
    };
    
    img.onerror = (error) => {
      console.error('Error loading image for color extraction:', error);
      reject(error);
    };
    
    img.src = imageUrl;
  });
}

/**
 * Creates a responsive image element with proper attributes
 * @param {Object} options - Image options
 * @returns {Object} - Image attributes object
 */
export function createResponsiveImage({
  src,
  srcSet,
  sizes,
  alt = '',
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...attrs
}) {
  return {
    src,
    ...(srcSet && { srcSet }),
    ...(sizes && { sizes }),
    alt,
    ...(width && { width }),
    ...(height && { height }),
    loading,
    decoding,
    className: `responsive-image ${className}`.trim(),
    ...attrs,
  };
}
