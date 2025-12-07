/**
 * ATTRIBUTE SUMMARY CARD COMPONENT
 *
 * Zeigt Attribute als Zusammenfassung der zugehörigen Bedürfnisse.
 * Klick zum Erweitern und Bearbeiten der einzelnen Bedürfnisse.
 * Mit Eingabewert und Schloss wie bei Gewichtungen.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const AttributeSummaryCard = (function() {
    'use strict';

    /**
     * Mapping: Attribut → zugehörige Bedürfnisse
     *
     * NEU: Erweitert um attribut-spezifische Bedürfnisse
     * Die GFK-Bedürfnisse (Rosenberg) sind zu abstrakt für konkrete Lebensthemen.
     * Daher wurden spezifische Bedürfnisse hinzugefügt wie:
     * - kinderwunsch, elternschaft, fortpflanzung
     * - finanzielle_sicherheit, finanzielle_unabhaengigkeit
     * - haeuslichkeit, nest_bauen, sesshaftigkeit
     * - abenteuer, reisen, mobilitaet
     * - ordnungssinn, struktur
     * - spiritualitaet, glaubenspraxis
     * - umweltverantwortung, nachhaltigkeit
     */
    const ATTRIBUTE_NEEDS_MAPPING = {
        // GESCHLECHTSIDENTITÄT
        'pr-geschlecht-sekundaer': {
            needs: ['akzeptanz', 'verstanden_werden', 'gesehen_werden', 'authentizitaet',
                    'selbstbestimmung', 'identitaet', 'selbst_ausdruck'],
            label: 'Geschlechtsidentität',
            category: 'geschlechtsidentitaet'
        },

        // LEBENSPLANUNG
        'pr-kinder': {
            needs: ['kinderwunsch', 'elternschaft', 'fortpflanzung', 'fuersorge',
                    'familie_gruenden', 'generativitaet', 'verantwortung_uebernehmen'],
            label: 'Kinder',
            category: 'lebensplanung'
        },
        'pr-ehe': {
            needs: ['verbindlichkeit', 'langfristige_bindung', 'rechtliche_sicherheit',
                    'gesellschaftliche_anerkennung', 'tradition', 'treueversprechen'],
            label: 'Ehe',
            category: 'lebensplanung'
        },
        'pr-zusammen': {
            needs: ['gemeinsamer_wohnraum', 'haeuslichkeit', 'nest_bauen', 'alltag_teilen',
                    'naehe', 'eigener_raum', 'rueckzugsort'],
            label: 'Zusammen wohnen',
            category: 'lebensplanung'
        },
        'pr-haustiere': {
            needs: ['tierliebe', 'fuersorge_tiere', 'begleiter', 'verantwortung_tier',
                    'natur_verbundenheit', 'ungebundenheit'],
            label: 'Haustiere',
            category: 'lebensplanung'
        },
        'pr-umzug': {
            needs: ['sesshaftigkeit', 'verwurzelung', 'mobilitaet', 'flexibilitaet',
                    'heimat', 'neue_orte', 'stabiler_lebensmittelpunkt'],
            label: 'Umzugsbereitschaft',
            category: 'lebensplanung'
        },
        'pr-familie': {
            needs: ['familienbindung', 'herkunftsfamilie', 'familientreffen',
                    'generationenverbund', 'familienpflichten', 'eigenstaendigkeit_von_familie'],
            label: 'Familie-Wichtigkeit',
            category: 'lebensplanung'
        },

        // FINANZEN & KARRIERE
        'pr-finanzen': {
            needs: ['finanzielle_unabhaengigkeit', 'gemeinsame_finanzen', 'finanzielle_transparenz',
                    'finanzielle_sicherheit', 'sparsamkeit', 'grosszuegigkeit'],
            label: 'Finanzen',
            category: 'finanzen'
        },
        'pr-karriere': {
            needs: ['berufliche_erfuellung', 'karriereambition', 'work_life_balance',
                    'berufliche_anerkennung', 'zeit_fuer_beziehung', 'berufliche_flexibilitaet'],
            label: 'Karriere-Priorität',
            category: 'finanzen'
        },

        // KOMMUNIKATION
        'pr-gespraech': {
            needs: ['taeglicher_austausch', 'tiefgehende_gespraeche', 'small_talk',
                    'stille_gemeinsam', 'verbale_verbindung', 'zuhoeren'],
            label: 'Gesprächsbedürfnis',
            category: 'kommunikation'
        },
        'pr-emotional': {
            needs: ['emotionale_offenheit', 'gefuehle_zeigen', 'verletzlichkeit',
                    'emotionale_zurueckhaltung', 'emotionale_sicherheit', 'gefuehle_teilen'],
            label: 'Emotionale Offenheit',
            category: 'kommunikation'
        },
        'pr-konflikt': {
            needs: ['konfliktklaerung', 'harmonie', 'aussprache', 'konflikt_vermeiden',
                    'streitkultur', 'versoehnlichkeit'],
            label: 'Konfliktverhalten',
            category: 'kommunikation'
        },

        // SOZIALES
        'pr-introextro': {
            needs: ['soziale_energie', 'geselligkeit', 'ruhe_von_menschen',
                    'allein_aufladen', 'menschen_treffen', 'kleine_gruppen'],
            label: 'Intro/Extrovertiert',
            category: 'soziales'
        },
        'pr-alleinzeit': {
            needs: ['zeit_fuer_sich', 'eigene_hobbys', 'gemeinsame_zeit',
                    'unabhaengigkeit', 'partnerzeit', 'eigene_interessen'],
            label: 'Alleinzeit-Bedürfnis',
            category: 'soziales'
        },
        'pr-freunde': {
            needs: ['eigene_freunde', 'gemeinsame_freunde', 'freundeskreis_teilen',
                    'soziales_netz', 'freunde_pflegen', 'neue_freundschaften'],
            label: 'Freundeskreis',
            category: 'soziales'
        },

        // INTIMITÄT
        'pr-naehe': {
            needs: ['koerpernaehe', 'beruehrung', 'kuscheln', 'physische_distanz',
                    'koerperkontakt', 'umarmungen', 'hand_halten'],
            label: 'Körperliche Nähe',
            category: 'intimitaet'
        },
        'pr-romantik': {
            needs: ['romantische_gesten', 'ueberraschungen', 'dates', 'alltags_romantik',
                    'aufmerksamkeiten', 'liebesbekundungen'],
            label: 'Romantik-Bedürfnis',
            category: 'intimitaet'
        },
        'pr-sex': {
            needs: ['sexuelle_haeufigkeit', 'sexuelle_intimiaet', 'koerperliche_lust',
                    'sexuelle_experimentierfreude', 'sexuelle_verbindung', 'sexuelle_zufriedenheit'],
            label: 'Sexuelle Frequenz',
            category: 'intimitaet'
        },

        // WERTE
        'pr-religion': {
            needs: ['spiritualitaet', 'glaubenspraxis', 'religioese_gemeinschaft',
                    'saekularitaet', 'sinnsuche', 'transzendenz'],
            label: 'Religiosität',
            category: 'werte'
        },
        'pr-tradition': {
            needs: ['traditionelle_werte', 'moderne_lebensweise', 'konservative_werte',
                    'progressive_werte', 'kulturelle_tradition', 'offenheit_fuer_neues'],
            label: 'Tradition vs. Modern',
            category: 'werte'
        },
        'pr-umwelt': {
            needs: ['umweltverantwortung', 'nachhaltigkeit', 'oekologisches_bewusstsein',
                    'pragmatismus', 'klimaschutz', 'ressourcenschonung'],
            label: 'Umweltbewusstsein',
            category: 'werte'
        },

        // PRAKTISCHES
        'pr-ordnung': {
            needs: ['ordnungssinn', 'sauberkeit', 'struktur', 'chaos_toleranz',
                    'organisiert_sein', 'flexibilitaet_haushalt'],
            label: 'Ordnung',
            category: 'praktisches'
        },
        'pr-reise': {
            needs: ['reisen', 'abenteuer', 'neue_orte_entdecken', 'zuhause_bleiben',
                    'urlaub', 'fernweh', 'heimatverbundenheit'],
            label: 'Reise-Frequenz',
            category: 'praktisches'
        }
    };

    /**
     * Deutsche Übersetzungen für Bedürfnisse
     *
     * Enthält sowohl GFK-Bedürfnisse (Rosenberg) als auch
     * attribut-spezifische Bedürfnisse für das Beziehungsmodell.
     */
    const NEEDS_LABELS = {
        // ═══════════════════════════════════════════════════════════════
        // ATTRIBUT-SPEZIFISCHE BEDÜRFNISSE (NEU)
        // ═══════════════════════════════════════════════════════════════

        // KINDER / LEBENSPLANUNG
        kinderwunsch: 'Kinderwunsch',
        elternschaft: 'Elternschaft',
        fortpflanzung: 'Fortpflanzung',
        familie_gruenden: 'Familie gründen',
        generativitaet: 'Generativität (Weitergabe)',

        // EHE / BINDUNG
        verbindlichkeit: 'Verbindlichkeit',
        langfristige_bindung: 'Langfristige Bindung',
        rechtliche_sicherheit: 'Rechtliche Sicherheit',
        gesellschaftliche_anerkennung: 'Gesellschaftliche Anerkennung',
        tradition: 'Tradition',
        treueversprechen: 'Treueversprechen',

        // WOHNEN
        gemeinsamer_wohnraum: 'Gemeinsamer Wohnraum',
        haeuslichkeit: 'Häuslichkeit',
        nest_bauen: 'Nest bauen',
        alltag_teilen: 'Alltag teilen',
        eigener_raum: 'Eigener Raum',
        rueckzugsort: 'Rückzugsort',

        // HAUSTIERE
        tierliebe: 'Tierliebe',
        fuersorge_tiere: 'Fürsorge für Tiere',
        begleiter: 'Tierischer Begleiter',
        verantwortung_tier: 'Verantwortung für Tier',
        natur_verbundenheit: 'Naturverbundenheit',
        ungebundenheit: 'Ungebundenheit',

        // UMZUG / MOBILITÄT
        sesshaftigkeit: 'Sesshaftigkeit',
        verwurzelung: 'Verwurzelung',
        mobilitaet: 'Mobilität',
        flexibilitaet: 'Flexibilität',
        heimat: 'Heimat',
        neue_orte: 'Neue Orte',
        stabiler_lebensmittelpunkt: 'Stabiler Lebensmittelpunkt',

        // FAMILIE
        familienbindung: 'Familienbindung',
        herkunftsfamilie: 'Herkunftsfamilie',
        familientreffen: 'Familientreffen',
        generationenverbund: 'Generationenverbund',
        familienpflichten: 'Familienpflichten',
        eigenstaendigkeit_von_familie: 'Eigenständigkeit von Familie',

        // FINANZEN
        finanzielle_unabhaengigkeit: 'Finanzielle Unabhängigkeit',
        gemeinsame_finanzen: 'Gemeinsame Finanzen',
        finanzielle_transparenz: 'Finanzielle Transparenz',
        finanzielle_sicherheit: 'Finanzielle Sicherheit',
        sparsamkeit: 'Sparsamkeit',
        grosszuegigkeit: 'Großzügigkeit',

        // KARRIERE
        berufliche_erfuellung: 'Berufliche Erfüllung',
        karriereambition: 'Karriereambition',
        work_life_balance: 'Work-Life-Balance',
        berufliche_anerkennung: 'Berufliche Anerkennung',
        zeit_fuer_beziehung: 'Zeit für Beziehung',
        berufliche_flexibilitaet: 'Berufliche Flexibilität',

        // KOMMUNIKATION
        taeglicher_austausch: 'Täglicher Austausch',
        tiefgehende_gespraeche: 'Tiefgehende Gespräche',
        small_talk: 'Small Talk',
        stille_gemeinsam: 'Stille gemeinsam',
        verbale_verbindung: 'Verbale Verbindung',
        zuhoeren: 'Zuhören',

        // EMOTIONEN
        emotionale_offenheit: 'Emotionale Offenheit',
        gefuehle_zeigen: 'Gefühle zeigen',
        verletzlichkeit: 'Verletzlichkeit zulassen',
        emotionale_zurueckhaltung: 'Emotionale Zurückhaltung',
        emotionale_sicherheit: 'Emotionale Sicherheit',
        gefuehle_teilen: 'Gefühle teilen',

        // KONFLIKTE
        konfliktklaerung: 'Konfliktklärung',
        aussprache: 'Aussprache',
        konflikt_vermeiden: 'Konflikt vermeiden',
        streitkultur: 'Streitkultur',
        versoehnlichkeit: 'Versöhnlichkeit',

        // SOZIALES / INTROVERSION-EXTROVERSION
        soziale_energie: 'Soziale Energie',
        geselligkeit: 'Geselligkeit',
        ruhe_von_menschen: 'Ruhe von Menschen',
        allein_aufladen: 'Allein aufladen',
        menschen_treffen: 'Menschen treffen',
        kleine_gruppen: 'Kleine Gruppen',

        // ALLEINZEIT
        zeit_fuer_sich: 'Zeit für sich',
        eigene_hobbys: 'Eigene Hobbys',
        gemeinsame_zeit: 'Gemeinsame Zeit',
        partnerzeit: 'Partnerzeit',
        eigene_interessen: 'Eigene Interessen',

        // FREUNDESKREIS
        eigene_freunde: 'Eigene Freunde',
        gemeinsame_freunde: 'Gemeinsame Freunde',
        freundeskreis_teilen: 'Freundeskreis teilen',
        soziales_netz: 'Soziales Netz',
        freunde_pflegen: 'Freunde pflegen',
        neue_freundschaften: 'Neue Freundschaften',

        // KÖRPERLICHE NÄHE
        koerpernaehe: 'Körpernähe',
        kuscheln: 'Kuscheln',
        physische_distanz: 'Physische Distanz',
        koerperkontakt: 'Körperkontakt',
        umarmungen: 'Umarmungen',
        hand_halten: 'Hand halten',

        // ROMANTIK
        romantische_gesten: 'Romantische Gesten',
        ueberraschungen: 'Überraschungen',
        dates: 'Dates',
        alltags_romantik: 'Alltags-Romantik',
        aufmerksamkeiten: 'Aufmerksamkeiten',
        liebesbekundungen: 'Liebesbekundungen',

        // SEXUALITÄT
        sexuelle_haeufigkeit: 'Sexuelle Häufigkeit',
        sexuelle_intimiaet: 'Sexuelle Intimität',
        koerperliche_lust: 'Körperliche Lust',
        sexuelle_experimentierfreude: 'Sexuelle Experimentierfreude',
        sexuelle_verbindung: 'Sexuelle Verbindung',
        sexuelle_zufriedenheit: 'Sexuelle Zufriedenheit',

        // RELIGION / SPIRITUALITÄT
        spiritualitaet: 'Spiritualität',
        glaubenspraxis: 'Glaubenspraxis',
        religioese_gemeinschaft: 'Religiöse Gemeinschaft',
        saekularitaet: 'Säkularität',
        sinnsuche: 'Sinnsuche',
        transzendenz: 'Transzendenz',

        // TRADITION / MODERNE
        traditionelle_werte: 'Traditionelle Werte',
        moderne_lebensweise: 'Moderne Lebensweise',
        konservative_werte: 'Konservative Werte',
        progressive_werte: 'Progressive Werte',
        kulturelle_tradition: 'Kulturelle Tradition',
        offenheit_fuer_neues: 'Offenheit für Neues',

        // UMWELT
        umweltverantwortung: 'Umweltverantwortung',
        nachhaltigkeit: 'Nachhaltigkeit',
        oekologisches_bewusstsein: 'Ökologisches Bewusstsein',
        pragmatismus: 'Pragmatismus',
        klimaschutz: 'Klimaschutz',
        ressourcenschonung: 'Ressourcenschonung',

        // ORDNUNG
        ordnungssinn: 'Ordnungssinn',
        sauberkeit: 'Sauberkeit',
        struktur: 'Struktur',
        chaos_toleranz: 'Chaos-Toleranz',
        organisiert_sein: 'Organisiert sein',
        flexibilitaet_haushalt: 'Flexibilität im Haushalt',

        // REISEN
        reisen: 'Reisen',
        abenteuer: 'Abenteuer',
        neue_orte_entdecken: 'Neue Orte entdecken',
        zuhause_bleiben: 'Zuhause bleiben',
        urlaub: 'Urlaub',
        fernweh: 'Fernweh',
        heimatverbundenheit: 'Heimatverbundenheit',

        // ═══════════════════════════════════════════════════════════════
        // GFK-BEDÜRFNISSE (Rosenberg) - für Rückwärtskompatibilität
        // ═══════════════════════════════════════════════════════════════

        // PHYSISCH
        luft: 'Luft',
        wasser: 'Wasser',
        essen: 'Nahrung',
        bewegung: 'Bewegung',
        beruehrung: 'Berührung',
        ruhe: 'Ruhe',
        sexualitaet: 'Sexualität',
        lust: 'Lust',
        koerperliche_sicherheit: 'Körperliche Sicherheit',
        obdach: 'Obdach',

        // SICHERHEIT
        stabilitaet: 'Stabilität',
        sich_sicher_fuehlen: 'Sicherheitsgefühl',
        schutz: 'Schutz',
        bestaendigkeit: 'Beständigkeit',
        leichtigkeit: 'Leichtigkeit',
        geborgenheit: 'Geborgenheit',

        // ZUNEIGUNG
        waerme: 'Wärme',
        wertschaetzung: 'Wertschätzung',
        naehe: 'Nähe',
        gesellschaft: 'Gesellschaft',
        intimitaet: 'Intimität',
        liebe: 'Liebe',
        fuersorge: 'Fürsorge',
        unterstuetzung: 'Unterstützung',
        fuereinander_da_sein: 'Füreinander-Da-Sein',

        // VERSTÄNDNIS
        akzeptanz: 'Akzeptanz',
        empathie: 'Empathie',
        beachtung: 'Beachtung',
        verstanden_werden: 'Verstanden-Werden',
        vertrauen: 'Vertrauen',
        beachtet_werden: 'Beachtet-Werden',
        gesehen_werden: 'Gesehen-Werden',
        mitgefuehl: 'Mitgefühl',
        harmonie: 'Harmonie',

        // FREIHEIT
        selbstbestimmung: 'Selbstbestimmung',
        waehlen_koennen: 'Wählen-Können',
        unabhaengigkeit: 'Unabhängigkeit',
        raum_haben: 'Raum-Haben',
        spontaneitaet: 'Spontaneität',

        // TEILNAHME
        zusammenarbeit: 'Zusammenarbeit',
        kommunikation: 'Kommunikation',
        gemeinschaft: 'Gemeinschaft',
        zugehoerigkeit: 'Zugehörigkeit',
        gegenseitigkeit: 'Gegenseitigkeit',
        respekt: 'Respekt',
        bedeutung_haben: 'Bedeutung-Haben',

        // IDENTITÄT
        authentizitaet: 'Authentizität',
        identitaet: 'Identität',
        kompetenz: 'Kompetenz',
        wirksamkeit: 'Wirksamkeit',
        herausforderung: 'Herausforderung',
        sinn: 'Sinn',
        wachstum: 'Wachstum',
        beitrag_leisten: 'Beitrag-Leisten',
        integritaet: 'Integrität',
        effizienz: 'Effizienz',
        selbst_ausdruck: 'Selbstausdruck',

        // MUSSE
        freude: 'Freude',
        freizeit: 'Freizeit',

        // ERSCHAFFEN
        kreativitaet: 'Kreativität',
        entdecken: 'Entdecken',

        // VERBUNDENHEIT
        leben_feiern: 'Leben-Feiern',
        inspiration: 'Inspiration',

        // DYNAMIK
        kontrolle_ausueben: 'Kontrolle-Ausüben',
        hingabe: 'Hingabe',
        fuehrung_geben: 'Führung-Geben',
        gefuehrt_werden: 'Geführt-Werden',
        ritual: 'Ritual',
        nachsorge: 'Nachsorge',
        grenzen_setzen: 'Grenzen-Setzen',
        grenzen_respektieren: 'Grenzen-Respektieren',
        intensitaet: 'Intensität',
        vertrauen_schenken: 'Vertrauen-Schenken',
        verantwortung_uebernehmen: 'Verantwortung-Übernehmen',
        sich_fallenlassen: 'Sich-Fallenlassen',
        machtaustausch: 'Machtaustausch',
        dienend_sein: 'Dienend-Sein',
        beschuetzen: 'Beschützen'
    };

    /**
     * Speicher für Bedürfniswerte pro Attribut
     */
    const needsValues = {};

    /**
     * Speicher für Lock-Status pro Attribut
     */
    const lockedAttributes = {};

    /**
     * Speicher für Lock-Status pro Bedürfnis (NEU)
     * Format: { 'attrId': { 'needId': true/false } }
     */
    const lockedNeeds = {};

    /**
     * Kategorien die Slider verwenden sollen
     * Alle Kategorien mit Bedürfnis-Mapping aktiviert
     */
    const SLIDER_ENABLED_CATEGORIES = [
        'geschlechtsidentitaet',
        'lebensplanung',
        'finanzen',
        'kommunikation',
        'soziales',
        'intimitaet',
        'werte',
        'praktisches'
    ];

    /**
     * Berechnet den aggregierten Wert für ein Attribut basierend auf seinen Bedürfnissen
     * @param {string} attrId - Attribut-ID
     * @returns {number} Aggregierter Wert (0-100)
     */
    function calculateAggregatedValue(attrId) {
        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping || !needsValues[attrId]) return 50;

        const values = needsValues[attrId];
        const total = mapping.needs.reduce((sum, need) => sum + (values[need] || 50), 0);
        return Math.round(total / mapping.needs.length);
    }

    /**
     * Initialisiert die Bedürfniswerte für ein Attribut
     * @param {string} attrId - Attribut-ID
     * @param {number} defaultValue - Standardwert
     */
    function initializeNeedsValues(attrId, defaultValue = 50) {
        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping) return;

        if (!needsValues[attrId]) {
            needsValues[attrId] = {};
            mapping.needs.forEach(need => {
                needsValues[attrId][need] = defaultValue;
            });
        }
    }

    /**
     * Erstellt HTML für eine Attribute-Summary-Card
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID
     * @param {string} config.label - Anzeige-Label
     * @param {string} [config.hint] - Optionaler Hinweis
     * @param {number} [config.defaultValue=50] - Standard-Wert
     * @param {string} [config.description] - Beschreibung für Tooltip
     * @returns {string} HTML-String
     */
    function render(config) {
        const { attrId, label, hint, defaultValue = 50, description } = config;

        // Initialisiere Werte
        initializeNeedsValues(attrId, defaultValue);

        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping) {
            console.warn(`AttributeSummaryCard: Kein Mapping für ${attrId}`);
            return '';
        }

        // Initialisiere lockedNeeds für dieses Attribut
        if (!lockedNeeds[attrId]) {
            lockedNeeds[attrId] = {};
        }

        const aggregatedValue = calculateAggregatedValue(attrId);
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const infoIconHtml = description
            ? ` <span class="attr-info-icon" onclick="event.stopPropagation(); openAttributeDefinitionModal('${attrId}')" title="Info anzeigen">ℹ</span>`
            : '';

        // Prüfe ob Slider aktiviert sein sollen
        const useSliders = SLIDER_ENABLED_CATEGORIES.includes(mapping.category);

        // Generiere Bedürfnis-Liste für Expansion
        const needsListHtml = mapping.needs.map(need => {
            const needLabel = NEEDS_LABELS[need] || need;
            const needValue = needsValues[attrId][need] || 50;
            const isNeedLocked = lockedNeeds[attrId] && lockedNeeds[attrId][need];

            if (useSliders) {
                // NEU: Slider-Layout mit individuellem Lock
                return `
                <div class="attribute-need-item with-slider${isNeedLocked ? ' need-locked' : ''}" data-need="${need}">
                    <div class="need-item-header">
                        <span class="attribute-need-label">${needLabel}</span>
                        <div class="need-item-controls">
                            <span class="need-lock-icon"
                                  onclick="event.stopPropagation(); AttributeSummaryCard.toggleNeedLock('${attrId}', '${need}', this)"
                                  title="Wert fixieren"></span>
                        </div>
                    </div>
                    <div class="need-slider-row">
                        <input type="range" class="need-slider"
                               min="0" max="100" value="${needValue}"
                               oninput="AttributeSummaryCard.onSliderInput('${attrId}', '${need}', this.value, this)"
                               onclick="event.stopPropagation()">
                        <input type="text" class="attribute-need-input" value="${needValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateNeedValue('${attrId}', '${need}', this.value)"
                               onclick="event.stopPropagation()">
                    </div>
                </div>`;
            } else {
                // Original-Layout ohne Slider
                return `
                <div class="attribute-need-item" data-need="${need}">
                    <span class="attribute-need-label">${needLabel}</span>
                    <div class="attribute-need-input-group">
                        <input type="text" class="attribute-need-input" value="${needValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateNeedValue('${attrId}', '${need}', this.value)"
                               onclick="event.stopPropagation()">
                        <span class="attribute-need-percent"></span>
                    </div>
                </div>`;
            }
        }).join('');

        return `
            <div class="attribute-summary-card" data-attr="${attrId}" onclick="AttributeSummaryCard.toggleExpand(this)">
                <div class="attribute-summary-header">
                    <div class="attribute-summary-label-group">
                        <span class="attribute-summary-label">${label}${hintHtml}${infoIconHtml}</span>
                        <span class="attribute-summary-sublabel">Zwischenergebnis aus ${mapping.needs.length} Bedürfnissen</span>
                    </div>
                    <div class="attribute-summary-input-group">
                        <input type="text" class="attribute-summary-input" value="${aggregatedValue}" maxlength="3"
                               onclick="event.stopPropagation()" readonly>
                        <span class="attribute-summary-percent"></span>
                        <span class="attribute-summary-lock" onclick="event.stopPropagation(); AttributeSummaryCard.toggleLock('${attrId}', this)"></span>
                        <span class="attribute-summary-expand-icon">▼</span>
                    </div>
                </div>
                <div class="attribute-summary-needs-list collapsed">
                    ${needsListHtml}
                </div>
            </div>`;
    }

    /**
     * Erstellt mehrere Attribute-Summary-Cards
     * @param {Array<Object>} configs - Array von Konfigurationen
     * @returns {string} HTML-String
     */
    function renderMany(configs) {
        return configs.map(render).join('\n');
    }

    /**
     * Togglet den Expand-Status einer Card
     * @param {HTMLElement} card - Die Card
     */
    function toggleExpand(card) {
        const needsList = card.querySelector('.attribute-summary-needs-list');
        const expandIcon = card.querySelector('.attribute-summary-expand-icon');

        if (needsList && expandIcon) {
            needsList.classList.toggle('collapsed');
            expandIcon.classList.toggle('expanded');
        }
    }

    /**
     * Togglet den Lock-Status eines Attributs
     * @param {string} attrId - Attribut-ID
     * @param {HTMLElement} lockElement - Das Lock-Element
     */
    function toggleLock(attrId, lockElement) {
        const card = lockElement.closest('.attribute-summary-card');
        if (!card) return;

        lockedAttributes[attrId] = !lockedAttributes[attrId];
        card.classList.toggle('locked', lockedAttributes[attrId]);
    }

    /**
     * Prüft ob ein Attribut durch Kategorie-Lock gesperrt ist
     * @param {string} attrId - Attribut-ID
     * @returns {boolean} Ob das Attribut gesperrt ist
     */
    function isLockedByCategory(attrId) {
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (!card) return false;
        return card.classList.contains('category-parent-locked');
    }

    /**
     * Aktualisiert einen einzelnen Bedürfniswert
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @param {string|number} value - Neuer Wert
     */
    function updateNeedValue(attrId, needId, value) {
        // Prüfe sowohl eigenen Lock als auch Kategorie-Lock
        if (lockedAttributes[attrId] || isLockedByCategory(attrId)) return;

        // Prüfe ob das individuelle Bedürfnis gesperrt ist
        if (lockedNeeds[attrId] && lockedNeeds[attrId][needId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        if (!needsValues[attrId]) {
            initializeNeedsValues(attrId);
        }

        needsValues[attrId][needId] = numValue;

        // Update aggregierter Wert
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }

            // Sync Slider falls vorhanden
            const needItem = card.querySelector(`[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                if (slider && slider.value !== String(numValue)) {
                    slider.value = numValue;
                }
            }
        }

        // Custom Event für Änderungstracking
        const event = new CustomEvent('attributeNeedChange', {
            bubbles: true,
            detail: { attrId, needId, value: numValue }
        });
        document.dispatchEvent(event);
    }

    /**
     * Handler für Slider-Input (live update während Drag)
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @param {string|number} value - Slider-Wert
     * @param {HTMLElement} sliderEl - Slider-Element
     */
    function onSliderInput(attrId, needId, value, sliderEl) {
        if (lockedAttributes[attrId]) return;
        if (lockedNeeds[attrId] && lockedNeeds[attrId][needId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        // Update interner Wert
        if (!needsValues[attrId]) {
            initializeNeedsValues(attrId);
        }
        needsValues[attrId][needId] = numValue;

        // Sync Input-Feld
        const needItem = sliderEl.closest('.attribute-need-item');
        if (needItem) {
            const input = needItem.querySelector('.attribute-need-input');
            if (input) {
                input.value = numValue;
                // Kurze Animation
                input.classList.add('value-changed');
                setTimeout(() => input.classList.remove('value-changed'), 200);
            }
        }

        // Update aggregierter Wert
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }
        }
    }

    /**
     * Togglet den Lock-Status eines einzelnen Bedürfnisses
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @param {HTMLElement} lockElement - Das Lock-Icon Element
     */
    function toggleNeedLock(attrId, needId, lockElement) {
        // Initialisiere falls nötig
        if (!lockedNeeds[attrId]) {
            lockedNeeds[attrId] = {};
        }

        // Toggle Lock-Status
        lockedNeeds[attrId][needId] = !lockedNeeds[attrId][needId];
        const isLocked = lockedNeeds[attrId][needId];

        // Update UI
        const needItem = lockElement.closest('.attribute-need-item');
        if (needItem) {
            needItem.classList.toggle('need-locked', isLocked);

            // Disable/Enable Slider und Input
            const slider = needItem.querySelector('.need-slider');
            const input = needItem.querySelector('.attribute-need-input');

            if (slider) {
                slider.disabled = isLocked;
            }
            if (input) {
                input.readOnly = isLocked;
            }
        }

        // Custom Event
        const event = new CustomEvent('needLockChange', {
            bubbles: true,
            detail: { attrId, needId, locked: isLocked }
        });
        document.dispatchEvent(event);
    }

    /**
     * Prüft ob ein Bedürfnis gesperrt ist
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @returns {boolean}
     */
    function isNeedLocked(attrId, needId) {
        return !!(lockedNeeds[attrId] && lockedNeeds[attrId][needId]);
    }

    /**
     * Gibt alle gesperrten Bedürfnisse zurück
     * @returns {Object}
     */
    function getLockedNeeds() {
        return { ...lockedNeeds };
    }

    /**
     * Holt den aggregierten Wert eines Attributs
     * @param {string} attrId - Attribut-ID
     * @returns {number} Aggregierter Wert
     */
    function getValue(attrId) {
        return calculateAggregatedValue(attrId);
    }

    /**
     * Holt alle Bedürfniswerte eines Attributs
     * @param {string} attrId - Attribut-ID
     * @returns {Object} Bedürfniswerte
     */
    function getNeedsValues(attrId) {
        return needsValues[attrId] || {};
    }

    /**
     * Setzt alle Bedürfniswerte eines Attributs
     * @param {string} attrId - Attribut-ID
     * @param {Object} values - Bedürfniswerte
     */
    function setNeedsValues(attrId, values) {
        // Prüfe sowohl eigenen Lock als auch Kategorie-Lock
        if (lockedAttributes[attrId] || isLockedByCategory(attrId)) return;

        needsValues[attrId] = { ...values };

        // Update UI
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            Object.entries(values).forEach(([needId, value]) => {
                const needInput = card.querySelector(`[data-need="${needId}"] .attribute-need-input`);
                if (needInput) {
                    needInput.value = value;
                }
            });

            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }
        }
    }

    /**
     * Setzt ein Attribut zurück auf Standardwert
     * @param {string} attrId - Attribut-ID
     * @param {number} defaultValue - Standardwert
     */
    function reset(attrId, defaultValue = 50) {
        lockedAttributes[attrId] = false;
        initializeNeedsValues(attrId, defaultValue);

        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (mapping) {
            mapping.needs.forEach(need => {
                needsValues[attrId][need] = defaultValue;
            });
        }

        // Update UI
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            card.classList.remove('locked');

            const needInputs = card.querySelectorAll('.attribute-need-input');
            needInputs.forEach(input => {
                input.value = defaultValue;
            });

            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = defaultValue;
            }
        }
    }

    /**
     * Holt alle Werte aller Attribute
     * @returns {Object} Alle Attributwerte
     */
    function getAllValues() {
        const result = {};
        Object.keys(ATTRIBUTE_NEEDS_MAPPING).forEach(attrId => {
            result[attrId] = {
                aggregated: calculateAggregatedValue(attrId),
                needs: getNeedsValues(attrId),
                locked: lockedAttributes[attrId] || false
            };
        });
        return result;
    }

    return {
        render,
        renderMany,
        toggleExpand,
        toggleLock,
        toggleNeedLock,
        onSliderInput,
        updateNeedValue,
        getValue,
        getNeedsValues,
        setNeedsValues,
        reset,
        getAllValues,
        isNeedLocked,
        getLockedNeeds,
        ATTRIBUTE_NEEDS_MAPPING,
        NEEDS_LABELS,
        SLIDER_ENABLED_CATEGORIES
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}
