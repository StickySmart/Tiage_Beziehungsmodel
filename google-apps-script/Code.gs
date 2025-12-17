/**
 * TIAGE Kommentar-System - Google Apps Script
 *
 * Dieses Script empfängt Kommentare und speichert sie in Google Sheets.
 * Es verwaltet auch einen globalen Besucher-Zähler.
 *
 * @version 2.0.0
 * @date 2025-12-17
 * @lastUpdate 2025-12-17 04:32 AM
 *
 * CHANGELOG v2.0.0:
 * - Browser-Fingerprinting für eindeutige Identifikation
 * - Rate Limiting (max 10 Requests/Stunde pro Fingerprint)
 * - Security Logging (alle Events werden geloggt)
 * - Automatische Bereinigung alter Rate Limit Einträge
 * - Neue Sheets: RateLimit, SecurityLog
 *
 * SETUP:
 * 1. Erstelle ein neues Google Sheet
 * 2. Gehe zu Erweiterungen > Apps Script
 * 3. Kopiere diesen Code in Code.gs
 * 4. Deploye als Web-App (Ausführen als: Ich, Zugriff: Jeder)
 * 5. Kopiere die Web-App URL in dein HTML
 * 6. Führe testInit() aus um die Sheets zu initialisieren
 */

// ============================================================================
// VERSION INFO - Beim Deployen prüfen!
// ============================================================================
const SCRIPT_VERSION = '2.0.0';
const SCRIPT_DATE = '2025-12-17';
const SCRIPT_FEATURES = [
  'Browser Fingerprinting',
  'Rate Limiting (10/hour)',
  'Security Logging',
  'Visitor Counter',
  'Comment System'
];

// ============================================================================
// SHEET CONFIGURATION
// ============================================================================

// Sheet-Namen
const COMMENTS_SHEET = 'Kommentare';
const VISITORS_SHEET = 'Besucher';
const CONFIG_SHEET = 'Config';
const RATE_LIMIT_SHEET = 'RateLimit';
const SECURITY_LOG_SHEET = 'SecurityLog';

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

  // Rate Limit Sheet
  let rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET);
  if (!rateLimitSheet) {
    rateLimitSheet = ss.insertSheet(RATE_LIMIT_SHEET);
    rateLimitSheet.appendRow(['Fingerprint', 'LastRequest', 'RequestCount', 'Blocked']);
    rateLimitSheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }

  // Security Log Sheet
  let securityLogSheet = ss.getSheetByName(SECURITY_LOG_SHEET);
  if (!securityLogSheet) {
    securityLogSheet = ss.insertSheet(SECURITY_LOG_SHEET);
    securityLogSheet.appendRow(['Timestamp', 'Event', 'Fingerprint', 'VisitorID', 'Details']);
    securityLogSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }

  return ss;
}

/**
 * Security Logging
 */
function logSecurityEvent(event, fingerprint, visitorId, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logSheet = ss.getSheetByName(SECURITY_LOG_SHEET);

    if (!logSheet) {
      initializeSheets();
      logSheet = ss.getSheetByName(SECURITY_LOG_SHEET);
    }

    logSheet.appendRow([
      new Date().toISOString(),
      event,
      fingerprint || 'N/A',
      visitorId || 'N/A',
      details || ''
    ]);

    // Keep only last 1000 entries to avoid sheet bloat
    const lastRow = logSheet.getLastRow();
    if (lastRow > 1001) {
      logSheet.deleteRows(2, lastRow - 1001);
    }
  } catch (e) {
    // Don't fail the request if logging fails
    console.log('Logging error:', e.message);
  }
}

/**
 * Rate Limiting: Check if fingerprint is allowed to make request
 * Returns { allowed: true/false, reason: string }
 */
function checkRateLimit(fingerprint) {
  if (!fingerprint) {
    return { allowed: true, reason: 'No fingerprint provided' };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET);

  if (!rateLimitSheet) {
    initializeSheets();
    rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET);
  }

  const now = new Date().getTime();
  const data = rateLimitSheet.getDataRange().getValues();

  // Rate limit: max 10 requests per hour per fingerprint for new IDs
  const MAX_REQUESTS_PER_HOUR = 10;
  const ONE_HOUR = 60 * 60 * 1000;

  // Find existing fingerprint
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === fingerprint) {
      const lastRequest = new Date(data[i][1]).getTime();
      const requestCount = parseInt(data[i][2]) || 0;
      const isBlocked = data[i][3] === true || data[i][3] === 'TRUE';

      // Check if blocked
      if (isBlocked) {
        logSecurityEvent('RATE_LIMIT_BLOCKED', fingerprint, null, 'Permanently blocked');
        return { allowed: false, reason: 'Blocked due to suspicious activity' };
      }

      // Reset counter if more than 1 hour passed
      if (now - lastRequest > ONE_HOUR) {
        rateLimitSheet.getRange(i + 1, 2).setValue(new Date().toISOString());
        rateLimitSheet.getRange(i + 1, 3).setValue(1);
        return { allowed: true, reason: 'Rate limit reset' };
      }

      // Check if over limit
      if (requestCount >= MAX_REQUESTS_PER_HOUR) {
        logSecurityEvent('RATE_LIMIT_EXCEEDED', fingerprint, null, `${requestCount} requests in last hour`);
        return { allowed: false, reason: 'Rate limit exceeded (max 10 per hour)' };
      }

      // Increment counter
      rateLimitSheet.getRange(i + 1, 2).setValue(new Date().toISOString());
      rateLimitSheet.getRange(i + 1, 3).setValue(requestCount + 1);

      return { allowed: true, reason: `Request ${requestCount + 1}/${MAX_REQUESTS_PER_HOUR}` };
    }
  }

  // New fingerprint - add to tracking
  rateLimitSheet.appendRow([fingerprint, new Date().toISOString(), 1, false]);
  return { allowed: true, reason: 'New fingerprint registered' };
}

