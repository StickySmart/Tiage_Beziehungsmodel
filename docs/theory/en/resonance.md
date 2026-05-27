# Resonance Theory in the Tiage Model

> *Resonance as a per-dimension amplifier of relationship quality*
> **Current version: v3.2 (calculationEngine.js)**

---

## What is Resonance?

Resonance (R1–R4) are **four dimension-specific factors** (typically 0.8–1.3) that each amplify or dampen the base score of their associated dimension — based on how well both people's needs align in that dimension.

> *"Perception is based on vibrations and patterns. Resonance = synchronicity between internal neural rhythms and external signals."*

An R > 1.0 means: both people's needs match above average in this dimension — the contribution of this dimension is **multiplied**. An R < 1.0 dampens the contribution accordingly.

**Important:** There is no shared meanR multiplier. Each dimension (O, A, D, G) has its own R-factor.

---

## The Formula (v3.2)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

| Term | Factor | R-Dimension | Needs Basis |
|------|--------|-------------|-------------|
| `O × wO × R1` | Orientation | R1 Life | #B1, #B3, #B7, #B12 |
| `A × wA × R2` | Archetype | R2 Philosophy | #B2, #B8, #B9, #B14 |
| `D × wD × R3` | Dominance | R3 Dynamics | #B4, #B5, #B6, #B11 |
| `G × wG × R4` | Gender | R4 Identity | #B10, #B13, #B15, #B16 + Attraction |

**Score can exceed 100** — when R-factors > 1.0 or FFH-Extras bonus is active.

**Source:** `js/synthesis/calculationEngine.js` → `calculateRelationshipQuality()` (line 483)

---

## Combining R-Factors

