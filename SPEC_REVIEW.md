# NIGRAH Specification Review

This review records implementation blockers found when the canonical specs were combined. The supplied documents are preserved verbatim as versioned source specs. Decisions below are required before scores, data retention, or automated collection are enabled.

## Adopted document precedence

1. `INTELLIGENCE_SPEC.md` defines the canonical MVP catalog and feature scope.
2. `SCORING_ENGINE_SPEC.md` is the detailed scoring authority and supersedes the earlier TI formula in the intelligence spec. That supersession is noted in `INTELLIGENCE_SPEC.md`.
3. `DATABASE_SCHEMA.md` defines the proposed relational tables and API surface.
4. `DATA_COLLECTION_SPEC.md` defines source classes and the collection pipeline.
5. Where documents conflict, record an explicit versioned amendment; do not silently choose values in code.

## Blocking inconsistencies and decisions

### 1. Total signal weight

The 25 weights in `INTELLIGENCE_SPEC.md` sum to **197**, while `SCORING_ENGINE_SPEC.md` states a maximum of **194**. Since `TSSN = TSS / maximum × 100`, the denominator must be corrected to 197, or the canonical signal weights must be amended. Until fixed, normalized TSS is not trustworthy.

### 2. Pattern activation for one-signal patterns

The scoring spec activates a pattern only when at least two constituent signals are detected. But MP-08 and MP-10 each have one signal in the intelligence spec. Decide whether these patterns activate on one signal, whether mappings change, or whether a different rule applies. Otherwise opportunistic targeting and network expansion can never activate.

### 3. TI versions

The first intelligence spec gives `TI = .30 SPS + .25 FHS + .15 GRS + .15 RIS + .15 CS`. The later detailed scoring spec gives `TI = .30 TSSN + .20 PS + .20 FHS + .15 FSS + .15 CS`. The latter is selected as the detailed implementation authority, but it changes component weights and adds PS/FSS while removing GRS/RIS from the final weighted formula. Confirm this is an intentional replacement; GRS/RIS currently remain specified separately/demo-only.

### 4. Pattern and family classification rules

Pattern strength is defined as the fraction of its constituent signals detected, but activation requires two detections. Family similarity is the fraction of linked patterns matched, yet no minimum evidence/activation threshold or tie handling is specified. Define how single-pattern families and multiple equal candidates are represented; report similarity as structural overlap, not probability.

### 5. Confidence is not yet a reliability measure

The proposed confidence formula uses signal coverage (`detected signals / all 25`) and pattern consistency (`activated patterns / expected family patterns`). These measure catalog coverage and structural overlap; they do not by themselves establish that evidence is reliable. Evidence quality levels are source-level constants, and a weighted aggregation across multiple sources is missing. Define whether CS is analysis confidence, source reliability, or both, and avoid counting the same signals again through patterns/family similarity.

### 6. Growth score behavior

`GRS = min(current mentions / previous mentions × 100, 100)` gives 100 both when activity is flat and whenever activity doubles or more. It is a capped activity ratio, not a discriminating acceleration score. Define zero-baseline handling, sample minimums, time windows, and whether to retain this formula or amend the metric before interpreting it as growth.

### 7. Static harm and regional values

FHS family values and RIS category values are proposed static MVP values without cited derivation or review source. Store them as provisional expert-assigned priors with source/version/rationale; do not describe them as measured historical harm or regional prevalence. Clearly label any demo region data as synthetic.

### 8. Evidence retention and user submissions

`DATA_COLLECTION_SPEC.md` says evidence is retained indefinitely and user uploads are retained for analysis history. Earlier project copy and the live prototype say submitted text is not saved. Keep user submissions out of persistent storage until product copy, explicit user notice/consent, access/deletion controls, and an approved retention policy are designed. Public-source evidence and user submissions are separate data classes; a user report must not become source intelligence automatically.

### 9. Database integrity and auditability

The schema draft names relationships but omits explicit foreign keys, uniqueness, deletion behavior, timezone policy, catalog/scoring version references, and constraints for 0–100 values. Before migrations, define these constraints and include evidence provenance, collection timestamps, review status, and source-content hashes. Persisting every user analysis also needs a product decision; the current privacy statement says the prototype does not save text.

### 10. Acquisition boundaries

The source list includes public social channels and a 100–300-record pilot target. For each source, record access method, permitted use/terms, crawl limits, personal-data minimization, and whether the source is reviewable and stable. New families and emerging-threat candidates require human review as specified.

## Safe implementation sequence

1. Resolve items 1–6 and publish a scoring-spec amendment.
2. Amend the data spec for provenance, explicit source access rules, and user-submission retention/consent.
3. Finalize schema constraints and seed catalog versions before creating migrations.
4. Implement ingestion and scoring against reviewed public evidence; keep demo values visibly synthetic.
5. Only then connect production analysis results to a user-facing TI, CS, FSS, or ETI.
