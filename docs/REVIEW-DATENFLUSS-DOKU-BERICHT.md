# Review: Datenfluss & Dokumentation

> **Erstellt am:** 2025-12-13
> **Status:** Analyse abgeschlossen - Handlungsbedarf identifiziert

---

## Zusammenfassung

Bei der Analyse des Codes und der Dokumentation wurden **kritische Inkonsistenzen** gefunden, die dringend korrigiert werden sollten. Die englischen Übersetzungen sind vollständig vorhanden.

---

## 1. KRITISCH: Gewichtungs-Inkonsistenz

### Code (constants.js, Zeile 23-28):

```javascript
WEIGHTS: {
    archetyp: 0.25,      // 25%
    orientierung: 0.25,  // 25%
    dominanz: 0.25,      // 25%
    geschlecht: 0.25     // 25%
},
```

**Der Code verwendet GLEICHVERTEILUNG: 25% für jeden Faktor**

### Dokumentation sagt etwas anderes:

| Quelle | Archetyp | Orientierung | Dominanz | Geschlecht |
|--------|----------|--------------|----------|------------|
| **CODE (constants.js)** | **25%** | **25%** | **25%** | **25%** |
| docs/README.md | 25% | 40% | 20% | 15% |
| docs/en/README.md | 25% | 40% | 20% | 15% |
| docs/theory/factors.md | 15% | 40% | 20% | 25% |
| docs/theory/en/factors.md | 15% | 40% | 20% | 25% |
| help-guide.md | 15% | 40% | 20% | 25% |

### ANPASSUNGSBEDARF:

**Option A:** Dokumentation an Code anpassen (alle 25%)
- [ ] `docs/README.md` - Zeile 63: Formel ändern
- [ ] `docs/en/README.md` - Zeile 63: Formel ändern
- [ ] `docs/theory/factors.md` - Tabelle Zeile 11-14 + Formel Zeile 168
- [ ] `docs/theory/en/factors.md` - Tabelle + Formel
- [ ] `help-guide.md` - Gewichtungstabelle

**Option B:** Code an Dokumentation anpassen (40/25/20/15)
- [ ] `js/synthesis/constants.js` - WEIGHTS ändern
- [ ] Formelkommentar in `synthesisCalculator.js` anpassen

---

## 2. KRITISCH: Logos/Pathos Gewichtungs-Inkonsistenz

### Code berechnet:
- Logos (Archetyp) = 25% des Gesamt
- Pathos (O+D+G) = 75% des Gesamt

### Dokumentation sagt:

| Quelle | Logos | Pathos |
|--------|-------|--------|
| **CODE** | **25%** | **75%** |
| docs/README.md | 25% | 75% |
| docs/theory/pathos-logos.md | **15%** | **85%** |

### ANPASSUNGSBEDARF:

- [ ] `docs/theory/pathos-logos.md` - Titel und Inhalt: "15:85" → "25:75"
  - Zeile 5: "## Grundkonzept: 15:85 Gewichtung" → "## Grundkonzept: 25:75 Gewichtung"
  - Zeile 11: "**Pathos** | 85%" → "**Pathos** | 75%"
  - Zeile 12: "**Logos** | 15%" → "**Logos** | 25%"
  - Zeile 14: "## Logos (15% - Verstand)" → "## Logos (25% - Verstand)"
  - Zeile 27: "Archetyp-Übereinstimmung (15% des Gesamtscores)" → "25%"
  - Zeile 34: "## Pathos (85% - Gefühl)" → "## Pathos (75% - Gefühl)"
  - Zeile 86-94: Gesamter Abschnitt "Warum 85% Pathos?" anpassen

---

## 3. KRITISCH: Formel-Inkonsistenz (v3.1 Dimensionale Resonanz)

### Code (synthesisCalculator.js, Zeilen 255-260) - v3.1:
```
Q = (O × 0.25 × R₁) + (A × 0.25 × R₂) + (D × 0.25 × R₃) + (G × 0.25 × R₄)
```

