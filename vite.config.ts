import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = '/Sahil-Portfolio/'; // must match your GitHub repo name (note the capital "P")
  const isProduction = mode === 'production';

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': {},
      'process.env.NODE_ENV': `"${mode}"`,
      'process.env.BASE_URL': `"${base}"`,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: isProduction ? 'terser' : false,
      manifest: true,
      emptyOutDir: true,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          }
        : {},
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      open: true,
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
  };
});
