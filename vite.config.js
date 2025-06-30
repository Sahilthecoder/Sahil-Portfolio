import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// Disable React's Fast Refresh if needed
const disableFastRefresh = process.env.DISABLE_FAST_REFRESH === 'true';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  // Base URL configuration – root for dev, repo sub-folder for production (GitHub Pages)
  base: env.VITE_BASE_URL || (command === 'serve' ? '/' : '/Sahil-Portfolio/'),
  // Ensure assets are properly prefixed with base URL
  define: {
    'import.meta.env.BASE_URL': JSON.stringify(env.VITE_BASE_URL || (command === 'serve' ? '/' : '/Sahil-Portfolio/'))
  },
  // Build configuration

  plugins: [
    react({
      fastRefresh: !disableFastRefresh,
      jsxRuntime: 'automatic',
      babel: {
        plugins: []
      }
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  
  // Resolve aliases for absolute imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
      clientPort: 443,
      overlay: true
    },
    watch: {
      usePolling: true,
      interval: 100,
      useFsEvents: true,
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    cors: true,
    fs: {
      strict: true,
      allow: ['..', 'node_modules']
    },
    proxy: {
      // Add API proxies if needed
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, X-Custom-Header',
      'X-Content-Type-Options': 'nosniff'
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
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
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
        },

      }
    }
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
  }
});
