# Function Inventory - app-main.js

**Erstellt:** 26. Januar 2026
**Quelle:** `js/app-main.js`
**Gesamtzeilen:** 24.559
**Gesamtfunktionen:** 558

---

## Übersicht nach Bereichen

| # | Bereich | Zeilen | Funktionen | Ziel-Modul |
|---|---------|--------|------------|------------|
| 1 | MAIN APPLICATION | 13-2628 | 74 | `core/init.js`, `ui/*` |
| 2 | Definition Modal | 2629-3333 | 14 | `modals/definitionModal.js` |
| 3 | Feedback System | 3333-3776 | 23 | `legacy/feedbackStubs.js` |
| 4 | Extended Dimensions | 3776-9575 | 87 | `dimensions/*` |
| 5 | GFK-Matching | 9576-9997 | 37 | `matching/gfkMatching.js` |
| 6 | Desktop Selection | 9998-10332 | 18 | `ui/desktopSelection.js` |
| 7 | Pathos/Logos Check | 10333-10768 | 29 | `matching/pathosLogos.js` |
| 8 | Dimension Modifiers | 10769-10983 | 17 | `dimensions/modifiers.js` |
| 9 | 4-Factor Model | 10984-12434 | 52 | `matching/fourFactorModel.js` |
| 10 | Side-by-Side | 12435-15619 | 61 | `comparison/sideBySide.js` |
| 11 | Mobile Multi-Page | 15620-16218 | 14 | `mobile/multiPage.js` |
| 12 | Mobile Gewichtung | 16219-16337 | 7 | `mobile/mobileGewichtung.js` |
| 13 | Mobile Geschlecht Grids | 16338-16850 | 6 | `mobile/mobileGeschlecht.js` |
| 14 | Factor Detail Modal | 16851-20127 | 79 | `modals/factorDetailModal.js` |
| 15 | Comment Modal | 20128-20237 | 3 | `modals/commentModal.js` |
| 16 | Comments List | 20238-20729 | 19 | `modals/commentModal.js` |
| 17 | Visitor ID & Rate Limit | 20730-20975 | 13 | `persistence/visitorTracking.js` |
| 18 | LocalStorage Persistence | 21003-24559 | 67 | `persistence/localStorage.js` |
| | **GESAMT** | | **558** | |

---

## Detaillierte Funktionsliste

### 1. MAIN APPLICATION (74 Funktionen, Zeilen 13-2628)

Kerninitialisierung, Datenladung und Haupt-UI-Orchestrierung.

