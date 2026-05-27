# Die 4 Qualitätsfaktoren

> *Wie das Tiage-Modell Beziehungsqualität berechnet*
> **Aktueller Stand: v3.2 (calculationEngine.js)**

---

## Übersicht

Das Tiage-Beziehungsmodell verwendet **4 Hauptfaktoren** zur Berechnung der Beziehungsqualität:

| Faktor | Symbol | Beschreibung |
|--------|--------|--------------|
| **Archetyp** | A | Fundamentale Beziehungsphilosophie (0–100) |
| **Orientierung** | O | Sexuelle Orientierung und Anziehungsrichtung (0–100) |
| **Dominanz** | D | Energetische Dynamik und Machtverhältnis (0–100) |
| **Geschlecht** | G | Gender-Chemie und Identitäts-Attraktion (0–100) |

Jeder Faktor wird mit seinem eigenen **Resonanz-Faktor (R)** multipliziert, bevor die gewichteten Terme aufsummiert werden.

---

## Gesamtformel (v3.2)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

| Term | Bedeutung |
|------|-----------|
| `O × wO × R1` | Orientierung × Benutzergewicht × Resonanz Leben |
| `A × wA × R2` | Archetyp × Benutzergewicht × Resonanz Philosophie |
| `D × wD × R3` | Dominanz × Benutzergewicht × Resonanz Dynamik |
| `G × wG × R4` | Geschlecht × Benutzergewicht × Resonanz Identität |

Jeder Faktor trägt mit seiner **eigenen Bedürfnis-Resonanz** bei — es gibt keinen gemeinsamen meanR-Multiplikator.

**Score kann > 100 sein** — wenn R-Faktoren > 1.0 oder FFH-Extras-Bonus aktiv.

**Quellen:**
- `js/synthesis/calculationEngine.js` → `calculateRelationshipQuality()` (Zeile 483)
- `js/synthesis/scoringEngine.js` → Einzelfunktionen A/O/D/G
- `js/weights/agodWeights.js` → `AGOD_DEFAULT_WEIGHTS`

---

## Benutzer-konfigurierbare Gewichte (AGOD)

Jeder der 4 Faktoren kann vom Benutzer priorisiert werden (0 = Egal, 1 = Normal, 2 = Wichtig, 3 = Entscheidend):

```javascript
// Quadratische Gewichtung: 0→0, 1→1, 2→4, 3→9
eA = gew.A²,  eO = gew.O²,  eD = gew.D²,  eG = gew.G²
sum = eA + eO + eD + eG  // bei 0+0+0+0: Gleichgewichtung (alle 25%)

wA = eA / sum   // normalisiert auf 0–1
wO = eO / sum
wD = eD / sum
wG = eG / sum
```

**Default:** alle Gewichte = 1 → jeder Faktor trägt 25% bei.

Quadratische Skalierung bewirkt echte Dominanz bei hohen Werten:
- Gewicht 3 bei einem Faktor = 9/12 = **75%** dieses Faktors
- Gewicht 0 = Faktor wird **vollständig ignoriert**

**Quelle:** `js/weights/agodWeights.js` → `AGOD_DEFAULT_WEIGHTS = { O: 1, A: 1, D: 1, G: 1 }`

---

## 1. Archetyp-Faktor (A)

Beschreibt die fundamentale Beziehungsphilosophie — wie zwei Menschen zusammenleben möchten.

### Die 8 Archetypen

| Archetyp | Beschreibung |
|----------|-------------|
| **Single** | Autonomes Leben ohne Primärbeziehung |
| **Duo** | Klassische monogame Zweierbeziehung mit Exklusivität |
| **Duo-Flex** | Primärbeziehung mit vereinbarten Öffnungen |
| **Solopoly** | Mehrere gleichwertige Beziehungen mit Fokus auf Autonomie |
| **Polyamor** | Tiefe emotionale Bindungen zu mehreren Partnern |
| **RA** | Relationship Anarchist — Ablehnung aller Beziehungs-Hierarchien |
| **LAT** | Living Apart Together — feste Partnerschaft ohne Zusammenleben |
| **Aromantisch** | Fokus auf platonische Verbindungen ohne romantische Komponente |

### Berechnung

Die Archetyp-Kompatibilität wird über eine **8×8-Matrix** aus `archetype-matrix.json` als einzelner Score (0–100) ermittelt.

| Kombination | Score |
|-------------|-------|
| Duo × Duo | 100 |
| Duo × Duo-Flex | ~75 |
| LAT × Solopoly | ~80 |
| Duo × Polyamor | ~40 |

In der Formel wirkt **R2 (Resonanz Philosophie)** als Verstärker des Archetyp-Scores.

**Quelle:** `js/synthesis/scoringEngine.js` → `getArchetypeScore(arch1, arch2)`

---

## 2. Orientierungs-Faktor (O)

Definiert die sexuelle Orientierung und damit die grundlegende Anziehungsrichtung.

### Die Orientierungen

