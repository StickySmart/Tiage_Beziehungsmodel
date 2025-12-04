# Hilfe & Dokumentation

> *Benutzerhandbuch für das Tiage-Beziehungsmodell*

## Kurzanleitung

| Element | Beschreibung |
|---------|--------------|
| **Mein Typ** | Dein Archetyp + Eigenschaften (Orientierung, Dominanz, Geschlecht) |
| **Beziehungsqualität** | Partner-Archetyp + Eigenschaften und Kompatibilitätsberechnung |
| **Gelebt** | Was du aktiv lebst |
| **Interessiert** | Wofür du offen bist |
| **INFO-Button** | Details zum gewählten Archetyp |
| **Ergebnis** | Automatische Berechnung der Kompatibilität (4 Faktoren) |
| **Prozentwerte** | Anklicken = Detaillierte Erklärung pro Faktor |

## Neu in Version 1.7

- **Dynamische Kategorie-Scores (A-F):** Jedes Profil erhält individuelle Scores für 6 Dimensionen
- **Score-Komposition:** Basis-Werte werden durch Archetyp, Gender, Dominanz und Orientierung modifiziert
- **Neue Dimensionen:** Beziehungsphilosophie (A), Werte-Alignment (B), Nähe-Distanz (C), Autonomie (D), Kommunikation (E), Soziale Kompatibilität (F)
- **Erweiterte API:** `getBaseScores()`, `getAllBaseScores()`, `getAllModifiers()`

## Neu in Version 1.6

- **GFK-Kommunikationsfaktor:** Neuer Resonanz-Faktor basierend auf Gewaltfreier Kommunikation (Marshall Rosenberg)
- **Dynamische Bedürfnis-Berechnung:** Individuelle Bedürfnis-Profile basierend auf Archetyp, Dominanz, Geschlecht und Orientierung
- **Erweiterte Resonanz-Formel:** Drei Faktoren (Bedürfnis-Match, Balance, GFK) statt zwei
- **8 Archetypen:** RA, LAT und Aromantisch hinzugefügt, Poly-Hedo entfernt
- **Primär/Sekundär-System:** Mehrere Eigenschaften gleichzeitig wählbar

## Die 4 Qualitätsfaktoren

| Faktor | Gewicht | Dimension | Beschreibung |
|--------|---------|-----------|--------------|
| **Orientierungs-Kompatibilität** | 40% | Pathos | Körperliche Polarität und Anziehung. OSHO: "Nur Extreme können sich wirklich anziehen." |
| **Archetyp-Übereinstimmung** | 25% | Logos | Fundamentale Beziehungsphilosophie: "Wie wollen wir Beziehung leben?" |
| **Dominanz-Harmonie** | 20% | Pathos | Energetische Dynamik. OSHO: "Tao - eine Energie, zwei Ausdrucksformen." |
| **Geschlechts-Attraktion** | 15% | Pathos | Gender-Chemie als Feinabstimmung der Orientierung |

## Berechnung

```
Qualitätsindex = [(Orientierung × 40%) + (Archetyp × 25%) + (Dominanz × 20%) + (Geschlecht × 15%)] × Resonanz
```

Jeder Faktor wird einzeln auf 0-100% bewertet. Die **Resonanz (R)** ist ein Meta-Faktor (0.9-1.1), der moduliert, wie gut Kopf (Logos) und Herz (Pathos) zusammenschwingen.

### Resonanz-Formel

```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

- **M** = Bedürfnis-Match (dynamisch berechnet aus Archetyp + Dominanz + Geschlecht + Orientierung)
- **B** = Logos-Pathos-Balance = (100 - |Logos - Pathos|) / 100
- **K** = GFK-Kommunikationsfaktor (0-1, basierend auf beider Partner GFK-Kompetenz)

## Rechenbeispiel

**Duo (Cis Frau, Submissiv, Hetero) × Duo-Flex (Cis Mann, Dominant, Hetero)**

| Faktor | Berechnung | Ergebnis |
|--------|------------|----------|
| Archetyp | 75% × 0.40 | 30 (Duo ↔ Duo-Flex = nah verwandt) |
| Orientierung | 100% × 0.25 | 25 (Hetero + Hetero bei M/F) |
| Dominanz | 100% × 0.20 | 20 (Submissiv + Dominant = Ergänzung) |
| Geschlecht | 100% × 0.15 | 15 (Cis Frau × Cis Mann passt) |
| **Basis-Score** | | **90** |
| Resonanz | R = 1.05 | (Leichte Harmonie) |
| **Final** | 90 × 1.05 | **94.5 ≈ 95%** |

```
(30 + 25 + 20 + 15) × 1.05 = 94.5 ≈ 95%
```

## Die 8 Archetypen

| Archetyp | Beschreibung |
|----------|--------------|
| **Single** | Autonomes Leben ohne Primärbeziehung |
| **Duo** | Monogame Zweierbeziehung mit Exklusivität |
| **Duo-Flex** | Primärbeziehung mit vereinbarten Öffnungen |
| **Solopoly** | Mehrere gleichwertige Beziehungen, Fokus Autonomie |
| **Polyamor** | Tiefe emotionale Bindungen zu mehreren Partnern |
| **RA** | Relationship Anarchist - Ablehnung aller Beziehungs-Hierarchien |
| **LAT** | Living Apart Together - Feste Partnerschaft ohne Zusammenleben |
| **Aromantisch** | Fokus auf platonische Verbindungen ohne romantische Komponente |

## Ergebnis-Interpretation

| Score | Bewertung | Bedeutung |
|-------|-----------|-----------|
| **70-100%** | Gut | Solide Basis vorhanden |
| **50-69%** | Mittel | Erfordert bewusste Arbeit |
| **0-49%** | Herausfordernd | Fundamentale Unterschiede |

*Der Qualitätsindex ist ein Orientierungswert. Echte Beziehungen hängen von vielen weiteren Faktoren ab.*

## Weiterführende Dokumentation

### Philosophische Grundlagen

- [Tiage-Synthese](theory/tiage-synthesis.md) - Das Gesamtkonzept
- [Pirsig-Philosophie](theory/pirsig.md) - Metaphysik der Qualität
- [OSHO-Philosophie](theory/osho.md) - Bewusstsein und Beziehung
- [Pathos/Logos](theory/pathos-logos.md) - Die 40:60 Gewichtung
- [Resonanz-Theorie](theory/resonance.md) - Der Meta-Faktor
- [Die 4 Faktoren](theory/factors.md) - Alle Qualitätsfaktoren im Detail

### Rechtliches

- [Datenschutz](legal/datenschutz.md)
- [Nutzungsbedingungen](legal/nutzungsbedingungen.md)

### Wissenschaftliche Quellen

- [Research Sources](../profiles/research-sources.md) - Vollständige Quellensammlung

## Kontakt

Fragen, Feedback oder Verbesserungsvorschläge?

E-Mail: [nerd@ti-age.de](mailto:nerd@ti-age.de)
