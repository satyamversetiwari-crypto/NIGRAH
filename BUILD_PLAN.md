# NIGRAH Build Plan

## Starting point

The first vertical slice is a mobile-first web landing page and text-message preview. It uses the supplied NIGRAH logo and the design system in `source_material/Design Draft.pdf`. The current phrase matcher is illustrative only; it is explicitly not the validated Threat Index or a fraud verdict.

## Sequence

1. **Product foundation:** app shell, responsive design tokens, logo, landing page, text input, evidence-led preview, uncertainty language.
2. **Deterministic analysis core:** formalize TS/MP/SF data as versioned seed data; implement repeatable extraction/mapping/scoring with unit examples and explanation provenance. Reconcile TI and MVP family scope before presenting real scores.
3. **Persistence and API:** FastAPI + PostgreSQL schema for source records, families, scans, findings, and evidence; migration tooling; keep private uploaded content retention off by default until policy is defined.
4. **Source acquisition:** ingest a small set of official public sources with citation/provenance, freshness, source reliability, and review workflow.
5. **Deploy:** GitHub private repo; Vercel for Next.js; managed PostgreSQL (Neon proposed); deploy FastAPI separately; configure secrets only in provider secret stores; preview and production environments.
6. **Expand inputs:** screenshots/OCR, then URL/PDF, then audio/video; add knowledge graph and emerging-threat views after data coverage exists.

## Account setup needed

- GitHub: private repository [`satyamversetiwari-crypto/NIGRAH`](https://github.com/satyamversetiwari-crypto/NIGRAH), `main` branch. The first project commit is pushed.
- Vercel: project `nigrah` is deployed from `apps/web` at [nigrah.vercel.app](https://nigrah.vercel.app). Git pushes to `main` deploy automatically.
- Neon: project `NIGRAH` exists in AWS Asia Pacific 1 (Singapore), Free plan. The existing Neon account is linked to only the NIGRAH Vercel project via Neon Previews integration; integration-managed database environment variables are configured in Vercel. The app does not yet query the database.
- The integration currently uses the default `neondb_owner` role. Before storing real user data or operating in production, create a restricted application role and use it for runtime access.
- Vercel CLI is not installed. Dashboard deployment is connected, so the CLI is optional for current frontend work.
- Never commit connection strings or secrets; keep local secrets in ignored environment files and provider secrets in Vercel. The API will need its own host once FastAPI is implemented.
