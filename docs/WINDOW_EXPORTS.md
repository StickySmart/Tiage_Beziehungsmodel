# window.* Export-Liste - app-main.js

**Erstellt:** 26. Januar 2026
**Quelle:** `js/app-main.js`
**Gesamtanzahl:** ~150 Exports (mehr als die geschätzten 80!)

---

## Übersicht nach Kategorie

| Kategorie | Anzahl | Priorität für Migration |
|-----------|--------|-------------------------|
| Modal öffnen/schließen | 42 | HOCH - Häufig in onclick |
| Navigation | 18 | HOCH - Häufig in onclick |
| Dimension-Handler | 15 | HOCH - Kern-Interaktionen |
| UI-Sync | 8 | MITTEL - Intern |
| Slot Machine | 10 | MITTEL |
| ProfileReview | 20 | MITTEL |
| AGOD Gewichtung | 4 | NIEDRIG |
| Search | 8 | NIEDRIG |
| Sonstige | ~25 | NIEDRIG |

---

## Detaillierte Liste nach Zeile

### Statement-Objekte (Data, Zeilen 147-165)

| Zeile | Export | Typ | Beschreibung |
|-------|--------|-----|--------------|
| 149 | `window.archetypeStatements` | Object | Archetyp-Aussagen (DE/EN) |
| 153 | `window.dominanceStatements` | Object | Dominanz-Aussagen |
| 157 | `window.orientationStatements` | Object | Orientierung-Aussagen |
| 161 | `window.statusStatements` | Object | Status-Aussagen |
| 165 | `window.gfkStatements` | Object | GFK-Aussagen |

**Migration:** Diese bleiben global (Daten-Objekte, kein onclick).

---

### Age Verification (Zeile 3619)

| Zeile | Export | Verwendung |
|-------|--------|------------|
| 3619 | `window.confirmAge` | onclick in Age-Modal |

---

### Geschlecht (Zeile 4347)

| Zeile | Export | Verwendung |
|-------|--------|------------|
| 4347 | `window.setSecondaryGeschlechtAndSync` | Programmatisch |

---

### Attribute Modal (Zeilen 8902-8903)

| Zeile | Export | Verwendung |
|-------|--------|------------|
| 8902 | `window.openAttributeDefinitionModal` | onclick |
| 8903 | `window.closeAttributeDefinitionModal` | onclick |

---

### Resonanz Help Modal (Zeilen 9079-9080)

| Zeile | Export | Verwendung |
|-------|--------|------------|
| 9079 | `window.openResonanzHelpModal` | onclick |
| 9080 | `window.closeResonanzHelpModal` | onclick |

---

### Analysis Overview (Zeile 10298)

| Zeile | Export | Verwendung |
|-------|--------|------------|
| 10298 | `window.updateAnalysisOverview` | Programmatisch |

---

### Slot Machine (Zeilen 13059-13771)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 13059 | `window.openSlotMachineModal` | ✅ | Öffnet Slot Machine Modal |
| 13071 | `window.closeSlotMachineModal` | ✅ | Schließt Slot Machine Modal |
| 13087 | `window.goToIchAttributes` | ✅ | Geht zu ICH-Attributen |
| 13104 | `window.resetSlotMachine` | ✅ | Setzt Slot Machine zurück |
| 13169 | `window.showBindungTooltip` | ✅ | Zeigt Bindung-Tooltip |
| 13197 | `window.selectBindungsmuster` | ✅ | Wählt Bindungsmuster |
| 13220 | `window.startSlotMachine` | ✅ | Startet Slot Machine |
| 13724 | `window.toggleSlotExpand` | ✅ | Toggelt Slot-Expansion |
| 13771 | `window.applySlotResult` | ✅ | Wendet Slot-Ergebnis an |
| 14051 | `window.findBestIchMatch` | ✅ | Findet besten ICH-Match |

---

