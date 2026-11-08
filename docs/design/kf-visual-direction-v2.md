# KF Software — Calm Editorial Engineering Visual Direction (v2)

This document establishes the enduring design direction, visual grammar, and technical implementation rules for KF Software. Its purpose is to guide visual decisions across all pages, preventing drift back to generic SaaS/AI-landing-page templates.

---

## 1. Calm Editorial Engineering Direction

KF Software is an independent software workshop led by Kyryl Frosyniak in Wrocław, Poland, dedicated to solving focused, real-world problems. The design language reflects an honest engineering publication and working studio:

- **Evidence-First**: We show real software screens, actual service reports, field photography, code, and verified workflow notes rather than abstract marketing illustrations or generic iconography.
- **Restrained & Scholarly**: Clean typographical hierarchy, structured column grids, and visible editorial alignment replace stacked, floating rounded cards and decorative background gradients.
- **Document Rhythm**: We alternate spacious introductory statements with structured, high-density indices and artifact exhibits. Content feels like an authored journal of work rather than a sales funnel.
- **Honest Scoping**: Clear, explicit distinction between active software (`LIVE PRODUCT`), early discovery (`WORKFLOW EXPERIMENT`), and architectural analysis (`ENGINEERING NOTE`).

---

## 2. Palette Preservation and Color Usage

The established semantic color tokens in `src/app/globals.css` and `tailwind.config.ts` are strictly preserved:

### 2.1 Parent Brand Palette
- **Canvas & Surface Tokens**:
  - Light mode: `--canvas: 246 248 252`, `--surface: 255 255 255`, `--surface-muted: 237 242 247`, `--border: 215 224 234`.
  - Dark mode: `--canvas: 11 18 32`, `--surface: 17 27 46`, `--surface-muted: 23 36 58`, `--border: 42 57 80`.
  - Rule: Neutral canvas and surface tones carry 90%+ of the layout. Surfaces do not use tinted blues merely to fill white space.
