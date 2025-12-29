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

---

## Workflow: Von der Eingabe zum Ergebnis

Das Tiage-Beziehungsmodell berechnet Kompatibilität in **drei Schritten**:

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  1. EINGABE     │ ──► │  2. ABWEICHUNG      │ ──► │  3. SYNTHESE    │
│  (pro Person)   │     │  (pro Person)       │     │  (Paar-Match)   │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

### Schritt 1: User-Eingabe

Jede Person gibt folgende Daten ein:

| Eingabe | Beispiel |
|---------|----------|
| **Archetyp** | Duo, Single, Polyamor, etc. (8 Typen) |
| **Orientierung** | Heterosexuell, Bisexuell, etc. |
| **Dominanz** | Dominant, Submissiv, Switch, Ausgeglichen |
| **Geschlecht** | Mann/Frau/Divers + Cis/Trans/etc. |
| **Bedürfnisse** | 224 Werte (0-100) für Intimität, Autonomie, etc. |

### Schritt 2: Archetyp-Abweichung (pro Person)

Für jede Person wird geprüft: **Wie gut passen deine Bedürfnisse zu deinem gewählten Archetyp?**

Jeder Archetyp hat ein wissenschaftlich definiertes Baseline-Profil. Die **R-Faktoren** (R1-R4) messen die Kohärenz zwischen deinen tatsächlichen Bedürfnissen und diesem Ideal:

| R-Faktor | Dimension | Fragestellung |
|----------|-----------|---------------|
| R1 | 🔥 Leben | Passen deine Intimitäts-Bedürfnisse zum Archetyp? |
| R2 | 🧠 Philosophie | Passt deine Beziehungsphilosophie zum Archetyp? |
| R3 | ⚡ Dynamik | Passt deine Dominanz-Vorstellung zum Archetyp? |
| R4 | 💚 Identität | Passt dein Identitäts-Ausdruck zum Archetyp? |

**Beispiel:** Du wählst "Duo" (monogam), aber dein Bedürfnis nach sexueller Experimentierfreude liegt bei 90% (Duo-Baseline: 40%). → Niedrigerer R1-Wert (Dissonanz).

### Schritt 3: Synthese (Paar-Kompatibilität)

Die R-Faktoren beider Personen werden **multipliziert** und fließen als Resonanz-Multiplikatoren in die finale Berechnung ein:

```
Q = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

**Ablauf der Synthese:**

1. **Lifestyle-Filter** – K.O.-Kriterien prüfen (z.B. Kinderwunsch ja/nein)
2. **R-Faktoren kombinieren** – R_Person1 × R_Person2 pro Dimension
3. **Faktor-Scores** – Matrix-basierte Kompatibilität (Archetyp, Orientierung, etc.)
4. **Bedürfnis-Match** – Alle 224 Bedürfnisse vergleichen
5. **Scores kombinieren** – Matrix + Bedürfnisse gewichten
6. **Finale Formel** – Mit R-Faktoren multiplizieren → Endergebnis

---

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
R_dim = 0.5 + (Match_dim × 1.0)
```

**Wertebereich:** R variiert zwischen 0.5 (keine Übereinstimmung) und 1.5 (perfekte Übereinstimmung).

**Interpretation pro Dimension:**

| R-Wert | Status | Symbol | Bedeutung |
|--------|--------|--------|-----------|
| ≥ 1.3 | Starke Resonanz | ⬆️⬆️ | Sehr hohe Kohärenz mit Archetyp |
| 1.05-1.29 | Resonanz | ⬆️ | Gute Kohärenz |
| 0.95-1.04 | Neutral | ➡️ | Durchschnittliche Kohärenz |
| 0.7-0.94 | Dissonanz | ⬇️ | Geringe Kohärenz |
| < 0.7 | Starke Dissonanz | ⬇️⬇️ | Archetyp passt nicht zu Bedürfnissen |

> **Wichtige Unterscheidung:**
> - **63 GFK-Bedürfnisse** → Dimensionaler Match in den R-Werten
> - **30 baseAttributes** → Lifestyle-Filter (K.O.-Kriterien wie Kinderwunsch, Wohnform)

### Match-Berechnung pro Dimension

Für jede Dimension werden die relevanten Bedürfnisse verglichen:

```
Match = Σ(100 - |Wert_P1 - Wert_P2|) / 100 / n
```

