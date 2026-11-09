param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$taskDemoRoot = $PSScriptRoot
$taskDemoUrl = 'http://127.0.0.1:4173'
try {
    $taskExisting = Invoke-RestMethod -Uri ($taskDemoUrl + '/health') -TimeoutSec 1
    if ($taskExisting.app -eq 'dual-grid') { if (!$NoBrowser) { Start-Process $taskDemoUrl }; exit 0 }
} catch { }
$taskRuntime = Join-Path $taskDemoRoot 'runtime\node.exe'
if (!(Test-Path -LiteralPath $taskRuntime)) { $taskRuntime = (Get-Command node -ErrorAction Stop).Source }
$taskServerFile = Join-Path $taskDemoRoot 'server.mjs'
$taskProcess = Start-Process -FilePath $taskRuntime -ArgumentList @('"' + $taskServerFile + '"') -WorkingDirectory $taskDemoRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $taskDemoRoot 'server.log') -RedirectStandardError (Join-Path $taskDemoRoot 'server-error.log')
$taskProcess.Id | Set-Content -LiteralPath (Join-Path $taskDemoRoot '.server.pid')
for ($taskAttempt = 0; $taskAttempt -lt 40; $taskAttempt++) {
    Start-Sleep -Milliseconds 150
    try {
        $taskHealth = Invoke-RestMethod -Uri ($taskDemoUrl + '/health') -TimeoutSec 1
        if ($taskHealth.app -eq 'dual-grid') { if (!$NoBrowser) { Start-Process $taskDemoUrl }; exit 0 }
    } catch { }
    if ($taskProcess.HasExited) { break }
}
Write-Host 'Demo acila bilmedi. server-error.log faylini yoxla. 4173 portu bashqa proqramda ola biler.'
Read-Host 'Baglamaq uchun Enter'
exit 1
