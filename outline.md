# Project Outline - Himanshu Chauhan Personal Website

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Main landing page (About + Contact)
├── experience.html          # Professional experience & certifications
├── education.html          # Education background
├── projects.html           # Projects portfolio
├── personal.html           # Personal interests & fun page
├── main.js                 # Core JavaScript functionality
├── resources/              # Media assets folder
│   ├── logo.png           # Generated monogram logo
│   ├── hero-bg.jpg        # Dark tech hero image
│   ├── network-viz.jpg    # Network topology visualization
│   ├── datacenter.jpg     # Data center ambient image
│   ├── workspace.jpg      # Network engineer workspace
│   └── cloud-arch.jpg     # Cloud architecture diagram
├── interaction.md          # Interaction design documentation
├── design.md              # Design style guide
└── outline.md             # This project outline
```

## Page Organization & Content

### 1. index.html - Main Landing Page
**Purpose**: Personal introduction with integrated contact system

**Sections**:
- **Hero Area**: 
  - Minimal introduction (not "Hi, I'm X")
  - Identity statement: "Support Escalation Engineer crafting digital infrastructure"
  - Subtle background with network particle system
- **Terminal Contact Interface**:
  - Command-line style contact system
  - Commands: `contact`, `linkedin`, `resume`, `location`
  - Typewriter animations
- **Mindset & Philosophy**:
  - Approach to problem-solving
  - Technical expertise areas (DNS, TCP/IP, Azure)
  - Career focus and aspirations
- **Visual Cues**:
  - Subtle animations pointing to explore more
  - Command palette hint (`Ctrl+K`)

### 2. experience.html - Professional Experience
**Purpose**: Timeline storytelling with impact metrics

**Sections**:
- **Career Timeline**:
  - Microsoft Support Escalation Engineer (2021-Present)
  - Microsoft Internship (Apr-Jul 2021)
  - Interactive nodes with expandable details
- **Achievement Highlights**:
  - 7 SME accreditations
  - CSAT >4.95 consistently
  - 200+ DNS issues resolved
  - Sev A incident ownership
- **Certification Showcase**:
  - Interactive hexagonal badges
  - Microsoft AI Fundamentals (AI-900)
  - Microsoft AI Associate (AI-102)
  - CCNA Foundations & Intermediate
  - Azure Fundamentals (AZ-900)
  - Software Defined Networking
- **Skills Matrix**:
  - Interactive radar chart showing expertise levels
  - DNS, TCP/IP, VPN, Active Directory, etc.

### 3. education.html - Education Background
**Purpose**: Clean, minimal academic credentials

**Sections**:
- **Current Education**:
  - MSc Data Science (Manipal Academy, ongoing, 9.2 GPA)
  - Expected completion 2026
- **Undergraduate**:
  - Bachelor of Engineering - Cloud Computing (Chandigarh University, 2021, 8.70 GPA)
- **Secondary Education**:
  - Higher Secondary (DAV Public School, 2017, 9.20 GPA)
- **Learning Philosophy**:
  - Continuous improvement mindset
  - Balancing work and education
  - Focus on practical application

### 4. projects.html - Projects Portfolio
**Purpose**: Modular project system with expansion capability

**Sections**:
- **Featured Projects**:
  - CCNA Certification Journey
  - DNS Troubleshooting Automation
  - Network Performance Analysis
  - Azure Infrastructure Setup
- **Project Grid System**:
  - Asymmetrical card layout
  - Hover effects with tech stack reveal
  - Expandable details on click
- **Dummy Templates** (for future expansion):
  - "Project Alpha" placeholder
  - "Infrastructure Upgrade" placeholder
  - "Automation Script" placeholder
- **Technology Stack**:
  - Filter buttons: All, Networking, Security, Automation
  - Visual tech stack indicators

### 5. personal.html - Personal Interests
**Purpose**: Human side with playful interactions

**Sections**:
- **Technology Interests**:
  - Interactive network graph of tech interests
  - Cloud computing, cybersecurity, automation
- **Personal Philosophy**:
  - Quotes and principles that guide work
  - Approach to learning and problem-solving
- **Fun Facts**:
  - Interactive button revealing random facts
  - Balancing technical depth with breadth
- **Easter Eggs**:
  - Konami code trigger
  - Hidden commands in terminal
- **Personal Touch**:
  - Interests outside of technology
  - Community involvement, mentorship

## Interactive Components Implementation

### 1. Command Palette (All Pages)
- **Trigger**: `Ctrl+K` or `Cmd+K`
- **Functionality**: Quick navigation, direct commands
- **UI**: Slide-down overlay with search input
- **Commands**: 
  - "experience" → navigate to experience.html
  - "projects" → navigate to projects.html
  - "email" → show email address
  - "linkedin" → open LinkedIn profile

### 2. Side Navigation Dock (All Pages)
- **Position**: Left edge, fixed
- **Icons**: HC, EXP, EDU, PRJ, FUN
- **Behavior**: Auto-hide on scroll down, show on scroll up
- **Current page**: Pulsing indicator

### 3. Terminal Interface (index.html)
- **Commands**:
  - `contact` → show email/phone
  - `linkedin` → open LinkedIn
  - `resume` → trigger PDF download
  - `location` → show Bangalore, India
  - `help` → list all commands
- **Animation**: Typewriter effect, blinking cursor

### 4. Interactive Timeline (experience.html)
- **Nodes**: Clickable career milestones
- **Expansion**: Detailed role descriptions
- **Animation**: Connecting lines draw on scroll
- **Metrics**: Impact numbers and achievements

### 5. Project Cards (projects.html)
- **Hover**: Lift effect with tech stack overlay
- **Click**: Expand for detailed view
- **Filter**: Category-based filtering
- **Stagger**: Cards animate in sequence

## Technical Implementation

### Core Libraries Used
1. **Anime.js**: Scroll animations, transitions
2. **p5.js**: Network particle background system
3. **pixi.js**: Interactive hover effects, 3D tilt
4. **Splitting.js**: Text animation effects
5. **Matter.js**: Physics for particle interactions (if needed)
6. **ECharts.js**: Skills radar chart, metrics visualization

### JavaScript Modules (main.js)
- **Navigation**: Command palette, side dock
- **Animations**: Scroll triggers, hover effects
- **Terminal**: Command parsing and execution
- **Particles**: Background network visualization
- **Interactions**: Timeline, project cards, certifications

### Responsive Strategy
- **Desktop**: Full experience with all animations
- **Tablet**: Simplified interactions, touch-optimized
- **Mobile**: Bottom sheet command palette, single column

### Performance Optimizations
- **Lazy Loading**: Images and heavy animations
- **Intersection Observer**: Scroll-triggered animations
- **Debounced Input**: Command palette search
- **Compressed Assets**: Optimized images and fonts

## Content Strategy

### Tone & Voice
- **Professional but Personal**: Technical expertise with human touch
- **Confident**: Clear about capabilities and achievements
- **Engineering-Focused**: Problem-solving mindset, systems thinking
- **Continuous Learner**: Emphasis on ongoing education and growth

### Key Messages
1. **Expertise**: Deep technical knowledge in networking, DNS, Azure
2. **Impact**: Proven track record at Microsoft, high CSAT scores
3. **Growth**: Continuous learning, certifications, education
4. **Approach**: Methodical problem-solving, customer-focused
5. **Personality**: Curious, dedicated, collaborative

This outline ensures a cohesive, premium digital identity that stands apart from typical resume websites while effectively showcasing professional capabilities and personal brand.