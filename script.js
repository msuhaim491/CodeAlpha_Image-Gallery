
const galleryData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
        title: 'Mountain Landscape',
        category: 'nature',
        alt: 'Beautiful mountain landscape with snow peaks',
        date: '2024',
        camera: 'Canon EOS R5',
        photographer: 'Professional Photographer',
        tags: ['mountain', 'landscape', 'nature', 'snow']
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80',
        title: 'Forest Path',
        category: 'nature',
        alt: 'Peaceful forest path through tall trees',
        date: '2024',
        camera: 'Sony A7R IV',
        photographer: 'Nature Photographer',
        tags: ['forest', 'path', 'trees', 'nature']
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop&q=80',
        title: 'City Skyline',
        category: 'city',
        alt: 'Modern city skyline at sunset',
        date: '2024',
        camera: 'Nikon D850',
        photographer: 'Urban Photographer',
        tags: ['city', 'skyline', 'urban', 'sunset']
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&q=80',
        title: 'Abstract Art',
        category: 'abstract',
        alt: 'Colorful abstract art composition',
        date: '2024',
        camera: 'Fujifilm X-T4',
        photographer: 'Art Photographer',
        tags: ['abstract', 'art', 'colorful', 'creative']
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
        title: 'Portrait Study',
        category: 'people',
        alt: 'Professional portrait photography',
        date: '2024',
        camera: 'Canon EOS R6',
        photographer: 'Portrait Photographer',
        tags: ['portrait', 'people', 'professional', 'studio']
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&q=80',
        title: 'Ocean Waves',
        category: 'nature',
        alt: 'Powerful ocean waves crashing on rocks',
        date: '2024',
        camera: 'Sony A7 III',
        photographer: 'Seascape Photographer',
        tags: ['ocean', 'waves', 'nature', 'seascape']
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80',
        title: 'Urban Architecture',
        category: 'city',
        alt: 'Modern urban architecture and buildings',
        date: '2024',
        camera: 'Leica Q2',
        photographer: 'Architecture Photographer',
        tags: ['architecture', 'urban', 'modern', 'buildings']
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop&q=80',
        title: 'Geometric Patterns',
        category: 'abstract',
        alt: 'Beautiful geometric patterns and shapes',
        date: '2024',
        camera: 'Hasselblad X1D',
        photographer: 'Abstract Photographer',
        tags: ['geometric', 'patterns', 'abstract', 'shapes']
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&q=80',
        title: 'Candid Moment',
        category: 'people',
        alt: 'Natural candid photography moment',
        date: '2024',
        camera: 'Fujifilm X100V',
        photographer: 'Street Photographer',
        tags: ['candid', 'people', 'street', 'natural']
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
        title: 'Desert Sunset',
        category: 'nature',
        alt: 'Stunning desert landscape at sunset',
        date: '2024',
        camera: 'Canon EOS 5D Mark IV',
        photographer: 'Landscape Photographer',
        tags: ['desert', 'sunset', 'landscape', 'nature']
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80',
        title: 'Night City',
        category: 'city',
        alt: 'Vibrant city lights at night',
        date: '2024',
        camera: 'Sony A7S III',
        photographer: 'Night Photographer',
        tags: ['night', 'city', 'lights', 'urban']
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop&q=80',
        title: 'Color Splash',
        category: 'abstract',
        alt: 'Dynamic color splash abstract art',
        date: '2024',
        camera: 'Canon EOS R',
        photographer: 'Creative Photographer',
        tags: ['color', 'splash', 'abstract', 'dynamic']
    }
];

class ProfessionalGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.filteredImages = [...galleryData];
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.currentView = 'grid';
        this.favorites = new Set();
        this.isFullscreen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderGallery();
        this.updateStats();
        this.setupIntersectionObserver();
        this.preloadImages();
        
        this.initializeLightbox();
    }
    
    initializeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.getAttribute('data-filter');
                this.filterImages(filter);
            });
        });

        // View toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                this.changeView(view);
            });
        });

        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortImages(e.target.value);
        });

        // Lightbox controls
        document.getElementById('closeBtn').addEventListener('click', () => this.closeLightbox());
        document.getElementById('prevBtn').addEventListener('click', () => this.showPreviousImage());
        document.getElementById('nextBtn').addEventListener('click', () => this.showNextImage());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadImage());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('shareBtn').addEventListener('click', () => this.shareImage());
        document.getElementById('favoriteBtn').addEventListener('click', () => this.toggleFavorite());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Lightbox backdrop click
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-backdrop')) {
                this.closeLightbox();
            }
        });

        // Touch/swipe support
        this.setupTouchEvents();

        // Resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Fullscreen change
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        const lightbox = document.getElementById('lightbox');

        lightbox.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        lightbox.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.showNextImage();
                } else {
                    this.showPreviousImage();
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px'
            });

            // Observe images when they're added to the DOM
            this.observeImages = imageObserver;
        }
    }

    preloadImages() {
        // Preload first few images for better performance
        const imagesToPreload = galleryData.slice(0, 4);
        imagesToPreload.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }

    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = '';

        if (this.filteredImages.length === 0) {
            galleryGrid.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>No images found matching your criteria</p>
                </div>
            `;
            return;
        }

        this.filteredImages.forEach((image, index) => {
            const galleryItem = this.createGalleryItem(image, index);
            galleryGrid.appendChild(galleryItem);
        });

        this.updateGalleryCount();
        this.observeNewImages();
    }

    createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-index', index);
        item.setAttribute('data-category', image.category);

        item.innerHTML = `
            <img 
                src="${image.src}" 
                alt="${image.alt}" 
                loading="lazy"
                data-src="${image.src}"
            >
            <div class="overlay">
                <h3>${image.title}</h3>
                <p>${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
                <div class="overlay-actions">
                    <button class="overlay-btn" onclick="event.stopPropagation(); gallery.toggleFavorite(${image.id})" title="Add to Favorites">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="overlay-btn" onclick="event.stopPropagation(); gallery.shareImage(${image.id})" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        `;

        item.addEventListener('click', () => this.openLightbox(index));
        return item;
    }

    observeNewImages() {
        if (this.observeImages) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => this.observeImages.observe(img));
        }
    }

    filterImages(filter) {
        this.currentFilter = filter;

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });

        // Filter images
        if (filter === 'all') {
            this.filteredImages = [...galleryData];
        } else {
            this.filteredImages = galleryData.filter(image => image.category === filter);
        }

        // Apply current sort
        this.sortImages(this.currentSort, false);

        // Update stats
        this.updateStats();
        document.getElementById('activeFilter').textContent = filter.charAt(0).toUpperCase() + filter.slice(1);

        // Animate gallery update
        this.animateGalleryUpdate();
    }

    sortImages(sortType, updateSelect = true) {
        this.currentSort = sortType;

        if (updateSelect) {
            document.getElementById('sortSelect').value = sortType;
        }

        switch (sortType) {
            case 'title':
                this.filteredImages.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'category':
                this.filteredImages.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'default':
            default:
                this.filteredImages.sort((a, b) => a.id - b.id);
                break;
        }

        this.animateGalleryUpdate();
    }

    changeView(viewType) {
        this.currentView = viewType;

        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === viewType) {
                btn.classList.add('active');
            }
        });

        // Update grid class
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.className = `gallery-grid ${viewType}-view`;

        // Re-render with new view
        this.renderGallery();
    }

    animateGalleryUpdate() {
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.style.opacity = '0';
        galleryGrid.style.transform = 'translateY(20px)';

        setTimeout(() => {
            this.renderGallery();
            galleryGrid.style.opacity = '1';
            galleryGrid.style.transform = 'translateY(0)';
        }, 200);
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        const image = this.filteredImages[index];

        if (!image) {
            console.error('No image found at index:', index);
            return;
        }

        this.showImageLoading(true);
        this.updateLightboxContent(image);
        this.updateImageCounter();

        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'flex';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        this.updateNavigationButtons();
        this.updateFavoriteButton(image.id);
    }

    updateLightboxContent(image) {
        const lightboxImage = document.getElementById('lightboxImage');
        const imageTitle = document.getElementById('imageTitle');
        const imageCategory = document.getElementById('imageCategory');
        const imageDate = document.getElementById('imageDate');
        const imageCamera = document.getElementById('imageCamera');

        // Show loading first
        this.showImageLoading(true);
        
        // Update text content immediately
        if (imageTitle) imageTitle.textContent = image.title;
        if (imageCategory) imageCategory.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);
        if (imageDate) imageDate.textContent = image.date;
        if (imageCamera) imageCamera.textContent = image.camera;

        // Preload image
        const img = new Image();
        img.onload = () => {
            if (lightboxImage) {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
            }
            this.showImageLoading(false);
        };
        img.onerror = () => {
            this.showImageLoading(false);
            console.error('Failed to load image:', image.src);
        };
        img.src = image.src;
    }

    showImageLoading(show) {
        const loading = document.getElementById('imageLoading');
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
        document.body.style.overflow = 'auto';

        if (this.isFullscreen) {
            this.exitFullscreen();
        }
    }

    showPreviousImage() {
        if (this.filteredImages.length === 0) return;

        this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateLightboxContent(this.filteredImages[this.currentImageIndex]);
        this.updateImageCounter();
        this.updateFavoriteButton(this.filteredImages[this.currentImageIndex].id);
    }

    showNextImage() {
        if (this.filteredImages.length === 0) return;

        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.updateLightboxContent(this.filteredImages[this.currentImageIndex]);
        this.updateImageCounter();
        this.updateFavoriteButton(this.filteredImages[this.currentImageIndex].id);
    }

    updateImageCounter() {
        document.getElementById('currentImageNumber').textContent = this.currentImageIndex + 1;
        document.getElementById('totalImageNumber').textContent = this.filteredImages.length;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (this.filteredImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    updateFavoriteButton(imageId) {
        const favoriteBtn = document.getElementById('favoriteBtn');
        const icon = favoriteBtn.querySelector('i');
        
        if (this.favorites.has(imageId)) {
            icon.className = 'fas fa-heart';
            favoriteBtn.style.color = '#ef4444';
        } else {
            icon.className = 'far fa-heart';
            favoriteBtn.style.color = '';
        }
    }

    toggleFavorite(imageId = null) {
        const id = imageId || this.filteredImages[this.currentImageIndex]?.id;
        if (!id) return;

        if (this.favorites.has(id)) {
            this.favorites.delete(id);
        } else {
            this.favorites.add(id);
        }

        this.updateFavoriteButton(id);
        this.showNotification(
            this.favorites.has(id) ? 'Added to favorites' : 'Removed from favorites'
        );
    }

    downloadImage() {
        const image = this.filteredImages[this.currentImageIndex];
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
        link.click();
        
        this.showNotification('Download started');
    }

    shareImage(imageId = null) {
        const image = imageId ? 
            galleryData.find(img => img.id === imageId) : 
            this.filteredImages[this.currentImageIndex];

        if (navigator.share) {
            navigator.share({
                title: image.title,
                text: `Check out this amazing ${image.category} photo!`,
                url: image.src
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(image.src).then(() => {
                this.showNotification('Image URL copied to clipboard');
            });
        }
    }

    toggleFullscreen() {
        const lightbox = document.getElementById('lightbox');
        
        if (!this.isFullscreen) {
            if (lightbox.requestFullscreen) {
                lightbox.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    handleKeyboard(e) {
        if (!document.getElementById('lightbox').classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.showPreviousImage();
                break;
            case 'ArrowRight':
                this.showNextImage();
                break;
            case 'f':
            case 'F':
                this.toggleFavorite();
                break;
            case 'd':
            case 'D':
                this.downloadImage();
                break;
        }
    }

    handleResize() {
        if (document.getElementById('lightbox').classList.contains('active')) {
            this.updateNavigationButtons();
        }
    }

    updateStats() {
        const totalImages = document.getElementById('totalImages');
        const heroTotalImages = document.getElementById('heroTotalImages');
        const galleryCount = document.getElementById('galleryCount');

        if (totalImages) totalImages.textContent = this.filteredImages.length;
        if (heroTotalImages) heroTotalImages.textContent = this.filteredImages.length;
        if (galleryCount) galleryCount.textContent = `Showing ${this.filteredImages.length} images`;
    }

    updateGalleryCount() {
        const galleryCount = document.getElementById('galleryCount');
        if (galleryCount) {
            galleryCount.textContent = `Showing ${this.filteredImages.length} images`;
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    getImageById(id) {
        return galleryData.find(img => img.id === id);
    }

    getImagesByCategory(category) {
        return galleryData.filter(img => img.category === category);
    }

    getFavorites() {
        return Array.from(this.favorites).map(id => this.getImageById(id));
    }

    getTotalImages() {
        return galleryData.length;
    }

    getCurrentFilter() {
        return this.currentFilter;
    }
}

// Initialize the gallery when DOM is loaded
let gallery;
document.addEventListener('DOMContentLoaded', () => {
    gallery = new ProfessionalGallery();
    
    // Make gallery available globally for debugging
    window.gallery = gallery;
    
    // Add some professional touches
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle image errors gracefully
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        e.target.alt = 'Image not available';
    }
}, true);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Gallery loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}