# Architektur-Prinzipien: SSOT, KISS & Separation of Concerns

> Lebendes Dokument — beschreibt den aktuellen Zustand der Codebase.
> **Aktueller Stand: v3.2 (März–Mai 2026)**

---

## Kernprinzipien

Das Tiage-Modell folgt drei Architektur-Prinzipien, die nach einer umfangreichen Refaktorierung im März 2026 konsequent umgesetzt wurden:

| Prinzip | Bedeutung | Wichtigste Regel |
|---------|-----------|-----------------|
| **SSOT** | Single Source of Truth | Jede Formel, jede Konstante existiert an genau einer Stelle |
| **KISS** | Keep It Simple, Stupid | Keine vorzeitige Abstraktion — Komplexität nur wo nötig |
| **SoC** | Separation of Concerns | Data / Business Logic / Presentation strikt getrennt |

---

## SSOT — Wer ist die Quelle der Wahrheit?

### Berechnungsformel

**Quelle:** `js/synthesis/calculationEngine.js` (Zeile 483)

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

Keine andere Datei darf diese Formel hardcoden. HTML-Kommentare und Dokumentation dürfen sie zitieren, aber nie als eigene Implementierung enthalten.

### AGOD-Standardgewichte

**Quelle:** `js/weights/agodWeights.js`

```javascript
AGOD_DEFAULT_WEIGHTS = { O: 1, A: 1, D: 1, G: 1 }
```

### Dimension → Bedürfnis-Zuordnung (R-Faktoren)

**Quelle:** `server/logic/needsIntegration.js` → `DIMENSION_NEED_IDS`

```javascript
const DIMENSION_NEED_IDS = {
    leben:       ['#B1', '#B3', '#B7', '#B12'],
    philosophie: ['#B2', '#B8', '#B9', '#B14'],
    dynamik:     ['#B4', '#B5', '#B6', '#B11'],
    identitaet:  ['#B10', '#B13', '#B15', '#B16']
};
```

Diese Zuordnung wird sowohl server-seitig als auch client-seitig (`js/synthesis/needsIntegration.js`) verwendet. **Achtung:** Falls die Zuordnung geändert wird, müssen beide Dateien synchron gehalten werden.

### Bedürfnis-Katalog

**Quelle:** `profiles/data/beduerfnis-katalog.json` (v4.0.0)

16 Grundbedürfnisse #B1–#B16, 4 Stufen. Kein Code definiert Bedürfnisse oder ihre Namen inline.

### Archetyp-Kompatibilitätsmatrix

**Quelle:** `profiles/data/archetype-matrix.json`

8×8-Matrix aller Archetyp-Kombinationen. Scores werden nicht im Code hardcoded.

### Scoring-Funktionen (O/A/D/G)

**Quelle:** `js/synthesis/scoringEngine.js`

- `checkSingleOrientationPair()` — KO-Logik Orientierung
- `getArchetypeScore()` — Archetyp-Score aus Matrix
- `calculateDominanceHarmony()` — Dominanz-Harmonie
- `calculateR4Hybrid()` — Geschlecht/Identität-Score

### R-Faktoren kombinieren

**Quelle:** `server/logic/needsIntegration.js` → `combineRFactors()`

```javascript
combineRFactors(a, b) = (a + b) × min(a,b)/max(a,b) / 2
```

---

## Separation of Concerns — Schichten

```
┌─────────────────────────────────────────────────────────┐
│  PRESENTATION (HTML / UI-Module)                         │
│  js/modals/*.js, css/*.css, *.html                       │
│  → Rendert Ergebnisse, kennt keine Formeln               │
├─────────────────────────────────────────────────────────┤
│  BUSINESS LOGIC (Synthesis-Schicht)                      │
│  js/synthesis/calculationEngine.js                       │
│  js/synthesis/scoringEngine.js                           │
│  js/synthesis/needsIntegration.js                        │
│  → Berechnet, kennt kein HTML                            │
├─────────────────────────────────────────────────────────┤
│  DATA (Profile / Kataloge)                               │
│  profiles/data/beduerfnis-katalog.json                   │
│  profiles/data/archetype-matrix.json                     │
│  js/weights/agodWeights.js                               │
│  → Reine Daten, keine Logik                              │
└─────────────────────────────────────────────────────────┘
```

### Modalfenster

Jedes Modal ist ein eigenständiges Modul in `js/modals/`:

| Datei | Zuständigkeit |
|-------|--------------|
| `syntheseModal.js` | Synthese-Ergebnis-Ansicht |
| `slotMachineModal.js` | Slot Machine (bester Match) |
| `profileReviewModal.js` | Profil-Überprüfung |
| `needsModals.js` | Bedürfnis-Editor und Details |
| `categoryModal.js` | Kategorie-Detailansicht |

---

## KISS — Was nicht abstrahiert wird

Drei gleichartige Zeilen sind besser als eine vorzeitige Abstraktion. Das Modell hat bewusst auf folgende Abstraktionen verzichtet:

- **Keine generische "Factor"-Klasse** — O, A, D, G sind separate Funktionen in `scoringEngine.js`, weil sie fundamentell unterschiedliche Logik haben
- **Keine Konfigurations-Datei für Formeln** — Die Formel ist direkt lesbar in `calculationEngine.js`
- **Keine Middleware-Layer zwischen UI und Logik** — Modals rufen Synthesis-Funktionen direkt auf

---

## Bekannte SSOT-Risiken (aktiv beobachten)

| Risiko | Beschreibung | Maßnahme |
|--------|-------------|----------|
| **Doppelte `DIMENSION_NEED_IDS`** | `server/logic/needsIntegration.js` und `js/synthesis/needsIntegration.js` definieren dieselbe Zuordnung | Bei Änderung: beide Dateien synchron updaten |
| **Katalog-Version** | `beduerfnis-katalog.json` v4.0.0 hat noch keine `kohaerenz.typischeWerte` → `_calculateSingleResonanceV35` fällt auf Legacy zurück | Bei nächstem Katalog-Update: `typischeWerte` pro Archetyp ergänzen |
| **Docs/Code-Drift** | Theory-Docs können veralten | Docs liegen in `docs/theory/` — bei Formeländerungen immer mitpflegen |

---

## Historischer Kontext

Diese Prinzipien wurden nach einer umfangreichen Refaktorierung im **März 2026** etabliert. Vorher war die Hauptformel an mehreren Stellen hardcoded (in `app-main.js`, `constants.js` und in UI-Rendering-Code). Die Extraktion von ~7.000 Zeilen in eigenständige Module (`CalculationEngine`, `SyntheseModal`, `ProfileReviewModal`, `NeedsModals`) schaffte die heutige klare Schichtenarchitektur.

**Vor der Refaktorierung (historisch, nicht mehr gültig):**
- ❌ Hauptformel hardcoded in `app-main.js:15536`
- ❌ Formeln inline in HTML-Generierungscode
- ❌ R-Faktor-Formel dupliziert in `constants.js:84`

**Nach der Refaktorierung (aktueller Stand):**
- ✅ `calculationEngine.js` ist alleinige Formel-Quelle
- ✅ Modals kennen keine Berechnungslogik
- ✅ Daten-Dateien enthalten keine Logik

---

## Weiterführende Dokumentation

- [Score-Berechnung](theory/score-calculation-overview.md) — Datenfluss im Detail
- [Resonanz-Theorie](theory/resonance.md) — R-Faktor-System
- [Tiage-Synthese](theory/tiage-synthesis.md) — Philosophische Grundlage und Entstehungsgeschichte
