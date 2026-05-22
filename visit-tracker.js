// ====== VISIT TRACKING (shared across all pages) ======
(function() {
    const STORAGE_KEY = 'hc_site_stats';
    const now = Date.now();
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    let stats;
    try {
        stats = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch(e) { stats = null; }

    if (!stats) {
        stats = { visits: 0, firstVisit: now, lastVisit: now, pages: [], totalTime: 0, sessionStart: now };
    }

    // Increment visit count (once per session)
    if (!sessionStorage.getItem('hc_counted')) {
        stats.visits++;
        sessionStorage.setItem('hc_counted', '1');
    }

    // Track page
    if (!stats.pages.includes(currentPage)) {
        stats.pages.push(currentPage);
    }

    stats.sessionStart = now;
    stats.lastVisit = now;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

    // Track time spent (update every 10s)
    setInterval(function() {
        try {
            var s = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (s) {
                s.totalTime += 10;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
            }
        } catch(e) {}
    }, 10000);

    // Global counters (once per session / once per device)
    if (!sessionStorage.getItem('hc_global_counted')) {
        fetch('https://api.counterapi.dev/v1/hichauhan-portfolio/visits/up')
            .then(function(r) { return r.json(); })
            .then(function() { sessionStorage.setItem('hc_global_counted', '1'); })
            .catch(function() {});
    }
    if (!localStorage.getItem('hc_device_counted')) {
        fetch('https://api.counterapi.dev/v1/hichauhan-portfolio/unique/up')
            .then(function(r) { return r.json(); })
            .then(function() { localStorage.setItem('hc_device_counted', '1'); })
            .catch(function() {});
    }
})();
