/**
 * TIAGE App - Main Application Logic
 * Extracted from archetype-interaction.html for modularization
 *
 * Contents:
 * - Modal Management
 * - UI Interactions
 * - Core Application Logic
 *
 * (c) 2025 Ti-age.de - All rights reserved
 */

        // ========================================
        // MAIN APPLICATION
        // ========================================

        let data = null;
        let currentArchetype = 'single';
        let selectedPartner = 'duo';

        // ═══════════════════════════════════════════════════════════════════════
        // GEWICHTUNGS-KONSTANTEN (müssen vor getGewichtungen() definiert sein)
        // ═══════════════════════════════════════════════════════════════════════
        const GEWICHTUNG_DEFAULTS = { O: 40, A: 25, D: 20, G: 15 };
        const GEWICHTUNG_STORAGE_KEY = 'tiage_faktor_gewichtungen';
        const GEWICHTUNG_LOCK_KEY = 'tiage_faktor_locks';
        const GEWICHTUNG_SUMME_LOCK_KEY = 'tiage_summe_lock';

        // Faktor-Mapping für Gewichtungen (muss vor den Funktionen definiert sein, die es verwenden)
        const FAKTOR_MAP = {
            orientierung: { inputId: 'gewicht-orientierung', key: 'O' },
            archetyp: { inputId: 'gewicht-archetyp', key: 'A' },
            dominanz: { inputId: 'gewicht-dominanz', key: 'D' },
            geschlecht: { inputId: 'gewicht-geschlecht', key: 'G' }
        };

        // Lock-Status für Gewichtungen (muss vor den Funktionen definiert sein, die es verwenden)
        let gewichtungLocks = { orientierung: false, archetyp: false, dominanz: false, geschlecht: false };

        // Summen-Lock-Status (fixiert Summe auf 100%)
        let summeLocked = true; // Standardmäßig aktiviert

        // Modal-Kontext für Profile Review (muss vor openProfileReviewModal() definiert sein)
        var currentProfileReviewContext = { archetypeKey: null, person: null };

        // Gewichtung initialization flag (muss vor initGewichtungInputs() definiert sein)
        var gewichtungInitialized = false;

        // Legacy personDimensions - now a reference to TiageState for backward compatibility
        // TODO: Remove after full migration to TiageState
        const personDimensions = {
            ich: {
                geschlecht: {
                    primary: null,    // Primäre Geschlechtsidentität (P)
                    secondary: null   // Sekundäre Geschlechtsidentität (S)
                },
                dominanz: {
                    primary: null,    // Primäre Dominanz (P)
                    secondary: null   // Sekundäre Dominanz (S)
                },
                orientierung: {
                    primary: null,    // Primäre Orientierung (P)
                    secondary: null   // Sekundäre Orientierung (S)
                },
                gfk: null             // GFK-Kompetenz: niedrig, mittel, hoch
            },
            partner: {
                geschlecht: {
                    primary: null,
                    secondary: null
                },
                dominanz: {
                    primary: null,
                    secondary: null
                },
                orientierung: {
                    primary: null,
                    secondary: null
                },
                gfk: null             // GFK-Kompetenz: niedrig, mittel, hoch
            }
        };

        // Dimension tooltip content
        const dimensionTooltips = {
            geschlecht: {
                title: "Geschlecht",
                text: "Dein Geschlecht. Dies beeinflusst die körperliche Anziehung zusammen mit der sexuellen Orientierung."
            },
            dominanz: {
                title: "Dominanz-Präferenz",
                text: "Welche Rolle bevorzugst du in der emotionalen und praktischen Beziehungsdynamik?\n\n• <span style=\"color: #e74c3c; font-weight: bold;\">Dominant</span>: Du übernimmst gerne Führung und Verantwortung\n• <span style=\"color: #e74c3c; font-weight: bold;\">Submissiv</span>: Du lässt dich gerne führen und vertraust auf deinen Partner\n• <span style=\"color: #e74c3c; font-weight: bold;\">Switch</span>: Du genießt beide Rollen je nach Situation\n• <span style=\"color: #e74c3c; font-weight: bold;\">Ausgeglichen</span>: Du bevorzugst eine gleichberechtigte Dynamik ohne feste Rollen\n\nDie Dominanz-Harmonie beeinflusst die energetische Dynamik einer Beziehung. Komplementäre Präferenzen (z.B. dominant + submissiv) können starke Anziehung erzeugen."
            },
            orientierung: {
                title: "Sexuelle Orientierung",
                text: "Zu welchem Geschlecht fühlst du dich romantisch und/oder sexuell hingezogen?\n\n• Heterosexuell: Anziehung zum anderen Geschlecht\n• Homosexuell: Anziehung zum gleichen Geschlecht\n• Bi-/Pansexuell: Anziehung zu mehreren oder allen Geschlechtern\n\nDie sexuelle Orientierung beeinflusst, ob eine körperliche/romantische Anziehung zwischen zwei Personen möglich ist. Bei inkompatiblen Orientierungen zeigt das Modell dies als Blocker an."
            },
            status: {
                title: "Orientierungs-Status",
                text: "Gelebt: Du lebst diese Orientierung und bist dir sicher.\n\nInteressiert: Du bist neugierig oder in einer Explorationsphase. Die tatsächliche Anziehung ist noch unklar."
            },
            dominanzStatus: {
                title: "Dominanz-Status",
                text: "Gelebt: Du kennst deine Dominanz-Präferenz und lebst sie aktiv. Die Werte des psychologischen Profils treffen mit hoher Wahrscheinlichkeit zu.\n\nInteressiert: Du bist noch am Erkunden oder unsicher über deine Präferenz. Die Konfidenz der Profilaussagen ist reduziert (höhere Varianz in deinem Verhalten).\n\nWissenschaftliche Basis: Big Five Forschung zeigt, dass Menschen in Explorationsphasen konsistent höhere Verhaltensvarianzen aufweisen (McCrae & Costa, 1997)."
            },
            // Einzelne Dominanz-Typen
            dominant: {
                title: "Dominant",
                text: "<strong>Der Führende</strong>\n\nDu übernimmst gerne Führung und Verantwortung in Beziehungen.\n\n<strong>Merkmale:</strong> Assertiv, führend, selbstsicher, bestimmend, proaktiv, entschlossen\n\n<strong>Kommunikation:</strong> Direkt und unverblümt. Konflikte werden aktiv angegangen, nicht vermieden.\n\n<strong>Energie:</strong> Hoch, spontan, leidenschaftlich. Erholt sich schnell von Konflikten.\n\n<em>Pirsig:</em> Dominanz als dynamische Kraft, die statische Muster durchbricht.\n<em>OSHO:</em> Yang-Energie – natürlich wenn sie aus Bewusstsein kommt, nicht aus Ego."
            },
            submissiv: {
                title: "Submissiv",
                text: "<strong>Der Folgende</strong>\n\nDu lässt dich gerne führen und vertraust auf deinen Partner.\n\n<strong>Merkmale:</strong> Anpassungsfähig, folgend, empathisch, dienend, harmonieorientiert, geduldig\n\n<strong>Kommunikation:</strong> Indirekt und diplomatisch. Konflikte werden eher vermieden oder sanft angesprochen.\n\n<strong>Energie:</strong> Mittel, präferiert Planung. Braucht Zeit zur Erholung nach Konflikten.\n\n<em>Pirsig:</em> Submissivität als statisches Muster, das Stabilität schafft.\n<em>OSHO:</em> Yin-Energie – Empfangen ist genauso wertvoll wie Geben."
            },
            switch: {
                title: "Switch",
                text: "<strong>Der Flexible</strong>\n\nDu genießt beide Rollen je nach Situation und Partner.\n\n<strong>Merkmale:</strong> Flexibel, wandelbar, vielseitig, situativ, kommunikativ, experimentierfreudig\n\n<strong>Kommunikation:</strong> Situativ angepasst – kann sowohl direkt als auch diplomatisch sein.\n\n<strong>Energie:</strong> Hoch und flexibel. Kann sich schnell an verschiedene Situationen anpassen.\n\n<em>Pirsig:</em> Balance zwischen statisch und dynamisch – höchste Adaptivität.\n<em>OSHO:</em> Die Vereinigung von Yin und Yang. Der erleuchtete Mensch trägt beide Polaritäten."
            },
            ausgeglichen: {
                title: "Ausgeglichen",
                text: "<strong>Der Zentrierte</strong>\n\nDu bevorzugst eine gleichberechtigte Dynamik ohne feste Rollen.\n\n<strong>Merkmale:</strong> Balanciert, harmonisch, stabil, ruhig, besonnen, gemäßigt\n\n<strong>Kommunikation:</strong> Ruhig und konstruktiv. Feedback ist ausgewogen zwischen direkt und diplomatisch.\n\n<strong>Energie:</strong> Mittel und stabil – weder übermäßig spontan noch übermäßig planend.\n\n<em>Pirsig:</em> Wahre Balance zwischen statisch und dynamisch.\n<em>OSHO:</em> Jenseits von Yin und Yang – die transzendierte Mitte."
            },
            // GFK (Gewaltfreie Kommunikation)
            gfk: {
                title: "GFK-Kompetenz",
                text: "<strong>Gewaltfreie Kommunikation nach Marshall Rosenberg</strong>\n\nWie gut beherrschst du die Prinzipien der Gewaltfreien Kommunikation?\n\n• <strong>Niedrig:</strong> Tendenz zu Vorwürfen, Urteilen, Schuldzuweisungen. Schwierigkeiten, Bedürfnisse klar zu benennen.\n\n• <strong>Mittel:</strong> Grundkenntnisse vorhanden. Kann in ruhigen Momenten GFK anwenden, fällt unter Stress in alte Muster zurück.\n\n• <strong>Hoch:</strong> Konsequente Anwendung der 4 Schritte: Beobachtung, Gefühl, Bedürfnis, Bitte. Empathisches Zuhören auch in Konflikten.\n\n<em>Pirsig:</em> GFK als dynamische Qualität – die Fähigkeit, im Moment präsent zu kommunizieren.\n<em>OSHO:</em> Wahre Kommunikation entsteht ohne Ego – GFK ist ein Werkzeug dafür."
            },
            gfk_niedrig: {
                title: "GFK: Niedrig",
                text: "<strong>Geringe GFK-Kompetenz</strong>\n\nKommunikation basiert oft auf:\n• Vorwürfen und Schuldzuweisungen\n• Urteilen und Bewertungen\n• Forderungen statt Bitten\n• Schwierigkeiten, eigene Bedürfnisse zu erkennen\n\n<strong>In Beziehungen:</strong> Konflikte eskalieren häufiger. Missverständnisse sind alltäglich. Verletzungen entstehen unbeabsichtigt.\n\n<strong>Potenzial:</strong> GFK kann gelernt werden. Bewusstsein ist der erste Schritt."
            },
            gfk_mittel: {
                title: "GFK: Mittel",
                text: "<strong>Mittlere GFK-Kompetenz</strong>\n\nKommunikation zeigt:\n• Grundverständnis der 4 Schritte (Beobachtung, Gefühl, Bedürfnis, Bitte)\n• Fähigkeit zur Selbstreflexion\n• In ruhigen Momenten empathisches Zuhören\n• Unter Stress Rückfall in alte Muster\n\n<strong>In Beziehungen:</strong> Gute Basis für konstruktive Gespräche. Konflikte können gelöst werden, wenn beide bereit sind.\n\n<strong>Wachstum:</strong> Übung unter Druck vertieft die Kompetenz."
            },
            gfk_hoch: {
                title: "GFK: Hoch",
                text: "<strong>Hohe GFK-Kompetenz</strong>\n\nKommunikation geprägt von:\n• Konsequente Anwendung der 4 Schritte\n• Empathisches Zuhören auch in Konflikten\n• Fähigkeit, hinter Vorwürfe zu hören\n• Klare Unterscheidung: Beobachtung vs. Bewertung\n• Verbindung zu eigenen und fremden Bedürfnissen\n\n<strong>In Beziehungen:</strong> Tiefe Verbindung durch echtes Verstehen. Konflikte werden zu Wachstumschancen.\n\n<em>OSHO:</em> Kommunikation ohne Ego ist Meditation in Aktion."
            },
            // Einzelne Orientierungen
            heterosexuell: {
                title: "Heterosexuell",
                text: "<strong>Anziehung zum anderen Geschlecht</strong>\n\nDu fühlst dich romantisch und/oder sexuell zu Menschen des anderen Geschlechts hingezogen.\n\n<strong>Forschung:</strong> Die häufigste sexuelle Orientierung. Studien zeigen tendentiell traditionellere Wertorientierung."
            },
            homosexuell: {
                title: "Homosexuell",
                text: "<strong>Anziehung zum gleichen Geschlecht</strong>\n\nDu fühlst dich romantisch und/oder sexuell zu Menschen des gleichen Geschlechts hingezogen.\n\n<strong>Forschung:</strong> Höhere Offenheit für neue Erfahrungen (Allen et al., 2020). Tendentiell weniger traditionelle Wertorientierung."
            },
            bisexuell: {
                title: "Bisexuell",
                text: "<strong>Anziehung zu beiden Geschlechtern</strong>\n\nDu fühlst dich romantisch und/oder sexuell zu Menschen beider Geschlechter hingezogen.\n\n<strong>Forschung:</strong> Höchste Offenheit aller Orientierungen (Allen et al., 2020). Am experimentierfreudigsten und am wenigsten traditionell."
            }
        };

        const icons = {
            single: '★',
            duo: '♡',
            duo_flex: '⚡',
            solopoly: '◆',
            polyamor: '♥',
            ra: '∞',
            lat: '⌂',
            aromantisch: '◇'
        };

        const categoryNames = {
            A: 'Beziehungsphilosophie',
            B: 'Werte-Alignment',
            C: 'Nähe-Distanz',
            D: 'Autonomie',
            E: 'Kommunikation',
            F: 'Soziale Kompatibilität'
        };

        // ═══════════════════════════════════════════════════════════════════════
        // MICRO-STATEMENTS DATABASE REFERENCES
        // Philosophische Grundlage: Pirsig (MOQ) + OSHO
        //
        // Alle Micro-Statements werden aus externen Dateien geladen:
        // - statements/archetypeStatements.js (Archetyp-Kombinationen DE)
        // - statements/archetypeStatements_EN.js (Archetyp-Kombinationen EN)
        // - statements/dominanceStatements.js (Dominanz-Kombinationen)
        // - statements/orientationStatements.js (Orientierungs-Kombinationen)
        // - statements/statusStatements.js (Status-Kombinationen)
        // - statements/gfkStatements.js (GFK-Kombinationen)
        // ═══════════════════════════════════════════════════════════════════════

        // Fallback-Definitionen falls externe Dateien nicht geladen wurden
        if (typeof window.archetypeStatements === 'undefined') {
            console.warn('archetypeStatements nicht geladen - verwende leeres Objekt');
            window.archetypeStatements = {};
        }
        if (typeof window.dominanceStatements === 'undefined') {
            console.warn('dominanceStatements nicht geladen - verwende leeres Objekt');
            window.dominanceStatements = {};
        }
        if (typeof window.orientationStatements === 'undefined') {
            console.warn('orientationStatements nicht geladen - verwende leeres Objekt');
            window.orientationStatements = {};
        }
        if (typeof window.statusStatements === 'undefined') {
            console.warn('statusStatements nicht geladen - verwende leeres Objekt');
            window.statusStatements = {};
        }
        if (typeof window.gfkStatements === 'undefined') {
            console.warn('gfkStatements nicht geladen - verwende leeres Objekt');
            window.gfkStatements = {};
        }

        // Legacy-Referenzen für Rückwärtskompatibilität mit altem Code
        // Die Statements sind jetzt globale Objekte aus den externen Dateien
        const orientierungStatements = window.orientationStatements;

        // Hilfsfunktion: Hole Statements für Archetyp-Kombination
        // Verwendet je nach Sprache die deutsche oder englische Version
        function getArchetypeStatements(type1, type2) {
            const key = `${type1}_${type2}`;
            const lang = typeof TiageI18n !== 'undefined' ? TiageI18n.getLanguage() : 'de';

            // Wähle die richtige Statement-Quelle basierend auf der Sprache
            if (lang === 'en' && typeof archetypeStatements_EN !== 'undefined') {
                return archetypeStatements_EN[key] || archetypeStatements[key] || null;
            }
            return archetypeStatements[key] || null;
        }

        // Hilfsfunktion: Hole Statements für Dominanz-Kombination
        function getDominanceStatements(dom1, dom2) {
            // Extrahiere primäre Dominanz aus Multi-Select-Objekt
            const getPrimaryDominance = (dom) => {
                if (typeof dom === 'string') return dom;
                if (typeof dom === 'object' && dom !== null) {
                    // New format: { primary: 'dominant', secondary: 'submissiv' }
                    if ('primary' in dom) {
                        return dom.primary || null;
                    }
                    // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
                    // Priorität: gelebt > interessiert
                    for (const key of ['dominant', 'submissiv', 'switch', 'ausgeglichen']) {
                        if (dom[key] === 'gelebt') return key;
                    }
                    for (const key of ['dominant', 'submissiv', 'switch', 'ausgeglichen']) {
                        if (dom[key] === 'interessiert') return key;
                    }
                }
                return null;
            };

            const d1 = getPrimaryDominance(dom1);
            const d2 = getPrimaryDominance(dom2);

            if (!d1 || !d2) return dominanceStatements.default;
            const key = `${d1}_${d2}`;
            return dominanceStatements[key] || dominanceStatements.default;
        }

        // Hilfsfunktion: Hole Statements für Orientierungs-Kombination
        // Berücksichtigt Orientierung UND Geschlecht für korrekte Kompatibilitätsbewertung
        function getOrientierungStatements(orient1, orient2, geschlecht1, geschlecht2) {
            // Default wenn Daten fehlen
            if (!orient1 || !orient2 || !geschlecht1 || !geschlecht2) {
                return orientierungStatements.default;
            }

            // Extract effective gender identity (handles Trans transformation)
            const extractEffectiveGender = (geschlecht) => {
                if (!geschlecht) return null;
                if (typeof geschlecht === 'object' && 'primary' in geschlecht) {
                    const primary = geschlecht.primary;
                    const secondary = geschlecht.secondary;
                    if (secondary) {
                        if (secondary === 'cis') return primary;
                        if (secondary === 'trans') {
                            if (primary === 'mann') return 'frau';
                            if (primary === 'frau') return 'mann';
                            return primary;
                        }
                        if (['nonbinaer', 'fluid', 'suchend'].includes(secondary)) return secondary;
                        return secondary;
                    }
                    return primary || null;
                }
                if (typeof geschlecht === 'string') return geschlecht;
                return null;
            };

            let g1 = extractEffectiveGender(geschlecht1);
            let g2 = extractEffectiveGender(geschlecht2);

            // Extrahiere primäre Orientierung aus Multi-Select-Objekt
            const getPrimaryOrientation = (orient) => {
                if (typeof orient === 'string') return orient;
                if (typeof orient === 'object') {
                    // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                    if ('primary' in orient) {
                        return orient.primary;
                    }
                    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                    // Priorität: gelebt > interessiert
                    for (const key of ['heterosexuell', 'homosexuell', 'bisexuell']) {
                        if (orient[key] === 'gelebt') return key;
                    }
                    for (const key of ['heterosexuell', 'homosexuell', 'bisexuell']) {
                        if (orient[key] === 'interessiert') return key;
                    }
                }
                return null;
            };

            const o1 = getPrimaryOrientation(orient1);
            const o2 = getPrimaryOrientation(orient2);

            if (!o1 || !o2) return orientierungStatements.default;

            // Use category comparison instead of direct string comparison
            // cis_mann and trans_mann are both male, cis_frau and trans_frau are both female
            const isMaleG = (g) => {
                if (!g) return false;
                const gl = g.toLowerCase();
                return gl === 'männlich' || gl === 'cis_mann' || gl === 'trans_mann' || gl === 'mann' || gl === 'male' || gl === 'm';
            };
            const isFemaleG = (g) => {
                if (!g) return false;
                const gl = g.toLowerCase();
                return gl === 'weiblich' || gl === 'cis_frau' || gl === 'trans_frau' || gl === 'frau' || gl === 'female' || gl === 'w' || gl === 'f';
            };
            const gleichesGeschlecht = (isMaleG(g1) && isMaleG(g2)) || (isFemaleG(g1) && isFemaleG(g2)) || (g1 === g2);

            // Bisexuell ist immer grundsätzlich kompatibel
            if (o1 === 'bisexuell' && o2 === 'bisexuell') {
                return orientierungStatements.kompatibel_bi_bi;
            }
            if (o1 === 'bisexuell' || o2 === 'bisexuell') {
                const andereOrient = o1 === 'bisexuell' ? o2 : o1;
                // Prüfe ob der andere zur bi-Person passt
                if (andereOrient === 'heterosexuell') {
                    // Hetero + Bi: kompatibel wenn unterschiedliche Geschlechter
                    if (!gleichesGeschlecht) {
                        return orientierungStatements.kompatibel_bi_hetero;
                    } else {
                        return orientierungStatements.teilweise_bi_inkompatibel;
                    }
                }
                if (andereOrient === 'homosexuell') {
                    // Homo + Bi: kompatibel wenn gleiche Geschlechter
                    if (gleichesGeschlecht) {
                        return orientierungStatements.kompatibel_bi_homo;
                    } else {
                        return orientierungStatements.teilweise_bi_inkompatibel;
                    }
                }
            }

            // Beide heterosexuell
            if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
                if (!gleichesGeschlecht) {
                    return orientierungStatements.kompatibel_hetero_hetero;
                } else {
                    return orientierungStatements.inkompatibel_hetero_hetero;
                }
            }

            // Beide homosexuell
            if (o1 === 'homosexuell' && o2 === 'homosexuell') {
                if (gleichesGeschlecht) {
                    return orientierungStatements.kompatibel_homo_homo;
                } else {
                    return orientierungStatements.inkompatibel_homo_homo;
                }
            }

            // Hetero + Homo
            if ((o1 === 'heterosexuell' && o2 === 'homosexuell') ||
                (o1 === 'homosexuell' && o2 === 'heterosexuell')) {
                return orientierungStatements.inkompatibel_hetero_homo;
            }

            return orientierungStatements.default;
        }

        // Hilfsfunktion: Hole Statements für Status-Kombination (fakt/interessiert)
        // Bewertet den kombinierten Sicherheitsgrad beider Personen über alle Dimensionen
        function getStatusStatements(personDims1, personDims2) {
            if (!personDims1 || !personDims2) {
                return statusStatements.default;
            }

            // Ermittle den dominanten Status für jede Person
            // Eine Person gilt als "fakt" wenn mindestens eine Dimension als fakt markiert ist
            // und keine als interessiert
            const getPersonStatus = (dims) => {
                let hasFakt = false;
                let hasInteressiert = false;

                // Prüfe Dominanz
                if (dims.dominanz && typeof dims.dominanz === 'object') {
                    // New format: { primary: 'dominant', secondary: 'submissiv' }
                    if ('primary' in dims.dominanz) {
                        if (dims.dominanz.primary) hasFakt = true;
                        if (dims.dominanz.secondary) hasInteressiert = true;
                    } else {
                        // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
                        for (const key of Object.keys(dims.dominanz)) {
                            if (dims.dominanz[key] === 'gelebt') hasFakt = true;
                            if (dims.dominanz[key] === 'interessiert') hasInteressiert = true;
                        }
                    }
                }

                // Prüfe Orientierung
                if (dims.orientierung && typeof dims.orientierung === 'object') {
                    // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                    if ('primary' in dims.orientierung) {
                        if (dims.orientierung.primary) hasFakt = true;
                        if (dims.orientierung.secondary) hasInteressiert = true;
                    } else {
                        // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                        for (const key of Object.keys(dims.orientierung)) {
                            if (dims.orientierung[key] === 'gelebt') hasFakt = true;
                            if (dims.orientierung[key] === 'interessiert') hasInteressiert = true;
                        }
                    }
                }

                // Wenn sowohl gelebt als auch interessiert: interessiert dominiert (Unsicherheit)
                if (hasInteressiert) return 'interessiert';
                if (hasFakt) return 'gelebt';
                return null;
            };

            const status1 = getPersonStatus(personDims1);
            const status2 = getPersonStatus(personDims2);

            if (!status1 || !status2) return statusStatements.default;

            // Symmetrische Kombinationen
            if (status1 === 'gelebt' && status2 === 'gelebt') {
                return statusStatements.gelebt_gelebt;
            }
            if (status1 === 'interessiert' && status2 === 'interessiert') {
                return statusStatements.interessiert_interessiert;
            }
            // Asymmetrische Kombination (egal welche Reihenfolge)
            return statusStatements.gelebt_interessiert;
        }

        // Archetype UI descriptions (separate from profiles/archetyp-definitions.js)
        const archetypeDescriptions = {
            single: {
                name: "Single",
                shortDef: "Bewusste Entscheidung für ein autonomes Leben ohne Primärbeziehung als dauerhafte Lebensform.",
                longDef: "Single-orientierte Menschen haben sich aktiv für ein Leben ohne dauerhafte romantische Partnerschaft entschieden. Dies ist keine Übergangsphase ('zwischen Beziehungen'), sondern eine bewusste Lebensform, die Selbstgenügsamkeit und persönliche Autonomie als zentrale Werte sieht. Soziale Kontakte, Freundschaften und gelegentliche romantische/sexuelle Begegnungen sind möglich, aber keine feste Partnerschaft wird angestrebt.",
                keyPrinciples: [
                    "Selbstgenügsamkeit als Wert, nicht als Mangel",
                    "Persönliche Autonomie über Verbindlichkeit",
                    "Beziehungen als Option, nicht als Notwendigkeit",
                    "Erfüllung durch Selbst, Freunde, Projekte"
                ],
                notTheSameAs: [
                    "'Zwischen Beziehungen' sein",
                    "'Noch nicht den Richtigen gefunden'",
                    "Beziehungsunfähig oder bindungsängstlich",
                    "Einsam oder unglücklich"
                ],
                variants: [
                    "Aromantisch-Single: Keine romantischen Gefühle, kein Bedürfnis danach",
                    "Bewusst-autonom: Positive Entscheidung für Freiheit",
                    "Beziehungs-kritisch: Bevorzugt Unabhängigkeit"
                ]
            },
            duo: {
                name: "Duo",
                shortDef: "Traditionelle monogame Zweierbeziehung mit Exklusivität und gemeinsamer Lebensgestaltung als Kernprinzip.",
                longDef: "Duo-orientierte Menschen leben in oder suchen eine klassische Zweierbeziehung mit romantischer und sexueller Exklusivität. Die Partnerschaft steht im Zentrum der Lebensgestaltung und wird als primäre emotionale und soziale Einheit verstanden. Gemeinsame Ziele, Alltag und Zukunftsplanung werden als Paar gestaltet.",
                keyPrinciples: [
                    "Exklusivität als Ausdruck von Verbindlichkeit",
                    "'Wir' als zentrale Einheit über 'Ich'",
                    "Tiefe durch Fokussierung auf eine Person",
                    "Gemeinsame Lebensgestaltung und Zukunftsplanung",
                    "Treue als emotionale und sexuelle Exklusivität"
                ],
                notTheSameAs: [
                    "Besitzdenken oder Kontrolle",
                    "Verlust der eigenen Identität",
                    "'Alte' oder 'überholte' Beziehungsform",
                    "Langweilig oder unerfüllt"
                ],
                variants: [
                    "Traditionell-Duo: Klassisches Ehe-Modell",
                    "Modern-Duo: Ohne Trauschein, flexiblere Rollen",
                    "Intensiv-Duo: Sehr enge emotionale Verschmelzung"
                ]
            },
            duo_flex: {
                name: "Duo-Flex",
                shortDef: "Primäre Zweierbeziehung mit vereinbarten Öffnungen für zusätzliche Kontakte unter klaren Regeln.",
                longDef: "Duo-Flex-orientierte Menschen leben in einer Hauptbeziehung mit einem Primärpartner, öffnen diese aber bewusst und einvernehmlich für weitere Kontakte. Die Primärbeziehung bleibt zentral und privilegiert. Alle Öffnungen erfolgen transparent und nach gemeinsam vereinbarten Regeln.",
                keyPrinciples: [
                    "Primärbeziehung als Anker und Priorität",
                    "Sexuelle/romantische Vielfalt ohne Hierarchie-Aufgabe",
                    "Ehrlichkeit und Transparenz über alle Kontakte",
                    "Regeln schützen die Hauptbeziehung",
                    "Freiheit innerhalb vereinbarter Grenzen"
                ],
                notTheSameAs: [
                    "Untreue oder Betrug (alles ist abgesprochen!)",
                    "'Beziehung retten' durch Öffnung",
                    "Fehlende Verbindlichkeit",
                    "Übergangsphase zu Polyamorie"
                ],
                variants: [
                    "Swinging/Lifestyle: Gemeinsame sexuelle Erlebnisse",
                    "Open Relationship: Individuelle sexuelle Freiheit",
                    "Hierarchisches Poly: Primärpartner + Nebenbeziehungen"
                ]
            },
            solopoly: {
                name: "Solopoly",
                shortDef: "Mehrere gleichwertige Beziehungen bei bewusster Bewahrung der eigenen Autonomie - keine Primärpartner.",
                longDef: "Solopoly-orientierte Menschen führen mehrere romantische und/oder sexuelle Beziehungen parallel, ohne eine davon als 'Hauptbeziehung' zu priorisieren. Die persönliche Autonomie steht im Zentrum: Kein Zusammenziehen, keine gemeinsame Haushaltsführung. 'Ich bin mein eigener Primärpartner'.",
                keyPrinciples: [
                    "Autonomie als höchster Wert - auch in Beziehungen",
                    "Mehrere gleichwertige Beziehungen ohne Hierarchie",
                    "Keine Verschmelzung oder gemeinsame Haushalte",
                    "'Ich bin mein eigener Primärpartner'",
                    "Liebe ohne Aufgabe der Unabhängigkeit"
                ],
                notTheSameAs: [
                    "Bindungsangst oder Commitment-Probleme",
                    "'Light-Version' von Polyamorie",
                    "Egoistisch oder beziehungsunfähig",
                    "Zwischenstufe zu 'richtiger' Partnerschaft"
                ],
                variants: [
                    "Stark-autonom: Sehr klare Grenzen",
                    "Beziehungs-balanciert: Tiefe Beziehungen, getrennte Wohnungen",
                    "Netzwerk-orientiert: Viele gleichwertige Connections"
                ]
            },
            ra: {
                name: "RA",
                shortDef: "Vollständige Ablehnung von Beziehungshierarchien und gesellschaftlichen Normen.",
                longDef: "RAs hinterfragen alle gesellschaftlichen Beziehungsnormen radikal. Keine Beziehung ist 'höher' als eine andere - Freundschaften können genauso wichtig sein wie romantische Beziehungen. Jede Verbindung wird individuell definiert, ohne externe Vorlagen.",
                keyPrinciples: [
                    "Keine Hierarchien zwischen Beziehungstypen",
                    "Jede Beziehung wird individuell definiert",
                    "Ablehnung gesellschaftlicher Beziehungsnormen",
                    "Autonomie als höchster Wert",
                    "Keine Besitzansprüche an andere Menschen"
                ],
                notTheSameAs: [
                    "Beziehungsunfähig oder bindungsscheu",
                    "Chaotisch oder regellos",
                    "Verantwortungslos",
                    "Gegen Commitment generell"
                ],
                variants: [
                    "Anarchisch-vernetzt: Viele gleichwertige Verbindungen",
                    "Philosophisch-RA: Tiefe Reflexion über Normen",
                    "Pragmatisch-RA: Flexible Anwendung der Prinzipien"
                ]
            },
            lat: {
                name: "LAT (Living Apart Together)",
                shortDef: "Feste Partnerschaft mit bewusst getrennten Wohnungen und Alltagsleben.",
                longDef: "LAT-orientierte Menschen wünschen sich tiefe, verbindliche Beziehungen, aber mit klarer räumlicher und alltäglicher Autonomie. Die eigenen vier Wände sind kein Zeichen von Distanz, sondern von gesunder Selbstfürsorge.",
                keyPrinciples: [
                    "Liebe braucht kein gemeinsames Dach",
                    "Eigener Rückzugsraum ist essentiell",
                    "Qualitätszeit über Quantität",
                    "Autonomie im Alltag",
                    "Bewusste Entscheidung für Nähe"
                ],
                notTheSameAs: [
                    "Bindungsangst oder Commitment-Phobie",
                    "Fernbeziehung aus Zwang",
                    "Halbe Beziehung oder weniger ernst",
                    "Übergangsphase zum Zusammenziehen"
                ],
                variants: [
                    "Nachbarschafts-LAT: Getrennte Wohnungen in der Nähe",
                    "Wochenend-LAT: Intensives Zeit-teilen am Wochenende",
                    "Flexibel-LAT: Situative Anpassung der Nähe"
                ]
            },
            aromantisch: {
                name: "Aromantisch",
                shortDef: "Wenig oder keine romantische Anziehung, aber tiefe Verbindungen auf anderen Ebenen.",
                longDef: "Aromantische Menschen erleben wenig bis keine romantische Anziehung zu anderen. Das bedeutet nicht, dass sie keine tiefen Verbindungen haben können - Freundschaften, queerplatonische Beziehungen und andere Formen von Nähe sind möglich und wertvoll.",
                keyPrinciples: [
                    "Romantische Liebe ist nicht die einzige Tiefe",
                    "Freundschaften können primäre Beziehungen sein",
                    "Ehrlichkeit über eigene Grenzen",
                    "Keine Verpflichtung zu romantischen Gefühlen",
                    "Alternative Beziehungsformen werden wertgeschätzt"
                ],
                notTheSameAs: [
                    "Kalt oder gefühllos",
                    "Antisozial oder einsam",
                    "Noch nicht die richtige Person gefunden",
                    "Psychische Störung oder Defizit"
                ],
                variants: [
                    "Greyromantisch: Seltene romantische Anziehung",
                    "Demiromantisch: Romantik nur nach tiefer Bindung",
                    "Queerplatonisch: Tiefe nicht-romantische Primärbeziehungen"
                ]
            },
            polyamor: {
                name: "Polyamor",
                shortDef: "Mehrere gleichzeitige, ethisch geführte Liebesbeziehungen mit Transparenz und emotionalem Commitment.",
                longDef: "Polyamor-orientierte Menschen führen mehrere romantische Beziehungen parallel, die alle auf Ehrlichkeit, Einvernehmlichkeit und Transparenz basieren. Tiefe Verschmelzung, Zusammenleben und gemeinsame Zukunftsplanung mit mehreren Partnern sind möglich und erwünscht. Alle Beteiligten wissen voneinander.",
                keyPrinciples: [
                    "Liebe ist nicht begrenzt oder exklusiv",
                    "Ehrlichkeit und Transparenz gegenüber allen",
                    "Konsens und Einvernehmlichkeit als Basis",
                    "Emotionale Tiefe zu mehreren Menschen",
                    "Kommunikation als zentrale Kompetenz"
                ],
                notTheSameAs: [
                    "Untreue oder Betrug (alle wissen Bescheid!)",
                    "Bindungsunfähigkeit",
                    "Nur Sex ohne Gefühle",
                    "Chaotisch oder unkontrolliert"
                ],
                variants: [
                    "Hierarchisches Poly: Primär-, Sekundärpartner",
                    "Nicht-hierarchisches Poly: Alle gleichwertig",
                    "Kitchen-Table-Poly: Alle Partner verstehen sich",
                    "Parallel-Poly: Partner kennen sich, wenig Kontakt"
                ]
            }
        };

        // Tag tooltip content for type combinations
        // Keys: "type1-type2" (alphabetically sorted), categories: A-F, tags: normalized tag names
        const tagTooltipContent = {
            // Single × Polyamor (niedrige Kompatibilität - Priorität)
            "polyamor-single": {
                "A": {
                    "exklusivitaets-erwartung": {
                        type1Perspective: "Singles haben keine aktive Exklusivitäts-Erwartung, da sie bewusst ohne Primärbeziehung leben.",
                        type2Perspective: "Polyamor-Menschen lehnen Exklusivität als Grundprinzip ab - Liebe wird als nicht-begrenzt verstanden.",
                        dynamic: "Beide lehnen Exklusivität ab, aber aus völlig verschiedenen Gründen: Single will keine Beziehung, Polyamor will mehrere gleichzeitig."
                    },
                    "offenheit-fuer-alternative-modelle": {
                        type1Perspective: "Singles sind theoretisch offen, haben aber keine aktive Beziehungspraxis.",
                        type2Perspective: "Polyamor lebt alternative Modelle aktiv mit mehreren gleichzeitigen Liebesbeziehungen.",
                        dynamic: "Potenzielle Brücke: Ein Single könnte Polyamorie entdecken, wenn die Autonomie gewahrt bleibt."
                    },
                    "beziehung-als-lebensinhalt-vs-lebensbereich": {
                        type1Perspective: "Für Singles ist Beziehung kein zentraler Lebensinhalt - Selbstgenügsamkeit steht im Vordergrund.",
                        type2Perspective: "Für Polyamor sind Beziehungen sehr zentral, aber als Netzwerk statt als einzelne Partnerschaft.",
                        dynamic: "Grundlegend verschiedene Lebensentwürfe: Beziehungsfreiheit vs. Beziehungsvielfalt als Ideal."
                    }
                },
                "B": {
                    "definition-von-treue": {
                        type1Perspective: "Treue ist für Singles kein relevantes Konzept, da keine Beziehungsverpflichtungen bestehen.",
                        type2Perspective: "Treue bedeutet für Polyamor Ehrlichkeit und Transparenz, nicht Exklusivität.",
                        dynamic: "Verschiedene Bedeutungen: Für Single irrelevant, für Polyamor transformiert - aber nicht abwesend."
                    },
                    "ethische-grundhaltung": {
                        type1Perspective: "Singles praktizieren Selbstverantwortung ohne Rechenschaftspflicht gegenüber Partnern.",
                        type2Perspective: "Polyamor betont ethische Verantwortung gegenüber allen Beziehungspartnern.",
                        dynamic: "Single lebt für sich, Polyamor für ein Netzwerk - unterschiedliche ethische Bezugsrahmen."
                    },
                    "verantwortungsbewusstsein": {
                        type1Perspective: "Verantwortung liegt primär bei sich selbst und eigenen Lebensentscheidungen.",
                        type2Perspective: "Verantwortung erstreckt sich auf mehrere Partner und deren emotionale Bedürfnisse.",
                        dynamic: "Einzelverantwortung vs. Netzwerkverantwortung - fundamental verschiedene Komplexitätsgrade."
                    }
                },
                "C": {
                    "emotionale-verschmelzungs-tendenz": {
                        type1Perspective: "Singles meiden emotionale Verschmelzung zugunsten von Selbstgenügsamkeit.",
                        type2Perspective: "Polyamor sucht emotionale Tiefe mit mehreren Menschen gleichzeitig.",
                        dynamic: "Singles wahren Distanz, Polyamor sucht Nähe - aber verteilt auf mehrere Personen."
                    },
                    "physische-naehe-beduerfnisse": {
                        type1Perspective: "Physische Nähe ist für Singles optional und situativ, nicht strukturell verankert.",
                        type2Perspective: "Polyamor hat oft hohe physische Nähe-Bedürfnisse zu mehreren Partnern.",
                        dynamic: "Singles regulieren Nähe selbst, Polyamor jongliert Nähe-Bedürfnisse im Netzwerk."
                    },
                    "faehigkeit-raum-zu-geben": {
                        type1Perspective: "Singles brauchen viel Raum und sind geübt darin, diesen zu verteidigen.",
                        type2Perspective: "Polyamor gibt Raum durch verteilte Aufmerksamkeit auf mehrere Partner.",
                        dynamic: "Beide können Raum geben - Single durch Abwesenheit, Polyamor durch Verteilung."
                    }
                },
                "D": {
                    "individuelle-freiheit": {
                        type1Perspective: "Maximale Freiheit ohne Kompromisse - Singles gestalten ihr Leben vollständig selbst.",
                        type2Perspective: "Freiheit innerhalb eines ethischen Beziehungsnetzwerks mit Absprachen.",
                        dynamic: "Absolute vs. verhandelte Freiheit - Singles haben mehr, müssen aber auf Beziehungstiefe verzichten."
                    },
                    "entscheidungsautonomie": {
                        type1Perspective: "Volle Entscheidungsautonomie ohne Rücksprache oder Kompromisse.",
                        type2Perspective: "Entscheidungsautonomie mit Transparenzpflicht gegenüber allen Partnern.",
                        dynamic: "Singles entscheiden allein, Polyamor kommuniziert - verschiedene Autonomie-Definitionen."
                    },
                    "akzeptanz-der-autonomie-des-anderen": {
                        type1Perspective: "Singles respektieren Autonomie anderer, da sie selbst maximale Autonomie leben.",
                        type2Perspective: "Polyamor fördert aktiv die Autonomie aller Partner im Netzwerk.",
                        dynamic: "Passives Respektieren vs. aktives Fördern von Autonomie."
                    }
                },
                "E": {
                    "kommunikationstiefe": {
                        type1Perspective: "Singles kommunizieren situativ und bei Bedarf, ohne dauerhafte Verpflichtung.",
                        type2Perspective: "Polyamor erfordert tiefe, kontinuierliche Kommunikation mit allen Partnern.",
                        dynamic: "Verschiedene Kommunikationskulturen: Bedarfsorientiert vs. strukturell verankert."
                    },
                    "konfliktfaehigkeit": {
                        type1Perspective: "Singles können Konflikte durch Rückzug vermeiden - keine Beziehungspflicht.",
                        type2Perspective: "Polyamor muss Konflikte aktiv lösen, um das Netzwerk zu erhalten.",
                        dynamic: "Exit-Option vs. Konfliktlösung als Notwendigkeit - sehr verschiedene Strategien."
                    },
                    "emotionale-transparenz": {
                        type1Perspective: "Emotionale Transparenz ist optional, da keine festen Beziehungspflichten bestehen.",
                        type2Perspective: "Maximale emotionale Transparenz als ethische Grundlage aller Beziehungen.",
                        dynamic: "Freiwillige vs. verpflichtende Transparenz - unterschiedliche Grundhaltungen."
                    }
                },
                "F": {
                    "gesellschaftliche-akzeptanz": {
                        type1Perspective: "Singles sind gesellschaftlich akzeptiert, wenn auch manchmal bedauert.",
                        type2Perspective: "Polyamor erfährt oft Stigmatisierung und Unverständnis.",
                        dynamic: "Single ist 'normal', Polyamor muss sich erklären - verschiedene gesellschaftliche Positionen."
                    },
                    "integration-in-soziale-kreise": {
                        type1Perspective: "Singles integrieren sich individuell und flexibel in soziale Kreise.",
                        type2Perspective: "Polyamor bringt komplexe Beziehungsstrukturen in soziale Kontexte ein.",
                        dynamic: "Einfache vs. komplexe soziale Integration - Singles haben es leichter."
                    },
                    "umgang-mit-stigma": {
                        type1Perspective: "Singles erleben mildes Stigma ('Wann heiratest du?'), aber keine starke Ablehnung.",
                        type2Perspective: "Polyamor muss aktiv mit Vorurteilen und Abwertung umgehen.",
                        dynamic: "Leichtes vs. starkes Stigma - Polyamor braucht mehr Resilienz."
                    }
                }
            },
            // Duo × Polyamor (maximaler Konflikt - Priorität)
            "duo-polyamor": {
                "A": {
                    "exklusivitaets-erwartung": {
                        type1Perspective: "Duo sieht Exklusivität als fundamentalen Ausdruck von Liebe und Verbindlichkeit.",
                        type2Perspective: "Polyamor versteht Liebe als nicht-begrenzte Ressource, die sich auf mehrere Menschen erstrecken kann.",
                        dynamic: "Fundamentaler Konflikt: Was für Duo Treue bedeutet, ist für Polyamor eine künstliche Beschränkung."
                    },
                    "offenheit-fuer-alternative-modelle": {
                        type1Perspective: "Duo bevorzugt das bewährte Zweiermodell und sieht wenig Grund zur Öffnung.",
                        type2Perspective: "Polyamor lebt aktiv ein alternatives Modell und hinterfragt Monogamie-Normen.",
                        dynamic: "Tradition vs. Alternative: Duo fragt 'Warum ändern?', Polyamor fragt 'Warum beschränken?'"
                    },
                    "beziehung-als-lebensinhalt-vs-lebensbereich": {
                        type1Perspective: "Für Duo ist DIE Beziehung zentraler Lebensinhalt - 'Wir' als Einheit.",
                        type2Perspective: "Für Polyamor sind Beziehungen plural - mehrere gleichwertige 'Wirs'.",
                        dynamic: "Singuläres 'Wir' vs. plurales 'Wir' - grundverschiedene Beziehungsarchitekturen."
                    }
                },
                "B": {
                    "definition-von-treue": {
                        type1Perspective: "Treue bedeutet exklusive emotionale und sexuelle Bindung an eine Person.",
                        type2Perspective: "Treue bedeutet Ehrlichkeit, Transparenz und Einhalten von Absprachen - nicht Exklusivität.",
                        dynamic: "Maximaler Definitionskonflikt: Duo sieht Untreue, wo Polyamor Transparenz sieht."
                    },
                    "ethische-grundhaltung": {
                        type1Perspective: "Ethik basiert auf Versprechen, Verbindlichkeit und Fokussierung auf einen Partner.",
                        type2Perspective: "Ethik basiert auf Ehrlichkeit, Konsens und Verantwortung gegenüber allen Beteiligten.",
                        dynamic: "Verschiedene ethische Fundamente: Exklusivitätsethik vs. Transparenzethik."
                    },
                    "verantwortungsbewusstsein": {
                        type1Perspective: "Verantwortung konzentriert sich auf einen Partner und die gemeinsame Zukunft.",
                        type2Perspective: "Verantwortung verteilt sich auf mehrere Partner und komplexe Beziehungsdynamiken.",
                        dynamic: "Fokussierte vs. verteilte Verantwortung - unterschiedliche Kapazitätsanforderungen."
                    }
                },
                "C": {
                    "emotionale-verschmelzungs-tendenz": {
                        type1Perspective: "Duo strebt tiefe emotionale Verschmelzung mit einem Partner an.",
                        type2Perspective: "Polyamor erlebt emotionale Tiefe mit mehreren Menschen, aber weniger Verschmelzung pro Person.",
                        dynamic: "Intensive Tiefe zu einem vs. verteilte Tiefe zu mehreren - verschiedene emotionale Ökonomien."
                    },
                    "physische-naehe-beduerfnisse": {
                        type1Perspective: "Physische Nähe fokussiert sich exklusiv auf den Partner.",
                        type2Perspective: "Physische Nähe verteilt sich auf mehrere Partner nach Bedarf und Absprache.",
                        dynamic: "Exklusive vs. geteilte Intimität - kann für Duo als Verlust erlebt werden."
                    },
                    "faehigkeit-raum-zu-geben": {
                        type1Perspective: "Duo gibt Raum innerhalb der Partnerschaft, aber nicht für andere Beziehungen.",
                        type2Perspective: "Polyamor muss Raum für alle Partner schaffen und ausbalancieren.",
                        dynamic: "Raum für Individuum vs. Raum für andere Beziehungen - verschiedene Raumkonzepte."
                    }
                },
                "D": {
                    "individuelle-freiheit": {
                        type1Perspective: "Freiheit wird gemeinsam als Paar definiert und gelebt.",
                        type2Perspective: "Individuelle Freiheit schließt Freiheit für mehrere Liebesbeziehungen ein.",
                        dynamic: "Paar-Freiheit vs. individuelle Beziehungsfreiheit - verschiedene Freiheitsbegriffe."
                    },
                    "entscheidungsautonomie": {
                        type1Perspective: "Wichtige Entscheidungen werden als Paar getroffen.",
                        type2Perspective: "Individuelle Autonomie auch bei Beziehungsentscheidungen, mit Transparenz.",
                        dynamic: "Gemeinsame vs. individuelle Entscheidungsmacht - kann zu Konflikten führen."
                    },
                    "akzeptanz-der-autonomie-des-anderen": {
                        type1Perspective: "Autonomie des Partners wird anerkannt, aber nicht für andere Beziehungen.",
                        type2Perspective: "Autonomie schließt explizit die Freiheit für weitere Liebesbeziehungen ein.",
                        dynamic: "Begrenzte vs. unbegrenzte Autonomie-Akzeptanz - Kernkonflikt dieser Kombination."
                    }
                },
                "E": {
                    "kommunikationstiefe": {
                        type1Perspective: "Tiefe Kommunikation mit einem Partner über alle Lebensaspekte.",
                        type2Perspective: "Tiefe Kommunikation mit mehreren Partnern, plus Meta-Kommunikation über Beziehungen.",
                        dynamic: "Verschiedene Kommunikationsanforderungen: Duo ist intensiv, Polyamor ist extensiv."
                    },
                    "konfliktfaehigkeit": {
                        type1Perspective: "Konflikte werden zu zweit gelöst, ohne externe Beziehungen.",
                        type2Perspective: "Konflikte können mehrere Partner betreffen und erfordern komplexe Lösungen.",
                        dynamic: "Bilaterale vs. multilaterale Konfliktlösung - verschiedene Komplexitätsgrade."
                    },
                    "emotionale-transparenz": {
                        type1Perspective: "Emotionale Transparenz primär gegenüber dem einen Partner.",
                        type2Perspective: "Emotionale Transparenz gegenüber allen Partnern als ethische Basis.",
                        dynamic: "Duo kann Transparenz gegenüber 'Dritten' als Verrat empfinden - Polyamor als Grundlage."
                    }
                },
                "F": {
                    "gesellschaftliche-akzeptanz": {
                        type1Perspective: "Duo entspricht der gesellschaftlichen Norm und genießt volle Akzeptanz.",
                        type2Perspective: "Polyamor muss gegen Vorurteile und mangelndes Verständnis kämpfen.",
                        dynamic: "Norm vs. Abweichung - Duo hat soziale Vorteile, Polyamor soziale Hürden."
                    },
                    "integration-in-soziale-kreise": {
                        type1Perspective: "Duo wird als 'normales' Paar problemlos in alle Kontexte integriert.",
                        type2Perspective: "Polyamor muss erklären, verbergen oder mit Unverständnis umgehen.",
                        dynamic: "Reibungslose vs. erklärungsbedürftige Integration - verschiedene soziale Belastungen."
                    },
                    "umgang-mit-stigma": {
                        type1Perspective: "Duo erfährt kein Stigma, sondern gesellschaftliche Unterstützung.",
                        type2Perspective: "Polyamor muss aktiv mit Stigmatisierung und Diskriminierung umgehen.",
                        dynamic: "Privilegierte vs. marginalisierte Position - kann zu Unverständnis führen."
                    }
                }
            },
            // Duo-Flex × Solopoly (interessante Balance - Priorität)
            "duo_flex-solopoly": {
                "A": {
                    "exklusivitaets-erwartung": {
                        type1Perspective: "Duo-Flex hält an einer Primärbeziehung fest, öffnet aber für Zusatzkontakte.",
                        type2Perspective: "Solopoly lehnt jede Form von Primärhierarchie ab - alle Beziehungen sind gleichwertig.",
                        dynamic: "Hierarchie vs. Gleichwertigkeit: Duo-Flex braucht einen Anker, Solopoly will keinen."
                    },
                    "offenheit-fuer-alternative-modelle": {
                        type1Perspective: "Duo-Flex ist offen, aber innerhalb eines strukturierten Rahmens mit Primärpartner.",
                        type2Perspective: "Solopoly lebt maximale Offenheit ohne Verpflichtung zu einer Hauptbeziehung.",
                        dynamic: "Gerahmte vs. ungerahmte Offenheit - beide alternativ, aber verschieden strukturiert."
                    },
                    "beziehung-als-lebensinhalt-vs-lebensbereich": {
                        type1Perspective: "Die Primärbeziehung ist Lebensinhalt, andere Kontakte sind Bereicherung.",
                        type2Perspective: "Alle Beziehungen sind Lebensbereiche, keiner ist zentraler Lebensinhalt.",
                        dynamic: "Zentrale vs. dezentrale Beziehungsarchitektur - verschiedene Lebensmodelle."
                    }
                },
                "B": {
                    "definition-von-treue": {
                        type1Perspective: "Treue bedeutet Ehrlichkeit und Prioririsierung des Hauptpartners.",
                        type2Perspective: "Treue bedeutet Ehrlichkeit gegenüber allen, ohne Hierarchie der Wichtigkeit.",
                        dynamic: "Hierarchische vs. egalitäre Treue-Definition - beide ehrlich, anders strukturiert."
                    },
                    "ethische-grundhaltung": {
                        type1Perspective: "Ethik schützt die Primärbeziehung, Öffnungen erfolgen im Rahmen.",
                        type2Perspective: "Ethik behandelt alle Partner gleich, ohne Vorrang einer Beziehung.",
                        dynamic: "Schutzethik vs. Gleichheitsethik - verschiedene ethische Prioritäten."
                    },
                    "verantwortungsbewusstsein": {
                        type1Perspective: "Höchste Verantwortung gegenüber dem Primärpartner, dann anderen.",
                        type2Perspective: "Gleiche Verantwortung gegenüber allen Partnern, kein 'mehr' oder 'weniger'.",
                        dynamic: "Gestufte vs. gleiche Verantwortung - kann zu Missverständnissen führen."
                    }
                },
                "C": {
                    "emotionale-verschmelzungs-tendenz": {
                        type1Perspective: "Emotionale Verschmelzung primär mit dem Hauptpartner.",
                        type2Perspective: "Solopoly meidet Verschmelzung bewusst, um Autonomie zu bewahren.",
                        dynamic: "Selektive Verschmelzung vs. generelle Distanz - verschiedene Nähe-Strategien."
                    },
                    "physische-naehe-beduerfnisse": {
                        type1Perspective: "Physische Nähe hauptsächlich mit Primärpartner, situativ mit anderen.",
                        type2Perspective: "Physische Nähe gleichmäßig verteilt, kein 'Zuhause' bei einem Partner.",
                        dynamic: "Zentrierte vs. verteilte Intimität - verschiedene Nähe-Modelle."
                    },
                    "faehigkeit-raum-zu-geben": {
                        type1Perspective: "Raum wird innerhalb der Primärbeziehung verhandelt.",
                        type2Perspective: "Raum ist strukturell gegeben durch separate Lebensräume.",
                        dynamic: "Verhandelter vs. struktureller Raum - Solopoly hat mehr eingebaute Distanz."
                    }
                },
                "D": {
                    "individuelle-freiheit": {
                        type1Perspective: "Freiheit innerhalb der Primärbeziehungs-Struktur.",
                        type2Perspective: "Maximale individuelle Freiheit als Grundprinzip des Lebens.",
                        dynamic: "Gerahmte vs. maximale Freiheit - verschiedene Autonomie-Level."
                    },
                    "entscheidungsautonomie": {
                        type1Perspective: "Wichtige Entscheidungen mit Primärpartner, aber mehr Freiraum als Duo.",
                        type2Perspective: "Volle Entscheidungsautonomie, Transparenz statt Absprache.",
                        dynamic: "Abgestimmte vs. informierte Autonomie - verschiedene Entscheidungsprozesse."
                    },
                    "akzeptanz-der-autonomie-des-anderen": {
                        type1Perspective: "Autonomie wird akzeptiert, solange die Primärbeziehung Priorität bleibt.",
                        type2Perspective: "Autonomie wird bedingungslos akzeptiert - keine Hierarchie-Erwartung.",
                        dynamic: "Bedingte vs. bedingungslose Autonomie-Akzeptanz."
                    }
                },
                "E": {
                    "kommunikationstiefe": {
                        type1Perspective: "Tiefe Kommunikation mit Primärpartner über alle Aspekte.",
                        type2Perspective: "Situative Kommunikationstiefe je nach Beziehung und Bedarf.",
                        dynamic: "Zentrierte vs. verteilte Kommunikationstiefe."
                    },
                    "konfliktfaehigkeit": {
                        type1Perspective: "Konflikte primär im Kontext der Hauptbeziehung lösen.",
                        type2Perspective: "Konflikte individuell mit jedem Partner, ohne zentrale Instanz.",
                        dynamic: "Zentralisierte vs. dezentralisierte Konfliktlösung."
                    },
                    "emotionale-transparenz": {
                        type1Perspective: "Volle Transparenz gegenüber Primärpartner, selektiv gegenüber anderen.",
                        type2Perspective: "Gleichmäßige Transparenz gegenüber allen Partnern.",
                        dynamic: "Gestufte vs. gleiche Transparenz - verschiedene Informationsflüsse."
                    }
                },
                "F": {
                    "gesellschaftliche-akzeptanz": {
                        type1Perspective: "Duo-Flex kann als 'offene Ehe' noch relativ akzeptiert werden.",
                        type2Perspective: "Solopoly ist schwer zu erklären und wird oft missverstanden.",
                        dynamic: "Relativ akzeptiert vs. erklärungsbedürftig - verschiedene soziale Positionen."
                    },
                    "integration-in-soziale-kreise": {
                        type1Perspective: "Primärpaar wird integriert, Zusatzkontakte bleiben oft privat.",
                        type2Perspective: "Alle Beziehungen gleichwertig in soziale Kreise integrieren ist komplex.",
                        dynamic: "Einfachere vs. komplexere soziale Integration."
                    },
                    "umgang-mit-stigma": {
                        type1Perspective: "Mildes Stigma, wenn Öffnung bekannt wird.",
                        type2Perspective: "Stärkeres Stigma durch unkonventionelle Lebensform ohne 'Hauptpartner'.",
                        dynamic: "Verschiedene Stigma-Level - Solopoly ist gesellschaftlich unbekannter."
                    }
                }
            },
            // Polyamor × Polyamor (hohe Kompatibilität - Test)
            "polyamor-polyamor": {
                "A": {
                    "exklusivitaets-erwartung": {
                        type1Perspective: "Keine Exklusivitäts-Erwartung, Liebe wird als nicht-begrenzt verstanden.",
                        type2Perspective: "Gleiche Grundhaltung: Liebe zu mehreren Menschen ist möglich und ethisch.",
                        dynamic: "Volle Übereinstimmung: Beide verstehen und leben nicht-exklusive Liebe."
                    },
                    "offenheit-fuer-alternative-modelle": {
                        type1Perspective: "Lebt aktiv ein alternatives Beziehungsmodell.",
                        type2Perspective: "Teilt diese Lebensrealität und die damit verbundenen Werte.",
                        dynamic: "Maximale Synergie: Beide haben den gleichen Referenzrahmen für Beziehungen."
                    },
                    "beziehung-als-lebensinhalt-vs-lebensbereich": {
                        type1Perspective: "Beziehungen sind zentraler Lebensinhalt, aber als Netzwerk.",
                        type2Perspective: "Versteht und teilt diese Beziehungsarchitektur vollständig.",
                        dynamic: "Geteiltes Verständnis: Beziehungsnetzwerk als gemeinsamer Lebensraum."
                    }
                },
                "B": {
                    "definition-von-treue": {
                        type1Perspective: "Treue = Ehrlichkeit, Transparenz, Einhalten von Agreements.",
                        type2Perspective: "Gleiche Definition von Treue, ohne Exklusivitätskomponente.",
                        dynamic: "Übereinstimmung bei einem der kritischsten Beziehungskonzepte."
                    },
                    "ethische-grundhaltung": {
                        type1Perspective: "Ethik basiert auf Konsens, Kommunikation und Respekt.",
                        type2Perspective: "Teilt diese ethischen Grundlagen und praktiziert sie aktiv.",
                        dynamic: "Gemeinsame ethische Basis erleichtert Verhandlungen und Absprachen."
                    },
                    "verantwortungsbewusstsein": {
                        type1Perspective: "Verantwortung für ein Netzwerk von Beziehungen und Gefühlen.",
                        type2Perspective: "Versteht diese Komplexität und trägt sie mit.",
                        dynamic: "Geteilte Erfahrung mit der Komplexität polyamorer Verantwortung."
                    }
                },
                "C": {
                    "emotionale-verschmelzungs-tendenz": {
                        type1Perspective: "Emotionale Tiefe mit mehreren Menschen, bewusst dosiert.",
                        type2Perspective: "Gleiche Erfahrung und Kompetenz im Umgang mit verteilter Intimität.",
                        dynamic: "Beide verstehen, wie Tiefe in einem Poly-Kontext funktioniert."
                    },
                    "physische-naehe-beduerfnisse": {
                        type1Perspective: "Physische Nähe verteilt sich auf mehrere Partner.",
                        type2Perspective: "Akzeptiert und praktiziert geteilte Intimität.",
                        dynamic: "Keine Eifersucht auf physische Nähe mit anderen - geteilte Norm."
                    },
                    "faehigkeit-raum-zu-geben": {
                        type1Perspective: "Raum für andere Beziehungen ist selbstverständlich.",
                        type2Perspective: "Erwartet und gibt gleichermaßen Raum für das Beziehungsnetzwerk.",
                        dynamic: "Strukturelle Übereinstimmung: Beide brauchen und geben Beziehungs-Raum."
                    }
                },
                "D": {
                    "individuelle-freiheit": {
                        type1Perspective: "Freiheit für mehrere Liebesbeziehungen als Grundrecht.",
                        type2Perspective: "Teilt dieses Freiheitsverständnis vollständig.",
                        dynamic: "Keine Einschränkung der romantischen Freiheit - beidseitiges Verständnis."
                    },
                    "entscheidungsautonomie": {
                        type1Perspective: "Autonomie bei Beziehungsentscheidungen, mit Transparenzpflicht.",
                        type2Perspective: "Gleiche Balance zwischen Autonomie und Verantwortung.",
                        dynamic: "Geteilte Entscheidungskultur: Autonom, aber transparent."
                    },
                    "akzeptanz-der-autonomie-des-anderen": {
                        type1Perspective: "Volle Akzeptanz der Beziehungsfreiheit des Partners.",
                        type2Perspective: "Erwartet und praktiziert die gleiche Akzeptanz.",
                        dynamic: "Wechselseitige Autonomie-Akzeptanz als Fundament der Beziehung."
                    }
                },
                "E": {
                    "kommunikationstiefe": {
                        type1Perspective: "Tiefe Kommunikation als Kernkompetenz polyanorer Beziehungen.",
                        type2Perspective: "Bringt gleiche Kommunikationsfähigkeiten und -erwartungen mit.",
                        dynamic: "Hohe Kommunikationskompetenz auf beiden Seiten - ideale Voraussetzung."
                    },
                    "konfliktfaehigkeit": {
                        type1Perspective: "Erfahrung mit komplexen, multilateralen Konflikten.",
                        type2Perspective: "Teilt diese Erfahrung und die entwickelten Lösungsstrategien.",
                        dynamic: "Beide sind 'Poly-geprüft' in Konfliktsituationen - große Resilienz."
                    },
                    "emotionale-transparenz": {
                        type1Perspective: "Maximale Transparenz als ethische Grundlage.",
                        type2Perspective: "Gleiche Transparenz-Erwartung und -Praxis.",
                        dynamic: "Keine versteckten Emotionen, keine versteckten Beziehungen - klare Basis."
                    }
                },
                "F": {
                    "gesellschaftliche-akzeptanz": {
                        type1Perspective: "Muss mit gesellschaftlicher Stigmatisierung umgehen.",
                        type2Perspective: "Teilt diese Erfahrung und die entwickelten Coping-Strategien.",
                        dynamic: "Gemeinsame Außenseiter-Position kann verbinden und stärken."
                    },
                    "integration-in-soziale-kreise": {
                        type1Perspective: "Komplexe Beziehungsstrukturen in soziale Kontexte einbringen.",
                        type2Perspective: "Versteht und teilt diese Herausforderung.",
                        dynamic: "Gegenseitige Unterstützung bei sozialer Navigation."
                    },
                    "umgang-mit-stigma": {
                        type1Perspective: "Aktiver Umgang mit Vorurteilen und Diskriminierung.",
                        type2Perspective: "Teilt diese Erfahrung und die Resilienz-Strategien.",
                        dynamic: "Gemeinsame Stärke gegen gesellschaftlichen Druck."
                    }
                }
            },
            // Duo × Duo (hohe Kompatibilität - Test)
            "duo-duo": {
                "A": {
                    "exklusivitaets-erwartung": {
                        type1Perspective: "Exklusivität als fundamentaler Ausdruck von Liebe.",
                        type2Perspective: "Teilt dieses Verständnis von Exklusivität vollständig.",
                        dynamic: "Perfekte Übereinstimmung: Beide verstehen und wünschen Exklusivität."
                    },
                    "offenheit-fuer-alternative-modelle": {
                        type1Perspective: "Bevorzugt das klassische Zweiermodell.",
                        type2Perspective: "Gleiche Präferenz für monogame Partnerschaft.",
                        dynamic: "Geteilte Wertschätzung für traditionelles Beziehungsmodell."
                    },
                    "beziehung-als-lebensinhalt-vs-lebensbereich": {
                        type1Perspective: "Die Partnerschaft ist zentraler Lebensinhalt.",
                        type2Perspective: "Teilt diese Priorisierung der Beziehung.",
                        dynamic: "Gemeinsames 'Wir' als Lebensmittelpunkt - perfekte Synergie."
                    }
                },
                "B": {
                    "definition-von-treue": {
                        type1Perspective: "Treue = exklusive emotionale und sexuelle Bindung.",
                        type2Perspective: "Gleiche Definition, gleiche Erwartung.",
                        dynamic: "Keine Definitions-Konflikte bei diesem zentralen Thema."
                    },
                    "ethische-grundhaltung": {
                        type1Perspective: "Ethik basiert auf Versprechen und Verbindlichkeit.",
                        type2Perspective: "Teilt diese ethischen Grundwerte.",
                        dynamic: "Gemeinsame ethische Basis für eine stabile Partnerschaft."
                    },
                    "verantwortungsbewusstsein": {
                        type1Perspective: "Fokussierte Verantwortung füreinander.",
                        type2Perspective: "Gleiche Verantwortungsbereitschaft.",
                        dynamic: "Gegenseitige, konzentrierte Verantwortung - klare Struktur."
                    }
                },
                "C": {
                    "emotionale-verschmelzungs-tendenz": {
                        type1Perspective: "Wünscht tiefe emotionale Verschmelzung.",
                        type2Perspective: "Teilt dieses Bedürfnis nach Nähe und Verbundenheit.",
                        dynamic: "Beidseitiges Streben nach emotionaler Tiefe."
                    },
                    "physische-naehe-beduerfnisse": {
                        type1Perspective: "Physische Nähe exklusiv mit dem Partner.",
                        type2Perspective: "Gleiche Exklusivitäts-Erwartung bei Intimität.",
                        dynamic: "Keine Konkurrenz um Nähe - ungeteilte Aufmerksamkeit."
                    },
                    "faehigkeit-raum-zu-geben": {
                        type1Perspective: "Raum innerhalb der Partnerschaft.",
                        type2Perspective: "Gleiche Balance zwischen Nähe und individuellem Raum.",
                        dynamic: "Ähnliche Raum-Bedürfnisse erleichtern das Zusammenleben."
                    }
                },
                "D": {
                    "individuelle-freiheit": {
                        type1Perspective: "Freiheit wird gemeinsam als Paar definiert.",
                        type2Perspective: "Teilt dieses Verständnis von Paar-Freiheit.",
                        dynamic: "Gemeinsame Freiheits-Definition als 'Wir'."
                    },
                    "entscheidungsautonomie": {
                        type1Perspective: "Wichtige Entscheidungen gemeinsam treffen.",
                        type2Perspective: "Gleiche Erwartung an gemeinsame Entscheidungsfindung.",
                        dynamic: "Geteilte Entscheidungsmacht ohne Autonomie-Konflikte."
                    },
                    "akzeptanz-der-autonomie-des-anderen": {
                        type1Perspective: "Autonomie innerhalb des Paar-Rahmens.",
                        type2Perspective: "Gleiche Balance zwischen Individualität und Partnerschaft.",
                        dynamic: "Ähnliche Autonomie-Grenzen erleichtern das Zusammenleben."
                    }
                },
                "E": {
                    "kommunikationstiefe": {
                        type1Perspective: "Tiefe Kommunikation zu zweit.",
                        type2Perspective: "Gleicher Wunsch nach intensivem Austausch.",
                        dynamic: "Fokussierte, tiefe Kommunikation ohne Verteilung."
                    },
                    "konfliktfaehigkeit": {
                        type1Perspective: "Konflikte werden zu zweit gelöst.",
                        type2Perspective: "Gleiche Erwartung an bilaterale Konfliktlösung.",
                        dynamic: "Klare Konflikt-Struktur ohne externe Komplexität."
                    },
                    "emotionale-transparenz": {
                        type1Perspective: "Volle Transparenz gegenüber dem Partner.",
                        type2Perspective: "Gleiche Transparenz-Erwartung und -Bereitschaft.",
                        dynamic: "Gegenseitige Offenheit ohne konkurrierende Loyalitäten."
                    }
                },
                "F": {
                    "gesellschaftliche-akzeptanz": {
                        type1Perspective: "Volle gesellschaftliche Akzeptanz.",
                        type2Perspective: "Teilt diese privilegierte Position.",
                        dynamic: "Keine externen Hürden durch gesellschaftliche Normen."
                    },
                    "integration-in-soziale-kreise": {
                        type1Perspective: "Als Paar problemlos integriert.",
                        type2Perspective: "Gleiche einfache soziale Integration.",
                        dynamic: "Gesellschaftliche Normalität als gemeinsame Basis."
                    },
                    "umgang-mit-stigma": {
                        type1Perspective: "Kein Stigma, sondern gesellschaftliche Unterstützung.",
                        type2Perspective: "Teilt diese Stigma-freie Erfahrung.",
                        dynamic: "Kein externer Druck - Fokus auf die Beziehung selbst."
                    }
                }
            }
        };

        // Helper function to normalize tag names for lookup
        function normalizeTagName(tag) {
            return tag.toLowerCase()
                .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        }

        // Get tooltip content for a specific tag
        function getTagTooltip(type1Id, type2Id, category, tagName) {
            const normalizedTag = normalizeTagName(tagName);

            // Sort type IDs alphabetically for consistent key lookup
            const sortedTypes = [type1Id, type2Id].sort();
            const comboKey = sortedTypes.join('-');

            // Try to find specific tooltip
            const comboData = tagTooltipContent[comboKey];
            if (comboData && comboData[category] && comboData[category][normalizedTag]) {
                const tooltip = comboData[category][normalizedTag];
                const type1 = data.archetypes[type1Id];
                const type2 = data.archetypes[type2Id];

                // Swap perspectives if types were reordered
                if (sortedTypes[0] === type2Id) {
                    return {
                        type1Name: type1?.name || type1Id,
                        type2Name: type2?.name || type2Id,
                        type1Perspective: tooltip.type2Perspective,
                        type2Perspective: tooltip.type1Perspective,
                        dynamic: tooltip.dynamic
                    };
                }

                return {
                    type1Name: type1?.name || type1Id,
                    type2Name: type2?.name || type2Id,
                    type1Perspective: tooltip.type1Perspective,
                    type2Perspective: tooltip.type2Perspective,
                    dynamic: tooltip.dynamic
                };
            }

            // Fallback: Generate generic tooltip
            return generateFallbackTooltip(type1Id, type2Id, category, tagName);
        }

        // Generate fallback tooltip when no specific content exists
        function generateFallbackTooltip(type1Id, type2Id, category, tagName) {
            const type1 = data.archetypes[type1Id];
            const type2 = data.archetypes[type2Id];
            const type1Def = archetypeDescriptions[type1Id];
            const type2Def = archetypeDescriptions[type2Id];

            const interactionKey = `${type1Id}_${type2Id}`;
            const interaction = data.interactions[interactionKey] || {};
            const scores = interaction.scores || {};
            const catScore = scores[category]?.value || 50;

            // Generate context-aware fallback
            let dynamicText = '';
            if (catScore >= 85) {
                dynamicText = `Hohe Übereinstimmung (${catScore}) in diesem Bereich - beide Typen haben ähnliche Ansätze.`;
            } else if (catScore >= 70) {
                dynamicText = `Moderate Übereinstimmung (${catScore}) - einige gemeinsame Grundlagen, aber auch Unterschiede.`;
            } else if (catScore >= 50) {
                dynamicText = `Mittlere Beziehungsqualität (${catScore}) - deutliche Unterschiede, die Kompromisse erfordern.`;
            } else {
                dynamicText = `Herausfordernde Konstellation (${catScore}) - grundlegend verschiedene Ansätze in diesem Bereich.`;
            }

            return {
                type1Name: type1?.name || type1Id,
                type2Name: type2?.name || type2Id,
                type1Perspective: type1Def?.keyPrinciples?.[0] || `${type1?.name || type1Id} hat eigene Präferenzen in diesem Bereich.`,
                type2Perspective: type2Def?.keyPrinciples?.[0] || `${type2?.name || type2Id} hat eigene Präferenzen in diesem Bereich.`,
                dynamic: dynamicText
            };
        }

        // Category descriptions loaded from data
        let categoryDescriptions = {};

        async function loadData() {
            try {
                const response = await fetch('archetype-matrix.json');
                data = await response.json();
                // Load category descriptions from data
                if (data.categories) {
                    categoryDescriptions = data.categories;
                }
            } catch (error) {
                console.error('Error loading data:', error);
                data = getFallbackData();
            }
            initApp();
        }

        function getFallbackData() {
            return {
                archetypes: {
                    single: { id: "single", name: "Single", color: "#E63946", shortDescription: "Fokus auf Selbstentwicklung", pro: [], contra: [], pathos: "", logos: "" },
                    duo: { id: "duo", name: "Duo", color: "#E84393", shortDescription: "Klassische monogame Zweierbeziehung", pro: [], contra: [], pathos: "", logos: "" },
                    duo_flex: { id: "duo_flex", name: "Duo-Flex", color: "#FF6B6B", shortDescription: "Primär Zweierbeziehung mit situativer Öffnung", pro: [], contra: [], pathos: "", logos: "" },
                    solopoly: { id: "solopoly", name: "Solopoly", color: "#2A9D8F", shortDescription: "Polyamor mit Autonomie", pro: [], contra: [], pathos: "", logos: "" },
                    polyamor: { id: "polyamor", name: "Polyamor", color: "#F4A261", shortDescription: "Strukturierte Mehrfachbeziehungen", pro: [], contra: [], pathos: "", logos: "" },
                    ra: { id: "ra", name: "RA", color: "#9B5DE5", shortDescription: "RA - Ablehnung von Labels", pro: [], contra: [], pathos: "", logos: "" },
                    lat: { id: "lat", name: "LAT", color: "#06D6A0", shortDescription: "Living Apart Together", pro: [], contra: [], pathos: "", logos: "" },
                    aromantisch: { id: "aromantisch", name: "Aromantisch", color: "#118AB2", shortDescription: "Platonische Verbindungen", pro: [], contra: [], pathos: "", logos: "" }
                },
                categories: {},
                interactions: {},
                aggregatedMatrix: { rows: [], cols: [], values: [] }
            };
        }

        function initApp() {
            const archetypeSelect = document.getElementById('archetypeSelect');
            if (archetypeSelect) {
                archetypeSelect.addEventListener('change', (e) => {
                    currentArchetype = e.target.value;
                    mobileIchArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('ich', e.target.value);
                    }
                    updateAll();
                });
            }

            // Carousel scroll detection
            const carousel = document.getElementById('carousel');
            if (carousel) {
                carousel.addEventListener('scroll', updateNavDots);
            }

            // Initialize dimension info link event listeners
            initDimensionInfoLinks();

            updateAll();
        }

        /**
         * Initialize event listeners for dimension info links
         * Uses CSS classes instead of onclick attributes for cleaner code
         */
        function initDimensionInfoLinks() {
            // Geschlechtsidentität links
            document.querySelectorAll('.geschlecht-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showGeschlechtInfoModal();
                });
            });

            // Dominanz links
            document.querySelectorAll('.dominanz-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDominanzInfoModal();
                });
            });

            // Orientierung links
            document.querySelectorAll('.orientierung-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showOrientierungInfoModal();
                });
            });

            // GFK links
            document.querySelectorAll('.gfk-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDimensionTooltip('gfk');
                });
            });
        }

        function updateAll() {
            // Guard: Don't update UI if data not loaded yet
            if (!data || !data.archetypes) {
                console.warn('[TIAGE] updateAll called before data loaded - skipping');
                return;
            }
            updateTheme();
            updateMyType();
            updatePartnerSelector();
            updateTopAndChallenge();
            updatePartnerView();
            updateLegendCategories();
            updateAnalysisOverview();
            updateComparisonView(); // Trigger score calculation and UI update
            // GFK automatisch aus Archetypen-Matching ableiten
            if (typeof updateGfkFromArchetypes === 'function') {
                updateGfkFromArchetypes();
            }
        }

        function updateTheme() {
            document.body.className = `theme-${currentArchetype}`;
        }

        function updateMyType() {
            // Guard against data not being loaded yet
            if (!data || !data.archetypes) {
                console.warn('[TIAGE] updateMyType called before data loaded');
                return;
            }
            const arch = data.archetypes[currentArchetype];
            if (!arch) return;

            const myTypeIcon = document.getElementById('myTypeIcon');
            if (myTypeIcon) {
                myTypeIcon.textContent = icons[currentArchetype];
                myTypeIcon.style.background = arch.color;
            }

            const myTypeName = document.getElementById('myTypeName');
            if (myTypeName) {
                myTypeName.textContent = arch.name;
                myTypeName.style.color = arch.color;
            }

            const myTypeDesc = document.getElementById('myTypeDesc');
            if (myTypeDesc) myTypeDesc.textContent = arch.shortDescription || '';

            const myTypeTooltip = document.getElementById('myTypeTooltip');
            if (myTypeTooltip) myTypeTooltip.textContent = getShortDef(currentArchetype);

            const proList = document.getElementById('myTypePro');
            if (proList) proList.innerHTML = (arch.pro || []).slice(0, 4).map(p => `<li>${p}</li>`).join('');

            const contraList = document.getElementById('myTypeContra');
            if (contraList) contraList.innerHTML = (arch.contra || []).slice(0, 4).map(c => `<li>${c}</li>`).join('');

            const myTypePathos = document.getElementById('myTypePathos');
            if (myTypePathos) myTypePathos.textContent = arch.pathos || '';

            const myTypeLogos = document.getElementById('myTypeLogos');
            if (myTypeLogos) myTypeLogos.textContent = arch.logos || '';
        }

        // Fixed archetype order to ensure all types are shown
        const archetypeOrder = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

        function updatePartnerSelector() {
            const container = document.getElementById('partnerSelector');
            // Show ALL archetypes as partner options (including own type for self-matching)
            const allPartners = archetypeOrder
                .map(id => data.archetypes[id])
                .filter(arch => arch); // Remove any undefined

            if (!allPartners.find(o => o.id === selectedPartner)) {
                selectedPartner = allPartners[0]?.id || 'duo';
            }

            container.innerHTML = allPartners.map(arch => `
                <button class="partner-btn ${arch.id === selectedPartner ? 'active' : ''}"
                        onclick="selectPartner('${arch.id}')"
                        data-id="${arch.id}">
                    <span class="dot" style="background: ${arch.color}"></span>
                    ${arch.name}
                </button>
            `).join('');
        }

        function selectPartner(partnerId) {
            selectedPartner = partnerId;
            document.querySelectorAll('.partner-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.id === partnerId);
            });
            updatePartnerView();
            updateAnalysisOverview();
            updateComparisonView(); // Trigger score calculation and UI update
        }

        function updateTopAndChallenge() {
            // Include all types (including self) for top match and challenge
            const others = archetypeOrder;
            let topMatch = { id: null, score: 0 };
            let challenge = { id: null, score: 100 };

            others.forEach(otherId => {
                const key = `${currentArchetype}_${otherId}`;
                const interaction = data.interactions[key];
                const score = interaction?.overall || 0;

                if (score > topMatch.score) {
                    topMatch = { id: otherId, score };
                }
                if (score < challenge.score) {
                    challenge = { id: otherId, score };
                }
            });

            // Store for modal access
            currentTopMatch = topMatch;
            currentChallenge = challenge;

            const myArch = data.archetypes[currentArchetype];

            if (topMatch.id) {
                const arch = data.archetypes[topMatch.id];
                if (arch) {
                    document.getElementById('topMatchDot').style.background = arch.color;
                    document.getElementById('topMatchName').textContent = `${myArch?.name || 'Ich'} (Ich) mit ${arch.name}`;
                    document.getElementById('topMatchScore').textContent = topMatch.score;
                }
            }

            if (challenge.id) {
                const arch = data.archetypes[challenge.id];
                if (arch) {
                    document.getElementById('challengeDot').style.background = arch.color;
                    document.getElementById('challengeName').textContent = `${myArch?.name || 'Ich'} (Ich) mit ${arch.name}`;
                    document.getElementById('challengeScore').textContent = challenge.score;
                }
            }
        }

        function updatePartnerView() {
            const myArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];
            const interactionKey = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions[interactionKey] || {};

            // Run Pathos/Logos checks (keine Blockierung mehr - zeigt nur Warnungen)
            runCompatibilityChecks();

            // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen
            updateGfkFromArchetypes();

            document.getElementById('myTypeNameDisplay').textContent = myArch?.name || '...';
            document.getElementById('partnerNameDisplay').textContent = partnerArch?.name || '...';
            document.getElementById('myTypeTooltipPage3').textContent = getShortDef(currentArchetype);
            document.getElementById('partnerTooltipPage3').textContent = getShortDef(selectedPartner);

            const score = interaction.overall || 0;
            const scoreEl = document.getElementById('overallScore');
            scoreEl.textContent = score;
            scoreEl.style.color = getScoreColor(score);

            drawRadarChart(interaction.scores || {}, partnerArch?.color || '#457B9D');
            updateCategoryBars(interaction.scores || {});

            const proList = document.getElementById('partnerPro');
            proList.innerHTML = (interaction.pro || []).map(p => `<li>${p}</li>`).join('') || '<li>Keine Daten</li>';

            const contraList = document.getElementById('partnerContra');
            contraList.innerHTML = (interaction.contra || []).map(c => `<li>${c}</li>`).join('') || '<li>Keine Daten</li>';
        }

        function drawRadarChart(scores, color) {
            const svg = document.getElementById('radarChart');
            const cx = 140, cy = 120, maxR = 90;
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            const n = categories.length;

            let html = '';

            for (let r = 18; r <= maxR; r += 18) {
                html += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
            }

            categories.forEach((cat, i) => {
                const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                const x = cx + Math.cos(angle) * maxR;
                const y = cy + Math.sin(angle) * maxR;
                const labelX = cx + Math.cos(angle) * (maxR + 18);
                const labelY = cy + Math.sin(angle) * (maxR + 18);

                html += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
                html += `<text x="${labelX}" y="${labelY}" fill="var(--text-muted)" font-size="10" text-anchor="middle" dominant-baseline="middle">${cat}</text>`;
            });

            const points = categories.map((cat, i) => {
                const value = scores[cat]?.value || 0;
                const r = (value / 100) * maxR;
                const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
            }).join(' ');

            html += `<polygon points="${points}" fill="${color}33" stroke="${color}" stroke-width="2"/>`;

            categories.forEach((cat, i) => {
                const value = scores[cat]?.value || 0;
                const r = (value / 100) * maxR;
                const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                html += `<circle cx="${x}" cy="${y}" r="4" fill="${color}"/>`;
            });

            if (svg) svg.innerHTML = html;

            // Also draw on expandRadarChart (smaller version)
            const expandSvg = document.getElementById('expandRadarChart');
            if (expandSvg) expandSvg.innerHTML = html;
        }

        function updateCategoryBars(scores) {
            const container = document.getElementById('categoryBars');
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

            container.innerHTML = categories.map(cat => {
                const value = scores[cat]?.value || 0;
                const barClass = getBarClass(value);
                const name = categoryNames[cat] || cat;

                return `
                    <div class="category-row" onclick="openSingleCategoryModal('${cat}')">
                        <span class="category-label">${cat}</span>
                        <div class="category-bar-wrap">
                            <div class="category-bar-container">
                                <div class="category-bar ${barClass}" style="width: ${value}%">
                                    <span class="category-bar-value">${value}%</span>
                                </div>
                            </div>
                            <div class="category-name">${name}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function getScoreColor(score) {
            if (score >= 70) return '#457B9D';  // Blau - Gut
            if (score >= 50) return '#f39c12';  // Orange - Mittel
            return '#e74c3c';                   // Rot - Herausfordernd
        }

        // Farbverlauf für Score Cycle: rot (0%) → gelb (50%) → grün (100%)
        function getScoreGradientColor(score) {
            // Clamp score between 0 and 100
            score = Math.max(0, Math.min(100, score));

            let r, g, b;

            if (score <= 50) {
                // Rot (0%) → Gelb (50%)
                // Rot: rgb(231, 76, 60) → Gelb: rgb(241, 196, 15)
                const t = score / 50;
                r = Math.round(231 + (241 - 231) * t);
                g = Math.round(76 + (196 - 76) * t);
                b = Math.round(60 + (15 - 60) * t);
            } else {
                // Gelb (50%) → Grün (100%)
                // Gelb: rgb(241, 196, 15) → Grün: rgb(46, 204, 113)
                const t = (score - 50) / 50;
                r = Math.round(241 + (46 - 241) * t);
                g = Math.round(196 + (204 - 196) * t);
                b = Math.round(15 + (113 - 15) * t);
            }

            return `rgb(${r}, ${g}, ${b})`;
        }

        // Update Score Cycle im Synthese Modal und auf der Hauptseite
        function updateSyntheseScoreCycle() {
            const scoreValueEl = document.getElementById('syntheseScoreValue');
            const scoreProgressEl = document.getElementById('syntheseScoreProgress');
            const mainScoreValueEl = document.getElementById('mainScoreValue');
            const mainScoreProgressEl = document.getElementById('mainScoreProgress');

            // Get current score from resultPercentage
            const percentage = document.getElementById('resultPercentage');
            const currentScore = percentage ? parseFloat(percentage.textContent) || 0 : 0;
            const displayScore = currentScore.toFixed(1);

            // Update circle progress (circumference = 2 * PI * r = 2 * 3.14159 * 42 ≈ 264)
            const circumference = 264;
            const offset = circumference - (currentScore / 100) * circumference;

            // Update color based on score (rot → gelb → grün)
            const color = getScoreGradientColor(currentScore);

            // Update Modal Score Circle
            if (scoreValueEl && scoreProgressEl) {
                scoreValueEl.textContent = displayScore;
                scoreProgressEl.style.strokeDashoffset = offset;
                scoreProgressEl.style.stroke = color;
                scoreValueEl.style.color = color;
            }

            // Update Main Page Score Circle
            if (mainScoreValueEl && mainScoreProgressEl) {
                mainScoreValueEl.textContent = displayScore;
                mainScoreProgressEl.style.strokeDashoffset = offset;
                mainScoreProgressEl.style.stroke = color;
                mainScoreValueEl.style.color = color;
            }

            // Update Mobile Score Circle
            const mobileScoreEl = document.getElementById('mobileScoreCircle');
            const mobileScoreProgressEl = document.getElementById('mobileScoreProgress');

            if (mobileScoreEl) {
                mobileScoreEl.textContent = displayScore;
                mobileScoreEl.style.color = color;
            }

            if (mobileScoreProgressEl) {
                mobileScoreProgressEl.style.strokeDashoffset = offset;
                mobileScoreProgressEl.style.stroke = color;
            }

            // Update Score Summary Line in Synthese Modal
            const scoreSummaryValueEl = document.getElementById('syntheseScoreSummaryValue');
            const needsSummaryValueEl = document.getElementById('syntheseNeedsSummaryValue');

            if (scoreSummaryValueEl) {
                scoreSummaryValueEl.textContent = displayScore;
                scoreSummaryValueEl.style.color = color;
            }

            if (needsSummaryValueEl) {
                // Get Bedürfnis-Übereinstimmung from lastGfkMatchingResult
                const needsScore = lastGfkMatchingResult ? lastGfkMatchingResult.score : 0;
                needsSummaryValueEl.textContent = needsScore;
                // Color based on needs score
                const needsColor = getScoreGradientColor(needsScore);
                needsSummaryValueEl.style.color = needsColor;
            }
        }

        function getBarClass(value) {
            if (value >= 70) return 'bar-good';
            if (value >= 50) return 'bar-medium';
            return 'bar-low';
        }

        function toggleCollapsible(id) {
            document.getElementById(id).classList.toggle('open');
        }

        // Toggle dimension collapse for Dominanz/Orientierung sections
        function toggleDimensionCollapse(element) {
            element.classList.toggle('collapsed');
        }

        // Track global fold/unfold state
        let allDimensionsCollapsed = false;

        // Toggle all dimensions AND desktop factors collapse/expand at once
        function toggleAllDimensionsCollapse() {
            const allDimensions = document.querySelectorAll('.collapsible-dimension');
            const allFactors = document.querySelectorAll('.desktop-factor-item');
            
            // Get both desktop and mobile buttons
            const desktopBtn = document.getElementById('foldUnfoldAllBtn');
            const mobileBtn = document.getElementById('mobileFoldUnfoldBtn');

            allDimensionsCollapsed = !allDimensionsCollapsed;

            // Toggle collapsible dimensions
            allDimensions.forEach(dim => {
                if (allDimensionsCollapsed) {
                    dim.classList.add('collapsed');
                } else {
                    dim.classList.remove('collapsed');
                }
            });

            // Toggle desktop factor items
            allFactors.forEach(factor => {
                if (allDimensionsCollapsed) {
                    factor.classList.add('collapsed');
                } else {
                    factor.classList.remove('collapsed');
                }
            });

            // Update both buttons' appearance
            const buttons = [desktopBtn, mobileBtn].filter(btn => btn !== null);
            buttons.forEach(btn => {
                const icon = btn.querySelector('.fold-unfold-icon');
                const text = btn.querySelector('.fold-unfold-text');

                if (allDimensionsCollapsed) {
                    icon.textContent = '▶';
                    text.textContent = 'Unfold';
                    btn.classList.add('collapsed-state');
                } else {
                    icon.textContent = '▼';
                    text.textContent = 'Fold';
                    btn.classList.remove('collapsed-state');
                }
            });

            // Update desktop factor content when expanding
            if (!allDimensionsCollapsed) {
                updateDesktopFactorContent();
            }
        }

        // Toggle single desktop factor expand/collapse
        function toggleDesktopFactor(element) {
            const wasCollapsed = element.classList.contains('collapsed');
            element.classList.toggle('collapsed');
            // Update the fold/unfold button state based on current state
            updateDesktopFactorFoldButton();
            // Update content when expanding
            if (wasCollapsed) {
                updateDesktopFactorContent();
            }
        }

        // Update fold button based on current state of all collapsible elements
        function updateDesktopFactorFoldButton() {
            const allDimensions = document.querySelectorAll('.collapsible-dimension');
            const allFactors = document.querySelectorAll('.desktop-factor-item');
            const desktopBtn = document.getElementById('foldUnfoldAllBtn');
            const mobileBtn = document.getElementById('mobileFoldUnfoldBtn');

            // Check if all are collapsed (both dimensions and factors)
            const allDimensionsCollapsedCheck = Array.from(allDimensions).every(d => d.classList.contains('collapsed'));
            const allFactorsCollapsed = Array.from(allFactors).every(f => f.classList.contains('collapsed'));
            const allCollapsed = allDimensionsCollapsedCheck && allFactorsCollapsed;

            allDimensionsCollapsed = allCollapsed;

            // Update both buttons
            const buttons = [desktopBtn, mobileBtn].filter(btn => btn !== null);
            buttons.forEach(btn => {
                const icon = btn.querySelector('.fold-unfold-icon');
                const text = btn.querySelector('.fold-unfold-text');

                if (allCollapsed) {
                    icon.textContent = '▶';
                    text.textContent = 'Unfold';
                    btn.classList.add('collapsed-state');
                } else {
                    icon.textContent = '▼';
                    text.textContent = 'Fold';
                    btn.classList.remove('collapsed-state');
                }
            });
        }

        // Update all desktop factor expandable content
        function updateDesktopFactorContent() {
            // Check if factorExplanations is defined (it's defined later in the file)
            if (typeof factorExplanations === 'undefined') return;

            const ich = mobileIchArchetype;
            const partner = mobilePartnerArchetype;
            const dimensions = personDimensions;

            const factorTypes = ['archetyp', 'dominanz', 'orientierung', 'geschlecht'];

            factorTypes.forEach(factorType => {
                const factor = factorExplanations[factorType];
                if (!factor) return;

                // Get score
                const prefix = 'desktopFactor';
                let score = 0;
                const scoreEl = document.getElementById(prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1));
                if (scoreEl) {
                    score = parseInt(scoreEl.textContent) || 0;
                }

                // Update explanation
                const explanationId = prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1) + 'Explanation';
                const explanationEl = document.getElementById(explanationId);
                if (explanationEl) {
                    explanationEl.textContent = factor.getExplanation(ich, partner, score, dimensions);
                }

                // Update meaning list
                const meaningId = prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1) + 'Meaning';
                const meaningList = document.getElementById(meaningId);
                if (meaningList) {
                    meaningList.innerHTML = '';
                    factor.getMeaning(score, ich, partner).forEach(item => {
                        const li = document.createElement('li');
                        if (typeof item === 'object' && item.title) {
                            li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                        } else {
                            li.textContent = item;
                        }
                        meaningList.appendChild(li);
                    });
                }
            });
        }

        function scrollToCard(index) {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            carousel.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
        }

        const TOTAL_PAGES = 4;

        function updateNavDots() {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            const currentCard = Math.round(carousel.scrollLeft / cardWidth);

            document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentCard);
            });

            // Update arrow states
            const arrows = document.querySelectorAll('.nav-arrow');
            if (arrows.length >= 2) {
                arrows[0].disabled = currentCard === 0;
                arrows[1].disabled = currentCard === TOTAL_PAGES - 1;
            }

            // Load feedback when on page 4
            if (currentCard === 3) {
                loadFeedback();
            }
        }

        function navigatePrev() {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            const currentCard = Math.round(carousel.scrollLeft / cardWidth);
            if (currentCard > 0) {
                scrollToCard(currentCard - 1);
            }
        }

        function navigateNext() {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            const currentCard = Math.round(carousel.scrollLeft / cardWidth);
            if (currentCard < TOTAL_PAGES - 1) {
                scrollToCard(currentCard + 1);
            }
        }

        // Legend Categories
        function updateLegendCategories() {
            const container = document.getElementById('legendCategories');
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

            // Get current interaction scores
            const interactionKey = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions[interactionKey] || {};
            const scores = interaction.scores || {};

            const myArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];
            const myName = myArch?.name || currentArchetype;
            const partnerName = partnerArch?.name || selectedPartner;

            // Show which combination is displayed
            const headerText = currentArchetype === selectedPartner
                ? `${myName} (Ich) mit ${myName}`
                : `${myName} (Ich) mit ${partnerName}`;

            container.innerHTML = `
                <div style="margin-bottom: 15px; padding: 10px; background: var(--bg-dark); border-radius: 10px; text-align: center;">
                    <span style="color: var(--text-muted); font-size: var(--font-sm);">Aktuelle Auswahl:</span>
                    <div style="color: var(--primary); font-weight: 600; font-size: var(--font-base);">${headerText}</div>
                </div>
            ` + categories.map(cat => {
                const catData = categoryDescriptions[cat] || {};
                const name = catData.name || categoryNames[cat] || cat;
                const desc = catData.description || 'Beschreibung nicht verfügbar';
                const value = scores[cat]?.value || 0;
                const scoreColor = getScoreColor(value);

                return `
                    <div class="legend-category-item" onclick="openSingleCategoryModal('${cat}')">
                        <div class="legend-category-letter">${cat}</div>
                        <div class="legend-category-content">
                            <div class="legend-category-name">${name}</div>
                            <div class="legend-category-desc">${desc}</div>
                        </div>
                        <div style="font-weight: 700; font-size: var(--font-md); color: ${scoreColor}; min-width: 50px; text-align: right;">${value}</div>
                    </div>
                `;
            }).join('');
        }

        // Modal Functions
        function openCategoryModal() {
            // Reset modal context when opening directly (uses page 2 selection)
            modalContextPartner = null;
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            document.getElementById('modalTitle').textContent = 'Alle Kategorien';
            document.getElementById('modalBody').innerHTML = categories.map(cat => getCategoryModalContent(cat)).join('');
            document.getElementById('categoryModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        let currentModalCategory = 'A'; // Track current category for navigation

        function openSingleCategoryModal(category) {
            currentModalCategory = category;
            // Don't reset modalContextPartner here - it may be set from match modal
            const catData = categoryDescriptions[category] || {};
            const name = catData.name || categoryNames[category] || category;
            document.getElementById('modalTitle').textContent = `Kategorie ${category}`;
            document.getElementById('modalBody').innerHTML = getCategoryModalContent(category);
            document.getElementById('categoryModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function navigateCategoryPrev() {
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            const currentIndex = categories.indexOf(currentModalCategory);
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
            openSingleCategoryModal(categories[prevIndex]);
        }

        function navigateCategoryNext() {
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            const currentIndex = categories.indexOf(currentModalCategory);
            const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
            openSingleCategoryModal(categories[nextIndex]);
        }

        function getCategoryModalContent(cat) {
            const catData = categoryDescriptions[cat] || {};
            const name = catData.name || categoryNames[cat] || cat;
            const desc = catData.description || 'Beschreibung nicht verfügbar';
            const subDims = catData.subDimensions || [];

            // Use modalContextPartner if set (from match modal), otherwise use selectedPartner (from page 2)
            const partnerId = modalContextPartner || selectedPartner;
            const interactionKey = `${currentArchetype}_${partnerId}`;
            const interaction = data.interactions[interactionKey] || {};
            const scores = interaction.scores || {};
            const value = scores[cat]?.value || 0;
            const scoreColor = getScoreColor(value);
            const barClass = getBarClass(value);

            const myArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[partnerId];
            const comboText = `${myArch?.name || '?'} + ${partnerArch?.name || '?'}`;
            const contextText = `${comboText} | ${name}`;

            // Get category position for navigation
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            const catIndex = categories.indexOf(cat);
            const prevCat = categories[catIndex > 0 ? catIndex - 1 : categories.length - 1];
            const nextCat = categories[catIndex < categories.length - 1 ? catIndex + 1 : 0];
            const prevName = categoryNames[prevCat] || prevCat;
            const nextName = categoryNames[nextCat] || nextCat;

            return `
                <div class="category-nav-row">
                    <button class="category-nav-btn" onclick="navigateCategoryPrev()">
                        ‹ ${prevCat}
                    </button>
                    <span class="category-nav-indicator">${catIndex + 1} / 6</span>
                    <button class="category-nav-btn" onclick="navigateCategoryNext()">
                        ${nextCat} ›
                    </button>
                </div>

                <div class="modal-category">
                    <div class="modal-category-header">
                        <div class="modal-category-letter">${cat}</div>
                        <div class="modal-category-name">${name}</div>
                    </div>
                    <div class="match-modal-score" style="margin: 12px 0;">
                        <span class="match-modal-score-label">${comboText}</span>
                        <span class="match-modal-score-value" style="color: ${scoreColor}">${value}</span>
                    </div>
                    <div class="modal-category-desc">${desc}</div>
                    ${subDims.length > 0 ? `
                        <div class="modal-subdimensions">
                            ${subDims.map(sd => renderTagWithTooltip(sd, cat, currentArchetype, partnerId)).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Render a tag with tooltip
        function renderTagWithTooltip(tagName, category, type1Id, type2Id) {
            const tooltip = getTagTooltip(type1Id, type2Id, category, tagName);
            const type1 = data.archetypes[type1Id];
            const type2 = data.archetypes[type2Id];
            const color1 = type1?.color || 'var(--primary)';
            const color2 = type2?.color || 'var(--primary)';

            // Build type switcher options
            const allTypes = archetypeOrder.map(id => {
                const arch = data.archetypes[id];
                return `
                    <button class="type-switch-btn ${id === type1Id ? 'active' : ''}"
                            style="color: ${arch?.color || 'var(--text-secondary)'}"
                            onclick="event.stopPropagation(); switchTooltipType('${id}', 'ich', '${category}')">
                        <span class="dot" style="background: ${arch?.color}"></span>
                        ${arch?.name || id}
                    </button>
                `;
            }).join('');

            const partnerTypes = archetypeOrder.map(id => {
                const arch = data.archetypes[id];
                return `
                    <button class="type-switch-btn ${id === type2Id ? 'active' : ''}"
                            style="color: ${arch?.color || 'var(--text-secondary)'}"
                            onclick="event.stopPropagation(); switchTooltipType('${id}', 'partner', '${category}')">
                        <span class="dot" style="background: ${arch?.color}"></span>
                        ${arch?.name || id}
                    </button>
                `;
            }).join('');

            return `
                <span class="tag-tooltip-container">
                    <span class="modal-subdim-tag" onclick="openTagTooltip(this.parentElement, '${category}')">${tagName}</span>
                    <div class="tag-tooltip">
                        <button class="tag-tooltip-close" onclick="closeTagTooltip()">&times;</button>
                        <div class="tag-tooltip-header">${tagName}</div>

                        <div class="tag-tooltip-type-switcher">
                            <span class="type-switch-label">Ich:</span>
                            ${allTypes}
                        </div>
                        <div class="tag-tooltip-type-switcher">
                            <span class="type-switch-label">Partner:</span>
                            ${partnerTypes}
                        </div>

                        <div class="tag-tooltip-body">
                            <div class="tag-tooltip-perspective">
                                <span class="tag-tooltip-type-name" style="color: ${color1}">${tooltip.type1Name}:</span>
                                <span class="tag-tooltip-type-text">${tooltip.type1Perspective}</span>
                            </div>
                            <div class="tag-tooltip-perspective">
                                <span class="tag-tooltip-type-name" style="color: ${color2}">${tooltip.type2Name}:</span>
                                <span class="tag-tooltip-type-text">${tooltip.type2Perspective}</span>
                            </div>
                            <div class="tag-tooltip-dynamic">${tooltip.dynamic}</div>
                        </div>
                    </div>
                </span>
            `;
        }

        // Switch type from tooltip and refresh modal
        function switchTooltipType(typeId, role, category) {
            if (role === 'ich') {
                currentArchetype = typeId;
                // Update main UI
                document.getElementById('archetypeSelect').value = typeId;
                updateTheme();
                updateMyType();
                updatePartnerSelector();
                updateTopAndChallenge();
                updatePartnerView();
            } else {
                selectedPartner = typeId;
                modalContextPartner = typeId;
                // Update partner selection buttons
                document.querySelectorAll('.partner-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.id === typeId);
                });
                updatePartnerView();
            }

            // Update score display
            updateComparisonView();

            // Refresh the category modal with new types
            openSingleCategoryModal(category);
        }

        // Active tooltip tracking
        let activeTooltipElement = null;
        let activeTagElement = null;

        // Toggle tag tooltip on click
        function openTagTooltip(container, category) {
            const tooltip = container.querySelector('.tag-tooltip');
            const tag = container.querySelector('.modal-subdim-tag');
            if (!tooltip || !tag) return;

            // If this tooltip is already open, close it
            if (activeTooltipElement === tooltip) {
                closeTagTooltip();
                return;
            }

            // Close any other open tooltip first
            closeTagTooltip();

            // Activate this tooltip and tag
            activeTooltipElement = tooltip;
            activeTagElement = tag;
            tooltip.classList.add('active');
            tag.classList.add('active');

            // Position at top of viewport so it doesn't get cut off
            const tooltipWidth = Math.min(360, window.innerWidth * 0.92);
            const left = (window.innerWidth - tooltipWidth) / 2;
            const top = 60; // Fixed position near top

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            tooltip.style.width = tooltipWidth + 'px';
        }

        // Close tag tooltip
        function closeTagTooltip() {
            if (activeTooltipElement) {
                activeTooltipElement.classList.remove('active');
                activeTooltipElement = null;
            }
            if (activeTagElement) {
                activeTagElement.classList.remove('active');
                activeTagElement = null;
            }
            // Also close any other open tooltips and tags
            document.querySelectorAll('.tag-tooltip.active').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.modal-subdim-tag.active').forEach(t => t.classList.remove('active'));
        }

        function closeCategoryModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('categoryModal').classList.remove('active');
            document.body.style.overflow = '';
            // Reset modal context when closing
            modalContextPartner = null;
        }

        // Definition Modal Functions
        function openDefinitionModal(archetypeId) {
            const def = archetypeDescriptions[archetypeId];
            if (!def) return;

            const arch = data.archetypes[archetypeId];
            const color = arch?.color || 'var(--primary)';
            const icon = icons[archetypeId] || '?';

            document.getElementById('definitionModalTitle').innerHTML = `
                <span style="color: ${color}">${icon}</span> ${def.name}
            `;

            document.getElementById('definitionModalBody').innerHTML = `
                <div class="definition-long">${def.longDef}</div>

                <div class="definition-section">
                    <div class="definition-section-title">Kernprinzipien</div>
                    <ul class="definition-list principles">
                        ${def.keyPrinciples.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>

                <div class="definition-section">
                    <div class="definition-section-title">Das ist NICHT dasselbe wie</div>
                    <ul class="definition-list not-same">
                        ${def.notTheSameAs.map(n => `<li>${n}</li>`).join('')}
                    </ul>
                </div>

                <div class="definition-section">
                    <div class="definition-section-title">Varianten</div>
                    <ul class="definition-list variants">
                        ${def.variants.map(v => `<li>${v}</li>`).join('')}
                    </ul>
                </div>
            `;

            document.getElementById('definitionModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeDefinitionModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('definitionModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // ========================================
        // Definition Modal Swipe Navigation
        // ========================================
        let currentDefinitionIndex = 0;
        let currentDefinitionPerson = 'ich'; // Track whether showing 'ich' or 'partner'
        let definitionTouchStartX = 0;

        function handleDefinitionTouchStart(e) {
            definitionTouchStartX = e.touches[0].clientX;
        }

        function handleDefinitionTouchEnd(e) {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = definitionTouchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                navigateDefinition(diff > 0 ? 1 : -1);
            }
        }

        function navigateDefinition(direction) {
            currentDefinitionIndex += direction;
            if (currentDefinitionIndex < 0) currentDefinitionIndex = archetypeOrder.length - 1;
            if (currentDefinitionIndex >= archetypeOrder.length) currentDefinitionIndex = 0;

            const newArchetype = archetypeOrder[currentDefinitionIndex];
            showArchetypeInfoByType(newArchetype);

            // Sync dropdown and dispatch change event to trigger UI updates
            if (currentDefinitionPerson === 'ich') {
                const ichSelect = document.getElementById('ichSelect');
                if (ichSelect) {
                    ichSelect.value = newArchetype;
                    ichSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
            } else if (currentDefinitionPerson === 'partner') {
                const partnerSelect = document.getElementById('partnerSelect');
                if (partnerSelect) {
                    partnerSelect.value = newArchetype;
                    partnerSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }

        // Alias for button onclick
        function navigateDefinitionModal(direction) {
            navigateDefinition(direction);
        }

        function showArchetypeInfoByType(archetypeId) {
            if (!data || !data.archetypes || !data.archetypes[archetypeId]) {
                console.error('Data not available for archetype:', archetypeId);
                return;
            }

            const arch = data.archetypes[archetypeId];
            const def = archetypeDescriptions[archetypeId];

            // Get localized archetype data from i18n (with fallback to hardcoded def)
            const localizedArch = {
                name: TiageI18n.t(`archetypes.${archetypeId}.name`, arch.name),
                shortDef: TiageI18n.t(`archetypes.${archetypeId}.shortDef`, def?.shortDef || ''),
                longDef: TiageI18n.t(`archetypes.${archetypeId}.longDef`, def?.longDef || ''),
                keyPrinciples: TiageI18n.t(`archetypes.${archetypeId}.keyPrinciples`, def?.keyPrinciples || []),
                notTheSameAs: TiageI18n.t(`archetypes.${archetypeId}.notTheSameAs`, def?.notTheSameAs || []),
                variants: TiageI18n.t(`archetypes.${archetypeId}.variants`, def?.variants || [])
            };

            // Top navigation dots and swipe hint
            const swipeHint = TiageI18n.t('archetypeModal.swipeHint', '← Wischen zum Navigieren →');
            let topNav = `
                <div class="definition-nav-dots" style="display: flex; justify-content: center; gap: 8px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border);">
                    ${archetypeOrder.map((id, index) => `
                        <span class="definition-dot${index === currentDefinitionIndex ? ' active' : ''}"
                              onclick="navigateDefinitionToIndex(${index})"
                              style="width: 10px; height: 10px; border-radius: 50%; background: ${index === currentDefinitionIndex ? 'var(--primary)' : 'var(--border)'}; cursor: pointer; transition: all 0.2s;"></span>
                    `).join('')}
                </div>
                <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-bottom: 15px;">${swipeHint}</div>
            `;

            let modalContent = topNav + `
                <div class="modal-category">
                    <div class="modal-category-header">
                        <div class="modal-category-letter" style="background: ${arch.color}; width: 40px; height: 40px; font-size: 20px;">${icons[archetypeId]}</div>
                        <div class="modal-category-name">${localizedArch.name}</div>
                    </div>
                    <div class="modal-category-desc">${localizedArch.shortDef || ''}</div>
            `;

            if (def || localizedArch.longDef) {
                modalContent += `
                    <div class="definition-long" style="margin-top: 15px;">${localizedArch.longDef || ''}</div>
                `;

                const keyPrinciples = localizedArch.keyPrinciples;
                if (keyPrinciples && keyPrinciples.length > 0) {
                    modalContent += `
                        <div class="definition-section">
                            <div class="definition-section-title">${TiageI18n.t('archetypeModal.keyPrinciples', 'Kernprinzipien')}</div>
                            <ul class="definition-list principles">
                                ${keyPrinciples.map(p => `<li>${p}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }

                const notTheSameAs = localizedArch.notTheSameAs;
                if (notTheSameAs && notTheSameAs.length > 0) {
                    modalContent += `
                        <div class="definition-section">
                            <div class="definition-section-title">${TiageI18n.t('archetypeModal.notTheSameAs', 'Das ist NICHT')}</div>
                            <ul class="definition-list not-same">
                                ${notTheSameAs.map(n => `<li>${n}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }

                const variants = localizedArch.variants;
                if (variants && variants.length > 0) {
                    modalContent += `
                        <div class="definition-section">
                            <div class="definition-section-title">${TiageI18n.t('archetypeModal.variants', 'Varianten')}</div>
                            <ul class="definition-list variants">
                                ${variants.map(v => `<li>${v}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
            }

            // Add Pathos & Logos section
            const pathos = arch.pathos || '';
            const logos = arch.logos || '';

            if (pathos || logos) {
                modalContent += `
                    <div class="definition-section" style="margin-top: 20px; border-top: 1px solid var(--border); padding-top: 15px;">
                        <div class="definition-section-title" style="margin-bottom: 15px;">${TiageI18n.t('archetypeModal.pathosLogos', 'Pathos & Logos')}</div>
                `;

                if (pathos) {
                    modalContent += `
                        <div style="margin-bottom: 15px; padding: 12px; background: rgba(231,76,60,0.1); border-radius: 10px; border-left: 3px solid #e74c3c;">
                            <div style="color: #e74c3c; font-weight: 600; font-size: 13px; margin-bottom: 6px;">${TiageI18n.t('archetypeModal.pathosLabel', 'Pathos (Emotionale Ebene)')}</div>
                            <p style="color: var(--text-secondary); font-style: italic; line-height: 1.5; font-size: 12px; margin: 0;">${pathos}</p>
                        </div>
                    `;
                }

                if (logos) {
                    modalContent += `
                        <div style="padding: 12px; background: rgba(52,152,219,0.1); border-radius: 10px; border-left: 3px solid #3498db;">
                            <div style="color: #3498db; font-weight: 600; font-size: 13px; margin-bottom: 6px;">${TiageI18n.t('archetypeModal.logosLabel', 'Logos (Rationale Ebene)')}</div>
                            <p style="color: var(--text-secondary); font-style: italic; line-height: 1.5; font-size: 12px; margin: 0;">${logos}</p>
                        </div>
                    `;
                }

                modalContent += `</div>`;
            }

            modalContent += '</div>';

            // Add navigation dots and confirm button
            modalContent += `
                <div class="definition-nav-dots" style="display: flex; justify-content: center; gap: 8px; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border);">
                    ${archetypeOrder.map((id, index) => `
                        <span class="definition-dot${index === currentDefinitionIndex ? ' active' : ''}"
                              onclick="navigateDefinitionToIndex(${index})"
                              style="width: 10px; height: 10px; border-radius: 50%; background: ${index === currentDefinitionIndex ? 'var(--primary)' : 'var(--border)'}; cursor: pointer; transition: all 0.2s;"></span>
                    `).join('')}
                </div>
                <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 8px;">${swipeHint}</div>
                <button onclick="confirmDefinitionSelection()" style="
                    display: block;
                    width: 100%;
                    margin-top: 15px;
                    padding: 12px 20px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    ${TiageI18n.t('archetypeModal.confirmSelection', 'Auswahl übernehmen')}
                </button>
            `;

            const definitionLabel = TiageI18n.t('archetypeModal.definition', 'Definition');
            document.getElementById('definitionModalTitle').textContent = `${localizedArch.name} - ${definitionLabel}`;
            document.getElementById('definitionModalBody').innerHTML = modalContent;
            document.getElementById('definitionModalBody').scrollTop = 0;
        }

        function navigateDefinitionToIndex(index) {
            currentDefinitionIndex = index;
            const newArchetype = archetypeOrder[index];
            showArchetypeInfoByType(newArchetype);

            // Sync dropdown and dispatch change event to trigger UI updates
            if (currentDefinitionPerson === 'ich') {
                const ichSelect = document.getElementById('ichSelect');
                if (ichSelect) {
                    ichSelect.value = newArchetype;
                    ichSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
            } else if (currentDefinitionPerson === 'partner') {
                const partnerSelect = document.getElementById('partnerSelect');
                if (partnerSelect) {
                    partnerSelect.value = newArchetype;
                    partnerSelect.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }

        function confirmDefinitionSelection() {
            console.log('confirmDefinitionSelection called');
            console.log('currentDefinitionIndex:', currentDefinitionIndex);
            console.log('archetypeOrder:', archetypeOrder);

            const selectedArchetype = archetypeOrder[currentDefinitionIndex];
            console.log('selectedArchetype:', selectedArchetype);
            console.log('currentDefinitionPerson:', currentDefinitionPerson);

            if (currentDefinitionPerson === 'ich') {
                // Update main dropdown
                currentArchetype = selectedArchetype;
                const selectElement = document.getElementById('archetypeSelect');
                if (selectElement) {
                    selectElement.value = selectedArchetype;
                    // Dispatch change event to ensure listeners are notified
                    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                }
                console.log('Updated currentArchetype to:', currentArchetype);
                updateAll();
            } else {
                // Update partner selection
                console.log('Calling selectPartner with:', selectedArchetype);
                selectPartner(selectedArchetype);
            }

            // Close modal
            document.getElementById('definitionModal').classList.remove('active');
            document.body.style.overflow = '';
            console.log('Modal closed, selection complete');
        }

        // Get short definition for tooltip
        function getShortDef(archetypeId) {
            return archetypeDescriptions[archetypeId]?.shortDef || '';
        }

        // Store current match data for modal access
        let currentTopMatch = { id: null, score: 0 };
        let currentChallenge = { id: null, score: 0 };
        let modalContextPartner = null; // Track which partner to use in category modal
        let currentMatchModalView = localStorage.getItem('matchModalView') || 'pathos'; // pathos or logos
        let currentMatchModalData = null; // Store current modal data for toggle refresh

        // Match Modal Toggle Function
        function toggleMatchModalView(view) {
            currentMatchModalView = view;
            localStorage.setItem('matchModalView', view);

            // Update toggle button styles
            document.getElementById('matchTogglePathos').classList.toggle('active', view === 'pathos');
            document.getElementById('matchToggleLogos').classList.toggle('active', view === 'logos');

            // Refresh modal content if data is available
            if (currentMatchModalData) {
                const content = getMatchModalContent(
                    currentMatchModalData.partnerArch,
                    currentMatchModalData.interaction,
                    currentMatchModalData.scores,
                    currentMatchModalData.scoreColor,
                    currentMatchModalData.myArch
                );
                document.getElementById('modalBody').innerHTML = content;
            }
        }

        // Generate dynamic Pro items based on current view (Pathos/Logos)
        function generateDynamicPro(myArch, partnerArch, view) {
            const items = [];
            const ichId = myArch.id;
            const partnerId = partnerArch.id;

            if (view === 'pathos') {
                // Emotional/Pathos perspective - use PathosTextGenerator if available
                if (typeof PathosTextGenerator !== 'undefined') {
                    const resonance = PathosTextGenerator.calculateResonance?.(myArch, partnerArch) || {};
                    if (resonance.emotional > 0.6) items.push('Starke emotionale Resonanz zwischen euren Energien');
                    if (resonance.intuitive > 0.5) items.push('Intuitives Verständnis füreinander');
                }
                // Fallback emotional pros
                if (ichId === partnerId) {
                    items.push('Tiefes Gefühl des Verstandenwerdens');
                    items.push('Geteilte emotionale Sprache');
                }
                if (items.length === 0) {
                    items.push('Potenzial für emotionale Verbindung');
                    items.push('Raum für gegenseitiges Wachstum');
                }
            } else {
                // Rational/Logos perspective - use LogosTextGenerator if available
                if (typeof LogosTextGenerator !== 'undefined') {
                    const analysis = LogosTextGenerator.analyzeCompatibility?.(myArch, partnerArch) || {};
                    if (analysis.structuralMatch > 0.6) items.push('Kompatible Beziehungsstrukturen');
                    if (analysis.valueAlignment > 0.5) items.push('Übereinstimmende Grundwerte');
                }
                // Fallback structural pros
                if (ichId === partnerId) {
                    items.push('Identische Beziehungsphilosophie');
                    items.push('Gleiche Erwartungen an Verbindlichkeit');
                }
                if (items.length === 0) {
                    items.push('Klare Kommunikationsbasis möglich');
                    items.push('Strukturelle Anpassung machbar');
                }
            }
            return items;
        }

        // Generate dynamic Contra items based on current view (Pathos/Logos)
        function generateDynamicContra(myArch, partnerArch, view) {
            const items = [];
            const ichId = myArch.id;
            const partnerId = partnerArch.id;

            // Use IntegratedSynthesisTextGenerator for conflicts if available
            if (typeof IntegratedSynthesisTextGenerator !== 'undefined') {
                const conflicts = IntegratedSynthesisTextGenerator.identifyPartnerConflicts(
                    ichId, partnerId, null, null
                );

                if (view === 'pathos') {
                    // Emotional perspective on conflicts
                    conflicts.forEach(conflict => {
                        if (conflict.dynamics?.core_wound) {
                            items.push(conflict.dynamics.core_wound);
                        }
                    });
                    // Inner conflicts
                    const innerData = IntegratedSynthesisTextGenerator.data?.innerConflicts;
                    if (innerData?.[ichId]?.shadow) {
                        items.push(`Dein Schatten: ${innerData[ichId].shadow.substring(0, 80)}...`);
                    }
                } else {
                    // Rational perspective on conflicts
                    conflicts.forEach(conflict => {
                        items.push(`${conflict.title}: ${conflict.dynamics?.pattern || ''}`);
                    });
                }
            }

            // Fallback contras
            if (items.length === 0) {
                if (view === 'pathos') {
                    items.push('Emotionale Frequenzen können divergieren');
                    items.push('Risiko von Missverständnissen auf Gefühlsebene');
                } else {
                    items.push('Unterschiedliche Erwartungen möglich');
                    items.push('Kommunikationsarbeit erforderlich');
                }
            }

            return items;
        }

        // Generate synthesis section with psychological depth
        function generateSynthesisSection(myArch, partnerArch) {
            if (typeof IntegratedSynthesisTextGenerator === 'undefined') {
                return '';
            }

            const ichId = myArch.id;
            const partnerId = partnerArch.id;

            // Get inner conflicts
            const innerData = IntegratedSynthesisTextGenerator.data?.innerConflicts || {};
            const ichConflict = innerData[ichId];
            const partnerConflict = innerData[partnerId];

            let conflictHtml = '';

            // ═══════════════════════════════════════════════════════════════════
            // DEIN INNERER KONFLIKT - Mit voller Tiefe
            // ═══════════════════════════════════════════════════════════════════
            if (ichConflict) {
                conflictHtml += `
                    <div class="match-modal-inner-conflict">
                        <div class="match-modal-inner-conflict-title">🔮 Dein innerer Konflikt: ${ichConflict.core}</div>
                        <div class="match-modal-inner-conflict-text">${ichConflict.description}</div>
                        ${ichConflict.psychological ? `
                            <div style="margin-top: 10px; padding: 8px; background: rgba(255, 193, 7, 0.05); border-radius: 6px;">
                                <div style="font-size: 11px; color: #f39c12; font-weight: 600; margin-bottom: 4px;">🧠 Psychologisch</div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.psychological}</div>
                            </div>
                        ` : ''}
                        ${ichConflict.shadow ? `
                            <div style="margin-top: 8px; padding: 8px; background: rgba(128, 0, 128, 0.08); border-radius: 6px;">
                                <div style="font-size: 11px; color: #9b59b6; font-weight: 600; margin-bottom: 4px;">🌑 Schattenseite</div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.shadow}</div>
                            </div>
                        ` : ''}
                        ${ichConflict.growth ? `
                            <div style="margin-top: 8px; padding: 8px; background: rgba(39, 174, 96, 0.08); border-radius: 6px;">
                                <div style="font-size: 11px; color: #27ae60; font-weight: 600; margin-bottom: 4px;">🌱 Wachstumspotenzial</div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.growth}</div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            // ═══════════════════════════════════════════════════════════════════
            // PARTNER-KONFLIKT - Mit voller Tiefe
            // ═══════════════════════════════════════════════════════════════════
            if (partnerConflict && ichId !== partnerId) {
                conflictHtml += `
                    <div class="match-modal-inner-conflict" style="margin-top: 12px;">
                        <div class="match-modal-inner-conflict-title">🔮 Partner-Konflikt: ${partnerConflict.core}</div>
                        <div class="match-modal-inner-conflict-text">${partnerConflict.description}</div>
                        ${partnerConflict.psychological ? `
                            <div style="margin-top: 10px; padding: 8px; background: rgba(255, 193, 7, 0.05); border-radius: 6px;">
                                <div style="font-size: 11px; color: #f39c12; font-weight: 600; margin-bottom: 4px;">🧠 Psychologisch</div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.psychological}</div>
                            </div>
                        ` : ''}
                        ${partnerConflict.shadow ? `
                            <div style="margin-top: 8px; padding: 8px; background: rgba(128, 0, 128, 0.08); border-radius: 6px;">
                                <div style="font-size: 11px; color: #9b59b6; font-weight: 600; margin-bottom: 4px;">🌑 Schattenseite</div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.shadow}</div>
                            </div>
                        ` : ''}
                        ${partnerConflict.growth ? `
                            <div style="margin-top: 8px; padding: 8px; background: rgba(39, 174, 96, 0.08); border-radius: 6px;">
                                <div style="font-size: 11px; color: #27ae60; font-weight: 600; margin-bottom: 4px;">🌱 Wachstumspotenzial</div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.growth}</div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            // Get partner conflicts (interpersonelle Spannungen)
            const partnerConflicts = IntegratedSynthesisTextGenerator.identifyPartnerConflicts(
                ichId, partnerId, null, null
            );

            // ═══════════════════════════════════════════════════════════════════
            // HAUPTSPANNUNGSFELD - Mit voller Tiefe
            // ═══════════════════════════════════════════════════════════════════
            let partnerConflictHtml = '';
            if (partnerConflicts.length > 0) {
                const mainConflict = partnerConflicts[0];
                partnerConflictHtml = `
                    <div style="margin-top: 16px; padding: 12px; background: rgba(231, 76, 60, 0.08); border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.2);">
                        <div style="font-weight: 600; color: var(--danger); font-size: var(--font-sm); margin-bottom: 8px;">
                            ⚡ Hauptspannungsfeld: ${mainConflict.title}
                        </div>

                        <!-- Dynamik-Sektion -->
                        <div style="margin-bottom: 12px;">
                            <div style="font-size: 11px; color: #e74c3c; font-weight: 600; margin-bottom: 6px;">📊 Dynamik</div>
                            ${mainConflict.dynamics?.pattern ? `
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                    <strong>Muster:</strong> ${mainConflict.dynamics.pattern}
                                </div>
                            ` : ''}
                            ${mainConflict.dynamics?.escalation ? `
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                    <strong>Eskalation:</strong> ${mainConflict.dynamics.escalation}
                                </div>
                            ` : ''}
                            ${mainConflict.dynamics?.core_wound ? `
                                <div style="font-size: var(--font-xs); color: #e74c3c; line-height: 1.5; padding: 6px; background: rgba(231,76,60,0.1); border-radius: 4px;">
                                    <strong>💔 Kernwunde:</strong> ${mainConflict.dynamics.core_wound}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Lösungs-Sektion -->
                        <div style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <div style="font-size: 11px; color: var(--success); font-weight: 600; margin-bottom: 6px;">💡 Lösungsweg</div>
                            ${mainConflict.resolution?.understanding ? `
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                    <strong>Verständnis:</strong> ${mainConflict.resolution.understanding}
                                </div>
                            ` : ''}
                            ${mainConflict.resolution?.practical ? `
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                                    <strong>Praktisch:</strong> ${mainConflict.resolution.practical}
                                </div>
                            ` : ''}
                            ${mainConflict.resolution?.growth ? `
                                <div style="font-size: var(--font-xs); color: var(--success); line-height: 1.5; padding: 6px; background: rgba(39,174,96,0.1); border-radius: 4px;">
                                    <strong>🌱 Wachstum:</strong> ${mainConflict.resolution.growth}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }

            return `
                <div class="match-modal-section synthese">
                    <div class="match-modal-section-title">🎯 Psychologische Tiefe</div>
                    ${conflictHtml}
                    ${partnerConflictHtml}
                </div>
            `;
        }

        // Match Modal Functions
        function openMatchModal(type) {
            const matchData = type === 'top' ? currentTopMatch : currentChallenge;
            if (!matchData.id) return;

            // Set the modal context to use this match's partner
            modalContextPartner = matchData.id;

            const myArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[matchData.id];
            const interactionKey = `${currentArchetype}_${matchData.id}`;
            const interaction = data.interactions[interactionKey] || {};
            const scores = interaction.scores || {};

            const title = type === 'top' ? 'Top Match' : 'Challenge';
            const scoreColor = getScoreColor(matchData.score);

            // Store data for toggle refresh
            currentMatchModalData = {
                myArch,
                partnerArch,
                interaction,
                scores,
                scoreColor
            };

            // Initialize toggle buttons to current view state
            setTimeout(() => {
                const pathosBtn = document.getElementById('matchTogglePathos');
                const logosBtn = document.getElementById('matchToggleLogos');
                if (pathosBtn && logosBtn) {
                    pathosBtn.classList.toggle('active', currentMatchModalView === 'pathos');
                    logosBtn.classList.toggle('active', currentMatchModalView === 'logos');
                }
            }, 0);

            document.getElementById('modalTitle').textContent = `${myArch.name} + ${partnerArch.name}`;
            document.getElementById('modalBody').innerHTML = getMatchModalContent(partnerArch, interaction, scores, scoreColor, myArch);
            document.getElementById('categoryModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function getMatchModalContent(partnerArch, interaction, scores, scoreColor, myArch) {
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            const overall = interaction.overall || 0;
            const isIdenticalType = myArch.id === partnerArch.id;

            const categoryBars = categories.map(cat => {
                const value = scores[cat]?.value || 0;
                const barClass = getBarClass(value);
                const name = categoryNames[cat] || cat;

                // Special note for identical types on category A (Beziehungsphilosophie)
                const isPhilosophyCategory = cat === 'A' && isIdenticalType;
                const specialNote = isPhilosophyCategory
                    ? '<div style="font-size: 10px; color: var(--success); margin-top: 2px;">Identische Grundüberzeugung</div>'
                    : '';

                return `
                    <div class="match-modal-bar-row clickable" onclick="openSingleCategoryModal('${cat}')">
                        <span class="match-modal-bar-label">${cat}</span>
                        <div class="match-modal-bar-container">
                            <div class="match-modal-bar ${barClass}" style="width: ${value}%">
                                <span class="match-modal-bar-value">${value}%</span>
                            </div>
                            ${specialNote}
                        </div>
                        <span class="match-modal-bar-name">${name}</span>
                    </div>
                `;
            }).join('');

            // Generate dynamic Pro/Contra based on current view (Pathos/Logos)
            const dynamicPro = generateDynamicPro(myArch, partnerArch, currentMatchModalView);
            const dynamicContra = generateDynamicContra(myArch, partnerArch, currentMatchModalView);

            // Combine static (from JSON) and dynamic items
            const staticPro = interaction.pro || [];
            const staticContra = interaction.contra || [];

            // Use dynamic items first, then add unique static items
            const combinedPro = [...dynamicPro];
            staticPro.forEach(p => {
                if (!combinedPro.some(dp => dp.toLowerCase().includes(p.toLowerCase().substring(0, 20)))) {
                    combinedPro.push(p);
                }
            });

            const combinedContra = [...dynamicContra];
            staticContra.forEach(c => {
                if (!combinedContra.some(dc => dc.toLowerCase().includes(c.toLowerCase().substring(0, 20)))) {
                    combinedContra.push(c);
                }
            });

            const proItems = combinedPro.map(p => `<li>${p}</li>`).join('') || '<li>Keine Daten</li>';
            const contraItems = combinedContra.map(c => `<li>${c}</li>`).join('') || '<li>Keine Daten</li>';

            // Perspective indicator
            const perspectiveLabel = currentMatchModalView === 'pathos'
                ? '🔥 Pathos-Perspektive (emotional)'
                : '🧠 Logos-Perspektive (rational)';

            // Generate synthesis section
            const synthesisSection = generateSynthesisSection(myArch, partnerArch);

            // Special banner for identical types
            const identicalTypeBanner = isIdenticalType ? `
                <div style="background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(46, 204, 113, 0.05));
                            border: 1px solid var(--success); border-radius: 10px; padding: 12px; margin-bottom: 15px; text-align: center;">
                    <div style="font-weight: 600; color: var(--success); margin-bottom: 4px;">✓ Identischer Beziehungstyp</div>
                    <div style="font-size: var(--font-sm); color: var(--text-secondary);">
                        Ihr teilt dieselbe Grundüberzeugung über Beziehungen
                    </div>
                </div>
            ` : '';

            const comboText = `${myArch.name} + ${partnerArch.name}`;
            const myDef = archetypeDescriptions[myArch.id]?.shortDef || '';
            const partnerDef = archetypeDescriptions[partnerArch.id]?.shortDef || '';

            return `
                <div class="modal-feedback-btn" onclick="openFeedbackModalWithContext('${comboText}')">
                    💬 Feedback zu ${comboText}
                </div>

                <div class="match-modal-header">
                    <div class="match-modal-icon" style="background: ${partnerArch.color}">${icons[partnerArch.id]}</div>
                    <div class="match-modal-info">
                        <h3 style="color: ${partnerArch.color}">
                            ${partnerArch.name}
                            <span class="type-info-icon" onclick="openDefinitionModal('${partnerArch.id}')" title="Definition anzeigen">ℹ</span>
                        </h3>
                        <p>${partnerArch.shortDescription || ''}</p>
                    </div>
                </div>

                ${identicalTypeBanner}

                <div class="type-definitions-compact" style="background: var(--bg-dark); border-radius: 10px; padding: 12px; margin-bottom: 15px; font-size: var(--font-sm);">
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <span style="color: ${myArch.color}; font-weight: 600;">${icons[myArch.id]} ${myArch.name}</span>
                            <span class="type-info-icon" onclick="openDefinitionModal('${myArch.id}')" style="margin-left: 4px;">ℹ</span>
                            <div style="color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${myDef}</div>
                        </div>
                        <div style="flex: 1; min-width: 200px;">
                            <span style="color: ${partnerArch.color}; font-weight: 600;">${icons[partnerArch.id]} ${partnerArch.name}</span>
                            <span class="type-info-icon" onclick="openDefinitionModal('${partnerArch.id}')" style="margin-left: 4px;">ℹ</span>
                            <div style="color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${partnerDef}</div>
                        </div>
                    </div>
                </div>

                <div class="match-modal-score">
                    <span class="match-modal-score-label">Beziehungsqualität ${isIdenticalType ? '(gleicher Typ)' : 'mit ' + myArch.name}</span>
                    <span class="match-modal-score-value" style="color: ${scoreColor}">${overall}</span>
                </div>

                <div class="match-modal-categories">
                    <div class="match-modal-categories-title">Kategorie-Bewertungen</div>
                    ${categoryBars}
                </div>

                <div class="match-modal-perspective">${perspectiveLabel}</div>

                <div class="match-modal-section pro">
                    <div class="match-modal-section-title">✓ Was funktioniert</div>
                    <ul class="match-modal-list">${proItems}</ul>
                </div>

                <div class="match-modal-section contra">
                    <div class="match-modal-section-title">✗ Herausforderungen</div>
                    <ul class="match-modal-list">${contraItems}</ul>
                </div>

                ${synthesisSection}
            `;
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCategoryModal();
            }
        });

        // ==========================================
        // FEEDBACK SYSTEM (entfernt - commentModal wird verwendet)
        // ==========================================
        // Leere Stubs um JavaScript-Fehler zu vermeiden
        function openFeedbackModal() { console.log('feedbackModal entfernt - bitte commentModal verwenden'); }
        function openFeedbackModalWithContext(ctx) { console.log('feedbackModal entfernt - bitte commentModal verwenden'); }
        function closeFeedbackModal(event) { }
        function initStarRatings() { }
        // submitFeedback entfernt - wird nicht mehr verwendet

        // Local storage backup - alles in tiage_comments
        function saveLocalFeedback(entry) {
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            entry.timestamp = new Date().toISOString();
            entry.Typ = 'comment';  // Einheitlicher Typ
            stored.unshift(entry);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));
        }

        function getLocalFeedback() {
            return JSON.parse(localStorage.getItem('tiage_comments') || '[]');
        }

        // Load and display feedback
        async function loadFeedback() {
            const container = document.getElementById('feedbackList');

            try {
                if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                    // Try to load from Google Sheets
                    const response = await fetch(GOOGLE_SCRIPT_URL);
                    const serverData = await response.json();
                    feedbackData = serverData.reverse(); // Newest first
                } else {
                    // Use local data only
                    feedbackData = getLocalFeedback();
                }
            } catch (error) {
                console.error('Load feedback error:', error);
                // Fallback to local
                feedbackData = getLocalFeedback();
            }

            // Populate type filter dropdowns
            populateTypeFilters();
            renderFeedbackList();
        }

        // Populate type dropdowns for filters
        function populateTypeFilters() {
            const archetypes = Object.values(data?.archetypes || {});
            const myTypeSelect = document.getElementById('filterMyType');
            const partnerTypeSelect = document.getElementById('filterPartnerType');

            const options = archetypes.map(a =>
                `<option value="${a.id}">${a.name}</option>`
            ).join('');

            myTypeSelect.innerHTML = `<option value="all">Alle Typen</option>${options}`;
            partnerTypeSelect.innerHTML = `<option value="all">Alle Partner</option>${options}`;
        }

        function renderFeedbackList() {
            const container = document.getElementById('feedbackList');

            // Apply all filters
            let filtered = feedbackData.filter(f => {
                const kontextId = (f.KontextID || f.kontextId || '').toLowerCase();
                const name = (f.Name || f.name || '').toLowerCase();
                const titel = (f.Titel || f.titel || '').toLowerCase();
                const kommentar = (f.Kommentar || f.kommentar || '').toLowerCase();
                const antwortAuf = f.AntwortAuf || f.antwortAuf || '';

                // Skip replies in main list (they'll be shown as threads)
                if (antwortAuf) return false;

                // Search filter
                if (feedbackFilters.search) {
                    const search = feedbackFilters.search.toLowerCase();
                    if (!name.includes(search) && !titel.includes(search) && !kommentar.includes(search)) {
                        return false;
                    }
                }

                // Type filters (parse from context ID like "Single (Ich) mit Duo")
                if (feedbackFilters.myType !== 'all' || feedbackFilters.partnerType !== 'all') {
                    const myTypeName = data?.archetypes?.[feedbackFilters.myType]?.name?.toLowerCase();
                    const partnerTypeName = data?.archetypes?.[feedbackFilters.partnerType]?.name?.toLowerCase();

                    if (feedbackFilters.myType !== 'all' && myTypeName) {
                        if (!kontextId.includes(myTypeName)) return false;
                    }
                    if (feedbackFilters.partnerType !== 'all' && partnerTypeName) {
                        if (!kontextId.includes('mit ' + partnerTypeName)) return false;
                    }
                }

                // Category filter
                if (feedbackFilters.category !== 'all') {
                    const cat = feedbackFilters.category;
                    if (cat === 'TM') {
                        if (!kontextId.includes('top match')) return false;
                    } else if (cat === 'CH') {
                        if (!kontextId.includes('challenge')) return false;
                    } else {
                        // Category A-F: check for category name
                        const catName = categoryNames[cat]?.toLowerCase();
                        if (catName && !kontextId.includes(catName)) return false;
                    }
                }

                return true;
            });

            // Sort
            if (feedbackFilters.sort === 'oldest') {
                filtered = filtered.reverse();
            } else if (feedbackFilters.sort === 'rating') {
                filtered.sort((a, b) => {
                    const aRating = (a.Verstand || a.verstand || 0) + (a.Gefuehl || a.gefuehl || 0);
                    const bRating = (b.Verstand || b.verstand || 0) + (b.Gefuehl || b.gefuehl || 0);
                    return bRating - aRating;
                });
            }

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="feedback-empty">
                        ${feedbackData.length === 0
                            ? 'Noch kein Feedback vorhanden.<br>Sei der Erste!'
                            : 'Kein Feedback für diesen Filter.'}
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(f => renderFeedbackItem(f)).join('');
        }

        // Render single feedback item with replies
        function renderFeedbackItem(f, isReply = false) {
            const id = f.Id || f.id || f.timestamp || '';
            const kontextId = f.KontextID || f.kontextId || '-';
            const name = f.Name || f.name || 'Anonym';
            const titel = f.Titel || f.titel || '';
            const kommentar = f.Kommentar || f.kommentar || '';
            const verstand = f.Verstand || f.verstand || 0;
            const gefuehl = f.Gefuehl || f.gefuehl || 0;
            const timestamp = f.Timestamp || f.timestamp || '';

            // Find replies to this item
            const replies = feedbackData.filter(r =>
                (r.AntwortAuf || r.antwortAuf) === id
            );

            const timeStr = timestamp ? new Date(timestamp).toLocaleDateString('de-DE') : '';

            return `
                <div class="feedback-item ${isReply ? 'reply' : ''}" data-id="${id}">
                    <div class="feedback-item-header">
                        <span class="feedback-item-context">${kontextId}</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="feedback-item-name">${name}</span>
                            ${timeStr ? `<span class="feedback-timestamp">${timeStr}</span>` : ''}
                        </div>
                    </div>
                    <div class="feedback-item-title">${titel}</div>
                    ${kommentar ? `<div class="feedback-item-comment">${kommentar}</div>` : ''}
                    <div class="feedback-item-footer">
                        <div class="feedback-item-ratings">
                            <div class="feedback-rating">
                                <span>Verstand:</span>
                                <span class="stars">${'★'.repeat(verstand)}${'☆'.repeat(5-verstand)}</span>
                            </div>
                            <div class="feedback-rating">
                                <span>Gefühl:</span>
                                <span class="stars">${'★'.repeat(gefuehl)}${'☆'.repeat(5-gefuehl)}</span>
                            </div>
                        </div>
                        <button class="feedback-reply-btn" onclick="openReplyModal('${id}', '${name}')">
                            ↩ Antworten
                        </button>
                    </div>
                    ${replies.length > 0 ? `
                        <div class="feedback-replies">
                            ${replies.map(r => renderFeedbackItem(r, true)).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Open reply modal - uses commentModal (feedbackModal was removed)
        function openReplyModal(parentId, parentName) {
            replyToId = parentId;
            // Open comment modal for replies
            const modal = document.getElementById('commentModal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset form
                const nameInput = document.getElementById('commentName');
                const textInput = document.getElementById('commentText');
                if (nameInput) nameInput.value = '';
                if (textInput) {
                    textInput.value = '';
                    textInput.placeholder = `Antwort auf ${parentName}...`;
                }
            }
        }

        // Initialize advanced filters
        function initAdvancedFilters() {
            // Search input
            document.getElementById('feedbackSearch').addEventListener('input', (e) => {
                feedbackFilters.search = e.target.value;
                renderFeedbackList();
            });

            // Type selects
            document.getElementById('filterMyType').addEventListener('change', (e) => {
                feedbackFilters.myType = e.target.value;
                renderFeedbackList();
            });

            document.getElementById('filterPartnerType').addEventListener('change', (e) => {
                feedbackFilters.partnerType = e.target.value;
                renderFeedbackList();
            });

            // Category buttons
            document.querySelectorAll('.cat-filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.cat-filter-btn').forEach(b =>
                        b.classList.remove('active')
                    );
                    btn.classList.add('active');
                    feedbackFilters.category = btn.dataset.cat;
                    renderFeedbackList();
                });
            });

            // Sort select
            document.getElementById('filterSort').addEventListener('change', (e) => {
                feedbackFilters.sort = e.target.value;
                renderFeedbackList();
            });
        }

        // Initialize feedback system
        function initFeedbackSystem() {
            initStarRatings();
            initAdvancedFilters();
        }

        // Age Verification - Modal shows on EVERY visit (no localStorage)
        function checkAgeVerification() {
            // Modal always shows - no localStorage check
            const modal = document.getElementById('ageVerificationModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden';
            }
        }

        // Make confirmAge globally available - no localStorage storage
        window.confirmAge = function(isAdult) {
            console.log('confirmAge called with:', isAdult);
            if (isAdult) {
                var modal = document.getElementById('ageVerificationModal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }
                document.body.style.overflow = 'auto';
            } else {
                window.location.href = 'https://www.google.com';
            }
        };

        // Also keep the regular function reference
        function confirmAge(isAdult) {
            window.confirmAge(isAdult);
        }

        // Initialize age verification - robust version with multiple fallbacks
        function initAgeVerification() {
            const modal = document.getElementById('ageVerificationModal');
            const yesButton = document.getElementById('ageVerifyYes');
            const noButton = document.getElementById('ageVerifyNo');

            // Helper function to handle age confirmation - no localStorage
            function handleAgeConfirm(isAdult, event) {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                console.log('handleAgeConfirm called:', isAdult);

                if (isAdult) {
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                        modal.style.visibility = 'hidden';
                        modal.style.opacity = '0';
                        modal.style.pointerEvents = 'none';
                    }
                    document.body.style.overflow = 'auto';

                    // Check for pending openComments navigation after age verification
                    const urlParams = new URLSearchParams(window.location.search);
                    if (urlParams.get('openComments') === '1') {
                        // Remove openComments parameter from URL to prevent loop on back-navigation
                        urlParams.delete('openComments');
                        const cleanUrl = urlParams.toString()
                            ? `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`
                            : `${window.location.pathname}${window.location.hash}`;
                        history.replaceState(null, '', cleanUrl);

                        setTimeout(() => {
                            if (typeof openCommentsListModal === 'function') {
                                openCommentsListModal();
                            }
                        }, 100);
                    }
                } else {
                    window.location.href = 'https://www.google.com';
                }
            }

            // Add event listeners to YES button
            if (yesButton) {
                yesButton.style.pointerEvents = 'auto';
                yesButton.style.cursor = 'pointer';
                yesButton.style.position = 'relative';
                yesButton.style.zIndex = '10002';

                // Remove old onclick to prevent double-firing
                yesButton.removeAttribute('onclick');

                // Add multiple event types for maximum compatibility
                yesButton.addEventListener('click', function(e) {
                    handleAgeConfirm(true, e);
                }, { passive: false, capture: true });

                yesButton.addEventListener('touchend', function(e) {
                    handleAgeConfirm(true, e);
                }, { passive: false, capture: true });

                // Also handle mousedown as fallback
                yesButton.addEventListener('mousedown', function(e) {
                    handleAgeConfirm(true, e);
                }, { passive: false, capture: true });
            }

            // Add event listeners to NO button
            if (noButton) {
                noButton.style.pointerEvents = 'auto';
                noButton.style.cursor = 'pointer';
                noButton.style.position = 'relative';
                noButton.style.zIndex = '10002';

                // Remove old onclick
                noButton.removeAttribute('onclick');

                noButton.addEventListener('click', function(e) {
                    handleAgeConfirm(false, e);
                }, { passive: false, capture: true });

                noButton.addEventListener('touchend', function(e) {
                    handleAgeConfirm(false, e);
                }, { passive: false, capture: true });
            }

            // Always show modal on page load - no localStorage check
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
            }
        }

        // ========================================
        // Extended Dimensions Functions
        // ========================================

        function showDimensionTooltip(type) {
            // Try to get translated tooltip first, fall back to hardcoded
            let tooltip = TiageI18n.t(`tooltips.${type}`);
            if (!tooltip || typeof tooltip !== 'object' || !tooltip.title) {
                tooltip = dimensionTooltips[type];
            }
            if (!tooltip) return;

            document.getElementById('dimensionTooltipTitle').textContent = tooltip.title;
            document.getElementById('dimensionTooltipText').innerHTML = tooltip.text.replace(/\n/g, '<br>');
            document.getElementById('dimensionTooltipOverlay').classList.add('active');
        }

        function closeDimensionTooltip() {
            document.getElementById('dimensionTooltipOverlay').classList.remove('active');
        }

        // ========================================
        // Geschlecht Info Modal Functions
        // ========================================
        function showGeschlechtInfoModal() {
            document.getElementById('geschlechtInfoModal').classList.add('active');
        }

        function closeGeschlechtInfoModal() {
            document.getElementById('geschlechtInfoModal').classList.remove('active');
        }

        // ========================================
        // Dominanz Info Modal Functions
        // ========================================
        function showDominanzInfoModal() {
            document.getElementById('dominanzInfoModal').classList.add('active');
        }

        function closeDominanzInfoModal() {
            document.getElementById('dominanzInfoModal').classList.remove('active');
        }

        // ========================================
        // Orientierung Info Modal Functions
        // ========================================
        function showOrientierungInfoModal() {
            document.getElementById('orientierungInfoModal').classList.add('active');
        }

        function closeOrientierungInfoModal() {
            document.getElementById('orientierungInfoModal').classList.remove('active');
        }

        // ========================================
        // Body & Soul Info Modal Functions
        // ========================================
        function showBodySoulModal() {
            document.getElementById('bodySoulModal').classList.add('active');
        }

        function closeBodySoulModal() {
            document.getElementById('bodySoulModal').classList.remove('active');
        }

        // ═══════════════════════════════════════════════════════════════════════
        // GESCHLECHT PRIMARY/SECONDARY SYSTEM
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Handle click on a Geschlecht button
         * Logic:
         * - First click = Primary (I indicator)
         * - Second click on different = Secondary (G indicator)
         * - Click on Primary = Clear both (primary and secondary)
         * - Click on Secondary = Clear only secondary
         */
        function handleGeschlechtClick(person, geschlechtValue, btn) {
            // Valid geschlecht values
            const validGeschlechtValues = ['cis_mann', 'cis_frau', 'trans_mann', 'trans_frau', 'nonbinaer', 'genderfluid', 'agender', 'intersex', 'divers'];

            // Ensure geschlecht has correct structure (migration from old format)
            if (!personDimensions[person].geschlecht ||
                !('primary' in personDimensions[person].geschlecht)) {
                personDimensions[person].geschlecht = { primary: null, secondary: null };
            }

            // Clean up invalid old values (e.g., 'männlich', 'weiblich' from old format)
            if (personDimensions[person].geschlecht.primary &&
                !validGeschlechtValues.includes(personDimensions[person].geschlecht.primary)) {
                console.log('[FIX] Clearing invalid primary value:', personDimensions[person].geschlecht.primary);
                personDimensions[person].geschlecht.primary = null;
            }
            if (personDimensions[person].geschlecht.secondary &&
                !validGeschlechtValues.includes(personDimensions[person].geschlecht.secondary)) {
                console.log('[FIX] Clearing invalid secondary value:', personDimensions[person].geschlecht.secondary);
                personDimensions[person].geschlecht.secondary = null;
            }

            const currentPrimary = personDimensions[person].geschlecht.primary;
            const currentSecondary = personDimensions[person].geschlecht.secondary;

            if (geschlechtValue === currentPrimary) {
                // Click on Primary: Clear both
                personDimensions[person].geschlecht.primary = null;
                personDimensions[person].geschlecht.secondary = null;
            } else if (geschlechtValue === currentSecondary) {
                // Click on Secondary: Clear only secondary
                personDimensions[person].geschlecht.secondary = null;
            } else if (!currentPrimary) {
                // No primary yet: Set as primary (handles both null and undefined)
                personDimensions[person].geschlecht.primary = geschlechtValue;
            } else {
                // Primary exists, different value clicked: Set as secondary
                personDimensions[person].geschlecht.secondary = geschlechtValue;
            }

            // Sync with mobilePersonDimensions for mobile view consistency
            if (typeof mobilePersonDimensions !== 'undefined') {
                mobilePersonDimensions[person].geschlecht.primary = personDimensions[person].geschlecht.primary;
                mobilePersonDimensions[person].geschlecht.secondary = personDimensions[person].geschlecht.secondary;
            }

            // Sync with TiageState if available
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.geschlecht`, personDimensions[person].geschlecht);
            }

            // Sync all UIs
            syncGeschlechtUI(person);

            // Remove needs-selection if primary is set
            const hasPrimary = personDimensions[person].geschlecht.primary !== null;
            document.querySelectorAll(`[data-dimension="${person}-geschlecht-new"], [data-dimension="mobile-${person}-geschlecht"], [data-dimension="${person}-geschlecht"]`).forEach(dim => {
                if (hasPrimary) {
                    dim.classList.remove('needs-selection');
                } else {
                    dim.classList.add('needs-selection');
                }
            });

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Handle click on P (Körper) geschlecht button
         * P = Primary = Körper (Mann, Frau, Inter)
         */
        function handleGeschlechtPClick(person, value, btn) {
            // Ensure geschlecht has correct structure
            if (!personDimensions[person].geschlecht ||
                !('primary' in personDimensions[person].geschlecht)) {
                personDimensions[person].geschlecht = { primary: null, secondary: null };
            }

            const currentPrimary = personDimensions[person].geschlecht.primary;

            if (value === currentPrimary) {
                // Click on same P: Deselect both P and S
                personDimensions[person].geschlecht.primary = null;
                personDimensions[person].geschlecht.secondary = null;
            } else {
                // Click on different P: Set new P, clear S (S options change)
                personDimensions[person].geschlecht.primary = value;
                personDimensions[person].geschlecht.secondary = null;
            }

            // Update S-Grid based on new P selection
            updateGeschlechtSGrid(person);

            // Sync and save
            syncGeschlechtState(person);
            syncGeschlechtUI(person);
            updateGeschlechtNeedsSelection(person);
            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Handle click on S (Identität) geschlecht button
         * S = Secondary = Identität (kontextabhängig von P)
         */
        function handleGeschlechtSClick(person, value, btn) {
            // Ensure geschlecht has correct structure
            if (!personDimensions[person].geschlecht) {
                personDimensions[person].geschlecht = { primary: null, secondary: null };
            }

            const currentSecondary = personDimensions[person].geschlecht.secondary;

            if (value === currentSecondary) {
                // Click on same S: Deselect S
                personDimensions[person].geschlecht.secondary = null;
            } else {
                // Click on different S: Set new S
                personDimensions[person].geschlecht.secondary = value;
            }

            // Sync and save
            syncGeschlechtState(person);
            syncGeschlechtUI(person);
            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Update S-Grid options based on P selection
         * P = Mann/Frau → S = Cis, Trans, Nonbinär, Fluid, Unsicher
         * P = Inter → S = Nonbinär, Fluid, Unsicher
         */
        function updateGeschlechtSGrid(person) {
            const primary = personDimensions[person].geschlecht?.primary;
            const sRow = document.getElementById(`${person}-geschlecht-s-row`);
            const sGrid = document.getElementById(`${person}-geschlecht-s-grid`);

            if (!sRow || !sGrid) return;

            if (!primary) {
                // No P selected: hide S row
                sRow.style.display = 'none';
                sGrid.innerHTML = '';
                return;
            }

            // Show S row
            sRow.style.display = 'block';

            // Get S options based on P
            let sOptions;
            if (primary === 'inter') {
                sOptions = [
                    { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') },
                    { value: 'fluid', label: TiageI18n.t('geschlecht.secondary.fluid', 'Fluid') },
                    { value: 'suchend', label: TiageI18n.t('geschlecht.secondary.suchend', 'Suchend') }
                ];
            } else {
                // Mann or Frau: Cis, Trans, Suchend (3 options)
                sOptions = [
                    { value: 'cis', label: TiageI18n.t('geschlecht.secondary.cis', 'Cis') },
                    { value: 'trans', label: TiageI18n.t('geschlecht.secondary.trans', 'Trans') },
                    { value: 'suchend', label: TiageI18n.t('geschlecht.secondary.suchend', 'Suchend') }
                ];
            }

            // Populate S grid (include secondary-selected class if already selected)
            const currentSecondary = personDimensions[person].geschlecht?.secondary;
            sGrid.innerHTML = sOptions.map(opt => {
                const isSelected = opt.value === currentSecondary;
                const selectedClass = isSelected ? ' secondary-selected' : '';
                return `<button type="button" class="geschlecht-btn geschlecht-s-btn${selectedClass}" data-value="${opt.value}" onclick="handleGeschlechtSClick('${person}', '${opt.value}', this)">${opt.label}${isSelected ? '<span class="geschlecht-indicator indicator-secondary" title="Identität (Sekundär)">S</span>' : ''}</button>`;
            }).join('');
        }

        /**
         * Sync geschlecht state with mobile/TiageState
         */
        function syncGeschlechtState(person) {
            // Sync with mobilePersonDimensions
            if (typeof mobilePersonDimensions !== 'undefined') {
                mobilePersonDimensions[person].geschlecht.primary = personDimensions[person].geschlecht.primary;
                mobilePersonDimensions[person].geschlecht.secondary = personDimensions[person].geschlecht.secondary;
            }

            // Sync with TiageState
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.geschlecht`, personDimensions[person].geschlecht);
            }
        }

        /**
         * Update needs-selection class for geschlecht
         */
        function updateGeschlechtNeedsSelection(person) {
            const hasPrimary = personDimensions[person].geschlecht?.primary !== null;
            document.querySelectorAll(`[data-dimension="${person}-geschlecht-multi"], [data-dimension="mobile-${person}-geschlecht"], [data-dimension="${person}-geschlecht"]`).forEach(dim => {
                if (hasPrimary) {
                    dim.classList.remove('needs-selection');
                } else {
                    dim.classList.add('needs-selection');
                }
            });
        }

        // Legacy aliases for backwards compatibility
        function handleGeschlechtClick(person, value, btn) {
            handleGeschlechtPClick(person, value, btn);
        }
        function handleGeschlechtPrimaryClick(person, value, btn) {
            handleGeschlechtPClick(person, value, btn);
        }
        function handleGeschlechtSecondaryClick(person, value, btn) {
            handleGeschlechtSClick(person, value, btn);
        }

        /**
         * Sync Geschlecht UI across all views (Desktop, Mobile, Modal)
         * P/S SYSTEM: P = Körper, S = Identität (kontextabhängig)
         */
        function syncGeschlechtUI(person) {
            const primary = personDimensions[person].geschlecht?.primary;     // Körper
            const secondary = personDimensions[person].geschlecht?.secondary; // Identität

            // Update P-Grid buttons (Körper)
            document.querySelectorAll(`#${person}-geschlecht-p-grid .geschlecht-btn`).forEach(btn => {
                const value = btn.dataset.value;
                btn.classList.remove('primary-selected', 'primary-strikethrough');

                // Remove existing indicators
                const existingIndicator = btn.querySelector('.geschlecht-indicator');
                if (existingIndicator) existingIndicator.remove();

                if (value === primary) {
                    btn.classList.add('primary-selected');
                    // Strikethrough wenn Trans als Secondary ausgewählt
                    if (secondary === 'trans') {
                        btn.classList.add('primary-strikethrough');
                    }
                    const indicator = document.createElement('span');
                    indicator.className = 'geschlecht-indicator indicator-primary';
                    indicator.textContent = 'P';
                    indicator.title = 'Körper (Primär)';
                    btn.appendChild(indicator);
                }
            });

            // Update S-Grid buttons (Identität)
            document.querySelectorAll(`#${person}-geschlecht-s-grid .geschlecht-btn`).forEach(btn => {
                const value = btn.dataset.value;
                btn.classList.remove('secondary-selected');

                // Remove existing indicators
                const existingIndicator = btn.querySelector('.geschlecht-indicator');
                if (existingIndicator) existingIndicator.remove();

                if (value === secondary) {
                    btn.classList.add('secondary-selected');
                    const indicator = document.createElement('span');
                    indicator.className = 'geschlecht-indicator indicator-secondary';
                    indicator.textContent = 'S';
                    indicator.title = 'Identität (Sekundär)';
                    btn.appendChild(indicator);
                }
            });

            // Legacy: Update old combined grids (mobile etc.)
            const legacySelectors = [
                `#mobile-${person}-geschlecht-grid .geschlecht-btn`,
                `#modal-${person}-geschlecht-grid .geschlecht-btn`
            ];

            legacySelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    const value = btn.dataset.value;
                    btn.classList.remove('primary-selected', 'secondary-selected', 'primary-strikethrough');

                    const existingIndicator = btn.querySelector('.geschlecht-indicator');
                    if (existingIndicator) existingIndicator.remove();

                    if (value === primary) {
                        btn.classList.add('primary-selected');
                        // Strikethrough wenn Trans als Secondary ausgewählt
                        if (secondary === 'trans') {
                            btn.classList.add('primary-strikethrough');
                        }
                        const indicator = document.createElement('span');
                        indicator.className = 'geschlecht-indicator indicator-primary';
                        indicator.textContent = 'P';
                        btn.appendChild(indicator);
                    } else if (value === secondary) {
                        btn.classList.add('secondary-selected');
                        const indicator = document.createElement('span');
                        indicator.className = 'geschlecht-indicator indicator-secondary';
                        indicator.textContent = 'S';
                        btn.appendChild(indicator);
                    }
                });
            });

            // Also sync legacy radio buttons if they exist
            document.querySelectorAll(`input[name="${person}-geschlecht"]`).forEach(radio => {
                radio.checked = (radio.value === primary);
            });
            document.querySelectorAll(`input[name="mobile-${person}-geschlecht"]`).forEach(radio => {
                radio.checked = (radio.value === primary);
            });

            // Ensure S-Grid visibility is correct
            updateGeschlechtSGrid(person);

            // Update collapsed summary for geschlecht
            updateGeschlechtSummary(person);
        }

        /**
         * Update secondary geschlecht from external source (e.g., Profile Review Modal)
         * Syncs personDimensions with the new value and updates UI
         * @param {string} person - 'ich' or 'partner'
         * @param {string} secondaryValue - New secondary value ('mann', 'frau', 'nonbinaer', 'fluid', 'suchend')
         */
        function setSecondaryGeschlechtAndSync(person, secondaryValue) {
            if (!personDimensions[person].geschlecht) {
                personDimensions[person].geschlecht = { primary: null, secondary: null };
            }
            personDimensions[person].geschlecht.secondary = secondaryValue;

            // Sync to TiageState
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.geschlecht.secondary`, secondaryValue);
            }

            // Update UI
            syncGeschlechtUI(person);

            console.log('[Geschlecht] Secondary updated and synced:', person, '→', secondaryValue);
        }
        window.setSecondaryGeschlechtAndSync = setSecondaryGeschlechtAndSync;

        /**
         * Get summary text for geschlecht selection
         */
        function getGeschlechtSummary(person) {
            const primary = personDimensions[person].geschlecht.primary;
            const secondary = personDimensions[person].geschlecht.secondary;

            if (!primary) {
                return 'Geschlecht fehlt';
            }

            const parts = [];
            const primaryLabel = TiageI18n.t(`geschlecht.types.${primary}`, primary);
            parts.push(primaryLabel + ' (P)');

            if (secondary) {
                const secondaryLabel = TiageI18n.t(`geschlecht.types.${secondary}`, secondary);
                parts.push(secondaryLabel + ' (S)');
            }

            return '✓ ' + parts.join(', ');
        }

        /**
         * Get summary text for geschlecht selection in grid (without 'fehlt' text)
         * Returns selected values in green, or empty string if nothing selected
         */
        function getGeschlechtGridSummary(person) {
            const primary = personDimensions[person].geschlecht.primary;
            const secondary = personDimensions[person].geschlecht.secondary;

            if (!primary) {
                return ''; // No 'fehlt' text for grid - only show selections
            }

            const parts = [];
            const primaryLabel = TiageI18n.t(`geschlecht.types.${primary}`, primary);
            // Strikethrough für Primary wenn Trans als Secondary
            if (secondary === 'trans') {
                parts.push('<span class="summary-strikethrough">' + primaryLabel + '</span> (P)');
            } else {
                parts.push(primaryLabel + ' (P)');
            }

            if (secondary) {
                const secondaryLabel = TiageI18n.t(`geschlecht.types.${secondary}`, secondary);
                parts.push(secondaryLabel + ' (S)');
            }

            return '✓ ' + parts.join(', ');
        }

        /**
         * Update header summary for geschlecht (only in header area, not in collapsed-summary)
         */
        function updateGeschlechtSummary(person) {
            const summaryText = getGeschlechtSummary(person);
            const gridSummaryText = getGeschlechtGridSummary(person);
            const isMissing = !personDimensions[person].geschlecht.primary;

            // Update header element (shows 'fehlt' if nothing selected) - Desktop and Mobile
            ['', 'mobile-'].forEach(prefix => {
                const headerId = `${prefix}${person}-header-geschlecht`;
                const header = document.getElementById(headerId);
                if (header) {
                    header.textContent = summaryText;
                    header.classList.toggle('missing', isMissing);
                }
            });

            // Update grid collapsed-summary (only shows selections in green, no 'fehlt')
            ['', 'mobile-'].forEach(prefix => {
                const summaryId = `${prefix}${person}-geschlecht-summary`;
                const summary = document.getElementById(summaryId);
                if (summary) {
                    summary.innerHTML = gridSummaryText;
                    summary.classList.toggle('has-selection', !isMissing);
                }
            });
        }

        /**
         * Check if geschlecht has any selection (primary)
         */
        function hasGeschlechtSelected(person) {
            return personDimensions[person].geschlecht.primary !== null;
        }

        /**
         * Handle hover on geschlecht button - highlight I or G in legend
         * Based on click logic: if no primary -> next click sets I, if primary exists -> next click sets G
         */
        function handleGeschlechtHover(person, geschlechtValue, isEntering) {
            const legendSelectors = [
                `#${person}-geschlecht-legend`,
                `#mobile-${person}-geschlecht-legend`
            ];

            legendSelectors.forEach(selector => {
                const legend = document.querySelector(selector);
                if (!legend) return;

                if (!isEntering) {
                    // Mouse left - remove all highlights
                    legend.classList.remove('highlight-p', 'highlight-s');
                    return;
                }

                // Mouse entered - determine which to highlight based on click logic
                const currentPrimary = personDimensions[person].geschlecht.primary;
                const currentSecondary = personDimensions[person].geschlecht.secondary;

                legend.classList.remove('highlight-p', 'highlight-s');

                if (geschlechtValue === currentPrimary || geschlechtValue === currentSecondary) {
                    // Hovering over already selected - highlight what would be affected
                    if (geschlechtValue === currentPrimary) {
                        legend.classList.add('highlight-p');
                    } else {
                        legend.classList.add('highlight-s');
                    }
                } else if (currentPrimary === null) {
                    // No primary yet: next click sets primary (P)
                    legend.classList.add('highlight-p');
                } else {
                    // Primary exists, different value: next click sets secondary (S)
                    legend.classList.add('highlight-s');
                }
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMISCHE BUTTON-GENERIERUNG (Harmonisierung Desktop/Mobile/Modal)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Initialisiert alle Dimension-Buttons dynamisch
         * Ersetzt statische HTML-Buttons durch dynamisch generierte
         */
        function initDimensionButtons() {
            console.log('[TIAGE DEBUG] initDimensionButtons called');

            // Geschlecht: P-Optionen (Körper) - immer sichtbar
            const geschlechtPOptions = [
                { value: 'mann', label: TiageI18n.t('geschlecht.primary.mann', 'Mann') },
                { value: 'frau', label: TiageI18n.t('geschlecht.primary.frau', 'Frau') },
                { value: 'inter', label: TiageI18n.t('geschlecht.primary.inter', 'Inter') }
            ];

            // Geschlecht: S-Optionen (Identität) - kontextabhängig von P
            // Für P = Mann/Frau: Cis, Trans, Suchend (3 options)
            const geschlechtSOptionsMannFrau = [
                { value: 'cis', label: TiageI18n.t('geschlecht.secondary.cis', 'Cis') },
                { value: 'trans', label: TiageI18n.t('geschlecht.secondary.trans', 'Trans') },
                { value: 'suchend', label: TiageI18n.t('geschlecht.secondary.suchend', 'Suchend') }
            ];
            // Für P = Inter:
            const geschlechtSOptionsInter = [
                { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') },
                { value: 'fluid', label: TiageI18n.t('geschlecht.secondary.fluid', 'Fluid') },
                { value: 'suchend', label: TiageI18n.t('geschlecht.secondary.suchend', 'Suchend') }
            ];

            // Dominanz Optionen
            const dominanzOptions = [
                { value: 'dominant', label: 'dominant' },
                { value: 'submissiv', label: 'submissiv' },
                { value: 'switch', label: 'switch' },
                { value: 'ausgeglichen', label: 'ausgeglichen' }
            ];

            // Orientierung Optionen
            const orientierungOptions = [
                { value: 'heterosexuell', label: 'heterosexuell' },
                { value: 'homosexuell', label: 'homosexuell' },
                { value: 'bisexuell', label: 'bi-/pansexuell' }
            ];

            // GFK Optionen (Gewaltfreie Kommunikation / NVC)
            const gfkOptions = [
                { value: 'niedrig', label: TiageI18n.t('dimensions.gfkLevels.niedrig', 'niedrig') },
                { value: 'mittel', label: TiageI18n.t('dimensions.gfkLevels.mittel', 'mittel') },
                { value: 'hoch', label: TiageI18n.t('dimensions.gfkLevels.hoch', 'hoch') }
            ];

            // Geschlecht P-Grids befüllen (Körper: Mann, Frau, Inter)
            // Use both class selector and explicit IDs as fallback
            const pGridSelectors = ['.geschlecht-p-grid', '#ich-geschlecht-p-grid', '#partner-geschlecht-p-grid'];
            const processedPGrids = new Set();
            pGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedPGrids.has(grid.id)) return;
                    processedPGrids.add(grid.id);
                    const person = grid.dataset.person;
                    console.log('[TIAGE DEBUG] Processing p-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = geschlechtPOptions.map(opt =>
                        `<button type="button" class="geschlecht-btn geschlecht-p-btn" data-value="${opt.value}" onclick="handleGeschlechtPClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            console.log('[TIAGE DEBUG] Processed geschlecht-p-grids:', processedPGrids.size);

            // Mobile und Modal Geschlecht-Grids befüllen (kombiniertes P/S Grid)
            const mobileModalGrids = document.querySelectorAll('#mobile-ich-geschlecht-grid, #mobile-partner-geschlecht-grid, #modal-ich-geschlecht-grid, #modal-partner-geschlecht-grid');
            console.log('[TIAGE DEBUG] Found mobile/modal geschlecht-grids:', mobileModalGrids.length);
            mobileModalGrids.forEach(grid => {
                const person = grid.dataset.person;
                if (!person) return;
                // Mobile/Modal uses combined P options with handleGeschlechtClick
                grid.innerHTML = geschlechtPOptions.map(opt =>
                    `<button type="button" class="geschlecht-btn" data-value="${opt.value}" onclick="handleGeschlechtClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                ).join('');
            });

            // Geschlecht S-Grids werden dynamisch in handleGeschlechtPClick befüllt
            // (kontextabhängig von P-Auswahl)

            // Dominanz-Grids befüllen (nur Desktop mit data-person)
            // Use both class selector and explicit IDs as fallback
            const dGridSelectors = ['.dominanz-grid[data-person]', '#ich-dominanz-grid', '#partner-dominanz-grid'];
            const processedDGrids = new Set();
            dGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedDGrids.has(grid.id)) return;
                    processedDGrids.add(grid.id);
                    const person = grid.dataset.person;
                    console.log('[TIAGE DEBUG] Processing dominanz-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = dominanzOptions.map(opt =>
                        `<button type="button" class="dominanz-btn" data-value="${opt.value}" onclick="handleDominanzClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            console.log('[TIAGE DEBUG] Processed dominanz-grids:', processedDGrids.size);

            // Orientierung-Grids befüllen (nur Desktop mit data-person)
            // Use both class selector and explicit IDs as fallback
            const oGridSelectors = ['.orientierung-grid[data-person]', '#ich-orientierung-grid', '#partner-orientierung-grid'];
            const processedOGrids = new Set();
            oGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedOGrids.has(grid.id)) return;
                    processedOGrids.add(grid.id);
                    const person = grid.dataset.person;
                    console.log('[TIAGE DEBUG] Processing orientierung-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = orientierungOptions.map(opt =>
                        `<button type="button" class="orientierung-btn" data-value="${opt.value}" onclick="handleOrientierungClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            console.log('[TIAGE DEBUG] Processed orientierung-grids:', processedOGrids.size);

            // GFK-Grids befüllen
            // Use both class selector and explicit IDs as fallback
            const gfkGridSelectors = ['.gfk-grid[data-person]', '#ich-gfk-grid', '#partner-gfk-grid', '#mobile-ich-gfk-grid', '#mobile-partner-gfk-grid'];
            const processedGfkGrids = new Set();
            gfkGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedGfkGrids.has(grid.id)) return;
                    processedGfkGrids.add(grid.id);
                    const person = grid.dataset.person;
                    console.log('[TIAGE DEBUG] Processing gfk-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = gfkOptions.map(opt =>
                        `<button type="button" class="gfk-btn" data-value="${opt.value}" onclick="handleGfkClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            console.log('[TIAGE DEBUG] Processed gfk-grids:', processedGfkGrids.size);

            // UI mit gespeichertem State synchronisieren
            ['ich', 'partner'].forEach(person => {
                syncGeschlechtUI(person);
                syncDominanzUI(person);
                syncOrientierungUI(person);
                syncGfkUI(person);
            });

            console.log('[TIAGE DEBUG] initDimensionButtons completed');
        }

        /**
         * Initialize geschlecht hover events for all grids
         */
        function initGeschlechtHoverEvents() {
            document.querySelectorAll('.geschlecht-grid').forEach(grid => {
                const person = grid.dataset.person;
                if (!person) return;

                grid.querySelectorAll('.geschlecht-btn').forEach(btn => {
                    const value = btn.dataset.value;

                    btn.addEventListener('mouseenter', () => {
                        handleGeschlechtHover(person, value, true);
                    });

                    btn.addEventListener('mouseleave', () => {
                        handleGeschlechtHover(person, value, false);
                    });
                });
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        // DOMINANZ PRIMARY/SECONDARY SYSTEM (same logic as Geschlechtsidentität)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Handle click on a Dominanz button
         * Logic (same as Geschlechtsidentität):
         * - First click = Primary (I indicator)
         * - Second click on different = Secondary (G indicator)
         * - Click on Primary = Clear both (primary and secondary)
         * - Click on Secondary = Clear only secondary
         */
        function handleDominanzClick(person, dominanzValue, btn) {
            // Ensure dominanz has correct structure (migration from old format)
            if (!personDimensions[person].dominanz ||
                !('primary' in personDimensions[person].dominanz)) {
                personDimensions[person].dominanz = { primary: null, secondary: null };
            }

            const currentPrimary = personDimensions[person].dominanz.primary;
            const currentSecondary = personDimensions[person].dominanz.secondary;

            if (dominanzValue === currentPrimary) {
                // Click on Primary: Clear both
                personDimensions[person].dominanz.primary = null;
                personDimensions[person].dominanz.secondary = null;
            } else if (dominanzValue === currentSecondary) {
                // Click on Secondary: Clear only secondary
                personDimensions[person].dominanz.secondary = null;
            } else if (!currentPrimary) {
                // No primary yet: Set as primary (handles both null and undefined)
                personDimensions[person].dominanz.primary = dominanzValue;
            } else {
                // Primary exists, different value clicked: Set as secondary
                personDimensions[person].dominanz.secondary = dominanzValue;
            }

            // Sync with mobilePersonDimensions for mobile view consistency
            if (typeof mobilePersonDimensions !== 'undefined') {
                mobilePersonDimensions[person].dominanz.primary = personDimensions[person].dominanz.primary;
                mobilePersonDimensions[person].dominanz.secondary = personDimensions[person].dominanz.secondary;
            }

            // Sync with TiageState if available
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.dominanz`, personDimensions[person].dominanz);
            }

            // Sync all UIs
            syncDominanzUI(person);

            // Remove needs-selection if primary is set
            const hasPrimary = personDimensions[person].dominanz.primary !== null;
            document.querySelectorAll(`[data-dimension="${person}-dominanz-multi"], [data-dimension="mobile-${person}-dominanz"], [data-dimension="${person}-dominanz"]`).forEach(dim => {
                if (hasPrimary) {
                    dim.classList.remove('needs-selection');
                } else {
                    dim.classList.add('needs-selection');
                }
            });

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * GEMEINSAME Funktion: Sync UI für Dominanz oder Orientierung
         * Aktualisiert Buttons in Desktop, Mobile und Modal
         *
         * @param {string} person - 'ich' oder 'partner'
         * @param {string} dimension - 'dominanz' oder 'orientierung'
         */
        function syncDimensionUI(person, dimension) {
            const data = personDimensions[person][dimension];
            if (!data) return;

            const primary = data.primary;
            const secondary = data.secondary;

            // Button-Selektoren für diese Dimension
            const selectors = [
                `.${dimension}-grid[data-person="${person}"] .${dimension}-btn`,
                `#${person}-${dimension}-grid .${dimension}-btn`,
                `#mobile-${person}-${dimension}-grid .${dimension}-btn`,
                `#modal-${person}-${dimension}-grid .${dimension}-btn`
            ];

            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    const value = btn.dataset.value;

                    // Alle States entfernen
                    btn.classList.remove('primary-selected', 'secondary-selected');

                    // Bestehende Indikatoren entfernen
                    const existingIndicator = btn.querySelector('.geschlecht-indicator');
                    if (existingIndicator) {
                        existingIndicator.remove();
                    }

                    // Passenden State und Indikator hinzufügen
                    if (value === primary) {
                        btn.classList.add('primary-selected');
                        const indicator = document.createElement('span');
                        indicator.className = 'geschlecht-indicator indicator-primary';
                        indicator.textContent = 'P';
                        indicator.title = 'Primär';
                        btn.appendChild(indicator);
                    } else if (value === secondary) {
                        btn.classList.add('secondary-selected');
                        const indicator = document.createElement('span');
                        indicator.className = 'geschlecht-indicator indicator-secondary';
                        indicator.textContent = 'S';
                        indicator.title = 'Sekundär';
                        btn.appendChild(indicator);
                    }
                });
            });

            // Summary aktualisieren
            if (dimension === 'dominanz') {
                updateDominanzSummary(person);
            } else if (dimension === 'orientierung') {
                updateOrientierungSummary(person);
            }

            // Mobile Status-Toggle-Buttons synchronisieren (einheitlich für Desktop und Mobile)
            if (typeof syncMobileStatusButtons === 'function') {
                syncMobileStatusButtons(person, dimension);
            }
        }

        // Wrapper für Rückwärtskompatibilität
        function syncDominanzUI(person) {
            syncDimensionUI(person, 'dominanz');
        }

        /**
         * GEMEINSAME Funktion: Summary-Text für eine Dimension erstellen
         *
         * @param {string} person - 'ich' oder 'partner'
         * @param {string} dimension - 'dominanz' oder 'orientierung'
         * @param {boolean} showMissing - true = zeigt "fehlt", false = zeigt ""
         */
        function getDimensionSummary(person, dimension, showMissing = true) {
            const data = personDimensions[person][dimension];
            if (!data) return showMissing ? `${dimension} fehlt` : '';

            const primary = data.primary;
            const secondary = data.secondary;

            if (!primary) {
                // Dimension-Name mit Großbuchstabe für "fehlt" Text
                const label = dimension.charAt(0).toUpperCase() + dimension.slice(1);
                return showMissing ? `${label} fehlt` : '';
            }

            const parts = [primary + ' (P)'];
            if (secondary) {
                parts.push(secondary + ' (S)');
            }

            return '✓ ' + parts.join(', ');
        }

        // Wrapper für Rückwärtskompatibilität
        function getDominanzSummary(person) {
            return getDimensionSummary(person, 'dominanz', true);
        }

        function getDominanzGridSummary(person) {
            return getDimensionSummary(person, 'dominanz', false);
        }

        /**
         * Update header summary for dominanz (only in header area, not in collapsed-summary)
         */
        function updateDominanzSummary(person) {
            const summaryText = getDominanzSummary(person);
            const gridSummaryText = getDominanzGridSummary(person);
            const isMissing = !personDimensions[person].dominanz.primary;

            // Update header element (shows 'fehlt' if nothing selected) - Desktop and Mobile
            ['', 'mobile-'].forEach(prefix => {
                const headerId = `${prefix}${person}-header-dominanz`;
                const header = document.getElementById(headerId);
                if (header) {
                    header.textContent = summaryText;
                    header.classList.toggle('missing', isMissing);
                }
            });

            // Update grid collapsed-summary (only shows selections in green, no 'fehlt')
            ['', 'mobile-'].forEach(prefix => {
                const summaryId = `${prefix}${person}-dominanz-summary`;
                const summary = document.getElementById(summaryId);
                if (summary) {
                    summary.textContent = gridSummaryText;
                    summary.classList.toggle('has-selection', !isMissing);
                }
            });

            // Update needs-selection classes
            ['', 'mobile-', 'modal-'].forEach(prefix => {
                const dim = document.querySelector(`[data-dimension="${prefix}${person}-dominanz-multi"]`);
                if (dim) {
                    if (!isMissing) dim.classList.remove('needs-selection');
                    else dim.classList.add('needs-selection');
                }
            });
        }

        // Helper: Check if any dominanz is selected (for backwards compatibility)
        function hasAnyDominanzSelected(person) {
            return personDimensions[person].dominanz.primary !== null;
        }

        // Get the primary dominanz type (for backwards compatibility)
        function getPrimaryFaktDominanz(person) {
            return personDimensions[person].dominanz.primary;
        }

        // Get the primary orientierung type (for backwards compatibility)
        function getPrimaryFaktOrientierung(person) {
            return personDimensions[person].orientierung.primary;
        }

        // ═══════════════════════════════════════════════════════════════════════
        // ORIENTIERUNG PRIMARY/SECONDARY SYSTEM (same logic as Geschlechtsidentität)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Handle click on an Orientierung button
         * Logic (same as Geschlechtsidentität):
         * - First click = Primary (I indicator)
         * - Second click on different = Secondary (G indicator)
         * - Click on Primary = Clear both (primary and secondary)
         * - Click on Secondary = Clear only secondary
         */
        function handleOrientierungClick(person, orientierungValue, btn) {
            // Ensure orientierung has correct structure (migration from old format)
            if (!personDimensions[person].orientierung ||
                !('primary' in personDimensions[person].orientierung)) {
                personDimensions[person].orientierung = { primary: null, secondary: null };
            }

            const currentPrimary = personDimensions[person].orientierung.primary;
            const currentSecondary = personDimensions[person].orientierung.secondary;

            if (orientierungValue === currentPrimary) {
                // Click on Primary: Clear both
                personDimensions[person].orientierung.primary = null;
                personDimensions[person].orientierung.secondary = null;
            } else if (orientierungValue === currentSecondary) {
                // Click on Secondary: Clear only secondary
                personDimensions[person].orientierung.secondary = null;
            } else if (!currentPrimary) {
                // No primary yet: Set as primary (handles both null and undefined)
                personDimensions[person].orientierung.primary = orientierungValue;
            } else {
                // Primary exists, different value clicked: Set as secondary
                personDimensions[person].orientierung.secondary = orientierungValue;
            }

            // Sync with mobilePersonDimensions for mobile view consistency
            if (typeof mobilePersonDimensions !== 'undefined') {
                mobilePersonDimensions[person].orientierung.primary = personDimensions[person].orientierung.primary;
                mobilePersonDimensions[person].orientierung.secondary = personDimensions[person].orientierung.secondary;
            }

            // Sync with TiageState if available
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.orientierung`, personDimensions[person].orientierung);
            }

            // Sync all UIs
            syncOrientierungUI(person);

            // Remove needs-selection if primary is set
            const hasPrimary = personDimensions[person].orientierung.primary !== null;
            document.querySelectorAll(`[data-dimension="${person}-orientierung-multi"], [data-dimension="mobile-${person}-orientierung"], [data-dimension="${person}-orientierung"]`).forEach(dim => {
                if (hasPrimary) {
                    dim.classList.remove('needs-selection');
                } else {
                    dim.classList.add('needs-selection');
                }
            });

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        // Wrapper für Rückwärtskompatibilität
        function syncOrientierungUI(person) {
            syncDimensionUI(person, 'orientierung');
        }

        // Wrapper für Rückwärtskompatibilität (nutzen getDimensionSummary)
        function getOrientierungSummary(person) {
            return getDimensionSummary(person, 'orientierung', true);
        }

        function getOrientierungGridSummary(person) {
            return getDimensionSummary(person, 'orientierung', false);
        }

        /**
         * Update header summary for orientierung (only in header area, not in collapsed-summary)
         */
        function updateOrientierungSummary(person) {
            const summaryText = getOrientierungSummary(person);
            const gridSummaryText = getOrientierungGridSummary(person);
            const isMissing = !personDimensions[person].orientierung.primary;

            // Update header element (shows 'fehlt' if nothing selected) - Desktop and Mobile
            ['', 'mobile-'].forEach(prefix => {
                const headerId = `${prefix}${person}-header-orientierung`;
                const header = document.getElementById(headerId);
                if (header) {
                    header.textContent = summaryText;
                    header.classList.toggle('missing', isMissing);
                }
            });

            // Update grid collapsed-summary (only shows selections in green, no 'fehlt')
            ['', 'mobile-'].forEach(prefix => {
                const summaryId = `${prefix}${person}-orientierung-summary`;
                const summary = document.getElementById(summaryId);
                if (summary) {
                    summary.textContent = gridSummaryText;
                    summary.classList.toggle('has-selection', !isMissing);
                }
            });

            // Update needs-selection classes
            ['', 'mobile-', 'modal-'].forEach(prefix => {
                const dim = document.querySelector(`[data-dimension="${prefix}${person}-orientierung-multi"]`);
                if (dim) {
                    if (!isMissing) dim.classList.remove('needs-selection');
                    else dim.classList.add('needs-selection');
                }
            });
        }

        // Helper: Check if any orientierung is selected (for backwards compatibility)
        function hasAnyOrientierungSelected(person) {
            return personDimensions[person].orientierung.primary !== null;
        }

        // ═══════════════════════════════════════════════════════════════════════
        // MOBILE STATUS TOGGLE HANDLERS (Gelebt/Interessiert buttons)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * GEMEINSAME Funktion für Dominanz und Orientierung Status-Toggle
         * Reduziert Code-Duplizierung erheblich!
         *
         * @param {string} person - 'ich' oder 'partner'
         * @param {string} dimension - 'dominanz' oder 'orientierung'
         * @param {string} type - z.B. 'dominant', 'heterosexuell', etc.
         * @param {string} status - 'gelebt' (primary) oder 'interessiert' (secondary)
         */
        function handleStatusToggle(person, dimension, type, status) {
            // Sicherstellen, dass die Datenstruktur existiert
            if (!personDimensions[person][dimension] ||
                !('primary' in personDimensions[person][dimension])) {
                personDimensions[person][dimension] = { primary: null, secondary: null };
            }

            const data = personDimensions[person][dimension];
            const currentPrimary = data.primary;
            const currentSecondary = data.secondary;

            if (status === 'gelebt') {
                // Toggle primary (Gelebt)
                if (currentPrimary === type) {
                    // Schon primary → entfernen
                    data.primary = null;
                    if (currentSecondary === type) {
                        data.secondary = null;
                    }
                } else {
                    // Als primary setzen
                    data.primary = type;
                    if (currentSecondary === type) {
                        data.secondary = null;
                    }
                }
            } else if (status === 'interessiert') {
                // Toggle secondary (Interessiert)
                if (currentSecondary === type) {
                    // Schon secondary → entfernen
                    data.secondary = null;
                } else {
                    // Als secondary setzen (nur wenn nicht schon primary)
                    if (currentPrimary !== type) {
                        data.secondary = type;
                    }
                }
            }

            // Mit mobilePersonDimensions synchronisieren
            if (typeof mobilePersonDimensions !== 'undefined' &&
                mobilePersonDimensions[person]?.[dimension]) {
                mobilePersonDimensions[person][dimension].primary = data.primary;
                mobilePersonDimensions[person][dimension].secondary = data.secondary;
            }

            // Mit TiageState synchronisieren
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.${dimension}`, data);
            }

            // UI synchronisieren (je nach Dimension)
            if (dimension === 'dominanz') {
                syncDominanzUI(person);
                syncMobileDominanzStatusButtons(person);
            } else if (dimension === 'orientierung') {
                syncOrientierungUI(person);
                syncMobileOrientierungStatusButtons(person);
            }

            // needs-selection aktualisieren
            const hasPrimary = data.primary !== null;
            document.querySelectorAll(`[data-dimension*="${person}-${dimension}"]`).forEach(dim => {
                dim.classList.toggle('needs-selection', !hasPrimary);
            });

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Wrapper für Dominanz (behält alte onclick-Aufrufe funktionsfähig)
         */
        function handleDominanzStatusToggle(person, dominanzType, status, btn) {
            handleStatusToggle(person, 'dominanz', dominanzType, status);
        }

        /**
         * Wrapper für Orientierung (behält alte onclick-Aufrufe funktionsfähig)
         */
        function handleOrientierungStatusToggle(person, orientierungType, status, btn) {
            handleStatusToggle(person, 'orientierung', orientierungType, status);
        }

        /**
         * GEMEINSAME Funktion: Sync mobile status buttons für eine Dimension
         *
         * @param {string} person - 'ich' oder 'partner'
         * @param {string} dimension - 'dominanz' oder 'orientierung'
         */
        function syncMobileStatusButtons(person, dimension) {
            const data = personDimensions[person][dimension];
            if (!data) return;

            const primary = data.primary;
            const secondary = data.secondary;

            // Konfiguration für jede Dimension
            const config = {
                dominanz: {
                    types: ['dominant', 'submissiv', 'switch', 'ausgeglichen'],
                    abbrevs: ['dom', 'sub', 'sw', 'aus'],
                    letter: 'd'
                },
                orientierung: {
                    types: ['heterosexuell', 'homosexuell', 'bisexuell'],
                    abbrevs: ['het', 'hom', 'bi'],
                    letter: 'o'
                }
            };

            const { types, abbrevs, letter } = config[dimension];
            const prefix = person === 'ich' ? 'm-ich' : 'm-partner';

            types.forEach((type, i) => {
                const statusGroup = document.getElementById(`${prefix}-${letter}-${abbrevs[i]}-status`);
                if (!statusGroup) return;

                const gelebtBtn = statusGroup.querySelector('[data-status="gelebt"]');
                const interessiertBtn = statusGroup.querySelector('[data-status="interessiert"]');

                if (gelebtBtn) {
                    gelebtBtn.classList.toggle('active-gelebt', primary === type);
                }
                if (interessiertBtn) {
                    interessiertBtn.classList.toggle('active-interessiert', secondary === type);
                }
            });
        }

        // Wrapper für Rückwärtskompatibilität
        function syncMobileDominanzStatusButtons(person) {
            syncMobileStatusButtons(person, 'dominanz');
        }

        function syncMobileOrientierungStatusButtons(person) {
            syncMobileStatusButtons(person, 'orientierung');
        }

        // ═══════════════════════════════════════════════════════════════════════
        // GFK (Gewaltfreie Kommunikation) HANDLER
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Handle click on a GFK button
         * GFK-Wert wird durch die App basierend auf Archetypen berechnet - nicht manuell umschaltbar.
         * Bei Klick wird ein erklärendes Modal angezeigt.
         */
        function handleGfkClick(person, gfkValue, btn) {
            // GFK-Wert ist nicht manuell umschaltbar - zeige Erklärungsmodal
            showGfkExplanationModal(gfkValue);
        }

        /**
         * GFK-Erklärungen für die verschiedenen Level
         */
        const gfkLevelExplanations = {
            niedrig: {
                title: 'Niedrig',
                description: `
                    <p><strong>Niedrige Bedürfnis-Übereinstimmung</strong> bedeutet, dass die Kernbedürfnisse der beiden Archetypen stark voneinander abweichen.</p>
                    <p>Dies kann zu Herausforderungen in der Kommunikation führen, da beide Partner unterschiedliche Prioritäten haben. Eine bewusste Auseinandersetzung mit den Bedürfnissen des anderen ist hier besonders wichtig.</p>
                    <p>Typische Unterschiede betreffen oft:</p>
                    <ul style="margin-left: 20px; margin-top: 8px;">
                        <li>Freiheit vs. Sicherheit</li>
                        <li>Autonomie vs. Nähe</li>
                        <li>Stabilität vs. Spontaneität</li>
                    </ul>
                `
            },
            mittel: {
                title: 'Mittel',
                description: `
                    <p><strong>Mittlere Bedürfnis-Übereinstimmung</strong> zeigt eine teilweise Schnittmenge der Kernbedürfnisse.</p>
                    <p>Es gibt sowohl gemeinsame Grundlagen als auch Bereiche, die Kompromissbereitschaft erfordern. Mit guter Kommunikation können diese Unterschiede als bereichernd erlebt werden.</p>
                    <p>Empfehlung: Fokussiert euch auf die gemeinsamen Bedürfnisse und entwickelt Strategien für die unterschiedlichen Prioritäten.</p>
                `
            },
            hoch: {
                title: 'Hoch',
                description: `
                    <p><strong>Hohe Bedürfnis-Übereinstimmung</strong> bedeutet, dass beide Archetypen ähnliche Kernbedürfnisse priorisieren.</p>
                    <p>Dies schafft eine natürliche Basis für Verständnis und kann die Kommunikation erleichtern. Beide Partner sprechen oft intuitiv die gleiche "Bedürfnis-Sprache".</p>
                    <p>Dies ist ein guter Ausgangspunkt - dennoch bleibt achtsame Kommunikation wichtig, da auch bei hoher Übereinstimmung individuelle Unterschiede bestehen.</p>
                `
            }
        };

        /**
         * Zeigt das GFK-Erklärungsmodal an
         */
        function showGfkExplanationModal(level) {
            const modal = document.getElementById('gfkExplanationModal');
            const badge = document.getElementById('gfkModalLevelBadge');
            const explanation = document.getElementById('gfkModalExplanation');

            if (!modal || !level) return;

            // Level-spezifische Daten
            const data = gfkLevelExplanations[level] || gfkLevelExplanations.niedrig;

            // Badge aktualisieren
            badge.textContent = data.title;
            badge.className = 'gfk-level-indicator gfk-level-' + level;

            // Erklärung aktualisieren
            explanation.innerHTML = data.description;

            // Modal öffnen
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        /**
         * Schließt das GFK-Erklärungsmodal
         */
        function closeGfkExplanationModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('gfkExplanationModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        /**
         * Öffnet das Bedürfnis-Vergleich Modal
         * @param {string} type - 'gemeinsam' oder 'unterschiedlich'
         */
        function openNeedsCompareModal(type) {
            const modal = document.getElementById('needsCompareModal');
            const body = document.getElementById('needsCompareModalBody');
            const title = document.getElementById('needsCompareModalTitle');

            if (!modal || !body) return;

            // Matching-Daten holen
            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');

            if (!ichArchetyp || !partnerArchetyp || typeof GfkBeduerfnisse === 'undefined') {
                body.innerHTML = '<p style="color: var(--text-muted);">Keine Daten verfügbar.</p>';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                return;
            }

            const matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
            const ichName = archetypeDescriptions[currentArchetype]?.name || 'ICH';
            const partnerName = archetypeDescriptions[selectedPartner]?.name || 'Partner';

            // Titel setzen
            if (type === 'gemeinsam') {
                title.textContent = 'Gemeinsame Bedürfnisse';
            } else {
                title.textContent = 'Unterschiedliche Prioritäten';
            }

            // Daten für Anzeige vorbereiten
            const items = type === 'gemeinsam'
                ? (matching.topUebereinstimmungen || [])
                : (matching.topKonflikte || []);

            if (items.length === 0) {
                body.innerHTML = '<p style="color: var(--text-muted);">Keine Einträge vorhanden.</p>';
            } else {
                let html = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                        <div style="text-align: center; font-weight: 600; color: var(--success); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                            ${ichName}
                        </div>
                        <div style="text-align: center; font-weight: 600; color: var(--danger); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                            ${partnerName}
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                `;

                items.forEach(item => {
                    const label = TiageI18n.t(`needs.items.${item.id}`, item.label);
                    const wert1 = item.wert1 || 0;
                    const wert2 = item.wert2 || 0;
                    const diff = Math.abs(wert1 - wert2);

                    // Status-Icon und Farbe
                    let statusIcon, statusColor, statusText;
                    if (diff <= 15) {
                        statusIcon = '✓';
                        statusColor = '#22c55e';
                        statusText = 'Übereinstimmung';
                    } else if (diff <= 35) {
                        statusIcon = '~';
                        statusColor = '#eab308';
                        statusText = 'Komplementär';
                    } else {
                        statusIcon = '✗';
                        statusColor = '#ef4444';
                        statusText = 'Unterschied';
                    }

                    html += `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px; border-left: 3px solid ${statusColor};">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <span onclick="openNeedDefinitionModal('${item.id}')" style="font-weight: 500; color: var(--text-primary); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-primary)'">${label} <span style="font-size: 10px; opacity: 0.5;">ⓘ</span></span>
                                <span style="color: ${statusColor}; font-size: 11px; font-weight: 600;">${statusIcon} ${statusText}</span>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert1}%; height: 100%; background: var(--success); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 35px; text-align: right;">${wert1}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert2}%; height: 100%; background: var(--danger); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 35px; text-align: right;">${wert2}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += '</div>';

                // Info-Box hinzufügen
                const infoText = type === 'gemeinsam'
                    ? 'Gemeinsame Bedürfnisse bilden das Fundament eurer Verbindung. Hier könnt ihr euch gegenseitig stärken.'
                    : 'Unterschiedliche Prioritäten zeigen Wachstumspotential. Diese Bereiche erfordern bewusste Kommunikation.';

                html += `
                    <div style="margin-top: 16px; padding: 12px; background: rgba(139,92,246,0.08); border-radius: 8px; border: 1px solid rgba(139,92,246,0.2);">
                        <p style="font-size: 12px; color: var(--text-secondary); margin: 0; line-height: 1.5;">${infoText}</p>
                    </div>
                `;

                body.innerHTML = html;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        /**
         * Schließt das Bedürfnis-Vergleich Modal
         */
        function closeNeedsCompareModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('needsCompareModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // BEDÜRFNIS-DEFINITIONEN MODAL
        // ═══════════════════════════════════════════════════════════════════════════

        /**
         * Detaillierte Definitionen für alle Bedürfnisse
         * Basierend auf GFK (Gewaltfreie Kommunikation) nach Marshall Rosenberg
         */
        const needDefinitions = {
            // EXISTENZ
            luft: {
                "#ID": "#B1",
                label: "Luft",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das grundlegende Bedürfnis nach frischer Luft und freiem Atmen – sowohl physisch als auch metaphorisch als Raum zum Durchatmen."
            },
            wasser: {
                "#ID": "#B2",
                label: "Wasser",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das Bedürfnis nach Flüssigkeit und Erfrischung – die Basis körperlicher Vitalität."
            },
            nahrung: {
                "#ID": "#B3",
                label: "Nahrung",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das Bedürfnis nach Nährung – körperlich durch Essen, aber auch emotional durch nährende Beziehungen."
            },
            bewegung: {
                "#ID": "#B4",
                label: "Bewegung/Betätigung",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das Bedürfnis nach körperlicher Aktivität, Bewegung und dem Ausdruck von Lebensenergie durch den Körper."
            },
            beruehrung: {
                "#ID": "#B5",
                label: "Berührung/Körperkontakt",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das tiefe menschliche Bedürfnis nach physischem Kontakt, Hautnähe und der Wärme eines anderen Körpers."
            },
            erholung: {
                "#ID": "#B6",
                label: "Erholung/Schlaf",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das Bedürfnis nach Ruhe, Regeneration und ausreichend Schlaf zur Wiederherstellung von Körper und Geist."
            },
            sexueller_ausdruck: {
                "#ID": "#B7",
                label: "Sexueller Ausdruck",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das Bedürfnis nach sexueller Entfaltung, körperlicher Lust und dem intimen Ausdruck von Begehren und Verbindung."
            },
            sicherheit_physisch: {
                "#ID": "#B8",
                label: "Physische Sicherheit",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das grundlegende Bedürfnis nach körperlicher Unversehrtheit und Schutz vor physischen Bedrohungen."
            },
            unterschlupf: {
                "#ID": "#B9",
                label: "Unterschlupf",
                kategorie: "Existenz",
                kategorieColor: "#E63946",
                definition: "Das Bedürfnis nach einem geschützten Raum, einem Zuhause und einem sicheren Ort zum Sein."
            },

            // SICHERHEIT
            bestaendigkeit: {
                "#ID": "#B10",
                label: "Beständigkeit",
                kategorie: "Sicherheit",
                kategorieColor: "#F4A261",
                definition: "Das Bedürfnis nach Kontinuität, Verlässlichkeit und der Gewissheit, dass Dinge bleiben und nicht plötzlich verschwinden."
            },
            sich_sicher_fuehlen: {
                "#ID": "#B11",
                label: "Sich sicher fühlen",
                kategorie: "Sicherheit",
                kategorieColor: "#F4A261",
                definition: "Das emotionale Bedürfnis nach innerer Sicherheit – zu wissen, dass man in der Beziehung gehalten wird."
            },
            schutz: {
                "#ID": "#B12",
                label: "Schutz",
                kategorie: "Sicherheit",
                kategorieColor: "#F4A261",
                definition: "Das Bedürfnis, beschützt zu werden oder andere zu beschützen – ein Gefühl von Fürsorge und Wachsamkeit."
            },
            stabilitaet: {
                "#ID": "#B13",
                label: "Stabilität",
                kategorie: "Sicherheit",
                kategorieColor: "#F4A261",
                definition: "Das Bedürfnis nach einem festen Grund unter den Füßen – emotionale und praktische Beständigkeit in der Beziehung."
            },
            leichtigkeit: {
                "#ID": "#B14",
                label: "Leichtigkeit",
                kategorie: "Sicherheit",
                kategorieColor: "#F4A261",
                definition: "Das Bedürfnis, sich entspannt und unbeschwert fühlen zu können, ohne ständige Sorgen oder Anspannung."
            },
            geborgenheit: {
                "#ID": "#B15",
                label: "Geborgenheit",
                kategorie: "Sicherheit",
                kategorieColor: "#F4A261",
                definition: "Das tiefe Bedürfnis nach Wärme, Schutz und dem Gefühl, in der Beziehung vollständig aufgefangen zu sein."
            },

            // ZUNEIGUNG
            waerme: {
                "#ID": "#B16",
                label: "Wärme",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis nach emotionaler Wärme – Herzlichkeit, Zugewandtheit und liebevoller Präsenz."
            },
            wertschaetzung: {
                "#ID": "#B17",
                label: "Wertschätzung",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis, in seinem Wert erkannt und geschätzt zu werden – für das, was man ist und beiträgt."
            },
            naehe: {
                "#ID": "#B18",
                label: "Nähe",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis nach emotionaler und körperlicher Nähe – die Verbindung, die entsteht, wenn man sich einander öffnet."
            },
            gesellschaft: {
                "#ID": "#B19",
                label: "Gesellschaft",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis nach Gemeinschaft und Zusammensein – nicht allein zu sein, sondern Zeit miteinander zu verbringen."
            },
            intimitaet: {
                "#ID": "#B20",
                label: "Intimität",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis nach tiefer, ungeschützter Verbindung – das Teilen von Innerem ohne Masken."
            },
            liebe: {
                "#ID": "#B21",
                label: "Liebe",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das universelle Bedürfnis, zu lieben und geliebt zu werden – die kraftvollste Form menschlicher Verbindung."
            },
            fuersorge: {
                "#ID": "#B22",
                label: "Fürsorge",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis, für jemanden zu sorgen oder umsorgt zu werden – aktive Zuwendung und Kümmern."
            },
            unterstuetzung: {
                "#ID": "#B23",
                label: "Unterstützung",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis nach Hilfe und Beistand – zu wissen, dass jemand da ist, wenn man Unterstützung braucht."
            },
            fuereinander_da_sein: {
                "#ID": "#B24",
                label: "Füreinander da sein",
                kategorie: "Zuneigung",
                kategorieColor: "#E84393",
                definition: "Das Bedürfnis nach gegenseitiger Präsenz und Verfügbarkeit – füreinander Zeit und Raum zu haben."
            },

            // VERSTÄNDNIS
            akzeptanz: {
                "#ID": "#B25",
                label: "Akzeptanz",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis, so angenommen zu werden, wie man ist – ohne Bedingungen oder den Druck, sich ändern zu müssen."
            },
            mitgefuehl: {
                "#ID": "#B26",
                label: "Mitgefühl",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis nach einfühlsamer Anteilnahme – dass jemand mit einem fühlt, nicht nur versteht."
            },
            beruecksichtigung: {
                "#ID": "#B27",
                label: "Berücksichtigung",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis, dass die eigenen Bedürfnisse, Wünsche und Grenzen in Betracht gezogen werden."
            },
            empathie: {
                "#ID": "#B28",
                label: "Empathie",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis nach tiefem Verstanden-Werden – dass jemand sich in die eigene Welt einfühlt."
            },
            vertrauen: {
                "#ID": "#B29",
                label: "Vertrauen",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das fundamentale Bedürfnis nach Vertrauen – die Gewissheit, dass man sich auf den anderen verlassen kann."
            },
            beachtung: {
                "#ID": "#B30",
                label: "Beachtung",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis nach Aufmerksamkeit – wahrgenommen und nicht übersehen zu werden."
            },
            gesehen_werden: {
                "#ID": "#B31",
                label: "Gesehen werden",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das tiefe Bedürfnis, in seiner Essenz erkannt zu werden – wirklich gesehen, nicht nur oberflächlich."
            },
            verstanden_werden: {
                "#ID": "#B32",
                label: "Verstanden werden",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis, dass die eigene Perspektive, Gefühle und Beweggründe wirklich nachvollzogen werden."
            },
            harmonie: {
                "#ID": "#B33",
                label: "Harmonie",
                kategorie: "Verständnis",
                kategorieColor: "#9B5DE5",
                definition: "Das Bedürfnis nach Einklang und Frieden – ein konfliktfreies, ausgeglichenes Miteinander."
            },

            // FREIHEIT
            selbstbestimmung: {
                "#ID": "#B34",
                label: "Selbstbestimmung",
                kategorie: "Freiheit",
                kategorieColor: "#2A9D8F",
                definition: "Das Bedürfnis, das eigene Leben und die eigenen Entscheidungen selbst zu gestalten – Autonomie über das eigene Sein."
            },
            waehlen_koennen: {
                "#ID": "#B35",
                label: "Wählen können",
                kategorie: "Freiheit",
                kategorieColor: "#2A9D8F",
                definition: "Das Bedürfnis nach Wahlfreiheit – Optionen zu haben und frei entscheiden zu können."
            },
            unabhaengigkeit: {
                "#ID": "#B36",
                label: "Unabhängigkeit",
                kategorie: "Freiheit",
                kategorieColor: "#2A9D8F",
                definition: "Das Bedürfnis nach Eigenständigkeit – nicht von anderen abhängig oder kontrolliert zu sein."
            },
            raum_haben: {
                "#ID": "#B37",
                label: "Raum haben",
                kategorie: "Freiheit",
                kategorieColor: "#2A9D8F",
                definition: "Das Bedürfnis nach persönlichem Freiraum – Zeit und Raum für sich selbst, ohne Erwartungen."
            },
            spontaneitaet: {
                "#ID": "#B38",
                label: "Spontaneität",
                kategorie: "Freiheit",
                kategorieColor: "#2A9D8F",
                definition: "Das Bedürfnis nach Freiheit von Planung – impulsiv handeln können, dem Moment folgen."
            },

            // TEILNAHME
            zusammenarbeit: {
                "#ID": "#B39",
                label: "Zusammenarbeit",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das Bedürfnis, gemeinsam an etwas zu arbeiten – als Team zu agieren und gemeinsame Ziele zu verfolgen."
            },
            kommunikation: {
                "#ID": "#B40",
                label: "Kommunikation",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das Bedürfnis nach Austausch und Dialog – Gedanken, Gefühle und Ideen miteinander zu teilen."
            },
            gemeinschaft: {
                "#ID": "#B41",
                label: "Gemeinschaft",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das Bedürfnis nach Zugehörigkeit zu einer Gruppe – Teil von etwas Größerem zu sein."
            },
            zugehoerigkeit: {
                "#ID": "#B42",
                label: "Zugehörigkeit",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das tiefe Bedürfnis, dazuzugehören – ein Gefühl von 'Hier bin ich richtig, hier gehöre ich hin'."
            },
            gegenseitigkeit: {
                "#ID": "#B43",
                label: "Gegenseitigkeit",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das Bedürfnis nach balanciertem Geben und Nehmen – ein ausgewogener Austausch, bei dem beide Seiten beitragen und empfangen."
            },
            respekt: {
                "#ID": "#B44",
                label: "Respekt",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das Bedürfnis nach Achtung und Würdigung – als Mensch respektiert und ernst genommen zu werden."
            },
            bedeutung_haben: {
                "#ID": "#B45",
                label: "Bedeutung haben",
                kategorie: "Teilnahme",
                kategorieColor: "#06D6A0",
                definition: "Das Bedürfnis, für andere wichtig zu sein – einen Unterschied zu machen und eine bedeutungsvolle Rolle zu haben."
            },

            // MUSSE
            schoenheit: {
                "#ID": "#B46",
                label: "Schönheit",
                kategorie: "Muße",
                kategorieColor: "#118AB2",
                definition: "Das Bedürfnis nach ästhetischem Erleben – Schönheit wahrzunehmen und sich davon berühren zu lassen."
            },
            freizeit: {
                "#ID": "#B47",
                label: "Freizeit",
                kategorie: "Muße",
                kategorieColor: "#118AB2",
                definition: "Das Bedürfnis nach freier, ungeplanter Zeit – Raum für Erholung, Spiel und Nichtstun."
            },
            freude: {
                "#ID": "#B48",
                label: "Freude",
                kategorie: "Muße",
                kategorieColor: "#118AB2",
                definition: "Das Bedürfnis nach Freude und Vergnügen – Momente der Leichtigkeit und des Glücks."
            },
            humor: {
                "#ID": "#B49",
                label: "Humor",
                kategorie: "Muße",
                kategorieColor: "#118AB2",
                definition: "Das Bedürfnis nach Lachen und Leichtigkeit – das Leben nicht immer ernst zu nehmen."
            },

            // IDENTITÄT
            authentizitaet: {
                "#ID": "#B50",
                label: "Authentizität",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, echt und wahrhaftig zu sein – sich selbst treu zu bleiben und nicht zu verstellen."
            },
            echtheit: {
                "#ID": "#B51",
                label: "Echtheit",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis nach Aufrichtigkeit und Wahrhaftigkeit – in echten, unverfälschten Begegnungen."
            },
            integritaet: {
                "#ID": "#B52",
                label: "Integrität",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, im Einklang mit den eigenen Werten zu handeln – innere Stimmigkeit und Konsequenz."
            },
            praesenz: {
                "#ID": "#B53",
                label: "Präsenz",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, vollständig im Moment zu sein – ganz da, wach und aufmerksam."
            },
            ordnung: {
                "#ID": "#B54",
                label: "Ordnung",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis nach Struktur und Klarheit – ein geordnetes Umfeld, das Orientierung gibt."
            },
            bewusstheit: {
                "#ID": "#B55",
                label: "Bewusstheit",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis nach Selbsterkenntnis und Achtsamkeit – sich seiner selbst und der Welt bewusst zu sein."
            },
            herausforderung: {
                "#ID": "#B56",
                label: "Herausforderung",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, gefordert zu werden – an Aufgaben zu wachsen und sich zu beweisen."
            },
            klarheit: {
                "#ID": "#B57",
                label: "Klarheit",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis nach Durchblick und Verständnis – zu wissen, woran man ist."
            },
            kompetenz: {
                "#ID": "#B58",
                label: "Kompetenz",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis nach Fähigkeit und Können – etwas gut zu beherrschen und wirksam zu sein."
            },
            effizienz: {
                "#ID": "#B59",
                label: "Effizienz",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, Dinge effektiv und ohne Verschwendung zu tun – optimales Handeln."
            },
            wirksamkeit: {
                "#ID": "#B60",
                label: "Wirksamkeit",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, etwas zu bewirken – Einfluss zu haben und Veränderung hervorzurufen."
            },
            wachstum: {
                "#ID": "#B61",
                label: "Wachstum",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis nach persönlicher Entwicklung – zu lernen, zu reifen und das eigene Potenzial zu entfalten."
            },
            sinn: {
                "#ID": "#B62",
                label: "Sinn",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das tiefe Bedürfnis nach Bedeutung und Zweck – dass das Leben und Handeln einen Sinn hat."
            },
            beitrag_leisten: {
                "#ID": "#B63",
                label: "Einen Beitrag leisten",
                kategorie: "Identität & Bedeutung",
                kategorieColor: "#FFD166",
                definition: "Das Bedürfnis, etwas beizutragen – zum Wohlergehen anderer oder zum großen Ganzen."
            },

            // ERSCHAFFEN
            kreativitaet: {
                "#ID": "#B64",
                label: "Kreativität",
                kategorie: "Etwas erschaffen",
                kategorieColor: "#FF6B6B",
                definition: "Das Bedürfnis, schöpferisch tätig zu sein – Neues zu erschaffen und kreativ Ausdruck zu finden."
            },
            entdecken: {
                "#ID": "#B65",
                label: "Entdecken",
                kategorie: "Etwas erschaffen",
                kategorieColor: "#FF6B6B",
                definition: "Das Bedürfnis nach Neugier und Exploration – neue Dinge, Orte und Ideen zu entdecken."
            },
            lernen: {
                "#ID": "#B66",
                label: "Lernen",
                kategorie: "Etwas erschaffen",
                kategorieColor: "#FF6B6B",
                definition: "Das Bedürfnis nach Wissen und Verständnis – sich weiterzubilden und Neues zu verstehen."
            },
            selbst_ausdruck: {
                "#ID": "#B67",
                label: "Selbst-Ausdruck",
                kategorie: "Etwas erschaffen",
                kategorieColor: "#FF6B6B",
                definition: "Das Bedürfnis, sich auszudrücken – die eigene Persönlichkeit, Gefühle und Ideen sichtbar zu machen."
            },
            anreize_bekommen: {
                "#ID": "#B68",
                label: "Anreize bekommen",
                kategorie: "Etwas erschaffen",
                kategorieColor: "#FF6B6B",
                definition: "Das Bedürfnis nach Stimulation und Inspiration – neue Impulse, die motivieren und anregen."
            },

            // VERBUNDENHEIT
            leben_feiern: {
                "#ID": "#B69",
                label: "Das Leben feiern",
                kategorie: "Verbunden sein",
                kategorieColor: "#A8DADC",
                definition: "Das Bedürfnis, die Schönheit und Fülle des Lebens zu würdigen – Dankbarkeit und Freude am Sein."
            },
            inspiration: {
                "#ID": "#B70",
                label: "Inspiration",
                kategorie: "Verbunden sein",
                kategorieColor: "#A8DADC",
                definition: "Das Bedürfnis, inspiriert zu werden – berührt, bewegt und zu Höherem angeregt."
            },
            trauer_ausdruecken: {
                "#ID": "#B71",
                label: "Trauer ausdrücken",
                kategorie: "Verbunden sein",
                kategorieColor: "#A8DADC",
                definition: "Das Bedürfnis, Verlust und Schmerz ausdrücken zu dürfen – Trauer als Teil des Lebens zu ehren."
            },
            einsehen: {
                "#ID": "#B72",
                label: "Einsehen",
                kategorie: "Verbunden sein",
                kategorieColor: "#A8DADC",
                definition: "Das Bedürfnis nach tieferer Erkenntnis – Zusammenhänge zu verstehen und Einsicht zu gewinnen."
            },
            anfang_ende: {
                "#ID": "#B73",
                label: "Anfang & Ende",
                kategorie: "Verbunden sein",
                kategorieColor: "#A8DADC",
                definition: "Das Bedürfnis, Übergänge zu würdigen – Anfänge zu feiern und Enden zu betrauern als Teil des Lebenskreislaufs."
            },

            // DYNAMIK & AUSTAUSCH
            kontrolle_ausueben: {
                "#ID": "#B74",
                label: "Kontrolle ausüben",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, in einer Beziehung Verantwortung und Führung zu übernehmen – Entscheidungen zu treffen und Struktur zu geben."
            },
            hingabe: {
                "#ID": "#B75",
                label: "Hingabe",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, sich vertrauensvoll hinzugeben – Kontrolle abzugeben und sich ganz auf den Partner einzulassen."
            },
            fuehrung_geben: {
                "#ID": "#B76",
                label: "Führung geben",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, Richtung und Orientierung zu geben – den Partner zu leiten und zu führen."
            },
            gefuehrt_werden: {
                "#ID": "#B77",
                label: "Geführt werden",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, sich führen zu lassen – Vertrauen in die Führung des Partners zu haben und Entlastung zu erfahren."
            },
            ritual: {
                "#ID": "#B78",
                label: "Rituale & Struktur",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach wiederkehrenden Praktiken und Strukturen – Rituale, die Verbindung und Bedeutung schaffen."
            },
            nachsorge: {
                "#ID": "#B79",
                label: "Nachsorge/Aftercare",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Fürsorge und Geborgenheit nach intensiven Erlebnissen – sanftes Zurückkommen und Aufgefangen-Werden."
            },
            grenzen_setzen: {
                "#ID": "#B80",
                label: "Grenzen setzen",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, eigene Grenzen zu kennen und zu kommunizieren – Selbstschutz und klare Kommunikation."
            },
            grenzen_respektieren: {
                "#ID": "#B81",
                label: "Grenzen respektieren",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, dass die eigenen Grenzen geachtet werden – und selbst die Grenzen anderer zu respektieren."
            },
            intensitaet: {
                "#ID": "#B82",
                label: "Intensität erleben",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach starken, tiefgehenden Erfahrungen – Momente hoher emotionaler oder körperlicher Intensität."
            },
            vertrauen_schenken: {
                "#ID": "#B83",
                label: "Vertrauen schenken",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, Vertrauen aktiv zu geben – sich verletzlich zu zeigen und dem Partner zu vertrauen."
            },
            verantwortung_uebernehmen: {
                "#ID": "#B84",
                label: "Verantwortung übernehmen",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, Verantwortung für sich, den Partner oder die Dynamik zu tragen – verlässlich und achtsam zu sein."
            },
            sich_fallenlassen: {
                "#ID": "#B85",
                label: "Sich fallenlassen",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, loszulassen und sich ganz einzulassen – in Vertrauen die Kontrolle abzugeben."
            },
            machtaustausch: {
                "#ID": "#B86",
                label: "Machtaustausch",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach bewusstem Geben und Nehmen von Macht – eine einvernehmliche Dynamik, die beide erfüllt."
            },
            dienend_sein: {
                "#ID": "#B87",
                label: "Dienend sein",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, dem Partner zu dienen – Freude und Erfüllung darin zu finden, für den anderen da zu sein."
            },
            beschuetzen: {
                "#ID": "#B88",
                label: "Beschützen",
                kategorie: "Dynamik & Austausch",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, den Partner zu beschützen – Sicherheit zu geben und über sein Wohlergehen zu wachen."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // LEBENSPLANUNG - Kinder, Ehe, Wohnen, Familie
            // ═══════════════════════════════════════════════════════════════════════
            kinderwunsch: {
                "#ID": "#B90",
                label: "Kinderwunsch",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, eigene Kinder zu haben und sie aufwachsen zu sehen – ein tiefer Wunsch nach Weitergabe und Fürsorge.",
                quelle: "Evolutionspsychologie & Entwicklungspsychologie",
                quelleDetail: "Basiert auf dem biologischen Fortpflanzungstrieb (Darwin) und Eriksons Konzept der Generativität – dem Bedürfnis, etwas für die nächste Generation zu hinterlassen."
            },
            elternschaft: {
                "#ID": "#B91",
                label: "Elternschaft",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, als Elternteil zu wirken – Kinder zu erziehen, zu begleiten und in ihrer Entwicklung zu unterstützen.",
                quelle: "Erik Erikson – Stufenmodell der psychosozialen Entwicklung",
                quelleDetail: "Im 7. Stadium (Generativität vs. Stagnation) beschreibt Erikson das Bedürfnis, für die nächste Generation zu sorgen als zentralen Entwicklungsaspekt des Erwachsenenalters."
            },
            fortpflanzung: {
                "#ID": "#B92",
                label: "Fortpflanzung",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das biologische Bedürfnis nach genetischer Weitergabe – der Wunsch, eigene Gene und damit einen Teil von sich selbst weiterzugeben.",
                quelle: "Evolutionsbiologie & Soziobiologie",
                quelleDetail: "Richard Dawkins ('Das egoistische Gen', 1976) erklärt, wie der Fortpflanzungsdrang evolutionär verankert ist. Dieses Bedürfnis variiert individuell stark."
            },
            familie_gruenden: {
                "#ID": "#B93",
                label: "Familie gründen",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, eine eigene Familieneinheit zu schaffen – einen stabilen Rahmen für gemeinsames Leben und gegenseitige Fürsorge.",
                quelle: "Familiensoziologie & Bindungstheorie",
                quelleDetail: "Bowlby's Bindungstheorie zeigt, wie sichere Bindungen in Familien die Grundlage für psychische Gesundheit bilden."
            },
            generativitaet: {
                "#ID": "#B94",
                label: "Generativität",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, etwas Bleibendes zu schaffen und weiterzugeben – sei es durch Kinder, Mentoring oder kreative Werke.",
                quelle: "Erik Erikson – Psychosoziale Entwicklung",
                quelleDetail: "Eriksons 7. Stufe beschreibt Generativität als das Bedürfnis, über das eigene Selbst hinauszuwachsen und zur nächsten Generation beizutragen."
            },
            verbindlichkeit: {
                "#ID": "#B95",
                label: "Verbindlichkeit",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach verlässlichen Zusagen und beständigen Verpflichtungen in der Beziehung.",
                quelle: "Bindungstheorie & Beziehungsforschung",
                quelleDetail: "John Gottman zeigt in seiner Forschung, dass Commitment (Verbindlichkeit) einer der stärksten Prädiktoren für Beziehungsstabilität ist."
            },
            langfristige_bindung: {
                "#ID": "#B96",
                label: "Langfristige Bindung",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einer dauerhaften, stabilen Partnerschaft – Sicherheit durch Beständigkeit.",
                quelle: "Bindungstheorie (Bowlby/Ainsworth)",
                quelleDetail: "Sicher gebundene Menschen zeigen ein starkes Bedürfnis nach langfristigen Bindungen, die emotionale Sicherheit bieten."
            },
            rechtliche_sicherheit: {
                "#ID": "#B97",
                label: "Rechtliche Sicherheit",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach rechtlicher Absicherung der Beziehung – Schutz durch Institutionen wie Ehe oder eingetragene Partnerschaft.",
                quelle: "Familienrecht & Soziologie",
                quelleDetail: "Die Ehe bietet rechtliche Vorteile wie Erbrecht, Steuervorteile und Entscheidungsbefugnisse im Krankheitsfall."
            },
            treueversprechen: {
                "#ID": "#B98",
                label: "Treueversprechen",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach exklusiver emotionaler und/oder sexueller Bindung – Vertrauen durch gegenseitige Treuezusage.",
                quelle: "Evolutionspsychologie & Kulturanthropologie",
                quelleDetail: "David Buss zeigt, wie sich Eifersucht und Treuewunsch evolutionär entwickelt haben, während kulturelle Faktoren deren Ausprägung beeinflussen."
            },
            gemeinsamer_wohnraum: {
                "#ID": "#B99",
                label: "Gemeinsamer Wohnraum",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, den Lebensraum mit dem Partner zu teilen – ein gemeinsames Zuhause als Symbol der Verbundenheit.",
                quelle: "Umweltpsychologie & Beziehungsforschung",
                quelleDetail: "Geteilter Wohnraum fördert Intimität und Alltagsroutinen, die die Beziehungszufriedenheit stärken."
            },
            haeuslichkeit: {
                "#ID": "#B100",
                label: "Häuslichkeit",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einem gemütlichen Zuhause – Geborgenheit und Wohlbefinden in den eigenen vier Wänden.",
                quelle: "Umweltpsychologie",
                quelleDetail: "Das Konzept 'Home' (Zuhause) ist psychologisch mit Sicherheit, Identität und emotionaler Regulierung verbunden."
            },
            nest_bauen: {
                "#ID": "#B101",
                label: "Nest bauen",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, gemeinsam ein Heim zu gestalten – einen Ort der Sicherheit und des Rückzugs zu schaffen.",
                quelle: "Evolutionspsychologie & Nesting-Instinkt",
                quelleDetail: "Der 'Nesting-Instinkt' ist besonders bei werdenden Eltern stark ausgeprägt, aber auch generell ein Zeichen für Bindungssicherheit."
            },
            alltag_teilen: {
                "#ID": "#B102",
                label: "Alltag teilen",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, den täglichen Rhythmus gemeinsam zu erleben – kleine Momente des Zusammenseins im Alltag.",
                quelle: "Beziehungsforschung (Gottman)",
                quelleDetail: "Gottman betont die Bedeutung von 'Bids for Connection' – kleinen Alltagsmomenten, die Beziehungen stärken."
            },
            eigener_raum: {
                "#ID": "#B103",
                label: "Eigener Raum",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einem persönlichen Bereich – Rückzugsort für Individualität auch in der Partnerschaft.",
                quelle: "Selbstbestimmungstheorie (Deci & Ryan)",
                quelleDetail: "Autonomie ist ein Grundbedürfnis. Auch in engen Beziehungen braucht jeder Mensch Raum für sich selbst."
            },
            rueckzugsort: {
                "#ID": "#B104",
                label: "Rückzugsort",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einem Ort der Stille und Erholung – Raum zum Auftanken und Reflektieren.",
                quelle: "Stressforschung & Resilienz",
                quelleDetail: "Rückzugsmöglichkeiten sind essentiell für Stressregulation und emotionale Regeneration."
            },
            tierliebe: {
                "#ID": "#B105",
                label: "Tierliebe",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach Verbindung mit Tieren – Fürsorge, Zuneigung und Freude im Umgang mit tierischen Begleitern.",
                quelle: "Anthrozoologie & Tiergestützte Therapie",
                quelleDetail: "Die Mensch-Tier-Beziehung kann Oxytocin freisetzen und hat nachweislich positive Effekte auf die psychische Gesundheit."
            },
            fuersorge_tiere: {
                "#ID": "#B106",
                label: "Fürsorge für Tiere",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, für ein Tier zu sorgen – Verantwortung, Pflege und die Freude am Wohlergehen eines Tieres.",
                quelle: "Caring-Motivation & Bindung",
                quelleDetail: "Die Fürsorge für Tiere aktiviert ähnliche neurologische Mechanismen wie die Fürsorge für Kinder."
            },
            begleiter: {
                "#ID": "#B107",
                label: "Tierischer Begleiter",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einem treuen tierischen Gefährten – bedingungslose Präsenz und Gesellschaft.",
                quelle: "Soziale Unterstützungsforschung",
                quelleDetail: "Haustiere bieten soziale Unterstützung und können Einsamkeit reduzieren."
            },
            verantwortung_tier: {
                "#ID": "#B108",
                label: "Verantwortung für Tier",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, Verantwortung für ein Lebewesen zu tragen – Struktur und Sinn durch tägliche Fürsorge.",
                quelle: "Entwicklungspsychologie",
                quelleDetail: "Verantwortung für andere (auch Tiere) fördert Selbstwirksamkeit und emotionale Reife."
            },
            sesshaftigkeit: {
                "#ID": "#B109",
                label: "Sesshaftigkeit",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einem festen Wohnort – Stabilität und Verwurzelung an einem Ort.",
                quelle: "Place Attachment Theorie",
                quelleDetail: "Ortsbindung (Place Attachment) ist mit Identität, Sicherheit und Wohlbefinden verbunden."
            },
            verwurzelung: {
                "#ID": "#B110",
                label: "Verwurzelung",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach tiefer Verbindung mit einem Ort oder einer Gemeinschaft – Heimatgefühl und Zugehörigkeit.",
                quelle: "Simone Weil – 'Die Einwurzelung'",
                quelleDetail: "Weil beschreibt Verwurzelung als eines der wichtigsten, aber am wenigsten anerkannten Bedürfnisse der Seele."
            },
            mobilitaet: {
                "#ID": "#B111",
                label: "Mobilität",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach Bewegungsfreiheit – flexibel den Wohnort wechseln zu können.",
                quelle: "Freiheitsbedürfnis & Moderne Soziologie",
                quelleDetail: "In einer globalisierten Welt ist Mobilität für viele Menschen ein wichtiger Aspekt von Freiheit und Selbstverwirklichung."
            },
            heimat: {
                "#ID": "#B112",
                label: "Heimat",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach einem Ort der Zugehörigkeit – emotionale Verbundenheit mit einem geografischen oder sozialen Raum.",
                quelle: "Kulturpsychologie & Identitätsforschung",
                quelleDetail: "Heimat ist ein komplexes psychologisches Konstrukt, das Sicherheit, Identität und soziale Einbettung umfasst."
            },
            neue_orte: {
                "#ID": "#B113",
                label: "Neue Orte",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, neue Orte zu entdecken und zu erleben – Neugier und Offenheit für Veränderung.",
                quelle: "Explorationsverhalten & Neugierforschung",
                quelleDetail: "Das Bedürfnis nach Neuheit (Novelty Seeking) ist ein Persönlichkeitsmerkmal mit neurobiologischer Grundlage."
            },
            familienbindung: {
                "#ID": "#B114",
                label: "Familienbindung",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach enger Verbindung zur eigenen Familie – emotionale Nähe und regelmäßiger Kontakt.",
                quelle: "Bindungstheorie & Familienpsychologie",
                quelleDetail: "Sichere Bindungen zur Herkunftsfamilie können Ressource und Herausforderung zugleich sein."
            },
            herkunftsfamilie: {
                "#ID": "#B115",
                label: "Herkunftsfamilie",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, mit der Familie, in der man aufgewachsen ist, verbunden zu bleiben – Wurzeln und Geschichte.",
                quelle: "Systemische Familientherapie",
                quelleDetail: "Die Herkunftsfamilie prägt Beziehungsmuster, die in der Paarbeziehung reflektiert werden sollten."
            },
            familientreffen: {
                "#ID": "#B116",
                label: "Familientreffen",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach regelmäßigen Zusammenkünften mit der erweiterten Familie – Rituale der Verbundenheit.",
                quelle: "Ritual- und Familienforschung",
                quelleDetail: "Familienrituale stärken den Zusammenhalt und geben Orientierung über Generationen hinweg."
            },
            generationenverbund: {
                "#ID": "#B117",
                label: "Generationenverbund",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach Verbindung über Generationen hinweg – von Großeltern zu Enkeln, Weitergabe von Wissen und Werten.",
                quelle: "Generationenforschung & Narrative Psychologie",
                quelleDetail: "Die Weitergabe von Familiengeschichten stärkt die Identität und das Gefühl von Kontinuität."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // FINANZEN & KARRIERE
            // ═══════════════════════════════════════════════════════════════════════
            finanzielle_unabhaengigkeit: {
                "#ID": "#B127",
                label: "Finanzielle Unabhängigkeit",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, finanziell auf eigenen Beinen zu stehen – nicht von anderen abhängig zu sein für den eigenen Lebensunterhalt.",
                quelle: "Selbstbestimmungstheorie (Deci & Ryan)",
                quelleDetail: "Finanzielle Autonomie ist eng mit dem psychologischen Grundbedürfnis nach Autonomie verknüpft."
            },
            gemeinsame_finanzen: {
                "#ID": "#B128",
                label: "Gemeinsame Finanzen",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, Finanzen mit dem Partner zu teilen – gemeinsame Konten, geteilte Ausgaben, finanzielle Einheit.",
                quelle: "Beziehungsforschung",
                quelleDetail: "Gemeinsame Finanzen können Vertrauen und Verbundenheit stärken, erfordern aber klare Kommunikation."
            },
            finanzielle_transparenz: {
                "#ID": "#B129",
                label: "Finanzielle Transparenz",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach Offenheit über finanzielle Angelegenheiten – keine Geheimnisse bei Geld, Schulden oder Ausgaben.",
                quelle: "Vertrauensforschung",
                quelleDetail: "Finanzielle Geheimnisse sind einer der häufigsten Konfliktpunkte in Beziehungen."
            },
            finanzielle_sicherheit: {
                "#ID": "#B130",
                label: "Finanzielle Sicherheit",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach materieller Absicherung – genug Ressourcen für Grundbedürfnisse und Notfälle.",
                quelle: "Maslows Bedürfnispyramide",
                quelleDetail: "Finanzielle Sicherheit gehört zu den grundlegenden Sicherheitsbedürfnissen."
            },
            sparsamkeit: {
                "#ID": "#B131",
                label: "Sparsamkeit",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, mit Geld bewusst und sparsam umzugehen – Ressourcen zu schonen und für die Zukunft vorzusorgen."
            },
            grosszuegigkeit: {
                "#ID": "#B132",
                label: "Großzügigkeit",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, großzügig zu geben – Freude am Schenken und Teilen von Ressourcen mit anderen.",
                quelle: "Positive Psychologie",
                quelleDetail: "Großzügigkeit ist mit höherem Wohlbefinden und stärkeren sozialen Bindungen verbunden."
            },
            berufliche_erfuellung: {
                "#ID": "#B133",
                label: "Berufliche Erfüllung",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, im Beruf Sinn und Zufriedenheit zu finden – Arbeit als Quelle von Erfüllung, nicht nur Einkommen.",
                quelle: "Arbeitspsychologie",
                quelleDetail: "Berufliche Erfüllung korreliert stark mit allgemeiner Lebenszufriedenheit."
            },
            karriereambition: {
                "#ID": "#B134",
                label: "Karriereambition",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach beruflichem Aufstieg und Erfolg – Ziele erreichen und sich professionell weiterzuentwickeln.",
                quelle: "Leistungsmotivation (McClelland)",
                quelleDetail: "Das Bedürfnis nach Leistung (Need for Achievement) treibt Karriereambitionen an."
            },
            work_life_balance: {
                "#ID": "#B135",
                label: "Work-Life-Balance",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach Ausgewogenheit zwischen Beruf und Privatleben – Zeit und Energie für beide Bereiche.",
                quelle: "Arbeits- und Organisationspsychologie",
                quelleDetail: "Ungleichgewicht führt zu Burnout und Beziehungsproblemen."
            },
            berufliche_anerkennung: {
                "#ID": "#B136",
                label: "Berufliche Anerkennung",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, für berufliche Leistungen gewürdigt zu werden – Respekt und Wertschätzung im Arbeitsumfeld.",
                quelle: "Herzbergs Zwei-Faktoren-Theorie",
                quelleDetail: "Anerkennung ist ein wichtiger Motivationsfaktor am Arbeitsplatz."
            },
            zeit_fuer_beziehung: {
                "#ID": "#B137",
                label: "Zeit für Beziehung",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, trotz beruflicher Anforderungen genügend Zeit für die Partnerschaft zu haben.",
                quelle: "Beziehungsforschung (Gottman)",
                quelleDetail: "Qualitätszeit ist einer der wichtigsten Faktoren für Beziehungszufriedenheit."
            },
            berufliche_flexibilitaet: {
                "#ID": "#B138",
                label: "Berufliche Flexibilität",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach flexiblen Arbeitszeiten und -orten – Freiheit in der Gestaltung des Arbeitsalltags.",
                quelle: "New Work & Arbeitspsychologie",
                quelleDetail: "Flexibilität am Arbeitsplatz erhöht Zufriedenheit und ermöglicht bessere Vereinbarkeit."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // KOMMUNIKATIONSSTIL
            // ═══════════════════════════════════════════════════════════════════════
            taeglicher_austausch: {
                "#ID": "#B149",
                label: "Täglicher Austausch",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach regelmäßiger, alltäglicher Kommunikation – sich über den Tag auszutauschen und in Verbindung zu bleiben.",
                quelle: "Beziehungsforschung",
                quelleDetail: "Regelmäßiger Austausch stärkt die emotionale Verbindung und verhindert Entfremdung."
            },
            tiefgehende_gespraeche: {
                "#ID": "#B150",
                label: "Tiefgehende Gespräche",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach bedeutsamen, tiefgründigen Gesprächen – über Gefühle, Werte, Träume und existenzielle Themen.",
                quelle: "Intimität & Selbstoffenbarung",
                quelleDetail: "Tiefe Gespräche fördern emotionale Intimität und gegenseitiges Verständnis."
            },
            small_talk: {
                "#ID": "#B151",
                label: "Small Talk",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach leichter, unverbindlicher Konversation – entspannter Austausch ohne tiefe Themen."
            },
            stille_gemeinsam: {
                "#ID": "#B152",
                label: "Stille gemeinsam",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, auch in Stille zusammen sein zu können – Verbundenheit ohne Worte, komfortables Schweigen.",
                quelle: "Bindungsforschung",
                quelleDetail: "Sichere Bindung ermöglicht es, auch in Stille verbunden zu sein, ohne Unbehagen."
            },
            verbale_verbindung: {
                "#ID": "#B153",
                label: "Verbale Verbindung",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, sich durch Worte zu verbinden – Sprache als primäres Mittel der Nähe und des Ausdrucks."
            },
            zuhoeren: {
                "#ID": "#B154",
                label: "Zuhören",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, wirklich gehört zu werden – aktives, aufmerksames Zuhören ohne Unterbrechung oder vorschnelle Ratschläge.",
                quelle: "Gewaltfreie Kommunikation (Rosenberg)",
                quelleDetail: "Empathisches Zuhören ist die Grundlage für echtes Verstehen und Verbindung."
            },
            emotionale_offenheit: {
                "#ID": "#B155",
                label: "Emotionale Offenheit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, Gefühle offen zu teilen und zu empfangen – emotionale Transparenz in der Beziehung.",
                quelle: "Emotionsfokussierte Therapie (Johnson)",
                quelleDetail: "Emotionale Offenheit ist zentral für sichere Bindung und Intimität."
            },
            gefuehle_zeigen: {
                "#ID": "#B156",
                label: "Gefühle zeigen",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, eigene Emotionen ausdrücken zu können – Tränen, Freude, Wut authentisch zu zeigen."
            },
            verletzlichkeit: {
                "#ID": "#B157",
                label: "Verletzlichkeit zulassen",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, sich verletzlich zeigen zu dürfen – Schwächen und Unsicherheiten teilen zu können.",
                quelle: "Brené Brown – Verletzlichkeitsforschung",
                quelleDetail: "Verletzlichkeit ist der Geburtsort von Liebe, Zugehörigkeit und Freude."
            },
            emotionale_zurueckhaltung: {
                "#ID": "#B158",
                label: "Emotionale Zurückhaltung",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach Raum für emotionale Privatsphäre – nicht alles teilen zu müssen, Gefühle zu verarbeiten bevor man sie teilt."
            },
            emotionale_sicherheit: {
                "#ID": "#B159",
                label: "Emotionale Sicherheit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, sich emotional sicher zu fühlen – zu wissen, dass Gefühle nicht abgewertet oder gegen einen verwendet werden.",
                quelle: "Bindungstheorie",
                quelleDetail: "Emotionale Sicherheit ist die Grundlage für sichere Bindung und offene Kommunikation."
            },
            gefuehle_teilen: {
                "#ID": "#B160",
                label: "Gefühle teilen",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, emotionale Erlebnisse mit dem Partner zu teilen – gemeinsam zu fühlen und mitzuerleben."
            },
            konfliktklaerung: {
                "#ID": "#B161",
                label: "Konfliktklärung",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, Konflikte offen anzusprechen und zu lösen – nicht unter den Teppich kehren, sondern klären.",
                quelle: "Gottman-Forschung",
                quelleDetail: "Die Art, wie Paare mit Konflikten umgehen, ist entscheidend für die Beziehungsqualität."
            },
            aussprache: {
                "#ID": "#B162",
                label: "Aussprache",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, Dinge auszusprechen – Missverständnisse zu klären und einen Abschluss zu finden."
            },
            konflikt_vermeiden: {
                "#ID": "#B163",
                label: "Konflikt vermeiden",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, Konfrontationen zu minimieren – Harmonie zu bewahren und Streit aus dem Weg zu gehen."
            },
            streitkultur: {
                "#ID": "#B164",
                label: "Streitkultur",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach konstruktivem Streiten – Konflikte fair und respektvoll auszutragen.",
                quelle: "Paartherapie-Forschung",
                quelleDetail: "Eine gesunde Streitkultur ermöglicht Wachstum und tieferes Verständnis."
            },
            versoehnlichkeit: {
                "#ID": "#B165",
                label: "Versöhnlichkeit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach Versöhnung nach Konflikten – wieder zueinander zu finden und Frieden zu schließen.",
                quelle: "Vergebungsforschung",
                quelleDetail: "Versöhnlichkeit ist essentiell für langfristige Beziehungszufriedenheit."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // SOZIALES LEBEN
            // ═══════════════════════════════════════════════════════════════════════
            soziale_energie: {
                "#ID": "#B177",
                label: "Soziale Energie",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach einem bestimmten Level sozialer Interaktion – manche brauchen mehr, manche weniger.",
                quelle: "Persönlichkeitspsychologie (Extraversion)",
                quelleDetail: "Das Kontinuum Introversion-Extraversion beschreibt unterschiedliche soziale Energiebedürfnisse."
            },
            geselligkeit: {
                "#ID": "#B178",
                label: "Geselligkeit",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Gesellschaft und sozialem Beisammensein – Freude an Gruppen und gemeinsamen Aktivitäten."
            },
            ruhe_von_menschen: {
                "#ID": "#B179",
                label: "Ruhe von Menschen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Pausen von sozialen Interaktionen – Zeit ohne Menschen, um sich zu erholen."
            },
            allein_aufladen: {
                "#ID": "#B180",
                label: "Allein aufladen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, durch Alleinsein Energie zu tanken – Introversion als Kraftquelle.",
                quelle: "Introversionsforschung (Susan Cain)",
                quelleDetail: "Introvertierte Menschen regenerieren ihre Energie durch Alleinsein."
            },
            menschen_treffen: {
                "#ID": "#B181",
                label: "Menschen treffen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, regelmäßig andere Menschen zu sehen – soziale Kontakte pflegen und neue Menschen kennenlernen."
            },
            kleine_gruppen: {
                "#ID": "#B182",
                label: "Kleine Gruppen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Intimität kleiner Gruppen – tiefere Gespräche statt oberflächlicher Großgruppeninteraktion."
            },
            zeit_fuer_sich: {
                "#ID": "#B183",
                label: "Zeit für sich",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach persönlicher Zeit ohne den Partner – Raum für individuelle Interessen und Selbstfürsorge.",
                quelle: "Selbstbestimmungstheorie",
                quelleDetail: "Autonomie, auch in Beziehungen, ist ein psychologisches Grundbedürfnis."
            },
            eigene_hobbys: {
                "#ID": "#B184",
                label: "Eigene Hobbys",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, eigene Interessen und Hobbys zu pflegen – Individualität neben der Partnerschaft bewahren."
            },
            gemeinsame_zeit: {
                "#ID": "#B185",
                label: "Gemeinsame Zeit",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Qualitätszeit zu zweit – bewusste gemeinsame Momente und Aktivitäten.",
                quelle: "Liebessprachen (Gary Chapman)",
                quelleDetail: "Qualitätszeit ist eine der fünf Liebessprachen."
            },
            partnerzeit: {
                "#ID": "#B186",
                label: "Partnerzeit",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach exklusiver Zeit mit dem Partner – ungeteilte Aufmerksamkeit und Präsenz."
            },
            eigene_interessen: {
                "#ID": "#B187",
                label: "Eigene Interessen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, persönliche Interessen zu verfolgen – Identität jenseits der Beziehung."
            },
            eigene_freunde: {
                "#ID": "#B188",
                label: "Eigene Freunde",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach eigenen Freundschaften außerhalb der Beziehung – separate soziale Netzwerke."
            },
            gemeinsame_freunde: {
                "#ID": "#B189",
                label: "Gemeinsame Freunde",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Freunden, die man als Paar teilt – gemeinsame soziale Welt."
            },
            freundeskreis_teilen: {
                "#ID": "#B190",
                label: "Freundeskreis teilen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, den Partner in den eigenen Freundeskreis zu integrieren – Welten zusammenführen."
            },
            soziales_netz: {
                "#ID": "#B191",
                label: "Soziales Netz",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach einem stabilen sozialen Netzwerk – Unterstützung durch Freunde und Familie.",
                quelle: "Soziale Unterstützungsforschung",
                quelleDetail: "Ein starkes soziales Netz ist ein wichtiger Schutzfaktor für psychische Gesundheit."
            },
            freunde_pflegen: {
                "#ID": "#B192",
                label: "Freunde pflegen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, Freundschaften aktiv zu pflegen – Zeit und Energie in Beziehungen außerhalb der Partnerschaft zu investieren."
            },
            neue_freundschaften: {
                "#ID": "#B193",
                label: "Neue Freundschaften",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, offen für neue Bekanntschaften zu sein – Freundeskreis erweitern und neue Menschen kennenlernen."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // INTIMITÄT & ROMANTIK
            // ═══════════════════════════════════════════════════════════════════════
            koerpernaehe: {
                "#ID": "#B204",
                label: "Körpernähe",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach physischer Nähe zum Partner – körperlich beieinander sein, spürbare Präsenz.",
                quelle: "Bindungstheorie & Körperpsychologie",
                quelleDetail: "Körperliche Nähe aktiviert das Bindungssystem und fördert Oxytocin-Ausschüttung."
            },
            kuscheln: {
                "#ID": "#B205",
                label: "Kuscheln",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach zärtlichem körperlichem Kontakt – Umarmungen, Anschmiegen, Geborgenheit durch Berührung."
            },
            physische_distanz: {
                "#ID": "#B206",
                label: "Physische Distanz",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach körperlichem Abstand – Raum zwischen sich und anderen als Komfortzone."
            },
            koerperkontakt: {
                "#ID": "#B207",
                label: "Körperkontakt",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach regelmäßigem körperlichem Kontakt – Berührung als Sprache der Verbundenheit.",
                quelle: "Liebessprachen (Gary Chapman)",
                quelleDetail: "Körperliche Berührung ist eine der fünf Liebessprachen."
            },
            umarmungen: {
                "#ID": "#B208",
                label: "Umarmungen",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, umarmt zu werden und zu umarmen – einfache, tiefe Gesten der Zuneigung."
            },
            hand_halten: {
                label: "Hand halten",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach Händchenhalten – öffentliche und private Geste der Verbundenheit."
            },
            romantische_gesten: {
                label: "Romantische Gesten",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach romantischen Ausdrucksformen – Blumen, Briefe, überraschende Gesten der Liebe."
            },
            ueberraschungen: {
                label: "Überraschungen",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, überrascht zu werden oder zu überraschen – Spannung und Freude durch Unerwartetes."
            },
            dates: {
                label: "Dates",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach bewussten Verabredungen – Zeit zu zweit außerhalb des Alltags, auch in langen Beziehungen.",
                quelle: "Beziehungsforschung",
                quelleDetail: "Regelmäßige Dates erhalten die Romantik und verhindern Alltagstrott."
            },
            alltags_romantik: {
                label: "Alltags-Romantik",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach kleinen romantischen Momenten im Alltag – liebevolle Gesten zwischendurch."
            },
            aufmerksamkeiten: {
                label: "Aufmerksamkeiten",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach kleinen Aufmerksamkeiten – Geschenke, Komplimente, Zeichen der Wertschätzung."
            },
            liebesbekundungen: {
                label: "Liebesbekundungen",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, Liebe ausgedrückt zu bekommen – 'Ich liebe dich' hören und sagen."
            },
            sexuelle_haeufigkeit: {
                label: "Sexuelle Häufigkeit",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach einer bestimmten Frequenz sexueller Intimität – unterschiedliche Libido-Level.",
                quelle: "Sexualforschung",
                quelleDetail: "Unterschiedliche sexuelle Bedürfnisse sind einer der häufigsten Beziehungskonflikte."
            },
            sexuelle_intimiaet: {
                label: "Sexuelle Intimität",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach sexueller Verbindung als Form tiefer Intimität – Sex als Ausdruck von Liebe und Nähe."
            },
            koerperliche_lust: {
                label: "Körperliche Lust",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach körperlichem Vergnügen und Lust – Genuss und Befriedigung durch Sexualität."
            },
            sexuelle_experimentierfreude: {
                label: "Sexuelle Experimentierfreude",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, sexuell Neues auszuprobieren – Neugier und Offenheit für Variation."
            },
            sexuelle_verbindung: {
                label: "Sexuelle Verbindung",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, durch Sexualität eine tiefe Verbindung zu spüren – Sex als spirituelle und emotionale Erfahrung."
            },
            sexuelle_zufriedenheit: {
                label: "Sexuelle Zufriedenheit",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach erfüllender Sexualität – dass beide Partner zufrieden und erfüllt sind."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // WERTE & HALTUNGEN
            // ═══════════════════════════════════════════════════════════════════════
            spiritualitaet: {
                label: "Spiritualität",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach spiritueller Erfahrung und Praxis – Verbindung zu etwas Größerem als sich selbst.",
                quelle: "Religionspsychologie",
                quelleDetail: "Spiritualität ist mit Sinnerleben und Wohlbefinden verbunden, unabhängig von Religion."
            },
            glaubenspraxis: {
                label: "Glaubenspraxis",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, den eigenen Glauben aktiv zu praktizieren – Rituale, Gebete, religiöse Gemeinschaft."
            },
            religioese_gemeinschaft: {
                label: "Religiöse Gemeinschaft",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, Teil einer religiösen Gemeinde zu sein – geteilter Glaube und spirituelle Gemeinschaft."
            },
            saekularitaet: {
                label: "Säkularität",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach einem weltlichen, nicht-religiösen Lebensansatz – Sinn ohne Religion finden."
            },
            sinnsuche: {
                label: "Sinnsuche",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, den Sinn des Lebens zu erforschen – existenzielle Fragen zu stellen und Antworten zu suchen.",
                quelle: "Existenzpsychologie (Viktor Frankl)",
                quelleDetail: "Die Suche nach Sinn ist nach Frankl die primäre Motivation des Menschen."
            },
            transzendenz: {
                label: "Transzendenz",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, über das Alltägliche hinauszugehen – Erfahrungen, die über das Selbst hinausweisen.",
                quelle: "Maslow – Selbsttranszendenz",
                quelleDetail: "Maslow fügte später Transzendenz als höchste Stufe über Selbstverwirklichung hinzu."
            },
            traditionelle_werte: {
                label: "Traditionelle Werte",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Bewährtem – Werte und Lebensweisen, die über Generationen weitergegeben wurden."
            },
            moderne_lebensweise: {
                label: "Moderne Lebensweise",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach zeitgemäßen, progressiven Lebensformen – offen für neue Wege des Zusammenlebens."
            },
            konservative_werte: {
                label: "Konservative Werte",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Bewahrung von Tradition – Stabilität durch bewährte Werte und Strukturen."
            },
            progressive_werte: {
                label: "Progressive Werte",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach gesellschaftlichem Fortschritt – Veränderung zum Besseren, soziale Gerechtigkeit."
            },
            kulturelle_tradition: {
                label: "Kulturelle Tradition",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, kulturelle Traditionen zu pflegen – Bräuche, Feste und Rituale der eigenen Kultur."
            },
            offenheit_fuer_neues: {
                label: "Offenheit für Neues",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Offenheit gegenüber neuen Ideen und Erfahrungen – Neugier und Flexibilität.",
                quelle: "Big Five – Offenheit für Erfahrungen",
                quelleDetail: "Offenheit ist ein Persönlichkeitsmerkmal mit Einfluss auf Beziehungskompatibilität."
            },
            umweltverantwortung: {
                label: "Umweltverantwortung",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, Verantwortung für die Umwelt zu übernehmen – nachhaltig leben und handeln."
            },
            nachhaltigkeit: {
                label: "Nachhaltigkeit",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, ressourcenschonend zu leben – für kommende Generationen zu erhalten."
            },
            oekologisches_bewusstsein: {
                label: "Ökologisches Bewusstsein",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, ökologische Zusammenhänge zu beachten – die Natur als Teil des eigenen Wertsystems."
            },
            pragmatismus: {
                label: "Pragmatismus",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach praktischen, funktionierenden Lösungen – Ideologie weniger wichtig als Ergebnis."
            },
            klimaschutz: {
                label: "Klimaschutz",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, aktiv zum Klimaschutz beizutragen – Handeln gegen den Klimawandel."
            },
            ressourcenschonung: {
                label: "Ressourcenschonung",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, sparsam mit Ressourcen umzugehen – weniger verbrauchen, wiederverwenden, recyceln."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PRAKTISCHES LEBEN
            // ═══════════════════════════════════════════════════════════════════════
            ordnungssinn: {
                label: "Ordnungssinn",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Ordnung und Aufgeräumtheit – klare Strukturen im Wohnumfeld.",
                quelle: "Persönlichkeitspsychologie (Gewissenhaftigkeit)",
                quelleDetail: "Ordnungsbedürfnis ist Teil des Persönlichkeitsmerkmals Gewissenhaftigkeit."
            },
            sauberkeit: {
                label: "Sauberkeit",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Reinlichkeit – ein sauberes Zuhause als Wohlfühlfaktor."
            },
            struktur: {
                label: "Struktur",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach klaren Abläufen und Routinen – Vorhersehbarkeit im Alltag."
            },
            chaos_toleranz: {
                label: "Chaos-Toleranz",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, mit Unordnung leben zu können – Flexibilität gegenüber Chaos."
            },
            organisiert_sein: {
                label: "Organisiert sein",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, Dinge geplant und organisiert zu haben – Termine, Aufgaben, Alltag im Griff."
            },
            flexibilitaet_haushalt: {
                label: "Flexibilität im Haushalt",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach flexibler Aufteilung von Haushaltsaufgaben – spontan und situationsabhängig."
            },
            reisen: {
                label: "Reisen",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis zu reisen und neue Orte zu entdecken – Abenteuer und Horizonterweiterung.",
                quelle: "Neugierforschung",
                quelleDetail: "Reisen befriedigt das Bedürfnis nach Neuheit und Stimulation."
            },
            abenteuer: {
                label: "Abenteuer",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach aufregenden Erlebnissen – Nervenkitzel und Unbekanntes."
            },
            neue_orte_entdecken: {
                label: "Neue Orte entdecken",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, unbekannte Orte zu erkunden – Neugier auf fremde Länder und Kulturen."
            },
            zuhause_bleiben: {
                label: "Zuhause bleiben",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, die eigenen vier Wände als Rückzugsort zu genießen – Homebodymentalität."
            },
            urlaub: {
                label: "Urlaub",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach regelmäßigen Auszeiten vom Alltag – Erholung durch Urlaub."
            },
            fernweh: {
                label: "Fernweh",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, in die Ferne zu schweifen – Sehnsucht nach fernen Ländern und Kulturen."
            },
            heimatverbundenheit: {
                label: "Heimatverbundenheit",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Verbundenheit mit der Heimat – Verwurzelung am Geburtsort oder Wohnort."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Lebensplanung
            // ═══════════════════════════════════════════════════════════════════════
            biologisches_muster: {
                "#ID": "#B118",
                label: "Biologisches Muster",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach biologischer Kontinuität – Fortpflanzung und Stammeszugehörigkeit als natürliches Muster.",
                quelle: "Robert M. Pirsig – Qualitätsebenen",
                quelleDetail: "Das biologische Qualitätsmuster repräsentiert evolutionär entstandene Bedürfnisse."
            },
            soziales_muster: {
                "#ID": "#B119",
                label: "Soziales Muster",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach sozialen Strukturen – Institutionen, Traditionen und gesellschaftliche Ordnung.",
                quelle: "Robert M. Pirsig – Lila",
                quelleDetail: "Soziale Muster entstehen aus biologischen und ermöglichen Kultur und Zivilisation."
            },
            statische_stabilitaet: {
                "#ID": "#B120",
                label: "Statische Stabilität",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach festen, verlässlichen Mustern – Vorhersehbarkeit und Struktur im Leben.",
                quelle: "Robert M. Pirsig – Statische vs. Dynamische Qualität",
                quelleDetail: "Statische Qualität bewahrt, was funktioniert und gibt Sicherheit."
            },
            qualitaet_der_fuersorge: {
                "#ID": "#B121",
                label: "Qualität der Fürsorge",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach sorgfältiger, achtsamer Planung und Fürsorge – Verantwortung mit Hingabe.",
                quelle: "Robert M. Pirsig – Care",
                quelleDetail: "Pirsig betont 'Care' (Sorgfalt) als wesentlich für Qualität in allem Handeln."
            },
            familien_rebellion: {
                "#ID": "#B122",
                label: "Familien-Rebellion",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis, gegen traditionelle Familienstrukturen zu rebellieren – eigene Wege der Verbindung finden.",
                quelle: "Osho – Rebellion & Freiheit",
                quelleDetail: "Osho sah die traditionelle Familie oft als Quelle von Konditionierung und Unfreiheit."
            },
            zorba_das_kind: {
                "#ID": "#B123",
                label: "Zorba das Kind",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach weltlicher Freude am Familienleben – Genuss und Präsenz im Hier und Jetzt.",
                quelle: "Osho – Zorba der Buddha",
                quelleDetail: "Die kindliche Qualität von Zorba verbindet Lebensfreude mit Familienglück."
            },
            nicht_anhaften_an_familie: {
                "#ID": "#B124",
                label: "Nicht-Anhaften an Familie",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach Liebe ohne Besitzanspruch – Familie haben, ohne daran zu klammern.",
                quelle: "Osho – Nicht-Anhaftung",
                quelleDetail: "Oshos Konzept der Nicht-Anhaftung erlaubt Liebe ohne die Last des Besitzens."
            },
            bewusste_elternschaft: {
                "#ID": "#B125",
                label: "Bewusste Elternschaft",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach achtsamer, nicht-konditionierender Erziehung – Kinder als eigenständige Wesen ehren.",
                quelle: "Osho – Bewusstes Elternsein",
                quelleDetail: "Kinder begleiten ohne zu formen, ihre natürliche Entfaltung unterstützen."
            },
            commune_statt_kernfamilie: {
                "#ID": "#B126",
                label: "Kommune statt Kernfamilie",
                kategorie: "Lebensplanung",
                kategorieColor: "#10B981",
                definition: "Das Bedürfnis nach Gemeinschaftsleben statt isolierter Kleinfamilie – erweiterte Wahlfamilie.",
                quelle: "Osho – Kommune",
                quelleDetail: "Osho propagierte das Ashram-Leben als Alternative zur einengenden Kernfamilie."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Finanzen & Karriere
            // ═══════════════════════════════════════════════════════════════════════
            gumption: {
                "#ID": "#B139",
                label: "Gumption",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach innerer Motivation und Enthusiasmus – Flow und Begeisterung in der Arbeit.",
                quelle: "Robert M. Pirsig – Gumption Traps",
                quelleDetail: "Gumption ist die psychische Benzin, die uns antreibt – ohne sie bleiben wir stecken."
            },
            qualitaet_der_arbeit: {
                "#ID": "#B140",
                label: "Qualität der Arbeit",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach handwerklicher Exzellenz – Meisterschaft und Perfektion im eigenen Tun.",
                quelle: "Robert M. Pirsig – Zen und die Kunst",
                quelleDetail: "Pirsigs zentrales Thema: Qualität als das, was die Welt verbessert."
            },
            intellektuelles_muster: {
                "#ID": "#B141",
                label: "Intellektuelles Muster",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach konzeptueller Arbeit – Verstehen, Systematisieren und geistige Durchdringung.",
                quelle: "Robert M. Pirsig – Qualitätsebenen",
                quelleDetail: "Intellektuelle Muster stehen über sozialen und ermöglichen kritisches Denken."
            },
            dynamische_evolution: {
                "#ID": "#B142",
                label: "Dynamische Evolution",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach beruflicher Weiterentwicklung – Wachstum, Innovation und Veränderung.",
                quelle: "Robert M. Pirsig – Dynamische Qualität",
                quelleDetail: "Dynamische Qualität treibt Evolution und Kreativität an."
            },
            klassisches_verstehen: {
                "#ID": "#B143",
                label: "Klassisches Verstehen",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach analytischem, strukturiertem Arbeiten – Logik, Systematik und rationales Vorgehen.",
                quelle: "Robert M. Pirsig – Klassisch vs. Romantisch",
                quelleDetail: "Die klassische Sichtweise sieht die zugrundeliegende Form, nicht nur die Oberfläche."
            },
            arbeit_als_meditation: {
                "#ID": "#B144",
                label: "Arbeit als Meditation",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, Arbeit als spirituelle Praxis zu erleben – volle Präsenz und Achtsamkeit im Tun.",
                quelle: "Osho – Meditatives Arbeiten",
                quelleDetail: "Jede Handlung kann Meditation werden, wenn sie mit totaler Bewusstheit geschieht."
            },
            nicht_karriere: {
                "#ID": "#B145",
                label: "Nicht-Karriere",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, Karriere-Ambitionen loszulassen – nicht durch Status oder Position definiert zu sein.",
                quelle: "Osho – Nicht-Ehrgeiz",
                quelleDetail: "Osho sah Karrierestreben als Ego-Spiel, das von wahrem Glück ablenkt."
            },
            zorba_der_unternehmer: {
                "#ID": "#B146",
                label: "Zorba der Unternehmer",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach weltlichem Erfolg verbunden mit Spiritualität – reich an Erfahrung und Geld.",
                quelle: "Osho – Zorba der Buddha",
                quelleDetail: "Zorba genießt das Materielle, Buddha transzendiert es – beides zusammen ist möglich."
            },
            nicht_anhaften_an_geld: {
                "#ID": "#B147",
                label: "Nicht-Anhaften an Geld",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis nach finanzieller Freiheit durch innere Unabhängigkeit – Geld haben ohne davon besessen zu sein.",
                quelle: "Osho – Nicht-Anhaftung",
                quelleDetail: "Geld kann fließen, ohne dass wir uns daran klammern oder es fürchten."
            },
            kreative_selbstverwirklichung: {
                "#ID": "#B148",
                label: "Kreative Selbstverwirklichung",
                kategorie: "Finanzen & Karriere",
                kategorieColor: "#F59E0B",
                definition: "Das Bedürfnis, Arbeit als kreativen Ausdruck zu leben – nicht für Geld, sondern aus innerem Antrieb.",
                quelle: "Osho – Kreativität",
                quelleDetail: "Wahre Kreativität entsteht aus Freude, nicht aus dem Bedürfnis nach Anerkennung."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Kommunikationsstil
            // ═══════════════════════════════════════════════════════════════════════
            romantisches_verstehen: {
                "#ID": "#B166",
                label: "Romantisches Verstehen",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach intuitivem, ganzheitlichem Kommunizieren – Gefühl vor Analyse.",
                quelle: "Robert M. Pirsig – Romantisch vs. Klassisch",
                quelleDetail: "Die romantische Sichtweise erfasst das Ganze, die unmittelbare Erscheinung."
            },
            klassische_klarheit: {
                "#ID": "#B167",
                label: "Klassische Klarheit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach präziser, analytischer Kommunikation – klare Begriffe und logische Struktur.",
                quelle: "Robert M. Pirsig – Klassisches Denken",
                quelleDetail: "Klassisches Denken zerlegt und analysiert, um zu verstehen."
            },
            dialektik: {
                "#ID": "#B168",
                label: "Dialektik",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach philosophischem Dialog – Wahrheitsfindung durch These, Antithese, Synthese.",
                quelle: "Robert M. Pirsig – Sokratisches Gespräch",
                quelleDetail: "Pirsig nutzt die dialektische Methode, um Qualität zu erkunden."
            },
            qualitaets_ausdruck: {
                "#ID": "#B169",
                label: "Qualitäts-Ausdruck",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach qualitativ hochwertigem Ausdruck – Eloquenz, Präzision und sprachliche Schönheit.",
                quelle: "Robert M. Pirsig – Qualität",
                quelleDetail: "Qualität zeigt sich auch in der Art, wie wir kommunizieren."
            },
            care_im_gespraech: {
                "#ID": "#B170",
                label: "Care im Gespräch",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach sorgfältiger, achtsamer Kommunikation – mit Hingabe und Aufmerksamkeit sprechen.",
                quelle: "Robert M. Pirsig – Care",
                quelleDetail: "Sorgfalt im Gespräch bedeutet, wirklich präsent und aufmerksam zu sein."
            },
            schweigen_statt_worte: {
                "#ID": "#B171",
                label: "Schweigen statt Worte",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach Stille als Kommunikation – das Ungesagte als tiefste Verständigung.",
                quelle: "Osho – Stille",
                quelleDetail: "Osho sprach viel über Stille als das eigentliche Medium der Wahrheit."
            },
            radikale_ehrlichkeit: {
                "#ID": "#B172",
                label: "Radikale Ehrlichkeit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach kompromissloser Wahrheit – keine Höflichkeitslügen, authentischer Ausdruck.",
                quelle: "Osho – Authentizität",
                quelleDetail: "Osho forderte radikale Ehrlichkeit, auch wenn sie unbequem ist."
            },
            humorvolle_leichtigkeit: {
                "#ID": "#B173",
                label: "Humorvolle Leichtigkeit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach Lachen und spielerischer Kommunikation – Witz statt Schwere.",
                quelle: "Osho – Humor & Lachen",
                quelleDetail: "Osho betonte Lachen als spirituelle Praxis und Zeichen von Freiheit."
            },
            paradoxe_weisheit: {
                "#ID": "#B174",
                label: "Paradoxe Weisheit",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach paradoxer Kommunikation – Zen-Koans, Widersprüche als Weg zur Erkenntnis.",
                quelle: "Osho – Zen",
                quelleDetail: "Paradoxe durchbrechen den analytischen Verstand und öffnen für tiefere Einsicht."
            },
            herz_statt_kopf: {
                "#ID": "#B175",
                label: "Herz statt Kopf",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis nach emotionaler statt rationaler Kommunikation – aus dem Herzen sprechen.",
                quelle: "Osho – Herz",
                quelleDetail: "Osho sah den Kopf als Hindernis für wahre Kommunikation, das Herz als Brücke."
            },
            authentischer_ausdruck: {
                "#ID": "#B176",
                label: "Authentischer Ausdruck",
                kategorie: "Kommunikationsstil",
                kategorieColor: "#3B82F6",
                definition: "Das Bedürfnis, ungefiltert zu kommunizieren – keine soziale Maske, echte Gefühle zeigen.",
                quelle: "Osho – Authentizität",
                quelleDetail: "Authentischer Ausdruck erfordert Mut und die Bereitschaft, verletzlich zu sein."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Soziales Leben
            // ═══════════════════════════════════════════════════════════════════════
            soziale_qualitaet: {
                "#ID": "#B194",
                label: "Soziale Qualität",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach hochwertigen sozialen Beziehungen – Tiefe statt Breite, Qualität vor Quantität.",
                quelle: "Robert M. Pirsig – Qualität",
                quelleDetail: "Qualität gilt auch für Beziehungen – wenige tiefe sind wertvoller als viele oberflächliche."
            },
            tribe_muster: {
                "#ID": "#B195",
                label: "Tribe-Muster",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Stammeszugehörigkeit – Teil einer Gruppe mit geteilter Identität und Werten.",
                quelle: "Robert M. Pirsig – Soziale Muster",
                quelleDetail: "Das Stammesmuster ist eines der ursprünglichsten sozialen Bedürfnisse."
            },
            intellektuelle_gemeinschaft: {
                "#ID": "#B196",
                label: "Intellektuelle Gemeinschaft",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Gleichgesinnten für geistigen Austausch – philosophische Gespräche und geteilte Neugier.",
                quelle: "Robert M. Pirsig – Intellektuelle Ebene",
                quelleDetail: "Intellektuelle Gemeinschaft transzendiert bloße soziale Zugehörigkeit."
            },
            statische_sozialstrukturen: {
                "#ID": "#B197",
                label: "Statische Sozialstrukturen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach festen sozialen Rollen und Hierarchien – Klarheit durch Struktur.",
                quelle: "Robert M. Pirsig – Statische Muster",
                quelleDetail: "Statische Strukturen geben Orientierung, können aber auch einengen."
            },
            sannyas_gemeinschaft: {
                "#ID": "#B198",
                label: "Sannyas-Gemeinschaft",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach spiritueller Gemeinschaft – Menschen auf dem gleichen inneren Weg.",
                quelle: "Osho – Sannyas",
                quelleDetail: "Sannyas bedeutet bei Osho nicht Weltentsagung, sondern bewusstes Leben in Gemeinschaft."
            },
            rebellion_gegen_gesellschaft: {
                "#ID": "#B199",
                label: "Rebellion gegen Gesellschaft",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, gesellschaftliche Normen in Frage zu stellen – Nonkonformismus als Freiheit.",
                quelle: "Osho – Rebellion",
                quelleDetail: "Osho unterschied zwischen Reaktion (gegen etwas) und Rebellion (für Freiheit)."
            },
            einsamkeit_in_menge: {
                "#ID": "#B200",
                label: "Einsamkeit in Menge",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, auch in Gemeinschaft bei sich selbst zu bleiben – allein und doch verbunden.",
                quelle: "Osho – Aloneness",
                quelleDetail: "Osho unterschied zwischen Einsamkeit (loneliness) und Alleinsein (aloneness) – letzteres ist positiv."
            },
            celebration_mit_anderen: {
                "#ID": "#B201",
                label: "Celebration mit Anderen",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis, gemeinsam zu feiern – Freude, Tanz und Ekstase in der Gruppe.",
                quelle: "Osho – Celebration",
                quelleDetail: "Oshos Ashrams waren für ihre Feiern und ekstatischen Meditationen bekannt."
            },
            keine_freundschaft_besitz: {
                "#ID": "#B202",
                label: "Keine Freundschafts-Besitz",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Freundschaft ohne Besitzanspruch – fließende, nicht-anhaftende Verbindungen.",
                quelle: "Osho – Nicht-Anhaftung",
                quelleDetail: "Liebe ohne Besitzdenken gilt für alle Beziehungen, nicht nur romantische."
            },
            tantra_gruppe: {
                "#ID": "#B203",
                label: "Tantra-Gruppe",
                kategorie: "Soziales Leben",
                kategorieColor: "#8B5CF6",
                definition: "Das Bedürfnis nach Gruppen-Intimität und energetischem Austausch – Verbindung jenseits des Individuellen.",
                quelle: "Osho – Tantra",
                quelleDetail: "Oshos Tantra-Gruppen erforschten Intimität und Energie in geschütztem Rahmen."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Intimität & Romantik
            // ═══════════════════════════════════════════════════════════════════════
            biologische_anziehung: {
                label: "Biologische Anziehung",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach körperlicher Chemie und instinktiver Anziehung – Pheromone und Biologie.",
                quelle: "Robert M. Pirsig – Biologische Muster",
                quelleDetail: "Biologische Anziehung ist ein grundlegendes Muster, das intellektuell nicht vollständig erklärbar ist."
            },
            intellektuelle_verbindung: {
                label: "Intellektuelle Verbindung",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach geistigem Match – gemeinsame Wellenlänge im Denken und in Interessen.",
                quelle: "Robert M. Pirsig – Intellektuelle Ebene",
                quelleDetail: "Intellektuelle Verbindung ergänzt biologische Anziehung um eine tiefere Dimension."
            },
            qualitaet_der_beruehrung: {
                label: "Qualität der Berührung",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach achtsamer, präsenter Berührung – Qualität statt Routine.",
                quelle: "Robert M. Pirsig – Care",
                quelleDetail: "Sorgfalt in der Berührung macht den Unterschied zwischen mechanisch und bedeutsam."
            },
            dynamische_liebe: {
                label: "Dynamische Liebe",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach sich entwickelnder, wachsender Liebe – nicht statisch, sondern lebendig.",
                quelle: "Robert M. Pirsig – Dynamische Qualität",
                quelleDetail: "Dynamische Liebe überrascht, wächst und erneuert sich ständig."
            },
            care_in_intimitaet: {
                label: "Care in Intimität",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach Sorgfalt und Aufmerksamkeit in intimen Momenten – Präzision und Hingabe.",
                quelle: "Robert M. Pirsig – Care",
                quelleDetail: "Intimität mit Care bedeutet volle Aufmerksamkeit und Präsenz."
            },
            sex_als_meditation: {
                label: "Sex als Meditation",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach tantrischer Sexualität – Sex als spirituelle Praxis und Meditation.",
                quelle: "Osho – Tantra",
                quelleDetail: "Osho lehrte Sex als Tor zur Meditation, nicht als etwas zu Unterdrückendes."
            },
            liebe_ohne_beziehung: {
                label: "Liebe ohne Beziehung",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, zu lieben ohne Besitz und Erwartungen – Liebe als Zustand, nicht als Vertrag.",
                quelle: "Osho – Unconditional Love",
                quelleDetail: "Osho kritisierte Beziehungen, die auf Besitz statt auf Freiheit basieren."
            },
            orgastisches_leben: {
                label: "Orgastisches Leben",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach totaler körperlicher Präsenz – der ganze Körper als Instrument der Ekstase.",
                quelle: "Osho – Körper",
                quelleDetail: "Osho betonte die Heiligkeit des Körpers und voller körperlicher Erfahrung."
            },
            nicht_anhaften_an_partner: {
                label: "Nicht-Anhaften an Partner",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach Freiheit in der Beziehung – lieben ohne zu klammern.",
                quelle: "Osho – Nicht-Anhaftung",
                quelleDetail: "Wahre Liebe hält nicht fest, sondern gibt Flügel."
            },
            hier_und_jetzt_intimitaet: {
                label: "Hier-und-Jetzt-Intimität",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach völliger Präsenz in intimen Momenten – keine Vergangenheit, keine Zukunft.",
                quelle: "Osho – Präsenz",
                quelleDetail: "Nur im Jetzt ist echte Intimität möglich."
            },
            polyamore_energie: {
                label: "Polyamore Energie",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis, Liebe und Intimität mit mehreren Menschen zu teilen – Freiheit von Monogamie-Normen.",
                quelle: "Osho – Freie Liebe",
                quelleDetail: "Osho stellte Monogamie als soziale Konditionierung in Frage."
            },
            wildheit_und_zartheit: {
                label: "Wildheit und Zartheit",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach beiden Polen – sowohl wild und leidenschaftlich als auch sanft und zärtlich.",
                quelle: "Osho – Polaritäten",
                quelleDetail: "Osho lehrte, alle Polaritäten in sich zu vereinen."
            },
            meditation_zu_zweit: {
                label: "Meditation zu zweit",
                kategorie: "Intimität & Romantik",
                kategorieColor: "#EC4899",
                definition: "Das Bedürfnis nach gemeinsamer Stille und energetischer Verbindung – zusammen meditieren.",
                quelle: "Osho – Meditation",
                quelleDetail: "Gemeinsame Meditation kann tiefe Verbundenheit ohne Worte schaffen."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Werte & Haltungen
            // ═══════════════════════════════════════════════════════════════════════
            qualitaet_als_gott: {
                label: "Qualität als Gott",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, Qualität als höchsten Wert zu sehen – eine säkulare Spiritualität.",
                quelle: "Robert M. Pirsig – Metaphysik der Qualität",
                quelleDetail: "Pirsig schlägt Qualität als vereinendes Prinzip vor, das Wissenschaft und Spiritualität verbindet."
            },
            rationaler_mystizismus: {
                label: "Rationaler Mystizismus",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, Logik und Spiritualität zu verbinden – Verstand und Transzendenz.",
                quelle: "Robert M. Pirsig – Zen",
                quelleDetail: "Pirsigs Werk vereint analytisches Denken mit mystischer Erfahrung."
            },
            aristotelische_vernunft: {
                label: "Aristotelische Vernunft",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach logischem Denken und Kausalität – rationale Welterklärung.",
                quelle: "Robert M. Pirsig – Aristoteles-Kritik",
                quelleDetail: "Pirsig kritisiert, wie aristotelische Logik Qualität nicht erfassen kann."
            },
            platonische_ideen: {
                label: "Platonische Ideen",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach absoluten Werten und ewigen Wahrheiten – Idealismus.",
                quelle: "Robert M. Pirsig – Platon",
                quelleDetail: "Pirsig setzt sich mit Platon auseinander, um seine eigene Qualitätsmetaphysik zu entwickeln."
            },
            buddhistische_achtsamkeit: {
                label: "Buddhistische Achtsamkeit",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Präsenz und Nicht-Dualität – Zen als Lebensweg.",
                quelle: "Robert M. Pirsig – Zen",
                quelleDetail: "Zen durchzieht Pirsigs Werk als Gegenpol zum rein analytischen Denken."
            },
            religionslosigkeit: {
                label: "Religionslosigkeit",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, frei von organisierten Religionen zu sein – Spiritualität ohne Dogma.",
                quelle: "Osho – Anti-Religion",
                quelleDetail: "Osho kritisierte alle organisierten Religionen als Hindernisse für wahre Spiritualität."
            },
            eigene_wahrheit: {
                label: "Eigene Wahrheit",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, die eigene Wahrheit selbst zu finden – keine übernommenen Glaubenssätze.",
                quelle: "Osho – Individualität",
                quelleDetail: "Osho betonte, dass jeder seine eigene Wahrheit finden muss."
            },
            zen_paradox: {
                label: "Zen-Paradox",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Widersprüchen und Koans – den Verstand durch Paradoxe transzendieren.",
                quelle: "Osho – Zen",
                quelleDetail: "Osho nutzte Zen-Geschichten und Paradoxe, um den analytischen Verstand zu überwinden."
            },
            tantra_als_weg: {
                label: "Tantra als Weg",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Bejahung von Körper und Sinnlichkeit als spirituellem Weg – keine Askese.",
                quelle: "Osho – Tantra",
                quelleDetail: "Tantra sagt Ja zum Leben, zum Körper, zur Sexualität als Tor zum Göttlichen."
            },
            politische_rebellion: {
                label: "Politische Rebellion",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, politische Systeme und Machtstrukturen in Frage zu stellen – Anarchie des Geistes.",
                quelle: "Osho – Politik-Kritik",
                quelleDetail: "Osho lehnte alle politischen Systeme als Formen der Unterdrückung ab."
            },
            individueller_anarchismus: {
                label: "Individueller Anarchismus",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach radikaler Freiheit – keine Autorität außer dem eigenen Bewusstsein.",
                quelle: "Osho – Freiheit",
                quelleDetail: "Wahre Freiheit ist innerlich und unabhängig von äußeren Umständen."
            },
            leben_als_kunst: {
                label: "Leben als Kunst",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis, das Leben selbst als kreatives Kunstwerk zu gestalten – ästhetisch, nicht moralisch.",
                quelle: "Osho – Kreativität",
                quelleDetail: "Das Leben selbst ist die größte Leinwand für kreative Entfaltung."
            },
            celebration_statt_gebet: {
                label: "Celebration statt Gebet",
                kategorie: "Werte & Haltungen",
                kategorieColor: "#6366F1",
                definition: "Das Bedürfnis nach Freude statt Ernsthaftigkeit in der Spiritualität – Feiern statt Bitten.",
                quelle: "Osho – Celebration",
                quelleDetail: "Osho ersetzte frommes Gebet durch ekstatische Feier des Lebens."
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIRSIG & OSHO ERWEITERUNGEN - Praktisches Leben
            // ═══════════════════════════════════════════════════════════════════════
            motorrad_pflege: {
                label: "Motorrad-Pflege",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach handwerklicher Sorgfalt und Technikverständnis – Wartung als Meditation.",
                quelle: "Robert M. Pirsig – Motorrad",
                quelleDetail: "Das Motorrad ist Pirsigs Metapher für die Verbindung von Technik und Philosophie."
            },
            gumption_im_alltag: {
                label: "Gumption im Alltag",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Motivation und Flow in täglichen Aufgaben – Enthusiasmus bewahren.",
                quelle: "Robert M. Pirsig – Gumption",
                quelleDetail: "Gumption im Alltag verhindert, dass Routinen zur Last werden."
            },
            stuck_vermeiden: {
                label: "Stuck vermeiden",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, nicht festzustecken – Flexibilität und Kreativität bei Hindernissen.",
                quelle: "Robert M. Pirsig – Gumption Traps",
                quelleDetail: "Pirsig beschreibt Fallen, die unsere Motivation blockieren, und wie man sie vermeidet."
            },
            klassische_ordnung: {
                label: "Klassische Ordnung",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Systematik und Checklisten – Struktur und rationale Organisation.",
                quelle: "Robert M. Pirsig – Klassisch",
                quelleDetail: "Der klassische Ansatz analysiert und strukturiert für Effizienz."
            },
            romantisches_chaos: {
                label: "Romantisches Chaos",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach spontanem, intuitivem Alltag – Gegen-Ordnung, kreatives Durcheinander.",
                quelle: "Robert M. Pirsig – Romantisch",
                quelleDetail: "Der romantische Ansatz folgt dem Gefühl, nicht dem Plan."
            },
            qualitaets_werkzeug: {
                label: "Qualitäts-Werkzeug",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach gutem Werkzeug und richtiger Ausrüstung – Qualität in den Mitteln.",
                quelle: "Robert M. Pirsig – Werkzeug",
                quelleDetail: "Gutes Werkzeug ermöglicht gute Arbeit – ein zentrales Thema bei Pirsig."
            },
            achtsamkeit_im_detail: {
                label: "Achtsamkeit im Detail",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Präzision und Perfektion in kleinen Dingen – Sorgfalt im Alltäglichen.",
                quelle: "Robert M. Pirsig – Care",
                quelleDetail: "Qualität zeigt sich im Detail, in der Aufmerksamkeit für das Kleine."
            },
            meditation_im_alltag: {
                label: "Meditation im Alltag",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, alltägliche Tätigkeiten meditativ zu verrichten – Kochen, Putzen, Gehen als Praxis.",
                quelle: "Osho – Alltagsmeditation",
                quelleDetail: "Osho lehrte, dass jede Tätigkeit zur Meditation werden kann."
            },
            gesundheit_durch_bewusstsein: {
                label: "Gesundheit durch Bewusstsein",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach natürlicher Gesundheit durch Bewusstheit – Körperbewusstsein statt Pillen.",
                quelle: "Osho – Körper",
                quelleDetail: "Bewusstsein heilt – der Körper weiß, was er braucht, wenn wir ihm zuhören."
            },
            dynamische_meditation: {
                label: "Dynamische Meditation",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach körperlicher Bewegung als Meditation – Oshos aktive Meditationstechniken.",
                quelle: "Osho – Dynamische Meditation",
                quelleDetail: "Oshos bekannteste Technik: Kathartische Bewegung führt zu Stille."
            },
            vipassana_im_leben: {
                label: "Vipassana im Leben",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis, im Alltag beobachtend und urteilsfrei zu sein – Achtsamkeit in jeder Situation.",
                quelle: "Osho – Vipassana",
                quelleDetail: "Beobachten ohne Urteilen, im Alltag integriert, nicht nur auf dem Kissen."
            },
            natuerliches_leben: {
                label: "Natürliches Leben",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach naturnahem, einfachem Leben – Bio-Ernährung, Naturkontakt, Reduktion.",
                quelle: "Osho – Natürlichkeit",
                quelleDetail: "Zurück zur Natur, weg von künstlicher Komplexität."
            },
            lachen_therapie: {
                label: "Lachen-Therapie",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach Humor als Heilung – Lachen als tägliche Medizin.",
                quelle: "Osho – Lachen",
                quelleDetail: "Osho integrierte Lachen als spirituelle Praxis in viele seiner Meditationen."
            },
            no_mind: {
                label: "No-Mind",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach gedankenfreien Momenten im Alltag – Stille im Kopf, Präsenz ohne Denken.",
                quelle: "Osho – No-Mind",
                quelleDetail: "No-Mind ist der Zustand jenseits des Denkens, aber mit voller Wachheit."
            },
            zorba_der_geniesser: {
                label: "Zorba der Genießer",
                kategorie: "Praktisches Leben",
                kategorieColor: "#14B8A6",
                definition: "Das Bedürfnis nach sinnlichem Genuss – gutes Essen, Trinken, Komfort und Lebensfreude.",
                quelle: "Osho – Zorba",
                quelleDetail: "Zorba steht für die volle Bejahung des weltlichen Lebens in all seiner Sinnlichkeit."
            }
        };

        /**
         * Öffnet das Bedürfnis-Definition Modal
         * @param {string} needId - Die ID des Bedürfnisses
         * @param {string} context - Kontext: 'resonance' für Storytelling-Modal, 'info' für Standard (default)
         * @param {object} resonanceData - Optionale Resonanz-Daten {wert1, wert2, ichName, partnerName}
         */
        function openNeedDefinitionModal(needId, context, resonanceData) {
            console.log('[NEEDS] openNeedDefinitionModal called with:', needId, 'context:', context);
            const modal = document.getElementById('needDefinitionModal');
            const body = document.getElementById('needDefinitionModalBody');
            const title = document.getElementById('needDefinitionModalTitle');

            if (!modal || !body) {
                console.error('[NEEDS] Modal elements not found! modal:', modal, 'body:', body);
                return;
            }

            // Definition suchen
            const def = needDefinitions[needId];
            if (!def) {
                body.innerHTML = '<p style="color: var(--text-muted);">Keine Definition verfügbar.</p>';
                modal.classList.add('active');
                return;
            }

            // Titel setzen
            title.textContent = def.label;

            // Kategorie-Key für PerspektivenModal ermitteln
            const kategorieKey = def.kategorie ? def.kategorie.toLowerCase()
                .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
                .replace(/\s+&\s+/g, '_').replace(/\s+/g, '_') : '';

            // Erweiterte Definition mit key für PerspektivenModal
            const extendedDef = {
                ...def,
                key: needId,
                id: def['#ID'] || ''
            };

            // PerspektivenModal verwenden für den Inhalt
            if (typeof PerspektivenModal !== 'undefined') {
                // Kontext-abhängiges Rendering
                if (context === 'resonance' && resonanceData) {
                    // Storytelling-Resonanz-Modal
                    body.innerHTML = PerspektivenModal.renderResonanceModal(extendedDef, kategorieKey, resonanceData);
                } else {
                    // Standard Info-Modal
                    body.innerHTML = PerspektivenModal.renderNeedModal(extendedDef, kategorieKey);
                }
            } else {
                // Fallback: Alte Darstellung
                const quelleHtml = def.quelle ? `
                    <div style="padding: 12px; background: rgba(16,185,129,0.08); border-radius: 8px; border: 1px solid rgba(16,185,129,0.2);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="font-size: 14px;">📚</span>
                            <strong style="font-size: 12px; color: #10B981;">Quelle & Begründung</strong>
                        </div>
                        <p style="font-size: 12px; color: var(--text-primary); margin: 0 0 8px 0; font-weight: 500;">${def.quelle}</p>
                        ${def.quelleDetail ? `<p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">${def.quelleDetail}</p>` : ''}
                    </div>
                ` : '';

                body.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="width: 12px; height: 12px; border-radius: 50%; background: ${def.kategorieColor};"></span>
                            <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">${def.kategorie}</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; border-left: 3px solid ${def.kategorieColor};">
                            <p style="font-size: 14px; line-height: 1.7; color: var(--text-primary); margin: 0;">${def.definition}</p>
                        </div>
                        ${quelleHtml}
                        <div style="padding: 12px; background: rgba(139,92,246,0.08); border-radius: 8px; border: 1px solid rgba(139,92,246,0.2);">
                            <strong style="font-size: 12px; color: #8B5CF6;">Gewaltfreie Kommunikation (GFK)</strong>
                            <p style="font-size: 11px; color: var(--text-secondary); margin: 8px 0 0 0; line-height: 1.5;">
                                Das Bedürfnis nach <strong>${def.label}</strong> ist universell und frei von Bewertung.
                            </p>
                        </div>
                    </div>
                `;
            }

            modal.classList.add('active');
        }

        /**
         * Schließt das Bedürfnis-Definition Modal
         */
        function closeNeedDefinitionModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('needDefinitionModal');
            if (modal) {
                modal.classList.remove('active');
            }
        }

        /**
         * Holt Resonanz-Daten für ein Bedürfnis aus dem aktuellen Matching
         * @param {string} needId - Die ID des Bedürfnisses
         * @returns {object|null} Resonanz-Daten {wert1, wert2, ichName, partnerName} oder null
         */
        function getResonanceDataForNeed(needId) {
            if (!lastGfkMatchingResult || !lastGfkMatchingResult.details) {
                return null;
            }

            // In allen Kategorien suchen (uebereinstimmend, komplementaer, konflikt)
            const allNeeds = [
                ...(lastGfkMatchingResult.details.uebereinstimmend || []),
                ...(lastGfkMatchingResult.details.komplementaer || []),
                ...(lastGfkMatchingResult.details.konflikt || [])
            ];

            const found = allNeeds.find(n => n.id === needId);
            if (!found) return null;

            // Namen holen
            const ichName = archetypeDescriptions[currentArchetype]?.name || 'Du';
            const partnerName = archetypeDescriptions[selectedPartner]?.name || 'Partner';

            return {
                wert1: found.wert1 || 0,
                wert2: found.wert2 || 0,
                ichName: ichName,
                partnerName: partnerName
            };
        }

        /**
         * Öffnet das Bedürfnis-Modal im Resonanz-Modus (falls Daten verfügbar)
         * Diese Funktion wird von der AttributeSummaryCard aufgerufen
         * @param {string} needId - Die ID des Bedürfnisses
         */
        function openNeedWithResonance(needId) {
            const resonanceData = getResonanceDataForNeed(needId);
            if (resonanceData) {
                openNeedDefinitionModal(needId, 'resonance', resonanceData);
            } else {
                // Fallback: Standard Info-Modal
                openNeedDefinitionModal(needId);
            }
        }

        /**
         * Öffnet das GFK-Begriffserklärung Modal
         */
        function openGfkExplanationModal(event) {
            if (event) event.stopPropagation();
            const modal = document.getElementById('gfkExplanationModal');
            if (modal) {
                modal.classList.add('active');
            }
        }

        /**
         * Schließt das GFK-Begriffserklärung Modal
         */
        function closeGfkExplanationModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('gfkExplanationModal');
            if (modal) {
                modal.classList.remove('active');
            }
        }

        /**
         * Öffnet das Paarung-Begriffserklärung Modal
         */
        function openPaarungExplanationModal(event) {
            if (event) event.stopPropagation();
            const modal = document.getElementById('paarungExplanationModal');
            if (modal) {
                modal.classList.add('active');
            }
        }

        /**
         * Schließt das Paarung-Begriffserklärung Modal
         */
        function closePaarungExplanationModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('paarungExplanationModal');
            if (modal) {
                modal.classList.remove('active');
            }
        }

        /**
         * Öffnet das Attribut-Definition Modal (für Profile-Review Attribute)
         * @param {string} attrId - Die ID des Attributs (z.B. 'pr-kinder')
         */
        function openAttributeDefinitionModal(attrId) {
            const modal = document.getElementById('attributeDefinitionModal');
            const body = document.getElementById('attributeDefinitionModalBody');
            const title = document.getElementById('attributeDefinitionModalTitle');

            if (!modal || !body) return;

            // Attribut-Definition mit Kategorie suchen
            const attr = typeof ProfileReviewConfig !== 'undefined'
                ? ProfileReviewConfig.findAttributeWithCategory(attrId)
                : null;

            if (!attr) {
                body.innerHTML = '<p style="color: var(--text-muted);">Keine Definition verfügbar.</p>';
                modal.classList.add('active');
                return;
            }

            // Titel setzen
            title.textContent = attr.label;

            // Optionen als Badges formatieren
            const optionsBadges = (attr.options || []).map(opt =>
                `<span style="display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.08); border-radius: 12px; font-size: 11px; color: var(--text-secondary);">${opt}</span>`
            ).join(' ');

            // Inhalt erstellen (ähnlich wie needDefinitionModal)
            body.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- Kategorie-Badge -->
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 12px; height: 12px; border-radius: 50%; background: ${attr.kategorieColor};"></span>
                        <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">${attr.kategorie}</span>
                    </div>

                    <!-- Beschreibung -->
                    <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; border-left: 3px solid ${attr.kategorieColor};">
                        <p style="font-size: 14px; line-height: 1.7; color: var(--text-primary); margin: 0;">${attr.description || 'Keine Beschreibung verfügbar.'}</p>
                    </div>

                    <!-- Optionen -->
                    <div style="padding: 12px; background: rgba(139,92,246,0.08); border-radius: 8px; border: 1px solid rgba(139,92,246,0.2);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                            <strong style="font-size: 12px; color: #8B5CF6;">Mögliche Ausprägungen</strong>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${optionsBadges}
                        </div>
                    </div>

                    <!-- Beziehungs-Bezug -->
                    <div style="padding: 12px; background: rgba(232,67,147,0.08); border-radius: 8px; border: 1px solid rgba(232,67,147,0.2);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                            <strong style="font-size: 12px; color: #E84393;">Paarung</strong>
                            <button onclick="openPaarungExplanationModal(event)" style="background: none; border: none; cursor: pointer; color: #E84393; font-size: 14px; padding: 2px 6px; border-radius: 4px; transition: background 0.2s;" title="Was bedeutet Paarung?">ⓘ</button>
                        </div>
                        <p style="font-size: 11px; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                            Unterschiedliche Präferenzen bei <strong>${attr.label}</strong> können Kompromisse erfordern – offene Kommunikation hilft dabei, gemeinsame Lösungen zu finden.
                        </p>
                    </div>
                </div>
            `;

            modal.classList.add('active');
        }

        /**
         * Schließt das Attribut-Definition Modal
         */
        function closeAttributeDefinitionModal(event) {
            if (event && event.target !== event.currentTarget) return;
            const modal = document.getElementById('attributeDefinitionModal');
            if (modal) {
                modal.classList.remove('active');
            }
        }
        window.openAttributeDefinitionModal = openAttributeDefinitionModal;
        window.closeAttributeDefinitionModal = closeAttributeDefinitionModal;

        // Aktueller Tab für das vollständige Modal
        let needsFullModalCurrentTab = 'gemeinsam';
        // Sortierung: 'duo' oder 'ra', und Richtung: 'asc' oder 'desc'
        let needsFullModalSortBy = null;
        let needsFullModalSortDir = 'desc';

        /**
         * Öffnet das vollständige Bedürfnis-Modal mit Toggle
         */
        function openNeedsFullModal() {
            needsFullModalCurrentTab = 'gemeinsam';
            needsFullModalSortBy = null;
            needsFullModalSortDir = 'desc';
            renderNeedsFullModal();
        }

        /**
         * Wechselt den Tab im vollständigen Modal
         */
        function switchNeedsFullModalTab(tab) {
            needsFullModalCurrentTab = tab;
            needsFullModalSortBy = null;
            needsFullModalSortDir = 'desc';
            renderNeedsFullModal();
        }

        /**
         * Sortiert die Bedürfnis-Liste nach DUO oder RA Werten
         * @param {string} column - 'duo' oder 'ra'
         */
        function sortNeedsFullModal(column) {
            if (needsFullModalSortBy === column) {
                // Toggle direction if same column
                needsFullModalSortDir = needsFullModalSortDir === 'desc' ? 'asc' : 'desc';
            } else {
                // New column, start with descending
                needsFullModalSortBy = column;
                needsFullModalSortDir = 'desc';
            }
            renderNeedsFullModal();
        }

        /**
         * Rendert das vollständige Bedürfnis-Modal
         */
        function renderNeedsFullModal() {
            const modal = document.getElementById('needsCompareModal');
            const body = document.getElementById('needsCompareModalBody');
            const title = document.getElementById('needsCompareModalTitle');

            if (!modal || !body) return;

            // Matching-Daten holen
            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');

            if (!ichArchetyp || !partnerArchetyp || typeof GfkBeduerfnisse === 'undefined') {
                body.innerHTML = '<p style="color: var(--text-muted);">Keine Daten verfügbar.</p>';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                return;
            }

            const matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
            const ichName = archetypeDescriptions[currentArchetype]?.name || 'ICH';
            const partnerName = archetypeDescriptions[selectedPartner]?.name || 'Partner';

            // Titel setzen
            title.textContent = 'Bedürfnis-Vergleich';

            // Vollständige Listen aus details holen
            const type = needsFullModalCurrentTab;
            let items;
            if (type === 'gemeinsam') {
                // Combine uebereinstimmend + komplementaer for "gemeinsam" tab
                const uebereinstimmend = matching.details?.uebereinstimmend || [];
                const komplementaer = matching.details?.komplementaer || [];
                items = [...uebereinstimmend, ...komplementaer];
                // Sort by average importance if not already sorted
                if (items.length > 0 && !needsFullModalSortBy) {
                    items.sort((a, b) => ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2));
                }
                // Fallback
                if (items.length === 0) items = matching.topUebereinstimmungen || [];
            } else {
                items = matching.details?.konflikt || matching.topKonflikte || [];
            }

            // Sortieren falls aktiv
            if (needsFullModalSortBy && items.length > 0) {
                items = [...items].sort((a, b) => {
                    let valA, valB;
                    if (needsFullModalSortBy === 'duo') {
                        valA = a.wert1 || 0;
                        valB = b.wert1 || 0;
                    } else if (needsFullModalSortBy === 'diff') {
                        valA = Math.abs((a.wert1 || 0) - (a.wert2 || 0));
                        valB = Math.abs((b.wert1 || 0) - (b.wert2 || 0));
                    } else {
                        valA = a.wert2 || 0;
                        valB = b.wert2 || 0;
                    }
                    return needsFullModalSortDir === 'desc' ? valB - valA : valA - valB;
                });
            }

            // Toggle-Button HTML
            const toggleHtml = `
                <div style="display: flex; gap: 0; margin-bottom: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 4px;">
                    <button onclick="switchNeedsFullModalTab('gemeinsam')" style="flex: 1; padding: 10px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; ${type === 'gemeinsam' ? 'background: #22c55e; color: white;' : 'background: transparent; color: var(--text-muted);'}">
                        Gemeinsame & Kompatible
                    </button>
                    <button onclick="switchNeedsFullModalTab('unterschiedlich')" style="flex: 1; padding: 10px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; ${type === 'unterschiedlich' ? 'background: #ef4444; color: white;' : 'background: transparent; color: var(--text-muted);'}">
                        Unterschiedliche Prioritäten
                    </button>
                </div>
            `;

            // Sort-Icons
            const duoSortIcon = needsFullModalSortBy === 'duo'
                ? (needsFullModalSortDir === 'desc' ? '▼' : '▲')
                : '⇅';
            const diffSortIcon = needsFullModalSortBy === 'diff'
                ? (needsFullModalSortDir === 'desc' ? '▼' : '▲')
                : '⇅';
            const raSortIcon = needsFullModalSortBy === 'ra'
                ? (needsFullModalSortDir === 'desc' ? '▼' : '▲')
                : '⇅';
            const duoActive = needsFullModalSortBy === 'duo';
            const diffActive = needsFullModalSortBy === 'diff';
            const raActive = needsFullModalSortBy === 'ra';

            // Header mit Namen und Sortier-Buttons
            const headerHtml = `
                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <button onclick="sortNeedsFullModal('duo')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: ${duoActive ? 'rgba(34, 197, 94, 0.15)' : 'transparent'}; border: 1px solid ${duoActive ? 'rgba(34, 197, 94, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s;">
                        <span style="font-weight: 600; color: var(--success); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${ichName}</span>
                        <span style="color: ${duoActive ? 'var(--success)' : 'var(--text-muted)'}; font-size: 10px;">${duoSortIcon}</span>
                    </button>
                    <button onclick="sortNeedsFullModal('diff')" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: ${diffActive ? 'rgba(234, 179, 8, 0.15)' : 'transparent'}; border: 1px solid ${diffActive ? 'rgba(234, 179, 8, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s; min-width: 60px;">
                        <span style="font-weight: 600; color: var(--warning, #eab308); font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Diff</span>
                        <span style="color: ${diffActive ? 'var(--warning, #eab308)' : 'var(--text-muted)'}; font-size: 10px;">${diffSortIcon}</span>
                    </button>
                    <button onclick="sortNeedsFullModal('ra')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: ${raActive ? 'rgba(239, 68, 68, 0.15)' : 'transparent'}; border: 1px solid ${raActive ? 'rgba(239, 68, 68, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s;">
                        <span style="font-weight: 600; color: var(--danger); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${partnerName}</span>
                        <span style="color: ${raActive ? 'var(--danger)' : 'var(--text-muted)'}; font-size: 10px;">${raSortIcon}</span>
                    </button>
                </div>
            `;

            let listHtml = '';
            if (items.length === 0) {
                listHtml = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Keine Einträge vorhanden.</p>';
            } else {
                listHtml = '<div style="display: flex; flex-direction: column; gap: 6px; max-height: 400px; overflow-y: auto;">';

                items.forEach(item => {
                    const label = TiageI18n.t(`needs.items.${item.id}`, item.label);
                    const wert1 = item.wert1 || 0;
                    const wert2 = item.wert2 || 0;
                    const diff = Math.abs(wert1 - wert2);

                    // Status-Icon und Farbe
                    let statusColor;
                    if (diff <= 15) {
                        statusColor = '#22c55e';
                    } else if (diff <= 35) {
                        statusColor = '#eab308';
                    } else {
                        statusColor = '#ef4444';
                    }

                    listHtml += `
                        <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px 12px; border-left: 3px solid ${statusColor};">
                            <div onclick="openNeedDefinitionModal('${item.id}')" style="font-weight: 500; color: var(--text-primary); font-size: 13px; margin-bottom: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-primary)'">
                                ${label}
                                <span style="font-size: 10px; opacity: 0.5;">ⓘ</span>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert1}%; height: 100%; background: var(--success); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert1}</span>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; min-width: 50px;">
                                    <span style="font-size: 11px; font-weight: 600; color: ${statusColor}; background: ${statusColor}22; padding: 2px 6px; border-radius: 4px;">${diff}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert2}%; height: 100%; background: var(--danger); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert2}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                listHtml += '</div>';
            }

            // Anzahl anzeigen
            const countHtml = `
                <div style="margin-top: 12px; text-align: center; font-size: 11px; color: var(--text-muted);">
                    ${items.length} ${type === 'gemeinsam' ? 'gemeinsame & kompatible Bedürfnisse' : 'unterschiedliche Prioritäten'}
                </div>
            `;

            body.innerHTML = toggleHtml + headerHtml + listHtml + countHtml;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        /**
         * Sync GFK UI across all views
         */
        function syncGfkUI(person) {
            const selected = personDimensions[person].gfk;

            // All GFK button selectors for this person
            const selectors = [
                `.gfk-grid[data-person="${person}"] .gfk-btn`,
                `#${person}-gfk-grid .gfk-btn`,
                `#mobile-${person}-gfk-grid .gfk-btn`
            ];

            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    const value = btn.dataset.value;

                    // Remove selection state
                    btn.classList.remove('selected', 'primary-selected');

                    // Add selected state if this is the chosen value
                    if (value === selected) {
                        btn.classList.add('selected', 'primary-selected');
                    }
                });
            });

            // Update summary text
            updateGfkSummary(person);
        }

        /**
         * Get GFK summary text
         */
        function getGfkSummary(person) {
            const gfk = personDimensions[person].gfk;
            if (!gfk) return 'GFK fehlt';
            return `GFK: ${gfk}`;
        }

        /**
         * Update GFK summary display
         */
        function updateGfkSummary(person) {
            const gfk = personDimensions[person].gfk;
            const isMissing = !gfk;

            // Update header element
            const headerId = `${person}-header-gfk`;
            const header = document.getElementById(headerId);
            if (header) {
                header.textContent = getGfkSummary(person);
                header.classList.toggle('missing', isMissing);
            }

            // Update grid collapsed-summary
            ['', 'mobile-'].forEach(prefix => {
                const summaryId = `${prefix}${person}-gfk-summary`;
                const summary = document.getElementById(summaryId);
                if (summary) {
                    summary.textContent = gfk ? `✓ ${gfk}` : '';
                    summary.classList.toggle('has-selection', !isMissing);
                }
            });
        }

        // Helper: Check if GFK is selected
        function hasGfkSelected(person) {
            return personDimensions[person].gfk !== null;
        }

        // ========================================
        // GFK-Bedürfnis-Matching (nach Marshall Rosenberg)
        // ========================================

        // Globale Variable für das letzte GFK-Matching-Ergebnis
        let lastGfkMatchingResult = null;

        /**
         * Berechnet das GFK-Bedürfnis-Matching zwischen den ausgewählten Profilen.
         * NEU v2.0: Berücksichtigt Archetyp + Dominanz + Geschlecht + Orientierung + Status
         *
         * Verwendet BeduerfnisModifikatoren für dynamische Profil-Berechnung
         */
        function updateGfkFromArchetypes() {
            if (typeof GfkBeduerfnisse === 'undefined') {
                console.warn('GFK: GfkBeduerfnisse nicht geladen');
                return;
            }

            const ichArchetype = currentArchetype;
            const partnerArchetype = selectedPartner;

            if (!ichArchetype || !partnerArchetype) return;

            // Archetyp-IDs normalisieren (duo_flex → duo-flex)
            const ichNormalized = ichArchetype.replace('_', '-');
            const partnerNormalized = partnerArchetype.replace('_', '-');

            // Prüfen ob BeduerfnisModifikatoren verfügbar ist
            if (typeof BeduerfnisModifikatoren !== 'undefined' && GfkBeduerfnisse.archetypProfile) {
                // NEU: Dynamische Berechnung mit allen Dimensionen
                const matching = calculateDynamicBeduerfnisMatch(ichNormalized, partnerNormalized);
                if (matching) {
                    lastGfkMatchingResult = matching;
                    console.log(`GFK Bedürfnis-Matching (dynamisch): ${ichNormalized} + ${partnerNormalized} → Score=${matching.score}`);
                    console.log(`  Faktoren: Dominanz, Geschlecht, Orientierung berücksichtigt`);

                    // GFK-Level setzen (basierend auf Bedürfnis-Übereinstimmung)
                    personDimensions.ich.gfk = matching.level;
                    personDimensions.partner.gfk = matching.level;

                    // UI synchronisieren
                    syncGfkUI('ich');
                    syncGfkUI('partner');

                    // Bedürfnis-Details anzeigen
                    updateGfkBeduerfnisDisplay(matching);
                    return;
                }
            }

            // Fallback: Altes System (nur Archetyp)
            const matching = GfkBeduerfnisse.berechneMatching(ichNormalized, partnerNormalized);

            if (matching.fehler) {
                console.warn('GFK Matching Fehler:', matching.fehler);
                return;
            }

            lastGfkMatchingResult = matching;

            console.log(`GFK Bedürfnis-Matching (statisch): ${matching.archetyp1} + ${matching.archetyp2} → Score=${matching.score} (${matching.level})`);

            // GFK-Level setzen (basierend auf Bedürfnis-Übereinstimmung)
            personDimensions.ich.gfk = matching.level;
            personDimensions.partner.gfk = matching.level;

            // UI synchronisieren
            syncGfkUI('ich');
            syncGfkUI('partner');

            // Bedürfnis-Details anzeigen
            updateGfkBeduerfnisDisplay(matching);
        }

        /**
         * Berechnet dynamisches Bedürfnis-Matching unter Berücksichtigung aller Dimensionen
         * @param {string} ichArchetyp - Normalisierter Archetyp-ID für "ich"
         * @param {string} partnerArchetyp - Normalisierter Archetyp-ID für "partner"
         * @returns {object|null} Matching-Ergebnis oder null bei Fehler
         */
        function calculateDynamicBeduerfnisMatch(ichArchetyp, partnerArchetyp) {
            // Basis-Bedürfnisse laden
            const ichBasis = GfkBeduerfnisse.archetypProfile[ichArchetyp];
            const partnerBasis = GfkBeduerfnisse.archetypProfile[partnerArchetyp];

            if (!ichBasis || !ichBasis.kernbeduerfnisse || !partnerBasis || !partnerBasis.kernbeduerfnisse) {
                console.warn('Archetyp-Basis nicht gefunden:', ichArchetyp, partnerArchetyp);
                return null;
            }

            // Helper: Geschlecht extrahieren (primary)
            const extractGeschlecht = (g) => {
                if (!g) return 'divers';
                if (typeof g === 'string') return g;
                if (typeof g === 'object') return g.primary || 'divers';
                return 'divers';
            };

            // Helper: Geschlecht Secondary extrahieren
            const extractGeschlechtSecondary = (g) => {
                if (!g || typeof g !== 'object') return null;
                return g.secondary || null;
            };

            // Helper: Dominanz extrahieren
            const extractDominanz = (d) => {
                if (!d) return 'ausgeglichen';
                if (typeof d === 'string') return d;
                if (typeof d === 'object') return d.primary || 'ausgeglichen';
                return 'ausgeglichen';
            };

            // Helper: Orientierung extrahieren
            const extractOrientierung = (o) => {
                if (!o) return 'heterosexuell';
                if (typeof o === 'string') return o;
                if (typeof o === 'object') return o.primary || 'heterosexuell';
                return 'heterosexuell';
            };

            // Dimensionen für "ich" sammeln
            const ichDims = personDimensions.ich;
            const ichParams = {
                basisBedürfnisse: ichBasis.kernbeduerfnisse,
                dominanz: extractDominanz(ichDims.dominanz),
                dominanzStatus: ichDims.dominanzStatus || 'gelebt',
                geschlechtPrimary: extractGeschlecht(ichDims.geschlecht),
                geschlechtPrimaryStatus: 'gelebt',
                geschlechtSecondary: extractGeschlechtSecondary(ichDims.geschlecht),
                geschlechtSecondaryStatus: 'gelebt',
                orientierung: extractOrientierung(ichDims.orientierung),
                orientierungStatus: ichDims.orientierungStatus || 'gelebt'
            };

            // Dimensionen für "partner" sammeln
            const partnerDims = personDimensions.partner;
            const partnerParams = {
                basisBedürfnisse: partnerBasis.kernbeduerfnisse,
                dominanz: extractDominanz(partnerDims.dominanz),
                dominanzStatus: partnerDims.dominanzStatus || 'gelebt',
                geschlechtPrimary: extractGeschlecht(partnerDims.geschlecht),
                geschlechtPrimaryStatus: 'gelebt',
                geschlechtSecondary: extractGeschlechtSecondary(partnerDims.geschlecht),
                geschlechtSecondaryStatus: 'gelebt',
                orientierung: extractOrientierung(partnerDims.orientierung),
                orientierungStatus: partnerDims.orientierungStatus || 'gelebt'
            };

            // Debug-Log
            console.log('Bedürfnis-Berechnung mit Dimensionen:', {
                ich: { archetyp: ichArchetyp, dominanz: ichParams.dominanz, geschlecht: ichParams.geschlechtPrimary, orientierung: ichParams.orientierung },
                partner: { archetyp: partnerArchetyp, dominanz: partnerParams.dominanz, geschlecht: partnerParams.geschlechtPrimary, orientierung: partnerParams.orientierung }
            });

            // Vollständige Bedürfnis-Profile berechnen
            const ichProfil = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil(ichParams);
            const partnerProfil = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil(partnerParams);

            // Übereinstimmung berechnen
            const result = BeduerfnisModifikatoren.berechneÜbereinstimmung(ichProfil, partnerProfil);

            // Level basierend auf Score bestimmen
            let level = 'niedrig';
            if (result.score >= 70) level = 'hoch';
            else if (result.score >= 40) level = 'mittel';

            // Ergebnis im erwarteten Format zurückgeben
            // Alle Bedürfnisse speichern (nicht limitiert)
            const allGemeinsam = result.gemeinsam.map(b => ({
                label: formatBeduerfnisLabel(b.bedürfnis),
                id: b.bedürfnis,
                key: b.bedürfnis,
                wert1: b.wert1,
                wert2: b.wert2
            }));
            const allUnterschiedlich = result.unterschiedlich.map(b => ({
                label: formatBeduerfnisLabel(b.bedürfnis),
                id: b.bedürfnis,
                key: b.bedürfnis,
                wert1: b.wert1,
                wert2: b.wert2
            }));
            const allKomplementaer = result.komplementaer.map(b => ({
                label: formatBeduerfnisLabel(b.bedürfnis),
                id: b.bedürfnis,
                key: b.bedürfnis,
                wert1: b.wert1,
                wert2: b.wert2
            }));

            // Combine gemeinsam + komplementaer for shared/compatible needs
            const allGemeinsamUndKompatibel = [...allGemeinsam, ...allKomplementaer].sort((a, b) =>
                ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2)
            );

            return {
                score: result.score,
                level: level,
                archetyp1: ichArchetyp,
                archetyp2: partnerArchetyp,
                // Top 5 für kompakte Anzeige (Hauptseite) - now includes komplementaer
                topUebereinstimmungen: allGemeinsamUndKompatibel.slice(0, 5),
                topKonflikte: allUnterschiedlich.slice(0, 5),
                komplementaer: allKomplementaer.slice(0, 5),
                // Alle Bedürfnisse für vollständige Anzeige (Modal)
                alleGemeinsam: allGemeinsamUndKompatibel,
                alleUnterschiedlich: allUnterschiedlich,
                alleKomplementaer: allKomplementaer,
                // Zusätzliche Details
                profile: {
                    ich: ichProfil,
                    partner: partnerProfil
                },
                dynamisch: true
            };
        }

        /**
         * Formatiert Bedürfnis-Keys in lesbare Labels
         */
        function formatBeduerfnisLabel(key) {
            if (!key) return '';
            // Underscore zu Leerzeichen, erster Buchstabe groß
            return key.replace(/_/g, ' ')
                      .replace(/ae/g, 'ä')
                      .replace(/oe/g, 'ö')
                      .replace(/ue/g, 'ü')
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
        }

        /**
         * Zeigt die Bedürfnis-Matching-Details in der UI an
         */
        function updateGfkBeduerfnisDisplay(matching) {
            const container = document.getElementById('gfk-beduerfnis-display');
            const mobileContainer = document.getElementById('mobile-gfk-beduerfnis-display');

            // Mindestens ein Container muss existieren
            if (!container && !mobileContainer) return;

            // Container sichtbar machen
            if (container) container.style.display = 'block';
            if (mobileContainer) mobileContainer.style.display = 'block';

            // Score-Farbe basierend auf Level
            const scoreColor = matching.level === 'hoch' ? '#22c55e' :
                              matching.level === 'mittel' ? '#eab308' : '#ef4444';

            // HTML generieren
            const beduerfnisLabel = TiageI18n.t('synthesisSection.beduerfnisUebereinstimmung', 'Bedürfnis-Übereinstimmung');
            let html = `
                <div class="gfk-matching-header" onclick="openNeedsFullModal()" style="cursor: pointer;" title="Klicken für vollständige Liste">
                    <div class="gfk-score-display">
                        <span class="gfk-score" style="color: ${scoreColor}">${matching.score}</span>
                        <span class="gfk-level-label">${beduerfnisLabel}</span>
                    </div>
                </div>
            `;

            // Top Übereinstimmungen (now includes gemeinsam + komplementaer)
            if (matching.topUebereinstimmungen && matching.topUebereinstimmungen.length > 0) {
                const gemeinsameLabel = TiageI18n.t('synthesisSection.gemeinsameBeduerfnisse', 'Gemeinsame & Kompatible Bedürfnisse');
                html += `
                    <div class="gfk-section gfk-matches">
                        <div class="gfk-section-title" style="color: #22c55e;">${TiageI18n.t('needs.sharedTitle', 'GEMEINSAME BEDÜRFNISSE')}</div>
                        <div class="gfk-tags">
                            ${matching.topUebereinstimmungen.map(b => {
                                const translatedLabel = TiageI18n.t(`needs.items.${b.id}`, b.label);
                                const bidDisplay = b.id ? `<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">#${b.id.toUpperCase()}</span>` : '';
                                return `<span class="gfk-tag gfk-tag-match gfk-tag-clickable" onclick="openNeedDefinitionModal('${b.id}')" title="Klicken für Definition">${bidDisplay}${translatedLabel}</span>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            // Konflikte
            if (matching.topKonflikte && matching.topKonflikte.length > 0) {
                const unterschiedlicheLabel = TiageI18n.t('synthesisSection.unterschiedlichePrioritaeten', 'Unterschiedliche Prioritäten');
                html += `
                    <div class="gfk-section gfk-conflicts">
                        <div class="gfk-section-title" style="color: #ef4444;">${TiageI18n.t('needs.differentTitle', 'UNTERSCHIEDLICHE PRIORITÄTEN')}</div>
                        <div class="gfk-tags">
                            ${matching.topKonflikte.map(b => {
                                const translatedLabel = TiageI18n.t(`needs.items.${b.id}`, b.label);
                                const bidDisplay = b.id ? `<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">#${b.id.toUpperCase()}</span>` : '';
                                return `<span class="gfk-tag gfk-tag-conflict gfk-tag-clickable" onclick="openNeedDefinitionModal('${b.id}')" title="Klicken für Definition | ${matching.archetyp1}: ${b.wert1} | ${matching.archetyp2}: ${b.wert2}">${bidDisplay}${translatedLabel}</span>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            // Desktop und Mobile Container aktualisieren
            if (container) container.innerHTML = html;
            if (mobileContainer) mobileContainer.innerHTML = html;
        }

        /**
         * Gibt die Top-Bedürfnisse für einen Archetyp zurück
         */
        function getArchetypBeduerfnisse(archetyp) {
            if (typeof GfkBeduerfnisse === 'undefined') return [];
            const normalized = archetyp.replace('_', '-');
            return GfkBeduerfnisse.getTopBeduerfnisse(normalized, 5);
        }

        // ========================================
        // Desktop Selection Info Message
        // ========================================
        // Helper function to get geschlecht value from both string and object formats
        function getGeschlechtValue(g) {
            if (!g) return null;
            if (typeof g === 'string') return g;
            if (typeof g === 'object' && g.primary) return g.primary;
            return null;
        }

        function updateSelectionInfoMessage() {
            const infoElement = document.getElementById('desktopSelectionInfo');
            if (!infoElement) return;

            const missing = [];

            // Check ICH
            const ichMissing = [];
            if (!getGeschlechtValue(personDimensions.ich.geschlecht)) ichMissing.push('Geschlecht');
            if (!hasAnyDominanzSelected('ich')) ichMissing.push('Dominanz');
            if (!hasAnyOrientierungSelected('ich')) ichMissing.push('Orientierung');
            if (ichMissing.length > 0) {
                missing.push('DU: ' + ichMissing.join(', '));
            }

            // Check Partner
            const partnerMissing = [];
            if (!getGeschlechtValue(personDimensions.partner.geschlecht)) partnerMissing.push('Geschlecht');
            if (!hasAnyDominanzSelected('partner')) partnerMissing.push('Dominanz');
            if (!hasAnyOrientierungSelected('partner')) partnerMissing.push('Orientierung');
            if (partnerMissing.length > 0) {
                missing.push('PARTNER: ' + partnerMissing.join(', '));
            }

            // Update display
            if (missing.length > 0) {
                infoElement.textContent = 'Fehlende Auswahl - ' + missing.join(' | ');
                infoElement.classList.add('visible');
            } else {
                infoElement.textContent = '';
                infoElement.classList.remove('visible');
            }
        }

        function handleDimensionChange(person, dimension, value, element) {
            // Update state
            personDimensions[person][dimension] = value;

            // Remove needs-selection class from the parent group
            if (element) {
                const dimensionGroup = element.closest('.dimension-group, .dimension-status-group');
                if (dimensionGroup) {
                    dimensionGroup.classList.remove('needs-selection');
                }
            }

            // Visual feedback - highlight animation
            if (element) {
                const label = element.nextElementSibling;
                if (label) {
                    label.classList.add('highlight-change');
                    setTimeout(() => label.classList.remove('highlight-change'), 300);
                }
            }

            // Update overview box
            updateAnalysisOverview();

            // Re-run compatibility checks when dimensions change
            if (data) {
                updatePartnerView();
            }
        }

        function getGeschlechtKurz(geschlecht) {
            if (!geschlecht) return '?';

            // Neues Format: { primary, secondary }
            let primary = geschlecht;
            let secondary = null;
            if (typeof geschlecht === 'object') {
                primary = geschlecht.primary;
                secondary = geschlecht.secondary;
            }

            if (!primary) return '?';

            // Nutze TiageConfig wenn verfügbar
            const getShort = (g) => {
                if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_SHORT) {
                    return TiageConfig.GESCHLECHT_SHORT[g] || g;
                }
                // Fallback-Map
                const map = {
                    'cis_mann': 'CM',
                    'cis_frau': 'CF',
                    'trans_mann': 'TM',
                    'trans_frau': 'TF',
                    'nonbinaer': 'NB',
                    'genderfluid': 'GF',
                    'agender': 'AG',
                    'intersex': 'IS',
                    'divers': 'DI',
                    // Legacy-Support
                    'männlich': 'M',
                    'weiblich': 'W',
                    'non-binär': 'NB'
                };
                return map[g] || g;
            };

            // Primär + optional Sekundär anzeigen
            let result = getShort(primary);
            if (secondary) {
                result += '/' + getShort(secondary);
            }
            return result;
        }

        function getGeschlechtVoll(geschlecht) {
            if (!geschlecht) return null;

            let primary = geschlecht;
            let secondary = null;
            if (typeof geschlecht === 'object') {
                primary = geschlecht.primary;
                secondary = geschlecht.secondary;
            }

            if (!primary) return null;

            // Nutze i18n wenn verfügbar, sonst Fallback-Map
            const getName = (g) => {
                if (typeof TiageI18n !== 'undefined') {
                    return TiageI18n.t(`geschlecht.types.${g}`, g);
                }
                // Fallback-Map
                const map = {
                    'cis_mann': 'Cis Mann',
                    'cis_frau': 'Cis Frau',
                    'trans_mann': 'Trans Mann',
                    'trans_frau': 'Trans Frau',
                    'nonbinaer': 'Nonbinär',
                    'genderfluid': 'Genderfluid',
                    'agender': 'Agender',
                    'intersex': 'Intersex',
                    'divers': 'Divers',
                    'männlich': 'Mann',
                    'weiblich': 'Frau',
                    'non-binär': 'Nonbinär'
                };
                return map[g] || g;
            };

            let result = getName(primary);
            if (secondary) {
                result += ' (' + getName(secondary) + ')';
            }
            return result;
        }

        function getGeschlechtCategory(geschlecht) {
            // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
            if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
                geschlecht = geschlecht.primary;
            }
            // Gibt die Kategorie für Orientierungslogik zurück
            if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_CATEGORY) {
                return TiageConfig.GESCHLECHT_CATEGORY[geschlecht] || 'andere';
            }
            const map = {
                'cis_mann': 'maennlich',
                'cis_frau': 'weiblich',
                'trans_mann': 'maennlich',
                'trans_frau': 'weiblich',
                'nonbinaer': 'nonbinaer',
                'genderfluid': 'fluid',
                'agender': 'agender',
                // Legacy-Support
                'männlich': 'maennlich',
                'weiblich': 'weiblich',
                'non-binär': 'nonbinaer'
            };
            return map[geschlecht] || 'andere';
        }

        function getDominanzKurz(dominanz) {
            // Handle multi-select object
            if (dominanz && typeof dominanz === 'object') {
                const parts = [];
                const map = { 'dominant': 'dom', 'submissiv': 'sub', 'switch': 'sw', 'ausgeglichen': 'ausg' };

                // New Primary/Secondary structure
                if ('primary' in dominanz) {
                    if (dominanz.primary) {
                        parts.push(map[dominanz.primary] || dominanz.primary);
                    }
                    if (dominanz.secondary) {
                        parts.push((map[dominanz.secondary] || dominanz.secondary) + '?');
                    }
                    return parts.length > 0 ? parts.join('+') : '?';
                }

                // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
                for (const [type, status] of Object.entries(dominanz)) {
                    if (status) {
                        let kurz = map[type] || type;
                        if (status === 'interessiert') kurz += '?';
                        parts.push(kurz);
                    }
                }

                return parts.length > 0 ? parts.join('+') : '?';
            }

            // Old single-value format (backwards compatibility)
            if (!dominanz) return '?';
            const map = {
                'dominant': 'dom',
                'submissiv': 'sub',
                'switch': 'sw',
                'ausgeglichen': 'ausg'
            };
            return map[dominanz] || dominanz;
        }

        function getOrientierungKurz(orientierung, status) {
            // Handle multi-select orientierung object
            if (orientierung && typeof orientierung === 'object') {
                const map = {
                    'heterosexuell': 'het',
                    'homosexuell': 'hom',
                    'bisexuell': 'bi'
                };
                const parts = [];
                // New Primary/Secondary structure
                if (orientierung.primary) {
                    parts.push(map[orientierung.primary] || orientierung.primary);
                }
                if (orientierung.secondary) {
                    parts.push(map[orientierung.secondary] || orientierung.secondary);
                }
                return parts.length > 0 ? parts.join('/') : '?';
            }

            // Backwards compatibility for old single-value format
            if (!orientierung) return '?';
            const map = {
                'heterosexuell': 'hetero',
                'homosexuell': 'homo',
                'bisexuell': 'bi'
            };
            let kurz = map[orientierung] || orientierung;
            if (status === 'interessiert') {
                kurz += '(?)';
            }
            return kurz;
        }

        function updateAnalysisOverview() {
            const ichType = data?.archetypes[currentArchetype]?.name || currentArchetype;
            const partnerType = data?.archetypes[selectedPartner]?.name || selectedPartner;

            const ichDims = personDimensions.ich;
            const partnerDims = personDimensions.partner;

            // Voller Geschlechtsname mit sekundärem in Klammern
            const ichGeschlecht = getGeschlechtVoll(ichDims.geschlecht);
            const partnerGeschlecht = getGeschlechtVoll(partnerDims.geschlecht);

            const ichInfo = `(${getDominanzKurz(ichDims.dominanz)}, ${getOrientierungKurz(ichDims.orientierung, ichDims.orientierungStatus)})`;
            const partnerInfo = `(${getDominanzKurz(partnerDims.dominanz)}, ${getOrientierungKurz(partnerDims.orientierung, partnerDims.orientierungStatus)})`;

            const content = document.getElementById('analysisOverviewContent');
            if (content) {
                // Nutze i18n für "Du:" / "You:"
                const youALabel = typeof TiageI18n !== 'undefined' ? TiageI18n.t('analysisOverview.youA', 'Du:') : 'Du:';
                const ichGeschlechtHtml = ichGeschlecht ? `<span class="geschlecht-info">${youALabel} ${ichGeschlecht}</span>` : '';
                const partnerGeschlechtHtml = partnerGeschlecht ? `<span class="geschlecht-info">${partnerGeschlecht}</span>` : '';

                content.innerHTML = `
                    <span class="type-name">${ichType}</span> ${ichGeschlechtHtml} <span class="dim-info">${ichInfo}</span>
                    <span> × </span>
                    <span class="type-name">${partnerType}</span> ${partnerGeschlechtHtml} <span class="dim-info">${partnerInfo}</span>
                `;
            }
        }

        // Make function globally available for i18n updates
        window.updateAnalysisOverview = updateAnalysisOverview;

        function initDimensionListeners() {
            // ICH dimensions
            document.querySelectorAll('input[name="ich-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('ich', 'geschlecht', e.target.value, e.target));
            });
            document.querySelectorAll('input[name="ich-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const dimensionGroup = e.target.closest('.dimension-group');
                    if (dimensionGroup) dimensionGroup.classList.remove('needs-selection');
                    handleDominanzClick('ich', e.target.value);
                });
            });
            document.querySelectorAll('input[name="ich-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('ich', 'dominanzStatus', e.target.value, e.target));
            });

            // PARTNER dimensions
            document.querySelectorAll('input[name="partner-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('partner', 'geschlecht', e.target.value, e.target));
            });
            document.querySelectorAll('input[name="partner-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const dimensionGroup = e.target.closest('.dimension-group');
                    if (dimensionGroup) dimensionGroup.classList.remove('needs-selection');
                    handleDominanzClick('partner', e.target.value);
                });
            });
            document.querySelectorAll('input[name="partner-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('partner', 'dominanzStatus', e.target.value, e.target));
            });
        }

        // ========================================
        // Pathos/Logos Check System
        // ========================================
        // NOTE: Logic extracted to /js/compatibility/ modules
        // These wrapper functions maintain backward compatibility

        function checkPhysicalCompatibility(person1, person2) {
            // Delegate to extracted module
            if (typeof TiageCompatibility !== 'undefined' && TiageCompatibility.Physical) {
                return TiageCompatibility.Physical.check(person1, person2);
            }
            // Fallback: inline implementation for backwards compatibility
            // Extract effective gender identity (handles Trans transformation)
            const extractEffectiveGender = (geschlecht) => {
                if (!geschlecht) return null;
                if (typeof geschlecht === 'object' && 'primary' in geschlecht) {
                    const primary = geschlecht.primary;
                    const secondary = geschlecht.secondary;
                    if (secondary) {
                        if (secondary === 'cis') return primary;
                        if (secondary === 'trans') {
                            if (primary === 'mann') return 'frau';
                            if (primary === 'frau') return 'mann';
                            return primary;
                        }
                        if (['nonbinaer', 'fluid', 'suchend'].includes(secondary)) return secondary;
                        return secondary;
                    }
                    return primary || null;
                }
                if (typeof geschlecht === 'string') return geschlecht;
                return null;
            };

            let g1 = extractEffectiveGender(person1.geschlecht);
            let g2 = extractEffectiveGender(person2.geschlecht);

            // Get orientierung as multi-select object
            const ori1 = person1.orientierung;
            const ori2 = person2.orientierung;

            // Collect all missing items
            const missingItems = [];

            if (!g1) missingItems.push('Ich: Geschlecht');
            if (!g2) missingItems.push('Partner: Geschlecht');

            // Handle multi-select orientierung
            const oriList1 = [];
            const oriList2 = [];

            if (ori1 && typeof ori1 === 'object') {
                // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                if ('primary' in ori1) {
                    if (ori1.primary) oriList1.push({ type: ori1.primary, status: 'gelebt' });
                    if (ori1.secondary) oriList1.push({ type: ori1.secondary, status: 'interessiert' });
                } else {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                    if (ori1.heterosexuell) oriList1.push({ type: 'heterosexuell', status: ori1.heterosexuell });
                    if (ori1.homosexuell) oriList1.push({ type: 'homosexuell', status: ori1.homosexuell });
                    if (ori1.bisexuell) oriList1.push({ type: 'bisexuell', status: ori1.bisexuell });
                }
            } else if (ori1 && typeof ori1 === 'string') {
                // Backwards compatibility for old single-value format
                oriList1.push({ type: ori1, status: person1.orientierungStatus || 'gelebt' });
            }

            if (ori2 && typeof ori2 === 'object') {
                // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                if ('primary' in ori2) {
                    if (ori2.primary) oriList2.push({ type: ori2.primary, status: 'gelebt' });
                    if (ori2.secondary) oriList2.push({ type: ori2.secondary, status: 'interessiert' });
                } else {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                    if (ori2.heterosexuell) oriList2.push({ type: 'heterosexuell', status: ori2.heterosexuell });
                    if (ori2.homosexuell) oriList2.push({ type: 'homosexuell', status: ori2.homosexuell });
                    if (ori2.bisexuell) oriList2.push({ type: 'bisexuell', status: ori2.bisexuell });
                }
            } else if (ori2 && typeof ori2 === 'string') {
                // Backwards compatibility for old single-value format
                oriList2.push({ type: ori2, status: person2.orientierungStatus || 'gelebt' });
            }

            // Check if orientierung is missing
            if (oriList1.length === 0) missingItems.push('Ich: Orientierung');
            if (oriList2.length === 0) missingItems.push('Partner: Orientierung');

            // Return incomplete if any items are missing
            if (missingItems.length > 0) {
                return {
                    result: 'unvollständig',
                    reason: 'Dimensionen unvollständig',
                    explanation: 'Es fehlt noch: ' + missingItems.join(', '),
                    missingItems: missingItems
                };
            }

            // Check all combinations
            let hasPossible = false;
            let hasUnsicher = false;
            let hasInteressiert = false;

            for (const o1 of oriList1) {
                for (const o2 of oriList2) {
                    const result = checkSingleOrientationPair(o1.type, o1.status, o2.type, o2.status, g1, g2);

                    if (result === 'möglich') {
                        hasPossible = true;
                    } else if (result === 'unsicher') {
                        hasUnsicher = true;
                    }

                    if (o1.status === 'interessiert' || o2.status === 'interessiert') {
                        hasInteressiert = true;
                    }
                }
            }

            // Return best result
            if (hasPossible && !hasInteressiert) {
                return { result: 'möglich', confidence: 'hoch' };
            }

            if (hasPossible && hasInteressiert) {
                return {
                    result: 'unsicher',
                    confidence: 'mittel',
                    explanation: 'Anziehung möglich, aber mindestens eine Person ist in der Explorationsphase.',
                    note: 'Status "Interessiert" bedeutet Exploration'
                };
            }

            if (hasUnsicher) {
                return {
                    result: 'unsicher',
                    confidence: 'niedrig',
                    explanation: 'Anziehung ist theoretisch möglich, aber unsicher.',
                    note: 'Exploration-Phase'
                };
            }

            return {
                result: 'unmöglich',
                reason: 'Inkompatible Orientierungen',
                explanation: 'Die sexuellen Orientierungen schließen gegenseitige Anziehung aus.'
            };
        }

        // Helper: Check if gender is male category (includes cis and trans)
        function isMaleGender(gender) {
            if (!gender) return false;
            const g = gender.toLowerCase();
            return g === 'männlich' || g === 'cis_mann' || g === 'trans_mann' ||
                   g === 'mann' || g === 'male' || g === 'm';
        }

        // Helper: Check if gender is female category (includes cis and trans)
        function isFemaleGender(gender) {
            if (!gender) return false;
            const g = gender.toLowerCase();
            return g === 'weiblich' || g === 'cis_frau' || g === 'trans_frau' ||
                   g === 'frau' || g === 'female' || g === 'w' || g === 'f';
        }

        // Helper: Check if two genders are in the same category
        function isSameGenderCategory(g1, g2) {
            if (isMaleGender(g1) && isMaleGender(g2)) return true;
            if (isFemaleGender(g1) && isFemaleGender(g2)) return true;
            // Non-binary/other: compare directly
            return g1 === g2;
        }

        // Helper: Check if two genders are in different binary categories (male vs female)
        function isDifferentBinaryGender(g1, g2) {
            return (isMaleGender(g1) && isFemaleGender(g2)) ||
                   (isFemaleGender(g1) && isMaleGender(g2));
        }

        // Helper: Check single pair of orientations
        function checkSingleOrientationPair(type1, status1, type2, status2, g1, g2) {
            // Bisexuell is always compatible
            if (type1 === 'bisexuell' || type2 === 'bisexuell') {
                return (status1 === 'interessiert' || status2 === 'interessiert') ? 'unsicher' : 'möglich';
            }

            // Both heterosexuell - need different gender categories (male + female)
            if (type1 === 'heterosexuell' && type2 === 'heterosexuell') {
                if (isDifferentBinaryGender(g1, g2)) {
                    return (status1 === 'interessiert' || status2 === 'interessiert') ? 'unsicher' : 'möglich';
                } else {
                    return 'unmöglich'; // Same gender category, both hetero
                }
            }

            // Both homosexuell - need same gender category
            if (type1 === 'homosexuell' && type2 === 'homosexuell') {
                if (isSameGenderCategory(g1, g2)) {
                    return (status1 === 'interessiert' || status2 === 'interessiert') ? 'unsicher' : 'möglich';
                } else {
                    return 'unmöglich'; // Different gender category, both homo
                }
            }

            // Mixed: hetero + homo - check if exploring
            if (status1 === 'interessiert' || status2 === 'interessiert') {
                return 'unsicher'; // Exploration could change things
            }
            return 'unmöglich';
        }

        function calculatePhilosophyCompatibility(type1, type2) {
            // Delegate to extracted module
            if (typeof TiageCompatibility !== 'undefined' && TiageCompatibility.Philosophy) {
                return TiageCompatibility.Philosophy.calculate(type1, type2, data);
            }
            // Fallback: inline implementation for backwards compatibility
            // Get the philosophy score (Category A) from the matrix
            const key = `${type1}_${type2}`;
            const interaction = data?.interactions[key];

            if (interaction && interaction.scores && interaction.scores.A) {
                return {
                    score: interaction.scores.A.value,
                    note: interaction.scores.A.note
                };
            }

            // Fallback if not found
            return { score: 50, note: 'Keine spezifischen Daten verfügbar' };
        }

        function formatPersonSummary(person) {
            // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
            let geschlecht = person.geschlecht || '?';
            if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
                geschlecht = geschlecht.primary || '?';
            }

            // Handle Primary/Secondary orientierung structure
            let orientierungStr = '?';
            if (person.orientierung && typeof person.orientierung === 'object') {
                const parts = [];
                if (person.orientierung.primary) {
                    parts.push(person.orientierung.primary + ' (P)');
                }
                if (person.orientierung.secondary) {
                    parts.push(person.orientierung.secondary + ' (S)');
                }
                orientierungStr = parts.length > 0 ? parts.join(', ') : '?';
            } else if (person.orientierung) {
                // Backwards compatibility for old single-value format
                orientierungStr = person.orientierung;
            }

            return `${geschlecht}, ${orientierungStr}`;
        }

        function runCompatibilityChecks() {
            const person1 = {
                archetyp: currentArchetype,
                ...personDimensions.ich
            };
            const person2 = {
                archetyp: selectedPartner,
                ...personDimensions.partner
            };

            // Reset all warnings
            document.getElementById('pathosBlocker').classList.remove('active');
            document.getElementById('logosWarning').classList.remove('active');
            document.getElementById('pathosUncertain').classList.remove('active');
            document.getElementById('doubleWarning').classList.remove('active');
            document.getElementById('compatibilityContent').style.display = 'block';

            // 1. PATHOS CHECK
            const pathosCheck = checkPhysicalCompatibility(person1, person2);

            if (pathosCheck.result === 'unvollständig') {
                // Show Pathos Uncertain with incomplete message
                document.getElementById('pathosUncertain').classList.add('active');
                document.getElementById('pathosUncertainText').textContent =
                    pathosCheck.explanation;
                // Continue showing compatibility content since it's just incomplete
            }

            if (pathosCheck.result === 'unmöglich') {
                // SANFTER HINWEIS statt K.O.-Blocker
                // Zeige Warnung, aber blockiere nicht mehr
                document.getElementById('pathosBlocker').classList.add('active');
                // Content wird NICHT mehr versteckt - zeige den (niedrigen) Score
                // document.getElementById('compatibilityContent').style.display = 'none';

                document.getElementById('pathosBlockerReason').textContent =
                    `Hinweis: ${pathosCheck.reason} – Resonanz ist sehr niedrig, aber nicht unmöglich.`;
                document.getElementById('pathosBlockerPerson1').textContent =
                    formatPersonSummary(person1);
                document.getElementById('pathosBlockerPerson2').textContent =
                    formatPersonSummary(person2);

                // Kein return mehr - weitermachen mit niedriger Resonanz!
                // return { blocked: true, reason: 'pathos' };
            }

            // 2. LOGOS CHECK
            const logosCheck = calculatePhilosophyCompatibility(person1.archetyp, person2.archetyp);
            const hasLogosWarning = logosCheck.score < 50;
            const hasPathosUncertain = pathosCheck.result === 'unsicher';

            // Handle different warning combinations
            if (hasPathosUncertain && hasLogosWarning) {
                // Double Warning
                document.getElementById('doubleWarning').classList.add('active');
                document.getElementById('doubleWarningPathos').textContent =
                    `${person2.orientierung} (${person2.orientierungStatus}) → Exploration-Phase`;
                document.getElementById('doubleWarningLogos').textContent =
                    `Beziehungsphilosophie: ${logosCheck.score} → ${data?.archetypes[person1.archetyp]?.name || person1.archetyp} vs. ${data?.archetypes[person2.archetyp]?.name || person2.archetyp}`;
            } else {
                // Single warnings
                if (hasLogosWarning) {
                    document.getElementById('logosWarning').classList.add('active');
                    const warningTitle = logosCheck.score < 30
                        ? 'Verstandsebene-Warnung: Fundamentale philosophische Unterschiede'
                        : 'Verstandsebene-Hinweis: Unterschiedliche philosophische Ansätze';
                    document.getElementById('logosWarningTitle').textContent = warningTitle;
                    document.getElementById('logosWarningSubtitle').textContent =
                        `Beziehungsphilosophie: ${logosCheck.score}`;
                    document.getElementById('logosWarningScore').textContent = `${logosCheck.score}`;
                    document.getElementById('logosWarningText').textContent = logosCheck.score < 30
                        ? 'Eure Grundüberzeugungen über Beziehungen sind sehr unterschiedlich. Dies erfordert intensive Kommunikation und Kompromissbereitschaft.'
                        : 'Ihr habt verschiedene Vorstellungen von Beziehungen. Offene Kommunikation ist wichtig.';
                }

                if (hasPathosUncertain) {
                    document.getElementById('pathosUncertain').classList.add('active');
                    document.getElementById('pathosUncertainText').textContent =
                        `Mindestens eine Person ist in der Explorationsphase (Status: "Interessiert"). Die tatsächliche körperliche Anziehung ist noch unklar.`;
                }
            }

            // 3. DISPLAY DIMENSION MODIFIERS
            const modifierSummaries = getModifierSummary(person1, person2);
            const modifierSummaryEl = document.getElementById('modifierSummary');
            const modifierContentEl = document.getElementById('modifierSummaryContent');

            if (modifierSummaries.length > 0) {
                modifierSummaryEl.classList.add('active');
                modifierContentEl.innerHTML = modifierSummaries.map(mod => {
                    const sign = mod.modifier > 0 ? '+' : '';
                    const modClass = mod.modifier > 0 ? 'positive' : (mod.modifier < 0 ? 'negative' : 'neutral');
                    const icon = mod.modifier > 0 ? '↑' : (mod.modifier < 0 ? '↓' : '→');
                    return `
                        <div class="modifier-summary-item">
                            <span class="modifier-icon">${icon}</span>
                            <span>${mod.description}</span>
                            <span class="modifier-badge ${modClass}">${sign}${mod.modifier}%</span>
                        </div>
                    `;
                }).join('');
            } else {
                modifierSummaryEl.classList.remove('active');
            }

            return {
                blocked: false,
                pathosCheck,
                logosCheck,
                warnings: { hasLogosWarning, hasPathosUncertain },
                modifiers: modifierSummaries
            };
        }

        function toggleLogosWarning() {
            const warning = document.getElementById('logosWarning');
            warning.classList.toggle('expanded');
        }

        function showPathosLogosInfo() {
            // Show info modal about Pathos vs Logos
            const title = 'Pathos vs. Logos';
            const content = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--primary); margin-bottom: 10px;">GEFÜHLSEBENE (Emotion/Körper)</h4>
                    <ul style="margin-bottom: 15px; padding-left: 20px;">
                        <li>Körperliche und emotionale Anziehung</li>
                        <li>Sexuelle Orientierung</li>
                        <li>Nicht durch Lernen oder Kommunikation veränderbar</li>
                        <li><strong>Ohne Gefühlsebene:</strong> Keine romantische Beziehung möglich</li>
                    </ul>

                    <h4 style="color: var(--warning); margin-bottom: 10px;">VERSTANDSEBENE (Philosophie/Überzeugungen)</h4>
                    <ul style="margin-bottom: 15px; padding-left: 20px;">
                        <li>Beziehungsphilosophie und rationale Überzeugungen</li>
                        <li>Überzeugungen und Werte</li>
                        <li>Kann durch Kommunikation und Lernen verändert werden</li>
                        <li><strong>Ohne Verstandsebene:</strong> Schwierige, aber mögliche Beziehung</li>
                    </ul>

                    <p style="font-style: italic; color: var(--text-muted);">
                        "Die Gefühlsebene ist das Fundament - ohne körperliche Anziehung kann keine romantische Beziehung entstehen. Die Verstandsebene ist das Dach - es schützt und strukturiert, kann aber umgebaut werden."
                    </p>
                </div>
            `;

            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalBody').innerHTML = content;
            document.getElementById('categoryModal').classList.add('active');
        }

        // ========================================
        // Dimensions Modifiers System
        // ========================================

        // Tag dimension relevance mapping
        const tagDimensionRelevance = {
            // KATEGORIE A: Beziehungsphilosophie - KEINE Dimensions-Einflüsse!
            "exklusivitaets-erwartung": [],
            "offenheit-fuer-alternative-modelle": [],
            "beziehung-als-lebensinhalt": [],
            "primaerbeziehung-konzept": [],
            "commitment-tiefe": [],

            // KATEGORIE B: Werte-Alignment
            "fuehrung-und-initiative": ["dominanz"],
            "macht-balance": ["dominanz"],
            "emotionale-reziprozitaet": [],
            "eifersucht-umgang": [],
            "konfliktloesung": ["dominanz"],
            "emotionale-tiefe": [],

            // KATEGORIE C: Nähe-Distanz
            "entscheidungsfindung": ["dominanz"],
            "alltags-organisation": ["dominanz"],
            "autonomie-vs-gemeinsame-zeit": [],
            "finanzielle-organisation": ["dominanz"],
            "wohnform-flexibilitaet": [],
            "zeitmanagement": ["dominanz"],

            // KATEGORIE D: Autonomie
            "koerperliche-anziehung": ["geschlecht", "orientierung", "orientierungStatus"],
            "sexuelle-dominanz-dynamik": ["dominanz"],
            "experimentierfreude": ["orientierungStatus"],
            "intimitaets-frequenz": [],
            "koerperliche-naehe": [],
            "sexuelle-offenheit": ["orientierungStatus"],

            // KATEGORIE E: Kommunikation
            "kommunikations-stil": ["dominanz"],
            "konflikt-kommunikation": ["dominanz"],
            "beduerfnis-artikulation": [],
            "feedback-kultur": [],

            // KATEGORIE F: Soziale Kompatibilität
            "philosophische-entwicklung": [],
            "anpassungsfaehigkeit": ["dominanz"],
            "krisenresilienz": ["dominanz"],
            "gemeinsame-vision": [],
            "soziales-umfeld": [],
            "gesellschaftliche-akzeptanz": []
        };

        // Calculate dominanz modifier
        // NOTE: Logic extracted to /js/dimensions/dominanzModifier.js
        function getDominanzModifier(dom1, dom2) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.Dominanz) {
                return TiageDimensions.Dominanz.getModifier(dom1, dom2);
            }
            // Fallback: inline implementation for backwards compatibility
            // Return 0 if either is null/undefined
            if (!dom1 || !dom2) return 0;

            // KOMPLEMENTÄR
            if ((dom1 === "dominant" && dom2 === "submissiv") ||
                (dom1 === "submissiv" && dom2 === "dominant")) {
                return 8;
            }
            // BEIDE GLEICH
            if (dom1 === dom2) {
                if (dom1 === "ausgeglichen") return 5;
                if (dom1 === "switch") return 3;
                if (dom1 === "dominant") return -5;
                if (dom1 === "submissiv") return -5;
            }
            // EINER FLEXIBEL
            if (dom1 === "switch" || dom2 === "switch" ||
                dom1 === "ausgeglichen" || dom2 === "ausgeglichen") {
                return 2;
            }
            return 0;
        }

        // Get dominanz modifier description
        // Basiert auf Forschung: Sadikaj et al. (2017), Tiedens & Fragale (2003)
        // NOTE: Logic extracted to /js/dimensions/dominanzModifier.js
        function getDominanzDescription(dom1, dom2, modifier) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.Dominanz) {
                return TiageDimensions.Dominanz.getDescription(dom1, dom2, modifier);
            }
            // Fallback: inline implementation for backwards compatibility
            if (modifier === 8) return `Komplementär (${dom1} × ${dom2}): Optimale Rollenverteilung - Forschung zeigt höhere Sympathie und Komfort`;
            if (modifier === 5) return `Beide ausgeglichen: Flexible Dynamik ohne starre Hierarchie`;
            if (modifier === 3) return `Beide switch: Wechselnde Dynamik mit situativer Anpassung`;
            if (modifier === -5 && dom1 === "dominant") return `Beide dominant: Machtkampf-Risiko - bewusste Kommunikationsregeln empfohlen`;
            if (modifier === -5 && dom1 === "submissiv") return `Beide submissiv: Führungsvakuum - klare Aufgabenteilung empfohlen`;
            if (modifier === 2) return `Flexibilität: Ein Partner passt sich situativ an`;
            return "Neutral";
        }

        // Map tag to category
        // NOTE: Logic extracted to /js/dimensions/tagDimensionRelevance.js
        function getTagCategory(tagId) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagRelevance) {
                return TiageDimensions.TagRelevance.getTagCategory(tagId);
            }
            // Fallback: inline implementation for backwards compatibility
            const mapping = {
                "exklusivitaets-erwartung": "A", "offenheit-fuer-alternative-modelle": "A",
                "beziehung-als-lebensinhalt": "A", "primaerbeziehung-konzept": "A", "commitment-tiefe": "A",
                "fuehrung-und-initiative": "B", "macht-balance": "B", "emotionale-reziprozitaet": "B",
                "eifersucht-umgang": "B", "konfliktloesung": "B", "emotionale-tiefe": "B",
                "entscheidungsfindung": "C", "alltags-organisation": "C", "autonomie-vs-gemeinsame-zeit": "C",
                "finanzielle-organisation": "C", "wohnform-flexibilitaet": "C", "zeitmanagement": "C",
                "koerperliche-anziehung": "D", "sexuelle-dominanz-dynamik": "D", "experimentierfreude": "D",
                "intimitaets-frequenz": "D", "koerperliche-naehe": "D", "sexuelle-offenheit": "D",
                "kommunikations-stil": "E", "konflikt-kommunikation": "E",
                "beduerfnis-artikulation": "E", "feedback-kultur": "E",
                "philosophische-entwicklung": "F", "anpassungsfaehigkeit": "F", "krisenresilienz": "F",
                "gemeinsame-vision": "F", "soziales-umfeld": "F", "gesellschaftliche-akzeptanz": "F"
            };
            return mapping[tagId] || null;
        }

        // Calculate tag score with modifiers
        // NOTE: Logic extracted to /js/dimensions/tagCalculator.js
        function calculateTagWithModifiers(tagId, person1, person2, pathosCheck) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagCalculator) {
                return TiageDimensions.TagCalculator.calculateTagWithModifiers(tagId, person1, person2, pathosCheck, data);
            }
            // Fallback: inline implementation for backwards compatibility
            const interactionKey = `${person1.archetyp}_${person2.archetyp}`;
            const interaction = data?.interactions[interactionKey];
            const tagCategory = getTagCategory(tagId);
            let baseScore = interaction?.scores?.[tagCategory]?.value || 50;

            const relevantDims = tagDimensionRelevance[tagId] || [];
            if (relevantDims.length === 0) {
                return { score: baseScore, baseScore, modifier: 0, dims: [], desc: "Archetyp-basiert" };
            }

            let modifier = 0;
            let descriptions = [];

            // Dominanz modifier
            if (relevantDims.includes("dominanz")) {
                const domMod = getDominanzModifier(person1.dominanz, person2.dominanz);
                modifier += domMod;
                if (domMod !== 0) descriptions.push(getDominanzDescription(person1.dominanz, person2.dominanz, domMod));
            }

            // Physical compatibility (Pathos uncertainty)
            if (relevantDims.some(d => ["geschlecht", "orientierung", "orientierungStatus"].includes(d))) {
                if (pathosCheck?.result === "unsicher") {
                    modifier -= 10;
                    descriptions.push("Unsichere körperliche Anziehung");
                }
            }

            // Orientation status (exploration bonus)
            if (relevantDims.includes("orientierungStatus")) {
                if (person1.orientierungStatus === "interessiert" || person2.orientierungStatus === "interessiert") {
                    if (tagId === "experimentierfreude" || tagId === "sexuelle-offenheit") {
                        modifier += 5;
                        descriptions.push("Explorationsbonus");
                    }
                }
            }

            const finalScore = Math.round(baseScore + modifier);
            return {
                score: finalScore,
                baseScore,
                modifier,
                dims: relevantDims,
                desc: descriptions.length > 0 ? descriptions.join("; ") : "Keine Anpassung"
            };
        }

        // Calculate category with modifiers
        // NOTE: Logic extracted to /js/dimensions/tagCalculator.js
        function calculateCategoryWithModifiers(catLetter, person1, person2, pathosCheck) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagCalculator) {
                return TiageDimensions.TagCalculator.calculateCategoryWithModifiers(catLetter, person1, person2, pathosCheck, data);
            }
            // Fallback: inline implementation for backwards compatibility
            const categoryTags = Object.keys(tagDimensionRelevance).filter(t => getTagCategory(t) === catLetter);

            if (categoryTags.length === 0) {
                const interactionKey = `${person1.archetyp}_${person2.archetyp}`;
                const interaction = data?.interactions[interactionKey];
                return { score: interaction?.scores?.[catLetter]?.value || 50, modifier: 0, tags: [] };
            }

            let totalScore = 0, totalMod = 0;
            const tagDetails = [];

            for (const tagId of categoryTags) {
                const result = calculateTagWithModifiers(tagId, person1, person2, pathosCheck);
                totalScore += result.score;
                totalMod += result.modifier;
                tagDetails.push({ id: tagId, ...result });
            }

            return {
                score: Math.round(totalScore / categoryTags.length),
                modifier: Math.round(totalMod / categoryTags.length),
                tags: tagDetails
            };
        }

        // ========================================
        // NEW: 4-Factor Relationship Quality Model
        // ========================================

        // Factor 1: Archetype Match (40%) - from existing matrix
        function getArchetypeScore(type1, type2) {
            const key = `${type1}_${type2}`;
            const interaction = data?.interactions[key];
            return interaction?.overall || 50;
        }

        // ═══════════════════════════════════════════════════════════════════════
        // Factor 2: Dominance Harmony (20% Gewichtung - Pathos/Gefühl)
        // ═══════════════════════════════════════════════════════════════════════
        // Philosophische Grundlage: OSHO + Metaphysik der Qualität (Pirsig)
        //
        // OSHO: "Nur Extreme können sich wirklich verlieben. Nur Extreme ziehen
        //        sich an. Je weiter sie voneinander entfernt sind, desto tiefer
        //        wird die Anziehung."
        //
        // OSHO: "Es gibt nur eine Energie - Tao. Sie funktioniert auf zwei Arten.
        //        Du kannst Konflikt ODER Harmonie zwischen beiden erschaffen."
        //
        // MOQ (Pirsig): Dynamische Qualität entsteht durch Spannung zwischen
        //               Polen. Statische Qualität bewahrt funktionierende Muster.
        //
        // Werte-Logik:
        // - 100%: Komplementäre Polarität (Dom↔Sub) = maximale dynamische Qualität
        // -  95%: Tao-Balance (Ausgeglichen↔Ausgeglichen) = harmonische Einheit
        // -  90%: Flexible Dynamik (Switch↔Switch) = spielerische Anpassung
        // -  85%: Pol + Balance = stabile Ergänzung
        // -  80%: Switch + Pol = Anpassung möglich, aber Spannung
        // -  60%: Gleiche Pole (Dom↔Dom, Sub↔Sub) = Konflikt, fehlende Spannung
        // ═══════════════════════════════════════════════════════════════════════
        // ═══════════════════════════════════════════════════════════════════════
        // DOMINANZ HARMONY MATRIX
        // ═══════════════════════════════════════════════════════════════════════
        const dominanzHarmonyMatrix = {
            // KOMPLEMENTÄRE POLARITÄT (100%)
            "dominant-submissiv": 100, "submissiv-dominant": 100,
            // TAO-BALANCE (90-95%)
            "ausgeglichen-ausgeglichen": 95, "switch-switch": 90,
            "switch-ausgeglichen": 88, "ausgeglichen-switch": 88,
            // POL + BALANCE (85%)
            "dominant-ausgeglichen": 85, "ausgeglichen-dominant": 85,
            "submissiv-ausgeglichen": 85, "ausgeglichen-submissiv": 85,
            // SWITCH + POL (80%)
            "switch-dominant": 80, "dominant-switch": 80,
            "switch-submissiv": 80, "submissiv-switch": 80,
            // GLEICHE POLE (55%)
            "dominant-dominant": 55, "submissiv-submissiv": 55
        };

        // Calculate harmony between two single dominanz types
        function calculateSingleDominanzHarmony(type1, status1, type2, status2) {
            const key = `${type1}-${type2}`;
            let baseScore = dominanzHarmonyMatrix[key] || dominanzHarmonyMatrix[`${type2}-${type1}`] || 75;

            // STATUS-MODIFIER: Reduzierte Konfidenz bei "interessiert"
            if (status1 === 'interessiert' || status2 === 'interessiert') {
                baseScore = Math.round(baseScore * 0.7);
            }

            return baseScore;
        }

        // Calculate best dominanz harmony for multi-select (finds best combination)
        function calculateDominanceHarmony(domObj1, domObj2) {
            // Handle old single-value format (backwards compatibility)
            if (typeof domObj1 === 'string' || typeof domObj2 === 'string') {
                return calculateSingleDominanzHarmony(domObj1, 'gelebt', domObj2, 'gelebt');
            }

            // Get selected dominanz preferences for each person (Primary/Secondary structure)
            const list1 = [];
            const list2 = [];

            if (domObj1) {
                if (domObj1.primary) list1.push({ type: domObj1.primary, status: 'primary' });
                if (domObj1.secondary) list1.push({ type: domObj1.secondary, status: 'secondary' });
            }

            if (domObj2) {
                if (domObj2.primary) list2.push({ type: domObj2.primary, status: 'primary' });
                if (domObj2.secondary) list2.push({ type: domObj2.secondary, status: 'secondary' });
            }

            // Default if no selections
            if (list1.length === 0 || list2.length === 0) return 75;

            // Find best combination
            let bestScore = 0;
            for (const d1 of list1) {
                for (const d2 of list2) {
                    const score = calculateSingleDominanzHarmony(d1.type, d1.status, d2.type, d2.status);
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }

            return bestScore;
        }

        // Factor 3: Orientation Compatibility (25%) - uses existing checkPhysicalCompatibility
        function calculateOrientationScore(person1, person2) {
            const pathosCheck = checkPhysicalCompatibility(person1, person2);

            if (pathosCheck.result === "unmöglich") {
                return 0;  // K.O.-Kriterium!
            }

            if (pathosCheck.result === "unsicher") {
                return 70;  // Exploration-Phase
            }

            return 100;  // Kompatibel
        }

        // Factor 4: Gender Attraction (15%)
        function calculateGenderAttraction(p1, p2) {
            // Extract primary gender from object format { primary: 'mann', secondary: 'cis' }
            let g1 = p1.geschlecht;
            let g2 = p2.geschlecht;
            let identity1 = null;
            let identity2 = null;

            if (g1 && typeof g1 === 'object' && 'primary' in g1) {
                identity1 = g1.secondary;  // cis, trans, suchend, nonbinaer, fluid
                g1 = g1.primary;           // mann, frau, inter
            }
            if (g2 && typeof g2 === 'object' && 'primary' in g2) {
                identity2 = g2.secondary;
                g2 = g2.primary;
            }

            // Handle Primary/Secondary orientierung structure
            const oriList1 = [];
            const oriList2 = [];

            if (p1.orientierung && typeof p1.orientierung === 'object') {
                if (p1.orientierung.primary) oriList1.push(p1.orientierung.primary);
                if (p1.orientierung.secondary) oriList1.push(p1.orientierung.secondary);
            } else if (p1.orientierung) {
                oriList1.push(p1.orientierung);
            }

            if (p2.orientierung && typeof p2.orientierung === 'object') {
                if (p2.orientierung.primary) oriList2.push(p2.orientierung.primary);
                if (p2.orientierung.secondary) oriList2.push(p2.orientierung.secondary);
            } else if (p2.orientierung) {
                oriList2.push(p2.orientierung);
            }

            // Return default if values missing
            if (!g1 || !g2 || oriList1.length === 0 || oriList2.length === 0) return 75;

            // Check best combination for base score
            let bestScore = 0;

            for (const o1 of oriList1) {
                for (const o2 of oriList2) {
                    const score = calculateSingleGenderAttraction(g1, o1, g2, o2);
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }

            // Apply Identity Resonance (cis/trans/suchend) if both identities are set
            if (identity1 && identity2) {
                const identityFactor = calculateIdentityResonance(identity1, identity2);
                // Combine: 70% base attraction + 30% identity resonance
                bestScore = Math.round(bestScore * 0.7 + identityFactor * 0.3);
            }

            return bestScore;
        }

        // Calculate Identity Resonance using IDENTITY_MATRIX from constants
        function calculateIdentityResonance(id1, id2) {
            // Use TiageSynthesis constants if available
            const IDENTITY_MATRIX = (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants?.IDENTITY_MATRIX) || {
                "cis-cis": 100,
                "cis-trans": 85,
                "cis-suchend": 70,
                "trans-cis": 85,
                "trans-trans": 100,
                "trans-suchend": 75,
                "nonbinaer-nonbinaer": 100,
                "nonbinaer-fluid": 90,
                "nonbinaer-suchend": 80,
                "fluid-nonbinaer": 90,
                "fluid-fluid": 100,
                "fluid-suchend": 85,
                "suchend-cis": 70,
                "suchend-trans": 75,
                "suchend-nonbinaer": 80,
                "suchend-fluid": 85,
                "suchend-suchend": 100,
                "cis-nonbinaer": 65,
                "cis-fluid": 55,
                "trans-nonbinaer": 75,
                "trans-fluid": 65,
                "nonbinaer-cis": 65,
                "nonbinaer-trans": 75,
                "fluid-cis": 55,
                "fluid-trans": 65
            };

            const IDENTITY_OPENNESS = (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants?.IDENTITY_OPENNESS) || {
                "cis": 0,
                "trans": 30,
                "nonbinaer": 50,
                "fluid": 80,
                "suchend": 100
            };

            // Get base score from matrix
            const key = `${id1}-${id2}`;
            let baseScore = IDENTITY_MATRIX[key];

            // Fallback for unknown combinations
            if (baseScore === undefined) {
                baseScore = 75;
            }

            // Calculate openness bonus
            const openness1 = IDENTITY_OPENNESS[id1] || 0;
            const openness2 = IDENTITY_OPENNESS[id2] || 0;
            const opennessBonus = Math.round((openness1 + openness2) / 200 * 10); // Max 10 points

            return Math.min(100, baseScore + opennessBonus);
        }

        // Helper for single orientierung pair - nutzt Geschlechts-Kategorien
        function calculateSingleGenderAttraction(g1, o1, g2, o2) {
            // Konvertiere Geschlechter zu Kategorien für die Logik
            const cat1 = getGeschlechtCategory(g1);
            const cat2 = getGeschlechtCategory(g2);

            // Bi = immer 100% (angezogen von männlich und weiblich)
            if (o1 === "bisexuell" || o2 === "bisexuell") return 100;

            // Hetero: Angezogen vom "anderen" Geschlecht
            if (o1 === "heterosexuell" && o2 === "heterosexuell") {
                if ((cat1 === "maennlich" && cat2 === "weiblich") ||
                    (cat1 === "weiblich" && cat2 === "maennlich")) return 100;
                // Nonbinär, Fluid, Agender - partielle Kompatibilität
                if (cat1 === "nonbinaer" || cat2 === "nonbinaer" ||
                    cat1 === "fluid" || cat2 === "fluid") return 80;
                if (cat1 === "agender" || cat2 === "agender") return 60;
                return 0;
            }

            // Homo: Angezogen vom "gleichen" Geschlecht
            if (o1 === "homosexuell" && o2 === "homosexuell") {
                if (cat1 === cat2 && cat1 !== "nonbinaer" && cat1 !== "fluid" && cat1 !== "agender") return 100;
                // Nonbinär mit Homo - angezogen von ähnlichen
                if ((cat1 === "nonbinaer" && cat2 === "nonbinaer") ||
                    (cat1 === "fluid" && cat2 === "fluid")) return 90;
                if (cat1 === "nonbinaer" || cat2 === "nonbinaer" ||
                    cat1 === "fluid" || cat2 === "fluid") return 75;
                if (cat1 === "agender" || cat2 === "agender") return 60;
                return 0;
            }

            return 75;  // Gemischte Orientierungen
        }

        // ═══════════════════════════════════════════════════════════════════════
        // RESONANZ-BERECHNUNG (Meta-Dimension)
        // ═══════════════════════════════════════════════════════════════════════
        // R = 0.9 + [(M/100 × 0.5) + (B × 0.5)] × 0.2
        // wobei:
        //   M = Profil-Match (0-100%): Übereinstimmung der 30 Attribute
        //   B = Balance (0-1): Harmonie zwischen Logos und Pathos
        // Ergebnis: R zwischen 0.9 und 1.1
        // ═══════════════════════════════════════════════════════════════════════

        // Die 30 Profil-Attribute in 3 Kategorien
        const PROFILE_ATTRIBUTES = {
            D: ['kinderWunsch', 'eheWunsch', 'wohnform', 'religion', 'karrierePrioritaet',
                'finanzPhilosophie', 'lebensstil', 'umzugsbereitschaft', 'zukunftsplanung', 'traditionenWichtigkeit'],
            E: ['kommunikationsstil', 'konfliktverhalten', 'emotionaleOffenheit', 'gespraechsBedürfnis', 'feedbackStil',
                'entschuldigungen', 'streitVerhalten', 'versoehnung', 'kritikAnnehmen', 'humorKonflikte'],
            F: ['introExtro', 'familieWichtigkeit', 'freundeskreis', 'oeffentlichkeit', 'alleinzeit',
                'events', 'reisen', 'hobbys', 'wochenende', 'netzwerkGroesse']
        };

        /**
         * Berechnet den Profil-Match-Score (M)
         * Vergleicht die 30 Attribute zweier psychologischer Profile
         * Nutzt TiageProfileStore für 648 P/S-basierte Profile
         * @returns {number} Match-Prozent 0-100
         */
        function calculateProfilMatch(person1, person2) {
            // TiageProfileStore verfügbar?
            if (typeof TiageProfileStore === 'undefined') {
                // Fallback: Schätze Match basierend auf Archetyp-Ähnlichkeit
                return estimateProfilMatch(person1, person2);
            }

            // Profile aus TiageProfileStore laden (synchron)
            const profile1 = getProfileFromStore(person1);
            const profile2 = getProfileFromStore(person2);

            if (!profile1 || !profile2) {
                return estimateProfilMatch(person1, person2);
            }

            // Zähle übereinstimmende Attribute
            let matches = 0;
            const allAttributes = [...PROFILE_ATTRIBUTES.D, ...PROFILE_ATTRIBUTES.E, ...PROFILE_ATTRIBUTES.F];
            const attrs1 = profile1.attributes || profile1;
            const attrs2 = profile2.attributes || profile2;

            for (const attr of allAttributes) {
                if (attrs1[attr] && attrs2[attr]) {
                    if (attrs1[attr] === attrs2[attr]) {
                        matches++;
                    } else if (areAttributesCompatible(attr, attrs1[attr], attrs2[attr])) {
                        matches += 0.5; // Partielle Übereinstimmung
                    }
                }
            }

            return Math.round((matches / 30) * 100);
        }

        /**
         * Lädt ein Profil aus TiageProfileStore basierend auf Person-Daten
         */
        function getProfileFromStore(person) {
            // P/S-Geschlecht extrahieren
            let pGender = null;
            let sGender = null;

            if (person.geschlecht && typeof person.geschlecht === 'object') {
                pGender = person.geschlecht.primary;
                sGender = person.geschlecht.secondary;
            } else if (typeof person.geschlecht === 'string') {
                // Legacy: String direkt als P, kein S
                pGender = person.geschlecht;
            }

            // Dominanz extrahieren
            let dominanz = 'ausgeglichen';
            if (person.dominanz && typeof person.dominanz === 'object') {
                if ('primary' in person.dominanz) {
                    dominanz = person.dominanz.primary || 'ausgeglichen';
                }
            } else if (person.dominanz) {
                dominanz = person.dominanz;
            }

            // Orientierung extrahieren
            let orientierung = 'heterosexuell';
            if (person.orientierung && typeof person.orientierung === 'object') {
                if ('primary' in person.orientierung) {
                    orientierung = person.orientierung.primary || 'heterosexuell';
                }
            } else if (person.orientierung) {
                orientierung = person.orientierung;
            }

            // Profil aus Store holen (synchron)
            if (pGender && sGender) {
                return TiageProfileStore.getProfileSync(
                    person.archetyp,
                    pGender,
                    sGender,
                    dominanz,
                    orientierung
                );
            }

            return null;
        }

        /**
         * Schätzt den Profil-Match wenn keine exakten Profile verfügbar
         * Basiert auf Archetyp-Ähnlichkeit und Dimension-Übereinstimmungen
         */
        function estimateProfilMatch(person1, person2) {
            let score = 50; // Basis

            // Gleicher Archetyp = +30
            if (person1.archetyp === person2.archetyp) {
                score += 30;
            } else {
                // Ähnliche Archetypen (aus Matrix ableitbar)
                const archetypeScore = getArchetypeScore(person1.archetyp, person2.archetyp);
                score += Math.round((archetypeScore - 50) * 0.3);
            }

            // Gleiche Dominanz-Orientierung = +10
            const dom1 = getPrimaryDominanz(person1.dominanz);
            const dom2 = getPrimaryDominanz(person2.dominanz);
            if (dom1 === dom2) score += 10;

            // Ähnliche Orientierung = +10
            const ori1 = getPrimaryOrientierung(person1.orientierung);
            const ori2 = getPrimaryOrientierung(person2.orientierung);
            if (ori1 === ori2) score += 10;

            return Math.min(100, Math.max(0, score));
        }

        /**
         * Prüft ob zwei Attribut-Werte kompatibel sind (partielle Übereinstimmung)
         */
        function areAttributesCompatible(attr, val1, val2) {
            // Kompatibilitäts-Gruppen für bestimmte Attribute
            const compatGroups = {
                'wohnform': [['alleine', 'zusammen'], ['getrennt', 'zusammen']],
                'lebensstil': [['durchschnittlich', 'bescheiden'], ['durchschnittlich', 'luxuriös']],
                'kommunikationsstil': [['direkt', 'ausgewogen'], ['indirekt', 'ausgewogen']],
                'introExtro': [['ambivert', 'introvertiert'], ['ambivert', 'extrovertiert']]
            };

            if (compatGroups[attr]) {
                for (const group of compatGroups[attr]) {
                    if (group.includes(val1) && group.includes(val2)) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Helper: Primäre Dominanz aus Objekt ermitteln
         */
        function getPrimaryDominanz(dominanz) {
            if (!dominanz || typeof dominanz !== 'object') return dominanz || 'ausgeglichen';
            // New format: { primary: 'dominant', secondary: 'submissiv' }
            if ('primary' in dominanz) {
                return dominanz.primary || 'ausgeglichen';
            }
            // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
            for (const [type, status] of Object.entries(dominanz)) {
                if (status === 'gelebt') return type;
            }
            return 'ausgeglichen';
        }

        /**
         * Helper: Primäre Orientierung aus Objekt ermitteln
         */
        function getPrimaryOrientierung(orientierung) {
            if (!orientierung || typeof orientierung !== 'object') return orientierung || 'heterosexuell';
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in orientierung) {
                return orientierung.primary || 'heterosexuell';
            }
            // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
            for (const [type, status] of Object.entries(orientierung)) {
                if (status === 'gelebt') return type;
            }
            return 'heterosexuell';
        }

        /**
         * Berechnet die Logos-Pathos-Balance (B)
         * B = (100 - |Logos - Pathos|) / 100
         * @returns {number} Balance 0.0-1.0
         */
        function calculateLogosPathosBalance(archetypeScore, orientationScore, dominanceScore, genderScore) {
            // Logos = Archetyp-Score
            const logos = archetypeScore;

            // Pathos = Durchschnitt der drei Pathos-Faktoren
            const pathos = (orientationScore + dominanceScore + genderScore) / 3;

            // Differenz
            const differenz = Math.abs(logos - pathos);

            // Balance: Je geringer die Differenz, desto höher die Balance
            const balance = (100 - differenz) / 100;

            return Math.max(0, Math.min(1, balance));
        }

        /**
         * Berechnet den Resonanz-Koeffizienten (R)
         * R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
         *
         * K = GFK-Kommunikationsfaktor (0-1)
         *     - Beide hoch: 1.0
         *     - Hoch+Mittel: 0.75
         *     - Beide mittel: 0.5
         *     - Asymmetrisch: 0.25
         *     - Beide niedrig: 0.0
         *
         * @returns {object} { R: 0.9-1.1, M: 0-100, B: 0-1, K: 0-1, interpretation: string }
         */
        function calculateResonanz(person1, person2, archetypeScore, orientationScore, dominanceScore, genderScore) {
            // Komponente 1: Profil-Match (M)
            const M = calculateProfilMatch(person1, person2);

            // Komponente 2: Logos-Pathos-Balance (B)
            const B = calculateLogosPathosBalance(archetypeScore, orientationScore, dominanceScore, genderScore);

            // Komponente 3: GFK-Kommunikationsfaktor (K) mit K1-K4 Subfaktoren
            const kResult = calculateGfkFactor();
            const K = kResult.K;  // Gesamt-K für Formel

            // Gesamtformel: R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
            // GFK bekommt 30% weil Kommunikation fundamental für Resonanz ist
            const R = 0.9 + ((M / 100 * 0.35) + (B * 0.35) + (K * 0.30)) * 0.2;

            // Interpretation
            let interpretation;
            if (R >= 1.08) {
                interpretation = 'Starke Harmonie';
            } else if (R >= 1.03) {
                interpretation = 'Leichte Harmonie';
            } else if (R >= 0.97) {
                interpretation = 'Neutral';
            } else if (R >= 0.93) {
                interpretation = 'Leichte Dissonanz';
            } else {
                interpretation = 'Starke Dissonanz';
            }

            return {
                R: Math.round(R * 100) / 100,
                M: M,
                B: Math.round(B * 100) / 100,
                K: K,
                K1: kResult.K1,  // Orientierung-Bedürfnisse
                K2: kResult.K2,  // Archetyp-Bedürfnisse
                K3: kResult.K3,  // Dominanz-Bedürfnisse
                K4: kResult.K4,  // Geschlecht-Bedürfnisse
                kompetenz: kResult.kompetenz,
                kompetenzLabel: kResult.kompetenzLabel,
                interpretation: interpretation
            };
        }

        /**
         * K-FAKTOR ZUORDNUNG: GFK-Kategorien zu den 4 Hauptfaktoren
         * ═══════════════════════════════════════════════════════════════════════
         * Basiert auf Tiage-Modell (Pathos/Logos) + GFK (Rosenberg)
         */
        const K_FAKTOR_KATEGORIEN = {
            // K1: Orientierung (Pathos) - Körperliche Anziehung, Sexualität
            K1: ['existenz', 'zuneigung', 'musse'],  // 22 Bedürfnisse

            // K2: Archetyp (Logos) - Beziehungsphilosophie
            K2: ['freiheit', 'teilnahme', 'identitaet'],  // 26 Bedürfnisse

            // K3: Dominanz (Pathos) - Energetische Dynamik
            K3: ['dynamik', 'sicherheit'],  // 21 Bedürfnisse

            // K4: Geschlecht (Pathos) - Gender-Chemie, Identität
            K4: ['verstaendnis', 'erschaffen', 'verbundenheit']  // 19 Bedürfnisse
        };

        /**
         * Berechnet den Bedürfnis-Match für eine K-Kategorie
         * @param {string} kKey - 'K1', 'K2', 'K3' oder 'K4'
         * @param {object} matching - Das Matching-Ergebnis von GfkBeduerfnisse.berechneMatching
         * @returns {number} 0-1, wobei 1 = perfekte Übereinstimmung
         */
        function calculateKSubfaktor(kKey, matching) {
            if (!matching || !matching.details) return 0.5;  // Fallback

            const kategorien = K_FAKTOR_KATEGORIEN[kKey];
            if (!kategorien) return 0.5;

            let gemeinsam = 0;
            let total = 0;

            // Zähle gemeinsame und unterschiedliche Bedürfnisse pro Kategorie
            const uebereinstimmend = matching.details.uebereinstimmend || [];
            const konflikt = matching.details.konflikt || [];

            for (const kat of kategorien) {
                const gemeinsamInKat = uebereinstimmend.filter(b => {
                    const def = GfkBeduerfnisse?.definitionen?.[b.id];
                    return def?.kategorie === kat;
                }).length;

                const konfliktInKat = konflikt.filter(b => {
                    const def = GfkBeduerfnisse?.definitionen?.[b.id];
                    return def?.kategorie === kat;
                }).length;

                gemeinsam += gemeinsamInKat;
                total += gemeinsamInKat + konfliktInKat;
            }

            // Wenn keine Bedürfnisse in dieser Kategorie: neutral
            if (total === 0) return 0.5;

            return gemeinsam / total;
        }

        /**
         * Berechnet den GFK-Kommunikationsfaktor (K) mit K1-K4 Subfaktoren
         * K = (K1 + K2 + K3 + K4) / 4
         *
         * Jeder Ki basiert auf dem Bedürfnis-Match der relevanten GFK-Kategorien:
         * - K1 (Orientierung): existenz, zuneigung, musse
         * - K2 (Archetyp): freiheit, teilnahme, identitaet
         * - K3 (Dominanz): dynamik, sicherheit
         * - K4 (Geschlecht): verstaendnis, erschaffen, verbundenheit
         *
         * @returns {object} { K: 0-1, K1, K2, K3, K4, details }
         */
        function calculateGfkFactor() {
            const ichGfk = personDimensions.ich?.gfk;
            const partnerGfk = personDimensions.partner?.gfk;

            // Basis-Kompetenz-Faktor (alte Logik als Fallback/Gewichtung)
            let kompetenzFaktor = 0.5;
            if (ichGfk && partnerGfk) {
                const gfkValues = { 'hoch': 3, 'mittel': 2, 'niedrig': 1 };
                const v1 = gfkValues[ichGfk] || 2;
                const v2 = gfkValues[partnerGfk] || 2;
                const sum = v1 + v2;
                const min = Math.min(v1, v2);

                if (sum === 6) kompetenzFaktor = 1.0;
                else if (sum === 5) kompetenzFaktor = 0.75;
                else if (sum === 4 && min === 2) kompetenzFaktor = 0.5;
                else if (sum === 4 && min === 1) kompetenzFaktor = 0.35;
                else if (sum === 3) kompetenzFaktor = 0.2;
                else kompetenzFaktor = 0.0;
            }

            // Bedürfnis-Matching berechnen
            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');

            let K1 = 0.5, K2 = 0.5, K3 = 0.5, K4 = 0.5;
            let matching = null;

            if (typeof GfkBeduerfnisse !== 'undefined' && ichArchetyp && partnerArchetyp) {
                matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);

                if (matching && !matching.fehler) {
                    K1 = calculateKSubfaktor('K1', matching);
                    K2 = calculateKSubfaktor('K2', matching);
                    K3 = calculateKSubfaktor('K3', matching);
                    K4 = calculateKSubfaktor('K4', matching);
                }
            }

            // Gesamt-K: Durchschnitt der 4 Subfaktoren, gewichtet mit Kompetenz
            // K = Bedürfnis-Match × Kompetenz-Multiplikator
            const beduerfnisMatch = (K1 + K2 + K3 + K4) / 4;
            const K = beduerfnisMatch * (0.5 + kompetenzFaktor * 0.5);  // Kompetenz skaliert 0.5-1.0

            return {
                K: Math.round(K * 100) / 100,
                K1: Math.round(K1 * 100) / 100,
                K2: Math.round(K2 * 100) / 100,
                K3: Math.round(K3 * 100) / 100,
                K4: Math.round(K4 * 100) / 100,
                kompetenz: kompetenzFaktor,
                kompetenzLabel: ichGfk && partnerGfk ? `${ichGfk} + ${partnerGfk}` : 'nicht gesetzt',
                beduerfnisMatch: Math.round(beduerfnisMatch * 100) / 100
            };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // HAUPTBERECHNUNG: 5-Faktoren Beziehungsqualität (inkl. Resonanz)
        // ═══════════════════════════════════════════════════════════════════════
        // Philosophische Grundlage: Tiage-Modell + MOQ (Pirsig) + OSHO
        //
        // GEWICHTUNG LOGOS vs. PATHOS (40:60)
        // ────────────────────────────────────
        // Pirsig (MOQ): "Qualität ist die Quelle von Subjekt und Objekt."
        //               Statische Qualität (Logos) = Fundament, bewahrt Muster
        //               Dynamische Qualität (Pathos) = Antrieb, erzeugt Anziehung
        //
        // OSHO: "Balance zwischen allen Polaritäten ist Gesundheit."
        //       "Gefühl ist der Antrieb, Verstand gibt Struktur."
        //
        // Tiage: Verbindet rationale Reflexion (Logos) mit emotionaler
        //        Resonanz (Pathos) zu einem ganzheitlichen Modell.
        //
        // FAKTOR-BEGRÜNDUNG:
        // ────────────────────────────────────
        // 1. Orientierung (40% - Pathos/Gefühl):
        //    → Körperliche Anziehungsmöglichkeit
        //    → Dynamische Qualität: Polarität der Begierde
        //    → OSHO: "Extreme ziehen sich an"
        //    → Höchste Gewichtung: Menschen erleben Beziehung zuerst körperlich
        //
        // 2. Archetyp (25% - Logos/Verstand):
        //    → Fundamentale Beziehungsphilosophie
        //    → Statische Qualität: "Wie wollen wir Beziehung leben?"
        //    → Die Archetyp-Frage stellt sich NACH den Pathos-Faktoren
        //
        // 3. Dominanz (20% - Pathos/Gefühl):
        //    → Energetische Dynamik der Interaktion
        //    → Dynamische Qualität: Führen/Folgen-Balance
        //    → OSHO: "Tao - eine Energie, zwei Ausdrucksformen"
        //
        // 4. Geschlecht (15% - Pathos/Gefühl):
        //    → Gender-Chemie als Feinabstimmung
        //    → Ergänzt Orientierung mit Nuancen (z.B. non-binär)
        //    → Niedrigste Gewichtung
        //
        // SUMME: Pathos 75% + Logos 25% = 100%
        // → "Pathos vor Logos" - Das Erleben kommt vor der Interpretation
        // ═══════════════════════════════════════════════════════════════════════
        function calculateRelationshipQuality(person1, person2) {
            // ═══════════════════════════════════════════════════════════════════
            // TIAGE RECHENMODELL v2.0 - Direkte Resonanz-Modulation
            // ═══════════════════════════════════════════════════════════════════
            // Formel: Score = (O × 0.40 × R1) + (A × 0.25 × R2) + (D × 0.20 × R3) + (G × 0.15 × R4)
            //
            // Ri = 0.5 + Bedürfnis-Match-i (Range: 0.5 - 1.5)
            // → 0% Match  = 0.5 (schwächt ab)
            // → 50% Match = 1.0 (neutral)
            // → 100% Match = 1.5 (verstärkt)

            const orientationScore = calculateOrientationScore(person1, person2);

            if (orientationScore === 0) {
                return {
                    score: 0,
                    blocked: true,
                    reason: "Keine körperliche Anziehung möglich",
                    breakdown: {
                        archetyp: 0,
                        dominanz: 0,
                        orientierung: 0,
                        geschlecht: 0
                    },
                    resonanz: { R1: 0.5, R2: 0.5, R3: 0.5, R4: 0.5, GFK: 0.5 }
                };
            }

            // ═══════════════════════════════════════
            // SCHRITT 1: Basis-Faktoren (0-100)
            // ═══════════════════════════════════════
            const archetypeScore = getArchetypeScore(person1.archetyp, person2.archetyp);
            const dominanceScore = calculateDominanceHarmony(person1.dominanz, person2.dominanz);
            const genderScore = calculateGenderAttraction(person1, person2);

            // ═══════════════════════════════════════
            // SCHRITT 2: Resonanz-Faktoren R1-R4 (0.5-1.5)
            // ═══════════════════════════════════════
            // Basierend auf 88 Bedürfnissen, aufgeteilt nach Faktor

            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');

            let R1 = 1.0, R2 = 1.0, R3 = 1.0, R4 = 1.0;  // Default: neutral
            let matching = null;

            if (typeof GfkBeduerfnisse !== 'undefined' && ichArchetyp && partnerArchetyp) {
                matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);

                if (matching && !matching.fehler) {
                    // Berechne Bedürfnis-Match pro Kategorie (0-1)
                    const match1 = calculateKSubfaktor('K1', matching);  // Orientierung
                    const match2 = calculateKSubfaktor('K2', matching);  // Archetyp
                    const match3 = calculateKSubfaktor('K3', matching);  // Dominanz
                    const match4 = calculateKSubfaktor('K4', matching);  // Geschlecht

                    // Skaliere auf 0.5-1.5
                    R1 = 0.5 + match1;
                    R2 = 0.5 + match2;
                    R3 = 0.5 + match3;
                    R4 = 0.5 + match4;
                }
            }

            // ═══════════════════════════════════════
            // SCHRITT 3: Score-Berechnung mit Resonanz
            // ═══════════════════════════════════════
            // Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
            // Gewichtungen aus localStorage (Standard: 40/25/20/15)

            const gew = typeof getGewichtungen === 'function' ? getGewichtungen() : { O: 40, A: 25, D: 20, G: 15 };
            const wO = gew.O / 100;
            const wA = gew.A / 100;
            const wD = gew.D / 100;
            const wG = gew.G / 100;

            const scoreO = orientationScore * wO * R1;
            const scoreA = archetypeScore * wA * R2;
            const scoreD = dominanceScore * wD * R3;
            const scoreG = genderScore * wG * R4;

            const totalScore = scoreO + scoreA + scoreD + scoreG;

            // GFK-Kompetenz = Durchschnitt R1-R4
            const GFK = (R1 + R2 + R3 + R4) / 4;

            // ═══════════════════════════════════════
            // SCHRITT 4: Meta-Faktoren (für UI)
            // ═══════════════════════════════════════
            const M = calculateProfilMatch(person1, person2);
            const B = calculateLogosPathosBalance(archetypeScore, orientationScore, dominanceScore, genderScore);

            // Logos/Pathos Breakdown für UI
            const logos = archetypeScore;
            const pathos = (orientationScore + dominanceScore + genderScore) / 3;

            return {
                score: Math.round(totalScore * 10) / 10,  // Eine Dezimalstelle
                blocked: false,
                breakdown: {
                    archetyp: archetypeScore,
                    dominanz: dominanceScore,
                    orientierung: orientationScore,
                    geschlecht: genderScore
                },
                resonanz: {
                    R1: Math.round(R1 * 100) / 100,
                    R2: Math.round(R2 * 100) / 100,
                    R3: Math.round(R3 * 100) / 100,
                    R4: Math.round(R4 * 100) / 100,
                    GFK: Math.round(GFK * 100) / 100,
                    M: M,
                    B: Math.round(B * 100) / 100
                },
                scoreDetails: {
                    O: Math.round(scoreO * 10) / 10,
                    A: Math.round(scoreA * 10) / 10,
                    D: Math.round(scoreD * 10) / 10,
                    G: Math.round(scoreG * 10) / 10
                },
                gewichtungen: {
                    O: gew.O,
                    A: gew.A,
                    D: gew.D,
                    G: gew.G
                },
                logos: logos,
                pathos: pathos
            };
        }

        // Calculate overall with 4-factor model + category details for UI
        function calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck) {
            // Use new 4-factor model for overall score
            const qualityResult = calculateRelationshipQuality(person1, person2);

            // Calculate category scores for UI display (radar chart, category bars)
            const categories = {};

            // Category A: Philosophy score from matrix
            categories.A = { score: logosCheck.score, modifier: 0, note: "Rein archetyp-basiert" };

            // Other categories with modifiers (for UI display)
            for (const cat of ['B', 'C', 'D', 'E', 'F']) {
                const result = calculateCategoryWithModifiers(cat, person1, person2, pathosCheck);
                categories[cat] = result;
            }

            return {
                overall: qualityResult.score,  // NEW: 4-factor score
                categories,                     // Keep for UI
                breakdown: qualityResult.breakdown  // NEW: factor breakdown
            };
        }

        // Get modifier summary for UI
        function getModifierSummary(person1, person2) {
            const summaries = [];
            const domMod = getDominanzModifier(person1.dominanz, person2.dominanz);
            if (domMod !== 0) {
                summaries.push({
                    type: "Dominanz",
                    modifier: domMod,
                    description: getDominanzDescription(person1.dominanz, person2.dominanz, domMod)
                });
            }
            return summaries;
        }

        // ========================================
        // NEW: Side-by-Side Comparison Functions
        // ========================================

        // Navigate through archetypes with forward/backward buttons
        function navigateArchetype(person, direction) {
            const selectId = person === 'ich' ? 'ichSelect' : 'partnerSelect';
            const mobileSelectId = person === 'ich' ? 'mobileIchSelect' : 'mobilePartnerSelect';
            const select = document.getElementById(selectId);
            const mobileSelect = document.getElementById(mobileSelectId);

            // Use whichever select is visible/available
            const activeSelect = select || mobileSelect;
            if (!activeSelect) return;

            const currentIndex = activeSelect.selectedIndex;
            const optionsCount = activeSelect.options.length;
            let newIndex = currentIndex + direction;

            // Wrap around
            if (newIndex < 0) newIndex = optionsCount - 1;
            if (newIndex >= optionsCount) newIndex = 0;

            // Update both desktop and mobile selects
            if (select) select.selectedIndex = newIndex;
            if (mobileSelect) mobileSelect.selectedIndex = newIndex;

            // Update global state variables
            const newValue = activeSelect.options[newIndex].value;
            if (person === 'ich') {
                currentArchetype = newValue;
                mobileIchArchetype = newValue;
            } else {
                selectedPartner = newValue;
                mobilePartnerArchetype = newValue;
            }

            // Trigger change event on the active select
            activeSelect.dispatchEvent(new Event('change'));

            // Update archetype grid
            updateArchetypeGrid(person, newValue);
        }

        // Function to select archetype from grid click
        function selectArchetypeFromGrid(person, archetype) {
            const selectId = person === 'ich' ? 'ichSelect' : 'partnerSelect';
            const mobileSelectId = person === 'ich' ? 'mobileIchSelect' : 'mobilePartnerSelect';
            const select = document.getElementById(selectId);
            const mobileSelect = document.getElementById(mobileSelectId);

            // Update select elements
            if (select) {
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].value === archetype) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
            if (mobileSelect) {
                for (let i = 0; i < mobileSelect.options.length; i++) {
                    if (mobileSelect.options[i].value === archetype) {
                        mobileSelect.selectedIndex = i;
                        break;
                    }
                }
            }

            // Update global state variables
            if (person === 'ich') {
                currentArchetype = archetype;
                mobileIchArchetype = archetype;
            } else {
                selectedPartner = archetype;
                mobilePartnerArchetype = archetype;
            }

            // Update archetype grid highlighting
            updateArchetypeGrid(person, archetype);

            // Trigger change event
            const activeSelect = select || mobileSelect;
            if (activeSelect) {
                activeSelect.dispatchEvent(new Event('change'));
            }
        }

        // Function to update archetype grid highlighting
        function updateArchetypeGrid(person, archetype) {
            // Desktop grid IDs
            const gridId = person === 'ich' ? 'ich-archetype-grid' : 'partner-archetype-grid';
            // Mobile grid IDs
            const mobileGridId = person === 'ich' ? 'mobile-ich-archetype-grid' : 'mobile-partner-archetype-grid';

            // Update all grids (desktop and mobile)
            [gridId, mobileGridId].forEach(id => {
                const grid = document.getElementById(id);
                if (!grid) return;

                // Remove active class from all items
                grid.querySelectorAll('.archetype-symbol-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Add active class to selected item
                const selectedItem = grid.querySelector(`.archetype-symbol-item[data-archetype="${archetype}"]`);
                if (selectedItem) {
                    selectedItem.classList.add('active');
                }
            });
        }

        // Navigation auf Seite 2 (Ergebnis) - ruft navigateArchetype auf und aktualisiert Seite 2
        function navigateArchetypeOnPage2(person, direction) {
            navigateArchetype(person, direction);
            // Seite 2 explizit aktualisieren
            updateMobileResultPage();
        }

        // Navigation auf Seite 3 (Kategorien) - ruft navigateArchetype auf und aktualisiert Seite 3
        function navigateArchetypeOnPage3(person, direction) {
            navigateArchetype(person, direction);
            // Seite 3 explizit aktualisieren
            updateMobilePage3();
        }

        // Aktualisiert die Anzeige auf Mobile Seite 3
        function updateMobilePage3() {
            const ichArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];

            const ichEl = document.getElementById('mobileResultIch3');
            const partnerEl = document.getElementById('mobileResultPartner3');

            if (ichEl) ichEl.textContent = ichArch?.name || currentArchetype;
            if (partnerEl) partnerEl.textContent = partnerArch?.name || selectedPartner;
        }

        // Variable für aktuelle Kategorie im Modal
        let currentDisplayedCategory = 'A';

        // Navigation für CategoryModal - wechselt beide Archetypen (ICH)
        function navigateCategoryArchetype(direction) {
            navigateArchetype('ich', direction);
            // CategoryModal neu laden mit aktueller Kategorie
            showCategoryDetails(currentDisplayedCategory);
            // Alle Ansichten aktualisieren
            updateComparisonView();
        }

        function initComparisonLayout() {
            // ICH select
            const ichSelect = document.getElementById('ichSelect');
            if (ichSelect) {
                ichSelect.addEventListener('change', (e) => {
                    currentArchetype = e.target.value;
                    mobileIchArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('ich', e.target.value);
                    }
                    // Sync with old select if exists
                    const oldSelect = document.getElementById('archetypeSelect');
                    if (oldSelect) oldSelect.value = e.target.value;
                    updateArchetypeGrid('ich', e.target.value);
                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // Partner select
            const partnerSelect = document.getElementById('partnerSelect');
            if (partnerSelect) {
                partnerSelect.addEventListener('change', (e) => {
                    selectedPartner = e.target.value;
                    mobilePartnerArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('partner', e.target.value);
                    }
                    updateArchetypeGrid('partner', e.target.value);
                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // ICH compact dimensions
            document.querySelectorAll('input[name="ich-geschlecht-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('ich', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="ich-dominanz-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('ich', e.target.value);
                });
            });
            document.querySelectorAll('input[name="ich-dominanz-status-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    personDimensions.ich.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    updateAnalysisOverview();
                    updateComparisonView();
                });
            });

            // Partner compact dimensions
            document.querySelectorAll('input[name="partner-geschlecht-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('partner', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="partner-dominanz-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('partner', e.target.value);
                });
            });
            document.querySelectorAll('input[name="partner-dominanz-status-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    personDimensions.partner.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    updateAnalysisOverview();
                    updateComparisonView();
                });
            });

            // Initial Score-Circle Update beim Start
            updateComparisonView();
        }

        function updateComparisonView() {
            if (!data) return;

            const ichArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];

            // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen
            updateGfkFromArchetypes();

            // Update type names
            document.getElementById('resultIchType').textContent = ichArch?.name || currentArchetype;
            document.getElementById('resultPartnerType').textContent = partnerArch?.name || selectedPartner;

            // Calculate compatibility
            const person1 = { archetyp: currentArchetype, ...personDimensions.ich };
            const person2 = { archetyp: selectedPartner, ...personDimensions.partner };

            const pathosCheck = checkPhysicalCompatibility(person1, person2);
            const logosCheck = calculatePhilosophyCompatibility(currentArchetype, selectedPartner);

            // Update warnings
            const warningsContainer = document.getElementById('warningsContainer');
            warningsContainer.innerHTML = '';

            if (pathosCheck.result === 'unvollständig') {
                let warningHTML = '<div class="warning-box incomplete-warning">⚠️ Es fehlt noch:';
                if (pathosCheck.missingItems && pathosCheck.missingItems.length > 0) {
                    warningHTML += '<ul style="margin: 5px 0 0 20px; padding: 0;">';
                    pathosCheck.missingItems.forEach(item => {
                        warningHTML += `<li>${item}</li>`;
                    });
                    warningHTML += '</ul>';
                }
                warningHTML += '</div>';
                warningsContainer.innerHTML = warningHTML;
            } else if (pathosCheck.result === 'unmöglich') {
                warningsContainer.innerHTML = `<div class="warning-box pathos-warning">🚫 Keine emotionale/körperliche Anziehung: ${pathosCheck.reason}</div>`;
            } else if (pathosCheck.result === 'unsicher') {
                warningsContainer.innerHTML = `<div class="warning-box logos-warning">⚠️ Unsichere körperliche Anziehung (Exploration-Phase)</div>`;
            }

            // Warnung bei unsicherem Dominanz-Status (prüfe ob mindestens eine Auswahl "interessiert" ist)
            const hasInteressiert1 = person1.dominanz && Object.values(person1.dominanz).some(s => s === 'interessiert');
            const hasInteressiert2 = person2.dominanz && Object.values(person2.dominanz).some(s => s === 'interessiert');
            if (hasInteressiert1 || hasInteressiert2) {
                warningsContainer.innerHTML += `<div class="warning-box logos-warning">⚠️ Unsichere Dominanz-Dynamik (Exploration-Phase – reduzierte Konfidenz)</div>`;
            }

            if (logosCheck.score < 50) {
                warningsContainer.innerHTML += `<div class="warning-box logos-warning">⚠️ Verstandsebene-Warnung: Philosophie nur ${logosCheck.score}</div>`;
            }

            // If dimensions incomplete, show empty state and return
            if (pathosCheck.result === 'unvollständig') {
                // Clear all expandable sections
                const percentage = document.getElementById('resultPercentage');
                const progressFill = document.getElementById('resultProgressFill');
                percentage.textContent = '–';
                percentage.className = 'result-percentage';
                progressFill.style.width = '0%';

                // Update desktop circle for incomplete state
                const desktopCircle = document.getElementById('desktopCirclePercentage');
                if (desktopCircle) desktopCircle.textContent = '–';
                const desktopScoreCircle = document.getElementById('desktopScoreCircle');
                if (desktopScoreCircle) desktopScoreCircle.style.background = 'transparent';

                const categoryBars = document.getElementById('expandCategoryBars');
                if (categoryBars) categoryBars.innerHTML = '<p style="color: var(--text-muted); font-style: italic; text-align: center; padding: 20px;">Bitte alle Dimensionen auswählen</p>';

                const expandRadar = document.getElementById('expandRadarChart');
                if (expandRadar) expandRadar.innerHTML = '';

                const desktopScoreNoteIncomplete = document.getElementById('desktopScoreNote');
                if (desktopScoreNoteIncomplete) desktopScoreNoteIncomplete.textContent = 'Bitte alle Dimensionen auswählen.';

                // Update Score-Circle auch bei unvollständigen Dimensionen
                updateSyntheseScoreCycle();
                return;
            }

            // Calculate overall score
            let overallScore = 0;
            let qualityBreakdown = { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 };

            if (pathosCheck.result !== 'unmöglich') {
                const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                overallScore = result.overall;
                qualityBreakdown = result.breakdown || qualityBreakdown;

                // Update expandable category bars
                updateExpandableCategoryBars(result.categories);
            }

            // Update 4-Factor Breakdown (Desktop)
            const factorArchetyp = document.getElementById('desktopFactorArchetyp');
            const factorDominanz = document.getElementById('desktopFactorDominanz');
            const factorOrientierung = document.getElementById('desktopFactorOrientierung');
            const factorGeschlecht = document.getElementById('desktopFactorGeschlecht');

            if (factorArchetyp) factorArchetyp.textContent = qualityBreakdown.archetyp;
            if (factorDominanz) factorDominanz.textContent = qualityBreakdown.dominanz;
            if (factorOrientierung) factorOrientierung.textContent = qualityBreakdown.orientierung;
            if (factorGeschlecht) factorGeschlecht.textContent = qualityBreakdown.geschlecht;

            // Update expandable desktop factor content
            updateDesktopFactorContent();

            // Update result bar
            const percentage = document.getElementById('resultPercentage');
            const progressFill = document.getElementById('resultProgressFill');

            percentage.textContent = overallScore.toFixed(1);
            progressFill.style.width = Math.min(100, overallScore) + '%';

            // Update desktop score circle
            const desktopCircle = document.getElementById('desktopCirclePercentage');
            if (desktopCircle) {
                desktopCircle.textContent = overallScore.toFixed(1);
            }

            // Set color based on score (3-Stufen-Skala: 70/50)
            let colorClass = 'low';
            let color = 'var(--danger)';
            if (overallScore >= 70) { colorClass = 'good'; color = 'var(--primary)'; }
            else if (overallScore >= 50) { colorClass = 'moderate'; color = 'var(--warning)'; }

            percentage.className = 'result-percentage ' + colorClass;
            progressFill.style.background = color;

            // Update desktop circle color
            const desktopScoreCircle = document.getElementById('desktopScoreCircle');
            if (desktopScoreCircle) {
                desktopScoreCircle.style.background = 'transparent';
            }

            // Update Desktop Score Note (direkt beim Kreis) - 3-Stufen-Skala
            const desktopScoreNote = document.getElementById('desktopScoreNote');
            if (desktopScoreNote) {
                let noteText = '';
                let quoteText = '';
                let quoteSource = '';

                // Bestimme Resonanzlevel basierend auf Score
                let resonanceLevel = 'niedrig';
                if (overallScore >= 80) resonanceLevel = 'hoch';
                else if (overallScore >= 50) resonanceLevel = 'mittel';

                // Versuche Zitat aus ResonanceQuotesTable zu holen
                if (typeof ResonanceQuotesTable !== 'undefined' && pathosCheck.result !== 'unmöglich') {
                    const category = overallScore >= 65 ? 'RESONANCE' : overallScore >= 50 ? 'GROWTH' : 'AWARENESS';
                    const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

                    if (result && result.quote) {
                        noteText = result.title;
                        quoteText = result.quote;
                        quoteSource = result.quoteSource ? ` — ${result.quoteSource}` : '';
                    }
                }

                // Fallback zu hardcoded Texten
                if (!quoteText) {
                    if (pathosCheck.result === 'unmöglich') {
                        noteText = 'Keine Basis für Resonanz vorhanden.';
                        quoteText = 'Diese Beziehung zeigt eine Qualität von ' + overallScore + ' – keine kompatible Basis vorhanden, deren Muster sich ausschließen.';
                    } else if (overallScore >= 70) {
                        noteText = 'Gute Resonanz – Muster ergänzen sich.';
                        quoteText = 'Diese Beziehung zeigt eine Qualität von ' + overallScore + ' – eine gute Resonanz zwischen zwei Menschen, deren Muster sich ergänzen.';
                    } else if (overallScore >= 50) {
                        noteText = 'Basis vorhanden, Arbeit erforderlich.';
                        quoteText = 'Diese Beziehung zeigt eine Qualität von ' + overallScore + ' – eine Basis ist vorhanden, erfordert aber bewusste Arbeit und Kommunikation.';
                    } else {
                        noteText = 'Bewusste Reflexion erforderlich.';
                        quoteText = 'Diese Beziehung zeigt eine Qualität von ' + overallScore + ' – bewusste Reflexion und offene Kommunikation sind erforderlich.';
                    }
                }

                desktopScoreNote.innerHTML = '<strong>' + noteText + '</strong><br><span style="font-style: italic; opacity: 0.85; font-size: 0.9em;">"' + quoteText + '"' + quoteSource + '</span>';
            }

            // Update Radar Chart
            const interactionKey = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions?.[interactionKey] || {};
            drawRadarChart(interaction.scores || {}, partnerArch?.color || '#457B9D');

            // Update Desktop Selection Info Message
            updateSelectionInfoMessage();

            // Update Score-Circle auf der Hauptseite
            updateSyntheseScoreCycle();
        }

        // Universelle Funktion für Kategorien-Balken (Mobile & Desktop)
        const categoryNamesMap = {
            A: 'Beziehungsphilosophie',
            B: 'Werte-Alignment',
            C: 'Nähe-Distanz',
            D: 'Autonomie',
            E: 'Kommunikation',
            F: 'Soziale Kompatibilität'
        };

        function renderCategoryBars(containerId, categories) {
            const container = document.getElementById(containerId);
            if (!container) return;

            let html = '';
            for (const [cat, catData] of Object.entries(categories)) {
                const score = catData.score || 0;
                let colorClass = 'low';
                if (score >= 70) colorClass = 'good';
                else if (score >= 50) colorClass = 'moderate';

                html += `
                    <div class="category-bar-row clickable-bar" style="margin-bottom: 12px; cursor: pointer; padding: 8px; border-radius: 8px; transition: background 0.2s;" onclick="showCategoryDetails('${cat}')" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                            <span style="font-size: 12px; color: var(--text-secondary);">${cat}: ${categoryNamesMap[cat]}</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 12px; font-weight: 600;" class="${colorClass}">${score}%</span>
                                <span style="font-size: 10px; color: var(--text-muted);">ℹ</span>
                            </div>
                        </div>
                        <div style="height: 6px; background: var(--bg-dark); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; width: ${score}%; background: var(--${colorClass === 'good' ? 'primary' : colorClass === 'moderate' ? 'warning' : 'danger'}); border-radius: 3px;"></div>
                        </div>
                    </div>
                `;
            }
            container.innerHTML = html;
        }

        // Desktop: Wrapper für Kompatibilität
        function updateExpandableCategoryBars(categories) {
            renderCategoryBars('expandCategoryBars', categories);
        }

        function showArchetypeInfo(person) {
            console.log('showArchetypeInfo called with:', person);
            const archetype = person === 'ich' ? currentArchetype : selectedPartner;
            console.log('archetype:', archetype, 'data:', data);
            if (!data || !data.archetypes || !data.archetypes[archetype]) {
                console.error('Data not available for archetype:', archetype);
                return;
            }

            // Set current index for swipe navigation
            currentDefinitionIndex = archetypeOrder.indexOf(archetype);
            if (currentDefinitionIndex === -1) currentDefinitionIndex = 0;
            currentDefinitionPerson = person;

            // Use the shared function to render content
            showArchetypeInfoByType(archetype);

            document.getElementById('definitionModal').classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add touch swipe support
            const modal = document.querySelector('#definitionModal .modal');
            modal.ontouchstart = handleDefinitionTouchStart;
            modal.ontouchend = handleDefinitionTouchEnd;
        }

        function showCategoryDetails(cat) {
            if (!data || !data.categories || !data.categories[cat]) return;

            // Aktuelle Kategorie speichern für Navigation
            currentDisplayedCategory = cat;

            const catInfo = data.categories[cat];
            const catNames = {
                A: 'Beziehungsphilosophie',
                B: 'Werte-Alignment',
                C: 'Nähe-Distanz',
                D: 'Autonomie',
                E: 'Kommunikation',
                F: 'Soziale Kompatibilität'
            };

            const ichArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];
            const key = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions?.[key] || {};
            const catScore = interaction.scores?.[cat]?.value || 0;

            let scoreClass = 'low';
            let scoreText = 'Herausfordernd';
            if (catScore >= 70) { scoreClass = 'good'; scoreText = 'Gut'; }
            else if (catScore >= 50) { scoreClass = 'moderate'; scoreText = 'Mittel'; }

            let modalContent = `
                <div class="modal-category">
                    <div style="background: rgba(69,123,157,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="color: var(--text-secondary); font-size: 12px;">Aktuelle Kombination</span>
                            <span style="font-size: 18px; font-weight: 700; color: var(--${scoreClass === 'good' ? 'primary' : scoreClass === 'moderate' ? 'warning' : 'danger'});">${catScore}%</span>
                        </div>
                        <div style="font-size: 14px; font-weight: 600; color: var(--text-primary);">
                            <span style="color: #2ecc71;">${ichArch?.name || currentArchetype}</span>
                            <span style="color: var(--text-muted);"> × </span>
                            <span style="color: #e74c3c;">${partnerArch?.name || selectedPartner}</span>
                        </div>
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${scoreText} in dieser Kategorie</div>
                    </div>

                    <div class="modal-category-header">
                        <div class="modal-category-letter">${cat}</div>
                        <div class="modal-category-name">${catNames[cat]}</div>
                    </div>
                    <div class="modal-category-desc">${catInfo.description || 'Keine Beschreibung verfügbar.'}</div>
            `;

            if (catInfo.subDimensions && catInfo.subDimensions.length > 0) {
                modalContent += `
                    <div class="definition-section">
                        <div class="definition-section-title">Subdimensionen <span style="font-size: 10px; color: var(--text-muted);">(klicken für Details)</span></div>
                        <ul class="definition-list variants clickable-subs">
                            ${catInfo.subDimensions.map(sub => `<li onclick="showSubDimensionInfo('${cat}', '${sub.replace(/'/g, "\\'")}')" style="cursor: pointer; padding: 8px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">${sub} <span style="color: var(--text-muted); font-size: 10px;">→</span></li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            modalContent += '</div>';

            document.getElementById('modalTitle').textContent = `Qualitätsmuster ${cat}: ${catNames[cat]}`;
            document.getElementById('modalBody').innerHTML = modalContent;
            document.getElementById('categoryModal').classList.add('active');
        }

        const subDimensionData = {
            "Exklusivitäts-Erwartung": {
                was: "Die Erwartung, der einzige romantische/sexuelle Partner zu sein.",
                warum: "Diese Dimension ist fundamental, weil unterschiedliche Erwartungen zu Enttäuschung, Eifersucht und Vertrauensbrüchen führen können.",
                wozu: "Klare Erwartungen verhindern Missverständnisse und schaffen eine gemeinsame Basis für die Beziehungsgestaltung.",
                archetypen: {
                    single: "Flexibel - keine feste Erwartung, offen für verschiedene Modelle",
                    duo: "Hohe Erwartung an vollständige Exklusivität",
                    duo_flex: "Grundsätzlich exklusiv, aber mit Ausnahmen nach Absprache",
                    solopoly: "Keine Exklusivitätserwartung - jede Beziehung ist eigenständig",
                    polyamor: "Bewusste Nicht-Exklusivität mit klaren Strukturen",
                    ra: "Keine normativen Exklusivitätserwartungen - alles verhandelbar",
                    lat: "Flexibel - Exklusivität ist unabhängig von Wohnsituation",
                    aromantisch: "Romantische Exklusivität nicht relevant - andere Verbindungen zählen"
                }
            },
            "Offenheit für alternative Modelle": {
                was: "Die Bereitschaft, nicht-traditionelle Beziehungsformen zu akzeptieren oder auszuprobieren.",
                warum: "Unterschiedliche Offenheit kann zu Konflikten führen, wenn ein Partner expandieren möchte und der andere nicht.",
                wozu: "Gemeinsame Offenheit ermöglicht Wachstum und Anpassung der Beziehung an veränderte Bedürfnisse.",
                archetypen: {
                    single: "Oft sehr offen - keine festgelegte Struktur",
                    duo: "Tendenziell geschlossen - Monogamie als Ideal",
                    duo_flex: "Moderat offen - bereit für situative Anpassungen",
                    solopoly: "Sehr offen - lebt bereits alternatives Modell",
                    polyamor: "Strukturiert offen - klare Rahmen für Vielfalt",
                    ra: "Maximal offen - alle Normen werden hinterfragt",
                    lat: "Moderat offen - alternative Wohnform wird bereits gelebt",
                    aromantisch: "Offen für alternative Beziehungsformen - Romantik ist nicht zentral"
                }
            },
            "Beziehung als Lebensinhalt vs. Lebensbereich": {
                was: "Wie zentral ist die Beziehung im Leben? Ist sie alles oder ein Teil von vielem?",
                warum: "Wenn einer die Beziehung als Lebensmittelpunkt sieht und der andere als Nebensache, entstehen ungleiche Investitionen.",
                wozu: "Ähnliche Priorisierung schafft Balance und verhindert das Gefühl von Vernachlässigung oder Überforderung.",
                archetypen: {
                    single: "Lebensbereich - das eigene Leben steht im Zentrum",
                    duo: "Oft Lebensinhalt - die Beziehung ist sehr wichtig",
                    duo_flex: "Wichtiger Lebensbereich mit hoher Priorität",
                    solopoly: "Klar Lebensbereich - das Selbst bleibt Zentrum",
                    polyamor: "Wichtiger Lebensbereich - aber mit mehreren Beziehungen",
                    ra: "Lebensbereich - Autonomie und Selbstbestimmung zentral",
                    lat: "Wichtiger Lebensbereich - aber eigener Raum ist essentiell",
                    aromantisch: "Lebensbereich - Freundschaften und andere Verbindungen zentral"
                }
            },
            "Definition von Treue": {
                was: "Was bedeutet 'treu sein' konkret? Körperliche Exklusivität, emotionale Treue, oder Ehrlichkeit?",
                warum: "Unterschiedliche Definitionen führen oft zu den schmerzhaftesten Missverständnissen in Beziehungen.",
                wozu: "Eine gemeinsame Definition von Treue schafft Klarheit und Vertrauen - unabhängig davon, wie sie aussieht.",
                archetypen: {
                    single: "Flexibel - Treue ist kontextabhängig",
                    duo: "Klassisch - körperliche UND emotionale Exklusivität",
                    duo_flex: "Angepasst - emotionale Treue wichtiger als körperliche",
                    solopoly: "Neu definiert - Treue = Ehrlichkeit und Transparenz",
                    polyamor: "Strukturiert - Treue zu vereinbarten Regeln und Grenzen",
                    ra: "Individuell definiert - Treue ist nicht normativ vorgegeben",
                    lat: "Emotionale Treue wichtig - unabhängig von Wohnsituation",
                    aromantisch: "Treue zu Absprachen - romantische Treue nicht relevant"
                }
            },
            "Ethische Grundhaltung": {
                was: "Die gemeinsamen Werte wie Ehrlichkeit, Respekt, Consent und Fairness.",
                warum: "Unterschiedliche ethische Grundhaltungen untergraben das Fundament jeder Beziehung und führen zu Vertrauensverlust.",
                wozu: "Geteilte ethische Werte schaffen ein sicheres Fundament für alle anderen Aspekte der Beziehung.",
                archetypen: {
                    single: "Individuell geprägt - eigene ethische Standards",
                    duo: "Traditionell - gesellschaftliche Normen als Leitfaden",
                    duo_flex: "Reflektiert - bewusste Auseinandersetzung mit Normen",
                    solopoly: "Progressiv - aktive ethische Reflexion",
                    polyamor: "Strukturiert ethisch - klare Regeln für fairen Umgang",
                    ra: "Anarchisch-ethisch - Normen werden radikal hinterfragt",
                    lat: "Autonom-ethisch - Respekt vor individuellem Raum",
                    aromantisch: "Authentisch - Ehrlichkeit über eigene Grenzen"
                }
            },
            "Verantwortungsbewusstsein": {
                was: "Die Bereitschaft, Verantwortung für eigene Handlungen und deren Auswirkungen zu übernehmen.",
                warum: "Ohne Verantwortungsbewusstsein werden Fehler wiederholt und Partner verletzt.",
                wozu: "Verantwortung ermöglicht Wachstum, Reparatur nach Konflikten und nachhaltige Beziehungsqualität.",
                archetypen: {
                    single: "Primär für sich selbst verantwortlich",
                    duo: "Hohe gegenseitige Verantwortung erwartet",
                    duo_flex: "Balancierte Verantwortung mit Flexibilität",
                    solopoly: "Selbstverantwortung betont, aber fair zu Partnern",
                    polyamor: "Komplexe Verantwortung für mehrere Beziehungen",
                    ra: "Hohe Selbstverantwortung - keine normativen Erwartungen",
                    lat: "Verantwortung für Beziehungsqualität trotz Distanz",
                    aromantisch: "Verantwortung für klare Kommunikation der Grenzen"
                }
            },
            "Emotionale Verschmelzungs-Tendenz": {
                was: "Das Bedürfnis, emotional mit dem Partner zu verschmelzen - von 'wir sind eins' bis 'wir sind zwei'.",
                warum: "Starke Unterschiede führen dazu, dass einer sich eingeengt und der andere sich abgelehnt fühlt.",
                wozu: "Ähnliche Verschmelzungs-Präferenzen ermöglichen eine Nähe, die sich für beide richtig anfühlt.",
                archetypen: {
                    single: "Niedrig - Autonomie steht vor Verschmelzung",
                    duo: "Oft hoch - 'Wir' als zentrale Identität",
                    duo_flex: "Moderat - Nähe mit Grenzen",
                    solopoly: "Niedrig - bewusste Distanz zu Verschmelzung",
                    polyamor: "Differenziert - unterschiedlich mit verschiedenen Partnern",
                    ra: "Niedrig - Autonomie ist zentraler Wert",
                    lat: "Moderat - emotionale Nähe ohne räumliche Verschmelzung",
                    aromantisch: "Niedrig - romantische Verschmelzung nicht gewünscht"
                }
            },
            "Physische Nähe-Bedürfnisse": {
                was: "Wie viel körperliche Präsenz und Nähe braucht man? Zusammenleben, täglicher Kontakt, wöchentlich?",
                warum: "Mismatches führen zu Einsamkeit (bei zu wenig) oder Erstickung (bei zu viel).",
                wozu: "Abgestimmte Nähe-Bedürfnisse ermöglichen, dass beide sich gesehen und respektiert fühlen.",
                archetypen: {
                    single: "Flexibel - kein konstantes Nähe-Bedürfnis",
                    duo: "Hoch - oft Wunsch nach Zusammenleben",
                    duo_flex: "Moderat bis hoch mit Freiraum-Phasen",
                    solopoly: "Bewusst niedrig - eigener Wohnraum wichtig",
                    polyamor: "Komplex - unterschiedliche Nähe mit verschiedenen Partnern",
                    ra: "Individuell verhandelbar - keine normativen Erwartungen",
                    lat: "Bewusst niedrig - getrennte Wohnungen als Prinzip",
                    aromantisch: "Variabel - nicht an romantische Nähe gebunden"
                }
            },
            "Fähigkeit, Raum zu geben": {
                was: "Die Fähigkeit, dem Partner Freiraum zu lassen ohne sich vernachlässigt oder unsicher zu fühlen.",
                warum: "Ohne diese Fähigkeit entstehen Kontrolle, Eifersucht und Erstickung der Beziehung.",
                wozu: "Raum geben können ermöglicht individuelle Entwicklung innerhalb der Beziehung.",
                archetypen: {
                    single: "Hoch - Raum ist selbstverständlich",
                    duo: "Muss oft gelernt werden - Nähe ist Standard",
                    duo_flex: "Bewusst entwickelt - wichtig für das Modell",
                    solopoly: "Sehr hoch - Teil der Grundphilosophie",
                    polyamor: "Essentiell - strukturell eingebaut",
                    ra: "Maximal - Autonomie als höchster Wert",
                    lat: "Sehr hoch - räumlicher Freiraum ist zentral",
                    aromantisch: "Hoch - respektiert nicht-romantische Grenzen"
                }
            },
            "Individuelle Freiheit": {
                was: "Der Wert, den man persönlicher Freiheit in der Beziehung beimisst - eigene Entscheidungen, Hobbies, Freunde.",
                warum: "Unterschiedliche Freiheitsbedürfnisse führen zu Machtkämpfen oder Entfremdung.",
                wozu: "Respektierte Freiheit ermöglicht authentisches Selbst und verhindert Resentment.",
                archetypen: {
                    single: "Maximale Freiheit - das Kernbedürfnis",
                    duo: "Eingeschränkt - Kompromisse erwartet",
                    duo_flex: "Balanciert - Freiheit mit Rücksichtnahme",
                    solopoly: "Maximal - Autonomie ist nicht verhandelbar",
                    polyamor: "Hoch - aber mit Verantwortung verbunden",
                    ra: "Maximal - Freiheit von allen Normen",
                    lat: "Hoch - räumliche Autonomie garantiert Freiheit",
                    aromantisch: "Hoch - Freiheit von romantischen Erwartungen"
                }
            },
            "Entscheidungsautonomie": {
                was: "Wer entscheidet was? Wie viel Mitsprache hat der Partner bei persönlichen Entscheidungen?",
                warum: "Konflikte entstehen, wenn einer Kontrolle erwartet und der andere Autonomie braucht.",
                wozu: "Klare Entscheidungsstrukturen verhindern Machtkämpfe und schaffen Klarheit.",
                archetypen: {
                    single: "Vollständig - alle Entscheidungen selbst",
                    duo: "Oft geteilt - wichtige Dinge gemeinsam",
                    duo_flex: "Hybrid - manche gemeinsam, manche allein",
                    solopoly: "Hoch - Autonomie auch in der Beziehung",
                    polyamor: "Komplex - unterschiedlich je nach Beziehung",
                    ra: "Maximal - keine externen Vorgaben akzeptiert",
                    lat: "Hoch - eigene Entscheidungen im eigenen Raum",
                    aromantisch: "Hoch - Entscheidungen nicht an romantischen Normen orientiert"
                }
            },
            "Akzeptanz der Autonomie des anderen": {
                was: "Die Fähigkeit zu akzeptieren, dass der Partner eigene Entscheidungen trifft - auch wenn man nicht zustimmt.",
                warum: "Fehlende Akzeptanz führt zu Kontrolle, Manipulation und Vertrauensverlust.",
                wozu: "Akzeptanz ermöglicht echte Partnerschaft statt Abhängigkeit.",
                archetypen: {
                    single: "Hoch - Autonomie wird geschätzt",
                    duo: "Muss oft gelernt werden",
                    duo_flex: "Bewusst entwickelt",
                    solopoly: "Sehr hoch - zentral für das Modell",
                    polyamor: "Essentiell - ohne geht es nicht",
                    ra: "Maximal - Grundprinzip der Beziehungsphilosophie",
                    lat: "Hoch - respektiert räumliche Autonomie des anderen",
                    aromantisch: "Hoch - akzeptiert nicht-romantische Bedürfnisse"
                }
            },
            "Kommunikationstiefe": {
                was: "Wie tief gehen Gespräche? Von Alltag bis zu Ängsten, Träumen und Verletzlichkeit.",
                warum: "Unterschiedliche Tiefen-Präferenzen führen zu Frustration - einer will mehr, einer weniger.",
                wozu: "Passende Kommunikationstiefe schafft echte Verbindung und Verständnis.",
                archetypen: {
                    single: "Variabel - je nach Beziehung",
                    duo: "Oft hoch - alles teilen als Ideal",
                    duo_flex: "Selektiv tief - wichtiges wird geteilt",
                    solopoly: "Bewusst tief - Kommunikation ist essentiell",
                    polyamor: "Hoch - Komplexität erfordert Kommunikation",
                    ra: "Individuell - keine normativen Erwartungen an Tiefe",
                    lat: "Qualitätsfokussiert - tiefe Gespräche in begrenzter Zeit",
                    aromantisch: "Authentisch - tiefe Verbindung ohne romantische Komponente"
                }
            },
            "Konfliktfähigkeit": {
                was: "Wie geht man mit Konflikten um? Vermeidung, Eskalation, konstruktive Lösung?",
                warum: "Unterschiedliche Stile führen dazu, dass Konflikte ungelöst bleiben oder eskalieren.",
                wozu: "Kompatible Konfliktfähigkeit ermöglicht Wachstum durch Krisen statt Zerstörung.",
                archetypen: {
                    single: "Kann Konflikte vermeiden durch Distanz",
                    duo: "Muss Konflikte lösen - kein Entkommen",
                    duo_flex: "Flexibel - manchmal Distanz, manchmal Lösung",
                    solopoly: "Klar - bei Unlösbarkeit kann man gehen",
                    polyamor: "Entwickelt - Kommunikation als Lösung",
                    ra: "Individuell - keine externen Konfliktlösungsmodelle",
                    lat: "Distanz möglich - räumliche Trennung als Puffer",
                    aromantisch: "Sachlich - nicht-romantische Konfliktlösung"
                }
            },
            "Emotionale Transparenz": {
                was: "Wie offen teilt man Gefühle? Alles aussprechen oder manches für sich behalten?",
                warum: "Unterschiede führen zu Missverständnissen - einer fühlt sich verschlossen, der andere überfordert.",
                wozu: "Abgestimmte Transparenz schafft Vertrauen ohne Überforderung.",
                archetypen: {
                    single: "Selektiv - teilt was nötig ist",
                    duo: "Oft hohe Erwartung an Transparenz",
                    duo_flex: "Balanciert - wichtiges wird geteilt",
                    solopoly: "Hoch - Ehrlichkeit ist zentral",
                    polyamor: "Sehr hoch - Basis des Modells",
                    ra: "Individuell - keine normativen Transparenz-Erwartungen",
                    lat: "Qualitativ - tiefe Gespräche in begrenzter Zeit",
                    aromantisch: "Ehrlich - klar über eigene Grenzen"
                }
            },
            "Gesellschaftliche Akzeptanz": {
                was: "Wie wichtig ist es, dass Familie, Freunde und Gesellschaft die Beziehung akzeptieren?",
                warum: "Unterschiedliche Wichtigkeit führt zu Konflikten über 'Outing' und öffentliches Auftreten.",
                wozu: "Ähnliche Wichtigkeit ermöglicht einen gemeinsamen Umgang mit dem sozialen Umfeld.",
                archetypen: {
                    single: "Unkompliziert - gesellschaftlich akzeptiert",
                    duo: "Sehr wichtig - passt zur Norm",
                    duo_flex: "Moderat - gewisse Erklärungen nötig",
                    solopoly: "Weniger wichtig - lebt gegen die Norm",
                    polyamor: "Komplex - manche Offenheit, manche Diskretion",
                    ra: "Unwichtig - gesellschaftliche Normen werden abgelehnt",
                    lat: "Erklärungsbedürftig - 'Warum wohnt ihr nicht zusammen?'",
                    aromantisch: "Herausfordernd - romantische Norm ist tief verankert"
                }
            },
            "Integration in soziale Kreise": {
                was: "Wie wird die Beziehung in Freundeskreis, Familie und Arbeit integriert und präsentiert?",
                warum: "Unterschiede führen zu Frustration - einer will präsentieren, der andere verstecken.",
                wozu: "Gemeinsame Strategien für soziale Integration schaffen ein einheitliches Auftreten.",
                archetypen: {
                    single: "Einfach - keine komplexe Integration nötig",
                    duo: "Vollständig - Partner wird überall eingeführt",
                    duo_flex: "Weitgehend - mit gewissen Grenzen",
                    solopoly: "Selektiv - nicht überall erklärbar",
                    polyamor: "Komplex - unterschiedlich je nach Umfeld",
                    ra: "Individuell - Integration nach eigenen Regeln",
                    lat: "Erklärungsbedürftig - getrennte Wohnungen irritieren",
                    aromantisch: "Herausfordernd - 'Nur Freunde?' wird oft missverstanden"
                }
            },
            "Umgang mit Stigma": {
                was: "Wie geht man mit negativen Reaktionen auf die Beziehungsform um? Erklären, ignorieren, kämpfen?",
                warum: "Unterschiedliche Strategien führen zu Konflikten darüber, wie man als Paar auftritt.",
                wozu: "Gemeinsame Strategie stärkt die Beziehung gegen äußeren Druck.",
                archetypen: {
                    single: "Kaum Stigma - gesellschaftlich normal",
                    duo: "Kein Stigma - das Ideal der Gesellschaft",
                    duo_flex: "Leichtes Stigma - 'offene Beziehung'",
                    solopoly: "Erhebliches Stigma - schwer erklärbar",
                    polyamor: "Stigma vorhanden - aber zunehmend bekannt",
                    ra: "Hohes Stigma - radikale Position wird missverstanden",
                    lat: "Moderates Stigma - 'echte' Beziehung in Frage gestellt",
                    aromantisch: "Hohes Stigma - wird als Defizit wahrgenommen"
                }
            }
        };

        function showSubDimensionInfo(cat, subName) {
            const subData = subDimensionData[subName] || { was: "Keine Beschreibung verfügbar.", warum: "", wozu: "", archetypen: {} };
            const catNames = {
                A: 'Beziehungsphilosophie',
                B: 'Werte-Alignment',
                C: 'Nähe-Distanz',
                D: 'Autonomie',
                E: 'Kommunikation',
                F: 'Soziale Kompatibilität'
            };

            const ichArch = data?.archetypes?.[currentArchetype];
            const partnerArch = data?.archetypes?.[selectedPartner];
            const ichId = currentArchetype;
            const partnerId = selectedPartner;

            const ichPerspektive = subData.archetypen?.[ichId] || "Keine Daten";
            const partnerPerspektive = subData.archetypen?.[partnerId] || "Keine Daten";

            let modalContent = `
                <div style="background: rgba(69,123,157,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="font-size: 11px; color: var(--text-muted);">Teil von Qualitätsmuster ${cat}: ${catNames[cat]}</div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WAS?</div>
                    <p style="color: var(--text-primary); line-height: 1.5;">${subData.was}</p>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WARUM WICHTIG?</div>
                    <p style="color: var(--text-secondary); line-height: 1.5;">${subData.warum}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WOZU?</div>
                    <p style="color: var(--text-secondary); line-height: 1.5;">${subData.wozu}</p>
                </div>

                <div style="background: rgba(46,204,113,0.1); padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                    <div style="font-size: 12px; color: #2ecc71; font-weight: 600; margin-bottom: 8px;">ICH (${ichArch?.name || ichId}):</div>
                    <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${ichPerspektive}</p>
                </div>

                <div style="background: rgba(231,76,60,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="font-size: 12px; color: #e74c3c; font-weight: 600; margin-bottom: 8px;">PARTNER (${partnerArch?.name || partnerId}):</div>
                    <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${partnerPerspektive}</p>
                </div>

                <div style="background: rgba(108, 117, 125, 0.1); padding: 12px; border-radius: 10px;">
                    <div style="font-size: 12px; color: #6c757d; font-weight: 600; margin-bottom: 8px;">BEDEUTUNG FÜR EURE KOMBINATION:</div>
                    <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${generateCombinationAnalysis(ichId, partnerId, subName, subData)}</p>
                </div>
            `;

            document.getElementById('modalTitle').textContent = subName;
            document.getElementById('modalBody').innerHTML = modalContent;
        }

        function generateCombinationAnalysis(ichId, partnerId, subName, subData) {
            if (ichId === partnerId) {
                return `Da ihr beide denselben Archetyp habt, solltet ihr hier ähnliche Vorstellungen haben. Das reduziert Konfliktpotential in dieser Dimension erheblich.`;
            }

            const polyTypes = ['solopoly', 'polyamor', 'ra'];
            const monoTypes = ['single', 'duo', 'duo_flex', 'lat', 'aromantisch'];
            const ichIsPoly = polyTypes.includes(ichId);
            const partnerIsPoly = polyTypes.includes(partnerId);

            if (ichIsPoly !== partnerIsPoly) {
                return `Hier treffen fundamental unterschiedliche Weltanschauungen aufeinander. Ein Poly-Typ und ein Mono-Typ haben oft gegensätzliche Perspektiven auf "${subName}". Intensive Kommunikation und gegenseitiges Verständnis sind essentiell.`;
            }

            if (ichIsPoly && partnerIsPoly) {
                return `Als zwei Poly-Typen teilt ihr grundsätzlich ähnliche Werte in dieser Dimension. Die Unterschiede liegen eher in der konkreten Ausgestaltung als in den Grundprinzipien.`;
            }

            return `Eure Archetypen haben unterschiedliche Schwerpunkte in dieser Dimension. Offene Gespräche darüber, was euch beiden wichtig ist, helfen, gemeinsame Lösungen zu finden.`;
        }

        // NEU: Generiere dynamische Pro/Contra aus Micro-Statements
        function generateDynamicProContra(type1, type2, dims1, dims2) {
            const pro = [];
            const contra = [];

            // 1. Archetyp-basierte Pro/Contra
            const archStatements = getArchetypeStatements(type1, type2);
            if (archStatements) {
                pro.push(...(archStatements.pro || []));
                contra.push(...(archStatements.contra || []));
            }

            // 2. Dominanz-basierte Pro/Contra hinzufügen
            const domStatements = getDominanceStatements(dims1?.dominanz, dims2?.dominanz);
            if (domStatements && domStatements.pro) {
                // Füge nur die relevantesten hinzu, um Doppelungen zu vermeiden
                domStatements.pro.slice(0, 2).forEach(p => {
                    if (!pro.includes(p)) pro.push(p);
                });
            }
            if (domStatements && domStatements.contra) {
                domStatements.contra.slice(0, 2).forEach(c => {
                    if (!contra.includes(c)) contra.push(c);
                });
            }

            return { pro, contra };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // KOMBINIERTES SYNTHESE-SYSTEM (A+B+C)
        // A) Score → Tonalität (positiv/neutral/kritisch)
        // B) Hash aus 4 Faktoren → deterministische Variation
        // C) 6 Kategorien + Templates → Zusammenführung
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Berechnet einen deterministischen Hash aus den 4 Faktoren
         * Gibt einen Index zurück, der für Statement-Auswahl verwendet wird
         */
        function getFactorHash(archetypScore, dominanzScore, orientierungScore, geschlechtScore) {
            // Einfacher aber deterministischer Hash basierend auf allen 4 Faktoren
            const combined = (archetypScore * 1000000) + (dominanzScore * 10000) + (orientierungScore * 100) + geschlechtScore;
            // Verwende Modulo um einen Index zu bekommen
            return combined;
        }

        /**
         * Wählt ein Statement deterministisch aus einem Array basierend auf Hash
         */
        function selectStatementByHash(statements, hash) {
            if (!statements || statements.length === 0) return null;
            const index = hash % statements.length;
            return statements[index];
        }

        /**
         * Bestimmt die Tonalität basierend auf dem Gesamtscore
         * @returns 'positiv' | 'neutral' | 'kritisch'
         */
        function getTonality(score) {
            if (score >= 70) return 'positiv';
            if (score >= 50) return 'neutral';
            return 'kritisch';
        }

        /**
         * Tonalitäts-Templates für die Synthese-Einleitungen
         */
        const tonalityTemplates = {
            positiv: {
                pathos: [
                    "Eine vielversprechende Resonanz entsteht zwischen euch.",
                    "Die emotionale Chemie deutet auf tiefes Potenzial hin.",
                    "Eure Energien harmonieren auf einer fundamentalen Ebene."
                ],
                logos: [
                    "Die strukturelle Kompatibilität bildet eine solide Basis.",
                    "Eure Beziehungsphilosophien ergänzen sich konstruktiv.",
                    "Das rationale Fundament ermöglicht fruchtbare Kommunikation."
                ]
            },
            neutral: {
                pathos: [
                    "Eine interessante Dynamik entfaltet sich zwischen euch.",
                    "Die emotionale Landschaft bietet sowohl Chancen als auch Herausforderungen.",
                    "Eure Energien begegnen sich – was daraus wird, liegt in euren Händen."
                ],
                logos: [
                    "Die strukturellen Unterschiede erfordern bewusste Navigation.",
                    "Eure Beziehungsvorstellungen haben Überschneidungen, aber auch Differenzen.",
                    "Dialog und Klärung werden wichtig sein für das gegenseitige Verständnis."
                ]
            },
            kritisch: {
                pathos: [
                    "Die emotionalen Welten prallen aufeinander.",
                    "Spannungen auf der Gefühlsebene sind zu erwarten.",
                    "Die unterschiedlichen emotionalen Bedürfnisse erfordern besondere Achtsamkeit."
                ],
                logos: [
                    "Fundamentale Unterschiede in den Beziehungsvorstellungen werden sichtbar.",
                    "Die strukturellen Differenzen stellen eine erhebliche Herausforderung dar.",
                    "Grundlegende Gespräche über Erwartungen sind unerlässlich."
                ]
            }
        };

        /**
         * Kategorie-spezifische Synthese-Bausteine für die 6 Bereiche
         */
        const categorySynthesisTemplates = {
            A: { // Beziehungsphilosophie
                name: "Beziehungsphilosophie",
                positiv: "Eure Grundhaltungen zu Beziehungen harmonieren.",
                neutral: "Eure Beziehungsphilosophien haben gemeinsame Punkte, aber auch Unterschiede.",
                kritisch: "Fundamentale Differenzen in der Beziehungsphilosophie erfordern Klärung."
            },
            B: { // Werte-Alignment
                name: "Werte-Alignment",
                positiv: "Geteilte Werte bilden ein stabiles Fundament.",
                neutral: "Manche Werte teilt ihr, andere unterscheiden sich.",
                kritisch: "Unterschiedliche Wertevorstellungen können zu Konflikten führen."
            },
            C: { // Nähe-Distanz
                name: "Nähe-Distanz",
                positiv: "Eure Bedürfnisse nach Nähe und Raum passen gut zusammen.",
                neutral: "Die Balance zwischen Nähe und Distanz wird Kommunikation erfordern.",
                kritisch: "Unterschiedliche Nähe-Distanz-Bedürfnisse können Spannung erzeugen."
            },
            D: { // Autonomie
                name: "Autonomie",
                positiv: "Ihr respektiert gegenseitig eure Unabhängigkeit.",
                neutral: "Das Autonomie-Verständnis bedarf weiterer Abstimmung.",
                kritisch: "Konfliktpotenzial bei unterschiedlichen Autonomie-Erwartungen."
            },
            E: { // Kommunikation
                name: "Kommunikation",
                positiv: "Die Basis für fruchtbaren Dialog ist gegeben.",
                neutral: "Kommunikationsstile unterscheiden sich – Anpassung möglich.",
                kritisch: "Unterschiedliche Kommunikationsweisen können Missverständnisse erzeugen."
            },
            F: { // Soziale Kompatibilität
                name: "Soziale Kompatibilität",
                positiv: "Soziale Vorstellungen und Umfelder harmonieren.",
                neutral: "Soziale Kompatibilität ist teilweise gegeben.",
                kritisch: "Unterschiedliche soziale Erwartungen können belasten."
            }
        };

        /**
         * Generiert detaillierte Pathos-Inhalte mit ICH/Partner/Synthese Struktur
         * Nutzt PathosTextGenerator für fließende, poetische Texte
         * @returns {Object} { ich, partner, synthese, resonanz }
         */
        function generateDetailedPathos(ichArch, partnerArch) {
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';
            const ichId = ichArch?.id || currentArchetype || '';
            const partnerId = partnerArch?.id || selectedPartner || '';

            // Berechne die 4 Faktor-Scores
            const person1 = {
                archetyp: ichId,
                dominanz: personDimensions.ich?.dominanz,
                orientierung: personDimensions.ich?.orientierung,
                geschlecht: personDimensions.ich?.geschlecht,
                orientierungStatus: personDimensions.ich?.orientierungStatus
            };
            const person2 = {
                archetyp: partnerId,
                dominanz: personDimensions.partner?.dominanz,
                orientierung: personDimensions.partner?.orientierung,
                geschlecht: personDimensions.partner?.geschlecht,
                orientierungStatus: personDimensions.partner?.orientierungStatus
            };

            // Hole Score-Breakdown
            const qualityResult = calculateRelationshipQuality(person1, person2);
            const breakdown = qualityResult.breakdown || { archetyp: 50, dominanz: 75, orientierung: 100, geschlecht: 100 };
            const overallScore = qualityResult.score || 50;
            const resonanzData = qualityResult.resonanz;
            const tonality = getTonality(overallScore);

            // Hole Statement-Quellen
            const archStatements = getArchetypeStatements(ichId, partnerId);
            const domStatements = getDominanceStatements(person1.dominanz, person2.dominanz);
            const orientStatements = getOrientierungStatements(person1.orientierung, person2.orientierung, person1.geschlecht, person2.geschlecht);

            // ═══════════════════════════════════════════════════════════════
            // NUTZE PATHOS TEXT GENERATOR (wenn verfügbar)
            // ═══════════════════════════════════════════════════════════════
            if (typeof PathosTextGenerator !== 'undefined') {
                // Generiere deterministischen Hash für Varianz
                const seed = PathosTextGenerator.generateHash(
                    ichId, partnerId,
                    person1.dominanz || 'none',
                    person2.dominanz || 'none',
                    overallScore
                );

                // ICH BRINGT MIT - Poetischer Fließtext
                const ichText = PathosTextGenerator.generatePersonText(
                    ichArch,
                    personDimensions.ich,
                    ichName,
                    seed
                );

                // PARTNER BRINGT MIT - Poetischer Fließtext
                const partnerText = PathosTextGenerator.generatePersonText(
                    partnerArch,
                    personDimensions.partner,
                    partnerName,
                    seed + 100
                );

                // DARAUS ENTSTEHT - Poetische Synthese
                const syntheseText = PathosTextGenerator.generateSyntheseText({
                    ichArch,
                    partnerArch,
                    ichName,
                    partnerName,
                    ichDimensions: personDimensions.ich,
                    partnerDimensions: personDimensions.partner,
                    overallScore,
                    archStatements,
                    domStatements,
                    orientStatements,
                    seed
                });

                // RESONANZ - Poetische Interpretation
                let resonanzText = null;
                if (resonanzData && resonanzData.R !== undefined) {
                    resonanzText = PathosTextGenerator.generateResonanzText(
                        resonanzData.R,
                        seed + 200
                    );
                }

                return {
                    ich: ichText,
                    partner: partnerText,
                    synthese: syntheseText,
                    resonanz: resonanzText,
                    score: overallScore,
                    tonality: tonality
                };
            }

            // ═══════════════════════════════════════════════════════════════
            // FALLBACK: Original-Logik (wenn PathosTextGenerator nicht geladen)
            // ═══════════════════════════════════════════════════════════════
            const hash = getFactorHash(breakdown.archetyp, breakdown.dominanz, breakdown.orientierung, breakdown.geschlecht);

            // ICH BRINGT MIT
            const ichParts = [];
            if (ichArch?.pirsig?.dynamicQuality !== undefined) {
                const dynQual = ichArch.pirsig.dynamicQuality;
                if (dynQual >= 0.7) {
                    ichParts.push(`${ichName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`);
                } else if (dynQual >= 0.4) {
                    ichParts.push(`${ichName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`);
                } else {
                    ichParts.push(`${ichName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`);
                }
            }
            if (ichArch?.osho?.naturalness >= 0.7) {
                ichParts.push(`Emotionale Authentizität steht im Vordergrund – ${ichName} folgt dem natürlichen Fluss der Gefühle.`);
            }
            const ichDom = person1.dominanz;
            if (ichDom) {
                const domText = {
                    'dominant': `Als Führende/r trägt ${ichName} eine aktive emotionale Energie.`,
                    'submissiv': `${ichName} bringt eine empfängliche, hingebungsvolle Qualität mit.`,
                    'switch': `${ichName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`,
                    'ausgeglichen': `${ichName} strebt nach emotionalem Gleichgewicht in der Verbindung.`
                };
                if (domText[ichDom]) ichParts.push(domText[ichDom]);
            }
            if (ichArch?.coreValues?.length) {
                ichParts.push(`Kernwerte wie ${ichArch.coreValues.slice(0, 2).join(' und ')} prägen das emotionale Erleben.`);
            }

            // PARTNER BRINGT MIT
            const partnerParts = [];
            if (partnerArch?.pirsig?.dynamicQuality !== undefined) {
                const dynQual = partnerArch.pirsig.dynamicQuality;
                if (dynQual >= 0.7) {
                    partnerParts.push(`${partnerName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`);
                } else if (dynQual >= 0.4) {
                    partnerParts.push(`${partnerName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`);
                } else {
                    partnerParts.push(`${partnerName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`);
                }
            }
            if (partnerArch?.osho?.naturalness >= 0.7) {
                partnerParts.push(`Emotionale Authentizität steht im Vordergrund – ${partnerName} folgt dem natürlichen Fluss der Gefühle.`);
            }
            const partnerDom = person2.dominanz;
            if (partnerDom) {
                const domText = {
                    'dominant': `Als Führende/r trägt ${partnerName} eine aktive emotionale Energie.`,
                    'submissiv': `${partnerName} bringt eine empfängliche, hingebungsvolle Qualität mit.`,
                    'switch': `${partnerName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`,
                    'ausgeglichen': `${partnerName} strebt nach emotionalem Gleichgewicht in der Verbindung.`
                };
                if (domText[partnerDom]) partnerParts.push(domText[partnerDom]);
            }
            if (partnerArch?.coreValues?.length) {
                partnerParts.push(`Kernwerte wie ${partnerArch.coreValues.slice(0, 2).join(' und ')} prägen das emotionale Erleben.`);
            }

            // SYNTHESE
            const syntheseParts = [];
            const tonalityIntro = selectStatementByHash(tonalityTemplates[tonality].pathos, hash);
            if (tonalityIntro) syntheseParts.push(tonalityIntro);
            if (archStatements?.pathos) {
                const allPathos = [...(archStatements.pathos.gemeinsam || []), ...(archStatements.pathos.spannung || [])];
                const selected = selectStatementByHash(allPathos, hash + 7);
                if (selected) syntheseParts.push(selected);
            }
            if (domStatements?.pathos?.length) {
                syntheseParts.push(selectStatementByHash(domStatements.pathos, hash + 11));
            }
            const ichDyn = ichArch?.pirsig?.dynamicQuality || 0.5;
            const partnerDyn = partnerArch?.pirsig?.dynamicQuality || 0.5;
            if (Math.abs(ichDyn - partnerDyn) < 0.2) {
                syntheseParts.push(`Beide schwingen auf einer ähnlichen emotionalen Frequenz.`);
            }
            if (syntheseParts.length === 0) {
                syntheseParts.push(`${ichName} und ${partnerName} können emotional zueinander finden.`);
            }

            // RESONANZ
            let resonanzText = null;
            if (resonanzData?.R !== undefined) {
                const R = resonanzData.R;
                if (R >= 1.05) resonanzText = `Hohe emotionale Resonanz (R=${R.toFixed(2)}): Pathos und Logos harmonieren.`;
                else if (R >= 0.95) resonanzText = `Gute Resonanz (R=${R.toFixed(2)}): Emotionale und rationale Ebene im Gleichgewicht.`;
                else resonanzText = `Resonanz R=${R.toFixed(2)}: Die Wellenlängen sind noch nicht vollständig abgestimmt.`;
            }

            return {
                ich: ichParts.join(' '),
                partner: partnerParts.join(' '),
                synthese: syntheseParts.join(' '),
                resonanz: resonanzText,
                score: overallScore,
                tonality: tonality
            };
        }

        // Legacy-Wrapper für Kompatibilität
        function generateCombinedPathos(ichArch, partnerArch) {
            const detailed = generateDetailedPathos(ichArch, partnerArch);
            return detailed.synthese;
        }

        /**
         * Generiert detaillierte Logos-Inhalte mit ICH/Partner/Synthese Struktur
         * Nutzt LogosTextGenerator für fließende, analytische Texte
         * @returns {Object} { ich, partner, synthese, resonanz }
         */
        function generateDetailedLogos(ichArch, partnerArch) {
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';
            const ichId = ichArch?.id || currentArchetype || '';
            const partnerId = partnerArch?.id || selectedPartner || '';

            // Berechne die 4 Faktor-Scores
            const person1 = {
                archetyp: ichId,
                dominanz: personDimensions.ich?.dominanz,
                orientierung: personDimensions.ich?.orientierung,
                geschlecht: personDimensions.ich?.geschlecht,
                orientierungStatus: personDimensions.ich?.orientierungStatus
            };
            const person2 = {
                archetyp: partnerId,
                dominanz: personDimensions.partner?.dominanz,
                orientierung: personDimensions.partner?.orientierung,
                geschlecht: personDimensions.partner?.geschlecht,
                orientierungStatus: personDimensions.partner?.orientierungStatus
            };

            // Hole Score-Breakdown
            const qualityResult = calculateRelationshipQuality(person1, person2);
            const breakdown = qualityResult.breakdown || { archetyp: 50, dominanz: 75, orientierung: 100, geschlecht: 100 };
            const overallScore = qualityResult.score || 50;
            const resonanzData = qualityResult.resonanz;
            const tonality = getTonality(overallScore);

            // Get category scores
            const key = `${ichId}_${partnerId}`;
            const interaction = data?.interactions?.[key];
            const categoryScores = interaction?.scores || {};

            // Hole Statement-Quellen
            const archStatements = getArchetypeStatements(ichId, partnerId);

            // ═══════════════════════════════════════════════════════════════
            // NUTZE LOGOS TEXT GENERATOR (wenn verfügbar)
            // ═══════════════════════════════════════════════════════════════
            if (typeof LogosTextGenerator !== 'undefined') {
                // Generiere deterministischen Hash für Varianz
                const seed = LogosTextGenerator.generateHash(
                    ichId, partnerId,
                    person1.dominanz || 'none',
                    person2.dominanz || 'none',
                    overallScore
                );

                // ICH BRINGT MIT - Analytischer Fließtext
                const ichText = LogosTextGenerator.generatePersonText(
                    ichArch,
                    personDimensions.ich,
                    ichName,
                    seed
                );

                // PARTNER BRINGT MIT - Analytischer Fließtext
                const partnerText = LogosTextGenerator.generatePersonText(
                    partnerArch,
                    personDimensions.partner,
                    partnerName,
                    seed + 100
                );

                // DARAUS ENTSTEHT - Analytische Synthese
                const syntheseText = LogosTextGenerator.generateSyntheseText({
                    ichArch,
                    partnerArch,
                    ichName,
                    partnerName,
                    ichDimensions: personDimensions.ich,
                    partnerDimensions: personDimensions.partner,
                    overallScore,
                    archStatements,
                    categoryScores,
                    seed
                });

                // RESONANZ - Analytische Interpretation
                let resonanzText = null;
                if (resonanzData && resonanzData.R !== undefined) {
                    resonanzText = LogosTextGenerator.generateResonanzText(
                        resonanzData.R,
                        seed + 200
                    );
                }

                return {
                    ich: ichText,
                    partner: partnerText,
                    synthese: syntheseText,
                    resonanz: resonanzText,
                    score: overallScore,
                    tonality: tonality
                };
            }

            // ═══════════════════════════════════════════════════════════════
            // FALLBACK: Original-Logik (wenn LogosTextGenerator nicht geladen)
            // ═══════════════════════════════════════════════════════════════
            const hash = getFactorHash(breakdown.archetyp, breakdown.dominanz, breakdown.orientierung, breakdown.geschlecht);

            // ICH BRINGT MIT
            const ichParts = [];
            if (ichArch?.pirsig?.staticQuality !== undefined) {
                const statQual = ichArch.pirsig.staticQuality;
                if (statQual >= 0.7) {
                    ichParts.push(`${ichName} bringt klare Strukturen und feste Werte mit – Verlässlichkeit ist ein Grundpfeiler.`);
                } else if (statQual >= 0.4) {
                    ichParts.push(`${ichName} balanciert zwischen festen Überzeugungen und Offenheit für neue Perspektiven.`);
                } else {
                    ichParts.push(`${ichName} bevorzugt Flexibilität über starre Regeln.`);
                }
            }
            if (ichArch?.coreValues?.length) {
                ichParts.push(`Kernwerte: ${ichArch.coreValues.slice(0, 3).join(', ')}.`);
            }
            if (ichArch?.avoids?.length) {
                ichParts.push(`Vermeidet: ${ichArch.avoids.slice(0, 2).join(' und ')}.`);
            }
            const ichGfk = personDimensions.ich?.gfk;
            if (ichGfk) {
                const gfkText = {
                    'hoch': `GFK-Kompetenz: hoch.`,
                    'mittel': `GFK-Kompetenz: mittel.`,
                    'niedrig': `GFK-Kompetenz: niedrig.`
                };
                if (gfkText[ichGfk]) ichParts.push(gfkText[ichGfk]);
            }

            // PARTNER BRINGT MIT
            const partnerParts = [];
            if (partnerArch?.pirsig?.staticQuality !== undefined) {
                const statQual = partnerArch.pirsig.staticQuality;
                if (statQual >= 0.7) {
                    partnerParts.push(`${partnerName} bringt klare Strukturen und feste Werte mit.`);
                } else if (statQual >= 0.4) {
                    partnerParts.push(`${partnerName} balanciert zwischen Struktur und Flexibilität.`);
                } else {
                    partnerParts.push(`${partnerName} bevorzugt adaptive Strukturen.`);
                }
            }
            if (partnerArch?.coreValues?.length) {
                partnerParts.push(`Kernwerte: ${partnerArch.coreValues.slice(0, 3).join(', ')}.`);
            }
            if (partnerArch?.avoids?.length) {
                partnerParts.push(`Vermeidet: ${partnerArch.avoids.slice(0, 2).join(' und ')}.`);
            }
            const partnerGfk = personDimensions.partner?.gfk;
            if (partnerGfk) {
                const gfkText = {
                    'hoch': `GFK-Kompetenz: hoch.`,
                    'mittel': `GFK-Kompetenz: mittel.`,
                    'niedrig': `GFK-Kompetenz: niedrig.`
                };
                if (gfkText[partnerGfk]) partnerParts.push(gfkText[partnerGfk]);
            }

            // SYNTHESE
            const syntheseParts = [];
            const tonalityIntro = selectStatementByHash(tonalityTemplates[tonality].logos, hash);
            if (tonalityIntro) syntheseParts.push(tonalityIntro);
            if (archStatements?.logos) {
                const allLogos = [...(archStatements.logos.gemeinsam || []), ...(archStatements.logos.unterschied || [])];
                const selected = selectStatementByHash(allLogos, hash + 7);
                if (selected) syntheseParts.push(selected);
            }
            const ichStat = ichArch?.pirsig?.staticQuality || 0.5;
            const partnerStat = partnerArch?.pirsig?.staticQuality || 0.5;
            if (Math.abs(ichStat - partnerStat) < 0.2) {
                syntheseParts.push(`Ähnliches Strukturbedürfnis erleichtert die Abstimmung.`);
            }
            if (syntheseParts.length === 0) {
                syntheseParts.push(`${ichName} und ${partnerName} haben Potenzial für eine tragfähige Basis.`);
            }

            // RESONANZ
            let resonanzText = null;
            if (resonanzData?.R !== undefined) {
                const R = resonanzData.R;
                if (R >= 1.05) resonanzText = `Resonanz R=${R.toFixed(2)}: Hohe strukturelle Übereinstimmung.`;
                else if (R >= 0.95) resonanzText = `Resonanz R=${R.toFixed(2)}: Gute Kompatibilität.`;
                else resonanzText = `Resonanz R=${R.toFixed(2)}: Erfordert bewusste Abstimmung.`;
            }

            return {
                ich: ichParts.join(' '),
                partner: partnerParts.join(' '),
                synthese: syntheseParts.join(' '),
                resonanz: resonanzText,
                score: overallScore,
                tonality: tonality
            };
        }

        // Legacy-Wrapper für Kompatibilität
        function generateCombinedLogos(ichArch, partnerArch) {
            const detailed = generateDetailedLogos(ichArch, partnerArch);
            return detailed.synthese;
        }

        // Legacy-Funktion für Kompatibilität (wird nicht mehr verwendet)
        function generateCombinedLogos_legacy(ichArch, partnerArch) {
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';
            // Use global archetype keys as IDs since archetypeDefinitions doesn't have id property
            const ichId = ichArch?.id || currentArchetype || '';
            const partnerId = partnerArch?.id || selectedPartner || '';

            // Get philosophy score from compatibility matrix
            const key = `${ichId}_${partnerId}`;
            const interaction = data?.interactions?.[key];
            const philScore = interaction?.scores?.A?.value || interaction?.overall || 50;

            // Hole Statements aus der Datenbank
            const archStatements = getArchetypeStatements(ichId, partnerId);
            const domStatements = getDominanceStatements(
                personDimensions.ich?.dominanz,
                personDimensions.partner?.dominanz
            );
            const orientStatements = getOrientierungStatements(
                personDimensions.ich?.orientierung,
                personDimensions.partner?.orientierung,
                personDimensions.ich?.geschlecht,
                personDimensions.partner?.geschlecht
            );
            const statusStmts = getStatusStatements(
                personDimensions.ich,
                personDimensions.partner
            );

            const textParts = [];

            // Archetyp-basierte Logos-Statements
            if (archStatements?.logos) {
                if (archStatements.logos.gemeinsam?.length) {
                    textParts.push(archStatements.logos.gemeinsam[0]);
                }
                if (archStatements.logos.unterschied?.length && philScore < 70) {
                    textParts.push(archStatements.logos.unterschied[0]);
                }
            }

            // Dominanz-basierte Logos-Statements (nur wenn nicht default)
            if (domStatements?.logos?.length && domStatements !== dominanceStatements.default) {
                textParts.push(domStatements.logos[0]);
            }

            // Orientierungs-basierte Logos-Statements hinzufügen (nur wenn nicht default)
            if (orientStatements?.logos?.length && orientStatements !== orientierungStatements.default) {
                textParts.push(orientStatements.logos[0]);
            }

            // Status-basierte Logos-Statements hinzufügen (Pirsig-Perspektive)
            if (statusStmts?.logos?.length && statusStmts !== statusStatements.default) {
                textParts.push(statusStmts.logos[0]);
            }

            // Fallback mit Philosophie-Score
            if (textParts.length === 0) {
                if (philScore >= 80) {
                    return `${ichName} und ${partnerName} teilen viele rationale Grundüberzeugungen über Beziehungen (Philosophie-Score: ${philScore}%). Das bildet eine solide Basis für konstruktive Gespräche.`;
                } else if (philScore < 50) {
                    return `${ichName} und ${partnerName} haben unterschiedliche rationale Vorstellungen von Beziehungen (Philosophie-Score: ${philScore}%). Grundlegende Gespräche über Erwartungen sind wichtig.`;
                }
                return `${ichName} und ${partnerName} haben einige Überschneidungen in ihren rationalen Beziehungsvorstellungen (Philosophie-Score: ${philScore}%), aber auch Unterschiede, die Kommunikation erfordern.`;
            }

            return textParts.join(' ');
        }

        // ========================================
        // MOBILE MULTI-PAGE FUNCTIONS
        // ========================================

        let currentMobilePage = 1;
        let mobilePersonDimensions = {
            ich: {
                geschlecht: { primary: null, secondary: null },
                dominanz: { primary: null, secondary: null },
                orientierung: { primary: null, secondary: null }
            },
            partner: {
                geschlecht: { primary: null, secondary: null },
                dominanz: { primary: null, secondary: null },
                orientierung: { primary: null, secondary: null }
            }
        };
        let mobileIchArchetype = 'single';
        let mobilePartnerArchetype = 'duo';
        let mobileTouchStartX = 0;
        let mobileTouchEndX = 0;

        function getMissingDimensions() {
            // Check if we're in mobile mode
            const isMobile = window.innerWidth <= 768;
            const dimensions = isMobile ? mobilePersonDimensions : personDimensions;
            const missing = [];

            // Check ICH dimensions
            // Geschlecht ist jetzt { primary, secondary } - nur primary ist erforderlich
            if (!dimensions.ich.geschlecht || !dimensions.ich.geschlecht.primary) {
                missing.push('Ich: Geschlecht');
            }
            if (dimensions.ich.dominanz === null) {
                missing.push('Ich: Dominanz');
            }
            if (dimensions.ich.orientierung === null) {
                missing.push('Ich: Orientierung');
            }
            if (dimensions.ich.orientierungStatus === null) {
                missing.push('Ich: Orientierung-Status');
            }

            // Check PARTNER dimensions
            if (!dimensions.partner.geschlecht || !dimensions.partner.geschlecht.primary) {
                missing.push('Partner: Geschlecht');
            }
            if (dimensions.partner.dominanz === null) {
                missing.push('Partner: Dominanz');
            }
            if (dimensions.partner.orientierung === null) {
                missing.push('Partner: Orientierung');
            }
            if (dimensions.partner.orientierungStatus === null) {
                missing.push('Partner: Orientierung-Status');
            }

            return missing;
        }

        function validateDimensionsComplete() {
            return getMissingDimensions().length === 0;
        }

        function showValidationWarning() {
            // Find or create warning element
            let warning = document.getElementById('dimensionWarning');
            if (warning) {
                warning.remove();
            }

            const missingItems = getMissingDimensions();

            warning = document.createElement('div');
            warning.id = 'dimensionWarning';
            warning.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(231, 76, 60, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideDown 0.3s ease;
                max-width: 90%;
                text-align: left;
            `;

            // Build message with missing items
            let messageHTML = '<div style="margin-bottom: 8px;">⚠️ Es fehlt noch:</div>';
            messageHTML += '<ul style="margin: 0; padding-left: 20px; font-weight: normal; font-size: 13px;">';
            missingItems.forEach(item => {
                messageHTML += `<li>${item}</li>`;
            });
            messageHTML += '</ul>';

            warning.innerHTML = messageHTML;
            document.body.appendChild(warning);

            // Auto-remove after 4 seconds (slightly longer for reading)
            setTimeout(() => {
                warning.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => warning.remove(), 300);
            }, 4000);
        }

        function mobileGoToPage(pageNumber, skipPushState = false) {
            // Validate before moving to page 3 (Synthese) - ensure all dimensions are complete
            if (currentMobilePage === 2 && pageNumber === 3 && !validateDimensionsComplete()) {
                showValidationWarning();
                return;
            }

            // Hide all pages
            document.querySelectorAll('.mobile-page').forEach(p => {
                p.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(`mobilePage${pageNumber}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update dots
            document.querySelectorAll('.page-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === pageNumber - 1);
            });

            currentMobilePage = pageNumber;

            // Update page content when navigating
            if (pageNumber === 3) {
                updateMobileResultPage();
            }

            // Push to browser history for back button navigation (only for forward navigation)
            if (!skipPushState) {
                history.pushState({ mobilePage: pageNumber }, '', `#seite${pageNumber}`);
            }

            // Scroll to top
            window.scrollTo(0, 0);
        }

        function initMobileSwipe() {
            const mobileContainer = document.getElementById('mobileMultipage');
            if (!mobileContainer) return;

            mobileContainer.addEventListener('touchstart', (e) => {
                mobileTouchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            mobileContainer.addEventListener('touchend', (e) => {
                mobileTouchEndX = e.changedTouches[0].screenX;
                handleMobileSwipe();
            }, { passive: true });
        }

        function handleMobileSwipe() {
            const swipeThreshold = 100;
            const diff = mobileTouchStartX - mobileTouchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentMobilePage < 3) {
                    // Swipe left -> next page (max 3 pages)
                    mobileGoToPage(currentMobilePage + 1);
                } else if (diff < 0 && currentMobilePage > 1) {
                    // Swipe right -> previous page
                    mobileGoToPage(currentMobilePage - 1);
                }
            }
        }

        function initMobileDimensionListeners() {
            // ICH Select
            const mobileIchSelect = document.getElementById('mobileIchSelect');
            if (mobileIchSelect) {
                mobileIchSelect.addEventListener('change', (e) => {
                    mobileIchArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('ich', e.target.value);
                    }
                    // Sync with desktop
                    const desktopSelect = document.getElementById('ichSelect');
                    if (desktopSelect) desktopSelect.value = e.target.value;
                    currentArchetype = e.target.value;
                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // Partner Select
            const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
            if (mobilePartnerSelect) {
                mobilePartnerSelect.addEventListener('change', (e) => {
                    mobilePartnerArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('partner', e.target.value);
                    }
                    // Sync with desktop
                    const desktopSelect = document.getElementById('partnerSelect');
                    if (desktopSelect) desktopSelect.value = e.target.value;
                    selectedPartner = e.target.value;
                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // ICH Dimensions
            document.querySelectorAll('input[name="mobile-ich-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('ich', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="mobile-ich-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('ich', e.target.value, true);
                });
            });
            document.querySelectorAll('input[name="mobile-ich-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    mobilePersonDimensions.ich.dominanzStatus = e.target.value;
                    personDimensions.ich.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    syncDimensionToDesktop('ich-dominanz-status-new', e.target.value);
                    updateComparisonView();
                });
            });

            // Partner Dimensions
            document.querySelectorAll('input[name="mobile-partner-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('partner', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="mobile-partner-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('partner', e.target.value, true);
                });
            });
            document.querySelectorAll('input[name="mobile-partner-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    mobilePersonDimensions.partner.dominanzStatus = e.target.value;
                    personDimensions.partner.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    syncDimensionToDesktop('partner-dominanz-status-new', e.target.value);
                    updateComparisonView();
                });
            });
        }

        function syncDimensionToDesktop(name, value) {
            const desktopRadio = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (desktopRadio) {
                desktopRadio.checked = true;
                const container = desktopRadio.closest('.compact-dimension');
                if (container) container.classList.remove('needs-selection');
            }
        }

        function updateMobileResultPage() {
            if (!data) return;

            const ichArch = data.archetypes[mobileIchArchetype || currentArchetype];
            const partnerArch = data.archetypes[mobilePartnerArchetype || selectedPartner];

            // Update type names
            document.getElementById('mobileResultIch').textContent = ichArch?.name || mobileIchArchetype;
            document.getElementById('mobileResultPartner').textContent = partnerArch?.name || mobilePartnerArchetype;

            // Calculate scores - use mobilePersonDimensions for consistency with tooltips
            const dims = mobilePersonDimensions;
            const person1 = { archetyp: mobileIchArchetype || currentArchetype, ...dims.ich };
            const person2 = { archetyp: mobilePartnerArchetype || selectedPartner, ...dims.partner };

            // Check if both genders are selected before calculating
            // Support both string format ('cis_mann') and object format ({ primary: 'cis_mann' })
            const g1Raw = dims.ich.geschlecht;
            const g2Raw = dims.partner.geschlecht;
            const g1 = (typeof g1Raw === 'string') ? g1Raw : (g1Raw && g1Raw.primary);
            const g2 = (typeof g2Raw === 'string') ? g2Raw : (g2Raw && g2Raw.primary);

            // Check if any orientierung is selected for both (Primary/Secondary structure)
            const hasOri1 = dims.ich.orientierung && dims.ich.orientierung.primary;
            const hasOri2 = dims.partner.orientierung && dims.partner.orientierung.primary;

            // Check if any dominanz is selected for both (Primary/Secondary structure)
            const hasDom1 = dims.ich.dominanz && dims.ich.dominanz.primary;
            const hasDom2 = dims.partner.dominanz && dims.partner.dominanz.primary;

            const isIncomplete = !g1 || !g2 || !hasOri1 || !hasOri2 || !hasDom1 || !hasDom2;

            const qualityResult = isIncomplete ?
                { score: 0, blocked: false, incomplete: true, breakdown: { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 } } :
                calculateRelationshipQuality(person1, person2);

            // Update score circle
            const scoreCircle = document.getElementById('mobileScoreCircle');

            // Set score circle color and content
            // Kein harter K.O. mehr - sanfte Abstufung durch Resonanz
            if (qualityResult.incomplete) {
                scoreCircle.textContent = '–';
            } else {
                scoreCircle.textContent = qualityResult.score.toFixed(1);
            }
            scoreCircle.style.background = 'transparent';

            // Sync score to resultPercentage for Tiage's Synthese modal
            const resultPercentageEl = document.getElementById('resultPercentage');
            if (resultPercentageEl) {
                resultPercentageEl.textContent = qualityResult.incomplete ? '–' : qualityResult.score.toFixed(1);
            }

            // Update Mobile Score Note (direkt beim Kreis)
            const mobileScoreNote = document.getElementById('mobileScoreNote');
            if (mobileScoreNote) {
                let noteText = '';
                let quoteText = '';
                let quoteSource = '';
                const score = qualityResult.score;

                // ═══════════════════════════════════════════════════════════════
                // K.O.-WARNUNG: Prüfe auf harte Ausschlusskriterien
                // ═══════════════════════════════════════════════════════════════
                let koWarning = null;

                // 1. Orientierungs-K.O. (keine körperliche Anziehung möglich)
                if (qualityResult.blocked && qualityResult.reason) {
                    koWarning = {
                        type: 'orientation',
                        message: qualityResult.reason
                    };
                }

                // 2. Lifestyle-K.O. prüfen (Kinderwunsch, Wohnform etc.)
                if (!koWarning && typeof TiageSynthesis !== 'undefined' && TiageSynthesis.LifestyleFilter) {
                    const attrs1 = personDimensions.ich?.baseAttributes || {};
                    const attrs2 = personDimensions.partner?.baseAttributes || {};
                    const lifestyleCheck = TiageSynthesis.LifestyleFilter.check(attrs1, attrs2);

                    if (lifestyleCheck.isKO && lifestyleCheck.koReasons.length > 0) {
                        koWarning = {
                            type: 'lifestyle',
                            message: lifestyleCheck.koReasons.map(r => r.message).join(' | '),
                            details: lifestyleCheck.koReasons
                        };
                    }
                }

                if (qualityResult.incomplete) {
                    noteText = 'Bitte alle Dimensionen auswählen.';
                    mobileScoreNote.textContent = noteText;
                    mobileScoreNote.style.display = 'block';
                } else if (koWarning) {
                    // K.O.-Warnung anzeigen
                    mobileScoreNote.innerHTML = '<div class="ko-warning-message" style="color: #e74c3c; background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; border-radius: 8px; padding: 10px 12px; margin-top: 8px; text-align: center;"><strong style="display: block; margin-bottom: 4px;">⚠️ K.O.-Kriterium</strong><span style="font-size: 0.9em; opacity: 0.95;">' + koWarning.message + '</span></div>';
                    mobileScoreNote.style.display = 'block';
                } else {
                    // Bestimme Resonanzlevel basierend auf Score
                    let resonanceLevel = 'niedrig';
                    if (score >= 80) resonanceLevel = 'hoch';
                    else if (score >= 50) resonanceLevel = 'mittel';

                    // Versuche Zitat aus ResonanceQuotesTable zu holen
                    if (typeof ResonanceQuotesTable !== 'undefined') {
                        const category = score >= 65 ? 'RESONANCE' : score >= 50 ? 'GROWTH' : 'AWARENESS';
                        const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

                        if (result && result.quote) {
                            noteText = result.title;
                            quoteText = result.quote;
                            quoteSource = result.quoteSource ? ` — ${result.quoteSource}` : '';
                        }
                    }

                    // Fallback zu hardcoded Texten wenn ResonanceQuotesTable nicht verfügbar
                    if (!quoteText) {
                        if (score < 30) {
                            noteText = 'Sehr niedrige Resonanz – große Unterschiede.';
                            quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich deutlich unterscheiden. Diese Beziehung erfordert besondere Achtsamkeit und die Bereitschaft, die Andersartigkeit des anderen als Bereicherung zu sehen.';
                        } else if (score >= 80) {
                            noteText = 'Hohe Resonanz – Muster ergänzen sich.';
                            quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich ergänzen. Diese Verbindung trägt die Qualität tiefer Resonanz – ein Zusammenspiel, das beide bereichert und wachsen lässt.';
                        } else if (score >= 65) {
                            noteText = 'Solide Balance mit Potenzial.';
                            quoteText = 'Hier begegnen sich zwei Menschen mit guter Grundresonanz. Diese Verbindung bietet eine solide Balance und echtes Potenzial für gemeinsames Wachstum.';
                        } else if (score >= 50) {
                            noteText = 'Basis vorhanden, Arbeit erforderlich.';
                            quoteText = 'Hier begegnen sich zwei Menschen mit einer tragfähigen Basis. Diese Verbindung hat Qualität, die durch bewusste Kommunikation und gegenseitiges Verständnis vertieft werden kann.';
                        } else {
                            noteText = 'Bewusste Reflexion erforderlich.';
                            quoteText = 'Hier begegnen sich zwei Menschen mit unterschiedlichen Mustern. Diese Verbindung lädt zur bewussten Reflexion ein – ein Weg, der Offenheit und ehrliche Kommunikation erfordert.';
                        }
                    }

                    mobileScoreNote.innerHTML = '<strong>' + noteText + '</strong><br><span style="font-style: italic; opacity: 0.85; font-size: 0.9em;">"' + quoteText + '"' + quoteSource + '</span>';
                    mobileScoreNote.style.display = 'block';
                }
            }
        }

        function updateMobileProContraPage() {
            if (!data) return;

            const ichArch = data.archetypes[mobileIchArchetype || currentArchetype];
            const partnerArch = data.archetypes[mobilePartnerArchetype || selectedPartner];

            // Update title
            const title = document.getElementById('mobileProContraTitle');
            if (title) {
                title.textContent = `${ichArch?.name || 'ICH'} × ${partnerArch?.name || 'PARTNER'}`;
            }

            // Get interaction data
            const interactionKey = `${mobileIchArchetype || currentArchetype}_${mobilePartnerArchetype || selectedPartner}`;
            const interaction = data.interactions?.[interactionKey];

            const proList = document.getElementById('mobileProList');
            const contraList = document.getElementById('mobileContraList');

            if (interaction) {
                // Pro list
                if (proList && interaction.pros?.length) {
                    proList.innerHTML = interaction.pros.map(p => `<li>${p}</li>`).join('');
                } else if (proList) {
                    proList.innerHTML = '<li>Keine spezifischen Vorteile bekannt</li>';
                }

                // Contra list
                if (contraList && interaction.contras?.length) {
                    contraList.innerHTML = interaction.contras.map(c => `<li>${c}</li>`).join('');
                } else if (contraList) {
                    contraList.innerHTML = '<li>Keine spezifischen Herausforderungen bekannt</li>';
                }
            } else {
                if (proList) proList.innerHTML = '<li>Keine Daten verfügbar</li>';
                if (contraList) contraList.innerHTML = '<li>Keine Daten verfügbar</li>';
            }
        }

        function updateMobileCategoriesPage() {
            if (!data) return;

            const container = document.getElementById('mobileCategoriesAccordion');
            if (!container) return;

            const person1 = { archetyp: mobileIchArchetype || currentArchetype, ...personDimensions.ich };
            const person2 = { archetyp: mobilePartnerArchetype || selectedPartner, ...personDimensions.partner };

            const pathosCheck = checkPhysicalCompatibility(person1, person2);
            const logosCheck = calculatePhilosophyCompatibility(person1.archetyp, person2.archetyp);
            const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);

            const categoryNamesMap = {
                A: 'Beziehungsphilosophie',
                B: 'Werte-Alignment',
                C: 'Nähe-Distanz',
                D: 'Autonomie',
                E: 'Kommunikation',
                F: 'Soziale Kompatibilität'
            };

            const categoryDescMap = {
                A: 'Übereinstimmung in den grundlegenden Beziehungsvorstellungen und -erwartungen.',
                B: 'Wie gut eure moralischen und ethischen Werte übereinstimmen.',
                C: 'Balance zwischen Bedürfnis nach Nähe und Freiraum.',
                D: 'Respekt für individuelle Unabhängigkeit und Selbstbestimmung.',
                E: 'Fähigkeit zur offenen und ehrlichen Kommunikation.',
                F: 'Kompatibilität im sozialen Umfeld und gesellschaftlicher Akzeptanz.'
            };

            // FEATURE 2: Category explanations
            function getCategoryExplanation(cat, score, ich, partner) {
                const ichName = data?.archetypes?.[ich]?.name || ich;
                const partnerName = data?.archetypes?.[partner]?.name || partner;

                const explanations = {
                    A: () => {
                        if (ich === partner) {
                            return `${ichName} und ${partnerName} teilen dieselbe Beziehungsphilosophie (100% Übereinstimmung). Beide haben identische Grundüberzeugungen über Beziehungsstrukturen, was eine solide Basis bietet.`;
                        }
                        if (score >= 80) {
                            return `${ichName} und ${partnerName} haben sehr ähnliche Beziehungsphilosophien (${score}%). Die Grundüberzeugungen passen gut zusammen und schaffen eine harmonische Basis.`;
                        } else if (score >= 60) {
                            return `${ichName} (sucht ${ichName === 'Single' ? 'Freiheit' : ichName === 'Duo' ? 'Exklusivität' : 'Flexibilität'}) und ${partnerName} (sucht ${partnerName === 'Single' ? 'Freiheit' : partnerName === 'Duo' ? 'Exklusivität' : 'Flexibilität'}) haben unterschiedliche, aber vereinbare Beziehungsphilosophien (${score}%). Mit Kommunikation und Verständnis ist eine Brücke möglich.`;
                        } else {
                            return `${ichName} und ${partnerName} haben fundamentale philosophische Unterschiede (${score}%). Die Beziehungsvorstellungen weichen stark voneinander ab. Intensive Kommunikation und große Kompromisse sind nötig.`;
                        }
                    },
                    B: () => `Diese Kategorie misst, wie gut eure moralischen Werte übereinstimmen. Ein Score von ${score}% zeigt ${score >= 70 ? 'starke' : score >= 50 ? 'moderate' : 'schwache'} Übereinstimmung in ethischen Grundfragen.`,
                    C: () => `Nähe-Distanz bewertet das Gleichgewicht zwischen Zusammensein und Freiraum. Bei ${score}% gibt es ${score >= 70 ? 'eine harmonische Balance' : score >= 50 ? 'moderate Abstimmung nötig' : 'deutliche Unterschiede in den Bedürfnissen'}.`,
                    D: () => `Autonomie misst den Respekt für individuelle Freiheit. ${score}% bedeutet ${score >= 70 ? 'hohe gegenseitige Wertschätzung' : score >= 50 ? 'moderate Übereinstimmung' : 'Spannungen durch unterschiedliche Autonomie-Bedürfnisse'}.`,
                    E: () => `Kommunikation bewertet Offenheit und Ehrlichkeit. Ein Score von ${score}% zeigt ${score >= 70 ? 'exzellente Kommunikationsbasis' : score >= 50 ? 'solide, aber ausbaufähige Kommunikation' : 'Herausforderungen in der Verständigung'}.`,
                    F: () => `Soziale Kompatibilität bewertet gesellschaftliche Akzeptanz und Umfeld-Passung. ${score}% bedeutet ${score >= 70 ? 'sehr gute soziale Harmonie' : score >= 50 ? 'akzeptable soziale Integration' : 'potenzielle soziale Herausforderungen'}.`
                };

                return explanations[cat] ? explanations[cat]() : '';
            }

            let html = '';
            for (const [cat, catData] of Object.entries(result.categories)) {
                const score = catData.score || 0;
                const barClass = score >= 80 ? 'bar-excellent' : score >= 65 ? 'bar-good' : score >= 50 ? 'bar-medium' : 'bar-low';
                const explanation = getCategoryExplanation(cat, score, person1.archetyp, person2.archetyp);

                html += `
                    <div class="category-accordion-item">
                        <div class="category-accordion-header" onclick="toggleMobileCategory(this)">
                            <span class="category-accordion-letter">${cat}</span>
                            <span class="category-accordion-name">${categoryNamesMap[cat] || cat}</span>
                            <span class="category-accordion-score">${score}%</span>
                            <span class="category-accordion-icon">▼</span>
                        </div>
                        <div class="category-accordion-content">
                            <div class="category-accordion-inner">
                                <p class="category-accordion-desc">${categoryDescMap[cat] || ''}</p>
                                <div style="margin-top: 10px; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                                    <div class="${barClass}" style="height: 100%; width: ${score}%; border-radius: 4px;"></div>
                                </div>
                                <div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--primary);">
                                    <h4 style="font-size: var(--font-sm); color: var(--text-primary); margin-bottom: 8px;">Warum ${score}%?</h4>
                                    <p style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">${explanation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            container.innerHTML = html;
        }

        function toggleMobileCategory(header) {
            const item = header.closest('.category-accordion-item');
            if (item) {
                item.classList.toggle('open');
            }
        }

        function checkAndShowMobileLayout() {
            const isMobile = window.innerWidth <= 768;
            const desktopView = document.getElementById('comparisonView');
            const mobileView = document.getElementById('mobileMultipage');

            if (isMobile) {
                if (desktopView) desktopView.style.display = 'none';
                if (mobileView) mobileView.style.display = 'block';
            } else {
                if (desktopView) desktopView.style.display = 'block';
                if (mobileView) mobileView.style.display = 'none';
            }
        }

        function initMobileLayout() {
            initMobileSwipe();
            initMobileDimensionListeners();
            checkAndShowMobileLayout();

            // Listen for window resize
            window.addEventListener('resize', checkAndShowMobileLayout);

            // Initialize browser history for back button support
            initBrowserHistoryNavigation();
        }

        function initBrowserHistoryNavigation() {
            // Set initial state without adding to history
            history.replaceState({ mobilePage: 1 }, '', '#seite1');

            // Handle browser back/forward button
            window.addEventListener('popstate', function(event) {
                // First, close any open modals when going back
                const factorModal = document.getElementById('factorModal');
                const helpModal = document.getElementById('helpModal');
                const commentModal = document.getElementById('commentModal');
                const tiageSyntheseModal = document.getElementById('tiageSyntheseModal');

                // Check if we're returning FROM a modal state (current modal should close)
                if (factorModal && factorModal.classList.contains('active')) {
                    closeFactorModal(null, true);
                }
                if (helpModal && helpModal.classList.contains('active')) {
                    closeHelpModal(null, true);
                }
                if (commentModal && commentModal.classList.contains('active')) {
                    closeCommentModal(null, true);
                }
                if (tiageSyntheseModal && tiageSyntheseModal.classList.contains('active')) {
                    closeTiageSyntheseModal(null, true);
                }

                // Navigate to the correct page
                if (event.state && event.state.mobilePage) {
                    // Only change page if we're not on a modal state
                    if (!event.state.modal) {
                        mobileGoToPage(event.state.mobilePage, true);
                    }
                } else {
                    // If no state, go to page 1
                    mobileGoToPage(1, true);
                }
            });

            // Handle initial load with hash (e.g., direct link to #seite2)
            const hash = window.location.hash;
            if (hash && hash.startsWith('#seite')) {
                const pageNum = parseInt(hash.replace('#seite', ''));
                if (pageNum >= 1 && pageNum <= 3) {
                    // Delay to ensure DOM is ready
                    setTimeout(() => {
                        // For page 2 and 3, we need valid selections - go to page 1 first
                        if (pageNum > 1) {
                            mobileGoToPage(1, true);
                        }
                    }, 100);
                }
            }
        }

        /**
         * Load saved dimensions from TiageState into local personDimensions variable
         * This ensures the UI reflects any previously saved selections
         */
        function loadDimensionsFromState() {
            if (typeof TiageState === 'undefined') return;

            // Load from TiageState
            TiageState.loadFromStorage();

            // Load archetypes from TiageState and sync with global variables (Desktop + Mobile)
            const savedIchArchetype = TiageState.getArchetype('ich');
            const savedPartnerArchetype = TiageState.getArchetype('partner');

            if (savedIchArchetype) {
                currentArchetype = savedIchArchetype;
                mobileIchArchetype = savedIchArchetype;
                // Sync all ICH select dropdowns
                const archetypeSelect = document.getElementById('archetypeSelect');
                const ichSelect = document.getElementById('ichSelect');
                const mobileIchSelect = document.getElementById('mobileIchSelect');
                if (archetypeSelect) archetypeSelect.value = savedIchArchetype;
                if (ichSelect) ichSelect.value = savedIchArchetype;
                if (mobileIchSelect) mobileIchSelect.value = savedIchArchetype;
                // Sync archetype grid highlighting
                if (typeof updateArchetypeGrid === 'function') {
                    updateArchetypeGrid('ich', savedIchArchetype);
                }
            }

            if (savedPartnerArchetype) {
                selectedPartner = savedPartnerArchetype;
                mobilePartnerArchetype = savedPartnerArchetype;
                // Sync all PARTNER select dropdowns
                const partnerSelect = document.getElementById('partnerSelect');
                const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
                if (partnerSelect) partnerSelect.value = savedPartnerArchetype;
                if (mobilePartnerSelect) mobilePartnerSelect.value = savedPartnerArchetype;
                // Sync archetype grid highlighting
                if (typeof updateArchetypeGrid === 'function') {
                    updateArchetypeGrid('partner', savedPartnerArchetype);
                }
            }

            ['ich', 'partner'].forEach(person => {
                const savedDims = TiageState.get(`personDimensions.${person}`);
                if (!savedDims) return;

                // Sync geschlecht
                if (savedDims.geschlecht) {
                    // Handle both old format (string) and new format (object with primary/secondary)
                    if (typeof savedDims.geschlecht === 'object' && 'primary' in savedDims.geschlecht) {
                        personDimensions[person].geschlecht = savedDims.geschlecht;
                    } else if (typeof savedDims.geschlecht === 'string') {
                        // Old format: string like "cis_frau" - convert to new format as primary
                        personDimensions[person].geschlecht = { primary: savedDims.geschlecht, secondary: null };
                    }
                }

                // Sync dominanz - handle both formats
                if (savedDims.dominanz) {
                    if (typeof savedDims.dominanz === 'object') {
                        // New format: { primary: 'dominant', secondary: null }
                        if ('primary' in savedDims.dominanz) {
                            personDimensions[person].dominanz = savedDims.dominanz;
                        } else {
                            // Old format: { dominant: 'gelebt', submissiv: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(savedDims.dominanz)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions[person].dominanz = { primary, secondary };
                        }
                    }
                }

                // Sync orientierung - handle both formats
                if (savedDims.orientierung) {
                    if (typeof savedDims.orientierung === 'object') {
                        // New format: { primary: 'heterosexuell', secondary: null }
                        if ('primary' in savedDims.orientierung) {
                            personDimensions[person].orientierung = savedDims.orientierung;
                        } else {
                            // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(savedDims.orientierung)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions[person].orientierung = { primary, secondary };
                        }
                    }
                }

                // Sync GFK if present
                if (savedDims.gfk) {
                    personDimensions[person].gfk = savedDims.gfk;
                }

                // Sync mobilePersonDimensions if it exists
                if (typeof mobilePersonDimensions !== 'undefined') {
                    mobilePersonDimensions[person].geschlecht = personDimensions[person].geschlecht;
                    mobilePersonDimensions[person].dominanz = personDimensions[person].dominanz;
                    mobilePersonDimensions[person].orientierung = personDimensions[person].orientierung;
                }

                // Sync UI elements after loading (Desktop + Mobile einheitlich)
                if (typeof syncGeschlechtUI === 'function') {
                    syncGeschlechtUI(person);
                }
                if (typeof syncDominanzUI === 'function') {
                    syncDominanzUI(person);  // Enthält jetzt auch syncMobileStatusButtons
                }
                if (typeof syncOrientierungUI === 'function') {
                    syncOrientierungUI(person);  // Enthält jetzt auch syncMobileStatusButtons
                }
            });

            // Update entire UI after loading all dimensions and archetypes
            // This ensures all UI elements reflect the loaded state
            if (typeof updateAll === 'function') {
                updateAll();
            }
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', async function() {
            console.log('[TIAGE DEBUG] DOMContentLoaded fired');
            try {
                // Load archetype data first - this is critical for all other functions
                console.log('[TIAGE DEBUG] Before loadData');
                await loadData();
                console.log('[TIAGE DEBUG] After loadData, data loaded:', data !== null);

                checkAgeVerification();
                initAgeVerification();
                initFeedbackSystem();
                initVisitorId();
                console.log('[TIAGE DEBUG] Before initDimensionListeners');
                initDimensionListeners();
                console.log('[TIAGE DEBUG] Before initComparisonLayout');
                initComparisonLayout();
                console.log('[TIAGE DEBUG] Before initMobileLayout');
                initMobileLayout();
                console.log('[TIAGE DEBUG] Before initDimensionButtons');
                initDimensionButtons();
                console.log('[TIAGE DEBUG] After initDimensionButtons');
                initGeschlechtHoverEvents();
                console.log('[TIAGE DEBUG] Before loadDimensionsFromState');
                // Load saved dimensions from TiageState AFTER initializing buttons
                // so that UI sync functions can update the buttons
                loadDimensionsFromState();
                // Initialize all summary displays in header
                updateGeschlechtSummary('ich');
                updateGeschlechtSummary('partner');
                updateDominanzSummary('ich');
                updateDominanzSummary('partner');
                updateOrientierungSummary('ich');
                updateOrientierungSummary('partner');
                // GFK automatisch aus Archetypen-Matching setzen
                updateGfkFromArchetypes();

                // Note: openComments=1 parameter is now handled in handleAgeConfirm()
                // to ensure age verification is completed before opening comments modal

                console.log('[TIAGE DEBUG] DOMContentLoaded completed successfully');
            } catch (e) {
                console.error('[TIAGE ERROR] DOMContentLoaded failed:', e);
            }
        });

        // ========================================
        // FEATURE 1: Factor Detail Modal
        // ========================================

        const factorExplanations = {
            archetyp: {
                title: 'Archetyp-Übereinstimmung',
                subtitle: '(Beziehungsphilosophie - Verstand&Logos)',
                getExplanation: (ich, partner, score) => {
                    const ichName = data?.archetypes?.[ich]?.name || ich;
                    const partnerName = data?.archetypes?.[partner]?.name || partner;

                    if (ich === partner) {
                        return `${ichName} und ${partnerName} teilen dieselbe Beziehungsphilosophie. Beide haben identische Grundüberzeugungen über Beziehungsstrukturen.`;
                    }

                    if (score >= 80) {
                        return `${ichName} und ${partnerName} haben sehr ähnliche Beziehungsphilosophien. Die Grundüberzeugungen passen gut zusammen und erfordern nur minimale Kompromisse.`;
                    } else if (score >= 60) {
                        return `${ichName} und ${partnerName} haben unterschiedliche, aber kompatible Beziehungsphilosophien. Beide Archetypen können sich mit Kommunikation und Verständnis ergänzen.`;
                    } else {
                        return `${ichName} und ${partnerName} haben fundamentale philosophische Unterschiede. Die Beziehungsvorstellungen weichen stark voneinander ab und erfordern intensive Kommunikation.`;
                    }
                },
                getMeaning: (score, ich, partner) => {
                    const ichName = data?.archetypes?.[ich]?.name || ich;
                    const partnerName = data?.archetypes?.[partner]?.name || partner;
                    const rhetoricNote = { title: '💡 Warum Logos (Verstand)?', desc: 'Archetypen basieren auf rationalen Beziehungsphilosophien und bewussten Überzeugungen – sie sprechen den Verstand an, nicht das Gefühl.' };

                    if (ich === partner) {
                        return [
                            rhetoricNote,
                            { title: `📌 In dieser Kombination teilen beide denselben Archetyp "${ichName}" – maximale philosophische Übereinstimmung.`, desc: '' },
                            { title: 'Gleiche Grundüberzeugungen', desc: 'Beide haben identische Vorstellungen davon, wie eine Beziehung funktionieren sollte.' },
                            { title: 'Intuitive Verständigung', desc: 'Die gemeinsame Basis ermöglicht tiefes gegenseitiges Verstehen ohne lange Erklärungen.' },
                            { title: 'Natürliche Harmonie', desc: 'Keine grundsätzlichen Konflikte durch unterschiedliche Beziehungsphilosophien.' }
                        ];
                    }

                    if (score >= 80) {
                        return [
                            rhetoricNote,
                            { title: `📌 In dieser Kombination von "${ichName}" und "${partnerName}" ergänzen sich die Beziehungsphilosophien sehr gut.`, desc: '' },
                            { title: 'Hohe philosophische Übereinstimmung', desc: 'Beide teilen ähnliche Grundwerte und Beziehungsideale.' },
                            { title: 'Wenige grundsätzliche Konflikte', desc: 'Weltanschauung und Lebensziele sind weitgehend kompatibel.' },
                            { title: 'Ähnliche Erwartungen an die Beziehung', desc: 'Was beide von Partnerschaft erwarten, deckt sich gut.' }
                        ];
                    } else if (score >= 60) {
                        return [
                            rhetoricNote,
                            { title: `📌 In dieser Kombination von "${ichName}" und "${partnerName}" gibt es sowohl Gemeinsamkeiten als auch deutliche Unterschiede.`, desc: '' },
                            { title: 'Mittlere philosophische Übereinstimmung', desc: 'Grundwerte überlappen, aber es gibt Unterschiede.' },
                            { title: 'Kompromisse und Kommunikation nötig', desc: 'Unterschiedliche Prioritäten erfordern regelmäßigen Austausch.' },
                            { title: 'Unterschiedliche, aber vereinbare Bedürfnisse', desc: 'Mit Flexibilität können beide Seiten zufrieden sein.' }
                        ];
                    } else {
                        return [
                            rhetoricNote,
                            { title: `📌 In dieser Kombination von "${ichName}" und "${partnerName}" prallen grundlegend verschiedene Beziehungsphilosophien aufeinander.`, desc: '' },
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
                getExplanation: (ich, partner, score, dimensions) => {
                    // Use passed dimensions, fallback to mobilePersonDimensions for backward compatibility
                    const dims = dimensions || mobilePersonDimensions;
                    const ichDomObj = dims.ich.dominanz;
                    const partnerDomObj = dims.partner.dominanz;

                    // Translate values to German labels for display
                    const domLabels = {
                        'dominant': 'dominant',
                        'submissiv': 'submissiv',
                        'switch': 'Switch',
                        'ausgeglichen': 'ausgeglichen'
                    };

                    // Harmony matrix for finding best combination
                    const harmonyMatrix = {
                        "dominant-submissiv": 100, "submissiv-dominant": 100,
                        "ausgeglichen-ausgeglichen": 95, "switch-switch": 90,
                        "switch-ausgeglichen": 88, "ausgeglichen-switch": 88,
                        "dominant-ausgeglichen": 85, "ausgeglichen-dominant": 85,
                        "submissiv-ausgeglichen": 85, "ausgeglichen-submissiv": 85,
                        "switch-dominant": 80, "dominant-switch": 80,
                        "switch-submissiv": 80, "submissiv-switch": 80,
                        "dominant-dominant": 55, "submissiv-submissiv": 55
                    };

                    // Helper to get all selections with status
                    const getAllSelections = (domObj) => {
                        if (!domObj || typeof domObj !== 'object') return [];
                        const selections = [];
                        for (const [type, status] of Object.entries(domObj)) {
                            if (status) selections.push({ type, status });
                        }
                        return selections;
                    };

                    const ichSelections = getAllSelections(ichDomObj);
                    const partnerSelections = getAllSelections(partnerDomObj);

                    if (ichSelections.length === 0 || partnerSelections.length === 0) {
                        return 'Bitte wähle für beide Personen mindestens eine Dominanz-Tendenz.';
                    }

                    // Find best combination across ALL selections (primary + secondary)
                    let bestCombo = null;
                    let bestScore = 0;
                    for (const ichSel of ichSelections) {
                        for (const partnerSel of partnerSelections) {
                            const key = `${ichSel.type}-${partnerSel.type}`;
                            let baseScore = harmonyMatrix[key] || harmonyMatrix[`${partnerSel.type}-${ichSel.type}`] || 75;
                            // Reduce score if either is "interessiert"
                            const hasInteressiert = ichSel.status === 'interessiert' || partnerSel.status === 'interessiert';
                            const adjustedScore = hasInteressiert ? Math.round(baseScore * 0.7) : baseScore;
                            if (adjustedScore > bestScore) {
                                bestScore = adjustedScore;
                                bestCombo = { ich: ichSel, partner: partnerSel, hasInteressiert, baseScore };
                            }
                        }
                    }

                    if (!bestCombo) {
                        return 'Keine kompatible Dominanz-Kombination gefunden.';
                    }

                    const ichType = bestCombo.ich.type;
                    const partnerType = bestCombo.partner.type;
                    const ichStatusLabel = bestCombo.ich.status === 'gelebt' ? 'Gelebt' : 'Interessiert';
                    const partnerStatusLabel = bestCombo.partner.status === 'gelebt' ? 'Gelebt' : 'Interessiert';

                    // Build explanation based on best combination
                    let explanation = `Beste Kombination: ${domLabels[ichType]} (${ichStatusLabel}) ↔ ${domLabels[partnerType]} (${partnerStatusLabel}). `;

                    if (ichType === partnerType) {
                        if (ichType === 'ausgeglichen' || ichType === 'switch') {
                            explanation += `Beide bevorzugen ${domLabels[ichType]} - flexible Dynamik möglich.`;
                        } else if (ichType === 'dominant') {
                            explanation += `Beide dominant - Machtkampf-Risiko, aber mit Kommunikation machbar.`;
                        } else if (ichType === 'submissiv') {
                            explanation += `Beide submissiv - Führungsvakuum-Risiko, klare Absprachen wichtig.`;
                        }
                    } else if ((ichType === 'dominant' && partnerType === 'submissiv') ||
                               (ichType === 'submissiv' && partnerType === 'dominant')) {
                        explanation += `Perfekte Komplementarität in der emotionalen Dynamik!`;
                    } else {
                        explanation += `Interessante Dynamik mit Flexibilitätspotential.`;
                    }

                    // Add warning if best combo uses "interessiert"
                    if (bestCombo.hasInteressiert) {
                        explanation += ` ⚠️ Exploration-Phase: Reduzierte Konfidenz (${bestCombo.baseScore}% → ${bestScore}%).`;
                    }

                    return explanation;
                },
                getMeaning: (score) => {
                    const rhetoricNote = { title: '💡 Warum Pathos (Gefühl)?', desc: 'Dominanz-Dynamik wirkt auf der emotionalen Ebene – wer führt, wer folgt, entsteht aus Gefühl und Instinkt, nicht aus rationaler Überlegung.' };
                    if (score >= 80) {
                        return [
                            rhetoricNote,
                            { title: 'Harmonische emotionale Dynamik', desc: 'Die Rollen (Führen/Folgen) ergänzen sich natürlich ohne Reibung.' },
                            { title: 'Natürliche Rollenverteilung', desc: 'Entscheidungen und Verantwortung fließen organisch zwischen beiden.' },
                            { title: 'Geringe Reibungspunkte', desc: 'Wenig Konflikte um Kontrolle oder Passivität zu erwarten.' }
                        ];
                    } else if (score >= 60) {
                        return [
                            rhetoricNote,
                            { title: 'Funktionale emotionale Dynamik', desc: 'Die Rollen funktionieren, sind aber nicht perfekt komplementär.' },
                            { title: 'Flexible Anpassung möglich', desc: 'Mit gegenseitigem Verständnis kann Balance gefunden werden.' },
                            { title: 'Gelegentliche Abstimmung nötig', desc: 'Manchmal braucht es Gespräche über Erwartungen und Bedürfnisse.' }
                        ];
                    } else {
                        // Forschungsbasiert: Sadikaj et al. (2017) - Machtkämpfe bei gleicher Polarität
                        return [
                            rhetoricNote,
                            { title: 'Machtkampf- oder Führungsvakuum-Risiko', desc: 'Beide dominant = Konkurrenzkämpfe. Beide submissiv = keiner übernimmt Führung.' },
                            { title: 'Bewusste Kommunikationsregeln wichtig', desc: 'Klare Absprachen nötig, wer wann welche Rolle übernimmt.' },
                            { title: 'Klare Aufgabenteilung empfohlen', desc: 'Definierte Verantwortungsbereiche reduzieren Konflikte.' }
                        ];
                    }
                }
            },
            orientierung: {
                title: 'Orientierungs-Kompatibilität',
                subtitle: '(Körperliche Anziehung - Gefühl&Pathos)',
                getExplanation: (ich, partner, score, dimensions) => {
                    // Use passed dimensions, fallback to mobilePersonDimensions for backward compatibility
                    const dims = dimensions || mobilePersonDimensions;
                    const ichOri = dims.ich.orientierung;
                    const partnerOri = dims.partner.orientierung;

                    // Translate values to German labels for display
                    const oriLabels = {
                        'heterosexuell': 'heterosexuell',
                        'homosexuell': 'homosexuell',
                        'bisexuell': 'bisexuell'
                    };
                    const ichLabel = oriLabels[ichOri] || ichOri || 'nicht gewählt';
                    const partnerLabel = oriLabels[partnerOri] || partnerOri || 'nicht gewählt';

                    if (score === 100) {
                        return `${ichLabel} und ${partnerLabel} - perfekte Kompatibilität! Körperliche Anziehung ist definitiv möglich.`;
                    } else if (score >= 50) {
                        return `${ichLabel} und ${partnerLabel} - Anziehung ist möglich, besonders wenn mindestens eine Person bisexuell orientiert ist.`;
                    } else {
                        return `${ichLabel} und ${partnerLabel} - Keine körperliche Anziehung möglich aufgrund der sexuellen Orientierungen.`;
                    }
                },
                getMeaning: (score) => {
                    const rhetoricNote = { title: '💡 Warum Pathos (Gefühl)?', desc: 'Sexuelle Orientierung bestimmt, wen wir körperlich anziehend finden – ein tiefes, unbewusstes Gefühl, keine rationale Wahl.' };
                    if (score === 100) {
                        return [
                            rhetoricNote,
                            { title: 'Vollständige körperliche Kompatibilität', desc: 'Die sexuellen Orientierungen beider passen ideal zusammen.' },
                            { title: 'Keine Barrieren für Anziehung', desc: 'Beide können sich potenziell zueinander hingezogen fühlen.' },
                            { title: 'Basis für romantische Beziehung vorhanden', desc: 'Körperliche Anziehung kann Grundlage für mehr sein.' }
                        ];
                    } else if (score >= 50) {
                        return [
                            rhetoricNote,
                            { title: 'Mögliche körperliche Kompatibilität', desc: 'Unter bestimmten Umständen ist Anziehung möglich.' },
                            { title: 'Anziehung kann entstehen', desc: 'Nicht automatisch, aber nicht ausgeschlossen.' },
                            { title: 'Hängt von individuellen Präferenzen ab', desc: 'Persönliche Neigungen spielen größere Rolle.' }
                        ];
                    } else {
                        return [
                            rhetoricNote,
                            { title: 'Keine körperliche Kompatibilität', desc: 'Die Orientierungen schließen gegenseitige Anziehung aus.' },
                            { title: 'Romantische Beziehung nicht möglich', desc: 'Keine Basis für eine intime Partnerschaft.' },
                            { title: 'Freundschaft möglich', desc: 'Eine platonische Verbindung bleibt eine Option.' }
                        ];
                    }
                }
            },
            geschlecht: {
                title: 'Geschlechts-Attraktion',
                subtitle: '(Gender-Chemie - Gefühl&Pathos)',
                getExplanation: (ich, partner, score, dimensions) => {
                    // Use passed dimensions, fallback to mobilePersonDimensions for backward compatibility
                    const dims = dimensions || mobilePersonDimensions;
                    const ichG = dims.ich.geschlecht;
                    const partnerG = dims.partner.geschlecht;

                    // Translate values to German labels for display
                    const genderLabels = {
                        'männlich': 'männlich',
                        'weiblich': 'weiblich',
                        'non-binär': 'non-binär'
                    };
                    const ichLabel = genderLabels[ichG] || ichG || 'nicht gewählt';
                    const partnerLabel = genderLabels[partnerG] || partnerG || 'nicht gewählt';

                    if (score === 100) {
                        return `Die Geschlechterkonstellation ${ichLabel} × ${partnerLabel} passt perfekt zu den angegebenen Orientierungen.`;
                    } else if (score >= 50) {
                        return `Die Geschlechterkonstellation ${ichLabel} × ${partnerLabel} ist mit den angegebenen Orientierungen grundsätzlich kompatibel.`;
                    } else {
                        return `Die Geschlechterkonstellation ${ichLabel} × ${partnerLabel} passt nicht zu den angegebenen Orientierungen.`;
                    }
                },
                getMeaning: (score) => {
                    const rhetoricNote = { title: '💡 Warum Pathos (Gefühl)?', desc: 'Gender-Chemie ist die instinktive Reaktion auf das Geschlecht des anderen – ein unbewusstes Gefühl, das körperliche Anziehung auslöst oder blockiert.' };
                    if (score === 100) {
                        return [
                            rhetoricNote,
                            { title: 'Ideale Geschlechterkonstellation', desc: 'Die Geschlechter-Kombination passt perfekt zu beiden Orientierungen.' },
                            { title: 'Maximale Anziehungskraft möglich', desc: 'Gender-Chemie kann voll entfaltet werden.' },
                            { title: 'Keine gender-bezogenen Barrieren', desc: 'Die Geschlechter bilden keine Hürde für Anziehung.' }
                        ];
                    } else if (score >= 50) {
                        return [
                            rhetoricNote,
                            { title: 'Akzeptable Geschlechterkonstellation', desc: 'Nicht optimal, aber funktional für Anziehung.' },
                            { title: 'Anziehung möglich', desc: 'Kann entstehen, ist aber nicht garantiert.' },
                            { title: 'Individuelle Präferenzen entscheidend', desc: 'Persönliche Vorlieben bestimmen den Ausgang.' }
                        ];
                    } else {
                        return [
                            rhetoricNote,
                            { title: 'Inkompatible Geschlechterkonstellation', desc: 'Die Geschlechter-Kombination passt nicht zu den Orientierungen.' },
                            { title: 'Anziehung unwahrscheinlich', desc: 'Körperliche Chemie wird kaum entstehen.' },
                            { title: 'Orientierung passt nicht', desc: 'Die Präferenzen zeigen in andere Richtungen.' }
                        ];
                    }
                }
            }
        };

        function openFactorModal(factorType, source = 'mobile') {
            const factor = factorExplanations[factorType];
            if (!factor) return;

            // Store current factor type and source for navigation
            currentFactorType = factorType;
            currentFactorSource = source;

            const ich = mobileIchArchetype;
            const partner = mobilePartnerArchetype;

            // Use correct dimensions based on source
            const dimensions = source === 'desktop' ? personDimensions : mobilePersonDimensions;

            // Get score from display - support both mobile and desktop
            const prefix = source === 'desktop' ? 'desktopFactor' : 'mobileFactor';
            let score = 0;
            if (factorType === 'archetyp') {
                score = parseInt(document.getElementById(prefix + 'Archetyp').textContent) || 0;
            } else if (factorType === 'dominanz') {
                score = parseInt(document.getElementById(prefix + 'Dominanz').textContent) || 0;
            } else if (factorType === 'orientierung') {
                score = parseInt(document.getElementById(prefix + 'Orientierung').textContent) || 0;
            } else if (factorType === 'geschlecht') {
                score = parseInt(document.getElementById(prefix + 'Geschlecht').textContent) || 0;
            }

            // Update modal content
            document.getElementById('factorModalTitle').textContent = factor.title;
            document.getElementById('factorModalSubtitle').textContent = factor.subtitle;

            // Update archetype navigation display
            updateFactorModalArchetypeDisplay();

            // Show combination code for archetyp and dominanz factors
            const comboCodeEl = document.getElementById('factorModalComboCode');
            if (factorType === 'archetyp' && ich && partner) {
                const comboCode = `${ich}_${partner}`;
                comboCodeEl.textContent = `Code: ${comboCode}`;
                comboCodeEl.style.display = 'inline-block';
            } else if (factorType === 'dominanz') {
                // Get dominanz and orientierung selections for combo code
                const ichDom = dimensions.ich.dominanz;
                const partnerDom = dimensions.partner.dominanz;
                const ichOri = dimensions.ich.orientierung;
                const partnerOri = dimensions.partner.orientierung;
                const domAbbrev = { 'dominant': 'Dom', 'submissiv': 'Sub', 'switch': 'Swi', 'ausgeglichen': 'Aus' };
                const oriAbbrev = { 'heterosexuell': 'Het', 'homosexuell': 'Hom', 'bisexuell': 'Bi' };

                const getSelectedDom = (domObj) => {
                    if (!domObj) return null;
                    for (const [type, status] of Object.entries(domObj)) {
                        if (status) return domAbbrev[type] || type;
                    }
                    return null;
                };

                const getSelectedOri = (oriObj) => {
                    if (!oriObj) return null;
                    for (const [type, status] of Object.entries(oriObj)) {
                        if (status) return oriAbbrev[type] || type;
                    }
                    return null;
                };

                const ichDomCode = getSelectedDom(ichDom);
                const partnerDomCode = getSelectedDom(partnerDom);
                const ichOriCode = getSelectedOri(ichOri);
                const partnerOriCode = getSelectedOri(partnerOri);

                // Build code: Orientierung-Dominanz for each person
                const ichCode = [ichOriCode, ichDomCode].filter(Boolean).join('-');
                const partnerCode = [partnerOriCode, partnerDomCode].filter(Boolean).join('-');

                if (ichCode && partnerCode) {
                    comboCodeEl.textContent = `Code: ${ichCode}_${partnerCode}`;
                    comboCodeEl.style.display = 'inline-block';
                } else if (ichDomCode && partnerDomCode) {
                    // Fallback to just dominanz if orientierung not selected
                    comboCodeEl.textContent = `Code: ${ichDomCode}_${partnerDomCode}`;
                    comboCodeEl.style.display = 'inline-block';
                } else {
                    comboCodeEl.style.display = 'none';
                }
            } else {
                comboCodeEl.style.display = 'none';
            }

            document.getElementById('factorModalScore').textContent = score;
            document.getElementById('factorModalExplanation').textContent = factor.getExplanation(ich, partner, score, dimensions);

            const meaningList = document.getElementById('factorModalMeaning');
            meaningList.innerHTML = '';
            factor.getMeaning(score, ich, partner).forEach(item => {
                const li = document.createElement('li');
                // Support both old (string) and new (object with title+desc) formats
                if (typeof item === 'object' && item.title) {
                    li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                } else {
                    li.textContent = item;
                }
                meaningList.appendChild(li);
            });

            // Show modal
            document.getElementById('factorModal').classList.add('active');
            // Push state for back button to close modal
            history.pushState({ mobilePage: currentMobilePage, modal: 'factor' }, '', `#seite${currentMobilePage}-factor`);
        }

        function closeFactorModal(event, skipHistoryBack = false) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('factorModal').classList.remove('active');
            // Go back in history if not triggered by back button
            if (!skipHistoryBack && history.state && history.state.modal === 'factor') {
                history.back();
            }
        }

        // Ti-Age Synthese Modal Functions (unified Score/Pathos/Logos)
        let currentTiageSyntheseType = localStorage.getItem('tiageSyntheseType') || 'score'; // Sticky: 'score', 'pathos' or 'logos'
        let currentTiageSyntheseContent = { score: '', pathos: '', logos: '' };

        // Legacy aliases for backwards compatibility
        let currentPathosLogosType = currentTiageSyntheseType;
        let currentPathosLogosContent = currentTiageSyntheseContent;

        function openTiageSyntheseModal(type = null) {
            const modal = document.getElementById('tiageSyntheseModal');
            if (!modal) return;

            // Use sticky type if no type specified
            if (type === null) {
                type = currentTiageSyntheseType;
            }
            currentTiageSyntheseType = type;
            currentPathosLogosType = type; // Keep legacy in sync

            // Get current archetypes
            const ichArch = archetypeDescriptions[currentArchetype];
            const partnerArch = archetypeDescriptions[selectedPartner];

            // Update archetype display
            const ichDisplay = document.getElementById('tiageSyntheseModalIch');
            const partnerDisplay = document.getElementById('tiageSyntheseModalPartner');
            if (ichDisplay) ichDisplay.textContent = ichArch?.name || currentArchetype;
            if (partnerDisplay) partnerDisplay.textContent = partnerArch?.name || selectedPartner;

            // Generate content for all types
            currentTiageSyntheseContent.pathos = generateCombinedPathos(ichArch, partnerArch);
            currentTiageSyntheseContent.logos = generateCombinedLogos(ichArch, partnerArch);

            // Show the selected type
            showTiageSyntheseContent(type);

            // Update Score Cycle
            updateSyntheseScoreCycle();

            modal.classList.add('active');
            history.pushState({ mobilePage: currentMobilePage, modal: 'tiagesynthese' }, '', `#seite${currentMobilePage}-tiagesynthese`);
        }

        // Legacy alias
        function openPathosLogosModal(type = null) {
            openTiageSyntheseModal(type);
        }

        // Legacy alias for Pro/Contra modal
        function openProContraModal() {
            openTiageSyntheseModal('score');
        }

        function closeTiageSyntheseModal(event, skipHistoryBack = false) {
            if (event && event.target !== event.currentTarget) return;
            // Stop TTS when modal is closed
            stopTTSOnModalClose();
            const modal = document.getElementById('tiageSyntheseModal');
            if (modal) modal.classList.remove('active');
            if (!skipHistoryBack && history.state && (history.state.modal === 'tiagesynthese' || history.state.modal === 'pathoslogos' || history.state.modal === 'procontra')) {
                history.back();
            }
        }

        // Legacy aliases
        function closePathosLogosModal(event, skipHistoryBack = false) {
            closeTiageSyntheseModal(event, skipHistoryBack);
        }
        function closeProContraModal(event, skipHistoryBack = false) {
            closeTiageSyntheseModal(event, skipHistoryBack);
        }

        function showTiageSyntheseContent(type) {
            currentTiageSyntheseType = type;
            currentPathosLogosType = type; // Keep legacy in sync
            // Stop TTS when switching content
            stopTTSOnModalClose();
            // Save to localStorage for sticky behavior
            localStorage.setItem('tiageSyntheseType', type);
            localStorage.setItem('pathosLogosType', type); // Keep legacy storage

            const titleEl = document.getElementById('tiageSyntheseModalTitle');
            const iconEl = document.getElementById('tiageSyntheseIcon');
            const categoryEl = document.getElementById('tiageSyntheseCategory');
            const subtitleEl = document.getElementById('tiageSyntheseSubtitle');
            const contentEl = document.getElementById('tiageSyntheseModalContent');
            const typeIndicatorEl = document.getElementById('tiageSyntheseTypeIndicator');

            // Sticky side buttons
            const scoreBtn = document.getElementById('tiageSyntheseToggleScore');
            const pathosBtn = document.getElementById('tiageSyntheseTogglePathos');
            const logosBtn = document.getElementById('tiageSyntheseToggleLogos');
            const needsBtn = document.getElementById('tiageSyntheseToggleNeeds');

            // Modal header buttons
            const modalScoreBtn = document.getElementById('modalScoreBtn');
            const modalPathosBtn = document.getElementById('modalPathosBtn');
            const modalLogosBtn = document.getElementById('modalLogosBtn');
            const modalNeedsBtn = document.getElementById('modalNeedsBtn');

            // Reset all sticky side button styles
            [scoreBtn, pathosBtn, logosBtn, needsBtn].forEach(btn => {
                if (btn) {
                    btn.style.background = 'rgba(30,30,35,0.95)';
                    btn.style.color = 'var(--text-muted)';
                    btn.style.border = '1px solid var(--border)';
                }
            });

            // Reset modal header button styles
            [modalScoreBtn, modalPathosBtn, modalLogosBtn, modalNeedsBtn].forEach(btn => {
                if (btn) btn.classList.remove('active');
            });

            if (type === 'score') {
                titleEl.textContent = "Ti-Age Synthese";
                iconEl.textContent = '📊';
                categoryEl.textContent = 'Kompatibilitäts-Analyse';
                subtitleEl.textContent = 'Score – Pro & Contra';
                typeIndicatorEl.style.display = 'flex';
                contentEl.innerHTML = getScoreContent();
                if (scoreBtn) {
                    scoreBtn.style.background = 'rgba(139, 92, 246, 0.3)';
                    scoreBtn.style.color = 'var(--text-primary)';
                    scoreBtn.style.border = '1px solid #8B5CF6';
                }
                if (modalScoreBtn) modalScoreBtn.classList.add('active');
            } else if (type === 'pathos') {
                titleEl.textContent = "Ti-Age Synthese";
                iconEl.textContent = '🔥';
                categoryEl.textContent = 'Dynamische Qualität (Pirsig)';
                subtitleEl.textContent = 'Pathos – Emotionale Resonanz';
                typeIndicatorEl.style.display = 'flex';
                contentEl.innerHTML = getPathosContent();
                if (pathosBtn) {
                    pathosBtn.style.background = 'rgba(231,111,81,0.3)';
                    pathosBtn.style.color = 'var(--text-primary)';
                    pathosBtn.style.border = '1px solid #E76F51';
                }
                if (modalPathosBtn) modalPathosBtn.classList.add('active');
            } else if (type === 'logos') {
                titleEl.textContent = "Ti-Age Synthese";
                iconEl.textContent = '🧠';
                categoryEl.textContent = 'Statische Qualität (Pirsig)';
                subtitleEl.textContent = 'Logos – Rationale Struktur';
                typeIndicatorEl.style.display = 'flex';
                contentEl.innerHTML = getLogosContent();
                if (logosBtn) {
                    logosBtn.style.background = 'rgba(100,149,237,0.3)';
                    logosBtn.style.color = 'var(--text-primary)';
                    logosBtn.style.border = '1px solid #6495ED';
                }
                if (modalLogosBtn) modalLogosBtn.classList.add('active');
            } else if (type === 'needs') {
                titleEl.textContent = "Ti-Age Synthese";
                iconEl.textContent = '💚';
                categoryEl.textContent = 'GFK-Bedürfnisanalyse';
                subtitleEl.textContent = 'Bedürfnis-Match mit Differenz';
                typeIndicatorEl.style.display = 'flex';
                contentEl.innerHTML = getNeedsContent();
                if (needsBtn) {
                    needsBtn.style.background = 'rgba(34, 197, 94, 0.3)';
                    needsBtn.style.color = 'var(--text-primary)';
                    needsBtn.style.border = '1px solid #22c55e';
                }
                if (modalNeedsBtn) modalNeedsBtn.classList.add('active');
            }
        }

        // Legacy alias
        function showPathosLogosContent(type) {
            showTiageSyntheseContent(type);
        }

        /**
         * Generate Score content (formerly Pro & Contra)
         */
        function getScoreContent() {
            // Get current score
            const percentage = document.getElementById('resultPercentage');
            const currentScore = percentage ? percentage.textContent : '0%';
            const scoreValue = parseInt(currentScore) || 0;

            // Set color based on score
            let scoreColor = 'var(--danger)';
            if (scoreValue >= 80) {
                scoreColor = 'var(--success)';
            } else if (scoreValue >= 65) {
                scoreColor = 'var(--primary)';
            } else if (scoreValue >= 50) {
                scoreColor = 'var(--warning)';
            }

            // Generate Pro/Contra
            const dynamicProContra = generateDynamicProContra(
                currentArchetype,
                selectedPartner,
                personDimensions.ich,
                personDimensions.partner
            );

            let proListHtml = '';
            if (dynamicProContra.pro && dynamicProContra.pro.length > 0) {
                proListHtml = dynamicProContra.pro.slice(0, 5).map(s => `<li style="margin-bottom: 8px; padding-left: 8px; border-left: 2px solid var(--success);">${s}</li>`).join('');
            } else {
                proListHtml = '<li style="color: var(--text-muted);">Keine Daten verfügbar</li>';
            }

            let contraListHtml = '';
            if (dynamicProContra.contra && dynamicProContra.contra.length > 0) {
                contraListHtml = dynamicProContra.contra.slice(0, 5).map(c => `<li style="margin-bottom: 8px; padding-left: 8px; border-left: 2px solid var(--danger);">${c}</li>`).join('');
            } else {
                contraListHtml = '<li style="color: var(--text-muted);">Keine Daten verfügbar</li>';
            }

            // Get needs matching content
            const needsHtml = getScoreNeedsContent();

            return `
                <!-- Score Display -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 3rem; font-weight: 700; color: ${scoreColor};">${currentScore}</div>
                </div>
                <!-- Pro/Contra Lists -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <h4 style="color: var(--success); margin-bottom: 12px; font-size: 14px;">✓ Was funktioniert</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">${proListHtml}</ul>
                    </div>
                    <div>
                        <h4 style="color: var(--danger); margin-bottom: 12px; font-size: 14px;">✗ Herausforderungen</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">${contraListHtml}</ul>
                    </div>
                </div>
                <!-- Bedürfnis-Übereinstimmung Section -->
                ${needsHtml}
            `;
        }

        /**
         * Generate Needs Matching content for Score view
         */
        function getScoreNeedsContent() {
            // Use cached matching result (same as displayed on main page)
            const matching = lastGfkMatchingResult;
            if (!matching || matching.score === undefined) {
                return '';
            }

            // Score-Farbe basierend auf Level
            const scoreColor = matching.level === 'hoch' ? '#22c55e' :
                              matching.level === 'mittel' ? '#eab308' : '#ef4444';

            // Vollständige Daten holen - entweder aus dynamischer Berechnung oder aus GfkBeduerfnisse.details
            let gemeinsam = matching.alleGemeinsam || [];
            let unterschiedlich = matching.alleUnterschiedlich || [];

            // Fallback: Wenn keine vollständigen Daten, direkt aus GfkBeduerfnisse holen
            if (gemeinsam.length === 0 && unterschiedlich.length === 0 && typeof GfkBeduerfnisse !== 'undefined') {
                const ichArchetyp = (currentArchetype || '').replace('_', '-');
                const partnerArchetyp = (selectedPartner || '').replace('_', '-');
                const fullMatching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
                if (fullMatching && fullMatching.details) {
                    const uebereinstimmend = (fullMatching.details.uebereinstimmend || []).map(b => ({
                        label: b.label,
                        id: b.id,
                        key: b.id,
                        wert1: b.wert1,
                        wert2: b.wert2,
                        diff: b.diff
                    }));
                    const komplementaer = (fullMatching.details.komplementaer || []).map(b => ({
                        label: b.label,
                        id: b.id,
                        key: b.id,
                        wert1: b.wert1,
                        wert2: b.wert2,
                        diff: b.diff
                    }));
                    gemeinsam = [...uebereinstimmend, ...komplementaer].sort((a, b) =>
                        ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2)
                    );
                    unterschiedlich = (fullMatching.details.konflikt || []).map(b => ({
                        label: b.label,
                        id: b.id,
                        key: b.id,
                        wert1: b.wert1,
                        wert2: b.wert2
                    }));
                }
            }

            // Weitere Fallback: Top-Listen verwenden
            if (gemeinsam.length === 0) gemeinsam = matching.topGemeinsam || [];
            if (unterschiedlich.length === 0) unterschiedlich = matching.topUnterschiedlich || [];

            // Tag-Style - clickable with hover effect
            const tagBaseStyle = `display: inline-block; padding: 4px 10px; margin: 3px; border-radius: 12px; font-size: 12px; font-weight: 500; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;`;
            const greenTagStyle = `${tagBaseStyle} background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); color: #22c55e;`;
            const redTagStyle = `${tagBaseStyle} background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #ef4444;`;

            // Gemeinsame Bedürfnisse Tags (max 8) - clickable
            const gemeinsamTags = gemeinsam.slice(0, 8).map(b => {
                const needId = b.key || b.id;
                const label = typeof TiageI18n !== 'undefined' ? TiageI18n.t(`needs.items.${needId}`, b.label) : b.label;
                const bidDisplay = needId ? `<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">#${needId.toUpperCase()}</span>` : '';
                return `<span style="${greenTagStyle}" onclick="openNeedDefinitionModal('${needId}')" title="Klicken für Definition" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 2px 8px rgba(34,197,94,0.3)'" onmouseout="this.style.transform='';this.style.boxShadow=''">${bidDisplay}${label}</span>`;
            }).join('');

            // Unterschiedliche Bedürfnisse Tags (max 5) - clickable
            const unterschiedlichTags = unterschiedlich.slice(0, 5).map(b => {
                const needId = b.key || b.id;
                const label = typeof TiageI18n !== 'undefined' ? TiageI18n.t(`needs.items.${needId}`, b.label) : b.label;
                const bidDisplay = needId ? `<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">#${needId.toUpperCase()}</span>` : '';
                return `<span style="${redTagStyle}" onclick="openNeedDefinitionModal('${needId}')" title="Klicken für Definition" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 2px 8px rgba(239,68,68,0.3)'" onmouseout="this.style.transform='';this.style.boxShadow=''">${bidDisplay}${label}</span>`;
            }).join('');

            return `
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <span style="font-size: 16px;">🤝</span>
                        <span style="font-size: 13px; color: var(--text-muted);">Bedürfnis-Übereinstimmung:</span>
                        <span style="font-size: 18px; font-weight: 700; color: ${scoreColor};">${matching.score}%</span>
                    </div>
                    ${gemeinsamTags ? `
                        <div style="margin-bottom: 12px;">
                            <div style="font-size: 11px; color: var(--success); font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Gemeinsame Bedürfnisse</div>
                            <div>${gemeinsamTags}</div>
                        </div>
                    ` : ''}
                    ${unterschiedlichTags ? `
                        <div>
                            <div style="font-size: 11px; color: var(--danger); font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Herausfordernde Unterschiede</div>
                            <div>${unterschiedlichTags}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        /**
         * Generiert HTML für GFK-Bedürfnis-Tags im Pathos/Logos Modal
         * VEREINHEITLICHT: Nutzt berechneMatching (diff <= 15) statt analysiereWerBringtWasMit
         * @param {string} type - 'pathos' oder 'logos'
         * @returns {Object} HTML-Strings für gemeinsamSection, dynamikSection
         */
        function getGfkBeduerfnisAnalyse(type) {
            const result = {
                ichTags: '',
                partnerTags: '',
                gemeinsamSection: '',
                wachstumSection: '',
                dynamikSection: ''
            };

            // Prüfen ob GfkBeduerfnisse verfügbar ist
            if (typeof GfkBeduerfnisse === 'undefined') {
                return result;
            }

            // Archetyp-IDs normalisieren
            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');

            if (!ichArchetyp || !partnerArchetyp) return result;

            // VEREINHEITLICHT: berechneMatching verwenden (gleiche Logik wie GFK-Matching oben)
            const matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
            if (matching.fehler) return result;

            // Tag-Style
            const tagStyle = `display: inline-block; padding: 3px 8px; margin: 2px; border-radius: 10px; font-size: 11px; font-weight: 500;`;
            const tagStyleMatch = `${tagStyle} background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.5); color: #22c55e;`;

            // Gemeinsame Bedürfnisse Section - gefiltert nach pathos/logos
            const gemeinsam = (matching.topUebereinstimmungen || []).filter(b => {
                const pl = GfkBeduerfnisse.getPathosLogos ? GfkBeduerfnisse.getPathosLogos(b.id) : null;
                return !pl || pl === type; // Wenn keine Zuordnung, zeige in beiden
            });

            // HIDDEN: Direct needs comparison hidden per user request
            /*
            if (gemeinsam.length > 0) {
                const tags = gemeinsam.slice(0, 5).map(b => {
                    const translatedLabel = TiageI18n.t(`needs.items.${b.id}`, b.label);
                    return `<span style="${tagStyleMatch}">${translatedLabel}</span>`;
                }).join('');
                const sectionTitle = type === 'pathos'
                    ? TiageI18n.t('needs.sharedTitle', 'GEMEINSAME & KOMPATIBLE BEDÜRFNISSE')
                    : TiageI18n.t('needs.valuesTitle', 'GEMEINSAME & KOMPATIBLE WERTE');
                result.gemeinsamSection = `
                <div style="margin-bottom: 16px;">
                    <div style="padding: 12px; background: rgba(34,197,94,0.08); border-radius: 10px; border: 1px solid rgba(34,197,94,0.25);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="font-size: 14px;">🤝</span>
                            <span style="font-size: 11px; color: #22c55e; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${sectionTitle}</span>
                        </div>
                        <div>${tags}</div>
                    </div>
                </div>`;
            }
            */

            // Dynamik + Wachstum als kombinierter Fließtext
            // Dynamik: Aus gemeinsam mit Kategorie 'dynamik'
            const dynamikNeeds = (matching.details?.uebereinstimmend || []).filter(b => {
                const def = GfkBeduerfnisse.definitionen?.[b.id];
                return def?.kategorie === 'dynamik';
            });

            // Wachstum: Aus Konflikten (einer stark, anderer schwach)
            const wachstum = (matching.topKonflikte || []).slice(0, 3);

            if (dynamikNeeds.length > 0 || wachstum.length > 0) {
                const dynamikNames = dynamikNeeds.slice(0, 2).map(b => {
                    const label = TiageI18n.t(`needs.items.${b.id}`, b.label);
                    return `<span style="color: #8B5CF6; font-weight: 500;">${label}</span>`;
                });

                const wachstumNames = wachstum.slice(0, 2).map(b => {
                    const label = TiageI18n.t(`needs.items.${b.id}`, b.label);
                    return `<span style="color: #a855f7; font-weight: 500;">${label}</span>`;
                });

                let sentence = '';
                if (dynamikNames.length > 0 && wachstumNames.length > 0) {
                    const dynamikPart = dynamikNames.length > 1 ? `${dynamikNames[0]} und ${dynamikNames[1]}` : dynamikNames[0];
                    const wachstumPart = wachstumNames.length > 1 ? `${wachstumNames[0]} und ${wachstumNames[1]}` : wachstumNames[0];
                    sentence = `Eure Dynamik lebt von ${dynamikPart} – hier liegt Wachstumspotential in ${wachstumPart}.`;
                } else if (dynamikNames.length > 0) {
                    const dynamikPart = dynamikNames.length > 1 ? `${dynamikNames[0]} und ${dynamikNames[1]}` : dynamikNames[0];
                    sentence = `Eure Dynamik entfaltet sich durch ${dynamikPart}.`;
                } else if (wachstumNames.length > 0) {
                    const wachstumPart = wachstumNames.length > 1 ? `${wachstumNames[0]} und ${wachstumNames[1]}` : wachstumNames[0];
                    sentence = `Wachstumspotential zeigt sich in ${wachstumPart}.`;
                }

                if (sentence) {
                    result.dynamikSection = `<p style="margin-top: 12px; font-size: 13px; line-height: 1.6; color: var(--text-secondary);">${sentence}</p>`;
                }
            }

            return result;
        }

        /**
         * Generiert das Jung+GFK kombinierte Statement für die psychologische Einordnung
         * C.G. Jung: Logos → "Denken", Pathos → "Fühlen"
         * GFK (Rosenberg): Logos → Klarheit, Ordnung, Kompetenz; Pathos → Harmonie, Empathie, Verbundenheit
         */
        function generateJungGfkStatement() {
            // Prüfen ob GfkBeduerfnisse verfügbar ist
            if (typeof GfkBeduerfnisse === 'undefined') {
                return '';
            }

            // Archetyp-IDs und Namen holen
            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');
            const ichArch = archetypeDescriptions[currentArchetype];
            const partnerArch = archetypeDescriptions[selectedPartner];
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';

            if (!ichArchetyp || !partnerArchetyp) return '';

            // Pathos/Logos Scores berechnen
            const scores = GfkBeduerfnisse.berechnePathosLogosScores(ichArchetyp, partnerArchetyp);
            const pathosScore = scores.pathos || 50;
            const logosScore = scores.logos || 50;

            // Jung-Funktion ableiten (wer tendiert wohin?)
            // Person A: Vergleiche individuelle Stärken
            const analyseA = GfkBeduerfnisse.analysiereWerBringtWasMit(ichArchetyp, ichArchetyp);
            const analyseB = GfkBeduerfnisse.analysiereWerBringtWasMit(partnerArchetyp, partnerArchetyp);

            // Logos-Stärke = Anzahl starker Logos-Bedürfnisse
            const ichLogosStaerke = (analyseA.ich?.staerken?.logos?.length || 0);
            const ichPathosStaerke = (analyseA.ich?.staerken?.pathos?.length || 0);
            const partnerLogosStaerke = (analyseB.ich?.staerken?.logos?.length || 0);
            const partnerPathosStaerke = (analyseB.ich?.staerken?.pathos?.length || 0);

            // Jung-Funktion bestimmen
            const jungFunktionA = ichLogosStaerke >= ichPathosStaerke ? 'Denken' : 'Fühlen';
            const jungFunktionB = partnerLogosStaerke >= partnerPathosStaerke ? 'Denken' : 'Fühlen';

            // GFK-Bedürfnisse sammeln
            const gfkAnalyse = GfkBeduerfnisse.analysiereWerBringtWasMit(ichArchetyp, partnerArchetyp);
            if (gfkAnalyse.fehler) return '';

            // Top-Bedürfnisse für die Liste (kombiniert Pathos + Logos)
            const gemeinsamPathos = (gfkAnalyse.gemeinsam?.pathos || []).slice(0, 2);
            const gemeinsamLogos = (gfkAnalyse.gemeinsam?.logos || []).slice(0, 2);
            const allGemeinsam = [...gemeinsamPathos, ...gemeinsamLogos];
            const beduerfnisListe = allGemeinsam.map(b => b.label).join(', ') || 'Wertschätzung, Vertrauen';

            // Jung-Dynamik-Text generieren
            let jungDynamikText = '';
            if (jungFunktionA === jungFunktionB) {
                if (jungFunktionA === 'Denken') {
                    jungDynamikText = 'Beide operieren primär aus der rationalen Funktion – eine analytische Partnerschaft mit klarem Fokus auf Struktur und Werte.';
                } else {
                    jungDynamikText = 'Beide operieren primär aus der Gefühlsfunktion – eine empathische Verbindung mit starkem emotionalem Fundament.';
                }
            } else {
                jungDynamikText = 'Diese komplementäre Konstellation vereint Ratio und Emotion – eine fruchtbare Spannung, die beide Seiten bereichern kann.';
            }

            // HTML generieren
            return `
            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05)); border-radius: 12px; border: 1px solid rgba(139,92,246,0.25);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                    <span style="font-size: 16px;">🧬</span>
                    <span style="font-size: 12px; color: #8B5CF6; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">PSYCHOLOGISCHE EINORDNUNG</span>
                </div>
                <p style="font-size: 13px; line-height: 1.7; margin: 0; color: var(--text-secondary);">
                    Aus Sicht der Tiefenpsychologie (C.G. Jung): <strong style="color: var(--text-primary);">${ichName}</strong> tendiert zur <em style="color: #8B5CF6;">${jungFunktionA}</em>-Funktion, <strong style="color: var(--text-primary);">${partnerName}</strong> zur <em style="color: #8B5CF6;">${jungFunktionB}</em>-Funktion. ${jungDynamikText}
                </p>
                <p style="font-size: 13px; line-height: 1.7; margin: 12px 0 0 0; color: var(--text-secondary);">
                    Die damit verbundenen Grundbedürfnisse (nach Rosenberg) – <span style="color: #22c55e; font-weight: 500;">${beduerfnisListe}</span> – bilden das emotionale Fundament dieser Verbindung.
                </p>
            </div>`;
        }

        /**
         * Generiert den Synthese-Quote-Text basierend auf dem aktuellen Score
         * Wird im CREATIVITY-Abschnitt des Modals angezeigt
         * Verwendet die ResonanceQuotesTable für Pirsig/Osho/Sprichwörter-Zitate
         */
        function getSyntheseQuoteText() {
            // Hole den aktuellen Score aus dem Display
            const scoreEl = document.getElementById('mainScoreValue') || document.getElementById('mobileScoreCircle');
            const scoreText = scoreEl?.textContent || '0';
            const score = parseInt(scoreText, 10) || 0;

            let noteText = '';
            let quoteText = '';
            let quoteSource = '';

            // Bestimme Resonanzlevel basierend auf Score
            let resonanceLevel = 'niedrig';
            if (score >= 80) resonanceLevel = 'hoch';
            else if (score >= 50) resonanceLevel = 'mittel';

            // Versuche Zitat aus ResonanceQuotesTable zu holen
            if (typeof ResonanceQuotesTable !== 'undefined') {
                const category = score >= 65 ? 'RESONANCE' : score >= 50 ? 'GROWTH' : 'AWARENESS';
                const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

                if (result && result.quote) {
                    noteText = result.title;
                    quoteText = result.quote;
                    quoteSource = result.quoteSource;
                    return { noteText, quoteText, quoteSource };
                }
            }

            // Fallback zu hardcoded Texten
            if (score < 30) {
                noteText = 'Sehr niedrige Resonanz – große Unterschiede.';
                quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich deutlich unterscheiden. Diese Beziehung erfordert besondere Achtsamkeit und die Bereitschaft, die Andersartigkeit des anderen als Bereicherung zu sehen.';
            } else if (score >= 80) {
                noteText = 'Hohe Resonanz – Muster ergänzen sich.';
                quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich ergänzen. Diese Verbindung trägt die Qualität tiefer Resonanz – ein Zusammenspiel, das beide bereichert und wachsen lässt.';
            } else if (score >= 65) {
                noteText = 'Solide Balance mit Potenzial.';
                quoteText = 'Hier begegnen sich zwei Menschen mit guter Grundresonanz. Diese Verbindung bietet eine solide Balance und echtes Potenzial für gemeinsames Wachstum.';
            } else if (score >= 50) {
                noteText = 'Basis vorhanden, Arbeit erforderlich.';
                quoteText = 'Hier begegnen sich zwei Menschen mit einer tragfähigen Basis. Diese Verbindung hat Qualität, die durch bewusste Kommunikation und gegenseitiges Verständnis vertieft werden kann.';
            } else {
                noteText = 'Bewusste Reflexion erforderlich.';
                quoteText = 'Hier begegnen sich zwei Menschen mit unterschiedlichen Mustern. Diese Verbindung lädt zur bewussten Reflexion ein – ein Weg, der Offenheit und ehrliche Kommunikation erfordert.';
            }

            return { noteText, quoteText, quoteSource: '' };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // TEXT-TO-SPEECH (TTS) für CREATIVITY-Bereich
        // ═══════════════════════════════════════════════════════════════════════

        // Track which section is currently being read
        let currentTTSSection = null;

        /**
         * Toggle Text-to-Speech for the CREATIVITY section
         * @param {string} section - 'pathos' or 'logos'
         */
        function toggleCreativityTTS(section) {
            // Check if TTS is supported
            if (!TiageTTS || !TiageTTS.isSupported()) {
                const notSupportedMsg = TiageI18n.t('tts.notSupported', 'Vorlesen wird in diesem Browser nicht unterstützt');
                alert(notSupportedMsg);
                return;
            }

            const iconEl = document.getElementById(`ttsIcon${section.charAt(0).toUpperCase() + section.slice(1)}`);
            const buttonEl = document.getElementById(`ttsButton${section.charAt(0).toUpperCase() + section.slice(1)}`);
            const textEl = document.getElementById(`creativityText${section.charAt(0).toUpperCase() + section.slice(1)}`);

            if (!textEl || !iconEl) return;

            // If currently speaking the same section
            if (currentTTSSection === section && TiageTTS.isSpeaking()) {
                if (TiageTTS.isPaused()) {
                    // Resume
                    TiageTTS.resume();
                    iconEl.textContent = '⏸️';
                    buttonEl.title = TiageI18n.t('tts.pause', 'Pausieren');
                } else {
                    // Pause
                    TiageTTS.pause();
                    iconEl.textContent = '▶️';
                    buttonEl.title = TiageI18n.t('tts.resume', 'Fortsetzen');
                }
                return;
            }

            // If speaking a different section, stop first
            if (TiageTTS.isSpeaking()) {
                TiageTTS.stop();
                resetTTSButtons();
            }

            // Get text content and start speaking
            const text = textEl.textContent || textEl.innerText;
            if (!text.trim()) return;

            currentTTSSection = section;
            TiageTTS.speak(text);

            // Update button
            iconEl.textContent = '⏸️';
            buttonEl.title = TiageI18n.t('tts.pause', 'Pausieren');

            // Subscribe to TTS events for this speech
            const unsubscribe = TiageTTS.subscribe((event) => {
                if (event.type === 'end' || event.type === 'stop' || event.type === 'error') {
                    resetTTSButtons();
                    currentTTSSection = null;
                    unsubscribe();
                }
            });
        }

        /**
         * Reset all TTS buttons to their default state
         */
        function resetTTSButtons() {
            const playLabel = TiageI18n.t('tts.play', 'Vorlesen');

            ['Pathos', 'Logos'].forEach(section => {
                const iconEl = document.getElementById(`ttsIcon${section}`);
                const buttonEl = document.getElementById(`ttsButton${section}`);
                if (iconEl) iconEl.textContent = '🔊';
                if (buttonEl) buttonEl.title = playLabel;
            });
        }

        /**
         * Stop TTS when modal is closed
         */
        function stopTTSOnModalClose() {
            if (TiageTTS && TiageTTS.isSpeaking()) {
                TiageTTS.stop();
                resetTTSButtons();
                currentTTSSection = null;
            }
        }

        function getPathosContent() {
            const ichArch = archetypeDescriptions[currentArchetype];
            const partnerArch = archetypeDescriptions[selectedPartner];
            const detailed = generateDetailedPathos(ichArch, partnerArch);
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';

            // GFK-Bedürfnis-Analyse holen
            const gfkAnalyse = getGfkBeduerfnisAnalyse('pathos');

            const creativityLabel = TiageI18n.t('synthesisSection.creativity', 'CREATIVITY');

            // Dynamik+Wachstum kombiniert als Fließtext
            const dynamikWachstumText = gfkAnalyse.dynamikSection || '';

            // Synthese-Quote-Text für CREATIVITY-Abschnitt
            const syntheseQuote = getSyntheseQuoteText();

            // TTS Button Label
            const ttsPlayLabel = TiageI18n.t('tts.play', 'Vorlesen');

            let html = `
                <!-- GEMEINSAME BEDÜRFNISSE -->
                ${gfkAnalyse.gemeinsamSection}

                <!-- CREATIVITY -->
                <div style="margin-bottom: 16px;">
                    <div style="padding: 14px; background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(231,111,81,0.08)); border-radius: 10px; border: 1px solid rgba(231,111,81,0.3);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 14px;">🔥</span>
                                <span style="font-size: 11px; color: #FFD700; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${creativityLabel}</span>
                            </div>
                            <button id="ttsButtonPathos" onclick="toggleCreativityTTS('pathos')" title="${ttsPlayLabel}" style="background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.4); border-radius: 6px; padding: 4px 8px; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
                                <span id="ttsIconPathos" style="font-size: 14px;">🔊</span>
                            </button>
                        </div>
                        <div id="creativityTextPathos">
                            <p style="font-size: 13px; margin: 0 0 10px 0; line-height: 1.5;"><strong style="color: var(--text-primary);">${syntheseQuote.noteText}</strong></p>
                            <p style="font-size: 13px; margin: 0 0 12px 0; line-height: 1.5; font-style: italic; color: var(--text-secondary); opacity: 0.9;">"${syntheseQuote.quoteText}"</p>
                            <p style="font-size: 14px; margin: 0; line-height: 1.6; font-style: italic;">${detailed.synthese}</p>
                        </div>
                        ${dynamikWachstumText}
                    </div>
                </div>`;

            // PSYCHOLOGISCHE EINORDNUNG (Jung + GFK)
            html += generateJungGfkStatement();

            return html;
        }

        function getLogosContent() {
            const ichArch = archetypeDescriptions[currentArchetype];
            const partnerArch = archetypeDescriptions[selectedPartner];
            const detailed = generateDetailedLogos(ichArch, partnerArch);
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';

            // GFK-Bedürfnis-Analyse holen
            const gfkAnalyse = getGfkBeduerfnisAnalyse('logos');

            const creativityLabel = TiageI18n.t('synthesisSection.creativity', 'CREATIVITY');

            // Dynamik+Wachstum kombiniert als Fließtext
            const dynamikWachstumText = gfkAnalyse.dynamikSection || '';

            // Synthese-Quote-Text für CREATIVITY-Abschnitt
            const syntheseQuote = getSyntheseQuoteText();

            // TTS Button Label
            const ttsPlayLabel = TiageI18n.t('tts.play', 'Vorlesen');

            let html = `
                <!-- GEMEINSAME WERTE -->
                ${gfkAnalyse.gemeinsamSection}

                <!-- CREATIVITY -->
                <div style="margin-bottom: 16px;">
                    <div style="padding: 14px; background: linear-gradient(135deg, rgba(100,149,237,0.1), rgba(69,123,157,0.08)); border-radius: 10px; border: 1px solid rgba(69,123,157,0.3);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 14px;">🧠</span>
                                <span style="font-size: 11px; color: #6495ED; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${creativityLabel}</span>
                            </div>
                            <button id="ttsButtonLogos" onclick="toggleCreativityTTS('logos')" title="${ttsPlayLabel}" style="background: rgba(100,149,237,0.2); border: 1px solid rgba(100,149,237,0.4); border-radius: 6px; padding: 4px 8px; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
                                <span id="ttsIconLogos" style="font-size: 14px;">🔊</span>
                            </button>
                        </div>
                        <div id="creativityTextLogos">
                            <p style="font-size: 13px; margin: 0 0 10px 0; line-height: 1.5;"><strong style="color: var(--text-primary);">${syntheseQuote.noteText}</strong></p>
                            <p style="font-size: 13px; margin: 0 0 12px 0; line-height: 1.5; font-style: italic; color: var(--text-secondary); opacity: 0.9;">"${syntheseQuote.quoteText}"</p>
                            <p style="font-size: 14px; margin: 0; line-height: 1.6; font-style: italic;">${detailed.synthese}</p>
                        </div>
                        ${dynamikWachstumText}
                    </div>
                </div>`;

            // PSYCHOLOGISCHE EINORDNUNG (Jung + GFK)
            html += generateJungGfkStatement();

            return html;
        }

        /**
         * Generate Needs content (Bedürfnis-Match mit Differenz)
         * Shows the full needs comparison with difference values
         */
        // Sortierung State für Needs Synthese
        let needsSyntheseSortBy = null; // 'ich', 'diff', 'partner'
        let needsSyntheseSortDir = 'desc';

        function sortNeedsSyntheseContent(column) {
            if (needsSyntheseSortBy === column) {
                needsSyntheseSortDir = needsSyntheseSortDir === 'desc' ? 'asc' : 'desc';
            } else {
                needsSyntheseSortBy = column;
                needsSyntheseSortDir = 'desc';
            }
            // Re-render content
            const contentEl = document.getElementById('tiageSyntheseModalContent');
            if (contentEl) {
                contentEl.innerHTML = getNeedsContent();
            }
        }
        window.sortNeedsSyntheseContent = sortNeedsSyntheseContent;

        function getNeedsContent() {
            // Matching-Daten holen
            const ichArchetyp = (currentArchetype || '').replace('_', '-');
            const partnerArchetyp = (selectedPartner || '').replace('_', '-');

            if (!ichArchetyp || !partnerArchetyp || typeof GfkBeduerfnisse === 'undefined') {
                return '<p style="color: var(--text-muted);">Keine Daten verfügbar.</p>';
            }

            const matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
            const ichName = archetypeDescriptions[currentArchetype]?.name || 'ICH';
            const partnerName = archetypeDescriptions[selectedPartner]?.name || 'Partner';

            // Score-Anzeige
            const scoreValue = matching.score || 0;
            let scoreColor = '#ef4444';
            if (scoreValue >= 80) {
                scoreColor = '#22c55e';
            } else if (scoreValue >= 60) {
                scoreColor = '#eab308';
            }

            // Score Header
            let html = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">${scoreValue}%</div>
                    <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Bedürfnis-Übereinstimmung</div>
                </div>
            `;

            // Gemeinsame & Kompatible Bedürfnisse
            const uebereinstimmend = matching.details?.uebereinstimmend || [];
            const komplementaer = matching.details?.komplementaer || [];
            let gemeinsam = [...uebereinstimmend, ...komplementaer];

            // Unterschiedliche Prioritäten
            let konflikt = [...(matching.details?.konflikt || [])];

            // Sortierung anwenden
            const sortItems = (items) => {
                if (!needsSyntheseSortBy) {
                    // Default: nach Durchschnitt sortieren
                    return items.sort((a, b) => ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2));
                }
                return items.sort((a, b) => {
                    let valA, valB;
                    if (needsSyntheseSortBy === 'ich') {
                        valA = a.wert1 || 0;
                        valB = b.wert1 || 0;
                    } else if (needsSyntheseSortBy === 'diff') {
                        valA = Math.abs((a.wert1 || 0) - (a.wert2 || 0));
                        valB = Math.abs((b.wert1 || 0) - (b.wert2 || 0));
                    } else {
                        valA = a.wert2 || 0;
                        valB = b.wert2 || 0;
                    }
                    return needsSyntheseSortDir === 'desc' ? valB - valA : valA - valB;
                });
            };

            gemeinsam = sortItems(gemeinsam);
            konflikt = sortItems(konflikt);

            // Sort-Icons
            const ichSortIcon = needsSyntheseSortBy === 'ich'
                ? (needsSyntheseSortDir === 'desc' ? '▼' : '▲')
                : '⇅';
            const diffSortIcon = needsSyntheseSortBy === 'diff'
                ? (needsSyntheseSortDir === 'desc' ? '▼' : '▲')
                : '⇅';
            const partnerSortIcon = needsSyntheseSortBy === 'partner'
                ? (needsSyntheseSortDir === 'desc' ? '▼' : '▲')
                : '⇅';
            const ichActive = needsSyntheseSortBy === 'ich';
            const diffActive = needsSyntheseSortBy === 'diff';
            const partnerActive = needsSyntheseSortBy === 'partner';

            // Header mit Archetyp-Namen und Sortier-Buttons
            html += `
                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <button onclick="sortNeedsSyntheseContent('ich')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: ${ichActive ? 'rgba(34, 197, 94, 0.15)' : 'transparent'}; border: 1px solid ${ichActive ? 'rgba(34, 197, 94, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s;">
                        <span style="font-weight: 600; color: var(--success); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${ichName}</span>
                        <span style="color: ${ichActive ? 'var(--success)' : 'var(--text-muted)'}; font-size: 10px;">${ichSortIcon}</span>
                    </button>
                    <button onclick="sortNeedsSyntheseContent('diff')" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: ${diffActive ? 'rgba(234, 179, 8, 0.15)' : 'transparent'}; border: 1px solid ${diffActive ? 'rgba(234, 179, 8, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s; min-width: 60px;">
                        <span style="font-weight: 600; color: var(--warning, #eab308); font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Diff</span>
                        <span style="color: ${diffActive ? 'var(--warning, #eab308)' : 'var(--text-muted)'}; font-size: 10px;">${diffSortIcon}</span>
                    </button>
                    <button onclick="sortNeedsSyntheseContent('partner')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: ${partnerActive ? 'rgba(239, 68, 68, 0.15)' : 'transparent'}; border: 1px solid ${partnerActive ? 'rgba(239, 68, 68, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s;">
                        <span style="font-weight: 600; color: var(--danger); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${partnerName}</span>
                        <span style="color: ${partnerActive ? 'var(--danger)' : 'var(--text-muted)'}; font-size: 10px;">${partnerSortIcon}</span>
                    </button>
                </div>
            `;

            // Gemeinsame Bedürfnisse Section
            if (gemeinsam.length > 0) {
                html += `
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 11px; color: #22c55e; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 14px;">✓</span> Gemeinsame & Kompatible Bedürfnisse
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto;">
                `;

                gemeinsam.slice(0, 15).forEach(item => {
                    const label = TiageI18n.t(`needs.items.${item.id}`, item.label);
                    const wert1 = item.wert1 || 0;
                    const wert2 = item.wert2 || 0;
                    const diff = Math.abs(wert1 - wert2);

                    let statusColor = '#22c55e';
                    if (diff > 35) statusColor = '#ef4444';
                    else if (diff > 15) statusColor = '#eab308';

                    // Escape Namen für sichere JSON-Übergabe
                    const safeIchName = (ichName || 'Du').replace(/'/g, "\\'");
                    const safePartnerName = (partnerName || 'Partner').replace(/'/g, "\\'");

                    html += `
                        <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px 12px; border-left: 3px solid ${statusColor};">
                            <div onclick="openNeedDefinitionModal('${item.id}', 'resonance', {wert1: ${wert1}, wert2: ${wert2}, ichName: '${safeIchName}', partnerName: '${safePartnerName}'})" style="font-weight: 500; color: var(--text-primary); font-size: 13px; margin-bottom: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-primary)'">
                                ${label}
                                <span style="font-size: 10px; opacity: 0.5;">ⓘ</span>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert1}%; height: 100%; background: var(--success); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert1}</span>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; min-width: 50px;">
                                    <span style="font-size: 11px; font-weight: 600; color: ${statusColor}; background: ${statusColor}22; padding: 2px 6px; border-radius: 4px;">${diff}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert2}%; height: 100%; background: var(--danger); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert2}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += `
                        </div>
                        <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 8px;">
                            ${gemeinsam.length} gemeinsame & kompatible Bedürfnisse
                        </div>
                    </div>
                `;
            }

            // Unterschiedliche Prioritäten Section
            if (konflikt.length > 0) {
                html += `
                    <div style="margin-bottom: 10px;">
                        <div style="font-size: 11px; color: #ef4444; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 14px;">✗</span> Herausfordernde Unterschiede
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto;">
                `;

                konflikt.slice(0, 10).forEach(item => {
                    const label = TiageI18n.t(`needs.items.${item.id}`, item.label);
                    const wert1 = item.wert1 || 0;
                    const wert2 = item.wert2 || 0;
                    const diff = Math.abs(wert1 - wert2);

                    let statusColor = '#22c55e';
                    if (diff > 35) statusColor = '#ef4444';
                    else if (diff > 15) statusColor = '#eab308';

                    // Escape Namen für sichere JSON-Übergabe
                    const safeIchName = (ichName || 'Du').replace(/'/g, "\\'");
                    const safePartnerName = (partnerName || 'Partner').replace(/'/g, "\\'");

                    html += `
                        <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px 12px; border-left: 3px solid ${statusColor};">
                            <div onclick="openNeedDefinitionModal('${item.id}', 'resonance', {wert1: ${wert1}, wert2: ${wert2}, ichName: '${safeIchName}', partnerName: '${safePartnerName}'})" style="font-weight: 500; color: var(--text-primary); font-size: 13px; margin-bottom: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-primary)'">
                                ${label}
                                <span style="font-size: 10px; opacity: 0.5;">ⓘ</span>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert1}%; height: 100%; background: var(--success); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert1}</span>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; min-width: 50px;">
                                    <span style="font-size: 11px; font-weight: 600; color: ${statusColor}; background: ${statusColor}22; padding: 2px 6px; border-radius: 4px;">${diff}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                        <div style="width: ${wert2}%; height: 100%; background: var(--danger); border-radius: 3px;"></div>
                                    </div>
                                    <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert2}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += `
                        </div>
                        <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 8px;">
                            ${konflikt.length} unterschiedliche Prioritäten
                        </div>
                    </div>
                `;
            }

            return html;
        }

        // Navigate archetypes within Ti-Age Synthese Modal
        function navigateTiageSyntheseArchetype(person, direction) {
            const archetypes = archetypeOrder;
            let currentIndex;

            if (person === 'ich') {
                currentIndex = archetypes.indexOf(currentArchetype);
                currentIndex = (currentIndex + direction + archetypes.length) % archetypes.length;
                currentArchetype = archetypes[currentIndex];
                mobileIchArchetype = archetypes[currentIndex];

                // Sync dropdowns
                const ichSelect = document.getElementById('ichSelect');
                const mobileIchSelect = document.getElementById('mobileIchSelect');
                if (ichSelect) ichSelect.value = currentArchetype;
                if (mobileIchSelect) mobileIchSelect.value = currentArchetype;

                // Sync archetype grid highlighting
                updateArchetypeGrid('ich', currentArchetype);
            } else {
                currentIndex = archetypes.indexOf(selectedPartner);
                currentIndex = (currentIndex + direction + archetypes.length) % archetypes.length;
                selectedPartner = archetypes[currentIndex];
                mobilePartnerArchetype = archetypes[currentIndex];

                // Sync dropdowns
                const partnerSelect = document.getElementById('partnerSelect');
                const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
                if (partnerSelect) partnerSelect.value = selectedPartner;
                if (mobilePartnerSelect) mobilePartnerSelect.value = selectedPartner;

                // Sync archetype grid highlighting
                updateArchetypeGrid('partner', selectedPartner);
            }

            // Update the modal display
            const ichArch = archetypeDescriptions[currentArchetype];
            const partnerArch = archetypeDescriptions[selectedPartner];

            const ichDisplay = document.getElementById('tiageSyntheseModalIch');
            const partnerDisplay = document.getElementById('tiageSyntheseModalPartner');
            if (ichDisplay) ichDisplay.textContent = ichArch?.name || currentArchetype;
            if (partnerDisplay) partnerDisplay.textContent = partnerArch?.name || selectedPartner;

            // Regenerate content with new archetypes
            currentTiageSyntheseContent.pathos = generateCombinedPathos(ichArch, partnerArch);
            currentTiageSyntheseContent.logos = generateCombinedLogos(ichArch, partnerArch);

            // Refresh the displayed content
            showTiageSyntheseContent(currentTiageSyntheseType);

            // Save to localStorage and update main view
            saveSelectionToStorage();
            if (typeof updateComparisonView === 'function') updateComparisonView();
            if (typeof updateMobileCardsContent === 'function') updateMobileCardsContent();

            // Update Score Cycle with new score
            updateSyntheseScoreCycle();
        }

        // Legacy alias
        function navigatePathosLogosArchetype(person, direction) {
            navigateTiageSyntheseArchetype(person, direction);
        }

        function getTiageTheoryContent() {
            return `
                <div style="space-y: 20px;">
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: var(--primary); margin-bottom: 10px; font-size: 14px;">Die Synthese</h4>
                        <p style="margin-bottom: 10px;">Das Tiage-Beziehungsmodell verbindet zwei philosophische Traditionen zu einem praktischen Analyse-Tool:</p>
                        <ul style="padding-left: 20px; margin-bottom: 15px;">
                            <li style="margin-bottom: 6px;"><strong>Robert M. Pirsig (MOQ):</strong> Metaphysik der Qualität – statische vs. dynamische Qualität als Grundstruktur</li>
                            <li style="margin-bottom: 6px;"><strong>OSHO:</strong> Bewusstsein durch Meditation – Polarität, Balance, Schwingung</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 8px; border-left: 3px solid var(--primary);">
                        <h4 style="color: var(--text-primary); margin-bottom: 10px; font-size: 14px;">Logos vs. Pathos (25:75)</h4>
                        <p style="margin-bottom: 8px;"><strong style="color: var(--text-muted);">Logos (25%):</strong> Die rationale, strukturgebende Dimension. Pirsig nennt dies "statische Qualität" – bewährte Muster, die Stabilität schaffen.</p>
                        <p><strong style="color: var(--text-muted);">Pathos (75%):</strong> Die emotionale, anziehende Dimension. "Pathos vor Logos" – Das Leben/Erleben kommt vor der Interpretation.</p>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <h4 style="color: var(--primary); margin-bottom: 10px; font-size: 14px;">Tiage's Widerspruch zu Pirsig</h4>
                        <p style="margin-bottom: 10px;">Pirsig argumentierte, dass Definitionen die unmittelbare Qualität des Erlebens zerstören.</p>
                        <p style="margin-bottom: 10px;"><strong>Diese App basiert auf der gegenteiligen Erfahrung:</strong></p>
                        <p style="font-style: italic; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">"Definition und Erleben sind nicht getrennt. Sie entstehen gleichzeitig – im Dialog, in Resonanz, in extremer Kürze."</p>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <h4 style="color: var(--primary); margin-bottom: 10px; font-size: 14px;">OSHO & Dialog als Meditation</h4>
                        <p style="margin-bottom: 10px;">OSHOs Philosophie verbindet sich mit Tiages Widerspruch:</p>
                        <ul style="padding-left: 20px;">
                            <li style="margin-bottom: 6px;"><strong>OSHO:</strong> "Worte können lebendig sein, wenn Bewusstheit dahinter steht."</li>
                            <li style="margin-bottom: 6px;"><strong>Tiage:</strong> Im bewussten Dialog <em>ist</em> die Definition das Erleben.</li>
                        </ul>
                        <p style="margin-top: 10px; font-style: italic; color: var(--text-muted);">Die Qualität entsteht nicht trotz der Sprache, sondern durch sie – wenn zwei Menschen auf derselben Wellenlänge schwingen.</p>
                    </div>

                    <div style="text-align: center; padding-top: 10px; border-top: 1px solid var(--border);">
                        <p style="font-size: 12px; color: var(--text-muted);">Tiage's Beitrag: Die Verbindung beider Philosophien zu einem konkreten Beziehungs-Rechner mit eigener Gewichtung (40:60 Logos:Pathos) und 6 Archetypen.</p>
                    </div>
                </div>
            `;
        }

        // Factor Modal Archetype Navigation
        let currentFactorType = null;
        let currentFactorSource = 'mobile';

        function navigateFactorArchetype(person, direction) {
            // Get current archetype for the person
            let currentArch;
            if (person === 'ich') {
                currentArch = mobileIchArchetype;
            } else {
                currentArch = mobilePartnerArchetype;
            }

            // Find current index and calculate new index
            let currentIdx = archetypeOrder.indexOf(currentArch);
            if (currentIdx === -1) currentIdx = 0;

            let newIndex = currentIdx + direction;
            if (newIndex < 0) newIndex = archetypeOrder.length - 1;
            if (newIndex >= archetypeOrder.length) newIndex = 0;

            const newArchetype = archetypeOrder[newIndex];

            // Update the actual selections and sync both mobile and desktop
            if (person === 'ich') {
                mobileIchArchetype = newArchetype;
                currentArchetype = newArchetype; // Sync desktop variable
                // Update mobile and desktop select elements
                const mobileSelect = document.getElementById('mobileIchSelect');
                const desktopSelect = document.getElementById('ichSelect');
                if (mobileSelect) mobileSelect.value = newArchetype;
                if (desktopSelect) desktopSelect.value = newArchetype;
            } else {
                mobilePartnerArchetype = newArchetype;
                selectedPartner = newArchetype; // Sync desktop variable
                // Update mobile and desktop select elements
                const mobileSelect = document.getElementById('mobilePartnerSelect');
                const desktopSelect = document.getElementById('partnerSelect');
                if (mobileSelect) mobileSelect.value = newArchetype;
                if (desktopSelect) desktopSelect.value = newArchetype;
            }

            // Update the display in the modal
            updateFactorModalArchetypeDisplay();

            // Preserve selection state: sync Dominanz and Orientierung UI with stored state
            syncDominanzUI('ich');
            syncDominanzUI('partner');
            syncOrientierungUI('ich');
            syncOrientierungUI('partner');

            // Trigger full recalculation for both mobile and desktop views
            if (typeof updateComparisonView === 'function') {
                updateComparisonView();
            }
            if (typeof updateMobileResultPage === 'function') {
                updateMobileResultPage();
            }
            if (typeof updateMobileProContraPage === 'function') {
                updateMobileProContraPage();
            }

            // Recalculate and update the modal content after views are updated
            if (currentFactorType) {
                // Get updated score from display elements
                const prefix = currentFactorSource === 'desktop' ? 'desktopFactor' : 'mobileFactor';
                let score = 0;
                if (currentFactorType === 'archetyp') {
                    score = parseInt(document.getElementById(prefix + 'Archetyp')?.textContent) || 0;
                } else if (currentFactorType === 'dominanz') {
                    score = parseInt(document.getElementById(prefix + 'Dominanz')?.textContent) || 0;
                } else if (currentFactorType === 'orientierung') {
                    score = parseInt(document.getElementById(prefix + 'Orientierung')?.textContent) || 0;
                } else if (currentFactorType === 'geschlecht') {
                    score = parseInt(document.getElementById(prefix + 'Geschlecht')?.textContent) || 0;
                }

                const factor = factorExplanations[currentFactorType];
                if (factor) {
                    const ich = mobileIchArchetype;
                    const partner = mobilePartnerArchetype;
                    const dimensions = currentFactorSource === 'desktop' ? personDimensions : mobilePersonDimensions;

                    document.getElementById('factorModalScore').textContent = score;
                    document.getElementById('factorModalExplanation').textContent = factor.getExplanation(ich, partner, score, dimensions);

                    const meaningList = document.getElementById('factorModalMeaning');
                    meaningList.innerHTML = '';
                    factor.getMeaning(score, ich, partner).forEach(item => {
                        const li = document.createElement('li');
                        // Support both old (string) and new (object with title+desc) formats
                        if (typeof item === 'object' && item.title) {
                            li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                        } else {
                            li.textContent = item;
                        }
                        meaningList.appendChild(li);
                    });
                }
            }
        }

        function updateFactorModalArchetypeDisplay() {
            const ichCodeEl = document.getElementById('factorModalIchCode');
            const partnerCodeEl = document.getElementById('factorModalPartnerCode');

            if (ichCodeEl) {
                const ichDef = archetypeDescriptions[mobileIchArchetype];
                ichCodeEl.textContent = ichDef ? ichDef.name : mobileIchArchetype;
            }
            if (partnerCodeEl) {
                const partnerDef = archetypeDescriptions[mobilePartnerArchetype];
                partnerCodeEl.textContent = partnerDef ? partnerDef.name : mobilePartnerArchetype;
            }

            // Update combo code if visible
            const comboCodeEl = document.getElementById('factorModalComboCode');
            if (comboCodeEl && comboCodeEl.style.display !== 'none') {
                comboCodeEl.textContent = `Code: ${mobileIchArchetype}_${mobilePartnerArchetype}`;
            }
        }

        // Close modals with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const factorModal = document.getElementById('factorModal');
                if (factorModal && factorModal.classList.contains('active')) {
                    closeFactorModal();
                    return;
                }
                const helpModal = document.getElementById('helpModal');
                if (helpModal && helpModal.classList.contains('active')) {
                    closeHelpModal();
                    return;
                }
                const commentModal = document.getElementById('commentModal');
                if (commentModal && commentModal.classList.contains('active')) {
                    closeCommentModal();
                    return;
                }
            }
        });

        // ========================================
        // COMMENT MODAL FUNCTIONS
        // ========================================

        function openCommentModal() {
            document.getElementById('commentModal').classList.add('active');
            // Pre-fill name field with visitor number
            const visitorId = localStorage.getItem('tiage_visitor_id');
            if (visitorId) {
                document.getElementById('commentName').value = '#' + visitorId;
            }
            // Push state for back button to close modal
            history.pushState({ mobilePage: currentMobilePage, modal: 'comment' }, '', `#seite${currentMobilePage}-comment`);
        }

        function closeCommentModal(event, skipHistoryBack = false) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('commentModal').classList.remove('active');
            // Reset form
            document.getElementById('commentText').value = '';
            // Go back in history if not triggered by back button
            if (!skipHistoryBack && history.state && history.state.modal === 'comment') {
                history.back();
            }
        }

        async function submitComment() {
            const name = document.getElementById('commentName').value.trim();
            const typ = 'feedback'; // Default type since dropdown removed
            const text = document.getElementById('commentText').value.trim();

            // Rate limiting check
            const rateCheck = canSubmitComment();
            if (!rateCheck.allowed) {
                alert(`Bitte warte noch ${rateCheck.secondsRemaining} Sekunden bevor du einen weiteren Kommentar sendest.`);
                return;
            }

            // Validation
            if (!name) {
                alert('Bitte gib deinen Namen/Kürzel ein.');
                return;
            }
            if (name.length > 50) {
                alert('Name darf maximal 50 Zeichen haben.');
                return;
            }
            if (!text) {
                alert('Bitte schreibe einen Kommentar.');
                return;
            }
            if (text.length > 2000) {
                alert('Kommentar darf maximal 2000 Zeichen haben.');
                return;
            }

            // Get visitor ID
            const visitorId = getOrCreateVisitorId();

            const commentEntry = {
                type: 'comment',  // Wichtig für das Google Script
                id: 'com_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                visitorId: visitorId,
                name: name,
                kommentarTyp: typ,
                kommentar: text,
                timestamp: new Date().toISOString(),
                page: 'hilfe-modal'
            };

            const submitBtn = document.getElementById('commentSubmitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sende...';

            try {
                if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(commentEntry)
                    });
                }

                // Also save locally as backup
                const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
                stored.unshift(commentEntry);
                localStorage.setItem('tiage_comments', JSON.stringify(stored));

                // Record submission time for rate limiting
                recordCommentSubmission();

                alert('Danke für deinen Kommentar!');
                closeCommentModal();

            } catch (error) {
                console.error('Comment error:', error);
                // Save locally on error
                const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
                stored.unshift(commentEntry);
                localStorage.setItem('tiage_comments', JSON.stringify(stored));
                recordCommentSubmission();
                alert('Kommentar lokal gespeichert. (Server nicht erreichbar)');
                closeCommentModal();
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Absenden';
        }

        // ========================================
        // COMMENTS LIST MODAL FUNCTIONS
        // ========================================

        let allCommentsData = [];
        let currentSearchQuery = '';

        function openCommentsListModal() {
            console.log('openCommentsListModal called');
            document.getElementById('commentsListModal').classList.add('active');
            document.body.style.overflow = 'hidden';

            // Reset search field
            const searchInput = document.getElementById('commentsSearchInput');
            if (searchInput) searchInput.value = '';
            currentSearchQuery = '';
            const clearBtn = document.getElementById('commentsSearchClear');
            if (clearBtn) clearBtn.classList.remove('visible');
            const resultsDiv = document.getElementById('commentsSearchResults');
            if (resultsDiv) resultsDiv.style.display = 'none';

            loadAllComments();
        }

        function closeCommentsListModal(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('commentsListModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        async function loadAllComments() {
            const container = document.getElementById('commentsListBody');
            container.innerHTML = '<div class="no-comments"><div class="no-comments-icon">⏳</div><p>Lade Kommentare...</p></div>';

            try {
                // Load from localStorage - nur eine Quelle: tiage_comments
                const localComments = JSON.parse(localStorage.getItem('tiage_comments') || '[]');

                // Deduplizierung basierend auf Name + Titel + Text
                const seen = new Set();
                const getUniqueKey = (item) => {
                    const name = (item.Name || item.name || '').toLowerCase().trim();
                    const titel = (item.Titel || item.titel || '').toLowerCase().trim();
                    const text = (item.Kommentar || item.kommentar || item.text || item.comment || '').toLowerCase().trim();
                    return `${name}|${titel}|${text}`;
                };

                allCommentsData = [];

                // Add local comments
                localComments.forEach(item => {
                    const key = getUniqueKey(item);
                    if (!seen.has(key)) {
                        seen.add(key);
                        allCommentsData.push(item);
                    }
                });

                // Try to load from server if available
                if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                    try {
                        const response = await fetch(GOOGLE_SCRIPT_URL);
                        const serverData = await response.json();
                        // Merge server data (avoiding duplicates)
                        serverData.forEach(item => {
                            const key = getUniqueKey(item);
                            if (!seen.has(key)) {
                                seen.add(key);
                                allCommentsData.push(item);
                            }
                        });
                    } catch (e) {
                        console.log('Server not available, using local data only');
                    }
                }

                // Sort by date (newest first)
                allCommentsData.sort((a, b) => {
                    const dateA = new Date(a.timestamp || a.Timestamp || a.datum || 0);
                    const dateB = new Date(b.timestamp || b.Timestamp || b.datum || 0);
                    return dateB - dateA;
                });

                renderCommentsList();
            } catch (error) {
                console.error('Error loading comments:', error);
                container.innerHTML = '<div class="no-comments"><div class="no-comments-icon">❌</div><p>Fehler beim Laden der Kommentare</p></div>';
            }
        }

        function renderCommentsList() {
            const container = document.getElementById('commentsListBody');

            if (allCommentsData.length === 0) {
                container.innerHTML = `
                    <div class="no-comments">
                        <div class="no-comments-icon">💬</div>
                        <p>Noch keine Kommentare vorhanden.</p>
                        <p style="font-size: 12px; margin-top: 10px;">Sei der Erste, der einen Kommentar hinterlässt!</p>
                    </div>
                `;
                return;
            }

            // Separate main comments from replies
            const mainComments = allCommentsData.filter(c => !(c.AntwortAuf || c.antwortAuf || c.replyTo));
            const replies = allCommentsData.filter(c => (c.AntwortAuf || c.antwortAuf || c.replyTo));

            let html = '';

            mainComments.forEach((comment, index) => {
                const id = comment.id || comment.ID || `comment-${index}`;
                const name = comment.Name || comment.name || 'Anonym';
                const visitorId = comment.visitorId || comment.VisitorId || '';
                const titel = comment.Titel || comment.titel || comment.type || '';
                const text = comment.Kommentar || comment.kommentar || comment.text || comment.comment || '';
                const kontext = comment.KontextID || comment.kontextId || comment.context || '';
                const typ = comment.Typ || comment.typ || comment.kommentarTyp || comment.type || 'comment';
                const timestamp = comment.timestamp || comment.Timestamp || comment.datum;
                const date = timestamp ? formatCommentDate(timestamp) : '';

                // Find replies to this comment
                const commentReplies = replies.filter(r =>
                    (r.AntwortAuf || r.antwortAuf || r.replyTo) === id
                );

                html += `
                    <div class="comment-card" data-id="${id}">
                        <div class="comment-card-header">
                            <div>
                                <span class="comment-author">${escapeHtml(name)}</span>
                                ${visitorId ? `<span class="comment-visitor-id">#${escapeHtml(visitorId)}</span>` : ''}
                                <span class="comment-date">${date}</span>
                            </div>
                            <span class="comment-type-badge type-${typ || 'comment'}">${getTypeBadge(typ)}</span>
                        </div>
                        <div class="comment-card-body">
                            ${titel ? `<div class="comment-title">${escapeHtml(titel)}</div>` : ''}
                            <div class="comment-text">${escapeHtml(text)}</div>
                            ${kontext ? `<div class="comment-context">📍 Kontext: ${escapeHtml(kontext)}</div>` : ''}
                        </div>
                        ${commentReplies.length > 0 ? renderReplies(commentReplies) : ''}
                        <div class="comment-card-footer">
                            <span style="font-size: 11px; color: var(--text-muted);">${commentReplies.length} Antwort${commentReplies.length !== 1 ? 'en' : ''}</span>
                            <button class="reply-btn" onclick="toggleReplyForm('${id}')">↩ Antworten</button>
                        </div>
                        <div class="reply-form" id="reply-form-${id}">
                            <input type="text" id="reply-name-${id}" placeholder="Dein Name" style="width: 100%; padding: 8px; margin-bottom: 10px; background: var(--bg-dark); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                            <textarea id="reply-text-${id}" placeholder="Deine Antwort..."></textarea>
                            <div class="reply-form-buttons">
                                <button class="reply-cancel-btn" onclick="toggleReplyForm('${id}')">Abbrechen</button>
                                <button class="reply-submit-btn" onclick="submitReply('${id}')">Antworten</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        function renderReplies(replies) {
            let html = '<div class="replies-section">';
            replies.forEach(reply => {
                const name = reply.Name || reply.name || 'Anonym';
                const text = reply.Kommentar || reply.kommentar || reply.text || '';
                const timestamp = reply.timestamp || reply.Timestamp;
                const date = timestamp ? formatCommentDate(timestamp) : '';

                html += `
                    <div class="reply-card">
                        <div class="reply-header">
                            <span class="reply-author">${escapeHtml(name)}</span>
                            <span class="reply-date">${date}</span>
                        </div>
                        <div class="reply-text">${escapeHtml(text)}</div>
                    </div>
                `;
            });
            html += '</div>';
            return html;
        }

        // Convert wildcard pattern to regex
        function wildcardToRegex(pattern) {
            // Escape special regex characters except *
            const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
            // Convert * to .* for wildcard matching
            const regex = escaped.replace(/\*/g, '.*');
            return new RegExp(regex, 'i'); // Case insensitive
        }

        // Check if a comment matches the search query
        function commentMatchesSearch(comment, query) {
            if (!query || query.trim() === '') return true;

            const searchPattern = wildcardToRegex(query.trim());

            // Get all searchable fields
            const name = comment.Name || comment.name || '';
            const titel = comment.Titel || comment.titel || comment.type || '';
            const text = comment.Kommentar || comment.kommentar || comment.text || comment.comment || '';
            const kontext = comment.KontextID || comment.kontextId || comment.context || '';
            const typ = comment.Typ || comment.typ || comment.kommentarTyp || comment.type || 'comment';
            const typLabel = getTypeBadge(typ);

            // Check if any field matches
            return searchPattern.test(name) ||
                   searchPattern.test(titel) ||
                   searchPattern.test(text) ||
                   searchPattern.test(kontext) ||
                   searchPattern.test(typ) ||
                   searchPattern.test(typLabel);
        }

        // Filter and render comments based on search query
        function filterComments(query) {
            currentSearchQuery = query;

            // Update clear button visibility
            const clearBtn = document.getElementById('commentsSearchClear');
            if (clearBtn) {
                clearBtn.classList.toggle('visible', query.length > 0);
            }

            renderFilteredComments();
        }

        // Clear search and show all comments
        function clearCommentsSearch() {
            const input = document.getElementById('commentsSearchInput');
            if (input) {
                input.value = '';
            }
            currentSearchQuery = '';

            const clearBtn = document.getElementById('commentsSearchClear');
            if (clearBtn) {
                clearBtn.classList.remove('visible');
            }

            const resultsDiv = document.getElementById('commentsSearchResults');
            if (resultsDiv) {
                resultsDiv.style.display = 'none';
            }

            renderCommentsList();
        }

        // Render comments with current filter applied
        function renderFilteredComments() {
            const container = document.getElementById('commentsListBody');
            const resultsDiv = document.getElementById('commentsSearchResults');

            if (!currentSearchQuery || currentSearchQuery.trim() === '') {
                if (resultsDiv) resultsDiv.style.display = 'none';
                renderCommentsList();
                return;
            }

            // Filter comments
            const filteredComments = allCommentsData.filter(c => commentMatchesSearch(c, currentSearchQuery));

            // Show results count
            if (resultsDiv) {
                resultsDiv.style.display = 'block';
                resultsDiv.innerHTML = `${filteredComments.length} von ${allCommentsData.length} Kommentare${filteredComments.length !== 1 ? 'n' : ''} gefunden`;
            }

            if (filteredComments.length === 0) {
                container.innerHTML = `
                    <div class="no-comments">
                        <div class="no-comments-icon">🔍</div>
                        <p>Keine Kommentare gefunden.</p>
                        <p style="font-size: 12px; margin-top: 10px;">Versuche einen anderen Suchbegriff oder verwende * als Platzhalter.</p>
                    </div>
                `;
                return;
            }

            // Separate main comments from replies
            const mainComments = filteredComments.filter(c => !(c.AntwortAuf || c.antwortAuf || c.replyTo));
            const allReplies = allCommentsData.filter(c => (c.AntwortAuf || c.antwortAuf || c.replyTo));
            const filteredReplies = filteredComments.filter(c => (c.AntwortAuf || c.antwortAuf || c.replyTo));

            let html = '';

            // Render matching main comments
            mainComments.forEach((comment, index) => {
                const id = comment.id || comment.ID || `comment-${index}`;
                const name = comment.Name || comment.name || 'Anonym';
                const titel = comment.Titel || comment.titel || comment.type || '';
                const text = comment.Kommentar || comment.kommentar || comment.text || comment.comment || '';
                const kontext = comment.KontextID || comment.kontextId || comment.context || '';
                const typ = comment.Typ || comment.typ || comment.kommentarTyp || comment.type || 'comment';
                const timestamp = comment.timestamp || comment.Timestamp || comment.datum;
                const date = timestamp ? formatCommentDate(timestamp) : '';

                // Find all replies to this comment (not filtered)
                const commentReplies = allReplies.filter(r =>
                    (r.AntwortAuf || r.antwortAuf || r.replyTo) === id
                );

                html += `
                    <div class="comment-card" data-id="${id}">
                        <div class="comment-card-header">
                            <div>
                                <span class="comment-author">${highlightMatch(escapeHtml(name), currentSearchQuery)}</span>
                                <span class="comment-date">${date}</span>
                            </div>
                            <span class="comment-type-badge type-${typ || 'comment'}">${getTypeBadge(typ)}</span>
                        </div>
                        <div class="comment-card-body">
                            ${titel ? `<div class="comment-title">${highlightMatch(escapeHtml(titel), currentSearchQuery)}</div>` : ''}
                            <div class="comment-text">${highlightMatch(escapeHtml(text), currentSearchQuery)}</div>
                            ${kontext ? `<div class="comment-context">📍 Kontext: ${highlightMatch(escapeHtml(kontext), currentSearchQuery)}</div>` : ''}
                        </div>
                        ${commentReplies.length > 0 ? renderRepliesWithHighlight(commentReplies, currentSearchQuery) : ''}
                        <div class="comment-card-footer">
                            <span style="font-size: 11px; color: var(--text-muted);">${commentReplies.length} Antwort${commentReplies.length !== 1 ? 'en' : ''}</span>
                            <button class="reply-btn" onclick="toggleReplyForm('${id}')">↩ Antworten</button>
                        </div>
                        <div class="reply-form" id="reply-form-${id}">
                            <input type="text" id="reply-name-${id}" placeholder="Dein Name" style="width: 100%; padding: 8px; margin-bottom: 10px; background: var(--bg-dark); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                            <textarea id="reply-text-${id}" placeholder="Deine Antwort..."></textarea>
                            <div class="reply-form-buttons">
                                <button class="reply-cancel-btn" onclick="toggleReplyForm('${id}')">Abbrechen</button>
                                <button class="reply-submit-btn" onclick="submitReply('${id}')">Antworten</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Also show replies that match but their parent doesn't
            const orphanReplies = filteredReplies.filter(reply => {
                const parentId = reply.AntwortAuf || reply.antwortAuf || reply.replyTo;
                return !mainComments.some(c => (c.id || c.ID) === parentId);
            });

            if (orphanReplies.length > 0) {
                html += `<div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border);">
                    <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">Passende Antworten:</div>
                `;
                orphanReplies.forEach(reply => {
                    const name = reply.Name || reply.name || 'Anonym';
                    const text = reply.Kommentar || reply.kommentar || reply.text || '';
                    const timestamp = reply.timestamp || reply.Timestamp;
                    const date = timestamp ? formatCommentDate(timestamp) : '';

                    html += `
                        <div class="reply-card" style="margin-left: 0; background: var(--bg-secondary); padding: 12px; border-radius: 8px; margin-bottom: 10px;">
                            <div class="reply-header">
                                <span class="reply-author">${highlightMatch(escapeHtml(name), currentSearchQuery)}</span>
                                <span class="reply-date">${date}</span>
                            </div>
                            <div class="reply-text">${highlightMatch(escapeHtml(text), currentSearchQuery)}</div>
                        </div>
                    `;
                });
                html += '</div>';
            }

            container.innerHTML = html;
        }

        // Highlight matching text in search results
        function highlightMatch(text, query) {
            if (!query || query.trim() === '') return text;

            try {
                const pattern = wildcardToRegex(query.trim());
                return text.replace(pattern, match => `<span class="search-highlight">${match}</span>`);
            } catch (e) {
                return text;
            }
        }

        // Render replies with search highlighting
        function renderRepliesWithHighlight(replies, query) {
            let html = '<div class="replies-section">';
            replies.forEach(reply => {
                const name = reply.Name || reply.name || 'Anonym';
                const text = reply.Kommentar || reply.kommentar || reply.text || '';
                const timestamp = reply.timestamp || reply.Timestamp;
                const date = timestamp ? formatCommentDate(timestamp) : '';

                html += `
                    <div class="reply-card">
                        <div class="reply-header">
                            <span class="reply-author">${highlightMatch(escapeHtml(name), query)}</span>
                            <span class="reply-date">${date}</span>
                        </div>
                        <div class="reply-text">${highlightMatch(escapeHtml(text), query)}</div>
                    </div>
                `;
            });
            html += '</div>';
            return html;
        }

        function toggleReplyForm(commentId) {
            const form = document.getElementById(`reply-form-${commentId}`);
            if (form) {
                form.classList.toggle('active');
            }
        }

        async function submitReply(parentId) {
            const nameInput = document.getElementById(`reply-name-${parentId}`);
            const textInput = document.getElementById(`reply-text-${parentId}`);

            const name = nameInput?.value.trim() || 'Anonym';
            const text = textInput?.value.trim();

            if (!text) {
                alert('Bitte gib eine Antwort ein.');
                return;
            }

            const reply = {
                id: 'reply_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                Name: name,
                Kommentar: text,
                AntwortAuf: parentId,
                timestamp: new Date().toISOString(),
                Typ: 'antwort'
            };

            // Save locally
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            stored.push(reply);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));

            // Try to save to server
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                try {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(reply)
                    });
                } catch (e) {
                    console.log('Server save failed, reply saved locally');
                }
            }

            // Clear form and reload
            if (nameInput) nameInput.value = '';
            if (textInput) textInput.value = '';
            toggleReplyForm(parentId);

            // Reload comments
            loadAllComments();
        }

        function formatCommentDate(timestamp) {
            try {
                const date = new Date(timestamp);
                return date.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch (e) {
                return '';
            }
        }

        function getTypeBadge(typ) {
            const types = {
                'frage': 'Frage',
                'feedback': 'Comment',  // Feedback = Comment (vereinheitlicht)
                'fehler': 'Fehler',
                'verbesserung': 'Vorschlag',
                'doku': 'Doku',
                'antwort': 'Antwort',
                'comment': 'Comment'
            };
            return types[typ] || 'Comment';  // Default ist jetzt "Comment"
        }

        function escapeHtml(text) {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // ========================================
        // VISITOR ID & RATE LIMITING
        // ========================================

        // Get or create a unique visitor ID
        function getOrCreateVisitorId() {
            return localStorage.getItem('tiage_visitor_id') || null;
        }

        // Fetch total visitors count from server
        async function fetchTotalVisitors() {
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                try {
                    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getStats', {
                        method: 'GET'
                    });
                    const data = await response.json();
                    return data.totalVisitors || null;
                } catch (e) {
                    console.log('Could not fetch stats');
                }
            }
            return null;
        }

        // Fetch visitor ID from server or generate local fallback
        async function fetchOrCreateVisitorId() {
            let visitorId = localStorage.getItem('tiage_visitor_id');

            // Existing visitor - just fetch stats
            if (visitorId) {
                const total = await fetchTotalVisitors();
                return { visitorId, totalVisitors: total };
            }

            // Try to get new ID from server (using GET to avoid CORS preflight)
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                try {
                    const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getVisitorId', {
                        method: 'GET'
                    });
                    const data = await response.json();
                    if (data.visitorId) {
                        visitorId = data.visitorId;
                        localStorage.setItem('tiage_visitor_id', visitorId);
                        return { visitorId, totalVisitors: data.totalVisitors || null };
                    }
                } catch (e) {
                    console.log('Server not available, using local ID');
                }
            }

            // Fallback: local generation
            const timestamp = Date.now().toString().slice(-4);
            const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
            visitorId = 'L' + timestamp + random; // L prefix = local
            localStorage.setItem('tiage_visitor_id', visitorId);
            return { visitorId, totalVisitors: null };
        }

        // Format visitor display text
        function formatVisitorDisplay(visitorId, totalVisitors) {
            if (totalVisitors && !visitorId.startsWith('L')) {
                return '#' + visitorId + ' von ' + totalVisitors;
            }
            return '#' + visitorId;
        }

        // Initialize visitor ID display
        async function initVisitorId() {
            const { visitorId, totalVisitors } = await fetchOrCreateVisitorId();
            const displayText = formatVisitorDisplay(visitorId, totalVisitors);

            // Update comment form display
            const display = document.getElementById('visitorIdDisplay');
            if (display) {
                display.textContent = displayText;
            }
            // Update header display
            const headerDisplay = document.getElementById('headerVisitorId');
            if (headerDisplay) {
                headerDisplay.textContent = displayText;
            }
        }

        // Rate limiting for comments (1 per minute)
        const COMMENT_COOLDOWN_MS = 60000; // 60 seconds

        function canSubmitComment() {
            const lastSubmit = localStorage.getItem('tiage_last_comment_time');
            if (!lastSubmit) return { allowed: true };

            const elapsed = Date.now() - parseInt(lastSubmit);
            if (elapsed >= COMMENT_COOLDOWN_MS) {
                return { allowed: true };
            }

            const remaining = Math.ceil((COMMENT_COOLDOWN_MS - elapsed) / 1000);
            return { allowed: false, secondsRemaining: remaining };
        }

        function recordCommentSubmission() {
            localStorage.setItem('tiage_last_comment_time', Date.now().toString());
        }

        // ========================================
        // FEATURE 4: Archetype Info Modal (merged with definitionModal)
        // ========================================

        function openArchetypeInfo(archetypeId, person = null) {
            // Redirect to definitionModal (zusammengeführt)
            console.log('openArchetypeInfo called with:', archetypeId, 'person:', person);

            // Track which person this modal is for
            currentDefinitionPerson = person;

            // Update current index
            currentDefinitionIndex = archetypeOrder.indexOf(archetypeId);
            if (currentDefinitionIndex === -1) currentDefinitionIndex = 0;

            // Use the detailed definition modal
            showArchetypeInfoByType(archetypeId);

            document.getElementById('definitionModal').classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add touch swipe support
            const modal = document.querySelector('#definitionModal .modal');
            modal.ontouchstart = handleDefinitionTouchStart;
            modal.ontouchend = handleDefinitionTouchEnd;
        }

        // ========================================
        // FEATURE 5: LocalStorage Persistence
        // ========================================

        function saveSelectionToStorage() {
            const selection = {
                ich: {
                    archetyp: mobileIchArchetype,
                    geschlecht: personDimensions.ich.geschlecht,
                    dominanz: personDimensions.ich.dominanz, // Multi-select object
                    orientierung: personDimensions.ich.orientierung // Multi-select object
                },
                partner: {
                    archetyp: mobilePartnerArchetype,
                    geschlecht: personDimensions.partner.geschlecht,
                    dominanz: personDimensions.partner.dominanz, // Multi-select object
                    orientierung: personDimensions.partner.orientierung // Multi-select object
                }
            };

            try {
                localStorage.setItem('tiage-selection', JSON.stringify(selection));

                // Also sync to TiageState storage for consistency
                if (typeof TiageState !== 'undefined') {
                    TiageState.set('personDimensions.ich', personDimensions.ich);
                    TiageState.set('personDimensions.partner', personDimensions.partner);
                    TiageState.saveToStorage();
                }
            } catch (e) {
                console.warn('LocalStorage not available:', e);
            }
        }

        function loadSelectionFromStorage() {
            try {
                const saved = localStorage.getItem('tiage-selection');
                if (!saved) return false;

                const selection = JSON.parse(saved);

                // Restore ICH
                if (selection.ich) {
                    mobileIchArchetype = selection.ich.archetyp;
                    currentArchetype = selection.ich.archetyp;
                    document.getElementById('mobileIchSelect').value = selection.ich.archetyp;
                    const ichSelect = document.getElementById('ichSelect');
                    if (ichSelect) ichSelect.value = selection.ich.archetyp;

                    if (selection.ich.geschlecht) {
                        // Handle new primary/secondary format
                        if (typeof selection.ich.geschlecht === 'object' && 'primary' in selection.ich.geschlecht) {
                            // New format: { primary: 'cis-mann', secondary: null }
                            personDimensions.ich.geschlecht = selection.ich.geschlecht;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.geschlecht = selection.ich.geschlecht;
                            }
                        } else {
                            // Old format: string like "cis-mann" - convert to new format
                            personDimensions.ich.geschlecht = { primary: selection.ich.geschlecht, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.geschlecht = { primary: selection.ich.geschlecht, secondary: null };
                            }
                        }
                        // Sync UI
                        if (typeof syncGeschlechtUI === 'function') {
                            syncGeschlechtUI('ich');
                        }
                        if (personDimensions.ich.geschlecht.primary) {
                            const dimension = document.querySelector('[data-dimension="ich-geschlecht-new"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.ich.dominanz) {
                        // Handle new primary/secondary format
                        if (typeof selection.ich.dominanz === 'object' && 'primary' in selection.ich.dominanz) {
                            // New format: { primary: 'dominant', secondary: null }
                            personDimensions.ich.dominanz = selection.ich.dominanz;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.dominanz = selection.ich.dominanz;
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('ich');
                            }
                            if (selection.ich.dominanz.primary) {
                                const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.ich.dominanz === 'object') {
                            // Old format: { dominant: 'gelebt', submissiv: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.ich.dominanz)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.ich.dominanz = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.dominanz = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('ich');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.ich.dominanz = { primary: selection.ich.dominanz, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.dominanz = { primary: selection.ich.dominanz, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('ich');
                            }
                            const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.ich.orientierung) {
                        // Handle new primary/secondary format
                        if (typeof selection.ich.orientierung === 'object' && 'primary' in selection.ich.orientierung) {
                            // New format: { primary: 'heterosexuell', secondary: null }
                            personDimensions.ich.orientierung = selection.ich.orientierung;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.orientierung = selection.ich.orientierung;
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('ich');
                            }
                            if (selection.ich.orientierung.primary) {
                                const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.ich.orientierung === 'object') {
                            // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.ich.orientierung)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.ich.orientierung = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.orientierung = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('ich');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.ich.orientierung = { primary: selection.ich.orientierung, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.orientierung = { primary: selection.ich.orientierung, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('ich');
                            }
                            const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }
                }

                // Restore PARTNER
                if (selection.partner) {
                    mobilePartnerArchetype = selection.partner.archetyp;
                    selectedPartner = selection.partner.archetyp;
                    document.getElementById('mobilePartnerSelect').value = selection.partner.archetyp;
                    const partnerSelect = document.getElementById('partnerSelect');
                    if (partnerSelect) partnerSelect.value = selection.partner.archetyp;

                    if (selection.partner.geschlecht) {
                        // Handle new primary/secondary format
                        if (typeof selection.partner.geschlecht === 'object' && 'primary' in selection.partner.geschlecht) {
                            // New format: { primary: 'cis-mann', secondary: null }
                            personDimensions.partner.geschlecht = selection.partner.geschlecht;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.geschlecht = selection.partner.geschlecht;
                            }
                        } else {
                            // Old format: string like "cis-mann" - convert to new format
                            personDimensions.partner.geschlecht = { primary: selection.partner.geschlecht, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.geschlecht = { primary: selection.partner.geschlecht, secondary: null };
                            }
                        }
                        // Sync UI
                        if (typeof syncGeschlechtUI === 'function') {
                            syncGeschlechtUI('partner');
                        }
                        if (personDimensions.partner.geschlecht.primary) {
                            const dimension = document.querySelector('[data-dimension="partner-geschlecht-new"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.partner.dominanz) {
                        // Handle new primary/secondary format
                        if (typeof selection.partner.dominanz === 'object' && 'primary' in selection.partner.dominanz) {
                            // New format: { primary: 'dominant', secondary: null }
                            personDimensions.partner.dominanz = selection.partner.dominanz;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.dominanz = selection.partner.dominanz;
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('partner');
                            }
                            if (selection.partner.dominanz.primary) {
                                const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.partner.dominanz === 'object') {
                            // Old format: { dominant: 'gelebt', submissiv: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.partner.dominanz)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.partner.dominanz = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.dominanz = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('partner');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.partner.dominanz = { primary: selection.partner.dominanz, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.dominanz = { primary: selection.partner.dominanz, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('partner');
                            }
                            const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.partner.orientierung) {
                        // Handle new primary/secondary format
                        if (typeof selection.partner.orientierung === 'object' && 'primary' in selection.partner.orientierung) {
                            // New format: { primary: 'heterosexuell', secondary: null }
                            personDimensions.partner.orientierung = selection.partner.orientierung;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.orientierung = selection.partner.orientierung;
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('partner');
                            }
                            if (selection.partner.orientierung.primary) {
                                const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.partner.orientierung === 'object') {
                            // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.partner.orientierung)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.partner.orientierung = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.orientierung = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('partner');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.partner.orientierung = { primary: selection.partner.orientierung, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.orientierung = { primary: selection.partner.orientierung, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('partner');
                            }
                            const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }
                }

                // Sync mobilePersonDimensions to personDimensions for desktop view
                personDimensions.ich = { ...mobilePersonDimensions.ich };
                personDimensions.partner = { ...mobilePersonDimensions.partner };

                // Sync all UIs (Desktop, Mobile, Modal) for dominanz
                if (typeof syncDominanzUI === 'function') {
                    syncDominanzUI('ich');
                    syncDominanzUI('partner');
                }

                // Sync all UIs (Desktop, Mobile, Modal) for orientierung
                if (typeof syncOrientierungUI === 'function') {
                    syncOrientierungUI('ich');
                    syncOrientierungUI('partner');
                }

                // Update comparison view with loaded data
                if (typeof updateComparisonView === 'function') {
                    updateComparisonView();
                }

                // Sync archetype grid highlighting with loaded selections
                if (typeof updateArchetypeGrid === 'function') {
                    if (selection.ich && selection.ich.archetyp) {
                        updateArchetypeGrid('ich', selection.ich.archetyp);
                    }
                    if (selection.partner && selection.partner.archetyp) {
                        updateArchetypeGrid('partner', selection.partner.archetyp);
                    }
                }

                return true;
            } catch (e) {
                console.warn('Failed to load from LocalStorage:', e);
                return false;
            }
        }

        function resetAll() {
            if (!confirm('Möchtest du wirklich alle Eingaben zurücksetzen?')) {
                return;
            }

            // Clear LocalStorage
            try {
                localStorage.removeItem('tiage-selection');
            } catch (e) {
                console.warn('LocalStorage not available:', e);
            }

            // Reset mobile selections
            mobileIchArchetype = 'single';
            mobilePartnerArchetype = 'duo';
            const emptyDimension = { primary: null, secondary: null };
            mobilePersonDimensions = {
                ich: { geschlecht: { ...emptyDimension }, dominanz: { ...emptyDimension }, orientierung: { ...emptyDimension } },
                partner: { geschlecht: { ...emptyDimension }, dominanz: { ...emptyDimension }, orientierung: { ...emptyDimension } }
            };

            // Reset personDimensions for desktop
            personDimensions.ich = { geschlecht: { ...emptyDimension }, dominanz: { ...emptyDimension }, orientierung: { ...emptyDimension } };
            personDimensions.partner = { geschlecht: { ...emptyDimension }, dominanz: { ...emptyDimension }, orientierung: { ...emptyDimension } };

            // Reset dropdowns
            document.getElementById('mobileIchSelect').value = 'single';
            document.getElementById('mobilePartnerSelect').value = 'duo';

            // Reset all radio buttons
            document.querySelectorAll('.mobile-page input[type="radio"]').forEach(radio => {
                radio.checked = false;
                const dimension = radio.closest('.compact-dimension');
                if (dimension) {
                    dimension.classList.add('needs-selection');
                }
            });

            // Reset Desktop, Mobile and Modal multi-select checkboxes and status dropdowns
            const shortIds = ['dom', 'sub', 'sw', 'aus'];
            ['ich', 'partner'].forEach(person => {
                shortIds.forEach(shortId => {
                    // Desktop
                    const checkbox = document.getElementById(person + '-d-' + shortId);
                    if (checkbox) checkbox.checked = false;
                    const statusSelect = document.getElementById(person + '-d-' + shortId + '-status');
                    if (statusSelect) {
                        statusSelect.style.display = 'none';
                        statusSelect.value = 'gelebt';
                    }
                    // Mobile
                    const mobileCheckbox = document.getElementById('m-' + person + '-d-' + shortId);
                    if (mobileCheckbox) mobileCheckbox.checked = false;
                    const mobileStatusSelect = document.getElementById('m-' + person + '-d-' + shortId + '-status');
                    if (mobileStatusSelect) {
                        mobileStatusSelect.style.display = 'none';
                        mobileStatusSelect.value = 'gelebt';
                    }
                    // Modal
                    const modalCheckbox = document.getElementById('modal-' + person + '-d-' + shortId);
                    if (modalCheckbox) modalCheckbox.checked = false;
                    const modalStatusSelect = document.getElementById('modal-' + person + '-d-' + shortId + '-status');
                    if (modalStatusSelect) {
                        modalStatusSelect.style.display = 'none';
                        modalStatusSelect.value = 'gelebt';
                    }
                });
                // Mark dominanz as needing selection (Desktop, Mobile & Modal)
                const dimension = document.querySelector('[data-dimension="' + person + '-dominanz-multi"]');
                if (dimension) dimension.classList.add('needs-selection');
                const mobileDimension = document.querySelector('[data-dimension="mobile-' + person + '-dominanz-multi"]');
                if (mobileDimension) mobileDimension.classList.add('needs-selection');
                const modalDimension = document.querySelector('[data-dimension="modal-' + person + '-dominanz-multi"]');
                if (modalDimension) modalDimension.classList.add('needs-selection');

                // Mark orientierung as needing selection (Desktop, Mobile & Modal)
                const orientDimension = document.querySelector('[data-dimension="' + person + '-orientierung-multi"]');
                if (orientDimension) orientDimension.classList.add('needs-selection');
                const mobileOrientDimension = document.querySelector('[data-dimension="mobile-' + person + '-orientierung-multi"]');
                if (mobileOrientDimension) mobileOrientDimension.classList.add('needs-selection');
                const modalOrientDimension = document.querySelector('[data-dimension="modal-' + person + '-orientierung-multi"]');
                if (modalOrientDimension) modalOrientDimension.classList.add('needs-selection');
            });

            // Go to page 1
            mobileGoToPage(1);

            // Show confirmation
            const warning = document.createElement('div');
            warning.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(46, 204, 113, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            warning.textContent = '✓ Alle Eingaben wurden zurückgesetzt';
            document.body.appendChild(warning);

            setTimeout(() => warning.remove(), 3000);
        }

        // Auto-save on changes
        function initAutoSave() {
            // Save on archetype change
            document.getElementById('mobileIchSelect')?.addEventListener('change', saveSelectionToStorage);
            document.getElementById('mobilePartnerSelect')?.addEventListener('change', saveSelectionToStorage);

            // Save on dimension change
            document.querySelectorAll('.mobile-page input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', saveSelectionToStorage);
            });
        }

        // Load saved data on startup - fallback for legacy data
        // TiageState is now loaded in DOMContentLoaded, so we only need
        // to check for legacy 'tiage-selection' data if TiageState is empty
        setTimeout(() => {
            // Check if TiageState already has data (loaded in DOMContentLoaded)
            const hasStateData = typeof TiageState !== 'undefined' &&
                (TiageState.get('personDimensions.ich.geschlecht.primary') ||
                 TiageState.get('personDimensions.partner.geschlecht.primary'));

            // Only load from legacy storage if TiageState is empty
            if (!hasStateData) {
                loadSelectionFromStorage();
            }
            initAutoSave();
        }, 100); // Reduced timeout since DOMContentLoaded already loads TiageState

        // Update comparison view when data is loaded
        const originalLoadData = loadData;
        async function loadDataAndUpdateComparison() {
            await originalLoadData();
            setTimeout(() => {
                updateComparisonView();
                updateSyntheseScoreCycle();
            }, 100);
        }
        loadDataAndUpdateComparison();

        // Make key functions globally accessible for onclick handlers
        window.showArchetypeInfo = showArchetypeInfo;
        window.openArchetypeInfo = openArchetypeInfo;
        window.openFactorModal = openFactorModal;
        window.closeFactorModal = closeFactorModal;
        window.navigateFactorArchetype = navigateFactorArchetype;
        window.closeCategoryModal = closeCategoryModal;
        window.closeDefinitionModal = closeDefinitionModal;
        window.navigateDefinition = navigateDefinition;
        window.navigateDefinitionToIndex = navigateDefinitionToIndex;
        window.showArchetypeInfoByType = showArchetypeInfoByType;
        window.openCommentModal = openCommentModal;
        window.closeCommentModal = closeCommentModal;
        window.closeFeedbackModal = closeFeedbackModal;
        window.navigateArchetype = navigateArchetype;
        window.openCommentsListModal = openCommentsListModal;
        window.closeCommentsListModal = closeCommentsListModal;
        window.toggleReplyForm = toggleReplyForm;
        window.submitReply = submitReply;
        // Pro/Contra Modal functions
        window.openProContraModal = openProContraModal;
        window.closeProContraModal = closeProContraModal;
        window.navigateProContraArchetype = navigateProContraArchetype;

        // Archetype selection functions (critical for main page buttons)
        window.selectArchetypeFromGrid = selectArchetypeFromGrid;
        window.updateArchetypeGrid = updateArchetypeGrid;
        window.navigateArchetypeOnPage2 = navigateArchetypeOnPage2;
        window.navigateArchetypeOnPage3 = navigateArchetypeOnPage3;

        // Pathos/Logos Modal functions
        window.closePathosLogosModal = closePathosLogosModal;
        window.showPathosLogosContent = showPathosLogosContent;
        window.navigatePathosLogosArchetype = navigatePathosLogosArchetype;

        // Ti-Age Synthese Modal functions
        window.openTiageSyntheseModal = openTiageSyntheseModal;
        window.closeTiageSyntheseModal = closeTiageSyntheseModal;
        window.showTiageSyntheseContent = showTiageSyntheseContent;
        window.navigateTiageSyntheseArchetype = navigateTiageSyntheseArchetype;

        // Additional modal functions for needs
        window.closeNeedsCompareModal = closeNeedsCompareModal;
        window.openNeedDefinitionModal = openNeedDefinitionModal;
        window.openNeedWithResonance = openNeedWithResonance;
        window.getResonanceDataForNeed = getResonanceDataForNeed;
        window.closeNeedDefinitionModal = closeNeedDefinitionModal;
        window.openGfkExplanationModal = openGfkExplanationModal;
        window.openPaarungExplanationModal = openPaarungExplanationModal;
        window.closePaarungExplanationModal = closePaarungExplanationModal;
        console.log('[NEEDS] Modal functions exported to window:', typeof window.openNeedDefinitionModal);

        // Needs comparison modal functions
        window.openNeedsFullModal = openNeedsFullModal;
        window.openNeedDefinitionModal = openNeedDefinitionModal;
        window.switchNeedsFullModalTab = switchNeedsFullModalTab;
        window.sortNeedsFullModal = sortNeedsFullModal;
        window.openGfkExplanationModal = openGfkExplanationModal;
        window.openPaarungExplanationModal = openPaarungExplanationModal;

        // Dimension toggle and collapse functions
        window.toggleAllDimensionsCollapse = toggleAllDimensionsCollapse;
        window.toggleDimensionCollapse = toggleDimensionCollapse;
        window.showDimensionTooltip = showDimensionTooltip;
        window.closeDimensionTooltip = closeDimensionTooltip;
        window.showGeschlechtInfoModal = showGeschlechtInfoModal;
        window.closeGeschlechtInfoModal = closeGeschlechtInfoModal;
        window.showDominanzInfoModal = showDominanzInfoModal;
        window.closeDominanzInfoModal = closeDominanzInfoModal;
        window.showOrientierungInfoModal = showOrientierungInfoModal;
        window.closeOrientierungInfoModal = closeOrientierungInfoModal;
        window.showBodySoulModal = showBodySoulModal;
        window.closeBodySoulModal = closeBodySoulModal;
        window.closeGfkExplanationModal = closeGfkExplanationModal;

        // Dimension click handlers
        window.handleGeschlechtClick = handleGeschlechtClick;
        window.handleGeschlechtPClick = handleGeschlechtPClick;
        window.handleGeschlechtSClick = handleGeschlechtSClick;
        window.handleDominanzClick = handleDominanzClick;
        window.handleOrientierungClick = handleOrientierungClick;
        window.handleGfkClick = handleGfkClick;

        // Mobile status toggle handlers (Gelebt/Interessiert buttons)
        window.handleDominanzStatusToggle = handleDominanzStatusToggle;
        window.handleOrientierungStatusToggle = handleOrientierungStatusToggle;
        window.syncMobileDominanzStatusButtons = syncMobileDominanzStatusButtons;
        window.syncMobileOrientierungStatusButtons = syncMobileOrientierungStatusButtons;

        // UI Sync functions (for MemoryManager)
        window.syncGeschlechtUI = syncGeschlechtUI;
        window.syncDominanzUI = syncDominanzUI;
        window.syncOrientierungUI = syncOrientierungUI;
        window.updateAll = updateAll;
        window.saveSelectionToStorage = saveSelectionToStorage;

        // Pathos/Logos Modal open function
        window.openPathosLogosModal = openPathosLogosModal;

        // Comment and feedback functions
        window.submitComment = submitComment;
        window.clearCommentsSearch = clearCommentsSearch;

        // Partner selection
        window.selectPartner = selectPartner;

        // Navigation functions (for nav dots and carousel)
        window.navigatePrev = navigatePrev;
        window.navigateNext = navigateNext;
        window.scrollToCard = scrollToCard;

        // i18n translation update function (for language toggle button)
        window.updateAllTranslations = updateAllTranslations;

        // Additional modal functions
        window.openCategoryModal = openCategoryModal;
        window.openDefinitionModal = openDefinitionModal;
        window.openMatchModal = openMatchModal;

        // Category and tag related functions
        window.openSingleCategoryModal = openSingleCategoryModal;
        window.navigateCategoryPrev = navigateCategoryPrev;
        window.navigateCategoryNext = navigateCategoryNext;
        window.navigateCategoryArchetype = navigateCategoryArchetype;
        window.showCategoryDetails = showCategoryDetails;
        window.openTagTooltip = openTagTooltip;
        window.closeTagTooltip = closeTagTooltip;

        // Definition modal functions
        window.navigateDefinitionModal = navigateDefinitionModal;
        window.confirmDefinitionSelection = confirmDefinitionSelection;

        // Match modal functions
        window.toggleMatchModalView = toggleMatchModalView;

        // Feedback and reply functions
        window.openFeedbackModalWithContext = openFeedbackModalWithContext;
        window.openReplyModal = openReplyModal;

        // Pathos/Logos info functions
        window.toggleLogosWarning = toggleLogosWarning;
        window.showPathosLogosInfo = showPathosLogosInfo;
        window.showSubDimensionInfo = showSubDimensionInfo;

        // Mobile navigation functions
        window.mobileGoToPage = mobileGoToPage;
        window.toggleMobileCategory = toggleMobileCategory;

        // Utility functions
        window.toggleCollapsible = toggleCollapsible;
        window.resetAll = resetAll;

        // Wrapper functions for secondary interessiert buttons (used in modal)
        // These call the status toggle with 'interessiert' as the status
        window.handleSecondaryInteressiert = function(person, dominanzType, btn) {
            handleDominanzStatusToggle(person, dominanzType, 'interessiert', btn);
        };
        window.handleOrientierungSecondaryInteressiert = function(person, orientierungType, btn) {
            handleOrientierungStatusToggle(person, orientierungType, 'interessiert', btn);
        };

        // ═══════════════════════════════════════════════════════════════════════════
        // PROFILE REVIEW MODAL - Funktionen
        // ═══════════════════════════════════════════════════════════════════════════

        var profileReviewChangesCount = 0;
        var profileReviewInitialState = {};

        // Info-Daten für Attribute (Keys = attrIds aus profile-config.js)
        var profileReviewInfoData = {
            // GESCHLECHTSIDENTITÄT
            'pr-geschlecht-sekundaer': {
                title: "Geschlechtsidentität",
                stats: "Ca. 1-2% der Bevölkerung identifizieren sich als trans oder nonbinär",
                research: '"Gender identity is a deeply personal sense of one\'s own gender, which may or may not align with sex assigned at birth." <i>(American Psychological Association, 2023)</i>',
                pirsig: "Identität als dynamische Qualität - das Selbst jenseits biologischer Muster entdecken.",
                osho: "Du bist nicht dein Körper, du bist nicht dein Geist. Du bist das Bewusstsein, das beides beobachtet."
            },
            // LEBENSPLANUNG
            'pr-kinder': {
                title: "Kinder erwünscht",
                stats: "75% der Duo-Menschen wollen Kinder",
                research: '"Monogamous couples show significantly higher desire for offspring due to stable pair-bonding patterns." <i>(Journal of Family Psychology, 2022)</i>',
                pirsig: "Static Pattern sucht Fortsetzung durch Nachkommen - die biologische Form der Qualitätserhaltung.",
                osho: "Kinder sind die Brücke zwischen Liebe und Ewigkeit. Aber wahre Liebe braucht keine Brücke."
            },
            'pr-ehe': {
                title: "Ehe erwünscht",
                stats: "80% der Duo-Menschen wollen heiraten",
                research: '"Legal commitment correlates with relationship stability and long-term satisfaction in monogamous pairs." <i>(Marriage & Family Review, 2021)</i>',
                pirsig: "Die Ehe als statisches Muster institutionalisiert dynamische Qualität - formalisiert die Liebe.",
                osho: "Ehe ist die Gesellschaft, die in dein Schlafzimmer eindringt. Aber manche brauchen die Form für den Inhalt."
            },
            'pr-zusammen': {
                title: "Zusammenleben",
                stats: "90% der Duo-Menschen leben zusammen",
                research: '"Co-habitation strengthens emotional bonds and daily intimacy in committed relationships." <i>(Journal of Social Psychology, 2020)</i>',
                pirsig: "Gemeinsamer physischer Raum verstärkt das statische Muster - Nähe durch Präsenz.",
                osho: "Zusammen schlafen ist leicht. Zusammen aufwachen ist die Kunst."
            },
            'pr-haustiere': {
                title: "Haustiere wichtig",
                stats: "50% der Paare haben Haustiere, 35% planen welche",
                research: '"Pet ownership increases relationship satisfaction and provides shared caregiving experience." <i>(Anthrozoös Journal, 2021)</i>',
                pirsig: "Haustiere als Erweiterung des statischen Musters - gemeinsame Verantwortung.",
                osho: "Ein Hund lehrt bedingungslose Liebe. Menschen könnten davon lernen."
            },
            'pr-umzug': {
                title: "Umzugsbereitschaft",
                stats: "Duo-Menschen sind moderat flexibel (mittlere Umzugsbereitschaft)",
                research: '"Committed couples balance stability needs with career/life opportunities." <i>(Journal of Vocational Behavior, 2020)</i>',
                pirsig: "Balance zwischen statischem Muster (Verwurzelung) und dynamischer Anpassung.",
                osho: "Heimat ist nicht ein Ort - Heimat ist ein Gefühl."
            },
            'pr-familie': {
                title: "Familie-Wichtigkeit",
                stats: "Duo bewerten Familie als überdurchschnittlich wichtig (70%)",
                research: '"Monogamous couples prioritize family connections and intergenerational bonds." <i>(Family Relations, 2020)</i>',
                pirsig: "Familie als erweitertes statisches Muster - Zugehörigkeit über die Dyade hinaus.",
                osho: "Familie kann Gefängnis oder Flügel sein. Es kommt auf die Bewusstheit an."
            },
            // FINANZEN & KARRIERE
            'pr-finanzen': {
                title: "Finanzen",
                stats: "65% der Duo-Paare führen gemeinsame Konten",
                research: '"Financial merging correlates with relationship commitment and long-term stability." <i>(Journal of Consumer Finance, 2021)</i>',
                pirsig: "Gemeinsame Finanzen als Symbol für statisches Muster - materielle Verschmelzung.",
                osho: "Geld ist Energie. Wer teilt, vervielfacht."
            },
            'pr-karriere': {
                title: "Karriere vs. Familie",
                stats: "Duo suchen Balance zwischen Karriere und Familie (55% 'ausgeglichen')",
                research: '"Dual-career couples increasingly value work-life balance over pure career focus." <i>(Work & Occupations, 2021)</i>',
                pirsig: "Balance zwischen zwei statischen Mustern - Integration statt Polarisierung.",
                osho: "Arbeit und Liebe sind nicht Gegensätze. Beide sind Wege zu dir selbst."
            }
        };

        // Get selected archetype for a person (ich/partner)
        function getSelectedArchetype(person) {
            var selectId = person === 'ich' ? 'ichSelect' : 'partnerSelect';
            var select = document.getElementById(selectId);
            return select ? select.value : 'duo';
        }
        window.getSelectedArchetype = getSelectedArchetype;

        // ═══════════════════════════════════════════════════════════════════════
        // GEWICHTUNGS-EINSTELLUNGEN MIT LOCK-FUNKTION (Text-Inputs)
        // ═══════════════════════════════════════════════════════════════════════
        // Hinweis: GEWICHTUNG_DEFAULTS, GEWICHTUNG_STORAGE_KEY, GEWICHTUNG_LOCK_KEY,
        // FAKTOR_MAP und gewichtungLocks sind am Anfang der Datei definiert.

        // Lädt Lock-Status aus localStorage
        function getGewichtungLocks() {
            try {
                const stored = localStorage.getItem(GEWICHTUNG_LOCK_KEY);
                if (stored) return JSON.parse(stored);
            } catch (e) { console.warn('Fehler beim Laden der Lock-Status:', e); }
            return { orientierung: false, archetyp: false, dominanz: false, geschlecht: false };
        }

        // Speichert Lock-Status
        function saveGewichtungLocks() {
            try {
                localStorage.setItem(GEWICHTUNG_LOCK_KEY, JSON.stringify(gewichtungLocks));
            } catch (e) { console.warn('Fehler beim Speichern der Lock-Status:', e); }
        }

        // Lädt Gewichtungen aus localStorage
        function getGewichtungen() {
            try {
                const stored = localStorage.getItem(GEWICHTUNG_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return {
                        O: parsed.O ?? GEWICHTUNG_DEFAULTS.O,
                        A: parsed.A ?? GEWICHTUNG_DEFAULTS.A,
                        D: parsed.D ?? GEWICHTUNG_DEFAULTS.D,
                        G: parsed.G ?? GEWICHTUNG_DEFAULTS.G
                    };
                }
            } catch (e) { console.warn('Fehler beim Laden der Gewichtungen:', e); }
            return { ...GEWICHTUNG_DEFAULTS };
        }

        // Speichert Gewichtungen
        function saveGewichtungen() {
            const gewichtungen = {
                O: parseInt(document.getElementById('gewicht-orientierung')?.value) || 0,
                A: parseInt(document.getElementById('gewicht-archetyp')?.value) || 0,
                D: parseInt(document.getElementById('gewicht-dominanz')?.value) || 0,
                G: parseInt(document.getElementById('gewicht-geschlecht')?.value) || 0
            };
            try {
                localStorage.setItem(GEWICHTUNG_STORAGE_KEY, JSON.stringify(gewichtungen));
            } catch (e) { console.warn('Fehler beim Speichern der Gewichtungen:', e); }
            updateGewichtungSumme();
            if (typeof updateDisplay === 'function') updateDisplay();
        }
        window.saveGewichtungen = saveGewichtungen;

        // Aktualisiert Summen-Anzeige
        function updateGewichtungSumme() {
            const gew = getGewichtungen();
            const summe = gew.O + gew.A + gew.D + gew.G;
            const summeEl = document.getElementById('gewicht-summe');
            if (summeEl) {
                summeEl.textContent = summe + '%';
                summeEl.classList.toggle('error', summe !== 100);
                summeEl.style.color = summe === 100 ? '#10B981' : '#EF4444';
            }
        }

        // Normalisiert Gewichtungen auf 100%
        function normalizeGewichtungen(changedFactor, newValue) {
            // Wenn Summen-Lock deaktiviert ist, nur den geänderten Wert setzen
            if (!summeLocked) {
                const changedInput = document.getElementById(FAKTOR_MAP[changedFactor].inputId);
                const changedSlider = document.getElementById(`gewicht-slider-${changedFactor}`);
                const clampedValue = Math.min(Math.max(newValue, 0), 100);
                if (changedInput) changedInput.value = clampedValue;
                if (changedSlider) changedSlider.value = clampedValue;
                saveGewichtungen();
                updateGewichtungSumme();
                return;
            }

            const factors = Object.keys(FAKTOR_MAP);

            // Sammle aktuelle Werte und Lock-Status
            let lockedSum = 0;
            const unlockedFactors = [];

            factors.forEach(factor => {
                if (factor === changedFactor) return;

                const info = FAKTOR_MAP[factor];
                const input = document.getElementById(info.inputId);
                const currentValue = parseInt(input?.value) || 0;

                if (gewichtungLocks[factor]) {
                    lockedSum += currentValue;
                } else {
                    unlockedFactors.push({ factor, value: currentValue, input });
                }
            });

            // Berechne max. erlaubten Wert für geänderten Faktor
            const maxForChanged = 100 - lockedSum;
            const clampedValue = Math.min(Math.max(newValue, 0), maxForChanged);

            // Setze geänderten Wert (Input und Slider)
            const changedInput = document.getElementById(FAKTOR_MAP[changedFactor].inputId);
            const changedSlider = document.getElementById(`gewicht-slider-${changedFactor}`);
            if (changedInput) changedInput.value = clampedValue;
            if (changedSlider) changedSlider.value = clampedValue;

            // Verteile Rest auf nicht-gelockte Faktoren
            const availableForOthers = 100 - lockedSum - clampedValue;

            if (unlockedFactors.length > 0) {
                const currentSum = unlockedFactors.reduce((sum, f) => sum + f.value, 0);
                let distributed = 0;

                unlockedFactors.forEach((f, idx) => {
                    let newVal;
                    if (idx === unlockedFactors.length - 1) {
                        // Letzter bekommt den Rest (Rundungsfehler vermeiden)
                        newVal = availableForOthers - distributed;
                    } else if (currentSum > 0) {
                        const proportion = f.value / currentSum;
                        newVal = Math.round(availableForOthers * proportion);
                        distributed += newVal;
                    } else {
                        newVal = Math.round(availableForOthers / unlockedFactors.length);
                        distributed += newVal;
                    }
                    const finalValue = Math.max(0, newVal);
                    f.input.value = finalValue;
                    // Synchronisiere auch den Slider
                    const slider = document.getElementById(`gewicht-slider-${f.factor}`);
                    if (slider) slider.value = finalValue;
                });
            }

            saveGewichtungen();
            updateRowStates();
            updateGewichtungSumme();
        }

        // Klick-Handler für Lock/Unlock
        function handleLockToggle(factor) {
            const lockedCount = Object.values(gewichtungLocks).filter(v => v).length;

            // Max 3 Locks erlaubt
            if (!gewichtungLocks[factor] && lockedCount >= 3) {
                const row = document.querySelector(`.gewichtung-card[data-factor="${factor}"]`);
                if (row) {
                    row.style.animation = 'shake 0.3s ease';
                    setTimeout(() => { row.style.animation = ''; }, 300);
                }
                return;
            }

            gewichtungLocks[factor] = !gewichtungLocks[factor];
            saveGewichtungLocks();
            updateRowStates();
        }
        window.handleLockToggle = handleLockToggle;

        // Aktualisiert visuelle Zustände
        function updateRowStates() {
            const factors = Object.keys(FAKTOR_MAP);
            const unlockedCount = factors.filter(f => !gewichtungLocks[f]).length;

            factors.forEach(factor => {
                const row = document.querySelector(`.gewichtung-card[data-factor="${factor}"]`);
                const input = document.getElementById(FAKTOR_MAP[factor].inputId);
                if (!row || !input) return;

                row.classList.remove('locked', 'readonly');

                if (gewichtungLocks[factor]) {
                    row.classList.add('locked');
                } else if (unlockedCount === 1) {
                    row.classList.add('readonly');
                }
            });

            // Aktualisiere Summen-Lock-Anzeige
            updateSummeLockDisplay();
        }

        // Lädt Summen-Lock-Status aus localStorage
        function getSummeLock() {
            try {
                const stored = localStorage.getItem(GEWICHTUNG_SUMME_LOCK_KEY);
                return stored !== null ? JSON.parse(stored) : true; // Standard: aktiviert
            } catch (e) { return true; }
        }

        // Speichert Summen-Lock-Status
        function saveSummeLock() {
            try {
                localStorage.setItem(GEWICHTUNG_SUMME_LOCK_KEY, JSON.stringify(summeLocked));
            } catch (e) { console.warn('Fehler beim Speichern des Summen-Lock-Status:', e); }
        }

        // Toggle Summen-Lock
        function toggleSummeLock() {
            summeLocked = !summeLocked;
            saveSummeLock();
            updateSummeLockDisplay();

            // Wenn aktiviert, normalisiere sofort auf 100%
            if (summeLocked) {
                const factors = Object.keys(FAKTOR_MAP);
                const unlockedFactors = factors.filter(f => !gewichtungLocks[f]);
                if (unlockedFactors.length > 0) {
                    // Normalisiere auf 100%
                    const firstUnlocked = unlockedFactors[0];
                    const input = document.getElementById(FAKTOR_MAP[firstUnlocked].inputId);
                    if (input) {
                        normalizeGewichtungen(firstUnlocked, parseInt(input.value) || 0);
                    }
                }
            }
        }
        window.toggleSummeLock = toggleSummeLock;

        // Aktualisiert Summen-Lock-Anzeige
        function updateSummeLockDisplay() {
            const lockElement = document.getElementById('gewicht-summe-lock');
            if (lockElement) {
                lockElement.textContent = summeLocked ? '🔒' : '🔓';
                lockElement.classList.toggle('locked', summeLocked);
                lockElement.title = summeLocked ? 'Summe ist auf 100% fixiert (klicken zum Entsperren)' : 'Summe auf 100% fixieren';
            }
        }

        // Initialisiert Event-Listener
        function initGewichtungInputs() {
            if (gewichtungInitialized) return;

            const factors = Object.keys(FAKTOR_MAP);
            let allFound = true;

            factors.forEach(factor => {
                const row = document.querySelector(`.gewichtung-card[data-factor="${factor}"]`);
                const input = document.getElementById(FAKTOR_MAP[factor].inputId);
                const slider = document.getElementById(`gewicht-slider-${factor}`);

                if (!row || !input) {
                    allFound = false;
                    return;
                }

                // Nur Zahlen erlauben
                input.addEventListener('keypress', function(e) {
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                        e.preventDefault();
                    }
                });

                // Bei Änderung normalisieren
                input.addEventListener('change', function(e) {
                    if (gewichtungLocks[factor]) {
                        const gew = getGewichtungen();
                        input.value = gew[FAKTOR_MAP[factor].key];
                        return;
                    }

                    const unlockedCount = factors.filter(f => !gewichtungLocks[f]).length;
                    if (unlockedCount === 1 && !gewichtungLocks[factor]) {
                        const gew = getGewichtungen();
                        input.value = gew[FAKTOR_MAP[factor].key];
                        return;
                    }

                    const newVal = parseInt(e.target.value) || 0;
                    normalizeGewichtungen(factor, newVal);
                });

                // Bei Blur auch normalisieren
                input.addEventListener('blur', function(e) {
                    if (!gewichtungLocks[factor]) {
                        const unlockedCount = factors.filter(f => !gewichtungLocks[f]).length;
                        if (unlockedCount > 1) {
                            const newVal = parseInt(e.target.value) || 0;
                            normalizeGewichtungen(factor, newVal);
                        }
                    }
                });

                // Slider-Events für Normalisierung
                if (slider) {
                    slider.addEventListener('input', function(e) {
                        if (gewichtungLocks[factor]) {
                            // Wenn gesperrt, Slider zurücksetzen
                            const gew = getGewichtungen();
                            slider.value = gew[FAKTOR_MAP[factor].key];
                            return;
                        }
                        // Synchronisiere mit Text-Input
                        input.value = e.target.value;
                        updateGewichtungSumme();
                    });

                    slider.addEventListener('change', function(e) {
                        if (gewichtungLocks[factor]) {
                            const gew = getGewichtungen();
                            slider.value = gew[FAKTOR_MAP[factor].key];
                            return;
                        }

                        const unlockedCount = factors.filter(f => !gewichtungLocks[f]).length;
                        if (unlockedCount === 1 && !gewichtungLocks[factor]) {
                            const gew = getGewichtungen();
                            slider.value = gew[FAKTOR_MAP[factor].key];
                            input.value = gew[FAKTOR_MAP[factor].key];
                            return;
                        }

                        const newVal = parseInt(e.target.value) || 0;
                        normalizeGewichtungen(factor, newVal);
                    });
                }

                // Doppelklick auf Row für Lock (zusätzlich zum Klick auf Icon)
                row.addEventListener('dblclick', function(e) {
                    if (e.target.tagName !== 'INPUT' && !e.target.classList.contains('gewichtung-lock-indicator')) {
                        handleLockToggle(factor);
                    }
                });
            });

            if (allFound) gewichtungInitialized = true;
        }

        // Reset auf Standard
        function resetGewichtungen() {
            // Reset Faktor-Locks
            gewichtungLocks = { orientierung: false, archetyp: false, dominanz: false, geschlecht: false };
            saveGewichtungLocks();

            // Reset Summen-Lock auf Standard (aktiviert)
            summeLocked = true;
            saveSummeLock();

            // Reset Text-Inputs
            document.getElementById('gewicht-orientierung').value = GEWICHTUNG_DEFAULTS.O;
            document.getElementById('gewicht-archetyp').value = GEWICHTUNG_DEFAULTS.A;
            document.getElementById('gewicht-dominanz').value = GEWICHTUNG_DEFAULTS.D;
            document.getElementById('gewicht-geschlecht').value = GEWICHTUNG_DEFAULTS.G;

            // Reset Slider
            const sliderO = document.getElementById('gewicht-slider-orientierung');
            const sliderA = document.getElementById('gewicht-slider-archetyp');
            const sliderD = document.getElementById('gewicht-slider-dominanz');
            const sliderG = document.getElementById('gewicht-slider-geschlecht');
            if (sliderO) sliderO.value = GEWICHTUNG_DEFAULTS.O;
            if (sliderA) sliderA.value = GEWICHTUNG_DEFAULTS.A;
            if (sliderD) sliderD.value = GEWICHTUNG_DEFAULTS.D;
            if (sliderG) sliderG.value = GEWICHTUNG_DEFAULTS.G;

            saveGewichtungen();
            updateRowStates();
            updateGewichtungSumme();
        }
        window.resetGewichtungen = resetGewichtungen;

        // Lädt Gewichtungen in UI
        function loadGewichtungenIntoUI() {
            initGewichtungInputs();

            const gew = getGewichtungen();
            gewichtungLocks = getGewichtungLocks();
            summeLocked = getSummeLock();

            const inputO = document.getElementById('gewicht-orientierung');
            const inputA = document.getElementById('gewicht-archetyp');
            const inputD = document.getElementById('gewicht-dominanz');
            const inputG = document.getElementById('gewicht-geschlecht');

            const sliderO = document.getElementById('gewicht-slider-orientierung');
            const sliderA = document.getElementById('gewicht-slider-archetyp');
            const sliderD = document.getElementById('gewicht-slider-dominanz');
            const sliderG = document.getElementById('gewicht-slider-geschlecht');

            if (inputO) inputO.value = gew.O;
            if (inputA) inputA.value = gew.A;
            if (inputD) inputD.value = gew.D;
            if (inputG) inputG.value = gew.G;

            // Synchronisiere Slider mit Inputs
            if (sliderO) sliderO.value = gew.O;
            if (sliderA) sliderA.value = gew.A;
            if (sliderD) sliderD.value = gew.D;
            if (sliderG) sliderG.value = gew.G;

            updateGewichtungSumme();
            updateRowStates();
        }

        // DOM-Ready Fallback
        document.addEventListener('DOMContentLoaded', function() {
            initGewichtungInputs();
        });

        // ═══════════════════════════════════════════════════════════════════════

        // Open Profile Review Modal
        // Hinweis: currentProfileReviewContext ist am Anfang der Datei definiert.
        // person: 'ich' oder 'partner' - wird benötigt um Gender-Modifikatoren anzuwenden
        function openProfileReviewModal(archetypeKey, person) {
            console.log('[TIAGE] openProfileReviewModal called:', archetypeKey, person);
            var modal = document.getElementById('profileReviewModal');
            if (!modal) {
                console.log('[TIAGE] profileReviewModal not found!');
                return;
            }

            // Speichere Kontext für spätere Neuladung bei Gender-Änderung
            currentProfileReviewContext.archetypeKey = archetypeKey || 'duo';
            currentProfileReviewContext.person = person || 'ich';

            // ════════════════════════════════════════════════════════════════════════
            // NEU: Lade gespeicherte Bedürfniswerte VOR dem Rendering
            // So werden die Werte beim initializeFlatModal berücksichtigt
            // ════════════════════════════════════════════════════════════════════════
            if (typeof AttributeSummaryCard !== 'undefined') {
                try {
                    var storedNeedsValues = localStorage.getItem('tiage_flat_needs_values');
                    var storedNeedsLocks = localStorage.getItem('tiage_flat_needs_locks');

                    if (storedNeedsValues) {
                        var parsedValues = JSON.parse(storedNeedsValues);
                        AttributeSummaryCard.setFlatNeedsValues(parsedValues);
                        console.log('[ProfileReview] Gespeicherte Bedürfniswerte geladen:', Object.keys(parsedValues).length, 'Werte');
                    }

                    if (storedNeedsLocks) {
                        var parsedLocks = JSON.parse(storedNeedsLocks);
                        AttributeSummaryCard.setFlatLockedNeeds(parsedLocks);
                        console.log('[ProfileReview] Gespeicherte Locks geladen:', Object.keys(parsedLocks).length, 'Locks');
                    }
                } catch (e) {
                    console.warn('[ProfileReview] Fehler beim Laden der Bedürfniswerte:', e);
                }
            }

            // Initialisiere Modal-Content dynamisch - FLACHE Darstellung ohne Kategorien
            if (typeof ProfileReviewRenderer !== 'undefined') {
                console.log('[TIAGE] ProfileReviewRenderer exists, initializing flat view...');
                // Hole Archetyp-Label für die flache Darstellung
                var archetypLabel = 'Profil';
                var archDef = typeof archetypeDefinitions !== 'undefined' ? archetypeDefinitions[archetypeKey || 'duo'] : null;
                if (archDef && archDef.name) {
                    archetypLabel = archDef.name;
                }
                ProfileReviewRenderer.initializeFlatModal(archetypeKey || 'duo', archetypLabel);
            } else {
                console.log('[TIAGE] ProfileReviewRenderer NOT defined!');
            }

            // Lade Gewichtungen in UI
            loadGewichtungenIntoUI();

            // Get archetype data
            archetypeKey = archetypeKey || 'duo';
            person = person || 'ich';
            var archetype = typeof archetypeDefinitions !== 'undefined' ? archetypeDefinitions[archetypeKey] : null;

            // Update badge mit Archetyp-Info
            var badge = document.getElementById('profileReviewBadge');
            if (badge && archetype) {
                var personPrefix = person === 'ich' ? 'Dein' : 'Partner';
                badge.textContent = personPrefix + ' ' + (archetype.name || archetypeKey) + '-Profil';
            }

            // Versuche komponiertes Profil mit Gender-Modifikatoren zu laden
            var inferences = null;
            var personData = personDimensions[person];

            // Hole Dominanz und Orientierung (auch für Source-Explanation benötigt)
            var dominanz = 'ausgeglichen';
            var orientierung = 'heterosexuell';

            if (personData) {
                if (personData.dominanz && personData.dominanz.primary) {
                    dominanz = personData.dominanz.primary;
                }
                if (personData.orientierung && personData.orientierung.primary) {
                    orientierung = personData.orientierung.primary;
                }
            }

            if (personData && personData.geschlecht &&
                personData.geschlecht.primary && personData.geschlecht.secondary &&
                typeof TiageProfileStore !== 'undefined') {

                // Komponiertes Profil mit allen Modifikatoren laden
                var composedProfile = TiageProfileStore.getProfileSync(
                    archetypeKey,
                    personData.geschlecht.primary,
                    personData.geschlecht.secondary,
                    dominanz,
                    orientierung
                );

                if (composedProfile && composedProfile.attributes) {
                    inferences = composedProfile.attributes;
                    console.log('[ProfileReview] Komponiertes Profil geladen:',
                        archetypeKey, personData.geschlecht.primary + '-' + personData.geschlecht.secondary);
                }
            }

            // Fallback: nur Archetyp-Defaults wenn kein Gender ausgewählt
            if (!inferences && archetype && archetype.defaultInferences) {
                inferences = archetype.defaultInferences;
                console.log('[ProfileReview] Fallback auf Archetyp-Defaults (kein vollständiges Gender ausgewählt)');
            }

            // Update Source Explanation with current factors
            updateSourceExplanation(archetypeKey, personData, dominanz, orientierung);

            // Load default values from profile
            if (inferences) {

                // Toggle-Buttons
                setProfileBtnState('pr-kinder', inferences.kinderWunsch === 'ja');
                setProfileBtnState('pr-ehe', inferences.eheWunsch === 'ja');
                setProfileBtnState('pr-zusammen', inferences.wohnform === 'zusammen');
                setProfileBtnState('pr-haustiere', inferences.haustiere === 'ja' || inferences.haustiere === 'ja-gemeinsam' || inferences.haustiere === 'ja-eigene');

                // Hilfsfunktion: Numerischen Wert (0-1) auf Triple-Button-Wert (25/50/75) mappen
                function mapToTripleValue(numValue) {
                    if (numValue === undefined || numValue === null) return 50;
                    if (numValue <= 0.33) return 25;
                    if (numValue >= 0.67) return 75;
                    return 50;
                }

                // Triple-Buttons basierend auf numerischen Profil-Werten setzen
                // Diese Werte werden durch Gender-Modifikatoren beeinflusst!

                // Umzugsbereitschaft
                var umzugValue = 50;
                if (inferences.umzugsbereitschaft === 'sehr-flexibel') umzugValue = 75;
                else if (inferences.umzugsbereitschaft === 'flexibel') umzugValue = 75;
                else if (inferences.umzugsbereitschaft === 'verhandelbar') umzugValue = 50;
                else if (inferences.umzugsbereitschaft === 'nur-gemeinsam') umzugValue = 25;
                else if (inferences.umzugsbereitschaft === 'sesshaft') umzugValue = 25;
                setTripleBtnValue('pr-umzug', umzugValue);

                // Familie-Wichtigkeit (numerisch 0-1, beeinflusst durch Gender)
                setTripleBtnValue('pr-familie', mapToTripleValue(inferences.familieWichtigkeit));

                // Finanzen
                var finanzenValue = 50;
                if (inferences.finanzen === 'getrennt') finanzenValue = 25;
                else if (inferences.finanzen === 'hybrid') finanzenValue = 50;
                else if (inferences.finanzen === 'gemeinsam') finanzenValue = 75;
                setTripleBtnValue('pr-finanzen', finanzenValue);

                // Karriere-Priorität (numerisch 0-1)
                setTripleBtnValue('pr-karriere', mapToTripleValue(inferences.karrierePrioritaet));

                // KOMMUNIKATION - stark beeinflusst durch Gender-Untergruppen
                setTripleBtnValue('pr-gespraech', mapToTripleValue(inferences.gespraechsBeduernis));
                setTripleBtnValue('pr-emotional', mapToTripleValue(inferences.emotionaleOffenheit));
                setTripleBtnValue('pr-konflikt', mapToTripleValue(inferences.konfliktverhalten));

                // SOZIALES
                // IntroExtro: -1 = intro, 0 = ambivert, 1 = extro
                var introExtroValue = 50;
                if (typeof inferences.introExtro === 'number') {
                    if (inferences.introExtro <= -0.33) introExtroValue = 25;
                    else if (inferences.introExtro >= 0.33) introExtroValue = 75;
                } else if (inferences.introExtro === 'introvertiert') introExtroValue = 25;
                else if (inferences.introExtro === 'extrovertiert') introExtroValue = 75;
                setTripleBtnValue('pr-introextro', introExtroValue);

                setTripleBtnValue('pr-alleinzeit', mapToTripleValue(inferences.alleinZeitBeduernis));
                setTripleBtnValue('pr-freunde', mapToTripleValue(inferences.freundeskreis));

                // INTIMITÄT
                setTripleBtnValue('pr-naehe', mapToTripleValue(inferences.koerperlicheNaehe));
                setTripleBtnValue('pr-romantik', mapToTripleValue(inferences.romantikBeduernis));
                setTripleBtnValue('pr-sex', mapToTripleValue(inferences.sexFrequenz));

                // WERTE - beeinflusst durch Gender (z.B. traditionenWichtigkeit)
                setTripleBtnValue('pr-religion', mapToTripleValue(inferences.religiositaet));
                // traditionVsModern: niedrige traditionenWichtigkeit = modern (75), hohe = traditionell (25)
                var traditionValue = 50;
                if (typeof inferences.traditionenWichtigkeit === 'number') {
                    // Invertiert: hohe traditionenWichtigkeit → traditionell (25), niedrige → modern (75)
                    if (inferences.traditionenWichtigkeit >= 0.67) traditionValue = 25;
                    else if (inferences.traditionenWichtigkeit <= 0.33) traditionValue = 75;
                }
                setTripleBtnValue('pr-tradition', traditionValue);

                setTripleBtnValue('pr-umwelt', mapToTripleValue(inferences.umweltbewusstsein));
                setTripleBtnValue('pr-politik', mapToTripleValue(inferences.politischesInteresse));
            }

            // ════════════════════════════════════════════════════════════════════════
            // NEU: Lade Bedürfniswerte aus composedProfile.needs in AttributeSummaryCard
            // Dies füllt die Slider mit den echten Profil-Werten statt defaultValue 50
            // ════════════════════════════════════════════════════════════════════════
            if (composedProfile && composedProfile.needs &&
                typeof AttributeSummaryCard !== 'undefined' &&
                AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING) {

                console.log('[ProfileReview] Lade Bedürfniswerte aus composedProfile.needs');

                // Für jedes Attribut-Mapping die zugehörigen Needs aus dem Profil setzen
                Object.keys(AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING).forEach(function(attrId) {
                    var mapping = AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING[attrId];
                    if (!mapping || !mapping.needs) return;

                    var needValues = {};
                    var foundCount = 0;

                    mapping.needs.forEach(function(needId) {
                        if (composedProfile.needs[needId] !== undefined) {
                            needValues[needId] = composedProfile.needs[needId];
                            foundCount++;
                        } else {
                            // Fallback auf 50 wenn Bedürfnis nicht im Profil definiert
                            needValues[needId] = 50;
                        }
                    });

                    // Nur setzen wenn mindestens ein Wert gefunden wurde
                    if (foundCount > 0) {
                        AttributeSummaryCard.setNeedsValues(attrId, needValues);
                    }
                });

                console.log('[ProfileReview] Bedürfniswerte geladen für', Object.keys(AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING).length, 'Attribute');
            } else {
                console.log('[ProfileReview] Keine Bedürfniswerte verfügbar (composedProfile.needs fehlt oder AttributeSummaryCard nicht geladen)');
            }

            // Load geschlechtsidentität from current main gender selection
            // KOPPLUNG: Nur wenn auf Hauptseite etwas ausgewählt ist, wird hier auch etwas ausgewählt
            if (typeof TiageState !== 'undefined') {
                var primaryGeschlecht = TiageState.getPrimaryGeschlecht(person);
                var secondaryGeschlecht = TiageState.getSecondaryGeschlecht(person);

                // Update geschlechtsidentität options + Auswahl basierend auf Hauptseite
                // Wenn secondaryGeschlecht null ist, wird keine Option aktiviert
                updateGeschlechtsidentitaetOptions(primaryGeschlecht, secondaryGeschlecht);

                if (primaryGeschlecht && secondaryGeschlecht) {
                    console.log('[ProfileReview] Geschlechtsidentität geladen:', primaryGeschlecht, '/', secondaryGeschlecht);
                } else {
                    console.log('[ProfileReview] Geschlechtsidentität: Keine Auswahl (Hauptseite nicht vollständig)');
                }
            }

            // Reset changes counter
            profileReviewChangesCount = 0;
            var badge = document.getElementById('profileReviewChangesBadge');
            if (badge) badge.style.display = 'none';

            // Save initial state
            profileReviewInitialState = getProfileReviewState();

            // Show modal
            modal.style.display = 'flex';
            modal.classList.add('active');
        }
        window.openProfileReviewModal = openProfileReviewModal;

        // Close Profile Review Modal
        function closeProfileReviewModal(event) {
            if (event && event.target !== event.currentTarget) return;
            var modal = document.getElementById('profileReviewModal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
            // Clear search filter when closing modal
            if (typeof clearProfileReviewSearch === 'function') {
                clearProfileReviewSearch();
            }
        }
        window.closeProfileReviewModal = closeProfileReviewModal;

        // Toggle Source Explanation Section
        function toggleSourceExplanation() {
            var content = document.getElementById('sourceExplanationContent');
            var toggle = document.getElementById('sourceExplanationToggle');
            if (content && toggle) {
                content.classList.toggle('collapsed');
                toggle.classList.toggle('collapsed');
            }
        }
        window.toggleSourceExplanation = toggleSourceExplanation;

        // ═══════════════════════════════════════════════════════════════════════════
        // BEDÜRFNIS SEARCH/FILTER FUNCTIONALITY
        // ═══════════════════════════════════════════════════════════════════════════

        /**
         * Convert wildcard pattern to regex (* = any characters)
         * @param {string} pattern - Search pattern with * wildcards
         * @returns {RegExp} Regular expression for matching
         */
        function needWildcardToRegex(pattern) {
            // Escape special regex characters except *
            var escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
            // Convert * to .* for wildcard matching
            var regex = escaped.replace(/\*/g, '.*');
            return new RegExp(regex, 'i'); // Case insensitive
        }

        /**
         * Filter profile review modal by need name
         * @param {string} query - Search query (supports * wildcard)
         */
        function filterProfileReviewByNeed(query) {
            var searchWrapper = document.querySelector('.profile-review-search-wrapper');
            var hint = document.getElementById('profileReviewSearchHint');
            var contentContainer = document.getElementById('profileReviewContent');

            if (!contentContainer) return;

            // Toggle clear button visibility
            if (searchWrapper) {
                searchWrapper.classList.toggle('has-value', query && query.trim().length > 0);
            }

            // Reset hint classes
            if (hint) {
                hint.classList.remove('has-results', 'no-results');
            }

            // If empty query, show all and reset
            if (!query || query.trim() === '') {
                resetProfileReviewFilter();
                if (hint) hint.textContent = '';
                return;
            }

            var searchPattern = needWildcardToRegex(query.trim());
            var totalMatches = 0;
            var matchedAttributes = 0;

            // Get all attribute cards
            var cards = contentContainer.querySelectorAll('.attribute-summary-card');
            var categories = contentContainer.querySelectorAll('.profile-review-category');

            // First pass: check each card for matching needs
            cards.forEach(function(card) {
                var needItems = card.querySelectorAll('.attribute-need-item');
                var cardHasMatch = false;

                needItems.forEach(function(needItem) {
                    var needLabel = needItem.querySelector('.attribute-need-label');
                    if (!needLabel) return;

                    var labelText = needLabel.textContent || '';
                    var needId = needItem.getAttribute('data-need') || '';

                    // Check if need matches the search pattern (label or ID)
                    var matches = searchPattern.test(labelText) || searchPattern.test(needId);

                    // Also check category and dimension names
                    if (!matches && typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.definitionen) {
                        var needDef = GfkBeduerfnisse.definitionen[needId];
                        if (needDef) {
                            // Check category name
                            var kategorie = needDef.kategorie || '';
                            if (kategorie && searchPattern.test(kategorie)) {
                                matches = true;
                            }

                            // Check category label from taxonomy
                            if (!matches && typeof TiageTaxonomie !== 'undefined') {
                                var katData = TiageTaxonomie.kategorien && TiageTaxonomie.getKategorie
                                    ? TiageTaxonomie.getKategorie(kategorie)
                                    : null;
                                if (katData) {
                                    if (katData.label && searchPattern.test(katData.label)) {
                                        matches = true;
                                    }
                                    if (katData.beschreibung && searchPattern.test(katData.beschreibung)) {
                                        matches = true;
                                    }
                                    // Check dimension
                                    if (!matches && katData.dimension) {
                                        var dimData = TiageTaxonomie.getDimension
                                            ? TiageTaxonomie.getDimension(katData.dimension)
                                            : null;
                                        if (dimData) {
                                            if (dimData.label && searchPattern.test(dimData.label)) {
                                                matches = true;
                                            }
                                            if (dimData.beschreibung && searchPattern.test(dimData.beschreibung)) {
                                                matches = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Toggle match class
                    needItem.classList.toggle('filter-match', matches);

                    if (matches) {
                        cardHasMatch = true;
                        totalMatches++;
                    }
                });

                // Show/hide card and auto-expand if has matches
                card.classList.toggle('filter-hidden', !cardHasMatch);
                card.classList.toggle('has-filter-match', cardHasMatch);

                if (cardHasMatch) {
                    matchedAttributes++;
                    // Expand the needs list to show matches
                    var needsList = card.querySelector('.attribute-summary-needs-list');
                    if (needsList) {
                        needsList.classList.remove('collapsed');
                    }
                }
            });

            // Second pass: hide categories with no visible cards
            categories.forEach(function(category) {
                var visibleCards = category.querySelectorAll('.attribute-summary-card:not(.filter-hidden)');
                category.classList.toggle('filter-hidden', visibleCards.length === 0);

                // Update item count badge if present
                var badge = category.querySelector('.category-item-count');
                if (badge && visibleCards.length > 0) {
                    badge.textContent = '(' + visibleCards.length + ')';
                }
            });

            // Update hint
            if (hint) {
                if (totalMatches > 0) {
                    hint.textContent = totalMatches + ' Bedürfnis' + (totalMatches !== 1 ? 'se' : '') +
                                      ' in ' + matchedAttributes + ' Attribut' + (matchedAttributes !== 1 ? 'en' : '') +
                                      ' gefunden';
                    hint.classList.add('has-results');
                } else {
                    hint.textContent = 'Keine Bedürfnisse gefunden. Tipp: Verwende * als Platzhalter (z.B. *kind*)';
                    hint.classList.add('no-results');
                }
            }
        }
        window.filterProfileReviewByNeed = filterProfileReviewByNeed;

        /**
         * Reset all filter states
         */
        function resetProfileReviewFilter() {
            var contentContainer = document.getElementById('profileReviewContent');
            if (!contentContainer) return;

            // Remove all filter classes
            var hiddenElements = contentContainer.querySelectorAll('.filter-hidden');
            hiddenElements.forEach(function(el) {
                el.classList.remove('filter-hidden');
            });

            var matchedCards = contentContainer.querySelectorAll('.has-filter-match');
            matchedCards.forEach(function(el) {
                el.classList.remove('has-filter-match');
            });

            var matchedNeeds = contentContainer.querySelectorAll('.filter-match');
            matchedNeeds.forEach(function(el) {
                el.classList.remove('filter-match');
            });

            // Collapse all expanded needs lists (restore original state)
            var expandedLists = contentContainer.querySelectorAll('.attribute-summary-needs-list:not(.collapsed)');
            expandedLists.forEach(function(list) {
                // Only collapse if it was auto-expanded by filter
                var card = list.closest('.attribute-summary-card');
                if (card && !card.classList.contains('user-expanded')) {
                    list.classList.add('collapsed');
                }
            });

            // Restore original category counts
            var categories = contentContainer.querySelectorAll('.profile-review-category');
            categories.forEach(function(category) {
                var totalCards = category.querySelectorAll('.attribute-summary-card').length;
                var badge = category.querySelector('.category-item-count');
                if (badge) {
                    badge.textContent = '(' + totalCards + ')';
                }
            });
        }
        window.resetProfileReviewFilter = resetProfileReviewFilter;

        /**
         * Clear search input and reset filter
         */
        function clearProfileReviewSearch() {
            var input = document.getElementById('profileReviewSearchInput');
            if (input) {
                input.value = '';
                input.focus();
            }
            resetProfileReviewFilter();

            var hint = document.getElementById('profileReviewSearchHint');
            if (hint) {
                hint.textContent = '';
                hint.classList.remove('has-results', 'no-results');
            }

            var searchWrapper = document.querySelector('.profile-review-search-wrapper');
            if (searchWrapper) {
                searchWrapper.classList.remove('has-value');
            }
        }
        window.clearProfileReviewSearch = clearProfileReviewSearch;

        // ═══════════════════════════════════════════════════════════════════════════

        // Update Source Explanation with current factors
        function updateSourceExplanation(archetypeKey, personData, dominanz, orientierung) {
            var locale = typeof TiageI18n !== 'undefined' ? TiageI18n.getLocale() : null;

            // Archetyp
            var archetypeEl = document.getElementById('srcFactor-archetype');
            if (archetypeEl) {
                archetypeEl.textContent = archetypeKey ? archetypeKey.charAt(0).toUpperCase() + archetypeKey.slice(1) : 'Duo';
            }

            // Gender
            var genderEl = document.getElementById('srcFactor-gender');
            if (genderEl && personData && personData.geschlecht) {
                var p = personData.geschlecht.primary;
                var s = personData.geschlecht.secondary;
                if (p && s) {
                    var pLabel = (locale && locale.geschlecht && locale.geschlecht.primary && locale.geschlecht.primary[p]) ? locale.geschlecht.primary[p] : p;
                    var sLabel = (locale && locale.geschlecht && locale.geschlecht.secondary && locale.geschlecht.secondary[s]) ? locale.geschlecht.secondary[s] : s;
                    genderEl.textContent = pLabel + ' / ' + sLabel;
                } else if (p) {
                    genderEl.textContent = (locale && locale.geschlecht && locale.geschlecht.primary && locale.geschlecht.primary[p]) ? locale.geschlecht.primary[p] : p;
                }
            }

            // Dominanz
            var domEl = document.getElementById('srcFactor-dominance');
            if (domEl && dominanz) {
                var domLabel = (locale && locale.dominanz && locale.dominanz.types && locale.dominanz.types[dominanz]) ? locale.dominanz.types[dominanz] : dominanz.charAt(0).toUpperCase() + dominanz.slice(1);
                domEl.textContent = domLabel;
            }

            // Orientierung
            var oriEl = document.getElementById('srcFactor-orientation');
            if (oriEl && orientierung) {
                var oriLabel = (locale && locale.orientierung && locale.orientierung.types && locale.orientierung.types[orientierung]) ? locale.orientierung.types[orientierung] : orientierung.charAt(0).toUpperCase() + orientierung.slice(1);
                oriEl.textContent = oriLabel;
            }
        }
        window.updateSourceExplanation = updateSourceExplanation;

        // Update Slider Value Display - Zeigt Zahl 1-10
        function updateProfileReviewSlider(slider, valueId) {
            var value = parseInt(slider.value);
            var valueSpan = document.getElementById(valueId);
            if (!valueSpan) return;

            // Map 0-100 to 1-10
            var displayValue = Math.round(value / 10);
            if (displayValue < 1) displayValue = 1;
            if (displayValue > 10) displayValue = 10;

            valueSpan.textContent = displayValue;
        }
        window.updateProfileReviewSlider = updateProfileReviewSlider;

        // Track Changes
        function trackProfileReviewChange() {
            profileReviewChangesCount++;
            var badge = document.getElementById('profileReviewChangesBadge');
            if (badge) {
                badge.textContent = profileReviewChangesCount;
                badge.style.display = 'inline-block';
            }
        }
        window.trackProfileReviewChange = trackProfileReviewChange;

        // Toggle button active state
        function toggleProfileBtn(btn) {
            btn.classList.toggle('active');
            trackProfileReviewChange();
        }
        window.toggleProfileBtn = toggleProfileBtn;

        // Set button state (for loading from archetype)
        function setProfileBtnState(btnId, active) {
            var btn = document.getElementById(btnId);
            if (btn) {
                if (active) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        }
        window.setProfileBtnState = setProfileBtnState;

        // Select Triple Button (für 3er-Gruppen)
        function selectTripleBtn(btn) {
            console.log('[TIAGE] selectTripleBtn called', btn);
            var group = btn.parentElement;
            var attrId = group.getAttribute('data-attr');
            console.log('[TIAGE] attrId:', attrId, 'group:', group);
            var wasActive = btn.classList.contains('active');

            // Alle Buttons in der Gruppe deaktivieren
            group.querySelectorAll('.profile-review-triple-btn').forEach(function(b) {
                b.classList.remove('active');
            });

            // Toggle: Wenn bereits aktiv war, nicht wieder aktivieren (Abwahl ermöglichen)
            if (!wasActive) {
                btn.classList.add('active');
            }
            trackProfileReviewChange();

            // Live-Synchronisierung für Geschlechtsidentität
            if (attrId === 'pr-geschlecht-sekundaer' && typeof TiageState !== 'undefined') {
                var primaryGeschlecht = TiageState.getPrimaryGeschlecht('ich');
                if (primaryGeschlecht) {
                    var secondaryValue = null;

                    // Nur wenn ein Button aktiv ist, setze den Wert
                    if (!wasActive) {
                        var value = parseInt(btn.getAttribute('data-value'), 10);
                        secondaryValue = mapGeschlechtsidentitaetToSecondary(value, primaryGeschlecht);
                    }

                    // Use the new sync function that updates both personDimensions and UI
                    if (typeof setSecondaryGeschlechtAndSync === 'function') {
                        setSecondaryGeschlechtAndSync('ich', secondaryValue);
                    } else {
                        // Fallback to TiageState only
                        TiageState.setSecondaryGeschlecht('ich', secondaryValue);
                    }
                    console.log('[ProfileReview] Geschlechtsidentität live-sync:', wasActive ? 'abgewählt' : secondaryValue);

                    // Profil-Attribute und Anzeige aktualisieren
                    if (!wasActive) {
                        reloadProfileAttributesAfterGenderChange();
                    } else {
                        // Bei Abwahl: Source-Explanation aktualisieren (zeigt nur noch primary)
                        var person = currentProfileReviewContext.person || 'ich';
                        var personData = personDimensions[person];
                        var dominanz = (personData && personData.dominanz && personData.dominanz.primary) ? personData.dominanz.primary : 'ausgeglichen';
                        var orientierung = (personData && personData.orientierung && personData.orientierung.primary) ? personData.orientierung.primary : 'heterosexuell';
                        updateSourceExplanation(currentProfileReviewContext.archetypeKey, personData, dominanz, orientierung);
                    }
                }
            }
        }
        window.selectTripleBtn = selectTripleBtn;

        // Lade Profil-Attribute neu nach Änderung der Geschlechtsidentität
        function reloadProfileAttributesAfterGenderChange() {
            var archetypeKey = currentProfileReviewContext.archetypeKey;
            var person = currentProfileReviewContext.person;

            if (!archetypeKey || !person) {
                console.log('[ProfileReview] Kein Kontext für Reload verfügbar');
                return;
            }

            var personData = personDimensions[person];
            if (!personData || !personData.geschlecht ||
                !personData.geschlecht.primary || !personData.geschlecht.secondary) {
                console.log('[ProfileReview] Unvollständige Gender-Daten für Reload');
                return;
            }

            if (typeof TiageProfileStore === 'undefined') {
                console.log('[ProfileReview] TiageProfileStore nicht verfügbar');
                return;
            }

            // Hole Dominanz und Orientierung
            var dominanz = 'ausgeglichen';
            if (personData.dominanz && personData.dominanz.primary) {
                dominanz = personData.dominanz.primary;
            }

            var orientierung = 'heterosexuell';
            if (personData.orientierung && personData.orientierung.primary) {
                orientierung = personData.orientierung.primary;
            }

            // Komponiertes Profil mit neuen Gender-Modifikatoren laden
            var composedProfile = TiageProfileStore.getProfileSync(
                archetypeKey,
                personData.geschlecht.primary,
                personData.geschlecht.secondary,
                dominanz,
                orientierung
            );

            if (!composedProfile || !composedProfile.attributes) {
                console.log('[ProfileReview] Kein komponiertes Profil gefunden');
                return;
            }

            var inferences = composedProfile.attributes;
            console.log('[ProfileReview] Profil neu geladen nach Gender-Änderung:',
                personData.geschlecht.primary + '-' + personData.geschlecht.secondary);

            // Hilfsfunktion: Numerischen Wert (0-1) auf Triple-Button-Wert (25/50/75) mappen
            function mapToTripleValue(numValue) {
                if (numValue === undefined || numValue === null) return 50;
                if (numValue <= 0.33) return 25;
                if (numValue >= 0.67) return 75;
                return 50;
            }

            // Toggle-Buttons aktualisieren
            setProfileBtnState('pr-kinder', inferences.kinderWunsch === 'ja');
            setProfileBtnState('pr-ehe', inferences.eheWunsch === 'ja');
            setProfileBtnState('pr-zusammen', inferences.wohnform === 'zusammen');
            setProfileBtnState('pr-haustiere', inferences.haustiere === 'ja' || inferences.haustiere === 'ja-gemeinsam' || inferences.haustiere === 'ja-eigene');

            // Umzugsbereitschaft
            var umzugValue = 50;
            if (inferences.umzugsbereitschaft === 'sehr-flexibel') umzugValue = 75;
            else if (inferences.umzugsbereitschaft === 'flexibel') umzugValue = 75;
            else if (inferences.umzugsbereitschaft === 'verhandelbar') umzugValue = 50;
            else if (inferences.umzugsbereitschaft === 'nur-gemeinsam') umzugValue = 25;
            else if (inferences.umzugsbereitschaft === 'sesshaft') umzugValue = 25;
            setTripleBtnValue('pr-umzug', umzugValue);

            // Familie-Wichtigkeit
            setTripleBtnValue('pr-familie', mapToTripleValue(inferences.familieWichtigkeit));

            // Finanzen
            var finanzenValue = 50;
            if (inferences.finanzen === 'getrennt') finanzenValue = 25;
            else if (inferences.finanzen === 'hybrid') finanzenValue = 50;
            else if (inferences.finanzen === 'gemeinsam') finanzenValue = 75;
            setTripleBtnValue('pr-finanzen', finanzenValue);

            // Karriere-Priorität
            setTripleBtnValue('pr-karriere', mapToTripleValue(inferences.karrierePrioritaet));

            // KOMMUNIKATION
            setTripleBtnValue('pr-gespraech', mapToTripleValue(inferences.gespraechsBeduernis));
            setTripleBtnValue('pr-emotional', mapToTripleValue(inferences.emotionaleOffenheit));
            setTripleBtnValue('pr-konflikt', mapToTripleValue(inferences.konfliktverhalten));

            // SOZIALES
            var introExtroValue = 50;
            if (typeof inferences.introExtro === 'number') {
                if (inferences.introExtro <= -0.33) introExtroValue = 25;
                else if (inferences.introExtro >= 0.33) introExtroValue = 75;
            } else if (inferences.introExtro === 'introvertiert') introExtroValue = 25;
            else if (inferences.introExtro === 'extrovertiert') introExtroValue = 75;
            setTripleBtnValue('pr-introextro', introExtroValue);

            setTripleBtnValue('pr-alleinzeit', mapToTripleValue(inferences.alleinZeitBeduernis));
            setTripleBtnValue('pr-freunde', mapToTripleValue(inferences.freundeskreis));

            // INTIMITÄT
            setTripleBtnValue('pr-naehe', mapToTripleValue(inferences.koerperlicheNaehe));
            setTripleBtnValue('pr-romantik', mapToTripleValue(inferences.romantikBeduernis));
            setTripleBtnValue('pr-sex', mapToTripleValue(inferences.sexFrequenz));

            // WERTE
            setTripleBtnValue('pr-religion', mapToTripleValue(inferences.religiositaet));
            var traditionValue = 50;
            if (typeof inferences.traditionenWichtigkeit === 'number') {
                if (inferences.traditionenWichtigkeit >= 0.67) traditionValue = 25;
                else if (inferences.traditionenWichtigkeit <= 0.33) traditionValue = 75;
            }
            setTripleBtnValue('pr-tradition', traditionValue);

            setTripleBtnValue('pr-umwelt', mapToTripleValue(inferences.umweltbewusstsein));
            setTripleBtnValue('pr-politik', mapToTripleValue(inferences.politischesInteresse));

            // NEU: Source-Explanation aktualisieren um sekundäres Geschlecht oben anzuzeigen
            updateSourceExplanation(archetypeKey, personData, dominanz, orientierung);

            console.log('[ProfileReview] Alle 30 Attribute wurden mit neuen Gender-Modifikatoren aktualisiert');
        }
        window.reloadProfileAttributesAfterGenderChange = reloadProfileAttributesAfterGenderChange;

        // Select Toggle Button (für 2er-Gruppen: Egal/Wichtig)
        function selectToggleBtn(btn) {
            // Alle Buttons in der Gruppe deaktivieren
            var group = btn.parentElement;
            group.querySelectorAll('.profile-review-toggle-option').forEach(function(b) {
                b.classList.remove('active');
            });
            // Geklickten Button aktivieren
            btn.classList.add('active');
            trackProfileReviewChange();
        }
        window.selectToggleBtn = selectToggleBtn;

        // Toggle Button Wert auslesen
        function getToggleBtnValue(attrId) {
            var group = document.querySelector('[data-attr="' + attrId + '"]');
            if (!group) return '1';
            var activeBtn = group.querySelector('.profile-review-toggle-option.active');
            return activeBtn ? activeBtn.getAttribute('data-value') : '1';
        }
        window.getToggleBtnValue = getToggleBtnValue;

        // Toggle Button setzen (für Reset)
        function setToggleBtnValue(attrId, value) {
            var group = document.querySelector('[data-attr="' + attrId + '"]');
            if (!group) return;
            group.querySelectorAll('.profile-review-toggle-option').forEach(function(btn) {
                if (btn.getAttribute('data-value') === String(value)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        window.setToggleBtnValue = setToggleBtnValue;

        // Triple Button Wert auslesen
        function getTripleBtnValue(attrId) {
            var group = document.querySelector('[data-attr="' + attrId + '"]');
            if (!group) return '50';
            var activeBtn = group.querySelector('.profile-review-triple-btn.active');
            return activeBtn ? activeBtn.getAttribute('data-value') : '50';
        }
        window.getTripleBtnValue = getTripleBtnValue;

        // Triple Button setzen (für Reset)
        function setTripleBtnValue(attrId, value) {
            var group = document.querySelector('[data-attr="' + attrId + '"]');
            if (!group) return;
            group.querySelectorAll('.profile-review-triple-btn').forEach(function(btn) {
                if (btn.getAttribute('data-value') === String(value)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        window.setTripleBtnValue = setTripleBtnValue;

        // Filter Attributes by Search
        function filterProfileReviewAttributes(query) {
            var attributes = document.querySelectorAll('.profile-review-checkbox-grid, .profile-review-triple-attribute');
            var categories = document.querySelectorAll('.profile-review-category');
            var searchLower = query.toLowerCase();

            if (!query) {
                attributes.forEach(function(attr) { attr.style.display = ''; });
                categories.forEach(function(cat) { cat.style.display = ''; });
                return;
            }

            categories.forEach(function(category) {
                var hasVisibleAttribute = false;
                var categoryAttributes = category.querySelectorAll('.profile-review-checkbox-grid, .profile-review-triple-attribute');

                categoryAttributes.forEach(function(attr) {
                    var text = attr.textContent.toLowerCase();
                    if (text.includes(searchLower)) {
                        attr.style.display = '';
                        hasVisibleAttribute = true;
                    } else {
                        attr.style.display = 'none';
                    }
                });

                category.style.display = hasVisibleAttribute ? '' : 'none';
            });
        }
        window.filterProfileReviewAttributes = filterProfileReviewAttributes;

        // Show Info Modal
        function showProfileReviewInfo(attribute) {
            var data = profileReviewInfoData[attribute] || profileReviewInfoData['pr-kinder'];
            var modal = document.getElementById('profileReviewInfoModal');
            if (!modal) return;

            document.getElementById('profileReviewInfoTitle').textContent = 'ℹ️ ' + data.title;
            document.getElementById('profileReviewInfoStats').textContent = data.stats;
            document.getElementById('profileReviewInfoResearch').innerHTML = data.research;
            document.getElementById('profileReviewInfoPirsig').textContent = data.pirsig;
            document.getElementById('profileReviewInfoOsho').textContent = data.osho;

            modal.style.display = 'flex';
            modal.classList.add('active');
        }
        window.showProfileReviewInfo = showProfileReviewInfo;

        // Close Info Modal
        function closeProfileReviewInfoModal(event) {
            if (event && event.target !== event.currentTarget) return;
            var modal = document.getElementById('profileReviewInfoModal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        }
        window.closeProfileReviewInfoModal = closeProfileReviewInfoModal;

        // Get Current State (Toggle-Buttons + 3er-Gruppen)
        // Nur die 16 wichtigsten Attribute werden gespeichert
        function getProfileReviewState() {
            return {
                // GESCHLECHTSIDENTITÄT
                geschlechtsidentitaet: getTripleBtnValue('pr-geschlecht-sekundaer'),
                // LEBENSPLANUNG (ohne: zusammen, haustiere, umzug)
                kinder: document.getElementById('pr-kinder')?.classList.contains('active'),
                ehe: document.getElementById('pr-ehe')?.classList.contains('active'),
                familie: getTripleBtnValue('pr-familie'),
                // FINANZEN & KARRIERE
                finanzen: getTripleBtnValue('pr-finanzen'),
                karriere: getTripleBtnValue('pr-karriere'),
                // KOMMUNIKATION (ohne: gespraech)
                emotional: getTripleBtnValue('pr-emotional'),
                konflikt: getTripleBtnValue('pr-konflikt'),
                // SOZIALES
                introextro: getTripleBtnValue('pr-introextro'),
                alleinzeit: getTripleBtnValue('pr-alleinzeit'),
                freunde: getTripleBtnValue('pr-freunde'),
                // INTIMITÄT
                naehe: getTripleBtnValue('pr-naehe'),
                romantik: getTripleBtnValue('pr-romantik'),
                sex: getTripleBtnValue('pr-sex'),
                // WERTE
                religion: getTripleBtnValue('pr-religion'),
                tradition: getTripleBtnValue('pr-tradition'),
                umwelt: getTripleBtnValue('pr-umwelt')
                // PRAKTISCHES - nicht verdrahtet (ordnung, reise)
            };
        }

        // Reset Profile Review - alle Attribute auf Config-Defaults zurücksetzen
        function resetProfileReview() {
            if (confirm('Alle Änderungen zurücksetzen und Standard-Werte wiederherstellen?')) {
                // Nutze ProfileReviewRenderer für vollständigen Reset auf Config-Defaults
                if (typeof ProfileReviewRenderer !== 'undefined') {
                    ProfileReviewRenderer.resetAllValues();
                } else {
                    // Fallback: Manuelles Reset auf Default 50
                    var tripleAttrs = [
                        'pr-geschlecht-sekundaer', // Geschlechtsidentität (default 0 = Cis)
                        'pr-kinder', 'pr-ehe', 'pr-zusammen', 'pr-haustiere',
                        'pr-umzug', 'pr-familie', 'pr-finanzen', 'pr-karriere',
                        'pr-gespraech', 'pr-emotional', 'pr-konflikt',
                        'pr-introextro', 'pr-alleinzeit', 'pr-freunde',
                        'pr-naehe', 'pr-romantik', 'pr-sex',
                        'pr-religion', 'pr-tradition', 'pr-umwelt',
                        'pr-ordnung', 'pr-reise'
                    ];
                    tripleAttrs.forEach(function(attrId) {
                        setTripleBtnValue(attrId, 50);
                    });
                }

                // Reset counter
                profileReviewChangesCount = 0;
                var badge = document.getElementById('profileReviewChangesBadge');
                if (badge) badge.style.display = 'none';

                // Update initial state nach Reset
                profileReviewInitialState = getProfileReviewState();

                // Clear search filter
                if (typeof clearProfileReviewSearch === 'function') {
                    clearProfileReviewSearch();
                }
            }
        }
        window.resetProfileReview = resetProfileReview;

        /**
         * Updates the geschlechtsidentität card options based on primary geschlecht
         * KONTEXTABHÄNGIG:
         * - Mann/Frau (binär): Cis, Trans, Suchend (3 options)
         * - Inter (divers): Nonbinär, Fluid, Suchend (3 options)
         * @param {string} primaryGeschlecht - 'mann', 'frau', 'inter', or null
         */
        function updateGeschlechtsidentitaetOptions(primaryGeschlecht, secondaryGeschlecht) {
            var card = document.getElementById('pr-geschlecht-sekundaer-card');
            if (!card) return;

            var buttonsContainer = card.querySelector('[data-attr="pr-geschlecht-sekundaer"]');
            if (!buttonsContainer) return;

            var options, values;
            if (primaryGeschlecht === 'inter') {
                // Inter (divers): Nonbinär, Fluid, Suchend (3 options)
                options = ['Nonbinär', 'Fluid', 'Suchend'];
                values = [0, 50, 100];
            } else {
                // Mann/Frau (binär): Cis, Trans, Suchend (3 options)
                options = ['Cis', 'Trans', 'Suchend'];
                values = [0, 50, 100];
            }
            buttonsContainer.classList.remove('five-options');

            // Bestimme welche Option aktiv sein soll basierend auf Hauptseiten-Auswahl
            var activeIndex = -1; // -1 = keine Auswahl wenn nichts auf Hauptseite ausgewählt
            if (primaryGeschlecht && secondaryGeschlecht) {
                // Synchronisiere mit Hauptseiten-Auswahl
                var mappedValue = mapSecondaryToGeschlechtsidentitaet(secondaryGeschlecht, primaryGeschlecht);
                activeIndex = values.indexOf(mappedValue);
                if (activeIndex === -1) activeIndex = 0; // Fallback
            }

            // Regenerate buttons
            var buttonsHtml = options.map(function(label, i) {
                var isActive = (i === activeIndex) ? ' active' : '';
                return '<button class="profile-review-triple-btn' + isActive + '" data-value="' + values[i] + '" onclick="selectTripleBtn(this)">' + label + '</button>';
            }).join('');

            buttonsContainer.innerHTML = buttonsHtml;
        }

        /**
         * Maps secondary geschlecht back to profile review value
         * KONTEXTABHÄNGIG (3 Optionen pro Kontext):
         * - Mann/Frau (binär): Cis=0, Trans=50, Suchend=100
         * - Inter (divers): Nonbinär=0, Fluid=50, Suchend=100
         * @param {string} secondary - 'cis', 'trans', 'nonbinaer', 'fluid', 'suchend'
         * @param {string} primary - Body: 'mann', 'frau', 'inter'
         * @returns {number} Profile review value
         */
        function mapSecondaryToGeschlechtsidentitaet(secondary, primary) {
            // For Inter (divers): Nonbinär=0, Fluid=50, Suchend=100
            if (primary === 'inter') {
                if (secondary === 'nonbinaer') return 0;
                if (secondary === 'fluid') return 50;
                if (secondary === 'suchend' || secondary === 'unsicher') return 100;
                return 0; // Default to Nonbinär for Inter
            }

            // For Mann/Frau (binär): Cis=0, Trans=50, Suchend=100
            if (secondary === 'suchend' || secondary === 'unsicher') return 100;

            // Cis: identity matches body
            if (secondary === 'cis' || secondary === primary) return 0;

            // Trans: identity differs from body
            if (secondary === 'trans' ||
                (primary === 'mann' && secondary === 'frau') ||
                (primary === 'frau' && secondary === 'mann')) {
                return 50; // Trans
            }

            // Legacy: nonbinaer/fluid → map to Suchend for Mann/Frau
            if (secondary === 'nonbinaer' || secondary === 'fluid') return 100;

            // Default: Cis
            return 0;
        }

        /**
         * Maps profile review geschlechtsidentität value to secondary geschlecht
         * KONTEXTABHÄNGIG (3 Optionen pro Kontext):
         * - Mann/Frau (binär): 0=Cis, 50=Trans, 100=Suchend
         * - Inter (divers): 0=Nonbinär, 50=Fluid, 100=Suchend
         * @param {number} value - Profile review button value
         * @param {string} primaryGeschlecht - Body: 'mann', 'frau', 'inter'
         * @returns {string} Secondary value for TiageState
         */
        function mapGeschlechtsidentitaetToSecondary(value, primaryGeschlecht) {
            // For Inter (divers): 0=Nonbinär, 50=Fluid, 100=Suchend
            if (primaryGeschlecht === 'inter') {
                if (value <= 25) return 'nonbinaer';  // 0
                if (value <= 75) return 'fluid';      // 50
                return 'suchend';                     // 100
            }

            // For Mann/Frau (binär): 0=Cis, 50=Trans, 100=Suchend
            if (value <= 25) return 'cis';    // 0
            if (value <= 75) return 'trans';  // 50
            return 'suchend';                 // 100
        }

        // Save Profile Review
        function saveProfileReview() {
            var state = getProfileReviewState();
            console.log('Profil gespeichert:', state);

            // ════════════════════════════════════════════════════════════════════════
            // NEU: Speichere Gewichtungen
            // ════════════════════════════════════════════════════════════════════════
            if (typeof saveGewichtungen === 'function') {
                saveGewichtungen();
                console.log('[ProfileReview] Gewichtungen gespeichert');
            }

            // ════════════════════════════════════════════════════════════════════════
            // NEU: Speichere flache Bedürfniswerte und Lock-Status
            // ════════════════════════════════════════════════════════════════════════
            if (typeof AttributeSummaryCard !== 'undefined') {
                var flatNeedsValues = AttributeSummaryCard.getFlatNeedsValues();
                var flatLockedNeeds = AttributeSummaryCard.getFlatLockedNeeds();

                try {
                    localStorage.setItem('tiage_flat_needs_values', JSON.stringify(flatNeedsValues));
                    localStorage.setItem('tiage_flat_needs_locks', JSON.stringify(flatLockedNeeds));
                    console.log('[ProfileReview] Bedürfniswerte gespeichert:', Object.keys(flatNeedsValues).length, 'Werte');
                } catch (e) {
                    console.warn('[ProfileReview] Fehler beim Speichern der Bedürfniswerte:', e);
                }
            }

            // Store in TiageState if available
            if (typeof TiageState !== 'undefined') {
                TiageState.set('profileReview', state);

                // Apply geschlechtsidentität to main gender selection for 'ich'
                if (state.geschlechtsidentitaet !== undefined) {
                    var primaryGeschlecht = TiageState.getPrimaryGeschlecht('ich');
                    if (primaryGeschlecht) {
                        var secondaryValue = mapGeschlechtsidentitaetToSecondary(
                            parseInt(state.geschlechtsidentitaet, 10),
                            primaryGeschlecht
                        );
                        TiageState.setSecondaryGeschlecht('ich', secondaryValue);
                        console.log('Geschlechtsidentität angewendet:', primaryGeschlecht, '→', secondaryValue);

                        // Update UI: trigger geschlecht grid update
                        if (typeof updateGeschlechtGrid === 'function') {
                            updateGeschlechtGrid('ich');
                        }
                    }
                }
            }

            // Close modal
            closeProfileReviewModal();

            // Update score display after profile changes
            if (typeof updateComparisonView === 'function') {
                updateComparisonView();
            }

            // Optional: Show success message
            // alert('Profil gespeichert! ' + profileReviewChangesCount + ' Änderungen übernommen.');
        }
        window.saveProfileReview = saveProfileReview;

        // Close modal on ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeProfileReviewInfoModal();
                closeProfileReviewModal();
            }
        });

        console.log('All modal functions are now globally available');

        // ═══════════════════════════════════════════════════════════════
        // DEBUG: Element Inspector - Click to log element path & styles
        // ═══════════════════════════════════════════════════════════════
        (function initDebugger() {
            function getElementPath(el) {
                const path = [];
                while (el && el.nodeType === 1) {
                    let selector = el.tagName.toLowerCase();
                    if (el.id) {
                        selector += '#' + el.id;
                    } else if (el.className && typeof el.className === 'string') {
                        const classes = el.className.trim().split(/\s+/).filter(c => c);
                        if (classes.length) selector += '.' + classes.join('.');
                    }
                    path.unshift(selector);
                    el = el.parentElement;
                }
                return path.join(' > ');
            }

            function getAppliedStyles(el) {
                const computed = window.getComputedStyle(el);
                return {
                    display: computed.display,
                    flexDirection: computed.flexDirection,
                    gridTemplateColumns: computed.gridTemplateColumns,
                    padding: computed.padding,
                    background: computed.background,
                    borderLeft: computed.borderLeft
                };
            }

            document.addEventListener('click', function(e) {
                const el = e.target;
                const path = getElementPath(el);
                const styles = getAppliedStyles(el);

                console.group('%c🔍 DEBUG: Element clicked', 'color: #8B5CF6; font-weight: bold;');
                console.log('%c📍 Path:', 'color: #22c55e;', path);
                console.log('%c🏷️ Tag:', 'color: #3b82f6;', el.tagName);
                console.log('%c🆔 ID:', 'color: #f59e0b;', el.id || '(none)');
                console.log('%c📋 Classes:', 'color: #ec4899;', el.className || '(none)');
                console.log('%c🎨 Styles:', 'color: #14b8a6;', styles);
                console.log('%c📦 Element:', 'color: #6366f1;', el);
                console.groupEnd();
            }, true);

            console.log('%c🐛 DEBUG MODE ACTIVE - Click any element to inspect', 'background: #8B5CF6; color: white; padding: 4px 8px; border-radius: 4px;');
        })();

