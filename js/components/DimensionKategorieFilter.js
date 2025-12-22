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
     * ═══════════════════════════════════════════════════════════════════════════
     * SINGLE SOURCE OF TRUTH: Resonanz-Dimensionen (R1-R4)
     * ═══════════════════════════════════════════════════════════════════════════
     *
     * Diese Definition ist die EINZIGE Quelle für R1-R4 Konfiguration.
     * Alle anderen Komponenten (ResonanzCard, ResonanzTreeView, ResonanzProfileHeaderCard)
     * sollen diese Konstante verwenden.
     *
     * Felder:
     * - id: R1, R2, R3, R4
     * - key: leben, philosophie, dynamik, identitaet
     * - kurzform: R1, R2, R3, R4 (für Anzeige)
     * - label: Menschenlesbare Bezeichnung
     * - icon: Emoji für visuelle Darstellung
     * - color: Farbe für UI-Elemente
     * - beschreibung: Kurzbeschreibung
     * - sourceLabel: Ursprünglicher Dimensionsname (für ResonanzCard)
     * - kategorienKeys: Kategorie-Keys als Array (für Score-Berechnung)
     * - taxonomieDimensionen: Mapping zu TiageTaxonomie-Dimensionen (für TreeView)
     */
    const DIMENSIONEN = {
        'R1': {
            id: 'R1',
            key: 'leben',
            kurzform: 'R1',
            label: 'Leben',
            icon: '🔥',
            color: '#E63946',
            beschreibung: 'Orientierung - Existenz, Zuneigung, Muße',
            sourceLabel: 'Orientierung',
            kategorienKeys: ['existenz', 'zuneigung', 'musse', 'intimitaet_romantik'],
            taxonomieDimensionen: ['#D3'] // Nähe-Distanz
        },
        'R2': {
            id: 'R2',
            key: 'philosophie',
            kurzform: 'R2',
            label: 'Philosophie',
            icon: '🧠',
            color: '#2A9D8F',
            beschreibung: 'Archetyp - Lebensplanung, Finanzen, Werte',
            sourceLabel: 'Archetyp',
            kategorienKeys: ['freiheit', 'teilnahme', 'identitaet', 'lebensplanung', 'finanzen_karriere', 'werte_haltungen', 'soziales_leben', 'praktisches_leben'],
            taxonomieDimensionen: ['#D1', '#D2'] // Beziehungsphilosophie, Werte-Alignment
        },
        'R3': {
            id: 'R3',
            key: 'dynamik',
            kurzform: 'R3',
            label: 'Dynamik',
            icon: '⚡',
            color: '#8B5CF6',
            beschreibung: 'Dominanz - Kontrolle, Hingabe, Macht',
            sourceLabel: 'Dominanz',
            kategorienKeys: ['dynamik', 'sicherheit'],
            taxonomieDimensionen: ['#D4'] // Autonomie
        },
        'R4': {
            id: 'R4',
            key: 'identitaet',
            kurzform: 'R4',
            label: 'Identität',
            icon: '💚',
            color: '#F4A261',
            beschreibung: 'Geschlecht - Authentizität, Selbstausdruck',
            sourceLabel: 'Geschlecht',
            kategorienKeys: ['verstaendnis', 'erschaffen', 'verbundenheit', 'kommunikation_stil'],
            taxonomieDimensionen: ['#D5', '#D6'] // Kommunikation, Soziale-Kompatibilität
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
    let activeKategorien = new Set();  // Mehrfachauswahl: Set der aktiven Kategorien
    let containerId = null;      // Container-ID für Rendering
    let viewMode = 'tree';       // Nur noch 'tree' - Tags-Modus entfernt

    // ═══════════════════════════════════════════════════════════════════════════
    // PERSON-SPEZIFISCHE PERSISTENZ (FIX: Filter pro ICH/PARTNER speichern)
    // ═══════════════════════════════════════════════════════════════════════════
    const savedStatePerPerson = {
        ich: { kategorien: [] },
        partner: { kategorien: [] }
    };
    let currentPerson = 'ich';  // Aktuelle Person für Filter-Kontext

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
        if (activeKategorien.size === 0) {
            return true;
        }

        // Hole Bedürfnis-Metadaten
        const need = getNeedMetadata(needId);
        if (!need) {
            // FIX: Bedürfnis NICHT anzeigen wenn keine Metadaten verfügbar
            // (Vorheriges Verhalten: return true - zeigte ALLE Bedürfnisse an)
            return false;
        }

        // Mehrfachauswahl: Prüfe ob Bedürfnis zu einer der aktiven Kategorien gehört
        return activeKategorien.has(need.kategorieId);
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
            console.error('[DimensionKategorieFilter] BeduerfnisIds oder TiageTaxonomie nicht geladen');
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

        // Nur noch Tree-Ansicht (Tags-Modus entfernt)
        html += renderTreeView();

        html += '</div>';

        return html;
    }


    /**
     * Rendert die Tree-Ansicht mit Reset-Button und aktiven Filtern
     */
    function renderTreeView() {
        if (typeof ResonanzTreeView === 'undefined') {
            return '<p style="color: rgba(255,255,255,0.5);">Tree-View nicht geladen</p>';
        }

        // Reset-Button und aktive Filter
        const hasActiveFilters = activeKategorien.size > 0;
        const resetButtonVisible = hasActiveFilters ? '' : ' style="display: none;"';

        // Aktive Filter-Tags generieren (mit Entfernen-Button)
        let activeFilterTags = '';
        if (hasActiveFilters) {
            const tags = Array.from(activeKategorien).map(kategorieId => {
                const info = getKategorieInfo(kategorieId);
                if (info) {
                    return `<span class="active-filter-tag" style="--tag-color: ${info.color}">
                        <span class="filter-tag-label">${info.label}</span>
                        <button class="filter-tag-remove"
                                onclick="DimensionKategorieFilter.removeKategorie('${kategorieId}'); event.stopPropagation();"
                                title="${info.label} aus Filter entfernen"
                                aria-label="${info.label} aus Filter entfernen">×</button>
                    </span>`;
                }
                return '';
            }).join('');
            activeFilterTags = `<div class="active-filter-tags">${tags}</div>`;
        }

        return `
        <div class="tree-view-header">
            ${activeFilterTags}
            <button class="tree-reset-btn"
                    onclick="DimensionKategorieFilter.reset()"
                    title="Filter zurücksetzen"${resetButtonVisible}>
                ↺ Zurücksetzen
            </button>
        </div>`;
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

        // Tree-View nach Rendering initialisieren
        initTreeView();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Toggle eine Kategorie in der Mehrfachauswahl
     * @param {string} kategorieId - '#K1' bis '#K18'
     */
    function toggleKategorie(kategorieId) {
        if (activeKategorien.has(kategorieId)) {
            activeKategorien.delete(kategorieId);
        } else {
            activeKategorien.add(kategorieId);
        }

        // Re-render Filter
        reRender();

        // Event feuern
        dispatchFilterChange();
    }

    /**
     * Entfernt eine Kategorie aus dem aktiven Filter
     * @param {string} kategorieId - '#K1' bis '#K18'
     */
    function removeKategorie(kategorieId) {
        if (activeKategorien.has(kategorieId)) {
            activeKategorien.delete(kategorieId);

            // Re-render Filter
            reRender();

            // Event feuern
            dispatchFilterChange();
        }
    }

    /**
     * Toggle alle Kategorien einer Dimension (R1-R4)
     * Wenn alle Kategorien der Dimension aktiv sind → alle deaktivieren
     * Sonst → alle Kategorien der Dimension aktivieren
     * @param {string} dimensionId - 'R1', 'R2', 'R3' oder 'R4'
     */
    function toggleDimension(dimensionId) {
        const kategorien = KATEGORIEN_PRO_DIMENSION[dimensionId];
        if (!kategorien || kategorien.length === 0) {
            console.warn('[DimensionKategorieFilter] Unbekannte Dimension:', dimensionId);
            return;
        }

        // Prüfe ob ALLE Kategorien dieser Dimension bereits aktiv sind
        const kategorieIds = kategorien.map(k => k.id);
        const allActive = kategorieIds.every(id => activeKategorien.has(id));

        if (allActive) {
            // Alle deaktivieren
            kategorieIds.forEach(id => activeKategorien.delete(id));
        } else {
            // Alle aktivieren
            kategorieIds.forEach(id => activeKategorien.add(id));
        }

        // Re-render Filter
        reRender();

        // Event feuern
        dispatchFilterChange();
    }

    /**
     * Prüft ob eine Dimension vollständig aktiv ist (alle Kategorien)
     * @param {string} dimensionId - 'R1', 'R2', 'R3' oder 'R4'
     * @returns {boolean}
     */
    function isDimensionActive(dimensionId) {
        const kategorien = KATEGORIEN_PRO_DIMENSION[dimensionId];
        if (!kategorien || kategorien.length === 0) return false;
        return kategorien.every(k => activeKategorien.has(k.id));
    }

    /**
     * Prüft ob eine Dimension teilweise aktiv ist (mindestens eine Kategorie)
     * @param {string} dimensionId - 'R1', 'R2', 'R3' oder 'R4'
     * @returns {boolean}
     */
    function isDimensionPartiallyActive(dimensionId) {
        const kategorien = KATEGORIEN_PRO_DIMENSION[dimensionId];
        if (!kategorien || kategorien.length === 0) return false;
        return kategorien.some(k => activeKategorien.has(k.id)) && !kategorien.every(k => activeKategorien.has(k.id));
    }

    /**
     * Prüft ob eine Kategorie aktiv ist
     * @param {string} kategorieId - '#K1' bis '#K18'
     * @returns {boolean}
     */
    function isKategorieActive(kategorieId) {
        return activeKategorien.has(kategorieId);
    }

    /**
     * Setzt die aktive Kategorie (deprecated - für Rückwärtskompatibilität)
     * @param {string|null} kategorieId - '#K1' bis '#K18' oder null für Alle
     */
    function setKategorie(kategorieId) {
        if (kategorieId === null) {
            activeKategorien.clear();
        } else {
            activeKategorien.clear();
            activeKategorien.add(kategorieId);
        }

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
                kategorien: Array.from(activeKategorien),
                kategorienInfo: Array.from(activeKategorien).map(id => getKategorieInfo(id))
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
     * @param {boolean} silent - Wenn true, wird kein Event ausgelöst
     */
    function reset(silent) {
        activeKategorien.clear();
        reRender();
        if (!silent) {
            dispatchFilterChange();
        }
    }

    /**
     * Initialisiert den Tree-View nach DOM-Update
     */
    function initTreeView() {
        if (typeof ResonanzTreeView !== 'undefined') {
            setTimeout(() => {
                const treeContainer = document.querySelector('#tree-view-inline-container');
                if (treeContainer) {
                    const treeHtml = ResonanzTreeView.render('#tree-view-inline-container', {
                        onKategorieClick: toggleKategorie,
                        isKategorieActive: isKategorieActive,
                        onDimensionClick: toggleDimension,
                        isDimensionActive: isDimensionActive,
                        isDimensionPartiallyActive: isDimensionPartiallyActive
                    });
                    treeContainer.innerHTML = treeHtml;
                    console.log('[DimensionKategorieFilter] Tree-View initialisiert');
                }
            }, 50);
        }
    }

    /**
     * Holt aktuellen Filter-State
     */
    function getState() {
        return {
            kategorien: Array.from(activeKategorien)
        };
    }

    /**
     * Speichert den aktuellen Filter-State für eine Person
     * @param {string} person - 'ich' oder 'partner'
     */
    function saveStateForPerson(person) {
        if (!person || (person !== 'ich' && person !== 'partner')) {
            person = 'ich';
        }
        savedStatePerPerson[person] = {
            kategorien: Array.from(activeKategorien)
        };
        console.log('[DimensionKategorieFilter] State gespeichert für', person, ':', savedStatePerPerson[person].kategorien);
    }

    /**
     * Lädt den gespeicherten Filter-State für eine Person
     * @param {string} person - 'ich' oder 'partner'
     */
    function loadStateForPerson(person) {
        if (!person || (person !== 'ich' && person !== 'partner')) {
            person = 'ich';
        }
        const savedState = savedStatePerPerson[person];
        activeKategorien.clear();
        if (savedState && savedState.kategorien && savedState.kategorien.length > 0) {
            savedState.kategorien.forEach(k => activeKategorien.add(k));
        }
        currentPerson = person;
        console.log('[DimensionKategorieFilter] State geladen für', person, ':', Array.from(activeKategorien));
        reRender();
        dispatchFilterChange();
    }

    /**
     * Wechselt die Person und speichert/lädt den State entsprechend
     * @param {string} newPerson - 'ich' oder 'partner'
     */
    function switchPerson(newPerson) {
        if (!newPerson || (newPerson !== 'ich' && newPerson !== 'partner')) {
            newPerson = 'ich';
        }
        if (newPerson === currentPerson) {
            return; // Keine Änderung nötig
        }
        // Speichere State der vorherigen Person
        saveStateForPerson(currentPerson);
        // Lade State der neuen Person
        loadStateForPerson(newPerson);
    }

    /**
     * Gibt die aktuelle Person zurück
     * @returns {string} 'ich' oder 'partner'
     */
    function getCurrentPerson() {
        return currentPerson;
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
        initTreeView,

        // Filter setzen (Mehrfachauswahl)
        toggleKategorie,
        removeKategorie,
        toggleDimension,
        isKategorieActive,
        isDimensionActive,
        isDimensionPartiallyActive,
        setKategorie,  // Deprecated - für Rückwärtskompatibilität
        reset,

        // Filter prüfen
        shouldShowNeed,
        getNeedMetadata,

        // State abrufen
        getState,
        getDimensionen,
        getKategorienFuerDimension,
        getKategorieInfo,

        // Person-spezifische Persistenz (FIX für ICH/PARTNER Tab-Wechsel)
        saveStateForPerson,
        loadStateForPerson,
        switchPerson,
        getCurrentPerson,

        // Konstanten (für externe Nutzung)
        DIMENSIONEN,
        KATEGORIEN_PRO_DIMENSION
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DimensionKategorieFilter;
}
