# Die 4 Qualitätsfaktoren

> *Wie das Tiage-Modell Beziehungsqualität berechnet*

## Übersicht

Das Tiage-Beziehungsmodell verwendet **4 Hauptfaktoren** zur Berechnung der Beziehungsqualität:

| Faktor | Gewicht | Dimension | Beschreibung |
|--------|---------|-----------|--------------|
| **Orientierung** | 25% | Pathos | Sexuelle Orientierung und Anziehungsrichtung |
| **Geschlecht** | 25% | Pathos | Gender-Chemie und Identitäts-Resonanz |
| **Dominanz** | 25% | Pathos | Energetische Dynamik und Machtverhältnis |
| **Archetyp** | 25% | Logos | Fundamentale Beziehungsphilosophie |

---

## 1. Orientierungs-Faktor (25%)

**Dimension:** Pathos (Gefühl)

Definiert die sexuelle Orientierung und damit die grundlegende Anziehungsrichtung.

### Die Orientierungen

| Orientierung | Beschreibung |
|--------------|-------------|
| **Heterosexuell** | Anziehung zum anderen Geschlecht |
| **Homosexuell** | Anziehung zum gleichen Geschlecht |
| **Bisexuell** | Anziehung zu mehreren Geschlechtern |

### KO-Kriterien

**Hard-KO (0%):** Geometrisch unmögliche Kombinationen
- Hetero♂ + Hetero♂ (beide suchen Frauen)
- Hetero♀ + Hetero♀ (beide suchen Männer)
- Homo♂ + Lesbe♀ (beide suchen jemand anderen)

**Soft-KO (10%):** Unwahrscheinlich aber möglich

---

## 2. Archetyp-Faktor (25%)

**Dimension:** Logos (Verstand)

Beschreibt die fundamentale Beziehungsphilosophie – wie zwei Menschen zusammenleben möchten.

### Die 8 Archetypen

| Archetyp | Beschreibung |
|----------|-------------|
| **Single** | Autonomes Leben ohne Primärbeziehung |
| **Duo** | Klassische monogame Zweierbeziehung mit Exklusivität |
| **Duo-Flex** | Primärbeziehung mit vereinbarten Öffnungen |
| **Solopoly** | Mehrere gleichwertige Beziehungen mit Fokus auf Autonomie |
| **Polyamor** | Tiefe emotionale Bindungen zu mehreren Partnern |
| **RA** | Relationship Anarchist – Ablehnung aller Beziehungs-Hierarchien |
| **LAT** | Living Apart Together – Feste Partnerschaft ohne Zusammenleben |
| **Aromantisch** | Fokus auf platonische Verbindungen ohne romantische Komponente |

### Berechnung

Die Archetyp-Kompatibilität wird über eine 8×8 Matrix berechnet (`archetype-matrix.json`), die alle 64 möglichen Kombinationen mit Scores für 6 Kategorien enthält:

| Kategorie | Bedeutung |
|-----------|-----------|
| A | Beziehungsphilosophie |
| B | Werte-Alignment |
| C | Nähe-Distanz-Präferenzen |
| D | Autonomie-Bedürfnisse |
| E | Kommunikations-Matching |
| F | Soziale Kompatibilität |

---

## 3. Dominanz-Faktor (25%)

**Dimension:** Pathos (Gefühl)

Energetische Dynamik und Machtverhältnis zwischen Partnern.

### Die 4 Dominanz-Typen

| Typ | Beschreibung |
|-----|-------------|
| **Dominant** | Assertiv, führend, selbstsicher, direktiv |
| **Submissiv** | Empfänglich, unterstützend, adaptiv, nachfolgend |
| **Switch** | Kann beide Rollen einnehmen, je nach Situation |
| **Ausgeglichen** | Gleichgewicht zwischen Aktion und Rezeptivität |

### Status

Jeder Typ kann als **gelebt** (aktiv praktiziert) oder **interessiert** (offen für Erkundung) markiert werden.

### Harmonietypen

