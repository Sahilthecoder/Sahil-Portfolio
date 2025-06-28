import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
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
    minify: 'esbuild',
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
          ],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  publicDir: 'public',
  assetsInclude: [
    '**/*.png', '**/*.ico', '**/*.svg', 
    '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'
  ],
}));
