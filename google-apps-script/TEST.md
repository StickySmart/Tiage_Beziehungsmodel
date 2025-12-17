# Test-Anleitung für Besucherzähler-Sicherheit

## 1. Google Apps Script Setup

### Schritt 1: Code deployen
1. Öffne dein Google Sheet
2. Gehe zu **Erweiterungen > Apps Script**
3. Kopiere den kompletten Code aus `Code.gs`
4. Klicke **Speichern**
5. Klicke **Bereitstellen > Neue Bereitstellung**
   - Typ: **Web-App**
   - Ausführen als: **Ich**
   - Zugriff: **Jeder**
6. Klicke **Bereitstellen**
7. Kopiere die **Web-App URL**

### Schritt 2: Sheets initialisieren
1. Im Apps Script Editor: Wähle `testInit` aus dem Dropdown
2. Klicke **Ausführen**
3. Autorisiere die App wenn nötig
4. Prüfe dein Google Sheet - es sollten jetzt folgende Tabs geben:
   - ✅ Kommentare
   - ✅ Besucher
   - ✅ Config (mit visitorCounter = 1)
   - ✅ RateLimit (leer)
   - ✅ SecurityLog (leer)

## 2. Backend-Tests (Google Apps Script)

### Test A: Visitor ID abrufen (ohne Fingerprint)

**URL aufrufen:**
```
https://script.google.com/[DEINE-ID]/exec?action=getVisitorId
```

**Erwartetes Ergebnis:**
```json
{
  "visitorId": "1",
  "totalVisitors": 1
}
```

**Prüfen:**
- ✅ Config Sheet: visitorCounter sollte jetzt **2** sein
- ✅ SecurityLog: Ein Eintrag "NEW_VISITOR_ID"

### Test B: Visitor ID mit Fingerprint

**URL aufrufen:**
```
https://script.google.com/[DEINE-ID]/exec?action=getVisitorId&fp=TEST123
```

**Erwartetes Ergebnis:**
```json
{
  "visitorId": "2",
  "totalVisitors": 2
}
```

**Prüfen:**
- ✅ RateLimit Sheet: Zeile mit "TEST123", RequestCount = 1
- ✅ SecurityLog: Neuer Eintrag mit Fingerprint "TEST123"

### Test C: Rate Limiting testen

**10x nacheinander aufrufen:**
```
https://script.google.com/[DEINE-ID]/exec?action=getVisitorId&fp=TESTLIMIT
```

**Nach dem 10. Aufruf:**
```json
{
  "error": "Rate limit exceeded",
  "message": "Rate limit exceeded (max 10 per hour)"
}
```

**Prüfen:**
- ✅ RateLimit Sheet: "TESTLIMIT" mit RequestCount = 10
- ✅ SecurityLog: "RATE_LIMIT_EXCEEDED" Event

### Test D: Stats abrufen

**URL aufrufen:**
```
https://script.google.com/[DEINE-ID]/exec?action=getStats
```

**Erwartetes Ergebnis:**
```json
{
  "totalVisitors": 12
}
```

### Test E: Cleanup

**URL aufrufen:**
```
https://script.google.com/[DEINE-ID]/exec?action=cleanup
```

**Erwartetes Ergebnis:**
```json
{
  "success": true,
  "message": "Cleanup completed"
}
```

## 3. Frontend-Tests (Browser)

### Test F: Fingerprint-Generierung

**Browser-Konsole öffnen (F12):**
```javascript
// Fingerprint generieren
const fp = generateBrowserFingerprint();
console.log('Fingerprint:', fp);

// Sollte sowas ausgeben: "FPabc123xyz..."
```

**Prüfen:**
- ✅ LocalStorage: `tiage_fingerprint` sollte gesetzt sein
- ✅ Fingerprint beginnt mit "FP"

### Test G: Visitor ID abrufen

**Browser-Konsole:**
```javascript
// Visitor ID abrufen
const result = await fetchOrCreateVisitorId();
console.log('Result:', result);

// Ausgabe sollte sein:
// { visitorId: "...", totalVisitors: ..., fingerprint: "FP..." }
```

**Prüfen:**
- ✅ LocalStorage: `tiage_visitor_id` gesetzt
- ✅ Display auf der Seite aktualisiert: "#123 von 456"

### Test H: Cache testen

**Browser-Konsole:**
```javascript
// Total Visitors cachen
setCachedTotalVisitors(999);

// Abrufen
const cached = getCachedTotalVisitors();
console.log('Cached:', cached); // Sollte 999 sein
```

**Prüfen:**
- ✅ LocalStorage: `tiage_total_visitors` = "999"
- ✅ LocalStorage: `tiage_total_visitors_timestamp` = aktueller Timestamp

### Test I: Retry Logic testen

**Netzwerk ausschalten und dann:**
```javascript
// Sollte 3x versuchen und dann mit cached data zurückfallen
const result = await fetchOrCreateVisitorId();
console.log('Fallback result:', result);
```

**Erwartetes Verhalten:**
- ✅ Console: "Retry attempt 1 after 1000ms"
- ✅ Console: "Retry attempt 2 after 2000ms"
- ✅ Console: "Server not available, using local ID"
- ✅ Lokale ID mit "L" Prefix: "L123456"

