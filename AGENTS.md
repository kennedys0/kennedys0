# AGENTS.md — Repository Working Agreement

> PROJECT: FEKOJEWAN Portfolio & Security Challenge Platform. OWNER: FEKOJEWAN. STATUS: Active. This document is an instruction guide for AI agents; it is not permission to execute high-impact commands.

## Product and repository overview
- Product intent: Professional bug bounty hunter and independent security researcher portfolio, featuring "Challenge Me" submission workflow and "Security Arena" safe interactive web/API labs.
- Main users: Security teams, engineering managers, prospective clients, bug bounty program managers, security enthusiasts.
- Repo root and important directories: `/home/arysa/projects/fekojewan` (`src/` for Next.js app, `docs/` for specs).
- Stack/framework: Next.js (App Router), React, TypeScript, Material UI (MUI), Emotion, Lucide React.
- Package manager: npm (Node v26)

## Agent operating rules
1. Follow higher-priority platform/user instructions, `.prompt.md`, and project guardrails.
2. Inspect `git status` and source before editing. Protect existing changes.
3. Read `TASK_INSTRUCTION.md`; load other relevant docs selectively.
4. Keep changes scoped, reversible and compatible with existing conventions.
5. Do not invent product behavior, data, tests or performance claims. Never fabricate CVEs or bounty metrics.
6. Never run destructive/prod/cost-incurring/credential operations without explicit approval.
7. Provide evidence-based handoff with risks and test outcomes.

## Document ownership
- PRD.md: approved product scope and acceptance criteria
- ARCHITECTURE.md: technical boundaries, decisions and contracts
- DESIGN.md: UX and tokens; adheres strictly to `human-clay-ui`
- SECURITY.md: risk policy, SSRF/XSS defenses, input validation, and security invariants
- TESTING.md: verification strategy
- DEPLOYMENT.md: safe release/runbook
- TASK_INSTRUCTION.md: current active task

## Working commands
- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test: `npm test`
- Build: `npm run build`

## Definition of done
- Acceptance criteria met and supported by evidence.
- Relevant checks ran; any skipped checks reported accurately.
- No unauthorized external/production side effects.
- Affected docs updated where justified; unresolved risks surfaced.

## Nested guidance
If subdirectories have their own `AGENTS.md`, apply that guidance to files within those directories unless it conflicts with higher-priority instructions or safety requirements.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
