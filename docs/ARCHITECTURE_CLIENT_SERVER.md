# TIAGE Client-Server Architektur

## Ziel: Nachhaltige, wartbare Codebasis

---

## 0. SSOT (Single Source of Truth)

Alle Daten haben genau EINE autoritative Quelle:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SSOT-VERZEICHNIS                                                           │
│  ═══════════════════════════════════════════════════════════════════════════│
│                                                                             │
│  BEDÜRFNISSE (224 Stück, #B1-#B224)                                         │
│  └── profiles/data/beduerfnis-katalog.json                                  │
│      ├── Wrapper: profiles/definitions/beduerfnis-katalog.js                │
│      └── Stellt BeduerfnisIds API bereit (beduerfnis-ids.js existiert nicht)│
│                                                                             │
│  TAXONOMIE (Perspektiven, Dimensionen, Kategorien)                          │
│  └── profiles/definitions/taxonomie.js                                      │
│      ├── #P1-#P4  → 4 Perspektiven                                         │
│      ├── #D1-#D6  → 6 Dimensionen (Kurzform A-F)                           │
│      └── #K1-#K18 → 18 Kategorien                                          │
│                                                                             │
│  ARCHETYP-PROFILE (8 Archetypen mit je 224 Bedürfnissen)                    │
│  └── profiles/archetypen/*.js                                               │
│      ├── single.js, duo.js, duo_flex.js, lat.js                            │
│      ├── solopoly.js, polyamor.js, ra.js, aromantisch.js                   │
│      └── Matrix-Berechnung: js/synthesis/factors/archetypeMatrixCalculator.js│
│                                                                             │
│  ARCHETYP-DEFINITIONEN (Namen, Beschreibungen, Werte)                       │
│  └── archetype-matrix.json                                                  │
│      └── HINWEIS: Enthält KEINE Kompatibilitäts-Matrix mehr!               │
│                   Matrix wird dynamisch aus Bedürfnis-Profilen berechnet.   │
│                                                                             │
│  FORMELN & KONSTANTEN                                                       │
│  └── js/synthesis/constants.js                                              │
│      ├── Q-Formel: Q = Σ(Faktor × Gewicht × R)                             │
│      ├── Thresholds, Gewichtungen                                          │
│      └── Kohärenz-Definitionen (ARCHETYP_KOHAERENZ)                        │
│                                                                             │
│  LAUFZEIT-STATE (Browser)                                                   │
│  └── js/state.js (TiageState)                                               │
│      ├── personDimensions (ich/partner)                                     │
│      ├── archetypes, gewichtungen, resonanzFaktoren                         │
│      ├── flatNeeds, profileReview.lockedNeeds                               │
│      └── Pub/Sub für reaktive Updates                                       │
│                                                                             │
│  PROFIL-SPEICHERUNG (LocalStorage)                                          │
│  └── js/memory-manager.js                                                   │
│      └── 4 Slots pro Person (tiage_memory_ME001-004, PART001-004)          │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Regel:** Niemals Daten duplizieren. Immer zur SSOT referenzieren.

---

## 1. Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER (CLIENT)                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  UI-LAYER (bleibt im Browser)                                       │    │
│  │  ├── Slider, Buttons, Cards, Modals                                │    │
│  │  ├── Event-Handling (Klicks, Drag, Touch)                          │    │
│  │  ├── Lokaler UI-State (was gerade angezeigt wird)                  │    │
│  │  ├── Input-Validierung (sofortiges Feedback)                       │    │
│  │  └── Rendering (DOM-Manipulation)                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                       │
│                                     │ Commands                              │
│                                     ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  API-CLIENT (neu zu erstellen)                                      │    │
│  │  ├── TiageAPIClient.calculateSynthesis(ichProfile, partnerProfile)  │    │
│  │  ├── TiageAPIClient.sortNeeds(needs, sortBy)                        │    │
│  │  ├── TiageAPIClient.saveProfile(person, profile)                    │    │
│  │  ├── TiageAPIClient.loadProfile(person, slot)                       │    │
│  │  ├── TiageAPIClient.getTop10Ranking(baseArchetype)                  │    │
│  │  └── TiageAPIClient.generateText(synthesisResult)                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                       │
└─────────────────────────────────────│───────────────────────────────────────┘
                                      │ HTTP/WebSocket
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                SERVER                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  API-ENDPOINTS                                                      │    │
│  │  POST /api/synthesis/calculate                                      │    │
│  │  POST /api/needs/sort                                               │    │
│  │  POST /api/profile/save                                             │    │
│  │  GET  /api/profile/load/:person/:slot                               │    │
│  │  POST /api/ranking/top10                                            │    │
│  │  POST /api/text/generate                                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                       │
│                                     ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  BUSINESS LOGIC (wandert zum Server)                                │    │
│  │  ├── TiageSynthesis.Calculator     → Q-Formel, Resonanz            │    │
│  │  ├── TiageSynthesis.NeedsIntegration → Bedürfnis-Matching           │    │
│  │  ├── TiageCompatibility.Orchestrator → Pathos + Logos               │    │
│  │  ├── ArchetypeMatrixCalculator     → Matrix aus Bedürfnissen (SSOT) │    │
│  │  ├── TextGenerators (Pathos, Logos, OshoZen)                        │    │
│  │  └── LifestyleFilter               → K.O.-Kriterien                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                       │
│                                     ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  DATA LAYER                                                         │    │
│  │  ├── profiles/archetypen/*.js (224 Bedürfnisse pro Archetyp)        │    │
│  │  ├── beduerfnis-katalog.json (Bedürfnis-Definitionen)               │    │
│  │  ├── archetype-matrix.json (nur Archetyp-Definitionen, keine Matrix)│    │
│  │  ├── Profile-Storage (MongoDB / PostgreSQL)                         │    │
│  │  └── Constants (Gewichtungen, Thresholds, Konfiguration)            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Server-Operationen (Commands)

### 2.1 CALCULATE_SYNTHESIS

**Zweck:** Berechnet den Gesamt-Score für eine Paarung

**Request:**
```json
{
  "command": "CALCULATE_SYNTHESIS",
  "ich": {
    "archetyp": "lat",
    "geschlecht": { "primary": "mann", "secondary": "cis" },
    "dominanz": { "primary": "switch", "secondary": null },
    "orientierung": { "primary": "bisexuell", "secondary": null },
    "needs": { "#B1": 75, "#B2": 60, ... },
    "lockedNeeds": { "#B15": 90 },
    "gewichtungen": {
      "O": { "value": 25, "locked": false },
      "A": { "value": 25, "locked": false },
      "D": { "value": 25, "locked": false },
      "G": { "value": 25, "locked": false },
      "summeLock": { "enabled": true, "target": 100 }
    },
    "resonanzFaktoren": {
      "R1": { "value": 1.2, "locked": true },
      "R2": { "value": 0.9, "locked": false },
      "R3": { "value": 1.0, "locked": false },
      "R4": { "value": 1.1, "locked": false }
    }
  },
  "partner": {
    "archetyp": "duo",
    "geschlecht": { "primary": "frau", "secondary": "cis" },
    "dominanz": { "primary": "submissiv", "secondary": null },
    "orientierung": { "primary": "bisexuell", "secondary": null },
    "needs": { "#B1": 80, "#B2": 45, ... },
    "lockedNeeds": {},
    "gewichtungen": {
      "O": { "value": 25, "locked": false },
      "A": { "value": 25, "locked": false },
      "D": { "value": 25, "locked": false },
      "G": { "value": 25, "locked": false },
      "summeLock": { "enabled": true, "target": 100 }
    },
    "resonanzFaktoren": {
      "R1": { "value": 1.0, "locked": false },
      "R2": { "value": 1.1, "locked": false },
      "R3": { "value": 0.8, "locked": false },
      "R4": { "value": 1.0, "locked": false }
    }
  },
  "options": {
    "gfkPerson1": "mittel",
    "gfkPerson2": "hoch"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "score": 78,
    "baseScore": 72,
    "resonanz": {
      "coefficient": 1.08,
      "dimensional": {
        "leben": { "rValue": 1.15, "status": "resonanz" },
        "philosophie": { "rValue": 0.95, "status": "neutral" },
        "dynamik": { "rValue": 1.20, "status": "resonanz" },
        "identitaet": { "rValue": 1.05, "status": "neutral" }
      }
    },
    "logos": { "score": 65, "weight": 0.25 },
    "pathos": { "score": 82, "weight": 0.75 },
    "breakdown": {
      "archetyp": { "score": 65, "category": "logos" },
      "orientierung": { "score": 90, "category": "pathos" },
      "dominanz": { "score": 85, "category": "pathos" },
      "geschlecht": { "score": 70, "category": "pathos" }
    },
    "beduerfnisse": {
      "score": 74,
      "gemeinsam": [...],
      "unterschiedlich": [...]
    },
    "meta": {
      "isHardKO": false,
      "isSoftKO": false,
      "lifestyleWarnings": []
    },
    "uncertainty": {
      "margin": 12,
      "lower": 66,
      "upper": 90,
      "confidence": 80
    }
  }
}
```

---

### 2.2 SORT_NEEDS

**Zweck:** Sortiert Bedürfnisse nach verschiedenen Kriterien

**Request:**
```json
{
  "command": "SORT_NEEDS",
  "ichNeeds": { "#B1": 75, "#B2": 60, ... },
  "partnerNeeds": { "#B1": 80, "#B2": 45, ... },
  "sortBy": "difference",
  "limit": 10
}
```

**sortBy Optionen:**
- `"difference"` - Größte Unterschiede zuerst
- `"similarity"` - Größte Übereinstimmungen zuerst
- `"importance"` - Höchste Durchschnittswerte zuerst
- `"complementary"` - Komplementäre Bedürfnisse

**Response:**
```json
{
  "success": true,
  "result": {
    "sorted": [
      {
        "id": "#B42",
        "key": "kontrolle_ausueben",
        "label": "Kontrolle ausüben",
        "ichValue": 85,
        "partnerValue": 20,
        "difference": 65,
        "category": "dynamik"
      },
      ...
    ],
    "stats": {
      "avgDifference": 28.5,
      "avgSimilarity": 71.5,
      "matchScore": 74
    }
  }
}
```

---

### 2.3 SAVE_PROFILE / LOAD_PROFILE

**Zweck:** Profile zentral speichern und laden

**SAVE Request:**
```json
{
  "command": "SAVE_PROFILE",
  "person": "ich",
  "slot": 1,
  "profile": {
    "archetyp": "lat",
    "geschlecht": { "primary": "mann", "secondary": "cis" },
    "dominanz": { "primary": "switch", "secondary": null },
    "orientierung": { "primary": "bisexuell", "secondary": null },
    "needs": { "#B1": 75, ... },
    "gewichtungen": { "O": 25, "A": 25, "D": 25, "G": 25 },
    "resonanzFaktoren": { "R1": 1.2, "R2": 0.9, "R3": 1.0, "R4": 1.1 },
    "lockedNeeds": { "#B15": 90 }
  }
}
```

**SAVE Response:**
```json
{
  "success": true,
  "result": {
    "profileId": "prof_abc123",
    "savedAt": "2025-12-27T14:30:00Z",
    "slot": 1,
    "person": "ich"
  }
}
```

**LOAD Request:**
```json
{
  "command": "LOAD_PROFILE",
  "person": "ich",
  "slot": 1
}
```

**LOAD Response:**
```json
{
  "success": true,
  "result": {
    "profile": { ... },
    "savedAt": "2025-12-27T14:30:00Z",
    "version": "3.1"
  }
}
```

---

### 2.4 GET_TOP10_RANKING

**Zweck:** Berechnet alle Archetyp-Kombinationen für eine Person

**Request:**
```json
{
  "command": "GET_TOP10_RANKING",
  "baseArchetype": "lat",
  "baseDimensions": {
    "dominanz": "switch",
    "gfk": "mittel"
  },
  "includeTexts": true
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "baseArchetype": "lat",
    "top10": [
      {
        "rank": 1,
        "archetype": "duo_flex",
        "displayName": "Duo-Flex",
        "overallScore": 87,
        "pathosScore": 85,
        "logosScore": 89,
        "resonance": 1.02,
        "synthesis": {
          "opening": "Eine Verbindung zwischen LAT und Duo-Flex...",
          "tonality": "positiv"
        },
        "lifestyle": { "isKO": false, "warnings": [] }
      },
      ...
    ],
    "summary": {
      "bestMatch": "duo_flex",
      "averageScore": 68
    }
  }
}
```

---

### 2.5 GENERATE_TEXT

**Zweck:** Generiert psychologische Synthese-Texte

**Request:**
```json
{
  "command": "GENERATE_TEXT",
  "textType": "integrated",
  "synthesisResult": { ... },
  "ichArchetype": "lat",
  "partnerArchetype": "duo",
  "seed": 12345
}
```

**textType Optionen:**
- `"integrated"` - Vollständige Synthese
- `"pathos"` - Emotionale Analyse
- `"logos"` - Rationale Analyse
- `"oshoZen"` - Philosophische Perspektive

**Response:**
```json
{
  "success": true,
  "result": {
    "opening": "Die Verbindung zwischen LAT und Duo...",
    "pathosSection": "Emotional zeigt sich...",
    "logosSection": "Rational betrachtet...",
    "synthesis": "Im Zusammenspiel...",
    "innerConflicts": {
      "ich": { "core": "Nähe vs. Autonomie", "text": "..." },
      "partner": { "core": "Sicherheit vs. Freiheit", "text": "..." }
    },
    "recommendations": [
      "Regelmäßige Kommunikation über Freiräume",
      "..."
    ]
  }
}
```

---

## 2.6 Lock-System (Wichtig!)

Das Tiage-System hat ein **zweistufiges Lock-System** + dynamische R-Faktoren:

### Lock-Ebenen (User-Overrides)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LOCK-EBENE 1: Gewichtungen (O, A, D, G)                                    │
│  ═══════════════════════════════════════════════════════════════════════════│
│                                                                             │
│  gewichtungen: {                                                            │
│    ich: {                                                                   │
│      O: { value: 25, locked: false },  ← Kann vom User gesperrt werden     │
│      A: { value: 30, locked: true },   ← Gesperrt = ändert sich nicht      │
│      D: { value: 20, locked: false },                                       │
│      G: { value: 25, locked: false },                                       │
│      summeLock: { enabled: true, target: 100 }  ← Hält Summe bei 100       │
│    }                                                                        │
│  }                                                                          │
│                                                                             │
│  Logik: Wenn User einen Slider bewegt, werden UNGESPERRTE neu verteilt     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  RESONANZFAKTOREN (R1, R2, R3, R4) - DYNAMISCH BERECHNET                    │
│  ═══════════════════════════════════════════════════════════════════════════│
│                                                                             │
│  resonanzFaktoren: {                                                        │
│    ich: {                                                                   │
│      R1: { value: 1.2, locked: false },  ← DYNAMISCH aus Profil berechnet  │
│      R2: { value: 0.9, locked: false },  ← Kohärenz Archetyp ↔ Bedürfnisse │
│      R3: { value: 1.0, locked: false },                                     │
│      R4: { value: 1.1, locked: false }                                      │
│    }                                                                        │
│  }                                                                          │
│                                                                             │
│  Wertebereich: 0.5 - 1.5                                                    │
│  BERECHNUNG: NeedsIntegration.calculateDimensionalResonance(person)         │
│  FORMEL: R = 0.5 + (Übereinstimmung × 1.0)                                  │
│                                                                             │
│  HINWEIS: R-Faktoren werden AUTOMATISCH aus dem Profil berechnet.          │
│           Es gibt KEINE Slider zur manuellen Anpassung.                    │
│           Die Werte werden nur als Read-Only im UI angezeigt.              │
│           (Haupt-App: archetype-interaction.html)                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  LOCK-EBENE 2: Einzelne Bedürfnisse (lockedNeeds)                           │
│  ═══════════════════════════════════════════════════════════════════════════│
│                                                                             │
│  profileReview: {                                                           │
│    ich: {                                                                   │
│      lockedNeeds: {                                                         │
│        "#B15": 90,   ← User hat Bedürfnis #B15 auf 90 gesetzt              │
│        "#B42": 30    ← User hat Bedürfnis #B42 auf 30 gesetzt              │
│      }                                                                      │
│    }                                                                        │
│  }                                                                          │
│                                                                             │
│  Priorität: lockedNeeds > flatNeeds (berechnete Werte aus Archetyp)        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Speicherung (MemoryManager)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SPEICHER-SLOTS                                                             │
│  ═══════════════════════════════════════════════════════════════════════════│
│                                                                             │
│  4 Slots pro Person:                                                        │
│    tiage_memory_ME001  ─┬─ Slot 1 (Paar)                                   │
│    tiage_memory_PART001─┘                                                   │
│    tiage_memory_ME002  ─┬─ Slot 2 (Paar)                                   │
│    tiage_memory_PART002─┘                                                   │
│    ... usw.                                                                 │
│                                                                             │
│  Was gespeichert wird:                                                      │
│    ├── archetyp (primary, secondary)                                        │
│    ├── personDimensions (geschlecht, dominanz, orientierung)                │
│    ├── gewichtungen (O, A, D, G mit value + locked)                         │
│    ├── resonanzFaktoren (R1-R4 mit value + locked)                          │
│    ├── flatNeeds (224 Bedürfnisse als Array)                                │
│    ├── lockedNeeds (manuell überschriebene Werte)                           │
│    └── savedAt (Timestamp)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Server-Implikationen

Bei Client-Server müssen Locks **mitgesendet** werden:

**Request mit Locks:**
```json
{
  "command": "CALCULATE_SYNTHESIS",
  "ich": {
    "archetyp": "lat",
    "gewichtungen": {
      "O": { "value": 25, "locked": false },
      "A": { "value": 30, "locked": true },
      "D": { "value": 20, "locked": false },
      "G": { "value": 25, "locked": false }
    },
    "resonanzFaktoren": {
      "R1": { "value": 1.2, "locked": true },
      "R2": { "value": 0.9, "locked": false },
      "R3": { "value": 1.0, "locked": false },
      "R4": { "value": 1.1, "locked": false }
    },
    "needs": { "#B1": 75, "#B2": 60, ... },
    "lockedNeeds": { "#B15": 90, "#B42": 30 }
  }
}
```

**Server-Logik:**
1. Berechne Basis-Werte aus Archetyp + Dimensionen
2. Überschreibe mit `lockedNeeds` (Priorität!)
3. Verwende `locked: true` Gewichtungen/R-Faktoren unverändert
4. Berechne nur `locked: false` Werte neu

---

## 3. Client-Operationen (bleiben im Browser)

### 3.1 UI-State Management

```javascript
// TiageState bleibt im Browser, aber vereinfacht
const TiageState = {
  // Nur UI-relevanter State
  ui: {
    currentView: 'desktop',
    activeModal: null,
    selectedCategory: null
  },

  // Lokaler Cache (optional, für Performance)
  cache: {
    lastSynthesisResult: null,
    lastTop10: null
  }
};
```

### 3.2 Event-Handling

```javascript
// Bleibt im Browser
document.querySelector('#calculate-btn').addEventListener('click', async () => {
  // 1. Zeige Loading-Spinner
  UI.showLoading();

  // 2. Sammle Daten aus UI
  const ichProfile = UI.collectProfile('ich');
  const partnerProfile = UI.collectProfile('partner');

  // 3. Sende an Server
  const result = await TiageAPIClient.calculateSynthesis(ichProfile, partnerProfile);

  // 4. Zeige Ergebnis
  UI.hideLoading();
  UI.showResult(result);
});
```

### 3.3 Input-Validierung

```javascript
// Sofortiges Feedback bleibt im Browser
function validateSliderValue(value) {
  if (value < 0 || value > 100) {
    showError('Wert muss zwischen 0 und 100 liegen');
    return false;
  }
  return true;
}
```

---

## 4. Migration-Strategie

### Phase 1: API-Client erstellen (Woche 1-2)
- [ ] `TiageAPIClient` Klasse erstellen
- [ ] Alle Server-Calls abstrahieren
- [ ] Lokaler Fallback (aktuelle Logik) als Backup

### Phase 2: Server aufsetzen (Woche 2-4)
- [ ] Node.js/Express Server
- [ ] Endpoints implementieren
- [ ] Datenbank für Profile (MongoDB/PostgreSQL)

### Phase 3: Logik migrieren (Woche 4-6)
- [ ] `synthesisCalculator.js` → Server
- [ ] `needsIntegration.js` → Server
- [ ] `archetypeMatrixCalculator.js` → Server (berechnet Matrix aus Bedürfnissen)
- [ ] Text-Generatoren → Server
- [ ] `profiles/archetypen/*.js` → Server (224 Bedürfnisse/Archetyp)

**Hinweis:** `top10RankingCalculator.js` ist bereits Dead Code (nicht in HTML geladen)

### Phase 4: Client verschlanken (Woche 6-8)
- [ ] Entferne migrierte Logik aus Client
- [ ] Optimiere Bundle-Größe
- [ ] Teste alle Flows

---

## 5. Technologie-Empfehlungen

### Server-Stack
| Komponente | Empfehlung | Warum |
|------------|------------|-------|
| Runtime | Node.js 20+ | Gleiche Sprache wie Frontend |
| Framework | Express.js / Fastify | Einfach, bewährt |
| Datenbank | MongoDB | Flexible Dokumente für Profile |
| Auth | JWT | Stateless, skalierbar |
| Hosting | Railway / Render / Fly.io | Einfaches Deployment |

### Kommunikation
| Szenario | Protokoll |
|----------|-----------|
| Standard-Requests | REST (HTTP/JSON) |
| Echtzeit-Updates | WebSocket (optional) |
| Batch-Operationen | REST mit Bulk-Endpoints |

---

## 6. Vorteile dieser Architektur

| Vorteil | Beschreibung |
|---------|--------------|
| **Wartbarkeit** | Bug-Fixes nur am Server, sofort für alle aktiv |
| **Sicherheit** | Algorithmen nicht im Browser sichtbar |
| **Performance** | Client-Bundle von ~22KB auf ~5KB |
| **Konsistenz** | Alle Clients bekommen identische Ergebnisse |
| **Multi-Client** | Web, Mobile-App, Desktop-App nutzen gleiche API |
| **Skalierbarkeit** | Server kann horizontal skalieren |
| **A/B-Testing** | Neue Formeln serverseitig testen |

---

## 7. Nächste Schritte

1. **Entscheidung:** Server-Stack festlegen
2. **API-Design:** OpenAPI/Swagger Spezifikation erstellen
3. **Proof-of-Concept:** Einen Endpoint implementieren
4. **Schrittweise Migration:** Endpoint für Endpoint

---

*Erstellt: 27.12.2025*
*Version: 1.0*
