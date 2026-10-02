# NIGRAH Specification Review

## Status

The approved `SPEC_AMENDMENT_v1.1.md` resolves the major conflicts found across the v1.0 documents. It is authoritative for MVP implementation. The original v1.0 files remain in the repository for traceability.

Resolved by v1.1:

- TSS normalization denominator is 197.
- Single-signal patterns activate on one signal; patterns with multiple signals require two.
- Scoring Engine TI formula supersedes the earlier TI formula.
- Family similarity is structural overlap, with up to three ranked matches; it is not probability or confidence.
- Confidence components are redefined to avoid reusing the old signal-coverage formulation.
- Growth is dashboard intelligence only for MVP.
- User text/media/URLs are deleted after analysis; only specified result metadata may be retained.
- Family harm values are labeled expert-assigned priors with provenance metadata.
- Regional demo values must be labeled synthetic/demo.
- Knowledge graph is generated at runtime; no graph persistence is needed for MVP.
- Analysis outputs record the spec/scoring versions and core result fields for reproducibility.

## Remaining implementation decisions

These details are still needed before enabling persisted results or displaying CS/TI as a complete score. Resolve them in a versioned scoring or schema amendment rather than inventing behavior in code.

### Scoring inputs and missing data

1. **Evidence Quality (EQ):** define aggregation across multiple source records and behavior when an analysis has no public-source evidence. A user-submitted message is an analysis input, not automatically a source record.
2. **Signal Strength (SS):** define how each detector receives an evidence-confidence value. Phrase presence alone cannot be treated as certainty that the underlying signal is true. Establish confidence values through reviewed examples.
3. **Pattern Consistency (PC):** define its numerical formula. State what score applies when zero patterns activate.
4. **Family Stability (FS):** the top-minus-second-family gap is clear when two families exist; define the behavior for one family or no family. Define deterministic tie-breaking for family ranks.
5. **Family terms in TI:** TI includes FHS and FSS but up to three families are returned. Define whether the primary family supplies FHS/FSS or how the candidates are combined.
6. **TI availability:** define required evidence/data minimums and missing-component behavior. Do not silently fill unavailable factors with zero or fabricated defaults.
7. **PS edge cases:** the pattern activation threshold is now clear. Confirm PS is zero when no pattern activates and how multiple simultaneous patterns are averaged (the scoring spec suggests mean strength).
8. **TSS aggregation:** define deduplication across repeated phrase matches and whether one detected TS contributes its weight once per evidence item or once per distinct source.

### Database and privacy implementation

9. **Schema constraints:** add explicit foreign keys, unique constraints, deletion behavior, UTC/timestamptz policy, 0–100 checks, source/evidence review status, and spec/scoring version references before Alembic migrations.
10. **Ephemeral input processing:** define temporary file/text handling, deletion timing after analysis, and ensure request logs, traces, and error reports cannot preserve submitted content. Persistent result fields must follow v1.1's allowlist.
11. **Audit record:** preserve analysis ID, spec/scoring versions, timestamp, detected signals, activated patterns, top families, TI, and CS without copying the original user input into the record.

### Data acquisition and demo labels

12. **Source access:** document permitted access methods, source terms, update cadence, rate limits, and review. Publicly visible does not itself define an ingestion method.
13. **Prior metadata:** populate author, rationale, assignment date, and version for each expert-assigned family harm prior from the supplied scoring spec; state that these values are not empirical.
14. **Regional demo values:** mark every synthetic record and visual distinctly; do not mix it into production-derived results.

## Next engineering order

1. Complete decisions 1–8 and publish a scoring-spec amendment.
2. Finalize schema constraints and the input-deletion/result-allowlist behavior.
3. Implement deterministic scoring and audit records against reviewed examples.
4. Build a small, traceable public-source pilot and evaluation set.
5. Connect Neon/API only after input deletion and persistent-result boundaries are verified.
