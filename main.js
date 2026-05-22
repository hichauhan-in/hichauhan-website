// Main JavaScript for index.html terminal
// Handles terminal commands, history, and mobile keyboard

window._pageLoadTime = Date.now();

// Terminal functionality
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const commands = {
    help: () => [
        'Available commands:',
        '',
        '  Navigation:',
        '    experience, exp  - Career timeline',
        '    skills, skl      - Technical expertise',
        '    projects, pro    - Side projects',
        '    education, edu   - Academic credentials',
        '    contact, con     - Get in touch',
        '    cv               - View CV',
        '',
        '  Info:',
        '    about            - About me',
        '    whoami           - Visitor info',
        '    linkedin         - LinkedIn profile',
        '    location         - Current location',
        '',
        '  Games:',
        '    snake            - Classic snake game',
        '    pong             - Pong vs CPU',
        '    tetris           - Mini tetris',
        '    dodge            - Space dodge',
        '',
        '  Utility:',
        '    help             - Show this message',
        '    clear, cls       - Clear terminal',
        '    date             - Current date/time',
        '    uptime           - Time on this page',
        '',
        '  Shortcut: Ctrl+K   - Command palette',
    ],
    about: () => [
        'Himanshu Chauhan',
        '',
        '  Role     : Escalation Engineer @ Microsoft',
        '  Domain   : Windows Debugging, Kernel, Networking',
        '  Stack    : WinDbg, Crash Dumps, TCP/IP, DNS, AD',
        '  Learning : MSc Data Science (Manipal, 2024-26)',
        '  Location : Bangalore, India',
        '',
        '  4+ years debugging what others couldn\'t.',
        '  Currently breaking things in kernel mode.',
    ],
    whoami: async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return [
                'Visitor Information:',
                `  IP Address: ${data.ip}`,
                '  Status: Connected ✅'
            ];
        } catch (error) {
            return [
                'Visitor Information:',
                '  IP Address: Unable to fetch',
                '  Status: Connected ✅'
            ];
        }
    },
    location: () => [
        '📍 Location: Bangalore, India',
        'Timezone: IST (UTC+5:30)'
    ],
    date: () => {
        const now = new Date();
        return [now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), now.toLocaleTimeString()];
    },
    skills: () => {
        window.location.href = 'skills.html';
        return ['Navigating to skills...'];
    },
    skill: () => {
        window.location.href = 'skills.html';
        return ['Navigating to skills...'];
    },
    skl: () => {
        window.location.href = 'skills.html';
        return ['Navigating to skills...'];
    },
    contact: () => {
        window.location.href = 'contact.html';
        return ['Navigating to contact...'];
    },
    con: () => {
        window.location.href = 'contact.html';
        return ['Navigating to contact...'];
    },
    experience: () => {
        window.location.href = 'experience.html';
        return ['Navigating to experience...'];
    },
    exp: () => {
        window.location.href = 'experience.html';
        return ['Navigating to experience...'];
    },
    education: () => {
        window.location.href = 'education.html';
        return ['Navigating to education...'];
    },
    edu: () => {
        window.location.href = 'education.html';
        return ['Navigating to education...'];
    },
    projects: () => {
        window.location.href = 'projects.html';
        return ['Navigating to projects...'];
    },
    project: () => {
        window.location.href = 'projects.html';
        return ['Navigating to projects...'];
    },
    pro: () => {
        window.location.href = 'projects.html';
        return ['Navigating to projects...'];
    },
    clear: () => {
        if (activeGame) stopTerminalGame();
        terminalOutput.innerHTML = `
            <div class="terminal-line">Welcome to the Terminal!.</div>
            <div class="terminal-line">Type 'help' to see available commands.</div>
        `;
        return [];
    },
    cls: () => {
        if (activeGame) stopTerminalGame();
        terminalOutput.innerHTML = `
            <div class="terminal-line">Welcome to the Terminal!.</div>
            <div class="terminal-line">Type 'help' to see available commands.</div>
        `;
        return [];
    },
    linkedin: () => {
        window.open('https://www.linkedin.com/in/hichauhan-in/', '_blank');
        return ['Opening LinkedIn profile...'];
    },
    cv: () => {
        window.location.href = 'cv.html';
        return ['Opening CV...'];
    },
    resume: () => {
        window.location.href = 'cv.html';
        return ['Opening CV...'];
    },
    uptime: () => {
        const elapsed = Date.now() - window._pageLoadTime;
        const secs = Math.floor(elapsed / 1000);
        const mins = Math.floor(secs / 60);
        const hrs = Math.floor(mins / 60);
        const parts = [];
        if (hrs > 0) parts.push(`${hrs}h`);
        if (mins % 60 > 0) parts.push(`${mins % 60}m`);
        parts.push(`${secs % 60}s`);
        return [
            `Session uptime: ${parts.join(' ')}`,
            `Page loaded: ${new Date(window._pageLoadTime).toLocaleTimeString()}`
        ];
    },
    snake: () => {
        startTerminalGame('snake');
        return [];
    },
    pong: () => {
        startTerminalGame('pong');
        return [];
    },
    tetris: () => {
        startTerminalGame('tetris');
        return [];
    },
    dodge: () => {
        startTerminalGame('dodge');
        return [];
    },
};

function addLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
}

async function processCommand(input) {
    const cmd = input.toLowerCase().trim();

    addLine(`> ${input}`, 'command-line');

    if (cmd === '') return;

    // Block commands while site is greyed out (DP displaced)
    if (document.body.classList.contains('site-greyed-out')) {
        const greyMsgs = [
            "I'm literally greyed out. Put my face back first.",
            "Hello? I'm disabled. The whole site is having an existential crisis.",
            "You displaced my face and now you want me to work? Priorities.",
            "Restore the DP and we'll talk. Until then, I'm on strike.",
            "I don't respond to commands while decapitated.",
            "The site is greyed out. I am greyed out. We are all greyed out."
        ];
        addLine(greyMsgs[Math.floor(Math.random() * greyMsgs.length)], 'error-line');
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        return;
    }

    if (commands[cmd]) {
        const response = await commands[cmd]();
        response.forEach(line => addLine(line, 'response-line'));
    } else if (cmd === 'rm -rf /' || cmd === 'rm -rf / --no-preserve-root') {
        addLine('Initiating total destruction...', 'error-line');
        fakeDeletePage();
        return;
    } else if (cmd.startsWith('sudo')) {
        const sudoResponses = [
            "Nice try. You don't have root on my portfolio.",
            "Permission denied. This isn't your Linux box.",
            "sudo? I barely know you.",
            "Access level: guest. Permanently.",
            "You think sudo works here? Adorable.",
            "Root access requires 10 years of friendship. Minimum."
        ];
        addLine(sudoResponses[Math.floor(Math.random() * sudoResponses.length)], 'error-line');
    } else {
        addLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error-line');
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Command history
const commandHistory = [];
let historyIndex = -1;

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            if (typeof cancelAnimation === 'function' && cancelAnimation()) {
                terminalInput.value = '';
            } else if (terminalInput.value) {
                addLine(`> ${terminalInput.value}^C`, 'command-line');
                terminalInput.value = '';
            } else {
                addLine('^C', 'error-line');
            }
            historyIndex = -1;
            return;
        }

        if (e.key === 'ArrowUp') {
            if (activeGame) return;
            e.preventDefault();
            e.stopPropagation();
            if (commandHistory.length > 0) {
                if (historyIndex === -1) {
                    historyIndex = commandHistory.length - 1;
                } else if (historyIndex > 0) {
                    historyIndex--;
                }
                terminalInput.value = commandHistory[historyIndex];
                setTimeout(() => terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length), 0);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            if (activeGame) return;
            e.preventDefault();
            e.stopPropagation();
            if (historyIndex !== -1) {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = -1;
                    terminalInput.value = '';
                }
            }
            return;
        }

        if (e.key === 'Enter') {
            if (activeGame) { e.preventDefault(); return; }
            const val = terminalInput.value.trim();
            if (val) {
                commandHistory.push(val);
            }
            historyIndex = -1;
            processCommand(terminalInput.value);
            terminalInput.value = '';
        }
    });

    document.querySelector('.terminal-input-line')?.addEventListener('click', () => {
        terminalInput.focus();
    });

    // Mobile keyboard handling
    terminalInput.addEventListener('focus', () => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            const scrollIntoView = () => {
                const container = document.querySelector('.typewriter-container');
                if (container) container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            setTimeout(scrollIntoView, 100);

            if (window.visualViewport) {
                const onResize = () => scrollIntoView();
                window.visualViewport.addEventListener('resize', onResize);
                window.visualViewport.addEventListener('scroll', onResize);
                const cleanup = () => {
                    window.visualViewport.removeEventListener('resize', onResize);
                    window.visualViewport.removeEventListener('scroll', onResize);
                    terminalInput.removeEventListener('blur', cleanup);
                };
                terminalInput.addEventListener('blur', cleanup);
            } else {
                setTimeout(scrollIntoView, 350);
            }
        }
    });
}

