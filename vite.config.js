import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Disable React's Fast Refresh if needed
const disableFastRefresh = process.env.DISABLE_FAST_REFRESH === 'true';

export default defineConfig(({ command, mode }) => ({
  // Base URL configuration – root for dev, repo sub-folder for production (GitHub Pages)
  base: command === 'serve' ? '/' : '/Sahil-Portfolio/',
  // Build configuration

  plugins: [
    react({
      fastRefresh: !disableFastRefresh,
      jsxRuntime: 'automatic',
      babel: {
        plugins: []
      }
    })
  ],
  
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
      clientPort: 3000
    },
    watch: {
      usePolling: true,
      interval: 100,
      useFsEvents: true
    },
    cors: true,
    fs: {
      strict: false,
      allow: ['..']
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    open: true,
    proxy: {}
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'framer-motion',
      'react-helmet',
      'react-icons/fa',
      'react-helmet-async',
      '@langchain/openai',
      '@sentry/react',
      'plausible'
    ],
    force: command === 'build',
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps for production
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    manifest: true,
    target: 'esnext',
    assetsInlineLimit: 0, // This ensures all asset paths are relative to the base URL
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          icons: ['react-icons'],
          tensorflow: ['@tensorflow/tfjs', '@tensorflow-models/speech-commands']
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
      external: [
        'fs', 'path', 'os', 'crypto', 'stream', 'http', 'https', 
        'zlib', 'tls', 'net', 'dns', 'child_process', 'worker_threads'
      ]
    }
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

  publicDir: 'public',

  assetsInclude: [
    '**/*.png', '**/*.ico', '**/*.svg',
    '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'
  ]
}));
