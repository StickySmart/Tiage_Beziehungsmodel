# Changelog

Alle wichtigen Änderungen am Tiage-Beziehungsmodell werden hier dokumentiert.

Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [1.8.85] - 2025-12-10

### Neu

**Bedürfnis-System mit #ID-Referenzen**
- **#BID Anzeige** - Bedürfnis-IDs (#B01-#B88) werden auf allen Tags und Buttons angezeigt
- **Bedürfnis-Suche** - Wildcard-Suche über Name, Kategorie und Dimension
- **Sortierung nach Status** - Bedürfnis-Liste nach Erfüllungsgrad sortierbar
- **Klickbare Bedürfnis-Tags** - Öffnen Definition-Modal bei Klick in Synthese-Ansichten
- **220 Bedürfnis-Fragen** - Vollständige Fragebogen-Dokumentation

**Resonanz-Modal und Storytelling**
- **Resonanz-Storytelling-Modal** - Narrative Visualisierung der Resonanz-Metriken
- **Resonanz-Berechnung für Lebensdimensionen** - Erweiterte Metrik-Analyse
- **Strukturierte Zitat-Tabelle** - Pirsig/OSHO Zitate in tabellarischer Form

**Perspektiven-System (P1-P4)**
- **PerspektivenModal** - 4 philosophische Perspektiven auf Bedürfnisse:
  - P1: Ti-Age Synthese
  - P2: Pirsig (MOQ)
  - P3: OSHO
  - P4: SexPositiv
- **Vollständige P4-Perspektive** - SexPositiv-Perspektive für alle Bedürfnisse dokumentiert

**Profile Review und Memory Management**
- **Display-Button für gespeicherte Profile** - Schnellzugriff auf gespeicherte Informationen
- **Profil-Speicher-Status** - Anzeige neben DU/PARTNER Headers
- **ProfileReview-Optimierung** - Verwendung von flatNeeds als primäre Datenquelle
- **AttributeSummaryCard-Synchronisation** - UI lädt gespeicherte Bedürfnis-Werte korrekt

**Lock-Mechanismus für Gewichtungen**
- **Vier-Lock-System** - Einzelne Faktoren sperrbar
- **Summen-Lock** - Gesamtsumme bei beliebigem Wert sperrbar (nicht nur 100%)
- **Slider-Kontrollen** - FAKTOR-GEWICHTUNG Komponente mit interaktiven Slidern
- **Lock-Reset** - Locks werden bei Standard-Button und Profilwechsel zurückgesetzt

**UI/UX Verbesserungen**
- **KO-Warnung** - Warnmeldung unter Score-Anzeige bei inkompatiblen Kombinationen
- **Neon Pink/Purple Toggle-Buttons** - Neue Button-Styling-Optionen
- **Ti-Age Synthese Score** - Anzeige mit einer Dezimalstelle

### Geändert

**Architektur-Modernisierung**
- **Archetype-Matrix mit #IDs** - Modernisierte JSON-Struktur mit eindeutigen Referenzen
- **Backward Compatibility** - Transformation alter Keys für bestehende Profile
- **Flache Bedürfnis-Liste** - Kategorien-Gruppierung entfernt für bessere Übersicht
- **Codebase-Reorganisation** - Module in js/components/, js/services/, js/utils/
- **profiles/ Struktur** - Reorganisiert mit data/, definitions/, modifiers/, docs/

**Daten-Synchronisation**
- **Modal-Synthese-Synchronisation** - Attribute Modal und Ti-Age Synthese nutzen gleiche Datenquelle
- **Bedürfnis-Übereinstimmung** - Einheitliche Berechnung über alle Ansichten
- **GFK-Export** - personDimensions global für MemoryManager zugänglich
- **Dimension-Button-Initialisierung** - Verbessert mit Fallback-Selektoren

### Behoben

- **Trans-Gender-Identität** - Korrekte Behandlung in KO-Kriterien-Prüfung
- **Cis/Trans/Suchend-Identität** - Korrekte Anwendung auf Gender-Score-Berechnung
- **Strikethrough für Trans als Sekundär** - Primary wird durchgestrichen wenn Trans sekundär ist
- **UI-Aktualisierung nach Laden** - Desktop-UI aktualisiert sich nach Laden des gespeicherten Zustands
- **P/S-Indikatoren** - Werden korrekt bei Seitenreload angezeigt
- **Score-Display-Buttons** - Funktionieren korrekt
- **Archetype-Grid-Buttons** - Aktualisieren sich beim Laden aus Memory
- **needDefinitionModal z-index** - Höher als profileReviewModal
- **TDZ-Fehler** - gewichtungLocks und FAKTOR_MAP an Dateianfang verschoben
- **loadData() Aufruf** - Initialisiert Archetypen-Daten korrekt
- **Gemeinsame Bedürfnisse** - Sektion und Modal-Zugriff wiederhergestellt

