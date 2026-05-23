/**
 * ENTWICKLUNGSSTUFEN PROFILE HEADER CARD COMPONENT
 *
 * Zeigt Entwicklungsstufen-Werte (Fundament / Entfaltung / Verbundenheit / Sinn)
 * als kompakte Karte im Header des Needs-Editors an.
 *
 * Ersetzt den alten R-Faktor-basierten Ansatz (R1-R4) durch absolute Ø-Bedürfniswerte (0-100).
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */

const ResonanzProfileHeaderCard = (function() {
    'use strict';

    const STUFEN_CONFIG = {
        'S1': { label: 'Fundament',     short: 'Fund.', color: '#10B981', desc: 'Existenz · Sicherheit · Ruhe · Alltag' },
        'S2': { label: 'Entfaltung',    short: 'Entf.', color: '#3B82F6', desc: 'Freiheit · Ausdruck · Kink · Kommunikation' },
        'S3': { label: 'Verbundenheit', short: 'Verb.', color: '#8B5CF6', desc: 'Zuneigung · Intimität · Werte · Soziales' },
        'S4': { label: 'Sinn',          short: 'Sinn',  color: '#F59E0B', desc: 'Identität · Lebensplanung · Transformation' }
    };

    const STUFEN_MAP = {
        '#K1':1,'#K2':1,'#K7':1,'#K18':1,
        '#K5':2,'#K9':2,'#K11':2,'#K14':2,
        '#K3':3,'#K6':3,'#K10':3,'#K15':3,'#K16':3,'#K17':3,
        '#K4':4,'#K8':4,'#K12':4,'#K13':4
    };

    const STUFEN_KEYS = ['S1', 'S2', 'S3', 'S4'];

    let isLoading      = false;
    let isInitializing = true;
    let previousValues = { S1: null, S2: null, S3: null, S4: null };
    let snapshotValues = { S1: null, S2: null, S3: null, S4: null };

    function setLoading(loading) {
        isLoading = loading;
        const card = document.querySelector('.resonanz-profile-header-card');
        if (card) {
            const vc = card.querySelector('.resonanz-profile-header-values');
            if (vc) { loading ? vc.classList.add('loading') : vc.classList.remove('loading'); }
        }
    }

    function getCurrentPerson() {
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            return window.currentProfileReviewContext.person;
        }
        return 'ich';
    }

    function getArchetypeForPerson(person) {
        const urlParams = new URLSearchParams(window.location.search);
        const fromUrl = urlParams.get('archetype');
        if (fromUrl && person === 'ich') return fromUrl;
        if (typeof TiageState !== 'undefined' && TiageState.get) {
            return TiageState.get('archetypes.' + person + '.primary') || null;
        }
        return null;
    }

    function calculateStufenValues() {
        const person    = getCurrentPerson();
        const archetype = getArchetypeForPerson(person);

        let flatNeeds = null;
        if (typeof TiageState !== 'undefined') {
            flatNeeds = TiageState.getFlatNeeds
                ? TiageState.getFlatNeeds(person)
                : (TiageState.get('flatNeeds.' + person) || null);
        }

        const beduerfnisse = (window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse) || {};
        const baseProfile  = (archetype && window.BaseArchetypProfile && window.BaseArchetypProfile[archetype])
                             ? window.BaseArchetypProfile[archetype].umfrageWerte : null;

        const sums   = { 1:0, 2:0, 3:0, 4:0 };
        const counts = { 1:0, 2:0, 3:0, 4:0 };

        for (const needId in beduerfnisse) {
            if (!Object.prototype.hasOwnProperty.call(beduerfnisse, needId)) continue;
            const bed = beduerfnisse[needId];
            if (!bed) continue;
            const stufe = bed.stufe || STUFEN_MAP[bed.kategorie];
            if (!stufe) continue;
            const val = (flatNeeds && flatNeeds[needId] !== undefined)
                ? flatNeeds[needId]
                : (baseProfile ? baseProfile[needId] : undefined);
            if (val !== undefined) { sums[stufe] += val; counts[stufe]++; }
        }

        return {
            S1: counts[1] > 0 ? Math.round(sums[1] / counts[1]) : 50,
            S2: counts[2] > 0 ? Math.round(sums[2] / counts[2]) : 50,
            S3: counts[3] > 0 ? Math.round(sums[3] / counts[3]) : 50,
            S4: counts[4] > 0 ? Math.round(sums[4] / counts[4]) : 50
        };
    }

    function render() {
        const values = calculateStufenValues();

        let html = `
        <div class="resonanz-profile-header-card">
            <div class="resonanz-profile-header-title">
                <span class="resonanz-profile-header-icon">🧬</span>
                <span class="resonanz-profile-header-text">Entwicklungsstufen</span>
            </div>
            <div class="resonanz-profile-header-values">`;

        STUFEN_KEYS.forEach(key => {
            const cfg    = STUFEN_CONFIG[key];
            const value  = values[key];
            const stufeNr = parseInt(key[1]);

            if (previousValues[key] === null) previousValues[key] = value;

            // Schwellenwerte: ≥70 = hoch, ≥45 = mittel, <45 = niedrig
            let richtungSymbol, richtungClass, richtungTitle;
            if (value >= 70) {
                richtungSymbol = '↑'; richtungClass = 'richtung-mehr';
                richtungTitle  = 'Hohe Bedürfnisstärke in dieser Stufe';
            } else if (value >= 45) {
                richtungSymbol = '='; richtungClass = 'richtung-perfekt';
                richtungTitle  = 'Mittlere Bedürfnisstärke';
            } else {
                richtungSymbol = '↓'; richtungClass = 'richtung-weniger';
                richtungTitle  = 'Niedrige Bedürfnisstärke in dieser Stufe';
            }

            html += `
                <div class="resonanz-profile-value-item clickable"
                     style="--dimension-color: ${cfg.color};"
                     data-resonanz-key="${key}"
                     onclick="ResonanzProfileHeaderCard.searchByStufe('${key}')"
                     title="${cfg.label}: ${cfg.desc}">
                    <div class="resonanz-profile-value-label">${cfg.short}</div>
                    <div class="resonanz-profile-value-id">S${stufeNr} <span class="resonanz-richtung ${richtungClass}" title="${richtungTitle}">${richtungSymbol}</span></div>
                    <div class="resonanz-profile-value-number">${value}</div>
                    <div class="resonanz-profile-delta" id="delta-${key}"></div>
                </div>`;
        });

        html += `
            </div>
        </div>`;

        return html;
    }

    function init(targetSelector) {
        isInitializing = true;
        const oldCard = document.querySelector('.resonanz-profile-header-card');
        if (oldCard) oldCard.remove();

        const cardHTML  = render();
        const tempDiv   = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        const cardElement = tempDiv.firstElementChild;

        if (targetSelector) {
            const target = document.querySelector(targetSelector);
            if (target) target.parentNode.insertBefore(cardElement, target.nextSibling);
        } else {
            const header = document.querySelector('header');
            if (header) header.parentNode.insertBefore(cardElement, header.nextSibling);
        }

        setTimeout(function() { isInitializing = false; }, 1500);
    }

    function saveSnapshot() {
        const values = calculateStufenValues();
        STUFEN_KEYS.forEach(key => {
            snapshotValues[key] = values[key];
            hideImpactBadge(key);
        });
    }

    function showImpactBadge(key, impact) {
        const deltaEl = document.getElementById(`delta-${key}`);
        if (!deltaEl) return;
        const sign = impact >= 0 ? '+' : '';
        deltaEl.textContent = `${sign}${impact}`;
        deltaEl.className   = `resonanz-profile-delta ${impact >= 0 ? 'delta-positive' : 'delta-negative'} delta-visible`;
    }

    function hideImpactBadge(key) {
        const deltaEl = document.getElementById(`delta-${key}`);
        if (!deltaEl) return;
        deltaEl.textContent = '';
        deltaEl.className   = 'resonanz-profile-delta';
    }

    // Rückwärtskompatibilität
    function showDeltaAnimation(key, delta) { showImpactBadge(key, delta); }

    function update() {
        const card = document.querySelector('.resonanz-profile-header-card');
        if (!card) { init(); return; }

        const values = calculateStufenValues();

        STUFEN_KEYS.forEach(key => {
            const value        = values[key];
            const valueElement = card.querySelector(`[data-resonanz-key="${key}"] .resonanz-profile-value-number`);

            if (valueElement) {
                if (snapshotValues[key] !== null && !isInitializing) {
                    const impact = value - snapshotValues[key];
                    Math.abs(impact) >= 1 ? showImpactBadge(key, impact) : hideImpactBadge(key);
                }
                valueElement.textContent = value;
            }

            previousValues[key] = value;
        });
    }

    function searchByStufe(stufeKey) {
        const cfg = STUFEN_CONFIG[stufeKey];
        if (!cfg) return;
        if (typeof ActiveFilterCard !== 'undefined' && ActiveFilterCard.addFilter) {
            if (ActiveFilterCard.isFilterActive && ActiveFilterCard.isFilterActive(stufeKey)) {
                ActiveFilterCard.removeFilter(stufeKey);
            } else {
                ActiveFilterCard.addFilter(stufeKey);
            }
        } else {
            const searchInput = document.getElementById('profileReviewSearchInput');
            if (searchInput) {
                searchInput.value = cfg.label;
                if (typeof handleIntelligentSearch === 'function') handleIntelligentSearch(cfg.label);
            }
        }
    }

    // Rückwärtskompatibilität
    function searchByResonanz(key) { searchByStufe(key); }

    function updateFilterHighlights() {
        STUFEN_KEYS.forEach(key => {
            const item = document.querySelector(`[data-resonanz-key="${key}"]`);
            if (!item) return;
            const isActive = typeof ActiveFilterCard !== 'undefined' &&
                             ActiveFilterCard.isFilterActive &&
                             ActiveFilterCard.isFilterActive(key);
            item.classList.toggle('filter-active', isActive);
        });
    }

    // Events
    window.addEventListener('resonanzfaktoren-changed', function(event) {
        const currentPerson = getCurrentPerson();
        if (!event.detail || event.detail.person === currentPerson) update();
    });

    window.addEventListener('flatNeeds-changed', function(event) {
        const currentPerson = getCurrentPerson();
        if (!event.detail || event.detail.person === currentPerson) update();
    });

    document.addEventListener('activeFilterChange', function() {
        saveSnapshot();
        updateFilterHighlights();
    });

    window.addEventListener('personChanged', function() {
        STUFEN_KEYS.forEach(key => {
            snapshotValues[key] = null;
            hideImpactBadge(key);
        });
    });

    return {
        render,
        init,
        update,
        searchByStufe,
        searchByResonanz,
        setLoading,
        saveSnapshot,
        showImpactBadge,
        hideImpactBadge,
        showDeltaAnimation
    };
})();

// Auto-Initialisierung
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ResonanzProfileHeaderCard.init();
    });
} else {
    ResonanzProfileHeaderCard.init();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanzProfileHeaderCard;
}
