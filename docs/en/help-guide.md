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

## The 4 Quality Factors

| Factor | Weight | Dimension | Description |
|--------|--------|-----------|-------------|
| **Orientation Compatibility** | 25% | Pathos | Physical polarity and attraction. OSHO: "Only extremes can truly attract each other." |
| **Gender Attraction** | 25% | Pathos | Gender chemistry and identity resonance |
| **Dominance Harmony** | 25% | Pathos | Energetic dynamic. OSHO: "Tao - one energy, two expressions." |
| **Archetype Match** | 25% | Logos | Fundamental relationship philosophy: "How do we want to live relationships?" |

## Calculation (v3.1)

### Main Formula

```
Q = (A × 0.25 × R_Philosophy) + (O × 0.25 × R_Life) + (D × 0.25 × R_Dynamics) + (G × 0.25 × R_Identity)
```

**NEW in v3.1:** Each factor is multiplied by its **own resonance dimension**:

| Factor | Weight | × | Resonance Dimension |
|--------|--------|---|---------------------|
| A (Archetype) | 25% | × | 🧠 R_Philosophy |
| O (Orientation) | 25% | × | 🔥 R_Life |
| D (Dominance) | 25% | × | ⚡ R_Dynamics |
| G (Gender) | 25% | × | 💚 R_Identity |

Each factor is individually rated on 0-100%. **Resonance (R)** is a meta-factor (0.9-1.1) that modulates how well head (Logos) and heart (Pathos) resonate together.

### Multi-Dimensional Resonance (v3.1)

Resonance is calculated across **4 disjoint dimensions** – no overlap, each need is only counted once:

| Dimension | Emoji | Question | Needs |
|-----------|-------|----------|-------|
| **Identity** | 💚 | *Who am I, who are you?* | 10 Needs (Authenticity, Self-expression...) |
| **Philosophy** | 🧠 | *How do we want to live relationships?* | 17 Needs (Bonding, Autonomy...) |
| **Life** | 🔥 | *What attracts us?* | 18 Needs (Intimacy, Sexuality...) |
| **Dynamics** | ⚡ | *Who leads, who follows?* | 18 Needs (Control, Devotion...) |

### Resonance Formula per Dimension

```
R_dim = 0.9 + (Match_dim × 0.2)
```

**Value range:** R varies between 0.9 (minimal resonance) and 1.1 (maximal resonance).

**Interpretation per dimension:**

| R-Value | Status | Symbol |
|---------|--------|--------|
| ≥ 1.05 | Resonance | ⬆️ |
| 0.97-1.05 | Neutral | ➡️ |
| ≤ 0.97 | Dissonance | ⬇️ |

> **Important distinction:**
> - **63 NVC Needs** → Dimensional match in R-values
> - **30 baseAttributes** → Lifestyle filter (K.O. criteria like desire for children, living arrangement)

### Match Calculation per Dimension

For each dimension, the relevant needs are compared:

```
Match = Σ(100 - |Value_P1 - Value_P2|) / 100 / n
```

*Example: With 80% match in the Philosophy dimension: R_Phil = 0.9 + (0.8 × 0.2) = 1.06 ⬆️*

### NVC Communication Factor (K)

Nonviolent Communication (NVC) according to Marshall Rosenberg modulates the dimensional coefficient:

| ME / Partner | high | medium | low |
|--------------|------|--------|-----|
| **high**     | 1.0  | 0.75   | 0.35 |
| **medium**   | 0.75 | 0.5    | 0.2 |
| **low**      | 0.35 | 0.2    | 0.0 |

```
R_final = R_dimensional × (0.85 + K × 0.15)
```

### Resonance Override

OSHO taught: **Sexual orientation is conditioning, not nature.** The natural human is beyond labels.

Normally: If orientation is incompatible (e.g., two heterosexual men), this results in 0% orientation score and thus a K.O. criterion.

The **Resonance Override** enables an exception: If two people resonate on a deep level (R >= 1.05), this connection can transcend conditioned boundaries.

| Resonance (R) | Override Effect | O_effective |
|---------------|-----------------|-------------|
| < 1.05 | No Override | 0% (K.O.) |
| 1.05 | Weak Opening | 5% |
| 1.08 | Moderate Opening | 8% |
| 1.10 | Maximum Opening | 10% |

