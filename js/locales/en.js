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
        title: 'Archetype Relationship Quality',
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
            keyPrinciples: [
                'Self-sufficiency as a value, not a lack',
                'Personal autonomy over commitment',
                'Relationships as an option, not a necessity',
                'Fulfillment through self, friends, projects'
            ]
        },
        duo: {
            name: 'Duo',
            shortDef: 'Traditional monogamous partnership with exclusivity and shared life design.',
            keyPrinciples: [
                'Exclusivity as an expression of commitment',
                "'We' as the central unit over 'I'",
                'Depth through focus on one person',
                'Shared life design and future planning'
            ]
        },
        duo_flex: {
            name: 'Duo-Flex',
            shortDef: 'Primary partnership with agreed openings for additional contacts.',
            keyPrinciples: [
                'Primary relationship as anchor and priority',
                'Sexual/romantic variety without giving up hierarchy',
                'Honesty and transparency about all contacts',
                'Freedom within agreed boundaries'
            ]
        },
        solopoly: {
            name: 'Solopoly',
            shortDef: 'Multiple equal relationships while consciously preserving own autonomy.',
            keyPrinciples: [
                'Autonomy as the highest value - even in relationships',
                'Multiple equal relationships without hierarchy',
                'No merging or shared households',
                "'I am my own primary partner'"
            ]
        },
        polyamor: {
            name: 'Polyamorous',
            shortDef: 'Multiple simultaneous, ethically conducted love relationships with transparency.',
            keyPrinciples: [
                'Love is not limited or exclusive',
                'Honesty and transparency towards everyone',
                'Consent and agreement as the basis',
                'Communication as a central skill'
            ]
        },
        ra: {
            name: 'RA',
            shortDef: 'Relationship Anarchist - Rejection of all relationship hierarchies and labels.',
            keyPrinciples: [
                'Each relationship is individually defined',
                'No predetermined categories or labels',
                'Equal value of all connections',
                'Radical autonomy and freedom'
            ]
        },
        lat: {
            name: 'LAT',
            shortDef: 'Living Apart Together - Committed partnership without living together.',
            keyPrinciples: [
                'Commitment without cohabitation',
                'Own space as a value',
                'Quality time over quantity',
                'Conscious closeness through chosen distance'
            ]
        },
        aromantisch: {
            name: 'Aromantic',
            shortDef: 'Focus on platonic connections without romantic component.',
            keyPrinciples: [
                'Deep connections without romance',
                'Friendship as an equal relationship model',
                'Authenticity beyond romantic norms',
                'Platonic love as a complete connection'
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
        question: 'Are you at least 18 years old?',
        confirm: 'Yes, I am 18+',
        deny: 'No',
        required: 'This site is only accessible to adults (18+).'
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
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_EN;
}
