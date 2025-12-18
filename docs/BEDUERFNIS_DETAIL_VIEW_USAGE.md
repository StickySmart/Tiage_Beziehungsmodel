# Bedürfnis Detail-View - Nutzungsanleitung

**Version:** 1.0.0
**Datum:** 2025-12-18
**Komponente:** BeduerfnisDetailView.js

---

## 📋 Übersicht

Die **Bedürfnis Detail-View** Komponente zeigt detaillierte Informationen zu einem einzelnen Bedürfnis an:

- ✅ Wert mit GOD-Modifier-Breakdown (Gender, Orientierung, Dominanz)
- ✅ Typischer Archetyp-Wert aus Umfrage-Daten
- ✅ Abweichung mit Farbcodierung (🟢🟡🔴)
- ✅ Flache Taxonomie-Klassifikation (Kategorie, Dimension, Perspektive)
- ✅ Impact auf R-Faktoren und Scores
- ✅ Interaktive Funktionen (Basis ändern, ähnliche Bedürfnisse)

---

## ⚠️ WICHTIG: Basis-Wert aus Umfrage-Daten

**Zentrale Änderung:** Der Basis-Wert eines Bedürfnisses wird **standardmäßig aus den Umfrage-Daten** (ARCHETYP_KOHAERENZ) geladen, nicht aus einem fixen Wert!

### Wie funktioniert es?

```javascript
// Beispiel: Archetyp = Solopoly, Bedürfnis = #B90 (Kinderwunsch)

// 1. Basis-Wert wird aus Umfrage geladen
// Basis = 20 (typischer Wert für Solopoly aus ARCHETYP_KOHAERENZ)

// 2. GOD-Modifier werden hinzugefügt
// + Gender: +10 (Mann-Cis)
// + Orientierung: +5 (Heterosexuell)
// + Dominanz: +5 (Ausgeglichen)

// 3. Final-Wert = Basis + Modifier
// Final = 20 + 10 + 5 + 5 = 40

// 4. Abweichung = Final - Typisch
// Abweichung = 40 - 20 = 20 (da Basis = Typisch)
```

### Benutzer kann Basis überschreiben

Der Benutzer kann mit dem Button **"Basis ändern"** einen eigenen Wert setzen:

```javascript
// Benutzer setzt customBase auf 70
TiageState.set('ich.needs.#B90.customBase', 70);

// Dann:
// Basis = 70 (custom)
// Final = 70 + 10 + 5 + 5 = 90
// Abweichung = 90 - 20 = 70 (🔴 hohe Abweichung)
```

### Fallback-Hierarchie

1. **Erster Check**: `customBase` (vom Benutzer manuell gesetzt)
2. **Zweiter Check**: Typischer Archetyp-Wert aus `ARCHETYP_KOHAERENZ` ✅ **STANDARD**
3. **Letzter Fallback**: 50 (nur wenn keine Umfrage-Daten vorhanden)

---

## 🚀 Schnellstart

### 1. Dateien einbinden

```html
<!-- CSS -->
<link rel="stylesheet" href="css/beduerfnis-detail-view.css">

<!-- JavaScript Component -->
<script src="js/components/BeduerfnisDetailView.js"></script>
```

### 2. Komponente rendern

```javascript
// Einfachste Verwendung
const html = BeduerfnisDetailView.render('#B90', 'ich');
document.getElementById('container').innerHTML = html;

// Mit Optionen
const html = BeduerfnisDetailView.render('#B90', 'ich', {
    expanded: true  // Modifier-Breakdown standardmäßig ausgeklappt
});
```

---

## 📖 API-Dokumentation

### `BeduerfnisDetailView.render(needId, person, options)`

Rendert die komplette Detail-View für ein Bedürfnis.

**Parameter:**
- `needId` (string): Bedürfnis-ID (z.B. `'#B90'` oder `'kinderwunsch'`)
- `person` (string): `'ich'` oder `'partner'`
- `options` (object, optional):
  - `expanded` (boolean): Wenn `true`, ist Modifier-Breakdown standardmäßig ausgeklappt

**Rückgabe:** HTML-String

**Beispiel:**
```javascript
const html = BeduerfnisDetailView.render('#B90', 'ich', { expanded: true });
document.getElementById('my-container').innerHTML = html;
```