**Formula:** `O_effective = (R - 1.0) × 100`

> *"Love knows no boundaries. When two souls truly resonate, all societal categories are just shadows on the wall."* – OSHO

**Note:** This is not a recommendation, but a philosophical possibility that the model depicts. The override shows: Deep resonance can transcend conditioned patterns.

## Calculation Example (v3.1)

**Duo (Cis Woman, Submissive, Hetero) × Duo-Flex (Cis Man, Dominant, Hetero)**

### Step 1: Factor Scores

| Factor | Value | Reason |
|--------|-------|--------|
| A (Archetype) | 75 | Duo ↔ Duo-Flex = closely related |
| O (Orientation) | 100 | Hetero + Hetero with M/F = fully compatible |
| D (Dominance) | 100 | Submissive + Dominant = complementary |
| G (Gender) | 100 | Cis Woman × Cis Man = Match |

### Step 2: Dimensional Resonance (assumed)

| Dimension | Match | R-Value | Status |
|-----------|-------|---------|--------|
| 🧠 R_Philosophy | 30% | 0.9 + (0.3 × 0.2) = **0.96** | ⬇️ Dissonance |
| 🔥 R_Life | 90% | 0.9 + (0.9 × 0.2) = **1.08** | ⬆️ Resonance |
| ⚡ R_Dynamics | 60% | 0.9 + (0.6 × 0.2) = **1.02** | ➡️ Neutral |
| 💚 R_Identity | 80% | 0.9 + (0.8 × 0.2) = **1.06** | ⬆️ Resonance |

### Step 3: Dimensional Multiplication (v3.1)

```
Q = (A × w_A × R_Phil) + (O × w_O × R_Life) + (D × w_D × R_Dyn) + (G × w_G × R_Ident)

Q = (75 × 0.15 × 0.96) +     = 10.8  🧠
    (100 × 0.40 × 1.08) +    = 43.2  🔥
    (100 × 0.20 × 1.02) +    = 20.4  ⚡
    (100 × 0.25 × 1.06)      = 26.5  💚
    ─────────────────────────────────
    finalScore               = 101 → 100%
```

**Comparison with Legacy (baseScore × R_total):**
- baseScore = 11.25 + 40 + 20 + 25 = 96.25
- Legacy: 96.25 × 1.03 = **99%**
- v3.1: **100%** (dimensional resonance rewards strong match in O, D, G)

## The 8 Archetypes

| Archetype | Description |
|-----------|-------------|
| **Single** | Autonomous life without primary relationship |
| **Duo** | Monogamous partnership with exclusivity |
| **Duo-Flex** | Primary relationship with agreed openings |
| **Solopoly** | Multiple equal relationships, focus on autonomy |
| **Polyamorous** | Deep emotional bonds with multiple partners |
| **RA** | Relationship Anarchist - Rejection of all relationship hierarchies |
| **LAT** | Living Apart Together - Committed partnership without cohabitation |
| **Aromantic** | Focus on platonic connections without romantic component |

## Result Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| **70-100%** | Good | Solid foundation present |
| **50-69%** | Medium | Requires conscious effort |
| **0-49%** | Challenging | Fundamental differences |

*The quality index is a guideline value. Real relationships depend on many other factors.*

## Further Documentation

### Philosophical Foundations

- [Tiage Synthesis](../theory/en/tiage-synthesis.md) - The overall concept
- [Pirsig Philosophy](../theory/en/pirsig.md) - Metaphysics of Quality
- [OSHO Philosophy](../theory/en/osho.md) - Consciousness and Relationship
- [Pathos/Logos](../theory/en/pathos-logos.md) - The 75:25 weighting
- [Resonance Theory](../theory/en/resonance.md) - The meta-factor
- [The 4 Factors](../theory/en/factors.md) - All quality factors in detail

### Legal

- [Privacy Policy](../legal/en/privacy-policy.md)
- [Terms of Use](../legal/en/terms-of-use.md)

### Scientific Sources

- [Research Sources](../../profiles/docs/en/research-sources.md) - Complete source collection

## Contact

Questions, feedback, or suggestions?

Email: [nerd@ti-age.de](mailto:nerd@ti-age.de)