### Mobile Gewichtung (Zeilen 16360-16361)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 16360 | `window.updateMobileGewichtung` | ✅ | Aktualisiert mobile Gewichtung |
| 16361 | `window.resetMobileGewichtung` | ✅ | Setzt mobile Gewichtung zurück |

---

### Resonanzfaktoren Modal (Zeilen 18201-18322)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 18201 | `window.openResonanzfaktorenModal` | ✅ | Öffnet Resonanzfaktoren Modal |
| 18219 | `window.closeResonanzfaktorenModal` | ✅ | Schließt Resonanzfaktoren Modal |
| 18225 | `window.switchResonanzArchetyp` | ✅ | Wechselt Resonanz-Archetyp |
| 18322 | `window.navigateResonanzArchetype` | ✅ | Navigiert Resonanz-Archetyp |

---

### Value Derivation (Zeilen 18800-18809)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 18800 | `window.showValueDerivation` | ✅ | Zeigt Wert-Herleitung |
| 18809 | `window.closeValueDerivationPopup` | ✅ | Schließt Popup |

---

### Needs Synthese (Zeile 19453)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 19453 | `window.sortNeedsSyntheseContent` | ✅ | Sortiert Needs-Synthese |

---

### Haupt-Export-Block (Zeilen 21697-21952)

Dies ist der Haupt-Block mit den meisten Exports.

#### Modal-Funktionen (42)

| Zeile | Export | onclick | Kategorie |
|-------|--------|---------|-----------|
| 21697 | `window.showArchetypeInfo` | ✅ | Definition |
| 21698 | `window.openArchetypeInfo` | ✅ | Definition |
| 21699 | `window.openFactorModal` | ✅ | Factor |
| 21700 | `window.closeFactorModal` | ✅ | Factor |
| 21702 | `window.closeCategoryModal` | ✅ | Category |
| 21703 | `window.closeDefinitionModal` | ✅ | Definition |
| 21706 | `window.showArchetypeInfoByType` | ✅ | Definition |
| 21707 | `window.openCommentModal` | ✅ | Comment |
| 21708 | `window.closeCommentModal` | ✅ | Comment |
| 21709 | `window.closeFeedbackModal` | ✅ | Feedback |
| 21711 | `window.openCommentsListModal` | ✅ | Comments |
| 21712 | `window.closeCommentsListModal` | ✅ | Comments |
| 21716 | `window.openProContraModal` | ✅ | ProContra |
| 21717 | `window.closeProContraModal` | ✅ | ProContra |
| 21734 | `window.closePathosLogosModal` | ✅ | PathosLogos |
| 21739 | `window.openTiageSyntheseModal` | ✅ | Synthese |
| 21740 | `window.closeTiageSyntheseModal` | ✅ | Synthese |
| 21746 | `window.closeNeedsCompareModal` | ✅ | Needs |
| 21747 | `window.openNeedDefinitionModal` | ✅ | Needs |
| 21750 | `window.closeNeedDefinitionModal` | ✅ | Needs |
| 21751 | `window.openGfkExplanationModal` | ✅ | GFK |
| 21752 | `window.openPaarungExplanationModal` | ✅ | Paarung |
| 21753 | `window.closePaarungExplanationModal` | ✅ | Paarung |
| 21757 | `window.openNeedsFullModal` | ✅ | Needs |
| 21761 | `window.openGfkExplanationModal` | ✅ | GFK (Duplikat) |
| 21762 | `window.openPaarungExplanationModal` | ✅ | Paarung (Duplikat) |
| 21769 | `window.showGeschlechtInfoModal` | ✅ | Dimension |
| 21770 | `window.closeGeschlechtInfoModal` | ✅ | Dimension |
| 21771 | `window.showDominanzInfoModal` | ✅ | Dimension |
| 21772 | `window.closeDominanzInfoModal` | ✅ | Dimension |
| 21773 | `window.showOrientierungInfoModal` | ✅ | Dimension |
| 21774 | `window.closeOrientierungInfoModal` | ✅ | Dimension |
| 21775 | `window.showBodySoulModal` | ✅ | Dimension |
| 21776 | `window.closeBodySoulModal` | ✅ | Dimension |
| 21777 | `window.closeGfkExplanationModal` | ✅ | GFK |
| 21805 | `window.openPathosLogosModal` | ✅ | PathosLogos |
| 21823 | `window.openCategoryModal` | ✅ | Category |
| 21824 | `window.openDefinitionModal` | ✅ | Definition |
| 21825 | `window.openMatchModal` | ✅ | Match |
| 21828 | `window.openSingleCategoryModal` | ✅ | Category |

