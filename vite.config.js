import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  publicDir: 'public',
  
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

  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },

  plugins: [
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
