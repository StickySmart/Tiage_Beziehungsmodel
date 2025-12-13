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

### Multi-Dimensionale Resonanz (v3.1)

**NEU:** Resonanz wird auf 4 **disjunkte** Dimensionen berechnet:

```
R_Identität    = 0.9 + (Match_geschlecht × 0.2)    💚  (10 Needs)
R_Philosophie  = 0.9 + (Match_archetyp × 0.2)      🧠  (17 Needs)
R_Leben        = 0.9 + (Match_orientierung × 0.2)  🔥  (18 Needs)
R_Dynamik      = 0.9 + (Match_dominanz × 0.2)      ⚡  (18 Needs)

Finale Berechnung (v3.1):
Q = (A×w_A×R_Phil) + (O×w_O×R_Leben) + (D×w_D×R_Dyn) + (G×w_G×R_Ident)
```

**Faktor-Resonanz-Mapping:**
| Faktor | Gewicht | × | Resonanz |
|--------|---------|---|----------|
| A (Archetyp) | 25% | × | 🧠 R_Philosophie |
| O (Orientierung) | 25% | × | 🔥 R_Leben |
| D (Dominanz) | 25% | × | ⚡ R_Dynamik |
| G (Geschlecht) | 25% | × | 💚 R_Identität |

**Interpretation pro Dimension:**
| R-Wert | Status | Symbol |
|--------|--------|--------|
| ≥ 1.05 | Resonanz | ⬆️ |
| 0.97-1.05 | Neutral | ➡️ |
| ≤ 0.97 | Dissonanz | ⬇️ |

**Wertebereich:** R variiert zwischen 0.9 (minimale Resonanz) und 1.1 (maximale Resonanz).

## Die vier Dimensionen der Kompatibilität (v3.1)

Die multi-dimensionale Resonanz erfasst Beziehungskompatibilität auf **vier disjunkten Dimensionen**:

| Dimension | Emoji | Frage | Bedürfnis-Quelle | Anzahl |
|-----------|-------|-------|------------------|--------|
| **Identität** | 💚 | *Wer bin ich, wer bist du?* | GESCHLECHT_NEEDS | 10 |
| **Philosophie** | 🧠 | *Wie wollen wir Beziehung leben?* | ARCHETYP_NEEDS | 17 |
| **Leben** | 🔥 | *Was zieht uns an?* | ORIENTIERUNG_NEEDS | 18 |
| **Dynamik** | ⚡ | *Wer führt, wer folgt?* | DOMINANZ_NEEDS | 18 |

Diese Dimensionen sind **disjunkt** – keine Überlappung, jedes Bedürfnis wird nur einmal gezählt.

## Resonanz-Datenfluss (v3.1)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INPUT: Person 1 & Person 2                          │
│                                                                             │
│  Profil 1: { archetyp, orientierung, dominanz, geschlecht }                 │
│  Profil 2: { archetyp, orientierung, dominanz, geschlecht }                 │
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
│  → Jedes Profil hat ~63 Bedürfnisse mit Werten 0-100                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 2: Dimensionale Matches berechnen                      │
│              (_calculatePartialMatch pro Dimension)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │ 💚 IDENTITÄT    │  │ 🧠 PHILOSOPHIE  │  │ 🔥 LEBEN        │              │
│  │ GESCHLECHT_NEEDS│  │ ARCHETYP_NEEDS  │  │ ORIENTIERUNG_   │              │
│  │ (10 Bedürfnisse)│  │ (17 Bedürfnisse)│  │ NEEDS (18)      │              │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘              │
│           │                    │                    │                       │
│  ┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐              │
│  │ Match = Σ(100-  │  │ Match = Σ(100-  │  │ Match = Σ(100-  │              │
│  │ |v1-v2|)/100/n  │  │ |v1-v2|)/100/n  │  │ |v1-v2|)/100/n  │              │
│  │ → 0.0 - 1.0     │  │ → 0.0 - 1.0     │  │ → 0.0 - 1.0     │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │ ⚡ DYNAMIK      │                                                        │
│  │ DOMINANZ_NEEDS  │                                                        │
│  │ (18 Bedürfnisse)│                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│  ┌────────▼────────┐                                                        │
│  │ Match = Σ(100-  │                                                        │
│  │ |v1-v2|)/100/n  │                                                        │
│  │ → 0.0 - 1.0     │                                                        │
│  └─────────────────┘                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 3: R-Werte pro Dimension                               │
│              (R_dim = 0.9 + Match × 0.2)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Match=0.8 → R=0.9+(0.8×0.2)=1.06 ⬆️ Resonanz   (≥1.05)                     │
│  Match=0.3 → R=0.9+(0.3×0.2)=0.96 ⬇️ Dissonanz  (≤0.97)                     │
│  Match=0.6 → R=0.9+(0.6×0.2)=1.02 ➡️ Neutral    (0.97-1.05)                 │
│                                                                             │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐              │
│  │ 💚 R_Ident   │ 🧠 R_Phil    │ 🔥 R_Leben   │ ⚡ R_Dyn     │              │
│  │    1.06 ⬆️   │    0.96 ⬇️   │    1.08 ⬆️   │    1.02 ➡️   │              │
│  └──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┘              │
│         │              │              │              │                      │
│         └──────────────┴──────┬───────┴──────────────┘                      │
│                               │                                             │
│                               ▼                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              SCHRITT 4: Dimensionale Multiplikation (v3.1)                  │
│              Q = Σ(Faktor × Gewicht × R_Dimension)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  A=75 × 0.15 × R_Phil=0.96   =  10.8  🧠                            │    │
│  │  O=100 × 0.40 × R_Leben=1.08 =  43.2  🔥                            │    │
│  │  D=100 × 0.20 × R_Dyn=1.02   =  20.4  ⚡                            │    │
│  │  G=90 × 0.25 × R_Ident=1.06  =  23.9  💚                            │    │
│  │  ─────────────────────────────────────                              │    │
│  │  finalScore = 10.8 + 43.2 + 20.4 + 23.9 = 98                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Vergleich mit Legacy (baseScore × R_gesamt):                               │
│  baseScore = 11.25 + 40 + 20 + 22.5 = 93.75                                 │
│  Legacy: 93.75 × 1.03 = 97                                                  │
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
Q = (O × 0.25 × R_Leben) + (A × 0.25 × R_Philosophie) + (D × 0.25 × R_Dynamik) + (G × 0.25 × R_Identität)
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
