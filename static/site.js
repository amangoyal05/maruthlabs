(function () {
    var canvas = document.querySelector('.wind');
    if (!canvas || !canvas.getContext || !window.Path2D) return;

    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var lines = [], layer = null, w = 0, h = 0, dpr = 1;
    var raf = 0, visible = true, last = 0, t = 0;

    function rng(seed) {
        return function () {
            seed |= 0; seed = seed + 0x6D2B79F5 | 0;
            var r = Math.imul(seed ^ seed >>> 15, 1 | seed);
            r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r;
            return ((r ^ r >>> 14) >>> 0) / 4294967296;
        };
    }

    function hash(x, y, s) {
        var n = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
        return n - Math.floor(n);
    }

    function noise(x, y, s) {
        var xi = Math.floor(x), yi = Math.floor(y);
        var xf = x - xi, yf = y - yi;
        xf = xf * xf * (3 - 2 * xf); yf = yf * yf * (3 - 2 * yf);
        var top = hash(xi, yi, s) + (hash(xi + 1, yi, s) - hash(xi, yi, s)) * xf;
        var bot = hash(xi, yi + 1, s) + (hash(xi + 1, yi + 1, s) - hash(xi, yi + 1, s)) * xf;
        return top + (bot - top) * yf;
    }

    function angle(x, y) {
        var n = noise(x / 460, y / 320, 1) * 0.85 + noise(x / 180, y / 140, 2) * 0.3;
        return -0.1 + (n - 0.58) * 0.95 + 0.1 * Math.sin(x / 300 + y / 210);
    }

    function fade(c) {
        c.save();
        c.globalCompositeOperation = 'destination-out';
        var g = c.createLinearGradient(0, h * 0.38, 0, h);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(0.55, 'rgba(0,0,0,0.85)');
        g.addColorStop(1, 'rgba(0,0,0,1)');
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        var top = c.createLinearGradient(0, 0, 0, 120);
        top.addColorStop(0, 'rgba(0,0,0,0.9)');
        top.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = top;
        c.fillRect(0, 0, w, 120);
        c.restore();
    }

    function build() {
        var rect = canvas.getBoundingClientRect();
        w = rect.width; h = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);

        var sep = w < 640 ? 18 : 15, test = sep * 0.5, step = 2;
        var gw = Math.ceil(w / sep) + 1, gh = Math.ceil(h / sep) + 1;
        var grid = new Array(gw * gh);
        var rand = rng(11);

        function near(x, y, d) {
            var cx = Math.floor(x / sep), cy = Math.floor(y / sep);
            for (var j = cy - 1; j <= cy + 1; j++) {
                for (var i = cx - 1; i <= cx + 1; i++) {
                    if (i < 0 || j < 0 || i >= gw || j >= gh) continue;
                    var b = grid[j * gw + i];
                    if (!b) continue;
                    for (var k = 0; k < b.length; k += 2) {
                        var dx = b[k] - x, dy = b[k + 1] - y;
                        if (dx * dx + dy * dy < d * d) return true;
                    }
                }
            }
            return false;
        }

        function add(pts) {
            for (var k = 0; k < pts.length; k += 2) {
                var x = pts[k], y = pts[k + 1];
                if (x < 0 || y < 0 || x >= w || y >= h) continue;
                var idx = Math.floor(y / sep) * gw + Math.floor(x / sep);
                (grid[idx] || (grid[idx] = [])).push(x, y);
            }
        }

        function walk(x, y, dir, out) {
            for (var i = 0; i < 1200; i++) {
                var a = angle(x, y);
                x += dir * step * Math.cos(a);
                y += dir * step * Math.sin(a);
                if (x < -12 || y < -12 || x > w + 12 || y > h + 12) return;
                if (near(x, y, test)) return;
                out.push(x, y);
            }
        }

        lines = [];
        var tries = Math.round(w * h / (sep * sep) * 1.4);
        for (var s = 0; s < tries; s++) {
            var sx = rand() * w, sy = rand() * h;
            if (near(sx, sy, sep)) continue;
            var fwd = [], back = [];
            walk(sx, sy, 1, fwd);
            walk(sx, sy, -1, back);
            var pts = [];
            for (var k = back.length - 2; k >= 0; k -= 2) pts.push(back[k], back[k + 1]);
            pts.push(sx, sy);
            for (var m = 0; m < fwd.length; m++) pts.push(fwd[m]);
            if (pts.length < 80) continue;
            add(pts);
            var path = new Path2D();
            path.moveTo(pts[0], pts[1]);
            for (var q = 4; q < pts.length; q += 4) path.lineTo(pts[q], pts[q + 1]);
            path.lineTo(pts[pts.length - 2], pts[pts.length - 1]);
            lines.push({
                path: path,
                dash: 24 + rand() * 80,
                gap: 140 + rand() * 300,
                speed: 0.7 + rand() * 0.8,
                phase: rand() * 500,
                accent: rand() < 0.2
            });
        }

        layer = document.createElement('canvas');
        layer.width = canvas.width;
        layer.height = canvas.height;
        var l = layer.getContext('2d');
        l.setTransform(dpr, 0, 0, dpr, 0, 0);
        l.lineWidth = 1;
        l.strokeStyle = 'rgba(30, 107, 149, 0.12)';
        for (var n = 0; n < lines.length; n++) l.stroke(lines[n].path);
        fade(l);
    }

    function draw() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(layer, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineWidth = 1.25;
        ctx.lineCap = 'round';
        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            ctx.setLineDash([ln.dash, ln.gap]);
            ctx.lineDashOffset = -(t * ln.speed + ln.phase);
            ctx.strokeStyle = ln.accent ? 'rgba(30, 107, 149, 0.6)' : 'rgba(14, 27, 37, 0.2)';
            ctx.stroke(ln.path);
        }
        ctx.setLineDash([]);
        fade(ctx);
    }

    function frame(now) {
        raf = 0;
        if (!visible || reduce.matches) return;
        if (last && now - last < 33) { raf = requestAnimationFrame(frame); return; }
        t += (last ? Math.min(now - last, 100) : 33) * 0.032;
        last = now;
        draw();
        raf = requestAnimationFrame(frame);
    }

    function start() {
        if (!raf && visible && !reduce.matches) { last = 0; raf = requestAnimationFrame(frame); }
    }

    build();
    draw();

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            start();
        }).observe(canvas);
    }

    if (reduce.addEventListener) reduce.addEventListener('change', function () { draw(); start(); });

    var lastW = w, timer = 0;
    window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            var r = canvas.getBoundingClientRect();
            if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - h) < 120) return;
            lastW = r.width;
            build();
            draw();
        }, 200);
    });

    start();
})();
