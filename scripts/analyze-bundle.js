const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { defineConfig } = require('@vitejs/plugin-react');

// Create a temporary Vite config with bundle analyzer
const tempConfig = defineConfig({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analysis.html',
      openAnalyzer: false,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ai': ['@tensorflow/tfjs', '@langchain/core', 'openai'],
          'pdf': ['html2canvas', 'jspdf'],
        },
      },
    },
  },
});

// Save the temporary config
const tempConfigPath = path.join(__dirname, 'vite.temp.config.js');
fs.writeFileSync(
  tempConfigPath,
  `import { defineConfig } from 'vite'\n   import react from '@vitejs/plugin-react'\n   import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'\n   \n   export default defineConfig(${JSON.stringify(tempConfig, null, 2)})`
);

// Run the build with analysis
console.log('Starting build with bundle analysis...');
try {
  execSync('npx vite build --config scripts/vite.temp.config.js', { stdio: 'inherit' });
  console.log('Bundle analysis complete! Report saved to dist/bundle-analysis.html');
  
  // Generate recommendations
  const recommendations = [
    '✅ Consider code-splitting heavy dependencies',
    '✅ Review vendor chunks for optimization opportunities',
    '✅ Check for duplicate dependencies',
    '✅ Analyze runtime dependencies',
  ];
  
  console.log('\nOptimization Recommendations:');
  console.log(recommendations.join('\n'));
  
} catch (error) {
  console.error('Error during build analysis:', error);
} finally {
  // Clean up
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }
}
