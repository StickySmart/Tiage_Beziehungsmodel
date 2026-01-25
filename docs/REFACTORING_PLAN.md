# TIAGE Refactoring-Plan: Modularisierung von app-main.js

**Stand:** 25. Januar 2026
**Ziel:** Aufteilung der 24.559 Zeilen in wartbare Module bei Erhalt der SSOT-Architektur

---

## 1. Ist-Analyse: Die 10 groessten JS-Dateien

| # | Datei | Zeilen | Bemerkung |
|---|-------|--------|-----------|
| 1 | `js/app-main.js` | **24.559** | KRITISCH - Muss aufgeteilt werden |
| 2 | `js/components/AttributeSummaryCard.js` | 5.399 | Bereits modularisiert |
| 3 | `profiles/definitions/tiage-beduerfnisse.js` | 2.507 | Datendefinition - OK |
| 4 | `js/state.js` | 2.226 | SSOT - Kernmodul - OK |
| 5 | `statements/archetypeStatements.js` | 2.049 | Datendefinition - OK |
| 6 | `js/synthesis/synthesisCalculator.js` | 1.986 | Berechnungslogik - OK |
| 7 | `js/memory-manager.js` | 1.837 | Speicherverwaltung - OK |
| 8 | `js/components/ResonanzCard.js` | 1.723 | Bereits modularisiert |
| 9 | `profiles/beduerfnis-modifikatoren.js` | 1.692 | Datendefinition - OK |
| 10 | `js/synthesis/needsIntegration.js` | 1.540 | Berechnungslogik - OK |

**Gesamtumfang app-main.js:** 24.559 Zeilen, 423 Funktionen

---

## 2. Analyse: Logische Bereiche in app-main.js

### Bereichs-Uebersicht mit Zeilenzahlen

| Bereich | Zeilen von-bis | Ca. Zeilen | Beschreibung |
|---------|----------------|------------|--------------|
| **MAIN APPLICATION** | 13-2628 | ~2.600 | Initialisierung, globale Vars, Tooltips, loadData, updateAll |
| **Definition Modal** | 2629-3333 | ~700 | Archetype-Info-Modals, Match-Modal, Pro/Contra |
| **Feedback System** | 3333-3776 | ~440 | Legacy Stubs, lokale Feedback-Speicherung |
| **Extended Dimensions** | 3776-9575 | ~5.800 | Geschlecht/Dominanz/Orientierung Modals und Handler |
| **GFK-Matching** | 9576-9997 | ~420 | GFK-Beduerfnis-Matching nach Rosenberg |
| **Desktop Selection** | 9998-10332 | ~330 | Desktop-spezifische Selection-Info |
| **Pathos/Logos Check** | 10333-10768 | ~430 | Pathos/Logos Kompatibilitaetspruefung |
| **Dimension Modifiers** | 10769-10983 | ~210 | Dimensions-Modifikatoren-System |
| **4-Factor Model** | 10984-12434 | ~1.450 | Archetype/Dominanz/Orientierung/Body-Soul Scores |
| **Side-by-Side** | 12435-15619 | ~3.200 | Vergleichsfunktionen, Archetype-Navigation, Slot Machine |
| **Mobile Multi-Page** | 15620-16218 | ~600 | Mobile Navigation und Seitensteuerung |
| **Mobile Gewichtung** | 16219-16337 | ~120 | Mobile Gewichtungs-UI |
| **Mobile Geschlecht Grids** | 16338-16850 | ~510 | Mobile Geschlechtsauswahl-Grids |
| **Factor Detail Modal** | 16851-20127 | ~3.300 | Tiage-Synthese/Pathos/Logos/Needs Modals |
| **Comment Modal** | 20128-20237 | ~110 | Kommentar-Eingabe-Modal |
| **Comments List** | 20238-20729 | ~490 | Kommentarlisten-Anzeige und Filterung |
| **Visitor ID & Rate Limit** | 20730-20975 | ~250 | Besucher-Tracking und Rate-Limiting |
| **LocalStorage Persistence** | 21003-24559 | ~3.550 | Speicherung, AutoSave, ProfileReviewModal, Suche |

---

## 3. Vorgeschlagene neue Modulstruktur

