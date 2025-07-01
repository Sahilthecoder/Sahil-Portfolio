import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disable React's Fast Refresh if needed
const disableFastRefresh = process.env.DISABLE_FAST_REFRESH === 'true';

export default defineConfig(async ({ command, mode }) => {
  // Load visualizer only in development
  let visualizer = () => [];
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
    const { default: visualizerPlugin } = await import('rollup-plugin-visualizer');
    visualizer = visualizerPlugin;
  }

  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Determine base URL based on environment
  const base = env.VITE_BASE_URL || (command === 'serve' ? '/' : '/Sahil-Portfolio/');
  
  return {
    // Base URL configuration – root for dev, repo sub-folder for production (GitHub Pages)
    base: base,
    // Ensure assets are properly prefixed with base URL
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    esbuild: {
      loader: 'tsx',
      include: /src\/.*\.(tsx?|jsx?)$/,
      exclude: [],
      jsx: 'automatic',
      tsconfigRaw: {
        compilerOptions: {
          jsx: 'react-jsx'
        }
      }
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      host: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
        clientPort: 443,
        overlay: true
      },
      watch: {
        usePolling: true,
        interval: 100,
        useFsEvents: true,
        ignored: ['**/node_modules/**', '**/.git/**']
      },
      cors: true,
      fs: {
        strict: true,
        allow: ['..', 'node_modules']
      },
      proxy: {
        // Add API proxies if needed
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false
        }
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, X-Custom-Header',
        'X-Content-Type-Options': 'nosniff'
      }
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        }
      }
    },
    plugins: [
      react({
        fastRefresh: !disableFastRefresh,
        jsxRuntime: 'automatic',
        babel: {
          plugins: []
        }
      }),
      isDev && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: './dist/stats.html'
      })
    ],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-router-dom',
        'framer-motion',
        'react-helmet',
        'react-icons/fa',
        'react-helmet-async',
        '@langchain/openai',
        '@sentry/react',
        'plausible'
      ],
      force: command === 'build',
      esbuildOptions: {
        loader: { '.js': 'jsx' },
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/variables.scss";`
        }
      }
    },
    publicDir: 'public',
    assetsInclude: [
      '**/*.png', '**/*.ico', '**/*.svg',
      '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'
    ]
  }
});
