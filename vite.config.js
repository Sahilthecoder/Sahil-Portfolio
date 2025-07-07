import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
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
process.env.VITE_IS_GITHUB_PAGES = 'true';
process.env.VITE_APP_VERSION = process.env.npm_package_version;

console.log(`Using base URL: "${base}"`);

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';

  return {
    base: base,
    publicDir: 'public',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        srcDir: 'src',
        filename: 'sw.js',
        strategies: 'injectManifest',
        injectRegister: 'auto',
        base: base,
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg', 'logo192.png', 'logo512.png'],
        devOptions: {
          enabled: false
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,webp}'],
          runtimeCaching: [
            {
              urlPattern: new RegExp('^https://sahilthecoder\.github\.io/Sahil-Portfolio/'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'portfolio-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        manifest: {
          name: 'Sahil Ali Portfolio',
          short_name: 'SahilPortfolio',
          start_url: base,
          scope: base,
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#2563eb',
          icons: [
            {
              src: 'logo192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'logo512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg', 'logo192.png', 'logo512.png'],
        manifest: {
          name: 'Sahil Ali Portfolio',
          short_name: 'SahilPortfolio',
          description: 'Portfolio of Sahil Ali - Inventory Specialist & Data Analyst',
          theme_color: '#2563eb',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: base,
          icons: [
            {
              src: 'images/logo192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'images/logo512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: false
        }
      })
    ],
    base: base,
    define: {
      'import.meta.env.PROD': JSON.stringify(process.env.NODE_ENV === 'production'),
      'import.meta.env.VITE_BASE_URL': JSON.stringify(base)
    },
    publicDir: 'public',
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.ico', '**/*.webp', '**/*.avif'],
    assetsDir: 'assets',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'react-icons']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'avif'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      minify: isProduction ? 'esbuild' : false,
      sourcemap: !isProduction,
      target: 'esnext',
    },
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
      assetsInlineLimit: 4096, // 4kb
      emptyOutDir: true,
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
