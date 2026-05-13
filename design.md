# Design Style Guide - Himanshu Chauhan Personal Website

## Design Philosophy

### Core Aesthetic
**Engineered Minimalism**: The website embodies the precision and intentionality of systems architecture, where every element serves a purpose. It feels like a personal operating system—confident, quiet, powerful, and memorable.

### Visual Language
- **Content-First**: No decorative elements that don't enhance understanding
- **Asymmetrical Balance**: Breaking traditional layouts for visual interest
- **Layered Depth**: Subtle shadows and overlays create spatial hierarchy
- **Digital Craftsmanship**: Every interaction feels engineered, not templated

## Color Palette

### Primary Colors
- **Deep Void**: `#0A0A0A` (Primary background)
- **Charcoal Core**: `#141414` (Secondary background)
- **Graphite**: `#1E1E1E` (Card backgrounds, elevated surfaces)
- **Steel Grey**: `#2A2A2A` (Borders, dividers)

### Accent Colors (Muted, Optional)
- **Neon Teal**: `#00A896` (Primary accent, low saturation)
- **Steel Blue**: `#4A6FA5` (Secondary accent)
- **Warning Amber**: `#D4A574` (Alerts, highlights)

### Text Colors
- **Pure White**: `#FFFFFF` (Primary text)
- **Light Grey**: `#B0B0B0` (Secondary text)
- **Muted Grey**: `#808080` (Tertiary text, metadata)
- **Accent Text**: `#00A896` (Links, interactive elements)

## Typography

### Primary Typeface: JetBrains Mono
- **Usage**: Body text, code blocks, technical content
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Rationale**: Monospace font reinforces the technical/engineering identity

### Display Typeface: Inter
- **Usage**: Headings, navigation, large text
- **Weights**: Light (300), Regular (400), Medium (500), Bold (700)
- **Rationale**: Clean, modern sans-serif for excellent readability

### Typography Scale
- **H1**: 3.5rem (56px) - Page titles
- **H2**: 2.5rem (40px) - Section headers
- **H3**: 1.75rem (28px) - Subsection headers
- **Body Large**: 1.125rem (18px) - Important content
- **Body**: 1rem (16px) - Standard text
- **Small**: 0.875rem (14px) - Metadata, captions

## Visual Effects & Animation

### Background Effects (Using p5.js)
- **Network Particle System**: Subtle animated dots connected by lines, representing network topology
- **Parameters**: 
  - 50-75 particles max
  - Slow movement (0.5px/frame)
  - Opacity: 0.1-0.3
  - Color: `#00A896` with low saturation

### Text Effects (Using Splitting.js + Anime.js)
- **Typewriter Animation**: Command-line style text reveal
- **Character Stagger**: Letters animate in sequence on scroll
- **Color Cycling**: Key technical terms pulse with accent colors
- **Glitch Effect**: Subtle digital glitch on hover for interactive elements

### Interactive Effects (Using pixi.js)
- **3D Card Tilt**: Subtle perspective shift on hover
- **Glow States**: Soft outer glow on interactive elements
- **Depth Shadows**: Dynamic shadow expansion on hover
- **Smooth Transitions**: 200ms ease-out for all interactions

### Scroll Animations (Using Anime.js)
- **Reveal Distance**: 20px from bottom of viewport
- **Stagger Delay**: 100ms between elements
- **Duration**: 250ms for smooth feel
- **Easing**: `easeOutCubic` for natural motion

## Layout & Grid System

### Grid Structure
- **Desktop**: 12-column grid with 24px gutters
- **Container**: Max-width 1400px, centered
- **Breakpoints**: 
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: 320px - 767px

### Spacing Scale (8px base unit)
- **xs**: 8px
- **sm**: 16px
- **md**: 24px
- **lg**: 32px
- **xl**: 48px
- **2xl**: 64px
- **3xl**: 96px

### Component Spacing
- **Section Padding**: 96px vertical, 48px horizontal
- **Card Padding**: 32px all sides
- **Text Line Height**: 1.6 for body text, 1.2 for headings

## Component Styles

### Cards
- **Background**: `#1E1E1E`
- **Border**: 1px solid `#2A2A2A`
- **Border Radius**: 8px
- **Shadow**: 0 4px 24px rgba(0,0,0,0.3)
- **Hover**: Lift 8px, shadow expands, subtle glow

### Buttons
- **Primary**: Neon Teal background, white text
- **Secondary**: Transparent with Teal border
- **Hover**: 3D tilt effect, color shift
- **Padding**: 16px 32px
- **Typography**: JetBrains Mono, Medium weight

### Navigation
- **Side Dock**: 64px width, fixed left
- **Icons**: 24px, steel grey with teal hover
- **Active State**: Subtle pulse animation
- **Background**: `#141414` with backdrop blur

### Terminal Interface
- **Background**: `#0A0A0A`
- **Text**: `#00FF41` (Matrix green)
- **Cursor**: Blinking white rectangle
- **Font**: JetBrains Mono, 14px
- **Padding**: 24px
- **Border**: 1px solid `#2A2A2A`

## Image Treatment

### Hero Images
- **Aspect Ratio**: 16:9 for landscape, 4:5 for portrait
- **Treatment**: Subtle desaturation, dark overlay
- **Blend Mode**: Multiply at 0.7 opacity
- **Border Radius**: 8px

### Project Screenshots
- **Frame**: Dark border with subtle shadow
- **Hover**: Slight zoom (1.05x) with overlay text
- **Caption**: Small text below, muted grey

### Background Images
- **Opacity**: 0.1-0.2 for subtle texture
- **Blend Mode**: Overlay or soft light
- **Filter**: Slight blur for depth

## Responsive Behavior

### Desktop (1200px+)
- Full navigation experience
- All animations enabled
- Multi-column layouts

### Tablet (768px - 1199px)
- Side dock converts to top navigation
- Reduced particle count
- Touch-optimized interactions

### Mobile (320px - 767px)
- Command palette becomes bottom sheet
- Single column layouts
- Simplified animations
- Larger touch targets (44px minimum)

## Accessibility

### Contrast Ratios
- **White on Black**: 21:1 (AAA)
- **Teal on Black**: 7.8:1 (AAA)
- **Grey on Black**: 7.5:1 (AAA)
- **Interactive Elements**: Minimum 4.5:1

### Motion Preferences
- **Reduced Motion**: Disable particle system, reduce animations
- **Fallbacks**: Static states for all animated content
- **Focus States**: Clear keyboard navigation indicators

This design system creates a cohesive, premium digital identity that feels engineered and intentional while maintaining excellent usability and accessibility.