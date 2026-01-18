# Score Calculation: Complete Context

> This document shows the complete data flow from input to output with all source references.

---

## Main Formula (v3.1)

```
Q = (A × 0.15 × R_Philosophy) + (O × 0.40 × R_Life) + (D × 0.20 × R_Dynamics) + (G × 0.25 × R_Identity)
```

Each factor is multiplied by its **own resonance dimension**:

| Factor | Weight | Resonance |
|--------|--------|-----------|
| A (Archetype) | 25% | 🧠 R_Philosophy |
| O (Orientation) | 25% | 🔥 R_Life |
| D (Dominance) | 25% | ⚡ R_Dynamics |
| G (Gender) | 25% | 💚 R_Identity |

**Source:** `js/synthesis/synthesisCalculator.js:6` and `js/synthesis/constants.js:7`

---

## NEW v3.0: Needs Integration per Factor

Each factor (A, O, D, G) now combines matrix score with needs match:

```
Factor = (Matrix × matrixWeight) + (NeedsMatch × needsWeight)
```

### Weighting per Factor

| Factor | Matrix | Needs | Relevant Needs |
|--------|--------|-------|----------------|
| **Archetype** | 60% | 40% | kinderwunsch, langfristige_bindung, nicht_anhaften... |
| **Orientation** | 50% | 50% | sexuelle_experimentierfreude, biologische_anziehung... |
| **Dominance** | 50% | 50% | kontrolle_ausueben, hingabe, dynamische_evolution... |
| **Gender** | 60% | 40% | authentizitaet, eigene_wahrheit, akzeptanz... |

---

## Variable Overview

| Variable | Name | Weight | Category | Source (Formula) | Source (Value) |
|----------|------|--------|----------|------------------|----------------|
| **Q** | Quality Index | - | Result | `synthesisCalculator.js:195` | Calculated |
| **A** | Archetype Score | 25% | LOGOS | `constants.js:24` | `archetypeFactor.js` |
| **O** | Orientation Score | 25% | PATHOS | `constants.js:25` | `orientationFactor.js` |
| **D** | Dominance Score | 25% | PATHOS | `constants.js:26` | `dominanceFactor.js` |
| **G** | Gender Score | 25% | PATHOS | `constants.js:27` | `genderFactor.js` |
| **R** | Resonance Coefficient | 0-2 (practically 0.8-1.3) | Meta | `synthesisCalculator.js` (v3.4) | Calculated |

---

## The 4 Factors in Detail

### 1. Archetype (A) - 25% LOGOS

**Source:** `js/synthesis/factors/archetypeFactor.js`
**Data:** `archetype-matrix.json`

```
A = Matrix[archetype1][archetype2].overall
```

The 8×8 matrix contains precalculated compatibility values (0-100) for all archetype combinations.

**Example values:**
| Combination | Value | Source |
|-------------|-------|--------|
| duo × duo | 97 | `archetype-matrix.json` |
| duo × duoflex | 75 | `archetype-matrix.json` |
| duo × polyamor | 51 | `archetype-matrix.json` |

---

### 2. Orientation (O) - 25% PATHOS

**Source:** `js/synthesis/factors/orientationFactor.js`
**Constants:** `constants.js:129-135`

```javascript
ORIENTATION: {
    COMPATIBLE: 100,     // Full compatibility
    EXPLORING: 70,       // Exploration phase
    UNLIKELY: 30,        // Unlikely
    INCOMPATIBLE: 10,    // Soft K.O.
    HARD_KO: 0           // Geometrically impossible
}
```

**Hard K.O. Cases** (Source: `constants.js:143-154`):
- Hetero♂ + Hetero♂ → O = 0
- Hetero♀ + Hetero♀ → O = 0
- Hetero♂ + Lesbian♀ → O = 0

---

### 3. Dominance (D) - 20% PATHOS

**Source:** `js/synthesis/factors/dominanceFactor.js`
**Matrix:** `constants.js:96-122`

```javascript
DOMINANCE_MATRIX: {
    "dominant-submissiv": 100,   // Complementary
    "submissiv-dominant": 100,
    "ausgeglichen-ausgeglichen": 95,
    "switch-switch": 90,
    "dominant-dominant": 55,     // Tension
    "submissiv-submissiv": 55
}
```

---

### 4. Gender (G) - 25% PATHOS

**Source:** `js/synthesis/factors/genderFactor.js`
**Constants:** `constants.js:201-205`

```javascript
GENDER: {
    FULL_MATCH: 100,
    NON_BINARY_INVOLVED: 80,
    MIXED_ORIENTATION: 75
}
```

---

## Resonance Calculation in Detail (v3.1)

**Multi-Dimensional Formula** (Source: `synthesisCalculator.js:852-907`):

```
R_dim = 0.9 + (Match_dim × 0.2)
```

Each of the 4 dimensions calculates its own R-value based on the needs match:

