# Dimension-Kategorie-Filter

**Universelle 2-Ebenen-Filter-Komponente für Bedürfnisse**

Version: 1.0.0
Erstellt: 2025-12-17

---

## 📋 Übersicht

Der **DimensionKategorieFilter** ist eine wiederverwendbare Komponente für das Filtern von Bedürfnissen nach:
- **Ebene 1: Dimensionen** (A-F) - 6 Hauptbereiche
- **Ebene 2: Kategorien** (#K1-#K18) - 18 Unterkategorien

### Verwendung in:
- ✅ **Alle Bedürfnisse** (AttributeSummaryCard)
- ✅ **Synthese** (GFK-Bedürfnisanalyse)
- ✅ **Bedürfnis-Match** mit Differenz

---

## 🎯 Features

### Ebene 1: 6 Dimensionen

| Dim | Icon | Label | Beschreibung |
|-----|------|-------|--------------|
| **A** | 🏠 | Beziehung & Leben | Lebensplanung, Finanzen & Karriere |
| **B** | ⚖️ | Werte & Weltanschauung | Religion, Tradition, Umwelt |
| **C** | 💕 | Nähe & Intimität | Existenz, Sicherheit, Zuneigung, Verbundenheit, Intimität |
| **D** | 🦅 | Freiheit & Autonomie | Freiheit, Identität, Kreativität, Dynamik |
| **E** | 💬 | Kommunikation | Verständnis, Kommunikationsstil |
| **F** | 👥 | Soziales & Alltag | Teilnahme, Muße, Soziales, Praktisches |

### Ebene 2: 18 Kategorien

Kategorien werden dynamisch angezeigt, basierend auf der gewählten Dimension.

**Beispiel:** Wählt man **C: Nähe & Intimität**, erscheinen:
- #K1 Existenz
- #K2 Sicherheit
- #K3 Zuneigung
- #K10 Verbundenheit
- #K16 Intimität & Romantik

---

## 🚀 Verwendung

### 1. HTML einbinden

```html
<script src="js/components/DimensionKategorieFilter.js"></script>
```

### 2. Filter rendern

```javascript
// In deiner Komponente:
const filterHtml = DimensionKategorieFilter.render('#dein-container-id');
document.querySelector('#dein-container-id').innerHTML = filterHtml;
```

### 3. Bedürfnisse filtern

```javascript
// Prüfe ob ein Bedürfnis angezeigt werden soll
const needs = ['#B1', '#B21', '#B34', ...];
const filtered = needs.filter(needId =>
    DimensionKategorieFilter.shouldShowNeed(needId)
);
```

### 4. Filter-Änderungen beobachten

```javascript
// Event-Listener für Filter-Änderungen
document.addEventListener('dimensionKategorieFilterChange', (event) => {
    const { dimension, kategorie } = event.detail;
    console.log('Filter geändert:', dimension, kategorie);

    // Re-render deiner Bedürfnisliste
    renderDeineBedürfnisse();
});
```

---

## 📚 API-Referenz

### Rendering

#### `render(containerId)`
Rendert den kompletten Filter (Ebene 1 + 2)
```javascript
const html = DimensionKategorieFilter.render('#filter-container');
```

#### `reRender()`
Re-rendert den Filter nach State-Änderung
```javascript
DimensionKategorieFilter.reRender();
```

---

### Filter setzen

#### `setDimension(dimensionId)`
Setzt die aktive Dimension
```javascript
DimensionKategorieFilter.setDimension('#D3'); // Nähe & Intimität
DimensionKategorieFilter.setDimension(null);  // Alle
```

#### `setKategorie(kategorieId)`
Setzt die aktive Kategorie
```javascript
DimensionKategorieFilter.setKategorie('#K3'); // Zuneigung
DimensionKategorieFilter.setKategorie(null);  // Alle
```

#### `reset()`
Setzt Filter zurück (zeige alles)
```javascript
DimensionKategorieFilter.reset();
```

---

### Filter prüfen

#### `shouldShowNeed(needId)`
Prüft ob ein Bedürfnis durch die Filter passt
```javascript
const show = DimensionKategorieFilter.shouldShowNeed('#B21'); // true/false
```

#### `getNeedMetadata(needId)`
Holt Metadaten für ein Bedürfnis
```javascript
const meta = DimensionKategorieFilter.getNeedMetadata('#B21');
// Returns: { dimensionId: '#D3', kategorieId: '#K3', kategorieKey: 'zuneigung' }
```

---

### State abrufen

#### `getState()`
Holt aktuellen Filter-State
```javascript
const state = DimensionKategorieFilter.getState();
// Returns: { dimension: '#D3', kategorie: '#K3' }
```

#### `getDimensionen()`
Holt alle Dimensionen
```javascript
const dims = DimensionKategorieFilter.getDimensionen();
```

#### `getKategorienFuerDimension(dimensionId)`
Holt Kategorien für eine Dimension
```javascript
const kategorien = DimensionKategorieFilter.getKategorienFuerDimension('#D3');
```

---

## 🎨 CSS-Anpassung

Die Komponente verwendet CSS-Variablen für Farben:

```css
.dimension-btn.active {
    background: var(--dimension-color);
}

.kategorie-btn.active {
    background: var(--kategorie-color);
}
```

Alle Styles sind in `css/profile-review.css` definiert.

---

## 📊 Events

### `dimensionKategorieFilterChange`

Wird gefeuert bei jeder Filter-Änderung.

```javascript
document.addEventListener('dimensionKategorieFilterChange', (event) => {
    const {
        dimension,      // '#D3' oder null
        kategorie,      // '#K3' oder null
        dimensionInfo,  // { id, key, label, icon, color, ... }
        kategorieInfo   // { id, key, label, beschreibung, color }
    } = event.detail;
});
```

---

## 💡 Beispiel: Integration in Synthese

```javascript
// In deiner Synthese-Komponente

// 1. Filter rendern
const filterHtml = DimensionKategorieFilter.render('#synthese-filter');
document.querySelector('#synthese-filter').innerHTML = filterHtml;

// 2. Event-Listener
document.addEventListener('dimensionKategorieFilterChange', () => {
    renderSynthese();
});

// 3. Bedürfnisse filtern
function renderSynthese() {
    const allNeeds = [...]; // Alle Bedürfnis-IDs

    const filteredNeeds = allNeeds.filter(needId =>
        DimensionKategorieFilter.shouldShowNeed(needId)
    );

    // Render gefilterte Liste
    displayNeeds(filteredNeeds);
}
```

---

## 🔧 Anpassungen für Synthese/Match-Analyse

### HTML-Container vorbereiten

```html
<div class="synthese-container">
    <!-- Filter-Container -->
    <div id="synthese-filter"></div>

    <!-- Bedürfnis-Liste -->
    <div id="synthese-needs-list"></div>
</div>
```

### JavaScript-Integration

```javascript
// Init Filter
function initSyntheseFilter() {
    const filterHtml = DimensionKategorieFilter.render('#synthese-filter');
    document.querySelector('#synthese-filter').innerHTML = filterHtml;

    // Listen to changes
    document.addEventListener('dimensionKategorieFilterChange', handleFilterChange);
}

function handleFilterChange(event) {
    // Re-render mit neuen Filtern
    renderFilteredNeeds();
}

function renderFilteredNeeds() {
    const allNeeds = getYourNeeds(); // Deine Bedürfnis-Quelle

    const filtered = allNeeds.filter(need =>
        DimensionKategorieFilter.shouldShowNeed(need.id)
    );

    // Display
    const html = filtered.map(need => renderNeedCard(need)).join('');
    document.querySelector('#synthese-needs-list').innerHTML = html;
}

// Call on page load
initSyntheseFilter();
```

---

## ✨ Vorteile

- ✅ **Universell:** Einmal schreiben, überall verwenden
- ✅ **Event-basiert:** Keine Abhängigkeiten zwischen Komponenten
- ✅ **Responsive:** Mobile-optimiert
- ✅ **Animiert:** Smooth Transitions
- ✅ **Typsicher:** JSDoc-kommentiert

---

## 🔄 Migration von alten Filtern

### Alte Perspektiven-Filter

**Vorher:**
```javascript
togglePerspektiveFilter('#P1');
clearPerspektiveFilters();
```

**Nachher:**
```javascript
DimensionKategorieFilter.setDimension('#D1');
DimensionKategorieFilter.reset();
```

### Alte Hauptfragen-Filter

**Vorher:**
```javascript
toggleHauptfragenFilter(); // Zeige nur 70 Hauptfragen
```

**Nachher:**
```javascript
// ENTFERNT - Zeige immer alle 219 Bedürfnisse
// Filter über Dimensionen/Kategorien stattdessen
```

---

## 🛠️ Troubleshooting

### Filter zeigt keine Kategorien

**Problem:** Ebene 2 (Kategorien) erscheint nicht
**Lösung:** Stelle sicher, dass eine Dimension ausgewählt ist

### `shouldShowNeed()` gibt immer `true` zurück

**Problem:** BeduerfnisIds oder TiageTaxonomie nicht geladen
**Lösung:** Stelle sicher, dass diese Scripts VOR DimensionKategorieFilter.js geladen werden:
```html
<script src="profiles/definitions/beduerfnis-ids.js"></script>
<script src="profiles/definitions/taxonomie.js"></script>
<script src="js/components/DimensionKategorieFilter.js"></script>
```

### Events feuern nicht

**Problem:** Event-Listener wird nicht getriggert
**Lösung:** Prüfe, ob der Listener NACH dem Rendern hinzugefügt wurde

---

## 📝 Changelog

### v1.0.0 (2025-12-17)
- ✨ Initiale Version
- ✅ 2-Ebenen-Filter (Dimensionen + Kategorien)
- ✅ Event-System für externe Integration
- ✅ Ersatz für alte Perspektiven-Filter
- ✅ Hauptfragen-Filter entfernt

---

## 👥 Wartung

**Komponente:** `js/components/DimensionKategorieFilter.js`
**Styles:** `css/profile-review.css`
**Taxonomie:** `profiles/definitions/taxonomie.js`

Bei Fragen oder Problemen: [GitHub Issues](https://github.com/StickySmart/Tiage_Beziehungsmodel/issues)
