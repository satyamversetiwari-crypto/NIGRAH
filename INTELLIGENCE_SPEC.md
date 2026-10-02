# INTELLIGENCE_SPEC.md
# NIGRAH Intelligence Specification v1.0

Version: 1.0
Status: MVP Canonical Specification
Purpose: Define the official intelligence framework used by NIGRAH.

---

# 1. Overview

NIGRAH is a Financial Threat Intelligence System.

Its purpose is to identify, classify, score, and explain financial threats using structured intelligence rather than simple keyword detection.

The intelligence architecture follows:

Threat Signals
↓
Manipulation Patterns
↓
Scam Families
↓
Threat Index
↓
Emerging Threat Intelligence

All future scoring, AI analysis, dashboards, APIs, and datasets must conform to this specification.

---

# 2. Core Principles

## Principle 1

Evidence Before Prediction

Every risk score must be explainable through evidence.

---

## Principle 2

Signals Before Labels

NIGRAH never begins with:

"This is a scam."

NIGRAH begins with:

"Which threat signals are present?"

---

## Principle 3

Patterns Before Families

Scam families are outputs.

Manipulation patterns are the cause.

---

## Principle 4

Explainability First

Every output must provide:

- Signals detected
- Patterns identified
- Family classification
- Threat Index reasoning

---

## Principle 5

Intelligence Over Classification

NIGRAH is not a binary scam detector.

NIGRAH is an intelligence system.

---

# 3. Threat Signal Framework

Threat Signals are the smallest intelligence unit.

A Threat Signal is an observable indicator commonly associated with financial manipulation or fraud.

---

# CATEGORY A
# AUTHORITY SIGNALS

---

## TS-01

Name: Guaranteed Return

Description:

Promises fixed or guaranteed returns regardless of market conditions.

Weight: 10

Examples:

- Guaranteed 20% returns
- Fixed monthly income
- Risk-free profits

---

## TS-02

Name: Unrealistic Return

Description:

Claims unusually high returns.

Weight: 9

Examples:

- Double money in 30 days
- 5x profit guaranteed

---

## TS-03

Name: Fake Authority

Description:

Uses false expertise or credentials.

Weight: 9

Examples:

- Fake SEBI analyst
- Fake investment advisor

---

## TS-04

Name: Impersonation

Description:

Pretending to be a trusted institution or person.

Weight: 10

Examples:

- Fake broker
- Fake regulator

---

## TS-05

Name: Unregistered Entity

Description:

Financial activity without visible registration.

Weight: 8

---

# CATEGORY B
# PRESSURE SIGNALS

---

## TS-06

Name: Urgency

Weight: 8

Examples:

- Join today
- Offer expires tonight

---

## TS-07

Name: Scarcity

Weight: 8

Examples:

- Limited seats
- Last chance

---

## TS-08

Name: FOMO

Weight: 7

Examples:

- Everyone is joining
- Don't miss out

---

# CATEGORY C
# SOCIAL SIGNALS

---

## TS-09

Name: Social Proof

Weight: 7

Examples:

- Profit screenshots
- Success stories

---

## TS-10

Name: Community Pressure

Weight: 6

Examples:

- VIP group
- Exclusive investors club

---

# CATEGORY D
# TRUST HARVESTING SIGNALS

---

## TS-11

Name: Relationship Building

Weight: 6

Examples:

- Personal mentor
- Dedicated advisor

---

## TS-12

Name: Exclusivity

Weight: 6

Examples:

- Invite-only access
- Secret strategy

---

## TS-13

Name: Reciprocity

Weight: 5

Examples:

- Free signal
- Free training

---

## TS-14

Name: Lifestyle Projection

Weight: 5

Examples:

- Luxury cars
- Wealth displays

---

# CATEGORY E
# FINANCIAL CONTROL SIGNALS

---

## TS-15

Name: Payment Diversion

Weight: 10

Examples:

- Personal UPI payment
- Direct transfer requests

---

## TS-16

Name: Withdrawal Restriction

Weight: 10

Examples:

- Pay fee before withdrawal
- Tax release charge

---

## TS-17

Name: Escalating Investment

Weight: 8

Examples:

- Invest more to unlock profits

---

## TS-18

Name: Borrow-To-Invest

Weight: 8

Examples:

- Take a loan for investing

---

# CATEGORY F
# INFORMATION SIGNALS

---

## TS-19

Name: Non-Transparent Claims

Weight: 7

Examples:

- No explanation of strategy

---

## TS-20

Name: Complexity Shield

Weight: 6

Examples:

- Technical jargon hiding risk

---

## TS-21

Name: Insider Information

Weight: 8

Examples:

- Secret stock tip
- Confidential opportunity

---

## TS-22

Name: Unsolicited Contact

Weight: 7

Examples:

- Random WhatsApp message
- Cold call

---

# CATEGORY G
# EMERGING SIGNALS

---

## TS-23

Name: Deepfake Authority

Weight: 10

Examples:

- AI-generated expert

---

## TS-24

Name: Fake Trading Application

Weight: 10

Examples:

- Clone broker apps

---

