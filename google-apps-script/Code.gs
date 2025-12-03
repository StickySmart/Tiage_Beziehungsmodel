/**
 * TIAGE Kommentar-System - Google Apps Script
 *
 * Dieses Script empfängt Kommentare und speichert sie in Google Sheets.
 * Es verwaltet auch einen globalen Besucher-Zähler.
 *
 * SETUP:
 * 1. Erstelle ein neues Google Sheet
 * 2. Gehe zu Erweiterungen > Apps Script
 * 3. Kopiere diesen Code in Code.gs
 * 4. Deploye als Web-App (Ausführen als: Ich, Zugriff: Jeder)
 * 5. Kopiere die Web-App URL in dein HTML
 */

// Sheet-Namen
const COMMENTS_SHEET = 'Kommentare';
const VISITORS_SHEET = 'Besucher';
const CONFIG_SHEET = 'Config';

/**
 * Initialisiert die Sheets beim ersten Aufruf
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Kommentare Sheet
  let commentsSheet = ss.getSheetByName(COMMENTS_SHEET);
  if (!commentsSheet) {
    commentsSheet = ss.insertSheet(COMMENTS_SHEET);
    commentsSheet.appendRow([
      'ID', 'VisitorID', 'Name', 'Typ', 'Kommentar', 'Timestamp', 'Page', 'AntwortAuf'
    ]);
    commentsSheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  }

  // Besucher Sheet
  let visitorsSheet = ss.getSheetByName(VISITORS_SHEET);
  if (!visitorsSheet) {
    visitorsSheet = ss.insertSheet(VISITORS_SHEET);
    visitorsSheet.appendRow(['VisitorID', 'Erstellt', 'Letzter Besuch', 'Kommentare']);
    visitorsSheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }

  // Config Sheet für Zähler
  let configSheet = ss.getSheetByName(CONFIG_SHEET);
  if (!configSheet) {
    configSheet = ss.insertSheet(CONFIG_SHEET);
    configSheet.appendRow(['Key', 'Value']);
    configSheet.appendRow(['visitorCounter', '1']); // Start bei 1
    configSheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  }

  return ss;
}

/**
 * Holt den nächsten Besucher-Zähler und erhöht ihn
 */
function getNextVisitorId() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let configSheet = ss.getSheetByName(CONFIG_SHEET);

  if (!configSheet) {
    initializeSheets();
    configSheet = ss.getSheetByName(CONFIG_SHEET);
  }

  // Finde die Zeile mit visitorCounter
  const data = configSheet.getDataRange().getValues();
  let counterRow = -1;
  let currentValue = 1;

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === 'visitorCounter') {
      counterRow = i + 1;
      currentValue = parseInt(data[i][1]) || 1;
      break;
    }
  }

  if (counterRow === -1) {
    configSheet.appendRow(['visitorCounter', '2']);
    return '1';
  }

  // Erhöhe den Zähler
  const newValue = currentValue + 1;
  configSheet.getRange(counterRow, 2).setValue(newValue);

  return currentValue.toString();
}

/**
 * Registriert einen neuen Besucher oder aktualisiert den letzten Besuch
 */
function registerVisitor(visitorId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let visitorsSheet = ss.getSheetByName(VISITORS_SHEET);

  if (!visitorsSheet) {
    initializeSheets();
    visitorsSheet = ss.getSheetByName(VISITORS_SHEET);
  }

  const now = new Date().toISOString();
  const data = visitorsSheet.getDataRange().getValues();

  // Suche nach existierendem Besucher
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === visitorId) {
      // Update letzter Besuch
      visitorsSheet.getRange(i + 1, 3).setValue(now);
      return;
    }
  }

  // Neuer Besucher
  visitorsSheet.appendRow([visitorId, now, now, 0]);
}

/**
 * Speichert einen Kommentar
 */
function saveComment(commentData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let commentsSheet = ss.getSheetByName(COMMENTS_SHEET);

  if (!commentsSheet) {
    initializeSheets();
    commentsSheet = ss.getSheetByName(COMMENTS_SHEET);
  }

  const row = [
    commentData.id || '',
    commentData.visitorId || '',
    commentData.name || commentData.Name || 'Anonym',
    commentData.kommentarTyp || commentData.typ || commentData.type || 'comment',
    commentData.kommentar || commentData.text || '',
    commentData.timestamp || new Date().toISOString(),
    commentData.page || '',
    commentData.replyTo || commentData.antwortAuf || ''
  ];

  commentsSheet.appendRow(row);

  // Update Kommentar-Zähler für Besucher
  if (commentData.visitorId) {
    updateVisitorCommentCount(commentData.visitorId);
  }

  return { success: true, id: commentData.id };
}

/**
 * Aktualisiert den Kommentar-Zähler eines Besuchers
 */
function updateVisitorCommentCount(visitorId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const visitorsSheet = ss.getSheetByName(VISITORS_SHEET);

  if (!visitorsSheet) return;

  const data = visitorsSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === visitorId) {
      const currentCount = parseInt(data[i][3]) || 0;
      visitorsSheet.getRange(i + 1, 4).setValue(currentCount + 1);
      return;
    }
  }
}

/**
 * Lädt alle Kommentare (für Anzeige)
 */
function getAllComments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const commentsSheet = ss.getSheetByName(COMMENTS_SHEET);

  if (!commentsSheet) {
    return [];
  }

  const data = commentsSheet.getDataRange().getValues();
  const comments = [];

  // Überspringe Header-Zeile
  for (let i = 1; i < data.length; i++) {
    comments.push({
      id: data[i][0],
      visitorId: data[i][1],
      name: data[i][2],
      typ: data[i][3],
      kommentar: data[i][4],
      timestamp: data[i][5],
      page: data[i][6],
      antwortAuf: data[i][7]
    });
  }

  return comments;
}

/**
 * HTTP POST Handler - empfängt Kommentare
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Registriere Besucher
    if (data.visitorId) {
      registerVisitor(data.visitorId);
    }

    // Speichere Kommentar
    if (data.type === 'comment' || data.kommentar || data.text) {
      const result = saveComment(data);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Neue Besucher-ID anfordern
    if (data.action === 'getVisitorId') {
      const newId = getNextVisitorId();
      return ContentService.createTextOutput(JSON.stringify({ visitorId: newId }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * HTTP GET Handler - lädt Kommentare
 */
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getComments') {
      const comments = getAllComments();
      return ContentService.createTextOutput(JSON.stringify(comments))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'getVisitorId') {
      const newId = getNextVisitorId();
      return ContentService.createTextOutput(JSON.stringify({ visitorId: newId }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Standard: Alle Kommentare zurückgeben
    const comments = getAllComments();
    return ContentService.createTextOutput(JSON.stringify(comments))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test-Funktion zum manuellen Initialisieren
 */
function testInit() {
  initializeSheets();
  Logger.log('Sheets initialized!');
}
