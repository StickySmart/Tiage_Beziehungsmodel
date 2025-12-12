# Gaussian Distribution Model of Needs

> *Statistical foundation for needs values in the Tiage Relationship Model*

---

## Basic Principle

Every needs value in the Tiage Model represents the **expected value (μ)** of a Gaussian normal distribution for a specific trait combination.

```
For: Archetype + Gender + Orientation + Dominance

→ Every need Y has a value X (0-100)
→ X = μ (mean) of the normal distribution
→ 80% of people with this combination fall within the confidence interval
```

---

## Mathematical Definition

### Normal Distribution

The probability density of a normal distribution:

```
f(x) = (1 / (σ√(2π))) × e^(-(x-μ)²/(2σ²))
```

| Symbol | Meaning | In Tiage Model |
|--------|---------|----------------|
| **μ** | Mean (expected value) | The stored value (e.g., `closeness: 75`) |
| **σ** | Standard deviation | Variability within the group |
| **x** | Individual value | Actual value of a person |

### Confidence Interval (80%)

```
P(μ - 1.28σ ≤ X ≤ μ + 1.28σ) = 0.80
```

This means: **80% of the population** with this trait combination have a value in the interval:

```
[μ - 1.28σ, μ + 1.28σ]
```

---

## Application in the Model

### 1. Base Value from Archetype

Each archetype defines base expected values:

```javascript
// profiles/archetypen/duo.js
beduerfnisse: {
    zuneigung: {
        naehe: 95,      // μ = 95 for Duo archetype
        intimitaet: 95,
        liebe: 95
    },
    freiheit: {
        unabhaengigkeit: 35,  // μ = 35 (low for Duo)
        raum_haben: 40
    }
}
```

### 2. Modification through Properties

The modifiers **shift the expected value μ**:

```javascript
// profiles/beduerfnis-modifikatoren.js

// Dominance modifier for "submissive"
submissiv: {
    naehe: +20,           // μ_new = μ_base + 20
    geborgenheit: +30,
    selbstbestimmung: -20  // μ_new = μ_base - 20
}

// Gender modifier for "cis_woman"
cis_frau: {
    naehe: +20,
    empathie: +20,
    unabhaengigkeit: -10
}
```

### 3. Final Calculation

```
μ_final = μ_archetype + Δ_dominance + Δ_gender + Δ_orientation

Example: Duo + Submissive + Cis-Woman + Heterosexual → Need "Closeness"

μ_final = 95 + 20 + 20 + 0 = 135 → limited to 100

→ 80% of this group rate "Closeness" at ~88-100 points
```

---

## Statistical Key Values

### Standard Deviation (σ)

The standard deviation varies by needs category:

| Category | Typical σ | Reasoning |
|----------|-----------|-----------|
| **Safety** | σ ≈ 10-12 | Relatively uniform within group |
| **Freedom** | σ ≈ 12-15 | Higher individual variation |
| **Dynamics** | σ ≈ 15-18 | Strongly experience-dependent |
| **Life Planning** | σ ≈ 12-15 | Culturally/biographically influenced |

### Confidence Levels

| Confidence | z-Value | Interval |
|------------|---------|----------|
| **80%** | 1.28 | μ ± 1.28σ (Standard in model) |
| **90%** | 1.645 | μ ± 1.645σ |
| **95%** | 1.96 | μ ± 1.96σ |
| **99%** | 2.576 | μ ± 2.576σ |

### Why 80%?

- **Practicality**: 80% captures the core group without outliers
- **Variance Tolerance**: 20% deviation is expected and normal
- **Research Basis**: Many psychological studies use 80% as threshold

---

## Validation

### Empirical Foundation

The values are based on:

1. **Big Five Research** (McCrae & Costa, 1997)
2. **BDSM Personality Research** (Wismeijer & van Assen, 2013)
3. **Orientation Meta-Analyses** (Allen et al., 2020)
4. **CNM/Polyamory Studies** (Moors et al., 2017)

See: [research-sources.md](../../profiles/docs/en/research-sources.md)

### 80% Rule in Literature

> "In personality research, the 80% confidence interval is commonly used to describe the 'typical' range for a given trait within a population subgroup."
> — McCrae & Costa (1997)

---

## Limitations

1. **Western Samples**: Research based mainly on Western populations
2. **Self-Reports**: May be biased by social desirability
3. **Intersectionality**: Complex interactions not fully representable
4. **Individual Variation**: Often exceeds group averages

---

## Further Documentation

- [Score Calculation](score-calculation-overview.md) - How values are used
- [Research Sources](../../profiles/docs/en/research-sources.md) - Scientific basis
- [Needs Modifiers](../../profiles/beduerfnis-modifikatoren.js) - Implementation

---

*Created for the Tiage Relationship Model*
*Last update: December 2024*
