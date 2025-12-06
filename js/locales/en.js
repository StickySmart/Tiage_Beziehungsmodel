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
            bisexuell: 'Bi-/Pansexual'
        },
        short: {
            heterosexuell: 'Hetero',
            homosexuell: 'Homo',
            bisexuell: 'Bi/Pan'
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
    // GENDER (Two-Dimensional System)
    // ═══════════════════════════════════════════════════════════════════════

    geschlecht: {
        label: 'Gender',
        primaryLabel: 'Body',
        secondaryLabel: 'Identity',
        primaryHint: 'Biological / assigned at birth',
        secondaryHint: 'How you feel',
        // Primary (Body)
        primary: {
            mann: 'Male',
            frau: 'Female',
            inter: 'Inter'
        },
        primaryShort: {
            mann: 'M',
            frau: 'F',
            inter: 'I'
        },
        // Secondary (Identity) - context-dependent on Primary
        secondary: {
            // For P = Male/Female
            cis: 'Cis',
            trans: 'Trans',
            // For P = Inter
            nonbinaer: 'Non-binary',
            fluid: 'Fluid',
            // Common
            unsicher: 'Uncertain',
            // Legacy
            mann: 'Man',
            frau: 'Woman'
        },
        secondaryShort: {
            cis: 'C',
            trans: 'T',
            nonbinaer: 'NB',
            fluid: 'FL',
            unsicher: '?',
            mann: 'M',
            frau: 'W'
        },
        // Expert mode: Detailed options
        detailed: {
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
        detailedShort: {
            cis_mann: 'CM',
            cis_frau: 'CW',
            trans_mann: 'TM',
            trans_frau: 'TW',
            nonbinaer: 'NB',
            genderfluid: 'GF',
            agender: 'AG',
            intersex: 'IX',
            divers: 'DI'
        },
        // Legacy (deprecated)
        types: {
            mann: 'Male',
            frau: 'Female',
            inter: 'Inter'
        },
        short: {
            mann: 'M',
            frau: 'F',
            inter: 'I'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TOOLTIPS
    // ═══════════════════════════════════════════════════════════════════════

    tooltips: {
        geschlecht: {
            title: 'Gender',
            text: 'Two dimensions: Body (biological) and Identity (how you feel). This affects compatibility together with sexual orientation.'
        },
        geschlecht_primary: {
            title: 'Body (Primary)',
            text: 'Your biological/assigned at birth sex.'
        },
        geschlecht_secondary: {
            title: 'Identity (Secondary)',
            text: 'How you feel inside and identify.'
        },
        primary_mann: {
            title: 'Male (Body)',
            text: 'Assigned male at birth.'
        },
        primary_frau: {
            title: 'Female (Body)',
            text: 'Assigned female at birth.'
        },
        primary_inter: {
            title: 'Inter (Body)',
            text: 'Innate physical sex characteristics that are not clearly male or female.'
        },
        secondary_mann: {
            title: 'Man (Identity)',
            text: 'You identify as a man.'
        },
        secondary_frau: {
            title: 'Woman (Identity)',
            text: 'You identify as a woman.'
        },
        secondary_nonbinaer: {
            title: 'Non-binary (Identity)',
            text: 'You do not identify exclusively as a man or a woman.'
        },
        secondary_fluid: {
            title: 'Fluid (Identity)',
            text: 'Your gender identity changes over time or shifts between different identities.'
        },
        secondary_unsicher: {
            title: 'Uncertain (Identity)',
            text: 'You are not yet sure about your gender identity or are in an exploration phase.'
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
            title: 'Bi-/Pansexual',
            text: 'Attraction to multiple or all genders, regardless of gender identity.'
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
            name: 'RA',
            shortDef: 'RA - Rejection of all relationship hierarchies and labels.',
            longDef: 'RAs radically question all societal relationship norms. No relationship is "higher" than another - friendships can be just as important as romantic relationships. Each connection is individually defined, without external templates.',
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
    // SOFT-KO TEXTS (Needs Conflicts)
    // ═══════════════════════════════════════════════════════════════════════

    softKO: {
        title: 'Challenging Combination',
        subtitle: 'Strong differences in core needs',

        // Explanations
        reasons: {
            needs_conflict: 'Your core needs differ significantly',
            dynamic_mismatch: 'The dynamic preferences are not optimal',
            values_gap: 'Different priorities in important values'
        },

        // Constructive note
        growth: 'With conscious communication, this can work.',

        // Need-specific
        conflictLabel: 'Conflict Potential',
        needsLabel: 'Different Needs'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // P↔S VALIDATION (Primary-Secondary)
    // ═══════════════════════════════════════════════════════════════════════

    psValidation: {
        complementary: 'Primary and Secondary complement each other well',
        conflicting: 'Primary and Secondary are in tension',
        bonusApplied: 'Bonus for complementary P↔S combination'
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
            primary: 'P',
            secondary: 'S',
            primaryFull: 'Primary',
            secondaryFull: 'Secondary'
        },
        gfkLevels: {
            niedrig: 'low',
            mittel: 'medium',
            hoch: 'high'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEEDS - see GFK NEEDS section below for complete list
    // ═══════════════════════════════════════════════════════════════════════

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
        title: 'Gender',
        howItWorks: 'Two-Dimensional System:',
        bodyLabel: 'Body',
        bodyHint: 'Biological sex / assigned at birth',
        identityLabel: 'Identity',
        identityHint: 'How you feel inside',
        examples: 'Examples:',
        exampleCis: 'Male + Man = Cis Man',
        exampleTrans: 'Male + Woman = Trans Woman',
        exampleNonbinary: 'Female + Non-binary = Non-binary (AFAB)',
        exampleUnsicher: 'Male + Uncertain = In Exploration',
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

    // ═══════════════════════════════════════════════════════════════════════
    // TEXT-TO-SPEECH
    // ═══════════════════════════════════════════════════════════════════════

    tts: {
        play: 'Read aloud',
        pause: 'Pause',
        stop: 'Stop',
        resume: 'Resume',
        notSupported: 'Text-to-speech is not supported in this browser'
    },

    synthesisSection: {
        creativity: 'CREATIVITY',
        dynamik: 'DYNAMICS',
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
        // Base labels
        matchLabel: 'Needs Match',
        sharedTitle: 'SHARED NEEDS',
        differentTitle: 'DIFFERENT PRIORITIES',
        valuesTitle: 'SHARED VALUES',

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
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // PROFILE REVIEW (v1.8)
    // ═══════════════════════════════════════════════════════════════════════════════

    profileReview: {
        title: 'All Pre-filled Attributes',

        // Source explanation for attribute origin
        sourceExplanation: {
            title: 'Where do these values come from?',
            intro: 'These attributes were automatically calculated based on:',
            archetype: 'Archetype',
            gender: 'Gender',
            dominance: 'Dominance',
            orientation: 'Orientation',
            notSelected: 'Not selected',
            note: 'These values are suggestions based on statistical patterns. You can adjust them at any time.',
            learnMore: 'Learn more',
            collapse: 'Show less'
        },

        categories: {
            geschlechtsidentitaet: 'GENDER IDENTITY',
            lebensplanung: 'LIFE PLANNING',
            finanzen: 'FINANCES & CAREER',
            kommunikation: 'COMMUNICATION',
            soziales: 'SOCIAL',
            intimitaet: 'INTIMACY',
            werte: 'VALUES',
            praktisches: 'PRACTICAL'
        },

        attributes: {
            // ═══════════════════════════════════════════════════════════════════════
            // GENDER IDENTITY
            // ═══════════════════════════════════════════════════════════════════════
            geschlechtSekundaer: {
                label: 'Gender Identity',
                description: 'Gender identity: Cis (identity = body), Trans (identity ≠ body), Searching (exploring). For Inter: Non-binary, Fluid, Searching.',
                info: {
                    stats: 'Approx. 0.5-1% of the population identifies as trans or non-binary (Williams Institute, 2022). Trend rising with higher acceptance.',
                    research: 'Identity congruence correlates with 40% higher well-being (American Psychological Association). Partner acceptance is the strongest predictor of relationship satisfaction.',
                    pirsig: 'The search for authentic identity is dynamic Quality. Cis does not automatically mean less awareness - conscious confirmation of one\'s identity is equally valuable.',
                    osho: 'You are not the body, you are not the mind. Find out who you really are - beyond all labels and attributions.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // LIFE PLANNING
            // ═══════════════════════════════════════════════════════════════════════
            kinder: {
                label: 'Desire for Children',
                description: 'Desire for own children or openness to it in the future.',
                info: {
                    stats: '20% of couples in Germany are voluntarily childless (Destatis 2023). Disagreement on children is separation reason #3.',
                    research: 'Gottman Institute: 94% of couples with different views on children separate long-term without compromise.',
                    pirsig: 'A child is neither project nor duty. The question is not "should I?" but "why do I want to?" - and whether both answers harmonize.',
                    osho: 'Children are not an extension of your ego. They are independent souls who come through you but don\'t belong to you.'
                }
            },
            ehe: {
                label: 'Marriage Desire',
                description: 'Importance of formal marriage for the relationship.',
                info: {
                    stats: '60% of Germans see marriage as important (Allensbach 2023). Among under 30s only 42%.',
                    research: 'Studies show no significant difference in relationship satisfaction between married and unmarried long-term couples.',
                    pirsig: 'Marriage is a static pattern. Its quality lies not in the contract, but in the daily choice for each other.',
                    osho: 'Marriage can be a prison or a temple. It depends on whether it\'s entered from fear or from love.'
                }
            },
            zusammen: {
                label: 'Living Together',
                description: 'Preference for living together or separate households.',
                info: {
                    stats: '8% of German couples live in LAT relationships (separate households). Among over 60s it\'s 15%.',
                    research: 'LAT couples report 12% higher relationship quality with equal emotional closeness (University of Missouri).',
                    pirsig: 'Physical proximity is not the same as emotional closeness. Quality comes from conscious presence, not from permanent physical nearness.',
                    osho: 'Two people can be alone in the same room - or connected across cities. True intimacy doesn\'t need a shared key.'
                }
            },
            haustiere: {
                label: 'Pets',
                description: 'Attitude towards pets in the shared household.',
                info: {
                    stats: '47% of German households have pets. 78% of pet owners see their pet as a family member.',
                    research: 'Pet owners show 20% lower cortisol levels. Joint pet care strengthens the couple bond.',
                    pirsig: 'An animal teaches us something essential in relationships: unconditional presence without expectation of change.',
                    osho: 'Animals live in the now. They remind us that love needs no thinking - only being.'
                }
            },
            umzug: {
                label: 'Willingness to Relocate',
                description: 'Willingness to change location for the relationship.',
                info: {
                    stats: '35% of Germans would relocate for love. Among under 30s it\'s 58%.',
                    research: 'Long-distance relationships have the same success rate as close ones - as long as a shared goal exists.',
                    pirsig: 'Flexibility is dynamic Quality. The question is not who moves, but: Does the relationship grow through this decision?',
                    osho: 'Roots and wings - whoever has only roots cannot fly. Whoever has only wings finds no rest. The art is both.'
                }
            },
            familie: {
                label: 'Family Importance',
                description: 'Importance of family of origin and regular contact.',
                info: {
                    stats: '67% of Germans see their family of origin at least monthly. 12% have no contact.',
                    research: 'In-law conflicts are a main factor in 40% of divorces (Terling-Watt Study).',
                    pirsig: 'Family is a static pattern from the past. The art is to honor it without letting it define you.',
                    osho: 'You can love your parents without following their wishes. Respect does not mean obedience.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // FINANCES & CAREER
            // ═══════════════════════════════════════════════════════════════════════
            finanzen: {
                label: 'Finances',
                description: 'Approach to money: separate accounts, hybrid model, or shared finances.',
                info: {
                    stats: '42% of couples have completely separate finances. 31% use a three-account model. 27% have shared finances.',
                    research: 'Money is the #1 dispute topic for couples. Transparency reduces conflicts by 70% (Kansas State University).',
                    pirsig: 'Money is a tool, not a measure of value. The question is not how much, but: Does it serve your shared Quality?',
                    osho: 'Money is like water - it must flow. Those who hold onto it suffocate. Those who can share become rich in trust.'
                }
            },
            karriere: {
                label: 'Career Priority',
                description: 'Weighting between professional success and family life.',
                info: {
                    stats: '58% of Germans prioritize work-life balance over career (Gallup 2023).',
                    research: 'Dual-career couples have higher divorce rates - but only when traditional role expectations exist.',
                    pirsig: 'Career without meaning is a hamster wheel. Meaning without action is daydreaming. Quality lies in integrating both.',
                    osho: 'Work can be meditation - when you work not for recognition, but because the work itself brings joy.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // COMMUNICATION
            // ═══════════════════════════════════════════════════════════════════════
            gespraech: {
                label: 'Need for Conversation',
                description: 'Need for daily exchange and conversations.',
                info: {
                    stats: 'Happy couples talk an average of 5+ hours per week (excl. daily logistics).',
                    research: 'Gottman: "Bid-response ratio" above 85% = stable relationship. Below 33% = high separation risk.',
                    pirsig: 'Words can be bridges or walls. Quality comes not from quantity, but from true listening.',
                    osho: 'True communication happens in the silence between words. Those who can listen don\'t need to talk much.'
                }
            },
            emotional: {
                label: 'Emotional Openness',
                description: 'Willingness to share feelings and emotions.',
                info: {
                    stats: 'Men share feelings on average 60% less often than women (Meta-analysis, 2021).',
                    research: 'Emotional self-disclosure increases intimacy by 45% - but only with reciprocal openness.',
                    pirsig: 'Showing feelings requires the courage to be vulnerable. This is not weakness, but the highest Quality of being human.',
                    osho: 'When you hide your tears, you also hide your laughter. Authenticity knows no half measures.'
                }
            },
            konflikt: {
                label: 'Conflict Behavior',
                description: 'Style of conflict resolution: avoidance or direct approach.',
                info: {
                    stats: '44% of couples avoid conflicts. 23% escalate regularly. 33% resolve constructively.',
                    research: 'Gottman: Conflict avoidance is more harmful than arguing. What matters is the ratio: 5:1 positive to negative.',
                    pirsig: 'Conflict is not the problem - stagnation is. Dynamic Quality emerges through friction, not avoidance.',
                    osho: 'Conflict can be cleansing like a thunderstorm. It\'s not the argument that destroys, but the unspoken.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // SOCIAL
            // ═══════════════════════════════════════════════════════════════════════
            introextro: {
                label: 'Intro-/Extroverted',
                description: 'Energy through alone time (Intro) or social contacts (Extro).',
                info: {
                    stats: '25-40% of the population are introverted. Ambiverts form the largest group.',
                    research: 'Intro-Extro couples can work well when both respect their differences instead of trying to change each other.',
                    pirsig: 'Introversion is not shyness, extroversion is not superficiality. Both are legitimate paths to Quality.',
                    osho: 'The introvert seeks depth, the extrovert seeks breadth. Both seek the same thing on different paths.'
                }
            },
            alleinzeit: {
                label: 'Alone Time Need',
                description: 'Need for time alone without partner.',
                info: {
                    stats: '72% of people need regular alone time. 28% feel lonely during it.',
                    research: 'Partners who respect individual time report 30% higher relationship satisfaction.',
                    pirsig: 'Alone time is not absence of love - it is presence with yourself. Only those who know themselves can give themselves.',
                    osho: 'Loneliness and being alone are fundamentally different. Being alone is full of joy - loneliness is poverty despite company.'
                }
            },
            freunde: {
                label: 'Friend Circle',
                description: 'Preference for separate friends or shared friend circle.',
                info: {
                    stats: '61% of couples largely share their friend circle. 15% have completely separate friends.',
                    research: 'Shared friends stabilize relationships - but also increase social pressure during separations.',
                    pirsig: 'Friendships outside the relationship are not a threat - they are nourishment for individuality.',
                    osho: 'A relationship that allows no other relationships is a prison, not love.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // INTIMACY
            // ═══════════════════════════════════════════════════════════════════════
            naehe: {
                label: 'Physical Closeness',
                description: 'Need for touch, hugs, and physical closeness.',
                info: {
                    stats: 'People need 4-12 hugs daily for emotional well-being (Virginia Satir).',
                    research: '20-second hugs release oxytocin and significantly lower blood pressure and cortisol.',
                    pirsig: 'Physical touch is nonverbal communication of the highest Quality. It needs no interpretation.',
                    osho: 'The body is the temple. A touch can say more than a thousand words - when it happens consciously.'
                }
            },
            romantik: {
                label: 'Romance Need',
                description: 'Desire for romantic gestures, surprises, and dates.',
                info: {
                    stats: '67% of women and 51% of men wish for more romance in the relationship.',
                    research: 'Regular date nights increase relationship satisfaction by 36% (National Marriage Project).',
                    pirsig: 'Romance is not kitsch - it is conscious attention to the extraordinariness of the ordinary.',
                    osho: 'Romance dies when love becomes habit. Keep the eyes of the beginning open.'
                }
            },
            sex: {
                label: 'Sexual Frequency',
                description: 'Desired frequency of intimacy in the relationship.',
                info: {
                    stats: 'German couples have sex on average 1.5x per week. 15% are in "sexless marriages" (<10x/year).',
                    research: 'Frequency correlates little with satisfaction. What matters is whether both feel understood.',
                    pirsig: 'Sexuality is not quantifiable. Quality lies in being present, not in statistics.',
                    osho: 'Sex can be meditation - when it arises from presence rather than desire. Then once is like a thousand times.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // VALUES
            // ═══════════════════════════════════════════════════════════════════════
            religion: {
                label: 'Religiosity',
                description: 'Importance of religion and spirituality in daily life.',
                info: {
                    stats: '52% of Germans believe in God. 27% practice actively. Interfaith marriages at 24%.',
                    research: 'Religious homogamy (same faith) correlates with longer marriages - but atheists have similar stability.',
                    pirsig: 'Religion is an attempt to grasp static Quality. Spirituality lives in the dynamic search itself.',
                    osho: 'Religion should not be a creed, but an experience. What you haven\'t experienced yourself is just information.'
                }
            },
            tradition: {
                label: 'Traditional vs. Modern',
                description: 'Orientation towards traditional values or modern lifestyles.',
                info: {
                    stats: '38% of Germans prefer traditional values. Generation gap: 60+ vs. 18-30 = 52% vs. 21%.',
                    research: 'Value congruence matters more than direction. Mixed couples (trad+modern) report more conflicts.',
                    pirsig: 'Tradition is static Quality - valuable when it carries, hindering when it binds. The art is in distinguishing.',
                    osho: 'Tradition is the ash of the fire of past generations. Seek the fire, not the ash.'
                }
            },
            umwelt: {
                label: 'Environmental Awareness',
                description: 'Importance of sustainability and environmentally conscious living.',
                info: {
                    stats: '68% of Germans consider climate protection important. 23% actively change their behavior.',
                    research: 'Value discrepancy on sustainability leads to daily micro-conflicts (shopping, mobility, consumption).',
                    pirsig: 'Environmental awareness is the recognition that we are not separate from nature. Every action has consequences.',
                    osho: 'The earth is not your possession - you are its guest. Guests leave the house more beautiful than they found it.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PRACTICAL
            // ═══════════════════════════════════════════════════════════════════════
            ordnung: {
                label: 'Orderliness',
                description: 'Preference for order and cleanliness in the living area.',
                info: {
                    stats: 'Housekeeping is a top-5 dispute topic for couples. 62% of women carry the main burden - with declining trend.',
                    research: 'Unequal household distribution reduces sexual satisfaction for women by 50%.',
                    pirsig: 'Order is not control - it is clarity of space for clarity of mind.',
                    osho: 'Outer order reflects inner order. But compulsive tidying can also be an escape from inner chaos.'
                }
            },
            reise: {
                label: 'Travel Frequency',
                description: 'Desire for travel and shared vacations.',
                info: {
                    stats: 'Germans travel on average 2.4x per year. 18% never. Travel differences are a common conflict.',
                    research: 'Shared experiences (not material gifts) strengthen the couple bond most in the long term.',
                    pirsig: 'Travel expands the static patterns of everyday life. New experiences are dynamic Quality in pure form.',
                    osho: 'The most important journey is the one inward. But sometimes outer movement is needed to resolve inner stagnation.'
                }
            }
        },

        slider: {
            niedrig: 'Low',
            mittel: 'Medium',
            hoch: 'High',
            getrennt: 'Separate',
            hybrid: 'Hybrid',
            gemeinsam: 'Shared',
            familie: 'Family',
            balance: 'Balance',
            karriere: 'Career',
            unwichtig: 'Unimportant',
            wichtig: 'Important',
            sehrWichtig: 'Very important'
        },

        actions: {
            reset: 'Reset',
            save: 'Continue',
            close: 'Close'
        },

        infoModal: {
            statistik: 'STATISTICS',
            forschung: 'RESEARCH',
            pirsig: 'PIRSIG',
            osho: 'OSHO',
            verstanden: 'Got it'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_EN;
}
