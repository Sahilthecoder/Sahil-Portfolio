import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const isAnalyze = mode === 'analyze';
  
  // Common plugins for all environments
  const plugins = [
    // React with Fast Refresh and JSX runtime
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-remove-prop-types', { removeImport: true }],
          ['babel-plugin-react-remove-properties', { properties: ['data-testid'] }]
        ]
      },
      fastRefresh: true,
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      include: '**/*.{jsx,tsx}',
    }),
    
    // HTML minification and template configuration
    createHtmlPlugin({
      minify: isProduction,
      inject: {
        data: {
          title: env.VITE_APP_TITLE || 'Portfolio',
          description: env.VITE_APP_DESCRIPTION || 'Modern portfolio website',
          themeColor: '#0f172a',
        },
      },
    }),
    
    // PWA support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Portfolio',
        short_name: 'Portfolio',
        description: 'Modern portfolio website',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    
    // Image optimization
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
    }),
    
    // Response headers configuration
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-Frame-Options', 'DENY');
          res.setHeader('X-XSS-Protection', '1; mode=block');
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          res.setHeader(
            'Permissions-Policy',
            'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          );
          next();
        });
      },
    },
  ];
  
  // Production-only plugins
  if (isProduction) {
    // Gzip and Brotli compression
    plugins.push(
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
      })
    );
    
    // Advanced chunk splitting
    plugins.push(
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-libs': ['framer-motion', 'gsap'],
          'ui-libs': ['@headlessui/react', '@heroicons/react'],
          'utils': ['date-fns', 'clsx', 'tailwind-merge', 'lodash-es'],
          'icons': ['react-icons'],
        },
      })
    );
    
    // Legacy browser support
    plugins.push(
      legacy({
        targets: ['defaults', 'not IE 11'],
        modernPolyfills: true,
      })
    );
  }
  
  // Bundle analyzer for analyze mode
  if (isAnalyze) {
    plugins.push(
      visualizer({
        open: true,
        filename: 'bundle-analyzer.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      })
    );
  }

  return {
    base: isProduction ? '/Sahil-Portfolio/' : '/',
    plugins,
    
    // Development server configuration
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0',
      strictPort: true,
      cors: true,
      
      // Enable HMR with faster refresh
      hmr: {
        overlay: true,
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
        clientPort: 3000,
      },
      
      // Proxy configuration for API requests
      proxy: env.VITE_API_BASE_URL ? {
        '^/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      } : undefined,
      
      // Enable source maps in development
      sourcemap: !isProduction,
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      cssCodeSplit: true,
      reportCompressedSize: !isProduction,
      chunkSizeWarningLimit: 1000,
      target: 'esnext',
      
      // Rollup configuration
      rollupOptions: {
        output: {
          // Better chunking strategy
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion') || id.includes('gsap')) {
                return 'vendor-animations';
              }
              if (id.includes('@headlessui') || id.includes('@heroicons')) {
                return 'vendor-ui';
              }
              if (id.includes('date-fns') || id.includes('clsx') || id.includes('lodash')) {
                return 'vendor-utils';
              }
              if (id.includes('react-icons')) {
                return 'vendor-icons';
              }
              return 'vendor-other';
            }
          },
          
          // Better file naming for caching
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1].toLowerCase();
            
            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            } else if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'avif'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            } else if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            } else if (ext === 'js') {
              return 'assets/js/[name]-[hash][extname]';
            }
            
            return 'assets/misc/[name]-[hash][extname]';
          },
        },
        
        // Tree-shaking optimization
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          preset: 'recommended',
        },
      },
      
      // Module preloading
      modulePreload: {
        polyfill: true,
        resolveDependencies: (url, deps, context) => {
          if (url.includes('node_modules')) {
            return [];
          }
          return deps;
        },
      },
      
      // Minification options
      minify: isProduction ? 'esbuild' : false,
      cssTarget: 'esnext',
      
      // CSS minification
      cssCodeSplit: true,
      cssTarget: 'esnext',
      
      // Better error handling
      chunkSizeWarningLimit: 1000,
      
      // Better source maps
      sourcemap: isProduction ? 'hidden' : true,
    },
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'public'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'components': path.resolve(__dirname, 'src/components'),
        'pages': path.resolve(__dirname, 'src/pages'),
        'hooks': path.resolve(__dirname, 'src/hooks'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'styles': path.resolve(__dirname, 'src/styles'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        '@headlessui/react',
        '@heroicons/react',
        'date-fns',
        'clsx',
        'tailwind-merge',
      ],
      esbuildOptions: {
        target: 'esnext',
        treeShaking: true,
        define: {
          global: 'globalThis',
        },
        plugins: [
          // Add any esbuild plugins here
        ],
      },
    },
    
    // CSS configuration
    css: {
      devSourcemap: !isProduction,
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCase',
        generateScopedName: isProduction
          ? '[hash:base64:8]'
          : '[name]__[local]--[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "sass:color";
            @import "./src/styles/variables";
            @import "./src/styles/mixins";
          `,
        },
      },
    },
    
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    
    // Logging
    logLevel: isProduction ? 'warn' : 'info',
    
    // Cache configuration
    cacheDir: `./node_modules/.vite-${mode}`,
    
    // Clear screen
    clearScreen: true,
  };
});
