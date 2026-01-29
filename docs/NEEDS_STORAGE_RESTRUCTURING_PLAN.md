# Bedürfnis-Speicherung Umstrukturierung - Umsetzungsplan

**Stand:** 29. Januar 2026 - **IMPLEMENTIERT** ✅
**Ziel:** Minimale Änderung an der Bedürfnis-Verwaltung gemäß SSOT v2.0 Architektur

---

## 1. KONTEXT & ANFORDERUNGEN

### Was BLEIBT GLEICH
- Alle Seiten und UI bleiben wie sie sind
- Alle Abfragen und Visualisierungen bleiben bestehen
- Resonanzfaktoren-Berechnung bleibt gleich
- AGOD-Modifikatoren (Archetyp, Geschlecht, Orientierung, Dominanz) funktionieren weiter

### Was sich ÄNDERT

#### 1.1 PARTNER-SEITE: Keine manuelle Bedürfnis-Anpassung
- ATTRIBUTE Button bei PARTNER entfernen
- Partner-Bedürfnisse sind NICHT mehr vom User verstellbar
- Partner-Werte werden dynamisch berechnet aus: Archetyp-Basis + AGOD-Modifikatoren
- Alles read-only, aber dynamisch (nicht statisch!)

#### 1.2 ICH/DU-SEITE: 8-fache Speicherung pro Archetyp
- User kann weiterhin seine Bedürfnisse anpassen
- NEU: Anpassungen werden PRO ARCHETYP gespeichert
- 8 separate Speicher-Slots: Single, Duo, Duo-Flex, Solopoly, Polyamor, RA, LAT, Aromantisch
- Beim Archetyp-Wechsel werden die gespeicherten Werte für diesen Archetyp geladen
- Sinn: User bildet seine persönliche Vorstellung jedes Archetyps ab

---

## 2. IST-ANALYSE: BEREITS IMPLEMENTIERT ✅

### 2.1 state.js - 8-Slot Speicherstruktur (Zeilen 148-161)
```javascript
flatNeeds: {
    ich: {
        // 8 Archetyp-Slots für ICH - User-Anpassungen werden pro Archetyp gespeichert
        single: {},
        duo: {},
        'duo-flex': {},
        solopoly: {},
        polyamor: {},
        ra: {},
        lat: {},
        aromantisch: {}
    },
    partner: {}  // Bleibt flach - wird dynamisch berechnet, nicht manuell editierbar
}
```

### 2.2 state.js - Smart-Getter/Setter (Zeilen 500-570)
- `TiageState.get('flatNeeds.ich')` → leitet automatisch auf `flatNeeds.ich.[currentArchetype]`
- `TiageState.set('flatNeeds.ich', ...)` → speichert automatisch in `flatNeeds.ich.[currentArchetype]`
- Ermöglicht volle Abwärtskompatibilität mit bestehendem Code

### 2.3 state.js - Partner Locked Needs blockiert (Zeilen 1343-1404)
- `getLockedNeeds('partner')` → gibt leeres Objekt zurück
- `lockNeed('partner', ...)` → wird ignoriert mit Warning
- `unlockNeed('partner', ...)` → wird ignoriert
- `isNeedLocked('partner', ...)` → gibt immer false zurück

### 2.4 archetype-interaction.html - Nur ICH-Attribute Button (Zeile 642)
```html
<button class="slot-retry-btn" onclick="goToIchAttributes()">⚙️ ICH-Attribute anpassen</button>
```
- Kein Partner-ATTRIBUTE Button vorhanden ✅

---

## 3. IMPLEMENTIERT ✅ (Stand: 29. Januar 2026)

### 3.1 state.js - setNeed für Partner ✅
**Datei:** `js/state.js`

**Entscheidung:** setNeed für Partner NICHT blockieren, da die dynamische Berechnung dies braucht.
Stattdessen UI read-only machen. Header-Dokumentation auf SSOT v2.0 aktualisiert.

### 3.2 needs-editor.html - Partner-Zugang deaktivieren ✅
**Datei:** `needs-editor.html` (Zeilen 847-848, 1212-1216)

**Lösung implementiert:**
```javascript
const requestedPerson = urlParams.get('person') || 'ich';
// Partner-Zugang blockieren - nur noch ICH editierbar
currentPerson = (requestedPerson === 'partner') ? 'ich' : requestedPerson;
```

### 3.3 AttributeSummaryCard - Defensive Guards ✅
**Datei:** `js/components/AttributeSummaryCard.js`

**Lösung implementiert (minimal, defensiv):**
- `onFlatSliderInput()`: Partner-Check blockiert Slider-Eingabe
- `updateFlatNeedValue()`: Partner-Check blockiert Input-Änderung
- `toggleFlatNeedLock()`: Partner-Check blockiert Lock-Toggle
- `toggleNeedSelection()`: Partner-Check blockiert Multi-Select

**Hinweis:** Da der Zugang zu Partner-Editing durch needs-editor.html blockiert wird, sind diese Guards nur als Absicherung für interne Aufrufe gedacht. Kein spezielles CSS nötig.

