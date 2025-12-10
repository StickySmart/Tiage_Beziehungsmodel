# Score-Berechnung: Gesamtzusammenhang

> Dieses Dokument zeigt den kompletten Datenfluss von Input zu Output mit allen Quellenangaben.

---

## Hauptformel

```
Q = [(A × 0.15) + (O × 0.40) + (D × 0.20) + (G × 0.25)] × R
```

**Quelle:** `js/synthesis/synthesisCalculator.js:6` und `js/synthesis/constants.js:7`

---

## NEU v3.0: Bedürfnis-Integration pro Faktor

Jeder Faktor (A, O, D, G) kombiniert jetzt Matrix-Score mit Bedürfnis-Match:

```
Faktor = (Matrix × matrixWeight) + (BedürfnisMatch × needsWeight)
```

### Gewichtung pro Faktor

| Faktor | Matrix | Bedürfnisse | Relevante Needs |
|--------|--------|-------------|-----------------|
| **Archetyp** | 60% | 40% | kinderwunsch, langfristige_bindung, nicht_anhaften... |
| **Orientierung** | 50% | 50% | sexuelle_experimentierfreude, biologische_anziehung... |
| **Dominanz** | 50% | 50% | kontrolle_ausueben, hingabe, dynamische_evolution... |
| **Geschlecht** | 60% | 40% | authentizitaet, eigene_wahrheit, akzeptanz... |

### Pirsig/Osho-Bedürfnisse in Faktoren

Die philosophischen Bedürfnisse fließen jetzt DIREKT in die Faktor-Berechnung:

```
Orientierung:
  Matrix (50%): Geometrie-Check (Hetero×Hetero = 100)
  Needs (50%):  sex_als_meditation, hier_und_jetzt_intimitaet, wildheit_und_zartheit...

Dominanz:
  Matrix (50%): Dom×Sub = 100, Dom×Dom = 55
  Needs (50%):  statische_stabilitaet (Pirsig), dynamische_evolution (Pirsig)...
```

**Quelle:** `js/synthesis/needsIntegration.js` und `js/synthesis/constants.js:NEEDS_INTEGRATION`

---

## Variablen-Übersicht

| Variable | Name | Gewicht | Kategorie | Quelle (Formel) | Quelle (Wert) |
|----------|------|---------|-----------|-----------------|---------------|
| **Q** | Qualitätsindex | - | Ergebnis | `synthesisCalculator.js:195` | Berechnet |
| **A** | Archetyp-Score | 15% | LOGOS | `constants.js:24` | `archetypeFactor.js` |
| **O** | Orientierungs-Score | 40% | PATHOS | `constants.js:25` | `orientationFactor.js` |
| **D** | Dominanz-Score | 20% | PATHOS | `constants.js:26` | `dominanceFactor.js` |
| **G** | Geschlechts-Score | 25% | PATHOS | `constants.js:27` | `genderFactor.js` |
| **R** | Resonanz-Koeffizient | ×0.9-1.1 | Meta | `synthesisCalculator.js:747-776` | Berechnet |

---

