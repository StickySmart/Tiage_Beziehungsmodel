# Resonance Theory in the Tiage Model

> *Resonance as meta-dimension of relationship quality*

## What is Resonance?

Resonance (R) is a **meta-factor** (0.9-1.1) that modulates how well head (Logos) and heart (Pathos) resonate together.

> *"Perception is based on vibrations and patterns. Resonance = synchronicity between internal neural rhythms and external signals."*

## The R Formula

### Legacy Formula (v3.0)
```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

### Multi-Dimensional Resonance (v3.1)

**NEW:** Resonance is calculated across 4 **disjoint** dimensions:

```
R_Identity    = 0.9 + (Match_gender × 0.2)      💚  (10 Needs)
R_Philosophy  = 0.9 + (Match_archetype × 0.2)   🧠  (17 Needs)
R_Life        = 0.9 + (Match_orientation × 0.2) 🔥  (18 Needs)
R_Dynamics    = 0.9 + (Match_dominance × 0.2)   ⚡  (18 Needs)

Final calculation (v3.1):
Q = (A×w_A×R_Phil) + (O×w_O×R_Life) + (D×w_D×R_Dyn) + (G×w_G×R_Ident)
```

**Factor-Resonance Mapping:**
| Factor | Weight | × | Resonance |
|--------|--------|---|-----------|
| A (Archetype) | 15% | × | 🧠 R_Philosophy |
| O (Orientation) | 40% | × | 🔥 R_Life |
| D (Dominance) | 20% | × | ⚡ R_Dynamics |
| G (Gender) | 25% | × | 💚 R_Identity |

**Interpretation per dimension:**
| R-Value | Status | Symbol |
|---------|--------|--------|
| ≥ 1.05 | Resonance | ⬆️ |
| 0.97-1.05 | Neutral | ➡️ |
| ≤ 0.97 | Dissonance | ⬇️ |

**Value range:** R varies between 0.9 (minimal resonance) and 1.1 (maximal resonance).

## The Four Dimensions of Compatibility (v3.1)

Multi-dimensional resonance captures relationship compatibility across **four disjoint dimensions**:

| Dimension | Emoji | Question | Needs Source | Count |
|-----------|-------|----------|--------------|-------|
| **Identity** | 💚 | *Who am I, who are you?* | GENDER_NEEDS | 10 |
| **Philosophy** | 🧠 | *How do we want to live relationships?* | ARCHETYPE_NEEDS | 17 |
| **Life** | 🔥 | *What attracts us?* | ORIENTATION_NEEDS | 18 |
| **Dynamics** | ⚡ | *Who leads, who follows?* | DOMINANCE_NEEDS | 18 |

These dimensions are **disjoint** – no overlap, each need is counted only once.

## Legacy: The Three Components (v3.0)

| Component | Factor | Weight |
|-----------|--------|--------|
| **Profile Match** | M | 35% |
| **Logos-Pathos Balance** | B | 35% |
| **NVC Communication** | K | 30% |

### Component 1: Profile Match (M)

Similarity of the **88 NVC needs** between two profiles.

> **Note:** The system distinguishes between two matching levels:
> - **88 NVC Needs** → Emotional Match (M) in the resonance formula
> - **30 baseAttributes** → Lifestyle filter (K.O. criteria like desire for children, living arrangement)

#### Calculation

The match is calculated **weighted by importance**:

```
For each need with weight > 30:
  Similarity = 100 - |Value_Person1 - Value_Person2|
  Weight = (Value_Person1 + Value_Person2) / 2

M = Σ(Similarity × Weight) / Σ(Weight)
```

### Component 2: Logos-Pathos Balance (B)

The relationship between rational structure and emotional dynamics.

```
B = (100 - |Logos - Pathos|) / 100
```

*Example: With A=72% and avg(O,D,G)=65%: B = (100 - 7) / 100 = 0.93*

### Component 3: NVC Communication Factor (K)

**Nonviolent Communication** (NVC) according to Marshall Rosenberg as the key to resonance.

| ME / Partner | high | medium | low |
|--------------|------|--------|-----|
| **high**     | 1.0  | 0.75   | 0.35 |
| **medium**   | 0.75 | 0.5    | 0.2 |
| **low**      | 0.35 | 0.2    | 0.0 |

## Resonance Override: Beyond Conditioning

OSHO taught: **Sexual orientation is conditioning, not nature.** The natural human is beyond labels.

### What is the Resonance Override?

Normally: If orientation is incompatible (e.g., two heterosexual men), this results in 0% orientation score and thus a K.O. criterion.

The **Resonance Override** enables an exception: If two people resonate on a deep level (R ≥ 1.05), this connection can transcend conditioned boundaries.

### Override Effects

| Resonance (R) | Override Effect | O_effective |
|---------------|-----------------|-------------|
| < 1.05 | No Override | 0% (K.O.) |
| 1.05 | Weak Opening | 5% |
| 1.08 | Moderate Opening | 8% |
| 1.10 | Maximum Opening | 10% |

**Formula:** `O_effective = (R - 1.0) × 100`

### Philosophical Reasoning (OSHO)

> *"Love knows no boundaries. When two souls truly resonate, all societal categories are just shadows on the wall."*

Resonance represents the deeper, unconditioned level of connection – beyond what society and upbringing have taught us.

**Note:** This is not a recommendation, but a philosophical possibility that the model depicts. The override shows: Deep resonance can transcend conditioned patterns.

## Neuroscientific Foundations

### The Scientists Behind the Theory

| Researcher | Contribution | Relation to Model |
|------------|--------------|-------------------|
| **Buzsáki & Singer** | Neural Rhythms | Gamma oscillations as basis for "being on the same wavelength" |
| **Friston** | Predictive Coding | Compatibility = low prediction errors in interaction |
| **Kapur** | Aberrant Salience | Flow vs. Psychosis as spectrum of synchronicity |
| **Levitin** | Psychoacoustics | Music as external regulation system for emotions |
| **Aron** | High Sensitivity | Stimulus load management as relationship factor |

## Scientific Sources

- Buzsáki, G. (2006): *Rhythms of the Brain.* Oxford University Press.
- Friston, K. (2010): The free-energy principle. *Nature Reviews Neuroscience.*
- Kapur, S. (2003): Psychosis as Aberrant Salience. *Am J Psychiatry.*
- Levitin, D.J. (2006): *This Is Your Brain on Music.* Dutton.
- Aron, E.N. (1996): *The Highly Sensitive Person.* Broadway Books.

*Complete scientific documentation in: [profiles/research-sources.md](../../profiles/docs/en/research-sources.md) (Section 9)*
