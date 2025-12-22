# Anleitung: Neues Bedürfnis hinzufügen

> ⚠️ **WICHTIG:** Diese Anleitung verwendet `interesse_an_metaphysik` als **fiktives Platzhalter-Beispiel**.
> Die ID `#BXXX` ist ein Platzhalter - ersetze sie durch die **nächste freie ID** (siehe Schritt 4).
> Das Beispiel-Bedürfnis existiert NICHT im System und dient nur zur Veranschaulichung.

> **Beispiel:** `interesse_an_metaphysik` - Interesse an philosophischen/spirituellen Grundfragen

---

## Übersicht

Um ein neues Bedürfnis zum Ti-Age System hinzuzufügen, müssen **9 Dateien** angepasst werden:

| # | Datei | Zweck |
|---|-------|-------|
| 1 | `profiles/definitions/beduerfnis-ids.js` | Haupt-Definition (SSOT) |
| 2 | `profiles/definitions/gfk-beduerfnisse.js` | Kategorie-Zuordnung |
| 3 | `js/synthesis/constants.js` | Dimensions-Zuordnung |
| 4 | `js/synthesis/constants.js` | Archetyp-Kohärenz |
| 5 | `profiles/beduerfnis-modifikatoren.js` | Modifier (Dom/Gender/Orient) |
| 6 | `profiles/archetypen/*.js` | Basiswerte pro Archetyp (8 Dateien) |
| 7 | `js/locales/de.js` | Deutsche Übersetzung |
| 8 | `js/locales/en.js` | Englische Übersetzung |
| 9 | `js/components/PerspektivenModal.js` | Perspektive (P1-P4) |

---

## Vorarbeit: Entscheidungen treffen

Bevor du anfängst, beantworte diese Fragen:

### 1. Welche Kategorie (Primär + Sekundär)?

| ID | Kategorie | Passt für | Resonanzfaktor |
|----|-----------|-----------|----------------|
| #K1 | Existenz | Grundbedürfnisse, Überleben | R1 (Leben) |
| #K2 | Sicherheit | Stabilität, Geborgenheit | R3 (Kink) |
| #K3 | Zuneigung | Liebe, Nähe, Wärme | R1 (Leben) |
| #K4 | Verständnis | Verstanden werden, Empathie | R4 (Identität) |
| #K5 | Freiheit | Autonomie, Selbstbestimmung | R2 (Philosophie) |
| #K6 | Teilnahme | Gemeinschaft, Zugehörigkeit | R2 (Philosophie) |
| #K7 | Muße | Erholung, Genuss, Spiel | R1 (Leben) |
| #K8 | Identität | Selbstausdruck, Authentizität | R2 (Philosophie) |
| #K9 | Erschaffen | Kreativität, Gestaltung | R4 (Identität) |
| #K10 | Verbundenheit | Spiritualität, Transzendenz | R4 (Identität) |
| #K11 | Dynamik | BDSM, Machtaustausch | R3 (Kink) |

#### Sekundäre Kategorien (optional)

Jedes Bedürfnis kann **zusätzlich zu seiner primären Kategorie** auch sekundäre Kategorien haben. Diese fließen mit **30% Gewichtung** in die Resonanzfaktor-Berechnung ein.

**Beispiel "Berührung":**
- Primär: `existenz` (100% → R1)
- Sekundär: `["zuneigung", "dynamik", "sicherheit"]` (je 30% → R1, R3, R3)

**Für "interesse_an_metaphysik":** `#K10` (Verbundenheit) oder `#K8` (Identität)

→ Wir wählen: **#K10 (Verbundenheit)** als primär, **#K8 (Identität)** als sekundär

---

### 2. Welche Perspektive?

| ID | Perspektive | Passt für |
|----|-------------|-----------|
| #P1 | Statistik | Empirische Forschung, Gaußsche Übereinstimmung |
| #P2 | Konditionierung | Natürlichkeit vs. Konditionierung - was ist authentisch? |
| #P3 | Qualität | Static vs. Dynamic Quality - Balance als Fundament |
| #P4 | SexPositiv | Sex-Positive Movement, Consent, Autonomie, BDSM/Kink |

