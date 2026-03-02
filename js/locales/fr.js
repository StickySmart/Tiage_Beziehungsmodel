/**
 * TRADUCTIONS FRANCAISES
 *
 * Tous les textes UI pour la version en langue francaise.
 *
 * (c) 2025 Ti-age.de Tous droits reserves.
 */

var TiageLocale_FR = {
    code: 'fr',
    name: 'Fran\u00e7ais',

    // ═══════════════════════════════════════════════════════════════════════
    // TEXTES UI GENERAUX
    // ═══════════════════════════════════════════════════════════════════════

    ui: {
        title: 'Le principe anarchique Ti-Age de l\'appariement',
        subtitle: 'Swipe',
        help: 'Aide',
        close: 'Fermer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        send: 'Envoyer',
        back: 'Retour',
        next: 'Suivant',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succ\u00e8s',

        // Person Labels
        ich: 'MOI',
        partner: 'PARTENAIRE',

        // Status
        gelebt: 'Primaire',
        interessiert: 'Secondaire',

        // Navigation
        page: 'Page',
        of: 'de',

        // Textes de statut / Fallback
        selectAllDimensions: 'Veuillez s\u00e9lectionner toutes les dimensions.',
        noSpecificData: 'Aucune donn\u00e9e sp\u00e9cifique disponible',
        noDescription: 'Aucune description disponible.',
        noData: 'Aucune donn\u00e9e',
        errorClearing: 'Erreur lors de la r\u00e9initialisation : ',
        noNeedsFound: 'Aucun besoin trouv\u00e9. Astuce : Utilisez * comme joker (ex. *enfant*) - recherche dans #B, #K, #D, #P',
        needsFound: '{count} besoins trouv\u00e9s',
        needsFoundInAttributes: '{count} besoins trouv\u00e9s dans {attrs} attributs',

        // Chaînes UI manquantes
        noDataAvailable: 'Aucune donnée disponible.',
        noEntriesFound: 'Aucune entrée trouvée.',
        needNotFound: 'Besoin {id} non trouvé.',
        noSpecificAdvantages: 'Aucun avantage spécifique connu',
        noSpecificChallenges: 'Aucun défi spécifique connu',
        sharedNeeds: 'Besoins communs',
        needsComparison: 'Comparaison des besoins',
        showDefinition: 'Afficher la définition',
        identitySecondary: 'Identité (secondaire)',
        clickForDefinition: 'Cliquer pour la définition',
        clickForDerivation: 'Cliquer pour la dérivation',
        fixedOnSwitch: 'Fixé - conservé au changement d\'archétype',
        manuallyLocked: 'Verrouillé manuellement (modifier dans Attributs)',
        autoCalculated: 'Calculé automatiquement',
        locked: 'Verrouillé',
        removeSearch: 'Supprimer la recherche',
        removeSelection: 'Supprimer la sélection',
        yourProfileSetting: 'Votre paramètre de profil',
        partnerProfileSetting: 'Paramètre de profil partenaire',
        yourProfile: 'Votre profil {archetype} ({visible} sur {total} besoins)',
        yourProfileAll: 'Votre profil {archetype} ({total} besoins)',
        missingSelection: 'Sélection manquante',
        replyTo: 'Réponse à {name}...',
        archetypeBaseValues: 'Valeurs de base archétype',
        archetypeBaseValuesDesc: 'Valeurs individualisées non disponibles. Les valeurs standard de l\'archétype sont affichées.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // \u00c9VALUATION DE LA QUALIT\u00c9
    // ═══════════════════════════════════════════════════════════════════════

    quality: {
        noModification: 'Aucune modification',
        noAttraction: 'Aucune attraction physique possible',
        noResonance: 'Aucune base de r\u00e9sonance pr\u00e9sente.',
        noResonanceDesc: 'Cette relation montre une qualit\u00e9 de {score} \u2013 aucune base compatible, les sch\u00e9mas s\'excluent mutuellement.',
        goodResonance: 'Bonne r\u00e9sonance \u2013 les sch\u00e9mas se compl\u00e8tent.',
        goodResonanceDesc: 'Cette relation montre une qualit\u00e9 de {score} \u2013 une bonne r\u00e9sonance entre deux personnes dont les sch\u00e9mas se compl\u00e8tent.',
        basisPresent: 'Base pr\u00e9sente, travail n\u00e9cessaire.',
        basisPresentDesc: 'Cette relation montre une qualit\u00e9 de {score} \u2013 une base est pr\u00e9sente, mais n\u00e9cessite un travail conscient et de la communication.',
        reflectionNeeded: 'R\u00e9flexion consciente n\u00e9cessaire.',
        reflectionNeededDesc: 'Cette relation montre une qualit\u00e9 de {score} \u2013 une r\u00e9flexion consciente et une communication ouverte sont n\u00e9cessaires.',
        noModifiers: 'Aucun modificateur actif'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AVERTISSEMENTS
    // ═══════════════════════════════════════════════════════════════════════

    warnings: {
        noAttraction: 'Aucune attraction émotionnelle/physique :',
        noAttractionDesc: 'L\'incompatibilité d\'orientation empêche une relation romantique',
        uncertainAttraction: 'Attraction physique incertaine (phase d\'exploration)',
        uncertainDominance: 'Dynamique de dominance incertaine (phase d\'exploration – confiance réduite)',
        philosophyWarning: 'Avertissement niveau rationnel : Philosophie seulement {score}',
        noNeedsData: 'Aucune donnée de besoins',
        noNeedsDataDesc: 'Les facteurs de résonance R1-R3 ne peuvent pas être calculés. Veuillez ajuster les valeurs des besoins dans le profil.',
        fundamentalDifferences: 'Avertissement niveau rationnel : Différences philosophiques fondamentales',
        differentApproaches: 'Note niveau rationnel : Approches philosophiques différentes',
        relationshipPhilosophy: 'Philosophie relationnelle : {score}',
        warningText: 'Vos convictions fondamentales sur les relations sont très différentes. Cela nécessite une communication intensive et une volonté de compromis.',
        infoText: 'Vous avez des idées différentes sur les relations. La communication ouverte est importante.',
        pathosLogosTitle: 'Pathos vs. Logos',
        emotionLevel: 'NIVEAU ÉMOTIONNEL (Émotion/Corps)',
        emotionDesc: 'Attraction physique et émotionnelle',
        emotionDimension: 'Orientation sexuelle',
        emotionImmutable: 'Ne peut pas être modifié par l\'apprentissage ou la communication',
        emotionConsequence: 'Sans niveau émotionnel : Aucune relation romantique possible',
        reasonLevel: 'NIVEAU RATIONNEL (Philosophie/Convictions)',
        reasonDesc: 'Philosophie relationnelle et convictions rationnelles',
        reasonDimension: 'Convictions et valeurs',
        reasonMutable: 'Peut être modifié par la communication et l\'apprentissage',
        reasonConsequence: 'Sans niveau rationnel : Relation difficile, mais possible',
        pathosLogosQuote: '"Le niveau émotionnel est le fondement - sans attraction physique aucune relation romantique ne peut exister. Le niveau rationnel est le toit - il protège et structure, mais peut être reconstruit."'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RETOUR D'INFORMATION
    // ═══════════════════════════════════════════════════════════════════════

    feedback: {
        noFeedback: 'Pas encore de retour.<br>Soyez le premier !',
        noFilterResults: 'Aucun retour pour ce filtre.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CATEGORIES
    // ═══════════════════════════════════════════════════════════════════════

    categories: {
        A: 'Philosophie relationnelle',
        B: 'Alignement des valeurs',
        C: 'Proximit\u00e9-Distance',
        D: 'Autonomie',
        E: 'Communication',
        F: 'Compatibilit\u00e9 sociale'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANCE
    // ═══════════════════════════════════════════════════════════════════════

    dominanz: {
        label: 'Pr\u00e9f\u00e9rence de dominance',
        types: {
            dominant: 'Dominant',
            submissiv: 'Soumis',
            switch: 'Switch',
            ausgeglichen: '\u00c9quilibr\u00e9'
        },
        short: {
            dominant: 'Dom',
            submissiv: 'Sou',
            switch: 'Swi',
            ausgeglichen: '\u00c9qu'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTATION SEXUELLE
    // ═══════════════════════════════════════════════════════════════════════

    // v2.0: Nouvelle structure d'orientation
    orientierung: {
        label: 'Orientation sexuelle',
        types: {
            heterosexuell: 'H\u00e9t\u00e9rosexuel',
            homosexuell: 'Homosexuel',
            bisexuell: 'Bisexuel',
            pansexuell: 'Pansexuel',
            queer: 'Queer',
            // LEGACY
            bihomo: 'Bi-/Homosexuel',
            gay_lesbisch: 'Homosexuel'
        },
        short: {
            heterosexuell: 'H\u00e9t\u00e9ro',
            homosexuell: 'Homo',
            bisexuell: 'Bi',
            pansexuell: 'Pan',
            queer: 'Queer',
            // LEGACY
            bihomo: 'Bi/Homo',
            gay_lesbisch: 'Homo'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CNV (Communication Non Violente)
    // ═══════════════════════════════════════════════════════════════════════

    gfk: {
        label: 'Comp\u00e9tence CNV',
        levels: {
            niedrig: 'faible',
            mittel: 'moyen',
            hoch: '\u00e9lev\u00e9'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENRE
    // ═══════════════════════════════════════════════════════════════════════

    geschlecht: {
        label: 'Genre',
        primaryLabel: 'Corps',
        secondaryLabel: 'Identit\u00e9 / \u00c2me psychologique',
        primaryHint: 'Biologique / \u00e0 la naissance',
        secondaryHint: 'Comment tu te sens',
        primary: {
            mann: 'Homme',
            frau: 'Femme',
            inter: 'Inter',
            nonbinaer: 'Non-binaire'
        },
        primaryShort: {
            mann: 'H',
            frau: 'F',
            inter: 'I',
            nonbinaer: 'NB'
        },
        secondary: {
            cis: 'Cis',
            trans: 'Trans',
            nonbinaer: 'Non-binaire',
            fluid: 'Fluide',
            unsicher: 'Incertain',
            suchend: 'En recherche',
            mann: 'Homme',
            frau: 'Femme'
        },
        secondaryShort: {
            cis: 'C',
            trans: 'T',
            nonbinaer: 'NB',
            fluid: 'FL',
            unsicher: '?',
            suchend: 'R',
            mann: 'H',
            frau: 'F'
        },
        detailed: {
            cis_mann: 'Homme cis',
            cis_frau: 'Femme cis',
            trans_mann: 'Homme trans',
            trans_frau: 'Femme trans',
            nonbinaer: 'Non-binaire',
            genderfluid: 'Genre fluide',
            agender: 'Agenre',
            intersex: 'Intersexe',
            divers: 'Divers'
        },
        detailedShort: {
            cis_mann: 'CH',
            cis_frau: 'CF',
            trans_mann: 'TH',
            trans_frau: 'TF',
            nonbinaer: 'NB',
            genderfluid: 'GF',
            agender: 'AG',
            intersex: 'IX',
            divers: 'DI'
        },
        types: {
            mann: 'Homme',
            frau: 'Femme',
            inter: 'Inter',
            cis: 'Cis',
            trans: 'Trans',
            nonbinaer: 'Non-binaire',
            fluid: 'Fluide',
            suchend: 'En recherche',
            unsicher: 'Incertain'
        },
        short: {
            mann: 'H',
            frau: 'F',
            inter: 'I'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // INFOBULLES
    // ═══════════════════════════════════════════════════════════════════════

    tooltips: {
        geschlecht: {
            title: 'Genre',
            text: 'Deux dimensions : Corps (biologique) et Identit\u00e9 / \u00c2me psychologique (comment tu te sens). Cela influence la compatibilit\u00e9 conjointement avec l\'orientation sexuelle.'
        },
        geschlecht_primary: {
            title: 'Corps (Primaire)',
            text: 'Ton sexe biologique / assign\u00e9 \u00e0 la naissance.'
        },
        geschlecht_secondary: {
            title: 'Identit\u00e9 / \u00c2me psychologique (Secondaire)',
            text: 'Comment tu te sens int\u00e9rieurement et comment tu t\'identifies.'
        },
        primary_mann: { title: 'Homme (Corps)', text: 'Assign\u00e9 masculin \u00e0 la naissance.' },
        primary_frau: { title: 'Femme (Corps)', text: 'Assign\u00e9 f\u00e9minin \u00e0 la naissance.' },
        primary_inter: { title: 'Inter (Corps)', text: 'Caract\u00e9ristiques sexuelles cong\u00e9nitales qui ne sont pas clairement masculines ou f\u00e9minines.' },
        secondary_mann: { title: 'Homme (Identit\u00e9)', text: 'Tu t\'identifies comme homme.' },
        secondary_frau: { title: 'Femme (Identit\u00e9)', text: 'Tu t\'identifies comme femme.' },
        secondary_nonbinaer: { title: 'Non-binaire (Identit\u00e9)', text: 'Tu ne t\'identifies ni exclusivement comme homme ni comme femme.' },
        secondary_fluid: { title: 'Fluide (Identit\u00e9)', text: 'Ton identit\u00e9 de genre \u00e9volue au fil du temps ou alterne entre diff\u00e9rentes identit\u00e9s.' },
        secondary_unsicher: { title: 'Incertain (Identit\u00e9)', text: 'Tu n\'es pas encore s\u00fbr(e) de ton identit\u00e9 de genre ou tu es en phase d\'exploration.' },
        dominanz: { title: 'Pr\u00e9f\u00e9rence de dominance', text: 'Quel r\u00f4le pr\u00e9f\u00e8res-tu dans la dynamique \u00e9motionnelle et pratique de la relation ?' },
        orientierung: { title: 'Orientation sexuelle', text: 'Vers quel genre te sens-tu attir\u00e9(e) romantiquement et/ou sexuellement ?' },
        status: { title: 'Statut d\'orientation', text: 'Primaire : Tu vis cette orientation et tu en es s\u00fbr(e).\n\nSecondaire : Tu es curieux/curieuse ou en phase d\'exploration.' },
        dominanzStatus: { title: 'Statut de dominance', text: 'Primaire : Tu connais ta pr\u00e9f\u00e9rence de dominance et tu la vis activement.\n\nSecondaire : Tu es encore en exploration.' },
        dominant: { title: 'Dominant', text: 'Le meneur \u2013 Tu aimes prendre les r\u00eanes et la responsabilit\u00e9 dans les relations.' },
        submissiv: { title: 'Soumis', text: 'Le suiveur \u2013 Tu aimes te laisser guider et faire confiance \u00e0 ton/ta partenaire.' },
        switch: { title: 'Switch', text: 'Le flexible \u2013 Tu appr\u00e9cies les deux r\u00f4les selon la situation et le/la partenaire.' },
        ausgeglichen: { title: '\u00c9quilibr\u00e9', text: 'Le centr\u00e9 \u2013 Tu pr\u00e9f\u00e8res une dynamique \u00e9galitaire sans r\u00f4les fixes.' },
        heterosexuell: { title: 'H\u00e9t\u00e9rosexuel', text: 'Attirance pour le genre oppos\u00e9.' },
        homosexuell: { title: 'Homosexuel', text: 'Attirance pour le m\u00eame genre.' },
        bisexuell: { title: 'Bi-/Pansexuel', text: 'Attirance pour plusieurs ou tous les genres, ind\u00e9pendamment de l\'identit\u00e9 de genre.' },
        cis_mann: { title: 'Homme cis', text: 'Personne assign\u00e9e masculine \u00e0 la naissance et qui s\'identifie comme homme.' },
        cis_frau: { title: 'Femme cis', text: 'Personne assign\u00e9e f\u00e9minine \u00e0 la naissance et qui s\'identifie comme femme.' },
        trans_mann: { title: 'Homme trans', text: 'Personne assign\u00e9e f\u00e9minine \u00e0 la naissance mais qui s\'identifie comme homme.' },
        trans_frau: { title: 'Femme trans', text: 'Personne assign\u00e9e masculine \u00e0 la naissance mais qui s\'identifie comme femme.' },
        nonbinaer: { title: 'Non-binaire', text: 'Personne dont l\'identit\u00e9 de genre n\'est ni exclusivement masculine ni f\u00e9minine.' },
        genderfluid: { title: 'Genre fluide', text: 'Personne dont l\'identit\u00e9 de genre \u00e9volue au fil du temps ou alterne entre diff\u00e9rentes identit\u00e9s.' },
        agender: { title: 'Agenre', text: 'Personne qui ne se sent appartenir \u00e0 aucune identit\u00e9 de genre ou qui rejette le concept de genre.' },
        intersex: { title: 'Intersexe', text: 'Personne pr\u00e9sentant des caract\u00e9ristiques sexuelles cong\u00e9nitales qui ne sont pas clairement masculines ou f\u00e9minines.' },
        divers: { title: 'Divers', text: 'Terme g\u00e9n\u00e9rique pour les identit\u00e9s de genre en dehors du syst\u00e8me binaire homme/femme.' }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPES
    // ═══════════════════════════════════════════════════════════════════════

    archetypes: {
        single: {
            name: 'Single',
            shortDef: 'Choix conscient d\'une vie autonome sans relation principale comme mode de vie durable.',
            longDef: 'Les personnes orient\u00e9es Single ont activement choisi une vie sans partenariat romantique durable. Ce n\'est pas une phase de transition (\u00ab entre deux relations \u00bb), mais un mode de vie conscient qui place l\'autosuffisance et l\'autonomie personnelle au centre de ses valeurs. Les contacts sociaux, les amiti\u00e9s et les rencontres romantiques/sexuelles occasionnelles sont possibles, mais aucun partenariat durable n\'est recherch\u00e9.',
            keyPrinciples: ['L\'autosuffisance comme valeur, non comme manque', 'L\'autonomie personnelle avant l\'engagement', 'Les relations comme option, non comme n\u00e9cessit\u00e9', 'L\'\u00e9panouissement par soi-m\u00eame, les amis, les projets'],
            notTheSameAs: ['\u00ab Entre deux relations \u00bb', '\u00ab N\'a pas encore trouv\u00e9 la bonne personne \u00bb', 'Incapable de s\'engager ou peur de l\'engagement', 'Solitaire ou malheureux/malheureuse'],
            variants: ['Aromantique-Single : Aucun sentiment romantique, aucun besoin', 'Consciemment autonome : Choix positif pour la libert\u00e9', 'Critique des relations : Pr\u00e9f\u00e8re l\'ind\u00e9pendance']
        },
        duo: {
            name: 'Duo',
            shortDef: 'Relation monogame traditionnelle \u00e0 deux avec exclusivit\u00e9 et construction de vie commune.',
            longDef: 'Les personnes orient\u00e9es Duo vivent ou recherchent une relation classique \u00e0 deux avec exclusivit\u00e9 romantique et sexuelle. Le partenariat est au centre de la construction de vie et est compris comme l\'unit\u00e9 \u00e9motionnelle et sociale principale. Les objectifs communs, le quotidien et la planification de l\'avenir sont fa\u00e7onn\u00e9s en couple.',
            keyPrinciples: ['L\'exclusivit\u00e9 comme expression de l\'engagement', '\u00ab Nous \u00bb comme unit\u00e9 centrale au-dessus du \u00ab Je \u00bb', 'La profondeur par la focalisation sur une seule personne', 'Construction de vie et planification d\'avenir communes', 'La fid\u00e9lit\u00e9 comme exclusivit\u00e9 \u00e9motionnelle et sexuelle'],
            notTheSameAs: ['Possessivit\u00e9 ou contr\u00f4le', 'Perte de sa propre identit\u00e9', 'Forme de relation \u00ab ancienne \u00bb ou \u00ab d\u00e9pass\u00e9e \u00bb', 'Ennuyeux ou insatisfaisant'],
            variants: ['Duo traditionnel : Mod\u00e8le classique du mariage', 'Duo moderne : Sans certificat de mariage, r\u00f4les plus flexibles', 'Duo intense : Fusion \u00e9motionnelle tr\u00e8s \u00e9troite']
        },
        duo_flex: {
            name: 'Duo-Flex',
            shortDef: 'Relation principale \u00e0 deux avec ouvertures convenues pour des contacts suppl\u00e9mentaires.',
            longDef: 'Les personnes orient\u00e9es Duo-Flex vivent dans une relation principale avec un partenaire primaire, mais l\'ouvrent consciemment et de mani\u00e8re consensuelle \u00e0 des contacts suppl\u00e9mentaires. La relation primaire reste centrale et privil\u00e9gi\u00e9e. Toutes les ouvertures sont transparentes et soumises \u00e0 des r\u00e8gles convenues ensemble.',
            keyPrinciples: ['La relation primaire comme ancre et priorit\u00e9', 'Diversit\u00e9 sexuelle/romantique sans abandon de la hi\u00e9rarchie', 'Honn\u00eatet\u00e9 et transparence sur tous les contacts', 'Les r\u00e8gles prot\u00e8gent la relation principale', 'La libert\u00e9 dans des limites convenues'],
            notTheSameAs: ['Tromperie ou trahison (tout est concert\u00e9 !)', '\u00ab Sauver la relation \u00bb par l\'ouverture', 'Manque d\'engagement', 'Phase de transition vers le polyamour'],
            variants: ['Libertinage : Exp\u00e9riences sexuelles partag\u00e9es', 'Relation ouverte : Libert\u00e9 sexuelle individuelle', 'Poly hi\u00e9rarchique : Partenaire principal + relations secondaires']
        },
        solopoly: {
            name: 'Solopoly',
            shortDef: 'Plusieurs relations \u00e9quivalentes avec pr\u00e9servation consciente de sa propre autonomie.',
            longDef: 'Les personnes orient\u00e9es Solopoly ont plusieurs relations romantiques et/ou sexuelles en parall\u00e8le, sans prioriser l\'une d\'entre elles comme \u00ab relation principale \u00bb. L\'autonomie personnelle est au centre : pas de cohabitation, pas de gestion commune du m\u00e9nage. \u00ab Je suis mon propre partenaire principal. \u00bb',
            keyPrinciples: ['L\'autonomie comme valeur supr\u00eame \u2013 m\u00eame dans les relations', 'Plusieurs relations \u00e9quivalentes sans hi\u00e9rarchie', 'Pas de fusion ni de m\u00e9nages communs', '\u00ab Je suis mon propre partenaire principal \u00bb', 'L\'amour sans renoncer \u00e0 l\'ind\u00e9pendance'],
            notTheSameAs: ['Peur de l\'engagement ou probl\u00e8mes d\'attachement', 'Version \u00ab light \u00bb du polyamour', '\u00c9go\u00efste ou incapable de relation', '\u00c9tape interm\u00e9diaire vers un \u00ab vrai \u00bb partenariat'],
            variants: ['Fortement autonome : Limites tr\u00e8s claires', '\u00c9quilibr\u00e9 en relations : Relations profondes, logements s\u00e9par\u00e9s', 'Orient\u00e9 r\u00e9seau : Nombreuses connexions \u00e9quivalentes']
        },
        polyamor: {
            name: 'Polyamour',
            shortDef: 'Plusieurs relations amoureuses simultan\u00e9es, men\u00e9es de mani\u00e8re \u00e9thique avec transparence.',
            longDef: 'Les personnes polyamoureuses vivent plusieurs relations romantiques simultan\u00e9ment, toutes avec la connaissance et le consentement de chacun. Contrairement au Duo-Flex, il n\'y a souvent pas de hi\u00e9rarchie claire \u2013 toutes les relations peuvent \u00eatre \u00e9galement importantes.',
            keyPrinciples: ['L\'amour n\'est ni limit\u00e9 ni exclusif', 'Honn\u00eatet\u00e9 et transparence envers tous', 'Le consentement et le consensus comme fondement', 'La communication comme comp\u00e9tence centrale', 'Chaque relation a sa propre valeur'],
            notTheSameAs: ['Tromperie ou secret', '\u00ab Vouloir tout avoir \u00bb', 'Incapable de s\'engager', 'Uniquement orient\u00e9 vers le sexe'],
            variants: ['Kitchen-Table-Poly : Tous les partenaires se connaissent et s\'appr\u00e9cient', 'Poly parall\u00e8le : Les relations existent s\u00e9par\u00e9ment', 'Polycule : R\u00e9seau de relations interconnect\u00e9es']
        },
        ra: {
            name: 'RA',
            shortDef: 'RA \u2013 Rejet de toutes les hi\u00e9rarchies et \u00e9tiquettes relationnelles.',
            longDef: 'Les adeptes de l\'AR (Anarchie Relationnelle) remettent radicalement en question toutes les normes relationnelles soci\u00e9tales. Aucune relation n\'est \u00ab sup\u00e9rieure \u00bb \u00e0 une autre \u2013 les amiti\u00e9s peuvent \u00eatre tout aussi importantes que les relations romantiques. Chaque lien est d\u00e9fini individuellement, sans mod\u00e8les ext\u00e9rieurs.',
            keyPrinciples: ['Aucune hi\u00e9rarchie entre les types de relations', 'Chaque relation est d\u00e9finie individuellement', 'Rejet des normes relationnelles soci\u00e9tales', 'L\'autonomie comme valeur supr\u00eame', 'Aucun droit de propri\u00e9t\u00e9 sur autrui'],
            notTheSameAs: ['Incapable de relation ou peur de l\'engagement', 'Chaotique ou sans r\u00e8gles', 'Irresponsable', 'Contre l\'engagement en g\u00e9n\u00e9ral'],
            variants: ['Anarchiste en r\u00e9seau : Nombreuses connexions \u00e9quivalentes', 'AR philosophique : R\u00e9flexion profonde sur les normes', 'AR pragmatique : Application flexible des principes']
        },
        lat: {
            name: 'LAT',
            shortDef: 'Living Apart Together \u2013 Partenariat stable sans cohabitation.',
            longDef: 'Les personnes orient\u00e9es LAT souhaitent des relations profondes et engag\u00e9es, mais avec une autonomie spatiale et quotidienne claire. Avoir son propre chez-soi n\'est pas un signe de distance, mais de prise en charge saine de soi-m\u00eame.',
            keyPrinciples: ['L\'amour n\'a pas besoin d\'un toit commun', 'Avoir son propre espace de repli est essentiel', 'La qualit\u00e9 du temps plut\u00f4t que la quantit\u00e9', 'L\'autonomie au quotidien', 'Un choix conscient pour la proximit\u00e9'],
            notTheSameAs: ['Relation \u00e0 distance (distance non voulue)', 'Phase de transition avant d\'emm\u00e9nager ensemble', 'Peur de l\'engagement', '\u00ab Ne pas prendre la relation au s\u00e9rieux \u00bb'],
            variants: ['LAT de proximit\u00e9 : Habiter pr\u00e8s l\'un de l\'autre mais s\u00e9par\u00e9ment', 'LAT week-end : Ensemble le week-end, s\u00e9par\u00e9s en semaine', 'LAT flexible : R\u00e9partition variable du temps ensemble']
        },
        aromantisch: {
            name: 'Aromantique',
            shortDef: 'Focus sur les liens platoniques sans composante romantique.',
            longDef: 'Les personnes aromantiques ressentent peu ou pas d\'attirance romantique. Elles peuvent n\u00e9anmoins avoir des relations profondes et significatives \u2013 simplement sans composante romantique. L\'amiti\u00e9, la famille et d\'autres liens sont tout aussi pr\u00e9cieux.',
            keyPrinciples: ['Des liens profonds sans romantisme', 'L\'amiti\u00e9 comme mod\u00e8le relationnel \u00e9quivalent', 'L\'authenticit\u00e9 au-del\u00e0 des normes romantiques', 'L\'amour platonique comme lien \u00e0 part enti\u00e8re', 'L\'estime de soi ind\u00e9pendante des relations romantiques'],
            notTheSameAs: ['Froid(e) ou insensible', 'Incapable d\'aimer', 'Asexuel(le) (c\'est un autre spectre)', 'N\'a simplement pas encore trouv\u00e9 la bonne personne'],
            variants: ['Compl\u00e8tement aromantique : Aucune attirance romantique', 'Gris-romantique : Rarement de l\'attirance romantique', 'Queerplatonique : Partenariats profonds et engag\u00e9s non romantiques']
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AIDE
    // ═══════════════════════════════════════════════════════════════════════

    help: {
        title: 'Aide & Documentation',
        quickGuide: 'Guide rapide',
        quickGuideSteps: ['Choisis ton arch\u00e9type de relation (MOI)', 'Choisis l\'arch\u00e9type de ton/ta partenaire', 'Clique sur les cat\u00e9gories pour les d\u00e9tails', 'Utilise les filtres pour des analyses sp\u00e9cifiques'],
        sections: { archetypes: 'Comprendre les arch\u00e9types', categories: 'Cat\u00e9gories expliqu\u00e9es', compatibility: 'Compatibilit\u00e9', tips: 'Conseils' }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COMMENTAIRES
    // ═══════════════════════════════════════════════════════════════════════

    comments: {
        title: 'Commentaires',
        send: 'Envoyer un commentaire',
        viewAll: 'Afficher tous les commentaires',
        placeholder: 'Ton commentaire...',
        author: 'Nom (optionnel)',
        type: 'Type',
        types: { feedback: 'Retour', fehler: 'Signaler un bug', frage: 'Question', verbesserung: 'Suggestion d\'am\u00e9lioration', doku: 'Documentation' },
        search: 'Rechercher dans les commentaires...',
        noComments: 'Aucun commentaire pour le moment.',
        reply: 'R\u00e9pondre'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALIDATION
    // ═══════════════════════════════════════════════════════════════════════

    validation: {
        missingDimensions: 'Veuillez remplir tous les champs requis :',
        missingGeschlecht: 'Genre',
        missingDominanz: 'Dominance',
        missingOrientierung: 'Orientation'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VERIFICATION D'AGE
    // ═══════════════════════════════════════════════════════════════════════

    ageVerification: {
        title: 'V\u00e9rification de l\'\u00e2ge',
        description: 'Ce site contient du contenu sur les mod\u00e8les relationnels et est r\u00e9serv\u00e9 aux personnes de 18 ans et plus.',
        question: 'As-tu au moins 18 ans ?',
        confirm: 'Oui, j\'ai 18 ans ou plus',
        deny: 'Non, j\'ai moins de 18 ans',
        required: 'Ce site est uniquement accessible aux adultes (18+).',
        termsIntro: 'En cliquant sur \u00ab Oui \u00bb, tu confirmes que tu :',
        termsAge: 'es majeur(e) (au moins 18 ans)',
        termsAccept: 'acceptes les',
        termsLinkText: 'conditions d\'utilisation et la politique de confidentialit\u00e9',
        cookieConsent: 'J\'accepte l\'utilisation de cookies et du LocalStorage pour enregistrer mes saisies et pr\u00e9f\u00e9rences. Ces donn\u00e9es sont uniquement stock\u00e9es localement dans mon navigateur.',
        termsCopyright: 'prends note que tous les contenus sont prot\u00e9g\u00e9s par le droit d\'auteur',
        termsPersonal: 'utilises les contenus uniquement \u00e0 des fins personnelles et non commerciales'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODAL ARCHETYPE
    // ═══════════════════════════════════════════════════════════════════════

    archetypeModal: {
        swipeHint: '\u2190 Glisser pour naviguer \u2192',
        keyPrinciples: 'Principes fondamentaux',
        notTheSameAs: 'Ce n\'est PAS',
        variants: 'Variantes',
        pathosLogos: 'Pathos & Logos',
        pathosLabel: 'Pathos (Niveau \u00e9motionnel)',
        logosLabel: 'Logos (Niveau rationnel)',
        confirmSelection: 'Confirmer la s\u00e9lection',
        definition: 'D\u00e9finition'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SYNTHESE
    // ═══════════════════════════════════════════════════════════════════════

    synthesis: {
        title: 'Synth\u00e8se relationnelle',
        compatibility: 'Compatibilit\u00e9',
        strengths: 'Points forts',
        challenges: 'D\u00e9fis',
        recommendations: 'Recommandations',
        overall: '\u00c9valuation globale',
        details: 'Afficher les d\u00e9tails'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FRICTION FORTE (Hard KO)
    // ═══════════════════════════════════════════════════════════════════════

    hardKO: {
        title: 'Friction \u00e9lev\u00e9e',
        subtitle: 'Cette combinaison n\u00e9cessite une conscience particuli\u00e8re',
        reasons: {
            hetero_same_gender: 'Directions d\'orientation diff\u00e9rentes',
            homo_different_gender: 'Les orientations pointent dans des directions diff\u00e9rentes',
            hetero_male_lesbian_female: 'Sch\u00e9mas d\'attirance diff\u00e9rents',
            lesbian_female_hetero_male: 'Directions d\'attirance diff\u00e9rentes',
            hetero_female_homo_male: 'Les orientations ne sont pas dirig\u00e9es l\'une vers l\'autre',
            homo_male_hetero_female: 'Directions d\'attirance diff\u00e9rentes'
        },
        friendship: 'D\'autres formes de relation sont possibles !',
        philosophy: 'Une friction \u00e9lev\u00e9e signifie un potentiel de croissance, pas une impossibilit\u00e9.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FRICTION MOYENNE (Soft KO)
    // ═══════════════════════════════════════════════════════════════════════

    softKO: {
        title: 'Friction moyenne',
        subtitle: 'Diff\u00e9rences dans des domaines importants',
        reasons: {
            needs_conflict: 'Vos besoins ont des intensit\u00e9s diff\u00e9rentes',
            dynamic_mismatch: 'Les styles de dynamique diff\u00e8rent',
            values_gap: 'Priorit\u00e9s diff\u00e9rentes dans les valeurs'
        },
        growth: 'La friction est un potentiel de croissance \u2013 avec de la conscience, elle devient d\u00e9veloppement.',
        conflictLabel: 'Potentiel de friction',
        needsLabel: 'Intensit\u00e9s de besoins diff\u00e9rentes'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NIVEAUX DE FRICTION
    // ═══════════════════════════════════════════════════════════════════════

    reibung: {
        stufen: {
            keine: { label: 'Aucune friction', emoji: '\u2728', range: '90-100%' },
            leicht: { label: 'Friction l\u00e9g\u00e8re', emoji: '\ud83c\udf31', range: '70-89%' },
            mittel: { label: 'Friction moyenne', emoji: '\ud83d\udd27', range: '40-69%' },
            hoch: { label: 'Friction \u00e9lev\u00e9e', emoji: '\u26a1', range: '10-39%' },
            maximal: { label: 'Friction maximale', emoji: '\ud83d\udd25', range: '0-9%' }
        },
        hinweise: {
            pirsig: 'La qualit\u00e9 na\u00eet de l\'int\u00e9gration des diff\u00e9rences',
            osho: 'Tout conditionnement peut \u00eatre consciemment transcend\u00e9',
            gfk: 'Derri\u00e8re chaque friction se cachent des besoins satisfaisables',
            rti: 'Les 5 piliers de l\'identit\u00e9 r\u00e9v\u00e8lent des potentiels de d\u00e9veloppement'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALIDATION P\u2194S (Primaire-Secondaire)
    // ═══════════════════════════════════════════════════════════════════════

    psValidation: {
        complementary: 'Primaire et Secondaire se compl\u00e8tent bien',
        conflicting: 'Primaire et Secondaire sont en tension',
        bonusApplied: 'Bonus pour combinaison P\u2194S compl\u00e9mentaire'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LABELS DE DIMENSIONS
    // ═══════════════════════════════════════════════════════════════════════

    dimensions: {
        geschlechtLabel: 'Identit\u00e9 de genre',
        dominanzLabel: 'Dominance',
        orientierungLabel: 'Orientation',
        gfkLabel: 'Comp\u00e9tence CNV',
        multiSelect: '(S\u00e9lection multiple)',
        legend: {
            primary: 'P',
            secondary: 'S',
            primaryFull: 'Primaire',
            secondaryFull: 'Secondaire'
        },
        gfkLevels: {
            niedrig: 'faible',
            mittel: 'moyen',
            hoch: '\u00e9lev\u00e9'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EN-TETES DE COLONNES
    // ═══════════════════════════════════════════════════════════════════════

    columns: {
        you: 'TOI',
        partner: 'PARTENAIRE',
        previousArchetype: 'Arch\u00e9type pr\u00e9c\u00e9dent',
        nextArchetype: 'Arch\u00e9type suivant',
        info: 'INFO',
        archetypeInfo: 'Info sur l\'arch\u00e9type'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // APERCU DE L'ANALYSE
    // ═══════════════════════════════════════════════════════════════════════

    analysisOverview: {
        youA: 'Toi :'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REPLIER/DEPLIER
    // ═══════════════════════════════════════════════════════════════════════

    foldUnfold: {
        fold: 'Replier',
        unfold: 'D\u00e9plier',
        foldAll: 'Tout replier',
        unfoldAll: 'Tout d\u00e9plier'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MENTIONS LEGALES
    // ═══════════════════════════════════════════════════════════════════════

    impressum: {
        title: 'Mentions l\u00e9gales',
        operator: 'Exploitant',
        project: 'Projet',
        contact: 'Contact'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODAL INFO GENRE
    // ═══════════════════════════════════════════════════════════════════════

    genderInfoModal: {
        title: 'Genre',
        intro: 'Choisis ton genre :',
        optionMann: 'Homme',
        optionMannDesc: 'Tu t\'identifies comme homme.',
        optionFrau: 'Femme',
        optionFrauDesc: 'Tu t\'identifies comme femme.',
        optionNonbinaer: 'Non-binaire',
        optionNonbinaerDesc: 'Tu ne t\'identifies ni exclusivement comme homme ni comme femme.',
        note: 'Note : Des sous-groupes comme Cis/Trans existent, mais ne sont pas diff\u00e9renci\u00e9s dans cette application, car ils n\'ont pas d\'impact sur le calcul de compatibilit\u00e9.',
        understood: 'Compris'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODAL AIDE ETENDU
    // ═══════════════════════════════════════════════════════════════════════

    helpModal: {
        title: 'Aide & Documentation',
        quickGuideTitle: 'Guide rapide',
        quickGuideItems: [
            '<strong>Mon type</strong> = Ton arch\u00e9type + propri\u00e9t\u00e9s (orientation, dominance, genre)',
            '<strong>Qualit\u00e9 relationnelle</strong> = Arch\u00e9type du partenaire + propri\u00e9t\u00e9s et calcul de compatibilit\u00e9',
            '<strong>Primaire</strong> = Ce que tu vis activement / <strong>Secondaire</strong> = Ce \u00e0 quoi tu es ouvert(e)',
            'Bouton <strong>INFO</strong> = D\u00e9tails sur l\'arch\u00e9type s\u00e9lectionn\u00e9',
            '<strong>R\u00e9sultat</strong> = Calcul automatique de la compatibilit\u00e9 (4 facteurs)',
            'Cliquer sur les <strong>pourcentages</strong> = Explication d\u00e9taill\u00e9e par facteur'
        ],
        newInVersion: 'Nouveau dans la version 1.4',
        newFeatures: [
            '<strong>Primaire/Secondaire :</strong> Choisis pour chaque propri\u00e9t\u00e9 si tu la vis activement ou si tu es simplement int\u00e9ress\u00e9(e)',
            '<strong>Auto-repli :</strong> Les sections Orientation et Dominance se ferment automatiquement apr\u00e8s la s\u00e9lection',
            '<strong>Messages d\'erreur am\u00e9lior\u00e9s :</strong> Les champs manquants sont list\u00e9s clairement',
            '<strong>Navigation mobile :</strong> Nouveaux boutons de navigation dans les modales pour une meilleure utilisation',
            '<strong>Affichage circulaire des scores :</strong> Les valeurs de compatibilit\u00e9 sont pr\u00e9sent\u00e9es de mani\u00e8re plus visuelle'
        ],
        feedbackPrompt: 'Questions, retours ou suggestions d\'am\u00e9lioration ?',
        sendComment: 'Envoyer un commentaire',
        viewAllComments: 'Tous les commentaires',
        documentation: 'Documentation'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SYNTHESE VOCALE
    // ═══════════════════════════════════════════════════════════════════════

    tts: {
        play: 'Lire \u00e0 voix haute',
        pause: 'Pause',
        stop: 'Arr\u00eater',
        resume: 'Reprendre',
        notSupported: 'La synth\u00e8se vocale n\'est pas prise en charge par ce navigateur'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION SYNTHESE
    // ═══════════════════════════════════════════════════════════════════════

    synthesisSection: {
        creativity: 'CR\u00c9ATIVIT\u00c9',
        dynamik: 'DYNAMIQUE',
        bringtMit: 'APPORTE',
        darausEntsteht: 'IL EN R\u00c9SULTE',
        gemeinsameBeduerfnisse: 'Besoins communs',
        philosophischeGrundlagen: 'Fondements philosophiques',
        pathos: 'Pathos',
        logos: 'Logos',
        staerken: 'Points forts',
        herausforderungen: 'D\u00e9fis',
        wachstumspotential: 'Potentiel de croissance',
        beduerfnisUebereinstimmung: 'Concordance des besoins',
        unterschiedlichePrioritaeten: 'Priorit\u00e9s diff\u00e9rentes'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PIED DE PAGE
    // ═══════════════════════════════════════════════════════════════════════

    footer: {
        datenschutz: 'Confidentialit\u00e9',
        nutzungsbedingungen: 'Conditions d\'utilisation',
        impressum: 'Mentions l\u00e9gales',
        copyright: 'Tous droits r\u00e9serv\u00e9s',
        rechtliches: 'Informations l\u00e9gales'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BESOINS CNV (Communication Non Violente)
    // ═══════════════════════════════════════════════════════════════════════

    needs: {
        // Labels de base
        matchLabel: 'Concordance des besoins',
        sharedTitle: 'BESOINS COMMUNS',
        differentTitle: 'PRIORIT\u00c9S DIFF\u00c9RENTES',
        valuesTitle: 'VALEURS COMMUNES',

        // Cat\u00e9gories
        categories: {
            existenz: 'Existence',
            sicherheit: 'S\u00e9curit\u00e9',
            zuneigung: 'Affection',
            verstaendnis: 'Compr\u00e9hension',
            freiheit: 'Libert\u00e9',
            teilnahme: 'Participation',
            musse: 'Loisir',
            identitaet: 'Identit\u00e9 & Sens',
            erschaffen: 'Cr\u00e9ation',
            verbundenheit: 'Connexion',
            dynamik: 'Dynamique & \u00c9change'
        },

        // Besoins individuels
        items: {
            // EXISTENCE
            luft: 'Air',
            wasser: 'Eau',
            nahrung: 'Nourriture',
            bewegung: 'Mouvement/Activit\u00e9',
            beruehrung: 'Toucher/Contact physique',
            erholung: 'Repos/Sommeil',
            sexueller_ausdruck: 'Expression sexuelle',
            sicherheit_physisch: 'S\u00e9curit\u00e9 physique',
            unterschlupf: 'Abri',

            // SECURITE
            bestaendigkeit: 'Constance',
            sich_sicher_fuehlen: 'Se sentir en s\u00e9curit\u00e9',
            schutz: 'Protection',
            stabilitaet: 'Stabilit\u00e9',
            leichtigkeit: 'L\u00e9g\u00e8ret\u00e9',
            geborgenheit: 'R\u00e9confort',

            // AFFECTION
            waerme: 'Chaleur',
            wertschaetzung: 'Estime',
            naehe: 'Proximit\u00e9',
            gesellschaft: 'Compagnie',
            intimitaet: 'Intimit\u00e9',
            liebe: 'Amour',
            fuersorge: 'Sollicitude',
            unterstuetzung: 'Soutien',
            fuereinander_da_sein: '\u00catre l\u00e0 l\'un pour l\'autre',

            // COMPREHENSION
            akzeptanz: 'Acceptation',
            mitgefuehl: 'Compassion',
            beruecksichtigung: 'Consid\u00e9ration',
            empathie: 'Empathie',
            vertrauen: 'Confiance',
            beachtung: 'Attention',
            gesehen_werden: '\u00catre vu(e)',
            verstanden_werden: '\u00catre compris(e)',
            harmonie: 'Harmonie',

            // LIBERTE
            selbstbestimmung: 'Autod\u00e9termination',
            waehlen_koennen: 'Pouvoir choisir',
            unabhaengigkeit: 'Ind\u00e9pendance',
            raum_haben: 'Avoir de l\'espace',
            spontaneitaet: 'Spontan\u00e9it\u00e9',

            // PARTICIPATION
            zusammenarbeit: 'Collaboration',
            kommunikation: 'Communication',
            gemeinschaft: 'Communaut\u00e9',
            zugehoerigkeit: 'Appartenance',
            gegenseitigkeit: 'R\u00e9ciprocit\u00e9',
            respekt: 'Respect',
            bedeutung_haben: 'Avoir de l\'importance',

            // LOISIR
            schoenheit: 'Beaut\u00e9',
            freizeit: 'Temps libre',
            freude: 'Joie',
            humor: 'Humour',

            // IDENTITE
            authentizitaet: 'Authenticit\u00e9',
            echtheit: 'Sincérit\u00e9',
            integritaet: 'Int\u00e9grit\u00e9',
            praesenz: 'Pr\u00e9sence',
            ordnung: 'Ordre',
            bewusstheit: 'Conscience',
            herausforderung: 'D\u00e9fi',
            klarheit: 'Clart\u00e9',
            kompetenz: 'Comp\u00e9tence',
            effizienz: 'Efficience\u00e9',
            wirksamkeit: 'Efficacité',
            wachstum: 'Croissance',
            sinn: 'Sens',
            beitrag_leisten: 'Apporter sa contribution',

            // CREATION
            kreativitaet: 'Cr\u00e9ativit\u00e9',
            entdecken: 'D\u00e9couvrir',
            lernen: 'Apprendre',
            selbst_ausdruck: 'Expression de soi',
            anreize_bekommen: 'Recevoir des stimulations',

            // CONNEXION
            leben_feiern: 'C\u00e9l\u00e9brer la vie',
            inspiration: 'Inspiration',
            trauer_ausdruecken: 'Exprimer le deuil',
            einsehen: 'Prendre conscience',
            anfang_ende: 'D\u00e9but & Fin',

            // DYNAMIQUE & ECHANGE
            kontrolle_ausueben: 'Exercer le contr\u00f4le',
            hingabe: 'D\u00e9votion',
            fuehrung_geben: 'Donner la direction',
            gefuehrt_werden: '\u00catre guid\u00e9(e)',
            ritual: 'Rituels & Structure',
            nachsorge: 'Soin après-coup',
            grenzen_setzen: 'Poser des limites',
            grenzen_respektieren: 'Respecter les limites',
            intensitaet: 'Vivre l\'intensit\u00e9',
            vertrauen_schenken: 'Accorder sa confiance',
            verantwortung_uebernehmen: 'Prendre ses responsabilit\u00e9s',
            sich_fallenlassen: 'Se laisser aller',
            machtaustausch: '\u00c9change de pouvoir',
            dienend_sein: '\u00catre au service',
            beschuetzen: 'Prot\u00e9ger'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // REVUE DE PROFIL (v1.8)
    // ═══════════════════════════════════════════════════════════════════════════════

    profileReview: {
        title: 'Tous les attributs pr\u00e9remplis',

        // Explication de la source des attributs
        sourceExplanation: {
            title: 'D\'o\u00f9 viennent ces valeurs ?',
            intro: 'Ces attributs ont \u00e9t\u00e9 calcul\u00e9s automatiquement sur la base de :',
            note: 'Tiage utilise 864 profils psychologiques issus de la recherche sur les relations (Gottman, Esther Perel, et al.). Les valeurs sont bas\u00e9es sur la distribution gaussienne de la population (Europe, Am\u00e9riques, Asie) : 80% \u00e9valuent l\'importance d\'un besoin entre 30 et 70 sur 100 points.',
            helpLink: 'Plus dans l\'aide'
        },

        categories: {
            geschlechtsidentitaet: 'IDENTIT\u00c9 DE GENRE',
            lebensplanung: 'PROJET DE VIE',
            finanzen: 'FINANCES & CARRI\u00c8RE',
            kommunikation: 'COMMUNICATION',
            soziales: 'SOCIAL',
            intimitaet: 'INTIMIT\u00c9',
            werte: 'VALEURS',
            praktisches: 'PRATIQUE'
        },

        attributes: {
            // ═══════════════════════════════════════════════════════════════════════
            // IDENTITE DE GENRE
            // ═══════════════════════════════════════════════════════════════════════
            geschlechtSekundaer: {
                label: 'Identit\u00e9 de genre',
                description: 'Identit\u00e9 de genre : Cis (identit\u00e9 = corps), Trans (identit\u00e9 \u2260 corps), En recherche (en exploration). Pour Inter : Non-binaire, Fluide, En recherche.',
                info: {
                    stats: 'Env. 0,5-1% de la population s\'identifie comme trans ou non-binaire (Williams Institute, 2022). Tendance \u00e0 la hausse gr\u00e2ce \u00e0 une meilleure acceptation.',
                    research: 'La congruence identitaire corr\u00e8le avec un bien-\u00eatre 40% plus \u00e9lev\u00e9 (American Psychological Association). L\'acceptation du partenaire est le plus fort pr\u00e9dicteur de satisfaction relationnelle.',
                    pirsig: 'La qu\u00eate d\'une identit\u00e9 authentique est une Qualit\u00e9 dynamique. \u00catre cis ne signifie pas automatiquement moins de conscience \u2013 la confirmation consciente de sa propre identit\u00e9 est tout aussi pr\u00e9cieuse.',
                    osho: 'Tu n\'es pas le corps, tu n\'es pas l\'esprit. D\u00e9couvre qui tu es vraiment \u2013 au-del\u00e0 de toutes les \u00e9tiquettes et attributions.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PROJET DE VIE
            // ═══════════════════════════════════════════════════════════════════════
            kinder: {
                label: 'D\u00e9sir d\'enfant',
                description: 'D\u00e9sir d\'avoir des enfants ou ouverture \u00e0 cette possibilit\u00e9 dans le futur.',
                info: {
                    stats: 'Question : \u00ab Souhaitez-vous des enfants ? \u00bb \u2013 79% des femmes et 72% des hommes (21-25 ans) expriment un d\u00e9sir d\'enfant (BZgA 2023). 56% consid\u00e8rent une planification familiale concordante comme importante pour la recherche de partenaire (Parship).',
                    research: '9% ont d\u00e9j\u00e0 v\u00e9cu une s\u00e9paration en raison de d\u00e9sirs d\'enfant diff\u00e9rents (ElitePartner). Institut Gottman : 94% des couples ayant des divergences sur le d\u00e9sir d\'enfant se s\u00e9parent \u00e0 long terme sans compromis.',
                    pirsig: 'Un enfant n\'est ni un projet ni un devoir. La question n\'est pas \u00ab dois-je ? \u00bb, mais \u00ab pourquoi est-ce que je le veux ? \u00bb \u2013 et si les deux r\u00e9ponses s\'harmonisent.',
                    osho: 'Les enfants ne sont pas le prolongement de ton ego. Ce sont des \u00e2mes ind\u00e9pendantes qui viennent \u00e0 travers toi, mais ne t\'appartiennent pas.'
                }
            },
            ehe: {
                label: 'D\u00e9sir de mariage',
                description: 'Importance d\'un mariage formel pour la relation.',
                info: {
                    stats: '60% des Allemands consid\u00e8rent le mariage comme important (Allensbach 2023). Chez les moins de 30 ans, seulement 42%.',
                    research: 'Les \u00e9tudes ne montrent aucune diff\u00e9rence significative de satisfaction relationnelle entre les couples mari\u00e9s et non mari\u00e9s de longue dur\u00e9e.',
                    pirsig: 'Le mariage est un sch\u00e9ma statique. Sa qualit\u00e9 ne r\u00e9side pas dans le contrat, mais dans le choix quotidien de l\'autre.',
                    osho: 'Le mariage peut \u00eatre une prison ou un temple. Tout d\u00e9pend s\'il est contract\u00e9 par peur ou par amour.'
                }
            },
            zusammen: {
                label: 'Vivre ensemble',
                description: 'Pr\u00e9f\u00e9rence pour la cohabitation ou des foyers s\u00e9par\u00e9s.',
                info: {
                    stats: '8% des couples allemands vivent en relation LAT (foyers s\u00e9par\u00e9s). Chez les plus de 60 ans, c\'est 15%.',
                    research: 'Les couples LAT rapportent une qualit\u00e9 relationnelle 12% plus \u00e9lev\u00e9e avec une proximit\u00e9 \u00e9motionnelle \u00e9quivalente (University of Missouri).',
                    pirsig: 'La proximit\u00e9 spatiale n\'\u00e9quivaut pas \u00e0 la proximit\u00e9 \u00e9motionnelle. La qualit\u00e9 na\u00eet de la pr\u00e9sence consciente, non de la proximit\u00e9 physique permanente.',
                    osho: 'Deux personnes peuvent \u00eatre seules dans la m\u00eame pi\u00e8ce \u2013 ou connect\u00e9es dans des villes diff\u00e9rentes. La v\u00e9ritable intimit\u00e9 n\'a pas besoin d\'une cl\u00e9 commune.'
                }
            },
            haustiere: {
                label: 'Animaux de compagnie',
                description: 'Attitude envers les animaux de compagnie dans le foyer commun.',
                info: {
                    stats: '47% des foyers allemands ont des animaux de compagnie. 78% des propri\u00e9taires consid\u00e8rent leur animal comme un membre de la famille.',
                    research: 'Les propri\u00e9taires d\'animaux pr\u00e9sentent des niveaux de cortisol 20% plus bas. Les soins partag\u00e9s d\'un animal renforcent le lien du couple.',
                    pirsig: 'Un animal nous enseigne quelque chose d\'essentiel dans les relations : la pr\u00e9sence inconditionnelle sans attente de changement.',
                    osho: 'Les animaux vivent dans l\'instant. Ils nous rappellent que l\'amour n\'a pas besoin de penser \u2013 seulement d\'\u00eatre.'
                }
            },
            umzug: {
                label: 'Disposition \u00e0 d\u00e9m\u00e9nager',
                description: 'Disposition \u00e0 changer de lieu de r\u00e9sidence pour la relation.',
                info: {
                    stats: '35% des Allemands seraient pr\u00eats \u00e0 d\u00e9m\u00e9nager par amour. Chez les moins de 30 ans, c\'est 58%.',
                    research: 'Les relations \u00e0 distance ont le m\u00eame taux de r\u00e9ussite que les relations de proximit\u00e9 \u2013 \u00e0 condition qu\'un objectif commun existe.',
                    pirsig: 'La flexibilit\u00e9 est une Qualit\u00e9 dynamique. La question n\'est pas qui d\u00e9m\u00e9nage, mais : la relation grandit-elle gr\u00e2ce \u00e0 cette d\u00e9cision ?',
                    osho: 'Des racines et des ailes \u2013 qui n\'a que des racines ne peut pas voler. Qui n\'a que des ailes ne trouve pas le repos. L\'art, c\'est d\'avoir les deux.'
                }
            },
            familie: {
                label: 'Importance de la famille',
                description: 'Place de la famille d\'origine et contact r\u00e9gulier.',
                info: {
                    stats: '67% des Allemands voient leur famille d\'origine au moins une fois par mois. 12% n\'ont aucun contact.',
                    research: 'Les conflits avec la belle-famille sont un facteur principal dans 40% des divorces (\u00e9tude Terling-Watt).',
                    pirsig: 'La famille est un sch\u00e9ma statique du pass\u00e9. L\'art est de l\'honorer sans se laisser d\u00e9finir par elle.',
                    osho: 'Tu peux aimer tes parents sans suivre leurs souhaits. Le respect ne signifie pas l\'ob\u00e9issance.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // FINANCES & CARRIERE
            // ═══════════════════════════════════════════════════════════════════════
            finanzen: {
                label: 'Finances',
                description: 'Gestion de l\'argent : comptes s\u00e9par\u00e9s, mod\u00e8le mixte ou caisse commune.',
                info: {
                    stats: '42% des couples ont des finances compl\u00e8tement s\u00e9par\u00e9es. 31% utilisent un mod\u00e8le \u00e0 trois comptes. 27% ont une caisse commune.',
                    research: 'L\'argent est le sujet de dispute n\u00b01 chez les couples. La transparence r\u00e9duit les conflits de 70% (Kansas State University).',
                    pirsig: 'L\'argent est un outil, pas une mesure de valeur. La question n\'est pas combien, mais : sert-il votre Qualit\u00e9 commune ?',
                    osho: 'L\'argent est comme l\'eau \u2013 il doit couler. Celui qui le retient s\'\u00e9touffe. Celui qui sait partager s\'enrichit de confiance.'
                }
            },
            karriere: {
                label: 'Priorit\u00e9 carri\u00e8re',
                description: '\u00c9quilibre entre r\u00e9ussite professionnelle et vie de famille.',
                info: {
                    stats: '58% des Allemands priorisent l\'\u00e9quilibre vie pro/vie perso par rapport \u00e0 la carri\u00e8re (Gallup 2023).',
                    research: 'Les couples \u00e0 double carri\u00e8re ont des taux de divorce plus \u00e9lev\u00e9s \u2013 mais seulement lorsque des attentes de r\u00f4les traditionnels persistent.',
                    pirsig: 'La carri\u00e8re sans sens est une roue de hamster. Le sens sans action est de la r\u00eaverie. La Qualit\u00e9 r\u00e9side dans l\'int\u00e9gration des deux.',
                    osho: 'Le travail peut \u00eatre m\u00e9ditation \u2013 quand tu ne travailles pas pour la reconnaissance, mais parce que le travail lui-m\u00eame est joie.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // COMMUNICATION
            // ═══════════════════════════════════════════════════════════════════════
            gespraech: {
                label: 'Besoin de conversation',
                description: 'Besoin d\'\u00e9changes et de conversations au quotidien.',
                info: {
                    stats: 'Les couples heureux se parlent en moyenne 5+ heures par semaine (hors logistique quotidienne).',
                    research: 'Gottman : \u00ab Bid-Response-Ratio \u00bb au-dessus de 85% = relation stable. En dessous de 33% = risque \u00e9lev\u00e9 de s\u00e9paration.',
                    pirsig: 'Les mots peuvent \u00eatre des ponts ou des murs. La Qualit\u00e9 ne na\u00eet pas de la quantit\u00e9, mais de l\'\u00e9coute authentique.',
                    osho: 'La v\u00e9ritable communication se produit dans le silence entre les mots. Celui qui sait \u00e9couter n\'a pas besoin de beaucoup parler.'
                }
            },
            emotional: {
                label: 'Ouverture \u00e9motionnelle',
                description: 'Disposition \u00e0 partager ses sentiments et \u00e9motions.',
                info: {
                    stats: 'Les hommes partagent leurs sentiments en moyenne 60% moins souvent que les femmes (m\u00e9ta-analyse, 2021).',
                    research: 'L\'auto-r\u00e9v\u00e9lation \u00e9motionnelle augmente l\'intimit\u00e9 de 45% \u2013 mais seulement avec une ouverture r\u00e9ciproque.',
                    pirsig: 'Montrer ses sentiments demande le courage de la vuln\u00e9rabilit\u00e9. Ce n\'est pas une faiblesse, mais la plus haute Qualit\u00e9 de l\'\u00eatre humain.',
                    osho: 'Quand tu caches tes larmes, tu caches aussi ton rire. L\'authenticit\u00e9 ne conna\u00eet pas de demi-mesures.'
                }
            },
            konflikt: {
                label: 'Comportement en conflit',
                description: 'Mode de gestion des conflits : \u00e9vitement ou confrontation directe.',
                info: {
                    stats: '44% des couples \u00e9vitent les conflits. 23% escaladent r\u00e9guli\u00e8rement. 33% r\u00e9solvent de mani\u00e8re constructive.',
                    research: 'Gottman : L\'\u00e9vitement des conflits est plus nuisible que la dispute. Ce qui compte, c\'est le ratio : 5:1 positif/n\u00e9gatif.',
                    pirsig: 'Le conflit n\'est pas le probl\u00e8me \u2013 c\'est l\'immobilisme. La Qualit\u00e9 dynamique na\u00eet de la friction, pas de l\'\u00e9vitement.',
                    osho: 'La dispute peut \u00eatre purificatrice comme un orage. Ce n\'est pas la dispute qui d\u00e9truit, mais le non-dit.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // SOCIAL
            // ═══════════════════════════════════════════════════════════════════════
            introextro: {
                label: 'Intro-/Extraverti',
                description: '\u00c9nergie par la solitude (Intro) ou les contacts sociaux (Extra).',
                info: {
                    stats: '25-40% de la population est introvertie. Les ambivertis forment le groupe le plus important.',
                    research: 'Les couples Intro-Extra peuvent bien fonctionner quand les deux respectent leurs diff\u00e9rences au lieu de vouloir les changer.',
                    pirsig: 'L\'introversion n\'est pas de la timidit\u00e9, l\'extraversion n\'est pas de la superficialit\u00e9. Les deux sont des chemins l\u00e9gitimes vers la Qualit\u00e9.',
                    osho: 'L\'introverti cherche la profondeur, l\'extraverti l\'\u00e9tendue. Tous deux cherchent la m\u00eame chose par des chemins diff\u00e9rents.'
                }
            },
            alleinzeit: {
                label: 'Besoin de solitude',
                description: 'Besoin de temps pour soi, sans partenaire.',
                info: {
                    stats: '72% des personnes ont r\u00e9guli\u00e8rement besoin de temps seul(e). 28% se sentent seul(e)s pendant ce temps.',
                    research: 'Les partenaires qui respectent le temps individuel rapportent une satisfaction relationnelle 30% plus \u00e9lev\u00e9e.',
                    pirsig: 'Le temps seul n\'est pas l\'absence d\'amour \u2013 c\'est la pr\u00e9sence \u00e0 soi-m\u00eame. Seul celui qui se conna\u00eet peut se donner.',
                    osho: 'La solitude et l\'\u00eatre-seul sont fondamentalement diff\u00e9rents. L\'\u00eatre-seul est plein de joie \u2013 la solitude est pauvret\u00e9 malgr\u00e9 la compagnie.'
                }
            },
            freunde: {
                label: 'Cercle d\'amis',
                description: 'Pr\u00e9f\u00e9rence pour des amis propres ou un cercle d\'amis commun.',
                info: {
                    stats: '61% des couples partagent en grande partie leur cercle d\'amis. 15% ont des amis compl\u00e8tement s\u00e9par\u00e9s.',
                    research: 'Les amis communs stabilisent les relations \u2013 mais augmentent aussi la pression sociale lors des s\u00e9parations.',
                    pirsig: 'Les amiti\u00e9s en dehors de la relation ne sont pas une menace \u2013 elles sont une nourriture pour l\'individualit\u00e9.',
                    osho: 'Une relation qui ne permet aucune autre relation est une prison, pas de l\'amour.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // INTIMITE
            // ═══════════════════════════════════════════════════════════════════════
            naehe: {
                label: 'Proximit\u00e9 physique',
                description: 'Besoin de toucher, de c\u00e2lins et de proximit\u00e9 physique.',
                info: {
                    stats: 'Les \u00eatres humains ont besoin de 4 \u00e0 12 c\u00e2lins par jour pour le bien-\u00eatre \u00e9motionnel (Virginia Satir).',
                    research: 'Les c\u00e2lins de 20 secondes lib\u00e8rent de l\'ocytocine et r\u00e9duisent significativement la tension art\u00e9rielle et le cortisol.',
                    pirsig: 'Le toucher physique est une communication non verbale de la plus haute Qualit\u00e9. Il n\'a besoin d\'aucune interpr\u00e9tation.',
                    osho: 'Le corps est le temple. Un toucher peut dire plus que mille mots \u2013 quand il est conscient.'
                }
            },
            romantik: {
                label: 'Besoin de romantisme',
                description: 'D\u00e9sir de gestes romantiques, de surprises et de rendez-vous.',
                info: {
                    stats: '67% des femmes et 51% des hommes souhaitent plus de romantisme dans la relation.',
                    research: 'Les soir\u00e9es en t\u00eate-\u00e0-t\u00eate r\u00e9guli\u00e8res augmentent la satisfaction relationnelle de 36% (National Marriage Project).',
                    pirsig: 'Le romantisme n\'est pas du kitsch \u2013 c\'est l\'attention consciente port\u00e9e \u00e0 l\'extraordinaire de l\'ordinaire.',
                    osho: 'Le romantisme meurt quand l\'amour devient habitude. Garde les yeux du commencement ouverts.'
                }
            },
            sex: {
                label: 'Fr\u00e9quence sexuelle',
                description: 'Fr\u00e9quence d\'intimit\u00e9 souhait\u00e9e dans la relation.',
                info: {
                    stats: 'Les couples allemands ont des rapports sexuels en moyenne 1,5 fois par semaine. 15% sont dans des \u00ab mariages sans sexe \u00bb (<10 fois/an).',
                    research: 'La fr\u00e9quence corr\u00e8le peu avec la satisfaction. Ce qui compte, c\'est que les deux se sentent compris.',
                    pirsig: 'La sexualit\u00e9 n\'est pas quantifiable. La Qualit\u00e9 r\u00e9side dans la pr\u00e9sence, pas dans les statistiques.',
                    osho: 'Le sexe peut \u00eatre m\u00e9ditation \u2013 quand il na\u00eet de la pr\u00e9sence plut\u00f4t que du d\u00e9sir. Alors une fois vaut mille fois.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // VALEURS
            // ═══════════════════════════════════════════════════════════════════════
            religion: {
                label: 'Religiosit\u00e9',
                description: 'Importance de la religion et de la spiritualit\u00e9 au quotidien.',
                info: {
                    stats: '52% des Allemands croient en Dieu. 27% pratiquent activement. Les mariages interreligieux repr\u00e9sentent 24%.',
                    research: 'L\'homogamie religieuse (m\u00eame foi) corr\u00e8le avec des mariages plus longs \u2013 mais les ath\u00e9es ont une stabilit\u00e9 similaire.',
                    pirsig: 'La religion est une tentative de saisir la Qualit\u00e9 statique. La spiritualit\u00e9 vit dans la recherche dynamique elle-m\u00eame.',
                    osho: 'La religion ne devrait pas \u00eatre un credo, mais une exp\u00e9rience. Ce que tu n\'as pas v\u00e9cu toi-m\u00eame n\'est qu\'information.'
                }
            },
            tradition: {
                label: 'Tradition vs. Modernit\u00e9',
                description: 'Orientation vers des valeurs traditionnelles ou des modes de vie modernes.',
                info: {
                    stats: '38% des Allemands pr\u00e9f\u00e8rent les valeurs traditionnelles. \u00c9cart g\u00e9n\u00e9rationnel : 60+ vs. 18-30 = 52% vs. 21%.',
                    research: 'La congruence des valeurs est plus importante que la direction. Les couples mixtes (trad+moderne) rapportent plus de conflits.',
                    pirsig: 'La tradition est une Qualit\u00e9 statique \u2013 pr\u00e9cieuse quand elle soutient, handicapante quand elle encha\u00eene. L\'art est dans la distinction.',
                    osho: 'La tradition est la cendre du feu des g\u00e9n\u00e9rations pass\u00e9es. Cherche le feu, pas la cendre.'
                }
            },
            umwelt: {
                label: 'Conscience \u00e9cologique',
                description: 'Importance de la durabilit\u00e9 et d\'un mode de vie \u00e9coresponsable.',
                info: {
                    stats: '68% des Allemands consid\u00e8rent la protection du climat comme importante. 23% modifient activement leur comportement.',
                    research: 'Les divergences de valeurs sur la durabilit\u00e9 conduisent \u00e0 des micro-conflits quotidiens (achats, mobilit\u00e9, consommation).',
                    pirsig: 'La conscience \u00e9cologique est la reconnaissance que nous ne sommes pas s\u00e9par\u00e9s de la nature. Chaque action a des cons\u00e9quences.',
                    osho: 'La Terre n\'est pas ta propri\u00e9t\u00e9 \u2013 tu es son invit\u00e9. Les invit\u00e9s laissent la maison plus belle qu\'ils ne l\'ont trouv\u00e9e.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PRATIQUE
            // ═══════════════════════════════════════════════════════════════════════
            ordnung: {
                label: 'Ordre',
                description: 'Pr\u00e9f\u00e9rence pour l\'ordre et la propret\u00e9 dans le logement.',
                info: {
                    stats: 'La gestion du m\u00e9nage est dans le top 5 des sujets de dispute des couples. 62% des femmes portent la charge principale \u2013 tendance \u00e0 la baisse.',
                    research: 'La r\u00e9partition in\u00e9gale du m\u00e9nage r\u00e9duit la satisfaction sexuelle des femmes de 50%.',
                    pirsig: 'L\'ordre n\'est pas le contr\u00f4le \u2013 c\'est la clart\u00e9 de l\'espace pour la clart\u00e9 de l\'esprit.',
                    osho: 'L\'ordre ext\u00e9rieur refl\u00e8te l\'ordre int\u00e9rieur. Mais le rangement compulsif peut aussi \u00eatre une fuite devant le chaos int\u00e9rieur.'
                }
            },
            reise: {
                label: 'Fr\u00e9quence de voyage',
                description: 'D\u00e9sir de voyages et de vacances en commun.',
                info: {
                    stats: 'Les Allemands voyagent en moyenne 2,4 fois par an. 18% jamais. Les diff\u00e9rences en mati\u00e8re de voyage sont un conflit fr\u00e9quent.',
                    research: 'Les exp\u00e9riences partag\u00e9es (pas les cadeaux mat\u00e9riels) renforcent le lien du couple le plus durablement.',
                    pirsig: 'Le voyage \u00e9largit les sch\u00e9mas statiques du quotidien. Les nouvelles exp\u00e9riences sont de la Qualit\u00e9 dynamique \u00e0 l\'\u00e9tat pur.',
                    osho: 'Le voyage le plus important est celui vers l\'int\u00e9rieur. Mais parfois, il faut un mouvement ext\u00e9rieur pour d\u00e9bloquer l\'immobilisme int\u00e9rieur.'
                }
            }
        },

        slider: {
            niedrig: 'Faible',
            mittel: 'Moyen',
            hoch: '\u00c9lev\u00e9',
            getrennt: 'S\u00e9par\u00e9',
            hybrid: 'Hybride',
            gemeinsam: 'Commun',
            familie: 'Famille',
            balance: '\u00c9quilibre',
            karriere: 'Carri\u00e8re',
            unwichtig: 'Sans importance',
            wichtig: 'Important',
            sehrWichtig: 'Tr\u00e8s important'
        },

        actions: {
            reset: 'R\u00e9initialiser',
            save: 'Continuer',
            close: 'Fermer'
        },

        infoModal: {
            statistik: 'STATISTIQUES',
            forschung: 'RECHERCHE',
            pirsig: 'PIRSIG',
            osho: 'OSHO',
            verstanden: 'Compris'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COLONNE CENTRALE (Résonance, Pondération, AGOD, Score)
    // ═══════════════════════════════════════════════════════════════════════

    center: {
        resonanzHeading: 'Facteurs de résonance',
        gewichtungHeading: 'Pondération',
        gewichtungDesc: '0 = Ignorer · 1 = Normal · 2 = Important',
        agodLabels: {
            A: 'ARCHÉTYPE',
            G: 'GENRE',
            O: 'ORIENTATION',
            D: 'DOMINANCE'
        },
        agodTitles: {
            A: 'Archétype - Pondération',
            G: 'Genre - Pondération',
            O: 'Orientation - Pondération',
            D: 'Dominance - Pondération'
        },
        syntheseScoreLabel: 'TI-AGE SCORE DE SYNTHÈSE',
        findMatch: 'TROUVER UN PARTENAIRE',
        findMatchTitle: 'Trouver le meilleur partenaire - teste les 864 combinaisons',
        pleaseSelect: '– Veuillez sélectionner –',
        noArchetypeSelected: 'Aucun archétype sélectionné',
        resetWeights: 'Par défaut (tous à 1)',
        openSynthese: 'Ouvrir Ti-Age Synthèse',
        rFactorTitles: {
            R1: 'R1 - Vie (Orientation)',
            R2: 'R2 - Philosophie (Archétype)',
            R3: 'R3 - Kink (Dominance)',
            R4: 'R4 - Identité (Genre)'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EN-TÊTE / BARRE VISITEUR
    // ═══════════════════════════════════════════════════════════════════════

    header: {
        visitorBadge: 'Visiteur',
        privacyNotice: 'Anonyme – aucune donnée personnelle',
        privacyTitle: 'Aucune donnée personnelle n\'est enregistrée',
        clearBtn: 'Effacer',
        clearTitle: 'Supprimer toutes les données sauvegardées et réinitialiser l\'interface'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ÉTIQUETTES DE DIMENSIONS + LÉGENDES
    // ═══════════════════════════════════════════════════════════════════════

    dimensionLabels: {
        geschlecht: 'GENRE',
        orientierung: 'ORIENTATION',
        dominanz: 'DOMINANCE',
        gfk: 'COMPÉTENCE CNV',
        primarySecondaryRules: '(P=Primaire, S=Secondaire - Règles)',
        primarySecondary: '(P=Primaire, S=Secondaire)',
        gfkAutoDesc: 'La compétence CNV est calculée automatiquement en fonction des archétypes relationnels sélectionnés.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NAVIGATION MOBILE
    // ═══════════════════════════════════════════════════════════════════════

    mobile: {
        next: 'Suivant →',
        nextToPartner: 'Suivant : Partenaire →',
        resetSelection: 'Réinitialiser la sélection',
        yourPartner: 'VOTRE PARTENAIRE',
        bestMatchTitle: 'Best Match Finder',
        bestMatchDesc: 'Trouvez le meilleur partenaire basé sur votre profil',
        testsAllCombinations: 'Teste les 864 combinaisons d\'archétypes',
        selectManually: 'Sélectionner le partenaire manuellement →',
        pageTitlePartner: 'Votre Partenaire',
        pageTitleBestMatch: 'Trouver un Partenaire'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PILIERS RTI (Petzold)
    // ═══════════════════════════════════════════════════════════════════════

    rti: {
        pillars: {
            S1: 'Corporéité',
            S2: 'Réseau social',
            S3: 'Autonomie',
            S4: 'Sécurité',
            S5: 'Valeurs & Sens'
        },
        clickForDef: 'Cliquer pour la définition'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODALES
    // ═══════════════════════════════════════════════════════════════════════

    modals: {
        resonanzTitle: 'Facteurs de résonance',
        resonanzHelpTitle: 'Facteurs de résonance - Calcul',
        adjustAttributes: 'Modifier MES attributs',
        commentTitle: 'Envoyer un commentaire',
        visitorNr: 'Visiteur n°',
        whatDoYouThink: 'Qu\'en pensez-vous ?',
        commentPlaceholder: 'Écrivez vos pensées ici...',
        maxChars: 'Max. 2000 caractères',
        submit: 'Envoyer',
        factorDetails: 'Détails du facteur',
        compatibilityAnalysis: 'Analyse de compatibilité',
        statisticalMatch: 'Correspondance statistique des archétypes',
        definition: 'Définition',
        beduerfnisseAnpassen: 'Modifier les besoins',
        syntheseTitle: 'Ti-Age Synthèse',
        // Resonanz-Modal
        resonanzHeading: 'Facteurs de résonance (R1-R4)',
        resonanzCoherence: 'Cohérence entre besoins et archétype',
        prevArchetype: 'Archétype précédent',
        nextArchetype: 'Archétype suivant',
        rFactorAgod: 'R-Facteur → AGOD',
        paarung: 'APPARIEMENT',
        tableWhat: 'Que montre ce tableau ?',
        tableIchPartner: 'Cohérence entre besoins et archétype choisi.',
        tablePaarung: 'R_MOI × R_PARTENAIRE (produit des valeurs de cohérence individuelles).',
        tablePaarungMultiplies: 'La valeur d\'APPARIEMENT multiplie le score AGOD respectif :',
        legendBoost: '● >1.0 = renforce le score',
        legendNeutral: '● =1.0 = neutre',
        legendWeaken: '● <1.0 = affaiblit le score',
        lockManual: '🔒 = verrouillé manuellement (ne change pas au changement d\'archétype)',
        lockAuto: '🔓 = automatique (recalculé au changement d\'archétype)',
        tipClickValue: '💡 Astuce : Cliquez sur une valeur MOI ou PARTENAIRE pour voir la dérivation complète !'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FFH (Fit, Fucked up, Horny)
    // ═══════════════════════════════════════════════════════════════════════

    ffh: {
        fit: 'Fit',
        fitDesc: 'Le sport et la forme physique sont importants pour vous.',
        fuckedup: 'Fucked up',
        fuckedupDesc: 'Vous avez un style de vie non conventionnel ou intense.',
        horny: 'Horny',
        hornyDesc: 'La sexualité joue un rôle important dans votre vie.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MESSAGES TOAST
    // ═══════════════════════════════════════════════════════════════════════

    toast: {
        locked: 'Valeur verrouillée et sauvegardée',
        unlocked: 'Valeur déverrouillée',
        selectAllDimensions: 'Veuillez sélectionner toutes les dimensions.',
        noNeedsData: 'Aucune donnée sur les besoins disponible',
        saved: 'Sauvegardé !'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ÉDITEUR DE BESOINS
    // ═══════════════════════════════════════════════════════════════════════

    needsEditor: {
        pageTitle: 'Éditeur de besoins',
        allNeeds: 'Tous les besoins',
        analyzing: '219 besoins en cours d\'analyse...'
    },

    synthese: {
        title: 'Ti-Age Synthèse',
        compatibilityAnalysis: 'Analyse de compatibilité',
        scoreProContra: 'Score – Pour & Contre',
        oshoZenTarot: 'Osho Zen Tarot',
        sharedNeeds: 'Besoins partagés',
        gfkAnalysis: 'Analyse des besoins CNV',
        needsMatchWithDiff: 'Correspondance des besoins avec différence',
        fivePillars: '5 Piliers de l\'identité',
        rtiSubtitle: 'RTI selon Petzold – Analyse des frictions',
        baseArchetype: 'Archétype de base :',
        totalScore: 'Score total :',
        modifiersIncrease: 'Les modificateurs augmentent le score de +{diff} points de pourcentage',
        modifiersDecrease: 'Les modificateurs réduisent le score de {diff} points de pourcentage',
        whatWorks: '✓ Ce qui fonctionne',
        challengesLabel: '✗ Défis',
        noDataAvailable: 'Aucune donnée disponible.',
        archetypeBaseValues: 'Valeurs de base de l\'archétype',
        archetypeBaseValuesDesc: 'Valeurs individualisées non disponibles. Les valeurs standard de l\'archétype sont affichées.',
        needsMatchLabel: 'Correspondance des besoins :',
        sharedCompatible: '✓ Besoins partagés & compatibles',
        challengingDiffs: '✗ Différences exigeantes',
        sharedCount: '{count} besoins partagés & compatibles',
        diffCount: '{count} priorités différentes',
        noNeedsData: 'Aucune donnée sur les besoins disponible.',
        rtiNotAvailable: 'Calcul RTI non disponible (modules manquants).',
        identityHarmony: 'Harmonie de l\'identité',
        rtiFullTitle: 'RTI selon Petzold – 5 Piliers de l\'identité',
        rtiExplanation: 'Chaque pilier représente un aspect fondamental de l\'identité humaine. La friction naît lorsque les besoins d\'un pilier sont exprimés différemment.',
        highFriction: 'Friction élevée',
        mediumFriction: 'Friction moyenne',
        perspectiveHints: 'Notes de perspective :',
        harmony: 'Harmonie',
        dimensionScores: 'Scores de dimension (A-F)',
        pillarDesc: {
            S1: 'Corps, Santé, Sexualité',
            S2: 'Type de relation, Amis, Famille',
            S3: 'Autodétermination, Travail, Réussite',
            S4: 'Stabilité, Finances, Logement',
            S5: 'Spiritualité, Éthique, Sens'
        },
        resonanzCoherence: 'Cohérence entre besoins et archétype',
        whatShowsTable: 'Que montre ce tableau ?',
        tipClickValue: 'Astuce : Cliquez sur une valeur MOI ou PARTENAIRE pour voir la dérivation complète !',
        manuallyLocked: 'Verrouillé manuellement (modifier dans Attributs)',
        autoCalculated: 'Calculé automatiquement',
        multiplied: '→ multiplié',
        boostsScore: 'renforce le score',
        neutralLabel: 'neutre',
        weakensScore: 'affaiblit le score',
        lockedNoChange: 'verrouillé manuellement (ne change pas au changement d\'archétype)',
        resonanzXperspektiven: 'FACTEURS DE RÉSONANCE × PERSPECTIVES',
        weakensPercent: '−% affaiblit',
        factorLabels: { R1: 'Vie', R2: 'Philosophie', R3: 'Dynamique', R4: 'Identité' },
        factorDescs: {
            R1: 'Existence, Affection, Loisirs, Intimité & Romance',
            R2: 'Liberté, Participation, Identité, Planification, Finances, Valeurs, Social, Pratique',
            R3: 'Dynamique, Sécurité',
            R4: 'Compréhension, Création, Connexion, Communication'
        },
        perspectives: {
            statistik: 'Statistiques',
            statistikDesc: 'Besoins fondamentaux prouvés empiriquement',
            konditionierung: 'Conditionnement',
            konditionierungDesc: 'Besoins naturels vs. acquis',
            qualitaet: 'Qualité',
            qualitaetDesc: 'Aspects de qualité statiques vs. dynamiques',
            machtdynamik: 'Dynamiques de pouvoir conscientes et consentement'
        },
        oshoLoading: 'Le module Osho Zen est en cours de chargement...',
        oshoLoadingTexts: 'Chargement des textes Osho Zen...',
        oshoLoadingData: 'Chargement des données Osho Zen...',
        oshoNoSharedNeeds: 'Aucun besoin commun trouvé.',
        oshoEnsureProfiles: 'Assurez-vous que les deux profils ont rempli leurs besoins.',
        oshoTopNeeds: '🔥 Vos Top {count} besoins communs',
        oshoBasedOn: 'Basé sur la correspondance de vos profils de besoins',
        oshoNeedAlt: 'Besoin {label}',
        oshoFooter: 'Contenu inspiré par le Tarot Osho Zen de Ma Deva Padma (St. Martins Press), basé sur les enseignements d\'Osho. Tous droits réservés aux détenteurs respectifs.',
        dynamikBoth: 'Votre dynamique vit de {dynamik} – le potentiel de croissance se trouve dans {wachstum}.',
        dynamikOnly: 'Votre dynamique se déploie à travers {dynamik}.',
        growthOnly: 'Le potentiel de croissance se manifeste dans {wachstum}.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // WORKFLOW-GUIDE (Floating Panel)
    // ═══════════════════════════════════════════════════════════════════════

    workflow: {
        stepOf: '\u00c9tape {current} sur {total}',
        minimize: 'Minimiser',
        maximize: 'Guide du Workflow',
        greeting: {
            title: 'Bienvenue sur Ti-Age',
            desc: 'Ce n\'est pas du matching. C\'est une conversation avec toi-m\u00eame \u2013 sur ce que tu veux vraiment.',
            philosophy: 'Tiage ne calcule pas de partenaires id\u00e9aux. Il te montre quels sch\u00e9mas tu vis dans tes relations \u2013 et o\u00f9 tu te distingues de tes \u00e9tiquettes.',
            expandHint: 'Que m\'attend-il ?',
            expandedContent: 'Tu feras des choix : Arch\u00e9type, Orientation, Dominance, Genre. Chaque s\u00e9lection charge des attentes statistiques. Ensuite tu montres o\u00f9 tu es diff\u00e9rent. Prends ton temps. Il n\'y a pas de mauvaises r\u00e9ponses.'
        },
        returning: {
            title: 'Bon retour',
            desc: 'Tu es de retour. Ton profil t\'attend \u2013 tel que tu l\'as laiss\u00e9.',
            philosophy: 'Tes valeurs verrouill\u00e9es sont toujours l\u00e0. Elles restent, quelles que soient les \u00e9tiquettes que tu essaies. Si tu as chang\u00e9 : le mod\u00e8le aussi.'
        },
        step1: {
            title: 'Choisis ton Arch\u00e9type',
            desc: 'Ton mod\u00e8le relationnel d\u00e9finit comment tu vis l\'amour et le partenariat. De la monogamie classique (Duo) \u00e0 l\'anarchie relationnelle (RA) \u2013 il n\'y a ni juste ni faux.',
            philosophy: '\u00ab La qualit\u00e9 commence par la connaissance de soi. Qui suis-je en amour ? \u00bb \u2014 Pirsig'
        },
        step2: {
            title: 'D\u00e9finis tes Dimensions',
            desc: 'Genre, orientation sexuelle et pr\u00e9f\u00e9rence de dominance forment ton profil. Primaire = v\u00e9cu, Secondaire = int\u00e9ress\u00e9.',
            philosophy: '\u00ab Tu n\'es pas le corps, pas l\'esprit. D\u00e9couvre qui tu es au-del\u00e0 de toutes les \u00e9tiquettes. \u00bb \u2014 Osho'
        },
        step3: {
            title: 'Choisis l\'Arch\u00e9type du Partenaire',
            desc: 'Quel mod\u00e8le relationnel vit ton partenaire ? Si tu n\'es pas s\u00fbr : essaie diff\u00e9rentes combinaisons.',
            philosophy: '\u00ab L\'autre n\'est pas un objet, mais un miroir. Ce que tu cherches refl\u00e8te ce que tu es. \u00bb \u2014 Pirsig'
        },
        step4: {
            title: 'D\u00e9finis les Dimensions du Partenaire',
            desc: 'Saisis le genre, l\'orientation et la dominance de ton partenaire. Des donn\u00e9es plus pr\u00e9cises = des r\u00e9sultats plus pr\u00e9cis.',
            philosophy: '\u00ab Percevoir sans juger est la plus haute forme d\'intelligence. \u00bb \u2014 Osho'
        },
        step5: {
            title: 'Explorer les R\u00e9sultats',
            desc: 'Clique sur la Synth\u00e8se Ti-Age compl\u00e8te. Les facteurs de r\u00e9sonance montrent o\u00f9 vos sch\u00e9mas s\'harmonisent ou entrent en conflit.',
            philosophy: '\u00ab La qualit\u00e9 n\'est pas un jugement \u2014 c\'est l\'exp\u00e9rience de l\'alignement. \u00bb \u2014 Pirsig'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_FR;
}
