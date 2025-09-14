/**
 * Forever Cookie - Clean JavaScript
 * Lightweight vanilla JS replacing jQuery and heavy libraries
 * Maintains all original functionality with modern ES6+
 */

class ForeverCookie {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.setupMobileMenu();
        
        // Pre-order modal
        this.setupPreOrderModal();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Form enhancements
        this.setupFormEnhancements();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Set current year in footer
        this.setCurrentYear();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                // Toggle hamburger animation
                menuToggle.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking on a link
            const navLinkElements = navLinks.querySelectorAll('.nav-link');
            navLinkElements.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Pre-Order Modal
    setupPreOrderModal() {
        const preorderBtn = document.getElementById('preorder-btn');
        const preorderButtons = document.querySelectorAll('.pre-order-btn');
        const modal = document.getElementById('preorder-modal');
        
        if (modal) {
            // Function to open modal
            const openModal = (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus on first input
                const firstInput = modal.querySelector('input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 100);
                }
            };

            // Navbar pre-order button
            if (preorderBtn) {
                preorderBtn.addEventListener('click', openModal);
            }

            // All Order Now buttons with pre-order-btn class
            preorderButtons.forEach(button => {
                button.addEventListener('click', openModal);
            });

            // Close modal function
            const closeModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            };

            // Close button functionality - Multiple selectors for reliability
            const closeButtons = modal.querySelectorAll('.modal-close');
            closeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal();
                });
            });
            
            // Close on overlay click (click outside modal content)
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-background')) {
                    closeModal();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
            
            // Mobile-friendly: Add touch event for close button
            closeButtons.forEach(button => {
                button.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal();
                });
            });
        }
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        // Handle anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just '#'
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(href);
                }
            });
        });
    }

    // Update Active Navigation Link
    updateActiveNavLink(targetHref) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === targetHref) {
                link.classList.add('active');
            }
        });
    }

    // Form Enhancements
    setupFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add loading state on submit
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    // Re-enable after a delay (for UX, since form submits to external service)
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });

            // Input focus effects
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                // Add focus class to parent form-group
                input.addEventListener('focus', () => {
                    const formGroup = input.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.add('focused');
                    }
                });

                input.addEventListener('blur', () => {
                    const formGroup = input.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.remove('focused');
                    }
                });
            });
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            const animateElements = document.querySelectorAll('.hero-text, .about-text, .product-details');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(el => {
                // Initial state for animation
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                observer.observe(el);
            });
        }

        // Scroll-based navigation highlighting
        this.setupScrollNavigation();
    }

    // Scroll-based Navigation Highlighting
    setupScrollNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100; // Offset for navbar
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                const href = link.getAttribute('href');
                if (href === `#${currentSection}` || (currentSection === '' && href === '/')) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Utility Methods
    static debounce(func, wait) {
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

    // Performance optimized scroll handler
    setupOptimizedScrollHandlers() {
        const debouncedScrollHandler = ForeverCookie.debounce(() => {
            this.handleScroll();
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    }

    handleScroll() {
        // Consolidated scroll handling for better performance
        const scrollY = window.scrollY;
        
        // Navbar effects
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }
    }

    // Set current year in footer
    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Initialize the application
const app = new ForeverCookie();

// Export for potential future use
window.ForeverCookie = ForeverCookie;