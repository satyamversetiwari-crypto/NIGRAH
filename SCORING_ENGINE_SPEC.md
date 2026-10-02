# SCORING_ENGINE_SPEC.md
# NIGRAH Scoring Engine Specification v1.0

Version: 1.0

Status: MVP Canonical Specification

Dependency:
INTELLIGENCE_SPEC.md v1.0

Purpose:

Define the mathematical framework used to transform detected threat signals, manipulation patterns, scam families, and intelligence evidence into explainable risk scores.

---

# 1. Design Philosophy

The NIGRAH Scoring Engine must satisfy five principles.

## Principle 1

Explainability

Every score must be traceable.

The system must always answer:

- Why was this score generated?
- Which signals contributed?
- Which patterns contributed?
- Which scam family contributed?

---

## Principle 2

 Deterministic First

For MVP:

Scores must be rule-based.

No black-box prediction.

No hidden AI scoring.

---

## Principle 3

Evidence Weighted

Stronger evidence produces stronger confidence.

---

## Principle 4

Scalable Architecture

Future ML models should enhance scoring.

Not replace scoring.

---

## Principle 5

Auditability

Every score must be reproducible.

---

# 2. Scoring Architecture

NIGRAH produces:

## Threat Index (TI)

Measures current threat severity.

Range:

0-100

---

## Confidence Score (CS)

Measures confidence in analysis.

Range:

0-100

---

## Family Similarity Score (FSS)

Measures similarity with known scam families.

Range:

0-100

---

## Emerging Threat Index (ETI)

Measures novelty and growth of unknown threats.

Range:

0-100

---

# 3. Threat Signal Score (TSS)

Purpose:

Measure manipulation intensity.

---

Formula:

TSS = Sum(Detected Signal Weights)

---

Example

Detected:

TS-01 Guaranteed Return = 10

TS-03 Fake Authority = 9

TS-06 Urgency = 8

TS-07 Scarcity = 8

Total:

TSS = 35

---

Maximum Possible Signal Weight

Total Signal Weights:

194

(From INTELLIGENCE_SPEC v1.0)

---

Normalized TSS

TSSN =

(TSS / 194) × 100

Example:

35 / 194 × 100

=

18.04

---

Output:

0-100

---

# 4. Pattern Score (PS)

Purpose:

Measure psychological manipulation intensity.

---

Pattern Activation Rule

A pattern becomes active when:

Minimum 2 signals from that pattern are detected.

---

Pattern Strength Formula

Pattern Strength =

Detected Signals

÷

Total Signals in Pattern

---

Example

Greed Engineering

Contains:

TS-01
TS-02
TS-08

Detected:

TS-01
TS-08

Pattern Strength

=

2/3

=

0.67

---

Pattern Score

PS =

Average(All Activated Pattern Strengths)

×100

---

Output:

0-100

---

# 5. Family Similarity Score (FSS)

Purpose:

Measure similarity with known scam families.

---

Formula

FSS =

Matched Family Patterns

÷

Total Family Patterns

×100

---

Example

Telegram Signal Fraud

Required:

MP-02
MP-03
MP-04

Detected:

MP-02
MP-03
MP-04

Similarity:

100

---

Detected:

MP-02
MP-03

Similarity:

66.7

---

Output:

0-100

---

# 6. Family Harm Score (FHS)

Purpose:

Represent historical severity.

This score is static in MVP.

Stored in database.

---

## Harm Scale

0-100

---

Family Harm Table

SF-01 Fake Advisor Fraud = 75

SF-02 Fake Research Analyst Fraud = 80

SF-03 Telegram Signal Fraud = 70

SF-04 WhatsApp Tip Scam = 70

SF-05 Guaranteed Return Scheme = 75

SF-06 Ponzi Scheme = 95

SF-07 Pyramid Scheme = 90

SF-08 Pump And Dump = 85

SF-09 Fake Trading App = 95

SF-10 Clone Broker Platform = 90

SF-11 Fake IPO Scam = 85