#### Navigation-Funktionen (18)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 21701 | `window.navigateFactorArchetype` | ✅ | Navigiert Faktor-Archetyp |
| 21704 | `window.navigateDefinition` | ✅ | Navigiert Definition |
| 21705 | `window.navigateDefinitionToIndex` | ✅ | Navigiert zu Index |
| 21710 | `window.navigateArchetype` | ✅ | Navigiert Archetyp |
| 21718 | `window.navigateProContraArchetype` | ✅ | Navigiert ProContra |
| 21721 | `window.selectArchetypeFromGrid` | ✅ | Wählt aus Grid |
| 21722 | `window.updateArchetypeGrid` | - | Aktualisiert Grid |
| 21723 | `window.navigateArchetypeOnPage2` | ✅ | Navigiert auf Page 2 |
| 21724 | `window.navigateArchetypeOnPage3` | ✅ | Navigiert auf Page 3 |
| 21725 | `window.findBestPartnerMatch` | ✅ | Findet besten Partner |
| 21736 | `window.navigatePathosLogosArchetype` | ✅ | Navigiert PathosLogos |
| 21742 | `window.navigateTiageSyntheseArchetype` | ✅ | Navigiert Synthese |
| 21815 | `window.navigatePrev` | ✅ | Vorheriger Archetyp |
| 21816 | `window.navigateNext` | ✅ | Nächster Archetyp |
| 21817 | `window.scrollToCard` | ✅ | Scrollt zu Card |
| 21829 | `window.navigateCategoryPrev` | ✅ | Vorherige Kategorie |
| 21830 | `window.navigateCategoryNext` | ✅ | Nächste Kategorie |
| 21831 | `window.navigateCategoryArchetype` | ✅ | Navigiert Kategorie-Archetyp |
| 21837 | `window.navigateDefinitionModal` | ✅ | Navigiert Definition-Modal |

#### Dimension-Handler (15)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 21765 | `window.toggleAllDimensionsCollapse` | ✅ | Toggelt alle |
| 21766 | `window.toggleDimensionCollapse` | ✅ | Toggelt eine |
| 21767 | `window.showDimensionTooltip` | ✅ | Zeigt Tooltip |
| 21768 | `window.closeDimensionTooltip` | ✅ | Schließt Tooltip |
| 21780 | `window.handleGeschlechtClick` | ✅ | Geschlecht-Klick |
| 21781 | `window.handleGeschlechtPClick` | ✅ | Geschlecht-P-Klick |
| 21782 | `window.handleGeschlechtSClick` | ✅ | Geschlecht-S-Klick |
| 21783 | `window.handleDominanzClick` | ✅ | Dominanz-Klick |
| 21784 | `window.handleOrientierungClick` | ✅ | Orientierung-Klick |
| 21785 | `window.handleGfkClick` | ✅ | GFK-Klick |
| 21788 | `window.handleDominanzStatusToggle` | ✅ | Dominanz-Status-Toggle |
| 21789 | `window.handleOrientierungStatusToggle` | ✅ | Orientierung-Status-Toggle |
| 21790 | `window.syncMobileDominanzStatusButtons` | - | Synct Mobile-Buttons |
| 21791 | `window.syncMobileOrientierungStatusButtons` | - | Synct Mobile-Buttons |

#### UI-Sync (8)