| # | Funktion | Zeile | Typ | Beschreibung |
|---|----------|-------|-----|--------------|
| 1 | `getArchetypeStatements` | 174 | declaration | Holt sprachspezifische Archetyp-Statements |
| 2 | `getDominanceStatements` | 186 | declaration | Holt Dominanz-Kompatibilitäts-Statements |
| 3 | `getPrimaryDominance` | 188 | arrow | Extrahiert primäre Dominanz aus Multi-Select |
| 4 | `getOrientierungStatements` | 217 | declaration | Bewertet Orientierungs- & Gender-Kompatibilität |
| 5 | `extractEffectiveGender` | 224 | arrow | Extrahiert effektives Geschlecht (inkl. Trans) |
| 6 | `getPrimaryOrientation` | 249 | arrow | Extrahiert primäre Orientierung |
| 7 | `isMaleG` | 275 | arrow | Prüft ob Geschlecht männlich ist |
| 8 | `isFemaleG` | 280 | arrow | Prüft ob Geschlecht weiblich ist |
| 9 | `gleichesGeschlecht` | 285 | arrow | Prüft ob zwei Geschlechter gleich sind |
| 10 | `getStatusStatements` | 341 | declaration | Bewertet kombinierte Sicherheit aller Dimensionen |
| 11 | `getPersonStatus` | 349 | arrow | Holt Dimensions-Status-Zusammenfassung |
| 12 | `normalizeTagName` | 1124 | declaration | Normalisiert Tag-Namen für Lookup |
| 13 | `getTagTooltip` | 1133 | declaration | Holt Tooltip-Inhalt für Tag |
| 14 | `generateFallbackTooltip` | 1172 | declaration | Generiert Fallback-Tooltip |
| 15 | `loadData` | 1207 | declaration | Lädt Archetyp-Daten vom Server |
| 16 | `getFallbackData` | 1250 | declaration | Liefert Fallback-Archetyp-Daten |
| 17 | `initApp` | 1268 | declaration | **KRITISCH** - Initialisiert Anwendung |
| 18 | `initGreetingHint` | 1302 | declaration | Initialisiert Begrüßungs-Hinweis |
| 19 | `initDimensionInfoLinks` | 1370 | declaration | Richtet Dimensions-Info-Modal-Links ein |
| 20 | `updateAll` | 1404 | declaration | **KRITISCH** - Orchestriert alle UI-Updates |
| 21 | `updateTheme` | 1424 | declaration | Aktualisiert Anwendungs-Theme |
| 22 | `updateMyType` | 1428 | declaration | Aktualisiert "Mein Archetyp"-Anzeige |
| 23 | `updatePartnerSelector` | 1471 | declaration | Aktualisiert Partner-Auswahl-Dropdown |
| 24 | `selectPartner` | 1492 | declaration | **KRITISCH** - Wählt Partner und triggert Vergleich |
| 25 | `updateTopAndChallenge` | 1518 | declaration | Aktualisiert Top-Matches und Challenges |
| 26 | `updatePartnerView` | 1562 | declaration | Aktualisiert Partner-View-Anzeige |
| 27 | `drawRadarChart` | 1594 | declaration | Zeichnet Kompatibilitäts-Radar-Chart |
| 28 | `angle` | 1607 | arrow | Berechnet Winkel für Radar-Punkt |
| 29 | `r` | 1619 | arrow | Berechnet Radius für Radar-Punkt |
| 30 | `angle` | 1620 | arrow | Berechnet Winkel für Verbindungslinien |
| 31 | `r` | 1628 | arrow | Berechnet Radius für zweiten Archetyp |
| 32 | `angle` | 1629 | arrow | Berechnet Winkel für zweiten Archetyp |
| 33 | `updateCategoryBars` | 1642 | declaration | Aktualisiert Kategorie-Balken |
| 34 | `getScoreColor` | 1667 | declaration | Holt Farbe für Kompatibilitäts-Score |
| 35 | `getScoreGradientColor` | 1674 | declaration | Generiert Farbverlauf für Score |
| 36 | `t` | 1690 | arrow | Interpolationsparameter für Gradient |
| 37 | `initAgodWeightInputs` | 1714 | declaration | Initialisiert AGOD-Gewichtungs-Controls |
| 38 | `updateAgodWeight` | 1784 | declaration | Aktualisiert einzelnen AGOD-Gewichtungswert |
| 39 | `adjustAgodWeight` | 1842 | declaration | Passt AGOD-Gewichtung um Delta an |
| 40 | `updateAgodStickBars` | 1851 | declaration | Aktualisiert Gewichtungs-Visualisierung |
| 41 | `height` | 1859 | arrow | Berechnet Balkenhöhe aus Gewichtung |
| 42 | `getAgodWeights` | 1870 | declaration | Holt alle AGOD-Gewichtungen |
| 43 | `getAgodWeightSum` | 1886 | declaration | Berechnet AGOD-Gewichtungssumme |
| 44 | `updateAgodWeightSumLabel` | 1893 | declaration | Aktualisiert Gewichtungssummen-Label |
| 45 | `saveAgodWeightsToSession` | 1907 | declaration | Speichert AGOD-Gewichtungen in Session |
| 46 | `getAgodWeightsFromSession` | 1931 | declaration | Holt AGOD-Gewichtungen aus Session |
| 47 | `updateSyntheseScoreCycle` | 1953 | declaration | Aktualisiert Score-Cycle in Synthese-Modal |
| 48 | `triggerLightbulbBlink` | 2028 | declaration | Triggert Glühbirnen-Blink-Animation |
| 49 | `stopLightbulbBlink` | 2040 | declaration | Stoppt Glühbirnen-Blink-Animation |
| 50 | `getBarClass` | 2047 | declaration | Gibt CSS-Klasse für Balken zurück |
| 51 | `toggleCollapsible` | 2053 | declaration | Toggelt zusammenklappbare Sektion |
| 52 | `toggleDimensionCollapse` | 2058 | declaration | Toggelt Dimensions-Collapse |
| 53 | `toggleAllDimensionsCollapse` | 2066 | declaration | Toggelt alle Dimensionen-Collapse |
| 54 | `toggleDesktopFactor` | 2118 | declaration | Toggelt Desktop-Faktor-Expand |
| 55 | `updateDesktopFactorFoldButton` | 2130 | declaration | Aktualisiert Fold-Button-Status |
| 56 | `updateDesktopFactorContent` | 2162 | declaration | Aktualisiert Desktop-Faktor-Inhalt |
| 57 | `scrollToCard` | 2209 | declaration | Scrollt zu spezifischer Archetyp-Card |
| 58 | `updateNavDots` | 2217 | declaration | Aktualisiert Navigation-Dots |
| 59 | `navigatePrev` | 2239 | declaration | Navigiert zum vorherigen Archetyp |
| 60 | `navigateNext` | 2248 | declaration | Navigiert zum nächsten Archetyp |
| 61 | `updateLegendCategories` | 2258 | declaration | Aktualisiert Legenden-Kategorien |
| 62 | `openCategoryModal` | 2303 | declaration | Öffnet Kategorie-Details-Modal |
| 63 | `openSingleCategoryModal` | 2315 | declaration | Öffnet einzelne Kategorie im Modal |
| 64 | `navigateCategoryPrev` | 2326 | declaration | Navigiert zur vorherigen Kategorie |
| 65 | `navigateCategoryNext` | 2333 | declaration | Navigiert zur nächsten Kategorie |
| 66 | `getCategoryModalContent` | 2340 | declaration | Generiert Kategorie-Modal-Inhalt |
| 67 | `renderTagWithTooltip` | 2399 | declaration | Rendert Tag mit Tooltip |
| 68 | `switchTooltipType` | 2464 | declaration | Wechselt Tooltip-Archetyp-Typ |
| 69 | `openTagTooltip` | 2527 | declaration | Öffnet Tag-Tooltip |
| 70 | `left` | 2549 | arrow | Berechnet Tooltip-Links-Position |
| 71 | `closeTagTooltip` | 2558 | declaration | Schließt Tag-Tooltip |
| 72 | `closeCategoryModal` | 2572 | declaration | Schließt Kategorie-Modal |
| 73 | `openDefinitionModal` | 2581 | declaration | Öffnet Archetyp-Definition-Modal |
| 74 | `closeDefinitionModal` | 2622 | declaration | Schließt Definition-Modal |

