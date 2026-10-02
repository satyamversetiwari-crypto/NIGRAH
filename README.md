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

## Connected services

- GitHub: [private NIGRAH repository](https://github.com/satyamversetiwari-crypto/NIGRAH), `main` branch.
- Web hosting: [nigrah.vercel.app](https://nigrah.vercel.app), deployed from `apps/web`.
- PostgreSQL: Neon project `NIGRAH` in Singapore, linked to this Vercel project through the Neon integration. Runtime database queries and schema are not implemented yet.
- API: FastAPI service planned for a later step and will need a separate host.
