import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        projects: './projects.html',
        resume: './resume.html',
        contact: './contact.html',
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/base/_variables.scss";`,
      },
    },
  },
});
