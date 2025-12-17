# Resonanz Tree View - Dokumentation

## Übersicht

Die **Resonanz Tree View** ist eine hierarchische Baumansicht, die die vollständige Struktur der Bedürfnis-Taxonomie visualisiert:

```
Resonanz (R1-R4)
└── Kategorien (#K1-#K18)
    └── Nuancen/Bedürfnisse (#B1-#B220)
```

## Features

### ✨ Kernfunktionen

1. **3-Ebenen-Hierarchie**
   - **Ebene 1 - Resonanz (R1-R4):** Leben 🔥, Philosophie 🧠, Dynamik ⚡, Identität 💚
   - **Ebene 2 - Kategorien (#K1-#K18):** z.B. Verständnis, Kreativität & Erschaffen
   - **Ebene 3 - Nuancen (#B1-#B220):** Einzelne Bedürfnisse

2. **Interaktive Navigation**
   - Klickbare Expand/Collapse-Funktionalität (▶/▼)
   - "Alle aufklappen" / "Alle zuklappen" Buttons
   - Smooth Animationen beim Auf-/Zuklappen

3. **Visuelle Gestaltung**
   - Farbcodierung nach Resonanz-Bereichen
   - Zähler für jede Ebene (z.B. "Leben (37)")
   - ID-Badges für Kategorien und Bedürfnisse
   - Hover-Effekte und visuelle Feedback

4. **Responsive Design**
   - Optimiert für Desktop und Mobile
   - Anpassbare Schriftgrößen und Abstände

## Installation

### 1. Dateien hinzufügen

Die Komponente besteht aus drei Dateien:

```
js/components/ResonanzTreeView.js    # JavaScript-Komponente
css/resonanz-tree-view.css          # Styling
test-resonanz-tree-view.html        # Demo/Test-Seite
```

### 2. In HTML einbinden

```html
<!-- CSS -->
<link rel="stylesheet" href="css/resonanz-tree-view.css">

<!-- Dependencies -->
<script src="profiles/definitions/taxonomie.js"></script>
<script src="profiles/definitions/beduerfnis-ids.js"></script>

<!-- Tree View Component -->
<script src="js/components/ResonanzTreeView.js"></script>
```

### 3. Initialisieren

```javascript
// Container vorbereiten
<div id="treeContainer"></div>

// Tree View rendern
document.addEventListener('DOMContentLoaded', function() {
    const html = ResonanzTreeView.render('#treeContainer');
    document.getElementById('treeContainer').innerHTML = html;
});
```

## API-Referenz

### Rendering

#### `render(container)`
Rendert die komplette Tree View.

```javascript
const html = ResonanzTreeView.render('#treeContainer');
```

**Parameter:**
- `container` (string): CSS-Selektor für den Container

**Returns:** HTML-String

#### `reRender()`
Aktualisiert die Tree View nach State-Änderungen.

```javascript
ResonanzTreeView.reRender();
```

### Interaktion

#### `toggleNode(nodeId)`
Klappt einen Knoten auf/zu.

```javascript
ResonanzTreeView.toggleNode('R1');           // Resonanz-Ebene
ResonanzTreeView.toggleNode('R1-#K4');       // Kategorie-Ebene
```

**Parameter:**
- `nodeId` (string): ID des Knotens (z.B. 'R1', 'R1-#K4')

#### `expandAll()`
Klappt alle Knoten auf.

```javascript
ResonanzTreeView.expandAll();
```

#### `collapseAll()`
Klappt alle Knoten zu.

```javascript
ResonanzTreeView.collapseAll();
```

#### `reset()`
Setzt den Baum zurück und lädt neu.

```javascript
ResonanzTreeView.reset();
```

### Daten-Zugriff

#### `getTreeData()`
Gibt die komplette Baumstruktur zurück.

```javascript
const treeData = ResonanzTreeView.getTreeData();
console.log(treeData);
```

**Returns:** Objekt mit folgender Struktur:

```javascript
{
    'R1': {
        id: 'R1',
        label: 'Leben',
        icon: '🔥',
        color: '#E63946',
        count: 37,
        kategorien: {
            '#K1': {
                id: '#K1',
                label: 'Existenz',
                count: 9,
                nuancen: [
                    { id: '#B1', key: 'luft', label: 'Luft' },
                    // ...
                ]
            },
            // ...
        }
    },
    // ...
}
```

## Verwendungsbeispiele

### Beispiel 1: Einfache Integration

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/resonanz-tree-view.css">
</head>
<body>
    <div id="treeContainer"></div>

    <script src="profiles/definitions/taxonomie.js"></script>
    <script src="profiles/definitions/beduerfnis-ids.js"></script>
    <script src="js/components/ResonanzTreeView.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const html = ResonanzTreeView.render('#treeContainer');
            document.getElementById('treeContainer').innerHTML = html;
        });
    </script>
</body>
</html>
```

### Beispiel 2: Mit Toolbar-Buttons

```html
<div class="toolbar">
    <button onclick="ResonanzTreeView.expandAll()">Alle aufklappen</button>
    <button onclick="ResonanzTreeView.collapseAll()">Alle zuklappen</button>
    <button onclick="ResonanzTreeView.reset()">Zurücksetzen</button>
</div>

<div id="treeContainer"></div>
```

### Beispiel 3: Programmgesteuerte Navigation

```javascript
// Bestimmte Resonanz aufklappen
ResonanzTreeView.toggleNode('R1');

// Bestimmte Kategorie aufklappen
ResonanzTreeView.toggleNode('R1-#K4');

