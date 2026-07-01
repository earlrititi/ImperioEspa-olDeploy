param(
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root "public"
$pdfPath = Join-Path $publicDir "manifesto-email.pdf"
$configPath = Join-Path $root "private\manifesto-config.php"

if (-not (Get-Command php -ErrorAction SilentlyContinue)) {
  throw "PHP no esta instalado o no esta en el PATH. Instala PHP, XAMPP o Laragon antes de continuar."
}

if (-not (Test-Path $pdfPath)) {
  throw "No existe public\manifesto-email.pdf. El endpoint no puede adjuntar el manifiesto."
}

if (-not (Test-Path $configPath)) {
  Write-Warning "No existe private\manifesto-config.php."
  Write-Warning "Copia private\manifesto-config.local.example.php como private\manifesto-config.php y rellena MANIFESTO_SMTP_PASSWORD."
}

Write-Host "Servidor local del manifiesto:"
Write-Host "  http://127.0.0.1:$Port/api/manifesto.php"
Write-Host "  http://127.0.0.1:$Port/manifesto-email.pdf"
Write-Host ""
Write-Host "Deja esta terminal abierta mientras pruebas."

php -S "127.0.0.1:$Port" -t $publicDir
