// Custom Vite plugin to ensure all asset paths include the base URL
export default function basePathPlugin() {
  let basePath = '/';
  
  return {
    name: 'base-path-plugin',
    configResolved(config) {
      // Get the base path from Vite config
      basePath = config.base || '/';
      // Ensure base path ends with a slash
      if (!basePath.endsWith('/')) {
        basePath = `${basePath}/`;
      }
    },
    transformIndexHtml(html, { path }) {
      // Skip processing in development for non-HTML files
      if (import.meta.env.MODE !== 'production' && !path.endsWith('.html')) {
        return html;
      }
      
      // Function to process URLs in the HTML
      const processUrl = (url) => {
        // Skip if it's an external URL, data URL, or already has the base path
        if (url.startsWith('http') || 
            url.startsWith('//') || 
            url.startsWith('data:') ||
            url.startsWith(basePath) ||
            !url.startsWith('/')) {
          return url;
        }
        // Add base path if it's a root-relative path
        return `${basePath}${url.replace(/^\//, '')}`;
      };

      // Process src and href attributes
      let result = html.replace(
        /(src|href)="([^"]*)"/g, 
        (match, attr, url) => {
          return `${attr}="${processUrl(url)}"`;
        }
      );
      
      // Also process URLs in content attributes (like manifest)
      result = result.replace(
        /(content)="([^"]*)"/g, 
        (match, attr, content) => {
          // Only process URLs in content attributes that look like paths
          if (content.startsWith('/') && 
              !content.startsWith('//')) {
            return `${attr}="${processUrl(content)}"`;
          }
          return match;
        }
      );
      
      return result;
    }
  };
}