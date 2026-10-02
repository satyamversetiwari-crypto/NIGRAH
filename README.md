# NIGRAH

NIGRAH is an intelligence and predictive technology initiative for financial threat behavior. It aims to connect traceable public evidence, recurring patterns, entities, and events. Message analysis is one possible interface into the wider intelligence system.

## Current preview

The web app lives in `apps/web`. It contains a platform-led landing page and a browser-only phrase-matching preview. This prototype has no official source ingestion, persisted intelligence corpus, calibrated Threat Index, or validated predictions. Submitted text is processed in the browser and is not sent or saved.

## Run locally

```sh
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000.

## Project references

- `PROJECT_CONTEXT.md` — consolidated intelligence model and decisions to resolve.
- `INTELLIGENCE_SPEC.md` — canonical MVP intelligence specification, version 1.0.
- `SCORING_ENGINE_SPEC.md` — proposed canonical formulas for TI, confidence, family similarity, and ETI.
- `DATABASE_SCHEMA.md` — proposed PostgreSQL entities and API surface.
- `DATA_COLLECTION_SPEC.md` — proposed public-source collection pipeline and dataset targets.
- `SPEC_AMENDMENT_v1.1.md` — approved amendment; highest-priority implementation authority for MVP.
- `SCORING_AMENDMENT_v1.2.md` — final deterministic scoring rules; supersedes prior scoring details.
- `SPEC_REVIEW.md` — implementation status and the next practical steps.
- `BUILD_PLAN.md` — staged implementation and service setup.
- `ROADMAP.md` — prioritized product, data, and engineering milestones with exit conditions.
- `source_material/` — supplied project briefs, UI/UX specification, and logo.

## Connected services

- GitHub: [private NIGRAH repository](https://github.com/satyamversetiwari-crypto/NIGRAH), `main` branch.
- Web hosting: [nigrah.vercel.app](https://nigrah.vercel.app), deployed from `apps/web`.
- PostgreSQL: Neon project `NIGRAH` in Singapore, linked to this Vercel project through the Neon integration. Runtime database queries and schema are not implemented yet.
- API: FastAPI service planned for a later step and will need a separate host.
