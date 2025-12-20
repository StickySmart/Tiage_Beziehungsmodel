# Legacy Code Cleanup: Profile Review Modal

> **Datum:** 2025-12-20
> **Status:** ERLEDIGT - Modal wurde durch `needs-editor.html` Seite ersetzt

## Durchgeführte Änderungen

1. **HTML entfernt:** `archetype-interaction.html` - Modal-Overlay (Zeilen 308-404)
2. **JS deprecated:** `app-main.js` - window-Exports auskommentiert (openProfileReviewModal, closeProfileReviewModal, saveProfileReview, resetProfileReview, toggleSourceExplanation)
3. **CSS deprecated:** `.profile-review-modal` Klasse in beiden CSS-Dateien als deprecated markiert
4. **Behalten:** Alle anderen `.profile-review-*` CSS-Klassen werden noch von `needs-editor.html` verwendet!

---

## Übersicht

Das alte **Profile Review Modal** wurde durch die neue **Needs-Editor Seite** (`needs-editor.html`) ersetzt. Der folgende Code wird nicht mehr aktiv verwendet und kann entfernt werden.

---

## 1. HTML - Zu entfernen

### `archetype-interaction.html`

| Zeilen | Element | Beschreibung |
|--------|---------|--------------|
| **314-404** | `#profileReviewModal` | Das komplette Modal-Overlay mit allen Inhalten |
| 312 | `<link>` | CSS-Import `css/profile-review.css` (prüfen ob noch benötigt) |

**Code-Block (Zeile 314-404):**
```html
<div class="modal-overlay" id="profileReviewModal" ...>
    <!-- Gesamtes Modal mit Header, Body, Footer -->
</div>
```

---

## 2. JavaScript - Zu entfernen

### `js/app-main.js`

| Zeilen | Funktion | Beschreibung |
|--------|----------|--------------|
| **18860-19296** | `openProfileReviewModal()` | Modal öffnen (436 Zeilen) |
| **19299-19325** | `closeProfileReviewModal()` | Modal schließen |
| **19327-19336** | `toggleSourceExplanation()` | Source-Erklärung toggle (Modal-spezifisch) |
| **19639-19660** | `clearProfileReviewSearch()` | Such-Clear (Modal-Version) |
| **20108-20300** | `handleIntelligentSearch()` | Intelligente Suche (Modal-Version) |
| **20743-20779** | `resetProfileReview()` | Reset auf Defaults |
| **20887-20958** | `saveProfileReview()` | Modal speichern + schließen |
| **20960-20966** | ESC-Listener | Schließt Modal bei ESC |

**Geschätzt: ~800 Zeilen Code**

### Window-Exports zu entfernen:
```javascript
window.openProfileReviewModal = ...;      // Zeile 19296
window.closeProfileReviewModal = ...;     // Zeile 19325
window.toggleSourceExplanation = ...;     // Zeile 19336
window.resetProfileReviewFilter = ...;    // Zeile 19634
window.resetProfileReview = ...;          // Zeile 20779
window.saveProfileReview = ...;           // Zeile 20958
```

---

## 3. CSS - Zu entfernen

### `templates/template_desktop.css`

| Zeilen | Selektor | Beschreibung |
|--------|----------|--------------|
| **5835-6000+** | `.profile-review-modal` | Modal-spezifische Styles |
| 6265+ | Media Query | Responsive Modal-Styles |

### `templates/template_mobile.css`

| Zeilen | Selektor | Beschreibung |
|--------|----------|--------------|
| 649+ | `.profile-review-modal` | Mobile Modal-Styles |

### `css/profile-review.css`

Prüfen ob diese Datei noch für `needs-editor.html` benötigt wird oder komplett entfernt werden kann.

---

## 4. Komponenten - Prüfen

### `js/components/profile-components.js`

| Element | Status |
|---------|--------|
| `ProfileReviewRenderer.initializeModal()` | ⚠️ Prüfen ob nur für Modal |
| Button-HTML mit `saveProfileReview()` | ⚠️ Zeile 70 |

---

## 5. NICHT entfernen (wird noch verwendet)

Diese Elemente werden von `needs-editor.html` weiterhin verwendet:

| Element | Datei | Verwendung |
|---------|-------|------------|
| `AttributeSummaryCard.*` | `AttributeSummaryCard.js` | ✅ Aktiv |
| `DimensionKategorieFilter` | `DimensionKategorieFilter.js` | ✅ Aktiv |
| `TiageState` | `state.js` | ✅ Aktiv |
| `BeduerfnisIds` | Data-Dateien | ✅ Aktiv |
| Such-Funktionen in `needs-editor.html` | `needs-editor.html` | ✅ Eigene Versionen |

---

## 6. Cleanup-Reihenfolge

1. **Backup erstellen** (Git-Branch)
2. **HTML entfernen** (`archetype-interaction.html` Zeilen 314-404)
3. **JS entfernen** (`app-main.js` - siehe oben)
4. **CSS entfernen** (Modal-spezifische Styles)
5. **Testen** - needs-editor.html muss weiterhin funktionieren
6. **Prüfen** - Keine console.errors, keine defekten Referenzen

---

## 7. Risiko-Analyse

| Risiko | Wahrscheinlichkeit | Auswirkung |
|--------|-------------------|------------|
| Andere Seiten nutzen Modal | Niedrig | Mittel |
| CSS wird noch benötigt | Mittel | Niedrig |
| JS-Funktion wird extern aufgerufen | Niedrig | Hoch |

**Empfehlung:** Vor dem Entfernen globale Suche nach allen Funktionsnamen durchführen.

---

## 8. Zusammenfassung

| Kategorie | Zu entfernen | Geschätzt |
|-----------|--------------|-----------|
| HTML | 1 Block (90 Zeilen) | ~90 Zeilen |
| JavaScript | 6+ Funktionen | ~800 Zeilen |
| CSS | Modal-Styles | ~200 Zeilen |
| **Total** | | **~1090 Zeilen** |

---

## Workflow-Dokumentation (Aktuell)

Der aktuelle Workflow für Bedürfnis-Bearbeitung:

```
archetype-interaction.html
        │
        ▼ openNeedsEditorPage(archetype, person)
        │
needs-editor.html
        │
        ├─ initializeNeedsEditor()
        ├─ loadNeedsData()
        ├─ renderNeedsList()
        │       │
        │       ▼ AttributeSummaryCard.renderAllNeedsFlat()
        │
        ├─ [User bearbeitet Needs]
        │       │
        │       ▼ updateFlatNeedValue() / toggleFlatNeedLock()
        │
        ├─ switchPerson() / saveCurrentState()
        │
        └─ goBack()
                │
                ▼
archetype-interaction.html (zurück)
```