Each person has their own needs values (#B1–#B16). The R-factor is **combined per dimension from both partners**:

```javascript
combineRFactors(R_me, R_partner) = (sum × similarity) / 2
  where:
    sum       = R_me + R_partner
    similarity = min(R_me, R_partner) / max(R_me, R_partner)
```

This formula rewards **symmetric resonance**: when both partners have similarly high R-values, the result is higher than when one partner resonates strongly and the other weakly.

**Source:** `server/logic/needsIntegration.js` → `combineRFactors()`

---

## Visual Layer: Images of the 16 Core Needs

Each of the 16 core needs is linked to **multiple image variants** — AI-generated images in the style of OSHO Zen Tarot that visually express the emotional quality of the need. Each variant carries a mood name and the associated Tarot card name.

| Need | Variant 1 | Variant 2 | Variant 3 |
|------|-----------|-----------|-----------|
| #B1 Wellbeing | Existence | Healing | Silence |
| #B2 Security | Trust | Protection | Shelter |
| #B3 Ease | Touch | Sleep of Stars | Dance |
| #B4 Orientation | Clarity | Awareness | Order |
| #B5 Efficacy | Efficacy | Competence | Challenge |
| #B6 Freedom | Self-Determination | Independence | Freedom of Choice |
| #B7 Intensity | Intensity | Joy | Passion |
| #B8 Development | Growth | Discovery | Vision |
| #B9 Community | Community | Belonging | Collaboration |
| #B10 Recognition | Appreciation | Respect | Having-Meaning |
| #B11 Justice | Shared Values | Respecting-Differences | Balance |
| #B12 Connection | Love | Intimacy | Empathy |
| #B13 Self-Knowledge | Insight | Relationship-Reflection | Clarity |
| #B14 Meaning | Meaning | Inspiration | Contributing |
| #B15 Integrity | Integrity | Authenticity | Genuineness |
| #B16 Self-Expression | Creativity | Self-Expression | Celebrating-Life |

**Total scope:** Multiple variants per need (webp/png) — growing continuously.

**Sources:**
- `assets/images/beduerfnisse-v2/` — Image files (B001–B226.webp)
- `assets/images/beduerfnisse-v2/image-mapping.json` — Mapping #B → variants
- `js/synthesis/oshoZenTextGenerator.js` — Uses images in synthesis output

---

## The 16 Core Needs (v4.0)

The R-factors are based on **16 core needs by Volker Schmidt** (#B1–#B16), organized in **4 levels**:

```
Level 1 – Passive Basic Needs:
  #B1 Wellbeing       #B2 Security
  #B3 Ease            #B4 Orientation

Level 2 – Action Needs:
  #B5 Efficacy        #B6 Freedom
  #B7 Intensity       #B8 Development

Level 3 – Social Needs:
  #B9 Community       #B10 Recognition
  #B11 Justice        #B12 Connection

Level 4 – Identity Needs:
  #B13 Self-Knowledge    #B14 Meaning
  #B15 Integrity         #B16 Self-Expression
```

Each need is rated with a value 0–100.

**Source:** `profiles/data/beduerfnis-katalog.json` (v4.0.0)

---

## Mapping: Needs → R-Factors

The mapping is **semantic** (by thematic proximity to the dimension), not level-based:

| R-Factor | Emoji | Dimension | Needs |
|----------|-------|-----------|-------|
| **R1 Life** | 🔥 | Orientation | #B1 Wellbeing, #B3 Ease, #B7 Intensity, #B12 Connection |
| **R2 Philosophy** | 🧠 | Archetype | #B2 Security, #B8 Development, #B9 Community, #B14 Meaning |
| **R3 Dynamics** | ⚡ | Dominance | #B4 Orientation, #B5 Efficacy, #B6 Freedom, #B11 Justice |
| **R4 Identity** | 💚 | Gender | #B10 Recognition, #B13 Self-Knowledge, #B15 Integrity, #B16 Self-Expression + bidirectional attraction |

**Source:** `server/logic/needsIntegration.js` → `DIMENSION_NEED_IDS`

```javascript
const DIMENSION_NEED_IDS = {
    leben:       ['#B1', '#B3', '#B7', '#B12'],
    philosophie: ['#B2', '#B8', '#B9', '#B14'],
    dynamik:     ['#B4', '#B5', '#B6', '#B11'],
    identitaet:  ['#B10', '#B13', '#B15', '#B16']
};
```

---

## R4 Identity — Hybrid Factor

**R4 Identity** is a special case: it is not calculated purely from needs, but as a hybrid of identity proximity and bidirectional attraction:

```javascript
R4 = (identityScore × 0.30 + attractionScore × 0.70)²
```

- `identityScore`: Similarity of gender identity (Cis/Trans/NB/Fluid) — from needs #B10, #B13, #B15, #B16
- `attractionScore`: Bidirectional attraction — `ME→Partner` × `Partner→ME` (geometric mean)

R4 therefore directly corresponds to the **Gender Factor (G)** in the main formula.

**Source:** `js/synthesis/calculationEngine.js` → `calculateR4Hybrid()`

---

## Resonance Data Flow (v3.2)

```
┌─────────────────────────────────────────────────────┐
│         INPUT: person1.needs & person2.needs         │
│         16 core needs (#B1–#B16), 0–100              │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 1: Calculate R-values per person            │
├─────────────────────────────────────────────────────┤
│  Per dimension: relevant needs →                    │
│  Coherence score → R-value (0.8–1.3)                │
│                                                     │
│  R1 Life:       #B1, #B3, #B7, #B12                 │
│  R2 Philosophy: #B2, #B8, #B9, #B14                 │
│  R3 Dynamics:   #B4, #B5, #B6, #B11                 │
│  R4 Identity:   #B10, #B13, #B15, #B16 + Attraction │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 2: Combine both partners' R-values          │
├─────────────────────────────────────────────────────┤
│  combineRFactors(R_me, R_partner)                   │
│  = (R_me + R_partner) × min/max / 2                 │
│                                                     │
│  ┌──────────┬──────────┬──────────┬──────────┐      │
│  │ 🔥 R1    │ 🧠 R2    │ ⚡ R3    │ 💚 R4    │      │
│  │  1.05    │  0.95    │  1.10    │  1.00    │      │
│  └──────────┴──────────┴──────────┴──────────┘      │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 3: Per-dimension multiplication             │
├─────────────────────────────────────────────────────┤
│  Score = (O×wO×R1) + (A×wA×R2) + (D×wD×R3)         │
│        + (G×wG×R4)                                  │
│                                                     │
│  Each factor contributes with its own resonance.    │
│  Score can exceed 100.                              │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 4: FFH-Extras (additive)                    │
├─────────────────────────────────────────────────────┤
│  extrasModifier = TiageExtrasModifier.calculate()   │
│  totalScore = score + extrasModifier                │
│  Score can exceed 100.                              │
└─────────────────────────────────────────────────────┘
```

---

## Interpretation per R-Factor

| R-Value | Status | Symbol | Meaning |
|---------|--------|--------|---------|
| ≥ 1.05 | Resonance | ⬆️ | Above-average needs match — amplifies this dimension |
| 0.95–1.05 | Neutral | ➡️ | Balanced compatibility — no amplification or dampening |
| ≤ 0.95 | Dissonance | ⬇️ | Needs mismatch — dampens the contribution of this dimension |

---

## GFK Thresholds

GFK (Nonviolent Communication / Needs Resonance Level):

| Level | Threshold | Meaning |
|-------|-----------|---------|
| **high** | ≥ 82 | Deep shared needs resonance |
| **medium** | ≥ 48 | Sufficient compatibility |
| **low** | < 48 | Fundamental needs differences |

**Source:** `js/dimensions/gfkMatching.js`

---

## FFH-Extras Modifier

**FFH** = Fit / Fucked up / Horny / Fresh — current state of both persons.

`TiageExtrasModifier.calculate(myExtras, partnerExtras)` calculates an **additive** bonus or malus:

| Situation | Modifier |
|-----------|---------|
| Both fit + horny | +8 |
| Partner fit + horny (me not) | +15 |
| Fucked up without fit | −5 |
| Fresh (new to the relationship) | +3 |

There are **16 possible combinations** (2⁴ for 4 binary flags), all calculated in the Slot Machine.

**Source:** `js/extras/TiageExtrasModifier.js`

---

## Neuroscientific Foundations

| Researcher | Contribution | Relation to Model |
|------------|-------------|-------------------|
| **Buzsáki & Singer** | Neural rhythms | Gamma oscillations as basis for "being on the same wavelength" |
| **Friston** | Predictive Coding | Compatibility = low prediction errors in interaction |
| **Kapur** | Aberrant Salience | Flow vs. psychosis as spectrum of synchronicity |
| **Levitin** | Psychoacoustics | Music as external regulation system for emotions |
| **Aron** | High Sensitivity | Stimulus management as relationship factor |

---

## Scientific References

- Buzsáki, G. (2006): *Rhythms of the Brain.* Oxford University Press.
- Friston, K. (2010): The free-energy principle. *Nature Reviews Neuroscience.*
- Kapur, S. (2003): Psychosis as Aberrant Salience. *Am J Psychiatry.*
- Levitin, D.J. (2006): *This Is Your Brain on Music.* Dutton.
- Aron, E.N. (1996): *The Highly Sensitive Person.* Broadway Books.

---

## Further Documentation

- [Score Calculation](score-calculation-overview.md) — Complete formula and data flow
- [The 4 Factors](factors.md) — A/O/D/G in detail
- [Pathos & Logos](pathos-logos.md) — The philosophical weighting
