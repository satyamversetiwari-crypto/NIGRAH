# DATA_COLLECTION_SPEC.md
# NIGRAH Data Collection Specification v1.0

Version: 1.0

Status: Canonical MVP Specification

Dependencies:

- INTELLIGENCE_SPEC.md
- SCORING_ENGINE_SPEC.md
- DATABASE_SCHEMA.md

Purpose:

Define how NIGRAH collects, validates, stores, and utilizes public intelligence data for scam detection, threat scoring, and emerging threat identification.

---

# 1. Collection Philosophy

NIGRAH is an intelligence system.

The system must never rely solely on user reports.

Instead, intelligence should originate from:

- Public evidence
- Regulatory evidence
- Verified publications
- Publicly observable scam behavior

---

# 2. Core Data Principle

Every intelligence claim must be backed by evidence.

No signal.

No pattern.

No scam family.

No threat score.

Without evidence.

---

# 3. Data Categories

NIGRAH collects five categories of intelligence.

---

Category A

Regulatory Intelligence

---

Category B

Government Intelligence

---

Category C

Media Intelligence

---

Category D

Open Source Intelligence (OSINT)

---

Category E

User Submitted Intelligence

---

# 4. Regulatory Intelligence Sources

Highest priority.

Reliability Score: 100

---

## SEBI

Data Types:

- Investor alerts
- Enforcement orders
- Warnings
- Advisory notices
- Registered intermediaries

Use Cases:

- Scam family validation
- Signal identification
- Authority verification

---

## RBI

Data Types:

- Fraud advisories
- Banking alerts
- Financial warnings

---

## CERT-In

Data Types:

- Cyber fraud advisories
- Phishing alerts
- Digital fraud reports

---

# 5. Government Intelligence Sources

Reliability Score: 90

Sources:

- National Cyber Crime Portal
- Ministry advisories
- Court judgments
- Parliamentary reports

Purpose:

Historical validation.

Trend analysis.

---

# 6. Financial Media Sources

Reliability Score: 80

Sources:

- Economic Times
- Mint
- Moneycontrol
- Business Standard
- Financial Express

Collected Data:

- Scam reports
- Fraud investigations
- Investor warnings
- Regulatory actions

---

# 7. Open Source Intelligence (OSINT)

Reliability Score: 60

Sources:

- Public websites
- Public Telegram channels
- Public YouTube videos
- Public discussion forums
- Public social media posts

Purpose:

Early signal detection.

Emerging threat monitoring.

---

# 8. User Submitted Intelligence

Purpose:

Real-world scam analysis.

Supported Formats:

- Text
- Screenshot
- Audio
- Video
- URL

Examples:

- WhatsApp messages
- Telegram screenshots
- Call recordings
- Investment websites

Important:

User submissions are analysis inputs.

They do not automatically become intelligence evidence.

---

# 9. Evidence Collection Pipeline

Source
↓
Content Collection
↓
Content Validation
↓
Evidence Creation
↓
Signal Extraction
↓
Pattern Detection
↓
Family Classification
↓
Threat Intelligence Storage

---

# 10. Evidence Record Structure

Every evidence record must contain:

```json
{
  "source": "",
  "source_type": "",
  "published_date": "",
  "region": "",
  "content": "",
  "reliability_score": "",
  "language": ""
}
```

---

# 11. Evidence Reliability Framework

Level 1

Reliability: 100

Sources:

- SEBI
- RBI
- CERT-In

---

Level 2

Reliability: 90

Sources:

- Government
- Courts

---

Level 3

Reliability: 80

Sources:

- Financial Media

---

Level 4

Reliability: 60

Sources:

- Public Sources

---

# 12. Signal Extraction Rules

Signals must originate from evidence.

Examples:

---

Content:

"Guaranteed 20% monthly return."

Detected:

TS-01 Guaranteed Return

---

Content:

"Only 10 seats left."

Detected:

TS-07 Scarcity

---

Content:

"Join today before market opens."

Detected:

TS-06 Urgency

---

# 13. Pattern Formation Rules

Patterns emerge from multiple signals.

Example:

Signals:

- TS-01
- TS-02
- TS-08

Pattern:

MP-02 Greed Engineering

Activation Rule:

Minimum two constituent signals.

---

# 14. Scam Family Formation Rules

Families emerge from patterns.

Example:

Patterns:

- MP-02
- MP-03
- MP-04

Family:

SF-03 Telegram Signal Fraud

---

# 15. Regional Intelligence Rules

Every evidence record may contain:

State

City

Platform

Language

---

Example:

```json
{
  "state": "Uttar Pradesh",
  "city": "Varanasi",
  "platform": "Telegram",
  "language": "Hindi"
}
```

Purpose:

Regional threat mapping.

---

# 16. Emerging Threat Detection Rules

A threat becomes a Watchlist Candidate when:

- Novel signal combinations appear
- New scam terminology appears
- Growth rate exceeds threshold
- Multiple regions report similar behavior

---

Watchlist Criteria

Minimum:

- 5 evidence records
- 2 regions
- 30-day observation window

---

# 17. Data Retention Policy

MVP:

Evidence retained indefinitely.

User uploads retained for analysis history.

Future versions may introduce retention periods.

---

# 18. Duplicate Detection

Evidence Hash

Generated from:

Source URL
+
Normalized Content

Purpose:

Prevent duplicate intelligence records.

---

# 19. Manual Review Layer

Required For:

- New scam families
- Emerging threat candidates
- High ETI outputs

Purpose:

Reduce false positives.

---

# 20. MVP Collection Scope

Phase 1

Manual Intelligence Dataset

Sources:

- SEBI Alerts
- RBI Advisories
- CERT-In Alerts
- Major Financial News

Target:

100-300 evidence records

---

Phase 2

Semi-Automated Collection

- RSS feeds
- Public website ingestion
- Scheduled updates

---

Phase 3

Emerging Threat Monitoring

- Telegram
- YouTube
- Public websites

---

# 21. Success Metrics

MVP Success Means:

- Evidence collected successfully
- Signals extracted correctly
- Patterns detected correctly
- Scam families classified correctly
- Threat Index generated consistently

Not:

- Perfect scam prediction

Not:

- Fully autonomous intelligence

---

# 22. Canonical MVP Dataset Targets

Evidence Records:
100+

Threat Signals:
25

Manipulation Patterns:
10

Scam Families:
15

Regions:
5+

Source Categories:
4

This document serves as the canonical intelligence collection framework for all NIGRAH MVP development.