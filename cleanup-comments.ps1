$files = @(
    "pages\auth.vue",
    "pages\index.vue", 
    "pages\settings.vue",
    "components\Window.vue",
    "components\LaptopScreen.vue",
    "components\apps\Notes.vue",
    "components\apps\Messages.vue",
    "components\apps\Evidence.vue",
    "components\apps\Email.vue",
    "components\apps\Default.vue",
    "stores\auth.ts",
    "stores\game.ts",
    "stores\laptop.ts",
    "server\api\auth\login.post.ts",
    "server\api\auth\register.post.ts",
    "server\api\user\profile.get.ts",
    "server\utils\database.ts",
    "server\utils\jwt.ts",
    "middleware\auth.global.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Cleaning $file..."
        $content = Get-Content $file -Raw
        $content = $content -replace '<!--[\s\S]*?-->', ''
        $content = $content -replace '^\s*//.*$', ''
        $content = $content -replace '\n\s*\n\s*\n', "`n`n"
        $content | Set-Content $file -NoNewline
        Write-Host "Cleaned $file"
    }
}

Write-Host "All comments removed!"
