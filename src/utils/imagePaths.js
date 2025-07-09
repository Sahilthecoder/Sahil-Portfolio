/**
 * Helper function to generate correct image paths that work in both development and production.
 * Uses relative paths for development and absolute paths with base URL for production.
 *
 * @param {string} type - Type of image ('project', 'profile', 'logo', 'favicon', 'apple-touch-icon', 'fallback')
 * @param {string} [id] - Folder/project ID (for 'project' type)
 * @param {string} [imageName] - Name of the image file (for 'project' type)
 * @returns {string} - Full image path
 */
const getImagePath = (type, id, imageName) => {
  // In development, use relative paths. In production, use absolute paths with base URL
  const isProduction = import.meta.env.PROD;
  const base = isProduction ? '/Sahil-Portfolio/' : '/';

  // Ensure base path has a single trailing slash
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  // Define paths for different environments
  const paths = {
    development: {
      profile: 'sahil-portfolio/public/images/profile/profile.webp',
      profilePng: 'sahil-portfolio/public/images/profile-fallback.png',
      logo: 'sahil-portfolio/public/images/logo/logo192.png',
      favicon: 'sahil-portfolio/public/images/favicon-32x32.png',
      appleTouchIcon: 'sahil-portfolio/public/images/apple-touch-icon.png',
      fallback: 'sahil-portfolio/public/images/profile-fallback.png',
      default: 'sahil-portfolio/public/images/fallback-image.jpg',
    },
    production: {
      profile: `${normalizedBase}images/profile/profile.webp`,
      profilePng: `${normalizedBase}images/profile-fallback.png`,
      logo: `${normalizedBase}images/logo/logo192.png`,
      favicon: `${normalizedBase}images/favicon-32x32.png`,
      appleTouchIcon: `${normalizedBase}images/apple-touch-icon.png`,
      fallback: `${normalizedBase}images/profile-fallback.png`,
      default: `${normalizedBase}images/fallback-image.jpg`,
    },
  };

  const env = isProduction ? 'production' : 'development';

  try {
    switch (type) {
      case 'project': {
        if (!id || !imageName) {
          console.error('❌ Missing project ID or image name for project image');
          return paths[env].default;
        }
        const cleanImageName = imageName.split('?')[0]; // Remove any query params
        return `${paths[env].base || ''}images/projects/${id}/${cleanImageName}`.replace(
          /\/\//g,
          '/'
        );
      }

      case 'profile':
        return paths[env].profile;

      case 'logo':
        return paths[env].logo;

      case 'favicon':
        return paths[env].favicon;

      case 'apple-touch-icon':
        return paths[env].appleTouchIcon;

      case 'fallback':
        return paths[env].fallback;

      default:
        console.error(`❌ Unknown image type: "${type}"`);
        return paths[env].default;
    }
  } catch (error) {
    console.error('❌ Error generating image path:', error);
    return paths[env].default;
  }
};

export default getImagePath;
