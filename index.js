// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Service Detail Data
const servicesData = {
    'E-commerce Account Management': {
        category: 'Inventory, SEO, Order Processing',
        image: 'picture/E-commerce Account Management & ETSY.jpg',
        description: 'Complete management of your e-commerce operations across Amazon, eBay, and Shopify to maximize revenue and streamline logistics.',
        features: ['Inventory & stock management', 'Store SEO & optimization', 'Order fulfillment processing', 'Account health monitoring', 'PPC & marketing management', 'Performance analytics']
    },
    'Mobile App Development': {
        category: 'Native and cross-platform mobile applications',
        image: 'picture/Mobile App Development.png',
        description: 'End-to-end mobile development on iOS and Android with excellent user experiences and app store delivery.',
        features: ['React Native & Flutter', 'App Store and Play Store launch', 'Offline support', 'Push notifications', 'In-app analytics', 'Cross-device testing']
    },
    'Wordpress Development': {
        category: 'Custom themes, plugins, business sites',
        image: 'picture/Wordpress Development.jpg',
        description: 'Professional WordPress development from simple business websites to complex dynamic portals with custom functionality.',
        features: ['Custom theme development', 'Plugin integration & dev', 'Page builder expertise', 'Speed optimization', 'Security hardening', 'Responsive design']
    },
    'AI & Machine Learning': {
        category: 'AI models, data science, automation',
        image: 'picture/AI & Machine Learning.jpg',
        description: 'Machine learning solutions for predictive insights, computer vision, NLP, and intelligent automation.',
        features: ['Model training & tuning', 'MLOps pipelines', 'Data engineering', 'Predictive analytics', 'NLP chatbots', 'Image recognition']
    },
    'UI/UX Design': {
        category: 'User research, wireframing, visual design',
        image: 'picture/UIUX Design.png',
        description: 'User-centric design solutions that combine stunning visual aesthetics with intuitive functionality for digital products.',
        features: ['Wireframing & prototyping', 'User research & personas', 'Visual interface design', 'Interaction design', 'Design system creation', 'Usability testing']
    },
    'Website Modification': {
        category: 'Refactoring, feature updates, modernization',
        image: 'picture/Website Modification.png',
        description: 'Modernizing and updating existing websites with expert refactoring, new features, and performance enhancements.',
        features: ['UI/UX refactoring', 'Legacy code modernization', 'New feature integration', 'Performance tuning', 'Bug fixing & maintenance', 'Database optimization']
    }
};

