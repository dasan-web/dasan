# DASAN Folder Full Backup Utility
$ErrorActionPreference = "Stop"

# 1. Configuration
$SourceDir = "c:\Share\DASAN"
$BackupDir = "c:\Share\DASAN_Backups"
$RetentionDays = 30

Write-Host "========================================================"
Write-Host " DASAN Folder Daily Full Backup"
Write-Host "========================================================"

# 2. Ensure target backup directory exists
if (-not (Test-Path $BackupDir)) {
    Write-Host "[INFO] Creating backup directory: $BackupDir"
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

# 3. Run database backup first
Write-Host "[INFO] Running database backup..."
if (Test-Path "$SourceDir\db\backup.js") {
    $originalLocation = Get-Location
    Set-Location $SourceDir
    try {
        node db/backup.js
    } finally {
        Set-Location $originalLocation
    }
} else {
    Write-Host "[WARNING] Database backup script not found! Skipping database dump."
}

# 4. Generate timestamp and archive
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$ZipFile = Join-Path $BackupDir "dasan_backup_$Timestamp.zip"
$TempDir = Join-Path $BackupDir "temp_backup"

Write-Host "[INFO] Creating temporary backup folder..."
if (Test-Path $TempDir) {
    Remove-Item -Recurse -Force $TempDir
}
New-Item -ItemType Directory -Path $TempDir | Out-Null

Write-Host "[INFO] Copying files (excluding node_modules, .next, and .git)..."
$robocopyArgs = @(
    $SourceDir,
    $TempDir,
    "/E",
    "/XD", "node_modules", ".next", ".git",
    "/NFL", "/NDL", "/NJH", "/NJS"
)
$process = Start-Process robocopy -ArgumentList $robocopyArgs -Wait -NoNewWindow -PassThru
if ($process.ExitCode -ge 8) {
    Write-Warning "Robocopy encountered an error (ExitCode: $($process.ExitCode))"
}

Write-Host "[INFO] Compressing files to ZIP format..."
Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipFile -Force

Write-Host "[INFO] Cleaning up temporary backup folder..."
Remove-Item -Recurse -Force $TempDir

Write-Host ""
Write-Host "========================================================"
Write-Host "[SUCCESS] Backup completed successfully!"
Write-Host "Saved to: $ZipFile"
Write-Host "========================================================"
Write-Host ""

# 5. Retention policy
Write-Host "[INFO] Checking for expired backups (older than $RetentionDays days)..."
Get-ChildItem $BackupDir -Filter "dasan_backup_*.zip" | Where-Object {
    $_.LastWriteTime -lt (Get-Date).AddDays(-$RetentionDays)
} | ForEach-Object {
    Write-Host "[DELETE] Removing expired backup: $_"
    Remove-Item $_.FullName -Force
}

Write-Host "[INFO] Backup process finished."
