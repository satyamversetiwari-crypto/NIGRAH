# NIGRAH Product and Engineering Roadmap

## Product north star

Build an evidence-based financial threat intelligence system that collects traceable public information, structures recurring behavior, connects related entities and events, and evaluates emerging-threat hypotheses. Message analysis is one interface into that intelligence; it is not the product definition. NIGRAH is a technology initiative, not an investment service or a promise that a user is safe.

## Current state

- **Product framing:** landing page repositioned around intelligence infrastructure and predictive research.
- **Prototype:** browser-only phrase matching covers a preliminary catalog; no server persistence, official source ingestion, calibrated score, live graph, or validated prediction exists yet.
- **Infrastructure:** private GitHub repository, Vercel frontend, and Neon project are connected. The frontend does not use Neon yet.
- **Main next milestone:** reconcile the source documents into one canonical, implementable intelligence specification before expanding collection or presenting scores.

## Ordered work plan

### 0. Product and framework decisions — next

- [ ] Confirm the canonical MVP scope: 25 signals, 10 manipulation patterns, and which of the 30 families are in the first release.
- [ ] Reconcile signal names, IDs, weights, and definitions across the MVP, context, and framework PDFs.
- [ ] Decide what each pattern score means and specify missing, contradictory, duplicated, and weak evidence behavior.
- [ ] Decide whether the proposed five-part Threat Index is retained; define each component and its evidence requirements.
- [ ] Define Emerging Threat Index terms, time windows, normalization, and the bar for calling an item “emerging.”
- [ ] Record the adopted choices in `PROJECT_CONTEXT.md`; label unresolved proposals as unresolved.

**Exit condition:** each catalog item has one stable ID and definition, and no UI displays an overall risk or prediction score until the calculation and data requirements are explicit.

### 1. Evidence governance and data model

- [ ] Define allowed source types and collection methods; begin with public sources and preserve source terms, attribution, and access limits.
- [ ] Set evidence fields: source URI, publisher, publication/observation/collection timestamps, geography, language, excerpt or source artifact reference, source tier, review status, and provenance chain.
- [ ] Define deduplication, corrections, source reliability, recency, corroboration, and analyst review rules.
- [ ] Set data-retention rules separately for public-source records and user-submitted analysis text; default to not retaining submitted text.
- [ ] Design the PostgreSQL schema and migration approach only after the evidence fields and retention boundaries are agreed.

**Exit condition:** a sample evidence record can be traced from an official/public source through normalization and human review without losing its origin or dates.

### 2. Source acquisition pilot

- [ ] Select a small, documented set of high-value public sources from the acquisition framework.
- [ ] For each source, document access method, permitted use, update cadence, expected fields, and failure behavior.
- [ ] Implement ingestion with immutable source references, normalization, deduplication, and review queue.
- [ ] Collect a small, diverse pilot corpus; annotate each item with evidence, family/pattern mapping, and reviewer rationale.

**Exit condition:** the pilot corpus is repeatable to refresh, traceable to its sources, and reviewed for quality and coverage gaps.

### 3. Baseline analysis and validation

- [ ] Align the deterministic extractor and catalog to the adopted signal definitions.
- [ ] Preserve spans, source IDs, extraction method, rule/model version, and explanation for every finding.
- [ ] Create a reviewed evaluation set that includes positive examples, benign lookalikes, ambiguous items, and multiple languages.
- [ ] Measure precision, recall, false-positive patterns, and coverage by family/language before choosing thresholds.
- [ ] Implement pattern and family comparison as explainable evidence-supported outputs; do not describe similarity as probability.
- [ ] Calibrate any score against reviewed data; publish limitations and missing-data behavior alongside it.

**Exit condition:** a versioned baseline has reproducible evaluation results and known limitations. A score is withheld if its required inputs are missing.

### 4. Application API and persistence

- [ ] Create database migrations and least-privilege runtime credentials; keep secrets out of Git.
- [ ] Build an API for public intelligence records and analysis jobs with validation, rate limits, and clear retention controls.
- [ ] Keep user-submitted text ephemeral unless an explicit, separate retention decision is made.
- [ ] Connect the Next.js app to the API; add operational logging without logging sensitive submitted content.
- [ ] Deploy the API separately from Vercel and document dev, preview, and production environment setup.

**Exit condition:** an analysis can be traced to versioned evidence and code without exposing credentials or retaining user text by default.

### 5. Intelligence graph and emerging-threat research

- [ ] Model relationships among evidence, signals, patterns, families, entities, platforms, regions, languages, and time.
- [ ] Add graph exploration only after records have stable IDs and provenance.
- [ ] Establish temporal baselines, novelty definitions, and evaluation windows for emerging-threat candidates.
- [ ] Evaluate alerts against historical data and analyst review before presenting them as predictions.

**Exit condition:** each surfaced relationship or candidate threat can be inspected back to supporting evidence, time window, and uncertainty.

### 6. Product surfaces and expansion

- [ ] Treat text analysis as one entry point into the intelligence model.
- [ ] Add screenshot/OCR and URL analysis after text provenance and evaluation are reliable.
- [ ] Add audio/video transcription later, with language and transcription uncertainty represented.
- [ ] Build analyst and public intelligence views from the same vetted records; never invent live counts or coverage claims.

## Working cadence

Keep one milestone active at a time. Every work item should name its owner/decision, deliverable, and exit condition. Prefer reviewable increments; update this file and `PROJECT_CONTEXT.md` as decisions change. Do not add user-facing risk scores, live-feed language, coverage claims, or prediction claims until the underlying data and evaluation support them.
