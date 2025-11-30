/**
 * LOGOS TEXT GENERATOR
 * ====================
 * Dynamische, analytische Textgenerierung für die Tiage-Synthese
 *
 * Philosophische Grundlage:
 * - LOGOS (Pirsigs "klassische Qualität"): Analytisch, strukturiert, rational
 * - Der "Kopf" nach Osho - GFK-Kompetenz wird gemessen, Werte kategorisiert
 *
 * Ziel: Klare, präzise Texte mit fließenden Übergängen - sachlich, aber nicht kalt
 */

const LogosTextGenerator = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // ÜBERGANGSPHRASEN - Verbinden analytische Aussagen
    // ═══════════════════════════════════════════════════════════════════════════

    const transitions = {
        // Ergänzend/Aufzählend
        additive: [
            "Darüber hinaus",
            "Ergänzend dazu",
            "In diesem Zusammenhang",
            "Hinzu kommt",
            "Des Weiteren"
        ],
        // Folgernd/Kausal
        causal: [
            "Daraus ergibt sich",
            "Dies führt dazu, dass",
            "Entsprechend",
            "Folglich",
            "Dementsprechend"
        ],
        // Kontrastierend
        contrast: [
            "Andererseits",
            "Im Gegensatz dazu",
            "Gleichwohl",
            "Dessen ungeachtet",
            "Bei näherer Betrachtung"
        ],
        // Strukturierend
        structuring: [
            "Strukturell betrachtet",
            "Auf dieser Grundlage",
            "Im Rahmen dieser Dynamik",
            "Aus analytischer Sicht"
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: ICH/PARTNER BRINGT MIT (Logos-Perspektive)
    // ═══════════════════════════════════════════════════════════════════════════

    const personPhrases = {
        // Statische Qualität (Pirsig) - Hohe Werte (≥0.7)
        staticHigh: [
            "{name} operiert mit klaren Strukturen und definierten Werten – Verlässlichkeit bildet das Fundament.",
            "Die Beziehungsphilosophie von {name} basiert auf etablierten Mustern und bewährten Prinzipien.",
            "{name} priorisiert Stabilität und Kontinuität in der Beziehungsgestaltung.",
            "Für {name} sind klare Rahmenbedingungen und verbindliche Absprachen essenziell."
        ],
        // Statische Qualität - Mittlere Werte (0.4-0.69)
        staticMid: [
            "{name} balanciert zwischen Strukturbedürfnis und Anpassungsfähigkeit.",
            "Die Beziehungslogik von {name} kombiniert feste Prinzipien mit situativer Flexibilität.",
            "{name} schätzt Verlässlichkeit, ohne Veränderung grundsätzlich abzulehnen.",
            "Pragmatismus prägt den Ansatz von {name}: Struktur wo nötig, Offenheit wo möglich."
        ],
        // Statische Qualität - Niedrige Werte (<0.4)
        staticLow: [
            "{name} bevorzugt adaptive Strukturen gegenüber fixen Regelwerken.",
            "Flexibilität ist für {name} kein Kompromiss, sondern Grundprinzip.",
            "Die Beziehungslogik von {name} passt sich dem Kontext an – ohne festgeschriebene Normen.",
            "{name} definiert Beziehungsregeln situativ neu, statt sie vorab festzulegen."
        ],

        // Beziehungsphilosophie-Integration
        philosophyIntro: [
            "Die Beziehungsphilosophie lässt sich zusammenfassen: {philosophy}",
            "Grundlegend gilt für {name}: {philosophy}",
            "Das zugrundeliegende Prinzip: {philosophy}"
        ],

        // Kernwerte (strukturelle Darstellung)
        coreValuesIntro: [
            "Zentrale Werte sind {values} – diese bilden den Kompass für Beziehungsentscheidungen.",
            "Die Kernwerte {values} definieren, was {name} in Beziehungen priorisiert.",
            "{name} orientiert sich an den Leitwerten {values}."
        ],

        // Vermeidungsmuster
        avoidsIntro: [
            "Explizit vermieden werden: {avoids}.",
            "Als problematisch eingestuft: {avoids}.",
            "{name} grenzt sich klar ab von: {avoids}."
        ],

        // Präferenzen (strukturelle Aspekte)
        preferencesIntro: [
            "Strukturelle Präferenzen umfassen: {prefs}.",
            "Konkrete Rahmenparameter: {prefs}.",
            "Die bevorzugte Konfiguration: {prefs}."
        ],

        // GFK-Kompetenz (Logos-Perspektive: messbar, strukturiert)
        gfk: {
            hoch: [
                "{name} verfügt über hohe GFK-Kompetenz: Die vier Schritte (Beobachtung, Gefühl, Bedürfnis, Bitte) werden konsequent angewandt.",
                "Kommunikationsstruktur bei {name}: GFK-Niveau hoch – klare Trennung von Beobachtung und Bewertung.",
                "{name} kommuniziert nach GFK-Standard: Bedürfnisse werden benannt, nicht als Vorwürfe formuliert."
            ],
            mittel: [
                "{name} besitzt GFK-Grundkenntnisse, die unter Belastung nicht immer abrufbar sind.",
                "Kommunikationsstruktur bei {name}: GFK-Niveau mittel – Theorie bekannt, Praxis variabel.",
                "Die GFK-Kompetenz von {name} schwankt situationsabhängig."
            ],
            niedrig: [
                "{name} zeigt Entwicklungspotenzial in der Kommunikationsstruktur – reaktive Muster überwiegen.",
                "Kommunikationsstruktur bei {name}: GFK-Niveau niedrig – Urteile und Vorwürfe dominieren.",
                "Die Konfliktlösung bei {name} folgt eher reaktiven als strukturierten Mustern."
            ]
        },

        // Dominanz (strukturelle Rolle)
        dominance: {
            dominant: [
                "{name} übernimmt strukturell die führende Rolle – Entscheidungsinitiative liegt primär hier.",
                "Die Beziehungsdynamik wird von {name} aktiv gestaltet und gelenkt.",
                "{name} agiert als Strukturgeber in der Beziehungsarchitektur."
            ],
            submissiv: [
                "{name} präferiert eine empfangende, mitgehende Position in der Beziehungsstruktur.",
                "Die Rolle von {name} ist komplementär: Unterstützung statt Steuerung.",
                "{name} bringt Hingabefähigkeit als strukturellen Beitrag ein."
            ],
            switch: [
                "{name} wechselt flexibel zwischen führender und folgender Rolle.",
                "Rollenflexibilität kennzeichnet {name}: Kontextabhängige Positionierung.",
                "Die Beziehungsstruktur erlaubt {name} beide Positionen – je nach Situation."
            ],
            ausgeglichen: [
                "{name} strebt nach symmetrischer Rollenverteilung.",
                "Gleichwertigkeit ist das strukturelle Leitprinzip für {name}.",
                "{name} positioniert sich in der Mitte des Dominanz-Spektrums."
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: DARAUS ENTSTEHT (Synthese - analytisch)
    // ═══════════════════════════════════════════════════════════════════════════

    const synthesePhrases = {
        // Tonalitäts-Eröffnungen (sachlich, aber nicht kalt)
        openings: {
            positiv: [
                "Die strukturelle Kompatibilität dieser Konstellation bildet eine tragfähige Basis.",
                "Die Analyse zeigt hohe Übereinstimmung in den Grundparametern.",
                "Aus rationaler Perspektive ergänzen sich {ich} und {partner} konstruktiv.",
                "Die Beziehungsphilosophien beider Seiten weisen signifikante Schnittmengen auf.",
                "Die Grundstruktur dieser Verbindung ist als stabil zu bewerten."
            ],
            neutral: [
                "Die strukturelle Analyse zeigt sowohl Potenziale als auch Herausforderungen.",
                "Die Kompatibilität erfordert bewusste Arbeit an den Unterschieden.",
                "{ich} und {partner} bringen unterschiedliche, aber kombinierbare Strukturen mit.",
                "Die Beziehungsparameter liegen im mittleren Kompatibilitätsbereich.",
                "Das Ergebnis hängt wesentlich von der Kommunikationsqualität ab."
            ],
            negativ: [
                "Die strukturelle Analyse zeigt fundamentale Unterschiede in den Grundparametern.",
                "Die Kompatibilität erfordert erhebliche Anpassungsleistung beider Seiten.",
                "Die Beziehungsphilosophien von {ich} und {partner} divergieren grundlegend.",
                "Ohne aktive Aushandlung sind strukturelle Konflikte wahrscheinlich.",
                "Die Grundkonstellation erfordert klärende Gespräche über Erwartungen."
            ]
        },

        // Statische Qualitäts-Interaktion
        staticInteraction: {
            similar: [
                "Beide teilen ein ähnliches Strukturbedürfnis – dies erleichtert die Abstimmung von Rahmenparametern.",
                "Die Kompatibilität der Stabilitätspräferenzen ist hoch.",
                "Strukturell operieren beide auf vergleichbarer Ebene.",
                "Das gemeinsame Verständnis von Ordnung und Verlässlichkeit ist eine Stärke."
            ],
            complementary: [
                "Die unterschiedlichen Strukturbedürfnisse können sich gegenseitig ausbalancieren.",
                "Wo einer Stabilität einbringt, ermöglicht der andere Flexibilität.",
                "Die Differenz in den Ordnungspräferenzen kann zur Bereicherung werden.",
                "Komplementäre Strukturbedürfnisse: Einer ankert, einer exploriert."
            ],
            challenging: [
                "Die verschiedenen Vorstellungen von Struktur erfordern explizite Kommunikation.",
                "Unterschiedliche Stabilitätspräferenzen können zu Reibung führen.",
                "Die Diskrepanz in den Ordnungsbedürfnissen ist ein Entwicklungsfeld.",
                "Strukturkonflikte sind wahrscheinlich ohne klare Aushandlung."
            ]
        },

        // Werte-Analyse
        valueAnalysis: {
            shared: [
                "Geteilte Werte wie {values} bilden ein stabiles Fundament für Verständigung.",
                "Die Werteschnittmenge ({values}) ermöglicht gemeinsame Orientierung.",
                "Übereinstimmung bei {values} schafft strukturelle Gemeinsamkeit."
            ],
            conflict: [
                "Potenzieller Wertekonflikt: {ich} priorisiert '{value1}', was {partner} tendenziell meidet.",
                "Strukturelle Spannung durch unterschiedliche Wertehierarchien ist zu erwarten.",
                "Die Wertekonstellation zeigt Konfliktpotenzial bei '{value1}'."
            ],
            different: [
                "Die Wertesysteme überlappen wenig – dies erfordert aktive Brückenarbeit.",
                "Unterschiedliche Wertepriorisierung macht explizite Aushandlung notwendig."
            ]
        },

        // Dominanz-Dynamik (strukturell)
        dominanceInteraction: {
            komplementaer: [
                "Die Dominanz-Struktur ist komplementär – klare Rollenverteilung erleichtert Navigation.",
                "Die asymmetrische Rollenkonfiguration ermöglicht eindeutige Zuständigkeiten.",
                "Strukturell ergänzen sich führende und folgende Position optimal."
            ],
            aehnlich: [
                "Ähnliche Dominanz-Positionen erfordern bewusste Rollenaushandlung.",
                "Ohne natürliche Rollendifferenzierung sind Kompetenzüberschneidungen möglich.",
                "Die symmetrische Dominanz-Struktur braucht explizite Aufgabenteilung."
            ],
            flexibel: [
                "Die Rollenflexibilität ermöglicht situative Anpassung.",
                "Mindestens ein Switch-Anteil erhöht die strukturelle Adaptivität.",
                "Die Dominanz-Dynamik kann kontextabhängig konfiguriert werden."
            ]
        },

        // GFK-Synthese (Kommunikationsstruktur)
        gfkInteraction: {
            beide_hoch: [
                "Die beidseitig hohe GFK-Kompetenz ermöglicht strukturierte Konfliktlösung.",
                "Kommunikationsstruktur: Beide können Bedürfnisse klar artikulieren – gute Prognose.",
                "Das kommunikative Werkzeug ist auf beiden Seiten vorhanden."
            ],
            gemischt: [
                "Die unterschiedlichen GFK-Niveaus erfordern Geduld des kompetenteren Parts.",
                "Kommunikations-Asymmetrie: Der GFK-Versierte kann Brücken bauen.",
                "Das Gefälle in der Kommunikationsstruktur ist ein Lernfeld."
            ],
            beide_niedrig: [
                "Beidseitig niedrige GFK-Kompetenz erhöht das Eskalationsrisiko.",
                "Kommunikationsstruktur: Entwicklungsfeld für beide Seiten.",
                "Ohne Investment in Kommunikationsfähigkeiten sind Konflikte schwer zu lösen."
            ]
        },

        // Kategorie-basierte Aussagen
        categories: {
            A: {
                positiv: "Die Beziehungsphilosophien sind kompatibel.",
                negativ: "Fundamentale Unterschiede in der Beziehungsphilosophie erfordern Klärung."
            },
            B: {
                positiv: "Die Lebensstil-Kompatibilität ist gegeben.",
                negativ: "Unterschiedliche Lebensstil-Vorstellungen können zu Reibung führen."
            },
            C: {
                positiv: "Die Kommunikationskompatibilität unterstützt die Verbindung.",
                negativ: "Kommunikationsmuster divergieren – hier liegt Entwicklungsbedarf."
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: RESONANZ (Logos-Perspektive)
    // ═══════════════════════════════════════════════════════════════════════════

    const resonanzPhrases = {
        // Sehr hohe Resonanz (R ≥ 1.08)
        harmonie: [
            "Resonanz-Koeffizient R={r}: Hohe Übereinstimmung zwischen rationaler und emotionaler Ebene. Die Struktur trägt.",
            "Bei R={r} zeigt die Analyse: Logos und Pathos sind synchronisiert – eine stabile Konfiguration.",
            "Der Resonanzwert von {r} indiziert hohe Kohärenz zwischen Denken und Fühlen.",
            "R={r} bedeutet: Die Verbindung ist auf mehreren Ebenen fundiert."
        ],
        // Gute Resonanz (R 1.02-1.07)
        resonanz: [
            "Resonanz-Koeffizient R={r}: Gute Abstimmung der rationalen und emotionalen Parameter.",
            "Bei R={r} ist die Grundstruktur solide – Kopf und Herz sprechen ähnliche Sprachen.",
            "Der Resonanzwert {r} zeigt eine funktionierende Balance.",
            "R={r}: Die Kompatibilität ist auf beiden Ebenen gegeben."
        ],
        // Neutrale Resonanz (R 0.98-1.01)
        neutral: [
            "Resonanz-Koeffizient R={r}: Neutraler Bereich – weder starke Anziehung noch Abstoßung.",
            "Bei R={r} ist das Ergebnis offen – die Qualität wird durch bewusste Gestaltung bestimmt.",
            "Der Resonanzwert {r} zeigt: Hier entscheidet die Arbeit an der Beziehung.",
            "R={r}: Die Grundkonstellation ist neutral – Potenzial muss aktiv entwickelt werden."
        ],
        // Leichte Spannung (R 0.93-0.97)
        spannung: [
            "Resonanz-Koeffizient R={r}: Leichte Diskrepanz zwischen rationaler und emotionaler Bewertung.",
            "Bei R={r} zeigen sich Unterschiede – bewusste Kommunikation ist erforderlich.",
            "Der Resonanzwert {r} indiziert ein Spannungsfeld zwischen Logos und Pathos.",
            "R={r}: Die unterschiedlichen Ebenen erfordern Brückenarbeit."
        ],
        // Dissonanz (R < 0.93)
        dissonanz: [
            "Resonanz-Koeffizient R={r}: Deutliche Diskrepanz zwischen rationalen und emotionalen Parametern.",
            "Bei R={r} ist die Grundstruktur herausfordernd – erhebliche Anpassungsleistung erforderlich.",
            "Der Resonanzwert {r} zeigt: Kopf und Herz bewerten diese Verbindung unterschiedlich.",
            "R={r}: Ohne aktive Arbeit an den Unterschieden ist die Prognose zurückhaltend."
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // GEMEINSAME WERTE - Phrasen
    // ═══════════════════════════════════════════════════════════════════════════

    const sharedValuesPhrases = {
        intro: [
            "Die gemeinsame Wertebasis umfasst: {values}. Dies schafft strukturelle Anknüpfungspunkte.",
            "Übereinstimmung bei den Werten {values} bildet ein stabiles Fundament.",
            "Die geteilten Leitwerte ({values}) ermöglichen gemeinsame Orientierung.",
            "Strukturelle Gemeinsamkeit durch geteilte Werte: {values}."
        ],
        connecting: [
            "Diese Schnittmenge ist tragfähig.",
            "Hier liegt die Basis für Verständigung.",
            "Darauf lässt sich aufbauen."
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Wählt deterministisch aber variabel eine Phrase aus einem Array
     */
    function selectPhrase(phrases, seed) {
        if (!phrases || phrases.length === 0) return '';
        const index = Math.abs(seed) % phrases.length;
        return phrases[index];
    }

    /**
     * Ersetzt Variablen in einer Phrase
     */
    function fillVariables(phrase, vars) {
        if (!phrase) return '';
        let result = phrase;
        for (const [key, value] of Object.entries(vars)) {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        return result;
    }

    /**
     * Verbindet Sätze mit analytischen Übergangsphrasen
     */
    function connectSentences(sentences, seed) {
        if (!sentences || sentences.length === 0) return '';
        if (sentences.length === 1) return sentences[0];

        let result = sentences[0];

        for (let i = 1; i < sentences.length; i++) {
            const sentence = sentences[i];
            if (!sentence) continue;

            // Wähle passende Übergangsphrase
            let transitionType;
            if (i === sentences.length - 1) {
                transitionType = 'causal';
            } else if (i % 3 === 0) {
                transitionType = 'structuring';
            } else if (i % 2 === 0) {
                transitionType = 'additive';
            } else {
                transitionType = 'contrast';
            }

            const transitionOptions = transitions[transitionType];
            const transition = selectPhrase(transitionOptions, seed + i * 7);

            // Verbinde Sätze
            result += ` ${transition} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
        }

        return result;
    }

    /**
     * Erzeugt einen Hash für deterministische Varianz
     */
    function generateHash(arch1, arch2, dom1, dom2, score) {
        const str = `logos_${arch1}_${arch2}_${dom1}_${dom2}_${Math.floor(score / 10)}`;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generiert analytischen Text für "ICH/PARTNER BRINGT MIT"
     */
    function generatePersonText(archetype, dimensions, name, seed) {
        const parts = [];
        const vars = { name: name };

        // 1. Statische Qualität (Pirsig)
        if (archetype?.pirsig?.staticQuality !== undefined) {
            const statQual = archetype.pirsig.staticQuality;
            let phrases;
            if (statQual >= 0.7) {
                phrases = personPhrases.staticHigh;
            } else if (statQual >= 0.4) {
                phrases = personPhrases.staticMid;
            } else {
                phrases = personPhrases.staticLow;
            }
            parts.push(fillVariables(selectPhrase(phrases, seed), vars));
        }

        // 2. Beziehungsphilosophie (wenn vorhanden und lang genug)
        if (archetype?.pirsig?.interpretation && archetype.pirsig.interpretation.length > 50) {
            const philosophy = archetype.pirsig.interpretation.split('.')[0] + '.';
            vars.philosophy = philosophy;
            // Direkt einfügen ohne extra Intro für Kürze
        }

        // 3. Kernwerte
        if (archetype?.coreValues?.length >= 2) {
            const values = archetype.coreValues.slice(0, 3).join(', ');
            vars.values = values;
            parts.push(fillVariables(selectPhrase(personPhrases.coreValuesIntro, seed + 3), vars));
        }

        // 4. Vermeidungsmuster
        if (archetype?.avoids?.length >= 2) {
            const avoids = archetype.avoids.slice(0, 2).join(' und ');
            vars.avoids = avoids;
            parts.push(fillVariables(selectPhrase(personPhrases.avoidsIntro, seed + 5), vars));
        }

        // 5. Dominanz-Rolle
        const dom = dimensions?.dominanz;
        if (dom && personPhrases.dominance[dom]) {
            parts.push(fillVariables(selectPhrase(personPhrases.dominance[dom], seed + 7), vars));
        }

        // 6. GFK-Kompetenz
        const gfk = dimensions?.gfk;
        if (gfk && personPhrases.gfk[gfk]) {
            parts.push(fillVariables(selectPhrase(personPhrases.gfk[gfk], seed + 11), vars));
        }

        // Verbinde mit analytischen Übergängen (max 4 Sätze)
        const selectedParts = parts.slice(0, 4);
        return connectSentences(selectedParts, seed);
    }

    /**
     * Generiert analytischen Text für "DARAUS ENTSTEHT" (Synthese)
     */
    function generateSyntheseText(config) {
        const {
            ichArch, partnerArch,
            ichName, partnerName,
            ichDimensions, partnerDimensions,
            overallScore,
            archStatements,
            categoryScores,
            seed
        } = config;

        const parts = [];
        const vars = { ich: ichName, partner: partnerName };

        // 1. Tonalitäts-Eröffnung
        const tonality = getTonality(overallScore);
        const opening = fillVariables(
            selectPhrase(synthesePhrases.openings[tonality], seed),
            vars
        );
        parts.push(opening);

        // 2. Archetyp-Statement (aus bestehender Bibliothek)
        if (archStatements?.logos) {
            const gemeinsam = archStatements.logos.gemeinsam || [];
            const unterschied = archStatements.logos.unterschied || [];
            const all = tonality === 'negativ' ? [...gemeinsam, ...unterschied] : gemeinsam;
            const archStatement = selectPhrase(all.length > 0 ? all : unterschied, seed + 7);
            if (archStatement) parts.push(archStatement);
        }

        // 3. Statische Qualitäts-Interaktion
        const ichStat = ichArch?.pirsig?.staticQuality || 0.5;
        const partnerStat = partnerArch?.pirsig?.staticQuality || 0.5;
        const statDiff = Math.abs(ichStat - partnerStat);

        let statPhrases;
        if (statDiff < 0.2) {
            statPhrases = synthesePhrases.staticInteraction.similar;
        } else if (statDiff > 0.4 && tonality !== 'positiv') {
            statPhrases = synthesePhrases.staticInteraction.challenging;
        } else {
            statPhrases = synthesePhrases.staticInteraction.complementary;
        }
        parts.push(selectPhrase(statPhrases, seed + 13));

        // 4. Werte-Analyse
        if (ichArch?.coreValues && partnerArch?.coreValues) {
            const sharedValues = ichArch.coreValues.filter(v => partnerArch.coreValues.includes(v));
            if (sharedValues.length > 0) {
                vars.values = sharedValues.slice(0, 2).join(' und ');
                parts.push(fillVariables(selectPhrase(synthesePhrases.valueAnalysis.shared, seed + 17), vars));
            } else {
                // Konfliktpotenzial prüfen
                const conflicts = ichArch.coreValues.filter(v => partnerArch.avoids?.includes(v));
                if (conflicts.length > 0) {
                    vars.value1 = conflicts[0];
                    parts.push(fillVariables(selectPhrase(synthesePhrases.valueAnalysis.conflict, seed + 17), vars));
                }
            }
        }

        // 5. Dominanz-Dynamik
        const ichDom = ichDimensions?.dominanz;
        const partnerDom = partnerDimensions?.dominanz;
        if (ichDom && partnerDom) {
            const isKomplementaer =
                (ichDom === 'dominant' && partnerDom === 'submissiv') ||
                (ichDom === 'submissiv' && partnerDom === 'dominant');
            const isFlexibel = ichDom === 'switch' || partnerDom === 'switch';

            let domPhrases;
            if (isKomplementaer) {
                domPhrases = synthesePhrases.dominanceInteraction.komplementaer;
            } else if (isFlexibel) {
                domPhrases = synthesePhrases.dominanceInteraction.flexibel;
            } else {
                domPhrases = synthesePhrases.dominanceInteraction.aehnlich;
            }
            parts.push(selectPhrase(domPhrases, seed + 23));
        }

        // 6. GFK-Kommunikationsstruktur
        const ichGfk = ichDimensions?.gfk;
        const partnerGfk = partnerDimensions?.gfk;
        if (ichGfk && partnerGfk) {
            let gfkPhrases;
            if (ichGfk === 'hoch' && partnerGfk === 'hoch') {
                gfkPhrases = synthesePhrases.gfkInteraction.beide_hoch;
            } else if (ichGfk === 'niedrig' && partnerGfk === 'niedrig') {
                gfkPhrases = synthesePhrases.gfkInteraction.beide_niedrig;
            } else {
                gfkPhrases = synthesePhrases.gfkInteraction.gemischt;
            }
            parts.push(selectPhrase(gfkPhrases, seed + 29));
        }

        // Begrenze auf 5 Sätze für guten Fluss
        const selectedParts = parts.slice(0, 5);
        return connectSentences(selectedParts, seed);
    }

    /**
     * Generiert analytischen Text für "GEMEINSAME WERTE"
     */
    function generateSharedValuesText(sharedValues, seed) {
        if (!sharedValues || sharedValues.length === 0) return '';

        const valueLabels = sharedValues
            .slice(0, 3)
            .map(v => v.label || v)
            .join(', ');

        const vars = { values: valueLabels };
        const intro = fillVariables(selectPhrase(sharedValuesPhrases.intro, seed), vars);
        const connecting = selectPhrase(sharedValuesPhrases.connecting, seed + 3);

        return `${intro} ${connecting}`;
    }

    /**
     * Generiert analytischen Resonanz-Text
     */
    function generateResonanzText(R, seed) {
        if (R === undefined || R === null) return '';

        const rFormatted = R.toFixed(2);
        const vars = { r: rFormatted };

        let phrases;
        if (R >= 1.08) {
            phrases = resonanzPhrases.harmonie;
        } else if (R >= 1.02) {
            phrases = resonanzPhrases.resonanz;
        } else if (R >= 0.98) {
            phrases = resonanzPhrases.neutral;
        } else if (R >= 0.93) {
            phrases = resonanzPhrases.spannung;
        } else {
            phrases = resonanzPhrases.dissonanz;
        }

        return fillVariables(selectPhrase(phrases, seed), vars);
    }

    /**
     * Hilfsfunktion: Bestimmt Tonalität basierend auf Score
     */
    function getTonality(score) {
        if (score >= 70) return 'positiv';
        if (score >= 40) return 'neutral';
        return 'negativ';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        generatePersonText,
        generateSyntheseText,
        generateSharedValuesText,
        generateResonanzText,
        generateHash,
        selectPhrase,
        fillVariables,

        // Expose für erweiterte Nutzung
        phrases: {
            person: personPhrases,
            synthese: synthesePhrases,
            resonanz: resonanzPhrases,
            sharedValues: sharedValuesPhrases,
            transitions
        }
    };
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogosTextGenerator;
}
