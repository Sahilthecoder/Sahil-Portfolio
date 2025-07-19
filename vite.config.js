import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Sahil-Portfolio/' : '/',
  plugins: [
    react(),
    visualizer(),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith('.webmanifest')) {
            res.setHeader('Content-Type', 'application/manifest+json');
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: '0.0.0.0',
    cors: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    },
    headers: {
      'Content-Security-Policy': "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' data: https://fonts.gstatic.com; " +
        "connect-src 'self' https:;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'public')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'react-helmet-async', 'swiper']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'react-icons'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