## Datenfluss-Diagramm

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              INPUT: Person 1 & 2                                │
│                                                                                 │
│   person1: { archetyp, orientierung, dominanz, geschlecht }                     │
│   person2: { archetyp, orientierung, dominanz, geschlecht }                     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SCHRITT 1: FAKTOR-BERECHNUNG                          │
│                           (synthesisCalculator.js:68-92)                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐           │
│   │  ARCHETYP (A)   │    │ ORIENTIERUNG (O) │    │  DOMINANZ (D)    │           │
│   │  archetypeFactor│    │orientationFactor │    │ dominanceFactor  │           │
│   │    .js:27-73    │    │    .js:205-224   │    │    .js:96-122    │           │
│   └────────┬────────┘    └────────┬─────────┘    └────────┬─────────┘           │
│            │                      │                       │                     │
│   ┌────────▼────────┐    ┌────────▼─────────┐    ┌────────▼─────────┐           │
│   │ archetype-      │    │ HARD_KO Prüfung  │    │ DOMINANCE_MATRIX │           │
│   │ matrix.json     │    │ constants.js:    │    │ constants.js:    │           │
│   │ (8×8 Matrix)    │    │ 143-154          │    │ 96-122           │           │
│   └─────────────────┘    └──────────────────┘    └──────────────────┘           │
│                                                                                 │
│   ┌─────────────────┐                                                           │
│   │ GESCHLECHT (G)  │                                                           │
│   │  genderFactor   │                                                           │
│   │   .js:262-323   │                                                           │
│   └────────┬────────┘                                                           │
│            │                                                                    │
│   ┌────────▼────────┐                                                           │
│   │ GENDER Werte    │                                                           │
│   │ constants.js:   │                                                           │
│   │ 201-205         │                                                           │
│   └─────────────────┘                                                           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          SCHRITT 2: LOGOS & PATHOS                              │
│                          (synthesisCalculator.js:95-100)                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   LOGOS = A                                     (Zeile 98)                      │
│                                                                                 │
│   PATHOS = (O + D + G) / 3                      (Zeile 100)                     │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          SCHRITT 3: RESONANZ (R)                                │
│                          (synthesisCalculator.js:760-824)                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ══════════════════════════════════════════════════════════════════════════    │
│   v3.1 MULTI-DIMENSIONALE RESONANZ (wenn Profile verfügbar)                     │
│   ══════════════════════════════════════════════════════════════════════════    │
│                                                                                 │
│   Statt einer globalen R werden 4 dimensionale R-Werte berechnet:               │
│                                                                                 │
│   ┌──────────────┬──────────────┬──────────────┬──────────────┐                 │
│   │ 💚 R_Ident   │ 🧠 R_Phil    │ 🔥 R_Leben   │ ⚡ R_Dyn     │                 │
│   │ GESCHLECHT   │ ARCHETYP     │ ORIENTIERUNG │ DOMINANZ     │                 │
│   │ (10 Needs)   │ (17 Needs)   │ (18 Needs)   │ (18 Needs)   │                 │
│   └──────────────┴──────────────┴──────────────┴──────────────┘                 │
│                                                                                 │
│   Formel pro Dimension:                                                         │
│     R_dim = 0.9 + (Match_dim × 0.2)                                             │
│                                                                                 │
│   Interpretation:                                                               │
│     R ≥ 1.05  → Resonanz ⬆️                                                     │
│     R 0.97-1.05 → Neutral ➡️                                                    │
│     R ≤ 0.97  → Dissonanz ⬇️                                                    │
│                                                                                 │
│   Quelle: constants.js:66-103 (RESONANCE_DIMENSIONAL)                           │
│                                                                                 │
│   ══════════════════════════════════════════════════════════════════════════    │
│   LEGACY v3.0 (Fallback wenn keine Profile)                                     │
│   ══════════════════════════════════════════════════════════════════════════    │
│                                                                                 │
│   R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2                    │
│                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────┐     │
│   │ KOMPONENTE M (Profil-Match)                                           │     │
│   │ Quelle: synthesisCalculator.js:299-361                                │     │
│   │ Berechnung: BeduerfnisModifikatoren.berechneÜbereinstimmung()         │     │
│   │ Daten: profiles/beduerfnis-modifikatoren.js                           │     │
│   │        profiles/gfk-beduerfnisse.js (archetypProfile)                 │     │
│   │ Wertebereich: 0-100                                                   │     │
│   └───────────────────────────────────────────────────────────────────────┘     │
│                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────┐     │
│   │ KOMPONENTE B (Logos-Pathos-Balance)                                   │     │
│   │ Quelle: synthesisCalculator.js:550-552                                │     │
│   │ Formel: B = (100 - |Logos - Pathos|) / 100                            │     │
│   │ Wertebereich: 0.0 - 1.0                                               │     │
│   │                                                                       │     │
│   │ Beispiel:                                                             │     │
│   │   Logos = 75, Pathos = 65                                             │     │
│   │   |75 - 65| = 10                                                      │     │
│   │   B = (100 - 10) / 100 = 0.90                                         │     │
│   └───────────────────────────────────────────────────────────────────────┘     │
│                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────┐     │
│   │ KOMPONENTE K (GFK-Kommunikationsfaktor)                               │     │
│   │ Quelle: synthesisCalculator.js:498-533                                │     │
│   │ Daten: constants.js:61-89 (GFK_MATRIX)                                │     │
│   │                                                                       │     │
│   │ Matrix-Beispiele:                                                     │     │
│   │   "hoch-hoch"     = 1.0   (Optimale Kommunikation)                    │     │
│   │   "mittel-mittel" = 0.5   (Gute Basis)                                │     │
│   │   "niedrig-niedrig" = 0.0 (Destruktive Muster)                        │     │
│   │ Wertebereich: 0.0 - 1.0                                               │     │
│   └───────────────────────────────────────────────────────────────────────┘     │
│                                                                                 │
│   RESONANZ-KONSTANTEN (constants.js:38-47):                                     │
│   - BASE: 0.9          (Minimum Resonanz)                                       │
│   - MAX_BOOST: 0.2     (Maximum zusätzliche Resonanz)                           │
│   - PROFILE_WEIGHT: 0.35                                                        │
│   - BALANCE_WEIGHT: 0.35                                                        │
│   - GFK_WEIGHT: 0.30                                                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          SCHRITT 4: FINALE BERECHNUNG                           │
│                          (synthesisCalculator.js:196-219)                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   baseScore = (A × 0.15) + (O × 0.40) + (D × 0.20) + (G × 0.25)                 │
│                                                                                 │
│   ══════════════════════════════════════════════════════════════════════════    │
│   v3.1 DIMENSIONALE MULTIPLIKATION (wenn Profile verfügbar)                     │
│   ══════════════════════════════════════════════════════════════════════════    │
│                                                                                 │
│   Jeder Faktor wird mit seiner zugehörigen R-Dimension multipliziert:           │
│                                                                                 │
│   finalScore = (A × 0.15 × R_Phil) +                                            │
│                (O × 0.40 × R_Leben) +                                           │
│                (D × 0.20 × R_Dyn) +                                             │
│                (G × 0.25 × R_Ident)                                             │
│                                                                                 │
│   Faktor-Resonanz-Mapping:                                                      │
│   ┌─────────────┬─────────┬────────────────┐                                    │
│   │ Faktor      │ Gewicht │ × Resonanz     │                                    │
│   ├─────────────┼─────────┼────────────────┤                                    │
│   │ A (Archetyp)│  15%    │ 🧠 R_Phil      │                                    │
│   │ O (Orient.) │  40%    │ 🔥 R_Leben     │                                    │
│   │ D (Dominanz)│  20%    │ ⚡ R_Dyn       │                                    │
│   │ G (Geschl.) │  25%    │ 💚 R_Ident     │                                    │
│   └─────────────┴─────────┴────────────────┘                                    │
│                                                                                 │
│   ══════════════════════════════════════════════════════════════════════════    │
│   LEGACY v3.0 (Fallback)                                                        │
│   ══════════════════════════════════════════════════════════════════════════    │
│                                                                                 │
│   finalScore = Math.round(baseScore × R)                                        │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              OUTPUT: Ergebnis-Objekt                            │
│                              (synthesisCalculator.js:126-198)                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   {                                                                             │
│     score: finalScore,              // 0-100 (Zeile 127)                        │
│     baseScore: baseScore,           // Vor Resonanz (Zeile 128)                 │
│                                                                                 │
│     logos: {                        // (Zeile 209-213)                          │
│       score: A,                                                                 │
│       weight: 0.15,                                                             │
│       contribution: A × 0.15                                                    │
│     },                                                                          │
│                                                                                 │
│     pathos: {                       // (Zeile 214-222)                          │
│       score: (O+D+G)/3,                                                         │
│       weight: 0.85,                                                             │
│       contribution: (O×0.40) + (D×0.20) + (G×0.25)                              │
│     },                                                                          │
│                                                                                 │
│     resonanz: {                     // (Zeile 568-575)                          │
│       coefficient: R,                                                           │
│       balance: B,                                                               │
│       profilMatch: M,                                                           │
│       gfk: { value: K, ... }                                                    │
│     },                                                                          │
│                                                                                 │
│     breakdown: {                    // Einzelne Faktoren (Zeile 225-250)        │
│       archetyp:     { score: A, weight: 0.15, category: 'logos' },              │
│       orientierung: { score: O, weight: 0.40, category: 'pathos' },             │
│       dominanz:     { score: D, weight: 0.20, category: 'pathos' },             │
│       geschlecht:   { score: G, weight: 0.25, category: 'pathos' }              │
│     },                                                                          │
│                                                                                 │
│     meta: {                         // (Zeile 178-194)                          │
│       isHardKO: boolean,            // Orientierung geometrisch unmöglich       │
│       isSoftKO: boolean,            // 3+ kritische Bedürfnis-Konflikte         │
│       hasExploration: boolean       // "interessiert" Status aktiv              │
│     },                                                                          │
│                                                                                 │
│     beduerfnisse: { ... }           // Vollständige Bedürfnis-Analyse           │
│   }                                                                             │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Die 4 Faktoren im Detail

