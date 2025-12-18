# Bedürfnis Detail-View - Offizielle Spezifikation

**Version:** 1.0.0
**Datum:** 2025-12-18
**Status:** ✅ Finalisiert - In Stein gemeißelt

---

## 📋 Übersicht

Diese Spezifikation definiert die Detail-Ansicht für einzelne Bedürfnisse.
Die View zeigt alle relevanten Informationen transparent und nachvollziehbar an.

---

## 🎨 UI-Layout (Offiziell)

```
┌──────────────────────────────────────────────────────────┐
│ #B90 Kinderwunsch                                         │
├──────────────────────────────────────────────────────────┤
│                                                           │
│ Dein Wert:  70  [▼]                                      │
│  ├─ Basis:          50                                   │
│  ├─ + Gender:       +10  (Mann-Cis)                      │
│  ├─ + Orientierung: +5   (Heterosexuell)                 │
│  └─ + Dominanz:     +5   (Ausgeglichen)                  │
│                                                           │
│ Typisch (Umfrage):  20                                    │
│  └─ Archetyp: Solopoly                                   │
│     (78% der Solopoly haben Wert 10-30)                  │
│                                                           │
│ Abweichung: Δ50 🔴                                       │
│  └─ Du liegst 2.5 Standardabweichungen über typisch     │
│                                                           │
│ Klassifikation:                                           │
│  📁 #K11 Lebensplanung                                   │
│  🎯 #D1 Beziehungsphilosophie                            │
│  👓 #P1 Statistik                                        │
│                                                           │
│ Impact auf Scores:                                        │
│  • R2 Philosophie: -8% (senkt Kohärenz)                 │
│  • Kategorie #K11:  -12%                                 │
│  • Dimension #D1:   -8%                                  │
│                                                           │
│ [Basis ändern] [Zu ähnlichen Bedürfnissen]               │
└──────────────────────────────────────────────────────────┘
```

---

## 📐 Struktur-Definitionen

### 1. **Header**
- **Format:** `#B-ID Bedürfnisname`
- **Beispiel:** `#B90 Kinderwunsch`
- **Schriftart:** Bold, größer als Body-Text

### 2. **Dein Wert (mit Modifier-Breakdown)**

#### Zusammengeklappt:
```
Dein Wert: 70  [▼]
```

#### Ausgeklappt:
```
Dein Wert: 70  [▲]
 ├─ Basis:          50
 ├─ + Gender:       +10  (Mann-Cis)
 ├─ + Orientierung: +5   (Heterosexuell)
 └─ + Dominanz:     +5   (Ausgeglichen)
```

**Spezifikation:**
- **Zeile 1:** Final-Wert + Expand/Collapse Button `[▼]` / `[▲]`
- **Zeile 2:** Basis-Wert (vom Benutzer direkt gesetzt)
- **Zeile 3:** Gender-Modifier mit Wert und Profil-Info in Klammern
- **Zeile 4:** Orientierungs-Modifier mit Wert und Profil-Info
- **Zeile 5:** Dominanz-Modifier mit Wert und Profil-Info

**Berechnung:**
```
Final = Basis + Gender-Modifier + Orientierung-Modifier + Dominanz-Modifier
```

**Modifier-Quellen:**
- Gender: `TiageModifiers.Gender[...]` aus `profiles/modifiers/gender/`
- Orientierung: `TiageModifiers.Orientierung[...]` aus `profiles/modifiers/orientierung/`
- Dominanz: `TiageModifiers.Dominanz[...]` aus `profiles/modifiers/dominanz/`

### 3. **Typisch (Umfrage-Wert)**

```
Typisch (Umfrage):  20
 └─ Archetyp: Solopoly
    (78% der Solopoly haben Wert 10-30)
```

**Spezifikation:**
- **Begriff:** "Typisch (Umfrage)" - NICHT "Soll-Wert"!
- **Quelle:** Archetyp-typischer Wert aus `ARCHETYP_KOHAERENZ` in `constants.js`
- **Zusatz-Info:** Archetyp-Name + Perzentil-Info

**Datenquelle:**
```javascript
TiageSynthesis.Constants.ARCHETYP_KOHAERENZ[dimension][archetyp][need_key].value
```

**Perzentil-Berechnung:**
- Basierend auf Standardabweichung (sigma)
- `±1 sigma = 68%`
- `±2 sigma = 95%`
- Anzeige: "X% der [Archetyp] haben Wert [min-max]"

### 4. **Abweichung**

```
Abweichung: Δ50 🔴
 └─ Du liegst 2.5 Standardabweichungen über typisch
```

**Spezifikation:**
- **Format:** `Δ[Zahl]` + Emoji
- **Berechnung:** `|Dein Wert - Typisch|`
- **Farbcodierung:**
  - 🟢 Grün: `Δ < 15` (hohe Kohärenz)
  - 🟡 Gelb: `Δ 15-35` (mittlere Kohärenz)
  - 🔴 Rot: `Δ > 35` (niedrige Kohärenz)