---

### `BeduerfnisDetailView.collectData(needId, person)`

Sammelt alle Daten für ein Bedürfnis (ohne Rendering).

**Parameter:**
- `needId` (string): Bedürfnis-ID
- `person` (string): `'ich'` oder `'partner'`

**Rückgabe:** Object mit folgender Struktur:
```javascript
{
    needId: '#B90',
    need: { id, name, tags, ... },
    baseValue: 50,
    modifiers: { gender: 10, orientierung: 5, dominanz: 5 },
    finalValue: 70,
    typical: { value: 20, archetyp: 'Solopoly', percentile: 78, range: '10-30' },
    deviation: 50,
    taxonomy: {
        kategorie: { id: '#K11', label: 'Lebensplanung' },
        dimension: { id: '#D1', label: 'Beziehungsphilosophie' },
        perspektive: { id: '#P1', label: 'Statistik' }
    },
    impact: [
        { type: 'resonance', factor: 2, name: 'Philosophie', value: -8, description: '...' },
        { type: 'category', id: '#K11', value: -12, ... },
        { type: 'dimension', id: '#D1', value: -8, ... }
    ],
    person: 'ich'
}
```

**Beispiel:**
```javascript
const data = BeduerfnisDetailView.collectData('#B90', 'ich');
console.log('Final-Wert:', data.finalValue);
console.log('Abweichung:', data.deviation);
```

---

### `BeduerfnisDetailView.toggleBreakdown(needId)`

Toggle Modifier-Breakdown (collapsed ↔ expanded).

**Parameter:**
- `needId` (string): Bedürfnis-ID

**Beispiel:**
```javascript
// Automatisch durch Klick auf "Dein Wert" getriggert
// Kann aber auch manuell aufgerufen werden:
BeduerfnisDetailView.toggleBreakdown('#B90');
```

---

### `BeduerfnisDetailView.editBase(needId, person)`

Öffnet Dialog zum Ändern des Basis-Werts.

**Parameter:**
- `needId` (string): Bedürfnis-ID
- `person` (string): `'ich'` oder `'partner'`

**Beispiel:**
```javascript
BeduerfnisDetailView.editBase('#B90', 'ich');
```

---

### `BeduerfnisDetailView.showSimilar(needId)`

Zeigt ähnliche Bedürfnisse an (Feature in Entwicklung).

**Parameter:**
- `needId` (string): Bedürfnis-ID

**Beispiel:**
```javascript
BeduerfnisDetailView.showSimilar('#B90');
```

---

## 🔌 Abhängigkeiten

Die Komponente benötigt folgende globale Objekte:

### Erforderlich:
- **`GfkBeduerfnisse`**: Bedürfnis-Katalog mit allen Definitionen
- **`TiageTaxonomie`**: Taxonomie-Definitionen (Kategorien, Dimensionen, Perspektiven)
- **`TiageModifiers`**: GOD-Modifier-System (Gender, Orientierung, Dominanz)

### Optional (mit Fallbacks):
- **`TiageState`**: Zentraler State-Manager (Fallback: 50 als Basis)
- **`TiageSynthesis.Constants.ARCHETYP_KOHAERENZ`**: Typische Archetyp-Werte (Fallback: keine Anzeige)
- **`window.LoadedArchetypProfile`**: Geladene Profile (Fallback: TiageState)
- **`window.personDimensions`**: Profil-Dimensionen (Fallback: keine Modifier)

---

## 🎨 Anpassung

### CSS-Variablen anpassen

```css
/* Eigene CSS-Datei nach beduerfnis-detail-view.css laden */
.beduerfnis-detail-view {
    border-radius: 16px;  /* Statt 12px */
    padding: 32px;        /* Statt 24px */
}

.beduerfnis-detail-view__header {
    color: #4a148c;       /* Eigene Farbe */
}
```

### Eigene Event-Handler

```javascript
// Nach dem Rendern Event-Listener hinzufügen
const container = document.getElementById('my-container');
container.innerHTML = BeduerfnisDetailView.render('#B90', 'ich');

// Eigener Handler für Basis-Änderung
const editBtn = container.querySelector('[onclick*="editBase"]');
editBtn.onclick = function(e) {
    e.preventDefault();
    // Eigene Logik hier
};
```