| Zeile | Export | Verwendung |
|-------|--------|------------|
| 21794 | `window.syncGeschlechtUI` | Programmatisch |
| 21795 | `window.syncDominanzUI` | Programmatisch |
| 21796 | `window.syncOrientierungUI` | Programmatisch |
| 21797 | `window.updateAll` | **KRITISCH** |
| 21798 | `window.saveSelectionToStorage` | **KRITISCH** |
| 21735 | `window.showPathosLogosContent` | Tab-Switch |
| 21741 | `window.showTiageSyntheseContent` | Tab-Switch |
| 21759 | `window.switchNeedsFullModalTab` | Tab-Switch |

#### AGOD Gewichtung (4)

| Zeile | Export | onclick |
|-------|--------|---------|
| 21728 | `window.updateAgodWeight` | ✅ |
| 21729 | `window.adjustAgodWeight` | ✅ |
| 21730 | `window.getAgodWeights` | - |
| 21731 | `window.initAgodWeightInputs` | - |

#### Sonstige im Haupt-Block

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 21713 | `window.toggleReplyForm` | ✅ | Toggelt Antwort-Form |
| 21714 | `window.submitReply` | ✅ | Sendet Antwort |
| 21748 | `window.openNeedWithResonance` | ✅ | Öffnet Need mit Resonanz |
| 21749 | `window.getResonanceDataForNeed` | - | Holt Resonanz-Daten |
| 21760 | `window.sortNeedsFullModal` | ✅ | Sortiert Needs |
| 21808 | `window.submitComment` | ✅ | Sendet Kommentar |
| 21809 | `window.clearCommentsSearch` | ✅ | Löscht Suche |
| 21812 | `window.selectPartner` | ✅ | **KRITISCH** |
| 21820 | `window.updateAllTranslations` | - | Aktualisiert Übersetzungen |
| 21832 | `window.showCategoryDetails` | ✅ | Zeigt Kategorie-Details |
| 21833 | `window.openTagTooltip` | ✅ | Öffnet Tag-Tooltip |
| 21834 | `window.closeTagTooltip` | ✅ | Schließt Tag-Tooltip |
| 21838 | `window.confirmDefinitionSelection` | ✅ | Bestätigt Auswahl |
| 21841 | `window.toggleMatchModalView` | ✅ | Toggelt Match-View |
| 21844 | `window.openFeedbackModalWithContext` | ✅ | Öffnet Feedback |
| 21845 | `window.openReplyModal` | ✅ | Öffnet Antwort |
| 21848 | `window.toggleLogosWarning` | ✅ | Toggelt Warning |
| 21849 | `window.showPathosLogosInfo` | ✅ | Zeigt Info |
| 21850 | `window.showSubDimensionInfo` | ✅ | Zeigt Sub-Info |
| 21853 | `window.mobileGoToPage` | ✅ | Mobile Navigation |
| 21854 | `window.toggleMobileCategory` | ✅ | Toggelt Mobile-Kategorie |
| 21857 | `window.toggleCollapsible` | ✅ | Toggelt Collapsible |
| 21858 | `window.resetAll` | ✅ | **KRITISCH** |
| 21862 | `window.handleSecondaryInteressiert` | ✅ | Handler |
| 21865 | `window.handleOrientierungSecondaryInteressiert` | ✅ | Handler |
| 21952 | `window.getSelectedArchetype` | - | Holt Archetyp |

---

### ProfileReview Block (Zeilen 22872-24248)

