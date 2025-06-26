import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './', // Relative base path for GitHub Pages
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: [
        resolve(__dirname, 'index.html')
        // Add other HTML files here if they exist
        // resolve(__dirname, 'about.html'),
        // resolve(__dirname, 'projects.html'),
        // resolve(__dirname, 'contact.html')
      ],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
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
      '@': resolve(__dirname, './src')
    }
  },
  plugins: []
});