### 1. Archetyp (A) - 15% LOGOS

**Quelle:** `js/synthesis/factors/archetypeFactor.js`
**Daten:** `archetype-matrix.json`

```
A = Matrix[archetyp1][archetyp2].overall
```

Die 8×8 Matrix enthält vorberechnete Kompatibilitätswerte (0-100) für alle Archetyp-Kombinationen.

**Beispielwerte:**
| Kombination | Wert | Quelle |
|-------------|------|--------|
| duo × duo | 97 | `archetype-matrix.json` |
| duo × duoflex | 75 | `archetype-matrix.json` |
| duo × polyamor | 51 | `archetype-matrix.json` |

---

### 2. Orientierung (O) - 40% PATHOS

**Quelle:** `js/synthesis/factors/orientationFactor.js`
**Konstanten:** `constants.js:129-135`

```javascript
ORIENTATION: {
    COMPATIBLE: 100,     // Volle Kompatibilität
    EXPLORING: 70,       // Exploration-Phase
    UNLIKELY: 30,        // Unwahrscheinlich
    INCOMPATIBLE: 10,    // Soft K.O.
    HARD_KO: 0           // Geometrisch unmöglich
}
```

**Hard K.O. Fälle** (Quelle: `constants.js:143-154`):
- Hetero♂ + Hetero♂ → O = 0
- Hetero♀ + Hetero♀ → O = 0
- Hetero♂ + Lesbe♀ → O = 0

