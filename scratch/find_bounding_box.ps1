Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Share\DASAN\public\dasan_logo_raw.png"

if (Test-Path $imagePath) {
    $bmp = New-Object System.Drawing.Bitmap($imagePath)
    $minX = $bmp.Width
    $maxX = 0
    $minY = $bmp.Height
    $maxY = 0
    
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            # If the pixel is not white-ish (threshold 240)
            if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    Write-Host "Bounding Box:"
    Write-Host "Min X: $minX"
    Write-Host "Max X: $maxX"
    Write-Host "Min Y: $minY"
    Write-Host "Max Y: $maxY"
    Write-Host "Content Width: $($maxX - $minX + 1)"
    Write-Host "Content Height: $($maxY - $minY + 1)"
    Write-Host "Aspect Ratio: $( ($maxX - $minX + 1) / ($maxY - $minY + 1) )"
    
    $bmp.Dispose()
} else {
    Write-Host "Image not found."
}
