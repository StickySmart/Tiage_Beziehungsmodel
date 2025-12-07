/**
 * TIAGE BEDÜRFNIS-KATALOG
 *
 * Erweiterte Bedürfnisliste für Beziehungsqualitäts-Matching
 *
 * QUELLEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. GFK (Gewaltfreie Kommunikation)
 *    - Marshall B. Rosenberg: "Gewaltfreie Kommunikation" (2001)
 *    - Kategorien: Existenz, Sicherheit, Zuneigung, Verständnis, Freiheit,
 *      Teilnahme, Muße, Identität, Erschaffen, Verbundenheit
 *
 * 2. BDSM/Kink-Dynamik
 *    - Dossie Easton & Janet Hardy: "The New Topping Book" (2003)
 *    - Dossie Easton & Janet Hardy: "The New Bottoming Book" (2001)
 *    - Jay Wiseman: "SM 101: A Realistic Introduction" (1996)
 *    - Kategorie: Dynamik & Austausch (Kontrolle, Hingabe, Nachsorge, etc.)
 *
 * 3. Philosophische Grundlagen
 *    - Robert M. Pirsig: "Zen und die Kunst ein Motorrad zu warten" (1974)
 *      → Static vs. Dynamic Quality
 *    - Osho: Vorträge über Polarität und Yin-Yang-Dynamik
 *      → Komplementäre Energien in Beziehungen
 * ─────────────────────────────────────────────────────────────────────────────
 */