---

### 3. Dominanz (D) - 20% PATHOS

**Quelle:** `js/synthesis/factors/dominanceFactor.js`
**Matrix:** `constants.js:96-122`

```javascript
DOMINANCE_MATRIX: {
    "dominant-submissiv": 100,   // Komplementär
    "submissiv-dominant": 100,
    "ausgeglichen-ausgeglichen": 95,
    "switch-switch": 90,
    "dominant-dominant": 55,     // Spannung
    "submissiv-submissiv": 55
}
```

---

### 4. Geschlecht (G) - 25% PATHOS

**Quelle:** `js/synthesis/factors/genderFactor.js`
**Konstanten:** `constants.js:201-205`

```javascript
GENDER: {
    FULL_MATCH: 100,
    NON_BINARY_INVOLVED: 80,
    MIXED_ORIENTATION: 75
}
```

---

## Resonanz-Berechnung im Detail

**Hauptformel** (Quelle: `synthesisCalculator.js:557-563`):

```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

### Komponente M: Bedürfnis-Match

**Quelle:** `synthesisCalculator.js:299-361`

```
M = BeduerfnisModifikatoren.berechneÜbereinstimmung(profil1, profil2).score
```

**Datenquellen:**
- `profiles/gfk-beduerfnisse.js` → Basis-Bedürfnisse pro Archetyp
- `profiles/beduerfnis-modifikatoren.js` → Modifikation durch Dominanz/Geschlecht/Orientierung

### Komponente B: Logos-Pathos-Balance

**Quelle:** `synthesisCalculator.js:550-552`

```
differenz = Math.abs(logos - pathos)
B = (100 - differenz) / 100
```

### Komponente K: GFK-Faktor

**Quelle:** `synthesisCalculator.js:498-533`
**Matrix:** `constants.js:61-89`

```
K = GFK_MATRIX[gfk1 + "-" + gfk2]
```

---

## Rechenbeispiel

**Input:**
```javascript
person1: { archetyp: "duo", orientierung: "heterosexuell", dominanz: "dominant", geschlecht: "mann" }
person2: { archetyp: "duoflex", orientierung: "heterosexuell", dominanz: "submissiv", geschlecht: "frau" }
GFK: person1 = "mittel", person2 = "mittel"
```

**Schritt 1: Faktoren**
```
A = 75  (duo_duoflex aus archetype-matrix.json)
O = 100 (Hetero♂ + Hetero♀ = COMPATIBLE)
D = 100 (dominant + submissiv aus DOMINANCE_MATRIX)
G = 100 (Hetero♂ + Hetero♀ = FULL_MATCH)
```

**Schritt 2: Logos & Pathos**
```
logos = A = 75
pathos = (100 + 100 + 100) / 3 = 100
```

**Schritt 3: Resonanz**

### v3.1 Multi-Dimensional (wenn Profile verfügbar)

```
Bedürfnis-Matches pro Dimension (angenommen):
  Match_Phil   (Archetyp-Needs)     = 0.70  → R_Phil  = 0.9 + (0.70 × 0.2) = 1.04 ➡️
  Match_Leben  (Orientierung-Needs) = 0.85  → R_Leben = 0.9 + (0.85 × 0.2) = 1.07 ⬆️
  Match_Dyn    (Dominanz-Needs)     = 0.90  → R_Dyn   = 0.9 + (0.90 × 0.2) = 1.08 ⬆️
  Match_Ident  (Geschlecht-Needs)   = 0.80  → R_Ident = 0.9 + (0.80 × 0.2) = 1.06 ⬆️
