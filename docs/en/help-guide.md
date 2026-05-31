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

### Step 2: Calculate R-Factors (v4.0)

Per person, the system measures: *How well do your needs match your archetype?*

The calculation compares your actual need values against the archetype's ideal profile — **weighted by the 4 development stages** (S1–S4). The result is 4 **R-Factors** (Resonance) per person.

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
meanR            = combineRFactors(R1…R4, self and partner)
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

## R-Factors (Resonance, v4.0)

The R-factors measure per dimension how coherent a person's needs are with their archetype ideal. The calculation has two steps:

### Step 1: Individual R-value (per person)

For each need in the archetype's expected profile:

```
deviation = (actualValue − archetypeIdealValue) / 50
match     = 1 + deviation
```

- `match = 1.0` → need exactly matches the archetype ideal
- `match > 1.0` → need exceeds the archetype's expected intensity
- `match < 1.0` → need falls below the archetype's expected intensity

A **stage-weighted average** is then calculated (the 4 development stages S1–S4 can be weighted differently):

```
avgMatch = Σ(match × stageWeight) / Σ(stageWeight)
R        = avgMatch^2.5
```

The exponent 2.5 amplifies deviations non-linearly: small differences stay small, large deviations have a strong impact.

| avgMatch | R-Value | Meaning |
|---------|---------|---------|
| 1.2 (+20%) | **1.58** | Clear amplification |
| 1.0 (=) | **1.00** | Neutral |
| 0.8 (−20%) | **0.57** | Clear reduction |
| 0.5 (−50%) | **0.18** | Strong reduction |

### Step 2: Combining both partners

The R-values of self and partner are combined, rewarding similar resonance profiles:

```
R_combined = (R_self + R_partner) / 2 × min(R_self, R_partner) / max(R_self, R_partner)
```

When both partners have similarly high R-values, the combined R stays close to their average. When one is significantly higher than the other, the combined value is reduced.

### Resonance Boost

When `meanR > 1.0`, the final score receives an additional boost:

```
boost      = (meanR − 1.0) × 0.5
finalScore = Q × (1 + boost)
```

This allows scores above 100% when resonance is exceptionally strong.

---

## The 16 Development Stage Needs (V4)

The **development stage system** is based on 16 defining needs (#B1–#B16), organised into 4 stages:

| Stage | Name | Needs |
|-------|------|-------|
| **S1** Foundation | Existence & Security | Well-being · Security · Ease · Orientation |
| **S2** Unfolding | Strength & Expression | Effectiveness · Freedom · Intensity · Development |
| **S3** Connection | Belonging & Resonance | Community · Recognition · Justice · Connectedness |
| **S4** Meaning | Identity & Purpose | Self-knowledge · Meaning · Integrity · Self-actualisation |

These 16 needs serve a **dual purpose**:
1. They define your personal **development profile** (visible in the Osho card section)
2. Their priority setting (0/1/2) influences the **stage weighting** used in R-factor calculation

> The remaining 210 needs still feed into the full pairwise needs match (226 needs total).

---

## Needs Match (226 Needs)

The **needs match** shows the weighted overlap across all 226 needs:

```
For EACH need:
    similarity   = 100 − |value person 1 − value person 2|
    weight       = (value person 1 + value person 2) / 2
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

### R-Factors (combined, from needs profiles)

| Dimension | avgMatch Self | avgMatch Partner | R combined |
|-----------|--------------|-----------------|------------|
| 🧠 R2 Philosophy | 0.92 | 0.92 | **0.80** |
| 🔥 R1 Life | 1.14 | 1.12 | **1.38** |
| ⚡ R3 Dynamics | 1.04 | 1.04 | **1.11** |
| 💚 R4 Identity | 1.12 | 1.10 | **1.28** |

### Calculation

```
Weights: wO = wA = wD = wG = 0.25 (all set to Normal)

rawCompatibility = (75 × 0.25) + (100 × 0.25) + (100 × 0.25) + (100 × 0.25)
                 = 18.75 + 25.0 + 25.0 + 25.0
                 = 93.75

meanR = (0.80 + 1.38 + 1.11 + 1.28) / 4 = 1.14

Q = 93.75 × 1.14 = 106.9

Resonance boost: (1.14 − 1.0) × 0.5 = 0.07
finalScore ≈ 106.9 × 1.07 ≈ 114 → 100% (capped)
```

**Interpretation:** Strong resonance in Life and Identity amplifies the result. The slight dissonance in Philosophy signals that the couple should work on developing a shared relationship philosophy.

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
