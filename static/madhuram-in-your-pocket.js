// Hamburger Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-right').classList.toggle('active');
});

// Close mobile menu when clicking navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-right').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    });
});

// CTA Button Functionality
document.getElementById('tryNav').addEventListener('click', () => {
    window.location.href = 'index.html#cta';
});

// Smooth Scrolling Animation for Page Load
document.addEventListener('DOMContentLoaded', () => {
    const blogContent = document.querySelector('.blog-content');
    blogContent.style.opacity = '0';
    blogContent.style.transform = 'translateY(20px)';
    blogContent.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    setTimeout(() => {
        blogContent.style.opacity = '1';
        blogContent.style.transform = 'translateY(0)';
    }, 100);
});