```
js/
├── app-main.js              (~1.500 Zeilen - nur Orchestrierung)
├── state.js                 (unverändert - SSOT)
│
├── core/                    (NEU - Kernfunktionen)
│   ├── init.js              (~500 Zeilen - initApp, loadData, updateAll)
│   ├── tooltips.js          (~800 Zeilen - dimensionTooltips, alle Tooltip-Definitionen)
│   └── statements.js        (~200 Zeilen - getArchetypeStatements, getDominanceStatements, etc.)
│
├── dimensions/              (ERWEITERN)
│   ├── geschlechtModal.js   (~400 Zeilen - showGeschlechtInfoModal, Handler)
│   ├── dominanzModal.js     (~400 Zeilen - showDominanzInfoModal, Handler)
│   ├── orientierungModal.js (~600 Zeilen - showOrientierungInfoModal, Handler)
│   ├── bodySoulModal.js     (~200 Zeilen - showBodySoulModal)
│   └── dimensionHandler.js  (~1.500 Zeilen - Click-Handler, Selection-Logik)
│
├── modals/                  (NEU)
│   ├── definitionModal.js   (~700 Zeilen - openDefinitionModal, navigateDefinition)
│   ├── factorDetailModal.js (~1.500 Zeilen - factorExplanations, openFactorModal)
│   ├── tiageSyntheseModal.js(~1.000 Zeilen - openTiageSyntheseModal, Tabs)
│   ├── needsFullModal.js    (~800 Zeilen - openNeedsFullModal, sortNeedsFullModal)
│   ├── commentModal.js      (~600 Zeilen - openCommentModal, submitComment, Comments List)
│   └── profileReviewModal.js(~2.000 Zeilen - openProfileReviewModal, Filter, Search)
│
├── matching/                (NEU)
│   ├── fourFactorModel.js   (~1.450 Zeilen - getArchetypeScore, getDominanzHarmony, etc.)
│   ├── matchModal.js        (~500 Zeilen - openMatchModal, generateDynamicPro/Contra)
│   └── slotMachine.js       (~700 Zeilen - openSlotMachineModal, startSlotMachine)
│
├── comparison/              (NEU)
│   ├── sideBySide.js        (~1.500 Zeilen - navigateArchetype, selectArchetypeFromGrid)
│   └── archetypeGrid.js     (~500 Zeilen - updateArchetypeGrid)
│
├── mobile/                  (NEU)
│   ├── multiPage.js         (~600 Zeilen - Mobile Seitennavigation)
│   ├── mobileGewichtung.js  (~120 Zeilen - updateMobileGewichtung)
│   └── mobileGeschlecht.js  (~510 Zeilen - Mobile Geschlecht-Grids)
│
├── persistence/             (NEU)
│   ├── localStorage.js      (~500 Zeilen - saveSelectionToStorage, loadSelectionFromStorage)
│   ├── autoSave.js          (~200 Zeilen - initAutoSave)
│   └── visitorTracking.js   (~250 Zeilen - Visitor ID, Rate Limiting)
│
├── ui/                      (NEU)
│   ├── radarChart.js        (~200 Zeilen - drawRadarChart)
│   ├── categoryBars.js      (~200 Zeilen - updateCategoryBars)
│   ├── collapsible.js       (~200 Zeilen - toggleCollapsible, toggleDimensionCollapse)
│   └── navigation.js        (~300 Zeilen - scrollToCard, updateNavDots)
│
├── search/                  (NEU)
│   ├── fuzzySearch.js       (~300 Zeilen - levenshteinDistance, fuzzyMatchScore)
│   └── suggestions.js       (~500 Zeilen - generateSearchSuggestions, handleIntelligentSearch)
│
└── legacy/                  (NEU - fuer Migrationsphase)
    └── feedbackStubs.js     (~50 Zeilen - Leere Stubs fuer entferntes Feedback-System)
```

---

## 4. SSOT-Erhaltungsstrategie

### Prinzip: TiageState bleibt die einzige Wahrheitsquelle

```
                    ┌─────────────────────┐
                    │     TiageState      │  <-- SSOT (Single Source of Truth)
                    │  (js/state.js)      │
                    └──────────┬──────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │ Module lesen │    │ Module lesen │    │ Module lesen │
    │ via TiageState│   │ via TiageState│   │ via TiageState│
    │   .get()     │    │   .get()     │    │   .get()     │
    └──────────────┘    └──────────────┘    └──────────────┘
```

### Regeln fuer neue Module:

1. **Kein lokaler State** - Module speichern keine eigenen Daten
2. **Lesen ueber `TiageState.get()`** - Nie direkt auf globale Variablen zugreifen
3. **Schreiben ueber `TiageState.set()`** - Aenderungen nur ueber TiageState
4. **Subscriber nutzen** - Reaktive Updates ueber `TiageState.subscribe()`
5. **Window-Export fuer Legacy** - `window.functionName = functionName;` fuer HTML-onclick

