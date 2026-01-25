# TIAGE Refactoring-Plan: Modularisierung von app-main.js

**Stand:** 25. Januar 2026
**Version:** 2.0 - Mit fruehzeitiger onclick-Migration
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
├── app-main.js              (~500 Zeilen - nur Orchestrierung)
├── state.js                 (unveraendert - SSOT)
│
├── core/                    (NEU - Kernfunktionen)
│   ├── init.js              (~500 Zeilen - initApp, loadData, updateAll)
│   ├── tooltips.js          (~800 Zeilen - dimensionTooltips, alle Tooltip-Definitionen)
│   ├── statements.js        (~200 Zeilen - getArchetypeStatements, getDominanceStatements, etc.)
│   └── eventBus.js          (~150 Zeilen - Zentraler Event-Handler fuer alle Module)
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
└── legacy/                  (NEU - nur fuer Uebergangsphase)
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
5. **KEINE window.* Exports** - Event-Listener statt onclick (siehe Phase 2)

### Beispiel: Korrekte Modul-Struktur (OHNE window.*)

```javascript
/**
 * js/modals/factorDetailModal.js
 * Abhaengigkeiten: TiageState, TiageSynthesis
 */
const FactorDetailModal = (function() {
    'use strict';

    // Private Referenzen
    let modal = null;

    // LESE-ZUGRIFF: Immer ueber TiageState
    function getArchetypes() {
        return {
            ich: TiageState.getArchetype('ich'),
            partner: TiageState.getArchetype('partner')
        };
    }

    function open(factor) {
        const archetypes = getArchetypes();
        // ... Modal-Logik
        modal.classList.add('active');
    }

    function close() {
        modal.classList.remove('active');
    }

    // Event-Listener statt onclick
    function init() {
        modal = document.getElementById('factorDetailModal');

        // Overlay-Klick schliesst Modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        // Button-Aktionen via data-attributes
        modal.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'close') close();
                if (action === 'navigate-prev') navigate(-1);
                if (action === 'navigate-next') navigate(1);
            });
        });
    }

    // Oeffentliche API (fuer andere Module)
    return { init, open, close };
})();

// Initialisierung bei DOMContentLoaded
document.addEventListener('DOMContentLoaded', FactorDetailModal.init);
```

---

## 5. Schrittweiser Migrationsplan

### Phasenuebersicht

