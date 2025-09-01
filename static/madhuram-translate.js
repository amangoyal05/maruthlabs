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

function swapTable(id, canvasId) {
    const table = document.getElementById(id);
    if (!table) return null;
    const wrapper = table.closest('.table-container');
    const canvas  = document.createElement('canvas');
    canvas.id = canvasId;
    wrapper.replaceChildren(canvas);
    return canvas;
}

const opts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#2d3748' } } },
    scales: { x: { ticks: { color: '#4a5568' } }, y: { ticks: { color: '#4a5568' } } }
};

const ovCvs = swapTable('overall-table', 'ovChart');
if (ovCvs) {
    new Chart(ovCvs, {
        type: 'bar',
        data: {
            labels: ['Indic Tokenizer (Ours)','SUTRA','Sarvam-1','Gemma-3'],
            datasets: [
                { label: 'Avg Fertility', data: [1.796,1.811,1.894,2.275], backgroundColor: ['#00C2B3','#0891B2','#0EA5E9','#7DD3FC'] }
            ]
        },
        options: { opts, plugins: { legend: { display: false } },
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 20,
                bottom: 20
            }
        } }
    });
}

const vocCvs = swapTable('vocab-table', 'vocChart');
if (vocCvs) {
    const data = [30.9,13.9,12.1,11.3,11.0,10.1,8.8,1.0,0.4,0.5];
    const labels = ['English','Bengali','Kannada','Hindi','Telugu','Tamil','Punjabi','Numbers','Punctuation','Other'];
    
    new Chart(vocCvs, {
        type: 'pie',
        data: {
            labels: labels.map((label, index) => `${label} (${data[index]}%)`),
            datasets: [{
                data: data,
                backgroundColor: ['#00C2B3','#0891B2','#0EA5E9','#7DD3FC','#BAE6FD','#E0F2FE','#00C2B3','#0891B2','#0EA5E9','#7DD3FC']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: '#2d3748' } } }
        }
    });
}

document.getElementById('tryNav').addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('active');
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelector('.dropdown').classList.remove('active');
    }
});

// Close mobile menu when clicking dropdown links
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-right').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.dropdown').classList.remove('active');
    });
});