const GfkBeduerfnisse = {

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNIS-KATEGORIEN
    // ═══════════════════════════════════════════════════════════════════════════

    kategorien: {
        existenz: {
            name: "Existenz",
            description: "Grundlegende physische Bedürfnisse",
            color: "#E63946",
            sigma: 11,  // Grundbedürfnis, geringe Varianz (10-12)
            beduerfnisse: [
                "luft",
                "wasser",
                "nahrung",
                "bewegung",
                "beruehrung",
                "erholung",
                "sexueller_ausdruck",
                "sicherheit_physisch",
                "unterschlupf"
            ]
        },

        sicherheit: {
            name: "Sicherheit",
            description: "Emotionale und psychische Sicherheit",
            color: "#F4A261",
            sigma: 11,  // Grundbedürfnis, relativ stabil (10-12)
            beduerfnisse: [
                "bestaendigkeit",
                "sich_sicher_fuehlen",
                "schutz",
                "stabilitaet",
                "leichtigkeit",
                "geborgenheit"
            ]
        },

        zuneigung: {
            name: "Zuneigung",
            description: "Liebe, Nähe und emotionale Verbindung",
            color: "#E84393",
            sigma: 12,  // Variiert nach Bindungsstil (10-14)
            beduerfnisse: [
                "waerme",
                "wertschaetzung",
                "naehe",
                "gesellschaft",
                "intimitaet",
                "liebe",
                "fuersorge",
                "unterstuetzung",
                "fuereinander_da_sein"
            ]
        },

        verstaendnis: {
            name: "Verständnis",
            description: "Gesehen und verstanden werden",
            color: "#9B5DE5",
            sigma: 13,  // Mittlere Varianz (12-14)
            beduerfnisse: [
                "akzeptanz",
                "mitgefuehl",
                "beruecksichtigung",
                "empathie",
                "vertrauen",
                "beachtung",
                "gesehen_werden",
                "verstanden_werden",
                "harmonie"
            ]
        },

        freiheit: {
            name: "Freiheit",
            description: "Autonomie und Selbstbestimmung",
            color: "#2A9D8F",
            sigma: 14,  // Hohe individuelle Variation (12-15)
            beduerfnisse: [
                "selbstbestimmung",
                "waehlen_koennen",
                "unabhaengigkeit",
                "raum_haben",
                "spontaneitaet"
            ]
        },

        teilnahme: {
            name: "Teilnahme",
            description: "Gemeinschaft und Zugehörigkeit",
            color: "#06D6A0",
            sigma: 13,  // Mittlere Varianz (12-14)
            beduerfnisse: [
                "zusammenarbeit",
                "kommunikation",
                "gemeinschaft",
                "zugehoerigkeit",
                "gegenseitigkeit",
                "respekt",
                "bedeutung_haben"
            ]
        },

        musse: {
            name: "Muße",
            description: "Erholung, Freude und Genuss",
            color: "#118AB2",
            sigma: 15,  // Lifestyle-abhängig (14-16)
            beduerfnisse: [
                "schoenheit",
                "freizeit",
                "freude",
                "humor"
            ]
        },

        identitaet: {
            name: "Identität & Bedeutung",
            description: "Selbstverwirklichung und Sinn",
            color: "#FFD166",
            sigma: 14,  // Entwicklungsabhängig (12-15)
            beduerfnisse: [
                "authentizitaet",
                "echtheit",
                "integritaet",
                "praesenz",
                "ordnung",
                "bewusstheit",
                "herausforderung",
                "klarheit",
                "kompetenz",
                "effizienz",
                "wirksamkeit",
                "wachstum",
                "sinn",
                "beitrag_leisten"
            ]
        },

        erschaffen: {
            name: "Etwas erschaffen",
            description: "Kreativität und Lernen",
            color: "#FF6B6B",
            sigma: 16,  // Stark erfahrungsabhängig (14-18)
            beduerfnisse: [
                "kreativitaet",
                "entdecken",
                "lernen",
                "selbst_ausdruck",
                "anreize_bekommen"
            ]
        },

        verbundenheit: {
            name: "Verbunden sein",
            description: "Tiefe existenzielle Verbindung",
            color: "#A8DADC",
            sigma: 16,  // Höchste Varianz, spirituell (14-18)
            beduerfnisse: [
                "leben_feiern",
                "inspiration",
                "trauer_ausdruecken",
                "einsehen",
                "anfang_ende"
            ]
        },

        dynamik: {
            name: "Dynamik & Austausch",
            description: "Machtdynamik, Kontrolle und bewusster Austausch",
            color: "#8B5CF6",
            sigma: 17,  // Stark erfahrungsabhängig (15-18)
            beduerfnisse: [
                "kontrolle_ausueben",
                "hingabe",
                "fuehrung_geben",
                "gefuehrt_werden",
                "ritual",
                "nachsorge",
                "grenzen_setzen",
                "grenzen_respektieren",
                "intensitaet",
                "vertrauen_schenken",
                "verantwortung_uebernehmen",
                "sich_fallenlassen",
                "machtaustausch",
                "dienend_sein",
                "beschuetzen"
            ]
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // ATTRIBUT-SPEZIFISCHE KATEGORIEN (NEU)
        // Konkrete Lebensthemen für Beziehungs-Matching
        // ═══════════════════════════════════════════════════════════════════════════

        lebensplanung: {
            name: "Lebensplanung",
            description: "Kinder, Ehe, Wohnen, Familie",
            color: "#10B981",
            sigma: 14,  // Kulturell/biografisch beeinflusst (12-15)
            beduerfnisse: [
                "kinderwunsch", "elternschaft", "fortpflanzung", "familie_gruenden", "generativitaet",
                "verbindlichkeit", "langfristige_bindung", "rechtliche_sicherheit", "treueversprechen",
                "gemeinsamer_wohnraum", "haeuslichkeit", "nest_bauen", "alltag_teilen",
                "eigener_raum", "rueckzugsort",
                "tierliebe", "fuersorge_tiere", "begleiter", "verantwortung_tier",
                "sesshaftigkeit", "verwurzelung", "mobilitaet", "heimat", "neue_orte",
                "familienbindung", "herkunftsfamilie", "familientreffen", "generationenverbund",
                // Pirsig & Osho - Lebensplanung
                "biologisches_muster", "soziales_muster", "statische_stabilitaet", "qualitaet_der_fuersorge",
                "familien_rebellion", "zorba_das_kind", "nicht_anhaften_an_familie", "bewusste_elternschaft", "commune_statt_kernfamilie"
            ]
        },

        finanzen_karriere: {
            name: "Finanzen & Karriere",
            description: "Geld, Beruf, Work-Life-Balance",
            color: "#F59E0B",
            sigma: 14,  // Biografisch/kulturell beeinflusst (12-15)
            beduerfnisse: [
                "finanzielle_unabhaengigkeit", "gemeinsame_finanzen", "finanzielle_transparenz",
                "finanzielle_sicherheit", "sparsamkeit", "grosszuegigkeit",
                "berufliche_erfuellung", "karriereambition", "work_life_balance",
                "berufliche_anerkennung", "zeit_fuer_beziehung", "berufliche_flexibilitaet",
                // Pirsig & Osho - Finanzen & Karriere
                "gumption", "qualitaet_der_arbeit", "intellektuelles_muster", "dynamische_evolution", "klassisches_verstehen",
                "arbeit_als_meditation", "nicht_karriere", "zorba_der_unternehmer", "nicht_anhaften_an_geld", "kreative_selbstverwirklichung"
            ]
        },

        kommunikation_stil: {
            name: "Kommunikationsstil",
            description: "Gespräche, Emotionen, Konflikte",
            color: "#3B82F6",
            sigma: 13,  // Mittlere Varianz (12-14)
            beduerfnisse: [
                "taeglicher_austausch", "tiefgehende_gespraeche", "small_talk",
                "stille_gemeinsam", "verbale_verbindung", "zuhoeren",
                "emotionale_offenheit", "gefuehle_zeigen", "verletzlichkeit",
                "emotionale_zurueckhaltung", "emotionale_sicherheit", "gefuehle_teilen",
                "konfliktklaerung", "aussprache", "konflikt_vermeiden", "streitkultur", "versoehnlichkeit",
                // Pirsig & Osho - Kommunikation & Stil
                "romantisches_verstehen", "klassische_klarheit", "dialektik", "qualitaets_ausdruck", "care_im_gespraech",
                "schweigen_statt_worte", "radikale_ehrlichkeit", "humorvolle_leichtigkeit", "paradoxe_weisheit", "herz_statt_kopf", "authentischer_ausdruck"
            ]
        },

        soziales_leben: {
            name: "Soziales Leben",
            description: "Introversion/Extroversion, Freunde, Alleinzeit",
            color: "#8B5CF6",
            sigma: 14,  // Persönlichkeitsabhängig (12-15)
            beduerfnisse: [
                "soziale_energie", "geselligkeit", "ruhe_von_menschen",
                "allein_aufladen", "menschen_treffen", "kleine_gruppen",
                "zeit_fuer_sich", "eigene_hobbys", "gemeinsame_zeit",
                "partnerzeit", "eigene_interessen",
                "eigene_freunde", "gemeinsame_freunde", "freundeskreis_teilen",
                "soziales_netz", "freunde_pflegen", "neue_freundschaften",
                // Pirsig & Osho - Soziales Leben
                "soziale_qualitaet", "tribe_muster", "intellektuelle_gemeinschaft", "statische_sozialstrukturen",
                "sannyas_gemeinschaft", "rebellion_gegen_gesellschaft", "einsamkeit_in_menge", "celebration_mit_anderen", "keine_freundschaft_besitz", "tantra_gruppe"
            ]
        },

        intimitaet_beziehung: {
            name: "Intimität & Romantik",
            description: "Körperliche Nähe, Romantik, Sexualität",
            color: "#EC4899",
            sigma: 16,  // Sehr individuelle Ausprägung (14-18)
            beduerfnisse: [
                "koerpernaehe", "kuscheln", "physische_distanz",
                "koerperkontakt", "umarmungen", "hand_halten",
                "romantische_gesten", "ueberraschungen", "dates",
                "alltags_romantik", "aufmerksamkeiten", "liebesbekundungen",
                "sexuelle_haeufigkeit", "sexuelle_intimiaet", "koerperliche_lust",
                "sexuelle_experimentierfreude", "sexuelle_verbindung", "sexuelle_zufriedenheit",
                // Pirsig & Osho - Intimität & Beziehung
                "biologische_anziehung", "intellektuelle_verbindung", "qualitaet_der_beruehrung", "dynamische_liebe", "care_in_intimitaet",
                "sex_als_meditation", "liebe_ohne_beziehung", "orgastisches_leben", "nicht_anhaften_an_partner", "hier_und_jetzt_intimitaet", "polyamore_energie", "wildheit_und_zartheit", "meditation_zu_zweit"
            ]
        },

        werte_haltung: {
            name: "Werte & Haltungen",
            description: "Religion, Tradition, Umwelt",
            color: "#6366F1",
            sigma: 15,  // Weltanschauungsabhängig (14-16)
            beduerfnisse: [
                "spiritualitaet", "glaubenspraxis", "religioese_gemeinschaft",
                "saekularitaet", "sinnsuche", "transzendenz",
                "traditionelle_werte", "moderne_lebensweise", "konservative_werte",
                "progressive_werte", "kulturelle_tradition", "offenheit_fuer_neues",
                "umweltverantwortung", "nachhaltigkeit", "oekologisches_bewusstsein",
                "pragmatismus", "klimaschutz", "ressourcenschonung",
                // Pirsig & Osho - Werte & Haltung
                "qualitaet_als_gott", "rationaler_mystizismus", "aristotelische_vernunft", "platonische_ideen", "buddhistische_achtsamkeit",
                "religionslosigkeit", "eigene_wahrheit", "zen_paradox", "tantra_als_weg", "politische_rebellion", "individueller_anarchismus", "leben_als_kunst", "celebration_statt_gebet"
            ]
        },

        praktisches_leben: {
            name: "Praktisches Leben",
            description: "Ordnung, Reisen, Alltag",
            color: "#14B8A6",
            sigma: 14,  // Lifestyle-abhängig (12-15)
            beduerfnisse: [
                "ordnungssinn", "sauberkeit", "struktur",
                "chaos_toleranz", "organisiert_sein", "flexibilitaet_haushalt",
                "reisen", "abenteuer", "neue_orte_entdecken",
                "zuhause_bleiben", "urlaub", "fernweh", "heimatverbundenheit",
                // Pirsig & Osho - Praktisches Leben
                "motorrad_pflege", "gumption_im_alltag", "stuck_vermeiden", "klassische_ordnung", "romantisches_chaos", "qualitaets_werkzeug", "achtsamkeit_im_detail",
                "meditation_im_alltag", "gesundheit_durch_bewusstsein", "dynamische_meditation", "vipassana_im_leben", "natuerliches_leben", "lachen_therapie", "no_mind", "zorba_der_geniesser"
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNIS-DEFINITIONEN MIT PRIMÄR + SEKUNDÄR KATEGORIEN
    // ═══════════════════════════════════════════════════════════════════════════
    // Primär: Hauptkategorie (für Sortierung/Anzeige)
    // Sekundär: Zusätzliche Kategorien (für Cross-Category-Analyse)
    // Basiert auf: GFK (Rosenberg), Attachment Theory, Self-Determination Theory

    definitionen: {
        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9) - Grundlegende physische Bedürfnisse
        // ═══════════════════════════════════════════════════════════════════════
        luft: { label: "Luft", kategorie: "existenz" },
        wasser: { label: "Wasser", kategorie: "existenz" },
        nahrung: { label: "Nahrung", kategorie: "existenz" },
        bewegung: { label: "Bewegung/Betätigung", kategorie: "existenz", sekundaer: ["identitaet", "musse"] },
        beruehrung: { label: "Berührung/Körperkontakt", kategorie: "existenz", sekundaer: ["zuneigung", "dynamik", "sicherheit"] },
        erholung: { label: "Erholung/Schlaf", kategorie: "existenz", sekundaer: ["sicherheit", "musse"] },
        sexueller_ausdruck: { label: "Sexueller Ausdruck", kategorie: "existenz", sekundaer: ["zuneigung", "dynamik", "identitaet", "verbundenheit"] },
        sicherheit_physisch: { label: "Physische Sicherheit", kategorie: "existenz", sekundaer: ["sicherheit"] },
        unterschlupf: { label: "Unterschlupf", kategorie: "existenz", sekundaer: ["sicherheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6) - Emotionale und psychische Sicherheit
        // ═══════════════════════════════════════════════════════════════════════
        bestaendigkeit: { label: "Beständigkeit", kategorie: "sicherheit", sekundaer: ["verstaendnis", "zuneigung"] },
        sich_sicher_fuehlen: { label: "Sich sicher fühlen", kategorie: "sicherheit", sekundaer: ["zuneigung", "verstaendnis", "dynamik"] },
        schutz: { label: "Schutz", kategorie: "sicherheit", sekundaer: ["zuneigung", "dynamik"] },
        stabilitaet: { label: "Stabilität", kategorie: "sicherheit", sekundaer: ["identitaet", "verstaendnis"] },
        leichtigkeit: { label: "Leichtigkeit", kategorie: "sicherheit", sekundaer: ["musse", "freiheit"] },
        geborgenheit: { label: "Geborgenheit", kategorie: "sicherheit", sekundaer: ["zuneigung", "dynamik"] },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9) - Liebe, Nähe und emotionale Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        waerme: { label: "Wärme", kategorie: "zuneigung", sekundaer: ["sicherheit"] },
        wertschaetzung: { label: "Wertschätzung", kategorie: "zuneigung", sekundaer: ["verstaendnis", "identitaet"] },
        naehe: { label: "Nähe", kategorie: "zuneigung", sekundaer: ["sicherheit", "verbundenheit"] },
        gesellschaft: { label: "Gesellschaft", kategorie: "zuneigung", sekundaer: ["teilnahme"] },
        intimitaet: { label: "Intimität", kategorie: "zuneigung", sekundaer: ["verstaendnis", "dynamik", "verbundenheit"] },
        liebe: { label: "Liebe", kategorie: "zuneigung", sekundaer: ["sicherheit", "verbundenheit", "identitaet"] },
        fuersorge: { label: "Fürsorge", kategorie: "zuneigung", sekundaer: ["dynamik", "sicherheit"] },
        unterstuetzung: { label: "Unterstützung", kategorie: "zuneigung", sekundaer: ["teilnahme", "sicherheit"] },
        fuereinander_da_sein: { label: "Füreinander da sein", kategorie: "zuneigung", sekundaer: ["sicherheit", "verbundenheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9) - Gesehen und verstanden werden
        // ═══════════════════════════════════════════════════════════════════════
        akzeptanz: { label: "Akzeptanz", kategorie: "verstaendnis", sekundaer: ["zuneigung", "identitaet"] },
        mitgefuehl: { label: "Mitgefühl", kategorie: "verstaendnis", sekundaer: ["zuneigung", "verbundenheit"] },
        beruecksichtigung: { label: "Berücksichtigung", kategorie: "verstaendnis", sekundaer: ["teilnahme"] },
        empathie: { label: "Empathie", kategorie: "verstaendnis", sekundaer: ["zuneigung", "verbundenheit"] },
        vertrauen: { label: "Vertrauen", kategorie: "verstaendnis", sekundaer: ["sicherheit", "dynamik", "zuneigung"] },
        beachtung: { label: "Beachtung", kategorie: "verstaendnis", sekundaer: ["identitaet", "zuneigung"] },
        gesehen_werden: { label: "Gesehen werden", kategorie: "verstaendnis", sekundaer: ["identitaet", "zuneigung"] },
        verstanden_werden: { label: "Verstanden werden", kategorie: "verstaendnis", sekundaer: ["zuneigung", "verbundenheit"] },
        harmonie: { label: "Harmonie", kategorie: "verstaendnis", sekundaer: ["sicherheit", "teilnahme"] },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5) - Autonomie und Selbstbestimmung
        // ═══════════════════════════════════════════════════════════════════════
        selbstbestimmung: { label: "Selbstbestimmung", kategorie: "freiheit", sekundaer: ["identitaet", "dynamik"] },
        waehlen_koennen: { label: "Wählen können", kategorie: "freiheit", sekundaer: ["identitaet"] },
        unabhaengigkeit: { label: "Unabhängigkeit", kategorie: "freiheit", sekundaer: ["identitaet", "sicherheit"] },
        raum_haben: { label: "Raum haben", kategorie: "freiheit", sekundaer: ["sicherheit", "identitaet"] },
        spontaneitaet: { label: "Spontaneität", kategorie: "freiheit", sekundaer: ["musse", "erschaffen"] },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7) - Gemeinschaft und Zugehörigkeit
        // ═══════════════════════════════════════════════════════════════════════
        zusammenarbeit: { label: "Zusammenarbeit", kategorie: "teilnahme", sekundaer: ["zuneigung", "identitaet"] },
        kommunikation: { label: "Kommunikation", kategorie: "teilnahme", sekundaer: ["verstaendnis", "zuneigung"] },
        gemeinschaft: { label: "Gemeinschaft", kategorie: "teilnahme", sekundaer: ["zuneigung", "sicherheit"] },
        zugehoerigkeit: { label: "Zugehörigkeit", kategorie: "teilnahme", sekundaer: ["sicherheit", "identitaet"] },
        gegenseitigkeit: { label: "Gegenseitigkeit", kategorie: "teilnahme", sekundaer: ["zuneigung", "dynamik"] },
        respekt: { label: "Respekt", kategorie: "teilnahme", sekundaer: ["verstaendnis", "dynamik", "identitaet"] },
        bedeutung_haben: { label: "Bedeutung haben", kategorie: "teilnahme", sekundaer: ["identitaet", "verbundenheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4) - Erholung, Freude und Genuss
        // ═══════════════════════════════════════════════════════════════════════
        schoenheit: { label: "Schönheit", kategorie: "musse", sekundaer: ["verbundenheit", "erschaffen"] },
        freizeit: { label: "Freizeit", kategorie: "musse", sekundaer: ["freiheit", "erholung"] },
        freude: { label: "Freude", kategorie: "musse", sekundaer: ["verbundenheit", "zuneigung"] },
        humor: { label: "Humor", kategorie: "musse", sekundaer: ["verbundenheit", "zuneigung"] },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14) - Selbstverwirklichung und Sinn
        // ═══════════════════════════════════════════════════════════════════════
        authentizitaet: { label: "Authentizität", kategorie: "identitaet", sekundaer: ["freiheit", "verstaendnis"] },
        echtheit: { label: "Echtheit", kategorie: "identitaet", sekundaer: ["verstaendnis", "verbundenheit"] },
        integritaet: { label: "Integrität", kategorie: "identitaet", sekundaer: ["verstaendnis", "dynamik"] },
        praesenz: { label: "Präsenz", kategorie: "identitaet", sekundaer: ["verbundenheit", "verstaendnis"] },
        ordnung: { label: "Ordnung", kategorie: "identitaet", sekundaer: ["sicherheit"] },
        bewusstheit: { label: "Bewusstheit", kategorie: "identitaet", sekundaer: ["verbundenheit", "verstaendnis"] },
        herausforderung: { label: "Herausforderung", kategorie: "identitaet", sekundaer: ["erschaffen", "freiheit"] },
        klarheit: { label: "Klarheit", kategorie: "identitaet", sekundaer: ["verstaendnis", "sicherheit"] },
        kompetenz: { label: "Kompetenz", kategorie: "identitaet", sekundaer: ["erschaffen", "teilnahme"] },
        effizienz: { label: "Effizienz", kategorie: "identitaet", sekundaer: ["freiheit"] },
        wirksamkeit: { label: "Wirksamkeit", kategorie: "identitaet", sekundaer: ["dynamik", "teilnahme"] },
        wachstum: { label: "Wachstum", kategorie: "identitaet", sekundaer: ["erschaffen", "verbundenheit"] },
        sinn: { label: "Sinn", kategorie: "identitaet", sekundaer: ["verbundenheit"] },
        beitrag_leisten: { label: "Einen Beitrag leisten", kategorie: "identitaet", sekundaer: ["teilnahme", "verbundenheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5) - Kreativität und Lernen
        // ═══════════════════════════════════════════════════════════════════════
        kreativitaet: { label: "Kreativität", kategorie: "erschaffen", sekundaer: ["freiheit", "identitaet"] },
        entdecken: { label: "Entdecken", kategorie: "erschaffen", sekundaer: ["freiheit", "verbundenheit"] },
        lernen: { label: "Lernen", kategorie: "erschaffen", sekundaer: ["identitaet", "verbundenheit"] },
        selbst_ausdruck: { label: "Selbst-Ausdruck", kategorie: "erschaffen", sekundaer: ["identitaet", "freiheit"] },
        anreize_bekommen: { label: "Anreize bekommen", kategorie: "erschaffen", sekundaer: ["verbundenheit", "teilnahme"] },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5) - Tiefe existenzielle Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        leben_feiern: { label: "Das Leben feiern", kategorie: "verbundenheit", sekundaer: ["musse", "zuneigung"] },
        inspiration: { label: "Inspiration", kategorie: "verbundenheit", sekundaer: ["erschaffen", "identitaet"] },
        trauer_ausdruecken: { label: "Trauer ausdrücken", kategorie: "verbundenheit", sekundaer: ["verstaendnis", "zuneigung"] },
        einsehen: { label: "Einsehen", kategorie: "verbundenheit", sekundaer: ["verstaendnis", "identitaet"] },
        anfang_ende: { label: "Anfang & Ende", kategorie: "verbundenheit", sekundaer: ["identitaet", "sicherheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15) - Machtdynamik und bewusster Austausch
        // ═══════════════════════════════════════════════════════════════════════
        kontrolle_ausueben: { label: "Kontrolle ausüben", kategorie: "dynamik", sekundaer: ["freiheit", "identitaet", "sicherheit"] },
        hingabe: { label: "Hingabe", kategorie: "dynamik", sekundaer: ["zuneigung", "verstaendnis", "sicherheit"] },
        fuehrung_geben: { label: "Führung geben", kategorie: "dynamik", sekundaer: ["identitaet", "teilnahme", "zuneigung"] },
        gefuehrt_werden: { label: "Geführt werden", kategorie: "dynamik", sekundaer: ["sicherheit", "zuneigung", "verstaendnis"] },
        ritual: { label: "Rituale & Struktur", kategorie: "dynamik", sekundaer: ["sicherheit", "verbundenheit", "identitaet"] },
        nachsorge: { label: "Nachsorge/Aftercare", kategorie: "dynamik", sekundaer: ["zuneigung", "sicherheit", "verstaendnis"] },
        grenzen_setzen: { label: "Grenzen setzen", kategorie: "dynamik", sekundaer: ["freiheit", "sicherheit", "identitaet"] },
        grenzen_respektieren: { label: "Grenzen respektieren", kategorie: "dynamik", sekundaer: ["verstaendnis", "teilnahme"] },
        intensitaet: { label: "Intensität erleben", kategorie: "dynamik", sekundaer: ["verbundenheit", "existenz"] },
        vertrauen_schenken: { label: "Vertrauen schenken", kategorie: "dynamik", sekundaer: ["verstaendnis", "zuneigung", "sicherheit"] },
        verantwortung_uebernehmen: { label: "Verantwortung übernehmen", kategorie: "dynamik", sekundaer: ["identitaet", "zuneigung"] },
        sich_fallenlassen: { label: "Sich fallenlassen", kategorie: "dynamik", sekundaer: ["verstaendnis", "sicherheit", "zuneigung"] },
        machtaustausch: { label: "Machtaustausch", kategorie: "dynamik", sekundaer: ["verbundenheit", "intimitaet"] },
        dienend_sein: { label: "Dienend sein", kategorie: "dynamik", sekundaer: ["zuneigung", "identitaet"] },
        beschuetzen: { label: "Beschützen", kategorie: "dynamik", sekundaer: ["zuneigung", "sicherheit", "identitaet"] },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        kinderwunsch: { label: "Kinderwunsch", kategorie: "lebensplanung" },
        elternschaft: { label: "Elternschaft", kategorie: "lebensplanung" },
        fortpflanzung: { label: "Fortpflanzung", kategorie: "lebensplanung" },
        familie_gruenden: { label: "Familie gründen", kategorie: "lebensplanung" },
        generativitaet: { label: "Generativität", kategorie: "lebensplanung" },
        verbindlichkeit: { label: "Verbindlichkeit", kategorie: "lebensplanung", sekundaer: ["sicherheit"] },
        langfristige_bindung: { label: "Langfristige Bindung", kategorie: "lebensplanung", sekundaer: ["sicherheit", "zuneigung"] },
        rechtliche_sicherheit: { label: "Rechtliche Sicherheit", kategorie: "lebensplanung", sekundaer: ["sicherheit"] },
        treueversprechen: { label: "Treueversprechen", kategorie: "lebensplanung", sekundaer: ["verstaendnis"] },
        gemeinsamer_wohnraum: { label: "Gemeinsamer Wohnraum", kategorie: "lebensplanung" },
        haeuslichkeit: { label: "Häuslichkeit", kategorie: "lebensplanung", sekundaer: ["sicherheit"] },
        nest_bauen: { label: "Nest bauen", kategorie: "lebensplanung", sekundaer: ["zuneigung"] },
        alltag_teilen: { label: "Alltag teilen", kategorie: "lebensplanung", sekundaer: ["zuneigung", "teilnahme"] },
        eigener_raum: { label: "Eigener Raum", kategorie: "lebensplanung", sekundaer: ["freiheit"] },
        rueckzugsort: { label: "Rückzugsort", kategorie: "lebensplanung", sekundaer: ["freiheit", "sicherheit"] },
        tierliebe: { label: "Tierliebe", kategorie: "lebensplanung" },
        fuersorge_tiere: { label: "Fürsorge für Tiere", kategorie: "lebensplanung", sekundaer: ["zuneigung"] },
        begleiter: { label: "Tierischer Begleiter", kategorie: "lebensplanung" },
        verantwortung_tier: { label: "Verantwortung für Tier", kategorie: "lebensplanung" },
        sesshaftigkeit: { label: "Sesshaftigkeit", kategorie: "lebensplanung", sekundaer: ["sicherheit"] },
        verwurzelung: { label: "Verwurzelung", kategorie: "lebensplanung", sekundaer: ["sicherheit", "teilnahme"] },
        mobilitaet: { label: "Mobilität", kategorie: "lebensplanung", sekundaer: ["freiheit"] },
        heimat: { label: "Heimat", kategorie: "lebensplanung", sekundaer: ["sicherheit", "teilnahme"] },
        neue_orte: { label: "Neue Orte", kategorie: "lebensplanung", sekundaer: ["freiheit", "erschaffen"] },
        familienbindung: { label: "Familienbindung", kategorie: "lebensplanung", sekundaer: ["teilnahme"] },
        herkunftsfamilie: { label: "Herkunftsfamilie", kategorie: "lebensplanung", sekundaer: ["teilnahme"] },
        familientreffen: { label: "Familientreffen", kategorie: "lebensplanung", sekundaer: ["teilnahme"] },
        generationenverbund: { label: "Generationenverbund", kategorie: "lebensplanung", sekundaer: ["teilnahme", "verbundenheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE
        // ═══════════════════════════════════════════════════════════════════════
        finanzielle_unabhaengigkeit: { label: "Finanzielle Unabhängigkeit", kategorie: "finanzen_karriere", sekundaer: ["freiheit"] },
        gemeinsame_finanzen: { label: "Gemeinsame Finanzen", kategorie: "finanzen_karriere", sekundaer: ["teilnahme"] },
        finanzielle_transparenz: { label: "Finanzielle Transparenz", kategorie: "finanzen_karriere", sekundaer: ["verstaendnis"] },
        finanzielle_sicherheit: { label: "Finanzielle Sicherheit", kategorie: "finanzen_karriere", sekundaer: ["sicherheit"] },
        sparsamkeit: { label: "Sparsamkeit", kategorie: "finanzen_karriere" },
        grosszuegigkeit: { label: "Großzügigkeit", kategorie: "finanzen_karriere", sekundaer: ["zuneigung"] },
        berufliche_erfuellung: { label: "Berufliche Erfüllung", kategorie: "finanzen_karriere", sekundaer: ["identitaet"] },
        karriereambition: { label: "Karriereambition", kategorie: "finanzen_karriere", sekundaer: ["identitaet"] },
        work_life_balance: { label: "Work-Life-Balance", kategorie: "finanzen_karriere", sekundaer: ["musse", "zuneigung"] },
        berufliche_anerkennung: { label: "Berufliche Anerkennung", kategorie: "finanzen_karriere", sekundaer: ["identitaet", "verstaendnis"] },
        zeit_fuer_beziehung: { label: "Zeit für Beziehung", kategorie: "finanzen_karriere", sekundaer: ["zuneigung"] },
        berufliche_flexibilitaet: { label: "Berufliche Flexibilität", kategorie: "finanzen_karriere", sekundaer: ["freiheit"] },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL
        // ═══════════════════════════════════════════════════════════════════════
        taeglicher_austausch: { label: "Täglicher Austausch", kategorie: "kommunikation_stil", sekundaer: ["teilnahme"] },
        tiefgehende_gespraeche: { label: "Tiefgehende Gespräche", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "verbundenheit"] },
        small_talk: { label: "Small Talk", kategorie: "kommunikation_stil", sekundaer: ["teilnahme"] },
        stille_gemeinsam: { label: "Stille gemeinsam", kategorie: "kommunikation_stil", sekundaer: ["zuneigung", "sicherheit"] },
        verbale_verbindung: { label: "Verbale Verbindung", kategorie: "kommunikation_stil", sekundaer: ["teilnahme", "verstaendnis"] },
        zuhoeren: { label: "Zuhören", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "zuneigung"] },
        emotionale_offenheit: { label: "Emotionale Offenheit", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "zuneigung"] },
        gefuehle_zeigen: { label: "Gefühle zeigen", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis"] },
        verletzlichkeit: { label: "Verletzlichkeit zulassen", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "zuneigung"] },
        emotionale_zurueckhaltung: { label: "Emotionale Zurückhaltung", kategorie: "kommunikation_stil" },
        emotionale_sicherheit: { label: "Emotionale Sicherheit", kategorie: "kommunikation_stil", sekundaer: ["sicherheit"] },
        gefuehle_teilen: { label: "Gefühle teilen", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "zuneigung"] },
        konfliktklaerung: { label: "Konfliktklärung", kategorie: "kommunikation_stil", sekundaer: ["teilnahme"] },
        aussprache: { label: "Aussprache", kategorie: "kommunikation_stil", sekundaer: ["teilnahme", "verstaendnis"] },
        konflikt_vermeiden: { label: "Konflikt vermeiden", kategorie: "kommunikation_stil", sekundaer: ["sicherheit"] },
        streitkultur: { label: "Streitkultur", kategorie: "kommunikation_stil", sekundaer: ["teilnahme"] },
        versoehnlichkeit: { label: "Versöhnlichkeit", kategorie: "kommunikation_stil", sekundaer: ["zuneigung", "verstaendnis"] },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN
        // ═══════════════════════════════════════════════════════════════════════
        soziale_energie: { label: "Soziale Energie", kategorie: "soziales_leben" },
        geselligkeit: { label: "Geselligkeit", kategorie: "soziales_leben", sekundaer: ["teilnahme"] },
        ruhe_von_menschen: { label: "Ruhe von Menschen", kategorie: "soziales_leben", sekundaer: ["freiheit"] },
        allein_aufladen: { label: "Allein aufladen", kategorie: "soziales_leben", sekundaer: ["freiheit"] },
        menschen_treffen: { label: "Menschen treffen", kategorie: "soziales_leben", sekundaer: ["teilnahme"] },
        kleine_gruppen: { label: "Kleine Gruppen", kategorie: "soziales_leben", sekundaer: ["teilnahme"] },
        zeit_fuer_sich: { label: "Zeit für sich", kategorie: "soziales_leben", sekundaer: ["freiheit"] },
        eigene_hobbys: { label: "Eigene Hobbys", kategorie: "soziales_leben", sekundaer: ["freiheit", "identitaet"] },
        gemeinsame_zeit: { label: "Gemeinsame Zeit", kategorie: "soziales_leben", sekundaer: ["zuneigung"] },
        partnerzeit: { label: "Partnerzeit", kategorie: "soziales_leben", sekundaer: ["zuneigung"] },
        eigene_interessen: { label: "Eigene Interessen", kategorie: "soziales_leben", sekundaer: ["freiheit", "identitaet"] },
        eigene_freunde: { label: "Eigene Freunde", kategorie: "soziales_leben", sekundaer: ["freiheit", "teilnahme"] },
        gemeinsame_freunde: { label: "Gemeinsame Freunde", kategorie: "soziales_leben", sekundaer: ["teilnahme"] },
        freundeskreis_teilen: { label: "Freundeskreis teilen", kategorie: "soziales_leben", sekundaer: ["teilnahme"] },
        soziales_netz: { label: "Soziales Netz", kategorie: "soziales_leben", sekundaer: ["sicherheit", "teilnahme"] },
        freunde_pflegen: { label: "Freunde pflegen", kategorie: "soziales_leben", sekundaer: ["teilnahme"] },
        neue_freundschaften: { label: "Neue Freundschaften", kategorie: "soziales_leben", sekundaer: ["erschaffen", "teilnahme"] },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK
        // ═══════════════════════════════════════════════════════════════════════
        koerpernaehe: { label: "Körpernähe", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "existenz"] },
        kuscheln: { label: "Kuscheln", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "sicherheit"] },
        physische_distanz: { label: "Physische Distanz", kategorie: "intimitaet_beziehung", sekundaer: ["freiheit"] },
        koerperkontakt: { label: "Körperkontakt", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "existenz"] },
        umarmungen: { label: "Umarmungen", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "sicherheit"] },
        hand_halten: { label: "Hand halten", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung"] },
        romantische_gesten: { label: "Romantische Gesten", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung"] },
        ueberraschungen: { label: "Überraschungen", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "musse"] },
        dates: { label: "Dates", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung"] },
        alltags_romantik: { label: "Alltags-Romantik", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung"] },
        aufmerksamkeiten: { label: "Aufmerksamkeiten", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "verstaendnis"] },
        liebesbekundungen: { label: "Liebesbekundungen", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung"] },
        sexuelle_haeufigkeit: { label: "Sexuelle Häufigkeit", kategorie: "intimitaet_beziehung", sekundaer: ["existenz"] },
        sexuelle_intimiaet: { label: "Sexuelle Intimität", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "verbundenheit"] },
        koerperliche_lust: { label: "Körperliche Lust", kategorie: "intimitaet_beziehung", sekundaer: ["existenz", "musse"] },
        sexuelle_experimentierfreude: { label: "Sexuelle Experimentierfreude", kategorie: "intimitaet_beziehung", sekundaer: ["erschaffen", "freiheit"] },
        sexuelle_verbindung: { label: "Sexuelle Verbindung", kategorie: "intimitaet_beziehung", sekundaer: ["verbundenheit", "zuneigung"] },
        sexuelle_zufriedenheit: { label: "Sexuelle Zufriedenheit", kategorie: "intimitaet_beziehung", sekundaer: ["musse"] },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN
        // ═══════════════════════════════════════════════════════════════════════
        spiritualitaet: { label: "Spiritualität", kategorie: "werte_haltung", sekundaer: ["verbundenheit"] },
        glaubenspraxis: { label: "Glaubenspraxis", kategorie: "werte_haltung", sekundaer: ["teilnahme"] },
        religioese_gemeinschaft: { label: "Religiöse Gemeinschaft", kategorie: "werte_haltung", sekundaer: ["teilnahme"] },
        saekularitaet: { label: "Säkularität", kategorie: "werte_haltung", sekundaer: ["freiheit"] },
        sinnsuche: { label: "Sinnsuche", kategorie: "werte_haltung", sekundaer: ["identitaet", "verbundenheit"] },
        transzendenz: { label: "Transzendenz", kategorie: "werte_haltung", sekundaer: ["verbundenheit"] },
        traditionelle_werte: { label: "Traditionelle Werte", kategorie: "werte_haltung", sekundaer: ["sicherheit"] },
        moderne_lebensweise: { label: "Moderne Lebensweise", kategorie: "werte_haltung", sekundaer: ["freiheit"] },
        konservative_werte: { label: "Konservative Werte", kategorie: "werte_haltung", sekundaer: ["sicherheit"] },
        progressive_werte: { label: "Progressive Werte", kategorie: "werte_haltung", sekundaer: ["freiheit", "erschaffen"] },
        kulturelle_tradition: { label: "Kulturelle Tradition", kategorie: "werte_haltung", sekundaer: ["teilnahme"] },
        offenheit_fuer_neues: { label: "Offenheit für Neues", kategorie: "werte_haltung", sekundaer: ["freiheit", "erschaffen"] },
        umweltverantwortung: { label: "Umweltverantwortung", kategorie: "werte_haltung", sekundaer: ["identitaet"] },
        nachhaltigkeit: { label: "Nachhaltigkeit", kategorie: "werte_haltung", sekundaer: ["identitaet"] },
        oekologisches_bewusstsein: { label: "Ökologisches Bewusstsein", kategorie: "werte_haltung", sekundaer: ["identitaet"] },
        pragmatismus: { label: "Pragmatismus", kategorie: "werte_haltung" },
        klimaschutz: { label: "Klimaschutz", kategorie: "werte_haltung", sekundaer: ["identitaet"] },
        ressourcenschonung: { label: "Ressourcenschonung", kategorie: "werte_haltung", sekundaer: ["identitaet"] },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN
        // ═══════════════════════════════════════════════════════════════════════
        ordnungssinn: { label: "Ordnungssinn", kategorie: "praktisches_leben", sekundaer: ["identitaet"] },
        sauberkeit: { label: "Sauberkeit", kategorie: "praktisches_leben" },
        struktur: { label: "Struktur", kategorie: "praktisches_leben", sekundaer: ["sicherheit"] },
        chaos_toleranz: { label: "Chaos-Toleranz", kategorie: "praktisches_leben", sekundaer: ["freiheit"] },
        organisiert_sein: { label: "Organisiert sein", kategorie: "praktisches_leben", sekundaer: ["identitaet"] },
        flexibilitaet_haushalt: { label: "Flexibilität im Haushalt", kategorie: "praktisches_leben", sekundaer: ["freiheit"] },
        reisen: { label: "Reisen", kategorie: "praktisches_leben", sekundaer: ["erschaffen", "musse"] },
        abenteuer: { label: "Abenteuer", kategorie: "praktisches_leben", sekundaer: ["erschaffen", "freiheit"] },
        neue_orte_entdecken: { label: "Neue Orte entdecken", kategorie: "praktisches_leben", sekundaer: ["erschaffen"] },
        zuhause_bleiben: { label: "Zuhause bleiben", kategorie: "praktisches_leben", sekundaer: ["sicherheit"] },
        urlaub: { label: "Urlaub", kategorie: "praktisches_leben", sekundaer: ["musse"] },
        fernweh: { label: "Fernweh", kategorie: "praktisches_leben", sekundaer: ["freiheit", "erschaffen"] },
        heimatverbundenheit: { label: "Heimatverbundenheit", kategorie: "praktisches_leben", sekundaer: ["sicherheit", "teilnahme"] },

        // ═══════════════════════════════════════════════════════════════════════
        // PIRSIG & OSHO BEDÜRFNISSE - Philosophische Erweiterungen
        // ═══════════════════════════════════════════════════════════════════════
        // Basiert auf:
        // - Robert M. Pirsig: "Zen und die Kunst ein Motorrad zu warten" (1974)
        // - Osho: Tantra, Meditation & Non-Attachment
        // ═══════════════════════════════════════════════════════════════════════

        // ─────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        biologisches_muster: { label: "Biologisches Muster", kategorie: "lebensplanung", sekundaer: ["existenz"], description: "Bedürfnis nach biologischer Kontinuität, Fortpflanzung, Stamm" },
        soziales_muster: { label: "Soziales Muster", kategorie: "lebensplanung", sekundaer: ["teilnahme"], description: "Bedürfnis nach sozialen Strukturen, Institutionen, Tradition" },
        statische_stabilitaet: { label: "Statische Stabilität", kategorie: "lebensplanung", sekundaer: ["sicherheit"], description: "Bedürfnis nach festen Mustern, Vorhersehbarkeit, Struktur" },
        qualitaet_der_fuersorge: { label: "Qualität der Fürsorge", kategorie: "lebensplanung", sekundaer: ["zuneigung"], description: "Bedürfnis nach sorgfältiger Planung, Care, Verantwortung" },

        // ─────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG - Osho
        // ─────────────────────────────────────────────────────────────────────
        familien_rebellion: { label: "Familien-Rebellion", kategorie: "lebensplanung", sekundaer: ["freiheit"], description: "Bedürfnis gegen traditionelle Familienstrukturen zu rebellieren" },
        zorba_das_kind: { label: "Zorba das Kind", kategorie: "lebensplanung", sekundaer: ["musse", "zuneigung"], description: "Bedürfnis nach weltlicher Freude am Familienleben (Zorba-Aspekt)" },
        nicht_anhaften_an_familie: { label: "Nicht-Anhaften an Familie", kategorie: "lebensplanung", sekundaer: ["freiheit"], description: "Bedürfnis nach Nicht-Anhaftung trotz Familienbindung" },
        bewusste_elternschaft: { label: "Bewusste Elternschaft", kategorie: "lebensplanung", sekundaer: ["identitaet"], description: "Bedürfnis nach bewusster, nicht-konditionierter Erziehung" },
        commune_statt_kernfamilie: { label: "Kommune statt Kernfamilie", kategorie: "lebensplanung", sekundaer: ["teilnahme"], description: "Bedürfnis nach Gemeinschaftsleben statt Kleinfamilie" },

        // ─────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        gumption: { label: "Gumption", kategorie: "finanzen_karriere", sekundaer: ["identitaet", "erschaffen"], description: "Bedürfnis nach innerer Motivation, Enthusiasmus, Flow in der Arbeit" },
        qualitaet_der_arbeit: { label: "Qualität der Arbeit", kategorie: "finanzen_karriere", sekundaer: ["identitaet"], description: "Bedürfnis nach handwerklicher Exzellenz, Perfektion, Meisterschaft" },
        intellektuelles_muster: { label: "Intellektuelles Muster", kategorie: "finanzen_karriere", sekundaer: ["identitaet", "erschaffen"], description: "Bedürfnis nach konzeptueller Arbeit, Verstehen, Systematik" },
        dynamische_evolution: { label: "Dynamische Evolution", kategorie: "finanzen_karriere", sekundaer: ["erschaffen", "freiheit"], description: "Bedürfnis nach beruflicher Evolution, Wachstum, Innovation" },
        klassisches_verstehen: { label: "Klassisches Verstehen", kategorie: "finanzen_karriere", sekundaer: ["identitaet"], description: "Bedürfnis nach analytischem, strukturiertem Arbeiten" },

        // ─────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE - Osho
        // ─────────────────────────────────────────────────────────────────────
        arbeit_als_meditation: { label: "Arbeit als Meditation", kategorie: "finanzen_karriere", sekundaer: ["verbundenheit", "identitaet"], description: "Bedürfnis nach Arbeit als spirituelle Praxis, Präsenz" },
        nicht_karriere: { label: "Nicht-Karriere", kategorie: "finanzen_karriere", sekundaer: ["freiheit"], description: "Bedürfnis nach Ablehnung von Karriere-Ambition, Statusdenken" },
        zorba_der_unternehmer: { label: "Zorba der Unternehmer", kategorie: "finanzen_karriere", sekundaer: ["musse", "identitaet"], description: "Bedürfnis nach weltlichem Erfolg UND Spiritualität" },
        nicht_anhaften_an_geld: { label: "Nicht-Anhaften an Geld", kategorie: "finanzen_karriere", sekundaer: ["freiheit"], description: "Bedürfnis nach finanzieller Freiheit durch Nicht-Anhaften" },
        kreative_selbstverwirklichung: { label: "Kreative Selbstverwirklichung", kategorie: "finanzen_karriere", sekundaer: ["erschaffen", "identitaet"], description: "Bedürfnis nach Arbeit als kreativem Ausdruck, nicht Gelderwerb" },

        // ─────────────────────────────────────────────────────────────────────
        // KOMMUNIKATION & STIL - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        romantisches_verstehen: { label: "Romantisches Verstehen", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "verbundenheit"], description: "Bedürfnis nach intuitivem, ganzheitlichem Kommunizieren" },
        klassische_klarheit: { label: "Klassische Klarheit", kategorie: "kommunikation_stil", sekundaer: ["identitaet"], description: "Bedürfnis nach präziser, analytischer Kommunikation" },
        dialektik: { label: "Dialektik", kategorie: "kommunikation_stil", sekundaer: ["verstaendnis", "erschaffen"], description: "Bedürfnis nach philosophischem Dialog, Sokrates-Methode" },
        qualitaets_ausdruck: { label: "Qualitäts-Ausdruck", kategorie: "kommunikation_stil", sekundaer: ["identitaet", "erschaffen"], description: "Bedürfnis nach qualitativ hochwertigem Ausdruck, Eloquenz" },
        care_im_gespraech: { label: "Care im Gespräch", kategorie: "kommunikation_stil", sekundaer: ["zuneigung", "verstaendnis"], description: "Bedürfnis nach sorgfältiger, achtsamer Kommunikation" },

        // ─────────────────────────────────────────────────────────────────────
        // KOMMUNIKATION & STIL - Osho
        // ─────────────────────────────────────────────────────────────────────
        schweigen_statt_worte: { label: "Schweigen statt Worte", kategorie: "kommunikation_stil", sekundaer: ["verbundenheit", "musse"], description: "Bedürfnis nach Stille, non-verbaler Kommunikation" },
        radikale_ehrlichkeit: { label: "Radikale Ehrlichkeit", kategorie: "kommunikation_stil", sekundaer: ["identitaet", "freiheit"], description: "Bedürfnis nach kompromissloser Wahrheit, keine Höflichkeit" },
        humorvolle_leichtigkeit: { label: "Humorvolle Leichtigkeit", kategorie: "kommunikation_stil", sekundaer: ["musse", "verbundenheit"], description: "Bedürfnis nach Lachen, Witz, spielerischer Kommunikation" },
        paradoxe_weisheit: { label: "Paradoxe Weisheit", kategorie: "kommunikation_stil", sekundaer: ["erschaffen", "verbundenheit"], description: "Bedürfnis nach Zen-Koans, Widersprüchen, Rätsel statt Logik" },
        herz_statt_kopf: { label: "Herz statt Kopf", kategorie: "kommunikation_stil", sekundaer: ["zuneigung", "verbundenheit"], description: "Bedürfnis nach emotionaler statt rationaler Kommunikation" },
        authentischer_ausdruck: { label: "Authentischer Ausdruck", kategorie: "kommunikation_stil", sekundaer: ["identitaet", "freiheit"], description: "Bedürfnis nach ungefilterten Gefühlen, keine soziale Maske" },

        // ─────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        soziale_qualitaet: { label: "Soziale Qualität", kategorie: "soziales_leben", sekundaer: ["teilnahme", "verstaendnis"], description: "Bedürfnis nach hochwertigen sozialen Beziehungen" },
        tribe_muster: { label: "Tribe-Muster", kategorie: "soziales_leben", sekundaer: ["teilnahme", "sicherheit"], description: "Bedürfnis nach Stammes-Zugehörigkeit, Gruppe, Identität" },
        intellektuelle_gemeinschaft: { label: "Intellektuelle Gemeinschaft", kategorie: "soziales_leben", sekundaer: ["erschaffen", "verstaendnis"], description: "Bedürfnis nach Gleichgesinnten, philosophischem Austausch" },
        statische_sozialstrukturen: { label: "Statische Sozialstrukturen", kategorie: "soziales_leben", sekundaer: ["sicherheit"], description: "Bedürfnis nach festen sozialen Rollen, Hierarchien" },

        // ─────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN - Osho
        // ─────────────────────────────────────────────────────────────────────
        sannyas_gemeinschaft: { label: "Sannyas-Gemeinschaft", kategorie: "soziales_leben", sekundaer: ["teilnahme", "verbundenheit"], description: "Bedürfnis nach spiritueller Commune, Ashram-Leben" },
        rebellion_gegen_gesellschaft: { label: "Rebellion gegen Gesellschaft", kategorie: "soziales_leben", sekundaer: ["freiheit", "identitaet"], description: "Bedürfnis nach Ablehnung gesellschaftlicher Normen" },
        einsamkeit_in_menge: { label: "Einsamkeit in Menge", kategorie: "soziales_leben", sekundaer: ["freiheit", "identitaet"], description: "Bedürfnis allein zu sein AUCH in Gemeinschaft" },
        celebration_mit_anderen: { label: "Celebration mit Anderen", kategorie: "soziales_leben", sekundaer: ["musse", "verbundenheit"], description: "Bedürfnis nach gemeinsamer Freude, Festen, Tanz" },
        keine_freundschaft_besitz: { label: "Keine Freundschafts-Besitz", kategorie: "soziales_leben", sekundaer: ["freiheit"], description: "Bedürfnis nach Nicht-Anhaften an Freunde, Fluidity" },
        tantra_gruppe: { label: "Tantra-Gruppe", kategorie: "soziales_leben", sekundaer: ["verbundenheit", "zuneigung"], description: "Bedürfnis nach Gruppen-Intimität, energetischem Austausch" },

        // ─────────────────────────────────────────────────────────────────────
        // INTIMITÄT & BEZIEHUNG - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        biologische_anziehung: { label: "Biologische Anziehung", kategorie: "intimitaet_beziehung", sekundaer: ["existenz"], description: "Bedürfnis nach körperlicher Chemie, Instinkt, Pheromonen" },
        intellektuelle_verbindung: { label: "Intellektuelle Verbindung", kategorie: "intimitaet_beziehung", sekundaer: ["verstaendnis", "erschaffen"], description: "Bedürfnis nach geistigem Match, gemeinsamer Wellenlänge" },
        qualitaet_der_beruehrung: { label: "Qualität der Berührung", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung"], description: "Bedürfnis nach achtsamer, präsenter Berührung" },
        dynamische_liebe: { label: "Dynamische Liebe", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "erschaffen"], description: "Bedürfnis nach sich entwickelnder, wachsender Liebe" },
        care_in_intimitaet: { label: "Care in Intimität", kategorie: "intimitaet_beziehung", sekundaer: ["zuneigung", "sicherheit"], description: "Bedürfnis nach Sorgfalt, Aufmerksamkeit, Präzision" },

        // ─────────────────────────────────────────────────────────────────────
        // INTIMITÄT & BEZIEHUNG - Osho
        // ─────────────────────────────────────────────────────────────────────
        sex_als_meditation: { label: "Sex als Meditation", kategorie: "intimitaet_beziehung", sekundaer: ["verbundenheit"], description: "Bedürfnis nach tantrischer Sexualität, spiritueller Vereinigung" },
        liebe_ohne_beziehung: { label: "Liebe ohne Beziehung", kategorie: "intimitaet_beziehung", sekundaer: ["freiheit", "zuneigung"], description: "Bedürfnis nach Liebe OHNE Besitz, Eifersucht, Erwartung" },
        orgastisches_leben: { label: "Orgastisches Leben", kategorie: "intimitaet_beziehung", sekundaer: ["existenz", "verbundenheit"], description: "Bedürfnis nach ganzem Körper als erogene Zone, totale Hingabe" },
        nicht_anhaften_an_partner: { label: "Nicht-Anhaften an Partner", kategorie: "intimitaet_beziehung", sekundaer: ["freiheit"], description: "Bedürfnis nach Freiheit IN der Beziehung" },
        hier_und_jetzt_intimitaet: { label: "Hier-und-Jetzt-Intimität", kategorie: "intimitaet_beziehung", sekundaer: ["verbundenheit"], description: "Bedürfnis nach völliger Präsenz, keine Vergangenheit/Zukunft" },
        polyamore_energie: { label: "Polyamore Energie", kategorie: "intimitaet_beziehung", sekundaer: ["freiheit", "zuneigung"], description: "Bedürfnis nach Liebe zu vielen, keine Monogamie" },
        wildheit_und_zartheit: { label: "Wildheit und Zartheit", kategorie: "intimitaet_beziehung", sekundaer: ["dynamik"], description: "Bedürfnis nach beidem: animalisch UND sanft" },
        meditation_zu_zweit: { label: "Meditation zu zweit", kategorie: "intimitaet_beziehung", sekundaer: ["verbundenheit"], description: "Bedürfnis nach gemeinsamer Stille, energetischer Fusion" },

        // ─────────────────────────────────────────────────────────────────────
        // WERTE & HALTUNG - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        qualitaet_als_gott: { label: "Qualität als Gott", kategorie: "werte_haltung", sekundaer: ["identitaet", "verbundenheit"], description: "Bedürfnis nach Qualität als höchstem Wert, Metaphysik" },
        rationaler_mystizismus: { label: "Rationaler Mystizismus", kategorie: "werte_haltung", sekundaer: ["identitaet", "verbundenheit"], description: "Bedürfnis nach Verbindung von Logik UND Spiritualität" },
        aristotelische_vernunft: { label: "Aristotelische Vernunft", kategorie: "werte_haltung", sekundaer: ["identitaet"], description: "Bedürfnis nach logischem Denken, Kausalität, Objektivität" },
        platonische_ideen: { label: "Platonische Ideen", kategorie: "werte_haltung", sekundaer: ["verbundenheit"], description: "Bedürfnis nach absoluten Werten, ewigen Wahrheiten" },
        buddhistische_achtsamkeit: { label: "Buddhistische Achtsamkeit", kategorie: "werte_haltung", sekundaer: ["verbundenheit", "identitaet"], description: "Bedürfnis nach Präsenz, Nicht-Dualität (Pirsig's Zen)" },

        // ─────────────────────────────────────────────────────────────────────
        // WERTE & HALTUNG - Osho
        // ─────────────────────────────────────────────────────────────────────
        religionslosigkeit: { label: "Religionslosigkeit", kategorie: "werte_haltung", sekundaer: ["freiheit"], description: "Bedürfnis nach Ablehnung aller organisierten Religionen" },
        eigene_wahrheit: { label: "Eigene Wahrheit", kategorie: "werte_haltung", sekundaer: ["identitaet", "freiheit"], description: "Bedürfnis nach selbst gefundener Wahrheit, keine Dogmen" },
        zen_paradox: { label: "Zen-Paradox", kategorie: "werte_haltung", sekundaer: ["erschaffen", "verbundenheit"], description: "Bedürfnis nach Widersprüchen, Koans, Nicht-Wissen" },
        tantra_als_weg: { label: "Tantra als Weg", kategorie: "werte_haltung", sekundaer: ["verbundenheit", "existenz"], description: "Bedürfnis nach Bejahung des Körpers, keine Askese" },
        politische_rebellion: { label: "Politische Rebellion", kategorie: "werte_haltung", sekundaer: ["freiheit"], description: "Bedürfnis nach Ablehnung ALLER politischer Systeme" },
        individueller_anarchismus: { label: "Individueller Anarchismus", kategorie: "werte_haltung", sekundaer: ["freiheit", "identitaet"], description: "Bedürfnis nach radikaler Freiheit, keine Autorität" },
        leben_als_kunst: { label: "Leben als Kunst", kategorie: "werte_haltung", sekundaer: ["erschaffen", "musse"], description: "Bedürfnis nach Leben als kreativem Akt, nicht moralisch" },
        celebration_statt_gebet: { label: "Celebration statt Gebet", kategorie: "werte_haltung", sekundaer: ["musse", "verbundenheit"], description: "Bedürfnis nach Freude statt Ernsthaftigkeit in Spiritualität" },

        // ─────────────────────────────────────────────────────────────────────
        // PRAKTISCHES LEBEN - Pirsig
        // ─────────────────────────────────────────────────────────────────────
        motorrad_pflege: { label: "Motorrad-Pflege", kategorie: "praktisches_leben", sekundaer: ["identitaet"], description: "Bedürfnis nach handwerklicher Sorgfalt, Wartung, Technik" },
        gumption_im_alltag: { label: "Gumption im Alltag", kategorie: "praktisches_leben", sekundaer: ["identitaet", "musse"], description: "Bedürfnis nach Motivation, Flow in täglichen Aufgaben" },
        stuck_vermeiden: { label: "Stuck vermeiden", kategorie: "praktisches_leben", sekundaer: ["freiheit", "erschaffen"], description: "Bedürfnis nach Flexibilität, Nicht-Festgefahren-Sein" },
        klassische_ordnung: { label: "Klassische Ordnung", kategorie: "praktisches_leben", sekundaer: ["sicherheit", "identitaet"], description: "Bedürfnis nach Systematik, Checklisten, Struktur" },
        romantisches_chaos: { label: "Romantisches Chaos", kategorie: "praktisches_leben", sekundaer: ["freiheit", "erschaffen"], description: "Bedürfnis nach spontanem, intuitivem Alltag (Gegen-Ordnung)" },
        qualitaets_werkzeug: { label: "Qualitäts-Werkzeug", kategorie: "praktisches_leben", sekundaer: ["identitaet"], description: "Bedürfnis nach gutem Werkzeug, richtiger Ausrüstung" },
        achtsamkeit_im_detail: { label: "Achtsamkeit im Detail", kategorie: "praktisches_leben", sekundaer: ["identitaet", "verbundenheit"], description: "Bedürfnis nach Präzision, Perfektion in kleinen Dingen" },

        // ─────────────────────────────────────────────────────────────────────
        // PRAKTISCHES LEBEN - Osho
        // ─────────────────────────────────────────────────────────────────────
        meditation_im_alltag: { label: "Meditation im Alltag", kategorie: "praktisches_leben", sekundaer: ["verbundenheit"], description: "Bedürfnis nach Achtsamkeit beim Kochen, Putzen, Gehen" },
        gesundheit_durch_bewusstsein: { label: "Gesundheit durch Bewusstsein", kategorie: "praktisches_leben", sekundaer: ["existenz", "identitaet"], description: "Bedürfnis nach natürlicher Gesundheit, keine Medikamente" },
        dynamische_meditation: { label: "Dynamische Meditation", kategorie: "praktisches_leben", sekundaer: ["existenz", "verbundenheit"], description: "Bedürfnis nach körperlicher Bewegung als Meditation (Osho-Technik)" },
        vipassana_im_leben: { label: "Vipassana im Leben", kategorie: "praktisches_leben", sekundaer: ["verbundenheit", "identitaet"], description: "Bedürfnis nach Beobachten ohne Urteilen im Alltag" },
        natuerliches_leben: { label: "Natürliches Leben", kategorie: "praktisches_leben", sekundaer: ["existenz", "verbundenheit"], description: "Bedürfnis nach Bio-Ernährung, Natur, Einfachheit" },
        lachen_therapie: { label: "Lachen-Therapie", kategorie: "praktisches_leben", sekundaer: ["musse", "existenz"], description: "Bedürfnis nach Humor als Heilung, Leichtigkeit" },
        no_mind: { label: "No-Mind", kategorie: "praktisches_leben", sekundaer: ["verbundenheit", "freiheit"], description: "Bedürfnis nach Nicht-Denken, Leere, Stille im Alltag" },
        zorba_der_geniesser: { label: "Zorba der Genießer", kategorie: "praktisches_leben", sekundaer: ["musse", "existenz"], description: "Bedürfnis nach sinnlichem Genuss: Essen, Trinken, Komfort" }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CROSS-CATEGORY BDSM-GFK MAPPING (Rosenberg-Integration)
    // ═══════════════════════════════════════════════════════════════════════════
    // Zeigt, welche universellen GFK-Bedürfnisse durch BDSM/Kink-Praktiken
    // gleichzeitig erfüllt werden. Basiert auf:
    // - Marshall Rosenberg's 9 Bedürfnis-Kategorien (GFK)
    // - Manfred Max-Neef's Human Scale Development
    // - BDSM-Forschung (Wismeijer & van Assen 2013, SMSNA 2023)
    //
    // Jedes BDSM-Bedürfnis erfüllt MEHRERE universelle Kategorien gleichzeitig.
    // Dies erklärt, warum BDSM/Kink tiefe psychologische Bedürfnisse befriedigt.
    // ═══════════════════════════════════════════════════════════════════════════

    bdsmGfkMapping: {

        // ─────────────────────────────────────────────────────────────────────
        // KONTROLLE & FÜHRUNG (Dominant-orientiert)
        // ─────────────────────────────────────────────────────────────────────

        kontrolle_ausueben: {
            label: "Kontrolle ausüben",
            erfuellteKategorien: {
                freiheit: {
                    beduerfnisse: ["selbstbestimmung", "waehlen_koennen"],
                    erklaerung: "Aktive Entscheidungsgewalt und Autonomie"
                },
                identitaet: {
                    beduerfnisse: ["wirksamkeit", "kompetenz", "authentizitaet"],
                    erklaerung: "Selbstwirksamkeit und Kompetenzerleben"
                },
                teilnahme: {
                    beduerfnisse: ["bedeutung_haben"],
                    erklaerung: "Bedeutungsvolle Rolle in der Beziehung"
                }
            },
            rosenbergKategorien: ["Autonomy", "Meaning"]
        },

        fuehrung_geben: {
            label: "Führung geben",
            erfuellteKategorien: {
                freiheit: {
                    beduerfnisse: ["selbstbestimmung"],
                    erklaerung: "Richtung vorgeben und gestalten"
                },
                identitaet: {
                    beduerfnisse: ["wirksamkeit", "kompetenz", "beitrag_leisten"],
                    erklaerung: "Verantwortung und Einfluss"
                },
                teilnahme: {
                    beduerfnisse: ["zusammenarbeit", "bedeutung_haben"],
                    erklaerung: "Gemeinsame Dynamik gestalten"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge"],
                    erklaerung: "Fürsorge durch Struktur geben"
                }
            },
            rosenbergKategorien: ["Autonomy", "Meaning", "Love"]
        },

        beschuetzen: {
            label: "Beschützen",
            erfuellteKategorien: {
                zuneigung: {
                    beduerfnisse: ["fuersorge", "unterstuetzung", "fuereinander_da_sein"],
                    erklaerung: "Tiefe Fürsorge und Schutz bieten"
                },
                identitaet: {
                    beduerfnisse: ["wirksamkeit", "sinn", "beitrag_leisten"],
                    erklaerung: "Sinnvolle Rolle als Beschützer"
                },
                verstaendnis: {
                    beduerfnisse: ["empathie", "beruecksichtigung"],
                    erklaerung: "Bedürfnisse des Partners erkennen"
                }
            },
            rosenbergKategorien: ["Love", "Meaning", "Understanding"]
        },

        verantwortung_uebernehmen: {
            label: "Verantwortung übernehmen",
            erfuellteKategorien: {
                identitaet: {
                    beduerfnisse: ["kompetenz", "wirksamkeit", "integritaet", "sinn"],
                    erklaerung: "Moralische und praktische Verantwortung"
                },
                teilnahme: {
                    beduerfnisse: ["zusammenarbeit", "bedeutung_haben"],
                    erklaerung: "Aktive Rolle in der Dynamik"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge"],
                    erklaerung: "Caring durch Verantwortung zeigen"
                }
            },
            rosenbergKategorien: ["Meaning", "Love"]
        },

        // ─────────────────────────────────────────────────────────────────────
        // HINGABE & VERTRAUEN (Submissiv-orientiert)
        // ─────────────────────────────────────────────────────────────────────

        hingabe: {
            label: "Hingabe",
            erfuellteKategorien: {
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz", "gesehen_werden"],
                    erklaerung: "Tiefes Vertrauen und Akzeptanz erfahren"
                },
                zuneigung: {
                    beduerfnisse: ["intimitaet", "naehe", "liebe"],
                    erklaerung: "Maximale emotionale Nähe"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern", "inspiration"],
                    erklaerung: "Transzendente Verbundenheit"
                },
                sicherheit: {
                    beduerfnisse: ["geborgenheit"],
                    erklaerung: "Geborgenheit durch Struktur"
                }
            },
            rosenbergKategorien: ["Love", "Understanding", "Safety"]
        },

        gefuehrt_werden: {
            label: "Geführt werden",
            erfuellteKategorien: {
                sicherheit: {
                    beduerfnisse: ["geborgenheit", "schutz", "stabilitaet"],
                    erklaerung: "Sicherheit durch klare Führung"
                },
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz"],
                    erklaerung: "Vertrauen in den Führenden"
                },
                musse: {
                    beduerfnisse: ["freude", "freizeit"],
                    erklaerung: "Entlastung von Entscheidungslast"
                }
            },
            rosenbergKategorien: ["Safety", "Understanding", "Recreation"]
        },

        sich_fallenlassen: {
            label: "Sich fallenlassen",
            erfuellteKategorien: {
                sicherheit: {
                    beduerfnisse: ["geborgenheit", "sich_sicher_fuehlen"],
                    erklaerung: "Paradox: Kontrolle abgeben = Sicherheit finden"
                },
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz", "gesehen_werden"],
                    erklaerung: "Vollständige Akzeptanz erfahren"
                },
                musse: {
                    beduerfnisse: ["freude"],
                    erklaerung: "Loslassen und Genießen"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern"],
                    erklaerung: "Intensive Präsenz im Moment"
                }
            },
            rosenbergKategorien: ["Safety", "Understanding", "Recreation"]
        },

        dienend_sein: {
            label: "Dienend sein",
            erfuellteKategorien: {
                identitaet: {
                    beduerfnisse: ["sinn", "beitrag_leisten", "authentizitaet"],
                    erklaerung: "Sinn durch Hingabe und Service"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge", "fuereinander_da_sein"],
                    erklaerung: "Liebe durch Handlung ausdrücken"
                },
                teilnahme: {
                    beduerfnisse: ["bedeutung_haben", "zusammenarbeit"],
                    erklaerung: "Wertvolle Rolle in der Dynamik"
                }
            },
            rosenbergKategorien: ["Meaning", "Love", "Belonging"]
        },

        vertrauen_schenken: {
            label: "Vertrauen schenken",
            erfuellteKategorien: {
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz"],
                    erklaerung: "Aktives Vertrauen als Geschenk"
                },
                zuneigung: {
                    beduerfnisse: ["intimitaet", "naehe", "liebe"],
                    erklaerung: "Tiefste Form der Intimität"
                },
                verbundenheit: {
                    beduerfnisse: ["inspiration"],
                    erklaerung: "Spirituelle Verbindung"
                }
            },
            rosenbergKategorien: ["Understanding", "Love"]
        },

        // ─────────────────────────────────────────────────────────────────────
        // GRENZEN & CONSENT (Universal)
        // ─────────────────────────────────────────────────────────────────────

        grenzen_setzen: {
            label: "Grenzen setzen",
            erfuellteKategorien: {
                freiheit: {
                    beduerfnisse: ["selbstbestimmung", "waehlen_koennen", "raum_haben"],
                    erklaerung: "Kernprinzip von Consent - jederzeit Nein sagen"
                },
                identitaet: {
                    beduerfnisse: ["authentizitaet", "integritaet", "klarheit"],
                    erklaerung: "Eigene Grenzen kennen und kommunizieren"
                },
                sicherheit: {
                    beduerfnisse: ["sich_sicher_fuehlen", "schutz"],
                    erklaerung: "Safewords als Sicherheitsnetz"
                }
            },
            rosenbergKategorien: ["Autonomy", "Safety"]
        },

        grenzen_respektieren: {
            label: "Grenzen respektieren",
            erfuellteKategorien: {
                verstaendnis: {
                    beduerfnisse: ["empathie", "akzeptanz", "beruecksichtigung"],
                    erklaerung: "Aktives Zuhören und Respektieren"
                },
                teilnahme: {
                    beduerfnisse: ["respekt", "gegenseitigkeit"],
                    erklaerung: "Gegenseitiger Respekt als Basis"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge"],
                    erklaerung: "Caring durch Grenzen achten"
                }
            },
            rosenbergKategorien: ["Understanding", "Belonging", "Love"]
        },

        // ─────────────────────────────────────────────────────────────────────
        // AUSTAUSCH & INTENSITÄT (Bidirektional)
        // ─────────────────────────────────────────────────────────────────────

        machtaustausch: {
            label: "Machtaustausch",
            erfuellteKategorien: {
                verbundenheit: {
                    beduerfnisse: ["leben_feiern", "inspiration", "anfang_ende"],
                    erklaerung: "Tiefste Form der Verbindung - Power Exchange"
                },
                musse: {
                    beduerfnisse: ["freude"],
                    erklaerung: "Spielerische Exploration"
                },
                erschaffen: {
                    beduerfnisse: ["kreativitaet", "entdecken", "selbst_ausdruck"],
                    erklaerung: "Kreative Gestaltung der Dynamik"
                },
                zuneigung: {
                    beduerfnisse: ["intimitaet", "naehe"],
                    erklaerung: "Maximale emotionale Intimität"
                }
            },
            rosenbergKategorien: ["Love", "Recreation", "Creativity"]
        },

        intensitaet: {
            label: "Intensität erleben",
            erfuellteKategorien: {
                musse: {
                    beduerfnisse: ["freude"],
                    erklaerung: "Tiefe Freude und Ekstase"
                },
                existenz: {
                    beduerfnisse: ["beruehrung", "sexueller_ausdruck"],
                    erklaerung: "Körperliche Intensität"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern"],
                    erklaerung: "Lebendigkeit spüren"
                },
                erschaffen: {
                    beduerfnisse: ["anreize_bekommen"],
                    erklaerung: "Stimulation und Neuheit"
                }
            },
            rosenbergKategorien: ["Recreation", "Sustenance"]
        },

        ritual: {
            label: "Rituale & Struktur",
            erfuellteKategorien: {
                sicherheit: {
                    beduerfnisse: ["stabilitaet", "bestaendigkeit"],
                    erklaerung: "Vorhersehbarkeit und Struktur"
                },
                identitaet: {
                    beduerfnisse: ["ordnung", "klarheit", "praesenz"],
                    erklaerung: "Bedeutungsvolle Struktur"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern"],
                    erklaerung: "Rituale als Feier der Verbindung"
                },
                teilnahme: {
                    beduerfnisse: ["zugehoerigkeit"],
                    erklaerung: "Gemeinsame Rituale stärken Bindung"
                }
            },
            rosenbergKategorien: ["Safety", "Meaning", "Belonging"]
        },

        nachsorge: {
            label: "Nachsorge/Aftercare",
            erfuellteKategorien: {
                zuneigung: {
                    beduerfnisse: ["fuersorge", "waerme", "unterstuetzung", "naehe"],
                    erklaerung: "Tiefe Fürsorge nach intensiver Erfahrung"
                },
                sicherheit: {
                    beduerfnisse: ["geborgenheit", "sich_sicher_fuehlen"],
                    erklaerung: "Emotionale Sicherheit wiederherstellen"
                },
                verstaendnis: {
                    beduerfnisse: ["empathie", "gesehen_werden", "verstanden_werden"],
                    erklaerung: "Emotionale Verarbeitung gemeinsam"
                },
                verbundenheit: {
                    beduerfnisse: ["fuereinander_da_sein"],
                    erklaerung: "Tiefe Verbundenheit nach dem Spiel"
                }
            },
            rosenbergKategorien: ["Love", "Safety", "Understanding"]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROSENBERG 9-KATEGORIEN MAPPING
    // ═══════════════════════════════════════════════════════════════════════════
    // Explizites Mapping zwischen Rosenbergs 9 Original-Kategorien und TIAGE's 11
    // ═══════════════════════════════════════════════════════════════════════════

    rosenbergMapping: {
        // Rosenberg Original → TIAGE Kategorien
        "Sustenance": ["existenz"],
        "Safety": ["sicherheit"],
        "Love": ["zuneigung"],
        "Understanding": ["verstaendnis"],
        "Creativity": ["erschaffen"],
        "Recreation": ["musse"],
        "Belonging": ["teilnahme"],
        "Autonomy": ["freiheit"],
        "Meaning": ["identitaet", "verbundenheit"],

        // TIAGE-Erweiterung (nicht in Rosenberg's Original)
        "PowerDynamics": ["dynamik"]  // BDSM/Kink-spezifisch
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ARCHETYPEN-BEDÜRFNIS-PROFILE
    // ═══════════════════════════════════════════════════════════════════════════
    // Profile werden aus separaten Dateien geladen (profiles/archetypen/*.js)
    // Jedes Profil enthält alle 88 Bedürfnisse mit Werten 0-100
    // Fallback auf Legacy-Profile falls neue nicht geladen

    // Dynamischer Getter für archetypProfile
    get archetypProfile() {
        // Prüfe ob neue Profile geladen wurden
        if (window.LoadedArchetypProfile && Object.keys(window.LoadedArchetypProfile).length > 0) {
            return window.LoadedArchetypProfile;
        }
        // Fallback auf Legacy-Profile
        return this._legacyArchetypProfile;
    },

    // Legacy-Profile als Fallback (alte ~20 Werte pro Profil)
    _legacyArchetypProfile: {

        // ─────────────────────────────────────────────────────────────────────
        // SINGLE - Der Autonome
        // ─────────────────────────────────────────────────────────────────────
        single: {
            name: "Single",
            kernbeduerfnisse: {
                // FREIHEIT (dominant)
                selbstbestimmung: 95,
                unabhaengigkeit: 95,
                waehlen_koennen: 90,
                raum_haben: 90,
                spontaneitaet: 85,

                // IDENTITÄT
                authentizitaet: 90,
                wachstum: 85,
                selbst_ausdruck: 85,
                kompetenz: 80,
                sinn: 75,

                // ERSCHAFFEN
                kreativitaet: 80,
                entdecken: 80,
                lernen: 75,

                // MUSSE
                freizeit: 85,
                freude: 80,

                // ZUNEIGUNG (niedriger)
                wertschaetzung: 60,
                gesellschaft: 55,

                // SICHERHEIT (niedrig)
                leichtigkeit: 70,
                stabilitaet: 40
            },
            beschreibung: "Maximale Autonomie und Selbstverwirklichung. Freiheit steht über Bindung."
        },

        // ─────────────────────────────────────────────────────────────────────
        // DUO - Der Verschmelzende
        // ─────────────────────────────────────────────────────────────────────
        duo: {
            name: "Duo",
            kernbeduerfnisse: {
                // SICHERHEIT (dominant)
                geborgenheit: 95,
                stabilitaet: 95,
                bestaendigkeit: 90,
                sich_sicher_fuehlen: 90,
                schutz: 85,

                // ZUNEIGUNG (sehr hoch)
                liebe: 95,
                naehe: 95,
                intimitaet: 90,
                fuereinander_da_sein: 90,
                fuersorge: 85,
                waerme: 85,

                // VERSTÄNDNIS
                vertrauen: 95,
                verstanden_werden: 85,
                harmonie: 85,
                empathie: 80,

                // VERBUNDENHEIT
                zugehoerigkeit: 90,
                leben_feiern: 75,

                // TEILNAHME
                gegenseitigkeit: 85,

                // FREIHEIT (niedrig)
                selbstbestimmung: 45,
                unabhaengigkeit: 35,
                raum_haben: 40
            },
            beschreibung: "Tiefe Verschmelzung, Sicherheit und exklusive Bindung. Zwei werden eins."
        },

        // ─────────────────────────────────────────────────────────────────────
        // DUO-FLEX - Der Flexible Ankernde
        // ─────────────────────────────────────────────────────────────────────
        "duo-flex": {
            name: "Duo-Flex",
            kernbeduerfnisse: {
                // SICHERHEIT (hoch, aber flexibler)
                stabilitaet: 80,
                geborgenheit: 75,
                bestaendigkeit: 70,
                sich_sicher_fuehlen: 75,

                // ZUNEIGUNG (hoch)
                liebe: 85,
                naehe: 80,
                intimitaet: 80,
                vertrauen: 90,
                wertschaetzung: 85,

                // FREIHEIT (moderat)
                raum_haben: 75,
                selbstbestimmung: 70,
                waehlen_koennen: 75,
                spontaneitaet: 65,

                // VERSTÄNDNIS
                akzeptanz: 85,
                verstanden_werden: 80,
                kommunikation: 90,

                // IDENTITÄT
                authentizitaet: 80,
                wachstum: 75,

                // TEILNAHME
                gegenseitigkeit: 80,
                respekt: 85
            },
            beschreibung: "Balance zwischen Anker-Beziehung und Flexibilität. Vertrauen ermöglicht Offenheit."
        },

        // ─────────────────────────────────────────────────────────────────────
        // SOLOPOLY - Der Autonome Vielfältige
        // ─────────────────────────────────────────────────────────────────────
        solopoly: {
            name: "Solopoly",
            kernbeduerfnisse: {
                // FREIHEIT (sehr hoch)
                selbstbestimmung: 95,
                unabhaengigkeit: 95,
                raum_haben: 95,
                waehlen_koennen: 90,
                spontaneitaet: 80,

                // ZUNEIGUNG (moderat, verteilt)
                naehe: 70,
                intimitaet: 75,
                wertschaetzung: 80,
                waerme: 70,

                // IDENTITÄT
                authentizitaet: 95,
                integritaet: 90,
                selbst_ausdruck: 85,
                wachstum: 80,

                // VERSTÄNDNIS
                akzeptanz: 85,
                kommunikation: 90,
                respekt: 90,

                // TEILNAHME
                gegenseitigkeit: 75,
                bedeutung_haben: 70,

                // SICHERHEIT (niedrig)
                stabilitaet: 45,
                geborgenheit: 40
            },
            beschreibung: "Autonomie als höchster Wert, multiple Verbindungen ohne Hierarchie."
        },

        // ─────────────────────────────────────────────────────────────────────
        // POLYAMOR - Der Liebende Viele
        // ─────────────────────────────────────────────────────────────────────
        polyamor: {
            name: "Polyamor",
            kernbeduerfnisse: {
                // ZUNEIGUNG (sehr hoch)
                liebe: 95,
                naehe: 85,
                intimitaet: 90,
                waerme: 85,
                fuersorge: 80,

                // VERSTÄNDNIS
                kommunikation: 95,
                empathie: 90,
                vertrauen: 90,
                verstanden_werden: 85,
                akzeptanz: 90,

                // TEILNAHME
                gemeinschaft: 85,
                zugehoerigkeit: 80,
                gegenseitigkeit: 85,
                respekt: 90,

                // FREIHEIT (moderat-hoch)
                waehlen_koennen: 80,
                selbstbestimmung: 75,
                raum_haben: 70,

                // IDENTITÄT
                authentizitaet: 90,
                wachstum: 85,
                integritaet: 85,

                // VERBUNDENHEIT
                leben_feiern: 85,

                // SICHERHEIT (moderat)
                stabilitaet: 65,
                geborgenheit: 60
            },
            beschreibung: "Fülle statt Mangel - Liebe für mehrere Menschen gleichzeitig mit hoher Kommunikation."
        },

        // ─────────────────────────────────────────────────────────────────────
        // RA
        // ─────────────────────────────────────────────────────────────────────
        ra: {
            name: "RA",
            kernbeduerfnisse: {
                // FREIHEIT (maximal)
                selbstbestimmung: 100,
                unabhaengigkeit: 100,
                waehlen_koennen: 95,
                raum_haben: 95,
                spontaneitaet: 90,

                // IDENTITÄT (sehr hoch)
                authentizitaet: 100,
                integritaet: 95,
                echtheit: 95,
                selbst_ausdruck: 90,

                // VERSTÄNDNIS
                akzeptanz: 90,
                respekt: 95,

                // TEILNAHME (auf eigenen Bedingungen)
                gegenseitigkeit: 80,
                kommunikation: 85,

                // ERSCHAFFEN
                kreativitaet: 80,
                entdecken: 85,

                // ZUNEIGUNG (individuell definiert)
                wertschaetzung: 75,
                naehe: 60,

                // SICHERHEIT (sehr niedrig)
                stabilitaet: 25,
                bestaendigkeit: 20,
                geborgenheit: 30
            },
            beschreibung: "Radikale Ablehnung aller Beziehungsnormen. Jede Verbindung wird individuell definiert."
        },

        // ─────────────────────────────────────────────────────────────────────
        // LAT - Living Apart Together
        // ─────────────────────────────────────────────────────────────────────
        lat: {
            name: "LAT",
            kernbeduerfnisse: {
                // FREIHEIT (hoch)
                raum_haben: 95,
                selbstbestimmung: 85,
                unabhaengigkeit: 85,

                // ZUNEIGUNG (hoch, aber mit Distanz)
                liebe: 85,
                naehe: 75,
                intimitaet: 80,
                wertschaetzung: 85,
                fuereinander_da_sein: 80,

                // SICHERHEIT (moderat)
                stabilitaet: 70,
                bestaendigkeit: 75,
                sich_sicher_fuehlen: 70,

                // VERSTÄNDNIS
                vertrauen: 90,
                verstanden_werden: 85,
                akzeptanz: 85,
                respekt: 90,

                // IDENTITÄT
                authentizitaet: 85,
                praesenz: 80,

                // MUSSE
                freizeit: 80,
                freude: 75
            },
            beschreibung: "Verbindlichkeit ohne Verschmelzung. Bewusste Distanz erhält die Qualität."
        },

        // ─────────────────────────────────────────────────────────────────────
        // AROMANTISCH - Der Platonische
        // ─────────────────────────────────────────────────────────────────────
        aromantisch: {
            name: "Aromantisch",
            kernbeduerfnisse: {
                // TEILNAHME (hoch - platonisch)
                gemeinschaft: 85,
                zugehoerigkeit: 80,
                respekt: 90,
                bedeutung_haben: 80,

                // VERSTÄNDNIS
                akzeptanz: 95,
                verstanden_werden: 90,
                gesehen_werden: 90,

                // FREIHEIT (hoch)
                selbstbestimmung: 85,
                authentizitaet: 95,
                raum_haben: 80,

                // ZUNEIGUNG (platonisch)
                wertschaetzung: 85,
                fuersorge: 75,
                gesellschaft: 80,
                unterstuetzung: 80,
                // Romantische Aspekte niedrig
                intimitaet: 40,
                liebe: 45, // platonische Liebe

                // IDENTITÄT
                echtheit: 90,
                integritaet: 85,

                // SICHERHEIT (moderat)
                stabilitaet: 65,
                sich_sicher_fuehlen: 70
            },
            beschreibung: "Tiefe platonische Verbindungen ohne romantische Komponente. Authentisch anders."
        }
    },

    /**
     * Initialisiert die Profile aus den geladenen Archetyp-Dateien
     * Wird automatisch aufgerufen wenn die Profile verfügbar sind
     */
    initFromLoadedProfiles: function() {
        if (window.LoadedArchetypProfile) {
            console.log('GfkBeduerfnisse: Neue Profile geladen mit je 88 Bedürfnissen');
            Object.keys(window.LoadedArchetypProfile).forEach(key => {
                const profil = window.LoadedArchetypProfile[key];
                console.log(`  - ${key}: ${Object.keys(profil.kernbeduerfnisse).length} Bedürfnisse`);
            });
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MATCHING-FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet die Bedürfnis-Übereinstimmung zwischen zwei Archetypen
     * @param {string} archetyp1 - ID des ersten Archetyps
     * @param {string} archetyp2 - ID des zweiten Archetyps
     * @returns {Object} Matching-Ergebnis mit Score und Details
     */
    berechneMatching: function(archetyp1, archetyp2) {
        const profil1 = this.archetypProfile[archetyp1];
        const profil2 = this.archetypProfile[archetyp2];

        if (!profil1 || !profil2) {
            return { score: 0, fehler: "Unbekannter Archetyp" };
        }

        const bed1 = profil1.kernbeduerfnisse;
        const bed2 = profil2.kernbeduerfnisse;

        // Alle Bedürfnisse sammeln
        const alleBed = new Set([...Object.keys(bed1), ...Object.keys(bed2)]);

        let summeUebereinstimmung = 0;
        let summeGewicht = 0;
        const details = {
            uebereinstimmend: [],
            komplementaer: [],
            konflikt: []
        };

        alleBed.forEach(bed => {
            const wert1 = bed1[bed] || 0;
            const wert2 = bed2[bed] || 0;

            // Gewicht = Durchschnitt der Wichtigkeit
            const gewicht = (wert1 + wert2) / 2;

            if (gewicht > 30) { // Nur relevante Bedürfnisse
                // Differenz berechnen
                const diff = Math.abs(wert1 - wert2);

                // Übereinstimmung: 100 - Differenz
                const uebereinstimmung = Math.max(0, 100 - diff);

                summeUebereinstimmung += uebereinstimmung * gewicht;
                summeGewicht += gewicht;

                const bedInfo = {
                    id: bed,
                    label: this.definitionen[bed]?.label || bed,
                    wert1: wert1,
                    wert2: wert2,
                    diff: diff
                };

                // Kategorisierung
                if (diff <= 15) {
                    details.uebereinstimmend.push(bedInfo);
                } else if (diff <= 35) {
                    details.komplementaer.push(bedInfo);
                } else {
                    details.konflikt.push(bedInfo);
                }
            }
        });

        // Gesamtscore (0-100)
        const score = summeGewicht > 0
            ? Math.round(summeUebereinstimmung / summeGewicht)
            : 0;

        // Sortieren nach Relevanz
        details.uebereinstimmend.sort((a, b) => (b.wert1 + b.wert2) - (a.wert1 + a.wert2));
        details.konflikt.sort((a, b) => b.diff - a.diff);

        return {
            score: score,
            level: this.scoreToLevel(score),
            archetyp1: profil1.name,
            archetyp2: profil2.name,
            details: details,
            topUebereinstimmungen: details.uebereinstimmend.slice(0, 5),
            topKonflikte: details.konflikt.slice(0, 3)
        };
    },

    /**
     * Konvertiert Score zu GFK-Level
     */
    scoreToLevel: function(score) {
        if (score >= 75) return "hoch";
        if (score >= 55) return "mittel";
        return "niedrig";
    },

    /**
     * Gibt die Top-Bedürfnisse eines Archetyps zurück
     * @param {string} archetyp - ID des Archetyps
     * @param {number} anzahl - Anzahl der Top-Bedürfnisse
     */
    getTopBeduerfnisse: function(archetyp, anzahl = 5) {
        const profil = this.archetypProfile[archetyp];
        if (!profil) return [];

        return Object.entries(profil.kernbeduerfnisse)
            .sort((a, b) => b[1] - a[1])
            .slice(0, anzahl)
            .map(([id, wert]) => ({
                id: id,
                label: this.definitionen[id]?.label || id,
                wert: wert,
                kategorie: this.definitionen[id]?.kategorie
            }));
    },

    /**
     * Berechnet Kategorie-Scores für einen Archetyp
     */
    getKategorieScores: function(archetyp) {
        const profil = this.archetypProfile[archetyp];
        if (!profil) return {};

        const scores = {};

        Object.entries(this.kategorien).forEach(([katId, kat]) => {
            let summe = 0;
            let anzahl = 0;

            kat.beduerfnisse.forEach(bed => {
                if (profil.kernbeduerfnisse[bed]) {
                    summe += profil.kernbeduerfnisse[bed];
                    anzahl++;
                }
            });

            scores[katId] = {
                name: kat.name,
                color: kat.color,
                score: anzahl > 0 ? Math.round(summe / anzahl) : 0
            };
        });

        return scores;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // PATHOS / LOGOS ZUORDNUNG
    // ═══════════════════════════════════════════════════════════════════════════
    // Logos = Verstand, Philosophie, Werte
    // Pathos = Gefühl, Körper, Energie

    pathosLogosMapping: {
        // LOGOS-Kategorien (Verstand, Philosophie)
        logos: {
            kategorien: ['identitaet', 'erschaffen', 'teilnahme'],
            beschreibung: "Werte, Sinn, Kommunikation"
        },
        // PATHOS-Kategorien (Gefühl, Körper, Energie)
        pathos: {
            kategorien: ['zuneigung', 'sicherheit', 'freiheit', 'verstaendnis', 'verbundenheit', 'musse', 'existenz'],
            beschreibung: "Gefühle, Nähe, Sicherheit"
        }
    },

    /**
     * Gibt zurück, ob ein Bedürfnis zu Pathos oder Logos gehört
     */
    getPathosLogos: function(beduerfnisId) {
        const def = this.definitionen[beduerfnisId];
        if (!def) return null;

        const kategorie = def.kategorie;
        if (this.pathosLogosMapping.logos.kategorien.includes(kategorie)) {
            return 'logos';
        }
        return 'pathos';
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // "WER BRINGT WAS MIT" - ANALYSE
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Analysiert was jeder Partner in die Beziehung einbringt
     * @param {string} archetyp1 - ICH Archetyp
     * @param {string} archetyp2 - Partner Archetyp
     * @returns {Object} Detaillierte Analyse für Pathos/Logos Ansicht
     */
    analysiereWerBringtWasMit: function(archetyp1, archetyp2) {
        const profil1 = this.archetypProfile[archetyp1];
        const profil2 = this.archetypProfile[archetyp2];

        if (!profil1 || !profil2) {
            return { fehler: "Unbekannter Archetyp" };
        }

        const result = {
            ich: {
                name: profil1.name,
                archetyp: archetyp1,
                staerken: { pathos: [], logos: [] },
                beduerfnisse: { pathos: [], logos: [] }
            },
            partner: {
                name: profil2.name,
                archetyp: archetyp2,
                staerken: { pathos: [], logos: [] },
                beduerfnisse: { pathos: [], logos: [] }
            },
            gemeinsam: {
                pathos: [],
                logos: []
            },
            wachstumspotential: {
                pathos: [],
                logos: []
            }
        };

        const bed1 = profil1.kernbeduerfnisse;
        const bed2 = profil2.kernbeduerfnisse;
        const alleBed = new Set([...Object.keys(bed1), ...Object.keys(bed2)]);

        alleBed.forEach(bed => {
            const wert1 = bed1[bed] || 0;
            const wert2 = bed2[bed] || 0;
            const pathosLogos = this.getPathosLogos(bed);

            if (!pathosLogos) return;

            const bedInfo = {
                id: bed,
                label: this.definitionen[bed]?.label || bed,
                kategorie: this.definitionen[bed]?.kategorie,
                wertIch: wert1,
                wertPartner: wert2
            };

            // Stärken: Was jemand stark mitbringt (> 75)
            if (wert1 >= 75) {
                result.ich.staerken[pathosLogos].push({ ...bedInfo, wert: wert1 });
            }
            if (wert2 >= 75) {
                result.partner.staerken[pathosLogos].push({ ...bedInfo, wert: wert2 });
            }

            // Bedürfnisse: Was jemand braucht (> 70)
            if (wert1 >= 70) {
                result.ich.beduerfnisse[pathosLogos].push({ ...bedInfo, wert: wert1 });
            }
            if (wert2 >= 70) {
                result.partner.beduerfnisse[pathosLogos].push({ ...bedInfo, wert: wert2 });
            }

            // Gemeinsam: Beide hoch (beide > 70)
            if (wert1 >= 70 && wert2 >= 70) {
                result.gemeinsam[pathosLogos].push(bedInfo);
            }

            // Wachstumspotential: Einer stark, anderer schwach (Diff > 40)
            const diff = Math.abs(wert1 - wert2);
            if (diff >= 40 && (wert1 >= 70 || wert2 >= 70)) {
                result.wachstumspotential[pathosLogos].push({
                    ...bedInfo,
                    staerkerBei: wert1 > wert2 ? 'ich' : 'partner',
                    diff: diff
                });
            }
        });

        // Sortieren nach Wichtigkeit
        ['ich', 'partner'].forEach(person => {
            ['pathos', 'logos'].forEach(pl => {
                result[person].staerken[pl].sort((a, b) => b.wert - a.wert);
                result[person].beduerfnisse[pl].sort((a, b) => b.wert - a.wert);
            });
        });

        ['pathos', 'logos'].forEach(pl => {
            result.gemeinsam[pl].sort((a, b) => (b.wertIch + b.wertPartner) - (a.wertIch + a.wertPartner));
            result.wachstumspotential[pl].sort((a, b) => b.diff - a.diff);
        });

        // Summary-Texte generieren
        result.summary = this.generiereSummary(result);

        return result;
    },

    /**
     * Generiert lesbare Summary-Texte für die Analyse
     */
    generiereSummary: function(analyse) {
        const summary = {
            ich: { pathos: '', logos: '' },
            partner: { pathos: '', logos: '' }
        };

        // ICH - Pathos
        const ichPathosTop = analyse.ich.staerken.pathos.slice(0, 3).map(b => b.label);
        if (ichPathosTop.length > 0) {
            summary.ich.pathos = `Bringt ${ichPathosTop.join(', ')} mit`;
        }

        // ICH - Logos
        const ichLogosTop = analyse.ich.staerken.logos.slice(0, 3).map(b => b.label);
        if (ichLogosTop.length > 0) {
            summary.ich.logos = `Bringt ${ichLogosTop.join(', ')} mit`;
        }

        // Partner - Pathos
        const partnerPathosTop = analyse.partner.staerken.pathos.slice(0, 3).map(b => b.label);
        if (partnerPathosTop.length > 0) {
            summary.partner.pathos = `Bringt ${partnerPathosTop.join(', ')} mit`;
        }

        // Partner - Logos
        const partnerLogosTop = analyse.partner.staerken.logos.slice(0, 3).map(b => b.label);
        if (partnerLogosTop.length > 0) {
            summary.partner.logos = `Bringt ${partnerLogosTop.join(', ')} mit`;
        }

        return summary;
    },

    /**
     * Berechnet Pathos- und Logos-Scores für ein Archetyp-Paar
     */
    berechnePathosLogosScores: function(archetyp1, archetyp2) {
        const profil1 = this.archetypProfile[archetyp1];
        const profil2 = this.archetypProfile[archetyp2];

        if (!profil1 || !profil2) {
            return { pathos: 0, logos: 0 };
        }

        const bed1 = profil1.kernbeduerfnisse;
        const bed2 = profil2.kernbeduerfnisse;

        let pathosSum = 0, pathosCount = 0;
        let logosSum = 0, logosCount = 0;

        const alleBed = new Set([...Object.keys(bed1), ...Object.keys(bed2)]);

        alleBed.forEach(bed => {
            const wert1 = bed1[bed] || 0;
            const wert2 = bed2[bed] || 0;
            const pathosLogos = this.getPathosLogos(bed);

            if (!pathosLogos) return;

            const gewicht = (wert1 + wert2) / 2;
            if (gewicht < 30) return;

            const diff = Math.abs(wert1 - wert2);
            const uebereinstimmung = Math.max(0, 100 - diff);

            if (pathosLogos === 'pathos') {
                pathosSum += uebereinstimmung * gewicht;
                pathosCount += gewicht;
            } else {
                logosSum += uebereinstimmung * gewicht;
                logosCount += gewicht;
            }
        });

        return {
            pathos: pathosCount > 0 ? Math.round(pathosSum / pathosCount) : 0,
            logos: logosCount > 0 ? Math.round(logosSum / logosCount) : 0
        };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BDSM-GFK CROSS-CATEGORY HELPER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Gibt alle GFK-Kategorien zurück, die ein BDSM-Bedürfnis erfüllt
     * @param {string} bdsmBeduerfnis - ID des BDSM-Bedürfnisses (z.B. "nachsorge")
     * @returns {Object} Erfüllte Kategorien mit Erklärungen
     */
    getBdsmGfkKategorien: function(bdsmBeduerfnis) {
        const mapping = this.bdsmGfkMapping[bdsmBeduerfnis];
        if (!mapping) return null;

        return {
            label: mapping.label,
            erfuellteKategorien: mapping.erfuellteKategorien,
            rosenbergKategorien: mapping.rosenbergKategorien,
            anzahlKategorien: Object.keys(mapping.erfuellteKategorien).length
        };
    },

    /**
     * Findet alle BDSM-Bedürfnisse die eine bestimmte GFK-Kategorie erfüllen
     * @param {string} gfkKategorie - ID der GFK-Kategorie (z.B. "zuneigung")
     * @returns {Array} Liste von BDSM-Bedürfnissen
     */
    findBdsmByGfkKategorie: function(gfkKategorie) {
        const result = [];

        Object.entries(this.bdsmGfkMapping).forEach(([bdsmId, mapping]) => {
            if (mapping.erfuellteKategorien[gfkKategorie]) {
                result.push({
                    id: bdsmId,
                    label: mapping.label,
                    beduerfnisse: mapping.erfuellteKategorien[gfkKategorie].beduerfnisse,
                    erklaerung: mapping.erfuellteKategorien[gfkKategorie].erklaerung
                });
            }
        });

        return result;
    },

    /**
     * Findet alle BDSM-Bedürfnisse die eine Rosenberg-Kategorie erfüllen
     * @param {string} rosenbergKategorie - Rosenberg-Kategorie (z.B. "Autonomy", "Love")
     * @returns {Array} Liste von BDSM-Bedürfnissen
     */
    findBdsmByRosenberg: function(rosenbergKategorie) {
        const result = [];

        Object.entries(this.bdsmGfkMapping).forEach(([bdsmId, mapping]) => {
            if (mapping.rosenbergKategorien.includes(rosenbergKategorie)) {
                result.push({
                    id: bdsmId,
                    label: mapping.label,
                    alleRosenberg: mapping.rosenbergKategorien
                });
            }
        });

        return result;
    },

    /**
     * Berechnet wie viele universelle Bedürfnisse durch BDSM-Praktiken erfüllt werden
     * @returns {Object} Statistik über BDSM-GFK-Verbindungen
     */
    getBdsmGfkStatistik: function() {
        const stats = {
            totalBdsmBeduerfnisse: Object.keys(this.bdsmGfkMapping).length,
            kategorieAbdeckung: {},
            rosenbergAbdeckung: {},
            durchschnittKategorienProBdsm: 0
        };

        let summeKategorien = 0;

        // Zähle Kategorien pro BDSM-Bedürfnis
        Object.values(this.bdsmGfkMapping).forEach(mapping => {
            summeKategorien += Object.keys(mapping.erfuellteKategorien).length;

            // GFK-Kategorien zählen
            Object.keys(mapping.erfuellteKategorien).forEach(kat => {
                stats.kategorieAbdeckung[kat] = (stats.kategorieAbdeckung[kat] || 0) + 1;
            });

            // Rosenberg-Kategorien zählen
            mapping.rosenbergKategorien.forEach(ros => {
                stats.rosenbergAbdeckung[ros] = (stats.rosenbergAbdeckung[ros] || 0) + 1;
            });
        });

        stats.durchschnittKategorienProBdsm = Math.round(
            (summeKategorien / stats.totalBdsmBeduerfnisse) * 10
        ) / 10;

        return stats;
    },

    /**
     * Generiert einen lesbaren Report über BDSM-GFK-Verbindungen
     * @param {string} bdsmBeduerfnis - ID des BDSM-Bedürfnisses
     * @returns {string} Formatierter Report
     */
    generateBdsmGfkReport: function(bdsmBeduerfnis) {
        const mapping = this.bdsmGfkMapping[bdsmBeduerfnis];
        if (!mapping) return `Unbekanntes BDSM-Bedürfnis: ${bdsmBeduerfnis}`;

        let report = `\n═══ ${mapping.label.toUpperCase()} ═══\n\n`;
        report += `Erfüllt ${Object.keys(mapping.erfuellteKategorien).length} GFK-Kategorien:\n\n`;

        Object.entries(mapping.erfuellteKategorien).forEach(([katId, details]) => {
            const kategorie = this.kategorien[katId];
            report += `● ${kategorie?.name || katId}\n`;
            report += `  Bedürfnisse: ${details.beduerfnisse.map(b =>
                this.definitionen[b]?.label || b
            ).join(', ')}\n`;
            report += `  → ${details.erklaerung}\n\n`;
        });

        report += `Rosenberg-Kategorien: ${mapping.rosenbergKategorien.join(', ')}\n`;

        return report;
    },

    /**
     * Analysiert welche BDSM-Praktiken am meisten universelle Bedürfnisse erfüllen
     * @returns {Array} Sortierte Liste nach Anzahl erfüllter Kategorien
     */
    getBdsmByUniversalitaet: function() {
        return Object.entries(this.bdsmGfkMapping)
            .map(([id, mapping]) => ({
                id: id,
                label: mapping.label,
                kategorienAnzahl: Object.keys(mapping.erfuellteKategorien).length,
                rosenbergAnzahl: mapping.rosenbergKategorien.length,
                kategorien: Object.keys(mapping.erfuellteKategorien),
                rosenberg: mapping.rosenbergKategorien
            }))
            .sort((a, b) => b.kategorienAnzahl - a.kategorienAnzahl);
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GfkBeduerfnisse };
}

