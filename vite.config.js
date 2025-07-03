import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGitHubPages ? '/Sahil-Portfolio/' : '/',
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
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    assetsInlineLimit: 4096, // 4kb
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
