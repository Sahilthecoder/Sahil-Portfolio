// Helper function to get the correct image URL in both dev and production
const getImageUrl = (path) => {
  // In development, use the path as is
  if (import.meta.env.DEV) {
    return `/${path}`;
  }
  // In production, prepend the base URL for GitHub Pages
  return `/Sahil-Portfolio/${path}`;
};

export { getImageUrl };
