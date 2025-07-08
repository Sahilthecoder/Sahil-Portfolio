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

// Log environment info
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Using base URL: "${base}"`);
console.log('Vite config loaded with base:', base);

export default defineConfig({
  base: base,
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.ico', '**/*.webp', '**/*.avif'],
  
  resolve: {
    alias: [
      {
        find: /^@\/(.*)/,
        replacement: path.resolve(__dirname, 'src/$1')
      }
    ],
    extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx']
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'framer-motion',
      'react-icons'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
    },
  },

  plugins: [
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { 
            runtime: 'automatic',
            importSource: 'react'
          }]
        ],
        babelrc: false,
        configFile: false,
      },
      fastRefresh: true,
      exclude: /\/node_modules\/|\/dist\/|\/\.git\//,
    })
  ],

  server: {
    port: 3000,
    strictPort: true,
    open: true,
    host: '0.0.0.0',
    cors: {
      origin: true,
      credentials: true
    },
    hmr: {
      host: 'localhost',
      port: 3000,
      protocol: 'ws',
      overlay: true
    },
    fs: {
      strict: false,
      allow: ['..']
    },
    watch: {
      usePolling: true,
      interval: 100
    },
    proxy: {},
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true
    },
    errorOverlay: true,
    mimeTypes: {
      'text/jsx': ['jsx'],
      'text/tsx': ['tsx'],
      'application/javascript': ['js', 'mjs'],
      'application/x-javascript': ['js'],
      'text/javascript': ['js']
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    assetsInlineLimit: 4096, // 4kb
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    copyPublicDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sw: path.resolve(__dirname, 'src/sw.js')
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
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