---

### 2. Definition Modal (14 Funktionen, Zeilen 2629-3333)

Archetyp-Definition-Anzeige und Swipe-Navigation.

| # | Funktion | Zeile | Typ | Beschreibung |
|---|----------|-------|-----|--------------|
| 1 | `handleDefinitionTouchStart` | 2635 | declaration | Touch-Start auf Definition-Modal |
| 2 | `handleDefinitionTouchEnd` | 2639 | declaration | Touch-End für Swipe-Navigation |
| 3 | `navigateDefinition` | 2647 | declaration | Navigiert zwischen Definitionen |
| 4 | `navigateDefinitionModal` | 2672 | declaration | Alias für Button-onclick |
| 5 | `showArchetypeInfoByType` | 2676 | declaration | Zeigt Archetyp-Info nach Typ-ID |
| 6 | `navigateDefinitionToIndex` | 2826 | declaration | Navigiert zu spezifischem Index |
| 7 | `confirmDefinitionSelection` | 2847 | declaration | Bestätigt Archetyp-Auswahl |
| 8 | `getShortDef` | 2880 | declaration | Holt Kurz-Definition für Tooltip |
| 9 | `toggleMatchModalView` | 2892 | declaration | Toggelt Pro/Contra vs. Synthese |
| 10 | `generateDynamicPro` | 2914 | declaration | Generiert dynamische Pros |
| 11 | `generateDynamicContra` | 2956 | declaration | Generiert dynamische Contras |
| 12 | `generateSynthesisSection` | 3002 | declaration | Generiert psychologische Synthese |
| 13 | `openMatchModal` | 3147 | declaration | Öffnet Kompatibilitäts-Modal |
| 14 | `getMatchModalContent` | 3188 | declaration | Generiert Match-Modal-Inhalt |

