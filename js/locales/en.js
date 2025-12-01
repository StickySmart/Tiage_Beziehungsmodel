/**
 * ENGLISH TRANSLATIONS
 *
 * All UI texts for the English language version.
 *
 * © 2025 Ti-age.de All rights reserved.
 */

const TiageLocale_EN = {
    code: 'en',
    name: 'English',

    // ═══════════════════════════════════════════════════════════════════════
    // GENERAL UI TEXTS
    // ═══════════════════════════════════════════════════════════════════════

    ui: {
        title: 'The Anarchic Ti-Age Principle of Pairing',
        subtitle: 'Swipe',
        help: 'Help',
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        send: 'Send',
        back: 'Back',
        next: 'Next',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',

        // Person Labels
        ich: 'ME',
        partner: 'PARTNER',

        // Status
        gelebt: 'Living',
        interessiert: 'Interested',

        // Navigation
        page: 'Page',
        of: 'of'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CATEGORIES
    // ═══════════════════════════════════════════════════════════════════════

    categories: {
        A: 'Relationship Philosophy',
        B: 'Value Alignment',
        C: 'Closeness-Distance',
        D: 'Autonomy',
        E: 'Communication',
        F: 'Social Compatibility'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANCE
    // ═══════════════════════════════════════════════════════════════════════

    dominanz: {
        label: 'Dominance Preference',
        types: {
            dominant: 'Dominant',
            submissiv: 'Submissive',
            switch: 'Switch',
            ausgeglichen: 'Balanced'
        },
        short: {
            dominant: 'Dom',
            submissiv: 'Sub',
            switch: 'Swi',
            ausgeglichen: 'Bal'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTATION
    // ═══════════════════════════════════════════════════════════════════════

    orientierung: {
        label: 'Sexual Orientation',
        types: {
            heterosexuell: 'Heterosexual',
            homosexuell: 'Homosexual',
            bisexuell: 'Bisexual'
        },
        short: {
            heterosexuell: 'Hetero',
            homosexuell: 'Homo',
            bisexuell: 'Bi'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NVC COMPETENCE (Nonviolent Communication)
    // ═══════════════════════════════════════════════════════════════════════

    gfk: {
        label: 'NVC Competence',
        levels: {
            niedrig: 'Low',
            mittel: 'Medium',
            hoch: 'High'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENDER
    // ═══════════════════════════════════════════════════════════════════════

    geschlecht: {
        label: 'Gender Identity',
        types: {
            cis_mann: 'Cis Man',
            cis_frau: 'Cis Woman',
            trans_mann: 'Trans Man',
            trans_frau: 'Trans Woman',
            nonbinaer: 'Non-binary',
            genderfluid: 'Genderfluid',
            agender: 'Agender',
            intersex: 'Intersex',
            divers: 'Diverse'
        },
        short: {
            cis_mann: 'CM',
            cis_frau: 'CW',
            trans_mann: 'TM',
            trans_frau: 'TW',
            nonbinaer: 'NB',
            genderfluid: 'GF',
            agender: 'AG',
            intersex: 'IS',
            divers: 'DI'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TOOLTIPS
    // ═══════════════════════════════════════════════════════════════════════

    tooltips: {
        geschlecht: {
            title: 'Gender Identity',
            text: 'Your gender identity. This affects compatibility together with sexual orientation.'
        },
        cis_mann: {
            title: 'Cis Man',
            text: 'Person who was assigned male at birth and identifies as a man.'
        },
        cis_frau: {
            title: 'Cis Woman',
            text: 'Person who was assigned female at birth and identifies as a woman.'
        },
        trans_mann: {
            title: 'Trans Man',
            text: 'Person who identifies as a man but was not assigned male at birth.'
        },
        trans_frau: {
            title: 'Trans Woman',
            text: 'Person who identifies as a woman but was not assigned female at birth.'
        },
        nonbinaer: {
            title: 'Non-binary',
            text: 'Person who does not identify exclusively as a man or a woman.'
        },
        genderfluid: {
            title: 'Genderfluid',
            text: 'Person whose gender identity changes over time or shifts between different identities.'
        },
        agender: {
            title: 'Agender',
            text: 'Person who does not identify with any gender or feels genderless.'
        },
        intersex: {
            title: 'Intersex',
            text: 'Person with innate physical sex characteristics that are not clearly male or female.'
        },
        divers: {
            title: 'Diverse',
            text: 'Official third gender entry in Germany for people who do not identify as male or female.'
        },
        dominanz: {
            title: 'Dominance Preference',
            text: 'What role do you prefer in the emotional and practical relationship dynamic?'
        },
        orientierung: {
            title: 'Sexual Orientation',
            text: 'To which gender are you romantically and/or sexually attracted?'
        },
        status: {
            title: 'Orientation Status',
            text: 'Living: You live this orientation and are sure about it.\n\nInterested: You are curious or in an exploration phase.'
        },
        dominanzStatus: {
            title: 'Dominance Status',
            text: 'Living: You know your dominance preference and live it actively.\n\nInterested: You are still exploring.'
        },
        dominant: {
            title: 'Dominant',
            text: 'The Leader - You enjoy taking leadership and responsibility in relationships.'
        },
        submissiv: {
            title: 'Submissive',
            text: 'The Follower - You enjoy being led and trust your partner.'
        },
        switch: {
            title: 'Switch',
            text: 'The Flexible - You enjoy both roles depending on the situation and partner.'
        },
        ausgeglichen: {
            title: 'Balanced',
            text: 'The Centered - You prefer an equal dynamic without fixed roles.'
        },
        heterosexuell: {
            title: 'Heterosexual',
            text: 'Attraction to the opposite gender.'
        },
        homosexuell: {
            title: 'Homosexual',
            text: 'Attraction to the same gender.'
        },
        bisexuell: {
            title: 'Bisexual',
            text: 'Attraction to both genders.'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPES
    // ═══════════════════════════════════════════════════════════════════════

    archetypes: {
        single: {
            name: 'Single',
            shortDef: 'Conscious choice for an autonomous life without a primary relationship as a permanent lifestyle.',
            longDef: 'Single-oriented people have actively chosen a life without a permanent romantic partnership. This is not a transitional phase ("between relationships"), but a conscious lifestyle that sees self-sufficiency and personal autonomy as central values. Social contacts, friendships, and occasional romantic/sexual encounters are possible, but no permanent partnership is sought.',
            keyPrinciples: [
                'Self-sufficiency as a value, not a lack',
                'Personal autonomy over commitment',
                'Relationships as an option, not a necessity',
                'Fulfillment through self, friends, projects'
            ],
            notTheSameAs: [
                '"Between relationships"',
                '"Haven\'t found the right one yet"',
                'Unable to commit or fear of attachment',
                'Lonely or unhappy'
            ],
            variants: [
                'Aromantic-Single: No romantic feelings, no need for them',
                'Consciously-autonomous: Positive choice for freedom',
                'Relationship-critical: Prefers independence'
            ]
        },
        duo: {
            name: 'Duo',
            shortDef: 'Traditional monogamous partnership with exclusivity and shared life design.',
            longDef: 'Duo-oriented people live in or seek a classic two-person relationship with romantic and sexual exclusivity. The partnership is at the center of life design and is understood as the primary emotional and social unit. Common goals, everyday life, and future planning are designed as a couple.',
            keyPrinciples: [
                'Exclusivity as an expression of commitment',
                "'We' as the central unit over 'I'",
                'Depth through focus on one person',
                'Shared life design and future planning',
                'Fidelity as emotional and sexual exclusivity'
            ],
            notTheSameAs: [
                'Possessiveness or control',
                'Loss of own identity',
                '"Old" or "outdated" relationship form',
                'Boring or unfulfilling'
            ],
            variants: [
                'Traditional-Duo: Classic marriage model',
                'Modern-Duo: Without marriage certificate, more flexible roles',
                'Intensive-Duo: Very close emotional merging'
            ]
        },
        duo_flex: {
            name: 'Duo-Flex',
            shortDef: 'Primary partnership with agreed openings for additional contacts.',
            longDef: 'Duo-Flex-oriented people live in a main relationship with a primary partner, but consciously and consensually open it for additional contacts. The primary relationship remains central and privileged. All openings are transparent and according to jointly agreed rules.',
            keyPrinciples: [
                'Primary relationship as anchor and priority',
                'Sexual/romantic variety without giving up hierarchy',
                'Honesty and transparency about all contacts',
                'Rules protect the main relationship',
                'Freedom within agreed boundaries'
            ],
            notTheSameAs: [
                'Infidelity or cheating (everything is agreed!)',
                '"Saving relationship" through opening',
                'Lack of commitment',
                'Transition phase to polyamory'
            ],
            variants: [
                'Swinging/Lifestyle: Shared sexual experiences',
                'Open Relationship: Individual sexual freedom',
                'Hierarchical Poly: Primary partner + secondary relationships'
            ]
        },
        solopoly: {
            name: 'Solopoly',
            shortDef: 'Multiple equal relationships while consciously preserving own autonomy.',
            longDef: 'Solopoly-oriented people have multiple romantic and/or sexual relationships in parallel, without prioritizing any of them as a "main relationship". Personal autonomy is at the center: No moving in together, no shared household management. "I am my own primary partner".',
            keyPrinciples: [
                'Autonomy as the highest value - even in relationships',
                'Multiple equal relationships without hierarchy',
                'No merging or shared households',
                "'I am my own primary partner'",
                'Love without giving up independence'
            ],
            notTheSameAs: [
                'Fear of commitment or commitment problems',
                '"Light version" of polyamory',
                'Selfish or unable to have relationships',
                'Intermediate stage to "real" partnership'
            ],
            variants: [
                'Strongly-autonomous: Very clear boundaries',
                'Relationship-balanced: Deep relationships, separate homes',
                'Network-oriented: Many equal connections'
            ]
        },
        polyamor: {
            name: 'Polyamorous',
            shortDef: 'Multiple simultaneous, ethically conducted love relationships with transparency.',
            longDef: 'Polyamorous people live multiple romantic relationships simultaneously, all with the knowledge and consent of everyone involved. Unlike Duo-Flex, there is often no clear hierarchy - all relationships can be equally important.',
            keyPrinciples: [
                'Love is not limited or exclusive',
                'Honesty and transparency towards everyone',
                'Consent and agreement as the basis',
                'Communication as a central skill',
                'Each relationship has its own value'
            ],
            notTheSameAs: [
                'Cheating or secrecy',
                '"Wanting to have everything"',
                'Unable to commit',
                'Just about sex'
            ],
            variants: [
                'Kitchen-Table-Poly: All partners know and like each other',
                'Parallel-Poly: Relationships exist separately',
                'Polycule: Network of interconnected relationships'
            ]
        },
        ra: {
            name: 'RA (Relationship Anarchist)',
            shortDef: 'Relationship Anarchist - Rejection of all relationship hierarchies and labels.',
            longDef: 'Relationship Anarchists radically question all societal relationship norms. No relationship is "higher" than another - friendships can be just as important as romantic relationships. Each connection is individually defined, without external templates.',
            keyPrinciples: [
                'No hierarchies between relationship types',
                'Each relationship is individually defined',
                'Rejection of societal relationship norms',
                'Autonomy as the highest value',
                'No ownership claims on other people'
            ],
            notTheSameAs: [
                'Unable to have relationships or fear of attachment',
                'Chaotic or without rules',
                'Irresponsible',
                'Against commitment in general'
            ],
            variants: [
                'Anarchically-networked: Many equal connections',
                'Philosophically-RA: Deep reflection on norms',
                'Pragmatically-RA: Flexible application of principles'
            ]
        },
        lat: {
            name: 'LAT',
            shortDef: 'Living Apart Together - Committed partnership without living together.',
            longDef: 'LAT-oriented people desire deep, committed relationships, but with clear spatial and everyday autonomy. Their own four walls are not a sign of distance, but of healthy self-care.',
            keyPrinciples: [
                'Love needs no shared roof',
                'Own retreat space is essential',
                'Quality time over quantity',
                'Autonomy in everyday life',
                'Conscious choice for closeness'
            ],
            notTheSameAs: [
                'Long-distance relationship (unwanted distance)',
                'Transitional phase before moving in together',
                'Fear of commitment',
                '"Not taking the relationship seriously"'
            ],
            variants: [
                'Nearby-LAT: Living close by, but separate',
                'Weekend-LAT: Together on weekends, separate during the week',
                'Flexible-LAT: Varying amounts of time together'
            ]
        },
        aromantisch: {
            name: 'Aromantic',
            shortDef: 'Focus on platonic connections without romantic component.',
            longDef: 'Aromantic people feel little or no romantic attraction. They can still have deep, meaningful relationships - just without the romantic component. Friendship, family, and other connections are just as valuable.',
            keyPrinciples: [
                'Deep connections without romance',
                'Friendship as an equal relationship model',
                'Authenticity beyond romantic norms',
                'Platonic love as a complete connection',
                'Self-worth independent of romantic relationships'
            ],
            notTheSameAs: [
                'Cold or emotionless',
                'Unable to love',
                'Asexual (that\'s a different spectrum)',
                'Just haven\'t found the right person'
            ],
            variants: [
                'Fully-Aromantic: No romantic attraction at all',
                'Grayromantic: Rarely romantic attraction',
                'Queerplatonic: Deep, committed non-romantic partnerships'
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HELP MODAL
    // ═══════════════════════════════════════════════════════════════════════

    help: {
        title: 'Help & Documentation',
        quickGuide: 'Quick Guide',
        quickGuideSteps: [
            'Choose your relationship archetype (ME)',
            'Choose your partner\'s archetype',
            'Click on categories for details',
            'Use filters for specific analyses'
        ],
        sections: {
            archetypes: 'Understanding Archetypes',
            categories: 'Categories Explained',
            compatibility: 'Compatibility',
            tips: 'Tips'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COMMENTS SECTION
    // ═══════════════════════════════════════════════════════════════════════

    comments: {
        title: 'Comments',
        send: 'Send Comment',
        viewAll: 'View All Comments',
        placeholder: 'Your comment...',
        author: 'Name (optional)',
        type: 'Type',
        types: {
            feedback: 'Feedback',
            fehler: 'Report Bug',
            frage: 'Question',
            verbesserung: 'Suggestion',
            doku: 'Documentation'
        },
        search: 'Search comments...',
        noComments: 'No comments yet.',
        reply: 'Reply'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALIDATION / ERROR MESSAGES
    // ═══════════════════════════════════════════════════════════════════════

    validation: {
        missingDimensions: 'Please fill in all required fields:',
        missingGeschlecht: 'Gender',
        missingDominanz: 'Dominance',
        missingOrientierung: 'Orientation'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AGE VERIFICATION
    // ═══════════════════════════════════════════════════════════════════════

    ageVerification: {
        title: 'Age Verification',
        description: 'This site contains content about relationship models and is intended only for persons aged 18 and over.',
        question: 'Are you at least 18 years old?',
        confirm: 'Yes, I am 18+',
        deny: 'No, I am under 18',
        required: 'This site is only accessible to adults (18+).',
        termsIntro: 'By clicking "Yes" you confirm that you:',
        termsAge: 'are of legal age (at least 18 years old)',
        termsAccept: 'accept the',
        termsLinkText: 'Terms of Use and Privacy Policy',
        termsCopyright: 'acknowledge that all content is protected by copyright',
        termsPersonal: 'will use the content only for personal, non-commercial purposes'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPE INFO MODAL
    // ═══════════════════════════════════════════════════════════════════════

    archetypeModal: {
        swipeHint: '← Swipe to navigate →',
        keyPrinciples: 'Key Principles',
        notTheSameAs: 'This is NOT',
        variants: 'Variants',
        pathosLogos: 'Pathos & Logos',
        pathosLabel: 'Pathos (Emotional Level)',
        logosLabel: 'Logos (Rational Level)',
        confirmSelection: 'Confirm Selection',
        definition: 'Definition'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SYNTHESIS / RESULTS
    // ═══════════════════════════════════════════════════════════════════════

    synthesis: {
        title: 'Relationship Synthesis',
        compatibility: 'Compatibility',
        strengths: 'Strengths',
        challenges: 'Challenges',
        recommendations: 'Recommendations',
        overall: 'Overall Rating',
        details: 'Show Details'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HARD-KO TEXTS (Friendly, not aggressive)
    // ═══════════════════════════════════════════════════════════════════════

    hardKO: {
        title: 'Not a match',
        subtitle: 'This combination has no romantic basis',

        // Friendly explanations by reason
        reasons: {
            hetero_same_gender: 'Both are looking for someone of the opposite gender',
            homo_different_gender: 'Both are looking for someone of the same gender',
            hetero_male_lesbian_female: 'He is looking for women, she is looking for women',
            lesbian_female_hetero_male: 'She is looking for women, he is looking for women',
            hetero_female_homo_male: 'She is looking for men, he is looking for men',
            homo_male_hetero_female: 'He is looking for men, she is looking for men'
        },

        // Positive alternative
        friendship: 'But a deep friendship is possible!',

        // Philosophical note
        philosophy: 'Physical attraction needs a shared direction.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DIMENSION LABELS
    // ═══════════════════════════════════════════════════════════════════════

    dimensions: {
        geschlechtLabel: 'Gender Identity',
        dominanzLabel: 'Dominance',
        orientierungLabel: 'Orientation',
        gfkLabel: 'NVC Competence',
        multiSelect: '(Multi-select)',
        legend: {
            identity: 'I',
            secondary: 'S',
            identityFull: 'Identity',
            secondaryFull: 'Secondary'
        },
        gfkLevels: {
            niedrig: 'low',
            mittel: 'medium',
            hoch: 'high'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEEDS / BEDÜRFNISSE
    // ═══════════════════════════════════════════════════════════════════════

    needs: {
        matchLabel: 'Needs Match',
        sharedTitle: 'SHARED NEEDS',
        differentTitle: 'DIFFERENT PRIORITIES',
        valuesTitle: 'SHARED VALUES'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COLUMN HEADERS
    // ═══════════════════════════════════════════════════════════════════════

    columns: {
        you: 'YOU',
        partner: 'PARTNER',
        previousArchetype: 'Previous archetype',
        nextArchetype: 'Next archetype',
        info: 'INFO',
        archetypeInfo: 'Archetype info'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ANALYSIS OVERVIEW
    // ═══════════════════════════════════════════════════════════════════════

    analysisOverview: {
        youA: 'You:'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FOLD/UNFOLD
    // ═══════════════════════════════════════════════════════════════════════

    foldUnfold: {
        fold: 'Fold',
        unfold: 'Unfold',
        foldAll: 'Fold all',
        unfoldAll: 'Unfold all'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // IMPRESSUM
    // ═══════════════════════════════════════════════════════════════════════

    impressum: {
        title: 'Legal Notice',
        operator: 'Operator',
        project: 'Project',
        contact: 'Contact'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENDER INFO MODAL
    // ═══════════════════════════════════════════════════════════════════════

    genderInfoModal: {
        title: 'Gender Identities',
        howItWorks: 'How selection works:',
        firstClick: '1st click',
        primaryIdentity: 'Primary Identity (I)',
        secondClick: '2nd click',
        secondaryIdentity: 'Secondary Identity (S)',
        thirdClick: '3rd click',
        deselect: 'Deselect',
        understood: 'Got it'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HELP MODAL EXTENDED
    // ═══════════════════════════════════════════════════════════════════════

    helpModal: {
        title: 'Help & Documentation',
        quickGuideTitle: 'Quick Guide',
        quickGuideItems: [
            '<strong>My Type</strong> = Your archetype + properties (orientation, dominance, gender)',
            '<strong>Relationship Quality</strong> = Partner archetype + properties and compatibility calculation',
            '<strong>Living</strong> = What you actively live / <strong>Interested</strong> = What you are open to',
            '<strong>INFO</strong> button = Details about the selected archetype',
            '<strong>Result</strong> = Automatic calculation of compatibility (4 factors)',
            'Click <strong>percentages</strong> = Detailed explanation per factor'
        ],
        newInVersion: 'New in Version 1.4',
        newFeatures: [
            '<strong>Living/Interested:</strong> Choose for each property whether you actively live it or just have interest',
            '<strong>Auto-Collapse:</strong> Orientation and dominance sections close automatically after selection',
            '<strong>Improved error messages:</strong> Missing fields are listed clearly',
            '<strong>Mobile Navigation:</strong> New navigation buttons in modals for better usability',
            '<strong>Circular Score Display:</strong> Compatibility values are displayed more visually appealing'
        ],
        feedbackPrompt: 'Questions, feedback or suggestions?',
        sendComment: 'Send Comment',
        viewAllComments: 'All Comments',
        documentation: 'Documentation'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SYNTHESIS SECTION
    // ═══════════════════════════════════════════════════════════════════════

    synthesisSection: {
        bringtMit: 'BRINGS',
        darausEntsteht: 'CREATES',
        gemeinsameBeduerfnisse: 'Shared Needs',
        philosophischeGrundlagen: 'Philosophical Foundations',
        pathos: 'Pathos',
        logos: 'Logos',
        staerken: 'Strengths',
        herausforderungen: 'Challenges',
        wachstumspotential: 'Growth Potential',
        beduerfnisUebereinstimmung: 'Need Compatibility',
        unterschiedlichePrioritaeten: 'Different Priorities'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FOOTER
    // ═══════════════════════════════════════════════════════════════════════

    footer: {
        datenschutz: 'Privacy Policy',
        nutzungsbedingungen: 'Terms of Use',
        impressum: 'Legal Notice',
        copyright: 'All rights reserved',
        rechtliches: 'Legal'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GFK NEEDS (Nonviolent Communication)
    // ═══════════════════════════════════════════════════════════════════════

    needs: {
        // Categories
        categories: {
            existenz: 'Existence',
            sicherheit: 'Safety',
            zuneigung: 'Affection',
            verstaendnis: 'Understanding',
            freiheit: 'Freedom',
            teilnahme: 'Participation',
            musse: 'Leisure',
            identitaet: 'Identity & Meaning',
            erschaffen: 'Creation',
            verbundenheit: 'Connection'
        },

        // Individual needs
        items: {
            // EXISTENCE
            luft: 'Air',
            wasser: 'Water',
            nahrung: 'Food',
            bewegung: 'Movement/Activity',
            beruehrung: 'Touch/Physical Contact',
            erholung: 'Rest/Sleep',
            sexueller_ausdruck: 'Sexual Expression',
            sicherheit_physisch: 'Physical Safety',
            unterschlupf: 'Shelter',

            // SAFETY
            bestaendigkeit: 'Consistency',
            sich_sicher_fuehlen: 'Feeling Safe',
            schutz: 'Protection',
            stabilitaet: 'Stability',
            leichtigkeit: 'Ease',
            geborgenheit: 'Security',

            // AFFECTION
            waerme: 'Warmth',
            wertschaetzung: 'Appreciation',
            naehe: 'Closeness',
            gesellschaft: 'Companionship',
            intimitaet: 'Intimacy',
            liebe: 'Love',
            fuersorge: 'Care',
            unterstuetzung: 'Support',
            fuereinander_da_sein: 'Being There for Each Other',

            // UNDERSTANDING
            akzeptanz: 'Acceptance',
            mitgefuehl: 'Compassion',
            beruecksichtigung: 'Consideration',
            empathie: 'Empathy',
            vertrauen: 'Trust',
            beachtung: 'Attention',
            gesehen_werden: 'Being Seen',
            verstanden_werden: 'Being Understood',
            harmonie: 'Harmony',

            // FREEDOM
            selbstbestimmung: 'Self-Determination',
            waehlen_koennen: 'Choice',
            unabhaengigkeit: 'Independence',
            raum_haben: 'Having Space',
            spontaneitaet: 'Spontaneity',

            // PARTICIPATION
            zusammenarbeit: 'Collaboration',
            kommunikation: 'Communication',
            gemeinschaft: 'Community',
            zugehoerigkeit: 'Belonging',
            gegenseitigkeit: 'Mutuality',
            respekt: 'Respect',
            bedeutung_haben: 'Significance',

            // LEISURE
            schoenheit: 'Beauty',
            freizeit: 'Leisure Time',
            freude: 'Joy',
            humor: 'Humor',

            // IDENTITY
            authentizitaet: 'Authenticity',
            echtheit: 'Genuineness',
            integritaet: 'Integrity',
            praesenz: 'Presence',
            ordnung: 'Order',
            bewusstheit: 'Awareness',
            herausforderung: 'Challenge',
            klarheit: 'Clarity',
            kompetenz: 'Competence',
            effizienz: 'Efficiency',
            wirksamkeit: 'Effectiveness',
            wachstum: 'Growth',
            sinn: 'Meaning',
            beitrag_leisten: 'Contributing',

            // CREATION
            kreativitaet: 'Creativity',
            entdecken: 'Discovery',
            lernen: 'Learning',
            selbst_ausdruck: 'Self-Expression',
            anreize_bekommen: 'Stimulation',

            // CONNECTION
            leben_feiern: 'Celebrating Life',
            inspiration: 'Inspiration',
            trauer_ausdruecken: 'Expressing Grief',
            einsehen: 'Insight',
            anfang_ende: 'Beginning & End'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_EN;
}