/**
 * Clean up old rate limit entries (older than 24 hours)
 */
function cleanupRateLimits() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET);

  if (!rateLimitSheet) return;

  const now = new Date().getTime();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const data = rateLimitSheet.getDataRange().getValues();

  // Delete rows from bottom to top to avoid index issues
  for (let i = data.length - 1; i >= 1; i--) {
    const lastRequest = new Date(data[i][1]).getTime();
    const isBlocked = data[i][3] === true || data[i][3] === 'TRUE';

    // Keep blocked entries, delete old non-blocked entries
    if (!isBlocked && (now - lastRequest > ONE_DAY)) {
      rateLimitSheet.deleteRow(i + 1);
    }
  }
}

/**
 * Holt den nächsten Besucher-Zähler und erhöht ihn
 */
function getNextVisitorId(fingerprint) {
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
    logSecurityEvent('NEW_VISITOR_ID', fingerprint, '1', 'Counter initialized');
    return '1';
  }

  // Erhöhe den Zähler
  const newValue = currentValue + 1;
  configSheet.getRange(counterRow, 2).setValue(newValue);

  // Log new visitor ID assignment
  logSecurityEvent('NEW_VISITOR_ID', fingerprint, currentValue.toString(), 'ID assigned');

  return currentValue.toString();
}

/**
 * Holt die aktuelle Gesamtzahl der Besucher (ohne zu erhöhen)
 */
function getTotalVisitors() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let configSheet = ss.getSheetByName(CONFIG_SHEET);

  if (!configSheet) {
    return 0;
  }

  const data = configSheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === 'visitorCounter') {
      // Counter zeigt auf nächste ID, also -1 für vergebene IDs
      return (parseInt(data[i][1]) || 1) - 1;
    }
  }
  return 0;
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
    const fingerprint = e.parameter.fp || null;

    if (action === 'getComments') {
      const comments = getAllComments();
      return ContentService.createTextOutput(JSON.stringify(comments))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'getVisitorId') {
      // Check rate limit for new visitor ID requests
      const rateLimitCheck = checkRateLimit(fingerprint);

      if (!rateLimitCheck.allowed) {
        logSecurityEvent('RATE_LIMIT_DENIED', fingerprint, null, rateLimitCheck.reason);
        return ContentService.createTextOutput(JSON.stringify({
          error: 'Rate limit exceeded',
          message: rateLimitCheck.reason
        }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const newId = getNextVisitorId(fingerprint);
      const total = getTotalVisitors();
      return ContentService.createTextOutput(JSON.stringify({ visitorId: newId, totalVisitors: total }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'getStats') {
      const total = getTotalVisitors();
      return ContentService.createTextOutput(JSON.stringify({ totalVisitors: total }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'cleanup') {
      // Manual cleanup trigger (can be called periodically)
      cleanupRateLimits();
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Cleanup completed' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'version') {
      // Return script version info
      const versionInfo = getScriptVersion();
      return ContentService.createTextOutput(JSON.stringify(versionInfo))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Standard: Alle Kommentare zurückgeben
    const comments = getAllComments();
    return ContentService.createTextOutput(JSON.stringify(comments))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    logSecurityEvent('ERROR', null, null, error.message);
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Gibt die Script-Version zurück
 * Kann via API aufgerufen werden: ?action=version
 */
function getScriptVersion() {
  return {
    version: SCRIPT_VERSION,
    date: SCRIPT_DATE,
    features: SCRIPT_FEATURES,
    lastUpdate: '2025-12-17 04:32 AM'
  };
}

/**
 * Test-Funktion zum manuellen Initialisieren
 */
function testInit() {
  initializeSheets();
  Logger.log('Sheets initialized!');
  Logger.log('Version: ' + SCRIPT_VERSION);
  Logger.log('Date: ' + SCRIPT_DATE);
}
