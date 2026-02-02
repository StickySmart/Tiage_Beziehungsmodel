/**
 * COMMENT MODAL MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet das Kommentar-Modal und die Kommentarliste.
 *
 * Funktionen:
 * - Kommentar schreiben (mit Rate-Limiting)
 * - Kommentarliste anzeigen
 * - Suche in Kommentaren
 * - Antworten auf Kommentare
 *
 * Abhängigkeiten:
 * - GOOGLE_SCRIPT_URL (global constant)
 * - localStorage
 * - currentMobilePage (from app-main.js)
 *
 * @module TiageModals.Comment
 */

var TiageModals = TiageModals || {};

TiageModals.Comment = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    const COMMENT_COOLDOWN_MS = 30000; // 30 seconds between comments

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let allCommentsData = [];
    let currentSearchQuery = '';

    // ═══════════════════════════════════════════════════════════════════════
    // RATE LIMITING
    // ═══════════════════════════════════════════════════════════════════════

    function canSubmitComment() {
        const lastSubmit = localStorage.getItem('tiage_last_comment_time');
        if (!lastSubmit) return { allowed: true };

        const elapsed = Date.now() - parseInt(lastSubmit);
        if (elapsed >= COMMENT_COOLDOWN_MS) {
            return { allowed: true };
        }

        const remaining = Math.ceil((COMMENT_COOLDOWN_MS - elapsed) / 1000);
        return { allowed: false, secondsRemaining: remaining };
    }

    function recordCommentSubmission() {
        localStorage.setItem('tiage_last_comment_time', Date.now().toString());
    }

    // ═══════════════════════════════════════════════════════════════════════
    // VISITOR ID HELPER
    // ═══════════════════════════════════════════════════════════════════════

    function getOrCreateVisitorId() {
        return localStorage.getItem('tiage_visitor_id') || null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // COMMENT MODAL
    // ═══════════════════════════════════════════════════════════════════════

    function openCommentModal() {
        const modal = document.getElementById('commentModal');
        if (!modal) return;

        modal.classList.add('active');

        // Pre-fill name field with visitor number
        const visitorId = localStorage.getItem('tiage_visitor_id');
        const nameField = document.getElementById('commentName');
        if (visitorId && nameField) {
            nameField.value = '#' + visitorId;
        }

        // Push state for back button to close modal
        const currentPage = window.currentMobilePage || 1;
        history.pushState({ mobilePage: currentPage, modal: 'comment' }, '', `#seite${currentPage}-comment`);
    }

    function closeCommentModal(event, skipHistoryBack = false) {
        if (event && event.target !== event.currentTarget) return;

        const modal = document.getElementById('commentModal');
        if (modal) {
            modal.classList.remove('active');
        }

        // Reset form
        const textField = document.getElementById('commentText');
        if (textField) {
            textField.value = '';
        }

        // Go back in history if not triggered by back button
        if (!skipHistoryBack && history.state && history.state.modal === 'comment') {
            history.back();
        }
    }

    async function submitComment() {
        const nameField = document.getElementById('commentName');
        const textField = document.getElementById('commentText');
        const submitBtn = document.getElementById('commentSubmitBtn');

        const name = nameField?.value.trim() || '';
        const typ = 'feedback'; // Default type since dropdown removed
        const text = textField?.value.trim() || '';

        // Rate limiting check
        const rateCheck = canSubmitComment();
        if (!rateCheck.allowed) {
            alert(`Bitte warte noch ${rateCheck.secondsRemaining} Sekunden bevor du einen weiteren Kommentar sendest.`);
            return;
        }

        // Validation
        if (!name) {
            alert('Bitte gib deinen Namen/Kürzel ein.');
            return;
        }
        if (name.length > 50) {
            alert('Name darf maximal 50 Zeichen haben.');
            return;
        }
        if (!text) {
            alert('Bitte schreibe einen Kommentar.');
            return;
        }
        if (text.length > 2000) {
            alert('Kommentar darf maximal 2000 Zeichen haben.');
            return;
        }

        // Get visitor ID
        const visitorId = getOrCreateVisitorId();

        const commentEntry = {
            type: 'comment',  // Wichtig für das Google Script
            id: 'com_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            visitorId: visitorId,
            name: name,
            kommentarTyp: typ,
            kommentar: text,
            timestamp: new Date().toISOString(),
            page: 'hilfe-modal'
        };

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sende...';
        }

        try {
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(commentEntry)
                });
            }

            // Also save locally as backup
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            stored.unshift(commentEntry);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));

            // Record submission time for rate limiting
            recordCommentSubmission();

            alert('Danke für deinen Kommentar!');
            closeCommentModal();

        } catch (error) {
            console.error('Comment error:', error);
            // Save locally on error
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            stored.unshift(commentEntry);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));
            recordCommentSubmission();
            alert('Kommentar lokal gespeichert. (Server nicht erreichbar)');
            closeCommentModal();
        }

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Absenden';
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // COMMENTS LIST MODAL
    // ═══════════════════════════════════════════════════════════════════════

    function openCommentsListModal() {
        console.log('openCommentsListModal called');
        const modal = document.getElementById('commentsListModal');
        if (modal) {
            modal.classList.add('active');
        }
        document.body.style.overflow = 'hidden';

        // Reset search field
        const searchInput = document.getElementById('commentsSearchInput');
        if (searchInput) searchInput.value = '';
        currentSearchQuery = '';
        const clearBtn = document.getElementById('commentsSearchClear');
        if (clearBtn) clearBtn.classList.remove('visible');
        const resultsDiv = document.getElementById('commentsSearchResults');
        if (resultsDiv) resultsDiv.style.display = 'none';

        loadAllComments();
    }

    function closeCommentsListModal(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('commentsListModal');
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    async function loadAllComments() {
        const container = document.getElementById('commentsListBody');
        if (!container) return;

        container.innerHTML = '<div class="no-comments"><div class="no-comments-icon">⏳</div><p>Lade Kommentare...</p></div>';

        try {
            // Load from localStorage - nur eine Quelle: tiage_comments
            const localComments = JSON.parse(localStorage.getItem('tiage_comments') || '[]');

            // Deduplizierung basierend auf Name + Titel + Text
            const seen = new Set();
            const getUniqueKey = (item) => {
                const name = (item.Name || item.name || '').toLowerCase().trim();
                const titel = (item.Titel || item.titel || '').toLowerCase().trim();
                const text = (item.Kommentar || item.kommentar || item.text || item.comment || '').toLowerCase().trim();
                return `${name}|${titel}|${text}`;
            };

            allCommentsData = [];

            // Add local comments
            localComments.forEach(item => {
                const key = getUniqueKey(item);
                if (!seen.has(key)) {
                    seen.add(key);
                    allCommentsData.push(item);
                }
            });

            // Try to load from server if available
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                try {
                    const response = await fetch(GOOGLE_SCRIPT_URL);
                    const serverData = await response.json();
                    // Merge server data (avoiding duplicates)
                    serverData.forEach(item => {
                        const key = getUniqueKey(item);
                        if (!seen.has(key)) {
                            seen.add(key);
                            allCommentsData.push(item);
                        }
                    });
                } catch (e) {
                    console.log('Server not available, using local data only');
                }
            }

            // Sort by date (newest first)
            allCommentsData.sort((a, b) => {
                const dateA = new Date(a.timestamp || a.Timestamp || a.datum || 0);
                const dateB = new Date(b.timestamp || b.Timestamp || b.datum || 0);
                return dateB - dateA;
            });

            renderCommentsList();
        } catch (error) {
            console.error('Error loading comments:', error);
            container.innerHTML = '<div class="no-comments"><div class="no-comments-icon">❌</div><p>Fehler beim Laden der Kommentare</p></div>';
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // RENDER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function renderCommentsList() {
        const container = document.getElementById('commentsListBody');
        if (!container) return;

        if (allCommentsData.length === 0) {
            container.innerHTML = `
                <div class="no-comments">
                    <div class="no-comments-icon">💬</div>
                    <p>Noch keine Kommentare vorhanden.</p>
                    <p style="font-size: 12px; margin-top: 10px;">Sei der Erste, der einen Kommentar hinterlässt!</p>
                </div>
            `;
            return;
        }

        // Separate main comments from replies
        const mainComments = allCommentsData.filter(c => !(c.AntwortAuf || c.antwortAuf || c.replyTo));
        const replies = allCommentsData.filter(c => (c.AntwortAuf || c.antwortAuf || c.replyTo));

        let html = '';

        mainComments.forEach((comment, index) => {
            const id = comment.id || comment.ID || `comment-${index}`;
            const name = comment.Name || comment.name || 'Anonym';
            const visitorId = comment.visitorId || comment.VisitorId || '';
            const titel = comment.Titel || comment.titel || comment.type || '';
            const text = comment.Kommentar || comment.kommentar || comment.text || comment.comment || '';
            const kontext = comment.KontextID || comment.kontextId || comment.context || '';
            const typ = comment.Typ || comment.typ || comment.kommentarTyp || comment.type || 'comment';
            const timestamp = comment.timestamp || comment.Timestamp || comment.datum;
            const date = timestamp ? formatCommentDate(timestamp) : '';

            // Find replies to this comment
            const commentReplies = replies.filter(r =>
                (r.AntwortAuf || r.antwortAuf || r.replyTo) === id
            );

            html += `
                <div class="comment-card" data-id="${id}">
                    <div class="comment-card-header">
                        <div>
                            <span class="comment-author">${escapeHtml(name)}</span>
                            ${visitorId ? `<span class="comment-visitor-id">#${escapeHtml(visitorId)}</span>` : ''}
                            <span class="comment-date">${date}</span>
                        </div>
                        <span class="comment-type-badge type-${typ || 'comment'}">${getTypeBadge(typ)}</span>
                    </div>
                    <div class="comment-card-body">
                        ${titel ? `<div class="comment-title">${escapeHtml(titel)}</div>` : ''}
                        <div class="comment-text">${escapeHtml(text)}</div>
                        ${kontext ? `<div class="comment-context">📍 Kontext: ${escapeHtml(kontext)}</div>` : ''}
                    </div>
                    ${commentReplies.length > 0 ? renderReplies(commentReplies) : ''}
                    <div class="comment-card-footer">
                        <span style="font-size: 11px; color: var(--text-muted);">${commentReplies.length} Antwort${commentReplies.length !== 1 ? 'en' : ''}</span>
                        <button class="reply-btn" onclick="TiageModals.Comment.toggleReplyForm('${id}')">↩ Antworten</button>
                    </div>
                    <div class="reply-form" id="reply-form-${id}">
                        <input type="text" id="reply-name-${id}" placeholder="Dein Name" style="width: 100%; padding: 8px; margin-bottom: 10px; background: var(--bg-dark); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                        <textarea id="reply-text-${id}" placeholder="Deine Antwort..."></textarea>
                        <div class="reply-form-buttons">
                            <button class="reply-cancel-btn" onclick="TiageModals.Comment.toggleReplyForm('${id}')">Abbrechen</button>
                            <button class="reply-submit-btn" onclick="TiageModals.Comment.submitReply('${id}')">Antworten</button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    function renderReplies(replies) {
        let html = '<div class="replies-section">';
        replies.forEach(reply => {
            const name = reply.Name || reply.name || 'Anonym';
            const text = reply.Kommentar || reply.kommentar || reply.text || '';
            const timestamp = reply.timestamp || reply.Timestamp;
            const date = timestamp ? formatCommentDate(timestamp) : '';

            html += `
                <div class="reply-card">
                    <div class="reply-header">
                        <span class="reply-author">${escapeHtml(name)}</span>
                        <span class="reply-date">${date}</span>
                    </div>
                    <div class="reply-text">${escapeHtml(text)}</div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SEARCH FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function wildcardToRegex(pattern) {
        const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
        const regex = escaped.replace(/\*/g, '.*');
        return new RegExp(regex, 'i');
    }

    function commentMatchesSearch(comment, query) {
        if (!query || query.trim() === '') return true;

        const searchPattern = wildcardToRegex(query.trim());

        const name = comment.Name || comment.name || '';
        const titel = comment.Titel || comment.titel || comment.type || '';
        const text = comment.Kommentar || comment.kommentar || comment.text || comment.comment || '';
        const kontext = comment.KontextID || comment.kontextId || comment.context || '';
        const typ = comment.Typ || comment.typ || comment.kommentarTyp || comment.type || 'comment';
        const typLabel = getTypeBadge(typ);

        return searchPattern.test(name) ||
               searchPattern.test(titel) ||
               searchPattern.test(text) ||
               searchPattern.test(kontext) ||
               searchPattern.test(typ) ||
               searchPattern.test(typLabel);
    }

    function filterComments(query) {
        currentSearchQuery = query;

        const clearBtn = document.getElementById('commentsSearchClear');
        if (clearBtn) {
            clearBtn.classList.toggle('visible', query.length > 0);
        }

        renderFilteredComments();
    }

    function clearCommentsSearch() {
        const input = document.getElementById('commentsSearchInput');
        if (input) {
            input.value = '';
        }
        currentSearchQuery = '';

        const clearBtn = document.getElementById('commentsSearchClear');
        if (clearBtn) {
            clearBtn.classList.remove('visible');
        }

        const resultsDiv = document.getElementById('commentsSearchResults');
        if (resultsDiv) {
            resultsDiv.style.display = 'none';
        }

        renderCommentsList();
    }

    function renderFilteredComments() {
        const container = document.getElementById('commentsListBody');
        const resultsDiv = document.getElementById('commentsSearchResults');
        if (!container) return;

        if (!currentSearchQuery || currentSearchQuery.trim() === '') {
            if (resultsDiv) resultsDiv.style.display = 'none';
            renderCommentsList();
            return;
        }

        const filteredComments = allCommentsData.filter(c => commentMatchesSearch(c, currentSearchQuery));

        if (resultsDiv) {
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = `${filteredComments.length} von ${allCommentsData.length} Kommentare${filteredComments.length !== 1 ? 'n' : ''} gefunden`;
        }

        if (filteredComments.length === 0) {
            container.innerHTML = `
                <div class="no-comments">
                    <div class="no-comments-icon">🔍</div>
                    <p>Keine Kommentare gefunden.</p>
                    <p style="font-size: 12px; margin-top: 10px;">Versuche einen anderen Suchbegriff oder verwende * als Platzhalter.</p>
                </div>
            `;
            return;
        }

        // Separate main comments from replies
        const mainComments = filteredComments.filter(c => !(c.AntwortAuf || c.antwortAuf || c.replyTo));
        const allReplies = allCommentsData.filter(c => (c.AntwortAuf || c.antwortAuf || c.replyTo));

        let html = '';

        mainComments.forEach((comment, index) => {
            const id = comment.id || comment.ID || `comment-${index}`;
            const name = comment.Name || comment.name || 'Anonym';
            const titel = comment.Titel || comment.titel || comment.type || '';
            const text = comment.Kommentar || comment.kommentar || comment.text || comment.comment || '';
            const kontext = comment.KontextID || comment.kontextId || comment.context || '';
            const typ = comment.Typ || comment.typ || comment.kommentarTyp || comment.type || 'comment';
            const timestamp = comment.timestamp || comment.Timestamp || comment.datum;
            const date = timestamp ? formatCommentDate(timestamp) : '';

            const commentReplies = allReplies.filter(r =>
                (r.AntwortAuf || r.antwortAuf || r.replyTo) === id
            );

            html += `
                <div class="comment-card" data-id="${id}">
                    <div class="comment-card-header">
                        <div>
                            <span class="comment-author">${highlightMatch(escapeHtml(name), currentSearchQuery)}</span>
                            <span class="comment-date">${date}</span>
                        </div>
                        <span class="comment-type-badge type-${typ || 'comment'}">${getTypeBadge(typ)}</span>
                    </div>
                    <div class="comment-card-body">
                        ${titel ? `<div class="comment-title">${highlightMatch(escapeHtml(titel), currentSearchQuery)}</div>` : ''}
                        <div class="comment-text">${highlightMatch(escapeHtml(text), currentSearchQuery)}</div>
                        ${kontext ? `<div class="comment-context">📍 Kontext: ${highlightMatch(escapeHtml(kontext), currentSearchQuery)}</div>` : ''}
                    </div>
                    ${commentReplies.length > 0 ? renderRepliesWithHighlight(commentReplies, currentSearchQuery) : ''}
                    <div class="comment-card-footer">
                        <span style="font-size: 11px; color: var(--text-muted);">${commentReplies.length} Antwort${commentReplies.length !== 1 ? 'en' : ''}</span>
                        <button class="reply-btn" onclick="TiageModals.Comment.toggleReplyForm('${id}')">↩ Antworten</button>
                    </div>
                    <div class="reply-form" id="reply-form-${id}">
                        <input type="text" id="reply-name-${id}" placeholder="Dein Name" style="width: 100%; padding: 8px; margin-bottom: 10px; background: var(--bg-dark); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                        <textarea id="reply-text-${id}" placeholder="Deine Antwort..."></textarea>
                        <div class="reply-form-buttons">
                            <button class="reply-cancel-btn" onclick="TiageModals.Comment.toggleReplyForm('${id}')">Abbrechen</button>
                            <button class="reply-submit-btn" onclick="TiageModals.Comment.submitReply('${id}')">Antworten</button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    function highlightMatch(text, query) {
        if (!query || query.trim() === '') return text;

        try {
            const pattern = wildcardToRegex(query.trim());
            return text.replace(pattern, match => `<span class="search-highlight">${match}</span>`);
        } catch (e) {
            return text;
        }
    }

    function renderRepliesWithHighlight(replies, query) {
        let html = '<div class="replies-section">';
        replies.forEach(reply => {
            const name = reply.Name || reply.name || 'Anonym';
            const text = reply.Kommentar || reply.kommentar || reply.text || '';
            const timestamp = reply.timestamp || reply.Timestamp;
            const date = timestamp ? formatCommentDate(timestamp) : '';

            html += `
                <div class="reply-card">
                    <div class="reply-header">
                        <span class="reply-author">${highlightMatch(escapeHtml(name), query)}</span>
                        <span class="reply-date">${date}</span>
                    </div>
                    <div class="reply-text">${highlightMatch(escapeHtml(text), query)}</div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // REPLY FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function toggleReplyForm(commentId) {
        const form = document.getElementById(`reply-form-${commentId}`);
        if (form) {
            form.classList.toggle('active');
        }
    }

    async function submitReply(parentId) {
        const nameInput = document.getElementById(`reply-name-${parentId}`);
        const textInput = document.getElementById(`reply-text-${parentId}`);

        const name = nameInput?.value.trim() || 'Anonym';
        const text = textInput?.value.trim();

        if (!text) {
            alert('Bitte gib eine Antwort ein.');
            return;
        }

        const reply = {
            id: 'reply_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            Name: name,
            Kommentar: text,
            AntwortAuf: parentId,
            timestamp: new Date().toISOString(),
            type: 'antwort'
        };

        try {
            // Save to server
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reply)
                });
            }

            // Save locally
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            stored.unshift(reply);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));

            // Add to current data and re-render
            allCommentsData.unshift(reply);

            // Close reply form and re-render
            toggleReplyForm(parentId);
            renderCommentsList();

            alert('Antwort gesendet!');
        } catch (error) {
            console.error('Reply error:', error);
            // Save locally anyway
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            stored.unshift(reply);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));
            allCommentsData.unshift(reply);
            toggleReplyForm(parentId);
            renderCommentsList();
            alert('Antwort lokal gespeichert.');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function formatCommentDate(timestamp) {
        try {
            const date = new Date(timestamp);
            return date.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return '';
        }
    }

    function getTypeBadge(typ) {
        const types = {
            'frage': 'Frage',
            'feedback': 'Comment',
            'fehler': 'Fehler',
            'verbesserung': 'Vorschlag',
            'doku': 'Doku',
            'antwort': 'Antwort',
            'comment': 'Comment'
        };
        return types[typ] || 'Comment';
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Comment Modal
        open: openCommentModal,
        close: closeCommentModal,
        submit: submitComment,

        // Comments List Modal
        openList: openCommentsListModal,
        closeList: closeCommentsListModal,
        loadAll: loadAllComments,

        // Search
        filter: filterComments,
        clearSearch: clearCommentsSearch,

        // Reply
        toggleReplyForm: toggleReplyForm,
        submitReply: submitReply,

        // Rate limiting
        canSubmit: canSubmitComment,
        recordSubmission: recordCommentSubmission,

        // Helpers (for backwards compatibility)
        formatDate: formatCommentDate,
        getTypeBadge: getTypeBadge,
        escapeHtml: escapeHtml
    };

})();

// ═══════════════════════════════════════════════════════════════════════════
// BACKWARDS COMPATIBILITY - Global function aliases
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    window.TiageModals = window.TiageModals || {};
    window.TiageModals.Comment = TiageModals.Comment;

    // Legacy function names for existing onclick handlers
    window.openCommentModal = TiageModals.Comment.open;
    window.closeCommentModal = TiageModals.Comment.close;
    window.submitComment = TiageModals.Comment.submit;
    window.openCommentsListModal = TiageModals.Comment.openList;
    window.closeCommentsListModal = TiageModals.Comment.closeList;
    window.loadAllComments = TiageModals.Comment.loadAll;
    window.filterComments = TiageModals.Comment.filter;
    window.clearCommentsSearch = TiageModals.Comment.clearSearch;
    window.toggleReplyForm = TiageModals.Comment.toggleReplyForm;
    window.submitReply = TiageModals.Comment.submitReply;
    window.canSubmitComment = TiageModals.Comment.canSubmit;
    window.recordCommentSubmission = TiageModals.Comment.recordSubmission;

    // Helper exports
    window.formatCommentDate = TiageModals.Comment.formatDate;
    window.getTypeBadge = TiageModals.Comment.getTypeBadge;
    // Note: escapeHtml may conflict with other definitions, so not exporting globally
}

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModals.Comment;
}
