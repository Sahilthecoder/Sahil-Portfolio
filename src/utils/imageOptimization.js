// Image optimization settings
export const imageSettings = {
  quality: {
    webp: 70,
    jpeg: 65,
    png: 80
  },
  maxSize: {
    width: 1200,
    height: 675
  },
  formatPreferences: {
    default: 'webp',
    fallback: 'jpeg'
  },
  loading: 'lazy',
  decoding: 'async',
  placeholder: {
    width: 100,
    height: 56,
    quality: 30
  },
  critical: {
    preload: true,
    priority: true,
    decoding: 'sync'
  }
};

// ✅ Use this optimized function
export const getOptimizedImageUrl = (originalUrl, width = null, height = null, isCritical = false) => {
  const url = new URL(originalUrl);
  const params = new URLSearchParams(url.search);

  const baseWidth = width || imageSettings.maxSize.width;
  const baseHeight = height || imageSettings.maxSize.height;

  const aspectRatio = baseWidth / baseHeight;

  if (width && !height) {
    height = Math.round(width / aspectRatio);
  } else if (height && !width) {
    width = Math.round(height * aspectRatio);
  }

  if (isCritical) {
    params.set('priority', 'true');
    params.set('decoding', imageSettings.critical.decoding);
  } else {
    params.set('loading', imageSettings.loading);
    params.set('decoding', imageSettings.decoding);
  }

  params.set('width', width);
  params.set('height', height);
  params.set('quality', imageSettings.quality.webp);
  params.set('format', imageSettings.formatPreferences.default);

  // Add placeholder enhancements
  params.set('placeholder', 'true');
  params.set('placeholder-quality', imageSettings.placeholder.quality);
  params.set('placeholder-width', imageSettings.placeholder.width);
  params.set('placeholder-height', imageSettings.placeholder.height);

  url.search = params.toString();
  return url.toString();
};
