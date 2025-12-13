# Anleitung: Neues Bedürfnis hinzufügen

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

### 1. Welche Kategorie?

| ID | Kategorie | Passt für |
|----|-----------|-----------|
| #K1 | Existenz | Grundbedürfnisse, Überleben |
| #K2 | Sicherheit | Stabilität, Geborgenheit |
| #K3 | Zuneigung | Liebe, Nähe, Wärme |
| #K4 | Verständnis | Verstanden werden, Empathie |
| #K5 | Freiheit | Autonomie, Selbstbestimmung |
| #K6 | Teilnahme | Gemeinschaft, Zugehörigkeit |
| #K7 | Muße | Erholung, Genuss, Spiel |
| #K8 | Identität | Selbstausdruck, Authentizität |
| #K9 | Erschaffen | Kreativität, Gestaltung |
| #K10 | Verbundenheit | Spiritualität, Transzendenz |
| #K11 | Dynamik | BDSM, Machtaustausch |

**Für "interesse_an_metaphysik":** `#K10` (Verbundenheit) oder `#K8` (Identität)

→ Wir wählen: **#K10 (Verbundenheit)**

---

### 2. Welche Perspektive?

| ID | Perspektive | Passt für |
|----|-------------|-----------|
| #P1 | GFK | Empirische, universelle Bedürfnisse |
| #P2 | Osho | Tantra, Spiritualität, Nicht-Anhaften |
| #P3 | Pirsig | Qualität, Philosophie, Achtsamkeit |
| #P4 | Kink | BDSM, Dynamik, Machtaustausch |

**Für "interesse_an_metaphysik":** Philosophie/Spiritualität

→ Wir wählen: **#P3 (Pirsig)**

---

### 3. Welche Dimension?

| Dimension | R-Faktor | Passt für |
|-----------|----------|-----------|
| ORIENTIERUNG_NEEDS | R1 | Sexualität, Anziehung, Intimität |
| ARCHETYP_NEEDS | R2 | Beziehungsphilosophie, Lebensstil |
| DOMINANZ_NEEDS | R3 | Macht, Kontrolle, Hingabe |
| GESCHLECHT_NEEDS | R4 | Identität, Ausdruck, Authentizität |

**Für "interesse_an_metaphysik":** Philosophische Grundhaltung

→ Wir wählen: **ARCHETYP_NEEDS (R2)**

---

### 4. Nächste freie ID?

Prüfe in `beduerfnis-ids.js` die höchste vergebene ID.

**Aktuell:** #B220 ist vergeben

→ Wir verwenden: **#B221**

---

## Schritt 1: Haupt-Definition

**Datei:** `profiles/definitions/beduerfnis-ids.js`

**Suche:** Die Sektion für Kategorie #K10 (Verbundenheit)

**Füge hinzu:**

```javascript
// In der beduerfnisse-Objekt, nach den anderen #K10 Einträgen:

'#B221': {
    key: 'interesse_an_metaphysik',
    kategorie: '#K10',
    label: 'Interesse an Metaphysik'
},
```

---

## Schritt 2: Kategorie-Liste

**Datei:** `profiles/definitions/gfk-beduerfnisse.js`

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
        interesse_an_metaphysik: { value: 50, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    duo: {
        interesse_an_metaphysik: { value: 40, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    duo_flex: {
        interesse_an_metaphysik: { value: 55, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    solopoly: {
        interesse_an_metaphysik: { value: 65, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    polyamor: {
        interesse_an_metaphysik: { value: 60, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    ra: {
        interesse_an_metaphysik: { value: 75, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    lat: {
        interesse_an_metaphysik: { value: 45, id: '#B221', label: 'Interesse an Metaphysik' }
    },
    aromantisch: {
        interesse_an_metaphysik: { value: 55, id: '#B221', label: 'Interesse an Metaphysik' }
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
kernbeduerfnisse: {
    // ... bestehende ...
    '#B221': 50,  // interesse_an_metaphysik - Neutral
}
```

### duo.js
```javascript
'#B221': 40,  // interesse_an_metaphysik - Eher praktisch orientiert
```

### duo-flex.js
```javascript
'#B221': 55,  // interesse_an_metaphysik - Offener für Reflexion
```

### solopoly.js
```javascript
'#B221': 65,  // interesse_an_metaphysik - Hohe Selbstreflexion
```

### polyamor.js
```javascript
'#B221': 60,  // interesse_an_metaphysik - Alternative Denkweise
```

### ra.js
```javascript
'#B221': 75,  // interesse_an_metaphysik - Philosophisch fundiert
```

### lat.js
```javascript
'#B221': 45,  // interesse_an_metaphysik - Moderate Affinität
```

### aromantisch.js
```javascript
'#B221': 55,  // interesse_an_metaphysik - Hinterfragt Normen
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
├── Kategorie: #K10 (Verbundenheit)
├── Perspektive: #P3 (Pirsig)
├── Dimension: ARCHETYP_NEEDS (R2)
├── Werte: 40-75 (je nach Archetyp)
└── Modifier: Orientierung +5/+10 für homo/bi
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
*Beispiel-Bedürfnis: interesse_an_metaphysik (#B221)*
