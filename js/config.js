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
    // DOMINANZ (Zwei-Dimensionales System: Sexuell + Sozial)
    // ═══════════════════════════════════════════════════════════════════════

    // PRIMÄR = Sexuelle Dominanz (im intimen Bereich)
    const DOMINANZ_PRIMARY_TYPES = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];

    const DOMINANZ_PRIMARY_SHORT = {
        dominant: 'Dom',
        submissiv: 'Sub',
        switch: 'Swi',
        ausgeglichen: 'Aus'
    };

    const DOMINANZ_PRIMARY_LABELS = {
        dominant: 'Dominant',
        submissiv: 'Submissiv',
        switch: 'Switch',
        ausgeglichen: 'Ausgeglichen'
    };

    // SEKUNDÄR = Soziale Dominanz (im Alltag/Beziehung)
    const DOMINANZ_SECONDARY_TYPES = ['fuehrend', 'folgend', 'flexibel', 'partnerschaftlich'];

    const DOMINANZ_SECONDARY_SHORT = {
        fuehrend: 'Führ',
        folgend: 'Folg',
        flexibel: 'Flex',
        partnerschaftlich: 'Part'
    };

    const DOMINANZ_SECONDARY_LABELS = {
        fuehrend: 'Führend',
        folgend: 'Folgend',
        flexibel: 'Flexibel',
        partnerschaftlich: 'Partnerschaftlich'
    };

    // LEGACY: Alte DOMINANZ_TYPES für Rückwärtskompatibilität
    const DOMINANZ_TYPES = DOMINANZ_PRIMARY_TYPES;
    const DOMINANZ_SHORT = DOMINANZ_PRIMARY_SHORT;

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG (Multi-Select System v4.0)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // v4.0: Multi-Select - User kann mehrere Orientierungen wählen
    // - Heterosexuell: Angezogen vom anderen Geschlecht
    // - Gay/Lesbisch: Angezogen vom gleichen Geschlecht
    // - Bisexuell: Angezogen von Mann und Frau
    // - Pansexuell/Queer: Angezogen unabhängig vom Geschlecht / Umbrella-Term
    //
    // R4 (Identitäts-Resonanz) wird jetzt aus Orientierung berechnet statt aus Cis/Trans
    // ═══════════════════════════════════════════════════════════════════════

    // Multi-Select fähige Orientierungen
    const ORIENTIERUNG_TYPES = ['heterosexuell', 'gay_lesbisch', 'bisexuell', 'pansexuell_queer'];

    const ORIENTIERUNG_SHORT = {
        heterosexuell: 'Hetero',
        gay_lesbisch: 'Gay',
        bisexuell: 'Bi',
        pansexuell_queer: 'Pan/Q',
        // LEGACY: Alte Keys für Rückwärtskompatibilität
        homosexuell: 'Gay',
        bihomo: 'Gay/Bi',
        pansexuell: 'Pan/Q',
        asexuell: 'Ace'
    };

    const ORIENTIERUNG_LABELS = {
        heterosexuell: 'Heterosexuell',
        gay_lesbisch: 'Gay / Lesbisch',
        bisexuell: 'Bisexuell',
        pansexuell_queer: 'Pansexuell / Queer',
        // LEGACY: Alte Keys für Rückwärtskompatibilität
        homosexuell: 'Gay / Lesbisch',
        bihomo: 'Gay / Bisexuell',
        pansexuell: 'Pansexuell / Queer',
        asexuell: 'Asexuell'
    };

    // R4 Openness - bestimmt Identitäts-Resonanz (ersetzt IDENTITY_OPENNESS)
    // Je höher, desto offener/flexibler
    const ORIENTIERUNG_OPENNESS = {
        heterosexuell: 0,        // Konventionell
        gay_lesbisch: 30,        // Spezifisch
        bisexuell: 70,           // Offen
        pansexuell_queer: 100,   // Maximal offen
        // LEGACY
        homosexuell: 30,
        bihomo: 50,
        pansexuell: 100
    };

    // Migration-Helper: Konvertiert alte Orientierungs-Keys zu neuen
    function migrateOrientierung(oldValue) {
        const migration = {
            'homosexuell': 'gay_lesbisch',
            'bisexuell': 'bisexuell',
            'bihomo': 'bisexuell',  // bihomo → bisexuell (oder gay_lesbisch je nach Kontext)
            'pansexuell': 'pansexuell_queer',
            'asexuell': 'heterosexuell'  // Fallback
        };
        return migration[oldValue] || oldValue;
    }

    // LEGACY: Alte Primary/Secondary Struktur für Rückwärtskompatibilität
    // @deprecated v4.0 - Verwende ORIENTIERUNG_TYPES direkt (Multi-Select Array)
    const ORIENTIERUNG_PRIMARY_TYPES = ORIENTIERUNG_TYPES;
    const ORIENTIERUNG_PRIMARY_SHORT = ORIENTIERUNG_SHORT;
    const ORIENTIERUNG_PRIMARY_LABELS = ORIENTIERUNG_LABELS;

    // LEGACY: Secondary (Romantisch) wird beibehalten für komplexere Modelle
    const ORIENTIERUNG_SECONDARY_TYPES = ['heteroromantisch', 'homoromantisch', 'biromantisch', 'panromantisch', 'aromantisch'];
    const ORIENTIERUNG_SECONDARY_SHORT = {
        heteroromantisch: 'HetRom',
        homoromantisch: 'HomRom',
        biromantisch: 'BiRom',
        panromantisch: 'PanRom',
        aromantisch: 'ARom'
    };
    const ORIENTIERUNG_SECONDARY_LABELS = {
        heteroromantisch: 'Heteroromantisch',
        homoromantisch: 'Homoromantisch',
        biromantisch: 'Biromantisch',
        panromantisch: 'Panromantisch',
        aromantisch: 'Aromantisch'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHT (Vereinfachtes System v4.0: Nur Identität)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // v4.0: Biologischer Zwang entfernt. Nur noch Geschlechtsidentität:
    // - Mann: Identifiziert sich als männlich
    // - Frau: Identifiziert sich als weiblich
    // - Nonbinär: Identifiziert sich weder ausschließlich als Mann noch als Frau
    //
    // Cis/Trans/Inter wurden entfernt - R4 wird jetzt aus Orientierung berechnet.
    // ═══════════════════════════════════════════════════════════════════════

    const GESCHLECHT_TYPES = ['mann', 'frau', 'nonbinaer'];

    const GESCHLECHT_SHORT = {
        'mann': 'M',
        'frau': 'F',
        'nonbinaer': 'NB'
    };

    const GESCHLECHT_LABELS = {
        'mann': 'Mann',
        'frau': 'Frau',
        'nonbinaer': 'Nonbinär'
    };

    // LEGACY: Alte Primary/Secondary Struktur für Rückwärtskompatibilität
    // @deprecated v4.0 - Verwende GESCHLECHT_TYPES direkt
    const GESCHLECHT_PRIMARY_TYPES = GESCHLECHT_TYPES;
    const GESCHLECHT_PRIMARY_SHORT = GESCHLECHT_SHORT;
    const GESCHLECHT_PRIMARY_LABELS = GESCHLECHT_LABELS;

    // LEGACY: Secondary wird nicht mehr verwendet, aber für Migration beibehalten
    // @deprecated v4.0 - Wird ignoriert, R4 kommt aus Orientierung
    const GESCHLECHT_SECONDARY_TYPES = []; // Leer - nicht mehr verwendet
    const GESCHLECHT_SECONDARY_BY_PRIMARY = {
        'mann': [],
        'frau': [],
        'nonbinaer': []
    };
    const GESCHLECHT_SECONDARY_SHORT = {};
    const GESCHLECHT_SECONDARY_LABELS = {};

    // LEGACY: Alte Definitionen wurden in v4.0 nach oben verschoben
    // GESCHLECHT_TYPES, GESCHLECHT_SHORT, GESCHLECHT_LABELS sind jetzt die primären Definitionen

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

    // Mapping für Orientierungslogik: Geschlecht → Kategorie
    // v4.0: Vereinfacht - direkte Zuordnung ohne Cis/Trans
    const GESCHLECHT_CATEGORY = {
        'mann': 'maennlich',
        'frau': 'weiblich',
        'nonbinaer': 'nonbinaer',
        // LEGACY: Alte Werte für Migration
        'cis': 'kongruent',
        'trans': 'gewandelt',
        'fluid': 'fluid',
        'suchend': 'suchend',
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
            title: "Geschlechtsidentität",
            text: "Wie identifizierst du dich? Dies beeinflusst die Kompatibilität zusammen mit der sexuellen Orientierung."
        },
        // v4.0: Vereinfachte Geschlechts-Tooltips
        mann: {
            title: "Mann",
            text: "Du identifizierst dich als männlich."
        },
        frau: {
            title: "Frau",
            text: "Du identifizierst dich als weiblich."
        },
        nonbinaer: {
            title: "Nonbinär",
            text: "Du identifizierst dich weder ausschließlich als Mann noch als Frau."
        },
        // LEGACY: Alte Tooltips für Migration (deprecated)
        geschlecht_primary: {
            title: "Geschlechtsidentität",
            text: "Wie identifizierst du dich?"
        },
        geschlecht_secondary: {
            title: "(nicht mehr verwendet)",
            text: "Diese Option wurde in v4.0 entfernt."
        },
        primary_mann: {
            title: "Mann",
            text: "Du identifizierst dich als männlich."
        },
        primary_frau: {
            title: "Frau",
            text: "Du identifizierst dich als weiblich."
        },
        primary_inter: {
            title: "Nonbinär",
            text: "Du identifizierst dich weder ausschließlich als Mann noch als Frau."
        },
        secondary_cis: {
            title: "(nicht mehr verwendet)",
            text: "Diese Option wurde in v4.0 entfernt."
        },
        secondary_trans: {
            title: "(nicht mehr verwendet)",
            text: "Diese Option wurde in v4.0 entfernt."
        },
        secondary_nonbinaer: {
            title: "(nicht mehr verwendet)",
            text: "Diese Option wurde in v4.0 entfernt."
        },
        secondary_fluid: {
            title: "(nicht mehr verwendet)",
            text: "Diese Option wurde in v4.0 entfernt."
        },
        secondary_suchend: {
            title: "(nicht mehr verwendet)",
            text: "Diese Option wurde in v4.0 entfernt."
        },
        dominanz: {
            title: "Dominanz-Präferenz",
            text: "Zwei Dimensionen: Sexuelle Dominanz (im intimen Bereich) und Soziale Dominanz (im Alltag/Beziehung). Diese können unterschiedlich sein."
        },
        dominanz_primary: {
            title: "Sexuelle Dominanz (Primär)",
            text: "Deine Rolle im intimen Bereich: Führst du (Dominant), lässt du dich führen (Submissiv), wechselst du (Switch) oder bevorzugst du Gleichberechtigung (Ausgeglichen)?"
        },
        dominanz_secondary: {
            title: "Soziale Dominanz (Sekundär)",
            text: "Deine Rolle im Alltag und in der Beziehungsdynamik: Führend, Folgend, Flexibel oder Partnerschaftlich."
        },
        orientierung: {
            title: "Orientierung",
            text: "Zwei Dimensionen: Sexuelle Anziehung (wen begehrst du körperlich?) und Romantische Anziehung (in wen verliebst du dich?). Diese können unterschiedlich sein."
        },
        orientierung_primary: {
            title: "Sexuelle Anziehung (Primär)",
            text: "Zu welchem Geschlecht fühlst du dich körperlich/sexuell hingezogen?"
        },
        orientierung_secondary: {
            title: "Romantische Anziehung (Sekundär)",
            text: "In wen verliebst du dich? Mit wem möchtest du romantische Beziehungen führen?"
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
        bihomo: {
            title: "Bi-/Homosexuell",
            text: "Anziehung zum gleichen Geschlecht (homo) oder zu mehreren binären Geschlechtern (bi)."
        },
        pansexuell: {
            title: "Pansexuell",
            text: "Anziehung zu allen Geschlechtern, unabhängig von Geschlechtsidentität - inkl. non-binär, inter, etc."
        },
        // LEGACY: Alte Keys für Rückwärtskompatibilität
        homosexuell: {
            title: "Bi-/Homosexuell",
            text: "Anziehung zum gleichen Geschlecht (homo) oder zu mehreren binären Geschlechtern (bi)."
        },
        bisexuell: {
            title: "Bi-/Homosexuell",
            text: "Anziehung zum gleichen Geschlecht (homo) oder zu mehreren binären Geschlechtern (bi)."
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

        // Dimensionen - Dominanz (Primär/Sekundär)
        DOMINANZ_PRIMARY_TYPES,
        DOMINANZ_PRIMARY_SHORT,
        DOMINANZ_PRIMARY_LABELS,
        DOMINANZ_SECONDARY_TYPES,
        DOMINANZ_SECONDARY_SHORT,
        DOMINANZ_SECONDARY_LABELS,
        // Legacy Dominanz (für Rückwärtskompatibilität)
        DOMINANZ_TYPES,
        DOMINANZ_SHORT,

        // Dimensionen - Orientierung (v4.0 Multi-Select)
        ORIENTIERUNG_TYPES,
        ORIENTIERUNG_SHORT,
        ORIENTIERUNG_LABELS,
        ORIENTIERUNG_OPENNESS,  // Für R4-Berechnung
        // Legacy (für Rückwärtskompatibilität)
        ORIENTIERUNG_PRIMARY_TYPES,
        ORIENTIERUNG_PRIMARY_SHORT,
        ORIENTIERUNG_PRIMARY_LABELS,
        ORIENTIERUNG_SECONDARY_TYPES,
        ORIENTIERUNG_SECONDARY_SHORT,
        ORIENTIERUNG_SECONDARY_LABELS,

        // Geschlechts-System (Primär/Sekundär)
        GESCHLECHT_PRIMARY_TYPES,
        GESCHLECHT_PRIMARY_SHORT,
        GESCHLECHT_PRIMARY_LABELS,
        GESCHLECHT_SECONDARY_TYPES,
        GESCHLECHT_SECONDARY_BY_PRIMARY,
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

        // Helper: Kontextabhängige Secondary-Optionen für ein Primary
        getSecondaryOptionsForPrimary(primary) {
            return GESCHLECHT_SECONDARY_BY_PRIMARY[primary] || [];
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
        },

        // Helper: Migriert alte Orientierungs-Keys (homosexuell/bisexuell → bihomo)
        migrateOrientierung(oldValue) {
            return migrateOrientierung(oldValue);
        }
    };
})();

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageConfig;
}
