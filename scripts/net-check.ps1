param(
  [string]$HostIp = "127.0.0.1",
  [int]$Port = 3000,
  [string]$Url = ""
)

if (-not $Url -or $Url.Trim() -eq "") {
  $Url = "http://$HostIp`:$Port/"
}

Write-Host "== TCP: Test-NetConnection $HostIp:$Port ==" -ForegroundColor Cyan
Test-NetConnection -ComputerName $HostIp -Port $Port | Format-List

Write-Host "== HTTP: Invoke-WebRequest $Url ==" -ForegroundColor Cyan
try {
  $res = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
  Write-Host ("HTTP " + $res.StatusCode) -ForegroundColor Green
} catch {
  Write-Host ("HTTP failed: " + $_.Exception.Message) -ForegroundColor Red
  exit 1
}
