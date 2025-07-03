import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import basePathPlugin from './vite.base-path-plugin';

// Plugin to ensure all asset paths in HTML include the base URL
function htmlAssetsPlugin() {
  return {
    name: 'html-assets',
    transformIndexHtml: {
      enforce: 'post',
      transform(html, { path }) {
        // Skip processing in development for non-HTML files
        if (process.env.NODE_ENV !== 'production' && !path.endsWith('.html')) {
          return html;
        }

        // Get the base URL from environment or use default
        const baseUrl = process.env.BASE_URL || '/Sahil-Portfolio/';
        const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

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

        // Process src, href, and content attributes
        let result = html
          // Handle src and href attributes
          .replace(/(src|href)="([^"]*)"/g, (match, attr, url) => {
            return `${attr}="${processUrl(url)}"`;
          })
          // Handle CSS url() paths
          .replace(/url\(\s*['"]?([^'"#?)]+?)['"]?\s*\)/g, (match, p1) => {
            if (p1.startsWith('http') || p1.startsWith('data:')) {
              return match;
            }
            return `url("${processUrl(p1)}")`;
          })
          // Handle modulepreload
          .replace(/(<link[^>]+rel=["']modulepreload["'][^>]+href=["'])([^"']+)(["'])/g, 
            `$1${processUrl('$2')}$3`)
          // Handle script src
          .replace(/(<script[^>]+src=["'])([^"']+)(["'])/g, 
            `$1${processUrl('$2')}$3`)
          // Handle stylesheet links
          .replace(/(<link[^>]+rel=["']stylesheet["'][^>]+href=["'])([^"']+)(["'])/g, 
            `$1${processUrl('$2')}$3`);

        return result;
      }
    }
  };
}

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isProduction = process.env.NODE_ENV === 'production';

// Set base URL based on environment
let base = '/';

// For GitHub Pages, always use the repository name as base path with trailing slash
if (isGitHubPages) {
  base = '/Sahil-Portfolio/';
} else if (isProduction) {
  base = '/';
}

// Ensure base URL is consistently formatted with a trailing slash
const baseUrl = base.endsWith('/') ? base : `${base}/`;

// Set environment variables for base URL
process.env.VITE_BASE_URL = baseUrl;
process.env.BASE_URL = baseUrl;

// Log the base URL for debugging
console.log(`Using base URL: "${baseUrl}"`);
console.log(`GitHub Pages: ${isGitHubPages}, Production: ${isProduction}`);

export default defineConfig({
  base: base,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      overlay: false // Disable HMR overlay to prevent potential issues
    },
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..']
    },
    // Disable file system caching during development
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  publicDir: 'public',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Ensure assets are built with the correct paths
    assetsInlineLimit: 0, // Don't inline any assets
    // Generate manifest.json for better cache control
    manifest: true,
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    reportCompressedSize: false, // Disable gzip size reporting for better build performance
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (in kbs)
    assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
    manifest: true, // Generate manifest.json
    // Ensure assets are copied to the correct location
    assetsInclude: ['**/*.avif', '**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        // Enable tree-shaking and reduce side effects
        experimentalMinChunkSize: 10000, // 10kb
        manualChunks: (id) => {
          // Create separate chunks for vendor dependencies
          if (id.includes('node_modules')) {
            // Group React related dependencies
            if (id.includes('react') || id.includes('scheduler') || id.includes('object-assign')) {
              return 'vendor-react';
            }
            // Group UI related dependencies
            if (id.includes('@headlessui') || id.includes('@heroicons') || id.includes('@tailwindcss')) {
              return 'vendor-ui';
            }
            // Group animation libraries
            if (id.includes('framer-motion') || id.includes('popmotion')) {
              return 'vendor-animations';
            }
            // Group utility libraries
            if (id.includes('date-fns') || id.includes('lodash') || id.includes('axios')) {
              return 'vendor-utils';
            }
            // All other dependencies go into vendor-other
            return 'vendor-other';
          }
          // Group components by feature/route for better code splitting
          if (id.includes('src/components/')) {
            const match = id.match(/src\/components\/([^/]+)/);
            if (match && match[1]) {
              return `component-${match[1].toLowerCase()}`;
            }
          }
        },
        assetFileNames: (assetInfo) => {
          // Group assets by type
          const extType = assetInfo.name.split('.').at(1)?.toLowerCase();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/css/i.test(extType)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/js/i.test(extType)) {
            return 'assets/js/[name]-[hash][extname]';
          }
          return 'assets/misc/[name]-[hash][extname]';
        },
        chunkFileNames: (chunkInfo) => {
          // Group chunks by type
          if (chunkInfo.name.startsWith('vendor-')) {
            return 'assets/js/vendor/[name]-[hash].js';
          }
          if (chunkInfo.name.startsWith('component-')) {
            return 'assets/js/components/[name]-[hash].js';
          }
          return 'assets/js/[name]-[hash].js';
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Ensure all asset URLs are rewritten to include base
    // Copy public directory to dist
    copyPublicDir: true,
  },
  
  server: {
    port: 5173,
    host: 'localhost',
    open: true,
    strictPort: true,
  },

  preview: {
    port: 5173,
    open: true
  },

  // Build configuration is now consolidated above

  plugins: [
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: [],
      },
    }),
    basePathPlugin(),
    htmlAssetsPlugin(),
    {
      name: 'copy-service-worker',
      apply: 'build',
      generateBundle() {
        // This ensures the service worker is copied to the root of the dist directory
        this.emitFile({
          type: 'asset',
          fileName: 'service-worker.js',
          source: fs.readFileSync(path.resolve(__dirname, 'public/service-worker.js'), 'utf-8')
        });
      }
    },
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    devSourcemap: true,
    preprocessorOptions: {
      scss: { 
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
  
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-dom/client', 
      'react-router-dom',
      'framer-motion', 
      'react-helmet', 
      'react-helmet-async',
      'react-icons/fa', 
      'react-icons/fi', 
      'react-icons/bs', 
      'react-icons/si',
      'react-icons/io5', 
      'react-icons/md', 
      '@sentry/react', 
      'plausible',
      'date-fns', 
      'date-fns-tz',
    ],
    exclude: ['js-big-decimal'],
    force: true,
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      target: 'es2020',
    },
  },
});
