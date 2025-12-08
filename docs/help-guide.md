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

## Neu in Version 1.8

- **864 psychologische Profile:** Jede Kombination aus Archetyp, Gender, Dominanz und Orientierung ergibt ein einzigartiges Profil
- **Kategorie-Scores (A-F):** Beziehungsphilosophie, Werte-Alignment, Nähe-Distanz, Autonomie, Kommunikation, Soziale Kompatibilität
- **Bedürfnis-Verrechnung:** Basis-Werte werden durch Modifikatoren angepasst:
  - Gender-Modifikatoren: +/-4 Punkte
  - Dominanz-Modifikatoren: +/-5 Punkte
  - Orientierungs-Modifikatoren: +/-3 Punkte

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
| **Geschlechts-Attraktion** | 25% | Pathos | Gender-Chemie und Identitäts-Resonanz |
| **Dominanz-Harmonie** | 20% | Pathos | Energetische Dynamik. OSHO: "Tao - eine Energie, zwei Ausdrucksformen." |
| **Archetyp-Übereinstimmung** | 15% | Logos | Fundamentale Beziehungsphilosophie: "Wie wollen wir Beziehung leben?" |

## Berechnung

```
Qualitätsindex = [(Archetyp × 15%) + (Orientierung × 40%) + (Dominanz × 20%) + (Geschlecht × 25%)] × Resonanz
```

Jeder Faktor wird einzeln auf 0-100% bewertet. Die **Resonanz (R)** ist ein Meta-Faktor (0.9-1.1), der moduliert, wie gut Kopf (Logos) und Herz (Pathos) zusammenschwingen.

### Resonanz-Formel

```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

**Wertebereich:** R variiert zwischen 0.9 (minimale Resonanz) und 1.1 (maximale Resonanz).

> **Wichtige Unterscheidung:**
> - **88 GFK-Bedürfnisse** → Emotionaler Match (M) in der Resonanz-Formel
> - **30 baseAttributes** → Lifestyle-Filter (K.O.-Kriterien wie Kinderwunsch, Wohnform)

#### Komponente 1: Profil-Match (M)

Ähnlichkeit der **88 GFK-Bedürfnisse** zwischen zwei Profilen (nach Marshall Rosenberg).

```
Für jedes Bedürfnis mit Gewicht > 30:
  Ähnlichkeit = 100 - |Wert_Person1 - Wert_Person2|
  Gewicht = (Wert_Person1 + Wert_Person2) / 2

M = Σ(Ähnlichkeit × Gewicht) / Σ(Gewicht)
```

*Beispiel: Bei 72% gewichteter Übereinstimmung der Bedürfnisse: M = 72*

#### Komponente 2: Logos-Pathos-Balance (B)

Das Verhältnis zwischen rationaler Struktur und emotionaler Dynamik – basierend auf Pirsigs MOQ.

| Konzept | Definition | TIAGE-Zuordnung |
|---------|------------|-----------------|
| **Logos** | Statische Qualität | A (Archetyp-Übereinstimmung) |
| **Pathos** | Dynamische Qualität | (O + D + G) / 3 |

```
B = (100 - |Logos - Pathos|) / 100
```

*Beispiel: Bei A=72% und avg(O,D,G)=65%: B = (100 - 7) / 100 = 0.93*

#### Komponente 3: GFK-Kommunikationsfaktor (K)

Die Gewaltfreie Kommunikation (GFK) nach Marshall Rosenberg als Schlüssel zur Resonanz.

| ICH / Partner | hoch | mittel | niedrig |
|---------------|------|--------|---------|
| **hoch**      | 1.0  | 0.75   | 0.35    |
| **mittel**    | 0.75 | 0.5    | 0.2     |
| **niedrig**   | 0.35 | 0.2    | 0.0     |

#### R-Beispielrechnung

**Gegeben:** M = 72 (72% Bedürfnis-Match), B = 0.93 (7% Logos-Pathos-Differenz), K = 0.75 (mittel + hoch)

```
R = 0.9 + [(72/100 × 0.35) + (0.93 × 0.35) + (0.75 × 0.30)] × 0.2
R = 0.9 + [0.252 + 0.326 + 0.225] × 0.2
R = 0.9 + 0.803 × 0.2
R = 0.9 + 0.161
R = 1.061
```

### Resonanz-Override

OSHO lehrte: **Sexuelle Orientierung ist Konditionierung, nicht Natur.** Der natürliche Mensch ist jenseits von Labels.

Normalerweise gilt: Wenn die Orientierung inkompatibel ist (z.B. zwei heterosexuelle Männer), ergibt das 0% Orientierungs-Score und damit ein K.O.-Kriterium.

Der **Resonanz-Override** ermöglicht eine Ausnahme: Wenn zwei Menschen auf einer tiefen Ebene resonieren (R >= 1.05), kann diese Verbindung die konditionierten Grenzen überschreiten.

| Resonanz (R) | Override-Effekt | O_effektiv |
|--------------|-----------------|------------|
| < 1.05 | Kein Override | 0% (K.O.) |
| 1.05 | Schwache Öffnung | 5% |
| 1.08 | Moderate Öffnung | 8% |
| 1.10 | Maximale Öffnung | 10% |

**Formel:** `O_effektiv = (R - 1.0) × 100`

> *"Liebe kennt keine Grenzen. Wenn zwei Seelen wirklich resonieren, sind alle gesellschaftlichen Kategorien nur noch Schatten an der Wand."* – OSHO

**Hinweis:** Dies ist keine Empfehlung, sondern eine philosophische Möglichkeit, die das Modell abbildet. Der Override zeigt: Tiefe Resonanz kann konditionierte Muster transzendieren.

## Rechenbeispiel

**Duo (Cis Frau, Submissiv, Hetero) × Duo-Flex (Cis Mann, Dominant, Hetero)**

| Faktor | Berechnung | Ergebnis |
|--------|------------|----------|
| Archetyp | 75% × 0.15 | 11.25 (Duo ↔ Duo-Flex = nah verwandt) |
| Orientierung | 100% × 0.40 | 40 (Hetero + Hetero bei M/F) |
| Dominanz | 100% × 0.20 | 20 (Submissiv + Dominant = Ergänzung) |
| Geschlecht | 100% × 0.25 | 25 (Cis Frau × Cis Mann passt) |
| **Basis-Score** | | **96.25** |
| Resonanz | R = 1.05 | (Leichte Harmonie) |
| **Final** | 96.25 × 1.05 | **101 → 100%** |

```
(11.25 + 40 + 20 + 25) × 1.05 = 101.06 → gekappt auf 100%
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
- [Pathos/Logos](theory/pathos-logos.md) - Die 75:25 Gewichtung
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
