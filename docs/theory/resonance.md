# Resonanz-Theorie im Tiage-Modell

> *Resonanz als Verstärker pro Dimension der Beziehungsqualität*
> **Aktueller Stand: v3.2 (calculationEngine.js)**

---

## Was ist Resonanz?

Resonanz (R1–R4) sind **vier dimensionsspezifische Faktoren** (typ. 0.8–1.3), die jeweils den Basis-Score ihrer zugehörigen Dimension verstärken oder dämpfen — basierend darauf, wie gut die Bedürfnisse beider Personen in dieser Dimension übereinstimmen.

> *"Wahrnehmung basiert auf Schwingungen und Mustern. Resonanz = Synchronität zwischen inneren neuronalen Rhythmen und äußeren Signalen."*

Ein R > 1.0 bedeutet: Die Bedürfnisse beider Menschen passen in dieser Dimension überdurchschnittlich gut — der Beitrag dieser Dimension wird **multipliziert**. Ein R < 1.0 dämpft den Beitrag entsprechend.

**Wichtig:** Es gibt keinen gemeinsamen meanR-Multiplikator. Jede Dimension (O, A, D, G) hat ihren eigenen R-Faktor.

---

## Die Formel (v3.2)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

| Term | Faktor | R-Dimension | Bedürfnis-Basis |
|------|--------|-------------|-----------------|
| `O × wO × R1` | Orientierung | R1 Leben | #B1, #B3, #B7, #B12 |
| `A × wA × R2` | Archetyp | R2 Philosophie | #B2, #B8, #B9, #B14 |
| `D × wD × R3` | Dominanz | R3 Dynamik | #B4, #B5, #B6, #B11 |
| `G × wG × R4` | Geschlecht | R4 Identität | #B10, #B13, #B15, #B16 + Attraktion |

**Score kann > 100 sein** — wenn R-Faktoren > 1.0 oder FFH-Extras-Bonus aktiv.

**Quelle:** `js/synthesis/calculationEngine.js` → `calculateRelationshipQuality()` (Zeile 483)

---

## R-Faktoren kombinieren

