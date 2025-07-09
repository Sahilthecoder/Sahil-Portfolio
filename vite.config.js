import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL configuration
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/Sahil-Portfolio/' : '/';

// Set environment variables for base URL
process.env.VITE_BASE_URL = base;
process.env.BASE_URL = base;

console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Using base URL: "${base}"`);

export default defineConfig({
  base: base,
  publicDir: 'public',
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    cors: true,
    fs: {
      strict: false,
      allow: ['..']
    },
    headers: {
      'Content-Security-Policy': "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "img-src 'self' data: https:;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
      overlay: false
    },
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        const url = req.originalUrl || req.url;
        
        // Set appropriate Content-Type headers based on file extension
        if (url.endsWith('.js') || url.endsWith('.mjs') || url.endsWith('.jsx')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (url.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        } else if (url.endsWith('.json')) {
          res.setHeader('Content-Type', 'application/json');
        } else if (url.endsWith('.webmanifest') || url.endsWith('manifest.json')) {
          res.setHeader('Content-Type', 'application/manifest+json');
        } else if (url.endsWith('.ico')) {
          res.setHeader('Content-Type', 'image/x-icon');
        } else if (url.endsWith('.png')) {
          res.setHeader('Content-Type', 'image/png');
        } else if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
          res.setHeader('Content-Type', 'image/jpeg');
        } else if (url.endsWith('.svg')) {
          res.setHeader('Content-Type', 'image/svg+xml');
        } else if (url.endsWith('.webp')) {
          res.setHeader('Content-Type', 'image/webp');
        } else if (url.endsWith('.woff')) {
          res.setHeader('Content-Type', 'font/woff');
        } else if (url.endsWith('.woff2')) {
          res.setHeader('Content-Type', 'font/woff2');
        } else if (url.endsWith('.ttf')) {
          res.setHeader('Content-Type', 'font/ttf');
        } else if (url.endsWith('.eot')) {
          res.setHeader('Content-Type', 'application/vnd.ms-fontobject');
        } else if (url.endsWith('.otf')) {
          res.setHeader('Content-Type', 'font/otf');
        }
        
        // Continue to the next middleware
        next();
      });
    }
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        presets: ['@babel/preset-react'],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          '@emotion/babel-plugin'
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: isProduction ? 'terser' : false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('@faker-js/faker')) {
              return 'vendor-faker';
            }
            if (id.includes('@fontsource') || id.includes('typeface-')) {
              return 'vendor-fonts';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('@headlessui') || id.includes('@heroicons')) {
              return 'vendor-ui';
            }
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
            return `assets/${extType}/[name][extname]`;
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: (chunkInfo) => `assets/js/${chunkInfo.name}-[hash].js`
      }
    }
  },

  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL || '/Sahil-Portfolio/'),
    'process.platform': '"browser"',
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'production'}"`,
    'process.versions.node': '"18.0.0"',
    'process.version': '"v18.0.0"',
    global: 'window',
  },

  esbuild: {
    jsx: 'automatic',
    loader: 'tsx',
    include: /src\/.*\.(jsx|tsx)?$/,
    exclude: [],
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
