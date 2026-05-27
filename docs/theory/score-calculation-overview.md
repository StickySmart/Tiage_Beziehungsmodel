# Score-Berechnung: Gesamtzusammenhang

> Dieses Dokument zeigt den kompletten Datenfluss von Input zu Output.
> **Aktueller Stand: v3.2 (calculationEngine.js)**

---

## Hauptformel (v3.2)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

Jede Dimension trägt mit ihrer eigenen Bedürfnis-Resonanz (R1–R4) bei. Es gibt keinen gemeinsamen meanR-Multiplikator.

| Variable | Beschreibung | Bereich |
|----------|-------------|---------|
| **O** | Orientierungs-Kompatibilität | 0–100 |
| **A** | Archetyp-Philosophie-Score | 0–100 |
| **D** | Dominanz-Harmonie | 0–100 |
| **G** | Geschlechts-Attraktion (= R4) | 0–100 |
| **wO/wA/wD/wG** | Normalisierte Benutzer-Gewichte | je 0–1, Summe = 1 |
| **R1** | Resonanz Leben — Bedürfnisse #B1, #B3, #B7, #B12 | typ. 0.8–1.3 |
| **R2** | Resonanz Philosophie — Bedürfnisse #B2, #B8, #B9, #B14 | typ. 0.8–1.3 |
| **R3** | Resonanz Dynamik — Bedürfnisse #B4, #B5, #B6, #B11 | typ. 0.8–1.3 |
| **R4** | Resonanz Identität — Hybrid aus Bedürfnissen + Attraktion | typ. 0.8–1.3 |

**Score kann > 100 sein** — wenn R-Faktoren > 1.0 oder FFH-Extras-Bonus aktiv.

**Quelle:** `js/synthesis/calculationEngine.js` → `calculateRelationshipQuality()` (Zeile 483)

---

## Benutzer-konfigurierbare Gewichte (AGOD)

Die vier Faktoren können vom Benutzer gewichtet werden (0 = Egal, 1 = Normal, 2 = Wichtig, 3 = Entscheidend):

```javascript
// Quadratische Gewichtung: 0→0, 1→1, 2→4, 3→9
eO = gew.O², eA = gew.A², eD = gew.D², eG = gew.G²
sum = eO + eA + eD + eG  (bei 0+0+0+0: Gleichgewichtung)

wO = eO / sum   // normalisiert
wA = eA / sum
wD = eD / sum
wG = eG / sum
```

**Default:** alle Gewichte = 1 → jeder Faktor = 25%

Quadratische Skalierung bewirkt echte Dominanz bei hohen Werten:
- Gewicht 3 bei einem Faktor = 9/12 = **75%** dieses Faktors
- Gewicht 0 = Faktor wird **vollständig ignoriert**

**Quelle:** `js/weights/agodWeights.js` → `AGOD_DEFAULT_WEIGHTS = { O: 1, A: 1, D: 1, G: 1 }`

---

## Datenfluss

