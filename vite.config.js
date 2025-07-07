import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Sahil Ali - Portfolio',
        short_name: 'Sahil Ali',
        description: 'Portfolio of Sahil Ali - Data Analyst & Inventory Specialist',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/Sahil-Portfolio/',
        scope: '/Sahil-Portfolio/',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  // Base URL for production builds
  base: process.env.NODE_ENV === 'production' ? '/Sahil-Portfolio/' : '/',
  
  // Server configuration
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: '0.0.0.0',
    cors: true,
    fs: {
      strict: false,
      // Allow serving files from public directory
      allow: ['..']
    },
    headers: {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Accept-Ranges': 'bytes',
      'Vary': 'Origin'
    },
    // Ensure static files are served with correct MIME types
    mimeTypes: {
      'text/javascript': ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      'text/jsx': ['jsx'],
      'text/css': ['css'],
      'image/svg+xml': ['svg'],
      'image/png': ['png'],
      'image/jpeg': ['jpg', 'jpeg'],
      'image/gif': ['gif'],
      'image/webp': ['webp'],
      'image/ico': ['ico'],
      'image/vnd.microsoft.icon': ['ico']
    },
    // Enable HMR
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    },
    // Handle SPA fallback
    historyApiFallback: true,
    proxy: {
      // Handle API requests if needed
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    // Ensure static assets are copied to the build directory
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@emotion/react', '@emotion/styled'],
        },
        // Ensure consistent hashing for better caching
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    target: 'esnext',
    modulePreload: {
      polyfill: false
    },
    commonjsOptions: {
      include: /node_modules/
    }
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@contexts': '/src/contexts',
      '@pages': '/src/pages',
      '@public': '/public'
    }
  },
  
  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@babel/runtime']
  },
  
  // Environment variables
  define: {
    'process.env': {}
  }
});
