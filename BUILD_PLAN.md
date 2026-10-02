# NIGRAH Build Plan

## Starting point

The current frontend is a mobile-first introduction to NIGRAH's intelligence model plus a secondary browser-only text-analysis preview. The preview is illustrative only; it is not a validated Threat Index, a prediction, or a fraud verdict. Use `ROADMAP.md` as the active prioritized plan.

## Sequence

1. **Product foundation:** initial shell, supplied logo, responsive page, and prototype analysis interface are in place. Product positioning now leads with intelligence infrastructure.
2. **Canonical specifications:** v1.0 specs and approved `SPEC_AMENDMENT_v1.1.md` are saved in the repo. Amendment v1.1 supersedes their conflicting statements.
3. **Scoring implementation details:** settle the remaining conventions in `SPEC_REVIEW.md`, especially evidence quality, pattern consistency, family tie/missing-data handling, and which family harm value feeds TI.
4. **Canonical seed catalog:** code already follows the 25 signal IDs/weights, ten pattern memberships, and 15 families. Keep exact version references in all analyses.
5. **Evidence governance and source pilot:** implement source provenance, review, deduplication, recency, and terms-aware public-source collection; then build and annotate a small source corpus. User-submitted media/text must be deleted after analysis; only allowed result metadata may persist.
6. **Persistence and API:** implement PostgreSQL schema/migrations and API with ephemeral input processing, permitted result storage, audit fields, and data deletion controls.
7. **Scoring and evaluation:** implement deterministic scoring and evaluate it against reviewed examples before describing outputs as validated.
8. **Intelligence graph and prediction:** generate graph relationships at runtime; add ETI candidates only after there is a traceable corpus and review process.
9. **Expand inputs and surfaces:** add OCR, URLs, audio/video, analyst tools, and public intelligence views in dependency order.

## Account setup needed

- GitHub: private repository [`satyamversetiwari-crypto/NIGRAH`](https://github.com/satyamversetiwari-crypto/NIGRAH), `main` branch. The first project commit is pushed.
- Vercel: project `nigrah` is deployed from `apps/web` at [nigrah.vercel.app](https://nigrah.vercel.app). Git pushes to `main` deploy automatically.
- Neon: project `NIGRAH` exists in AWS Asia Pacific 1 (Singapore), Free plan. The existing Neon account is linked to only the NIGRAH Vercel project via Neon Previews integration; integration-managed database environment variables are configured in Vercel. The app does not yet query the database.
- The integration currently uses the default `neondb_owner` role. Before storing real user data or operating in production, create a restricted application role and use it for runtime access.
- Vercel CLI is not installed. Dashboard deployment is connected, so the CLI is optional for current frontend work.
- Never commit connection strings or secrets; keep local secrets in ignored environment files and provider secrets in Vercel. The API will need its own host once FastAPI is implemented.