Jede Person hat eigene Bedürfniswerte (#B1–#B16). Der R-Faktor wird **pro Dimension aus beiden Personen kombiniert**:

```javascript
combineRFactors(R_ich, R_partner) = (summe × similarity) / 2
  wobei:
    summe     = R_ich + R_partner
    similarity = min(R_ich, R_partner) / max(R_ich, R_partner)
```

Diese Formel belohnt **symmetrische Resonanz**: Wenn beide Partner ähnlich hohe R-Werte haben, fällt das Ergebnis höher aus als wenn ein Partner stark und der andere schwach resoniert.

**Quelle:** `server/logic/needsIntegration.js` → `combineRFactors()`

---

## Visuelle Ebene: Bilder der 16 Grundbedürfnisse

Jedes der 16 Grundbedürfnisse ist mit **3 Bildvarianten** verknüpft — KI-generierte Bilder im Stil des OSHO-Zen-Tarot, die die emotionale Qualität des Bedürfnisses visuell ausdrücken. Jede Variante trägt einen Stimmungsnamen und den assoziierten Tarot-Karten-Namen.

| Bedürfnis | Variante 1 | Variante 2 | Variante 3 |
|-----------|-----------|-----------|-----------|
| #B1 Wohlbefinden | Existenz | Heilung | Stille |
| #B2 Sicherheit | Vertrauen | Schutz | Geborgenheit |
| #B3 Leichtigkeit | Berührung | Schlaf der Sterne | Tanz |
| #B4 Orientierung | Klarheit | Bewusstheit | Ordnung |
| #B5 Wirksamkeit | Wirksamkeit | Kompetenz | Herausforderung |
| #B6 Freiheit | Selbstbestimmung | Unabhängigkeit | Wählen-können |
| #B7 Intensität | Intensität | Freude | Leidenschaft |
| #B8 Entwicklung | Wachstum | Entdecken | Vision |
| #B9 Gemeinschaft | Gemeinschaft | Zugehörigkeit | Zusammenarbeit |
| #B10 Anerkennung | Wertschätzung | Respekt | Bedeutung-haben |
| #B11 Gerechtigkeit | Gemeinsame Werte | Respekt-Unterschiede | Balance |
| #B12 Verbundenheit | Liebe | Intimität | Empathie |
| #B13 Selbsterkenntnis | Einsehen | Beziehungs-Reflexion | Klarheit |
| #B14 Sinn | Sinn | Inspiration | Beitrag-leisten |
| #B15 Integrität | Integrität | Authentizität | Echtheit |
| #B16 Selbstentfaltung | Kreativität | Selbst-Ausdruck | Leben-feiern |

**Gesamtumfang:** 42 Bilder (webp/png) für 16 Bedürfnisse.

**Quellen:**
- `assets/images/beduerfnisse-v2/` — Bilddateien (B001–B226.webp)
- `assets/images/beduerfnisse-v2/image-mapping.json` — Zuordnung #B → Varianten
- `js/synthesis/oshoZenTextGenerator.js` — Verwendet Bilder in der Synthese-Ausgabe

---

## Die 16 Grundbedürfnisse (v4.0)

Die R-Faktoren basieren auf **16 Grundbedürfnissen nach Volker Kiel** (#B1–#B16), die in **4 Stufen** gegliedert sind:

```
Stufe 1 – Passive Basisbedürfnisse:
  #B1 Wohlbefinden    #B2 Sicherheit
  #B3 Leichtigkeit    #B4 Orientierung

Stufe 2 – Handlungs-Bedürfnisse:
  #B5 Wirksamkeit     #B6 Freiheit
  #B7 Intensität      #B8 Entwicklung

Stufe 3 – Soziale Bedürfnisse:
  #B9 Gemeinschaft    #B10 Anerkennung
  #B11 Gerechtigkeit  #B12 Verbundenheit

Stufe 4 – Identitäts-Bedürfnisse:
  #B13 Selbsterkenntnis  #B14 Sinn
  #B15 Integrität        #B16 Selbstentfaltung
```

Jedes Bedürfnis wird mit einem Wert 0–100 bewertet.

**Quelle:** `profiles/data/beduerfnis-katalog.json` (v4.0.0)

---

## Zuordnung: Bedürfnisse → R-Faktoren

Die Zuordnung ist **semantisch** (nach thematischer Nähe zur Dimension), nicht nach Stufen:

| R-Faktor | Emoji | Dimension | Bedürfnisse |
|----------|-------|-----------|-------------|
| **R1 Leben** | 🔥 | Orientierung | #B1 Wohlbefinden, #B3 Leichtigkeit, #B7 Intensität, #B12 Verbundenheit |
| **R2 Philosophie** | 🧠 | Archetyp | #B2 Sicherheit, #B8 Entwicklung, #B9 Gemeinschaft, #B14 Sinn |
| **R3 Dynamik** | ⚡ | Dominanz | #B4 Orientierung, #B5 Wirksamkeit, #B6 Freiheit, #B11 Gerechtigkeit |
| **R4 Identität** | 💚 | Geschlecht | #B10 Anerkennung, #B13 Selbsterkenntnis, #B15 Integrität, #B16 Selbstentfaltung + bidirektionale Attraktion |

**Quelle:** `server/logic/needsIntegration.js` → `DIMENSION_NEED_IDS`

```javascript
const DIMENSION_NEED_IDS = {
    leben:       ['#B1', '#B3', '#B7', '#B12'],
    philosophie: ['#B2', '#B8', '#B9', '#B14'],
    dynamik:     ['#B4', '#B5', '#B6', '#B11'],
    identitaet:  ['#B10', '#B13', '#B15', '#B16']
};
```

---

## R4 Identität — Hybrid-Faktor

**R4 Identität** ist ein Spezialfall: Er wird nicht nur aus Bedürfnissen berechnet, sondern als Hybrid aus Identitäts-Nähe und bidirektionaler Attraktion:

```javascript
R4 = (identityScore × 0.30 + attractionScore × 0.70)²
```

- `identityScore`: Ähnlichkeit der Geschlechts-Identität (Cis/Trans/NB/Fluid) — aus Bedürfnissen #B10, #B13, #B15, #B16
- `attractionScore`: Bidirektionale Attraktion — `ICH→Partner` × `Partner→ICH` (geometrisches Mittel)

R4 entspricht damit direkt dem **Geschlechts-Faktor (G)** in der Hauptformel.

**Quelle:** `js/synthesis/calculationEngine.js` → `calculateR4Hybrid()`

---

## Resonanz-Datenfluss (v3.2)

```
┌─────────────────────────────────────────────────────┐
│         INPUT: person1.needs & person2.needs         │
│         16 Grundbedürfnisse (#B1–#B16), 0–100        │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 1: R-Werte pro Person berechnen          │
├─────────────────────────────────────────────────────┤
│  Pro Dimension: relevante Bedürfnisse →              │
│  Kohärenz-Score → R-Wert (0.8–1.3)                  │
│                                                     │
│  R1 Leben:      #B1, #B3, #B7, #B12                 │
│  R2 Philosophie:#B2, #B8, #B9, #B14                 │
│  R3 Dynamik:    #B4, #B5, #B6, #B11                 │
│  R4 Identität:  #B10, #B13, #B15, #B16 + Attraktion │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 2: R-Werte beider Partner kombinieren    │
├─────────────────────────────────────────────────────┤
│  combineRFactors(R_ich, R_partner)                   │
│  = (R_ich + R_partner) × min/max / 2                │
│                                                     │
│  ┌──────────┬──────────┬──────────┬──────────┐      │
│  │ 🔥 R1    │ 🧠 R2    │ ⚡ R3    │ 💚 R4    │      │
│  │  1.05    │  0.95    │  1.10    │  1.00    │      │
│  └──────────┴──────────┴──────────┴──────────┘      │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 3: Per-Dimension-Multiplikation          │
├─────────────────────────────────────────────────────┤
│  Score = (O×wO×R1) + (A×wA×R2) + (D×wD×R3)         │
│        + (G×wG×R4)                                  │
│                                                     │
│  Jeder Faktor trägt mit seiner eigenen Resonanz bei. │
│  Score kann > 100 sein.                             │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 4: FFH-Extras (additiv)                  │
├─────────────────────────────────────────────────────┤
│  extrasModifier = TiageExtrasModifier.calculate()   │
│  totalScore = score + extrasModifier                │
│                                                     │
│  Score kann > 100 sein.                             │
└─────────────────────────────────────────────────────┘
```

---

## Interpretation pro R-Faktor

| R-Wert | Status | Symbol | Bedeutung |
|--------|--------|--------|-----------|
| ≥ 1.05 | Resonanz | ⬆️ | Überdurchschnittlicher Bedürfnis-Match — verstärkt diese Dimension |
| 0.95–1.05 | Neutral | ➡️ | Ausgeglichene Kompatibilität — keine Verstärkung/Dämpfung |
| ≤ 0.95 | Dissonanz | ⬇️ | Bedürfnis-Mismatch — dämpft den Beitrag dieser Dimension |

---

## GFK-Schwellenwerte (v5.x)

GFK (Gewaltfreie Kommunikation / Bedürfnis-Resonanz-Level):

| Level | Schwellenwert | Bedeutung |
|-------|--------------|-----------|
| **hoch** | ≥ 82 | Tiefe gemeinsame Bedürfnis-Resonanz |
| **mittel** | ≥ 48 | Ausreichende Kompatibilität |
| **niedrig** | < 48 | Grundlegende Bedürfnis-Unterschiede |

**Quelle:** `js/dimensions/gfkMatching.js`

---

## FFH-Extras-Modifikator

**FFH** = Fit / Fucked up / Horny / Fresh — aktueller Zustand beider Personen.

`TiageExtrasModifier.calculate(ichExtras, partnerExtras)` berechnet einen **additiven** Bonus oder Malus:

| Situation | Modifier |
|-----------|---------|
| Beide fit + horny | +8 |
| Partner fit + horny (ICH nicht) | +15 |
| Fucked up ohne fit | −5 |
| Fresh (neu in der Beziehung) | +3 |

Es gibt **16 mögliche Kombinationen** (2⁴ für 4 binäre Flags), die alle in der Slot Machine durchgerechnet werden.

**Quelle:** `js/extras/TiageExtrasModifier.js`

---

## Neurowissenschaftliche Grundlagen

| Forscher | Beitrag | Bezug zum Modell |
|----------|---------|------------------|
| **Buzsáki & Singer** | Neuronale Rhythmen | Gamma-Oszillationen als Basis für "auf einer Wellenlänge sein" |
| **Friston** | Predictive Coding | Kompatibilität = niedrige Vorhersage-Fehler im Umgang miteinander |
| **Kapur** | Aberrant Salience | Flow vs. Psychose als Spektrum der Synchronität |
| **Levitin** | Psychoakustik | Musik als externes Regulierungssystem für Emotionen |
| **Aron** | Hochsensitivität | Reizlast-Management als Beziehungsfaktor |

---

## Wissenschaftliche Quellen

- Buzsáki, G. (2006): *Rhythms of the Brain.* Oxford University Press.
- Friston, K. (2010): The free-energy principle. *Nature Reviews Neuroscience.*
- Kapur, S. (2003): Psychosis as Aberrant Salience. *Am J Psychiatry.*
- Levitin, D.J. (2006): *This Is Your Brain on Music.* Dutton.
- Aron, E.N. (1996): *The Highly Sensitive Person.* Broadway Books.

---

## Weiterführende Dokumentation

- [Score-Berechnung](score-calculation-overview.md) — Gesamtformel und Datenfluss
- [Die 4 Faktoren](factors.md) — A/O/D/G im Detail
- [Pathos & Logos](pathos-logos.md) — Die philosophische Gewichtung
