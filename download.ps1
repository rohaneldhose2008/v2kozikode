$destDir = 'd:\v2kozikode\assets\images'
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$urls = @(
    'https://theoceanclouds.com/wp-content/uploads/2025/06/OC-2.png',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/OC-00008-683x1024.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/ocs-426-copy-683x1024.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/OC-00006-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/OC00043-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/ocs-22-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/IMG-20250610-WA0172.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/IMG-20250610-WA0174.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/OC-00007-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/ocs-426-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/DSC08456-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/untitled-15-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/IMG-20250610-WA0173.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/AJI04406-3-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/IMG-20250610-WA0175.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/IMG-20250610-WA0178.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/OC00036-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-09675-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/BRCTE-17-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-8-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/ocs-18-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-09951-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/AJI04406-2-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/DSC09186-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/DSC08596-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/BRCTE-11-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/OC00049-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-23-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-00072-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/ocs-26-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/06/IMG-20250610-WA0177.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/ocs-12-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/OC00028-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/DSC08813-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/ocs-27-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/BRCTE-29-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/ocs-21-copy1-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-00332-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-09680-copy-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/OC00001-scaled.jpg',
    'https://theoceanclouds.com/wp-content/uploads/2025/10/untitled-09687-copy-scaled.jpg'
)

$uniqueUrls = $urls | Select-Object -Unique

foreach ($u in $uniqueUrls) {
    $fn = Split-Path $u -Leaf
    $dest = Join-Path $destDir $fn
    if (-not (Test-Path $dest)) {
        try {
            Invoke-WebRequest -Uri $u -OutFile $dest -UserAgent 'Mozilla/5.0'
            Write-Host "Downloaded: $fn"
        } catch {
            Write-Host "Failed: $u"
        }
    }
}
