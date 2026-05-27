# The 4 Quality Factors

> *How the Tiage Model calculates relationship quality*
> **Current version: v3.2 (calculationEngine.js)**

---

## Overview

The Tiage Relationship Model uses **4 main factors** to calculate relationship quality:

| Factor | Symbol | Description |
|--------|--------|-------------|
| **Archetype** | A | Fundamental relationship philosophy (0–100) |
| **Orientation** | O | Sexual orientation and direction of attraction (0–100) |
| **Dominance** | D | Energetic dynamic and power balance (0–100) |
| **Gender** | G | Gender chemistry and identity attraction (0–100) |

Each factor is multiplied by its own **resonance factor (R)** before the weighted terms are summed.

---

## Main Formula (v3.2)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

| Term | Meaning |
|------|---------|
| `O × wO × R1` | Orientation × user weight × Resonance Life |
| `A × wA × R2` | Archetype × user weight × Resonance Philosophy |
| `D × wD × R3` | Dominance × user weight × Resonance Dynamics |
| `G × wG × R4` | Gender × user weight × Resonance Identity |

Each factor contributes with its **own needs resonance** — there is no shared meanR multiplier.

**Score can exceed 100** — when R-factors > 1.0 or FFH-Extras bonus is active.

**Sources:**
- `js/synthesis/calculationEngine.js` → `calculateRelationshipQuality()` (line 483)
- `js/synthesis/scoringEngine.js` → individual O/A/D/G functions
- `js/weights/agodWeights.js` → `AGOD_DEFAULT_WEIGHTS`

---

## User-Configurable Weights (AGOD)

Each of the 4 factors can be prioritized by the user (0 = Irrelevant, 1 = Normal, 2 = Important, 3 = Decisive):

```javascript
// Quadratic weighting: 0→0, 1→1, 2→4, 3→9
eA = weight.A², eO = weight.O², eD = weight.D², eG = weight.G²
sum = eA + eO + eD + eG  // if all 0+0+0+0: equal weighting (all 25%)

wA = eA / sum   // normalized to 0–1
wO = eO / sum
wD = eD / sum
wG = eG / sum
```

**Default:** all weights = 1 → each factor contributes 25%.

Quadratic scaling creates true dominance at high values:
- Weight 3 on one factor = 9/12 = **75%** of that factor
- Weight 0 = factor is **completely ignored**

**Source:** `js/weights/agodWeights.js` → `AGOD_DEFAULT_WEIGHTS = { O: 1, A: 1, D: 1, G: 1 }`

---

## 1. Archetype Factor (A)

Describes the fundamental relationship philosophy — how two people want to live together.

### The 8 Archetypes

| Archetype | Description |
|-----------|-------------|
| **Single** | Autonomous life without a primary relationship |
| **Duo** | Classic monogamous couple with exclusivity |
| **Duo-Flex** | Primary relationship with agreed openings |
| **Solopoly** | Multiple equal relationships with focus on autonomy |
| **Polyamorous** | Deep emotional bonds with multiple partners |
| **RA** | Relationship Anarchist — rejects all relationship hierarchies |
| **LAT** | Living Apart Together — committed partnership without cohabitation |
| **Aromantic** | Focus on platonic connections without romantic component |

### Calculation

Archetype compatibility is determined via an **8×8 matrix** from `archetype-matrix.json` as a single score (0–100).

In the formula, **R2 (Resonance Philosophy)** acts as the amplifier for the Archetype score.

**Source:** `js/synthesis/scoringEngine.js` → `getArchetypeScore(arch1, arch2)`

---

## 2. Orientation Factor (O)

Defines sexual orientation and thus the basic direction of attraction.

### The Orientations

| Orientation | Description |
|-------------|-------------|
| **Heterosexual** | Attraction to the opposite gender |
| **Homosexual** | Attraction to the same gender |
| **Bisexual** | Attraction to multiple genders |
| **Pansexual** | Attraction regardless of gender/identity |
| **Queer** | Beyond binary categories |

