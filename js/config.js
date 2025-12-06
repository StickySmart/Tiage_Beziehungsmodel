/**
 * KONFIGURATION - Konstanten und statische Daten
 *
 * Zentrale Konfigurationsdatei für alle Konstanten.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageConfig = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPEN
    // ═══════════════════════════════════════════════════════════════════════

    const ARCHETYPE_ORDER = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

    const ARCHETYPE_ICONS = {
        single: '★',
        duo: '♡',
        duo_flex: '⚡',
        solopoly: '◆',
        polyamor: '♥',
        ra: '∞',
        lat: '⌂',
        aromantisch: '◇'
    };

    const CATEGORY_NAMES = {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'Nähe-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilität'
    };

    const CATEGORY_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANZ
    // ═══════════════════════════════════════════════════════════════════════

    const DOMINANZ_TYPES = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];

    const DOMINANZ_SHORT = {
        dominant: 'Dom',
        submissiv: 'Sub',
        switch: 'Swi',
        ausgeglichen: 'Aus'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG
    // ═══════════════════════════════════════════════════════════════════════

    const ORIENTIERUNG_TYPES = ['heterosexuell', 'homosexuell', 'bisexuell'];

    const ORIENTIERUNG_SHORT = {
        heterosexuell: 'Hetero',
        homosexuell: 'Homo',
        bisexuell: 'Bi/Pan'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHT (Zwei-Dimensionales System: Körper + Identität)
    // ═══════════════════════════════════════════════════════════════════════

    // PRIMÄR = Körper/Geburt (biologisches Geschlecht)
    const GESCHLECHT_PRIMARY_TYPES = ['mann', 'frau', 'inter'];

    const GESCHLECHT_PRIMARY_SHORT = {
        'mann': 'M',
        'frau': 'F',
        'inter': 'I'
    };

    const GESCHLECHT_PRIMARY_LABELS = {
        'mann': 'Mann',
        'frau': 'Frau',
        'inter': 'Inter'
    };

    // SEKUNDÄR = Geist/Identität (wie man sich fühlt)
    // Skala: Cis(0) → Trans(25) → Nonbinär(50) → Fluid(75) → Suchend(100)
    const GESCHLECHT_SECONDARY_TYPES = ['mann', 'frau', 'nonbinaer', 'fluid', 'suchend'];

    const GESCHLECHT_SECONDARY_SHORT = {
        'mann': 'M',
        'frau': 'F',
        'nonbinaer': 'NB',
        'fluid': 'FL',
        'suchend': 'Su'
    };

    const GESCHLECHT_SECONDARY_LABELS = {
        'mann': 'Mann',
        'frau': 'Frau',
        'nonbinaer': 'Nonbinär',
        'fluid': 'Fluid',
        'suchend': 'Suchend'
    };

    // LEGACY: Alte GESCHLECHT_TYPES für Rückwärtskompatibilität (deprecated)
    const GESCHLECHT_TYPES = GESCHLECHT_PRIMARY_TYPES;
    const GESCHLECHT_SHORT = GESCHLECHT_PRIMARY_SHORT;
    const GESCHLECHT_LABELS = GESCHLECHT_PRIMARY_LABELS;

    // EXPERTEN-MODUS: Detaillierte Geschlechtsidentitäten (alte 9-Optionen-Liste)
    const GESCHLECHT_DETAILED_TYPES = [
        'cis_mann', 'cis_frau', 'trans_mann', 'trans_frau',
        'nonbinaer', 'genderfluid', 'agender', 'intersex', 'divers'
    ];

    const GESCHLECHT_DETAILED_SHORT = {
        'cis_mann': 'CM',
        'cis_frau': 'CF',
        'trans_mann': 'TM',
        'trans_frau': 'TF',
        'nonbinaer': 'NB',
        'genderfluid': 'GF',
        'agender': 'AG',
        'intersex': 'IX',
        'divers': 'DI'
    };

    const GESCHLECHT_DETAILED_LABELS = {
        'cis_mann': 'Cis Mann',
        'cis_frau': 'Cis Frau',
        'trans_mann': 'Trans Mann',
        'trans_frau': 'Trans Frau',
        'nonbinaer': 'Nonbinär',
        'genderfluid': 'Genderfluid',
        'agender': 'Agender',
        'intersex': 'Intersex',
        'divers': 'Divers'
    };

    // Mapping für Orientierungslogik: Sekundär (Identität) bestimmt die Kategorie
    const GESCHLECHT_CATEGORY = {
        // Sekundär-Werte -> Orientierungskategorie
        'mann': 'maennlich',
        'frau': 'weiblich',
        'nonbinaer': 'nonbinaer',
        'fluid': 'fluid',
        'suchend': 'suchend',  // Suchend = eigene Kategorie (Exploration)
        // Primär-Werte (Fallback)
        'inter': 'inter'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // STATUS
    // ═══════════════════════════════════════════════════════════════════════

    const STATUS_TYPES = ['gelebt', 'interessiert'];

    // ═══════════════════════════════════════════════════════════════════════
    // UI BREAKPOINTS
    // ═══════════════════════════════════════════════════════════════════════

    const MOBILE_BREAKPOINT = 768;

    // ═══════════════════════════════════════════════════════════════════════
    // TOOLTIPS
    // ═══════════════════════════════════════════════════════════════════════

    const DIMENSION_TOOLTIPS = {
        geschlecht: {
            title: "Geschlecht",
            text: "Zwei Dimensionen: Körper (biologisch) und Identität / Psychologische Seele (wie du dich fühlst). Dies beeinflusst die Kompatibilität zusammen mit der sexuellen Orientierung."
        },
        geschlecht_primary: {
            title: "Körper (Primär)",
            text: "Dein biologisches/bei Geburt zugewiesenes Geschlecht."
        },
        geschlecht_secondary: {
            title: "Identität / Psychologische Seele (Sekundär)",
            text: "Wie du dich innerlich fühlst und identifizierst."
        },
        // Primär-Werte (Körper)
        primary_mann: {
            title: "Mann (Körper)",
            text: "Bei Geburt männlich zugewiesen."
        },
        primary_frau: {
            title: "Frau (Körper)",
            text: "Bei Geburt weiblich zugewiesen."
        },
        primary_inter: {
            title: "Inter (Körper)",
            text: "Angeborene körperliche Geschlechtsmerkmale, die nicht eindeutig männlich oder weiblich sind."
        },
        // Sekundär-Werte (Identität)
        secondary_mann: {
            title: "Mann (Identität)",
            text: "Du identifizierst dich als Mann."
        },
        secondary_frau: {
            title: "Frau (Identität)",
            text: "Du identifizierst dich als Frau."
        },
        secondary_nonbinaer: {
            title: "Nonbinär (Identität)",
            text: "Du identifizierst dich weder ausschließlich als Mann noch als Frau."
        },
        secondary_fluid: {
            title: "Fluid (Identität)",
            text: "Deine Geschlechtsidentität verändert sich über Zeit oder wechselt zwischen verschiedenen Identitäten."
        },
        secondary_unsicher: {
            title: "Unsicher (Identität)",
            text: "Du bist dir über deine Geschlechtsidentität noch nicht sicher oder befindest dich in einer Explorationsphase."
        },
        dominanz: {
            title: "Dominanz-Präferenz",
            text: "Welche Rolle bevorzugst du in der emotionalen und praktischen Beziehungsdynamik?"
        },
        orientierung: {
            title: "Sexuelle Orientierung",
            text: "Zu welchem Geschlecht fühlst du dich romantisch und/oder sexuell hingezogen?"
        },
        status: {
            title: "Orientierungs-Status",
            text: "Gelebt: Du lebst diese Orientierung und bist dir sicher.\n\nInteressiert: Du bist neugierig oder in einer Explorationsphase."
        },
        dominanzStatus: {
            title: "Dominanz-Status",
            text: "Gelebt: Du kennst deine Dominanz-Präferenz und lebst sie aktiv.\n\nInteressiert: Du bist noch am Erkunden."
        },
        dominant: {
            title: "Dominant",
            text: "Der Führende - Du übernimmst gerne Führung und Verantwortung in Beziehungen."
        },
        submissiv: {
            title: "Submissiv",
            text: "Der Folgende - Du lässt dich gerne führen und vertraust auf deinen Partner."
        },
        switch: {
            title: "Switch",
            text: "Der Flexible - Du genießt beide Rollen je nach Situation und Partner."
        },
        ausgeglichen: {
            title: "Ausgeglichen",
            text: "Der Zentrierte - Du bevorzugst eine gleichberechtigte Dynamik ohne feste Rollen."
        },
        heterosexuell: {
            title: "Heterosexuell",
            text: "Anziehung zum anderen Geschlecht."
        },
        homosexuell: {
            title: "Homosexuell",
            text: "Anziehung zum gleichen Geschlecht."
        },
        bisexuell: {
            title: "Bi-/Pansexuell",
            text: "Anziehung zu mehreren oder allen Geschlechtern, unabhängig von Geschlechtsidentität."
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPEN-DEFINITIONEN
    // ═══════════════════════════════════════════════════════════════════════

    const ARCHETYPE_DEFINITIONS = {
        single: {
            name: "Single",
            shortDef: "Bewusste Entscheidung für ein autonomes Leben ohne Primärbeziehung als dauerhafte Lebensform.",
            keyPrinciples: [
                "Selbstgenügsamkeit als Wert, nicht als Mangel",
                "Persönliche Autonomie über Verbindlichkeit",
                "Beziehungen als Option, nicht als Notwendigkeit",
                "Erfüllung durch Selbst, Freunde, Projekte"
            ]
        },
        duo: {
            name: "Duo",
            shortDef: "Traditionelle monogame Zweierbeziehung mit Exklusivität und gemeinsamer Lebensgestaltung.",
            keyPrinciples: [
                "Exklusivität als Ausdruck von Verbindlichkeit",
                "'Wir' als zentrale Einheit über 'Ich'",
                "Tiefe durch Fokussierung auf eine Person",
                "Gemeinsame Lebensgestaltung und Zukunftsplanung"
            ]
        },
        duo_flex: {
            name: "Duo-Flex",
            shortDef: "Primäre Zweierbeziehung mit vereinbarten Öffnungen für zusätzliche Kontakte.",
            keyPrinciples: [
                "Primärbeziehung als Anker und Priorität",
                "Sexuelle/romantische Vielfalt ohne Hierarchie-Aufgabe",
                "Ehrlichkeit und Transparenz über alle Kontakte",
                "Freiheit innerhalb vereinbarter Grenzen"
            ]
        },
        solopoly: {
            name: "Solopoly",
            shortDef: "Mehrere gleichwertige Beziehungen bei bewusster Bewahrung der eigenen Autonomie.",
            keyPrinciples: [
                "Autonomie als höchster Wert - auch in Beziehungen",
                "Mehrere gleichwertige Beziehungen ohne Hierarchie",
                "Keine Verschmelzung oder gemeinsame Haushalte",
                "'Ich bin mein eigener Primärpartner'"
            ]
        },
        polyamor: {
            name: "Polyamor",
            shortDef: "Mehrere gleichzeitige, ethisch geführte Liebesbeziehungen mit Transparenz.",
            keyPrinciples: [
                "Liebe ist nicht begrenzt oder exklusiv",
                "Ehrlichkeit und Transparenz gegenüber allen",
                "Konsens und Einvernehmlichkeit als Basis",
                "Kommunikation als zentrale Kompetenz"
            ]
        },
        ra: {
            name: "RA",
            shortDef: "RA - Ablehnung aller Beziehungs-Hierarchien und Labels.",
            keyPrinciples: [
                "Jede Beziehung wird individuell definiert",
                "Keine vorgegebenen Kategorien oder Labels",
                "Gleichwertigkeit aller Verbindungen",
                "Radikale Autonomie und Freiheit"
            ]
        },
        lat: {
            name: "LAT",
            shortDef: "Living Apart Together - Feste Partnerschaft ohne Zusammenleben.",
            keyPrinciples: [
                "Verbindlichkeit ohne Zusammenleben",
                "Eigener Raum als Wert",
                "Qualitätszeit statt Quantität",
                "Bewusste Nähe durch gewählte Distanz"
            ]
        },
        aromantisch: {
            name: "Aromantisch",
            shortDef: "Fokus auf platonische Verbindungen ohne romantische Komponente.",
            keyPrinciples: [
                "Tiefe Verbindungen ohne Romantik",
                "Freundschaft als gleichwertiges Beziehungsmodell",
                "Authentizität jenseits romantischer Normen",
                "Platonische Liebe als vollwertige Verbindung"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER: i18n Integration
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get translated value from i18n if available, otherwise return fallback
     * @param {string} path - i18n path (e.g., 'archetypes.single.name')
     * @param {*} fallback - Fallback value if i18n not available
     * @returns {*} Translated value or fallback
     */
    function i18n(path, fallback) {
        if (typeof TiageI18n !== 'undefined' && TiageI18n.t) {
            const translated = TiageI18n.t(path);
            if (translated && translated !== path) {
                return translated;
            }
        }
        return fallback;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Archetypen
        ARCHETYPE_ORDER,
        ARCHETYPE_ICONS,
        ARCHETYPE_DEFINITIONS,

        // Kategorien
        CATEGORY_NAMES,
        CATEGORY_LETTERS,

        // Dimensionen
        DOMINANZ_TYPES,
        DOMINANZ_SHORT,
        ORIENTIERUNG_TYPES,
        ORIENTIERUNG_SHORT,
        // Neues Geschlechts-System (Primär/Sekundär)
        GESCHLECHT_PRIMARY_TYPES,
        GESCHLECHT_PRIMARY_SHORT,
        GESCHLECHT_PRIMARY_LABELS,
        GESCHLECHT_SECONDARY_TYPES,
        GESCHLECHT_SECONDARY_SHORT,
        GESCHLECHT_SECONDARY_LABELS,
        // Legacy (deprecated, für Rückwärtskompatibilität)
        GESCHLECHT_TYPES,
        GESCHLECHT_SHORT,
        GESCHLECHT_LABELS,
        GESCHLECHT_CATEGORY,
        // Experten-Modus: Detaillierte Geschlechtsidentitäten
        GESCHLECHT_DETAILED_TYPES,
        GESCHLECHT_DETAILED_SHORT,
        GESCHLECHT_DETAILED_LABELS,
        STATUS_TYPES,

        // Tooltips
        DIMENSION_TOOLTIPS,

        // UI
        MOBILE_BREAKPOINT,

        // Helper: Ist mobil?
        isMobile() {
            return window.innerWidth <= MOBILE_BREAKPOINT;
        },

        // Helper: Archetyp-Name (i18n aware)
        getArchetypeName(id) {
            return i18n(`archetypes.${id}.name`, ARCHETYPE_DEFINITIONS[id]?.name || id);
        },

        // Helper: Archetyp-Definition (i18n aware)
        getArchetypeDefinition(id) {
            const def = ARCHETYPE_DEFINITIONS[id];
            if (!def) return null;

            return {
                name: i18n(`archetypes.${id}.name`, def.name),
                shortDef: i18n(`archetypes.${id}.shortDef`, def.shortDef),
                keyPrinciples: i18n(`archetypes.${id}.keyPrinciples`, def.keyPrinciples)
            };
        },

        // Helper: Archetyp-Icon
        getArchetypeIcon(id) {
            return ARCHETYPE_ICONS[id] || '?';
        },

        // Helper: Kategorie-Name (i18n aware)
        getCategoryName(letter) {
            return i18n(`categories.${letter}`, CATEGORY_NAMES[letter] || letter);
        },

        // Helper: Geschlecht Primary Label (i18n aware)
        getGeschlechtPrimaryLabel(id) {
            return i18n(`geschlecht.primary.${id}`, GESCHLECHT_PRIMARY_LABELS[id] || id);
        },

        // Helper: Geschlecht Primary Short (i18n aware)
        getGeschlechtPrimaryShort(id) {
            return i18n(`geschlecht.primaryShort.${id}`, GESCHLECHT_PRIMARY_SHORT[id] || id);
        },

        // Helper: Geschlecht Secondary Label (i18n aware)
        getGeschlechtSecondaryLabel(id) {
            return i18n(`geschlecht.secondary.${id}`, GESCHLECHT_SECONDARY_LABELS[id] || id);
        },

        // Helper: Geschlecht Secondary Short (i18n aware)
        getGeschlechtSecondaryShort(id) {
            return i18n(`geschlecht.secondaryShort.${id}`, GESCHLECHT_SECONDARY_SHORT[id] || id);
        },

        // Helper: Kombiniertes Label (z.B. "Mann → Frau" für trans)
        getGeschlechtKombiLabel(primary, secondary) {
            const pLabel = this.getGeschlechtPrimaryLabel(primary);
            const sLabel = this.getGeschlechtSecondaryLabel(secondary);
            if (primary === secondary) {
                return pLabel;  // Cis: nur ein Label
            }
            return `${pLabel} → ${sLabel}`;
        },

        // Helper: Kombiniertes Short (z.B. "M→F")
        getGeschlechtKombiShort(primary, secondary) {
            const pShort = GESCHLECHT_PRIMARY_SHORT[primary] || '?';
            const sShort = GESCHLECHT_SECONDARY_SHORT[secondary] || '?';
            if (primary === secondary) {
                return pShort;
            }
            return `${pShort}→${sShort}`;
        },

        // Helper: Geschlecht-Kategorie für Orientierungslogik
        // Nutzt SEKUNDÄR (Identität) als primäre Kategorie für Orientierung
        getGeschlechtCategory(id) {
            return GESCHLECHT_CATEGORY[id] || 'andere';
        },

        // Legacy Helper (deprecated)
        getGeschlechtLabel(id) {
            return i18n(`geschlecht.types.${id}`, GESCHLECHT_LABELS[id] || id);
        },

        // Legacy Helper (deprecated)
        getGeschlechtShort(id) {
            return i18n(`geschlecht.short.${id}`, GESCHLECHT_SHORT[id] || id);
        },

        // Helper: Dominanz-Label (i18n aware)
        getDominanzLabel(type) {
            return i18n(`dominanz.types.${type}`, type);
        },

        // Helper: Dominanz-Short (i18n aware)
        getDominanzShort(type) {
            return i18n(`dominanz.short.${type}`, DOMINANZ_SHORT[type] || type);
        },

        // Helper: Orientierung-Label (i18n aware)
        getOrientierungLabel(type) {
            return i18n(`orientierung.types.${type}`, type);
        },

        // Helper: Orientierung-Short (i18n aware)
        getOrientierungShort(type) {
            return i18n(`orientierung.short.${type}`, ORIENTIERUNG_SHORT[type] || type);
        },

        // Helper: Status-Label (i18n aware)
        getStatusLabel(status) {
            return i18n(`ui.${status}`, status);
        },

        // Helper: Tooltip (i18n aware)
        getTooltip(key) {
            const i18nTooltip = i18n(`tooltips.${key}`, null);
            if (i18nTooltip && typeof i18nTooltip === 'object') {
                return i18nTooltip;
            }
            return DIMENSION_TOOLTIPS[key] || { title: key, text: '' };
        },

        // Helper: Person-Label (i18n aware) - ICH/ME, PARTNER
        getPersonLabel(person) {
            return i18n(`ui.${person}`, person === 'ich' ? 'ICH' : 'PARTNER');
        }
    };
})();

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageConfig;
}