// Case Study Project Data
const projectsData = {
    '1': {
        title: 'AI Analytics Dashboard',
        category: 'Enterprise Solution - Advanced',
        image: 'picture/AI Analytics Dashboard.webp',
        stats: [
            { icon: 'fas fa-users', label: '500+ Enterprise Clients', value: '' },
            { icon: 'fas fa-chart-line', label: '50M+ Data Points/Day', value: '' },
            { icon: 'fas fa-zap', label: '99.99% Uptime', value: '' }
        ],
        description: 'A cutting-edge analytics platform powered by machine learning that transforms raw business data into actionable insights. The dashboard provides real-time predictions using advanced neural networks and provides enterprise-grade security.',
        features: [
            'Machine Learning-powered predictive analytics',
            'Real-time data visualization with WebSocket streaming',
            'Custom AI model training per client',
            'Advanced data security & encryption',
            'Multi-tenant architecture',
            'Integration with 50+ data sources'
        ],
        tech: ['Python TensorFlow', 'React', 'PostgreSQL', 'Apache Kafka', 'AWS', 'Docker'],
        results: [
            { metric: 'Decision Time Reduced', value: '75%' },
            { metric: 'Revenue Growth', value: '150%' },
            { metric: 'Cost Savings', value: '$2.5M+' }
        ]
    },
    '2': {
        title: 'Blockchain Payment System',
        category: 'FinTech - Advanced',
        image: 'picture/Blockchain Payment System.png',
        stats: [
            { icon: 'fas fa-coins', label: '$5B+ Transactions', value: '' },
            { icon: 'fas fa-zap', label: '10,000 TPS', value: '' },
            { icon: 'fas fa-lock', label: 'Military Grade Security', value: '' }
        ],
        description: 'A revolutionary blockchain-based payment system enabling instant, low-cost international transactions with smart contract automation. Supports multiple cryptocurrencies and fiat integration.',
        features: [
            'Ethereum & Layer 2 integration',
            'Smart contract automation',
            'Real-time settlement (< 1 second)',
            'Multi-currency support (20+)',
            'KYC/AML compliance',
            'Liquidity pools management'
        ],
        tech: ['Solidity', 'Ethereum', 'Web3.js', 'Node.js', 'Smart Contracts', 'Redis'],
        results: [
            { metric: 'Transaction Volume', value: '$5B+' },
            { metric: 'Active Users', value: '250K+' },
            { metric: 'Fees Reduction', value: '85%' }
        ]
    },
    '3': {
        title: 'Smart City IoT Platform',
        category: 'IoT Solution - Advanced',
        image: 'picture/Smart City IoT Platform.webp',
        stats: [
            { icon: 'fas fa-city', label: '500K+ Connected Devices', value: '' },
            { icon: 'fas fa-network-wired', label: 'Real-time Processing', value: '' },
            { icon: 'fas fa-globe', label: '3 Cities Deployed', value: '' }
        ],
        description: 'An intelligent IoT ecosystem for urban management integrating thousands of sensors, managing traffic, energy, and environmental data. Enables smart city automation and optimization.',
        features: [
            'MQTT-based sensor network',
            'Edge computing for latency reduction',
            'Real-time traffic optimization',
            'Energy consumption monitoring',
            'Environmental sensing (air quality, noise)',
            'Intelligent street lighting control'
        ],
        tech: ['MQTT', 'Docker Kubernetes', 'InfluxDB', 'Edge Computing', 'Python', 'Go'],
        results: [
            { metric: 'Traffic Congestion Reduced', value: '40%' },
            { metric: 'Energy Savings', value: '25%' },
            { metric: 'Citizens Connected', value: '2M+' }
        ]
    },
    '4': {
        title: 'ML Recommendation Engine',
        category: 'AI/ML Platform - Advanced',
        image: 'picture/ML Recommendation Engine.webp',
        stats: [
            { icon: 'fas fa-robot', label: 'Deep Learning AI', value: '' },
            { icon: 'fas fa-percent', label: '94% Accuracy', value: '' },
            { icon: 'fas fa-users', label: '10M+ Daily Users', value: '' }
        ],
        description: 'A sophisticated machine learning recommendation system using collaborative filtering and deep neural networks. Serves personalized recommendations to millions of users across multiple platforms.',
        features: [
            'Collaborative filtering algorithms',
            'Deep neural network architecture',
            'Real-time personalization',
            'A/B testing framework',
            'Anomaly detection',
            'Continuous model retraining'
        ],
        tech: ['PyTorch', 'Spark MLlib', 'Elasticsearch', 'AWS SageMaker', 'Python', 'Scala'],
        results: [
            { metric: 'Click-Through Rate Increase', value: '45%' },
            { metric: 'User Engagement', value: '+200%' },
            { metric: 'Revenue per User', value: '+$15' }
        ]
    },
    '5': {
        title: 'Enterprise VR Training',
        category: 'EdTech - Advanced',
        image: 'picture/Enterprise VR Training.png',
        stats: [
            { icon: 'fas fa-vr-cardboard', label: 'Fully Immersive', value: '' },
            { icon: 'fas fa-graduation-cap', label: '50K+ Trained', value: '' },
            { icon: 'fas fa-chart-bar', label: '85% Skill Improvement', value: '' }
        ],
        description: 'An immersive VR training platform enabling hands-on learning experiences for enterprise employees. Features realistic simulations, real-time analytics, and certified training programs.',
        features: [
            'Realistic 3D simulations',
            'Hands-on skill training',
            'Real-time progress tracking',
            'Certification management',
            'Multi-user collaboration',
            'VR headset compatibility'
        ],
        tech: ['Unity 3D', 'WebGL', 'Three.js', 'Firebase', 'WebRTC', 'Node.js'],
        results: [
            { metric: 'Training Time Reduced', value: '60%' },
            { metric: 'Knowledge Retention', value: '85%' },
            { metric: 'Certification Rate', value: '92%' }
        ]
    },
    '6': {
        title: 'E-commerce Platform',
        category: 'Web Application',
        image: 'E-commerce.png',
        stats: [
            { icon: 'fas fa-users', label: '50K+ Users', value: '' },
            { icon: 'fas fa-chart-line', label: '200% Growth', value: '' },
            { icon: 'fas fa-box', label: '99.5% Uptime', value: '' }
        ],
        description: 'Scalable e-commerce solution with AI-powered recommendations and real-time inventory management.',
        features: [
            'AI product recommendations',
            'Real-time inventory sync',
            'Checkout optimization',
            'Multi-currency and local tax support',
            'High-availability architecture',
            'Seamless payment gateway integration'
        ],
        tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
        results: [
            { metric: 'Conversion Rate', value: '+30%' },
            { metric: 'Load Time', value: '< 1s' },
            { metric: 'Revenue Increase', value: '+120%' }
        ]
    },
    '7': {
        title: 'FitTrack Pro',
        category: 'Mobile Application',
        image: 'picture/Fit track pro.webp',
        stats: [
            { icon: 'fas fa-download', label: '100K+ Downloads', value: '' },
            { icon: 'fas fa-star', label: '4.8 Rating', value: '' },
            { icon: 'fas fa-running', label: '75% Active Daily', value: '' }
        ],
        description: 'AI-powered fitness tracking app with personalized workout plans and nutrition guidance.',
        features: [
            'Personalized AI workout plans',
            'Nutrition tracking and suggestions',
            'Live coaching sessions',
            'Wearable integration',
            'Goal-based progress reports',
            'Social community challenges'
        ],
        tech: ['React Native', 'Firebase', 'TensorFlow'],
        results: [
            { metric: 'User Retention', value: '80%' },
            { metric: 'Completed Programs', value: '40K+' },
            { metric: 'Monthly Active', value: '65K+' }
        ]
    },
    '8': {
        title: 'SecureBank Portal',
        category: 'Web Application',
        image: 'picture/SecureBank Portal.webp',
        stats: [
            { icon: 'fas fa-shield-alt', label: 'Bank-Level Security', value: '' },
            { icon: 'fas fa-lock', label: 'PCI Compliant', value: '' },
            { icon: 'fas fa-users-cog', label: 'Enterprise Access Controls', value: '' }
        ],
        description: 'Enterprise banking portal with advanced security features and seamless user experience.',
        features: [
            'Multi-factor authentication',
            'Encrypted transaction ledger',
            'Fraud detection system',
            'Real-time reporting dashboard',
            'User role management',
            'Cross-border transfer support'
        ],
        tech: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
        results: [
            { metric: 'Fraud Reduction', value: '92%' },
            { metric: 'Transaction Speed', value: '2x Faster' },
            { metric: 'User Satisfaction', value: '4.9/5' }
        ]
    },
    '9': {
        title: 'QuickEats',
        category: 'Mobile Application',
        image: 'picture/QuickEats.png',
        stats: [
            { icon: 'fas fa-store', label: '500+ Restaurants', value: '' },
            { icon: 'fas fa-clock', label: '30min Delivery', value: '' },
            { icon: 'fas fa-map-marker-alt', label: '30+ Cities', value: '' }
        ],
        description: 'On-demand food delivery platform with real-time tracking and smart routing.',
        features: [
            'Live driver tracking',
            'Smart order routing',
            'Dynamic pricing engine',
            'In-app promotions',
            'Advanced search & filter',
            'Customer ratings/feedback system'
        ],
        tech: ['Flutter', 'Python', 'PostgreSQL', 'Google Maps API'],
        results: [
            { metric: 'Delivery Speed', value: '30 min avg' },
            { metric: 'Monthly Orders', value: '1.2M+' },
            { metric: 'Customer Retention', value: '75%' }
        ]
    },
    '10': {
        title: 'HealthCare Plus',
        category: 'Web Application',
        image: 'picture/HealthCare Plus.png',
        stats: [
            { icon: 'fas fa-hospital', label: '100+ Hospitals', value: '' },
            { icon: 'fas fa-user-md', label: '10K+ Doctors', value: '' },
            { icon: 'fas fa-user-injured', label: '1M+ Patients', value: '' }
        ],
        description: 'Comprehensive healthcare management system with telemedicine capabilities.',
        features: [
            'Telemedicine video consultations',
            'Appointment scheduling',
            'Electronic Health Records',
            'Pharmacy inventory integration',
            'Healthcare analytics dashboard',
            'HIPAA-compliant security'
        ],
        tech: ['Vue.js', 'Java Spring', 'MySQL', 'Docker'],
        results: [
            { metric: 'Consultation Volume', value: '250K+' },
            { metric: 'Admin Efficiency', value: '70%' },
            { metric: 'Cost Savings', value: '$1.2M' }
        ]
    },
    '11': {
        title: 'EduLearn',
        category: 'Mobile Application',
        image: 'picture/EduLearn.webp',
        stats: [
            { icon: 'fas fa-graduation-cap', label: '25K+ Students', value: '' },
            { icon: 'fas fa-book', label: '500+ Courses', value: '' },
            { icon: 'fas fa-chalkboard-teacher', label: '4.9 Rating', value: '' }
        ],
        description: 'Interactive learning platform with video streaming and progress tracking.',
        features: [
            'Interactive video lessons',
            'Live classes with Q&A',
            'Progress analytics',
            'Certification exams',
            'Social learning communities',
            'Offline downloads'
        ],
        tech: ['React Native', 'Node.js', 'WebRTC', 'AWS S3'],
        results: [
            { metric: 'Course Completion', value: '78%' },
            { metric: 'Student Engagement', value: '5hrs/week' },
            { metric: 'NPS Score', value: '65' }
        ]
    }
};

