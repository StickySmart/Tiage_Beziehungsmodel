# R4 Identitäts-Resonanz

> *Universelle Berechnung basierend auf Similarity-Attraction Theorie*

## Übersicht

R4 (Identität) moduliert den Geschlechtsfaktor (G) und misst die **Resonanz zwischen Geschlechtsidentitäten** der Partner. Die Berechnung basiert auf wissenschaftlich fundierter Forschung zur Identitäts-Kongruenz in Partnerschaften.

## Die Formel

```
Differenz = |O1 - O2|
Ähnlichkeit = 1 - (Differenz / 100)
Basis_R4 = 0.5 + (Ähnlichkeit × 0.5)
Openness_Bonus = (O1 + O2) / 400
R4 = Basis_R4 + Openness_Bonus
```

**Range:** 0.5 (max. Asymmetrie, niedrige Offenheit) bis 1.5 (identisch, hohe Offenheit)

## IDENTITY_OPENNESS Werte

| Identität | Openness (O) | Beschreibung |
|-----------|--------------|--------------|
| cis | 0 | Statische Qualität - Form ist klar |
| trans | 30 | Wandel durchlebt - jetzt gefestigt |
| nonbinaer | 50 | Transzendenz der Dualität |
| fluid | 80 | Dynamische Qualität - ständige Bewegung |
| suchend | 100 | Reine Potentialität - Anfängergeist |

## Vollständige R4-Matrix

| | cis (0) | trans (30) | nonbin (50) | fluid (80) | suchend (100) |
|---|---------|------------|-------------|------------|---------------|
| **cis (0)** | **1.00** | 0.85 | 0.75 | 0.60 | 0.50 |
| **trans (30)** | 0.85 | **1.15** | 1.00 | 0.85 | 0.75 |
| **nonbin (50)** | 0.75 | 1.00 | **1.25** | 1.10 | 1.00 |
| **fluid (80)** | 0.60 | 0.85 | 1.10 | **1.40** | 1.30 |
| **suchend (100)** | 0.50 | 0.75 | 1.00 | 1.30 | **1.50** |

### Beispielrechnungen

**cis + cis:**
```
O1=0, O2=0
Differenz = 0
Ähnlichkeit = 1.0
Basis_R4 = 0.5 + 0.5 = 1.0
Openness_Bonus = 0/400 = 0
R4 = 1.0 (neutral)
```

**trans + trans:**
```
O1=30, O2=30
Differenz = 0
Ähnlichkeit = 1.0
Basis_R4 = 1.0
Openness_Bonus = 60/400 = 0.15
R4 = 1.15 (+15% Boost)
```

**cis + suchend:**
```
O1=0, O2=100
Differenz = 100
Ähnlichkeit = 0
Basis_R4 = 0.5
Openness_Bonus = 100/400 = 0.25
R4 = 0.75 (-25% Dämpfung)
```

**fluid + suchend:**
```
O1=80, O2=100
Differenz = 20
Ähnlichkeit = 0.8
Basis_R4 = 0.5 + 0.4 = 0.9
Openness_Bonus = 180/400 = 0.45
R4 = 1.35 (+35% Boost)
```

## Wissenschaftliche Grundlage

### 1. Similarity-Attraction Effect (Byrne, 1971)

> "Similarity/attraction theory posits that people like and are attracted to others who are similar, rather than dissimilar, to themselves."

**Quelle:** [Encyclopedia of Social Psychology](https://www.encyclopedia.com/social-sciences/applied-and-social-sciences-magazines/similarityattraction-theory)

**Anwendung:** Partner mit ähnlicher Identitäts-Offenheit (gleicher O-Wert) resonieren besser.

### 2. Trans+Trans Beziehungen (PMC 2025)

> "All trans women with trans women main partners reported satisfaction across all relationship domains."

**Quelle:** [Frontiers in Global Women's Health](https://pmc.ncbi.nlm.nih.gov/articles/PMC12183293/)

**Anwendung:** Trans+Trans (identische O-Werte) erhält höchsten Bonus bei dieser Identitätskategorie.

### 3. Openness und Beziehungsqualität (Frontiers Psychology 2017)

> "Couples with similar high openness could experience better relationship quality than those with similar low openness traits."

**Quelle:** [Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00382/full)

**Anwendung:** Der Openness_Bonus belohnt Paare mit hoher gemeinsamer Offenheit.

### 4. Kongruenz in extremen Einstellungen (PNAS Nexus 2025)

> "Relationship satisfaction was also higher when both partners showed congruence in extreme attitudes (either strongly traditional or egalitarian) than when either partner endorsed more neutral attitudes."

**Quelle:** [PNAS Nexus](https://academic.oup.com/pnasnexus/article/4/1/pgae589/7944955)

**Anwendung:** Sowohl cis+cis (beide "traditionell") als auch suchend+suchend (beide "progressiv") erhalten Boost durch Kongruenz.

## Interpretation

| R4-Wert | Status | Effekt auf G-Score |
|---------|--------|-------------------|
| ≥ 1.05 | Resonanz ⬆️ | Boost |
| 0.97 - 1.05 | Neutral ➡️ | Kein Effekt |
| ≤ 0.97 | Dissonanz ⬇️ | Dämpfung |

## Implementierung

**Client:** `js/synthesis/synthesisCalculator.js` (Zeilen 1066-1121)

**Server:** `server/logic/synthesisCalculator.js` (Zeilen 43-94)

**Konstanten:** `IDENTITY_OPENNESS` in `constants.js`

## Änderungshistorie

| Version | Datum | Beschreibung |
|---------|-------|--------------|
| v3.4 | 2025-12-29 | Universelle R4-Berechnung basierend auf IDENTITY_OPENNESS |
| v3.3 | - | R4 basierte auf GESCHLECHT_NEEDS (Authentizität, Akzeptanz, etc.) |

## Siehe auch

- [Resonanz-Theorie](./resonance.md)
- [Score-Calculation Overview](./score-calculation-overview.md)
- [TIAGE Synthese](./tiage-synthesis.md)
