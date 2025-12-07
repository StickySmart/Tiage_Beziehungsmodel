# Gaußsches Verteilungsmodell der Bedürfnisse

> *Statistische Grundlage für die Bedürfnis-Werte im Tiage-Beziehungsmodell*

---

## Grundprinzip

Jeder Bedürfniswert im Tiage-Modell repräsentiert den **Erwartungswert (μ)** einer Gaußschen Normalverteilung für eine spezifische Merkmalskombination.

```
Für: Archetyp + Geschlecht + Orientierung + Dominanz

→ Jedes Bedürfnis Y hat einen Wert X (0-100)
→ X = μ (Mittelwert) der Normalverteilung
→ 80% der Menschen mit dieser Kombination liegen im Konfidenzintervall
```

---

## Mathematische Definition

### Normalverteilung

Die Wahrscheinlichkeitsdichte einer Normalverteilung:

```
f(x) = (1 / (σ√(2π))) × e^(-(x-μ)²/(2σ²))
```

| Symbol | Bedeutung | Im Tiage-Modell |
|--------|-----------|-----------------|
| **μ** | Mittelwert (Erwartungswert) | Der gespeicherte Wert (z.B. `naehe: 75`) |
| **σ** | Standardabweichung | Variabilität innerhalb der Gruppe |
| **x** | Individueller Wert | Tatsächlicher Wert einer Person |

### Konfidenzintervall (80%)

```
P(μ - 1.28σ ≤ X ≤ μ + 1.28σ) = 0.80
```

Das bedeutet: **80% der Population** mit dieser Merkmalskombination haben einen Wert im Intervall:

```
[μ - 1.28σ, μ + 1.28σ]
```

---

## Visuelle Darstellung

```
                         Gaußsche Normalverteilung

                              ┌─────┐
                             ╱       ╲
                            ╱         ╲
                           ╱           ╲
                          ╱             ╲
                         ╱    ┌─────┐    ╲
                        ╱     │ 80% │     ╲
                       ╱      │     │      ╲
                      ╱       │     │       ╲
    ─────────────────╱────────┼──μ──┼────────╲─────────────────
                   10%        │     │        10%
                              └─────┘

                    μ-1.28σ    μ    μ+1.28σ

    Beispiel (naehe = 75, σ = 12):

                    [59.6]    [75]    [90.4]
                       └───────┴───────┘
                            80% der Duo-Submissiv-Cis-Frauen
                            bewerten "Nähe" in diesem Bereich
```

---

## Anwendung im Modell

### 1. Basis-Wert aus Archetyp

Jeder Archetyp definiert Basis-Erwartungswerte:

```javascript
// profiles/archetypen/duo.js
beduerfnisse: {
    zuneigung: {
        naehe: 95,      // μ = 95 für Duo-Archetyp
        intimitaet: 95,
        liebe: 95
    },
    freiheit: {
        unabhaengigkeit: 35,  // μ = 35 (niedrig für Duo)
        raum_haben: 40
    }
}
```

### 2. Modifikation durch Eigenschaften

Die Modifikatoren **verschieben den Erwartungswert μ**:

```javascript
// profiles/beduerfnis-modifikatoren.js

// Dominanz-Modifikator für "submissiv"
submissiv: {
    naehe: +20,           // μ_neu = μ_basis + 20
    geborgenheit: +30,
    selbstbestimmung: -20  // μ_neu = μ_basis - 20
}

// Geschlechts-Modifikator für "cis_frau"
cis_frau: {
    naehe: +20,
    empathie: +20,
    unabhaengigkeit: -10
}
```

### 3. Finale Berechnung

```
μ_final = μ_archetyp + Δ_dominanz + Δ_geschlecht + Δ_orientierung

Beispiel: Duo + Submissiv + Cis-Frau + Heterosexuell → Bedürfnis "Nähe"

μ_final = 95 + 20 + 20 + 0 = 135 → begrenzt auf 100

→ 80% dieser Gruppe bewerten "Nähe" mit ~88-100 Punkten
```

---

## Statistische Kennwerte

### Standardabweichung (σ)

Die Standardabweichung variiert je nach Bedürfnis-Kategorie:

| Kategorie | Typisches σ | Begründung |
|-----------|-------------|------------|
| **Sicherheit** | σ ≈ 10-12 | Relativ einheitlich innerhalb Gruppe |
| **Freiheit** | σ ≈ 12-15 | Höhere individuelle Variation |
| **Dynamik** | σ ≈ 15-18 | Stark von Erfahrung abhängig |
| **Lebensplanung** | σ ≈ 12-15 | Kulturell/biografisch beeinflusst |

### Konfidenz-Levels

