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
        terminalOutput.innerHTML = `
            <div class="terminal-line">Welcome to the Terminal!.</div>
            <div class="terminal-line">Type 'help' to see available commands.</div>
        `;
        return [];
    },
    cls: () => {
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

    if (commands[cmd]) {
        const response = await commands[cmd]();
        response.forEach(line => addLine(line, 'response-line'));
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
