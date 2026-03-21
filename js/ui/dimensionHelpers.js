// js/ui/dimensionHelpers.js
// Extracted from app-main.js
// Functions: getGeschlechtValue, updateSelectionInfoMessage, handleDimensionChange,
//            getGeschlechtKurz, getGeschlechtVoll, getGeschlechtCategory,
//            getDominanzKurz, getOrientierungKurz, updateAnalysisOverview

/* global TiageI18n, TiageConfig */

function getGeschlechtValue(g) {
    if (!g) return null;
    if (typeof g === 'string') return g;
    if (typeof g === 'object' && g.primary) return g.primary;
    return null;
}

function updateSelectionInfoMessage() {
    const infoElement = document.getElementById('desktopSelectionInfo');
    if (!infoElement) return;

    const missing = [];

    // Check ICH
    const ichMissing = [];
    if (!getGeschlechtValue(window.personDimensions.ich.geschlecht)) ichMissing.push('Geschlecht');
    if (!window.hasAnyDominanzSelected('ich')) ichMissing.push('Dominanz');
    if (!window.hasAnyOrientierungSelected('ich')) ichMissing.push('Orientierung');
    if (ichMissing.length > 0) {
        missing.push('DU: ' + ichMissing.join(', '));
    }

    // Check Partner
    const partnerMissing = [];
    if (!getGeschlechtValue(window.personDimensions.partner.geschlecht)) partnerMissing.push('Geschlecht');
    if (!window.hasAnyDominanzSelected('partner')) partnerMissing.push('Dominanz');
    if (!window.hasAnyOrientierungSelected('partner')) partnerMissing.push('Orientierung');
    if (partnerMissing.length > 0) {
        missing.push('PARTNER: ' + partnerMissing.join(', '));
    }

    // Update display
    if (missing.length > 0) {
        infoElement.textContent = TiageI18n.t('ui.missingSelection', 'Fehlende Auswahl') + ' - ' + missing.join(' | ');
        infoElement.classList.add('visible');
    } else {
        infoElement.textContent = '';
        infoElement.classList.remove('visible');
    }
}

function handleDimensionChange(person, dimension, value, element) {
    // Update state
    window.personDimensions[person][dimension] = value;

    // Remove needs-selection class from the parent group
    if (element) {
        const dimensionGroup = element.closest('.dimension-group, .dimension-status-group');
        if (dimensionGroup) {
            dimensionGroup.classList.remove('needs-selection');
        }
    }

    // Visual feedback - highlight animation
    if (element) {
        const label = element.nextElementSibling;
        if (label) {
            label.classList.add('highlight-change');
            setTimeout(() => label.classList.remove('highlight-change'), 300);
        }
    }

    // Update overview box
    updateAnalysisOverview();

    // Re-run compatibility checks when dimensions change
    if (window.tiageData) {
        window.updatePartnerView();
    }

    // WICHTIG: Speichere Änderungen sofort, um Datenverlust zu verhindern
    // (Fix für GOD-Einstellungen die bei Navigation verloren gingen)
    if (typeof window.saveSelectionToStorage === 'function') {
        window.saveSelectionToStorage();
    }
}

function getGeschlechtKurz(geschlecht) {
    if (!geschlecht) return '?';

    // Neues Format: { primary, secondary }
    let primary = geschlecht;
    let secondary = null;
    if (typeof geschlecht === 'object') {
        primary = geschlecht.primary;
        secondary = geschlecht.secondary;
    }

    if (!primary) return '?';

    // Nutze TiageConfig wenn verfügbar
    const getShort = (g) => {
        if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_SHORT) {
            return TiageConfig.GESCHLECHT_SHORT[g] || g;
        }
        // Fallback-Map
        const map = {
            'cis_mann': 'CM',
            'cis_frau': 'CF',
            'trans_mann': 'TM',
            'trans_frau': 'TF',
            'nonbinaer': 'NB',
            'genderfluid': 'GF',
            'agender': 'AG',
            'intersex': 'IS',
            'divers': 'DI',
            // Legacy-Support
            'männlich': 'M',
            'weiblich': 'W',
            'non-binär': 'NB'
        };
        return map[g] || g;
    };

    // Primär + optional Sekundär anzeigen
    let result = getShort(primary);
    if (secondary) {
        result += '/' + getShort(secondary);
    }
    return result;
}

function getGeschlechtVoll(geschlecht) {
    if (!geschlecht) return null;

    let primary = geschlecht;
    let secondary = null;
    if (typeof geschlecht === 'object') {
        primary = geschlecht.primary;
        secondary = geschlecht.secondary;
    }

    if (!primary) return null;

    // Nutze i18n wenn verfügbar, sonst Fallback-Map
    const getName = (g) => {
        if (typeof TiageI18n !== 'undefined') {
            return TiageI18n.t(`geschlecht.types.${g}`, g);
        }
        // Fallback-Map
        const map = {
            'cis_mann': 'Cis Mann',
            'cis_frau': 'Cis Frau',
            'trans_mann': 'Trans Mann',
            'trans_frau': 'Trans Frau',
            'nonbinaer': 'Nonbinär',
            'genderfluid': 'Genderfluid',
            'agender': 'Agender',
            'intersex': 'Intersex',
            'divers': 'Divers',
            'männlich': 'Mann',
            'weiblich': 'Frau',
            'non-binär': 'Nonbinär'
        };
        return map[g] || g;
    };

    let result = getName(primary);
    if (secondary) {
        result += ' (' + getName(secondary) + ')';
    }
    return result;
}

