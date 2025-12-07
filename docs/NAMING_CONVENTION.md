# Tiage Naming Convention

Diese Dokumentation klärt die Begrifflichkeiten im Tiage-Code und verhindert Verwirrung zwischen ähnlichen Konzepten.

## Übersicht: Drei getrennte Konzepte

Im Tiage-System gibt es **drei verschiedene Konzepte**, die oft verwechselt werden:

| Konzept | Zweck | Code-Begriff | UI-Begriff |
|---------|-------|--------------|------------|
| **Profil-Attribute** | 30 Parameter für Matching | `baseAttributes` | "Beziehungs-Profil" |
| **Meta-Dimensionen** | Wer ich bin (beeinflusst Attribute) | `personDimensions` | "Eigenschaften" |
| **GFK-Bedürfnisse** | 88 Bedürfnisse nach Rosenberg | `needs` | "Bedürfnisse" |
| **Philosophische Werte** | Archetyp-Konzept (Pirsig/Osho) | `coreValues` | "Kernwerte" |

---

## 1. BASE ATTRIBUTES (Profil-Parameter)

### Definition
Die **30 Parameter** die beschreiben "**Wie jemand Beziehung führt**".

### Im Code
```javascript
// In archetyp-definitions.js
archetypeDefinitions.single.baseAttributes = {
    kinderWunsch: "nein",
    gespraechsBeduernis: 0.40,
    emotionaleOffenheit: 0.45,
    // ... 30 Parameter insgesamt
}

// Im komponierten Profil (profile-store.js)
profile.attributes = { ... }
```

### Die 30 Attribute nach Kategorien

#### Lebensplanung (7)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `kinderWunsch` | kategorial | "ja", "nein", "vielleicht", "unsicher" |
| `eheWunsch` | kategorial | "ja", "nein", "vielleicht" |
| `wohnform` | kategorial | "zusammen", "getrennt", "lat", "flexibel", "alleine" |
| `familieWichtigkeit` | 0.0-1.0 | Wichtigkeit der Herkunftsfamilie |
| `haustiere` | kategorial | "ja-eigene", "ja-gemeinsam", "nein", "egal", "vielleicht" |
| `karrierePrioritaet` | 0.0-1.0 | Balance Karriere vs. Beziehung |
| `finanzen` | kategorial | "getrennt", "hybrid", "gemeinsam" |

#### Kommunikation (5)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `gespraechsBeduernis` | 0.0-1.0 | Bedürfnis nach täglichem Austausch |
| `konfliktverhalten` | 0.0-1.0 | Konfrontativ (1.0) vs. Vermeidend (0.0) |
| `emotionaleOffenheit` | 0.0-1.0 | Bereitschaft Gefühle zu teilen |
| `kommunikationsstil` | 0.0-1.0 | Direkt (1.0) vs. Indirekt (0.0) |
| `feedbackBeduernis` | 0.0-1.0 | Bedürfnis nach Rückmeldung |

#### Soziales (4)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `introExtro` | 0.0-1.0 | Extrovertiert (1.0) vs. Introvertiert (0.0) |
| `freundeskreis` | kategorial | "getrennt", "gemischt", "gemeinsam" |
| `sozialeBedürfnisse` | 0.0-1.0 | Bedürfnis nach sozialen Kontakten |
| `alleinZeitBeduernis` | 0.0-1.0 | Bedürfnis nach Zeit für sich |

#### Intimität (4)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `koerperlicheNaehe` | 0.0-1.0 | Bedürfnis nach Berührung |
| `sexFrequenz` | 0.0-1.0 | Gewünschte Häufigkeit |
| `romantikBeduernis` | 0.0-1.0 | Wunsch nach romantischen Gesten |
| `koerperKontakt` | 0.0-1.0 | Allg. Körperkontakt-Bedürfnis |

#### Werte (4)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `religiositaet` | 0.0-1.0 | Wichtigkeit von Religion/Spiritualität |
| `politischeAktivitaet` | 0.0-1.0 | Politisches Engagement |
| `umweltbewusstsein` | 0.0-1.0 | Nachhaltigkeit/Umwelt |
| `traditionVsModern` | 0.0-1.0 | Modern (1.0) vs. Traditionell (0.0) |

#### Praktisches (3)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `ordnung` | 0.0-1.0 | Präferenz für Ordnung |
| `haushaltsAufteilung` | kategorial | "gleichberechtigt", "flexibel", "traditionell" |
| `reiseFrequenz` | 0.0-1.0 | Reiselust |

