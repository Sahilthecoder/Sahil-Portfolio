import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [react()],
  server: {
    port: 4000,
    strictPort: true,
    open: true,
    host: true,
    hmr: false, // Disable HMR to prevent auto-refresh
    watch: {
      usePolling: false,
      // Don't watch node_modules for changes
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // Use the UMD build of TensorFlow.js for better compatibility
      '@tensorflow/tfjs': '@tensorflow/tfjs/dist/tf.min.js',
      '@tensorflow/tfjs-core': '@tensorflow/tfjs/dist/tf-core.min.js',
      '@tensorflow/tfjs-data': '@tensorflow/tfjs/dist/tf-data.min.js',
      '@tensorflow/tfjs-layers': '@tensorflow/tfjs/dist/tf-layers.min.js',
      '@tensorflow-models/speech-commands': '@tensorflow-models/speech-commands/dist/speech-commands.min.js'
    }
  },
  // Exclude TensorFlow.js from optimization to prevent bundling issues
  optimizeDeps: {
    exclude: [
      '@tensorflow/tfjs',
      '@tensorflow/tfjs-core',
      '@tensorflow/tfjs-data',
      '@tensorflow/tfjs-layers',
      '@tensorflow-models/speech-commands'
    ]
  }
});
