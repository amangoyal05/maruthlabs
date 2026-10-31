(function () {
    var NS = 'http://www.w3.org/2000/svg';

    function el(tag, attrs, parent) {
        var n = document.createElementNS(NS, tag);
        for (var k in attrs) n.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(n);
        return n;
    }

    function text(parent, x, y, str, cls, anchor) {
        var t = el('text', { x: x, y: y, 'class': cls, 'text-anchor': anchor || 'start' }, parent);
        t.textContent = str;
        return t;
    }

    document.querySelectorAll('.passk').forEach(function (fig) {
        var data = JSON.parse(fig.querySelector('script[type="application/json"]').textContent);
        var plot = fig.querySelector('.plot');
        var tip = fig.querySelector('.tip');
        var s = null;
        var active = -1;

        function render() {
            var W = plot.clientWidth;
            if (!W) return;
            var H = W < 520 ? 250 : 300;
            var m = { t: 30, r: 12, b: 48, l: 34 };
            var pw = W - m.l - m.r, ph = H - m.t - m.b;
            var n = data.ks.length;
            var pad = Math.min(32, pw * 0.07);
            var x = function (i) { return m.l + pad + i * (pw - 2 * pad) / (n - 1); };
            var y0 = data.ymin || 0, step = data.step || 10;
            var y = function (v) { return m.t + (1 - (v - y0) / (data.ymax - y0)) * ph; };

            var old = plot.querySelector('svg');
            if (old) old.remove();
            var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', tabindex: 0, 'aria-label': fig.dataset.label });
            plot.insertBefore(svg, tip);

            for (var v = y0; v <= data.ymax; v += step) {
                el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), 'class': v > y0 ? 'grid' : 'axis' }, svg);
                text(svg, m.l - 10, y(v) + 4, String(v), 'tick', 'end');
            }
            text(svg, 0, 14, data.yTitle || 'pass@k, %', 'axis-title');
            data.ks.forEach(function (k, i) { text(svg, x(i), H - m.b + 24, k, 'tick', 'middle'); });
            text(svg, W - m.r, H - 6, data.xTitle || 'samples per problem, k', 'axis-title', 'end');

            var cross = el('line', { x1: 0, x2: 0, y1: m.t, y2: m.t + ph, 'class': 'cross' }, svg);
            var dots = [];
            data.series.forEach(function (ser) {
                var d = '', pen = false;
                ser.values.forEach(function (val, i) {
                    if (val === null) { pen = false; return; }
                    d += (pen ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(val).toFixed(1) + ' ';
                    pen = true;
                });
                el('path', { d: d, 'class': 'line s-' + ser.key }, svg);
            });
            data.series.forEach(function (ser) {
                ser.values.forEach(function (val, i) {
                    if (val === null) return;
                    var c = el('circle', { cx: x(i), cy: y(val), r: 4, 'class': 'dot s-' + ser.key }, svg);
                    (dots[i] = dots[i] || []).push(c);
                });
            });

            s = { svg: svg, x: x, n: n, W: W, m: m, ph: ph, cross: cross, dots: dots };
            bind(svg);
            if (active >= 0) show(active);
        }

        function show(i) {
            active = i;
            s.cross.setAttribute('x1', s.x(i));
            s.cross.setAttribute('x2', s.x(i));
            s.cross.classList.add('on');
            s.dots.forEach(function (col, j) { col.forEach(function (c) { c.setAttribute('r', j === i ? 5 : 4); }); });

            tip.textContent = '';
            var head = document.createElement('p');
            head.className = 'tip-head';
            head.textContent = (data.xPrefix === undefined ? 'k = ' : data.xPrefix) + data.ks[i];
            tip.appendChild(head);
            data.series.slice().sort(function (a, b) { return (b.values[i] === null ? -1 : b.values[i]) - (a.values[i] === null ? -1 : a.values[i]); }).forEach(function (ser) {
                var row = document.createElement('p');
                var key = document.createElement('span');
                key.className = 'key s-' + ser.key;
                var val = document.createElement('strong');
                val.textContent = ser.values[i] === null ? 'n/a' : ser.values[i].toFixed(data.digits);
                var name = document.createElement('span');
                name.textContent = ser.name;
                row.appendChild(key); row.appendChild(val); row.appendChild(name);
                tip.appendChild(row);
            });
            tip.hidden = false;
            var tw = tip.offsetWidth;
            var left = s.x(i) + 16;
            if (left + tw > s.W) left = s.x(i) - 16 - tw;
            tip.style.left = Math.max(0, left) + 'px';
            var vals = data.series.map(function (ser) { return ser.values[i]; }).filter(function (v) { return v !== null; });
            var mean = vals.reduce(function (a, v) { return a + v; }, 0) / vals.length;
            var mid = ((data.ymin || 0) + data.ymax) / 2;
            tip.style.top = (mean > mid ? s.m.t + s.ph - tip.offsetHeight : s.m.t) + 'px';
        }

        function hide() {
            active = -1;
            tip.hidden = true;
            if (!s) return;
            s.cross.classList.remove('on');
            s.dots.forEach(function (col) { col.forEach(function (c) { c.setAttribute('r', 4); }); });
        }

        function nearest(e) {
            var r = s.svg.getBoundingClientRect();
            var px = e.clientX - r.left, best = 0, bd = Infinity;
            for (var i = 0; i < s.n; i++) {
                var d = Math.abs(s.x(i) - px);
                if (d < bd) { bd = d; best = i; }
            }
            return best;
        }

        function bind(svg) {
            svg.addEventListener('pointermove', function (e) { show(nearest(e)); });
            svg.addEventListener('pointerdown', function (e) { show(nearest(e)); });
            svg.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hide(); });
            svg.addEventListener('focus', function () { show(active >= 0 ? active : s.n - 1); });
            svg.addEventListener('blur', hide);
            svg.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    var i = active < 0 ? s.n - 1 : active + (e.key === 'ArrowRight' ? 1 : -1);
                    show(Math.max(0, Math.min(s.n - 1, i)));
                } else if (e.key === 'Escape') {
                    hide();
                }
            });
        }

        var lastW = 0;
        new ResizeObserver(function () {
            if (plot.clientWidth !== lastW) { lastW = plot.clientWidth; render(); }
        }).observe(plot);
    });
})();