#### Emotionale Dynamik (3)
| Attribut | Typ | Beschreibung |
|----------|-----|--------------|
| `eifersuchtNeigung` | 0.0-1.0 | Tendenz zu Eifersucht |
| `vertrauensbasis` | 0.0-1.0 | Grundvertrauen |
| `emotionaleStabilitaet` | 0.0-1.0 | Emotionale Resilienz |

### Verwendung

```javascript
// Lifestyle-Filter prüft K.O.-Kriterien
TiageSynthesis.LifestyleFilter.check(attrs1, attrs2);

// Modifikatoren werden angewendet (Gender, Dominanz, Orientierung)
applyModifiers(profile.attributes, genderMod.modifiers);
```

---

## 2. PERSON DIMENSIONS (Meta-Eigenschaften)

### Definition
Meta-Eigenschaften die beschreiben "**Wer ich bin**" und die baseAttributes modifizieren.

### Im Code
```javascript
// In js/state.js
TiageState.personDimensions = {
    ich: {
        geschlecht: { primary: "mann", secondary: "cis" },
        dominanz: { dominant: "gelebt", submissiv: null, ... },
        orientierung: { heterosexuell: "gelebt", ... }
    },
    partner: { ... }
}
```

### Die 3 Dimensionen

| Dimension | Optionen | Modifiziert |
|-----------|----------|-------------|
| **Geschlecht** | mann/frau/inter × cis/trans/nonbinaer/fluid/suchend | Kommunikation, Emotionalität |
| **Dominanz** | dominant/submissiv/switch/ausgeglichen | Konflikt, Karriere, Nähe |
| **Orientierung** | heterosexuell/homosexuell/bisexuell | Tradition, Offenheit |

### Modifikator-Beispiel

```javascript
// In profile-store.js
genderModifiers['mann-cis'] = {
    modifiers: {
        emotionaleOffenheit: -0.1,  // Tendenz zu weniger offen
        kommunikationsstil: 0.05,   // Etwas direkter
        // ...
    }
};
```

---

## 3. GFK-BEDÜRFNISSE (Nach Marshall Rosenberg)

### Definition
Die **88 universellen Bedürfnisse** nach der Gewaltfreien Kommunikation (GFK).

### NEU: Integration ins Profil (seit v2.0)

**ALLES IM PROFIL = EINE QUELLE DER WAHRHEIT**

Die GFK-Bedürfnisse werden jetzt direkt im Profil gespeichert (`profile.needs`).
Dies vereinfacht die Formel-Berechnung und macht das System leichter verständlich.

```javascript
// NEU: Im komponierten Profil (profile-store.js)
profile = {
    archetyp: 'duo',
    gender: 'mann-cis',
    dominanz: 'dominant',
    orientierung: 'heterosexuell',

    // 30 Attribute
    attributes: { gespraechsBeduernis: 0.80, ... },

    // 88 GFK-Bedürfnisse - NEU IM PROFIL!
    needs: {
        selbstbestimmung: 50,    // Duo: 45 + dominant: +10 - hetero: -5
        geborgenheit: 90,        // Duo: 95 + dominant: -5
        vertrauen: 100,          // Duo: 95 + dominant: +5
        kontrolle_ausueben: 65,  // Basis: 50 + dominant: +15
        // ... 84 weitere
    }
}
```

### Needs-Modifikatoren (profile-store.js)

Die Needs werden durch Modifikatoren angepasst:

```javascript
needsModifiers = {
    gender: {
        'mann-cis': { raum_haben: +5, unabhaengigkeit: +5 },
        'mann-trans': { akzeptanz: +10, gesehen_werden: +10 },
        // ...
    },
    dominance: {
        'dominant': { kontrolle_ausueben: +15, selbstbestimmung: +10 },
        'submissiv': { hingabe: +15, geborgenheit: +10 },
        // ...
    },
    orientation: {
        'homosexuell': { gemeinschaft: +10, akzeptanz: +10 },
        // ...
    }
}
```

### Legacy: Quelle der Basis-Daten

```javascript
// In gfk-beduerfnisse.js (Quelle für Basis-Werte)
GfkBeduerfnisse.archetypProfile = {
    single: {
        kernbeduerfnisse: {
            autonomie: 85,
            freiheit: 90,
            // ...
        }
    }
};
```

### 11 Bedürfnis-Kategorien (GFK + BDSM-Erweiterung)

