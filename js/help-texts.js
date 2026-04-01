/**
 * TIAGE HELP TEXTS - Zentrale Dokumentation
 *
 * ECHTES SSOT: Referenziert TiageSynthesis.Constants.FORMULAS (kein Hardcoding!)
 * Separation of Concerns: Dokumentation getrennt von UI-Rendering.
 *
 * WICHTIG: Diese Datei LIEST aus constants.js, statt Werte zu duplizieren.
 * Änderungen an Formeln müssen nur in constants.js gemacht werden.
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */

var TiageHelpTexts = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // SSOT-HELPER: Zugriff auf TiageSynthesis.Constants.FORMULAS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Prüft ob constants.js geladen ist
     */
    function hasConstants() {
        return typeof TiageSynthesis !== 'undefined' &&
               TiageSynthesis.Constants &&
               TiageSynthesis.Constants.FORMULAS;
    }

    /**
     * SSOT: Holt die Hauptformel aus constants.js
     * Echte Referenz statt Hardcoding!
     */
    function getMainFormula() {
        if (hasConstants()) {
            // SSOT: Liest wirklich aus constants.js!
            return TiageSynthesis.Constants.FORMULAS.main;
        }

        // Fallback wenn constants.js nicht geladen
        console.warn('[TiageHelpTexts] WARNUNG: constants.js nicht geladen - verwende Fallback');
        return {
            text: 'Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]',
            html: 'Q = (O×w<sub>O</sub>×r₁) + (A×w<sub>A</sub>×r₂) + (D×w<sub>D</sub>×r₃) + (G×w<sub>G</sub>×r₄)',
            description: 'Beziehungsqualitäts-Score mit Resonanzfaktoren (Fallback)'
        };
    }

    /**
     * SSOT: Holt die R-Faktor-Formel aus constants.js
     * Echte Referenz statt Hardcoding!
     */
    function getRFactorFormula() {
        if (hasConstants()) {
            // SSOT: Liest wirklich aus constants.js!
            var formula = TiageSynthesis.Constants.FORMULAS.r_factor;
            return {
                text: formula.text,
                html: formula.html,
                description: formula.description,
                range: { min: formula.params.min, max: formula.params.max },
                interpretation: {
                    weak: { threshold: formula.thresholds.dissonance, label: 'schwächt Score' },
                    neutral: { range: formula.thresholds.neutral, label: 'neutral' },
                    strong: { threshold: formula.thresholds.resonance, label: 'verstärkt Score' }
                }
            };
        }

        // Fallback wenn constants.js nicht geladen
        console.warn('[TiageHelpTexts] WARNUNG: constants.js nicht geladen - verwende Fallback');
        return {
            text: 'R = similarity²',
            description: 'Resonanzfaktor pro Dimension v3.2 (quadratisch, mit Komplementär-Mapping)',
            range: { min: 0, max: 1 },
            interpretation: {
                weak: { threshold: 0.3, label: 'schwächt Score stark' },
                neutral: { range: [0.3, 0.7], label: 'mittelmäßig' },
                strong: { threshold: 0.7, label: 'guter Match' }
            }
        };
    }

    /**
     * SSOT: Holt die Bedürfnis-Matching-Formeln aus constants.js
     * Echte Referenz statt Hardcoding!
     */
    function getNeedsMatchingFormula() {
        if (hasConstants()) {
            // SSOT: Liest wirklich aus constants.js!
            var formulas = TiageSynthesis.Constants.FORMULAS.needs_matching;
            return {
                similarity: formulas.similarity.text,
                weight: formulas.weight.text,
                contribution: formulas.contribution.text,
                total: formulas.total.text
            };
        }

        // Fallback wenn constants.js nicht geladen
        console.warn('[TiageHelpTexts] WARNUNG: constants.js nicht geladen - verwende Fallback');
        return {
            similarity: 'Ähnlichkeit = 100 - |Wert₁ - Wert₂|',
            weight: 'Gewicht = (Wert₁ + Wert₂) / 2',
            contribution: 'Beitrag = Ähnlichkeit × Gewicht',
            total: 'Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DOKUMENTATIONS-INHALTE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * R-Faktor Einfluss-Erklärung
     * Wiederverwendbar für alle R1-R4 Faktoren
     */
    function getRFactorInfluenceExplanation(rKey) {
        const formula = getRFactorFormula();
        const mainFormula = getMainFormula();

        const factorMapping = {
            'R1': { name: 'Orientierungs', variable: 'O' },
            'R2': { name: 'Archetyp', variable: 'A' },
            'R3': { name: 'Dominanz', variable: 'D' },
            'R4': { name: 'Geschlechts', variable: 'G' }
        };

        const factor = factorMapping[rKey] || { name: 'Faktor', variable: '?' };

        // v3.4: Richtungsbasiert um 1.0 zentriert
        return {
            title: 'Einfluss auf Endscore',
            description: `Der ${rKey}-Faktor wird direkt mit dem ${factor.name}-Score multipliziert.`,
            formula: mainFormula.html,
            highlightedFactor: rKey,
            interpretation: [
                `R > 1.0: mehr als Archetyp-typisch - verstärkt den ${factor.name}-Score`,
                `R = 1.0: perfekte Übereinstimmung mit Archetyp`,
                `R < 1.0: weniger als Archetyp-typisch - schwächt den ${factor.name}-Score`
            ],
            range: `Range: ${formula.range.min} - ${formula.range.max}`
        };
    }

    /**
     * Bedürfnis-Score Erklärung (für 72% Modal)
     */
    function getNeedsScoreExplanation() {
        const formula = getNeedsMatchingFormula();

        return {
            title: 'Bedürfnis-Übereinstimmung',
            subtitle: 'Gewichtete Übereinstimmung über alle 224 Bedürfnisse',
            formula: {
                similarity: formula.similarity,
                weight: formula.weight,
                contribution: formula.contribution,
                total: formula.total
            },
            example: {
                need: '#B90 Kinderwunsch',
                person1: 85,
                person2: 40,
                calculation: {
                    similarity: '100 - |85 - 40| = 55',
                    weight: '(85 + 40) / 2 = 62.5',
                    contribution: '55 × 62.5 = 3437.5'
                }
            },
            categories: [
                { label: '#B1-#B88: GFK-Kern', count: 88 },
                { label: '#B89-#B126: Lebensplanung', count: 38 },
                { label: '#B127-#B148: Finanzen & Karriere', count: 22 },
                { label: '#B149-#B176: Kommunikationsstil', count: 28 },
                { label: '#B177-#B203: Soziales Leben', count: 27 },
                { label: '#B204-#B208: Intimität & Romantik', count: 5 },
                { label: '#B209-#B224: Dynamik & Genussmittel erweitert', count: 16 }
            ],
            total: 224
        };
    }

    /**
     * Resonanzfaktor-Berechnungslogik (v3.2)
     * Erklärt wie R1-R4 aus Perspektiven berechnet werden
     */
    function getResonanzCalculationExplanation() {
        return {
            title: 'Resonanzfaktoren (R1-R4): Berechnung',
            subtitle: 'Wie entstehen die R-Werte aus Perspektiven und Archetyp-Kohärenz?',

            overview: {
                description: 'v3.2: Resonanzfaktoren messen die Übereinstimmung zwischen ICH und PARTNER mit Komplementär-Mapping für Geben/Empfangen-Paare.',
                formula: 'R = similarity² (quadratisch)',
                range: {
                    min: '0.0 (totaler Mismatch → eliminiert Dimension)',
                    neutral: '0.5 (mittelmäßig)',
                    max: '1.0 (perfekte Übereinstimmung)'
                }
            },

            perspektiven: {
                title: '4 Perspektiven auf Bedürfnisse',
                description: 'Jede Perspektive betrachtet deine Bedürfnisse aus einem anderen philosophischen Blickwinkel:',
                list: [
                    {
                        id: '#P1',
                        name: 'GFK (Rosenberg)',
                        beschreibung: 'Gewaltfreie Kommunikation – universelle menschliche Bedürfnisse',
                        beispiele: 'Empathie, Verständnis, Akzeptanz'
                    },
                    {
                        id: '#P2',
                        name: 'Osho (Zen/Tantra)',
                        beschreibung: 'Nicht-Anhaften, Authentizität, Hier-und-Jetzt',
                        beispiele: 'Meditation zu zweit, radikale Ehrlichkeit, orgastisches Leben'
                    },
                    {
                        id: '#P3',
                        name: 'Pirsig (Qualität)',
                        beschreibung: 'Statische vs. Dynamische Qualität, Evolution',
                        beispiele: 'Biologische Anziehung, dynamische Evolution, statische Stabilität'
                    },
                    {
                        id: '#P4',
                        name: 'Kink (BDSM)',
                        beschreibung: 'Macht-Dynamiken, Intensität, bewusste Hingabe',
                        beispiele: 'Kontrolle ausüben, Hingabe, Machtaustausch, Vertrauen schenken'
                    }
                ]
            },

            calculation: {
                title: 'Berechnungsschritte',
                steps: [
                    {
                        nr: 1,
                        titel: 'Individuelle Kohärenz-Matrix',
                        beschreibung: 'Für jede Person wird berechnet, wie gut die Bedürfnisse zum Archetyp passen',
                        formel: 'Kohärenz = 1 - (Durchschnittliche Abweichung / 100)',
                        beispiel: 'Solopoly-Archetyp hat typischerweise "nicht_anhaften_an_partner" = 85. Dein Wert: 70 → Abweichung = 15 → Kohärenz = 85%'
                    },
                    {
                        nr: 2,
                        titel: 'Matrix-Struktur (4×4)',
                        beschreibung: 'Jeder Resonanzfaktor (R1-R4) wird über alle 4 Perspektiven berechnet',
                        struktur: {
                            beschreibung: 'Matrix-Aufbau:',
                            tabelle: [
                                { faktor: 'R1 Leben', perspektiven: ['Statistik', 'Konditionierung', 'Qualität', 'SexPositiv'] },
                                { faktor: 'R2 Philosophie', perspektiven: ['Statistik', 'Konditionierung', 'Qualität', 'SexPositiv'] },
                                { faktor: 'R3 Dynamik', perspektiven: ['Statistik', 'Konditionierung', 'Qualität', 'SexPositiv'] },
                                { faktor: 'R4 Identität', perspektiven: ['Statistik', 'Konditionierung', 'Qualität', 'SexPositiv'] }
                            ]
                        }
                    },
                    {
                        nr: 3,
                        titel: 'Durchschnitt über Perspektiven',
                        beschreibung: 'Pro Resonanzfaktor wird der Durchschnitt über alle 4 Perspektiven gebildet',
                        beispiel: {
                            titel: 'Beispiel für R2 (Philosophie):',
                            perspektiveScores: {
                                '#P1 Statistik': '+8%',
                                '#P2 Konditionierung': '+12%',
                                '#P3 Qualität': '+5%',
                                '#P4 SexPositiv': '+3%'
                            },
                            durchschnitt: '(8 + 12 + 5 + 3) / 4 = 7%',
                            rWert: 'R2 = 1 + 0.07 = 1.07'
                        }
                    },
                    {
                        nr: 4,
                        titel: 'Kombination bei Paarungen (Produkt)',
                        beschreibung: 'Bei der Paarungsberechnung werden die R-Werte beider Personen multipliziert',
                        formel: 'R_kombiniert = R_Person1 × R_Person2',
                        beispiel: {
                            person1: 'R2 = 1.07',
                            person2: 'R2 = 1.10',
                            kombiniert: 'R2_kombiniert = 1.07 × 1.10 = 1.177'
                        },
                        interpretation: 'Beide Personen müssen kohärent sein, damit die Resonanz verstärkt wird'
                    }
                ]
            },

            faktoren: {
                title: 'Was beeinflusst welchen R-Faktor?',
                description: 'Jeder Resonanzfaktor aggregiert verschiedene Bedürfniskategorien:',
                list: [
                    {
                        id: 'R1',
                        name: 'Leben',
                        sourceLabel: '← Orientierung',
                        kategorien: ['Existenz', 'Zuneigung', 'Muße', 'Intimität & Romantik'],
                        einfluss: 'Wirkt direkt auf den Orientierungs-Score in der Formel: O × wO × R1'
                    },
                    {
                        id: 'R2',
                        name: 'Philosophie',
                        sourceLabel: '← Archetyp',
                        kategorien: ['Freiheit', 'Teilnahme', 'Identität', 'Lebensplanung', 'Finanzen & Karriere', 'Werte & Haltungen', 'Soziales Leben', 'Praktisches Leben'],
                        einfluss: 'Wirkt direkt auf den Archetyp-Score in der Formel: A × wA × R2'
                    },
                    {
                        id: 'R3',
                        name: 'Dynamik',
                        sourceLabel: '← Dominanz',
                        kategorien: ['Dynamik (Kink)', 'Sicherheit'],
                        einfluss: 'Wirkt direkt auf den Dominanz-Score in der Formel: D × wD × R3'
                    },
                    {
                        id: 'R4',
                        name: 'Identität',
                        sourceLabel: '← Geschlecht',
                        kategorien: ['Verständnis', 'Erschaffen', 'Verbundenheit', 'Kommunikationsstil'],
                        einfluss: 'Wirkt direkt auf den Geschlechts-Score in der Formel: G × wG × R4'
                    }
                ]
            },

            praxisbeispiel: {
                title: 'Praxisbeispiel: Wie Perspektiven den R-Wert beeinflussen',
                situation: 'Du hast den Archetyp "Solopoly" gewählt, aber deine Bedürfnisse sind teilweise traditioneller',
                bedürfnisse: [
                    { key: 'nicht_anhaften_an_partner', perspektive: '#P2 Osho', solopoly: 85, dein: 50, diff: 35 },
                    { key: 'langfristige_bindung', perspektive: '#P1 GFK', solopoly: 30, dein: 70, diff: 40 },
                    { key: 'polyamore_energie', perspektive: '#P2 Osho', solopoly: 80, dein: 40, diff: 40 }
                ],
                auswirkung: {
                    beschreibung: 'Die hohen Abweichungen senken die Kohärenz',
                    perspektivenAuswertung: {
                        '#P2 Osho': 'Große Abweichungen bei Osho-Bedürfnissen → niedriger Score',
                        '#P1 GFK': 'Mittlere Abweichung bei GFK-Bedürfnissen → mittlerer Score',
                        durchschnitt: 'R2 könnte bei ~0.85 liegen (schwächt Archetyp-Score)'
                    },
                    empfehlung: 'Erwäge einen Archetyp zu wählen, der besser zu deinen Bedürfnissen passt, z.B. "Duo" oder "LAT"'
                }
            },

            wichtigeHinweise: [
                'Perspektiven-Buttons im UI zeigen, welche Bedürfnisse zu welcher Perspektive gehören',
                'Du kannst R-Werte manuell sperren (🔒), um automatische Berechnung zu deaktivieren',
                'R-Werte werden bei jeder Änderung der Bedürfnisse oder des Archetyps neu berechnet',
                'Die Perspektiven-basierte Berechnung sorgt für eine differenziertere Bewertung als nur der Archetyp allein'
            ]
        };
    }

    /**
     * Kurzform für AttributeSummaryCard
     */
    function getResonanzQuickHelp(rKey) {
        const info = {
            R1: {
                titel: 'R1 Leben (← Orientierung)',
                beschreibung: 'Misst Kohärenz zwischen deinen Bedürfnissen und dem Archetyp in den Kategorien: Existenz, Zuneigung, Muße, Intimität',
                formel: 'R1 = Ø(GFK-Score, Osho-Score, Pirsig-Score, Kink-Score)',
                einfluss: 'Wirkt auf Orientierungs-Score: O × wO × R1'
            },
            R2: {
                titel: 'R2 Philosophie (← Archetyp)',
                beschreibung: 'Misst Kohärenz zwischen deinen Bedürfnissen und dem Archetyp in den Kategorien: Freiheit, Teilnahme, Identität, Lebensplanung, Finanzen, Werte, Soziales, Praktisches',
                formel: 'R2 = Ø(GFK-Score, Osho-Score, Pirsig-Score, Kink-Score)',
                einfluss: 'Wirkt auf Archetyp-Score: A × wA × R2'
            },
            R3: {
                titel: 'R3 Dynamik (← Dominanz)',
                beschreibung: 'Misst Kohärenz zwischen deinen Bedürfnissen und dem Archetyp in den Kategorien: Dynamik (Kink), Sicherheit',
                formel: 'R3 = Ø(GFK-Score, Osho-Score, Pirsig-Score, Kink-Score)',
                einfluss: 'Wirkt auf Dominanz-Score: D × wD × R3'
            },
            R4: {
                titel: 'R4 Identität (← Geschlecht)',
                beschreibung: 'Misst Kohärenz zwischen deinen Bedürfnissen und dem Archetyp in den Kategorien: Verständnis, Erschaffen, Verbundenheit, Kommunikation',
                formel: 'R4 = Ø(GFK-Score, Osho-Score, Pirsig-Score, Kink-Score)',
                einfluss: 'Wirkt auf Geschlechts-Score: G × wG × R4'
            }
        };

        return info[rKey] || info.R1;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Formeln
        getMainFormula: getMainFormula,
        getRFactorFormula: getRFactorFormula,
        getNeedsMatchingFormula: getNeedsMatchingFormula,

        // Erklärungen
        getRFactorInfluenceExplanation: getRFactorInfluenceExplanation,
        getNeedsScoreExplanation: getNeedsScoreExplanation,

        // NEU: Resonanzfaktor-Berechnungslogik
        getResonanzCalculationExplanation: getResonanzCalculationExplanation,
        getResonanzQuickHelp: getResonanzQuickHelp
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageHelpTexts;
}