```
┌─────────────────────────────────────────────────────┐
│               INPUT: ICH & Partner                   │
│  { archetyp, geschlecht, orientierung, dominanz,    │
│    needs[#B1–#B16], geschlecht_extras }             │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 1: Orientierungs-KO-Check                │
│     Quelle: scoringEngine.js                         │
├─────────────────────────────────────────────────────┤
│  checkPhysicalCompatibility(p1, p2)                  │
│  → Bidirektionale Prüfung: kann p1 p2 attraktiv      │
│    finden UND p2 p1?                                 │
│                                                     │
│  Hard-KO (score = 0):                               │
│    → calculationEngine gibt direkt                  │
│      { score: 0, blocked: true } zurück             │
│    → In der Slot Machine: "— / Nicht kompatibel"    │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│          SCHRITT 2: Basis-Faktoren (0–100)           │
│          Quelle: scoringEngine.js                    │
├─────────────────────────────────────────────────────┤
│  O = calculateOrientationScore(p1, p2)              │
│      → Geometrie-Check (Hetero×Hetero etc.)          │
│                                                     │
│  A = getArchetypeScore(arch1, arch2)                 │
│      → 8×8 Matrix aus archetype-matrix.json          │
│                                                     │
│  D = calculateDominanceHarmony(dom1, dom2)           │
│      → Dom×Sub=100, Switch×Switch=90 etc.            │
│                                                     │
│  G = calculateR4Hybrid(p1, p2)                      │
│      → (identityScore×0.30 + attractionScore×0.70)² │
│      → bidirektionale Attraktion                    │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 3: R-Faktoren aus 16 Grundbedürfnissen  │
│     Quelle: needsIntegration.js                     │
├─────────────────────────────────────────────────────┤
│  16 Grundbedürfnisse (#B1–#B16) in 4 Stufen:        │
│                                                     │
│  Stufe 1 – Passive Basisbedürfnisse:                │
│    #B1 Wohlbefinden  #B2 Sicherheit                 │
│    #B3 Leichtigkeit  #B4 Orientierung               │
│                                                     │
│  Stufe 2 – Handlungs-Bedürfnisse:                   │
│    #B5 Wirksamkeit   #B6 Freiheit                   │
│    #B7 Intensität    #B8 Entwicklung                │
│                                                     │
│  Stufe 3 – Soziale Bedürfnisse:                     │
│    #B9 Gemeinschaft  #B10 Anerkennung               │
│    #B11 Gerechtigkeit #B12 Verbundenheit            │
│                                                     │
│  Stufe 4 – Identitäts-Bedürfnisse:                  │
│    #B13 Selbsterkenntnis  #B14 Sinn                 │
│    #B15 Integrität        #B16 Selbstentfaltung     │
│                                                     │
│  Semantische Zuordnung zu Dimensionen:              │
│  → R1 (Leben):      #B1, #B3, #B7, #B12            │
│  → R2 (Philosophie):#B2, #B8, #B9, #B14            │
│  → R3 (Dynamik):    #B4, #B5, #B6, #B11            │
│  → R4 (Identität):  #B10, #B13, #B15, #B16         │
│                     + bidirektionale Attraktion      │
│                                                     │
│  Kombination beider Partner:                        │
│  combineRFactors(a, b) = (a+b) × min(a,b)/max(a,b) / 2 │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 4: Hauptformel                           │
│     Quelle: calculationEngine.js Zeile 483           │
├─────────────────────────────────────────────────────┤
│  Score = (O×wO×R1) + (A×wA×R2) + (D×wD×R3)         │
│        + (G×wG×R4)                                  │
│                                                     │
│  (Default wO=wA=wD=wG=0.25 → Mittelwert der        │
│   R-verstärkten Faktor-Scores)                      │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│     SCHRITT 5: FFH-Extras-Modifikator               │
│     Quelle: TiageExtrasModifier.js                  │
├─────────────────────────────────────────────────────┤
│  FFH = Fit / Fucked up / Horny / Fresh              │
│  Kombinations-Bonus oder -Malus (additiv):          │
│                                                     │
│  totalScore = score + extrasModifier                │
│                                                     │
│  Beispiel: Beide Fit+Horny → +8 Punkte             │
│            Fuckedup ohne Fit → −5 Punkte           │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                    OUTPUT                           │
├─────────────────────────────────────────────────────┤
│  score: Math.round(totalScore × 10) / 10           │
│         → Eine Dezimalstelle, kann > 100 sein       │
│                                                     │
│  breakdown: {                                       │
│    orientierung: O × wO × R1,                      │
│    archetyp:     A × wA × R2,                      │
│    dominanz:     D × wD × R3,                      │
│    geschlecht:   G × wG × R4                       │
│  }                                                  │
│  → Zeigt den R-verstärkten Beitrag jeder           │
│    Dimension, kann > 100 sein.                     │
│                                                     │
│  resonanz: { R1, R2, R3, R4, GFK, M, B, stufen }   │
└─────────────────────────────────────────────────────┘
```

---

## Rechenbeispiel (v3.2)

**Input:**
```
person1: duo / Mann-Cis / dominant / heterosexuell
         needs: #B1=80, #B3=75, #B7=70, #B12=85, …
person2: solopoly / Frau-Cis / submissiv / heterosexuell
         FFH: fit=true, horny=true
```

**Schritt 1: KO-Check**
```
Hetero♂ ↔ Hetero♀: bidirektionale Anziehung möglich → kein KO
```