| Konfidenz | z-Wert | Intervall |
|-----------|--------|-----------|
| **80%** | 1.28 | μ ± 1.28σ (Standard im Modell) |
| **90%** | 1.645 | μ ± 1.645σ |
| **95%** | 1.96 | μ ± 1.96σ |
| **99%** | 2.576 | μ ± 2.576σ |

### Warum 80%?

- **Praktikabilität**: 80% erfasst die Kerngruppe ohne Ausreißer
- **Varianz-Toleranz**: 20% Abweichung ist erwartbar und normal
- **Forschungsbasis**: Viele psychologische Studien nutzen 80% als Schwelle

---

## Clipping und Grenzen

### Problem: Werte außerhalb 0-100

```
μ_final = 95 + 20 + 20 = 135  → Clipping auf 100
μ_final = 20 - 25 - 10 = -15  → Clipping auf 0
```

### Interpretation

| Situation | Bedeutung |
|-----------|-----------|
| **Clipping bei 100** | Sättigung - Bedürfnis ist maximal ausgeprägt |
| **Clipping bei 0** | Abwesenheit - Bedürfnis ist nicht vorhanden |
| **Kein Clipping** | Normalbereich - volle Varianz möglich |

### Statistische Implikation

Bei Clipping wird die Normalverteilung **gestutzt (truncated)**:

```
                    Gestutzte Verteilung bei Clipping

                              ┌─────┐
                             ╱       │  ← Abgeschnitten bei 100
                            ╱        │
                           ╱         │
                          ╱          │
                         ╱    80%    │
                        ╱            │
    ───────────────────╱─────────────┤
                                    100
```

---

## Kombinations-Beispiele

### Beispiel 1: Duo + Submissiv + Cis-Frau

```
Bedürfnis: "Geborgenheit"

Basis (Duo):        μ = 95
+ Submissiv:        Δ = +30  → μ = 125 → 100 (Clipping)
+ Cis-Frau:         Δ = +20  → (bereits 100)
+ Heterosexuell:    Δ = +5   → (bereits 100)

Ergebnis: μ_final = 100, σ ≈ 10
→ 80%-Intervall: [87.2, 100]
→ Fast alle in dieser Gruppe haben maximale Geborgenheits-Bedürfnisse
```

### Beispiel 2: RA + Dominant + Nonbinär

```
Bedürfnis: "Selbstbestimmung"

Basis (RA):         μ = 100
+ Dominant:         Δ = +20  → μ = 120 → 100 (Clipping)
+ Nonbinär:         Δ = +30  → (bereits 100)
+ Bisexuell:        Δ = +15  → (bereits 100)

Ergebnis: μ_final = 100, σ ≈ 8
→ 80%-Intervall: [89.8, 100]
→ Maximale Selbstbestimmung für diese Kombination
```

### Beispiel 3: Duo-Flex + Ausgeglichen + Cis-Mann

```
Bedürfnis: "Raum haben"

Basis (Duo-Flex):   μ = 75
+ Ausgeglichen:     Δ = +5   → μ = 80
+ Cis-Mann:         Δ = +10  → μ = 90
+ Heterosexuell:    Δ = 0    → μ = 90

Ergebnis: μ_final = 90, σ ≈ 12
→ 80%-Intervall: [74.6, 100]
→ Hohes, aber nicht maximales Raumbedürfnis
```

---

## Validierung

### Empirische Grundlage

Die Werte basieren auf:

1. **Big Five Forschung** (McCrae & Costa, 1997)
2. **BDSM-Persönlichkeitsforschung** (Wismeijer & van Assen, 2013)
3. **Orientierungs-Meta-Analysen** (Allen et al., 2020)
4. **CNM/Polyamorie-Studien** (Moors et al., 2017)

Siehe: [research-sources.md](../../profiles/research-sources.md)

### 80%-Regel in der Literatur

> "In personality research, the 80% confidence interval is commonly used to describe the 'typical' range for a given trait within a population subgroup."
> — McCrae & Costa (1997)

---

## Limitationen

1. **Westliche Stichproben**: Forschung basiert hauptsächlich auf westlichen Populationen
2. **Selbstberichte**: Können durch soziale Erwünschtheit verzerrt sein
3. **Intersektionalität**: Komplexe Wechselwirkungen nicht vollständig abbildbar
4. **Individuelle Variation**: Übertrifft oft Gruppenmittelwerte

---

## Weiterführende Dokumentation

- [Score-Berechnung](score-calculation-overview.md) - Wie die Werte verwendet werden
- [Forschungsquellen](../../profiles/research-sources.md) - Wissenschaftliche Basis
- [Bedürfnis-Modifikatoren](../../profiles/beduerfnis-modifikatoren.js) - Implementierung

---

*Erstellt für das Tiage-Beziehungsmodell*
*Letzte Aktualisierung: Dezember 2024*
