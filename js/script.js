document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for anchor links
            if(targetId.startsWith('#')) {
                e.preventDefault();
                
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if(window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(5, 5, 8, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 18, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });


    
   // Contact form submission
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    
    try {
        const formData = new FormData(contactForm);
        
        await fetch('https://formsubmit.co/ajax/hi@auramaze.in', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Show SweetAlert dialog
        Swal.fire({
            title: 'Thank You!',
            text: 'Your enquiry has been submitted successfully.',
            icon: 'success',
            confirmButtonColor: 'var(--primary-color)',
            confirmButtonText: 'OK'
        });
        
        contactForm.reset();
    } catch (error) {
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
});