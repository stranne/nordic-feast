param([int]$Port = 1111)
# Keep the Zola version in step with .github/actions/setup-zola/action.yml.
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$toolDirectory = Join-Path $projectRoot '.tools/zola-0.23.6'
$zolaExecutable = Join-Path $toolDirectory 'zola.exe'

Push-Location $projectRoot
try {
    python scripts/check_content.py
    if ($LASTEXITCODE -ne 0) { throw 'Content validation failed.' }
    if (-not (Test-Path -LiteralPath $zolaExecutable)) {
        New-Item -ItemType Directory -Path $toolDirectory -Force | Out-Null
        $archivePath = Join-Path $toolDirectory 'zola.zip'
        Invoke-WebRequest -Uri 'https://github.com/getzola/zola/releases/download/v0.23.6/zola-v0.23.6-x86_64-pc-windows-msvc.zip' -OutFile $archivePath
        $expectedHash = '79179284f816febc281adbedb27189806cf22f83e8be4d0fca6835fbeeb09587'
        if ((Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expectedHash) {
            throw 'Zola download checksum mismatch.'
        }
        Expand-Archive -LiteralPath $archivePath -DestinationPath $toolDirectory -Force
    }
    & $zolaExecutable serve --interface 127.0.0.1 --port $Port
    if ($LASTEXITCODE -ne 0) { throw 'Zola preview failed.' }
} finally {
    Pop-Location
}
