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

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  1. EINGABE     │ ──► │  2. R-FAKTOREN      │ ──► │  3. SYNTHESE    │
│  (pro Person)   │     │  (aus Bedürfnissen) │     │  (Paar-Match)   │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

### Schritt 1: Eingabe

Jede Person gibt ein: **Archetyp** (8 Typen), **Orientierung**, **Dominanz**, **Geschlecht** und **226 Bedürfnisse** (0–100).

### Schritt 2: R-Faktoren berechnen

Pro Person wird aus den 226 Bedürfnissen gemessen: *Wie gut passen deine Bedürfnisse zu deinem Archetyp?*

Das Ergebnis sind 4 **R-Faktoren** (Resonanz), die die Kohärenz zwischen deinen Bedürfnissen und dem Archetyp-Ideal beschreiben.

### Schritt 3: Synthese

Die R-Faktoren beider Personen fließen in die Kompatibilitätsberechnung ein:

1. **Lifestyle-Filter** – K.O.-Kriterien prüfen (z.B. Kinderwunsch, Lebensform)
2. **Faktor-Scores** – Archetypen-Matrix-Kompatibilität pro Faktor
3. **Bedürfnis-Match** – Alle 226 Bedürfnisse vergleichen
4. **Finale Berechnung** – Gewichtete Faktoren × mittlere Resonanz

---

## Die 4 Qualitätsfaktoren

| Faktor | Standard | Dimension | R-Faktor | Beschreibung |
|--------|----------|-----------|----------|--------------|
| **O** Orientierung | 25% | Pathos 🔥 | R1 Leben | Körperliche Polarität und Anziehung |
| **A** Archetyp | 25% | Logos 🧠 | R2 Philosophie | Beziehungsphilosophie: „Wie wollen wir leben?" |
| **D** Dominanz | 25% | Pathos ⚡ | R3 Dynamik | Energetische Dynamik: Wer führt, wer folgt? |
| **G** Geschlecht | 25% | Pathos 💚 | R4 Identität | Gender-Chemie und Identitäts-Resonanz |

*Die Gewichtungen sind per UI-Slider anpassbar (0 = Egal / 1 = Normal / 2 = Wichtig / 3 = Sehr wichtig).*

---

## Hauptformel

```
Q = rawCompatibility × meanR
```

Wobei:

```
rawCompatibility = (O × wO) + (A × wA) + (D × wD) + (G × wG)
meanR            = (R1 + R2 + R3 + R4) / 4
```

Jeder Faktor-Score (O, A, D, G) liegt zwischen 0–100. Die Gewichte (wO, wA, wD, wG) werden aus den Slider-Einstellungen berechnet und summieren sich immer auf 100%.

---

## Gewichtungssystem

Jeder Faktor hat eine Wichtigkeitsstufe von **0 bis 3**:

| Einstellung | Bedeutung | Effektiver Anteil (Beispiel) |
|-------------|-----------|------------------------------|
| **0 – Egal** | Faktor wird ignoriert | 0% |
| **1 – Normal** | Standardgewicht | 25% (wenn alle = 1) |
| **2 – Wichtig** | Doppeltes Gewicht | ~44% (wenn dieser = 2, alle anderen = 1) |
| **3 – Sehr wichtig** | Vierfaches Gewicht | ~60% (wenn dieser = 3, alle anderen = 1) |

Die Gewichte werden **quadratisch normalisiert**: `w = gew² / Σgew²`

Das bedeutet: Wer einen Faktor auf „Sehr wichtig" stellt, beeinflusst damit das Ergebnis überproportional stark.

---

## R-Faktoren (Resonanz)

Die R-Faktoren messen pro Dimension die Kohärenz zwischen den Bedürfnissen einer Person und dem Archetyp-Ideal:

```
similarity = 1 − (avgAbweichung / 100)
R          = similarity²
```

| similarity | R-Wert | Bedeutung |
|-----------|--------|-----------|
| 1.0 (identisch) | **1.0** | Volle Kohärenz – neutrale Wirkung |
| 0.9 (10% Abw.) | **0.81** | Schwache Abschwächung |
| 0.7 (30% Abw.) | **0.49** | Deutliche Abschwächung |
| 0.5 (50% Abw.) | **0.25** | Starke Abschwächung |
| 0.0 (100% Abw.) | **0.0** | Komplette Auflösung |

> Die quadratische Formel bestraft Inkohärenz stark: 50% Abweichung halbiert nicht den Score, sondern reduziert ihn auf ein Viertel.

Die kombinierten R-Faktoren beider Personen fließen als **mittlerer R-Wert** (`meanR`) in die Hauptformel ein.

### Resonanz-Verstärkung

Wenn `meanR > 1.0` (beide Partner leben ihren Archetyp kohärent), wird der Score zusätzlich verstärkt:

```
boost = (meanR − 1.0) × 0.5
finalScore = Q × (1 + boost)
```

Dies ermöglicht Scores über 100% bei besonders hoher Resonanz.

---

## Bedürfnis-Übereinstimmung (226 Bedürfnisse)

Die **Bedürfnis-Übereinstimmung** zeigt die gewichtete Übereinstimmung über alle 226 Bedürfnisse:

```
Für JEDES Bedürfnis:
    Ähnlichkeit = 100 − |Wert Person 1 − Wert Person 2|
    Gewicht     = (Wert Person 1 + Wert Person 2) / 2
    Beitrag     = Ähnlichkeit × Gewicht

Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)
```

### Kategorien

