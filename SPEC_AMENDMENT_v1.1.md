# SPEC_AMENDMENT_v1.1.md
# NIGRAH Specification Amendment v1.1

Version: 1.1

Status: Approved MVP Amendment

Date: September 2026

Purpose:

This amendment resolves architectural, mathematical, scoring, retention, and implementation ambiguities identified during the NIGRAH Specification Review.

This document supersedes conflicting statements in:

- INTELLIGENCE_SPEC.md v1.0
- SCORING_ENGINE_SPEC.md v1.0
- DATABASE_SCHEMA.md v1.0
- DATA_COLLECTION_SPEC.md v1.0

All future MVP development must follow this amendment.

---

# 1. Amendment Philosophy

NIGRAH is designed around:

Evidence
↓
Threat Signals
↓
Manipulation Patterns
↓
Scam Families
↓
Threat Intelligence

The objective of this amendment is to ensure:

- Mathematical consistency
- Explainable scoring
- Auditability
- Privacy preservation
- Deterministic implementation

---

# AMENDMENT 01

# Canonical Signal Weight Total

## Issue

SCORING_ENGINE_SPEC.md states:

```text
Maximum Signal Weight = 194
```

However, the 25 threat signal weights defined in INTELLIGENCE_SPEC.md sum to:

```text
197
```

---

## Resolution

Canonical Maximum Signal Weight:

```text
197
```

---

## Updated Formula

Threat Signal Score Normalized

```text
TSSN =
(TSS / 197)
×100
```

---

## Status

APPROVED

---

# AMENDMENT 02

# Adaptive Pattern Activation

## Issue

Current rule:

```text
A pattern activates only when
at least two constituent signals are detected.
```

Problem:

Patterns MP-08 and MP-10 contain only one signal.

These patterns would never activate.

---

## Resolution

Adaptive Activation Rule

### Pattern contains one signal

Activation Requirement:

```text
1 detected signal
```

---

### Pattern contains two or more signals

Activation Requirement:

```text
Minimum 2 detected signals
```

---

## Examples

### MP-08 Opportunistic Targeting

Contains:

```text
TS-22
```

Detected:

```text
TS-22
```

Result:

```text
ACTIVE
```

---

### MP-10 Network Expansion

Contains:

```text
TS-25
```

Detected:

```text
TS-25
```

Result:

```text
ACTIVE
```

---

## Status

APPROVED

---

# AMENDMENT 03

# Canonical Threat Index Formula

## Issue

Two competing Threat Index formulas exist.

---

### Formula A

(INTELLIGENCE_SPEC.md)

```text
TI =
0.30 SPS
+
0.25 FHS
+
0.15 GRS
+
0.15 RIS
+
0.15 CS
```

---

### Formula B

(SCORING_ENGINE_SPEC.md)

```text
TI =
0.30 TSSN
+
0.20 PS
+
0.20 FHS
+
0.15 FSS
+
0.15 CS
```

---

## Resolution

Formula B becomes the official MVP Threat Index.

Formula A is deprecated.

---

## Canonical Threat Index

```text
TI =
0.30(TSSN)
+
0.20(PS)
+
0.20(FHS)
+
0.15(FSS)
+
0.15(CS)
```

---

Where:

TSSN = Threat Signal Score Normalized

PS = Pattern Score

FHS = Family Harm Score

FSS = Family Similarity Score

CS = Confidence Score

---

## Status

APPROVED

---

# AMENDMENT 04

# Family Similarity Classification

## Issue

Family Similarity lacks tie handling and ranking behavior.

---

## Resolution

Similarity represents:

```text
Structural Overlap
```

NOT

```text
Probability
```

NOT

```text
Prediction Confidence
```

---

## Output Rule

The engine returns:

```text
Top 3 Matching Families
```

---

Example

```text
1.
Telegram Signal Fraud
91%

2.
WhatsApp Tip Scam
84%

3.
Pump And Dump
78%
```

---

## Frontend Rule

Display:

```text
Primary Scam Family
```

=

Highest Similarity Score

---

## Status

APPROVED

---

# AMENDMENT 05

# Confidence Score Redefinition

## Issue

The original Confidence Score formula double-counted signal and pattern information.

The score did not accurately represent analytical confidence.

---

## Resolution

Confidence Score is redefined as:

```text
How confident NIGRAH is
that the analysis is correct.
```

Confidence Score is NOT:

```text
Threat Severity
```

and NOT:

```text
Risk Level
```

---

## New Formula

```text
CS =
0.40(EQ)
+
0.30(SS)
+
0.20(PC)
+
0.10(FS)
```

