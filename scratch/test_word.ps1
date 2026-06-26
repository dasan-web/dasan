$word = New-Object -ComObject Word.Application -ErrorAction SilentlyContinue
if ($word) {
    Write-Host "Word is installed"
    $word.Quit()
} else {
    Write-Host "Word is not installed"
}
