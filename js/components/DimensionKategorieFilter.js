/**
 * DIMENSION-KATEGORIE-FILTER KOMPONENTE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Universeller 2-Ebenen-Filter für Bedürfnisse:
 * - Ebene 1: 6 Dimensionen (A-F) - Beziehung, Werte, Nähe, Freiheit, Kommunikation, Soziales
 * - Ebene 2: 18 Kategorien - Dynamisch basierend auf gewählter Dimension
 *
 * Verwendbar in:
 * - Alle Bedürfnisse (AttributeSummaryCard)
 * - Synthese (GFK-Bedürfnisanalyse)
 * - Bedürfnis-Match mit Differenz
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const DimensionKategorieFilter = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Resonanz-Dimensionen (R1-R4) für Filter
     */
    const DIMENSIONEN = {
        'R1': {
            id: 'R1',
            key: 'leben',
            kurzform: 'R1',
            label: 'Leben',
            icon: '🔥',
            color: '#E63946',
            beschreibung: 'Orientierung - Existenz, Zuneigung, Muße'
        },
        'R2': {
            id: 'R2',
            key: 'philosophie',
            kurzform: 'R2',
            label: 'Philosophie',
            icon: '🧠',
            color: '#2A9D8F',
            beschreibung: 'Archetyp - Lebensplanung, Finanzen, Werte'
        },
        'R3': {
            id: 'R3',
            key: 'dynamik',
            kurzform: 'R3',
            label: 'Dynamik',
            icon: '⚡',
            color: '#8B5CF6',
            beschreibung: 'Dominanz - Kontrolle, Hingabe, Macht'
        },
        'R4': {
            id: 'R4',
            key: 'identitaet',
            kurzform: 'R4',
            label: 'Identität',
            icon: '💚',
            color: '#F4A261',
            beschreibung: 'Geschlecht - Authentizität, Selbstausdruck'
        }
    };

    /**
     * Kategorien gruppiert nach Resonanz-Dimensionen
     * Mapping: R1-R4 → Kategorien aus Taxonomie
     */
    const KATEGORIEN_PRO_DIMENSION = {
        'R1': [
            { id: '#K1', key: 'existenz', label: 'Existenz', beschreibung: 'Grundbedürfnisse: Atmen, Essen, Schlafen', color: '#E63946' },
            { id: '#K3', key: 'zuneigung', label: 'Zuneigung', beschreibung: 'Liebe, Nähe, emotionale Verbindung', color: '#E84393' },
            { id: '#K7', key: 'musse', label: 'Muße', beschreibung: 'Erholung, Freude und Genuss', color: '#118AB2' },
            { id: '#K16', key: 'intimitaet_romantik', label: 'Intimität & Romantik', beschreibung: 'Körperliche Nähe, Sex, Romantik', color: '#EC4899' }
        ],
        'R2': [
            { id: '#K12', key: 'lebensplanung', label: 'Lebensplanung', beschreibung: 'Kinder, Ehe, Wohnen, Familie', color: '#10B981' },
            { id: '#K13', key: 'finanzen_karriere', label: 'Finanzen & Karriere', beschreibung: 'Geld, Beruf, Work-Life-Balance', color: '#F59E0B' },
            { id: '#K17', key: 'werte_haltungen', label: 'Werte & Haltungen', beschreibung: 'Religion, Tradition, Umwelt', color: '#6366F1' },
            { id: '#K15', key: 'soziales_leben', label: 'Soziales Leben', beschreibung: 'Intro/Extroversion, Freunde', color: '#8B5CF6' },
            { id: '#K18', key: 'praktisches_leben', label: 'Praktisches Leben', beschreibung: 'Ordnung, Reisen, Alltag', color: '#14B8A6' }
        ],
        'R3': [
            { id: '#K11', key: 'dynamik', label: 'Dynamik & Austausch', beschreibung: 'Machtdynamik, BDSM/Kink', color: '#8B5CF6' },
            { id: '#K2', key: 'sicherheit', label: 'Sicherheit', beschreibung: 'Emotionale und psychische Sicherheit', color: '#F4A261' }
        ],
        'R4': [
            { id: '#K4', key: 'verstaendnis', label: 'Verständnis', beschreibung: 'Gesehen und verstanden werden', color: '#9B5DE5' },
            { id: '#K9', key: 'erschaffen', label: 'Kreativität & Erschaffen', beschreibung: 'Kreativität und Lernen', color: '#FF6B6B' },
            { id: '#K10', key: 'verbundenheit', label: 'Verbundenheit', beschreibung: 'Tiefe existenzielle Verbindung', color: '#A8DADC' },
            { id: '#K14', key: 'kommunikation_stil', label: 'Kommunikationsstil', beschreibung: 'Gespräche, Emotionen, Konflikte', color: '#3B82F6' }
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    let activeDimension = null;  // Aktuell gewählte Dimension (null = Alle)
    let activeKategorie = null;  // Aktuell gewählte Kategorie (null = Alle)
    let containerId = null;      // Container-ID für Rendering

    // ═══════════════════════════════════════════════════════════════════════════
    // FILTER-LOGIK
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Prüft ob ein Bedürfnis durch die aktuellen Filter passiert
     * @param {string} needId - Bedürfnis-ID (#B1-#B220)
     * @returns {boolean} true wenn Bedürfnis angezeigt werden soll
     */
    function shouldShowNeed(needId) {
        // Kein Filter aktiv → Alles anzeigen
        if (!activeDimension && !activeKategorie) {
            return true;
        }

        // Hole Bedürfnis-Metadaten
        const need = getNeedMetadata(needId);
        if (!need) return true; // Fallback: Anzeigen wenn keine Metadaten

        // Kategorie-Filter aktiv → Nur Bedürfnisse dieser Kategorie
        if (activeKategorie) {
            return need.kategorieId === activeKategorie;
        }

        // Dimensions-Filter aktiv → Nur Bedürfnisse deren Kategorien zu dieser Dimension gehören
        if (activeDimension) {
            return need.dimensionId === activeDimension;
        }

        return true;
    }

    /**
     * Holt Metadaten für ein Bedürfnis (Dimension, Kategorie)
     * @param {string} needId - Bedürfnis-ID (#B1-#B220)
     * @returns {object} {dimensionId, kategorieId, kategorieKey}
     */
    function getNeedMetadata(needId) {
        // Versuche BeduerfnisIds und TiageTaxonomie zu laden
        const beduerfnisIds = typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds : null;
        const taxonomie = typeof TiageTaxonomie !== 'undefined' ? TiageTaxonomie : null;

        if (!beduerfnisIds || !beduerfnisIds.beduerfnisse || !taxonomie) {
            return null;
        }

        const need = beduerfnisIds.beduerfnisse[needId];
        if (!need || !need.kategorie) {
            return null;
        }

        // Hole Kategorie-Info
        const kategorie = taxonomie.kategorien?.[need.kategorie];
        if (!kategorie) {
            return null;
        }

        return {
            dimensionId: kategorie.dimension,  // z.B. '#D3'
            kategorieId: need.kategorie,       // z.B. '#K3'
            kategorieKey: kategorie.key        // z.B. 'zuneigung'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert den kompletten Filter (Ebene 1 + Ebene 2)
     * @param {string} container - Container-Selektor oder ID
     * @returns {string} HTML-String
     */
    function render(container) {
        containerId = container;

        let html = '<div class="dimension-kategorie-filter">';

        // Ebene 1: Dimensionen
        html += renderDimensionBar();

        // Ebene 2: Kategorien (nur sichtbar wenn Dimension gewählt)
        html += renderKategorieBar();

        html += '</div>';

        return html;
    }

    /**
     * Rendert die Resonanz-Dimensions-Buttons (Ebene 1)
     */
    function renderDimensionBar() {
        const allActive = !activeDimension ? ' active' : '';

        let html = `
        <div class="dimension-filter-bar">
            <span class="filter-label">Resonanz:</span>
            <button class="dimension-btn${allActive}"
                    data-dim="alle"
                    onclick="DimensionKategorieFilter.setDimension(null)"
                    title="Alle Resonanzbereiche anzeigen">
                Alle
            </button>`;

        // Resonanz-Dimensions-Buttons
        for (const dimId in DIMENSIONEN) {
            const dim = DIMENSIONEN[dimId];
            const isActive = activeDimension === dimId ? ' active' : '';
            html += `
            <button class="dimension-btn${isActive}"
                    data-dim="${dim.id}"
                    onclick="DimensionKategorieFilter.setDimension('${dim.id}')"
                    style="--dimension-color: ${dim.color};"
                    title="${dim.beschreibung}">
                <span class="dim-icon">${dim.icon}</span>
                <span class="dim-label">${dim.label}</span>
            </button>`;
        }

        html += '</div>';
        return html;
    }

    /**
     * Rendert die Kategorien-Buttons (Ebene 2)
     */
    function renderKategorieBar() {
        // Nur anzeigen wenn Dimension gewählt
        if (!activeDimension) {
            return '<div class="kategorie-filter-bar" style="display: none;"></div>';
        }

        const kategorien = KATEGORIEN_PRO_DIMENSION[activeDimension] || [];
        const allActive = !activeKategorie ? ' active' : '';
        const dimension = DIMENSIONEN[activeDimension];

        let html = `
        <div class="kategorie-filter-bar" style="display: flex;">
            <span class="filter-label">Kategorie:</span>
            <button class="kategorie-btn${allActive}"
                    data-kat="alle"
                    onclick="DimensionKategorieFilter.setKategorie(null)"
                    title="Alle Kategorien in ${dimension.label}">
                Alle
            </button>`;

        // Kategorien-Buttons
        kategorien.forEach(kat => {
            const isActive = activeKategorie === kat.id ? ' active' : '';
            html += `
            <button class="kategorie-btn${isActive}"
                    data-kat="${kat.id}"
                    onclick="DimensionKategorieFilter.setKategorie('${kat.id}')"
                    style="--kategorie-color: ${kat.color};"
                    title="${kat.beschreibung}">
                <span class="kat-label">${kat.label}</span>
                <span class="kat-id">${kat.id}</span>
            </button>`;
        });

        html += '</div>';
        return html;
    }

    /**
     * Re-rendert den Filter (nach State-Änderung)
     */
    function reRender() {
        if (!containerId) return;

        const container = document.querySelector(containerId);
        if (!container) return;

        const newHtml = render(containerId);
        const temp = document.createElement('div');
        temp.innerHTML = newHtml;
        const newFilter = temp.firstElementChild;

        if (newFilter) {
            const oldFilter = container.querySelector('.dimension-kategorie-filter');
            if (oldFilter) {
                oldFilter.replaceWith(newFilter);
            } else {
                container.insertAdjacentElement('afterbegin', newFilter);
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Setzt die aktive Dimension
     * @param {string|null} dimensionId - '#D1' bis '#D6' oder null für Alle
     */
    function setDimension(dimensionId) {
        activeDimension = dimensionId;
        activeKategorie = null; // Reset Kategorie-Filter

        // Re-render Filter
        reRender();

        // Event feuern
        dispatchFilterChange();
    }

    /**
     * Setzt die aktive Kategorie
     * @param {string|null} kategorieId - '#K1' bis '#K18' oder null für Alle
     */
    function setKategorie(kategorieId) {
        activeKategorie = kategorieId;

        // Re-render Filter
        reRender();

        // Event feuern
        dispatchFilterChange();
    }

    /**
     * Feuert ein Custom Event bei Filter-Änderung
     */
    function dispatchFilterChange() {
        const event = new CustomEvent('dimensionKategorieFilterChange', {
            bubbles: true,
            detail: {
                dimension: activeDimension,
                kategorie: activeKategorie,
                dimensionInfo: activeDimension ? DIMENSIONEN[activeDimension] : null,
                kategorieInfo: activeKategorie ? getKategorieInfo(activeKategorie) : null
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Holt Kategorie-Info nach ID
     */
    function getKategorieInfo(kategorieId) {
        for (const dimId in KATEGORIEN_PRO_DIMENSION) {
            const kategorien = KATEGORIEN_PRO_DIMENSION[dimId];
            const kat = kategorien.find(k => k.id === kategorieId);
            if (kat) return kat;
        }
        return null;
    }

    /**
     * Reset Filter (zeige alles)
     */
    function reset() {
        activeDimension = null;
        activeKategorie = null;
        reRender();
        dispatchFilterChange();
    }

    /**
     * Holt aktuellen Filter-State
     */
    function getState() {
        return {
            dimension: activeDimension,
            kategorie: activeKategorie
        };
    }

    /**
     * Holt alle Dimensionen
     */
    function getDimensionen() {
        return DIMENSIONEN;
    }

    /**
     * Holt Kategorien für eine Dimension
     */
    function getKategorienFuerDimension(dimensionId) {
        return KATEGORIEN_PRO_DIMENSION[dimensionId] || [];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EXPORT
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Rendering
        render,
        reRender,

        // Filter setzen
        setDimension,
        setKategorie,
        reset,

        // Filter prüfen
        shouldShowNeed,
        getNeedMetadata,

        // State abrufen
        getState,
        getDimensionen,
        getKategorienFuerDimension,
        getKategorieInfo,

        // Konstanten (für externe Nutzung)
        DIMENSIONEN,
        KATEGORIEN_PRO_DIMENSION
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DimensionKategorieFilter;
}