### Dokumentation

- **Faktor-Gewichtung korrigiert** - Dokumentation zeigt korrekte 75/25 Pathos/Logos Gewichtung
- **Version-Notes ersetzt** - Link zu CHANGELOG statt inline Notes

---

## [1.7.0] - 2025-12-04

### Neu

**NEU: Dynamische Kategorie-Score-Komposition (A-F)**

Die 864 psychologischen Profile erhalten nun individuelle Kategorie-Scores basierend auf ihrer Kombination aus Archetyp, Gender, Dominanz und Orientierung.

**Technische Änderungen:**
- `baseScores` Konstante: Basis-Werte (A-F) für alle 8 Archetypen
- `categoryModifiers` für alle 9 Gender-Modifikatoren
- `categoryModifiers` für alle 4 Dominanz-Modifikatoren
- `categoryModifiers` für alle 3 Orientierungs-Modifikatoren
- `applyScoreModifiers()` Hilfsfunktion für Score-Komposition
- Erweiterte `composeProfile()` Funktion mit A-F Score-Berechnung
- Neue API-Methoden: `getBaseScores()`, `getAllBaseScores()`, `getAllModifiers()`

**Kategorie-Dimensionen:**
- A = Beziehungsphilosophie
- B = Werte-Alignment
- C = Nähe-Distanz
- D = Autonomie
- E = Kommunikation
- F = Soziale Kompatibilität

**Beispiel-Komposition (Single + Mann-Cis + Dominant + Heterosexuell):**
```
A: 66.7 + 0 + 0 + (-2) = 64.7
B: 66.8 + 2 + 1 + 3 = 72.8
C: 62.2 + (-2) + (-3) + 2 = 59.2
D: 77.5 + 3 + 5 + (-3) = 82.5
E: 68.0 + (-4) + (-2) + (-2) = 60.0
F: 63.8 + 3 + 2 + 5 = 73.8
```

**Quelle:** `profiles/profile-store.js`

## [1.6.0] - 2025-12-02

### Geändert

**CHANGED: Gewichtung der Qualitätsfaktoren (75% Pathos / 25% Logos)**

**Beweggründe:**
Die Gewichtung wurde an die reale menschliche Kennenlernreihenfolge angepasst. Menschen erleben Beziehung zuerst emotional/körperlich (Chemie, Anziehung, energetische Passung) bevor sie rational über Beziehungsmodelle sprechen. Die Archetyp-Frage "Wie wollen wir Beziehung leben?" stellt sich erst nach den initialen Pathos-Faktoren.

**Philosophische Grundlage:**
"Pathos vor Logos" - Das Leben/Erleben kommt vor der Interpretation. Diese Reihenfolge entspricht der Zen/Osho-Perspektive: Akzeptiere was IST (die gefühlte Anziehung), dann folgt die bewusste Wahl innerhalb dessen (Archetyp-Kompatibilität).

**Technische Änderung:**
- Orientierungs-Kompatibilität: 25% → 40% (Pathos)
- Archetyp-Übereinstimmung: 40% → 25% (Logos)
- Dominanz-Harmonie: 20% (Pathos, unverändert)
- Geschlechts-Attraktion: 15% (Pathos, unverändert)

## [1.5.0] - 2025-11-29

### Neu
- **Sprachumschaltung Deutsch/Englisch (i18n)** - Vollständige Internationalisierung der Anwendung
- **Geschlechtsidentität-Modal** - Ersetzt Tooltip durch scrollbares Info-Modal
- **Primär/Sekundär-System für Geschlechtsidentität** - Erweiterte Auswahlmöglichkeiten
- **Markdown-Loader** - Dynamisches Content-Loading aus strukturierten Markdown-Dokumenten

### Geändert
- **Neuer Titel** - "Das anarchische Ti-Age Prinzip der Paarung"
- **Einheitliche Label/Info-Icon Logik** - Konsistente Darstellung für Dominanz und Orientierung
- Verbesserte Hover-Effekte und Mobile-Schriftgrößen

