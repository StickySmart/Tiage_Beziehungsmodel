# Pathos and Logos in the Tiage Model

> *The dual structure of relationship quality*
> **Current version: v3.2 (calculationEngine.js)**

---

## Basic Concept: 25:75 Weighting

The Tiage Model divides relationship quality into two fundamental dimensions:

| Dimension | Share | Origin | Pirsig Term |
|-----------|-------|--------|-------------|
| **Pathos** | 75% | Feeling | Dynamic Quality |
| **Logos** | 25% | Mind | Static Quality |

This weighting emerges **automatically from equal distribution of the 4 factors**: each of the 4 AGOD factors contributes 25%. Since three of them (O, D, G) are Pathos factors, 75% falls on Pathos.

---

## Logos (25% — Mind)

The rational, structure-giving dimension.

### Properties

- Proven patterns that create stability
- Rational decision-making foundations
- Structural compatibility
- Long-term predictability

### Manifestation in the Model

**Archetype Match (A) — 25% of total score**

The fundamental relationship philosophy: *"How do we want to live relationships?"*

| Example | Meaning |
|---------|---------|
| Single ↔ Polyamorous | Low Logos alignment |
| Duo ↔ Duo-Flex | High Logos alignment |

---

## Pathos (75% — Feeling)

The emotional, attracting dimension.

### Properties

- Force for change and growth
- Spontaneous attraction
- Emotional resonance
- Energetic dynamic

### Manifestation in the Model

| Factor | Share | Description |
|--------|-------|-------------|
| **Orientation Compatibility (O)** | 25% | Physical polarity and attraction |
| **Gender Attraction (G)** | 25% | Gender chemistry and identity resonance |
| **Dominance Harmony (D)** | 25% | Energetic dynamic (Tao) |

---

## Philosophical Foundations

### Pirsig: Static vs. Dynamic Quality

- **Static Quality (Logos):** Structured, repeatable patterns — the foundation that gives relationships stability
- **Dynamic Quality (Pathos):** Creative force for growth — the aliveness that keeps relationships moving

### OSHO: Awareness and Polarity

> *"Only opposites can truly attract."*

> *"Tao — one energy, two expressions."*

---

## The Balance Calculation

The Logos-Pathos Balance (B) measures how evenly head and heart work together in the result:

```
Logos  = A (Archetype score)
Pathos = (O + D + G) / 3

B = (100 − |Logos − Pathos|) / 100    → range: 0.0–1.0
```

**Source:** `js/synthesis/calculationEngine.js` → `calculateLogosPathosBalance()`

### Example

| Value | Result |
|-------|--------|
| Archetype score (A) | 72 |
| Average O, D, G | 65 |
| Difference | \|72 − 65\| = 7 |
| Balance B | (100 − 7) / 100 = **0.93** |

A high balance (close to 1.0) means: head and heart are in alignment.

### Role in the System

B is a **display dimension**, not part of the main formula. The balance flows together with M (Profile Match) and K (GFK factor) into `calculateResonanz()`:

```
R_display = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

This R value appears in the output object (`resonanz.B`, `resonanz.M`) and is shown in the UI. The **main formula** uses the dimension-specific R1–R4 from needs:

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

**Source:** `js/synthesis/calculationEngine.js` → `calculateResonanz()`

---

## Why 75% Pathos?

The model weights emotional factors higher because:

1. **"Pathos before Logos"** — People experience relationships first emotionally/physically (chemistry, attraction)
2. **The archetype question comes later** — "How do we want to live relationships?" only arises after the initial Pathos factors
3. **Zen/Osho perspective** — Accept what IS (the felt attraction), then follows the conscious choice
4. **Equal factor weighting** — Each of the 4 factors contributes equally at 25%, but 3 out of 4 are Pathos (O, D, G)

---

## Further Documentation

- [Pirsig Philosophy](pirsig.md) — Static and dynamic quality in detail
- [OSHO Philosophy](osho.md) — Polarity and awareness
- [Resonance Theory](resonance.md) — R1–R4 and the main formula
- [The 4 Factors](factors.md) — A/O/D/G in detail
