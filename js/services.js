document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded'); // Verify DOM ready
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Button element:', mobileMenuBtn); // Should show element
    console.log('Menu element:', navLinks); // Should show element
    
    if (mobileMenuBtn && navLinks) {
        console.log('Initializing mobile menu...');
        
        mobileMenuBtn.addEventListener('click', function() {
            console.log('Menu button clicked!'); // Now this should show
            
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Toggle body scroll
            document.body.style.overflow = navLinks.classList.contains('active') 
                ? 'hidden' 
                : '';
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    } else {
        console.error('Missing required elements for mobile menu');
    }
});