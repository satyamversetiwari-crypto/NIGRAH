# NIGRAH Build Plan

## Starting point

The current frontend is a mobile-first introduction to NIGRAH's intelligence model plus a secondary browser-only text-analysis preview. The preview is illustrative only; it is not a validated Threat Index, a prediction, or a fraud verdict. Use `ROADMAP.md` as the active prioritized plan.

## Sequence

1. **Product foundation:** initial shell, supplied logo, responsive page, and prototype analysis interface are in place. Product positioning now leads with intelligence infrastructure.
2. **Canonical specifications:** v1.0 source specs are supplemented by approved `SPEC_AMENDMENT_v1.1.md` and final scoring rules in `SCORING_AMENDMENT_v1.2.md`.
3. **Catalog and deterministic scoring:** implemented in `apps/web/lib/intelligence.ts` and `apps/web/lib/scoring.ts`; source-linked EQ/CS/TI remain unavailable in the browser-only preview.
4. **Database foundation:** next, build Neon schema/migrations, catalog seeds, and audit fields without storing user inputs.
5. **Public intelligence pilot:** manually collect a small traceable dataset from approved public sources and review each mapping.
6. **API and app integration:** process user input ephemerally, link relevant public evidence, calculate EQ/CS/TI, and persist only permitted result metadata.
7. **Graph and expansion:** generate graph relationships at runtime; add OCR, URLs, audio/video, and ETI in dependency order.

## Account setup needed

- GitHub: private repository [`satyamversetiwari-crypto/NIGRAH`](https://github.com/satyamversetiwari-crypto/NIGRAH), `main` branch. The first project commit is pushed.
- Vercel: project `nigrah` is deployed from `apps/web` at [nigrah.vercel.app](https://nigrah.vercel.app). Git pushes to `main` deploy automatically.
- Neon: project `NIGRAH` exists in AWS Asia Pacific 1 (Singapore), Free plan. The existing Neon account is linked to only the NIGRAH Vercel project via Neon Previews integration; integration-managed database environment variables are configured in Vercel. The app does not yet query the database.
- The integration currently uses the default `neondb_owner` role. Before storing real user data or operating in production, create a restricted application role and use it for runtime access.
- Vercel CLI is not installed. Dashboard deployment is connected, so the CLI is optional for current frontend work.
- Never commit connection strings or secrets; keep local secrets in ignored environment files and provider secrets in Vercel. The API will need its own host once FastAPI is implemented.