// DOM Elements
const loader = document.getElementById('loader');
const header = document.querySelector('.header');
const navMenu = document.querySelector('.nav-menu');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialControls = document.querySelectorAll('.testimonial-control');
const testimonialIndicators = document.querySelectorAll('.indicator');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const statNumbers = document.querySelectorAll('.stat-number');
const caseStudyModal = document.getElementById('caseStudyModal');
const closeModalBtn = document.querySelector('.close-modal');
const caseStudyBtns = document.querySelectorAll('.case-study-btn');
const serviceDetailModal = document.getElementById('serviceDetailModal');
const scrollLinks = document.querySelectorAll('.scroll-link');
const closeServiceModalBtn = document.querySelector('.close-service-modal');
const serviceDetailBtns = document.querySelectorAll('.service-detail-btn');

function debounce(fn, delay = 100) {
    let timeoutId;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => fn(...args), delay);
    };
}

function hideLoader() {
    if (loader) {
        loader.classList.add('hidden');
    }
}

// Global Page Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Components
    try {
        initCaseStudyModal();
        initServiceDetailModal();
        initTooltips();
        initStatCounters();
        
        // Update footer year
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        
        // Smooth reveal animation for sections
        initSectionAnimations();
        initScrollLinks();
    } catch (e) {
        console.error('Initialization error:', e);
    }
    hideLoader();
});

