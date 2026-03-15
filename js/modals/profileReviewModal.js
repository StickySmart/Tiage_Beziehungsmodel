/**
 * ProfileReviewModal — Profil-Überprüfungs-Modal
 * =================================================
 * Extracted from app-main.js (lines ~14378-16898)
 *
 * Provides all profile review modal functions:
 * - openProfileReviewModal / closeProfileReviewModal
 * - filterProfileReviewByNeed / resetProfileReviewFilter
 * - getProfileReviewState / saveProfileReview
 * - getSelectedArchetype
 * - Search/suggestion functions
 * - Attribute toggle functions (selectTripleBtn, selectToggleBtn, etc.)
 * - updateGeschlechtsidentitaetOptions, mapSecondaryToGeschlechtsidentitaet
 *
 * Dependencies (all globally available):
 * - TiageState (global)
 * - window.personDimensions (global)
 * - window.currentProfileReviewContext (global, set in app-main.js)
 * - BeduerfnisKatalog, GfkBeduerfnisse (global)
 * - AttributeSummaryCard, ProfileReviewRenderer (global)
 * - DimensionKategorieFilter (global)
 * - TiageI18n (global)
 * - archetypeDefinitions (global)
 * - updateComparisonView, updateGeschlechtGrid, saveGewichtungen (global)
 */

