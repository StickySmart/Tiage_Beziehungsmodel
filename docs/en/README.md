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

## New Features (v1.8.x)

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
- **#BID** - Needs IDs (#B01-#B88)
- **#PID** - Perspective IDs (#P1-#P4)

### Needs Matching

88 NVC-based needs are compared between partners:

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

*© 2025 Ti-Age – All rights reserved*
