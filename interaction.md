# Interaction Design - Himanshu Chauhan Personal Website

## Core Navigation Philosophy
The website functions as a personal digital operating system with discoverable, non-obvious navigation patterns that feel engineered rather than designed.

## Primary Navigation System

### 1. Command Palette (Hidden Navigation)
- **Trigger**: Press `Ctrl+K` or `Cmd+K` (keyboard-inspired)
- **Interface**: Overlay that slides from top with search/command input
- **Functionality**: 
  - Type commands like "experience", "projects", "contact"
  - Auto-complete suggestions
  - Quick navigation to any section
  - Direct command execution (e.g., "email", "linkedin")
- **Visual**: Semi-transparent overlay with terminal-style typography

### 2. Side Dock (Persistent Access)
- **Position**: Left edge of screen
- **Style**: Minimal vertical dock with 5 icon indicators
- **Behavior**: 
  - Icons glow on hover
  - Click to navigate
  - Current section highlighted with subtle pulse
  - Auto-hide when scrolling down, reappear on scroll up
- **Icons**: 
  - HC (main)
  - EXP (experience) 
  - EDU (education)
  - PRJ (projects)
  - FUN (personal)

### 3. Scroll-Based Storytelling Navigation
- **Main Page**: Horizontal scroll sections with snap points
- **Experience Page**: Vertical timeline with scroll-triggered animations
- **Projects Page**: Grid reveals on scroll with stagger effect
- **Visual Cues**: Subtle progress indicators that fill as user scrolls

## Interactive Components

### 1. Terminal-Style Contact System
- **Location**: Main page, integrated into content flow
- **Interface**: Command-line style input with blinking cursor
- **Commands**:
  - `contact` → reveals email/phone
  - `linkedin` → opens LinkedIn profile
  - `resume` → triggers PDF download
  - `location` → shows Bangalore, India
- **Aesthetic**: Green monospace text on dark background
- **Animation**: Typewriter effect when displaying results

### 2. Interactive Timeline (Experience Page)
- **Layout**: Vertical timeline with branching paths
- **Interaction**: 
  - Click nodes to expand detailed stories
  - Hover for quick preview
  - Scroll to trigger reveal animations
- **Content**: Each position shows impact metrics, technologies used
- **Visual**: Connecting lines animate as user scrolls

### 3. Modular Project System
- **Grid Layout**: Asymmetrical grid with expandable cards
- **Interaction**:
  - Hover: Card lifts with shadow, shows tech stack overlay
  - Click: Expands to show detailed description, metrics, links
  - Filter buttons: All, Networking, Security, Automation
- **Dummy Templates**: 3 placeholder cards for future expansion
- **Animation**: Cards stagger in on scroll, smooth expand/collapse

### 4. Certification Achievement System
- **Display**: Interactive badge collection
- **Interaction**: 
  - Hover: Badge glows, shows completion date
  - Click: Opens modal with course details, learning outcomes
- **Visual**: Grid of hexagonal badges with subtle animations
- **Progress**: Shows current learning paths and upcoming certifications

## Micro-Interactions & Animations

### Text Effects (Using Splitting.js)
- **Headings**: Character-by-character reveal on scroll
- **Emphasis**: Color cycling on key terms (DNS, TCP/IP, Azure)
- **Typewriter**: Command output simulation
- **Glitch**: Subtle digital glitch effect on hover for tech terms

### Visual Effects (Using p5.js, pixi.js)
- **Background**: Subtle particle system representing network connections
- **Data Flow**: Animated lines connecting different sections
- **Hover States**: 3D tilt effects on cards, glow on buttons
- **Loading**: Minimal skeleton screens with shimmer effect

### Scroll Animations (Using Anime.js)
- **Reveal**: Content fades in from 20px below
- **Stagger**: Multiple elements animate with 100ms delays
- **Parallax**: Background elements move at 0.5x speed
- **Progress**: Section completion indicators fill smoothly

## Personal Page Interactions

### Interest Visualization
- **Network Graph**: Interactive visualization of technology interests
- **Timeline**: Personal milestones and achievements
- **Philosophy Cards**: Rotating quotes and principles with flip animation

### Playful Elements
- **Easter Egg**: Konami code triggers special animation
- **Dark Mode Toggle**: Actually cycles through accent colors
- **Random Fact**: Button reveals interesting personal facts
- **Skill Meter**: Interactive radar chart showing expertise levels

## Technical Implementation Notes

### Keyboard Shortcuts
- `Ctrl+K`: Open command palette
- `Escape`: Close overlays
- `Arrow Keys`: Navigate through command suggestions
- `Enter`: Execute command

### Responsive Behavior
- Mobile: Command palette becomes bottom sheet
- Tablet: Side dock converts to top navigation
- Desktop: Full experience with all interactions

### Performance Considerations
- Lazy load heavy animations
- Use Intersection Observer for scroll triggers
- Debounce command palette input
- Preload critical interaction assets

This interaction system creates a cohesive digital identity that feels like a carefully crafted operating system rather than a typical portfolio website.