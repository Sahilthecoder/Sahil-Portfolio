import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173,
    },
    port: 5173,
    strictPort: false,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
