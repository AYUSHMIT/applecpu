# 🎨 Apple CPU Demo Documentation

This directory contains an interactive web demo showcasing Apple's Firestorm and Icestorm CPU microarchitectures.

## 📁 Structure

```
demo/
├── index.html           # Landing page with architecture overview
├── explorer.html        # Interactive instruction search and comparison
├── visualizer.html      # Performance charts and visualizations
├── css/
│   ├── style.css       # Main styles with CSS variables and responsive design
│   └── themes.css      # Theme variations (dark mode, high contrast)
├── js/
│   ├── main.js         # Core functionality (navigation, theme toggle)
│   ├── explorer.js     # Instruction explorer logic
│   ├── visualizer.js   # Chart generation and animations
│   └── data-parser.js  # Instruction data management
└── assets/
    ├── icons/          # Custom icons (if needed)
    └── images/         # Screenshots and diagrams
```

## 🌟 Features

### Landing Page (`index.html`)
- **Hero Section**: Animated CPU core visualization with project introduction
- **Features Grid**: Six feature cards highlighting key capabilities
- **Architecture Tabs**: Interactive comparison between Firestorm and Icestorm
- **Architecture Details**: Comprehensive specs with visual indicators
- **Comparison Table**: Side-by-side performance metrics
- **Explorer Preview**: Browser mockup showing instruction explorer
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Instruction Explorer (`explorer.html`)
- **Real-time Search**: Filter instructions by name with instant results
- **Advanced Filters**: 
  - Architecture (Firestorm, Icestorm, or both)
  - Category (Integer, SIMD, Load/Store, Branch)
  - Performance (Excellent, Good, Moderate, Slow)
- **Sortable Tables**: Click column headers to sort by any metric
- **Comparison View**: Side-by-side architecture comparison mode
- **Performance Badges**: Color-coded indicators for quick analysis
- **Responsive Tables**: Horizontal scrolling on mobile devices

### Performance Visualizer (`visualizer.html`)
- **Architecture Stats**: Quick overview cards with key metrics
- **Interactive Charts**: 
  - Pipeline width comparison
  - Execution unit distribution
  - ROB size visualization
  - Register file capacity
  - Load/store buffer comparison
  - Instruction latency comparison
- **Category Filtering**: Filter charts by instruction category
- **Performance Insights**: Detailed analysis and interpretations
- **Animated Bars**: Smooth chart animations on scroll

## 🎨 Design System

### Color Scheme
- **Firestorm (P-Core)**: Orange/red gradient (#ff6b35 → #f7931e)
- **Icestorm (E-Core)**: Cyan/blue gradient (#00b4d8 → #90e0ef)
- **Accent**: Purple gradient (#667eea → #764ba2)

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: Bold, large sizes with gradient text effects
- **Body**: Clear, readable 16px base with 1.6 line-height

### Spacing
- Consistent spacing scale using CSS variables
- Mobile-first responsive design
- Flexible grid layouts

## 🚀 Usage

### Local Development
1. Clone the repository
2. Open `demo/index.html` in a modern web browser
3. No build process required!

### Features Overview

#### Dark Mode
- Toggle with the moon/sun icon in navigation
- Persists across sessions using localStorage
- Smooth transitions between themes

#### Keyboard Shortcuts
- `T`: Toggle theme
- `Arrow Up/Down`: Navigate between sections
- Standard keyboard navigation for accessibility

#### Mobile Navigation
- Hamburger menu for small screens
- Touch-friendly button sizes
- Swipe-friendly carousels

## 🔧 Customization

### Adding New Instructions
Edit `js/data-parser.js` and add entries to the `instructionData` object:

```javascript
{
    name: 'YOUR_INSTRUCTION',
    category: 'integer', // or 'simd', 'load-store', 'branch'
    latency: 1,
    throughput: 0.5,
    uops: 1,
    int: 1,
    mem: 0,
    fp: 0,
    units: 'u1-6'
}
```

### Styling Modifications
All styles use CSS variables defined in `:root`. Modify `css/style.css`:

```css
:root {
    --accent-primary: #your-color;
    --spacing-lg: 1.5rem;
    /* etc. */
}
```

### Adding New Charts
In `visualizer.html`, add a new chart card:

```html
<div class="chart-card">
    <div class="chart-header">
        <h3 class="chart-title">Your Chart Title</h3>
        <p class="chart-description">Description</p>
    </div>
    <div class="chart-canvas">
        <!-- Your chart content -->
    </div>
</div>
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- CSS Grid
- CSS Custom Properties (Variables)
- ES6 JavaScript
- IntersectionObserver API
- LocalStorage API

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast mode available
- Screen reader friendly
- Focus indicators on all interactive elements

## 📊 Performance

- **No external dependencies**: Pure HTML/CSS/JavaScript
- **Optimized assets**: Inline critical CSS, minimal HTTP requests
- **Lazy loading**: Charts animate on scroll into view
- **Responsive images**: Optimized for different screen sizes
- **Fast load time**: < 1s on modern connections

## 🐛 Known Issues

- Large instruction datasets may cause slowdown in table view (pagination could be added)
- Some older browsers may not support all CSS features (graceful degradation included)

## 🔜 Future Enhancements

- [ ] Real-time data parsing from measurement HTML files
- [ ] Export functionality (PDF/JSON reports)
- [ ] Interactive instruction simulator
- [ ] Advanced filtering (regex search, multiple categories)
- [ ] Comparison mode with more than 2 architectures
- [ ] Performance benchmarking tools
- [ ] Code examples for each instruction
- [ ] Tutorial/walkthrough mode

## 📄 License

This demo is part of the Apple CPU microarchitecture research project. See main repository for license information.

## 🙏 Credits

- **Design**: Modern, clean interface inspired by Apple's design language
- **Architecture Research**: Based on work by Dougall Johnson and contributors
- **Icons**: Unicode emojis for maximum compatibility

## 📧 Support

For issues or questions about the demo:
1. Check the main repository README
2. Review existing GitHub issues
3. Open a new issue with the `demo` label

---

Made with ❤️ for CPU architecture enthusiasts
