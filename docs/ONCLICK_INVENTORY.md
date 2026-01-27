# onclick Inventar - archetype-interaction.html

**Erstellt:** 26. Januar 2026
**Quelle:** `archetype-interaction.html`
**Gesamtanzahl:** 346 onclick-Attribute
**Einzigartige Funktionen:** 73

---

## Übersicht

| Metrik | Wert |
|--------|------|
| Gesamt onclick | 346 |
| Einzigartige Funktionen | 73 |
| Häufigste Funktion | `event.stopPropagation()` (47×) |
| Zweit-häufigste | `selectArchetypeFromGrid()` (32×) |

---

## Top 10 Meistverwendete Funktionen

| Rang | Funktion | Anzahl | Zweck |
|------|----------|--------|-------|
| 1 | `event.stopPropagation()` | 47 | Modal-Event-Bubbling verhindern |
| 2 | `selectArchetypeFromGrid()` | 32 | Archetyp-Auswahl aus Grid |
| 3 | `handleDominanzStatusToggle()` | 32 | Dominanz-Status toggeln |
| 4 | `handleOrientierungStatusToggle()` | 32 | Orientierung-Status toggeln |
| 5 | `showDimensionTooltip()` | 23 | Dimensions-Tooltips anzeigen |
| 6 | `mobileGoToPage()` | 11 | Mobile Seitennavigation |
| 7 | `selectBindungsmuster()` | 8 | Bindungsmuster-Auswahl |
| 8 | `navigateArchetype()` | 8 | Archetyp-Navigation |
| 9 | `adjustAgodWeight()` | 8 | AGOD-Gewichtung anpassen |
| 10 | `event.preventDefault()` | 7 | Default-Verhalten verhindern |

---

## Migrations-Prioritäten für Phase 2

### SEHR HOCH (Modal-Pattern) - 47 Aufrufe

Diese können durch zentrales Event-Delegation ersetzt werden:

```html
<!-- VORHER -->
<div class="modal-overlay" onclick="closeModal(event)">
  <div class="modal-content" onclick="event.stopPropagation()">

<!-- NACHHER -->
<div class="modal-overlay" data-action="close-modal">
  <div class="modal-content" data-stop-propagation>
```

### HOCH (Dimension-Handler) - 96 Aufrufe

| Funktion | Anzahl | Migration |
|----------|--------|-----------|
| `handleDominanzStatusToggle()` | 32 | `data-action="toggle-dominanz-status"` |
| `handleOrientierungStatusToggle()` | 32 | `data-action="toggle-orientierung-status"` |
| `showDimensionTooltip()` | 23 | `data-action="show-dimension-tooltip"` |
| `handleSecondaryInteressiert()` | 4 | `data-action="toggle-secondary-interesse"` |
| Sonstige | 5 | - |

### HOCH (Archetyp-Auswahl) - 72 Aufrufe

| Funktion | Anzahl | Migration |
|----------|--------|-----------|
| `selectArchetypeFromGrid()` | 32 | `data-action="select-archetype" data-type="..."` |
| `navigateArchetype()` | 8 | `data-action="navigate-archetype" data-direction="..."` |
| `navigateFactorArchetype()` | 4 | `data-action="navigate-factor-archetype"` |
| `navigateTiageSyntheseArchetype()` | 4 | `data-action="navigate-synthese-archetype"` |
| Sonstige Navigation | 24 | - |

### MITTEL (Mobile) - 11 Aufrufe

| Funktion | Anzahl | Migration |
|----------|--------|-----------|
| `mobileGoToPage()` | 11 | `data-action="mobile-go-to-page" data-page="..."` |

### MITTEL (Slot Machine) - 10 Aufrufe

| Funktion | Anzahl | Migration |
|----------|--------|-----------|
| `selectBindungsmuster()` | 8 | `data-action="select-bindungsmuster"` |
| `startSlotMachine()` | 1 | `data-action="start-slot-machine"` |
| `toggleSlotExpand()` | 1 | `data-action="toggle-slot-expand"` |

### NIEDRIG (Sonstige) - ~110 Aufrufe

Einzelne Funktionen mit 1-6 Aufrufen.

---

## Detaillierte Auflistung nach Kategorie

### 1. Modal-Event-Control (54 Aufrufe)

#### `event.stopPropagation()` - 47 Aufrufe

Verwendet in allen Modal-Overlays:
- GFK-Modal
- Needs-Compare-Modal
- Definition-Modal
- Slot-Machine-Modal
- Comment-Modal
- Resonanzfaktoren-Modal
- Dimensions-Info-Modals
- Memory-Modal

