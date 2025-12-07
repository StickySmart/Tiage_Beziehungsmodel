# Tiage Naming Convention

Diese Dokumentation klärt die Begrifflichkeiten im Tiage-Code und verhindert Verwirrung zwischen ähnlichen Konzepten.

---

## ZENTRALE BEGRIFFSDEFINITION

| Begriff | Bedeutung | Anzahl | Beispiel |
|---------|-----------|--------|----------|
| **Bedürfnis / Profilparameter** | Ein einzelnes messbares Bedürfnis | ~307 | `kinderwunsch`, `naehe`, `vertrauen` |
| **Kategorie / BaseAttribute** | Gruppierung von Bedürfnissen | 18 | `lebensplanung`, `zuneigung`, `dynamik` |

### Visuelle Darstellung

```
KATEGORIE (BaseAttribute): lebensplanung
    └── BEDÜRFNISSE (Profilparameter):
        ├── kinderwunsch
        ├── elternschaft
        ├── fortpflanzung
        ├── familie_gruenden
        ├── verbindlichkeit
        └── ... (weitere)
```

---

## Die 18 Kategorien (BaseAttributes)

### GFK-Basis-Kategorien (11)

| Kategorie | Beschreibung | Farbe |
|-----------|--------------|-------|
| `existenz` | Grundlegende physische Bedürfnisse | #E63946 |
| `sicherheit` | Emotionale und psychische Sicherheit | #F4A261 |
| `zuneigung` | Liebe, Nähe und emotionale Verbindung | #E84393 |
| `verstaendnis` | Gesehen und verstanden werden | #9B5DE5 |
| `freiheit` | Autonomie und Selbstbestimmung | #2A9D8F |
| `teilnahme` | Gemeinschaft und Zugehörigkeit | #06D6A0 |
| `musse` | Erholung, Freude und Genuss | #118AB2 |
| `identitaet` | Selbstverwirklichung und Sinn | #FFD166 |
| `erschaffen` | Kreativität und Lernen | #FF6B6B |
| `verbundenheit` | Tiefe existenzielle Verbindung | #A8DADC |
| `dynamik` | Machtdynamik und bewusster Austausch (BDSM) | #8B5CF6 |

### Lebensthemen-Kategorien (7)

| Kategorie | Beschreibung | Farbe |
|-----------|--------------|-------|
| `lebensplanung` | Kinder, Ehe, Wohnen, Familie | #10B981 |
| `finanzen_karriere` | Geld, Beruf, Work-Life-Balance | #F59E0B |
| `kommunikation_stil` | Gespräche, Emotionen, Konflikte | #3B82F6 |
| `soziales_leben` | Introversion/Extroversion, Freunde, Alleinzeit | #8B5CF6 |
| `intimitaet_beziehung` | Körperliche Nähe, Romantik, Sexualität | #EC4899 |
| `werte_haltung` | Religion, Tradition, Umwelt | #6366F1 |
| `praktisches_leben` | Ordnung, Reisen, Alltag | #14B8A6 |

---

## Scoring-Formel

```
score = Σ((100 - diff) × gewicht) / Σ(gewicht)
```

### Erklärung

| Symbol | Bedeutung |
|--------|-----------|
| `Σ` | Summe über alle **Bedürfnisse** |
| `diff` | Differenz zwischen zwei Bedürfnis-Werten (0-100) |
| `100 - diff` | Übereinstimmung (je kleiner diff, desto höher) |
| `gewicht` | Gewichtung pro **Bedürfnis** |

### Gewichtung

**Default-Formel:**
```
gewicht = (score_A + score_B) / 2 / 100
```

**Logik:** Je wichtiger ein Bedürfnis für BEIDE Personen ist, desto mehr zählt es im Matching.

