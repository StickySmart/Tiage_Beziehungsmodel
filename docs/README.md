# Tiage-Beziehungsmodell Dokumentation

> *Strukturierte Dokumentation für das Tiage-Beziehungsmodell*

## Übersicht

Diese Dokumentation enthält alle theoretischen Grundlagen, Berechnungsformeln und rechtlichen Informationen zum Tiage-Beziehungsmodell.

## Struktur

```
docs/
├── README.md              ← Du bist hier
├── help-guide.md          ← Benutzerhandbuch
├── NAMING_CONVENTION.md   ← ID-Referenzsystem (#AID, #BID, etc.)
├── profile-calculator-data-flow.md   ← ProfileCalculator Datenfluss
├── profile-calculator-data-flow.pdf  ← PDF-Version
│
├── theory/                ← Philosophische Grundlagen
│   ├── pirsig.md          ← Robert M. Pirsig (Logos)
│   ├── osho.md            ← OSHO (Pathos)
│   ├── tiage-synthesis.md ← Tiages Verbindung beider
│   ├── pathos-logos.md    ← Die 75:25 Gewichtung
│   ├── resonance.md       ← Resonanz als Meta-Dimension
│   ├── factors.md         ← Die 4 Qualitätsfaktoren
│   ├── gaussian-model.md  ← Gauß-Verteilung für Bedürfnisse
│   └── gfk-rosenberg.md   ← GFK nach Marshall Rosenberg
│
└── legal/                 ← Rechtliche Dokumente
    ├── datenschutz.md     ← Datenschutzerklärung
    └── nutzungsbedingungen.md ← Nutzungsbedingungen
```

## Schnelleinstieg

### Für Benutzer

→ [help-guide.md](help-guide.md) - Kurzanleitung und Berechnungsbeispiele

### Für Entwickler

→ [profile-calculator-data-flow.md](profile-calculator-data-flow.md) - Datenfluss-Dokumentation
→ [profile-calculator-data-flow.pdf](profile-calculator-data-flow.pdf) - PDF-Version

### Für Philosophie-Interessierte

1. [tiage-synthesis.md](theory/tiage-synthesis.md) - Das Gesamtkonzept verstehen
2. [pirsig.md](theory/pirsig.md) - Pirsigs Metaphysik der Qualität
3. [osho.md](theory/osho.md) - OSHOs Bewusstseins-Philosophie
4. [pathos-logos.md](theory/pathos-logos.md) - Die duale Struktur
5. [resonance.md](theory/resonance.md) - Der Meta-Faktor

### Rechtliches

- [Datenschutz](legal/datenschutz.md)
- [Nutzungsbedingungen](legal/nutzungsbedingungen.md)

## Die zwei philosophischen Säulen

| Säule | Vertreter | Beitrag | Anteil |
|-------|-----------|---------|--------|
| **Pathos** | OSHO | Dynamische Qualität, Emotion | 75% |
| **Logos** | Robert M. Pirsig | Statische Qualität, Struktur | 25% |

## Kern-Formeln

### Qualitätsindex (v3.1)

```
Q = (O × 0.25 × R₁) + (A × 0.25 × R₂) + (D × 0.25 × R₃) + (G × 0.25 × R₄)
```

Wobei:
- **O** = Orientierungs-Score (0-100) - Sexuelle Kompatibilität
- **A** = Archetyp-Score (0-100) - Beziehungsphilosophie
- **D** = Dominanz-Score (0-100) - Energetische Dynamik
- **G** = Geschlechts-Score (0-100) - Gender-Chemie
- **R₁** = R_Leben (moduliert O)
- **R₂** = R_Philosophie (moduliert A)
- **R₃** = R_Dynamik (moduliert D)
- **R₄** = R_Identität (moduliert G)

### Resonanz-Faktor

```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

Wobei:
- **M** = Profil-Match (0-100) - Übereinstimmung der Präferenzen
- **B** = Balance (0-1) - Logos-Pathos-Harmonie
- **K** = Kommunikation (0-1) - GFK-Kompetenz beider Partner

### GFK-Faktor (K)

| ICH / Partner | hoch | mittel | niedrig |
|---------------|------|--------|---------|
| **hoch**      | 1.0  | 0.75   | 0.35    |
| **mittel**    | 0.75 | 0.5    | 0.2     |
| **niedrig**   | 0.35 | 0.2    | 0.0     |

GFK = Gewaltfreie Kommunikation nach Marshall Rosenberg

## Neue Features (v1.8.x)

### Perspektiven-System (P1-P4)

Die App bietet vier philosophische Perspektiven auf jeden Bedürfnis-Eintrag:

| ID | Perspektive | Fokus |
|----|-------------|-------|
| P1 | Ti-Age Synthese | Praktische Integration |
| P2 | Pirsig (MOQ) | Qualität und Struktur |
| P3 | OSHO | Bewusstsein und Energie |
| P4 | SexPositiv | Körperliche Dimension |

### ID-Referenzsystem

Alle Entitäten verwenden eindeutige IDs für konsistente Referenzierung:

- **#AID** - Archetyp-IDs (#A01-#A08)
- **#BID** - Bedürfnis-IDs (#B01-#B88)
- **#PID** - Perspektiven-IDs (#P1-#P4)

### Bedürfnis-Matching

88 GFK-basierte Bedürfnisse werden zwischen Partnern verglichen:

- Wildcard-Suche über Name, Kategorie, Dimension
- Sortierung nach Erfüllungsgrad
- Klickbare Tags mit Definition-Modals
- Lock-Mechanismus für individuelle Gewichtung

## Verwandte Dokumentation

- [beziehungsmodell.md](../beziehungsmodell.md) - Hauptdokumentation des Modells
- [profile-calculator-data-flow.md](profile-calculator-data-flow.md) - ProfileCalculator Datenfluss
- [profiles/docs/](../profiles/docs/) - Profil-Dokumentation und Bedürfnis-Fragen
- [ARCHETYPE-MATRIX-README.md](../ARCHETYPE-MATRIX-README.md) - Matrix-Dokumentation
- [CHANGELOG.md](../CHANGELOG.md) - Vollständige Versionshistorie

---

*© 2025 Ti-Age – Alle Rechte vorbehalten*
