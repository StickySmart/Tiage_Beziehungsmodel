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

    const ARCHETYPE_ORDER = ['single', 'duo', 'duo_flex', 'solopoly', 'poly_hedo', 'polyamor'];

    const ARCHETYPE_ICONS = {
        single: '★',
        duo: '♡',
        duo_flex: '⚡',
        solopoly: '◆',
        poly_hedo: '☀',
        polyamor: '♥'
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
        bisexuell: 'Bi'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHT (Gender Identity)
    // ═══════════════════════════════════════════════════════════════════════

    const GESCHLECHT_TYPES = [
        'cis_mann',
        'cis_frau',
        'trans_mann',
        'trans_frau',
        'nonbinaer',
        'genderfluid',
        'agender'
    ];

    const GESCHLECHT_SHORT = {
        'cis_mann': 'CM',
        'cis_frau': 'CF',
        'trans_mann': 'TM',
        'trans_frau': 'TF',
        'nonbinaer': 'NB',
        'genderfluid': 'GF',
        'agender': 'AG'
    };

    const GESCHLECHT_LABELS = {
        'cis_mann': 'Cis Mann',
        'cis_frau': 'Cis Frau',
        'trans_mann': 'Trans Mann',
        'trans_frau': 'Trans Frau',
        'nonbinaer': 'Nonbinär',
        'genderfluid': 'Genderfluid',
        'agender': 'Agender'
    };

    // Mapping für Orientierungslogik: Welches "wahrgenommene Geschlecht" hat jemand?
    const GESCHLECHT_CATEGORY = {
        'cis_mann': 'maennlich',
        'cis_frau': 'weiblich',
        'trans_mann': 'maennlich',
        'trans_frau': 'weiblich',
        'nonbinaer': 'nonbinaer',
        'genderfluid': 'fluid',
        'agender': 'agender'
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
            title: "Geschlechtsidentität",
            text: "Deine Geschlechtsidentität. Dies beeinflusst die Kompatibilität zusammen mit der sexuellen Orientierung."
        },
        cis_mann: {
            title: "Cis Mann",
            text: "Person, die bei Geburt männlich zugewiesen wurde und sich als Mann identifiziert."
        },
        cis_frau: {
            title: "Cis Frau",
            text: "Person, die bei Geburt weiblich zugewiesen wurde und sich als Frau identifiziert."
        },
        trans_mann: {
            title: "Trans Mann",
            text: "Person, die sich als Mann identifiziert, aber bei Geburt nicht männlich zugewiesen wurde."
        },
        trans_frau: {
            title: "Trans Frau",
            text: "Person, die sich als Frau identifiziert, aber bei Geburt nicht weiblich zugewiesen wurde."
        },
        nonbinaer: {
            title: "Nonbinär",
            text: "Person, die sich weder ausschließlich als Mann noch als Frau identifiziert."
        },
        genderfluid: {
            title: "Genderfluid",
            text: "Person, deren Geschlechtsidentität sich über Zeit verändert oder zwischen verschiedenen Identitäten wechselt."
        },
        agender: {
            title: "Agender",
            text: "Person, die sich mit keinem Geschlecht identifiziert oder geschlechtslos fühlt."
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
            title: "Bisexuell",
            text: "Anziehung zu beiden Geschlechtern."
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
        poly_hedo: {
            name: "Poly Hedo",
            shortDef: "Freiheitsorientierte Poly-Orientierung mit Fokus auf Genuss und Spontaneität.",
            keyPrinciples: [
                "Lebensfreude und Genuss als zentrale Werte",
                "Spontaneität über starre Regeln",
                "Vielfalt der Erfahrungen bereichert das Leben",
                "Intensität des Moments"
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
        }
    };

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
        GESCHLECHT_TYPES,
        GESCHLECHT_SHORT,
        GESCHLECHT_LABELS,
        GESCHLECHT_CATEGORY,
        STATUS_TYPES,

        // Tooltips
        DIMENSION_TOOLTIPS,

        // UI
        MOBILE_BREAKPOINT,

        // Helper: Ist mobil?
        isMobile() {
            return window.innerWidth <= MOBILE_BREAKPOINT;
        },

        // Helper: Archetyp-Name
        getArchetypeName(id) {
            return ARCHETYPE_DEFINITIONS[id]?.name || id;
        },

        // Helper: Archetyp-Icon
        getArchetypeIcon(id) {
            return ARCHETYPE_ICONS[id] || '?';
        },

        // Helper: Kategorie-Name
        getCategoryName(letter) {
            return CATEGORY_NAMES[letter] || letter;
        },

        // Helper: Geschlecht-Label
        getGeschlechtLabel(id) {
            return GESCHLECHT_LABELS[id] || id;
        },

        // Helper: Geschlecht-Kategorie für Orientierungslogik
        getGeschlechtCategory(id) {
            return GESCHLECHT_CATEGORY[id] || 'andere';
        }
    };
})();

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageConfig;
}
