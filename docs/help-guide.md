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

### Schritt 2: R-Faktoren berechnen (v4.0)

Pro Person wird gemessen: *Wie gut passen deine Bedürfnisse zu deinem Archetyp?*

Die Berechnung basiert auf dem Abgleich deiner Bedürfniswerte mit den Archetyp-Idealwerten – **gewichtet nach den 4 Entwicklungsstufen** (S1–S4). Das Ergebnis sind 4 **R-Faktoren** (Resonanz) pro Person.

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
meanR            = combineRFactors(R1…R4, ICH und PARTNER)
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

## R-Faktoren (Resonanz, v4.0)

Die R-Faktoren messen pro Dimension, wie gut die Bedürfnisse einer Person zum Archetyp-Ideal passen. Die Berechnung erfolgt in zwei Schritten:

### Schritt 1: Individueller R-Wert (pro Person)

Für jedes Bedürfnis im Archetyp-Profil:

```
abweichung = (tatsächlicherWert − Archetyp-Idealwert) / 50
match      = 1 + abweichung
```

- `match = 1.0` → Bedürfnis entspricht genau dem Archetyp-Ideal
- `match > 1.0` → Bedürfnis übersteigt das Archetyp-Ideal (stärkere Ausprägung)
- `match < 1.0` → Bedürfnis liegt unter dem Archetyp-Ideal

Anschließend wird ein **Stufen-gewichteter Durchschnitt** gebildet (die 4 Entwicklungsstufen S1–S4 können unterschiedlich stark gewichtet sein):

```
avgMatch = Σ(match × Stufengewicht) / Σ(Stufengewicht)
R        = avgMatch^2.5
```

Die Potenz 2.5 verstärkt Abweichungen überproportional: kleine Differenzen bleiben klein, große Differenzen fallen stark ins Gewicht.

| avgMatch | R-Wert | Bedeutung |
|---------|--------|-----------|
| 1.2 (+20%) | **1.58** | Deutliche Verstärkung |
| 1.0 (=) | **1.00** | Neutral |
| 0.8 (−20%) | **0.57** | Deutliche Abschwächung |
| 0.5 (−50%) | **0.18** | Starke Abschwächung |

### Schritt 2: Kombination beider Personen

Die R-Werte von ICH und PARTNER werden kombiniert und belohnen gleichartige Resonanzprofile:

```
R_kombiniert = (R_ich + R_partner) / 2 × min(R_ich, R_partner) / max(R_ich, R_partner)
```

Wenn beide Partner ähnlich hohe R-Werte haben, bleibt der kombinierte R-Wert nahe an ihrem Durchschnitt. Wenn einer deutlich höher ist als der andere, wird der kombinierte Wert reduziert.

### Resonanz-Verstärkung

Wenn `meanR > 1.0`, wird der finale Score zusätzlich verstärkt:

```
boost      = (meanR − 1.0) × 0.5
finalScore = Q × (1 + boost)
```

Dies ermöglicht Scores über 100% bei besonders hoher gemeinsamer Resonanz.

---

## Die 16 Entwicklungsstufen-Bedürfnisse (V4)

Das **Entwicklungsstufen-System** basiert auf 16 maßgeblichen Bedürfnissen (#B1–#B16), die in 4 Stufen organisiert sind:

| Stufe | Name | Bedürfnisse |
|-------|------|-------------|
| **S1** Fundament | Existenz & Sicherheit | Wohlbefinden · Sicherheit · Leichtigkeit · Orientierung |
| **S2** Entfaltung | Kraft & Ausdruck | Wirksamkeit · Freiheit · Intensität · Entwicklung |
| **S3** Verbundenheit | Zugehörigkeit & Resonanz | Gemeinschaft · Anerkennung · Gerechtigkeit · Verbundenheit |
| **S4** Sinn | Identität & Bedeutung | Selbsterkenntnis · Sinn · Integrität · Selbstentfaltung |

Diese 16 Bedürfnisse haben eine **Doppelfunktion**:
1. Sie definieren das persönliche **Entwicklungsprofil** (im Osho-Karten-Bereich sichtbar)
2. Ihre Prioritätseinstellung (0/1/2) beeinflusst die **Stufen-Gewichtung** in der R-Faktor-Berechnung

> Die übrigen 210 Bedürfnisse fließen weiterhin in den vollständigen Paar-Bedürfnis-Match (226 Bedürfnisse) ein.

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

### R-Faktoren (kombiniert, aus Bedürfnisprofilen berechnet)

| Dimension | avgMatch ICH | avgMatch Partner | R kombiniert |
|-----------|-------------|-----------------|--------------|
| 🧠 R2 Philosophie | 0.92 | 0.92 | **0.80** |
| 🔥 R1 Leben | 1.14 | 1.12 | **1.38** |
| ⚡ R3 Dynamik | 1.04 | 1.04 | **1.11** |
| 💚 R4 Identität | 1.12 | 1.10 | **1.28** |

### Berechnung

```
Gewichte: wO = wA = wD = wG = 0.25 (alle auf Normal)

rawCompatibility = (75 × 0.25) + (100 × 0.25) + (100 × 0.25) + (100 × 0.25)
                 = 18.75 + 25.0 + 25.0 + 25.0
                 = 93.75

meanR = (0.80 + 1.38 + 1.11 + 1.28) / 4 = 1.14

Q = 93.75 × 1.14 = 106.9

Resonanz-Boost: (1.14 − 1.0) × 0.5 = 0.07
finalScore ≈ 106.9 × 1.07 ≈ 114 → 100% (gekappt)
```

**Interpretation:** Starke Resonanz in Leben und Identität verstärkt das Ergebnis. Die leichte Dissonanz in Philosophie zeigt: Das Paar sollte an ihrer gemeinsamen Beziehungsphilosophie arbeiten.

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
