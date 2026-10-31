(function () {
    var KEY = 'ml-notice-playground-2026';
    var NOTE_URL = 'https://x.com/maruthlabs/status/2116055074200015148';
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
                '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
            '</button>' +
            '<h2 id="ml-notice-title" class="ml-notice__title">Update on the Madhuram playground and API</h2>' +
            '<p class="ml-notice__text">' + lead + ' This affects only the hosted services. Our work at MaruthLabs continues, and we’re excited about what Madhuram v2 will bring.</p>' +
            '<p class="ml-notice__text">Thank you to everyone who used Madhuram and shared feedback with us.</p>' +
            '<p class="ml-notice__sign">Aman and Mridul</p>' +
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