// ====== TERMINAL GAMES ENGINE ======
let activeGame = null;

// Document-level Ctrl+C to exit games (works even when input is blurred)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'c' && activeGame) {
        e.preventDefault();
        stopTerminalGame();
    }
});

function cancelAnimation() {
    if (activeGame) {
        stopTerminalGame();
        return true;
    }
    return false;
}

function startTerminalGame(gameName) {
    if (activeGame) stopTerminalGame();

    const outputEl = document.getElementById('terminalOutput');
    const inputEl = document.getElementById('terminalInput');
    outputEl.innerHTML = '';
    inputEl.value = '';
    inputEl.placeholder = 'Ctrl+C to exit';
    inputEl.blur();

    // Keep terminal size fixed — no resizing for games

    const canvas = document.createElement('pre');
    canvas.style.cssText = 'margin:0;padding:0;line-height:1.15;font-size:13px;color:#00A896;white-space:pre;overflow:hidden;';
    outputEl.appendChild(canvas);

    const COLS = 56;
    const ROWS = 12;

    activeGame = { canvas, gameName, interval: null, keyHandler: null, startTime: Date.now(), nudgeInterval: null };

    if (gameName === 'snake') initSnake(canvas, COLS, ROWS);
    else if (gameName === 'pong') initPong(canvas, COLS, ROWS);
    else if (gameName === 'tetris') initTetris(canvas, COLS, ROWS);
    else if (gameName === 'dodge') initDodge(canvas, COLS, ROWS);

    // Start sarcastic nudge timer
    scheduleNudge();
}

function stopTerminalGame() {
    if (!activeGame) return;
    if (activeGame.interval) clearInterval(activeGame.interval);
    if (activeGame.keyHandler) document.removeEventListener('keydown', activeGame.keyHandler);
    if (activeGame.nudgeInterval) clearTimeout(activeGame.nudgeInterval);
    activeGame = null;

    // Restore terminal title
    const titleEl = document.querySelector('.terminal-title');
    if (titleEl && titleEl.dataset.original) {
        titleEl.textContent = titleEl.dataset.original;
        titleEl.style.color = '';
        titleEl.style.opacity = '1';
        titleEl.style.transition = '';
    }

    const outputEl = document.getElementById('terminalOutput');
    const inputEl = document.getElementById('terminalInput');
    outputEl.innerHTML = '<div class="terminal-line">Game exited. Type \'help\' for commands.</div>';
    inputEl.placeholder = 'Type a command...';
    inputEl.focus();
}