### Beispiel: Korrekte Modul-Struktur

```javascript
/**
 * js/modals/factorDetailModal.js
 * Abhaengigkeiten: TiageState, TiageSynthesis
 */
(function() {
    'use strict';

    // LESE-ZUGRIFF: Immer ueber TiageState
    function getArchetypes() {
        return {
            ich: TiageState.getArchetype('ich'),
            partner: TiageState.getArchetype('partner')
        };
    }

    function openFactorModal(factor) {
        const archetypes = getArchetypes();
        // ... Modal-Logik
    }

    // WINDOW-EXPORT fuer Legacy-Kompatibilitaet
    window.openFactorModal = openFactorModal;
    window.closeFactorModal = closeFactorModal;
})();
```

---

## 5. Schrittweiser Migrationsplan

### Phase 1: Vorbereitung (Risiko: Niedrig)
**Geschaetzter Aufwand: Mittel**

1. **Dokumentation erstellen**
   - JSDoc-Kommentare zu allen 423 Funktionen
   - Abhaengigkeitsgraph dokumentieren

2. **Test-Infrastruktur**
   - Manuelle Regressions-Checkliste erstellen
   - Kritische User-Flows identifizieren

3. **Backup-Branch**
   - `git checkout -b backup/before-refactoring`

### Phase 2: Low-Risk Module extrahieren (Risiko: Niedrig)
**Geschaetzter Aufwand: Mittel**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 2.1 | `legacy/feedbackStubs.js` | ~50 | Keine |
| 2.2 | `ui/radarChart.js` | ~200 | data (global) |
| 2.3 | `ui/categoryBars.js` | ~200 | data (global) |
| 2.4 | `ui/collapsible.js` | ~200 | DOM only |
| 2.5 | `search/fuzzySearch.js` | ~300 | Keine |
| 2.6 | `core/tooltips.js` | ~800 | Keine (reine Daten) |

**Strategie:**
- Module extrahieren
- In app-main.js die Funktionen durch Proxy-Calls ersetzen
- Window-Exports in neuem Modul

### Phase 3: Dimensions-Module (Risiko: Mittel)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 3.1 | `dimensions/geschlechtModal.js` | ~400 | TiageState, DOM |
| 3.2 | `dimensions/dominanzModal.js` | ~400 | TiageState, DOM |
| 3.3 | `dimensions/orientierungModal.js` | ~600 | TiageState, physicalCompatibility |
| 3.4 | `dimensions/bodySoulModal.js` | ~200 | DOM |
| 3.5 | `dimensions/dimensionHandler.js` | ~1.500 | TiageState, alle Modals |

**Strategie:**
- Jedes Modal einzeln extrahieren
- dimensionHandler.js als letztes (orchestriert andere)
- Nach jedem Schritt testen

### Phase 4: Modal-Module (Risiko: Mittel)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 4.1 | `modals/commentModal.js` | ~600 | TiageState, API |
| 4.2 | `modals/definitionModal.js` | ~700 | data, TiageState |
| 4.3 | `modals/needsFullModal.js` | ~800 | TiageSynthesis, TiageState |
| 4.4 | `modals/tiageSyntheseModal.js` | ~1.000 | TiageSynthesis |
| 4.5 | `modals/factorDetailModal.js` | ~1.500 | TiageSynthesis, data |
| 4.6 | `modals/profileReviewModal.js` | ~2.000 | TiageState, AttributeSummaryCard |

### Phase 5: Matching & Comparison (Risiko: Hoch)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 5.1 | `matching/fourFactorModel.js` | ~1.450 | TiageSynthesis.Constants |
| 5.2 | `matching/matchModal.js` | ~500 | fourFactorModel, data |
| 5.3 | `matching/slotMachine.js` | ~700 | TiageState, fourFactorModel |
| 5.4 | `comparison/sideBySide.js` | ~1.500 | TiageState |
| 5.5 | `comparison/archetypeGrid.js` | ~500 | TiageState, DOM |

### Phase 6: Mobile-Module (Risiko: Mittel)
**Geschaetzter Aufwand: Mittel**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 6.1 | `mobile/mobileGewichtung.js` | ~120 | TiageState |
| 6.2 | `mobile/mobileGeschlecht.js` | ~510 | TiageState, dimensionHandler |
| 6.3 | `mobile/multiPage.js` | ~600 | TiageState, alle Modals |

