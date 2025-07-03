import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Get the directory name in ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(({ command, mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set base URL based on command (serve/build) and environment
  const isProduction = command === 'build';
  const isGitHubPages = env.GITHUB_PAGES === 'true';
  
  // In development, use root path, in production use the repository name for GitHub Pages
  const base = isProduction && isGitHubPages ? '/Sahil-Portfolio/' : '/';
  
  return {
    plugins: [react()],
    base,
    define: {
      // Make environment variables available in the client code
      'import.meta.env.BASE_URL': JSON.stringify(base)
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      open: true,
      host: 'localhost',
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
        overlay: false
      },
      fs: {
        // Allow serving files from one level up from the package root
        allow: ['..']
      },
      // Disable file system caching during development
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