| Dimension | Needs Source | Count |
|-----------|--------------|-------|
| 🧠 R_Philosophy | ARCHETYPE_NEEDS | 17 |
| 🔥 R_Life | ORIENTATION_NEEDS | 18 |
| ⚡ R_Dynamics | DOMINANCE_NEEDS | 18 |
| 💚 R_Identity | GENDER_NEEDS | 10 |

### Match Calculation per Dimension

**Source:** `synthesisCalculator.js:931-955`

```
Match = Σ(100 - |Value_P1 - Value_P2|) / 100 / n
```

For each need in the dimension, similarity is calculated and averaged.

### Interpretation per Dimension

| R-Value | Status | Meaning |
|---------|--------|---------|
| ≥ 1.05 | ⬆️ Resonance | Good vibration in this dimension |
| 0.97-1.05 | ➡️ Neutral | Balanced |
| ≤ 0.97 | ⬇️ Dissonance | Tension in this dimension |

---

## Calculation Example

**Input:**
```javascript
person1: { archetype: "duo", orientation: "heterosexual", dominance: "dominant", gender: "male" }
person2: { archetype: "duoflex", orientation: "heterosexual", dominance: "submissive", gender: "female" }
NVC: person1 = "medium", person2 = "medium"
```

**Step 1: Factors**
```
A = 75  (duo_duoflex from archetype-matrix.json)
O = 100 (Hetero♂ + Hetero♀ = COMPATIBLE)
D = 100 (dominant + submissive from DOMINANCE_MATRIX)
G = 100 (Hetero♂ + Hetero♀ = FULL_MATCH)
```

**Step 2: Logos & Pathos**
```
logos = A = 75
pathos = (100 + 100 + 100) / 3 = 100
```

**Step 3: Multi-Dimensional Resonance (v3.1)**
```
Match per dimension (assumed):
  Match_Philosophy  = 0.30  → R_Phil   = 0.9 + (0.30 × 0.2) = 0.96  🧠
  Match_Life        = 0.90  → R_Life   = 0.9 + (0.90 × 0.2) = 1.08  🔥
  Match_Dynamics    = 0.60  → R_Dyn    = 0.9 + (0.60 × 0.2) = 1.02  ⚡
  Match_Identity    = 0.80  → R_Ident  = 0.9 + (0.80 × 0.2) = 1.06  💚
```

**Step 4: Dimensional Multiplication (v3.1)**
```
finalScore = Math.round(
  (75 × 0.15 × 0.96) +     = 10.8  🧠 (Archetype × R_Philosophy)
  (100 × 0.40 × 1.08) +    = 43.2  🔥 (Orientation × R_Life)
  (100 × 0.20 × 1.02) +    = 20.4  ⚡ (Dominance × R_Dynamics)
  (100 × 0.25 × 1.06)      = 26.5  💚 (Gender × R_Identity)
)
────────────────────────────────────
finalScore = 101 → capped at 100
```

---

## Profile Composition (A-F Category Scores)

The 864 psychological profiles are **composed on-demand** and receive individual category scores based on their combination.

### Composition Formula

```
Score[Category] = baseScores[archetype][Category]
                + genderModifiers[gender].categoryModifiers[Category]
                + dominanceModifiers[dominance].categoryModifiers[Category]
                + orientationModifiers[orientation].categoryModifiers[Category]
```

**Source:** `profiles/profile-store.js`

### Category Dimensions

| Category | Name | Description |
|----------|------|-------------|
| **A** | Relationship Philosophy | Basic attitude toward relationships |
| **B** | Value Alignment | Match of traditional/progressive values |
| **C** | Closeness-Distance | Need for intimacy vs. space |
| **D** | Autonomy | Independence in relationship |
| **E** | Communication | Emotional openness and expressiveness |
| **F** | Social Compatibility | Fit with societal norms |

---

## Source Directory

| File | Function |
|------|----------|
| `js/synthesis/constants.js` | All weights, matrices, constants |
| `js/synthesis/synthesisCalculator.js` | Main calculation, resonance |
| `js/synthesis/factors/archetypeFactor.js` | Archetype score (A) |
| `js/synthesis/factors/orientationFactor.js` | Orientation score (O) |
| `js/synthesis/factors/dominanceFactor.js` | Dominance score (D) |
| `js/synthesis/factors/genderFactor.js` | Gender score (G) |
| `archetype-matrix.json` | 8×8 archetype compatibility matrix |
| `profiles/gfk-beduerfnisse.js` | Base needs per archetype |
| `profiles/beduerfnis-modifikatoren.js` | Needs modifiers |

---

## Further Documentation

- [Pathos & Logos](pathos-logos.md) - The 25:75 weighting
- [Resonance Theory](resonance.md) - Meta dimension
- [Relationship Model](../../beziehungsmodell.md) - Complete model description