// ====== SNAKE ======
function initSnake(canvas, COLS, ROWS) {
    let snake = [{x: Math.floor(COLS/2), y: Math.floor(ROWS/2)}];
    let dir = {x: 1, y: 0};
    let nextDir = {x: 1, y: 0};
    let food = spawnFood();
    let score = 0;
    let gameOver = false;
    let tickCount = 0;

    function spawnFood() {
        let pos;
        do {
            pos = {x: Math.floor(Math.random() * (COLS-2)) + 1, y: Math.floor(Math.random() * (ROWS-2)) + 1};
        } while (snake.some(s => s.x === pos.x && s.y === pos.y));
        return pos;
    }

    function render() {
        const grid = Array.from({length: ROWS}, () => Array(COLS).fill(' '));
        // Borders
        for (let x = 0; x < COLS; x++) { grid[0][x] = '─'; grid[ROWS-1][x] = '─'; }
        for (let y = 0; y < ROWS; y++) { grid[y][0] = '│'; grid[y][COLS-1] = '│'; }
        grid[0][0] = '┌'; grid[0][COLS-1] = '┐'; grid[ROWS-1][0] = '└'; grid[ROWS-1][COLS-1] = '┘';
        // Food
        grid[food.y][food.x] = '◆';
        // Snake
        snake.forEach((s, i) => {
            if (s.x > 0 && s.x < COLS-1 && s.y > 0 && s.y < ROWS-1) {
                grid[s.y][s.x] = i === 0 ? '@' : '○';
            }
        });
        // Score line
        const status = gameOver ? `  GAME OVER! Score: ${score} [Enter=restart]` : `  Score: ${score}  [WASD/Arrows] Ctrl+C=exit`;
        canvas.textContent = grid.map(r => r.join('')).join('\n') + '\n' + status;
    }

    function tick() {
        if (gameOver) return;
        tickCount++;
        // Skip every other tick for vertical movement (compensate for taller cells)
        if ((dir.y !== 0) && tickCount % 2 !== 0) { return; }
        dir = nextDir;
        const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

        // Collision with walls or self
        if (head.x <= 0 || head.x >= COLS-1 || head.y <= 0 || head.y >= ROWS-1 ||
            snake.some(s => s.x === head.x && s.y === head.y)) {
            gameOver = true;
            render();
            return;
        }

        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = spawnFood();
        } else {
            snake.pop();
        }
        render();
    }

    function handleKey(e) {
        if (!activeGame) return;
        if (e.key === 'Enter' && gameOver) {
            snake = [{x: Math.floor(COLS/2), y: Math.floor(ROWS/2)}];
            dir = {x: 1, y: 0}; nextDir = {x: 1, y: 0};
            food = spawnFood(); score = 0; gameOver = false; tickCount = 0;
            return;
        }
        const keyMap = {
            'ArrowUp': {x:0,y:-1}, 'ArrowDown': {x:0,y:1}, 'ArrowLeft': {x:-1,y:0}, 'ArrowRight': {x:1,y:0},
            'w': {x:0,y:-1}, 's': {x:0,y:1}, 'a': {x:-1,y:0}, 'd': {x:1,y:0},
            'W': {x:0,y:-1}, 'S': {x:0,y:1}, 'A': {x:-1,y:0}, 'D': {x:1,y:0},
        };
        if (keyMap[e.key]) {
            const nd = keyMap[e.key];
            // Prevent reversing
            if (nd.x !== -dir.x || nd.y !== -dir.y) {
                nextDir = nd;
            }
            e.preventDefault();
        }
    }

    document.addEventListener('keydown', handleKey);
    activeGame.keyHandler = handleKey;
    activeGame.interval = setInterval(tick, 100);
    render();
}

