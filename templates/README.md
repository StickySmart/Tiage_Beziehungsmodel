# Layout Templates

Diese Templates dienen als Referenz für das konsistente Design der Anwendung.

## Dateien

### template_desktop.css
- **Zweck**: Layout Basis PC (Desktop)
- **Beschreibung**: Enthält das perfekte Desktop-Layout und Farbschema
- **Breakpoint**: min-width: 769px

### template_mobile.css
- **Zweck**: Layout Basis Handy (Mobile)
- **Beschreibung**: Enthält das Mobile-Layout mit identischen Farben wie Desktop
- **Breakpoint**: max-width: 768px

## Farbschema (identisch auf PC und Handy)

### Grundfarben
| Variable | Wert | Verwendung |
|----------|------|------------|
| `--primary` | #457B9D | Hauptfarbe (Standard Blau) |
| `--primary-light` | #A8D5E2 | Helle Akzentfarbe |
| `--bg-dark` | #0f0f1a | Haupt-Hintergrund |
| `--bg-card` | #1a1a2e | Card-Hintergrund |
| `--bg-hover` | #252542 | Hover-Zustand |
| `--text-primary` | #f0f0f0 | Haupttext |
| `--text-secondary` | #a0a0b0 | Sekundärtext |
| `--text-muted` | #9a9aaa | Gedämpfter Text |
| `--border` | rgba(255,255,255,0.1) | Rahmenfarbe |
| `--success` | #2ecc71 | Grün (ICH-Spalte) |
| `--warning` | #f39c12 | Orange (Warnung) |
| `--danger` | #e74c3c | Rot (PARTNER-Spalte) |

### Archetyp-Farben
| Archetyp | Primary | Light |
|----------|---------|-------|
| Single | #E63946 | #FFB4A2 |
| Duo | #E84393 | #FDA7DF |
| Duo-Flex | #FF6B6B | #FFA5A5 |
| Solopoly | #2A9D8F | #A8DADC |
| Poly Hedo | #9B5DE5 | #D4A5FF |
| Polyamor | #F4A261 | #FFE5B4 |

## Wichtige Design-Prinzipien

1. **Konsistente Farben**: Alle Farben werden über CSS-Variablen gesteuert
2. **ICH = Grün**: Die ICH-Spalte verwendet `--success` (#2ecc71)
3. **PARTNER = Rot**: Die PARTNER-Spalte verwendet `--danger` (#e74c3c)
4. **Responsive**: Mobile-First Design mit Breakpoint bei 768px
5. **Theme-basiert**: Farben ändern sich basierend auf gewähltem Archetyp

---
*Erstellt: 2025-11-27*