// Alle aufklappen und dann R2 zuklappen
ResonanzTreeView.expandAll();
setTimeout(() => {
    ResonanzTreeView.toggleNode('R2');
}, 500);
```

### Beispiel 4: Event-Handling (zukünftige Erweiterung)

```javascript
// Custom Event für Node-Clicks
document.addEventListener('treeNodeClick', function(event) {
    const { nodeId, nodeType, nodeData } = event.detail;
    console.log(`Clicked: ${nodeId} (${nodeType})`);
    console.log('Data:', nodeData);
});
```

## Styling-Anpassungen

### Farben ändern

```css
/* Resonanz-Ebene */
.tree-node-resonanz > .tree-node-header {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.2);
}

/* Kategorie-Ebene */
.tree-node-kategorie > .tree-node-header {
    background: rgba(255, 255, 255, 0.03);
}

/* Nuancen-Ebene */
.tree-node-nuance > .tree-node-header {
    color: rgba(255, 255, 255, 0.7);
}
```

### Abstände anpassen

```css
/* Einrückung der Kinder */
.tree-node-children {
    margin-left: 20px;    /* Standard */
    padding-left: 16px;
}

/* Für kompaktere Darstellung */
.tree-node-children {
    margin-left: 12px;
    padding-left: 10px;
}
```

### Icons ändern

```javascript
// In ResonanzTreeView.js
const RESONANZ_DIMENSIONEN = {
    'R1': {
        icon: '🌟',  // Statt 🔥
        // ...
    }
};
```

## Architektur

### Datenfluss

```
TiageTaxonomie.js (SSOT)
    ↓
BeduerfnisIds.js (Bedürfnisse)
    ↓
ResonanzTreeView.js (Komponente)
    ↓
buildTreeData() → Hierarchie aufbauen
    ↓
render() → HTML generieren
    ↓
Browser DOM
```

### State-Management

Die Komponente verwaltet zwei State-Objekte:

1. **`expandedNodes`** (Set): Welche Knoten sind ausgeklappt?
2. **`treeData`** (Object): Cache der Baumstruktur

### Performance

- **Lazy Rendering:** Children werden nur gerendert wenn ausgeklappt
- **Data Caching:** Baumstruktur wird einmal aufgebaut und gecacht
- **CSS Transitions:** Smooth Animationen mit GPU-Beschleunigung

## Erweiterungsmöglichkeiten

### 1. Such-Funktion

```javascript
function searchTree(query) {
    const results = [];
    const tree = ResonanzTreeView.getTreeData();

    // Durchsuche alle Ebenen
    for (const resId in tree) {
        for (const katId in tree[resId].kategorien) {
            const kat = tree[resId].kategorien[katId];
            for (const nuance of kat.nuancen) {
                if (nuance.label.toLowerCase().includes(query.toLowerCase())) {
                    results.push(nuance);
                    // Auto-expand Parent-Knoten
                    ResonanzTreeView.toggleNode(resId);
                    ResonanzTreeView.toggleNode(`${resId}-${katId}`);
                }
            }
        }
    }

    return results;
}
```

### 2. Filter-Integration

```javascript
// Integration mit DimensionKategorieFilter
document.addEventListener('dimensionKategorieFilterChange', function(event) {
    const { dimension, kategorie } = event.detail;

    // Tree View entsprechend filtern/highlighten
    if (dimension) {
        ResonanzTreeView.collapseAll();
        ResonanzTreeView.toggleNode(dimension);
    }
});
```

### 3. Context-Menu

```javascript
// Right-Click auf Knoten
document.addEventListener('contextmenu', function(event) {
    if (event.target.closest('.tree-node-header')) {
        event.preventDefault();
        // Zeige Context-Menu
        showContextMenu(event.clientX, event.clientY);
    }
});
```

### 4. Export-Funktionen

```javascript
function exportTreeAsJSON() {
    const tree = ResonanzTreeView.getTreeData();
    const json = JSON.stringify(tree, null, 2);
    downloadFile('tree-export.json', json);
}

function exportTreeAsMarkdown() {
    const tree = ResonanzTreeView.getTreeData();
    let markdown = '# Resonanz-Hierarchie\n\n';

    for (const resId in tree) {
        const res = tree[resId];
        markdown += `## ${res.icon} ${res.label} (${res.count})\n\n`;

        for (const katId in res.kategorien) {
            const kat = res.kategorien[katId];
            markdown += `### ${kat.label} ${kat.id} (${kat.count})\n\n`;

            for (const nuance of kat.nuancen) {
                markdown += `- ${nuance.label} (${nuance.id})\n`;
            }
            markdown += '\n';
        }
    }

    downloadFile('tree-export.md', markdown);
}
```

## Browser-Kompatibilität

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari 14+
- ✅ Chrome Android 90+

## Bekannte Einschränkungen

1. **Keine Virtualisierung:** Bei sehr vielen Knoten kann die Performance leiden
2. **Keine Drag & Drop:** Knoten können nicht verschoben werden
3. **Keine Multi-Select:** Nur einzelne Knoten können ausgewählt werden

## Changelog

### Version 1.0.0 (2025-12-17)
- ✨ Initiale Implementierung
- 🎨 Vollständiges Styling
- 📱 Responsive Design
- 🔄 Expand/Collapse Funktionalität
- 📊 Automatische Zähler
- 🎨 Farbcodierung nach Resonanz

## Support

Bei Fragen oder Problemen:
- Dokumentation: `/docs/RESONANZ-TREE-VIEW.md`
- Test-Seite: `/test-resonanz-tree-view.html`
- Beispiele: Siehe "Verwendungsbeispiele" oben

## Lizenz

© 2025 Ti-age.de Alle Rechte vorbehalten.
