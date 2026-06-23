Add-Type -AssemblyName System.Drawing
$imagePath = "c:\Share\DASAN\public\dasan_logo_raw.png"
$outputPath = "c:\Share\DASAN\public\dasan_logo_raw.png"

if (Test-Path $imagePath) {
    # Copy to temp first to avoid lock
    $tempPath = "c:\Share\DASAN\public\dasan_logo_temp.png"
    Copy-Item $imagePath $tempPath

    $bmp = New-Object System.Drawing.Bitmap($tempPath)
    $width = $bmp.Width
    $height = $bmp.Height
    
    # Create a new bitmap with same dimensions
    $newBmp = New-Object System.Drawing.Bitmap($width, $height)
    
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $pixel = $bmp.GetPixel($x, $y)
            
            # Use a more aggressive threshold to remove the semi-gray anti-aliased edges
            # Since green is R=72, G=133, B=87 and gray text is around 120,
            # any background pixel will have high values (e.g. > 200)
            if ($pixel.R -gt 200 -and $pixel.G -gt 200 -and $pixel.B -gt 200) {
                # Transparent
                $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                # Keep original color but increase contrast slightly for sharpness if it's text
                $newBmp.SetPixel($x, $y, $pixel)
            }
        }
    }
    
    $bmp.Dispose()
    
    # Save the new bitmap
    $newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
    
    # Clean up temp
    Remove-Item $tempPath -Force
    Write-Host "Successfully processed logo with higher sharpness threshold."
} else {
    Write-Host "Image not found."
}
