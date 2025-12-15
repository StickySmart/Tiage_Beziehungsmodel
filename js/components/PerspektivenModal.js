/**
 * PERSPEKTIVEN MODAL - Modulare Komponente
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Zeigt Bedürfnisse mit ihrer Perspektive, Kategorie und IDs an.
 *
 * Die 4 Perspektiven sind verschiedene "Brillen" auf Beziehungen:
 * - #P1 Statistik (GFK) - Empirische Bedürfnisforschung
 * - #P2 Osho - Tantra, Freiheit, Nicht-Anhaften
 * - #P3 Pirsig - Qualität als Lebensphilosophie
 * - #P4 SexPositiv - Consent, Kink, bewusste Dynamik
 */

const PerspektivenModal = {

    // ═══════════════════════════════════════════════════════════════════════════
    // PERSPEKTIVEN KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    perspektiven: {
        '#P1': {
            id: '#P1',
            key: 'statistik',
            label: 'Statistik',
            shortLabel: 'GFK',
            icon: '📊',
            color: '#3B82F6',
            gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            motto: 'Was alle Menschen brauchen',
            beschreibung: 'Universelle Bedürfnisse nach Marshall Rosenberg – wissenschaftlich fundiert, frei von Bewertung.',
            quelle: 'Marshall B. Rosenberg: Gewaltfreie Kommunikation (2001)',
            vibe: 'Klar. Universell. Verbindend.'
        },
        '#P2': {
            id: '#P2',
            key: 'osho',
            label: 'Osho',
            shortLabel: 'Tantra',
            icon: '🕉️',
            color: '#F59E0B',
            gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            motto: 'Liebe ohne Anhaften',
            beschreibung: 'Tantrische Weisheit – Freiheit IN der Beziehung, Präsenz statt Besitz, Wildheit und Zärtlichkeit.',
            quelle: 'Osho Rajneesh: Vorträge über Liebe, Sex und Meditation',
            vibe: 'Frei. Präsent. Intensiv.'
        },
        '#P3': {
            id: '#P3',
            key: 'pirsig',
            label: 'Pirsig',
            shortLabel: 'Quality',
            icon: '🔧',
            color: '#10B981',
            gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            motto: 'Qualität ist alles',
            beschreibung: 'Zen und Motorrad-Wartung – achtsame Pflege der Beziehung, Handwerk der Liebe.',
            quelle: 'Robert M. Pirsig: Zen und die Kunst ein Motorrad zu warten (1974)',
            vibe: 'Achtsam. Sorgfältig. Meisterhaft.'
        },
        '#P4': {
            id: '#P4',
            key: 'sexpositiv',
            label: 'SexPositiv',
            shortLabel: 'Kink',
            icon: '💜',
            color: '#8B5CF6',
            gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            motto: 'Bewusster Austausch',
            beschreibung: 'BDSM/Kink als Kunst – Consent, Kommunikation, Machtaustausch als Vertrauensbeweis.',
            quelle: 'Easton & Hardy: The Ethical Slut, Wiseman: SM 101',
            vibe: 'Bewusst. Mutig. Vertrauend.'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MAPPING: Welche Kategorien gehören zu welcher Perspektive?
    // ═══════════════════════════════════════════════════════════════════════════

    kategoriePerspektiven: {
        // #P1 - Statistik/GFK (Kern-Bedürfnisse)
        'existenz': '#P1',
        'sicherheit': '#P1',
        'zuneigung': '#P1',
        'verstaendnis': '#P1',
        'freiheit': '#P1',
        'teilnahme': '#P1',
        'musse': '#P1',
        'identitaet': '#P1',
        'erschaffen': '#P1',
        'verbundenheit': '#P1',

        // #P4 - SexPositiv (Dynamik/BDSM)
        'dynamik': '#P4',
        'dynamik_austausch': '#P4',  // Alternative: "Dynamik & Austausch" → "dynamik_austausch"

        // Lebensbereiche können mehreren Perspektiven zugeordnet werden
        // Standard ist #P1, spezifische Bedürfnisse haben eigene Zuordnung
        'lebensplanung': '#P1',
        'finanzen_karriere': '#P1',
        'kommunikation_stil': '#P1',
        'soziales_leben': '#P1',
        'intimitaet_beziehung': '#P1',
        'werte_haltung': '#P1',
        'praktisches_leben': '#P1'
    },

    // Spezifische Bedürfnis-Perspektiven (überschreibt Kategorie-Default)
    beduerfnisPerspektiven: {
        // Osho-Bedürfnisse (#P2)
        'sex_als_meditation': '#P2',
        'liebe_ohne_beziehung': '#P2',
        'nicht_anhaften_an_partner': '#P2',
        'hier_und_jetzt_intimitaet': '#P2',
        'polyamore_energie': '#P2',
        'wildheit_und_zartheit': '#P2',
        'meditation_zu_zweit': '#P2',
        'schweigen_statt_worte': '#P2',
        'radikale_ehrlichkeit': '#P2',
        'humorvolle_leichtigkeit': '#P2',
        'paradoxe_weisheit': '#P2',
        'herz_statt_kopf': '#P2',
        'authentischer_ausdruck': '#P2',
        'familien_rebellion': '#P2',
        'zorba_das_kind': '#P2',
        'nicht_anhaften_an_familie': '#P2',
        'bewusste_elternschaft': '#P2',
        'commune_statt_kernfamilie': '#P2',
        'arbeit_als_meditation': '#P2',
        'nicht_karriere': '#P2',
        'zorba_der_unternehmer': '#P2',
        'nicht_anhaften_an_geld': '#P2',
        'kreative_selbstverwirklichung': '#P2',
        'sannyas_gemeinschaft': '#P2',
        'rebellion_gegen_gesellschaft': '#P2',
        'einsamkeit_in_menge': '#P2',
        'celebration_mit_anderen': '#P2',
        'keine_freundschaft_besitz': '#P2',
        'tantra_gruppe': '#P2',
        'religionslosigkeit': '#P2',
        'eigene_wahrheit': '#P2',
        'zen_paradox': '#P2',
        'tantra_als_weg': '#P2',
        'politische_rebellion': '#P2',
        'individueller_anarchismus': '#P2',
        'leben_als_kunst': '#P2',
        'celebration_statt_gebet': '#P2',
        'meditation_im_alltag': '#P2',
        'dynamische_meditation': '#P2',
        'vipassana_im_leben': '#P2',
        'natuerliches_leben': '#P2',
        'lachen_therapie': '#P2',
        'no_mind': '#P2',
        'zorba_der_geniesser': '#P2',
        'orgastisches_leben': '#P2',
        'gesundheit_durch_bewusstsein': '#P2',

        // Pirsig-Bedürfnisse (#P3)
        'biologische_anziehung': '#P3',
        'intellektuelle_verbindung': '#P3',
        'qualitaet_der_beruehrung': '#P3',
        'dynamische_liebe': '#P3',
        'care_in_intimitaet': '#P3',
        'biologisches_muster': '#P3',
        'soziales_muster': '#P3',
        'statische_stabilitaet': '#P3',
        'qualitaet_der_fuersorge': '#P3',
        'gumption': '#P3',
        'qualitaet_der_arbeit': '#P3',
        'intellektuelles_muster': '#P3',
        'dynamische_evolution': '#P3',
        'klassisches_verstehen': '#P3',
        'romantisches_verstehen': '#P3',
        'klassische_klarheit': '#P3',
        'dialektik': '#P3',
        'qualitaets_ausdruck': '#P3',
        'care_im_gespraech': '#P3',
        'soziale_qualitaet': '#P3',
        'tribe_muster': '#P3',
        'intellektuelle_gemeinschaft': '#P3',
        'statische_sozialstrukturen': '#P3',
        'qualitaet_als_gott': '#P3',
        'rationaler_mystizismus': '#P3',
        'aristotelische_vernunft': '#P3',
        'platonische_ideen': '#P3',
        'buddhistische_achtsamkeit': '#P3',
        'motorrad_pflege': '#P3',
        'gumption_im_alltag': '#P3',
        'stuck_vermeiden': '#P3',
        'klassische_ordnung': '#P3',
        'romantisches_chaos': '#P3',
        'qualitaets_werkzeug': '#P3',
        'achtsamkeit_im_detail': '#P3',

        // SexPositiv/Dynamik-Bedürfnisse (#P4)
        'kontrolle_ausueben': '#P4',
        'hingabe': '#P4',
        'fuehrung_geben': '#P4',
        'gefuehrt_werden': '#P4',
        'ritual': '#P4',
        'nachsorge': '#P4',
        'grenzen_setzen': '#P4',
        'grenzen_respektieren': '#P4',
        'intensitaet': '#P4',
        'vertrauen_schenken': '#P4',
        'verantwortung_uebernehmen': '#P4',
        'sich_fallenlassen': '#P4',
        'machtaustausch': '#P4',
        'dienend_sein': '#P4',
        'beschuetzen': '#P4'
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Gibt die Perspektive für ein Bedürfnis zurück
     */
    getPerspektiveForNeed: function(needKey, kategorieKey) {
        // Erst spezifisches Bedürfnis-Mapping prüfen
        if (this.beduerfnisPerspektiven[needKey]) {
            return this.perspektiven[this.beduerfnisPerspektiven[needKey]];
        }
        // Dann Kategorie-Default
        if (kategorieKey && this.kategoriePerspektiven[kategorieKey]) {
            return this.perspektiven[this.kategoriePerspektiven[kategorieKey]];
        }
        // Fallback: Statistik
        return this.perspektiven['#P1'];
    },

    /**
     * Gibt alle Perspektiven als Array zurück
     */
    getAllePerspektiven: function() {
        return Object.values(this.perspektiven);
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert den Perspektiven-Header für das Modal
     */
    renderPerspektiveHeader: function(perspektive) {
        return `
            <div class="perspektive-header" style="
                background: ${perspektive.gradient};
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 16px;
                color: white;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <span style="font-size: 28px;">${perspektive.icon}</span>
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="
                                background: rgba(255,255,255,0.2);
                                padding: 2px 8px;
                                border-radius: 4px;
                                font-size: 11px;
                                font-family: monospace;
                            ">${perspektive.id}</span>
                            <span style="font-size: 18px; font-weight: 600;">${perspektive.label}</span>
                        </div>
                        <div style="font-size: 13px; opacity: 0.9; font-style: italic;">
                            „${perspektive.motto}"
                        </div>
                    </div>
                </div>
                <div style="font-size: 12px; opacity: 0.85; line-height: 1.5;">
                    ${perspektive.beschreibung}
                </div>
                <div style="
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    font-size: 11px;
                    opacity: 0.7;
                ">
                    ${perspektive.vibe}
                </div>
            </div>
        `;
    },

    /**
     * Rendert den Kategorie-Badge mit optionaler Dimension-Info
     * @param {string} kategorie - Kategorie-Label
     * @param {string} kategorieColor - Kategorie-Farbe
     * @param {string} kategorieId - Kategorie-ID (z.B. '#K6')
     * @param {object|null} dimensionInfo - Optional: {id, label, color, kurzform}
     */
    renderKategorieBadge: function(kategorie, kategorieColor, kategorieId, dimensionInfo) {
        // Dimension-Badge rendern wenn vorhanden (mit ID, Kurzform und Label)
        const dimensionBadge = dimensionInfo ? `
            <div style="
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 4px 10px;
                background: ${dimensionInfo.color}15;
                border: 1px solid ${dimensionInfo.color}40;
                border-radius: 12px;
                margin-left: auto;
            ">
                <span style="
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: ${dimensionInfo.color};
                "></span>
                <span style="
                    font-size: 10px;
                    color: var(--text-muted);
                    font-family: monospace;
                ">${dimensionInfo.id}</span>
                <span style="
                    font-size: 11px;
                    color: ${dimensionInfo.color};
                    font-weight: 600;
                ">${dimensionInfo.kurzform}</span>
                <span style="
                    font-size: 11px;
                    color: var(--text-secondary);
                ">${dimensionInfo.label}</span>
            </div>
        ` : '';

        return `
            <div class="kategorie-badge" style="
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 14px;
                background: rgba(255,255,255,0.03);
                border-radius: 8px;
                border-left: 3px solid ${kategorieColor};
                margin-bottom: 16px;
                flex-wrap: wrap;
            ">
                <span style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: ${kategorieColor};
                "></span>
                <span style="
                    font-size: 13px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                ">${kategorie}</span>
                <span style="
                    font-size: 10px;
                    color: var(--text-muted);
                    font-family: monospace;
                ">${kategorieId || ''}</span>
                ${dimensionBadge}
            </div>
        `;
    },

    /**
     * Rendert die Bedürfnis-Definition mit ID
     */
    renderDefinition: function(needDef, kategorieColor) {
        const needId = needDef['#ID'] || needDef.id || '';
        return `
            <div class="definition-box" style="
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                padding: 16px;
                border-left: 3px solid ${kategorieColor};
                margin-bottom: 16px;
            ">
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                ">
                    <span style="
                        font-size: 11px;
                        color: var(--text-muted);
                        font-family: monospace;
                        background: rgba(255,255,255,0.05);
                        padding: 2px 8px;
                        border-radius: 4px;
                    ">${needId}</span>
                </div>
                <p style="
                    font-size: 14px;
                    line-height: 1.7;
                    color: var(--text-primary);
                    margin: 0;
                ">${needDef.definition || 'Keine Definition verfügbar.'}</p>
            </div>
        `;
    },

    /**
     * Rendert die Perspektiven-Karten (nur relevante Inhalte, keine generischen Phrasen)
     */
    renderPerspektiveCards: function(needDef, perspektive) {
        return `
            <!-- Perspektive-Kontext -->
            <div style="
                padding: 12px;
                background: ${perspektive.color}15;
                border-radius: 8px;
                border: 1px solid ${perspektive.color}30;
                margin-bottom: 12px;
            ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 14px;">${perspektive.icon}</span>
                    <strong style="font-size: 12px; color: ${perspektive.color};">
                        ${perspektive.label}-Perspektive
                    </strong>
                    <span style="
                        font-size: 9px;
                        color: var(--text-muted);
                        font-family: monospace;
                    ">${perspektive.id}</span>
                </div>
                <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                    ${this.getPerspektiveText(needDef, perspektive)}
                </p>
            </div>

            <!-- Kompakte Fußnote statt generischer Sektionen -->
            <div style="
                display: flex;
                gap: 12px;
                font-size: 10px;
                color: var(--text-muted);
                opacity: 0.7;
                padding-top: 8px;
                border-top: 1px solid rgba(255,255,255,0.05);
            ">
                <span>💬 GFK-Bedürfnis</span>
                <span>💑 Paarungsrelevant</span>
            </div>
        `;
    },

    /**
     * Generiert perspektive-spezifischen Text
     */
    getPerspektiveText: function(needDef, perspektive) {
        const label = needDef.label;

        switch(perspektive.key) {
            case 'statistik':
                return `Aus der GFK-Forschung: <strong>${label}</strong> gehört zu den universellen menschlichen Grundbedürfnissen, die kulturübergreifend nachweisbar sind.`;
            case 'osho':
                return `Im Tantra-Verständnis: <strong>${label}</strong> wird nicht als Mangel gesehen, sondern als Energie, die frei fließen darf – ohne Anhaften, ohne Erwartung.`;
            case 'pirsig':
                return `In der Qualitäts-Philosophie: <strong>${label}</strong> erfordert achtsame Pflege, wie ein Handwerker sein Werkzeug pflegt. Gute Beziehungen entstehen durch Sorgfalt.`;
            case 'sexpositiv':
                return `Im sex-positiven Kontext: <strong>${label}</strong> wird durch bewusste Kommunikation, klare Grenzen und enthusiastischen Consent gelebt.`;
            default:
                return `Das Bedürfnis nach <strong>${label}</strong> ist ein wichtiger Teil menschlicher Beziehungen.`;
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPT-RENDER FUNKTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert das komplette erweiterte Modal für ein Bedürfnis
     * @param {object} needDef - Die Bedürfnis-Definition
     * @param {string} kategorieKey - Der Kategorie-Schlüssel (z.B. 'zuneigung')
     * @returns {string} HTML-String
     */
    renderNeedModal: function(needDef, kategorieKey) {
        const perspektive = this.getPerspektiveForNeed(
            needDef.key || '',
            kategorieKey || needDef.kategorie?.toLowerCase()
        );

        const kategorie = needDef.kategorie || 'Unbekannt';
        const kategorieColor = needDef.kategorieColor || '#888';
        const kategorieId = this.getKategorieId(kategorieKey);
        // Dimension-Info ermitteln
        const dimensionInfo = this.getDimensionInfo(kategorieId);

        return `
            <div class="perspektiven-modal-content" style="display: flex; flex-direction: column; gap: 0;">
                ${this.renderPerspektiveHeader(perspektive)}
                ${this.renderKategorieBadge(kategorie, kategorieColor, kategorieId, dimensionInfo)}
                ${this.renderDefinition(needDef, kategorieColor)}
                ${this.renderPerspektiveCards(needDef, perspektive)}
            </div>
        `;
    },

    /**
     * Hilfsfunktion: Kategorie-ID aus Key ermitteln
     */
    getKategorieId: function(kategorieKey) {
        const mapping = {
            'existenz': '#K1',
            'sicherheit': '#K2',
            'zuneigung': '#K3',
            'verstaendnis': '#K4',
            'freiheit': '#K5',
            'teilnahme': '#K6',
            'musse': '#K7',
            'identitaet': '#K8',
            'erschaffen': '#K9',
            'verbundenheit': '#K10',
            'dynamik': '#K11',
            'lebensplanung': '#K12',
            'finanzen_karriere': '#K13',
            'kommunikation_stil': '#K14',
            'soziales_leben': '#K15',
            'intimitaet_beziehung': '#K16',
            'werte_haltung': '#K17',
            'praktisches_leben': '#K18'
        };
        return mapping[kategorieKey] || '';
    },

    /**
     * Hilfsfunktion: Dimension-Info für eine Kategorie-ID ermitteln
     * @param {string} kategorieId - z.B. '#K3'
     * @returns {object|null} {id, label, color, kurzform} oder null
     */
    getDimensionInfo: function(kategorieId) {
        if (typeof TiageTaxonomie === 'undefined' || !TiageTaxonomie.kategorien) {
            return null;
        }
        const kategorie = TiageTaxonomie.kategorien[kategorieId];
        if (!kategorie || !kategorie.dimension) {
            return null;
        }
        const dimension = TiageTaxonomie.dimensionen?.[kategorie.dimension];
        if (!dimension) {
            return null;
        }
        return {
            id: dimension.id,
            label: dimension.label,
            color: dimension.color,
            kurzform: dimension.kurzform
        };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CLUSTER-ÜBERSICHT NACH PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert eine Übersicht aller Bedürfnisse gruppiert nach Perspektiven
     */
    renderClusterByPerspektiven: function(beduerfnisse) {
        const grouped = {
            '#P1': [],
            '#P2': [],
            '#P3': [],
            '#P4': []
        };

        // Bedürfnisse gruppieren
        for (const key in beduerfnisse) {
            const need = beduerfnisse[key];
            const perspektiveId = this.beduerfnisPerspektiven[key] ||
                                  this.kategoriePerspektiven[need.kategorie] ||
                                  '#P1';
            grouped[perspektiveId].push({
                key: key,
                ...need
            });
        }

        let html = '<div class="cluster-perspektiven" style="display: flex; flex-direction: column; gap: 20px;">';

        for (const pId in this.perspektiven) {
            const p = this.perspektiven[pId];
            const needs = grouped[pId] || [];

            html += `
                <div class="perspektive-cluster" style="
                    background: ${p.color}08;
                    border: 1px solid ${p.color}20;
                    border-radius: 12px;
                    overflow: hidden;
                ">
                    <div style="
                        background: ${p.gradient};
                        padding: 14px 16px;
                        color: white;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    ">
                        <span style="font-size: 24px;">${p.icon}</span>
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="
                                    background: rgba(255,255,255,0.2);
                                    padding: 2px 6px;
                                    border-radius: 3px;
                                    font-size: 10px;
                                    font-family: monospace;
                                ">${p.id}</span>
                                <span style="font-weight: 600;">${p.label}</span>
                            </div>
                            <div style="font-size: 11px; opacity: 0.85;">${p.motto}</div>
                        </div>
                        <span style="
                            margin-left: auto;
                            background: rgba(255,255,255,0.2);
                            padding: 4px 10px;
                            border-radius: 12px;
                            font-size: 12px;
                        ">${needs.length} Bedürfnisse</span>
                    </div>
                    <div style="padding: 12px; display: flex; flex-wrap: wrap; gap: 6px;">
                        ${needs.slice(0, 20).map(n => `
                            <span style="
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                background: ${p.color}15;
                                color: var(--text-primary);
                                padding: 4px 10px;
                                border-radius: 6px;
                                font-size: 11px;
                                cursor: pointer;
                                transition: all 0.2s;
                            " onclick="PerspektivenModal.showNeedDetail('${n.key}')"
                               onmouseover="this.style.background='${p.color}30'"
                               onmouseout="this.style.background='${p.color}15'">
                                <span style="font-family: monospace; font-size: 9px; opacity: 0.6;">${n['#ID'] || ''}</span>
                                ${n.label}
                            </span>
                        `).join('')}
                        ${needs.length > 20 ? `
                            <span style="
                                color: var(--text-muted);
                                font-size: 11px;
                                padding: 4px 8px;
                            ">+${needs.length - 20} weitere</span>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        html += '</div>';
        return html;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // RESONANZ-MODAL (Storytelling-Ansatz)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Mapping: Welches Bedürfnis gehört zu welcher Resonanz-Dimension?
     */
    needToDimension: {
        // IDENTITÄT (💚) - Geschlecht/Identitäts-relevante Bedürfnisse
        'authentizitaet': 'identitaet',
        'selbst_ausdruck': 'identitaet',
        'echtheit': 'identitaet',
        'integritaet': 'identitaet',
        'akzeptanz': 'identitaet',
        'gesehen_werden': 'identitaet',
        'verstanden_werden': 'identitaet',
        'eigene_wahrheit': 'identitaet',
        'authentischer_ausdruck': 'identitaet',
        'radikale_ehrlichkeit': 'identitaet',

        // PHILOSOPHIE (🧠) - Archetyp/Beziehungsphilosophie
        'kinderwunsch': 'philosophie',
        'langfristige_bindung': 'philosophie',
        'verbindlichkeit': 'philosophie',
        'gemeinsamer_wohnraum': 'philosophie',
        'eigener_raum': 'philosophie',
        'alltag_teilen': 'philosophie',
        'treueversprechen': 'philosophie',
        'unabhaengigkeit': 'philosophie',
        'selbstbestimmung': 'philosophie',
        'zugehoerigkeit': 'philosophie',
        'gemeinschaft': 'philosophie',
        'statische_stabilitaet': 'philosophie',
        'dynamische_evolution': 'philosophie',
        'nicht_anhaften_an_partner': 'philosophie',
        'nicht_anhaften_an_familie': 'philosophie',
        'liebe_ohne_beziehung': 'philosophie',
        'commune_statt_kernfamilie': 'philosophie',
        'polyamore_energie': 'philosophie',

        // LEBEN (🔥) - Orientierung/Anziehung
        'sexuelle_haeufigkeit': 'leben',
        'sexuelle_experimentierfreude': 'leben',
        'sexuelle_verbindung': 'leben',
        'sexueller_ausdruck': 'leben',
        'koerpernaehe': 'leben',
        'koerperkontakt': 'leben',
        'intimitaet': 'leben',
        'romantische_gesten': 'leben',
        'koerperliche_lust': 'leben',
        'biologische_anziehung': 'leben',
        'qualitaet_der_beruehrung': 'leben',
        'dynamische_liebe': 'leben',
        'sex_als_meditation': 'leben',
        'hier_und_jetzt_intimitaet': 'leben',
        'wildheit_und_zartheit': 'leben',
        'orgastisches_leben': 'leben',
        'meditation_zu_zweit': 'leben',

        // DYNAMIK (⚡) - Dominanz/Machtdynamik
        'kontrolle_ausueben': 'dynamik',
        'hingabe': 'dynamik',
        'fuehrung_geben': 'dynamik',
        'gefuehrt_werden': 'dynamik',
        'machtaustausch': 'dynamik',
        'sich_fallenlassen': 'dynamik',
        'verantwortung_uebernehmen': 'dynamik',
        'dienend_sein': 'dynamik',
        'beschuetzen': 'dynamik',
        'nachsorge': 'dynamik',
        'grenzen_setzen': 'dynamik',
        'grenzen_respektieren': 'dynamik',
        'intensitaet': 'dynamik',
        'vertrauen_schenken': 'dynamik',
        'ritual': 'dynamik'
    },

    /**
     * Dimension-Konfiguration für die Anzeige
     */
    dimensionConfig: {
        identitaet: {
            name: 'Identität',
            emoji: '💚',
            color: '#22c55e',
            question: 'Wer bin ich, wer bist du?',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        philosophie: {
            name: 'Philosophie',
            emoji: '🧠',
            color: '#6366f1',
            question: 'Wie wollen wir Beziehung leben?',
            gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
        },
        leben: {
            name: 'Leben',
            emoji: '🔥',
            color: '#f97316',
            question: 'Was zieht uns an?',
            gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
        },
        dynamik: {
            name: 'Dynamik',
            emoji: '⚡',
            color: '#eab308',
            question: 'Wer führt, wer folgt?',
            gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)'
        }
    },

    /**
     * Ermittelt die Resonanz-Dimension für ein Bedürfnis
     */
    getDimensionForNeed: function(needKey) {
        return this.needToDimension[needKey] || null;
    },

    /**
     * Berechnet den Resonanz-Status basierend auf der Differenz
     */
    getResonanceStatus: function(wert1, wert2) {
        const diff = Math.abs(wert1 - wert2);
        const match = (100 - diff) / 100;
        const rValue = 0.9 + (match * 0.2);

        let status, statusEmoji, statusText;
        if (rValue >= 1.05) {
            status = 'resonanz';
            statusEmoji = '⬆️';
            statusText = 'Resonanz';
        } else if (rValue <= 0.97) {
            status = 'dissonanz';
            statusEmoji = '⬇️';
            statusText = 'Dissonanz';
        } else {
            status = 'neutral';
            statusEmoji = '➡️';
            statusText = 'Neutral';
        }

        return {
            diff,
            match: Math.round(match * 100),
            rValue: rValue.toFixed(2),
            status,
            statusEmoji,
            statusText
        };
    },

    /**
     * Generiert einen Storytelling-Text für die Resonanz
     */
    getResonanceStory: function(needDef, wert1, wert2, dimension, resonance) {
        const label = needDef.label;
        const dimConfig = this.dimensionConfig[dimension];

        // Differenz-basierte Aussagen
        if (resonance.status === 'resonanz') {
            const stories = [
                `Bei <strong>${label}</strong> schwingen eure Wellen harmonisch. Beide schätzen dieses Bedürfnis ähnlich stark.`,
                `Eure Herzen sind im Einklang bei <strong>${label}</strong>. Diese Übereinstimmung stärkt eure Verbindung.`,
                `<strong>${label}</strong> verbindet euch – hier braucht ihr nicht viele Worte, ihr versteht euch intuitiv.`
            ];
            return stories[Math.floor(Math.random() * stories.length)];
        } else if (resonance.status === 'dissonanz') {
            const stories = [
                `Bei <strong>${label}</strong> gibt es unterschiedliche Wellenlängen. Das ist kein Problem – es braucht bewusste Kommunikation.`,
                `Eure Bedürfnisse nach <strong>${label}</strong> unterscheiden sich. Hier liegt Raum für gegenseitiges Lernen.`,
                `<strong>${label}</strong> zeigt verschiedene Prioritäten. Osho würde sagen: "Unterschiede sind Chancen für Wachstum."`
            ];
            return stories[Math.floor(Math.random() * stories.length)];
        } else {
            const stories = [
                `Bei <strong>${label}</strong> seid ihr in einer guten Balance – nicht identisch, aber nah genug für Verständnis.`,
                `<strong>${label}</strong> zeigt eine solide Basis. Kleine Unterschiede machen Beziehungen interessant.`,
                `Eure Werte bei <strong>${label}</strong> sind ausgewogen. Hier herrscht Stabilität mit Raum für Individualität.`
            ];
            return stories[Math.floor(Math.random() * stories.length)];
        }
    },

    /**
     * Rendert das Resonanz-Modal (Storytelling-Ansatz)
     * @param {object} needDef - Die Bedürfnis-Definition
     * @param {string} kategorieKey - Der Kategorie-Schlüssel
     * @param {object} resonanceData - Optionale Resonanz-Daten {wert1, wert2, ichName, partnerName}
     * @returns {string} HTML-String
     */
    renderResonanceModal: function(needDef, kategorieKey, resonanceData) {
        const needKey = needDef.key || '';
        const dimension = this.getDimensionForNeed(needKey);
        const dimConfig = dimension ? this.dimensionConfig[dimension] : null;

        // Wenn keine Dimension gefunden oder keine Resonanz-Daten, Fallback auf Standard-Modal
        if (!dimConfig || !resonanceData || resonanceData.wert1 === undefined) {
            return this.renderNeedModal(needDef, kategorieKey);
        }

        const { wert1, wert2, ichName, partnerName } = resonanceData;
        const resonance = this.getResonanceStatus(wert1, wert2);
        const story = this.getResonanceStory(needDef, wert1, wert2, dimension, resonance);

        // Status-Farbe
        let statusColor = dimConfig.color;
        if (resonance.status === 'resonanz') statusColor = '#22c55e';
        else if (resonance.status === 'dissonanz') statusColor = '#ef4444';
        else statusColor = '#eab308';

        return `
            <div class="resonance-modal-content" style="display: flex; flex-direction: column; gap: 0;">

                <!-- Dimension Header -->
                <div class="dimension-header" style="
                    background: ${dimConfig.gradient};
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 16px;
                    color: white;
                ">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <span style="font-size: 32px;">${dimConfig.emoji}</span>
                        <div>
                            <div style="font-size: 18px; font-weight: 600;">${dimConfig.name}-Resonanz</div>
                            <div style="font-size: 12px; opacity: 0.9; font-style: italic;">
                                „${dimConfig.question}"
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Storytelling-Box -->
                <div class="resonance-story" style="
                    background: rgba(255,255,255,0.05);
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 16px;
                    border-left: 4px solid ${statusColor};
                ">
                    <p style="
                        font-size: 14px;
                        line-height: 1.7;
                        color: var(--text-primary);
                        margin: 0;
                        font-style: italic;
                    ">${story}</p>
                </div>

                <!-- Resonanz-Welle Animation -->
                <div style="
                    text-align: center;
                    padding: 12px;
                    background: ${statusColor}15;
                    border-radius: 8px;
                    border: 1px solid ${statusColor}30;
                    margin-bottom: 16px;
                ">
                    <div style="font-size: 20px; margin-bottom: 4px;">
                        ~~~〉〉〉 ${resonance.statusEmoji} 〈〈〈~~~
                    </div>
                    <div style="display: flex; justify-content: center; gap: 16px; align-items: center;">
                        <span style="font-size: 11px; color: var(--text-muted);">Match: <strong style="color: ${statusColor};">${resonance.match}%</strong></span>
                        <span style="font-size: 11px; color: var(--text-muted);">R = <strong style="color: ${statusColor};">${resonance.rValue}</strong></span>
                        <span style="font-size: 12px; font-weight: 600; color: ${statusColor};">${resonance.statusText}</span>
                    </div>
                </div>

                <!-- Auswirkung auf Dimension -->
                <div class="resonance-impact" style="
                    padding: 12px;
                    background: ${dimConfig.color}15;
                    border-radius: 8px;
                    border: 1px solid ${dimConfig.color}30;
                    margin-bottom: 12px;
                ">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span style="font-size: 14px;">${dimConfig.emoji}</span>
                        <strong style="font-size: 11px; color: ${dimConfig.color};">Einfluss auf ${dimConfig.name}</strong>
                    </div>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                        ${resonance.status === 'resonanz'
                            ? `Dieses Bedürfnis verstärkt eure Qualität im Bereich <strong>${dimConfig.name}</strong> – es fließt mehr Energie in eure Verbindung.`
                            : resonance.status === 'dissonanz'
                            ? `Hier liegt ein Wachstumsfeld für eure <strong>${dimConfig.name}</strong>-Dimension. Bewusste Kommunikation kann Brücken bauen.`
                            : `Dieses Bedürfnis stabilisiert eure <strong>${dimConfig.name}</strong>-Dimension mit ausgewogener Energie.`
                        }
                    </p>
                </div>

                <!-- Bedürfnis-Definition (kompakt) -->
                <div class="need-definition-compact" style="
                    padding: 12px;
                    background: rgba(139,92,246,0.08);
                    border-radius: 8px;
                    border: 1px solid rgba(139,92,246,0.2);
                ">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span style="font-size: 14px;">💬</span>
                        <strong style="font-size: 11px; color: #8B5CF6;">Was ist ${needDef.label}?</strong>
                    </div>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                        ${needDef.definition || 'Ein universelles menschliches Bedürfnis.'}
                    </p>
                </div>
            </div>
        `;
    },

    /**
     * Zeigt Detail für ein Bedürfnis (Callback)
     */
    showNeedDetail: function(needKey) {
        // Diese Funktion kann überschrieben werden
        console.log('[PerspektivenModal] Show need:', needKey);
        if (typeof window.openNeedDefinitionModal === 'function') {
            window.openNeedDefinitionModal(needKey);
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerspektivenModal;
}
if (typeof window !== 'undefined') {
    window.PerspektivenModal = PerspektivenModal;
}