```

### Legacy v3.0 (Fallback)

```
M = 75  (angenommen: Bedürfnis-Match)
B = (100 - |75 - 100|) / 100 = 0.75
K = 0.5 (mittel-mittel aus GFK_MATRIX)

R = 0.9 + [(75/100 × 0.35) + (0.75 × 0.35) + (0.5 × 0.30)] × 0.2
R = 0.9 + [0.2625 + 0.2625 + 0.15] × 0.2
R = 0.9 + 0.675 × 0.2
R = 0.9 + 0.135
R = 1.035
```

**Schritt 4: Finale Berechnung**

### v3.1 Dimensionale Multiplikation

```
finalScore = (A × 0.15 × R_Phil)  + (O × 0.40 × R_Leben) +
             (D × 0.20 × R_Dyn)   + (G × 0.25 × R_Ident)

finalScore = (75 × 0.15 × 1.04)  + (100 × 0.40 × 1.07) +
             (100 × 0.20 × 1.08) + (100 × 0.25 × 1.06)

finalScore = 11.7 + 42.8 + 21.6 + 26.5 = 102.6 → gerundet: 103
```

### Legacy v3.0 (zum Vergleich)

```
baseScore = (75 × 0.15) + (100 × 0.40) + (100 × 0.20) + (100 × 0.25)
baseScore = 11.25 + 40 + 20 + 25 = 96.25

finalScore = Math.round(96.25 × 1.035) = 100
```

> **Hinweis:** v3.1 kann durch dimensionale Resonanz-Unterschiede
> andere Ergebnisse als die Legacy-Berechnung liefern.

---

## Profil-Komposition (A-F Kategorie-Scores)

Die 864 psychologischen Profile werden **on-demand komponiert** und erhalten individuelle Kategorie-Scores basierend auf ihrer Kombination.

### Kompositions-Formel

```
Score[Kategorie] = baseScores[archetyp][Kategorie]
                 + genderModifiers[gender].categoryModifiers[Kategorie]
                 + dominanceModifiers[dominanz].categoryModifiers[Kategorie]
                 + orientationModifiers[orientierung].categoryModifiers[Kategorie]
