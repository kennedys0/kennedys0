# FEKOJEWAN

> **Breaking Assumptions. Securing Systems.**  
> Independent Bug Bounty Hunter & Web/API Security Researcher Portfolio and Interactive Security Challenge Platform.

FEKOJEWAN is a bespoke, production-ready portfolio and security platform built for independent security research, authorized challenge intakes, and interactive Web/API security labs. The application pairs technical findings with two core interactive systems: **Challenge Me** (a private, authorized vulnerability intake workflow) and **Security Arena** (a synthetic Web and API security lab).

Built with Next.js 16 (App Router), React 19, TypeScript 5, Material UI (MUI v6) with Emotion, Lucide Icons, and styled according to the **Human Clay UI** design system.

---

## Table of Contents

- [Core Features](#core-features)
  - [1. Security Research & Findings](#1-security-research--findings)
  - [2. Technical Writeups](#2-technical-writeups)
  - [3. "Challenge Me" Submission Pipeline](#3-challenge-me-submission-pipeline)
  - [4. "Security Arena" (Interactive Labs)](#4-security-arena-interactive-labs)
  - [5. Research Methodology & Tooling](#5-research-methodology--tooling)
  - [6. Operator Portal (Admin Dashboard)](#6-operator-portal-admin-dashboard)
- [Security Architecture & Defenses](#security-architecture--defenses)
- [Design System (Human Clay UI)](#design-system-human-clay-ui)
- [Project Directory Structure](#project-directory-structure)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Testing](#testing)
  - [Typechecking & Linting](#typechecking--linting)
  - [Production Build](#production-build)
- [Ethical Disclosure Policy](#ethical-disclosure-policy)

---

## Core Features

### 1. Security Research & Findings
- **Categorized Archive**: Real-world research findings covering Web Application and API attack surfaces (Broken Object Level Authorization, Second-Order SSRF, Concurrency/Race Conditions).
- **Multi-criteria Filtering**: Instant client-side filtering by surface (Web/API), severity (Critical, High, Medium, Low), vulnerability category, and publication status.
- **Detailed Findings View**: Each entry details target architecture, vulnerability class, impact assessment, exact reproduction vectors, and remediation steps.

### 2. Technical Writeups
- **Editorial Knowledge Base**: Technical breakdowns with syntax-highlighted code snippets, architecture diagrams, and reproduction prerequisites.
- **Reading Metadata**: Estimated reading time, tags, table of contents, and responsible disclosure timelines.

### 3. "Challenge Me" Submission Pipeline
An authorized intake channel where engineering teams, clients, and bug bounty programs can submit staging or sandbox targets for security review.
- **Authorization Attestation**: Submitters must explicitly confirm environment ownership, acknowledge testing constraints, and agree to coordinated disclosure terms.
- **Unguessable 24-character Hex Token**: Every submission generates a cryptographically random token (`crypto.randomBytes(12).toString('hex')`) used for private lifecycle tracking.
- **Real-Time Status Lookup**: Submitters query `/challenge` with their token to monitor progress (`Submitted` → `Under Review` → `Accepted` / `Declined` → `In Progress` → `Solved` → `Closed`) without exposing email addresses or confidential notes.
- **Cloudflare Turnstile Protected**: Ingest endpoints verify CAPTCHA tokens server-side to prevent automated bot spam.

### 4. "Security Arena" (Interactive Labs)
A synthetic, client-server security lab allowing visitors to test Web and API security concepts in an isolated environment.
- **Mode A Safe Architecture**: Exercises display synthetic HTTP request/response traces (headers, query parameters, request bodies, and status codes).
- **Server-Side Validation**: User-submitted answers are hashed with SHA-256 and verified using constant-time comparisons (`crypto.timingSafeEqual`) against pre-computed hashes.
- **Zero Host Risk**: No vulnerable containers or live attacking endpoints are exposed on the host machine.

### 5. Research Methodology & Tooling
- **8-Stage Workflow**: Complete documentation of the research methodology:
  1. Scope Mapping & Attestation
  2. Attack Surface Reconnaissance
  3. Hypothesis & Trust Boundary Analysis
  4. Controlled Proof-of-Concept Validation
  5. Technical & Business Impact Assessment
  6. Deterministic Evidence Collection
  7. Coordinated Vulnerability Disclosure
  8. Fix Verification & Public Writeup
- **Tooling Stack**: Detailed breakdown of testing instrumentation including Burp Suite, Postman, Browser Developer Tools, Python, and intercepting proxies.

### 6. Operator Portal (Admin Dashboard)
- **Protected Access**: Route guarded by `/admin` requiring passkey authentication verified against `ADMIN_SECRET`.
- **Review Queue**: Review incoming challenges, filter by status, update review notes, and assign difficulty ratings.
- **Outcome Publishing**: When a challenge is solved and authorized for release, operators can publish case summaries with lessons learned to the public showcase.

---

## Security Architecture & Defenses

| Threat / Risk Vector | Entry Point | Applied Defense |
|---|---|---|
| **Server-Side Request Forgery (SSRF)** | Challenge form URL inputs | **Zero Outbound Requests**: Target URLs submitted by users are stored strictly as inert strings. The server never makes outbound HTTP requests, fetches, pings, or DNS queries against user-provided URLs. |
| **Stored Cross-Site Scripting (XSS)** | Challenge inputs, writeup markdown | Server sanitization on intake. React escaped text nodes for rendering. Markdown code blocks rendered via safe tokenization without `dangerouslySetInnerHTML`. |
| **Broken Object Level Authorization (BOLA/IDOR)** | Challenge tracking lookup | Tracking requires a cryptographically random 24-character hexadecimal token. Sequential IDs are rejected. Public responses redact challenger email and internal operator notes. |
| **Route Hijacking / Brute Force** | Operator login `/api/admin/login` | Passkey evaluated via `crypto.timingSafeEqual`. Authenticated sessions use secure, HttpOnly, SameSite=Strict cookies. Cloudflare Turnstile token validation on login. |
| **Tampering / Flag Leaks** | Security Arena | Answer verification takes place server-side. Flag strings and secrets are never embedded in client bundles or public DOM nodes. |
| **Denial of Service / Spam Flood** | Submission API | Sliding-window in-memory rate limiting (maximum 5 requests per 15 minutes per IP), hidden honeypot trap field, and 32KB payload size ceiling. |

---

## Design System (Human Clay UI)

The platform adheres to **Human Clay UI v1.2** principles: tactile, sculpted surfaces with calm, human-designed aesthetics.

### Color Tokens
- **Environment Background**: Deep graphite slate (`#0c1017`)
- **Surface Flat**: Subdued slate base (`#131922`)
- **Surface Raised (Clay Card)**: Soft highlight card (`#19212c`) with subtle inset highlight (`rgba(255, 255, 255, 0.04)`) and directional depth shadow (`0 6px 16px rgba(0, 0, 0, 0.4)`)
- **Surface Inset (Inputs & Traces)**: Recessed well (`#0f141c`) with top inner shadow
- **Text Primary**: Crisp off-white (`#e6edf3`)
- **Text Secondary / Muted**: Muted silver (`#8b949e` / `#64748b`)
- **Accent Primary**: Restrained sky blue (`#38bdf8`)
- **Semantic Accents**: Verified emerald (`#10b981`), critical coral (`#f87171`), warning amber (`#f59e0b`)

### Navigation Architecture
- **Desktop**: Sticky top navigation bar with brand badge, direct access to primary research links, "More" dropdown for secondary views, and prominent CTAs for Challenge Me and Security Arena.
- **Mobile**: Fixed bottom clay dock with 5 touch-optimized targets (`Home`, `Research`, `Challenge`, `Arena`, `More`) with safe-area bottom padding.

---

## Project Directory Structure

```text
fekojewan/
├── data/                       # Local JSON storage layer
│   ├── arena.json              # Synthetic lab exercises & hashed answer flags
│   ├── challenges.json         # Submitted challenge records & lifecycle states
│   ├── findings.json           # Seeded verified research findings
│   └── writeups.json           # Security writeups & publication content
├── public/                     # Static assets
│   ├── favicon.ico             # 32x32 application favicon
│   ├── logo.png                # 1254x1254 high-resolution brand logo
│   ├── llms.txt                # Machine-readable AI context summary
│   ├── llms-full.txt           # Detailed AI context & research archive
│   └── .well-known/
│       └── security.txt        # RFC 9116 responsible disclosure policy
├── src/
│   ├── app/                    # Next.js App Router routes & layouts
│   │   ├── about/              # About FEKOJEWAN & research philosophy
│   │   ├── admin/              # Operator review portal & challenge manager
│   │   ├── api/                # Route handlers
│   │   │   ├── admin/          # Admin login, logout, and challenge management
│   │   │   ├── arena/          # Arena catalog & answer verification
│   │   │   ├── challenges/     # Public challenge intake & tracking
│   │   │   └── health/         # System health check endpoint
│   │   ├── arena/              # Security Arena interactive challenge workspace
│   │   ├── challenge/          # Challenge Me submission & status lookup
│   │   ├── contact/            # Responsible disclosure & PGP key info
│   │   ├── expertise/          # Web & API attack surface taxonomy
│   │   ├── methodology/        # 8-step security research workflow
│   │   ├── research/           # Security research catalog with filters
│   │   ├── tools/              # Research tooling & instrumentation
│   │   ├── writeups/           # Technical writeups index & slug detail
│   │   ├── favicon.ico         # Next.js App Router favicon route metadata
│   │   ├── layout.tsx          # Root layout, JSON-LD schema, fonts, theme wrapper
│   │   ├── page.tsx            # High-impact landing page
│   │   ├── robots.ts           # Dynamic robots.txt generation
│   │   └── sitemap.ts          # Dynamic sitemap generation
│   ├── components/             # Reusable Human Clay UI components
│   │   ├── ClayThemeProvider.tsx # MUI Emotion theme setup with clay tokens
│   │   ├── Footer.tsx          # Site footer with ethical safe harbor statement
│   │   ├── JsonLd.tsx          # Schema.org structured data script injector
│   │   ├── MarkdownContent.tsx # Safe markdown parser & code block renderer
│   │   ├── MobileBottomDock.tsx# Mobile bottom navigation dock
│   │   ├── Navbar.tsx          # Desktop top navigation with logo badge
│   │   └── TurnstileWidget.tsx # Cloudflare Turnstile CAPTCHA widget
│   ├── lib/                    # Core utilities & services
│   │   ├── auth.ts             # Password verification & session management
│   │   ├── rate-limit.ts       # Sliding-window rate limiting engine
│   │   ├── research-data.ts    # Research findings catalog seed
│   │   ├── security.ts         # Crypto tokens, sanitization, HTML escaping
│   │   ├── store.ts            # Atomic JSON persistence adapter
│   │   ├── theme.ts            # Human Clay UI color palette & styling tokens
│   │   ├── turnstile.ts        # Cloudflare Turnstile token validation
│   │   └── writeups-data.ts    # Technical writeups seed content
│   └── types/                  # TypeScript interfaces & domain types
│       └── index.ts            # Data models for challenges, findings, arena
├── test/                       # Automated test suite
│   ├── markdown.test.mjs       # Tokenizer & inline markdown unit tests
│   ├── security.test.mjs       # Security primitives & rate limiter tests
│   └── turnstile.test.mjs      # Turnstile verification unit tests
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## API Reference

### Public Endpoints
- `POST /api/challenges`: Submit a new challenge scenario.
  - Body: `{ challengerName, challengerEmail, title, category, difficulty, description, objective, environmentType, authorizedScope, reproductionPrerequisites, turnstileToken, websiteUrl (honeypot) }`
  - Response: `{ success: true, trackingToken: "...", message: "..." }`
- `GET /api/challenges/[token]`: Retrieve submission lifecycle status using 24-character token.
  - Response: `{ success: true, challenge: { id, title, category, difficulty, status, createdAt, updatedAt, publishedSummary } }`
- `GET /api/arena/list`: Fetch all synthetic lab challenges (without secret flags).
- `POST /api/arena/verify`: Submit a hypothesis or flag for a lab.
  - Body: `{ challengeId, flag }`
  - Response: `{ correct: true/false, message: "...", nextHint?: "..." }`
- `GET /api/health`: Health status endpoint.
  - Response: `{ status: "healthy", timestamp: "...", uptime: 123.45 }`

### Operator Endpoints (Admin)
- `POST /api/admin/login`: Authenticate with operator passkey and Turnstile token. Sets an HttpOnly session cookie.
- `POST /api/admin/logout`: Clear administrative session cookie.
- `GET /api/admin/challenges`: Retrieve all submissions (requires authenticated session).
- `PATCH /api/admin/challenges`: Update submission status, admin notes, or publish summaries.

---

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Operator Passkey (Required for /admin login)
ADMIN_SECRET=your-secure-admin-passkey-here

# Session Signing Secret (32+ character hex string)
SESSION_SECRET=a6c5e7b2f48d9103e5c7a8b9d0f1e2c3b4a5968778695041322314059687a1b2

# Cloudflare Turnstile CAPTCHA (Optional in dev, required in production)
# For local development, dummy test keys bypass external network requests:
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

---

## Getting Started

### Prerequisites
- **Node.js**: v20.0.0 or higher (compatible with Node.js v22 and v26)
- **npm**: v10.0.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kennedys0/fekojewan.git
cd fekojewan
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run the automated test suite:

```bash
npm test
```

Runs unit and integration tests covering:
- Markdown tokenization and inline styling.
- Cryptographic token generation and timing-safe password comparisons.
- In-memory rate limiting and reset calculations.
- Cloudflare Turnstile token verification.

### Typechecking & Linting

Verify TypeScript compilation and static syntax checks:

```bash
npm run typecheck
npm run lint
```

### Production Build

Create an optimized production build using Turbopack:

```bash
npm run build
npm run start
```

---

## Ethical Disclosure Policy

All vulnerability research and security engagements conducted by FEKOJEWAN adhere to strict ethical standards:

1. **Authorized Scope Only**: Testing is strictly limited to explicitly authorized staging and sandbox systems.
2. **Data Protection**: User and customer data is never accessed, altered, exfiltrated, or destroyed.
3. **Availability First**: No volumetric denial-of-service tests or destructive commands are ever executed.
4. **Coordinated Disclosure**: Detailed vulnerability reports with reproducible steps and remediation advice are delivered privately to authorized engineering teams. Confidentiality is maintained until fixes are verified and published by mutual agreement.
5. **Security Contact**: Security inquiries and vulnerability reports can be directed to `bounty@fekojewan.my.id` or via [RFC 9116 security.txt](/.well-known/security.txt).

---

## License

All original research, writeups, and website architecture are &copy; FEKOJEWAN. All rights reserved.
