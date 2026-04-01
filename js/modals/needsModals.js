/**
 * needsModals.js — Bedürfnis-Vergleich & Definition Modals
 * =========================================================
 * Extracted from app-main.js
 *
 * Enthält:
 * - openNeedsCompareModal / closeNeedsCompareModal
 * - openNeedDefinitionModal / closeNeedDefinitionModal
 * - openNeedWithResonance / getResonanceDataForNeed
 * - openGfkExplanationModal
 * - openNeedsFullModal / renderNeedsFullModal
 * - openNeedsScoreExplanation / closeNeedsScoreExplanation
 * - switchNeedsFullModalTab / sortNeedsFullModal
 */

// Aktueller Tab für das vollständige Modal
var needsFullModalCurrentTab = 'gemeinsam';
var needsFullModalSortBy = null;
var needsFullModalSortDir = 'desc';

/**
 * Hilfsfunktion: Perspektive für Kategorie ermitteln
 */
function getPerspektiveForKategorieModal(katId) {
    var katNum = parseInt(katId.replace('#K', ''));
    if (katNum === 11) return '#P4';
    return '#P1';
}

/**
 * Öffnet das Bedürfnis-Vergleichs-Modal
 */
function openNeedsCompareModal(type) {
    var modal = document.getElementById('needsCompareModal');
    var body = document.getElementById('needsCompareModalBody');
    var title = document.getElementById('needsCompareModalTitle');

    if (!modal || !body) return;

    var ichArchetyp = window.currentArchetype || '';
    var partnerArchetyp = window.selectedPartner || '';

    if (!ichArchetyp || !partnerArchetyp) {
        body.innerHTML = '<p style="color: var(--text-muted);">' + TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.') + '</p>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    var archetypeDescs = window.archetypeDescriptions || {};
    var ichName = (archetypeDescs[ichArchetyp] && archetypeDescs[ichArchetyp].name) || 'ICH';
    var partnerName = (archetypeDescs[partnerArchetyp] && archetypeDescs[partnerArchetyp].name) || 'Partner';

    var matching = null;
    var isFallback = false;

    if (typeof calculateNeedsMatchFromFlatNeeds === 'function') {
        var result = calculateNeedsMatchFromFlatNeeds();
        if (result) {
            var formatNeed = function(item) {
                return {
                    label: typeof formatBeduerfnisLabel === 'function' ? formatBeduerfnisLabel(item.need) : item.need,
                    id: item.need,
                    wert1: item.wert1,
                    wert2: item.wert2,
                    diff: Math.abs(item.wert1 - item.wert2)
                };
            };
            var allGemeinsam = result.gemeinsam.concat(result.komplementaer).map(formatNeed);
            var allUnterschiedlich = result.unterschiedlich.map(formatNeed);
            allGemeinsam.sort(function(a, b) { return ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2); });
            allUnterschiedlich.sort(function(a, b) { return ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2); });
            matching = {
                topUebereinstimmungen: allGemeinsam.slice(0, 10),
                topKonflikte: allUnterschiedlich.slice(0, 10)
            };
        }
    }

    if (!matching && typeof GfkBeduerfnisse !== 'undefined') {
        matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
        isFallback = true;
    }

    if (!matching) {
        body.innerHTML = '<p style="color: var(--text-muted);">' + TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.') + '</p>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    if (type === 'gemeinsam') {
        title.textContent = TiageI18n.t('ui.sharedNeeds', 'Gemeinsame Bedürfnisse');
    } else {
        title.textContent = TiageI18n.t('synthese.challengingDiffs', 'Unterschiedliche Prioritäten');
    }

    var items = type === 'gemeinsam'
        ? (matching.topUebereinstimmungen || [])
        : (matching.topKonflikte || []);

    var html = '';

    if (items.length === 0) {
        html = '<p style="color: var(--text-muted);">' + TiageI18n.t('ui.noEntriesFound', 'Keine Einträge vorhanden.') + '</p>';
    } else {
        if (isFallback) {
            html += '<div style="background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.3);border-radius:6px;padding:8px 12px;margin-bottom:16px;display:flex;align-items:center;gap:8px;">' +
                '<span style="font-size:14px;">ℹ️</span>' +
                '<div style="flex:1;">' +
                '<div style="font-size:11px;font-weight:600;color:#eab308;margin-bottom:2px;">' + TiageI18n.t('ui.archetypeBaseValues', 'Archetyp-Basis-Werte') + '</div>' +
                '<div style="font-size:10px;color:var(--text-muted);line-height:1.4;">' + TiageI18n.t('ui.archetypeBaseValuesDesc', 'Individualisierte Werte nicht verfügbar.') + '</div>' +
                '</div></div>';
        }

        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
            '<div style="text-align:center;font-weight:600;color:var(--success);font-size:12px;text-transform:uppercase;letter-spacing:1px;">' + ichName + '</div>' +
            '<div style="text-align:center;font-weight:600;color:var(--danger);font-size:12px;text-transform:uppercase;letter-spacing:1px;">' + partnerName + '</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;">';

        items.forEach(function(item) {
            var label = item.label;
            var wert1 = item.wert1 || 0;
            var wert2 = item.wert2 || 0;
            var diff = Math.abs(wert1 - wert2);
            var statusIcon, statusColor, statusText;
            if (diff <= 15) { statusIcon = '✓'; statusColor = '#22c55e'; statusText = 'Übereinstimmung'; }
            else if (diff <= 35) { statusIcon = '~'; statusColor = '#eab308'; statusText = 'Komplementär'; }
            else { statusIcon = '✗'; statusColor = '#ef4444'; statusText = 'Unterschied'; }

            html += '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:12px;border-left:3px solid ' + statusColor + ';">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<span onclick="openNeedWithResonance(\'' + item.id + '\')" style="font-weight:500;color:var(--text-primary);cursor:pointer;" onmouseover="this.style.color=\'var(--primary)\'" onmouseout="this.style.color=\'var(--text-primary)\'">' + label + ' <span style="font-size:10px;opacity:0.5;">ⓘ</span></span>' +
                '<span style="color:' + statusColor + ';font-size:11px;font-weight:600;">' + statusIcon + ' ' + statusText + '</span>' +
                '</div>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
                '<div style="display:flex;align-items:center;gap:8px;"><div style="flex:1;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;"><div style="width:' + wert1 + '%;height:100%;background:var(--success);border-radius:3px;"></div></div><span style="font-size:11px;color:var(--text-muted);min-width:35px;text-align:right;">' + wert1 + '</span></div>' +
                '<div style="display:flex;align-items:center;gap:8px;"><div style="flex:1;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;"><div style="width:' + wert2 + '%;height:100%;background:var(--danger);border-radius:3px;"></div></div><span style="font-size:11px;color:var(--text-muted);min-width:35px;text-align:right;">' + wert2 + '</span></div>' +
                '</div></div>';
        });

        html += '</div>';

        var infoText = type === 'gemeinsam'
            ? 'Gemeinsame Bedürfnisse bilden das Fundament eurer Verbindung. Hier könnt ihr euch gegenseitig stärken.'
            : 'Unterschiedliche Prioritäten zeigen Wachstumspotential. Diese Bereiche erfordern bewusste Kommunikation.';
        html += '<div style="margin-top:16px;padding:12px;background:rgba(139,92,246,0.08);border-radius:8px;border:1px solid rgba(139,92,246,0.2);"><p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.5;">' + infoText + '</p></div>';
    }

    body.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNeedsCompareModal(event) {
    if (event && event.target !== event.currentTarget) return;
    var modal = document.getElementById('needsCompareModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Öffnet das Bedürfnis-Definition Modal
 */
function openNeedDefinitionModal(needId, context, resonanceData) {
    var modal = document.getElementById('needDefinitionModal');
    var body = document.getElementById('needDefinitionModalBody');
    var title = document.getElementById('needDefinitionModalTitle');

    if (!modal || !body) return;

    var katalog = window.BeduerfnisKatalog;
    if (!katalog) {
        body.innerHTML = '<p style="color:var(--text-muted);">Katalog nicht geladen.</p>';
        modal.classList.add('active');
        return;
    }

    var bId = needId;
    if (needId && !needId.startsWith('#B') && typeof BeduerfnisIds !== 'undefined') {
        bId = BeduerfnisIds.toId(needId) || needId;
    }

    var need = katalog.beduerfnisse[bId];
    if (!need) {
        body.innerHTML = '<p style="color:var(--text-muted);">' + TiageI18n.t('ui.needNotFound', 'Bedürfnis {id} nicht gefunden.').replace('{id}', needId) + '</p>';
        modal.classList.add('active');
        return;
    }

    title.textContent = need.label;

    var kategorie = katalog.kategorien[need.kategorie];
    var dimension = katalog.dimensionen[need.dimension];
    var perspektive = kategorie ? katalog.perspektiven[getPerspektiveForKategorieModal(need.kategorie)] : null;

    var html = '<div class="need-modal-content">';

    html += '<div class="need-modal-id-row"><span class="need-modal-id">' + need.id + '</span>' +
        (need.frageTyp ? '<span class="need-modal-type need-modal-type-' + need.frageTyp + '">' + (need.frageTyp === 'haupt' ? '📋 Hauptfrage' : '📑 Nuance') + '</span>' : '') +
        '</div>';

    html += '<div class="need-modal-meta-grid">';
    if (kategorie) {
        html += '<div class="need-modal-meta-item"><span class="need-modal-meta-label">Kategorie</span>' +
            '<span class="need-modal-meta-value" style="color:' + kategorie.color + '"><span class="need-modal-dot" style="background:' + kategorie.color + '"></span>' + kategorie.label + '</span></div>';
    }
    if (dimension) {
        html += '<div class="need-modal-meta-item"><span class="need-modal-meta-label">Dimension</span>' +
            '<span class="need-modal-meta-value" style="color:' + dimension.color + '"><span class="need-modal-badge" style="background:' + dimension.color + '">' + dimension.kurzform + '</span>' + dimension.label + '</span></div>';
    }
    if (perspektive) {
        html += '<div class="need-modal-meta-item"><span class="need-modal-meta-label">Perspektive</span>' +
            '<span class="need-modal-meta-value">' + perspektive.id + ' ' + perspektive.label + '</span></div>';
    }
    html += '</div>';

    if (need.frage) {
        html += '<div class="need-modal-question"><span class="need-modal-question-icon">❓</span><span class="need-modal-question-text">' + need.frage + '</span></div>';
    }
    if (need.kontext) {
        html += '<div class="need-modal-context"><span class="need-modal-context-label">Kontext:</span><span class="need-modal-context-text">' + need.kontext + '</span></div>';
    }
    if (need.hauptbeduerfnis) {
        var hauptNeed = katalog.beduerfnisse[need.hauptbeduerfnis];
        if (hauptNeed) {
            html += '<div class="need-modal-parent"><span class="need-modal-parent-label">Gehört zu:</span>' +
                '<span class="need-modal-parent-link" onclick="openNeedWithResonance(\'' + need.hauptbeduerfnis + '\')">' + hauptNeed.label + ' (' + need.hauptbeduerfnis + ')</span></div>';
        }
    }
    if (need.nuancen && need.nuancen.length > 0) {
        html += '<div class="need-modal-nuancen"><span class="need-modal-nuancen-label">Nuancen:</span><div class="need-modal-nuancen-list">' +
            need.nuancen.map(function(nId) {
                var n = katalog.beduerfnisse[nId];
                return n ? '<span class="need-modal-nuance-tag" onclick="openNeedWithResonance(\'' + nId + '\')">' + n.label + '</span>' : '';
            }).join('') + '</div></div>';
    }

    if (context === 'resonance' && resonanceData) {
        var matchPercent = 100 - Math.abs(resonanceData.wert1 - resonanceData.wert2);
        var rValue = (matchPercent / 100 * 1.1).toFixed(2);
        html += '<div class="need-modal-resonance">' +
            '<div class="need-modal-resonance-header"><span class="need-modal-resonance-icon">🎯</span><span class="need-modal-resonance-label">Match-Resonanz</span></div>' +
            '<div class="need-modal-resonance-content"><div class="need-modal-resonance-values">' +
            '<span class="need-modal-resonance-person">' + resonanceData.ichName + ': <strong>' + resonanceData.wert1 + '</strong></span>' +
            '<span class="need-modal-resonance-vs">vs</span>' +
            '<span class="need-modal-resonance-person">' + resonanceData.partnerName + ': <strong>' + resonanceData.wert2 + '</strong></span>' +
            '</div><div class="need-modal-resonance-match">' +
            '<span class="need-modal-resonance-percent">Match: <strong>' + Math.round(matchPercent) + '%</strong></span>' +
            '<span class="need-modal-resonance-r">R = ' + rValue + '</span>' +
            '</div></div></div>';
    }

    var displayValue = 50;
    if (context === 'resonance' && resonanceData && resonanceData.wert1 !== undefined) {
        displayValue = resonanceData.wert1;
    } else if (typeof TiageState !== 'undefined') {
        var flatNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : TiageState.get('flatNeeds.ich');
        if (flatNeeds) {
            var needKey = typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds.toKey(bId) : null;
            if (flatNeeds[bId] !== undefined) displayValue = flatNeeds[bId];
            else if (needKey && flatNeeds[needKey] !== undefined) displayValue = flatNeeds[needKey];
        }
    }

    html += '<div class="need-modal-value" data-need-id="' + bId + '">' +
        '<div class="need-modal-value-header"><span class="need-modal-value-label">Dein aktueller Wert</span><span class="need-modal-value-number">' + displayValue + '</span></div>' +
        '<div class="need-modal-value-bar"><div class="need-modal-value-fill" style="width:' + displayValue + '%"></div></div>' +
        '</div>';

    var sigma = (kategorie && kategorie.sigma) || (typeof TiageStatistics !== 'undefined' ? TiageStatistics.DEFAULT_SIGMA : 14);
    var typicalValue = 50;
    var archetypForStats = null;
    if (typeof TiageState !== 'undefined') archetypForStats = TiageState.get('archetypes.ich.primary');
    if (!archetypForStats && typeof window.mobileIchArchetype !== 'undefined') archetypForStats = window.mobileIchArchetype;
    if (archetypForStats && typeof window.BaseArchetypProfile !== 'undefined') {
        var baseProfil = window.BaseArchetypProfile[archetypForStats];
        if (baseProfil && baseProfil.umfrageWerte && baseProfil.umfrageWerte[needId] !== undefined) {
            typicalValue = baseProfil.umfrageWerte[needId];
        }
    }

    if (typeof TiageStatistics !== 'undefined') {
        var interval = TiageStatistics.calculateConfidenceInterval(typicalValue, sigma, 80);
        html += '<div class="need-modal-statistics">' +
            '<div class="need-modal-statistics-header"><span class="need-modal-statistics-icon">📊</span><span class="need-modal-statistics-label">Statistischer Hintergrund</span></div>' +
            '<div class="need-modal-statistics-content"><div class="need-modal-statistics-text">80% der Befragten antworteten mit <strong>' + Math.round(interval.lower) + '-' + Math.round(interval.upper) + '</strong></div>' +
            '<div class="need-modal-statistics-sub">(Normalverteilung, σ=' + sigma + ', Konfidenzintervall ±' + Math.round(interval.margin) + ')</div></div></div>';
    }

    html += '</div>';
    body.innerHTML = html;
    modal.classList.add('active');
}

function closeNeedDefinitionModal(event) {
    if (event && event.target !== event.currentTarget) return;
    var modal = document.getElementById('needDefinitionModal');
    if (modal) modal.classList.remove('active');
}

function getResonanceDataForNeed(needId) {
    var lastResult = window.lastGfkMatchingResult;
    if (!lastResult || !lastResult.details) return null;

    var allNeeds = (lastResult.details.uebereinstimmend || [])
        .concat(lastResult.details.komplementaer || [])
        .concat(lastResult.details.konflikt || []);

    var found = allNeeds.find(function(n) { return n.id === needId; });
    if (!found) return null;

    var archetypeDescs = window.archetypeDescriptions || {};
    return {
        wert1: found.wert1 || 0,
        wert2: found.wert2 || 0,
        ichName: (archetypeDescs[window.currentArchetype] && archetypeDescs[window.currentArchetype].name) || 'Du',
        partnerName: (archetypeDescs[window.selectedPartner] && archetypeDescs[window.selectedPartner].name) || 'Partner'
    };
}

function openNeedWithResonance(needId) {
    var resonanceData = null;
    var lastResult = window.lastGfkMatchingResult;
    if (lastResult && lastResult.details) {
        var allNeeds = (lastResult.details.uebereinstimmend || [])
            .concat(lastResult.details.komplementaer || [])
            .concat(lastResult.details.konflikt || []);
        var archetypeDescs = window.archetypeDescriptions || {};
        var ichName = (archetypeDescs[window.currentArchetype] && archetypeDescs[window.currentArchetype].name) || 'Du';
        var partnerName = (archetypeDescs[window.selectedPartner] && archetypeDescs[window.selectedPartner].name) || 'Partner';

        var needData = allNeeds.find(function(n) { return n.id === needId; });
        if (!needData && typeof BeduerfnisIds !== 'undefined') {
            var altId = needId.startsWith('#B') ? BeduerfnisIds.toKey(needId) : BeduerfnisIds.toId(needId);
            if (altId) needData = allNeeds.find(function(n) { return n.id === altId || n.key === altId; });
        }
        if (needData) {
            resonanceData = { wert1: needData.wert1 || 0, wert2: needData.wert2 || 0, ichName: ichName, partnerName: partnerName };
        }
    }
    openNeedDefinitionModal(needId, resonanceData ? 'resonance' : 'info', resonanceData);
}

function openGfkExplanationModal(event) {
    if (event) event.stopPropagation();
    var modal = document.getElementById('gfkExplanationModal');
    if (modal) modal.classList.add('active');
}

async function openNeedsFullModal() {
    needsFullModalCurrentTab = 'gemeinsam';
    needsFullModalSortBy = null;
    needsFullModalSortDir = 'desc';
    // Eigenschaften-Daten laden (einmalig)
    if (typeof loadEigenschaftenData === 'function') {
        await loadEigenschaftenData();
    }
    renderNeedsFullModal();
}

function openNeedsScoreExplanation() {
    var modal = document.getElementById('needsScoreExplanationModal');
    var body = document.getElementById('needsScoreExplanationBody');
    if (!modal || !body) return;

    body.innerHTML = '<div style="font-size:14px;line-height:1.7;color:var(--text-primary);">' +
        '<h3 style="font-size:16px;font-weight:600;margin:0 0 12px 0;color:#22c55e;">Was bedeutet die Zahl?</h3>' +
        '<p style="margin:0 0 16px 0;">Die Prozentanzeige zeigt die <strong>gewichtete Übereinstimmung über alle 224 Bedürfnisse</strong> zwischen beiden Profilen.</p>' +
        '<p style="margin:0 0 20px 0;padding:12px;background:rgba(34,197,94,0.1);border-left:3px solid #22c55e;border-radius:4px;font-size:13px;">' +
        '<strong>Nicht:</strong> Eine Schätzung oder theoretischer Wert<br><strong>Sondern:</strong> Empirisch berechnet aus euren tatsächlichen Bedürfnis-Profilen</p>' +
        '<h3 style="font-size:16px;font-weight:600;margin:20px 0 12px 0;color:#22c55e;">Wie wird sie berechnet?</h3>' +
        '<pre style="background:rgba(255,255,255,0.05);padding:12px;border-radius:6px;font-size:12px;overflow-x:auto;margin:0 0 12px 0;line-height:1.6;">Für JEDES der 224 Bedürfnisse:\n    Ähnlichkeit = 100 - |Wert Person 1 - Wert Person 2|\n    Gewicht = (Wert Person 1 + Wert Person 2) / 2\n    Beitrag = Ähnlichkeit × Gewicht\n\nGesamt-Score = Σ(Beitrag) / Σ(Gewicht)</pre>' +
        '<p style="margin:0 0 16px 0;padding:12px;background:rgba(234,179,8,0.1);border-left:3px solid #eab308;border-radius:4px;font-size:13px;">' +
        '<strong>Beispiel #B90 Kinderwunsch:</strong><br>Person 1 = 85, Person 2 = 40<br>→ Ähnlichkeit = 100 - |85 - 40| = <strong>55</strong><br>→ Gewicht = (85 + 40) / 2 = <strong>62.5</strong><br>→ Beitrag = 55 × 62.5 = <strong>3437.5</strong></p>' +
        '<h3 style="font-size:16px;font-weight:600;margin:20px 0 12px 0;color:#22c55e;">Farbliche Bewertung</h3>' +
        '<div style="display:flex;flex-direction:column;gap:8px;margin:0 0 20px 0;">' +
        '<div style="display:flex;align-items:center;gap:12px;padding:8px;background:rgba(34,197,94,0.1);border-radius:4px;"><span style="font-size:20px;">🟢</span><div style="flex:1;"><div style="font-weight:600;">60-100% - Hoch</div><div style="font-size:12px;opacity:0.8;">Starke Übereinstimmung</div></div></div>' +
        '<div style="display:flex;align-items:center;gap:12px;padding:8px;background:rgba(234,179,8,0.1);border-radius:4px;"><span style="font-size:20px;">🟡</span><div style="flex:1;"><div style="font-weight:600;">40-59% - Mittel</div><div style="font-size:12px;opacity:0.8;">Moderate Übereinstimmung</div></div></div>' +
        '<div style="display:flex;align-items:center;gap:12px;padding:8px;background:rgba(239,68,68,0.1);border-radius:4px;"><span style="font-size:20px;">🔴</span><div style="flex:1;"><div style="font-weight:600;">0-39% - Niedrig</div><div style="font-size:12px;opacity:0.8;">Geringe Übereinstimmung</div></div></div>' +
        '</div></div>';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNeedsScoreExplanation(event) {
    if (event && event.target.id !== 'needsScoreExplanationModal') return;
    var modal = document.getElementById('needsScoreExplanationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchNeedsFullModalTab(tab) {
    needsFullModalCurrentTab = tab;
    needsFullModalSortBy = null;
    needsFullModalSortDir = 'desc';
    renderNeedsFullModal();
}

function sortNeedsFullModal(column) {
    if (needsFullModalSortBy === column) {
        needsFullModalSortDir = needsFullModalSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        needsFullModalSortBy = column;
        needsFullModalSortDir = 'desc';
    }
    renderNeedsFullModal();
}

function renderNeedsFullModal() {
    var modal = document.getElementById('needsCompareModal');
    var body = document.getElementById('needsCompareModalBody');
    var title = document.getElementById('needsCompareModalTitle');

    if (!modal || !body) return;

    // Robuster Archetyp-Zugriff mit TiageState-Fallback
    var ichArchetyp = window.currentArchetype || (typeof TiageState !== 'undefined' && TiageState.get('archetypes.ich.primary')) || '';
    var partnerArchetyp = window.selectedPartner || (typeof TiageState !== 'undefined' && TiageState.get('archetypes.partner.primary')) || '';
    var archetypeDescs = window.archetypeDescriptions || {};

    if (!ichArchetyp || !partnerArchetyp) {
        body.innerHTML = '<p style="color:var(--text-muted);">' + TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.') + '</p>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    var ichName = (archetypeDescs[ichArchetyp] && archetypeDescs[ichArchetyp].name) || 'ICH';
    var partnerName = (archetypeDescs[partnerArchetyp] && archetypeDescs[partnerArchetyp].name) || 'Partner';

    var matching = null;
    var isFallback = false;

    if (typeof calculateNeedsMatchFromFlatNeeds === 'function') {
        var result = calculateNeedsMatchFromFlatNeeds();
        if (result) {
            var fmt = function(item) {
                return {
                    label: typeof formatBeduerfnisLabel === 'function' ? formatBeduerfnisLabel(item.need) : item.need,
                    id: item.need, wert1: item.wert1, wert2: item.wert2,
                    diff: Math.abs(item.wert1 - item.wert2)
                };
            };
            matching = {
                details: {
                    uebereinstimmend: result.gemeinsam.map(fmt),
                    komplementaer: result.komplementaer.map(fmt),
                    konflikt: result.unterschiedlich.map(fmt)
                }
            };
        }
    }

    if (!matching && typeof GfkBeduerfnisse !== 'undefined') {
        matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
        isFallback = true;
    }

    if (!matching) {
        body.innerHTML = '<p style="color:var(--text-muted);">' + TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.') + '</p>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
    }

    title.textContent = TiageI18n.t('ui.needsComparison', 'Bedürfnis-Vergleich');

    var type = needsFullModalCurrentTab;
    var items;
    if (type === 'gemeinsam') {
        var uebereinstimmend = (matching.details && matching.details.uebereinstimmend) || [];
        var komplementaer = (matching.details && matching.details.komplementaer) || [];
        items = uebereinstimmend.concat(komplementaer);
        if (items.length > 0 && !needsFullModalSortBy) {
            items.sort(function(a, b) { return ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2); });
        }
        if (items.length === 0) items = matching.topUebereinstimmungen || [];
    } else {
        items = (matching.details && matching.details.konflikt) || matching.topKonflikte || [];
    }

    if (needsFullModalSortBy && items.length > 0) {
        var sortBy = needsFullModalSortBy;
        var sortDir = needsFullModalSortDir;
        items = items.slice().sort(function(a, b) {
            var valA, valB;
            if (sortBy === 'duo') { valA = a.wert1 || 0; valB = b.wert1 || 0; }
            else if (sortBy === 'diff') { valA = Math.abs((a.wert1||0)-(a.wert2||0)); valB = Math.abs((b.wert1||0)-(b.wert2||0)); }
            else { valA = a.wert2 || 0; valB = b.wert2 || 0; }
            return sortDir === 'desc' ? valB - valA : valA - valB;
        });
    }

    var duoSortIcon = needsFullModalSortBy === 'duo' ? (needsFullModalSortDir === 'desc' ? '▼' : '▲') : '⇅';
    var diffSortIcon = needsFullModalSortBy === 'diff' ? (needsFullModalSortDir === 'desc' ? '▼' : '▲') : '⇅';
    var raSortIcon = needsFullModalSortBy === 'ra' ? (needsFullModalSortDir === 'desc' ? '▼' : '▲') : '⇅';
    var duoActive = needsFullModalSortBy === 'duo';
    var diffActive = needsFullModalSortBy === 'diff';
    var raActive = needsFullModalSortBy === 'ra';

    var explanationHtml = '<div style="background:rgba(34,197,94,0.08);border-left:3px solid #22c55e;border-radius:4px;padding:10px 12px;margin-bottom:16px;font-size:12px;line-height:1.6;">' +
        '<div style="display:flex;align-items:start;gap:8px;"><div style="flex:1;">' +
        '<div style="font-weight:600;margin-bottom:4px;color:#22c55e;">Berechnung über alle 224 Bedürfnisse</div>' +
        '<div style="color:var(--text-secondary);font-size:11px;">Gewichtete Übereinstimmung basierend auf euren tatsächlichen Profilen. ' +
        '<span onclick="openNeedsScoreExplanation();" style="color:#22c55e;cursor:pointer;text-decoration:underline;margin-left:4px;">Mehr erfahren ⓘ</span></div>' +
        '</div></div></div>';

    var toggleHtml = '<div style="display:flex;gap:0;margin-bottom:16px;background:rgba(255,255,255,0.05);border-radius:8px;padding:4px;">' +
        '<button onclick="switchNeedsFullModalTab(\'gemeinsam\')" style="flex:1;padding:10px 16px;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;' + (type === 'gemeinsam' ? 'background:#22c55e;color:white;' : 'background:transparent;color:var(--text-muted);') + '">Gemeinsame & Kompatible</button>' +
        '<button onclick="switchNeedsFullModalTab(\'unterschiedlich\')" style="flex:1;padding:10px 16px;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;' + (type === 'unterschiedlich' ? 'background:#ef4444;color:white;' : 'background:transparent;color:var(--text-muted);') + '">Unterschiedliche Prioritäten</button>' +
        '</div>';

    // Eigenschaften-Toggles für aktuellen ICH-Archetyp
    var eigenschaftenHtml = '';
    if (typeof getEigenschaftenHtml === 'function' && ichArchetyp) {
        eigenschaftenHtml = getEigenschaftenHtml(ichArchetyp);
    }

    var headerHtml = '<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);">' +
        '<button onclick="sortNeedsFullModal(\'duo\')" style="display:flex;align-items:center;justify-content:center;gap:6px;background:' + (duoActive ? 'rgba(34,197,94,0.15)' : 'transparent') + ';border:1px solid ' + (duoActive ? 'rgba(34,197,94,0.4)' : 'transparent') + ';border-radius:6px;padding:6px 8px;cursor:pointer;">' +
        '<span style="font-weight:600;color:var(--success);font-size:11px;text-transform:uppercase;letter-spacing:1px;">' + ichName + '</span><span style="font-size:10px;">' + duoSortIcon + '</span></button>' +
        '<button onclick="sortNeedsFullModal(\'diff\')" style="display:flex;align-items:center;justify-content:center;gap:4px;background:' + (diffActive ? 'rgba(234,179,8,0.15)' : 'transparent') + ';border:1px solid ' + (diffActive ? 'rgba(234,179,8,0.4)' : 'transparent') + ';border-radius:6px;padding:6px 8px;cursor:pointer;min-width:60px;">' +
        '<span style="font-weight:600;color:var(--warning,#eab308);font-size:10px;text-transform:uppercase;">Diff</span><span style="font-size:10px;">' + diffSortIcon + '</span></button>' +
        '<button onclick="sortNeedsFullModal(\'ra\')" style="display:flex;align-items:center;justify-content:center;gap:6px;background:' + (raActive ? 'rgba(239,68,68,0.15)' : 'transparent') + ';border:1px solid ' + (raActive ? 'rgba(239,68,68,0.4)' : 'transparent') + ';border-radius:6px;padding:6px 8px;cursor:pointer;">' +
        '<span style="font-weight:600;color:var(--danger);font-size:11px;text-transform:uppercase;letter-spacing:1px;">' + partnerName + '</span><span style="font-size:10px;">' + raSortIcon + '</span></button>' +
        '</div>';

    var listHtml = '';
    if (items.length === 0) {
        listHtml = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Keine Einträge vorhanden.</p>';
    } else {
        listHtml = '<div style="display:flex;flex-direction:column;gap:6px;max-height:calc(70vh - 180px);overflow-y:auto;">';
        items.forEach(function(item) {
            var wert1 = item.wert1 || 0;
            var wert2 = item.wert2 || 0;
            var diff = Math.abs(wert1 - wert2);
            var statusColor = diff <= 15 ? '#22c55e' : diff <= 35 ? '#eab308' : '#ef4444';
            listHtml += '<div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:10px 12px;border-left:3px solid ' + statusColor + ';">' +
                '<div onclick="openNeedWithResonance(\'' + item.id + '\')" style="font-weight:500;color:var(--text-primary);font-size:13px;margin-bottom:6px;cursor:pointer;" onmouseover="this.style.color=\'var(--primary)\'" onmouseout="this.style.color=\'var(--text-primary)\'">' +
                item.label + ' <span style="font-size:10px;opacity:0.5;">ⓘ</span></div>' +
                '<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:center;">' +
                '<div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;height:5px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;"><div style="width:' + wert1 + '%;height:100%;background:var(--success);border-radius:3px;"></div></div><span style="font-size:11px;color:var(--text-muted);min-width:32px;text-align:right;">' + wert1 + '</span></div>' +
                '<div style="display:flex;align-items:center;justify-content:center;min-width:50px;"><span style="font-size:11px;font-weight:600;color:' + statusColor + ';background:' + statusColor + '22;padding:2px 6px;border-radius:4px;">' + diff + '</span></div>' +
                '<div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;height:5px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;"><div style="width:' + wert2 + '%;height:100%;background:var(--danger);border-radius:3px;"></div></div><span style="font-size:11px;color:var(--text-muted);min-width:32px;text-align:right;">' + wert2 + '</span></div>' +
                '</div></div>';
        });
        listHtml += '</div>';
    }

    var countHtml = '<div style="margin-top:12px;text-align:center;font-size:11px;color:var(--text-muted);">' +
        items.length + ' ' + (type === 'gemeinsam' ? 'gemeinsame & kompatible Bedürfnisse' : 'unterschiedliche Prioritäten') + '</div>';

    var fallbackBannerHtml = '';
    if (isFallback) {
        fallbackBannerHtml = '<div style="background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.3);border-radius:6px;padding:8px 12px;margin-bottom:16px;display:flex;align-items:center;gap:8px;">' +
            '<span style="font-size:14px;">ℹ️</span><div style="flex:1;">' +
            '<div style="font-size:11px;font-weight:600;color:#eab308;margin-bottom:2px;">' + TiageI18n.t('synthese.archetypeBaseValues', 'Archetyp-Basis-Werte') + '</div>' +
            '<div style="font-size:10px;color:var(--text-muted);line-height:1.4;">' + TiageI18n.t('synthese.archetypeBaseValuesDesc', 'Individualisierte Werte nicht verfügbar.') + '</div>' +
            '</div></div>';
    }

    body.innerHTML = explanationHtml + toggleHtml + eigenschaftenHtml + fallbackBannerHtml + headerHtml + listHtml + countHtml;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ── Globale Exports ──────────────────────────────────────────────────────────
window.openNeedsCompareModal      = openNeedsCompareModal;
window.closeNeedsCompareModal     = closeNeedsCompareModal;
window.openNeedDefinitionModal    = openNeedDefinitionModal;
window.closeNeedDefinitionModal   = closeNeedDefinitionModal;
window.openNeedWithResonance      = openNeedWithResonance;
window.getResonanceDataForNeed    = getResonanceDataForNeed;
window.openGfkExplanationModal    = openGfkExplanationModal;
window.openNeedsFullModal         = openNeedsFullModal;
window.renderNeedsFullModal       = renderNeedsFullModal;
window.switchNeedsFullModalTab    = switchNeedsFullModalTab;
window.sortNeedsFullModal         = sortNeedsFullModal;
window.openNeedsScoreExplanation  = openNeedsScoreExplanation;
window.closeNeedsScoreExplanation = closeNeedsScoreExplanation;
window.getPerspektiveForKategorieModal = getPerspektiveForKategorieModal;
