/**
 * RA PROFILE HEADER CARD COMPONENT
 *
 * Zeigt die RA-Profil-Werte (R1-R4) als kompakte Karte im Header an.
 * Die Karte ist außerhalb des Scrollbereichs fixiert und zeigt:
 * - Leben (R1)
 * - Philosophie (R2)
 * - Dynamik (R3)
 * - Identität (R4)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const RAProfileHeaderCard = (function() {
    'use strict';

    /**
     * Resonanz-Dimensionen Konfiguration
     */
    const RESONANZ_CONFIG = {
        'R1': {
            label: 'Leben',
            color: '#E63946',
            icon: '🔥'
        },
        'R2': {
            label: 'Philosophie',
            color: '#2A9D8F',
            icon: '🧠'
        },
        'R3': {
            label: 'Dynamik',
            color: '#8B5CF6',
            icon: '⚡'
        },
        'R4': {
            label: 'Identität',
            color: '#F4A261',
            icon: '💚'
        }
    };

    /**
     * Holt die aktuellen Resonanzwerte für die aktuelle Person
     * @returns {Object} Resonanzwerte { R1, R2, R3, R4 }
     */
    function getCurrentValues() {
        // Versuche Werte aus ResonanzCard zu holen (wenn verfügbar)
        if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.getValues === 'function') {
            return ResonanzCard.getValues('ich');
        }

        // Fallback: Default-Werte
        return {
            R1: 1.00,
            R2: 1.00,
            R3: 1.00,
            R4: 1.00
        };
    }

    /**
     * Berechnet die Anzahl der erfüllten Bedürfnisse pro Resonanz-Dimension
     * @returns {Object} Zähler { R1: count, R2: count, R3: count, R4: count, total: count }
     */
    function getNeedsCounts() {
        const counts = {
            R1: 0,
            R2: 0,
            R3: 0,
            R4: 0,
            total: 0
        };

        // Hole aktuelle Needs für ICH
        if (typeof window.LoadedArchetypProfile !== 'undefined' &&
            window.LoadedArchetypProfile.ich &&
            window.LoadedArchetypProfile.ich.profileReview &&
            window.LoadedArchetypProfile.ich.profileReview.flatNeeds) {

            const flatNeeds = window.LoadedArchetypProfile.ich.profileReview.flatNeeds;
            const totalNeeds = Array.isArray(flatNeeds) ? flatNeeds.length : Object.keys(flatNeeds).length;
            counts.total = totalNeeds;

            // Verteile ungefähr gleich auf die 4 Dimensionen (vereinfachte Logik)
            // In einer vollständigen Implementierung würde man hier die Kategorien-Zuordnung nutzen
            const perDimension = Math.floor(totalNeeds / 4);
            counts.R1 = perDimension;
            counts.R2 = perDimension;
            counts.R3 = perDimension;
            counts.R4 = totalNeeds - (perDimension * 3); // Rest zu R4
        } else {
            // Fallback: Zeige eine Standard-Verteilung
            counts.total = 219;
            counts.R1 = 37; // Aus dem Screenshot
            counts.R2 = 55;
            counts.R3 = 45;
            counts.R4 = 82;
        }

        return counts;
    }

    /**
     * Rendert die kompakte Header-Karte
     * @returns {string} HTML-String
     */
    function render() {
        const values = getCurrentValues();
        const counts = getNeedsCounts();

        let html = `
        <div class="ra-profile-header-card">
            <div class="ra-profile-header-title">
                <span class="ra-profile-header-icon">📊</span>
                <span class="ra-profile-header-text">Dein RA-Profil</span>
            </div>
            <div class="ra-profile-header-values">`;

        // Render jede Resonanz-Dimension
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            const config = RESONANZ_CONFIG[key];
            const value = values[key];
            const displayValue = value.toFixed(2);

            html += `
                <div class="ra-profile-value-item clickable"
                     style="--dimension-color: ${config.color};"
                     onclick="RAProfileHeaderCard.searchByResonanz('${key}')"
                     title="Klicke um nach ${key} Bedürfnissen zu suchen">
                    <div class="ra-profile-value-label">${config.label}</div>
                    <div class="ra-profile-value-id">${key}</div>
                    <div class="ra-profile-value-number">${displayValue}</div>
                </div>`;
        });

        html += `
            </div>
        </div>`;

        return html;
    }

    /**
     * Initialisiert die Header-Karte und fügt sie dem DOM hinzu
     * @param {string} targetSelector - CSS-Selektor für das Ziel-Element (default: nach header)
     */
    function init(targetSelector) {
        // Entferne alte Karte falls vorhanden
        const oldCard = document.querySelector('.ra-profile-header-card');
        if (oldCard) {
            oldCard.remove();
        }

        // Erstelle neue Karte
        const cardHTML = render();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        const cardElement = tempDiv.firstElementChild;

        // Füge Karte nach Header ein
        if (targetSelector) {
            const target = document.querySelector(targetSelector);
            if (target) {
                target.parentNode.insertBefore(cardElement, target.nextSibling);
            }
        } else {
            const header = document.querySelector('header');
            if (header) {
                header.parentNode.insertBefore(cardElement, header.nextSibling);
            }
        }

        console.log('[RAProfileHeaderCard] Initialisiert');
    }

    /**
     * Aktualisiert die Header-Karte mit neuen Werten
     */
    function update() {
        const card = document.querySelector('.ra-profile-header-card');
        if (!card) {
            console.warn('[RAProfileHeaderCard] Karte nicht gefunden, initialisiere neu');
            init();
            return;
        }

        const values = getCurrentValues();

        // Aktualisiere Werte
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            const value = values[key];
            const displayValue = value.toFixed(2);
            const valueElement = card.querySelector(`.ra-profile-value-item[style*="${RESONANZ_CONFIG[key].color}"] .ra-profile-value-number`);
            if (valueElement) {
                valueElement.textContent = displayValue;
            }
        });

        console.log('[RAProfileHeaderCard] Aktualisiert');
    }

    /**
     * Sucht nach Bedürfnissen eines Resonanzfaktors (R1-R4)
     * @param {string} resonanzId - R1, R2, R3 oder R4
     */
    function searchByResonanz(resonanzId) {
        // Finde Suchfeld
        const searchInput = document.getElementById('profileReviewSearchInput');
        if (!searchInput) {
            console.warn('[RAProfileHeaderCard] Suchfeld nicht gefunden');
            return;
        }

        // Setze Suchtext auf Resonanz-ID
        searchInput.value = resonanzId;

        // Trigger Suche
        if (typeof handleIntelligentSearch === 'function') {
            handleIntelligentSearch(resonanzId);
        } else if (typeof filterProfileReviewByNeed === 'function') {
            filterProfileReviewByNeed(resonanzId);
        }

        // Fokussiere Suchfeld
        searchInput.focus();

        console.log('[RAProfileHeaderCard] Suche nach', resonanzId);
    }

    // Lausche auf Resonanzfaktoren-Änderungen
    window.addEventListener('resonanzfaktoren-changed', function(event) {
        if (event.detail && event.detail.person === 'ich') {
            update();
        }
    });

    return {
        render,
        init,
        update,
        searchByResonanz
    };
})();

// Auto-Initialisierung deaktiviert - Resonanzfaktoren werden nicht mehr auf der Hauptseite angezeigt
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', function() {
//         RAProfileHeaderCard.init();
//     });
// } else {
//     // DOM bereits geladen
//     RAProfileHeaderCard.init();
// }

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RAProfileHeaderCard;
}
