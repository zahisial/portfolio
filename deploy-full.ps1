cd D:\projects\portfolio\portfolio
git add .
git commit -m "Source update before build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push -u origin main
npm run build

Write-Host "🧹 Emptying prod\build (keeping .git)..." -ForegroundColor Cyan
Get-ChildItem -Path D:\projects\portfolio\prod\build -Exclude .git | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

robocopy "D:\projects\portfolio\portfolio\dist" "D:\projects\portfolio\prod\build" /E /IS /IT

cd D:\projects\portfolio\prod\build
$env:GIT_REDIRECT_STDERR = '2>&1'

if (-not (Test-Path ".git")) { git init }
git remote set-url origin https://github.com/zahisial/shersial-app.git 2>$null
if ($LASTEXITCODE -ne 0) { git remote add origin https://github.com/zahisial/shersial-app.git }

git add .
git commit -m "Deploy build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push -u origin HEAD:build --force

Compress-Archive -Path "D:\projects\portfolio\prod\build\*" -DestinationPath "D:\projects\portfolio\prod\build.zip" -Force