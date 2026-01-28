# Deploy script for Grace in the Margins
# This script handles everything: check for changes, build, commit, and push

Write-Host "`n=== Checking for changes ===" -ForegroundColor Cyan

# Check if there are any uncommitted changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "No uncommitted changes found." -ForegroundColor Yellow
    
    # Check if local is ahead of remote
    git fetch origin main 2>&1 | Out-Null
    $ahead = git rev-list --count origin/main..HEAD
    
    if ($ahead -eq 0) {
        Write-Host "Everything is up to date. Nothing to push." -ForegroundColor Green
        exit 0
    } else {
        Write-Host "You have $ahead unpushed commit(s). Pushing now..." -ForegroundColor Yellow
        git push
        Write-Host "`nSuccessfully pushed to GitHub!" -ForegroundColor Green
        exit 0
    }
}

Write-Host "Found changes:" -ForegroundColor Green
git status --short

# Build the site
Write-Host "`n=== Building site ===" -ForegroundColor Cyan
npx @11ty/eleventy

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nBuild failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild successful" -ForegroundColor Green

# Stage all changes
Write-Host "`n=== Staging changes ===" -ForegroundColor Cyan
git add -A

# Create commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
Write-Host "`n=== Creating commit ===" -ForegroundColor Cyan
git commit -m "Update site - $timestamp"

# Push to GitHub
Write-Host "`n=== Pushing to GitHub ===" -ForegroundColor Cyan
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Your changes are now live on GitHub." -ForegroundColor Green
    Write-Host "Netlify will deploy them within 1-2 minutes." -ForegroundColor Cyan
} else {
    Write-Host "`nPush failed. Please check the error above." -ForegroundColor Red
    exit 1
}