---

## 🧪 Testing

### Test-Datei öffnen

Öffne `test-beduerfnis-detail-view.html` im Browser:

```bash
open test-beduerfnis-detail-view.html
# oder
firefox test-beduerfnis-detail-view.html
```

### Verfügbare Tests

1. **Test 1: Standard-Anzeige** - Kinderwunsch mit positiven Modifiern
2. **Test 2: Negative Modifier** - Emotionale Sicherheit mit negativen Modifiern
3. **Test 3: Keine typischen Daten** - Fallback-Verhalten
4. **Test 4: Hohe Abweichung** - Abweichung >35 (roter Indikator)

---

## 📊 Beispiele

### Beispiel 1: In Modal einbetten

```javascript
function openNeedDetailModal(needId, person) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button onclick="this.closest('.modal-overlay').remove()">✕ Schließen</button>
            ${BeduerfnisDetailView.render(needId, person, { expanded: true })}
        </div>
    `;
    document.body.appendChild(modal);
}

// Verwenden
openNeedDetailModal('#B90', 'ich');
```

---

### Beispiel 2: In Liste integrieren

```javascript
const needs = ['#B90', '#B45', '#B12'];
const container = document.getElementById('needs-list');

needs.forEach(needId => {
    const html = BeduerfnisDetailView.render(needId, 'ich');
    container.innerHTML += html;
});
```

---

### Beispiel 3: Dynamische Updates

```javascript
// Initial rendern
const container = document.getElementById('detail-view');
container.innerHTML = BeduerfnisDetailView.render('#B90', 'ich');

// Nach Datenänderung neu rendern
function updateNeedView(needId, person) {
    const data = BeduerfnisDetailView.collectData(needId, person);

    // Prüfe ob Neurendering nötig
    if (data.finalValue !== lastKnownValue) {
        container.innerHTML = BeduerfnisDetailView.render(needId, person, {
            expanded: container.querySelector('.collapsed') === null
        });
        lastKnownValue = data.finalValue;
    }
}
```

---

## 🐛 Troubleshooting

### Problem: "Bedürfnis nicht gefunden"

**Lösung:** Prüfe ob `GfkBeduerfnisse.catalogue` existiert und die Need-ID korrekt ist:

```javascript
console.log(GfkBeduerfnisse.catalogue);  // Alle Bedürfnisse anzeigen
console.log(GfkBeduerfnisse.catalogue['B90']);  // Spezifisches Bedürfnis
```

---

### Problem: "Keine Modifier angezeigt"

**Lösung:** Prüfe ob `TiageModifiers` geladen ist und `personDimensions` gesetzt ist:

```javascript
console.log(TiageModifiers);
console.log(window.personDimensions);
```

---

### Problem: "Typisch (Umfrage): Keine Daten"

**Lösung:** Prüfe ob `TiageSynthesis.Constants.ARCHETYP_KOHAERENZ` Daten für den Archetyp enthält:

```javascript
console.log(TiageSynthesis.Constants.ARCHETYP_KOHAERENZ);
```

---

## 🔄 Migration von alter Version

Falls du eine ältere Version verwendest:

```javascript
// ALT (v0.x)
showNeedDetail('#B90');

// NEU (v1.0)
const html = BeduerfnisDetailView.render('#B90', 'ich');
document.getElementById('container').innerHTML = html;
```

---

## 📝 Changelog

### v1.0.0 (2025-12-18)
- ✅ Initial Release
- ✅ Implementierung gemäß finalisierter Spezifikation
- ✅ Vollständige CSS-Styling
- ✅ Test-Suite mit 4 Szenarien
- ✅ Dokumentation

---

## 📚 Weitere Ressourcen

- **Spezifikation:** `docs/BEDUERFNIS_DETAIL_VIEW_SPEC.md`
- **SSOT Analyse:** `docs/SSOT_KISS_SOC_ANALYSIS.md`
- **Test-Datei:** `test-beduerfnis-detail-view.html`
- **Komponente:** `js/components/BeduerfnisDetailView.js`
- **Styling:** `css/beduerfnis-detail-view.css`

---

**© 2025 Ti-age.de - Alle Rechte vorbehalten**
