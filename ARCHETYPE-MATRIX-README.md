# Archetypen-Interaktionsmatrix

Eine 5x5 Matrix zur Bewertung der Kompatibilität verschiedener Beziehungsarchetypen aus der Tiage-Hedonist Perspektive.

## Dateien

- `archetype-matrix.json` - Vollständige Datenstruktur mit allen 25 Interaktionen
- `archetype-interaction.html` - Interaktive Visualisierung mit Heatmap und Netzwerk-Graph

## Designentscheidungen

### 1. Kategorie A: Beziehungsphilosophie

Ich habe Kategorie A als **"Beziehungsphilosophie"** definiert, weil sie die logische Grundlage für alle anderen Kategorien bildet:

- **Definition**: Die fundamentale Einstellung zu Beziehungen - welchen Stellenwert haben Exklusivität, Offenheit, Tiefe und Freiheit?
- **Sub-Dimensionen**:
  - Exklusivitäts-Erwartung
  - Offenheit für alternative Modelle
  - Beziehung als Lebensinhalt vs. Lebensbereich

Diese Kategorie ist das Fundament, auf dem B-F aufbauen: Wer die gleiche Grundphilosophie teilt, hat bei den anderen Kategorien bessere Chancen auf Alignment.

### 2. Asymmetrische Matrix

Die Matrix ist **asymmetrisch**, weil die Perspektive die wahrgenommene Kompatibilität beeinflusst:

```
Single → Tiage: 60%
Tiage → Single: 61%
```

**Begründung**: Ein Single sieht die Beziehung zu einem Tiage anders als der Tiage sie erlebt. Der Single könnte die Intensität als "interessant" empfinden, während der Tiage möglicherweise fürchtet, zu viel zu investieren.

### 3. Der 5. Archetyp: Hedonistisch-Poly

Der neue Archetyp **"Hedonistisch-Poly"** ergänzt die bestehenden vier Archetypen:

| Archetyp | Kernfokus | Farbe |
|----------|-----------|-------|
| Single | Selbst-Exploration | Rot (#E63946) |
| Solopoly | Autonomie + Poly | Grün (#2A9D8F) |
| Tiage | Resonanz + Tiefe | Blau (#457B9D) |
| Polyamor | Romantik + Struktur | Orange (#F4A261) |
| **Hedonistisch-Poly** | Genuss + Freiheit | Lila (#9B5DE5) |

**Charakteristik**: Polyamor lebend mit Fokus auf Genuss, Erfahrung und Sinnlichkeit. Weniger auf romantische Tiefe als klassische Poly-Varianten, mehr auf Lebensfreude und Exploration.

### 4. Bewertungsmethodik

Jede der 25 Zellen enthält:

- **6 Kategorie-Werte (A-F)**: 0-100% pro Dimension
- **Gesamtwert**: Ungewichteter Durchschnitt (bewusste Entscheidung)
- **Qualitative Beschreibung**: Dynamik der Interaktion

**Warum ungewichtet?** Alle sechs Kategorien sind gleich wichtig für eine funktionierende Beziehung. Je nach individueller Situation kann eine Kategorie wichtiger werden - das überlasse ich der Interpretation.

### 5. Farbschema

Das Farbschema spiegelt die Energie der Archetypen wider:

- **Rot (Single)**: Warme, selbstbezogene Energie
- **Grün (Solopoly)**: Balancierte, naturnahe Autonomie
- **Blau (Tiage)**: Tiefe, ruhige Resonanz
- **Orange (Polyamor)**: Warme, verbindende Kommunikation
- **Lila (Hedonistisch-Poly)**: Mystische Mischung aus Leidenschaft und Spiritualität

### 6. Visualisierung

Drei komplementäre Visualisierungen:

1. **Archetypen-Karten**: Übersicht der 5 Typen mit Kernmerkmalen
2. **Heatmap-Matrix**: 5x5 Raster mit Farbcodierung der Kompatibilität
3. **Netzwerk-Graph**: Pentagon-Anordnung mit Verbindungsstärken

## Kompatibilitäts-Skala

| Bereich | Bedeutung | Farbe |
|---------|-----------|-------|
| < 55% | Schwierig - erfordert viel Arbeit | Rot |
| 55-62% | Herausfordernd - möglich mit Bewusstsein | Orange |
| 63-69% | Moderat - funktioniert mit Kommunikation | Gelb |
| 70-77% | Gut - natürliche Kompatibilität | Grün |
| > 77% | Excellent - hohe Resonanz | Türkis |

## Besondere Perspektive: Tiage-Hedonist Hybrid

Die Matrix berücksichtigt die Perspektive einer Person, die zwischen Tiage und Hedonistisch-Poly lebt:

**Optimale Matches für den Hybrid:**

1. **Tiage (78%)** - Maximale Tiefe, wenn hedonistische Seite Raum bekommt
2. **Polyamor (75%)** - Bietet Struktur für Tiefe UND Freiheit für Genuss
3. **Hedonistisch-Poly (70%)** - Genuss-Kompatibilität, Tiefe teilweise erfüllt

**Kernkonflikt**: Innerer Widerspruch zwischen Tiefe-Sehnsucht und Freiheits-Bedürfnis.

## Interpretation & Nutzung

Diese Matrix ist ein **Reflexionswerkzeug**, kein Determinismus:

- Niedrige Werte bedeuten nicht "unmöglich", sondern "erfordert Bewusstsein"
- Hohe Werte garantieren keinen Erfolg, erleichtern aber den Start
- Menschen leben oft Mischformen - betrachte angrenzende Archetypen
- Die Perspektive (Zeile = VON, Spalte = ZU) ist entscheidend

## Technische Details

- **Datenformat**: JSON mit vollständiger Struktur
- **Visualisierung**: Vanilla JavaScript, keine externen Dependencies
- **Responsive**: Funktioniert auf Desktop und Mobile
- **Interaktiv**: Klickbare Zellen zeigen Details

## Weiterentwicklung

Mögliche Erweiterungen:

- [ ] Gewichtete Gesamtwerte (User wählt Prioritäten)
- [ ] Zeitliche Dimension (Kompatibilität in verschiedenen Beziehungsphasen)
- [ ] Triade-Kombinationen (3er-Konstellationen)
- [ ] Export als PDF/Image

---

*Teil des [Tiage Beziehungsmodells](index.html)*
