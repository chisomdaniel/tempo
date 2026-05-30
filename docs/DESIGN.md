---
name: Deep Focus System
colors:
  surface: "#141314"
  surface-dim: "#141314"
  surface-bright: "#3a3939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1c"
  surface-container: "#201f20"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353435"
  on-surface: "#e5e2e1"
  on-surface-variant: "#c6c6cb"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#909095"
  outline-variant: "#45474b"
  surface-tint: "#c6c6cc"
  primary: "#c6c6cc"
  on-primary: "#2f3035"
  primary-container: "#0f1115"
  on-primary-container: "#7b7c82"
  inverse-primary: "#5d5e63"
  secondary: "#c4c6d0"
  on-secondary: "#2d3038"
  secondary-container: "#44474f"
  on-secondary-container: "#b3b5be"
  tertiary: "#d1c4bb"
  on-tertiary: "#372f29"
  tertiary-container: "#16100b"
  on-tertiary-container: "#857b73"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#e2e2e8"
  primary-fixed-dim: "#c6c6cc"
  on-primary-fixed: "#1a1c20"
  on-primary-fixed-variant: "#45474b"
  secondary-fixed: "#e0e2ec"
  secondary-fixed-dim: "#c4c6d0"
  on-secondary-fixed: "#191c23"
  on-secondary-fixed-variant: "#44474f"
  tertiary-fixed: "#eee0d7"
  tertiary-fixed-dim: "#d1c4bb"
  on-tertiary-fixed: "#211a15"
  on-tertiary-fixed-variant: "#4e453f"
  background: "#141314"
  on-background: "#e5e2e1"
  surface-variant: "#353435"
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: "600"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: "500"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "500"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: "0"
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: 0.01em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: 0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.0"
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is centered on the concept of "Digital Sanctuaries"—environments that eliminate cognitive load to facilitate deep work. The target audience consists of high-output professionals, writers, and developers who require a meditative digital space.

The visual style is **Elevated Minimalism** with a **Tactile Dark Mode** influence. It avoids the harshness of pure black, opting instead for deep charcoal and obsidian tones to reduce eye strain. The emotional response should be one of immediate calm, intentionality, and quiet confidence. Elements feel physically present through subtle depth but never distracting. High-quality typography and generous negative space are the primary tools for hierarchy, rather than heavy use of color or borders.

## Colors

The palette is rooted in a "Low-Stimulus" philosophy. The primary background (`#0F1115`) provides a deep, non-reflective base. Surface containers (`#171A21`) create subtle separation without relying on harsh lines.

Accents are strictly desaturated and used only for functional cues or state changes:

- **Soft Blue/Slate:** Used for primary actions and focus states.
- **Muted Purple:** Used for creative milestones or deep-focus sessions.
- **Sage Green:** Used for completion and positive feedback.
- **Warm Gray:** Used for metadata and tertiary information.

Text uses a high-contrast White-Smoke (`#F8FAFC`) for maximum legibility against the dark background, while secondary text is pulled back to a muted slate to create a clear visual tail.

## Typography

The typography system uses **Geist** for its precision and technical elegance. It feels "engineered yet human." For metadata and status indicators, **JetBrains Mono** is introduced to provide a subtle "utility" feel that contrasts with the fluid Geist sans-serif.

Spacing is the "secret ingredient" here. Body text uses a generous 1.6 line height to ensure reading long-form tasks or notes feels effortless. Display titles use a tighter leading and negative letter spacing to feel impactful and authoritative. Labels are intentionally tracked out (0.08em) to improve scannability at small sizes.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid** grid. Content is housed within a centered container (max-width 1200px) to prevent eye-scanning fatigue on ultra-wide monitors.

A strict 8px linear scale governs all padding and margins. Deep work layouts require "Visual Silence"—consequently, the system mandates a minimum of `lg` (48px) spacing between major sections and `xl` (80px) for top-level headers. Elements are grouped using proximity; related items stay within `sm` or `md` range, while distinct functional blocks are separated by significant white space.

## Elevation & Depth

Depth is created through **Tonal Stacking** rather than traditional shadows.