**Für "interesse_an_metaphysik":** Philosophie/Spiritualität

→ Wir wählen: **#P3 (Qualität)**

---

### 3. Welcher R-Faktor / GOD-Faktor?

> **Hinweis:** Die Kategorie (#K) bestimmt automatisch die Dimension (D1-D6).
> Der R-Faktor bestimmt, welches NEEDS-Array das Bedürfnis beeinflusst.

| NEEDS Array | R-Faktor | Passt für |
|-------------|----------|-----------|
| ORIENTIERUNG_NEEDS | R1 (Leben 🔥) | Sexualität, Anziehung, Intimität |
| ARCHETYP_NEEDS | R2 (Philosophie 🧠) | Beziehungsphilosophie, Lebensstil |
| DOMINANZ_NEEDS | R3 (Dynamik ⚡) | Macht, Kontrolle, Hingabe |
| GESCHLECHT_NEEDS | R4 (Identität 💚) | Identität, Ausdruck, Authentizität |

**Für "interesse_an_metaphysik":** Philosophische Grundhaltung

→ Wir wählen: **R2 (ARCHETYP_NEEDS)**

---

### 4. Nächste freie ID?

Prüfe in `beduerfnis-ids.js` die höchste vergebene ID.

**Aktuell:** #B220 ist vergeben

→ Wir verwenden: **#BXXX** (ersetze XXX durch nächste freie Nummer)

---

## Schritt 1: Haupt-Definition

**Datei:** `profiles/definitions/beduerfnis-ids.js`

**Suche:** Die Sektion für Kategorie #K10 (Verbundenheit)

**Füge hinzu:**

```javascript
// In der beduerfnisse-Objekt, nach den anderen #K10 Einträgen:

'#BXXX': {
    key: 'interesse_an_metaphysik',
    kategorie: '#K10',
    label: 'Interesse an Metaphysik'
},
```

---

## Schritt 2: Kategorie-Liste + Sekundäre Kategorien

**Datei:** `profiles/definitions/gfk-beduerfnisse.js`

### 2a. In der `kategorien`-Sektion

**Suche:** `verbundenheit:` Objekt im `kategorien` Block

**Füge hinzu:**

```javascript
verbundenheit: {
    name: "Verbundenheit & Transzendenz",
    beduerfnisse: [
        "spiritualitaet",
        "transzendenz",
        "sinnsuche",
        // ... bestehende Einträge ...
        "interesse_an_metaphysik"  // NEU
    ]
}
```

### 2b. In der `definitionen`-Sektion (mit sekundären Kategorien)

**Suche:** Die Sektion nach `// VERBUNDENHEIT`

**Füge hinzu:**

```javascript
interesse_an_metaphysik: {
    "#ID": "#BXXX",
    label: "Interesse an Metaphysik",
    kategorie: "verbundenheit",                    // Primär
    sekundaer: ["identitaet", "freiheit"]          // Sekundär (optional)
},
```

**Hinweis:** Die `sekundaer`-Array enthält Kategorie-Keys (nicht IDs). Die Gewichtung ist in `js/synthesis/needsIntegration.js` definiert:

```javascript
SECONDARY_WEIGHT: 0.3  // 30% für sekundäre Kategorien
```

---

## Schritt 3: Dimensions-Zuordnung

**Datei:** `js/synthesis/constants.js`

**Suche:** `ARCHETYP_NEEDS:` Array (ca. Zeile 653)

**Füge hinzu:**

```javascript
ARCHETYP_NEEDS: [
    "kinderwunsch",
    "langfristige_bindung",
    // ... bestehende Einträge ...
    "interesse_an_metaphysik"  // NEU
],
```

---

## Schritt 4: Archetyp-Kohärenz

**Datei:** `js/synthesis/constants.js`

**Suche:** `ARCHETYP_KOHAERENZ:` Objekt, Sektion `philosophie:`

**Füge für JEDEN Archetyp hinzu:**

```javascript
philosophie: {
    single: {
        // ... bestehende Einträge ...
        interesse_an_metaphysik: { value: 50, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    duo: {
        interesse_an_metaphysik: { value: 40, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    duo_flex: {
        interesse_an_metaphysik: { value: 55, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    solopoly: {
        interesse_an_metaphysik: { value: 65, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    polyamor: {
        interesse_an_metaphysik: { value: 60, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    ra: {
        interesse_an_metaphysik: { value: 75, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    lat: {
        interesse_an_metaphysik: { value: 45, id: '#BXXX', label: 'Interesse an Metaphysik' }
    },
    aromantisch: {
        interesse_an_metaphysik: { value: 55, id: '#BXXX', label: 'Interesse an Metaphysik' }
    }
}
```

**Werte-Logik:**
- RA (Relationship Anarchy): 75 - Höchste Affinität zu philosophischen Konzepten
- Solopoly/Polyamor: 60-65 - Alternative Lebensmodelle = mehr Reflexion
- Duo: 40 - Traditioneller, weniger philosophisch
- Single: 50 - Neutral

---

## Schritt 5: Modifier

**Datei:** `profiles/beduerfnis-modifikatoren.js`

**Füge in relevante Sektionen hinzu:**

```javascript
// Dominanz-Modifier (falls relevant)
dominanz: {
    dominant: {
        // ... bestehende ...
        interesse_an_metaphysik: 0  // Kein Einfluss
    },
    submissiv: {
        interesse_an_metaphysik: 0
    },
    switch: {
        interesse_an_metaphysik: +5  // Leicht erhöht (Flexibilität)
    },
    ausgeglichen: {
        interesse_an_metaphysik: 0
    }
},

// Orientierung-Modifier
orientierung: {
    hetero: {
        interesse_an_metaphysik: 0
    },
    homo: {
        interesse_an_metaphysik: +5  // Leicht erhöht (Selbstreflexion)
    },
    bi: {
        interesse_an_metaphysik: +10  // Erhöht (mehr Ambiguität)
    }
}
```

---

## Schritt 6: Archetyp-Basiswerte

**Dateien:** Alle 8 Dateien in `profiles/archetypen/`

**Für jede Datei, füge hinzu:**

### single.js
```javascript
umfrageWerte: {
    // ... bestehende ...
    '#BXXX': 50,  // interesse_an_metaphysik - Neutral
}
```

### duo.js
```javascript
'#BXXX': 40,  // interesse_an_metaphysik - Eher praktisch orientiert
```

### duo-flex.js
```javascript
'#BXXX': 55,  // interesse_an_metaphysik - Offener für Reflexion
```

### solopoly.js
```javascript
'#BXXX': 65,  // interesse_an_metaphysik - Hohe Selbstreflexion
```

### polyamor.js
```javascript
'#BXXX': 60,  // interesse_an_metaphysik - Alternative Denkweise
```

### ra.js
```javascript
'#BXXX': 75,  // interesse_an_metaphysik - Philosophisch fundiert
```

### lat.js
```javascript
'#BXXX': 45,  // interesse_an_metaphysik - Moderate Affinität
```

### aromantisch.js
```javascript
'#BXXX': 55,  // interesse_an_metaphysik - Hinterfragt Normen
```

---

## Schritt 7: Deutsche Übersetzung

**Datei:** `js/locales/de.js`

**Suche:** Bedürfnis-Labels Sektion

**Füge hinzu:**

```javascript
needs: {
    // ... bestehende ...
    interesse_an_metaphysik: "Interesse an Metaphysik",
    interesse_an_metaphysik_desc: "Das Bedürfnis, sich mit grundlegenden Fragen über die Natur der Realität, des Seins und der Existenz zu beschäftigen."
}
```

---

## Schritt 8: Englische Übersetzung

**Datei:** `js/locales/en.js`

**Füge hinzu:**

```javascript
needs: {
    // ... bestehende ...
    interesse_an_metaphysik: "Interest in Metaphysics",
    interesse_an_metaphysik_desc: "The need to engage with fundamental questions about the nature of reality, being, and existence."
}
```

---

## Schritt 9: Perspektive-Zuordnung

**Datei:** `js/components/PerspektivenModal.js`

**Suche:** `beduerfnisPerspektiven:` Objekt

**Füge hinzu:**

```javascript
beduerfnisPerspektiven: {
    // ... bestehende Pirsig-Bedürfnisse (#P3) ...
    'interesse_an_metaphysik': '#P3',  // Pirsig - Qualität/Philosophie
}
```

---

## Validierung

Nach allen Änderungen, prüfe:

### 1. Syntax-Check
```bash
# Im Projektverzeichnis:
node -c profiles/definitions/beduerfnis-ids.js
node -c profiles/definitions/gfk-beduerfnisse.js
node -c js/synthesis/constants.js
# ... für alle geänderten Dateien
```

### 2. Browser-Test
1. Öffne die Anwendung
2. Wähle verschiedene Archetypen
3. Prüfe ob "Interesse an Metaphysik" in der Bedürfnis-Liste erscheint
4. Prüfe ob der Wert sich je nach Archetyp ändert
5. Prüfe ob die Perspektive (Pirsig) korrekt angezeigt wird

### 3. Matching-Test
1. Wähle ICH + PARTNER mit unterschiedlichen Archetypen
2. Prüfe ob das neue Bedürfnis im Matching berücksichtigt wird
3. Prüfe ob R2 (Archetyp-Resonanz) sich verändert

---

## Zusammenfassung

```
interesse_an_metaphysik
├── ID: #B221
├── Kategorie (Primär): #K10 (Verbundenheit) → R4 (100%)
├── Kategorien (Sekundär): identitaet, freiheit → R2 (je 30%)
├── Perspektive: #P3 (Pirsig)
├── R-Faktor: R2 (ARCHETYP_NEEDS)
├── Werte: 40-75 (je nach Archetyp)
└── Modifier: Orientierung +5/+10 für homo/bi
```

### Sekundäre Kategorien - Berechnung

Die Funktion `TiageSynthesis.NeedsIntegration.calculateResonanzWithSecondary(needs)` berechnet die R-Werte unter Berücksichtigung der sekundären Kategorien:

```javascript
// Beispiel: Berührung mit Wert 80
// Primär: existenz (100%) → R1 +80
// Sekundär: zuneigung (30%) → R1 +24
// Sekundär: dynamik (30%) → R3 +24
// Sekundär: sicherheit (30%) → R3 +24
```

---

## Dateien-Checkliste

- [ ] `profiles/definitions/beduerfnis-ids.js`
- [ ] `profiles/definitions/gfk-beduerfnisse.js`
- [ ] `js/synthesis/constants.js` (2x: NEEDS + KOHAERENZ)
- [ ] `profiles/beduerfnis-modifikatoren.js`
- [ ] `profiles/archetypen/single.js`
- [ ] `profiles/archetypen/duo.js`
- [ ] `profiles/archetypen/duo-flex.js`
- [ ] `profiles/archetypen/solopoly.js`
- [ ] `profiles/archetypen/polyamor.js`
- [ ] `profiles/archetypen/ra.js`
- [ ] `profiles/archetypen/lat.js`
- [ ] `profiles/archetypen/aromantisch.js`
- [ ] `js/locales/de.js`
- [ ] `js/locales/en.js`
- [ ] `js/components/PerspektivenModal.js`

---

*Dokumentation erstellt: 2025-12-13*
*Platzhalter-Beispiel: interesse_an_metaphysik (#BXXX) - NICHT im System vorhanden*
