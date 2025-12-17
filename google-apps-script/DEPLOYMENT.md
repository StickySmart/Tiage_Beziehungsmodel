# 🚀 Deployment-Anleitung

## Übersicht

Diese Anleitung zeigt dir, wie du beide neuen Features deployest:
1. **Besucherzähler-Sicherheit** (Fingerprinting, Rate Limiting, Logging)
2. **Cookie-Bestätigung** im +18 Button

---

## ✅ Was wurde implementiert?

### 1. Besucherzähler-Sicherheit
- ✅ Browser-Fingerprinting
- ✅ Rate Limiting (max 10 Requests/Stunde)
- ✅ Security Logging
- ✅ LocalStorage Backup
- ✅ Retry-Logik mit exponential backoff

### 2. Cookie-Bestätigung
- ✅ Checkbox im Age Verification Modal
- ✅ Pflichtfeld vor Zugang zur Seite
- ✅ Speicherung der Zustimmung im LocalStorage
- ✅ Zweisprachig (DE/EN)
- ✅ Link zur Datenschutzerklärung

---

## 📦 Deployment Schritte

### Schritt 1: Google Apps Script deployen

**Was du brauchst:**
- Zugang zu deinem Google Sheet
- Apps Script Editor

**Anleitung:**

1. **Öffne dein Google Sheet**
   - Das Sheet, wo die Kommentare gespeichert werden

2. **Apps Script Editor öffnen**
   - Gehe zu **Erweiterungen → Apps Script**

3. **Neuen Code einfügen**
   - Lösche den alten Code (oder sichere ihn)
   - Kopiere den kompletten Code aus: `google-apps-script/Code.gs`
   - Füge ihn ein

4. **Speichern**
   - Klicke auf **💾 Speichern**

5. **Neu deployen**
   - Klicke auf **Bereitstellen → Neue Bereitstellung**
   - Typ: **Web-App**
   - Einstellungen:
     - **Ausführen als:** Ich
     - **Zugriff:** Jeder
   - Klicke **Bereitstellen**

6. **URL kopieren**
   - Kopiere die **Web-App URL**
   - Sieht aus wie: `https://script.google.com/macros/s/ABC.../exec`

7. **Sheets initialisieren**
   - Im Apps Script Editor: Funktion `testInit` auswählen
   - Klicke **Ausführen**
   - Autorisiere wenn nötig
   - Prüfe: 5 neue Tabs sollten erstellt werden:
     - Kommentare
     - Besucher
     - Config
     - **RateLimit** (neu!)
     - **SecurityLog** (neu!)

---

### Schritt 2: Frontend-Dateien deployen

**Was du brauchst:**
- FTP/SFTP Zugang zu deinem Webserver
- ODER direkten Zugriff auf dein Hosting

**Dateien die du hochladen musst:**

```
1. js/app-main.js          (geändert: +117 Zeilen)
2. archetype-interaction.html   (geändert: Cookie-Checkbox hinzugefügt)
3. js/locales/de.js        (geändert: Cookie-Text hinzugefügt)
4. js/locales/en.js        (geändert: Cookie-Text hinzugefügt)
```

**Anleitung:**

1. **Verbinde dich mit deinem Server**
   - Via FTP (FileZilla, WinSCP, etc.)
   - ODER via Web-Interface (cPanel, Plesk, etc.)

2. **Dateien hochladen**
   - Navigiere zum Wurzelverzeichnis deiner Website
   - Lade die 4 Dateien hoch
   - **Wichtig:** Überschreibe die alten Versionen

3. **Cache leeren** (wichtig!)
   - Browser-Cache: Strg+Shift+Del
   - Server-Cache (falls vorhanden)
   - CDN-Cache (falls du ein CDN nutzt)

---

### Schritt 3: Testen

**Quick Test:**

1. **Öffne deine Webseite** in einem Inkognito-Fenster
   - Chrome: Strg+Shift+N
   - Firefox: Strg+Shift+P

2. **Age Verification Modal sollte erscheinen**
   - ✅ Checkbox ist sichtbar
   - ✅ "Ich akzeptiere die Verwendung von Cookies..."
   - ✅ Ohne Checkbox anklicken → Button zeigt Alert

3. **Checkbox anklicken und bestätigen**
   - ✅ Modal verschwindet
   - ✅ LocalStorage: `tiage_cookie_consent` = "true"

4. **Browser-Konsole öffnen (F12)**
   ```javascript
   // Prüfe Cookie Consent
   localStorage.getItem('tiage_cookie_consent')
   // Sollte "true" zurückgeben

   // Prüfe Fingerprint
   localStorage.getItem('tiage_fingerprint')
   // Sollte "FPabc123..." zurückgeben

   // Prüfe Visitor ID
   localStorage.getItem('tiage_visitor_id')
   // Sollte eine Nummer sein
   ```

5. **Google Sheet prüfen**
   - ✅ Config: visitorCounter erhöht sich
   - ✅ RateLimit: Dein Fingerprint ist eingetragen
   - ✅ SecurityLog: "NEW_VISITOR_ID" Event

---

## 🧪 Vollständiger Test

### Test 1: Cookie-Bestätigung

**Schritte:**
1. Lösche alle Cookies/LocalStorage (F12 → Application → Clear All)
2. Lade Seite neu
3. Age Modal erscheint
4. Klicke "Ja" OHNE Checkbox
5. **Erwartung:** Alert erscheint: "Bitte akzeptiere..."
6. Checkbox anklicken
7. Klicke "Ja"
8. **Erwartung:** Modal verschwindet, Seite nutzbar

### Test 2: Besucherzähler

