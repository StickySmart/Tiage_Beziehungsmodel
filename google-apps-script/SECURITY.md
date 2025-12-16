# Besucherzähler - Sicherheitsfeatures

## Übersicht

Der Besucherzähler wurde mit mehreren Sicherheitsebenen ausgestattet, um Manipulation zu verhindern und die Robustheit zu verbessern.

## Implementierte Sicherheitsfeatures

### 1. Browser-Fingerprinting 🔐

**Was ist das?**
- Eindeutige Identifikation jedes Browsers basierend auf technischen Eigenschaften
- Canvas-Rendering, User-Agent, Sprache, Zeitzone, Bildschirmauflösung

**Vorteile:**
- Erschwert das Manipulieren durch wiederholtes Löschen von LocalStorage
- Ermöglicht Rate Limiting pro Browser

**Implementierung:**
- `generateBrowserFingerprint()` in `app-main.js:17710`
- Fingerprint wird im LocalStorage gespeichert
- Wird mit jeder Server-Anfrage mitgeschickt

### 2. Rate Limiting ⏱️

**Was ist das?**
- Begrenzung: Max 10 neue Besucher-IDs pro Stunde pro Fingerprint
- Automatisches Zurücksetzen nach 1 Stunde
- Permanentes Blocken bei verdächtigen Aktivitäten möglich

**Wie funktioniert es?**
- `checkRateLimit(fingerprint)` in `Code.gs:110`
- Tracking in eigenem Google Sheet "RateLimit"
- Automatische Bereinigung alter Einträge (>24h)

**Schutz gegen:**
- Bot-Attacken
- Künstliches Hochtreiben des Counters
- DoS-Angriffe

### 3. Security Logging 📝

**Was wird geloggt?**
- Neue Besucher-ID Zuweisungen
- Rate Limit Überschreitungen
- Geblockte Anfragen
- Fehler und Exceptions

**Wo?**
- Eigenes Google Sheet "SecurityLog"
- Automatische Rotation: Max 1000 Einträge

**Log-Einträge enthalten:**
- Timestamp
- Event-Typ
- Browser-Fingerprint
- Besucher-ID (falls vorhanden)
- Details

### 4. LocalStorage Backup 💾

**Was ist das?**
- Lokale Speicherung der Gesamtbesucherzahl
- Cache-Gültigkeit: 5 Minuten
- Fallback bei Server-Ausfall

**Vorteile:**
- Funktioniert auch offline
- Reduziert Server-Last
- Schnellere Ladezeiten

**Implementierung:**
- `getCachedTotalVisitors()` in `app-main.js:17753`
- `setCachedTotalVisitors()` in `app-main.js:17764`

### 5. Retry Logic mit Exponential Backoff 🔄

**Was ist das?**
- Automatische Wiederholungsversuche bei Netzwerkfehlern
- 3 Versuche mit steigenden Wartezeiten: 1s, 2s, 4s
- 10 Sekunden Timeout pro Request

**Vorteile:**
- Robustheit bei temporären Netzwerkproblemen
- Verhindert Race Conditions
- Bessere User Experience

**Implementierung:**
- `fetchWithRetry()` in `app-main.js:17772`

## Google Sheets Struktur

Nach dem Update werden folgende Sheets erstellt/erweitert:

### RateLimit Sheet
| Fingerprint | LastRequest | RequestCount | Blocked |
|-------------|-------------|--------------|---------|
| FP123abc... | 2025-12-16T... | 3 | FALSE |

### SecurityLog Sheet
| Timestamp | Event | Fingerprint | VisitorID | Details |
|-----------|-------|-------------|-----------|---------|
| 2025-12-16T... | NEW_VISITOR_ID | FP123... | 1234 | ID assigned |
| 2025-12-16T... | RATE_LIMIT_EXCEEDED | FP456... | - | 10 requests in last hour |

## API-Änderungen

### Neue Parameter

**getVisitorId:**
```
GET ?action=getVisitorId&fp=FP123abc...
```