(function() {
'use strict';

var personDimensions = window.personDimensions;

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
// GEWICHTUNGS-EINSTELLUNGEN - ausgelagert nach js/components/GewichtungCard.js
// Alle Funktionen sind weiterhin über window.* verfügbar (Legacy-Kompatibilität)
// ═══════════════════════════════════════════════════════════════════════

// Open Profile Review Modal
// Hinweis: window.currentProfileReviewContext ist am Anfang der Datei definiert.
// person: 'ich' oder 'partner' - wird benötigt um Gender-Modifikatoren anzuwenden
function openProfileReviewModal(archetypeKey, person) {
    console.log('[TIAGE] openProfileReviewModal called:', archetypeKey, person);
    var modal = document.getElementById('profileReviewModal');
    if (!modal) {
        console.log('[TIAGE] profileReviewModal not found!');
        return;
    }

    // ════════════════════════════════════════════════════════════════════════
    // Zeige Ladeindikator während Daten geladen werden
    // ════════════════════════════════════════════════════════════════════════
    if (typeof ResonanzProfileHeaderCard !== 'undefined' && ResonanzProfileHeaderCard.setLoading) {
        ResonanzProfileHeaderCard.setLoading(true);
    }
    // Auch Modal-Card in Ladezustand versetzen
    var modalValuesContainer = document.getElementById('resonanzProfileModalValues');
    if (modalValuesContainer) {
        modalValuesContainer.classList.add('loading');
    }

    // Speichere Kontext für spätere Neuladung bei Gender-Änderung
    var previousPerson = window.currentProfileReviewContext.person;
    window.currentProfileReviewContext.archetypeKey = archetypeKey || 'duo';
    window.currentProfileReviewContext.person = person || 'ich';

    // ════════════════════════════════════════════════════════════════════════
    // FIX v1.8.455: Person-spezifische Filter und Sortierung wiederherstellen
    // Bei Wechsel zwischen ICH/PARTNER werden Filter und Sort-Mode gespeichert/geladen
    // ════════════════════════════════════════════════════════════════════════
    var newPerson = person || 'ich';
    if (previousPerson && previousPerson !== newPerson) {
        // FIX v1.8.687: CRITICAL - Speichere Daten der VORHERIGEN Person VOR dem Kontextwechsel
        // Ohne diesen Code gehen Resonanzfaktoren und Bedürfniswerte beim Tab-Wechsel verloren!
        if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
            TiageState.saveToStorage();
            console.log('[ProfileReview] TiageState gespeichert vor Kontextwechsel von', previousPerson, 'zu', newPerson);
        }

        // Filter-State wechseln (DimensionKategorieFilter)
        if (typeof DimensionKategorieFilter !== 'undefined' && DimensionKategorieFilter.switchPerson) {
            DimensionKategorieFilter.switchPerson(newPerson);
            console.log('[ProfileReview] Filter-State gewechselt von', previousPerson, 'zu', newPerson);
        }
        // Sort-State wechseln (AttributeSummaryCard)
        if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.switchSortPerson) {
            AttributeSummaryCard.switchSortPerson(newPerson);
            console.log('[ProfileReview] Sort-State gewechselt von', previousPerson, 'zu', newPerson);
        }
    } else if (!previousPerson) {
        // Erster Aufruf: Initialisiere States für die Person
        if (typeof DimensionKategorieFilter !== 'undefined' && DimensionKategorieFilter.loadStateForPerson) {
            DimensionKategorieFilter.loadStateForPerson(newPerson);
        }
        if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.loadSortModeForPerson) {
            AttributeSummaryCard.loadSortModeForPerson(newPerson);
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // FIX v1.8.455: Lade Bedürfnisse UND gesperrte Werte aus TiageState
    // 1. flatNeeds.{person} = berechnete Werte
    // 2. profileReview.{person}.lockedNeeds = manuell gesperrte Werte (überschreiben flatNeeds)
    // ════════════════════════════════════════════════════════════════════════
    if (typeof AttributeSummaryCard !== 'undefined') {
        try {
            var loadedFromTiageState = false;

            // PRIMÄR: Lade aus TiageState (Single Source of Truth)
            if (typeof TiageState !== 'undefined') {
                var tiageStateFlatNeeds = TiageState.get('flatNeeds.' + person);
                var lockedNeeds = TiageState.getLockedNeeds ? TiageState.getLockedNeeds(person) : {};

                if (tiageStateFlatNeeds && Object.keys(tiageStateFlatNeeds).length > 0) {
                    // FIX: Konvertiere zu Array-Format mit Lock-Status aus lockedNeeds
                    var needsArray = [];
                    Object.keys(tiageStateFlatNeeds).forEach(function(needId) {
                        var value = tiageStateFlatNeeds[needId];
                        var isLocked = lockedNeeds && lockedNeeds[needId] !== undefined;
                        // Wenn gesperrt, verwende den gesperrten Wert (überschreibt flatNeeds)
                        var finalValue = isLocked ? lockedNeeds[needId] : value;

                        needsArray.push({
                            id: needId,
                            value: finalValue,
                            locked: isLocked
                        });
                    });

                    if (AttributeSummaryCard.setFlatNeeds) {
                        AttributeSummaryCard.setFlatNeeds(needsArray);
                        // FIX v1.8.559: Synchronisiere Locks aus TiageState für korrekte Person
                        if (AttributeSummaryCard.syncLocksFromState) {
                            AttributeSummaryCard.syncLocksFromState();
                        }
                        var lockedCount = Object.keys(lockedNeeds || {}).length;
                        console.log('[ProfileReview] Bedürfnisse aus TiageState geladen für', person, ':', needsArray.length, 'Einträge,', lockedCount, 'gesperrt');
                        loadedFromTiageState = true;
                    }
                } else {
                    console.log('[ProfileReview] TiageState.flatNeeds.' + person + ' ist leer, versuche localStorage Fallback');
                }
            }

            // FALLBACK: localStorage nur wenn TiageState leer
            if (!loadedFromTiageState) {
                var storedFlatNeeds = localStorage.getItem('tiage_flat_needs');
                if (storedFlatNeeds) {
                    var parsedNeeds = JSON.parse(storedFlatNeeds);
                    if (AttributeSummaryCard.setFlatNeeds) {
                        AttributeSummaryCard.setFlatNeeds(parsedNeeds);
                        // FIX v1.8.559: Auch bei Fallback Locks synchronisieren
                        if (AttributeSummaryCard.syncLocksFromState) {
                            AttributeSummaryCard.syncLocksFromState();
                        }
                        console.log('[ProfileReview] Bedürfnisse aus localStorage geladen (Fallback):', Object.keys(parsedNeeds).length, 'Einträge');
                    }
                }
            }
        } catch (e) {
            console.warn('[ProfileReview] Fehler beim Laden der Bedürfnisse:', e);
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
        console.log('[DEBUG] Step 0a: initializeFlatModal done');
    } else {
        console.log('[TIAGE] ProfileReviewRenderer NOT defined!');
    }
    console.log('[DEBUG] Step 0b: before loadGewichtungenIntoUI');

    // Lade Gewichtungen in UI
    loadGewichtungenIntoUI();
    console.log('[DEBUG] Step 1: loadGewichtungenIntoUI done');

    // Get archetype data
    archetypeKey = archetypeKey || 'duo';
    person = person || 'ich';
    var archetype = typeof archetypeDefinitions !== 'undefined' ? archetypeDefinitions[archetypeKey] : null;

    // Update badge mit Profil-Info
    var badge = document.getElementById('profileReviewBadge');
    if (badge) {
        if (person === 'ich') {
            badge.textContent = TiageI18n.t('ui.yourProfileSetting', 'Deine Profileinstellung');
        } else {
            badge.textContent = TiageI18n.t('ui.partnerProfileSetting', 'Partner-Profileinstellung');
        }
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
    // console.log('[DEBUG] Step 2: before updateSourceExplanation'); // DISABLED: verursacht Message-Overflow
    updateSourceExplanation(archetypeKey, personData, dominanz, orientierung);
    // console.log('[DEBUG] Step 3: after updateSourceExplanation'); // DISABLED: verursacht Message-Overflow

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

        console.log('[ProfileReview] Lade Bedürfniswerte aus composedProfile.needs (' + Object.keys(composedProfile.needs).length + ' Bedürfnisse)');

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

        console.log('[ProfileReview] Bedürfniswerte geladen:', Object.keys(composedProfile.needs).length, 'Bedürfnisse');
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

    // ═══════════════════════════════════════════════════════════════════════════
    // RESONANZFAKTOREN: IMMER berechnen - gelockte Werte werden automatisch respektiert
    // ═══════════════════════════════════════════════════════════════════════════
    if (typeof ResonanzCard !== 'undefined') {
        var currentPerson = window.currentProfileReviewContext?.person || 'ich';

        // Bevorzuge recalculate() - es ist die modernere, einfachere Methode
        if (typeof ResonanzCard.recalculate === 'function') {
            ResonanzCard.recalculate(currentPerson);
            console.log('[ProfileReview] Resonanzfaktoren berechnet für', currentPerson);
        } else if (typeof ResonanzCard.loadCalculatedValues === 'function') {
            // Fallback: Legacy loadCalculatedValues
            var needs = ResonanzCard.getPersonNeeds
                ? ResonanzCard.getPersonNeeds(currentPerson, archetypeKey || 'duo')
                : null;

            if (needs) {
                var resonanzProfileContext = {
                    archetyp: archetypeKey || 'duo',
                    needs: needs,
                    dominanz: dominanz,
                    orientierung: orientierung,
                    geschlecht: personData ? personData.geschlecht : null
                };
                ResonanzCard.loadCalculatedValues(resonanzProfileContext, currentPerson);
                console.log('[ProfileReview] Resonanzfaktoren berechnet für', currentPerson, '(legacy)');
            }
        }
    }

    console.log('[DEBUG] Step 4: before reset changes counter');
    // Reset changes counter
    profileReviewChangesCount = 0;
    var badge = document.getElementById('profileReviewChangesBadge');
    if (badge) badge.style.display = 'none';

    // Save initial state
    console.log('[DEBUG] Step 5: before getProfileReviewState');
    profileReviewInitialState = getProfileReviewState();
    console.log('[DEBUG] Step 6: after getProfileReviewState');

    // Show modal
    console.log('[DEBUG] About to show modal, modal element:', modal);
    console.log('[DEBUG] modal.style before:', modal.style.display);
    modal.style.display = 'flex';
    modal.classList.add('active');
    console.log('[DEBUG] modal.style after:', modal.style.display, 'classes:', modal.className);

    // ════════════════════════════════════════════════════════════════════════
    // Beende Ladeindikator nach kurzer Verzögerung für visuelles Feedback
    // ════════════════════════════════════════════════════════════════════════
    setTimeout(function() {
        if (typeof ResonanzProfileHeaderCard !== 'undefined' && ResonanzProfileHeaderCard.setLoading) {
            ResonanzProfileHeaderCard.setLoading(false);
        }
        // Auch Modal-Card Ladezustand beenden
        var modalValuesContainer = document.getElementById('resonanzProfileModalValues');
        if (modalValuesContainer) {
            modalValuesContainer.classList.remove('loading');
        }
        // Aktualisiere auch die Resonanz-Karte mit den richtigen Werten
        if (typeof ResonanzProfileHeaderCard !== 'undefined' && ResonanzProfileHeaderCard.update) {
            ResonanzProfileHeaderCard.update();
        }
    }, 150);

    // ═══════════════════════════════════════════════════════════════════════════
    // CLICK HANDLER FÜR RA-PROFIL PERSPEKTIVEN
    // Beim Klicken auf eine Perspektive wird der entsprechende Resonanzfaktor in die Suche eingegeben
    // ═══════════════════════════════════════════════════════════════════════════
    setTimeout(function() {
        var resonanzProfileCards = document.querySelectorAll('#resonanzProfileModalValues .resonanz-profile-value-item');
        if (resonanzProfileCards && resonanzProfileCards.length > 0) {
            resonanzProfileCards.forEach(function(card) {
                // Entferne alte Event-Listener falls vorhanden
                var oldCard = card.cloneNode(true);
                card.parentNode.replaceChild(oldCard, card);

                // Füge neuen Click-Handler hinzu
                oldCard.addEventListener('click', function() {
                    // Extrahiere den Resonanzfaktor (R1, R2, R3, R4) aus dem Element
                    var resonanzIdElement = oldCard.querySelector('.resonanz-profile-value-id');
                    if (resonanzIdElement) {
                        var resonanzFaktor = resonanzIdElement.textContent.trim();

                        // Prüfe ob diese Karte bereits aktiv ist (Toggle-Verhalten)
                        var wasActive = oldCard.classList.contains('active');

                        // Entferne aktiven State von allen Perspektive-Karten
                        var allCards = document.querySelectorAll('#resonanzProfileModalValues .resonanz-profile-value-item');
                        allCards.forEach(function(c) {
                            c.classList.remove('active');
                        });

                        // Finde das Suchfeld
                        var searchInput = document.getElementById('profileReviewSearchInput');

                        if (wasActive) {
                            // Toggle: Wenn bereits aktiv, deaktiviere und leere die Suche
                            if (searchInput) {
                                searchInput.value = '';
                                if (typeof clearProfileReviewSearch === 'function') {
                                    clearProfileReviewSearch();
                                }
                            }
                            console.log('[ResonanzProfile] Perspektive deaktiviert:', resonanzFaktor);
                        } else {
                            // Setze aktiven State auf diese Karte
                            oldCard.classList.add('active');

                            if (searchInput && typeof handleIntelligentSearch === 'function') {
                                // Setze den Resonanzfaktor in das Suchfeld
                                searchInput.value = resonanzFaktor;

                                // Trigger die Suchfunktion
                                handleIntelligentSearch(resonanzFaktor);

                                // Fokussiere das Suchfeld für bessere UX
                                searchInput.focus();

                                console.log('[ResonanzProfile] Suche nach Resonanzfaktor:', resonanzFaktor);
                            }
                        }
                    }
                });

                // Füge hover-Stil hinzu um Klickbarkeit zu signalisieren
                oldCard.style.cursor = 'pointer';
            });
            console.log('[ResonanzProfile] Click-Handler für', resonanzProfileCards.length, 'Perspektiven hinzugefügt');
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // FIX: Suchfeld Event-Listener direkt hinzufügen
        // Das oninput-Attribut wird überschrieben, daher expliziter Listener
        // ═══════════════════════════════════════════════════════════════════════════
        var searchInput = document.getElementById('profileReviewSearchInput');
        if (searchInput) {
            console.log('[Search FIX] Adding input event listener to search field');

            // Entferne alte Listener durch Klonen
            var newSearchInput = searchInput.cloneNode(true);
            searchInput.parentNode.replaceChild(newSearchInput, searchInput);

            // Input Event
            newSearchInput.addEventListener('input', function(e) {
                var query = e.target.value;
                console.log('[Search FIX] Input event, query:', query);
                if (typeof handleIntelligentSearch === 'function') {
                    handleIntelligentSearch(query);
                }
            });

            // Focus Event
            newSearchInput.addEventListener('focus', function() {
                if (typeof showSearchSuggestions === 'function') {
                    showSearchSuggestions();
                }
            });

            // Keydown Event
            newSearchInput.addEventListener('keydown', function(e) {
                if (typeof handleSearchKeydown === 'function') {
                    handleSearchKeydown(e);
                }
            });

            console.log('[Search FIX] Event listeners attached');
        }
    }, 100); // Kurzes Timeout um sicherzustellen dass DOM vollständig gerendert ist
}
// DEPRECATED: Modal wurde durch needs-editor.html Seite ersetzt
// window.openProfileReviewModal = openProfileReviewModal;

// Close Profile Review Modal (DEPRECATED)
function closeProfileReviewModal(event) {
    // Prüfe ob das Klick-Event auf dem Overlay selbst stattfand (nicht auf Kind-Elementen)
    if (event && event.target !== event.currentTarget) return;

    // Zusätzliche Prüfung: Wenn innerhalb des Modal-Contents geklickt wurde, nicht schließen
    if (event) {
        var modalContent = document.querySelector('.profile-review-modal');
        if (modalContent && modalContent.contains(event.target)) {
            // Klick war innerhalb des Modal-Contents - nur Such-Dropdown schließen
            if (typeof hideSearchSuggestions === 'function') {
                hideSearchSuggestions();
            }
            return;
        }
    }

    // FIX v1.8.687: CRITICAL - Speichere alle Änderungen VOR dem Schließen des Modals
    // Ohne diesen Code gehen Resonanzfaktoren und Bedürfniswerte verloren!
    if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
        TiageState.saveToStorage();
        console.log('[closeProfileReviewModal] TiageState gespeichert vor Modal-Close');
    }

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
// DEPRECATED: window.closeProfileReviewModal = closeProfileReviewModal;

// Toggle Source Explanation Section (DEPRECATED)
function toggleSourceExplanation() {
    var content = document.getElementById('sourceExplanationContent');
    var toggle = document.getElementById('sourceExplanationToggle');
    if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
    }
}
// DEPRECATED: window.toggleSourceExplanation = toggleSourceExplanation;

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
 * Check if text matches all comma-separated criteria (AND logic)
 * @param {string} searchableText - Text to search in
 * @param {string} query - Comma-separated search criteria
 * @returns {boolean} True if ALL criteria match
 */
function matchesAllCriteria(searchableText, query) {
    var criteria = query.split(',').map(function(c) { return c.trim(); }).filter(function(c) { return c.length > 0; });

    if (criteria.length === 0) return false;

    for (var i = 0; i < criteria.length; i++) {
        var pattern = needWildcardToRegex(criteria[i]);
        if (!pattern.test(searchableText)) {
            return false;
        }
    }
    return true;
}

/**
 * Filter profile review modal by need name
 * @param {string} query - Search query (supports * wildcard)
 */
function filterProfileReviewByNeed(query) {
    console.log('[Filter] filterProfileReviewByNeed called with query:', query);

    var searchWrapper = document.querySelector('.profile-review-search-wrapper');
    var hint = document.getElementById('profileReviewSearchHint');
    // SSOT: Suche zuerst im Modal-Container, dann Fallback auf flat-needs-container (needs-editor.html)
    var contentContainer = document.getElementById('profileReviewContent')
        || document.querySelector('.flat-needs-container')?.parentElement;

    console.log('[Filter] contentContainer found:', !!contentContainer);

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

    var totalMatches = 0;
    var matchedAttributes = 0;

    // Check if we're in flat view mode (flat-needs-container present)
    var flatContainer = contentContainer.querySelector('.flat-needs-container');
    var isFlatView = !!flatContainer;

    console.log('[Filter] isFlatView:', isFlatView);

    if (isFlatView) {
        // FLAT VIEW: Search in flat-need-item elements
        var flatNeedItems = contentContainer.querySelectorAll('.flat-need-item');

        console.log('[Filter] Found flat need items:', flatNeedItems.length);

        flatNeedItems.forEach(function(needItem) {
            var needLabel = needItem.querySelector('.flat-need-label');
            if (!needLabel) return;

            var labelText = needLabel.textContent || '';
            var needId = needItem.getAttribute('data-need') || '';

            // Collect all searchable text for this need
            var searchableTexts = [labelText, needId];

            if (typeof GfkBeduerfnisse !== 'undefined') {
                var needDef = GfkBeduerfnisse.getDefinition
                    ? GfkBeduerfnisse.getDefinition(needId)
                    : GfkBeduerfnisse.definitionen[needId];
                if (needDef) {
                    if (needDef.description) searchableTexts.push(needDef.description);
                    var kategorie = needDef.kategorie || '';
                    if (kategorie) searchableTexts.push(kategorie);

                    if (typeof TiageTaxonomie !== 'undefined') {
                        var katData = TiageTaxonomie.getKategorie
                            ? TiageTaxonomie.getKategorie(kategorie)
                            : null;
                        if (katData) {
                            if (katData.label) searchableTexts.push(katData.label);
                            if (katData.beschreibung) searchableTexts.push(katData.beschreibung);
                            if (katData.id) searchableTexts.push(katData.id);
                            if (katData.dimension) {
                                var dimData = TiageTaxonomie.getDimension
                                    ? TiageTaxonomie.getDimension(katData.dimension)
                                    : null;
                                if (dimData) {
                                    if (dimData.label) searchableTexts.push(dimData.label);
                                    if (dimData.beschreibung) searchableTexts.push(dimData.beschreibung);
                                    if (dimData.id) searchableTexts.push(dimData.id);
                                }
                            }
                        }
                    }
                }
            }

            // Check if ALL comma-separated criteria match (AND logic)
            var matches = matchesAllCriteria(searchableTexts.join(' '), query.trim());

            // Toggle visibility and match class for flat view
            needItem.classList.toggle('filter-hidden', !matches);
            needItem.classList.toggle('filter-match', matches);

            if (matches) {
                totalMatches++;
            }
        });

        console.log('[Filter] Total matches found:', totalMatches);

        // v1.8.998: Hauptfragen-Filter ENTFERNT — alle Needs sind flache Items

        // In flat view, count visible items as "matched attributes"
        matchedAttributes = totalMatches > 0 ? 1 : 0;

    } else {
        // CARD VIEW: Original behavior with attribute-summary-card
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

                // Collect all searchable text for this need
                var searchableTexts = [labelText, needId];

                if (typeof GfkBeduerfnisse !== 'undefined') {
                    var needDef = GfkBeduerfnisse.getDefinition
                        ? GfkBeduerfnisse.getDefinition(needId)
                        : GfkBeduerfnisse.definitionen[needId];
                    if (needDef) {
                        if (needDef.description) searchableTexts.push(needDef.description);
                        var kategorie = needDef.kategorie || '';
                        if (kategorie) searchableTexts.push(kategorie);

                        if (typeof TiageTaxonomie !== 'undefined') {
                            var katData = TiageTaxonomie.getKategorie
                                ? TiageTaxonomie.getKategorie(kategorie)
                                : null;
                            if (katData) {
                                if (katData.label) searchableTexts.push(katData.label);
                                if (katData.beschreibung) searchableTexts.push(katData.beschreibung);
                                if (katData.id) searchableTexts.push(katData.id);
                                if (katData.dimension) {
                                    var dimData = TiageTaxonomie.getDimension
                                        ? TiageTaxonomie.getDimension(katData.dimension)
                                        : null;
                                    if (dimData) {
                                        if (dimData.label) searchableTexts.push(dimData.label);
                                        if (dimData.beschreibung) searchableTexts.push(dimData.beschreibung);
                                        if (dimData.id) searchableTexts.push(dimData.id);
                                    }
                                }
                            }
                        }
                    }
                }

                // Check if ALL comma-separated criteria match (AND logic)
                var matches = matchesAllCriteria(searchableTexts.join(' '), query.trim());

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
    }

    // Update hint
    if (hint) {
        if (totalMatches > 0) {
            if (isFlatView) {
                hint.textContent = TiageI18n.t('ui.needsFound', '{count} Bedürfnisse gefunden').replace('{count}', totalMatches);
            } else {
                hint.textContent = TiageI18n.t('ui.needsFoundInAttributes', '{count} Bedürfnisse in {attrs} Attributen gefunden').replace('{count}', totalMatches).replace('{attrs}', matchedAttributes);
            }
            hint.classList.add('has-results');
        } else {
            hint.textContent = TiageI18n.t('ui.noNeedsFound', 'Keine Bedürfnisse gefunden. Tipp: Verwende * als Platzhalter (z.B. *kind*) - sucht in #B, #K, #D, #P');
            hint.classList.add('no-results');
        }
    }

    // Update subtitle with filtered count (FIX: #859)
    if (isFlatView) {
        var subtitle = contentContainer.querySelector('.flat-needs-subtitle');
        if (subtitle) {
            var allFlatItems = contentContainer.querySelectorAll('.flat-need-item');
            var totalNeeds = allFlatItems.length;
            var visibleNeeds = contentContainer.querySelectorAll('.flat-need-item:not(.filter-hidden)').length;

            // Get archetype label from AttributeSummaryCard or extract from subtitle
            var archetypLabel = (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.getCurrentArchetypLabel)
                ? AttributeSummaryCard.getCurrentArchetypLabel()
                : null;
            if (!archetypLabel) {
                var currentText = subtitle.textContent || '';
                var archetypMatch = currentText.match(/Dein\s+(\S+)-Profil/);
                archetypLabel = archetypMatch ? archetypMatch[1] : 'Profil';
            }

            if (query && query.trim() !== '' && visibleNeeds < totalNeeds) {
                subtitle.textContent = TiageI18n.t('ui.yourProfile', 'Dein {archetype}-Profil ({visible} von {total} Bedürfnissen)').replace('{archetype}', archetypLabel).replace('{visible}', visibleNeeds).replace('{total}', totalNeeds);
            } else {
                subtitle.textContent = TiageI18n.t('ui.yourProfileAll', 'Dein {archetype}-Profil ({total} Bedürfnisse)').replace('{archetype}', archetypLabel).replace('{total}', totalNeeds);
            }
        }
    }
}
window.filterProfileReviewByNeed = filterProfileReviewByNeed;

/**
 * Reset all filter states
 */
function resetProfileReviewFilter() {
    // SSOT: Suche zuerst im Modal-Container, dann Fallback auf flat-needs-container (needs-editor.html)
    var contentContainer = document.getElementById('profileReviewContent')
        || document.querySelector('.flat-needs-container')?.parentElement;
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

    // Remove has-matching-nuancen class from hauptfrage-items
    var nuancenMatchItems = contentContainer.querySelectorAll('.has-matching-nuancen');
    nuancenMatchItems.forEach(function(el) {
        el.classList.remove('has-matching-nuancen');
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

    // Reset subtitle to show total count (FIX: #859)
    var subtitle = contentContainer.querySelector('.flat-needs-subtitle');
    if (subtitle) {
        var allFlatItems = contentContainer.querySelectorAll('.flat-need-item');
        var totalNeeds = allFlatItems.length;

        // Get archetype label from AttributeSummaryCard or extract from subtitle
        var archetypLabel = (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.getCurrentArchetypLabel)
            ? AttributeSummaryCard.getCurrentArchetypLabel()
            : null;
        if (!archetypLabel) {
            var currentText = subtitle.textContent || '';
            var archetypMatch = currentText.match(/Dein\s+(\S+)-Profil/);
            archetypLabel = archetypMatch ? archetypMatch[1] : 'Profil';
        }

        subtitle.textContent = TiageI18n.t('ui.yourProfileAll', 'Dein {archetype}-Profil ({total} Bedürfnisse)').replace('{archetype}', archetypLabel).replace('{total}', totalNeeds);
    }
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

    // Lösche auch die aktive Suggestion
    if (typeof suggestionState !== 'undefined') {
        suggestionState.activeSuggestion = null;
    }

    var hint = document.getElementById('profileReviewSearchHint');
    if (hint) {
        hint.innerHTML = '';
        hint.classList.remove('has-results', 'no-results', 'has-active-selection');
    }

    var searchWrapper = document.querySelector('.profile-review-search-wrapper');
    if (searchWrapper) {
        searchWrapper.classList.remove('has-value');
    }

    // Entferne aktiven State von allen Perspektive-Karten
    var resonanzProfileCards = document.querySelectorAll('#resonanzProfileModalValues .resonanz-profile-value-item');
    resonanzProfileCards.forEach(function(card) {
        card.classList.remove('active');
    });
}
window.clearProfileReviewSearch = clearProfileReviewSearch;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INTELLIGENT SEARCH SUGGESTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Global state for suggestions
var suggestionState = {
    selectedIndex: -1,
    suggestions: [],
    activeSuggestion: null  // Speichert die ausgewählte Suggestion
};

/**
 * Get perspective information for a category
 */
function getPerspectiveForCategory(categoryKey) {
    // Check if PerspektivenModal component exists
    if (window.PerspektivenModal && window.PerspektivenModal.kategoriePerspektiven) {
        var perspId = window.PerspektivenModal.kategoriePerspektiven[categoryKey];
        if (perspId && window.PerspektivenModal.perspektiven[perspId]) {
            return window.PerspektivenModal.perspektiven[perspId];
        }
    }
    return null;
}

/**
 * Get perspective information for a need
 */
function getPerspectiveForNeed(needId) {
    if (!window.BeduerfnisKatalog || !window.BeduerfnisKatalog.beduerfnisse) return null;

    var need = window.BeduerfnisKatalog.beduerfnisse[needId];
    if (!need || !need.kategorie) return null;

    // Get category from need
    var categoryId = need.kategorie;
    if (!window.TiageTaxonomie || !window.TiageTaxonomie.kategorien) return null;

    var category = window.TiageTaxonomie.kategorien[categoryId];
    if (!category || !category.key) return null;

    return getPerspectiveForCategory(category.key);
}

/**
 * Check if a string starts with the query (case-insensitive)
 * @param {string} text - Text to check
 * @param {string} query - Query to match against
 * @returns {boolean} True if text starts with query
 */
function startsWithQuery(text, query) {
    if (!text || !query) return false;
    return text.toLowerCase().startsWith(query.toLowerCase());
}

// Levenshtein distance: delegated to js/utils/fuzzySearch.js
var levenshteinDistance = TiageFuzzySearch.levenshteinDistance;

// Fuzzy match score: delegated to js/utils/fuzzySearch.js
var fuzzyMatchScore = TiageFuzzySearch.fuzzyMatchScore;

/**
 * Generate search suggestions based on query
 * For comma-separated queries, only suggest for the last criterion
 */
function generateSearchSuggestions(query) {
    var suggestions = [];

    // For comma-separated queries, only use the last criterion for suggestions
    var parts = query.split(',');
    var lastPart = parts[parts.length - 1].trim();
    var lowerQuery = lastPart.toLowerCase();

    // If last part is empty, show all items for browsing
    // But only if this is the FIRST part (no previous criteria exist)
    // If there are previous criteria (trailing comma), return empty suggestions instead
    if (!lowerQuery) {
        // Trailing comma with existing criteria - don't show all items, just return empty
        if (parts.length > 1) {
            return suggestions;
        }
        // Show all categories (18 total)
        if (window.TiageTaxonomie && window.TiageTaxonomie.kategorien) {
            Object.values(window.TiageTaxonomie.kategorien).forEach(function(kat) {
                var persp = getPerspectiveForCategory(kat.key);
                suggestions.push({
                    type: 'category',
                    id: kat.id,
                    label: kat.label,
                    description: kat.beschreibung,
                    perspective: persp
                });
            });
        }

        // Show all dimensions (6 total)
        if (window.TiageTaxonomie && window.TiageTaxonomie.dimensionen) {
            Object.values(window.TiageTaxonomie.dimensionen).forEach(function(dim) {
                suggestions.push({
                    type: 'dimension',
                    id: dim.id,
                    label: dim.label,
                    description: dim.beschreibung,
                    perspective: null
                });
            });
        }

        // Show all resonance factors (4 total)
        var resonanzfaktoren = {
            'R1': { id: 'R1', label: 'Leben', icon: '🔥', beschreibung: 'Orientierung - Existenz, Zuneigung, Muße, Intimität' },
            'R2': { id: 'R2', label: 'Philosophie', icon: '🧠', beschreibung: 'Archetyp - Lebensplanung, Werte, Finanzen' },
            'R3': { id: 'R3', label: 'Dynamik', icon: '⚡', beschreibung: 'Dominanz - Machtdynamik, BDSM, Sicherheit' },
            'R4': { id: 'R4', label: 'Identität', icon: '💚', beschreibung: 'Geschlecht - Authentizität, Kommunikation, Selbstausdruck' }
        };
        Object.values(resonanzfaktoren).forEach(function(resonanz) {
            suggestions.push({
                type: 'resonanz',
                id: resonanz.id,
                label: resonanz.label,
                icon: resonanz.icon,
                description: resonanz.beschreibung,
                perspective: null
            });
        });

        // Show all perspectives (4 total)
        if (window.TiageTaxonomie && window.TiageTaxonomie.perspektiven) {
            Object.values(window.TiageTaxonomie.perspektiven).forEach(function(persp) {
                suggestions.push({
                    type: 'perspective',
                    id: persp.id,
                    label: persp.label,
                    description: persp.beschreibung,
                    source: persp.quelle,
                    perspective: null
                });
            });
        }

        return suggestions; // Return all (18+6+4+4 = 32 items)
    }

    // Search in needs (Bedürfnisse)
    // Try BeduerfnisKatalog first, fallback to BeduerfnisIds
    var needsSource = null;
    if (window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse) {
        needsSource = window.BeduerfnisKatalog.beduerfnisse;
    } else if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.beduerfnisse) {
        needsSource = BeduerfnisIds.beduerfnisse;
    }

    if (needsSource) {
        // FIX #878: Object.entries statt Object.values um die ID (Schlüssel) zu erhalten
        Object.entries(needsSource).forEach(function(entry) {
            var needId = entry[0];  // '#B21' etc.
            var need = entry[1];    // { key, kategorie, label, frage? }
            var matchScore = 0;

            // Check label with fuzzy matching
            if (need.label) {
                var labelScore = fuzzyMatchScore(need.label, lastPart, 2);
                if (labelScore > 0) {
                    // Scale fuzzy score to our scoring system (max 10 for needs label)
                    matchScore = Math.round(labelScore / 10);
                }
            }

            // Check ID (exact match only for IDs)
            if (needId && needId.toLowerCase().includes(lowerQuery)) {
                matchScore = Math.max(matchScore, 8);
            }

            // Check description/frage with fuzzy matching
            if (need.frage) {
                var frageScore = fuzzyMatchScore(need.frage, lastPart, 2);
                if (frageScore > 0) {
                    matchScore = Math.max(matchScore, Math.round(frageScore / 15));
                }
            }

            if (matchScore > 0) {
                var persp = getPerspectiveForNeed(needId);
                suggestions.push({
                    type: 'need',
                    id: needId,
                    label: need.label,
                    description: need.frage || '',
                    perspective: persp,
                    score: matchScore
                });
            }
        });
    }

    // Search in categories (Kategorien)
    if (window.TiageTaxonomie && window.TiageTaxonomie.kategorien) {
        Object.values(window.TiageTaxonomie.kategorien).forEach(function(kat) {
            var matchScore = 0;

            // Check label with fuzzy matching
            if (kat.label) {
                var labelScore = fuzzyMatchScore(kat.label, lastPart, 2);
                if (labelScore > 0) {
                    matchScore = Math.round(labelScore / 11); // Scale to max 9
                }
            }

            // Check description with fuzzy matching
            if (kat.beschreibung) {
                var descScore = fuzzyMatchScore(kat.beschreibung, lastPart, 2);
                if (descScore > 0) {
                    matchScore = Math.max(matchScore, Math.round(descScore / 14)); // Scale to max 7
                }
            }

            // Check ID (exact match only)
            if (kat.id && kat.id.toLowerCase().includes(lowerQuery)) {
                matchScore = Math.max(matchScore, 8);
            }

            if (matchScore > 0) {
                var persp = getPerspectiveForCategory(kat.key);
                suggestions.push({
                    type: 'category',
                    id: kat.id,
                    label: kat.label,
                    description: kat.beschreibung,
                    perspective: persp,
                    score: matchScore
                });
            }
        });
    }

    // Search in dimensions (Dimensionen)
    if (window.TiageTaxonomie && window.TiageTaxonomie.dimensionen) {
        Object.values(window.TiageTaxonomie.dimensionen).forEach(function(dim) {
            var matchScore = 0;

            // Check label with fuzzy matching
            if (dim.label) {
                var labelScore = fuzzyMatchScore(dim.label, lastPart, 2);
                if (labelScore > 0) {
                    matchScore = Math.round(labelScore / 12); // Scale to max 8
                }
            }

            // Check description with fuzzy matching
            if (dim.beschreibung) {
                var descScore = fuzzyMatchScore(dim.beschreibung, lastPart, 2);
                if (descScore > 0) {
                    matchScore = Math.max(matchScore, Math.round(descScore / 16)); // Scale to max 6
                }
            }

            // Check ID (exact match only)
            if (dim.id && dim.id.toLowerCase().includes(lowerQuery)) {
                matchScore = Math.max(matchScore, 7);
            }

            if (matchScore > 0) {
                suggestions.push({
                    type: 'dimension',
                    id: dim.id,
                    label: dim.label,
                    description: dim.beschreibung,
                    perspective: null,
                    score: matchScore
                });
            }
        });
    }

    // Search in perspectives (Perspektiven)
    if (window.TiageTaxonomie && window.TiageTaxonomie.perspektiven) {
        Object.values(window.TiageTaxonomie.perspektiven).forEach(function(persp) {
            var matchScore = 0;

            // Check label with fuzzy matching
            if (persp.label) {
                var labelScore = fuzzyMatchScore(persp.label, lastPart, 2);
                if (labelScore > 0) {
                    matchScore = Math.round(labelScore / 14); // Scale to max 7
                }
            }

            // Check description with fuzzy matching
            if (persp.beschreibung) {
                var descScore = fuzzyMatchScore(persp.beschreibung, lastPart, 2);
                if (descScore > 0) {
                    matchScore = Math.max(matchScore, Math.round(descScore / 20)); // Scale to max 5
                }
            }

            // Check ID
            if (persp.id && persp.id.toLowerCase().includes(lowerQuery)) {
                matchScore = Math.max(matchScore, 6);
            }

            if (matchScore > 0) {
                suggestions.push({
                    type: 'perspective',
                    id: persp.id,
                    label: persp.label,
                    description: persp.beschreibung,
                    source: persp.quelle,
                    perspective: null,
                    score: matchScore
                });
            }
        });
    }

    // Search in resonance factors (Resonanzfaktoren R1-R4)
    var resonanzfaktoren = {
        'R1': { id: 'R1', label: 'Leben', icon: '🔥', beschreibung: 'Orientierung - Existenz, Zuneigung, Muße, Intimität' },
        'R2': { id: 'R2', label: 'Philosophie', icon: '🧠', beschreibung: 'Archetyp - Lebensplanung, Werte, Finanzen' },
        'R3': { id: 'R3', label: 'Dynamik', icon: '⚡', beschreibung: 'Dominanz - Machtdynamik, BDSM, Sicherheit' },
        'R4': { id: 'R4', label: 'Identität', icon: '💚', beschreibung: 'Geschlecht - Authentizität, Kommunikation, Selbstausdruck' }
    };

    Object.values(resonanzfaktoren).forEach(function(resonanz) {
        var matchScore = 0;

        // Check label with fuzzy matching
        if (resonanz.label) {
            var labelScore = fuzzyMatchScore(resonanz.label, lastPart, 2);
            if (labelScore > 0) {
                matchScore = Math.round(labelScore / 12); // Scale to max 8
            }
        }

        // Check description with fuzzy matching
        if (resonanz.beschreibung) {
            var descScore = fuzzyMatchScore(resonanz.beschreibung, lastPart, 2);
            if (descScore > 0) {
                matchScore = Math.max(matchScore, Math.round(descScore / 16)); // Scale to max 6
            }
        }

        // Check ID (exact match only)
        if (resonanz.id && resonanz.id.toLowerCase().includes(lowerQuery)) {
            matchScore = Math.max(matchScore, 7);
        }

        if (matchScore > 0) {
            suggestions.push({
                type: 'resonanz',
                id: resonanz.id,
                label: resonanz.label,
                icon: resonanz.icon,
                description: resonanz.beschreibung,
                perspective: null,
                score: matchScore
                });
        }
    });

    // Sort by score and limit results
    suggestions.sort(function(a, b) {
        return (b.score || 0) - (a.score || 0);
    });

    return suggestions.slice(0, 15);
}

/**
 * Render suggestion item HTML
 */
function renderSuggestionItem(suggestion, index) {
    var typeLabel = {
        'need': 'Bedürfnis',
        'category': 'Kategorie',
        'dimension': 'Dimension',
        'resonanz': 'Resonanzfaktor',
        'perspective': 'Perspektive'
    }[suggestion.type] || suggestion.type;

    var perspectiveHTML = '';
    if (suggestion.perspective) {
        var icon = suggestion.perspective.icon || '📊';
        var label = suggestion.perspective.label || '';
        perspectiveHTML = '<div class="suggestion-item-perspective">' +
            '<span class="suggestion-item-perspective-icon">' + icon + '</span>' +
            '<span>Perspektive: ' + label + '</span>' +
            '</div>';
    }

    var descriptionHTML = '';
    if (suggestion.description) {
        var desc = suggestion.description;
        if (desc.length > 120) {
            desc = desc.substring(0, 120) + '...';
        }
        descriptionHTML = '<div class="suggestion-item-description">' + desc + '</div>';
    }

    // Add icon for resonanz type
    var iconPrefix = suggestion.icon ? suggestion.icon + ' ' : '';

    return '<div class="suggestion-item' + (index === suggestionState.selectedIndex ? ' active' : '') + '" ' +
           'data-index="' + index + '" ' +
           'data-value="' + suggestion.label + '">' +
           '<div class="suggestion-item-header">' +
           '<span class="suggestion-item-type type-' + suggestion.type + '">' + typeLabel + '</span>' +
           '<span class="suggestion-item-label">' + iconPrefix + suggestion.label + '</span>' +
           '<span class="suggestion-item-id">' + suggestion.id + '</span>' +
           '</div>' +
           descriptionHTML +
           perspectiveHTML +
           '</div>';
}

/**
 * Display search suggestions
 */
function displaySearchSuggestions(suggestions) {
    var dropdown = document.getElementById('searchSuggestionsDropdown');
    var content = dropdown ? dropdown.querySelector('.search-suggestions-content') : null;

    if (!dropdown || !content) {
        return;
    }

    suggestionState.suggestions = suggestions;
    suggestionState.selectedIndex = -1;

    if (suggestions.length === 0) {
        var searchInput = document.getElementById('profileReviewSearchInput');
        var currentQuery = searchInput ? searchInput.value : '';
        var parts = currentQuery.split(',');
        var lastPart = parts[parts.length - 1].trim();

        var helpMessage = '<div class="search-suggestions-empty">' +
            '<div style="font-weight: bold; margin-bottom: 8px;">Keine Vorschläge für "' + lastPart + '"</div>' +
            '<div style="font-size: 0.85em; color: #888;">' +
            'Tipps:' +
            '<ul style="margin: 4px 0; padding-left: 16px;">' +
            '<li>Verwende längere Suchbegriffe (mind. 3 Zeichen)</li>' +
            '<li>Prüfe die Schreibweise</li>' +
            '<li>Nutze * als Wildcard (z.B. "lieb*")</li>' +
            '</ul></div></div>';
        content.innerHTML = helpMessage;
        dropdown.style.display = 'block';
        return;
    }

    // Group suggestions by type
    var grouped = {
        'need': [],
        'category': [],
        'dimension': [],
        'resonanz': [],
        'perspective': []
    };

    suggestions.forEach(function(suggestion, index) {
        if (grouped[suggestion.type]) {
            grouped[suggestion.type].push({suggestion: suggestion, index: index});
        }
    });

    var html = '';
    var currentIndex = 0;

    // Render in order: needs, categories, dimensions, resonanz, perspectives
    var order = ['need', 'category', 'dimension', 'resonanz', 'perspective'];
    var headers = {
        'need': 'Bedürfnisse',
        'category': 'Kategorien',
        'dimension': 'Dimensionen',
        'resonanz': 'Resonanzfaktoren',
        'perspective': 'Perspektiven'
    };

    order.forEach(function(type) {
        if (grouped[type].length > 0) {
            html += '<div class="suggestion-section-header">' + headers[type] + '</div>';
            grouped[type].forEach(function(item) {
                html += renderSuggestionItem(item.suggestion, item.index);
            });
        }
    });

    content.innerHTML = html;
    dropdown.style.display = 'block';

    // Add click handlers
    content.querySelectorAll('.suggestion-item').forEach(function(item) {
        item.addEventListener('click', function() {
            selectSuggestion(parseInt(item.getAttribute('data-index')));
        });
    });
}

/**
 * Hide search suggestions
 */
function hideSearchSuggestions() {
    var dropdown = document.getElementById('searchSuggestionsDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    suggestionState.selectedIndex = -1;
}
window.hideSearchSuggestions = hideSearchSuggestions;

/**
 * Handle intelligent search input
 */
function handleIntelligentSearch(query) {
    // Call original filter function
    filterProfileReviewByNeed(query);

    // Generate and display suggestions
    var suggestions = generateSearchSuggestions(query);
    displaySearchSuggestions(suggestions);
}
window.handleIntelligentSearch = handleIntelligentSearch;

/**
 * Show search suggestions on focus
 */
function showSearchSuggestions() {
    var input = document.getElementById('profileReviewSearchInput');
    if (!input) return;

    var query = input.value || '';
    var suggestions = generateSearchSuggestions(query);
    displaySearchSuggestions(suggestions);
}
window.showSearchSuggestions = showSearchSuggestions;

/**
 * Select a suggestion
 */
function selectSuggestion(index) {
    if (index < 0 || index >= suggestionState.suggestions.length) return;

    var suggestion = suggestionState.suggestions[index];
    var input = document.getElementById('profileReviewSearchInput');

    // Speichere die ausgewählte Suggestion
    suggestionState.activeSuggestion = suggestion;

    // Entferne aktiven State von allen Perspektive-Karten
    var resonanzProfileCards = document.querySelectorAll('#resonanzProfileModalValues .resonanz-profile-value-item');
    resonanzProfileCards.forEach(function(card) {
        card.classList.remove('active');
    });

    // Wenn die Suggestion ein Resonanzfaktor ist, setze den entsprechenden aktiven State
    if (suggestion.type === 'resonanz' && suggestion.id) {
        resonanzProfileCards.forEach(function(card) {
            var idElement = card.querySelector('.resonanz-profile-value-id');
            if (idElement && idElement.textContent.trim() === suggestion.id) {
                card.classList.add('active');
            }
        });
    }

    // FIX #865: Aktiviere die entsprechenden Kategorien im DimensionKategorieFilter
    // FIX #879: Bei Bedürfnis-Auswahl NUR Textfilter verwenden (nicht Kategorie-Filter)
    if (typeof DimensionKategorieFilter !== 'undefined') {
        // Erst alle bestehenden Filter zurücksetzen
        DimensionKategorieFilter.reset();

        if (suggestion.type === 'dimension' && suggestion.id) {
            // Bei Dimension: Aktiviere alle Kategorien, die zu dieser Dimension gehören
            if (typeof TiageTaxonomie !== 'undefined') {
                var kategorien = TiageTaxonomie.getKategorienFuerDimension
                    ? TiageTaxonomie.getKategorienFuerDimension(suggestion.id)
                    : [];
                kategorien.forEach(function(kat) {
                    DimensionKategorieFilter.toggleKategorie(kat.id);
                });
                console.log('[selectSuggestion] Dimension aktiviert:', suggestion.id, '- Kategorien:', kategorien.map(function(k) { return k.id; }));
            }
        } else if (suggestion.type === 'category' && suggestion.id) {
            // Bei Kategorie: Aktiviere diese Kategorie
            DimensionKategorieFilter.toggleKategorie(suggestion.id);
            console.log('[selectSuggestion] Kategorie aktiviert:', suggestion.id);
        } else if (suggestion.type === 'resonanz' && suggestion.id) {
            // Bei Resonanzfaktor: Aktiviere alle zugehörigen Kategorien
            var resonanzKategorien = DimensionKategorieFilter.KATEGORIEN_PRO_DIMENSION[suggestion.id];
            if (resonanzKategorien && resonanzKategorien.length > 0) {
                resonanzKategorien.forEach(function(kat) {
                    DimensionKategorieFilter.toggleKategorie(kat.id);
                });
                console.log('[selectSuggestion] Resonanzfaktor aktiviert:', suggestion.id, '- Kategorien:', resonanzKategorien.map(function(k) { return k.id; }));
            }
        } else if (suggestion.type === 'need' && suggestion.id) {
            // FIX #879: Bei Bedürfnis-Auswahl NUR Textfilter verwenden
            // Der Textfilter zeigt alle Bedürfnisse mit dem Suchbegriff im Namen
            // (z.B. "Liebe" zeigt "Liebe" und "Liebesbekundungen")
            console.log('[selectSuggestion] Bedürfnis als Textsuche:', suggestion.label);
        }
    }

    if (input) {
        // Preserve previous criteria (before last comma) and replace last part
        var currentValue = input.value;
        var parts = currentValue.split(',');
        parts[parts.length - 1] = suggestion.label;
        var newValue = parts.join(',');

        input.value = newValue;
        // Rufe nur filterProfileReviewByNeed auf, nicht handleIntelligentSearch
        // um das erneute Öffnen des Dropdowns zu vermeiden
        filterProfileReviewByNeed(newValue);
    }

    hideSearchSuggestions();

    // Zeige die ausgewählte Suggestion an
    displayActiveSuggestion();
}

/**
 * Display the active/selected suggestion as a tag
 */
function displayActiveSuggestion() {
    var hint = document.getElementById('profileReviewSearchHint');
    if (!hint) return;

    var suggestion = suggestionState.activeSuggestion;
    if (!suggestion) {
        return;
    }

    // FIX #879: Bei Bedürfnis-Auswahl Textsuche-Tag anzeigen
    if (suggestion.type === 'need') {
        // Textsuche-Modus: Zeige Suchbegriff mit Lupe-Icon
        hint.innerHTML = '<span class="search-active-selection">' +
            '<span class="search-active-type type-textsearch">🔍 Textsuche</span>' +
            '<span class="search-active-label">"' + suggestion.label + '"</span>' +
            '<button class="search-active-clear" onclick="clearActiveSuggestion()" title="' + TiageI18n.t('ui.removeSearch', 'Suche entfernen') + '">×</button>' +
            '</span>';
        hint.classList.add('has-active-selection');
        hint.classList.remove('has-results', 'no-results');
        return;
    }

    var typeLabel = {
        'category': 'Kategorie',
        'dimension': 'Dimension',
        'resonanz': 'Resonanzfaktor',
        'perspective': 'Perspektive'
    }[suggestion.type] || suggestion.type;

    var iconPrefix = suggestion.icon ? suggestion.icon + ' ' : '';

    // Zeige die Auswahl als Tag
    hint.innerHTML = '<span class="search-active-selection">' +
        '<span class="search-active-type type-' + suggestion.type + '">' + typeLabel + '</span>' +
        '<span class="search-active-label">' + iconPrefix + suggestion.label + '</span>' +
        '<span class="search-active-id">' + suggestion.id + '</span>' +
        '<button class="search-active-clear" onclick="clearActiveSuggestion()" title="' + TiageI18n.t('ui.removeSelection', 'Auswahl entfernen') + '">×</button>' +
        '</span>';
    hint.classList.add('has-active-selection');
    hint.classList.remove('has-results', 'no-results');
}
window.displayActiveSuggestion = displayActiveSuggestion;

/**
 * Clear the active suggestion and reset search filter
 */
function clearActiveSuggestion() {
    suggestionState.activeSuggestion = null;
    var hint = document.getElementById('profileReviewSearchHint');
    if (hint) {
        hint.innerHTML = '';
        hint.classList.remove('has-active-selection');
    }
    // Clear the search input and reset filter
    var input = document.getElementById('profileReviewSearchInput');
    if (input) {
        input.value = '';
    }
    // Reset filter to show all items
    filterProfileReviewByNeed('');
    // FIX #865: Setze auch den DimensionKategorieFilter zurück
    if (typeof DimensionKategorieFilter !== 'undefined') {
        DimensionKategorieFilter.reset();
    }
    // Hide suggestions dropdown
    hideSearchSuggestions();
}
window.clearActiveSuggestion = clearActiveSuggestion;

/**
 * Handle keyboard navigation in search
 */
function handleSearchKeydown(event) {
    var dropdown = document.getElementById('searchSuggestionsDropdown');
    var dropdownVisible = dropdown && dropdown.style.display !== 'none';
    var suggestions = suggestionState.suggestions || [];

    // Enter funktioniert auch ohne sichtbares Dropdown (für Textsuche)
    if (event.key === 'Enter') {
        event.preventDefault();
        if (dropdownVisible && suggestionState.selectedIndex >= 0) {
            selectSuggestion(suggestionState.selectedIndex);
        } else {
            // FIX: Bei Enter ohne Vorschlagsauswahl -> Textsuche aktivieren
            var input = document.getElementById('profileReviewSearchInput');
            var query = input ? input.value.trim() : '';
            if (query.length > 0) {
                // Erstelle eine manuelle Textsuche-Suggestion
                suggestionState.activeSuggestion = {
                    type: 'need',
                    id: null,
                    label: query
                };
                // Zeige den Textsuche-Tag an
                displayActiveSuggestion();
                // Schließe das Dropdown
                hideSearchSuggestions();
                console.log('[handleSearchKeydown] Textsuche aktiviert für:', query);
            }
        }
        return;
    }

    // Für andere Tasten: Dropdown muss sichtbar sein
    if (!dropdownVisible) return;
    if (suggestions.length === 0) return;

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            suggestionState.selectedIndex = Math.min(
                suggestionState.selectedIndex + 1,
                suggestions.length - 1
            );
            updateSuggestionSelection();
            break;

        case 'ArrowUp':
            event.preventDefault();
            suggestionState.selectedIndex = Math.max(
                suggestionState.selectedIndex - 1,
                -1
            );
            updateSuggestionSelection();
            break;

        case 'Escape':
            event.preventDefault();
            hideSearchSuggestions();
            break;
    }
}
window.handleSearchKeydown = handleSearchKeydown;

/**
 * Update suggestion selection visual state
 */
function updateSuggestionSelection() {
    var content = document.querySelector('.search-suggestions-content');
    if (!content) return;

    var items = content.querySelectorAll('.suggestion-item');
    items.forEach(function(item, index) {
        if (index === suggestionState.selectedIndex) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Close suggestions when clicking outside
 */
document.addEventListener('click', function(event) {
    var searchWrapper = document.querySelector('.profile-review-search-wrapper');
    var dropdown = document.getElementById('searchSuggestionsDropdown');
    var searchInput = document.getElementById('profileReviewSearchInput');

    if (searchWrapper && dropdown &&
        !searchWrapper.contains(event.target) &&
        !dropdown.contains(event.target)) {
        hideSearchSuggestions();
        // Blur search input to close virtual keyboard and remove focus
        if (searchInput && document.activeElement === searchInput) {
            searchInput.blur();
        }
    }
});

/**
 * Update clearProfileReviewSearch to also hide suggestions
 */
var originalClear = window.clearProfileReviewSearch;
window.clearProfileReviewSearch = function() {
    originalClear();
    hideSearchSuggestions();
};

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
                var person = window.currentProfileReviewContext.person || 'ich';
                var personData = personDimensions[person];
                var dominanz = (personData && personData.dominanz && personData.dominanz.primary) ? personData.dominanz.primary : 'ausgeglichen';
                var orientierung = (personData && personData.orientierung && personData.orientierung.primary) ? personData.orientierung.primary : 'heterosexuell';
                updateSourceExplanation(window.currentProfileReviewContext.archetypeKey, personData, dominanz, orientierung);
            }
        }
    }
}
window.selectTripleBtn = selectTripleBtn;

// Lade Profil-Attribute neu nach Änderung der Geschlechtsidentität
function reloadProfileAttributesAfterGenderChange() {
    var archetypeKey = window.currentProfileReviewContext.archetypeKey;
    var person = window.currentProfileReviewContext.person;

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

        // v3.6: AUCH Bedürfnisse/Needs zurücksetzen
        if (typeof AttributeSummaryCard !== 'undefined' &&
            typeof AttributeSummaryCard.resetSelectedNeedsValues === 'function') {
            // Zuerst alle Markierungen entfernen, damit ALLE Needs zurückgesetzt werden
            if (typeof AttributeSummaryCard.clearNeedSelection === 'function') {
                AttributeSummaryCard.clearNeedSelection();
            }
            AttributeSummaryCard.resetSelectedNeedsValues();
            // Markierung erneut clearen und Button-Status aktualisieren
            if (typeof AttributeSummaryCard.clearNeedSelection === 'function') {
                AttributeSummaryCard.clearNeedSelection();
            }
            if (typeof AttributeSummaryCard.updateSelectedLockButtonState === 'function') {
                AttributeSummaryCard.updateSelectedLockButtonState();
            }
            console.log('[resetProfileReview] Bedürfnisse wurden zurückgesetzt');
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
// DEPRECATED: window.resetProfileReview = resetProfileReview;

/**
 * Updates the geschlechtsidentität card options based on primary geschlecht
 * KONTEXTABHÄNGIG:
 * - Mann/Frau (binär): Cis, Trans, Nonbinär (3 options)
 * - Inter (divers): Nonbinär, Fluid (2 options)
 * @param {string} primaryGeschlecht - 'mann', 'frau', 'inter', or null
 */
function updateGeschlechtsidentitaetOptions(primaryGeschlecht, secondaryGeschlecht) {
    var card = document.getElementById('pr-geschlecht-sekundaer-card');
    if (!card) return;

    var buttonsContainer = card.querySelector('[data-attr="pr-geschlecht-sekundaer"]');
    if (!buttonsContainer) return;

    var options, values;
    if (primaryGeschlecht === 'inter') {
        // Inter (divers): Nonbinär, Fluid (2 options)
        options = ['Nonbinär', 'Fluid'];
        values = [0, 100];
    } else {
        // Mann/Frau (binär): Cis, Trans, Nonbinär (3 options - matches profile-config.js)
        options = ['Cis', 'Trans', 'Nonbinär'];
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
 * KONTEXTABHÄNGIG:
 * - Mann/Frau (binär): Cis=0, Trans=50, Nonbinär=100
 * - Inter (divers): Nonbinär=0, Fluid=100 (2 options)
 * @param {string} secondary - 'cis', 'trans', 'nonbinaer', 'fluid'
 * @param {string} primary - Body: 'mann', 'frau', 'inter'
 * @returns {number} Profile review value
 */
function mapSecondaryToGeschlechtsidentitaet(secondary, primary) {
    // For Inter (divers): Nonbinär=0, Fluid=100 (2 options)
    if (primary === 'inter') {
        if (secondary === 'nonbinaer') return 0;
        if (secondary === 'fluid') return 100;
        return 0; // Default to Nonbinär for Inter
    }

    // For Mann/Frau (binär): Cis=0, Trans=50, Nonbinär=100
    if (secondary === 'nonbinaer') return 100;

    // Cis: identity matches body
    if (secondary === 'cis' || secondary === primary) return 0;

    // Trans: identity differs from body
    if (secondary === 'trans' ||
        (primary === 'mann' && secondary === 'frau') ||
        (primary === 'frau' && secondary === 'mann')) {
        return 50; // Trans
    }

    // Legacy: suchend/fluid → map to Nonbinär for Mann/Frau
    if (secondary === 'suchend' || secondary === 'unsicher' || secondary === 'fluid') return 100;

    // Default: Cis
    return 0;
}

/**
 * Maps profile review geschlechtsidentität value to secondary geschlecht
 * KONTEXTABHÄNGIG:
 * - Mann/Frau (binär): 0=Cis, 50=Trans, 100=Nonbinär
 * - Inter (divers): 0=Nonbinär, 100=Fluid (2 options)
 * @param {number} value - Profile review button value
 * @param {string} primaryGeschlecht - Body: 'mann', 'frau', 'inter'
 * @returns {string} Secondary value for TiageState
 */
function mapGeschlechtsidentitaetToSecondary(value, primaryGeschlecht) {
    // For Inter (divers): 0=Nonbinär, 100=Fluid (2 options)
    if (primaryGeschlecht === 'inter') {
        if (value <= 50) return 'nonbinaer';  // 0
        return 'fluid';                       // 100
    }

    // For Mann/Frau (binär): 0=Cis, 50=Trans, 100=Nonbinär
    if (value <= 25) return 'cis';       // 0
    if (value <= 75) return 'trans';     // 50
    return 'nonbinaer';                  // 100
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
    // NEU (v1.8.128): Speichere Array-Bedürfnisstruktur
    // Format: [{ id, key, stringKey, label, value, locked }, ...]
    // ════════════════════════════════════════════════════════════════════════
    if (typeof AttributeSummaryCard !== 'undefined') {
        try {
            if (AttributeSummaryCard.getFlatNeeds) {
                // Neue API (v1.8.128): Array-Struktur
                var flatNeeds = AttributeSummaryCard.getFlatNeeds();
                localStorage.setItem('tiage_flat_needs', JSON.stringify(flatNeeds));
                var count = Array.isArray(flatNeeds) ? flatNeeds.length : Object.keys(flatNeeds).length;
                console.log('[ProfileReview] Bedürfnisse gespeichert (Array-Format):', count, 'Einträge');
            } else {
                // Fallback: Alte API (sollte nicht mehr vorkommen)
                var flatNeedsValues = AttributeSummaryCard.getFlatNeedsValues();
                var flatLockedNeeds = AttributeSummaryCard.getFlatLockedNeeds();
                localStorage.setItem('tiage_flat_needs_values', JSON.stringify(flatNeedsValues));
                localStorage.setItem('tiage_flat_needs_locks', JSON.stringify(flatLockedNeeds));
                console.log('[ProfileReview] Bedürfnisse gespeichert (Legacy):', Object.keys(flatNeedsValues).length, 'Werte');
            }
        } catch (e) {
            console.warn('[ProfileReview] Fehler beim Speichern der Bedürfnisse:', e);
        }
    }

    // Store in TiageState if available
    if (typeof TiageState !== 'undefined') {
        // FIX: Preserve existing lockedNeeds when saving profileReview UI state
        // profileReview has two data types:
        // 1. UI state (geschlechtsidentitaet, kinder, etc.) - flat structure
        // 2. Lock state (ich.lockedNeeds, partner.lockedNeeds) - nested structure
        var existingProfileReview = TiageState.get('profileReview') || {};
        var mergedState = Object.assign({}, state, {
            ich: existingProfileReview.ich || { lockedNeeds: {} },
            partner: existingProfileReview.partner || { lockedNeeds: {} }
        });
        TiageState.set('profileReview', mergedState);
        TiageState.saveToStorage(); // Persist merged state including lockedNeeds

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
// DEPRECATED: window.saveProfileReview = saveProfileReview;

// Close modal on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProfileReviewInfoModal();
        closeProfileReviewModal();
    }
});

})(); // end IIFE
