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
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
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

    // Speichert vorherige Werte für Delta-Berechnung (bei jeder Änderung)
    let previousValues = { R1: null, R2: null, R3: null, R4: null };

    // Flag: Initialisierungsphase (keine Deltas während Laden anzeigen)
    let isInitializing = true;

    // Snapshot-Werte: Gespeichert bei Filter-Änderung für Impact-Anzeige
    // Das "I-" Badge zeigt die Differenz zwischen Snapshot und aktuellem Wert
    let snapshotValues = { R1: null, R2: null, R3: null, R4: null };

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

            // v3.4: Richtungs-Indikator basierend auf R-Wert
            // R > 1.0 → mehr als Archetyp-typisch (↑ grün)
            // R = 1.0 → perfekt (= neutral)
            // R < 1.0 → weniger als Archetyp-typisch (↓ orange)
            let richtungSymbol = '';
            let richtungClass = '';
            let richtungTitle = '';
            const threshold = 0.01; // Toleranz für "perfekt"

            if (value > 1.0 + threshold) {
                richtungSymbol = '↑';
                richtungClass = 'richtung-mehr';
                richtungTitle = 'Mehr als typisch für deinen Archetyp';
            } else if (value < 1.0 - threshold) {
                richtungSymbol = '↓';
                richtungClass = 'richtung-weniger';
                richtungTitle = 'Weniger als typisch für deinen Archetyp';
            } else {
                richtungSymbol = '=';
                richtungClass = 'richtung-perfekt';
                richtungTitle = 'Perfekte Übereinstimmung mit Archetyp';
            }

            html += `
                <div class="resonanz-profile-value-item clickable"
                     style="--dimension-color: ${config.color};"
                     data-resonanz-key="${key}"
                     onclick="ResonanzProfileHeaderCard.searchByResonanz('${key}')"
                     title="Klicke um nach ${key} Bedürfnissen zu suchen">
                    <div class="resonanz-profile-value-label">${config.label}</div>
                    <div class="resonanz-profile-value-id">${key} <span class="resonanz-richtung ${richtungClass}" title="${richtungTitle}">${richtungSymbol}</span></div>
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
        // Setze Initialisierungsphase - keine Deltas während Laden
        isInitializing = true;

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

        // Nach kurzer Verzögerung Initialisierungsphase beenden
        // (damit automatische Neuberechnungen beim Laden keine Deltas anzeigen)
        setTimeout(function() {
            isInitializing = false;
            console.log('[ResonanzProfileHeaderCard] Initialisierungsphase beendet - Deltas ab jetzt sichtbar');
        }, 1500);

        console.log('[ResonanzProfileHeaderCard] Initialisiert');
    }

    /**
     * Speichert einen Snapshot der aktuellen R-Werte
     * Wird aufgerufen wenn Filter geändert wird, um später den Impact anzuzeigen
     */
    function saveSnapshot() {
        const values = getCurrentValues();
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            snapshotValues[key] = values[key];
        });

        // Verstecke alle Impact-Badges beim Snapshot
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            hideImpactBadge(key);
        });

        console.log('[ResonanzProfileHeaderCard] Snapshot gespeichert:', snapshotValues);
    }

    /**
     * Zeigt das Impact-Badge für einen R-Faktor
     * Format: "I-0.02" für negative Änderung, "I+0.02" für positive
     * @param {string} key - R1, R2, R3 oder R4
     * @param {number} impact - Die Differenz zum Snapshot (negativ = Verschlechterung)
     */
    function showImpactBadge(key, impact) {
        const deltaEl = document.getElementById(`delta-${key}`);
        if (!deltaEl) return;

        // Formatiere Impact im "I-0.02" Format
        const sign = impact >= 0 ? '+' : '';
        const impactText = `I${sign}${impact.toFixed(2)}`;
        const colorClass = impact >= 0 ? 'delta-positive' : 'delta-negative';

        // Setze Inhalt und Klasse - bleibt dauerhaft sichtbar
        deltaEl.textContent = impactText;
        deltaEl.className = `resonanz-profile-delta ${colorClass} delta-visible`;
    }

    /**
     * Versteckt das Impact-Badge für einen R-Faktor
     * @param {string} key - R1, R2, R3 oder R4
     */
    function hideImpactBadge(key) {
        const deltaEl = document.getElementById(`delta-${key}`);
        if (!deltaEl) return;

        deltaEl.textContent = '';
        deltaEl.className = 'resonanz-profile-delta';
    }

    /**
     * Zeigt eine Delta-Animation für einen R-Faktor (dauerhaft sichtbar)
     * @param {string} key - R1, R2, R3 oder R4
     * @param {number} delta - Die Änderung (positiv oder negativ)
     * @deprecated Verwende showImpactBadge() für das neue "I-" Format
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
     * Zeigt Impact-Badges basierend auf Snapshot-Differenz
     */
    function update() {
        const card = document.querySelector('.resonanz-profile-header-card');
        if (!card) {
            console.warn('[ResonanzProfileHeaderCard] Karte nicht gefunden, initialisiere neu');
            init();
            return;
        }

        const person = getCurrentPerson();
        const values = getCurrentValues();
        // console.log('%c[ResonanzProfileHeaderCard] update() für ' + person, 'background: purple; color: white;'); // DISABLED: verursacht Message-Overflow
        // console.log('[ResonanzProfileHeaderCard] Werte:', JSON.stringify(values)); // DISABLED: verursacht Message-Overflow

        // Aktualisiere Werte und zeige Impact-Badge
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            const value = values[key];
            const displayValue = value.toFixed(2);
            const valueElement = card.querySelector(`[data-resonanz-key="${key}"] .resonanz-profile-value-number`);

            if (valueElement) {
                // Berechne Impact zum Snapshot (wenn vorhanden)
                // WICHTIG: Zeige Impact NUR wenn nicht mehr in Initialisierungsphase
                if (snapshotValues[key] !== null && !isInitializing) {
                    const impact = value - snapshotValues[key];
                    // Zeige Impact-Badge nur wenn signifikant (> 0.005)
                    if (Math.abs(impact) > 0.005) {
                        showImpactBadge(key, impact);
                        console.log(`[ResonanzProfileHeaderCard] ${key} Impact zum Snapshot: ${impact.toFixed(3)}`);
                    } else {
                        // Verstecke Badge wenn kein signifikanter Impact
                        hideImpactBadge(key);
                    }
                }

                valueElement.textContent = displayValue;
            }

            // Aktualisiere vorherigen Wert (für eventuelle andere Nutzung)
            previousValues[key] = value;
        });

        console.log('[ResonanzProfileHeaderCard] Aktualisiert', isInitializing ? '(Initialisierungsphase)' : '');
    }

    /**
     * Sucht nach Bedürfnissen eines Resonanzfaktors (R1-R4)
     * Fügt Filter zur ActiveFilterCard hinzu
     * @param {string} resonanzId - R1, R2, R3 oder R4
     */
    function searchByResonanz(resonanzId) {
        // Nutze ActiveFilterCard für Multi-Filter (Toggle: Klick hinzufügt, erneuter Klick entfernt)
        if (typeof ActiveFilterCard !== 'undefined' && ActiveFilterCard.addFilter) {
            if (ActiveFilterCard.isFilterActive && ActiveFilterCard.isFilterActive(resonanzId)) {
                ActiveFilterCard.removeFilter(resonanzId.toUpperCase());
                console.log('[ResonanzProfileHeaderCard] Filter entfernt (Toggle):', resonanzId);
            } else {
                ActiveFilterCard.addFilter(resonanzId);
                console.log('[ResonanzProfileHeaderCard] Filter hinzugefügt:', resonanzId);
            }
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

    // Lausche auf Filter-Änderungen um Snapshot zu speichern und Buttons zu highlighten
    document.addEventListener('activeFilterChange', function(event) {
        console.log('[ResonanzProfileHeaderCard] Filter geändert, speichere Snapshot');
        saveSnapshot();
        updateFilterHighlights();
    });

    /**
     * Aktualisiert die visuellen Highlights der R-Buttons basierend auf aktiven Filtern
     */
    function updateFilterHighlights() {
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            const item = document.querySelector(`[data-resonanz-key="${key}"]`);
            if (!item) return;
            const isActive = typeof ActiveFilterCard !== 'undefined' &&
                             ActiveFilterCard.isFilterActive &&
                             ActiveFilterCard.isFilterActive(key);
            item.classList.toggle('filter-active', isActive);
        });
    }

    // Auch bei Person-Wechsel (ICH/PARTNER) Snapshot zurücksetzen
    window.addEventListener('personChanged', function(event) {
        console.log('[ResonanzProfileHeaderCard] Person gewechselt, setze Snapshot zurück');
        // Setze Snapshot zurück
        ['R1', 'R2', 'R3', 'R4'].forEach(key => {
            snapshotValues[key] = null;
            hideImpactBadge(key);
        });
    });

    return {
        render,
        init,
        update,
        searchByResonanz,
        setLoading,
        saveSnapshot,
        showImpactBadge,
        hideImpactBadge
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
