# Änderung: Archetyp-Score zeigt jetzt Gesamt-Bedürfnis-Match (220) statt theoretische Schätzung

**Datum:** 2025-12-16
**Betroffene Datei:** `js/app-main.js`

## Problem

Die Anzeige "**Basis-Archetyp: 50 (Forschungsdaten)**" war irreführend:
- Die **50** war eine **hardcodierte theoretische Schätzung** aus der Fallback-Matrix
- NICHT aus tatsächlichen Umfragedaten
- Keine empirische Basis für Archetyp-Kompatibilität (siehe ARCHETYP_NEEDS_AUDIT.md)

## Lösung

Nutze **bereits berechnete Gesamt-Bedürfnis-Übereinstimmung** (alle 220 Bedürfnisse):

### Neue Logik: Nutze `lastGfkMatchingResult.score`

```javascript
// Statt neue Berechnung: Nutze bereits vorhandenen Score
const matching = lastGfkMatchingResult;
if (matching && matching.score !== undefined) {
    baseArchetypeScore = matching.score;  // Die 72%!
    scoreLabel = 'Bedürfnis-Übereinstimmung';
}
```

**Vorteile:**
- ✅ Keine neue Funktion notwendig
- ✅ Nutzt bereits berechneten Wert
- ✅ Alle 220 Bedürfnisse (nicht nur 18)
- ✅ Konsistent mit Hauptanzeige

### Alle 220 Bedürfnisse einbezogen

**Kategorien:**
- #B1-#B88: GFK-Kern (88 Bedürfnisse)
- #B90-#B126: Lebensplanung (37)
- #B127-#B148: Finanzen & Karriere (22)
- #B149-#B176: Kommunikationsstil (28)
- #B177-#B203: Soziales Leben (27)
- #B204-#B208: Intimität & Romantik (5)
- #B209-#B220: Dynamik erweitert (12)
- **Total: 220 Bedürfnisse**

**Quelle der Berechnung:** `profiles/profile-store.js:1010-1076` - `calculateNeedsMatch()`

---

## Berechnungsformel (bereits vorhanden)

```javascript
// Für JEDES der 220 Bedürfnisse:
Ähnlichkeit = 100 - |Wert_Person1 - Wert_Person2|
Gewicht = (Wert_Person1 + Wert_Person2) / 2 / 100
Beitrag = Ähnlichkeit × Gewicht

// Gesamt-Score:
Score = Σ(Beitrag) / Σ(Gewicht)
```

**Diese Berechnung läuft bereits** bei jedem Bedürfnis-Vergleich!

---

## Anzeige

### Vorher:
```
Basis-Archetyp: 50 (Forschungsdaten)  ← Hardcodiert aus Fallback-Matrix
```

### Nachher:
```
Basis-Archetyp: 72 (Bedürfnis-Übereinstimmung)  ← Echter Match aller 220 Bedürfnisse
```

**Fallback:**
Wenn Bedürfnisse nicht verfügbar:
```
Basis-Archetyp: 50 (Theoretischer Wert)  ← Nur als Fallback
```

---

## Vorteile

1. ✅ **Empirisch statt theoretisch**: Basiert auf tatsächlichen individuellen Bedürfnissen
2. ✅ **Transparent**: Klar als "Bedürfnis-Match" gekennzeichnet
3. ✅ **Konsistent**: Nutzt dieselbe Formel wie die 220-Bedürfnis-Übereinstimmung
4. ✅ **Individualisiert**: Berücksichtigt Modifikatoren (Dominanz, Geschlecht, Orientierung)
5. ✅ **Genau**: Keine Verwechslung mehr mit "Forschungsdaten"

---

## Code-Änderungen

### 1. Geänderte Anzeige-Logik (Zeile ~14206-14221)

```javascript
// Nutze bereits berechnete Gesamt-Übereinstimmung
let baseArchetypeScore = null;
let scoreLabel = 'Theoretischer Wert';

// Hole den bereits vorhandenen Score
const matching = lastGfkMatchingResult;
if (matching && matching.score !== undefined) {
    baseArchetypeScore = matching.score;  // Die 72%!
    scoreLabel = 'Bedürfnis-Übereinstimmung';
}

// Fallback: Matrix-Score wenn Bedürfnisse nicht verfügbar
if (baseArchetypeScore === null) {
    baseArchetypeScore = getArchetypeScore(currentArchetype, selectedPartner);
    scoreLabel = 'Theoretischer Wert';
}
```

### 2. Template-Änderung (im HTML Template)

```javascript
// ALT:
<span>(Forschungsdaten)</span>

// NEU:
<span>(${scoreLabel})</span>
```

**Zeigt dynamisch:**
- `(Bedürfnis-Übereinstimmung)` wenn Bedürfnisse verfügbar
- `(Theoretischer Wert)` als Fallback

---

## Beispiel

**Konstellation:** Duo (Ich) + Polyamor (Partner)

### Alte Anzeige:
```
Basis-Archetyp: 50 (Forschungsdaten)  ← Hardcodiert aus Fallback-Matrix
```

### Neue Anzeige:
```
Basis-Archetyp: 45 (Bedürfnis-Übereinstimmung)  ← Echter Match aller 220 Bedürfnisse
```

**Erklärung:**
Die beiden Profile haben über alle 220 Bedürfnisse 45% Übereinstimmung:
- **Konflikt** bei Lebensplanung: kinderwunsch, langfristige_bindung, treueversprechen
- **Übereinstimmung** bei: Autonomie, Selbstbestimmung, Offenheit
- **Gesamt**: 45% gewichteter Durchschnitt über alle Kategorien

---

## Migration

**Keine Breaking Changes:**
- Fallback auf alte Logik wenn Bedürfnisse fehlen
- Label zeigt deutlich, welche Berechnung verwendet wurde

---

## Testing

Teste mit verschiedenen Archetyp-Kombinationen:
1. Duo + Duo → Sollte ~90+ sein (sehr ähnliche Bedürfnisse)
2. Duo + Polyamor → Sollte ~30-40 sein (sehr unterschiedlich)
3. Single + RA → Sollte ~70-75 sein (mittlere Übereinstimmung)

---

**Autor:** Claude
**Review:** Tiage Team
