# Audit: ARCHETYP_NEEDS vs. Bedürfnis-IDs v2.0

**Datum:** 2025-12-16
**Problem:** Migration-Inkonsistenz zwischen alter und neuer Struktur

---

## **KRITISCHE BEFUNDE**

### ❌ **Problem 1: 4 Bedürfnisse fehlen in beduerfnis-ids.js v2.0**

Diese Bedürfnisse sind in `ARCHETYP_NEEDS` (constants.js:700-704), aber **NICHT** in `beduerfnis-ids.js`:

| Bedürfnis | Status | Existiert in |
|-----------|--------|--------------|
| `nicht_anhaften_an_partner` | ❌ Fehlt in v2.0 | gfk-beduerfnisse.js:799 |
| `liebe_ohne_beziehung` | ❌ Fehlt in v2.0 | gfk-beduerfnisse.js:797 |
| `polyamore_energie` | ❌ Fehlt in v2.0 | gfk-beduerfnisse.js:801 |
| `sinnsuche_gemeinsam` | ❌ Existiert NIRGENDS | - |

**Quelle alte Struktur:** `profiles/definitions/gfk-beduerfnisse.js:794-804`

```javascript
// Existiert in alter Struktur:
sex_als_meditation: { label: "Sex als Meditation", ... },
liebe_ohne_beziehung: { label: "Liebe ohne Beziehung", ... },
nicht_anhaften_an_partner: { label: "Nicht-Anhaften an Partner", ... },
polyamore_energie: { label: "Polyamore Energie", ... },
```

