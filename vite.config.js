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
process.env.BASE_URL = base;

console.log(`Using base URL: "${base}"`);

export default defineConfig({
  base: base,
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.ico', '**/*.webp', '**/*.avif'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { 
            runtime: 'automatic',
            importSource: 'react'
          }]
        ]
      }
    })
  ],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    cors: true,
    host: '0.0.0.0',
    hmr: {
      overlay: true
    },
    fs: {
      strict: true,
      allow: ['..']
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sw: path.resolve(__dirname, 'src/sw.js')
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
            return `assets/${extType}/[name][extname]`; // Keep original filename for better caching
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: (chunkInfo) => {
          return `assets/js/${chunkInfo.name}-[hash].js`;
        },
      },
    },
    copyPublicDir: true,
    assetsInlineLimit: 4096, // 4kb
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
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
