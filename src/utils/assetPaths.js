// Project folder mapping for ProjectImage component
// These map project IDs to their corresponding folder names in public/images/projects/
const projectFolders = {
  'zomato-analysis': 'Project1 excel',
  'bansal-supermarket': 'Project2 tableau',
  'ekam-attendance': 'Project3 Sql+Sheets',
  'retail-cash-flow': 'Project4 Power BI',
  'ai-planner': 'Project5 Gpt+Notion',
  'automation-suite': 'Project6 Gpt+Zapier',
  'mahira-portfolio': 'Mahira Portfolio Web+AI',
  ekam: 'Project3 Sql+Sheets', // Alias for 'ekam-attendance'
  'inventory-optimization-ai': 'inventory-ai',
  'warehouse-automation': 'warehouse-automation',
  'supply-chain-visibility': 'supply-chain',
  'retail-inventory-analytics': 'retail-analytics',
  'inventory-accuracy-audit': 'inventory-audit',
};

/**
 * Utility function to get the correct path for static assets
 * Handles both development and production environments
 * @param {string} path - The asset path relative to the public directory
 * @returns {string} The full path to the asset
 */
export const getAssetPath = (path) => {
  if (!path) return '';

  // If it's already a full URL or data URL, return as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In development, assets are served from the root
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }

  // In production, prepend the base URL
  return `/Sahil-Portfolio/${cleanPath}`;
};

/**
 * Utility function to get the correct path for project images
 * @param {string} projectId - The project ID
 * @param {string} imageName - The image filename
 * @returns {string} The full path to the project image
 */
export const getProjectImage = (projectId, imageName) => {
  if (!projectId || !imageName) return '';

  // Get the folder name from projectFolders mapping, fallback to projectId
  const folderName = projectFolders[projectId] || projectId;

  // Handle different image name formats
  let finalImageName = imageName;

  // If imageName is a full path, extract just the filename
  if (imageName.includes('/')) {
    finalImageName = imageName.split('/').pop();
  }

  // If no extension is provided, try to find a matching file
  if (!/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(finalImageName)) {
    // Try to find a matching image with supported extensions
    const extensions = ['.avif', '.webp', '.png', '.jpg', '.jpeg'];
    for (const ext of extensions) {
      const testPath = `images/projects/${folderName}/${finalImageName}${ext}`;
      // Check if the file exists in the public directory
      try {
        // This is a client-side check, so we'll assume the file exists if we can't check it
        return `/${testPath}`;
      } catch (e) {
        console.warn(`Image not found: ${testPath}`);
      }
    }

    // If no image found, return the fallback path for the specific project
    if (projectId === 'zomato' || projectId === 'zomato-analysis') {
      return '/images/projects/Project1 excel/cover-fallback.jpg';
    }

    // Default fallback
    return `/images/projects/${folderName}/cover-fallback.jpg`;
  }

  // If we have a valid extension, return the full path
  return `/images/projects/${folderName}/${finalImageName}`;
};
