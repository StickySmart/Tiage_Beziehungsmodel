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
│  1. EINGABE     │ ──► │  2. ABWEICHUNG      │ ──► │  3. SYNTHESE    │
│  (pro Person)   │     │  (pro Person)       │     │  (Paar-Match)   │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

### Schritt 1: Eingabe

Jede Person gibt ein: **Archetyp** (8 Typen), **Orientierung**, **Dominanz**, **Geschlecht** und **224 Bedürfnisse** (0-100).

### Schritt 2: Archetyp-Abweichung

Pro Person wird geprüft: *Wie gut passen deine Bedürfnisse zu deinem Archetyp?*

Das Ergebnis sind 4 **R-Faktoren** (Resonanz), die messen, wie kohärent du deinen Archetyp lebst.

### Schritt 3: Synthese

Die R-Faktoren beider Personen fließen in die Kompatibilitätsberechnung ein:

1. **Lifestyle-Filter** – K.O.-Kriterien prüfen (z.B. Kinderwunsch)
2. **Faktor-Scores** – Matrix-basierte Kompatibilität pro Faktor
3. **Bedürfnis-Match** – Alle 224 Bedürfnisse vergleichen
4. **Finale Berechnung** – Mit R-Faktoren multiplizieren

---

## Die 4 Qualitätsfaktoren

| Faktor | Dimension | R-Faktor | Beschreibung |
|--------|-----------|----------|--------------|
| **O** Orientierung | Pathos | R1 🔥 Leben | Körperliche Polarität und Anziehung |
| **A** Archetyp | Logos | R2 🧠 Philosophie | Beziehungsphilosophie: "Wie wollen wir leben?" |
| **D** Dominanz | Pathos | R3 ⚡ Dynamik | Energetische Dynamik: Wer führt, wer folgt? |
| **G** Geschlecht | Pathos | R4 💚 Identität | Gender-Chemie und Identitäts-Resonanz |

*Standardgewichtung: je 25%, anpassbar über UI-Slider*

### Hauptformel (v3.1)

```
Q = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

### R-Faktoren (Resonanz)

Die R-Faktoren messen die Kohärenz zwischen deinen Bedürfnissen und dem Archetyp-Ideal:

```
R = 0.5 + (Match × 1.0)    // Range: 0.5 - 1.5
```

| R-Wert | Status | Bedeutung |
|--------|--------|-----------|
| ≥ 1.3 | ⬆️⬆️ Starke Resonanz | Sehr hohe Kohärenz mit Archetyp |
| 1.05-1.29 | ⬆️ Resonanz | Gute Kohärenz |
| 0.95-1.04 | ➡️ Neutral | Durchschnittliche Kohärenz |
| 0.7-0.94 | ⬇️ Dissonanz | Geringe Kohärenz |
| < 0.7 | ⬇️⬇️ Starke Dissonanz | Archetyp passt nicht zu Bedürfnissen |

---

## Bedürfnis-Übereinstimmung (224 Bedürfnisse)

Die **Bedürfnis-Übereinstimmung** zeigt die gewichtete Übereinstimmung über alle 224 Bedürfnisse:

```
Für JEDES Bedürfnis:
    Ähnlichkeit = 100 - |Wert Person 1 - Wert Person 2|
    Gewicht = (Wert Person 1 + Wert Person 2) / 2
    Beitrag = Ähnlichkeit × Gewicht

Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)
```

### Kategorien

| Kategorie | IDs | Anzahl |
|-----------|-----|--------|
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

### Bewertung

| Score | Bedeutung |
|-------|-----------|
| **60-100%** 🟢 | Starke Übereinstimmung |
| **40-59%** 🟡 | Moderate Übereinstimmung, bewusste Kommunikation wichtig |
| **0-39%** 🔴 | Geringe Übereinstimmung, fundamentale Unterschiede |

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

### R-Faktoren (aus Bedürfnis-Kohärenz)

| Dimension | Match | R-Wert | Status |
|-----------|-------|--------|--------|
| 🧠 Philosophie | 30% | **0.8** | ⬇️ Dissonanz |
| 🔥 Leben | 90% | **1.4** | ⬆️⬆️ Resonanz |
| ⚡ Dynamik | 60% | **1.1** | ⬆️ Resonanz |
| 💚 Identität | 80% | **1.3** | ⬆️⬆️ Resonanz |

### Berechnung

```
Q = (A × w × R2) + (O × w × R1) + (D × w × R3) + (G × w × R4)
  = (75 × 0.25 × 0.8)  +  (100 × 0.25 × 1.4)  +  (100 × 0.25 × 1.1)  +  (100 × 0.25 × 1.3)
  =       15.0         +        35.0          +        27.5          +        32.5
  = 110 → 100%
```

**Interpretation:** Starke Resonanz in Leben und Identität kompensiert die Dissonanz in Philosophie. Das Paar sollte an der Beziehungsphilosophie arbeiten.

---

## Die 8 Archetypen

| Archetyp | Beschreibung |
|----------|--------------|
| **Single** | Autonomes Leben ohne Primärbeziehung |
| **Duo** | Monogame Zweierbeziehung mit Exklusivität |
| **Duo-Flex** | Primärbeziehung mit vereinbarten Öffnungen |
| **Solopoly** | Mehrere gleichwertige Beziehungen, Fokus Autonomie |
| **Polyamor** | Tiefe emotionale Bindungen zu mehreren Partnern |
| **RA** | Relationship Anarchist - Ablehnung aller Hierarchien |
| **LAT** | Living Apart Together - Partnerschaft ohne Zusammenleben |
| **Aromantisch** | Fokus auf platonische Verbindungen |

---

## Ergebnis-Interpretation

| Score | Bewertung |
|-------|-----------|
| **70-100%** | Gut – Solide Basis vorhanden |
| **50-69%** | Mittel – Erfordert bewusste Arbeit |
| **0-49%** | Herausfordernd – Fundamentale Unterschiede |

*Der Qualitätsindex ist ein Orientierungswert. Echte Beziehungen hängen von vielen weiteren Faktoren ab.*

---

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

---

## Kontakt

Fragen, Feedback oder Verbesserungsvorschläge?

E-Mail: [nerd@ti-age.de](mailto:nerd@ti-age.de)
