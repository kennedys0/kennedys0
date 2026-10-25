# TESTING — Test Strategy and Acceptance Evidence

> Project: FEKOJEWAN · Test owner: FEKOJEWAN QA · Status: Approved

## 1. What Quality Means
- Verified functional flows across all portfolio views and interactive features.
- Accurate validation and error handling on challenge submissions.
- Responsive layout verification at 360px, 390px, 768px, and 1280px+.
- Zero invented data or false security claims.

## 2. Test Layers & Quality Gates
| Layer | Purpose | Tool / Command | Gate |
|---|---|---|---|
| Static Analysis | TypeScript compilation & linting | `npm run typecheck` & `npm run lint` | 0 errors |
| Unit Tests | Challenge validation logic, tracking ID generation, rate limiter, flag hashing | `npm test` | All pass |
| Integration | Challenge API (`/api/challenges`), tracking API, Arena answer checker | `npm test` | All pass |
| Build Verification | Next.js production build output | `npm run build` | Clean exit code 0 |
| Accessibility & UI QA | Keyboard navigation, contrast, touch targets, mobile bottom dock | Visual & manual check | WCAG 2.2 AA compliant |

## 3. Local Verification Commands
- Install: `npm install`
- Typecheck: `npm run typecheck` (tsc --noEmit)
- Test: `npm test`
- Build: `npm run build`
- Dev: `npm run dev`

## 4. Evidence Convention
Use `PASSED`, `FAILED`, `NOT RUN`, `BLOCKED` with actual execution commands and output logs. Never report a test as green unless executed.