**Problem:** Diese wurden bei der Migration zu v2.0 (#B1-#B220) vergessen!

---

### ⚠️ **Problem 2: Falsche Kategorisierung**

| Bedürfnis | Aktuell | Sollte sein |
|-----------|---------|-------------|
| `dynamische_evolution` | #B142 (#K13 Finanzen/Karriere) | #K12 Lebensplanung |

**Begründung:** Pirsig's "Dynamische Evolution" ist eine **Lebensphilosophie**, keine Karriere-Frage!

---

### ❓ **Problem 3: Potentiell vergessene Bedürfnisse**

Aus #B90-#B126 (Lebensplanung) könnten archetyp-relevant sein, fehlen aber in ARCHETYP_NEEDS:

| #ID | Bedürfnis | Duo | Polyamor | Varianz | Fehlt? |
|-----|-----------|-----|----------|---------|--------|
| #B91 | `elternschaft` | 85 | 35 | **50** | ❌ Ja |
| #B97 | `rechtliche_sicherheit` | 80 | 20 | **60** | ❌ Ja |
| #B100 | `haeuslichkeit` | 90 | 30 | **60** | ❌ Ja |
| #B101 | `nest_bauen` | 85 | 25 | **60** | ❌ Ja |
| #B114 | `familienbindung` | 75 | 40 | 35 | ⚠️ Grenzfall |
| #B115 | `herkunftsfamilie` | 65 | 45 | 20 | ✅ OK (niedrig) |

**Diese 4 Bedürfnisse haben HÖHERE Varianz als einige in ARCHETYP_NEEDS!**

---

## **AKTUELLE ARCHETYP_NEEDS (18)**

**Quelle:** `js/synthesis/constants.js:679-705`

### ✅ **Existieren und korrekt** (13):

1. `kinderwunsch` (#B90) ✅
2. `langfristige_bindung` (#B96) ✅
3. `verbindlichkeit` (#B95) ✅
4. `gemeinsamer_wohnraum` (#B99) ✅
5. `eigener_raum` (#B103) ✅
6. `alltag_teilen` (#B102) ✅
7. `treueversprechen` (#B98) ✅
8. `unabhaengigkeit` (#B36) ✅
9. `selbstbestimmung` (#B34) ✅
10. `zugehoerigkeit` (#B42) ✅
11. `gemeinschaft` (#B41) ✅
12. `statische_stabilitaet` (#B120) ✅
13. `nicht_anhaften_an_familie` (#B124) ✅
14. `commune_statt_kernfamilie` (#B126) ✅

### ⚠️ **Falsch kategorisiert** (1):

15. `dynamische_evolution` (#B142 - sollte #K12 sein, nicht #K13)

### ❌ **Fehlen in v2.0** (4):

16. `nicht_anhaften_an_partner` - Nur in gfk-beduerfnisse.js
17. `liebe_ohne_beziehung` - Nur in gfk-beduerfnisse.js
18. `polyamore_energie` - Nur in gfk-beduerfnisse.js
19. ~~`sinnsuche_gemeinsam`~~ - **Existiert NIRGENDS!** (Vermutlich Tippfehler für `sinnsuche`)

---

## **EMPFOHLENE FIXES**

### **Fix 1: Fehlende Bedürfnisse zu beduerfnis-ids.js hinzufügen**

```javascript
// In beduerfnis-ids.js nach #B220 hinzufügen:
'#B221': { key: 'nicht_anhaften_an_partner', kategorie: '#K16', label: 'Nicht-Anhaften an Partner' },
'#B222': { key: 'liebe_ohne_beziehung', kategorie: '#K16', label: 'Liebe ohne Beziehung' },
'#B223': { key: 'polyamore_energie', kategorie: '#K16', label: 'Polyamore Energie' },
```

**Neue Gesamtzahl:** 223 Bedürfnisse (statt 220)

---

### **Fix 2: dynamische_evolution nach #K12 verschieben**

In `beduerfnis-ids.js` ändern:

```javascript
// ALT:
'#B142': { key: 'dynamische_evolution', kategorie: '#K13', ... }

// NEU: Nach #B126 einfügen
'#B127': { key: 'dynamische_evolution', kategorie: '#K12', label: 'Dynamische Evolution' },
```

**Alle nachfolgenden IDs um 1 verschieben (#B127→#B128, etc.)**

---

### **Fix 3: sinnsuche_gemeinsam korrigieren**

In `constants.js:ARCHETYP_NEEDS` ändern:

```javascript
// ALT:
"sinnsuche_gemeinsam",  // Existiert nicht!

// NEU - EINE der Optionen:
"sinnsuche",           // #B??? (muss hinzugefügt werden)
// ODER entfernen
```

---

### **Fix 4: Fehlende archetyp-relevante Bedürfnisse hinzufügen**

```javascript
ARCHETYP_NEEDS: [
    // ... bestehende ...

    // Neu hinzufügen (hohe Archetyp-Varianz):
    "elternschaft",           // #B91 - Duo:85, Poly:35
    "rechtliche_sicherheit",  // #B97 - Duo:80, Poly:20
    "haeuslichkeit",          // #B100 - Duo:90, Poly:30
    "nest_bauen",             // #B101 - Duo:85, Poly:25
]
```

**Neue Gesamtzahl:** 22 Archetyp-Bedürfnisse (statt 18)

---

## **HISTORISCHER KONTEXT**

### **Migrationsprobleme:**

1. **v1.0 → v2.0 Migration unvollständig**
   - Alte `gfk-beduerfnisse.js` enthält ~800 Bedürfnisse
   - Neue `beduerfnis-ids.js` hat nur 220
   - Einige Osho/Pirsig-Bedürfnisse wurden nicht übertragen

2. **Dokumentation inkonsistent:**
   - `/docs/alle-216-beduerfnisse-fragen.md` ← Alte Zahl
   - `/docs/alle-220-beduerfnisse-fragen.md` ← Aktuelle Zahl
   - ARCHETYP_NEEDS referenziert nicht-existierende Keys

---

## **AUSWIRKUNG AUF BERECHNUNG**

**Aktuell:** Die Funktion `calculateFactorNeedsMatch('archetyp')` kann diese 4-5 Bedürfnisse NICHT berechnen, weil sie nicht in TiageState.flatNeeds vorhanden sind!

**Problem:**
```javascript
// constants.js sagt:
ARCHETYP_NEEDS: ["nicht_anhaften_an_partner", ...]

// Aber TiageState hat:
flatNeeds = { kinderwunsch: 75, ... }  // nicht_anhaften_an_partner fehlt!

// Ergebnis: Score basiert nur auf ~13 von 18 Bedürfnissen!
```

---

## **ENTSCHEIDUNG ERFORDERLICH**

**Option A: Minimale Korrektur** (schnell)
- Entferne die 4 fehlenden Bedürfnisse aus ARCHETYP_NEEDS
- Korrigiere `dynamische_evolution` Kategorie
- **Neue Anzahl:** 13 Archetyp-Bedürfnisse

**Option B: Vollständige Migration** (korrekt)
- Füge die 3 Osho-Bedürfnisse zu beduerfnis-ids.js hinzu (#B221-#B223)
- Verschiebe `dynamische_evolution` nach #K12
- Füge `elternschaft`, `rechtliche_sicherheit`, `haeuslichkeit`, `nest_bauen` zu ARCHETYP_NEEDS hinzu
- **Neue Anzahl:** 223 Gesamt-Bedürfnisse, 22 Archetyp-Bedürfnisse

---

**Welche Option bevorzugen Sie?**
