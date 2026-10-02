# SCORING_AMENDMENT_v1.2.md
# NIGRAH Scoring Amendment v1.2

Version: 1.2

Status: Approved MVP Scoring Amendment

Date: September 2026

Supersedes:

- SCORING_ENGINE_SPEC.md v1.0 (where explicitly amended)
- SPEC_AMENDMENT_v1.1.md (where explicitly amended)

Purpose:

This amendment resolves all remaining scoring ambiguities identified during the NIGRAH Specification Review and establishes deterministic implementation rules for the MVP scoring engine.

This document is authoritative for:

- Threat Index calculation
- Confidence Score calculation
- Pattern scoring
- Family ranking
- Score availability
- Signal aggregation
- Audit consistency

---

# 1. Amendment Objective

NIGRAH must generate scores that are:

- Explainable
- Reproducible
- Deterministic
- Auditable

No score may depend on hidden logic.

Every score must be traceable back to:

Evidence
↓
Threat Signals
↓
Manipulation Patterns
↓
Scam Families
↓
Threat Intelligence

---

# AMENDMENT 01

# Evidence Quality (EQ)

## Purpose

Evidence Quality measures the reliability of supporting intelligence sources used during analysis.

EQ is not threat severity.

EQ is not confidence.

EQ measures source trustworthiness.

---

## Source Reliability Levels

Level 1

Reliability = 100

Sources:

- SEBI
- RBI
- CERT-In

---

Level 2

Reliability = 90

Sources:

- Courts
- Government Publications

---

Level 3

Reliability = 80

Sources:

- Financial Media

---

Level 4

Reliability = 60

Sources:

- Public Sources
- Public Social Content

---

## Aggregation Formula

When multiple evidence sources exist:

```text
EQ =
Σ(Source Reliability)
÷
Number of Sources
```

---

## Example

Sources:

```text
SEBI = 100

Mint = 80

Moneycontrol = 80
```

Result:

```text
EQ =
(100+80+80)
/3

86.67
```

---

## No Public Evidence Case

User submission only.

Examples:

- Screenshot
- WhatsApp message
- Audio upload
- Video upload

No supporting intelligence source exists.

Result:

```text
EQ = N/A
```

---

## Implementation Rule

The system must never fabricate Evidence Quality.

If evidence is unavailable:

```text
EQ = N/A
```

---

# Status

APPROVED

---

# AMENDMENT 02

# Signal Strength (SS)

## Purpose

Signal Strength measures detector confidence.

It answers:

```text
How strongly does the evidence support
the presence of a threat signal?
```

---

## Signal Output Structure

Each signal detector returns:

```json
{
  "signal_id":"TS-01",
  "confidence":95
}
```

---

## Example

Input:

```text
Guaranteed 20% monthly return.
```

Output:

```text
TS-01

Confidence = 95
```

---

Input:

```text
Historically our investments returned around 20%.
```

Output:

```text
TS-01

Confidence = 60
```

---

## Formula

```text
SS =
Average(
Detected Signal Confidence Values
)
```

---

## Range

```text
0-100
```

---

## No Signal Case

If no signals are detected:

```text
SS = 0
```

---

# Status

APPROVED

---

# AMENDMENT 03

# Pattern Consistency (PC)

## Purpose

Pattern Consistency measures how completely activated patterns are supported by their constituent signals.

---

## Formula

For each activated pattern:

```text
Pattern Consistency

=

Detected Signals

÷

Total Signals In Pattern

×100
```

---

## Example

MP-02

Greed Engineering

Signals:

```text
TS-01
TS-02
TS-08
```

Detected:

```text
TS-01
TS-08
```

Result:

```text
2/3 ×100

66.67
```

---

## Multiple Patterns

When multiple patterns are active:

```text
PC =
Average(
All Pattern Consistency Scores
)
```

---

## No Pattern Case

If no patterns activate:

```text
PC = 0
```

---

# Status

APPROVED

---

# AMENDMENT 04

# Family Stability (FS)

## Purpose

Family Stability measures classification certainty.

It evaluates separation between competing family matches.

---

## Formula

```text
FS =

Top Family Similarity

-

Second Family Similarity
```

---

## Example

```text
Family A = 91

Family B = 62
```

Result:

```text
FS = 29
```

---

## One Family Case

Only one family qualifies.

Result:

```text
FS = 100
```

Reason:

No competing family exists.

---

## No Family Case

No family qualifies.

Result:

```text
FS = N/A
```

---

## Tie Handling

If similarity scores are equal:

Sort by:

### Step 1

Higher Family Harm Score