**Schritt 2: Basis-Faktoren**
```
O = 100  (Hetero♂ + Hetero♀ = kompatibel)
A = 68   (duo × solopoly aus archetype-matrix.json)
D = 100  (dominant + submissiv = komplementär)
G = 100  (gegenseitige Attraktion bidirektional = 100)
```

**Schritt 3: R-Faktoren (kombiniert, angenommen)**
```
R1 = 1.02  (Leben: #B1,#B3,#B7,#B12 — beide ähnlich hoch)
R2 = 0.95  (Philosophie: #B2,#B8,#B9,#B14 — etwas unterschiedlich)
R3 = 1.05  (Dynamik: #B4,#B5,#B6,#B11 — gute Übereinstimmung)
R4 = 1.00  (Identität: #B10,#B13,#B15,#B16 + Attraktion)
```

**Schritt 4: Hauptformel (Default-Gewichte: alle 0.25)**
```
Score = (100×0.25×1.02) + (68×0.25×0.95) + (100×0.25×1.05) + (100×0.25×1.00)
      = 25.5 + 16.15 + 26.25 + 25.0
      = 92.9
```

**Schritt 5: FFH-Extras**
```
ICH: fit=false, partner: fit+horny → extrasModifier = +15
totalScore = 92.9 + 15 = 107.9
```

**Output:**
```
score: 107.9
breakdown: { orientierung: 25.5, archetyp: 16.15, dominanz: 26.25, geschlecht: 25.0 }
```

---

## Basis-Faktor Details

### Archetyp (A)

8×8-Matrix aus `archetype-matrix.json`. Beispielwerte:

| Kombination | Score |
|-------------|-------|
| duo × duo | 100 |
| duo × duo-flex | ~75 |
| duo × polyamor | ~40 |
| lat × solopoly | ~80 |

### Orientierung (O)

| Kombination | Score |
|-------------|-------|
| Hetero♂ + Hetero♀ | 100 |
| Bi + beliebig | 100 |
| Pan + beliebig | 100 |
| Homo♂ + Homo♂ | 100 |
| Hetero♂ + Hetero♂ | 0 (Hard-KO) |

### Dominanz (D)

| Kombination | Score |
|-------------|-------|
| Dominant + Submissiv | 100 |
| Ausgeglichen + Ausgeglichen | 95 |
| Switch + Switch | 90 |
| Dominant + Dominant | 55 |

### Geschlecht (G = R4)

`R4 = (identityScore × 0.30 + attractionScore × 0.70)²`
- Attraktion bidirektional: ICH→Partner × Partner→ICH
- Pan/Bi = 100 für alle Geschlechter

---

## GFK-Schwellenwerte

| Level | Schwellenwert | Bedeutung |
|-------|--------------|-----------|
| **hoch** | ≥ 82 | Tiefe gemeinsame Bedürfnis-Resonanz |
| **mittel** | ≥ 48 | Ausreichende Kompatibilität |
| **niedrig** | < 48 | Grundlegende Unterschiede |

Quelle: `js/dimensions/gfkMatching.js`

---

## Quellenverzeichnis

| Datei | Funktion |
|-------|----------|
| `js/synthesis/calculationEngine.js` | Hauptberechnung `calculateRelationshipQuality()` |
| `js/synthesis/scoringEngine.js` | Basis-Faktor-Funktionen (O/A/D/G), KO-Check |
| `js/synthesis/needsIntegration.js` | R-Faktoren aus Bedürfnissen, `combineRFactors()` |
| `js/weights/agodWeights.js` | AGOD-Default-Gewichte |
| `js/dimensions/gfkMatching.js` | GFK-Level Berechnung |
| `js/extras/TiageExtrasModifier.js` | FFH-Extras-Modifikator |
| `profiles/data/beduerfnis-katalog.json` | 16 Grundbedürfnisse #B1–#B16 (v4.0.0) |
| `profiles/data/archetype-matrix.json` | 8×8 Archetyp-Kompatibilitätsmatrix |

---

## Weiterführende Dokumentation

- [Pathos & Logos](pathos-logos.md) — Die philosophische Gewichtung
- [Resonanz-Theorie](resonance.md) — R-Faktoren und Bedürfnis-Mapping
- [Die 4 Faktoren](factors.md) — A/O/D/G im Detail
