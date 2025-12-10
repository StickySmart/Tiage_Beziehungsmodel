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
     * Rendert den Kategorie-Badge
     */
    renderKategorieBadge: function(kategorie, kategorieColor, kategorieId) {
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
                    margin-left: auto;
                ">${kategorieId || ''}</span>
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
     * Rendert die Perspektiven-Karten (GFK + Paarung Style, aber mit Perspektive)
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

            <!-- GFK-Hinweis -->
            <div style="
                padding: 12px;
                background: rgba(139,92,246,0.08);
                border-radius: 8px;
                border: 1px solid rgba(139,92,246,0.2);
                margin-bottom: 12px;
            ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 14px;">💬</span>
                    <strong style="font-size: 12px; color: #8B5CF6;">Gewaltfreie Kommunikation</strong>
                </div>
                <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                    Das Bedürfnis nach <strong>${needDef.label}</strong> ist universell und frei von Bewertung –
                    es beschreibt, was du zum Leben brauchst.
                </p>
            </div>

            <!-- Paarung-Bezug -->
            <div style="
                padding: 12px;
                background: rgba(232,67,147,0.08);
                border-radius: 8px;
                border: 1px solid rgba(232,67,147,0.2);
            ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 14px;">💑</span>
                    <strong style="font-size: 12px; color: #E84393;">Paarung</strong>
                </div>
                <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                    Wenn beide Partner ihr Bedürfnis nach <strong>${needDef.label}</strong> kennen und
                    kommunizieren, entsteht Raum für echte Verbindung.
                </p>
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

        return `
            <div class="perspektiven-modal-content" style="display: flex; flex-direction: column; gap: 0;">
                ${this.renderPerspektiveHeader(perspektive)}
                ${this.renderKategorieBadge(kategorie, kategorieColor, kategorieId)}
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
