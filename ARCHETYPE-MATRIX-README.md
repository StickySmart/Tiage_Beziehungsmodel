# Archetypen-Interaktionsmatrix v3.0

Eine interaktive 5x5 Matrix zur Bewertung der Kompatibilität verschiedener Beziehungsarchetypen.

## Live Demo

Öffne `archetype-interaction.html` in einem Browser.

## Dateien

- `archetype-matrix.json` - Vollständige Datenstruktur mit allen 25 Interaktionen
- `archetype-interaction.html` - Interaktive Single-Page-App

## Die 5 Archetypen

| Archetyp | Kernfokus | Farbe |
|----------|-----------|-------|
| **Single** | Selbst-Exploration, Ungebundenheit | Rot (#E63946) |
| **Duo** | Klassische Monogamie, Exklusivität | Pink (#E84393) |
| **Solopoly** | Autonomie + Poly, kein Nesting | Grün (#2A9D8F) |
| **Poly Hedo** | Lustorientiert, spontan, Genuss | Lila (#9B5DE5) |
| **Polyamor** | Strukturiert, romantisch, regelbasiert | Orange (#F4A261) |

### Duo vs. Poly-Varianten

Der entscheidende Unterschied:

- **Duo**: Klassische monogame Zweierbeziehung. Exklusivität, tiefe Verschmelzung, gesellschaftlich maximal akzeptiert.

### Poly Hedo vs. Polyamor

Der entscheidende Unterschied:

- **Poly Hedo**: Energie folgt der Lust. Wenig Regeln, viel Spontaneität. Beziehungen sind Flows, keine Verträge.
- **Polyamor**: Energie folgt der Struktur. Klare Agreements, Kalender, oft Hierarchien. Beziehungen sind verhandelt und organisiert.

## Features

### Dropdown-Filter
Wähle "Ich bin..." und sieh nur die für dich relevanten Kompatibilitäten.

### Für jeden Archetyp
- Kurz- und Langbeschreibung
- **PRO**: Was an diesem Modell funktioniert
- **CONTRA**: Die Herausforderungen
- **Pathos**: Emotionale Grundhaltung
- **Logos**: Strukturelle Logik

### Für jede Kombination
- Gesamtscore (0-100%)
- 6 Kategorie-Werte (A-F) mit Fortschrittsbalken
- **PRO**: Was in dieser Kombination funktioniert
- **CONTRA**: Wo Reibung entsteht
- **Emotionale Dynamik**: Pathos der Interaktion
- **Strukturelle Passung**: Logos der Interaktion

## Die 6 Kategorien

| Kat. | Name | Beschreibung |
|------|------|--------------|
| **A** | Beziehungsphilosophie | Fundamentale Einstellung zu Beziehungen |
| **B** | Werte-Alignment | Übereinstimmung in Kernwerten |
| **C** | Nähe-Distanz-Präferenzen | Gewünschte emotionale/physische Nähe |
| **D** | Autonomie-Bedürfnisse | Bedürfnis nach Unabhängigkeit |
| **E** | Kommunikations-Matching | Passung der Kommunikationsstile |
| **F** | Soziale Kompatibilität | Funktion im sozialen Kontext |

## Kompatibilitäts-Skala

| Bereich | Bedeutung | Farbe |
|---------|-----------|-------|
| < 60% | Herausfordernd | Rot |
| 60-69% | Moderat | Orange |
| 70-77% | Gut | Grün |
| > 77% | Excellent | Türkis |

## Asymmetrische Matrix

Die Matrix ist **asymmetrisch**, weil die Perspektive die wahrgenommene Kompatibilität beeinflusst:

```
Single → Solopoly: 61%
Solopoly → Single: 66%
```

Zeile = VON (deine Perspektive), Spalte = ZU (der andere Archetyp)

## 5x5 Übersichtsmatrix

|              | Single | Duo | Solopoly | Poly Hedo | Polyamor |
|--------------|--------|-----|----------|-----------|----------|
| **Single**   | 72%    | 71% | 61%      | 60%       | 57%      |
| **Duo**      | 68%    | 84% | 36%      | 33%       | 51%      |
| **Solopoly** | 66%    | 38% | 78%      | 68%       | 70%      |
| **Poly Hedo**| 64%    | 37% | 67%      | 72%       | 64%      |
| **Polyamor** | 60%    | 51% | 71%      | 66%       | 78%      |

### Kernerkenntnisse

- **Duo × Duo (84%)** hat die höchste Selbst-Kompatibilität
- **Duo × Poly-Varianten (33-51%)** zeigt die niedrigsten Werte - fundamentale Inkompatibilität
- **Single × Duo (71%)** zeigt gute Kompatibilität - klassischer Beziehungsstart

## Design-Entscheidungen

### Single-Page-App
Alles auf einer Seite, keine Navigation nötig. Der Dropdown filtert die Ansicht dynamisch.

### Mobile-First
Responsive Design, funktioniert auf allen Geräten.

### Farbcodierung
Der gewählte Archetyp bestimmt das Farbschema der gesamten Seite.

### Kollabierbare Karten
Archetypen und Kompatibilitäten können expandiert werden für mehr Details.

## Technische Details

- **Vanilla JavaScript** - keine Dependencies
- **CSS Custom Properties** - für dynamisches Theming
- **JSON Data** - externe Datenquelle für einfache Anpassung
- **Responsive Grid** - CSS Grid mit auto-fit

## Nutzung

1. Öffne `archetype-interaction.html` im Browser
2. Wähle deinen Archetyp im Dropdown
3. Klicke auf Archetypen-Karten für Details
4. Klicke auf Kompatibilitäts-Karten für Analyse

## Kommentar-System

Nutzer können Kommentare zu jeder Archetypen-Kombination hinterlassen:

- **Name eingeben** (optional, sonst "Anonym")
- **Kommentar schreiben** (max. 500 Zeichen)
- **localStorage** - Kommentare werden lokal im Browser gespeichert
- **Löschen möglich** - Jeder Kommentar kann entfernt werden
- **Scrollbare Liste** - Bei vielen Kommentaren wird gescrollt

## Weiterentwicklung

- [ ] PDF Export der persönlichen Analyse
- [ ] Selbst-Kombination (z.B. Single × Single) optional anzeigen
- [ ] URL-Parameter für direkten Link zu bestimmtem Typ
- [ ] Dark/Light Mode Toggle
- [ ] Server-seitige Kommentar-Speicherung

---

*Teil des Tiage Beziehungsmodells*
