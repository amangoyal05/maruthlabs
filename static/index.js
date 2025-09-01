// Hamburger Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-right').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.getAttribute('href').substring(1));
        
        // Close mobile menu if open
        const navRight = document.querySelector('.nav-right');
        const hamburger = document.querySelector('.hamburger');
        if (navRight && navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        if (target) window.scrollTo({ 
            top: target.offsetTop - 20, 
            behavior: 'smooth' 
        });
    });
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Observe all cards with slight delay
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Observe all blog posts with slight delay
document.querySelectorAll('.post').forEach((post, index) => {
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    post.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(post);
});


(function() {
    const btn = document.getElementById('tryNavBtn');
    const menu = document.getElementById('tryNavMenu');

    if (!btn || !menu) return;

    function closeMenu() {
        menu.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
        menu.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
    }
    function toggleMenu() {
        if (menu.classList.contains('show')) closeMenu(); else openMenu();
    }

    // Toggle when clicking the button
    btn.addEventListener('click', function(e){
        e.stopPropagation();
        toggleMenu();
    });

    // Close on outside click
    document.addEventListener('click', function(e){
        if (!menu.contains(e.target) && e.target !== btn) closeMenu();
    });

    // Close on Esc
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') closeMenu();
    });

    // Optional: keyboard open via ArrowDown
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            openMenu();
            const first = menu.querySelector('.dropdown-item');
            if (first) first.focus();
        }
    });
})();