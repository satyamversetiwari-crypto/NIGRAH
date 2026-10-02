# DATABASE_SCHEMA.md
# NIGRAH Database Schema Specification v1.0

Version: 1.0

Status: Canonical MVP Schema

Dependencies:

- INTELLIGENCE_SPEC.md
- SCORING_ENGINE_SPEC.md

Purpose:

Define the complete database architecture for NIGRAH MVP.

The database must support:

- Threat Signals
- Manipulation Patterns
- Scam Families
- Intelligence Evidence
- Threat Analysis
- Knowledge Graph Relationships
- Threat Index Calculation
- Emerging Threat Intelligence

---

# 1. Database Philosophy

NIGRAH is an intelligence system.

Therefore the database is designed around relationships.

Not around users.

Primary Entity:

```text
Evidence
↓
Signals
↓
Patterns
↓
Families
↓
Intelligence
```

---

# 2. Database Technology

## MVP Stack

PostgreSQL

Provider:

Neon PostgreSQL

---

ORM:

SQLAlchemy

---

Migration:

Alembic

---

# 3. Core Tables

## intelligence_sources

Stores source metadata.

### Purpose

Track where evidence originated.

---

Fields

```sql
id UUID PRIMARY KEY

name VARCHAR(255)

source_type VARCHAR(50)

reliability_score INTEGER

website TEXT

description TEXT

created_at TIMESTAMP
```

---

Examples

```text
SEBI

RBI

CERT-In

Economic Times

Moneycontrol

Public Website

Public Telegram Channel
```

---

# 4. evidence

Most important table.

Stores collected intelligence.

---

Purpose

Every scam indicator must originate from evidence.

---

Fields

```sql
id UUID PRIMARY KEY

title TEXT

content TEXT

source_id UUID

source_url TEXT

content_type VARCHAR(50)

published_date TIMESTAMP

region VARCHAR(100)

language VARCHAR(50)

evidence_hash TEXT

created_at TIMESTAMP
```

---

content_type

```text
article

advisory

telegram

website

youtube

social

manual
```

---

Examples

```text
SEBI warning

Telegram post

News article

Fraud advisory
```

---

# 5. threat_signals

Master catalog.

---

Fields

```sql
id VARCHAR(20) PRIMARY KEY

name VARCHAR(255)

category VARCHAR(100)

description TEXT

weight INTEGER

is_active BOOLEAN
```

---

Example

```text
TS-01

Guaranteed Return

Weight 10
```

---

# 6. manipulation_patterns

Master catalog.

---

Fields

```sql
id VARCHAR(20) PRIMARY KEY

name VARCHAR(255)

description TEXT

created_at TIMESTAMP
```

---

Examples

```text
MP-01

Authority Exploitation

MP-02

Greed Engineering
```

---

# 7. scam_families

Master catalog.

---

Fields

```sql
id VARCHAR(20) PRIMARY KEY

name VARCHAR(255)

description TEXT

harm_score INTEGER

created_at TIMESTAMP
```

---

Examples

```text
SF-06

Ponzi Scheme

95
```

---

# 8. pattern_signals

Relationship table.

Many-to-many.

---

Purpose

Maps signals to patterns.

---

Fields

```sql
id UUID PRIMARY KEY

pattern_id VARCHAR(20)

signal_id VARCHAR(20)
```

---

Example

```text
MP-02

contains

TS-01

TS-02

TS-08
```

---

# 9. family_patterns

Relationship table.

Many-to-many.

---

Purpose

Maps patterns to scam families.

---

Fields

```sql
id UUID PRIMARY KEY

family_id VARCHAR(20)

pattern_id VARCHAR(20)
```

---

Example

```text
Telegram Signal Fraud

contains

Greed Engineering

Pressure Engineering

Social Validation
```

---

# 10. evidence_signals

Stores detected signals.

---

Purpose

Connect evidence to threat signals.

---

Fields

```sql
id UUID PRIMARY KEY

evidence_id UUID

signal_id VARCHAR(20)

confidence_score DECIMAL(5,2)

detected_by VARCHAR(50)

created_at TIMESTAMP
```

---

Examples

```text
Evidence A

contains

TS-01

confidence 92%
```

---

# 11. evidence_patterns

Stores detected patterns.

---

Fields