**Migration:** Zentraler Event-Handler mit `data-stop-propagation` Attribut.

#### Modal-Close-Funktionen - 23 Aufrufe

| Funktion | Zeilen | Anzahl |
|----------|--------|--------|
| `closeGfkExplanationModal()` | 235, 242, 298, 302 | 4 |
| `closeCommentsListModal()` | 436, 440, 443 | 3 |
| `closeProfileReviewInfoModal()` | 382, 386, 428 | 3 |
| `closeGeschlechtInfoModal()` | 2174, 2178, 2257 | 3 |
| `closeDominanzInfoModal()` | 2262, 2266, 2286 | 3 |
| `closeOrientierungInfoModal()` | 2291, 2295, 2311 | 3 |
| `closeBodySoulModal()` | 2316, 2320, 2332 | 3 |
| `closeSlotMachineModal()` | 519, 523 | 2 |
| `closeFactorModal()` | 650, 654 | 2 |
| `closeTiageSyntheseModal()` | 686, 702 | 2 |
| `closeResonanzfaktorenModal()` | 748, 752 | 2 |
| `closeMemoryModal()` | 2410, 2415 | 2 |
| `closeMemoryDetailModal()` | 2431, 2435 | 2 |

**Migration:** `data-action="close-modal" data-modal="gfk"` etc.

---

### 2. Archetyp-Auswahl & Navigation (72 Aufrufe)

#### `selectArchetypeFromGrid()` - 32 Aufrufe

| Kontext | Zeilen | Parameter |
|---------|--------|-----------|
| Desktop ICH | 839, 844, 849, 854, 859, 864, 869, 874 | `('ich', 'archetyp')` |
| Desktop Partner | 995, 999, 1003, 1007, 1011, 1015, 1019, 1023 | `('partner', 'archetyp')` |
| Mobile ICH | 1109, 1114, 1119, 1124, 1129, 1134, 1139, 1144 | `('ich', 'archetyp')` |
| Mobile Partner | 1328, 1332, 1336, 1340, 1344, 1348, 1352, 1356 | `('partner', 'archetyp')` |

Archetypen: `single`, `duo`, `duoflex`, `solopoly`, `polyamor`, `ra`, `lat`, `aromantisch`

#### `navigateArchetype()` - 8 Aufrufe

| Zeilen | Parameter |
|--------|-----------|
| 823, 834 | `('ich', -1/1)` |
| 979, 990 | `('partner', -1/1)` |
| 1093, 1104 | Mobile ICH |
| 1312, 1323 | Mobile Partner |

---

### 3. Dimension-Status-Toggles (96 Aufrufe)

#### `handleDominanzStatusToggle()` - 32 Aufrufe

| Kontext | Zeilen |
|---------|--------|
| Mobile ICH | 1176-1198 |
| Mobile Partner | 1387-1409 |
| Modal ICH | 1656-1678 |
| Modal Partner | 1830-1858 |

#### `handleOrientierungStatusToggle()` - 32 Aufrufe

| Kontext | Zeilen |
|---------|--------|
| Mobile ICH | 1213-1242 |
| Mobile Partner | 1424-1453 |
| Modal ICH | 1625-1640 |
| Modal Partner | 1793-1812 |

---

### 4. Tooltip-Funktionen (29 Aufrufe)

#### `showDimensionTooltip()` - 23 Aufrufe

| Kontext | Zeilen |
|---------|--------|
| Desktop | 895, 900, 1043, 1048 |
| Mobile ICH | 1174, 1181, 1188, 1195 |
| Mobile Partner | 1385, 1392, 1399, 1406 |
| Modal | 1619, 1623, 1630, 1637, 1650, 1654, 1661, 1668, 1675, 1785, 1822 |

#### `showBodySoulModal()` - 6 Aufrufe

Zeilen: 885, 1033, 1157, 1368, 1610, 1776

---

### 5. Mobile Navigation (11 Aufrufe)

#### `mobileGoToPage()` - 11 Aufrufe

| Zeilen | Parameter |
|--------|-----------|
| 1256, 1267 | `(1)` |
| 1292, 1294 | `(2)` |
| 1302 | `(3)` |
| 1467, 1473 | `(2)` |
| 1572-1575 | `(1), (2), (3), (4)` |

---

### 6. AGOD-Gewichtung (8 Aufrufe)

#### `adjustAgodWeight()` - 8 Aufrufe

