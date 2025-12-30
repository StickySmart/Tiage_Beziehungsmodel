# R4 Identitäts-Resonanz

> *Hybrid-Berechnung: Empirisch fundierte Ähnlichkeit + Pirsig-inspirierte Openness*

## Übersicht

R4 (Identität) moduliert den Geschlechtsfaktor (G) und misst die **Resonanz zwischen Geschlechtsidentitäten** der Partner. Die Berechnung kombiniert zwei Ansätze:

1. **EMPIRISCH**: Ähnlichkeits-Bonus bei gleicher Identität (T4T-Effekt)
2. **PIRSIG**: Openness-Bonus basierend auf "Dynamischer Qualität"

## Die Hybrid-Formel (v3.5)

### Individuelle R4 (ICH / PARTNER)

```
R4 = Archetypen-Vergleich (Bedürfnisse vs archetyp-typisch)

Formel:
  avgDiff = Σ|dein_wert - archetyp_typisch| / count
  Übereinstimmung = 1 - (avgDiff / 100)
  R4 = 0.5 + (Übereinstimmung × 1.0)
```

### Paarungs-R4

```
BASIS = R4_ich × R4_partner

Ähnlichkeits-Faktor = 1.3 (wenn gleiche Identität) oder 1.0
Openness-Bonus = (O1 + O2) / 200

R4 = BASIS + (Ähnlichkeits-Faktor × Openness-Bonus)
```

## IDENTITY_OPENNESS Werte (Pirsig-inspiriert)

| Identität | Openness (O) | Beschreibung |
|-----------|--------------|--------------|
| cis | 0 | Statische Qualität - Form ist klar |
| trans | 30 | Wandel durchlebt - jetzt gefestigt |
| nonbinaer | 50 | Transzendenz der Dualität |
| fluid | 80 | Dynamische Qualität - ständige Bewegung |
| suchend | 100 | Reine Potentialität - Anfängergeist |

**Hinweis:** Diese Werte basieren auf Pirsigs Philosophie der "Statischen vs. Dynamischen Qualität", nicht auf empirischer Forschung. Sie drücken keine Wertung aus, sondern beschreiben verschiedene Qualitäten der Identitätserfahrung.

## Konstanten

```javascript
IDENTITY_RESONANCE: {
    SIMILARITY_FACTOR_MATCH: 1.3,  // Faktor wenn gleiche Identität
    SIMILARITY_FACTOR_DIFF: 1.0,   // Faktor wenn unterschiedliche Identität
    OPENNESS_DIVISOR: 200          // Teiler für Openness-Normalisierung (0-1)
}
```

## Vollständige R4-Matrix (mit BASIS = 1.0)

| | cis (0) | trans (30) | nonbin (50) | fluid (80) | suchend (100) |
|---|---------|------------|-------------|------------|---------------|
| **cis** | **1.00** | 1.15 | 1.25 | 1.40 | 1.50 |
| **trans** | 1.15 | **1.39** | 1.40 | 1.55 | 1.65 |
| **nonbin** | 1.25 | 1.40 | **1.65** | 1.65 | 1.75 |
| **fluid** | 1.40 | 1.55 | 1.65 | **2.04** | 1.90 |
| **suchend** | 1.50 | 1.65 | 1.75 | 1.90 | **2.30** |

**Diagonal = gleiche Identität (Ähnlichkeits-Bonus ×1.3)**

## Beispielrechnungen

### cis + cis (gleiche Identität, niedrige Openness)

```
BASIS = 1.0
Gleiche Identität: Ja → Ähnlichkeits-Faktor = 1.3
Openness-Bonus = (0 + 0) / 200 = 0.0
Hybrid-Bonus = 1.3 × 0.0 = 0.0
R4 = 1.0 + 0.0 = 1.00
```

### suchend + suchend (gleiche Identität, hohe Openness)

```
BASIS = 1.0
Gleiche Identität: Ja → Ähnlichkeits-Faktor = 1.3
Openness-Bonus = (100 + 100) / 200 = 1.0
Hybrid-Bonus = 1.3 × 1.0 = 1.3
R4 = 1.0 + 1.3 = 2.30
```

### cis + suchend (unterschiedliche Identität)

```
BASIS = 1.0
Gleiche Identität: Nein → Ähnlichkeits-Faktor = 1.0
Openness-Bonus = (0 + 100) / 200 = 0.5
Hybrid-Bonus = 1.0 × 0.5 = 0.5
R4 = 1.0 + 0.5 = 1.50
```

### fluid + fluid (gleiche Identität, mittlere-hohe Openness)

```
BASIS = 1.0
Gleiche Identität: Ja → Ähnlichkeits-Faktor = 1.3
Openness-Bonus = (80 + 80) / 200 = 0.8
Hybrid-Bonus = 1.3 × 0.8 = 1.04
R4 = 1.0 + 1.04 = 2.04
```

## Die Logik in Worten

> "Der Openness-Bonus wird VERSTÄRKT wenn die Identitäten gleich sind"

- **Gleiche Identität + hohe Openness** = maximaler Boost
- **Gleiche Identität + niedrige Openness** = kleiner/kein Boost
- **Unterschiedliche Identität** = Openness wirkt, aber weniger stark

## Wissenschaftliche Grundlage

### 1. Similarity-Attraction Effect (Byrne, 1971)

> "Similarity/attraction theory posits that people like and are attracted to others who are similar, rather than dissimilar, to themselves."

**Anwendung:** Partner mit gleicher Identität (T4T) resonieren besser.

### 2. T4T-Beziehungen (Partner Gender Affirmation)

Forschung zeigt, dass transgender und nonbinary (TNB) Personen in Beziehungen mit anderen TNB-Partnern höhere Zufriedenheit berichten, teilweise durch bessere Partner-Affirmation der Geschlechtsidentität.

**Quelle:** [PMC - Identity Needs in Relationships Framework](https://pmc.ncbi.nlm.nih.gov/articles/PMC11086993/)

### 3. Openness und Beziehungsqualität (Frontiers Psychology 2017)

> "Couples with similar high openness could experience better relationship quality than those with similar low openness traits."

**Anwendung:** Der Openness-Bonus belohnt Paare mit hoher gemeinsamer Offenheit.

### 4. Philosophische Grundlage (Pirsig)

Die Openness-Werte basieren auf Robert Pirsigs "Metaphysik der Qualität":
- **Statische Qualität** = gefestigt, klar, stabil (cis)
- **Dynamische Qualität** = offen, suchend, beweglich (suchend)

Dies ist eine philosophische Interpretation, keine empirische Hierarchie.

## Implementierung

**Client:** `js/synthesis/synthesisCalculator.js` (Zeilen 1131-1204)

**Server:** `server/logic/synthesisCalculator.js` (Zeilen 89-157)

**Konstanten:** `IDENTITY_OPENNESS` und `IDENTITY_RESONANCE` in `constants.js`

## Änderungshistorie

| Version | Datum | Beschreibung |
|---------|-------|--------------|
| v3.5 | 2025-12-30 | Hybrid-Formel: Ähnlichkeit (empirisch) + Openness (Pirsig) |
| v3.4 | 2025-12-29 | Universelle R4-Berechnung basierend auf IDENTITY_OPENNESS |
| v3.3 | - | R4 basierte auf GESCHLECHT_NEEDS (Authentizität, Akzeptanz, etc.) |

## Siehe auch

- [Pirsig-Philosophie](./pirsig.md)
- [Resonanz-Theorie](./resonance.md)
- [Score-Calculation Overview](./score-calculation-overview.md)
