const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'assets', 'images');
const items = fs.readdirSync(baseDir, { withFileTypes: true });

const folders = items.filter(i => i.isDirectory() && i.name !== 'STRIPEGALLERY');

let folderCardsHTML = '';
let folderModalsHTML = '';

folders.forEach(f => {
    const folderName = f.name;
    const folderPath = path.join(baseDir, folderName);
    const filterKey = folderName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Capitalize display name cleanly
    const displayName = folderName.split('&').map(s => s.trim().charAt(0).toUpperCase() + s.trim().slice(1)).join(' & ');

    const images = fs.readdirSync(folderPath).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    if (images.length === 0) return;

    // Find designated thumbnail file (e.g. 0.jpg, 00.jpg, 01.jpg, 000.jpg, 001.jpg, thumb.jpg, cover.jpg) or default to first image
    const coverImage = images.find(img => /^0|^thumb|^cover|^00|^01|^000/i.test(img)) || images[0];
    const coverImageRelPath = `assets/images/${folderName}/${coverImage}`;

    // 1:1 Instagram Post Square Folder Card (No rounded corners, touches each other, name on hover)
    folderCardsHTML += `
        <div class="insta-folder-card" data-folder="${filterKey}">
            <div class="folder-square-wrapper">
                <img src="${coverImageRelPath}" loading="lazy" alt="${displayName}" class="folder-cover-img">
                <div class="folder-card-overlay">
                    <h3 class="folder-title">${displayName}</h3>
                </div>
            </div>
        </div>\n`;

    // Folder Modal Grid (Opened when clicking folder card)
    let imagesGridHTML = images.map(imgFile => {
        const relPath = `assets/images/${folderName}/${imgFile}`;
        return `
            <div class="folder-photo-item" data-full="${relPath}">
                <img src="${relPath}" loading="lazy" alt="${displayName}">
                <div class="photo-item-overlay">
                    <span class="photo-hover-name">${displayName}</span>
                </div>
            </div>`;
    }).join('');

    folderModalsHTML += `
        <div class="folder-view-modal" id="folder-modal-${filterKey}">
            <div class="folder-view-container">
                <div class="folder-view-header">
                    <div class="folder-title-wrap">
                        <h2>${displayName}</h2>
                    </div>
                    <button class="btn-close-folder-view" data-close="${filterKey}">&times;</button>
                </div>
                <div class="folder-view-grid">
                    ${imagesGridHTML}
                </div>
            </div>
        </div>\n`;
});

const galleryPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery – Brown Lights Media Kozhikode</title>
    <meta name="description" content="Explore Kozhikode luxury wedding photography collections by Brown Lights Media in Instagram folder format.">
    
    <!-- Favicon set to logo.png -->
    <link rel="icon" type="image/png" href="assets/images/logo.png">
    <link rel="shortcut icon" href="assets/images/logo.png">

    <!-- Google Fonts: GFS Didot, Bodoni Moda, Bebas Neue, Open/Google Sans, Droid Sans, Droid Serif, Cinzel -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Droid+Sans:wght@400;700&family=Droid+Serif:ital,wght@0,400;0,700;1,400&family=GFS+Didot&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="white-theme">

    <!-- Fixed Floating Big Pure PNG Signature Logo -->
    <a href="index.html" class="floating-brand-logo" title="Brown Lights Media Home">
        <img src="assets/images/logo.png" alt="Brown Lights Media Logo">
    </a>

    <!-- Fixed Navigation Header -->
    <header class="site-header subpage-header">
        <div class="header-container">
            <div class="brand-logo-spacer"></div>
            
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
            <span class="section-tag-gold">Collections</span>
            <h1 class="gallery-page-title">Brown Lights Media Gallery</h1>
            <p class="gallery-page-desc">Select any album folder below to explore full wedding story photos.</p>
        </div>
    </section>

    <!-- Instagram Folder-Wise Gallery Section -->
    <section class="gallery-section">
        <div class="container" style="max-width: 1200px; padding: 0;">
            <!-- Seamless 1:1 Instagram Post Square Grid (No gaps, no rounded corners, name on hover) -->
            <div class="insta-folders-grid">
                ${folderCardsHTML}
            </div>
        </div>
    </section>

    <!-- Dynamic Folder Photos View Modals -->
    ${folderModalsHTML}

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

    <!-- Script File -->
    <script src="script.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'gallery.html'), galleryPageHTML, 'utf8');
console.log('Successfully updated build_gallery.js and generated gallery.html with updated cover thumbnails!');