| Zeilen | Parameter |
|--------|-----------|
| 921, 924 | `('O', -5/+5)` |
| 928, 931 | `('A', -5/+5)` |
| 935, 938 | `('D', -5/+5)` |
| 942, 945 | `('G', -5/+5)` |

---

### 7. Bindungsmuster / Slot Machine (10 Aufrufe)

#### `selectBindungsmuster()` - 8 Aufrufe

| Zeilen | Parameter |
|--------|-----------|
| 537, 542, 547, 552 | `('primary', 'muster')` |
| 563, 567, 571, 575 | `('secondary', 'muster')` |

Muster: `sicher`, `aengstlich`, `vermeidend`, `desorganisiert`

#### Weitere

| Funktion | Zeile |
|----------|-------|
| `startSlotMachine()` | 583 |
| `toggleSlotExpand()` | 636 |

---

### 8. Content-Display (12 Aufrufe)

#### `showTiageSyntheseContent()` - 6 Aufrufe

| Zeilen | Parameter |
|--------|-----------|
| 689, 698 | `('score')` |
| 690, 699 | `('oshozen')` |
| 691, 700 | `('needs')` |

#### `scrollToCard()` - 6 Aufrufe

| Zeilen | Parameter |
|--------|-----------|
| 1867, 2339 | `(0)` |
| 1906, 2340 | `(1)` |
| 2341 | `(2)` |
| 2342 | `(3)` |

---

### 9. Sonstige Funktionen

| Funktion | Zeilen | Anzahl |
|----------|--------|--------|
| `openSlotMachineModal()` | 966, 1282 | 2 |
| `openResonanzfaktorenModal()` | 692, 701 | 2 |
| `toggleDimensionCollapse()` | 1167, 1204, 1378, 1415 | 4 |
| `toggleCollapsible()` | 1698, 1718 | 2 |
| `toggleMatchModalView()` | 2140, 2141 | 2 |
| `closeDefinitionModal()` | 2152, 2158 | 2 |
| `navigateDefinitionModal()` | 2155, 2157 | 2 |
| `closeCategoryModal()` | 2133, 2143 | 2 |
| `navigateCategoryArchetype()` | 2136, 2138 | 2 |
| `submitComment()` | 376 | 1 |
| `clearCommentsSearch()` | 455 | 1 |
| `clearAllStorage()` | 791 | 1 |
| `resetAll()` | 1259 | 1 |
| `goToIchAttributes()` | 642 | 1 |
| `TiageI18n.toggle()` | 474, 783 | 2 |
| `window.confirmAge()` | 497, 500 | 2 |

---

## Verteilung nach Element-Typ

| Element | Anzahl | Prozent |
|---------|--------|---------|
| `<button>` | ~180 | 52% |
| `<div>` | ~120 | 35% |
| `<span>` | ~25 | 7% |
| `<a>` | ~15 | 4% |
| `<label>` | ~6 | 2% |

---

## Migrations-Strategie

### Empfohlene Reihenfolge

1. **Modal-Pattern** (47 Aufrufe) - Einmal zentralisieren, alle profitieren
2. **Dimension-Toggles** (96 Aufrufe) - Größter Einzelblock
3. **Archetyp-Auswahl** (72 Aufrufe) - Kern-Interaktion
4. **Mobile-Navigation** (11 Aufrufe) - Überschaubar
5. **Rest** (~120 Aufrufe) - Nach und nach

### Erwartetes Ergebnis

| Metrik | Vorher | Nachher |
|--------|--------|---------|
| onclick-Attribute | 346 | 0 |
| data-action-Attribute | 0 | ~150 |
| Zentraler ActionHandler | - | 1 Datei |
| window.* Exports für onclick | ~120 | 0 |

---

## Andere HTML-Dateien

| Datei | onclick | Priorität |
|-------|---------|-----------|
| `needs-editor.html` | 12 | NIEDRIG |
| `tiagesyntheseStatistik.html` | 10 | NIEDRIG |
| `test-perspektiven-modal.html` | 9 | TEST |
| `tiagesyntheseUebersicht.html` | 8 | NIEDRIG |
| `tiagesyntheseProContra.html` | 7 | NIEDRIG |
| `tiagesyntheseResonanz.html` | 6 | NIEDRIG |
| `test-beduerfnis-detail-view.html` | 4 | TEST |
| `test-resonanz-tree-view.html` | 3 | TEST |
| `tiagesynthese.html` | 2 | NIEDRIG |

---

*Erstellt im Rahmen des Refactoring-Plans v2.0*
*Letzte Aktualisierung: 26. Januar 2026*
