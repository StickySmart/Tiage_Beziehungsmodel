# Regressions-Checkliste

**Erstellt:** 26. Januar 2026
**Zweck:** Manuelle Tests nach jeder Refactoring-Phase
**Geschätzte Testzeit:** ~30 Minuten pro vollständiger Durchlauf

---

## Kritische User-Flows

Diese Flows MÜSSEN nach jeder Refactoring-Änderung funktionieren.

### 1. Grundlegende Initialisierung

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 1.1 | Seite laden | Keine Console-Errors, UI vollständig gerendert | |
| 1.2 | TiageState initialisiert | `TiageState.get('ich.archetyp')` gibt Wert zurück | |
| 1.3 | Gespeicherte Daten laden | Vorherige Auswahl wird wiederhergestellt | |
| 1.4 | Sprache wechseln | DE ↔ EN funktioniert, alle Texte aktualisiert | |

---

### 2. ICH-Profil Konfiguration (Desktop)

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 2.1 | Archetyp auswählen | Grid-Klick wählt Archetyp, UI aktualisiert | |
| 2.2 | Archetyp navigieren (←/→) | Pfeile wechseln durch alle 8 Archetypen | |
| 2.3 | Geschlecht P auswählen | Mann/Frau/Inter wählbar, S-Grid aktualisiert | |
| 2.4 | Geschlecht S auswählen | Cis/Trans/NB wählbar basierend auf P | |
| 2.5 | Dominanz auswählen | Alle 4 Optionen wählbar (Dom/Sub/Switch/Ausgeglichen) | |
| 2.6 | Dominanz-Status toggeln | "Gelebt"/"Interessiert" Buttons funktionieren | |
| 2.7 | Orientierung auswählen | Alle 5 Optionen wählbar | |
| 2.8 | Orientierung-Status toggeln | "Gelebt"/"Interessiert" Buttons funktionieren | |
| 2.9 | Body/Soul auswählen | Körper/Seele Balance wählbar | |
| 2.10 | GFK-Kompetenz auswählen | Hoch/Mittel/Niedrig wählbar | |

---

### 3. Partner-Profil Konfiguration (Desktop)

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 3.1 | Partner-Archetyp auswählen | Wie ICH, aber separater State | |
| 3.2 | Partner-Dimensionen | Alle Dimensionen unabhängig von ICH wählbar | |
| 3.3 | Vergleich aktualisiert | Score ändert sich bei Auswahl | |

---

### 4. Mobile Navigation

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 4.1 | Page 1 → Page 2 | Navigation funktioniert | |
| 4.2 | Page 2 → Page 3 | Navigation funktioniert | |
| 4.3 | Page 3 → Page 4 | Navigation funktioniert | |
| 4.4 | Mobile ICH-Auswahl | Archetyp-Grid funktioniert auf Mobile | |
| 4.5 | Mobile Partner-Auswahl | Partner-Auswahl funktioniert | |
| 4.6 | Mobile Dimensionen | Collapse/Expand funktioniert | |
| 4.7 | Mobile Gewichtung | Slider funktionieren | |

---

### 5. Slot Machine ("Wie tickst Du?")

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 5.1 | Modal öffnen | Button öffnet Slot Machine Modal | |
| 5.2 | Bindungsmuster Primary wählen | Sicher/Ängstlich/Vermeidend/Desorganisiert | |
| 5.3 | Bindungsmuster Secondary wählen | Alle 4 Optionen wählbar | |
| 5.4 | Slot Machine starten | Animation läuft, Ergebnis wird angezeigt | |
| 5.5 | Ergebnis anwenden | Archetyp wird übernommen | |
| 5.6 | Modal schließen | X-Button und Overlay-Klick schließen | |

---

### 6. Modals - Öffnen/Schließen

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 6.1 | Definition Modal | Öffnet, Navigation funktioniert, schließt | |
| 6.2 | Factor Detail Modal | Öffnet mit Faktor-Details, Tabs funktionieren | |
| 6.3 | Tiage Synthese Modal | Score/OshoZen/Needs Tabs funktionieren | |
| 6.4 | Resonanzfaktoren Modal | Öffnet, R1-R4 angezeigt | |
| 6.5 | Needs Compare Modal | Bedürfnis-Vergleich funktioniert | |
| 6.6 | GFK Explanation Modal | Öffnet und schließt | |
| 6.7 | Comment Modal | Öffnet, Formular funktioniert | |
| 6.8 | Comments List Modal | Liste wird angezeigt, Filter funktionieren | |
| 6.9 | Memory Modal | Profil-Slots angezeigt | |
| 6.10 | Alle Modal-Overlays | Klick auf Overlay schließt Modal | |

