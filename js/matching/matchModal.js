/**
 * MATCH MODAL MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet das Match Modal UI für Partner-Matching-Anzeige mit:
 * - Top Match / Challenge Anzeige
 * - Pathos (emotional) / Logos (rational) Perspektiven
 * - Dynamische Pro/Contra Generierung
 * - Synthesis/Konflikt-Analyse
 * - Integration mit PathosTextGenerator, LogosTextGenerator, IntegratedSynthesisTextGenerator
 *
 * Extrahiert aus app-main.js (Zeilen 1850-2300)
 *
 * Dependencies:
 * - TiageState (state.js)
 * - PathosTextGenerator (optional)
 * - LogosTextGenerator (optional)
 * - IntegratedSynthesisTextGenerator (optional)
 * - TiageChartUtils.getBarClass
 * - TiageTooltips.categoryNames
 * - data (archetypes, interactions)
 * - icons, archetypeDescriptions (global)
 *
 * @module TiageMatching.MatchModal
 */
var TiageMatching = TiageMatching || {};

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let currentTopMatch = { id: null, score: 0 };
    let currentChallenge = { id: null, score: 0 };
    let modalContextPartner = null; // Track which partner to use in category modal
    let currentMatchModalView = TiageState?.get('ui.matchModalView') || 'pathos'; // pathos or logos
    let currentMatchModalData = null; // Store current modal data for toggle refresh

    // ═══════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Set current top match data
     * @param {Object} match - { id, score }
     */
    function setTopMatch(match) {
        currentTopMatch = match || { id: null, score: 0 };
    }

    /**
     * Set current challenge data
     * @param {Object} challenge - { id, score }
     */
    function setChallenge(challenge) {
        currentChallenge = challenge || { id: null, score: 0 };
    }

    /**
     * Set modal context partner (for category modal)
     * @param {string} partnerId - Partner archetype ID
     */
    function setModalContextPartner(partnerId) {
        modalContextPartner = partnerId;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get current top match data
     * @returns {Object} { id, score }
     */
    function getTopMatch() {
        return { ...currentTopMatch };
    }

    /**
     * Get current challenge data
     * @returns {Object} { id, score }
     */
    function getChallenge() {
        return { ...currentChallenge };
    }

    /**
     * Get modal context partner
     * @returns {string|null} Partner archetype ID
     */
    function getModalContextPartner() {
        return modalContextPartner;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // VIEW TOGGLE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Toggle between Pathos (emotional) and Logos (rational) view
     * @param {string} view - 'pathos' or 'logos'
     */
    function toggleView(view) {
        currentMatchModalView = view;
        if (typeof TiageState !== 'undefined') {
            TiageState.set('ui.matchModalView', view);
        }

        // Update toggle button styles
        const pathosBtn = document.getElementById('matchTogglePathos');
        const logosBtn = document.getElementById('matchToggleLogos');
        if (pathosBtn && logosBtn) {
            pathosBtn.classList.toggle('active', view === 'pathos');
            logosBtn.classList.toggle('active', view === 'logos');
        }

        // Refresh modal content if data is available
        if (currentMatchModalData) {
            const content = getModalContent(
                currentMatchModalData.partnerArch,
                currentMatchModalData.interaction,
                currentMatchModalData.scores,
                currentMatchModalData.scoreColor,
                currentMatchModalData.myArch
            );
            const modalBody = document.getElementById('modalBody');
            if (modalBody) {
                modalBody.innerHTML = content;
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DYNAMIC CONTENT GENERATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Generate dynamic Pro items based on current view (Pathos/Logos)
     * @param {Object} myArch - My archetype data
     * @param {Object} partnerArch - Partner archetype data
     * @param {string} view - 'pathos' or 'logos'
     * @returns {Array<string>} Pro items
     */
    function generateDynamicPro(myArch, partnerArch, view) {
        const items = [];
        const ichId = myArch.id;
        const partnerId = partnerArch.id;

        if (view === 'pathos') {
            // Emotional/Pathos perspective - use PathosTextGenerator if available
            if (typeof PathosTextGenerator !== 'undefined') {
                const resonance = PathosTextGenerator.calculateResonance?.(myArch, partnerArch) || {};
                if (resonance.emotional > 0.6) items.push('Starke emotionale Resonanz zwischen euren Energien');
                if (resonance.intuitive > 0.5) items.push('Intuitives Verständnis füreinander');
            }
            // Fallback emotional pros
            if (ichId === partnerId) {
                items.push('Tiefes Gefühl des Verstandenwerdens');
                items.push('Geteilte emotionale Sprache');
            }
            if (items.length === 0) {
                items.push('Potenzial für emotionale Verbindung');
                items.push('Raum für gegenseitiges Wachstum');
            }
        } else {
            // Rational/Logos perspective - use LogosTextGenerator if available
            if (typeof LogosTextGenerator !== 'undefined') {
                const analysis = LogosTextGenerator.analyzeCompatibility?.(myArch, partnerArch) || {};
                if (analysis.structuralMatch > 0.6) items.push('Kompatible Beziehungsstrukturen');
                if (analysis.valueAlignment > 0.5) items.push('Übereinstimmende Grundwerte');
            }
            // Fallback structural pros
            if (ichId === partnerId) {
                items.push('Identische Beziehungsphilosophie');
                items.push('Gleiche Erwartungen an Verbindlichkeit');
            }
            if (items.length === 0) {
                items.push('Klare Kommunikationsbasis möglich');
                items.push('Strukturelle Anpassung machbar');
            }
        }
        return items;
    }

    /**
     * Generate dynamic Contra items based on current view (Pathos/Logos)
     * @param {Object} myArch - My archetype data
     * @param {Object} partnerArch - Partner archetype data
     * @param {string} view - 'pathos' or 'logos'
     * @returns {Array<string>} Contra items
     */
    function generateDynamicContra(myArch, partnerArch, view) {
        const items = [];
        const ichId = myArch.id;
        const partnerId = partnerArch.id;

        // Use IntegratedSynthesisTextGenerator for conflicts if available
        if (typeof IntegratedSynthesisTextGenerator !== 'undefined') {
            const conflicts = IntegratedSynthesisTextGenerator.identifyPartnerConflicts(
                ichId, partnerId, null, null
            );

            if (view === 'pathos') {
                // Emotional perspective on conflicts
                conflicts.forEach(conflict => {
                    if (conflict.dynamics?.core_wound) {
                        items.push(conflict.dynamics.core_wound);
                    }
                });
                // Inner conflicts
                const innerData = IntegratedSynthesisTextGenerator.data?.innerConflicts;
                if (innerData?.[ichId]?.shadow) {
                    items.push(`Dein Schatten: ${innerData[ichId].shadow.substring(0, 80)}...`);
                }
            } else {
                // Rational perspective on conflicts
                conflicts.forEach(conflict => {
                    items.push(`${conflict.title}: ${conflict.dynamics?.pattern || ''}`);
                });
            }
        }

        // Fallback contras
        if (items.length === 0) {
            if (view === 'pathos') {
                items.push('Emotionale Frequenzen können divergieren');
                items.push('Risiko von Missverständnissen auf Gefühlsebene');
            } else {
                items.push('Unterschiedliche Erwartungen möglich');
                items.push('Kommunikationsarbeit erforderlich');
            }
        }

        return items;
    }

    /**
     * Generate synthesis section with psychological depth
     * @param {Object} myArch - My archetype data
     * @param {Object} partnerArch - Partner archetype data
     * @returns {string} HTML for synthesis section
     */
    function generateSynthesisSection(myArch, partnerArch) {
        if (typeof IntegratedSynthesisTextGenerator === 'undefined') {
            return '';
        }

        const ichId = myArch.id;
        const partnerId = partnerArch.id;

        // Get inner conflicts
        const innerData = IntegratedSynthesisTextGenerator.data?.innerConflicts || {};
        const ichConflict = innerData[ichId];
        const partnerConflict = innerData[partnerId];

        let conflictHtml = '';

        // ═══════════════════════════════════════════════════════════════════
        // DEIN INNERER KONFLIKT - Mit voller Tiefe
        // ═══════════════════════════════════════════════════════════════════
        if (ichConflict) {
            conflictHtml += `
                <div class="match-modal-inner-conflict">
                    <div class="match-modal-inner-conflict-title">🔮 Dein innerer Konflikt: ${ichConflict.core}</div>
                    <div class="match-modal-inner-conflict-text">${ichConflict.description}</div>
                    ${ichConflict.psychological ? `
                        <div style="margin-top: 10px; padding: 8px; background: rgba(255, 193, 7, 0.05); border-radius: 6px;">
                            <div style="font-size: 11px; color: #f39c12; font-weight: 600; margin-bottom: 4px;">🧠 Psychologisch</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.psychological}</div>
                        </div>
                    ` : ''}
                    ${ichConflict.shadow ? `
                        <div style="margin-top: 8px; padding: 8px; background: rgba(128, 0, 128, 0.08); border-radius: 6px;">
                            <div style="font-size: 11px; color: #9b59b6; font-weight: 600; margin-bottom: 4px;">🌑 Schattenseite</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.shadow}</div>
                        </div>
                    ` : ''}
                    ${ichConflict.growth ? `
                        <div style="margin-top: 8px; padding: 8px; background: rgba(39, 174, 96, 0.08); border-radius: 6px;">
                            <div style="font-size: 11px; color: #27ae60; font-weight: 600; margin-bottom: 4px;">🌱 Wachstumspotenzial</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.growth}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // ═══════════════════════════════════════════════════════════════════
        // PARTNER-KONFLIKT - Mit voller Tiefe
        // ═══════════════════════════════════════════════════════════════════
        if (partnerConflict && ichId !== partnerId) {
            conflictHtml += `
                <div class="match-modal-inner-conflict" style="margin-top: 12px;">
                    <div class="match-modal-inner-conflict-title">🔮 Partner-Konflikt: ${partnerConflict.core}</div>
                    <div class="match-modal-inner-conflict-text">${partnerConflict.description}</div>
                    ${partnerConflict.psychological ? `
                        <div style="margin-top: 10px; padding: 8px; background: rgba(255, 193, 7, 0.05); border-radius: 6px;">
                            <div style="font-size: 11px; color: #f39c12; font-weight: 600; margin-bottom: 4px;">🧠 Psychologisch</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.psychological}</div>
                        </div>
                    ` : ''}
                    ${partnerConflict.shadow ? `
                        <div style="margin-top: 8px; padding: 8px; background: rgba(128, 0, 128, 0.08); border-radius: 6px;">
                            <div style="font-size: 11px; color: #9b59b6; font-weight: 600; margin-bottom: 4px;">🌑 Schattenseite</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.shadow}</div>
                        </div>
                    ` : ''}
                    ${partnerConflict.growth ? `
                        <div style="margin-top: 8px; padding: 8px; background: rgba(39, 174, 96, 0.08); border-radius: 6px;">
                            <div style="font-size: 11px; color: #27ae60; font-weight: 600; margin-bottom: 4px;">🌱 Wachstumspotenzial</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.growth}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Get partner conflicts (interpersonelle Spannungen)
        const partnerConflicts = IntegratedSynthesisTextGenerator.identifyPartnerConflicts(
            ichId, partnerId, null, null
        );

        // ═══════════════════════════════════════════════════════════════════
        // HAUPTSPANNUNGSFELD - Mit voller Tiefe
        // ═══════════════════════════════════════════════════════════════════
        let partnerConflictHtml = '';
        if (partnerConflicts.length > 0) {
            const mainConflict = partnerConflicts[0];
            partnerConflictHtml = `
                <div style="margin-top: 16px; padding: 12px; background: rgba(231, 76, 60, 0.08); border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.2);">
                    <div style="font-weight: 600; color: var(--danger); font-size: var(--font-sm); margin-bottom: 8px;">
                        ⚡ Hauptspannungsfeld: ${mainConflict.title}
                    </div>

                    <!-- Dynamik-Sektion -->
                    <div style="margin-bottom: 12px;">
                        <div style="font-size: 11px; color: #e74c3c; font-weight: 600; margin-bottom: 6px;">📊 Dynamik</div>
                        ${mainConflict.dynamics?.pattern ? `
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                <strong>Muster:</strong> ${mainConflict.dynamics.pattern}
                            </div>
                        ` : ''}
                        ${mainConflict.dynamics?.escalation ? `
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                <strong>Eskalation:</strong> ${mainConflict.dynamics.escalation}
                            </div>
                        ` : ''}
                        ${mainConflict.dynamics?.core_wound ? `
                            <div style="font-size: var(--font-xs); color: #e74c3c; line-height: 1.5; padding: 6px; background: rgba(231,76,60,0.1); border-radius: 4px;">
                                <strong>💔 Kernwunde:</strong> ${mainConflict.dynamics.core_wound}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Lösungs-Sektion -->
                    <div style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div style="font-size: 11px; color: var(--success); font-weight: 600; margin-bottom: 6px;">💡 Lösungsweg</div>
                        ${mainConflict.resolution?.understanding ? `
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                <strong>Verständnis:</strong> ${mainConflict.resolution.understanding}
                            </div>
                        ` : ''}
                        ${mainConflict.resolution?.practical ? `
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                <strong>Praktisch:</strong> ${mainConflict.resolution.practical}
                            </div>
                        ` : ''}
                        ${mainConflict.resolution?.growth ? `
                            <div style="font-size: var(--font-xs); color: var(--success); line-height: 1.5; padding: 6px; background: rgba(39,174,96,0.1); border-radius: 4px;">
                                <strong>🌱 Wachstum:</strong> ${mainConflict.resolution.growth}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        return `
            <div class="match-modal-section synthese">
                <div class="match-modal-section-title">🎯 Psychologische Tiefe</div>
                ${conflictHtml}
                ${partnerConflictHtml}
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODAL CONTENT
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Generate match modal content
     * @param {Object} partnerArch - Partner archetype data
     * @param {Object} interaction - Interaction data
     * @param {Object} scores - Category scores
     * @param {string} scoreColor - Score color
     * @param {Object} myArch - My archetype data
     * @returns {string} HTML content
     */
    function getModalContent(partnerArch, interaction, scores, scoreColor, myArch) {
        const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
        const overall = interaction.overall || 0;
        const isIdenticalType = myArch.id === partnerArch.id;

        // Category names and bar class helpers
        const categoryNames = (typeof TiageTooltips !== 'undefined')
            ? TiageTooltips.categoryNames : {};
        const getBarClass = (typeof TiageChartUtils !== 'undefined')
            ? TiageChartUtils.getBarClass : function() { return ''; };

        const categoryBars = categories.map(cat => {
            const value = scores[cat]?.value || 0;
            const barClass = getBarClass(value);
            const name = categoryNames[cat] || cat;

            // Special note for identical types on category A (Beziehungsphilosophie)
            const isPhilosophyCategory = cat === 'A' && isIdenticalType;
            const specialNote = isPhilosophyCategory
                ? '<div style="font-size: 10px; color: var(--success); margin-top: 2px;">Identische Grundüberzeugung</div>'
                : '';

            return `
                <div class="match-modal-bar-row clickable" onclick="openSingleCategoryModal('${cat}')">
                    <span class="match-modal-bar-label">${cat}</span>
                    <div class="match-modal-bar-container">
                        <div class="match-modal-bar ${barClass}" style="width: ${value}%">
                            <span class="match-modal-bar-value">${value}%</span>
                        </div>
                        ${specialNote}
                    </div>
                    <span class="match-modal-bar-name">${name}</span>
                </div>
            `;
        }).join('');

        // Generate dynamic Pro/Contra based on current view (Pathos/Logos)
        const dynamicPro = generateDynamicPro(myArch, partnerArch, currentMatchModalView);
        const dynamicContra = generateDynamicContra(myArch, partnerArch, currentMatchModalView);

        // Combine static (from JSON) and dynamic items
        const staticPro = interaction.pro || [];
        const staticContra = interaction.contra || [];

        // Use dynamic items first, then add unique static items
        const combinedPro = [...dynamicPro];
        staticPro.forEach(p => {
            if (!combinedPro.some(dp => dp.toLowerCase().includes(p.toLowerCase().substring(0, 20)))) {
                combinedPro.push(p);
            }
        });

        const combinedContra = [...dynamicContra];
        staticContra.forEach(c => {
            if (!combinedContra.some(dc => dc.toLowerCase().includes(c.toLowerCase().substring(0, 20)))) {
                combinedContra.push(c);
            }
        });

        const proItems = combinedPro.map(p => `<li>${p}</li>`).join('') || '<li>Keine Daten</li>';
        const contraItems = combinedContra.map(c => `<li>${c}</li>`).join('') || '<li>Keine Daten</li>';

        // Perspective indicator
        const perspectiveLabel = currentMatchModalView === 'pathos'
            ? '🔥 Pathos-Perspektive (emotional)'
            : '🧠 Logos-Perspektive (rational)';

        // Generate synthesis section
        const synthesisSection = generateSynthesisSection(myArch, partnerArch);

        // Special banner for identical types
        const identicalTypeBanner = isIdenticalType ? `
            <div style="background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(46, 204, 113, 0.05));
                        border: 1px solid var(--success); border-radius: 10px; padding: 12px; margin-bottom: 15px; text-align: center;">
                <div style="font-weight: 600; color: var(--success); margin-bottom: 4px;">✓ Identischer Beziehungstyp</div>
                <div style="font-size: var(--font-sm); color: var(--text-secondary);">
                    Ihr teilt dieselbe Grundüberzeugung über Beziehungen
                </div>
            </div>
        ` : '';

        const comboText = `${myArch.name} + ${partnerArch.name}`;
        const myDef = (typeof archetypeDescriptions !== 'undefined' && archetypeDescriptions[myArch.id])
            ? archetypeDescriptions[myArch.id].shortDef || ''
            : '';
        const partnerDef = (typeof archetypeDescriptions !== 'undefined' && archetypeDescriptions[partnerArch.id])
            ? archetypeDescriptions[partnerArch.id].shortDef || ''
            : '';

        // Icons
        const myIcon = (typeof icons !== 'undefined' && icons[myArch.id]) ? icons[myArch.id] : '';
        const partnerIcon = (typeof icons !== 'undefined' && icons[partnerArch.id]) ? icons[partnerArch.id] : '';

        return `
            <div class="modal-feedback-btn" onclick="openFeedbackModalWithContext('${comboText}')">
                💬 Feedback zu ${comboText}
            </div>

            <div class="match-modal-header">
                <div class="match-modal-icon" style="background: ${partnerArch.color}">${partnerIcon}</div>
                <div class="match-modal-info">
                    <h3 style="color: ${partnerArch.color}">
                        ${partnerArch.name}
                        <span class="type-info-icon" onclick="openDefinitionModal('${partnerArch.id}')" title="Definition anzeigen">ℹ</span>
                    </h3>
                    <p>${partnerArch.shortDescription || ''}</p>
                </div>
            </div>

            ${identicalTypeBanner}

            <div class="type-definitions-compact" style="background: var(--bg-dark); border-radius: 10px; padding: 12px; margin-bottom: 15px; font-size: var(--font-sm);">
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 200px;">
                        <span style="color: ${myArch.color}; font-weight: 600;">${myIcon} ${myArch.name}</span>
                        <span class="type-info-icon" onclick="openDefinitionModal('${myArch.id}')" style="margin-left: 4px;">ℹ</span>
                        <div style="color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${myDef}</div>
                    </div>
                    <div style="flex: 1; min-width: 200px;">
                        <span style="color: ${partnerArch.color}; font-weight: 600;">${partnerIcon} ${partnerArch.name}</span>
                        <span class="type-info-icon" onclick="openDefinitionModal('${partnerArch.id}')" style="margin-left: 4px;">ℹ</span>
                        <div style="color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${partnerDef}</div>
                    </div>
                </div>
            </div>

            <div class="match-modal-score">
                <span class="match-modal-score-label">Beziehungsqualität ${isIdenticalType ? '(gleicher Typ)' : 'mit ' + myArch.name}</span>
                <span class="match-modal-score-value" style="color: ${scoreColor}">${overall}</span>
            </div>

            <div class="match-modal-categories">
                <div class="match-modal-categories-title">Kategorie-Bewertungen</div>
                ${categoryBars}
            </div>

            <div class="match-modal-perspective">${perspectiveLabel}</div>

            <div class="match-modal-section pro">
                <div class="match-modal-section-title">✓ Was funktioniert</div>
                <ul class="match-modal-list">${proItems}</ul>
            </div>

            <div class="match-modal-section contra">
                <div class="match-modal-section-title">✗ Herausforderungen</div>
                <ul class="match-modal-list">${contraItems}</ul>
            </div>

            ${synthesisSection}
        `;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODAL OPEN
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Open match modal
     * @param {string} type - 'top' or 'challenge'
     */
    function open(type) {
        const matchData = type === 'top' ? currentTopMatch : currentChallenge;
        if (!matchData.id) return;

        // Set the modal context to use this match's partner
        modalContextPartner = matchData.id;

        // Get archetype data
        const currentArchetype = (typeof TiageState !== 'undefined')
            ? TiageState.get('ich.archetyp') || TiageState.get('paarung.ich.archetyp')
            : null;

        if (!currentArchetype || typeof data === 'undefined') {
            console.warn('[MatchModal] Missing data or currentArchetype');
            return;
        }

        const myArch = data.archetypes[currentArchetype];
        const partnerArch = data.archetypes[matchData.id];
        const interactionKey = `${currentArchetype}_${matchData.id}`;
        const interaction = data.interactions[interactionKey] || {};
        const scores = interaction.scores || {};

        const title = type === 'top' ? 'Top Match' : 'Challenge';
        const scoreColor = (typeof TiageChartUtils !== 'undefined')
            ? TiageChartUtils.getScoreColor(matchData.score)
            : '#888';

        // Store data for toggle refresh
        currentMatchModalData = {
            myArch,
            partnerArch,
            interaction,
            scores,
            scoreColor
        };

        // Initialize toggle buttons to current view state
        setTimeout(() => {
            const pathosBtn = document.getElementById('matchTogglePathos');
            const logosBtn = document.getElementById('matchToggleLogos');
            if (pathosBtn && logosBtn) {
                pathosBtn.classList.toggle('active', currentMatchModalView === 'pathos');
                logosBtn.classList.toggle('active', currentMatchModalView === 'logos');
            }
        }, 0);

        // Set modal content
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const categoryModal = document.getElementById('categoryModal');

        if (modalTitle && modalBody && categoryModal) {
            modalTitle.textContent = `${myArch.name} + ${partnerArch.name}`;
            modalBody.innerHTML = getModalContent(partnerArch, interaction, scores, scoreColor, myArch);
            categoryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE EXPORT
    // ═══════════════════════════════════════════════════════════════════════

    TiageMatching.MatchModal = {
        // Lifecycle
        open: open,

        // State Setters
        setTopMatch: setTopMatch,
        setChallenge: setChallenge,
        setModalContextPartner: setModalContextPartner,

        // State Getters
        getTopMatch: getTopMatch,
        getChallenge: getChallenge,
        getModalContextPartner: getModalContextPartner,

        // View Toggle
        toggleView: toggleView,

        // Content Generation (for testing/external use)
        getModalContent: getModalContent,
        generateDynamicPro: generateDynamicPro,
        generateDynamicContra: generateDynamicContra,
        generateSynthesisSection: generateSynthesisSection
    };

    // ═══════════════════════════════════════════════════════════════════════
    // BACKWARDS COMPATIBILITY - Global function aliases
    // ═══════════════════════════════════════════════════════════════════════

    if (typeof window !== 'undefined') {
        // Expose module
        window.TiageMatching = TiageMatching;

        // Legacy function names for existing onclick handlers
        window.openMatchModal = open;
        window.toggleMatchModalView = toggleView;
    }

})();

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageMatching.MatchModal;
}
