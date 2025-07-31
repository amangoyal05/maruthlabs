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

// const fertCvs = swapTable('fertility-table', 'fertChart');
// fertCvs.width = 800;
// fertCvs.height = 400;

// if (fertCvs) {
//     new Chart(fertCvs, {
//         type: 'bar',
//         data: {
//             labels: ['English','Hindi','Punjabi','Bengali','Telugu','Tamil','Kannada'],
//             datasets: [
//                 { label: 'Indic Tokenizer (Ours)', data: [1.35,1.47,1.55,1.71,2.09,2.16,2.24], backgroundColor: '#2d3748' },
//                 { label: 'SUTRA', data: [1.14,1.46,1.25,1.85,2.23,2.28,2.47], backgroundColor: '#718096' },
//                 { label: 'Sarvam-1', data: [1.43,1.40,1.68,2.07,2.14,2.17,2.37], backgroundColor: '#a0aec0' },
//                 { label: 'Gemma-3',data: [1.28,1.43,2.87,1.72,2.88,2.42,3.33], backgroundColor: '#cbd5e0' }
//             ]
//         },
//         options: opts
//     });
// }

// const seqCvs = swapTable('sequence-table', 'seqChart');
// if (seqCvs) {
//     new Chart(seqCvs, {
//         type: 'line',
//         data: {
//             labels: ['English','Hindi','Punjabi','Bengali','Telugu','Tamil','Kannada'],
//             datasets: [
//                 { label: 'Indic Tokenizer (Ours)', data: [1.187,1.007,1.234,0.927,0.936,0.946,0.910], borderColor: '#1a202c', tension: 0.3 },
//                 { label: 'Sarvam-1', data: [1.297,0.993,1.373,1.125,0.979,0.964,1.005], borderColor: '#718096', tension: 0.3 },
//                 { label: 'Gemma-3', data: [1.128,0.979,2.286,0.932,1.290,1.058,1.351], borderColor: '#a0aec0', tension: 0.3 }
//             ]
//         },
//         options: opts
//     });
// }

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
