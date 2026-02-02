/**
 * FACTOR EXPLANATIONS MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Enthält die Erklärungstexte und Logik für das Factor Detail Modal.
 * Jeder Faktor (Archetyp, Dominanz, Orientierung, Geschlecht) hat:
 * - title/subtitle: Überschriften
 * - getExplanation(): Generiert den Erklärungstext basierend auf Score
 * - getMeaning(): Generiert die Bedeutungspunkte
 *
 * Abhängigkeiten (über window.*):
 * - data (archetype data)
 * - TiageSynthesis.Constants.DOMINANCE_MATRIX
 * - getDominanzHarmonyMatrix() (fallback)
 *
 * @module TiageModals.FactorExplanations
 */

var TiageModals = TiageModals || {};

TiageModals.FactorExplanations = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // FACTOR EXPLANATIONS DATA
    // ═══════════════════════════════════════════════════════════════════════

    const explanations = {
        archetyp: {
            title: 'Archetyp-Übereinstimmung',
            subtitle: '(Beziehungsphilosophie - Verstand&Logos)',
            getExplanation: function(ich, partner, score) {
                var data = window.data;
                var ichName = data?.archetypes?.[ich]?.name || ich;
                var partnerName = data?.archetypes?.[partner]?.name || partner;

                if (ich === partner) {
                    return ichName + ' und ' + partnerName + ' teilen dieselbe Beziehungsphilosophie. Beide haben identische Grundüberzeugungen über Beziehungsstrukturen.';
                }

                if (score >= 80) {
                    return ichName + ' und ' + partnerName + ' haben sehr ähnliche Beziehungsphilosophien. Die Grundüberzeugungen passen gut zusammen und erfordern nur minimale Kompromisse.';
                } else if (score >= 60) {
                    return ichName + ' und ' + partnerName + ' haben unterschiedliche, aber kompatible Beziehungsphilosophien. Beide Archetypen können sich mit Kommunikation und Verständnis ergänzen.';
                } else {
                    return ichName + ' und ' + partnerName + ' haben fundamentale philosophische Unterschiede. Die Beziehungsvorstellungen weichen stark voneinander ab und erfordern intensive Kommunikation.';
                }
            },
            getMeaning: function(score, ich, partner) {
                var data = window.data;
                var ichName = data?.archetypes?.[ich]?.name || ich;
                var partnerName = data?.archetypes?.[partner]?.name || partner;
                var rhetoricNote = { title: '💡 Warum Logos (Verstand)?', desc: 'Archetypen basieren auf rationalen Beziehungsphilosophien und bewussten Überzeugungen – sie sprechen den Verstand an, nicht das Gefühl.' };

                if (ich === partner) {
                    return [
                        rhetoricNote,
                        { title: '📌 In dieser Kombination teilen beide denselben Archetyp "' + ichName + '" – maximale philosophische Übereinstimmung.', desc: '' },
                        { title: 'Gleiche Grundüberzeugungen', desc: 'Beide haben identische Vorstellungen davon, wie eine Beziehung funktionieren sollte.' },
                        { title: 'Intuitive Verständigung', desc: 'Die gemeinsame Basis ermöglicht tiefes gegenseitiges Verstehen ohne lange Erklärungen.' },
                        { title: 'Natürliche Harmonie', desc: 'Keine grundsätzlichen Konflikte durch unterschiedliche Beziehungsphilosophien.' }
                    ];
                }

                if (score >= 80) {
                    return [
                        rhetoricNote,
                        { title: '📌 In dieser Kombination von "' + ichName + '" und "' + partnerName + '" ergänzen sich die Beziehungsphilosophien sehr gut.', desc: '' },
                        { title: 'Hohe philosophische Übereinstimmung', desc: 'Beide teilen ähnliche Grundwerte und Beziehungsideale.' },
                        { title: 'Wenige grundsätzliche Konflikte', desc: 'Weltanschauung und Lebensziele sind weitgehend kompatibel.' },
                        { title: 'Ähnliche Erwartungen an die Beziehung', desc: 'Was beide von Partnerschaft erwarten, deckt sich gut.' }
                    ];
                } else if (score >= 60) {
                    return [
                        rhetoricNote,
                        { title: '📌 In dieser Kombination von "' + ichName + '" und "' + partnerName + '" gibt es sowohl Gemeinsamkeiten als auch deutliche Unterschiede.', desc: '' },
                        { title: 'Mittlere philosophische Übereinstimmung', desc: 'Grundwerte überlappen, aber es gibt Unterschiede.' },
                        { title: 'Kompromisse und Kommunikation nötig', desc: 'Unterschiedliche Prioritäten erfordern regelmäßigen Austausch.' },
                        { title: 'Unterschiedliche, aber vereinbare Bedürfnisse', desc: 'Mit Flexibilität können beide Seiten zufrieden sein.' }
                    ];
                } else {
                    return [
                        rhetoricNote,
                        { title: '📌 In dieser Kombination von "' + ichName + '" und "' + partnerName + '" prallen grundlegend verschiedene Beziehungsphilosophien aufeinander.', desc: '' },
                        { title: 'Niedrige philosophische Übereinstimmung', desc: 'Grundsätzlich verschiedene Sichtweisen auf Beziehung.' },
                        { title: 'Intensive Kommunikation erforderlich', desc: 'Ohne bewusste Arbeit entstehen leicht Missverständnisse.' },
                        { title: 'Fundamentale Kompromisse notwendig', desc: 'Beide müssen auf wichtige eigene Bedürfnisse verzichten können.' }
                    ];
                }
            }
        },

        dominanz: {
            title: 'Dominanz-Harmonie',
            subtitle: '(Emotionale Dynamik - Gefühl&Pathos)',
            getExplanation: function(ich, partner, score, dimensions) {
                var dims = dimensions || window.mobilePersonDimensions;
                var ichDomObj = dims?.ich?.dominanz;
                var partnerDomObj = dims?.partner?.dominanz;

                var domLabels = {
                    'dominant': 'dominant',
                    'submissiv': 'submissiv',
                    'switch': 'Switch',
                    'ausgeglichen': 'ausgeglichen'
                };

                var getHarmonyMatrix = function() {
                    if (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants && TiageSynthesis.Constants.DOMINANCE_MATRIX) {
                        return TiageSynthesis.Constants.DOMINANCE_MATRIX;
                    }
                    if (typeof getDominanzHarmonyMatrix === 'function') {
                        return getDominanzHarmonyMatrix();
                    }
                    return null;
                };

                var harmonyMatrix = getHarmonyMatrix();

                var getAllSelections = function(domObj) {
                    if (!domObj || typeof domObj !== 'object') return [];
                    var selections = [];
                    for (var type in domObj) {
                        if (domObj[type]) selections.push({ type: type, status: domObj[type] });
                    }
                    return selections;
                };

                var ichSelections = getAllSelections(ichDomObj);
                var partnerSelections = getAllSelections(partnerDomObj);

                if (ichSelections.length === 0 || partnerSelections.length === 0) {
                    return 'Bitte wähle für beide Personen eine Dominanz-Präferenz aus, um die Harmonie zu berechnen.';
                }

                var ichTypes = ichSelections.map(function(s) { return domLabels[s.type] || s.type; }).join(', ');
                var partnerTypes = partnerSelections.map(function(s) { return domLabels[s.type] || s.type; }).join(', ');

                if (score >= 85) {
                    return 'Die Kombination ' + ichTypes + ' und ' + partnerTypes + ' zeigt eine perfekte Dynamik. Beide Präferenzen ergänzen sich ideal und ermöglichen eine natürliche, erfüllende Interaktion.';
                } else if (score >= 70) {
                    return 'Die Kombination ' + ichTypes + ' und ' + partnerTypes + ' zeigt gute Harmonie. Die Präferenzen sind kompatibel und ermöglichen eine befriedigende Dynamik mit Raum für Wachstum.';
                } else if (score >= 50) {
                    return 'Die Kombination ' + ichTypes + ' und ' + partnerTypes + ' bietet eine Basis für Dynamik. Es gibt Überschneidungen, aber auch Unterschiede, die Kommunikation erfordern.';
                } else {
                    return 'Die Kombination ' + ichTypes + ' und ' + partnerTypes + ' zeigt wenig natürliche Harmonie. Die Präferenzen passen nicht ideal zusammen. Offene Kommunikation über Bedürfnisse ist wichtig.';
                }
            },
            getMeaning: function(score, ich, partner) {
                var rhetoricNote = { title: '💡 Warum Pathos (Gefühl)?', desc: 'Dominanz-Dynamik ist emotional und körperlich geprägt – sie wirkt auf Gefühlsebene, nicht auf rationaler Überzeugung.' };

                if (score >= 85) {
                    return [
                        rhetoricNote,
                        { title: '📌 Perfekte Komplementarität', desc: 'Die Präferenzen ergänzen sich ideal.' },
                        { title: 'Natürlicher Energiefluss', desc: 'Beide können ihre authentische Rolle leben.' },
                        { title: 'Tiefe Erfüllung', desc: 'Die Dynamik befriedigt grundlegende Bedürfnisse.' },
                        { title: 'Intuitive Abstimmung', desc: 'Wenig Erklärung nötig, beide verstehen sich.' }
                    ];
                } else if (score >= 70) {
                    return [
                        rhetoricNote,
                        { title: '📌 Gute Kompatibilität', desc: 'Die Präferenzen harmonieren gut.' },
                        { title: 'Raum für Entwicklung', desc: 'Beide können voneinander lernen.' },
                        { title: 'Befriedigende Dynamik', desc: 'Grundbedürfnisse werden erfüllt.' },
                        { title: 'Kommunikation hilft', desc: 'Mit Austausch wird es noch besser.' }
                    ];
                } else if (score >= 50) {
                    return [
                        rhetoricNote,
                        { title: '📌 Moderate Harmonie', desc: 'Es gibt Gemeinsamkeiten und Unterschiede.' },
                        { title: 'Kompromisse nötig', desc: 'Beide müssen manchmal nachgeben.' },
                        { title: 'Potenzial vorhanden', desc: 'Mit Arbeit kann es funktionieren.' },
                        { title: 'Offenheit gefragt', desc: 'Ehrliche Kommunikation ist wichtig.' }
                    ];
                } else {
                    return [
                        rhetoricNote,
                        { title: '📌 Herausforderung', desc: 'Die Präferenzen passen weniger gut.' },
                        { title: 'Spannung möglich', desc: 'Es kann zu Frustration kommen.' },
                        { title: 'Viel Arbeit nötig', desc: 'Erfordert aktive Anstrengung beider.' },
                        { title: 'Alternative Wege', desc: 'Andere Bereiche müssen stärker sein.' }
                    ];
                }
            }
        },

        orientierung: {
            title: 'Orientierungs-Kompatibilität',
            subtitle: '(Sexuelle Anziehung - Gefühl&Pathos)',
            getExplanation: function(ich, partner, score, dimensions) {
                var dims = dimensions || window.mobilePersonDimensions;

                var oriLabels = {
                    'heterosexuell': 'heterosexuell',
                    'homosexuell': 'homosexuell',
                    'bisexuell': 'bisexuell',
                    'pansexuell': 'pansexuell',
                    'queer': 'queer'
                };

                var getFirstSelection = function(oriObj) {
                    if (!oriObj || typeof oriObj !== 'object') return null;
                    for (var type in oriObj) {
                        if (oriObj[type]) return type;
                    }
                    return null;
                };

                var ichOri = getFirstSelection(dims?.ich?.orientierung);
                var partnerOri = getFirstSelection(dims?.partner?.orientierung);

                if (!ichOri || !partnerOri) {
                    return 'Bitte wähle für beide Personen eine sexuelle Orientierung aus.';
                }

                var ichLabel = oriLabels[ichOri] || ichOri;
                var partnerLabel = oriLabels[partnerOri] || partnerOri;

                if (score >= 90) {
                    return 'Die Kombination ' + ichLabel + ' und ' + partnerLabel + ' zeigt volle körperliche Kompatibilität. Beide Orientierungen ermöglichen gegenseitige Anziehung.';
                } else if (score >= 50) {
                    return 'Die Kombination ' + ichLabel + ' und ' + partnerLabel + ' zeigt eingeschränkte Kompatibilität. Körperliche Anziehung ist möglich, aber nicht garantiert.';
                } else {
                    return 'Die Kombination ' + ichLabel + ' und ' + partnerLabel + ' zeigt keine körperliche Kompatibilität. Die Orientierungen schließen gegenseitige Anziehung aus.';
                }
            },
            getMeaning: function(score, ich, partner) {
                var rhetoricNote = { title: '💡 Warum Pathos (Gefühl)?', desc: 'Sexuelle Orientierung ist gefühlsbasiert – es geht um Anziehung und Verlangen, nicht um rationale Entscheidung.' };

                if (score >= 90) {
                    return [
                        rhetoricNote,
                        { title: '📌 Volle Kompatibilität', desc: 'Gegenseitige körperliche Anziehung ist möglich.' },
                        { title: 'Natürliche Chemie', desc: 'Die Orientierungen ermöglichen Anziehung.' },
                        { title: 'Körperliche Verbindung', desc: 'Basis für intime Beziehung vorhanden.' }
                    ];
                } else if (score >= 50) {
                    return [
                        rhetoricNote,
                        { title: '📌 Eingeschränkte Kompatibilität', desc: 'Anziehung ist situationsabhängig.' },
                        { title: 'Flexible Orientierung', desc: 'Mindestens eine Person ist offen für beide.' },
                        { title: 'Kommunikation wichtig', desc: 'Klärung der Erwartungen empfohlen.' }
                    ];
                } else {
                    return [
                        rhetoricNote,
                        { title: '📌 Keine Kompatibilität', desc: 'Körperliche Anziehung unwahrscheinlich.' },
                        { title: 'Orientierungen inkompatibel', desc: 'Die Präferenzen schließen sich aus.' },
                        { title: 'Freundschaft möglich', desc: 'Andere Beziehungsformen denkbar.' }
                    ];
                }
            }
        },

        geschlecht: {
            title: 'Geschlechts-Passung',
            subtitle: '(Körperliche Anziehung - Gefühl&Pathos)',
            getExplanation: function(ich, partner, score, dimensions) {
                if (score >= 90) {
                    return 'Volle körperliche Kompatibilität basierend auf Geschlechtsidentität und sexueller Orientierung. Die Kombination ermöglicht natürliche Anziehung.';
                } else if (score >= 50) {
                    return 'Eingeschränkte körperliche Kompatibilität. Es gibt Potenzial für Anziehung, aber die Passung ist nicht optimal.';
                } else {
                    return 'Geringe körperliche Kompatibilität. Die Kombination aus Geschlecht und Orientierung macht gegenseitige Anziehung unwahrscheinlich.';
                }
            },
            getMeaning: function(score, ich, partner) {
                var rhetoricNote = { title: '💡 Warum Pathos (Gefühl)?', desc: 'Geschlechts-Passung basiert auf körperlicher Anziehung – ein intuitives Gefühl, keine rationale Entscheidung.' };

                if (score >= 90) {
                    return [
                        rhetoricNote,
                        { title: '📌 Volle Passung', desc: 'Körperliche Anziehung ist wahrscheinlich.' },
                        { title: 'Kompatible Kombination', desc: 'Geschlecht und Orientierung passen.' },
                        { title: 'Basis für Intimität', desc: 'Körperliche Beziehung möglich.' }
                    ];
                } else if (score >= 50) {
                    return [
                        rhetoricNote,
                        { title: '📌 Teilweise Passung', desc: 'Anziehung ist situationsabhängig.' },
                        { title: 'Flexibilität nötig', desc: 'Mindestens einer ist offen.' },
                        { title: 'Klärung empfohlen', desc: 'Erwartungen besprechen.' }
                    ];
                } else {
                    return [
                        rhetoricNote,
                        { title: '📌 Keine Passung', desc: 'Anziehung unwahrscheinlich.' },
                        { title: 'Orientierung passt nicht', desc: 'Die Präferenzen zeigen in andere Richtungen.' }
                    ];
                }
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        get: function(factorType) {
            return explanations[factorType] || null;
        },
        getAll: function() {
            return explanations;
        }
    };

})();

// ═══════════════════════════════════════════════════════════════════════════
// BACKWARDS COMPATIBILITY
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    window.TiageModals = window.TiageModals || {};
    window.TiageModals.FactorExplanations = TiageModals.FactorExplanations;
    // Legacy: Expose as global for existing code
    window.factorExplanations = TiageModals.FactorExplanations.getAll();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModals.FactorExplanations;
}
