/**
 * TIAGE GFK Matching Module
 *
 * Handles GFK (Gewaltfreie Kommunikation) needs matching calculations,
 * GFK UI synchronization, and display.
 * Extracted from app-main.js as part of Extended Dimensions modularization.
 *
 * @module TiageGfkMatching
 * @version 1.0.0
 */
var TiageGfkMatching = (function() {
    'use strict';

    // Module state
    var lastGfkMatchingResult = null;

    // ═══════════════════════════════════════════════════════════════════════════
    // GFK CLICK HANDLER
    // ═══════════════════════════════════════════════════════════════════════════

    function handleGfkClick(person, gfkValue, btn) {
        showGfkExplanationModal(gfkValue);
    }

    var gfkLevelExplanations = {
        niedrig: {
            title: 'Niedrig',
            description: '<p><strong>Niedrige Bedürfnis-Übereinstimmung</strong> bedeutet, dass die Kernbedürfnisse der beiden Archetypen stark voneinander abweichen.</p><p>Dies kann zu Herausforderungen in der Kommunikation führen, da beide Partner unterschiedliche Prioritäten haben. Eine bewusste Auseinandersetzung mit den Bedürfnissen des anderen ist hier besonders wichtig.</p><p>Typische Unterschiede betreffen oft:</p><ul style="margin-left: 20px; margin-top: 8px;"><li>Freiheit vs. Sicherheit</li><li>Autonomie vs. Nähe</li><li>Stabilität vs. Spontaneität</li></ul>'
        },
        mittel: {
            title: 'Mittel',
            description: '<p><strong>Mittlere Bedürfnis-Übereinstimmung</strong> zeigt eine teilweise Schnittmenge der Kernbedürfnisse.</p><p>Es gibt sowohl gemeinsame Grundlagen als auch Bereiche, die Kompromissbereitschaft erfordern. Mit guter Kommunikation können diese Unterschiede als bereichernd erlebt werden.</p><p>Empfehlung: Fokussiert euch auf die gemeinsamen Bedürfnisse und entwickelt Strategien für die unterschiedlichen Prioritäten.</p>'
        },
        hoch: {
            title: 'Hoch',
            description: '<p><strong>Hohe Bedürfnis-Übereinstimmung</strong> bedeutet, dass beide Archetypen ähnliche Kernbedürfnisse priorisieren.</p><p>Dies schafft eine natürliche Basis für Verständnis und kann die Kommunikation erleichtern. Beide Partner sprechen oft intuitiv die gleiche "Bedürfnis-Sprache".</p><p>Dies ist ein guter Ausgangspunkt - dennoch bleibt achtsame Kommunikation wichtig, da auch bei hoher Übereinstimmung individuelle Unterschiede bestehen.</p>'
        }
    };

    function showGfkExplanationModal(level) {
        var modal = document.getElementById('gfkExplanationModal');
        var badge = document.getElementById('gfkModalLevelBadge');
        var explanation = document.getElementById('gfkModalExplanation');

        if (!modal || !level) return;

        var data = gfkLevelExplanations[level] || gfkLevelExplanations.niedrig;

        badge.textContent = data.title;
        badge.className = 'gfk-level-indicator gfk-level-' + level;
        explanation.innerHTML = data.description;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGfkExplanationModal(event) {
        if (event && event.target !== event.currentTarget) return;
        var modal = document.getElementById('gfkExplanationModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GFK UI SYNC
    // ═══════════════════════════════════════════════════════════════════════════

    function syncGfkUI(person) {
        var personDimensions = window.personDimensions;
        var selected = personDimensions[person].gfk;

        var selectors = [
            '.gfk-grid[data-person="' + person + '"] .gfk-btn',
            '#' + person + '-gfk-grid .gfk-btn',
            '#mobile-' + person + '-gfk-grid .gfk-btn'
        ];

        selectors.forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(btn) {
                var value = btn.dataset.value;
                btn.classList.remove('selected', 'primary-selected');
                if (value === selected) {
                    btn.classList.add('selected', 'primary-selected');
                }
            });
        });

        updateGfkSummary(person);
    }

    function getGfkSummary(person) {
        var personDimensions = window.personDimensions;
        var gfk = personDimensions[person].gfk;
        if (!gfk) return 'GFK fehlt';
        return 'GFK: ' + gfk;
    }

    function updateGfkSummary(person) {
        var personDimensions = window.personDimensions;
        var gfk = personDimensions[person].gfk;
        var isMissing = !gfk;

        var headerId = person + '-header-gfk';
        var header = document.getElementById(headerId);
        if (header) {
            header.textContent = getGfkSummary(person);
            header.classList.toggle('missing', isMissing);
        }

        ['', 'mobile-'].forEach(function(prefix) {
            var summaryId = prefix + person + '-gfk-summary';
            var summary = document.getElementById(summaryId);
            if (summary) {
                summary.textContent = gfk ? ('✓ ' + gfk) : '';
                summary.classList.toggle('has-selection', !isMissing);
            }
        });
    }

    function hasGfkSelected(person) {
        var personDimensions = window.personDimensions;
        return personDimensions[person].gfk !== null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GFK FROM ARCHETYPES
    // ═══════════════════════════════════════════════════════════════════════════

    function updateGfkFromArchetypes() {
        if (typeof GfkBeduerfnisse === 'undefined') {
            console.warn('GFK: GfkBeduerfnisse nicht geladen');
            return;
        }

        var personDimensions = window.personDimensions;
        var ichArchetype = typeof window.getIchArchetype === 'function' ? window.getIchArchetype() : null;
        var partnerArchetype = typeof window.getPartnerArchetype === 'function' ? window.getPartnerArchetype() : null;

        if (!ichArchetype || !partnerArchetype) return;

        var ichNormalized = ichArchetype;
        var partnerNormalized = partnerArchetype;

        if (typeof BeduerfnisModifikatoren !== 'undefined' && GfkBeduerfnisse.archetypProfile) {
            var matching = calculateDynamicBeduerfnisMatch(ichNormalized, partnerNormalized);
            if (matching) {
                lastGfkMatchingResult = matching;

                personDimensions.ich.gfk = matching.level;
                personDimensions.partner.gfk = matching.level;

                syncGfkUI('ich');
                syncGfkUI('partner');

                updateGfkBeduerfnisDisplay(matching);
                return;
            }
        }

        // Fallback: Altes System
        var matching = GfkBeduerfnisse.berechneMatching(ichNormalized, partnerNormalized);

        if (matching.fehler) {
            console.warn('GFK Matching Fehler:', matching.fehler);
            return;
        }

        lastGfkMatchingResult = matching;

        personDimensions.ich.gfk = matching.level;
        personDimensions.partner.gfk = matching.level;

        syncGfkUI('ich');
        syncGfkUI('partner');

        updateGfkBeduerfnisDisplay(matching);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DYNAMIC NEEDS MATCHING
    // ═══════════════════════════════════════════════════════════════════════════

    function calculateDynamicBeduerfnisMatch(ichArchetyp, partnerArchetyp) {
        var personDimensions = window.personDimensions;

        // NEU: KONSISTENTE BERECHNUNG mit individualisierten Bedürfnissen
        if (typeof TiageState !== 'undefined' && typeof window.calculateNeedsMatchFromFlatNeeds === 'function') {
            var result = window.calculateNeedsMatchFromFlatNeeds();

            if (result && result.score !== undefined) {
                var level = 'niedrig';
                if (result.score >= 70) level = 'hoch';
                else if (result.score >= 40) level = 'mittel';

                var formatLabel = function(need) {
                    if (need && need.startsWith('#B') && typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.getLabel) {
                        return GfkBeduerfnisse.getLabel(need);
                    }
                    return formatBeduerfnisLabel(need);
                };

                var allGemeinsam = (result.gemeinsam || []).map(function(b) {
                    return { label: formatLabel(b.need), id: b.need, key: b.need, wert1: b.wert1, wert2: b.wert2 };
                });
                var allUnterschiedlich = (result.unterschiedlich || []).map(function(b) {
                    return { label: formatLabel(b.need), id: b.need, key: b.need, wert1: b.wert1, wert2: b.wert2 };
                });
                var allKomplementaer = (result.komplementaer || []).map(function(b) {
                    return { label: formatLabel(b.need), id: b.need, key: b.need, wert1: b.wert1, wert2: b.wert2 };
                });

                var allGemeinsamUndKompatibel = allGemeinsam.concat(allKomplementaer).sort(function(a, b) {
                    return ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2);
                });

                return {
                    score: result.score,
                    level: level,
                    archetyp1: ichArchetyp,
                    archetyp2: partnerArchetyp,
                    topUebereinstimmungen: allGemeinsamUndKompatibel.slice(0, 5),
                    topKonflikte: allUnterschiedlich.slice(0, 5),
                    komplementaer: allKomplementaer.slice(0, 5),
                    alleGemeinsam: allGemeinsamUndKompatibel,
                    alleUnterschiedlich: allUnterschiedlich,
                    alleKomplementaer: allKomplementaer,
                    details: {
                        uebereinstimmend: allGemeinsam,
                        komplementaer: allKomplementaer,
                        konflikt: allUnterschiedlich
                    },
                    source: 'calculateNeedsMatchFromFlatNeeds'
                };
            }
        }

        // FALLBACK: Alter Weg mit BeduerfnisModifikatoren
        var ichBasis = GfkBeduerfnisse.archetypProfile[ichArchetyp];
        var partnerBasis = GfkBeduerfnisse.archetypProfile[partnerArchetyp];

        if (!ichBasis || !ichBasis.umfrageWerte || !partnerBasis || !partnerBasis.umfrageWerte) {
            console.warn('Archetyp-Basis nicht gefunden:', ichArchetyp, partnerArchetyp);
            return null;
        }

        var extractGeschlecht = function(g) {
            if (!g) return 'divers';
            if (typeof g === 'string') return g;
            if (typeof g === 'object') return g.primary || 'divers';
            return 'divers';
        };

        var extractGeschlechtSecondary = function(g) {
            if (!g || typeof g !== 'object') return null;
            return g.secondary || null;
        };

        var extractDominanz = function(d) {
            if (!d) return 'ausgeglichen';
            if (typeof d === 'string') return d;
            if (typeof d === 'object') return d.primary || 'ausgeglichen';
            return 'ausgeglichen';
        };

        var extractOrientierung = function(o) {
            if (!o) return 'heterosexuell';
            if (typeof o === 'string') return o;
            if (typeof o === 'object') return o.primary || 'heterosexuell';
            return 'heterosexuell';
        };

        var ichDims = personDimensions.ich;
        var ichParams = {
            basisBedürfnisse: ichBasis.umfrageWerte,
            dominanz: extractDominanz(ichDims.dominanz),
            dominanzStatus: ichDims.dominanzStatus || 'gelebt',
            geschlechtPrimary: extractGeschlecht(ichDims.geschlecht),
            geschlechtPrimaryStatus: 'gelebt',
            geschlechtSecondary: extractGeschlechtSecondary(ichDims.geschlecht),
            geschlechtSecondaryStatus: 'gelebt',
            orientierung: extractOrientierung(ichDims.orientierung),
            orientierungStatus: ichDims.orientierungStatus || 'gelebt'
        };

        var partnerDims = personDimensions.partner;
        var partnerParams = {
            basisBedürfnisse: partnerBasis.umfrageWerte,
            dominanz: extractDominanz(partnerDims.dominanz),
            dominanzStatus: partnerDims.dominanzStatus || 'gelebt',
            geschlechtPrimary: extractGeschlecht(partnerDims.geschlecht),
            geschlechtPrimaryStatus: 'gelebt',
            geschlechtSecondary: extractGeschlechtSecondary(partnerDims.geschlecht),
            geschlechtSecondaryStatus: 'gelebt',
            orientierung: extractOrientierung(partnerDims.orientierung),
            orientierungStatus: partnerDims.orientierungStatus || 'gelebt'
        };

        var ichProfil = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil(ichParams);
        var partnerProfil = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil(partnerParams);

        var result = BeduerfnisModifikatoren.berechneÜbereinstimmung(ichProfil, partnerProfil);

        var level = 'niedrig';
        if (result.score >= 70) level = 'hoch';
        else if (result.score >= 40) level = 'mittel';

        var allGemeinsam = result.gemeinsam.map(function(b) {
            return { label: formatBeduerfnisLabel(b.bedürfnis), id: b.bedürfnis, key: b.bedürfnis, wert1: b.wert1, wert2: b.wert2 };
        });
        var allUnterschiedlich = result.unterschiedlich.map(function(b) {
            return { label: formatBeduerfnisLabel(b.bedürfnis), id: b.bedürfnis, key: b.bedürfnis, wert1: b.wert1, wert2: b.wert2 };
        });
        var allKomplementaer = result.komplementaer.map(function(b) {
            return { label: formatBeduerfnisLabel(b.bedürfnis), id: b.bedürfnis, key: b.bedürfnis, wert1: b.wert1, wert2: b.wert2 };
        });

        var allGemeinsamUndKompatibel = allGemeinsam.concat(allKomplementaer).sort(function(a, b) {
            return ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2);
        });

        return {
            score: result.score,
            level: level,
            archetyp1: ichArchetyp,
            archetyp2: partnerArchetyp,
            topUebereinstimmungen: allGemeinsamUndKompatibel.slice(0, 5),
            topKonflikte: allUnterschiedlich.slice(0, 5),
            komplementaer: allKomplementaer.slice(0, 5),
            alleGemeinsam: allGemeinsamUndKompatibel,
            alleUnterschiedlich: allUnterschiedlich,
            alleKomplementaer: allKomplementaer,
            details: {
                uebereinstimmend: allGemeinsam,
                komplementaer: allKomplementaer,
                konflikt: allUnterschiedlich
            },
            profile: { ich: ichProfil, partner: partnerProfil },
            dynamisch: true
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FORMAT & DISPLAY
    // ═══════════════════════════════════════════════════════════════════════════

    function formatBeduerfnisLabel(key) {
        if (!key) return '';

        if (key.startsWith('#B')) {
            if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.getLabel) {
                return GfkBeduerfnisse.getLabel(key);
            }
            if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toKey) {
                var stringKey = BeduerfnisIds.toKey(key);
                if (stringKey) {
                    return stringKey.replace(/_/g, ' ')
                        .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü')
                        .split(' ')
                        .map(function(word) { return word.charAt(0).toUpperCase() + word.slice(1); })
                        .join(' ');
                }
            }
        }

        return key.replace(/_/g, ' ')
                  .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü')
                  .split(' ')
                  .map(function(word) { return word.charAt(0).toUpperCase() + word.slice(1); })
                  .join(' ');
    }

    function updateGfkBeduerfnisDisplay(matching) {
        var container = document.getElementById('gfk-beduerfnis-display');
        var mobileContainer = document.getElementById('mobile-gfk-beduerfnis-display');

        if (!container && !mobileContainer) return;

        if (container) container.style.display = 'block';
        if (mobileContainer) mobileContainer.style.display = 'block';

        var scoreColor = matching.level === 'hoch' ? '#22c55e' :
                        matching.level === 'mittel' ? '#eab308' : '#ef4444';

        var beduerfnisLabel = typeof TiageI18n !== 'undefined'
            ? TiageI18n.t('synthesisSection.beduerfnisUebereinstimmung', 'Bedürfnis-Übereinstimmung')
            : 'Bedürfnis-Übereinstimmung';

        var html = '<div class="gfk-matching-header" onclick="openNeedsFullModal()" style="cursor: pointer;" title="Klicken für vollständige Liste">' +
            '<div class="gfk-score-display">' +
            '<span class="gfk-score" style="color: ' + scoreColor + '">' + matching.score + '</span>' +
            '<span onclick="event.stopPropagation(); openNeedsScoreExplanation();" style="cursor: help; margin-left: 6px; opacity: 0.6; font-size: 0.85em;" title="Wie wird dieser Wert berechnet?">ⓘ</span>' +
            '<span class="gfk-level-label">' + beduerfnisLabel + '</span>' +
            '</div></div>';

        if (matching.topUebereinstimmungen && matching.topUebereinstimmungen.length > 0) {
            var sharedTitle = typeof TiageI18n !== 'undefined'
                ? TiageI18n.t('needs.sharedTitle', 'GEMEINSAME BEDÜRFNISSE')
                : 'GEMEINSAME BEDÜRFNISSE';
            html += '<div class="gfk-section gfk-matches">' +
                '<div class="gfk-section-title" style="color: #22c55e;">' + sharedTitle + '</div>' +
                '<div class="gfk-tags">';
            matching.topUebereinstimmungen.forEach(function(b) {
                var bidDisplay = b.id && b.id.startsWith('#B') ? '<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">' + b.id + '</span>' : '';
                html += '<span class="gfk-tag gfk-tag-match gfk-tag-clickable" onclick="openNeedWithResonance(\'' + b.id + '\')" title="Klicken für Definition">' + bidDisplay + b.label + '</span>';
            });
            html += '</div></div>';
        }

        if (matching.topKonflikte && matching.topKonflikte.length > 0) {
            var diffTitle = typeof TiageI18n !== 'undefined'
                ? TiageI18n.t('needs.differentTitle', 'UNTERSCHIEDLICHE PRIORITÄTEN')
                : 'UNTERSCHIEDLICHE PRIORITÄTEN';
            html += '<div class="gfk-section gfk-conflicts">' +
                '<div class="gfk-section-title" style="color: #ef4444;">' + diffTitle + '</div>' +
                '<div class="gfk-tags">';
            matching.topKonflikte.forEach(function(b) {
                var bidDisplay = b.id && b.id.startsWith('#B') ? '<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">' + b.id + '</span>' : '';
                html += '<span class="gfk-tag gfk-tag-conflict gfk-tag-clickable" onclick="openNeedWithResonance(\'' + b.id + '\')" title="Klicken für Definition | ' + matching.archetyp1 + ': ' + b.wert1 + ' | ' + matching.archetyp2 + ': ' + b.wert2 + '">' + bidDisplay + b.label + '</span>';
            });
            html += '</div></div>';
        }

        if (container) container.innerHTML = html;
        if (mobileContainer) mobileContainer.innerHTML = html;
    }

    function getArchetypBeduerfnisse(archetyp) {
        if (typeof GfkBeduerfnisse === 'undefined') return [];
        return GfkBeduerfnisse.getTopBeduerfnisse(archetyp, 5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        handleGfkClick: handleGfkClick,
        showGfkExplanationModal: showGfkExplanationModal,
        closeGfkExplanationModal: closeGfkExplanationModal,
        syncGfkUI: syncGfkUI,
        getGfkSummary: getGfkSummary,
        updateGfkSummary: updateGfkSummary,
        hasGfkSelected: hasGfkSelected,
        updateGfkFromArchetypes: updateGfkFromArchetypes,
        calculateDynamicBeduerfnisMatch: calculateDynamicBeduerfnisMatch,
        formatBeduerfnisLabel: formatBeduerfnisLabel,
        updateGfkBeduerfnisDisplay: updateGfkBeduerfnisDisplay,
        getArchetypBeduerfnisse: getArchetypBeduerfnisse,
        getLastMatchingResult: function() { return lastGfkMatchingResult; }
    };
})();

// Global exports
if (typeof window !== 'undefined') {
    window.TiageGfkMatching = TiageGfkMatching;
    window.handleGfkClick = TiageGfkMatching.handleGfkClick;
    window.showGfkExplanationModal = TiageGfkMatching.showGfkExplanationModal;
    window.closeGfkExplanationModal = TiageGfkMatching.closeGfkExplanationModal;
    window.syncGfkUI = TiageGfkMatching.syncGfkUI;
    window.updateGfkFromArchetypes = TiageGfkMatching.updateGfkFromArchetypes;
    window.formatBeduerfnisLabel = TiageGfkMatching.formatBeduerfnisLabel;
    window.calculateDynamicBeduerfnisMatch = TiageGfkMatching.calculateDynamicBeduerfnisMatch;
    window.getArchetypBeduerfnisse = TiageGfkMatching.getArchetypBeduerfnisse;
    window.updateGfkBeduerfnisDisplay = TiageGfkMatching.updateGfkBeduerfnisDisplay;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageGfkMatching;
}
