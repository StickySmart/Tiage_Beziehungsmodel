/**
 * RESONANCE QUOTES TABLE STRUCTURE
 * =================================
 * Strukturierte Tabelle für Resonanz-Textgenerierung
 * mit öffentlichen Zitaten aus Pirsig und Osho
 *
 * Basierend auf dem Screenshot "Hohe Resonanz – Muster ergänzen sich"
 * Kategorie: CREATIVITY
 *
 * Struktur:
 * - resonanceLevel: Stufe der Resonanz (hoch, mittel, niedrig)
 * - category: Thematische Kategorie (z.B. CREATIVITY, GROWTH, etc.)
 * - quotes: Öffentliche Zitate von Pirsig, Osho und Sprichwörter
 * - keywords: Stichwörter für die Textgenerierung
 * - generatedPatterns: Muster für die Textgenerierung
 */

const ResonanceQuotesTable = {

    // ═══════════════════════════════════════════════════════════════════════════
    // META-INFORMATION
    // ═══════════════════════════════════════════════════════════════════════════

    version: "1.0.0",
    lastUpdate: "2025-12-08",
    sources: {
        pirsig: "Robert M. Pirsig - Zen und die Kunst ein Motorrad zu warten (1974), Lila (1991)",
        osho: "Osho - Gesammelte Werke und öffentliche Vorträge",
        sprichwoerter: "Eigene Datenbank - Ti-Age Beziehungsmodell"
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // PIRSIG ZITATE (Öffentlich - Metaphysik der Qualität)
    // ═══════════════════════════════════════════════════════════════════════════

    pirsigQuotes: {
        // Dynamische Qualität - Kreativität, Wachstum, Veränderung
        dynamicQuality: [
            {
                id: "P001",
                de: "Qualität ist das Ereignis, bei dem das Subjekt sich des Objekts bewusst wird.",
                en: "Quality is the event at which the subject becomes aware of the object.",
                category: ["CREATIVITY", "AWARENESS"],
                resonanceLevel: "hoch",
                keywords: ["Bewusstsein", "Wahrnehmung", "Qualität", "Ereignis"]
            },
            {
                id: "P002",
                de: "Die Wahrheit klopft an die Tür und du sagst: 'Geh weg, ich suche nach der Wahrheit.' Und sie geht weg.",
                en: "The truth knocks on the door and you say, 'Go away, I'm looking for the truth,' and so it goes away.",
                category: ["AWARENESS", "GROWTH"],
                resonanceLevel: "hoch",
                keywords: ["Wahrheit", "Suche", "Paradox", "Erkenntnis"]
            },
            {
                id: "P003",
                de: "Der einzige Zen, den du auf dem Gipfel des Berges findest, ist der Zen, den du mitbringst.",
                en: "The only Zen you find on the tops of mountains is the Zen you bring up there.",
                category: ["GROWTH", "SELF"],
                resonanceLevel: "hoch",
                keywords: ["Zen", "Selbst", "Innere Arbeit", "Wachstum"]
            },
            {
                id: "P004",
                de: "Wir nehmen eine Handvoll Sand von der endlosen Landschaft der Wahrnehmung und nennen diese Handvoll Welt.",
                en: "We take a handful of sand from the endless landscape of awareness and call that handful the world.",
                category: ["AWARENESS", "PERCEPTION"],
                resonanceLevel: "mittel",
                keywords: ["Wahrnehmung", "Welt", "Begrenztheit", "Perspektive"]
            },
            {
                id: "P005",
                de: "Wenn du dich eins mit der Welt fühlst, bist du wirklich zufrieden.",
                en: "When you feel at one with the world, you are truly satisfied.",
                category: ["RESONANCE", "UNITY"],
                resonanceLevel: "hoch",
                keywords: ["Einheit", "Zufriedenheit", "Verbundenheit", "Resonanz"]
            }
        ],

        // Statische Qualität - Stabilität, Struktur, Werte
        staticQuality: [
            {
                id: "P006",
                de: "Frieden des Geistes entsteht nicht durch Kontrolle der äußeren Welt.",
                en: "Peace of mind doesn't come from controlling the outside world.",
                category: ["INNER_PEACE", "CONTROL"],
                resonanceLevel: "mittel",
                keywords: ["Frieden", "Kontrolle", "Innenwelt", "Gelassenheit"]
            },
            {
                id: "P007",
                de: "Um mit Qualität zu arbeiten, musst du sowohl den romantischen als auch den klassischen Weg verstehen.",
                en: "To work with Quality you have to understand both the romantic and classical way.",
                category: ["BALANCE", "UNDERSTANDING"],
                resonanceLevel: "hoch",
                keywords: ["Qualität", "Balance", "Romantisch", "Klassisch", "Pathos", "Logos"]
            },
            {
                id: "P008",
                de: "Technologie ist die Fusion von Natur und Geist des Menschen zu einer neuen Art der Schöpfung.",
                en: "Technology is the fusion of nature and the human spirit into a new kind of creation.",
                category: ["CREATIVITY", "SYNTHESIS"],
                resonanceLevel: "mittel",
                keywords: ["Technologie", "Natur", "Geist", "Schöpfung", "Synthese"]
            }
        ],

        // Pathos vs. Logos - Emotionale vs. Rationale Qualität
        pathosLogos: [
            {
                id: "P009",
                de: "Der romantische Modus sieht hauptsächlich auf der Oberfläche. Er ist inspirierend, imaginativ, kreativ, intuitiv.",
                en: "The romantic mode is primarily inspirational, imaginative, creative, intuitive.",
                category: ["CREATIVITY", "PATHOS"],
                resonanceLevel: "hoch",
                keywords: ["Romantisch", "Inspiration", "Imagination", "Kreativität", "Intuition", "Pathos"]
            },
            {
                id: "P010",
                de: "Der klassische Modus geht unter die Oberfläche hinaus. Er ist methodisch, analytisch, strukturiert.",
                en: "The classic mode proceeds by reason and by laws.",
                category: ["ANALYSIS", "LOGOS"],
                resonanceLevel: "mittel",
                keywords: ["Klassisch", "Methodik", "Analyse", "Struktur", "Logos"]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // OSHO ZITATE (Öffentlich - Spirituelle Weisheit)
    // ═══════════════════════════════════════════════════════════════════════════

    oshoQuotes: {
        // Liebe und Beziehung
        loveRelationship: [
            {
                id: "O001",
                de: "Wenn du liebst, dann lass es ein Sein sein, nicht ein Tun.",
                en: "When you love, let it be a being, not a doing.",
                category: ["LOVE", "BEING"],
                resonanceLevel: "hoch",
                keywords: ["Liebe", "Sein", "Authentizität", "Präsenz"]
            },
            {
                id: "O002",
                de: "Liebe ist keine Beziehung. Liebe bezieht sich auf. Beziehung ist etwas Totes, Liebe ist eine lebendige Bewegung.",
                en: "Love is not a relationship. Love relates. Relationship is something dead, love is a living flow.",
                category: ["LOVE", "FLOW"],
                resonanceLevel: "hoch",
                keywords: ["Liebe", "Beziehung", "Bewegung", "Lebendigkeit", "Flow"]
            },
            {
                id: "O003",
                de: "Zwei Menschen, die sich wirklich lieben, helfen einander, freier zu werden.",
                en: "Two people who really love each other help each other to be more free.",
                category: ["LOVE", "FREEDOM"],
                resonanceLevel: "hoch",
                keywords: ["Liebe", "Freiheit", "Wachstum", "Gegenseitigkeit"]
            },
            {
                id: "O004",
                de: "Wahre Liebe erwartet nichts. Wahre Liebe ist bedingungslos.",
                en: "True love expects nothing. True love is unconditional.",
                category: ["LOVE", "UNCONDITIONAL"],
                resonanceLevel: "hoch",
                keywords: ["Liebe", "Bedingungslos", "Erwartung", "Reinheit"]
            }
        ],

        // Bewusstsein und Wachstum
        awarenessGrowth: [
            {
                id: "O005",
                de: "Sei realistisch: Plane ein Wunder.",
                en: "Be realistic: Plan for a miracle.",
                category: ["GROWTH", "POSSIBILITY"],
                resonanceLevel: "mittel",
                keywords: ["Realismus", "Wunder", "Möglichkeit", "Vision"]
            },
            {
                id: "O006",
                de: "Mut bedeutet, ins Unbekannte zu gehen trotz aller Ängste.",
                en: "Courage means going into the unknown in spite of all the fears.",
                category: ["COURAGE", "GROWTH"],
                resonanceLevel: "hoch",
                keywords: ["Mut", "Unbekannt", "Angst", "Wachstum"]
            },
            {
                id: "O007",
                de: "Meditation ist einfach: Sei ein Zeuge deiner Gedanken.",
                en: "Meditation is simple: just be a witness to your thoughts.",
                category: ["AWARENESS", "MEDITATION"],
                resonanceLevel: "mittel",
                keywords: ["Meditation", "Zeuge", "Gedanken", "Bewusstsein"]
            },
            {
                id: "O008",
                de: "Wenn das Ego schweigt, kann wahre Begegnung stattfinden.",
                en: "When the ego becomes silent, true encounter can happen.",
                category: ["RESONANCE", "EGO"],
                resonanceLevel: "hoch",
                keywords: ["Ego", "Stille", "Begegnung", "Resonanz", "Kommunikation"]
            }
        ],

        // Polarität und Gegensätze
        polarity: [
            {
                id: "O009",
                de: "Gegensätze ziehen sich an, weil sie einander ergänzen.",
                en: "Opposites attract because they complement each other.",
                category: ["POLARITY", "ATTRACTION"],
                resonanceLevel: "hoch",
                keywords: ["Gegensätze", "Anziehung", "Ergänzung", "Polarität"]
            },
            {
                id: "O010",
                de: "In der Spannung der Gegensätze liegt das Leben.",
                en: "In the tension of opposites lies life.",
                category: ["POLARITY", "LIFE"],
                resonanceLevel: "hoch",
                keywords: ["Spannung", "Gegensätze", "Leben", "Energie"]
            },
            {
                id: "O011",
                de: "Unterschiedlichkeit ist nicht das Problem – das Problem ist, Unterschiedlichkeit als Problem zu sehen.",
                en: "Difference is not the problem – the problem is seeing difference as a problem.",
                category: ["ACCEPTANCE", "DIFFERENCE"],
                resonanceLevel: "mittel",
                keywords: ["Unterschied", "Problem", "Akzeptanz", "Perspektive"]
            }
        ],

        // Kommunikation
        communication: [
            {
                id: "O012",
                de: "Wahre Kommunikation entsteht ohne Ego.",
                en: "True communication arises without ego.",
                category: ["COMMUNICATION", "EGO"],
                resonanceLevel: "hoch",
                keywords: ["Kommunikation", "Ego", "Wahrheit", "Verbindung"]
            },
            {
                id: "O013",
                de: "Zuhören ist die höchste Form des Respekts.",
                en: "Listening is the highest form of respect.",
                category: ["COMMUNICATION", "RESPECT"],
                resonanceLevel: "hoch",
                keywords: ["Zuhören", "Respekt", "Aufmerksamkeit", "Würdigung"]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SPRICHWÖRTER UND STICHWÖRTER (Eigene Daten)
    // ═══════════════════════════════════════════════════════════════════════════

    sprichwoerter: {
        // Resonanz und Verbindung
        resonanzVerbindung: [
            {
                id: "S001",
                de: "Gleich und Gleich gesellt sich gern.",
                en: "Birds of a feather flock together.",
                category: ["RESONANCE", "SIMILARITY"],
                resonanceLevel: "mittel",
                keywords: ["Ähnlichkeit", "Anziehung", "Gemeinsamkeit"]
            },
            {
                id: "S002",
                de: "Gegensätze ziehen sich an.",
                en: "Opposites attract.",
                category: ["POLARITY", "ATTRACTION"],
                resonanceLevel: "hoch",
                keywords: ["Gegensätze", "Anziehung", "Ergänzung"]
            },
            {
                id: "S003",
                de: "Wo zwei sich streiten, freut sich der Dritte.",
                en: "When two people quarrel, a third one profits.",
                category: ["CONFLICT", "PERSPECTIVE"],
                resonanceLevel: "niedrig",
                keywords: ["Streit", "Konflikt", "Perspektive"]
            },
            {
                id: "S004",
                de: "Vertrauen ist gut, Kontrolle ist besser.",
                en: "Trust is good, control is better.",
                category: ["TRUST", "CONTROL"],
                resonanceLevel: "niedrig",
                keywords: ["Vertrauen", "Kontrolle", "Sicherheit"]
            },
            {
                id: "S005",
                de: "Vertrauen schenken öffnet Türen.",
                en: "Giving trust opens doors.",
                category: ["TRUST", "OPENNESS"],
                resonanceLevel: "hoch",
                keywords: ["Vertrauen", "Offenheit", "Verbindung"]
            }
        ],

        // Grenzen und Respekt
        grenzenRespekt: [
            {
                id: "S006",
                de: "Grenzen respektieren schafft Freiheit.",
                en: "Respecting boundaries creates freedom.",
                category: ["BOUNDARIES", "FREEDOM"],
                resonanceLevel: "hoch",
                keywords: ["Grenzen", "Respekt", "Freiheit"]
            },
            {
                id: "S007",
                de: "Wer sich selbst nicht achtet, kann auch andere nicht achten.",
                en: "Those who don't respect themselves cannot respect others.",
                category: ["SELF_RESPECT", "RESPECT"],
                resonanceLevel: "mittel",
                keywords: ["Selbstachtung", "Respekt", "Würde"]
            },
            {
                id: "S008",
                de: "Jeder kehre vor seiner eigenen Tür.",
                en: "Everyone should sweep in front of their own door.",
                category: ["RESPONSIBILITY", "SELF"],
                resonanceLevel: "mittel",
                keywords: ["Verantwortung", "Selbst", "Eigenarbeit"]
            }
        ],

        // Wachstum und Entwicklung
        wachstumEntwicklung: [
            {
                id: "S009",
                de: "Aus Fehlern wird man klug.",
                en: "We learn from our mistakes.",
                category: ["GROWTH", "LEARNING"],
                resonanceLevel: "mittel",
                keywords: ["Fehler", "Lernen", "Wachstum", "Entwicklung"]
            },
            {
                id: "S010",
                de: "Rom wurde nicht an einem Tag erbaut.",
                en: "Rome wasn't built in a day.",
                category: ["PATIENCE", "GROWTH"],
                resonanceLevel: "mittel",
                keywords: ["Geduld", "Zeit", "Entwicklung", "Prozess"]
            },
            {
                id: "S011",
                de: "Was dich nicht umbringt, macht dich stärker.",
                en: "What doesn't kill you makes you stronger.",
                category: ["RESILIENCE", "GROWTH"],
                resonanceLevel: "hoch",
                keywords: ["Stärke", "Resilienz", "Wachstum"]
            }
        ],

        // Kommunikation
        kommunikation: [
            {
                id: "S012",
                de: "Reden ist Silber, Schweigen ist Gold.",
                en: "Speech is silver, silence is golden.",
                category: ["COMMUNICATION", "SILENCE"],
                resonanceLevel: "mittel",
                keywords: ["Reden", "Schweigen", "Kommunikation"]
            },
            {
                id: "S013",
                de: "Der Ton macht die Musik.",
                en: "It's not what you say, it's how you say it.",
                category: ["COMMUNICATION", "TONE"],
                resonanceLevel: "hoch",
                keywords: ["Ton", "Kommunikation", "Art und Weise"]
            },
            {
                id: "S014",
                de: "Wer fragt, gewinnt.",
                en: "Those who ask, win.",
                category: ["COMMUNICATION", "CURIOSITY"],
                resonanceLevel: "hoch",
                keywords: ["Fragen", "Neugier", "Kommunikation"]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STICHWÖRTER NACH KATEGORIE
    // ═══════════════════════════════════════════════════════════════════════════

    stichwoerter: {
        CREATIVITY: {
            primary: ["Kreativität", "Schöpfung", "Innovation", "Inspiration", "Imagination"],
            secondary: ["Flow", "Ausdruck", "Gestaltung", "Vision", "Originalität"],
            related: ["Kunst", "Musik", "Schreiben", "Design", "Erfindung"]
        },
        RESONANCE: {
            primary: ["Resonanz", "Schwingung", "Frequenz", "Harmonie", "Synchronizität"],
            secondary: ["Einklang", "Verbundenheit", "Anziehung", "Chemie", "Vibes"],
            related: ["Wellenlänge", "Matching", "Kompatibilität", "Passung"]
        },
        GROWTH: {
            primary: ["Wachstum", "Entwicklung", "Reifung", "Evolution", "Transformation"],
            secondary: ["Lernen", "Entfaltung", "Fortschritt", "Veränderung"],
            related: ["Potential", "Möglichkeit", "Zukunft", "Weg"]
        },
        LOVE: {
            primary: ["Liebe", "Zuneigung", "Verbundenheit", "Intimität", "Hingabe"],
            secondary: ["Zärtlichkeit", "Romantik", "Leidenschaft", "Fürsorge"],
            related: ["Herz", "Seele", "Beziehung", "Partner"]
        },
        TRUST: {
            primary: ["Vertrauen", "Sicherheit", "Verlässlichkeit", "Treue", "Loyalität"],
            secondary: ["Offenheit", "Ehrlichkeit", "Authentizität", "Integrität"],
            related: ["Glaube", "Zuversicht", "Stabilität"]
        },
        BOUNDARIES: {
            primary: ["Grenzen", "Raum", "Autonomie", "Selbstbestimmung"],
            secondary: ["Abgrenzung", "Schutz", "Respekt", "Klarheit"],
            related: ["Nein sagen", "Selbstfürsorge", "Eigenraum"]
        },
        COMMUNICATION: {
            primary: ["Kommunikation", "Dialog", "Austausch", "Gespräch"],
            secondary: ["Zuhören", "Verstehen", "Ausdrücken", "Mitteilen"],
            related: ["GFK", "Feedback", "Empathie", "Verbalisierung"]
        },
        POLARITY: {
            primary: ["Polarität", "Gegensätze", "Yin-Yang", "Dualität"],
            secondary: ["Spannung", "Anziehung", "Ergänzung", "Balance"],
            related: ["Männlich-Weiblich", "Aktiv-Passiv", "Geben-Nehmen"]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // RESONANZ-LEVEL DEFINITIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    resonanceLevels: {
        hoch: {
            range: "85-100%",
            title: {
                de: "Hohe Resonanz – Muster ergänzen sich",
                en: "High Resonance – Patterns complement each other"
            },
            description: {
                de: "Eine vielversprechende Resonanz entfaltet sich zwischen diesen beiden Seelen. Gegenseitiges Verständnis für die Komplexität des Modells.",
                en: "A promising resonance unfolds between these two souls. Mutual understanding of the model's complexity."
            },
            modifier: 1.1,
            color: "#FFD700"
        },
        mittel: {
            range: "50-84%",
            title: {
                de: "Mittlere Resonanz – Wachstumspotenzial",
                en: "Medium Resonance – Growth potential"
            },
            description: {
                de: "Gemeinsame Basis mit Entwicklungspotenzial. Die Unterschiede können Wachstum fördern.",
                en: "Common ground with development potential. Differences can foster growth."
            },
            modifier: 1.0,
            color: "#87CEEB"
        },
        niedrig: {
            range: "0-49%",
            title: {
                de: "Niedrige Resonanz – Herausforderung",
                en: "Low Resonance – Challenge"
            },
            description: {
                de: "Grundlegende Unterschiede erfordern bewusste Arbeit. Transformation ist möglich, aber erfordert Einsatz.",
                en: "Fundamental differences require conscious work. Transformation is possible but requires effort."
            },
            modifier: 0.9,
            color: "#CD853F"
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GENERIERTE MUSTER FÜR TEXTAUSGABE
    // ═══════════════════════════════════════════════════════════════════════════

    generatedPatterns: {
        // Muster für "Hohe Resonanz – Muster ergänzen sich" (Screenshot-Referenz)
        hocheResonanz: {
            template: {
                de: `"{quoteText}"

{mainDescription}

Eure Dynamik entfaltet sich durch {keyword1} und {keyword2}.`,
                en: `"{quoteText}"

{mainDescription}

Your dynamics unfold through {keyword1} and {keyword2}.`
            },
            placeholders: {
                quoteText: "Zitat aus Pirsig/Osho/Sprichwörter",
                mainDescription: "Hauptbeschreibung der Resonanz",
                keyword1: "Erstes Stichwort (z.B. Grenzen respektieren)",
                keyword2: "Zweites Stichwort (z.B. Vertrauen schenken)"
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Holt ein zufälliges Zitat basierend auf Kategorie und Resonanzlevel
     * @param {string} category - Die gewünschte Kategorie
     * @param {string} resonanceLevel - Das Resonanzlevel (hoch, mittel, niedrig)
     * @returns {Object} Ein passendes Zitat-Objekt
     */
    getQuoteByCategory: function(category, resonanceLevel = 'hoch') {
        const allQuotes = [
            ...Object.values(this.pirsigQuotes).flat(),
            ...Object.values(this.oshoQuotes).flat(),
            ...Object.values(this.sprichwoerter).flat()
        ];

        const filtered = allQuotes.filter(q =>
            q.category.includes(category) &&
            q.resonanceLevel === resonanceLevel
        );

        if (filtered.length === 0) {
            return allQuotes[Math.floor(Math.random() * allQuotes.length)];
        }

        return filtered[Math.floor(Math.random() * filtered.length)];
    },

    /**
     * Holt Stichwörter für eine Kategorie
     * @param {string} category - Die Kategorie
     * @returns {Array} Array von Stichwörtern
     */
    getKeywordsByCategory: function(category) {
        const cat = this.stichwoerter[category];
        if (!cat) return [];
        return [...cat.primary, ...cat.secondary];
    },

    /**
     * Generiert einen formatierten Text basierend auf Resonanzlevel
     * @param {string} resonanceLevel - Das Resonanzlevel
     * @param {string} category - Die Kategorie
     * @param {string} lang - Die Sprache ('de' oder 'en')
     * @returns {Object} Formatierter Text mit Zitat und Beschreibung
     */
    generateResonanceText: function(resonanceLevel, category, lang = 'de') {
        const level = this.resonanceLevels[resonanceLevel];
        const quote = this.getQuoteByCategory(category, resonanceLevel);
        const keywords = this.getKeywordsByCategory(category);

        return {
            title: level.title[lang],
            quote: quote[lang],
            quoteSource: quote.id.startsWith('P') ? 'Pirsig' :
                        quote.id.startsWith('O') ? 'Osho' : 'Sprichwort',
            description: level.description[lang],
            keywords: keywords.slice(0, 4),
            modifier: level.modifier,
            color: level.color
        };
    },

    /**
     * Erstellt eine Tabelle aller Zitate
     * @returns {Array} Array von Tabellenzeilen
     */
    toTable: function() {
        const table = [];

        // Header
        table.push(['ID', 'Quelle', 'Deutsch', 'English', 'Kategorien', 'Resonanz', 'Stichwörter']);

        // Pirsig
        Object.values(this.pirsigQuotes).flat().forEach(q => {
            table.push([q.id, 'Pirsig', q.de, q.en, q.category.join(', '), q.resonanceLevel, q.keywords.join(', ')]);
        });

        // Osho
        Object.values(this.oshoQuotes).flat().forEach(q => {
            table.push([q.id, 'Osho', q.de, q.en, q.category.join(', '), q.resonanceLevel, q.keywords.join(', ')]);
        });

        // Sprichwörter
        Object.values(this.sprichwoerter).flat().forEach(q => {
            table.push([q.id, 'Sprichwort', q.de, q.en, q.category.join(', '), q.resonanceLevel, q.keywords.join(', ')]);
        });

        return table;
    }
};

// Export für verschiedene Umgebungen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanceQuotesTable;
}

if (typeof window !== 'undefined') {
    window.ResonanceQuotesTable = ResonanceQuotesTable;
}