**Schritte:**
1. Öffne Browser-Konsole (F12)
2. Kopiere:
   ```javascript
   console.log('Visitor ID:', localStorage.getItem('tiage_visitor_id'));
   console.log('Fingerprint:', localStorage.getItem('tiage_fingerprint'));
   console.log('Total (cached):', localStorage.getItem('tiage_total_visitors'));
   ```
3. **Erwartung:** Alle 3 Werte sollten gesetzt sein

### Test 3: Rate Limiting

**Achtung: Dieser Test verbraucht dein Limit!**

1. Lösche `tiage_visitor_id` aus LocalStorage 10x
2. Lade Seite jedes Mal neu
3. Nach dem 10. Mal: Fallback auf lokale ID (mit "L" Prefix)
4. Prüfe Google Sheet → RateLimit: 10 Requests

### Test 4: Security Logging

1. Öffne Google Sheet → SecurityLog
2. **Erwartung:** Einträge wie:
   - NEW_VISITOR_ID | FPabc... | 123 | ID assigned
   - RATE_LIMIT_EXCEEDED | FPdef... | - | 10 requests...

---

## 🔍 Troubleshooting

### Problem: Checkbox wird nicht angezeigt
**Lösung:**
- Browser-Cache leeren (Strg+Shift+Del)
- Prüfe ob `archetype-interaction.html` hochgeladen wurde
- Prüfe Browser-Konsole (F12) nach Fehlern

### Problem: "undefined" in Browser-Konsole
**Lösung:**
- `app-main.js` ist nicht aktuell
- Lade `app-main.js` erneut hoch
- Cache leeren

### Problem: Rate Limit funktioniert nicht
**Lösung:**
- Prüfe Google Apps Script Deployment
- Prüfe ob `testInit` ausgeführt wurde
- Prüfe ob RateLimit Sheet existiert

### Problem: SecurityLog bleibt leer
**Lösung:**
- Fingerprint wird nicht mitgeschickt
- Prüfe Browser-Konsole: `localStorage.getItem('tiage_fingerprint')`
- Sollte mit "FP" beginnen

### Problem: Alert kommt auch MIT Checkbox
**Lösung:**
- JavaScript-Fehler im Code
- Prüfe Browser-Konsole (F12)
- Prüfe ob `confirmAge` Funktion korrekt ist

---

## 📊 Nach dem Deployment

### Monitoring

**Was du regelmäßig prüfen solltest:**

1. **SecurityLog Sheet**
   - Verdächtige Events (RATE_LIMIT_EXCEEDED)
   - Fehler-Events (ERROR)

2. **RateLimit Sheet**
   - Geblockte Fingerprints
   - Cleanup alte Einträge (>24h)

3. **Config Sheet**
   - Visitor Counter wächst normal

### Wartung

**Monatlich:**
1. Cleanup alte Logs:
   ```
   https://DEINE-SCRIPT-URL/exec?action=cleanup
   ```

2. Export wichtiger Daten (Config Sheet)

3. Prüfe SecurityLog nach Anomalien

---

## ✨ Features nach Deployment

**Was deine Nutzer jetzt sehen:**

1. **Age Verification Modal**
   - Cookie-Checkbox (Pflichtfeld)
   - Link zur Datenschutzerklärung
   - Zweisprachig (DE/EN)

2. **Besucherzähler**
   - Funktioniert auch offline (LocalStorage Cache)
   - Robuster bei Netzwerkfehlern (Retry-Logik)
   - Geschützt vor Manipulation (Fingerprinting + Rate Limit)

**Was du als Admin siehst:**

1. **RateLimit Sheet**
   - Alle Fingerprints mit Request-Count
   - Blockierte Nutzer

2. **SecurityLog Sheet**
   - Alle Events (neue IDs, Rate Limits, Fehler)
   - Audit Trail für Compliance

---

## 🎯 Checkliste

### Vor dem Deployment:
- [ ] Google Sheet Backup erstellt
- [ ] Apps Script Code kopiert
- [ ] Frontend-Dateien bereit

### Deployment:
- [ ] Google Apps Script deployed
- [ ] `testInit` ausgeführt
- [ ] 5 Sheets existieren
- [ ] Frontend-Dateien hochgeladen
- [ ] Cache geleert

### Nach dem Deployment:
- [ ] Cookie-Checkbox sichtbar
- [ ] Alert funktioniert ohne Checkbox
- [ ] LocalStorage wird gesetzt
- [ ] Visitor Counter funktioniert
- [ ] SecurityLog bekommt Einträge
- [ ] RateLimit wird getrackt

---

## 🆘 Support

**Bei Problemen:**

1. Prüfe Browser-Konsole (F12) nach Fehlern
2. Prüfe Google Sheet → SecurityLog → ERROR Events
3. Teste im Inkognito-Modus
4. Vergleiche Code mit GitHub:
   ```
   https://github.com/StickySmart/Tiage_Beziehungsmodel/tree/claude/fix-visitor-counter-kcHhL
   ```

**Dokumentation:**
- Sicherheitsfeatures: `google-apps-script/SECURITY.md`
- Test-Anleitung: `google-apps-script/TEST.md`
- Diese Datei: `google-apps-script/DEPLOYMENT.md`

---

## 📝 Notizen

**Wichtige URLs:**

- Google Sheet: [DEINE URL]
- Apps Script URL: [DEINE URL]
- Website: [DEINE URL]

**Deployment-Log:**

```
Datum: _____________
Deployer: _____________
Version: 1.8.288+
Features: Visitor Counter Security + Cookie Consent
Status: [ ] Erfolgreich [ ] Probleme (siehe unten)

Probleme:
_____________________________________________
_____________________________________________
```

---

🎉 **Fertig! Viel Erfolg mit dem Deployment!**
