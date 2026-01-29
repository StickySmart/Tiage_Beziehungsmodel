# Tiage Relationship Model Documentation

> *Structured documentation for the Tiage Relationship Model*

## Overview

This documentation contains all theoretical foundations, calculation formulas, and legal information for the Tiage Relationship Model.

## Structure

```
docs/
├── README.md              ← You are here
├── help-guide.md          ← User manual
├── NAMING_CONVENTION.md   ← ID reference system (#AID, #BID, etc.)
│
├── theory/                ← Philosophical foundations
│   ├── pirsig.md          ← Robert M. Pirsig (Logos)
│   ├── osho.md            ← OSHO (Pathos)
│   ├── tiage-synthesis.md ← Tiage's connection of both
│   ├── pathos-logos.md    ← The 75:25 weighting
│   ├── resonance.md       ← Resonance as meta-dimension
│   ├── factors.md         ← The 4 quality factors
│   ├── gaussian-model.md  ← Gaussian distribution for needs
│   └── gfk-rosenberg.md   ← NVC according to Marshall Rosenberg
│
└── legal/                 ← Legal documents
    ├── privacy-policy.md  ← Privacy policy
    └── terms-of-use.md    ← Terms of use
```

## Quick Start

### For Users

→ [help-guide.md](help-guide.md) - Quick guide and calculation examples

### For Philosophy Enthusiasts

1. [tiage-synthesis.md](theory/en/tiage-synthesis.md) - Understanding the overall concept
2. [pirsig.md](theory/en/pirsig.md) - Pirsig's Metaphysics of Quality
3. [osho.md](theory/en/osho.md) - OSHO's consciousness philosophy
4. [pathos-logos.md](theory/en/pathos-logos.md) - The dual structure
5. [resonance.md](theory/en/resonance.md) - The meta-factor

### Legal

- [Privacy Policy](legal/en/privacy-policy.md)
- [Terms of Use](legal/en/terms-of-use.md)

## The Two Philosophical Pillars

| Pillar | Representative | Contribution | Share |
|--------|---------------|--------------|-------|
| **Pathos** | OSHO | Dynamic Quality, Emotion | 75% |
| **Logos** | Robert M. Pirsig | Static Quality, Structure | 25% |

## Core Formulas

### Quality Index (v3.1)

```
Q = (O × 0.25 × R₁) + (A × 0.25 × R₂) + (D × 0.25 × R₃) + (G × 0.25 × R₄)
```

Where:
- **O** = Orientation Score (0-100) - Sexual compatibility
- **A** = Archetype Score (0-100) - Relationship philosophy
- **D** = Dominance Score (0-100) - Energetic dynamic
- **G** = Gender Score (0-100) - Gender chemistry
- **R₁** = R_Life (modulates O)
- **R₂** = R_Philosophy (modulates A)
- **R₃** = R_Dynamics (modulates D)
- **R₄** = R_Identity (modulates G)

### Resonance Factor

```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

Where:
- **M** = Profile Match (0-100) - Preference alignment
- **B** = Balance (0-1) - Logos-Pathos harmony
- **K** = Communication (0-1) - NVC competence of both partners

### NVC Factor (K)

| ME / Partner | high | medium | low |
|--------------|------|--------|-----|
| **high**     | 1.0  | 0.75   | 0.35 |
| **medium**   | 0.75 | 0.5    | 0.2 |
| **low**      | 0.35 | 0.2    | 0.0 |

NVC = Nonviolent Communication according to Marshall Rosenberg

## New Features (v2.0)

### RTI Pillars (5 Pillars of Identity by Petzold)

Integration of Hilarion Petzold's RTI model as 5th tab in TiageSynthese:

| Pillar | Domain | Formula |
|--------|--------|---------|
| S1 Physicality | Body, Health, Sexuality | C |
| S2 Social Network | Relationship Form, Friends, Family | (A × 0.6) + (F × 0.4) |
| S3 Autonomy & Achievement | Self-Realization, Creativity | D |
| S4 Security & Stability | Life Planning, Daily Routines | (A × 0.4) + (F × 0.6) |
| S5 Values & Meaning | Worldview, Spirituality | (B × 0.4) + (E × 0.6) |

### Friction Logic (replaces K.O. Criteria)

Philosophical paradigm shift:
- **Nothing is "impossible"** - Only varying degrees of difficulty
- **Score 0% = 100% Friction** - Maximum challenge, not impossibility
- **Gradual evaluation** - Instead of binary "works/doesn't work" decisions

### Perspective Hints (perspektivenHinweise)

Three philosophical perspectives for each pillar when friction occurs:

- **Pirsig (MOQ):** Static vs. Dynamic Quality patterns
- **Osho:** Conditioning vs. Authenticity
- **NVC (Rosenberg):** Needs and Strategies

Hints are displayed at medium/high friction levels.

### SSOT v2.0 Architecture

- **Partner needs are read-only** - Dynamically calculated from archetype base + AGOD modifiers
- **8-slot needs storage** - User needs are stored per archetype
- **Smart getter/setter** - Automatic routing to current archetype

---

## Features (v1.8.x)

### Perspectives System (P1-P4)

The app offers four philosophical perspectives on each needs entry:

| ID | Perspective | Focus |
|----|-------------|-------|
| P1 | Ti-Age Synthesis | Practical Integration |
| P2 | Pirsig (MOQ) | Quality and Structure |
| P3 | OSHO | Consciousness and Energy |
| P4 | SexPositive | Physical Dimension |

### ID Reference System

All entities use unique IDs for consistent referencing:

- **#AID** - Archetype IDs (#A01-#A08)
- **#BID** - Needs IDs (#B01-#B228)
- **#PID** - Perspective IDs (#P1-#P4)
- **#SID** - RTI Pillar IDs (#S1-#S5) - NEW

### Needs Matching

228 NVC-based needs are compared between partners:

- Wildcard search across name, category, dimension
- Sorting by fulfillment level
- Clickable tags with definition modals
- Lock mechanism for individual weighting

## Related Documentation

- [beziehungsmodell.md](../../beziehungsmodell.md) - Main model documentation
- [profiles/docs/](../../profiles/docs/) - Profile documentation and needs questions
- [ARCHETYPE-MATRIX-README.md](../../ARCHETYPE-MATRIX-README.md) - Matrix documentation
- [CHANGELOG.md](../../CHANGELOG.md) - Complete version history

---

*© 2025-2026 Ti-Age – All rights reserved*
