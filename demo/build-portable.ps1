$ErrorActionPreference = 'Stop'
$taskSource = $PSScriptRoot
$taskDist = Join-Path (Split-Path $taskSource -Parent) 'dist'
$taskOutput = Join-Path $taskDist 'DualGrid-Windows'
New-Item -ItemType Directory -Force -Path $taskOutput | Out-Null
$taskFiles = @('index.html','tower.html','style.css','lab.html','campaign.html','lab.css','favicon.svg','src','vendor','runtime','server.mjs','launch.ps1','stop.ps1','START-DEMO.cmd','STOP-DEMO.cmd','README.md','PRESENTATION.md')
foreach ($taskFile in $taskFiles) {
    # A running local server locks its executable on Windows. Reuse an identical
    # bundled runtime while still updating every game asset and its licence.
    $taskExistingRuntime = Join-Path $taskOutput 'runtime\node.exe'
    if ($taskFile -eq 'runtime' -and (Test-Path -LiteralPath $taskExistingRuntime) -and ((Get-FileHash -LiteralPath (Join-Path $taskSource 'runtime\node.exe')).Hash -eq (Get-FileHash -LiteralPath $taskExistingRuntime).Hash)) {
        Copy-Item -LiteralPath (Join-Path $taskSource 'runtime\NODE-LICENSE.txt') -Destination (Join-Path $taskOutput 'runtime\NODE-LICENSE.txt') -Force
    } else {
        Copy-Item -LiteralPath (Join-Path $taskSource $taskFile) -Destination $taskOutput -Recurse -Force
    }
}
$taskPackage = Join-Path $taskDist '.packaging\DualGrid-Windows'
New-Item -ItemType Directory -Force -Path $taskPackage | Out-Null
# Archive an allowlisted staging copy, never the live server's locked logs/PID.
foreach ($taskFile in $taskFiles) { Copy-Item -LiteralPath (Join-Path $taskOutput $taskFile) -Destination $taskPackage -Recurse -Force }
$taskNextArchive = Join-Path $taskDist 'DualGrid-Windows.next.zip'
Compress-Archive -LiteralPath $taskPackage -DestinationPath $taskNextArchive -Force
Move-Item -LiteralPath $taskNextArchive -Destination (Join-Path $taskDist 'DualGrid-Windows.zip') -Force
Get-Item -LiteralPath (Join-Path $taskDist 'DualGrid-Windows.zip') | Select-Object FullName,Length