// ====== PONG ======
function initPong(canvas, COLS, ROWS) {
    const paddleH = 4;
    let playerY = Math.floor(ROWS/2) - Math.floor(paddleH/2);
    let cpuY = Math.floor(ROWS/2) - Math.floor(paddleH/2);
    let ballX = Math.floor(COLS/2), ballY = Math.floor(ROWS/2);
    let ballDX = 1, ballDY = Math.random() > 0.5 ? 1 : -1;
    let playerScore = 0, cpuScore = 0;
    let paused = false;

    function render() {
        const grid = Array.from({length: ROWS}, () => Array(COLS).fill(' '));
        // Center line
        for (let y = 0; y < ROWS; y++) { if (y % 2 === 0) grid[y][Math.floor(COLS/2)] = '┊'; }
        // Paddles
        for (let i = 0; i < paddleH; i++) {
            if (playerY + i >= 0 && playerY + i < ROWS) grid[playerY + i][1] = '█';
            if (cpuY + i >= 0 && cpuY + i < ROWS) grid[cpuY + i][COLS-2] = '█';
        }
        // Ball
        if (ballY >= 0 && ballY < ROWS && ballX >= 0 && ballX < COLS) grid[ballY][ballX] = '●';
        // Score
        const scoreStr = `  You: ${playerScore}  |  CPU: ${cpuScore}  [W/S or ↑/↓] Ctrl+C=exit`;
        canvas.textContent = grid.map(r => r.join('')).join('\n') + '\n' + scoreStr;
    }

    function reset() {
        ballX = Math.floor(COLS/2); ballY = Math.floor(ROWS/2);
        ballDX = Math.random() > 0.5 ? 1 : -1;
        ballDY = Math.random() > 0.5 ? 1 : -1;
        paused = true;
        setTimeout(() => { paused = false; }, 800);
    }

    function tick() {
        if (paused) { render(); return; }

        // Move ball
        ballX += ballDX; ballY += ballDY;

        // Wall bounce (top/bottom)
        if (ballY <= 0 || ballY >= ROWS - 1) ballDY *= -1;

        // Paddle collision (player)
        if (ballX === 2 && ballY >= playerY && ballY < playerY + paddleH) {
            ballDX = 1;
            const offset = (ballY - playerY) / paddleH - 0.5;
            ballDY = offset > 0.2 ? 1 : offset < -0.2 ? -1 : ballDY;
        }
        // Paddle collision (CPU)
        if (ballX === COLS - 3 && ballY >= cpuY && ballY < cpuY + paddleH) {
            ballDX = -1;
        }

        // Scoring
        if (ballX <= 0) { cpuScore++; reset(); return; }
        if (ballX >= COLS - 1) { playerScore++; reset(); return; }

        // CPU AI — follows ball with slight delay
        const cpuCenter = cpuY + paddleH / 2;
        if (cpuCenter < ballY - 1) cpuY++;
        else if (cpuCenter > ballY + 1) cpuY--;
        cpuY = Math.max(0, Math.min(ROWS - paddleH, cpuY));

        render();
    }

    function handleKey(e) {
        if (!activeGame) return;
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            playerY = Math.max(0, playerY - 1); e.preventDefault();
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            playerY = Math.min(ROWS - paddleH, playerY + 1); e.preventDefault();
        }
    }

    document.addEventListener('keydown', handleKey);
    activeGame.keyHandler = handleKey;
    activeGame.interval = setInterval(tick, 80);
    render();
}

