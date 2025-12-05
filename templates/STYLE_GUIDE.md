# CSS Style Guide - Tiage Beziehungsmodel

## Ziel
Dieses Dokument definiert Naming Conventions und Komponenten-Verwendung, um semantische Fehler zu vermeiden.

---

## Naming Conventions

### Allgemeine Regeln

| Muster | Verwendung | Beispiel |
|--------|------------|----------|
| `.component-name` | Allgemeine Komponenten | `.dimension-hint` |
| `.bereich-component` | Bereichs-spezifisch | `.geschlecht-legend` |
| `.component--modifier` | Varianten | `.btn--primary` |
| `.component__element` | Kind-Elemente (BEM) | `.card__title` |

### Präfix-Konventionen

| Präfix | Bedeutung | Beispiel |
|--------|-----------|----------|
| `geschlecht-` | NUR für Geschlecht-Bereich | `.geschlecht-legend`, `.geschlecht-btn` |
| `dominanz-` | NUR für Dominanz-Bereich | `.dominanz-label`, `.dominanz-grid` |
| `orientierung-` | NUR für Orientierung-Bereich | `.orientierung-grid` |
| `profile-review-` | Profile Review Modal | `.profile-review-card` |
| `dimension-` | Allgemein für alle Dimensionen | `.dimension-hint` |

---

## Komponenten-Katalog

### Labels & Hints

| Klasse | Verwendung | Farbe | NICHT verwenden für |
|--------|------------|-------|---------------------|
| `.compact-dimension-label` | Überschriften für Dimensionen | Gold (#eab308) | - |
| `.dimension-hint` | Erklärender Text bei Attributen | Gold (#eab308) | Geschlecht P/S |
| `.geschlecht-legend` | NUR Geschlecht P/S Legende | Gold (#eab308) | Andere Attribute |
| `.gewichtung-label` | Gewichtungs-Slider Labels | Muted | - |

### Buttons

| Klasse | Verwendung | Aktiv-Farbe |
|--------|------------|-------------|
| `.profile-review-triple-btn` | Segmented Control (3 Optionen) | Primary (blau) |
| `.geschlecht-btn` | Geschlecht-Auswahl | Grün/Orange |
| `.dominanz-btn` | Dominanz-Auswahl | Grün/Orange |

### Cards & Container

| Klasse | Verwendung |
|--------|------------|
| `.profile-review-card` | Attribut-Karte im Modal |
| `.profile-review-category` | Kategorie-Container |
| `.compact-dimension` | Dimensions-Container auf Hauptseite |

---

## Farb-Variablen

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--primary` | #457B9D | Aktive Elemente, Links |
| `--warning` | #f39c12 | Warnungen, Orange-Highlights |
| `#eab308` | Gold | Hints, Legenden |
| `--text-primary` | #f0f0f0 | Haupttext |
| `--text-muted` | #9a9aaa | Sekundärtext |

---

## Regeln zur Vermeidung semantischer Fehler

### 1. Bereichs-spezifische Klassen NICHT wiederverwenden

```css
/* FALSCH - geschlecht-legend für andere Bereiche */
.profile-review-card .geschlecht-legend { }

/* RICHTIG - allgemeine Klasse verwenden */
.dimension-hint { }
```

### 2. Neue Komponente erstellen statt kopieren

Wenn ein Pattern in mehreren Bereichen benötigt wird:
1. Allgemeine Klasse erstellen (z.B. `.dimension-hint`)
2. Dokumentation hinzufügen
3. Bereichs-spezifische Klasse nur für Spezialfälle

### 3. Dokumentations-Block bei neuen Komponenten

```css
/* ============================================
 * COMPONENT: [Name]
 * PURPOSE: [Wofür wird es verwendet]
 * USAGE: [HTML-Beispiel]
 * COLOR: [Farbe]
 * SCOPE: [Wo verwendbar]
 * DO NOT CONFUSE WITH: [Ähnliche Klassen]
 * ============================================ */
.component-name { }
```

### 4. Checkliste vor Verwendung einer Klasse

- [ ] Ist die Klasse für meinen Bereich gedacht?
- [ ] Hat die Klasse einen bereichs-spezifischen Präfix?
- [ ] Gibt es eine allgemeine Alternative?
- [ ] Ist die Verwendung dokumentiert?

---

## Datei-Struktur

```
/templates/
  variables.css          # CSS Variablen
  template_desktop.css   # Desktop Styles
  template_mobile.css    # Mobile Styles
  STYLE_GUIDE.md         # Diese Dokumentation
```

### Zukünftige Struktur (empfohlen)

```
/templates/
  /components/
    _buttons.css
    _cards.css
    _labels.css
    _dimension-hint.css
  /sections/
    _geschlecht.css
    _dominanz.css
    _profile-review.css
  variables.css
  main.css              # Importiert alle
  STYLE_GUIDE.md
```

---

## Änderungsprotokoll

| Datum | Änderung |
|-------|----------|
| 2025-12-05 | `.dimension-hint` erstellt als allgemeine Hint-Klasse |
| 2025-12-05 | Style Guide erstellt |
