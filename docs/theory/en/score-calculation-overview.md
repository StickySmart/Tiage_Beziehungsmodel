# Score Calculation: Complete Context

> This document shows the complete data flow from input to output.
> **Current version: v3.2 (calculationEngine.js)**

---

## Main Formula (v3.2)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

Each dimension contributes with its own needs resonance (R1–R4). There is no shared meanR multiplier.

| Variable | Description | Range |
|----------|-------------|-------|
| **O** | Orientation compatibility | 0–100 |
| **A** | Archetype philosophy score | 0–100 |
| **D** | Dominance harmony | 0–100 |
| **G** | Gender attraction (= R4) | 0–100 |
| **wO/wA/wD/wG** | Normalized user weights | 0–1 each, sum = 1 |
| **R1** | Resonance Life — needs #B1, #B3, #B7, #B12 | typ. 0.8–1.3 |
| **R2** | Resonance Philosophy — needs #B2, #B8, #B9, #B14 | typ. 0.8–1.3 |
| **R3** | Resonance Dynamics — needs #B4, #B5, #B6, #B11 | typ. 0.8–1.3 |
| **R4** | Resonance Identity — hybrid from needs + attraction | typ. 0.8–1.3 |

**Score can exceed 100** — when R-factors > 1.0 or FFH-Extras bonus is active.

**Source:** `js/synthesis/calculationEngine.js` → `calculateRelationshipQuality()` (line 483)

---

## User-Configurable Weights (AGOD)

The four factors can be weighted by the user (0 = Irrelevant, 1 = Normal, 2 = Important, 3 = Decisive):

```javascript
// Quadratic weighting: 0→0, 1→1, 2→4, 3→9
eO = weight.O², eA = weight.A², eD = weight.D², eG = weight.G²
sum = eO + eA + eD + eG  (if all 0+0+0+0: equal weighting)

wO = eO / sum   // normalized
wA = eA / sum
wD = eD / sum
wG = eG / sum
```

**Default:** all weights = 1 → each factor = 25%

Quadratic scaling creates true dominance at high values:
- Weight 3 on one factor = 9/12 = **75%** of that factor
- Weight 0 = factor is **completely ignored**

**Source:** `js/weights/agodWeights.js` → `AGOD_DEFAULT_WEIGHTS = { O: 1, A: 1, D: 1, G: 1 }`

---

## Data Flow

```
┌─────────────────────────────────────────────────────┐
│               INPUT: ME & Partner                    │
│  { archetype, gender, orientation, dominance,       │
│    needs[#B1–#B16], gender_extras }                 │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 1: Orientation KO Check                     │
│     Source: scoringEngine.js                         │
├─────────────────────────────────────────────────────┤
│  checkPhysicalCompatibility(p1, p2)                  │
│  → Bidirectional check: can p1 attract p2            │
│    AND can p2 attract p1?                           │
│                                                     │
│  Hard-KO (score = 0):                               │
│    → calculationEngine returns directly             │
│      { score: 0, blocked: true }                    │
│    → In Slot Machine: "— / Not compatible"          │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│          STEP 2: Base Factors (0–100)                │
│          Source: scoringEngine.js                    │
├─────────────────────────────────────────────────────┤
│  O = calculateOrientationScore(p1, p2)              │
│      → Geometry check (Hetero×Hetero etc.)           │
│                                                     │
│  A = getArchetypeScore(arch1, arch2)                 │
│      → 8×8 matrix from archetype-matrix.json         │
│                                                     │
│  D = calculateDominanceHarmony(dom1, dom2)           │
│      → Dom×Sub=100, Switch×Switch=90 etc.            │
│                                                     │
│  G = calculateR4Hybrid(p1, p2)                      │
│      → (identityScore×0.30 + attractionScore×0.70)² │
│      → bidirectional attraction                     │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 3: R-Factors from 16 Core Needs            │
│     Source: needsIntegration.js                     │
├─────────────────────────────────────────────────────┤
│  16 core needs (#B1–#B16) in 4 levels:              │
│                                                     │
│  Level 1 – Passive Basic Needs:                     │
│    #B1 Wellbeing    #B2 Security                    │
│    #B3 Ease         #B4 Orientation                 │
│                                                     │
│  Level 2 – Action Needs:                            │
│    #B5 Efficacy     #B6 Freedom                     │
│    #B7 Intensity    #B8 Development                 │
│                                                     │
│  Level 3 – Social Needs:                            │
│    #B9 Community    #B10 Recognition                │
│    #B11 Justice     #B12 Connection                 │
│                                                     │
│  Level 4 – Identity Needs:                          │
│    #B13 Self-Knowledge  #B14 Meaning                │
│    #B15 Integrity       #B16 Self-Expression        │
│                                                     │
│  Semantic mapping to dimensions:                    │
│  → R1 (Life):       #B1, #B3, #B7, #B12            │
│  → R2 (Philosophy): #B2, #B8, #B9, #B14            │
│  → R3 (Dynamics):   #B4, #B5, #B6, #B11            │
│  → R4 (Identity):   #B10, #B13, #B15, #B16         │
│                     + bidirectional attraction       │
│                                                     │
│  Combining both partners:                           │
│  combineRFactors(a, b) = (a+b) × min(a,b)/max(a,b) / 2 │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 4: Main Formula                             │
│     Source: calculationEngine.js line 483            │
├─────────────────────────────────────────────────────┤
│  Score = (O×wO×R1) + (A×wA×R2) + (D×wD×R3)         │
│        + (G×wG×R4)                                  │
│                                                     │
│  (Default wO=wA=wD=wG=0.25 → weighted average of   │
│   R-amplified factor scores)                        │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     STEP 5: FFH-Extras Modifier                      │
│     Source: TiageExtrasModifier.js                  │
├─────────────────────────────────────────────────────┤
│  FFH = Fit / Fucked up / Horny / Fresh              │
│  Combination bonus or malus (additive):             │
│                                                     │
│  totalScore = score + extrasModifier                │
│                                                     │
│  Example: Both Fit+Horny → +8 points               │
│           Fucked up without Fit → −5 points        │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                    OUTPUT                           │
├─────────────────────────────────────────────────────┤
│  score: Math.round(totalScore × 10) / 10           │
│         → One decimal place, can exceed 100         │
│                                                     │
│  breakdown: {                                       │
│    orientation:  O × wO × R1,                      │
│    archetype:    A × wA × R2,                      │
│    dominance:    D × wD × R3,                      │
│    gender:       G × wG × R4                       │
│  }                                                  │
│  → Shows R-amplified contribution of each          │
│    dimension, can exceed 100.                      │
│                                                     │
│  resonance: { R1, R2, R3, R4, GFK, M, B, levels }  │
└─────────────────────────────────────────────────────┘
```

