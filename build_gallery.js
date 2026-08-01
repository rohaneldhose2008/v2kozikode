const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'assets', 'images');
const items = fs.readdirSync(baseDir, { withFileTypes: true });

const folders = items.filter(i => i.isDirectory() && i.name !== 'STRIPEGALLERY');

let categoryTabsHTML = `<button class="gallery-tab active" data-filter="all">All Stories</button>\n`;
let galleryItemsHTML = '';

folders.forEach(f => {
    const folderName = f.name;
    const folderPath = path.join(baseDir, folderName);
    const filterKey = folderName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Capitalize display name cleanly
    const displayName = folderName.split('&').map(s => s.trim().charAt(0).toUpperCase() + s.trim().slice(1)).join(' & ');
    categoryTabsHTML += `<button class="gallery-tab" data-filter="${filterKey}">${displayName}</button>\n`;

    const images = fs.readdirSync(folderPath).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    images.forEach(imgFile => {
        const relPath = `assets/images/${folderName}/${imgFile}`;
        galleryItemsHTML += `
        <div class="masonry-item ${filterKey}" data-full="${relPath}">
            <div class="masonry-img-wrapper">
                <img src="${relPath}" loading="lazy" alt="${displayName}">
                <div class="masonry-overlay">
                    <img src="assets/images/logo.png" alt="Brown Lights Logo" class="overlay-logo-png">
                    <span class="masonry-tag">${displayName}</span>
                    <i class="fa-solid fa-expand expand-icon"></i>
                </div>
            </div>
        </div>\n`;
    });
});

const galleryPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery – Brown Lights Media Kozhikode</title>
    <meta name="description" content="Explore our complete Kozhikode luxury wedding photography collections and couple stories by Brown Lights Media.">
    
    <!-- Google Fonts: Bebas Neue (Subheadings) & Open Sans/Google Sans fallback -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="white-theme">

    <!-- Fixed Floating Site Header Navigation (Only Logo, No Text, No Background Box) -->
    <header class="site-header subpage-header">
        <div class="header-container">
            <a href="index.html" class="brand-logo">
                <img src="assets/images/logo.png" alt="Brown Lights Media Logo" class="logo-img-big">
            </a>
            
            <nav class="main-nav">
                <ul class="nav-list">
                    <li><a href="index.html#home" class="nav-link">Home</a></li>
                    <li><a href="index.html#about" class="nav-link">About</a></li>
                    <li><a href="index.html#packages" class="nav-link">Packages</a></li>
                    <li><a href="index.html#films" class="nav-link">Films</a></li>
                    <li><a href="gallery.html" class="nav-link active">Gallery</a></li>
                    <li><a href="index.html#contact" class="nav-link">Contact</a></li>
                </ul>
            </nav>

            <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Gallery Hero Banner -->
    <section class="gallery-page-hero text-center">
        <div class="container">
            <span class="section-tag-gold">PORTFOLIO STORIES</span>
            <h1 class="gallery-page-title">Brown Lights Media Gallery</h1>
            <p class="gallery-page-desc">Preserving natural portrait and landscape moments across Kozhikode celebrations.</p>
        </div>
    </section>

    <!-- Portfolio Instagram Masonry Gallery -->
    <section class="gallery-section">
        <div class="container">
            <!-- Filter Category Tabs -->
            <div class="gallery-tabs">
                ${categoryTabsHTML}
            </div>

            <!-- Instagram Masonry Layout Grid -->
            <div class="insta-masonry-grid">
                ${galleryItemsHTML}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-container">
            <p>&copy; 2026 BROWN LIGHTS MEDIA KOZHIKODE. All Rights Reserved. Crafting stories through light, emotion, and creativity.</p>
        </div>
    </footer>

    <!-- Lightbox Modal -->
    <div class="lightbox-modal" id="lightbox-modal">
        <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img src="" alt="Enlarged photo" class="lightbox-img" id="lightbox-img">
    </div>

    <script src="script.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'gallery.html'), galleryPageHTML, 'utf8');
console.log('Updated build_gallery.js for pure logo PNG without text or bg box!');
