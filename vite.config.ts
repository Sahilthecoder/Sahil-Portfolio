import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/Sahil-Portfolio/' : '/';
  
  return {
    base,

    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      open: true,
      proxy: {},
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
      },
    },
    preview: {
      port: 5173,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: isProduction ? 'terser' : false,
      emptyOutDir: true,
      assetsInlineLimit: 0, // Ensure all assets are emitted as files
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : {},
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (['png', 'jpe?g', 'gif', 'svg', 'webp', 'avif', 'ico'].includes(ext)) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer-motion': ['framer-motion'],
            'lucide-react': ['lucide-react']
          }
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base),
      'process.env': {},
      'process.env.NODE_ENV': `"${mode}"`,
      'process.env.BASE_URL': `"${base}"`,
    },
  };
});
