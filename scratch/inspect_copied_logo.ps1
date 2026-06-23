Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Share\DASAN\public\dasan_logo_raw.png"

if (Test-Path $imagePath) {
    $bmp = New-Object System.Drawing.Bitmap($imagePath)
    Write-Host "Width: $($bmp.Width)"
    Write-Host "Height: $($bmp.Height)"
    Write-Host "PixelFormat: $($bmp.PixelFormat)"
    
    # Check color at some points
    $c00 = $bmp.GetPixel(0, 0)
    Write-Host "Pixel at 0,0: R=$($c00.R), G=$($c00.G), B=$($c00.B), A=$($c00.A)"
    
    $cMid = $bmp.GetPixel([int]($bmp.Width/2), [int]($bmp.Height/2))
    Write-Host "Pixel at Mid: R=$($cMid.R), G=$($cMid.G), B=$($cMid.B), A=$($cMid.A)"
    
    $bmp.Dispose()
} else {
    Write-Host "Image not found."
}