| Orientierung | Beschreibung |
|--------------|-------------|
| **Heterosexuell** | Anziehung zum anderen Geschlecht |
| **Homosexuell** | Anziehung zum gleichen Geschlecht |
| **Bisexuell** | Anziehung zu mehreren Geschlechtern |
| **Pansexuell** | Anziehung unabhängig von Geschlecht/Identität |
| **Queer** | Jenseits binärer Kategorien |

### Kompatibilitäts-Logik

Die Prüfung ist **bidirektional**: Beide Personen müssen füreinander Anziehung empfinden können.

```javascript
person1CanBeAttracted = canBeAttractedTo(type1, gender1, gender2)
person2CanBeAttracted = canBeAttractedTo(type2, gender2, gender1)
if (person1CanBeAttracted && person2CanBeAttracted) → 'möglich'
else → 'unmöglich'  // Hard-KO: score = 0
```

| Kombination | Score |
|-------------|-------|
| Hetero♂ + Hetero♀ | 100 |
| Homo♂ + Homo♂ | 100 |
| Bi/Pan + beliebig | 100 |
| Hetero♂ + Hetero♂ | 0 (Hard-KO) |
| Hetero♀ + Hetero♀ | 0 (Hard-KO) |

**Hard-KO (score = 0):** Wenn O = 0, wird kein AGOD-Score berechnet — `calculationEngine.js` gibt direkt `{ score: 0, blocked: true }` zurück.

**Anzeige bei Hard-KO:** In der Geschlecht-Aufteilung der Slot Machine zeigt ein `score = 0` den Eintrag als **"— / Nicht kompatibel (KO)"** statt als Ergebnis mit Übernehmen-Schaltfläche.

In der Formel wirkt **R1 (Resonanz Leben)** als Verstärker des Orientierungs-Scores.

**Quelle:** `js/synthesis/scoringEngine.js` → `checkSingleOrientationPair()`

---

## 3. Dominanz-Faktor (D)

Energetische Dynamik und Machtverhältnis zwischen Partnern.

### Die 4 Dominanz-Typen

| Typ | Beschreibung |
|-----|-------------|
| **Dominant** | Assertiv, führend, selbstsicher, direktiv |
| **Submissiv** | Empfänglich, unterstützend, adaptiv, nachfolgend |
| **Switch** | Kann beide Rollen einnehmen, je nach Situation |
| **Ausgeglichen** | Gleichgewicht zwischen Aktion und Rezeptivität |

### Harmonietypen

| Kombination | Score | Erklärung |
|-------------|-------|-----------|
| Dominant + Submissiv | 100 | Komplementäre Polarität |
| Ausgeglichen + Ausgeglichen | 95 | Tao-Balance |
| Switch + Switch | 90 | Flexible Harmonie |
| Dominant + Dominant | 55 | Gleiche Pole |
| Submissiv + Submissiv | 55 | Gleiche Pole |

In der Formel wirkt **R3 (Resonanz Dynamik)** als Verstärker des Dominanz-Scores.

**Quelle:** `js/synthesis/scoringEngine.js` → `calculateDominanceHarmony(dom1, dom2)`

---

## 4. Geschlechts-Faktor (G)

Feinjustierung der Gender-Chemie: Identitäts-Ähnlichkeit und bidirektionale Attraktion.

### Berechnung (R4-Hybrid)

```javascript
G = (identityScore × 0.30 + attractionScore × 0.70)²
```

- **identityScore:** Ähnlichkeit der Geschlechts-Identität (Cis/Trans/NB/Fluid)
- **attractionScore:** Bidirektionale Attraktion — ICH→Partner × Partner→ICH (geometrisches Mittel)

Der G-Faktor entspricht zugleich **R4 (Resonanz Identität)** — er ist ein Hybrid aus Bedürfnis-Nähe (Identitäts-Bedürfnisse #B10, #B13, #B15, #B16) und direkter Attraktion.

### Geschlecht-Dimensionen

**Körper (Primary):** Mann, Frau, Inter

**Identität (Secondary):** Cis, Trans, Nonbinär, Fluid, Suchend

**Attraktion:** Pan/Bi = 100 für alle Geschlechter.

**Quelle:** `js/synthesis/scoringEngine.js` → `calculateGenderAttraction(p1, p2)`

---

## Ergebnis-Interpretation

| Score | Bewertung | Bedeutung |
|-------|-----------|-----------|
| **> 100** | Außergewöhnlich | Hohe Bedürfnis-Resonanz + FFH-Boost aktiv |
| **80–100** | Sehr gut | Starke Basis, R-Faktoren verstärken |
| **60–79** | Gut | Solide Kompatibilität |
| **40–59** | Mittel | Erfordert bewusste Arbeit |
| **< 40** | Herausfordernd | Fundamentale Unterschiede |

*Der Qualitätsindex ist ein Orientierungswert. Echte Beziehungen hängen von vielen weiteren Faktoren ab.*

---

## Weiterführende Dokumentation

- [Score-Berechnung](score-calculation-overview.md) — Gesamtformel und Datenfluss
- [Resonanz-Theorie](resonance.md) — R-Faktoren und Bedürfnis-Mapping
- [Pathos & Logos](pathos-logos.md) — Die philosophische Gewichtung
