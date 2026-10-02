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

- GitHub CLI is installed but its configured login token is invalid. Re-authenticate interactively with `gh auth login` before creating/pushing the repository. Never paste credentials here.
- Vercel CLI is not installed. Connect the GitHub repository in Vercel or install/login to the CLI, then import the Next.js app from `apps/web`.
- Neon PostgreSQL is proposed; create a project and set `DATABASE_URL` in local ignored environment config and provider secrets only. Never commit connection strings.
- Recommended initial repo visibility: private. Recommended database: Neon PostgreSQL.