- **Level 0 (Base):** `#0F1115` - The canvas.
- **Level 1 (Cards):** `#171A21` - Raised surfaces.
- **Level 2 (Popovers/Modals):** `#1E222B` - Floating elements.

To enhance the premium feel, use a subtle **Inner Glow** on cards: a 1px top border with 10% opacity white. This simulates a "rim light" effect. Shadows, when used for modals, should be extremely large (blur: 60px), low opacity (25%), and tinted with the primary background color to avoid looking "dirty."

## Shapes

The shape language is organic and approachable. Standard UI components (buttons, inputs) use a **1.5rem (24px)** radius, creating a soft, friendly silhouette that contrasts with the technical typography.

- **Small Components:** 0.75rem (e.g., chips, checkboxes).
- **Cards & Containers:** 1.5rem or 2rem for larger dashboard modules.
- **Interactive States:** On hover, elements may slightly expand (scale: 1.02) to provide a "magnetic" tactile feel.

## Components

- **Buttons:** Primary buttons use the Soft Blue accent with Dark Charcoal text. Secondary buttons are "Ghost" style: subtle white-smoke outlines (10% opacity) that fill on hover.
- **Inputs:** Fields should feel like "wells" in the UI. Use the background color (`#0F1115`) as the fill, with a `#171A21` border. On focus, the border transitions to Soft Blue with a 4px outer glow.
- **Cards:** Cards should be borderless, relying on the tone shift from the background. Large cards (1.5rem radius) are the primary vehicle for grouping data.
- **Chips/Badges:** Use JetBrains Mono for text. Backgrounds should be highly desaturated versions of the accent colors (e.g., 10% Sage Green fill with 80% Sage Green text).
- **Focus Timer (Unique Component):** A large, thin-weight Geist Display timer. The background should subtly pulse with a radial gradient of Muted Purple when the timer is active.
- **Lists:** No dividers. Use increased vertical padding (`md` spacing) and subtle background highlights on hover to indicate interactivity.

## Understanding text related classes

Here is a breakdown of the specific purposes for each typography class within the Deep Focus Design System:

### **Hierarchy Classes**

**`.text-display`**

- **Purpose:** Built for maximum impact and used strictly for primary elements like the "Focus Timer."
- **Style:** Uses Geist, 48px size, extremely tight line height (1.1), and negative letter spacing (-0.02em). It creates an authoritative, "engineered" presentation meant to be read at a glance without feeling visually scattered.

**`.text-headline-lg`**

- **Purpose:** The top-level header for major sections or views (e.g., "Good morning, Daniel." or "Quick Start").
- **Style:** Uses Geist. It is responsive, defaulting to 24px on mobile and scaling to 32px on desktop. Maintains a tight, compact format for clear visual prominence.

**`.text-headline-md`**

- **Purpose:** Used for secondary structural headings (e.g., card titles, dashboard grouping titles like "Today's Flow").
- **Style:** Uses Geist at 20px with standard letter spacing (0) to feel approachable but distinct from body copy.

### **Reading Classes**

**`.text-body-lg`**

- **Purpose:** Intended for primary descriptive content or prominent list items where readability is key, without feeling dense.
- **Style:** Uses Geist at 18px. Adopts the system's "secret ingredient"—a generous 1.6 line height and slight positive tracking (0.01em)—ensuring effortless reading for long-form elements.

**`.text-body-md`**

- **Purpose:** The workhorse of the interface. Used for standard buttons, inputs, standard UI labels, and secondary descriptive text.
- **Style:** Uses Geist at 16px. Also utilizes the generous 1.6 line-height for a relaxed, uncluttered feel.

### **Utility / Metadata Classes**

**`.text-label-md`**

- **Purpose:** Reserved exclusively for metadata, scannable data points, status indicators, and badges/chips.
- **Style:** Breaks from Geist and uses **JetBrains Mono** at 12px. It features a hyper-tight line height (1.0) and intentionally tracked-out letter spacing (0.08em). This provides a technical, scannable contrast to the rest of the fluid interface.
