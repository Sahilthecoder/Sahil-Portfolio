import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  base: '/Sahilthecoder/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/base/_variables";
          @import "./src/styles/base/_reset";
          @import "./src/styles/layouts/_grid";
          @import "./src/styles/layouts/_containers";
          @import "./src/styles/components/_buttons";
          @import "./src/styles/components/_cards";
          @import "./src/styles/pages/_home";
          @import "./src/styles/pages/_projects";
          @import "./src/styles/utils/_mixins";
          @import "./src/styles/utils/_functions";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        projects: './projects.html',
        resume: './resume.html',
        contact: './contact.html',
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
        changeOrigin: true
      }
    }
  }
});
