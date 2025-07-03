import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { imagetools } from 'vite-imagetools';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  
  // Base configuration - use environment variable or detect from URL
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production';
  const repoName = 'Sahil-Portfolio';
  let base = isGitHubPages ? `/${repoName}/` : '/';
  
  // Ensure base starts and ends with a slash
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  
  console.log('Vite Config - Base URL:', { base, isGitHubPages, env: process.env.NODE_ENV });
  
  const imageOptimizerOptions = {
    jpg: { quality: 80, mozjpeg: true },
    jpeg: { quality: 80, mozjpeg: true },
    png: { quality: 80, compressionLevel: 9 },
    webp: { quality: 80, lossless: false, effort: 6 },
    avif: { quality: 70, lossless: false, speed: 8 },
    skipIfLarger: true
  };

  return {
    base,
    publicDir: 'public',
    
    server: {
      port: 3000,
      host: true,
      open: !process.env.CI,
      strictPort: true,
      cors: true,
      historyApiFallback: true,
      fs: {
        allow: [
          path.resolve(__dirname, '..'),
          path.resolve(__dirname, 'node_modules')
        ],
        cachedChecks: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
    },

    preview: {
      port: 3000,
      open: true
    },

    build: {
      outDir: 'dist',
      sourcemap: isDev ? 'inline' : false,
      assetsDir: 'assets',
      copyPublicDir: true,
      minify: isDev ? 'esbuild' : 'terser',
      cssCodeSplit: true,
      reportCompressedSize: !isDev,
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096,
      brotliSize: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
            framer: ['framer-motion'],
            icons: ['react-icons/fa', 'react-icons/fi', 'react-icons/bs', 'react-icons/si'],
            vendor: ['@emailjs/browser']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (/\.(css|scss)$/i.test(assetInfo.name)) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      },
      terserOptions: isDev ? undefined : {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        },
      },
    },

    plugins: [
      react({
        fastRefresh: !process.env.DISABLE_FAST_REFRESH,
        jsxRuntime: 'automatic',
        babel: { plugins: [] }
      }),
      imagetools({
        defaultDirectives: () => {
          const params = new URLSearchParams();
          params.append('format', 'avif;webp');
          params.append('quality', '80');
          return new URLSearchParams(params);
        },
      }),
      ViteImageOptimizer(imageOptimizerOptions),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Sahil Ali - Portfolio',
          short_name: 'Portfolio',
          description: 'Professional Portfolio of Sahil Ali',
          theme_color: '#2563eb',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/optimized-images/apple-touch-icon.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/optimized-images/logo512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ].filter(Boolean),
    
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    
    css: {
      devSourcemap: isDev,
      modules: { localsConvention: 'camelCaseOnly' },
      preprocessorOptions: {
        scss: { additionalData: `@import "src/styles/variables.scss";` }
      }
    },
    
    optimizeDeps: {
      include: [
        'react', 'react-dom', 'react-dom/client', 'react-router-dom',
        'framer-motion', 'react-helmet', 'react-helmet-async',
        'react-icons/fa', 'react-icons/fi', 'react-icons/bs', 'react-icons/si',
        'react-icons/io5', 'react-icons/md', '@sentry/react', 'plausible',
        'date-fns', 'date-fns-tz'
      ],
      exclude: ['js-big-decimal'],
      force: true,
      esbuildOptions: {
        loader: { '.js': 'jsx' },
        target: 'es2020',
        treeShaking: true,
        minify: true,
      },
      needsInterop: [],
    },
  };
});