// Service Detail Modal Functions
function initServiceDetailModal() {
    if (!serviceDetailModal || !closeServiceModalBtn) return;

    closeServiceModalBtn.addEventListener('click', closeServiceModal);

    serviceDetailModal.addEventListener('click', (e) => {
        if (e.target === serviceDetailModal) {
            closeServiceModal();
        }
    });

    serviceDetailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.service-card');
            if (!card) return;
            const title = card.querySelector('.service-title')?.textContent.trim();
            if (title && servicesData[title]) {
                openServiceDetail(title);
            }
        });
    });
}

function openServiceDetail(serviceTitle) {
    const service = servicesData[serviceTitle];
    if (!service) return;
    document.getElementById('serviceDetailImage').src = service.image;
    document.getElementById('serviceDetailTitle').textContent = serviceTitle;
    document.getElementById('serviceDetailCategory').textContent = service.category;
    document.getElementById('serviceDetailDescription').textContent = service.description;
    const featuresContainer = document.getElementById('serviceDetailFeatures');
    featuresContainer.innerHTML = service.features.map(f => `<li><i class="fas fa-check" style="color: var(--success-color);"></i> ${f}</li>`).join('');
    serviceDetailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceDetailModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Case Study Modal Functions
function initCaseStudyModal() {
    // Close button click
    closeModalBtn.addEventListener('click', closeModal);
    
    // Modal background click
    caseStudyModal.addEventListener('click', (e) => {
        if (e.target === caseStudyModal) {
            closeModal();
        }
    });
    
    // Case Study buttons
    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectItem = btn.closest('.portfolio-item');
            const projectId = projectItem.getAttribute('data-project-id');
            
            if (projectId && projectsData[projectId]) {
                openCaseStudy(projectId);
            }
        });
    });

    const modalContactBtn = document.getElementById('modalContactBtn');
    if (modalContactBtn) {
        modalContactBtn.addEventListener('click', closeModal);
    }
}

