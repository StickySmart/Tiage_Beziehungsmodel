# R1 Orientierungs-Resonanz (Leben)

> *Universelle Berechnung basierend auf Similarity-Attraction Theorie*

## Übersicht

R1 (Leben) moduliert den Orientierungsfaktor (O) und misst die **Resonanz zwischen sexuellen Orientierungen** der Partner. Die Berechnung basiert auf wissenschaftlich fundierter Forschung zur sexuellen Offenheit und Beziehungszufriedenheit.

## Die Formel

```
Differenz = |O1 - O2|
Ähnlichkeit = 1 - (Differenz / 100)
Basis_R1 = 0.5 + (Ähnlichkeit × 0.5)
Openness_Bonus = (O1 + O2) / 400
R1 = Basis_R1 + Openness_Bonus
```

**Range:** 0.5 (max. Asymmetrie, niedrige Offenheit) bis 1.5 (identisch, hohe Offenheit)

## ORIENTATION_OPENNESS Werte

| Orientierung | Openness (O) | Beschreibung |
|--------------|--------------|--------------|
| hetero | 0 | Monosexuell - klare Präferenz |
| homo | 0 | Monosexuell - klare Präferenz |
| hetero-homo | 25 | Primär hetero mit Neugier |
| homo-hetero | 25 | Primär homo mit Neugier |
| hetero-bi | 50 | Aktive Erweiterung Richtung bi |
| homo-bi | 50 | Aktive Erweiterung Richtung bi |
| bi | 75 | Bisexuell gelebt |
| bi-hetero | 90 | Bi mit hetero-Präferenz |
| bi-homo | 90 | Bi mit homo-Präferenz |
| bi-bi | 100 | Voll offen, alle Möglichkeiten |

**Hinweis:** Bisexuell und Pansexuell werden als äquivalent behandelt.

## Vollständige R1-Matrix

| | hetero (0) | homo (0) | hetero-homo (25) | hetero-bi (50) | bi (75) | bi-bi (100) |
|---|---------|----------|------------------|----------------|---------|-------------|
| **hetero (0)** | **1.00** | 1.00 | 0.88 | 0.75 | 0.63 | 0.50 |
| **homo (0)** | 1.00 | **1.00** | 0.88 | 0.75 | 0.63 | 0.50 |
| **hetero-homo (25)** | 0.88 | 0.88 | **1.13** | 1.00 | 0.88 | 0.75 |
| **hetero-bi (50)** | 0.75 | 0.75 | 1.00 | **1.25** | 1.13 | 1.00 |
| **bi (75)** | 0.63 | 0.63 | 0.88 | 1.13 | **1.38** | 1.25 |
| **bi-bi (100)** | 0.50 | 0.50 | 0.75 | 1.00 | 1.25 | **1.50** |

### Beispielrechnungen

**hetero + hetero:**
```
O1=0, O2=0
Differenz = 0
Ähnlichkeit = 1.0
Basis_R1 = 0.5 + 0.5 = 1.0
Openness_Bonus = 0/400 = 0
R1 = 1.0 (neutral)
```

**bi + bi:**
```
O1=75, O2=75
Differenz = 0
Ähnlichkeit = 1.0
Basis_R1 = 1.0
Openness_Bonus = 150/400 = 0.375
R1 = 1.375 (+37.5% Boost)
```

**hetero + bi:**
```
O1=0, O2=75
Differenz = 75
Ähnlichkeit = 0.25
Basis_R1 = 0.5 + 0.125 = 0.625
Openness_Bonus = 75/400 = 0.1875
R1 = 0.8125 (-18.75% Dämpfung)
```

**hetero-bi + bi:**
```
O1=50, O2=75
Differenz = 25
Ähnlichkeit = 0.75
Basis_R1 = 0.5 + 0.375 = 0.875
Openness_Bonus = 125/400 = 0.3125
R1 = 1.1875 (+18.75% Boost)
```

## Wissenschaftliche Grundlage

### 1. Similarity-Attraction Effect (Byrne, 1971)

> "Similarity/attraction theory posits that people like and are attracted to others who are similar, rather than dissimilar, to themselves."

**Quelle:** [Encyclopedia of Social Psychology](https://www.encyclopedia.com/social-sciences/applied-and-social-sciences-magazines/similarityattraction-theory)

**Anwendung:** Partner mit ähnlicher sexueller Offenheit (gleicher O-Wert) resonieren besser.

### 2. Within-Couple Similarity in Sexuality (PMC 2020)

> "Within-couple similarity in sexuality is significantly associated with sexual satisfaction - couples with similar sexual openness levels report higher satisfaction."

**Quelle:** PMC Research on Sexual Compatibility

**Anwendung:** Die Ähnlichkeits-Komponente der Formel belohnt Paare mit ähnlichen Offenheits-Werten.

### 3. Bisexual Identity and Relationship Quality (Journal of Bisexuality)

> "Identity validation and partner acceptance of bisexual identity are critical factors for relationship satisfaction in mixed-orientation relationships."

**Quelle:** Journal of Bisexuality Research

**Anwendung:** Der Openness_Bonus belohnt Paare mit hoher gemeinsamer Offenheit, was die Akzeptanz fördert.

### 4. Sexual Openness and Couples (Frontiers Psychology)

> "Couples where both partners exhibit similar levels of sexual openness demonstrate better communication about sexual needs and higher overall relationship quality."

**Anwendung:** Bi+Bi Paare oder Paare mit gemeinsam hoher Offenheit erhalten den höchsten Bonus.

## Interpretation

| R1-Wert | Status | Effekt auf O-Score |
|---------|--------|-------------------|
| ≥ 1.05 | Resonanz | Boost |
| 0.97 - 1.05 | Neutral | Kein Effekt |
| ≤ 0.97 | Dissonanz | Dämpfung |

## Primär/Sekundär Orientierung

Das System unterstützt komplexe Orientierungs-Profile mit primärer und sekundärer Komponente:

```javascript
orientierung: {
    primary: "heterosexuell",   // Hauptorientierung
    secondary: "bisexuell"      // Neigung/Erweiterung (optional)
}
```

Der Schlüssel wird aus beiden Komponenten gebildet:
- Nur primary: `"hetero"`, `"homo"`, `"bi"`
- Mit secondary: `"hetero-bi"`, `"homo-bi"`, `"bi-hetero"`, etc.

## Implementierung

**Client:** `js/synthesis/synthesisCalculator.js` (Zeilen 1066-1129)

**Server:** `server/logic/synthesisCalculator.js` (Zeilen 42-87)

**Konstanten:** `ORIENTATION_OPENNESS` in `constants.js`

**Helper:** `getOrientationOpennessKey()` - Normalisiert Orientierungs-Objekte zu Lookup-Keys

## Änderungshistorie

| Version | Datum | Beschreibung |
|---------|-------|--------------|
| v3.4 | 2025-12-29 | Universelle R1-Berechnung basierend auf ORIENTATION_OPENNESS |
| v3.3 | - | R1 basierte auf ORIENTIERUNG_NEEDS (sexuelle Häufigkeit, Experimentierfreude, etc.) |

## Siehe auch

- [R4 Identitäts-Resonanz](./r4-identity-resonance.md)
- [Resonanz-Theorie](./resonance.md)
- [Score-Calculation Overview](./score-calculation-overview.md)
- [TIAGE Synthese](./tiage-synthesis.md)
