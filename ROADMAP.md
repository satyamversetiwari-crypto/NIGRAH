# NIGRAH Product and Engineering Roadmap

## Product direction

NIGRAH is a financial threat intelligence and predictive technology initiative. Its core work is collecting traceable public evidence, structuring signals and behavior patterns, linking scam families, and studying how threats change over time. Message analysis is one interface into that system.

## Current state

- **Landing page:** intelligence-platform framing; new geometric logo in place.
- **Canonical scope:** 25 signals, 10 manipulation patterns, 15 families.
- **Scoring:** deterministic MVP scoring is implemented in `apps/web/lib/scoring.ts` according to `SCORING_AMENDMENT_v1.2.md`.
- **Text preview:** runs locally in the browser. It can show preliminary signal, pattern, and family overlaps. Since it has no linked public source record, EQ, CS, and TI show N/A.
- **Not yet built:** database schema/migrations, public-source dataset or ingestion, API, result persistence, and runtime graph.
- **Privacy:** submitted text/media/URLs must be deleted after analysis; only the permitted result fields may be retained.

## Ordered to-do list

### 1. Database foundation — next

- [ ] Turn `DATABASE_SCHEMA.md` into PostgreSQL/Alembic migrations with foreign keys and audit/version fields.
- [ ] Seed the canonical TS, MP, and SF catalogs plus versioned FHS priors.
- [ ] Keep user-submitted input out of persistent tables and delete temporary processing artifacts after analysis.
- [ ] Use a least-privilege Neon runtime role; do not expose database credentials to the browser.

**Done when:** migrations apply cleanly; catalog seed records match the approved specs; no input text or media is stored.

### 2. Public intelligence starter dataset

- [ ] Start with a small manual pilot from official/public sources named in `DATA_COLLECTION_SPEC.md`.
- [ ] Record source, URL, dates, source tier, geography/language when known, evidence summary, review status, and signal/family links.
- [ ] Keep source evidence distinct from user submissions; review records before they affect analysis.
- [ ] Label FHS values as expert-assigned priors and any regional sample data as demo/synthetic.

**Done when:** analysts can trace each record to its source and inspect why it was mapped to signals/patterns/families.

### 3. Analysis API and source linking

- [ ] Add the FastAPI service and connect it to Neon using the restricted role.
- [ ] Accept analysis input in memory, link only relevant public-source evidence, calculate EQ, then discard the submitted input.
- [ ] Return detected signals, active patterns, top three families, score components, availability state, and version metadata.
- [ ] Persist only the result fields allowed by the amendments; ensure logs and errors do not capture original input.

**Done when:** a user input can be analyzed without being retained, and every stored score can be reproduced from versioned result metadata and linked public evidence.

### 4. Connect the product and graph

- [ ] Replace the browser-only demo call with the API while keeping the preview accessible without an account.
- [ ] Generate the MVP knowledge graph at runtime from signal/pattern/family relationships; do not persist graph nodes or edges.
- [ ] Add an intelligence overview showing source coverage and relationships without invented live counts.

**Done when:** the interface uses actual seeded intelligence records and labels demo data clearly.

### 5. Practical evaluation and expansion

- [ ] Review a starter set of examples and benign lookalikes; fix obvious phrase-rule errors.
- [ ] Record basic precision/false-positive observations by signal and family; keep scores labeled MVP/preliminary.
- [ ] Add screenshot/OCR and URL inputs next; consider audio/video after those flows work.
- [ ] Keep ETI experimental and regional data clearly labeled until real evidence supports them.

**Done when:** the core flow works end to end and its known limits are visible. Improve from practical feedback; no need to wait for perfect coverage.

## Working rule

Keep one milestone active. Prefer a small, reviewable end-to-end increment over expanding every subsystem at once. Follow `SPEC_AMENDMENT_v1.1.md` and final scoring rules in `SCORING_AMENDMENT_v1.2.md`; treat original v1.0 documents as references where they conflict.