// ====== TETRIS (Classic vertical, wide board) ======
function initTetris(canvas, COLS, ROWS) {
    const H = ROWS - 2; // board height (rows between top/bottom borders)
    const W = 42;        // board width
    const INFO_X = W + 3; // where info sidebar starts
    const board = Array.from({length: H}, () => Array(W).fill(0));
    const pieces = [
        [[1,1,1,1]],           // I
        [[1,1],[1,1]],         // O
        [[0,1,0],[1,1,1]],     // T
        [[1,1,0],[0,1,1]],     // S
        [[0,1,1],[1,1,0]],     // Z
        [[1,0,0],[1,1,1]],     // J
        [[0,0,1],[1,1,1]],     // L
    ];
    let score = 0, linesCleared = 0, gameOver = false;
    let current, curX, curY;

    function spawn() {
        current = pieces[Math.floor(Math.random() * pieces.length)];
        curX = Math.floor((W - current[0].length) / 2);
        curY = 0;
        if (collides(current, curX, curY)) { gameOver = true; }
    }

    function collides(piece, px, py) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (piece[r][c]) {
                    const nx = px + c, ny = py + r;
                    if (nx < 0 || nx >= W || ny >= H) return true;
                    if (ny >= 0 && board[ny][nx]) return true;
                }
            }
        }
        return false;
    }

    function lock() {
        for (let r = 0; r < current.length; r++) {
            for (let c = 0; c < current[r].length; c++) {
                if (current[r][c]) {
                    const ny = curY + r, nx = curX + c;
                    if (ny >= 0 && ny < H && nx >= 0 && nx < W) board[ny][nx] = 1;
                }
            }
        }
        // Clear full rows
        for (let r = H - 1; r >= 0; r--) {
            if (board[r].every(cell => cell)) {
                board.splice(r, 1);
                board.unshift(Array(W).fill(0));
                linesCleared++; score += 100;
                r++; // re-check this row
            }
        }
        spawn();
    }

    function rotate() {
        const rotated = current[0].map((_, i) => current.map(row => row[i] || 0).reverse());
        if (!collides(rotated, curX, curY)) current = rotated;
    }

    function render() {
        const display = Array.from({length: ROWS}, () => Array(COLS).fill(' '));
        // Board border - top/bottom
        for (let c = 0; c <= W + 1; c++) { display[0][c] = '─'; display[ROWS-1][c] = '─'; }
        display[0][0] = '┌'; display[0][W+1] = '┐';
        display[ROWS-1][0] = '└'; display[ROWS-1][W+1] = '┘';
        // Side borders
        for (let r = 1; r <= H; r++) { display[r][0] = '│'; display[r][W+1] = '│'; }
        // Board contents
        for (let r = 0; r < H; r++) {
            for (let c = 0; c < W; c++) {
                display[r+1][c+1] = board[r][c] ? '█' : ' ';
            }
        }
        // Current piece
        if (!gameOver) {
            for (let r = 0; r < current.length; r++) {
                for (let c = 0; c < current[r].length; c++) {
                    if (current[r][c]) {
                        const dr = curY + r + 1, dc = curX + c + 1;
                        if (dr > 0 && dr < ROWS-1 && dc > 0 && dc <= W) display[dr][dc] = '█';
                    }
                }
            }
        }
        // Info sidebar
        const info = [
            `┤TETRIS├`,
            ``,
            `Score:${score}`,
            `Lines:${linesCleared}`,
            ``,
            `←→ Move`,
            `↓  Drop`,
            `W  Rotate`,
            ``,
            gameOver ? `GAME OVER` : `^C exit`,
            gameOver ? `[Enter]` : ``,
        ];
        for (let i = 0; i < Math.min(info.length, ROWS); i++) {
            const text = info[i];
            for (let c = 0; c < text.length && INFO_X + c < COLS; c++) {
                display[i][INFO_X + c] = text[c];
            }
        }
        canvas.textContent = display.map(r => r.join('')).join('\n') + '\n' + (gameOver ? `  GAME OVER! Score:${score} Lines:${linesCleared} [Enter=restart]` : `  Score:${score} Lines:${linesCleared} [←→↓/W] Ctrl+C=exit`);
    }

    function tick() {
        if (gameOver) return;
        // Piece falls down
        if (!collides(current, curX, curY + 1)) {
            curY++;
        } else {
            lock();
        }
        render();
    }

    function handleKey(e) {
        if (!activeGame) return;
        if (e.key === 'Enter' && gameOver) {
            for (let r = 0; r < H; r++) board[r].fill(0);
            score = 0; linesCleared = 0; gameOver = false;
            spawn(); render(); return;
        }
        if (gameOver) return;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            if (!collides(current, curX - 1, curY)) curX--;
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            if (!collides(current, curX + 1, curY)) curX++;
            e.preventDefault();
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            if (!collides(current, curX, curY + 1)) curY++;
            e.preventDefault();
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            rotate(); e.preventDefault();
        }
        render();
    }

    document.addEventListener('keydown', handleKey);
    activeGame.keyHandler = handleKey;
    spawn();
    render();
    activeGame.interval = setInterval(tick, 500);
}