```sql
id UUID PRIMARY KEY

evidence_id UUID

pattern_id VARCHAR(20)

strength_score DECIMAL(5,2)

created_at TIMESTAMP
```

---

# 12. evidence_families

Stores predicted scam families.

---

Fields

```sql
id UUID PRIMARY KEY

evidence_id UUID

family_id VARCHAR(20)

similarity_score DECIMAL(5,2)

created_at TIMESTAMP
```

---

Example

```text
Telegram Signal Fraud

91%
```

---

# 13. analysis_results

Stores final scoring outputs.

---

Purpose

Audit trail of every analysis.

---

Fields

```sql
id UUID PRIMARY KEY

evidence_id UUID

threat_index DECIMAL(5,2)

confidence_score DECIMAL(5,2)

family_similarity_score DECIMAL(5,2)

risk_level VARCHAR(50)

emerging_threat_index DECIMAL(5,2)

created_at TIMESTAMP
```

---

Example

```text
Threat Index

91

Critical
```

---

# 14. regional_intelligence

Stores geographic threat intelligence.

---

Fields

```sql
id UUID PRIMARY KEY

region VARCHAR(100)

family_id VARCHAR(20)

incident_count INTEGER

risk_score INTEGER

last_updated TIMESTAMP
```

---

Examples

```text
UP

Telegram Fraud

80
```

---

# 15. growth_metrics

Stores trend intelligence.

---

Fields

```sql
id UUID PRIMARY KEY

family_id VARCHAR(20)

month VARCHAR(20)

mention_count INTEGER

growth_rate DECIMAL(10,2)

created_at TIMESTAMP
```

---

Purpose

Support:

GRS

Emerging Threat Index

Trend Dashboard

---

# 16. threat_graph_nodes

Knowledge graph node storage.

---

Fields

```sql
id UUID PRIMARY KEY

node_type VARCHAR(50)

node_reference VARCHAR(100)

label TEXT

created_at TIMESTAMP
```

---

node_type

```text
signal

pattern

family

region

source
```

---

# 17. threat_graph_edges

Knowledge graph relationships.

---

Fields

```sql
id UUID PRIMARY KEY

source_node UUID

target_node UUID

relationship_type VARCHAR(100)

weight DECIMAL(5,2)

created_at TIMESTAMP
```

---

Examples

```text
Signal
→ Pattern

Pattern
→ Family

Family
→ Region
```

---

# 18. user_submissions

MVP input storage.

---

Purpose

Store uploaded content for analysis.

---

Fields

```sql
id UUID PRIMARY KEY

submission_type VARCHAR(50)

file_url TEXT

extracted_text TEXT

status VARCHAR(50)

created_at TIMESTAMP
```

---

submission_type

```text
text

image

audio

video

url
```

---

# 19. analysis_sessions

Tracks user analyses.

---

Fields

```sql
id UUID PRIMARY KEY

submission_id UUID

analysis_result_id UUID

processing_time_ms INTEGER

model_version VARCHAR(50)

created_at TIMESTAMP
```

---

# 20. Entity Relationship Flow

```text
Evidence
↓
Evidence Signals
↓
Threat Signals
↓
Pattern Signals
↓
Manipulation Patterns
↓
Family Patterns
↓
Scam Families
↓
Analysis Results
```

---

# 21. MVP Database Scope

Enabled:

✅ Sources

✅ Evidence

✅ Signals

✅ Patterns

✅ Families

✅ Signal Detection

✅ Pattern Detection

✅ Family Prediction

✅ Threat Index

✅ Confidence Score

✅ User Uploads

✅ Analysis History

---

Experimental:

⚠ Regional Intelligence

⚠ Growth Metrics

⚠ Knowledge Graph

⚠ Emerging Threat Index

---

# 22. Recommended API Structure

```text
/api/analyze

/api/signals

/api/patterns

/api/families

/api/intelligence

/api/graph

/api/dashboard

/api/regions

/api/trends
```

---

# 23. MVP Freeze

Canonical Counts

Threat Signals:
25

Manipulation Patterns:
10

Scam Families:
15

Source Reliability Levels:
4

Threat Index:
Enabled

Confidence Score:
Enabled

Knowledge Graph:
Basic

Emerging Threat Engine:
Experimental

This schema serves as the canonical database architecture for NIGRAH MVP development.