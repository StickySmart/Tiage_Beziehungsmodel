# Resonanz-Theorie im Tiage-Modell

> *Resonanz als Meta-Dimension der Beziehungsqualität*

## Was ist Resonanz?

Resonanz (R) ist ein **Meta-Faktor** (0.9-1.1), der moduliert, wie gut Kopf (Logos) und Herz (Pathos) zusammenschwingen.

> *"Wahrnehmung basiert auf Schwingungen und Mustern. Resonanz = Synchronität zwischen inneren neuronalen Rhythmen und äußeren Signalen."*

## Die R-Formel

### Legacy-Formel (v3.0)
```
R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
```

### Multi-Dimensionale Resonanz (v3.3)

**Aktuell:** Resonanz basiert auf **18 GFK-Kategorien**, die auf 4 Resonanzfaktoren aggregiert werden.

#### Sekundäre Kategorien (NEU in v3.3)

Bedürfnisse können zu **mehreren Kategorien** beitragen:
- **Primäre Kategorie:** 100% Gewichtung
- **Sekundäre Kategorien:** 30% Gewichtung (`SECONDARY_WEIGHT: 0.3`)

*Beispiel:* "Berührung" (primär: Existenz, sekundär: Zuneigung, Dynamik, Sicherheit)
→ Bei Wert 80: Existenz +80, Zuneigung +24, Dynamik +24, Sicherheit +24

#### R-Formel (v3.3)

```
R = 0.5 + (Score / 100)

Score 0   → R = 0.5  (minimale Resonanz)
Score 50  → R = 1.0  (neutral)
Score 100 → R = 1.5  (maximale Resonanz)

Finale Berechnung:
Q = (A×w_A×R2) + (O×w_O×R1) + (D×w_D×R3) + (G×w_G×R4)
```

**Faktor-Resonanz-Mapping:**
| Faktor | Gewicht | × | Resonanz | Kategorien |
|--------|---------|---|----------|------------|
| A (Archetyp) | 25% | × | 🧠 R2 Philosophie | 8 Kategorien |
| O (Orientierung) | 25% | × | 🔥 R1 Leben | 4 Kategorien |
| D (Dominanz) | 25% | × | ⚡ R3 Dynamik | 2 Kategorien |
| G (Geschlecht) | 25% | × | 💚 R4 Identität | 4 Kategorien |

**Interpretation pro Dimension:**
| R-Wert | Status | Symbol |
|--------|--------|--------|
| ≥ 1.1 | Starke Resonanz | ⬆️ |
| 0.9-1.1 | Neutral | ➡️ |
| ≤ 0.9 | Dissonanz | ⬇️ |

**Wertebereich:** R variiert zwischen 0.5 (minimale Resonanz) und 1.5 (maximale Resonanz).

## Die 18 Kategorien und ihre Zuordnung (v3.3)

Die 18 GFK-Kategorien werden auf 4 Resonanzfaktoren aggregiert:

| R-Faktor | Emoji | Kategorien (#K) | Anzahl |
|----------|-------|-----------------|--------|
| **R1 Leben** | 🔥 | Existenz, Zuneigung, Muße, Intimität & Romantik | 4 |
| **R2 Philosophie** | 🧠 | Freiheit, Teilnahme, Identität, Lebensplanung, Finanzen & Karriere, Werte & Haltungen, Soziales Leben, Praktisches Leben | 8 |
| **R3 Dynamik** | ⚡ | Dynamik, Sicherheit | 2 |
| **R4 Identität** | 💚 | Verständnis, Erschaffen, Verbundenheit, Kommunikationsstil | 4 |

**Wichtig:** Durch sekundäre Kategorien fließen Bedürfnisse in mehrere Faktoren ein (mit 30% Gewichtung).

## Resonanz-Datenfluss (v3.3)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INPUT: Person 1 & Person 2                          │
│                                                                             │
│  Profil 1: { archetyp, orientierung, dominanz, geschlecht, needs }          │
│  Profil 2: { archetyp, orientierung, dominanz, geschlecht, needs }          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 1: Bedürfnis-Profile generieren                        │
│              (BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil) │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Profil1_Needs = basis[archetyp] + domMod + geschMod + oriMod               │
│  Profil2_Needs = basis[archetyp] + domMod + geschMod + oriMod               │
│                                                                             │
│  → Jedes Profil hat ~88 Bedürfnisse mit Werten 0-100                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 2: Kategorie-Scores mit Sekundär-Gewichtung            │
│              (calculateCategoryScoresWithSecondary)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Für jedes Bedürfnis:                                                       │
│    - Primäre Kategorie: +100% des Wertes                                    │
│    - Sekundäre Kategorien: +30% des Wertes (SECONDARY_WEIGHT)               │
│                                                                             │
│  Beispiel: Berührung=80 (primär: existenz, sekundär: zuneigung, dynamik)    │
│    → existenz: +80, zuneigung: +24, dynamik: +24                            │
│                                                                             │
│  18 Kategorien werden berechnet:                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ existenz, zuneigung, musse, intimitaet_romantik,                     │   │
│  │ freiheit, teilnahme, identitaet, lebensplanung,                      │   │
│  │ finanzen_karriere, werte_haltungen, soziales_leben, praktisches_leben│   │
│  │ dynamik, sicherheit,                                                 │   │
│  │ verstaendnis, erschaffen, verbundenheit, kommunikation_stil          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 3: Aggregation zu 4 Resonanzfaktoren                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                                   │
│  │ 🔥 R1 LEBEN     │  │ 🧠 R2 PHILOSOPHIE│                                  │
│  │ 4 Kategorien    │  │ 8 Kategorien    │                                   │
│  │ (Nähe-Distanz)  │  │ (Werte/Planung) │                                   │
│  └────────┬────────┘  └────────┬────────┘                                   │
│           │                    │                                            │
│  ┌─────────────────┐  ┌─────────────────┐                                   │
│  │ ⚡ R3 DYNAMIK   │  │ 💚 R4 IDENTITÄT │                                   │
│  │ 2 Kategorien    │  │ 4 Kategorien    │                                   │
│  │ (Macht/Kink)    │  │ (Kommunikation) │                                   │
│  └────────┬────────┘  └────────┬────────┘                                   │
│                                                                             │
│  Score pro R = Durchschnitt der zugeordneten Kategorien                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 4: R-Werte berechnen (v3.3)                            │
│              R = 0.5 + (Score / 100)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Score=80  → R=0.5+(80/100)=1.30  ⬆️ Starke Resonanz (≥1.1)                 │
│  Score=50  → R=0.5+(50/100)=1.00  ➡️ Neutral         (0.9-1.1)              │
│  Score=30  → R=0.5+(30/100)=0.80  ⬇️ Dissonanz       (≤0.9)                 │
│                                                                             │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐              │
│  │ 🔥 R1 Leben  │ 🧠 R2 Phil   │ ⚡ R3 Dyn    │ 💚 R4 Ident  │              │
│  │    1.20 ⬆️   │    0.95 ➡️   │    1.30 ⬆️   │    1.05 ➡️   │              │
│  └──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┘              │
│         │              │              │              │                      │
│         └──────────────┴──────┬───────┴──────────────┘                      │
│                               │                                             │
│                               ▼                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 5: Dimensionale Multiplikation (v3.3)                  │
│              Q = Σ(Faktor × Gewicht × R_Dimension)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  A=75 × 0.25 × R2=0.95  = 17.8  🧠                                  │    │
│  │  O=80 × 0.25 × R1=1.20  = 24.0  🔥                                  │    │
│  │  D=70 × 0.25 × R3=1.30  = 22.8  ⚡                                  │    │
│  │  G=85 × 0.25 × R4=1.05  = 22.3  💚                                  │    │
│  │  ─────────────────────────────────────                              │    │
│  │  finalScore = 17.8 + 24.0 + 22.8 + 22.3 = 87                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Hinweis: Alle Faktoren haben jetzt 25% Gewichtung (statt 15/40/20/25)      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OUTPUT                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  {                                                                          │
│    score: 88,                                                               │
│    resonanz: {                                                              │
│      coefficient: 1.03,                                                     │
│      dimensional: {                                                         │
│        identitaet:  { rValue: 1.06, status: 'resonanz',  emoji: '⬆️' },     │
│        philosophie: { rValue: 0.96, status: 'dissonanz', emoji: '⬇️' },     │
│        leben:       { rValue: 1.08, status: 'resonanz',  emoji: '⬆️' },     │
│        dynamik:     { rValue: 1.02, status: 'neutral',   emoji: '➡️' }      │
│      }                                                                      │
│    }                                                                        │
│  }                                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Legacy: Die drei Komponenten (v3.0)

| Komponente | Faktor | Gewicht |
|------------|--------|---------|
| **Profil-Match** | M | 35% |
| **Logos-Pathos-Balance** | B | 35% |
| **GFK-Kommunikation** | K | 30% |

### Komponente 1: Profil-Match (M)

Ähnlichkeit der **88 GFK-Bedürfnisse** zwischen zwei Profilen.

> **Hinweis:** Das System unterscheidet zwischen zwei Matching-Ebenen:
> - **88 GFK-Bedürfnisse** → Emotionaler Match (M) in der Resonanz-Formel
> - **30 baseAttributes** → Lifestyle-Filter (K.O.-Kriterien wie Kinderwunsch, Wohnform)

#### Berechnung

Die Übereinstimmung wird **gewichtet nach Wichtigkeit** berechnet:

```
Für jedes Bedürfnis mit Gewicht > 30:
  Ähnlichkeit = 100 - |Wert_Person1 - Wert_Person2|
  Gewicht = (Wert_Person1 + Wert_Person2) / 2

M = Σ(Ähnlichkeit × Gewicht) / Σ(Gewicht)
```

#### Kategorisierung

| Kategorie | Kriterium | Bedeutung |
|-----------|-----------|-----------|
| **Gemeinsam** | Beide > 70, Differenz < 15 | Starke gemeinsame Basis |
| **Unterschiedlich** | Differenz > 30 | Potenzielle Konfliktfelder |
| **Komplementär** | Einer > 70, anderer < 50 | Kann positiv oder negativ sein |

*Beispiel: Bei 72% gewichteter Übereinstimmung: M = 72*

#### Die 88 GFK-Bedürfnisse (Auszug)

Die Bedürfnisse basieren auf Marshall Rosenbergs Gewaltfreier Kommunikation:

- **Verbindung:** Nähe, Akzeptanz, Vertrauen, Empathie, Gemeinschaft
- **Autonomie:** Unabhängigkeit, Selbstbestimmung, Raum haben, Wahlfreiheit
- **Sicherheit:** Geborgenheit, Stabilität, Beständigkeit, Vertrauen
- **Wachstum:** Lernen, Entwicklung, Herausforderung, Kompetenz
- **Ausdruck:** Authentizität, Kreativität, Selbstausdruck, Gesehen werden

→ Vollständige Liste: `profiles/gfk-beduerfnisse.js`

#### Die 30 baseAttributes (Lifestyle-Filter)

Diese werden **separat** für K.O.-Prüfungen verwendet:

| Kategorie | Beispiele |
|-----------|-----------|
| **Lebensplanung** | kinderWunsch, eheWunsch, wohnform, karrierePrioritaet |
| **Kommunikation** | emotionaleOffenheit, konfliktverhalten |
| **Intimität** | sexFrequenz, koerperlicheNaehe, romantikBeduernis |
| **Werte** | religiositaet, traditionVsModern, umweltbewusstsein |

→ Vollständige Liste: `profiles/archetyp-definitions.js`

### Komponente 2: Logos-Pathos-Balance (B)

Das Verhältnis zwischen rationaler Struktur und emotionaler Dynamik.

| Konzept | Definition | TIAGE-Zuordnung |
|---------|------------|-----------------|
| **Logos** | Statische Qualität | A (Attraction) |
| **Pathos** | Dynamische Qualität | (O + D + G) / 3 |

```
B = (100 - |Logos - Pathos|) / 100
```

*Beispiel: Bei A=72% und avg(O,D,G)=65%: B = (100 - 7) / 100 = 0.93*

### Komponente 3: GFK-Kommunikationsfaktor (K)

Die **Gewaltfreie Kommunikation** (GFK) nach Marshall Rosenberg als Schlüssel zur Resonanz.

> *"Wahre Verbindung entsteht durch empathisches Zuhören und ehrliches Ausdrücken von Bedürfnissen."* – Marshall Rosenberg

| ICH / Partner | hoch | mittel | niedrig |
|---------------|------|--------|---------|
| **hoch**      | 1.0  | 0.75   | 0.35    |
| **mittel**    | 0.75 | 0.5    | 0.2     |
| **niedrig**   | 0.35 | 0.2    | 0.0     |

**Warum 30% Gewichtung?**

Kommunikation ist fundamental für nachhaltige Resonanz – nicht nur bei Konflikten, sondern im gesamten Beziehungsprozess:

- **Kennenlernen:** Offenheit, authentisch von sich erzählen
- **Verstehen:** Empathisches Zuhören, Bedürfnisse des anderen erkennen
- **Ausdrücken:** Eigene Gefühle und Bedürfnisse klar formulieren
- **Verhandeln:** Kompromisse finden wenn Bedürfnisse divergieren

**GFK-Kombinationen:**
- **Hohe GFK beider Partner:** Tiefe Verbindung von Anfang an möglich
- **Niedrige GFK beider Partner:** Missverständnisse und destruktive Muster
- **Asymmetrie:** Der GFK-kompetentere Partner trägt mehr Last

### Beispielrechnung

**Gegeben:**
- M = 80 (80% Profil-Match)
- B = 0.93 (7% Logos-Pathos-Differenz)
- K = 0.75 (hoch + mittel GFK)

```
R = 0.9 + [(80/100 × 0.35) + (0.93 × 0.35) + (0.75 × 0.30)] × 0.2
R = 0.9 + [0.28 + 0.326 + 0.225] × 0.2
R = 0.9 + 0.166
R = 1.066 → Override aktiv!
```

## Anwendung im Qualitätsindex

```
Qualitätsindex = [(Orientierung × 40%) + (Archetyp × 25%) + (Dominanz × 20%) + (Geschlecht × 15%)] × R
```

## Die Zustands-Skala

| Zustand | Beschreibung | In Beziehungen |
|---------|--------------|----------------|
| **Flow** | Optimale Synchronität | Tiefe Verbindung, "im Einklang" |
| **Hyper-Synchronität** | Übermäßige Muster-Erkennung | Verliebtheit / Abhängigkeit |
| **Hypo-Synchronität** | Reduzierte Bindung | Entfremdung, "aneinander vorbei" |

## Resonanz-Override: Jenseits der Konditionierung

OSHO lehrte: **Sexuelle Orientierung ist Konditionierung, nicht Natur.** Der natürliche Mensch ist jenseits von Labels.

### Was ist der Resonanz-Override?

Normalerweise gilt: Wenn die Orientierung inkompatibel ist (z.B. zwei heterosexuelle Männer), ergibt das 0% Orientierungs-Score und damit ein K.O.-Kriterium.

Der **Resonanz-Override** ermöglicht eine Ausnahme: Wenn zwei Menschen auf einer tiefen Ebene resonieren (R ≥ 1.05), kann diese Verbindung die konditionierten Grenzen überschreiten.

### Override-Effekte

| Resonanz (R) | Override-Effekt | O_effektiv |
|--------------|-----------------|------------|
| < 1.05 | Kein Override | 0% (K.O.) |
| 1.05 | Schwache Öffnung | 5% |
| 1.08 | Moderate Öffnung | 8% |
| 1.10 | Maximale Öffnung | 10% |

**Formel:** `O_effektiv = (R - 1.0) × 100`

### Philosophische Begründung (OSHO)

> *"Liebe kennt keine Grenzen. Wenn zwei Seelen wirklich resonieren, sind alle gesellschaftlichen Kategorien nur noch Schatten an der Wand."*

Resonanz repräsentiert die tiefere, unkonditionierte Ebene der Verbindung – jenseits dessen, was Gesellschaft und Erziehung uns beigebracht haben.

**Hinweis:** Dies ist keine Empfehlung, sondern eine philosophische Möglichkeit, die das Modell abbildet. Der Override zeigt: Tiefe Resonanz kann konditionierte Muster transzendieren.

## Neurowissenschaftliche Grundlagen

### Die Wissenschaftler hinter der Theorie

| Forscher | Beitrag | Bezug zum Modell |
|----------|---------|------------------|
| **Buzsáki & Singer** | Neuronale Rhythmen | Gamma-Oszillationen als Basis für "auf einer Wellenlänge sein" |
| **Friston** | Predictive Coding | Kompatibilität = niedrige Vorhersage-Fehler im Umgang miteinander |
| **Kapur** | Aberrant Salience | Flow vs. Psychose als Spektrum der Synchronität |
| **Levitin** | Psychoakustik | Musik als externes Regulierungssystem für Emotionen |
| **Aron** | Hochsensitivität | Reizlast-Management als Beziehungsfaktor |

### Weitere Kernthesen

- **Zufall** = unerkannte Ordnung (Synchronizitäten als Muster)
- **Hochsensitivität + Reizlast** → Zustandsschwankungen

## Wissenschaftliche Quellen

- Buzsáki, G. (2006): *Rhythms of the Brain.* Oxford University Press.
- Friston, K. (2010): The free-energy principle. *Nature Reviews Neuroscience.*
- Kapur, S. (2003): Psychosis as Aberrant Salience. *Am J Psychiatry.*
- Levitin, D.J. (2006): *This Is Your Brain on Music.* Dutton.
- Aron, E.N. (1996): *The Highly Sensitive Person.* Broadway Books.

*Die vollständige wissenschaftliche Dokumentation findet sich in: [profiles/research-sources.md](../../profiles/research-sources.md) (Abschnitt 9)*