**Zusatz-Info:**
- Anzahl der Standardabweichungen
- Formel: `(Dein Wert - Typisch) / sigma`
- Beispiel: "Du liegst 2.5 Standardabweichungen über typisch"

### 5. **Klassifikation (Taxonomie)**

```
Klassifikation:
 📁 #K11 Lebensplanung
 🎯 #D1 Beziehungsphilosophie
 👓 #P1 Statistik
```

**Spezifikation:**
- **Kategorie (#K):** 📁 Emoji + ID + Name
- **Dimension (#D):** 🎯 Emoji + ID + Name
- **Perspektive (#P):** 👓 Emoji + ID + Name

**Icons:**
- 📁 = Kategorie (Ordner)
- 🎯 = Dimension (Ziel/Target)
- 👓 = Perspektive (Brille)

**Datenquelle:**
```javascript
// Aus beduerfnis-katalog.json oder taxonomie.js
{
  kategorie: '#K11',
  dimension: '#D1',
  perspektive: '#P1'
}
```

### 6. **Impact auf Scores**

```
Impact auf Scores:
 • R2 Philosophie: -8% (senkt Kohärenz)
 • Kategorie #K11:  -12%
 • Dimension #D1:   -8%
```

**Spezifikation:**
- Zeigt wie dieses Bedürfnis die Scores beeinflusst
- **Format:** `• [Score-Name]: [±X%] (Erklärung)`
- **Vorzeichen:**
  - Positiv: `+X%` (erhöht Score/Kohärenz)
  - Negativ: `-X%` (senkt Score/Kohärenz)

**Berechnete Werte:**
- **R-Faktor:** Einfluss auf R1-R4 (Resonanzfaktoren)
- **Kategorie:** Einfluss auf Kategorie-Score
- **Dimension:** Einfluss auf Dimensions-Score

### 7. **Action Buttons**

```
[Basis ändern] [Zu ähnlichen Bedürfnissen]
```

**Spezifikation:**
- **Button 1:** "Basis ändern" - Öffnet Editor für Basis-Wert
- **Button 2:** "Zu ähnlichen Bedürfnissen" - Navigation zu verwandten Bedürfnissen

---

## 🎯 Terminologie (Verpflichtend)

| Begriff | Verwenden | NICHT verwenden |
|---------|-----------|-----------------|
| **Dein Wert** | ✅ | ❌ "Aktueller Wert", "Ist-Wert" |
| **Basis** | ✅ | ❌ "Grundwert", "Base" |
| **Gender/Orientierung/Dominanz** | ✅ | ❌ "G/O/D", "Modifier" |
| **Typisch (Umfrage)** | ✅ | ❌ "Soll-Wert", "Target", "Erwartung" |
| **Archetyp** | ✅ | ❌ "Profil-Typ", "Beziehungsform" |
| **Abweichung** | ✅ | ❌ "Differenz", "Gap" |
| **Klassifikation** | ✅ | ❌ "Tags", "Kategorisierung" |
| **Impact auf Scores** | ✅ | ❌ "Einfluss", "Wirkung", "Effekt" |

---

## 📊 Datenfluss

```
┌─────────────────────────────────────────────────────────┐
│ INPUT                                                    │
├─────────────────────────────────────────────────────────┤
│ • Bedürfnis-ID (#B90)                                   │
│ • Benutzer-Profil (ich/partner)                         │
│ • Gender (Mann-Cis)                                     │
│ • Orientierung (Heterosexuell)                          │
│ • Dominanz (Ausgeglichen)                               │
│ • Archetyp (Solopoly)                                   │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ BERECHNUNG                                               │
├─────────────────────────────────────────────────────────┤
│ 1. Basis-Wert holen:                                    │
│    State.getBeduerfnisWert('ich', '#B90')               │
│                                                          │
│ 2. Modifier holen:                                      │
│    ProfileModifiers.calculateProfileDeltas({            │
│      geschlecht: 'mann-cis',                            │
│      orientierung: 'heterosexuell',                     │
│      dominanz: 'ausgeglichen'                           │
│    })                                                    │
│                                                          │
│ 3. Typisch-Wert holen:                                  │
│    Constants.ARCHETYP_KOHAERENZ[dimension][archetyp]    │
│                                                          │
│ 4. Taxonomie holen:                                     │
│    BeduerfnisKatalog.getDefinition('#B90')              │
│                                                          │
│ 5. Impact berechnen:                                    │
│    NeedsIntegration.calculateImpact(...)                │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ OUTPUT                                                   │
├─────────────────────────────────────────────────────────┤
│ • Final-Wert: 70                                        │
│ • Basis: 50                                             │
│ • Modifier: +10G, +5O, +5D                              │
│ • Typisch: 20 (Solopoly)                                │
│ • Abweichung: Δ50 🔴                                    │
│ • Klassifikation: #K11, #D1, #P1                        │
│ • Impact: R2 -8%, #K11 -12%, #D1 -8%                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementierungs-Anforderungen

### Komponenten-Struktur

```javascript
// BeduerfnisDetailView.js
const BeduerfnisDetailView = {

  /**
   * Rendert die Detail-View für ein Bedürfnis
   * @param {string} needId - z.B. '#B90' oder 'kinderwunsch'
   * @param {string} person - 'ich' oder 'partner'
   * @returns {HTMLElement}
   */
  render(needId, person) {
    // 1. Daten sammeln
    const data = this.collectData(needId, person);

    // 2. HTML generieren
    const html = this.generateHTML(data);

    // 3. Event-Listener anbinden
    this.attachEventListeners(html);

    return html;
  },

  /**
   * Sammelt alle benötigten Daten
   */
  collectData(needId, person) {
    return {
      need: BeduerfnisKatalog.getDefinition(needId),
      baseValue: State.getBeduerfnisWert(person, needId),
      modifiers: this.getModifiers(person),
      typicalValue: this.getTypicalValue(needId, person),
      taxonomy: this.getTaxonomy(needId),
      impact: this.calculateImpact(needId, person)
    };
  },

  /**
   * Holt Modifier aus Profil
   */
  getModifiers(person) {
    const profile = State.getProfile(person);
    return ProfileModifiers.calculateProfileDeltas(profile);
  },

  /**
   * Holt typischen Wert für Archetyp
   */
  getTypicalValue(needId, person) {
    const archetyp = State.get(`${person}.archetyp`);
    const dimension = this.getDimension(needId);
    const needKey = this.getNeedKey(needId);

    return TiageSynthesis.Constants.ARCHETYP_KOHAERENZ
      [dimension]?.[archetyp]?.[needKey]?.value ?? null;
  }
};
```

### CSS-Klassen

```css
/* Detail-View Container */
.beduerfnis-detail-view {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
}

/* Header */
.beduerfnis-detail-view__header {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Wert mit Modifier-Breakdown */
.beduerfnis-detail-view__value {
  margin-bottom: 15px;
}

.beduerfnis-detail-view__value-main {
  font-size: 1.2em;
  font-weight: bold;
}

.beduerfnis-detail-view__value-breakdown {
  margin-left: 20px;
  font-size: 0.9em;
  color: #666;
}

.beduerfnis-detail-view__value-breakdown.collapsed {
  display: none;
}

/* Typisch-Wert */
.beduerfnis-detail-view__typical {
  margin-bottom: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

/* Abweichung mit Farbcodierung */
.beduerfnis-detail-view__deviation {
  margin-bottom: 15px;
}

.beduerfnis-detail-view__deviation--low {
  color: #28a745; /* Grün */
}

.beduerfnis-detail-view__deviation--medium {
  color: #ffc107; /* Gelb */
}

.beduerfnis-detail-view__deviation--high {
  color: #dc3545; /* Rot */
}

/* Klassifikation */
.beduerfnis-detail-view__classification {
  margin-bottom: 15px;
}

/* Impact */
.beduerfnis-detail-view__impact {
  margin-bottom: 15px;
}

/* Action Buttons */
.beduerfnis-detail-view__actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
```

---

## 🧪 Test-Fälle

### Test 1: Basis-Anzeige
```javascript
Input:
- needId: '#B90'
- person: 'ich'
- Basis: 50
- Gender: 'mann-cis' (+10)
- Orientierung: 'heterosexuell' (+5)
- Dominanz: 'ausgeglichen' (+5)

Expected Output:
- Dein Wert: 70
- Breakdown: 50 +10G +5O +5D
```

### Test 2: Typisch-Wert
```javascript
Input:
- needId: '#B90'
- archetyp: 'solopoly'

Expected Output:
- Typisch (Umfrage): 20
- Archetyp: Solopoly
```

### Test 3: Abweichung Berechnung
```javascript
Input:
- Dein Wert: 70
- Typisch: 20

Expected Output:
- Abweichung: Δ50 🔴
- Farbcode: Rot (>35)
```

### Test 4: Negative Modifier
```javascript
Input:
- Basis: 60
- Gender: -10
- Orientierung: +5
- Dominanz: -5

Expected Output:
- Dein Wert: 50
- Breakdown: 60 -10G +5O -5D
```

---

## 📝 Change Log

| Datum | Version | Änderung |
|-------|---------|----------|
| 2025-12-18 | 1.0.0 | Initial Release - In Stein gemeißelt |

---

## ✅ Status

**FINALISIERT** - Diese Spezifikation ist bindend für alle UI-Implementierungen.

Änderungen an dieser Spezifikation erfordern:
1. Review durch Entwickler-Team
2. Aktualisierung der Version
3. Dokumentation im Change Log
4. Update aller abhängigen Komponenten

---

**© 2025 Ti-age.de - Alle Rechte vorbehalten**
