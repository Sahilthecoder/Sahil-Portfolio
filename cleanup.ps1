# Enhanced Cleanup Script for Portfolio Project
# This script will clean up unnecessary files and folders to optimize the project

# Stop any running Node.js processes
Get-Process | Where-Object { $_.ProcessName -eq 'node' } | Stop-Process -Force -ErrorAction SilentlyContinue

# Set error action preference
$ErrorActionPreference = "Continue"

Write-Host "Starting project cleanup..." -ForegroundColor Cyan

# 1. Clean up Node.js related files
Write-Host "`n[1/4] Cleaning Node.js related files..." -ForegroundColor Yellow

# Remove node_modules if it exists
if (Test-Path "node_modules") {
    Write-Host "  Removing node_modules..." -ForegroundColor Gray
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}

# Remove package-lock.json if it exists
if (Test-Path "package-lock.json") {
    Write-Host "  Removing package-lock.json..." -ForegroundColor Gray
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
}

# 2. Clean up build and cache directories
Write-Host "`n[2/4] Cleaning build and cache directories..." -ForegroundColor Yellow

$directoriesToRemove = @(
    ".next",                   # Next.js build
    ".vercel",                 # Vercel cache
    ".cache",                  # Build cache
    "dist",                    # Distribution folder
    ".nuxt",                   # Nuxt.js build
    "out",                     # Static export
    "temp-portfolio",          # Temporary directory
    "public/optimized",        # Optimized images (duplicate)
    "public/optimized-images"   # Optimized images (duplicate)
)

foreach ($dir in $directoriesToRemove) {
    if (Test-Path $dir) {
        Write-Host "  Removing directory: $dir" -ForegroundColor Gray
        Remove-Item -Recurse -Force $dir -ErrorAction SilentlyContinue
    }
}

# 3. Clean up configuration files and backups
Write-Host "`n[3/4] Cleaning up configuration files and backups..." -ForegroundColor Yellow

$filesToRemove = @(
    # Configuration files
    "babel.config.cjs",
    "postcss.config.cjs",
    "vite.config.js.new",
    "vite.config.mjs.bak",
    "vite.config.ts",
    "vite.minimal.config.js",
    
    # Backup files
    "package.json.backup",
    "src/index.css.backup",
    "public/about.html.bak",
    "public/manifest.json.bak",
    "public/sw.js.bak",
    
    # Log files
    "image-update-debug.log",
    "image-update-simple.log",
    "analysis.log"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Write-Host "  Removing file: $file" -ForegroundColor Gray
        Remove-Item -Force $file -ErrorAction SilentlyContinue
    }
}

# 4. Clean up source files
Write-Host "`n[4/4] Cleaning up source files..." -ForegroundColor Yellow

# Remove App.tsx if App.jsx exists
if ((Test-Path "src/App.tsx") -and (Test-Path "src/App.jsx")) {
    Write-Host "  Removing duplicate App.tsx (keeping App.jsx)" -ForegroundColor Gray
    Remove-Item -Force "src/App.tsx" -ErrorAction SilentlyContinue
}

# Remove minimal.css if it's not being used
if (Test-Path "src/minimal.css") {
    $minimalCssContent = Get-Content -Path "src/minimal.css" -Raw
    $cssFiles = Get-ChildItem -Path . -Include *.css,*.scss,*.sass,*.less -Recurse -File
    $isUsed = $false
    
    foreach ($cssFile in $cssFiles) {
        $content = Get-Content -Path $cssFile.FullName -Raw
        if ($content -match "minimal\.css") {
            $isUsed = $true
            break
        }
    }
    
    if (-not $isUsed) {
        Write-Host "  Removing unused minimal.css" -ForegroundColor Gray
        Remove-Item -Force "src/minimal.css" -ErrorAction SilentlyContinue
    }
}

Write-Host "`nCleanup completed successfully!" -ForegroundColor Green
Write-Host "`nNext steps:"
Write-Host "1. Run 'npm install' to reinstall dependencies"
Write-Host "2. Run 'npm run build' to rebuild the project"
