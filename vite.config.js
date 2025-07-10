import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

// Emotion configuration
const emotionBabelPlugin = require('@emotion/babel-plugin').default;

// Custom plugin to copy favicon files to the root directory
function copyFaviconsPlugin() {
  return {
    name: 'copy-favicons',
    buildStart() {
      const faviconFiles = [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'safari-pinned-tab.svg',
        'site.webmanifest',
        'browserconfig.xml',
        'logo192.png',
        'logo512.png'
      ];

      const distDir = path.resolve(__dirname, 'dist');
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }

      faviconFiles.forEach(file => {
        const srcPath = path.resolve(__dirname, 'public', file);
        const destPath = path.resolve(distDir, file);
        
        if (existsSync(srcPath)) {
          copyFileSync(srcPath, destPath);
          console.log(`Copied ${file} to dist directory`);
        } else {
          console.warn(`Warning: ${file} not found in public directory`);
        }
      });
    }
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL configuration
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/Sahil-Portfolio/' : '/';

// Set environment variables
process.env.VITE_BASE_URL = base;
process.env.BASE_URL = base;

// Configure MIME types for proper file handling
const mimeTypes = {
  'application/javascript': ['js', 'jsx', 'mjs'],
  'text/jsx': ['jsx'],
  'text/javascript': ['js', 'mjs']
};

export default defineConfig({
  base,
  publicDir: 'public',
  appType: 'spa',
  optimizeDeps: {
    include: ['swiper', 'swiper/react', 'swiper/modules', 'swiper/element'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  
  // Configure module resolution
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@styles', replacement: path.resolve(__dirname, './src/styles') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@context', replacement: path.resolve(__dirname, './src/context') },
      { find: '@data', replacement: path.resolve(__dirname, './src/data') },
      { find: 'react/jsx-runtime.js', replacement: 'react/jsx-runtime' }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
    fs: {
      strict: true,
    },
    strictPort: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
    fs: {
      strict: false,
      allow: ['..']
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
      overlay: false
    },
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;"
    },
    // Ensure proper MIME types for JSX files
    mimeTypes: mimeTypes
  },
  
  // Configure how the dev server serves files
  preview: {
    port: 3000,
    strictPort: true,
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  },
  
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          ['@emotion/babel-plugin', {
            sourceMap: true,
            autoLabel: 'dev-only',
            labelFormat: '[local]',
            cssPropOptimization: true
          }]
        ]
      }
    }),
    copyFaviconsPlugin()
  ],
  
  // Configure MIME types for proper file handling
  mimeTypes: {
    'application/javascript': ['js', 'jsx', 'mjs']
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: isProduction ? 'terser' : false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('@emotion')) return 'vendor-emotion';
            if (id.includes('framer-motion')) return 'vendor-framer';
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop() || '';
          if (/(png|jpe?g|gif|svg|webp|avif)$/i.test(ext)) {
            return 'assets/images/[name].[hash][extname]';
          }
          if (/(woff|woff2|eot|ttf|otf)$/i.test(ext)) {
            return 'assets/fonts/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js'
      }
    }
  },
  
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  }
});
