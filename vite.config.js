import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL configuration
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/Sahil-Portfolio/' : '/';

// Set environment variables for base URL
process.env.VITE_BASE_URL = base;

console.log(`Using base URL: "${base}"`);

export default defineConfig({
  base: base,
  plugins: [
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic'
    })
  ],
  server: {
    port: 3000,
    open: true,
  },
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
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'react-icons'],
        },
      },
    },
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
