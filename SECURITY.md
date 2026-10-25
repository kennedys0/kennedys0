# SECURITY — Threat Model & Engineering Guardrails

> Project: FEKOJEWAN · Security owner: FEKOJEWAN Security Lead · Status: Approved

## 1. Assets, Actors, and Trust Boundaries
- Protected Assets:
  - Challenger confidential scope data & private email addresses
  - Challenge submission integrity
  - Admin management credentials / session tokens
  - Application runtime and host infrastructure
- Actors:
  - Public visitors (untrusted)
  - Challengers (untrusted input submission)
  - FEKOJEWAN Admin (authenticated operator)
- Trust Boundaries:
  - Browser Client <--> Next.js Route Handlers
  - Public Challenge API <--> Storage Layer
  - Admin Endpoints <--> Authorization Guard

## 2. Threat Model & Defenses
| Threat | Entry Point | Likelihood / Impact | Control | Status |
|---|---|---|---|---|
| Server-Side Request Forgery (SSRF) | Challenge form URL input | High / Critical | **Strict Rule:** The server NEVER initiates outbound network requests, DNS queries, or HTTP calls to user-submitted target URLs. URLs are stored as non-executable text strings only. | Enforced |
| Stored Cross-Site Scripting (XSS) | Challenge title, description, writeups | High / High | Text inputs are sanitized on server ingest and rendered using React safe text nodes (no `dangerouslySetInnerHTML` on untrusted inputs). Code blocks in writeups are strictly escaped. | Enforced |
| Broken Object Level Authorization (BOLA/IDOR) | Challenge tracking `/api/challenges/[id]` | High / High | Challenge status retrieval requires a cryptographically generated 24-character hexadecimal tracking token (`crypto.randomBytes(12).toString('hex')`). Sequential/enumerable IDs are rejected. Public responses redact challenger email and internal admin notes. | Enforced |
| Administrative Route Hijacking | `/admin`, `/api/admin/*` | Medium / Critical | Constant-time password verification (`crypto.timingSafeEqual`) against `ADMIN_SECRET`. Session token stored in HttpOnly, SameSite=Strict cookies. | Enforced |
| Challenge Arena Production Tampering | Security Arena interactive exercises | Medium / Critical | **Mode A Safe Architecture:** Exercises run entirely on synthetic pre-captured HTTP transactions and mock responses. Answers are verified via server-side SHA-256 flag comparison. No actual vulnerable services are exposed on the host. | Enforced |
| Denial of Service / Spam Flood | Challenge submission endpoint | Medium / Medium | In-memory sliding window rate limiting (max 5 submissions per 15 mins per IP), Honeypot field trap, and payload size restriction (max 32KB). | Enforced |

## 3. Invariants
1. No live attack surfaces introduced for the sake of demonstrations.
2. No secret keys or admin passwords hardcoded in source repository.
3. User privacy respected: Challengers can request deletion, and email addresses are never publicly visible.
4. Input validation enforced on both client and server boundaries.