## 4. Integration-Test (Vollständig)

### Test J: Neuer Besucher-Workflow

**Schritte:**
1. LocalStorage komplett löschen (F12 > Application > Local Storage > Clear All)
2. Seite neu laden
3. Warten bis Visitor ID angezeigt wird

**Prüfen:**
- ✅ Browser: Neue Visitor ID angezeigt "#X von Y"
- ✅ LocalStorage:
  - `tiage_visitor_id` gesetzt
  - `tiage_fingerprint` gesetzt
  - `tiage_total_visitors` gesetzt
- ✅ Google Sheet:
  - Config: visitorCounter erhöht
  - RateLimit: Neuer Eintrag mit Fingerprint
  - SecurityLog: "NEW_VISITOR_ID" Event

### Test K: Bestehender Besucher

**Schritte:**
1. Seite neu laden (ohne LocalStorage zu löschen)
2. Visitor ID sollte gleich bleiben

**Prüfen:**
- ✅ Browser: Gleiche Visitor ID
- ✅ Google Sheet: visitorCounter NICHT erhöht
- ✅ RateLimit: RequestCount NICHT erhöht

## 5. Security-Tests

### Test L: Mehrfaches LocalStorage löschen

**Schritte:**
1. LocalStorage löschen
2. Seite neu laden → neue ID
3. LocalStorage löschen
4. Seite neu laden → neue ID
5. Wiederhole 8x

**Erwartung:**
- ✅ Nach 10x: Fehler "Rate limit exceeded"
- ✅ SecurityLog: "RATE_LIMIT_EXCEEDED"
- ✅ Fallback auf lokale ID mit "L" Prefix

### Test M: Fingerprint blocken

**Schritte:**
1. Hol dir deinen Fingerprint: `console.log(getBrowserFingerprint())`
2. Gehe zum RateLimit Sheet
3. Finde die Zeile mit deinem Fingerprint
4. Setze "Blocked" auf TRUE
5. LocalStorage löschen
6. Seite neu laden

**Erwartung:**
- ✅ Fehler: "Blocked due to suspicious activity"
- ✅ Fallback auf lokale ID "L..."
- ✅ SecurityLog: "RATE_LIMIT_BLOCKED"

## 6. Performance-Test

### Test N: Ladezeit messen

**Browser-Konsole:**
```javascript
// Messung starten
console.time('visitorIdFetch');
await fetchOrCreateVisitorId();
console.timeEnd('visitorIdFetch');
```

**Erwartete Zeiten:**
- ✅ Erster Besuch (neu): 500-1500ms
- ✅ Wiederkehrender Besuch (cached): 100-300ms
- ✅ Offline (fallback): < 50ms

## 7. Checkliste: Alles funktioniert?

### Backend ✅
- [ ] Sheets werden automatisch erstellt
- [ ] Visitor IDs werden korrekt vergeben
- [ ] Rate Limiting greift nach 10 Requests
- [ ] SecurityLog schreibt alle Events
- [ ] RateLimit Sheet tracked Fingerprints
- [ ] Cleanup entfernt alte Einträge

### Frontend ✅
- [ ] Fingerprint wird generiert
- [ ] Visitor ID wird angezeigt
- [ ] LocalStorage wird genutzt
- [ ] Cache funktioniert (5min)
- [ ] Retry bei Netzwerkfehlern
- [ ] Fallback auf lokale ID bei Server-Ausfall

### Security ✅
- [ ] Rate Limiting verhindert Spam
- [ ] Fingerprinting erschwert Manipulation
- [ ] Logging erfasst verdächtige Aktivitäten
- [ ] Blocking funktioniert
- [ ] Offline-Modus funktioniert

## 8. Troubleshooting

### Problem: "Error: Script function not found: doGet"
**Lösung:** Apps Script muss als Web-App deployed sein

### Problem: Rate Limit Sheet bleibt leer
**Lösung:** Fingerprint wird nicht mitgeschickt - prüfe Frontend Code

### Problem: SecurityLog füllt sich zu schnell
**Lösung:** Automatische Rotation bei 1000 Einträgen - alles normal

### Problem: Visitor Counter springt wild
**Lösung:** Prüfe ob mehrere Leute gleichzeitig testen

### Problem: LocalStorage wird nicht gespeichert
**Lösung:** Prüfe Browser-Einstellungen - Cookies/LocalStorage erlaubt?

## 9. Monitoring Dashboard (optional)

**Nützliche Google Sheets Formeln:**

### Heute registrierte Besucher:
```
=COUNTIF(SecurityLog!A:A, ">"&TEXT(TODAY(),"yyyy-mm-dd"))
```

### Rate Limit Violations heute:
```
=COUNTIF(SecurityLog!B:B, "RATE_LIMIT_EXCEEDED")
```

### Aktuell aktive Rate Limits:
```
=COUNTA(RateLimit!A:A)-1
```

### Geblockte Fingerprints:
```
=COUNTIF(RateLimit!D:D, TRUE)
```