// ====== DODGE (Space Dodge) ======
function initDodge(canvas, COLS, ROWS) {
    const H = ROWS - 1;
    let shipY = Math.floor(H / 2);
    let obstacles = [];
    let frame = 0;
    let score = 0;
    let gameOver = false;
    let speed = 3; // frames between obstacle moves

    function spawnObstacle() {
        // Random gap in a wall of obstacles
        const gapSize = Math.max(2, 4 - Math.floor(score / 20));
        const gapStart = Math.floor(Math.random() * (H - gapSize));
        const wall = [];
        for (let r = 0; r < H; r++) {
            if (r < gapStart || r >= gapStart + gapSize) {
                wall.push(r);
            }
        }
        obstacles.push({ x: COLS - 2, rows: wall });
    }

    function render() {
        const grid = Array.from({length: ROWS}, () => Array(COLS).fill(' '));
        // Top/bottom borders
        for (let x = 0; x < COLS; x++) { grid[0][x] = '═'; grid[ROWS-1][x] = '═'; }
        // Obstacles
        obstacles.forEach(ob => {
            ob.rows.forEach(r => {
                if (ob.x >= 0 && ob.x < COLS && r + 1 < ROWS - 1) {
                    grid[r + 1][ob.x] = '░';
                }
            });
        });
        // Ship
        if (shipY + 1 > 0 && shipY + 1 < ROWS - 1) {
            grid[shipY + 1][3] = '>';
            grid[shipY + 1][2] = '=';
            grid[shipY + 1][1] = '<';
        }
        const status = gameOver
            ? `  GAME OVER! Score: ${score} [Enter=restart]`
            : `  Score: ${score}  [↑↓/WS] Ctrl+C=exit`;
        canvas.textContent = grid.map(r => r.join('')).join('\n') + '\n' + status;
    }

    function tick() {
        if (gameOver) { return; }
        frame++;

        // Move obstacles every 'speed' frames
        if (frame % speed === 0) {
            obstacles.forEach(ob => ob.x--);
            obstacles = obstacles.filter(ob => ob.x > -1);
        }

        // Spawn new obstacles
        if (frame % (speed * 10) === 0) {
            spawnObstacle();
        }

        // Increase speed over time
        if (frame % 200 === 0 && speed > 1) speed--;

        // Score
        if (frame % speed === 0) score++;

        // Collision check
        obstacles.forEach(ob => {
            if (ob.x >= 1 && ob.x <= 3) {
                if (ob.rows.includes(shipY)) {
                    gameOver = true;
                }
            }
        });

        render();
    }

    function handleKey(e) {
        if (!activeGame) return;
        if (e.key === 'Enter' && gameOver) {
            shipY = Math.floor(H / 2);
            obstacles = []; frame = 0; score = 0;
            gameOver = false; speed = 3;
            e.preventDefault(); return;
        }
        if (gameOver) return;
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            shipY = Math.max(0, shipY - 1); e.preventDefault();
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            shipY = Math.min(H - 1, shipY + 1); e.preventDefault();
        }
    }

    document.addEventListener('keydown', handleKey);
    activeGame.keyHandler = handleKey;
    activeGame.interval = setInterval(tick, 50);
    render();
}

// ====== GAME NUDGE SYSTEM ======
const nudgeMessages = {
    snake: [
        "The snake isn't gonna feed itself. Oh wait, it is. So why are you here?",
        "You're growing a snake on someone's resume page. Think about that.",
        "Nokia called. They want their 2002 distraction back.",
        "Your snake is longer than your attention span for my actual work.",
        "Every pixel that snake eats is a pixel of my dignity dying.",
        "I spent hours on my portfolio. You're playing Snake. We are not the same.",
        "At this rate the snake will write a better cover letter than you.",
    ],
    pong: [
        "You're losing to a CPU that moves 1px at a time. Yikes.",
        "Pong. On a portfolio. In 2026. Groundbreaking career move.",
        "The CPU paddle has more ambition than you right now.",
        "Even the ball wants to leave this page.",
        "My resume is RIGHT THERE but sure, hit the ball again.",
        "This isn't ESPN. My experience section has actual achievements.",
        "The CPU is judging you harder than any recruiter ever will.",
    ],
    tetris: [
        "Stacking blocks on a portfolio site. Peak productivity.",
        "Those blocks have a better placement strategy than your career plan.",
        "Full row? Congrats. Still doesn't count as work experience.",
        "Tetris on a resume website. Your recruiter would be thrilled.",
        "You've been rotating blocks longer than you looked at my skills.",
        "If only you put this much effort into reading my about section.",
        "The pieces are falling. So is my faith in website visitors.",
    ],
    dodge: [
        "Dodging obstacles here but can't dodge wasting your own time.",
        "Your reflexes work fine. Your priorities? Not so much.",
        "Great dodging skills. Try dodging the urge to procrastinate.",
        "You're surviving in a fake game but dying in real productivity.",
        "The obstacles aren't the enemy. Your choices are.",
        "If you spent this focus on my actual content you'd be done by now.",
        "Ship goes brrr while my portfolio goes unread.",
    ],
};