| Kombination | Score | Erklärung |
|-------------|-------|-----------|
| Dominant + Submissiv | 100% | Komplementäre Polarität |
| Ausgeglichen + Ausgeglichen | 95% | Tao-Balance |
| Switch + Switch | 90% | Flexible Harmonie |
| Dominant + Dominant | 55% | Gleiche Pole |
| Submissiv + Submissiv | 55% | Gleiche Pole |

---

## 4. Geschlechts-Faktor (25%)

**Dimension:** Pathos (Gefühl)

Feinjustierung der Gender-Chemie als Ergänzung zum Orientierungs-Faktor.

### Das P/S-System (Primary/Secondary)

**Primär (Körper):**
| Primary | Beschreibung |
|---------|-------------|
| Mann | Biologisch/körperlich männlich |
| Frau | Biologisch/körperlich weiblich |
| Inter | Intersex |

**Sekundär (Identität):**
| Secondary | Bedeutung |
|-----------|-----------|
| Cis | Identität entspricht Körper |
| Trans | Identität entgegengesetzt zu Körper |
| Nonbinär | Weder männlich noch weiblich |
| Fluid | Geschlecht variabel/fließend |
| Unsicher | Noch nicht geklärt |

---

## Resonanz-Koeffizient (v3.1)

Zusätzlich zu den 4 Hauptfaktoren gibt es einen **Meta-Faktor**, der das Ergebnis moduliert.

### Multi-Dimensionale Resonanz

Jeder Faktor hat seine **eigene Resonanz-Dimension** basierend auf dem Bedürfnis-Match:

| Dimension | Emoji | Faktor | Bedürfnisse |
|-----------|-------|--------|-------------|
| **R_Philosophie** | 🧠 | Archetyp | 17 Needs (Bindung, Autonomie, Lebensplanung) |
| **R_Leben** | 🔥 | Orientierung | 18 Needs (Sexualität, Intimität, Tantra) |
| **R_Dynamik** | ⚡ | Dominanz | 18 Needs (Führung, Hingabe, Machtdynamik) |
| **R_Identität** | 💚 | Geschlecht | 10 Needs (Authentizität, Selbstausdruck) |

**Formel pro Dimension:**
```
R_dim = 0.9 + (Match_dim × 0.2)
```

**Interpretation:**
| R-Wert | Status | Symbol |
|--------|--------|--------|
| ≥ 1.05 | Resonanz | ⬆️ |
| 0.97-1.05 | Neutral | ➡️ |
| ≤ 0.97 | Dissonanz | ⬇️ |

Der Resonanz-Koeffizient bewegt sich zwischen **0.9 und 1.1** pro Dimension.

---

## Gesamtformel (v3.1)

```
Q = (O × 0.25 × R₁) + (A × 0.25 × R₂) + (D × 0.25 × R₃) + (G × 0.25 × R₄)
```

Wobei:
- O = Orientierungs-Score (0-100) × 25% × R₁ (R_Leben)
- A = Archetyp-Score (0-100) × 25% × R₂ (R_Philosophie)
- D = Dominanz-Score (0-100) × 25% × R₃ (R_Dynamik)
- G = Geschlechts-Score (0-100) × 25% × R₄ (R_Identität)

### Wichtige Unterscheidung

- **88 GFK-Bedürfnisse** → Emotionaler Match in der Resonanz-Formel
- **30 baseAttributes** → Lifestyle-Filter (K.O.-Kriterien wie Kinderwunsch, Wohnform)

---

## Ergebnis-Interpretation

| Score | Bewertung | Bedeutung |
|-------|-----------|-----------|
| **70-100%** | Gut | Solide Basis vorhanden |
| **50-69%** | Mittel | Erfordert bewusste Arbeit |
| **0-49%** | Herausfordernd | Fundamentale Unterschiede |

*Der Qualitätsindex ist ein Orientierungswert. Echte Beziehungen hängen von vielen weiteren Faktoren ab.*

---

## Weiterführende Dokumentation

- [Tiage-Synthese](tiage-synthesis.md) – Das Gesamtkonzept
- [Pathos/Logos](pathos-logos.md) – Die Gewichtung im Detail
- [Resonanz-Theorie](resonance.md) – Der Meta-Faktor
