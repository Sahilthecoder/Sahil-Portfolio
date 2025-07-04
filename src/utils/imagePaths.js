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
  const base = import.meta.env.BASE_URL || '/'; // Vite handles this automatically

  switch (type) {
    case 'project': {
      if (!id || !imageName) {
        console.error('❌ Missing project ID or image name for project image');
        return `${base}images/fallback-image.jpg`;
      }
      const cleanImageName = imageName.split('?')[0]; // Remove any query params
      return `${base}images/projects/${id}/${cleanImageName}`;
    }

    case 'profile':
      return `${base}images/profile.avif`;

    case 'logo':
      return `${base}images/logo192.png`;

    case 'favicon':
      return `${base}images/favicon-16x16.png`;

    case 'apple-touch-icon':
      return `${base}images/logo192.png`;

    case 'fallback':
      return `${base}images/fallback-image.jpg`;

    default:
      console.error(`❌ Unknown image type: "${type}"`);
      return `${base}images/fallback-image.jpg`;
  }
};

export default getImagePath;