**WICHTIG: R ist NICHT ein einzelner Multiplikator außen, sondern 4 dimensionale R-Werte INNERHALB der Summe:**
- R₁ = R_Leben (multipliziert O = Orientierung)
- R₂ = R_Philosophie (multipliziert A = Archetyp)
- R₃ = R_Dynamik (multipliziert D = Dominanz)
- R₄ = R_Identität (multipliziert G = Geschlecht)

### Legacy-Fallback (synthesisCalculator.js, Zeile 263):
```
Q = [(A × 0.25) + (O × 0.25) + (D × 0.25) + (G × 0.25)] × R
```

### Dokumentation (docs/README.md, Zeile 63) - VERALTET:
```
Q = [(O × 0.40) + (A × 0.25) + (D × 0.20) + (G × 0.15)] × R
```

### ANPASSUNGSBEDARF:

- [ ] `docs/README.md` Zeile 63-71: Formel auf v3.1 aktualisieren (R₁-R₄ innerhalb)
- [ ] `docs/en/README.md` Zeile 63-71: Formel auf v3.1 aktualisieren
- [ ] `docs/theory/factors.md` Zeile 168: v3.1 Formel dokumentieren
- [ ] `docs/theory/en/factors.md`: v3.1 Formel dokumentieren

---

## 4. NIEDRIG: Version-Inkonsistenz

| Quelle | Version |
|--------|---------|
| README.md | 1.8.85 (veraltet) |
| package.json | 1.8.197 (aktuell) |

### ANPASSUNGSBEDARF:

- [ ] README.md - Version aktualisieren oder dynamisch referenzieren

---

## 5. NIEDRIG: Anzahl Bedürfnisse inkonsistent

| Quelle | Anzahl |
|--------|--------|
| profile-calculator-data-flow.md | "220 Bedürfnisse" |
| docs/README.md | "88 GFK-basierte Bedürfnisse" |
| Code (beduerfnis-katalog.json) | 88 Einträge |

**Die korrekte Zahl ist 88 GFK-Bedürfnisse.**

### ANPASSUNGSBEDARF:

- [ ] `docs/profile-calculator-data-flow.md` - "220 Bedürfnisse" korrigieren

---

## 6. ENGLISCHE TEXTE - Vollständigkeitscheck

### Status: VOLLSTÄNDIG VORHANDEN

| Komponente | Status | Pfad |
|------------|--------|------|
| UI-Locales | ✅ | `js/locales/en.js` (1308 Zeilen) |
| Dokumentation | ✅ | `docs/en/README.md` |
| Hilfe | ✅ | `docs/en/help-guide.md` |
| Namenskonvention | ✅ | `docs/en/NAMING_CONVENTION.md` |
| Theorie-Dokumente | ✅ | `docs/theory/en/*.md` (alle 12 Dateien) |
| Rechtliches | ✅ | `docs/legal/en/*.md` |
| Beziehungsmodell | ✅ | `en/beziehungsmodell.md` |

### Detailprüfung en.js vs. de.js:

| Sektion | DE | EN | Status |
|---------|----|----|--------|
| ui | ✅ | ✅ | Vollständig |
| categories | ✅ | ✅ | Vollständig |
| dominanz | ✅ | ✅ | Vollständig |
| orientierung | ✅ | ✅ | Vollständig |
| geschlecht | ✅ | ✅ | Vollständig |
| tooltips | ✅ | ✅ | Vollständig |
| archetypes | ✅ | ✅ | Vollständig |
| help | ✅ | ✅ | Vollständig |
| comments | ✅ | ✅ | Vollständig |
| validation | ✅ | ✅ | Vollständig |
| ageVerification | ✅ | ✅ | Vollständig |
| hardKO | ✅ | ✅ | Vollständig |
| softKO | ✅ | ✅ | Vollständig |
| needs | ✅ | ✅ | Vollständig (alle 88 Bedürfnisse) |
| profileReview | ✅ | ✅ | Vollständig (alle Attribute) |

**Keine fehlenden englischen Übersetzungen gefunden.**

---

## 7. Datenfluss-Verifikation

### Tatsächlicher Datenfluss im Code:

