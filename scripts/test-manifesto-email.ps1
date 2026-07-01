param(
  [Parameter(Mandatory = $true)]
  [string]$Email,

  [int]$Port = 8080,

  [string]$Source = "local-test"
)

$ErrorActionPreference = "Stop"
$uri = "http://127.0.0.1:$Port/api/manifesto.php"
$payload = @{
  email = $Email
  company = ""
  source = $Source
} | ConvertTo-Json -Compress

try {
  $response = Invoke-RestMethod `
    -Uri $uri `
    -Method Post `
    -ContentType "application/json" `
    -Body $payload

  $response | ConvertTo-Json -Depth 5
} catch {
  Write-Error "La prueba fallo contra $uri. Comprueba que scripts\serve-manifesto-local.ps1 sigue abierto y que las credenciales SMTP son correctas. Detalle: $($_.Exception.Message)"
}
