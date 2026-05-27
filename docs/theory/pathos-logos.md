# Pathos und Logos im Tiage-Modell

> *Die duale Struktur der Beziehungsqualität*
> **Aktueller Stand: v3.2 (calculationEngine.js)**

---

## Grundkonzept: 25:75 Gewichtung

Das Tiage-Modell teilt Beziehungsqualität in zwei fundamentale Dimensionen:

| Dimension | Anteil | Ursprung | Pirsig-Begriff |
|-----------|--------|----------|----------------|
| **Pathos** | 75% | Gefühl | Dynamische Qualität |
| **Logos** | 25% | Verstand | Statische Qualität |

Diese Gewichtung ergibt sich **automatisch aus der Gleichverteilung der 4 Faktoren**: Jeder der 4 AGOD-Faktoren trägt 25% bei. Da drei davon (O, D, G) Pathos-Faktoren sind, entfallen 75% auf Pathos.

---

## Logos (25% — Verstand)

Die rationale, strukturgebende Dimension.

### Eigenschaften

- Bewährte Muster, die Stabilität schaffen
- Rationale Entscheidungsgrundlagen
- Strukturelle Kompatibilität
- Langfristige Planbarkeit

### Manifestation im Modell

**Archetyp-Übereinstimmung (A) — 25% des Gesamtscores**

Die fundamentale Beziehungsphilosophie: *"Wie wollen wir Beziehung leben?"*

| Beispiel | Bedeutung |
|----------|-----------|
| Single ↔ Polyamor | Niedrige Logos-Übereinstimmung |
| Duo ↔ Duo-Flex | Hohe Logos-Übereinstimmung |

---

## Pathos (75% — Gefühl)

Die emotionale, anziehende Dimension.

### Eigenschaften

- Kraft für Veränderung und Wachstum
- Spontane Anziehung
- Emotionale Resonanz
- Energetische Dynamik

### Manifestation im Modell

| Faktor | Anteil | Beschreibung |
|--------|--------|--------------|
| **Orientierungs-Kompatibilität (O)** | 25% | Körperliche Polarität und Anziehung |
| **Geschlechts-Attraktion (G)** | 25% | Gender-Chemie und Identitäts-Resonanz |
| **Dominanz-Harmonie (D)** | 25% | Energetische Dynamik (Tao) |

---

## Philosophische Grundlagen

### Pirsig: Statische vs. Dynamische Qualität

- **Statische Qualität (Logos):** Strukturierte, wiederholbare Muster — das Fundament, das Beziehungen Stabilität gibt
- **Dynamische Qualität (Pathos):** Kreative Kraft für Wachstum — das Lebendige, das Beziehungen am Laufen hält

### OSHO: Bewusstheit und Polarität

> *"Nur Extreme können sich wirklich anziehen."*

> *"Tao — eine Energie, zwei Ausdrucksformen."*

---

## Die Balance-Berechnung

Die Logos-Pathos-Balance (B) misst, wie ausgeglichen Kopf und Herz im Ergebnis zusammenwirken:

```
Logos  = A (Archetyp-Score)
Pathos = (O + D + G) / 3

B = (100 − |Logos − Pathos|) / 100    → Bereich: 0.0–1.0
```

**Quelle:** `js/synthesis/calculationEngine.js` → `calculateLogosPathosBalance()`

### Beispiel

| Wert | Ergebnis |
|------|---------|
| Archetyp-Score (A) | 72 |
| Durchschnitt O, D, G | 65 |
| Differenz | \|72 − 65\| = 7 |
| Balance B | (100 − 7) / 100 = **0.93** |

Eine hohe Balance (nahe 1.0) bedeutet: Kopf und Herz sind im Einklang.

### Rolle im System

B ist eine **Anzeigedimension**, nicht Teil der Hauptformel. Die Balance fließt zusammen mit M (Profil-Match) und K (GFK-Faktor) in `calculateResonanz()` ein:

```
R_display = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

Dieser R-Wert erscheint im Ausgabe-Objekt (`resonanz.B`, `resonanz.M`) und wird in der UI angezeigt. Die **Hauptformel** verwendet dagegen die dimensionsspezifischen R1–R4 aus den Bedürfnissen:

```
Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
```

**Quelle:** `js/synthesis/calculationEngine.js` → `calculateResonanz()`

---

## Warum 75% Pathos?

Das Modell gewichtet emotionale Faktoren höher, weil:

1. **"Pathos vor Logos"** — Menschen erleben Beziehung zuerst emotional/körperlich (Chemie, Anziehung)
2. **Die Archetyp-Frage kommt später** — "Wie wollen wir Beziehung leben?" stellt sich erst nach den initialen Pathos-Faktoren
3. **Zen/Osho-Perspektive** — Akzeptiere was IST (die gefühlte Anziehung), dann folgt die bewusste Wahl
4. **Gleichgewicht der Faktoren** — Jeder der 4 Faktoren trägt gleichmäßig 25% bei, aber 3 von 4 sind Pathos (O, D, G)

---

## Weiterführende Dokumentation

- [Pirsig-Philosophie](pirsig.md) — Statische und dynamische Qualität im Detail
- [OSHO-Philosophie](osho.md) — Polarität und Bewusstheit
- [Resonanz-Theorie](resonance.md) — R1–R4 und die Hauptformel
- [Die 4 Faktoren](factors.md) — A/O/D/G im Detail
