# Bedürfniswerte-Migration: Archetyp → Individualisiert

## Problem

Die Bedürfniswerte für das Resonanz-Modal und andere Ansichten kommen aktuell aus **Archetyp-basierten Profilen** (`GfkBeduerfnisse.berechneMatching()`), nicht aus den **individualisierten Werten** im `TriageState` (`flatNeeds`).

## Lösung

Umstellung von `GfkBeduerfnisse.berechneMatching()` auf `TiageProfileStore.calculateNeedsMatch()`, das mit individualisierten `profile.needs` arbeitet.

---

## ✅ Bereits umgestellt

**Zeile 8147-8156** in `updateGfkFromArchetypes()`:
```javascript
const ichProfile = getProfileFromStore(ichPerson);
const partnerProfile = getProfileFromStore(partnerPerson);
const result = TiageProfileStore.calculateNeedsMatch(ichProfile, partnerProfile);
```
✅ **Verwendet bereits individualisierte Werte!**

---

## 🔴 PRIO 1: User-sichtbare Modals (KRITISCH)

Diese Stellen zeigen dem User direkt Bedürfniswerte an und müssen zuerst umgestellt werden:

### 1. **`getNeedsContent()` (Zeile 15639)**
   - **Funktion**: Generiert Needs-Content für die **Tiage-Synthese-Modal** (Haupt-Modal mit "Grenzen respektieren" etc.)
   - **Location**: `js/app-main.js:15630-15849`
   - **Verwendung**: Zeigt Bedürfnis-Vergleich mit Sortierung, Differenzen, Resonanz-Storytelling
   - **Aufruf von**: `openNeedDefinitionModal()` → `renderResonanceModal()` (Screenshot-Kontext!)
   - **Impact**: 🔥 **SEHR HOCH** - Direkter User-Kontakt im Haupt-Modal

### 2. **`openNeedsCompareModal(type)` (Zeile 5048)**
   - **Funktion**: Öffnet **Bedürfnis-Vergleich Modal** (gemeinsam/unterschiedlich)
   - **Location**: `js/app-main.js:5030-5147`
   - **Verwendung**: Zeigt Top-Übereinstimmungen und Top-Konflikte
   - **Aufruf von**: UI-Buttons "Gemeinsame Bedürfnisse" / "Unterschiedliche Prioritäten"
   - **Impact**: 🔥 **HOCH** - Oft genutzt, User-sichtbar

### 3. **`renderNeedsFullModal()` (Zeile 7836)**
   - **Funktion**: Rendert **vollständiges Bedürfnis-Modal** mit Tabs und Sortierung
   - **Location**: `js/app-main.js:7818-8036`
   - **Verwendung**: Zeigt alle Bedürfnisse sortierbar nach Ich/Diff/Partner
   - **Aufruf von**: Modal-Rendering-Logik
   - **Impact**: 🔥 **HOCH** - Detaillierte Ansicht, User-sichtbar

### 4. **`getGfkBeduerfnisAnalyse(type)` (Zeile 14137)**
   - **Funktion**: Generiert HTML für **GFK-Bedürfnis-Tags** im Pathos/Logos Modal
   - **Location**: `js/app-main.js:14116-14253`
   - **Verwendung**: Zeigt gemeinsame/unterschiedliche Bedürfnisse als Tags
   - **Aufruf von**: Pathos/Logos-Synthese-Ansicht
   - **Impact**: 🟠 **MITTEL** - Synthese-Modal, User-sichtbar

### 5. **`getScoreNeedsContent()` (Zeile 14031, Fallback)**
   - **Funktion**: Generiert Bedürfnis-Matching-Content für **Score-Ansicht**
   - **Location**: `js/app-main.js:14011-14108`
   - **Verwendung**: Fallback wenn keine vollständigen Daten aus `lastGfkMatchingResult`
   - **Aufruf von**: Score-Synthese-Modal
   - **Impact**: 🟡 **NIEDRIG** - Nur Fallback, selten aktiv

