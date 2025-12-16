# R-Werte Sperrung: Vergleichsfunktion

## Übersicht

Wenn R-Werte (R1-R4) manuell gesperrt werden, können sie von den berechneten Werten abweichen. Dies hat direkte Auswirkungen auf das Endergebnis der Synthese-Berechnung.

Die neue Vergleichsfunktion zeigt automatisch Warnungen an und bietet detaillierte Analysen der Score-Auswirkungen.

## Funktionen

### 1. Automatische Warnung bei gesperrten Abweichungen

Wenn ein R-Wert gesperrt ist und vom berechneten Wert abweicht, wird automatisch eine Warnung angezeigt:

```javascript
// Wird automatisch in setCalculatedValues() aufgerufen
showLockedDifferenceWarning(lockedDifferences)
```

**Anzeigt:**
- 🔒 Gesperrter Wert
- 📊 Berechneter Wert
- Δ Unterschied (absolut und prozentual)
- Buttons zum Entsperren

### 2. Einzelnes R entsperren

```javascript
ResonanzCard.unlockAndApply('R2')
```

Entsperrt einen einzelnen Faktor und übernimmt den berechneten Wert.

### 3. Alle R-Werte entsperren

```javascript
ResonanzCard.unlockAllAndApply()
```

Entsperrt alle gesperrten Faktoren und übernimmt die berechneten Werte.

### 4. Detaillierter Score-Vergleich

```javascript
ResonanzCard.compareScores()
```

Zeigt ein Modal mit:
- **R-Werte Vergleich-Tabelle**: Alle 4 R-Werte im Vergleich
- **Score-Auswirkung**: Beispielrechnung mit konkreten Zahlen
- **Interpretation**: Erklärung der Auswirkungen

## Beispiel: R2-Sperrung

### Szenario aus dem Screenshot

**Berechneter Wert:** 1.460 (96% Übereinstimmung)
**Gesperrter Wert:** 0.50 (manuell gesetzt)

### Formel

```
R = 0.5 + (Übereinstimmung × 1.0)
```

**Übereinstimmung berechnet aus:**
- 40 Summe Abweichungen
- 10 Bedürfnisse analysiert
- Durchschnitt: 4.0 Abweichung
- Übereinstimmung: 1 - (4.0 / 100) = 0.96
- **R2 = 0.5 + 0.96 = 1.46**

### Score-Auswirkung

**Beispielrechnung** (Archetyp-Score = 80, Gewicht = 0.25):

| Szenario | Berechnung | Teil-Score | Differenz |
|----------|------------|------------|-----------|
| 🔒 **Gesperrt (0.50)** | 80 × 0.25 × 0.50 | **10 Punkte** | - |
| 🔓 **Ungesperrt (1.46)** | 80 × 0.25 × 1.46 | **29.2 Punkte** | **+19.2 Punkte** |

**Prozentuale Steigerung:** +192% (relativ zum gesperrten Teil-Score: 10 → 29 Punkte)

### Interpretation

⚠️ **Stark reduzierter Score durch Sperrung**

Die Sperrung auf 0.50 bedeutet:
- ❌ 96% Philosophie-Kohärenz wird **ignoriert**
- ❌ R2-Wert wird auf **Minimum** (0.5) reduziert statt 1.46
- ❌ Teil-Score sinkt von 29 auf 10 Punkte (**-19 Punkte Verlust**)
- ⚠️ Endergebnis spiegelt **nicht** die tatsächliche Übereinstimmung wider

## UI-Komponenten

### Warnung-Banner

Wird automatisch angezeigt über den Resonanz-Cards:
- Orange/Gelber Hintergrund mit Warnsymbol ⚠️
- Details zu jedem gesperrten Faktor
- Buttons zum Entsperren einzelner oder aller Faktoren
- Button zum Öffnen des detaillierten Vergleichs

### Vergleichs-Modal

Wird über `compareScores()` geöffnet:
- **Vollbild-Overlay** mit detaillierter Analyse
- **R-Werte Tabelle** mit farbcodierter Abweichung
- **Beispiel-Berechnung** mit konkreten Score-Werten
- **Interpretation** der Auswirkungen
- Buttons zum Entsperren direkt aus dem Modal

## Technische Details

### Datenfluss

```
Profile Input → calculateDimensionalResonance()
    ↓
Berechne R-Werte (R1-R4)
    ↓
setCalculatedValues(calculatedValues)
    ↓
Check: if (R.locked && R.value !== calculated)
    ↓
YES → showLockedDifferenceWarning()
    ↓
User klickt "Score-Vergleich"
    ↓
showScoreComparisonModal()
```

### Code-Stellen

- **Hauptlogik**: `/js/components/ResonanzCard.js`
  - `setCalculatedValues()` (Zeile 583-643)
  - `showLockedDifferenceWarning()` (Zeile 651-743)
  - `unlockAndApply()` (Zeile 749-808)
  - `unlockAllAndApply()` (Zeile 813-817)
  - `compareScores()` (Zeile 822-855)
  - `showScoreComparisonModal()` (Zeile 863-1085)

- **R-Berechnung**: `/js/synthesis/needsIntegration.js`
  - Formel: `R = 0.5 + (Übereinstimmung × 1.0)` (Zeile 426)

- **Score-Multiplikation**: `/js/synthesis/synthesisCalculator.js`
  - Dimensionale Multiplikation (Zeile 270-275)

## Best Practices

### Wann sollte man R-Werte sperren?

✅ **NUR in diesen Fällen:**
- Testen von Was-wäre-wenn-Szenarien
- Temporäre manuelle Anpassungen
- Debugging

❌ **NICHT für:**
- Produktiv-Berechnungen
- Langfristige Speicherung
- Wenn berechnete Werte gewünscht sind

### Empfehlung

Die berechneten Werte basieren auf:
- Archetyp-Profil
- Tatsächliche Bedürfnisse
- GFK-Kohärenz-Analyse

**→ Entsperren Sie gesperrte Werte**, um die echte Übereinstimmung zu verwenden.

## Commit

**Feature:** Score-Vergleich bei gesperrten R-Werten

**Änderungen:**
- Automatische Warnung bei Abweichungen
- Detailliertes Vergleichs-Modal
- Entsperr-Funktionen für einzelne/alle Faktoren
- UI-Komponenten mit visueller Feedback

**Dateien:**
- `js/components/ResonanzCard.js` (erweitert)
- `docs/LOCKED_R_VALUES_COMPARISON.md` (neu)
