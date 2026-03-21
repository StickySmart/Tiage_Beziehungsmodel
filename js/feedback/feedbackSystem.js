/**
 * feedbackSystem.js — Community Feedback / Comment System
 * Extracted from app-main.js v1.8.1024
 *
 * Dependencies (via window.*):
 *   window.tiageData          – loaded JSON data (archetypes map)
 *   window.categoryNames      – category name map
 *   window.initStarRatings    – star rating init (stub in categoryModal.js)
 *   TiageI18n                 – global i18n
 *   GOOGLE_SCRIPT_URL         – global Google Sheets endpoint (optional)
 */
(function() {
    'use strict';

    // ── Module-level state ──────────────────────────────────────────────────
    var feedbackData = [];
    var feedbackFilters = {
        search: '',
        myType: 'all',
        partnerType: 'all',
        category: 'all',
        sort: 'newest'
    };
    var replyToId = null;

function saveLocalFeedback(entry) {
    const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
    entry.timestamp = new Date().toISOString();
    entry.Typ = 'comment';  // Einheitlicher Typ
    stored.unshift(entry);
    localStorage.setItem('tiage_comments', JSON.stringify(stored));
}

function getLocalFeedback() {
    return JSON.parse(localStorage.getItem('tiage_comments') || '[]');
}

// Load and display feedback
async function loadFeedback() {
    const container = document.getElementById('feedbackList');

    try {
        if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
            // Try to load from Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const serverData = await response.json();
            feedbackData = serverData.reverse(); // Newest first
        } else {
            // Use local data only
            feedbackData = getLocalFeedback();
        }
    } catch (error) {
        console.error('Load feedback error:', error);
        // Fallback to local
        feedbackData = getLocalFeedback();
    }

    // Populate type filter dropdowns
    populateTypeFilters();
    renderFeedbackList();
}

// Populate type dropdowns for filters
function populateTypeFilters() {
    const archetypes = Object.values(window.tiageData?.archetypes || {});
    const myTypeSelect = document.getElementById('filterMyType');
    const partnerTypeSelect = document.getElementById('filterPartnerType');

    const options = archetypes.map(a =>
        `<option value="${a.id}">${a.name}</option>`
    ).join('');

    myTypeSelect.innerHTML = `<option value="all">Alle Typen</option>${options}`;
    partnerTypeSelect.innerHTML = `<option value="all">Alle Partner</option>${options}`;
}

function renderFeedbackList() {
    const container = document.getElementById('feedbackList');

    // Apply all filters
    let filtered = feedbackData.filter(f => {
        const kontextId = (f.KontextID || f.kontextId || '').toLowerCase();
        const name = (f.Name || f.name || '').toLowerCase();
        const titel = (f.Titel || f.titel || '').toLowerCase();
        const kommentar = (f.Kommentar || f.kommentar || '').toLowerCase();
        const antwortAuf = f.AntwortAuf || f.antwortAuf || '';

        // Skip replies in main list (they'll be shown as threads)
        if (antwortAuf) return false;

        // Search filter
        if (feedbackFilters.search) {
            const search = feedbackFilters.search.toLowerCase();
            if (!name.includes(search) && !titel.includes(search) && !kommentar.includes(search)) {
                return false;
            }
        }

        // Type filters (parse from context ID like "Single (Ich) mit Duo")
        if (feedbackFilters.myType !== 'all' || feedbackFilters.partnerType !== 'all') {
            const myTypeName = window.tiageData?.archetypes?.[feedbackFilters.myType]?.name?.toLowerCase();
            const partnerTypeName = window.tiageData?.archetypes?.[feedbackFilters.partnerType]?.name?.toLowerCase();

            if (feedbackFilters.myType !== 'all' && myTypeName) {
                if (!kontextId.includes(myTypeName)) return false;
            }
            if (feedbackFilters.partnerType !== 'all' && partnerTypeName) {
                if (!kontextId.includes('mit ' + partnerTypeName)) return false;
            }
        }

        // Category filter
        if (feedbackFilters.category !== 'all') {
            const cat = feedbackFilters.category;
            if (cat === 'TM') {
                if (!kontextId.includes('top match')) return false;
            } else if (cat === 'CH') {
                if (!kontextId.includes('challenge')) return false;
            } else {
                // Category A-F: check for category name
                const catName = window.categoryNames[cat]?.toLowerCase();
                if (catName && !kontextId.includes(catName)) return false;
            }
        }

        return true;
    });

    // Sort
    if (feedbackFilters.sort === 'oldest') {
        filtered = filtered.reverse();
    } else if (feedbackFilters.sort === 'rating') {
        filtered.sort((a, b) => {
            const aRating = (a.Verstand || a.verstand || 0) + (a.Gefuehl || a.gefuehl || 0);
            const bRating = (b.Verstand || b.verstand || 0) + (b.Gefuehl || b.gefuehl || 0);
            return bRating - aRating;
        });
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="feedback-empty">
                ${feedbackData.length === 0
                    ? TiageI18n.t('feedback.noFeedback', 'Noch kein Feedback vorhanden.<br>Sei der Erste!')
                    : TiageI18n.t('feedback.noFilterResults', 'Kein Feedback für diesen Filter.')}
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(f => renderFeedbackItem(f)).join('');
}

// Render single feedback item with replies
function renderFeedbackItem(f, isReply = false) {
    const id = f.Id || f.id || f.timestamp || '';
    const kontextId = f.KontextID || f.kontextId || '-';
    const name = f.Name || f.name || 'Anonym';
    const titel = f.Titel || f.titel || '';
    const kommentar = f.Kommentar || f.kommentar || '';
    const verstand = f.Verstand || f.verstand || 0;
    const gefuehl = f.Gefuehl || f.gefuehl || 0;
    const timestamp = f.Timestamp || f.timestamp || '';

    // Find replies to this item
    const replies = feedbackData.filter(r =>
        (r.AntwortAuf || r.antwortAuf) === id
    );

    const timeStr = timestamp ? new Date(timestamp).toLocaleDateString('de-DE') : '';

    return `
        <div class="feedback-item ${isReply ? 'reply' : ''}" data-id="${id}">
            <div class="feedback-item-header">
                <span class="feedback-item-context">${kontextId}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="feedback-item-name">${name}</span>
                    ${timeStr ? `<span class="feedback-timestamp">${timeStr}</span>` : ''}
                </div>
            </div>
            <div class="feedback-item-title">${titel}</div>
            ${kommentar ? `<div class="feedback-item-comment">${kommentar}</div>` : ''}
            <div class="feedback-item-footer">
                <div class="feedback-item-ratings">
                    <div class="feedback-rating">
                        <span>Verstand:</span>
                        <span class="stars">${'★'.repeat(verstand)}${'☆'.repeat(5-verstand)}</span>
                    </div>
                    <div class="feedback-rating">
                        <span>Gefühl:</span>
                        <span class="stars">${'★'.repeat(gefuehl)}${'☆'.repeat(5-gefuehl)}</span>
                    </div>
                </div>
                <button class="feedback-reply-btn" onclick="openReplyModal('${id}', '${name}')">
                    ↩ Antworten
                </button>
            </div>
            ${replies.length > 0 ? `
                <div class="feedback-replies">
                    ${replies.map(r => renderFeedbackItem(r, true)).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

// Open reply modal - uses commentModal (feedbackModal was removed)
function openReplyModal(parentId, parentName) {
    replyToId = parentId;
    // Open comment modal for replies
    const modal = document.getElementById('commentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset form
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');
        if (nameInput) nameInput.value = '';
        if (textInput) {
            textInput.value = '';
            textInput.placeholder = TiageI18n.t('ui.replyTo', 'Antwort auf {name}...').replace('{name}', parentName);
        }
    }
}

// Initialize advanced filters
function initAdvancedFilters() {
    // Search input
    document.getElementById('feedbackSearch').addEventListener('input', (e) => {
        feedbackFilters.search = e.target.value;
        renderFeedbackList();
    });

    // Type selects
    document.getElementById('filterMyType').addEventListener('change', (e) => {
        feedbackFilters.myType = e.target.value;
        renderFeedbackList();
    });

    document.getElementById('filterPartnerType').addEventListener('change', (e) => {
        feedbackFilters.partnerType = e.target.value;
        renderFeedbackList();
    });

    // Category buttons
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-filter-btn').forEach(b =>
                b.classList.remove('active')
            );
            btn.classList.add('active');
            feedbackFilters.category = btn.dataset.cat;
            renderFeedbackList();
        });
    });

    // Sort select
    document.getElementById('filterSort').addEventListener('change', (e) => {
        feedbackFilters.sort = e.target.value;
        renderFeedbackList();
    });
}

// Initialize feedback system
function initFeedbackSystem() {
    if (typeof window.initStarRatings === "function") window.initStarRatings();
    initAdvancedFilters();
}

    // ── Exports ─────────────────────────────────────────────────────────────
    window.saveLocalFeedback = saveLocalFeedback;
    window.getLocalFeedback = getLocalFeedback;
    window.loadFeedback = loadFeedback;
    window.renderFeedbackList = renderFeedbackList;
    window.openReplyModal = openReplyModal;
    window.initFeedbackSystem = initFeedbackSystem;

})();
