# NIGRAH Product and Engineering Roadmap

## Product north star

Build an evidence-based financial threat intelligence system that collects traceable public information, structures recurring behavior, connects related entities and events, and evaluates emerging-threat hypotheses. Message analysis is one interface into that intelligence; it is not the product definition. NIGRAH is a technology initiative, not an investment service or a promise that a user is safe.

## Current state

- **Product framing:** landing page repositioned around intelligence infrastructure and predictive research.
- **Canonical framework:** `INTELLIGENCE_SPEC.md` v1.0 now freezes the MVP scope at 25 signals, 10 patterns, 15 families, TI, a basic knowledge graph, basic ETI, demo-only regional intelligence, and experimental prediction.
- **Approved amendment:** `SPEC_AMENDMENT_v1.1.md` supersedes conflicting v1.0 statements. It fixes TSS max at 197, defines adaptive pattern activation, adopts the detailed TI formula, makes family similarity structural overlap, revises confidence and growth definitions, prohibits permanent user-input retention, labels FHS priors and regional demo data, requires runtime graph generation, and adds score audit fields.
- **Prototype:** browser-only phrase matching now uses the v1.0 signal, pattern, and family catalogs, but has not been evaluated against a reviewed dataset; no server persistence, official source ingestion, calibrated score, live graph, or validated prediction exists yet.
- **Infrastructure:** private GitHub repository, Vercel frontend, and Neon project are connected. The frontend does not use Neon yet.
- **Main next milestone:** settle remaining scoring conventions in `SPEC_REVIEW.md`, then implement the deterministic scoring module and persistence schema with input-deletion controls.

## Ordered work plan

### 0. Product and framework decisions — complete

- [x] Adopt and version `INTELLIGENCE_SPEC.md` v1.0 as the canonical MVP scope.
- [x] Freeze 25 signals, 10 manipulation patterns, and the specified 15 MVP families.
- [x] Adopt the five-component TI formula and source reliability tiers as the target specification.
- [x] Set TI, basic knowledge graph, basic ETI, demo-only regional intelligence, and experimental prediction as MVP scope.

**Remaining specification work:** signal/pattern definitions and scope are locked. Precise SPS, FHS, GRS, RIS, CS, confidence, and ETI transformations still need formal formulas, time windows, provenance requirements, missing-data behavior, and validation rules. No calibrated score is available until those pieces and reviewed data exist.

### 1. Complete scoring conventions — next

- [ ] Define evidence-quality aggregation (EQ) across multiple sources and how analysis with no public source record is handled.
- [ ] Define signal-strength inputs (SS) and per-signal confidence values; do not equate phrase presence with detector certainty.
- [ ] Define pattern-consistency (PC) numerically and behavior when no pattern activates.
- [ ] Define family-stability (FS) for one candidate, tied candidates, and no family match.
- [ ] Define how the primary family's FHS and FSS feed TI when up to three family matches are returned.
- [ ] Define source and data minimums for TI; withhold TI when required evidence is missing.
- [ ] Record these conventions as a versioned amendment before displaying CS/TI.

**Resolved by v1.1:** TSS denominator, single-signal patterns, canonical TI formula, family-similarity meaning, upload retention, expert-assigned FHS metadata, demo regional labels, runtime graph, and analysis audit fields.

**Exit condition:** inputs and missing-data behavior for EQ/SS/PC/FS and family-level TI are deterministic and versioned.

### 2. Implement deterministic scoring

- [ ] Implement TSS/TSSN with the canonical total of 197 and duplicate-signal policy.
- [ ] Implement adaptive pattern activation and PS from v1.1.
- [ ] Implement top-three structural FSS with deterministic ordering and tie behavior.
- [ ] Store FHS priors with required author, rationale, version, and date metadata.
- [ ] Implement CS and TI only after step 1 defines every component input and missing-data rule.
- [ ] Keep ETI experimental and off the public UI until its empirical inputs and review workflow exist.

**Exit condition:** an analysis can be reproduced from its spec/catalog/scoring versions, input evidence metadata, signals, patterns, top families, and recorded scores.

### 3. Evidence governance and data model

- [ ] Define allowed source types and collection methods; begin with public sources and preserve source terms, attribution, and access limits.
- [ ] Set evidence fields: source URI, publisher, publication/observation/collection timestamps, geography, language, excerpt or source artifact reference, source tier, review status, and provenance chain.
- [ ] Define deduplication, corrections, source reliability, recency, corroboration, and analyst review rules.
- [ ] Store public-source evidence under a documented retention policy; delete user-submitted text/media after analysis and persist only the result fields allowed by v1.1.
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
