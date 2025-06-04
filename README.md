# Ramones Capulong - Portfolio Website

A sophisticated, responsive portfolio website showcasing the graphic design work of Ramones Capulong. Built with modern web technologies and featuring a clean minimalist design with deep navy, charcoal, and gold accent colors, smooth animations, and comprehensive portfolio functionality.

## 🎨 Features

### Design & UI
- **Modern Minimalist Design** - Clean, professional aesthetic
- **Sophisticated Color Palette** - Deep navy (#1a1a2e), charcoal (#16213e), gold accent (#f39c12)
- **Typography** - Poppins and Inter font families for optimal readability
- **Responsive Layout** - Mobile-first design with CSS Grid and Flexbox
- **Smooth Animations** - Scroll-triggered effects and hover interactions

### Portfolio Functionality
- **Dynamic Filtering** - Filter projects by category (Branding, Web Design, Print, UI/UX)
- **Lightbox Gallery** - Full-screen image viewing with keyboard navigation
- **Project Detail Pages** - Individual pages for each portfolio item
- **Project Navigation** - Previous/Next navigation between projects
- **Staggered Animations** - Elegant reveal animations for portfolio items

### Interactive Elements
- **Contact Form** - Real-time validation with comprehensive error handling
- **Mobile Navigation** - Hamburger menu with smooth slide animations
- **Smooth Scrolling** - Seamless navigation between sections
- **Loading Animations** - Professional loading screens and transitions
- **Scroll-to-Top** - Convenient return-to-top functionality

## 🚀 Technologies Used

- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Advanced styling with Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - Modern ES6+ features without frameworks
- **CSS Animations** - Hardware-accelerated transitions and transforms
- **Intersection Observer API** - Efficient scroll-based animations
- **Form API** - Native browser form validation

## 📁 Project Structure

```
portfolio-ram-final/
├── index.html              # Main homepage
├── project.html            # Project detail template
├── css/
│   ├── style.css          # Main styles and responsive design
│   ├── animations.css     # Animation effects and transitions
│   └── project.css        # Project page specific styles
├── js/
│   ├── main.js            # Core application logic
│   ├── animations.js      # Animation controllers
│   ├── portfolio-data.js  # Portfolio content management
│   └── project.js         # Project page functionality
├── images/                # Portfolio images and assets
└── .github/
    └── copilot-instructions.md
```

## 🎯 Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (optional, for development)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd portfolio-ram-final
   ```

2. **Serve the files locally** (recommended)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` in your web browser

### Direct File Access
You can also open `index.html` directly in your browser, though some features may work better with a local server.

## 🔧 Development

### Local Development Setup
1. Open the project in VS Code
2. Install the Live Server extension (optional)
3. Use the built-in tasks for development workflow

### Available Tasks
- **Serve**: Start local development server
- **Build**: Prepare files for production
- **Validate**: Check HTML/CSS/JS for errors

### Customization

#### Colors
Edit CSS custom properties in `css/style.css`:
```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --accent-color: #f39c12;
    --text-color: #e8e8e8;
    --bg-color: #0f0f23;
}
```

#### Portfolio Content
Modify portfolio items in `js/portfolio-data.js`:
```javascript
const portfolioData = [
    {
        id: 1,
        title: "Your Project Title",
        category: "branding",
        image: "images/project1.jpg",
        description: "Project description..."
    }
    // Add more projects...
];
```

#### Typography
Change fonts by updating the Google Fonts imports in HTML and CSS font-family declarations.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1200px
- **Large Desktop**: > 1200px

## 🎨 Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Deep Navy | `#1a1a2e` | Primary backgrounds, headers |
| Charcoal | `#16213e` | Secondary backgrounds, cards |
| Gold | `#f39c12` | Accents, buttons, highlights |
| Light Gray | `#e8e8e8` | Primary text |
| Dark Background | `#0f0f23` | Main background |

## 🔍 SEO Features

- Semantic HTML5 structure
- Meta tags for social sharing
- Optimized page titles and descriptions
- Clean URL structure
- Fast loading performance
- Mobile-friendly design

## 🌐 Browser Support

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using modern web technologies**
