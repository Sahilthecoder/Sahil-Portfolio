import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: env.VITE_BASE_URL || '/Sahil-Portfolio/',
    plugins: [
      react({
        jsxImportSource: 'react',
        jsxRuntime: 'automatic'
      })
    ],
    server: {
      port: 3000,
      open: true,
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL || '/Sahil-Portfolio/'),
      'process.platform': '"browser"',
      'process.versions.node': '"18.0.0"',
      'process.version': '"v18.0.0"',
      global: 'window',
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'react-icons'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  };
});
