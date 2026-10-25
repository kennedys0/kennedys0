# DEPLOYMENT — Environments, Release and Rollback

> Project: FEKOJEWAN · Release owner: FEKOJEWAN DevOps · Status: Approved

## 1. Environments
| Environment | Purpose | URL / Access | Persistence |
|---|---|---|---|
| Local | Development and testing | `http://localhost:3000` | Safe local data files |
| Staging / Vercel Preview | Pre-release verification | Vercel preview deployment | Ephemeral / cloud KV |
| Production | Live portfolio | `https://fekojewan.dev` (or configured domain) | Persistent storage |

## 2. Configuration & Environment Variables
- `NODE_ENV`: `production` or `development`
- `ADMIN_SECRET`: Strong secret passkey for accessing the challenge admin portal (default provided for local dev: `fekojewan-sec-review-2026`)
- `NEXT_PUBLIC_SITE_URL`: Base URL of the website
- `SESSION_SECRET`: Random 32+ character hex string for signing session cookies

## 3. Build & Release Procedure
1. Verify type safety: `npm run typecheck`
2. Run automated tests: `npm test`
3. Execute production build: `npm run build`
4. Confirm health check: `GET /api/health` returns status `healthy`
5. No automated production deploy without explicit authorization.

## 4. Rollback
In case of defect or regression:
1. Revert to prior git commit.
2. Invalidate CDN cache.
3. Verify `/api/health` and challenge submission state.