| Bedürfnis | Person A | Person B | Default-Gewicht | Bedeutung |
|-----------|----------|----------|-----------------|-----------|
| kinderwunsch | 90 | 90 | 0.90 | Beiden wichtig → zählt stark |
| kinderwunsch | 10 | 10 | 0.10 | Beiden unwichtig → zählt wenig |
| kinderwunsch | 90 | 10 | 0.50 | Einer will, einer nicht → mittleres Gewicht, große Differenz! |

**Anpassbar:**
- Jedes Bedürfnis kann individuell gewichtet werden
- Lock-Funktion: Doppelklick = Wert fixieren (🔒)
- Basis-Werte stammen aus Recherche (Rosenberg, Pirsig, Osho)

---

## Quellen der Bedürfnisse

| Quelle | Beitrag |
|--------|---------|
| **GFK (Marshall B. Rosenberg)** | 88 universelle Bedürfnisse |
| **Pirsig** | Static vs. Dynamic Quality |
| **Osho** | Polarität, Yin-Yang-Dynamik |
| **BDSM-Literatur** | Dynamik-Kategorie (Easton, Hardy, Wiseman) |

---

## Im Code

### Bedürfnisse (Profilparameter)

```javascript
// In gfk-beduerfnisse.js
GfkBeduerfnisse.definitionen = {
    kinderwunsch: { label: "Kinderwunsch", kategorie: "lebensplanung" },
    naehe: { label: "Nähe", kategorie: "zuneigung", sekundaer: ["sicherheit", "verbundenheit"] },
    vertrauen: { label: "Vertrauen", kategorie: "verstaendnis", sekundaer: ["sicherheit", "dynamik"] },
    // ... ~307 Bedürfnisse insgesamt
}
```

### Kategorien (BaseAttributes)

```javascript
// In gfk-beduerfnisse.js
GfkBeduerfnisse.kategorien = {
    lebensplanung: {
        name: "Lebensplanung",
        description: "Kinder, Ehe, Wohnen, Familie",
        color: "#10B981",
        beduerfnisse: ["kinderwunsch", "elternschaft", "fortpflanzung", ...]
    },
    zuneigung: {
        name: "Zuneigung",
        description: "Liebe, Nähe und emotionale Verbindung",
        color: "#E84393",
        beduerfnisse: ["waerme", "naehe", "intimitaet", "liebe", ...]
    },
    // ... 18 Kategorien insgesamt
}
```

---

## Person Dimensions (Meta-Eigenschaften)

Meta-Eigenschaften die beschreiben "**Wer ich bin**" und die Bedürfnisse modifizieren.

| Dimension | Optionen | Modifiziert |
|-----------|----------|-------------|
| **Geschlecht** | mann/frau/inter × cis/trans/nonbinaer/fluid/suchend | Kommunikation, Emotionalität |
| **Dominanz** | dominant/submissiv/switch/ausgeglichen | Kontrolle, Hingabe, Nähe |
| **Orientierung** | heterosexuell/homosexuell/bisexuell | Tradition, Offenheit |

---

## Zusammenfassung

```
┌─────────────────────────────────────────────────────────────────┐
│  KATEGORIEN (18 BaseAttributes)                                 │
│  = Gruppierung der Bedürfnisse                                  │
│  z.B.: lebensplanung, zuneigung, dynamik                        │
│                                                                  │
│    └── BEDÜRFNISSE (~307 Profilparameter)                       │
│        = Einzelne messbare Werte                                │
│        z.B.: kinderwunsch, naehe, vertrauen                     │
│                                                                  │
│        └── GEWICHTUNG (pro Bedürfnis)                           │
│            = Aus Recherche, änderbar mit Lock (🔒)              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

| Datum | Änderung |
|-------|----------|
| 2025-12-07 | v3.0: Begriffsdefinition vereinfacht - Bedürfnis = Profilparameter, Kategorie = BaseAttribute |
| 2025-12-07 | Aktualisiert auf ~307 Bedürfnisse in 18 Kategorien |
| 2025-12-06 | v2.0: GFK-Bedürfnisse (needs) ins Profil integriert |
| 2025-12-06 | Initiale Dokumentation erstellt |