function getGeschlechtCategory(geschlecht) {
    // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
    if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
        geschlecht = geschlecht.primary;
    }
    // Gibt die Kategorie für Orientierungslogik zurück
    if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_CATEGORY) {
        return TiageConfig.GESCHLECHT_CATEGORY[geschlecht] || 'andere';
    }
    const map = {
        'cis_mann': 'maennlich',
        'cis_frau': 'weiblich',
        'trans_mann': 'maennlich',
        'trans_frau': 'weiblich',
        'nonbinaer': 'nonbinaer',
        'genderfluid': 'fluid',
        'agender': 'agender',
        // Legacy-Support
        'männlich': 'maennlich',
        'weiblich': 'weiblich',
        'non-binär': 'nonbinaer',
        // Einfache Geschlechter (für R4 Hybrid)
        'mann': 'maennlich',
        'frau': 'weiblich',
        'inter': 'nonbinaer',
        'fluid': 'fluid'
    };
    return map[geschlecht] || 'andere';
}
// NOTE: getGeschlechtCategory exported at module end

function getDominanzKurz(dominanz) {
    // Handle multi-select object
    if (dominanz && typeof dominanz === 'object') {
        const parts = [];
        const map = { 'dominant': 'dom', 'submissiv': 'sub', 'switch': 'sw', 'ausgeglichen': 'ausg' };

        // New Primary/Secondary structure
        if ('primary' in dominanz) {
            if (dominanz.primary) {
                parts.push(map[dominanz.primary] || dominanz.primary);
            }
            if (dominanz.secondary) {
                parts.push((map[dominanz.secondary] || dominanz.secondary) + '?');
            }
            return parts.length > 0 ? parts.join('+') : '?';
        }

        // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
        for (const [type, status] of Object.entries(dominanz)) {
            if (status) {
                let kurz = map[type] || type;
                if (status === 'interessiert') kurz += '?';
                parts.push(kurz);
            }
        }

        return parts.length > 0 ? parts.join('+') : '?';
    }

    // Old single-value format (backwards compatibility)
    if (!dominanz) return '?';
    const map = {
        'dominant': 'dom',
        'submissiv': 'sub',
        'switch': 'sw',
        'ausgeglichen': 'ausg'
    };
    return map[dominanz] || dominanz;
}

function getOrientierungKurz(orientierung, status) {
    // Handle multi-select orientierung object
    if (orientierung && typeof orientierung === 'object') {
        const map = {
            'heterosexuell': 'het',
            'homosexuell': 'hom',
            'bisexuell': 'bi'
        };
        const parts = [];
        // New Primary/Secondary structure
        if (orientierung.primary) {
            parts.push(map[orientierung.primary] || orientierung.primary);
        }
        if (orientierung.secondary) {
            parts.push(map[orientierung.secondary] || orientierung.secondary);
        }
        return parts.length > 0 ? parts.join('/') : '?';
    }

    // Backwards compatibility for old single-value format
    if (!orientierung) return '?';
    const map = {
        'heterosexuell': 'hetero',
        'homosexuell': 'homo',
        'bisexuell': 'bi'
    };
    let kurz = map[orientierung] || orientierung;
    if (status === 'interessiert') {
        kurz += '(?)';
    }
    return kurz;
}

function updateAnalysisOverview() {
    const ichType = window.tiageData?.archetypes[window.getIchArchetype()]?.name || window.getIchArchetype();
    const partnerType = window.tiageData?.archetypes[window.getPartnerArchetype()]?.name || window.getPartnerArchetype();

    const ichDims = window.personDimensions.ich;
    const partnerDims = window.personDimensions.partner;

    // Voller Geschlechtsname mit sekundärem in Klammern
    const ichGeschlecht = getGeschlechtVoll(ichDims.geschlecht);
    const partnerGeschlecht = getGeschlechtVoll(partnerDims.geschlecht);

    const ichInfo = `(${getDominanzKurz(ichDims.dominanz)}, ${getOrientierungKurz(ichDims.orientierung, ichDims.orientierungStatus)})`;
    const partnerInfo = `(${getDominanzKurz(partnerDims.dominanz)}, ${getOrientierungKurz(partnerDims.orientierung, partnerDims.orientierungStatus)})`;

    const content = document.getElementById('analysisOverviewContent');
    if (content) {
        // Nutze i18n für "Du:" / "You:"
        const youALabel = typeof TiageI18n !== 'undefined' ? TiageI18n.t('analysisOverview.youA', 'Du:') : 'Du:';
        const ichGeschlechtHtml = ichGeschlecht ? `<span class="geschlecht-info">${youALabel} ${ichGeschlecht}</span>` : '';
        const partnerGeschlechtHtml = partnerGeschlecht ? `<span class="geschlecht-info">${partnerGeschlecht}</span>` : '';

        content.innerHTML = `
            <span class="type-name">${ichType}</span> ${ichGeschlechtHtml} <span class="dim-info">${ichInfo}</span>
            <span> × </span>
            <span class="type-name">${partnerType}</span> ${partnerGeschlechtHtml} <span class="dim-info">${partnerInfo}</span>
        `;
    }
}

// Make function globally available for i18n updates
// NOTE: updateAnalysisOverview exported at module end

// ─── Exports ──────────────────────────────────────────────────────────────────
window.getGeschlechtValue = getGeschlechtValue;
window.updateSelectionInfoMessage = updateSelectionInfoMessage;
window.handleDimensionChange = handleDimensionChange;
window.getGeschlechtKurz = getGeschlechtKurz;
window.getGeschlechtVoll = getGeschlechtVoll;
window.getGeschlechtCategory = getGeschlechtCategory;
window.getDominanzKurz = getDominanzKurz;
window.getOrientierungKurz = getOrientierungKurz;
window.updateAnalysisOverview = updateAnalysisOverview;
