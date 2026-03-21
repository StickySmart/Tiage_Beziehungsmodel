/**
 * scoringEngine.js — Scoring & Compatibility Functions
 * Extracted from app-main.js v1.8.1026
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype()         – current ICH archetype
 *   window.getPartnerArchetype()     – current PARTNER archetype
 *   window.personDimensions          – desktop dimensions proxy (TiageState)
 *   window.tiageData                 – tiage data (interactions, archetypes, etc.)
 *   window.getGeschlechtCategory()   – geschlecht category helper (app-main.js)
 *   window.getModifierSummary()      – modifier summary (calculationEngine.js)
 *   window.getProfileFromStore()     – profile store lookup (calculationEngine.js)
 *   window.estimateProfilMatch()     – profile match estimate (calculationEngine.js)
 *   window.areAttributesCompatible() – attribute compatibility (calculationEngine.js)
 *   TiageSynthesis                   – synthesis constants & calculators
 *   TiageCompatibility               – compatibility module
 *   TiageDimensions                  – dimensions module
 *   TiageI18n                        – internationalization
 *   TiageState                       – state management
 *   TiageProfileStore                – profile store
 */
(function() {
    'use strict';

function getConfidenceMultiplier(confidence) {
    // SSOT: TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY.CONFIDENCE_MULTIPLIER
    if (typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.Constants &&
        TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY &&
        TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY.CONFIDENCE_MULTIPLIER) {
        return TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY.CONFIDENCE_MULTIPLIER[confidence] || 1.0;
    }
    // Fallback wenn SSOT nicht verfügbar
    const defaults = { 'hoch': 1.0, 'mittel': 0.85, 'niedrig': 0.70 };
    return defaults[confidence] || 1.0;
}

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

    // v4.0: Array-Format
    if (Array.isArray(ori1)) {
        ori1.forEach(o => oriList1.push({ type: o, status: 'gelebt' }));
    } else if (ori1 && typeof ori1 === 'object') {
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

    // v4.0: Array-Format
    if (Array.isArray(ori2)) {
        ori2.forEach(o => oriList2.push({ type: o, status: 'gelebt' }));
    } else if (ori2 && typeof ori2 === 'object') {
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
    const isUnsicher = status1 === 'interessiert' || status2 === 'interessiert';

    // Helper: Can this orientation be attracted to the other person's gender?
    const canBeAttractedTo = (orientation, myGender, theirGender) => {
        if (orientation === 'bisexuell') return true; // Bi can be attracted to any gender
        if (orientation === 'heterosexuell') {
            // Nonbinär mit Hetero: Anziehung zu beiden binären Geschlechtern erlauben
            const isNonBinary = !isMaleGender(myGender) && !isFemaleGender(myGender);
            if (isNonBinary) {
                return isMaleGender(theirGender) || isFemaleGender(theirGender);
            }
            return isDifferentBinaryGender(myGender, theirGender);
        }
        if (orientation === 'homosexuell') return isSameGenderCategory(myGender, theirGender);
        return false;
    };

    // BOTH persons must be able to be attracted to each other's gender
    const person1CanBeAttracted = canBeAttractedTo(type1, g1, g2);
    const person2CanBeAttracted = canBeAttractedTo(type2, g2, g1);

    if (person1CanBeAttracted && person2CanBeAttracted) {
        return isUnsicher ? 'unsicher' : 'möglich';
    }

    // If only one person is exploring, there might be potential
    if (isUnsicher && (person1CanBeAttracted || person2CanBeAttracted)) {
        return 'unsicher';
    }

    return 'unmöglich';
}

function calculatePhilosophyCompatibility(type1, type2) {
    // Delegate to extracted module
    if (typeof TiageCompatibility !== 'undefined' && TiageCompatibility.Philosophy) {
        return TiageCompatibility.Philosophy.calculate(type1, type2, window.tiageData);
    }
    // Fallback: inline implementation for backwards compatibility
    // Get the philosophy score (Category A) from the matrix
    const key = `${type1}_${type2}`;
    const interaction = window.tiageData?.interactions[key];

    if (interaction && interaction.scores && interaction.scores.A) {
        return {
            score: interaction.scores.A.value,
            note: interaction.scores.A.note
        };
    }

    // Fallback if not found
    return { score: 50, note: TiageI18n.t('ui.noSpecificData', 'Keine spezifischen Daten verfügbar') };
}

// Helper function to format orientierung object to string
function formatOrientierung(orientierung) {
    if (!orientierung) return '?';
    if (typeof orientierung === 'object') {
        const parts = [];
        if (orientierung.primary) {
            parts.push(orientierung.primary + ' (P)');
        }
        if (orientierung.secondary) {
            parts.push(orientierung.secondary + ' (S)');
        }
        return parts.length > 0 ? parts.join(', ') : '?';
    }
    // Backwards compatibility for old single-value format
    return orientierung;
}

function formatPersonSummary(person) {
    // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
    let geschlecht = person.geschlecht || '?';
    if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
        geschlecht = geschlecht.primary || '?';
    }

    // Handle Primary/Secondary orientierung structure
    const orientierungStr = formatOrientierung(person.orientierung);

    return `${geschlecht}, ${orientierungStr}`;
}

function runCompatibilityChecks() {
    const person1 = {
        archetyp: window.getIchArchetype(),
        ...window.personDimensions.ich
    };
    const person2 = {
        archetyp: window.getPartnerArchetype(),
        ...window.personDimensions.partner
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

    // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
    if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
        // SANFTER HINWEIS statt K.O.-Blocker
        // Zeige Warnung, aber blockiere nicht mehr
        document.getElementById('pathosBlocker').classList.add('active');
        // Content wird NICHT mehr versteckt - zeige den (niedrigen) Score
        // document.getElementById('compatibilityContent').style.display = 'none';

        document.getElementById('pathosBlockerReason').textContent =
            `Hinweis: ${pathosCheck.reason || 'Inkompatible Orientierungen'} – Resonanz ist sehr niedrig, aber nicht unmöglich.`;
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
            `${formatOrientierung(person2.orientierung)} (${person2.orientierungStatus}) → Exploration-Phase`;
        document.getElementById('doubleWarningLogos').textContent =
            `Beziehungsphilosophie: ${logosCheck.score} → ${window.tiageData?.archetypes[person1.archetyp]?.name || person1.archetyp} vs. ${window.tiageData?.archetypes[person2.archetyp]?.name || person2.archetyp}`;
    } else {
        // Single warnings
        if (hasLogosWarning) {
            document.getElementById('logosWarning').classList.add('active');
            const warningTitle = logosCheck.score < 30
                ? TiageI18n.t('warnings.fundamentalDifferences', 'Verstandsebene-Warnung: Fundamentale philosophische Unterschiede')
                : TiageI18n.t('warnings.differentApproaches', 'Verstandsebene-Hinweis: Unterschiedliche philosophische Ansätze');
            document.getElementById('logosWarningTitle').textContent = warningTitle;
            document.getElementById('logosWarningSubtitle').textContent =
                TiageI18n.t('warnings.relationshipPhilosophy', 'Beziehungsphilosophie: {score}').replace('{score}', logosCheck.score);
            document.getElementById('logosWarningScore').textContent = `${logosCheck.score}`;
            document.getElementById('logosWarningText').textContent = logosCheck.score < 30
                ? TiageI18n.t('warnings.warningText', 'Eure Grundüberzeugungen über Beziehungen sind sehr unterschiedlich. Dies erfordert intensive Kommunikation und Kompromissbereitschaft.')
                : TiageI18n.t('warnings.infoText', 'Ihr habt verschiedene Vorstellungen von Beziehungen. Offene Kommunikation ist wichtig.');
        }

        if (hasPathosUncertain) {
            document.getElementById('pathosUncertain').classList.add('active');
            document.getElementById('pathosUncertainText').textContent =
                `Mindestens eine Person ist in der Explorationsphase (Status: "Interessiert"). Die tatsächliche körperliche Anziehung ist noch unklar.`;
        }
    }

    // 3. DISPLAY DIMENSION MODIFIERS
    const modifierSummaries = window.getModifierSummary(person1, person2);
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
    const title = TiageI18n.t('warnings.pathosLogosTitle', 'Pathos vs. Logos');
    const content = `
        <div style="line-height: 1.6;">
            <h4 style="color: var(--primary); margin-bottom: 10px;">${TiageI18n.t('warnings.emotionLevel', 'GEFÜHLSEBENE (Emotion/Körper)')}</h4>
            <ul style="margin-bottom: 15px; padding-left: 20px;">
                <li>${TiageI18n.t('warnings.emotionDesc', 'Körperliche und emotionale Anziehung')}</li>
                <li>${TiageI18n.t('warnings.emotionDimension', 'Sexuelle Orientierung')}</li>
                <li>${TiageI18n.t('warnings.emotionImmutable', 'Nicht durch Lernen oder Kommunikation veränderbar')}</li>
                <li>${TiageI18n.t('warnings.emotionConsequence', 'Ohne Gefühlsebene: Keine romantische Beziehung möglich')}</li>
            </ul>

            <h4 style="color: var(--warning); margin-bottom: 10px;">${TiageI18n.t('warnings.reasonLevel', 'VERSTANDSEBENE (Philosophie/Überzeugungen)')}</h4>
            <ul style="margin-bottom: 15px; padding-left: 20px;">
                <li>${TiageI18n.t('warnings.reasonDesc', 'Beziehungsphilosophie und rationale Überzeugungen')}</li>
                <li>${TiageI18n.t('warnings.reasonDimension', 'Überzeugungen und Werte')}</li>
                <li>${TiageI18n.t('warnings.reasonMutable', 'Kann durch Kommunikation und Lernen verändert werden')}</li>
                <li>${TiageI18n.t('warnings.reasonConsequence', 'Ohne Verstandsebene: Schwierige, aber mögliche Beziehung')}</li>
            </ul>

            <p style="font-style: italic; color: var(--text-muted);">
                ${TiageI18n.t('warnings.pathosLogosQuote', '"Die Gefühlsebene ist das Fundament - ohne körperliche Anziehung kann keine romantische Beziehung entstehen. Die Verstandsebene ist das Dach - es schützt und strukturiert, kann aber umgebaut werden."')}
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
        return TiageDimensions.TagCalculator.calculateTagWithModifiers(tagId, person1, person2, pathosCheck, window.tiageData);
    }
    // Fallback: inline implementation for backwards compatibility
    const interactionKey = `${person1.archetyp}_${person2.archetyp}`;
    const interaction = window.tiageData?.interactions[interactionKey];
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
        desc: descriptions.length > 0 ? descriptions.join("; ") : TiageI18n.t('quality.noModification', 'Keine Anpassung')
    };
}

// Calculate category with modifiers
// NOTE: Logic extracted to /js/dimensions/tagCalculator.js
function calculateCategoryWithModifiers(catLetter, person1, person2, pathosCheck) {
    // Delegate to extracted module
    if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagCalculator) {
        return TiageDimensions.TagCalculator.calculateCategoryWithModifiers(catLetter, person1, person2, pathosCheck, window.tiageData);
    }
    // Fallback: inline implementation for backwards compatibility
    const categoryTags = Object.keys(tagDimensionRelevance).filter(t => getTagCategory(t) === catLetter);

    if (categoryTags.length === 0) {
        const interactionKey = `${person1.archetyp}_${person2.archetyp}`;
        const interaction = window.tiageData?.interactions[interactionKey];
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

// Factor 1: Archetype Match (40%) - SSOT aus Bedürfnis-Profilen
// ═══════════════════════════════════════════════════════════════════════════
// SSOT: Nutzt ArchetypeMatrixCalculator.getScore() für Live-Berechnung
// KEINE Fallback-Matrix - Werte werden aus Bedürfnis-Profilen berechnet
// ═══════════════════════════════════════════════════════════════════════════
function getArchetypeScore(type1, type2) {
    // SSOT: Nutze ArchetypeMatrixCalculator.getScore() direkt
    if (typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.ArchetypeMatrixCalculator &&
        typeof TiageSynthesis.ArchetypeMatrixCalculator.getScore === 'function') {
        const score = TiageSynthesis.ArchetypeMatrixCalculator.getScore(type1, type2);
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[getArchetypeScore] SSOT:', type1, type2, '→', score);
        return score;
    }

    // Fallback: TiageSynthesis.Factors.Archetyp (nutzt auch SSOT intern)
    if (typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.Factors &&
        TiageSynthesis.Factors.Archetyp &&
        typeof TiageSynthesis.Factors.Archetyp.calculate === 'function') {
        const result = TiageSynthesis.Factors.Archetyp.calculate(type1, type2, window.tiageData);
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[getArchetypeScore] Via Factors.Archetyp:', type1, type2, '→', result.score);
        return result.score;
    }

    // Letzte Fallback: Matrix-Interaction
    const key = `${type1}_${type2}`;
    const interaction = window.tiageData?.interactions?.[key];
    if (interaction?.overall) {
        return interaction.overall;
    }

    console.warn('[getArchetypeScore] SSOT nicht verfügbar für:', type1, type2);
    return 50; // Neutraler Default
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
// DOMINANZ HARMONY MATRIX - SSOT: Referenziert Constants.DOMINANCE_MATRIX
// ═══════════════════════════════════════════════════════════════════════
function getDominanzHarmonyMatrix() {
    if (typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.Constants &&
        TiageSynthesis.Constants.DOMINANCE_MATRIX) {
        return TiageSynthesis.Constants.DOMINANCE_MATRIX;
    }
    // Fallback (sollte nicht erreicht werden)
    console.warn('[getDominanzHarmonyMatrix] SSOT nicht verfügbar, nutze Fallback');
    return {
        "dominant-submissiv": 100, "submissiv-dominant": 100,
        "ausgeglichen-ausgeglichen": 100, "switch-switch": 100,
        "switch-ausgeglichen": 100, "ausgeglichen-switch": 100,
        "dominant-ausgeglichen": 93, "ausgeglichen-dominant": 93,
        "submissiv-ausgeglichen": 93, "ausgeglichen-submissiv": 93,
        "switch-dominant": 93, "dominant-switch": 93,
        "switch-submissiv": 93, "submissiv-switch": 93,
        "dominant-dominant": 55, "submissiv-submissiv": 55
    };
}
const dominanzHarmonyMatrix = getDominanzHarmonyMatrix();

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

    // Gewichteter Durchschnitt: Primär 70%, Sekundär 30%
    const PRIMARY_WEIGHT = 0.7;
    const SECONDARY_WEIGHT = 0.3;

    // Berechne gewichteten Score für jede Person-Kombination
    let totalWeight = 0;
    let weightedSum = 0;

    for (const d1 of list1) {
        for (const d2 of list2) {
            const score = calculateSingleDominanzHarmony(d1.type, d1.status, d2.type, d2.status);
            // Gewicht = Produkt der jeweiligen Gewichte
            const w1 = d1.status === 'primary' ? PRIMARY_WEIGHT : SECONDARY_WEIGHT;
            const w2 = d2.status === 'primary' ? PRIMARY_WEIGHT : SECONDARY_WEIGHT;
            const combinedWeight = w1 * w2;
            weightedSum += score * combinedWeight;
            totalWeight += combinedWeight;
        }
    }

    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 75;
}

// Factor 3: Orientation Compatibility (25%) - uses existing checkPhysicalCompatibility
function calculateOrientationScore(person1, person2) {
    const pathosCheck = checkPhysicalCompatibility(person1, person2);

    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[calculateOrientationScore] pathosCheck.result:', pathosCheck.result,
    //             'reason:', pathosCheck.reason || '-',
    //             'missingItems:', pathosCheck.missingItems || '-');

    if (pathosCheck.result === "unmöglich") {
        // console.log('[calculateOrientationScore] K.O. - returning 0');
        return 0;  // K.O.-Kriterium!
    }

    if (pathosCheck.result === "unsicher") {
        // console.log('[calculateOrientationScore] Unsicher - returning 70');
        return 70;  // Exploration-Phase
    }

    // console.log('[calculateOrientationScore] Möglich - returning 100');
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

    // Keine Obergrenze - Score kann über 100 gehen (z.B. durch Openness-Bonus)
    return baseScore + opennessBonus;
}

// Helper for single orientierung pair - nutzt Geschlechts-Kategorien
function calculateSingleGenderAttraction(g1, o1, g2, o2) {
    // Konvertiere Geschlechter zu Kategorien für die Logik
    const cat1 = window.getGeschlechtCategory(g1);
    const cat2 = window.getGeschlechtCategory(g2);

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
// R4 HYBRID: BIDIREKTIONALE ATTRAKTION MIT P/S GEWICHTUNG
// ═══════════════════════════════════════════════════════════════════════
// Berechnet gegenseitige Attraktion unter Berücksichtigung von:
// - Primäre Orientierung (70% Gewicht)
// - Sekundäre Orientierung (30% Gewicht, Bonus nicht Override)
// - Bidirektional: ICH→Partner UND Partner→ICH
// ═══════════════════════════════════════════════════════════════════════

/**
 * Berechnet die Attraktion in EINE Richtung (Person A → Person B)
 * Berücksichtigt Primär/Sekundär Orientierung mit Gewichtung
 *
 * @param {string} genderA - Geschlecht von A (effektiv, nach Cis/Trans)
 * @param {object} orientierungA - { primary, secondary } von A
 * @param {string} genderB - Geschlecht von B (effektiv)
 * @returns {number} Attraktion 0-100
 */
function calculateDirectionalAttraction(genderA, orientierungA, genderB) {
    const PRIMARY_WEIGHT = 0.70;
    const SECONDARY_WEIGHT = 0.30;

    // Extrahiere P/S Orientierungen
    let primaryOri = null;
    let secondaryOri = null;

    if (orientierungA && typeof orientierungA === 'object') {
        primaryOri = orientierungA.primary || null;
        secondaryOri = orientierungA.secondary || null;
    } else if (typeof orientierungA === 'string') {
        primaryOri = orientierungA;
    }

    if (!primaryOri || !genderA || !genderB) {
        return 75; // Neutral bei fehlenden Daten
    }

    // Konvertiere zu Kategorien
    const catA = window.getGeschlechtCategory(genderA);
    const catB = window.getGeschlechtCategory(genderB);

    // Hilfsfunktion: Prüft ob Orientierung zu Geschlecht passt
    const checkAttraction = (ori, fromCat, toCat) => {
        if (!ori) return 0;

        if (ori === 'bisexuell' || ori === 'pansexuell') {
            return 100; // Bi/Pan = offen für alle
        }

        if (ori === 'heterosexuell') {
            // Hetero: Angezogen vom "anderen" Geschlecht
            if ((fromCat === 'maennlich' && toCat === 'weiblich') ||
                (fromCat === 'weiblich' && toCat === 'maennlich')) {
                return 100;
            }
            // Nonbinär/Fluid - partielle Kompatibilität
            if (toCat === 'nonbinaer' || toCat === 'fluid') return 60;
            // Gleiches Geschlecht = keine Attraktion
            return 0;
        }

        if (ori === 'homosexuell') {
            // Homo: Angezogen vom "gleichen" Geschlecht
            if (fromCat === toCat && fromCat !== 'nonbinaer' && fromCat !== 'fluid') {
                return 100;
            }
            // Nonbinär mit ähnlichen
            if ((fromCat === 'nonbinaer' || fromCat === 'fluid') &&
                (toCat === 'nonbinaer' || toCat === 'fluid')) {
                return 85;
            }
            // Verschiedene binäre Geschlechter = keine Attraktion
            if ((fromCat === 'maennlich' && toCat === 'weiblich') ||
                (fromCat === 'weiblich' && toCat === 'maennlich')) {
                return 0;
            }
            return 50; // Unsicher
        }

        return 50; // Unbekannte Orientierung
    };

    // Berechne Attraktion für Primär und Sekundär
    const primaryAttraction = checkAttraction(primaryOri, catA, catB);
    const secondaryAttraction = secondaryOri
        ? checkAttraction(secondaryOri, catA, catB)
        : 0;

    // Gewichtete Kombination
    // Wenn kein Secondary: nur Primary zählt (100%)
    if (!secondaryOri) {
        return primaryAttraction;
    }

    // Mit Secondary: P × 0.70 + S × 0.30
    return Math.round(primaryAttraction * PRIMARY_WEIGHT + secondaryAttraction * SECONDARY_WEIGHT);
}

/**
 * Berechnet BIDIREKTIONALE Attraktion zwischen zwei Personen
 * Beide Richtungen müssen passen!
 *
 * @param {object} person1 - { geschlecht: {primary, secondary}, orientierung: {primary, secondary} }
 * @param {object} person2 - { geschlecht: {primary, secondary}, orientierung: {primary, secondary} }
 * @returns {object} { score, direction1to2, direction2to1, details }
 */
function calculateBidirectionalAttraction(person1, person2) {
    // Extrahiere effektive Geschlechter (nach Cis/Trans Transformation)
    const getEffectiveGender = (geschlecht) => {
        if (!geschlecht) return null;
        if (typeof geschlecht === 'string') return geschlecht;

        const primary = geschlecht.primary;   // Körper: mann, frau, inter
        const secondary = geschlecht.secondary; // Identität: cis, trans, nonbinaer

        if (!secondary || secondary === 'cis') return primary;
        if (secondary === 'trans') {
            if (primary === 'mann') return 'frau';
            if (primary === 'frau') return 'mann';
            return primary;
        }
        if (secondary === 'nonbinaer') return 'nonbinaer';
        if (secondary === 'fluid') return 'fluid';

        return primary || secondary;
    };

    const gender1 = getEffectiveGender(person1.geschlecht);
    const gender2 = getEffectiveGender(person2.geschlecht);

    // Berechne beide Richtungen
    const attraction1to2 = calculateDirectionalAttraction(gender1, person1.orientierung, gender2);
    const attraction2to1 = calculateDirectionalAttraction(gender2, person2.orientierung, gender1);

    // Bidirektional: Durchschnitt beider Richtungen
    // Alternativ: Minimum (strenger) - aber Durchschnitt ist fairer
    const bidirectionalScore = Math.round((attraction1to2 + attraction2to1) / 2);

    return {
        score: bidirectionalScore,
        direction1to2: attraction1to2,
        direction2to1: attraction2to1,
        details: {
            gender1,
            gender2,
            orientierung1: person1.orientierung,
            orientierung2: person2.orientierung
        }
    };
}

/**
 * Berechnet R4 HYBRID: Kombination aus Identität + Bidirektionaler Attraktion
 *
 * Formel: R4 = 0.5 + (identity × 0.30 + attraction × 0.70) / 100
 *
 * @param {object} person1 - Vollständiges Profil
 * @param {object} person2 - Vollständiges Profil
 * @returns {object} { R4, identityScore, attractionScore, details }
 */
function calculateR4Hybrid(person1, person2) {
    const IDENTITY_WEIGHT = 0.30;
    const ATTRACTION_WEIGHT = 0.70;

    // 1. Identitäts-Resonanz (Cis↔Cis, Trans↔Trans, etc.)
    const identity1 = person1.geschlecht?.secondary || 'cis';
    const identity2 = person2.geschlecht?.secondary || 'cis';
    const identityScore = calculateIdentityResonance(identity1, identity2);

    // 2. Bidirektionale Attraktion
    const attractionResult = calculateBidirectionalAttraction(person1, person2);
    const attractionScore = attractionResult.score;

    // 3. Hybrid-Kombination
    // v3.7: R4 = (combinedScore / 100)² - keine Obergrenze
    const combinedScore = identityScore * IDENTITY_WEIGHT + attractionScore * ATTRACTION_WEIGHT;
    const normalized = combinedScore / 100;
    const R4 = normalized * normalized;

    // v3.7: Keine Obergrenze - R4 kann > 1.0 sein wenn combinedScore > 100
    const R4Final = Math.max(0, R4);

    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[calculateR4Hybrid] Ergebnis:', {
    //     identityScore,
    //     attractionScore,
    //     combinedScore: Math.round(combinedScore),
    //     R4: Math.round(R4Final * 1000) / 1000,
    //     attraction1to2: attractionResult.direction1to2,
    //     attraction2to1: attractionResult.direction2to1
    // });

    return {
        R4: Math.round(R4Final * 1000) / 1000,
        identityScore,
        attractionScore,
        combinedScore: Math.round(combinedScore),
        attractionDetails: attractionResult
    };
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
        return window.estimateProfilMatch(person1, person2);
    }

    // Profile aus TiageProfileStore laden (synchron)
    const profile1 = window.getProfileFromStore(person1);
    const profile2 = window.getProfileFromStore(person2);

    if (!profile1 || !profile2) {
        return window.estimateProfilMatch(person1, person2);
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
            } else if (window.areAttributesCompatible(attr, attrs1[attr], attrs2[attr])) {
                matches += 0.5; // Partielle Übereinstimmung
            }
        }
    }

    return Math.round((matches / 30) * 100);
}

/**
 * Lädt ein Profil aus TiageProfileStore basierend auf Person-Daten
 */
/**
 * Berechnet Bedürfnis-Matching direkt aus TiageState.flatNeeds
 * Verwendet die individualisierten Werte (Archetyp + Modifikatoren)
 * und berücksichtigt manuell gelockte Werte (lockedNeeds)
 *
 * @returns {Object|null} { score, gemeinsam, komplementaer, unterschiedlich } oder null
 */
function calculateNeedsMatchFromFlatNeeds() {
    if (typeof TiageState === 'undefined') {
        return null;
    }

    // flatNeeds aus TiageState holen (Archetyp + D/G/O Modifikatoren)
    const ichFlatNeeds = TiageState.getFlatNeeds('ich') || {};
    const partnerFlatNeeds = TiageState.getFlatNeeds('partner') || {};

    // Prüfen ob Daten vorhanden
    const ichKeys = Object.keys(ichFlatNeeds);
    const partnerKeys = Object.keys(partnerFlatNeeds);

    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[calculateNeedsMatchFromFlatNeeds] Vergleich:', {
    //     ichCount: ichKeys.length,
    //     partnerCount: partnerKeys.length,
    //     ichSample: ichKeys.slice(0, 5).reduce((o, k) => ({ ...o, [k]: ichFlatNeeds[k] }), {}),
    //     partnerSample: partnerKeys.slice(0, 5).reduce((o, k) => ({ ...o, [k]: partnerFlatNeeds[k] }), {}),
    //     ichDimensions: TiageState.get('window.personDimensions.ich'),
    //     partnerDimensions: TiageState.get('window.personDimensions.partner')
    // });

    if (ichKeys.length === 0 || partnerKeys.length === 0) {
        return null; // Keine Daten verfügbar
    }

    // lockedNeeds holen (überschreiben flatNeeds)
    const ichLockedNeeds = TiageState.getLockedNeeds('ich') || {};
    const partnerLockedNeeds = TiageState.getLockedNeeds('partner') || {};

    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // const ichLockedCount = Object.keys(ichLockedNeeds).length;
    // const partnerLockedCount = Object.keys(partnerLockedNeeds).length;
    // if (ichLockedCount > 0 || partnerLockedCount > 0) {
    //     console.log('[calculateNeedsMatchFromFlatNeeds] LockedNeeds:', {
    //         ichLocked: ichLockedCount,
    //         partnerLocked: partnerLockedCount
    //     });
    // }

    // Finale Werte: lockedNeeds überschreiben flatNeeds
    const getFinalValue = (person, needId) => {
        const locked = person === 'ich' ? ichLockedNeeds[needId] : partnerLockedNeeds[needId];
        const flat = person === 'ich' ? ichFlatNeeds[needId] : partnerFlatNeeds[needId];

        // lockedNeeds haben Priorität
        if (locked !== undefined && locked !== null) return locked;
        if (flat !== undefined && flat !== null) return flat;
        return null;
    };

    // Alle Bedürfnis-IDs sammeln (Union von beiden)
    const allNeedIds = new Set([...ichKeys, ...partnerKeys]);

    const gemeinsam = [];
    const komplementaer = [];
    const unterschiedlich = [];

    // Matching berechnen
    allNeedIds.forEach(needId => {
        const wert1 = getFinalValue('ich', needId);
        const wert2 = getFinalValue('partner', needId);

        // Skip wenn einer der Werte fehlt
        if (wert1 === null || wert2 === null) return;

        const diff = Math.abs(wert1 - wert2);

        const item = {
            need: needId,       // '#B1', '#B2', etc.
            wert1: wert1,
            wert2: wert2
        };

        // Kategorisierung basierend auf Differenz
        if (diff <= 15) {
            gemeinsam.push(item);           // Übereinstimmung (0-15)
        } else if (diff <= 35) {
            komplementaer.push(item);       // Komplementär (16-35)
        } else {
            unterschiedlich.push(item);     // Konflikt (36+)
        }
    });

    // Score berechnen (gewichtet)
    const totalItems = gemeinsam.length + komplementaer.length + unterschiedlich.length;
    if (totalItems === 0) return null;

    const score = Math.round(
        ((gemeinsam.length * 100) + (komplementaer.length * 60) + (unterschiedlich.length * 20)) / totalItems
    );

    return {
        score: score,
        gemeinsam: gemeinsam,
        komplementaer: komplementaer,
        unterschiedlich: unterschiedlich
    };
}

    // ── Exports ─────────────────────────────────────────────────────────────
    window.getConfidenceMultiplier = getConfidenceMultiplier;
    window.checkPhysicalCompatibility = checkPhysicalCompatibility;
    window.isMaleGender = isMaleGender;
    window.isFemaleGender = isFemaleGender;
    window.isSameGenderCategory = isSameGenderCategory;
    window.isDifferentBinaryGender = isDifferentBinaryGender;
    window.checkSingleOrientationPair = checkSingleOrientationPair;
    window.calculatePhilosophyCompatibility = calculatePhilosophyCompatibility;
    window.formatOrientierung = formatOrientierung;
    window.formatPersonSummary = formatPersonSummary;
    window.runCompatibilityChecks = runCompatibilityChecks;
    window.toggleLogosWarning = toggleLogosWarning;
    window.showPathosLogosInfo = showPathosLogosInfo;
    window.getDominanzModifier = getDominanzModifier;
    window.getDominanzDescription = getDominanzDescription;
    window.getTagCategory = getTagCategory;
    window.calculateTagWithModifiers = calculateTagWithModifiers;
    window.calculateCategoryWithModifiers = calculateCategoryWithModifiers;
    window.getArchetypeScore = getArchetypeScore;
    window.getDominanzHarmonyMatrix = getDominanzHarmonyMatrix;
    window.calculateSingleDominanzHarmony = calculateSingleDominanzHarmony;
    window.calculateDominanceHarmony = calculateDominanceHarmony;
    window.calculateOrientationScore = calculateOrientationScore;
    window.calculateGenderAttraction = calculateGenderAttraction;
    window.calculateIdentityResonance = calculateIdentityResonance;
    window.calculateSingleGenderAttraction = calculateSingleGenderAttraction;
    window.calculateDirectionalAttraction = calculateDirectionalAttraction;
    window.calculateBidirectionalAttraction = calculateBidirectionalAttraction;
    window.calculateR4Hybrid = calculateR4Hybrid;
    window.calculateProfilMatch = calculateProfilMatch;
    window.calculateNeedsMatchFromFlatNeeds = calculateNeedsMatchFromFlatNeeds;

})();