---

### 3. Feedback System (23 Funktionen, Zeilen 3333-3776)

Kommentar-/Feedback-Management (teilweise deprecated).

| # | Funktion | Zeile | Typ | Beschreibung |
|---|----------|-------|-----|--------------|
| 1 | `openFeedbackModal` | 3337 | declaration | **STUB** - Deprecated |
| 2 | `openFeedbackModalWithContext` | 3338 | declaration | **STUB** - Verwendet commentModal |
| 3 | `closeFeedbackModal` | 3339 | declaration | **STUB** - Deprecated |
| 4 | `initStarRatings` | 3340 | declaration | **STUB** - Deprecated |
| 5 | `saveLocalFeedback` | 3344 | declaration | Speichert Feedback in localStorage |
| 6 | `getLocalFeedback` | 3352 | declaration | Holt Feedback aus localStorage |
| 7 | `loadFeedback` | 3357 | declaration | Lädt alle Feedbacks |
| 8 | `populateTypeFilters` | 3382 | declaration | Füllt Typ-Dropdowns für Filter |
| 9 | `renderFeedbackList` | 3395 | declaration | Rendert gefilterte Feedback-Liste |
| 10 | `kontextId` | 3400 | arrow | Extrahiert Kontext-ID |
| 11 | `name` | 3401 | arrow | Extrahiert Namen |
| 12 | `titel` | 3402 | arrow | Extrahiert Titel |
| 13 | `kommentar` | 3403 | arrow | Extrahiert Kommentar |
| 14 | `aRating` | 3452 | arrow | Berechnet Rating-Summe |
| 15 | `bRating` | 3453 | arrow | Berechnet Rating für Sort |
| 16 | `renderFeedbackItem` | 3473 | declaration | Rendert einzelnes Feedback-Item |
| 17 | `openReplyModal` | 3526 | declaration | Öffnet Antwort-Modal |
| 18 | `initAdvancedFilters` | 3546 | declaration | Initialisiert erweiterte Filter |
| 19 | `initFeedbackSystem` | 3584 | declaration | Initialisiert Feedback-System |
| 20 | `checkAgeVerification` | 3590 | declaration | Prüft Altersverifikation |
| 21 | `confirmAge` | 3651 | declaration | Bestätigt Alter |
| 22 | `initAgeVerification` | 3656 | declaration | Initialisiert Altersverifikation |
| 23 | `handleAgeConfirm` | 3662 | declaration | Behandelt Alters-Bestätigung |

---

### 4. Extended Dimensions (87 Funktionen, Zeilen 3776-9575)

Geschlecht, Dominanz, Orientierung - Auswahl und UI.

**Untergruppen:**