---

### EQ

Evidence Quality

Measures source reliability.

---

### SS

Signal Strength

Measures average confidence of detected signals.

---

### PC

Pattern Consistency

Measures coherence of activated patterns.

---

### FS

Family Stability

Measures separation between top family and second family.

---

## Family Stability Formula

```text
FS =
Top Family Similarity
-
Second Family Similarity
```

---

Example

```text
Top Family:
92%

Second Family:
50%
```

---

Gap:

```text
42
```

Higher gap

↓

Higher confidence

---

## Status

APPROVED

---

# AMENDMENT 06

# Growth Rate Score Revision

## Issue

Current formula:

```text
(Current / Previous)
×100
```

cannot distinguish between:

```text
100 → 100
```

and

```text
100 → 200
```

Both become capped values.

---

## Resolution

Replace with growth percentage.

---

## New Formula

```text
GRS =
(
(Current - Previous)
/
max(Previous,1)
)
×100
```

---

## Examples

### Flat Growth

```text
100 → 100
```

Output:

```text
0%
```

---

### Moderate Growth

```text
100 → 150
```

Output:

```text
50%
```

---

### High Growth

```text
100 → 200
```

Output:

```text
100%
```

---

## Status

APPROVED

---

# AMENDMENT 07

# User Submission Retention Policy

## Issue

Existing specifications contain conflicting statements regarding storage of user uploads.

---

## Resolution

User submissions and intelligence evidence are separate data classes.

User submissions do NOT automatically become intelligence evidence.

---

## MVP Privacy Rule

NIGRAH shall NOT permanently store:

- Uploaded text
- Uploaded screenshots
- Uploaded audio
- Uploaded video
- Uploaded URLs

after analysis is complete.

---

## Allowed Storage

The system MAY store:

```text
Threat Index

Confidence Score

Detected Signals

Detected Patterns

Detected Families

Timestamp

Model Version
```

---

## Processing Flow

User Upload
↓
Analysis
↓
Score Generation
↓
Result Storage
↓
Input Deletion

---

## Status

APPROVED

---

# AMENDMENT 08

# Family Harm Score Governance

## Issue

Family Harm Scores are currently expert-assigned values.

They are not empirically derived.

---

## Resolution

All Family Harm Scores shall be labeled:

```text
Expert Assigned Prior
```

until validated by future datasets.

---

## Metadata Requirement

Each Family Harm Score must include:

- Version
- Author
- Rationale
- Date Assigned

---

## Status

APPROVED

---

# AMENDMENT 09

# Regional Intelligence Governance

## Issue

Regional scores are not derived from production evidence.

---

## Resolution

All MVP Regional Intelligence values shall be labeled:

```text
Demo Data
```

or

```text
Synthetic Intelligence
```

unless supported by verified evidence.

---

## Status

APPROVED

---

# AMENDMENT 10

# Knowledge Graph Implementation

## Issue

Dedicated graph storage increases MVP complexity.

---

## Resolution

Knowledge Graph shall be generated dynamically.

Source entities:

```text
Signals

Patterns

Families
```

shall form the graph.

---

## MVP Implementation

Technology:

```text
NetworkX
```

Graph generation:

```text
Runtime Generated
```

Database graph persistence:

```text
Not Required
```

for MVP.

---

## Status

APPROVED

---

# AMENDMENT 11

# Auditability Requirements

Every analysis result must record:

```text
Analysis ID

Specification Version

Scoring Version

Timestamp

Detected Signals

Activated Patterns

Top Families

Threat Index

Confidence Score
```

---

Purpose:

Ensure reproducibility.

---

## Status

APPROVED

---

# AMENDMENT 12

# MVP Architecture Freeze

The following components are officially frozen for MVP v1.1:

Threat Signals:

```text
25
```

Manipulation Patterns:

```text
10
```

Scam Families:

```text
15
```

Threat Index:

```text
Enabled
```

Confidence Score:

```text
Enabled
```

Family Similarity:

```text
Enabled
```

Knowledge Graph:

```text
Runtime Generated
```

Regional Intelligence:

```text
Demo Version
```

Emerging Threat Index:

```text
Experimental
```

Growth Rate Score:

```text
Dashboard Intelligence Only
```

---

# Final Amendment Statement

This amendment establishes the authoritative MVP implementation rules for NIGRAH.

In case of future conflict between specifications:

```text
SPEC_AMENDMENT_v1.1.md
```

takes precedence over all prior MVP specifications until superseded by a later amendment.