---

## Calculation Example (v3.2)

**Input:**
```
person1: duo / Man-Cis / dominant / heterosexual
         needs: #B1=80, #B3=75, #B7=70, #B12=85, …
person2: solopoly / Woman-Cis / submissive / heterosexual
         FFH: fit=true, horny=true
```

**Step 1: KO Check**
```
Hetero♂ ↔ Hetero♀: bidirectional attraction possible → no KO
```

**Step 2: Base Factors**
```
O = 100  (Hetero♂ + Hetero♀ = compatible)
A = 68   (duo × solopoly from archetype-matrix.json)
D = 100  (dominant + submissive = complementary)
G = 100  (bidirectional attraction = 100)
```

**Step 3: R-Factors (combined, assumed)**
```
R1 = 1.02  (Life: #B1,#B3,#B7,#B12 — both similarly high)
R2 = 0.95  (Philosophy: #B2,#B8,#B9,#B14 — somewhat different)
R3 = 1.05  (Dynamics: #B4,#B5,#B6,#B11 — good match)
R4 = 1.00  (Identity: #B10,#B13,#B15,#B16 + attraction)
```

**Step 4: Main Formula (default weights: all 0.25)**
```
Score = (100×0.25×1.02) + (68×0.25×0.95) + (100×0.25×1.05) + (100×0.25×1.00)
      = 25.5 + 16.15 + 26.25 + 25.0
      = 92.9
```

**Step 5: FFH-Extras**
```
ME: fit=false, partner: fit+horny → extrasModifier = +15
totalScore = 92.9 + 15 = 107.9
```

**Output:**
```
score: 107.9
breakdown: { orientation: 25.5, archetype: 16.15, dominance: 26.25, gender: 25.0 }
```

---

## Base Factor Details

### Archetype (A)

8×8 matrix from `archetype-matrix.json`. Example values:

| Combination | Score |
|-------------|-------|
| duo × duo | 100 |
| duo × duo-flex | ~75 |
| duo × polyamorous | ~40 |
| lat × solopoly | ~80 |

### Orientation (O)

| Combination | Score |
|-------------|-------|
| Hetero♂ + Hetero♀ | 100 |
| Bi + anyone | 100 |
| Pan + anyone | 100 |
| Gay♂ + Gay♂ | 100 |
| Hetero♂ + Hetero♂ | 0 (Hard-KO) |

### Dominance (D)

| Combination | Score |
|-------------|-------|
| Dominant + Submissive | 100 |
| Balanced + Balanced | 95 |
| Switch + Switch | 90 |
| Dominant + Dominant | 55 |

### Gender (G = R4)

`R4 = (identityScore × 0.30 + attractionScore × 0.70)²`
- Attraction bidirectional: ME→Partner × Partner→ME
- Pan/Bi = 100 for all genders

---

## GFK Thresholds

| Level | Threshold | Meaning |
|-------|-----------|---------|
| **high** | ≥ 82 | Deep shared needs resonance |
| **medium** | ≥ 48 | Sufficient compatibility |
| **low** | < 48 | Fundamental differences |

Source: `js/dimensions/gfkMatching.js`

---

## Source Reference

| File | Function |
|------|----------|
| `js/synthesis/calculationEngine.js` | Main calculation `calculateRelationshipQuality()` |
| `js/synthesis/scoringEngine.js` | Base factor functions (O/A/D/G), KO check |
| `js/synthesis/needsIntegration.js` | R-factors from needs, `combineRFactors()` |
| `js/weights/agodWeights.js` | AGOD default weights |
| `js/dimensions/gfkMatching.js` | GFK level calculation |
| `js/extras/TiageExtrasModifier.js` | FFH-Extras modifier |
| `profiles/data/beduerfnis-katalog.json` | 16 core needs #B1–#B16 (v4.0.0) |
| `profiles/data/archetype-matrix.json` | 8×8 archetype compatibility matrix |

---

## Further Documentation

- [Pathos & Logos](pathos-logos.md) — The philosophical weighting
- [Resonance Theory](resonance.md) — R-factors and needs mapping
- [The 4 Factors](factors.md) — A/O/D/G in detail
