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