### Phase 7: Core & Persistence (Risiko: Hoch)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 7.1 | `persistence/visitorTracking.js` | ~250 | localStorage |
| 7.2 | `persistence/localStorage.js` | ~500 | TiageState |
| 7.3 | `persistence/autoSave.js` | ~200 | TiageState, localStorage |
| 7.4 | `core/statements.js` | ~200 | window.* Statements |
| 7.5 | `core/init.js` | ~500 | ALLES |

### Phase 8: Finalisierung
**Geschaetzter Aufwand: Mittel**

1. **app-main.js aufraeumen**
   - Nur noch Modul-Importe und Initialisierung
   - Ziel: < 500 Zeilen

2. **HTML aktualisieren**
   - Script-Tags in korrekter Reihenfolge
   - Defer-Attribute pruefen

3. **Performance-Test**
   - Ladezeiten messen
   - Bundle-Analyse

---

## 6. Lade-Reihenfolge (archetype-interaction.html)

Die neue Script-Reihenfolge muss Abhaengigkeiten respektieren:

```html
<!-- 1. Core Libraries -->
<script defer src="js/state.js"></script>

<!-- 2. Daten-Definitionen (keine Abhaengigkeiten) -->
<script defer src="js/core/tooltips.js"></script>
<script defer src="statements/archetypeStatements.js"></script>

<!-- 3. Synthesis (abhaengig von state.js) -->
<script defer src="js/synthesis/constants.js"></script>
<script defer src="js/synthesis/synthesisCalculator.js"></script>

<!-- 4. UI-Komponenten (abhaengig von state.js) -->
<script defer src="js/ui/radarChart.js"></script>
<script defer src="js/ui/categoryBars.js"></script>
<script defer src="js/ui/collapsible.js"></script>

<!-- 5. Dimensions (abhaengig von state.js, UI) -->
<script defer src="js/dimensions/geschlechtModal.js"></script>
<script defer src="js/dimensions/dominanzModal.js"></script>
<script defer src="js/dimensions/orientierungModal.js"></script>
<script defer src="js/dimensions/dimensionHandler.js"></script>

<!-- 6. Modals (abhaengig von state.js, Synthesis) -->
<script defer src="js/modals/definitionModal.js"></script>
<script defer src="js/modals/factorDetailModal.js"></script>
<script defer src="js/modals/profileReviewModal.js"></script>

<!-- 7. Matching & Comparison -->
<script defer src="js/matching/fourFactorModel.js"></script>
<script defer src="js/matching/matchModal.js"></script>
<script defer src="js/comparison/sideBySide.js"></script>

<!-- 8. Mobile -->
<script defer src="js/mobile/multiPage.js"></script>

<!-- 9. Persistence -->
<script defer src="js/persistence/localStorage.js"></script>

<!-- 10. Core Init (LETZTES - orchestriert alles) -->
<script defer src="js/core/init.js"></script>
<script defer src="js/app-main.js"></script>
```

---

## 7. Risiken und Mitigationsstrategien

### Risiko 1: Zirkulaere Abhaengigkeiten
**Mitigation:**
- Alle Abhaengigkeiten ueber TiageState oder window-Objekte
- Keine direkten Modul-zu-Modul-Imports im IIFE-Pattern

### Risiko 2: Race Conditions beim Laden
**Mitigation:**
- `defer` auf allen Script-Tags
- DOMContentLoaded-Events in jedem Modul
- TiageState.init() als zentrale Initialisierung

### Risiko 3: Gebrochene window.*-Referenzen
**Mitigation:**
- Vollstaendige Liste aller window-Exports erstellen
- Nach Migration pruefen: `grep "window\." *.html`

### Risiko 4: Versteckte globale Variablen
**Mitigation:**
- `'use strict';` in allen Modulen
- Linter mit no-implicit-globals Regel

---

## 8. Erfolgskriterien

| Kriterium | Messung | Ziel |
|-----------|---------|------|
| app-main.js Zeilen | `wc -l js/app-main.js` | < 500 |
| Groesste Datei | `wc -l js/**/*.js \| sort -rn \| head -1` | < 2.500 |
| Alle Tests bestehen | Manuelle Regressionstests | 100% |
| Keine console.errors | Browser DevTools | 0 Fehler |
| SSOT intakt | TiageState ist einzige Datenquelle | Ja |
| Ladezeit | Lighthouse Performance | Gleich oder besser |

---

## 9. Naechste Schritte

1. **Review dieses Plans** mit dem Team
2. **Priorisierung** - Welche Module haben den hoechsten Impact?
3. **Backup erstellen** - Branch vor Beginn
4. **Phase 2 starten** - Mit risikoarmen Modulen beginnen

---

*Dieses Dokument ist ein lebendiger Plan und wird waehrend der Migration aktualisiert.*
