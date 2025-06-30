import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Disable React's Fast Refresh in development if needed
const disableFastRefresh = process.env.DISABLE_FAST_REFRESH === 'true';

export default defineConfig(({ command, mode }) => ({
  // Base URL configuration
  base: command === 'build' ? '/Sahil-Portfolio/' : '/',

  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: !disableFastRefresh,
      // Use automatic JSX runtime
      jsxRuntime: 'automatic',
      // Disable React Strict Mode if needed
      // reactStrictMode: false,
      // Add babel plugins if needed
      babel: {
        plugins: [
          // Add any required babel plugins here
        ]
      }
    })
  ],
  
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3001,
      clientPort: 3001
    },
    watch: {
      usePolling: true,
      interval: 100
    },
    // Enable CORS for development
    cors: true,
    // Enable source maps for better debugging
    sourcemap: true
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
      'react-helmet-async'
    ],
    // Don't force optimization during development
    force: command === 'build',
    // Enable esbuild for faster builds
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    }
  },
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
    port: 4000,
    strictPort: false,
    host: true, // Listen on all network interfaces
    hmr: {
      host: 'localhost',
      port: 4000,
      protocol: 'ws'
    },
    watch: {
      usePolling: false,
      useFsEvents: true
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    fs: {
      strict: false,
      allow: ['..']
    },
    open: true,
    proxy: {}
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
