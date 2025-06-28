#!/usr/bin/env node
/**
 * Update Repository Links Script
 * 
 * This script scans the project for common repository URL patterns and
 * updates them to the correct repository URL.
 * 
 * Usage: node scripts/update-repo-links.js
 */

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// Configuration
const REPO_URL = 'https://github.com/Sahilthecoder/Sahil-Portfolio';
const OLD_REPO_PATTERNS = [
  'github\.com/yourusername/your-repo',
  'your-portfolio-url\.com',
  'github\.com/SahilTheCoder', // Case-sensitive
  'sahil-ali\.vercel\.app' // Example of old domain
];

// File patterns to search in
const FILE_PATTERNS = [
  '**/*.{js,jsx,ts,tsx,md,mdx,json,html}',
  '.*rc',
  '*.{json,md,html}'
];

// Files to exclude
const EXCLUDE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/out/**',
  '**/.git/**'
];

/**
 * Replace repository URLs in file content
 */
function updateRepoLinks(content, filePath) {
  let updated = false;
  let newContent = content;
  
  OLD_REPO_PATTERNS.forEach(pattern => {
    const regex = new RegExp(pattern, 'g');
    if (regex.test(newContent)) {
      console.log(`ℹ️  Found old repo pattern in ${filePath}: ${pattern}`);
      newContent = newContent.replace(regex, REPO_URL);
      updated = true;
    }
  });
  
  return { content: newContent, updated };
}

/**
 * Process a single file
 */
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { content: newContent, updated } = updateRepoLinks(content, filePath);
    
    if (updated) {
      await fs.writeFile(filePath, newContent, 'utf8');
      console.log(`✅ Updated ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting repository link update...');
  console.log(`🔍 Looking for files matching: ${FILE_PATTERNS.join(', ')}`);
  
  try {
    // Find all files matching the patterns
    const files = await glob(FILE_PATTERNS, { 
      ignore: EXCLUDE,
      nodir: true,
      absolute: true,
      cwd: process.cwd()
    });
    
    console.log(`🔍 Found ${files.length} files to check`);
    
    // Process each file
    let updatedCount = 0;
    for (const file of files) {
      const wasUpdated = await processFile(file);
      if (wasUpdated) updatedCount++;
    }
    
    console.log(`\n✨ Done! Updated ${updatedCount} files.`);
    
    if (updatedCount > 0) {
      console.log('\n💡 Run `git diff` to review the changes.');
      console.log('   Commit the changes with: git commit -am "chore: update repository links"');
    } else {
      console.log('\nℹ️  No files needed updating.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
