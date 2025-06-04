/**
 * Main Portfolio JavaScript
 * Handles navigation, portfolio filtering, contact form, and general interactions
 */

class PortfolioApp {
    constructor() {
        this.currentFilter = 'all';
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupPortfolio();
        this.setupContactForm();
        this.setupScrollEffects();
        this.loadPortfolioItems();
    }

    // Navigation Setup
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('nav-menu');
        const navHamburger = document.getElementById('nav-hamburger');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        if (navHamburger) {
            navHamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Close mobile menu if open
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }

                // Scroll to target
                AnimationController.scrollToElement(targetId);
                
                // Update active link
                this.updateActiveNavLink(link);
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavOnScroll();
        });
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navHamburger = document.getElementById('nav-hamburger');

        this.isMenuOpen = !this.isMenuOpen;
        
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
        
        if (navHamburger) {
            navHamburger.classList.toggle('active');
        }

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Portfolio Setup
    setupPortfolio() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterPortfolio(filter);
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    loadPortfolioItems() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (!portfolioGrid) return;

        const projects = portfolioData.getAllProjects();
        portfolioGrid.innerHTML = '';

        projects.forEach((project, index) => {
            const portfolioItem = this.createPortfolioItem(project);
            portfolioGrid.appendChild(portfolioItem);
            
            // Animate items with stagger
            setTimeout(() => {
                portfolioItem.classList.add('show');
            }, index * 100);
        });

        // Setup lightbox for portfolio images
        this.setupPortfolioLightbox();
    }

    createPortfolioItem(project) {
        const item = document.createElement('div');
        item.className = `portfolio-item ${project.category}`;
        item.setAttribute('data-category', project.category);
        
        item.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-content">
                        <i class="fas fa-eye"></i>
                        <p>View Project</p>
                    </div>
                </div>
            </div>
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.subtitle}</p>
                <div class="portfolio-tags">
                    ${project.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        // Add click event to navigate to project page
        item.addEventListener('click', () => {
            this.navigateToProject(project.id);
        });

        return item;
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 50);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Re-animate visible items
        const visibleItems = document.querySelectorAll('.portfolio-item:not([style*="none"])');
        if (window.animationController) {
            window.animationController.animatePortfolioItems(Array.from(visibleItems));
        }
    }

    setupPortfolioLightbox() {
        const portfolioImages = document.querySelectorAll('.portfolio-image img');
        
        portfolioImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.lightboxController) {
                    window.lightboxController.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    navigateToProject(projectId) {
        // Create page transition effect
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('active');
        }, 10);

        setTimeout(() => {
            window.location.href = `project.html?id=${projectId}`;
        }, 500);
    }

    // Contact Form Setup
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Validation rules
        switch(fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const formGroup = field.parentElement;
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearFieldError(field) {
        const formGroup = field.parentElement;
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const formInputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        // Validate all fields
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormMessage('Please correct the errors above.', 'error');
            return;
        }        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Create mailto link and open email client
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
        const mailtoBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        const mailtoUrl = `mailto:elefesramones51@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        // Open email client
        window.location.href = mailtoUrl;
        
        // Show success message and reset form
        setTimeout(() => {
            this.showFormMessage('Email client opened! Thank you for your interest.', 'success');
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Clear all field errors
            formInputs.forEach(input => this.clearFieldError(input));
        }, 1000);
    }

    showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            text-align: center;
            font-weight: 500;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;

        // Insert message
        const contactForm = document.getElementById('contact-form');
        contactForm.insertBefore(messageElement, contactForm.firstChild);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // Scroll Effects
    setupScrollEffects() {
        // Scroll to top button
        const scrollToTopBtn = this.createScrollToTopButton();
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
    }

    createScrollToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'scroll-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--accent-color);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });

        document.body.appendChild(button);
        return button;
    }
}

// Search functionality
class SearchController {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    init() {
        this.createSearchInterface();
    }

    createSearchInterface() {
        // Create search overlay (optional feature)
        const searchOverlay = document.createElement('div');
        searchOverlay.id = 'search-overlay';
        searchOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(searchOverlay);

        // Add search functionality to existing elements if needed
        // This can be expanded based on requirements
    }

    search(query) {
        const results = portfolioData.searchProjects(query);
        return results;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    window.searchController = new SearchController();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        document.title = '👋 Come back soon! | Portfolio';
    } else {
        // Page is visible
        document.title = 'Portfolio | Creative Graphic Designer';
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        SearchController
    };
}
