# NIGRAH Build Plan

## Starting point

The current frontend is a mobile-first introduction to NIGRAH's intelligence model plus a secondary browser-only text-analysis preview. The preview is illustrative only; it is not a validated Threat Index, a prediction, or a fraud verdict. Use `ROADMAP.md` as the active prioritized plan.

## Sequence

1. **Product foundation:** initial shell, supplied logo, responsive page, and prototype analysis interface are in place. Product positioning now leads with intelligence infrastructure.
2. **Canonical specifications:** intelligence, scoring, schema, and collection v1.0 documents are saved in the repo. `SPEC_REVIEW.md` records math, activation, confidence, growth, provenance, and retention inconsistencies to settle before implementation.
3. **Canonical seed catalog:** align code with the 25 signals, ten pattern memberships, and 15 families; use no unapproved scoring behavior.
4. **Evidence governance and source pilot:** define provenance, permitted public-source collection, review, deduplication, recency, and retention; then build and annotate a small source corpus.
5. **Analysis baseline and evaluation:** preserve evidence provenance and measure against reviewed examples before calibrating TI, confidence, or ETI.
6. **Persistence and API:** implement PostgreSQL schema/migrations and an API after data and retention fields are agreed. The collection spec proposes indefinite user-upload retention, while the prototype currently promises it is not saved; resolve this conflict before enabling persistence.
7. **Intelligence graph and prediction:** add temporal relationships and emerging-threat candidates only after the corpus, baseline, and evaluation are credible.
8. **Expand inputs and surfaces:** add OCR, URLs, audio/video, analyst tools, and public intelligence views in dependency order.

## Account setup needed

- GitHub: private repository [`satyamversetiwari-crypto/NIGRAH`](https://github.com/satyamversetiwari-crypto/NIGRAH), `main` branch. The first project commit is pushed.
- Vercel: project `nigrah` is deployed from `apps/web` at [nigrah.vercel.app](https://nigrah.vercel.app). Git pushes to `main` deploy automatically.
- Neon: project `NIGRAH` exists in AWS Asia Pacific 1 (Singapore), Free plan. The existing Neon account is linked to only the NIGRAH Vercel project via Neon Previews integration; integration-managed database environment variables are configured in Vercel. The app does not yet query the database.
- The integration currently uses the default `neondb_owner` role. Before storing real user data or operating in production, create a restricted application role and use it for runtime access.
- Vercel CLI is not installed. Dashboard deployment is connected, so the CLI is optional for current frontend work.
- Never commit connection strings or secrets; keep local secrets in ignored environment files and provider secrets in Vercel. The API will need its own host once FastAPI is implemented.
