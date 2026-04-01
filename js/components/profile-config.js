/**
 * PROFILE REVIEW CONFIGURATION
 *
 * Zentrale Konfiguration für alle Profile-Review-Attribute.
 * Data-driven Approach für dynamisches UI-Rendering.
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
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
                // Optionen sind kontextabhängig vom Primary (Körper):
                // - Mann/Frau (binär): ['Cis', 'Trans', 'Nonbinär']
                // - Inter (divers): ['Nonbinär', 'Fluid']
                optionsByPrimary: {
                    'mann': ['Cis', 'Trans', 'Nonbinär'],
                    'frau': ['Cis', 'Trans', 'Nonbinär'],
                    'inter': ['Nonbinär', 'Fluid']
                },
                options: ['Cis', 'Trans', 'Nonbinär'], // Default für binär
                defaultValue: 0,
                description: 'Geschlechtsidentität: Cis (Identität = Körper), Trans (Identität ≠ Körper), Nonbinär (jenseits der Dualität). Bei Inter: Nonbinär, Fluid.'
            }
        ],

        lebensplanung: [
            {
                attrId: 'pr-kinder',
                cardId: 'pr-kinder-card',
                label: 'Kinder',
                options: ['Nein', 'Offen', 'Ja'],
                defaultValue: 50,
                question: 'Wünschen Sie sich eigene Kinder in der Zukunft?',
                description: 'Wunsch nach eigenen Kindern oder Offenheit dafür in der Zukunft.'
            },
            {
                attrId: 'pr-ehe',
                cardId: 'pr-ehe-card',
                label: 'Ehe',
                options: ['Unwichtig', 'Offen', 'Wichtig'],
                defaultValue: 50,
                question: 'Wie wichtig ist Ihnen eine formelle Eheschließung?',
                description: 'Bedeutung einer formellen Eheschließung für die Beziehung.'
            },
            {
                attrId: 'pr-zusammen',
                cardId: 'pr-zusammen-card',
                label: 'Zusammen wohnen',
                options: ['Getrennt', 'Offen', 'Zusammen'],
                defaultValue: 50,
                question: 'Möchten Sie mit Ihrem Partner zusammenwohnen?',
                description: 'Präferenz für gemeinsames Wohnen oder getrennte Haushalte.'
            },
            {
                attrId: 'pr-haustiere',
                cardId: 'pr-haustiere-card',
                label: 'Haustiere',
                options: ['Ohne', 'Offen', 'Mit'],
                defaultValue: 50,
                question: 'Möchten Sie Haustiere im gemeinsamen Haushalt haben?',
                description: 'Einstellung zu Haustieren im gemeinsamen Haushalt.'
            },
            {
                attrId: 'pr-umzug',
                label: 'Umzugsbereitschaft',
                options: ['Sesshaft', 'Mittel', 'Flexibel'],
                defaultValue: 50,
                question: 'Wie bereit wären Sie, für die Beziehung umzuziehen?',
                description: 'Bereitschaft, für die Beziehung den Wohnort zu wechseln.'
            },
            {
                attrId: 'pr-familie',
                label: 'Familie-Wichtigkeit',
                options: ['Unwichtig', 'Wichtig', 'Sehr wichtig'],
                defaultValue: 50,
                question: 'Wie wichtig ist Ihnen der Kontakt zur Herkunftsfamilie?',
                description: 'Stellenwert der Herkunftsfamilie und regelmäßiger Kontakt.'
            }
        ],

        finanzen: [
            {
                attrId: 'pr-finanzen',
                label: 'Finanzen',
                options: ['Getrennt', 'Hybrid', 'Gemeinsam'],
                defaultValue: 50,
                question: 'Wie möchten Sie in einer Beziehung mit Geld umgehen?',
                description: 'Umgang mit Geld: getrennte Konten, Mischform oder gemeinsame Kasse.'
            },
            {
                attrId: 'pr-karriere',
                label: 'Karriere-Priorität',
                options: ['Familie', 'Balance', 'Karriere'],
                defaultValue: 50,
                question: 'Was ist wichtiger: Karriere oder Familie?',
                description: 'Gewichtung zwischen beruflichem Erfolg und Familienleben.'
            }
        ],

        kommunikation: [
            {
                attrId: 'pr-gespraech',
                label: 'Gesprächsbedürfnis',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                question: 'Wie viel täglichen Austausch und Gespräche brauchen Sie?',
                description: 'Bedürfnis nach täglichem Austausch und Gesprächen.'
            },
            {
                attrId: 'pr-emotional',
                label: 'Emotionale Offenheit',
                options: ['Zurückhaltend', 'Mittel', 'Sehr offen'],
                defaultValue: 50,
                question: 'Wie offen teilen Sie Ihre Gefühle und Emotionen?',
                description: 'Bereitschaft, Gefühle und Emotionen zu teilen.'
            },
            {
                attrId: 'pr-konflikt',
                label: 'Konfliktverhalten',
                options: ['Vermeidend', 'Mittel', 'Konfrontativ'],
                defaultValue: 50,
                question: 'Wie gehen Sie mit Konflikten um?',
                description: 'Art der Konfliktbewältigung: ausweichen oder direkt ansprechen.'
            }
        ],

        soziales: [
            {
                attrId: 'pr-introextro',
                label: 'Intro/Extrovertiert',
                options: ['Intro', 'Ambivert', 'Extro'],
                defaultValue: 50,
                question: 'Woher beziehen Sie Ihre Energie - aus Alleinsein oder sozialen Kontakten?',
                description: 'Energie durch Alleinsein (Intro) oder soziale Kontakte (Extro).'
            },
            {
                attrId: 'pr-alleinzeit',
                label: 'Alleinzeit-Bedürfnis',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                question: 'Wie viel Zeit für sich alleine brauchen Sie?',
                description: 'Bedürfnis nach Zeit für sich alleine ohne Partner.'
            },
            {
                attrId: 'pr-freunde',
                label: 'Freundeskreis',
                options: ['Getrennt', 'Gemischt', 'Gemeinsam'],
                defaultValue: 50,
                question: 'Möchten Sie getrennte oder gemeinsame Freunde mit Ihrem Partner?',
                description: 'Präferenz für eigene Freunde oder gemeinsamen Freundeskreis.'
            }
        ],

        intimitaet: [
            {
                attrId: 'pr-naehe',
                label: 'Körperliche Nähe',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                question: 'Wie viel körperliche Nähe (Berührungen, Umarmungen) brauchen Sie?',
                description: 'Bedürfnis nach Berührungen, Umarmungen und körperlicher Nähe.'
            },
            {
                attrId: 'pr-romantik',
                label: 'Romantik-Bedürfnis',
                options: ['Wenig', 'Mittel', 'Viel'],
                defaultValue: 50,
                question: 'Wie wichtig sind Ihnen romantische Gesten und Dates?',
                description: 'Wunsch nach romantischen Gesten, Überraschungen und Dates.'
            },
            {
                attrId: 'pr-sex',
                label: 'Sexuelle Frequenz',
                options: ['Selten', 'Mittel', 'Häufig'],
                defaultValue: 50,
                question: 'Wie häufig wünschen Sie sich Intimität in der Beziehung?',
                description: 'Gewünschte Häufigkeit von Intimität in der Beziehung.'
            }
        ],

        werte: [
            {
                attrId: 'pr-religion',
                label: 'Religiosität',
                options: ['Keine', 'Mittel', 'Stark'],
                defaultValue: 50,
                question: 'Welche Bedeutung hat Religion und Spiritualität für Sie?',
                description: 'Bedeutung von Religion und Spiritualität im Alltag.'
            },
            {
                attrId: 'pr-tradition',
                label: 'Tradition vs. Modern',
                options: ['Traditionell', 'Gemischt', 'Modern'],
                defaultValue: 50,
                question: 'Leben Sie eher nach traditionellen Werten oder modern?',
                description: 'Orientierung an traditionellen Werten oder modernen Lebensweisen.'
            },
            {
                attrId: 'pr-umwelt',
                label: 'Umweltbewusstsein',
                options: ['Gering', 'Mittel', 'Hoch'],
                defaultValue: 50,
                question: 'Wie wichtig ist Ihnen Nachhaltigkeit und Umweltschutz?',
                description: 'Wichtigkeit von Nachhaltigkeit und umweltbewusstem Leben.'
            }
        ],

        praktisches: [
            {
                attrId: 'pr-ordnung',
                label: 'Ordnung',
                options: ['Chaotisch', 'Mittel', 'Ordentlich'],
                defaultValue: 50,
                question: 'Wie ordentlich und sauber halten Sie Ihre Wohnung?',
                description: 'Präferenz für Ordnung und Sauberkeit im Wohnbereich.'
            },
            {
                attrId: 'pr-reise',
                label: 'Reise-Frequenz',
                options: ['Selten', 'Mittel', 'Häufig'],
                defaultValue: 50,
                question: 'Wie oft möchten Sie verreisen und Urlaub machen?',
                description: 'Wunsch nach Reisen und gemeinsamen Urlauben.'
            }
        ]
    };

    /**
     * Kategorie-Metadaten mit Farben für modales Design
     */
    const CATEGORIES = {
        gewichtung: { icon: '⚖️', label: 'FAKTOR-GEWICHTUNG (Score-Formel)', isGewichtung: true, color: '#6366F1' },
        resonanz: { icon: '🎵', label: 'RESONANZFAKTOREN (R1-R4)', isResonanz: true, color: '#22C55E' },
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
        return ['gewichtung', 'resonanz', 'geschlechtsidentitaet', 'lebensplanung', 'finanzen', 'kommunikation', 'soziales', 'intimitaet', 'werte', 'praktisches'];
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
