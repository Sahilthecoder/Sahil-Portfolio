import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
const isProduction = process.env.NODE_ENV === 'production';

const base = '/Sahil-Portfolio/';

export default defineConfig({
  base: base,
  plugins: [react()],
  define: {
    'import.meta.env.BASE_URL': JSON.stringify(base)
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: !isProduction,
    minify: isProduction ? 'esbuild' : false,
    assetsInlineLimit: 0, // Force all assets to be emitted as files
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@emotion/react', '@emotion/styled', 'framer-motion'],
        },
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop().toLowerCase();
          const folder = {
            png: 'images',
            jpg: 'images',
            jpeg: 'images',
            gif: 'images',
            webp: 'images',
            svg: 'images',
            ico: 'favicon',
            css: 'css',
            js: 'js',
            json: 'data',
            woff: 'fonts',
            woff2: 'fonts',
            eot: 'fonts',
            ttf: 'fonts',
            otf: 'fonts'
          }[ext] || 'misc';
          return `assets/${folder}/[name]-[hash][extname]`;
        }
      }
    }
  }
})