| Zeile | Export | onclick | Beschreibung |
|-------|--------|---------|--------------|
| 22872 | `window.filterProfileReviewByNeed` | ✅ | Filtert nach Need |
| 22944 | `window.resetProfileReviewFilter` | ✅ | Setzt Filter zurück |
| 22979 | `window.clearProfileReviewSearch` | ✅ | Löscht Suche |
| 23564 | `window.hideSearchSuggestions` | ✅ | Versteckt Vorschläge |
| 23577 | `window.handleIntelligentSearch` | ✅ | Intelligente Suche |
| 23590 | `window.showSearchSuggestions` | ✅ | Zeigt Vorschläge |
| 23721 | `window.displayActiveSuggestion` | - | Zeigt aktiven Vorschlag |
| 23747 | `window.clearActiveSuggestion` | - | Löscht aktiven Vorschlag |
| 23812 | `window.handleSearchKeydown` | - | Keydown-Handler |
| 23855 | `window.clearProfileReviewSearch` | ✅ | Duplikat |
| 23900 | `window.updateSourceExplanation` | ✅ | Aktualisiert Erklärung |
| 23915 | `window.updateProfileReviewSlider` | ✅ | Aktualisiert Slider |
| 23926 | `window.trackProfileReviewChange` | - | Trackt Änderung |
| 23933 | `window.toggleProfileBtn` | ✅ | Toggelt Button |
| 23946 | `window.setProfileBtnState` | - | Setzt Button-State |
| 24002 | `window.selectTripleBtn` | ✅ | Wählt Triple-Button |
| 24130 | `window.reloadProfileAttributesAfterGenderChange` | - | Reload nach Gender |
| 24143 | `window.selectToggleBtn` | ✅ | Wählt Toggle-Button |
| 24152 | `window.getToggleBtnValue` | - | Holt Toggle-Wert |
| 24166 | `window.setToggleBtnValue` | - | Setzt Toggle-Wert |
| 24175 | `window.getTripleBtnValue` | - | Holt Triple-Wert |
| 24189 | `window.setTripleBtnValue` | - | Setzt Triple-Wert |
| 24220 | `window.filterProfileReviewAttributes` | ✅ | Filtert Attribute |
| 24237 | `window.showProfileReviewInfo` | ✅ | Zeigt Info |
| 24248 | `window.closeProfileReviewInfoModal` | ✅ | Schließt Info-Modal |

---

## Migrations-Prioritäten

### PHASE 2.4.1 - Pilot (Comment Modal) - 6 Funktionen
- `openCommentModal`
- `closeCommentModal`
- `submitComment`
- `toggleReplyForm`
- `submitReply`
- `clearCommentsSearch`

### PHASE 2.4.2 - Definition Modal - 8 Funktionen
- `openDefinitionModal`
- `closeDefinitionModal`
- `navigateDefinition`
- `navigateDefinitionToIndex`
- `navigateDefinitionModal`
- `showArchetypeInfoByType`
- `confirmDefinitionSelection`
- `showArchetypeInfo`

### PHASE 2.4.3 - Factor Detail Modal - 6 Funktionen
- `openFactorModal`
- `closeFactorModal`
- `navigateFactorArchetype`
- `showPathosLogosContent`
- `showTiageSyntheseContent`
- `switchNeedsFullModalTab`

### PHASE 2.4.4 - Dimensions Modals - 15 Funktionen
- Alle Geschlecht/Dominanz/Orientierung/BodySoul Modal-Funktionen

### PHASE 2.4.5+ - Rest (~115 Funktionen)
- Nach Priorität und Abhängigkeiten

---

## Statistik

| Metrik | Wert |
|--------|------|
| **Gesamt window.* Exports** | ~150 |
| **Davon in onclick verwendet** | ~120 (80%) |
| **Nur programmatisch** | ~30 (20%) |
| **Kritische Funktionen** | 5 (updateAll, saveSelectionToStorage, selectPartner, resetAll, loadSelectionFromStorage) |

---

## Nächste Schritte

1. ✅ window.* Export-Liste erstellt
2. ⏳ onclick-Inventar erstellen (welche HTML-Elemente rufen welche Funktion auf)
3. ⏳ Abhängigkeitsgraph (welche Funktion ruft welche andere auf)

---

*Erstellt im Rahmen des Refactoring-Plans v2.0*
*Letzte Aktualisierung: 26. Januar 2026*