```
┌─────────────────────────────────────────────────────────────────┐
│                    EINGABE: 2 Profile                            │
│  (Archetyp, Orientierung, Dominanz, Geschlecht, 88 Bedürfnisse) │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            SCHRITT 0: Lifestyle-Filter (K.O.-Check)              │
│         lifestyleFilter.js - baseAttributes Kompatibilität       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│      SCHRITT 0.5: Dimensionale Resonanz (v3.1)                   │
│        needsIntegration.js - R_dim pro Dimension                 │
│        Modifiziert Bedürfniswerte VORAB                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              SCHRITT 1: 4 Faktoren berechnen                     │
├─────────────────────────────────────────────────────────────────┤
│  A = archetypeFactor.js    │  8×8 Matrix-Lookup                  │
│  O = orientationFactor.js  │  Orientierungs-Kompatibilität       │
│  D = dominanceFactor.js    │  Dom/Sub/Switch Matrix              │
│  G = genderFactor.js       │  Gender-Attraktion                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│        SCHRITT 1b: Bedürfnis-Integration pro Faktor              │
│  Faktor = (Matrix × matrixWeight) + (BedürfnisMatch × needsWeight)│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│     SCHRITT 2: Dimensionale Resonanz-Berechnung (v3.1)           │
│  Für jede Dimension: R_dim = 0.9 + (Match_dim × 0.2)             │
│  R₁ = R_Leben (→O)   │  R₂ = R_Philosophie (→A)                  │
│  R₃ = R_Dynamik (→D) │  R₄ = R_Identität (→G)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SCHRITT 3: Gesamt-Score (v3.1)                │
│  Q = (O × 0.25 × R₁) + (A × 0.25 × R₂) +                         │
│      (D × 0.25 × R₃) + (G × 0.25 × R₄)                           │
│                                                                  │
│  R₁-R₄ werden PRO FAKTOR angewandt, NICHT als einzelnes R außen │
│  ACHTUNG: Doku nutzt veraltete Formel mit R außerhalb!           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUSGABE: Ergebnis                             │
│  - Gesamt-Score (0-100%)                                         │
│  - Faktor-Details (A, O, D, G einzeln)                           │
│  - Resonanz-Komponenten                                          │
│  - Bedürfnis-Übereinstimmung                                     │
│  - Text-Generierung (Logos/Pathos/Synthese)                      │
└─────────────────────────────────────────────────────────────────┘
```

### Übereinstimmung mit profile-calculator-data-flow.md:

| Aspekt | Dokumentation | Code | Status |
|--------|---------------|------|--------|
| 4 Hauptfaktoren | ✅ | ✅ | Korrekt |
| Resonanz-Multiplikator | Single R außen | R₁-R₄ pro Faktor (v3.1) | **INKONSISTENT** |
| Lifestyle-Filter | ✅ | ✅ | Korrekt |
| Bedürfnis-Integration | ✅ | ✅ | Korrekt |
| Gewichtung | 15/40/20/25 | 25/25/25/25 | **INKONSISTENT** |
| Formel-Struktur | Q = [...] × R | Q = Σ(F × W × R_dim) | **INKONSISTENT** |

---

## 8. Prioritäten für Korrektur

### HOCH (Sofort beheben):
1. **v3.1 Formel dokumentieren:** R₁-R₄ pro Faktor innerhalb, nicht einzelnes R außen
2. **Gewichtung entscheiden:** Code ODER Doku anpassen (25/25/25/25 vs 15/40/20/25)
3. **Logos/Pathos-Verhältnis:** pathos-logos.md korrigieren (25:75 wenn Code = Wahrheit)

### MITTEL:
4. **Version:** README.md aktualisieren
5. **220 → 88 Bedürfnisse:** Datenfluss-Dokument korrigieren

### NIEDRIG:
6. **Keine Aktion nötig für Englisch** - vollständig vorhanden

---

## 9. Empfehlung

**Empfohlene Option:** Dokumentation an Code anpassen (25/25/25/25)

**Begründung:**
1. Der Code ist die "Single Source of Truth"
2. Die gleichverteilte Gewichtung ist einfacher zu erklären
3. Die Resonanz-Dimension gibt bereits dimensionale Anpassung

Falls die 15/40/20/25 Gewichtung gewünscht ist, muss der Code in `constants.js` angepasst werden.

---

*© 2025 Ti-Age – Review erstellt von Claude*
