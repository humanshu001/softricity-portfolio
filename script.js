/**
 * Softricity - Modern SaaS Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initPartnersSlider();
    initTemplatesTabs();
    initTestimonialsSlider();
    initPricingToggle();
    initAnimations();
    initInteractiveElements();
    initTemplatePreviewModal();
    initInteractiveFeatures();
    initLightEffect();
    initUIShowcase();
    initProjectsSection();
    initAIBenefits();
    initFloatingButtons();
    initAIFeaturesSection();
    initExperienceFeaturesSection();
    initSoftricityAIChatbot();
});

/**
 * Navbar functionality
 */
function initNavbar() {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let lastScrollTop = 0;
    
    // Handle scroll event for navbar
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            
            // Parallax effect - adjust the floating animation based on scroll
            const parallaxValue = Math.min(scrollTop * 0.05, 30);
            header.style.backdropFilter = `blur(${15 + parallaxValue * 0.5}px)`;
            
            // Increase transparency as we scroll down
            const opacityValue = Math.max(0.6 - (scrollTop * 0.0005), 0.2);
            header.style.backgroundColor = `rgba(17, 24, 39, ${opacityValue})`;
        } else {
            header.classList.remove('scrolled');
            header.style.backdropFilter = 'blur(15px)';
            
            // Reset to original opacity
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.6)';
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add hover effect to header
    header.addEventListener('mouseenter', function() {
        header.classList.add('hover');
    });
    
    header.addEventListener('mouseleave', function() {
        header.classList.remove('hover');
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset menu icon
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Add active class to current section link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });
}

/**
 * Partners slider functionality (now Technology section)
 */
function initPartnersSlider() {
    const partnersTrack = document.querySelector('.partners-track');
    
    if (!partnersTrack) return;
    
    // Clone the technology logos for infinite loop
    const partners = partnersTrack.querySelectorAll('.partner-logo');
    partners.forEach(partner => {
        const clone = partner.cloneNode(true);
        partnersTrack.appendChild(clone);
    });
}

/**
 * Templates tabs functionality
 */
function initTemplatesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length === 0 || tabPanes.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const target = this.getAttribute('data-target');
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('data-id') === target) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Testimonials slider functionality
 */
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || !prevBtn || !nextBtn || dots.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = dots.length;
    
    // Function to update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 103}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Event listeners for controls
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto slide (optional)
    let interval = setInterval(function() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    track.parentElement.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    
    track.parentElement.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    });
    
    // Initial update
    updateSlider();
}

/**
 * Pricing toggle functionality
 */
function initPricingToggle() {
    const toggle = document.querySelector('#pricing-toggle');
    const monthlyAmounts = document.querySelectorAll('.amount.monthly');
    const yearlyAmounts = document.querySelectorAll('.amount.yearly');
    
    if (!toggle || monthlyAmounts.length === 0 || yearlyAmounts.length === 0) return;
    
    toggle.addEventListener('change', function() {
        if (this.checked) {
            // Yearly pricing
            monthlyAmounts.forEach(amount => amount.style.display = 'none');
            yearlyAmounts.forEach(amount => amount.style.display = 'block');
        } else {
            // Monthly pricing
            monthlyAmounts.forEach(amount => amount.style.display = 'block');
            yearlyAmounts.forEach(amount => amount.style.display = 'none');
        }
    });
}

/**
 * Animations functionality
 */
function initAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .template-card, .project-card, .pricing-card');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation class with delay to stagger animations
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.template-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Create floating elements for hero section
    createFloatingElements();
}

/**
 * Create floating elements in the hero section
 */
function createFloatingElements() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Add floating elements dynamically
    const element1 = document.createElement('div');
    element1.className = 'floating-element element-1';
    element1.innerHTML = `
        <div class="stat">
            <h3>98%</h3>
            <p>Satisfaction</p>
        </div>
    `;
    
    const element2 = document.createElement('div');
    element2.className = 'floating-element element-2';
    element2.innerHTML = `
        <div class="notification">
            <i class="fas fa-bell"></i>
            <span>New update available!</span>
        </div>
    `;
    
    const element3 = document.createElement('div');
    element3.className = 'floating-element element-3';
    element3.innerHTML = `
        <div class="user-activity">
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="activity-info">
                <p>New user joined</p>
            </div>
        </div>
    `;
    
    const imageContainer = heroSection.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.appendChild(element1);
        imageContainer.appendChild(element2);
        imageContainer.appendChild(element3);
    }
}

/**
 * Initialize interactive elements
 */