---

### Step 2

Alphabetical Family ID

---

This ensures deterministic ranking.

---

# Status

APPROVED

---

# AMENDMENT 05

# Primary Family Selection

## Purpose

Determine which family contributes to Threat Index scoring.

---

## Rule

The highest-ranked family becomes:

```text
Primary Family
```

---

## Selection Logic

```text
Highest Similarity Score

↓

Primary Family
```

---

## TI Components

Threat Index uses:

```text
FHS =
Primary Family Harm Score

FSS =
Primary Family Similarity Score
```

---

## Example

```text
Telegram Fraud

91%
```

```text
WhatsApp Scam

84%
```

Result:

```text
Primary Family

Telegram Fraud
```

---

# Status

APPROVED

---

# AMENDMENT 06

# Threat Index Availability Rules

## Purpose

Prevent fabricated scores.

---

## Minimum Requirements

Threat Index may only be calculated when:

### Requirement 1

```text
At least one Threat Signal detected
```

AND

### Requirement 2

```text
At least one Pattern activated
```

AND

### Requirement 3

```text
At least one Family classified
```

---

## Failure Condition

If any requirement is missing:

```text
TI = N/A
```

---

## User Output

Display:

```text
Insufficient Evidence
```

instead of:

```text
0
```

---

# Status

APPROVED

---

# AMENDMENT 07

# Pattern Score Clarification

## Purpose

Finalize PS implementation.

---

## Pattern Strength

For each active pattern:

```text
Pattern Strength

=

Detected Signals

÷

Pattern Signals
```

---

## Pattern Score Formula

```text
PS =

Average(
All Active Pattern Strengths
)

×100
```

---

## Example

Pattern A

```text
67
```

Pattern B

```text
100
```

Result:

```text
PS

=

83.5
```

---

## No Pattern Case

```text
PS = 0
```

---

# Status

APPROVED

---

# AMENDMENT 08

# Threat Signal Deduplication

## Purpose

Prevent score inflation.

---

## Rule

A Threat Signal contributes weight only once per analysis.

---

## Example

Input:

```text
Guaranteed Return

Guaranteed Return

Guaranteed Return
```

Detected:

```text
TS-01
```

Contribution:

```text
Weight = 10
```

Only once.

---

## Invalid Behavior

```text
10 + 10 + 10
```

is prohibited.

---

## Valid Behavior

```text
10
```

---

# Status

APPROVED

---

# AMENDMENT 09

# Analysis Availability States

To improve frontend clarity.

---

## State A

Full Intelligence Available

Requirements:

- Signals
- Patterns
- Families

Available

Output:

```text
Threat Index

Confidence Score

Family Similarity
```

---

## State B

Partial Intelligence

Requirements:

Signals exist

Patterns or Families missing

Output:

```text
Detected Signals

Preliminary Analysis
```

---

No Threat Index.

---

## State C

No Intelligence

No signals detected.

Output:

```text
No Significant Threat Signals Detected
```

---

No Threat Index.

---

# Status

APPROVED

---

# AMENDMENT 10

# Audit Requirements

Every stored analysis result must contain:

```text
Analysis ID

Timestamp

Specification Version

Scoring Version

Detected Signals

Activated Patterns

Top 3 Families

Threat Index

Confidence Score

Family Similarity Score
```

---

## Prohibited Storage

Per SPEC_AMENDMENT_v1.1:

The following shall NOT be retained:

```text
Original Text

Original Screenshot

Original Audio

Original Video

Original URL Content
```

after processing.

---

# Status

APPROVED

---

# MVP Scoring Freeze v1.2

Threat Signal Score (TSS)
Enabled

Threat Signal Score Normalized (TSSN)
Enabled

Pattern Consistency (PC)
Enabled

Pattern Score (PS)
Enabled

Family Similarity Score (FSS)
Enabled

Family Stability (FS)
Enabled

Family Harm Score (FHS)
Enabled

Confidence Score (CS)
Enabled

Threat Index (TI)
Enabled

Growth Rate Score (GRS)
Dashboard Only

Regional Impact Score (RIS)
Demo Only

Emerging Threat Index (ETI)
Experimental

---

# Final Amendment Statement

SCORING_AMENDMENT_v1.2.md establishes the final deterministic scoring rules for NIGRAH MVP.

In case of scoring conflicts:

```text
SCORING_AMENDMENT_v1.2.md
```

takes precedence over:

```text
SCORING_ENGINE_SPEC.md
```

and supplements:

```text
SPEC_AMENDMENT_v1.1.md
```

for all scoring-related implementation decisions.