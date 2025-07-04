/**
 * Helper function to generate correct image paths that work in both development and production
 * @param {string} type - Type of image ('project', 'profile', 'fallback')
 * @param {string} [id] - Project ID or folder name
 * @param {string} [imageName] - Name of the image file
 * @returns {string} Full path to the image
 */
const getImagePath = (type, id, imageName) => {
  // In development, use relative paths. In production, use absolute paths with base URL
  const isProduction = import.meta.env.PROD;
  const BASE_PATH = isProduction ? (import.meta.env.BASE_URL || '/') : '/';
  
  // Remove any leading/trailing slashes from BASE_PATH
  const cleanBasePath = BASE_PATH.replace(/^\/+|\/+$/g, '');
  const base = cleanBasePath ? `/${cleanBasePath}/` : '/';

  // For production, use the optimized images directory
  const imagesBase = isProduction ? `${base}images/` : '/images/';

  switch (type) {
    case 'project':
      if (!id || !imageName) {
        console.error('Project ID and image name are required');
        return `${imagesBase}fallback-image.jpg`;
      }
      // Remove any query parameters from the image name
      const cleanImageName = imageName.split('?')[0];
      return `${imagesBase}projects/${id}/${cleanImageName}`;
      
    case 'profile':
      if (imageName) {
        const cleanProfileImage = imageName.split('?')[0];
        return `${imagesBase}profile/${cleanProfileImage}`;
      }
      return `${imagesBase}profile/profile.avif`;
        
    case 'fallback':
      return `${imagesBase}fallback-image.jpg`;
      
    default:
      console.error('Invalid image type');
      return `${imagesBase}fallback-image.jpg`;
  }
};

export default getImagePath;
