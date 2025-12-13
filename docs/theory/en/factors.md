# The 4 Quality Factors

> *How the Tiage Model calculates relationship quality*

## Overview

The Tiage Relationship Model uses **4 main factors** to calculate relationship quality:

| Factor | Weight | Dimension | Description |
|--------|--------|-----------|-------------|
| **Orientation** | 25% | Pathos | Sexual orientation and direction of attraction |
| **Gender** | 25% | Pathos | Gender chemistry and identity resonance |
| **Dominance** | 25% | Pathos | Energetic dynamic and power relationship |
| **Archetype** | 25% | Logos | Fundamental relationship philosophy |

---

## 1. Orientation Factor (25%)

**Dimension:** Pathos (Feeling)

Defines sexual orientation and thus the basic direction of attraction.

### The Orientations

| Orientation | Description |
|-------------|-------------|
| **Heterosexual** | Attraction to the opposite gender |
| **Homosexual** | Attraction to the same gender |
| **Bisexual** | Attraction to multiple genders |

### KO Criteria

**Hard-KO (0%):** Geometrically impossible combinations
- Hetero♂ + Hetero♂ (both looking for women)
- Hetero♀ + Hetero♀ (both looking for men)
- Homo♂ + Lesbian♀ (both looking for someone else)

**Soft-KO (10%):** Unlikely but possible

---

## 2. Archetype Factor (25%)

**Dimension:** Logos (Mind)

Describes the fundamental relationship philosophy – how two people want to live together.

### The 8 Archetypes

| Archetype | Description |
|-----------|-------------|
| **Single** | Autonomous life without primary relationship |
| **Duo** | Classic monogamous partnership with exclusivity |
| **Duo-Flex** | Primary relationship with agreed openings |
| **Solopoly** | Multiple equal relationships with focus on autonomy |
| **Polyamorous** | Deep emotional bonds with multiple partners |
| **RA** | Relationship Anarchist – Rejection of all relationship hierarchies |
| **LAT** | Living Apart Together – Committed partnership without cohabitation |
| **Aromantic** | Focus on platonic connections without romantic component |

### Calculation

Archetype compatibility is calculated via an 8×8 matrix (`archetype-matrix.json`) containing all 64 possible combinations with scores for 6 categories:

| Category | Meaning |
|----------|---------|
| A | Relationship Philosophy |
| B | Value Alignment |
| C | Closeness-Distance Preferences |
| D | Autonomy Needs |
| E | Communication Matching |
| F | Social Compatibility |

---

## 3. Dominance Factor (25%)

**Dimension:** Pathos (Feeling)

Energetic dynamic and power relationship between partners.

### The 4 Dominance Types

| Type | Description |
|------|-------------|
| **Dominant** | Assertive, leading, self-confident, directive |
| **Submissive** | Receptive, supportive, adaptive, following |
| **Switch** | Can take both roles depending on situation |
| **Balanced** | Balance between action and receptivity |

### Status

Each type can be marked as **living** (actively practiced) or **interested** (open to exploration).

### Harmony Types

| Combination | Score | Explanation |
|-------------|-------|-------------|
| Dominant + Submissive | 100% | Complementary polarity |
| Balanced + Balanced | 95% | Tao balance |
| Switch + Switch | 90% | Flexible harmony |
| Dominant + Dominant | 55% | Same poles |
| Submissive + Submissive | 55% | Same poles |

---

## 4. Gender Factor (25%)

**Dimension:** Pathos (Feeling)

Fine-tuning of gender chemistry as complement to the orientation factor.

### The P/S System (Primary/Secondary)

**Primary (Body):**
| Primary | Description |
|---------|-------------|
| Male | Biologically/physically male |
| Female | Biologically/physically female |
| Inter | Intersex |

**Secondary (Identity):**
| Secondary | Meaning |
|-----------|---------|
| Cis | Identity matches body |
| Trans | Identity opposite to body |
| Non-binary | Neither male nor female |
| Fluid | Gender variable/flowing |
| Uncertain | Not yet clarified |

---

## Resonance Coefficient (v3.1)

In addition to the 4 main factors, there is a **meta-factor** that modulates the result.

### Multi-Dimensional Resonance

Each factor has its **own resonance dimension** based on needs match:

| Dimension | Emoji | Factor | Needs |
|-----------|-------|--------|-------|
| **R_Philosophy** | 🧠 | Archetype | 17 Needs (Bonding, Autonomy, Life Planning) |
| **R_Life** | 🔥 | Orientation | 18 Needs (Sexuality, Intimacy, Tantra) |
| **R_Dynamics** | ⚡ | Dominance | 18 Needs (Leadership, Devotion, Power Dynamics) |
| **R_Identity** | 💚 | Gender | 10 Needs (Authenticity, Self-Expression) |

**Formula per dimension:**
```
R_dim = 0.9 + (Match_dim × 0.2)
```

**Interpretation:**
| R-Value | Status | Symbol |
|---------|--------|--------|
| ≥ 1.05 | Resonance | ⬆️ |
| 0.97-1.05 | Neutral | ➡️ |
| ≤ 0.97 | Dissonance | ⬇️ |

The resonance coefficient moves between **0.9 and 1.1** per dimension.

---

## Total Formula (v3.1)

```
Q = (O × 0.25 × R₁) + (A × 0.25 × R₂) + (D × 0.25 × R₃) + (G × 0.25 × R₄)
```

Where:
- O = Orientation Score (0-100) × 25% × R₁ (R_Life)
- A = Archetype Score (0-100) × 25% × R₂ (R_Philosophy)
- D = Dominance Score (0-100) × 25% × R₃ (R_Dynamics)
- G = Gender Score (0-100) × 25% × R₄ (R_Identity)

### Important Distinction

- **88 NVC Needs** → Emotional Match in the resonance formula
- **30 baseAttributes** → Lifestyle filter (K.O. criteria like desire for children, living arrangement)

---

## Result Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| **70-100%** | Good | Solid foundation present |
| **50-69%** | Medium | Requires conscious effort |
| **0-49%** | Challenging | Fundamental differences |

*The quality index is a guideline value. Real relationships depend on many other factors.*

---

## Further Documentation

- [Tiage Synthesis](tiage-synthesis.md) – The overall concept
- [Pathos/Logos](pathos-logos.md) – The weighting in detail
- [Resonance Theory](resonance.md) – The meta-factor