| Kategorie | IDs | Anzahl |
|-----------|-----|--------|
| Kernbedürfnisse | #B1–#B88 | 88 |
| Spezial | #B89 | 1 |
| Lebensplanung | #B90–#B126 | 37 |
| Finanzen & Karriere | #B127–#B148 | 22 |
| Kommunikationsstil | #B149–#B176 | 28 |
| Soziales Leben | #B177–#B203 | 27 |
| Intimität & Romantik | #B204–#B208 | 5 |
| Dynamik erweitert | #B209–#B220 | 12 |
| Sexuelle Bedürfnisse | #B221–#B224 | 4 |
| Symmetrische Paare | #B225–#B226 | 2 |
| **Total** | | **226** |

### Bewertung

| Score | Bedeutung |
|-------|-----------|
| **60–100%** 🟢 | Starke Übereinstimmung |
| **40–59%** 🟡 | Moderate Übereinstimmung – bewusste Kommunikation wichtig |
| **0–39%** 🔴 | Geringe Übereinstimmung – fundamentale Unterschiede |

---

## Rechenbeispiel

**Duo (Cis Frau, Submissiv, Hetero) × Duo-Flex (Cis Mann, Dominant, Hetero)**

### Faktor-Scores

| Faktor | Wert | Grund |
|--------|------|-------|
| A (Archetyp) | 75 | Duo ↔ Duo-Flex = nah verwandt |
| O (Orientierung) | 100 | Hetero + Hetero bei M/F = kompatibel |
| D (Dominanz) | 100 | Submissiv + Dominant = komplementär |
| G (Geschlecht) | 100 | Cis Frau × Cis Mann = Match |

### R-Faktoren (aus den Bedürfnisprofilen berechnet)

| Dimension | Similarity | R-Wert | Bedeutung |
|-----------|-----------|--------|-----------|
| 🧠 R2 Philosophie | 0.89 | **0.80** | Leichte Dissonanz |
| 🔥 R1 Leben | 1.18 | **1.40** | Starke Resonanz |
| ⚡ R3 Dynamik | 1.05 | **1.10** | Resonanz |
| 💚 R4 Identität | 1.14 | **1.30** | Starke Resonanz |

*R-Werte > 1.0 entstehen, wenn die Bedürfnisse des Paares komplementär zum Archetyp-Ideal passen.*

### Berechnung

```
Gewichte: wO = wA = wD = wG = 0.25 (alle auf Normal)

rawCompatibility = (75 × 0.25) + (100 × 0.25) + (100 × 0.25) + (100 × 0.25)
                 = 18.75 + 25.0 + 25.0 + 25.0
                 = 93.75

meanR = (0.80 + 1.40 + 1.10 + 1.30) / 4
      = 4.60 / 4
      = 1.15

Q = 93.75 × 1.15 = 107.8

Resonanz-Boost: (1.15 − 1.0) × 0.5 = 0.075
finalScore = 107.8 × (1 + 0.075) ≈ 116 → 100% (gekappt)
```

**Interpretation:** Starke Resonanz in Leben und Identität kompensiert die leichte Dissonanz in Philosophie. Das Paar sollte an ihrer gemeinsamen Beziehungsphilosophie arbeiten.

---

## Die 8 Archetypen

| Archetyp | Beschreibung |
|----------|--------------|
| **Single** | Autonomes Leben ohne Primärbeziehung |
| **Duo** | Monogame Zweierbeziehung mit Exklusivität |
| **Duo-Flex** | Primärbeziehung mit vereinbarten Öffnungen |
| **Solopoly** | Mehrere gleichwertige Beziehungen, Fokus Autonomie |
| **Polyamor** | Tiefe emotionale Bindungen zu mehreren Partnern |
| **RA** | Relationship Anarchist – Ablehnung aller Hierarchien |
| **LAT** | Living Apart Together – Partnerschaft ohne Zusammenleben |
| **Aromantisch** | Fokus auf platonische Verbindungen ohne romantische Komponente |

---

## Ergebnis-Interpretation

| Score | Bewertung | Bedeutung |
|-------|-----------|-----------|
| **70–100%** | Gut | Solide Basis vorhanden |
| **50–69%** | Mittel | Erfordert bewusste Arbeit |
| **0–49%** | Herausfordernd | Fundamentale Unterschiede |

*Der Qualitätsindex ist ein Orientierungswert. Echte Beziehungen hängen von vielen weiteren Faktoren ab.*

---

## Weiterführende Dokumentation

### Philosophische Grundlagen

- [Tiage-Synthese](theory/tiage-synthesis.md) – Das Gesamtkonzept
- [Pirsig-Philosophie](theory/pirsig.md) – Metaphysik der Qualität
- [OSHO-Philosophie](theory/osho.md) – Bewusstsein und Beziehung
- [Pathos/Logos](theory/pathos-logos.md) – Die 75:25 Gewichtung
- [Resonanz-Theorie](theory/resonance.md) – Der Meta-Faktor
- [Die 4 Faktoren](theory/factors.md) – Alle Qualitätsfaktoren im Detail

### Rechtliches

- [Datenschutz](legal/datenschutz.md)
- [Nutzungsbedingungen](legal/nutzungsbedingungen.md)

### Wissenschaftliche Quellen

- [Research Sources](../profiles/docs/research-sources.md) – Vollständige Quellensammlung

---

## Kontakt

Fragen, Feedback oder Verbesserungsvorschläge?

E-Mail: [nerd@ti-age.de](mailto:nerd@ti-age.de)
