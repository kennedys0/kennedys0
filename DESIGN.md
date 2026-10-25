# DESIGN — Product UI/UX Contract

> Project: FEKOJEWAN · Status: Approved · Design owner: FEKOJEWAN Senior UI/UX Designer

## Design Authority
- Governed by `human-clay-ui` v1.2.
- Aesthetic: Modern sculpted claymorphism. Tactile, calm, soft-modern, human-designed.
- Anti-slop: No generic hacker tropes (no neon matrix rain, no fake glowing terminals, no random blobs, no fake live attack counters). Technical visual elements are strictly purposeful.

## 1. Brand Identity & Typography
- Brand Wordmark: **FEKOJEWAN** (Refined architectural sans-serif with subtle tracking).
- Hero Headline: **Breaking Assumptions. Securing Systems.**
- Positioning: "Independent Bug Bounty Hunter specializing in Web Application and API Security. Exploring attack surfaces, uncovering security weaknesses, and turning technical findings into actionable insights."
- Typography:
  - Sans: Plus Jakarta Sans / Inter (Clean humanist sans-serif)
  - Mono: JetBrains Mono / Roboto Mono (Used selectively for HTTP requests, headers, tokens, and code blocks)

## 2. Color Palette (Calm 3–4 Core System)
- Theme: Dual mode supported, defaulted to a dark sculpted clay palette (slate/charcoal) or soft neutral light clay.
- Dark Palette:
  - Background (Environment): `#0c1017` (Deep graphite slate)
  - Surface Flat: `#131922` (Subtle boundary)
  - Surface Raised (Clay card): `#19212c` with soft highlights (`rgba(255,255,255,0.04)`) and soft depth shadow (`0 6px 16px rgba(0,0,0,0.4)`)
  - Surface Inset (Input / well): `#0f141c` with subtle top inner shadow
  - Text Primary: `#e6edf3`
  - Text Secondary: `#8b949e`
  - Accent / Primary CTA: `#38bdf8` (Calm sky blue, restrained, not neon) or `#f59e0b` (Amber warning for security flags)
  - Semantic: `#10b981` (Verified / Solved), `#ef4444` (Critical / Declined), `#6366f1` (API / Info)

## 3. Clay Elevation Tokens
- `flat`: `background: var(--surface-flat); border: 1px solid rgba(255,255,255,0.06);`
- `raised`: `background: var(--surface-raised); box-shadow: 0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05); border-radius: 14px;`
- `inset`: `background: var(--surface-inset); box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05);`
- `pressed`: `transform: translateY(1px); box-shadow: 0 2px 6px rgba(0,0,0,0.2);`

## 4. Navigation Architecture
- Desktop Top Nav:
  - Left: FEKOJEWAN wordmark + security badge
  - Center: Home, About, Expertise, Research, Methodology, Writeups
  - Right: "Challenge Me" button + "Security Arena" button + Contact
- Mobile Navigation:
  - Bottom Sculpted Clay Dock (fixed bottom dock with safe-area padding)
  - 5 primary destinations: Home, Research, Challenge Me, Arena, More (Menu drawer for About, Expertise, Methodology, Writeups, Contact)
  - Clay dock emerges with soft shadow, active icon slightly elevated with clay contour.

## 5. Responsive Composition Matrix
- 320px–430px (Mobile): Single-column cards, reflowed CTA buttons, full-width inputs, bottom clay dock.
- 768px (Tablet): Two-column grids for research cards and challenge forms.
- 1024px+ (Desktop): Three-column layouts where content demands, side-by-side HTTP request/response inspectors in Security Arena.
