// ============================================
// Apple CPU Research Demo - Main JavaScript
// ============================================

(function() {
    'use strict';

    // ============================================
    // State Management
    // ============================================
    
    const state = {
        theme: localStorage.getItem('theme') || 'light',
        activeArch: 'firestorm'
    };

    // ============================================
    // DOM Elements
    // ============================================
    
    const elements = {
        navbar: document.getElementById('navbar'),
        navToggle: document.getElementById('navToggle'),
        navMenu: document.getElementById('navMenu'),
        navLinks: document.querySelectorAll('.nav-link'),
        themeToggle: document.getElementById('themeToggle'),
        themeIcon: document.querySelector('.theme-icon'),
        archTabs: document.querySelectorAll('.arch-tab'),
        archPanels: document.querySelectorAll('.arch-panel')
    };

    // ============================================
    // Initialization
    // ============================================
    
    function init() {
        setupTheme();
        setupNavigation();
        setupScrollEffects();
        setupArchitectureTabs();
        setupAnimations();
    }

    // ============================================
    // Theme Management
    // ============================================
    
    function setupTheme() {
        // Apply saved theme
        if (state.theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (elements.themeIcon) {
                elements.themeIcon.textContent = '☀️';
            }
        }

        // Theme toggle handler
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        state.theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        
        if (elements.themeIcon) {
            elements.themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
    }

    // ============================================
    // Navigation
    // ============================================
    
    function setupNavigation() {
        // Mobile menu toggle
        if (elements.navToggle) {
            elements.navToggle.addEventListener('click', toggleMobileMenu);
        }

        // Active link highlighting
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        updateActiveLink(this);
                        
                        // Close mobile menu
                        if (elements.navMenu) {
                            elements.navMenu.classList.remove('active');
                        }
                    }
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (elements.navMenu && 
                !elements.navMenu.contains(e.target) && 
                !elements.navToggle.contains(e.target)) {
                elements.navMenu.classList.remove('active');
            }
        });
    }

    function toggleMobileMenu() {
        if (elements.navMenu) {
            elements.navMenu.classList.toggle('active');
        }
    }

    function updateActiveLink(activeLink) {
        elements.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // ============================================
    // Scroll Effects
    // ============================================
    
    function setupScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Navbar shadow on scroll
            if (elements.navbar) {
                if (currentScroll > 100) {
                    elements.navbar.classList.add('scrolled');
                } else {
                    elements.navbar.classList.remove('scrolled');
                }
            }

            // Update active section in navigation
            updateActiveSection();
            
            lastScroll = currentScroll;
        });
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // Architecture Tabs
    // ============================================
    
    function setupArchitectureTabs() {
        elements.archTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const arch = this.getAttribute('data-arch');
                switchArchitecture(arch);
            });
        });
    }

    function switchArchitecture(arch) {
        state.activeArch = arch;

        // Update tab active state
        elements.archTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-arch') === arch) {
                tab.classList.add('active');
            }
        });

        // Update panel active state
        elements.archPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `${arch}-panel`) {
                panel.classList.add('active');
            }
        });
    }

    // ============================================
    // Animations
    // ============================================
    
    function setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe detail items
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
            observer.observe(item);
        });
    }

    // ============================================
    // Utility Functions
    // ============================================
    
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

    // ============================================
    // Keyboard Shortcuts
    // ============================================
    
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Toggle theme with T key
            if (e.key === 't' || e.key === 'T') {
                if (!isInputFocused()) {
                    toggleTheme();
                }
            }

            // Navigate sections with arrow keys
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                if (!isInputFocused()) {
                    e.preventDefault();
                    navigateSections(e.key === 'ArrowDown');
                }
            }
        });
    }

    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement.tagName === 'INPUT' || 
               activeElement.tagName === 'TEXTAREA' ||
               activeElement.isContentEditable;
    }

    function navigateSections(forward) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        let currentIndex = sections.findIndex(section => {
            return scrollPosition >= section.offsetTop && 
                   scrollPosition < section.offsetTop + section.offsetHeight;
        });

        const nextIndex = forward ? 
            Math.min(currentIndex + 1, sections.length - 1) : 
            Math.max(currentIndex - 1, 0);
        
        if (sections[nextIndex]) {
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // ============================================
    // Performance Monitoring
    // ============================================
    
    function logPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', function() {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
            });
        }
    }

    // ============================================
    // Execute on DOM Ready
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            setupKeyboardShortcuts();
            logPerformance();
        });
    } else {
        init();
        setupKeyboardShortcuts();
        logPerformance();
    }

    // ============================================
    // Export for testing (optional)
    // ============================================
    
    window.AppleCPUDemo = {
        state,
        toggleTheme,
        switchArchitecture
    };

})();