### Behoben
- Click-Logik für Geschlechtsauswahl auf Mobile korrigiert
- Info-Button für Geschlechtsidentität im Modal repariert

## [1.4.0] - 2025-11-27

### Neu
- **Gelebt/Interessiert-Auswahl** - Umbenennung von "Fakt" zu "Gelebt" für intuitivere Bedienung
- **Verbesserte Fehlermeldungen** - Fehlende Pflichtfelder werden stichwortartig aufgelistet
- **Responsive Design Templates** - Desktop und Mobile Layout-Vorlagen für konsistentes Design
- **Kreisförmige Score-Anzeige** - Neue visuelle Darstellung der Kompatibilitätswerte auf Desktop
- **Navigationstasten für Mobile** - Verbesserte Modal-Navigation auf Mobilgeräten

### Geändert
- **DU statt ICH** - Umbenennung für klarere Benutzerführung ("Mein Typ")
- **Auto-Collapse Sektionen** - Orientierung und Dominanz Sektionen schließen automatisch nach Auswahl
- **Einzelne Gelebt-Auswahl** - Pro Kategorie nur eine "Gelebt"-Selektion erlaubt
- Verbesserte Summary-Anzeige in kollabierten Sektionen

### Behoben
- Doppelte Gelebt-Auswahl in Orientierung und Dominanz Kategorien
- Button-Sichtbarkeit nach Modal-Navigation
- Farblogik bei Combo-Code für Dominanz-Modal

## [1.3.0] - 2025-11-26

### Neu
- **864 Psychologische Profile** - Vollständige Persönlichkeitsprofile für alle Archetyp-Kombinationen *[erweitert in v1.7.0 mit individuellen A-F Scores]*
- Detaillierte Beschreibungen für Single, Duo, Duo-Flex, Solopoly, Poly-Hedo und Polyamor
- Wissenschaftlich fundierte Quellen-Dokumentation (`profiles/research-sources.md`)

## [1.2.0] - 2025-11-25

### Neu
- **Neues 4-Faktoren-Berechnungsmodell** mit wissenschaftlicher Fundierung
- Philosophische Statements basierend auf Pirsig (MOQ) und OSHO
- Gewichtung: Archetyp (40%), Orientierung (25%), Dominanz (20%), Geschlecht (15%) *[aktualisiert in v1.6.0]*

### Geändert
- Logos/Pathos-Verhältnis auf 40:60 angepasst
- Verbesserte D/S-Kompatibilitätsberechnung

## [1.1.0] - 2025-11-20

### Neu
- **Mobile-First Redesign** mit Card-Carousel und Swipe-Interface
- Kommentar-System mit Google Sheets Backend
- Wildcard-Suchfilter für Kommentare
- Info-Tooltips für Orientierung und Dominanz-Präferenz
- JOYclub Partner-Badge
- Swipe-Navigation in allen Modals

### Geändert
- Verbesserte mobile Typografie und Lesbarkeit
- Symmetrische Buttons, größere Header
- Comment-Type-Badge zeigt korrekten Typ

### Behoben
- Gender-Selektion aktualisiert Zahlen sofort
- Keine doppelten Kommentare mehr
- Button-Funktionalität in Modals

## [1.0.0] - 2025-11-15

### Neu
- **6x6 Archetypen-Matrix** (Single, Duo, Duo-Flex, Solopoly, Poly-Hedo, Polyamor)
- Interaktiver Beziehungs-Kompatibilitäts-Rechner
- Pro/Contra-Analyse für jede Kombination
- Bewertungssystem mit Kategorien A-F
- INFO-Modal mit philosophischen Grundlagen
- Altersverifikation (18+)
- Responsive Design für Desktop und Mobile
- GitHub Pages Deployment

### Philosophische Grundlagen
- MOQ (Robert M. Pirsig): Metaphysik der Qualität
- OSHO: Bewusstsein durch Meditation

---

## Frühere Entwicklung

### [0.3.0] - 2025-11-10
- Erweiterung auf 6 Archetypen (Duo-Flex hinzugefügt)
- Dashboard-Style Split-Screen Layout

### [0.2.0] - 2025-11-08
- 5x5 Matrix mit DUO-Archetyp
- Kommentar-System Grundlage

### [0.1.0] - 2025-11-05
- Initiale 4x4 Matrix
- Single-Page-App Architektur
- Basis-Dokumentation

---

**Autor:** Ti-Age
**Lizenz:** © 2025 Ti-Age – Alle Rechte vorbehalten.
