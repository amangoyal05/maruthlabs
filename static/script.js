// Playground and API notice
(function () {
    var KEY = 'ml-notice-playground-2026';
    var NOTE_URL = 'https://x.com/maruthlabs/status/2116055074200015148?a=ur-30tjBTyp6kEKJv-w&s=20';
    var CUTOFF = new Date(2026, 10, 1);

    try { if (localStorage.getItem(KEY)) return; } catch (e) {}

    var lead = new Date() >= CUTOFF
        ? 'As of 1 November 2026, the Madhuram playground (chat.maruthlabs.com) and the Madhuram API have been discontinued.'
        : 'From 1 November 2026, the Madhuram playground (chat.maruthlabs.com) and the Madhuram API will be discontinued.';

    var root = document.createElement('div');
    root.className = 'ml-notice';
    root.innerHTML =
        '<div class="ml-notice__backdrop" data-close></div>' +
        '<div class="ml-notice__card" role="dialog" aria-modal="true" aria-labelledby="ml-notice-title">' +
            '<button type="button" class="ml-notice__x" aria-label="Close" data-close>' +
                '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
            '</button>' +
            '<p class="ml-notice__eyebrow">Announcement</p>' +
            '<h2 id="ml-notice-title" class="ml-notice__title">Update on the Madhuram Playground and API</h2>' +
            '<p class="ml-notice__text">' + lead + ' This affects only the hosted services. Our work at MaruthLabs continues, and we’re excited about what Madhuram v2 will bring.</p>' +
            '<p class="ml-notice__text">Thank you to everyone who used Madhuram and shared feedback with us.</p>' +
            '<p class="ml-notice__sign">— Aman and Mridul</p>' +
            '<div class="ml-notice__actions">' +
                (NOTE_URL ? '<a class="ml-notice__btn ml-notice__btn--ghost" href="' + NOTE_URL + '" target="_blank" rel="noopener">Read the full note</a>' : '') +
                '<button type="button" class="ml-notice__btn" data-close>Got it</button>' +
            '</div>' +
        '</div>';

    var card = root.querySelector('.ml-notice__card');
    var lastFocus = document.activeElement;

    function close() {
        try { localStorage.setItem(KEY, '1'); } catch (e) {}
        document.removeEventListener('keydown', onKey);
        document.documentElement.classList.remove('ml-notice-open');
        root.remove();
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function onKey(e) {
        if (e.key === 'Escape') return close();
        if (e.key !== 'Tab') return;
        var f = card.querySelectorAll('a[href], button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    root.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('ml-notice-open');
    document.body.appendChild(root);
    card.querySelector('button.ml-notice__btn').focus();
})();

// Use Cases Carousel
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('#usecases .carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('#dotsContainer .carousel-dot');

let currentSlide = 0;
const totalSlides = slides.length;

function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function updateCarousel() {
    const slidesPerView = getSlidesPerView();
    const maxSlide = totalSlides - slidesPerView;
    const slideWidth = 100 / slidesPerView;
    
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    if (currentSlide < 0) currentSlide = 0;
    
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = 0;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    const slidesPerView = getSlidesPerView();
    const maxSlide = totalSlides - slidesPerView;
    currentSlide++;
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

window.addEventListener('resize', updateCarousel);

setInterval(() => {
    const slidesPerView = getSlidesPerView();
    const maxSlide = totalSlides - slidesPerView;
    currentSlide++;
    if (currentSlide > maxSlide) currentSlide = 0;
    updateCarousel();
}, 5000);

// Blogs Carousel
const blogsTrack = document.getElementById('blogsCarouselTrack');
const blogsSlides = document.querySelectorAll('#blogs .carousel-slide');
const blogsPrevBtn = document.getElementById('blogsPrevBtn');
const blogsNextBtn = document.getElementById('blogsNextBtn');

let blogsCurrentSlide = 0;
const blogsTotalSlides = blogsSlides.length;

function getBlogsSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function updateBlogsCarousel() {
    const slidesPerView = getBlogsSlidesPerView();
    const maxSlide = blogsTotalSlides - slidesPerView;
    const slideWidth = 100 / slidesPerView;
    
    if (blogsCurrentSlide > maxSlide) blogsCurrentSlide = maxSlide;
    if (blogsCurrentSlide < 0) blogsCurrentSlide = 0;
    
    blogsTrack.style.transform = `translateX(-${blogsCurrentSlide * slideWidth}%)`;
}

blogsPrevBtn.addEventListener('click', () => {
    blogsCurrentSlide--;
    if (blogsCurrentSlide < 0) blogsCurrentSlide = 0;
    updateBlogsCarousel();
});

blogsNextBtn.addEventListener('click', () => {
    const slidesPerView = getBlogsSlidesPerView();
    const maxSlide = blogsTotalSlides - slidesPerView;
    blogsCurrentSlide++;
    if (blogsCurrentSlide > maxSlide) blogsCurrentSlide = maxSlide;
    updateBlogsCarousel();
});

window.addEventListener('resize', updateBlogsCarousel);

setInterval(() => {
    const slidesPerView = getBlogsSlidesPerView();
    const maxSlide = blogsTotalSlides - slidesPerView;
    blogsCurrentSlide++;
    if (blogsCurrentSlide > maxSlide) blogsCurrentSlide = 0;
    updateBlogsCarousel();

}, 6000);

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    if (!menu || !icon) return;

    const isOpen = menu.style.maxHeight && menu.style.maxHeight !== '0px';

    if (isOpen) {
        menu.style.maxHeight = '0px';
        menu.style.opacity = '0';
        menu.style.paddingBottom = '0';
        menu.style.borderTop = 'none';
        icon.classList.replace('fa-times', 'fa-bars');
    } else {
        menu.style.maxHeight = '600px';
        menu.style.opacity = '1';
        menu.style.paddingBottom = '2rem';
        menu.style.borderTop = '1px solid #f3f4f6';
        icon.classList.replace('fa-bars', 'fa-times');
    }
}

// Close menu when any link inside it is clicked
document.getElementById('mobileMenu')?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('mobileMenu');
        if (menu && menu.style.maxHeight !== '0px') toggleMobileMenu();
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('button[onclick="toggleMobileMenu()"]');
    if (menu && menu.style.maxHeight && menu.style.maxHeight !== '0px'
        && !menu.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
        toggleMobileMenu();
    }
});
