# GitHub Copilot Instructions for Portfolio Website

## Project Overview
This is a modern, professional graphic design portfolio website built with HTML5, CSS3, and vanilla JavaScript. The project features a sophisticated design system with deep navy, charcoal, and gold accent colors.

## Architecture & Structure
- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Styling**: CSS Grid, Flexbox, CSS Variables, Mobile-first responsive design
- **Animations**: CSS transitions, transforms, Intersection Observer API
- **Portfolio**: Dynamic filtering, lightbox gallery, project detail pages
- **Forms**: Contact form with client-side validation

## Key Features
1. **Responsive Design**: Mobile-first approach with breakpoints at 768px, 1024px, 1200px
2. **Portfolio System**: Category filtering (branding, web-design, print, ui-ux)
3. **Lightbox Gallery**: Image viewing with keyboard navigation
4. **Contact Form**: Real-time validation with error handling
5. **Smooth Animations**: Scroll-triggered effects and page transitions
6. **SEO Optimized**: Semantic HTML5, meta tags, structured data

## Color Palette
- Primary: `#1a1a2e` (Deep Navy)
- Secondary: `#16213e` (Charcoal)
- Accent: `#f39c12` (Gold)
- Text: `#e8e8e8` (Light Gray)
- Background: `#0f0f23` (Dark Background)

## Coding Standards
- Use CSS custom properties for theming
- Follow BEM methodology for CSS class naming
- Implement progressive enhancement
- Maintain accessibility standards (ARIA labels, semantic HTML)
- Use modern JavaScript (ES6+) features
- Keep JavaScript modular with separate controllers

## File Organization
- `css/style.css`: Main styles and responsive design
- `css/animations.css`: Animation effects and transitions
- `css/project.css`: Project page specific styles
- `js/main.js`: Core application logic
- `js/animations.js`: Animation controllers
- `js/portfolio-data.js`: Portfolio content management
- `js/project.js`: Project page functionality

## Development Guidelines
- Maintain mobile-first responsive design
- Use semantic HTML5 elements
- Implement smooth scroll behavior
- Add loading states for better UX
- Optimize images for web performance
- Test across multiple devices and browsers

## Performance Considerations
- Minimize HTTP requests
- Optimize images (WebP format when possible)
- Use CSS for animations over JavaScript when possible
- Implement lazy loading for images
- Minify CSS/JS for production

## Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers
