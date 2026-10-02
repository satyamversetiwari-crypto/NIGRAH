# NIGRAH Product and Engineering Roadmap

## Product north star

Build an evidence-based financial threat intelligence system that collects traceable public information, structures recurring behavior, connects related entities and events, and evaluates emerging-threat hypotheses. Message analysis is one interface into that intelligence; it is not the product definition. NIGRAH is a technology initiative, not an investment service or a promise that a user is safe.

## Current state

- **Product framing:** landing page repositioned around intelligence infrastructure and predictive research.
- **Canonical framework:** `INTELLIGENCE_SPEC.md` v1.0 now freezes the MVP scope at 25 signals, 10 patterns, 15 families, TI, a basic knowledge graph, basic ETI, demo-only regional intelligence, and experimental prediction.
- **Supporting specifications:** scoring, database, and collection v1.0 documents are saved in the repo. Their cross-document conflicts are captured in `SPEC_REVIEW.md`.
- **Prototype:** browser-only phrase matching now uses the v1.0 signal, pattern, and family catalogs, but has not been evaluated against a reviewed dataset; no server persistence, official source ingestion, calibrated score, live graph, or validated prediction exists yet.
- **Infrastructure:** private GitHub repository, Vercel frontend, and Neon project are connected. The frontend does not use Neon yet.
- **Main next milestone:** resolve the scoring and retention conflicts in `SPEC_REVIEW.md`, then implement the canonical catalog and evidence schema before enabling real scores or persistence.

## Ordered work plan

### 0. Product and framework decisions — complete

- [x] Adopt and version `INTELLIGENCE_SPEC.md` v1.0 as the canonical MVP scope.
- [x] Freeze 25 signals, 10 manipulation patterns, and the specified 15 MVP families.
- [x] Adopt the five-component TI formula and source reliability tiers as the target specification.
- [x] Set TI, basic knowledge graph, basic ETI, demo-only regional intelligence, and experimental prediction as MVP scope.

**Remaining specification work:** signal/pattern definitions and scope are locked. Precise SPS, FHS, GRS, RIS, CS, confidence, and ETI transformations still need formal formulas, time windows, provenance requirements, missing-data behavior, and validation rules. No calibrated score is available until those pieces and reviewed data exist.

### 1. Resolve specification conflicts — next

- [ ] Correct the TSS maximum (the listed v1.0 weights sum to 197, not 194).
- [ ] Reconcile the two-signal activation minimum with single-signal MP-08 and MP-10.
- [ ] Confirm the detailed scoring TI formula intentionally supersedes the earlier formula in `INTELLIGENCE_SPEC.md`.
- [ ] Define how confidence avoids confusing catalog coverage with evidence reliability and avoids circular family inputs.
- [ ] Define a growth metric that distinguishes flat activity from acceleration; the current cap makes flat and doubled activity both score 100.
- [ ] Define minimum evidence/tie behavior for family similarity and document static FHS/RIS values as provisional where appropriate.
- [ ] Resolve user-upload retention: the collection spec says indefinite storage, while current UX promises not to save submitted text.

**Exit condition:** a versioned amendment resolves the issues in `SPEC_REVIEW.md`, including user-submission consent/retention, before scoring or persistence goes live.

### 2. Implement the canonical intelligence catalog

- [ ] Replace preliminary text rules with all 25 canonical TS names, weights, categories, and observable examples.
- [ ] Align all ten MP-to-TS relationships exactly to v1.0; display matched-signal coverage, not invented weighted pattern scores.
- [ ] Add the 15 canonical SF definitions and MP links as versioned seed data.
- [ ] Mark signals that text-only analysis cannot establish (such as deepfake detection or whether contact was unsolicited) as requiring other evidence or context.
- [ ] Keep TI and ETI outputs withheld until their component calculations and input requirements are formally specified and validated.

**Exit condition:** application catalog and canonical specs agree on every ID/name/weight/mapping; every finding has a provenance-ready explanation; no unsupported score is shown.

