import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
// Vite plugin to copy favicon files to the root of the dist directory and update paths in index.html
const copyFaviconsPlugin = () => ({
  name: 'copy-favicons',
  closeBundle() {
    try {
      const sourceDir = path.join(__dirname, 'public');
      const targetDir = path.join(__dirname, 'dist');
      
      // Create the favicon directory in dist if it doesn't exist
      const faviconDir = path.join(targetDir, 'assets/favicon');
      if (!fs.existsSync(faviconDir)) {
        fs.mkdirSync(faviconDir, { recursive: true });
      }
      
      // Copy favicon files to both root and assets/favicon directory
      const faviconFiles = [
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'apple-touch-icon.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-96x96.png',
        'favicon.ico',
        'favicon.svg',
        'mstile-150x150.png',
        'mstile-310x310.png',
        'safari-pinned-tab.svg'
      ];
      
      faviconFiles.forEach(file => {
        const source = path.join(sourceDir, file);
        const targetRoot = path.join(targetDir, file);
        const targetAssets = path.join(faviconDir, file);
        
        if (fs.existsSync(source)) {
          // Copy to root
          fs.copyFileSync(source, targetRoot);
          console.log(`Copied ${file} to ${targetRoot}`);
          
          // Also copy to assets/favicon for reference
          fs.copyFileSync(source, targetAssets);
          console.log(`Copied ${file} to ${targetAssets}`);
        } else {
          console.warn(`File not found: ${source}`);
        }
      });
      
      // Copy site.webmanifest
      const manifestSource = path.join(sourceDir, 'site.webmanifest');
      const manifestTarget = path.join(targetDir, 'site.webmanifest');
      if (fs.existsSync(manifestSource)) {
        fs.copyFileSync(manifestSource, manifestTarget);
        console.log('Copied site.webmanifest');
      }
      
      // Update paths in index.html to point to root favicon files
      const indexPath = path.join(targetDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let indexHtml = fs.readFileSync(indexPath, 'utf8');
        
        // Replace all instances of assets/favicon/ with empty string
        indexHtml = indexHtml.replace(/assets\/favicon\//g, '');
        
        // Write the updated index.html back to disk
        fs.writeFileSync(indexPath, indexHtml, 'utf8');
        console.log('Updated paths in index.html');
      }
      
      // Update paths in site.webmanifest to point to root favicon files
      const manifestPath = path.join(targetDir, 'site.webmanifest');
      if (fs.existsSync(manifestPath)) {
        let manifest = fs.readFileSync(manifestPath, 'utf8');
        
        // Replace all instances of assets/favicon/ with empty string
        manifest = manifest.replace(/assets\/favicon\//g, '');
        
        // Write the updated site.webmanifest back to disk
        fs.writeFileSync(manifestPath, manifest, 'utf8');
        console.log('Updated paths in site.webmanifest');
      }
      
      console.log('Favicon files copied and paths updated successfully!');
    } catch (error) {
      console.error('Error processing favicon files:', error);
    }
  },
});

export default defineConfig({
  // Base public path when served in production
  base: isProduction ? '/Sahil-Portfolio/' : '/',
  
  // Server configuration
  server: {
    port: 3002,
    open: true,
    strictPort: true,
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    fs: {
      strict: false,
    },
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: isProduction ? false : 'inline',
    minify: isProduction ? 'terser' : false,
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 0, // Disable inlining of assets to ensure all favicon files are copied
    copyPublicDir: true, // Ensure public directory is copied to dist
    commonjsOptions: {
      transformMixedEsModules: true,
      esmExternals: true
    },
    modulePreload: {
      polyfill: false,
    },
    // Ensure all favicon files and index.html are copied to the output directory
    assetsInclude: ['**/*.ico', '**/*.png', '**/*.svg', '**/*.webmanifest', '**/*.html', '**/*.woff2'],
    // Configure rollup options
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Put fonts in a separate directory
          if (assetInfo.name.endsWith('.woff2') || assetInfo.name.endsWith('.ttf') || assetInfo.name.endsWith('.woff')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          // Put images in an images directory
          if (assetInfo.name.match(/\.(png|jpe?g|svg|gif|webp|avif)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // Default asset directory
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', 'react-icons'],
        },
      },
    },
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
  },
  
  // Plugins
  plugins: [
    react(),
    {
      name: 'add-google-fonts',
      transformIndexHtml(html) {
        // Only add the fonts if they're not already in the HTML
        if (!html.includes('fonts.googleapis.com/css2?family=Inter')) {
          const fontLinks = `
            <!-- Google Fonts - Inter -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          `;
          
          // Insert the font links after the opening <head> tag
          return html.replace(
            /<head([^>]*)>/,
            `<head$1>\n${fontLinks}`
          );
        }
        return html;
      },
    },
    copyFaviconsPlugin(),
  ],
  
  // CSS configuration
  css: {
    devSourcemap: !isProduction,
    modules: {
      localsConvention: 'camelCaseOnly',
      scopeBehaviour: 'local',
      generateScopedName: isProduction 
        ? '[hash:base64:5]' 
        : '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  
  // Environment variables
  define: {
    'process.env': {},
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    'import.meta.env.BASE_URL': JSON.stringify(isProduction ? '/Sahil-Portfolio/' : '/')
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@emotion/react',
      '@emotion/styled',
      '@emotion/cache',
      '@emotion/babel-plugin',
      'framer-motion',
    ],
    exclude: [],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    open: true,
    strictPort: true,
  },
  
  // Environment variables
  envPrefix: 'VITE_',
  
  // Cache directory
  cacheDir: 'node_modules/.vite',
  
  // Log level
  logLevel: isProduction ? 'warn' : 'info',
  
  // Clear screen
  clearScreen: true
});
