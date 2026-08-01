Add-Type -AssemblyName System.Drawing

$baseDir = 'D:\v2kozikode\assets\images'
$folders = Get-ChildItem -Path $baseDir -Directory

foreach ($folder in $folders) {
    if ($folder.Name -eq 'STRIPEGALLERY') { continue }
    
    Write-Host "Compressing folder: $($folder.Name)"
    $files = Get-ChildItem -Path $folder.FullName -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }
    
    foreach ($f in $files) {
        try {
            $img = [System.Drawing.Image]::FromFile($f.FullName)
            
            $maxWidth = 1200
            $maxHeight = 1200
            
            $newW = $img.Width
            $newH = $img.Height
            
            if ($newW -gt $maxWidth -or $newH -gt $maxHeight) {
                if ($newW -gt $newH) {
                    $newH = [int]($newH * ($maxWidth / $newW))
                    $newW = $maxWidth
                } else {
                    $newW = [int]($newW * ($maxHeight / $newH))
                    $newH = $maxHeight
                }
            }
            
            $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
            $graph = [System.Drawing.Graphics]::FromImage($bmp)
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.DrawImage($img, 0, 0, $newW, $newH)
            
            $img.Dispose()
            
            $encoder = [System.Drawing.Imaging.Encoder]::Quality
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]82)
            
            $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            
            $tempPath = $f.FullName + '.tmp'
            $bmp.Save($tempPath, $jpegCodec, $encoderParams)
            
            $graph.Dispose()
            $bmp.Dispose()
            
            Remove-Item $f.FullName -Force
            Rename-Item $tempPath $f.Name
            Write-Host "Compressed: $($folder.Name)/$($f.Name)"
        } catch {
            Write-Host "Error compressing $($f.Name): $_"
        }
    }
}
