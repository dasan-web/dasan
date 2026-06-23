Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Share\DASAN\public\dasan_logo_raw.png"
$outputPath = "c:\Share\DASAN\src\app\favicon.ico"
$iconPngPath = "c:\Share\DASAN\src\app\icon.png"

if (Test-Path $imagePath) {
    $bmp = New-Object System.Drawing.Bitmap($imagePath)
    
    # The hexagon itself is located at the far right of the 176x80 image.
    # Height of the hexagon is roughly 56 pixels (from Y=12 to Y=68).
    # Width of the hexagon is roughly 64 pixels (from X=110 to X=174).
    # Let's crop a square region centered on the hexagon:
    # We will use X = 108 to 172 (width 64) and Y = 9 to 73 (height 64)
    # This excludes the leaf stem that sticks out to the left (X=80 to 105)
    # and keeps ONLY the clean hexagon symbol itself.
    $size = 64
    $startX = 109
    $startY = 8
    
    $rect = New-Object System.Drawing.Rectangle($startX, $startY, $size, $size)
    $croppedBmp = $bmp.Clone($rect, $bmp.PixelFormat)
    
    # Resize to 32x32 for favicon
    $faviconSize = 32
    $resizedBmp = New-Object System.Drawing.Bitmap($faviconSize, $faviconSize)
    $g = [System.Drawing.Graphics]::FromImage($resizedBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($croppedBmp, 0, 0, $faviconSize, $faviconSize)
    $g.Dispose()
    
    # Save files
    $resizedBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $resizedBmp.Save($iconPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $croppedBmp.Dispose()
    $resizedBmp.Dispose()
    $bmp.Dispose()
    
    Write-Host "Successfully cropped and generated centered hexagon symbol only."
} else {
    Write-Host "Original logo not found."
}
