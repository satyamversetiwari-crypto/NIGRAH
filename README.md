# NIGRAH

NIGRAH is an intelligence and predictive technology initiative for financial threat behavior. It aims to connect traceable public evidence, recurring patterns, entities, and events. Message analysis is one possible interface into the wider intelligence system.

## Current preview

The web app lives in `apps/web`. It contains a platform-led landing page and a single consent-based text/image/voice analysis tool backed by `/api/analyze`. This prototype has no official source ingestion, persisted intelligence corpus, calibrated Threat Index, or validated predictions. User-submitted content is not saved by the application.

## Optional multimodal model configuration

Set `HF_TOKEN` and `HF_ANALYSIS_MODEL` in the Vercel project settings for the web app, or in an ignored local `apps/web/.env.local` file. Never add either value to Git or use a `NEXT_PUBLIC_` prefix for the token. The route sends model names with an explicit provider suffix; `HF_ANALYSIS_PROVIDER` defaults to `featherless-ai` and can be changed to a provider enabled for the selected model. Qwen2.5-VL-7B-Instruct is listed with Featherless AI on Hugging Face. Voice is transcribed with `openai/whisper-large-v3` before analysis. See the [Inference Providers chat-completion documentation](https://huggingface.co/docs/inference-providers/tasks/chat-completion) and [speech recognition documentation](https://huggingface.co/docs/inference-providers/en/tasks/automatic-speech-recognition).

The route validates returned taxonomy IDs and exact text spans, has a small per-instance request limit, and does not persist the input. This limit is a prototype safeguard, not a substitute for provider quotas or a shared production rate limiter. The provider and model must be enabled on the Hugging Face account.

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
- API: the first ephemeral multimodal model route runs as a Vercel function; the asynchronous public-source ingestion worker and broader FastAPI service remain future work.