```
┌─────────────────────────────────────────────────────────────────────┐
│  Phase 1: Dokumentation        ← KRITISCH: Fundament fuer alles    │
├─────────────────────────────────────────────────────────────────────┤
│  Phase 2: onclick → Event-Listener  ← FRUEH: Ermoeglicht saubere   │
│           + EventBus                    Module ohne window.*        │
├─────────────────────────────────────────────────────────────────────┤
│  Phase 3-8: Module extrahieren  ← Jetzt OHNE window.* moeglich     │
├─────────────────────────────────────────────────────────────────────┤
│  Phase 9: Finalisierung         ← Aufraeumen, Testen               │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Phase 1: Dokumentation (Risiko: Niedrig)
**Geschaetzter Aufwand: Mittel**

Diese Phase ist das Fundament fuer alles Weitere. Ohne sie ist Refactoring Blindflug.

| Schritt | Aufgabe | Output |
|---------|---------|--------|
| 1.1 | **Funktions-Inventar** erstellen | Liste aller 423 Funktionen mit Zeilen-Referenz |
| 1.2 | **Abhaengigkeitsgraph** dokumentieren | Welche Funktion ruft welche auf? |
| 1.3 | **window.* Export-Liste** | Alle ~80 Funktionen die exportiert werden |
| 1.4 | **onclick-Inventar** | Alle 330 onclick-Attribute mit Ziel-Funktion |
| 1.5 | **Regressions-Checkliste** | Kritische User-Flows zum manuellen Testen |
| 1.6 | **Backup-Branch** | `git checkout -b backup/before-refactoring` |

**Outputs:**
- `docs/FUNCTION_INVENTORY.md` - Alle Funktionen
- `docs/DEPENDENCY_GRAPH.md` - Abhaengigkeiten
- `docs/ONCLICK_INVENTORY.md` - Alle onclick-Attribute
- `docs/REGRESSION_CHECKLIST.md` - Testfaelle

---

### Phase 2: onclick zu Event-Listener Migration (Risiko: Mittel)
**Geschaetzter Aufwand: Hoch**

**WARUM FRUEH?** Diese Phase ermoeglicht alle folgenden Module OHNE window.* Exports.
Einmal richtig machen statt spaeter alles nochmal anfassen.

#### 2.1 EventBus erstellen (~150 Zeilen)

```javascript
// js/core/eventBus.js
const EventBus = (function() {
    'use strict';

    const handlers = {};

    function on(event, callback) {
        if (!handlers[event]) handlers[event] = [];
        handlers[event].push(callback);
    }

    function emit(event, data) {
        if (handlers[event]) {
            handlers[event].forEach(cb => cb(data));
        }
    }

    function off(event, callback) {
        if (handlers[event]) {
            handlers[event] = handlers[event].filter(cb => cb !== callback);
        }
    }

    return { on, emit, off };
})();
```

#### 2.2 data-action Pattern einfuehren

**Vorher (HTML):**
```html
<button onclick="openFactorModal('archetyp')">Details</button>
<button onclick="closeCommentModal()">X</button>
```

**Nachher (HTML):**
```html
<button data-action="open-factor-modal" data-factor="archetyp">Details</button>
<button data-action="close-comment-modal">X</button>
```

#### 2.3 Zentraler Action-Handler

```javascript
// js/core/actionHandler.js
const ActionHandler = (function() {
    'use strict';

    const actions = {
        // Modals
        'open-factor-modal': (el) => FactorDetailModal.open(el.dataset.factor),
        'close-factor-modal': () => FactorDetailModal.close(),
        'open-comment-modal': () => CommentModal.open(),
        'close-comment-modal': () => CommentModal.close(),

        // Navigation
        'navigate-archetype': (el) => {
            const person = el.dataset.person;
            const direction = parseInt(el.dataset.direction);
            Comparison.navigateArchetype(person, direction);
        },

        // ... weitere Actions
    };

    function init() {
        // Event-Delegation auf document-Ebene
        document.addEventListener('click', (e) => {
            const actionEl = e.target.closest('[data-action]');
            if (!actionEl) return;

            const action = actionEl.dataset.action;
            if (actions[action]) {
                e.preventDefault();
                actions[action](actionEl, e);
            }
        });
    }

    // Actions koennen von Modulen registriert werden
    function register(name, handler) {
        actions[name] = handler;
    }

    return { init, register };
})();
```

#### 2.4 Migrations-Schritte fuer onclick

| Schritt | Bereich | onclick-Anzahl | Strategie |
|---------|---------|----------------|-----------|
| 2.4.1 | Comment Modal | ~10 | Pilot-Migration |
| 2.4.2 | Definition Modal | ~15 | |
| 2.4.3 | Factor Detail Modal | ~20 | |
| 2.4.4 | Dimensions Modals | ~50 | Groesster Block |
| 2.4.5 | Mobile Navigation | ~40 | |
| 2.4.6 | Archetype Grid | ~30 | |
| 2.4.7 | Gewichtung Controls | ~25 | |
| 2.4.8 | Remaining (~140) | ~140 | Rest |

**Strategie pro Modal:**
1. onclick-Attribute im HTML durch data-action ersetzen
2. Handler in ActionHandler.register() eintragen
3. Testen
4. window.* Export entfernen (wird nicht mehr gebraucht)

---

### Phase 3: Low-Risk Module extrahieren (Risiko: Niedrig)
**Geschaetzter Aufwand: Mittel**

Jetzt OHNE window.* Exports - Module sind sofort sauber!

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 3.1 | `legacy/feedbackStubs.js` | ~50 | Keine |
| 3.2 | `ui/radarChart.js` | ~200 | data (global) |
| 3.3 | `ui/categoryBars.js` | ~200 | data (global) |
| 3.4 | `ui/collapsible.js` | ~200 | DOM only |
| 3.5 | `search/fuzzySearch.js` | ~300 | Keine |
| 3.6 | `core/tooltips.js` | ~800 | Keine (reine Daten) |

---

### Phase 4: Dimensions-Module (Risiko: Mittel)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 4.1 | `dimensions/geschlechtModal.js` | ~400 | TiageState, DOM |
| 4.2 | `dimensions/dominanzModal.js` | ~400 | TiageState, DOM |
| 4.3 | `dimensions/orientierungModal.js` | ~600 | TiageState, physicalCompatibility |
| 4.4 | `dimensions/bodySoulModal.js` | ~200 | DOM |
| 4.5 | `dimensions/dimensionHandler.js` | ~1.500 | TiageState, alle Modals |

---

### Phase 5: Modal-Module (Risiko: Mittel)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 5.1 | `modals/commentModal.js` | ~600 | TiageState, API |
| 5.2 | `modals/definitionModal.js` | ~700 | data, TiageState |
| 5.3 | `modals/needsFullModal.js` | ~800 | TiageSynthesis, TiageState |
| 5.4 | `modals/tiageSyntheseModal.js` | ~1.000 | TiageSynthesis |
| 5.5 | `modals/factorDetailModal.js` | ~1.500 | TiageSynthesis, data |
| 5.6 | `modals/profileReviewModal.js` | ~2.000 | TiageState, AttributeSummaryCard |

---

### Phase 6: Matching & Comparison (Risiko: Hoch)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 6.1 | `matching/fourFactorModel.js` | ~1.450 | TiageSynthesis.Constants |
| 6.2 | `matching/matchModal.js` | ~500 | fourFactorModel, data |
| 6.3 | `matching/slotMachine.js` | ~700 | TiageState, fourFactorModel |
| 6.4 | `comparison/sideBySide.js` | ~1.500 | TiageState |
| 6.5 | `comparison/archetypeGrid.js` | ~500 | TiageState, DOM |

---

### Phase 7: Mobile-Module (Risiko: Mittel)
**Geschaetzter Aufwand: Mittel**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 7.1 | `mobile/mobileGewichtung.js` | ~120 | TiageState |
| 7.2 | `mobile/mobileGeschlecht.js` | ~510 | TiageState, dimensionHandler |
| 7.3 | `mobile/multiPage.js` | ~600 | TiageState, alle Modals |

---

### Phase 8: Core & Persistence (Risiko: Hoch)
**Geschaetzter Aufwand: Hoch**

| Schritt | Modul | Zeilen | Abhaengigkeiten |
|---------|-------|--------|-----------------|
| 8.1 | `persistence/visitorTracking.js` | ~250 | localStorage |
| 8.2 | `persistence/localStorage.js` | ~500 | TiageState |
| 8.3 | `persistence/autoSave.js` | ~200 | TiageState, localStorage |
| 8.4 | `core/statements.js` | ~200 | window.* Statements |
| 8.5 | `core/init.js` | ~500 | ALLES |

---

### Phase 9: Finalisierung
**Geschaetzter Aufwand: Mittel**

1. **app-main.js aufraeumen**
   - Nur noch Modul-Initialisierung
   - Ziel: < 200 Zeilen

2. **HTML aktualisieren**
   - Script-Tags in korrekter Reihenfolge
   - Defer-Attribute pruefen
   - Verifizieren: 0 onclick-Attribute

3. **Code-Qualitaet**
   - ESLint ueber alle neuen Module
   - `'use strict';` verifizieren

4. **Performance-Test**
   - Ladezeiten messen
   - Bundle-Analyse

5. **Dokumentation finalisieren**
   - README aktualisieren
   - Architektur-Diagramm

---

## 6. Lade-Reihenfolge (archetype-interaction.html)

Die neue Script-Reihenfolge muss Abhaengigkeiten respektieren:

```html
<!-- 1. Core Libraries -->
<script defer src="js/state.js"></script>
<script defer src="js/core/eventBus.js"></script>
<script defer src="js/core/actionHandler.js"></script>

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
- EventBus fuer lose Kopplung zwischen Modulen
- Keine direkten Modul-zu-Modul-Imports
- TiageState als zentrale Datenschicht

