import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import basePathPlugin from './vite.base-path-plugin';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// Ensure base URL ends with a slash
const base = isGitHubPages ? '/Sahil-Portfolio/' : '/';

export default defineConfig({
  base: base,
  publicDir: 'public',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
    manifest: true, // Generate manifest.json
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
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
        chunkFileNames: 'assets/js/[name]-[hash].js',
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
    basePathPlugin(),
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: [],
      },
    }),
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
