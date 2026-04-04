 # 1. Copy dist contents to prod\build
Remove-Item -Path D:\projects\portfolio\prod\build\* -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path D:\projects\portfolio\portfolio\dist\* -Destination D:\projects\portfolio\prod\build -Recurse -Force

# 2. Git commit & push
cd D:\projects\portfolio\prod\build
git add .
git commit -m "Auto-deploy after build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin build --force


Write-Host "✅ Build and deployment pushed!" -ForegroundColor Green