function initInteractiveElements() {
    const heroImage = document.querySelector('.hero-image');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Initialize the interactive elements functionality
    initColorPalette();
    initTypography();
    initComponents();
    // initAnalytics();
    
    if (heroImage && cursorFollower) {
        heroImage.addEventListener('mousemove', function(e) {
            const rect = heroImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursorFollower.style.left = `${x}px`;
            cursorFollower.style.top = `${y}px`;
            
            // Check if near an interactive element
            const iconItems = document.querySelectorAll('.icon-item');
            let nearIcon = false;
            
            iconItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const centerX = itemRect.left + itemRect.width / 2 - rect.left;
                const centerY = itemRect.top + itemRect.height / 2 - rect.top;
                
                const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                
                if (distance < 100) {
                    nearIcon = true;
                    const scale = 1 - (distance / 100) * 0.5;
                    cursorFollower.style.transform = `translate(-50%, -50%) scale(${scale})`;
                    cursorFollower.style.backgroundColor = 'rgba(99, 102, 241, 0.5)';
                }
            });
            
            if (!nearIcon) {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
            }
        });
        
        heroImage.addEventListener('mouseenter', function() {
            cursorFollower.style.opacity = '1';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            cursorFollower.style.opacity = '0';
        });
    }
    
    /**
     * Color Palette Functionality
     * Allows selecting colors to change the icon's color
     */
    function initColorPalette() {
        const colorPalette = document.querySelector('.icon-item[data-tooltip="Color Palette"]');
        const colorDots = colorPalette.querySelectorAll('.color-dot');
        const paletteIcon = colorPalette.querySelector('.icon-circle i');
        
        // Create a color picker popup
        const colorPickerPopup = document.createElement('div');
        colorPickerPopup.className = 'color-picker-popup';
        colorPickerPopup.innerHTML = `
            <div class="color-picker-header">
                <h4>Select a Color</h4>
                <button class="close-picker"><i class="fas fa-times"></i></button>
            </div>
            <div class="color-picker-body">
                <div class="color-grid">
                    <span class="color-option" style="background-color: #6366f1;" data-color="#6366f1"></span>
                    <span class="color-option" style="background-color: #0ea5e9;" data-color="#0ea5e9"></span>
                    <span class="color-option" style="background-color: #10b981;" data-color="#10b981"></span>
                    <span class="color-option" style="background-color: #f97316;" data-color="#f97316"></span>
                    <span class="color-option" style="background-color: #ef4444;" data-color="#ef4444"></span>
                    <span class="color-option" style="background-color: #8b5cf6;" data-color="#8b5cf6"></span>
                    <span class="color-option" style="background-color: #ec4899;" data-color="#ec4899"></span>
                    <span class="color-option" style="background-color: #f59e0b;" data-color="#f59e0b"></span>
                </div>
                <div class="selected-color">
                    <div class="color-preview" style="background-color: #6366f1;"></div>
                    <div class="color-value">#6366f1</div>
                </div>
            </div>
        `;
        
        colorPalette.appendChild(colorPickerPopup);
        
        // Toggle color picker on click
        colorPalette.addEventListener('click', function(e) {
            if (e.target.closest('.close-picker')) {
                colorPickerPopup.classList.remove('active');
                return;
            }
            
            if (!e.target.closest('.color-picker-popup') || e.target.closest('.color-option')) {
                colorPickerPopup.classList.toggle('active');
            }
        });
        
        // Handle color selection
        const colorOptions = colorPickerPopup.querySelectorAll('.color-option');
        const colorPreview = colorPickerPopup.querySelector('.color-preview');
        const colorValue = colorPickerPopup.querySelector('.color-value');
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                
                // Update the selected color display
                colorPreview.style.backgroundColor = color;
                colorValue.textContent = color;
                
                // Update the dashboard elements with the selected color
                updateDashboardColors(color);
            });
        });
        
        // Original color dots functionality
        colorDots.forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                const color = this.style.backgroundColor;
                
                // Update the dashboard elements with the selected color
                updateDashboardColors(color);
            });
        });
        
        // Function to update dashboard elements with the selected color
        function updateDashboardColors(color) {
            // Update various UI elements with the selected color
            document.documentElement.style.setProperty('--primary', color);
            
            // Add a visual feedback animation
            const dashboardScreen = document.querySelector('.dashboard-screen');
            if (dashboardScreen) {
                const colorFlash = document.createElement('div');
                colorFlash.className = 'color-flash';
                colorFlash.style.backgroundColor = color;
                dashboardScreen.appendChild(colorFlash);
                
                setTimeout(() => {
                    colorFlash.style.opacity = '0';
                    setTimeout(() => {
                        colorFlash.remove();
                    }, 500);
                }, 50);
            }
        }
    }
    
    /**
     * Typography Functionality
     * Allows selecting different fonts
     */
    function initTypography() {
        const typographyItem = document.querySelector('.icon-item[data-tooltip="Typography"]');
        const typoIcon = typographyItem.querySelector('.icon-circle i');
        
        // Create a font selector popup
        const fontSelectorPopup = document.createElement('div');
        fontSelectorPopup.className = 'font-selector-popup';
        fontSelectorPopup.innerHTML = `
            <div class="font-selector-header">
                <h4>Select a Font</h4>
                <button class="close-font-selector"><i class="fas fa-times"></i></button>
            </div>
            <div class="font-selector-body">
                <div class="font-options">
                    <div class="font-option" data-font="'Inter', sans-serif">
                        <span class="font-name" style="font-family: 'Inter', sans-serif;">Inter</span>
                        <span class="font-preview" style="font-family: 'Inter', sans-serif;">The quick brown fox jumps over the lazy dog</span>
                    </div>
                    <div class="font-option" data-font="'Plus Jakarta Sans', sans-serif">
                        <span class="font-name" style="font-family: 'Plus Jakarta Sans', sans-serif;">Plus Jakarta Sans</span>
                        <span class="font-preview" style="font-family: 'Plus Jakarta Sans', sans-serif;">The quick brown fox jumps over the lazy dog</span>
                    </div>
                    <div class="font-option" data-font="'Roboto', sans-serif">
                        <span class="font-name" style="font-family: 'Roboto', sans-serif;">Roboto</span>
                        <span class="font-preview" style="font-family: 'Roboto', sans-serif;">The quick brown fox jumps over the lazy dog</span>
                    </div>
                    <div class="font-option" data-font="'Montserrat', sans-serif">
                        <span class="font-name" style="font-family: 'Montserrat', sans-serif;">Montserrat</span>
                        <span class="font-preview" style="font-family: 'Montserrat', sans-serif;">The quick brown fox jumps over the lazy dog</span>
                    </div>
                </div>
                <div class="font-settings">
                    <div class="font-size-control">
                        <label>Size</label>
                        <div class="size-buttons">
                            <button class="size-btn" data-size="small">S</button>
                            <button class="size-btn active" data-size="medium">M</button>
                            <button class="size-btn" data-size="large">L</button>
                        </div>
                    </div>
                    <div class="font-weight-control">
                        <label>Weight</label>
                        <div class="weight-buttons">
                            <button class="weight-btn" data-weight="400">Regular</button>
                            <button class="weight-btn active" data-weight="500">Medium</button>
                            <button class="weight-btn" data-weight="700">Bold</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        typographyItem.appendChild(fontSelectorPopup);
        
        // Toggle font selector on click
        typographyItem.addEventListener('click', function(e) {
            if (e.target.closest('.close-font-selector')) {
                fontSelectorPopup.classList.remove('active');
                return;
            }
            
            if (!e.target.closest('.font-selector-popup') || e.target.closest('.font-option')) {
                fontSelectorPopup.classList.toggle('active');
            }
        });
        
        // Handle font selection
        const fontOptions = fontSelectorPopup.querySelectorAll('.font-option');
        fontOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                fontOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to selected option
                this.classList.add('active');
                
                const fontFamily = this.getAttribute('data-font');
                updateTypography(fontFamily);
            });
        });
        
        // Handle font size selection
        const sizeButtons = fontSelectorPopup.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const size = this.getAttribute('data-size');
                updateFontSize(size);
            });
        });
        
        // Handle font weight selection
        const weightButtons = fontSelectorPopup.querySelectorAll('.weight-btn');
        weightButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                weightButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const weight = this.getAttribute('data-weight');
                updateFontWeight(weight);
            });
        });
        
        // Function to update typography
        function updateTypography(fontFamily) {
            // Update the typography preview
            const typoLines = typographyItem.querySelectorAll('.typo-line');
            typoLines.forEach(line => {
                line.style.fontFamily = fontFamily;
            });
            
            // Update the dashboard text elements
            document.documentElement.style.setProperty('--font-primary', fontFamily);
            
            // Visual feedback
            typoIcon.classList.add('pulse');
            setTimeout(() => {
                typoIcon.classList.remove('pulse');
            }, 500);
        }
        
        // Function to update font size
        function updateFontSize(size) {
            let sizeValue;
            switch(size) {
                case 'small':
                    sizeValue = '0.875rem';
                    break;
                case 'medium':
                    sizeValue = '1rem';
                    break;
                case 'large':
                    sizeValue = '1.25rem';
                    break;
                default:
                    sizeValue = '1rem';
            }
            
            // Update the typography preview
            const typoLines = typographyItem.querySelectorAll('.typo-line');
            typoLines.forEach(line => {
                line.style.height = sizeValue;
            });
            
            // Update the dashboard text elements
            document.documentElement.style.setProperty('--font-size-base', sizeValue);
        }
        
        // Function to update font weight
        function updateFontWeight(weight) {
            // Update the typography preview
            const typoLines = typographyItem.querySelectorAll('.typo-line');
            typoLines.forEach(line => {
                line.style.opacity = weight / 700; // Adjust opacity based on weight
            });
            
            // Update the dashboard text elements
            document.documentElement.style.setProperty('--font-weight-normal', weight);
        }
    }
    
    /**
     * Components Functionality
     * Shows 2-4 small components on hover that can be selected
     */
    function initComponents() {
        const componentsItem = document.querySelector('.icon-item[data-tooltip="Components"]');
        const componentIcon = componentsItem.querySelector('.icon-circle i');
        
        // Create component selector
        const componentSelector = document.createElement('div');
        componentSelector.className = 'component-selector';
        componentSelector.innerHTML = `
            <div class="component-options">
                <div class="component-option" data-component="button">
                    <div class="component-preview">
                        <div class="preview-button">Button</div>
                    </div>
                    <span>Button</span>
                </div>
                <div class="component-option" data-component="card">
                    <div class="component-preview">
                        <div class="preview-card"></div>
                    </div>
                    <span>Card</span>
                </div>
                <div class="component-option" data-component="input">
                    <div class="component-preview">
                        <div class="preview-input"></div>
                    </div>
                    <span>Input</span>
                </div>
                <div class="component-option" data-component="modal">
                    <div class="component-preview">
                        <div class="preview-modal"></div>
                    </div>
                    <span>Modal</span>
                </div>
            </div>
        `;
        
        componentsItem.appendChild(componentSelector);
        
        // Show component selector on hover
        componentsItem.addEventListener('mouseenter', function() {
            componentSelector.classList.add('active');
        });
        
        componentsItem.addEventListener('mouseleave', function() {
            if (!componentSelector.classList.contains('selecting')) {
                componentSelector.classList.remove('active');
            }
        });
        
        // Handle component selection
        const componentOptions = componentSelector.querySelectorAll('.component-option');
        componentOptions.forEach(option => {
            option.addEventListener('click', function() {
                const component = this.getAttribute('data-component');
                
                // Add selecting class to prevent hiding on mouseleave
                componentSelector.classList.add('selecting');
                
                // Add active class to selected option
                componentOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Show selection feedback
                showSelectionFeedback(component);
                
                // Remove selecting class after a delay
                setTimeout(() => {
                    componentSelector.classList.remove('selecting');
                    componentSelector.classList.remove('active');
                }, 500);
            });
        });
        
        // Function to show selection feedback
        function showSelectionFeedback(componentType) {
            // Visual feedback for selection
            componentIcon.classList.add('pulse');
            
            // Create a notification
            const notification = document.createElement('div');
            notification.className = 'component-notification';
            notification.innerHTML = `<span>${componentType.charAt(0).toUpperCase() + componentType.slice(1)} selected</span>`;
            
            // Add to body
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.add('active');
            }, 10);
            
            // Remove after delay
            setTimeout(() => {
                notification.classList.remove('active');
                setTimeout(() => {
                    notification.remove();
                }, 300);
                componentIcon.classList.remove('pulse');
            }, 2000);
        }
    }
    
    /**
     * Analytics Functionality
     * Interactive behavior for analytics bars
     */
    function initAnalytics() {
        const analyticsItem = document.querySelector('.icon-item[data-tooltip="Analytics"]');
        const analyticsBars = analyticsItem.querySelectorAll('.analytics-bar');
        const analyticsIcon = analyticsItem.querySelector('.icon-circle i');
        
        // Create analytics popup
        const analyticsPopup = document.createElement('div');
        analyticsPopup.className = 'analytics-popup';
        analyticsPopup.innerHTML = `
            <div class="analytics-popup-header">
                <h4>Performance Metrics</h4>
                <button class="close-analytics"><i class="fas fa-times"></i></button>
            </div>
            <div class="analytics-popup-body">
                <div class="analytics-chart">
                    <div class="chart-bars">
                        <div class="chart-bar">
                            <div class="bar-fill" style="height: 65%;" data-value="65"></div>
                            <span class="bar-label">Mon</span>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="height: 80%;" data-value="80"></div>
                            <span class="bar-label">Tue</span>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="height: 45%;" data-value="45"></div>
                            <span class="bar-label">Wed</span>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="height: 90%;" data-value="90"></div>
                            <span class="bar-label">Thu</span>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill" style="height: 75%;" data-value="75"></div>
                            <span class="bar-label">Fri</span>
                        </div>
                    </div>
                </div>
                <div class="analytics-metrics">
                    <div class="metric">
                        <span class="metric-label">Visitors</span>
                        <span class="metric-value">1,245</span>
                        <span class="metric-change positive">+12.5%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Conversion</span>
                        <span class="metric-value">5.7%</span>
                        <span class="metric-change positive">+2.1%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Bounce Rate</span>
                        <span class="metric-value">32.4%</span>
                        <span class="metric-change negative">+4.5%</span>
                    </div>
                </div>
                <div class="analytics-controls">
                    <button class="refresh-btn"><i class="fas fa-sync-alt"></i> Refresh Data</button>
                    <div class="date-range">
                        <span>Last 7 days</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        `;
        
        analyticsItem.appendChild(analyticsPopup);
        
        // Toggle analytics popup on click
        analyticsItem.addEventListener('click', function(e) {
            if (e.target.closest('.close-analytics')) {
                analyticsPopup.classList.remove('active');
                return;
            }
            
            if (!e.target.closest('.analytics-popup') || e.target.closest('.refresh-btn')) {
                analyticsPopup.classList.toggle('active');
                
                if (analyticsPopup.classList.contains('active')) {
                    animateChartBars();
                }
            }
        });
        
        // Make analytics bars interactive
        analyticsBars.forEach((bar, index) => {
            // Set random heights for visual effect
            const height = Math.floor(Math.random() * 70) + 30;
            bar.style.height = `${height}%`;
            
            // Add hover effect
            bar.addEventListener('mouseenter', function() {
                this.style.height = `${height + 10}%`;
                this.style.backgroundColor = 'var(--primary)';
            });
            
            bar.addEventListener('mouseleave', function() {
                this.style.height = `${height}%`;
                this.style.backgroundColor = '';
            });
        });
        
        // Refresh button functionality
        const refreshBtn = analyticsPopup.querySelector('.refresh-btn');
        refreshBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add spinning animation to refresh icon
            const refreshIcon = this.querySelector('i');
            refreshIcon.classList.add('fa-spin');
            
            // Animate chart bars with new random values
            setTimeout(() => {
                animateChartBars();
                refreshIcon.classList.remove('fa-spin');
                
                // Update metrics with random values
                updateMetrics();
            }, 800);
        });
        
        // Function to animate chart bars
        function animateChartBars() {
            const chartBars = analyticsPopup.querySelectorAll('.chart-bar .bar-fill');
            
            chartBars.forEach(bar => {
                // Generate new random height
                const newHeight = Math.floor(Math.random() * 70) + 30;
                
                // Reset height to 0 and then animate to new height
                bar.style.height = '0%';
                bar.setAttribute('data-value', newHeight);
                
                setTimeout(() => {
                    bar.style.height = `${newHeight}%`;
                }, 50);
            });
        }
        
        // Function to update metrics with random values
        function updateMetrics() {
            const metrics = analyticsPopup.querySelectorAll('.metric');
            
            metrics.forEach(metric => {
                const valueElement = metric.querySelector('.metric-value');
                const changeElement = metric.querySelector('.metric-change');
                
                const label = metric.querySelector('.metric-label').textContent;
                let newValue, newChange;
                
                switch(label) {
                    case 'Visitors':
                        newValue = Math.floor(Math.random() * 2000) + 500;
                        valueElement.textContent = newValue.toLocaleString();
                        break;
                    case 'Conversion':
                        newValue = (Math.random() * 8 + 2).toFixed(1);
                        valueElement.textContent = `${newValue}%`;
                        break;
                    case 'Bounce Rate':
                        newValue = (Math.random() * 40 + 20).toFixed(1);
                        valueElement.textContent = `${newValue}%`;
                        break;
                }
                
                // Generate random change percentage
                newChange = (Math.random() * 15).toFixed(1);
                const isPositive = Math.random() > 0.5;
                
                changeElement.textContent = `${isPositive ? '+' : '-'}${newChange}%`;
                changeElement.className = `metric-change ${isPositive ? 'positive' : 'negative'}`;
                
                // Add animation
                valueElement.classList.add('updating');
                setTimeout(() => {
                    valueElement.classList.remove('updating');
                }, 500);
            });
        }
    }
}

/**
 * Initialize template preview modal
 */
function initTemplatePreviewModal() {
    const previewBtns = document.querySelectorAll('.preview-btn');
    const modal = document.getElementById('templatePreviewModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!previewBtns.length || !modal || !closeBtn) return;
    
    // Open modal when preview button is clicked
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get template data
            const card = this.closest('.template-card');
            const image = card.querySelector('.template-image img').src;
            const title = card.querySelector('.template-info h3').textContent;
            const description = card.querySelector('.template-info p').textContent;
            
            // Set modal content
            modal.querySelector('.preview-image img').src = image;
            modal.querySelector('.preview-title').textContent = title;
            modal.querySelector('.preview-description').textContent = description;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize interactive features demo
 */
function initInteractiveFeatures() {
    const demoOptions = document.querySelectorAll('.demo-option');
    const demoScreens = document.querySelectorAll('.demo-screen');
    
    if (!demoOptions.length || !demoScreens.length) return;
    
    // Switch between demo screens
    demoOptions.forEach(option => {
        option.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Update active option
            demoOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding screen
            demoScreens.forEach(screen => {
                screen.classList.remove('active');
                if (screen.getAttribute('data-id') === target) {
                    screen.classList.add('active');
                }
            });
        });
    });
    
    // Add interactivity to generate button
    const generateBtn = document.querySelector('.generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            
            // Simulate generation delay
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-bolt"></i> Generate';
                
                // Add animation to results
                const results = document.querySelectorAll('.result-card');
                results.forEach((result, index) => {
                    result.style.opacity = '0';
                    result.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        result.style.transition = 'all 0.5s ease';
                        result.style.opacity = '1';
                        result.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }, 1500);
        });
    }
    
    // Add interactivity to collaboration canvas
    const canvas = document.querySelector('.collaboration-canvas');
    if (canvas) {
        canvas.addEventListener('click', function(e) {
            if (e.target === this || e.target.tagName === 'P') {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Create a comment marker
                const marker = document.createElement('div');
                marker.style.position = 'absolute';
                marker.style.left = `${x}px`;
                marker.style.top = `${y}px`;
                marker.style.width = '24px';
                marker.style.height = '24px';
                marker.style.borderRadius = '50%';
                marker.style.backgroundColor = '#6366f1';
                marker.style.transform = 'translate(-50%, -50%)';
                marker.style.display = 'flex';
                marker.style.alignItems = 'center';
                marker.style.justifyContent = 'center';
                marker.style.color = 'white';
                marker.style.fontSize = '0.75rem';
                marker.style.fontWeight = 'bold';
                marker.style.cursor = 'pointer';
                marker.style.zIndex = '10';
                marker.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                marker.textContent = '+';
                
                this.style.position = 'relative';
                this.appendChild(marker);
                
                // Add animation
                marker.animate([
                    { transform: 'translate(-50%, -50%) scale(0)' },
                    { transform: 'translate(-50%, -50%) scale(1.2)' },
                    { transform: 'translate(-50%, -50%) scale(1)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            }
        });
    }
    
    // Add interactivity to analytics chart
    const chartBars = document.querySelectorAll('.bar-fill');
    if (chartBars.length) {
        chartBars.forEach(bar => {
            // Animate bar on load
            const height = bar.style.height;
            bar.style.height = '0';
            
            setTimeout(() => {
                bar.style.transition = 'height 1s ease';
                bar.style.height = height;
            }, 500);
        });
    }
}

/**
 * Light effect interaction
 */
function initLightEffect() {
    const hero = document.querySelector('.hero');
    const lightBeam = document.querySelector('.light-beam');
    const lightGlow = document.querySelector('.light-glow');
    
    if (!hero || !lightBeam || !lightGlow) return;
    
    hero.addEventListener('mousemove', (e) => {
        // Get mouse position relative to hero section
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        // Calculate position as percentage
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        // Move light beam slightly based on mouse position
        lightBeam.style.transform = `rotate(${25 + xPercent * 10}deg) translateX(${-10 + xPercent * 20}%)`;
        
        // Move light glow to follow mouse somewhat
        lightGlow.style.left = `${-10 + xPercent * 20}%`;
        lightGlow.style.top = `${10 + yPercent * 20}%`;
        
        // Adjust opacity based on mouse position
        lightGlow.style.opacity = 0.3 + (xPercent * 0.4);
    });
}

// UI Component Showcase Section
function initUIShowcase() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation delay
                const index = Array.from(document.querySelectorAll('.ui-card')).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all UI cards
    document.querySelectorAll('.ui-card').forEach(card => {
        observer.observe(card);
    });

    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    if (testimonialTrack) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-item');
        const slideCount = slides.length;

        function moveSlider() {
            currentSlide = (currentSlide + 1) % slideCount;
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Auto-slide every 5 seconds
        setInterval(moveSlider, 5000);

        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', () => {
            testimonialTrack.style.transition = 'none';
        });

        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialTrack.style.transition = 'transform 0.5s ease';
        });
    }

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            "Modern UI Components",
            "Smooth Animations",
            "Interactive Elements",
            "Responsive Design"
        ];
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingText.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }

        type();
    }

    // Ripple Effect
    const rippleEffect = document.querySelector('.ripple-effect');
    if (rippleEffect) {
        rippleEffect.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            rippleEffect.appendChild(ripple);
            
            // Add animation
            ripple.animate([
                { transform: 'scale(0.8)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
    
    // Pulse Icon Effect
    const pulseIcon = document.querySelector('.pulse-icon');
    if (pulseIcon) {
        pulseIcon.addEventListener('click', () => {
            // Create a heart particle burst
            for (let i = 0; i < 10; i++) {
                createHeartParticle(pulseIcon);
            }
        });
    }
    
    // Dynamic Button Effect
    const dynamicBtn = document.querySelector('.dynamic-btn');
    if (dynamicBtn) {
        dynamicBtn.addEventListener('mouseover', () => {
            const btnShine = dynamicBtn.querySelector('.btn-shine');
            btnShine.style.left = '-100%';
            setTimeout(() => {
                btnShine.style.left = '100%';
            }, 10);
        });
    }
    
    // Create animated GIF-like effects for containers
    initAnimatedContainers();
}

// Create heart particles
function createHeartParticle(parent) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.position = 'absolute';
    heart.style.color = 'white';
    heart.style.fontSize = '0.8rem';
    heart.style.pointerEvents = 'none';
    
    // Random position around the center
    const angle = Math.random() * Math.PI * 2;
    const distance = 5 + Math.random() * 20;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    heart.style.left = `calc(50% + ${x}px)`;
    heart.style.top = `calc(50% + ${y}px)`;
    heart.style.transform = 'translate(-50%, -50%)';
    
    parent.appendChild(heart);
    
    // Animate the heart
    heart.animate([
        { 
            transform: 'translate(-50%, -50%) scale(0.5)', 
            opacity: 1 
        },
        { 
            transform: `translate(-50%, calc(-50% - ${20 + Math.random() * 30}px)) scale(${0.5 + Math.random() * 0.5})`, 
            opacity: 0 
        }
    ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    
    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

// Initialize animated containers that simulate GIFs
function initAnimatedContainers() {
    const containers = document.querySelectorAll('.gif-container');
    
    containers.forEach(container => {
        const type = container.getAttribute('data-type');
        
        switch(type) {
            case 'button-demo':
                createButtonAnimation(container);
                break;
            case 'slider-demo':
                createSliderAnimation(container);
                break;
            case 'typing-demo':
                createTypingAnimation(container);
                break;
            case 'micro-demo':
                createMicroAnimation(container);
                break;
        }
    });
}

// Create button animation
function createButtonAnimation(container) {
    // Create animated elements
    const button = document.createElement('div');
    button.className = 'animated-button';
    button.innerHTML = '<span>Click Me</span>';
    button.style.position = 'relative';
    button.style.width = '120px';
    button.style.height = '40px';
    button.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)';
    button.style.borderRadius = '8px';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.color = 'white';
    button.style.fontWeight = '500';
    button.style.margin = '0 auto';
    button.style.cursor = 'pointer';
    
    container.appendChild(button);
    
    // Create animation
    let isAnimating = false;
    
    function animateButton() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Click effect
        button.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
        
        // Ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        
        button.appendChild(ripple);
        
        ripple.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.8 },
            { transform: 'translate(-50%, -50%) scale(5)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            ripple.remove();
            isAnimating = false;
        }, 600);
    }
    
    // Auto-animate every 3 seconds
    setInterval(animateButton, 3000);
}

// Create slider animation
function createSliderAnimation(container) {
    // Create animated elements
    const slider = document.createElement('div');
    slider.className = 'animated-slider';
    slider.style.position = 'relative';
    slider.style.width = '100%';
    slider.style.height = '40px';
    slider.style.background = 'rgba(17, 24, 39, 0.5)';
    slider.style.borderRadius = '8px';
    slider.style.overflow = 'hidden';
    
    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s ease';
    track.style.height = '100%';
    
    for (let i = 0; i < 3; i++) {
        const item = document.createElement('div');
        item.style.minWidth = '100%';
        item.style.height = '100%';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'center';
        item.style.color = 'white';
        item.textContent = `Slide ${i + 1}`;
        
        track.appendChild(item);
    }
    
    slider.appendChild(track);
    container.appendChild(slider);
    
    // Create animation
    let currentSlide = 0;
    
    function moveSlider() {
        currentSlide = (currentSlide + 1) % 3;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Auto-animate every 3 seconds
    setInterval(moveSlider, 3000);
}

// Create typing animation
function createTypingAnimation(container) {
    // Create animated elements
    const typingDemo = document.createElement('div');
    typingDemo.className = 'animated-typing';
    typingDemo.style.position = 'relative';
    typingDemo.style.width = '100%';
    typingDemo.style.height = '40px';
    typingDemo.style.background = 'rgba(17, 24, 39, 0.5)';
    typingDemo.style.borderRadius = '8px';
    typingDemo.style.display = 'flex';
    typingDemo.style.alignItems = 'center';
    typingDemo.style.justifyContent = 'center';
    typingDemo.style.color = 'white';
    typingDemo.style.fontWeight = '500';
    
    const text = document.createElement('span');
    text.style.position = 'relative';
    
    typingDemo.appendChild(text);
    container.appendChild(typingDemo);
    
    // Create animation
    const phrases = ['Hello World', 'Typing Effect', 'Animation'];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = phrases[currentPhrase];
        
        if (isDeleting) {
            text.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            text.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }
        
        // Blinking cursor
        if (text.nextElementSibling) {
            text.nextElementSibling.remove();
        }
        
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.marginLeft = '2px';
        cursor.style.animation = 'blink 0.8s infinite';
        typingDemo.appendChild(cursor);
        
        if (!isDeleting && currentChar === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 1500);
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(typeText, 500);
        } else {
            setTimeout(typeText, isDeleting ? 50 : 100);
        }
    }
    
    // Start typing animation
    typeText();
}

// Create micro-interactions animation
function createMicroAnimation(container) {
    // Create animated elements
    const microDemo = document.createElement('div');
    microDemo.className = 'animated-micro';
    microDemo.style.position = 'relative';
    microDemo.style.width = '100%';
    microDemo.style.height = '40px';
    microDemo.style.background = 'rgba(17, 24, 39, 0.5)';
    microDemo.style.borderRadius = '8px';
    microDemo.style.display = 'flex';
    microDemo.style.alignItems = 'center';
    microDemo.style.justifyContent = 'space-around';
    
    // Create toggle button
    const toggle = document.createElement('div');
    toggle.style.width = '40px';
    toggle.style.height = '20px';
    toggle.style.background = 'rgba(255, 255, 255, 0.2)';
    toggle.style.borderRadius = '10px';
    toggle.style.position = 'relative';
    toggle.style.cursor = 'pointer';
    
    const toggleHandle = document.createElement('div');
    toggleHandle.style.width = '16px';
    toggleHandle.style.height = '16px';
    toggleHandle.style.background = 'white';
    toggleHandle.style.borderRadius = '50%';
    toggleHandle.style.position = 'absolute';
    toggleHandle.style.top = '2px';
    toggleHandle.style.left = '2px';
    toggleHandle.style.transition = 'left 0.3s ease, background 0.3s ease';
    
    toggle.appendChild(toggleHandle);
    microDemo.appendChild(toggle);
    
    // Create like button
    const likeBtn = document.createElement('div');
    likeBtn.style.width = '30px';
    likeBtn.style.height = '30px';
    likeBtn.style.borderRadius = '50%';
    likeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    likeBtn.style.display = 'flex';
    likeBtn.style.alignItems = 'center';
    likeBtn.style.justifyContent = 'center';
    likeBtn.style.cursor = 'pointer';
    likeBtn.innerHTML = '<i class="fas fa-heart" style="color: white;"></i>';
    
    microDemo.appendChild(likeBtn);
    container.appendChild(microDemo);
    
    // Create animations
    let isToggled = false;
    let isLiked = false;
    
    function animateToggle() {
        isToggled = !isToggled;
        
        if (isToggled) {
            toggleHandle.style.left = '22px';
            toggleHandle.style.background = '#6366f1';
            toggle.style.background = 'rgba(99, 102, 241, 0.3)';
        } else {
            toggleHandle.style.left = '2px';
            toggleHandle.style.background = 'white';
            toggle.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    }
    
    function animateLike() {
        isLiked = !isLiked;
        
        if (isLiked) {
            likeBtn.querySelector('i').style.color = '#ef4444';
            likeBtn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.3)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
        } else {
            likeBtn.querySelector('i').style.color = 'white';
        }
    }
    
    // Auto-animate every 3 seconds
    setInterval(animateToggle, 3000);
    setInterval(animateLike, 4000);
}

/**
 * Projects section functionality
 */
function initProjectsSection() {
    const previewBtns = document.querySelectorAll('.preview-btn');
    const modal = document.getElementById('projectPreviewModal');
    const closeModal = document.querySelector('.close-modal');
    const previewTitle = document.querySelector('.modal-header .preview-title');
    const previewDescription = document.querySelector('.preview-description');
    const previewCategory = document.querySelector('.preview-category');
    const previewRating = document.querySelector('.rating-value');
    const visitSiteBtn = document.querySelector('.visit-site-btn');
    const previewTabBtns = document.querySelectorAll('.preview-tab-btn');
    const previewTabPanes = document.querySelectorAll('.preview-tab-pane');
    const shareProjectBtn = document.querySelector('.share-project-btn');
    const categoryBtns = document.querySelectorAll('.tab-btn[data-category]');
    const projectCards = document.querySelectorAll('.project-card');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const seeMoreBtn = document.getElementById('see-more-btn');
    const searchInput = document.querySelector('.search-input input');
    
    if (!modal) return;
    
    // Initially hide projects with hidden-project class
    hiddenProjects.forEach(project => {
        project.style.display = 'none';
    });
    
    // Ensure the "All Projects" category is initially active
    categoryBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Show all non-hidden projects initially
    projectCards.forEach(card => {
        if (!card.classList.contains('hidden-project')) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
    
    // See More button functionality
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            // Get the currently active category
            const activeCategory = document.querySelector('.tab-btn.active').getAttribute('data-category').toLowerCase();
            
            // Get currently hidden projects that match the active category or all if "all" is selected
            let currentlyHidden;
            if (activeCategory === 'all') {
                currentlyHidden = document.querySelectorAll('.hidden-project[style*="display: none"]');
            } else {
                currentlyHidden = document.querySelectorAll(`.hidden-project[data-category="${activeCategory}"][style*="display: none"]`);
            }
            
            if (currentlyHidden.length > 0) {
                currentlyHidden.forEach(card => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                this.innerHTML = '<i class="fas fa-minus-circle"></i> Show Less';
            } else {
                // If showing all, hide the hidden projects again
                const visibleHiddenProjects = document.querySelectorAll('.hidden-project[style*="display: block"]');
                visibleHiddenProjects.forEach(project => {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                });
                
                this.innerHTML = '<i class="fas fa-plus-circle"></i> See More Projects';
            }
        });
    }
    
    // Filter projects by category
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category').toLowerCase();
            
            // Reset the see more button
            if (seeMoreBtn) {
                seeMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> See More Projects';
            }
            
            // Show all projects or filter by category
            projectCards.forEach(card => {
                const isHidden = card.classList.contains('hidden-project');
                const cardCategory = card.getAttribute('data-category').toLowerCase();
                
                if (category === 'all') {
                    if (!isHidden) {
                        card.style.display = 'block';
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                } else if (cardCategory === category) {
                    card.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Reset the see more button
            if (seeMoreBtn) {
                seeMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> See More Projects';
            }
            
            // Reset category buttons
            categoryBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('.project-category').textContent.toLowerCase();
                const isHidden = card.classList.contains('hidden-project');
                
                if ((title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) && !isHidden) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // Function to open preview modal with project details
    function openPreviewModal(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const imageUrl = card.querySelector('.preview-image img').src;
        const projectUrl = card.querySelector('.btn-primary').getAttribute('href');
        const category = card.querySelector('.project-category').textContent;
        const rating = card.querySelector('.project-rating').textContent.trim();
        
        // Update modal content
        previewTitle.textContent = title;
        previewDescription.textContent = description;
        previewCategory.textContent = category;
        previewRating.textContent = rating.replace(/[^\d.]/g, ''); // Extract just the number
        
        // Update preview image in desktop frame
        document.querySelector('.device-screen img').src = imageUrl;
        document.querySelector('.device-screen img').alt = title;
        
        // Set URL in the URL bar
        const urlBar = document.querySelector('.url-bar');
        if (urlBar) {
            // Create a URL display element if it doesn't exist
            if (!urlBar.querySelector('.url-display')) {
                const urlDisplay = document.createElement('div');
                urlDisplay.className = 'url-display';
                urlDisplay.style.position = 'absolute';
                urlDisplay.style.left = '80px';
                urlDisplay.style.top = '50%';
                urlDisplay.style.transform = 'translateY(-50%)';
                urlDisplay.style.color = '#aaa';
                urlDisplay.style.fontSize = '12px';
                urlDisplay.style.fontFamily = 'monospace';
                urlDisplay.style.whiteSpace = 'nowrap';
                urlDisplay.style.overflow = 'hidden';
                urlDisplay.style.textOverflow = 'ellipsis';
                urlDisplay.style.maxWidth = '60%';
                urlBar.appendChild(urlDisplay);
            }
            
            // Update the URL text
            const urlDisplay = urlBar.querySelector('.url-display');
            urlDisplay.textContent = projectUrl || 'https://example.com/' + title.toLowerCase().replace(/\s+/g, '-');
        }
        
        // Update visit site button
        if (visitSiteBtn && projectUrl) {
            visitSiteBtn.href = projectUrl;
        }
        
        // Setup view website button
        const viewWebsiteBtn = document.querySelector('.view-website-btn');
        if (viewWebsiteBtn && projectUrl) {
            // Remove any existing event listeners by cloning and replacing the button
            const newViewBtn = viewWebsiteBtn.cloneNode(true);
            viewWebsiteBtn.parentNode.replaceChild(newViewBtn, viewWebsiteBtn);
            
            newViewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const deviceScreen = document.querySelector('.device-screen');
                const previewImg = deviceScreen.querySelector('img');
                const previewAnimation = deviceScreen.querySelector('.preview-animation');
                
                // Create iframe to replace the image
                const iframe = document.createElement('iframe');
                iframe.src = projectUrl;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.zIndex = '5';
                
                // Hide the image, animation and view button
                previewImg.style.display = 'none';
                newViewBtn.style.display = 'none';
                if (previewAnimation) previewAnimation.style.display = 'none';
                
                // Add iframe to the device screen
                deviceScreen.appendChild(iframe);
                
                // Add a back button
                const backBtn = document.createElement('button');
                backBtn.className = 'back-to-preview-btn';
                backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Preview';
                deviceScreen.appendChild(backBtn);
                
                // Back button functionality
                backBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    iframe.remove();
                    backBtn.remove();
                    previewImg.style.display = 'block';
                    newViewBtn.style.display = 'flex';
                    if (previewAnimation) previewAnimation.style.display = 'block';
                });
            });
        }
        
        // Reset to first tab
        previewTabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
        previewTabPanes.forEach(tabPane => tabPane.classList.remove('active'));
        previewTabBtns[0].classList.add('active');
        previewTabPanes[0].classList.add('active');
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add entrance animation for device preview
        setTimeout(() => {
            document.querySelector('.device-preview.active').classList.add('animated');
        }, 300);
    }
    
    // Open modal when preview button is clicked (both in card actions and overlay)
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            openPreviewModal(card);
        });
    });
    
    // Handle eye icon click in preview overlay
    const eyeIcons = document.querySelectorAll('.preview-actions .preview-btn');
    eyeIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            openPreviewModal(card);
        });
    });
    
    // Tab functionality in preview modal
    previewTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabTarget = this.getAttribute('data-tab');
            
            // Update active tab button
            previewTabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            previewTabPanes.forEach(tabPane => {
                tabPane.classList.remove('active');
                if (tabPane.getAttribute('data-tab') === tabTarget) {
                    tabPane.classList.add('active');
                }
            });
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset device preview
            document.querySelector('.device-preview').classList.remove('animated');
            
            // Remove iframe and back button if they exist
            const iframe = document.querySelector('.device-screen iframe');
            const backBtn = document.querySelector('.back-to-preview-btn');
            if (iframe) iframe.remove();
            if (backBtn) backBtn.remove();
            
            // Restore image and view button
            const previewImg = document.querySelector('.device-screen img');
            const viewBtn = document.querySelector('.view-website-btn');
            if (previewImg) previewImg.style.display = 'block';
            if (viewBtn) viewBtn.style.display = 'flex';
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset device preview
            document.querySelector('.device-preview').classList.remove('animated');
            
            // Remove iframe and back button if they exist
            const iframe = document.querySelector('.device-screen iframe');
            const backBtn = document.querySelector('.back-to-preview-btn');
            if (iframe) iframe.remove();
            if (backBtn) backBtn.remove();
            
            // Restore image and view button
            const previewImg = document.querySelector('.device-screen img');
            const viewBtn = document.querySelector('.view-website-btn');
            if (previewImg) previewImg.style.display = 'block';
            if (viewBtn) viewBtn.style.display = 'flex';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Reset device preview
            document.querySelector('.device-preview').classList.remove('animated');
            
            // Remove iframe and back button if they exist
            const iframe = document.querySelector('.device-screen iframe');
            const backBtn = document.querySelector('.back-to-preview-btn');
            if (iframe) iframe.remove();
            if (backBtn) backBtn.remove();
            
            // Restore image and view button
            const previewImg = document.querySelector('.device-screen img');
            const viewBtn = document.querySelector('.view-website-btn');
            if (previewImg) previewImg.style.display = 'block';
            if (viewBtn) viewBtn.style.display = 'flex';
        }
    });
    
    // Share project functionality
    if (shareProjectBtn) {
        shareProjectBtn.addEventListener('click', function() {
            const projectTitle = previewTitle.textContent;
            const projectUrl = visitSiteBtn.getAttribute('href');
            
            if (navigator.share && projectUrl) {
                navigator.share({
                    title: projectTitle,
                    text: `Check out this project: ${projectTitle}`,
                    url: projectUrl
                }).catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = projectUrl;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show copied notification
                const notification = document.createElement('div');
                notification.classList.add('copy-notification');
                notification.textContent = 'Link copied to clipboard!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }
        });
    }
    
    // Handle like button
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
                icon.style.color = '#ef4444';
                
                // Add heart animation
                const heart = document.createElement('div');
                heart.classList.add('heart-animation');
                this.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 1000);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                icon.style.color = '';
            }
        });
    });
    
    // Handle share button
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.project-card');
            const title = card.querySelector('h3').textContent;
            const projectUrl = card.querySelector('.btn-primary').getAttribute('href');
            
            if (navigator.share && projectUrl) {
                navigator.share({
                    title: title,
                    text: `Check out this project: ${title}`,
                    url: projectUrl
                }).catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = projectUrl;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show copied notification
                const notification = document.createElement('div');
                notification.classList.add('copy-notification');
                notification.textContent = 'Link copied to clipboard!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }
        });
    });
    
    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.preview-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.preview-image img');
            if (image) {
                image.style.transform = '';
            }
        });
    });
    
    // Add initial animation to project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100)); // Staggered animation
    });
}

/**
 * AI Benefits Section Functionality
 */
function initAIBenefits() {
    // Optimization Demo
    const optimizeBtn = document.querySelector('.optimize-btn');
    const progressBar = document.querySelector('.progress-bar');
    const originalGraph = document.querySelector('.optimization-item.original .preview-graph');
    const optimizedGraph = document.querySelector('.optimization-item.optimized .preview-graph');
    
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', function() {
            // Start optimization animation
            optimizeBtn.disabled = true;
            optimizeBtn.textContent = 'Optimizing...';
            
            // Animate progress bar
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 5;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    optimizeBtn.textContent = 'Optimized!';
                    
                    // Show optimization result
                    originalGraph.style.opacity = '0.5';
                    optimizedGraph.style.transform = 'scale(1.05)';
                    optimizedGraph.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.4)';
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        optimizeBtn.disabled = false;
                        optimizeBtn.textContent = 'Optimize Again';
                        progressBar.style.width = '0';
                        originalGraph.style.opacity = '1';
                        optimizedGraph.style.transform = 'scale(1)';
                        optimizedGraph.style.boxShadow = 'none';
                    }, 3000);
                }
            }, 50);
        });
    }
    
    // Streaming Demo
    const streamBtn = document.querySelector('.stream-btn');
    const streamingBlocks = document.querySelectorAll('.streaming-block');
    
    if (streamBtn && streamingBlocks.length) {
        streamBtn.addEventListener('click', function() {
            streamBtn.disabled = true;
            streamBtn.textContent = 'Streaming...';
            
            // Reset blocks
            streamingBlocks.forEach(block => {
                block.style.width = '0';
                block.style.opacity = '0';
            });
            
            // Animate blocks one by one
            setTimeout(() => {
                streamingBlocks[0].style.transition = 'all 0.5s ease';
                streamingBlocks[0].style.width = '100%';
                streamingBlocks[0].style.opacity = '1';
                
                setTimeout(() => {
                    streamingBlocks[1].style.transition = 'all 0.5s ease';
                    streamingBlocks[1].style.width = '80%';
                    streamingBlocks[1].style.opacity = '1';
                    
                    setTimeout(() => {
                        streamingBlocks[2].style.transition = 'all 0.5s ease';
                        streamingBlocks[2].style.width = '60%';
                        streamingBlocks[2].style.opacity = '1';
                        
                        // Reset button
                        setTimeout(() => {
                            streamBtn.disabled = false;
                            streamBtn.textContent = 'Stream Content';
                        }, 1000);
                    }, 500);
                }, 500);
            }, 500);
        });
    }
    
    // Components Network Demo
    const addComponentBtn = document.querySelector('.add-component-btn');
    const networkNodes = document.querySelectorAll('.network-node:not(.main-node)');
    
    if (addComponentBtn && networkNodes.length) {
        let activeNodes = 0;
        
        addComponentBtn.addEventListener('click', function() {
            if (activeNodes < networkNodes.length) {
                // Activate next node
                const node = networkNodes[activeNodes];
                node.style.transform = 'scale(1.2)';
                node.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(14, 165, 233, 0.7))';
                node.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.3)';
                
                // Create connection line (could be enhanced with SVG for better visuals)
                const mainNode = document.querySelector('.network-node.main-node');
                
                // Pulse animation on main node
                mainNode.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    mainNode.style.transform = 'scale(1)';
                }, 300);
                
                activeNodes++;
                
                if (activeNodes === networkNodes.length) {
                    addComponentBtn.textContent = 'Reset Components';
                }
            } else {
                // Reset all nodes
                networkNodes.forEach(node => {
                    node.style.transform = 'scale(1)';
                    node.style.background = 'rgba(255, 255, 255, 0.1)';
                    node.style.boxShadow = 'none';
                });
                
                activeNodes = 0;
                addComponentBtn.textContent = 'Add Component';
            }
        });
    }
    
    // Data Fetching Demo
    const fetchDataBtn = document.querySelector('.fetch-data-btn');
    const dataLoader = document.querySelector('.data-loader');
    const dataResult = document.querySelector('.data-result');
    
    if (fetchDataBtn && dataLoader && dataResult) {
        fetchDataBtn.addEventListener('click', function() {
            fetchDataBtn.disabled = true;
            fetchDataBtn.textContent = 'Fetching...';
            
            // Show loader
            dataLoader.style.display = 'block';
            dataLoader.style.animation = 'spin 1s linear infinite';
            dataResult.style.display = 'none';
            
            // Simulate data fetching
            setTimeout(() => {
                // Hide loader and show result
                dataLoader.style.display = 'none';
                dataResult.style.display = 'block';
                dataResult.textContent = '{ "success": true, "data": { "id": 1, "name": "AI Component" } }';
                
                // Reset button
                fetchDataBtn.disabled = false;
                fetchDataBtn.textContent = 'Fetch Again';
            }, 2000);
        });
    }
    
    // CSS Support Demo
    const styleOptions = document.querySelectorAll('.style-option');
    const elementBox = document.querySelector('.element-box');
    const elementText = document.querySelector('.element-text');
    
    if (styleOptions.length && elementBox && elementText) {
        styleOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                styleOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Apply style based on selected option
                const style = this.getAttribute('data-style');
                
                switch (style) {
                    case 'default':
                        elementBox.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                        elementBox.style.borderRadius = 'var(--border-radius-sm)';
                        elementBox.style.width = '80px';
                        elementBox.style.height = '50px';
                        elementText.style.color = 'var(--gray-300)';
                        break;
                    case 'tailwind':
                        elementBox.style.background = '#0ea5e9';
                        elementBox.style.borderRadius = '0.375rem';
                        elementBox.style.width = '90px';
                        elementBox.style.height = '45px';
                        elementText.style.color = '#f1f5f9';
                        break;
                    case 'modules':
                        elementBox.style.background = '#4f46e5';
                        elementBox.style.borderRadius = '0.5rem';
                        elementBox.style.width = '75px';
                        elementBox.style.height = '55px';
                        elementText.style.color = '#e2e8f0';
                        break;
                }
            });
        });
    }
    
    // Rendering Demo
    const renderingOptions = document.querySelectorAll('.rendering-option');
    const renderingPath = document.querySelector('.rendering-path');
    const resultPage = document.querySelector('.result-page');
    const serverIcon = document.querySelector('.server-icon');
    const clientIcon = document.querySelector('.client-icon');
    
    if (renderingOptions.length && renderingPath && resultPage) {
        renderingOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                renderingOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Apply rendering animation based on selected option
                const renderType = this.getAttribute('data-render');
                
                // Reset animations
                renderingPath.style.transition = 'none';
                resultPage.style.transition = 'none';
                serverIcon.style.transition = 'none';
                clientIcon.style.transition = 'none';
                
                renderingPath.style.width = '0';
                resultPage.style.opacity = '0';
                serverIcon.style.boxShadow = 'none';
                clientIcon.style.boxShadow = 'none';
                
                setTimeout(() => {
                    renderingPath.style.transition = 'width 1s ease';
                    resultPage.style.transition = 'all 0.5s ease';
                    serverIcon.style.transition = 'all 0.5s ease';
                    clientIcon.style.transition = 'all 0.5s ease';
                    
                    switch (renderType) {
                        case 'server':
                            // Server-side rendering animation
                            serverIcon.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.5)';
                            renderingPath.style.width = '50%';
                            
                            setTimeout(() => {
                                resultPage.style.opacity = '1';
                                resultPage.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                            }, 1000);
                            break;
                        case 'client':
                            // Client-side rendering animation
                            clientIcon.style.boxShadow = '0 0 15px rgba(14, 165, 233, 0.5)';
                            renderingPath.style.width = '50%';
                            
                            setTimeout(() => {
                                resultPage.style.opacity = '1';
                                resultPage.style.background = 'linear-gradient(135deg, var(--secondary), var(--primary))';
                            }, 1000);
                            break;
                        case 'static':
                            // Static generation animation
                            serverIcon.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                            renderingPath.style.width = '50%';
                            
                            setTimeout(() => {
                                resultPage.style.opacity = '1';
                                resultPage.style.background = 'linear-gradient(135deg, var(--success), var(--primary))';
                            }, 1000);
                            break;
                    }
                }, 50);
            });
        });
    }
    
    // Chatbot Demo
    const chatInput = document.querySelector('.chat-input-field');
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    
    // Sample responses for the chatbot
    const botResponses = {
        'how does ai improve my business': 'AI can improve your business by automating repetitive tasks, providing data-driven insights, enhancing customer experiences through personalization, optimizing operations, and enabling predictive analytics for better decision-making.',
        'what is saas development': 'SaaS (Software as a Service) development involves creating cloud-based applications that users can access via the internet, typically through a subscription model. It eliminates the need for complex installations and allows for centralized updates and maintenance.',
        'tell me about your pricing': 'We offer flexible pricing plans starting from $49/month for our Basic plan, $99/month for Professional, and $199/month for Enterprise. All plans include core features with varying levels of support, API access, and customization options.',
        'default': 'Thank you for your question! Our team is constantly working to improve our AI capabilities. Could you please provide more details about what you\'re looking for?'
    };
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // If user message, generate response after a delay
        if (isUser) {
            setTimeout(() => {
                // Get normalized query for matching
                const normalizedQuery = text.toLowerCase().trim();
                let response = botResponses.default;
                
                // Check for matches in our responses
                Object.keys(botResponses).forEach(key => {
                    if (normalizedQuery.includes(key)) {
                        response = botResponses[key];
                    }
                });
                
                addMessage(response);
            }, 1000);
        }
    }
    
    if (chatInput && chatSendBtn && chatMessages) {
        // Send message when clicking send button
        chatSendBtn.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
            }
        });
        
        // Send message when pressing Enter
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    chatInput.value = '';
                }
            }
        });
    }
    
    // Handle suggestion buttons
    if (suggestionBtns.length) {
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const suggestion = this.textContent;
                addMessage(suggestion, true);
            });
        });
    }
    
    // Add animation to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    if (benefitCards.length) {
        // Add intersection observer to animate cards when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        benefitCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
    
    // Add keyframe animation for spinning loader
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}

/**
 * Initialize floating buttons functionality
 */
function initFloatingButtons() {
    // Help button functionality
    const helpButton = document.querySelector('.floating-help-button');
    if (helpButton) {
        helpButton.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Add a visual feedback
            helpButton.classList.add('active');
            setTimeout(() => {
                helpButton.classList.remove('active');
            }, 500);
        });
    }
    
    // WhatsApp button functionality
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            // Add a visual feedback
            whatsappButton.classList.add('active');
            setTimeout(() => {
                whatsappButton.classList.remove('active');
            }, 300);
            
            // Open WhatsApp with the specified number
            const phoneNumber = '918307312360';
            window.open(`https://wa.me/${phoneNumber}`, '_blank');
        });
    }
}

