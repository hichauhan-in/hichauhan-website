// Main JavaScript for Himanshu Chauhan Personal Website
// Handles navigation, interactions, animations, and terminal functionality

window._pageLoadTime = Date.now();

class PersonalWebsite {
    constructor() {
        this.commandPalette = document.getElementById('commandPalette');
        this.commandInput = document.getElementById('commandInput');
        this.terminalOutput = document.getElementById('terminalOutput');
        this.navDock = document.getElementById('navDock');
        this.backgroundCanvas = document.getElementById('background-canvas');
        
        // Expanded terminal elements
        this.terminalOverlay = document.getElementById('terminalOverlay');
        this.expandedTerminal = document.getElementById('expandedTerminal');
        this.expandedTerminalOutput = document.getElementById('expandedTerminalOutput');
        this.expandedTerminalInput = document.getElementById('expandedTerminalInput');
        this.isExpandedTerminalOpen = false;
        
        this.isCommandPaletteOpen = false;
        this.currentTerminalLine = 0;
        this.terminalCommands = {
            'help': this.showHelp.bind(this),
            'contact': this.navigateToContact.bind(this),
            'con': this.navigateToContact.bind(this),
            'linkedin': this.openLinkedIn.bind(this),
            'cv': this.downloadResume.bind(this),
            'resume': this.downloadResume.bind(this),
            'location': this.showLocation.bind(this),
            'experience': this.navigateToExperience.bind(this),
            'exp': this.navigateToExperience.bind(this),
            'projects': this.navigateToProjects.bind(this),
            'project': this.navigateToProjects.bind(this),
            'pro': this.navigateToProjects.bind(this),
            'education': this.navigateToEducation.bind(this),
            'edu': this.navigateToEducation.bind(this),
            'skills': this.navigateToSkills.bind(this),
            'skill': this.navigateToSkills.bind(this),
            'skl': this.navigateToSkills.bind(this),
            'clear': this.clearTerminal.bind(this),
            'cls': this.clearTerminal.bind(this),
            'whoami': this.showWhoami.bind(this),
            'about': this.showAbout.bind(this),
            'date': this.showDate.bind(this),
            'uptime': this.showUptime.bind(this),
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeTerminal();
        this.setupScrollAnimations();
        this.createBackgroundAnimation();
        this.setupCommandPalette();
        this.setupMobileNavigation();
        this.setupExpandedTerminal();
    }
    
    setupExpandedTerminal() {
        const typewriterContainer = document.querySelector('.typewriter-container');
        const terminalOutputEl = document.getElementById('terminalOutput');
        const terminalHeader = document.querySelector('.terminal-header');
        
        if (typewriterContainer && this.terminalOverlay) {
            // Click on terminal output or header to expand (not input area)
            if (terminalOutputEl) {
                terminalOutputEl.addEventListener('click', () => {
                    this.openExpandedTerminal();
                });
            }
            
            if (terminalHeader) {
                terminalHeader.addEventListener('click', () => {
                    this.openExpandedTerminal();
                });
            }
            
            // Close buttons
            const closeBtn = document.getElementById('expandedTerminalCloseBtn');
            const closeDot = document.getElementById('expandedTerminalClose');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeExpandedTerminal());
            }
            
            if (closeDot) {
                closeDot.addEventListener('click', () => this.closeExpandedTerminal());
            }
            
            // Close on overlay click (outside terminal)
            this.terminalOverlay.addEventListener('click', (e) => {
                if (e.target === this.terminalOverlay) {
                    this.closeExpandedTerminal();
                }
            });
            
            // Handle input in expanded terminal
            if (this.expandedTerminalInput) {
                // Handle Enter key
                this.expandedTerminalInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        this.submitExpandedTerminalCommand();
                    }
                });
                
                // Also listen for keypress (some mobile keyboards use this)
                this.expandedTerminalInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        this.submitExpandedTerminalCommand();
                    }
                });
                
                // Handle 'change' event for some mobile keyboards
                this.expandedTerminalInput.addEventListener('change', () => {
                    // Some mobile keyboards submit on 'change' when pressing Go/Done
                    const command = this.expandedTerminalInput.value.trim();
                    if (command && document.activeElement !== this.expandedTerminalInput) {
                        this.submitExpandedTerminalCommand();
                    }
                });
            }
            
            // Mobile send button
            const sendBtn = document.getElementById('expandedTerminalSend');
            if (sendBtn) {
                sendBtn.addEventListener('click', () => {
                    this.submitExpandedTerminalCommand();
                    this.expandedTerminalInput?.focus();
                });
            }
            
            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isExpandedTerminalOpen) {
                    this.closeExpandedTerminal();
                }
            });
        }
    }
    
    openExpandedTerminal() {
        if (!this.terminalOverlay) return;
        
        this.isExpandedTerminalOpen = true;
        this.terminalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Sync content from main terminal to expanded terminal
        this.syncTerminalContent();
        
        // Focus input after animation
        setTimeout(() => {
            if (this.expandedTerminalInput) {
                this.expandedTerminalInput.focus();
            }
        }, 400);
        
        // Animate with anime.js if available
        if (typeof anime !== 'undefined' && this.expandedTerminal) {
            anime({
                targets: this.expandedTerminal,
                scale: [0.9, 1],
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 400,
                easing: 'easeOutBack'
            });
        }
    }
    
    closeExpandedTerminal() {
        if (!this.terminalOverlay) return;
        
        // Animate out
        if (typeof anime !== 'undefined' && this.expandedTerminal) {
            anime({
                targets: this.expandedTerminal,
                scale: [1, 0.9],
                opacity: [1, 0],
                translateY: [0, 20],
                duration: 250,
                easing: 'easeInQuad',
                complete: () => {
                    this.terminalOverlay.classList.remove('active');
                    this.isExpandedTerminalOpen = false;
                    document.body.style.overflow = '';
                }
            });
        } else {
            this.terminalOverlay.classList.remove('active');
            this.isExpandedTerminalOpen = false;
            document.body.style.overflow = '';
        }
        
        // Sync content back to main terminal
        this.syncTerminalContentBack();
    }
    
    syncTerminalContent() {
        if (this.terminalOutput && this.expandedTerminalOutput) {
            this.expandedTerminalOutput.innerHTML = this.terminalOutput.innerHTML;
            this.expandedTerminalOutput.scrollTop = this.expandedTerminalOutput.scrollHeight;
        }
    }
    
    syncTerminalContentBack() {
        if (this.terminalOutput && this.expandedTerminalOutput) {
            this.terminalOutput.innerHTML = this.expandedTerminalOutput.innerHTML;
            this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
        }
    }
    
    submitExpandedTerminalCommand() {
        if (!this.expandedTerminalInput) return;
        
        const command = this.expandedTerminalInput.value.trim();
        if (command) {
            this.executeExpandedTerminalCommand(command);
            this.expandedTerminalInput.value = '';
        }
    }
    
    executeExpandedTerminalCommand(command) {
        if (!command) return;
        
        const cmd = command.toLowerCase().split(' ')[0];
        const args = command.split(' ').slice(1);
        
        // Show command in expanded terminal
        this.addExpandedTerminalOutput(`> ${command}`, 'command-line');
        
        // Handle clear command specially
        if (cmd === 'clear' || cmd === 'cls') {
            this.clearExpandedTerminal();
            return;
        }
        
        // Handle commands that need special handling for expanded terminal
        if (cmd === 'whoami') {
            this.showWhoamiExpanded();
            return;
        }
        
        if (cmd === 'help') {
            this.showHelpExpanded();
            return;
        }
        
        if (cmd === 'about') {
            this.showAboutExpanded();
            return;
        }
        
        if (this.terminalCommands[cmd]) {
            // Temporarily redirect output to expanded terminal
            const originalOutput = this.terminalOutput;
            this.terminalOutput = this.expandedTerminalOutput;
            
            this.terminalCommands[cmd](args);
            
            // Restore original output reference
            this.terminalOutput = originalOutput;
        } else {
            this.addExpandedTerminalOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error-line');
        }
        
        // Scroll to bottom
        if (this.expandedTerminalOutput) {
            this.expandedTerminalOutput.scrollTop = this.expandedTerminalOutput.scrollHeight;
        }
    }
    
    showWhoamiExpanded() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                this.addExpandedTerminalMultiLine([
                    'Visitor Information:',
                    `  IP Address: ${data.ip}`,
                    '  Status: Connected ✅'
                ]);
            })
            .catch(() => {
                this.addExpandedTerminalMultiLine([
                    'Visitor Information:',
                    '  IP Address: Unable to fetch',
                    '  Status: Connected ✅'
                ]);
            });
    }
    
    showHelpExpanded() {
        const helpLines = [
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
        ];
        this.addExpandedTerminalMultiLine(helpLines);
    }
    
    showAboutExpanded() {
        const aboutLines = [
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
        ];
        this.addExpandedTerminalMultiLine(aboutLines);
    }
    
    addExpandedTerminalMultiLine(lines) {
        if (!this.expandedTerminalOutput) return;
        
        lines.forEach(text => {
            const line = document.createElement('div');
            line.className = 'terminal-line response-line';
            // Use pre-wrap to preserve spaces for formatting
            line.style.whiteSpace = 'pre';
            line.textContent = text || '\u00A0'; // Use non-breaking space for empty lines
            this.expandedTerminalOutput.appendChild(line);
        });
        
        // Scroll to bottom
        this.expandedTerminalOutput.scrollTop = this.expandedTerminalOutput.scrollHeight;
    }
    
    addExpandedTerminalOutput(text, className = '') {
        if (!this.expandedTerminalOutput) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        this.expandedTerminalOutput.appendChild(line);
        
        // Scroll to bottom
        this.expandedTerminalOutput.scrollTop = this.expandedTerminalOutput.scrollHeight;
    }
    
    clearExpandedTerminal() {
        if (this.expandedTerminalOutput) {
            this.expandedTerminalOutput.innerHTML = '<div class="terminal-line">Terminal cleared. Type \'help\' for commands.</div>';
        }
    }
    
    setupMobileNavigation() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        
        if (mobileMenuToggle && mobileNavOverlay && mobileNavMenu) {
            // Toggle menu on button click
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                mobileNavOverlay.classList.toggle('active');
                mobileNavMenu.classList.toggle('active');
                document.body.style.overflow = mobileNavMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close menu on overlay click
            mobileNavOverlay.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                mobileNavMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Close menu on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mobileNavOverlay.classList.remove('active');
                    mobileNavMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    setupEventListeners() {
        // Command palette toggle (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (window.terminalDisabled) return;
                this.toggleCommandPalette();
            }
            
            if (e.key === 'Escape' && this.isCommandPaletteOpen) {
                this.closeCommandPalette();
            }
        });
        
        // Command palette input
        if (this.commandInput) {
            this.commandInput.addEventListener('input', this.handleCommandInput.bind(this));
            this.commandInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.executeCommand(this.commandInput.value.trim());
                }
            });
        }
        
        // Command suggestions
        document.querySelectorAll('.command-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                const command = suggestion.dataset.command;
                this.executeCommand(command);
                this.closeCommandPalette();
            });
        });
        
        // Terminal interaction on index page
        if (this.terminalOutput) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && this.terminalOutput.contains(document.activeElement)) {
                    this.simulateTerminalCommand();
                }
            });
        }
    }
    
    setupCommandPalette() {
        if (this.commandPalette) {
            // Close when clicking overlay
            const overlay = document.getElementById('commandOverlay');
            if (overlay) {
                overlay.addEventListener('click', () => this.closeCommandPalette());
            }
            
            // Close button
            const closeBtn = document.getElementById('commandPaletteClose');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeCommandPalette());
            }
        }
    }
    
    toggleCommandPalette() {
        if (this.isCommandPaletteOpen) {
            this.closeCommandPalette();
        } else {
            this.openCommandPalette();
        }
    }
    
    openCommandPalette() {
        if (this.commandPalette) {
            this.commandPalette.classList.add('active');
            const overlay = document.getElementById('commandOverlay');
            if (overlay) overlay.classList.add('active');
            this.isCommandPaletteOpen = true;
            
            // Focus input after animation
            setTimeout(() => {
                if (this.commandInput) {
                    this.commandInput.focus();
                    this.commandInput.value = '';
                }
            }, 100);
        }
    }
    
    closeCommandPalette() {
        if (this.commandPalette) {
            this.commandPalette.classList.remove('active');
            const overlay = document.getElementById('commandOverlay');
            if (overlay) overlay.classList.remove('active');
            this.isCommandPaletteOpen = false;
            
            if (this.commandInput) {
                this.commandInput.value = '';
            }
        }
    }
    
    handleCommandInput(e) {
        const value = e.target.value.toLowerCase();
        const suggestions = document.querySelectorAll('.command-suggestion');
        
        suggestions.forEach(suggestion => {
            const command = suggestion.dataset.command.toLowerCase();
            if (command.includes(value) || value === '') {
                suggestion.style.display = 'block';
            } else {
                suggestion.style.display = 'none';
            }
        });
    }
    
    executeCommand(command, showInTerminal = true) {
        if (!command) return;
        
        const cmd = command.toLowerCase().split(' ')[0];
        const args = command.split(' ').slice(1);
        
        // Show the command in terminal first (like when user types it manually)
        if (showInTerminal && this.terminalOutput) {
            this.showCommandInTerminal(command);
        }
        
        if (this.terminalCommands[cmd]) {
            this.terminalCommands[cmd](args);
        } else {
            this.showError(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }
        
        this.closeCommandPalette();
    }
    
    showCommandInTerminal(command) {
        if (!this.terminalOutput) return;
        
        // Remove cursor from last line
        const cursor = this.terminalOutput.querySelector('.cursor');
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        
        // Add the command line showing what was executed
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line command-line';
        commandLine.textContent = `> ${command}`;
        this.terminalOutput.appendChild(commandLine);
        
        // Animate the command line
        if (typeof anime !== 'undefined') {
            anime({
                targets: commandLine,
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }
    
    // Terminal commands
    showHelp() {
        const helpText = [
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
        ];
        this.addTerminalOutput(helpText.join('\n'));
    }
    
    navigateToContact() {
        window.location.href = 'contact.html';
    }
    
    openLinkedIn() {
        window.open('https://www.linkedin.com/in/hichauhan-in/', '_blank');
        this.addTerminalOutput('Opening LinkedIn profile...');
    }
    
    downloadResume() {
        window.location.href = 'cv.html';
    }
    
    showLocation() {
        this.addTerminalOutput('📍 Location: Bangalore, India\nTimezone: IST (UTC+5:30)');
    }
    
    navigateToExperience() {
        window.location.href = 'experience.html';
    }
    
    navigateToProjects() {
        window.location.href = 'projects.html';
    }
    
    navigateToEducation() {
        window.location.href = 'education.html';
    }
    
    navigateToSkills() {
        window.location.href = 'skills.html';
    }
    
    showAbout() {
        const aboutInfo = [
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
        ];
        this.addTerminalOutput(aboutInfo.join('\n'));
    }
    
    clearTerminal() {
        if (this.terminalOutput) {
            this.terminalOutput.innerHTML = '<div class="terminal-line">Terminal cleared. Type \'help\' for commands.</div>';
            this.currentTerminalLine = 0;
        }
    }
    
    showWhoami() {
        // Fetch visitor IP and show info (same as typed command)
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                this.addMultiLineOutput([
                    'Visitor Information:',
                    `  IP Address: ${data.ip}`,
                    '  Status: Connected ✅'
                ]);
            })
            .catch(() => {
                this.addMultiLineOutput([
                    'Visitor Information:',
                    '  IP Address: Unable to fetch',
                    '  Status: Connected ✅'
                ]);
            });
    }
    
    addMultiLineOutput(lines) {
        if (!this.terminalOutput) return;
        
        // Remove cursor from last line
        const cursor = this.terminalOutput.querySelector('.cursor');
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        
        // Add each line separately
        lines.forEach(text => {
            const line = document.createElement('div');
            line.className = 'terminal-line response-line';
            line.textContent = text;
            this.terminalOutput.appendChild(line);
        });
        
        // Add cursor to new line
        const cursorElement = document.createElement('span');
        cursorElement.className = 'cursor';
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line';
        cursorLine.textContent = '> ';
        cursorLine.appendChild(cursorElement);
        this.terminalOutput.appendChild(cursorLine);
        
        // Scroll to bottom
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }
    
    showDate() {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false
        });
        this.addTerminalOutput(`${dateString}\n${timeString}`);
    }
    
    showUptime() {
        const now = Date.now();
        const elapsed = now - window._pageLoadTime;
        const secs = Math.floor(elapsed / 1000);
        const mins = Math.floor(secs / 60);
        const hrs = Math.floor(mins / 60);
        const d = Math.floor(hrs / 24);
        const parts = [];
        if (d > 0) parts.push(`${d}d`);
        if (hrs % 24 > 0) parts.push(`${hrs % 24}h`);
        if (mins % 60 > 0) parts.push(`${mins % 60}m`);
        parts.push(`${secs % 60}s`);
        this.addTerminalOutput(`Session uptime: ${parts.join(' ')}\nPage loaded: ${new Date(window._pageLoadTime).toLocaleTimeString()}`);
    }

    showError(message) {
        this.addTerminalOutput(`Error: ${message}`, 'error');
    }
    
    addTerminalOutput(text, type = 'normal') {
        if (!this.terminalOutput) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        
        // Remove cursor from last line
        const cursor = this.terminalOutput.querySelector('.cursor');
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        
        this.terminalOutput.appendChild(line);
        
        // Add cursor to new line
        const cursorElement = document.createElement('span');
        cursorElement.className = 'cursor';
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line';
        cursorLine.textContent = '> ';
        cursorLine.appendChild(cursorElement);
        this.terminalOutput.appendChild(cursorLine);
        
        // Scroll to bottom
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
        
        // Animate new line
        anime({
            targets: line,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    initializeTerminal() {
        if (!this.terminalOutput) return;
        
        // Initial terminal content
        const initialContent = [
            'Welcome to the Terminal!',
            'Type \'help\' to see available commands.'
        ];
        
        this.terminalOutput.innerHTML = '';
        initialContent.forEach((line, index) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            lineElement.textContent = line;
            
            if (index === initialContent.length - 1) {
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                lineElement.appendChild(cursor);
            }
            
            this.terminalOutput.appendChild(lineElement);
        });
        
        this.currentTerminalLine = initialContent.length - 1;
    }
    
    simulateTerminalCommand() {
        const commands = ['help', 'contact', 'whoami', 'date', 'uptime'];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        
        setTimeout(() => {
            this.executeCommand(randomCommand);
        }, 500);
    }
    
    setupScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Stagger animations for cards
        const cardGroups = document.querySelectorAll('.expertise-grid, .philosophy-points, .tech-list');
        cardGroups.forEach(group => {
            const cards = group.querySelectorAll('.expertise-card, .philosophy-card, .tech-item');
            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 100}ms`;
            });
        });
    }
    
    createBackgroundAnimation() {
        if (!this.backgroundCanvas) return;
        
        // Create p5.js sketch for background particles
        const sketch = (p) => {
            let particles = [];
            let connections = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('background-canvas');
                
                // Create particles
                const particleCount = Math.floor(p.windowWidth * p.windowHeight / 40000);
                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 4)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(0, 168, 150, 100);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                });
                
                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        if (dist < 100) {
                            const alpha = p.map(dist, 0, 100, 50, 0);
                            p.stroke(0, 168, 150, alpha);
                            p.strokeWeight(1);
                            p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        }
                    }
                }
            };
            
            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };
        
        new p5(sketch);
    }
}

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
    
    // Show the command entered
    addLine(`> ${input}`, 'command-line');
    
    if (cmd === '') return;
    
    if (commands[cmd]) {
        const response = await commands[cmd]();
        response.forEach(line => addLine(line, 'response-line'));
    } else {
        addLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error-line');
    }
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Command history
const commandHistory = [];
let historyIndex = -1;

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        // Ctrl+C to cancel
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

        // Up arrow - previous command
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
                // Move cursor to end
                setTimeout(() => terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length), 0);
            }
            return;
        }

        // Down arrow - next command
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
    
    // Focus terminal input when clicking on input line area
    document.querySelector('.terminal-input-line')?.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Detect if device has touch capability (works for mobile in desktop mode too)
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    // Mobile keyboard handling - scroll to keep terminal visible
    const scrollTerminalIntoView = () => {
        const terminalContainer = document.querySelector('.typewriter-container');
        if (terminalContainer) {
            // Use scrollIntoView for more reliable mobile behavior
            terminalContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };
    
    terminalInput.addEventListener('focus', () => {
        if (isTouchDevice()) {
            // Initial scroll attempt
            setTimeout(scrollTerminalIntoView, 100);
            
            // Handle visual viewport resize (keyboard appearing)
            if (window.visualViewport) {
                const handleViewportResize = () => {
                    scrollTerminalIntoView();
                };
                
                window.visualViewport.addEventListener('resize', handleViewportResize);
                window.visualViewport.addEventListener('scroll', handleViewportResize);
                
                // Clean up listeners on blur
                const cleanup = () => {
                    window.visualViewport.removeEventListener('resize', handleViewportResize);
                    window.visualViewport.removeEventListener('scroll', handleViewportResize);
                    terminalInput.removeEventListener('blur', cleanup);
                };
                terminalInput.addEventListener('blur', cleanup);
            } else {
                // Fallback for browsers without visualViewport
                setTimeout(scrollTerminalIntoView, 350);
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PersonalWebsite();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalWebsite;
}