#### 4.1 Tooltip-Funktionen (2)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 1 | `showDimensionTooltip` | 3780 | Zeigt Dimensions-Tooltip |
| 2 | `closeDimensionTooltip` | 3793 | Schließt Dimensions-Tooltip |

#### 4.2 Info-Modal Öffnen/Schließen (8)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 3 | `showGeschlechtInfoModal` | 3800 | Öffnet Gender-Info-Modal |
| 4 | `closeGeschlechtInfoModal` | 3804 | Schließt Gender-Info-Modal |
| 5 | `showDominanzInfoModal` | 3811 | Öffnet Dominanz-Info-Modal |
| 6 | `closeDominanzInfoModal` | 3815 | Schließt Dominanz-Info-Modal |
| 7 | `showOrientierungInfoModal` | 3822 | Öffnet Orientierung-Info-Modal |
| 8 | `closeOrientierungInfoModal` | 3826 | Schließt Orientierung-Info-Modal |
| 9 | `showBodySoulModal` | 3833 | Öffnet Body/Soul-Modal |
| 10 | `closeBodySoulModal` | 3837 | Schließt Body/Soul-Modal |

#### 4.3 Geschlecht-Handler (18)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 11 | `handleGeschlechtClick` | 3853 | Behandelt Gender-Auswahl-Klick |
| 12 | `handleGeschlechtPClick` | 3980 | Behandelt primären Gender-Klick |
| 13 | `handleGeschlechtSClick` | 4060 | Behandelt sekundären Gender-Klick |
| 14 | `updateGeschlechtSGrid` | 4140 | Aktualisiert sekundäres Gender-Grid |
| 15 | `updateSingleSGrid` | 4152 | Aktualisiert einzelnes S-Grid |
| 16 | `syncGeschlechtState` | 4201 | Synct Gender-State |
| 17 | `updateGeschlechtNeedsSelection` | 4220 | Aktualisiert Gender-Needs |
| 18 | `handleGeschlechtClick` | 4234 | Legacy-Alias |
| 19 | `handleGeschlechtPrimaryClick` | 4237 | Legacy-Alias |
| 20 | `handleGeschlechtSecondaryClick` | 4240 | Legacy-Alias |
| 21 | `syncGeschlechtUI` | 4248 | Synct Gender-UI |
| 22 | `setSecondaryGeschlechtAndSync` | 4331 | Setzt sekundäres Geschlecht |
| 23 | `getGeschlechtSummary` | 4352 | Holt Gender-Summary |
| 24 | `getGeschlechtGridSummary` | 4369 | Holt Gender-Grid-Summary |
| 25 | `updateGeschlechtSummary` | 4385 | Aktualisiert Gender-Summary |
| 26 | `hasGeschlechtSelected` | 4417 | Prüft ob Gender ausgewählt |
| 27 | `handleGeschlechtHover` | 4428 | Behandelt Gender-Button-Hover |
| 28 | `initGeschlechtHoverEvents` | 4624 | Initialisiert Gender-Hover-Events |

#### 4.4 Dimension-Buttons Init (1)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 29 | `initDimensionButtons` | 4475 | Initialisiert alle Dimensions-Buttons |

#### 4.5 Dominanz-Handler (10)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 30 | `handleDominanzClick` | 4655 | Behandelt Dominanz-Klick |
| 31 | `syncDimensionUI` | 4772 | Synct Dimensions-UI |
| 32 | `syncDominanzUI` | 4833 | Backwards-Compatibility-Wrapper |
| 33 | `getDimensionSummary` | 4844 | Holt Dimensions-Summary |
| 34 | `getDominanzSummary` | 4866 | Backwards-Compatibility-Wrapper |
| 35 | `getDominanzGridSummary` | 4870 | Backwards-Compatibility-Wrapper |
| 36 | `updateDominanzSummary` | 4877 | Aktualisiert Dominanz-Summary |
| 37 | `hasAnyDominanzSelected` | 4913 | Prüft ob Dominanz ausgewählt |
| 38 | `getPrimaryFaktDominanz` | 4918 | Holt primäre Dominanz |
| 39 | `getPrimaryFaktOrientierung` | 4923 | Holt primäre Orientierung |

