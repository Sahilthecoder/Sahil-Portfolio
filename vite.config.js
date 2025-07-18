import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path when served in production
  base: isProduction ? '/Sahil-Portfolio/' : '/',
  
  // Server configuration
  server: {
    port: 3002,
    open: true,
    strictPort: true,
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    fs: {
      strict: false,
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: isProduction ? false : 'inline',
    minify: isProduction ? 'terser' : false,
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Default value (4kb)
    commonjsOptions: {
      transformMixedEsModules: true,
      esmExternals: true
    },
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'react-icons'],
        },
      },
    },
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
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
  
  // CSS configuration
  css: {
    devSourcemap: !isProduction,
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
  },
  
  // Environment variables
  define: {
    'process.env': {},
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    'import.meta.env.BASE_URL': JSON.stringify(isProduction ? '/Sahil-Portfolio/' : '/')
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
  clearScreen: true
});
