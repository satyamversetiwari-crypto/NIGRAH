# NIGRAH

Financial threat intelligence for investor resilience. NIGRAH helps people understand suspicious financial claims through evidence, pattern matching, and clear verification steps.

## Current preview

The web app lives in `apps/web`. It contains a responsive landing page and a browser-only phrase-matching preview for pasted text. This is a prototype: it is not a validated Threat Index or a fraud determination. It does not send or save submitted text.

## Run locally

```sh
cd apps/web
npm install
npm run dev
```

Open http://localhost:3000.

## Project references

- `PROJECT_CONTEXT.md` — consolidated intelligence model and decisions to resolve.
- `BUILD_PLAN.md` — staged implementation and service setup.
- `source_material/` — supplied project briefs, UI/UX specification, and logo.

## Planned services

- GitHub: private source repository (pending device sign-in and repository creation).
- PostgreSQL: Neon (selected; connection setup pending).
- Web hosting: Vercel (connect `apps/web`; setup pending).
- API: FastAPI, to be deployed separately when the analysis service is implemented.
