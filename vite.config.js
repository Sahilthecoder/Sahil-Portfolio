import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// Disable React's Fast Refresh if needed
const disableFastRefresh = process.env.DISABLE_FAST_REFRESH === 'true';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  
  // Determine base URL
  const base = env.VITE_BASE_URL || (command === 'serve' ? '/' : '/Sahil-Portfolio/');
  
  return {
    // Base URL configuration for GitHub Pages
    base: base.endsWith('/') ? base : `${base}/`,
    
    // Environment variables
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base.endsWith('/') ? base : `${base}/`),
      'process.env': {}
    },

    // Server configuration
    server: {
      port: 3000,
      open: true,
      cors: true,
      fs: {
        allow: ['..', 'node_modules']
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, X-Custom-Header',
        'X-Content-Type-Options': 'nosniff'
      }
    },

    // Preview configuration
    preview: {
      port: 3000,
      open: true
    },

    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDev,
      minify: isDev ? false : 'terser',
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 0, // Ensures all asset paths are relative to the base URL
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
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
        }
      }
    },

    // Plugins
    plugins: [
      react({
        fastRefresh: !disableFastRefresh,
        jsxRuntime: 'automatic',
        babel: {
          plugins: []
        },
        include: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js']
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
      exclude: ['js-big-decimal'],
      force: command === 'build',
      esbuildOptions: {
        loader: { '.js': 'jsx' }
      }
    },

    // Public directory
    publicDir: 'public',

    // Assets to include in the build
    assetsInclude: [
      '**/*.png',
      '**/*.ico',
      '**/*.svg',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.gif',
      '**/*.webp'
    ],


  };
});
