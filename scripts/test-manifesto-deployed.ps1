param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,

  [Parameter(Mandatory = $true)]
  [string]$Email,

  [string]$Source = "deployed-test"
)

$ErrorActionPreference = "Stop"

$normalizedBaseUrl = $BaseUrl.TrimEnd("/")
$pdfUrl = "$normalizedBaseUrl/manifesto-email.pdf"
$endpointUrl = "$normalizedBaseUrl/api/manifesto.php"

Write-Host "Probando PDF publico:"
Write-Host "  $pdfUrl"

try {
  $pdfResponse = Invoke-WebRequest -UseBasicParsing -Uri $pdfUrl -Method Head
} catch {
  Write-Error "No se pudo acceder al PDF en $pdfUrl. Comprueba que manifesto-email.pdf esta subido en la raiz del dominio. Detalle: $($_.Exception.Message)"
}

if ($pdfResponse.StatusCode -lt 200 -or $pdfResponse.StatusCode -ge 400) {
  throw "El PDF respondio con estado HTTP $($pdfResponse.StatusCode)."
}

Write-Host "PDF accesible: HTTP $($pdfResponse.StatusCode)"
Write-Host ""
Write-Host "Probando endpoint de envio:"
Write-Host "  $endpointUrl"

$payload = @{
  email = $Email
  company = ""
  source = $Source
} | ConvertTo-Json -Compress

try {
  $response = Invoke-RestMethod `
    -Uri $endpointUrl `
    -Method Post `
    -ContentType "application/json" `
    -Body $payload
} catch {
  Write-Error "El endpoint fallo. Revisa configuracion SMTP, private/manifesto-config.php, logs PHP y que api/manifesto.php este desplegado. Detalle: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "Respuesta del endpoint:"
$response | ConvertTo-Json -Depth 5

if (-not $response.ok) {
  throw "El endpoint respondio, pero ok no es true."
}

Write-Host ""
Write-Host "Prueba final enviada. Revisa el correo destino:"
Write-Host "  $Email"
Write-Host "Comprueba bandeja de entrada, spam y promociones, y confirma que el PDF llega adjunto."