### Risiko 2: Race Conditions beim Laden
**Mitigation:**
- `defer` auf allen Script-Tags
- DOMContentLoaded-Events in jedem Modul
- TiageState.init() als zentrale Initialisierung

### Risiko 3: onclick-Migration bricht Funktionalitaet
**Mitigation:**
- Pro Modal migrieren und sofort testen
- Regressions-Checkliste aus Phase 1 nutzen
- Bei Problemen: Git revert auf letzten funktionierenden Stand

### Risiko 4: Versteckte globale Variablen
**Mitigation:**
- `'use strict';` in allen Modulen
- ESLint mit no-implicit-globals Regel
- Code-Review vor jedem Merge

### Risiko 5: Event-Listener Memory Leaks
**Mitigation:**
- Event-Delegation statt individuelle Listener
- cleanup()-Funktion in jedem Modal
- Chrome DevTools Memory-Profiling

---

## 8. Erfolgskriterien

| Kriterium | Messung | Ziel |
|-----------|---------|------|
| app-main.js Zeilen | `wc -l js/app-main.js` | < 200 |
| Groesste Datei | `wc -l js/**/*.js \| sort -rn \| head -1` | < 2.500 |
| onclick-Attribute | `grep -c 'onclick=' *.html` | 0 |
| window.* Exports | `grep -c 'window\.' js/app-main.js` | < 10 |
| Alle Tests bestehen | Manuelle Regressionstests | 100% |
| Keine console.errors | Browser DevTools | 0 Fehler |
| SSOT intakt | TiageState ist einzige Datenquelle | Ja |
| Ladezeit | Lighthouse Performance | Gleich oder besser |

---

## 9. Vorteile des revidierten Plans

| Aspekt | Alter Plan (onclick am Ende) | Neuer Plan (onclick frueh) |
|--------|------------------------------|----------------------------|
| **Aufwand** | Module 2x anfassen | Module 1x anfassen |
| **window.* Exports** | Temporaer noetig | Nie noetig |
| **Code-Qualitaet** | Erst spaet sauber | Sofort sauber |
| **Testbarkeit** | Erst spaet testbar | Sofort testbar |
| **Risiko** | Spaete grosse Aenderung | Fruehe kontrollierte Aenderung |

---

## 10. Naechste Schritte

1. **Review dieses Plans** - Feedback einholen
2. **Phase 1 starten** - Dokumentation ist Fundament
3. **Pilot-Migration** - Ein Modal komplett durchziehen (Comment Modal empfohlen)
4. **Iterativ vorgehen** - Nach jedem Schritt testen

---

*Dieses Dokument ist ein lebendiger Plan und wird waehrend der Migration aktualisiert.*

**Version History:**
- v2.0 (25.01.2026): onclick-Migration als Phase 2 eingefuegt
- v1.0 (25.01.2026): Initiale Version
