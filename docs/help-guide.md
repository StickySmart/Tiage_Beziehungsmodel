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

## Versionshistorie

Alle Änderungen und neue Features findest du im [Changelog](../CHANGELOG.md).

## Die 4 Qualitätsfaktoren

| Faktor | Standard | Dimension | Beschreibung |
|--------|----------|-----------|--------------|
| **Orientierungs-Kompatibilität** | 25% | Pathos | Körperliche Polarität und Anziehung. OSHO: "Nur Extreme können sich wirklich anziehen." |
| **Archetyp-Übereinstimmung** | 25% | Logos | Fundamentale Beziehungsphilosophie: "Wie wollen wir Beziehung leben?" |
| **Dominanz-Harmonie** | 25% | Pathos | Energetische Dynamik. OSHO: "Tao - eine Energie, zwei Ausdrucksformen." |
| **Geschlechts-Attraktion** | 25% | Pathos | Gender-Chemie und Identitäts-Resonanz |

*Gewichtungen sind über UI-Slider anpassbar (Summe = 100%)*

## Berechnung (v3.1)

### Hauptformel

```
Q = (O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)
```

**v3.1:** Dynamische Gewichtungen (über UI anpassbar) + dimensionale Resonanz. Jeder Faktor wird mit seiner **eigenen Resonanz-Dimension** multipliziert:

| Faktor | Standard | × | Resonanz-Dimension |
|--------|----------|---|--------------------|
| O (Orientierung) | 25% | × | 🔥 R_Leben |
| A (Archetyp) | 25% | × | 🧠 R_Philosophie |
| D (Dominanz) | 25% | × | ⚡ R_Dynamik |
| G (Geschlecht) | 25% | × | 💚 R_Identität |

Jeder Faktor wird einzeln auf 0-100% bewertet. Die **Resonanz (R)** ist ein Meta-Faktor (0.5-1.5), der moduliert, wie gut Kopf (Logos) und Herz (Pathos) zusammenschwingen.

### Multi-Dimensionale Resonanz (v3.1)

Resonanz wird auf **4 disjunkte Dimensionen** berechnet – keine Überlappung, jedes Bedürfnis wird nur einmal gezählt:

| Dimension | Emoji | Frage | Bedürfnisse |
|-----------|-------|-------|-------------|
| **Identität** | 💚 | *Wer bin ich, wer bist du?* | 10 Needs (Authentizität, Selbstausdruck...) |
| **Philosophie** | 🧠 | *Wie wollen wir Beziehung leben?* | 17 Needs (Bindung, Autonomie...) |
| **Leben** | 🔥 | *Was zieht uns an?* | 18 Needs (Intimität, Sexualität...) |
| **Dynamik** | ⚡ | *Wer führt, wer folgt?* | 18 Needs (Kontrolle, Hingabe...) |

### Resonanz-Formel pro Dimension

```
R_dim = 0.9 + (Match_dim × 0.2)
```

**Wertebereich:** R variiert zwischen 0.9 (minimale Resonanz) und 1.1 (maximale Resonanz).

**Interpretation pro Dimension:**

| R-Wert | Status | Symbol |
|--------|--------|--------|
| ≥ 1.05 | Resonanz | ⬆️ |
| 0.97-1.05 | Neutral | ➡️ |
| ≤ 0.97 | Dissonanz | ⬇️ |

> **Wichtige Unterscheidung:**
> - **63 GFK-Bedürfnisse** → Dimensionaler Match in den R-Werten
> - **30 baseAttributes** → Lifestyle-Filter (K.O.-Kriterien wie Kinderwunsch, Wohnform)

### Match-Berechnung pro Dimension

Für jede Dimension werden die relevanten Bedürfnisse verglichen:

```
Match = Σ(100 - |Wert_P1 - Wert_P2|) / 100 / n
```

*Beispiel: Bei 80% Match in der Philosophie-Dimension: R_Phil = 0.9 + (0.8 × 0.2) = 1.06 ⬆️*

### GFK-Kommunikationsfaktor (K)

Die Gewaltfreie Kommunikation (GFK) nach Marshall Rosenberg moduliert den dimensionalen Koeffizienten:

| ICH / Partner | hoch | mittel | niedrig |
|---------------|------|--------|---------|
| **hoch**      | 1.0  | 0.75   | 0.35    |
| **mittel**    | 0.75 | 0.5    | 0.2     |
| **niedrig**   | 0.35 | 0.2    | 0.0     |

```
R_final = R_dimensional × (0.85 + K × 0.15)
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

## Rechenbeispiel (v3.1)

**Duo (Cis Frau, Submissiv, Hetero) × Duo-Flex (Cis Mann, Dominant, Hetero)**

### Schritt 1: Faktor-Scores

| Faktor | Wert | Grund |
|--------|------|-------|
| A (Archetyp) | 75 | Duo ↔ Duo-Flex = nah verwandt |
| O (Orientierung) | 100 | Hetero + Hetero bei M/F = voll kompatibel |
| D (Dominanz) | 100 | Submissiv + Dominant = komplementär |
| G (Geschlecht) | 100 | Cis Frau × Cis Mann = Match |

### Schritt 2: Dimensionale Resonanz (angenommen)

| Dimension | Match | R-Wert | Status |
|-----------|-------|--------|--------|
| 🧠 R_Philosophie | 30% | 0.9 + (0.3 × 0.2) = **0.96** | ⬇️ Dissonanz |
| 🔥 R_Leben | 90% | 0.9 + (0.9 × 0.2) = **1.08** | ⬆️ Resonanz |
| ⚡ R_Dynamik | 60% | 0.9 + (0.6 × 0.2) = **1.02** | ➡️ Neutral |
| 💚 R_Identität | 80% | 0.9 + (0.8 × 0.2) = **1.06** | ⬆️ Resonanz |

### Schritt 3: Dimensionale Multiplikation (v3.1)

```
Q = (A × w_A × R_Phil) + (O × w_O × R_Leben) + (D × w_D × R_Dyn) + (G × w_G × R_Ident)

Q = (75 × 0.15 × 0.96) +     = 10.8  🧠
    (100 × 0.40 × 1.08) +    = 43.2  🔥
    (100 × 0.20 × 1.02) +    = 20.4  ⚡
    (100 × 0.25 × 1.06)      = 26.5  💚
    ─────────────────────────────────
    finalScore               = 101 → 100%
```

**Vergleich mit Legacy (baseScore × R_gesamt):**
- baseScore = 11.25 + 40 + 20 + 25 = 96.25
- Legacy: 96.25 × 1.03 = **99%**
- v3.1: **100%** (dimensionale Resonanz belohnt starke Übereinstimmung in O, D, G)

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
