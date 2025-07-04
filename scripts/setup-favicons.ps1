# Create directories if they don't exist
$directories = @(
    "public/images"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir"
    }
}

# Copy logo192.png to various favicon files if they don't exist
$sourceFile = "public/logo192.png"
$destinations = @(
    "public/favicon.ico",
    "public/favicon.png",
    "public/favicon-32x32.png",
    "public/favicon-16x16.png",
    "public/apple-touch-icon.png",
    "public/images/favicon.ico",
    "public/images/favicon-32x32.png",
    "public/images/favicon-16x16.png",
    "public/images/apple-touch-icon.png"
)

foreach ($dest in $destinations) {
    if (-not (Test-Path $dest)) {
        Copy-Item -Path $sourceFile -Destination $dest -Force
        Write-Host "Created: $dest"
    }
}

Write-Host "Favicon setup completed successfully!"
