/**
 * RTI PRIORITIES MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet die RTI-Säulen Prioritäten (5 Säulen nach Petzold)
 * S1: Leiblichkeit, S2: Soziales Netzwerk, S3: Autonomie, S4: Sicherheit, S5: Werte
 *
 * 3-Wege-Gewichtung:
 *   0 = Egal (ignoriert)
 *   1 = Normal
 *   2 = Wichtig (doppelt)
 *
 * Speichert persistent in TiageState (überlebt Reload)
 *
 * @module TiageWeights.RTI
 */

var TiageWeights = TiageWeights || {};

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    const RTI_DEFAULT_PRIORITIES = { S1: 1, S2: 1, S3: 1, S4: 1, S5: 1 };

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let rtiPriorities = { ...RTI_DEFAULT_PRIORITIES };

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Lädt gespeicherte RTI-Prioritäten aus TiageState in die Toggles
     */
    function load() {
        if (typeof TiageState === 'undefined') return;

        // Load from TiageState
        const stored = TiageState.get('rtiPriorities');
        if (stored && typeof stored.S1 === 'number') {
            rtiPriorities = {
                S1: stored.S1 ?? 1,
                S2: stored.S2 ?? 1,
                S3: stored.S3 ?? 1,
                S4: stored.S4 ?? 1,
                S5: stored.S5 ?? 1
            };
            console.log('[RTI] Loaded priorities from TiageState:', rtiPriorities);
        }

        // Update UI
        updateUI();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Setzt eine RTI-Säulen Priorität (3-Wege-Toggle: 0=Egal, 1=Normal, 2=Wichtig)
     * @param {string} pillar - 'S1', 'S2', 'S3', 'S4', oder 'S5'
     * @param {number} value - 0, 1, oder 2
     */
    function set(pillar, value) {
        const parsed = parseInt(value);
        const numValue = Math.max(0, Math.min(2, isNaN(parsed) ? 1 : parsed));

        rtiPriorities[pillar] = numValue;
        updateUI();
        save();

        console.log('[RTI] Set priority:', pillar, '=', numValue);
    }

    /**
     * Reset all RTI priorities to default (all = 1)
     */
    function reset() {
        rtiPriorities = { ...RTI_DEFAULT_PRIORITIES };
        updateUI();
        save();
        console.log('[RTI] Priorities reset to defaults:', rtiPriorities);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get current RTI priorities
     * @returns {Object} { S1, S2, S3, S4, S5 } with values 0, 1, or 2
     */
    function get() {
        return { ...rtiPriorities };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PERSISTENCE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Speichert RTI-Prioritäten in TiageState (persistent)
     */
    function save() {
        if (typeof TiageState === 'undefined') return;

        TiageState.set('rtiPriorities', {
            S1: rtiPriorities.S1,
            S2: rtiPriorities.S2,
            S3: rtiPriorities.S3,
            S4: rtiPriorities.S4,
            S5: rtiPriorities.S5
        });
        TiageState.saveToStorage();
        console.log('[RTI] Priorities saved:', rtiPriorities);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // UI UPDATES
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Update RTI Toggle UI to reflect current priorities
     */
    function updateUI() {
        ['S1', 'S2', 'S3', 'S4', 'S5'].forEach(pillar => {
            const currentValue = rtiPriorities[pillar];
            const group = document.getElementById(`rtiToggle${pillar}`);
            if (group) {
                group.querySelectorAll('.agod-toggle-btn').forEach(btn => {
                    const btnValue = parseInt(btn.dataset.value, 10);
                    btn.classList.toggle('active', btnValue === currentValue);
                });
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // LEGACY COMPATIBILITY
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Legacy: Map old B227/B228 to new S1/S2
     */
    function updateReibungSlider(needId, value) {
        const pillarMap = { 'B227': 'S1', 'B228': 'S2' };
        const pillar = pillarMap[needId];
        if (pillar) {
            // Convert 0-100 to 0/1/2
            const newValue = value <= 33 ? 0 : (value >= 67 ? 2 : 1);
            set(pillar, newValue);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE EXPORT
    // ═══════════════════════════════════════════════════════════════════════

    TiageWeights.RTI = {
        // Constants
        DEFAULT_PRIORITIES: RTI_DEFAULT_PRIORITIES,

        // Lifecycle
        load: load,

        // Setters
        set: set,
        reset: reset,

        // Getters
        get: get,

        // Persistence
        save: save,

        // UI
        updateUI: updateUI,

        // Legacy
        updateReibungSlider: updateReibungSlider
    };

    // ═══════════════════════════════════════════════════════════════════════
    // RTI PILLAR DEFINITION MODAL
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * RTI-Säulen Definitionen (nach Petzold - 5 Säulen der Identität)
     */
    const RTI_PILLAR_DEFINITIONS = {
        S1: {
            id: 'S1',
            label: 'Leiblichkeit',
            emoji: '🫀',
            color: '#E84393',
            beschreibung: 'Körper, Gesundheit, Sexualität, körperliche Nähe',
            details: 'Die Säule der Leiblichkeit umfasst alle körperlichen Aspekte einer Beziehung: körperliche Anziehung, Sexualität, Gesundheit, Sport und Fitness, sowie das Bedürfnis nach körperlicher Nähe und Berührung.',
            beispiele: [
                'Körperliche Anziehung und sexuelle Kompatibilität',
                'Gemeinsame Aktivitäten wie Sport oder Tanzen',
                'Bedürfnis nach Umarmungen und körperlicher Nähe',
                'Gesundheitsbewusstsein und Lifestyle'
            ],
            quelle: 'RTI nach Hilarion Petzold'
        },
        S2: {
            id: 'S2',
            label: 'Soziales Netzwerk',
            emoji: '👥',
            color: '#3B82F6',
            beschreibung: 'Beziehungsform, Freunde, Familie, soziales Leben',
            details: 'Diese Säule betrifft die sozialen Strukturen und Netzwerke: Wie möchten beide Partner ihre Beziehung gestalten (mono/poly)? Wie wichtig sind Freunde und Familie? Wie integriert sich die Beziehung in das soziale Umfeld?',
            beispiele: [
                'Beziehungsform: Monogamie vs. Polyamorie',
                'Integration von Freunden und Familie',
                'Gemeinsame vs. getrennte Freundeskreise',
                'Soziale Aktivitäten und Events'
            ],
            quelle: 'RTI nach Hilarion Petzold'
        },
        S3: {
            id: 'S3',
            label: 'Autonomie & Leistung',
            emoji: '🎯',
            color: '#22c55e',
            beschreibung: 'Selbstverwirklichung, Kreativität, Machtdynamik, Arbeit',
            details: 'Diese Säule umfasst Karriere, persönliche Ziele, Selbstverwirklichung und die Machtdynamik in der Beziehung. Wie viel Raum hat jeder Partner für eigene Projekte? Wie werden Entscheidungen getroffen?',
            beispiele: [
                'Karriereziele und berufliche Entwicklung',
                'Persönliche Hobbys und Projekte',
                'Entscheidungsmacht in der Beziehung',
                'Work-Life-Balance Vorstellungen'
            ],
            quelle: 'RTI nach Hilarion Petzold'
        },
        S4: {
            id: 'S4',
            label: 'Sicherheit & Stabilität',
            emoji: '🛡️',
            color: '#f59e0b',
            beschreibung: 'Lebensplanung, Wohnen, Praktisches, Alltag, Materielles',
            details: 'Die Säule der materiellen Sicherheit: Finanzielle Planung, Wohnsituation, gemeinsamer Alltag, Zukunftsplanung. Wie wichtig ist beiden Partnern Stabilität und Sicherheit im Leben?',
            beispiele: [
                'Finanzielle Ziele und Umgang mit Geld',
                'Wohnsituation: Stadt/Land, Miete/Eigentum',
                'Kinderwunsch und Familienplanung',
                'Alltagsorganisation und Haushaltsführung'
            ],
            quelle: 'RTI nach Hilarion Petzold'
        },
        S5: {
            id: 'S5',
            label: 'Werte & Sinn',
            emoji: '💫',
            color: '#8b5cf6',
            beschreibung: 'Weltanschauung, Spiritualität, Kommunikation, tiefes Verstehen',
            details: 'Die tiefste Säule der Identität: Grundwerte, Lebensphilosophie, Spiritualität, und die Fähigkeit zur tiefen Kommunikation. Teilen beide Partner ähnliche Grundüberzeugungen und können sie sich auf einer tiefen Ebene verstehen?',
            beispiele: [
                'Grundlegende Lebenswerte und Ethik',
                'Spiritualität oder religiöse Überzeugungen',
                'Kommunikationsstil und emotionale Tiefe',
                'Sinn und Bedeutung im Leben'
            ],
            quelle: 'RTI nach Hilarion Petzold'
        }
    };

    /**
     * Öffnet das RTI-Säulen Definition Modal
     * @param {string} pillarKey - 'S1', 'S2', 'S3', 'S4', oder 'S5'
     */
    function openPillarModal(pillarKey) {
        const pillar = RTI_PILLAR_DEFINITIONS[pillarKey];
        if (!pillar) {
            console.error('[RTI] Unknown pillar:', pillarKey);
            return;
        }

        const modal = document.getElementById('rtiPillarModal');
        const title = document.getElementById('rtiPillarModalTitle');
        const body = document.getElementById('rtiPillarModalBody');

        if (!modal || !title || !body) {
            console.error('[RTI] Modal elements not found');
            return;
        }

        // Set color CSS variable
        modal.style.setProperty('--rti-color', pillar.color);

        // Set title
        title.innerHTML = `${pillar.emoji} ${pillar.id}: ${pillar.label}`;
        title.style.color = pillar.color;

        // Build content
        const beispieleHtml = pillar.beispiele.map(b => `<li>${b}</li>`).join('');

        body.innerHTML = `
            <div style="margin-bottom: 16px;">
                <p style="font-size: 14px; color: var(--text-primary); margin: 0 0 8px 0; font-weight: 500;">
                    ${pillar.beschreibung}
                </p>
            </div>
            <div style="margin-bottom: 16px;">
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin: 0;">
                    ${pillar.details}
                </p>
            </div>
            <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                <p style="font-size: 11px; color: ${pillar.color}; margin: 0 0 8px 0; font-weight: 600;">Beispiele:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: var(--text-secondary); line-height: 1.8;">
                    ${beispieleHtml}
                </ul>
            </div>
            <p style="font-size: 10px; color: rgba(255,255,255,0.4); margin: 0; text-align: right;">
                Quelle: ${pillar.quelle}
            </p>
        `;

        // Show modal
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Schließt das RTI-Säulen Definition Modal
     * @param {Event} event - Das Click-Event
     */
    function closePillarModal(event) {
        if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
            return;
        }
        const modal = document.getElementById('rtiPillarModal');
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // BACKWARDS COMPATIBILITY - Global function aliases
    // ═══════════════════════════════════════════════════════════════════════

    if (typeof window !== 'undefined') {
        // Expose module
        window.TiageWeights = TiageWeights;

        // Legacy function names for existing onclick handlers
        window.loadRtiPriorities = load;
        window.loadReibungValues = load; // Legacy alias
        window.setRtiPriority = set;
        window.getRtiPriorities = get;
        window.saveRtiPriorities = save;
        window.updateRtiToggleUI = updateUI;
        window.updateReibungSlider = updateReibungSlider;

        // RTI Pillar Modal functions
        window.openRtiPillarModal = openPillarModal;
        window.closeRtiPillarModal = closePillarModal;
    }

    // Node.js export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TiageWeights.RTI;
    }

})();