### 3. Evidence governance and data model

- [ ] Define allowed source types and collection methods; begin with public sources and preserve source terms, attribution, and access limits.
- [ ] Set evidence fields: source URI, publisher, publication/observation/collection timestamps, geography, language, excerpt or source artifact reference, source tier, review status, and provenance chain.
- [ ] Define deduplication, corrections, source reliability, recency, corroboration, and analyst review rules.
- [ ] Set data-retention rules separately for public-source records and user-submitted analysis text; default to not retaining submitted text.
- [ ] Design the PostgreSQL schema and migration approach only after the evidence fields and retention boundaries are agreed.

**Exit condition:** a sample evidence record can be traced from an official/public source through normalization and human review without losing its origin or dates.

### 4. Source acquisition pilot

- [ ] Select a small, documented set of high-value public sources from the acquisition framework.
- [ ] For each source, document access method, permitted use, update cadence, expected fields, and failure behavior.
- [ ] Implement ingestion with immutable source references, normalization, deduplication, and review queue.
- [ ] Collect a small, diverse pilot corpus; annotate each item with evidence, family/pattern mapping, and reviewer rationale.

**Exit condition:** the pilot corpus is repeatable to refresh, traceable to its sources, and reviewed for quality and coverage gaps.

### 5. Baseline analysis and validation

- [ ] Align the deterministic extractor and catalog to the adopted signal definitions.
- [ ] Preserve spans, source IDs, extraction method, rule/model version, and explanation for every finding.
- [ ] Create a reviewed evaluation set that includes positive examples, benign lookalikes, ambiguous items, and multiple languages.
- [ ] Measure precision, recall, false-positive patterns, and coverage by family/language before choosing thresholds.
- [ ] Implement pattern and family comparison as explainable evidence-supported outputs; do not describe similarity as probability.
- [ ] Calibrate any score against reviewed data; publish limitations and missing-data behavior alongside it.

**Exit condition:** a versioned baseline has reproducible evaluation results and known limitations. A score is withheld if its required inputs are missing.

### 6. Application API and persistence

- [ ] Create database migrations and least-privilege runtime credentials; keep secrets out of Git.
- [ ] Build an API for public intelligence records and analysis jobs with validation, rate limits, and clear retention controls.
- [ ] Keep user-submitted text ephemeral unless an explicit, separate retention decision is made.
- [ ] Connect the Next.js app to the API; add operational logging without logging sensitive submitted content.
- [ ] Deploy the API separately from Vercel and document dev, preview, and production environment setup.

**Exit condition:** an analysis can be traced to versioned evidence and code without exposing credentials or retaining user text by default.

### 7. Intelligence graph and emerging-threat research

- [ ] Model relationships among evidence, signals, patterns, families, entities, platforms, regions, languages, and time.
- [ ] Add graph exploration only after records have stable IDs and provenance.
- [ ] Establish temporal baselines, novelty definitions, and evaluation windows for emerging-threat candidates.
- [ ] Evaluate alerts against historical data and analyst review before presenting them as predictions.

**Exit condition:** each surfaced relationship or candidate threat can be inspected back to supporting evidence, time window, and uncertainty.

### 8. Product surfaces and expansion

- [ ] Treat text analysis as one entry point into the intelligence model.
- [ ] Add screenshot/OCR and URL analysis after text provenance and evaluation are reliable.
- [ ] Add audio/video transcription later, with language and transcription uncertainty represented.
- [ ] Build analyst and public intelligence views from the same vetted records; never invent live counts or coverage claims.

## Working cadence

Keep one milestone active at a time. Every work item should name its owner/decision, deliverable, and exit condition. Prefer reviewable increments; update this file and `PROJECT_CONTEXT.md` as decisions change. Do not add user-facing risk scores, live-feed language, coverage claims, or prediction claims until the underlying data and evaluation support them.
