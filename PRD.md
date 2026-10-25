# PRD — Product Requirements Document
 
> Project: FEKOJEWAN · Owner: FEKOJEWAN · Version: 1.0 · Last reviewed: 2026-10-25
 
## 1. Problem and opportunity
- Problem statement: Independent bug bounty hunters and web/API security researchers often lack credible, professional digital portfolios that showcase their methodology, verifiable research, and technical rigor without resorting to cliché "matrix/terminal" hacker stereotypes.
- Users/segments: Security engineering managers, bug bounty triage teams, client security directors, fellow researchers, and security enthusiasts.
- Why now: Establish professional credibility, provide an authorized intake pipeline ("Challenge Me"), and offer interactive educational exercises ("Security Arena") that reflect real web/API security knowledge.
 
## 2. Product goal and success measures
- Primary outcome: Deliver a production-grade, bespoke security research portfolio and challenge platform adhering to Human Clay UI principles.
- Measurable signals:
  1. Complete navigation across Home, About, Expertise, Research, Methodology, Writeups, Contact, Challenge Me, and Security Arena.
  2. Zero fabricated metrics or CVE discoveries; honest, verified sample findings.
  3. Fully functional "Challenge Me" workflow: client-side validation, server-side persistence, secure unguessable tracking IDs, and authenticated review dashboard.
  4. Fully functional "Security Arena" (Mode A) with synthetic HTTP request/response inspection and server-side flag validation.
- Explicit non-goals: Automated active scanning/crawling of submitted URLs (SSRF prevention); live vulnerable production targets (Mode B deferred to safe isolated infra); fabricated awards or bounty sums.
 
## 3. Users and critical journeys
| Persona | Need | Core journey | Evidence |
|---|---|---|---|
| Program / Security Manager | Evaluate FEKOJEWAN's research capabilities and methodology | Lands on Home → Reads positioning → Explores Research & Writeups → Reviews responsible disclosure | Verified findings & structured writeups |
| Client / Challenger | Submit an authorized application or API for security assessment | Navigates to Challenge Me → Reviews scope/attestation rules → Submits scenario → Receives secure tracking ID | Real persisted submission with token |
| Security Enthusiast / Learner | Test web/API security knowledge | Navigates to Security Arena → Selects exercise → Inspects HTTP request/response → Tests hypothesis & submits answer | Interactive validation & feedback |
| FEKOJEWAN (Admin) | Review and manage challenge submissions | Logs into Admin Dashboard → Reviews pending challenges → Updates status (Accepted/Declined/Solved) → Adds research notes | Authenticated management state |
 
## 4. Scope
### In scope (approved)
- [x] High-impact Landing Page with clear technical positioning ("Breaking Assumptions. Securing Systems.")
- [x] About page detailing research philosophy, methodology, and ethical disclosure
- [x] Expertise breakdown across Web Application Security & API Security focus areas
- [x] Security Research / Findings catalog with category, severity, and status filters
- [x] Research Methodology breakdown (8-step structured workflow)
- [x] Technical Workflow & Tools showcase (Burp Suite, Postman, DevTools, Python, etc.)
- [x] Writeups / Knowledge Base with technical editorial layout and syntax-highlighted code
- [x] Contact section with email, GitHub, PGP key info, and secure communication channels
- [x] "Challenge Me" submission engine with strict authorization attestation and tracking
- [x] Challenge Admin review portal with session/cookie-based authentication
- [x] "Security Arena" Mode A synthetic training lab with HTTP inspectors and answer verification
- [x] Responsive layout with desktop top-nav and mobile bottom dock
 
### Out of scope
- Automated active scanning, network pinging, or crawling of submitted endpoints
- Mode B live Docker/VM container orchestration (deferred until isolated dedicated sandbox infra)
 
## 5. Functional requirements
| ID | Priority | User story / behavior | Acceptance criteria | Status |
|---|---|---|---|---|
| FR-001 | P0 | As a visitor, I can view FEKOJEWAN's research and filter by domain/severity | Filter chips update results without page reload; empty state when none match | Approved |
| FR-002 | P0 | As an authorized submitter, I can submit a security scenario in "Challenge Me" | Form validates all required fields, requires authorization checkbox, persists to store, returns unique tracking ID | Approved |
| FR-003 | P0 | As a challenger, I can check the status of my submission via tracking ID | Entering tracking ID shows current lifecycle state without leaking private scope details | Approved |
| FR-004 | P0 | As FEKOJEWAN, I can authenticate and review submitted challenges in a dashboard | Protected route requires password session; allows updating status and notes | Approved |
| FR-005 | P0 | As a learner, I can solve synthetic Web/API exercises in the Security Arena | Exercises load synthetic HTTP traces; user submits flag/answer; validated server-side | Approved |
| FR-006 | P1 | As a reader, I can read technical writeups with clear code blocks and TOC | Formatted articles with reading time, tags, code snippets, and remediation tips | Approved |
 
## 6. Non-functional requirements
- Performance: First Contentful Paint < 1.2s; zero layout shifts; static generation where feasible.
- Privacy & Security: Submissions are sanitized and stored safely; no credentials stored in code; SSRF prevented.
- Design: Strict adherence to Human Clay UI v1.2 (sculpted clay surfaces, calm 3-4 palette, Lucide icons, anti-AI-slop).
- Accessibility: WCAG 2.2 AA compliant contrast, full keyboard navigation, accessible form labels and focus rings.
- Device support: 320px, 360px, 390px, 430px, tablet, and desktop viewports.