---

## 4. BETROFFENE DATEIEN

| Datei | Änderung | Status |
|-------|----------|--------|
| `js/state.js` | Dokumentation auf SSOT v2.0 aktualisiert | ✅ |
| `needs-editor.html` | Partner-Zugang blockiert (URL-Redirect) | ✅ |
| `js/components/AttributeSummaryCard.js` | Defensive Guards für Partner | ✅ |
| `archetype-interaction.html` | Bereits OK - keine Änderung | ✅ |

---

## 5. SPEICHERSTRUKTUR ÜBERSICHT

### Aktuelle Struktur (bereits implementiert)

```
TiageState
├── flatNeeds
│   ├── ich
│   │   ├── single      { '#B1': 50, '#B2': 75, ... }
│   │   ├── duo         { '#B1': 60, '#B2': 80, ... }
│   │   ├── duo-flex    { ... }
│   │   ├── solopoly    { ... }
│   │   ├── polyamor    { ... }
│   │   ├── ra          { ... }
│   │   ├── lat         { ... }
│   │   └── aromantisch { ... }
│   │
│   └── partner         { '#B1': 55, '#B2': 70, ... }  ← DYNAMISCH berechnet
│
├── profileReview (Survey-Overrides)
│   ├── ich
│   │   ├── single      { '#B15': 80 }  ← Locked Needs
│   │   ├── duo         { }
│   │   └── ...
│   │
│   └── partner
│       └── lockedNeeds { }  ← LEER (keine manuellen Overrides)
│
└── archetypes
    ├── ich
    │   ├── primary     'single' | 'duo' | ...
    │   └── secondary   null | 'single' | ...
    │
    └── partner
        ├── primary     'duo' | 'single' | ...
        └── secondary   null | ...
```

### Zugriffs-Logik

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                            │
├─────────────────────────────────────────────────────────────┤
│  ICH-Bedürfnisse                  PARTNER-Bedürfnisse       │
│  ┌──────────────┐                 ┌──────────────┐          │
│  │ EDITIERBAR   │                 │  READ-ONLY   │          │
│  │ via Survey   │                 │  dynamisch   │          │
│  │ via Slider   │                 │  berechnet   │          │
│  └──────┬───────┘                 └──────┬───────┘          │
│         │                                │                   │
│         ▼                                ▼                   │
│  ┌──────────────┐                 ┌──────────────┐          │
│  │ Smart-Setter │                 │ Nur Lesen    │          │
│  │ → ich.[arch] │                 │ dynamische   │          │
│  └──────────────┘                 │ Berechnung   │          │
│                                   └──────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     TiageState (SSOT)                        │
├─────────────────────────────────────────────────────────────┤
│  flatNeeds.ich.[currentArchetype]  flatNeeds.partner        │
│  ┌──────────────────────────┐      ┌──────────────────────┐ │
│  │ 8 separate Slots         │      │ 1 flacher Slot       │ │
│  │ User-Anpassungen         │      │ Dynamisch berechnet  │ │
│  │ werden gespeichert       │      │ aus AGOD-Modifikator │ │
│  └──────────────────────────┘      └──────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. IMPLEMENTIERUNGS-SCHRITTE

### Schritt 1: needs-editor.html - Partner blockieren
```javascript
// Im initFunction()
const requestedPerson = urlParams.get('person') || 'ich';
// Partner-Zugang blockieren - nur noch ICH editierbar
currentPerson = (requestedPerson === 'partner') ? 'ich' : requestedPerson;
```

### Schritt 2: AttributeSummaryCard - Partner read-only
```javascript
// In renderNeedItem() oder ähnlich
if (currentPerson === 'partner') {
    // Keine Edit-Buttons rendern
    // Stattdessen: Info-Badge "Dynamisch berechnet"
}
```

### Schritt 3: Aufräumen
- Partner-CSS aus needs-editor.html entfernen
- Partner-JS Referenzen kommentieren oder entfernen
- Kommentare aktualisieren

---

## 7. ERFOLGSKRITERIEN

| Kriterium | Messung |
|-----------|---------|
| Partner-Bedürfnisse nicht manuell editierbar | needs-editor.html zeigt nur ICH |
| 8-Slot Speicherung funktioniert | Archetyp-Wechsel lädt korrekte Werte |
| Dynamische Partner-Berechnung funktioniert | AGOD-Änderung aktualisiert Partner-Needs |
| Keine console.errors | Browser DevTools zeigt 0 Fehler |
| SSOT intakt | TiageState ist einzige Datenquelle |

---

## 8. RISIKEN

| Risiko | Mitigation |
|--------|------------|
| Bestehende Partner-Daten gehen verloren | Partner-Daten werden weiterhin gespeichert, nur nicht mehr editierbar |
| Berechnung zeigt falsche Werte | Dynamische Berechnung bleibt unverändert |
| UI zeigt noch Edit-Optionen | Manueller Test aller Einstiegspunkte |

---

*Erstellt: 25.01.2026*
