# State Refactoring Plan v1.0

**Ziel:** Globale Variablen in `app-main.js` durch `TiageState` ersetzen für saubere Modularisierung.

## Status: In Bearbeitung

### Bereits extrahierte Module
- `js/persistence/visitorTracking.js` (~330 Zeilen)
- `js/modals/factorExplanations.js` (~325 Zeilen)
- `js/modals/commentModal.js` (~600 Zeilen)

### Blocker: Globale Variablen-Duplizierung

Die folgenden globalen Variablen verhindern saubere Modul-Extraktion:

| Variable | Vorkommen | TiageState Equivalent |
|----------|-----------|----------------------|
| `currentArchetype` | 117x | `TiageState.getArchetype('ich')` |
| `selectedPartner` | ~80x | `TiageState.getArchetype('partner')` |
| `mobileIchArchetype` | ~40x | Redundant - entfernen |
| `mobilePartnerArchetype` | ~30x | Redundant - entfernen |
| `mobilePersonDimensions` | ~20x | Redundant - `personDimensions` ist Proxy |

---

## PHASE 1: Archetyp-Synchronisation (Empfohlen)

### Schritt 1.1: Getter-Wrapper einführen

Statt alle 273 Stellen sofort zu ändern, fügen wir Getter-Funktionen hinzu:

```javascript
// In app-main.js am Anfang:
function getIchArchetype() {
    return TiageState.getArchetype('ich') || currentArchetype || 'single';
}

function getPartnerArchetype() {
    return TiageState.getArchetype('partner') || selectedPartner || 'duo';
}
```

### Schritt 1.2: Setter mit automatischer Synchronisation

```javascript
// Zentraler Setter der beide Systeme synchron hält:
function setIchArchetype(value) {
    currentArchetype = value;
    mobileIchArchetype = value;
    TiageState.setArchetype('ich', value);
}

function setPartnerArchetype(value) {
    selectedPartner = value;
    mobilePartnerArchetype = value;
    TiageState.setArchetype('partner', value);
}
```

### Schritt 1.3: Subscriber für reaktive Updates

```javascript
// TiageState-Subscriber übernimmt die Synchronisation:
TiageState.subscribe('archetypes.ich', (event) => {
    currentArchetype = event.newValue;
    mobileIchArchetype = event.newValue;
    // UI-Updates triggern...
});
```

---

## PHASE 2: Schrittweise Migration

Nach Phase 1 können wir schrittweise:

1. **Alle Setter ersetzen** - `currentArchetype = x` → `setIchArchetype(x)`
2. **Alle Getter ersetzen** - `currentArchetype` → `getIchArchetype()`
3. **Mobile-Variablen eliminieren** - `mobileIchArchetype` entfernen
4. **Wrapper entfernen** - Direkt `TiageState.getArchetype()` nutzen

---

## PHASE 3: SlotMachine State

SlotMachine-spezifischer State in TiageState integrieren:

```javascript
// Bereits vorhanden in state.js:
state.bindungsmuster.ich = { primary: null, secondary: null }

// Hinzuzufügen:
state.slotMachine = {
    result: null,
    top4Results: [],
    top10Results: [],
    expanded: false
}
```

---

## Geschätzter Aufwand

| Phase | Änderungen | Risiko | Priorität |
|-------|------------|--------|-----------|
| Phase 1.1 | 10 Zeilen | Niedrig | Hoch |
| Phase 1.2 | 20 Zeilen | Niedrig | Hoch |
| Phase 1.3 | 15 Zeilen | Niedrig | Hoch |
| Phase 2 | ~273 Stellen | Mittel | Mittel |
| Phase 3 | 30 Zeilen | Niedrig | Niedrig |

---

## Empfehlung

**Sofort umsetzen:** Phase 1 (Wrapper-Layer) - ~45 Zeilen, niedriges Risiko.

Damit können wir SlotMachine und andere Module sicher extrahieren, während die globalen Variablen weiter funktionieren.

---

*Erstellt: 2026-02-02*
*Autor: Claude Code*
