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
 *
 * NEU: Verwendet AttributeSummaryCard statt TripleButtonGroup
 * Attribute zeigen nur die zugehörigen Bedürfnisse als Zusammenfassung
 */
const ProfileReviewRenderer = (function() {
    'use strict';

    /**
     * Rendert eine einzelne Kategorie mit allen Attributen
     * @param {string} category - Kategorie-Key
     * @returns {string} HTML-String
     */
    function renderCategory(category) {
        if (category === 'gewichtung') {
            return renderGewichtungSection();
        }

        const categoryInfo = ProfileReviewConfig.getCategory(category);
        const attributes = ProfileReviewConfig.getAttributes(category);

        if (!categoryInfo || !attributes.length) return '';

        // NEU: Verwende AttributeSummaryCard statt TripleButtonGroup
        const cardsHtml = attributes.map(attr => {
            // Prüfe ob AttributeSummaryCard verfügbar ist
            if (typeof AttributeSummaryCard !== 'undefined' &&
                AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attr.attrId]) {
                return AttributeSummaryCard.render(attr);
            }
            // Fallback auf TripleButtonGroup für nicht gemappte Attribute
            return TripleButtonGroup.render(attr);
        }).join('\n');

        return CategorySection.render({
            category,
            icon: categoryInfo.icon,
            label: categoryInfo.label,
            content: cardsHtml,
            itemCount: attributes.length
        });
    }

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
     * Rendert den gesamten Modal-Body
     * @returns {string} HTML-String
     */
    function renderModalBody() {
        const categories = ProfileReviewConfig.getCategoryOrder();
        return categories.map(renderCategory).join('\n\n');
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
     * Initialisiert das Profile-Review-Modal mit dynamischem Content
     * Wird aufgerufen wenn das Modal zum ersten Mal geöffnet wird
     */
    function initializeModal() {
        // Use dedicated content container to preserve source-explanation
        const contentContainer = document.getElementById('profileReviewContent');
        if (!contentContainer) {
            console.warn('ProfileReviewRenderer: Content container not found');
            return;
        }

        // Prüfe ob bereits initialisiert
        if (contentContainer.dataset.initialized === 'true') {
            return;
        }

        // Generiere und setze Content
        contentContainer.innerHTML = renderModalBody() + '\n                <div style="height: 20px;"></div>';
        contentContainer.dataset.initialized = 'true';

        console.log('ProfileReviewRenderer: Modal initialized');
    }

    /**
     * Sammelt alle Werte aus dem Modal
     * @returns {Object} Alle Attribut-Werte
     */
    function collectAllValues() {
        const values = {};
        const attributes = ProfileReviewConfig.getAllAttributes();

        attributes.forEach(attr => {
            // NEU: Verwende AttributeSummaryCard wenn verfügbar
            if (typeof AttributeSummaryCard !== 'undefined' &&
                AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attr.attrId]) {
                values[attr.attrId] = {
                    aggregated: AttributeSummaryCard.getValue(attr.attrId),
                    needs: AttributeSummaryCard.getNeedsValues(attr.attrId)
                };
            } else {
                values[attr.attrId] = TripleButtonGroup.getValue(attr.attrId);
            }
        });

        // Gewichtungen hinzufügen
        values.gewichtungen = GewichtungCard.getAllValues();

        return values;
    }

    /**
     * Setzt alle Werte im Modal
     * @param {Object} values - Attribut-Werte
     */
    function setAllValues(values) {
        Object.entries(values).forEach(([attrId, value]) => {
            if (attrId === 'gewichtungen') {
                Object.entries(value).forEach(([factor, factorValue]) => {
                    GewichtungCard.setValue(factor, factorValue);
                });
            } else if (typeof value === 'object' && value.needs) {
                // NEU: Setze Bedürfniswerte für AttributeSummaryCard
                if (typeof AttributeSummaryCard !== 'undefined') {
                    AttributeSummaryCard.setNeedsValues(attrId, value.needs);
                }
            } else {
                TripleButtonGroup.setValue(attrId, value);
            }
        });

        GewichtungCard.updateSum();
    }

    /**
     * Berechnet den Default-Wert für ein Attribut basierend auf dem Archetyp-Profil
     * und zusätzlichen Profil-Faktoren (Geschlechtsidentität, Dominanz, Orientierung)
     * @param {string} attrId - Attribut-ID (z.B. 'pr-kinder')
     * @param {string} archetypeKey - Archetyp-Key (z.B. 'single', 'duo')
     * @param {Object} profileContext - Optional: Zusätzliche Profil-Daten für Modifier
     * @returns {number} Berechneter Default-Wert (0-100)
     */
    function getDefaultFromArchetype(attrId, archetypeKey, profileContext) {
        // Fallback wenn keine Daten verfügbar
        if (!archetypeKey || !window.LoadedArchetypProfile) {
            return 50;
        }

        const archetype = window.LoadedArchetypProfile[archetypeKey];
        if (!archetype || !archetype.kernbeduerfnisse) {
            console.warn('[ProfileReview] Archetyp nicht gefunden:', archetypeKey);
            return 50;
        }

        // Hole die gemappten Bedürfnisse für dieses Attribut
        if (typeof AttributeSummaryCard === 'undefined' ||
            !AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attrId]) {
            return 50;
        }

        const mapping = AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attrId];
        const needs = mapping.needs || [];

        if (needs.length === 0) {
            return 50;
        }

        // Berechne Durchschnitt der Bedürfniswerte aus dem Archetyp-Profil
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

        // NEU: Wende Profil-Modifier an (Geschlechtsidentität, Dominanz, Orientierung)
        if (window.ProfileModifiers && profileContext) {
            const deltas = window.ProfileModifiers.calculateProfileDeltas(profileContext);

            // Prüfe ob einer der gemappten Bedürfnisse einen Delta hat
            let deltaSum = 0;
            let deltaCount = 0;

            needs.forEach(needId => {
                // Versuche verschiedene Schreibweisen des Bedürfnisnamens
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
                const originalAverage = average;
                average = Math.min(100, Math.max(0, average + avgDelta));
                console.log(`[ProfileReview] Modifier-Delta für ${attrId}: ${avgDelta} (${originalAverage} → ${average})`);
            }
        }

        console.log(`[ProfileReview] Default für ${attrId} (${archetypeKey}): ${average} (aus ${count} Bedürfnissen)`);
        return average;
    }

    /**
     * Setzt alle Werte auf Standard zurück (basierend auf aktuellem Archetyp + Profil-Modifier)
     * @param {string} archetypeKey - Optional: Archetyp-Key für Defaults
     * @param {Object} profileContext - Optional: Profil-Daten für Modifier (geschlecht, dominanz, orientierung)
     */
    function resetAllValues(archetypeKey, profileContext) {
        // Versuche Archetyp aus Kontext zu holen wenn nicht übergeben
        if (!archetypeKey && typeof currentProfileReviewContext !== 'undefined') {
            archetypeKey = currentProfileReviewContext.archetypeKey;
        }

        // Versuche Profil-Kontext zu bauen wenn nicht übergeben
        if (!profileContext && typeof currentProfileReviewContext !== 'undefined') {
            profileContext = {
                geschlecht: currentProfileReviewContext.geschlecht,
                dominanz: currentProfileReviewContext.dominanz,
                orientierung: currentProfileReviewContext.orientierung
            };
        }

        const attributes = ProfileReviewConfig.getAllAttributes();

        attributes.forEach(attr => {
            // Berechne Default aus Archetyp-Profil + Modifier
            const defaultValue = getDefaultFromArchetype(attr.attrId, archetypeKey, profileContext);

            // NEU: Reset für AttributeSummaryCard
            if (typeof AttributeSummaryCard !== 'undefined' &&
                AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attr.attrId]) {
                AttributeSummaryCard.reset(attr.attrId, defaultValue);
            } else {
                TripleButtonGroup.setValue(attr.attrId, defaultValue);
            }
        });

        GewichtungCard.reset();

        // Log mit Modifier-Info
        const modifierInfo = profileContext && window.ProfileModifiers
            ? ` + Modifier (${profileContext.geschlecht?.primary || 'n/a'}-${profileContext.geschlecht?.secondary || 'n/a'})`
            : '';
        console.log('[ProfileReview] Alle Werte zurückgesetzt auf Archetyp-Defaults:', archetypeKey || 'standard', modifierInfo);
    }

    /**
     * Rendert den Modal-Body mit FLACHER Bedürfnis-Darstellung
     * Zeigt alle Bedürfnisse aus dem Archetyp-Profil gruppiert nach GFK-Kategorien
     *
     * @param {string} archetyp - Archetyp-ID (z.B. 'polyamor', 'solopoly')
     * @param {string} archetypLabel - Anzeige-Label des Archetyps
     * @returns {string} HTML-String
     */
    function renderFlatModalBody(archetyp, archetypLabel) {
        if (typeof AttributeSummaryCard === 'undefined' || !AttributeSummaryCard.renderAllNeedsFlat) {
            console.warn('ProfileReviewRenderer: AttributeSummaryCard.renderAllNeedsFlat nicht verfügbar');
            return renderModalBody(); // Fallback auf alte Darstellung
        }

        // Gewichtungs-Sektion am Anfang
        const gewichtungHtml = renderGewichtungSection();

        // Flache Bedürfnis-Darstellung
        const flatNeedsHtml = AttributeSummaryCard.renderAllNeedsFlat(archetyp, archetypLabel);

        return gewichtungHtml + '\n' + flatNeedsHtml;
    }

    /**
     * Initialisiert das Modal mit FLACHER Bedürfnis-Darstellung
     *
     * @param {string} archetyp - Archetyp-ID
     * @param {string} archetypLabel - Anzeige-Label des Archetyps
     */
    function initializeFlatModal(archetyp, archetypLabel) {
        const contentContainer = document.getElementById('profileReviewContent');
        if (!contentContainer) {
            console.warn('ProfileReviewRenderer: Content container not found');
            return;
        }

        // Force re-initialization for flat view
        contentContainer.dataset.initialized = 'false';
        contentContainer.dataset.viewMode = 'flat';
        contentContainer.dataset.archetyp = archetyp;

        // Generiere flachen Content
        contentContainer.innerHTML = renderFlatModalBody(archetyp, archetypLabel) +
            '\n<div style="height: 20px;"></div>';
        contentContainer.dataset.initialized = 'true';

        console.log('ProfileReviewRenderer: Flat modal initialized for', archetyp);
    }

    /**
     * Sammelt alle Werte aus der FLACHEN Darstellung
     * @returns {Object} Alle Bedürfniswerte
     */
    function collectFlatValues() {
        if (typeof AttributeSummaryCard === 'undefined') {
            return {};
        }

        return {
            needs: AttributeSummaryCard.getFlatNeedsValues(),
            lockedNeeds: AttributeSummaryCard.getFlatLockedNeeds(),
            gewichtungen: GewichtungCard.getAllValues()
        };
    }

    return {
        renderCategory,
        renderGewichtungSection,
        renderModalBody,
        renderModalFooter,
        initializeModal,
        collectAllValues,
        setAllValues,
        resetAllValues,
        getDefaultFromArchetype,
        // NEU: Flache Darstellung
        renderFlatModalBody,
        initializeFlatModal,
        collectFlatValues
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TripleButtonGroup,
        ProfileCard,
        GewichtungCard,
        CategorySection,
        ProfileReviewConfig,
        ProfileReviewRenderer,
        AttributeSummaryCard
    };
}