## TS-25

Name: Referral Pyramid

Weight: 9

Examples:

- Recruit to earn

---

# 4. Manipulation Pattern Framework

Patterns are collections of threat signals.

---

## MP-01

Name: Authority Exploitation

Signals:

- TS-03
- TS-04
- TS-05
- TS-23

Description:

Creates trust through authority.

---

## MP-02

Name: Greed Engineering

Signals:

- TS-01
- TS-02
- TS-08

Description:

Creates desire for fast wealth.

---

## MP-03

Name: Pressure Engineering

Signals:

- TS-06
- TS-07

Description:

Reduces decision time.

---

## MP-04

Name: Social Validation

Signals:

- TS-09
- TS-10

Description:

Uses herd behavior.

---

## MP-05

Name: Trust Harvesting

Signals:

- TS-11
- TS-12
- TS-13
- TS-14

Description:

Builds emotional trust.

---

## MP-06

Name: Information Asymmetry

Signals:

- TS-19
- TS-20
- TS-21

Description:

Makes verification difficult.

---

## MP-07

Name: Financial Entrapment

Signals:

- TS-15
- TS-16
- TS-17
- TS-18

Description:

Creates financial dependency.

---

## MP-08

Name: Opportunistic Targeting

Signals:

- TS-22

Description:

Mass victim acquisition.

---

## MP-09

Name: Identity Manipulation

Signals:

- TS-04
- TS-23
- TS-24

Description:

Creates fake legitimacy.

---

## MP-10

Name: Network Expansion

Signals:

- TS-25

Description:

Uses referrals to scale.

---

# 5. Scam Family Framework

Scam Families are clusters of manipulation patterns.

---

## SF-01

Fake Advisor Fraud

Patterns:

- MP-01
- MP-05

---

## SF-02

Fake Research Analyst Fraud

Patterns:

- MP-01
- MP-06

---

## SF-03

Telegram Signal Fraud

Patterns:

- MP-02
- MP-03
- MP-04

---

## SF-04

WhatsApp Tip Scam

Patterns:

- MP-02
- MP-03
- MP-08

---

## SF-05

Guaranteed Return Scheme

Patterns:

- MP-02
- MP-05

---

## SF-06

Ponzi Scheme

Patterns:

- MP-02
- MP-05
- MP-10

---

## SF-07

Pyramid Scheme

Patterns:

- MP-10
- MP-05

---

## SF-08

Pump And Dump

Patterns:

- MP-02
- MP-04
- MP-06

---

## SF-09

Fake Trading Application

Patterns:

- MP-09
- MP-07

---

## SF-10

Clone Broker Platform

Patterns:

- MP-09
- MP-01

---

## SF-11

Fake IPO Scam

Patterns:

- MP-01
- MP-02

---

## SF-12

Recovery Scam

Patterns:

- MP-05
- MP-07

---

## SF-13

Investment Coaching Scam

Patterns:

- MP-05
- MP-02

---

## SF-14

Premium Membership Scam

Patterns:

- MP-05
- MP-03

---

## SF-15

Referral Fraud

Patterns:

- MP-10
- MP-02

---

# 6. Threat Index Specification

Purpose:

Measure overall risk.

Scale:

0–100

---

Risk Levels

0–20
LOW

21–40
MODERATE

41–60
ELEVATED

61–80
HIGH

81–100
CRITICAL

---

Formula

**Version note:** The weighted formula in this original v1.0 section is superseded by the more detailed `SCORING_ENGINE_SPEC.md` v1.0. Use the scoring-engine TI formula for implementation; retain this text as the original framework history.

TI =
0.30(SPS)
+
0.25(FHS)
+
0.15(GRS)
+
0.15(RIS)
+
0.15(CS)

Where:

SPS = Signal Pattern Score

FHS = Family Harm Score

GRS = Growth Rate Score

RIS = Regional Impact Score

CS = Confidence Score

---

# 7. Confidence Score Specification

Confidence measures evidence quality.

Factors:

- Number of signals detected
- Source quality
- Pattern consistency
- Family similarity

Output:

0–100

---

# 8. Emerging Threat Specification

Purpose:

Detect threats that do not fully match existing scam families.

---

Emerging Threat Index

ETI =
Novelty
×
Velocity
×
Similarity
×
Spread

Output:

0–100

---

ETI Thresholds

0–30

Normal

31–60

Watchlist

61–80

Emerging Threat

81–100

Critical Emerging Threat

---

# 9. Source Reliability Framework

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

- Courts
- Government Publications

---

Level 3

Reliability: 80

Sources:

- Financial Media

---

Level 4

Reliability: 60

Sources:

- Public Websites
- Public Social Content

---

# 10. MVP Scope Freeze

For MVP:

Threat Signals: 25

Manipulation Patterns: 10

Scam Families: 15

Threat Index: Enabled

Knowledge Graph: Enabled

Analyze Scam Risk: Enabled

Emerging Threat Engine: Basic Version

Regional Intelligence: Demo Version

Prediction Engine: Experimental

This document serves as the canonical intelligence framework for all future NIGRAH development.
