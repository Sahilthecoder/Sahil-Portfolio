import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL for GitHub Pages
const base = '/Sahil-Portfolio/';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base,
    publicDir: 'public',
    appType: 'spa',
    
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
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: isProduction ? false : 'inline',
      minify: isProduction ? 'terser' : false,
      target: 'esnext',
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true,
      
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'react-icons'],
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (ext === 'css') {
              return 'assets/css/[name].[hash][extname]';
            }
            if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js'
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
    
    // Environment variables
    define: {
      'process.env': {},
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
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
      },
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
