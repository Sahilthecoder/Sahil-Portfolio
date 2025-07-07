import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL configuration for GitHub Pages
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/Sahil-Portfolio/' : '/';

// Set environment variables for base URL
process.env.VITE_BASE_URL = base;
process.env.BASE_URL = base;
process.env.VITE_APP_VERSION = process.env.npm_package_version;

console.log(`Using base URL: "${base}"`);

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';

  return {
    base: base,
    publicDir: 'public',
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.ico', '**/*.webp', '**/*.avif'],
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      host: '0.0.0.0',
      cors: true,
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './node_modules')
      }
    },
    plugins: [
      react({
        jsxImportSource: 'react',
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
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      chunkSizeWarningLimit: 1000, // in KB
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Group framework code
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor_react';
              }
              // Group animation libraries
              if (id.includes('framer-motion') || id.includes('framer')) {
                return 'vendor_animations';
              }
              // Group UI libraries
              if (id.includes('@headlessui') || id.includes('@heroicons')) {
                return 'vendor_ui';
              }
              // Group utility libraries
              if (id.includes('lodash') || id.includes('date-fns')) {
                return 'vendor_utils';
              }
              // Group all other node_modules in vendor
              return 'vendor';
            }
            return null;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').pop();
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(extType)) {
              return `assets/img/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            if (/\.(ico|webmanifest)$/.test(extType)) {
              return `assets/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        },
        treeshake: isProduction ? 'recommended' : false,
      },
      reportCompressedSize: isProduction,
      brotliSize: true,
      cssCodeSplit: true,
      copyPublicDir: true
    },
    define: {
      'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL || '/Sahil-Portfolio/'),
      'process.platform': '"browser"',
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'production'}"`,
      'process.versions.node': '"18.0.0"',
      'process.version': '"v18.0.0"',
      global: 'window'
    },
    esbuild: {
      jsx: 'automatic',
      loader: 'tsx',
      include: /src\/.*\.(jsx|tsx)?$/,
      exclude: []
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
    },
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    }
  }
});