#### 4.6 Soft-Warning & Modal-Handler (3)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 40 | `showSoftWarning` | 4941 | Zeigt Soft-Warning |
| 41 | `handleClose` | 5028 | Schließt Modal bei Click/Escape |
| 42 | `handleKeydown` | 5047 | Behandelt Keydown im Modal |

#### 4.7 Orientierung-Handler (8)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 43 | `handleOrientierungClick` | 5063 | Behandelt Orientierung-Klick |
| 44 | `handleOrientierungStatusToggle` | 5234 | Toggelt Orientierung-Status |
| 45 | `syncOrientierungUI` | 5468 | Synct Orientierung-UI |
| 46 | `getOrientierungSummary` | 5557 | Backwards-Compatibility-Wrapper |
| 47 | `getOrientierungGridSummary` | 5561 | Backwards-Compatibility-Wrapper |
| 48 | `updateOrientierungSummary` | 5569 | Aktualisiert Orientierung-Summary |

#### 4.8 Info-Modal Detail-Generierung (9)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 49 | `showGeschlechtInfoModal` | 5594 | Zeigt detailliertes Gender-Info-Modal |
| 50 | `showDominanzInfoModal` | 5725 | Zeigt detailliertes Dominanz-Info-Modal |
| 51 | `showOrientierungInfoModal` | 5834 | Zeigt detailliertes Orientierung-Info-Modal |
| 52 | `getOrientierungLabel` | 5943 | Helper für Orientierung-Label |
| 53 | `getOrientierungKOLabel` | 5955 | Holt KO-Kriterien-Label |
| 54 | `getDominanzLabel` | 5961 | Holt Dominanz-Label |

#### 4.9 Body/Soul (7)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 55 | `initBodySoulUI` | 5973 | Initialisiert Body/Soul-UI |
| 56 | `handleBodySoulClick` | 6040 | Behandelt Body/Soul-Klick |
| 57 | `updateBodySoulSummary` | 6082 | Aktualisiert Body/Soul-Summary |
| 58 | `syncBodySoulUI` | 6093 | Synct Body/Soul-UI |
| 59 | `getBodySoulSummary` | 6108 | Holt Body/Soul-Summary |
| 60 | `getBodySoulGridSummary` | 6130 | Holt Body/Soul-Grid-Summary |
| 61 | `hasBodySoulSelected` | 6157 | Prüft ob Body/Soul ausgewählt |

#### 4.10 Partner-Dimensions (17)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 62 | `initPartnerDimensionButtons` | 6169 | Initialisiert Partner-Dimensions-Buttons |
| 63 | `handlePartnerGeschlechtClick` | 6394 | Behandelt Partner-Gender-Klick |
| 64 | `syncPartnerGeschlechtUI` | 6443 | Synct Partner-Gender-UI |
| 65 | `getPartnerGeschlechtSummary` | 6481 | Holt Partner-Gender-Summary |
| 66 | `updatePartnerGeschlechtSummary` | 6507 | Aktualisiert Partner-Gender-Summary |
| 67 | `handlePartnerDominanzClick` | 6516 | Behandelt Partner-Dominanz-Klick |
| 68 | `syncPartnerDimensionUI` | 6557 | Synct Partner-Dimensions-UI |
| 69 | `getPartnerDominanzSummary` | 6595 | Holt Partner-Dominanz-Summary |
| 70 | `updatePartnerDominanzSummary` | 6621 | Aktualisiert Partner-Dominanz-Summary |
| 71 | `handlePartnerOrientierungClick` | 6630 | Behandelt Partner-Orientierung-Klick |
| 72 | `syncPartnerOrientierungUI` | 6824 | Synct Partner-Orientierung-UI |
| 73 | `getPartnerOrientierungSummary` | 6913 | Holt Partner-Orientierung-Summary |
| 74 | `updatePartnerOrientierungSummary` | 6939 | Aktualisiert Partner-Orientierung-Summary |
| 75 | `handlePartnerBodySoulClick` | 6948 | Behandelt Partner-Body/Soul-Klick |
| 76 | `syncPartnerBodySoulUI` | 6989 | Synct Partner-Body/Soul-UI |
| 77 | `getPartnerBodySoulSummary` | 7027 | Holt Partner-Body/Soul-Summary |
| 78 | `updatePartnerBodySoulSummary` | 7053 | Aktualisiert Partner-Body/Soul-Summary |

