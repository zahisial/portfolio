cd D:\projects\portfolio\portfolio
git add .
git commit -m "Source update before build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
npm run build

# Empty prod\build but keep .git folder (if exists)
Write-Host "🧹 Emptying prod\build (keeping .git)..." -ForegroundColor Cyan
Get-ChildItem -Path D:\projects\portfolio\prod\build -Exclude .git | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Copy new build files
robocopy "D:\projects\portfolio\portfolio\dist" "D:\projects\portfolio\prod\build" /E /IS /IT

cd D:\projects\portfolio\prod\build
if (-not (Test-Path ".git")) { git init }
git remote add origin https://github.com/zahisial/shersial-app.git 2>$null
git add .
git commit -m "Deploy build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push -u origin build --force