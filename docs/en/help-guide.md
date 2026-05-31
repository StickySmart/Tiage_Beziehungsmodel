# Help & Documentation

> *User Manual for the Tiage Relationship Model*

## Quick Guide

| Element | Description |
|---------|-------------|
| **My Type** | Your archetype + properties (orientation, dominance, gender) |
| **Relationship Quality** | Partner archetype + properties and compatibility calculation |
| **Living** | What you actively live |
| **Interested** | What you are open to |
| **INFO Button** | Details about the selected archetype |
| **Result** | Automatic calculation of compatibility (4 factors) |
| **Percentages** | Click = Detailed explanation per factor |

## Version History

All changes and new features can be found in the [Changelog](../../CHANGELOG.md).

---

## Workflow: From Input to Result

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  1. INPUT       │ ──► │  2. R-FACTORS       │ ──► │  3. SYNTHESIS   │
│  (per person)   │     │  (from needs)       │     │  (pair match)   │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

### Step 1: Input

Each person enters: **Archetype** (8 types), **Orientation**, **Dominance**, **Gender** and **226 Needs** (0–100).

### Step 2: Calculate R-Factors

Per person, the 226 needs are used to measure: *How well do your needs match your archetype?*

The result is 4 **R-Factors** (Resonance) that describe the coherence between your needs and the archetype ideal.

### Step 3: Synthesis

Both partners' R-factors feed into the compatibility calculation:

1. **Lifestyle Filter** – Check K.O. criteria (e.g. desire for children, living arrangements)
2. **Factor Scores** – Archetype-matrix compatibility per factor
3. **Needs Match** – Compare all 226 needs
4. **Final Calculation** – Weighted factor scores × mean resonance

---

## The 4 Quality Factors

| Factor | Default | Dimension | R-Factor | Description |
|--------|---------|-----------|----------|-------------|
| **O** Orientation | 25% | Pathos 🔥 | R1 Life | Physical polarity and attraction |
| **A** Archetype | 25% | Logos 🧠 | R2 Philosophy | Relationship philosophy: "How do we want to live?" |
| **D** Dominance | 25% | Pathos ⚡ | R3 Dynamics | Energetic dynamic: Who leads, who follows? |
| **G** Gender | 25% | Pathos 💚 | R4 Identity | Gender chemistry and identity resonance |

*Weights are adjustable via UI slider (0 = Ignore / 1 = Normal / 2 = Important / 3 = Very important).*

---

## Main Formula

```
Q = rawCompatibility × meanR
```

Where:

```
rawCompatibility = (O × wO) + (A × wA) + (D × wD) + (G × wG)
meanR            = (R1 + R2 + R3 + R4) / 4
```

Each factor score (O, A, D, G) is between 0–100. The weights (wO, wA, wD, wG) are calculated from the slider settings and always sum to 100%.

---

## Weight System

Each factor has an importance level from **0 to 3**:

| Setting | Meaning | Effective share (example) |
|---------|---------|--------------------------|
| **0 – Ignore** | Factor is excluded | 0% |
| **1 – Normal** | Standard weight | 25% (when all = 1) |
| **2 – Important** | Double weight | ~44% (when this = 2, all others = 1) |
| **3 – Very important** | Quadruple weight | ~60% (when this = 3, all others = 1) |

Weights are **quadratically normalised**: `w = importance² / Σimportance²`

This means: setting a factor to "Very important" has a disproportionately strong effect on the result.

---

## R-Factors (Resonance)

The R-factors measure per dimension how coherent a person's needs are with their archetype ideal:

```
similarity = 1 − (avgDeviation / 100)
R          = similarity²
```

| similarity | R-Value | Meaning |
|-----------|---------|---------|
| 1.0 (identical) | **1.0** | Full coherence – neutral effect |
| 0.9 (10% dev.) | **0.81** | Slight reduction |
| 0.7 (30% dev.) | **0.49** | Noticeable reduction |
| 0.5 (50% dev.) | **0.25** | Strong reduction |
| 0.0 (100% dev.) | **0.0** | Complete elimination |

> The quadratic formula penalises incoherence strongly: a 50% deviation does not halve the score — it reduces it to one quarter.

Both partners' R-factors are combined and averaged into a single **mean R value** (`meanR`) for the main formula.

### Resonance Boost

When `meanR > 1.0` (both partners live their archetype coherently), the score receives an additional boost:

```
boost = (meanR − 1.0) × 0.5
finalScore = Q × (1 + boost)
```

This allows scores above 100% when resonance is exceptionally strong.

---

## Needs Match (226 Needs)

The **needs match** shows the weighted overlap across all 226 needs:

