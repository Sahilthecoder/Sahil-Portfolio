// Image optimization settings
export const imageSettings = {
  // Image quality settings
  quality: {
    webp: 80,
    jpeg: 75,
    png: 85
  },

  // Image size limits (in pixels)
  maxSize: {
    width: 1920,
    height: 1080
  },

  // Image format preferences
  formatPreferences: {
    default: 'webp',
    fallback: 'jpeg'
  },

  // Image loading strategy
  loading: 'lazy',

  // Image decoding strategy
  decoding: 'async'
};

// Helper function to generate optimized image URLs
export const getOptimizedImageUrl = (originalUrl, width = null, height = null) => {
  const url = new URL(originalUrl);
  const params = new URLSearchParams(url.search);

  if (width) params.set('width', width);
  if (height) params.set('height', height);
  params.set('quality', imageSettings.quality.webp);
  params.set('format', imageSettings.formatPreferences.default);

  url.search = params.toString();
  return url.toString();
};
