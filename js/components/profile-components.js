/**
 * PROFILE COMPONENTS - Export Bundle
 *
 * Zentrale Sammlung aller Profile-Review-Komponenten.
 * Lädt und initialisiert alle UI-Komponenten für das Profile-Review-Modal.
 *
 * Verwendung in HTML:
 * <script src="js/components/profile-components.js"></script>
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

/**
 * Profile Review Renderer
 * Generiert das gesamte Profile-Review-Modal aus Konfiguration
 */
const ProfileReviewRenderer = (function() {
    'use strict';

    /**
     * Rendert die Gewichtungs-Sektion
     * @returns {string} HTML-String
     */
    function renderGewichtungSection() {
        const categoryInfo = ProfileReviewConfig.getCategory('gewichtung');
        const content = GewichtungCard.renderAll() + GewichtungCard.renderFooter();

        return CategorySection.render({
            category: 'gewichtung',
            icon: categoryInfo.icon,
            label: categoryInfo.label,
            content,
            isGewichtung: true
        });
    }

    /**
     * Rendert die Resonanzfaktoren-Sektion
     * @returns {string} HTML-String
     */
    function renderResonanzSection() {
        if (typeof ResonanzCard === 'undefined') {
            return '';
        }

        const categoryInfo = ProfileReviewConfig.getCategory('resonanz');
        const content = ResonanzCard.renderAll() + ResonanzCard.renderFooter();

        return CategorySection.render({
            category: 'resonanz',
            icon: categoryInfo.icon,
            label: categoryInfo.label,
            content,
            isResonanz: true
        });
    }

    /**
     * Rendert den Modal-Footer mit Actions
     * @returns {string} HTML-String
     */
    function renderModalFooter() {
        return `
            <div class="profile-review-actions">
                <div class="profile-review-card" style="margin: 0; padding: 12px;">
                    <div class="profile-review-triple-buttons" style="grid-template-columns: 1fr 1fr;">
                        <button class="profile-review-triple-btn" onclick="resetProfileReview()">
                            🔄 <span data-i18n="profileReview.actions.reset">Zurücksetzen</span>
                        </button>
                        <button class="profile-review-triple-btn active" onclick="saveProfileReview()">
                            ✅ <span data-i18n="profileReview.actions.save">Weiter</span>
                        </button>
                    </div>
                </div>
            </div>`;
    }

    /**
     * Rendert den Modal-Body
     * @param {string} archetyp - Archetyp-ID (z.B. 'polyamor', 'solopoly')
     * @param {string} archetypLabel - Anzeige-Label des Archetyps
     * @returns {string} HTML-String
     */
    function renderModalBody(archetyp, archetypLabel) {
        // Gewichtungs-Sektion
        const gewichtungHtml = renderGewichtungSection();

        // Resonanz-Sektion wurde in den Header von "Alle Bedürfnisse" verschoben
        // und wird in AttributeSummaryCard.renderAllNeedsFlat() gerendert

        // Bedürfnis-Darstellung (enthält jetzt Resonanz-Anzeige im Header)
        let needsHtml = '';
        if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.renderAllNeedsFlat) {
            needsHtml = AttributeSummaryCard.renderAllNeedsFlat(archetyp, archetypLabel);
        }

        return gewichtungHtml + '\n' + needsHtml;
    }

    /**
     * Initialisiert das Profile-Review-Modal
     * @param {string} archetyp - Archetyp-ID
     * @param {string} archetypLabel - Anzeige-Label des Archetyps
     */
    function initializeModal(archetyp, archetypLabel) {
        const contentContainer = document.getElementById('profileReviewContent');
        if (!contentContainer) {
            console.warn('ProfileReviewRenderer: Content container not found');
            return;
        }

        // Speichere Archetyp für Re-Rendering
        contentContainer.dataset.archetyp = archetyp;

        // Generiere Content
        contentContainer.innerHTML = renderModalBody(archetyp, archetypLabel) +
            '\n<div style="height: 20px;"></div>';

        // Initialisiere Resonanzfaktoren-Anzeige und Filter nach DOM-Einfügung
        if (typeof AttributeSummaryCard !== 'undefined') {
            // Resonanzfaktoren-Anzeige wurde ausgeblendet (Duplikat)
            // if (AttributeSummaryCard.initResonanzDisplay) {
            //     AttributeSummaryCard.initResonanzDisplay();
            // }
            if (AttributeSummaryCard.initDimensionFilter) {
                AttributeSummaryCard.initDimensionFilter();
            }
        }

        console.log('ProfileReviewRenderer: Modal initialized for', archetyp);
    }

    /**
     * Sammelt alle Werte aus dem Modal
     * @returns {Object} Alle Bedürfniswerte
     */
    function collectAllValues() {
        if (typeof AttributeSummaryCard === 'undefined') {
            return {};
        }

        return {
            needs: AttributeSummaryCard.getFlatNeedsValues(),
            lockedNeeds: AttributeSummaryCard.getFlatLockedNeeds(),
            gewichtungen: GewichtungCard.getAllValues(),
            resonanz: typeof ResonanzCard !== 'undefined' ? ResonanzCard.getValues() : null
        };
    }

    /**
     * Berechnet den Default-Wert für ein Attribut basierend auf dem Archetyp-Profil
     * @param {string} attrId - Attribut-ID
     * @param {string} archetypeKey - Archetyp-Key
     * @param {Object} profileContext - Profil-Daten für Modifier
     * @returns {number} Berechneter Default-Wert (0-100)
     */
    function getDefaultFromArchetype(attrId, archetypeKey, profileContext) {
        if (!archetypeKey || !window.BaseArchetypProfile) {
            return 50;
        }

        const archetype = window.BaseArchetypProfile[archetypeKey];
        if (!archetype || !archetype.kernbeduerfnisse) {
            return 50;
        }

        if (typeof AttributeSummaryCard === 'undefined' ||
            !AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attrId]) {
            return 50;
        }

        const mapping = AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attrId];
        const needs = mapping.needs || [];

        if (needs.length === 0) {
            return 50;
        }

        let sum = 0;
        let count = 0;

        needs.forEach(needId => {
            const value = archetype.kernbeduerfnisse[needId];
            if (typeof value === 'number') {
                sum += value;
                count++;
            }
        });

        if (count === 0) {
            return 50;
        }

        let average = Math.round(sum / count);

        // Wende Profil-Modifier an
        if (window.ProfileModifiers && profileContext) {
            const deltas = window.ProfileModifiers.calculateProfileDeltas(profileContext);
            let deltaSum = 0;
            let deltaCount = 0;

            needs.forEach(needId => {
                const normalizedNeed = needId.toLowerCase().replace(/-/g, '_');
                if (deltas[needId] !== undefined) {
                    deltaSum += deltas[needId];
                    deltaCount++;
                } else if (deltas[normalizedNeed] !== undefined) {
                    deltaSum += deltas[normalizedNeed];
                    deltaCount++;
                }
            });

            if (deltaCount > 0) {
                const avgDelta = Math.round(deltaSum / deltaCount);
                average = Math.min(100, Math.max(0, average + avgDelta));
            }
        }

        return average;
    }

    /**
     * Setzt alle Werte auf Standard zurück
     * @param {string} archetypeKey - Archetyp-Key für Defaults
     * @param {Object} profileContext - Profil-Daten für Modifier
     */
    function resetAllValues(archetypeKey, profileContext) {
        if (!archetypeKey && typeof currentProfileReviewContext !== 'undefined') {
            archetypeKey = currentProfileReviewContext.archetypeKey;
        }

        if (!profileContext && typeof currentProfileReviewContext !== 'undefined') {
            profileContext = {
                geschlecht: currentProfileReviewContext.geschlecht,
                dominanz: currentProfileReviewContext.dominanz,
                orientierung: currentProfileReviewContext.orientierung
            };
        }

        GewichtungCard.reset();

        if (typeof ResonanzCard !== 'undefined') {
            ResonanzCard.reset();
        }

        console.log('[ProfileReview] Alle Werte zurückgesetzt');
    }

    // Rückwärtskompatibilität
    const initializeFlatModal = initializeModal;
    const renderFlatModalBody = renderModalBody;
    const collectFlatValues = collectAllValues;

    return {
        renderGewichtungSection,
        renderResonanzSection,
        renderModalBody,
        renderModalFooter,
        initializeModal,
        collectAllValues,
        resetAllValues,
        getDefaultFromArchetype,
        // Aliase für Rückwärtskompatibilität
        renderFlatModalBody,
        initializeFlatModal,
        collectFlatValues
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProfileReviewRenderer
    };
}
