// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter animation function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    let increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

// Animate counters when they come into view
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Particle system
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.1)';
        }
    }
});

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.innerHTML = '☰';
    menuToggle.classList.add('menu-toggle');
    
    // Insert menu toggle before the CTA button
    const nav = document.querySelector('.nav');
    const ctaBtn = document.querySelector('.cta-btn');
    if (nav && ctaBtn) {
        nav.insertBefore(menuToggle, ctaBtn);
    }

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('mobile-menu');
            navLinks.classList.toggle('active');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('mobile-menu');
                navLinks.classList.remove('active');
            }
        });
    });
}

// Initialize mobile menu
initMobileMenu();

// Add some interactive effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-card');
    
    parallax.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSections);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact Modal Functionality
    const contactModal = document.getElementById('contactModal');
    const letsTalkBtn = document.querySelector('.cta-btn'); // "Let's Talk" button in nav
    const hireMeBtn = document.getElementById('hireMeBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const contactForm = document.getElementById('contactForm');
    const downloadCvBtn = document.getElementById('downloadCvBtn');

    // Also handle "Book Now" button in floating card
    const bookNowBtn = document.querySelector('.floating-card button');

    // Open modal functions
    function openContactModal() {
        if (contactModal) {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeContactModal() {
        if (contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            clearFormErrors();
        }
    }

    // Event listeners for opening modal
    if (letsTalkBtn) {
        letsTalkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }

    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }

    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactModal();
        });
    }
    // Event listeners for closing modal
    if (closeModal) {
        closeModal.addEventListener('click', closeContactModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeContactModal);
    }

    // Close modal when clicking outside
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });

     // Form validation and submission
    function validateForm(formData) {
        const errors = {};
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
        
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.message || formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        return errors;
    }

    function displayFormErrors(errors) {
        // Clear previous errors
        clearFormErrors();
        
        // Display new errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}Error`);
            const inputElement = document.getElementById(field);
            
            if (errorElement && inputElement) {
                errorElement.textContent = errors[field];
                inputElement.style.borderColor = '#ff6b6b';
            }
        });
    }

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
        
        errorElements.forEach(el => el.textContent = '');
        inputElements.forEach(el => el.style.borderColor = 'rgba(255, 255, 255, 0.2)');
    }

    function showSuccessMessage() {
        if (contactForm) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            
            contactForm.parentNode.insertBefore(successDiv, contactForm);
            
            setTimeout(() => {
                successDiv.remove();
                closeContactModal();
                contactForm.reset();
            }, 5000);
        }
    }

    / Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            const errors = validateForm(formData);
            
            if (Object.keys(errors).length > 0) {
                displayFormErrors(errors);
                return;
            }
            
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            if (btnText && btnLoader) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-block';
                submitBtn.disabled = true;
            }
            
            // Simulate email sending (replace with actual email service)
            setTimeout(() => {
                console.log('Form submitted:', formData);
                
                if (btnText && btnLoader) {
                    btnText.style.display = 'inline-block';
                    btnLoader.style.display = 'none';
                    submitBtn.disabled = false;
                }
                showSuccessMessage();
            }, 2000);
        });
    }