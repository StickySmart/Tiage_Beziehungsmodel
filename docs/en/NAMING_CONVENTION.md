# Tiage Naming Convention

This documentation clarifies the terminology in the Tiage code and prevents confusion between similar concepts.

---

## CENTRAL TERM DEFINITION

| Term | Meaning | Count | Example |
|------|---------|-------|---------|
| **Need / Profile Parameter** | A single measurable need | ~307 | `kinderwunsch`, `naehe`, `vertrauen` |
| **Category / BaseAttribute** | Grouping of needs | 18 | `lebensplanung`, `zuneigung`, `dynamik` |

### Visual Representation

```
CATEGORY (BaseAttribute): lebensplanung
    └── NEEDS (Profile Parameters):
        ├── kinderwunsch (desire for children)
        ├── elternschaft (parenthood)
        ├── fortpflanzung (reproduction)
        ├── familie_gruenden (starting a family)
        ├── verbindlichkeit (commitment)
        └── ... (more)
```

---

## The 18 Categories (BaseAttributes)

### NVC Base Categories (11)

| Category | Description | Color |
|----------|-------------|-------|
| `existenz` | Basic physical needs | #E63946 |
| `sicherheit` | Emotional and psychological safety | #F4A261 |
| `zuneigung` | Love, closeness and emotional connection | #E84393 |
| `verstaendnis` | Being seen and understood | #9B5DE5 |
| `freiheit` | Autonomy and self-determination | #2A9D8F |
| `teilnahme` | Community and belonging | #06D6A0 |
| `musse` | Recreation, joy and pleasure | #118AB2 |
| `identitaet` | Self-actualization and meaning | #FFD166 |
| `erschaffen` | Creativity and learning | #FF6B6B |
| `verbundenheit` | Deep existential connection | #A8DADC |
| `dynamik` | Power dynamics and conscious exchange (BDSM) | #8B5CF6 |

### Life Topics Categories (7)

| Category | Description | Color |
|----------|-------------|-------|
| `lebensplanung` | Children, marriage, housing, family | #10B981 |
| `finanzen_karriere` | Money, career, work-life balance | #F59E0B |
| `kommunikation_stil` | Conversations, emotions, conflicts | #3B82F6 |
| `soziales_leben` | Introversion/extroversion, friends, alone time | #8B5CF6 |
| `intimitaet_romantik` | Physical closeness, romance, sexuality | #EC4899 |
| `werte_haltung` | Religion, tradition, environment | #6366F1 |
| `praktisches_leben` | Order, travel, everyday life | #14B8A6 |

---

## Scoring Formula

```
score = Σ((100 - diff) × weight) / Σ(weight)
```

### Explanation

| Symbol | Meaning |
|--------|---------|
| `Σ` | Sum over all **needs** |
| `diff` | Difference between two need values (0-100) |
| `100 - diff` | Match (smaller diff = higher match) |
| `weight` | Weight per **need** |

### Weighting

**Default Formula:**
```
weight = (score_A + score_B) / 2 / 100
```

**Logic:** The more important a need is for BOTH people, the more it counts in matching.

| Need | Person A | Person B | Default Weight | Meaning |
|------|----------|----------|----------------|---------|
| kinderwunsch | 90 | 90 | 0.90 | Important to both → counts heavily |
| kinderwunsch | 10 | 10 | 0.10 | Unimportant to both → counts little |
| kinderwunsch | 90 | 10 | 0.50 | One wants, one doesn't → medium weight, large difference! |

**Customizable:**
- Each need can be individually weighted
- Lock function: Double-click = fix value (🔒)
- Base values come from research (Rosenberg, Pirsig, Osho)

---

## Sources of Needs

| Source | Contribution |
|--------|--------------|
| **NVC (Marshall B. Rosenberg)** | 88 universal needs |
| **Pirsig** | Static vs. Dynamic Quality |
| **Osho** | Polarity, Yin-Yang dynamics |
| **BDSM Literature** | Dynamics category (Easton, Hardy, Wiseman) |

---

## In Code

### Needs (Profile Parameters)

```javascript
// In gfk-beduerfnisse.js
GfkBeduerfnisse.definitionen = {
    kinderwunsch: { label: "Desire for Children", kategorie: "lebensplanung" },
    naehe: { label: "Closeness", kategorie: "zuneigung", sekundaer: ["sicherheit", "verbundenheit"] },
    vertrauen: { label: "Trust", kategorie: "verstaendnis", sekundaer: ["sicherheit", "dynamik"] },
    // ... ~307 needs total
}
```

### Categories (BaseAttributes)

```javascript
// In gfk-beduerfnisse.js
GfkBeduerfnisse.kategorien = {
    lebensplanung: {
        name: "Life Planning",
        description: "Children, marriage, housing, family",
        color: "#10B981",
        beduerfnisse: ["kinderwunsch", "elternschaft", "fortpflanzung", ...]
    },
    zuneigung: {
        name: "Affection",
        description: "Love, closeness and emotional connection",
        color: "#E84393",
        beduerfnisse: ["waerme", "naehe", "intimitaet", "liebe", ...]
    },
    // ... 18 categories total
}
```

---

## Person Dimensions (Meta Properties)

Meta properties that describe "**Who I am**" and modify the needs.

| Dimension | Options | Modifies |
|-----------|---------|----------|
| **Gender** | male/female/inter × cis/trans/nonbinary/fluid/searching | Communication, Emotionality |
| **Dominance** | dominant/submissive/switch/balanced | Control, Devotion, Closeness |
| **Orientation** | heterosexual/homosexual/bisexual | Tradition, Openness |

---

## Summary

```
┌─────────────────────────────────────────────────────────────────┐
│  CATEGORIES (18 BaseAttributes)                                  │
│  = Grouping of needs                                            │
│  e.g.: lebensplanung, zuneigung, dynamik                        │
│                                                                  │
│    └── NEEDS (~307 Profile Parameters)                          │
│        = Individual measurable values                           │
│        e.g.: kinderwunsch, naehe, vertrauen                     │
│                                                                  │
│        └── WEIGHT (per need)                                    │
│            = From research, changeable with Lock (🔒)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-07 | v3.0: Term definition simplified - Need = Profile Parameter, Category = BaseAttribute |
| 2025-12-07 | Updated to ~307 needs in 18 categories |
| 2025-12-06 | v2.0: NVC needs integrated into profile |
| 2025-12-06 | Initial documentation created |