*Beispiel: Bei 80% Match in der Philosophie-Dimension: R_Phil = 0.5 + (0.8 × 1.0) = 1.3 ⬆️*

---

## Bedürfnis-Übereinstimmung (224 Bedürfnisse)

### Was bedeutet die Prozentanzeige?

Die **Bedürfnis-Übereinstimmung** zeigt die gewichtete Übereinstimmung über **alle 224 Bedürfnisse** zwischen beiden Profilen.

**Wichtig:** Dies ist keine Schätzung, sondern wird **empirisch berechnet** aus den tatsächlichen Bedürfnis-Profilen beider Personen.

### Berechnungsformel

Die Berechnung erfolgt identisch zur individuellen Bedürfnis-Berechnung:

```
Für JEDES der 224 Bedürfnisse:
    Ähnlichkeit = 100 - |Wert Person 1 - Wert Person 2|
    Gewicht = (Wert Person 1 + Wert Person 2) / 2
    Beitrag = Ähnlichkeit × Gewicht

Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)
```

**Beispiel #B90 Kinderwunsch:**
- Person 1 = 85, Person 2 = 40
- Ähnlichkeit = 100 - |85 - 40| = **55**
- Gewicht = (85 + 40) / 2 = **62.5**
- Beitrag = 55 × 62.5 = **3437.5**

### Alle 224 Bedürfnisse im Überblick

| Kategorie | Bedürfnisse | Anzahl |
|-----------|-------------|--------|
| GFK-Kern | #B1-#B88 | 88 |
| Spezial | #B89 | 1 |
| Lebensplanung | #B90-#B126 | 37 |
| Finanzen & Karriere | #B127-#B148 | 22 |
| Kommunikationsstil | #B149-#B176 | 28 |
| Soziales Leben | #B177-#B203 | 27 |
| Intimität & Romantik | #B204-#B208 | 5 |
| Dynamik erweitert | #B209-#B220 | 12 |
| Osho-Zen Integration | #B221-#B224 | 4 |
| **Total** | | **224** |

### Bewertungsstufen

| Score | Level | Bedeutung |
|-------|-------|-----------|
| **60-100%** | 🟢 Hoch | Starke Übereinstimmung in den Bedürfnissen |
| **40-59%** | 🟡 Mittel | Moderate Übereinstimmung, bewusste Kommunikation wichtig |
| **0-39%** | 🔴 Niedrig | Geringe Übereinstimmung, fundamentale Unterschiede |

### Vorteile dieser Berechnung

✅ **Empirisch statt willkürlich** - Basiert auf tatsächlichen Bedürfnis-Profilen
✅ **Transparent** - Jeder Wert ist nachvollziehbar und zu den Profilen zurückverfolgbar
✅ **Individualisiert** - Berücksichtigt persönliche Modifikatoren (Dominanz, Geschlecht, Orientierung)
✅ **Konsistent** - Dieselbe Formel wie die Gesamt-Bedürfnis-Berechnung
✅ **Automatisch aktualisiert** - Änderungen an Profilen werden sofort reflektiert

---

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
| 🧠 R_Philosophie | 30% | 0.5 + (0.3 × 1.0) = **0.8** | ⬇️ Dissonanz |
| 🔥 R_Leben | 90% | 0.5 + (0.9 × 1.0) = **1.4** | ⬆️⬆️ Starke Resonanz |
| ⚡ R_Dynamik | 60% | 0.5 + (0.6 × 1.0) = **1.1** | ⬆️ Resonanz |
| 💚 R_Identität | 80% | 0.5 + (0.8 × 1.0) = **1.3** | ⬆️⬆️ Starke Resonanz |

### Schritt 3: Dimensionale Multiplikation (v3.1)

```
Q = (A × w_A × R_Phil) + (O × w_O × R_Leben) + (D × w_D × R_Dyn) + (G × w_G × R_Ident)

Q = (75 × 0.25 × 0.8) +      = 15.0  🧠
    (100 × 0.25 × 1.4) +     = 35.0  🔥
    (100 × 0.25 × 1.1) +     = 27.5  ⚡
    (100 × 0.25 × 1.3)       = 32.5  💚
    ─────────────────────────────────
    finalScore               = 110 → 100%
```

**Interpretation:** Die starke Resonanz in Leben (🔥) und Identität (💚) kompensiert die Dissonanz in Philosophie (🧠). Das Paar hat sehr kompatible Lebensstile und Identitäten, sollte aber an der Beziehungsphilosophie arbeiten.

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
