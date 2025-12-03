# Google Sheets Kommentar-System Setup

## Schnell-Anleitung

### 1. Google Sheet erstellen
- Gehe zu [Google Sheets](https://sheets.google.com)
- Erstelle ein neues leeres Sheet
- Benenne es z.B. "TIAGE Kommentare"

### 2. Apps Script öffnen
- Im Sheet: **Erweiterungen** > **Apps Script**
- Lösche den Beispielcode
- Kopiere den Inhalt von `Code.gs` hierher
- Speichern (Ctrl+S)

### 3. Deployen
1. Klicke **Bereitstellen** > **Neue Bereitstellung**
2. Klicke das Zahnrad > **Web-App**
3. Konfiguriere:
   - **Beschreibung**: "TIAGE Kommentare"
   - **Ausführen als**: Ich
   - **Zugriff**: Jeder
4. Klicke **Bereitstellen**
5. **Autorisiere** den Zugriff (Google Account)
6. **Kopiere die Web-App URL**

### 4. URL eintragen
In `archetype-interaction.html` (Zeile ~57):
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/DEINE_ID/exec';
```

## Sheet-Struktur

Das Script erstellt automatisch 3 Sheets:

| Sheet | Inhalt |
|-------|--------|
| **Kommentare** | Alle Kommentare mit ID, Besucher-Nr, Name, Text, etc. |
| **Besucher** | Liste aller Besucher mit Nummer und Kommentar-Anzahl |
| **Config** | Besucher-Zähler (startet bei 1000) |

## Test

Nach dem Setup kannst du einen Test-Kommentar abschicken. Er sollte im Google Sheet erscheinen.

## Fehlerbehebung

**"Zugriff verweigert"**: Stelle sicher, dass "Zugriff: Jeder" gewählt ist.

**Kommentare erscheinen nicht**: Prüfe die Browser-Konsole (F12) auf Fehler.

**"Script-Funktion nicht gefunden"**: Speichere das Script und deploye erneut.
