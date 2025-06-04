/**
 * Project Page JavaScript
 * Handles individual project page functionality
 */

class ProjectPage {
    constructor() {
        this.projectId = null;
        this.project = null;
        this.init();
    }

    init() {
        this.getProjectIdFromURL();
        this.loadProjectData();
        this.setupNavigation();
        this.setupLightbox();
    }

    // Get project ID from URL parameters
    getProjectIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.projectId = urlParams.get('id');
        
        if (!this.projectId) {
            // Redirect to home page if no project ID
            window.location.href = 'index.html';
            return;
        }
    }

    // Load and display project data
    loadProjectData() {
        this.project = portfolioData.getProjectById(this.projectId);
        
        if (!this.project) {
            // Project not found, redirect to home
            window.location.href = 'index.html';
            return;
        }

        this.renderProjectContent();
        this.setupProjectNavigation();
        this.updatePageMeta();
    }

    // Render project content
    renderProjectContent() {
        // Update breadcrumb
        const breadcrumb = document.getElementById('project-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = this.project.title;
        }

        // Update project title and subtitle
        const title = document.getElementById('project-title');
        const subtitle = document.getElementById('project-subtitle');
        
        if (title) title.textContent = this.project.title;
        if (subtitle) subtitle.textContent = this.project.subtitle;

        // Update project meta information
        this.updateProjectMeta();

        // Render project gallery
        this.renderProjectGallery();

        // Render project description
        this.renderProjectDescription();
    }

    // Update project meta information
    updateProjectMeta() {
        const category = document.getElementById('project-category');
        const year = document.getElementById('project-year');
        const tools = document.getElementById('project-tools');

        if (category) category.textContent = this.formatCategory(this.project.category);
        if (year) year.textContent = this.project.year;
        if (tools) tools.textContent = this.project.tools;
    }    // Format category for display
    formatCategory(category) {
        const categoryMap = {
            'branding': 'Brand Identity',
            'content-creation': 'Content Creation',
            'creative-exploration': 'Creative Exploration',
            'ui-ux': 'UI/UX Design'
        };
        
        return categoryMap[category] || category;
    }

    // Render project gallery
    renderProjectGallery() {
        const gallery = document.getElementById('project-gallery');
        if (!gallery || !this.project.images) return;

        gallery.innerHTML = '';

        this.project.images.forEach((image, index) => {
            const imageElement = this.createProjectImage(image, index);
            gallery.appendChild(imageElement);
        });
    }

    // Create project image element
    createProjectImage(image, index) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-image project-image-zoom fade-in-up';
        imageContainer.style.animationDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.caption || this.project.title;
        img.loading = 'lazy';

        // Add click event for lightbox
        imageContainer.addEventListener('click', () => {
            if (window.lightboxController) {
                window.lightboxController.openLightbox(
                    image.url, 
                    image.caption, 
                    this.project.images
                );
            }
        });

        imageContainer.appendChild(img);
        return imageContainer;
    }

    // Render project description and features
    renderProjectDescription() {
        const description = document.getElementById('project-description');
        const featuresList = document.getElementById('project-features-list');

        if (description) {
            // Split description into paragraphs if it contains line breaks
            const paragraphs = this.project.description.split('\n\n');
            description.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        }

        if (featuresList && this.project.features) {
            featuresList.innerHTML = '';
            this.project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }
    }

    // Setup project navigation (previous/next)
    setupProjectNavigation() {
        const prevProject = portfolioData.getPreviousProject(this.projectId);
        const nextProject = portfolioData.getNextProject(this.projectId);

        this.setupProjectNavLink('prev-project', 'prev-project-title', prevProject);
        this.setupProjectNavLink('next-project', 'next-project-title', nextProject);
    }

    // Setup individual project navigation link
    setupProjectNavLink(containerId, titleId, project) {
        const container = document.getElementById(containerId);
        const title = document.getElementById(titleId);

        if (!container || !project) return;

        if (title) {
            title.textContent = project.title;
        }

        container.style.cursor = 'pointer';
        container.addEventListener('click', () => {
            this.navigateToProject(project.id);
        });
    }

    // Navigate to another project with transition
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

    // Setup general navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navHamburger = document.getElementById('nav-hamburger');
        const navMenu = document.getElementById('nav-menu');

        // Hamburger menu toggle
        if (navHamburger) {
            navHamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navHamburger.classList.toggle('active');
            });
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // If it's a section link (starts with index.html#), handle navigation
                if (href.startsWith('index.html#')) {
                    e.preventDefault();
                    const section = href.split('#')[1];
                    this.navigateToSection(section);
                }
            });
        });

        // Back to portfolio link
        const backToPortfolio = document.querySelector('.back-to-portfolio .btn');
        if (backToPortfolio) {
            backToPortfolio.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection('portfolio');
            });
        }
    }

    // Navigate to a section on the main page
    navigateToSection(section) {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.classList.add('active');
        }, 10);

        setTimeout(() => {
            window.location.href = `index.html#${section}`;
        }, 500);
    }

    // Setup lightbox for project images
    setupLightbox() {
        // Lightbox is handled in the image creation, but we can add keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        if (window.lightboxController) {
                            window.lightboxController.closeLightbox();
                        }
                        break;
                }
            }
        });
    }

    // Update page meta tags for SEO
    updatePageMeta() {
        if (!this.project) return;

        // Update page title
        document.title = `${this.project.title} | Portfolio`;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', this.project.subtitle);
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            const keywords = [
                ...this.project.tags,
                this.project.category,
                'portfolio',
                'design'
            ].join(', ');
            metaKeywords.setAttribute('content', keywords);
        }
    }
}

