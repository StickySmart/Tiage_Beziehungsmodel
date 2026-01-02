/**
 * RESONANZ PROFILE HEADER CARD COMPONENT
 *
 * Zeigt die Resonanz-Profil-Werte (R1-R4) als kompakte Karte im Header an.
 * Die Karte ist außerhalb des Scrollbereichs fixiert und zeigt:
 * - Leben (R1)
 * - Philosophie (R2)
 * - Dynamik (R3)
 * - Identität (R4)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ResonanzProfileHeaderCard = (function() {
    'use strict';

    /**
     * Resonanz-Dimensionen Konfiguration
     *
     * HINWEIS: Nutzt DimensionKategorieFilter.DIMENSIONEN als Single Source of Truth.
     * Falls nicht verfügbar, wird der lokale Fallback verwendet.
     */
    function getResonanzConfig() {
        // SSOT: Nutze DimensionKategorieFilter wenn verfügbar
        if (typeof DimensionKategorieFilter !== 'undefined' && DimensionKategorieFilter.DIMENSIONEN) {
            const ssot = DimensionKategorieFilter.DIMENSIONEN;
            return {
                'R1': { label: ssot.R1.label, color: ssot.R1.color, icon: ssot.R1.icon },
                'R2': { label: ssot.R2.label, color: ssot.R2.color, icon: ssot.R2.icon },
                'R3': { label: ssot.R3.label, color: ssot.R3.color, icon: ssot.R3.icon },
                'R4': { label: ssot.R4.label, color: ssot.R4.color, icon: ssot.R4.icon }
            };
        }

        // Fallback: Lokale Definition
        return {
            'R1': { label: 'Leben', color: '#E63946', icon: '🔥' },
            'R2': { label: 'Philosophie', color: '#2A9D8F', icon: '🧠' },
            'R3': { label: 'Dynamik', color: '#8B5CF6', icon: '⚡' },
            'R4': { label: 'Identität', color: '#F4A261', icon: '💚' }
        };
    }

    // Für Rückwärtskompatibilität
    const RESONANZ_CONFIG = getResonanzConfig();

    // Loading state
    let isLoading = false;

    // Speichert vorherige Werte für Delta-Berechnung
    let previousValues = { R1: null, R2: null, R3: null, R4: null };

    /**
     * Setzt den Lade-Status und aktualisiert die Anzeige
     * @param {boolean} loading - true wenn Daten geladen werden
     */
    function setLoading(loading) {
        isLoading = loading;
        const card = document.querySelector('.resonanz-profile-header-card');
        if (card) {
            const valuesContainer = card.querySelector('.resonanz-profile-header-values');
            if (valuesContainer) {
                if (loading) {
                    valuesContainer.classList.add('loading');
                } else {
                    valuesContainer.classList.remove('loading');
                }
            }
        }
    }

    /**
     * Ermittelt die aktuell angezeigte Person (ich/partner)
     * @returns {string} 'ich' oder 'partner'
     */
    function getCurrentPerson() {
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            return window.currentProfileReviewContext.person;
        }
        return 'ich';
    }

    /**
     * Holt die aktuellen Resonanzwerte für die aktuelle Person
     * @returns {Object} Resonanzwerte { R1, R2, R3, R4 }
     */
    function getCurrentValues() {
        const person = getCurrentPerson();

        // Versuche Werte aus ResonanzCard zu holen (wenn verfügbar)
        if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.getValues === 'function') {
            return ResonanzCard.getValues(person);
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

        const person = getCurrentPerson();

        // Hole aktuelle Needs für die angezeigte Person
        if (typeof window.LoadedArchetypProfile !== 'undefined' &&
            window.LoadedArchetypProfile[person] &&
            window.LoadedArchetypProfile[person].profileReview &&
            window.LoadedArchetypProfile[person].profileReview.flatNeeds) {

            const flatNeeds = window.LoadedArchetypProfile[person].profileReview.flatNeeds;
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
        <div class="resonanz-profile-header-card">
            <div class="resonanz-profile-header-title">
                <span class="resonanz-profile-header-icon">📊</span>
                <span class="resonanz-profile-header-text">Dein Resonanz-Profil</span>
            </div>
            <div class="resonanz-profile-header-values">`;

        // Render jede Resonanz-Dimension
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            const config = RESONANZ_CONFIG[key];
            const value = values[key];
            const displayValue = value.toFixed(2);

            // Speichere initialen Wert
            if (previousValues[key] === null) {
                previousValues[key] = value;
            }

            html += `
                <div class="resonanz-profile-value-item clickable"
                     style="--dimension-color: ${config.color};"
                     data-resonanz-key="${key}"
                     onclick="ResonanzProfileHeaderCard.searchByResonanz('${key}')"
                     title="Klicke um nach ${key} Bedürfnissen zu suchen">
                    <div class="resonanz-profile-value-label">${config.label}</div>
                    <div class="resonanz-profile-value-id">${key}</div>
                    <div class="resonanz-profile-value-number">${displayValue}</div>
                    <div class="resonanz-profile-delta" id="delta-${key}"></div>
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
        const oldCard = document.querySelector('.resonanz-profile-header-card');
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

        console.log('[ResonanzProfileHeaderCard] Initialisiert');
    }

    /**
     * Zeigt eine Delta-Animation für einen R-Faktor (dauerhaft sichtbar)
     * @param {string} key - R1, R2, R3 oder R4
     * @param {number} delta - Die Änderung (positiv oder negativ)
     */
    function showDeltaAnimation(key, delta) {
        const deltaEl = document.getElementById(`delta-${key}`);
        if (!deltaEl) return;

        // Formatiere Delta
        const sign = delta > 0 ? '+' : '';
        const deltaText = `${sign}${delta.toFixed(2)}`;
        const arrow = delta > 0 ? '↑' : '↓';
        const colorClass = delta > 0 ? 'delta-positive' : 'delta-negative';

        // Setze Inhalt und Klasse - bleibt dauerhaft sichtbar
        deltaEl.textContent = `${arrow}${deltaText}`;
        deltaEl.className = `resonanz-profile-delta ${colorClass} delta-visible`;
    }

    /**
     * Aktualisiert die Header-Karte mit neuen Werten
     */
    function update() {
        const card = document.querySelector('.resonanz-profile-header-card');
        if (!card) {
            console.warn('[ResonanzProfileHeaderCard] Karte nicht gefunden, initialisiere neu');
            init();
            return;
        }

        const values = getCurrentValues();

        // Aktualisiere Werte und zeige Delta
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            const value = values[key];
            const displayValue = value.toFixed(2);
            const valueElement = card.querySelector(`[data-resonanz-key="${key}"] .resonanz-profile-value-number`);

            if (valueElement) {
                // Berechne Delta wenn vorheriger Wert existiert
                if (previousValues[key] !== null) {
                    const delta = value - previousValues[key];
                    // Zeige Delta nur wenn signifikant (> 0.005)
                    if (Math.abs(delta) > 0.005) {
                        showDeltaAnimation(key, delta);
                        console.log(`[ResonanzProfileHeaderCard] ${key} Delta: ${delta.toFixed(3)}`);
                    }
                }

                valueElement.textContent = displayValue;
            }

            // Aktualisiere vorherigen Wert
            previousValues[key] = value;
        });

        console.log('[ResonanzProfileHeaderCard] Aktualisiert');
    }

    /**
     * Sucht nach Bedürfnissen eines Resonanzfaktors (R1-R4)
     * Fügt Filter zur ActiveFilterCard hinzu
     * @param {string} resonanzId - R1, R2, R3 oder R4
     */
    function searchByResonanz(resonanzId) {
        // Nutze ActiveFilterCard für Multi-Filter
        if (typeof ActiveFilterCard !== 'undefined' && ActiveFilterCard.addFilter) {
            ActiveFilterCard.addFilter(resonanzId);
            console.log('[ResonanzProfileHeaderCard] Filter hinzugefügt:', resonanzId);
        } else {
            // Fallback: Direkter Suchfeld-Eintrag
            const searchInput = document.getElementById('profileReviewSearchInput');
            if (searchInput) {
                searchInput.value = resonanzId;
                if (typeof handleIntelligentSearch === 'function') {
                    handleIntelligentSearch(resonanzId);
                }
            }
        }
    }

    // Lausche auf Resonanzfaktoren-Änderungen
    window.addEventListener('resonanzfaktoren-changed', function(event) {
        // Update nur, wenn sich die Werte der aktuell angezeigten Person ändern
        const currentPerson = getCurrentPerson();
        if (event.detail && event.detail.person === currentPerson) {
            update();
        }
    });

    return {
        render,
        init,
        update,
        searchByResonanz,
        setLoading
    };
})();

// Auto-Initialisierung
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ResonanzProfileHeaderCard.init();
    });
} else {
    // DOM bereits geladen
    ResonanzProfileHeaderCard.init();
}

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanzProfileHeaderCard;
}