SF-12 Recovery Scam = 80

SF-13 Investment Coaching Scam = 60

SF-14 Premium Membership Scam = 55

SF-15 Referral Fraud = 70

---

# 7. Confidence Score (CS)

Purpose:

Measure reliability of analysis.

---

Confidence Components

Signal Confidence = 40%

Pattern Confidence = 25%

Family Similarity = 25%

Evidence Quality = 10%

---

Formula

CS =

0.40(Signal Coverage)

+
0.25(Pattern Consistency)

+
0.25(Family Similarity)

+
0.10(Evidence Quality)

---

Signal Coverage

Detected Signals

÷

Total Possible Signals

×100

---

Pattern Consistency

Activated Patterns

÷

Expected Family Patterns

×100

---

Evidence Quality

Level 1 Sources = 100

Level 2 Sources = 90

Level 3 Sources = 80

Level 4 Sources = 60

---

Output

0-100

---

# 8. Regional Impact Score (RIS)

Purpose:

Measure regional prevalence.

---

MVP Implementation

Static Intelligence Values

---

Scale

Low = 30

Moderate = 60

High = 80

Critical = 100

---

Future Version

Derived from:

Evidence Count

Region Growth

Threat Concentration

---

# 9. Growth Rate Score (GRS)

Purpose:

Measure trend acceleration.

---

Formula

GRS =

(Current Mentions

÷

Previous Mentions)

×100

---

Normalization

Cap at 100

---

Examples

100 vs 100

=

100

---

200 vs 100

=

200

↓

100

(Capped)

---

50 vs 100

=

50

---

Output

0-100

---

# 10. Threat Index (TI)

Purpose:

Primary risk score.

---

Formula

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

---

Output

0-100

---

Risk Levels

0-20

LOW

---

21-40

MODERATE

---

41-60

ELEVATED

---

61-80

HIGH

---

81-100

CRITICAL

---

# 11. Emerging Threat Index (ETI)

Purpose:

Detect new scam ecosystems.

---

Concept

Known threats have:

High Similarity

Low Novelty

---

Emerging threats have:

Moderate Similarity

High Novelty

Fast Growth

---

ETI Components

Novelty Score (40%)

Velocity Score (25%)

Spread Score (20%)

Similarity Deviation (15%)

---

Formula

ETI =

0.40(NS)

+
0.25(VS)

+
0.20(SS)

+
0.15(SDS)

---

Novelty Score

Measures unknown signal combinations.

---

Velocity Score

Measures growth speed.

---

Spread Score

Measures geographic spread.

---

Similarity Deviation

Measures distance from known families.

---

Output

0-100

---

ETI Levels

0-30

NORMAL

---

31-60

WATCHLIST

---

61-80

EMERGING THREAT

---

81-100

CRITICAL EMERGING THREAT

---

# 12. Explainability Layer

Every analysis must generate:

Detected Signals

Detected Patterns

Predicted Family

Family Similarity

Threat Index

Confidence Score

Reasoning Summary

---

Example

Threat Index: 87

Risk Level: Critical

Detected Signals:

- Guaranteed Return
- Fake Authority
- Scarcity
- Urgency

Detected Patterns:

- Greed Engineering
- Authority Exploitation
- Pressure Engineering

Predicted Family:

Telegram Signal Fraud

Similarity:

91%

Confidence:

88%

Explanation:

This content exhibits multiple high-risk manipulation signals commonly associated with Telegram Signal Fraud. The combination of guaranteed returns, authority claims, urgency, and scarcity creates a high-confidence threat profile.

---

# 13. MVP Scoring Freeze

Threat Signal Score = Enabled

Pattern Score = Enabled

Family Similarity Score = Enabled

Family Harm Score = Enabled

Confidence Score = Enabled

Threat Index = Enabled

Regional Impact = Demo Version

Growth Rate Score = Demo Version

Emerging Threat Index = Experimental

This specification becomes the canonical scoring framework for all NIGRAH MVP development.