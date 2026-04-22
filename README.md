# Pinterest-AI-Engine-MVP-Plan

# Pinterest AI Engine

Monorepo for the Pinterest AI Engine MVP.

## Summary

Build a greenfield single-user SaaS MVP with:

- `frontend`: Next.js dashboard matching the provided mockup, with clickable architecture nodes, pipeline stages, queue items, trend pills, and settings flows.
- `backend`: Express API for auth, pin pipeline orchestration, Pinterest publishing, analytics sync, billing, and settings.
- `python-engine`: lightweight trend service for Google Trends plus keyword enrichment.
- `MongoDB + Cloudinary + Stripe + Pinterest API + OpenAI + Amazon Creators API` as the production stack.
- `Netlify + Render` as the deployment target.

Important product decisions locked:

- Pinterest official API is the primary publish/analytics path.
- Tailwind is not in v1 scope; leave an adapter seam for it later.
- Amazon `PA-API v5` is not the target because Amazon docs deprecate it on **April 30, 2026**; use `Creators API`.
- Stripe billing is included in v1.
- Pinterest autocomplete scraping stays behind a disabled feature flag until compliance is confirmed.

## Apps

- `frontend/`: Next.js dashboard
- `backend/`: Express API, orchestration, jobs, and integrations
- `contracts/`: shared API DTOs and enums
- `python-engine/`: FastAPI trend discovery service

## Quick start

1. Copy each `.env.example` to `.env`.
2. Install root dependencies with `npm install`.
3. Install Python dependencies inside `python-engine`.
4. Run MongoDB locally or point `MONGO_URI` at Atlas.
5. Start services:
   - `npm run dev:backend`
   - `npm run dev:frontend`
   - `uvicorn api.main:app --reload --port 8100` from `python-engine`

## Key implementation areas

### Architecture

- Use one repo with `frontend/`, `backend/`, `python-engine/`, plus a shared `contracts/` package for API DTOs and enums.
- `backend` owns orchestration and jobs: discover keywords, generate content, match products, render pins, schedule posts, sync analytics, and trigger clone/mutate actions.
- `python-engine` exposes read-only trend endpoints for Google Trends and normalized keyword scoring.
- Store generated images in Cloudinary and persist public asset URLs in MongoDB.
- Run scheduled jobs on Render worker or cron processes; frontend runs on Netlify.

### Product behavior

- Dashboard overview mirrors the mockup: KPI cards, generation pipeline, queue, CTR chart, top products, trend pills, and system log.
- Every visual module is clickable and deep-links to a dedicated dashboard subpage or detail drawer.
- Pipeline run button creates a `pipelineRun` record and executes stages in order with per-stage status, logs, retries, and surfaced errors.
- Pin generation flow: seed niche -> trend discovery -> content generation -> affiliate product match -> image render -> draft pin -> queue/schedule -> publish -> analytics sync.
- Clone and mutate automation runs only on posted pins with enough analytics volume and uses configurable thresholds.

### API surface

- Auth: register, login, logout, me, delete-account.
- Dashboard: overview stats, pipeline runs, activity log.
- Trends: discover, list, rescore, approve/reject keyword.
- Pins: generate, list, detail, update copy, render image, queue, publish-now, schedule, retry failed stage.
- Analytics: overview, per-pin history, sync.
- Connections: Pinterest connect/callback, Pinterest boards, OpenAI key upsert/test, Amazon connection upsert/test, Cloudinary config test.
- Billing: Stripe checkout session, billing portal session, webhook, current subscription.
- Settings: niches, timezone, daily cap, posting windows, disclosure text, automation thresholds.

## Current implementation notes

- All third-party integrations have production-shaped service adapters.
- When credentials are absent, the app falls back to deterministic mock data so the UI and flows stay testable.
- Pinterest publish/analytics, Stripe billing, Cloudinary assets, OpenAI content, and Amazon Creators matching are wired behind env-driven adapters.

## Required credentials

- `MONGO_URI`
- `OPENAI_API_KEY`
- `PINTEREST_APP_ID`
- `PINTEREST_APP_SECRET`
- `PINTEREST_REDIRECT_URI`
- `AMAZON_CREATORS_API_KEY`
- `AMAZON_CREATORS_API_SECRET`
- `AMAZON_ASSOCIATE_TAG`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `JWT_SECRET`
- `ENCRYPTION_KEY`
- Optional: `SENTRY_DSN`
