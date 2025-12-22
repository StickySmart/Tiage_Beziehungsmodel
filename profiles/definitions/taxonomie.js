/**
 * TIAGE TAXONOMIE - SINGLE SOURCE OF TRUTH
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Version: 1.0.0
 * Erstellt: 2025-12-09
 *
 * Diese Datei ist die EINZIGE Quelle für:
 * - Perspektiven (#P1-#P4)
 * - Dimensionen (#D1-#D6, Kurzform A-F)
 * - Kategorien (#K1-#K18)
 *
 * ALLE anderen Dateien MÜSSEN diese Definitionen referenzieren!
 *
 * Hierarchie:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  PERSPEKTIVEN (4)     → Wie wird bewertet?                                  │
 * │  └── DIMENSIONEN (6)  → Welcher Lebensbereich? (A-F Scores)                 │
 * │      └── KATEGORIEN (18) → Welche Bedürfnisgruppe?                          │
 * │          └── BEDÜRFNISSE (220) → Einzelne Bedürfnisse (in beduerfnis-ids.js)│
 * └─────────────────────────────────────────────────────────────────────────────┘
 */

const TiageTaxonomie = {

    version: '1.0.0',

    // ═══════════════════════════════════════════════════════════════════════════
    // PERSPEKTIVEN (#P1-#P4)
    // ═══════════════════════════════════════════════════════════════════════════
    // Vier verschiedene "Brillen" durch die Kompatibilität bewertet werden kann

    perspektiven: {
        '#P1': {
            id: '#P1',
            key: 'statistik',
            label: 'Statistik',
            beschreibung: 'Empirische Forschung - Gaußsche Übereinstimmung der Werte',
            quelle: 'McCrae & Costa (Big Five), Wismeijer & van Assen (BDSM)'
        },
        '#P2': {
            id: '#P2',
            key: 'konditionierung',
            label: 'Konditionierung',
            beschreibung: 'Natürlichkeit vs. Konditionierung - was ist anerzogen, was authentisch?',
            quelle: 'Osho Rajneesh - Vorträge über Liebe und Beziehungen'
        },
        '#P3': {
            id: '#P3',
            key: 'qualitaet',
            label: 'Qualität',
            beschreibung: 'Static vs. Dynamic Quality - Qualität als Fundament',
            quelle: 'Robert M. Pirsig - Zen und die Kunst ein Motorrad zu warten (1974)'
        },
        '#P4': {
            id: '#P4',
            key: 'sexpositiv',
            label: 'SexPositiv',
            beschreibung: 'Sex-Positive Movement, Consent, Autonomie, BDSM/Kink',
            quelle: 'Dossie Easton, Janet Hardy, Jay Wiseman'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DIMENSIONEN (#D1-#D6) - Die 6 Kompatibilitäts-Kategorien (A-F)
    // ═══════════════════════════════════════════════════════════════════════════
    // Jede Dimension entspricht einem A-F Score im Matching

    dimensionen: {
        '#D1': {
            id: '#D1',
            key: 'beziehungsphilosophie',
            kurzform: 'A',
            label: 'Beziehungsphilosophie',
            color: '#E63946',
            beschreibung: 'Grundlegende Beziehungsform und Lebensplanung',
            beispiele: ['Mono vs. Poly', 'Kinderwunsch', 'Wohnsituation', 'Ehe']
        },
        '#D2': {
            id: '#D2',
            key: 'werte_alignment',
            kurzform: 'B',
            label: 'Werte-Alignment',
            color: '#F4A261',
            beschreibung: 'Weltanschauung, Religion, Tradition',
            beispiele: ['Spiritualität', 'Politische Werte', 'Umwelt', 'Traditionen']
        },
        '#D3': {
            id: '#D3',
            key: 'naehe_distanz',
            kurzform: 'C',
            label: 'Nähe-Distanz',
            color: '#E84393',
            beschreibung: 'Körperliche und emotionale Nähe',
            beispiele: ['Kuscheln', 'Intimität', 'Romantik', 'Sicherheitsbedürfnis']
        },
        '#D4': {
            id: '#D4',
            key: 'autonomie',
            kurzform: 'D',
            label: 'Autonomie',
            color: '#2A9D8F',
            beschreibung: 'Freiheit, Selbstbestimmung, Dynamik',
            beispiele: ['Unabhängigkeit', 'Machtdynamik', 'Kreativität', 'Identität']
        },
        '#D5': {
            id: '#D5',
            key: 'kommunikation',
            kurzform: 'E',
            label: 'Kommunikation',
            color: '#8B5CF6',
            beschreibung: 'Austausch, Verständnis, Konfliktverhalten',
            beispiele: ['Gesprächsstil', 'Emotionale Offenheit', 'Streitkultur']
        },
        '#D6': {
            id: '#D6',
            key: 'soziale_kompatibilitaet',
            kurzform: 'F',
            label: 'Soziale-Kompatibilität',
            color: '#3B82F6',
            beschreibung: 'Soziales Leben, Praktisches, Alltag',
            beispiele: ['Intro/Extroversion', 'Freundeskreis', 'Ordnung', 'Reisen']
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KATEGORIEN (#K1-#K18) - Bedürfnisgruppen
    // ═══════════════════════════════════════════════════════════════════════════
    // 10 GFK-Kategorien (Rosenberg) + 1 Dynamik + 7 Lebensbereiche

    kategorien: {
        // ─────────────────────────────────────────────────────────────────────────
        // GFK KERN-KATEGORIEN (#K1-#K10) - Marshall Rosenberg
        // ─────────────────────────────────────────────────────────────────────────

        '#K1': {
            id: '#K1',
            key: 'existenz',
            dimension: '#D3',  // Nähe-Distanz
            label: 'Existenz',
            sigma: 11,
            color: '#E63946',
            beschreibung: 'Grundlegende physische Bedürfnisse',
            quelle: 'GFK (Rosenberg)'
        },
        '#K2': {
            id: '#K2',
            key: 'sicherheit',
            dimension: '#D3',  // Nähe-Distanz
            label: 'Sicherheit',
            sigma: 11,
            color: '#F4A261',
            beschreibung: 'Emotionale und psychische Sicherheit',
            quelle: 'GFK (Rosenberg)'
        },
        '#K3': {
            id: '#K3',
            key: 'zuneigung',
            dimension: '#D3',  // Nähe-Distanz
            label: 'Zuneigung',
            sigma: 12,
            color: '#E84393',
            beschreibung: 'Liebe, Nähe und emotionale Verbindung',
            quelle: 'GFK (Rosenberg)'
        },
        '#K4': {
            id: '#K4',
            key: 'verstaendnis',
            dimension: '#D5',  // Kommunikation
            label: 'Verständnis',
            sigma: 13,
            color: '#9B5DE5',
            beschreibung: 'Gesehen und verstanden werden',
            quelle: 'GFK (Rosenberg)'
        },
        '#K5': {
            id: '#K5',
            key: 'freiheit',
            dimension: '#D4',  // Autonomie
            label: 'Freiheit',
            sigma: 14,
            color: '#2A9D8F',
            beschreibung: 'Autonomie und Selbstbestimmung',
            quelle: 'GFK (Rosenberg)'
        },
        '#K6': {
            id: '#K6',
            key: 'teilnahme',
            dimension: '#D6',  // Soziale-Kompatibilität
            label: 'Teilnahme',
            sigma: 13,
            color: '#06D6A0',
            beschreibung: 'Gemeinschaft und Zugehörigkeit',
            quelle: 'GFK (Rosenberg)'
        },
        '#K7': {
            id: '#K7',
            key: 'musse',
            dimension: '#D6',  // Soziale-Kompatibilität
            label: 'Muße',
            sigma: 15,
            color: '#118AB2',
            beschreibung: 'Erholung, Freude und Genuss',
            quelle: 'GFK (Rosenberg)'
        },
        '#K8': {
            id: '#K8',
            key: 'identitaet',
            dimension: '#D4',  // Autonomie
            label: 'Identität',
            sigma: 14,
            color: '#FFD166',
            beschreibung: 'Selbstverwirklichung und Sinn',
            quelle: 'GFK (Rosenberg)'
        },
        '#K9': {
            id: '#K9',
            key: 'erschaffen',
            dimension: '#D4',  // Autonomie
            label: 'Erschaffen',
            sigma: 16,
            color: '#FF6B6B',
            beschreibung: 'Kreativität und Lernen',
            quelle: 'GFK (Rosenberg)'
        },
        '#K10': {
            id: '#K10',
            key: 'verbundenheit',
            dimension: '#D3',  // Nähe-Distanz
            label: 'Verbundenheit',
            sigma: 16,
            color: '#A8DADC',
            beschreibung: 'Tiefe existenzielle Verbindung',
            quelle: 'GFK (Rosenberg)'
        },

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK-KATEGORIE (#K11) - BDSM/Kink Erweiterung
        // ─────────────────────────────────────────────────────────────────────────

        '#K11': {
            id: '#K11',
            key: 'dynamik',
            dimension: '#D4',  // Autonomie
            label: 'Dynamik & Austausch',
            sigma: 17,
            color: '#8B5CF6',
            beschreibung: 'Machtdynamik und bewusster Austausch (BDSM/Kink)',
            quelle: 'Easton/Hardy (Topping/Bottoming), Wiseman (SM 101)'
        },

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSBEREICHE (#K12-#K18) - Tiage Erweiterung
        // ─────────────────────────────────────────────────────────────────────────

        '#K12': {
            id: '#K12',
            key: 'lebensplanung',
            dimension: '#D1',  // Beziehungsphilosophie
            label: 'Lebensplanung',
            sigma: 14,
            color: '#10B981',
            beschreibung: 'Kinder, Ehe, Wohnen, Familie',
            quelle: 'Tiage Erweiterung'
        },
        '#K13': {
            id: '#K13',
            key: 'finanzen_karriere',
            dimension: '#D1',  // Beziehungsphilosophie
            label: 'Finanzen & Karriere',
            sigma: 14,
            color: '#F59E0B',
            beschreibung: 'Geld, Beruf, Work-Life-Balance',
            quelle: 'Tiage Erweiterung'
        },
        '#K14': {
            id: '#K14',
            key: 'kommunikation_stil',
            dimension: '#D5',  // Kommunikation
            label: 'Kommunikationsstil',
            sigma: 13,
            color: '#3B82F6',
            beschreibung: 'Gespräche, Emotionen, Konflikte',
            quelle: 'Tiage Erweiterung'
        },
        '#K15': {
            id: '#K15',
            key: 'soziales_leben',
            dimension: '#D6',  // Soziale-Kompatibilität
            label: 'Soziales Leben',
            sigma: 14,
            color: '#8B5CF6',
            beschreibung: 'Introversion/Extroversion, Freunde',
            quelle: 'Tiage Erweiterung'
        },
        '#K16': {
            id: '#K16',
            key: 'intimitaet_romantik',
            dimension: '#D3',  // Nähe-Distanz
            label: 'Intimität & Romantik',
            sigma: 16,
            color: '#EC4899',
            beschreibung: 'Körperliche Nähe, Romantik, Sexualität',
            quelle: 'Tiage Erweiterung'
        },
        '#K17': {
            id: '#K17',
            key: 'werte_haltungen',
            dimension: '#D2',  // Werte-Alignment
            label: 'Werte & Haltungen',
            sigma: 15,
            color: '#6366F1',
            beschreibung: 'Religion, Tradition, Umwelt',
            quelle: 'Tiage Erweiterung'
        },
        '#K18': {
            id: '#K18',
            key: 'praktisches_leben',
            dimension: '#D6',  // Soziale-Kompatibilität
            label: 'Praktisches Leben',
            sigma: 14,
            color: '#14B8A6',
            beschreibung: 'Ordnung, Reisen, Alltag',
            quelle: 'Tiage Erweiterung'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LOOKUP-FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    _lookups: null,

    /**
     * Initialisiert Lookup-Tabellen für schnellen Zugriff
     */
    init: function() {
        if (this._lookups) return this;

        this._lookups = {
            perspektivenByKey: {},
            dimensionenByKey: {},
            dimensionenByKurzform: {},
            kategorienByKey: {},
            kategorienByDimension: {}
        };

        // Perspektiven
        for (var id in this.perspektiven) {
            var p = this.perspektiven[id];
            this._lookups.perspektivenByKey[p.key] = p;
        }

        // Dimensionen
        for (var id in this.dimensionen) {
            var d = this.dimensionen[id];
            this._lookups.dimensionenByKey[d.key] = d;
            this._lookups.dimensionenByKurzform[d.kurzform] = d;
        }

        // Kategorien
        for (var id in this.kategorien) {
            var k = this.kategorien[id];
            this._lookups.kategorienByKey[k.key] = k;

            // Kategorien nach Dimension gruppieren
            if (!this._lookups.kategorienByDimension[k.dimension]) {
                this._lookups.kategorienByDimension[k.dimension] = [];
            }
            this._lookups.kategorienByDimension[k.dimension].push(k);
        }

        return this;
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Perspektiven-Zugriff
    // ─────────────────────────────────────────────────────────────────────────

    getPerspektive: function(idOrKey) {
        this.init();
        if (idOrKey.startsWith('#P')) {
            return this.perspektiven[idOrKey];
        }
        return this._lookups.perspektivenByKey[idOrKey];
    },

    getAllePerspektiven: function() {
        return Object.values(this.perspektiven);
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Dimensionen-Zugriff
    // ─────────────────────────────────────────────────────────────────────────

    getDimension: function(idOrKeyOrKurzform) {
        this.init();
        if (idOrKeyOrKurzform.startsWith('#D')) {
            return this.dimensionen[idOrKeyOrKurzform];
        }
        if (idOrKeyOrKurzform.length === 1) {
            return this._lookups.dimensionenByKurzform[idOrKeyOrKurzform];
        }
        return this._lookups.dimensionenByKey[idOrKeyOrKurzform];
    },

    getAlleDimensionen: function() {
        return Object.values(this.dimensionen);
    },

    getDimensionByKurzform: function(kurzform) {
        this.init();
        return this._lookups.dimensionenByKurzform[kurzform];
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Kategorien-Zugriff
    // ─────────────────────────────────────────────────────────────────────────

    getKategorie: function(idOrKey) {
        this.init();
        if (idOrKey.startsWith('#K')) {
            return this.kategorien[idOrKey];
        }
        return this._lookups.kategorienByKey[idOrKey];
    },

    getAlleKategorien: function() {
        return Object.values(this.kategorien);
    },

    getKategorienFuerDimension: function(dimensionId) {
        this.init();
        return this._lookups.kategorienByDimension[dimensionId] || [];
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Hierarchie-Navigation
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Gibt die Dimension für eine Kategorie zurück
     */
    getDimensionFuerKategorie: function(kategorieId) {
        var kat = this.getKategorie(kategorieId);
        if (!kat) return null;
        return this.getDimension(kat.dimension);
    },

    /**
     * Gibt alle Kategorien mit ihren Dimensionen als Baum zurück
     */
    getHierarchie: function() {
        this.init();
        var result = {};

        for (var dimId in this.dimensionen) {
            var dim = this.dimensionen[dimId];
            result[dimId] = {
                ...dim,
                kategorien: this.getKategorienFuerDimension(dimId)
            };
        }

        return result;
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Validierung
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Validiert eine ID
     */
    isValidId: function(id) {
        if (!id || typeof id !== 'string') return false;

        if (id.startsWith('#P')) return !!this.perspektiven[id];
        if (id.startsWith('#D')) return !!this.dimensionen[id];
        if (id.startsWith('#K')) return !!this.kategorien[id];

        return false;
    },

    /**
     * Gibt Statistiken über die Taxonomie zurück
     */
    getStats: function() {
        this.init();
        return {
            perspektiven: Object.keys(this.perspektiven).length,
            dimensionen: Object.keys(this.dimensionen).length,
            kategorien: Object.keys(this.kategorien).length,
            kategorienProDimension: Object.fromEntries(
                Object.keys(this._lookups.kategorienByDimension).map(function(d) {
                    return [d, this._lookups.kategorienByDimension[d].length];
                }.bind(this))
            )
        };
    }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageTaxonomie;
}
if (typeof window !== 'undefined') {
    window.TiageTaxonomie = TiageTaxonomie;
}
