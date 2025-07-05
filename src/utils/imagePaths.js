/**
 * Helper function to generate correct image paths that work in both development and production.
 * Automatically adapts to Vite's BASE_URL for GitHub Pages deployment.
 *
 * @param {string} type - Type of image ('project', 'profile', 'logo', 'favicon', 'apple-touch-icon', 'fallback')
 * @param {string} [id] - Folder/project ID (for 'project' type)
 * @param {string} [imageName] - Name of the image file (for 'project' type)
 * @returns {string} - Full image path
 */
const getImagePath = (type, id, imageName) => {
  // In development, use relative paths. In production, use absolute paths with base URL
  const base = import.meta.env.PROD ? import.meta.env.BASE_URL || '/' : '/';
  
  // Ensure base path has a single trailing slash
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const imagesBase = `${normalizedBase}images/`;

  try {
    switch (type) {
      case 'project': {
        if (!id || !imageName) {
          console.error('❌ Missing project ID or image name for project image');
          return new URL('/images/fallback-image.jpg', import.meta.url).href;
        }
        const cleanImageName = imageName.split('?')[0]; // Remove any query params
        return `${imagesBase}projects/${id}/${cleanImageName}`.replace(/\/\//g, '/');
      }

      case 'profile':
        // Profile image is located directly in the public folder
        return `${normalizedBase}profile.avif`;

      case 'logo':
        return `${imagesBase}logo192.png`;

      case 'favicon':
        return `${imagesBase}favicon-32x32.png`; // Using 32x32 as it's commonly requested

      case 'apple-touch-icon':
        return `${imagesBase}apple-touch-icon.png`;

      case 'fallback':
        return `${imagesBase}fallback-image.jpg`;

      default:
        console.error(`❌ Unknown image type: "${type}"`);
        return `${imagesBase}fallback-image.jpg`;
    }
  } catch (error) {
    console.error('❌ Error generating image path:', error);
    return `${imagesBase}fallback-image.jpg`;
  }
};

export default getImagePath;
