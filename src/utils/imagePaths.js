/**
 * Helper function to generate correct image paths that work in both development and production
 * @param {string} type - Type of image ('project', 'profile', 'fallback')
 * @param {string} [id] - Project ID or folder name
 * @param {string} [imageName] - Name of the image file
 * @returns {string} Full path to the image
 */
const getImagePath = (type, id, imageName) => {
  const BASE_PATH = import.meta.env.BASE_URL || '/';
  
  // Remove any leading/trailing slashes from BASE_PATH
  const cleanBasePath = BASE_PATH.replace(/^\/+|\/+$/g, '');
  const base = cleanBasePath ? `/${cleanBasePath}/` : '/';

  switch (type) {
    case 'project':
      if (!id || !imageName) {
        console.error('Project ID and image name are required');
        return `${base}images/fallback-image.jpg`;
      }
      return `${base}images/projects/${id}/${imageName}`;
      
    case 'profile':
      return imageName 
        ? `${base}images/profile/${imageName}`
        : `${base}images/profile/profile.avif`;
        
    case 'fallback':
      return `${base}images/fallback-image.jpg`;
      
    default:
      console.error('Invalid image type');
      return `${base}images/fallback-image.jpg`;
  }
};

export default getImagePath;
