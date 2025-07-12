import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL for GitHub Pages
const base = process.env.NODE_ENV === 'production' ? '/Sahil-Portfolio/' : '/';

// Ensure the base path has a leading slash but no trailing slash
const basePath = base.endsWith('/') ? base.slice(0, -1) : base;

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: base,
    // Add .html extension to all routes
    publicDir: 'public',
    appType: 'spa',
    // Environment variables and build-time defines
    define: {
      'process.env': {},
      'process.env.BASE_URL': JSON.stringify(base),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __GIT_COMMIT_HASH__: JSON.stringify(process.env.GIT_COMMIT_HASH || '')
    },
    
    // Server configuration
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      host: '0.0.0.0',
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000
      },
      fs: {
        strict: true,
        allow: ['..']
      },
      // Enable CORS for development
      cors: true,
      // Enable CORS for all routes
      proxy: {}
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      minify: isProduction ? 'terser' : false,
      // Ensure all static assets are copied
      assetsInlineLimit: 0, // Force all assets to be copied as files
      // Copy public directory to dist
      copyPublicDir: true,
      target: 'esnext',
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true,
      // Generate manifest.json for production
      manifest: isProduction,
      // Sourcemap configuration
      sourcemap: isProduction ? 'hidden' : 'inline',
      // Minify CSS
      cssCodeSplit: true,
      // Enable brotli and gzip compression
      brotliSize: true,
      
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          experience: path.resolve(__dirname, 'experience.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          'projects/zomato-analysis': path.resolve(__dirname, 'projects/zomato-analysis.html')
        },
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'react-icons'],
          },
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (ext === 'css') {
              return 'assets/css/[name].[hash][extname]';
            }
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(ext)) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          }
        }
      },
      
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : {},
    },
    
    // Plugins
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      })
    ],
    
    // Resolve configuration
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
      },
    },
    
    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        scopeBehaviour: 'local',
        generateScopedName: isProduction 
          ? '[hash:base64:5]' 
          : '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
      devSourcemap: !isProduction,
    },
    

    
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@emotion/react',
        '@emotion/styled',
        '@emotion/cache',
        '@emotion/babel-plugin',
        'framer-motion',
      ],
      exclude: [],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      }
    },
    
    // Preview configuration
    preview: {
      port: 4173,
      open: true,
      strictPort: true,
    },
    
    // Environment variables
    envPrefix: 'VITE_',
    
    // Cache directory
    cacheDir: 'node_modules/.vite',
    
    // Log level
    logLevel: isProduction ? 'warn' : 'info',
    
    // Clear screen
    clearScreen: true,
  };
});
