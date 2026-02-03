/**
 * BEDÜRFNIS DETAIL-VIEW COMPONENT
 *
 * Zeigt detaillierte Informationen zu einem einzelnen Bedürfnis:
 * - Wert mit GOD-Modifier-Breakdown
 * - Typischer Archetyp-Wert aus Umfrage
 * - Abweichung mit Farbcodierung
 * - Flache Taxonomie-Klassifikation
 * - Impact auf R-Faktoren und Scores
 *
 * Spezifikation: docs/BEDUERFNIS_DETAIL_VIEW_SPEC.md v1.0.0
 * Status: ✅ Finalisiert - In Stein gemeißelt
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const BeduerfnisDetailView = (function() {
    'use strict';

    /**
     * Ermittelt den aktuellen Archetyp für eine Person
     * @param {string} person - 'ich' oder 'partner'
     * @returns {string} Archetyp-ID (z.B. 'single', 'duo', etc.)
     */
    function getPersonArchetype(person) {
        // 1. TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const archetype = TiageState.get(`archetypes.${person}.primary`);
            if (archetype) return archetype;
        }
        // 2. Globale Variable (Fallback)
        if (person === 'ich' && typeof window.currentArchetype !== 'undefined') {
            return window.currentArchetype;
        }
        if (person === 'partner' && typeof window.selectedPartner !== 'undefined') {
            return window.selectedPartner;
        }
        // 3. Default
        return 'single';
    }

    /**
     * Rendert die komplette Detail-View für ein Bedürfnis
     * @param {string} needId - Bedürfnis-ID (z.B. '#B90' oder 'kinderwunsch')
     * @param {string} person - 'ich' oder 'partner'
     * @param {Object} options - Optionale Einstellungen
     * @returns {string} HTML-String
     */
    function render(needId, person, options) {
        options = options || {};

        // Daten sammeln
        const data = collectData(needId, person);

        if (!data || !data.need) {
            return `<div class="beduerfnis-detail-view">
                <div class="beduerfnis-detail-view__error">
                    ⚠️ Bedürfnis nicht gefunden: ${needId}
                </div>
            </div>`;
        }

        // HTML generieren
        return generateHTML(data, options);
    }

    /**
     * Sammelt alle benötigten Daten für die Anzeige
     * @param {string} needId - Bedürfnis-ID
     * @param {string} person - 'ich' oder 'partner'
     * @returns {Object} Datenstruktur mit allen Informationen
     */
    function collectData(needId, person) {
        try {
            // Normalisiere Need-ID
            const normalizedId = normalizeNeedId(needId);

            // Hole Need-Definition aus Katalog
            const need = getNeedDefinition(normalizedId);
            if (!need) {
                console.warn('[BeduerfnisDetailView] Need nicht gefunden:', needId);
                return null;
            }

            // Hole Basis-Wert
            const baseValue = getBaseValue(normalizedId, person);

            // Hole Modifiers
            const modifiers = getModifiers(normalizedId, person);

            // Berechne Final-Wert
            const finalValue = baseValue +
                              (modifiers.gender || 0) +
                              (modifiers.orientierung || 0) +
                              (modifiers.dominanz || 0);

            // Hole typischen Wert
            const typicalData = getTypicalValue(normalizedId, person);

            // Berechne Abweichung
            const deviation = typicalData && typicalData.value !== null
                ? finalValue - typicalData.value
                : null;

            // Hole Taxonomie
            const taxonomy = getTaxonomy(normalizedId);

            // Berechne Impact
            const impact = calculateImpact(normalizedId, person, finalValue);

            return {
                needId: normalizedId,
                need: need,
                baseValue: baseValue,
                modifiers: modifiers,
                finalValue: finalValue,
                typical: typicalData,
                deviation: deviation,
                taxonomy: taxonomy,
                impact: impact,
                person: person
            };
        } catch (error) {
            console.error('[BeduerfnisDetailView] Fehler beim Sammeln der Daten:', error);
            return null;
        }
    }

    /**
     * Generiert HTML aus gesammelten Daten
     * @param {Object} data - Datenstruktur aus collectData()
     * @param {Object} options - Optionale Einstellungen
     * @returns {string} HTML-String
     */
    function generateHTML(data, options) {
        options = options || {};
        const expandedByDefault = options.expanded || false;

        return `
            <div class="beduerfnis-detail-view" data-need-id="${data.needId}">
                ${renderHeader(data)}
                ${renderValueSection(data, expandedByDefault)}
                ${renderTypicalSection(data)}
                ${renderDeviationSection(data)}
                ${renderClassificationSection(data)}
                ${renderImpactSection(data)}
                ${renderActions(data)}
            </div>
        `;
    }

    /**
     * Rendert Header mit Bedürfnisname
     */
    function renderHeader(data) {
        return `
            <div class="beduerfnis-detail-view__header">
                ${data.need.id || data.needId} ${data.need.name || data.need.label || 'Unbekannt'}
            </div>
        `;
    }

    /**
     * Rendert Wert-Sektion mit GOD-Modifier-Breakdown
     */
    function renderValueSection(data, expanded) {
        const expandIcon = expanded ? '▲' : '▼';
        const breakdownClass = expanded ? '' : 'collapsed';

        const modProfile = getModifierProfileInfo(data.person);

        return `
            <div class="beduerfnis-detail-view__value">
                <div class="beduerfnis-detail-view__value-main" onclick="BeduerfnisDetailView.toggleBreakdown('${data.needId}')">
                    Dein Wert: <strong>${data.finalValue}</strong> <span class="toggle-icon" id="toggle-${data.needId}">[${expandIcon}]</span>
                </div>
                <div class="beduerfnis-detail-view__value-breakdown ${breakdownClass}" id="breakdown-${data.needId}">
                    <div class="beduerfnis-detail-view__value-item">
                        ├─ Basis: <strong>${data.baseValue}</strong>
                    </div>
                    ${data.modifiers.gender !== 0 ? `
                    <div class="beduerfnis-detail-view__value-item">
                        ├─ ${data.modifiers.gender > 0 ? '+' : ''}Gender: <strong>${data.modifiers.gender > 0 ? '+' : ''}${data.modifiers.gender}</strong> (${modProfile.gender || 'Unbekannt'})
                    </div>
                    ` : ''}
                    ${data.modifiers.orientierung !== 0 ? `
                    <div class="beduerfnis-detail-view__value-item">
                        ├─ ${data.modifiers.orientierung > 0 ? '+' : ''}Orientierung: <strong>${data.modifiers.orientierung > 0 ? '+' : ''}${data.modifiers.orientierung}</strong> (${modProfile.orientierung || 'Unbekannt'})
                    </div>
                    ` : ''}
                    ${data.modifiers.dominanz !== 0 ? `
                    <div class="beduerfnis-detail-view__value-item">
                        └─ ${data.modifiers.dominanz > 0 ? '+' : ''}Dominanz: <strong>${data.modifiers.dominanz > 0 ? '+' : ''}${data.modifiers.dominanz}</strong> (${modProfile.dominanz || 'Unbekannt'})
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Rendert Typisch-Wert-Sektion
     */
    function renderTypicalSection(data) {
        if (!data.typical || data.typical.value === null) {
            return `
                <div class="beduerfnis-detail-view__typical">
                    <div><strong>Typisch (Umfrage):</strong> Keine Daten</div>
                </div>
            `;
        }

        const percentileInfo = data.typical.percentile
            ? `(${data.typical.percentile}% der ${data.typical.archetyp} haben Wert ${data.typical.range || 'ähnlich'})`
            : '';

        return `
            <div class="beduerfnis-detail-view__typical">
                <div><strong>Typisch (Umfrage):</strong> ${data.typical.value}</div>
                <div class="beduerfnis-detail-view__typical-sub">
                    └─ Archetyp: ${data.typical.archetyp || 'Unbekannt'}
                    ${percentileInfo ? `<br>&nbsp;&nbsp;&nbsp;${percentileInfo}` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Rendert Abweichung-Sektion mit Farbcodierung
     */
    function renderDeviationSection(data) {
        if (data.deviation === null) {
            return `
                <div class="beduerfnis-detail-view__deviation">
                    <div><strong>Abweichung:</strong> Keine Vergleichsdaten</div>
                </div>
            `;
        }

        const absDeviation = Math.abs(data.deviation);
        let deviationClass = 'low';
        let emoji = '🟢';

        if (absDeviation > 35) {
            deviationClass = 'high';
            emoji = '🔴';
        } else if (absDeviation >= 15) {
            deviationClass = 'medium';
            emoji = '🟡';
        }

        const stdDevInfo = getStandardDeviationInfo(data.deviation, data.typical);

        return `
            <div class="beduerfnis-detail-view__deviation beduerfnis-detail-view__deviation--${deviationClass}">
                <div>
                    <strong>Abweichung:</strong> Δ${absDeviation} ${emoji}
                </div>
                ${stdDevInfo ? `
                <div class="beduerfnis-detail-view__deviation-sub">
                    └─ ${stdDevInfo}
                </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Rendert Klassifikation-Sektion (flache Taxonomie)
     */
    function renderClassificationSection(data) {
        if (!data.taxonomy) {
            return `
                <div class="beduerfnis-detail-view__classification">
                    <div><strong>Klassifikation:</strong> Keine Daten</div>
                </div>
            `;
        }

        return `
            <div class="beduerfnis-detail-view__classification">
                <div><strong>Klassifikation:</strong></div>
                <div class="beduerfnis-detail-view__classification-items">
                    ${data.taxonomy.kategorie ? `
                    <div class="beduerfnis-detail-view__classification-item">
                        📁 ${data.taxonomy.kategorie.id} ${data.taxonomy.kategorie.label}
                    </div>
                    ` : ''}
                    ${data.taxonomy.dimension ? `
                    <div class="beduerfnis-detail-view__classification-item">
                        🎯 ${data.taxonomy.dimension.id} ${data.taxonomy.dimension.label}
                    </div>
                    ` : ''}
                    ${data.taxonomy.perspektive ? `
                    <div class="beduerfnis-detail-view__classification-item">
                        👓 ${data.taxonomy.perspektive.id} ${data.taxonomy.perspektive.label}
                    </div>
                    ` : ''}
                    ${data.taxonomy.resonanz ? `
                    <div class="beduerfnis-detail-view__classification-item beduerfnis-detail-view__classification-item--resonanz" style="color: ${data.taxonomy.resonanz.color};">
                        ${data.taxonomy.resonanz.emoji} Resonanz: ${data.taxonomy.resonanz.label}
                        <span class="beduerfnis-detail-view__resonanz-question" style="font-size: 0.85em; opacity: 0.8; display: block; margin-left: 1.5em;">
                            „${data.taxonomy.resonanz.question}"
                        </span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Rendert Impact-auf-Scores-Sektion
     */
    function renderImpactSection(data) {
        if (!data.impact || data.impact.length === 0) {
            return `
                <div class="beduerfnis-detail-view__impact">
                    <div><strong>Impact auf Scores:</strong> Keine Berechnung verfügbar</div>
                </div>
            `;
        }

        const impactItems = data.impact.map(item => {
            const sign = item.value >= 0 ? '+' : '';
            const label = item.type === 'resonance' ? `R${item.factor} ${item.name}` :
                         item.type === 'category' ? `Kategorie ${item.id}` :
                         item.type === 'dimension' ? `Dimension ${item.id}` : item.name;

            return `
                <div class="beduerfnis-detail-view__impact-item">
                    • ${label}: <strong>${sign}${item.value}%</strong> ${item.description ? `(${item.description})` : ''}
                </div>
            `;
        }).join('\n');

        return `
            <div class="beduerfnis-detail-view__impact">
                <div><strong>Impact auf Scores:</strong></div>
                <div class="beduerfnis-detail-view__impact-items">
                    ${impactItems}
                </div>
            </div>
        `;
    }

    /**
     * Rendert Action-Buttons
     */
    function renderActions(data) {
        return `
            <div class="beduerfnis-detail-view__actions">
                <button class="beduerfnis-detail-view__action-btn" onclick="BeduerfnisDetailView.editBase('${data.needId}', '${data.person}')">
                    Basis ändern
                </button>
                <button class="beduerfnis-detail-view__action-btn" onclick="BeduerfnisDetailView.showSimilar('${data.needId}')">
                    Zu ähnlichen Bedürfnissen
                </button>
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Normalisiert Need-ID zu #B-Format
     */
    function normalizeNeedId(needId) {
        if (!needId) return null;

        // Wenn bereits #B-Format
        if (needId.startsWith('#B')) return needId;

        // Wenn String-Key, versuche aus Katalog zu finden
        if (typeof GfkBeduerfnisse !== 'undefined') {
            for (const key in GfkBeduerfnisse.catalogue) {
                if (GfkBeduerfnisse.catalogue[key].stringKey === needId ||
                    GfkBeduerfnisse.catalogue[key].id === needId) {
                    return GfkBeduerfnisse.catalogue[key].id;
                }
            }
        }

        return needId;
    }

    /**
     * Holt Need-Definition aus Katalog
     */
    function getNeedDefinition(needId) {
        if (typeof GfkBeduerfnisse === 'undefined') {
            console.warn('[BeduerfnisDetailView] GfkBeduerfnisse nicht verfügbar');
            return null;
        }

        // Suche im Katalog
        for (const key in GfkBeduerfnisse.catalogue) {
            const need = GfkBeduerfnisse.catalogue[key];
            if (need.id === needId || need.stringKey === needId) {
                return need;
            }
        }

        return null;
    }

    /**
     * Holt Basis-Wert für Bedürfnis
     * WICHTIG: Basis-Wert sollte standardmäßig dem typischen Umfrage-Wert entsprechen!
     */
    function getBaseValue(needId, person) {
        // Archetyp ermitteln für Archetyp-spezifische Speicherung
        const archetype = getPersonArchetype(person);

        // 1. Prüfe ob Benutzer einen eigenen Basis-Wert gesetzt hat (NEU: pro Archetyp)
        if (typeof TiageState !== 'undefined') {
            // Neuer Pfad: pro Archetyp
            const customValue = TiageState.get(`${person}.${archetype}.needs.${needId}.customBase`);
            if (customValue !== undefined && customValue !== null) {
                return customValue;
            }
            // Fallback: alter Pfad ohne Archetyp (für Migration)
            const legacyValue = TiageState.get(`${person}.needs.${needId}.customBase`);
            if (legacyValue !== undefined && legacyValue !== null) {
                return legacyValue;
            }
        }

        // 2. Versuche aus LoadedArchetypProfile (falls explizit gesetzt)
        if (typeof window.LoadedArchetypProfile !== 'undefined') {
            const flatNeeds = window.LoadedArchetypProfile?.[person]?.profileReview?.flatNeeds;
            if (flatNeeds && Array.isArray(flatNeeds)) {
                const found = flatNeeds.find(n => n.id === needId || n.stringKey === needId);
                if (found && found.customBase !== undefined) {
                    return found.customBase;
                }
            }
        }

        // 3. STANDARD: Verwende typischen Archetyp-Wert aus Umfrage (SSOT)
        const typicalData = getTypicalValue(needId, person);
        if (typicalData && typicalData.value !== null) {
            return typicalData.value;
        }

        // 4. Letzter Fallback: 50 (nur wenn keine Umfragedaten vorhanden)
        return 50;
    }

    /**
     * Holt Modifier für Bedürfnis
     */
    function getModifiers(needId, person) {
        const modifiers = { gender: 0, orientierung: 0, dominanz: 0 };

        // Hole Profil-Dimensionen
        if (typeof window.personDimensions === 'undefined' || !window.personDimensions[person]) {
            return modifiers;
        }

        const dims = window.personDimensions[person];

        // Hole Modifier aus TiageModifiers
        if (typeof TiageModifiers !== 'undefined') {
            // Gender
            if (dims.geschlecht && TiageModifiers.Gender?.[dims.geschlecht]?.deltas?.[needId]) {
                modifiers.gender = TiageModifiers.Gender[dims.geschlecht].deltas[needId];
            }

            // Orientierung
            if (dims.orientierung && TiageModifiers.Orientierung?.[dims.orientierung]?.deltas?.[needId]) {
                modifiers.orientierung = TiageModifiers.Orientierung[dims.orientierung].deltas[needId];
            }

            // Dominanz
            if (dims.dominanz && TiageModifiers.Dominanz?.[dims.dominanz]?.deltas?.[needId]) {
                modifiers.dominanz = TiageModifiers.Dominanz[dims.dominanz].deltas[needId];
            }
        }

        return modifiers;
    }

    /**
     * Holt Profil-Info für Modifier-Anzeige
     */
    function getModifierProfileInfo(person) {
        const info = { gender: 'Unbekannt', orientierung: 'Unbekannt', dominanz: 'Unbekannt' };

        if (typeof window.personDimensions === 'undefined' || !window.personDimensions[person]) {
            return info;
        }

        const dims = window.personDimensions[person];

        // Mapping zu lesbaren Namen
        const genderMap = {
            'mann-cis': 'Mann-Cis',
            'frau-cis': 'Frau-Cis',
            'mann-trans': 'Mann-Trans',
            'frau-trans': 'Frau-Trans',
            'nicht-binaer': 'Nicht-Binär'
        };

        const orientierungMap = {
            'heterosexuell': 'Heterosexuell',
            'homosexuell': 'Homosexuell',
            'bisexuell': 'Bisexuell',
            'pansexuell': 'Pansexuell',
            'asexuell': 'Asexuell'
        };

        const dominanzMap = {
            'dominant': 'Dominant',
            'submissiv': 'Submissiv',
            'switch': 'Switch',
            'ausgeglichen': 'Ausgeglichen'
        };

        info.gender = genderMap[dims.geschlecht] || dims.geschlecht || 'Unbekannt';
        info.orientierung = orientierungMap[dims.orientierung] || dims.orientierung || 'Unbekannt';
        info.dominanz = dominanzMap[dims.dominanz] || dims.dominanz || 'Unbekannt';

        return info;
    }

    /**
     * Holt typischen Wert für Archetyp
     */
    function getTypicalValue(needId, person) {
        // Hole Archetyp
        let archetyp = 'duo'; // Default
        if (typeof window.LoadedArchetypProfile !== 'undefined') {
            archetyp = window.LoadedArchetypProfile?.[person]?.archetyp || archetyp;
        }

        // Hole aus ARCHETYP_KOHAERENZ
        if (typeof TiageSynthesis === 'undefined' ||
            !TiageSynthesis.Constants?.ARCHETYP_KOHAERENZ) {
            return null;
        }

        // Finde Need in allen Dimensionen
        const kohaerenz = TiageSynthesis.Constants.ARCHETYP_KOHAERENZ;
        for (const dimension in kohaerenz) {
            if (kohaerenz[dimension]?.[archetyp]?.[needId]) {
                const data = kohaerenz[dimension][archetyp][needId];
                return {
                    value: data.value,
                    archetyp: archetypToLabel(archetyp),
                    percentile: data.percentile || null,
                    range: data.range || null
                };
            }
        }

        return null;
    }

    /**
     * Konvertiert Archetyp-Key zu Label
     */
    function archetypToLabel(key) {
        const map = {
            'duo': 'Duo',
            'solopoly': 'Solopoly',
            'polyamor': 'Polyamor',
            'hierarchisch': 'Hierarchisch',
            'anarchie': 'Beziehungsanarchie'
        };
        return map[key] || key;
    }

    /**
     * Holt Taxonomie-Information
     */
    function getTaxonomy(needId) {
        if (typeof TiageTaxonomie === 'undefined') {
            return null;
        }

        const need = getNeedDefinition(needId);
        if (!need) return null;

        const taxonomy = {
            kategorie: null,
            dimension: null,
            perspektive: null,
            resonanz: null
        };

        // Extrahiere aus Tags
        if (need.tags) {
            need.tags.forEach(tag => {
                if (tag.startsWith('#K')) {
                    taxonomy.kategorie = {
                        id: tag,
                        label: TiageTaxonomie.kategorien?.[tag]?.label || tag
                    };
                } else if (tag.startsWith('#D')) {
                    taxonomy.dimension = {
                        id: tag,
                        label: TiageTaxonomie.dimensionen?.[tag]?.label || tag
                    };
                } else if (tag.startsWith('#P')) {
                    taxonomy.perspektive = {
                        id: tag,
                        label: TiageTaxonomie.perspektiven?.[tag]?.label || tag
                    };
                }
            });
        }

        // Hole Resonanz-Dimension aus PerspektivenModal
        taxonomy.resonanz = getResonanzDimension(need.stringKey || needId);

        return taxonomy;
    }

    /**
     * Holt Resonanz-Dimension für ein Bedürfnis
     * Mapping: Leben, Dynamik, Identität, Philosophie
     */
    function getResonanzDimension(needKey) {
        // Versuche aus PerspektivenModal zu holen
        if (typeof PerspektivenModal !== 'undefined' && PerspektivenModal.needToDimension) {
            const dimKey = PerspektivenModal.needToDimension[needKey];
            if (dimKey && PerspektivenModal.dimensionConfig?.[dimKey]) {
                const config = PerspektivenModal.dimensionConfig[dimKey];
                return {
                    key: dimKey,
                    label: config.name,
                    emoji: config.emoji,
                    color: config.color,
                    question: config.question
                };
            }
        }

        // Fallback: Versuche aus Need-Key abzuleiten
        const resonanzMapping = {
            // IDENTITÄT (💚)
            'authentizitaet': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },
            'selbst_ausdruck': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },
            'echtheit': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },
            'integritaet': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },
            'akzeptanz': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },
            'gesehen_werden': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },
            'verstanden_werden': { key: 'identitaet', label: 'Identität', emoji: '💚', color: '#22c55e', question: 'Wer bin ich, wer bist du?' },

            // PHILOSOPHIE (🧠)
            'kinderwunsch': { key: 'philosophie', label: 'Philosophie', emoji: '🧠', color: '#6366f1', question: 'Wie wollen wir Beziehung leben?' },
            'langfristige_bindung': { key: 'philosophie', label: 'Philosophie', emoji: '🧠', color: '#6366f1', question: 'Wie wollen wir Beziehung leben?' },
            'verbindlichkeit': { key: 'philosophie', label: 'Philosophie', emoji: '🧠', color: '#6366f1', question: 'Wie wollen wir Beziehung leben?' },
            'gemeinsamer_wohnraum': { key: 'philosophie', label: 'Philosophie', emoji: '🧠', color: '#6366f1', question: 'Wie wollen wir Beziehung leben?' },
            'treueversprechen': { key: 'philosophie', label: 'Philosophie', emoji: '🧠', color: '#6366f1', question: 'Wie wollen wir Beziehung leben?' },

            // LEBEN (🔥)
            'sexuelle_haeufigkeit': { key: 'leben', label: 'Leben', emoji: '🔥', color: '#f97316', question: 'Was zieht uns an?' },
            'sexuelle_experimentierfreude': { key: 'leben', label: 'Leben', emoji: '🔥', color: '#f97316', question: 'Was zieht uns an?' },
            'sexuelle_verbindung': { key: 'leben', label: 'Leben', emoji: '🔥', color: '#f97316', question: 'Was zieht uns an?' },
            'koerpernaehe': { key: 'leben', label: 'Leben', emoji: '🔥', color: '#f97316', question: 'Was zieht uns an?' },
            'koerperkontakt': { key: 'leben', label: 'Leben', emoji: '🔥', color: '#f97316', question: 'Was zieht uns an?' },
            'intimitaet': { key: 'leben', label: 'Leben', emoji: '🔥', color: '#f97316', question: 'Was zieht uns an?' },

            // DYNAMIK (⚡)
            'kontrolle_ausueben': { key: 'dynamik', label: 'Dynamik', emoji: '⚡', color: '#eab308', question: 'Wer führt, wer folgt?' },
            'hingabe': { key: 'dynamik', label: 'Dynamik', emoji: '⚡', color: '#eab308', question: 'Wer führt, wer folgt?' },
            'fuehrung_geben': { key: 'dynamik', label: 'Dynamik', emoji: '⚡', color: '#eab308', question: 'Wer führt, wer folgt?' },
            'gefuehrt_werden': { key: 'dynamik', label: 'Dynamik', emoji: '⚡', color: '#eab308', question: 'Wer führt, wer folgt?' },
            'machtaustausch': { key: 'dynamik', label: 'Dynamik', emoji: '⚡', color: '#eab308', question: 'Wer führt, wer folgt?' },
            'sich_fallenlassen': { key: 'dynamik', label: 'Dynamik', emoji: '⚡', color: '#eab308', question: 'Wer führt, wer folgt?' }
        };

        return resonanzMapping[needKey] || null;
    }

    /**
     * Berechnet Standardabweichung-Info
     */
    function getStandardDeviationInfo(deviation, typicalData) {
        if (!typicalData || !typicalData.stdDev) {
            const absDeviation = Math.abs(deviation);
            const stdDevEstimate = 20; // Geschätzte Standardabweichung
            const stdDevCount = (absDeviation / stdDevEstimate).toFixed(1);

            if (stdDevCount >= 2.0) {
                return `Du liegst ca. ${stdDevCount} Standardabweichungen ${deviation > 0 ? 'über' : 'unter'} typisch`;
            }
            return null;
        }

        const stdDevCount = (Math.abs(deviation) / typicalData.stdDev).toFixed(1);
        if (stdDevCount >= 1.5) {
            return `Du liegst ${stdDevCount} Standardabweichungen ${deviation > 0 ? 'über' : 'unter'} typisch`;
        }

        return null;
    }

    /**
     * Berechnet Impact auf Scores
     */
    function calculateImpact(needId, person, finalValue) {
        // Placeholder - wird später mit echten Berechnungen gefüllt
        const impact = [];

        // Hole Taxonomie um zu wissen welcher R-Faktor betroffen ist
        const taxonomy = getTaxonomy(needId);
        if (!taxonomy) return impact;

        // Mapping Dimension → R-Faktor
        const dimensionToRFactor = {
            '#D1': { factor: 2, name: 'Philosophie' },
            '#D2': { factor: 2, name: 'Philosophie' },
            '#D3': { factor: 1, name: 'Leben' },
            '#D4': { factor: 4, name: 'Identität' },
            '#D5': { factor: 3, name: 'Dynamik' },
            '#D6': { factor: 4, name: 'Identität' }
        };

        // Berechne R-Faktor Impact (Placeholder-Logik)
        if (taxonomy.dimension && dimensionToRFactor[taxonomy.dimension.id]) {
            const rInfo = dimensionToRFactor[taxonomy.dimension.id];
            const typical = getTypicalValue(needId, person);

            if (typical && typical.value !== null) {
                const deviation = finalValue - typical.value;
                const impactPercent = Math.round((deviation / 100) * 10); // Vereinfachte Berechnung

                if (impactPercent !== 0) {
                    impact.push({
                        type: 'resonance',
                        factor: rInfo.factor,
                        name: rInfo.name,
                        value: impactPercent,
                        description: impactPercent > 0 ? 'verstärkt Kohärenz' : 'senkt Kohärenz'
                    });
                }
            }
        }

        // Kategorie-Impact (Placeholder)
        if (taxonomy.kategorie) {
            impact.push({
                type: 'category',
                id: taxonomy.kategorie.id,
                name: taxonomy.kategorie.label,
                value: -12, // Placeholder
                description: 'Kategorie-Score'
            });
        }

        // Dimensions-Impact (Placeholder)
        if (taxonomy.dimension) {
            impact.push({
                type: 'dimension',
                id: taxonomy.dimension.id,
                name: taxonomy.dimension.label,
                value: -8, // Placeholder
                description: 'Dimensions-Score'
            });
        }

        return impact;
    }

    // ═══════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Toggle Breakdown-Anzeige
     */
    function toggleBreakdown(needId) {
        const breakdown = document.getElementById(`breakdown-${needId}`);
        const toggle = document.getElementById(`toggle-${needId}`);

        if (breakdown && toggle) {
            if (breakdown.classList.contains('collapsed')) {
                breakdown.classList.remove('collapsed');
                toggle.textContent = '[▲]';
            } else {
                breakdown.classList.add('collapsed');
                toggle.textContent = '[▼]';
            }
        }
    }

    /**
     * Basis-Wert ändern
     * Speichert als customBase um zu kennzeichnen, dass der Benutzer den Wert manuell geändert hat
     */
    function editBase(needId, person) {
        // Archetyp ermitteln für Archetyp-spezifische Speicherung
        const archetype = getPersonArchetype(person);
        const currentBase = getBaseValue(needId, person);
        const typicalData = getTypicalValue(needId, person);
        const typicalValue = typicalData ? typicalData.value : null;

        let promptMessage = `Neuer Basis-Wert für ${needId}:`;
        if (typicalValue !== null) {
            promptMessage += `\n(Typisch für deinen Archetyp: ${typicalValue})`;
        }

        const newBase = prompt(promptMessage, currentBase);

        if (newBase !== null && !isNaN(newBase)) {
            const value = parseInt(newBase, 10);

            // Speichern als customBase in TiageState (NEU: pro Archetyp)
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`${person}.${archetype}.needs.${needId}.customBase`, value);
                console.log(`[BeduerfnisDetailView] Basis-Wert geändert: ${person}.${archetype}.${needId} = ${value} (typisch: ${typicalValue})`);

                // Neu rendern
                const container = document.querySelector(`[data-need-id="${needId}"]`);
                if (container && container.parentNode) {
                    container.outerHTML = render(needId, person);
                }
            }
        }
    }

    /**
     * Zeige ähnliche Bedürfnisse
     */
    function showSimilar(needId) {
        alert(`Ähnliche Bedürfnisse für ${needId} - Feature kommt bald!`);
    }

    // ═══════════════════════════════════════════════════════════════════
    // EXPORTS
    // ═══════════════════════════════════════════════════════════════════

    return {
        render,
        collectData,
        toggleBreakdown,
        editBase,
        showSimilar
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisDetailView;
}