// Related Projects Component
class RelatedProjects {
    constructor(currentProjectId) {
        this.currentProjectId = currentProjectId;
        this.init();
    }

    init() {
        this.renderRelatedProjects();
    }

    renderRelatedProjects() {
        const relatedProjects = portfolioData.getRandomProjects(3, this.currentProjectId);
        
        // Create related projects section if it doesn't exist
        const projectContent = document.querySelector('.project-content');
        if (!projectContent || relatedProjects.length === 0) return;

        const relatedSection = document.createElement('section');
        relatedSection.className = 'related-projects';
        relatedSection.innerHTML = `
            <div class="container">
                <h3>Related Projects</h3>
                <div class="related-projects-grid" id="related-projects-grid">
                </div>
            </div>
        `;

        const relatedGrid = relatedSection.querySelector('#related-projects-grid');
        
        relatedProjects.forEach((project, index) => {
            const projectCard = this.createRelatedProjectCard(project, index);
            relatedGrid.appendChild(projectCard);
        });

        // Insert before project navigation
        const projectNavigation = document.querySelector('.project-navigation');
        if (projectNavigation) {
            projectNavigation.parentNode.insertBefore(relatedSection, projectNavigation);
        } else {
            projectContent.appendChild(relatedSection);
        }

        // Add CSS for related projects
        this.addRelatedProjectsCSS();
    }

    createRelatedProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'related-project-card fade-in-up';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="related-project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="related-project-overlay">
                    <i class="fas fa-eye"></i>
                </div>
            </div>
            <div class="related-project-content">
                <h4>${project.title}</h4>
                <p>${project.subtitle}</p>
                <span class="related-project-category">${this.formatCategory(project.category)}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.navigateToProject(project.id);
        });

        return card;
    }    formatCategory(category) {
        const categoryMap = {
            'branding': 'Brand Identity',
            'content-creation': 'Content Creation',
            'creative-exploration': 'Creative Exploration',
            'ui-ux': 'UI/UX Design'
        };
        
        return categoryMap[category] || category;
    }

    navigateToProject(projectId) {
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

    addRelatedProjectsCSS() {
        const css = `
            .related-projects {
                padding: 4rem 0;
                background: var(--light-gray);
            }
            
            .related-projects h3 {
                text-align: center;
                margin-bottom: 3rem;
                color: var(--primary-color);
            }
            
            .related-projects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
            }
            
            .related-project-card {
                background: white;
                border-radius: var(--border-radius);
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: var(--transition);
                cursor: pointer;
            }
            
            .related-project-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-medium);
            }
            
            .related-project-image {
                position: relative;
                height: 200px;
                overflow: hidden;
            }
            
            .related-project-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: var(--transition);
            }
            
            .related-project-card:hover .related-project-image img {
                transform: scale(1.05);
            }
            
            .related-project-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(26, 26, 46, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: var(--transition);
            }
            
            .related-project-card:hover .related-project-overlay {
                opacity: 1;
            }
            
            .related-project-overlay i {
                color: white;
                font-size: 2rem;
            }
            
            .related-project-content {
                padding: 1.5rem;
            }
            
            .related-project-content h4 {
                margin-bottom: 0.5rem;
                color: var(--primary-color);
            }
            
            .related-project-content p {
                color: var(--medium-gray);
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }
            
            .related-project-category {
                background: var(--accent-color);
                color: white;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = css;
        document.head.appendChild(styleSheet);
    }
}

// Initialize project page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectPage = new ProjectPage();
    
    // Initialize related projects after a short delay
    setTimeout(() => {
        if (window.projectPage.projectId) {
            window.relatedProjects = new RelatedProjects(window.projectPage.projectId);
        }
    }, 500);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProjectPage,
        RelatedProjects
    };
}
