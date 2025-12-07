/**
 * ATTRIBUTE SUMMARY CARD COMPONENT
 *
 * Zeigt Attribute als Zusammenfassung der zugehörigen Bedürfnisse.
 * Klick zum Erweitern und Bearbeiten der einzelnen Bedürfnisse.
 * Mit Eingabewert und Schloss wie bei Gewichtungen.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const AttributeSummaryCard = (function() {
    'use strict';

    /**
     * Mapping: Attribut → zugehörige Bedürfnisse aus BeduerfnisModifikatoren
     * Diese Bedürfnisse werden vom jeweiligen Attribut beeinflusst
     */
    const ATTRIBUTE_NEEDS_MAPPING = {
        // GESCHLECHTSIDENTITÄT
        'pr-geschlecht-sekundaer': {
            needs: ['akzeptanz', 'verstanden_werden', 'gesehen_werden', 'authentizitaet',
                    'selbstbestimmung', 'stabilitaet', 'selbst_ausdruck'],
            label: 'Geschlechtsidentität',
            category: 'geschlechtsidentitaet'
        },

        // LEBENSPLANUNG
        'pr-kinder': {
            needs: ['fuersorge', 'verantwortung_uebernehmen', 'wachstum', 'sinn', 'zugehoerigkeit'],
            label: 'Kinder',
            category: 'lebensplanung'
        },
        'pr-ehe': {
            needs: ['stabilitaet', 'bestaendigkeit', 'sich_sicher_fuehlen', 'vertrauen', 'zugehoerigkeit'],
            label: 'Ehe',
            category: 'lebensplanung'
        },
        'pr-zusammen': {
            needs: ['naehe', 'geborgenheit', 'fuereinander_da_sein', 'raum_haben', 'unabhaengigkeit'],
            label: 'Zusammen wohnen',
            category: 'lebensplanung'
        },
        'pr-haustiere': {
            needs: ['fuersorge', 'waerme', 'verantwortung_uebernehmen', 'freude'],
            label: 'Haustiere',
            category: 'lebensplanung'
        },
        'pr-umzug': {
            needs: ['spontaneitaet', 'stabilitaet', 'herausforderung', 'raum_haben', 'bestaendigkeit'],
            label: 'Umzugsbereitschaft',
            category: 'lebensplanung'
        },
        'pr-familie': {
            needs: ['zugehoerigkeit', 'gemeinschaft', 'fuereinander_da_sein', 'waerme', 'geborgenheit'],
            label: 'Familie-Wichtigkeit',
            category: 'lebensplanung'
        },

        // FINANZEN & KARRIERE
        'pr-finanzen': {
            needs: ['unabhaengigkeit', 'vertrauen', 'gegenseitigkeit', 'stabilitaet', 'sich_sicher_fuehlen'],
            label: 'Finanzen',
            category: 'finanzen'
        },
        'pr-karriere': {
            needs: ['wirksamkeit', 'kompetenz', 'herausforderung', 'beitrag_leisten', 'fuereinander_da_sein'],
            label: 'Karriere-Priorität',
            category: 'finanzen'
        },

        // KOMMUNIKATION
        'pr-gespraech': {
            needs: ['kommunikation', 'verstanden_werden', 'naehe', 'fuereinander_da_sein', 'empathie'],
            label: 'Gesprächsbedürfnis',
            category: 'kommunikation'
        },
        'pr-emotional': {
            needs: ['intimitaet', 'vertrauen', 'akzeptanz', 'gesehen_werden', 'empathie'],
            label: 'Emotionale Offenheit',
            category: 'kommunikation'
        },
        'pr-konflikt': {
            needs: ['harmonie', 'kommunikation', 'respekt', 'vertrauen', 'raum_haben'],
            label: 'Konfliktverhalten',
            category: 'kommunikation'
        },

        // SOZIALES
        'pr-introextro': {
            needs: ['raum_haben', 'gemeinschaft', 'zugehoerigkeit', 'leichtigkeit', 'kommunikation'],
            label: 'Intro/Extrovertiert',
            category: 'soziales'
        },
        'pr-alleinzeit': {
            needs: ['raum_haben', 'unabhaengigkeit', 'selbstbestimmung', 'naehe', 'fuereinander_da_sein'],
            label: 'Alleinzeit-Bedürfnis',
            category: 'soziales'
        },
        'pr-freunde': {
            needs: ['zugehoerigkeit', 'gemeinschaft', 'unabhaengigkeit', 'raum_haben', 'fuereinander_da_sein'],
            label: 'Freundeskreis',
            category: 'soziales'
        },

        // INTIMITÄT
        'pr-naehe': {
            needs: ['naehe', 'beruehrung', 'waerme', 'geborgenheit', 'intimitaet'],
            label: 'Körperliche Nähe',
            category: 'intimitaet'
        },
        'pr-romantik': {
            needs: ['liebe', 'wertschaetzung', 'waerme', 'gesehen_werden', 'freude'],
            label: 'Romantik-Bedürfnis',
            category: 'intimitaet'
        },
        'pr-sex': {
            needs: ['sexualitaet', 'intimitaet', 'naehe', 'intensitaet', 'lust'],
            label: 'Sexuelle Frequenz',
            category: 'intimitaet'
        },

        // WERTE
        'pr-religion': {
            needs: ['sinn', 'gemeinschaft', 'zugehoerigkeit', 'inspiration', 'wachstum'],
            label: 'Religiosität',
            category: 'werte'
        },
        'pr-tradition': {
            needs: ['stabilitaet', 'bestaendigkeit', 'spontaneitaet', 'entdecken', 'authentizitaet'],
            label: 'Tradition vs. Modern',
            category: 'werte'
        },
        'pr-umwelt': {
            needs: ['sinn', 'verantwortung_uebernehmen', 'beitrag_leisten', 'integritaet', 'authentizitaet'],
            label: 'Umweltbewusstsein',
            category: 'werte'
        },

        // PRAKTISCHES
        'pr-ordnung': {
            needs: ['stabilitaet', 'leichtigkeit', 'harmonie', 'raum_haben', 'effizienz'],
            label: 'Ordnung',
            category: 'praktisches'
        },
        'pr-reise': {
            needs: ['entdecken', 'spontaneitaet', 'herausforderung', 'freude', 'leben_feiern'],
            label: 'Reise-Frequenz',
            category: 'praktisches'
        }
    };

    /**
     * Deutsche Übersetzungen für Bedürfnisse
     */
    const NEEDS_LABELS = {
        // PHYSISCH
        luft: 'Luft',
        wasser: 'Wasser',
        essen: 'Nahrung',
        bewegung: 'Bewegung',
        beruehrung: 'Berührung',
        ruhe: 'Ruhe',
        sexualitaet: 'Sexualität',
        lust: 'Lust',
        koerperliche_sicherheit: 'Körperliche Sicherheit',
        obdach: 'Obdach',

        // SICHERHEIT
        stabilitaet: 'Stabilität',
        sich_sicher_fuehlen: 'Sicherheitsgefühl',
        schutz: 'Schutz',
        bestaendigkeit: 'Beständigkeit',
        leichtigkeit: 'Leichtigkeit',
        geborgenheit: 'Geborgenheit',

        // ZUNEIGUNG
        waerme: 'Wärme',
        wertschaetzung: 'Wertschätzung',
        naehe: 'Nähe',
        gesellschaft: 'Gesellschaft',
        intimitaet: 'Intimität',
        liebe: 'Liebe',
        fuersorge: 'Fürsorge',
        unterstuetzung: 'Unterstützung',
        fuereinander_da_sein: 'Füreinander-Da-Sein',

        // VERSTÄNDNIS
        akzeptanz: 'Akzeptanz',
        empathie: 'Empathie',
        beachtung: 'Beachtung',
        verstanden_werden: 'Verstanden-Werden',
        vertrauen: 'Vertrauen',
        beachtet_werden: 'Beachtet-Werden',
        gesehen_werden: 'Gesehen-Werden',
        mitgefuehl: 'Mitgefühl',
        harmonie: 'Harmonie',

        // FREIHEIT
        selbstbestimmung: 'Selbstbestimmung',
        waehlen_koennen: 'Wählen-Können',
        unabhaengigkeit: 'Unabhängigkeit',
        raum_haben: 'Raum-Haben',
        spontaneitaet: 'Spontaneität',

        // TEILNAHME
        zusammenarbeit: 'Zusammenarbeit',
        kommunikation: 'Kommunikation',
        gemeinschaft: 'Gemeinschaft',
        zugehoerigkeit: 'Zugehörigkeit',
        gegenseitigkeit: 'Gegenseitigkeit',
        respekt: 'Respekt',
        bedeutung_haben: 'Bedeutung-Haben',

        // IDENTITÄT
        authentizitaet: 'Authentizität',
        kompetenz: 'Kompetenz',
        wirksamkeit: 'Wirksamkeit',
        herausforderung: 'Herausforderung',
        sinn: 'Sinn',
        wachstum: 'Wachstum',
        beitrag_leisten: 'Beitrag-Leisten',
        integritaet: 'Integrität',
        effizienz: 'Effizienz',
        selbst_ausdruck: 'Selbstausdruck',

        // MUSSE
        freude: 'Freude',
        freizeit: 'Freizeit',

        // ERSCHAFFEN
        kreativitaet: 'Kreativität',
        entdecken: 'Entdecken',

        // VERBUNDENHEIT
        leben_feiern: 'Leben-Feiern',
        inspiration: 'Inspiration',

        // DYNAMIK
        kontrolle_ausueben: 'Kontrolle-Ausüben',
        hingabe: 'Hingabe',
        fuehrung_geben: 'Führung-Geben',
        gefuehrt_werden: 'Geführt-Werden',
        ritual: 'Ritual',
        nachsorge: 'Nachsorge',
        grenzen_setzen: 'Grenzen-Setzen',
        grenzen_respektieren: 'Grenzen-Respektieren',
        intensitaet: 'Intensität',
        vertrauen_schenken: 'Vertrauen-Schenken',
        verantwortung_uebernehmen: 'Verantwortung-Übernehmen',
        sich_fallenlassen: 'Sich-Fallenlassen',
        machtaustausch: 'Machtaustausch',
        dienend_sein: 'Dienend-Sein',
        beschuetzen: 'Beschützen'
    };

    /**
     * Speicher für Bedürfniswerte pro Attribut
     */
    const needsValues = {};

    /**
     * Speicher für Lock-Status pro Attribut
     */
    const lockedAttributes = {};

    /**
     * Berechnet den aggregierten Wert für ein Attribut basierend auf seinen Bedürfnissen
     * @param {string} attrId - Attribut-ID
     * @returns {number} Aggregierter Wert (0-100)
     */
    function calculateAggregatedValue(attrId) {
        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping || !needsValues[attrId]) return 50;

        const values = needsValues[attrId];
        const total = mapping.needs.reduce((sum, need) => sum + (values[need] || 50), 0);
        return Math.round(total / mapping.needs.length);
    }

    /**
     * Initialisiert die Bedürfniswerte für ein Attribut
     * @param {string} attrId - Attribut-ID
     * @param {number} defaultValue - Standardwert
     */
    function initializeNeedsValues(attrId, defaultValue = 50) {
        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping) return;

        if (!needsValues[attrId]) {
            needsValues[attrId] = {};
            mapping.needs.forEach(need => {
                needsValues[attrId][need] = defaultValue;
            });
        }
    }

    /**
     * Erstellt HTML für eine Attribute-Summary-Card
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID
     * @param {string} config.label - Anzeige-Label
     * @param {string} [config.hint] - Optionaler Hinweis
     * @param {number} [config.defaultValue=50] - Standard-Wert
     * @param {string} [config.description] - Beschreibung für Tooltip
     * @returns {string} HTML-String
     */
    function render(config) {
        const { attrId, label, hint, defaultValue = 50, description } = config;

        // Initialisiere Werte
        initializeNeedsValues(attrId, defaultValue);

        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping) {
            console.warn(`AttributeSummaryCard: Kein Mapping für ${attrId}`);
            return '';
        }

        const aggregatedValue = calculateAggregatedValue(attrId);
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const infoIconHtml = description
            ? ` <span class="attr-info-icon" onclick="event.stopPropagation(); openAttributeDefinitionModal('${attrId}')" title="Info anzeigen">ℹ</span>`
            : '';

        // Generiere Bedürfnis-Liste für Expansion
        const needsListHtml = mapping.needs.map(need => {
            const needLabel = NEEDS_LABELS[need] || need;
            const needValue = needsValues[attrId][need] || 50;
            return `
                <div class="attribute-need-item" data-need="${need}">
                    <span class="attribute-need-label">${needLabel}</span>
                    <div class="attribute-need-input-group">
                        <input type="text" class="attribute-need-input" value="${needValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateNeedValue('${attrId}', '${need}', this.value)"
                               onclick="event.stopPropagation()">
                        <span class="attribute-need-percent">%</span>
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="attribute-summary-card" data-attr="${attrId}" onclick="AttributeSummaryCard.toggleExpand(this)">
                <div class="attribute-summary-header">
                    <div class="attribute-summary-label-group">
                        <span class="attribute-summary-label">${label}${hintHtml}${infoIconHtml}</span>
                        <span class="attribute-summary-sublabel">Zwischenergebnis aus ${mapping.needs.length} Bedürfnissen</span>
                    </div>
                    <div class="attribute-summary-input-group">
                        <input type="text" class="attribute-summary-input" value="${aggregatedValue}" maxlength="3"
                               onclick="event.stopPropagation()" readonly>
                        <span class="attribute-summary-percent">%</span>
                        <span class="attribute-summary-lock" onclick="event.stopPropagation(); AttributeSummaryCard.toggleLock('${attrId}', this)"></span>
                        <span class="attribute-summary-expand-icon">▼</span>
                    </div>
                </div>
                <div class="attribute-summary-needs-list collapsed">
                    ${needsListHtml}
                </div>
            </div>`;
    }

    /**
     * Erstellt mehrere Attribute-Summary-Cards
     * @param {Array<Object>} configs - Array von Konfigurationen
     * @returns {string} HTML-String
     */
    function renderMany(configs) {
        return configs.map(render).join('\n');
    }

    /**
     * Togglet den Expand-Status einer Card
     * @param {HTMLElement} card - Die Card
     */
    function toggleExpand(card) {
        const needsList = card.querySelector('.attribute-summary-needs-list');
        const expandIcon = card.querySelector('.attribute-summary-expand-icon');

        if (needsList && expandIcon) {
            needsList.classList.toggle('collapsed');
            expandIcon.classList.toggle('expanded');
        }
    }

    /**
     * Togglet den Lock-Status eines Attributs
     * @param {string} attrId - Attribut-ID
     * @param {HTMLElement} lockElement - Das Lock-Element
     */
    function toggleLock(attrId, lockElement) {
        const card = lockElement.closest('.attribute-summary-card');
        if (!card) return;

        lockedAttributes[attrId] = !lockedAttributes[attrId];
        card.classList.toggle('locked', lockedAttributes[attrId]);
    }

    /**
     * Aktualisiert einen einzelnen Bedürfniswert
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @param {string|number} value - Neuer Wert
     */
    function updateNeedValue(attrId, needId, value) {
        if (lockedAttributes[attrId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        if (!needsValues[attrId]) {
            initializeNeedsValues(attrId);
        }

        needsValues[attrId][needId] = numValue;

        // Update aggregierter Wert
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }
        }

        // Custom Event für Änderungstracking
        const event = new CustomEvent('attributeNeedChange', {
            bubbles: true,
            detail: { attrId, needId, value: numValue }
        });
        document.dispatchEvent(event);
    }

    /**
     * Holt den aggregierten Wert eines Attributs
     * @param {string} attrId - Attribut-ID
     * @returns {number} Aggregierter Wert
     */
    function getValue(attrId) {
        return calculateAggregatedValue(attrId);
    }

    /**
     * Holt alle Bedürfniswerte eines Attributs
     * @param {string} attrId - Attribut-ID
     * @returns {Object} Bedürfniswerte
     */
    function getNeedsValues(attrId) {
        return needsValues[attrId] || {};
    }

    /**
     * Setzt alle Bedürfniswerte eines Attributs
     * @param {string} attrId - Attribut-ID
     * @param {Object} values - Bedürfniswerte
     */
    function setNeedsValues(attrId, values) {
        if (lockedAttributes[attrId]) return;

        needsValues[attrId] = { ...values };

        // Update UI
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            Object.entries(values).forEach(([needId, value]) => {
                const needInput = card.querySelector(`[data-need="${needId}"] .attribute-need-input`);
                if (needInput) {
                    needInput.value = value;
                }
            });

            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }
        }
    }

    /**
     * Setzt ein Attribut zurück auf Standardwert
     * @param {string} attrId - Attribut-ID
     * @param {number} defaultValue - Standardwert
     */
    function reset(attrId, defaultValue = 50) {
        lockedAttributes[attrId] = false;
        initializeNeedsValues(attrId, defaultValue);

        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (mapping) {
            mapping.needs.forEach(need => {
                needsValues[attrId][need] = defaultValue;
            });
        }

        // Update UI
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            card.classList.remove('locked');

            const needInputs = card.querySelectorAll('.attribute-need-input');
            needInputs.forEach(input => {
                input.value = defaultValue;
            });

            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = defaultValue;
            }
        }
    }

    /**
     * Holt alle Werte aller Attribute
     * @returns {Object} Alle Attributwerte
     */
    function getAllValues() {
        const result = {};
        Object.keys(ATTRIBUTE_NEEDS_MAPPING).forEach(attrId => {
            result[attrId] = {
                aggregated: calculateAggregatedValue(attrId),
                needs: getNeedsValues(attrId),
                locked: lockedAttributes[attrId] || false
            };
        });
        return result;
    }

    return {
        render,
        renderMany,
        toggleExpand,
        toggleLock,
        updateNeedValue,
        getValue,
        getNeedsValues,
        setNeedsValues,
        reset,
        getAllValues,
        ATTRIBUTE_NEEDS_MAPPING,
        NEEDS_LABELS
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}
