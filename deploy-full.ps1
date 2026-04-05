cd D:\projects\portfolio\portfolio
git add .
git commit -m "Source update before build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
npm run build
robocopy "D:\projects\portfolio\portfolio\dist" "D:\projects\portfolio\prod\build" /E /IS /IT
cd D:\projects\portfolio\prod\build
if (-not (Test-Path ".git")) { git init }
git remote add origin https://github.com/zahisial/shersial-app.git 2>$null
git add .
git commit -m "Deploy build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push -u origin master --force