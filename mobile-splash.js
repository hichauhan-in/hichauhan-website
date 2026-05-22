// Mobile splash screen - shows once when user first visits on mobile
(function() {
    if (window.innerWidth > 768) return;
    if (localStorage.getItem('mobile-splash-seen')) return;

    const messages = [
        { heading: 'Optimised for Desktop', body: 'This site was built for larger screens — the easter eggs, animations, and chaos hit different on a desktop/laptop.', sub: 'If you can, try opening this on a bigger screen. You won\'t regret it. (Probably.)' },
        { heading: 'Wrong Screen, Friend', body: 'You\'re on a phone. This site has easter eggs that need a real keyboard and mouse to discover.', sub: 'Desktop is where the magic happens. This is where the compromise happens.' },
        { heading: 'Desktop Recommended', body: 'Half the fun of this site is the hidden interactions — and your thumbs aren\'t gonna cut it.', sub: 'Grab a laptop. Or don\'t. I\'m a splash screen, not your boss.' },
        { heading: 'Tiny Screen Detected', body: 'This portfolio was designed for screens that don\'t fit in your pocket. The animations, the secrets, the chaos — all better on desktop.', sub: 'But hey, your phone, your rules.' },
        { heading: 'You\'re on Mobile', body: 'Look, it\'ll work. But it\'s like watching a movie on airplane WiFi — technically possible, spiritually wrong.', sub: 'Desktop gives you the full unhinged experience.' },
        { heading: 'Phone Mode: Detected', body: 'The easter eggs on this site require clicking, typing, and patience. Two of those are hard on mobile.', sub: 'Consider a bigger screen. Or just scroll through and judge my career.' },
        { heading: 'Screen Too Small', body: 'This site has hidden features that were designed for desktop humans with keyboards and too much free time.', sub: 'Mobile works, but you\'ll miss 80% of the chaos.' },
        { heading: 'Desktop > Mobile', body: 'Hot take: some websites deserve a 15" screen. This is one of them. (Self-aware? Maybe. Wrong? No.)', sub: 'If you can switch to a laptop, future you will thank present you.' },
    ];

    const msg = messages[Math.floor(Math.random() * messages.length)];
    let countdown = 10;

    const overlay = document.createElement('div');
    overlay.id = 'mobileSplash';
    overlay.style.cssText = 'position:fixed;inset:0;background:#0A0A0A;z-index:99999;display:flex;align-items:center;justify-content:center;padding:32px;opacity:0;transition:opacity 0.3s;';

    overlay.innerHTML = `
        <div style="max-width:360px;text-align:center;font-family:'JetBrains Mono',monospace;">
            <div style="font-size:40px;margin-bottom:20px;">🖥️</div>
            <h2 style="font-size:14px;color:#00A896;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">${msg.heading}</h2>
            <p style="font-size:12px;color:#B0B0B0;line-height:1.8;margin-bottom:8px;">${msg.body}</p>
            <p style="font-size:11px;color:#808080;line-height:1.6;margin-bottom:32px;">${msg.sub}</p>
            <button id="mobileSplashBtn" style="background:none;border:1px solid #00A896;color:#00A896;padding:10px 24px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:11px;cursor:pointer;transition:all 0.2s;margin-bottom:12px;display:block;width:100%;">Continue anyway →</button>
            <span id="mobileSplashTimer" style="font-size:9px;color:#808080;opacity:0.6;">auto-continuing in <span id="mobileSplashCount">10</span>s</span>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });

    function dismiss() {
        localStorage.setItem('mobile-splash-seen', '1');
        clearInterval(timer);
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }

    document.getElementById('mobileSplashBtn').addEventListener('click', dismiss);

    const timer = setInterval(() => {
        countdown--;
        const countEl = document.getElementById('mobileSplashCount');
        if (countEl) countEl.textContent = countdown;
        if (countdown <= 0) dismiss();
    }, 1000);
})();
