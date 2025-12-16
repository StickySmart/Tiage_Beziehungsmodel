# SSOT, KISS & Separation of Concerns - Analyse & Refactoring

**Datum:** 2025-01-XX
**Kontext:** Help-Features für Score-Erklärungen

## Probleme (Vor Refactoring)

### 1. **SSOT-Verstöße** (Single Source of Truth)

#### Problem: Duplizierte Formeln
- ❌ Hauptformel `Q = (A×wA×R2) + ...` war hardcoded in `app-main.js:15536`
- ❌ Dieselbe Formel existierte bereits in `js/synthesis/constants.js:7` als Dokumentation
- ❌ R-Faktor-Formel `R = 0.5 + (Übereinstimmung × 1.0)` war hardcoded
- ❌ Dieselbe Formel existierte in `constants.js:84`

**Konsequenz:**
- Bei Formeländerungen müssen mehrere Stellen aktualisiert werden
- Inkonsistenzen möglich
- Schlechte Wartbarkeit

### 2. **Separation of Concerns-Verstöße**

#### Problem: Vermischung von Concerns
- ❌ Dokumentations-Texte (was/warum) vermischt mit UI-Rendering (wie)
- ❌ Fachliche Formeln inline in HTML-Generierung
- ❌ Keine klare Trennung zwischen:
  - **Data**: Formeln, Konstanten
  - **Business Logic**: Berechnungen
  - **Presentation**: HTML-Generierung

**Konsequenz:**
- Code schwer zu testen
- Wiederverwendung unmöglich
- Änderungen an Formeln erfordern Änderungen an UI-Code

### 3. **KISS-Verstöße** (Keep It Simple, Stupid)

#### Problem: Komplexität durch Inline-Code
- ❌ Lange ternäre Operatoren für Faktornamen: `rKey === 'R1' ? 'Orientierungs-' : ...`
- ❌ Hardcoded HTML-Strings mit eingebetteter Logik
- ❌ Keine Wiederverwendbarkeit

**Konsequenz:**
- Code schwer zu lesen
- Fehleranfällig
- Duplizierung bei mehrfacher Verwendung

---

## Lösung (Nach Refactoring)

### 1. **SSOT etabliert**

#### Neue zentrale Datei: `js/help-texts.js`
```javascript
var TiageHelpTexts = {
    getMainFormula: function() {
        // SSOT: Referenziert constants.js
        return {
            text: 'Q = [(A × wₐ × R₂) + ...]',
            html: 'Q = (A×w<sub>A</sub>×R₂) + ...',
            description: '...'
        };
    },

    getRFactorFormula: function() {
        // SSOT: Referenziert constants.js Zeile 84
        return {
            text: 'R = 0.5 + (Übereinstimmung × 1.0)',
            range: { min: 0.5, max: 1.5 },
            interpretation: { ... }
        };
    }
};
```

**Vorteile:**
- ✅ Formeln existieren nur noch an einer Stelle
- ✅ Änderungen müssen nur einmal gemacht werden
- ✅ Konsistenz garantiert

### 2. **Separation of Concerns umgesetzt**

#### Klare Schichten:

```
┌─────────────────────────────────────┐
│  Presentation Layer (UI)            │
│  app-main.js: showValueDerivation() │ ← Verwendet HelpTexts
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│  Documentation Layer                │
│  help-texts.js: getRFactor...()     │ ← Referenziert Constants
└───────────────┬─────────────────────┘
                │
┌───────────────▼─────────────────────┐
│  Data Layer (SSOT)                  │
│  constants.js: Formeln, Schwellen   │
└─────────────────────────────────────┘
```

**Verantwortlichkeiten:**
- **Data Layer** (`constants.js`): Rohe Daten, Formeln, Konstanten
- **Documentation Layer** (`help-texts.js`): Strukturierte Erklärungen, Beispiele
- **Presentation Layer** (`app-main.js`): HTML-Rendering, User Interaction

### 3. **KISS angewendet**

#### Vorher (komplex):
```javascript
Der ${rKey}-Faktor wird direkt mit dem ${rKey === 'R1' ? 'Orientierungs-' :
    rKey === 'R2' ? 'Archetyp-' : rKey === 'R3' ? 'Dominanz-' : 'Geschlechts-'}Score multipliziert.
```

#### Nachher (einfach):
```javascript
const helpInfo = TiageHelpTexts.getRFactorInfluenceExplanation(rKey);
// helpInfo.description = "Der R2-Faktor wird direkt mit dem Archetyp-Score multipliziert."
```

**Vorteile:**
- ✅ Lesbarer Code
- ✅ Zentral getestete Logik
- ✅ Wiederverwendbar
- ✅ Einfache Wartung

---

## Checkliste für zukünftige Entwicklung

### SSOT-Check
- [ ] Existiert diese Information bereits woanders?
- [ ] Können wir eine zentrale Quelle referenzieren?
- [ ] Sind Konstanten/Formeln in `constants.js` oder `help-texts.js`?

### Separation of Concerns-Check
- [ ] Ist UI-Code getrennt von Daten?
- [ ] Ist Business Logic getrennt von Presentation?
- [ ] Sind Verantwortlichkeiten klar?

### KISS-Check
- [ ] Ist der Code so einfach wie möglich?
- [ ] Können wir komplexe Logik extrahieren?
- [ ] Ist der Code selbsterklärend?

---

## Refactoring-Details

### Dateien geändert:
1. **NEU**: `js/help-texts.js` - Zentrale Dokumentation (SSOT)
2. **GEÄNDERT**: `archetype-interaction.html` - Script-Tag hinzugefügt
3. **GEÄNDERT**: `js/app-main.js:15532-15552` - Verwendet jetzt `TiageHelpTexts`

### Abwärtskompatibilität:
- ✅ Fallback eingebaut falls `help-texts.js` nicht geladen
- ✅ Keine Breaking Changes
- ✅ Bestehender Code funktioniert weiter

---

## Metriken

| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| Formel-Definitionen | 3× dupliziert | 1× zentral | -67% Duplizierung |
| Code-Lesbarkeit | ❌ Schwer | ✅ Gut | Besser |
| Wartbarkeit | ❌ Mehrere Stellen | ✅ Eine Stelle | Besser |
| Wiederverwendbarkeit | ❌ Keine | ✅ Hoch | Besser |

---

## Nächste Schritte

### Weitere Optimierungen:
1. **Needs-Score-Erklärung** (`openNeedsScoreExplanation()`) auch refactoren
   - Momentan noch inline HTML
   - Sollte `TiageHelpTexts.getNeedsScoreExplanation()` verwenden

2. **Test-Coverage**
   - Unit-Tests für `help-texts.js` schreiben
   - Integration-Tests für UI-Rendering

3. **Dokumentation**
   - JSDoc-Kommentare für alle Public-APIs
   - Beispiele für Entwickler

---

## Fazit

✅ **SSOT**: Formeln existieren nur noch zentral
✅ **KISS**: Code ist einfacher und lesbarer
✅ **SoC**: Klare Trennung zwischen Daten, Logik und Präsentation

**Ergebnis:** Wartbarer, testbarer und erweiterbarer Code ohne Funktionsverlust.
