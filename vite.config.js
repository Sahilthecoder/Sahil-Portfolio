import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import serviceWorker from './vite-plugin-service-worker';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL configuration
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/Sahil-Portfolio/' : '/';

// Set environment variables for base URL
process.env.VITE_BASE_URL = base;

// Ensure the public directory is properly handled
const publicDir = path.resolve(__dirname, 'public');

console.log(`Using base URL: "${base}"`);

export default defineConfig({
  base: base,
  plugins: [
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic'
    }),
    serviceWorker()
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    // Ensure static assets are copied as-is
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sw: path.resolve(__dirname, 'src/sw.js')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let ext = info[info.length - 1];
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (['png', 'jpe?g', 'jpe', 'webp', 'svg', 'gif'].includes(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'sw' ? '[name].js' : 'assets/js/[name]-[hash].js';
        },
      },
    },
    copyPublicDir: true,
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..']
    }
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL || '/Sahil-Portfolio/'),
    'process.platform': '"browser"',
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'production'}"`,
    'process.versions.node': '"18.0.0"',
    'process.version': '"v18.0.0"',
    global: 'window',
  },
  esbuild: {
    jsx: 'automatic',
    loader: 'tsx',
    include: /src\/.*\.(jsx|tsx)?$/,
    exclude: [],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