---

## 🟡 PRIO 2: Berechnungs-Funktionen (Fallbacks)

Diese verwenden `berechneMatching()` als Fallback, wenn keine individualisierten Werte vorhanden:

### 6. **`calculateGfkFactor()` (Zeile 10122)**
   - **Funktion**: Berechnet **K-Subfaktoren** (K1-K4) für GFK-Kommunikationsfaktor
   - **Location**: `js/app-main.js:10093-10145`
   - **Verwendung**: Benötigt für calculateRelationshipQuality()
   - **Impact**: 🟠 **MITTEL** - Beeinflusst Score-Berechnung

### 7. **`calculateRelationshipQuality()` (Zeile 10249, Fallback)**
   - **Funktion**: Berechnet **R-Faktoren** (R1-R4) für Resonanz-Modulation
   - **Location**: `js/app-main.js:10192-10314`
   - **Verwendung**: Fallback wenn keine benutzerdefinierten R-Werte aus ResonanzCard
   - **Impact**: 🟡 **NIEDRIG** - Nur Fallback, ResonanzCard hat Vorrang

### 8. **`updateGfkFromArchetypes()` (Zeile 8112, Fallback)**
   - **Funktion**: Aktualisiert GFK-Level aus Archetypen
   - **Location**: `js/app-main.js:8073-8133`
   - **Verwendung**: Fallback wenn keine dynamische Berechnung möglich
   - **Impact**: 🟢 **SEHR NIEDRIG** - Nur Fallback, Zeile 8147 hat bereits neue Logik

---

## 🔧 Umstellungs-Pattern

### Alt (Archetyp-basiert):
```javascript
const matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
```

### Neu (Individualisiert):
```javascript
// 1. Profile aus Store holen
const ichPerson = { archetyp: ichArchetyp, ...personDimensions.ich };
const partnerPerson = { archetyp: partnerArchetyp, ...personDimensions.partner };

const ichProfile = getProfileFromStore(ichPerson);
const partnerProfile = getProfileFromStore(partnerPerson);

// 2. Matching mit individualisierten Werten
if (ichProfile?.needs && partnerProfile?.needs) {
    const result = TiageProfileStore.calculateNeedsMatch(ichProfile, partnerProfile);

    // 3. Format anpassen
    const matching = {
        score: result.score,
        level: result.score >= 70 ? 'hoch' : (result.score >= 40 ? 'mittel' : 'niedrig'),
        topUebereinstimmungen: result.gemeinsam.map(formatNeed),
        topKonflikte: result.unterschiedlich.map(formatNeed),
        details: {
            uebereinstimmend: result.gemeinsam.map(formatNeed),
            komplementaer: result.komplementaer.map(formatNeed),
            konflikt: result.unterschiedlich.map(formatNeed)
        }
    };
}
```

---

## 📊 Zusammenfassung

| Priorität | Anzahl | Beschreibung |
|-----------|--------|--------------|
| 🔴 **PRIO 1** | **5** | User-sichtbare Modals und Ansichten |
| 🟡 **PRIO 2** | **3** | Berechnungs-Funktionen (Fallbacks) |
| ✅ **Erledigt** | **1** | Bereits umgestellt (Zeile 8147) |

**Total**: 8 Stellen + 1 bereits umgestellt = 9 Stellen

---

## 🎯 Nächste Schritte

1. **PRIO 1** Modals umstellen (Zeilen 15639, 5048, 7836, 14137, 14031)
2. **PRIO 2** Berechnungs-Funktionen prüfen und ggf. umstellen (Zeilen 10122, 10249, 8112)
3. Testen ob `getProfileFromStore()` immer korrekte `needs` zurückgibt
4. Prüfen ob `TiageState.flatNeeds` immer aktuell ist

---

**Erstellt am**: 2025-12-15
**Branch**: `claude/check-triage-needs-values-yspSK`