```
For EACH need:
    similarity = 100 − |value person 1 − value person 2|
    weight     = (value person 1 + value person 2) / 2
    contribution = similarity × weight

Total score = Σ(contribution) / Σ(weight)
```

### Categories

| Category | IDs | Count |
|----------|-----|-------|
| Core needs | #B1–#B88 | 88 |
| Special | #B89 | 1 |
| Life planning | #B90–#B126 | 37 |
| Finance & Career | #B127–#B148 | 22 |
| Communication style | #B149–#B176 | 28 |
| Social life | #B177–#B203 | 27 |
| Intimacy & Romance | #B204–#B208 | 5 |
| Dynamics extended | #B209–#B220 | 12 |
| Sexual needs | #B221–#B224 | 4 |
| Symmetric pairs | #B225–#B226 | 2 |
| **Total** | | **226** |

### Score Interpretation

| Score | Meaning |
|-------|---------|
| **60–100%** 🟢 | Strong match |
| **40–59%** 🟡 | Moderate match – conscious communication important |
| **0–39%** 🔴 | Low match – fundamental differences |

---

## Calculation Example

**Duo (Cis Woman, Submissive, Hetero) × Duo-Flex (Cis Man, Dominant, Hetero)**

### Factor Scores

| Factor | Value | Reason |
|--------|-------|--------|
| A (Archetype) | 75 | Duo ↔ Duo-Flex = closely related |
| O (Orientation) | 100 | Hetero + Hetero with M/F = fully compatible |
| D (Dominance) | 100 | Submissive + Dominant = complementary |
| G (Gender) | 100 | Cis Woman × Cis Man = Match |

### R-Factors (calculated from needs profiles)

| Dimension | Similarity | R-Value | Meaning |
|-----------|-----------|---------|---------|
| 🧠 R2 Philosophy | 0.89 | **0.80** | Slight dissonance |
| 🔥 R1 Life | 1.18 | **1.40** | Strong resonance |
| ⚡ R3 Dynamics | 1.05 | **1.10** | Resonance |
| 💚 R4 Identity | 1.14 | **1.30** | Strong resonance |

*R-values above 1.0 arise when the pair's needs complement the archetype ideal.*

### Calculation

```
Weights: wO = wA = wD = wG = 0.25 (all set to Normal)

rawCompatibility = (75 × 0.25) + (100 × 0.25) + (100 × 0.25) + (100 × 0.25)
                 = 18.75 + 25.0 + 25.0 + 25.0
                 = 93.75

meanR = (0.80 + 1.40 + 1.10 + 1.30) / 4
      = 4.60 / 4
      = 1.15

Q = 93.75 × 1.15 = 107.8

Resonance boost: (1.15 − 1.0) × 0.5 = 0.075
finalScore = 107.8 × (1 + 0.075) ≈ 116 → 100% (capped)
```

**Interpretation:** Strong resonance in Life and Identity compensates for the slight dissonance in Philosophy. The couple should work on developing a shared relationship philosophy.

---

## The 8 Archetypes

| Archetype | Description |
|-----------|-------------|
| **Single** | Autonomous life without a primary relationship |
| **Duo** | Monogamous partnership with exclusivity |
| **Duo-Flex** | Primary relationship with agreed openings |
| **Solopoly** | Multiple equal relationships, focus on autonomy |
| **Polyamorous** | Deep emotional bonds with multiple partners |
| **RA** | Relationship Anarchist – rejection of all relationship hierarchies |
| **LAT** | Living Apart Together – committed partnership without cohabitation |
| **Aromantic** | Focus on platonic connections without romantic component |

---

## Result Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| **70–100%** | Good | Solid foundation present |
| **50–69%** | Medium | Requires conscious effort |
| **0–49%** | Challenging | Fundamental differences |

*The quality index is a guideline value. Real relationships depend on many other factors.*

---

## Further Documentation

### Philosophical Foundations

- [Tiage Synthesis](../theory/en/tiage-synthesis.md) – The overall concept
- [Pirsig Philosophy](../theory/en/pirsig.md) – Metaphysics of Quality
- [OSHO Philosophy](../theory/en/osho.md) – Consciousness and Relationship
- [Pathos/Logos](../theory/en/pathos-logos.md) – The 75:25 weighting
- [Resonance Theory](../theory/en/resonance.md) – The meta-factor
- [The 4 Factors](../theory/en/factors.md) – All quality factors in detail

### Legal

- [Privacy Policy](../legal/en/privacy-policy.md)
- [Terms of Use](../legal/en/terms-of-use.md)

### Scientific Sources

- [Research Sources](../../profiles/docs/research-sources.md) – Complete source collection

---

## Contact

Questions, feedback, or suggestions?

Email: [nerd@ti-age.de](mailto:nerd@ti-age.de)
