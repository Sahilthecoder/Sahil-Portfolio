import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
  // ✅ MUST for GitHub Pages deployment
  base: '/Sahil-Portfolio/',

  plugins: [react()],
  
  server: {
    port: 5173,
    strictPort: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173,
      overlay: false
    },
    watch: {
      usePolling: true,
      useFsEvents: false
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    force: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    conditions: ['development', 'browser'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules')
    ]
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@langchain/openai',
      '@sentry/react',
      'plausible'
    ]
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: true,
    
    // Ensure assets are copied to the correct location
    assetsInlineLimit: 0, // Force all assets to be copied to the output directory
    
    // Minification options
    minify: 'esbuild',
    
    // Ensure proper handling of static assets
    manifest: true,
    
    // Configure rollup options
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@langchain/openai',
            '@sentry/react',
            '@sentry/tracing',
            'plausible'
          ]
        }
      }
    },

    // ⚠️ This only works if minify is 'terser'
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // }
  },

  publicDir: 'public',

  assetsInclude: [
    '**/*.png', '**/*.ico', '**/*.svg',
    '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'
  ]
}));
