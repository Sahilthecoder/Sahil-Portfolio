import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
  // ✅ MUST for GitHub Pages deployment
  base: '/Sahil-Portfolio/',

  plugins: [react()],
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    manifest: true,
    target: 'esnext',
    assetsInlineLimit: 0, // Force all assets to be copied to the output directory
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          tensorflow: ['@tensorflow/tfjs', '@tensorflow-models/speech-commands'],
          // Temporarily removing langchain as it's causing build issues
          // langchain: ['@langchain/core', '@langchain/community', '@langchain/openai']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
      // Externalize Node.js built-ins
      external: [
        'fs', 'path', 'os', 'crypto', 'stream', 'http', 'https', 
        'zlib', 'tls', 'net', 'dns', 'child_process', 'worker_threads'
      ]
    }
  },
  
  server: {
    port: 5173,
    strictPort: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173,
      overlay: false
    },
    watch: {
      usePolling: true,
      useFsEvents: false
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    force: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    conditions: ['development', 'browser'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules')
    ]
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@langchain/openai',
      '@sentry/react',
      'plausible'
    ]
  },

  publicDir: 'public',

  assetsInclude: [
    '**/*.png', '**/*.ico', '**/*.svg',
    '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'
  ]
}));
