document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');

    if (hamburger && navRight) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navRight.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navRight) navRight.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    (function () {
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

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && e.target !== btn) closeMenu();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                openMenu();
                const first = menu.querySelector('.dropdown-item');
                if (first) first.focus();
            }
        });

        menu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                closeMenu();
                if (navRight) navRight.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    })();
});