/**
 * Initialize AI Features section with interactive elements
 */
function initAIFeaturesSection() {
    const featureCards = document.querySelectorAll('.ai-feature-card');
    
    if (featureCards.length === 0) return;
    
    // Add hover effects and animations to feature cards
    featureCards.forEach(card => {
        // Add entrance animation when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.classList.add('animate-in');
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
        
        // Add interactive hover effects
        card.addEventListener('mouseenter', function() {
            // Add a subtle scale effect to the icon
            const icon = card.querySelector('.ai-feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
            
            // Add a subtle glow effect to the card
            card.style.boxShadow = '0 15px 30px rgba(var(--primary-rgb), 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon scale
            const icon = card.querySelector('.ai-feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
            
            // Reset card shadow
            card.style.boxShadow = '';
        });
    });
    
    // Initialize specific animations for each feature card content
    initOptimizationMeter();
    initCodeAnimation();
    initComponentBlocks();
    initDataFlow();
    initColorPalette();
    initServerClientAnimation();
}

/**
 * Initialize optimization meter animation
 */
function initOptimizationMeter() {
    const meters = document.querySelectorAll('.optimization-meter');
    
    meters.forEach(meter => {
        const meterFill = meter.querySelector('.meter-fill');
        
        // Reset animation when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (meterFill) {
                        meterFill.style.animation = 'none';
                        setTimeout(() => {
                            meterFill.style.animation = 'fillMeter 2s ease-in-out forwards';
                        }, 100);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(meter);
    });
}

/**
 * Initialize code animation
 */
function initCodeAnimation() {
    // Animation is CSS-based, no additional JS needed
}

/**
 * Initialize component blocks animation
 */
function initComponentBlocks() {
    const blockContainers = document.querySelectorAll('.component-blocks');
    
    blockContainers.forEach(container => {
        const blocks = container.querySelectorAll('.component-block');
        
        blocks.forEach((block, index) => {
            // Add random initial background color
            const hue = Math.floor(Math.random() * 360);
            block.style.background = `hsla(${hue}, 70%, 60%, 0.1)`;
            
            // Add random delay to animation
            block.style.animationDelay = `${index * 0.2}s`;
        });
    });
}

/**
 * Initialize data flow animation
 */
function initDataFlow() {
    const dataFlows = document.querySelectorAll('.data-flow');
    
    dataFlows.forEach(flow => {
        const dataPoints = flow.querySelectorAll('.data-point');
        
        dataPoints.forEach((point, index) => {
            // Add random initial size
            const size = 15 + Math.floor(Math.random() * 10);
            point.style.width = `${size}px`;
            point.style.height = `${size}px`;
            
            // Add random delay to animation
            point.style.animationDelay = `${index * 0.3}s`;
        });
    });
}

/**
 * Initialize color palette animation
 */
function initColorPalette() {
    const palettes = document.querySelectorAll('.color-palette');
    
    palettes.forEach(palette => {
        const swatches = palette.querySelectorAll('.color-swatch');
        
        swatches.forEach((swatch, index) => {
            // Add random rotation on hover
            swatch.addEventListener('mouseenter', function() {
                const rotation = -15 + Math.floor(Math.random() * 30);
                swatch.style.transform = `rotate(${rotation}deg) scale(1.1)`;
            });
            
            swatch.addEventListener('mouseleave', function() {
                swatch.style.transform = '';
            });
        });
    });
}

/**
 * Initialize server-client animation
 */
function initServerClientAnimation() {
    const connections = document.querySelectorAll('.server-client');
    
    connections.forEach(connection => {
        const line = connection.querySelector('.connection-line');
        
        // Add pulsing effect to the line
        if (line) {
            setInterval(() => {
                line.classList.add('pulse');
                setTimeout(() => {
                    line.classList.remove('pulse');
                }, 1000);
            }, 3000);
        }
    });
}

/**
 * Initialize Experience Features section
 */
function initExperienceFeaturesSection() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    if (experienceCards.length === 0) return;
    
    // Add entrance animations when scrolled into view
    experienceCards.forEach((card, index) => {
        // Add staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        card.style.transition = 'all 0.8s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                    
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect to the card
            card.style.boxShadow = '0 15px 30px rgba(var(--primary-rgb), 0.2)';
            
            // Add a subtle scale effect to the icon
            const icon = card.querySelector('.experience-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset card shadow
            card.style.boxShadow = '';
            
            // Reset icon scale
            const icon = card.querySelector('.experience-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/**
 * Initialize Softricity AI Chatbot
 */
function initSoftricityAIChatbot() {
    const chatInput = document.getElementById('chat-input-field');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    const minimizeButton = document.querySelector('.minimize-chat');
    const expandButton = document.querySelector('.expand-chat');
    
    if (!chatInput || !sendButton || !chatMessages) return;
    
    // Sample responses for the chatbot
    const botResponses = {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hi there! How can I assist you with your business needs?',
        'how are you': 'I\'m functioning perfectly! How can I help you today?',
        'what is softricity ai': 'Softricity AI is an advanced artificial intelligence platform designed to help businesses scale and optimize their operations through intelligent automation and data-driven insights.',
        'how can ai help my business': 'AI can help your business in numerous ways including automating repetitive tasks, analyzing large datasets to uncover insights, improving customer experiences through personalization, optimizing operations, and enabling predictive decision-making.',
        'what services do you offer': 'We offer a range of AI-powered services including business process automation, intelligent data analytics, customer experience optimization, predictive maintenance, and custom AI solutions tailored to your specific business needs.',
        'tell me about your pricing': 'Our pricing is customized based on your specific business requirements. We offer flexible plans starting from basic implementations to enterprise-level solutions. Would you like to schedule a call to discuss a personalized quote?',
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Is there anything else I can help you with?',
        'bye': 'Thank you for chatting with Softricity AI. Feel free to return anytime you need assistance!'
    };
    
    // Default response for unknown queries
    const defaultResponse = "I don't have specific information about that yet, but our team would be happy to discuss this with you in detail. Would you like to schedule a call with one of our AI specialists?";
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message ai-message';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = isUser ? 'fas fa-user' : 'fas fa-robot';
        avatarDiv.appendChild(icon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        contentDiv.appendChild(paragraph);
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = 'Just now';
        contentDiv.appendChild(timeSpan);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        // Remove suggestion buttons when a new message is added
        const existingSuggestions = chatMessages.querySelector('.chat-suggestions');
        if (existingSuggestions) {
            chatMessages.removeChild(existingSuggestions);
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageDiv;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-message';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-robot';
        avatarDiv.appendChild(icon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingIndicator.appendChild(dot);
        }
        
        contentDiv.appendChild(typingIndicator);
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return typingDiv;
    }
    
    // Function to process user input and get bot response
    function processUserInput(userText) {
        const userTextLower = userText.toLowerCase().trim();
        
        // Check if there's a direct match in our responses
        for (const key in botResponses) {
            if (userTextLower.includes(key)) {
                return botResponses[key];
            }
        }
        
        // Check for keywords and provide relevant responses
        if (userTextLower.includes('cost') || userTextLower.includes('price')) {
            return botResponses['tell me about your pricing'];
        } else if (userTextLower.includes('service') || userTextLower.includes('offer')) {
            return botResponses['what services do you offer'];
        } else if (userTextLower.includes('ai') && userTextLower.includes('help')) {
            return botResponses['how can ai help my business'];
        } else if (userTextLower.includes('softricity')) {
            return botResponses['what is softricity ai'];
        }
        
        // Default response if no matches
        return defaultResponse;
    }
    
    // Function to handle sending a message
    function sendMessage() {
        const userText = chatInput.value.trim();
        if (userText === '') return;
        
        // Add user message
        addMessage(userText, true);
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        // Process after a short delay to simulate thinking
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Add bot response
            const botResponse = processUserInput(userText);
            addMessage(botResponse);
            
            // Add new suggestion buttons after bot response
            addSuggestionButtons();
        }, 1500);
    }
    
    // Function to add suggestion buttons
    function addSuggestionButtons() {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chat-suggestions';
        
        const suggestions = [
            'How can AI help my business?',
            'What services do you offer?',
            'Tell me about your pricing'
        ];
        
        suggestions.forEach(text => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = text;
            
            button.addEventListener('click', function() {
                addMessage(text, true);
                
                // Show typing indicator
                const typingIndicator = showTypingIndicator();
                
                // Process after a short delay
                setTimeout(() => {
                    // Remove typing indicator
                    chatMessages.removeChild(typingIndicator);
                    
                    // Add bot response
                    const botResponse = processUserInput(text);
                    addMessage(botResponse);
                    
                    // Add new suggestion buttons
                    addSuggestionButtons();
                }, 1500);
            });
            
            suggestionsDiv.appendChild(button);
        });
        
        chatMessages.appendChild(suggestionsDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Event listener for send button
    sendButton.addEventListener('click', sendMessage);
    
    // Event listener for Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Event listeners for suggestion buttons
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent;
            addMessage(text, true);
            
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            // Process after a short delay
            setTimeout(() => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Add bot response
                const botResponse = processUserInput(text);
                addMessage(botResponse);
                
                // Add new suggestion buttons
                addSuggestionButtons();
            }, 1500);
        });
    });
    
    // Minimize and expand chat functionality
    let chatMinimized = false;
    const chatContainer = document.querySelector('.chat-container');
    
    if (minimizeButton && expandButton && chatContainer) {
        minimizeButton.addEventListener('click', function() {
            if (!chatMinimized) {
                chatContainer.style.height = '60px';
                chatContainer.style.overflow = 'hidden';
                chatMinimized = true;
            }
        });
        
        expandButton.addEventListener('click', function() {
            if (chatMinimized) {
                chatContainer.style.height = '';
                chatContainer.style.overflow = '';
                chatMinimized = false;
            } else {
                // Toggle fullscreen mode
                if (chatContainer.style.maxWidth !== '100%') {
                    chatContainer.style.maxWidth = '100%';
                    chatContainer.style.height = '100vh';
                    chatContainer.style.margin = '0';
                    chatContainer.style.borderRadius = '0';
                    expandButton.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    chatContainer.style.maxWidth = '';
                    chatContainer.style.height = '';
                    chatContainer.style.margin = '';
                    chatContainer.style.borderRadius = '';
                    expandButton.innerHTML = '<i class="fas fa-expand"></i>';
                }
            }
        });
        
        // Click on chat header to expand if minimized
        const chatHeader = document.querySelector('.chat-header');
        if (chatHeader) {
            chatHeader.addEventListener('click', function(e) {
                if (chatMinimized && !e.target.closest('.chat-actions')) {
                    chatContainer.style.height = '';
                    chatContainer.style.overflow = '';
                    chatMinimized = false;
                }
            });
        }
    }
}
