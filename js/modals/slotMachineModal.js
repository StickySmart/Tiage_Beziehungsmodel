/**
 * SLOT MACHINE MODAL MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Best-Match Finder - Findet den besten Partner-Archetyp basierend auf dem ICH-Profil.
 * Iteriert durch alle möglichen Kombinationen (A, G, O, D) und sortiert nach Score.
 * Bei Score-Gleichstand wird Bindungsmuster als Tie-Breaker verwendet.
 *
 * Extrahiert aus app-main.js für bessere Modularisierung.
 *
 * @module SlotMachineModal
 */

var TiageSlotMachine = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let slotMachineResult = null;
    let slotMachineTop4Results = [];
    let slotMachineTop10Results = [];
    let slotMachineExpanded = false;
    let slotMachineBindung = { primary: null, secondary: null };
    let bindungTooltipTimeout = null;

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    // Bindungsmuster Präferenzen für Tie-Breaker
    const BINDUNGSMUSTER_PRAEFERENZEN = {
        sicher: {
            archetypen: ['duo', 'duo_flex', 'lat', 'polyamor', 'solopoly', 'ra', 'single', 'aromantisch'],
            dominanz: ['ausgeglichen', 'switch', 'dominant', 'submissiv']
        },
        aengstlich: {
            archetypen: ['duo', 'duo_flex', 'lat', 'polyamor', 'solopoly', 'single', 'ra', 'aromantisch'],
            dominanz: ['submissiv', 'ausgeglichen', 'switch', 'dominant']
        },
        vermeidend: {
            archetypen: ['lat', 'single', 'solopoly', 'ra', 'aromantisch', 'duo_flex', 'duo', 'polyamor'],
            dominanz: ['ausgeglichen', 'dominant', 'switch', 'submissiv']
        },
        desorganisiert: {
            archetypen: ['duo_flex', 'ra', 'polyamor', 'lat', 'duo', 'solopoly', 'single', 'aromantisch'],
            dominanz: ['switch', 'ausgeglichen', 'dominant', 'submissiv']
        }
    };

    const ALL_ARCHETYPES_SLOT = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];
    const ALL_DOMINANZEN = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];

    // v5.0 SSOT: Labels aus TiageSynthesis.Constants oder Fallback
    function getGeschlechtLabels() {
        if (typeof TiageSynthesis !== 'undefined' &&
            TiageSynthesis.Constants &&
            TiageSynthesis.Constants.GESCHLECHT_OPTIONS) {
            const labels = TiageSynthesis.Constants.GESCHLECHT_OPTIONS.LABELS;
            return { ...labels.PRIMARY, ...labels.SECONDARY };
        }
        return {
            'mann': 'Mann', 'frau': 'Frau', 'inter': 'Inter',
            'cis': 'Cis', 'trans': 'Trans', 'nonbinaer': 'NB', 'fluid': 'Fluid', 'suchend': 'Suchend'
        };
    }

    function getOrientierungLabels() {
        if (typeof TiageSynthesis !== 'undefined' &&
            TiageSynthesis.Constants &&
            TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS) {
            return TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.LABELS;
        }
        return {
            'heterosexuell': 'Hetero', 'homosexuell': 'Homo', 'bisexuell': 'Bi',
            'pansexuell': 'Pan', 'queer': 'Queer'
        };
    }

    const ARCHETYP_LABELS = {
        'single': 'Single', 'duo': 'Duo', 'duo_flex': 'Duo-Flex', 'ra': 'RA',
        'lat': 'LAT', 'aromantisch': 'Aromantisch', 'solopoly': 'Solopoly', 'polyamor': 'Polyamor'
    };

    const DOMINANZ_LABELS = {
        'dominant': 'Dom', 'submissiv': 'Sub', 'switch': 'Switch', 'ausgeglichen': 'Ausg.'
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER: Access app-main.js functions via window
    // ═══════════════════════════════════════════════════════════════════════

    function getAppFunction(name) {
        return typeof window[name] === 'function' ? window[name] : null;
    }

    function getGlobalVar(name) {
        return window[name];
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODAL FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Öffnet das Slot Machine Modal
     */
    function openSlotMachineModal() {
        const modal = document.getElementById('slotMachineModal');
        if (modal) {
            modal.style.display = 'flex';
            resetSlotMachine();

            // Lade gespeicherte Bindungsmuster aus TiageState
            if (typeof TiageState !== 'undefined') {
                const saved = TiageState.get('bindungsmuster.ich');
                if (saved && saved.primary) {
                    slotMachineBindung.primary = saved.primary;
                    slotMachineBindung.secondary = saved.secondary;
                    updateBindungsmusterUI();
                    checkStartButtonState();
                }

                // Lade gespeicherte Reibungs-Werte (#B227, #B228)
                if (typeof loadReibungValues === 'function') {
                    loadReibungValues();
                } else if (typeof window.loadRtiPriorities === 'function') {
                    window.loadRtiPriorities();
                }
            }
        }
    }

    /**
     * Schließt das Slot Machine Modal
     */
    function closeSlotMachineModal(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('slotMachineModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Schließt Modal und öffnet die ICH-Attribute Seite
     */
    function goToIchAttributes() {
        closeSlotMachineModal();
        resetSlotMachine();

        const getSelectedArchetype = getAppFunction('getSelectedArchetype');
        const currentArchetype = getGlobalVar('currentArchetype');
        const ichArchetyp = getSelectedArchetype ? getSelectedArchetype('ich') : (currentArchetype || 'single');

        if (typeof openNeedsEditorPage === 'function') {
            openNeedsEditorPage(ichArchetyp, 'ich');
        }
    }

    /**
     * Setzt das Modal zurück auf Phase 1
     */
    function resetSlotMachine() {
        const phase1 = document.getElementById('slotPhase1');
        const phase2 = document.getElementById('slotPhase2');
        const phase3 = document.getElementById('slotPhase3');

        if (phase1) phase1.style.display = 'block';
        if (phase2) phase2.style.display = 'none';
        if (phase3) phase3.style.display = 'none';

        slotMachineResult = null;
        slotMachineTop4Results = [];
        slotMachineTop10Results = [];
        slotMachineExpanded = false;

        updateBindungsmusterUI();
        checkStartButtonState();
    }

    /**
     * Aktualisiert die Bindungsmuster-Buttons UI
     */
    function updateBindungsmusterUI() {
        document.querySelectorAll('#bindungPrimaryOptions .bindung-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.value === slotMachineBindung.primary);
        });
        document.querySelectorAll('#bindungSecondaryOptions .bindung-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.value === slotMachineBindung.secondary);
        });
    }

    /**
     * Zeigt den Bindungsmuster-Tooltip für 4 Sekunden
     */
    function showBindungTooltip(type, value) {
        const tooltip = document.getElementById('bindungTooltip');
        const iconEl = document.getElementById('bindungTooltipIcon');
        const titleEl = document.getElementById('bindungTooltipTitle');
        const textEl = document.getElementById('bindungTooltipText');

        if (!tooltip) return;

        const tooltipData = {
            primary: {
                sicher: { icon: '🛡️', title: 'Sicher', text: 'Du fühlst dich meistens wohl mit Nähe und kannst gut Grenzen setzen' },
                aengstlich: { icon: '💔', title: 'Ängstlich', text: 'Du suchst meistens viel Nähe und hast oft Angst, verlassen zu werden' },
                vermeidend: { icon: '🚪', title: 'Vermeidend', text: 'Du hältst meistens emotionale Distanz und brauchst viel Freiraum' },
                desorganisiert: { icon: '🌀', title: 'Desorganisiert', text: 'Du schwankst meistens zwischen Sehnsucht nach Nähe und dem Drang zu fliehen' }
            },
            secondary: {
                sicher: { icon: '🛡️', title: 'Sicher (Stress)', text: 'Im Stress bleibst du gelassen und kannst dich gut regulieren' },
                aengstlich: { icon: '💔', title: 'Ängstlich (Stress)', text: 'Im Stress wirst du klammernder und brauchst mehr Bestätigung' },
                vermeidend: { icon: '🚪', title: 'Vermeidend (Stress)', text: 'Im Stress ziehst du dich zurück und machst dicht' },
                desorganisiert: { icon: '🌀', title: 'Desorganisiert (Stress)', text: 'Im Stress reagierst du unberechenbar - mal nah, mal distanziert' }
            }
        };

        const data = tooltipData[type]?.[value];
        if (!data) return;

        if (bindungTooltipTimeout) {
            clearTimeout(bindungTooltipTimeout);
        }

        iconEl.textContent = data.icon;
        titleEl.textContent = data.title;
        textEl.textContent = data.text;

        tooltip.classList.add('show');

        bindungTooltipTimeout = setTimeout(() => {
            tooltip.classList.remove('show');
        }, 4000);
    }

    /**
     * Wählt ein Bindungsmuster aus
     */
    function selectBindungsmuster(type, value) {
        const isNewSelection = (type === 'primary' && slotMachineBindung.primary !== value) ||
                               (type === 'secondary' && slotMachineBindung.secondary !== value);

        if (type === 'primary') {
            slotMachineBindung.primary = slotMachineBindung.primary === value ? null : value;
        } else {
            slotMachineBindung.secondary = slotMachineBindung.secondary === value ? null : value;
        }

        updateBindungsmusterUI();
        checkStartButtonState();

        if (isNewSelection) {
            showBindungTooltip(type, value);
        }

        if (typeof TiageState !== 'undefined') {
            TiageState.set('bindungsmuster.ich', slotMachineBindung);
            TiageState.saveToStorage();
        }
    }

    /**
     * Prüft ob der Start-Button aktiviert werden kann
     */
    function checkStartButtonState() {
        const startBtn = document.getElementById('slotStartBtn');
        if (startBtn) {
            startBtn.disabled = !(slotMachineBindung.primary && slotMachineBindung.secondary);
        }
    }

    /**
     * Startet die Slot Machine Animation und Berechnung
     */
    function startSlotMachine() {
        // Speichere Reibungs-Werte vor dem Start
        if (typeof saveRtiPriorities === 'function') {
            saveRtiPriorities();
        }

        // Wechsel zu Phase 2
        document.getElementById('slotPhase1').style.display = 'none';
        document.getElementById('slotPhase2').style.display = 'block';

        // Starte Berechnung und Animation
        runSlotMachineAnimation();
    }

    /**
     * Berechnet den Tie-Breaker Score basierend auf Bindungsmuster
     */
    function calculateTieBreaker(combo) {
        const primary = slotMachineBindung.primary;
        const secondary = slotMachineBindung.secondary;

        let score = 0;

        if (primary && BINDUNGSMUSTER_PRAEFERENZEN[primary]) {
            const prefs = BINDUNGSMUSTER_PRAEFERENZEN[primary];
            const archRank = prefs.archetypen.indexOf(combo.archetyp);
            score += (archRank >= 0 ? archRank : 8) * 0.7;
            const domRank = prefs.dominanz.indexOf(combo.dominanz);
            score += (domRank >= 0 ? domRank : 4) * 0.7;
        }

        if (secondary && BINDUNGSMUSTER_PRAEFERENZEN[secondary]) {
            const prefs = BINDUNGSMUSTER_PRAEFERENZEN[secondary];
            const archRank = prefs.archetypen.indexOf(combo.archetyp);
            score += (archRank >= 0 ? archRank : 8) * 0.3;
            const domRank = prefs.dominanz.indexOf(combo.dominanz);
            score += (domRank >= 0 ? domRank : 4) * 0.3;
        }

        return score;
    }

    /**
     * Führt die Slot Machine Animation und Berechnung durch
     */
    async function runSlotMachineAnimation() {
        const ANIMATION_DURATION = 2000;
        const UPDATE_INTERVAL = 50;

        // Berechne alle 8 Partner-Archetypen
        const allResults = await calculateAllCombinationsChunked();

        // Sortiere nach Score
        allResults.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return calculateTieBreaker(a) - calculateTieBreaker(b);
        });

        const bestResult = allResults[0];
        slotMachineResult = bestResult;

        console.log('[Best Match] 8 Partner-Archetypen sortiert:', allResults.map(r => `${r.archetyp}: ${r.score}`));

        slotMachineTop4Results = allResults.slice(0, 4);
        slotMachineTop10Results = allResults.slice(0, 8);

        // Animation UI elements
        const reelA = document.getElementById('slotReelA');
        const reelG = document.getElementById('slotReelG');
        const reelO = document.getElementById('slotReelO');
        const reelD = document.getElementById('slotReelD');
        const valueA = document.getElementById('slotValueA');
        const valueG = document.getElementById('slotValueG');
        const valueO = document.getElementById('slotValueO');
        const valueD = document.getElementById('slotValueD');

        const GESCHLECHT_LABELS = getGeschlechtLabels();
        const ORIENTIERUNG_LABELS = getOrientierungLabels();

        if (reelA) reelA.classList.add('spinning');
        if (reelG) reelG.classList.add('spinning');
        if (reelO) reelO.classList.add('spinning');
        if (reelD) reelD.classList.add('spinning');

        const startTime = Date.now();
        let comboIndex = 0;

        const animationInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;

            if (elapsed < ANIMATION_DURATION) {
                const currentCombo = allResults[comboIndex % allResults.length];
                if (valueA) valueA.textContent = ARCHETYP_LABELS[currentCombo.archetyp] || currentCombo.archetyp;
                if (valueG) {
                    const gLabel = typeof currentCombo.geschlecht === 'object'
                        ? `${GESCHLECHT_LABELS[currentCombo.geschlecht.primary]}-${GESCHLECHT_LABELS[currentCombo.geschlecht.secondary]}`
                        : GESCHLECHT_LABELS[currentCombo.geschlecht] || currentCombo.geschlecht;
                    valueG.textContent = gLabel;
                }
                if (valueO) valueO.textContent = ORIENTIERUNG_LABELS[currentCombo.orientierung] || currentCombo.orientierung;
                if (valueD) valueD.textContent = DOMINANZ_LABELS[currentCombo.dominanz] || currentCombo.dominanz;
                comboIndex++;
            } else {
                clearInterval(animationInterval);

                if (reelA) reelA.classList.remove('spinning');
                if (reelG) reelG.classList.remove('spinning');
                if (reelO) reelO.classList.remove('spinning');
                if (reelD) reelD.classList.remove('spinning');

                if (bestResult) {
                    if (valueA) valueA.textContent = ARCHETYP_LABELS[bestResult.archetyp] || bestResult.archetyp;
                    if (valueG) {
                        const finalGLabel = typeof bestResult.geschlecht === 'object'
                            ? `${GESCHLECHT_LABELS[bestResult.geschlecht.primary]}-${GESCHLECHT_LABELS[bestResult.geschlecht.secondary]}`
                            : GESCHLECHT_LABELS[bestResult.geschlecht] || bestResult.geschlecht;
                        valueG.textContent = finalGLabel;
                    }
                    if (valueO) valueO.textContent = ORIENTIERUNG_LABELS[bestResult.orientierung] || bestResult.orientierung;
                    if (valueD) valueD.textContent = DOMINANZ_LABELS[bestResult.dominanz] || bestResult.dominanz;
                }

                setTimeout(() => showSlotResult(bestResult), 500);
            }
        }, UPDATE_INTERVAL);
    }

    /**
     * Berechnet alle Kombinationen in Chunks (async)
     */
    async function calculateAllCombinationsChunked() {
        return new Promise((resolve) => {
            const results = calculateAllCombinations();
            resolve(results);
        });
    }

    /**
     * Berechnet alle möglichen Kombinationen
     */
    function calculateAllCombinations() {
        const results = [];

        // Access globals from app-main.js
        const currentArchetype = getGlobalVar('currentArchetype');
        const personDimensions = getGlobalVar('personDimensions');

        // Get app functions
        const checkPhysicalCompatibility = getAppFunction('checkPhysicalCompatibility');
        const calculatePhilosophyCompatibility = getAppFunction('calculatePhilosophyCompatibility');
        const calculateRFactorsFromNeeds = getAppFunction('calculateRFactorsFromNeeds');
        const calculateOverallWithModifiers = getAppFunction('calculateOverallWithModifiers');
        const getConfidenceMultiplier = getAppFunction('getConfidenceMultiplier');
        const ensureValidGeschlecht = getAppFunction('ensureValidGeschlecht');
        const ensureValidDominanz = getAppFunction('ensureValidDominanz');
        const ensureValidOrientierung = getAppFunction('ensureValidOrientierung');

        if (!checkPhysicalCompatibility || !calculateOverallWithModifiers) {
            console.error('[SlotMachine] Required functions not available');
            return results;
        }

        // ICH-Daten aus TiageState
        const ichArchetype = (typeof TiageState !== 'undefined' ? TiageState.get('archetypes.ich.primary') : null) || currentArchetype || 'single';
        const ichDims = (typeof TiageState !== 'undefined' ? TiageState.get('personDimensions.ich') : null) || (personDimensions && personDimensions.ich) || {};
        const validIchGeschlecht = ensureValidGeschlecht ? ensureValidGeschlecht(ichDims.geschlecht) : ichDims.geschlecht;
        const validIchDominanz = ensureValidDominanz ? ensureValidDominanz(ichDims.dominanz) : ichDims.dominanz;
        const validIchOrientierung = ensureValidOrientierung ? ensureValidOrientierung(ichDims.orientierung) : ichDims.orientierung;
        const ichGfk = ichDims.gfk || 'mittel';

        // Partner-Dimensionen
        const partnerDims = (typeof TiageState !== 'undefined' ? TiageState.get('personDimensions.partner') : null) || (personDimensions && personDimensions.partner) || {};

        // Prüfe welche Partner-GOD explizit gesetzt sind
        const partnerHasGeschlecht = partnerDims.geschlecht && (typeof partnerDims.geschlecht === 'string' ? partnerDims.geschlecht : partnerDims.geschlecht.primary);
        const partnerHasOrientierung = partnerDims.orientierung && (typeof partnerDims.orientierung === 'string' ? partnerDims.orientierung : (Array.isArray(partnerDims.orientierung) ? partnerDims.orientierung.length > 0 : partnerDims.orientierung.primary));
        const partnerHasDominanz = partnerDims.dominanz && (typeof partnerDims.dominanz === 'string' ? partnerDims.dominanz : partnerDims.dominanz.primary);
        const partnerHasGfk = partnerDims.gfk && partnerDims.gfk !== '';

        // Erstelle Arrays für die Iteration
        let geschlechtOptions = [];
        if (partnerHasGeschlecht) {
            geschlechtOptions = [ensureValidGeschlecht ? ensureValidGeschlecht(partnerDims.geschlecht) : partnerDims.geschlecht];
        } else {
            geschlechtOptions = [
                { primary: 'mann', secondary: 'cis' },
                { primary: 'frau', secondary: 'cis' },
                { primary: 'inter', secondary: 'nonbinaer' }
            ];
        }

        let orientierungOptions = [];
        if (partnerHasOrientierung) {
            orientierungOptions = [ensureValidOrientierung ? ensureValidOrientierung(partnerDims.orientierung) : partnerDims.orientierung];
        } else {
            orientierungOptions = [
                { primary: 'heterosexuell', secondary: null, all: ['heterosexuell'] },
                { primary: 'homosexuell', secondary: null, all: ['homosexuell'] },
                { primary: 'bisexuell', secondary: null, all: ['bisexuell'] }
            ];
        }

        let dominanzOptions = [];
        if (partnerHasDominanz) {
            dominanzOptions = [ensureValidDominanz ? ensureValidDominanz(partnerDims.dominanz) : partnerDims.dominanz];
        } else {
            dominanzOptions = [
                { primary: 'dominant', secondary: null },
                { primary: 'submissiv', secondary: null },
                { primary: 'switch', secondary: null }
            ];
        }

        // GFK für Partner
        let partnerGfk;
        if (partnerHasGfk) {
            partnerGfk = partnerDims.gfk;
        } else {
            const ichGfkV = ichDims.gfk || 'mittel';
            partnerGfk = ichGfkV === 'hoch' ? 'hoch' : ichGfkV === 'mittel' ? 'hoch' : 'mittel';
        }

        // ICH-Needs laden
        let ichNeeds = null;
        if (typeof TiageState !== 'undefined') {
            const stateKey = ichArchetype.replace('_', '-');
            ichNeeds = TiageState.get(`flatNeeds.ich.${stateKey}`);
        }
        if (!ichNeeds || Object.keys(ichNeeds).length === 0) {
            if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.calculateFlatNeeds) {
                ichNeeds = ProfileCalculator.calculateFlatNeeds(ichArchetype, validIchGeschlecht, validIchDominanz, validIchOrientierung);
            }
        }

        const ichObj = {
            archetyp: ichArchetype,
            geschlecht: validIchGeschlecht,
            orientierung: validIchOrientierung,
            dominanz: validIchDominanz,
            gfk: ichGfk,
            needs: ichNeeds
        };

        // Iteriere alle Kombinationen
        for (const geschlecht of geschlechtOptions) {
            for (const orientierung of orientierungOptions) {
                for (const dominanz of dominanzOptions) {
                    for (const partnerArchetype of ALL_ARCHETYPES_SLOT) {
                        let partnerNeeds = null;
                        if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.calculateFlatNeeds) {
                            partnerNeeds = ProfileCalculator.calculateFlatNeeds(
                                partnerArchetype,
                                geschlecht,
                                dominanz,
                                orientierung
                            );
                        }

                        const partnerObj = {
                            archetyp: partnerArchetype,
                            geschlecht: geschlecht,
                            orientierung: orientierung,
                            dominanz: dominanz,
                            gfk: partnerGfk,
                            needs: partnerNeeds
                        };

                        let score = 0;

                        try {
                            const pathosCheck = checkPhysicalCompatibility(ichObj, partnerObj);
                            const logosCheck = calculatePhilosophyCompatibility(ichArchetype, partnerArchetype);

                            const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

                            if (!isIncompatible && pathosCheck.result !== 'unvollständig') {
                                const ichRFaktoren = calculateRFactorsFromNeeds ? calculateRFactorsFromNeeds(ichObj) : { R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0 };
                                const partnerRFaktoren = calculateRFactorsFromNeeds ? calculateRFactorsFromNeeds(partnerObj) : { R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0 };

                                const result = calculateOverallWithModifiers(ichObj, partnerObj, pathosCheck, logosCheck, {
                                    rFaktoren: {
                                        ich: ichRFaktoren,
                                        partner: partnerRFaktoren
                                    }
                                });
                                let baseScore = result.overall || 0;
                                const confidenceMultiplier = getConfidenceMultiplier ? getConfidenceMultiplier(pathosCheck.confidence) : 1.0;
                                score = Math.round(baseScore * confidenceMultiplier * 10) / 10;
                            } else if (pathosCheck.result === 'unvollständig') {
                                score = logosCheck.score || 50;
                            }
                        } catch (e) {
                            // Fehler ignorieren
                        }

                        results.push({
                            archetyp: partnerArchetype,
                            geschlecht: geschlecht,
                            orientierung: orientierung.primary || orientierung,
                            dominanz: dominanz.primary || dominanz,
                            score: score
                        });
                    }
                }
            }
        }

        console.log(`[Best Match] Berechnung abgeschlossen: ${results.length} Kombinationen`);
        return results;
    }

    /**
     * Zeigt die Ergebnisse an
     */
    function showSlotResult(result) {
        document.getElementById('slotPhase2').style.display = 'none';
        document.getElementById('slotPhase3').style.display = 'block';

        const listContainer = document.getElementById('slotTop4List');
        const expandedContainer = document.getElementById('slotExpandedList');
        const expandBtn = document.getElementById('slotExpandBtn');
        if (!listContainer) return;

        slotMachineExpanded = false;
        if (expandedContainer) expandedContainer.style.display = 'none';
        if (expandBtn) {
            expandBtn.innerHTML = '▼ Mehr anzeigen (5-8)';
            expandBtn.style.display = slotMachineTop10Results.length > 4 ? 'inline-block' : 'none';
        }

        const GESCHLECHT_LABELS = getGeschlechtLabels();
        const ORIENTIERUNG_LABELS = getOrientierungLabels();

        function getGeschlechtLabel(geschlecht) {
            if (!geschlecht) return '-';
            if (typeof geschlecht === 'object' && geschlecht.primary) {
                return `${GESCHLECHT_LABELS[geschlecht.primary] || geschlecht.primary}-${GESCHLECHT_LABELS[geschlecht.secondary] || geschlecht.secondary || 'Cis'}`;
            }
            return GESCHLECHT_LABELS[geschlecht] || geschlecht;
        }

        const rankIcons = ['🥇', '🥈', '🥉', '4.'];
        const rankClasses = ['gold', 'silver', 'bronze', 'fourth'];

        let html = '';
        slotMachineTop4Results.forEach((res, index) => {
            const geschlechtLabel = getGeschlechtLabel(res.geschlecht);
            const orientierungLabel = ORIENTIERUNG_LABELS[res.orientierung] || res.orientierung || '-';
            const dominanzLabel = DOMINANZ_LABELS[res.dominanz] || res.dominanz || '-';
            const archetypLabel = ARCHETYP_LABELS[res.archetyp] || res.archetyp;

            html += `
                <div class="slot-top4-item rank-${index + 1}">
                    <div class="slot-top4-rank ${rankClasses[index]}">${rankIcons[index]}</div>
                    <div class="slot-top4-info">
                        <div class="slot-top4-main">
                            <span class="slot-top4-archetyp">${archetypLabel}</span>
                            <span class="slot-top4-score">${res.score}</span>
                        </div>
                        <div class="slot-top4-details">
                            <span class="slot-top4-detail">G: ${geschlechtLabel}</span>
                            <span class="slot-top4-detail">O: ${orientierungLabel}</span>
                            <span class="slot-top4-detail">D: ${dominanzLabel}</span>
                        </div>
                    </div>
                    <button class="slot-top4-apply-btn" onclick="TiageSlotMachine.applySlotResult(${index})">✓ Übernehmen</button>
                </div>
            `;
        });
        listContainer.innerHTML = html;

        // Erweiterte Liste (5-8)
        if (expandedContainer && slotMachineTop10Results.length > 4) {
            let expandedHtml = '';
            for (let i = 4; i < slotMachineTop10Results.length; i++) {
                const res = slotMachineTop10Results[i];
                const geschlechtLabel = getGeschlechtLabel(res.geschlecht);
                const orientierungLabel = ORIENTIERUNG_LABELS[res.orientierung] || res.orientierung || '-';
                const dominanzLabel = DOMINANZ_LABELS[res.dominanz] || res.dominanz || '-';
                const archetypLabel = ARCHETYP_LABELS[res.archetyp] || res.archetyp;

                expandedHtml += `
                    <div class="slot-top4-item rank-${i + 1}" style="opacity: 0.85;">
                        <div class="slot-top4-rank" style="background: rgba(255,255,255,0.1); color: #888;">${i + 1}.</div>
                        <div class="slot-top4-info">
                            <div class="slot-top4-main">
                                <span class="slot-top4-archetyp">${archetypLabel}</span>
                                <span class="slot-top4-score">${res.score}</span>
                            </div>
                            <div class="slot-top4-details">
                                <span class="slot-top4-detail">G: ${geschlechtLabel}</span>
                                <span class="slot-top4-detail">O: ${orientierungLabel}</span>
                                <span class="slot-top4-detail">D: ${dominanzLabel}</span>
                            </div>
                        </div>
                        <button class="slot-top4-apply-btn" onclick="TiageSlotMachine.applySlotResult(${i})">✓ Übernehmen</button>
                    </div>
                `;
            }
            expandedContainer.innerHTML = expandedHtml;
        }
    }

    /**
     * Toggle erweiterte Liste
     */
    function toggleSlotExpand() {
        const expandedContainer = document.getElementById('slotExpandedList');
        const expandBtn = document.getElementById('slotExpandBtn');
        const titleEl = document.getElementById('slotResultTitle');

        if (!expandedContainer || !expandBtn) return;

        slotMachineExpanded = !slotMachineExpanded;

        if (slotMachineExpanded) {
            expandedContainer.style.display = 'block';
            expandBtn.innerHTML = '▲ Weniger anzeigen';
            if (titleEl) titleEl.innerHTML = `🏆 Top ${slotMachineTop10Results.length} Partner gefunden!`;
        } else {
            expandedContainer.style.display = 'none';
            expandBtn.innerHTML = '▼ Mehr anzeigen (5-8)';
            if (titleEl) titleEl.innerHTML = '🏆 Top 4 Partner gefunden!';
        }
    }

    /**
     * Wendet das Ergebnis auf das Partner-Profil an
     */
    function applySlotResult(index = 0) {
        const result = slotMachineTop10Results[index] || slotMachineTop4Results[index] || slotMachineResult;
        if (!result) return;

        // Access globals
        const personDimensions = getGlobalVar('personDimensions');
        const mobilePersonDimensions = getGlobalVar('mobilePersonDimensions');
        const selectArchetypeFromGrid = getAppFunction('selectArchetypeFromGrid');
        const syncGeschlechtUI = getAppFunction('syncGeschlechtUI');
        const syncDominanzUI = getAppFunction('syncDominanzUI');
        const syncOrientierungUI = getAppFunction('syncOrientierungUI');
        const syncGfkUI = getAppFunction('syncGfkUI');
        const updateComparisonView = getAppFunction('updateComparisonView');

        // Partner-Archetyp setzen
        if (selectArchetypeFromGrid) {
            selectArchetypeFromGrid('partner', result.archetyp);
        }
        console.log('[applySlotResult] Partner-Archetyp gesetzt:', result.archetyp);

        // Partner-GOD setzen wenn nicht vom User gesetzt
        const partnerDims = personDimensions && personDimensions.partner ? personDimensions.partner : {};
        let godApplied = false;

        // Geschlecht
        const partnerGeschStr = typeof partnerDims.geschlecht === 'string' ? partnerDims.geschlecht : (partnerDims.geschlecht && partnerDims.geschlecht.primary);
        if (!partnerGeschStr && result.geschlecht && personDimensions) {
            const gValue = typeof result.geschlecht === 'string' ? result.geschlecht : result.geschlecht.primary;
            personDimensions.partner.geschlecht = gValue;
            if (mobilePersonDimensions) {
                mobilePersonDimensions.partner.geschlecht = gValue;
            }
            godApplied = true;
        }

        // Orientierung
        const partnerOri = partnerDims.orientierung;
        const hasOri = Array.isArray(partnerOri) ? partnerOri.length > 0 : (partnerOri && (typeof partnerOri === 'string' ? partnerOri : partnerOri.primary));
        if (!hasOri && result.orientierung && personDimensions) {
            const oriValue = typeof result.orientierung === 'string' ? result.orientierung : result.orientierung.primary;
            personDimensions.partner.orientierung = [oriValue];
            if (mobilePersonDimensions) {
                mobilePersonDimensions.partner.orientierung = [oriValue];
            }
            godApplied = true;
        }

        // Dominanz
        const partnerDom = partnerDims.dominanz;
        const hasDom = partnerDom && (typeof partnerDom === 'string' ? partnerDom : partnerDom.primary);
        if (!hasDom && result.dominanz && personDimensions) {
            const domValue = typeof result.dominanz === 'string' ? result.dominanz : result.dominanz.primary;
            personDimensions.partner.dominanz = { primary: domValue, secondary: null };
            if (mobilePersonDimensions) {
                mobilePersonDimensions.partner.dominanz = { primary: domValue, secondary: null };
            }
            godApplied = true;
        }

        // GFK
        if (!partnerDims.gfk && personDimensions) {
            const ichGfk = (personDimensions.ich || {}).gfk || 'mittel';
            const gfkValue = ichGfk === 'hoch' ? 'hoch' : ichGfk === 'mittel' ? 'hoch' : 'mittel';
            personDimensions.partner.gfk = gfkValue;
            if (mobilePersonDimensions) {
                mobilePersonDimensions.partner.gfk = gfkValue;
            }
            godApplied = true;
        }

        // State synchronisieren
        if (godApplied && typeof TiageState !== 'undefined' && personDimensions) {
            TiageState.set('personDimensions.partner', personDimensions.partner);
            TiageState.saveToStorage();
        }

        // Profil neu berechnen
        if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined' && personDimensions) {
            ProfileCalculator.loadProfile('partner', {
                archetyp: result.archetyp,
                geschlecht: personDimensions.partner.geschlecht,
                dominanz: personDimensions.partner.dominanz,
                orientierung: personDimensions.partner.orientierung
            });
        }

        // UI synchronisieren
        if (godApplied) {
            if (syncGeschlechtUI) syncGeschlechtUI('partner');
            if (syncDominanzUI) syncDominanzUI('partner');
            if (syncOrientierungUI) syncOrientierungUI('partner');
            if (syncGfkUI) syncGfkUI('partner');
        }

        // Score neu berechnen
        if (updateComparisonView) updateComparisonView();

        // Modal schließen
        closeSlotMachineModal();
        resetSlotMachine();

        // Feedback-Animation
        const matchBtns = document.querySelectorAll('.best-match-btn:not(.ich-match-btn)');
        matchBtns.forEach(btn => {
            btn.classList.add('match-found');
            setTimeout(() => btn.classList.remove('match-found'), 1000);
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Modal functions
        open: openSlotMachineModal,
        close: closeSlotMachineModal,
        reset: resetSlotMachine,
        start: startSlotMachine,

        // Bindungsmuster
        selectBindungsmuster: selectBindungsmuster,
        showBindungTooltip: showBindungTooltip,

        // Results
        toggleExpand: toggleSlotExpand,
        applySlotResult: applySlotResult,
        goToIchAttributes: goToIchAttributes,

        // State access (for debugging)
        getState: function() {
            return {
                result: slotMachineResult,
                top4: slotMachineTop4Results,
                top10: slotMachineTop10Results,
                bindung: slotMachineBindung,
                expanded: slotMachineExpanded
            };
        }
    };

})();

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL EXPORTS (for onclick handlers and backwards compatibility)
// ═══════════════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
    window.TiageSlotMachine = TiageSlotMachine;

    // Legacy function names for existing onclick handlers
    window.openSlotMachineModal = TiageSlotMachine.open;
    window.closeSlotMachineModal = TiageSlotMachine.close;
    window.resetSlotMachine = TiageSlotMachine.reset;
    window.startSlotMachine = TiageSlotMachine.start;
    window.selectBindungsmuster = TiageSlotMachine.selectBindungsmuster;
    window.showBindungTooltip = TiageSlotMachine.showBindungTooltip;
    window.toggleSlotExpand = TiageSlotMachine.toggleExpand;
    window.applySlotResult = TiageSlotMachine.applySlotResult;
    window.goToIchAttributes = TiageSlotMachine.goToIchAttributes;
}

console.log('[TiageSlotMachine] Modul geladen');
