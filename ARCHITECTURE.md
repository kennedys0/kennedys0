# ARCHITECTURE — Technical Design & Decisions

> Project: FEKOJEWAN · Status: Approved · Technical owner: FEKOJEWAN

## 1. Context
- Product capabilities: Professional security researcher portfolio, Challenge Me submission & lifecycle tracking, Security Arena Mode A synthetic lab.
- Quality attributes: Security first, zero SSRF, resilient client/server boundary, fast responsive mobile UI, clean maintainable TypeScript.
- Tech Stack:
  - Framework: Next.js 15+ (App Router)
  - Language: TypeScript 5+
  - UI Library: Material UI (MUI v6) + Emotion (`@emotion/react`, `@emotion/styled`, `@mui/material-nextjs`)
  - Iconography: Lucide React (`lucide-react`)
  - Data Persistence: Lightweight robust file/JSON database adapter with atomic writes & schema validation (upgradable to PostgreSQL via Prisma/Drizzle for production)
  - Security Utilities: Timing-safe equality checks, unguessable crypto UUIDs, sanitize-html/input validators.

## 2. System Context and Boundaries
```
[Visitor / Challenger] 
       │ 
       ▼
 [ Next.js App Router ] (SSR & Client Components)
   ├── Navigation & Shell (Desktop Bar & Mobile Bottom Clay Dock)
   ├── Portfolio Pages (Home, About, Expertise, Research, Writeups, Contact)
   ├── Challenge Me (Public Form, Scope Attestation, Tracking UI)
   ├── Security Arena (Interactive Synthetic HTTP Inspector & Flag Validator)
   └── Admin Dashboard (Session Auth, Review, Lifecycle Status Management)
       │
       ▼ (Server Actions & Route Handlers)
 [ Storage Layer: Safe JSON/SQLite Data Store ]
   ├── challenges.json (Stores submissions with unguessable tokens)
   ├── findings.json (Verified security research entries)
   ├── writeups.json (Educational security articles)
   └── arena.json (Synthetic exercises & hashed flags)
```

## 3. Components and Ownership
| Component | Responsibility | Interface | Owner | Failure Behavior |
|---|---|---|---|---|
| `ClayThemeProvider` | MUI theme config, custom sculpted clay elevation tokens, color palette | React Context | Frontend | Fallback to safe neutral tones |
| `Navigation` | Desktop top bar + Mobile bottom clay dock | React Component | Frontend | Sticky header / bottom bar |
| `ChallengeService` | Validates challenge payloads, generates unguessable tracking IDs, stores records | Server API / Action | Backend | Fails safely with RFC 7807 problem details |
| `ArenaService` | Serves synthetic HTTP requests/responses, validates user submitted flags | Server API / Action | Security/Backend | Constant-time string comparison |
| `AdminAuth` | Authenticates FEKOJEWAN via secure httpOnly session cookies | Middleware / Handler | Security | Deny by default |

## 4. Data Architecture
- `ChallengeSubmission`:
  - `id`: string (crypto UUID)
  - `trackingToken`: string (crypto-secure 24-char hex)
  - `challengerName`: string
  - `challengerEmail`: string (hashed/encrypted or masked in public views)
  - `title`: string
  - `category`: 'Web Security' | 'API Security' | 'Authentication' | 'Authorization' | 'Business Logic' | 'Vulnerability Analysis' | 'CTF / Lab' | 'Other'
  - `difficulty`: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  - `description`: string
  - `objective`: string
  - `environmentType`: string
  - `authorizedScope`: string
  - `reproductionPrerequisites`: string
  - `status`: 'Submitted' | 'Under Review' | 'Accepted' | 'In Progress' | 'Solved' | 'Declined' | 'Closed'
  - `createdAt`: string (ISO)
  - `updatedAt`: string (ISO)
  - `adminNotes`: string (internal)

## 5. Security & Boundary Defenses
- Zero Outbound Requests: User-submitted target URLs are strictly stored as inert strings. The server NEVER makes outbound HTTP requests, fetches, pings, or DNS lookups against user-provided URLs (SSRF immunity).
- Unguessable Tracking: Challenge status can only be queried with the cryptographically generated 24-char tracking token. Sequential or enumerable IDs are forbidden.
- Admin Protection: Admin routes (`/admin`, `/api/admin/*`) require server-side session authentication. Default credentials must be set via environment variable `ADMIN_SECRET`.

## 6. Architecture Decision Records (ADRs)
### ADR-0001: Next.js App Router with MUI and Human Clay UI
- Status: Accepted
- Context: Need modern React framework with first-class SSR, API routes, and strict styling control.
- Decision: Use Next.js App Router with `@mui/material-nextjs` Emotion cache and custom Human Clay UI design tokens.
- Consequences: Gives server rendering benefits while allowing rich interactive clay components and Lucide icons without style conflicts.

### ADR-0002: Mode A Synthetic Arena Architecture
- Status: Accepted
- Context: Running live vulnerable apps or arbitrary containers in production introduces grave security risks (Mode B).
- Decision: Implement Mode A (Synthetic Interactive Training) where challenges display realistic HTTP transactions, headers, and payloads, evaluated server-side against pre-computed flag hashes.
- Consequences: 100% safe to deploy anywhere with zero risk of server compromise.