#### 4.11 Compatibility & GFK (10)
| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 79 | `runCompatibilityChecks` | 7062 | Führt alle Kompatibilitäts-Checks durch |
| 80 | `updateGfkFromArchetypes` | 7096 | Aktualisiert GFK aus Archetypen |
| 81 | `initGfkCompetenceUI` | 7107 | Initialisiert GFK-Kompetenz-UI |
| 82 | `handleGfkClick` | 7178 | Behandelt GFK-Kompetenz-Auswahl |
| 83 | `syncGfkUI` | 7234 | Synct GFK-UI |
| 84 | `getGfkSummary` | 7253 | Holt GFK-Summary |
| 85 | `updateGfkSummary` | 7264 | Aktualisiert GFK-Summary |
| 86 | `handlePartnerGfkClick` | 7293 | Behandelt Partner-GFK-Auswahl |
| 87 | `getPartnerGfkSummary` | 7349 | Holt Partner-GFK-Summary |

---

### 5. GFK-Matching (37 Funktionen, Zeilen 9576-9997)

Gewaltfreie Kommunikation Matching und Analyse.

| # | Funktion | Zeile | Beschreibung |
|---|----------|-------|--------------|
| 1 | `getGfkMatchingOverview` | 9580 | Holt GFK-Matching-Übersicht |
| 2 | `getGfkMatchingDetails` | 9599 | Holt GFK-Matching-Details |
| 3 | `initGfkMatchingUI` | 9657 | Initialisiert GFK-Matching-UI |
| ... | *(weitere 34 Funktionen)* | | |

---

### 6-18. Weitere Bereiche

*(Detaillierte Listen folgen bei Bedarf)*

---

## Kritische Funktionen (Must-Understand)

Diese Funktionen sind zentral für das System und müssen vor dem Refactoring vollständig verstanden werden:

| Funktion | Zeile | Warum kritisch |
|----------|-------|----------------|
| `initApp()` | 1268 | Haupt-Initialisierung |
| `updateAll()` | 1404 | Orchestriert alle UI-Updates |
| `selectPartner()` | 1492 | Triggert Vergleichsberechnung |
| `saveSelectionToStorage()` | 21032 | State-Persistierung |
| `loadSelectionFromStorage()` | 21061 | State-Wiederherstellung |
| `handleGeschlechtClick()` | 3853 | Primary Input Handler |
| `handleDominanzClick()` | 4655 | Primary Input Handler |
| `handleOrientierungClick()` | 5063 | Primary Input Handler |

---

## Funktions-Typ-Verteilung

| Typ | Anzahl | Prozent |
|-----|--------|---------|
| Function Declaration | ~426 | 76% |
| Arrow Function | ~132 | 24% |

---

## Nächste Schritte

1. ✅ **Phase 1.1**: Funktions-Inventar erstellt
2. ⏳ **Phase 1.2**: Abhängigkeitsgraph dokumentieren
3. ⏳ **Phase 1.3**: window.* Export-Liste erstellen
4. ⏳ **Phase 1.4**: onclick-Inventar erstellen

---

*Erstellt im Rahmen des Refactoring-Plans v2.0*
*Letzte Aktualisierung: 26. Januar 2026*