### Compatibility Logic

The check is **bidirectional**: both people must be able to find each other attractive.

```javascript
person1CanBeAttracted = canBeAttractedTo(type1, gender1, gender2)
person2CanBeAttracted = canBeAttractedTo(type2, gender2, gender1)
if (person1CanBeAttracted && person2CanBeAttracted) → 'possible'
else → 'impossible'  // Hard-KO: score = 0
```

| Combination | Score |
|-------------|-------|
| Hetero♂ + Hetero♀ | 100 |
| Gay♂ + Gay♂ | 100 |
| Bi/Pan + anyone | 100 |
| Hetero♂ + Hetero♂ | 0 (Hard-KO) |
| Hetero♀ + Hetero♀ | 0 (Hard-KO) |

**Hard-KO (score = 0):** When O = 0, no AGOD score is calculated — `calculationEngine.js` immediately returns `{ score: 0, blocked: true }`.

**Hard-KO display:** In the Slot Machine gender split, a `score = 0` shows the entry as **"— / Not compatible (KO)"** instead of a result with an adopt button.

In the formula, **R1 (Resonance Life)** acts as the amplifier for the Orientation score.

**Source:** `js/synthesis/scoringEngine.js` → `checkSingleOrientationPair()`

---

## 3. Dominance Factor (D)

Energetic dynamic and power balance between partners.

### The 4 Dominance Types

| Type | Description |
|------|-------------|
| **Dominant** | Assertive, leading, self-confident, directive |
| **Submissive** | Receptive, supportive, adaptive, following |
| **Switch** | Can take both roles depending on the situation |
| **Balanced** | Equilibrium between action and receptivity |

### Harmony Types

| Combination | Score | Explanation |
|-------------|-------|-------------|
| Dominant + Submissive | 100 | Complementary polarity |
| Balanced + Balanced | 95 | Tao balance |
| Switch + Switch | 90 | Flexible harmony |
| Dominant + Dominant | 55 | Same poles |
| Submissive + Submissive | 55 | Same poles |

In the formula, **R3 (Resonance Dynamics)** acts as the amplifier for the Dominance score.

**Source:** `js/synthesis/scoringEngine.js` → `calculateDominanceHarmony(dom1, dom2)`

---

## 4. Gender Factor (G)

Fine-tuning of gender chemistry: identity similarity and bidirectional attraction.

### Calculation (R4 Hybrid)

```javascript
G = (identityScore × 0.30 + attractionScore × 0.70)²
```

- **identityScore:** Similarity of gender identity (Cis/Trans/NB/Fluid)
- **attractionScore:** Bidirectional attraction — ME→Partner × Partner→ME (geometric mean)

The G factor simultaneously equals **R4 (Resonance Identity)** — it is a hybrid of needs proximity (identity needs #B10, #B13, #B15, #B16) and direct attraction.

### Gender Dimensions

**Body (Primary):** Man, Woman, Inter

**Identity (Secondary):** Cis, Trans, Non-binary, Fluid, Questioning

**Attraction:** Pan/Bi = 100 for all genders.

**Source:** `js/synthesis/scoringEngine.js` → `calculateGenderAttraction(p1, p2)`

---

## Result Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| **> 100** | Extraordinary | High needs resonance + FFH boost active |
| **80–100** | Very good | Strong foundation, R-factors amplify |
| **60–79** | Good | Solid compatibility |
| **40–59** | Medium | Requires conscious effort |
| **< 40** | Challenging | Fundamental differences |

*The quality index is a reference value. Real relationships depend on many additional factors.*

---

## Further Documentation

- [Score Calculation](score-calculation-overview.md) — Complete formula and data flow
- [Resonance Theory](resonance.md) — R-factors and needs mapping
- [Pathos & Logos](pathos-logos.md) — The philosophical weighting
