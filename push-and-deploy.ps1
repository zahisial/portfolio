# ============================================
# 1. Push source code to main branch
# ============================================
Write-Host "📤 Pushing source code to main..." -ForegroundColor Cyan
cd D:\projects\portfolio\portfolio
git add .
git commit -m "Source update $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

# ============================================
# 2. Build the React app
# ============================================
Write-Host "🔨 Building React app..." -ForegroundColor Cyan
npm run build

# ============================================
# 3. Clean prod\build but keep .git folder
# ============================================
Write-Host "🧹 Cleaning prod\build (keeping .git)..." -ForegroundColor Cyan
Get-ChildItem -Path D:\projects\portfolio\prod\build -Exclude .git | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# ============================================
# 4. Copy new dist contents to prod\build
# ============================================
Write-Host "📦 Copying dist to prod\build..." -ForegroundColor Cyan
Copy-Item -Path D:\projects\portfolio\portfolio\dist\* -Destination D:\projects\portfolio\prod\build -Recurse -Force

# ============================================
# 5. Git commit and push the build branch
# ============================================
Write-Host "🚀 Pushing build branch to GitHub..." -ForegroundColor Cyan
cd D:\projects\portfolio\prod\build
git add .
git commit -m "Auto-deploy after build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin build --force

Write-Host "✅ All done! Site will auto-update via cPanel." -ForegroundColor Green