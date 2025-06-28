import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base URL for GitHub Pages deployment
const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/Sahil-Portfolio/' : '/';

export default defineConfig({
  base,
  plugins: [
    react(),
  ],
  server: {
    port: 4000,
    open: true,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          tensorflow: ['@tensorflow/tfjs', '@tensorflow-models/speech-commands'],
          animation: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@tensorflow/tfjs', '@tensorflow-models/speech-commands'],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
