function toggleMenu() {
    const toggle = document.querySelector('.menu-toggle');
    toggle.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
    toggle.setAttribute('aria-expanded', toggle.classList.contains('active'));
}
function closeMenu() {
    const toggle = document.querySelector('.menu-toggle');
    toggle.classList.remove('active');
    document.querySelector('.nav-links').classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.book-card, .conference-card, .math-card, .award-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Lightbox para imágenes
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="" alt="" id="lightbox-img">
    </div>
`;
document.body.appendChild(lightbox);

document.querySelectorAll('.conference-ink-image, .paraleer-watercolor-image, .fragment-watercolor-image, .award-watercolor-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox-img').alt = img.alt;
        lightbox.classList.add('active');
    });
});

document.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Fecha de última actualización
(function() {
    const fechaEl = document.getElementById('fecha-actualizacion');
    if (!fechaEl) return;
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const d = new Date(document.lastModified);
    const mes = meses[d.getMonth()];
    const año = d.getFullYear();
    fechaEl.textContent = mes.charAt(0).toUpperCase() + mes.slice(1) + ' de ' + año;
})();
