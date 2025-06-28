# Stop any running Node.js processes
Get-Process | Where-Object { $_.ProcessName -eq 'node' } | Stop-Process -Force

# Remove node_modules if it exists
if (Test-Path "node_modules") {
    Write-Host "Removing node_modules..."
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}

# Remove package-lock.json if it exists
if (Test-Path "package-lock.json") {
    Write-Host "Removing package-lock.json..."
    Remove-Item -Force package-lock.json
}

# Remove .next folder if it exists
if (Test-Path ".next") {
    Write-Host "Removing .next folder..."
    Remove-Item -Recurse -Force .next
}

Write-Host "Cleanup complete!"
