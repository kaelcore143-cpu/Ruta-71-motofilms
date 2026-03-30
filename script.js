// ============================================
// MOTOFILMS - JavaScript Rockero Premium
// ============================================

// Detect mobile device
const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ============================================
    // Header Scroll Effect (throttled for mobile)
    // ============================================
    const header = document.getElementById('header');
    
    if (header) {
        const scrollThrottle = isMobile ? 100 : 50;
        let scrollTicking = false;
        
        window.addEventListener('scroll', function() {
            if (!scrollTicking) {
                window.requestAnimationFrame(function() {
                    if (window.pageYOffset > 50) {
                        header.style.background = 'rgba(5, 5, 5, 0.98)';
                        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
                    } else {
                        header.style.background = 'rgba(5, 5, 5, 0.9)';
                        header.style.boxShadow = 'none';
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }
    
    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: isMobile ? 'auto' : 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Lazy Video Loading - Skip on mobile
    // ============================================
    if (!isMobile) {
        const lazyVideos = document.querySelectorAll('.lazy-video');
        
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        const source = video.querySelector('source');
                        
                        if (source && source.dataset.src) {
                            source.src = source.dataset.src;
                            video.load();
                            video.play().catch(() => {});
                        }
                        
                        observer.unobserve(video);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });
            
            lazyVideos.forEach(video => videoObserver.observe(video));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyVideos.forEach(video => {
                const source = video.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                }
            });
        }
    }
    
    // ============================================
    // Scroll Reveal Animation (simplified for mobile)
    // ============================================
    const revealElements = document.querySelectorAll('.about-content, .review-card');
    
    if ('IntersectionObserver' in window && !isMobile) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
    } else {
        // Show elements immediately on mobile
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // ============================================
    // Hero Video Play (autoplay con fallback)
    // ============================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        heroVideo.play().catch(e => {
            console.log('Hero autoplay prevented:', e);
        });
    }
    
    // ============================================
    // Performance: Pause videos when tab hidden
    // ============================================
    document.addEventListener('visibilitychange', () => {
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            if (document.hidden) {
                video.dataset.wasPlaying = !video.paused;
                video.pause();
            } else if (video.dataset.wasPlaying === 'true') {
                video.play().catch(() => {});
            }
        });
    });
    
    // ============================================
    // Button Click Effects (touch-optimized)
    // ============================================
    const allButtons = document.querySelectorAll('.btn-hero, .btn-service, .btn-header, .btn-footer');
    
    allButtons.forEach(button => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        if (isTouch) {
            // Touch feedback
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        } else {
            // Mouse click feedback
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    });
    
    // ============================================
    // Console Message
    // ============================================
    console.log('%c MOTOFILMS ', 'background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #fff; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Protección premium para motos ', 'color: #dc2626; font-size: 14px;');
});

// ============================================
// Utility Functions
// ============================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
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
