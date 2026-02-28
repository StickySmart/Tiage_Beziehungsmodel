/**
 * TRADUZIONI ITALIANE
 *
 * Tutti i testi dell'interfaccia per la versione in lingua italiana.
 *
 * © 2025 Ti-age.de Tutti i diritti riservati.
 */

var TiageLocale_IT = {
    code: 'it',
    name: 'Italiano',

    // ═══════════════════════════════════════════════════════════════════════
    // TESTI GENERALI DELL'INTERFACCIA
    // ═══════════════════════════════════════════════════════════════════════

    ui: {
        title: 'Il principio anarchico Ti-Age dell\'accoppiamento',
        subtitle: 'Swipe',
        help: 'Aiuto',
        close: 'Chiudi',
        save: 'Salva',
        cancel: 'Annulla',
        send: 'Invia',
        back: 'Indietro',
        next: 'Avanti',
        loading: 'Caricamento...',
        error: 'Errore',
        success: 'Completato',

        // Person Labels
        ich: 'IO',
        partner: 'PARTNER',

        // Status
        gelebt: 'Primario',
        interessiert: 'Secondario',

        // Navigation
        page: 'Pagina',
        of: 'di',

        // Testi di stato / Fallback
        selectAllDimensions: 'Selezionare tutte le dimensioni.',
        noSpecificData: 'Nessun dato specifico disponibile',
        noDescription: 'Nessuna descrizione disponibile.',
        noData: 'Nessun dato',
        errorClearing: 'Errore durante il ripristino: ',
        noNeedsFound: 'Nessun bisogno trovato. Suggerimento: Usa * come jolly (es. *bambin*) - cerca in #B, #K, #D, #P',
        needsFound: '{count} bisogni trovati',
        needsFoundInAttributes: '{count} bisogni trovati in {attrs} attributi'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALUTAZIONE DELLA QUALIT\u00c0
    // ═══════════════════════════════════════════════════════════════════════

    quality: {
        noModification: 'Nessuna modifica',
        noAttraction: 'Nessuna attrazione fisica possibile',
        noResonance: 'Nessuna base di risonanza presente.',
        noResonanceDesc: 'Questa relazione mostra una qualit\u00e0 di {score} \u2013 nessuna base compatibile, i modelli si escludono a vicenda.',
        goodResonance: 'Buona risonanza \u2013 i modelli si completano.',
        goodResonanceDesc: 'Questa relazione mostra una qualit\u00e0 di {score} \u2013 una buona risonanza tra due persone i cui modelli si completano.',
        basisPresent: 'Base presente, lavoro necessario.',
        basisPresentDesc: 'Questa relazione mostra una qualit\u00e0 di {score} \u2013 una base \u00e8 presente, ma richiede lavoro consapevole e comunicazione.',
        reflectionNeeded: 'Riflessione consapevole necessaria.',
        reflectionNeededDesc: 'Questa relazione mostra una qualit\u00e0 di {score} \u2013 riflessione consapevole e comunicazione aperta sono necessarie.',
        noModifiers: 'Nessun modificatore attivo'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FEEDBACK
    // ═══════════════════════════════════════════════════════════════════════

    feedback: {
        noFeedback: 'Nessun feedback ancora.<br>Sii il primo!',
        noFilterResults: 'Nessun feedback per questo filtro.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CATEGORIE
    // ═══════════════════════════════════════════════════════════════════════

    categories: {
        A: 'Filosofia relazionale',
        B: 'Allineamento dei valori',
        C: 'Vicinanza-Distanza',
        D: 'Autonomia',
        E: 'Comunicazione',
        F: 'Compatibilità sociale'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANZA
    // ═══════════════════════════════════════════════════════════════════════

    dominanz: {
        label: 'Preferenza di dominanza',
        types: {
            dominant: 'Dominante',
            submissiv: 'Sottomesso',
            switch: 'Switch',
            ausgeglichen: 'Equilibrato'
        },
        short: {
            dominant: 'Dom',
            submissiv: 'Sub',
            switch: 'Swi',
            ausgeglichen: 'Equ'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTAMENTO
    // ═══════════════════════════════════════════════════════════════════════

    // v2.0: Nuova struttura dell'orientamento
    orientierung: {
        label: 'Orientamento sessuale',
        types: {
            heterosexuell: 'Eterosessuale',
            homosexuell: 'Omosessuale',
            bisexuell: 'Bisessuale',
            pansexuell: 'Pansessuale',
            queer: 'Queer',
            // LEGACY
            bihomo: 'Bi-/Omosessuale',
            gay_lesbisch: 'Omosessuale'
        },
        short: {
            heterosexuell: 'Etero',
            homosexuell: 'Omo',
            bisexuell: 'Bi',
            pansexuell: 'Pan',
            queer: 'Queer',
            // LEGACY
            bihomo: 'Bi/Omo',
            gay_lesbisch: 'Omo'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COMPETENZA CNV (Comunicazione Non Violenta)
    // ═══════════════════════════════════════════════════════════════════════

    gfk: {
        label: 'Competenza CNV',
        levels: {
            niedrig: 'basso',
            mittel: 'medio',
            hoch: 'alto'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENERE (Sistema a due dimensioni)
    // ═══════════════════════════════════════════════════════════════════════

    geschlecht: {
        label: 'Genere',
        primaryLabel: 'Corpo',
        secondaryLabel: 'Identità / Anima psicologica',
        primaryHint: 'Biologico / alla nascita',
        secondaryHint: 'Come ti senti',
        // Primario (Corpo) - v4.0: nonbinaer come valore diretto
        primary: {
            mann: 'Uomo',
            frau: 'Donna',
            inter: 'Inter',
            nonbinaer: 'Non binario'
        },
        primaryShort: {
            mann: 'U',
            frau: 'D',
            inter: 'I',
            nonbinaer: 'NB'
        },
        // Secondario (Identità) - dipendente dal contesto del Primario
        secondary: {
            // Per P = Uomo/Donna
            cis: 'Cis',
            trans: 'Trans',
            // Per P = Inter
            nonbinaer: 'Non binario',
            fluid: 'Fluido',
            // Comune
            unsicher: 'Incerto',
            suchend: 'In ricerca',
            // Legacy
            mann: 'Uomo',
            frau: 'Donna'
        },
        secondaryShort: {
            cis: 'C',
            trans: 'T',
            nonbinaer: 'NB',
            fluid: 'FL',
            unsicher: '?',
            suchend: 'R',
            mann: 'U',
            frau: 'D'
        },
        // Modalità esperto: Opzioni dettagliate
        detailed: {
            cis_mann: 'Uomo Cis',
            cis_frau: 'Donna Cis',
            trans_mann: 'Uomo Trans',
            trans_frau: 'Donna Trans',
            nonbinaer: 'Non binario',
            genderfluid: 'Genderfluid',
            agender: 'Agender',
            intersex: 'Intersex',
            divers: 'Diverso'
        },
        detailedShort: {
            cis_mann: 'UC',
            cis_frau: 'DC',
            trans_mann: 'UT',
            trans_frau: 'DT',
            nonbinaer: 'NB',
            genderfluid: 'GF',
            agender: 'AG',
            intersex: 'IX',
            divers: 'DI'
        },
        // Legacy (deprecato)
        types: {
            mann: 'Uomo',
            frau: 'Donna',
            inter: 'Inter',
            // Tipi secondari (per il sistema a due dimensioni)
            cis: 'Cis',
            trans: 'Trans',
            nonbinaer: 'Non binario',
            fluid: 'Fluido',
            suchend: 'In ricerca',
            unsicher: 'Incerto'
        },
        short: {
            mann: 'U',
            frau: 'D',
            inter: 'I'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TOOLTIP
    // ═══════════════════════════════════════════════════════════════════════

    tooltips: {
        geschlecht: {
            title: 'Genere',
            text: 'Due dimensioni: Corpo (biologico) e Identità / Anima psicologica (come ti senti). Questo influenza la compatibilità insieme all\'orientamento sessuale.'
        },
        geschlecht_primary: {
            title: 'Corpo (Primario)',
            text: 'Il tuo sesso biologico/assegnato alla nascita.'
        },
        geschlecht_secondary: {
            title: 'Identità / Anima psicologica (Secondario)',
            text: 'Come ti senti interiormente e come ti identifichi.'
        },
        primary_mann: {
            title: 'Uomo (Corpo)',
            text: 'Assegnato maschio alla nascita.'
        },
        primary_frau: {
            title: 'Donna (Corpo)',
            text: 'Assegnata femmina alla nascita.'
        },
        primary_inter: {
            title: 'Inter (Corpo)',
            text: 'Caratteristiche sessuali fisiche innate che non sono chiaramente maschili o femminili.'
        },
        secondary_mann: {
            title: 'Uomo (Identità)',
            text: 'Ti identifichi come uomo.'
        },
        secondary_frau: {
            title: 'Donna (Identità)',
            text: 'Ti identifichi come donna.'
        },
        secondary_nonbinaer: {
            title: 'Non binario (Identità)',
            text: 'Non ti identifichi esclusivamente come uomo né come donna.'
        },
        secondary_fluid: {
            title: 'Fluido (Identità)',
            text: 'La tua identità di genere cambia nel tempo o oscilla tra diverse identità.'
        },
        secondary_unsicher: {
            title: 'Incerto (Identità)',
            text: 'Non sei ancora sicuro/a della tua identità di genere o ti trovi in una fase di esplorazione.'
        },
        dominanz: {
            title: 'Preferenza di dominanza',
            text: 'Quale ruolo preferisci nelle dinamiche emotive e pratiche della relazione?'
        },
        orientierung: {
            title: 'Orientamento sessuale',
            text: 'Verso quale genere provi attrazione romantica e/o sessuale?'
        },
        status: {
            title: 'Stato dell\'orientamento',
            text: 'Primario: Vivi questo orientamento e ne sei sicuro/a.\n\nSecondario: Sei curioso/a o in una fase di esplorazione.'
        },
        dominanzStatus: {
            title: 'Stato della dominanza',
            text: 'Primario: Conosci la tua preferenza di dominanza e la vivi attivamente.\n\nSecondario: Stai ancora esplorando.'
        },
        dominant: {
            title: 'Dominante',
            text: 'Il leader - Ti piace assumere la guida e la responsabilità nelle relazioni.'
        },
        submissiv: {
            title: 'Sottomesso',
            text: 'Il seguace - Ti piace farti guidare e ti affidi al tuo partner.'
        },
        switch: {
            title: 'Switch',
            text: 'Il flessibile - Apprezzi entrambi i ruoli a seconda della situazione e del partner.'
        },
        ausgeglichen: {
            title: 'Equilibrato',
            text: 'Il centrato - Preferisci una dinamica paritaria senza ruoli fissi.'
        },
        heterosexuell: {
            title: 'Eterosessuale',
            text: 'Attrazione verso il genere opposto.'
        },
        homosexuell: {
            title: 'Omosessuale',
            text: 'Attrazione verso lo stesso genere.'
        },
        bisexuell: {
            title: 'Bi-/Pansessuale',
            text: 'Attrazione verso più generi o tutti i generi, indipendentemente dall\'identità di genere.'
        },
        // Identità di genere (Modalità legacy)
        cis_mann: {
            title: 'Uomo Cis',
            text: 'Persona assegnata maschio alla nascita che si identifica come uomo.'
        },
        cis_frau: {
            title: 'Donna Cis',
            text: 'Persona assegnata femmina alla nascita che si identifica come donna.'
        },
        trans_mann: {
            title: 'Uomo Trans',
            text: 'Persona assegnata femmina alla nascita che si identifica come uomo.'
        },
        trans_frau: {
            title: 'Donna Trans',
            text: 'Persona assegnata maschio alla nascita che si identifica come donna.'
        },
        nonbinaer: {
            title: 'Non binario',
            text: 'Persona la cui identità di genere non è esclusivamente maschile né femminile.'
        },
        genderfluid: {
            title: 'Genderfluid',
            text: 'Persona la cui identità di genere cambia nel tempo o oscilla tra diverse identità.'
        },
        agender: {
            title: 'Agender',
            text: 'Persona che non si identifica con alcuna identità di genere o rifiuta il genere come concetto.'
        },
        intersex: {
            title: 'Intersex',
            text: 'Persona con caratteristiche sessuali fisiche innate che non sono chiaramente maschili o femminili.'
        },
        divers: {
            title: 'Diverso',
            text: 'Termine collettivo per identità di genere al di fuori del sistema binario uomo/donna.'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETIPI
    // ═══════════════════════════════════════════════════════════════════════

    archetypes: {
        single: {
            name: 'Single',
            shortDef: 'Scelta consapevole per una vita autonoma senza relazione primaria come forma di vita permanente.',
            longDef: 'Le persone orientate al Single hanno scelto attivamente una vita senza una relazione romantica stabile. Questa non è una fase di transizione ("tra una relazione e l\'altra"), ma uno stile di vita consapevole che vede l\'autosufficienza e l\'autonomia personale come valori centrali. Contatti sociali, amicizie e incontri romantici/sessuali occasionali sono possibili, ma non si cerca una relazione stabile.',
            keyPrinciples: [
                'Autosufficienza come valore, non come mancanza',
                'Autonomia personale sopra l\'impegno',
                'Le relazioni come opzione, non come necessità',
                'Realizzazione attraverso sé stessi, amici, progetti'
            ],
            notTheSameAs: [
                '"Tra una relazione e l\'altra"',
                '"Non ha ancora trovato la persona giusta"',
                'Incapace di legarsi o paura dell\'impegno',
                'Solo/a o infelice'
            ],
            variants: [
                'Single aromantico: Nessun sentimento romantico, nessun bisogno di esso',
                'Consapevolmente autonomo: Scelta positiva per la libertà',
                'Critico verso le relazioni: Preferisce l\'indipendenza'
            ]
        },
        duo: {
            name: 'Duo',
            shortDef: 'Relazione monogama tradizionale a due con esclusività e progettazione di vita condivisa.',
            longDef: 'Le persone orientate al Duo vivono o cercano una relazione classica a due con esclusività romantica e sessuale. La relazione è al centro della progettazione di vita ed è intesa come unità emotiva e sociale primaria. Obiettivi comuni, vita quotidiana e pianificazione futura vengono progettati in coppia.',
            keyPrinciples: [
                'Esclusività come espressione di impegno',
                "'Noi' come unità centrale sopra l''Io'",
                'Profondità attraverso la focalizzazione su una persona',
                'Progettazione di vita e pianificazione futura condivise',
                'Fedeltà come esclusività emotiva e sessuale'
            ],
            notTheSameAs: [
                'Possessività o controllo',
                'Perdita della propria identità',
                'Forma di relazione "vecchia" o "superata"',
                'Noioso o insoddisfacente'
            ],
            variants: [
                'Duo tradizionale: Modello matrimoniale classico',
                'Duo moderno: Senza certificato di matrimonio, ruoli più flessibili',
                'Duo intensivo: Fusione emotiva molto stretta'
            ]
        },
        duo_flex: {
            name: 'Duo-Flex',
            shortDef: 'Relazione primaria a due con aperture concordate per contatti aggiuntivi.',
            longDef: 'Le persone orientate al Duo-Flex vivono in una relazione principale con un partner primario, ma la aprono consapevolmente e consensualmente a contatti aggiuntivi. La relazione primaria rimane centrale e privilegiata. Tutte le aperture sono trasparenti e secondo regole concordate insieme.',
            keyPrinciples: [
                'Relazione primaria come àncora e priorità',
                'Varietà sessuale/romantica senza rinuncia alla gerarchia',
                'Onestà e trasparenza su tutti i contatti',
                'Le regole proteggono la relazione principale',
                'Libertà entro confini concordati'
            ],
            notTheSameAs: [
                'Tradimento o inganno (tutto è concordato!)',
                '"Salvare la relazione" attraverso l\'apertura',
                'Mancanza di impegno',
                'Fase di transizione verso il poliamore'
            ],
            variants: [
                'Swinging/Lifestyle: Esperienze sessuali condivise',
                'Relazione aperta: Libertà sessuale individuale',
                'Poli gerarchico: Partner primario + relazioni secondarie'
            ]
        },
        solopoly: {
            name: 'Solopoly',
            shortDef: 'Più relazioni equivalenti con preservazione consapevole della propria autonomia.',
            longDef: 'Le persone orientate al Solopoly hanno più relazioni romantiche e/o sessuali in parallelo, senza dare priorità a nessuna come "relazione principale". L\'autonomia personale è al centro: niente convivenza, niente gestione domestica condivisa. "Io sono il mio partner primario".',
            keyPrinciples: [
                'Autonomia come valore supremo - anche nelle relazioni',
                'Più relazioni equivalenti senza gerarchia',
                'Nessuna fusione o convivenza domestica',
                "'Io sono il mio partner primario'",
                'Amore senza rinuncia all\'indipendenza'
            ],
            notTheSameAs: [
                'Paura dell\'impegno o problemi di attaccamento',
                '"Versione light" del poliamore',
                'Egoista o incapace di avere relazioni',
                'Fase intermedia verso una relazione "vera"'
            ],
            variants: [
                'Fortemente autonomo: Confini molto chiari',
                'Equilibrio relazionale: Relazioni profonde, abitazioni separate',
                'Orientato alla rete: Molti legami equivalenti'
            ]
        },
        polyamor: {
            name: 'Poliamore',
            shortDef: 'Più relazioni amorose simultanee, condotte eticamente con trasparenza.',
            longDef: 'Le persone poliamorose vivono più relazioni romantiche contemporaneamente, tutte con la conoscenza e il consenso di tutti i coinvolti. A differenza del Duo-Flex, spesso non c\'è una chiara gerarchia - tutte le relazioni possono essere ugualmente importanti.',
            keyPrinciples: [
                'L\'amore non è limitato o esclusivo',
                'Onestà e trasparenza verso tutti',
                'Consenso e accordo come base',
                'Comunicazione come competenza centrale',
                'Ogni relazione ha il suo valore'
            ],
            notTheSameAs: [
                'Tradimento o segretezza',
                '"Volere tutto"',
                'Incapace di impegnarsi',
                'Solo orientato al sesso'
            ],
            variants: [
                'Kitchen-Table-Poly: Tutti i partner si conoscono e si apprezzano',
                'Parallel-Poly: Le relazioni esistono separatamente',
                'Polycule: Rete di relazioni interconnesse'
            ]
        },
        ra: {
            name: 'RA',
            shortDef: 'RA - Rifiuto di tutte le gerarchie e le etichette relazionali.',
            longDef: 'Gli RA mettono radicalmente in discussione tutte le norme relazionali della società. Nessuna relazione è "superiore" a un\'altra - le amicizie possono essere importanti quanto le relazioni romantiche. Ogni legame viene definito individualmente, senza modelli esterni.',
            keyPrinciples: [
                'Nessuna gerarchia tra i tipi di relazione',
                'Ogni relazione viene definita individualmente',
                'Rifiuto delle norme relazionali della società',
                'Autonomia come valore supremo',
                'Nessuna pretesa di possesso su altre persone'
            ],
            notTheSameAs: [
                'Incapace di avere relazioni o paura dell\'impegno',
                'Caotico o senza regole',
                'Irresponsabile',
                'Contro l\'impegno in generale'
            ],
            variants: [
                'Anarchicamente connesso: Molti legami equivalenti',
                'RA filosofico: Riflessione profonda sulle norme',
                'RA pragmatico: Applicazione flessibile dei principi'
            ]
        },
        lat: {
            name: 'LAT',
            shortDef: 'Living Apart Together - Relazione stabile senza convivenza.',
            longDef: 'Le persone orientate al LAT desiderano relazioni profonde e impegnate, ma con una chiara autonomia spaziale e quotidiana. Le proprie quattro mura non sono segno di distanza, ma di sana cura di sé.',
            keyPrinciples: [
                'L\'amore non ha bisogno di un tetto condiviso',
                'Uno spazio proprio di rifugio è essenziale',
                'Tempo di qualità anziché quantità',
                'Autonomia nella vita quotidiana',
                'Scelta consapevole per la vicinanza'
            ],
            notTheSameAs: [
                'Relazione a distanza (distanza non voluta)',
                'Fase di transizione prima di andare a convivere',
                'Paura dell\'impegno',
                '"Non prendere la relazione sul serio"'
            ],
            variants: [
                'LAT di prossimità: Vivere vicini, ma in case separate',
                'LAT del fine settimana: Insieme nel weekend, separati durante la settimana',
                'LAT flessibile: Quote di tempo variabili insieme'
            ]
        },
        aromantisch: {
            name: 'Aromantico',
            shortDef: 'Focus su legami platonici senza componente romantica.',
            longDef: 'Le persone aromatiche provano poca o nessuna attrazione romantica. Possono comunque avere relazioni profonde e significative - solo senza la componente romantica. Amicizia, famiglia e altri legami hanno lo stesso valore.',
            keyPrinciples: [
                'Legami profondi senza romanticismo',
                'L\'amicizia come modello relazionale equivalente',
                'Autenticità oltre le norme romantiche',
                'L\'amore platonico come legame completo',
                'Autostima indipendente dalle relazioni romantiche'
            ],
            notTheSameAs: [
                'Freddo o senza sentimenti',
                'Incapace di amare',
                'Asessuale (quello è uno spettro diverso)',
                'Semplicemente non ha ancora trovato la persona giusta'
            ],
            variants: [
                'Completamente aromantico: Nessuna attrazione romantica',
                'Grigioromantico: Attrazione romantica rara',
                'Queerplatonico: Relazioni non romantiche profonde e impegnate'
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODALE AIUTO
    // ═══════════════════════════════════════════════════════════════════════

    help: {
        title: 'Aiuto e documentazione',
        quickGuide: 'Guida rapida',
        quickGuideSteps: [
            'Scegli il tuo archetipo relazionale (IO)',
            'Scegli l\'archetipo del tuo partner',
            'Clicca sulle categorie per i dettagli',
            'Usa i filtri per analisi specifiche'
        ],
        sections: {
            archetypes: 'Comprendere gli archetipi',
            categories: 'Categorie spiegate',
            compatibility: 'Compatibilità',
            tips: 'Consigli'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SEZIONE COMMENTI
    // ═══════════════════════════════════════════════════════════════════════

    comments: {
        title: 'Commenti',
        send: 'Invia commento',
        viewAll: 'Mostra tutti i commenti',
        placeholder: 'Il tuo commento...',
        author: 'Nome (opzionale)',
        type: 'Tipo',
        types: {
            feedback: 'Feedback',
            fehler: 'Segnala errore',
            frage: 'Domanda',
            verbesserung: 'Suggerimento',
            doku: 'Documentazione'
        },
        search: 'Cerca nei commenti...',
        noComments: 'Ancora nessun commento presente.',
        reply: 'Rispondi'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALIDAZIONE / MESSAGGI DI ERRORE
    // ═══════════════════════════════════════════════════════════════════════

    validation: {
        missingDimensions: 'Per favore compila tutti i campi obbligatori:',
        missingGeschlecht: 'Genere',
        missingDominanz: 'Dominanza',
        missingOrientierung: 'Orientamento'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VERIFICA DELL'ETÀ
    // ═══════════════════════════════════════════════════════════════════════

    ageVerification: {
        title: 'Verifica dell\'età',
        description: 'Questo sito contiene contenuti sui modelli relazionali ed è destinato solo a persone di almeno 18 anni.',
        question: 'Hai almeno 18 anni?',
        confirm: 'Sì, ho 18+',
        deny: 'No, ho meno di 18 anni',
        required: 'Questo sito è accessibile solo agli adulti (18+).',
        termsIntro: 'Cliccando su "Sì" confermi che:',
        termsAge: 'sei maggiorenne (almeno 18 anni)',
        termsAccept: 'accetti i',
        termsLinkText: 'Termini di utilizzo e Informativa sulla privacy',
        cookieConsent: 'Accetto l\'uso di cookie e LocalStorage per salvare le mie immissioni e preferenze. Questi dati vengono conservati solo localmente nel mio browser.',
        termsCopyright: 'prendi atto che tutti i contenuti sono protetti da diritto d\'autore',
        termsPersonal: 'utilizzi i contenuti solo per scopi personali e non commerciali'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODALE INFO ARCHETIPO
    // ═══════════════════════════════════════════════════════════════════════

    archetypeModal: {
        swipeHint: '← Scorri per navigare →',
        keyPrinciples: 'Principi fondamentali',
        notTheSameAs: 'Questo NON è',
        variants: 'Varianti',
        pathosLogos: 'Pathos e Logos',
        pathosLabel: 'Pathos (Livello emotivo)',
        logosLabel: 'Logos (Livello razionale)',
        confirmSelection: 'Conferma selezione',
        definition: 'Definizione'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SINTESI / RISULTATI
    // ═══════════════════════════════════════════════════════════════════════

    synthesis: {
        title: 'Sintesi relazionale',
        compatibility: 'Compatibilità',
        strengths: 'Punti di forza',
        challenges: 'Sfide',
        recommendations: 'Raccomandazioni',
        overall: 'Valutazione complessiva',
        details: 'Mostra dettagli'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TESTI DELL'ATTRITO v4.0 (sostituisce i testi K.O.)
    // ═══════════════════════════════════════════════════════════════════════
    // Filosofia: Nulla è impossibile, solo sfide di diversa intensità.
    // Punteggio 0% = 100% Attrito = sfida massima (non "impossibile")

    hardKO: {  // Chiave legacy per compatibilità all'indietro
        title: 'Alto attrito',
        subtitle: 'Questa combinazione richiede una consapevolezza particolare',

        // Indicazioni di attrito anziché "motivi"
        reasons: {
            hetero_same_gender: 'Direzioni di orientamento diverse',
            homo_different_gender: 'Gli orientamenti puntano in direzioni diverse',
            hetero_male_lesbian_female: 'Modelli di attrazione diversi',
            lesbian_female_hetero_male: 'Direzioni di attrazione diverse',
            hetero_female_homo_male: 'Gli orientamenti non sono rivolti l\'uno verso l\'altro',
            homo_male_hetero_female: 'Direzioni di attrazione diverse'
        },

        // Indicazione RTI (Pilastro S1 - Corporeità)
        friendship: 'Altre forme di relazione sono possibili!',

        // Indicazione multi-prospettica
        philosophy: 'Un alto attrito significa potenziale di crescita, non impossibilità.'
    },

    // Livelli di attrito (sostituisce softKO)
    softKO: {  // Chiave legacy per compatibilità all'indietro
        title: 'Attrito medio',
        subtitle: 'Differenze in ambiti importanti',

        // Indicazioni di attrito
        reasons: {
            needs_conflict: 'I vostri bisogni hanno espressioni diverse',
            dynamic_mismatch: 'Gli stili di dinamica sono diversi',
            values_gap: 'Priorità diverse nei valori'
        },

        // Indicazione CNV
        growth: 'L\'attrito è potenziale di crescita - con consapevolezza diventa sviluppo.',

        // Specifico per l'attrito
        conflictLabel: 'Potenziale di attrito',
        needsLabel: 'Espressioni diverse dei bisogni'
    },

    // Nuovi livelli di attrito
    reibung: {
        stufen: {
            keine: { label: 'Nessun attrito', emoji: '✨', range: '90-100%' },
            leicht: { label: 'Attrito leggero', emoji: '🌱', range: '70-89%' },
            mittel: { label: 'Attrito medio', emoji: '🔧', range: '40-69%' },
            hoch: { label: 'Attrito elevato', emoji: '⚡', range: '10-39%' },
            maximal: { label: 'Attrito massimo', emoji: '🔥', range: '0-9%' }
        },
        // Indicazioni prospettiche
        hinweise: {
            pirsig: 'La qualità nasce dall\'integrazione delle differenze',
            osho: 'Ogni condizionamento può essere superato consapevolmente',
            gfk: 'Dietro ogni attrito ci sono bisogni che possono essere soddisfatti',
            rti: 'I 5 pilastri dell\'identità mostrano potenziali di sviluppo'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALIDAZIONE P↔S (Primario-Secondario)
    // ═══════════════════════════════════════════════════════════════════════

    psValidation: {
        complementary: 'Primario e Secondario si completano bene',
        conflicting: 'Primario e Secondario sono in tensione',
        bonusApplied: 'Bonus per combinazione P↔S complementare'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ETICHETTE DIMENSIONI
    // ═══════════════════════════════════════════════════════════════════════

    dimensions: {
        geschlechtLabel: 'Identità di genere',
        dominanzLabel: 'Dominanza',
        orientierungLabel: 'Orientamento',
        gfkLabel: 'Competenza CNV',
        multiSelect: '(Selezione multipla)',
        legend: {
            primary: 'P',
            secondary: 'S',
            primaryFull: 'Primario',
            secondaryFull: 'Secondario'
        },
        gfkLevels: {
            niedrig: 'basso',
            mittel: 'medio',
            hoch: 'alto'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BISOGNI - vedi sotto nella sezione CNV-BISOGNI per la lista completa
    // ═══════════════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════════════
    // INTESTAZIONI COLONNE
    // ═══════════════════════════════════════════════════════════════════════

    columns: {
        you: 'TU',
        partner: 'PARTNER',
        previousArchetype: 'Archetipo precedente',
        nextArchetype: 'Archetipo successivo',
        info: 'INFO',
        archetypeInfo: 'Info sull\'archetipo'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PANORAMICA ANALISI
    // ═══════════════════════════════════════════════════════════════════════

    analysisOverview: {
        youA: 'Tu:'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ESPANDI/COMPRIMI
    // ═══════════════════════════════════════════════════════════════════════

    foldUnfold: {
        fold: 'Comprimi',
        unfold: 'Espandi',
        foldAll: 'Comprimi tutto',
        unfoldAll: 'Espandi tutto'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NOTE LEGALI
    // ═══════════════════════════════════════════════════════════════════════

    impressum: {
        title: 'Note legali',
        operator: 'Gestore',
        project: 'Progetto',
        contact: 'Contatto'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODALE INFO GENERE
    // ═══════════════════════════════════════════════════════════════════════

    genderInfoModal: {
        title: 'Genere',
        intro: 'Scegli il tuo genere:',
        optionMann: 'Uomo',
        optionMannDesc: 'Ti identifichi come uomo.',
        optionFrau: 'Donna',
        optionFrauDesc: 'Ti identifichi come donna.',
        optionNonbinaer: 'Non binario',
        optionNonbinaerDesc: 'Non ti identifichi esclusivamente come uomo né come donna.',
        note: 'Nota: Sottogruppi come Cis/Trans esistono, ma non vengono distinti in questa app poiché non influiscono sul calcolo della compatibilità.',
        understood: 'Capito'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODALE AIUTO ESTESA
    // ═══════════════════════════════════════════════════════════════════════

    helpModal: {
        title: 'Aiuto e documentazione',
        quickGuideTitle: 'Guida rapida',
        quickGuideItems: [
            '<strong>Il mio tipo</strong> = Il tuo archetipo + proprietà (orientamento, dominanza, genere)',
            '<strong>Qualità relazionale</strong> = Archetipo del partner + proprietà e calcolo della compatibilità',
            '<strong>Primario</strong> = Ciò che vivi attivamente / <strong>Secondario</strong> = Ciò a cui sei aperto/a',
            '<strong>INFO</strong>-Button = Dettagli sull\'archetipo selezionato',
            '<strong>Risultato</strong> = Calcolo automatico della compatibilità (4 fattori)',
            'Clicca sulle <strong>percentuali</strong> = Spiegazione dettagliata per fattore'
        ],
        newInVersion: 'Novità nella versione 1.4',
        newFeatures: [
            '<strong>Primario/Secondario:</strong> Scegli per ogni proprietà se la vivi attivamente o hai solo interesse',
            '<strong>Auto-Collapse:</strong> Le sezioni orientamento e dominanza si chiudono automaticamente dopo la selezione',
            '<strong>Messaggi di errore migliorati:</strong> I campi mancanti vengono elencati in modo chiaro',
            '<strong>Navigazione mobile:</strong> Nuovi pulsanti di navigazione nei modali per una migliore usabilità',
            '<strong>Visualizzazione circolare del punteggio:</strong> I valori di compatibilità vengono presentati in modo visivamente più attraente'
        ],
        feedbackPrompt: 'Domande, feedback o suggerimenti?',
        sendComment: 'Invia commento',
        viewAllComments: 'Tutti i commenti',
        documentation: 'Documentazione'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SEZIONE SINTESI
    // ═══════════════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════════════
    // SINTESI VOCALE
    // ═══════════════════════════════════════════════════════════════════════

    tts: {
        play: 'Leggi ad alta voce',
        pause: 'Pausa',
        stop: 'Stop',
        resume: 'Riprendi',
        notSupported: 'La lettura ad alta voce non è supportata in questo browser'
    },

    synthesisSection: {
        creativity: 'CREATIVITÀ',
        dynamik: 'DINAMICA',
        bringtMit: 'PORTA CON SÉ',
        darausEntsteht: 'NE NASCE',
        gemeinsameBeduerfnisse: 'Bisogni condivisi',
        philosophischeGrundlagen: 'Fondamenti filosofici',
        pathos: 'Pathos',
        logos: 'Logos',
        staerken: 'Punti di forza',
        herausforderungen: 'Sfide',
        wachstumspotential: 'Potenziale di crescita',
        beduerfnisUebereinstimmung: 'Corrispondenza dei bisogni',
        unterschiedlichePrioritaeten: 'Priorità diverse'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PIÈ DI PAGINA
    // ═══════════════════════════════════════════════════════════════════════

    footer: {
        datenschutz: 'Privacy',
        nutzungsbedingungen: 'Condizioni d\'uso',
        impressum: 'Note legali',
        copyright: 'Tutti i diritti riservati',
        rechtliches: 'Informazioni legali'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BISOGNI CNV (Comunicazione Non Violenta)
    // ═══════════════════════════════════════════════════════════════════════

    needs: {
        // Etichette di base
        matchLabel: 'Corrispondenza dei bisogni',
        sharedTitle: 'BISOGNI CONDIVISI',
        differentTitle: 'PRIORITÀ DIVERSE',
        valuesTitle: 'VALORI CONDIVISI',

        // Categorie
        categories: {
            existenz: 'Esistenza',
            sicherheit: 'Sicurezza',
            zuneigung: 'Affetto',
            verstaendnis: 'Comprensione',
            freiheit: 'Libertà',
            teilnahme: 'Partecipazione',
            musse: 'Ozio',
            identitaet: 'Identità e significato',
            erschaffen: 'Creare qualcosa',
            verbundenheit: 'Connessione',
            dynamik: 'Dinamica e scambio'
        },

        // Singoli bisogni
        items: {
            // ESISTENZA
            luft: 'Aria',
            wasser: 'Acqua',
            nahrung: 'Nutrimento',
            bewegung: 'Movimento/Attività',
            beruehrung: 'Contatto fisico/Tocco',
            erholung: 'Riposo/Sonno',
            sexueller_ausdruck: 'Espressione sessuale',
            sicherheit_physisch: 'Sicurezza fisica',
            unterschlupf: 'Rifugio',

            // SICUREZZA
            bestaendigkeit: 'Costanza',
            sich_sicher_fuehlen: 'Sentirsi al sicuro',
            schutz: 'Protezione',
            stabilitaet: 'Stabilità',
            leichtigkeit: 'Leggerezza',
            geborgenheit: 'Senso di protezione',

            // AFFETTO
            waerme: 'Calore',
            wertschaetzung: 'Apprezzamento',
            naehe: 'Vicinanza',
            gesellschaft: 'Compagnia',
            intimitaet: 'Intimità',
            liebe: 'Amore',
            fuersorge: 'Premura',
            unterstuetzung: 'Supporto',
            fuereinander_da_sein: 'Esserci l\'uno per l\'altro',

            // COMPRENSIONE
            akzeptanz: 'Accettazione',
            mitgefuehl: 'Compassione',
            beruecksichtigung: 'Considerazione',
            empathie: 'Empatia',
            vertrauen: 'Fiducia',
            beachtung: 'Attenzione',
            gesehen_werden: 'Essere visti',
            verstanden_werden: 'Essere compresi',
            harmonie: 'Armonia',

            // LIBERTÀ
            selbstbestimmung: 'Autodeterminazione',
            waehlen_koennen: 'Poter scegliere',
            unabhaengigkeit: 'Indipendenza',
            raum_haben: 'Avere spazio',
            spontaneitaet: 'Spontaneità',

            // PARTECIPAZIONE
            zusammenarbeit: 'Collaborazione',
            kommunikation: 'Comunicazione',
            gemeinschaft: 'Comunità',
            zugehoerigkeit: 'Appartenenza',
            gegenseitigkeit: 'Reciprocità',
            respekt: 'Rispetto',
            bedeutung_haben: 'Avere importanza',

            // OZIO
            schoenheit: 'Bellezza',
            freizeit: 'Tempo libero',
            freude: 'Gioia',
            humor: 'Umorismo',

            // IDENTITÀ
            authentizitaet: 'Autenticità',
            echtheit: 'Genuinità',
            integritaet: 'Integrità',
            praesenz: 'Presenza',
            ordnung: 'Ordine',
            bewusstheit: 'Consapevolezza',
            herausforderung: 'Sfida',
            klarheit: 'Chiarezza',
            kompetenz: 'Competenza',
            effizienz: 'Efficienza',
            wirksamkeit: 'Efficacia',
            wachstum: 'Crescita',
            sinn: 'Senso',
            beitrag_leisten: 'Dare un contributo',

            // CREARE
            kreativitaet: 'Creatività',
            entdecken: 'Scoprire',
            lernen: 'Imparare',
            selbst_ausdruck: 'Espressione di sé',
            anreize_bekommen: 'Ricevere stimoli',

            // CONNESSIONE
            leben_feiern: 'Celebrare la vita',
            inspiration: 'Ispirazione',
            trauer_ausdruecken: 'Esprimere il dolore',
            einsehen: 'Comprendere',
            anfang_ende: 'Inizio e fine',

            // DINAMICA E SCAMBIO
            kontrolle_ausueben: 'Esercitare il controllo',
            hingabe: 'Abbandono',
            fuehrung_geben: 'Dare guida',
            gefuehrt_werden: 'Essere guidati',
            ritual: 'Rituali e struttura',
            nachsorge: 'Aftercare',
            grenzen_setzen: 'Stabilire confini',
            grenzen_respektieren: 'Rispettare i confini',
            intensitaet: 'Vivere l\'intensità',
            vertrauen_schenken: 'Donare fiducia',
            verantwortung_uebernehmen: 'Assumersi responsabilità',
            sich_fallenlassen: 'Lasciarsi andare',
            machtaustausch: 'Scambio di potere',
            dienend_sein: 'Essere al servizio',
            beschuetzen: 'Proteggere'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // REVISIONE PROFILO (v1.8)
    // ═══════════════════════════════════════════════════════════════════════════════

    profileReview: {
        title: 'Tutti gli attributi precompilati',

        // Spiegazione dell'origine degli attributi
        sourceExplanation: {
            title: 'Da dove provengono questi valori?',
            intro: 'Questi attributi sono stati calcolati automaticamente in base a:',
            note: 'Tiage utilizza 864 profili psicologici dalla ricerca sulle relazioni (Gottman, Esther Perel, ecc.). I valori si basano sulla distribuzione gaussiana della popolazione (Europa, America, Asia): l\'80% valuta l\'importanza di un bisogno tra 30 e 70 su 100 punti.',
            helpLink: 'Maggiori informazioni nell\'aiuto'
        },

        categories: {
            geschlechtsidentitaet: 'IDENTITÀ DI GENERE',
            lebensplanung: 'PIANIFICAZIONE DI VITA',
            finanzen: 'FINANZE E CARRIERA',
            kommunikation: 'COMUNICAZIONE',
            soziales: 'SOCIALITÀ',
            intimitaet: 'INTIMITÀ',
            werte: 'VALORI',
            praktisches: 'ASPETTI PRATICI'
        },

        attributes: {
            // ═══════════════════════════════════════════════════════════════════════
            // IDENTITÀ DI GENERE
            // ═══════════════════════════════════════════════════════════════════════
            geschlechtSekundaer: {
                label: 'Identità di genere',
                description: 'Identità di genere: Cis (identità = corpo), Trans (identità ≠ corpo), In ricerca (in esplorazione). Per Inter: Non binario, Fluido, In ricerca.',
                info: {
                    stats: 'Circa lo 0,5-1% della popolazione si identifica come trans o non binario (Williams Institute, 2022). Tendenza in aumento grazie a una maggiore accettazione.',
                    research: 'La congruenza identitaria correla con un benessere superiore del 40% (American Psychological Association). L\'accettazione del partner è il più forte predittore della soddisfazione relazionale.',
                    pirsig: 'La ricerca dell\'identità autentica è Qualità dinamica. Cis non significa automaticamente meno consapevolezza - la conferma consapevole della propria identità ha lo stesso valore.',
                    osho: 'Tu non sei il corpo, tu non sei la mente. Scopri chi sei veramente - al di là di ogni etichetta e attribuzione.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PIANIFICAZIONE DI VITA
            // ═══════════════════════════════════════════════════════════════════════
            kinder: {
                label: 'Desiderio di figli',
                description: 'Desiderio di avere figli propri o apertura verso questa possibilità in futuro.',
                info: {
                    stats: 'Domanda: "Desiderate figli?" - Il 79% delle donne e il 72% degli uomini (21-25 anni) esprimono il desiderio di figli (BZgA 2023). Il 56% considera importante una pianificazione familiare concordante per la ricerca del partner (Parship).',
                    research: 'Il 9% ha già vissuto una separazione a causa di desideri diversi riguardo ai figli (ElitePartner). Gottman Institute: il 94% delle coppie con divergenze sul desiderio di figli si separa a lungo termine senza compromesso.',
                    pirsig: 'Un figlio non è né un progetto né un dovere. La domanda non è "devo?", ma "perché voglio?" - e se entrambe le risposte sono in armonia.',
                    osho: 'I figli non sono un prolungamento del tuo ego. Sono anime indipendenti che vengono attraverso di te, ma non ti appartengono.'
                }
            },
            ehe: {
                label: 'Desiderio di matrimonio',
                description: 'Importanza di un matrimonio formale per la relazione.',
                info: {
                    stats: 'Il 60% dei tedeschi considera il matrimonio importante (Allensbach 2023). Tra gli under 30 solo il 42%.',
                    research: 'Gli studi non mostrano differenze significative nella soddisfazione relazionale tra coppie sposate e non sposate a lungo termine.',
                    pirsig: 'Il matrimonio è uno schema statico. La sua qualità non risiede nel contratto, ma nella scelta quotidiana di stare insieme.',
                    osho: 'Il matrimonio può essere una prigione o un tempio. Dipende se viene contratto per paura o per amore.'
                }
            },
            zusammen: {
                label: 'Convivenza',
                description: 'Preferenza per la convivenza o per nuclei domestici separati.',
                info: {
                    stats: 'L\'8% delle coppie tedesche vive in relazioni LAT (nuclei domestici separati). Tra gli over 60 è il 15%.',
                    research: 'Le coppie LAT riportano una qualità relazionale superiore del 12% con la stessa vicinanza emotiva (University of Missouri).',
                    pirsig: 'La vicinanza fisica non equivale alla vicinanza emotiva. La qualità nasce dalla presenza consapevole, non dalla prossimità fisica permanente.',
                    osho: 'Due persone possono essere sole nella stessa stanza - o connesse in città diverse. La vera intimità non ha bisogno di una chiave condivisa.'
                }
            },
            haustiere: {
                label: 'Animali domestici',
                description: 'Atteggiamento verso gli animali domestici nel nucleo familiare.',
                info: {
                    stats: 'Il 47% delle famiglie tedesche ha animali domestici. Il 78% dei proprietari considera il proprio animale un membro della famiglia.',
                    research: 'I proprietari di animali domestici mostrano livelli di cortisolo inferiori del 20%. La cura condivisa degli animali rafforza il legame di coppia.',
                    pirsig: 'Un animale ci insegna qualcosa di essenziale nelle relazioni: la presenza incondizionata senza aspettativa di cambiamento.',
                    osho: 'Gli animali vivono nel presente. Ci ricordano che l\'amore non ha bisogno di pensiero - solo di essere.'
                }
            },
            umzug: {
                label: 'Disponibilità al trasferimento',
                description: 'Disponibilità a cambiare luogo di residenza per la relazione.',
                info: {
                    stats: 'Il 35% dei tedeschi si trasferirebbe per amore. Tra gli under 30 è il 58%.',
                    research: 'Le relazioni a distanza hanno lo stesso tasso di successo di quelle a breve distanza - purché esista un obiettivo condiviso.',
                    pirsig: 'La flessibilità è Qualità dinamica. La domanda non è chi si trasferisce, ma: la relazione cresce grazie a questa decisione?',
                    osho: 'Radici e ali - chi ha solo radici non può volare. Chi ha solo ali non trova riposo. L\'arte sta in entrambi.'
                }
            },
            familie: {
                label: 'Importanza della famiglia',
                description: 'Importanza della famiglia d\'origine e contatto regolare.',
                info: {
                    stats: 'Il 67% dei tedeschi vede la propria famiglia d\'origine almeno mensilmente. Il 12% non ha contatti.',
                    research: 'I conflitti con i suoceri sono un fattore principale nel 40% dei divorzi (studio Terling-Watt).',
                    pirsig: 'La famiglia è uno schema statico del passato. L\'arte sta nell\'onorarla senza lasciarsi definire da essa.',
                    osho: 'Puoi amare i tuoi genitori senza seguire i loro desideri. Il rispetto non significa obbedienza.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // FINANZE E CARRIERA
            // ═══════════════════════════════════════════════════════════════════════
            finanzen: {
                label: 'Finanze',
                description: 'Gestione del denaro: conti separati, modello ibrido o cassa comune.',
                info: {
                    stats: 'Il 42% delle coppie ha finanze completamente separate. Il 31% usa un modello a tre conti. Il 27% ha una cassa comune.',
                    research: 'Il denaro è il tema di discussione n. 1 nelle coppie. La trasparenza riduce i conflitti del 70% (Kansas State University).',
                    pirsig: 'Il denaro è uno strumento, non una misura del valore. La domanda non è quanto, ma: serve alla vostra Qualità condivisa?',
                    osho: 'Il denaro è come l\'acqua - deve scorrere. Chi lo trattiene soffoca. Chi sa condividerlo diventa ricco di fiducia.'
                }
            },
            karriere: {
                label: 'Priorità della carriera',
                description: 'Bilanciamento tra successo professionale e vita familiare.',
                info: {
                    stats: 'Il 58% dei tedeschi dà priorità all\'equilibrio vita-lavoro rispetto alla carriera (Gallup 2023).',
                    research: 'Le coppie con doppia carriera hanno tassi di divorzio più alti - ma solo quando esistono aspettative di ruolo tradizionali.',
                    pirsig: 'La carriera senza senso è una ruota per criceti. Il senso senza azione è fantasticheria. La Qualità sta nell\'integrazione di entrambi.',
                    osho: 'Il lavoro può essere meditazione - quando non lavori per il riconoscimento, ma perché il lavoro stesso porta gioia.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // COMUNICAZIONE
            // ═══════════════════════════════════════════════════════════════════════
            gespraech: {
                label: 'Bisogno di conversazione',
                description: 'Bisogno di scambio e conversazione quotidiana.',
                info: {
                    stats: 'Le coppie felici parlano in media più di 5 ore a settimana (esclusa la logistica quotidiana).',
                    research: 'Gottman: il rapporto "Bid-Response" superiore all\'85% = relazione stabile. Sotto il 33% = alto rischio di separazione.',
                    pirsig: 'Le parole possono essere ponti o muri. La qualità non nasce dalla quantità, ma dall\'ascolto autentico.',
                    osho: 'La vera comunicazione avviene nel silenzio tra le parole. Chi sa ascoltare non ha bisogno di parlare molto.'
                }
            },
            emotional: {
                label: 'Apertura emotiva',
                description: 'Disponibilità a condividere sentimenti ed emozioni.',
                info: {
                    stats: 'Gli uomini condividono i sentimenti in media il 60% meno spesso delle donne (meta-analisi, 2021).',
                    research: 'L\'auto-rivelazione emotiva aumenta l\'intimità del 45% - ma solo con apertura reciproca.',
                    pirsig: 'Mostrare i sentimenti richiede il coraggio della vulnerabilità. Questa non è debolezza, ma la più alta Qualità dell\'essere umano.',
                    osho: 'Quando nascondi le tue lacrime, nascondi anche il tuo riso. L\'autenticità non conosce mezze misure.'
                }
            },
            konflikt: {
                label: 'Comportamento nei conflitti',
                description: 'Modalità di gestione dei conflitti: evitare o affrontare direttamente.',
                info: {
                    stats: 'Il 44% delle coppie evita i conflitti. Il 23% degenera regolarmente. Il 33% risolve in modo costruttivo.',
                    research: 'Gottman: evitare i conflitti è più dannoso del litigare. Ciò che conta è il rapporto: 5:1 positivo a negativo.',
                    pirsig: 'Il conflitto non è il problema - lo è la stagnazione. La Qualità dinamica nasce dall\'attrito, non dall\'evitamento.',
                    osho: 'Il litigio può essere purificante come un temporale. Non è la discussione a distruggere, ma il non detto.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // SOCIALITÀ
            // ═══════════════════════════════════════════════════════════════════════
            introextro: {
                label: 'Intro-/Estroverso',
                description: 'Energia attraverso il tempo da soli (Intro) o i contatti sociali (Estro).',
                info: {
                    stats: 'Il 25-40% della popolazione è introverso. Gli ambivertiti formano il gruppo più grande.',
                    research: 'Le coppie intro-estro possono funzionare bene quando entrambi rispettano le differenze invece di volerle cambiare.',
                    pirsig: 'L\'introversione non è timidezza, l\'estroversione non è superficialità. Entrambe sono vie legittime verso la Qualità.',
                    osho: 'L\'introverso cerca la profondità, l\'estroverso cerca l\'ampiezza. Entrambi cercano la stessa cosa su strade diverse.'
                }
            },
            alleinzeit: {
                label: 'Bisogno di tempo per sé',
                description: 'Bisogno di tempo da soli senza il partner.',
                info: {
                    stats: 'Il 72% delle persone ha bisogno di tempo regolare per sé. Il 28% si sente solo durante quel tempo.',
                    research: 'I partner che rispettano il tempo individuale riportano una soddisfazione relazionale superiore del 30%.',
                    pirsig: 'Il tempo per sé non è assenza d\'amore - è presenza con sé stessi. Solo chi conosce sé stesso può donarsi.',
                    osho: 'Solitudine e stare da soli sono fondamentalmente diversi. Stare da soli è pieno di gioia - la solitudine è povertà nonostante la compagnia.'
                }
            },
            freunde: {
                label: 'Cerchia di amici',
                description: 'Preferenza per amici propri o cerchia di amici condivisa.',
                info: {
                    stats: 'Il 61% delle coppie condivide in gran parte la cerchia di amici. Il 15% ha amici completamente separati.',
                    research: 'Gli amici in comune stabilizzano le relazioni - ma aumentano anche la pressione sociale in caso di separazione.',
                    pirsig: 'Le amicizie al di fuori della relazione non sono una minaccia - sono nutrimento per l\'individualità.',
                    osho: 'Una relazione che non permette altre relazioni è una prigione, non amore.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // INTIMITÀ
            // ═══════════════════════════════════════════════════════════════════════
            naehe: {
                label: 'Vicinanza fisica',
                description: 'Bisogno di contatto fisico, abbracci e vicinanza corporea.',
                info: {
                    stats: 'Le persone hanno bisogno di 4-12 abbracci al giorno per il benessere emotivo (Virginia Satir).',
                    research: 'Abbracci di 20 secondi rilasciano ossitocina e abbassano significativamente la pressione sanguigna e il cortisolo.',
                    pirsig: 'Il contatto fisico è comunicazione non verbale della più alta Qualità. Non richiede interpretazione.',
                    osho: 'Il corpo è il tempio. Un tocco può dire più di mille parole - quando avviene con consapevolezza.'
                }
            },
            romantik: {
                label: 'Bisogno di romanticismo',
                description: 'Desiderio di gesti romantici, sorprese e appuntamenti.',
                info: {
                    stats: 'Il 67% delle donne e il 51% degli uomini desiderano più romanticismo nella relazione.',
                    research: 'Appuntamenti regolari aumentano la soddisfazione relazionale del 36% (National Marriage Project).',
                    pirsig: 'Il romanticismo non è sdolcinatura - è attenzione consapevole verso la straordinarietà dell\'ordinario.',
                    osho: 'Il romanticismo muore quando l\'amore diventa abitudine. Mantieni gli occhi dell\'inizio aperti.'
                }
            },
            sex: {
                label: 'Frequenza sessuale',
                description: 'Frequenza desiderata di intimità nella relazione.',
                info: {
                    stats: 'Le coppie tedesche hanno rapporti in media 1,5 volte a settimana. Il 15% vive in "matrimoni senza sesso" (<10 volte/anno).',
                    research: 'La frequenza correla poco con la soddisfazione. Ciò che conta è se entrambi si sentono compresi.',
                    pirsig: 'La sessualità non è quantificabile. La Qualità risiede nell\'essere presenti, non nelle statistiche.',
                    osho: 'Il sesso può essere meditazione - quando nasce dalla presenza anziché dal desiderio. Allora una volta è come mille volte.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // VALORI
            // ═══════════════════════════════════════════════════════════════════════
            religion: {
                label: 'Religiosità',
                description: 'Importanza della religione e della spiritualità nella vita quotidiana.',
                info: {
                    stats: 'Il 52% dei tedeschi crede in Dio. Il 27% pratica attivamente. I matrimoni interreligiosi sono al 24%.',
                    research: 'L\'omogamia religiosa (stessa fede) correla con matrimoni più lunghi - ma gli atei hanno una stabilità simile.',
                    pirsig: 'La religione è un tentativo di afferrare la Qualità statica. La spiritualità vive nella ricerca dinamica stessa.',
                    osho: 'La religione non dovrebbe essere un credo, ma un\'esperienza. Ciò che non hai vissuto in prima persona è solo informazione.'
                }
            },
            tradition: {
                label: 'Tradizione vs. Moderno',
                description: 'Orientamento verso valori tradizionali o stili di vita moderni.',
                info: {
                    stats: 'Il 38% dei tedeschi preferisce i valori tradizionali. Differenza generazionale: 60+ vs. 18-30 = 52% vs. 21%.',
                    research: 'La congruenza dei valori è più importante della direzione. Le coppie miste (trad+moderno) riportano più conflitti.',
                    pirsig: 'La tradizione è Qualità statica - preziosa quando sostiene, ostacolante quando imprigiona. L\'arte sta nel distinguere.',
                    osho: 'La tradizione è la cenere del fuoco delle generazioni passate. Cerca il fuoco, non la cenere.'
                }
            },
            umwelt: {
                label: 'Coscienza ambientale',
                description: 'Importanza della sostenibilità e di uno stile di vita ecologico.',
                info: {
                    stats: 'Il 68% dei tedeschi ritiene importante la protezione del clima. Il 23% modifica attivamente il proprio comportamento.',
                    research: 'La discrepanza di valori sulla sostenibilità porta a micro-conflitti quotidiani (acquisti, mobilità, consumo).',
                    pirsig: 'La coscienza ambientale è la consapevolezza che non siamo separati dalla natura. Ogni azione ha delle conseguenze.',
                    osho: 'La terra non è un tuo possesso - tu ne sei ospite. Gli ospiti lasciano la casa più bella di come l\'hanno trovata.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // ASPETTI PRATICI
            // ═══════════════════════════════════════════════════════════════════════
            ordnung: {
                label: 'Ordine',
                description: 'Preferenza per l\'ordine e la pulizia nell\'ambiente domestico.',
                info: {
                    stats: 'La gestione della casa è tra i 5 temi di discussione principali nelle coppie. Il 62% delle donne porta il carico principale - con tendenza in calo.',
                    research: 'Una distribuzione diseguale delle faccende domestiche riduce la soddisfazione sessuale delle donne del 50%.',
                    pirsig: 'L\'ordine non è controllo - è chiarezza dello spazio per la chiarezza della mente.',
                    osho: 'L\'ordine esteriore riflette l\'ordine interiore. Ma il riordino compulsivo può anche essere una fuga dal caos interiore.'
                }
            },
            reise: {
                label: 'Frequenza di viaggio',
                description: 'Desiderio di viaggi e vacanze condivise.',
                info: {
                    stats: 'I tedeschi viaggiano in media 2,4 volte all\'anno. Il 18% mai. Le differenze nei viaggi sono un conflitto frequente.',
                    research: 'Le esperienze condivise (non i regali materiali) rafforzano il legame di coppia nel modo più duraturo.',
                    pirsig: 'Viaggiare amplia gli schemi statici della quotidianità. Le nuove esperienze sono Qualità dinamica nella sua forma più pura.',
                    osho: 'Il viaggio più importante è quello interiore. Ma a volte serve il movimento esteriore per sciogliere la stagnazione interiore.'
                }
            }
        },

        slider: {
            niedrig: 'Basso',
            mittel: 'Medio',
            hoch: 'Alto',
            getrennt: 'Separato',
            hybrid: 'Ibrido',
            gemeinsam: 'Condiviso',
            familie: 'Famiglia',
            balance: 'Equilibrio',
            karriere: 'Carriera',
            unwichtig: 'Non importante',
            wichtig: 'Importante',
            sehrWichtig: 'Molto importante'
        },

        actions: {
            reset: 'Ripristina',
            save: 'Continua',
            close: 'Chiudi'
        },

        infoModal: {
            statistik: 'STATISTICA',
            forschung: 'RICERCA',
            pirsig: 'PIRSIG',
            osho: 'OSHO',
            verstanden: 'Capito'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_IT;
}
