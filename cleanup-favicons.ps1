# Clean up favicon files in public directory
$filesToRemove = @(
    "favicon-*.png",
    "android-chrome-*.png",
    "apple-touch-icon.png",
    "browserconfig.xml",
    "mstile-*.png",
    "safari-pinned-tab.svg",
    "site.webmanifest"
)

foreach ($file in $filesToRemove) {
    $path = Join-Path -Path "public" -ChildPath $file
    if (Test-Path $path) {
        Remove-Item -Path $path -Force -ErrorAction SilentlyContinue
        Write-Host "Removed: $path"
    }
}

# Remove favicons directory if it exists
$faviconDir = Join-Path -Path "public" -ChildPath "favicons"
if (Test-Path $faviconDir) {
    Remove-Item -Path $faviconDir -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Removed directory: $faviconDir"
}

Write-Host "Cleanup complete!"