- **Parent Brand Accent**:
  - Light mode: `--brand: 36 87 197` (#2457c5), `--brand-hover: 29 69 156` (#1d459c), `--brand-soft: 234 240 255`.
  - Dark mode: `--brand: 122 167 255` (#7aa7ff), `--brand-hover: 155 188 255` (#9bbcff), `--brand-soft: 23 42 78`.
  - Rule: The parent blue is strictly functional—reserved for primary CTAs, active text links, keyboard focus rings (`--focus`), and small metadata accents.

### 2.2 Scoped Product Palettes
Product hues are isolated to product-specific boundaries and never bleed across the parent site:
- **ChillPup** (`.theme-chillpup`):
  - Light: Teal accent `--product-accent: 15 118 110` (#0f766e), soft `--product-soft: 204 251 241`.
  - Dark: Teal accent `--product-accent: 94 234 212` (#5eead4), soft `--product-soft: 18 60 58`.
  - Usage: Applied exclusively within ChillPup marketing views, guide hubs, and article content.
- **Kitchen Exhaust** (`.theme-kitchen-exhaust`):
  - Light: Amber accent `--product-accent: 180 83 9` (#b45309), soft `--product-soft: 255 241 214`.
  - Dark: Amber accent `--product-accent: 253 186 116` (#fdba74), soft `--product-soft: 58 38 22`.
  - Usage: Applied exclusively within the Kitchen Exhaust service reports workflow experiment.

---

## 3. Typography and Grid

### 3.1 Typographic Discipline
- **Font**: Inter (`next/font/google` loaded at build time without external runtime calls).
- **Display Scale**: Fewer, more deliberate size steps:
  - Hero Display: 40px–56px (`text-4xl` to `text-6xl`), tight leading (`leading-[1.1]`), bold or extra-bold, letter-spacing `-0.025em`.
  - Section Headings: 24px–32px (`text-2xl` to `text-3xl`), bold, letter-spacing `-0.02em`.
  - Editorial Subheadings: 18px–20px (`text-lg` to `text-xl`), medium/semibold.
  - Body Text: 15px–16px (`text-[15px]` / `text-base`), relaxed leading (`leading-[1.7]`).
  - Metadata / Labels: 11px–13px (`text-xs` / `text-[13px]`), uppercase with `tracking-[0.08em] to [0.12em]`, font-mono or font-bold sans.
- **Line Length**: Strictly restricted to 55–75 characters (`max-w-2xl` to `max-w-3xl`) for continuous prose and editorial summaries.
- **Contrast**: Low-contrast secondary copy is prohibited. Body copy uses `--ink` (`rgb(19 34 56)` / `rgb(244 247 251)`) or `--ink-muted` (`rgb(82 97 116)` / `rgb(168 180 199)`), meeting WCAG 2.1 AA standards in both themes.

### 3.2 Modular Grid Architecture
- **Desktop (>= 1024px)**: Standardized on a 12-column grid or deliberate asymmetric pairings:
  - Asymmetric 7/5 or 8/4 grid: 7–8 columns for primary narrative or headline, 4–5 columns for real artifacts, index lists, or metadata.
  - Maximum content container: `max-w-6xl` (1152px) with horizontal padding `px-4 sm:px-6 lg:px-8`.
- **Tablet (640px – 1023px)**: Deliberate collapse to 6 columns or single-column stacked hierarchy without retaining empty desktop offsets.
- **Mobile (< 640px)**: Natural, single-column document flow with 16px screen margins (`px-4`). No horizontal scroll rails.

---

## 4. Surface and Artifact Rules

### 4.1 Surface Restraint
- **The "Few Surfaces" Rule**: Avoid wrapping every heading, paragraph, or feature in a rounded, bordered card.
- **Card Boundaries**: Cards are reserved strictly for bounded interactive functional units:
  1. The free-sample request form (`RequestSampleForm`).
  2. Bounded product artifact exhibits with actions.
  3. The formal business entity card in the footer.
- **Editorial Separation**: Editorial sections are separated by structural layout spacing, thin border dividers (`border-t border-border`), and subtle canvas/surface band shifts, not by floating containers.
- **Radius Scale**: Consistent, restrained radii: `rounded-xl` (12px) for interactive controls and badges; `rounded-2xl` (16px) for major artifact frames and cards. Excessive 24px–32px rounded capsules inside capsules are eliminated.
- **Shadows**: Elevation is restricted to functional overlays (mobile menu dropdown, consent banner). Static content uses `border border-border` with zero decorative box-shadow or neon glow.

### 4.2 Real Artifacts as Evidence
- Visual proof must come from verified repo assets:
  - `public/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf`
  - Paired inspection photos (`hood-interior-before.jpg`, `baffle-filters-after.jpg`, etc.)
  - Real ChillPup application screenshots (`chillpup-home.jpg`, `chillpup-session.jpg`, `chillpup-icon.png`)
  - Real canine behavioral photo series (`public/assets/door/`, `walk-day/`, `walk-night/`)
- Every artifact must be presented within a structured frame with factual technical captioning, component status, and clear context.

---

## 5. Status System

All status indicators must be explicit, factual, and accessible without reliance on color alone:

1. **`LIVE PRODUCT`**: Actively maintained software with public availability (ChillPup on iOS App Store & Google Play).
2. **`WORKFLOW EXPERIMENT`**: Active validation inquiry testing problem demand with commercial contractors (Kitchen Exhaust Service Reports).
3. **`ENGINEERING NOTE`**: Published technical analysis, architecture documentation, or discovery retrospective.

### Styling Standards
- Compact, quiet pill or inline bracketed label:
  `font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border`
- Text accompanies every indicator; no blinking or pulsing dots, no color-only status coding.

---

## 6. Motion and Runtime Policy

### 6.1 Prohibited Motion Patterns
- **No scroll hijacking**, smooth-scroll overrides, or parallax effects.
- **No scroll-triggered animation**, scrubbed timelines, or pinned full-screen scenes.
- **No IntersectionObserver-based fade-ins** or slide-ins that hide content until JavaScript triggers.
- **No external animation dependencies** (GSAP, Framer Motion, Lenis, Lottie, Three.js, Swiper).
- **No animated counters**, fake activity tickers, or auto-rotating carousels.

### 6.2 Allowed Micro-Interactions
- Short CSS transitions for direct user interactions: `:hover`, `:focus-visible`, `:active`, and mobile menu toggles.
- Durations strictly between `100ms` and `200ms` (`transition duration-150`).
- Fully respected `prefers-reduced-motion: reduce`: animation duration set to 0.01ms.

---

## 7. Positive Reference Principles

1. **WiringCalc**: Two-column hero with concise value proposition beside a real, usable product artifact; product utility comes first before marketing exposition.
2. **Panxo**: Visible modular grid discipline, deliberate asymmetry, and single prominent artifact panels over clusters of tiny cards.
3. **GrowthBook & Mintlify**: Generous whitespace, concrete product UI as direct evidence, and disciplined typography.
4. **Attio**: Interface fragments woven naturally into narrative sections.
5. **Yuri & Nominal**: Serious, calm engineering tone using real operational documents and technical parameters as visual identity.

---

## 8. Anti-Patterns to Eliminate

1. **The Repeated Card Stampede**: Eyebrow + centered heading + centered paragraph followed by 3–4 identical rounded boxes.
2. **Icon-in-a-Box Cliché**: Abstract icons (shield, heart, code, compass) enclosed in colored squares to symbolize intangible concepts.
3. **Decorative Glows & AI Gradients**: Ambient background blur circles, neon gradients behind mockups, or aurora backdrops.
4. **Stacked Hero Mini-Cards**: Floating secondary preview cards stacked next to the hero headline.
5. **Fabricated Proof**: Invented client logos, stock avatar quotes, fake counter numbers, or unverified claims.

---

## 9. Page-Specific Implementations

### 9.1 Homepage (`/`)
- **Hero**: Asymmetric 7/5 editorial layout. Left: Crisp headline, studio positioning, primary actions. Right: Real artifact exhibit (side-by-side ChillPup UI / Kitchen Exhaust inspection report preview) in a structured frame.
- **Work Index**: A disciplined, ruled index of active projects (ChillPup, Kitchen Exhaust Reports) displaying status, description, technical summary, and direct route links.
- **Featured Artifact**: Deep-dive showcase focusing on the Kitchen Exhaust demonstration report or ChillPup routine structure with technical parameters.
- **Studio & Engineering**: Concise engineering capability section linking directly to `/engineering/`.
- **Publication Journal**: Ruled index of published articles from `blog-posts.ts`.
- **Contact**: Restrained, clear direct contact path.

### 9.2 Kitchen Exhaust Reports (`/kitchen-exhaust-reports/`)
- **WiringCalc Information Priority**: Concise proposition ("Turn field photos into customer-ready reports") immediately paired with the Pinecrest Family Diner demonstration report artifact.
- **Materials → Process → Result**: Clear sequential layout showing raw inputs (photos + notes), concierge assembly, and structured deliverable.
- **Demonstration Disclosure**: Factual notice adjacent to demonstration imagery and PDF viewer.
- **Functional Surface**: Request form as a bounded, accessible card. Other sections use open editorial layout with clean dividers.
- **Zero Regression**: Endpoint, validation, timeout, analytics events, PDF links, and error handling remain 100% intact.

### 9.3 ChillPup (`/chillpup/`, `/chillpup/guides/`, articles)
- **Warmer Voice, Same System**: Retains the shared KF shell and grid while highlighting the calm teal product accent.
- **Real App Screens**: Screenshots (`chillpup-home.jpg`, `chillpup-session.jpg`) and canine behavioral photography provide visual anchor.
- **Safety Boundaries**: Veterinary disclaimer, emergency thresholds, and non-medical boundaries remain prominent.

### 9.4 Engineering (`/engineering/`)
- **Editorial Capability Index**: Clean 2-column or ruled list of capabilities (.NET backends, integrations, data workflows, modernization) rather than agency service cards.
- **Engagement Sequence**: Disciplined 3-step timeline (`01`, `02`, `03`) with explicit studio boundaries (no junior delegation, no 24/7 staffing).

### 9.5 Blog & Guides (`/blog/`, `/chillpup/guides/`)
- **Publication Index**: Editorial ledger layout with dates, categories, track metadata, and hover states. No empty coming-soon cards.

### 9.6 About, Support & Legal
- **Studio Editorial**: Fact-based founder and studio narrative with registration details, business identifiers, and direct contact.

---

## 10. Accessibility and Responsive Rules

- **Contrast**: WCAG 2.1 AA contrast strictly maintained across light and dark modes.
- **Touch Targets**: Minimum 44×44 CSS px for interactive elements.
- **Keyboard Navigation**: Highly visible focus indicator (`focus:ring-2 focus:ring-focus focus:ring-offset-2`).
- **Responsive Geometry**: Fully verified at 390px, 768px, and 1440px viewports without horizontal scroll or truncated text.
- **Zoom & Font Scaling**: Preserves layout integrity up to 200% browser zoom without two-dimensional overflow.

