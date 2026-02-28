/**
 * TIAGE Explanation Modals Module
 *
 * Handles explanation/info modals and soft warning UI.
 * Extracted from app-main.js as part of Extended Dimensions modularization.
 *
 * @module TiageExplanationModals
 * @version 1.0.0
 */
var TiageExplanationModals = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // SOFT WARNING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Zeigt eine freundliche Soft-Warning Card statt eines harten alert()
     * @param {Object} options - Konfiguration
     * @param {string} [options.title] - Titel der Warnung
     * @param {string} [options.message] - Hauptnachricht
     * @param {string} [options.detail] - Detail-Text (optional)
     * @param {Array} [options.examples] - Erlaubte Beispiele (optional)
     * @param {Function} [options.onClose] - Callback beim Schließen
     */
    function showSoftWarning(options = {}) {
        const {
            title = 'Hinweis',
            message = '',
            detail = '',
            examples = [],
            onClose = null
        } = options;

        // Overlay erstellen
        const overlay = document.createElement('div');
        overlay.className = 'soft-warning-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', title);

        // Card erstellen
        const card = document.createElement('div');
        card.className = 'soft-warning-card';

        // Icon
        const icon = document.createElement('div');
        icon.className = 'soft-warning-card__icon';
        icon.innerHTML = '💡';

        // Title
        const titleEl = document.createElement('h3');
        titleEl.className = 'soft-warning-card__title';
        titleEl.textContent = title;

        // Message
        const messageEl = document.createElement('p');
        messageEl.className = 'soft-warning-card__message';
        messageEl.textContent = message;

        // Detail (optional)
        let detailEl = null;
        if (detail) {
            detailEl = document.createElement('p');
            detailEl.className = 'soft-warning-card__detail';
            detailEl.textContent = detail;
        }

        // Examples (optional)
        let examplesEl = null;
        if (examples && examples.length > 0) {
            examplesEl = document.createElement('div');
            examplesEl.className = 'soft-warning-card__examples';

            const examplesTitle = document.createElement('span');
            examplesTitle.className = 'soft-warning-card__examples-title';
            examplesTitle.textContent = 'Aber erlaubt ist z.B.:';
            examplesEl.appendChild(examplesTitle);

            examples.forEach(example => {
                const item = document.createElement('div');
                item.className = 'soft-warning-card__example-item';
                item.textContent = example;
                examplesEl.appendChild(item);
            });
        }

        // Button
        const btn = document.createElement('button');
        btn.className = 'soft-warning-card__btn';
        btn.textContent = 'Verstanden';

        // Card zusammenbauen
        card.appendChild(icon);
        card.appendChild(titleEl);
        card.appendChild(messageEl);
        if (detailEl) card.appendChild(detailEl);
        if (examplesEl) card.appendChild(examplesEl);
        card.appendChild(btn);
        overlay.appendChild(card);

        // Zum Body hinzufügen
        document.body.appendChild(overlay);

        // Animation triggern
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('soft-warning-overlay--visible');
            });
        });

        // Close-Handler
        function handleClose() {
            overlay.classList.remove('soft-warning-overlay--visible');
            setTimeout(() => {
                overlay.remove();
                if (typeof onClose === 'function') {
                    onClose();
                }
            }, 250);
        }

        // Event-Listener
        btn.addEventListener('click', handleClose);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                handleClose();
            }
        });

        // Escape/Enter schließen
        function handleKeydown(e) {
            if (e.key === 'Escape' || e.key === 'Enter') {
                handleClose();
                document.removeEventListener('keydown', handleKeydown);
            }
        }
        document.addEventListener('keydown', handleKeydown);

        // Focus auf Button
        btn.focus();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PAARUNG EXPLANATION MODAL
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Öffnet das Paarung-Begriffserklärung Modal
     */
    function openPaarungExplanationModal(event) {
        if (event) event.stopPropagation();
        const modal = document.getElementById('paarungExplanationModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    /**
     * Schließt das Paarung-Begriffserklärung Modal
     */
    function closePaarungExplanationModal(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('paarungExplanationModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ATTRIBUTE DEFINITION MODAL
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Öffnet das Attribut-Definition Modal (für Profile-Review Attribute)
     * @param {string} attrId - Die ID des Attributs (z.B. 'pr-kinder')
     */
    function openAttributeDefinitionModal(attrId) {
        const modal = document.getElementById('attributeDefinitionModal');
        const body = document.getElementById('attributeDefinitionModalBody');
        const title = document.getElementById('attributeDefinitionModalTitle');

        if (!modal || !body) return;

        // Attribut-Definition mit Kategorie suchen
        const attr = typeof ProfileReviewConfig !== 'undefined'
            ? ProfileReviewConfig.findAttributeWithCategory(attrId)
            : null;

        if (!attr) {
            body.innerHTML = '<p style="color: var(--text-muted);">Keine Definition verfügbar.</p>';
            modal.classList.add('active');
            return;
        }

        // Titel setzen
        title.textContent = attr.label;

        // Optionen als Badges formatieren
        const optionsBadges = (attr.options || []).map(opt =>
            `<span style="display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.08); border-radius: 12px; font-size: 11px; color: var(--text-secondary);">${opt}</span>`
        ).join(' ');

        // Inhalt erstellen (ähnlich wie needDefinitionModal)
        body.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <!-- Kategorie-Badge -->
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 12px; height: 12px; border-radius: 50%; background: ${attr.kategorieColor};"></span>
                    <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">${attr.kategorie}</span>
                </div>

                <!-- Beschreibung -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; border-left: 3px solid ${attr.kategorieColor};">
                    <p style="font-size: 14px; line-height: 1.7; color: var(--text-primary); margin: 0;">${attr.description || 'Keine Beschreibung verfügbar.'}</p>
                </div>

                <!-- Optionen -->
                <div style="padding: 12px; background: rgba(139,92,246,0.08); border-radius: 8px; border: 1px solid rgba(139,92,246,0.2);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                        <strong style="font-size: 12px; color: #8B5CF6;">Mögliche Ausprägungen</strong>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${optionsBadges}
                    </div>
                </div>

                <!-- Beziehungs-Bezug -->
                <div style="padding: 12px; background: rgba(232,67,147,0.08); border-radius: 8px; border: 1px solid rgba(232,67,147,0.2);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                        <strong style="font-size: 12px; color: #E84393;">Paarung</strong>
                        <button onclick="openPaarungExplanationModal(event)" style="background: none; border: none; cursor: pointer; color: #E84393; font-size: 14px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s;" title="Was bedeutet Paarung?">ⓘ</button>
                    </div>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                        Unterschiedliche Präferenzen bei <strong>${attr.label}</strong> können Kompromisse erfordern – offene Kommunikation hilft dabei, gemeinsame Lösungen zu finden.
                    </p>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    /**
     * Schließt das Attribut-Definition Modal
     */
    function closeAttributeDefinitionModal(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('attributeDefinitionModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RESONANZ HELP MODAL
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Öffnet das Resonanzfaktor-Hilfe Modal
     * @param {string} rKey - Optional: Spezifischer R-Faktor (R1-R4) für Kurzform
     */
    function openResonanzHelpModal(rKey) {
        const modal = document.getElementById('resonanzHelpModal');
        const body = document.getElementById('resonanzHelpModalBody');
        const title = document.getElementById('resonanzHelpModalTitle');

        if (!modal || !body) return;

        // Hole Hilfe-Texte (check if TiageHelpTexts is loaded)
        if (typeof TiageHelpTexts === 'undefined') {
            console.warn('[TiageHelpTexts] nicht geladen - kann Resonanz-Hilfe nicht anzeigen');
            return;
        }

        let content = '';

        if (rKey && (rKey === 'R1' || rKey === 'R2' || rKey === 'R3' || rKey === 'R4')) {
            // Kurzform für einzelnen R-Faktor
            const quickHelp = TiageHelpTexts.getResonanzQuickHelp(rKey);
            title.textContent = quickHelp.titel;

            content = `
                <div style="font-size: 14px; line-height: 1.7; color: var(--text-primary);">
                    <p style="margin: 0 0 16px 0; padding: 12px; background: rgba(139,92,246,0.1); border-left: 3px solid #8B5CF6; border-radius: 4px;">
                        ${quickHelp.beschreibung}
                    </p>

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">Berechnungsformel</h3>
                    <pre style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; margin: 0 0 16px 0;">${quickHelp.formel}</pre>

                    <p style="margin: 0 0 16px 0; font-size: 13px; color: var(--text-secondary);">
                        Ø = Durchschnitt über alle 4 Perspektiven (#P1 GFK, #P2 Osho, #P3 Pirsig, #P4 Kink)
                    </p>

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">Einfluss auf Endscore</h3>
                    <pre style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; margin: 0 0 16px 0;">${quickHelp.einfluss}</pre>

                    <div style="margin: 20px 0 0 0; padding: 12px; background: rgba(234,179,8,0.1); border-left: 3px solid #eab308; border-radius: 4px; font-size: 13px;">
                        <strong>💡 Tipp:</strong> Klicke auf "Alle Details" unten, um die vollständige Erklärung mit Praxisbeispielen zu sehen.
                    </div>

                    <button class="profile-review-triple-btn" onclick="openResonanzHelpModal()" style="margin-top: 16px; width: 100%;">
                        📚 Alle Details anzeigen
                    </button>
                </div>
            `;
        } else {
            // Vollständige Erklärung
            const help = TiageHelpTexts.getResonanzCalculationExplanation();
            title.textContent = help.title;

            content = `
                <div style="font-size: 14px; line-height: 1.7; color: var(--text-primary);">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: var(--text-secondary);">
                        ${help.subtitle}
                    </p>

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">Übersicht</h3>
                    <p style="margin: 0 0 12px 0;">
                        ${help.overview.description}
                    </p>
                    <pre style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; margin: 0 0 8px 0;">${help.overview.formula}</pre>
                    <ul style="font-size: 13px; margin: 0 0 16px 0; padding-left: 20px; color: var(--text-secondary);">
                        <li>${help.overview.range.min}</li>
                        <li>${help.overview.range.neutral}</li>
                        <li>${help.overview.range.max}</li>
                    </ul>

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">${help.perspektiven.title}</h3>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: var(--text-secondary);">
                        ${help.perspektiven.description}
                    </p>
                    ${help.perspektiven.list.map(p => `
                        <div style="margin: 0 0 12px 0; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 6px; border-left: 3px solid rgba(139,92,246,0.5);">
                            <div style="font-weight: 600; margin-bottom: 4px;">${p.id} ${p.name}</div>
                            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">${p.beschreibung}</div>
                            <div style="font-size: 12px; color: var(--text-tertiary);"><em>Beispiele: ${p.beispiele}</em></div>
                        </div>
                    `).join('')}

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">${help.calculation.title}</h3>
                    ${help.calculation.steps.map(step => `
                        <div style="margin: 0 0 16px 0; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                            <div style="font-weight: 600; margin-bottom: 8px;">Schritt ${step.nr}: ${step.titel}</div>
                            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">${step.beschreibung}</div>
                            ${step.formel ? `<pre style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px; font-size: 11px; overflow-x: auto; margin: 0 0 8px 0;">${step.formel}</pre>` : ''}
                            ${step.beispiel && typeof step.beispiel === 'string' ? `
                                <div style="font-size: 12px; padding: 8px; background: rgba(234,179,8,0.1); border-radius: 4px; color: var(--text-tertiary);">
                                    <strong>Beispiel:</strong> ${step.beispiel}
                                </div>
                            ` : ''}
                            ${step.beispiel && typeof step.beispiel === 'object' && step.beispiel.titel ? `
                                <div style="font-size: 12px; padding: 8px; background: rgba(234,179,8,0.1); border-radius: 4px;">
                                    <div style="font-weight: 600; margin-bottom: 4px;">${step.beispiel.titel}</div>
                                    ${Object.keys(step.beispiel.perspektiveScores || {}).map(k => `
                                        <div style="margin: 2px 0; color: var(--text-tertiary);">${k}: ${step.beispiel.perspektiveScores[k]}</div>
                                    `).join('')}
                                    ${step.beispiel.durchschnitt ? `<div style="margin: 4px 0 2px 0; font-weight: 600;">→ ${step.beispiel.durchschnitt}</div>` : ''}
                                    ${step.beispiel.rWert ? `<div style="margin: 2px 0; font-weight: 600; color: #8B5CF6;">→ ${step.beispiel.rWert}</div>` : ''}
                                    ${step.beispiel.person1 ? `<div style="margin: 2px 0; color: var(--text-tertiary);">Person 1: ${step.beispiel.person1}</div>` : ''}
                                    ${step.beispiel.person2 ? `<div style="margin: 2px 0; color: var(--text-tertiary);">Person 2: ${step.beispiel.person2}</div>` : ''}
                                    ${step.beispiel.kombiniert ? `<div style="margin: 4px 0 0 0; font-weight: 600; color: #8B5CF6;">→ ${step.beispiel.kombiniert}</div>` : ''}
                                </div>
                            ` : ''}
                            ${step.interpretation ? `
                                <div style="font-size: 12px; margin-top: 8px; color: var(--text-secondary); font-style: italic;">
                                    💡 ${step.interpretation}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">${help.faktoren.title}</h3>
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: var(--text-secondary);">
                        ${help.faktoren.description}
                    </p>
                    ${help.faktoren.list.map(f => `
                        <div style="margin: 0 0 12px 0; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                            <div style="font-weight: 600; margin-bottom: 4px;">${f.id} ${f.name} ${f.sourceLabel}</div>
                            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">
                                Kategorien: ${f.kategorien.join(', ')}
                            </div>
                            <pre style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px; font-size: 11px; overflow-x: auto; margin: 0;">${f.einfluss}</pre>
                        </div>
                    `).join('')}

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">${help.praxisbeispiel.title}</h3>
                    <div style="padding: 12px; background: rgba(234,179,8,0.1); border-left: 3px solid #eab308; border-radius: 4px; margin-bottom: 16px;">
                        <div style="font-weight: 600; margin-bottom: 8px;">${help.praxisbeispiel.situation}</div>
                        ${help.praxisbeispiel.bedürfnisse.map(b => `
                            <div style="margin: 4px 0; font-size: 12px; color: var(--text-tertiary);">
                                • ${b.key} (${b.perspektive}): Archetyp ${b.solopoly}, Dein Wert ${b.dein} → Δ ${b.diff}
                            </div>
                        `).join('')}
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(234,179,8,0.3);">
                            <div style="font-weight: 600; margin-bottom: 4px;">Auswirkung:</div>
                            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">${help.praxisbeispiel.auswirkung.beschreibung}</div>
                            ${Object.keys(help.praxisbeispiel.auswirkung.perspektivenAuswertung).map(k => `
                                <div style="margin: 2px 0; font-size: 12px; color: var(--text-tertiary);">
                                    • ${k}: ${help.praxisbeispiel.auswirkung.perspektivenAuswertung[k]}
                                </div>
                            `).join('')}
                            <div style="margin-top: 8px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; font-size: 12px;">
                                <strong>💡 Empfehlung:</strong> ${help.praxisbeispiel.auswirkung.empfehlung}
                            </div>
                        </div>
                    </div>

                    <h3 style="font-size: 16px; font-weight: 600; margin: 20px 0 12px 0; color: #8B5CF6;">Wichtige Hinweise</h3>
                    <ul style="font-size: 13px; margin: 0; padding-left: 20px; color: var(--text-secondary);">
                        ${help.wichtigeHinweise.map(h => `<li style="margin-bottom: 8px;">${h}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        body.innerHTML = content;
        modal.classList.add('active');
    }

    /**
     * Schließt das Resonanzfaktor-Hilfe Modal
     */
    function closeResonanzHelpModal(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('resonanzHelpModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        showSoftWarning: showSoftWarning,
        openPaarungExplanationModal: openPaarungExplanationModal,
        closePaarungExplanationModal: closePaarungExplanationModal,
        openAttributeDefinitionModal: openAttributeDefinitionModal,
        closeAttributeDefinitionModal: closeAttributeDefinitionModal,
        openResonanzHelpModal: openResonanzHelpModal,
        closeResonanzHelpModal: closeResonanzHelpModal
    };
})();

// Global exports for backward compatibility
if (typeof window !== 'undefined') {
    window.TiageExplanationModals = TiageExplanationModals;
    window.showSoftWarning = TiageExplanationModals.showSoftWarning;
    window.openPaarungExplanationModal = TiageExplanationModals.openPaarungExplanationModal;
    window.closePaarungExplanationModal = TiageExplanationModals.closePaarungExplanationModal;
    window.openAttributeDefinitionModal = TiageExplanationModals.openAttributeDefinitionModal;
    window.closeAttributeDefinitionModal = TiageExplanationModals.closeAttributeDefinitionModal;
    window.openResonanzHelpModal = TiageExplanationModals.openResonanzHelpModal;
    window.closeResonanzHelpModal = TiageExplanationModals.closeResonanzHelpModal;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageExplanationModals;
}
