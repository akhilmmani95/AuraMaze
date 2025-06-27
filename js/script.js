document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const initMobileMenu = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            const toggleMenu = () => {
                const isActive = navLinks.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                
                // Toggle between hamburger and close icon
                icon.classList.toggle('fa-bars', !isActive);
                icon.classList.toggle('fa-times', isActive);
                
                // Toggle body overflow to prevent scrolling when menu is open
                document.body.style.overflow = isActive ? 'hidden' : '';
            };

            mobileMenuBtn.addEventListener('click', toggleMenu);
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });
        }
    };

    // Smooth scrolling for anchor links
    const initSmoothScrolling = () => {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without page reload
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    };

    // Navbar scroll effect
    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            const updateNavbar = () => {
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(5, 5, 8, 0.95)';
                    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.backgroundColor = 'rgba(10, 10, 18, 0.9)';
                    navbar.style.boxShadow = 'none';
                }
            };
            
            window.addEventListener('scroll', updateNavbar);
            updateNavbar(); // Initialize on load
        }
    };

    // Form submission handler
    const initContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                
                try {
                    // Disable button and show spinner
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
                    
                    const formData = new FormData(contactForm);
                    const response = await fetch('https://formsubmit.co/ajax/hi@auramaze.in', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    // Show success message
                    await Swal.fire({
                        title: 'Thank You!',
                        text: 'Your enquiry has been submitted successfully.',
                        icon: 'success',
                        confirmButtonColor: 'var(--primary-color)',
                        confirmButtonText: 'OK'
                    });
                    
                    contactForm.reset();
                } catch (error) {
                    console.error('Form submission error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'There was a problem submitting the form. Please try again.',
                        icon: 'error',
                        confirmButtonColor: 'var(--primary-color)'
                    });
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            });
        }
    };

    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initNavbarScroll();
    initContactForm();
});