---

### 7. Dimensions-Info-Modals

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 7.1 | Geschlecht Info Modal | ℹ️ Button öffnet Details | |
| 7.2 | Dominanz Info Modal | ℹ️ Button öffnet Details | |
| 7.3 | Orientierung Info Modal | ℹ️ Button öffnet Details | |
| 7.4 | Body/Soul Info Modal | ℹ️ Button öffnet Details | |

---

### 8. AGOD-Gewichtung

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 8.1 | O-Gewichtung ändern | +/- Buttons funktionieren | |
| 8.2 | A-Gewichtung ändern | +/- Buttons funktionieren | |
| 8.3 | D-Gewichtung ändern | +/- Buttons funktionieren | |
| 8.4 | G-Gewichtung ändern | +/- Buttons funktionieren | |
| 8.5 | Score aktualisiert | Änderung beeinflusst Gesamtscore | |
| 8.6 | Gewichtung persistiert | Nach Reload noch vorhanden | |

---

### 9. Persistenz

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 9.1 | Auto-Save | Änderungen werden automatisch gespeichert | |
| 9.2 | Reload behält State | F5 → alle Auswahlen noch da | |
| 9.3 | Reset All | Setzt alles zurück auf Defaults | |
| 9.4 | Clear Storage | localStorage wird geleert | |
| 9.5 | Memory Slots | 4 Profile können gespeichert/geladen werden | |

---

### 10. Tooltips & Hover

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 10.1 | Dimension Tooltips | Hover zeigt Tooltip | |
| 10.2 | Tag Tooltips | Klick auf Tag öffnet Tooltip | |
| 10.3 | Category Tooltips | Kategorie-Infos werden angezeigt | |

---

### 11. Kompatibilitäts-Anzeige

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 11.1 | Score wird berechnet | Q-Score (0-100) angezeigt | |
| 11.2 | Radar-Chart | 4 Faktoren visualisiert | |
| 11.3 | Kategorie-Balken | Farbige Balken pro Kategorie | |
| 11.4 | Pro/Contra Liste | Dynamisch generiert | |
| 11.5 | Hard-KO Warnung | Bei unmöglicher Kombination angezeigt | |
| 11.6 | Soft-KO Hinweis | Bei schwieriger Kombination angezeigt | |

---

### 12. Altersverifikation

| # | Test | Erwartetes Ergebnis | ✓/✗ |
|---|------|---------------------|-----|
| 12.1 | Modal erscheint | Bei erstem Besuch | |
| 12.2 | "Ja, ich bin 18+" | Speichert und schließt | |
| 12.3 | "Nein" | Leitet weiter oder zeigt Hinweis | |

---

## Schnell-Check (5 Minuten)

Für kleine Änderungen - minimaler Regressionstest:

| # | Test | ✓/✗ |
|---|------|-----|
| 1 | Seite lädt ohne Errors | |
| 2 | ICH-Archetyp wählbar | |
| 3 | Partner-Archetyp wählbar | |
| 4 | Score wird angezeigt | |
| 5 | Ein Modal öffnet/schließt | |
| 6 | Mobile Navigation funktioniert | |

---

## Browser-Kompatibilität

Testen in:
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop)
- [ ] Chrome (Mobile/Android)
- [ ] Safari (Mobile/iOS)

---

## Performance-Checks

| Metrik | Erwartung | Aktuell |
|--------|-----------|---------|
| First Contentful Paint | < 2s | |
| Largest Contentful Paint | < 3s | |
| Time to Interactive | < 4s | |
| Console Errors | 0 | |
| Console Warnings | < 5 | |

---

## Nach Refactoring-Phase prüfen

### Phase 2 (onclick → Event-Listener)
- [ ] Alle Modal-Klicks funktionieren
- [ ] Alle Navigation-Buttons funktionieren
- [ ] Alle Dimension-Toggles funktionieren

### Phase 3+ (Module extrahieren)
- [ ] Modul-spezifische Funktionalität
- [ ] Keine zirkulären Abhängigkeiten
- [ ] SSOT intakt (TiageState)

---

## Fehler-Dokumentation

| Datum | Phase | Fehler | Lösung | Behoben |
|-------|-------|--------|--------|---------|
| | | | | |

---

*Erstellt im Rahmen des Refactoring-Plans v2.0*
*Letzte Aktualisierung: 26. Januar 2026*
