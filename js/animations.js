/**
 * Animation Controller - Handles all scroll-based and interaction animations
 */
class AnimationController {
    constructor() {
        this.observers = [];
        this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.animateOnLoad();
    }

    // Set up intersection observer for scroll animations
    setupIntersectionObserver() {
        if (this.isReduced) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const elementsToAnimate = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in, .reveal-on-scroll'
        );

        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    // Animate individual elements
    animateElement(element) {
        if (element.classList.contains('fade-in-up')) {
            element.classList.add('animate');
        } else if (element.classList.contains('fade-in-left')) {
            element.classList.add('animate');
        } else if (element.classList.contains('fade-in-right')) {
            element.classList.add('animate');
        } else if (element.classList.contains('fade-in')) {
            element.classList.add('animate');
        } else if (element.classList.contains('scale-in')) {
            element.classList.add('animate');
        } else if (element.classList.contains('reveal-on-scroll')) {
            element.classList.add('revealed');
        }
    }

    // Setup parallax effects
    setupParallaxEffects() {
        if (this.isReduced) return;

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestParallaxUpdate);
    }

    // Animate elements on page load
    animateOnLoad() {
        // Animate hero section
        const heroText = document.querySelector('.hero-text');
        if (heroText && !this.isReduced) {
            setTimeout(() => {
                heroText.classList.add('fade-in-up', 'animate');
            }, 500);
        }

        // Stagger animate skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            if (!this.isReduced) {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('fade-in-up');
            }
        });
    }

    // Animate portfolio items with stagger effect
    animatePortfolioItems(items) {
        if (this.isReduced) return;

        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Loading screen animation
    static hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // Smooth scroll to element
    static scrollToElement(targetId, offset = 80) {
        const target = document.getElementById(targetId);
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Button ripple effect
    static addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Typing animation
    static typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Cleanup observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

/**
 * Lightbox Controller - Handles image lightbox functionality
 */
class LightboxController {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.currentImages = [];
        this.currentIndex = 0;
        
        this.init();
    }

    init() {
        if (!this.lightbox) return;

        // Close lightbox events
        this.lightboxClose?.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openLightbox(imageSrc, caption = '', images = []) {
        if (!this.lightbox) return;

        this.currentImages = images.length > 0 ? images : [{ url: imageSrc, caption }];
        this.currentIndex = images.length > 0 ? 
            images.findIndex(img => img.url === imageSrc) : 0;

        this.lightboxImage.src = imageSrc;
        this.lightboxCaption.textContent = caption;
        this.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Add animation class
        setTimeout(() => {
            this.lightbox.classList.add('active');
        }, 10);
    }

    closeLightbox() {
        if (!this.lightbox) return;

        this.lightbox.classList.add('closing');
        setTimeout(() => {
            this.lightbox.style.display = 'none';
            this.lightbox.classList.remove('active', 'closing');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    nextImage() {
        if (this.currentImages.length <= 1) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
        this.updateLightboxImage();
    }

    previousImage() {
        if (this.currentImages.length <= 1) return;
        
        this.currentIndex = this.currentIndex === 0 ? 
            this.currentImages.length - 1 : this.currentIndex - 1;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const currentImage = this.currentImages[this.currentIndex];
        this.lightboxImage.src = currentImage.url;
        this.lightboxCaption.textContent = currentImage.caption || '';
    }
}

/**
 * Form Animation Controller
 */
class FormAnimationController {
    constructor() {
        this.init();
    }

    init() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            // Focus animations
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Validation animations
            input.addEventListener('invalid', () => {
                input.parentElement.classList.add('error');
                this.shakeElement(input);
            });

            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error') && input.checkValidity()) {
                    input.parentElement.classList.remove('error');
                }
            });
        });
    }

    shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
}

// CSS for shake animation
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Add shake CSS to head
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeCSS;
document.head.appendChild(styleSheet);

// Initialize animation controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controllers
    window.animationController = new AnimationController();
    window.lightboxController = new LightboxController();
    window.formAnimationController = new FormAnimationController();

    // Hide loading screen
    AnimationController.hideLoadingScreen();

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        AnimationController.addRippleEffect(button);
    });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        LightboxController,
        FormAnimationController
    };
}