1. **Existenz**: Luft, Wasser, Nahrung, Bewegung...
2. **Sicherheit**: Beständigkeit, Schutz, Stabilität...
3. **Zuneigung**: Wärme, Nähe, Intimität, Liebe...
4. **Verständnis**: Akzeptanz, Empathie, Vertrauen...
5. **Freiheit**: Selbstbestimmung, Unabhängigkeit...
6. **Teilnahme**: Zusammenarbeit, Gemeinschaft...
7. **Muße**: Schönheit, Freizeit, Freude, Humor
8. **Identität**: Authentizität, Integrität, Sinn...
9. **Erschaffen**: Kreativität, Lernen, Ausdruck...
10. **Verbundenheit**: Inspiration, Feiern...
11. **Dynamik** (NEU): Kontrolle, Hingabe, Machtaustausch... (BDSM)

---

## 4. CORE VALUES (Philosophische Werte)

### Definition
Konzeptuelle Werte aus der Pirsig/Osho-Philosophie.
**Nur für Beschreibung**, nicht für Matching.

### Im Code
```javascript
// In archetyp-definitions.js
archetypeDefinitions.single = {
    coreValues: [
        "Autonomie",
        "Freiheit",
        "Selbstverwirklichung"
    ],
    avoids: [
        "Bindung",
        "Verpflichtung",
        "Einschränkung"
    ],
    pirsig: { staticQuality: 0.2, dynamicQuality: 0.8 },
    osho: { naturalness: 0.9, conditioning: 0.1 }
};
```

---

## Zusammenfassung: Wann welchen Begriff verwenden?

| Wenn du... | Verwende... | Datei |
|------------|-------------|-------|
| Die 30 Matching-Parameter meinst | `baseAttributes` / `attributes` | archetyp-definitions.js, profile-store.js |
| Geschlecht/Dominanz/Orientierung meinst | `personDimensions` | js/state.js |
| GFK-Bedürfnisse meinst | `profile.needs` (NEU!) | profile-store.js (komponiert aus gfk-beduerfnisse.js) |
| Archetyp-Philosophie meinst | `coreValues` / `avoids` | archetyp-definitions.js |

## NEU: ALLES IM PROFIL (v2.0)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  profile = {                                                                    │
│    // META                                                                      │
│    archetyp: 'duo',                                                             │
│    gender: 'mann-cis',                                                          │
│    dominanz: 'dominant',                                                        │
│    orientierung: 'heterosexuell',                                               │
│                                                                                 │
│    // SCORES (A-F)                                                              │
│    scores: { A: 55, B: 68, C: 64, D: 57, E: 59, F: 68 },                        │
│                                                                                 │
│    // ATTRIBUTE (30)                                                            │
│    attributes: { gespraechsBeduernis: 0.80, alleinZeitBeduernis: 0.40, ... },  │
│                                                                                 │
│    // NEEDS (88) - NEU!                                                         │
│    needs: { geborgenheit: 90, vertrauen: 100, selbstbestimmung: 50, ... },     │
│                                                                                 │
│    // PHILOSOPHIE                                                               │
│    pirsig: '...',                                                               │
│    osho: '...'                                                                  │
│  }                                                                              │
│                                                                                 │
│  → EINE QUELLE DER WAHRHEIT                                                     │
│  → Formel kann Score/Texte/Schlussfolgerungen einfacher berechnen               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Häufige Verwechslungen

### ❌ FALSCH: "Bedürfnisse" für baseAttributes
```javascript
// FALSCH - baseAttributes sind keine GFK-Bedürfnisse!
user.bedürfnisse.kinderWunsch = "ja";
```

### ✅ RICHTIG: "Attribute" für baseAttributes
```javascript
// RICHTIG
profile.attributes.kinderWunsch = "ja";
archetype.baseAttributes.kinderWunsch = "ja";
```

### ❌ FALSCH: "Eigenschaften" für baseAttributes
```javascript
// FALSCH - "Eigenschaften" = personDimensions in der UI
user.eigenschaften.kinderWunsch = "ja";
```

### ✅ RICHTIG: "Eigenschaften" für Meta-Dimensionen
```javascript
// RICHTIG - UI-Text für personDimensions
"Dein Archetyp + Eigenschaften (Orientierung, Dominanz, Geschlecht)"
```

---

## Changelog

| Datum | Änderung |
|-------|----------|
| 2025-12-06 | v2.0: GFK-Bedürfnisse (needs) ins Profil integriert - EINE QUELLE DER WAHRHEIT |
| 2025-12-06 | Initiale Dokumentation erstellt |
