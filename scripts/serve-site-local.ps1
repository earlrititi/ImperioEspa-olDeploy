param(
  [int]$Port = 8080,
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $root "dist"
$routerPath = Join-Path $root "scripts\local-router.php"
$configPath = Join-Path $root "private\manifesto-config.php"

if (-not (Get-Command php -ErrorAction SilentlyContinue)) {
  throw "PHP no esta instalado o no esta en el PATH. Instala PHP, XAMPP o Laragon antes de continuar."
}

if (-not $SkipBuild) {
  Push-Location $root
  try {
    npm run build
  } finally {
    Pop-Location
  }
}

if (-not (Test-Path $distDir)) {
  throw "No existe dist\. Ejecuta npm run build antes de servir la web local."
}

if (-not (Test-Path (Join-Path $distDir "api\manifesto.php"))) {
  throw "No existe dist\api\manifesto.php. El build no copio el endpoint PHP."
}

if (-not (Test-Path (Join-Path $distDir "manifesto-email.pdf"))) {
  throw "No existe dist\manifesto-email.pdf. El endpoint no puede adjuntar el manifiesto."
}

if (-not (Test-Path $configPath)) {
  Write-Warning "No existe private\manifesto-config.php."
  Write-Warning "Copia private\manifesto-config.local.example.php como private\manifesto-config.php y rellena MANIFESTO_SMTP_PASSWORD."
}

Write-Host "Web local completa:"
Write-Host "  http://127.0.0.1:$Port/"
Write-Host "  http://127.0.0.1:$Port/manifiesto"
Write-Host "  http://127.0.0.1:$Port/api/manifesto.php"
Write-Host ""
Write-Host "Deja esta terminal abierta mientras pruebas."

php -S "127.0.0.1:$Port" -t $distDir $routerPath
