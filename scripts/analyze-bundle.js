const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { visualizer } = require('rollup-plugin-visualizer');

// Create a bundle analysis report using rollup-plugin-visualizer
const generateBundleAnalysis = () => {
  try {
    console.log('Generating bundle analysis report...');
    
    // Ensure the reports directory exists
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    // Run the build with the visualizer plugin
    execSync('vite build --mode production', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        VITE_BUNDLE_ANALYZE: 'true'
      }
    });
    
    console.log('Bundle analysis report generated at:', path.join(reportsDir, 'bundle-stats.html'));
  } catch (error) {
    console.error('Error generating bundle analysis:', error);
    process.exit(1);
  }
};

// Export the Vite config for the visualizer plugin
module.exports = {
  plugins: [
    process.env.VITE_BUNDLE_ANALYZE === 'true' && visualizer({
      filename: 'reports/bundle-stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
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
