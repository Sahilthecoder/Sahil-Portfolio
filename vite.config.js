import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { imagetools } from 'vite-imagetools';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  
  // Base configuration - use environment variable or default to repository name for GitHub Pages
  const base = env.VITE_BASE_URL || '/Sahil-Portfolio/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  
  // Image optimization configuration
  const imageOptimizerOptions = {
    jpg: { 
      quality: 80,
      mozjpeg: true,
    },
    jpeg: { 
      quality: 80,
      mozjpeg: true,
    },
    png: { 
      quality: 80,
      compressionLevel: 9,
    },
    webp: { 
      quality: 80, 
      lossless: false,
      effort: 6,
    },
    avif: { 
      quality: 70, 
      lossless: false,
      speed: 8,
    },
    // Skip optimization for images that are already optimized
    skipIfLarger: true,
  };
  
  return {
    // Base URL configuration for GitHub Pages
    base: normalizedBase,
    
    // Environment variables exposed to the client
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        VITE_BASE_URL: JSON.stringify(normalizedBase),
        // Only expose specific environment variables with VITE_ prefix
        ...Object.fromEntries(
          Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
        )
      }
    },

    // Server configuration
    server: {
      port: 3000,
      host: true, // Listen on all network interfaces
      open: !process.env.CI, // Don't open in CI environment
      strictPort: true, // Exit if port is in use
      cors: true,
      fs: {
        // Allow serving files from these directories
        allow: [
          path.resolve(__dirname, '..'),
          path.resolve(__dirname, 'node_modules')
        ],
        // Cache file system operations for better performance
        cachedChecks: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
      // Enable HMR (Hot Module Replacement)
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
    },

    // Preview configuration
    preview: {
      port: 3000,
      open: true
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: isDev ? 'inline' : 'hidden',
      assetsDir: 'assets',
      copyPublicDir: true,
      minify: isDev ? 'esbuild' : 'terser',
      cssCodeSplit: true,
      reportCompressedSize: !isDev,
      chunkSizeWarningLimit: 1000,
      // Inline assets smaller than 4KB (base64 encoding)
      assetsInlineLimit: 4096,
      // Terser options for production
      terserOptions: isDev ? undefined : {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        },
      },
      // Enable brotli and gzip compression
      brotliSize: true,
      // Disable sourcemap in production
      sourcemap: isDev,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
            framer: ['framer-motion'],
            icons: ['react-icons/fa', 'react-icons/fi', 'react-icons/bs', 'react-icons/si']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (/\.(css|scss)$/i.test(assetInfo.name)) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },

    // Plugins
    plugins: [
      react({
        fastRefresh: !process.env.DISABLE_FAST_REFRESH,
        jsxRuntime: 'automatic',
        babel: {
          plugins: []
        }
        // Removed include as it's not needed
      }),
      ViteImageOptimizer(imageOptimizerOptions),
      imagetools({
        defaultDirectives: (url) => {
          const params = new URLSearchParams();
          params.append('format', 'avif;webp');
          params.append('quality', '80');
          return new URLSearchParams(params);
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Sahil Portfolio',
          short_name: 'Portfolio',
          description: 'Personal portfolio of Sahil',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      // Bundle analyzer
      process.env.VITE_BUNDLE_ANALYZE === 'true' && 
      visualizer({
        filename: 'reports/bundle-stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    
    // CSS configuration
    css: {
      devSourcemap: isDev,
      modules: {
        localsConvention: 'camelCaseOnly'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/variables.scss";`
        }
      }
    },
    
    // Optimize dependencies
    optimizeDeps: {
      // Pre-bundle these dependencies for faster dev server start
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
      // Exclude these from optimization
      exclude: ['js-big-decimal'],
      // Enable dependency optimization in build mode
      disabled: false,
      // Force dependency optimization in build mode
      force: command === 'build',
      // ESBuild options
      esbuildOptions: {
        // Treat .js files as JSX
        loader: { '.js': 'jsx' },
        // Target modern browsers
        target: 'es2020',
        // Enable tree shaking
        treeShaking: true,
        // Minify the code
        minify: true,
      },
      // Enable dependency optimization in watch mode
      needsInterop: [],
    },

    // Public directory configuration
    publicDir: 'public',
    // Whether to log info about assets
    logLevel: isDev ? 'info' : 'warn',
    // Clear the screen when reporting messages
    clearScreen: !isDev,
    // Assets to include in the build
    assetsInclude: [
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.gif',
      '**/*.svg',
      '**/*.ico',
      '**/*.webp',
      '**/*.avif',
      '**/*.mp4',
      '**/*.webm',
      '**/*.ogg',
      '**/*.mp3',
      '**/*.wav',
      '**/*.flac',
      '**/*.aac',
      '**/*.woff',
      '**/*.woff2',
      '**/*.eot',
      '**/*.ttf',
      '**/*.otf',
      '**/*.jpeg',
      '**/*.gif',
      '**/*.webp'
    ]
  };
});
