# Pinterest-AI-Engine-MVP-Plan
# Pinterest AI Engine MVP Plan

## Summary
Build a greenfield monorepo that ships a real single-user SaaS MVP with:
- `frontend`: Next.js dashboard matching the provided mockup, with clickable architecture nodes, pipeline stages, queue items, trend pills, and settings flows.
- `backend`: Express API for auth, pin pipeline orchestration, Pinterest publishing, analytics sync, billing, and settings.
- `python-engine`: lightweight trend service for Google Trends plus keyword enrichment.
- `MongoDB + Cloudinary + Stripe + Pinterest API + OpenAI + Amazon Creators API` as the production stack.
- `Netlify + Render` deployment target.

Important product decisions locked:
- Pinterest official API is the primary publish/analytics path.
- Tailwind is not in v1 scope; leave an adapter seam for it later.
- Amazon `PA-API v5` is not the target because Amazon’s docs say it is deprecated on **April 30, 2026**; use `Creators API`.
- Stripe billing is in v1.
- Pinterest autocomplete scraping should not be treated as required MVP behavior; keep it behind a disabled feature flag until a compliant source is confirmed.

## Key Changes
### Architecture
- Use one repo with `frontend/`, `backend/`, `python-engine/`, plus a small shared `contracts/` package for API DTOs and status enums.
- `backend` owns orchestration and jobs: discover keywords, generate content, match products, render pins, schedule posts, sync analytics, and trigger clone/mutate actions.
- `python-engine` exposes read-only trend endpoints for Google Trends and normalized keyword scoring.
- Store generated images in Cloudinary and persist public asset URLs in MongoDB.
- Run scheduled jobs on Render worker/cron processes; frontend is static/server-rendered on Netlify.

### Product behavior
- Dashboard overview mirrors the mockup: KPI cards, generation pipeline, queue, CTR chart, top products, trend pills, and system log.
- Every visual module is clickable and deep-links to a dedicated dashboard subpage or detail drawer.
- Pipeline run button creates a `pipelineRun` record and executes stages in order with per-stage status, logs, retries, and surfaced errors.
- Pin generation flow: seed niche -> trend discovery -> content generation -> affiliate product match -> image render -> draft pin -> queue/schedule -> publish -> analytics sync.
- Clone/mutate automation runs only on posted pins with enough analytics volume; keep thresholds configurable in settings.

### Data and APIs
Add the PRD routes plus these concrete v1 interfaces:
- Auth: register, login, logout, me, delete-account.
- Dashboard: overview stats, pipeline runs, activity log.
- Trends: discover, list, rescore, approve/reject keyword.
- Pins: generate, list, detail, update copy, render image, queue, publish-now, schedule, retry failed stage.
- Analytics: overview, per-pin history, sync.
- Connections: Pinterest connect/callback, Pinterest boards, OpenAI key upsert/test, Amazon connection upsert/test, Cloudinary config test.
- Billing: Stripe checkout session, billing portal session, webhook, current subscription.
- Settings: niches, timezone, daily cap, posting windows, disclosure text, automation thresholds.

Schema additions beyond the PRD:
- `pipeline_runs`: stage statuses, request params, error summaries, timestamps.
- `subscriptions`: Stripe customer/subscription ids, plan, status, renewal dates.
- `connection_secrets`: encrypted third-party credentials/tokens if you want them separated from `users`.
- `audit_logs`: security-sensitive events like OAuth connect/disconnect, billing state changes, account deletion.

### Security and compliance
- Encrypt third-party secrets at rest.
- Use httpOnly auth cookies, rate limiting, Helmet, CORS allowlist, and structured redaction in logs.
- Enforce human-like posting caps and randomized delays.
- Add Amazon disclosure text to outbound pin/link surfaces.
- Include account deletion with cascading cleanup of pins, keywords, analytics, assets, and stored tokens.

## Test Plan
- Unit tests for prompt shaping, keyword scoring, product filtering, scheduler slot selection, clone/mutate rules, and Stripe webhook state transitions.
- Integration tests for auth, protected routes, trend discovery, pin generation pipeline, Pinterest board fetch, publish scheduling, analytics sync, and billing upgrade/downgrade.
- Contract tests between `frontend`, `backend`, and `python-engine` DTOs.
- Visual/UI tests for the dashboard mockup structure, responsive behavior, chart rendering, queue interactions, and clickable drill-down routes.
- End-to-end happy paths:
  1. Register -> connect Pinterest -> add keys -> run pipeline -> render draft -> schedule pin.
  2. Published pin -> analytics sync -> clone/mutate recommendation appears.
  3. Free user hits feature limit -> Stripe checkout -> Pro access unlocks.
  4. Delete account -> all linked data and assets are removed.

## Required Credentials
Share these before implementation starts:
- `MONGO_URI` for local or Atlas.
- `OPENAI_API_KEY`.
- `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`, and the approved redirect URL you want to use.
- `AMAZON_CREATORS_API` credentials or onboarding status, plus target marketplace (`amazon.in` if India-first).
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and the monthly price you want for `Pro`.
- `JWT_SECRET` and encryption key for stored secrets.
- Optional but recommended: `SENTRY_DSN`.

## Assumptions
- India-first product defaults: `Asia/Kolkata`, INR pricing, and `amazon.in`.
- Single user manages one Pinterest account in v1.
- Stripe supports `Free` and `Pro` only in the first release.
- Tailwind integration is deferred, not removed.
- Pinterest suggest scraping is disabled by default unless you explicitly want that compliance risk accepted and documented.