```

**Quelle:** `profiles/profile-store.js`

### Kategorie-Dimensionen

| Kategorie | Name | Beschreibung |
|-----------|------|--------------|
| **A** | Beziehungsphilosophie | Grundlegende Einstellung zu Beziehungen |
| **B** | Werte-Alignment | Übereinstimmung traditioneller/progressiver Werte |
| **C** | Nähe-Distanz | Bedürfnis nach Intimität vs. Freiraum |
| **D** | Autonomie | Unabhängigkeit in der Beziehung |
| **E** | Kommunikation | Emotionale Offenheit und Ausdrucksfähigkeit |
| **F** | Soziale Kompatibilität | Passung zu gesellschaftlichen Normen |

### Basis-Scores (nach Archetyp)

| Archetyp | A | B | C | D | E | F |
|----------|---|---|---|---|---|---|
| Single | 66.7 | 66.8 | 62.2 | 77.5 | 68.0 | 63.8 |
| Duo | 55.0 | 64.3 | 68.7 | 49.7 | 66.3 | 62.2 |
| Duo-Flex | 73.7 | 73.8 | 69.5 | 71.5 | 72.7 | 66.5 |
| Solopoly | 67.5 | 69.0 | 58.7 | 74.5 | 73.3 | 50.0 |
| Polyamor | 68.3 | 72.0 | 65.5 | 70.3 | 78.7 | 50.7 |
| RA | 72.0 | 68.0 | 62.0 | 85.0 | 72.0 | 42.0 |
| LAT | 68.0 | 72.0 | 65.0 | 78.0 | 72.0 | 68.0 |
| Aromantisch | 65.0 | 68.0 | 62.0 | 78.0 | 68.0 | 48.0 |

### Modifier-Beispiele

**Gender-Modifier (Mann-Cis):**
```javascript
{ A: 0, B: +2, C: -2, D: +3, E: -4, F: +3 }
```

**Dominanz-Modifier (Dominant):**
```javascript
{ A: 0, B: +1, C: -3, D: +5, E: -2, F: +2 }
```

**Orientierungs-Modifier (Heterosexuell):**
```javascript
{ A: -2, B: +3, C: +2, D: -3, E: -2, F: +5 }
```

### Rechenbeispiel

**Profil:** Single + Mann-Cis + Dominant + Heterosexuell

```
A: 66.7 + 0 + 0 + (-2) = 64.7
B: 66.8 + 2 + 1 + 3 = 72.8
C: 62.2 + (-2) + (-3) + 2 = 59.2
D: 77.5 + 3 + 5 + (-3) = 82.5
E: 68.0 + (-4) + (-2) + (-2) = 60.0
F: 63.8 + 3 + 2 + 5 = 73.8
```

### Score-Grenzen

Alle Werte werden auf den Bereich **0-100** begrenzt:
```javascript
scores[cat] = Math.max(0, Math.min(100, scores[cat] + modifier))
```

---

## Quellenverzeichnis

| Datei | Funktion |
|-------|----------|
| `js/synthesis/constants.js` | Alle Gewichte, Matrizen, Konstanten |
| `js/synthesis/synthesisCalculator.js` | Hauptberechnung, Resonanz |
| `js/synthesis/factors/archetypeFactor.js` | Archetyp-Score (A) |
| `js/synthesis/factors/orientationFactor.js` | Orientierungs-Score (O) |
| `js/synthesis/factors/dominanceFactor.js` | Dominanz-Score (D) |
| `js/synthesis/factors/genderFactor.js` | Geschlechts-Score (G) |
| `archetype-matrix.json` | 8×8 Archetyp-Kompatibilitätsmatrix |
| `profiles/gfk-beduerfnisse.js` | Basis-Bedürfnisse pro Archetyp |
| `profiles/beduerfnis-modifikatoren.js` | Bedürfnis-Modifikatoren |

---

## Weiterführende Dokumentation

- [Pathos & Logos](pathos-logos.md) - Die 25:75 Gewichtung
- [Resonanz-Theorie](resonance.md) - Meta-Dimension
- [Beziehungsmodell](../../beziehungsmodell.md) - Vollständige Modellbeschreibung