function openCaseStudy(projectId) {
    const project = projectsData[projectId];
    
    if (!project) return;
    
    // Update modal content
    document.getElementById('caseStudyImage').src = project.image;
    document.getElementById('caseStudyTitle').textContent = project.title;
    document.getElementById('caseStudyCategory').textContent = project.category;
    document.getElementById('caseStudyDescription').textContent = project.description;
    
    // Stats
    const statsContainer = document.getElementById('caseStudyStats');
    statsContainer.innerHTML = project.stats.map(stat => 
        `<span><i class="${stat.icon}"></i> ${stat.label}</span>`
    ).join('');
    
    // Features
    const featuresContainer = document.getElementById('caseStudyFeatures');
    featuresContainer.innerHTML = project.features.map(feature => 
        `<li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; color: var(--text-secondary);">
            <i class="fas fa-check-circle" style="color: var(--success-color); flex-shrink: 0;"></i>
            ${feature}
        </li>`
    ).join('');
    
    // Tech Stack
    const techContainer = document.getElementById('caseStudyTech');
    techContainer.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Results
    const resultsContainer = document.getElementById('caseStudyResults');
    resultsContainer.innerHTML = project.results.map(result => 
        `<div style="margin-bottom: 1rem;">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--secondary-color);">${result.value}</div>
            <div style="color: var(--text-secondary); font-size: 0.875rem;">${result.metric}</div>
        </div>`
    ).join('');
    
    // Show modal
    caseStudyModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    caseStudyModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseStudyModal.classList.contains('show')) {
        closeModal();
    }
});

// Mobile Menu Toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active', isActive);
        menuToggle.setAttribute('aria-expanded', isActive);
    });
}

// Close Mobile Menu When Link is Clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Smooth Scrolling for Navigation Links
function initScrollLinks() {
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // 80px header offset
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Counter Animation
function initStatCounters() {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const targetStr = entry.target.getAttribute('data-count');
                animateCounter(entry.target, targetStr);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, targetStr) {
    const target = parseInt(targetStr);
    const suffix = targetStr.replace(/[0-9]/g, '');
    let current = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;
    
    let frame = 0;
    const timer = setInterval(() => {
        frame++;
        current += increment;
        if (frame >= totalFrames) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, frameRate);
}

// Portfolio Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active Button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter Portfolio Items
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.dataset.category || '';
            const matches = filter === 'all' || itemCategory.split(' ').includes(filter);
            item.classList.toggle('filtered-out', !matches);
        });
    });
});

// Testimonial Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialItems.forEach(item => item.classList.remove('active'));
    testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    testimonialItems[index].classList.add('active');
    testimonialIndicators[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}

testimonialControls.forEach(control => {
    control.addEventListener('click', () => {
        if (control.classList.contains('next')) {
            nextTestimonial();
        } else {
            prevTestimonial();
        }
    });
});

testimonialIndicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const index = parseInt(indicator.getAttribute('data-index'));
        showTestimonial(index);
    });
});

// Auto-rotate Testimonials with Reset on Interaction
let testimonialInterval = setInterval(nextTestimonial, 5000);

function resetTestimonialTimer() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

testimonialControls.forEach(control => {
    control.addEventListener('click', resetTestimonialTimer);
});

testimonialIndicators.forEach(indicator => {
    indicator.addEventListener('click', resetTestimonialTimer);
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = 'Sending...';
        button.disabled = true;

        const formData = new FormData(contactForm);

        try {
            // Assuming your backend is running on localhost:8000
            const response = await fetch('http://127.0.0.1:8000/send-message', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showFormMessage(result.message, 'success');
                contactForm.reset();
                // Optionally, you could offer the WhatsApp link now
                // For example: showFormMessage(`${result.message} <a href="${result.whatsapp_link}" target="_blank">Contact us on WhatsApp!</a>`, 'success');
            } else {
                // Handle backend validation errors or other issues
                showFormMessage(result.message || 'An error occurred. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Could not connect to the server. Please try again later.', 'error');
        } finally {
            button.innerHTML = originalText;
            button.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    formMessage.innerHTML = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 8000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.zIndex = '1';
    });
});

// Initialize Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            
            tooltip.style.left = rect.left + scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top + scrollY - tooltip.offsetHeight - 10 + 'px';
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Section Reveal Animation
function initSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Unified Keyboard Listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu && navMenu.classList.contains('active')) {
            menuToggle.click(); // Simulate a click to properly close and update aria attributes
        }
        if (caseStudyModal && caseStudyModal.classList.contains('show')) {
            closeModal();
        }
        if (serviceDetailModal && serviceDetailModal.classList.contains('show')) {
            closeServiceModal();
        }
    }
});

// Unified Scroll Handler
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;

    // Header Scroll Effect
    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/Hide Back to Top Button
    if (scrolled > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Parallax Effect for Hero Section
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
}, 10));
