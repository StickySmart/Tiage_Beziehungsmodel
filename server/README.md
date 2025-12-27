# Tiage API Server

Node.js + Express + SQLite Server für das Tiage Beziehungsmodell.

## Voraussetzungen

- Node.js 20+
- npm

## Installation

```bash
cd server
npm install
```

## Starten

```bash
# Produktiv
npm start

# Entwicklung (mit Auto-Reload)
npm run dev
```

Der Server läuft auf `http://localhost:3000`.

## API-Endpoints

### Health-Check
```
GET /api/health
```

### Berechnung (4)
```
POST /api/calculate/synthesis      → Q-Formel
POST /api/calculate/resonance      → R-Faktoren
POST /api/calculate/matrix         → 8×8 Matrix
POST /api/calculate/compatibility  → Orchestrator
```

### Sortierung (2)
```
POST /api/sort/needs       → 224 Bedürfnisse sortieren
POST /api/sort/categories  → 18 Kategorien sortieren
```

### Filter (2)
```
POST /api/filter/lifestyle  → K.O.-Kriterien
POST /api/filter/needs      → Schwellwert-Filter
```

### Text-Generierung (3)
```
POST /api/generate/pathos   → Emotionale Texte
POST /api/generate/logos    → Rationale Texte
POST /api/generate/oshozen  → Spirituelle Texte
```

### Profile (4)
```
POST   /api/profile/save              → Speichern
GET    /api/profile/load/:slot/:person → Laden
GET    /api/profile/list              → Alle auflisten
DELETE /api/profile/:slot/:person     → Löschen
```

### Sync (2)
```
POST /api/sync/state       → Client ↔ Server
POST /api/sync/recalculate → Neu berechnen
```

### Stammdaten (4)
```
GET /api/data/needs                    → 224 Bedürfnisse
GET /api/data/archetypes               → 8 Archetypen
GET /api/data/taxonomy                 → Taxonomie
GET /api/data/archetype-profile/:name  → Archetyp-Gewichtungen
```

## Datenbank

SQLite-Datenbank wird automatisch in `data/tiage.db` erstellt.

## Struktur

```
server/
├── index.js          ← Express Server
├── package.json
├── db/
│   └── init.js       ← SQLite Schema
├── routes/
│   ├── calculate.js  ← /api/calculate/*
│   ├── sort.js       ← /api/sort/*
│   ├── filter.js     ← /api/filter/*
│   ├── generate.js   ← /api/generate/*
│   ├── profile.js    ← /api/profile/*
│   ├── sync.js       ← /api/sync/*
│   └── data.js       ← /api/data/*
├── logic/            ← Business-Logik (migriert von js/)
│   ├── synthesisCalculator.js
│   ├── needsIntegration.js
│   ├── archetypeMatrixCalculator.js
│   ├── compatibilityOrchestrator.js
│   ├── lifestyleFilter.js
│   ├── pathosTextGenerator.js
│   ├── logosTextGenerator.js
│   └── oshoZenTextGenerator.js
└── data/
    └── tiage.db      ← SQLite Datenbank
```

## TODO

- [ ] Business-Logik aus `js/` migrieren
- [ ] Taxonomie-Daten integrieren
- [ ] Archetyp-Profile laden
- [ ] Tests hinzufügen
