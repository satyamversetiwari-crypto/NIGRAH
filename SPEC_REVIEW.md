# NIGRAH Specification Review

## Status

Scoring rules are final for the MVP under `SCORING_AMENDMENT_v1.2.md`. Do not reopen these decisions while implementing the MVP.

- Unique signal weights are normalized against 197; repeat phrases do not add weight again.
- Multi-signal patterns activate at two constituent signals; single-signal patterns activate at one.
- Pattern Score and Pattern Consistency are the mean strength of activated patterns.
- Family similarity is structural overlap. Return up to three; ties sort by harm prior, then family ID.
- One family candidate gives Family Stability 100; no candidate gives N/A.
- The highest-ranked family supplies FHS and FSS for TI.
- CS uses EQ, SS, PC, and FS. TI requires signals, an active pattern, a family, and a computable CS.
- With user-submitted input alone, EQ is N/A, so CS and TI are withheld; do not substitute zeros.
- User-submitted content is deleted after analysis. Store only the result fields allowed by v1.1/v1.2.
- FHS values are expert-assigned priors; regional values are demo-only; GRS is dashboard-only; ETI remains experimental.

## Implementation status

- The versioned catalog contains the 25 canonical signals, ten patterns, 15 families, and expert-assigned FHS priors.
- `apps/web/lib/scoring.ts` implements TSS/TSSN, adaptive activation outputs, PS/PC, family ranking/FSS/FS, EQ handling, CS, TI, and the three analysis availability states.
- The browser-only text interface has no linked public sources; therefore it can show preliminary signal/pattern/family matches, while EQ, CS, and TI remain N/A.
- No database schema/migrations, public-source ingestion, API, persisted results, or runtime graph are implemented yet.

## Next work

1. Implement the PostgreSQL schema and migrations from `DATABASE_SCHEMA.md`, including required audit/version fields.
2. Build a small manually curated public-source dataset with provenance and review metadata.
3. Connect source evidence to analyses so EQ can be calculated; continue deleting user input after processing.
4. Add runtime graph generation and dashboard views after the source records exist.
