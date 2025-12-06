/**
 * PROFILE REVIEW CONFIGURATION
 *
 * Zentrale Konfiguration für alle Profile-Review-Attribute.
 * Data-driven Approach für dynamisches UI-Rendering.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ProfileReviewConfig = (function() {
    'use strict';

    /**
     * Attribut-Konfigurationen nach Kategorie
     */
    const ATTRIBUTES = {
        geschlechtsidentitaet: [
            {
                attrId: 'pr-geschlecht-sekundaer',
                cardId: 'pr-geschlecht-sekundaer-card',
                label: 'Geschlechtsidentität',
                hint: 'Sekundär',
                // Options are dynamically set in updateGeschlechtsidentitaetOptions:
                // Mann/Frau: ['Cis', 'Trans', 'Suchend']
                // Inter: ['Nonbinär', 'Fluid', 'Suchend']
                options: ['Cis', 'Trans', 'Suchend'],
                defaultValue: 0,
                description: 'Geschlechtsidentität: Cis (Identität = Körper), Trans (Identität ≠ Körper), Suchend (in Exploration). Bei Inter: Nonbinär, Fluid, Suchend.'
            }
        ],

        lebensplanung: [
            {
                attrId: 'pr-kinder',
                cardId: 'pr-kinder-card',
                label: 'Kinder',
                hint: 'wichtig ?',
                options: ['Nein', 'Offen', 'Ja'],
                defaultValue: 50,
                description: 'Wunsch nach eigenen Kindern oder Offenheit dafür in der Zukunft.'
            },
            {
                attrId: 'pr-ehe',
                cardId: 'pr-ehe-card',
                label: 'Ehe',
                hint: 'wichtig ?',
                options: ['Unwichtig', 'Offen', 'Wichtig'],
                defaultValue: 50,
                description: 'Bedeutung einer formellen Eheschließung für die Beziehung.'
            },
            {
                attrId: 'pr-zusammen',
                cardId: 'pr-zusammen-card',
                label: 'Zusammen wohnen',
                hint: 'wichtig ?',
                options: ['Getrennt', 'Offen', 'Zusammen'],
                defaultValue: 50,
                description: 'Präferenz für gemeinsames Wohnen oder getrennte Haushalte.'
            },
            {
                attrId: 'pr-haustiere',
                cardId: 'pr-haustiere-card',
                label: 'Haustiere',
                hint: 'wichtig ?',
                options: ['Ohne', 'Offen', 'Mit'],
                defaultValue: 50,
                description: 'Einstellung zu Haustieren im gemeinsamen Haushalt.'
            },
            {
                attrId: 'pr-umzug',
                label: 'Umzugsbereitschaft',
                hint: 'wichtig ?',
                options: ['Sesshaft', 'Mittel', 'Flexibel'],
                defaultValue: 50,
                description: 'Bereitschaft, für die Beziehung den Wohnort zu wechseln.'
            },
            {
                attrId: 'pr-familie',
                label: 'Familie-Wichtigkeit',
                hint: 'wichtig ?',
                options: ['Unwichtig', 'Wichtig', 'Sehr wichtig'],
                defaultValue: 50,
                description: 'Stellenwert der Herkunftsfamilie und regelmäßiger Kontakt.'
            }
        ],

        finanzen: [
            {
                attrId: 'pr-finanzen',
                label: 'Finanzen',
                hint: 'wichtig ?',
                options: ['Getrennt', 'Hybrid', 'Gemeinsam'],
                defaultValue: 50,
                description: 'Umgang mit Geld: getrennte Konten, Mischform oder gemeinsame Kasse.'
            },
            {
                attrId: 'pr-karriere',
                label: 'Karriere-Priorität',
                hint: 'wichtig ?',
                options: ['Familie', 'Balance', 'Karriere'],
                defaultValue: 50,
                description: 'Gewichtung zwischen beruflichem Erfolg und Familienleben.'
            }
        ],

        kommunikation: [
            {
                attrId: 'pr-gespraech',
                label: 'Gesprächsbedürfnis',
                hint: 'wichtig ?',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                description: 'Bedürfnis nach täglichem Austausch und Gesprächen.'
            },
            {
                attrId: 'pr-emotional',
                label: 'Emotionale Offenheit',
                hint: 'wichtig ?',
                options: ['Zurückhaltend', 'Mittel', 'Sehr offen'],
                defaultValue: 50,
                description: 'Bereitschaft, Gefühle und Emotionen zu teilen.'
            },
            {
                attrId: 'pr-konflikt',
                label: 'Konfliktverhalten',
                hint: 'wichtig ?',
                options: ['Vermeidend', 'Mittel', 'Konfrontativ'],
                defaultValue: 50,
                description: 'Art der Konfliktbewältigung: ausweichen oder direkt ansprechen.'
            }
        ],

        soziales: [
            {
                attrId: 'pr-introextro',
                label: 'Intro/Extrovertiert',
                hint: 'wichtig ?',
                options: ['Intro', 'Ambivert', 'Extro'],
                defaultValue: 50,
                description: 'Energie durch Alleinsein (Intro) oder soziale Kontakte (Extro).'
            },
            {
                attrId: 'pr-alleinzeit',
                label: 'Alleinzeit-Bedürfnis',
                hint: 'wichtig ?',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                description: 'Bedürfnis nach Zeit für sich alleine ohne Partner.'
            },
            {
                attrId: 'pr-freunde',
                label: 'Freundeskreis',
                hint: 'wichtig ?',
                options: ['Getrennt', 'Gemischt', 'Gemeinsam'],
                defaultValue: 50,
                description: 'Präferenz für eigene Freunde oder gemeinsamen Freundeskreis.'
            }
        ],

        intimitaet: [
            {
                attrId: 'pr-naehe',
                label: 'Körperliche Nähe',
                hint: 'wichtig ?',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                description: 'Bedürfnis nach Berührungen, Umarmungen und körperlicher Nähe.'
            },
            {
                attrId: 'pr-romantik',
                label: 'Romantik-Bedürfnis',
                hint: 'wichtig ?',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                description: 'Wunsch nach romantischen Gesten, Überraschungen und Dates.'
            },
            {
                attrId: 'pr-sex',
                label: 'Sexuelle Frequenz',
                hint: 'wichtig ?',
                options: ['Selten', 'Mittel', 'Häufig'],
                defaultValue: 50,
                description: 'Gewünschte Häufigkeit von Intimität in der Beziehung.'
            }
        ],

        werte: [
            {
                attrId: 'pr-religion',
                label: 'Religiosität',
                hint: 'wichtig ?',
                options: ['Keine', 'Mittel', 'Stark'],
                defaultValue: 50,
                description: 'Bedeutung von Religion und Spiritualität im Alltag.'
            },
            {
                attrId: 'pr-tradition',
                label: 'Tradition vs. Modern',
                hint: 'wichtig ?',
                options: ['Traditionell', 'Gemischt', 'Modern'],
                defaultValue: 50,
                description: 'Orientierung an traditionellen Werten oder modernen Lebensweisen.'
            },
            {
                attrId: 'pr-umwelt',
                label: 'Umweltbewusstsein',
                hint: 'wichtig ?',
                options: ['Gering', 'Mittel', 'Hoch'],
                defaultValue: 50,
                description: 'Wichtigkeit von Nachhaltigkeit und umweltbewusstem Leben.'
            }
        ],

        praktisches: [
            {
                attrId: 'pr-ordnung',
                label: 'Ordnung',
                hint: 'wichtig ?',
                options: ['Chaotisch', 'Mittel', 'Ordentlich'],
                defaultValue: 50,
                description: 'Präferenz für Ordnung und Sauberkeit im Wohnbereich.'
            },
            {
                attrId: 'pr-reise',
                label: 'Reise-Frequenz',
                hint: 'wichtig ?',
                options: ['Selten', 'Mittel', 'Häufig'],
                defaultValue: 50,
                description: 'Wunsch nach Reisen und gemeinsamen Urlauben.'
            }
        ]
    };

    /**
     * Kategorie-Metadaten mit Farben für modales Design
     */
    const CATEGORIES = {
        gewichtung: { icon: '⚖️', label: 'FAKTOR-GEWICHTUNG (Score-Formel)', isGewichtung: true, color: '#6366F1' },
        geschlechtsidentitaet: { icon: '⚧', label: 'GESCHLECHTSIDENTITÄT', color: '#EC4899' },
        lebensplanung: { icon: '📋', label: 'LEBENSPLANUNG', color: '#F4A261' },
        finanzen: { icon: '💰', label: 'FINANZEN & KARRIERE', color: '#10B981' },
        kommunikation: { icon: '💬', label: 'KOMMUNIKATION', color: '#8B5CF6' },
        soziales: { icon: '👥', label: 'SOZIALES', color: '#3B82F6' },
        intimitaet: { icon: '💕', label: 'INTIMITÄT', color: '#E84393' },
        werte: { icon: '⚖️', label: 'WERTE', color: '#F59E0B' },
        praktisches: { icon: '🏠', label: 'PRAKTISCHES', color: '#14B8A6' }
    };

    /**
     * Holt Attribute einer Kategorie
     * @param {string} category - Kategorie-Key
     * @returns {Array} Attribut-Array
     */
    function getAttributes(category) {
        return ATTRIBUTES[category] || [];
    }

    /**
     * Holt alle Attribute als flaches Array
     * @returns {Array} Alle Attribute
     */
    function getAllAttributes() {
        return Object.values(ATTRIBUTES).flat();
    }

    /**
     * Holt Kategorie-Info
     * @param {string} category - Kategorie-Key
     * @returns {Object} Kategorie-Metadaten
     */
    function getCategory(category) {
        return CATEGORIES[category];
    }

    /**
     * Holt alle Kategorie-Keys (in Reihenfolge)
     * @returns {Array<string>} Kategorie-Keys
     */
    function getCategoryOrder() {
        return ['gewichtung', 'geschlechtsidentitaet', 'lebensplanung', 'finanzen', 'kommunikation', 'soziales', 'intimitaet', 'werte', 'praktisches'];
    }

    /**
     * Findet ein Attribut nach ID
     * @param {string} attrId - Attribut-ID
     * @returns {Object|null} Attribut-Konfiguration
     */
    function findAttribute(attrId) {
        for (const attrs of Object.values(ATTRIBUTES)) {
            const found = attrs.find(a => a.attrId === attrId);
            if (found) return found;
        }
        return null;
    }

    /**
     * Findet ein Attribut mit seiner Kategorie-Info
     * @param {string} attrId - Attribut-ID
     * @returns {Object|null} Attribut mit Kategorie-Metadaten
     */
    function findAttributeWithCategory(attrId) {
        for (const [categoryKey, attrs] of Object.entries(ATTRIBUTES)) {
            const found = attrs.find(a => a.attrId === attrId);
            if (found) {
                const category = CATEGORIES[categoryKey];
                return {
                    ...found,
                    kategorie: category.label,
                    kategorieColor: category.color,
                    kategorieIcon: category.icon
                };
            }
        }
        return null;
    }

    return {
        ATTRIBUTES,
        CATEGORIES,
        getAttributes,
        getAllAttributes,
        getCategory,
        getCategoryOrder,
        findAttribute,
        findAttributeWithCategory
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileReviewConfig;
}