**getStats:**
```
GET ?action=getStats&fp=FP123abc...
```

**cleanup (neu):**
```
GET ?action=cleanup
```
Bereinigt alte Rate Limit Einträge

## Rate Limit Konfiguration

In `Code.gs:127-128`:
```javascript
const MAX_REQUESTS_PER_HOUR = 10;
const ONE_HOUR = 60 * 60 * 1000;
```

**Anpassbar:**
- Erhöhe `MAX_REQUESTS_PER_HOUR` für mehr Toleranz
- Ändere `ONE_HOUR` für längere/kürzere Zeitfenster

## Cache-Konfiguration

In `app-main.js:17756`:
```javascript
const maxAge = 5 * 60 * 1000; // 5 minutes
```

**Anpassbar:**
- Erhöhe für längeres Caching (weniger Server-Last)
- Verringere für aktuellere Daten

## Monitoring

### SecurityLog überwachen

Achte auf folgende Events:
- `RATE_LIMIT_EXCEEDED`: Häufige Anfragen von einem Fingerprint
- `RATE_LIMIT_DENIED`: Geblockte Anfragen
- `ERROR`: Technische Fehler

### Verdächtige Aktivitäten

Wenn ein Fingerprint auffällig ist:
1. Öffne das RateLimit Sheet
2. Finde die Zeile mit dem Fingerprint
3. Setze "Blocked" auf TRUE
4. Der Fingerprint wird permanent geblockt

## Backup-Strategie

**Empfohlen:**
1. Regelmäßige Google Sheets Backups (automatisch durch Google)
2. Export der Config-Tabelle als CSV
3. Monitoring des SecurityLog

**Wiederherstellung:**
- Counter-Wert ist in Config Sheet gespeichert
- Bei Verlust: Setze `visitorCounter` auf letzten bekannten Wert

## Sicherheitshinweise

⚠️ **Wichtig:**
- Browser-Fingerprinting ist keine 100% sichere Identifikation
- Fortgeschrittene Nutzer können Fingerprints manipulieren
- Kombiniere mit weiteren Sicherheitsmaßnahmen

✅ **Best Practices:**
- Überwache das SecurityLog regelmäßig
- Passe Rate Limits bei Bedarf an
- Führe monatlich `?action=cleanup` aus
- Exportiere wichtige Daten regelmäßig

## Performance

**Optimierungen:**
- Fingerprint-Berechnung nur beim ersten Besuch
- LocalStorage-Cache reduziert Server-Anfragen
- Exponential Backoff verhindert Request-Spam
- Log-Rotation bei 1000 Einträgen

**Overhead:**
- ~50-100ms für Fingerprint-Generierung (einmalig)
- ~10-20ms für Cache-Lookups
- ~50ms für Rate Limit Checks

## Fehlerbehandlung

**Was passiert bei Server-Ausfall?**
1. Retry Logic versucht 3x mit Backoff
2. Falls weiterhin fehlschlägt: Lokale Fallback-ID (Prefix "L")
3. Cached Total Visitors wird verwendet
4. User kann weiter arbeiten

**Was passiert bei Rate Limit Überschreitung?**
1. Server antwortet mit Error-Message
2. Frontend zeigt lokale Fallback-ID
3. Event wird im SecurityLog erfasst
4. Nach 1 Stunde automatisches Reset

## Upgrade-Anleitung

**Für bestehendes Google Apps Script:**

1. Kopiere den neuen Code in Code.gs
2. Deploye neu als Web-App
3. Die neuen Sheets werden automatisch erstellt
4. Alte Daten bleiben erhalten

**Für Frontend:**

1. Die Änderungen in app-main.js sind abwärtskompatibel
2. Alte Browser-Sessions funktionieren weiter
3. Neue Features werden automatisch aktiviert

## Support

Bei Problemen:
1. Prüfe das SecurityLog Sheet
2. Prüfe die Browser-Konsole (F12)
3. Teste mit `?action=getStats` ob Server erreichbar ist
4. Prüfe Rate Limit Status im RateLimit Sheet