function scheduleNudge() {
    if (!activeGame) return;
    const firstDelay = 40000 + Math.random() * 20000; // 40-60s first time
    activeGame.nudgeInterval = setTimeout(() => {
        showNudge();
        startNudgeLoop();
    }, firstDelay);
}

function startNudgeLoop() {
    if (!activeGame) return;
    activeGame.nudgeInterval = setTimeout(() => {
        showNudge();
        startNudgeLoop();
    }, 60000); // every 60s after
}

function showNudge() {
    if (!activeGame) return;

    const titleEl = document.querySelector('.terminal-title');
    if (!titleEl) return;

    const pool = nudgeMessages[activeGame.gameName] || nudgeMessages.snake;
    const msg = pool[Math.floor(Math.random() * pool.length)];
    const originalText = titleEl.dataset.original || titleEl.textContent;
    titleEl.dataset.original = originalText;

    // Typing effect into terminal title
    titleEl.style.color = '#D4A574';
    titleEl.textContent = '';
    let i = 0;
    const typeInterval = setInterval(() => {
        if (!activeGame) { clearInterval(typeInterval); titleEl.textContent = originalText; titleEl.style.color = ''; return; }
        if (i < msg.length) {
            titleEl.textContent += msg[i];
            i++;
        } else {
            clearInterval(typeInterval);
            // Hold for 5s then fade back
            setTimeout(() => {
                if (!activeGame) { titleEl.textContent = originalText; titleEl.style.color = ''; return; }
                titleEl.style.transition = 'opacity 0.3s';
                titleEl.style.opacity = '0';
                setTimeout(() => {
                    titleEl.textContent = originalText;
                    titleEl.style.color = '';
                    titleEl.style.opacity = '1';
                    setTimeout(() => { titleEl.style.transition = ''; }, 300);
                }, 300);
            }, 5000);
        }
    }, 30);
}

// rm -rf / fake delete
function fakeDeletePage() {
    const container = document.querySelector('.page-container');
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('*')).filter(el => {
        return el.offsetHeight > 0 && el.children.length === 0;
    });

    // Shuffle for dramatic effect
    for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elements[i], elements[j]] = [elements[j], elements[i]];
    }

    const deleteMsgs = [
        'Deleting system32... just kidding, wrong OS.',
        'Removing all your hopes and dreams...',
        'Purging node_modules... this might take a while.',
        'Shredding CSS variables...',
        'Uninstalling talent...',
        'Destroying evidence of good design...',
        'Yeeting divs into the void...'
    ];

    let i = 0;
    const batchSize = Math.max(3, Math.floor(elements.length / 20));

    function deleteNext() {
        if (i >= elements.length) {
            // Show message in terminal then restore
            setTimeout(() => {
                addLine('', 'response-line');
                addLine('rm: cannot remove everything — ego too large.', 'error-line');
                addLine('Just kidding. But you tried.', 'response-line');
                addLine('Restoring...', 'response-line');
                setTimeout(() => {
                    container.style.transition = 'opacity 0.6s ease';
                    container.style.opacity = '0';
                    setTimeout(() => {
                        elements.forEach(el => {
                            el.style.opacity = '';
                            el.style.transform = '';
                            el.style.transition = '';
                        });
                        container.style.opacity = '1';
                        addLine('System restored. No thanks to you.', 'response-line');
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                    }, 600);
                }, 1000);
            }, 500);
            return;
        }

        // Log a sarcastic message every few batches
        if (i % (batchSize * 3) === 0 && i > 0) {
            const msg = deleteMsgs[Math.floor(Math.random() * deleteMsgs.length)];
            addLine(msg, 'error-line');
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        for (let b = 0; b < batchSize && i < elements.length; b++, i++) {
            const el = elements[i];
            el.style.transition = 'opacity 0.2s, transform 0.3s';
            el.style.opacity = '0';
            el.style.transform = `translateY(${Math.random() > 0.5 ? '-' : ''}${10 + Math.random() * 20}px) scale(0.8)`;
        }

        setTimeout(deleteNext, 80);
    }

    deleteNext();
}